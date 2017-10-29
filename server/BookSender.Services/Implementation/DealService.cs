using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;
using BookSender.Data;
using BookSender.Data.Models;
using BookSender.Services.Interfaces;

namespace BookSender.Services
{
	public class DealService : IDealService
    {

		private ApplicationContext _context;

		DealService(ApplicationContext context)
		{
			_context = context;
		}

		public Deal GetById(int id)
		{
			return _context.Deals.FirstOrDefault(deal => deal.Id == id);
		}

		public List<Deal> GetAll()
		{
			return _context.Deals.ToList();
		}

		public void Insert(Deal deal)
		{
			deal.CreatedOn = DateTime.UtcNow;

			_context.Deals.Add(deal);

			_context.SaveChanges();
		}

		public void Update(Deal deal)
		{
			var existed = _context
					.Deals.Find(deal.Id);

			existed.BookId = deal.BookId;
			existed.AcceptorId= deal.AcceptorId;
			existed.DonorId = existed.DonorId;
			existed.ExpiredOn = deal.ExpiredOn;
			existed.ModifiedOn = deal.ModifiedOn;
			existed.EndedOn = deal.EndedOn;
			existed.DealStatusId = deal.DealStatusId;

			_context.SaveChanges();
		}

		public void Delete(Deal deal)
		{
			var existed = _context.Books.Find(deal.Id);

			_context.Books.Remove(existed);

			_context.SaveChanges();
		}

	}
}
