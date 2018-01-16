using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BookSender.Data;
using BookSender.Helpers;
using BookSender.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookSender.Data.Models;
using System.Net.Http;
using System.Net;
using BookSender.Models.AccessoryModels.DealModels;

namespace BookSender.Controllers
{
    [Authorize]
    public class OrderController : Controller
    {
        private readonly ApplicationContext _context;

        private Dictionary<string, string> responceDictionary = new Dictionary<string, string>
        {
            ["AskDonor"] = "<html>" + "<span>Someone want to take book from you, visit your cabinet to get more detais.</span>" + "</html>",
            ["AskAcceptor"] = "<html>" + "<span>Thank you for order.</span>" + "</html>",
            ["DenyDonor"] = "<html>" + "<span>You have denied another users request.</span>" + "</html>",
            ["DenyAcceptor"] = "<html>" + "<span>Unfortunatelly, you request has been denied.</span>" + "</html>",
            ["AcceptDonor"] = "<html>" + "<span>Thank you for accepting request.</span>" + "</html>",
            ["AcceptAcceptor"] = "<html>" + "<span>Your request has been accepted. Contact with donor to get your book.</span>" + "</html>",
            ["Close"] = "<html>" + "<span>Thank you for using our service.</span>" + "</html>"
        };

        public OrderController(ApplicationContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Index()
        {

            return View();
        }
		/// <summary>
		/// Method sends a request for book Order for it's current owner and creates new Deal
		/// </summary>
		/// <param name="bookId"></param>
		/// <returns>JsonResult BookForOrder Model/Error message</returns>
        [HttpPost]
        public JsonResult Order([FromBody] int bookId)
        {
            try
            {
                var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;
                var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

                var book = _context.Books.FirstOrDefault(b => b.Id == bookId);

                var currentBookOwner = _context.Users.FirstOrDefault(u => u.Id == book.CurrentUserId);

                if (book != null && user != null)
                {
                    Deal deal = new Deal
                    {
                        DonorId = book.CurrentUserId,
                        AcceptorId = user.Id,
                        BookId = book.Id,
                        DealStatusId = (int?)DealHelper.Status.OPENED,
                        CreatedOn = DateTime.UtcNow,
                        ExpiredOn = DateTime.UtcNow.AddDays(_context.DealStatuses.FirstOrDefault(d => d.Id == (int?)DealHelper.Status.OPENED).ExpirationTime),
                        ModifiedOn = DateTime.UtcNow,
                        EndedOn = null
                    };

                    _context.Deals.Add(deal);
                    _context.SaveChanges();

                    BookForOrder bookForOrder = new BookForOrder
                    {
                        Id = book.Id,
                        Title = book.Title,
                        Author = book.Author,
                        Description = book.Description,
                        BookTypeId = book.BookTypeId,
                        GenreId = book.GenreId,
                        CreatedOn = book.CreatedOn,
                        PrintedOn = book.PrintedOn,
                        photoInBinnary = book.Picture != null ? PictureHelper.ConvertToString(book.Picture.ImageData) : null,
                        Price = book.Price,
                        OwnerId = book.CurrentUserId,
                        OwnerFirstName = book.CurrentUser.FirstName,
                        OwnerLastName = book.CurrentUser.LastName,
                        OwnerPhoneNumber = book.CurrentUser.PhoneNumber,
                        OwnerEmail = book.CurrentUser.Email
                    };

                    if (!String.IsNullOrEmpty(currentBookOwner.Email))
                        GmailSender.SmtpClientLibrary.SendOrderRequestMessages(currentBookOwner.Email,
                            responceDictionary["AskDonor"], "Book Donation", "mail", "pass");
                    if (!String.IsNullOrEmpty(user.Email))
                        GmailSender.SmtpClientLibrary.SendOrderRequestMessages(user.Email,
                            responceDictionary["AskAcceptor"], "Book Donation", "mail", "pass");

                    return Json(bookForOrder);
                }
                else
                {
                    return Json("Error: " + "Not found");
                }
            }
            catch (Exception e)
            {
                return Json("Error: " + e.Message);
            }
        }
		/// <summary>
		/// Declines the request on Book. Could be called by Current book owner or by reqester.
		/// </summary>
		/// <param name="theDeal"></param>
		/// <returns>HttpResponseMessage OK/BadRequest</returns>
		public async Task<HttpResponseMessage> DeclineDeal([FromBody] DealModel theDeal)
        {
            try
            {
				var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

				var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

				if (user == null)
					return new HttpResponseMessage(HttpStatusCode.Unauthorized);

				Deal deal = await _context.Deals.Where(d => d.Id == theDeal.Dealid).Include(d => d.Book).FirstOrDefaultAsync();

				if(deal.DealStatusId == (int?)DealHelper.Status.RECIEVED)
				{
					var bookHistoryRecords = _context.BookHistoryRecords
													   .Where(bh => bh.BookId == deal.BookId)
													   .OrderByDescending(bh => bh.GetBookOn)
													   .Take(2).ToList();

					_context.BookHistoryRecords.Remove(bookHistoryRecords[0]);

					bookHistoryRecords[1].GiveBookOn = null;
					deal.Book.CurrentUserId = user.Id;

				}

                deal.DealStatusId = (int?)DealHelper.Status.DECLINED;
                deal.ModifiedOn = DateTime.UtcNow;
                deal.ExpiredOn = DateTime.UtcNow;
                deal.EndedOn = DateTime.UtcNow;

                _context.SaveChanges();

                var bookRecipient = _context.Users.FirstOrDefault(u => u.Id == deal.AcceptorId);
                var bookOwner = _context.Users.FirstOrDefault(u => u.Id == deal.DonorId);

                if (!String.IsNullOrEmpty(bookOwner.Email))
                    GmailSender.SmtpClientLibrary.SendOrderRequestMessages(bookOwner.Email,
                        responceDictionary["DenyDonor"], "Declined request", "mail", "pass");
                if (!String.IsNullOrEmpty(bookRecipient.Email))
                    GmailSender.SmtpClientLibrary.SendOrderRequestMessages(bookRecipient.Email,
                        responceDictionary["DenyAcceptor"], "Declined request", "mail", "pass");

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
		/// <summary>
		/// Approves request for a Book. Could be called only by CurrentBook Owner.
		/// </summary>
		/// <param name="theDeal"></param>
		/// <returns>HttpResponseMessage OK/BadRequest</returns>
		public async Task<HttpResponseMessage> ApproveDeal([FromBody] DealModel theDeal)
        {
            try
            {
                Deal deal = await _context.Deals.FirstOrDefaultAsync(d => d.Id == theDeal.Dealid);

                deal.DealStatusId = (int?)DealHelper.Status.SUBMITED;
                deal.ModifiedOn = DateTime.UtcNow;
                deal.ExpiredOn = DateTime.UtcNow.AddDays(_context.DealStatuses.FirstOrDefault(s => s.Id == (int?)DealHelper.Status.SUBMITED).ExpirationTime);

                _context.SaveChanges();

                var bookRecipient = _context.Users.FirstOrDefault(u => u.Id == deal.AcceptorId);
                var bookOwner = _context.Users.FirstOrDefault(u => u.Id == deal.DonorId);

                if (!String.IsNullOrEmpty(bookOwner.Email))
                    GmailSender.SmtpClientLibrary.SendOrderRequestMessages(bookOwner.Email,
                        responceDictionary["AcceptDonor"], "Accepted request", "mail", "pass");
                if (!String.IsNullOrEmpty(bookRecipient.Email))
                    GmailSender.SmtpClientLibrary.SendOrderRequestMessages(bookRecipient.Email,
                        responceDictionary["AcceptAcceptor"], "Accepted request", "mail", "pass");

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
		/// <summary>
		/// Aproves Book recieved by requester who received the book from previous owner.Could be called by requster
		/// </summary>
		/// <param name="bookRecieved"></param>
		/// <returns>HttpResponseMessage OK/BadRequest</returns>
		public async Task<HttpResponseMessage> BookRecieved([FromBody]BookReceivedModel bookRecieved)
        {
			if(bookRecieved == null)
				return new HttpResponseMessage(HttpStatusCode.BadRequest);

			try
			{
				var userId = User.Claims.FirstOrDefault(C => C.Type == ClaimTypes.NameIdentifier).Value;

				var user = _context.Users.FirstOrDefault(u => u.Id == int.Parse(userId));

				if (user == null)
					return new HttpResponseMessage(HttpStatusCode.Unauthorized);

				Deal deal = await _context.Deals.Where(d => d.Id == bookRecieved.DealId).Include(d => d.Book).FirstOrDefaultAsync();

                deal.DealStatusId = (int?)DealHelper.Status.RECIEVED;
                deal.ModifiedOn = DateTime.UtcNow;
                deal.ExpiredOn = DateTime.UtcNow.AddDays(_context.DealStatuses.FirstOrDefault(s => s.Id == (int?)DealHelper.Status.RECIEVED).ExpirationTime);

				if (deal.Book == null)
					return new HttpResponseMessage( HttpStatusCode.BadRequest);

				deal.Book.CurrentUserId = user.Id;

				var bookHistoryPrevous = await _context.BookHistoryRecords
													   .Where(bh => bh.BookId == deal.BookId)
													   .OrderByDescending(bh => bh.GetBookOn)
													   .FirstOrDefaultAsync();

				if (bookHistoryPrevous == null)
					return new HttpResponseMessage(HttpStatusCode.NotFound);


				bookHistoryPrevous.GiveBookOn = DateTime.UtcNow;

				BookHistory bookHistoryNew = new BookHistory
				{
					BookId = deal.BookId,
					UserId = deal.AcceptorId,
					GetBookOn = DateTime.UtcNow,
					LongtiudeCoordinate = bookRecieved.LongtiudeCoordinate,
					AltitudeCoordinate = bookRecieved.AltitudeCoordinate
				};

				_context.BookHistoryRecords.Add(bookHistoryNew);

				_context.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }
		/// <summary>
		/// Closing Deal successfuly(Finall stage). Could be called By book Donor(previous owner)
		/// </summary>
		/// <param name="theDeal"></param>
		/// <returns>HttpResponseMessage OK/BadRequest</returns>
		public async Task<HttpResponseMessage> CloseDeal([FromBody] DealModel theDeal)
        {
            try
            {
                Deal deal = await _context.Deals.FirstOrDefaultAsync(d => d.Id == theDeal.Dealid);

                deal.DealStatusId = (int?)DealHelper.Status.CLOSED;
                deal.ModifiedOn = DateTime.UtcNow;
                deal.ExpiredOn = DateTime.UtcNow;
                deal.EndedOn = DateTime.UtcNow;

                _context.SaveChanges();

                var bookRecipient = _context.Users.FirstOrDefault(u => u.Id == deal.AcceptorId);
                var bookOwner = _context.Users.FirstOrDefault(u => u.Id == deal.DonorId);

                if (!String.IsNullOrEmpty(bookOwner.Email))
                    GmailSender.SmtpClientLibrary.SendOrderRequestMessages(bookOwner.Email,
                        responceDictionary["Close"], "Closed request", "mail", "pass");
                if (!String.IsNullOrEmpty(bookRecipient.Email))
                    GmailSender.SmtpClientLibrary.SendOrderRequestMessages(bookRecipient.Email,
                        responceDictionary["Close"], "Closed request", "mail", "pass");

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }



    }
}