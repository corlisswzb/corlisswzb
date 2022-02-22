using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;

namespace DAL.busi
{
   public class busi_approval
    {
       msSqlHelper ms = null;
       public busi_approval()
       {
           ms = new msSqlHelper();
       }

       #region 获取业务审批列表
       public DataTable get_business_sp_list(
             string like_str ,
	         string company_id,//公司id/-1全部
	         string sponsor, //发起人
	         string trade,//内外贸
	         string sdate,//申请起始时间
	         string edate,//申请结束时间
	         string ap_state ,//审核状态/-1全部，0审核中，1已撤销，2已结束
             string u_id,

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
               lst_in.Add(new SqlParameter("@company_id", company_id));
               lst_in.Add(new SqlParameter("@sponsor", sponsor));
               lst_in.Add(new SqlParameter("@trade", trade));
               lst_in.Add(new SqlParameter("@sdate", sdate));
               lst_in.Add(new SqlParameter("@edate", edate));
               lst_in.Add(new SqlParameter("@ap_state", ap_state));
               lst_in.Add(new SqlParameter("@u_id", u_id));

               lst_in.Add(new SqlParameter("@page", page));
               lst_in.Add(new SqlParameter("@rows", rows));
               lst_in.Add(new SqlParameter("@sort", sort));
               lst_in.Add(new SqlParameter("@order", order));

               List<SqlParameter> lst_out = new List<SqlParameter>();
               SqlParameter p = new SqlParameter("@rowcount", SqlDbType.Int);
               p.Direction = ParameterDirection.Output;
               lst_out.Add(p);

               DataTable dt = ms.excuteStoredProcedureData("_bal_get_business_approval_list", lst_in, ref lst_out);
               rowcount = Convert.ToInt32(lst_out[0].Value);
               return dt;
           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion

       #region 插入业务审核记录
       public bool insert_approval_business_recored(string bar_baapk, string bar_reviewer, string bar_spstate, string bar_remarks)
       {
           try
           {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bar_baapk", bar_baapk));
                lst_in.Add(new SqlParameter("@bar_reviewer", bar_reviewer));
                lst_in.Add(new SqlParameter("@bar_spstate", bar_spstate));
                lst_in.Add(new SqlParameter("@bar_remarks", bar_remarks));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bal_insert_business_record", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
           }
           catch (Exception)
           {
               
               throw;
           }
       }
       #endregion

       #region 获取下一审核节点信息
       public DataTable get_business_apprval_next_node(string baa_pk, string cpy_id, string node_type)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@baa_pk", baa_pk));
               lst_in.Add(new SqlParameter("@cpy_id", cpy_id));
               lst_in.Add(new SqlParameter("@node_type", node_type));

               List<SqlParameter> lst_out = null;
               DataTable dt = ms.excuteStoredProcedureData("_bal_get_next_node", lst_in, ref lst_out);
               
               return dt;
           }
           catch (Exception)
           {
               throw;
           }

       }
       #endregion

       #region 更新当前审核人
       public bool update_reviewer_for_busi_apply(string baapk, string u_id)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@baapk", baapk));
               lst_in.Add(new SqlParameter("@u_id", u_id));

               List<SqlParameter> lst_out = new List<SqlParameter>();
               SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
               p.Direction = ParameterDirection.Output;
               lst_out.Add(p);

               DataTable dt = ms.excuteStoredProcedureData("_bal_update_reviewer_for_busi_apply", lst_in, ref lst_out);

               int result = Convert.ToInt32(lst_out[0].Value);
               return result > 0;
           }
           catch (Exception)
           {
               
               throw;
           }
       }
       #endregion


       public bool end_apply_state(string baapk)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@baapk", baapk));
               
               List<SqlParameter> lst_out = new List<SqlParameter>();
               SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
               p.Direction = ParameterDirection.Output;
               lst_out.Add(p);

               DataTable dt = ms.excuteStoredProcedureData("_bal_end_apply_state", lst_in, ref lst_out);

               int result = Convert.ToInt32(lst_out[0].Value);
               return result > 0;
           }
           catch (Exception)
           {
               
               throw;
           }
       }

       #region 获取wx绑定需要的业务数据
       public DataTable get_wx_business_form_id(string busi_id)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@busi_id", busi_id));

               List<SqlParameter> lst_out = null;
               DataTable dt = ms.excuteStoredProcedureData("_bal_get_wx_business_info", lst_in, ref lst_out);

               return dt;
           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion

       #region 获取wx绑定需要的审批数据
       public DataTable get_wx_approval(string pk)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@baa_pk", pk));
              
               List<SqlParameter> lst_out = null;
               DataTable dt = ms.excuteStoredProcedureData("_bal_get_wx_approval", lst_in, ref lst_out);
               
               return dt;
           }
           catch (Exception)
           {
               
               throw;
           }
       }
       #endregion

       #region 执行驳回后一些修改操作
       public bool update_busi_to_reject(string busi_id, string baa_pk)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@busi_id", busi_id));
               lst_in.Add(new SqlParameter("@baa_pk", baa_pk));

               List<SqlParameter> lst_out = new List<SqlParameter>();
               SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
               p.Direction = ParameterDirection.Output;
               lst_out.Add(p);

               DataTable dt = ms.excuteStoredProcedureData("_bal_update_busi_to_reject", lst_in, ref lst_out);
               int result = Convert.ToInt32(lst_out[0].Value);
               return result > 0;
               
           }
           catch (Exception)
           {
               
               throw;
           }
       }
       #endregion

       #region 获取业务申请的申请人
       public DataTable get_applicant_apply()
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               List<SqlParameter> lst_out = new List<SqlParameter>();
               DataTable dt = ms.excuteStoredProcedureData("_bal_get_applicant_apply", lst_in, ref lst_out);
               return dt;

           }
           catch (Exception)
           {
               
               throw;
           }
       }
       #endregion
      
    }
}
