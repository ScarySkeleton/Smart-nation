using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookSender.Data.Models;
using BookSender.Data;
using Microsoft.EntityFrameworkCore;
using BookSender.Models.AccessoryModels;
using Microsoft.AspNetCore.Cors;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using BookSender.Models;
using System.Net;
using System.Net.Http;

namespace BookSender.Controllers
{
	[EnableCors("CorsPolicy")]
	[Authorize]
	public class PersonalCabinetController : Controller
	{
		private readonly ApplicationContext _context;

		public PersonalCabinetController(ApplicationContext context
			)
		{
			_context = context;
		}

		[HttpGet]
		public ActionResult Index()
		{
			return View();
		}

		[HttpPost]
		public  HttpResponseMessage AddBook([FromBody] BookModel incomingBook)
		{
			try
			{
				var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

				var user = _context.Users.FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

				if (user != null)
				{

					byte[] ImageData = System.Text.Encoding.UTF8.GetBytes(incomingBook.photoInBinary);

					Book book = new Book
					{
						CurrentUserId = user.Id,
						ContributorId = user.Id,
						Title = incomingBook.name,
						Author = incomingBook.author,
						Price = Convert.ToDecimal(incomingBook.price),
						Picture = new Data.Models.Picture()
						{
							ImageData = ImageData,
							Name = incomingBook.photo
						},
					};

					_context.Books.Add(book);
					_context.SaveChangesAsync();

					return new HttpResponseMessage(HttpStatusCode.Created);
				}
				else
				{
					return new HttpResponseMessage(HttpStatusCode.Unauthorized);
				}
			}
			catch (Exception e)
			{
				return new HttpResponseMessage(HttpStatusCode.BadRequest);
			}
		}

		[HttpPost]
		public async Task<JsonResult> GetAllUserBooks()
		{

			try
			{
				var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

				var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

				if (user != null)
				{
					List<Book> userBooks = await _context.Books.Where(
												b => b.ContributorId == user.Id).ToListAsync();

					List<BookOnShelf> booksOnShelf = new List<BookOnShelf>();

					foreach (var book in userBooks)
					{
						booksOnShelf.Add(new BookOnShelf()
						{
							Id = book.Id,
							AmazonId = book.AmazonId,
							Title = book.Title,
							Author = book.Author,
							ConributorId = book.ContributorId,
							CurrentUserId = book.CurrentUserId,
							Description = book.Description,
							CreatedOn = book.CreatedOn,
							PrintedOn = book.PrintedOn,
							GenreId = book.GenreId,
							ISBN = book.ISBN,
							IsUsable = book.IsUsable,
							Price = book.Price
						});
					}

					return Json(booksOnShelf);
				}
				else
				{
					throw new Exception("User was not found");
				}
			}
			catch (Exception e)
			{
				return Json("Error: " + e.Message);
			}
		}

		[HttpPost]
		public async Task<IActionResult> GetDetailedBookInfo([FromBody] Book incomingBook)
		{
			try
			{
				Data.Models.Book book = await _context.Books.FirstOrDefaultAsync(b => b.Id == incomingBook.Id);
				if (book != null)
				{
					List<BookHistory> bookHistory = await _context.BookHistoryRecords
														.Where(bh => bh.Id == incomingBook.Id).ToListAsync();

					List<User> userList = new List<User>();

					foreach (var bh in bookHistory)
					{
						userList.Add(
						   await _context.Users.Where(u => u.Id == bh.UserId).FirstOrDefaultAsync());
					}

					return Json("");
				}
				else
				{
					throw new Exception("Book was not found");
				}
			}
			catch (Exception e)
			{
				return Json("Error: " + e.Message);
			}
		}
	}
}