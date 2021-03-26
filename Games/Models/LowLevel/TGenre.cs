using System;
using System.Collections.Generic;

#nullable disable

namespace Games.Models.LowLevel
{
    public partial class TGenre
    {
        public TGenre()
        {
            TGames = new HashSet<TGame>();
        }

        public long FGenreId { get; set; }
        public string FGenreName { get; set; }

        public virtual ICollection<TGame> TGames { get; set; }
    }
}
