using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookSender.Data.Models
{
	public class Role
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<User> Users { get; set; }
        public Role()
        {
            Users = new List<User>();
        }
    }
}
