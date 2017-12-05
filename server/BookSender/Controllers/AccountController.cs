using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookSender.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using GmailSender.Model;
using GmailSender;
using BookSender.Data;
using BookSender.Data.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using LoginData = BookSender.Models.AccessoryModels.LoginModel;
using RegisterData = BookSender.Models.AccessoryModels.RegisterModel;
using BookSender.Models.AccessoryModels;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Diagnostics;
using BookSender.Services.Interfaces;
using BookSender.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using BookSender.Helpers;
using Microsoft.Extensions.Options;

namespace BookSender.Controllers
{
	[EnableCors("CorsPolicy")]
	public class AccountController : Controller
	{
		private IUserService _userService;
		private readonly AppSettings _appSettings;

		public AccountController(UserService userService, IOptions<AppSettings> appSettings)
		{
			_userService = userService;
			_appSettings = appSettings.Value;
		}

		[HttpPost]
		//[ValidateAntiForgeryToken]
		public async Task<JsonResult> Register([FromBody] RegisterData user)
		{
			try
			{
				//dynamic requestDyn = JsonConvert.DeserializeObject(request);

				//RegisterModel model = new RegisterModel { Phone = requestDyn.Phone, Password = requestDyn.Password };

				//BookSender.Data.Models.User user = await _context.Users.FirstOrDefaultAsync(u => u.Number == model.Phone);
				//if (user == null)
				//{
				//    user = new BookSender.Data.Models.User { Number = model.Phone, Password = model.Password };
				//    BookSender.Data.Models.Role userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "user");

				//    if (userRole != null)
				//        user.Role = userRole;

				_userService.Create(new Data.Models.User { PhoneNumber = user.Phone, Email = "test@mail.ru" }, user.Password);

				//string key = GmailSender.SmtpClientLibrary.SendKey("", "", "");
				//await Authenticate(user);

				return Json($" 'Answer' : 'Successful user creation'");
				//}
				//else
				//    return Json(" 'Answer' : 'Unsuccessful user creation' ");
			}
			catch (Exception ex)
			{
				return Json($" 'Answer' : ' Error = {ex.Message}' ");
			}
		}


		[HttpPost("login")]
		[AllowAnonymous]
		//[ValidateAntiForgeryToken]
		//public async Task<IActionResult> Login([FromBody] LoginData model)
		public IActionResult Login([FromBody] LoginData model)
		{
			//string request = null;
			try
			{
				if (model != null)
				{
					Data.Models.User user;
					if (String.IsNullOrEmpty(model.Email) == false)
					{
						user = _userService.AuthenticateByEmail(model.Email, model.Password);
					}
					else if (String.IsNullOrEmpty(model.Phone) == false)
					{
						user = _userService.AuthenticateByPhoneNumber(model.Phone, model.Password);
					}
					else
					{
						//return Unauthorized();
						return Json("'Answer': 'Wrong user credetials'");
					}

					var tokenHandler = new JwtSecurityTokenHandler();
					var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
					var tokenDescriptor = new SecurityTokenDescriptor
					{
						Subject = new ClaimsIdentity(new Claim[]
						{
					new Claim(ClaimTypes.Name, user.Id.ToString())
						}),
						Expires = DateTime.UtcNow.AddDays(7),
						SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
					};
					var token = tokenHandler.CreateToken(tokenDescriptor);
					var tokenString = tokenHandler.WriteToken(token);


					return Ok(new AccountLoginResponce
					{
						Login = "voviKAVE",
						Name = user.FirstName,
						Surname = user.LastName,
						Role = "admin",//user.Role.Name,
									   // StatusCode = StatusCode(500).ToString()
						Token = tokenString
					});

				}
				else
					return Unauthorized();
			}
			catch (Exception ex)
			{
				return Unauthorized();
			}
		}

		[Authorize]
		[HttpPost]
		public async Task<IActionResult> Logout([FromBody] LoginData model)
		{
			var cl = HttpContext.User.Claims;

			var id = HttpContext.User.Identity.IsAuthenticated;

			Debug.WriteLine(id);

			foreach (var claim in cl)
			{
				System.Diagnostics.Debug.WriteLine("User: {0}, VALUE: {1}", claim.Issuer, claim.Value);
			}

			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

			return Json($" 'Answer' : 'Logedout = true' ");

		}

		// TODO: rewrite thi method
		//[HttpPut]
		//public async Task<JsonResult> NewPassword(string request)
		//{
		//	try
		//	{
		//		dynamic requestDyn = JsonConvert.DeserializeObject(request);

		//		LoginData model =
		//				 new LoginData
		//				 { Email = requestDyn.Email, Password = requestDyn.Password, Phone = requestDyn.Phone };

		//		Data.Models.User user = await _context.Users
		//				 .Include(u => u.Role)
		//				 .FirstOrDefaultAsync(u => u.Email == model.Email || u.PhoneNumber == model.Phone);

		//		if (String.IsNullOrEmpty(model.Password) == false)
		//		{
		//			user.Password = model.Password;
		//			await _context.SaveChangesAsync();

		//			return Json(" 'Answer' : 'Password was successfully updated' ");
		//		}
		//		else
		//			throw new Exception("Empty password string");
		//	}
		//	catch (Exception ex)
		//	{
		//		return Json($" 'Answer' ; 'Something goes wrong', 'Error' : '{ex.Message}' ");
		//	}
		//}

		public ActionResult Denied()
		{
			var id = HttpContext.User.Identity.IsAuthenticated;

			return View();
		}
	}
}