using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models
{
    public class FullBookInfoHistory
    {
        public int Id { get; set; }

        public string AltitudeCoordinate { get; set; }

        public string LongtiudeCoordinate { get; set; }

        public DateTime GetBookOn { get; set; }

        public DateTime? GiveBookOn { get; set; }

        public string UserEmail { get; set; }

        public string UserPhone { get; set; }

        public string UserFullName { get; set; }

    }
}
