using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BASECONFIG;

namespace BLL.commone
{
    public class mail_address
    {

        string _from_en;

        public string From_en
        {
            get { return _from_en; }
            set { _from_en = value; }
        }
        string _from_pwd;

        public string From_pwd
        {
            get { return _from_pwd; }
            set { _from_pwd = value; }
        }
        string _from_smtp;

        public string From_smtp
        {
            get { return _from_smtp; }
            set { _from_smtp = value; }
        }

        string _to_en;

        public string To_en
        {
            get { return _to_en; }
            set { _to_en = value; }
        }

        public mail_address(string from_en, string from_pwd, string from_stmp, string to_en)
        {
            _from_en = from_en;
            _from_pwd = from_pwd;
            _from_smtp = from_stmp;
            _to_en = to_en;
        }
    }
    public enum EMAIL_MODEL {  DEFAULT };
    public class mailFac
    {
        mail_address _ma;
        public mailFac()
        {
            _ma = new mail_address(baseconfig.Exception_From_EmailAddress,
                baseconfig.Exception_From_EmailPassword, 
                baseconfig.Exception_From_EmailSmtp, string.Empty);
        }
        public mailFac(EMAIL_MODEL em)
        {
            _ma = new mail_address(baseconfig.Exception_From_EmailAddress,
                baseconfig.Exception_From_EmailPassword,
                baseconfig.Exception_From_EmailSmtp, string.Empty);
            switch (em)
            { 
                case EMAIL_MODEL.DEFAULT:
                    {
                        _ma.To_en = baseconfig.Exception_To_EmailAddress_Default;
                        //_ma.To_en = "1617190573@qq.com";
                        break;
                    }
                default:
                    {
                        _ma.To_en = baseconfig.Exception_To_EmailAddress_Default;
                        break;
                    }
            }
        }

        public mail_address get_address()
        {
            return _ma;
        }
    }

    public static class mylog
    {
 
        public static void writelog(string where, string when, string how, EMAIL_MODEL em)
        {
            try
            {

                mailFac mf = new mailFac(em);

                mail_address ma = mf.get_address();
                //发送邮件
                mailhelper.SendEmail("SDZL--异常汇报", ma.From_en, ma.From_pwd, ma.From_smtp, ma.To_en, string.Empty,
                     string.Format("<h3>亲爱的管理员,您好!</h3><br/><br/><p>系统发生异常,位置:{0},时间:{1},异常信息:{2}</p>", where, when, how), null);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
         
    }
}
