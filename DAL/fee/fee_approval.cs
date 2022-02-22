using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace DAL.fee
{
   public class fee_approval
    {
       mySqlHelper.Local.msSqlHelper ms = null;
       public fee_approval()
       {
           ms = new mySqlHelper.Local.msSqlHelper();
       }

       #region 新增费用审核记录
       public bool insert_fee_approval(string fe_cuid, string fe_feeid, string fe_type, string fe_sum_rmb, string fe_sum_usd, string fe_uid, string fe_state)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@fe_cuid", fe_cuid));
               lst_in.Add(new SqlParameter("@fe_feeids", fe_feeid));
               lst_in.Add(new SqlParameter("@fe_type", fe_type));
               lst_in.Add(new SqlParameter("@fe_sum_rmb", fe_sum_rmb));
               lst_in.Add(new SqlParameter("@fe_sum_usd", fe_sum_usd));
               lst_in.Add(new SqlParameter("@fe_uid", fe_uid));
               lst_in.Add(new SqlParameter("@fe_state", fe_state));

               List<SqlParameter> lst_out = new List<SqlParameter>();
               SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
               p.Direction = ParameterDirection.Output;
               lst_out.Add(p);

               DataTable dt = ms.excuteStoredProcedureData("_fe_insert_fee_examine_record", lst_in, ref lst_out);
               int result = Convert.ToInt32(lst_out[0].Value);
               return result > 0;
           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion

       #region 获取费用审批列表，未使用
       public DataTable get_fee_approval_list(
             string like_str,
             string cu_id,
             string fee_uid, 
             string fee_sdate,
             string fee_edate,
             string feeids,
             string fee_type,
             string fee_state,
             string page,
             string rows,
             string sort,
             string order,
             ref int rowcount)
       {
           try
           {
               
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@like_str", like_str));
               lst_in.Add(new SqlParameter("@cu_id", cu_id));
               lst_in.Add(new SqlParameter("@fee_uid", fee_uid));
               lst_in.Add(new SqlParameter("@fee_sdate", fee_sdate));
               lst_in.Add(new SqlParameter("@fee_edate", fee_edate));
               lst_in.Add(new SqlParameter("@feeids", feeids));
               lst_in.Add(new SqlParameter("@fee_type", fee_type));
               lst_in.Add(new SqlParameter("@fee_state", fee_state));
               

               lst_in.Add(new SqlParameter("@page", page));
               lst_in.Add(new SqlParameter("@rows", rows));
               lst_in.Add(new SqlParameter("@sort", sort));
               lst_in.Add(new SqlParameter("@order", order));

               List<SqlParameter> lst_out = new List<SqlParameter>();
               SqlParameter p = new SqlParameter("@rowcount", SqlDbType.Int);
               p.Direction = ParameterDirection.Output;
               lst_out.Add(p);

               DataTable dt = ms.excuteStoredProcedureData("_fa_get_fee_approval", lst_in, ref lst_out);
               rowcount = Convert.ToInt32(lst_out[0].Value);
               return dt;
           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion


       #region 获取费用id,根据条件
       public DataTable get_fee_apply_feeids(
             string cu_id,
             string fee_uid, 
             string fee_sdate,
             string fee_edate,
             string fee_type,
             string fee_state)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
              
               lst_in.Add(new SqlParameter("@cu_id", cu_id));
               lst_in.Add(new SqlParameter("@fee_uid", fee_uid));
               lst_in.Add(new SqlParameter("@fee_sdate", fee_sdate));
               lst_in.Add(new SqlParameter("@fee_edate", fee_edate));
               lst_in.Add(new SqlParameter("@fee_type", fee_type));
               lst_in.Add(new SqlParameter("@fee_state", fee_state));

               List<SqlParameter> lst_out = null;


               DataTable dt = ms.excuteStoredProcedureData("_fa_get_fee_apply_feeids", lst_in, ref lst_out);
              
               return dt;
           }
           catch (Exception)
           {
               
               throw;
           }
       }
        #endregion

       #region 获取费用列表
       public DataTable get_fee_apply_feelist(
             string like_str,
             string feeids,
             string page,
             string rows,
             string sort,
             string order,
             ref int rowcount)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@like_str", like_str));
               lst_in.Add(new SqlParameter("@feeids", feeids));
               lst_in.Add(new SqlParameter("@page", page));
               lst_in.Add(new SqlParameter("@rows", rows));
               lst_in.Add(new SqlParameter("@sort", sort));
               lst_in.Add(new SqlParameter("@order", order));

               List<SqlParameter> lst_out = new List<SqlParameter>();
               SqlParameter p = new SqlParameter("@rowcount", SqlDbType.Int);
               p.Direction = ParameterDirection.Output;
               lst_out.Add(p);

               DataTable dt = ms.excuteStoredProcedureData("_fa_get_fee_apply_feelist", lst_in, ref lst_out);
               rowcount = Convert.ToInt32(lst_out[0].Value);
               return dt;
           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion

       #region 获取费用申请人
       public DataTable get_fee_apply_userlist(string fa_type)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@fa_type", fa_type));
               List<SqlParameter> lst_out = null;
             
               DataTable dt = ms.excuteStoredProcedureData("_fa_get_fee_apply_userlist", lst_in, ref lst_out);
               return dt;
           }
           catch (Exception)
           {
               
               throw;
           }
       }
        #endregion


       #region 获取费用申请结算对象
       public DataTable get_fee_apply_customlist(string fa_type)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@fa_type", fa_type));
               List<SqlParameter> lst_out = null;
              
               DataTable dt = ms.excuteStoredProcedureData("_fa_get_fee_apply_customlist", lst_in, ref lst_out);
               return dt;
           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion

       #region 审核通过维护发票
       //public DataTable get_fee_apply_userlist(string fa_type)
       //{
       //    try
       //    {
       //        List<SqlParameter> lst_in = new List<SqlParameter>();
       //        lst_in.Add(new SqlParameter("@fa_type", fa_type));
       //        List<SqlParameter> lst_out = null;

       //        DataTable dt = ms.excuteStoredProcedureData("_fa_get_fee_apply_userlist", lst_in, ref lst_out);
       //        return dt;
       //    }
       //    catch (Exception)
       //    {

       //        throw;
       //    }

       //}
       #endregion
    }


}
