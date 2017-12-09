using System;

namespace BookSender.Data.Models
{
	public class BookHistory
	{
		public int Id { get; set; }

		public int? BookId { get; set; }

		public int? UserId { get; set; }

		public string AltitudeCoordinate { get; set; }
		public string LongtiudeCoordinate { get; set; }

		public DateTime GetBookOn { get; set; }

		public DateTime GiveBookOn { get; set; }


		public User User { get; set; }

		public Book Book { get; set; }
	}
}
