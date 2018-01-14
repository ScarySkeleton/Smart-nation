using BookSender.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models.AccessoryModels
{
    public class DetailedBookInfo
    {
        public Book Book { get; set; }

        public List<CommentModel> CommentsList { get; set; }

		public string photoInBinary { get; set; }

		public List<FullBookInfoHistory> HistoryList { get; set; }
    }
}
