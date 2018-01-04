using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookSender.Data;
using BookSender.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookSender.Controllers
{
	[Produces("application/json")]
	[Route("api/Helper")]
	public class HelperController : Controller
	{
		private readonly ApplicationContext _context;
		HelperController(ApplicationContext context)
		{
			_context = context;
		}

		public JsonResult GetAllGenres()
		{
			try
			{
				List<Genre> genres = _context.Genres.ToList();

				return Json(genres);
			}
			catch(Exception ex)
			{
				return Json("Error: " + ex.Message);
			}

		}

		public JsonResult GetAllBookTypes()
		{
			try
			{
				List<BookType> types = _context.BookTypes.ToList();

				return Json(types);
			}
			catch (Exception ex)
			{
				return Json("Error: " + ex.Message);
			}

		}

		public JsonResult GetAllDealStatuses()
		{
			try
			{
				List<DealStatus> statuses = _context.DealStatuses.ToList();

				return Json(statuses);
			}
			catch (Exception ex)
			{
				return Json("Error: " + ex.Message);
			}

		}

	}
}