using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models.AccessoryModels
{
    public class DeleteCommentModel
    {
        public int BookId { get; set; }
        public int CommentId { get; set; }
    }
}
