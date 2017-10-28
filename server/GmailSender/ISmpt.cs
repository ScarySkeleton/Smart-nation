using System;
using System.Collections.Generic;
using System.Text;

namespace GmailSender
{
    interface ISmtp<T, A>
    {
        void SendMessageToClient(EmailModel emailModel);
        void SentMessageToOwner(EmailModel emailModel);
        void LogMessages(EmailModel emailModel);
        event EventHandler<T> GetAction;
        event EventHandler<A> GetException;
    }
}
