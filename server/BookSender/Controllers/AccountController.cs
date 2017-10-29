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

namespace BookSender.Controllers
{
    public class AccountController : Controller
    {
        private ApplicationContext _context;
        public AccountController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult Login()
        {
            return Json("");
        }

        [HttpGet]
        public JsonResult Register()
        {
            return Json("");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> Register(string request)
        {
            try
            {
                dynamic requestDyn = JsonConvert.DeserializeObject(request);

                RegisterModel model = new RegisterModel { Email = requestDyn.Email, Password = requestDyn.Password };

                JsonResult responce = new JsonResult("");
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    user = new Models.User { Email = model.Email, Password = model.Password };
                    Role userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "user");

                    if (userRole != null)
                        user.Role = userRole;

                    _context.Users.Add(user);

                    await _context.SaveChangesAsync();

                    string key = GmailSender.SmtpClientLibrary.SendKey("", "", "");

                    //await Authenticate(user);
                    return Json($" 'Answer' : 'Successful user creation', 'Key' : '{key}' ");
                }
                else
                    return Json(" 'Answer' : 'Unsuccessful user creation' ");
            }
            catch (Exception ex)
            {
                return Json($" 'Answer' : 'Not such a user was found', 'Error' : '{ex.Message}' ");
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string request)
        {
            try
            {
                dynamic requestDyn = JsonConvert.DeserializeObject(request);

                LoginModel model = new LoginModel { Email = requestDyn.Email, Password = requestDyn.Password };

                if (model != null)
                {
                    User user = await _context.Users
                        .Include(u => u.Role)
                        .FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == model.Password);
                    return Json("'Answer': 'User exists'");
                }
                else
                    return Json(" 'Answer' : 'Not such a user was found' ");
            }
            catch (Exception ex)
            {
                return Json($" 'Answer' : 'Not such a user was found', 'Error' : '{ex.Message}' ");
            }
        }
    }
}