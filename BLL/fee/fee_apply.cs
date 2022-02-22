using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace BLL.fee
{
   public class fee_apply
    {
       DAL.fee.fee_apply fa = null;
       public fee_apply()
       {
           fa = new DAL.fee.fee_apply();
       }



       #region 获取已对账单位的费用信息
       public string get_feelist_to_yd(string cu_id, string rp_id)
       {
           try
           {
               DataTable dt = fa.get_feelist_to_yd(cu_id, rp_id);
               string json = BLL.commone.BLL_commone.data_convert_json(dt);
               return json;
           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion






       #region 获取费用申请列表
       public string get_fee_apply_list(string fa_type)
       {
           try
           {
               DataTable dt = fa.get_fee_apply_list(fa_type);
               string json = BLL.commone.BLL_commone.data_convert_json(dt);
               return json;
           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion


       
      
    }
}
