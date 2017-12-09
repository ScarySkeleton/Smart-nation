using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models.AccessoryModels
{
    public class BookModel
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Type { get; set; }
        public string Genre { get; set; }
        public string Photo { get; set; }
        public string Price { get; set; }
    }
}
