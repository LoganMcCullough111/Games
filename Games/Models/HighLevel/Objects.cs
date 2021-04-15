using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games.Objects {
/* Classes for various types of simple objects that we use in the application. */
//A class for the username and password sent by the user.
public class Credentials
    {
        //Properties for the username and password
        public string Username { get; set; }
        public string Password { get; set; }
    }

    //A class for the game information, displayed on the page
    public class GameInfo
    {
        //Properties for the Game ID, title, description, publisher, price
        public long ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Publisher { get; set; }
        public double Price { get; set; }
    }
}
