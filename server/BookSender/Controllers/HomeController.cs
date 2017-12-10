using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookSender.Models;
using BookSender.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using BookSender.Models.AccessoryModels;
using System.Data.SqlClient;
using System.Data;

namespace BookSender.Controllers
{
    [EnableCors("CorsPolicy")]
    public class HomeController : Controller
    {
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
        public JsonResult GetAllSearchedBooks(FilteringModel filteringModel)
        {
            List<BookShelf> bookList = new List<BookShelf>();

            string sqlExpression = "FindSearchedBook";
            var SearchedTitle = new SqlParameter("@searchedTitle", filteringModel.Title);
            var SearchedAuthor = new SqlParameter("@searchedAuthor", filteringModel.Author);
            var BookGenre = new SqlParameter("@bookGenre", filteringModel.Gener);
            var BookType = new SqlParameter("@bookType", filteringModel.Type);

            using (SqlConnection connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))
            {

                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(SearchedTitle);
                command.Parameters.Add(SearchedAuthor);
                command.Parameters.Add(BookGenre);
                command.Parameters.Add(BookType);

                var reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        bookList.Add(
                            new BookShelf {
                                Id = reader.GetInt32(0),
                                Author = reader.GetString(1),
                                CreateOn = reader.GetDateTime(2),
                                Description = reader.GetString(3),
                                Price = reader.GetDecimal(4),
                                ContributorFirstName = reader.GetString(5),
                                ContributorLastName = reader.GetString(6),
                                FirstName = reader.GetString(7),
                                LastName = reader.GetString(8),
                                PhoneNumber = reader.GetString(9),
                                Genre = reader.GetString(10),
                                BookType = reader.GetString(11)
                            });
                    }
                }

                reader.Close();
            }
            return Json(bookList);
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
    }
}
