using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookSender.Models
{
	public class User
    {
		public int Id { get; set; }

		[Required]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", ErrorMessage = "Wrong adress")]
        public string Email { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 10, ErrorMessage = "Number must containe more than 10 symbols")]
        public string Number { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "Passwords don`t match")]
        public string PasswordConfirmation { get; set; }


		public int? RoleId { get; set; }
        public Role Role { get; set; }

		public string FirstName { get; set; }

		public string LastName { get; set; }

		public DateTime BirthDate { get; set; }

		public int? PictureId { get; set; }


		public int? RatingStatusId { get; set; }
		public RatingStatus RatingStatus { get; set; }

		public DateTime AvailableFrom { get; set; }

		public DateTime AvailableTill { get; set; }

		public DateTime RegisteredOn { get; set; }

		public virtual Picture Picture { get; set; }

		[InverseProperty("CurrentUser")]
		public virtual IList<Book> Books { get; set; }

		[InverseProperty("Contributor")]
		public virtual IList<Book> AddedBooks { get; set; }

		[InverseProperty("User")]
		public virtual IList<Review> ReviewsAsCommentor { get; set; }

		[InverseProperty("Commentor")]
		public virtual IList<Review> LeftComments { get; set; }

		[InverseProperty("Donor")]
		public virtual IList<Deal> DealsAsDonor { get; set; }

		[InverseProperty("Acceptor")]
		public virtual IList<Deal> DealsAsAcceptor { get; set; }

	}
}
