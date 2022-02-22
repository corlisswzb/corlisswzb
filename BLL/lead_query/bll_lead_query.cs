using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using DAL.lead_query;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using CAL.ld_query_fee_group;

namespace BLL.lead_query
{
    public class bll_lead_query
    {
         dal_lead_query dal = null;

         public bll_lead_query()
         {
             dal = new dal_lead_query();
         }

        #region 费用统计
         public string get_order_fee_group(
             string rec_or_pay,
             string c_id,
             string record_id,
             string sales_id,
             string service_id,
             string operation_id,

             string fee_cu_id,
             string fee_dat_begin_year,
             string fee_dat_begin_month,
             string fee_dat_end_year,
             string fee_dat_end_month)
         {
             try
             {
                 DataTable dt = dal.get_order_fee_group( rec_or_pay,
                     c_id,
                     record_id,
                     sales_id,
                     service_id,
                     operation_id,

                     fee_cu_id,
                     fee_dat_begin_year,
                     fee_dat_begin_month,
                     fee_dat_end_year,
                     fee_dat_end_month);

                 return BLL.commone.BLL_commone.data_convert_json(dt);

             }
             catch (Exception e)
             {
                 throw e;
             }
         }

         public List<ld_fee_group_info> get_order_fee_group_list(
              string rec_or_pay,
              string c_id,
              string record_id,
              string sales_id,
              string service_id,
              string operation_id, 
              string fee_cu_id,
              string fee_dat_begin_year,
              string fee_dat_begin_month,
              string fee_dat_end_year,
              string fee_dat_end_month)
         {
             try
             {
                 DataTable dt = dal.get_order_fee_group(rec_or_pay,
                     c_id,
                     record_id,
                     sales_id,
                     service_id,
                     operation_id,

                     fee_cu_id,
                     fee_dat_begin_year,
                     fee_dat_begin_month,
                     fee_dat_end_year,
                     fee_dat_end_month);

                 if (dt == null || dt.Rows.Count == 0) return null;

                 List<ld_fee_group_info> lst = new List<ld_fee_group_info>();

                 int nStep = 1; 
                 foreach(DataRow dr in dt.Rows){
                     lst.Add(new ld_fee_group_info(
                         nStep.ToString(),
                        dr["fee_cu_desc"].ToString(),
                        dr["cr_name"].ToString(),
                        dr["fee_amount"].ToString(),
                        dr["woa_total_money"].ToString(),
                        dr["woa_total_money_of_noneinvoice"].ToString(),
                        dr["woa_total_money_of_invoice"].ToString(),
                        dr["unwoa_total_money"].ToString(),
                        dr["unwoa_total_money_of_noneinvoice"].ToString(),
                        dr["unwoa_total_money_of_invoice"].ToString(),
                        dr["fee_amount_of_uncommit"].ToString(),
                        dr["fee_amount_of_uncommit_of_noneinvoice"].ToString(),
                        dr["fee_amount_of_uncommit_of_invoice"].ToString(),
                        dr["fee_amount_of_commit"].ToString(),
                        dr["woa_amount_of_commit"].ToString(),
                        dr["woa_amount_of_commit_of_noneinvoice"].ToString(),
                        dr["woa_amount_of_commit_of_invoice"].ToString(),
                        dr["woa_amount_of_commit_of_invoice_of_unrecord"].ToString(),
                        dr["woa_amount_of_commit_of_invoice_of_record"].ToString(),
                        dr["unwoa_amount_of_commit"].ToString(),
                        dr["unwoa_amount_of_commit_of_noneinvoice"].ToString(),
                        dr["unwoa_amount_of_commit_of_invoice"].ToString(),
                        dr["unwoa_amount_of_commit_of_invoice_of_unrecord"].ToString(),
                        dr["unwoa_amount_of_commit_of_invoice_of_record"].ToString(),
                        dr["unwoa_amount_of_commit_of_limit"].ToString(),
                        dr["unwoa_amount_of_commit_of_unlimit"].ToString()
                         ));
                     nStep++;
                 }
                 return lst;

                 
             }
             catch (Exception e)
             {
                 throw e;
             }
         }
         #endregion 

        #region 根据员工统计
         public string get_rpt_of_worker_group(
            string c_id,
            string worker_user_typ,
            string u_id,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month 
            )
         {
             try
             {
                string out_sum_of_order_count = string.Empty;
                string out_sum_of_cargo_weight = string.Empty;
                string out_sum_of_cargo_packing_number = string.Empty;
                string out_sum_of_cargo_bluk = string.Empty;
                string out_sum_of_cntr_u = string.Empty;
                string out_sum_of_cntr_t = string.Empty;
                string out_sum_of_20 = string.Empty;
                string out_sum_of_40 = string.Empty;
                string out_sum_of_45 = string.Empty;
                string out_sum_of_rec_amount = string.Empty;
                string out_sum_of_rec_amount_of_base = string.Empty;
                string out_sum_of_reced_amount = string.Empty;
                string out_sum_of_reced_amount_of_base = string.Empty;
                string out_sum_of_unreced_amount = string.Empty;
                string out_sum_of_unreced_amount_of_base = string.Empty;
                string out_sum_of_pay_amount = string.Empty;
                string out_sum_of_pay_amount_of_base = string.Empty;
                string out_sum_of_payed_amount = string.Empty;
                string out_sum_of_payed_amount_of_base = string.Empty;
                string out_sum_of_unpayed_amount = string.Empty;
                string out_sum_of_unpayed_amount_of_base = string.Empty;
                string out_sum_of_profit_amoun = string.Empty;
                string out_sum_of_profit_amount_of_base = string.Empty;
                string out_sum_of_percent_profit = string.Empty;
                DataTable dt = dal.get_rpt_of_worker_group(c_id,
                    worker_user_typ ,
                    u_id , 
                    beg_year,
                    end_year,
                    beg_month ,
                    end_month , 
                    ref out_sum_of_order_count ,
                    ref out_sum_of_cargo_weight,
                    ref out_sum_of_cargo_packing_number ,
                    ref out_sum_of_cargo_bluk ,
                    ref out_sum_of_cntr_u ,
                    ref out_sum_of_cntr_t ,
                    ref out_sum_of_20 ,
                    ref out_sum_of_40 ,
                    ref out_sum_of_45 ,
                    ref out_sum_of_rec_amount,
                    ref out_sum_of_rec_amount_of_base,
                    ref out_sum_of_reced_amount ,
                    ref out_sum_of_reced_amount_of_base,
                    ref out_sum_of_unreced_amount,
                    ref out_sum_of_unreced_amount_of_base,
                    ref out_sum_of_pay_amount,
                    ref out_sum_of_pay_amount_of_base,
                    ref out_sum_of_payed_amount,
                    ref out_sum_of_payed_amount_of_base,
                    ref out_sum_of_unpayed_amount,
                    ref out_sum_of_unpayed_amount_of_base,
                    ref out_sum_of_profit_amoun,
                    ref out_sum_of_profit_amount_of_base,
                    ref out_sum_of_percent_profit); 
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["out_sum_of_order_count"] = out_sum_of_order_count;
                ja["out_sum_of_cargo_weight"] = out_sum_of_cargo_weight;
                ja["out_sum_of_cargo_packing_number"] = out_sum_of_cargo_packing_number;
                ja["out_sum_of_cargo_bluk"] = out_sum_of_cargo_bluk;
                ja["out_sum_of_cntr_u"] = out_sum_of_cntr_u;
                ja["out_sum_of_cntr_t"] = out_sum_of_cntr_t;
                ja["out_sum_of_20"] = out_sum_of_20;
                ja["out_sum_of_40"] = out_sum_of_40;
                ja["out_sum_of_45"] = out_sum_of_45;
                ja["out_sum_of_rec_amount"] = out_sum_of_rec_amount;
                ja["out_sum_of_rec_amount_of_base"] = out_sum_of_rec_amount_of_base;
                ja["out_sum_of_reced_amount"] = out_sum_of_reced_amount;
                ja["out_sum_of_reced_amount_of_base"] = out_sum_of_reced_amount_of_base;
                ja["out_sum_of_unreced_amount"] = out_sum_of_unreced_amount;
                ja["out_sum_of_unreced_amount_of_base"] = out_sum_of_unreced_amount_of_base;
                ja["out_sum_of_pay_amount"] = out_sum_of_pay_amount;
                ja["out_sum_of_pay_amount_of_base"] = out_sum_of_pay_amount_of_base;
                ja["out_sum_of_payed_amount"] = out_sum_of_payed_amount;
                ja["out_sum_of_payed_amount_of_base"] = out_sum_of_payed_amount_of_base;
                ja["out_sum_of_unpayed_amount"] = out_sum_of_unpayed_amount;
                ja["out_sum_of_unpayed_amount_of_base"] = out_sum_of_unpayed_amount_of_base;
                ja["out_sum_of_profit_amoun"] = out_sum_of_profit_amoun;
                ja["out_sum_of_profit_amount_of_base"] = out_sum_of_profit_amount_of_base;
                ja["out_sum_of_percent_profit"] = out_sum_of_percent_profit;

                return ja.ToString();
             }
             catch (Exception e)
             {
                 throw e;
             }
         }
         //查询 相关委托
         public string get_rpt_of_worker_group_of_order_list(
             string c_id,
             string worker_user_typ,
             string u_id,
             string beg_year,
             string end_year,
             string beg_month,
             string end_month
             )
         {
             try
             {
                 string rowcount = string.Empty;
                 string group_fee_desc = string.Empty;

                 DataTable dt = dal.get_rpt_of_worker_group_of_order_list(c_id,
                     worker_user_typ,
                     u_id,
                     beg_year,
                     end_year,
                     beg_month,
                     end_month,
                     ref rowcount,
                     ref group_fee_desc);
                 string json = BLL.commone.BLL_commone.data_convert_json(dt);
                 JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
 
                 ja["group_fee_desc"] = group_fee_desc; 

                 return ja.ToString();
             }
             catch (Exception e)
             {
                 throw e;
             }
         }
        //查询相关费用 
        public string get_rpt_of_worker_group_of_fee_list(
            string c_id,
            string worker_user_typ,
            string u_id,
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
        )
        {
             try
             {
                 
                 string group_fee_desc = string.Empty;

                 DataTable dt = dal.get_rpt_of_worker_group_of_fee_list(c_id,
                     worker_user_typ,
                     u_id,
                     rec_or_pay,
                     beg_year,
                     end_year,
                     beg_month,
                     end_month, 
                     ref group_fee_desc);
                 string json = BLL.commone.BLL_commone.data_convert_json(dt);
                 JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                 ja["group_fee_desc"] = group_fee_desc;

                 return ja.ToString();
             }
             catch (Exception e)
             {
                 throw e;
             }
         }

        //查询相关集装箱 
        public string get_rpt_of_worker_group_of_cntr_list(
            string c_id,
            string worker_user_typ,
            string u_id, 
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
        )
        {
            try
            {

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_rpt_of_worker_group_of_cntr_list(c_id,
                    worker_user_typ,
                    u_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month );
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                 
                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
         #endregion 

        #region 根据委托单位统计
        public string get_rpt_of_delegate_group(
           string c_id, 
           string delete_id,
           string beg_year,
           string end_year,
           string beg_month,
           string end_month
           )
        {
            try
            {
                string out_sum_of_order_count = string.Empty;
                string out_sum_of_cargo_weight = string.Empty;
                string out_sum_of_cargo_packing_number = string.Empty;
                string out_sum_of_cargo_bluk = string.Empty;
                string out_sum_of_cntr_u = string.Empty;
                string out_sum_of_cntr_t = string.Empty;
                string out_sum_of_20 = string.Empty;
                string out_sum_of_40 = string.Empty;
                string out_sum_of_45 = string.Empty;
                string out_sum_of_rec_amount = string.Empty;
                string out_sum_of_rec_amount_of_base = string.Empty;
                string out_sum_of_reced_amount = string.Empty;
                string out_sum_of_reced_amount_of_base = string.Empty;
                string out_sum_of_unreced_amount = string.Empty;
                string out_sum_of_unreced_amount_of_base = string.Empty;
                string out_sum_of_pay_amount = string.Empty;
                string out_sum_of_pay_amount_of_base = string.Empty;
                string out_sum_of_payed_amount = string.Empty;
                string out_sum_of_payed_amount_of_base = string.Empty;
                string out_sum_of_unpayed_amount = string.Empty;
                string out_sum_of_unpayed_amount_of_base = string.Empty;
                string out_sum_of_profit_amoun = string.Empty;
                string out_sum_of_profit_amount_of_base = string.Empty;
                string out_sum_of_percent_profit = string.Empty;
                DataTable dt = dal.get_rpt_of_delegate_group(c_id, 
                    delete_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                    ref out_sum_of_order_count,
                    ref out_sum_of_cargo_weight,
                    ref out_sum_of_cargo_packing_number,
                    ref out_sum_of_cargo_bluk,
                    ref out_sum_of_cntr_u,
                    ref out_sum_of_cntr_t,
                    ref out_sum_of_20,
                    ref out_sum_of_40,
                    ref out_sum_of_45,
                    ref out_sum_of_rec_amount,
                    ref out_sum_of_rec_amount_of_base,
                    ref out_sum_of_reced_amount,
                    ref out_sum_of_reced_amount_of_base,
                    ref out_sum_of_unreced_amount,
                    ref out_sum_of_unreced_amount_of_base,
                    ref out_sum_of_pay_amount,
                    ref out_sum_of_pay_amount_of_base,
                    ref out_sum_of_payed_amount,
                    ref out_sum_of_payed_amount_of_base,
                    ref out_sum_of_unpayed_amount,
                    ref out_sum_of_unpayed_amount_of_base,
                    ref out_sum_of_profit_amoun,
                    ref out_sum_of_profit_amount_of_base,
                    ref out_sum_of_percent_profit);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["out_sum_of_order_count"] = out_sum_of_order_count;
                ja["out_sum_of_cargo_weight"] = out_sum_of_cargo_weight;
                ja["out_sum_of_cargo_packing_number"] = out_sum_of_cargo_packing_number;
                ja["out_sum_of_cargo_bluk"] = out_sum_of_cargo_bluk;
                ja["out_sum_of_cntr_u"] = out_sum_of_cntr_u;
                ja["out_sum_of_cntr_t"] = out_sum_of_cntr_t;
                ja["out_sum_of_20"] = out_sum_of_20;
                ja["out_sum_of_40"] = out_sum_of_40;
                ja["out_sum_of_45"] = out_sum_of_45;
                ja["out_sum_of_rec_amount"] = out_sum_of_rec_amount;
                ja["out_sum_of_rec_amount_of_base"] = out_sum_of_rec_amount_of_base;
                ja["out_sum_of_reced_amount"] = out_sum_of_reced_amount;
                ja["out_sum_of_reced_amount_of_base"] = out_sum_of_reced_amount_of_base;
                ja["out_sum_of_unreced_amount"] = out_sum_of_unreced_amount;
                ja["out_sum_of_unreced_amount_of_base"] = out_sum_of_unreced_amount_of_base;
                ja["out_sum_of_pay_amount"] = out_sum_of_pay_amount;
                ja["out_sum_of_pay_amount_of_base"] = out_sum_of_pay_amount_of_base;
                ja["out_sum_of_payed_amount"] = out_sum_of_payed_amount;
                ja["out_sum_of_payed_amount_of_base"] = out_sum_of_payed_amount_of_base;
                ja["out_sum_of_unpayed_amount"] = out_sum_of_unpayed_amount;
                ja["out_sum_of_unpayed_amount_of_base"] = out_sum_of_unpayed_amount_of_base;
                ja["out_sum_of_profit_amoun"] = out_sum_of_profit_amoun;
                ja["out_sum_of_profit_amount_of_base"] = out_sum_of_profit_amount_of_base;
                ja["out_sum_of_percent_profit"] = out_sum_of_percent_profit;

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询 相关委托
        public string get_rpt_of_delegate_group_of_order_list(
            string c_id, 
            string delete_id,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
            )
        {
            try
            {
                string rowcount = string.Empty;
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_rpt_of_delegate_group_of_order_list(c_id,
                    
                    delete_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                    ref rowcount,
                    ref group_fee_desc);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["group_fee_desc"] = group_fee_desc;

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询相关费用 
        public string get_rpt_of_delegate_group_of_fee_list(
            string c_id,
            
            string delete_id,
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
        )
        {
            try
            {

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_rpt_of_delegate_group_of_fee_list(c_id,
                   
                    delete_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                    ref group_fee_desc);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["group_fee_desc"] = group_fee_desc;

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //查询相关集装箱 
        public string get_rpt_of_delegate_group_of_cntr_list(
            string c_id, 
            string delete_id,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
        )
        {
            try
            {

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_rpt_of_delegate_group_of_cntr_list(c_id,
                   
                    delete_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 根据结算单位统计
        public string get_rpt_of_fee_cu_group(
           string c_id,
           string fee_cu_id,
            string rec_or_pay,
           string beg_year,
           string end_year,
           string beg_month,
           string end_month
           )
        {
            try
            {
              
                string out_sum_of_rec_amount = string.Empty;
                string out_sum_of_rec_amount_of_base = string.Empty;
                string out_sum_of_reced_amount = string.Empty;
                string out_sum_of_reced_amount_of_base = string.Empty;
                string out_sum_of_unreced_amount = string.Empty;
                string out_sum_of_unreced_amount_of_base = string.Empty;
                string out_sum_of_pay_amount = string.Empty;
                string out_sum_of_pay_amount_of_base = string.Empty;
                string out_sum_of_payed_amount = string.Empty;
                string out_sum_of_payed_amount_of_base = string.Empty;
                string out_sum_of_unpayed_amount = string.Empty;
                string out_sum_of_unpayed_amount_of_base = string.Empty;
              
                DataTable dt = dal.get_rpt_of_fee_cu_group(c_id,
                    fee_cu_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                  
                    ref out_sum_of_rec_amount,
                    ref out_sum_of_rec_amount_of_base,
                    ref out_sum_of_reced_amount,
                    ref out_sum_of_reced_amount_of_base,
                    ref out_sum_of_unreced_amount,
                    ref out_sum_of_unreced_amount_of_base,
                    ref out_sum_of_pay_amount,
                    ref out_sum_of_pay_amount_of_base,
                    ref out_sum_of_payed_amount,
                    ref out_sum_of_payed_amount_of_base,
                    ref out_sum_of_unpayed_amount,
                    ref out_sum_of_unpayed_amount_of_base );
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                
                ja["out_sum_of_rec_amount"] = out_sum_of_rec_amount;
                ja["out_sum_of_rec_amount_of_base"] = out_sum_of_rec_amount_of_base;
                ja["out_sum_of_reced_amount"] = out_sum_of_reced_amount;
                ja["out_sum_of_reced_amount_of_base"] = out_sum_of_reced_amount_of_base;
                ja["out_sum_of_unreced_amount"] = out_sum_of_unreced_amount;
                ja["out_sum_of_unreced_amount_of_base"] = out_sum_of_unreced_amount_of_base;
                ja["out_sum_of_pay_amount"] = out_sum_of_pay_amount;
                ja["out_sum_of_pay_amount_of_base"] = out_sum_of_pay_amount_of_base;
                ja["out_sum_of_payed_amount"] = out_sum_of_payed_amount;
                ja["out_sum_of_payed_amount_of_base"] = out_sum_of_payed_amount_of_base;
                ja["out_sum_of_unpayed_amount"] = out_sum_of_unpayed_amount;
                ja["out_sum_of_unpayed_amount_of_base"] = out_sum_of_unpayed_amount_of_base;
             

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询 相关委托
        public string get_rpt_of_fee_cu_group_of_order_list(
            string c_id,
            string fee_cu_id,
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
            )
        {
            try
            {
                string rowcount = string.Empty;
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_rpt_of_fee_cu_group_of_order_list(c_id,

                    fee_cu_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                    ref rowcount,
                    ref group_fee_desc);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["group_fee_desc"] = group_fee_desc;

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询相关费用 
        public string get_rpt_of_fee_cu_group_of_fee_list(
            string c_id,

            string fee_cu_id,
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
        )
        {
            try
            {

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_rpt_of_fee_cu_group_of_fee_list(c_id,

                    fee_cu_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                    ref group_fee_desc);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["group_fee_desc"] = group_fee_desc;

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

         
        #endregion 

        #region 利润分析表
        public string get_rpt_of_order_typ_group(
           string c_id, 
           string beg_year,
           string end_year,
           string beg_month,
           string end_month
           )
        {
            try
            {
                string out_sum_of_order_count = string.Empty; 
                string out_sum_of_cntr_u = string.Empty;
                string out_sum_of_cntr_t = string.Empty;
                string out_sum_of_20 = string.Empty;
                string out_sum_of_40 = string.Empty;
                string out_sum_of_45 = string.Empty;
                string out_sum_of_rec_amount = string.Empty;
                string out_sum_of_rec_amount_of_base = string.Empty;
                string out_sum_of_reced_amount = string.Empty;
                string out_sum_of_reced_amount_of_base = string.Empty;
                string out_sum_of_unreced_amount = string.Empty;
                string out_sum_of_unreced_amount_of_base = string.Empty;
                string out_sum_of_pay_amount = string.Empty;
                string out_sum_of_pay_amount_of_base = string.Empty;
                string out_sum_of_payed_amount = string.Empty;
                string out_sum_of_payed_amount_of_base = string.Empty;
                string out_sum_of_unpayed_amount = string.Empty;
                string out_sum_of_unpayed_amount_of_base = string.Empty;
                string out_sum_of_profit_amoun = string.Empty;
                string out_sum_of_profit_amount_of_base = string.Empty;
                string out_sum_of_percent_profit = string.Empty;
                DataTable dt = dal.get_rpt_of_order_typ_group(c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                    ref out_sum_of_order_count,
                    
                    ref out_sum_of_cntr_u,
                    ref out_sum_of_cntr_t,
                    ref out_sum_of_20,
                    ref out_sum_of_40,
                    ref out_sum_of_45,
                    ref out_sum_of_rec_amount,
                    ref out_sum_of_rec_amount_of_base,
                    ref out_sum_of_reced_amount,
                    ref out_sum_of_reced_amount_of_base,
                    ref out_sum_of_unreced_amount,
                    ref out_sum_of_unreced_amount_of_base,
                    ref out_sum_of_pay_amount,
                    ref out_sum_of_pay_amount_of_base,
                    ref out_sum_of_payed_amount,
                    ref out_sum_of_payed_amount_of_base,
                    ref out_sum_of_unpayed_amount,
                    ref out_sum_of_unpayed_amount_of_base,
                    ref out_sum_of_profit_amoun,
                    ref out_sum_of_profit_amount_of_base,
                    ref out_sum_of_percent_profit);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["out_sum_of_order_count"] = out_sum_of_order_count;
               
                ja["out_sum_of_cntr_u"] = out_sum_of_cntr_u;
                ja["out_sum_of_cntr_t"] = out_sum_of_cntr_t;
                ja["out_sum_of_20"] = out_sum_of_20;
                ja["out_sum_of_40"] = out_sum_of_40;
                ja["out_sum_of_45"] = out_sum_of_45;
                ja["out_sum_of_rec_amount"] = out_sum_of_rec_amount;
                ja["out_sum_of_rec_amount_of_base"] = out_sum_of_rec_amount_of_base;
                ja["out_sum_of_reced_amount"] = out_sum_of_reced_amount;
                ja["out_sum_of_reced_amount_of_base"] = out_sum_of_reced_amount_of_base;
                ja["out_sum_of_unreced_amount"] = out_sum_of_unreced_amount;
                ja["out_sum_of_unreced_amount_of_base"] = out_sum_of_unreced_amount_of_base;
                ja["out_sum_of_pay_amount"] = out_sum_of_pay_amount;
                ja["out_sum_of_pay_amount_of_base"] = out_sum_of_pay_amount_of_base;
                ja["out_sum_of_payed_amount"] = out_sum_of_payed_amount;
                ja["out_sum_of_payed_amount_of_base"] = out_sum_of_payed_amount_of_base;
                ja["out_sum_of_unpayed_amount"] = out_sum_of_unpayed_amount;
                ja["out_sum_of_unpayed_amount_of_base"] = out_sum_of_unpayed_amount_of_base;
                ja["out_sum_of_profit_amoun"] = out_sum_of_profit_amoun;
                ja["out_sum_of_profit_amount_of_base"] = out_sum_of_profit_amount_of_base;
                ja["out_sum_of_percent_profit"] = out_sum_of_percent_profit;

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询 相关委托
        //public string get_rpt_of_delegate_group_of_order_list(
        //    string c_id,
        //    string delete_id,
        //    string beg_year,
        //    string end_year,
        //    string beg_month,
        //    string end_month
        //    )
        //{
        //    try
        //    {
        //        string rowcount = string.Empty;
        //        string group_fee_desc = string.Empty;

        //        DataTable dt = dal.get_rpt_of_delegate_group_of_order_list(c_id,

        //            delete_id,
        //            beg_year,
        //            end_year,
        //            beg_month,
        //            end_month,
        //            ref rowcount,
        //            ref group_fee_desc);
        //        string json = BLL.commone.BLL_commone.data_convert_json(dt);
        //        JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

        //        ja["group_fee_desc"] = group_fee_desc;

        //        return ja.ToString();
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        ////查询相关费用 
        //public string get_rpt_of_delegate_group_of_fee_list(
        //    string c_id,

        //    string delete_id,
        //    string rec_or_pay,
        //    string beg_year,
        //    string end_year,
        //    string beg_month,
        //    string end_month
        //)
        //{
        //    try
        //    {

        //        string group_fee_desc = string.Empty;

        //        DataTable dt = dal.get_rpt_of_delegate_group_of_fee_list(c_id,

        //            delete_id,
        //            rec_or_pay,
        //            beg_year,
        //            end_year,
        //            beg_month,
        //            end_month,
        //            ref group_fee_desc);
        //        string json = BLL.commone.BLL_commone.data_convert_json(dt);
        //        JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

        //        ja["group_fee_desc"] = group_fee_desc;

        //        return ja.ToString();
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

        ////查询相关集装箱 
        //public string get_rpt_of_delegate_group_of_cntr_list(
        //    string c_id,
        //    string delete_id,
        //    string beg_year,
        //    string end_year,
        //    string beg_month,
        //    string end_month
        //)
        //{
        //    try
        //    {

        //        string group_fee_desc = string.Empty;

        //        DataTable dt = dal.get_rpt_of_delegate_group_of_cntr_list(c_id,

        //            delete_id,
        //            beg_year,
        //            end_year,
        //            beg_month,
        //            end_month);
        //        string json = BLL.commone.BLL_commone.data_convert_json(dt);
        //        JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

        //        return ja.ToString();
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        #endregion 

        #region 根据船公司统计
        public string get_rpt_of_ship_group(
           string c_id, 
           string beg_year,
           string end_year,
           string beg_month,
           string end_month
           )
        {
            try
            {
                string out_sum_of_order_count = string.Empty;
                string out_sum_of_cntr_u = string.Empty;
                string out_sum_of_cntr_t = string.Empty;
                string out_sum_of_20 = string.Empty;
                string out_sum_of_40 = string.Empty;
                string out_sum_of_45 = string.Empty;
              
                DataTable dt = dal.get_rpt_of_ship_group(c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                    ref out_sum_of_order_count, 
                    ref out_sum_of_cntr_u,
                    ref out_sum_of_cntr_t,
                    ref out_sum_of_20,
                    ref out_sum_of_40,
                    ref out_sum_of_45 
                 );
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["out_sum_of_order_count"] = out_sum_of_order_count; 
                ja["out_sum_of_cntr_u"] = out_sum_of_cntr_u;
                ja["out_sum_of_cntr_t"] = out_sum_of_cntr_t;
                ja["out_sum_of_20"] = out_sum_of_20;
                ja["out_sum_of_40"] = out_sum_of_40;
                ja["out_sum_of_45"] = out_sum_of_45;
                

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询 相关委托
        public string get_rpt_of_ship_group_of_order_list(
            string od_route_tools_desc,
            string od_route_tools_no,
            string od_route_tools_owner,
            string c_id, 
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
            )
        {
            try
            {
                string rowcount = string.Empty;
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_rpt_of_ship_group_of_order_list(od_route_tools_desc,
             od_route_tools_no,
             od_route_tools_owner,
             c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                    ref rowcount,
                    ref group_fee_desc);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["group_fee_desc"] = group_fee_desc;

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询相关费用 
        public string get_rpt_of_ship_group_of_fee_list(string od_route_tools_desc,
            string od_route_tools_no,
            string od_route_tools_owner,
            string c_id, 
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
        )
        {
            try
            {

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_rpt_of_ship_group_of_fee_list(  od_route_tools_desc,
              od_route_tools_no,
              od_route_tools_owner,
              c_id, 
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month,
                    ref group_fee_desc);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                ja["group_fee_desc"] = group_fee_desc;

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //查询相关集装箱 
        public string get_rpt_of_ship_group_of_cntr_list(string od_route_tools_desc,
            string od_route_tools_no,
            string od_route_tools_owner,
            string c_id, 
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
        )
        {
            try
            {

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_rpt_of_ship_group_of_cntr_list(  od_route_tools_desc,
              od_route_tools_no,
              od_route_tools_owner,
              c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 为结算完整的统计
        public string get_rpt_of_unwoa_group(
            string c_id, 
            string u_id,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
            )
        {
            try
            {

                DataTable dt = dal.get_rpt_of_unwoa_group(c_id, 
                    u_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month );
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                JObject ja = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                 
                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
    }
}
