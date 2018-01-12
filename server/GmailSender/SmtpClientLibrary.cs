using System;
using System.Net.Mail;

namespace GmailSender
{
    public static class SmtpClientLibrary
    {

        static bool mailSent = false;

        public static string SendKey(string messageTo, string messageFrom, string passwordFrom)
        {
            SmtpClient client = new SmtpClient();

            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Timeout = 10000;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(messageFrom, passwordFrom);

            MailAddress mailFrom = new MailAddress(messageFrom, "Your password for authorization", System.Text.Encoding.UTF8);
            MailAddress mailTo = new MailAddress(messageTo);
            MailMessage mailMessage = new MailMessage(mailFrom, mailTo);

            string key = RandomKeyGenerator();

            mailMessage.Body = "Your password for authorization is" + key;
            mailMessage.Subject = "Your password for authorization";
            mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;

            client.Send(mailMessage);
            mailMessage.Dispose();

            return key;
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

        public static void SendOrderRequestMessages()
        {

        }

    }
}
