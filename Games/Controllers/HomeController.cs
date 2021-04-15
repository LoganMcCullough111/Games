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

namespace Games.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
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
