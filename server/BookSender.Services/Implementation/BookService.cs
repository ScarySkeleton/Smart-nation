using System;
using System.Linq;
using System.Collections.Generic;
using BookSender.Data;
using BookSender.Data.Models;
using BookSender.Services.Interfaces;

namespace BookSender.Services
{
	public class BookService : IBookService
	{
		private ApplicationContext _context;

		public BookService(ApplicationContext context)
		{
			_context = context;
		}

		public Book GetById(int id)
		{
			return _context.Books.FirstOrDefault(book => book.Id == id);
		}

		public List<Book> GetAll()
		{
			return _context.Books.ToList();
		}

		public void Insert(Book book)
		{
			book.CreatedOn = DateTime.UtcNow;

			_context.Books.Add(book);

			_context.SaveChanges();
		}

		public void Update(Book book)
		{
			var existed = _context
					.Books.Find(book.Id);

			existed.Title = book.Title;
			existed.Author = book.Author;
			existed.Description = existed.Description;
			existed.CurrentUserId = book.CurrentUserId;
			existed.ISBN = book.ISBN;
			existed.Price = book.Price;
			existed.PrintedOn = book.PrintedOn;
			existed.AmazonId = book.AmazonId;
			existed.GenreId = book.GenreId;
			existed.PictureId = book.PictureId;
			existed.ConributorId = book.ConributorId;
			existed.IsUsable = book.IsUsable;

			_context.SaveChanges();
		}

		public void Delete(Book book)
		{
			var existed = _context.Books.Find(book.Id);

			_context.Books.Remove(existed);

			_context.SaveChanges();
		}

        public List<Book> BooksSearch(string searchingPhr)
        {
            var ans = new List<Book>();
            if (searchingPhr == "aa")
            {
                ans.Add(new Book());
            }
            return ans;
        }
    }
}
