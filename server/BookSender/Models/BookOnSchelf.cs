using System;

namespace BookSender.Models
{
	public class BookOnShelf
    {
		public int Id { get; set; }

		public int? CurrentUserId { get; set; }

		public string Title { get; set; }

		public int? GenreId { get; set; }

		public string Author { get; set; }

		public string Description { get; set; }

		public int? ConributorId { get; set; }

		public DateTime CreatedOn { get; set; }

		public DateTime PrintedOn { get; set; }

		public string ISBN { get; set; }

		public string AmazonId { get; set; }

		public decimal? Price { get; set; }

		public int? PictureId { get; set; }

		public bool IsUsable { get; set; }

	}
}
