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
using BookSender.Helpers;

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
        public HttpResponseMessage AddBook([FromBody] BookModel incomingBook)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

                if (user != null)
                {

					byte[] ImageData = null;
					if(incomingBook.photoInBinary != null)
					{
						ImageData = PictureHelper.ConvertToImage(incomingBook.photoInBinary);
					}

                    Book book = new Book
                    {
                        CurrentUserId = user.Id,
                        ContributorId = user.Id,
                        Title = incomingBook.name,
                        Author = incomingBook.author,
                        Price = Convert.ToDecimal(incomingBook.price),
                        Picture = ImageData != null ? new Data.Models.Picture()
                        {
                            ImageData = ImageData,
                            Name = incomingBook.photo
                        } : null,
                        BookTypeId = incomingBook.type,
                        GenreId = incomingBook.genre
                    };

                    _context.Books.Add(book);
                    _context.SaveChanges();


                    BookHistory bookHistory = new BookHistory
                    {
                        Book = book,
                        GetBookOn = DateTime.UtcNow,
                        UserId = user.Id,
                        AltitudeCoordinate = incomingBook.AltitudeCoordinate,
                        LongtiudeCoordinate = incomingBook.LongtiudeCoordinate
                    };

                    _context.BookHistoryRecords.Add(bookHistory);
                    _context.SaveChanges();

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

        public async Task<JsonResult> GetAllUserBooks()
        {

            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

                if (user != null)
                {
                    List<Book> userBooks = await _context.Books.Where(
                                                b => b.CurrentUserId == user.Id).ToListAsync();

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
                            Price = book.Price,
                            PhotoInBinary = PictureHelper.ConvertToString(book.Picture.ImageData)
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

        public async Task<JsonResult> GetAllBooksAdded()
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
                            Price = book.Price,
                            PhotoInBinary = PictureHelper.ConvertToString(book.Picture.ImageData)
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

        #region Edit UserData
        [HttpPost]
        public HttpResponseMessage ChangePassword(string newPassword)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

                if (user != null && newPassword != null)
                {
                    user.Password = newPassword;
					_context.SaveChanges();
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
        [HttpPost]
        public HttpResponseMessage ChangeFirstName(string firstName)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

                if (user != null && firstName != null)
                {
                    user.FirstName = firstName;
					_context.SaveChanges();

					return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
        [HttpPost]
        public HttpResponseMessage ChangeLastName(string lastName)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

                if (user != null && lastName != null)
                {
                    user.LastName = lastName;
					_context.SaveChanges();

					return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
        [HttpPost]
        public HttpResponseMessage ChangeEmail(string email)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

                if (user != null && email != null)
                {
                    user.Email = email;
					_context.SaveChanges();

					return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
        [HttpPost]
        public HttpResponseMessage ChangePhoneNumber(string phoneNumber)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

                if (user != null && phoneNumber != null)
                {
                    user.PhoneNumber = phoneNumber;
					_context.SaveChanges();

					return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
                }

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
        [HttpPost]
        public HttpResponseMessage ChangeBirthDate(string birthDate)
        {
            try
            {
                if (birthDate == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
                }

                DateTime date = Convert.ToDateTime(birthDate);

                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

                if (user != null)
                {
                    user.BirthDate = date;
					_context.SaveChanges();

					return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
                }

            }
            catch (FormatException ex)
            {
                return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
        [HttpPost]
        public HttpResponseMessage ChangePhoto(string photoInBinary)
        {
            try
            {
                if (photoInBinary == null)
                {
                    return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
                }

                byte[] ImageData = PictureHelper.ConvertToImage(photoInBinary);


                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

                if (user != null)
                {
                    user.Picture = new Picture();
                    user.Picture.ImageData = ImageData;
					_context.SaveChanges();

					return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
                }

            }
            catch (FormatException ex)
            {
                return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }

        #endregion
    }
}