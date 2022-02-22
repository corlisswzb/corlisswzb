using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
 

namespace SDZL
{
    public partial class main_page : System.Web.UI.MasterPage
    {
        

        protected void Page_Load(object sender, EventArgs e)
        {
 

            if (Session["u_id"] == null)
            {
                Response.Redirect("Default.aspx");
                return;
            }
            
            if (!IsPostBack)
            {
                lbl_name.Text = Session["u_real_name"].ToString();
            
                this.lbl_company_desc.Text = Session["cpy_desc"].ToString();
            }
        }
 
    }
}