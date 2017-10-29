using System.Linq;
using System.Collections.Generic;
using BookSender.Data;
using BookSender.Data.Models;
using BookSender.Services.Interfaces;

namespace BookSender.Services
{
	public class RatingStatusService: IRatingStatusService
    {
		private ApplicationContext _context;

		RatingStatusService(ApplicationContext context)
		{
			_context = context;
		}

		public RatingStatus GetById(int id)
		{
			return _context.RatingStatuses.FirstOrDefault(ratingStatus => ratingStatus.Id == id);
		}

		public List<RatingStatus> GetAll()
		{
			return _context.RatingStatuses.ToList();
		}

		public void Insert(RatingStatus ratingStatus)
		{
			_context.RatingStatuses.Add(ratingStatus);

			_context.SaveChanges();
		}

		public void Update(RatingStatus ratingStatus)
		{
			var existed = _context
					.RatingStatuses.Find(ratingStatus.Id);

			existed.Name = ratingStatus.Name;
			existed.OrderNumber = ratingStatus.OrderNumber;
			existed.DemandMinNumberBooksAdded= ratingStatus.DemandMinNumberBooksAdded;
			existed.DemandMinNumberBooksGot = ratingStatus.DemandMinNumberBooksGot;

			_context.SaveChanges();
		}

		public void Delete(RatingStatus RatingStatus)
		{
			var existed = _context.RatingStatuses.Find(RatingStatus.Id);

			_context.RatingStatuses.Remove(existed);

			_context.SaveChanges();
		}

	}
}
