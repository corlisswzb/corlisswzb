using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL.commone
{
    public static class DAL_commone
    {
       
       public static DateTime get_sysdate()
       {
           try
           {
               string sql = "select getdate()";

               mySqlHelper.Local.msSqlHelper ms = new mySqlHelper.Local.msSqlHelper();

               DateTime dt_now = Convert.ToDateTime(ms.getScale(sql));

               return dt_now;
           }
           catch (Exception e)
           {
               throw e;
           }
       }
    }
}
