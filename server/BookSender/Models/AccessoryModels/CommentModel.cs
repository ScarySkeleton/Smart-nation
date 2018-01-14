using System;

namespace BookSender.Models.AccessoryModels
{
	public class CommentModel
	{
		public int Id { get; set; }

		public int BookId { get; set; }

		public int UserId { get; set; }

		public string CommentBody { get; set; }

		public string CreatedOn { get; set; }

		public string UserFirstName { get; set; }

		public string UserLastName { get; set; }


	}
}
