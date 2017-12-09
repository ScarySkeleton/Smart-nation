using System;

namespace BookSender.Data.Models
{
    public class Book
    {
        public int Id { get; set; }

        public int? CurrentUserId { get; set; }

        public string Title { get; set; }

        public int? GenreId { get; set; }

        public int? BookTypeId { get; set; }

        public string Author { get; set; }

        public string Description { get; set; }

        public int? ContributorId { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime PrintedOn { get; set; }

        public string ISBN { get; set; }

        public string AmazonId { get; set; }

        public decimal? Price { get; set; }

        public int? PictureId { get; set; }

        public bool IsUsable { get; set; }


        public Picture Picture { get; set; }

        public User CurrentUser { get; set; }

        public User Contributor { get; set; }

        public Genre Genre { get; set; }

        public BookType BookType { get; set; }
	}
}
