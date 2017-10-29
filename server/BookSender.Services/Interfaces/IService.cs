using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace BookSender.Services.Interfaces
{
	public interface IService<T> where T : class
	{
		List<T> GetAll();

		T GetById(int id);

		void Update(T value);

		void Insert(T value);

		void Delete(T value);
	}
}
