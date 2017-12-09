using System;
using System.Collections.Generic;
using System.Linq;
using BookSender.Data;
using BookSender.Data.Models;
using BookSender.Services.Interfaces;

namespace BookSender.Services
{
	public class GenreService: IGenreService
    {
		private ApplicationContext _context;

		GenreService(ApplicationContext context)
		{
			_context = context;
		}

		public Genre GetById(int id)
		{
			return _context.Genres.FirstOrDefault(genre => genre.Id == id);
		}

		public List<Genre> GetAll()
		{
			return _context.Genres.ToList();
		}

		public void Insert(Genre genre)
		{
			_context.Genres.Add(genre);

			_context.SaveChanges();
		}

		public void Update(Genre genre)
		{
			var existed = _context
					.Genres.Find(genre.Id);

			existed.Name = genre.Name;

			_context.SaveChanges();
		}

		public void Delete(Genre genre)
		{
			var existed = _context.Genres.Find(genre.Id);

			_context.Genres.Remove(existed);

			_context.SaveChanges();
		}

	}
}
