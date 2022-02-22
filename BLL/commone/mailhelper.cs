using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Mail;
using System.Net;
using System.IO;
using System.ComponentModel;
using System.Threading;
using System.Web.Mail;

namespace BLL.commone
{
    /*
     阿里云禁用 25, 
     * 465端口  需要 Implicit ssl 所以只能采用 cdo.message 和 system.web.mail
     */

    public static class mailhelper
    {
        public static bool SendEmail(string title, string from, string pwd, string smtp, string to, string cc, string body, List<string> attachment_files)
        {
            System.Web.Mail.MailMessage mail = new System.Web.Mail.MailMessage();
            try
            {
                mail.To = to;
                mail.Cc = cc;
                mail.From = from;
                mail.Subject = title;
                mail.BodyFormat = System.Web.Mail.MailFormat.Html;
                mail.Body = body;
    
                mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1"); //basic authentication
                mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", from); //set your username here
                mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", pwd); //set your password here
                mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserverport", 465);//set port
                mail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpusessl", "true");//set is ssl
                System.Web.Mail.SmtpMail.SmtpServer = smtp;
                System.Web.Mail.SmtpMail.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

    }
}
