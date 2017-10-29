using BookSender.Data.Models;
using System.Collections.Generic;

namespace BookSender.Services.Interfaces
{
	public interface IBookService : IService<Book>
	{
        List<Book> BooksSearch(string searchingPhr);
	}
}
