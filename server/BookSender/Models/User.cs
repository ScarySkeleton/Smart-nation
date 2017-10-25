using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Models
{
    public class User
    {
        [Required]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", ErrorMessage = "Wrong adress")]
        public string Email { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 10, ErrorMessage = "Number must containe more than 10 symbols")]
        public string Number { get; set; }
        [Required]
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = "Passwords don`t match")]
        public string PasswordConfirmation { get; set; }

        
        public int? RoleId { get; set; }
        public Role Role { get; set; }
    }
}
