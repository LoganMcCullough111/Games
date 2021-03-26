using System;
using System.Collections.Generic;

#nullable disable

namespace Games.Models.LowLevel
{
    public partial class TType
    {
        public TType()
        {
            TGames = new HashSet<TGame>();
        }

        public long FTypeId { get; set; }
        public string FTypeName { get; set; }

        public virtual ICollection<TGame> TGames { get; set; }
    }
}
