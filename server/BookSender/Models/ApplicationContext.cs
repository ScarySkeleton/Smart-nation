using Microsoft.EntityFrameworkCore;

namespace BookSender.Models
{
	public class ApplicationContext : DbContext
	{
		public DbSet<Role> Roles { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<RatingStatus> RatingStatuses { get; set; }
		public DbSet<Review> Reviews { get; set; }
		public DbSet<Book> Books { get; set; }
		public DbSet<Genre> Genres { get; set; }
		public DbSet<BookHistory> BookHistoryRecord { get; set; }
		public DbSet<Deal> Deals { get; set; }
		public DbSet<DealStatus> DealStatuses { get; set; }
		public DbSet<Picture> Pictures { get; set; }


		public ApplicationContext(DbContextOptions<ApplicationContext> options)
			: base(options)
		{
		}

	}
}
