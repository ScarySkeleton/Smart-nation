using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BookSender.Data.Models.AccessoryModels
{
    public class LoginModel
    {
        //[RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", ErrorMessage = "Wrong adress")]
        public string Email { get; set; }

        public string Phone { get; set; }
        //[Required]
        public string Password { get; set; }
        
    }
}
