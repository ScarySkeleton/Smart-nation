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
                        DealStatusId = 1,
                        CreatedOn = DateTime.UtcNow,
                        ExpiredOn = DateTime.UtcNow.AddDays(_context.DealStatuses.FirstOrDefault(d => d.Id == 1).ExpirationTime),
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

        public async Task<HttpResponseMessage> DeclineDeal(int? dealId)
        {
            try
            {
                Deal deal = await _context.Deals.FirstOrDefaultAsync(d => d.Id == dealId);

                deal.DealStatusId = 3;
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

        public async Task<HttpResponseMessage> ApproveDeal(int? dealId)
        {
            try
            {
                Deal deal = await _context.Deals.FirstOrDefaultAsync(d => d.Id == dealId);

                deal.DealStatusId = 2;
                deal.ModifiedOn = DateTime.UtcNow;
                deal.ExpiredOn = DateTime.UtcNow.AddDays(_context.DealStatuses.FirstOrDefault(s => s.Id == 2).ExpirationTime);

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

        public async Task<HttpResponseMessage> BookRecieved(int? dealId)
        {
            try
            {
                Deal deal = await _context.Deals.FirstOrDefaultAsync(d => d.Id == dealId);

                deal.DealStatusId = 4;
                deal.ModifiedOn = DateTime.UtcNow;
                deal.ExpiredOn = DateTime.UtcNow.AddDays(_context.DealStatuses.FirstOrDefault(s => s.Id == 4).ExpirationTime);

                _context.SaveChanges();

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

        }

        public async Task<HttpResponseMessage> CloseDeal(int? dealId)
        {
            try
            {
                Deal deal = await _context.Deals.FirstOrDefaultAsync(d => d.Id == dealId);

                DateTime bookRecievedOn = deal.ModifiedOn;

                deal.DealStatusId = 6;
                deal.ModifiedOn = DateTime.UtcNow;
                deal.ExpiredOn = DateTime.UtcNow;
                deal.EndedOn = DateTime.UtcNow;


                var bookHistoryPrevous = await _context.BookHistoryRecords
                                                        .Where(bh => bh.BookId == deal.BookId)
                                                        .OrderByDescending(bh => bh.GetBookOn)
                                                        .FirstOrDefaultAsync();

                if (bookHistoryPrevous == null)
                    return new HttpResponseMessage(HttpStatusCode.NotFound);

                bookHistoryPrevous.GiveBookOn = DateTime.UtcNow;

                //TODO: Add new Cords for Book
                BookHistory bookHistoryNew = new BookHistory
                {
                    //BookId = deal.BookId == null ? deal.BookId : null,
                    //UserId = deal.AcceptorId,
                    //GetBookOn = bookRecievedOn
                };


                await _context.BookHistoryRecords.AddAsync(bookHistoryNew);

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