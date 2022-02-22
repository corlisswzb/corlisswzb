using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using DAL.order;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net;

namespace BLL.order
{
    public class bll_order
    {
        dal_order dal = null;

        public bll_order()
        {
            dal = new dal_order();
        }

        #region 业务订单

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
            string u_id,
            string od_bill_nos,
            string od_cntr_nos,
            string od_route_tools_desc,
            string od_route_tools_no,
            string fee_cu_id,
            string od_water_way_flag,
            string od_sub_way_flag,
            string od_road_way_flag,
            string od_air_way_flag,
           // string include_all_service,
            string page,
            string rows,
            string sort,
            string ordersort)
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
                    u_id,
                    od_bill_nos,
                    od_cntr_nos,
                    od_route_tools_desc,
                    od_route_tools_no,
                    fee_cu_id,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag,
                   // include_all_service,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount,
                    ref group_fee_desc);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("group_fee_desc", group_fee_desc));

                return commone.BLL_commone.data_convert_json(dt, rowcount,lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 单个订单查询
        #region 订单基本信息和货物资料
        public string get_order_single(string od_seq,
            string u_id)
        {
            try
            {
                DataTable dt = dal.get_order_single(od_seq, u_id);

                return commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
         
        #endregion

        #region 订单 箱量
        public string get_cntr_group(string od_seq )
        {
            try
            {
                DataTable dt = dal.get_cntr_group(od_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
         
        #region 基本信息及货物资料、箱量、关联文件 打包 
        public string get_order_single_collections(string od_seq,string u_id)
        {
            try
            { 
                List<KeyValuePair<string,string>> lst = new List<KeyValuePair<string,string>>();

                string order_base_info_and_cargo_info = get_order_single(od_seq, u_id);

                lst.Add(new KeyValuePair<string,string>( "order_base_info_and_cargo_info",order_base_info_and_cargo_info));

                string order_cntr_group_info = get_cntr_group(od_seq);
                lst.Add(new KeyValuePair<string,string>("order_cntr_group_info",order_cntr_group_info));

                string order_contract_file_info = get_order_contract_file_info(od_seq);
                lst.Add(new KeyValuePair<string,string>("order_contract_file_info",order_contract_file_info));
                 
                string order_cntr_list = get_order_cntr(od_seq);
                lst.Add(new KeyValuePair<string, string>("order_cntr_list", order_cntr_list));

                string order_cntr_stuffing_list = get_order_cntr_file_info(od_seq);
                lst.Add(new KeyValuePair<string, string>("order_cntr_stuffing_list", order_cntr_stuffing_list));

                string order_booking_note_list = get_order_booking_note_arr(od_seq);

                lst.Add(new KeyValuePair<string, string>("order_booking_note_list", order_booking_note_list));


                return commone.BLL_commone.custom_convert_json(lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 订单集装箱
        public string get_order_cntr(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_order_cntr(od_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_order_cntr_data(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_order_cntr(od_seq);

                return commone.BLL_commone.data_convert_json(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 集装箱 、等等(未定) 打包
        public string get_order_cntr_and_etc_collections(string od_seq)
        {
            try
            {
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                string order_cntr_list = get_order_cntr(od_seq); 
                lst.Add(new KeyValuePair<string, string>("order_cntr_list", order_cntr_list));

                string order_cntr_stuffing_list = get_order_cntr_file_info(od_seq);
                lst.Add(new KeyValuePair<string, string>("order_cntr_stuffing_list", order_cntr_stuffing_list));

                return commone.BLL_commone.custom_convert_json(lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
  
        #region 获取 订舱单信息
        public string get_order_booking_note(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_order_booking_note(od_seq);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_order_booking_note_arr(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_order_booking_note(od_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 服务商
        public string get_service(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_service(od_seq);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 服务的 批次 
        public string get_service_sub(string od_seq,
            string od_service_seq)
        {
            try
            {
                DataTable dt = dal.get_service_sub(od_seq,od_service_seq);

                return commone.BLL_commone.data_convert_json(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        

        #endregion

        #region 获取服务批次 详情
        public string get_service_sub_details(string od_seq,
            string od_service_seq,
            string od_service_sub_seq)
        {
            try
            {
                DataTable dt = dal.get_service_sub(od_seq, od_service_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 获取 服务批次 明细列表
        public string get_service_sub_details(string od_seq )
        {
            try
            {
                DataTable dt = dal.get_service_sub_details(od_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion


        #region 获取服务批次 运程明细
        public string get_service_sub_route(string od_seq,
            string od_service_seq,
            string od_service_sub_seq)
        {
            try
            {
                DataTable dt = dal.get_service_sub_route(od_seq, od_service_seq,
                    od_service_sub_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 下载 火车发运单
        //通过 od_route_seq 和od_service_sub_seq获取 
        public string get_sub_way_details(string od_service_sub_seq,
            string od_route_seq )
        {
            try
            {
                DataTable dt = dal.get_sub_way_details(od_service_sub_seq, od_route_seq);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 下载 派车单
        public Dictionary<string, string> get_road_way_details(string od_service_sub_seq,
            string od_route_seq)
        {
            try
            {
                string company_desc = string.Empty;
                string route_tools_owner_desc = string.Empty;
                string route_assign_dat = string.Empty;
                string route_bill_no = string.Empty;
                string route_delivery_cargo_info = string.Empty;
                string route_cntr_and_seal = string.Empty;
                string route_cntr_group_desc = string.Empty;
                string route_bak = string.Empty;

                dal.get_road_way_details(  od_service_sub_seq,
                  od_route_seq,
                ref   company_desc,
                ref   route_tools_owner_desc,
                ref   route_assign_dat,
                ref   route_bill_no,
                ref   route_delivery_cargo_info,
                ref   route_cntr_and_seal,
                ref   route_cntr_group_desc,
                ref   route_bak);

                Dictionary<string, string> dic_temp = new Dictionary<string, string>();

                dic_temp.Add("company_desc", company_desc);
                dic_temp.Add("route_tools_owner_desc", route_tools_owner_desc);
                dic_temp.Add("route_assign_dat", route_assign_dat);
                dic_temp.Add("route_bill_no", route_bill_no);
                dic_temp.Add("route_delivery_cargo_info", route_delivery_cargo_info);
                dic_temp.Add("route_cntr_and_seal", route_cntr_and_seal);
                dic_temp.Add("route_cntr_group_desc", route_cntr_group_desc);
                dic_temp.Add("route_bak", route_bak);

                return dic_temp;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 下载 单票对账单
        public string get_rec_check_account_of_single_order(
            string cu_id,
            string od_seq,
            string u_id,
            ref Dictionary<string, string> dic_par )
        {
            try
            {
                string company_desc = string.Empty;
                string company_address = string.Empty;
                string company_phone = string.Empty;
                string company_cn_bank_info = string.Empty;
                string company_en_bank_info = string.Empty;
                string print_nam = string.Empty;
                string print_dat = string.Empty;
                string cu_desc = string.Empty;
                string od_no = string.Empty;
                string od_bill_no = string.Empty;
                string od_ship_info = string.Empty;
                string od_cargo_typ_desc = string.Empty;
                string od_ship_etd = string.Empty;
                string od_load_port_desc = string.Empty;
                string od_disc_port_desc = string.Empty;
                string od_cntr_group_desc = string.Empty;
                string od_cargo_pick_desc = string.Empty;
                string od_cargo_weight_desc = string.Empty;
                string od_cargo_bluk_desc = string.Empty;
                string od_operation_desc = string.Empty;

                DataTable dt = dal.get_rec_check_account_of_single_order(
                    cu_id,
                    od_seq,
                    u_id, 
                    ref company_desc,
                    ref company_address,
                    ref company_phone,
                    ref company_cn_bank_info,
                    ref company_en_bank_info,
                    ref print_nam,
                    ref print_dat,
                    ref cu_desc,
                    ref od_no,
                    ref od_bill_no,
                    ref od_ship_info,
                    ref od_cargo_typ_desc,
                    ref od_ship_etd,
                    ref od_load_port_desc,
                    ref od_disc_port_desc,
                    ref od_cntr_group_desc,
                    ref od_cargo_pick_desc,
                    ref od_cargo_weight_desc,
                    ref od_cargo_bluk_desc,
                    ref od_operation_desc);

                if (dic_par == null)
                {
                    dic_par = new Dictionary<string, string>();
                }
                
                dic_par.Add("company_desc", company_desc);
                dic_par.Add("company_address", company_address);
                dic_par.Add("company_phone", company_phone);
                dic_par.Add("company_cn_bank_info", company_cn_bank_info);
                dic_par.Add("company_en_bank_info", company_en_bank_info);
                dic_par.Add("print_nam", print_nam);
                dic_par.Add("print_dat", print_dat);
                dic_par.Add("cu_desc", cu_desc);
                dic_par.Add("od_no", od_no);
                dic_par.Add("od_bill_no", od_bill_no);
                dic_par.Add("od_ship_info", od_ship_info);
                dic_par.Add("od_cargo_typ_desc", od_cargo_typ_desc);
                dic_par.Add("od_ship_etd", od_ship_etd);
                dic_par.Add("od_load_port_desc", od_load_port_desc);
                dic_par.Add("od_disc_port_desc", od_disc_port_desc);
                dic_par.Add("od_cntr_group_desc", od_cntr_group_desc);
                dic_par.Add("od_cargo_pick_desc", od_cargo_pick_desc);
                dic_par.Add("od_cargo_weight_desc", od_cargo_weight_desc);
                dic_par.Add("od_cargo_bluk_desc", od_cargo_bluk_desc);
                dic_par.Add("od_operation_desc", od_operation_desc);

                

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 获取服务批次 箱量(仅数量)
        public string get_service_sub_ref_group_cntr(string od_seq, string od_service_seq, string od_service_sub_seq)
        {
            try
            {
                DataTable dt = dal.get_service_sub_ref_group_cntr(od_seq, od_service_seq,
                    od_service_sub_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取服务批次 箱量(明细)
        public string get_service_sub_ref_cntr(string od_seq, string od_service_seq, string od_service_sub_seq)
        {
            try
            {
                DataTable dt = dal.get_service_sub_ref_cntr(od_seq, od_service_seq,
                    od_service_sub_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取服务批次 费用
        public string get_order_fee_by_service_sub_seq(string od_seq, string od_service_seq, string od_service_sub_seq)
        {
            try
            {
                DataTable dt = dal.get_order_fee_by_service_sub_seq(od_seq, od_service_seq,
                    od_service_sub_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取服务批次打包 包含 运程明细,箱量 费用 
        public string get_service_sub_collections(string od_seq,
            string od_service_seq,
            string od_service_sub_seq)
        {
            try
            {

                JObject jo = new JObject();

                JArray ja = new JArray();  
                string service_sub_details = get_service_sub_details(od_seq, od_service_seq, od_service_sub_seq); 
                string service_sub_route_list = get_service_sub_route(od_seq, od_service_seq, od_service_sub_seq);
                string service_sub_ref_group_cntr_list = get_service_sub_ref_group_cntr(od_seq, od_service_seq, od_service_sub_seq);
                string service_sub_ref_cntr_list = get_service_sub_ref_cntr(od_seq, od_service_seq, od_service_sub_seq);
                string service_sub_fee_list = get_order_fee_by_service_sub_seq(od_seq, od_service_seq, od_service_sub_seq);

                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(service_sub_details);
                jo["service_sub_details"] = ja;
                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(service_sub_route_list);
                jo["service_sub_route_list"] = ja;
                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(service_sub_ref_group_cntr_list);
                jo["service_sub_ref_group_cntr_list"] = ja;
                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(service_sub_ref_cntr_list);
                jo["service_sub_ref_cntr_list"] = ja;
                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(service_sub_fee_list);
                jo["service_sub_fee_list"] = ja; 

                return jo.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 订单 费用(所有)
        public string get_order_fee(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_order_fee(od_seq);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public JObject get_order_fee(string od_seq, string rec_or_pay)
        {
            try
            {
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_order_fee(od_seq, rec_or_pay, ref group_fee_desc);

                string json = commone.BLL_commone.data_convert_json(dt);

                JObject jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                jo["group_fee_desc"] = group_fee_desc;

                return jo;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 获取 合同文件
        public string get_order_contract_file_info(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_order_contract_file_info(od_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 装箱信息
        public string get_order_cntr_file_info(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_order_cntr_file_info(od_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string get_order_cntr_file_info_data(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_order_cntr_file_info(od_seq);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 单个 集装箱装箱图片信息
        public string get_order_cntr_file_info_by_cntr_id(string od_seq, string cntr_id)
        {
            try
            {
                DataTable dt = dal.get_order_cntr_file_info_by_cntr_id(od_seq,cntr_id);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_order_cntr_file_info_by_cntr_id_arr(string od_seq, string cntr_id)
        {
            try
            {
                DataTable dt = dal.get_order_cntr_file_info_by_cntr_id(od_seq, cntr_id);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 莫名其妙的一些附加信息获取
        public string get_cargo_addtion_info(string od_seq  )
        {
            try
            {
                string od_delivery_cargo_info = string.Empty;
                string od_take_cargo_info = string.Empty;
                DataTable dt = dal.get_cargo_addtion_info(od_seq,
                   ref od_delivery_cargo_info,
                   ref od_take_cargo_info);


                JObject jo = new JObject();


                Dictionary<string, string> dic_temp = new Dictionary<string, string>();

                jo["od_delivery_cargo_info"] = od_delivery_cargo_info;
                jo["od_take_cargo_info"]= od_take_cargo_info ;

                return jo.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
 
        #endregion

        #region 整体打包 所有内容
        public string get_order_single_full_collections(string od_seq,
            string u_id)
        {
            try
            {
                JObject jo = new JObject();

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                //基本信息
                
                string order_base_info_and_cargo_info = get_order_single(od_seq, u_id);
                JArray ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(order_base_info_and_cargo_info);
                jo["order_base_info_and_cargo_info"] = ja;
                 
                string order_contract_file_info = get_order_contract_file_info(od_seq);
                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(order_base_info_and_cargo_info);
                jo["order_contract_file_info"] = ja;
                //集装箱信息 
                string order_cntr_list = get_order_cntr(od_seq);
                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(order_cntr_list);
                jo["order_cntr_list"] = ja;
               
                string order_cntr_stuffing_list = get_order_cntr_file_info(od_seq);
                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(order_cntr_stuffing_list);
                jo["order_cntr_stuffing_list"] = ja;

                string order_service_sub_list2 = get_service_sub_details(od_seq);
                ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(order_service_sub_list2);
                jo["order_service_sub_list"] = ja;

                //服务商 打包 
                string order_service_list = get_service(od_seq);

                string order_service_sub_list = get_all_service_sub(od_seq);

                string order_service_sub_route_list = get_all_service_sub_route(od_seq);
                 
                //费用 
                string order_fee_list = get_order_fee(od_seq);

                JObject order_fee_pay_list = get_order_fee(od_seq, "-1");
                JObject order_fee_rec_list = get_order_fee(od_seq, "1");


                #region 进行组合

                #region 首先取出 应收费用  
                JArray j_rec_fee_list = new JArray();
                JArray j_pay_fee_list = new JArray();
                JObject data_fee_list = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(order_fee_list);
                if (data_fee_list["rows"] != null)
                {
                    JArray lst_fee = (JArray)data_fee_list["rows"];

                    for (int i = 0; i < lst_fee.Count; i++)
                    {
                        int rec_or_pay = Convert.ToInt32(lst_fee[i]["rec_or_pay"]);


                        if (rec_or_pay == 1)
                        {
                            j_rec_fee_list.Add(lst_fee[i]);
                        }
                        else
                        {
                            j_pay_fee_list.Add(lst_fee[i]);
                        }
                    }
                }

                jo["order_rec_fee_list"] = order_fee_rec_list;
                jo["order_pay_fee_list"] = order_fee_pay_list;
                //lst.Add(new KeyValuePair<string, string>("order_rec_fee_list", order_fee_rec_list));
                //lst.Add(new KeyValuePair<string, string>("order_pay_fee_list", order_fee_pay_list)); 
                #endregion

                #region service_sub 添加 route和 fee
                JObject data_service_list = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(order_service_list);
                
                JArray j_service_sub_list = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(order_service_sub_list);
                JArray j_service_sub_route_list = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(order_service_sub_route_list);

                JArray j_service_list = null;
                #region 

                //先把下面的 sub 绑定 route和 fee 
                if (j_service_sub_list != null)
                {
                    for (int i = 0; i < j_service_sub_list.Count; i++)
                    {
                        string od_service_seq = j_service_sub_list[i]["od_service_seq"].ToString().Trim();
                        string od_service_sub_seq = j_service_sub_list[i]["od_service_sub_seq"].ToString().Trim();

                        JArray t_route_list = new JArray();
                        //添加 route 
                        if (j_service_sub_route_list != null)
                        {
                            for (int k = 0; k < j_service_sub_route_list.Count; k++)
                            {
                                string route_od_service_seq = j_service_sub_route_list[k]["od_service_seq"].ToString().Trim();
                                string route_od_service_sub_seq = j_service_sub_route_list[k]["od_service_sub_seq"].ToString().Trim();

                                if (route_od_service_seq == od_service_seq &&
                                    route_od_service_sub_seq == od_service_sub_seq)
                                {
                                    t_route_list.Add(j_service_sub_route_list[k]);
                                }
                            }
                        }
                        j_service_sub_list[i]["route_list"] = t_route_list;

                        JArray t_fee_list = new JArray();
                        if (j_pay_fee_list != null)
                        {
                            for (int k = 0; k < j_pay_fee_list.Count; k++)
                            {
                                string fee_od_service_seq = j_pay_fee_list[k]["od_service_seq"].ToString().Trim();
                                string fee_od_service_sub_seq = j_pay_fee_list[k]["od_service_sub_seq"].ToString().Trim();

                                if (fee_od_service_seq == od_service_seq &&
                                    fee_od_service_sub_seq == od_service_sub_seq)
                                {
                                    t_fee_list.Add(j_pay_fee_list[k]);
                                }
                            }
                        }
                        j_service_sub_list[i]["fee_list"] = t_fee_list;
                    }
                }
                //再把 sub 添加到 service中 
                if (data_service_list["rows"] != null)
                {
                    j_service_list = (Newtonsoft.Json.Linq.JArray)data_service_list["rows"];

                    for (int j = 0; j < j_service_list.Count; j++)
                    {
                        string od_t_service_seq = j_service_list[j]["od_service_seq"].ToString().Trim();

                        JArray t_service_sub_list = new JArray();
                        if (j_service_sub_list != null)
                        {
                            for (int i = 0; i < j_service_sub_list.Count; i++)
                            {
                                string od_service_seq = j_service_sub_list[i]["od_service_seq"].ToString().Trim();

                                if (od_t_service_seq == od_service_seq)
                                {
                                    t_service_sub_list.Add(j_service_sub_list[i]);
                                }
                            }
                        }

                        j_service_list[j]["sub_list"] = t_service_sub_list; 
                    }
                }
                

                
                #endregion 
                #endregion

                #endregion
                jo["order_service_list"] = j_service_list;
                return jo.ToString();
                 
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public JObject download_single_full_collections(string od_seq,
            string u_id)
        {
            try
            {
                JObject jo = new JObject();

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                //基本信息

                string order_base_info_and_cargo_info = get_order_single(od_seq, u_id);
                JArray ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(order_base_info_and_cargo_info);
                jo["order_base_info_and_cargo_info"] = ja; 

                JObject order_fee_pay_list = get_order_fee(od_seq, "-1");
                JObject order_fee_rec_list = get_order_fee(od_seq, "1");
                jo["order_rec_fee_list"] = order_fee_rec_list;
                jo["order_pay_fee_list"] = order_fee_pay_list;


                return jo;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 用于打包的 一些获取
        #region 获取所有 服务商

        public string get_all_service_sub(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_all_service_sub(od_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取所有 运程
        public string get_all_service_sub_route(string od_seq)
        {
            try
            {
                DataTable dt = dal.get_all_service_sub_route(od_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        
        #endregion
        #endregion

        #region 统计查询
        public string get_group_details_of_operation(string c_id,
            string u_id,
            string fee_beg_dat,
            string fee_end_dat)
        {
            try
            {
                DataTable dt = dal.get_group_details_of_operation(c_id,
                    u_id,
                    fee_beg_dat,
                    fee_end_dat);
                 
                return commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #endregion
        #region 订单编辑
        #region 拷贝订单功能
        public string insert_order_by_copy(
           string copy_od_seq,
           string od_record_by_id )
        {
            try{ 
                string od_seq = string.Empty;
                string od_no = string.Empty;

                bool b = dal.insert_order_by_copy(copy_od_seq,
                    od_record_by_id,
                    ref od_seq,
                    ref od_no); 

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("od_seq", od_seq));
                lst.Add(new KeyValuePair<string, string>("od_no", od_no));
                return commone.BLL_commone.result_convert_json(b?1:0,
                    b ? "订单拷贝新增完成,新建订单号为:【" + od_no + "】" : "异常: 请截图并联系管理员处理。", lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 新增 订单 基本信息和货物资料
        public string insert_order(string od_project_typ,
            string od_typ,
            string od_cargo_agent_cu_id,
            string od_delegate_cu_id,
            string od_cargo_agent_relation_nam,
            string od_cargo_agent_relation_phone,
            string od_cargo_agent_relation_fax,
            string od_delegate_relation_nam,
            string od_delegate_relation_phone,
            string od_delegate_relation_fax,
            string od_record_by_id,
            string od_fee_dat,
            string od_operation_id,
            string od_service_id,
            string od_sales_id,
            string od_bak_delegate,
            string od_bak_operation,
            string od_freight_id,
            string od_record_by_company_id,
            string od_trade_typ_id,
            string od_beg_place_id,
            string od_end_place_id,
            string od_i_e_id,

            string od_box_typ_id,
            string od_cargo_typ,
            string od_cargo_bluk,
            string od_cargo_weight,
            string od_cargo_number,
            string od_cargo_packing, 
            string od_take_cargo_info,
            string od_delivery_cargo_info,
            string od_po_no,
            string od_so_no,
            string od_main_bill_no,
            string od_sub_bill_no,
            string bk_commissioned_id,
            string bk_shipper_desc,
            string bk_consignee_desc,
            string bk_notify_desc, 
            string bk_commissioned_to,
            string bk_commissioned_tel,
            string bk_commissioned_fax,
            //bk_booking_number, 
            string bk_delegate_tel,
            string bk_delegate_fax,
            string bk_delegate_ctc,
           string  bk_delegate_date,
            string bk_carrier_id,
            string bk_closing_date,
            string bk_etd,
            string bk_port_of_loading_id,
            string bk_port_of_transit_id,
           string  bk_port_of_discharge_id,
            string bk_freight_term_id,
            string bk_pay_method_id,
            string bk_shipping_marks_and_no_desc,
            string bk_freight_package_desc,
           string  bk_description_of_goods_desc,
           string  bk_gross_weight,
           string  bk_remarks,
           string bk_measurement,
            string od_bill_typ,
            string od_sign_bill_typ,
            string od_declare_customs_typ,
            string od_carriage_typ,
            string od_stuffing_container_typ,
            string od_stuffing_container_place,
            string od_entry_tim_of_stuffing,
            string od_out_tim_of_stuffing,
            string json_group_cntr,
            string json_contract_file,
            string json_cntr_list)
        {
            try
            {
                string od_seq = string.Empty;
                string od_no = string.Empty;

                bool b = dal.insert_order(od_project_typ,
                    od_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_cargo_agent_relation_nam,
                    od_cargo_agent_relation_phone,
                    od_cargo_agent_relation_fax,
                    od_delegate_relation_nam,
                    od_delegate_relation_phone,
                    od_delegate_relation_fax,
                    od_record_by_id,
                    od_fee_dat,
                    od_operation_id,
                    od_service_id,
                    od_sales_id,
                    od_bak_delegate,
                    od_bak_operation,
                    od_freight_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    od_beg_place_id,
                    od_end_place_id,
                    od_i_e_id,

                    od_box_typ_id,
                    od_cargo_typ,
                    od_cargo_bluk,
                    od_cargo_weight,
                    od_cargo_number,
                    od_cargo_packing, 
                    od_take_cargo_info,
                    od_delivery_cargo_info,
                    od_po_no,
                    od_so_no,
                    od_main_bill_no,
                    od_sub_bill_no,
                    bk_commissioned_id,
                    ref od_seq,
                    ref od_no);

                if (b)
                {
                    //添加集装箱箱量
                    insert_cntr_group(od_seq, json_group_cntr);
                    //增加集装箱箱量明细 
                    insert_order_cntr(od_seq, json_cntr_list);
                    //添加合同附件
                    bat_insert_contract_file(od_seq, json_contract_file);
                    //订舱单 
                    update_booking_note(od_seq,
                        bk_shipper_desc,
                        bk_consignee_desc,
                        bk_notify_desc,
                        bk_commissioned_id,
                        bk_commissioned_to,
                        bk_commissioned_tel,
                        bk_commissioned_fax, 
                        bk_delegate_tel,
                        bk_delegate_fax,
                        bk_delegate_ctc,
                        bk_delegate_date,
                        bk_carrier_id,
                        bk_closing_date,
                        bk_etd,
                        bk_port_of_loading_id,
                        bk_port_of_transit_id,
                        bk_port_of_discharge_id,
                        bk_freight_term_id,
                        bk_pay_method_id,
                        bk_shipping_marks_and_no_desc,
                        bk_freight_package_desc,
                        bk_description_of_goods_desc,
                        bk_gross_weight,
                        bk_remarks,
                        bk_measurement);
                    

                    update_order_addition_infos(od_seq,
                        od_bill_typ,
                        od_sign_bill_typ,
                        od_declare_customs_typ,
                        od_carriage_typ,
                        od_stuffing_container_typ,
                        od_stuffing_container_place,
                        od_entry_tim_of_stuffing,
                        od_out_tim_of_stuffing);

                } 

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("od_seq", od_seq));
                lst.Add(new KeyValuePair<string, string>("od_no", od_no));
                return commone.BLL_commone.result_convert_json(b?1:0,
                    b?"订单新增完成":"异常: 请截图并联系管理员处理。",lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 编辑订单 基本信息和货物资料
        public string update_order(
            string od_seq,
            string od_project_typ,
           // string od_typ,
            string od_cargo_agent_cu_id,
            string od_delegate_cu_id,
            string od_cargo_agent_relation_nam,
            string od_cargo_agent_relation_phone,
            string od_cargo_agent_relation_fax,
            string od_delegate_relation_nam,
            string od_delegate_relation_phone,
            string od_delegate_relation_fax,
            string od_record_by_id,
            string od_fee_dat,
            string od_operation_id,
            string od_service_id,
            string od_sales_id,
            string od_bak_delegate,
            string od_bak_operation,
            string od_freight_id,
            string od_record_by_company_id,
            string od_trade_typ_id,
            string od_beg_place_id,
            string od_end_place_id,
            string od_i_e_id, 
            string od_box_typ_id,
            string od_cargo_typ,
            string od_cargo_bluk,
            string od_cargo_weight,
            string od_cargo_number,
            string od_cargo_packing, 
            string od_take_cargo_info,
            string od_delivery_cargo_info,
            string od_po_no,
            string od_so_no,
            string od_main_bill_no,
            string od_sub_bill_no,
            string bk_commissioned_id,

            string bk_shipper_desc,
            string bk_consignee_desc,
            string bk_notify_desc,
            string bk_commissioned_to,
            string bk_commissioned_tel,
            string bk_commissioned_fax,
            //bk_booking_number, 
            string bk_delegate_tel,
            string bk_delegate_fax,
            string bk_delegate_ctc,
           string bk_delegate_date,
            string bk_carrier_id,
            string bk_closing_date,
            string bk_etd,
            string bk_port_of_loading_id,
            string bk_port_of_transit_id,
           string bk_port_of_discharge_id,
            string bk_freight_term_id,
            string bk_pay_method_id,
            string bk_shipping_marks_and_no_desc,
            string bk_freight_package_desc,
           string bk_description_of_goods_desc,
           string bk_gross_weight,
           string bk_remarks,
           string bk_measurement,
            string od_bill_typ,
            string od_sign_bill_typ,
            string od_declare_customs_typ,
            string od_carriage_typ,
            string od_stuffing_container_typ,
            string od_stuffing_container_place,
            string od_entry_tim_of_stuffing,
            string od_out_tim_of_stuffing ,
            string json_group_cntr,
            string json_contract_file,
            string json_cntr_list
            )
        {
            try
            {
                string od_no = string.Empty;

                bool b = dal.update_order(od_seq,
                    od_project_typ,
                   // od_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_cargo_agent_relation_nam,
                    od_cargo_agent_relation_phone,
                    od_cargo_agent_relation_fax,
                    od_delegate_relation_nam,
                    od_delegate_relation_phone,
                    od_delegate_relation_fax,
                    od_record_by_id,
                    od_fee_dat,
                    od_operation_id,
                    od_service_id,
                    od_sales_id,
                    od_bak_delegate,
                    od_bak_operation,
                    od_freight_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    od_beg_place_id,
                    od_end_place_id,
                    od_i_e_id, 
                    od_box_typ_id,
                    od_cargo_typ,
                    od_cargo_bluk,
                    od_cargo_weight,
                    od_cargo_number,
                    od_cargo_packing, 
                    od_take_cargo_info,
                    od_delivery_cargo_info,
                    od_po_no,
                    od_so_no,
                    od_main_bill_no,
                    od_sub_bill_no,
                    bk_commissioned_id);

                if (b)
                {
                    //添加集装箱箱量
                    insert_cntr_group(od_seq, json_group_cntr);
                    //添加合同附件
                    bat_insert_contract_file(od_seq, json_contract_file);
                    //更新订舱单
                    update_booking_note(od_seq,
                        bk_shipper_desc,
                        bk_consignee_desc,
                        bk_notify_desc,
                        bk_commissioned_id,
                        bk_commissioned_to,
                        bk_commissioned_tel,
                        bk_commissioned_fax,
                            //bk_booking_number, 
                        bk_delegate_tel,
                        bk_delegate_fax,
                        bk_delegate_ctc,
                        bk_delegate_date,
                        bk_carrier_id,
                        bk_closing_date,
                        bk_etd,
                        bk_port_of_loading_id,
                        bk_port_of_transit_id,
                        bk_port_of_discharge_id,
                        bk_freight_term_id,
                        bk_pay_method_id,
                        bk_shipping_marks_and_no_desc,
                        bk_freight_package_desc,
                        bk_description_of_goods_desc,
                        bk_gross_weight,
                        bk_remarks,
                        bk_measurement
                    );

                    update_order_addition_infos(od_seq,
                        od_bill_typ,
                        od_sign_bill_typ,
                        od_declare_customs_typ,
                        od_carriage_typ,
                        od_stuffing_container_typ,
                        od_stuffing_container_place,
                        od_entry_tim_of_stuffing,
                        od_out_tim_of_stuffing);

                    insert_order_cntr(od_seq, json_cntr_list);
                }
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("od_seq", od_seq));

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "订单修改完成" : "错误: 订单已审核，无法进行修改。",lst); 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增 集装箱量
        public string insert_cntr_group( 
            string od_seq,
            string json_group_cntr )
        {
            try
            {
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json_group_cntr);
                if (data_item["group_cntr"] != null)
                {
                    JArray lst = (JArray)data_item["group_cntr"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string od_group_cntr_seq_out = string.Empty;
                        string od_group_cntr_seq = (lst[i]["od_group_cntr_seq"] == null || lst[i]["od_group_cntr_seq"].ToString().Length == 0) ? string.Empty : lst[i]["od_group_cntr_seq"].ToString().Trim();
                        string od_group_cntr_typ = (lst[i]["od_group_cntr_typ"] == null || lst[i]["od_group_cntr_typ"].ToString().Length == 0) ? string.Empty : lst[i]["od_group_cntr_typ"].ToString().Trim();
                        string od_group_cntr_siz = (lst[i]["od_group_cntr_siz"] == null || lst[i]["od_group_cntr_siz"].ToString().Length == 0) ? "20" : lst[i]["od_group_cntr_siz"].ToString().Trim();
                        string od_group_pin_flag = (lst[i]["od_group_pin_flag"] == null || lst[i]["od_group_pin_flag"].ToString().Length == 0) ? "0" : lst[i]["od_group_pin_flag"].ToString().Trim();
                        string od_group_cntr_opr_cod = (lst[i]["od_group_cntr_opr_cod"] == null || lst[i]["od_group_cntr_opr_cod"].ToString().Length == 0) ? string.Empty : lst[i]["od_group_cntr_opr_cod"].ToString().Trim();
                        string od_group_cntr_number = (lst[i]["od_group_cntr_number"] == null || lst[i]["od_group_cntr_number"].ToString().Length == 0) ? "0" : lst[i]["od_group_cntr_number"].ToString().Trim();

                        bool b = dal.insert_cntr_group(od_seq,
                        od_group_cntr_seq,
                        od_group_cntr_typ,
                        od_group_cntr_siz,
                        od_group_pin_flag,
                        od_group_cntr_opr_cod,
                        od_group_cntr_number,
                        ref od_group_cntr_seq_out);

                        lst[i]["result_update"] = b ? 1 : 0; 
                        lst[i]["od_group_cntr_seq"] = od_group_cntr_seq_out;

                    }
                }

                return data_item.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除  集装箱箱量
        public string delete_cntr_group(string od_seq, string od_group_cntr_seqs)
        {
            try
            {
                bool b = dal.delete_cntr_group(od_seq, od_group_cntr_seqs);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "删除箱量完成" : "错误: 订单已审核，无法进行箱量编辑");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        
        #region 新增、编辑 订单集装箱
        public string insert_order_cntr(
            string od_seq,
            string json_order_cntr)
        {
            try
            {
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json_order_cntr);
                if (data_item["order_cntr_list"] != null)
                {
                    JArray lst = (JArray)data_item["order_cntr_list"];

                    //先要删除 
                    string cntr_ids = string.Empty;
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string cntr_id = lst[i]["cntr_id"].ToString().Trim();
                        if (cntr_ids.Length == 0)
                        {
                            cntr_ids = cntr_id;
                        }
                        else
                        {
                            cntr_ids += ',' + cntr_id;
                        }
                        
                    }

                     
                    delete_order_cntr_not_in_ids(od_seq, cntr_ids);
                     

                    for (int i = 0; i < lst.Count; i++)
                    {
                        string cntr_id_out = string.Empty;

                        string cntr_id = lst[i]["cntr_id"].ToString().Trim();

                        string cntr_no = lst[i]["cntr_no"].ToString().Trim();
                        string eqp_typ = lst[i]["eqp_typ"].ToString().Trim();
                        string eqp_siz = lst[i]["eqp_siz"].ToString().Trim();
                        string seal_no = lst[i]["seal_no"].ToString().Trim();
                        string bill_no = lst[i]["bill_no"].ToString().Trim();
                        string cargo_net_wgt = lst[i]["cargo_net_wgt"].ToString().Trim();
                        string cargo_pick_number = lst[i]["cargo_pick_number"].ToString().Trim();
                        string cargo_bluk = lst[i]["cargo_bluk"].ToString().Trim();
                        string opr_cod = lst[i]["opr_cod"].ToString().Trim();
                        string customs_seal_no = lst[i]["customs_seal_no"].ToString().Trim();
                        string customs_voyage_no = lst[i]["customs_voyage_no"].ToString().Trim();
                        string customs_ship_desc = lst[i]["customs_ship_desc"].ToString().Trim();
                        string customs_hs_cod = lst[i]["customs_hs_cod"].ToString().Trim();
                        string customs_load_port = lst[i]["customs_load_port"].ToString().Trim();
                        string customs_disc_port = lst[i]["customs_disc_port"].ToString().Trim();
                        string cargo_goods_desc = lst[i]["cargo_goods_desc"].ToString().Trim();
                        string customs_ship_no = lst[i]["customs_ship_no"].ToString().Trim();

                        string pick_empty_no = lst[i]["pick_empty_no"].ToString().Trim();
                        string cntr_gross_wgt = lst[i]["cntr_gross_wgt"].ToString().Trim();
                        //增加属性
                        
                        bool b = dal.insert_order_cntr(od_seq,
                            cntr_id,
                            cntr_no,
                            eqp_typ,
                            eqp_siz,
                            seal_no,
                            bill_no,
                            cargo_net_wgt,
                            cargo_pick_number,
                            cargo_bluk,
                            opr_cod,
                            customs_seal_no,
                            customs_voyage_no,
                            customs_ship_desc,
                            customs_hs_cod,
                            customs_load_port,
                            customs_disc_port,
                            cargo_goods_desc,
                            customs_ship_no,
                            pick_empty_no,
                            cntr_gross_wgt,
                            
                            ref cntr_id_out); 
                        lst[i]["result_update"] = b ? 1 : 0;
                        lst[i]["cntr_id"] = cntr_id_out;

                    }
                }
                return data_item.ToString();

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 订单集装箱
        public string delete_order_cntr(string od_seq, string cntr_id)
        {
            try
            {
                bool b = dal.delete_order_cntr(od_seq, cntr_id);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "删除委托集装箱信息完成" : "错误: 订单已审核，无法进行委托集装箱信息编辑");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string delete_order_cntr_not_in_ids(string od_seq, string cntr_ids)
        {
            try
            {
                bool b = dal.delete_order_cntr_not_in_ids(od_seq, cntr_ids);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "删除委托集装箱信息完成" : "错误: 订单已审核，无法进行委托集装箱信息编辑");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 编辑订舱单
        public string update_booking_note(string od_seq,
            string bk_shipper_desc,
            string bk_consignee_desc,
            string bk_notify_desc,
            string bk_commissioned_id,
            string bk_commissioned_to,
            string bk_commissioned_tel,
            string bk_commissioned_fax,
           // string bk_booking_number,
            //string bk_job_number,
            string bk_delegate_tel,
            string bk_delegate_fax,
            string bk_delegate_ctc,
            string bk_delegate_date,
            string bk_carrier_id,
            string bk_closing_date,
            string bk_etd,
            string bk_port_of_loading_id,
            string bk_port_of_transit_id,
            string bk_port_of_discharge_id,
            string bk_freight_term_id,
            string bk_pay_method_id,
            string bk_shipping_marks_and_no_desc,
            string bk_freight_package_desc,
            string bk_description_of_goods_desc,
            string bk_gross_weight,
            string bk_remarks,
            string bk_measurement)
        {
            try
            {
                string od_no = string.Empty;

                bool b = dal.update_booking_note(od_seq,
                    bk_shipper_desc,
                    bk_consignee_desc,
                    bk_notify_desc,
                    bk_commissioned_id,
                    bk_commissioned_to,
                    bk_commissioned_tel,
                    bk_commissioned_fax,
                   // bk_booking_number,
                   // bk_job_number,
                    bk_delegate_tel,
                    bk_delegate_fax,
                    bk_delegate_ctc,
                    bk_delegate_date,
                    bk_carrier_id,
                    bk_closing_date,
                    bk_etd,
                    bk_port_of_loading_id,
                    bk_port_of_transit_id,
                    bk_port_of_discharge_id,
                    bk_freight_term_id,
                    bk_pay_method_id,
                    bk_shipping_marks_and_no_desc,
                    bk_freight_package_desc,
                    bk_description_of_goods_desc,
                    bk_gross_weight,
                    bk_remarks,
                    bk_measurement ); 
                 
                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "订舱单编辑完成" : "错误: 订单已审核，无法进行修改。");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 订单
        public string delete_order(
            string od_seq )
        {
            try
            {
                int b = dal.delete_order(od_seq);
                string msg = string.Empty;
                if (b == 1) msg = "订单删除完成";
                if (b == -1) msg = "错误: 订单已审核，无法进行修改。";
                if (b == -2) msg = "错误: 此订单下有费用已进入审核阶段，无法进行删除操作。";
                return commone.BLL_commone.result_convert_json(b == 1 ? 1 : 0,
                    msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 锁定 订单
        public string lock_order(
            string od_seq,
            string od_operation_lock_id,
            string ap_u_id,
            string aps_order_by_id,
            string aps_id)
        {
            try
            {
                string amc_id = string.Empty;

                int b = dal.lock_order(od_seq, od_operation_lock_id,
                      ap_u_id,
                      aps_order_by_id,
                      aps_id,
                      ref amc_id);
                string msg = string.Empty;
                if (b == 1)
                {
                    msg = "订单锁定完成。";

                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.create); 
                }
                if (b != 1) msg = "错误: 订单已被锁定，不允许反复操作";
                return commone.BLL_commone.result_convert_json(b == 1 ? 1 : 0,
                    msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增服务商
        public string insert_service(
            string od_seq,
            string od_service_cu_id)
        {
            try
            {
                string od_service_seq = string.Empty;
                string od_service_order_by = string.Empty;
                string od_status_id = string.Empty;
                string od_service_cu_desc = string.Empty;

                int b = dal.insert_service(od_seq,
                    od_service_cu_id,
                    ref od_status_id,
                    ref od_service_seq,
                    ref od_service_order_by,
                    ref od_service_cu_desc);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("od_status_id", od_status_id));
                lst.Add(new KeyValuePair<string, string>("od_service_seq", od_service_seq));
                lst.Add(new KeyValuePair<string, string>("od_service_order_by", od_service_order_by));
                lst.Add(new KeyValuePair<string, string>("od_service_cu_desc", od_service_cu_desc));
                string msg = string.Empty;

                if (b == 1) msg = "服务商新增完成";
                if (b == -1) msg = "错误: 订单已审核，无法进行修改。";
                if (b == -2) msg = "错误: 已存在相同的服务商。"; 
                return commone.BLL_commone.result_convert_json(b ==1 ? 1 : 0,
                    msg, lst); 

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 删除 服务商
        public string delete_service(
            string od_seq,
            string od_service_seq)
        {
            try
            {
                int b = dal.delete_service(od_seq,
                    od_service_seq);
                string msg = string.Empty;
                if (b == 1) msg = "服务商删除完成";
                if (b == -1) msg = "错误: 订单已审核，无法进行修改。";
                if (b == -2) msg = "错误: 此服务商下有费用已进入审核阶段，无法进行删除操作。";
                return commone.BLL_commone.result_convert_json(b ==1 ? 1 : 0,
                    msg); 

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增服务商 批次
        public string insert_service_sub(
            string od_seq,
            string od_service_seq)
        {
            try
            {
                string od_service_sub_seq = string.Empty;
                string od_service_sub_order_by = string.Empty;

                bool b = dal.insert_service_sub(od_seq,
                    od_service_seq,
                    ref od_service_sub_seq,
                    ref od_service_sub_order_by);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("od_service_sub_seq", od_service_sub_seq));
                lst.Add(new KeyValuePair<string, string>("od_service_sub_order_by", od_service_sub_order_by));
                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "服务批次新增完成" : "错误: 订单已审核，无法进行修改。",lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除服务商 批次
        public string delete_service_sub(
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq)
        {
            try
            {
                
                int b = dal.delete_service_sub(od_seq,
                    od_service_seq,
                    od_service_sub_seq);
                string msg = string.Empty;
                if(b == 1) msg = "服务批次删除完成";
                if(b == -1) msg =  "错误: 订单已审核，无法进行删除。";
                if(b == -2) msg =  "错误: 服务批次中存在费用已审核或提交OA，无法进行删除。";
                return commone.BLL_commone.result_convert_json(b ==1 ? 1 : 0,
                    msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 更新服务商 批次
        public string update_service_sub(
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string od_service_sub_weight,
            string od_service_sub_bluk,
            string od_service_sub_number,
            string od_service_sub_bak,
            string data_route,
            string data_group_cntr,
            string data_cntr,
            string data_fee,
            string record_by_id
            )
        {
            try
            {

                /*
                 * 前台传递的时候
                 * route需要带上 ship_no 
                 * fee 需要带上 ship_no 
                 */

               
                #region 先得到 序号集合
                string od_fee_seqs = string.Empty;
                JObject fee_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_fee);
                if (fee_item["fee_list"] != null)
                {
                    JArray lst = (JArray)fee_item["fee_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();

                        if (fee_seq.Length > 0)
                        {
                            if (od_fee_seqs.Length == 0)
                            {
                                od_fee_seqs = fee_seq;
                            }
                            else
                            {
                                od_fee_seqs += "," + fee_seq;
                            }
                        }

                        string ship_no = lst[i]["fee_seq"].ToString().Trim();

                        
                    }
                }

                string od_route_seqs = string.Empty;
                JObject route_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_route);
                if (route_item["route_list"] != null)
                {
                    JArray lst = (JArray)route_item["route_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string od_route_seq = lst[i]["od_route_seq"].ToString().Trim();

                        if (od_route_seq.Length > 0)
                        {
                            if (od_route_seqs.Length == 0)
                            {
                                od_route_seqs = od_route_seq;
                            }
                            else
                            {
                                od_route_seqs += "," + od_route_seq;
                            }
                        }
                    }
                }

                string od_service_sub_group_cntr_seqs = string.Empty;

                JObject service_sub_group_cntr_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_group_cntr);
                if (service_sub_group_cntr_item["group_cntr_list"] != null)
                {
                    JArray lst = (JArray)service_sub_group_cntr_item["group_cntr_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string od_service_sub_group_cntr_seq = lst[i]["od_service_sub_group_cntr_seq"].ToString().Trim();

                        if (od_service_sub_group_cntr_seq.Length > 0)
                        {
                            if (od_route_seqs.Length == 0)
                            {
                                od_service_sub_group_cntr_seqs = od_service_sub_group_cntr_seq;
                            }
                            else
                            {
                                od_service_sub_group_cntr_seqs += "," + od_service_sub_group_cntr_seq;
                            }
                        }
                    }
                }

                string cntr_ids = string.Empty;

                JObject cntr_id_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_cntr);
                if (cntr_id_item["cntr_list"] != null)
                {
                    JArray lst = (JArray)cntr_id_item["cntr_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string cntr_id = lst[i]["cntr_id"].ToString().Trim();

                        if (cntr_id.Length > 0)
                        {
                            if (cntr_ids.Length == 0)
                            {
                                cntr_ids = cntr_id;
                            }
                            else
                            {
                                cntr_ids += "," + cntr_id;
                            }
                        }
                    }
                }

                #endregion 

                bool b = dal.update_service_sub(od_seq,
                    od_service_seq,
                    od_service_sub_seq,
                    od_service_sub_weight,
                    od_service_sub_bluk,
                    od_service_sub_number,
                    od_service_sub_bak,
                    od_route_seqs,
                    od_service_sub_group_cntr_seqs,
                    cntr_ids,
                    od_fee_seqs);

                #region 更新完毕之后，在进行插入/编辑操作

                #region 更新 运程明细
                if (route_item["route_list"] != null)
                {
                    JArray lst = (JArray)route_item["route_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string od_route_seq = (lst[i]["od_route_seq"] == null || lst[i]["od_route_seq"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_seq"].ToString().Trim();
                        string od_route_typ = (lst[i]["od_route_typ"] == null || lst[i]["od_route_typ"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_typ"].ToString().Trim();
                        string od_route_tools_desc = (lst[i]["od_route_tools_desc"] == null || lst[i]["od_route_tools_desc"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_tools_desc"].ToString().Trim();
                        string od_route_tools_no = (lst[i]["od_route_tools_no"] == null || lst[i]["od_route_tools_no"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_tools_no"].ToString().Trim();
                        string od_route_tools_owner = (lst[i]["od_route_tools_owner"] == null || lst[i]["od_route_tools_owner"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_tools_owner"].ToString().Trim();
                        string od_route_from_id = (lst[i]["od_route_from_id"] == null || lst[i]["od_route_from_id"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_from_id"].ToString().Trim();
                        string od_route_to_id = (lst[i]["od_route_to_id"] == null || lst[i]["od_route_to_id"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_to_id"].ToString().Trim();
                        string od_route_etd = (lst[i]["od_route_etd"] == null || lst[i]["od_route_etd"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_etd"].ToString().Trim();
                        string od_route_eta = (lst[i]["od_route_eta"] == null || lst[i]["od_route_eta"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_eta"].ToString().Trim();
                        string od_route_atd = (lst[i]["od_route_atd"] == null || lst[i]["od_route_atd"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_atd"].ToString().Trim();
                        string od_route_ata = (lst[i]["od_route_ata"] == null || lst[i]["od_route_ata"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_ata"].ToString().Trim();
                        string od_route_lines_id = (lst[i]["od_route_lines_id"] == null || lst[i]["od_route_lines_id"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_lines_id"].ToString().Trim();
                        string od_route_record_by_id = record_by_id;
                        string od_route_desc = (lst[i]["od_route_desc"] == null || lst[i]["od_route_desc"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_desc"].ToString().Trim();
                        string od_route_order_by = (i + 1).ToString();
                        string od_route_freight_id = (lst[i]["od_route_freight_id"] == null || lst[i]["od_route_freight_id"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_freight_id"].ToString().Trim();
                        string od_route_bak = (lst[i]["od_route_bak"] == null || lst[i]["od_route_bak"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_bak"].ToString().Trim();
                        string od_route_take_cargo_info = (lst[i]["od_route_take_cargo_info"] == null || lst[i]["od_route_take_cargo_info"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_take_cargo_info"].ToString().Trim();
                        string od_route_delivery_cargo_info = (lst[i]["od_route_delivery_cargo_info"] == null || lst[i]["od_route_delivery_cargo_info"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_delivery_cargo_info"].ToString().Trim();
                        string od_route_union_e_f = (lst[i]["od_route_union_e_f"] == null || lst[i]["od_route_union_e_f"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_union_e_f"].ToString().Trim();
                        string od_route_vsl = (lst[i]["od_route_vsl"] == null || lst[i]["od_route_vsl"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_vsl"].ToString().Trim();
                        string od_route_vvd = (lst[i]["od_route_vvd"] == null || lst[i]["od_route_vvd"].ToString().Length == 0) ? string.Empty : lst[i]["od_route_vvd"].ToString().Trim();
                        string ship_no = (lst[i]["ship_no"] == null || lst[i]["ship_no"].ToString().Length == 0) ? string.Empty : lst[i]["ship_no"].ToString().Trim();
                        string load_port = (lst[i]["load_port"] == null || lst[i]["load_port"].ToString().Length == 0) ? string.Empty : lst[i]["load_port"].ToString().Trim();
                        string disc_port = (lst[i]["disc_port"] == null || lst[i]["disc_port"].ToString().Length == 0) ? string.Empty : lst[i]["disc_port"].ToString().Trim();
                       
                        string disc_trans_flag = (lst[i]["disc_trans_flag"] == null || lst[i]["disc_trans_flag"].ToString().Length == 0) ? string.Empty : lst[i]["disc_trans_flag"].ToString().Trim();
                        string load_trans_flag = (lst[i]["load_trans_flag"] == null || lst[i]["load_trans_flag"].ToString().Length == 0) ? string.Empty : lst[i]["load_trans_flag"].ToString().Trim();
                        string e_f_id = (lst[i]["e_f_id"] == null || lst[i]["e_f_id"].ToString().Length == 0) ? string.Empty : lst[i]["e_f_id"].ToString().Trim();
                        string danger_flag = (lst[i]["danger_flag"] == null || lst[i]["danger_flag"].ToString().Length == 0) ? string.Empty : lst[i]["danger_flag"].ToString().Trim();
                        string trade_id = (lst[i]["trade_id"] == null || lst[i]["trade_id"].ToString().Length == 0) ? string.Empty : lst[i]["trade_id"].ToString().Trim();
                        string destination_port = (lst[i]["destination_port"] == null || lst[i]["destination_port"].ToString().Length == 0) ? string.Empty : lst[i]["destination_port"].ToString().Trim();
                        string od_route_seq_out = string.Empty;
                        insert_service_sub_route(od_seq,
                            od_route_seq,
                            od_service_seq,
                            od_service_sub_seq,
                            od_route_typ,
                            od_route_tools_desc,
                            od_route_tools_no,
                            od_route_tools_owner,
                            od_route_from_id,
                            od_route_to_id,
                            od_route_etd,
                            od_route_eta,
                            od_route_atd,
                            od_route_ata, 
                            od_route_lines_id,
                            od_route_record_by_id,
                            od_route_desc,
                            od_route_order_by,
                            od_route_freight_id,
                            od_route_bak,
                            od_route_take_cargo_info,
                            od_route_delivery_cargo_info,
                            od_route_union_e_f,
                            od_route_vsl,
                            od_route_vvd,
                            ref od_route_seq_out
                            );
                        //绑定route_船舶 
                        if (ship_no.Length > 0)
                        { 
                            order_route_bind_ship_voyage(ship_no,
                                od_seq,
                                od_service_seq,
                                od_service_sub_seq,
                                od_route_seq_out,
                                load_port,
                                disc_port,
                                od_route_freight_id,
                                disc_trans_flag,
                                load_trans_flag,
                                e_f_id,
                                danger_flag,
                                trade_id,
                                destination_port);
                        }
                        
                    }
                }
                #endregion 

                #region 更新 箱量
                if (service_sub_group_cntr_item["group_cntr_list"] != null)
                {
                    JArray lst = (JArray)service_sub_group_cntr_item["group_cntr_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string od_service_sub_group_cntr_seq = lst[i]["od_service_sub_group_cntr_seq"].ToString().Trim();

                        if (od_service_sub_group_cntr_seq.Length > 0)
                        {
                           
                            string od_service_sub_group_cntr_typ = (lst[i]["od_service_sub_group_cntr_typ"] == null || lst[i]["od_service_sub_group_cntr_typ"].ToString().Length == 0) ? string.Empty : lst[i]["od_service_sub_group_cntr_typ"].ToString().Trim();
                            string od_service_sub_group_cntr_siz = (lst[i]["od_service_sub_group_cntr_siz"] == null || lst[i]["od_service_sub_group_cntr_siz"].ToString().Length == 0) ? "20" : lst[i]["od_service_sub_group_cntr_siz"].ToString().Trim();
                            string od_service_sub_group_pin_flag = (lst[i]["od_service_sub_group_pin_flag"] == null || lst[i]["od_service_sub_group_pin_flag"].ToString().Length == 0) ? "0" : lst[i]["od_service_sub_group_pin_flag"].ToString().Trim();
                            string od_service_sub_group_cntr_opr_cod = (lst[i]["od_service_sub_group_cntr_opr_cod"] == null || lst[i]["od_service_sub_group_cntr_opr_cod"].ToString().Length == 0) ? string.Empty : lst[i]["od_service_sub_group_cntr_opr_cod"].ToString().Trim();
                            string od_service_sub_group_cntr_number = (lst[i]["od_service_sub_group_cntr_number"] == null || lst[i]["od_service_sub_group_cntr_number"].ToString().Length == 0) ? "0" : lst[i]["od_service_sub_group_cntr_number"].ToString().Trim();

                            insert_service_sub_ref_group_cntr(
                            od_seq,
                            od_service_seq,
                            od_service_sub_seq,
                            od_service_sub_group_cntr_seq,
                            od_service_sub_group_cntr_typ,
                            od_service_sub_group_cntr_siz,
                            od_service_sub_group_pin_flag,
                            od_service_sub_group_cntr_opr_cod,
                            od_service_sub_group_cntr_number);
                        }
                    }
                }
                #endregion

                #region 更新 箱明细
                if (cntr_ids.Length > 0)
                {
                    insert_service_sub_ref_cntr(
                        od_seq,
                        od_service_seq,
                        od_service_sub_seq,
                        cntr_ids);
                }

                //if (cntr_id_item["cntr_list"] != null)
                //{
                //    JArray lst = (JArray)cntr_id_item["cntr_list"];
                //    for (int i = 0; i < lst.Count; i++)
                //    { 
                //        string cntr_no = lst[i]["cntr_no"].ToString().Trim();
                //        string eqp_typ = lst[i]["eqp_typ"].ToString().Trim();
                //        string eqp_siz = lst[i]["eqp_siz"].ToString().Trim();
                //        string seal_no = lst[i]["seal_no"].ToString().Trim();
                //        string bill_no = lst[i]["bill_no"].ToString().Trim();
                //        string cargo_net_wgt = lst[i]["cargo_net_wgt"].ToString().Trim();
                //        string cargo_pick_number = lst[i]["cargo_pick_number"].ToString().Trim();
                //        string cargo_bluk = lst[i]["cargo_bluk"].ToString().Trim();
                //        string opr_cod = lst[i]["opr_cod"].ToString().Trim();
                //        string customs_seal_no = lst[i]["customs_seal_no"].ToString().Trim();
                //        //这里改成 只需要 增加cntr就好了
                //        insert_service_sub_ref_cntr(
                //        od_seq,
                //        od_service_seq,
                //        od_service_sub_seq,
                //        cntr_no,
                //        eqp_typ,
                //        eqp_siz,
                //        seal_no,
                //        bill_no,
                //        cargo_net_wgt,
                //        cargo_pick_number,
                //        cargo_bluk,
                //        opr_cod,
                //        customs_seal_no);
                //    }
                //}
                #endregion 
                
                #region 更新 费用明细 
                if (fee_item["fee_list"] != null)
                {
                    JArray lst = (JArray)fee_item["fee_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string ship_no = (lst[i]["ship_no"] == null || lst[i]["ship_no"].ToString().Length == 0) ? string.Empty : lst[i]["ship_no"].ToString().Trim();

                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();
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
                        string fee_rel_bill_no = lst[i]["fee_rel_bill_no"].ToString().Trim();
                        string fee_rel_opr_cod = lst[i]["fee_rel_opr_cod"].ToString().Trim();

                        string fee_seq_out = string.Empty;

                        //这里改成 只需要 增加cntr就好了
                        bool b2 = insert_order_fee(
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
                            record_by_id,
                            fee_seq,
                            fee_invoice_typ,
                            fee_rel_bill_no,
                            fee_rel_opr_cod,
                            ref fee_seq_out);

                        if (ship_no.Length > 0)
                        {
                            order_fee_bind_ship_voyage(ship_no, fee_seq_out);
                        }
                        else
                        {
                            order_fee_unbind_ship_voyage(string.Empty, fee_seq_out); 
                        }
                    }
                }
                 
                #endregion 


               

                #endregion

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "服务批次更新完成" : "错误: 订单已审核，无法进行修改。");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增/编辑 服务批次的 运程明细
        public string insert_service_sub_route(
            string od_seq,
            string od_route_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string od_route_typ,
            string od_route_tools_desc,
            string od_route_tools_no,
            string od_route_tools_owner,
            string od_route_from_id,
            string od_route_to_id,
            string od_route_etd,
            string od_route_eta,
            string od_route_atd,
            string od_route_ata, 
            string od_route_lines_id,
            string od_route_record_by_id, 
            string od_route_order_by,
            string od_route_desc,
            string od_route_freight_id,
            string od_route_bak,
            string od_route_take_cargo_info,
            string od_route_delivery_cargo_info,
            string od_route_union_e_f,
            string od_route_vsl,
            string od_route_vvd,
            ref string od_route_seq_out)
        {
            try
            { 
                bool b = dal.insert_service_sub_route(
                    od_seq,
                    od_route_seq,
                    od_service_seq,
                    od_service_sub_seq,
                    od_route_typ,
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_route_tools_owner,
                    od_route_from_id,
                    od_route_to_id,
                    od_route_etd,
                    od_route_eta,
                    od_route_atd,
                    od_route_ata, 
                    od_route_lines_id,
                    od_route_record_by_id, 
                    od_route_order_by,
                    od_route_desc, 
                    od_route_freight_id,
                    od_route_bak,
                    od_route_take_cargo_info,
                    od_route_delivery_cargo_info,
                    od_route_union_e_f,
                    od_route_vsl,
                    od_route_vvd, 
                    ref od_route_seq_out);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

      
                lst.Add(new KeyValuePair<string, string>("od_route_seq", od_route_seq_out));

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增服务批次运程完成" : "错误: 订单已审核，无法进行修改。",lst); 

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增/编辑 服务批次的 箱量(仅数量) 
        public string insert_service_sub_ref_group_cntr(
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string od_service_sub_group_cntr_seq,
            string od_service_sub_group_cntr_typ,
            string od_service_sub_group_cntr_siz,
            string od_service_sub_group_pin_flag,
            string od_service_sub_group_cntr_opr_cod,
            string od_service_sub_group_cntr_number )
        {
            try
            {

                string od_service_sub_group_cntr_seq_out = string.Empty;

                bool b = dal.insert_service_sub_ref_group_cntr(
                    od_seq,
                    od_service_seq,
                    od_service_sub_seq,
                    od_service_sub_group_cntr_seq,
                    od_service_sub_group_cntr_typ,
                    od_service_sub_group_cntr_siz,
                    od_service_sub_group_pin_flag,
                    od_service_sub_group_cntr_opr_cod,
                    od_service_sub_group_cntr_number,
                    ref od_service_sub_group_cntr_seq_out);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();


                lst.Add(new KeyValuePair<string, string>("od_service_sub_group_cntr_seq_out", od_service_sub_group_cntr_seq_out));

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增服务批次箱量完成" : "错误: 订单已审核，无法进行修改。", lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增/编辑 服务批次的 箱量(明细)
        public string insert_service_sub_ref_cntr(
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string cntr_ids)
        {
            try
            {

                string od_service_sub_group_cntr_seq_out = string.Empty;

                bool b = dal.insert_service_sub_ref_cntr(
                    od_seq,
                    od_service_seq,
                    od_service_sub_seq,
                    cntr_ids);
                
                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增服务批次箱明细完成" : "错误: 订单已审核，无法进行修改。");

            }
            catch (Exception e)
            {
                throw e;
            }
        }

         
        #endregion

        #region 新增 服务批次的费用
        public string insert_order_fee(
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
            string fee_invoice_typ,
            string fee_rel_bill_no,
            string fee_rel_opr_cod)
        {
            try
            {

                string fee_seq_out = string.Empty;

                bool b = dal.insert_order_fee(
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
                    fee_rel_bill_no,
                    fee_rel_opr_cod,
                    ref fee_seq_out);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("fee_seq", fee_seq_out));

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增费用完成" : "错误: 订单已审核，无法进行修改。",lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool insert_order_fee(
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
             string fee_invoice_typ,
             string fee_rel_bill_no,
             string fee_rel_opr_cod,
             ref string fee_seq_out)
        {
            try
            {

                
                bool b = dal.insert_order_fee(
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
                    fee_rel_bill_no,
                    fee_rel_opr_cod,
                    ref fee_seq_out);

                return b;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 服务批次的费用
        public bool delete_order_fee_of_rec( 
            string od_seq,
            string fee_seqs )
        {
            try
            {

                bool b = dal.delete_order_fee_of_rec(
                    od_seq,
                    fee_seqs );
                return b;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 服务批次的费用
        public bool delete_order_fee_of_pay(
            string od_seq,
            string fee_seqs,
            string od_service_seq,
            string od_service_sub_seq)
        {
            try
            {

                bool b = dal.delete_order_fee_of_pay(
                    od_seq,
                    fee_seqs, 
                    od_service_seq,
                    od_service_sub_seq);
                return b;

            }
            catch (Exception e)
            {
                throw e;
            }
        }


        #endregion 

        #region 判断是否可以删除 服务批次的费用
        public string judge_delete_order_fee(
            string od_seq,
            string fee_seq)
        {
            try
            {

                int b = dal.judge_delete_order_fee(
                    od_seq,
                    fee_seq);
                string msg = string.Empty;

                if (b == 1) msg = "可以删除费用";
                if (b == -1) msg = "错误: 订单已审核，无法进行删除。";
                if (b == -2) msg = "错误: 费用已审核或提交OA，无法进行删除。";
                return commone.BLL_commone.result_convert_json(b == 1 ? 1 : 0,
                    msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool bat_judge_delete_order_fee(
            string od_seq,
            string fee_seq)
        {
            try
            {

                int b = dal.judge_delete_order_fee(
                    od_seq,
                    fee_seq);
                
              
                return b == 1;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 

        
        #region 更新 应收费用
        public string update_order_fee_of_rec(
            string od_seq, 
            string data_fee,
            string od_profit_and_loss_bak,
            string record_by_id
            )
        {
            try
            {

                update_profit_and_loss_bak(od_seq, od_profit_and_loss_bak);

                #region 先得到 序号集合
                string od_fee_seqs = string.Empty;
                JObject fee_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_fee);
                if (fee_item["fee_list"] != null)
                {
                    JArray lst = (JArray)fee_item["fee_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();

                        if (fee_seq.Length > 0)
                        {
                            if (od_fee_seqs.Length == 0)
                            {
                                od_fee_seqs = fee_seq;
                            }
                            else
                            {
                                od_fee_seqs += "," + fee_seq;
                            }
                        }
                    }
                } 
                #endregion

                bool b = delete_order_fee_of_rec(od_seq, 
                    od_fee_seqs); 

                #region 更新 费用明细
                if (fee_item["fee_list"] != null)
                {
                    JArray lst = (JArray)fee_item["fee_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();
                        string od_service_seq = lst[i]["od_service_seq"].ToString().Trim();
                        string od_service_sub_seq = lst[i]["od_service_sub_seq"].ToString().Trim();

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
                        string fee_rel_bill_no = lst[i]["fee_rel_bill_no"].ToString().Trim();
                        string fee_rel_opr_cod = lst[i]["fee_rel_opr_cod"].ToString().Trim();
                        //这里改成 只需要 增加cntr就好了
                        insert_order_fee(
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
                            record_by_id,
                            fee_seq,
                            fee_invoice_typ,
                            fee_rel_bill_no,
                            fee_rel_opr_cod);
                    }
                }
               
                #endregion
               

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "应收费用信息更新完成" : "错误: 订单已审核，无法进行修改。");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 编辑订单 盈亏说明
        public bool update_profit_and_loss_bak(
            string od_seq,
            string od_profit_and_loss_bak
            )
        {
            try
            {
                return dal.update_profit_and_loss_bak(od_seq,od_profit_and_loss_bak);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 编辑订单 附件 运单和装箱信息
        public string update_order_addition_infos(
            string od_seq,
            string od_bill_typ,
            string od_sign_bill_typ,
            string od_declare_customs_typ,
            string od_carriage_typ,
            string od_stuffing_container_typ,
            string od_stuffing_container_place,
            string od_entry_tim_of_stuffing,
            string od_out_tim_of_stuffing 
            )
        {
            try
            {
                bool b = dal.update_order_addition_infos(od_seq, 
                    od_bill_typ,
                    od_sign_bill_typ,
                    od_declare_customs_typ,
                    od_carriage_typ,
                    od_stuffing_container_typ,
                    od_stuffing_container_place,
                    od_entry_tim_of_stuffing,
                    od_out_tim_of_stuffing);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "运单及装箱信息更新完成" : "错误: 订单已审核，无法进行修改。");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 集装箱 装箱信息
        #region 增加 装箱图片
        public string insert_order_cntr_file(
            string od_seq,
            string cntr_id,
            string file_nam,
            string file_path,
            string file_record_id )
        {
            try
            {
                string file_seq = string.Empty;

                bool b = dal.insert_order_cntr_file(
                    od_seq,
                    cntr_id,
                    file_nam,
                    file_path,
                    file_record_id,
                    ref file_seq);

                if (b)
                {
                    string order_cntr_stuffing_list = get_order_cntr_file_info(od_seq);
                    string order_cntr_file_info_by_cntr_id_list = get_order_cntr_file_info_by_cntr_id_arr(od_seq, cntr_id);
                    List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                    lst.Add(new KeyValuePair<string, string>("file_seq", file_seq));
                    lst.Add(new KeyValuePair<string, string>("order_cntr_stuffing_list", order_cntr_stuffing_list));
                    lst.Add(new KeyValuePair<string, string>("order_cntr_file_info_by_cntr_id_list", order_cntr_file_info_by_cntr_id_list));

                    return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "新增集装箱装箱图片完成" : "错误: 订单已审核，无法进行修改。", lst);
                }
                else
                {
                    return commone.BLL_commone.result_convert_json(0,
                     "错误: 订单已审核，无法进行修改。");
                }

                
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 删除 装箱图片
        public string delete_order_cntr_file(
            string od_seq,
            string cntr_id,
            string file_seq)
        {
            try
            { 
                bool b = dal.delete_order_cntr_file(
                    od_seq,
                    cntr_id,
                    file_seq);
                if (b)
                {
                    string order_cntr_stuffing_list = get_order_cntr_file_info(od_seq);
                    string order_cntr_file_info_by_cntr_id_list = get_order_cntr_file_info_by_cntr_id_arr(od_seq, cntr_id);
                    List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                   
                    lst.Add(new KeyValuePair<string, string>("order_cntr_stuffing_list", order_cntr_stuffing_list));
                    lst.Add(new KeyValuePair<string, string>("order_cntr_file_info_by_cntr_id_list", order_cntr_file_info_by_cntr_id_list));

                    return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "删除集装箱装箱图片完成" : "错误: 订单已审核，无法进行修改。", lst);
                }
                else
                {
                    return commone.BLL_commone.result_convert_json(0,
                     "错误: 订单已审核，无法进行修改。");
                }
               
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #region 合同文件
        #region 增加
        public bool bat_insert_contract_file(string od_seq, string json_contract_file){
            try
            {
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json_contract_file);
                if (data_item["contract_file"] != null)
                {
                    JArray lst = (JArray)data_item["contract_file"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string file_seq_out = string.Empty;

                        string file_nam = lst[i]["file_nam"].ToString().Trim();
                        string file_path = lst[i]["file_path"].ToString().Trim();
                        string file_record_id = lst[i]["file_record_id"].ToString().Trim();
                        string amc_id = lst[i]["amc_id"].ToString().Trim();
                        string amc_no = lst[i]["amc_no"].ToString().Trim();
                        string file_seq = lst[i]["file_seq"].ToString().Trim();
                        insert_order_contract_file(
                            od_seq,
                            file_nam,
                            file_path,
                            file_record_id,
                            amc_id,
                            amc_no,
                            file_seq );

                    }
                }

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string insert_order_contract_file(
            string od_seq,
            string file_nam,
            string file_path,
            string file_record_id,
            string amc_id,
            string amc_no,
            string file_seq)
        {
            try
            {
                string file_seq_out = string.Empty;
                bool b = dal.insert_order_contract_file(
                    od_seq,
                    file_nam,
                    file_path,
                    file_record_id,
                    amc_id,
                    amc_no,
                    file_seq,
                    ref file_seq_out);
                if (b)
                {
                    string order_contract_file_info = get_order_contract_file_info(od_seq);
                    List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                    lst.Add(new KeyValuePair<string, string>("order_contract_file_info", order_contract_file_info));
                    lst.Add(new KeyValuePair<string, string>("file_seq", file_seq));
                    return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "新增合同文件完成" : "错误: 订单已进入审核锁定，无法修改合同附件。", lst);
                }
                else
                {
                    return commone.BLL_commone.result_convert_json(0,
                     "错误: 订单已进入审核锁定，无法修改合同附件。");
                } 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 删除
        public string delete_order_contract_file(
            string od_seq,
            string file_seq)
        {
            try
            { 
                bool b = dal.delete_order_contract_file(
                    od_seq,
                    file_seq);
                if (b)
                {
                    string order_contract_file_info = get_order_contract_file_info(od_seq);
                    List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                    lst.Add(new KeyValuePair<string, string>("order_contract_file_info", order_contract_file_info)); 
                    return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                        b ? "删除合同文件完成" : "错误: 订单已进入审核锁定，无法修改合同附件。", lst);
                }
                else
                {
                    return commone.BLL_commone.result_convert_json(0,
                     "错误: 订单已进入审核锁定，无法修改合同附件。");
                } 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion


        #region 应付和船期  2021-7-21

        #region 预计算
        public string pre_computer_order_fee_of_ship_voyage(
            string ship_no,
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string load_port,
            string disc_port,
            string freight_id,
            string disc_trans_flag,
            string load_trans_flag,
            string e_f_id,
            string danger_flag,
            string trade_id)
        {
            try
            { 
                DataTable dt = dal.pre_computer_order_fee_of_ship_voyage(
                    ship_no,
                    od_seq,
                    od_service_seq,
                    od_service_sub_seq,  
                    load_port,
                    disc_port,
                    freight_id,
                    disc_trans_flag,
                    load_trans_flag,
                    e_f_id,
                    danger_flag,
                    trade_id );
                string json = commone.BLL_commone.data_convert_json(dt);
                return json;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion


        #region 绑定route
        public bool order_route_bind_ship_voyage(
            string ship_no,
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string od_route_seq,

            string load_port,
            string disc_port,
            string freight_id,
            string disc_trans_flag,
            string load_trans_flag,
            string e_f_id,
            string danger_flag,
            string trade_id,
            string destination_port
        )
        {
            try
            {
                bool b = dal.order_route_bind_ship_voyage(ship_no, od_seq,
                    od_service_seq,
                    od_service_sub_seq,
                    od_route_seq,

                    load_port,
                    disc_port,
                    freight_id,
                    disc_trans_flag,
                    load_trans_flag,
                    e_f_id,
                    danger_flag,
                    trade_id,
                    destination_port);
                return b;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #region

        #endregion
        #endregion

        #region 费用绑定与解绑
        //绑定费用 
        public string order_fee_bind_ship_voyage(
            string ship_no,
            string fee_seq)
        {
            try
            {
                bool b = dal.order_fee_bind_ship_voyage(ship_no, fee_seq );
                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "费用绑定船期成功" : "错误: 订单已审核，无法进行修改。");

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //解除绑定费用 
        public string order_fee_unbind_ship_voyage(
            string ship_no,
            string fee_seq)
        {
            try
            {
                bool b = dal.order_fee_unbind_ship_voyage(ship_no, fee_seq);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "费用解除绑定船期成功" : "错误: 订单已审核，无法进行修改。");

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool bat_order_fee_unbind_ship_voyage(
            string ship_no,
            string fee_seq)
        {
            try
            {
                bool b = dal.order_fee_unbind_ship_voyage(ship_no, fee_seq);
                return b;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 集装箱删除 预判断
        public string judge_delete_cntr(
            string od_seq,
            string cntr_id)
        {
            try
            {
                int b = dal.judge_delete_cntr(od_seq, cntr_id );
                string msg = string.Empty;

                if (b == 1)
                {
                    return commone.BLL_commone.result_convert_json(1,
                         "可以移除"  );
                }
                if (b == -1)
                {
                    return commone.BLL_commone.result_convert_json(0,
                         "错误:委托已提审核，无法移除集装箱信息。");
                }
                if (b == -2)
                {
                    return commone.BLL_commone.result_convert_json(0,
                         "错误:集装箱绑定了船舶，且船舶配载已关闭，无法移除。");
                }

                return commone.BLL_commone.result_convert_json(0,
                         "异常:请截图并联系管理员。");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 判定绑定集装箱是否对这个船进行了二次绑定
        public string judge_bind_ship_voyage(
            string ship_no,
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq)
        {
            try
            {
                bool b = dal.judge_bind_ship_voyage(ship_no, od_seq, od_service_seq, od_service_sub_seq);


                return commone.BLL_commone.result_convert_json(b?1:0,
                    b?"可以绑定": "异常:不能将不同委托相同集装箱号绑定到一个条船上。");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
        #endregion 

        #endregion



        #endregion
    }
}
