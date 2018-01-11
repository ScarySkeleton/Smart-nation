using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models.AccessoryModels
{
	public class BookModel
	{
        public string name { get; set; }
		public string author { get; set; }
		public string type { get; set; }
		public string genre { get; set; }
		public string photo { get; set; }
		public string photoInBinary { get; set; }
		public int price { get; set; }
		public string AltitudeCoordinate { get; set; }
		public string LongitudeCoordinate { get; set; }
	}
}
