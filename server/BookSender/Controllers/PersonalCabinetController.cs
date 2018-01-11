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

        public PersonalCabinetController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddBook([FromBody]BookModel incomingBook)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

                if (user != null)
                {

                    byte[] ImageData = null;
                    if (incomingBook.photoInBinary != null)
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
						BookTypeId = 1, //incomingBook.type,
						GenreId = 1//incomingBook.genre
					};

                    _context.Books.Add(book);
                    _context.SaveChanges();


					BookHistory bookHistory = new BookHistory
					{
						Book = book,
						GetBookOn = DateTime.UtcNow,
						UserId = user.Id,
						AltitudeCoordinate = incomingBook.AltitudeCoordinate,
						LongtiudeCoordinate = incomingBook.LongitudeCoordinate
                    };

                    _context.BookHistoryRecords.Add(bookHistory);
                    _context.SaveChanges();

                    return null;// new HttpResponseMessage(HttpStatusCode.Created);
                }
                else
                {
                    return null;//  new HttpResponseMessage(HttpStatusCode.Unauthorized);
                }
            }
            catch (Exception e)
            {
                return null;// new HttpResponseMessage(HttpStatusCode.BadRequest);
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
                                                b => b.CurrentUserId == user.Id)
                                                .Include(b => b.Picture)
                                                .ToListAsync();

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
                            PhotoInBinary = book.Picture != null ? PictureHelper.ConvertToString(book.Picture.ImageData) : null
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
        public JsonResult GetUserInfo()
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

                if (user != null)
                {
                    UserInfo uInfo = new UserInfo
                    {
                        Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        PhoneNumber = user.PhoneNumber,
                        RoleName = user.Role.Name,
                        AvailableFrom = user.AvailableFrom,
                        AvailableTill = user.AvailableTill,
                        BirthDate = user.BirthDate,
                        RegisteredOn = user.RegisteredOn,
                        RatingStatusName = user.RatingStatus.Name,
                        PhotoinBinary = user.Picture != null ? PictureHelper.ConvertToString(user.Picture.ImageData) : null
                    };

                   return Json(uInfo);
                }
                return Json("Error");
            }
            catch (Exception ex)
            {
                return Json("Error");
            }
        }
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

        #region User's Deals

        public async Task<JsonResult> GetAllMyDealsAsAcceptor()
        {

            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

                if (user != null)
                {
                    List<Deal> userDeals = await _context.Deals.Where(
                                                b => b.AcceptorId == user.Id)
                                                .ToListAsync();

                    List<DealModel> dealsList = new List<DealModel>();

                    foreach (var deal in userDeals)
                    {
                        dealsList.Add(new DealModel()
                        {
                            Id = deal.Id,
                            BookId = deal.BookId,
                            AcceptorId = deal.AcceptorId,
                            DonorId = deal.DonorId,
                            DealStatusId = deal.DealStatusId,
                            CreatedOn = deal.CreatedOn,
                            EndedOn = deal.EndedOn,
                            ExpiredOn = deal.ExpiredOn,
                            ModifiedOn = deal.ModifiedOn
                        });
                    }

                    return Json(dealsList);
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

        public async Task<JsonResult> GetAllMyDealsAsDonor()
        {

            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

                if (user != null)
                {
                    List<Deal> userDeals = await _context.Deals.Where(
                                                b => b.DonorId == user.Id)
                                                .ToListAsync();

                    List<DealModel> dealsList = new List<DealModel>();

                    foreach (var deal in userDeals)
                    {
                        dealsList.Add(new DealModel()
                        {
                            Id = deal.Id,
                            BookId = deal.BookId,
                            AcceptorId = deal.AcceptorId,
                            DonorId = deal.DonorId,
                            DealStatusId = deal.DealStatusId,
                            CreatedOn = deal.CreatedOn,
                            EndedOn = deal.EndedOn,
                            ExpiredOn = deal.ExpiredOn,
                            ModifiedOn = deal.ModifiedOn
                        });
                    }

                    return Json(dealsList);
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

        #endregion
    }
}