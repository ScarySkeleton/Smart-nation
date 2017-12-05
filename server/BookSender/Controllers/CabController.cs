using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LoginData = BookSender.Models.AccessoryModels.LoginModel;

namespace BookSender.Controllers
{
	[Authorize]
	public class CabController : Controller
	{
		[HttpPost]
		public IActionResult Index([FromBody] LoginData model)
		{
			return Json("'answer': 'true'");
		}
	}
}