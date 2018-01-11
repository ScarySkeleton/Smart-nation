using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BookSender.Helpers
{
	public static class PictureHelper
	{
		public static byte[] ConvertToImage(string photoInBinary)
		{
			byte[] imageData = null;
			if (photoInBinary != null)
			{
				imageData = System.Text.Encoding.UTF8.GetBytes(photoInBinary);
			}

			return imageData;
		}

		public static string ConvertToString(byte[] imageData)
		{

            string photoInBinary = null;
			if (imageData != null)
			{
				photoInBinary = System.Text.Encoding.UTF8.GetString(imageData);
			}

			return photoInBinary;
		}

	}
}
