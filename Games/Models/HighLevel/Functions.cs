using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Games.Models.LowLevel;
using System.Security.Cryptography;
using System.Text;
using Games.Objects;

/*File for high-level functions that interact with the low-model.*/

namespace Games.Models.HighLevel {
    public class Functions {
        /*A function that checks if the given username already exists in the database. Returns true if the username already
        exists in database*/
        public static bool UsernameExists(string strUsername) {
            //Connect to the database.
            using (GamesContext dbContext = new GamesContext()) {
                //Get all rows in tCredentials that have the given username
                var users =
                    from user in dbContext.TCredentials
                    where user.FUsername == strUsername
                    select user;
                //Username exists in the database if the number of rows returned is bigger than 0.
                return (users.Count() > 0);
            }
        }

        //Create an account assuming we have already checked that the requested username is available
        public static void CreateAccount(string strUsername, string strPassword, string strCart) {
            //Create a random salt value, and combine it with the password, then compute the hash value.
            RNGCryptoServiceProvider rngCrypto = new RNGCryptoServiceProvider();
            byte[] salt = new byte[32];
            rngCrypto.GetNonZeroBytes(salt);
            //Compute hash value.
            byte[] hash = ComputeHash(salt, strPassword);
            // Insert the info into the DB.
            using (GamesContext dbContext = new GamesContext()) {
                //New row to insert is an instance of "TCredential". Create instance.
                TCredential tcNewRow = new TCredential() { FUsername = strUsername, FSalt = salt, FHash = hash, FCart = strCart};
                // Insert into local table "TCredentials".
                dbContext.TCredentials.Add(tcNewRow);
                //Commit the change (added row) to DB.
                dbContext.SaveChanges();
            }
        }

        //A function to compute the hash value from the salt and password.
        public static byte[] ComputeHash(byte[] salt, string strPassword) {
            //Convert the password into an array of the bytes in the encoding of the password
            byte[] byPassword = Encoding.UTF8.GetBytes(strPassword);
            //Combine salt and password into one array.
            byte[] bySaltedPW = new byte[salt.Length + byPassword.Length];
            Array.Copy(salt, 0, bySaltedPW, 0, salt.Length);
            Array.Copy(byPassword, 0, bySaltedPW, salt.Length, byPassword.Length);
            //Compute the hash value and return it
            SHA512Managed shamHash = new SHA512Managed();
            byte[] hash = shamHash.ComputeHash(bySaltedPW);
            return hash;
        }

        //A function to get a list of all the games in the DB, listed alphabetically by title
        public static List<GameInfo> GetAllGames()
        {
            //run query on db
            using(GamesContext dbContext = new GamesContext())
            {
                var gameList =
                    from game in dbContext.TGames
                    orderby game.FTitle
                    select new GameInfo {ID = game.FGameId, Title = game.FTitle, Description = game.FDescription,
                                         Publisher = game.FPublisher, Price = game.FPrice};
                return gameList.ToList();
            }
        }

        //Function to update the current cart in the DB for a user
        public static void UpdateCart(string strUsername, string strCart)
        {
            //Update data in database
            using (GamesContext dbContext = new GamesContext())
            {
                //Run a query to get the row we want to update
                var users = from user in dbContext.TCredentials
                            where user.FUsername == strUsername
                            select user;
                // There is only one row in results returned. Get it and modify its FCart property.
                TCredential tcCurrUser = users.First();
                tcCurrUser.FCart = strCart;
                //Save the change.
                dbContext.SaveChanges();
            }
        }
    }
}
