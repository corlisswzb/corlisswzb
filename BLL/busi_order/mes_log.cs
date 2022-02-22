using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.busi
{
    public static class mes_log
    {
       


        #region 新增消息日志
        public static void insert_mes_log(string ml_type,
          string ml_msg,
          string ml_operator)
        {
            try
            {
                 DAL.busi.mes_log ms  = new DAL.busi.mes_log();
                 ms.insert_message_log(ml_type, ml_msg, ml_operator);
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion
       



    }
}
