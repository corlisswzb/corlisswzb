using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace BLL.approval
{

    public class approval_mgr
    {
       
        DAL.approval.approval_mgr bal_approval = null;
        public approval_mgr()
        {
            bal_approval = new DAL.approval.approval_mgr();
        }

        #region 审批 框架

        #region 基础数据
        #region  获取审批 类别
        public string get_approval_typ()
        {
            try
            {
                DataTable dt = bal_approval.get_approval_typ();

                string json = BLL.commone.BLL_commone.data_convert_json(dt);

                return json;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }

        public string get_approval_typ_pub()
        {
            try
            {
                DataTable dt = bal_approval.get_approval_typ();

                string json = BLL.commone.BLL_commone.data_convert_jsonarray(dt);

                return json;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #endregion

        #region 审批框架管理

        #region 新增审批节点
        public string insert_schema(
            string aps_desc,
            string apt_id,
            string aps_create_id,
            string c_id
            )
        {
            try
            {
                string aps_id = string.Empty;
                bool b = bal_approval.insert_schema(aps_desc, apt_id, aps_create_id, c_id, ref aps_id);

                string json_ap_schema_list = BLL.commone.BLL_commone.data_convert_jsonarray(bal_approval.get_schema_list(apt_id, c_id));

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("aps_id", aps_id));
                lst.Add(new KeyValuePair<string, string>("ap_schema_list", json_ap_schema_list));
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增审批节点成功" : "未知原因，请联系管理员处理", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除审批节点
        public string delete_schema(
            string aps_id,
            string apt_id,
            string c_id
            )
        {
            try
            {
                bool b = bal_approval.delete_schema(aps_id);
                string json_ap_schema_list = BLL.commone.BLL_commone.data_convert_jsonarray(bal_approval.get_schema_list(apt_id, c_id));
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("ap_schema_list", json_ap_schema_list));
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除审批节点成功" : "未知原因，请联系管理员处理", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批节点调序
        public string order_schema(
            string aps_id,
            string step,
            string apt_id,
            string c_id
            )
        {
            try
            {
                bool b = bal_approval.order_schema(aps_id, step);
                string json_ap_schema_list = BLL.commone.BLL_commone.data_convert_jsonarray(bal_approval.get_schema_list(apt_id, c_id));
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("ap_schema_list", json_ap_schema_list));
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "调整审批节点成功" : "未知原因，请联系管理员处理", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批节点人员新增
        public string insert_schema_employe_relation(
            string aps_id,
            string u_id
            )
        {
            try
            {
                bool b = bal_approval.insert_schema_employe_relation(aps_id, u_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增审批节点人员成功" : "异常：同一节点不能反复添加同一人");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批节点人员删除
        public string delete_schema_employe_relation(
            string aps_id,
            string u_id
            )
        {
            try
            {
                bool b = bal_approval.delete_schema_employe_relation(aps_id, u_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除审批节点人员成功" : "未知原因，请联系管理员处理");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取审批节点列表
        public string get_schema_list(string apt_id,
            string c_id)
        {
            try
            {
                DataTable dt = bal_approval.get_schema_list(apt_id, c_id);

                string json = BLL.commone.BLL_commone.data_convert_json(dt);

                return json;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 获取审批节点人员列表
        public string get_schema_employe_relation(string aps_id)
        {
            try
            {
                DataTable dt = bal_approval.get_schema_employe_relation(aps_id);

                string json = BLL.commone.BLL_commone.data_convert_json(dt);

                return json;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #endregion

        #endregion

        #region 审批管理
        #region 发起审批的时候获取节点
        public string get_start_schema_point(
            string apt_id,
            string c_id,
            string u_id
          )
        {
            try
            {
                DataTable dt = bal_approval.get_start_schema_point(apt_id,
                    c_id,
                    u_id);

                string json = BLL.commone.BLL_commone.data_convert_jsonarray(dt);

                return json;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取审批列表
        #region 审批主表 我发起的 分页
        public string get_my_request_amc_page(
            string amc_status,
            string like_amc_str,
            string relation_c_id,
            string apt_id,
            string amc_cur_opr_id,
            string amc_create_id,
            string page,
            string rows,
            string sort,
            string ordersort
        )
        {
            try
            {
                int rowcount = 0;
                DataTable dt = bal_approval.get_my_request_amc_page(
                    amc_status,
                    like_amc_str,
                    relation_c_id,
                    apt_id,
                    amc_cur_opr_id,
                    amc_create_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批主表 我参与的 分页
        public string get_my_approval_amc_page(
            string amc_status,
            string like_amc_str,
            string relation_c_id,
            string apt_id,
            string amc_cur_opr_id,
            string amc_create_id,
            string only_my_step,
            string check_u_id,
            string page,
            string rows,
            string sort,
            string ordersort
        )
        {
            try
            {
                int rowcount = 0;
                DataTable dt = bal_approval.get_my_approval_amc_page(
                    amc_status,
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
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批流程
        public string get_amc_actual_flow_details(
            string amc_id
        )
        {
            try
            {
                DataTable dt = bal_approval.get_amc_actual_flow_details(amc_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_amc_actual_flow_details_for_print(
            string amc_id,
            ref string relation_no 
        )
        {
            try
            {
                DataTable dt = bal_approval.get_amc_actual_flow_details_for_print(amc_id, ref relation_no);
                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 获取单独一个审批
        public string get_single_amc(  string amc_id )
        {
            try
            {
                DataTable dt1 = bal_approval.get_single_amc(amc_id);

                string json1 =  BLL.commone.BLL_commone.data_convert_jsonarray(dt1);

                DataTable dt2 = bal_approval.get_amc_actual_flow_details(amc_id);
                string json2 = BLL.commone.BLL_commone.data_convert_jsonarray(dt2);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("amc_base", json1));
                lst.Add(new KeyValuePair<string, string>("amc_actual_flow_details", json2));
                return BLL.commone.BLL_commone.custom_convert_json(  lst);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
        #endregion

        #region 重新发起
        public string repost_amc(
            string amc_id,
            string ap_context
            )
        {
            try
            {
                bool b = bal_approval.repost_amc(amc_id, ap_context);
                if (b)
                {
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.reset); 
                }

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "重新发起成功" : "未知原因，请联系管理员处理");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string repost_amc_pay_checkaccount(
            string amc_id,
            string ap_context,
            string ba_id
            )
        {
            try
            {
                bool b = bal_approval.repost_amc_pay_checkaccount(amc_id, ap_context,ba_id);
                if (b)
                {
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.reset);
                }

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "重新发起成功" : "未知原因，请联系管理员处理");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 撤销审核
        public string delete_amc(
            string amc_id,
            string u_id,
            string ap_context
            )
        {
            try
            {


                bool result = false;

                DataTable dt = bal_approval.delete_amc(amc_id, u_id, ap_context, ref result);

                if (result)
                {
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        VX.MessageHelp mh = new VX.MessageHelp();
                        foreach (DataRow dr in dt.Rows)
                        {
                            string open_id = dr["u_qywx_id"].ToString();
                            string msg_content = dr["msg_content"].ToString();

                            mh.Post(open_id, "撤销审核提醒", msg_content, string.Empty);
                        }
                    } 
                }


                return BLL.commone.BLL_commone.result_convert_json(result ? 1 : 0,
                    result ? "撤销审核成功" : "错误: 审核不是你发起或审核已结束，无法撤销");
                 
                
                 
                

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 加急
        public string set_amc_hurry(
            string amc_id 
            )
        {
            try
            {
                
                bool b = bal_approval.set_amc_hurry(amc_id);

                if (b)
                {
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.alert);
                }

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "加急审核成功" : "错误: 审核不是你发起或审核已结束，无法撤销");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region amc_id影响的账单数量 
        public string get_include_ca_count_for_post_or_del(
            string amc_id)
        {
            try
            {
                int rowscount = bal_approval.get_include_ca_count_for_post_or_del(amc_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("effect_ca_count", rowscount.ToString()));

                return commone.BLL_commone.custom_convert_json(lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 转发审核
        public string giveother_amc(
            string amc_id,
            string amc_cur_opr_id,
            string amc_giveother_opr_id,
            string ap_context
            )
        {
            try
            {
                bool b = bal_approval.giveother_amc(amc_id, amc_cur_opr_id,
                    amc_giveother_opr_id,
                    ap_context);
                if (b)
                {
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.giveother);
                }
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "转审成功" : "未知原因，请联系管理员处理");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 退回上一步审核
        public string giveback_amc(
            string amc_id,
            string amc_cur_opr_id,
            string ap_context
            )
        {
            try
            {
                bool b = bal_approval.giveback_amc(amc_id, amc_cur_opr_id,
                    ap_context);

                if (b)
                {
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.goback);
                }
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "退回上一步成功" : "未知原因，请联系管理员处理");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 退回发起者
        public string giveback_to_create_amc(
            string amc_id,
            string amc_cur_opr_id,
            string ap_context
            )
        {
            try
            {
                bool b = bal_approval.giveback_to_create_amc(amc_id, amc_cur_opr_id,
                    ap_context);

                if (b)
                {
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.goback);
                }
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "退给申请人成功" : "未知原因，请联系管理员处理");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 同意并下一步
        public string givenext_amc(
            string amc_id,
            string amc_cur_opr_id,
            string amc_next_opr_id,
            string amc_next_step,
            string ap_context
            )
        {
            try
            {
                bool b = bal_approval.givenext_amc(amc_id, amc_cur_opr_id,
                    amc_next_opr_id,
                    amc_next_step,
                    ap_context);

                if (b)
                {
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.gonext);
                }
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "通过操作成功" : "未知原因，请联系管理员处理");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 同意并下一步时 获取下一节点信息
        /// <summary>
        /// 
        /// </summary>
        /// <param name="amc_id"></param>
        /// <param name="result"> 1 表示有节点， -1表示没有下一步 </param>
        /// <returns></returns>
        public string get_next_amc_opr_info(
          string amc_id,
            ref int result
          )
        {
            try
            {
                DataTable dt = bal_approval.get_next_amc_opr_info(amc_id, ref result);
                string json = BLL.commone.BLL_commone.data_convert_jsonarray(dt);

                return json;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 业务审核
        #region 分页查询
        public string get_full_order_list(string like_str,
            string od_typ,
            string od_project_typ,
            string od_cargo_agent_cu_id,
            string od_delegate_cu_id,
            string od_box_typ_id,
            string od_beg_fee_dat,
            string od_end_fee_dat,
            string od_service_id,
            string od_record_by_company_id,
            string od_trade_typ_id,
            string u_id,
            string only_my_step,
            string amc_status,
            string amc_cur_opr_id,
            string amc_create_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;

                DataTable dt = bal_approval.get_full_order_list(like_str,
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
                    ordersort,
                    ref rowcount);

                return commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 付款审核
        #region 分页查询
        public string get_full_checkaccount_list(string ca_cu_id,
            string ca_year,
            string ca_month,
            string ca_relation_c_id,
            string like_str,
            string ca_create_by_id,
            string u_id,
            string only_my_step,
            string amc_status,
            string amc_cur_opr_id,
            string amc_create_id,
            string amc_hurry_flag,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;

                DataTable dt = bal_approval.get_full_checkaccount_list(ca_cu_id,
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
                    ordersort,
                    ref rowcount);

                return commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 改单审核
        #region 分页查询
        public string get_full_order_change_list(
            string like_str,
            string u_id,
            string only_my_step,
            string amc_status,
            string co_status,
            string amc_cur_opr_id,
            string amc_create_id,
            string company_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;

                DataTable dt = bal_approval.get_full_order_change_list(
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
                    ordersort,
                    ref rowcount);

                return commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 对冲计划审核
        #region 分页查询
        public string get_full_hedge_off_accounts_list(string hoa_cu_id,
            string relation_c_id,
            string hoa_bank_dat_begin,
            string hoa_bank_dat_end,
            string like_str,
            string hoa_record_id,
            string u_id,
            string only_my_step,
            string amc_status,
            string amc_cur_opr_id,
            string amc_create_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;

                DataTable dt = bal_approval.get_full_hedge_off_accounts_list(hoa_cu_id,
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
                    ordersort,
                    ref rowcount);

                return commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion
    }
}
