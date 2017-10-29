using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BookSender.Data.Models.AccessoryModels
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
