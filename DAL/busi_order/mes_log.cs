using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;

namespace DAL.busi
{
   public class mes_log
    {
       msSqlHelper ms = null;
       public mes_log()
       {
           ms = new msSqlHelper();
       }

       #region 新增消息日志
       public bool insert_message_log(
           string ml_type,
           string ml_msg,
           string ml_operator)
       {
           try
           {
               List<SqlParameter> lst_in = new List<SqlParameter>();
               lst_in.Add(new SqlParameter("@ml_type", ml_type));
               lst_in.Add(new SqlParameter("@ml_msg", ml_msg));
               lst_in.Add(new SqlParameter("@ml_operator", ml_operator));
            
               List<SqlParameter> lst_out = new List<SqlParameter>();
               SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
               p.Direction = ParameterDirection.Output;
               lst_out.Add(p);

               DataTable dt = ms.excuteStoredProcedureData("_ml_insert_message_log", lst_in, ref lst_out);
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
