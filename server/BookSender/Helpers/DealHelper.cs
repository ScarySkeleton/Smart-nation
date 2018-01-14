using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Helpers
{
	public class DealHelper
	{
		public enum Status
		{
			OPENED = 1,
			SUBMITED = 2,
			DECLINED = 3,
			RECIEVED = 4,
			CLOSED = 6,
			BANNED = 7
		}
	}
}
