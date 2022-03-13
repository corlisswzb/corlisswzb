using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using BLL.commone;
using System.Drawing;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json; 
using NPOI.SS.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.Util;
using System.Text;
 

namespace ZLHYWL.Ashx
{
    /// <summary>
    /// checkaccount 的摘要说明
    /// </summary>
    public class checkaccount : IHttpHandler, IRequiresSessionState
    {
        HttpSessionState Session = null;
        BLL.checkaccount.bll_check_account bul = null;

        public void ProcessRequest(HttpContext context)
        {
           
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;
            Session = context.Session;
            bul = new BLL.checkaccount.bll_check_account();
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
                    #region 业务账单管理
                    #region 获取费用信息
                    case "get_order_fee":
                        {
                            get_order_fee(req, res);
                        }
                        break;

                    #endregion
                    #region 获取账单信息
                    case "get_checkaccount":
                        {
                            get_checkaccount(req, res);
                        }
                        break;
                    case "get_checkaccount_no_page":
                        {
                            get_checkaccount_no_page(req, res);
                        }
                        break;
                    case "get_checkaccount_by_ca_seq":
                        {
                            get_checkaccount_by_ca_seq(req, res);
                        }
                        break;
                    #endregion

                    #region 新增账单
                    case "insert_main_list":
                        {
                            insert_main_list(req, res);
                        }
                        break;
                    #endregion 
                    #region 更新账单
                    case "update_main_list":
                        {
                            update_main_list(req, res);
                        }
                        break;
                    case "update_main_list_simple":
                        {
                            update_main_list_simple(req, res);
                        }
                        break;
                    #endregion
                    #region 删除账单
                    case "delete_main_list":
                        {
                            delete_main_list(req, res);
                        }
                        break;
                    #endregion
                    #region 费用加入对账单
                    case "insert_fee_details":
                        {
                            insert_fee_details(req, res);
                        }
                        break;
                    #endregion
                    #region 费用从对账单移除
                    case "delete_fee_details":
                        {
                            delete_fee_details(req, res);
                        }
                        break;
                    #endregion
                    #region 获取对账单费用
                    case "get_order_fee_by_ca_seq":
                        {
                            get_order_fee_by_ca_seq(req, res);
                        }
                        break;
                    #endregion

                    #region 添加对账文件
                    case "insert_ca_file":
                        {
                            insert_ca_file(req, res);
                        }
                        break;
                    #endregion
                    #region 账单投递
                    case "post":
                        {
                            post(req, res);
                        }
                        break;
                    #endregion

                    #region 更新账单的费用
                    case "update_fee_details":
                        {
                            update_fee_details(req, res);
                        }
                        break;
                    case "pre_update_fee_details":
                        {
                            pre_update_fee_details(req, res);
                        }
                        break;
                    case "pre_test_update_fee_details_deep":
                        {
                            pre_test_update_fee_details_deep(req, res);
                        }
                        break;
                    #endregion  

                    #region 下载 对账单
                    case "get_order_fee_by_ca_seq_for_download":
                        {
                            get_order_fee_by_ca_seq_for_download(req, res);
                        }
                        break;
                    #endregion 

                    #region 专注模式
                    case "get_group_order_fee_of_nonca_by_cu_id":
                        {
                            get_group_order_fee_of_nonca_by_cu_id(req, res);
                        }
                        break;
                    case "get_details_order_fee_of_nonca_by_cu_id":
                        {     
                            get_details_order_fee_of_nonca_by_cu_id(req, res);
                        }
                        break;
                    #endregion 
                    #endregion

                    #region 商务账单管理
                    case "get_checkaccount_of_bus":
                        {
                            get_checkaccount_of_bus(req, res);
                        }
                        break; 
                    case "get_checkaccount_group_by_cu_id":
                        {
                            get_checkaccount_group_by_cu_id(req, res);
                        }
                        break;
                    case "get_checkaccount_group_by_typ_index":
                        {
                            get_checkaccount_group_by_typ_index(req, res);
                        }
                        break;
                    case "get_checkaccount_by_typ_index":
                        {
                            get_checkaccount_by_typ_index(req, res);
                        }
                        break;
                    case "get_checkaccount_count_by_typ_index":
                        {
                            get_checkaccount_count_by_typ_index(req, res);
                        }
                        break;
                    case "get_checkaccount_of_rec_need_invoice":
                        {
                            get_checkaccount_of_rec_need_invoice(req, res);
                        }
                        break;
                    case "get_order_fee_by_ca_seq_of_bus":
                        {
                            get_order_fee_by_ca_seq_of_bus(req, res);
                        }
                        break;
                    case "get_single_pay_checkaccount":
                        {
                            get_single_pay_checkaccount(req, res);
                        }
                        break;
                    case "giveback_checkaccount":
                        {
                            giveback_checkaccount(req, res);
                        }
                        break;
                    case "flag_checkaccount_invoice":
                        {
                            flag_checkaccount_invoice(req, res);
                        }
                        break;
                    case "unflag_checkaccount_invoice":
                        {
                            unflag_checkaccount_invoice(req, res);
                        }
                        break;
                    case "flag_checkaccount_finace":
                        {
                            flag_checkaccount_finace(req, res);
                        }
                        break;
                    case "unflag_checkaccount_finace":
                        {
                            unflag_checkaccount_finace(req, res);
                        }
                        break;
                    case "flag_fee_invoice_by_fee_seqs":
                        {
                            flag_fee_invoice_by_fee_seqs(req, res);
                        }
                        break;
                    case "unflag_fee_invoice_by_fee_seqs":
                        {
                            unflag_fee_invoice_by_fee_seqs(req, res);
                        }
                        break;

                    case "flag_fee_finace_by_fee_seqs":
                        {
                            flag_fee_finace_by_fee_seqs(req, res);
                        }
                        break;
                    case "unflag_fee_finace_by_fee_seqs":
                        {
                            unflag_fee_finace_by_fee_seqs(req, res);
                        }
                        break;

                    case "update_woa_bak":
                        {
                            update_woa_bak(req, res);
                        }
                        break;
                    case "update_oi_bak":
                        {
                            update_oi_bak(req, res);
                        }
                        break;
                    #region 账单投递
                    case "post_for_bus":
                        {
                            post_for_bus(req, res);
                        }
                        break;
                    #endregion
                    #region 删除账单
                    case "delete_main_list_for_bus":
                        {
                            delete_main_list_for_bus(req, res);
                        }
                        break;
                    #endregion

                    #region 删除账单费用
                    case "delete_fee_details_for_bus":
                        {
                            delete_fee_details_for_bus(req, res);
                        }
                        break;
                    #endregion
                    case "bat_judge_fee_finace_by_fee_seq":
                        {
                            bat_judge_fee_finace_by_fee_seq(req, res);
                        }
                        break;
                    case "get_write_off_accounts_list":
                        {
                            get_write_off_accounts_list(req, res);
                        }
                        break;
                    case "get_order_fee_by_woa_seq":
                        {
                            get_order_fee_by_woa_seq(req, res);
                        }
                        break;
                    case "get_order_fee_by_oi_seq":
                        {
                            get_order_fee_by_oi_seq(req, res);
                        }
                        break;
                    case "get_write_off_accounts_details_by_fee_seq":
                        {
                            get_write_off_accounts_details_by_fee_seq(req, res);
                        }
                        break;
                    case "post_pay_checkaccount":
                        {
                            post_pay_checkaccount(req, res);
                        }
                        break;
                    
                    case "insert_hedge_off_accounts_record":
                        {
                            insert_hedge_off_accounts_record(req, res);
                        }
                        break;
                    case "insert_hedge_off_accounts_details":
                        {
                            insert_hedge_off_accounts_details(req, res);
                        }
                        break;
                    case "delete_hedge_off_accounts_details":
                        {
                            delete_hedge_off_accounts_details(req, res);
                        }
                        break;
                    case "delete_hedge_off_accounts_record":
                        {
                            delete_hedge_off_accounts_record(req, res);
                        }
                        break;
                    case "get_hedge_off_accounts_record":
                        {
                            get_hedge_off_accounts_record(req, res);
                        }
                        break;
                    case "get_hedge_off_accounts_record_no_page":
                        {
                            get_hedge_off_accounts_record_no_page(req, res);
                        }
                        break;
                    case "get_hedge_off_accounts_record_single":
                        {
                            get_hedge_off_accounts_record_single(req, res);
                        }
                        break;
                    case "post_hedge_off_accounts":
                        {
                            post_hedge_off_accounts(req, res);
                        }
                        break;
                    case "flag_hedge_off_accounts_finace_by_hoa_seq":
                        {
                            flag_hedge_off_accounts_finace_by_hoa_seq(req, res);
                        }
                        break;
                    #region 专注模式
                    case "get_group_order_fee_of_nonca_for_bus":
                        {
                            get_group_order_fee_of_nonca_for_bus(req, res);
                        }
                        break;
                    case "get_details_order_fee_of_nonca_for_bus":
                        {
                            get_details_order_fee_of_nonca_for_bus(req, res);
                        }
                        break;
                    case "download_details_order_fee_of_nonca_for_bus":
                        {
                            download_details_order_fee_of_nonca_for_bus(req, res);
                        }
                        break;
                    #endregion 

                    #region 更新账单
                    case "update_main_list_for_bus":
                        {
                            update_main_list_for_bus(req, res);
                        }
                        break;
                    case "update_main_list_simple_for_bus":
                        {
                            update_main_list_simple_for_bus(req, res);
                        }
                        break;
                    #endregion
                    #endregion 

                    #region 得到单个账单 集合审核情况
                    case "get_checkaccount_single_full_collections":
                        {
                            get_checkaccount_single_full_collections(req, res);
                        }
                        break;
                    #endregion 

                    #region 发票模糊查询
                    case "get_order_invoice_by_like_str_for_combogrid":
                        {
                            get_order_invoice_by_like_str_for_combogrid(req, res);
                        }
                        break;
                    #endregion 

                    #region 发票记录
                    case "get_order_invoice_list":
                        {
                            get_order_invoice_list(req, res);

                        }
                        break;
                    case "get_order_fee_and_invoice_files_by_oi_seq":
                        {
                            get_order_fee_and_invoice_files_by_oi_seq(req, res);

                        }
                        break;
                    #endregion 


                    #region 上传发票
                    case "insert_order_invoice_file":
                        {
                            insert_order_invoice_file(req, res);
                        }
                        break;
                    #endregion 

                    #region 根据发票号得到发票文件  
                    case "get_order_invoice_file":
                        {
                            get_order_invoice_file(req, res);
                        }
                        break;
                    #endregion 

                    #region 根据审批号获取 账单相关信息 
                    case "get_ap_checkaccount_single_full_collections":
                        {
                            get_ap_checkaccount_single_full_collections(req, res);
                        }
                        break;
                    #endregion

                    #region 负账检测 
                    case "pre_post_test_of_loss":
                        {
                            pre_post_test_of_loss(req, res);
                        }
                        break;
                    #endregion 

                    #region 检验是不是财务部
                    case "can_use_flag_finance_in_bus_page":
                        {
                            can_use_flag_finance_in_bus_page(req, res);
                        }
                        break;
                    #endregion

                    #region 下载 费用明细
                    case "download_order_fee":
                        {
                            download_order_fee(req, res);
                        }
                        break;
                    #endregion 

                    #region 投递且过账 
                    #region 过账获取信息 通过账单号和过账单位获取相应信息
                    case "transfer_accountcheck":
                        {
                            transfer_accountcheck(req, res);
                        }
                        break;
                    #endregion

                    #region 投递并过账 
                    case "create_transfer_ca":
                        {
                            create_transfer_ca(req, res);
                        }
                        break;
                    #endregion 

                    #region 判断是否删除，退回账单 
                    case "judge_giveback_checkaccount":
                        {
                            judge_giveback_checkaccount(req, res);
                        }
                        break;
                    #endregion 
                    #endregion

                    #region 统计
                    case "get_group_details_of_operation_for_self":
                        {
                            get_group_details_of_operation_for_self(req, res);
                        }
                        break;
                    case "get_group_details_of_operation_for_busi":
                        {
                            get_group_details_of_operation_for_busi(req, res);
                        }
                        break;
                    #endregion 
                }
            }
            catch (Exception e)
            {
                mylog.writelog("checkaccount." + ACTION,
                System.DateTime.Now.ToString(),
                e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #region 业务员 账单管理
        #region 获取 费用信息
        public void get_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();

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
                string fee_limit_days_status = req.Params["fee_limit_days_status"] == null ? string.Empty : req.Params["fee_limit_days_status"].ToString();
                string fee_invoice_lock_flag = req.Params["fee_invoice_lock_flag"] == null ? string.Empty : req.Params["fee_invoice_lock_flag"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                 
                string json = bul.get_order_fee(c_id,
                    u_id,
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
        #endregion

        #region 获取 账单信息
        //分页 业务员用
        public void get_checkaccount(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();

                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string ca_cu_id = req.Params["ca_cu_id"] == null ? string.Empty : req.Params["ca_cu_id"].ToString();
               
                string ca_status = req.Params["ca_status"] == null ? string.Empty : req.Params["ca_status"].ToString();
                
                string ca_year = req.Params["ca_year"] == null ? string.Empty : req.Params["ca_year"].ToString();
                string ca_month = req.Params["ca_month"] == null ? string.Empty : req.Params["ca_month"].ToString();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string ca_create_by_id = req.Params["ca_create_by_id"] == null ? string.Empty : req.Params["ca_create_by_id"].ToString();
                string ca_invoice_no = req.Params["ca_invoice_no"] == null ? string.Empty : req.Params["ca_invoice_no"].ToString();
                string ca_fee_total = req.Params["ca_fee_total"] == null ? string.Empty : req.Params["ca_fee_total"].ToString();

                string ca_invoice_typ_status = req.Params["ca_invoice_typ_status"] == null ? string.Empty : req.Params["ca_invoice_typ_status"].ToString();
                string ca_approval_status = req.Params["ca_approval_status"] == null ? string.Empty : req.Params["ca_approval_status"].ToString();
                string ca_woa_status = req.Params["ca_woa_status"] == null ? string.Empty : req.Params["ca_woa_status"].ToString();

                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                 

                string json = bul.get_checkaccount(c_id,
                    u_id,
                    rec_or_pay,
                    ca_cu_id, 
                    ca_status, 
                    ca_year,
                    ca_month,
                    like_str,
                    ca_create_by_id,
                    ca_invoice_no,
                    ca_fee_total,
                    ca_invoice_typ_status,
                    ca_approval_status,
                    ca_woa_status,
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
        //不分页 业务员用
        public void get_checkaccount_no_page(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();

                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string ca_cu_id = req.Params["ca_cu_id"] == null ? string.Empty : req.Params["ca_cu_id"].ToString();
                string ca_year = req.Params["ca_year"] == null ? string.Empty : req.Params["ca_year"].ToString();
                string ca_month = req.Params["ca_month"] == null ? string.Empty : req.Params["ca_month"].ToString();
               

                string json = bul.get_checkaccount_no_page(c_id,
                    u_id,
                    rec_or_pay,
                    ca_cu_id, 
                    ca_year,
                    ca_month);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        //单个信息
        public void get_checkaccount_by_ca_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                
                string u_id = Session["u_id"].ToString();

                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();


                string json = bul.get_checkaccount_by_ca_seq(ca_seq,
                    u_id );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

       

        //单个信息
        public void get_checkaccount_single_full_collections(HttpRequest req, HttpResponse res)
        {
            try
            {

                string u_id = Session["u_id"].ToString();

                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();


                string json = bul.get_checkaccount_single_full_collections(ca_seq,
                    u_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        #endregion

        #region 新增对账单
        public void insert_main_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_cu_id = req.Params["ca_cu_id"] == null ? string.Empty : req.Params["ca_cu_id"].ToString();
                string ca_company_id = Session["cpy_id"].ToString();

                string ca_title = req.Params["ca_title"] == null ? string.Empty : req.Params["ca_title"].ToString();
                string ca_group_flag = req.Params["ca_group_flag"] == null ? string.Empty : req.Params["ca_group_flag"].ToString();
                string ca_rec_or_pay = req.Params["ca_rec_or_pay"] == null ? string.Empty : req.Params["ca_rec_or_pay"].ToString();
                string ca_year = req.Params["ca_year"] == null ? string.Empty : req.Params["ca_year"].ToString();
                string ca_month = req.Params["ca_month"] == null ? string.Empty : req.Params["ca_month"].ToString();
                string ca_bak = req.Params["ca_bak"] == null ? string.Empty : req.Params["ca_bak"].ToString();
                string ca_create_by_id = Session["u_id"].ToString();

                string ca_limit_dat = req.Params["ca_limit_dat"] == null ? string.Empty : req.Params["ca_limit_dat"].ToString();
                string ca_assign_flag = req.Params["ca_assign_flag"] == null ? string.Empty : req.Params["ca_assign_flag"].ToString();
                string u_ids = req.Params["u_ids"] == null ? string.Empty : req.Params["u_ids"].ToString();
                string data_attachment = req.Params["data_attachment"] == null ? string.Empty : req.Params["data_attachment"].ToString();

                string json = bul.insert_main_list(ca_cu_id,
                    ca_company_id,
                    ca_title,
                    ca_group_flag,
                    ca_rec_or_pay,
                    ca_year,
                    ca_month,
                    ca_bak,
                    ca_create_by_id,
                    ca_limit_dat,
                    ca_assign_flag,
                    u_ids,
                    data_attachment);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 更新对账单
        public void update_main_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_title = req.Params["ca_title"] == null ? string.Empty : req.Params["ca_title"].ToString();
               
               
                string ca_group_flag = req.Params["ca_group_flag"] == null ? string.Empty : req.Params["ca_group_flag"].ToString();
            
                string ca_year = req.Params["ca_year"] == null ? string.Empty : req.Params["ca_year"].ToString();
                string ca_month = req.Params["ca_month"] == null ? string.Empty : req.Params["ca_month"].ToString();
                string ca_bak = req.Params["ca_bak"] == null ? string.Empty : req.Params["ca_bak"].ToString();
                string ca_create_by_id = Session["u_id"].ToString();
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString(); ;
                string ca_limit_dat = req.Params["ca_limit_dat"] == null ? string.Empty : req.Params["ca_limit_dat"].ToString();
                string ca_assign_flag = req.Params["ca_assign_flag"] == null ? string.Empty : req.Params["ca_assign_flag"].ToString();
                string u_ids = req.Params["u_ids"] == null ? string.Empty : req.Params["u_ids"].ToString();
                string data_attachment = req.Params["data_attachment"] == null ? string.Empty : req.Params["data_attachment"].ToString();

                string json = bul.update_main_list(ca_title,
                    ca_group_flag,
                    ca_year,
                    ca_month,
                    ca_bak,
                    ca_create_by_id,
                    ca_seq,
                    ca_limit_dat,
                    ca_assign_flag,
                    u_ids,
                    data_attachment);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void update_main_list_simple(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_title = req.Params["ca_title"] == null ? string.Empty : req.Params["ca_title"].ToString();
                 
              
                string ca_bak = req.Params["ca_bak"] == null ? string.Empty : req.Params["ca_bak"].ToString();
                string u_id = Session["u_id"].ToString();
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString(); ;
                string ca_cu_id = req.Params["ca_cu_id"] == null ? string.Empty : req.Params["ca_cu_id"].ToString();
                
                 
                string json = bul.update_main_list_simple(ca_title, 
                    ca_bak,
                    ca_cu_id,
                    u_id,
                    ca_seq );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除对账单
        public void delete_main_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seqs = req.Params["ca_seqs"] == null ? string.Empty : req.Params["ca_seqs"].ToString();



                string ca_create_by_id = Session["u_id"].ToString();
                string json = bul.delete_main_list(ca_seqs,
                    ca_create_by_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 账单附件
        #region 增加
        public void insert_ca_file(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string file_nam = string.Empty;
                string file_path = string.Empty;
                string mode = req.Params["mode"] == null ? string.Empty : req.Params["mode"].ToString();
                string guid = System.Guid.NewGuid().ToString().Replace("-", "");
                string folder =  "/upload_files/check_account_file/" ;
                string virtual_path = string.Empty;

                bool isRight = true;

                if (mode.Equals("pic"))
                {
                    file_nam = req.Params["pic_name"] == null ? string.Empty : req.Params["pic_name"];

                    string base64str = req.Params["pic"];

                    base64str = base64str.Split(',')[1];
                    var btsdata = Convert.FromBase64String(base64str);
                    file_path = System.Web.HttpContext.Current.Server.MapPath(folder) + guid + Path.GetExtension(file_nam);
                    virtual_path = folder + guid + Path.GetExtension(file_nam);
                    System.IO.MemoryStream stream = new System.IO.MemoryStream(btsdata);
                    Bitmap bmp = new Bitmap(stream);
                    //bmp.Save(System.AppDomain.CurrentDomain.BaseDirectory + file_path, System.Drawing.Imaging.ImageFormat.Jpeg);
                    bmp.Save(file_path , System.Drawing.Imaging.ImageFormat.Jpeg);
                    stream.Close();
                }
                else
                {
                    HttpFileCollection files = req.Files;
                    if (files == null)
                    {
                        res.Write("{\"result\":0,\"msg\":\"没有找到文件\"}");
                        isRight = false;
                    }

                    string json = req["params"].ToString();

                    JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                    foreach (string key in files.Keys)
                    {
                        try
                        {
                            HttpPostedFile fileData = files[key];

                            if (fileData != null)
                            {
                                file_nam = fileData.FileName;
                                file_path = System.Web.HttpContext.Current.Server.MapPath(folder) + guid + Path.GetExtension(fileData.FileName);
                                virtual_path = folder + guid + Path.GetExtension(file_nam);
                                //fileData.SaveAs(System.AppDomain.CurrentDomain.BaseDirectory + file_path);
                                fileData.SaveAs(file_path);
                            }
                        }
                        catch (Exception e)
                        {
                            throw e;
                        }
                    }
                } 
                if (isRight)
                {
                    res.Write("{\"result\":1,\"file_path\":\"" + virtual_path + "\",\"file_nam\":\"" + file_nam + "\"}");
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
         
        #endregion

        #region 费用加入对账单
        public void insert_fee_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();
                
                string record_by_id = Session["u_id"].ToString();
                string json = bul.insert_fee_details(ca_seq,
                    fee_seqs,
                    record_by_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 费用从对账单移除
        public void delete_fee_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();

                string update_by_id = Session["u_id"].ToString();
                string json = bul.delete_fee_details(ca_seq,
                    fee_seqs,
                    update_by_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取对账单费用
        public void get_order_fee_by_ca_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();

                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                

                string json = bul.get_order_fee_by_ca_seq(c_id,
                    u_id, 
                    rec_or_pay,
                    ca_seq);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 账单投递
        public void post(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
                string ca_bak = req.Params["ca_bak"] == null ? string.Empty : req.Params["ca_bak"].ToString();

                string cur_opr_id = Session["u_id"].ToString();
                string json = bul.post(ca_seq,
                    cur_opr_id,
                    ca_bak);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        #endregion

        #region 更新账单的费用
        private void update_fee_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                string update_id = Session["u_id"].ToString();
 
                string fee_date = req.Params["fee_date"] == null ? string.Empty : req.Params["fee_date"].ToString();

                string json = bul.update_fee_details(  fee_date, update_id);

                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        private void pre_test_update_fee_details_deep(HttpRequest req, HttpResponse res)
        {
            try
            {
                string update_id = Session["u_id"].ToString();

                string fee_date = req.Params["fee_date"] == null ? string.Empty : req.Params["fee_date"].ToString();

                string json = bul.pre_test_update_fee_details_deep(fee_date);

                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        private void pre_update_fee_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                string update_id = Session["u_id"].ToString();

                string fee_data = req.Params["fee_date"] == null ? string.Empty : req.Params["fee_date"].ToString();

                string json = bul.pre_update_fee_details(fee_data, update_id);

                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 下载  对账单
        private void get_order_fee_by_ca_seq_for_download(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();
 
                Dictionary<string, string> dic_temp = new Dictionary<string, string>();

                string fee_json = bul.get_order_fee_by_ca_seq_for_download(
                    c_id,
                    ca_seq,
                    u_id,
                    ref dic_temp
                    ); 
                #region 打开Excel表格模板，并初始化到NPOI对象中
                IWorkbook wk = new HSSFWorkbook();
                string filePath = System.Web.HttpContext.Current.Server.MapPath("/Templates/账单对账单模版.xlsx");
                if (!File.Exists(filePath))
                {
                    return;
                }
                string extension = System.IO.Path.GetExtension(filePath);
                FileStream fs = File.OpenRead(filePath);
                if (extension.Equals(".xls"))
                {
                    //把xls文件中的数据写入wk中
                    wk = new HSSFWorkbook(fs);
                }
                else
                {
                    //把xlsx文件中的数据写入wk中
                    wk = new XSSFWorkbook(fs);
                }
                fs.Close();
                #endregion



                //读取Excel表格中的第一张Sheet表
                ISheet sheet = wk.GetSheetAt(0);
                IRow row = null;//数据行
                ICell cell = null;//数据行中的某列 
                 
                string print_nam = string.Empty;
                string print_dat = string.Empty;
                string company_cn_bank_info = string.Empty;
                string company_en_bank_info = string.Empty;
                string ca_title = string.Empty;
                string total_amount = string.Empty;

                for (int i = sheet.FirstRowNum; i <= sheet.LastRowNum; i++)
                {
                    row = sheet.GetRow(i);
                    for (int j = row.FirstCellNum; j < row.LastCellNum; j++)
                    {
                        cell = row.GetCell(j);
                        foreach (KeyValuePair<string, string> kvp in dic_temp)
                        {
                            string cell_val = cell.StringCellValue;
                            if (cell_val.Contains("{$" + kvp.Key + "}"))
                            {
                                cell.SetCellValue(cell_val.Replace("{$" + kvp.Key + "}", kvp.Value));
                            }

                            if (kvp.Key.Equals("ca_title"))
                            {
                                ca_title = kvp.Value;
                            }
                            if (kvp.Key.Equals("print_nam"))
                            {
                                print_nam = kvp.Value;
                            }
                            if (kvp.Key.Equals("print_dat"))
                            {
                                print_dat = kvp.Value;
                            }
                            if (kvp.Key.Equals("company_cn_bank_info"))
                            {
                                company_cn_bank_info = kvp.Value;
                            }
                            if (kvp.Key.Equals("company_en_bank_info"))
                            {
                                company_en_bank_info = kvp.Value;
                            }
                            if (kvp.Key.Equals("total_amount"))
                            {
                                total_amount = kvp.Value;
                            }
                        }
                    }
                }

                #region 字体样式
                //（头部标题）合并的单元格样式
                ICellStyle ts_normal = wk.CreateCellStyle();
                //垂直居中
                ts_normal.Alignment = HorizontalAlignment.Center;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                IFont font_normal;
                font_normal = wk.CreateFont();
                //font.IsBold = true;//加粗
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)10;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_normal.SetFont(font_normal);
                ts_normal.WrapText = false;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;

                ICellStyle ts_normal2 = wk.CreateCellStyle();
                //垂直居中
                ts_normal2.Alignment = HorizontalAlignment.Center;
                ts_normal2.VerticalAlignment = VerticalAlignment.Center;

                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_normal2.SetFont(font_normal);
                ts_normal2.WrapText = false;
                ts_normal2.BorderBottom = BorderStyle.Thin;
                ts_normal2.BorderLeft = BorderStyle.Thin;
                ts_normal2.BorderRight = BorderStyle.Thin;
                ts_normal2.BorderTop = BorderStyle.Thin;
                ts_normal2.DataFormat = 194;
                //单元格样式
                ICellStyle ts_title = wk.CreateCellStyle();
                //垂直居中
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                IFont font_title;
                font_title = wk.CreateFont();
                font_title.IsBold = true;//加粗
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)10;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_title.SetFont(font_title);
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;

                ICellStyle ts_bottom1 = wk.CreateCellStyle();
                //垂直居中
                ts_bottom1.Alignment = HorizontalAlignment.Left;
                ts_bottom1.VerticalAlignment = VerticalAlignment.Center;
                ts_bottom1.WrapText = false;

                ICellStyle ts_bottom2 = wk.CreateCellStyle();
                //垂直居中
                ts_bottom2.Alignment = HorizontalAlignment.Right;
                ts_bottom2.VerticalAlignment = VerticalAlignment.Center;
                ts_bottom2.WrapText = false;
                #endregion

                string[] data_str = { 
		        "od_no",
		        "od_place_beg",
		        "od_place_end",
		        "od_cargo_typ_desc",
		        "od_fee_dat",
		        "od_bill_no",
		        "od_cntr_group_desc",
		        "od_cntr_desc",
		        "od_freight_desc",
		        "od_ship_info",
		        "od_ship_etd",
		        "fee_currency_desc",
		        "fee_item_desc",
		        "fee_price",
		        "fee_number",
		        "fee_invoice_typ_desc",
		        "fee_amount",
                "fee_od_amount",
		        "bak"};
                 
                //从第 4行开始写费用 
                int nStart_index = sheet.FirstRowNum + 3;

                List<NPOI.SS.UserModel.ICell> cells = null;

                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(fee_json);
                if (data_item["rows"] != null)
                {

                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        int t_start_index = nStart_index;

                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(nStart_index);
                            
                            for(int step = 0;step < data_str.Length; step ++) 
                            { 
                                row.CreateCell(step).SetCellValue(ja_data[i][data_str[step]].ToString());
                            } 
                            cells = row.Cells;

                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                if (c.ColumnIndex > 1 || c.ColumnIndex < 6)
                                {
                                    c.CellStyle = ts_normal2;
                                }
                                else
                                {
                                    c.CellStyle = ts_normal;
                                }

                            }); 
                            nStart_index = nStart_index + 1;
                        }

                        string od_seq = string.Empty;

                        int from_ind = 0;
                        int to_ind = 0;

                        //进行单元格合并 
                        for (int i = 0; i <= ja_data.Count; i++)
                        {
                            if (i < ja_data.Count)
                            {
                                if (od_seq == string.Empty)
                                {
                                    od_seq = ja_data[i]["od_seq"].ToString();
                                    from_ind = i;
                                }

                                if (od_seq == ja_data[i]["od_seq"].ToString())
                                {
                                    continue;
                                }
                                else
                                {
                                    to_ind = i - 1;
                                    for (int j = 0; j < data_str.Length; j++)
                                    {
                                        if ((j >= 0 && j <= 10) || (j >= 17))
                                        {
                                            sheet.AddMergedRegion(new CellRangeAddress(t_start_index + from_ind,
                                            t_start_index + to_ind,
                                            j,
                                            j));
                                        }

                                    }
                                    od_seq = ja_data[i]["od_seq"].ToString();
                                    from_ind = i;
                                }
                            }else {
                                to_ind = i - 1;
                                for (int j = 0; j < data_str.Length; j++)
                                {
                                    if ((j >= 0 && j <= 10) || (j >= 17))
                                    {
                                        sheet.AddMergedRegion(new CellRangeAddress(t_start_index + from_ind,
                                        t_start_index + to_ind,
                                        j,
                                        j));
                                    }

                                } 
                            }
                        }
                            

                         
                    } 
                } 

                //加一个小结 
                row = sheet.CreateRow(nStart_index);
                row.CreateCell(0).SetCellValue("小计");
                row.CreateCell(1).SetCellValue(total_amount);
                for (int step = 2; step < data_str.Length; step++)
                {
                    row.CreateCell(step).SetCellValue("");
                }
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 1, data_str.Length));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                nStart_index = nStart_index + 1;
                //加一行备注  
                row = sheet.CreateRow(nStart_index);
                row.Height = 7 * 200;
                StringBuilder noString = new StringBuilder("请贵司签字确认后通过传真或快递回传.感谢您的合作! \n");
                noString.Append("备注:请您核对以上明细.并请提供发票抬头,如3日内没有异议,我司认为贵司已确认以上费用,谢谢合作! \n");
                noString.Append("我司开户行帐号资料如下\n");

                row.CreateCell(0).SetCellValue(noString.ToString());
                for (int step = 1; step < data_str.Length; step++)
                {
                    row.CreateCell(step).SetCellValue("");
                }
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 0, data_str.Length));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bottom1;
                });
                //加上开户信息
                nStart_index = nStart_index + 1;
                row = sheet.CreateRow(nStart_index);
                row.Height = 5 * 200;
                row.CreateCell(0).SetCellValue("人民币开户银行:" + company_cn_bank_info);
                row.CreateCell(1).SetCellValue("");
                row.CreateCell(2).SetCellValue("");
                row.CreateCell(3).SetCellValue("");
                row.CreateCell(4).SetCellValue("");
                row.CreateCell(5).SetCellValue("");
                row.CreateCell(6).SetCellValue("");
                row.CreateCell(7).SetCellValue("外币开户银行:" + company_en_bank_info);
                for (int step = 8; step < data_str.Length; step++)
                {
                    row.CreateCell(step).SetCellValue("");
                }
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 0, 6));
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 7, data_str.Length));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bottom1;
                });

                //加上开户信息
                nStart_index = nStart_index + 1;
                row = sheet.CreateRow(nStart_index);
                row.Height = 7 * 200; 
                StringBuilder noString1 = new StringBuilder("贵司负责人签名:                    日期：          \n");
                noString1.Append("\n");
                noString1.Append("\n");
                noString1.Append("                               签字盖章：             ");
                row.CreateCell(0).SetCellValue(noString1.ToString());
                for (int step = 1; step < data_str.Length; step++)
                {
                    row.CreateCell(step).SetCellValue("");
                }
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 0, data_str.Length));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bottom1;
                });
                //打印信息 
                nStart_index = nStart_index + 1;
                row = sheet.CreateRow(nStart_index);
                row.CreateCell(0).SetCellValue(@"打印: " + print_nam + "     时间: " + print_dat);
                for (int step = 1; step < data_str.Length; step++)
                {
                    row.CreateCell(step).SetCellValue("");
                }
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 0, data_str.Length));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bottom2;
                });
                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                  
                    string fileName = ca_title + ".xlsx";
                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + fileName);
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

        #endregion

        #region 专注模式
        #region 所有未归账的费用汇总
        public void get_group_order_fee_of_nonca_by_cu_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                //string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                
                string json = bul.get_group_order_fee_of_nonca_by_cu_id(c_id,
                    u_id, 
                    rec_or_pay );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 所有未归账的费用明细
        public void get_details_order_fee_of_nonca_by_cu_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string cu_id = req.Params["cu_id"] == null ? string.Empty : req.Params["cu_id"].ToString();

                string json = bul.get_details_order_fee_of_nonca_by_cu_id(c_id,
                    u_id,
                    rec_or_pay,
                    cu_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #endregion

        #region 商务 账单管理
        #region 获取 账单信息
        //分页  业务员用
        public void get_checkaccount_of_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string ca_cu_id = req.Params["ca_cu_id"] == null ? string.Empty : req.Params["ca_cu_id"].ToString();
                string ca_status = req.Params["ca_status"] == null ? string.Empty : req.Params["ca_status"].ToString();
                string ca_year = req.Params["ca_year"] == null ? string.Empty : req.Params["ca_year"].ToString();
                string ca_month = req.Params["ca_month"] == null ? string.Empty : req.Params["ca_month"].ToString();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string ca_create_by_id = req.Params["ca_create_by_id"] == null ? string.Empty : req.Params["ca_create_by_id"].ToString();

                string ca_invoice_no = req.Params["ca_invoice_no"] == null ? string.Empty : req.Params["ca_invoice_no"].ToString();
                string ca_fee_total = req.Params["ca_fee_total"] == null ? string.Empty : req.Params["ca_fee_total"].ToString();

                string ca_invoice_typ_status = req.Params["ca_invoice_typ_status"] == null ? string.Empty : req.Params["ca_invoice_typ_status"].ToString();
                string ca_approval_status = req.Params["ca_approval_status"] == null ? string.Empty : req.Params["ca_approval_status"].ToString();
                string ca_woa_status = req.Params["ca_woa_status"] == null ? string.Empty : req.Params["ca_woa_status"].ToString();

                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();


                string json = bul.get_checkaccount_bus(c_id,
                    rec_or_pay,
                    ca_cu_id,
                    ca_status,
                    ca_year,
                    ca_month,
                    like_str,
                    ca_create_by_id,
                    ca_invoice_no,
                    ca_fee_total,
                    ca_invoice_typ_status,
                    ca_approval_status,
                    ca_woa_status,
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

        public void get_checkaccount_count_by_typ_index(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString(); 

                string json = bul.get_checkaccount_count_by_typ_index(c_id,
                    rec_or_pay );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void get_checkaccount_by_typ_index(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string typ_index = req.Params["typ_index"] == null ? string.Empty : req.Params["typ_index"].ToString();
               
                string json = bul.get_checkaccount_by_typ_index(c_id,
                    rec_or_pay,
                    typ_index );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_checkaccount_group_by_typ_index(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string typ_index = req.Params["typ_index"] == null ? string.Empty : req.Params["typ_index"].ToString(); 

                string json = bul.get_checkaccount_group_by_typ_index(c_id,
                    rec_or_pay,
                    typ_index);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void get_checkaccount_group_by_cu_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();  
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string ca_status_flag = req.Params["ca_status_flag"] == null ? string.Empty : req.Params["ca_status_flag"].ToString();
                string ca_invoice_flag = req.Params["ca_invoice_flag"] == null ? string.Empty : req.Params["ca_invoice_flag"].ToString();
                string ca_woa_flag = req.Params["ca_woa_flag"] == null ? string.Empty : req.Params["ca_woa_flag"].ToString();
                
                string json = bul.get_checkaccount_group_by_cu_id(c_id,
                    rec_or_pay,
                    ca_status_flag,
                    ca_invoice_flag,
                    ca_woa_flag);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void get_checkaccount_of_rec_need_invoice(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString(); 
                string ca_cu_id = req.Params["ca_cu_id"] == null ? string.Empty : req.Params["ca_cu_id"].ToString();
                string ca_status = req.Params["ca_status"] == null ? string.Empty : req.Params["ca_status"].ToString();
                string ca_year = req.Params["ca_year"] == null ? string.Empty : req.Params["ca_year"].ToString();
                string ca_month = req.Params["ca_month"] == null ? string.Empty : req.Params["ca_month"].ToString();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string ca_create_by_id = req.Params["ca_create_by_id"] == null ? string.Empty : req.Params["ca_create_by_id"].ToString();
                string ca_invoice_status = req.Params["ca_invoice_status"] == null ? string.Empty : req.Params["ca_invoice_status"].ToString();
                
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();


                string json = bul.get_checkaccount_of_rec_need_invoice(c_id, 
                    ca_cu_id,
                    ca_status,
                    ca_year,
                    ca_month,
                    like_str,
                    ca_create_by_id,
                    ca_invoice_status,
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

        #region 获取对账单费用
        public void get_order_fee_by_ca_seq_of_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();

                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();


                string json = bul.get_order_fee_by_ca_seq(c_id, 
                    rec_or_pay,
                    ca_seq);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_single_pay_checkaccount(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();

                string amc_id  = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();

                

                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();


                string json = bul.get_single_pay_checkaccount(c_id,
                    rec_or_pay,
                    amc_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 退回账单
        public void giveback_checkaccount(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string ca_seqs = req.Params["ca_seqs"] == null ? string.Empty : req.Params["ca_seqs"].ToString();

                string json = bul.giveback_checkaccount(ca_seqs);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 账单投递
        
        public void post_for_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
                string ca_bak = req.Params["ca_bak"] == null ? string.Empty : req.Params["ca_bak"].ToString();

                string cur_opr_id = Session["u_id"].ToString();
                string json = bul.post_for_bus(ca_seq,
                    cur_opr_id,
                    ca_bak);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 删除对账单
        public void delete_main_list_for_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seqs = req.Params["ca_seqs"] == null ? string.Empty : req.Params["ca_seqs"].ToString();



                string ca_create_by_id = Session["u_id"].ToString();
                string json = bul.delete_main_list_for_bus(ca_seqs,
                    ca_create_by_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 费用从对账单移除
        public void delete_fee_details_for_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_fee_details = req.Params["ca_fee_details"] == null ? string.Empty : req.Params["ca_fee_details"].ToString(); 
 

                string json = bul.delete_fee_details_for_bus(ca_fee_details );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 标记账单
        #region 开票情况
        public void flag_checkaccount_invoice(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seqs = req.Params["ca_seqs"] == null ? string.Empty : req.Params["ca_seqs"].ToString();
                string cur_opr_id = Session["u_id"].ToString();

                string json = bul.flag_checkaccount_invoice(ca_seqs, cur_opr_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void unflag_checkaccount_invoice(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seqs = req.Params["ca_seqs"] == null ? string.Empty : req.Params["ca_seqs"].ToString();
               
                string json = bul.unflag_checkaccount_invoice(ca_seqs);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 销账情况
        public void flag_checkaccount_finace(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seqs = req.Params["ca_seqs"] == null ? string.Empty : req.Params["ca_seqs"].ToString();
                string cur_opr_id = Session["u_id"].ToString();

                string json = bul.flag_checkaccount_finace(ca_seqs, cur_opr_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void unflag_checkaccount_finace(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seqs = req.Params["ca_seqs"] == null ? string.Empty : req.Params["ca_seqs"].ToString();

                string json = bul.unflag_checkaccount_finace(ca_seqs);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 根据费用标记
        #region 开票情况
        public void flag_fee_invoice_by_fee_seqs(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();
                string cur_opr_id = Session["u_id"].ToString();
                string oi_c_id = Session["cpy_id"].ToString();
                string oi_sub_no = req.Params["oi_sub_no"] == null ? string.Empty : req.Params["oi_sub_no"].ToString();
                string oi_seq = req.Params["oi_seq"] == null ? string.Empty : req.Params["oi_seq"].ToString();
                string invoice_no = req.Params["invoice_no"] == null ? string.Empty : req.Params["invoice_no"].ToString();
                string oi_limit_dat = req.Params["oi_limit_dat"] == null ? string.Empty : req.Params["oi_limit_dat"].ToString();
                string oi_bak = req.Params["oi_bak"] == null ? string.Empty : req.Params["oi_bak"].ToString();
                string oi_rec_or_pay = req.Params["oi_rec_or_pay"] == null ? string.Empty : req.Params["oi_rec_or_pay"].ToString();
               
                string oi_cu_id = req.Params["oi_cu_id"] == null ? string.Empty : req.Params["oi_cu_id"].ToString();

                string oi_invoice_files_json = req.Params["oi_invoice_files_json"] == null ? string.Empty : req.Params["oi_invoice_files_json"].ToString();

                string json = bul.flag_fee_invoice_by_fee_seqs(fee_seqs, cur_opr_id, invoice_no, oi_limit_dat,
                    oi_bak,
                    oi_c_id,
                    oi_rec_or_pay,
                    oi_sub_no,
                    oi_seq,
                    oi_cu_id,
                    oi_invoice_files_json);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void unflag_fee_invoice_by_fee_seqs(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();
                
                string json = bul.unflag_fee_invoice_by_fee_seqs(fee_seqs);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        //获取 开票记录 
        //public void get_order_invoice_list(HttpRequest req, HttpResponse res)
        //{
        //    try
        //    {
        //        string oi_rec_or_pay = req.Params["oi_rec_or_pay"] == null ? string.Empty : req.Params["oi_rec_or_pay"].ToString();
        //        string oi_c_id = Session["cpy_id"].ToString();
        //        string oi_cu_id = req.Params["oi_cu_id"] == null ? string.Empty : req.Params["oi_cu_id"].ToString();
        //        string oi_total_money = req.Params["oi_total_money"] == null ? string.Empty : req.Params["oi_total_money"].ToString();
        //        string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();

        //        string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
        //        string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
        //        string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
        //        string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();


        //        string json = bul.get_order_invoice_list(like_str,
        //                oi_rec_or_pay,
        //                oi_c_id,
        //                oi_cu_id, 
        //                oi_total_money,
        //                page,
        //                rows,
        //                sort,
        //                ordersort);

        //        res.Write(json);
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        public void get_order_invoice_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string oi_rec_or_pay = req.Params["oi_rec_or_pay"] == null ? string.Empty : req.Params["oi_rec_or_pay"].ToString();
                string oi_c_id = Session["cpy_id"].ToString();
                string oi_cu_id = req.Params["oi_cu_id"] == null ? string.Empty : req.Params["oi_cu_id"].ToString();
                string oi_total_money = req.Params["oi_total_money"] == null ? string.Empty : req.Params["oi_total_money"].ToString();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string oi_beg_dat = req.Params["oi_beg_dat"] == null ? string.Empty : req.Params["oi_beg_dat"].ToString();
                string oi_end_dat = req.Params["oi_end_dat"] == null ? string.Empty : req.Params["oi_end_dat"].ToString();

                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();


                string json = bul.get_order_invoice_list(like_str,
                        oi_rec_or_pay,
                        oi_c_id,
                        oi_cu_id,
                        oi_total_money,
                        oi_beg_dat,
                        oi_end_dat,
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
        //根据销账记录获取费用销账明细
        public void get_order_fee_and_invoice_files_by_oi_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                string oi_seq = req.Params["oi_seq"] == null ? string.Empty : req.Params["oi_seq"].ToString();


                string json = bul.get_order_fee_and_invoice_files_by_oi_seq(oi_seq);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #region 更改销账备注
        public void update_oi_bak(HttpRequest req, HttpResponse res)
        {
            try
            {
                string oi_bak = req.Params["oi_bak"] == null ? string.Empty : req.Params["oi_bak"].ToString();
                string oi_seq = req.Params["oi_seq"] == null ? string.Empty : req.Params["oi_seq"].ToString();

                string json = bul.update_oi_bak(oi_seq, oi_bak);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion
        #endregion

        #region 销账记录
        //判断，新增 
        public void bat_judge_fee_finace_by_fee_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                string json_fee_details = req.Params["json_fee_details"] == null ? string.Empty : req.Params["json_fee_details"].ToString();
                string woa_record_id = Session["u_id"].ToString();
                string woa_c_id = Session["cpy_id"].ToString();
                string woa_cu_id = req.Params["woa_cu_id"] == null ? string.Empty : req.Params["woa_cu_id"].ToString();
                string woa_rec_or_pay = req.Params["woa_rec_or_pay"] == null ? string.Empty : req.Params["woa_rec_or_pay"].ToString();
                string woa_bank_dat = req.Params["woa_bank_dat"] == null ? string.Empty : req.Params["woa_bank_dat"].ToString();
                string woa_bak = req.Params["woa_bak"] == null ? string.Empty : req.Params["woa_bak"].ToString();
                string woa_typ = req.Params["woa_typ"] == null ? string.Empty : req.Params["woa_typ"].ToString();

                string json = bul.bat_judge_fee_finace_by_fee_seq(woa_record_id,
                    woa_cu_id,
                    woa_c_id, 
                    woa_rec_or_pay,
                    woa_bank_dat,
                    woa_bak,
                    woa_typ, 
                    json_fee_details);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
         
        //查询销账记录
        public void get_write_off_accounts_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string c_id = Session["cpy_id"].ToString();
                string cu_id = req.Params["cu_id"] == null ? string.Empty : req.Params["cu_id"].ToString();
                string year = req.Params["year"] == null ? string.Empty : req.Params["year"].ToString();
                string month = req.Params["month"] == null ? string.Empty : req.Params["month"].ToString();
                string money = req.Params["money"] == null ? string.Empty : req.Params["money"].ToString();
                string woa_record_id = req.Params["woa_record_id"] == null ? string.Empty : req.Params["woa_record_id"].ToString();
                
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();


                string json = bul.get_write_off_accounts_list(rec_or_pay,
                        c_id,
                        cu_id,
                        year,
                        month,
                        money,
                        woa_record_id,
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
        //根据销账记录获取费用销账明细
        public void get_order_fee_by_woa_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                string woa_seq = req.Params["woa_seq"] == null ? string.Empty : req.Params["woa_seq"].ToString();


                string json = bul.get_order_fee_by_woa_seq(woa_seq);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //根据单个费用 获取费用的销账记录
        public void get_write_off_accounts_details_by_fee_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fee_seq = req.Params["fee_seq"] == null ? string.Empty : req.Params["fee_seq"].ToString();


                string json = bul.get_write_off_accounts_details_by_fee_seq(fee_seq);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
         
        #endregion 

        
        #region 销账情况
        public void flag_fee_finace_by_fee_seqs(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();
                string cur_opr_id = Session["u_id"].ToString();
             
                string json = bul.flag_fee_finace_by_fee_seqs(fee_seqs, cur_opr_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }



        public void unflag_fee_finace_by_fee_seqs(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();

                string json = bul.unflag_fee_finace_by_fee_seqs(fee_seqs);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 更改销账备注
        public void update_woa_bak(HttpRequest req, HttpResponse res)
        {
            try
            {
                string woa_bak = req.Params["woa_bak"] == null ? string.Empty : req.Params["woa_bak"].ToString();
                string woa_seq = req.Params["woa_seq"] == null ? string.Empty : req.Params["woa_seq"].ToString();

                string json = bul.update_woa_bak(woa_seq, woa_bak);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
         
        #endregion
        #endregion

        #region 提交账单审核
        public void post_pay_checkaccount(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ap_u_id = req.Params["ap_u_id"] == null ? string.Empty : req.Params["ap_u_id"].ToString();
                string aps_order_by_id = req.Params["aps_order_by_id"] == null ? string.Empty : req.Params["aps_order_by_id"].ToString();
                string aps_id = req.Params["aps_id"] == null ? string.Empty : req.Params["aps_id"].ToString();
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
                string post_by_id = Session["u_id"].ToString();
                string ba_desc = req.Params["ba_desc"] == null ? string.Empty : req.Params["ba_desc"].ToString();
                string ba_pay_typ = req.Params["ba_pay_typ"] == null ? string.Empty : req.Params["ba_pay_typ"].ToString();
                string ba_pay_dat = req.Params["ba_pay_dat"] == null ? string.Empty : req.Params["ba_pay_dat"].ToString();
                string amc_bak = req.Params["amc_bak"] == null ? string.Empty : req.Params["amc_bak"].ToString();
                string json = bul.post_pay_checkaccount(
                 ca_seq,
                 post_by_id,
                 ap_u_id,
                 aps_order_by_id,
                 aps_id,
                 ba_desc,
                 ba_pay_typ,
                 ba_pay_dat,
                 amc_bak);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        #endregion


        #region 对冲销账 

        #region  新建
        #endregion 

        public void insert_hedge_off_accounts_record(HttpRequest req, HttpResponse res)
        {
            try
            {
                string hoa_cu_id = req.Params["hoa_cu_id"] == null ? string.Empty : req.Params["hoa_cu_id"].ToString();
                string hoa_c_id = Session["cpy_id"].ToString();

                string hoa_title = req.Params["hoa_title"] == null ? string.Empty : req.Params["hoa_title"].ToString();
                
                string hoa_bak = req.Params["hoa_bak"] == null ? string.Empty : req.Params["hoa_bak"].ToString();
                string hoa_record_id = Session["u_id"].ToString();


                string json = bul.insert_hedge_off_accounts_record(hoa_cu_id,
                    hoa_c_id,
                    hoa_record_id,
                    hoa_bak,
                    hoa_title);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 插入费用
        public void insert_hedge_off_accounts_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                string hoa_seq = req.Params["hoa_seq"] == null ? string.Empty : req.Params["hoa_seq"].ToString();
                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();
 
                string json = bul.insert_hedge_off_accounts_details(hoa_seq,
                    fee_seqs );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 移除费用
        public void delete_hedge_off_accounts_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                string hoa_seq = req.Params["hoa_seq"] == null ? string.Empty : req.Params["hoa_seq"].ToString();
                string fee_seqs = req.Params["fee_seqs"] == null ? string.Empty : req.Params["fee_seqs"].ToString();

                string json = bul.delete_hedge_off_accounts_details(hoa_seq,
                    fee_seqs );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 删除对冲计划
        public void delete_hedge_off_accounts_record(HttpRequest req, HttpResponse res)
        {
            try
            {
                string hoa_seq = req.Params["hoa_seq"] == null ? string.Empty : req.Params["hoa_seq"].ToString();

 
                string json = bul.delete_hedge_off_accounts_record(hoa_seq);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        #region 获取对冲计划 
        public void get_hedge_off_accounts_record(HttpRequest req, HttpResponse res)
        {
            try
            {
                string hoa_c_id = Session["cpy_id"].ToString();
                
                string hoa_cu_id = req.Params["hoa_cu_id"] == null ? string.Empty : req.Params["hoa_cu_id"].ToString();
                string hoa_bank_dat_begin = req.Params["hoa_bank_dat_begin"] == null ? string.Empty : req.Params["hoa_bank_dat_begin"].ToString();
                string hoa_bank_dat_end = req.Params["hoa_bank_dat_end"] == null ? string.Empty : req.Params["hoa_bank_dat_end"].ToString();
                string hoa_record_dat_begin = req.Params["hoa_record_dat_begin"] == null ? string.Empty : req.Params["hoa_record_dat_begin"].ToString();
                string hoa_record_dat_end = req.Params["hoa_record_dat_end"] == null ? string.Empty : req.Params["hoa_record_dat_end"].ToString();
                string hoa_record_id = req.Params["hoa_record_id"] == null ? string.Empty : req.Params["hoa_record_id"].ToString();
                string amc_status = req.Params["amc_status"] == null ? string.Empty : req.Params["amc_status"].ToString();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string hoa_status = req.Params["hoa_status"] == null ? string.Empty : req.Params["hoa_status"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();


                string json = bul.get_hedge_off_accounts_record(like_str,
                    hoa_cu_id,
                    hoa_c_id,
                    hoa_bank_dat_begin,
                    hoa_bank_dat_end,
                    hoa_record_dat_begin,
                    hoa_record_dat_end,
                    hoa_record_id,
                    hoa_status,
                    amc_status,
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

        public void get_hedge_off_accounts_record_no_page(HttpRequest req, HttpResponse res)
        {
            try
            {
                string hoa_c_id = Session["cpy_id"].ToString(); 
                 
                string hoa_cu_id = req.Params["hoa_cu_id"] == null ? string.Empty : req.Params["hoa_cu_id"].ToString();


                string json = bul.get_hedge_off_accounts_record_no_page(hoa_cu_id,
                    hoa_c_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void get_hedge_off_accounts_record_single(HttpRequest req, HttpResponse res)
        {
            try
            {

                string hoa_seq = req.Params["hoa_seq"] == null ? string.Empty : req.Params["hoa_seq"].ToString();

                string u_id = Session["u_id"].ToString();
                string json = bul.get_hedge_off_accounts_record_single(
                    hoa_seq,
                    u_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 提交账单审核
        public void post_hedge_off_accounts(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ap_u_id = req.Params["ap_u_id"] == null ? string.Empty : req.Params["ap_u_id"].ToString();
                string aps_order_by_id = req.Params["aps_order_by_id"] == null ? string.Empty : req.Params["aps_order_by_id"].ToString();
                string aps_id = req.Params["aps_id"] == null ? string.Empty : req.Params["aps_id"].ToString();
                string hoa_seq = req.Params["hoa_seq"] == null ? string.Empty : req.Params["hoa_seq"].ToString();
                string post_by_id = Session["u_id"].ToString();

                string json = bul.post_hedge_off_accounts(
                 hoa_seq,
                 post_by_id,
                 ap_u_id,
                 aps_order_by_id,
                 aps_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 返回是否有负账业务
        public void pre_post_test_of_loss(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
             
                string json = bul.pre_post_test_of_loss(
                 ca_seq);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 标记对冲计划完成 
        public void flag_hedge_off_accounts_finace_by_hoa_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                string hoa_seq = req.Params["hoa_seq"] == null ? string.Empty : req.Params["hoa_seq"].ToString();
                string woa_bank_dat = req.Params["woa_bank_dat"] == null ? string.Empty : req.Params["woa_bank_dat"].ToString();
                string woa_bak = req.Params["woa_bak"] == null ? string.Empty : req.Params["woa_bak"].ToString();
                string woa_cu_id = req.Params["woa_cu_id"] == null ? string.Empty : req.Params["woa_cu_id"].ToString();
                string woa_record_id = Session["u_id"].ToString();
                string woa_c_id = Session["cpy_id"].ToString();

                string json = bul.flag_hedge_off_accounts_finace_by_hoa_seq(
                    hoa_seq,
                    woa_bank_dat,
                    woa_bak,
                    woa_record_id,
                    woa_cu_id,
                    woa_c_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 专注模式
        #region 所有未归账的费用汇总
        public void get_group_order_fee_of_nonca_for_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString(); 
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                //string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();

                string json = bul.get_group_order_fee_of_nonca_for_bus(c_id, 
                    rec_or_pay);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 所有未归账的费用明细
        public void get_details_order_fee_of_nonca_for_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString(); 
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string cu_id = req.Params["cu_id"] == null ? string.Empty : req.Params["cu_id"].ToString();

                string json = bul.get_details_order_fee_of_nonca_for_bus(c_id, 
                    rec_or_pay,
                    cu_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #region 更新对账单
        public void update_main_list_for_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_title = req.Params["ca_title"] == null ? string.Empty : req.Params["ca_title"].ToString();


                string ca_group_flag = req.Params["ca_group_flag"] == null ? string.Empty : req.Params["ca_group_flag"].ToString();

                string ca_year = req.Params["ca_year"] == null ? string.Empty : req.Params["ca_year"].ToString();
                string ca_month = req.Params["ca_month"] == null ? string.Empty : req.Params["ca_month"].ToString();
                string ca_bak = req.Params["ca_bak"] == null ? string.Empty : req.Params["ca_bak"].ToString();
                string ca_create_by_id = Session["u_id"].ToString();
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString(); ;
                string ca_limit_dat = req.Params["ca_limit_dat"] == null ? string.Empty : req.Params["ca_limit_dat"].ToString();
                string ca_assign_flag = req.Params["ca_assign_flag"] == null ? string.Empty : req.Params["ca_assign_flag"].ToString();
                string u_ids = req.Params["u_ids"] == null ? string.Empty : req.Params["u_ids"].ToString();
                string data_attachment = req.Params["data_attachment"] == null ? string.Empty : req.Params["data_attachment"].ToString();

                string json = bul.update_main_list_for_bus(ca_title,
                    ca_group_flag,
                    ca_year,
                    ca_month,
                    ca_bak,
                    ca_create_by_id,
                    ca_seq,
                    ca_limit_dat,
                    ca_assign_flag,
                    u_ids,
                    data_attachment);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void update_main_list_simple_for_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_title = req.Params["ca_title"] == null ? string.Empty : req.Params["ca_title"].ToString();


                string ca_bak = req.Params["ca_bak"] == null ? string.Empty : req.Params["ca_bak"].ToString();
                string u_id = Session["u_id"].ToString();
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString(); ;
                string ca_cu_id = req.Params["ca_cu_id"] == null ? string.Empty : req.Params["ca_cu_id"].ToString();


                string json = bul.update_main_list_simple_for_bus(ca_title,
                    ca_bak,
                    ca_cu_id,
                    u_id,
                    ca_seq);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 发票模糊查询
        public void get_order_invoice_by_like_str_for_combogrid(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'", "''"); ;
                string oi_cu_id = req.Params["oi_cu_id"] == null ? string.Empty : req.Params["oi_cu_id"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();

                string json = bul.get_order_invoice_by_like_str_for_combogrid(like_str,
                    c_id,
                    oi_cu_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("checkaccount.get_order_invoice_by_like_str_for_combogrid",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #endregion 

        #region 根据发票编号，获取发票图片
        //根据销账记录获取费用销账明细
        public void get_order_fee_by_oi_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                string oi_seq = req.Params["oi_seq"] == null ? string.Empty : req.Params["oi_seq"].ToString();


                string json = bul.get_order_fee_by_oi_seq(oi_seq);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void get_order_invoice_file(HttpRequest req, HttpResponse res)
        {
            try
            {
                string oi_seq = req.Params["oi_seq"] == null ? string.Empty : req.Params["oi_seq"].ToString().Replace("'", "''"); ;


                string json = bul.get_order_invoice_file(oi_seq);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("checkaccount.get_order_invoice_file",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #endregion 

        #region 发票上传
        public void insert_order_invoice_file(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string file_record_id = Session["u_id"].ToString();

                string mode = req.Params["mode"] == null ? string.Empty : req.Params["mode"].ToString();
                string file_nam = string.Empty;
                string file_path = string.Empty;

                string guid = System.Guid.NewGuid().ToString().Replace("-", "");
                string folder = "/upload_files/invoice/";
                string virtual_path = string.Empty;
                bool isRight = true;

                if (mode.Equals("pic"))
                {
                    file_nam = DateTime.Now.ToString("yyyyMMddHHmmss")  ; 
                        //req.Params["pic_name"] == null ? string.Empty : req.Params["pic_name"]; 
                    string base64str = req.Params["pic"]; 
                    base64str = base64str.Split(',')[1];
                    var btsdata = Convert.FromBase64String(base64str);
                    file_path = System.Web.HttpContext.Current.Server.MapPath(folder) + guid + Path.GetExtension(file_nam) + ".jpg";
                    virtual_path = folder + guid + Path.GetExtension(file_nam) + ".jpg";
                    System.IO.MemoryStream stream = new System.IO.MemoryStream(btsdata);
                    Bitmap bmp = new Bitmap(stream);
                    //bmp.Save(System.AppDomain.CurrentDomain.BaseDirectory + file_path, System.Drawing.Imaging.ImageFormat.Jpeg);
                    bmp.Save(file_path, System.Drawing.Imaging.ImageFormat.Jpeg);
                    stream.Close();
                }

                res.Write("{\"result\":1,\"oi_file_seq\":\"" + Guid.NewGuid().ToString() + "\",\"oi_filenam\":\"" + file_nam + "\",\"oi_filepath\":\"" + virtual_path + "\"}");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        #endregion 


        #region 根据审核号获取 审批相关信息 
        public void get_ap_checkaccount_single_full_collections(HttpRequest req, HttpResponse res)
        {
            try {

                string u_id = Session["u_id"].ToString();

                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();


                string json = bul.get_ap_checkaccount_single_full_collections(amc_id,
                    u_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 权限-是否可以在商务界面显示 销账按钮
        public void can_use_flag_finance_in_bus_page(HttpRequest req, HttpResponse res)
        {
            try
            {
                string u_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();

                string json = bul.can_use_flag_finance_in_bus_page(c_id, u_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        #region 下载 费用明细 
        public void download_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();

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
                string fee_limit_days_status = req.Params["fee_limit_days_status"] == null ? string.Empty : req.Params["fee_limit_days_status"].ToString();
                string fee_invoice_lock_flag = req.Params["fee_invoice_lock_flag"] == null ? string.Empty : req.Params["fee_invoice_lock_flag"].ToString();

                JObject data_item = bul.get_order_fee_all(c_id,
                    u_id,
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
                    fee_invoice_lock_flag  );

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
        public void download_details_order_fee_of_nonca_by_cu_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string cu_id = req.Params["cu_id"] == null ? string.Empty : req.Params["cu_id"].ToString();

                string json = bul.get_details_order_fee_of_nonca_by_cu_id(c_id,
                    u_id,
                    rec_or_pay,
                    cu_id);

                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

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
        public void download_details_order_fee_of_nonca_for_bus(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string cu_id = req.Params["cu_id"] == null ? string.Empty : req.Params["cu_id"].ToString();

                string json = bul.get_details_order_fee_of_nonca_for_bus(c_id,
                    rec_or_pay,
                    cu_id);

                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

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
                HSSFFont font_normal = wk.CreateFont() as HSSFFont;
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
                            row.CreateCell(0).SetCellValue((ja_data[i]["rownumber"] ?? (i + 1)).ToString());
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

        #region 过账且投递
        #region 过账获取信息 通过账单号和过账单位获取相应信息
        public void transfer_accountcheck(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_seq = req.Params["ca_seq"] == null ? string.Empty : req.Params["ca_seq"].ToString();
                string trans_c_id = req.Params["trans_c_id"] == null ? string.Empty : req.Params["trans_c_id"].ToString();
                 
                string trans_create_by_id = Session["u_id"].ToString();

                string json = bul.transfer_accountcheck(ca_seq, trans_c_id, trans_create_by_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 生成过账 全部过程
        public void create_transfer_ca(HttpRequest req, HttpResponse res)
        {
            try
            {
                string res_post_by_id = Session["u_id"].ToString();

                string c_id = Session["cpy_id"].ToString();


                string res_ca_seq = req.Params["res_ca_seq"] == null ? string.Empty : req.Params["res_ca_seq"].ToString();
                string od_delegate_cu_id = req.Params["od_delegate_cu_id"] == null ? string.Empty : req.Params["od_delegate_cu_id"].ToString();
                string od_record_by_id = req.Params["od_record_by_id"] == null ? string.Empty : req.Params["od_record_by_id"].ToString();
                string od_operation_id = req.Params["od_operation_id"] == null ? string.Empty : req.Params["od_operation_id"].ToString();
                string od_service_id = req.Params["od_service_id"] == null ? string.Empty : req.Params["od_service_id"].ToString();
                string od_sales_id = req.Params["od_sales_id"] == null ? string.Empty : req.Params["od_sales_id"].ToString();
                string od_bak_delegate = req.Params["od_bak_delegate"] == null ? string.Empty : req.Params["od_bak_delegate"].ToString();
                
                string od_record_by_company_id = req.Params["od_record_by_company_id"] == null ? string.Empty : req.Params["od_record_by_company_id"].ToString();
                //string od_service_cu_id = req.Params["od_service_cu_id"] == null ? string.Empty : req.Params["od_service_cu_id"].ToString();
                string pay_fee_cu_id = req.Params["pay_fee_cu_id"] == null ? string.Empty : req.Params["pay_fee_cu_id"].ToString();
                string pay_fee_cu_desc = req.Params["pay_fee_cu_desc"] == null ? string.Empty : req.Params["pay_fee_cu_desc"].ToString();
                string rec_fee_cu_id = req.Params["rec_fee_cu_id"] == null ? string.Empty : req.Params["rec_fee_cu_id"].ToString();
                string rec_fee_cu_desc = req.Params["rec_fee_cu_desc"] == null ? string.Empty : req.Params["rec_fee_cu_desc"].ToString();
                string res_ca_year = req.Params["res_ca_year"] == null ? string.Empty : req.Params["res_ca_year"].ToString();
                string res_ca_month = req.Params["res_ca_month"] == null ? string.Empty : req.Params["res_ca_month"].ToString();
                string res_n_ca_cu_id = req.Params["res_n_ca_cu_id"] == null ? string.Empty : req.Params["res_n_ca_cu_id"].ToString();
                string res_n_ca_title = req.Params["res_n_ca_title"] == null ? string.Empty : req.Params["res_n_ca_title"].ToString();
                string res_n_ca_bak = req.Params["res_n_ca_bak"] == null ? string.Empty : req.Params["res_n_ca_bak"].ToString();
                
                string data_fee = req.Params["data_fee"] == null ? string.Empty : req.Params["data_fee"].ToString();

                string od_service_cu_id = pay_fee_cu_id;


                string json = bul.create_transfer_ca(res_ca_seq,
                    od_delegate_cu_id,
                    od_record_by_id,
                    od_operation_id,
                    od_service_id,
                    od_sales_id,
                    od_bak_delegate,
                    od_record_by_company_id,
                    od_service_cu_id ,
                    pay_fee_cu_id,
                    pay_fee_cu_desc,
                    rec_fee_cu_id,
                    rec_fee_cu_desc,

                    res_ca_year,
                    res_ca_month,
                    res_n_ca_cu_id,
                    res_n_ca_title,
                    res_n_ca_bak , 
                    res_post_by_id,
                    /*费用*/
                    data_fee );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 判断是否可以删除，退回账单
        public void judge_giveback_checkaccount(HttpRequest req, HttpResponse res)
        {
            try
            {

                string u_id = Session["u_id"].ToString();

                string ca_seqs = req.Params["ca_seqs"] == null ? string.Empty : req.Params["ca_seqs"].ToString();


                string json = bul.judge_giveback_checkaccount(ca_seqs);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #endregion

        #region 订单统计
        #region 业务员自查
        public void get_group_details_of_operation_for_self(HttpRequest req, HttpResponse res)
        {
            try
            {

                string fee_beg_dat = req.Params["fee_beg_dat"] == null ? string.Empty : req.Params["fee_beg_dat"].ToString();
                string fee_end_dat = req.Params["fee_end_dat"] == null ? string.Empty : req.Params["fee_end_dat"].ToString();

                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();
                BLL.checkaccount.bll_check_account bll = new BLL.checkaccount.bll_check_account();


                string json = bll.get_group_details_of_operation(c_id,
                    u_id,
                    fee_beg_dat,
                    fee_end_dat);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 商务层以上查询
        public void get_group_details_of_operation_for_busi(HttpRequest req, HttpResponse res)
        {
            try
            {

                string fee_beg_dat = req.Params["fee_beg_dat"] == null ? string.Empty : req.Params["fee_beg_dat"].ToString();
                string fee_end_dat = req.Params["fee_end_dat"] == null ? string.Empty : req.Params["fee_end_dat"].ToString();

                string c_id = Session["cpy_id"].ToString();
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                BLL.checkaccount.bll_check_account bll = new BLL.checkaccount.bll_check_account();

                string json = bll.get_group_details_of_operation(c_id,
                    u_id,
                    fee_beg_dat,
                    fee_end_dat);
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