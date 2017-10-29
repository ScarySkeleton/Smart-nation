using System;
using System.Collections.Generic;
using System.Text;

namespace GmailSender.Model
{
    public class EmailModel
    {
        public string UserEmail { get; set; }
        public string AutoCode { get; set; }
        public List<string> UserDevices
        {
            get
            {
                if (UserDevices.Count == 0)
                {
                    UserDevices.Add("No devices");
                }
                return this.UserDevices;
            }
            set
            {
                UserDevices = value; 
            }
        }
    }
}
