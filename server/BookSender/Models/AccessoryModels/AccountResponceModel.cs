using System.ComponentModel.DataAnnotations;

namespace BookSender.Models.AccessoryModels
{
	public class AccountResponceModel<T>
    {
        public AccountResponceModel()
        {
            this.Status = false;
        }

        [Required]
        public bool Status { get; set; }
        
        public string Text { get; set; }

        public T TransmitModel { get; set; }

        public string ErrorMessage { get; set; }
    
    }
}
