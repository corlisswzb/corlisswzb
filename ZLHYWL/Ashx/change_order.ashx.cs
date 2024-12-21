using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using BLL.chang_order;
using BLL.commone;
using CAL.order_cntr;

namespace Jbfd.Ashx
{
    /// <summary>
    /// change_order 的摘要说明
    /// </summary>
    public class change_order : IHttpHandler, IRequiresSessionState
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

                    #region 改单列表
                    case "get_change_order_list":
                        {
                            get_change_order_list(req, res);
                        }
                        break;
                    #endregion
                    #region 改单计划
                    case "get_changeorder_plan_list":
                        {
                            get_changeorder_plan_list(req, res);
                        }
                        break;
                    case "create_changeorder_plan":
                        {
                            create_changeorder_plan(req, res);
                        }
                        break;
                    #endregion
                    #region 单个计划详情
                    case "get_changeorder_single_full_collections":
                        {
                            get_changeorder_single_full_collections(req, res);
                        }
                        break;
                    #endregion
                    #region 改单费用变化
                    case "get_changorder_plan_fee_record":
                        {
                            get_changorder_plan_fee_record(req, res);
                        }
                        break;
                    case "get_changorder_plan_all_fee_record":
                        {
                            get_changorder_plan_all_fee_record(req, res);
                        }
                        break;
                    #endregion
                   
                    #region 删除计划
                    case "delete_changeorder_plan":
                        {
                            delete_changeorder_plan(req, res);
                        }
                        break;
                    #endregion

                }
            }
            catch (Exception e)
            {
                mylog.writelog("change_order." + ACTION,
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }

        }

        #region 单个计划详情
        private void get_changeorder_single_full_collections(HttpRequest req, HttpResponse res)
        {
            try
            {
                string co_seq = req.Params["co_seq"] == null ? string.Empty : req.Params["co_seq"].ToString();
                string u_id = Session["u_id"].ToString();
                bll_change_order bll = new bll_change_order();
                string json = bll.get_changeorder_single_full_collections(co_seq, u_id);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 分页查询
        public void get_change_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_status = req.Params["od_status"] == null ? string.Empty : req.Params["od_status"].ToString();
                string fee_status = req.Params["fee_status"] == null ? string.Empty : req.Params["fee_status"].ToString();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string fee_item_typ = req.Params["fee_item_typ"] == null ? string.Empty : req.Params["fee_item_typ"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string fee_invoice_typ = req.Params["fee_invoice_typ"] == null ? string.Empty : req.Params["fee_invoice_typ"].ToString();
                string fee_unit = req.Params["fee_unit"] == null ? string.Empty : req.Params["fee_unit"].ToString();
                string fee_currency_id = req.Params["fee_currency_id"] == null ? string.Empty : req.Params["fee_currency_id"].ToString();
                string od_beg_fee_dat = req.Params["od_beg_fee_dat"] == null ? string.Empty : req.Params["od_beg_fee_dat"].ToString();
                string od_end_fee_dat = req.Params["od_end_fee_dat"] == null ? string.Empty : req.Params["od_end_fee_dat"].ToString();
                string operation_id = req.Params["operation_id"] == null ? string.Empty : req.Params["operation_id"].ToString();

                string u_id = Session["u_id"].ToString();
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["ordersort"] == null ? string.Empty : req.Params["ordersort"].ToString();

                bll_change_order bll = new bll_change_order();

                string json = bll.get_change_order_list(od_status, fee_status,
                    like_str,
                    fee_cu_id,
                    fee_item_typ,
                    rec_or_pay,
                    fee_invoice_typ,
                    fee_unit,
                    fee_currency_id,
                    od_beg_fee_dat,
                    od_end_fee_dat,
                    operation_id,
                    u_id,
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

        

        

        #region 获取我的改单计划列表
        public void get_changeorder_plan_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string co_status = req.Params["co_status"] == null ? string.Empty : req.Params["co_status"].ToString();
                string amc_status = req.Params["amc_status"] == null ? string.Empty : req.Params["amc_status"].ToString();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string create_id = req.Params["create_id"] == null ? string.Empty : req.Params["create_id"].ToString();
                string beg_date = req.Params["beg_date"] == null ? string.Empty : req.Params["beg_date"].ToString();
                string end_date = req.Params["end_date"] == null ? string.Empty : req.Params["end_date"].ToString();

                string u_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["ordersort"] == null ? string.Empty : req.Params["ordersort"].ToString();

                bll_change_order bll = new bll_change_order();

                string json = bll.get_changeorder_plan_list(co_status, amc_status,
                    like_str,
                    create_id,
                    beg_date,
                    end_date,
                    u_id,
                    c_id,
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
        #region 创建计划
        private void create_changeorder_plan(HttpRequest req, HttpResponse res)
        {
            try
            {   
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                
                string new_fee_data = req.Params["new_fee_data"] == null ? string.Empty : req.Params["new_fee_data"].ToString();
              
                string co_bak = req.Params["co_bak"] == null ? string.Empty : req.Params["co_bak"].ToString();
                string u_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();

                string ap_u_id = req.Params["ap_u_id"] == null ? string.Empty : req.Params["ap_u_id"].ToString();
                string ap_order_by_id = req.Params["aps_order_by_id"] == null ? string.Empty : req.Params["aps_order_by_id"].ToString();
                string ap_aps_id = req.Params["aps_id"] == null ? string.Empty : req.Params["aps_id"].ToString();

                bll_change_order bll = new bll_change_order();
                string json = bll.create_changeorder_plan(od_seq,  new_fee_data, 
                     co_bak, 
                     u_id, 
                     c_id,
                     ap_u_id,
                     ap_order_by_id,
                     ap_aps_id
                     );
                res.Write(json);

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 删除计划
        private void delete_changeorder_plan(HttpRequest req, HttpResponse res)
        {
            try
            {
                string co_seq = req.Params["co_seq"] == null ? string.Empty : req.Params["co_seq"].ToString();
                bll_change_order bll = new bll_change_order();
                string json = bll.delete_changeorder_plan(co_seq);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 改单费用变化
        private void get_changorder_plan_fee_record(HttpRequest req, HttpResponse res)
        {
            try
            {
                string co_seq = req.Params["co_seq"] == null ? string.Empty : req.Params["co_seq"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();

                bll_change_order bll = new bll_change_order();
                string json = bll.get_changorder_plan_fee_record(co_seq, rec_or_pay);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 改单全部费用变化
        private void get_changorder_plan_all_fee_record(HttpRequest req, HttpResponse res)
        {
            try
            {
                string co_seq = req.Params["co_seq"] == null ? string.Empty : req.Params["co_seq"].ToString();
                
                bll_change_order bll = new bll_change_order();
                string json = bll.get_changorder_plan_all_fee_record(co_seq);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
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