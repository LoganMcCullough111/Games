using System;
using System.Collections.Generic;

#nullable disable

namespace Games.Models.LowLevel
{
    public partial class TCredential
    {
        public string FUsername { get; set; }
        public byte[] FSalt { get; set; }
        public byte[] FHash { get; set; }
        public string FCart { get; set; }
    }
}
