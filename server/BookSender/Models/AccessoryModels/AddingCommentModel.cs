using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models.AccessoryModels
{
    public class AddingCommentModel
    {
        public int BookId { get; set; }
        public string CommentText { get; set; }
    }
}