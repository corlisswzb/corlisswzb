using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

using NPOI.XWPF.UserModel;
using System.IO;
using NPOI.OpenXmlFormats.Wordprocessing;
using NPOI.OpenXmlFormats.Dml.WordProcessing;
using System.Reflection;
using System.Web;

namespace BLL.busi
{
    public class business_mgr
    {
        DAL.busi.business_mgr bi = null;

        public business_mgr()
        {
            bi = new DAL.busi.business_mgr();
        }


        #region 委托录入,修改

        public string insert_update_business(
            string busi_id,
            string state,
            string trade,
            string cpy_id,
            string busi_ie,
            string busi_type,
            string json_wt,
            string json_hw,
            string json_xq,
            string json_td,
            string json_tl,
            string json_jy,
            string json_hy,
            string create_name)
        {
            try
            {
                if (string.IsNullOrEmpty(busi_id))
                {//业务id为空，做插入操作

                    DataTable dt = bi.insert_business_main(trade, busi_type,create_name, ref busi_id);

                    //插入日志
                    BLL.busi.mes_log.insert_mes_log("业务录入", "录入业务，业务编号：" + busi_id, create_name);
                    
                }
                else
                {
                    //修改业务
                    bi.update_business_main(busi_id,trade, busi_type, create_name);

                    //插入日志
                    BLL.busi.mes_log.insert_mes_log("业务修改", "修改业务，业务编号：" + busi_id, create_name);
                }

                //新增/修改业务委托信息
                JArray jdata_wt = (JArray)(JsonConvert.DeserializeObject(json_wt));
                if (jdata_wt.Count>0)
                {

			            bi.insert_update_business(
                        busi_id,
                        cpy_id,
                        busi_ie,
                        jdata_wt[0]["bd_pr_id"].ToString(),
                        jdata_wt[0]["bd_pt_id"].ToString(),
                        jdata_wt[0]["bd_client"].ToString(),
                        jdata_wt[0]["bd_unit"].ToString(),
                        jdata_wt[0]["bd_custom_no"].ToString(),
                        jdata_wt[0]["bd_custom_from"].ToString(),
                        jdata_wt[0]["bd_trust_date"].ToString(),
                        jdata_wt[0]["bd_busi_date"].ToString(),
                        jdata_wt[0]["bd_remarks"].ToString(), state);
			           
                }


                 //新增/修改业务详情信息
                 JArray jdata_xq = (JArray)(JsonConvert.DeserializeObject(json_xq));
                 if (jdata_xq.Count > 0)
                 {
                   
                         bool b = bi.insert_update_business_details(
                             busi_id,
                             jdata_xq[0]["bs_bill_no"].ToString(),
                             jdata_xq[0]["bs_transport_typ"].ToString(),
                             jdata_xq[0]["bs_trade_typ"].ToString(),
                             jdata_xq[0]["bs_ermodal"].ToString(),
                             jdata_xq[0]["bs_operation"].ToString(),
                             jdata_xq[0]["bs_route"].ToString(),
                             jdata_xq[0]["bs_pack_method"].ToString(),
                             jdata_xq[0]["bs_dlects_method"].ToString(),
                             jdata_xq[0]["bs_pay_method"].ToString(),
                             jdata_xq[0]["bs_box_size"].ToString(),
                             jdata_xq[0]["bs_booking_agent"].ToString(),
                             jdata_xq[0]["bs_ship_type"].ToString(),
                             jdata_xq[0]["bs_shipper"].ToString(),
                             jdata_xq[0]["bs_consignee"].ToString(),
                             jdata_xq[0]["bs_notify"].ToString(),
                             jdata_xq[0]["bs_cargo_desc"].ToString(),
                             jdata_xq[0]["bs_lable"].ToString(),
                             jdata_xq[0]["bs_start_port"].ToString(),
                             jdata_xq[0]["bs_end_port"].ToString(),
                             jdata_xq[0]["bs_transfer_port"].ToString(),
                             jdata_xq[0]["bs_destination"].ToString(),
                             create_name, create_name, create_name
                         );
                     
                 
                 }


                 //新增/修改业务货物信息
                 JArray jdata_hw = (JArray)(JsonConvert.DeserializeObject(json_hw));
                 if (jdata_hw.Count > 0)
                 {

                     bi.insert_update_business_cargo(
                         busi_id,
                         jdata_hw[0]["bc_ca_id"].ToString(),
                         jdata_hw[0]["bc_pa_id"].ToString(),
                         jdata_hw[0]["bc_number"].ToString(),
                         jdata_hw[0]["bc_weight"].ToString(),
                         jdata_hw[0]["bc_volume"].ToString()
                         );

                 }

                 //新增/修改业务提单信息
                 JArray jdata_td = (JArray)(JsonConvert.DeserializeObject(json_td));
                 if (jdata_td.Count > 0)
                 {
                     bi.insert_update_business_bill(
                       busi_id,
                       jdata_td[0]["bl_main_no"].ToString(),
                       jdata_td[0]["bl_no"].ToString(),
                       jdata_td[0]["bl_type"].ToString(),
                       jdata_td[0]["bl_sign_mode"].ToString()
                       );

                 }

                 //新增/修改业务关联铁路信息
                 JArray jdata_tl = (JArray)(JsonConvert.DeserializeObject(json_tl));
                 if (jdata_tl.Count>0)
                 {
                      bi.insert_update_business_railway(
                          busi_id,
                          jdata_tl[0]["bry_s_stid"].ToString(),
                          jdata_tl[0]["bry_e_stid"].ToString(),
                          jdata_tl[0]["bry_ETD"].ToString(),
                          jdata_tl[0]["bry_ETA"].ToString(),
                          jdata_tl[0]["bry_ATD"].ToString(),
                          jdata_tl[0]["bry_ATA"].ToString(),
                          jdata_tl[0]["bry_train_num"].ToString(),
                          jdata_tl[0]["bry_cu_id"].ToString());
                 }

                 //新增/修改业务关联江运信息
                 JArray jdata_jy = (JArray)(JsonConvert.DeserializeObject(json_jy));
                 if (jdata_jy.Count > 0)
                 {
                     bi.insert_update_business_river_shipping(
                         busi_id,
                         "1",
                         jdata_jy[0]["brs_shipowner"].ToString(),
                         jdata_jy[0]["brs_name_voyage"].ToString(),
                         jdata_jy[0]["brs_ETD"].ToString(),
                         jdata_jy[0]["brs_ETA"].ToString(),
                         jdata_jy[0]["brs_ATD"].ToString(),
                         jdata_jy[0]["brs_ATA"].ToString(),
                         jdata_jy[0]["brs_load_port"].ToString(),
                         jdata_jy[0]["brs_disc_port"].ToString(),"0");
                 }

                 //新增/修改业务关联海运信息
                 JArray jdata_hy = (JArray)(JsonConvert.DeserializeObject(json_hy));
                 if (jdata_hy.Count > 0)
                 {
                     bi.insert_update_business_river_shipping(
                         busi_id,
                         "2",
                         jdata_hy[0]["brs_shipowner"].ToString(),
                         jdata_hy[0]["brs_name_voyage"].ToString(),
                         jdata_hy[0]["brs_ETD"].ToString(),
                         jdata_hy[0]["brs_ETA"].ToString(),
                         jdata_hy[0]["brs_ATD"].ToString(),
                         jdata_hy[0]["brs_ATA"].ToString(),
                         jdata_hy[0]["brs_load_port"].ToString(),
                         jdata_hy[0]["brs_disc_port"].ToString(),
                         jdata_hy[0]["brs_disc_area"].ToString()
                         );
                 }

                 //插入审批申请
                 if (state=="1")
                 {
                     insert_business_ap(busi_id, create_name);
                 }
                 

                 return "{\"result\":1,\"msg\":\"保存成功\",\"busi_id\":\"" + busi_id + "\"}";
            }
            catch (Exception)
            {
                
                throw;
            }
        }


       
        #endregion

        #region 业务获取
        public string get_business_list(
            string like_str,
            string cpy_id,
            string bd_trade,
            string bd_state,
            string bd_custom_id,
		    string page,
		    string rows,
		    string sort,
		    string order)
        {
            try
            {
                int rowcount=0;
                DataTable dt = bi.get_business_list(like_str, cpy_id,bd_trade,
                bd_state, bd_custom_id, page, rows, sort,
                order, ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 获取业务查询包含的客户列表下拉
        public string get_business_custom()
        {
            try
            {
                DataTable dt = bi.get_business_custom();
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion


        #region 新增业务审批申请
        public string insert_business_ap(string baa_busid, string baa_sponsor)
        {
            try
            {
                bool b = bi.insert_business_ap(baa_busid, baa_sponsor);

                return BLL.commone.BLL_commone.result_convert_json(b?1:0, b?"操作成功":"失败");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        

        #region 业务作废
        public string nullify_business(string busi_id)
        {
            try
            {
                bool b = bi.nullify_business(busi_id);

                return BLL.commone.BLL_commone.result_convert_json(b?1:0, b?"操作成功":"失败");
            }
            catch (Exception e)
            {

                throw;
            }
        }
        #endregion

        #region 业务获取,模拟填写选择
        public string get_business_list_for_select(
            string like_str,
            string create_uid,
            string query_id
            )
        {
            try
            {
                DataTable dt = bi.get_business_list_for_select(like_str, create_uid,query_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 费用获取,模拟填写选择
        public string get_fee_list_for_select(
           string like_str,
            string fee_type,
            string bf_fee_rp)
            
        {
            try
            {
                DataTable dt = bi.get_fee_list_for_select(like_str, fee_type, bf_fee_rp);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        

        #region 业务绑定
        public string bind_business(string bd_std_id)
        {
            try
            {
                string json = string.Empty;
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                DataTable dt_main = bi.get_business_main_form_id(bd_std_id);
                string json_busi_main = BLL.commone.BLL_commone.data_convert_jsonarray(dt_main);
                lst.Add(new KeyValuePair<string, string>("json_busi_main", json_busi_main));

                DataTable dt_busi = bi.get_business_form_id(bd_std_id);
                string json_busi = BLL.commone.BLL_commone.data_convert_jsonarray(dt_busi);
                lst.Add(new KeyValuePair<string, string>("json_busi", json_busi));

                DataTable dt_cargo = bi.get_business_cargo_form_id(bd_std_id);
                string json_cargo = BLL.commone.BLL_commone.data_convert_jsonarray(dt_cargo);
                lst.Add(new KeyValuePair<string, string>("json_cargo", json_cargo));

                DataTable dt_bill = bi.get_business_bill_form_id(bd_std_id);
                string json_bill = BLL.commone.BLL_commone.data_convert_jsonarray(dt_bill);
                lst.Add(new KeyValuePair<string, string>("json_bill", json_bill));

                DataTable dt_details = bi.get_business_details_form_id(bd_std_id);
                string json_details = BLL.commone.BLL_commone.data_convert_jsonarray(dt_details);
                lst.Add(new KeyValuePair<string, string>("json_details", json_details));

                DataTable dt_railway = bi.get_business_railway_form_id(bd_std_id);
                string json_railway = BLL.commone.BLL_commone.data_convert_jsonarray(dt_railway);
                lst.Add(new KeyValuePair<string, string>("json_railway", json_railway));

                DataTable dt_river = bi.get_business_river_shipping_form_id(bd_std_id,"1");
                string json_river = BLL.commone.BLL_commone.data_convert_jsonarray(dt_river);
                lst.Add(new KeyValuePair<string, string>("json_river", json_river));

                DataTable dt_shipping = bi.get_business_river_shipping_form_id(bd_std_id,"2");
                string json_shipping = BLL.commone.BLL_commone.data_convert_jsonarray(dt_shipping);
                lst.Add(new KeyValuePair<string, string>("json_shipping", json_shipping));

                return commone.BLL_commone.custom_convert_json(lst);
                
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        

        #region 集装箱绑定
        public string get_boxinfo(string bd_std_id)
        {
            try
            {
                DataTable dt_busi = bi.get_boxinfo(bd_std_id);
                string json_busi = BLL.commone.BLL_commone.data_convert_json(dt_busi);
                return json_busi;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 费用绑定
        public string get_business_fee(string bd_std_id, string fee_rp)
        {
            try
            {
                DataTable dt = bi.get_business_fee(bd_std_id, fee_rp);
                string json = BLL.commone.BLL_commone.data_convert_json(dt);
                return json;
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        public string bind_business_statistics(string bd_std_id)
        {
            try
            {
                DataTable dt = bi.get_business_fee_statistics(bd_std_id);
                string json = BLL.commone.BLL_commone.data_convert_jsonarray(dt);
                return json;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 费用新增
        public string insert_update_business_fee_rp(string bf_id,
           string bd_std_id,
           string bf_fee_rp,
           string bf_data,
           string bf_input_name)
        {

            try
            {

                JArray jdata = (JArray)(JsonConvert.DeserializeObject(bf_data));
                if (jdata.Count > 0)
                {
                    foreach (var item in jdata)
                    {
                         bi.insert_update_business_fee_rp(bf_id,bd_std_id,
                                    bf_fee_rp,
                                    item["bf_cu_id"].ToString(),
                                    item["bf_fee_ty"].ToString(),
                                    item["bf_tax_ty"].ToString(),
                                    item["bf_price"].ToString(),
                                    item["bf_number"].ToString(),
                                    item["bf_unit"].ToString(),
                                    item["bf_cr_id"].ToString(),
                                    item["bf_rate"].ToString(),
                                    item["bf_rrmb"].ToString(),
                                    item["bf_in_id"].ToString(),
                                    item["bf_taxes"].ToString(),
                                    item["bf_etax_amount"].ToString(),
                                    bf_input_name);
                    }
                    
                }

                return BLL.commone.BLL_commone.result_convert_json(1, "保存成功" );
            }
            catch (Exception)
            {
                
                throw;
            }
        
        
        }


        public string insert_business_fee_statistics(string bd_std_id,
            string bfs_get_money,
            string bfs_pay_money,
            string bfs_get_after_tax,
            string bfs_pay_after_tax,
            string bfs_profit,
            string bfs_after_profit,
            string bfs_interest_rate,
            string bfs_remarks)
        {

            try
            {
                bool b = bi.insert_business_fee_statistics( bd_std_id,
                 bfs_get_money,
                 bfs_pay_money,
                 bfs_get_after_tax,
                 bfs_pay_after_tax,
                 bfs_profit,
                 bfs_after_profit,
                 bfs_interest_rate,
                 bfs_remarks);

                return BLL.commone.BLL_commone.result_convert_json(b?1:0, b?"保存成功": "操作失败");
            }
            catch (Exception)
            {

                throw;
            }


        }
        #endregion

        #region 删除费用
        public string delete_fee_rp(string bf_id)
        {
            try
            {
                bool b = bi.delete_fee_rp(bf_id);
                return BLL.commone.BLL_commone.result_convert_json(b?1:0, b? "删除成功":"删除失败");
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 新增装箱
        public string insert_packing(string bd_std_id, string pack_data)
        {
            try
            {
                bi.delete_packing_from_id(bd_std_id);

                bool b = false;

                JArray jdata = (JArray)(JsonConvert.DeserializeObject(pack_data));
                string[] arr = new string[jdata.Count];
                for (int i = 0; i < jdata.Count; i++)
                {
                    arr[i] = jdata[i]["bc_size"].ToString() + jdata[i]["bc_typ"].ToString();

                   b = bi.insert_business_container(bd_std_id,
                        jdata[i]["bc_size"].ToString(),
                        jdata[i]["bc_typ"].ToString(),
                        jdata[i]["bc_no"].ToString(),
                        jdata[i]["bc_ship_fno"].ToString(),
                        jdata[i]["bc_sea_fno"].ToString(),
                        jdata[i]["bc_sum"].ToString(),
                        jdata[i]["bc_weight"].ToString(),
                        jdata[i]["bc_volume"].ToString());

                }
                if (b)
                {
                    string box_size_num = get_box_size_num(arr);
                    bi.update_box_size_num(bd_std_id, box_size_num);

                    return "{\"result\":" + 1 + ",\"msg\":\"新增装箱成功\",\"box_size_num\":\"" + box_size_num + "\"}";
                }
                else
                {
                    return BLL.commone.BLL_commone.result_convert_json(-1, "新增失败");
                }

            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 获取订舱委托书需要的数据，根据业务id
        public string get_date_for_shipping_note(string busi_no)
        {
            try
            {
                DataTable dt = bi.get_date_for_shipping_note(busi_no);
                string json = BLL.commone.BLL_commone.data_convert_jsonarray(dt);
                return json;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 返回港口模糊查询的全称
        public string port_like_filter(string like_q)
        {
            try
            {
                string return_q="";
                bool b = bi.port_like_filter(like_q,ref return_q);
                if (b){
                    return "{\"result\":1,\"return_q\":" + return_q + "}";
                }else{
                    return "{\"result\":-1,\"return_q\":" + like_q + "}";
                }
  
            }
            catch (Exception e)
            {

                throw;
            }
        }
        #endregion

        public static string get_box_size_num(string[] arr)
        {
            string return_string = "";
            foreach (var grp in arr.GroupBy(c => c))
            {

                return_string += grp.Count().ToString() + "✖" + grp.Key.ToString() + ',';
            }

            return return_string.Trim(',');
        }
    }
}
