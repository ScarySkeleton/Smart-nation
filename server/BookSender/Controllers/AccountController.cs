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
<<<<<<< HEAD
using LoginData = BookSender.Data.Models.AccessoryModels.LoginModel;
using System.Text.RegularExpressions;
=======
using LoginData = BookSender.Models.AccessoryModels.LoginModel;
using RegisterData = BookSender.Models.AccessoryModels.RegisterModel;
using BookSender.Models.AccessoryModels;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
>>>>>>> 1a1ba633402a6f19d70484f5d87be9281d07f6d3

namespace BookSender.Controllers
{
	[EnableCors("CorsPolicy")]
	public class AccountController : Controller
	{
		private ApplicationContext _context;
		public AccountController(ApplicationContext context)
		{
			_context = context;
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

				_context.Users.Add(new Data.Models.User { PhoneNumber = user.Phone, Password = user.Password, Email = "test@mail.ru" });

				await _context.SaveChangesAsync();

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

        
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login([FromBody] LoginData model)
        {
            //string request = null;
            try
            {
                if (model != null)
                {
                    Regex regexEmail = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
                    Regex regexPhone = new Regex(@"^+(\d{3}+)(\d{9}+)$");
                    Match match = regexEmail.Match(model.Email);


                    if (match.Success)
                    {
                        BookSender.Data.Models.User user = await _context.Users
                            .Include(u => u.Role)
                            .FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);


						AccountLoginResponce acc = new AccountLoginResponce
						{
							Login = user.Email,
							Name = user.FirstName,
							Surname = user.LastName,
							Role = user.Role != null ? user.Role.Name : "Guest",
						};


						await Authenticate(user);


						return Json(acc);
					}
					else if (String.IsNullOrEmpty(model.Phone) == false)
					{
						BookSender.Data.Models.User user = await _context.Users
							.Include(u => u.Role)
							.FirstOrDefaultAsync(u => u.PhoneNumber == model.Phone && u.Password == model.Password);

						AccountLoginResponce acc = new AccountLoginResponce
						{
							Login = "voviKAVE",
							Name = user.FirstName,
							Surname = user.LastName,
							Role = "Admin"
							//Role = user.Role.Name,
							// StatusCode = StatusCode(500).ToString()
						};


						await Authenticate(user, isEmailAuth: false);

						return Json(acc);
					}
					else
					{
						return Json("'Answer': 'Wrong user credetials'");
					}
				}
				else
					return Json(new LoginData());
			}
			catch (Exception ex)
			{
				return Json($" 'Answer' : 'Error = {ex.Message}' ");
			}
		}

        [Authorize]
		[HttpPost]
		public async Task<IActionResult> Logout([FromBody] LoginData model)
		{
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

			return Json($" 'Answer' : 'Logedout = true' ");

		}

		[HttpPut]
		public async Task<JsonResult> NewPassword(string request)
		{
			try
			{
				dynamic requestDyn = JsonConvert.DeserializeObject(request);

				LoginData model =
						 new LoginData
						 { Email = requestDyn.Email, Password = requestDyn.Password, Phone = requestDyn.Phone };

				Data.Models.User user = await _context.Users
						 .Include(u => u.Role)
						 .FirstOrDefaultAsync(u => u.Email == model.Email || u.PhoneNumber == model.Phone);

				if (String.IsNullOrEmpty(model.Password) == false)
				{
					user.Password = model.Password;
					await _context.SaveChangesAsync();

					return Json(" 'Answer' : 'Password was successfully updated' ");
				}
				else
					throw new Exception("Empty password string");
			}
			catch (Exception ex)
			{
				return Json($" 'Answer' ; 'Something goes wrong', 'Error' : '{ex.Message}' ");
			}
		}

		private async Task Authenticate(Data.Models.User user, bool isEmailAuth = true)
		{
			var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);

			identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, isEmailAuth ? user.Email : user.PhoneNumber));
			identity.AddClaim(new Claim(ClaimTypes.Name, isEmailAuth ? user.Email : user.PhoneNumber));

			// Authenticate using the identity
			var principal = new ClaimsPrincipal(identity);
			await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties { IsPersistent = true });

		}
	}
}