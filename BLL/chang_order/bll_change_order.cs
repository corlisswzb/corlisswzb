using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using DAL.checkaccount;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace BLL.chang_order
{
    public class bll_change_order
    {
        DAL.chang_order.dal_change_order co = null;
        public bll_change_order()
        {
            co = new DAL.chang_order.dal_change_order();
        }

        public string get_change_order_list(
            string od_status, string fee_status,
            string like_str,
            string fee_cu_id,
            string fee_item_typ,
            string rec_or_pay,
            string fee_invoice_typ,
            string fee_unit,
            string fee_currency_id,
            string od_beg_fee_dat,
            string od_end_fee_dat,
            string operation_id,
            string u_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                DataTable dt = co.get_change_order_list(od_status, fee_status,
                     like_str,
                     fee_cu_id,
                     fee_item_typ,
                     rec_or_pay,
                     fee_invoice_typ,
                     fee_unit,
                     fee_currency_id,
                     od_beg_fee_dat,
                     od_end_fee_dat,
                     operation_id,
                     u_id,
                     page,
                     rows,
                     sort,
                     ordersort,
                    ref  rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception)
            {

                throw;
            }
        }


        #region 改单计划
        public string get_changeorder_plan_list(
          string co_status, string amc_status,
          string like_str,
          string create_id,
          string beg_date,
          string end_date,
          string u_id,
          string c_id,
          string page,
          string rows,
          string sort,
          string ordersort)
        {
            try
            {
                int rowcount = 0;
                DataTable dt = co.get_changeorder_plan_list(
                    co_status,
                    amc_status,
                    like_str,
                    create_id,
                    beg_date,
                    end_date,
                    u_id,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref  rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 改单申请
        public bool post_changeorder_apprpval(string co_seq, 
            string u_id,
            string ap_u_id,
            string ap_order_by_id,
            string ap_aps_id)
        {
            try
            {
                string amc_id = string.Empty;

                bool b = co.post_changeorder_apprpval(co_seq,
                    u_id,
                    ap_u_id, 
                    ap_order_by_id,
                    ap_aps_id,
                    ref amc_id);
                string msg = string.Empty;
                if (b)
                {
                    msg = "提交成功。";
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.create);
                }

                return b;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 记录费用变化,插入
        
        public bool insert_changeorder_fee_record(
            string co_seq,
            string co_status,
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq, 
            string rec_or_pay,
            string fee_cu_id,
            string fee_item_typ,
            string fee_price,
            string fee_number,
            string fee_unit,
            string fee_currency_rate,
            string fee_currency_id,
            string fee_bak,
            string fee_record_id,
            string fee_seq,
            string fee_invoice_typ )
        {
            try
            {

                
                bool b = co.insert_changeorder_fee_record(
                    co_seq,
                    co_status,
                    od_seq,
                    od_service_seq,
                    od_service_sub_seq,
                    rec_or_pay,
                    fee_cu_id,
                    fee_item_typ,
                    fee_price,
                    fee_number,
                    fee_unit,
                    fee_currency_rate,
                    fee_currency_id,
                    fee_bak,
                    fee_record_id,
                    fee_seq,
                    fee_invoice_typ );
  
                return b;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 创建改单计划
        public string create_changeorder_plan( 
            string od_seq, 
            string new_fee_data,  
            string co_bak, 
            string u_id, 
            string c_id,
            string ap_u_id,
            string ap_order_by_id,
            string ap_aps_id)
        {
            try
            {

                string co_seq = string.Empty;
                bool b = co.insert_changeorder_plan( 
                    od_seq, 
                    co_bak,
                    u_id,
                    c_id,
                    ref co_seq);

                if (b)//记录费用
                {

                    #region 插入 改变的(新增，删除等等) 费用 
                    JObject job_new_fee = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(new_fee_data);
                    if (job_new_fee["rows"] != null)
                    {

                        JArray lst = (JArray)job_new_fee["rows"];

                        for (int i = 0; i < lst.Count; i++)
                        {
                            string co_status = lst[i]["co_status"].ToString().Trim();
                            string fee_seq = lst[i]["fee_seq"].ToString().Trim();
                            string od_service_seq = lst[i]["od_service_seq"] == null?string.Empty: lst[i]["od_service_seq"].ToString().Trim();
                            string od_service_sub_seq = lst[i]["od_service_sub_seq"] == null?string.Empty:lst[i]["od_service_sub_seq"].ToString().Trim();

                            string rec_or_pay = lst[i]["rec_or_pay"].ToString().Trim();
                            string fee_cu_id = lst[i]["fee_cu_id"].ToString().Trim();
                            string fee_item_typ = lst[i]["fee_item_typ"].ToString().Trim();
                            string fee_price = lst[i]["fee_price"].ToString().Trim();
                            string fee_number = lst[i]["fee_number"].ToString().Trim();
                            string fee_unit = lst[i]["fee_unit"].ToString().Trim();
                            string fee_currency_rate = lst[i]["fee_currency_rate"].ToString().Trim();
                            string fee_currency_id = lst[i]["fee_currency_id"].ToString().Trim();
                            string fee_bak = lst[i]["fee_bak"].ToString().Trim();
                            string fee_invoice_typ = lst[i]["fee_invoice_typ"].ToString().Trim();
                             
                            //这里改成 只需要 增加cntr就好了
                            insert_changeorder_fee_record(
                                co_seq,
                                co_status,
                                od_seq,
                                od_service_seq,
                                od_service_sub_seq,
                                rec_or_pay,
                                fee_cu_id,
                                fee_item_typ,
                                fee_price,
                                fee_number,
                                fee_unit,
                                fee_currency_rate,
                                fee_currency_id,
                                fee_bak,
                                u_id,
                                fee_seq,
                                fee_invoice_typ );
                        }
                    }
                    #endregion 

                    #region 提交申请
                    string amc_id= string.Empty;

                    post_changeorder_apprpval(co_seq, u_id,
                        ap_u_id,
                        ap_order_by_id,
                        ap_aps_id );

                    #endregion 
                }

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "操作成功":"错误:新建计划失败,当前委托存在一个未完成的改单计划。");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取计划详情
        public string get_changorder_plan_fee_record(string co_seq, string rec_or_pay)
        {
            try
            {
                DataTable dt = co.get_changorder_plan_fee_record(co_seq, rec_or_pay);
                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取计划全部费用详情
        public string get_changorder_plan_all_fee_record(string co_seq)
        {
            try
            {
                DataTable dt = co.get_changorder_plan_all_fee_record(co_seq);
                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        

        #region 单个计划详情
        public string get_changeorder_single_full_collections(string co_seq, string u_id)
        {
            try
            {
                JObject jo = new JObject();
                //其实应该先得到委托详情 
                //为什么这里不是一个集合 ???? 
                DataTable dt = co.get_changeorder_single(co_seq, u_id); 
                string json_co = commone.BLL_commone.data_convert_jsonarray(dt);
                JArray ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(json_co);
                jo["co_base"] = ja;

                DataTable dt_fee = co.get_changeorder_fee(co_seq);
                string json_fee = commone.BLL_commone.data_convert_jsonarray(dt_fee);
                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(json_fee);
                jo["co_fee"] = ja; 
                return jo.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 删除计划
        public string delete_changeorder_plan(string co_seq)
        {
            try
            {
                bool b = co.delete_changeorder_plan(co_seq);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "操作成功" : "不可删除，计划状态必须为未提交");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

    }
}
