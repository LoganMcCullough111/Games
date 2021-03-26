using System;
using System.Collections.Generic;

#nullable disable

namespace Games.Models.LowLevel
{
    public partial class TGame
    {
        public long FGameId { get; set; }
        public long FType { get; set; }
        public long FGenre { get; set; }
        public long FRating { get; set; }
        public string FTitle { get; set; }
        public string FPublisher { get; set; }
        public string FDescription { get; set; }
        public double FPrice { get; set; }
        public string FImageFile { get; set; }

        public virtual TGenre FGenreNavigation { get; set; }
        public virtual TRating FRatingNavigation { get; set; }
        public virtual TType FTypeNavigation { get; set; }
    }
}
