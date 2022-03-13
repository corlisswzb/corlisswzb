using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using BLL.busi_order;
using BLL.commone;
using CAL.order_cntr;

using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using NPOI.SS.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.Util;
using System.Drawing;
using BLL.lead_query;

namespace ZLHYWL.Ashx
{
    /// <summary>
    /// busi_order 的摘要说明
    /// </summary>
    public class busi_order : IHttpHandler, IRequiresSessionState
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

                     
                    #region 订单列表
                    case "get_order_list":
                        {
                            get_order_list(req, res);
                        }
                        break;
                    case "get_order_list_include_min_profit":
                        {
                            get_order_list_include_min_profit(req, res);
                        }
                        break;
                    #endregion

                    #region 所有费用信息
                    case "get_order_fee":
                        {
                            get_order_fee(req, res);
                        }
                        break;
                    case "download_order_fee":
                        {
                            download_order_fee(req, res);
                        }
                        break;
                    case "get_order_fee_group":
                        {
                            get_order_fee_group(req, res);
                        }
                        break;
                    case "get_order_fee_group_of_unwoa_and_commit":
                        {
                            get_order_fee_group_of_unwoa_and_commit(req, res);
                        }
                        break;
                    #endregion

                    #region  强制锁定
                    case "force_close_order":
                        {
                            force_close_order(req, res);
                        }
                        break;
                    #endregion 

                    #region 人工成本运算
                    #region 计算
                    case "pre_computer_fee_of_handcost":
                        {
                            pre_computer_fee_of_handcost(req, res);
                        }
                        break;
                    #endregion
                    #region 写入
                    case "insert_handcost_fee":
                        {
                            insert_handcost_fee(req, res);
                        }
                        break;
                    #endregion 

                    #region 删除
                    case "delete_fee_details":
                        {
                            delete_fee_details(req, res);
                        }
                        break;
                    #endregion 

                    #region 获取费用
                    case "get_order_fee_by_fee_seqs":
                        {
                            get_order_fee_by_fee_seqs(req, res);
                        }
                        break;
                    #endregion 
                    #endregion
                }
            }
            catch (Exception e)
            {
                mylog.writelog("busi_order." + ACTION,
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
      
        #region 订单查询 
        public void get_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string od_typ = req.Params["od_typ"] == null ? string.Empty : req.Params["od_typ"].ToString();
                string od_status_id = req.Params["od_status_id"] == null ? string.Empty : req.Params["od_status_id"].ToString();
                string od_project_typ = req.Params["od_project_typ"] == null ? string.Empty : req.Params["od_project_typ"].ToString();
                string od_cargo_agent_cu_id = req.Params["od_cargo_agent_cu_id"] == null ? string.Empty : req.Params["od_cargo_agent_cu_id"].ToString();
                string od_delegate_cu_id = req.Params["od_delegate_cu_id"] == null ? string.Empty : req.Params["od_delegate_cu_id"].ToString();
                string od_box_typ_id = req.Params["od_box_typ_id"] == null ? string.Empty : req.Params["od_box_typ_id"].ToString();
                string od_beg_fee_dat = req.Params["od_beg_fee_dat"] == null ? string.Empty : req.Params["od_beg_fee_dat"].ToString();
                string od_end_fee_dat = req.Params["od_end_fee_dat"] == null ? string.Empty : req.Params["od_end_fee_dat"].ToString();
                string od_service_id = req.Params["od_service_id"] == null ? string.Empty : req.Params["od_service_id"].ToString();
                string od_record_by_company_id = Session["cpy_id"].ToString();

                string od_trade_typ_id = req.Params["od_trade_typ_id"] == null ? string.Empty : req.Params["od_trade_typ_id"].ToString();
                string od_bill_nos = req.Params["od_bill_nos"] == null ? string.Empty : req.Params["od_bill_nos"].ToString();
                string od_cntr_nos = req.Params["od_cntr_nos"] == null ? string.Empty : req.Params["od_cntr_nos"].ToString();
                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string od_water_way_flag = req.Params["od_water_way_flag"] == null ? string.Empty : req.Params["od_water_way_flag"].ToString();
                string od_sub_way_flag = req.Params["od_sub_way_flag"] == null ? string.Empty : req.Params["od_sub_way_flag"].ToString();
                string od_road_way_flag = req.Params["od_road_way_flag"] == null ? string.Empty : req.Params["od_road_way_flag"].ToString();
                string od_air_way_flag = req.Params["od_air_way_flag"] == null ? string.Empty : req.Params["od_air_way_flag"].ToString();
                 
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                bll_busi_order bll = new bll_busi_order();

                string json = bll.get_order_list(like_str,
                    od_typ,
                    od_status_id,
                    od_project_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_box_typ_id,
                    od_beg_fee_dat,
                    od_end_fee_dat,
                    od_service_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    od_bill_nos,
                    od_cntr_nos,
                    od_route_tools_desc,
                    od_route_tools_no,
                    fee_cu_id,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag,
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

        public void get_order_list_include_min_profit(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string od_typ = req.Params["od_typ"] == null ? string.Empty : req.Params["od_typ"].ToString();
                string od_status_id = req.Params["od_status_id"] == null ? string.Empty : req.Params["od_status_id"].ToString();
                string od_project_typ = req.Params["od_project_typ"] == null ? string.Empty : req.Params["od_project_typ"].ToString();
                string od_cargo_agent_cu_id = req.Params["od_cargo_agent_cu_id"] == null ? string.Empty : req.Params["od_cargo_agent_cu_id"].ToString();
                string od_delegate_cu_id = req.Params["od_delegate_cu_id"] == null ? string.Empty : req.Params["od_delegate_cu_id"].ToString();
                string od_box_typ_id = req.Params["od_box_typ_id"] == null ? string.Empty : req.Params["od_box_typ_id"].ToString();
                string od_beg_fee_dat = req.Params["od_beg_fee_dat"] == null ? string.Empty : req.Params["od_beg_fee_dat"].ToString();
                string od_end_fee_dat = req.Params["od_end_fee_dat"] == null ? string.Empty : req.Params["od_end_fee_dat"].ToString();
                string od_service_id = req.Params["od_service_id"] == null ? string.Empty : req.Params["od_service_id"].ToString();
                string od_record_by_company_id = Session["cpy_id"].ToString();

                string od_trade_typ_id = req.Params["od_trade_typ_id"] == null ? string.Empty : req.Params["od_trade_typ_id"].ToString();
                string od_bill_nos = req.Params["od_bill_nos"] == null ? string.Empty : req.Params["od_bill_nos"].ToString();
                string od_cntr_nos = req.Params["od_cntr_nos"] == null ? string.Empty : req.Params["od_cntr_nos"].ToString();
                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string od_water_way_flag = req.Params["od_water_way_flag"] == null ? string.Empty : req.Params["od_water_way_flag"].ToString();
                string od_sub_way_flag = req.Params["od_sub_way_flag"] == null ? string.Empty : req.Params["od_sub_way_flag"].ToString();
                string od_road_way_flag = req.Params["od_road_way_flag"] == null ? string.Empty : req.Params["od_road_way_flag"].ToString();
                string od_air_way_flag = req.Params["od_air_way_flag"] == null ? string.Empty : req.Params["od_air_way_flag"].ToString();
                string od_min_profit = req.Params["od_min_profit"] == null ? string.Empty : req.Params["od_min_profit"].ToString();

                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                bll_busi_order bll = new bll_busi_order();

                string json = bll.get_order_list_include_min_profit(like_str,
                    od_typ,
                    od_status_id,
                    od_project_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_box_typ_id,
                    od_beg_fee_dat,
                    od_end_fee_dat,
                    od_service_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    od_bill_nos,
                    od_cntr_nos,
                    od_route_tools_desc,
                    od_route_tools_no,
                    fee_cu_id,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag,
                    od_min_profit,
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

        #region 获取 费用信息
        public void get_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();  

                string fee_status = req.Params["fee_status"] == null ? string.Empty : req.Params["fee_status"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string fee_item_typ = req.Params["fee_item_typ"] == null ? string.Empty : req.Params["fee_item_typ"].ToString();
                string fee_currency_id = req.Params["fee_currency_id"] == null ? string.Empty : req.Params["fee_currency_id"].ToString();
                string fee_invoice_typ = req.Params["fee_invoice_typ"] == null ? string.Empty : req.Params["fee_invoice_typ"].ToString();
                string fee_dat_beg = req.Params["fee_dat_beg"] == null ? string.Empty : req.Params["fee_dat_beg"].ToString();
                string fee_dat_end = req.Params["fee_dat_end"] == null ? string.Empty : req.Params["fee_dat_end"].ToString();
                string od_no = req.Params["od_no"] == null ? string.Empty : req.Params["od_no"].ToString();
                string od_typ = req.Params["od_typ"] == null ? string.Empty : req.Params["od_typ"].ToString();
                string od_project_typ = req.Params["od_project_typ"] == null ? string.Empty : req.Params["od_project_typ"].ToString();
                string od_water_way_flag = req.Params["od_water_way_flag"] == null ? string.Empty : req.Params["od_water_way_flag"].ToString();
                string od_sub_way_flag = req.Params["od_sub_way_flag"] == null ? string.Empty : req.Params["od_sub_way_flag"].ToString();
                string od_road_way_flag = req.Params["od_road_way_flag"] == null ? string.Empty : req.Params["od_road_way_flag"].ToString();
                string od_air_way_flag = req.Params["od_air_way_flag"] == null ? string.Empty : req.Params["od_air_way_flag"].ToString();
                string od_status_id = req.Params["od_status_id"] == null ? string.Empty : req.Params["od_status_id"].ToString();
                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string od_bill_nos = req.Params["od_bill_nos"] == null ? string.Empty : req.Params["od_bill_nos"].ToString();
                string od_cntr_nos = req.Params["od_cntr_nos"] == null ? string.Empty : req.Params["od_cntr_nos"].ToString();
                string invoice_no = req.Params["invoice_no"] == null ? string.Empty : req.Params["invoice_no"].ToString();
                string fee_rel_bill_no = req.Params["fee_rel_bill_no"] == null ? string.Empty : req.Params["fee_rel_bill_no"].ToString();
                string fee_invoice_lock_flag = req.Params["fee_invoice_lock_flag"] == null ? string.Empty : req.Params["fee_invoice_lock_flag"].ToString();
                string fee_limit_days_status = req.Params["fee_limit_days_status"] == null ? string.Empty : req.Params["fee_limit_days_status"].ToString();
                string fee_record_id = req.Params["fee_record_id"] == null ? string.Empty : req.Params["fee_record_id"].ToString();
                string fee_guess_amount = req.Params["fee_guess_amount"] == null ? string.Empty : req.Params["fee_guess_amount"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                bll_busi_order bll = new bll_busi_order();
                string json = bll.get_order_fee(c_id, 
                    fee_status,
                    rec_or_pay,
                    fee_cu_id,
                    fee_item_typ,
                    fee_currency_id,
                    fee_invoice_typ,
                    fee_dat_beg,
                    fee_dat_end,
                    od_no,
                    od_typ,
                    od_project_typ,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag,
                    od_status_id,
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_bill_nos,
                    od_cntr_nos,
                    invoice_no,
                    fee_rel_bill_no,
                    fee_limit_days_status,
                    fee_invoice_lock_flag,
                    fee_record_id,
                    fee_guess_amount,
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

        public void get_order_fee_group_of_unwoa_and_commit(HttpRequest req, HttpResponse res)
        {
            try
            {
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();

                string record_id = req.Params["record_id"] == null ? string.Empty : req.Params["record_id"].ToString();
                string sales_id = req.Params["sales_id"] == null ? string.Empty : req.Params["sales_id"].ToString();
                string service_id = req.Params["service_id"] == null ? string.Empty : req.Params["service_id"].ToString();
                string operation_id = req.Params["operation_id"] == null ? string.Empty : req.Params["operation_id"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string fee_dat_begin_year = req.Params["fee_dat_begin_year"] == null ? string.Empty : req.Params["fee_dat_begin_year"].ToString();
                string fee_dat_begin_month = req.Params["fee_dat_begin_month"] == null ? string.Empty : req.Params["fee_dat_begin_month"].ToString();
                string fee_dat_end_year = req.Params["fee_dat_end_year"] == null ? string.Empty : req.Params["fee_dat_end_year"].ToString();
                string fee_dat_end_month = req.Params["fee_dat_end_month"] == null ? string.Empty : req.Params["fee_dat_end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                string woa_flag = req.Params["woa_flag"] == null ? string.Empty : req.Params["woa_flag"].ToString();
                string invoice_flag = req.Params["invoice_flag"] == null ? string.Empty : req.Params["invoice_flag"].ToString();
                string record_invoice_flag = req.Params["record_invoice_flag"] == null ? string.Empty : req.Params["record_invoice_flag"].ToString();
                string limig_fee_dat_flag = req.Params["limig_fee_dat_flag"] == null ? string.Empty : req.Params["limig_fee_dat_flag"].ToString();
                string approval_flag = req.Params["approval_flag"] == null ? string.Empty : req.Params["approval_flag"].ToString();


                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                bll_busi_order bll = new bll_busi_order();
                string json = bll.get_order_fee_group_of_unwoa_and_commit(rec_or_pay,
                    c_id,
                    fee_cu_id,
                    record_id,
                    sales_id,
                    service_id,
                    operation_id,
                    fee_dat_begin_year,
                    fee_dat_begin_month,
                    fee_dat_end_year,
                    fee_dat_end_month,

                    woa_flag,
                    invoice_flag,
                    record_invoice_flag,
                    limig_fee_dat_flag,
                    approval_flag,
                    page,
                    rows,
                    sort,
                    ordersort );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_order_fee_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();

                string record_id = req.Params["record_id"] == null ? string.Empty : req.Params["record_id"].ToString();
                string sales_id = req.Params["sales_id"] == null ? string.Empty : req.Params["sales_id"].ToString();
                string service_id = req.Params["service_id"] == null ? string.Empty : req.Params["service_id"].ToString();
                string operation_id = req.Params["operation_id"] == null ? string.Empty : req.Params["operation_id"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string fee_dat_begin_year = req.Params["fee_dat_begin_year"] == null ? string.Empty : req.Params["fee_dat_begin_year"].ToString();
                string fee_dat_begin_month = req.Params["fee_dat_begin_month"] == null ? string.Empty : req.Params["fee_dat_begin_month"].ToString();
                string fee_dat_end_year = req.Params["fee_dat_end_year"] == null ? string.Empty : req.Params["fee_dat_end_year"].ToString();
                string fee_dat_end_month = req.Params["fee_dat_end_month"] == null ? string.Empty : req.Params["fee_dat_end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_order_fee_group(rec_or_pay,
                     c_id,
                     record_id,
                     sales_id,
                     service_id,
                     operation_id,

                     fee_cu_id,
                     fee_dat_begin_year,
                     fee_dat_begin_month,
                     fee_dat_end_year,
                     fee_dat_end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void download_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();

                string fee_status = req.Params["fee_status"] == null ? string.Empty : req.Params["fee_status"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string fee_item_typ = req.Params["fee_item_typ"] == null ? string.Empty : req.Params["fee_item_typ"].ToString();
                string fee_currency_id = req.Params["fee_currency_id"] == null ? string.Empty : req.Params["fee_currency_id"].ToString();
                string fee_invoice_typ = req.Params["fee_invoice_typ"] == null ? string.Empty : req.Params["fee_invoice_typ"].ToString();
                string fee_dat_beg = req.Params["fee_dat_beg"] == null ? string.Empty : req.Params["fee_dat_beg"].ToString();
                string fee_dat_end = req.Params["fee_dat_end"] == null ? string.Empty : req.Params["fee_dat_end"].ToString();
                string od_no = req.Params["od_no"] == null ? string.Empty : req.Params["od_no"].ToString();
                string od_typ = req.Params["od_typ"] == null ? string.Empty : req.Params["od_typ"].ToString();
                string od_project_typ = req.Params["od_project_typ"] == null ? string.Empty : req.Params["od_project_typ"].ToString();
                string od_water_way_flag = req.Params["od_water_way_flag"] == null ? string.Empty : req.Params["od_water_way_flag"].ToString();
                string od_sub_way_flag = req.Params["od_sub_way_flag"] == null ? string.Empty : req.Params["od_sub_way_flag"].ToString();
                string od_road_way_flag = req.Params["od_road_way_flag"] == null ? string.Empty : req.Params["od_road_way_flag"].ToString();
                string od_air_way_flag = req.Params["od_air_way_flag"] == null ? string.Empty : req.Params["od_air_way_flag"].ToString();
                string od_status_id = req.Params["od_status_id"] == null ? string.Empty : req.Params["od_status_id"].ToString();
                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string od_bill_nos = req.Params["od_bill_nos"] == null ? string.Empty : req.Params["od_bill_nos"].ToString();
                string od_cntr_nos = req.Params["od_cntr_nos"] == null ? string.Empty : req.Params["od_cntr_nos"].ToString();
                string invoice_no = req.Params["invoice_no"] == null ? string.Empty : req.Params["invoice_no"].ToString();
                string fee_rel_bill_no = req.Params["fee_rel_bill_no"] == null ? string.Empty : req.Params["fee_rel_bill_no"].ToString();
                string fee_invoice_lock_flag = req.Params["fee_invoice_lock_flag"] == null ? string.Empty : req.Params["fee_invoice_lock_flag"].ToString();
                string fee_limit_days_status = req.Params["fee_limit_days_status"] == null ? string.Empty : req.Params["fee_limit_days_status"].ToString();
                string fee_record_id = req.Params["fee_record_id"] == null ? string.Empty : req.Params["fee_record_id"].ToString();
                string fee_guess_amount = req.Params["fee_guess_amount"] == null ? string.Empty : req.Params["fee_guess_amount"].ToString();
             

                bll_busi_order bll = new bll_busi_order();
                JObject data_item = bll.get_order_fee_all(c_id,
                    fee_status,
                    rec_or_pay,
                    fee_cu_id,
                    fee_item_typ,
                    fee_currency_id,
                    fee_invoice_typ,
                    fee_dat_beg,
                    fee_dat_end,
                    od_no,
                    od_typ,
                    od_project_typ,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag,
                    od_status_id,
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_bill_nos,
                    od_cntr_nos,
                    invoice_no,
                    fee_rel_bill_no,
                    fee_limit_days_status,
                    fee_invoice_lock_flag,
                    fee_record_id,
                    fee_guess_amount );

                string file_nam = string.Empty;

                if (rec_or_pay.Equals("1"))
                {
                    file_nam = "应收款明细.xlsx";
                }
                else
                {
                    file_nam = "应付款明细.xlsx";
                }
                IWorkbook wk = create_wk(data_item, rec_or_pay);



                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                //将流写入

                //ms.Dispose();

                #endregion

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private IWorkbook create_wk(JObject data_item, string rec_or_pay)
        {
            try
            {
                #region 打开Excel表格模板，并初始化到NPOI对象中
                string sheetName = "Sheet1";
                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;
                #region 列宽

                //设置excel列宽
                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((12 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(20, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(13, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(14, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(15, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(16, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(17, (int)((12 + 0.72) * 256));
                sheet.SetColumnWidth(18, (int)((12 + 0.72) * 256));
                sheet.SetColumnWidth(19, (int)((24 + 0.72) * 256));
                sheet.SetColumnWidth(20, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(21, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(22, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(23, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(24, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(25, (int)((20 + 0.72) * 256));
                sheet.SetColumnWidth(26, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(27, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(28, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(29, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(30, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(31, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(32, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(33, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(34, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(35, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(36, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(37, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(38, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(39, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(40, (int)((10 + 0.72) * 256));

                #endregion

                #endregion



                #region 数据处理



                //读取Excel表格中的第一张Sheet表

                IRow row = null;//数据行
                ICell cell = null;//数据行中的某列 
                #region 字体样式
                //（头部标题）合并的单元格样式
                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal.Alignment = HorizontalAlignment.Center;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                HSSFFont font_normal;
                font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗

                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_normal.SetFont(font_normal);
                ts_normal.WrapText = false;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                IDataFormat dateformat = wk.CreateDataFormat();
                //ICellStyle style = wk.CreateCellStyle();
                //style.DataFormat = dateformat.GetFormat("#,##0.00");
                //ICellStyle style2 = wk.CreateCellStyle();
                //style2.DataFormat = dateformat.GetFormat("#,##0.0000");
                //ICellStyle style3 = wk.CreateCellStyle();
                //style2.DataFormat = dateformat.GetFormat("¥#,##0.00");

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");


                //单元格样式
                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)12;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_title.SetFont(font_title);
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;

                //标记颜色 
                HSSFCellStyle ts_yellow = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_yellow.Alignment = HorizontalAlignment.Center;
                ts_yellow.VerticalAlignment = VerticalAlignment.Center;
                ts_yellow.SetFont(font_normal);
                ts_yellow.WrapText = true;
                ts_yellow.BorderBottom = BorderStyle.Thin;
                ts_yellow.BorderLeft = BorderStyle.Thin;
                ts_yellow.BorderRight = BorderStyle.Thin;
                ts_yellow.BorderTop = BorderStyle.Thin;
                ts_yellow.FillForegroundColor = HSSFColor.Yellow.Index;
                ts_yellow.FillPattern = FillPattern.SolidForeground;
                #endregion

                #region 表头
                string[] head1 = { "费用详情", "委托情况", "维护情况" };
                string[] head2 = { "序号", "状态", "结算单位", "委托号", "业务时间", "税率", "费项", "数量", "单位", "单价", "币种", "汇率", "小计金额", "已销", "本币小计", "关联提空号", "关联箱属", "工具名", "工具号", "提单号", "发票号", "开票时间", "通审时间", "销账时间", "账期", "费用备注", "所属账单", "审核状态", "业务类型", "项目类型", "总应收", "实收", "未收", "总应付", "实付", "未付", "盈利", "记录人", "记录时间", "对账人", "对账时间" };
                row = sheet.CreateRow(0);
                for (int i = 0; i < head2.Length; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }

                row.Cells[0].SetCellValue(head1[0]);
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 0, 26));
                row.Cells[27].SetCellValue(head1[1]);
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 27, 36));
                row.Cells[37].SetCellValue(head1[2]);
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 37, 40));
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });

                row = sheet.CreateRow(1);
                for (int i = 0; i < head2.Length; i++)
                {
                    row.CreateCell(i).SetCellValue(head2[i]);
                }
                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                #endregion

                if (data_item["rows"] != null)
                {
                    #region 数据处理
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        int i = 0;
                        for (; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(2 + i);
                            row.CreateCell(0).SetCellValue((ja_data[i]["rownumber"]?? (i + 1)).ToString());
                            row.CreateCell(1).SetCellValue(ja_data[i]["fee_status_desc"].ToString());
                            row.CreateCell(2).SetCellValue(ja_data[i]["fee_cu_desc"].ToString());
                            row.CreateCell(3).SetCellValue(ja_data[i]["od_no"].ToString());
                            row.CreateCell(4).SetCellValue(ja_data[i]["fee_dat"].ToString());
                            row.CreateCell(5).SetCellValue(ja_data[i]["fee_invoice_typ_desc"].ToString());
                            row.CreateCell(6).SetCellValue(ja_data[i]["fee_item_typ_desc"].ToString());
                            row.CreateCell(7).SetCellValue(double.Parse((ja_data[i]["fee_number"] ?? "").ToString()));

                            row.CreateCell(8).SetCellValue(ja_data[i]["fee_unit_desc"].ToString());
                            row.CreateCell(9).SetCellValue(double.Parse((ja_data[i]["fee_price"] ?? "").ToString()));

                            row.CreateCell(10).SetCellValue(ja_data[i]["fee_currency_desc"].ToString());
                            row.CreateCell(11).SetCellValue(double.Parse((ja_data[i]["fee_currency_rate"] ?? "").ToString()));

                            row.CreateCell(12).SetCellValue(double.Parse((ja_data[i]["fee_amount"] ?? "").ToString()));

                            row.CreateCell(13).SetCellValue(double.Parse((ja_data[i]["woa_total_amount"] ?? "").ToString()));

                            row.CreateCell(14).SetCellValue(double.Parse((ja_data[i]["fee_amount_of_base_currency"] ?? "").ToString()));

                            row.CreateCell(15).SetCellValue(ja_data[i]["fee_rel_bill_no"].ToString());
                            row.CreateCell(16).SetCellValue(ja_data[i]["fee_rel_opr_cod"].ToString());
                            row.CreateCell(17).SetCellValue(ja_data[i]["first_ship_nam"].ToString());
                            row.CreateCell(18).SetCellValue(ja_data[i]["first_voyage"].ToString());
                            row.CreateCell(19).SetCellValue(ja_data[i]["od_main_bill_no"].ToString());
                            row.CreateCell(20).SetCellValue(ja_data[i]["od_invoice_no"].ToString());
                            row.CreateCell(21).SetCellValue(ja_data[i]["fee_invoice_lock_dat"].ToString());
                            row.CreateCell(22).SetCellValue(ja_data[i]["ca_amc_finish_dat"].ToString());
                            row.CreateCell(23).SetCellValue(ja_data[i]["fee_finace_lock_dat"].ToString());
                            row.CreateCell(24).SetCellValue(ja_data[i]["fee_limit_dat"].ToString());
                            row.CreateCell(25).SetCellValue(ja_data[i]["fee_bak"].ToString());
                            row.CreateCell(26).SetCellValue(ja_data[i]["ca_title"].ToString());
                            row.CreateCell(27).SetCellValue(ja_data[i]["od_status_desc"].ToString());
                            row.CreateCell(28).SetCellValue(ja_data[i]["od_typ_desc"].ToString());
                            row.CreateCell(29).SetCellValue(ja_data[i]["od_project_typ_desc"].ToString());
                            row.CreateCell(30).SetCellValue(ja_data[i]["rec_total_amount_desc"].ToString());

                            row.CreateCell(31).SetCellValue(ja_data[i]["reced_total_amount_desc"].ToString());

                            row.CreateCell(32).SetCellValue(ja_data[i]["unreced_total_amount_desc"].ToString());

                            row.CreateCell(33).SetCellValue(ja_data[i]["pay_total_amount_desc"].ToString());

                            row.CreateCell(34).SetCellValue(ja_data[i]["payed_total_amount_desc"].ToString());

                            row.CreateCell(35).SetCellValue(ja_data[i]["unpayed_total_amount_desc"].ToString());

                            row.CreateCell(36).SetCellValue(ja_data[i]["profit_total_amount_desc"].ToString());

                            row.CreateCell(37).SetCellValue(ja_data[i]["fee_record_nam"].ToString());
                            row.CreateCell(38).SetCellValue(ja_data[i]["fee_record_dat"].ToString());
                            row.CreateCell(39).SetCellValue(ja_data[i]["fee_checkaccount_lock_nam"].ToString());
                            row.CreateCell(40).SetCellValue(ja_data[i]["fee_checkaccount_lock_dat"].ToString());



                            cells = row.Cells;

                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });
                            row.GetCell(7).CellStyle = ts_normal_double;
                            row.GetCell(9).CellStyle = ts_normal_double;
                            row.GetCell(11).CellStyle = ts_normal_double4;
                            row.GetCell(12).CellStyle = ts_normal_double;
                            row.GetCell(13).CellStyle = ts_normal_double;
                            row.GetCell(14).CellStyle = ts_normal_double;


                        }

                        row = sheet.CreateRow(2 + i);
                        for (int j = 0; j < head2.Length; j++)
                        {
                            row.CreateCell(j).SetCellValue("");
                        }

                        string[] sarr = (data_item["group_fee_desc"] ?? "").ToString().Split(';');

                        string group_fee_desc = "费用汇总: 总金额:" + sarr[0] + "  已销:" + sarr[1] + "  未销:" + sarr[2];

                        row.Cells[0].SetCellValue(group_fee_desc);
                        sheet.AddMergedRegion(new CellRangeAddress(2 + i, 2 + i, 0, 40));
                    }
                    #endregion

                }

                #endregion

                return wk;



            }
            catch (Exception e)
            {

                throw e;
            }
        }
        #endregion

        #region 强制锁定
        public void force_close_order(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
 
                string lock_u_id = Session["u_id"].ToString();
                bll_busi_order bll = new bll_busi_order();
                string json = bll.force_close_order(od_seq, lock_u_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 人工成本运算
        #region 计算
        public void pre_computer_fee_of_handcost(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seqs = req.Params["od_seqs"] == null ? string.Empty : req.Params["od_seqs"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string fee_item_typ = req.Params["fee_item_typ"] == null ? string.Empty : req.Params["fee_item_typ"].ToString();
                string fee_unit = req.Params["fee_unit"] == null ? string.Empty : req.Params["fee_unit"].ToString();
                string fee_bak = req.Params["fee_bak"] == null ? string.Empty : req.Params["fee_bak"].ToString();
                string fee_record_id = Session["u_id"].ToString();
                string fee_invoice_typ = req.Params["fee_invoice_typ"] == null ? string.Empty : req.Params["fee_invoice_typ"].ToString();
                string total_hand_cost = req.Params["total_hand_cost"] == null ? string.Empty : req.Params["total_hand_cost"].ToString();
             
                string c_id = Session["cpy_id"].ToString();

                 
                bll_busi_order bll = new bll_busi_order();

                string json = bll.pre_computer_fee_of_handcost(c_id,
                    od_seqs,
                    fee_cu_id,
                    fee_item_typ,
                    fee_unit,
                    fee_bak,
                    fee_record_id,
                    fee_invoice_typ,
                    total_hand_cost);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 写入成本 
        public void insert_handcost_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fee_record_id = Session["u_id"].ToString(); 
                string c_id = Session["cpy_id"].ToString();

 
                string data_fee = req.Params["data_fee"] == null ? string.Empty : req.Params["data_fee"].ToString();
                bll_busi_order bll = new bll_busi_order();
                string json = bll.insert_handcost_fee(fee_record_id, data_fee);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 删除费用 
        public void delete_fee_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fee_update_id = Session["u_id"].ToString();

                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();
                bll_busi_order bll = new bll_busi_order();
                string json = bll.delete_fee_details(fee_seqs, fee_update_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 得到费用
        public void get_order_fee_by_fee_seqs(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();
                bll_busi_order bll = new bll_busi_order();
                string json = bll.get_order_fee_by_fee_seqs( fee_seqs);

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