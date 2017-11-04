using System.ComponentModel.DataAnnotations;

namespace BookSender.Models.AccessoryModels
{
	public class RegisterModel
    {
        [Required]
        [RegularExpression(@"[0-9]{10,15}", ErrorMessage = "Wrong phone")]
        public string Phone { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
