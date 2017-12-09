using System;
using System.Linq;
using System.Collections.Generic;
using BookSender.Data;
using BookSender.Data.Models;
using BookSender.Services.Interfaces;

namespace BookSender.Services
{
	public class ReviewService : IReviewService
    {
		private ApplicationContext _context;

		ReviewService(ApplicationContext context)
		{
			_context = context;
		}

		public Review GetById(int id)
		{
			return _context.Reviews.FirstOrDefault(review => review.Id == id);
		}

		public List<Review> GetAll()
		{
			return _context.Reviews.ToList();
		}

		public void Insert(Review review)
		{
			review.CreatedOn = DateTime.UtcNow;

			_context.Reviews.Add(review);

			_context.SaveChanges();
		}

		public void Update(Review review)
		{
			var existed = _context
					.Reviews.Find(review.Id);

			existed.Text = review.Text;
			existed.ModifiedOn = DateTime.UtcNow;
			_context.SaveChanges();
		}

		public void Delete(Review review)
		{
			var existed = _context.Reviews.Find(review.Id);

			_context.Reviews.Remove(existed);

			_context.SaveChanges();
		}

	}
}
