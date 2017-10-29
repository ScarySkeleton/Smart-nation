using System;
using System.Linq;
using BookSender.Data.Models;

namespace BookSender.Data
{
	public static class DbInitializer
	{
		public static void Initialize(this ApplicationContext context)
		{
			context.Database.EnsureCreated();

			// Look for any students.
			if (context.Users.Any())
			{
				return;   // DB has been seeded
			}
			var ratingStatuses = new RatingStatus[]
			{
			new RatingStatus{Name="Beginner",DemandMinNumberBooksAdded=0,DemandMinNumberBooksGot=0,OrderNumber = 0},
			new RatingStatus{Name="Booklover",DemandMinNumberBooksAdded=1,DemandMinNumberBooksGot=0,OrderNumber = 1},
			new RatingStatus{Name="Experienced",DemandMinNumberBooksAdded=2,DemandMinNumberBooksGot=1,OrderNumber = 2},
			new RatingStatus{Name="Megamind",DemandMinNumberBooksAdded=8,DemandMinNumberBooksGot=4,OrderNumber = 3},
			new RatingStatus{Name="BookWorm",DemandMinNumberBooksAdded=10,DemandMinNumberBooksGot=4,OrderNumber = 4},
			new RatingStatus{Name="Master",DemandMinNumberBooksAdded=20,DemandMinNumberBooksGot=15,OrderNumber = 5},
			};
			foreach (RatingStatus s in ratingStatuses)
			{
				context.RatingStatuses.Add(s);
			}
			context.SaveChanges();

			var users = new User[]
			{
			new User{FirstName="Danilo",LastName="Belokha",RegisteredOn = DateTime.UtcNow, Password = "1234", Number = "38098875654846", Email = "danilo@gmail.com"},
			new User{FirstName="John",LastName="Sena",RegisteredOn = DateTime.UtcNow, Password = "1234", Number = "38098875654846", Email = "andriy@gmail.com"},
			new User{FirstName="Andriy",LastName="Dyuk",RegisteredOn = DateTime.UtcNow, Password = "1234", Number = "38098875654846", Email = "dyuk@gmail.com"},
			new User{FirstName="Vova",LastName="Kovi",RegisteredOn = DateTime.UtcNow, Password = "1234",  Number = "38098875654846", Email = "vovi@gmail.com"}
			};
			foreach (User u in users)
			{
				context.Users.Add(u);
			}
			context.SaveChanges();


			var books = new Book[]
			{
			new Book{Title="Don Quixote",Author="Miguel de Cervantes Saavedra",CreatedOn = DateTime.UtcNow, PrintedOn = new DateTime(1997,3,27)},
			};
			foreach (Book b in books)
			{
				context.Books.Add(b);
			}
			context.SaveChanges();


		}
	}
}