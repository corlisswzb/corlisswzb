using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using BLL.fee;
using BLL.commone;
using System;

namespace ZLHYWL.Ashx
{
    /// <summary>
    /// exchange_rate 的摘要说明
    /// </summary>
    public class exchange_rate : IHttpHandler, IRequiresSessionState
    {
        HttpSessionState Session = null;
        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;
            Session = context.Session;
            if (Session["u_id"] == null)
            {
                res.Write("{\"sessionerror\":1}");
                return;
            }
            string ACTION = req.Params["action"] == null ? string.Empty : req.Params["action"].ToString();
            try
            {
                switch (ACTION)
                {
                    #region 汇率
                    case "set_month_exchange_rate":
                        {
                            set_month_exchange_rate(req, res);
                        }
                        break;
                    case "get_month_exchange_rate":
                        {
                            get_month_exchange_rate(req, res);
                        }
                        break;
                    case "get_month_exchange_rate_by_od_seq":
                        {
                            get_month_exchange_rate_by_od_seq(req, res);
                        }
                        break;
                    #endregion
                }
            }
            catch (Exception e)
            {
                mylog.writelog("sys_base." + ACTION,
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }


         
        #region 汇率

        #region 设定
        public void set_month_exchange_rate(HttpRequest req, HttpResponse res)
        {
            try
            {
                string er_year = req.Params["er_year"] == null ? string.Empty : req.Params["er_year"].ToString();
                string er_month = req.Params["er_month"] == null ? string.Empty : req.Params["er_month"].ToString();
                string er_cr_id = req.Params["er_cr_id"] == null ? string.Empty : req.Params["er_cr_id"].ToString();
                string er_cr_rate = req.Params["er_cr_rate"] == null ? string.Empty : req.Params["er_cr_rate"].ToString();
                string er_record_by_id = Session["u_id"].ToString();
                string er_record_by_nam = Session["u_real_name"].ToString();
                string c_id = Session["cpy_id"].ToString();
                bll_fee bf = new bll_fee();
                string json = bf.set_month_exchange_rate(er_year,
                    er_month,
                    er_cr_id,
                    er_cr_rate,
                    er_record_by_id,
                    er_record_by_nam,
                    c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取  根据年 和 货币获取
        public void get_month_exchange_rate(HttpRequest req, HttpResponse res)
        {
            try
            {
                string er_year = req.Params["er_year"] == null ? string.Empty : req.Params["er_year"].ToString();
                
                string er_cr_id = req.Params["er_cr_id"] == null ? string.Empty : req.Params["er_cr_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                bll_fee bf = new bll_fee();
                string json = bf.get_month_exchange_rate(er_year, 
                    er_cr_id,
                    c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取  根据订单
        public void get_month_exchange_rate_by_od_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
 
                bll_fee bf = new bll_fee();
                string json = bf.get_month_exchange_rate_by_od_seq(od_seq);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion
         
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}