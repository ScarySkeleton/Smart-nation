using System.Linq;
using System.Collections.Generic;
using BookSender.Data;
using BookSender.Data.Models;
using BookSender.Services.Interfaces;

namespace BookSender.Services
{
	public class BookHistoryService: IBookHistoryService
    {
		private ApplicationContext _context;

		BookHistoryService(ApplicationContext context)
		{
			_context = context;
		}

		public BookHistory GetById(int id)
		{
			return _context.BookHistoryRecords.FirstOrDefault(bookHistoryRecord => bookHistoryRecord.Id == id);
		}

		public List<BookHistory> GetAll()
		{
			return _context.BookHistoryRecords.ToList();
		}

		public void Insert(BookHistory bookHistoryRecord)
		{
			_context.BookHistoryRecords.Add(bookHistoryRecord);

			_context.SaveChanges();
		}

		public void Update(BookHistory bookHistoryRecord)
		{
			var existed = _context
					.BookHistoryRecords.Find(bookHistoryRecord.Id);

			existed.BookId = bookHistoryRecord.BookId;
			existed.AltitudeCoordinate = bookHistoryRecord.AltitudeCoordinate;
			existed.LangtitudeCoordinate= bookHistoryRecord.LangtitudeCoordinate;
			existed.LangtitudeCoordinate = bookHistoryRecord.LangtitudeCoordinate;
			existed.UserId = bookHistoryRecord.UserId;
			existed.GetBookOn = bookHistoryRecord.GetBookOn;
			existed.GiveBookOn = bookHistoryRecord.GiveBookOn;


			_context.SaveChanges();
		}

		public void Delete(BookHistory bookHistoryRecord)
		{
			var existed = _context.BookHistoryRecords.Find(bookHistoryRecord.Id);

			_context.BookHistoryRecords.Remove(existed);

			_context.SaveChanges();
		}
	}
}
