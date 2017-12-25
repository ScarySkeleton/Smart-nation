using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models
{
	public class BookForOrder
	{
		public int Id { get; set; }

		public string Title { get; set; }

		public int? GenreId { get; set; }
		public int? BookTypeId { get; set; }

		public string Author { get; set; }

		public string Description { get; set; }

		public decimal? Price { get; set; }

		public DateTime CreatedOn { get; set; }

		public DateTime PrintedOn { get; set; }

		public string photoInBinnary { get; set; }

		// Contibutor info

		// Owner info
		public int? OwnerId { get; set; }

		public string OwnerFirstName { get; set; }

		public string OwnerLastName { get; set; }

		public string OwnerPhoneNumber { get; set; }

		public string OwnerEmail { get; set; }

	}
}
