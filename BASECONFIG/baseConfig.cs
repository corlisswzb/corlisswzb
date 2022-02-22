using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BASECONFIG
{
    public static class baseconfig
    {
        #region BLL.commone.mylog.cs 日志 邮箱发送/异常接收
        //服务器邮件端口配置 看 BLL.commone.mailhelper.cs 内容 

        #region 发送者
        //邮箱地址  例如 wangzhibiao@sina.com 

        public static string Exception_From_EmailAddress
        {
            get { return "1401065007@qq.com"; }
        }
        //密码 

        public static string Exception_From_EmailPassword
        {
            get { return "nwzfdaeeomxwggjd"; }
        }
        //smtp服务器 例如: smtp.exmal.qq.com 

        public static string Exception_From_EmailSmtp
        {
            get { return "smtp.exmal.qq.com"; }
        }

        #endregion

        #region 接收者
        //邮箱地址 例如 wanzhibiao@sina.com  
        public static string Exception_To_EmailAddress_Default
        {
            get { return "wangzhibiao2011@163.com"; }
        }
        #endregion

        #endregion

        #region mysqlhelper.local.msssqlhelper.cs 数据连接

        //数据库地址
        //本地数据库，允许window账户登录时用.或者loclhost 否则需要填写 ip地址或域名  

        public static string Sql_IP
        {
            get { return "39.97.33.199"; }
        }

        //数据库名称 
        public static string Sql_DBNAME
        {
            get
            {
                return "zhwlwebsys"; 
            }
        }
        //数据库 访问账户 
        public static string Sql_UID
        {
            get
            {
                return "sa";  
            }
        }

        //数据库 访问密码  
        public static string Sql_PWD
        {
            get
            {
                return "115.Zh#@Zhy526526"; 
            }
        }
        #endregion

        #region BLL.vx.MessageHelp.cs 微信手机端配置 
        /*
            本系统可对接到 企业微信。  PS: 由于 企业微信应用程序和本系统是独立系统，中间需要进行转换账户信息。故需要重新设计。暂不支持 
            企业微信功能 
         * 
         *  对接方法，将关键字段传递给企业微信后台服务。企业微信的后台服务区处理消息推送。
         *  注: 企业微信后台服务是指开发者开发的微信应用程序、
         */
        //空白地址: 用于提供仅提醒消息，无需展示详情的卡片消息展开后显示 
        public static string VX_URL_OF_NONE_VIEW
        {
            get { return "http://****.*****.****/****/*****.aspx"; }  
        }
        //企业微信应用端处理地址 
        public static string VX_URL_OF_APPROVL_ALERT
        {
            get { return "http://****.*****.****/****/*****.ashx"; }
        }
        #endregion 

    }
}