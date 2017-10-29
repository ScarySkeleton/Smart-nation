using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookSender.Models;

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
        public async Task<JsonResult> Register(RegisterModel model)
        {

        }


    }
}