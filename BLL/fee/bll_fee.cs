using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using DAL.fee;

namespace BLL.fee
{
    public class bll_fee
    {
        dal_fee df = null;

        public bll_fee()
        {
            df = new dal_fee();
        }

        #region 汇率 

        #region 设定
        public string set_month_exchange_rate(
            string er_year,
            string er_month,
            string er_cr_id,
            string er_cr_rate,
            string er_record_by_id,
            string er_record_by_nam,
            string c_id)
        {
            try
            {
                string er_id = string.Empty;

                bool b = df.set_month_exchange_rate(er_year,
                    er_month,
                    er_cr_id, 
                    er_cr_rate, 
                    er_record_by_id,
                    c_id,
                    ref er_id);

                DateTime dt_now = commone.BLL_commone.get_sysdate();

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("er_record_by_nam", er_record_by_nam));
                lst.Add(new KeyValuePair<string, string>("er_id", er_id));
                lst.Add(new KeyValuePair<string, string>("er_record_dat", dt_now.ToString("yyyy-MM-dd HH:mm:ss")));

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "设置汇率成功" : "异常:请联系管理员处理。", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取  根据年 和 货币获取
        public string get_month_exchange_rate(string er_year,
           string er_cr_id,
            string c_id)
        {
            try
            {
                string er_id = string.Empty;

                DataTable dt = df.get_month_exchange_rate(er_year, 
                    er_cr_id,
                    c_id);
                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取  根据订单
        public string get_month_exchange_rate_by_od_seq(string od_seq)
        {
            try
            {
                string er_id = string.Empty;

                DataTable dt = df.get_month_exchange_rate_by_od_seq(od_seq);
                return commone.BLL_commone.data_convert_json(dt);
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
