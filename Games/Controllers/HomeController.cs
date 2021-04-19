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
            //Set up basic session values: User is not signed in, and has no username set.
            HttpContext.Session.SetInt32(SignedInName, FalseAsInt);
            HttpContext.Session.SetString(UsernameName, "");
            HttpContext.Session.SetString(CartName, "[]");
            //Get a list of all of the games in the database
            List<GameInfo> lstAllGames = Functions.GetAllGames();
            return View(lstAllGames);
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
            //If we get here, the username is not taken and we can create the account.
            Functions.CreateAccount(strUsername, strPassword);
            //Account created. Mark the user as signed in and store their username in a session variable
            HttpContext.Session.SetInt32(SignedInName, TrueAsInt);
            HttpContext.Session.SetString(UsernameName, strUsername);
            //Return success
            return $"{{ \"Status\": 0, \"Name\": \"{strUsername}\"}}";
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
