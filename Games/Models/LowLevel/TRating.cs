using System;
using System.Collections.Generic;

#nullable disable

namespace Games.Models.LowLevel
{
    public partial class TRating
    {
        public TRating()
        {
            TGames = new HashSet<TGame>();
        }

        public long FRatingId { get; set; }
        public string FRatingCode { get; set; }
        public string FRatingDesc { get; set; }

        public virtual ICollection<TGame> TGames { get; set; }
    }
}
