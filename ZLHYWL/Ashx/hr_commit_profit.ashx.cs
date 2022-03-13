using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace ZLHYWL.Ashx
{
    /// <summary>
    /// hr_commit_profit 的摘要说明
    /// </summary>
    public class hr_commit_profit : IHttpHandler, IRequiresSessionState
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
                    #region 获取 
                    case "get_last_commit_dat":
                        {
                            get_last_commit_dat(req, res);
                        }
                        break;
                    case "get_woa_group_of_sb":
                        {
                            get_woa_group_of_sb(req, res);
                        }
                        break;
                    case "get_full_hr_commit_profit_list":
                        {
                            get_full_hr_commit_profit_list(req, res);
                        }
                        break;
                    case "get_hr_commit_profit_record_single":
                        {
                            get_hr_commit_profit_record_single(req, res);
                        }
                        break;
                    #endregion 

                    #region 插入
                    case "create_hr_commit_profit_approval":
                        {
                            create_hr_commit_profit_approval(req, res);
                        }
                        break;
                    #endregion 
                }
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("fio_fee_contract." + ACTION,
                  System.DateTime.Now.ToString(),
                  Session["u_id"].ToString() + ' ' + e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #region 插入 
        private void create_hr_commit_profit_approval(HttpRequest req, HttpResponse res)
        {
            try
            {

                BLL.hr_commit_profit.bll_hr_commit_profit fc = new BLL.hr_commit_profit.bll_hr_commit_profit();
                string hr_commit_id = Session["u_id"].ToString();

                string rel_u_id = Session["u_id"].ToString();
                //req.Params["rel_u_id"] == null ? string.Empty : req.Params["rel_u_id"].ToString();
                string rel_beg_dat = req.Params["rel_beg_dat"] == null ? string.Empty : req.Params["rel_beg_dat"].ToString();
                string rel_end_dat = req.Params["rel_end_dat"] == null ? string.Empty : req.Params["rel_end_dat"].ToString();
                string order_list = req.Params["order_list"] == null ? string.Empty : req.Params["order_list"].ToString();
                string c_id = Session["cpy_id"].ToString(); // req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
               
                string ap_u_id = req.Params["ap_u_id"] == null ? string.Empty : req.Params["ap_u_id"].ToString();
                string aps_order_by_id = req.Params["aps_order_by_id"] == null ? string.Empty : req.Params["aps_order_by_id"].ToString();
                string aps_id = req.Params["aps_id"] == null ? string.Empty : req.Params["aps_id"].ToString();
                string amc_bak = req.Params["amc_bak"] == null ? string.Empty : req.Params["amc_bak"].ToString();
                string json = fc.create_hr_commit_profit_approval(hr_commit_id,
                    rel_u_id,
                    rel_beg_dat,
                    rel_end_dat,
                    order_list,
                    c_id,
                    ap_u_id,
                    aps_order_by_id,
                    aps_id,
                    amc_bak);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        } 
        #endregion 

        #region 获取

        #region 获取上一次 (当前时间以前的)
        private void get_last_commit_dat(HttpRequest req, HttpResponse res)
        {
            try
            {

                BLL.hr_commit_profit.bll_hr_commit_profit fc = new BLL.hr_commit_profit.bll_hr_commit_profit();
                string rel_u_id = Session["u_id"].ToString();
                //req.Params["rel_u_id"] == null ? string.Empty : req.Params["rel_u_id"].ToString();
                string cpy_desc = Session["cpy_desc"].ToString();

                string json = fc.get_last_commit_dat(rel_u_id, cpy_desc);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 通过时间,u_id获取应收结算完毕委托单
        private void get_woa_group_of_sb(HttpRequest req, HttpResponse res)
        {
            try
            {

                BLL.hr_commit_profit.bll_hr_commit_profit fc = new BLL.hr_commit_profit.bll_hr_commit_profit();
                string group_u_id = Session["u_id"].ToString(); //req.Params["group_u_id"] == null ? string.Empty : req.Params["group_u_id"].ToString();
                string woa_beg_dat = req.Params["woa_beg_dat"] == null ? string.Empty : req.Params["woa_beg_dat"].ToString();
                string woa_end_dat = req.Params["woa_end_dat"] == null ? string.Empty : req.Params["woa_end_dat"].ToString(); 
                string c_id = Session["cpy_id"].ToString();

                string json = fc.get_woa_group_of_sb(c_id, group_u_id, woa_beg_dat, woa_end_dat);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取审核列表
        private void get_full_hr_commit_profit_list(HttpRequest req, HttpResponse res)
        {
            try
            {

                BLL.hr_commit_profit.bll_hr_commit_profit fc = new BLL.hr_commit_profit.bll_hr_commit_profit();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string u_id = Session["u_id"].ToString();
                string amc_status = req.Params["amc_status"] == null ? string.Empty : req.Params["amc_status"].ToString();
                string amc_cur_opr_id = req.Params["amc_cur_opr_id"] == null ? string.Empty : req.Params["amc_cur_opr_id"].ToString();
                string amc_create_id = req.Params["amc_create_id"] == null ? string.Empty : req.Params["amc_create_id"].ToString();
                string hr_rel_u_id = req.Params["hr_rel_u_id"] == null ? string.Empty : req.Params["hr_rel_u_id"].ToString();
                string only_my_step = req.Params["only_my_step"] == null ? string.Empty : req.Params["only_my_step"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["ordersort"] == null ? string.Empty : req.Params["ordersort"].ToString();


                string json = fc.get_full_hr_commit_profit_list(c_id,
                    like_str,
                    u_id,
                    amc_status,
                    amc_cur_opr_id,
                    amc_create_id,
                    hr_rel_u_id,
                    only_my_step,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion


        #region 获取审核列表
        private void get_hr_commit_profit_record_single(HttpRequest req, HttpResponse res)
        {
            try
            {

                BLL.hr_commit_profit.bll_hr_commit_profit fc = new BLL.hr_commit_profit.bll_hr_commit_profit();
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString(); 
                string u_id = Session["u_id"].ToString();


                string json = fc.get_hr_commit_profit_record_single(amc_id,
                    u_id );
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