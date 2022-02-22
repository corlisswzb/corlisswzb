using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace DAL.fee
{
    public class fee_apply
    {
        mySqlHelper.Local.msSqlHelper ms = null;
        public fee_apply()
        {
            ms = new mySqlHelper.Local.msSqlHelper();
        }


        #region 获取已对账单位的费用信息
        public DataTable get_feelist_to_yd(
            string cu_id,
            string rp_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cu_id", cu_id));
                lst_in.Add(new SqlParameter("@rp_id", rp_id));

                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_fa_get_feelist_to_yd", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion



        #region 更新费用申请的字段，需要审核的费用id，和已审核的费用id
        public bool update_fee_apply_feeids(string fa_id,string feeids_sq, string feeids_sh)
        {
            try
            {

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fa_id", fa_id));
                lst_in.Add(new SqlParameter("@fa_feeids_sq", feeids_sq));
                lst_in.Add(new SqlParameter("@fa_feeids_sh", feeids_sh));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_fa_update_apply_feeids", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;

            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 获取费用申请列表
        public DataTable get_fee_apply_list(
            string fa_type)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fa_type", fa_type));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_fa_get_fee_apply_list", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增费用申请记录
        public bool insert_fee_apply(
            string fa_cuid,
            string fa_feeids_sq,
            string fa_type,
            string fa_sum_rmb,
            string fa_sum_usd,
            string fa_uid
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fa_cuid", fa_cuid));
                lst_in.Add(new SqlParameter("@fa_feeids_sq", fa_feeids_sq));
                lst_in.Add(new SqlParameter("@fa_type", fa_type));
                lst_in.Add(new SqlParameter("@fa_sum_rmb", fa_sum_rmb));
                lst_in.Add(new SqlParameter("@fa_sum_usd", fa_sum_usd));
                lst_in.Add(new SqlParameter("@fa_uid", fa_uid));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_fa_insert_fee_apply", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result>0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
    }
}
