using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace ZLHYWL
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {

        }

        protected void Session_Start(object sender, EventArgs e)
        {
            Session.Add("u_id", null);
            Session.Add("cpy_desc", null);
            Session.Add("cpy_id", null);
            Session.Add("u_login_name", null);
            Session.Add("u_real_name", null);
            Session.Add("u_image", null);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {
            if (Session["u_id"] == null)
            {
                Session.Clear();
                return;
            }
            string uid = Session["u_id"].ToString();
            BLL.usermanager.user_mgr us = new BLL.usermanager.user_mgr();
            us.logout_sys(uid);

            Session.Clear();
            

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}