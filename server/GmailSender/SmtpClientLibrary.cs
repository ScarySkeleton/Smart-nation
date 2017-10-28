using System;
using System.Net.Mail;

namespace GmailSender
{
    public class SmtpClientLibrary
    {

        static bool mailSent = false;

        public void SendKey()
        {
            SmtpClient client = new SmtpClient();
            client.Port = 465;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("cooldudsterr@gmail.com", "Rjirf-vsirf");
            MailAddress mailFrom = new MailAddress("cooldudsterr@gmail.com", "Pes" + "Blohastyi", System.Text.Encoding.UTF8);

            MailAddress mailTo = new MailAddress("mr.wokawoka@gmail.com");

            MailMessage mailMessage = new MailMessage(mailFrom, mailTo);

            mailMessage.Body = "test";
            mailMessage.Subject = "Sraka";
            mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;

            client.Send(mailMessage);
            mailMessage.Dispose();
        }
        private static string RandomKeyGenerator(int keyLength = 8)
        {
            string password = null;
            Random rdn = new Random();
            var chars = "$%#@!*abcdefghijklmnopqrstuvwxyz1234567890?;:ABCDEFGHIJKLMNOPQRSTUVWXYZ^&".ToCharArray();

            for (int i = 0; i < keyLength; ++i)
            {
                password += chars[rdn.Next(chars.Length)];
            }

            return password;
        }
    }
}
