using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;
namespace DAL.hr_commit_profit
{
    public class dal_hr_commit_profit
    {
        msSqlHelper ms = null;
        public dal_hr_commit_profit()
        {
            ms = new msSqlHelper();
        }
         

        #region 提成审核创建及申请
        #region 插入提成审核单元 头部内容
        public bool  insert_hr_commit_profit_record(string hr_commit_id,
            string rel_u_id,
            string rel_beg_dat ,
            string rel_end_dat,
            ref string hr_seq 
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hr_commit_id", hr_commit_id));
                lst_in.Add(new SqlParameter("@rel_u_id", rel_u_id));
                lst_in.Add(new SqlParameter("@rel_beg_dat", rel_beg_dat));
                lst_in.Add(new SqlParameter("@rel_end_dat", rel_end_dat));
                List<SqlParameter> lst_out =  new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.SmallInt);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@hr_seq", SqlDbType.NVarChar,40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);


                DataTable dt = ms.excuteStoredProcedureData("_hr_p_insert_hr_commit_profit_record", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                hr_seq = lst_out[1].Value.ToString();

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        } 
        #endregion

        #region 插入提成审核单元 明细
        public bool insert_hr_commit_profit_details(string hr_seq,
            string od_seq,
            string fee_amount_of_base,
            string fee_amount_of_eur,
            string fee_amount_of_jpy,
            string fee_amount_of_rmb,
            string fee_amount_of_usd,
            string cover_flag,
            string pre_fee_amount_of_base,
            string pre_fee_amount_of_eur,
            string pre_fee_amount_of_jpy,
            string pre_fee_amount_of_rmb,
            string pre_fee_amount_of_usd,
            string rel_hr_commit_title 
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hr_seq", hr_seq));
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@fee_amount_of_base", fee_amount_of_base));
                lst_in.Add(new SqlParameter("@fee_amount_of_eur", fee_amount_of_eur));
                lst_in.Add(new SqlParameter("@fee_amount_of_jpy", fee_amount_of_jpy));
                lst_in.Add(new SqlParameter("@fee_amount_of_rmb", fee_amount_of_rmb));
                lst_in.Add(new SqlParameter("@fee_amount_of_usd", fee_amount_of_usd));
                lst_in.Add(new SqlParameter("@cover_flag", cover_flag));
                lst_in.Add(new SqlParameter("@pre_fee_amount_of_base", pre_fee_amount_of_base));
                lst_in.Add(new SqlParameter("@pre_fee_amount_of_eur", pre_fee_amount_of_eur));
                lst_in.Add(new SqlParameter("@pre_fee_amount_of_jpy", pre_fee_amount_of_jpy));
                lst_in.Add(new SqlParameter("@pre_fee_amount_of_rmb", pre_fee_amount_of_rmb));
                lst_in.Add(new SqlParameter("@pre_fee_amount_of_usd", pre_fee_amount_of_usd));
                lst_in.Add(new SqlParameter("@rel_hr_commit_title", rel_hr_commit_title));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.SmallInt);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
 

                DataTable dt = ms.excuteStoredProcedureData("_hr_p_insert_hr_commit_profit_details", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
               
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        } 

        #endregion

        #region 提交提成审核 
        public bool post_commit_profit(string c_id,
            string hr_seq,
            string post_by_id,
            string ap_u_id,
            string aps_order_by_id,
            string aps_id,
            string amc_bak,
            ref string amc_id 
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@hr_seq", hr_seq));
                lst_in.Add(new SqlParameter("@post_by_id", post_by_id));
                lst_in.Add(new SqlParameter("@ap_u_id", ap_u_id));
                lst_in.Add(new SqlParameter("@aps_order_by_id", aps_order_by_id));
                lst_in.Add(new SqlParameter("@aps_id", aps_id));
                lst_in.Add(new SqlParameter("@amc_bak", amc_bak)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.SmallInt);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@amc_id", SqlDbType.NVarChar,40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_hr_p_post_commit_profit", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        } 
        #endregion 
        #endregion

        #region 获取 
        #region 获取上一次 (当前时间以前的)
        public bool get_last_commit_dat(string rel_u_id, ref string last_rel_end_dat)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@rel_u_id", rel_u_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@last_exists", SqlDbType.SmallInt);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@last_rel_end_dat", SqlDbType.DateTime);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_hr_p_get_last_commit_dat", lst_in, ref lst_out);
                int last_exists = Convert.ToInt32(lst_out[0].Value);

                last_rel_end_dat = lst_out[1].Value.ToString();
                return last_exists > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion 

        #region 通过时间,u_id获取应收结算完毕委托单 
        public DataTable  get_woa_group_of_sb(string c_id,
            string group_u_id,
            string woa_beg_dat,
            string woa_end_dat
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@group_u_id", group_u_id));
                lst_in.Add(new SqlParameter("@woa_beg_dat", woa_beg_dat));
                lst_in.Add(new SqlParameter("@woa_end_dat", woa_end_dat));
                List<SqlParameter> lst_out = null; 
                DataTable dt = ms.excuteStoredProcedureData("_hr_p_get_woa_group_of_sb", lst_in, ref lst_out); 
                return dt;
            }
            catch (Exception)
            { 
                throw;
            }
        } 
        #endregion 

        #region 获取审核列表 
        public DataTable  get_full_hr_commit_profit_list(string c_id,
            string like_str,
            string u_id ,
            string amc_status,
            string amc_cur_opr_id,
            string amc_create_id,
            string hr_rel_u_id,
            string only_my_step,
            string page,
            string rows,
            string sort,
            string ordersort,
            ref string rowcount 
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@amc_status", amc_status));
                lst_in.Add(new SqlParameter("@amc_cur_opr_id", amc_cur_opr_id));
                lst_in.Add(new SqlParameter("@amc_create_id", amc_create_id));
                lst_in.Add(new SqlParameter("@hr_rel_u_id", hr_rel_u_id));
                lst_in.Add(new SqlParameter("@only_my_step", only_my_step));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_full_hr_commit_profit_list", lst_in, ref lst_out);
                rowcount = lst_out[0].Value.ToString();

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        } 
        #endregion 

        #region 获取单个审核 
        public DataTable  get_hr_commit_profit_record_single(string amc_id, 
            string u_id 
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_hr_commit_profit_record_single", lst_in, ref lst_out);
                

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion 

        #region 获取单个审核 正常申请列表
        public DataTable  get_hr_commit_profit_details_by_amc_id_of_uncover(string amc_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id)); 
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_hr_p_get_hr_commit_profit_details_by_amc_id_of_uncover", lst_in, ref lst_out);


                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion


        #region 获取单个审核 异常(已申请过)列表 
        public DataTable get_hr_commit_profit_details_by_amc_id_of_cover(string amc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_hr_p_get_hr_commit_profit_details_by_amc_id_of_cover", lst_in, ref lst_out);


                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion 
        
        #endregion
    }
}
