using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models.AccessoryModels.DealModels
{
    public class BookReceivedModel
    {
		public int DealId { get; set; }
		public string AltitudeCoordinate { get; set; }
		public string LongtiudeCoordinate { get; set; }
	}
}
