using System;

namespace BookSender.Data.Models
{
	public class DealStatus
    {
		public int Id { get; set; }

		public string Name { get; set; }

		public DateTime ExpirationTime { get; set; }
	}
}
