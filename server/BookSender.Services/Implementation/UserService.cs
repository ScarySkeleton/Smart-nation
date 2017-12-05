using System;
using System.Linq;
using System.Collections.Generic;
using BookSender.Data;
using BookSender.Data.Models;
using BookSender.Services.Interfaces;
using System.Threading.Tasks;

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

		// TODO: Phone or email
		public User Create(User user, string password)
		{
			// validation
			if (string.IsNullOrWhiteSpace(password))
				throw new Exception("Password is required");

			if (_context.Users.Any(x => x.PhoneNumber == user.PhoneNumber))
				throw new Exception("User with Phone nimber: " + user.PhoneNumber + " already exists");

			byte[] passwordHash, passwordSalt;
			CreatePasswordHash(password, out passwordHash, out passwordSalt);

			user.PasswordHash = passwordHash;
			user.PasswordSalt = passwordSalt;

			_context.Users.Add(user);
			_context.SaveChanges();

			return user;
		}

		public User AuthenticateByEmail(string email, string password)
		{
			if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
				return null;

			var user = _context.Users.SingleOrDefault(x => x.Email == email);

			// check if username exists
			if (user == null)
				return null;

			// check if password is correct
			if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
				return null;

			// authentication successful
			return user;
		}

		public User AuthenticateByPhoneNumber(string phoneNumber, string password)
		{
			if (string.IsNullOrEmpty(phoneNumber) || string.IsNullOrEmpty(password))
				return null;

			var user = _context.Users.SingleOrDefault(x => x.PhoneNumber == phoneNumber);

			// check if username exists
			if (user == null)
				return null;

			// check if password is correct
			if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
				return null;

			// authentication successful
			return user;
		}

		public void Insert(User user)
		{
			user.RegisteredOn = DateTime.UtcNow;

			_context.Users.Add(user);

			_context.SaveChanges();
		}

		public void Update(User userParam, string password = null)
		{
			var existed = _context.Users.Find(userParam.Id);

			if (existed == null)
				throw new Exception("User not found");

			if (userParam.Email != existed.Email)
			{
				// username has changed so check if the new username is already taken
				if (_context.Users.Any(x => x.Email == userParam.Email))
					throw new Exception("User with Email: " + userParam.Email + " already exists");
			}
			if (userParam.PhoneNumber != existed.PhoneNumber)
			{
				// username has changed so check if the new username is already taken
				if (_context.Users.Any(x => x.PhoneNumber == userParam.PhoneNumber))
					throw new Exception("User with Phone number " + userParam.PhoneNumber + " already exists");
			}

			// update user properties
			existed.FirstName = userParam.FirstName;
			existed.LastName = userParam.LastName;
			existed.FirstName = userParam.FirstName;
			existed.LastName= userParam.LastName;
			existed.AvailableFrom = userParam.AvailableTill;
			existed.AvailableTill = userParam.AvailableTill;
			existed.BirthDate = userParam.BirthDate;
			existed.Email = userParam.Email;
			existed.PhoneNumber = userParam.PhoneNumber;
			existed.PictureId= userParam.PictureId;
			existed.RatingStatusId= userParam.PictureId;
			existed.RoleId = userParam.RoleId;

			// update password if it was entered
			if (!string.IsNullOrWhiteSpace(password))
			{
				byte[] passwordHash, passwordSalt;
				CreatePasswordHash(password, out passwordHash, out passwordSalt);

				existed.PasswordHash = passwordHash;
				existed.PasswordSalt = passwordSalt;
			}

			_context.Users.Update(existed);
			_context.SaveChanges();


			_context.SaveChanges();
		}

		public void Delete(User User)
		{
			var existed = _context.Users.Find(User.Id);

			_context.Users.Remove(existed);

			_context.SaveChanges();
		}

		private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
		{
			if (password == null) throw new ArgumentNullException("password");
			if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
			if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
			if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

			using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
			{
				var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				for (int i = 0; i < computedHash.Length; i++)
				{
					if (computedHash[i] != storedHash[i]) return false;
				}
			}

			return true;
		}

		private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			if (password == null) throw new ArgumentNullException("password");
			if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

			using (var hmac = new System.Security.Cryptography.HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
			}
		}

		public void Update(User value)
		{
			throw new NotImplementedException();
		}
	}
}
