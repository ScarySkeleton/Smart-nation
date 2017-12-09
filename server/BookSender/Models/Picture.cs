namespace BookSender.Models
{
	public class Picture
    {
		public int Id { get; set; }

		public string Name { get; set; }

		public int Length { get; set; }

		public int Width { get; set; }


		public byte[] ImageData { get; set; }

		public string ContentType { get; set; }

	}
}
