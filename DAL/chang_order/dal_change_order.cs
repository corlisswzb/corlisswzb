using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;

namespace DAL.chang_order
{
    public class dal_change_order
    {
        msSqlHelper ms = null;
        public dal_change_order()
        {
            ms = new msSqlHelper();
        }

        #region 分页查询

        #region 费用明细
        public DataTable get_change_order_list(string od_status, string fee_status,
           string like_str,
           string fee_cu_id,
           string fee_item_typ,
           string rec_or_pay,
           string fee_invoice_typ,
           string fee_unit,
           string fee_currency_id,
           string od_beg_fee_dat,
           string od_end_fee_dat,
           string operation_id,
           string u_id,
           string page,
           string rows,
           string sort,
           string ordersort,
           ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_status", od_status));
                lst_in.Add(new SqlParameter("@fee_status", fee_status));
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@fee_item_typ", fee_item_typ));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@fee_invoice_typ", fee_invoice_typ));
                lst_in.Add(new SqlParameter("@fee_unit", fee_unit));
                lst_in.Add(new SqlParameter("@fee_currency_id", fee_currency_id));
                lst_in.Add(new SqlParameter("@od_beg_fee_dat", od_beg_fee_dat));
                lst_in.Add(new SqlParameter("@od_end_fee_dat", od_end_fee_dat));
                lst_in.Add(new SqlParameter("@operation_id", operation_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_get_change_order_list", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 改单计划
        public DataTable get_changeorder_plan_list(string co_status, string amc_status,
          string like_str,
          string create_id,
          string beg_date,
          string end_date,
          string u_id,
          string c_id,
          string page,
          string rows,
          string sort,
          string ordersort,
          ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@co_status", co_status));
                lst_in.Add(new SqlParameter("@amc_status", amc_status));
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@create_id", create_id));
                lst_in.Add(new SqlParameter("@beg_date", beg_date));
                lst_in.Add(new SqlParameter("@end_date", end_date));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_get_change_order_plan_list", lst_in, ref lst_out);
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

        #region 提交改单申请
        public bool insert_changeorder(string co_status,
            string co_fee_seq,
            string co_rec_or_pay,
            string old_fee_cu_id,
            string old_fee_item,
            string old_fee_price,
            string old_fee_number,
            string old_fee_unit,
            string old_fee_currency_rate,
            string old_fee_currency_id,
            string new_fee_cu_id,
            string new_fee_item,
            string new_fee_price,
            string new_fee_number,
            string new_fee_unit,
            string new_fee_currency_rate,
            string new_fee_currency_id,
            string co_bak,
            string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@co_status", co_status));
                lst_in.Add(new SqlParameter("@co_fee_seq", co_fee_seq));
                lst_in.Add(new SqlParameter("@co_rec_or_pay", co_rec_or_pay));

                lst_in.Add(new SqlParameter("@co_bak", co_bak));
                lst_in.Add(new SqlParameter("@u_id", u_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@co_seq", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@result", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_insert_changeorder", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 创建计划
        public bool insert_changeorder_plan( 
            string od_seq,  
            string co_bak, 
            string u_id, 
            string c_id, 
            ref string co_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
               
                lst_in.Add(new SqlParameter("@od_seq", od_seq)); 
                lst_in.Add(new SqlParameter("@co_bak", co_bak));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@co_seq", SqlDbType.NVarChar, 40);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@result", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_insert_changeorder_plan", lst_in, ref lst_out);
                co_seq = lst_out[0].Value.ToString();
                int result = Convert.ToInt32(lst_out[1].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 记录费用变化,插入
        public bool insert_changeorder_fee_record(
            string co_seq,
            string co_status,
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string rec_or_pay,
            string fee_cu_id,
            string fee_item_typ,
            string fee_price,
            string fee_number,
            string fee_unit,
            string fee_currency_rate,
            string fee_currency_id,
            string fee_bak,
            string fee_record_id,
            string fee_seq,
            string fee_invoice_typ)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@co_seq", co_seq));
                lst_in.Add(new SqlParameter("@co_status", co_status));
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@fee_item_typ", fee_item_typ));
                lst_in.Add(new SqlParameter("@fee_price", fee_price));
                lst_in.Add(new SqlParameter("@fee_number", fee_number));
                lst_in.Add(new SqlParameter("@fee_unit", fee_unit));
                lst_in.Add(new SqlParameter("@fee_currency_rate", fee_currency_rate));
                lst_in.Add(new SqlParameter("@fee_currency_id", fee_currency_id));
                lst_in.Add(new SqlParameter("@fee_bak", fee_bak));
                lst_in.Add(new SqlParameter("@fee_record_id", fee_record_id));
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq));
                lst_in.Add(new SqlParameter("@fee_invoice_typ", fee_invoice_typ));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p2 = new SqlParameter("@result", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_insert_changeorder_fee_record", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        

        #region 改单申请
        public bool post_changeorder_apprpval(string co_seq,  
            string u_id,
            string ap_u_id,
            string ap_order_by_id,
            string ap_aps_id,
            ref string amc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@co_seq", co_seq));
        
                lst_in.Add(new SqlParameter("@u_id", u_id));

                lst_in.Add(new SqlParameter("@ap_u_id", ap_u_id));
                lst_in.Add(new SqlParameter("@ap_order_by_id", ap_order_by_id));
                lst_in.Add(new SqlParameter("@ap_aps_id", ap_aps_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p2 = new SqlParameter("@result", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@amc_id", SqlDbType.NVarChar,40);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);

                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_insert_changeorder_approval", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                amc_id = lst_out[1].Value.ToString();

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 单个计划详情
      
        public DataTable get_changeorder_single(string co_seq, string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@co_seq", co_seq));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_get_changeorder_single", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取改单计划的费用变化详情
        public DataTable get_changeorder_fee(string co_seq )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@co_seq", co_seq)); 

                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_get_changeorder_fee", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataTable get_changorder_plan_fee_record(string co_seq, string rec_or_pay)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@co_seq", co_seq));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));

                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_get_changorder_plan_fee_record", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取改单计划的全部费用变化详情
        public DataTable get_changorder_plan_all_fee_record(string co_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@co_seq", co_seq));

                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_get_changorder_plan_all_fee_record", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除计划
        public bool delete_changeorder_plan(string co_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@co_seq", co_seq));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p2 = new SqlParameter("@result", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ocd_p_delete_changeorder_plan", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

    }
}
