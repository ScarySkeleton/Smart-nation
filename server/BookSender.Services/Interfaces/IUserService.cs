using BookSender.Data.Models;
namespace BookSender.Services.Interfaces
{
	public interface IUserService : IService<User>
	{
		User Create(User user, string password);
		User AuthenticateByEmail(string email, string password);
		User AuthenticateByPhoneNumber(string phoneNumber, string password);
		void Update(User userParam, string password);

		[System.Obsolete("Insert for User is deprecated, please use CreateUser instead.", true)]
		new void Insert(User user);

	}
}
