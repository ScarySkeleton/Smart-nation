using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BookSender.Data.Models
{
    public class Comment
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int? UserId { get; set; }
        [Required]
        public int? BookId { get; set; }

        public string CommentBody { get; set; }

        public DateTime? CreatedOn { get; set; }
       
        public User User { get; set; }

        public Book Book { get; set; }
    }
}
