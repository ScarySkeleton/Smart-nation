namespace BookSender.Data.Models
{
	public class RatingStatus
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public int DemandMinNumberBooksAdded { get; set; }

		public int DemandMinNumberBooksGot { get; set; }

		public int DemandMinNumberBooksGiven { get; set; }

		public int OrderNumber { get; set; }
	}
}
