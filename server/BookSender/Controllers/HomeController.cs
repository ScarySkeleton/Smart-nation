using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookSender.Models;
using BookSender.Data;
using BookSender.Data.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using BookSender.Models.AccessoryModels;
using System.Data.SqlClient;
using System.Data;
using System.Security.Claims;
using BookSender.Helpers;

namespace BookSender.Controllers
{
    [EnableCors("CorsPolicy")]
    public class HomeController : Controller
    {
		const int DEFAULT_USER_FOR_COMMENTS_ID = 1;

		private readonly ApplicationContext _context;
        public HomeController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetAllSearchedBooks([FromBody] FilteringModel filteringModel)
        {
            List<BookShelf> bookList = new List<BookShelf>();

            string sqlExpression = "FindSearchedBook";
            var SearchedTitle = new SqlParameter("@searchedTitle", filteringModel.Title);
            var SearchedAuthor = new SqlParameter("@searchedAuthor", filteringModel.Author);
            var BookGener = new SqlParameter("@bookGener", filteringModel.Gener);
            var BookType = new SqlParameter("@bookType", filteringModel.Type);
            try
            {
                using (SqlConnection connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))
                {

                    SqlCommand command = new SqlCommand(sqlExpression, connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(SearchedTitle);
                    command.Parameters.Add(SearchedAuthor);
                    command.Parameters.Add(BookGener);
                    command.Parameters.Add(BookType);

                    connection.Open();
                    var reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            bookList.Add(
                                new BookShelf
                                {
                                    Id = (reader.IsDBNull(0)) ? 0 : reader.GetInt32(0),
                                    Author = (reader.IsDBNull(1)) ? null : reader.GetString(1),
                                    CreateOn = (reader.IsDBNull(2)) ? new DateTime(1900, 01, 01) : reader.GetDateTime(2),
                                    Description = (reader.IsDBNull(3)) ? null : reader.GetString(3),
                                    Price = (reader.IsDBNull(4)) ? new Decimal(0.00) : reader.GetDecimal(4),
                                    Title = (reader.IsDBNull(5)) ? null : reader.GetString(5),
                                    ContributorFirstName = (reader.IsDBNull(6)) ? null : reader.GetString(6),
                                    ContributorLastName = (reader.IsDBNull(7)) ? null : reader.GetString(7),
                                    FirstName = (reader.IsDBNull(8)) ? null : reader.GetString(8),
                                    LastName = (reader.IsDBNull(9)) ? null : reader.GetString(9),
                                    PhoneNumber = (reader.IsDBNull(10)) ? null : reader.GetString(10),
                                    Genre = (reader.IsDBNull(11)) ? null : reader.GetString(11),
                                    BookType = (reader.IsDBNull(12)) ? null : reader.GetString(12),
									LongtiudeCoordinate = reader.IsDBNull(13) ? null : reader.GetString(13),
									AltitudeCoordinate = (reader.IsDBNull(14) ? null : reader.GetString(14))
                                });
                        }
                    }
                    reader.Close();
                    connection.Close();
                }
                return Json(bookList);
            }
            catch (Exception ex)
            {
                return Json("zrada");
            }
        }
        public JsonResult GetBookPageData([FromBody] int? bookId)
        {
            if (bookId != null)
            {
				try
				{
					Book book = _context.Books.Where(b => b.Id == bookId).Include(b => b.Picture).FirstOrDefault();


                    List<Comment> bookComments = _context.Comments.Where(c => c.BookId == book.Id).Include("User").ToList();

                    List<FullBookInfoHistory> bookHistory = GetAllBookHistory(book.Id);

                    DetailedBookInfo dd = new DetailedBookInfo
                    {
                        Book = book,
                        CommentsList = bookComments,
                        HistoryList = bookHistory
                    };

					dd.photoInBinary = book.Picture != null ? PictureHelper.ConvertToString(book.Picture.ImageData) : null;


					return Json(dd);
                }
                catch (Exception ex)
                {
                    return Json("Select book");
                }
            }
            else
            {
                return Json("Select book");
            }
        }
        [HttpPost]
        public JsonResult AddComment([FromBody] AddingCommentModel addingComment)
        {

            if (addingComment != null)
            {
				int UserId = DEFAULT_USER_FOR_COMMENTS_ID;

                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier);

				if (userId != null)
					UserId = int.Parse(userId.Value);
                    try
                    {
                        Comment comment = new Comment
                        {
                            UserId = Convert.ToInt32(userId.Value),
                            BookId = addingComment.BookId,
                            CommentBody = addingComment.CommentText,
                            CreatedOn = DateTime.Now
                        };

                        _context.Comments.Add(comment);
                        _context.SaveChanges();

                        return Json("Success");
                    }
                    catch (Exception ex)
                    {
                        return Json("Failed");
                    }
                }
            else
                return Json("Failed");
        }
        [HttpPost]
        public JsonResult DeleteComment([FromBody] DeleteCommentModel deleteComment)
        {
            if (deleteComment != null)
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                if (userId == null)
                    return Json("Authorize");
                else
                {
                    try
                    {
                        Comment comment = new Comment { Id = deleteComment.CommentId };
                        _context.Comments.Attach(comment);
                        _context.Comments.Remove(comment);
                        _context.SaveChanges();

                        return Json("Success");
                    }
                    catch (Exception ex)
                    {
                        return Json("Failed");
                    }
                }
            }
            else
                return Json("Failed");
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";
            // some text for commit 
            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public List<FullBookInfoHistory> GetAllBookHistory(int bookId)
        {
            try
            {
                List<FullBookInfoHistory> fullBookIH = new List<FullBookInfoHistory>();
                List<BookHistory> bookHistory = _context.BookHistoryRecords.Where(bh => bh.BookId == bookId).ToList();

                foreach (var bh in bookHistory)
                {
                    User user = _context.Users.Where(u => u.Id == bh.UserId).FirstOrDefault();

                    fullBookIH.Add(
                        new FullBookInfoHistory
                        {
                            Id = bh.Id,

                            AltitudeCoordinate = bh.AltitudeCoordinate,

                            LongtiudeCoordinate = bh.LongtiudeCoordinate,

                            GetBookOn = bh.GetBookOn,

                            GiveBookOn = bh.GiveBookOn,

                            UserEmail = user.Email,

                            UserPhone = user.PhoneNumber,

                            UserFullName = (user.FirstName + user.LastName) ?? "Hiden Assasin"

                        });
                }

                return fullBookIH;
            }

            catch
            {
                return null;
            }
        }

		#region Hellpers
		[HttpPost]
		public JsonResult GetAllGenres()
		{
			try
			{
				List<Genre> genres = _context.Genres.ToList();

				return Json(genres);
			}
			catch (Exception ex)
			{
				return Json("Error: " + ex.Message);
			}

		}
		[HttpPost]
		public JsonResult GetAllBookTypes()
		{
			try
			{
				List<BookType> types = _context.BookTypes.ToList();

				return Json(types);
			}
			catch (Exception ex)
			{
				return Json("Error: " + ex.Message);
			}

		}

		[HttpPost]
		public JsonResult GetAllDealStatuses()
		{
			try
			{
				List<DealStatus> statuses = _context.DealStatuses.ToList();

				return Json(statuses);
			}
			catch (Exception ex)
			{
				return Json("Error: " + ex.Message);
			}

		}
		#endregion
	}
}
