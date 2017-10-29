using System;

namespace BookSender.Models
{
	public class BookHistory
    {
		public int Id { get; set; }

		public int? BookId { get; set; }

		public int? UserId { get; set; }

		public DateTime GetBookOn { get; set; }

		public DateTime GiveBookOn { get; set; }


		public User User { get; set; }

		public Book Book { get; set; }
	}
}
