using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;

namespace DAL.fee
{
    public class dal_fee
    {
        msSqlHelper ms = null; 
        public dal_fee()
        {
            ms = new msSqlHelper();
        }

        #region 费率设定

        #region 设定
        public bool set_month_exchange_rate(
            string er_year,
            string er_month,
            string er_cr_id,
            string er_cr_rate,
            string er_record_by_id,
            string c_id,
            ref string er_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@er_year", er_year));
                lst_in.Add(new SqlParameter("@er_month", er_month));
                lst_in.Add(new SqlParameter("@er_cr_id", er_cr_id));
                lst_in.Add(new SqlParameter("@er_cr_rate", er_cr_rate));
                lst_in.Add(new SqlParameter("@er_record_by_id", er_record_by_id));
                lst_in.Add(new SqlParameter("@c_id", c_id)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@er_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2); 

                DataTable dt = ms.excuteStoredProcedureData("_fee_p_set_month_exchange_rate", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                er_id = lst_out[1].Value.ToString();
                
                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取  根据年 和 货币获取 
        public DataTable get_month_exchange_rate(string er_year,
           string er_cr_id,
            string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@er_year", er_year));
                lst_in.Add(new SqlParameter("@er_cr_id", er_cr_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_fee_p_get_month_exchange_rate", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取  根据订单
        public DataTable  get_month_exchange_rate_by_od_seq(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq)); 
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_fee_p_get_month_exchange_rate_by_od_seq", lst_in, ref lst_out);

                return dt;

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
