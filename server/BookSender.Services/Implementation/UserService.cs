using System;
using System.Linq;
using System.Collections.Generic;
using BookSender.Data;
using BookSender.Data.Models;
using BookSender.Services.Interfaces;

namespace BookSender.Services
{
	public class UserService : IUserService
    {
		private ApplicationContext _context;

		UserService(ApplicationContext context)
		{
			_context = context;
		}

		public User GetById(int id)
		{
			return _context.Users.FirstOrDefault(user => user.Id == id);
		}

		public List<User> GetAll()
		{
			return _context.Users.ToList();
		}

		public void Insert(User user)
		{
			user.RegisteredOn = DateTime.UtcNow;

			_context.Users.Add(user);

			_context.SaveChanges();
		}

		public void Update(User user)
		{
			var existed = _context
					.Users.Find(user.Id);

			existed.FirstName = user.FirstName;
			existed.LastName= user.LastName;
			existed.AvailableFrom = user.AvailableTill;
			existed.AvailableTill = user.AvailableTill;
			existed.BirthDate = user.BirthDate;
			existed.Email = user.Email;
			existed.Number= user.Number;
			existed.Password= user.Password;
			existed.PictureId= user.PictureId;
			existed.RatingStatusId= user.PictureId;
			existed.RoleId = user.RoleId;

			_context.SaveChanges();
		}

		public void Delete(User User)
		{
			var existed = _context.Users.Find(User.Id);

			_context.Users.Remove(existed);

			_context.SaveChanges();
		}

	}
}
