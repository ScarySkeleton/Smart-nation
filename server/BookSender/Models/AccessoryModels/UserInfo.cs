using BookSender.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models.AccessoryModels
{
    public class UserInfo
    {
		public int Id { get; set; }

		public string Email { get; set; }

		public string PhoneNumber { get; set; }

		public string RoleName { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public DateTime BirthDate { get; set; }

		public string RatingStatusName { get; set; }

		public DateTime AvailableFrom { get; set; }

		public DateTime AvailableTill { get; set; }

		public DateTime RegisteredOn { get; set; }

		public string PhotoinBinary { get; set; }

	}
}
