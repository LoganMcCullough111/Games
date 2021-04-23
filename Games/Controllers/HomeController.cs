using Games.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Games.Objects;
using System.Text.Json;
using System.Text.Json.Serialization;
using Games.Models.HighLevel;
using Microsoft.AspNetCore.Http;

namespace Games.Controllers
{
    public class HomeController : Controller
    {
        private const int TrueAsInt = 1;
        private const int FalseAsInt = 0;
        private const string SignedInName = "SignedIn?";
        private const string UsernameName = "Username";
        private const string CartName = "Cart";

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            //The number of items in the cart.
            int iNumCartItems = 0;
            //Check whether we are continuing an existing session.
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(CartName)))
            {
                //Cart is null or empty. Therefore we are starting a new session.
                //Set up basic session values: User is not signed in, and has no username set, and has an empty cart..
                HttpContext.Session.SetInt32(SignedInName, FalseAsInt);
                HttpContext.Session.SetString(UsernameName, "");
                HttpContext.Session.SetString(CartName, "[]");
            }
            else
            {
                //Continuing an existing session. Get the cart and determine its length.
                //Get the current shopping cart contents from the session variable
                string strCurrCart = HttpContext.Session.GetString(CartName);
                //Convert from JSON string into a list of CartItems
                List<CartItem> lstCurrCart = JsonSerializer.Deserialize<List<CartItem>>(strCurrCart);
                iNumCartItems = lstCurrCart.Count();

            }
            //Get a list of all of the games in the database
            List<GameInfo> lstAllGames = Functions.GetAllGames();
            return View((lstAllGames, iNumCartItems));
        }

        //Action method to create a new account. Returns JSON status value:
        //0-Success
        //1-Failure (because the username already exists
        public string CreateAccount([FromBody] Credentials crUNandPW)
        {
            //Check whether the proposed username already exists.
            string strUsername = crUNandPW.Username;
            string strPassword = crUNandPW.Password;
            if (Functions.UsernameExists(strUsername))
            {
                //Return an error status telling that the username is already taken.
                return $"{{ \"Status\": 1, \"Name\": \"{strUsername}\" }}";
            }
            //If we get here, the username is not taken and we can create the account. We must get the current shopping cart from the
            //session and store it.
            string strCurrCart = HttpContext.Session.GetString(CartName);
            Functions.CreateAccount(strUsername, strPassword, strCurrCart);
            //Account created. Mark the user as signed in and store their username in a session variable
            HttpContext.Session.SetInt32(SignedInName, TrueAsInt);
            HttpContext.Session.SetString(UsernameName, strUsername);
            //Return success
            return $"{{ \"Status\": 0, \"Name\": \"{strUsername}\"}}";
        }

        public string SignIn([FromBody] Credentials crUNandPW)
        {
            string strUsername = crUNandPW.Username;
            string strPassword = crUNandPW.Password;
            if (Functions.UsernameExists(strUsername)) {
                //Username exists, check credentials
                if (Functions.CheckCredentials(strUsername, strPassword)) {
                    //Credentials good
                    HttpContext.Session.SetInt32(SignedInName, TrueAsInt);
                    HttpContext.Session.SetString(UsernameName, strUsername);
                    string strUserCart = Functions.UserCart(strUsername);
                    HttpContext.Session.SetString(CartName, strUserCart);
                    //Cart Num 
                    return $"{{ \"Status\": 0, \"Name\": \"{strUsername}\"}}";
                }
                else {
                    //Username exists, but password isn't correct
                    return $"{{ \"Status\": 1, \"Name\": \"{strUsername}\"}}";
                }
            }
            else {
                //Username doesn't exist
                return $"{{ \"Status\": 2, \"Name\": \"{strUsername}\"}}";
            }
        }

        //Action method for adding an item to the cart
        public string AddToCart([FromBody] CartItem ciNewItem) {
            //Get the current shopping cart contents from the session variable
            string strCurrCart = HttpContext.Session.GetString(CartName);
            //Convert from JSON string into a list of CartItems
            List<CartItem> lstCurrCart = JsonSerializer.Deserialize<List<CartItem>>(strCurrCart);
            //Add the new item to the cart
            lstCurrCart.Add(ciNewItem);
            //Convert back to json and store in session variable
            strCurrCart = JsonSerializer.Serialize(lstCurrCart);
            HttpContext.Session.SetString(CartName, strCurrCart);
            //If the user is signed in, we must update his or her cart info in the DB.
            if(HttpContext.Session.GetInt32(SignedInName) == TrueAsInt)
            {
                //Get the username so we can look up the user in the DB
                string strUsername = HttpContext.Session.GetString(UsernameName);
                Functions.UpdateCart(strUsername, strCurrCart);
            }
            //Test: return json string for cart
            return $"{{\"NumInCart\": {lstCurrCart.Count()}, \"Cart\": {strCurrCart} }}";
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
