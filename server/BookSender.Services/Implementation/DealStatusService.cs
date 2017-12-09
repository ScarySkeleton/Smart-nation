using System.Linq;
using System.Collections.Generic;
using BookSender.Data;
using BookSender.Data.Models;
using BookSender.Services.Interfaces;

namespace BookSender.Services
{
	public class DealStatusService : IDealStatusService
    {
		private ApplicationContext _context;

		DealStatusService(ApplicationContext context)
		{
			_context = context;
		}

		public DealStatus GetById(int id)
		{
			return _context.DealStatuses.FirstOrDefault(dealStatus => dealStatus.Id == id);
		}

		public List<DealStatus> GetAll()
		{
			return _context.DealStatuses.ToList();
		}

		public void Insert(DealStatus dealStatus)
		{
			_context.DealStatuses.Add(dealStatus);

			_context.SaveChanges();
		}

		public void Update(DealStatus dealStatus)
		{
			var existed = _context
					.DealStatuses.Find(dealStatus.Id);

			existed.Name = dealStatus.Name;

			_context.SaveChanges();
		}

		public void Delete(DealStatus dealStatus)
		{
			var existed = _context.DealStatuses.Find(dealStatus.Id);

			_context.DealStatuses.Remove(existed);

			_context.SaveChanges();
		}
	}
}
