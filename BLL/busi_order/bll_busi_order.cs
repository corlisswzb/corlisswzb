using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using DAL.busi_order;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace BLL.busi_order
{
    public class bll_busi_order
    {
        dal_busi_order dal = null;

        public bll_busi_order()
        {
            dal = new dal_busi_order();
        }

        
        #region 订单查询
        #region 分页查询
        public string get_order_list(string like_str,
            string od_typ,
            string od_status_id,
            string od_project_typ,
            string od_cargo_agent_cu_id,
            string od_delegate_cu_id,
            string od_box_typ_id,
            string od_beg_fee_dat,
            string od_end_fee_dat,
            string od_service_id,
            string od_record_by_company_id,
            string od_trade_typ_id,
            string od_bill_nos,
            string od_cntr_nos,
            string od_route_tools_desc,
            string od_route_tools_no,
            string fee_cu_id,
            string od_water_way_flag,
            string od_sub_way_flag,
            string od_road_way_flag,
            string od_air_way_flag,

            string page,
            string rows,
            string sort,
            string ordersort )
        {
            try
            {
                int rowcount = 0;
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_order_list(like_str,
                    od_typ,
                    od_status_id,
                    od_project_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_box_typ_id,
                    od_beg_fee_dat,
                    od_end_fee_dat,
                    od_service_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    od_bill_nos,
                    od_cntr_nos,
                    od_route_tools_desc,
                    od_route_tools_no,
                    fee_cu_id,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag, 
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount,
                    ref group_fee_desc );

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("group_fee_desc", group_fee_desc));

                return commone.BLL_commone.data_convert_json(dt, rowcount, lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string get_order_list_include_min_profit(string like_str,
            string od_typ,
            string od_status_id,
            string od_project_typ,
            string od_cargo_agent_cu_id,
            string od_delegate_cu_id,
            string od_box_typ_id,
            string od_beg_fee_dat,
            string od_end_fee_dat,
            string od_service_id,
            string od_record_by_company_id,
            string od_trade_typ_id,
            string od_bill_nos,
            string od_cntr_nos,
            string od_route_tools_desc,
            string od_route_tools_no,
            string fee_cu_id,
            string od_water_way_flag,
            string od_sub_way_flag,
            string od_road_way_flag,
            string od_air_way_flag, 
            string od_min_profit,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_order_list_include_min_profit(like_str,
                    od_typ,
                    od_status_id,
                    od_project_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_box_typ_id,
                    od_beg_fee_dat,
                    od_end_fee_dat,
                    od_service_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    od_bill_nos,
                    od_cntr_nos,
                    od_route_tools_desc,
                    od_route_tools_no,
                    fee_cu_id,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag,
                    od_min_profit,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount,
                    ref group_fee_desc);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("group_fee_desc", group_fee_desc));

                return commone.BLL_commone.data_convert_json(dt, rowcount, lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
        #endregion

        #region 费用查询
        public string get_order_fee(string c_id, 
            string fee_status,
            string rec_or_pay,
            string fee_cu_id,
            string fee_item_typ,
            string fee_currency_id,
            string fee_invoice_typ,
            string fee_dat_beg,
            string fee_dat_end,
            string od_no,
            string od_typ,
            string od_project_typ,
            string od_water_way_flag,
            string od_sub_way_flag,
            string od_road_way_flag,
            string od_air_way_flag,
            string od_status_id,
            string od_route_tools_desc,
            string od_route_tools_no,
            string od_bill_nos,
            string od_cntr_nos,
            string invoice_no,
            string fee_rel_bill_no,
            string fee_limit_days_status,
            string fee_invoice_lock_flag,
            string fee_record_id,
            string fee_guess_amount,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;
                DataTable dt = dal.get_order_fee(c_id, 
                    fee_status,
                    rec_or_pay,
                    fee_cu_id,
                    fee_item_typ,
                    fee_currency_id,
                    fee_invoice_typ,
                    fee_dat_beg,
                    fee_dat_end,
                    od_no,
                    od_typ,
                    od_project_typ,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag,
                    od_status_id,
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_bill_nos,
                    od_cntr_nos,
                    invoice_no,
                    fee_rel_bill_no,
                    fee_limit_days_status,
                    fee_invoice_lock_flag,
                    fee_record_id,
                    fee_guess_amount,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref   rowcount,
                    ref   group_fee_desc);

                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["group_fee_desc"] = group_fee_desc; 

                return data.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public JObject get_order_fee_all(string c_id,
            string fee_status,
            string rec_or_pay,
            string fee_cu_id,
            string fee_item_typ,
            string fee_currency_id,
            string fee_invoice_typ,
            string fee_dat_beg,
            string fee_dat_end,
            string od_no,
            string od_typ,
            string od_project_typ,
            string od_water_way_flag,
            string od_sub_way_flag,
            string od_road_way_flag,
            string od_air_way_flag,
            string od_status_id,
            string od_route_tools_desc,
            string od_route_tools_no,
            string od_bill_nos,
            string od_cntr_nos,
            string invoice_no,
            string fee_rel_bill_no,
            string fee_limit_days_status,
            string fee_invoice_lock_flag,
            string fee_record_id,
            string fee_guess_amount )
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;
                DataTable dt = dal.get_order_fee_all(c_id,
                    fee_status,
                    rec_or_pay,
                    fee_cu_id,
                    fee_item_typ,
                    fee_currency_id,
                    fee_invoice_typ,
                    fee_dat_beg,
                    fee_dat_end,
                    od_no,
                    od_typ,
                    od_project_typ,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag,
                    od_status_id,
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_bill_nos,
                    od_cntr_nos,
                    invoice_no,
                    fee_rel_bill_no,
                    fee_limit_days_status,
                    fee_invoice_lock_flag,
                    fee_record_id,
                    fee_guess_amount, 
                    ref   rowcount,
                    ref   group_fee_desc);

                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["group_fee_desc"] = group_fee_desc;

                return data;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_order_fee_group_of_unwoa_and_commit(
            string rec_or_pay,
            string c_id,
            string fee_cu_id,
            string record_id,
            string sales_id,
            string service_id,
            string operation_id,
            string fee_dat_begin_year,
            string fee_dat_begin_month,
            string fee_dat_end_year,
            string fee_dat_end_month,

            string woa_flag,
            string invoice_flag,
            string record_invoice_flag,
            string limit_fee_dat_flag,
            string approval_flag,

            string page,
            string rows,
            string sort,
            string ordersort )
        {
            try
            {
                int rowcount = 0;

                double rec_total_amount = 0;
                double pay_total_amount = 0;
                double unreced_total_amount = 0;
                double unpayed_total_amount = 0;
                double reced_total_amount = 0;
                double payed_total_amount = 0;
                DataTable dt = dal.get_order_fee_group_of_unwoa_and_commit(rec_or_pay,
                    c_id,
                    fee_cu_id,
                    record_id,
                    sales_id,
                    service_id,
                    operation_id,
                    fee_dat_begin_year,
                    fee_dat_begin_month,
                    fee_dat_end_year,
                    fee_dat_end_month,

                    woa_flag,
                    invoice_flag,
                    record_invoice_flag,

                    limit_fee_dat_flag,
                    approval_flag,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref   rowcount,
                    ref   rec_total_amount,
                    ref   pay_total_amount,
                    ref   unreced_total_amount,
                    ref   unpayed_total_amount,
                    ref   reced_total_amount,
                    ref   payed_total_amount);

                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["rec_total_amount"] = rec_total_amount;
                data["pay_total_amount"] = pay_total_amount;
                data["unreced_total_amount"] = unreced_total_amount;
                data["unpayed_total_amount"] = unpayed_total_amount;
                data["reced_total_amount"] = reced_total_amount;
                data["payed_total_amount"] = payed_total_amount;

                return data.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 强制批量锁单 
        public string force_close_order(
            string od_seq,
            string lock_u_id)
        {
            try
            {

                bool b = dal.force_close_order(od_seq,
                    lock_u_id);

                 
                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "强制锁定完成" : "异常: 请截图并联系管理员处理。");

                
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        #endregion 

        #region 人工成本运算

        #region 计算
        public string pre_computer_fee_of_handcost(
            string c_id,
            string od_seqs,
            string fee_cu_id,
            string fee_item_typ,
            string fee_unit,
            string fee_bak,
            string fee_record_id,
            string fee_invoice_typ,
            string total_hand_cost)
        {
            try
            {
                bool bresult = false;
                DataTable dt = dal.pre_computer_fee_of_handcost(c_id,
                    od_seqs,
                    fee_cu_id,
                    fee_item_typ,
                    fee_unit,
                    fee_bak,
                    fee_record_id,
                    fee_invoice_typ,
                    total_hand_cost,
                    ref bresult);
                JObject jo = new JObject();

                if (bresult == false)
                {
                    jo["result"] = 0;
                }
                else
                {
                    jo["result"] = 1;
                    jo["fee_list"] = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));
                }

                return jo.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 写入成本

        public string insert_handcost_fee(
            string fee_record_id, 
            string data_fee
            )
        {
            try
            {
                 

                #region 2.插入费用 
                JArray lst_fee = null;

                JObject fee_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_fee);
                if (fee_item["fee_list"] != null)
                {

                    lst_fee = (JArray)fee_item["fee_list"];
                    for (int i = 0; i < lst_fee.Count; i++)
                    {

                        string fee_seq = lst_fee[i]["fee_seq"].ToString().Trim();
                        string rec_or_pay = lst_fee[i]["rec_or_pay"].ToString().Trim();
                        string fee_cu_id = lst_fee[i]["fee_cu_id"].ToString().Trim();
                        string fee_item_typ = lst_fee[i]["fee_item_typ"].ToString().Trim();
                        string fee_price = lst_fee[i]["fee_price"].ToString().Trim();
                        string fee_number = lst_fee[i]["fee_number"].ToString().Trim();
                        string fee_unit = lst_fee[i]["fee_unit"].ToString().Trim();
                        string fee_currency_rate = lst_fee[i]["fee_currency_rate"].ToString().Trim();
                        string fee_currency_id = lst_fee[i]["fee_currency_id"].ToString().Trim();
                        string fee_bak = lst_fee[i]["fee_bak"].ToString().Trim();
                        string fee_invoice_typ = lst_fee[i]["fee_invoice_typ"].ToString().Trim();
                        string od_service_seq = lst_fee[i]["od_service_seq"].ToString().Trim();
                        string od_service_sub_seq = lst_fee[i]["od_service_sub_seq"].ToString().Trim();
                        string od_seq = lst_fee[i]["od_seq"].ToString().Trim();
                        string fee_seq_out = string.Empty;
                        BLL.order.bll_order bo = new order.bll_order();

                        //这里改成 只需要 增加cntr就好了
                        bool b2 = bo.insert_order_fee(
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
                            fee_invoice_typ,
                            string.Empty,
                            string.Empty,
                            ref fee_seq_out); 
                        lst_fee[i]["fee_seq"] = fee_seq_out;
                        lst_fee[i]["fee_status_desc"] = "未归账";

                        lst_fee[i]["result"] = b2?1:0; 
                    }
                }
                #endregion
                 
                return fee_item.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 删除费用
        public string delete_fee_details(
            string fee_seqs,
            string fee_update_id)
        {
            try
            {
                bool b = dal.delete_fee_details(fee_seqs, fee_update_id);

                JObject jo = new JObject();
                jo["result"] = b ? 1 : 0;

                return jo.ToString();

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 得到费用
        public string get_order_fee_by_fee_seqs(
            string fee_seqs)
        {
            try
            {
                 string rowcount = string.Empty;
                 string group_fee_desc = string.Empty;
                 DataTable dt = dal.get_order_fee_by_fee_seqs(fee_seqs, ref rowcount, ref group_fee_desc);

                JObject jo = new JObject();
                jo["total"] = rowcount;
                jo["group_fee_desc"] = group_fee_desc;
                jo["rowcount"] = rowcount;
                jo["rows"] = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));  
                return jo.ToString();

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
