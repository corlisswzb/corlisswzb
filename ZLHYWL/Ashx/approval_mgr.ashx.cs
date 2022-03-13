using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using BLL.commone;

namespace ZLHYWL.Ashx
{
    /// <summary>
    /// approval_mgr 的摘要说明
    /// </summary>
    public class approval_mgr : IHttpHandler, IRequiresSessionState
    {
        HttpSessionState Session = null;

        BLL.approval.approval_mgr bul_approval = null;
        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;
            Session = context.Session;
            bul_approval = new BLL.approval.approval_mgr();
            if (Session["u_id"] == null)
            {
                res.Write("{\"sessionerror\":1}");

            }
            string ACTION = req.Params["action"] == null ? string.Empty : req.Params["action"].ToString();
            switch (ACTION)
            {
                #region 审批 框架
                case "get_approval_typ":
                    {
                        get_approval_typ(req, res);
                    }
                    break;
                  
                case "get_company_only":
                    {
                        get_company_only(req,res);
                    }
                    break;
                case "insert_schema":
                    {
                        insert_schema(req, res);
                    }
                    break;
                case "delete_schema":
                    {
                        delete_schema(req, res);
                    }
                    break;
                case "order_schema":
                    {
                        order_schema(req, res);
                    }
                    break;
                case "insert_schema_employe_relation":
                    {
                        insert_schema_employe_relation(req, res);
                    }
                    break;
                case "delete_schema_employe_relation":
                    {
                        delete_schema_employe_relation(req, res);
                    }
                    break;
                case "get_schema_list":
                    {
                        get_schema_list(req, res);
                    }
                    break;
                case "get_schema_employe_relation":
                    {
                        get_schema_employe_relation(req, res);
                    }
                    break;
                #endregion

                #region 审批管理
                case "get_start_schema_point":
                    {
                        get_start_schema_point(req, res);
                    }
                    break;
                case "get_my_request_amc_page":
                    {
                        get_my_request_amc_page(req, res);
                    }
                    break;
                case "get_full_order_list":
                    {
                        get_full_order_list(req, res);
                    }
                    break;
                case "get_full_checkaccount_list":
                    {
                        get_full_checkaccount_list(req, res);
                    }
                    break;
                case "get_full_order_change_list":
                    {
                        get_full_order_change_list(req, res);
                    }
                    break;  
                case "get_full_hedge_off_accounts_list":
                    {
                        get_full_hedge_off_accounts_list(req, res);
                    }
                    break;
                case "get_my_approval_amc_page":
                    {
                        get_my_approval_amc_page(req, res);
                    }
                    break;
                case "get_single_amc":
                    {
                        get_single_amc(req, res);
                    }
                    break;
                case "repost_amc_pay_checkaccount":
                    {
                        repost_amc_pay_checkaccount(req, res);
                    }
                    break;
                case "repost_amc":
                    {
                        repost_amc(req, res);
                    }
                    break;
                case "delete_amc":
                    {
                        delete_amc(req, res);
                    }
                    break;
                case "giveother_amc":
                    {
                        giveother_amc(req, res);
                    }
                    break;
                case "giveback_amc":
                    {
                        giveback_amc(req, res);
                    }
                    break;
                case "giveback_to_create_amc":
                    {
                        giveback_to_create_amc(req, res);
                    }
                    break;
                case "givenext_amc":
                    {
                        givenext_amc(req, res);
                    }
                    break;
                case "get_amc_actual_flow_details":
                    {
                        get_amc_actual_flow_details(req, res);
                    }
                    break;
                case "set_amc_hurry":
                    {
                        set_amc_hurry(req, res);
                    }
                    break;
                case "get_include_ca_count_for_post_or_del":
                    {
                        get_include_ca_count_for_post_or_del(req, res);
                    }
                    break;
                #endregion

              
            }
        }
        #region 审批 框架

        #region 基础数据
        #region  获取审批 类别
        public void get_approval_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
              
                string json = bul_approval.get_approval_typ();
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.get_approval_typ",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion
         
        #region 获取所有公司 
        public void get_company_only(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.schema_cto.bul_schema_cto bul = new BLL.schema_cto.bul_schema_cto();

                string json = bul.get_company_only();
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.get_company_only",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion 
        #endregion

        #region 审批框架管理

        #region 新增审批节点
        public void insert_schema(HttpRequest req, HttpResponse res)
        {
            try
            {
                string apt_id = req.Params["apt_id"] == null ? string.Empty : req.Params["apt_id"].ToString();
       
                string aps_desc = req.Params["aps_desc"] == null ? string.Empty : req.Params["aps_desc"].ToString();
                string aps_create_id = Session["u_id"].ToString();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string json = bul_approval.insert_schema(aps_desc, apt_id,   aps_create_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.insert_schema",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 删除审批节点
        public void delete_schema(HttpRequest req, HttpResponse res)
        {
            try
            {
                string apt_id = req.Params["apt_id"] == null ? string.Empty : req.Params["apt_id"].ToString();
                
                string aps_id = req.Params["aps_id"] == null ? string.Empty : req.Params["aps_id"].ToString();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string json = bul_approval.delete_schema(aps_id, apt_id,  c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.delete_schema",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 审批节点调序
        public void order_schema(HttpRequest req, HttpResponse res)
        {
            try
            {
                string apt_id = req.Params["apt_id"] == null ? string.Empty : req.Params["apt_id"].ToString();
                 
                string aps_id = req.Params["aps_id"] == null ? string.Empty : req.Params["aps_id"].ToString();
                string step = req.Params["step"] == null ? string.Empty : req.Params["step"].ToString();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string json = bul_approval.order_schema(aps_id, step, apt_id,  c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.order_schema",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 审批节点人员新增
        public void insert_schema_employe_relation(HttpRequest req, HttpResponse res)
        {
            try
            {
                string aps_id = req.Params["aps_id"] == null ? string.Empty : req.Params["aps_id"].ToString();
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string json = bul_approval.insert_schema_employe_relation(aps_id, u_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.insert_schema_employe_relation",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 审批节点人员删除
        public void delete_schema_employe_relation(HttpRequest req, HttpResponse res)
        {
            try
            {
                string aps_id = req.Params["aps_id"] == null ? string.Empty : req.Params["aps_id"].ToString();
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string json = bul_approval.delete_schema_employe_relation(aps_id, u_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.delete_schema_employe_relation",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 获取审批节点列表
        public void get_schema_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string apt_id = req.Params["apt_id"] == null ? string.Empty : req.Params["apt_id"].ToString();
               
                string json = bul_approval.get_schema_list(apt_id,   c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.get_schema_list",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 获取审批节点人员列表
        public void get_schema_employe_relation(HttpRequest req, HttpResponse res)
        {
            try
            {
                string aps_id = req.Params["aps_id"] == null ? string.Empty : req.Params["aps_id"].ToString();
                string json = bul_approval.get_schema_employe_relation(aps_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.get_schema_employe_relation",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #endregion

        #endregion

        #region 审批管理
        #region 发起审批时获取节点
        public void get_start_schema_point(HttpRequest req, HttpResponse res)
        {
            try
            {
                string apt_id = req.Params["apt_id"] == null ? string.Empty : req.Params["apt_id"].ToString();
                
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();

                string json = bul_approval.get_start_schema_point(apt_id, c_id,u_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.get_start_schema_point",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 获取审批列表
        #region 审批主表 我发起的 分页
        public void get_my_request_amc_page(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_status = req.Params["amc_status"] == null ? string.Empty : req.Params["amc_status"].ToString();
                string like_amc_str = req.Params["like_amc_str"] == null ? string.Empty : req.Params["like_amc_str"].ToString();
                string relation_c_id = req.Params["relation_c_id"] == null ? string.Empty : req.Params["relation_c_id"].ToString();
                
                string apt_id = req.Params["apt_id"] == null ? string.Empty : req.Params["apt_id"].ToString();
                string amc_cur_opr_id = req.Params["amc_cur_opr_id"] == null ? string.Empty : req.Params["amc_cur_opr_id"].ToString();
                string amc_create_id = Session["u_id"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                string json = bul_approval.get_my_request_amc_page(amc_status,
                    like_amc_str,
                    relation_c_id,
                    apt_id, 
                    amc_cur_opr_id,
                    amc_create_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.get_my_request_amc_page",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 审批主表 我参与的 分页
        public void get_my_approval_amc_page(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_status = req.Params["amc_status"] == null ? string.Empty : req.Params["amc_status"].ToString();
                string like_amc_str = req.Params["like_amc_str"] == null ? string.Empty : req.Params["like_amc_str"].ToString();
                string relation_c_id = Session["cpy_id"].ToString(); //req.Params["relation_c_id"] == null ? string.Empty : req.Params["relation_c_id"].ToString();
                
                string apt_id = req.Params["apt_id"] == null ? string.Empty : req.Params["apt_id"].ToString();
                string amc_cur_opr_id = req.Params["amc_cur_opr_id"] == null ? string.Empty : req.Params["amc_cur_opr_id"].ToString();
                string only_my_step = req.Params["only_my_step"] == null ? string.Empty : req.Params["only_my_step"].ToString();
                string check_u_id = Session["u_id"].ToString();

                string amc_create_id = req.Params["amc_create_id"] == null ? string.Empty : req.Params["amc_create_id"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                string json = bul_approval.get_my_approval_amc_page(amc_status,
                    like_amc_str,
                    relation_c_id,
                    apt_id, 
                    amc_cur_opr_id,
                    amc_create_id,
                    only_my_step,
                    check_u_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.get_my_approval_amc_page",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #region 业务审核
        public void get_full_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string od_typ = req.Params["od_typ"] == null ? string.Empty : req.Params["od_typ"].ToString();
               
                string od_project_typ = req.Params["od_project_typ"] == null ? string.Empty : req.Params["od_project_typ"].ToString();
                string od_cargo_agent_cu_id = req.Params["od_cargo_agent_cu_id"] == null ? string.Empty : req.Params["od_cargo_agent_cu_id"].ToString();
                string od_delegate_cu_id = req.Params["od_delegate_cu_id"] == null ? string.Empty : req.Params["od_delegate_cu_id"].ToString();
                string od_box_typ_id = req.Params["od_box_typ_id"] == null ? string.Empty : req.Params["od_box_typ_id"].ToString();
                string od_beg_fee_dat = req.Params["od_beg_fee_dat"] == null ? string.Empty : req.Params["od_beg_fee_dat"].ToString();
                string od_end_fee_dat = req.Params["od_end_fee_dat"] == null ? string.Empty : req.Params["od_end_fee_dat"].ToString();
                string od_service_id = req.Params["od_service_id"] == null ? string.Empty : req.Params["od_service_id"].ToString();
                string od_record_by_company_id = req.Params["od_record_by_company_id"] == null ? string.Empty : req.Params["od_record_by_company_id"].ToString();
                string od_trade_typ_id = req.Params["od_trade_typ_id"] == null ? string.Empty : req.Params["od_trade_typ_id"].ToString();
                string only_my_step = req.Params["only_my_step"] == null ? string.Empty : req.Params["only_my_step"].ToString();
                string amc_status = req.Params["amc_status"] == null ? string.Empty : req.Params["amc_status"].ToString();
                string amc_cur_opr_id = req.Params["amc_cur_opr_id"] == null ? string.Empty : req.Params["amc_cur_opr_id"].ToString();
                string amc_create_id = req.Params["amc_create_id"] == null ? string.Empty : req.Params["amc_create_id"].ToString();

                string u_id = Session["u_id"].ToString();
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();



                string json = bul_approval.get_full_order_list(like_str,
                    od_typ, 
                    od_project_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_box_typ_id,
                    od_beg_fee_dat,
                    od_end_fee_dat,
                    od_service_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    u_id, 
                    only_my_step,
                    amc_status,
                    amc_cur_opr_id,
                    amc_create_id,
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

        #region 付款审核
        public void get_full_checkaccount_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string ca_cu_id = req.Params["ca_cu_id"] == null ? string.Empty : req.Params["ca_cu_id"].ToString();

                string ca_year = req.Params["ca_year"] == null ? string.Empty : req.Params["ca_year"].ToString();
                string ca_month = req.Params["ca_month"] == null ? string.Empty : req.Params["ca_month"].ToString();
                string ca_relation_c_id = req.Params["ca_relation_c_id"] == null ? string.Empty : req.Params["ca_relation_c_id"].ToString();
                string ca_create_by_id = req.Params["ca_create_by_id"] == null ? string.Empty : req.Params["ca_create_by_id"].ToString();
                string only_my_step = req.Params["only_my_step"] == null ? string.Empty : req.Params["only_my_step"].ToString();
                string amc_status = req.Params["amc_status"] == null ? string.Empty : req.Params["amc_status"].ToString();
                string amc_cur_opr_id = req.Params["amc_cur_opr_id"] == null ? string.Empty : req.Params["amc_cur_opr_id"].ToString();
                string amc_create_id = req.Params["amc_create_id"] == null ? string.Empty : req.Params["amc_create_id"].ToString();
                string amc_hurry_flag = req.Params["amc_hurry_flag"] == null ? string.Empty : req.Params["amc_hurry_flag"].ToString();
                string u_id = Session["u_id"].ToString();
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();



                string json = bul_approval.get_full_checkaccount_list(ca_cu_id,
                    ca_year,
                    ca_month,
                    ca_relation_c_id,
                    like_str,
                    ca_create_by_id,
                    u_id,
                    only_my_step,
                    amc_status,
                    amc_cur_opr_id,
                    amc_create_id,
                    amc_hurry_flag,
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

        public void get_include_ca_count_for_post_or_del(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();


                string json = bul_approval.get_include_ca_count_for_post_or_del(
                 amc_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 改单审核
        public void get_full_order_change_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string only_my_step = req.Params["only_my_step"] == null ? string.Empty : req.Params["only_my_step"].ToString();
                string amc_status = req.Params["amc_status"] == null ? string.Empty : req.Params["amc_status"].ToString();
                string co_status = req.Params["co_status"] == null ? string.Empty : req.Params["co_status"].ToString();
                string amc_cur_opr_id = req.Params["amc_cur_opr_id"] == null ? string.Empty : req.Params["amc_cur_opr_id"].ToString();
                string amc_create_id = req.Params["amc_create_id"] == null ? string.Empty : req.Params["amc_create_id"].ToString();
                string company_id = req.Params["company_id"] == null ? string.Empty : req.Params["company_id"].ToString();

                string u_id = Session["u_id"].ToString();
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["ordersort"] == null ? string.Empty : req.Params["ordersort"].ToString();

                string json = bul_approval.get_full_order_change_list(
                    like_str,
                    u_id,
                    only_my_step,
                    amc_status,
                    co_status,
                    amc_cur_opr_id,
                    amc_create_id,
                    company_id,
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

        #region 对冲计划
        public void get_full_hedge_off_accounts_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string hoa_cu_id = req.Params["hoa_cu_id"] == null ? string.Empty : req.Params["hoa_cu_id"].ToString();

                string hoa_bank_dat_begin = req.Params["hoa_bank_dat_begin"] == null ? string.Empty : req.Params["hoa_bank_dat_begin"].ToString();
                string hoa_bank_dat_end = req.Params["hoa_bank_dat_end"] == null ? string.Empty : req.Params["hoa_bank_dat_end"].ToString();
                string relation_c_id = req.Params["relation_c_id"] == null ? string.Empty : req.Params["relation_c_id"].ToString();
                string hoa_record_id = req.Params["hoa_record_id"] == null ? string.Empty : req.Params["hoa_record_id"].ToString();
                string only_my_step = req.Params["only_my_step"] == null ? string.Empty : req.Params["only_my_step"].ToString();
                string amc_status = req.Params["amc_status"] == null ? string.Empty : req.Params["amc_status"].ToString();
                string amc_cur_opr_id = req.Params["amc_cur_opr_id"] == null ? string.Empty : req.Params["amc_cur_opr_id"].ToString();
                string amc_create_id = req.Params["amc_create_id"] == null ? string.Empty : req.Params["amc_create_id"].ToString();

                string u_id = Session["u_id"].ToString();
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();



                string json = bul_approval.get_full_hedge_off_accounts_list(hoa_cu_id,
                    relation_c_id,
                    hoa_bank_dat_begin,
                    hoa_bank_dat_end,
                    like_str,
                    hoa_record_id,
                    u_id,
                    only_my_step,
                    amc_status,
                    amc_cur_opr_id,
                    amc_create_id,
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
        #endregion
        public void get_single_amc(HttpRequest req, HttpResponse res)
        {
            try
            {

                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();


                string json = bul_approval.get_single_amc(amc_id );
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.get_single_amc",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }


        #region 获取审批流程
        public void get_amc_actual_flow_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();

                string is_my_point = req.Params["is_my_point"] == null ? string.Empty : req.Params["is_my_point"].ToString();
                string check_u_id = Session["u_id"].ToString();

                string json = bul_approval.get_amc_actual_flow_details(amc_id);

                //如果 is_my_point = 1 还需要获取 下一级节点 

                int has_next = -1;
                string json_next = "[]";

                if (is_my_point.Equals("1"))
                {
                    json_next = bul_approval.get_next_amc_opr_info(amc_id, ref has_next);
                }
               

                //组成 
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("amc_actual_flow_details", json));
                lst.Add(new KeyValuePair<string, string>("next_amc_flag", has_next.ToString()));
                lst.Add(new KeyValuePair<string, string>("next_amc_opr_info", json_next));
                string return_json = BLL_commone.custom_convert_json(lst);
                res.Write(return_json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.get_amc_actual_flow_details",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }

        }
        #endregion 

         

        #endregion

        #region 重新发起
        public void repost_amc(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string ap_context = req.Params["ap_context"] == null ? string.Empty : req.Params["ap_context"].ToString();

                string json = bul_approval.repost_amc(amc_id,
                        ap_context);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.repost_amc",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        public void repost_amc_pay_checkaccount(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string ap_context = req.Params["ap_context"] == null ? string.Empty : req.Params["ap_context"].ToString();
                string ba_id = req.Params["ba_id"] == null ? string.Empty : req.Params["ba_id"].ToString();
                string json = bul_approval.repost_amc_pay_checkaccount(amc_id,
                        ap_context, ba_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.repost_amc_pay_checkaccount",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 撤销审核
        public void delete_amc(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string ap_context = req.Params["ap_context"] == null ? string.Empty : req.Params["ap_context"].ToString();
                string u_id = Session["u_id"].ToString();

                string json = bul_approval.delete_amc(amc_id,u_id,
                        ap_context);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.delete_amc",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 转发审核
        public void giveother_amc(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string amc_cur_opr_id = Session["u_id"].ToString();
                string amc_giveother_opr_id = req.Params["amc_giveother_opr_id"] == null ? string.Empty : req.Params["amc_giveother_opr_id"].ToString();
                string ap_context = req.Params["ap_context"] == null ? string.Empty : req.Params["ap_context"].ToString();

                string json = bul_approval.giveother_amc(amc_id,
                    amc_cur_opr_id,
                    amc_giveother_opr_id,
                        ap_context);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.giveother_amc",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 退回上一步审核
        public void giveback_amc(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string amc_cur_opr_id = Session["u_id"].ToString();
                string ap_context = req.Params["ap_context"] == null ? string.Empty : req.Params["ap_context"].ToString();

                string json = bul_approval.giveback_amc(amc_id,
                    amc_cur_opr_id,
                        ap_context);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.giveback_amc",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 退回发起者
        public void giveback_to_create_amc(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string amc_cur_opr_id = Session["u_id"].ToString();
                string ap_context = req.Params["ap_context"] == null ? string.Empty : req.Params["ap_context"].ToString();

                string json = bul_approval.giveback_to_create_amc(amc_id,
                    amc_cur_opr_id,
                        ap_context);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.giveback_to_create_amc",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 同意并下一步
        public void givenext_amc(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string amc_cur_opr_id = Session["u_id"].ToString();
                string amc_next_opr_id = req.Params["amc_next_opr_id"] == null ? string.Empty : req.Params["amc_next_opr_id"].ToString();
                string amc_next_step = req.Params["amc_next_step"] == null ? string.Empty : req.Params["amc_next_step"].ToString();
                string ap_context = req.Params["ap_context"] == null ? string.Empty : req.Params["ap_context"].ToString();
                string json = bul_approval.givenext_amc(amc_id,
                    amc_cur_opr_id,
                    amc_next_opr_id,
                    amc_next_step,
                        ap_context);
                res.Write(json);
            }
            catch (Exception e)
            { 
                BLL.commone.mylog.writelog("approval.givenext_amc",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 加急
        public void set_amc_hurry(HttpRequest req, HttpResponse res)
        {
            try
            {
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                
                string json = bul_approval.set_amc_hurry(amc_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("approval.set_amc_hurry",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
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