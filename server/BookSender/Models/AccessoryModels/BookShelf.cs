using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models.AccessoryModels
{
    public class BookShelf
    {
        public int? Id { get; set; }
        public string Author { get; set; }
        public DateTime? CreateOn { get; set; }
        public string Description { get; set; }
        public Decimal? Price { get; set; }
        public string Title { get; set; }
        public string ContributorFirstName { get; set; }
        public string ContributorLastName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Genre { get; set; }
        public string BookType { get; set; }
		public string AltitudeCoordinate { get; set; }
		public string LongtiudeCoordinate { get; set; }
	}
}
