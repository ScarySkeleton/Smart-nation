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
                                    CreateOn = (reader.IsDBNull(2)) ? new DateTime(1900,01,01) : reader.GetDateTime(2),
                                    Description = (reader.IsDBNull(3))? null : reader.GetString(3),
                                    Price = (reader.IsDBNull(4)) ? new Decimal(0.00) : reader.GetDecimal(4),
                                    Title = (reader.IsDBNull(5)) ? null : reader.GetString(5),
                                    ContributorFirstName = (reader.IsDBNull(6)) ? null : reader.GetString(6),
                                    ContributorLastName = (reader.IsDBNull(7)) ? null : reader.GetString(7),
                                    FirstName = (reader.IsDBNull(8)) ? null : reader.GetString(8),
                                    LastName = (reader.IsDBNull(9)) ? null : reader.GetString(9),
                                    PhoneNumber = (reader.IsDBNull(10)) ? null : reader.GetString(10),
                                    Genre = (reader.IsDBNull(11)) ? null : reader.GetString(11),
                                    BookType = (reader.IsDBNull(12)) ? null : reader.GetString(12)
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
