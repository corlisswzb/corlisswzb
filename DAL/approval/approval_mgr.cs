using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;

namespace DAL.approval
{
    public class approval_mgr
    {
        msSqlHelper ms = null;

        public approval_mgr()
        {

            ms = new msSqlHelper();

        }

        #region 审批 框架

        #region 基础数据
        #region  获取审批 类别
        public DataTable get_approval_typ()
        {
            try
            {
                List<SqlParameter> lst_in = null;
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_approval_typ", lst_in, ref lst_out);
                return dt;
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
        public bool insert_schema(
            string aps_desc,
            string apt_id,
            string aps_create_id,
            string c_id,
            ref string aps_id
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@aps_desc", aps_desc));
                lst_in.Add(new SqlParameter("@apt_id", apt_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@aps_create_id", aps_create_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@aps_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_insert_schema", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                aps_id = lst_out[1].Value.ToString();

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除审批节点
        public bool delete_schema(
            string aps_id
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@aps_id", aps_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_delete_schema", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批节点调序
        public bool order_schema(
            string aps_id,
            string step
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@aps_id", aps_id));
                lst_in.Add(new SqlParameter("@step", step));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_order_schema", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批节点人员新增
        public bool insert_schema_employe_relation(
            string aps_id,
            string u_id
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@aps_id", aps_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_insert_schema_employe_relation", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批节点人员删除
        public bool delete_schema_employe_relation(
            string aps_id,
            string u_id
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@aps_id", aps_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_delete_schema_employe_relation", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取审批节点列表
        public DataTable get_schema_list(string apt_id,
            string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@apt_id", apt_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_schema_list", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 获取审批节点人员列表
        public DataTable get_schema_employe_relation(string aps_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@aps_id", aps_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_schema_employe_relation", lst_in, ref lst_out);
                return dt;
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
        public DataTable get_start_schema_point(
             string apt_id,
             string c_id,
             string u_id
          )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@apt_id", apt_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_start_schema_point", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取审批列表
        #region 审批主表 我发起的 分页
        public DataTable get_my_request_amc_page(
            string amc_status,
            string like_amc_str,
            string relation_c_id,
            string apt_id,
            string amc_cur_opr_id,
            string amc_create_id,
            string page,
            string rows,
            string sort,
            string ordersort,
            ref int rowcount
        )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_status", amc_status));
                lst_in.Add(new SqlParameter("@like_amc_str", like_amc_str));
                lst_in.Add(new SqlParameter("@relation_c_id", relation_c_id));
                lst_in.Add(new SqlParameter("@apt_id", apt_id));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));
                lst_in.Add(new SqlParameter("@amc_create_id", amc_create_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_my_request_amc_page", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批主表 我参与的 分页
        public DataTable get_my_approval_amc_page(
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
            string ordersort,
            ref int rowcount
        )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_status", amc_status));
                lst_in.Add(new SqlParameter("@like_amc_str", like_amc_str));
                lst_in.Add(new SqlParameter("@relation_c_id", relation_c_id));
                lst_in.Add(new SqlParameter("@apt_id", apt_id));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));
                lst_in.Add(new SqlParameter("@amc_create_id", amc_create_id));
                lst_in.Add(new SqlParameter("@only_my_step", only_my_step));
                lst_in.Add(new SqlParameter("@check_u_id", check_u_id));

                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_my_approval_amc_page", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 审批流程
        public DataTable get_amc_actual_flow_details(
            string amc_id
        )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));

                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_amc_actual_flow_details", lst_in, ref lst_out);

                return dt;
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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@relation_no",SqlDbType.NVarChar,2000);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_amc_actual_flow_details_for_print", lst_in, ref lst_out);
                relation_no = lst_out[0].Value.ToString();

                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #region 转发审核
        public bool giveother_amc(
            string amc_id,
            string amc_cur_opr_id,
            string amc_giveother_opr_id,
            string ap_context
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));
                lst_in.Add(new SqlParameter("@amc_giveother_opr_id", amc_giveother_opr_id));
                lst_in.Add(new SqlParameter("@ap_context", ap_context));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_giveother_amc", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 退回上一步审核
        public bool giveback_amc(
            string amc_id,
            string amc_cur_opr_id,
            string ap_context
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));

                lst_in.Add(new SqlParameter("@ap_context", ap_context));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_giveback_amc", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 退回发起者
        public bool giveback_to_create_amc(
            string amc_id,
            string amc_cur_opr_id,
            string ap_context
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));

                lst_in.Add(new SqlParameter("@ap_context", ap_context));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_giveback_to_create_amc", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 同意并下一步
        public bool givenext_amc(
            string amc_id,
            string amc_cur_opr_id,
            string amc_next_opr_id,
            string amc_next_step,
            string ap_context
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));
                lst_in.Add(new SqlParameter("@amc_next_opr_id", amc_next_opr_id));
                lst_in.Add(new SqlParameter("@amc_next_step", amc_next_step));
                lst_in.Add(new SqlParameter("@ap_context", ap_context));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_givenext_amc", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 重新发起
        public bool repost_amc(
            string amc_id,
            string ap_context
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));

                lst_in.Add(new SqlParameter("@ap_context", ap_context));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_repost_amc", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool repost_amc_pay_checkaccount(
            string amc_id,
            string ap_context,
            string ba_id
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@ba_id", ba_id));
                lst_in.Add(new SqlParameter("@ap_context", ap_context));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_repost_amc_pay_checkaccount", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
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
        public DataTable get_next_amc_opr_info(
          string amc_id,
          ref int result
          )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_next_amc_opr_info", lst_in, ref lst_out);
                result = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 撤销审核
        public DataTable delete_amc(
            string amc_id,
            string u_id,
            string ap_context,
            ref bool result
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
               
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
 

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_delete_amc", lst_in, ref lst_out);
                int b = Convert.ToInt32(lst_out[0].Value);
                
                if (1 == b)
                {
                    result = true;
                }
                else
                {
                    result = false;
                }

                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 加急
        public bool set_amc_hurry(
            string amc_id  
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
               
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_set_amc_hurry", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                
                if (1 == result)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 获取 amc_id影响的账单数量 
        public int get_include_ca_count_for_post_or_del(
            string amc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@rowscount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                ms.excuteStoredProcedureData("_ap_p_get_include_ca_count_for_post_or_del", lst_in, ref lst_out);
                int rowscount = Convert.ToInt32(lst_out[0].Value);

                return rowscount;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        #region 获取单个审批
        public DataTable  get_single_amc(string amc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id)); 
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_single_amc", lst_in, ref lst_out);
                 
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
        #endregion

        #region 集运



        #region 获取审批列表
        #region 业务审核
        #region 分页查询
        public DataTable get_full_order_list(string like_str,
           string od_typ,
            //string od_status_id,
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
           string ordersort,
           ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@od_typ", od_typ));
                //lst_in.Add(new SqlParameter("@od_status_id", od_status_id));
                lst_in.Add(new SqlParameter("@od_project_typ", od_project_typ));
                lst_in.Add(new SqlParameter("@od_cargo_agent_cu_id", od_cargo_agent_cu_id));
                lst_in.Add(new SqlParameter("@od_delegate_cu_id", od_delegate_cu_id));
                lst_in.Add(new SqlParameter("@od_box_typ_id", od_box_typ_id));
                lst_in.Add(new SqlParameter("@od_beg_fee_dat", od_beg_fee_dat));
                lst_in.Add(new SqlParameter("@od_end_fee_dat", od_end_fee_dat));
                lst_in.Add(new SqlParameter("@od_service_id", od_service_id));

                lst_in.Add(new SqlParameter("@od_record_by_company_id", od_record_by_company_id));
                lst_in.Add(new SqlParameter("@od_trade_typ_id", od_trade_typ_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@only_my_step", only_my_step));
                lst_in.Add(new SqlParameter("@amc_status", amc_status));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));
                lst_in.Add(new SqlParameter("@amc_create_id", amc_create_id));

                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_full_order_list", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);

                return dt;

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
        public DataTable get_full_checkaccount_list(
            string ca_cu_id,
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
            string ordersort,
            ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id));
                lst_in.Add(new SqlParameter("@ca_year", ca_year));
                lst_in.Add(new SqlParameter("@ca_month", ca_month));
                lst_in.Add(new SqlParameter("@relation_c_id", ca_relation_c_id));
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@ca_create_by_id", ca_create_by_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@only_my_step", only_my_step));
                lst_in.Add(new SqlParameter("@amc_status", amc_status));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));
                lst_in.Add(new SqlParameter("@amc_create_id", amc_create_id));
                lst_in.Add(new SqlParameter("@amc_hurry_flag", amc_hurry_flag));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_full_pay_checkaccount_list", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);

                return dt;

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
        public DataTable get_full_order_change_list(
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
            string ordersort,
            ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@only_my_step", only_my_step));
                lst_in.Add(new SqlParameter("@amc_status", amc_status));
                lst_in.Add(new SqlParameter("@co_status", co_status));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));
                lst_in.Add(new SqlParameter("@amc_create_id", amc_create_id));
                lst_in.Add(new SqlParameter("@company_id", company_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_full_order_change_list", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);

                return dt;

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
        public DataTable get_full_hedge_off_accounts_list(
            string hoa_cu_id,
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
            string ordersort,
            ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hoa_cu_id", hoa_cu_id));
                lst_in.Add(new SqlParameter("@relation_c_id", relation_c_id));
                lst_in.Add(new SqlParameter("@hoa_bank_dat_begin", hoa_bank_dat_begin));
                lst_in.Add(new SqlParameter("@hoa_bank_dat_end", hoa_bank_dat_end));
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@hoa_record_id", hoa_record_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@only_my_step", only_my_step));
                lst_in.Add(new SqlParameter("@amc_status", amc_status));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));
                lst_in.Add(new SqlParameter("@amc_create_id", amc_create_id));

                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_full_hedge_off_accounts_list", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion
        #endregion


        #endregion


    }
}
