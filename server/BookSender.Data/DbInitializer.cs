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

			// Look for any users.
			if (context.Users.Any())
			{
				return;   // DB has been seeded
			}


			var adminRole = new Role { Name = "Admin" };
			var userRole = new Role { Name = "User" };
			var notRegisteredRole = new Role { Name = "NotRegistered" };


			var begginerStatus = new RatingStatus { Name = "Beginner", DemandMinNumberBooksAdded = 0, DemandMinNumberBooksGot = 0, OrderNumber = 0 };
			var bookloverStatus = new RatingStatus{Name="Booklover",DemandMinNumberBooksAdded=1,DemandMinNumberBooksGot=0,OrderNumber = 1};
			var megamindStatus = new RatingStatus { Name = "Megamind", DemandMinNumberBooksAdded = 8, DemandMinNumberBooksGot = 4, OrderNumber = 3 };
			var bookWormStatus = new RatingStatus { Name = "BookWorm", DemandMinNumberBooksAdded = 10, DemandMinNumberBooksGot = 4, OrderNumber = 4 };
			
			#region Users

			byte[] passwordHash;
			byte[] passwordSalt;

			CreatePasswordHash("1234", out passwordHash, out passwordSalt);

			var users = new User[]
			{
			new User{
				FirstName ="Danilo",
				LastName ="Belokha",
				RegisteredOn = DateTime.UtcNow,
				PasswordHash = passwordHash,
				PasswordSalt = passwordSalt,
				PhoneNumber = "38098875654846",
				Email = "danilo@gmail.com",
				Role = notRegisteredRole,
				RatingStatus = megamindStatus
			},
			new User{
				FirstName ="John",
				LastName ="Sena",
				RegisteredOn = DateTime.UtcNow,
				PasswordHash = passwordHash,
				PasswordSalt = passwordSalt,
				PhoneNumber = "38098875654846",
				Email = "john@gmail.com",
				Role = userRole,
				RatingStatus = begginerStatus
			},
			new User{
				FirstName ="Andriy",
				LastName ="Dyuk",
				RegisteredOn = DateTime.UtcNow,
				PasswordHash = passwordHash,
				PasswordSalt = passwordSalt,
				PhoneNumber = "+380444444444",
				Email = "dyuk@gmail.com",
				Role = adminRole,
				RatingStatus = bookWormStatus
				//RatingStatusId = context.RatingStatuses.FirstOrDefault(s => s.OrderNumber == 5).Id,
				//RoleId = context.Roles.FirstOrDefault(r => r.Name == "Admin").Id
			},
			new User{
				FirstName ="Vova",
				LastName ="Kovi",
				RegisteredOn = DateTime.UtcNow,
				PasswordHash = passwordHash,
				PasswordSalt = passwordSalt,
				PhoneNumber = "+380990573255",
				Email = "vovi@gmail.com",
				Role = adminRole,
				RatingStatus = bookloverStatus
			}
			};

			foreach (User u in users)
			{
				context.Users.Add(u);
			}
			context.SaveChanges();

			#endregion Users

			var ratingStatuses = new RatingStatus[]
			{
			 new RatingStatus{Name="Experienced",DemandMinNumberBooksAdded=2,DemandMinNumberBooksGot=1,OrderNumber = 2},
			new RatingStatus{Name="Master",DemandMinNumberBooksAdded=20,DemandMinNumberBooksGot=15,OrderNumber = 5},
			};
			foreach (RatingStatus s in ratingStatuses)
			{
				context.RatingStatuses.Add(s);
			}
			context.SaveChanges();


			var genres = new Genre[]
			{
				new Genre{Name="Arts & Photography"},
				new Genre{Name="Biographies & Memoirs"},
				new Genre{Name="Business & Money"},
				new Genre{Name="Calendars"},
				new Genre{Name="Children's Books"},
				new Genre{Name="Christian Books & Bibles"},
				new Genre{Name="Comics & Graphic Novels"},
				new Genre{Name="Computers & Technology"},
				new Genre{Name="Cookbooks, Food & Wine"},
				new Genre{Name="Crafts, Hobbies & Home"},
				new Genre{Name="Education & Teaching"},
				new Genre{Name="Engineering & Transportation"},
				new Genre{Name="Gay & Lesbian"},
				new Genre{Name="Health, Fitness & Dieting"},
				new Genre{Name="History"},
				new Genre{Name="Humor & Entertainment"},
				new Genre{Name="Law"},
				new Genre{Name="Literature & Fiction"},
				new Genre{Name="Medical Books"},
				new Genre{Name="Mystery, Thriller & Suspense"},
				new Genre{Name="Parenting & Relationships"},
				new Genre{Name="Politics & Social Sciences"},
				new Genre{Name="Reference"},
				new Genre{Name="Religion & Spirituality"},
				new Genre{Name="Romance"},
				new Genre{Name="Science & Math"},
				new Genre{Name="Science Fiction & Fantasy"},
				new Genre{Name="Self-Help"},
				new Genre{Name="Sports & Outdoors"},
				new Genre{Name="Teen & Young Adult"},
				new Genre{Name="Test Preparation"},
				new Genre{Name="Travel"}
			};

			#region Books

			var books = new Book[]
			{
			new Book{
				Title ="Don Quixote",
				Author ="Miguel de Cervantes Saavedra",
				CreatedOn = DateTime.UtcNow,
				PrintedOn = new DateTime(1997,3,27),
				//ConributorId = context.Users.FirstOrDefault( u => u.PhoneNumber == "+380990573255").Id,
				Price = 10,
				IsUsable = true,
				Description = "WITH AN INTRODUCTION BY HAROLD BLOOM Widely regarded as the world's first modern novel, and one of the funniest and most tragic books ever written, Don Quixote chronicles the famous picaresque adventures of the noble knight-errant Don Quixote de La Mancha and his faithful squire, Sancho Panza, as they travel through sixteenth-century Spain. Unless you read Spanish, you've never read Don Quixote.",
				//CurrentUserId = context.Users.FirstOrDefault(u => u.PhoneNumber == "+380990573255").Id
			},
			new Book{
				Title ="War and Peace",
				Author ="Leo Tolstoy",
				//GenreId = context.Genres.FirstOrDefault(g => g.Name == "Romance").Id,
				CreatedOn = DateTime.UtcNow,
				PrintedOn = new DateTime(1887,5,26),
				//ConributorId = context.Users.FirstOrDefault( u => u.PhoneNumber == "+380990573255").Id,
				Price = 100,
				IsUsable = true,
				Description = "Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon's invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families.",
				//CurrentUserId = context.Users.FirstOrDefault(u => u.PhoneNumber == "+380990573255").Id
			},
			new Book{
				Title ="Moby Dick",
				Author ="Herman Melville",
				//GenreId = context.Genres.FirstOrDefault(g => g.Name == "Literature & Fiction").Id,
				CreatedOn = DateTime.UtcNow,
				PrintedOn = new DateTime(1996,7,26),
				//ConributorId = context.Users.FirstOrDefault( u => u.PhoneNumber == "+380990573255").Id,
				Price = 49,
				IsUsable = true,
				Description = "First published in 1851, Melville's masterpiece is, in Elizabeth Hardwick's words, \"the greatest novel in American literature.\" The saga of Captain Ahab and his monomaniacal pursuit of the white whale remains a peerless adventure story but one full of mythic grandeur, poetic majesty, and symbolic power. Filtered through the consciousness of the novel's narrator, Ishmael, Moby-Dick draws us into a universe full of fascinating characters and stories, from the noble cannibal Queequeg to the natural history of whales, while reaching existential depths that excite debate and contemplation to this day.",
				//CurrentUserId = context.Users.FirstOrDefault(u => u.PhoneNumber == "+380990573255").Id
			},
			new Book{
				Title ="The Divine Comedy",
				Author ="Dante Alighieri",
				//GenreId = context.Genres.FirstOrDefault(g => g.Name == "Literature & Fiction").Id,
				CreatedOn = DateTime.UtcNow,
				PrintedOn = new DateTime(2001,12,12),
				//ConributorId = context.Users.FirstOrDefault( u => u.PhoneNumber == "+380444444444").Id,
				Price = 77,
				IsUsable = true,
				Description = "Belonging in the immortal company of the great works of literature, Dante Alighieri's poetic masterpiece, The Divine Comedy, is a moving human drama, an unforgettable visionary journey through the infinite torment of Hell, up the arduous slopes of Purgatory, and on to the glorious realm of Paradise — the sphere of universal harmony and eternal salvation.",
				//CurrentUserId = context.Users.FirstOrDefault(u => u.PhoneNumber == "+380990573255").Id
			},
			new Book{
				Title ="The Adventures of Huckleberry Finn",
				Author ="Mark Twain",
				//GenreId = context.Genres.FirstOrDefault(g => g.Name == "Children's Books").Id,
				CreatedOn = DateTime.UtcNow,
				PrintedOn = new DateTime(2010,10,15),
				//ConributorId = context.Users.FirstOrDefault( u => u.PhoneNumber == "+380990573255").Id,
				Price = 0,
				IsUsable = true,
				Description = "Revered by all of the town's children and dreaded by all of its mothers, Huckleberry Finn is indisputably the most appealing child-hero in American literature. Unlike the tall-tale, idyllic world of Tom Sawyer, The Adventures of Huckleberry Finn is firmly grounded in early reality. From the abusive drunkard who serves as Huckleberry's father, to Huck's first tentative grappling with issues of personal liberty and the unknown, Huckleberry Finn endeavors to delve quite a bit deeper into the complexities — both joyful and tragic of life.",
				//CurrentUserId = context.Users.FirstOrDefault(u => u.PhoneNumber == "+380444444444").Id
			}
			};


			foreach (Book b in books)
			{
				context.Books.Add(b);
			}
			context.SaveChanges();

			#endregion Books

		}

		private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
		{
			if (password == null) throw new ArgumentNullException("password");
			if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
			if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
			if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

			using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
			{
				var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				for (int i = 0; i < computedHash.Length; i++)
				{
					if (computedHash[i] != storedHash[i]) return false;
				}
			}

			return true;
		}

		private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			if (password == null) throw new ArgumentNullException("password");
			if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

			using (var hmac = new System.Security.Cryptography.HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
			}
		}

	}
}