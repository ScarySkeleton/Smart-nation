using System;

namespace BookSender.Data.Models
{
	public class Deal
    {
		public int Id { get; set; }

		public int DonorId { get; set; }

		public int AcceptorId { get; set; }

		public int BookId { get; set; }

		public int? DealStatusId { get; set; }

		public DateTime CreatedOn { get; set; }

		public DateTime? EndedOn { get; set; }

		public DateTime ModifiedOn { get; set; }

		public DateTime ExpiredOn { get; set; }


		public User Donor { get; set; }

		public User Acceptor { get; set; }

		public Book Book { get; set; }

		public DealStatus DealStatus { get; set; }

	}
}
