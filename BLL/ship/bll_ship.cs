using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using DAL.ship;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace BLL.ship
{
    public class bll_ship
    {
        dal_ship dal = null;
        public bll_ship()
        {
            dal = new dal_ship();
        }

        #region 船舶管理
        #region 获取船列表
        public string get_ship_list(string like_str, 
            string c_id,
            string page, 
            string rows, 
            string sort, 
            string ordersort)
        {
            try
            {
                int rowcount =0 ;
                DataTable dt = dal.get_ship_list(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);
                string json = commone.BLL_commone.data_convert_json(dt,rowcount);
                return json;

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增/修改船
        public string insert_update_ship(
            string c_id,
           string ship_id,
           string ship_desc,
           string ship_en_cod,
           string ship_en_long_cod,
           string ship_rent_cu_id,
           string ship_relation_phone,
           string ship_max_std_cntr_num,
           string ship_custom_no,
           string ship_original_no,
           string ship_regist_no,
           string ship_recognition_no,
           string ship_valid,
           string uid)
        {
            try
            {

                bool b = dal.insert_update_ship(c_id,ship_id, ship_desc, ship_en_cod,ship_en_long_cod,
                    ship_rent_cu_id,ship_relation_phone, ship_max_std_cntr_num,
                    ship_custom_no,ship_original_no,ship_regist_no,ship_recognition_no,
                    ship_valid,uid);
                if (b)
                {
                    return commone.BLL_commone.result_convert_json(1,"操作成功");
                }
                else
                {
                    return commone.BLL_commone.result_convert_json(0, "错误");
                }
                
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        public string get_ship_by_like_str_for_combogrid(string like_str,
            string c_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                DataTable dt = dal.get_ship_by_like_str_for_combogrid(like_str,
                      c_id,
                      page,
                      rows,
                      sort,
                      ordersort,
                    ref rowcount);
                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                return json;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 船期管理
        #region 单个查询
        public string get_ship_voyage_single(
            string ship_no 
            )
        {
            try
            { 
                string group_fee_desc = "";
                DataTable dt = dal.get_ship_voyage_single(ship_no,  ref group_fee_desc); 
                JObject jo = new JObject();

                if (dt == null)
                {
                    jo["total"] = 0;
                    jo["rows"] = new JArray();
                    jo["group_fee_desc"] = group_fee_desc;
                    jo["group_cntr_list"] = new JArray();
                }
                else
                {
                    jo["total"] = dt.Rows.Count; 
                    jo["rows"] = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));
                    jo["group_fee_desc"] = group_fee_desc;
                    DataTable dt_cntr = dal.get_ship_cntr_group(ship_no);
                    jo["group_cntr_list"] = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt_cntr));
                     
                } 

                return jo.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 分页查询
        public string get_ship_voyage_list(
            string voyage_no,
            string ship_id,
            string vl_id,
            string c_id,
            string status_id,
            string etd_begin,
            string etd_end,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                string group_fee_desc = "";
                DataTable dt = dal.get_ship_voyage_list(voyage_no, ship_id, vl_id, c_id, status_id, etd_begin, etd_end, page, rows, sort, ordersort, ref rowcount, ref group_fee_desc);
 
                 
                //if (dt_fee != null || dt_fee.Rows.Count > 0)
                //{
                //    foreach (DataRow item in dt_fee.Rows)
                //    {
                //        group_fee_desc =   item["fio_pay"].ToString() + ";" + item["cy_pay"].ToString() + ";" + item["total_pay"].ToString();
                //    }
                //}


                if (dt == null || dt.Rows.Count == 0)
                {
                    return "{\"total\":0,\"rows\":[],\"group_fee_desc\":"+group_fee_desc+"}";
                }
                else
                {
                    string context = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
                    return "{\"total\":" + rowcount + ",\"rows\":" + context + ",\"group_fee_desc\":\"" + group_fee_desc + "\"}";
                }
                
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 删除船期
        public string delete_ship_voyage(string ship_no)
        {
            try
            {
                int b = dal.delete_ship_voyage(ship_no);

                if (b == 1)
                {
                    return commone.BLL_commone.result_convert_json(1, "删除船期成功"  );
                }
                if (b == -1)
                {
                    return commone.BLL_commone.result_convert_json( 0, "错误:航次已关闭无法删除");
                }
                if (b == -2)
                {
                    return commone.BLL_commone.result_convert_json(0, "错误:关联费用已归账(交账)，不可删除");
                }
                if (b == -3)
                {
                    return commone.BLL_commone.result_convert_json(0, "错误:关联委托锁定审核(中)，不可删除");
                }
                return string.Empty;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 关闭航次
        public string close_ship_voyage(string ship_no, string complete_by_uid)
        {
            try
            {
                int b = dal.close_ship_voyage(ship_no, complete_by_uid);

                if (b == 1)
                {
                    return commone.BLL_commone.result_convert_json(1, "关闭航次成功");
                }
              
                if (b == -2)
                {
                    return commone.BLL_commone.result_convert_json(0, "航次已结束，不可重复操作");
                }

                return string.Empty;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增船期
        public string insert_ship_voyage(
            string ship_id,
            string voyage_no,
            string vl_id,
            string ETD,
            string ETA,
            string bak,
            string start_area_id,
            string end_area_id,
            string create_by_id,
            string c_id)
        {
            try
            {
                string ship_no = string.Empty;
                bool b = dal.insert_ship_voyage(ship_id, voyage_no, vl_id, ETD, ETA, bak, start_area_id, end_area_id, create_by_id,c_id, ref ship_no);

                JObject jo = new JObject();
                
                
                if (b)
                {
                    jo["result"] = 1;
                    jo["ship_no"] = ship_no;
                    jo["msg"] = "新增船期完成"; 
                }
                else
                {
                    jo["result"] = 1; 
                    jo["msg"] = "错误:新增船期失败，存在相同的船名航次！"; 
                }
                return jo.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 更新船期
        public string update_ship_voyage(
            string ship_id,
            string ship_no,
            string voyage_no,
            string vl_id,
            string ETD,
            string ETA,
            string bak,
            string start_area_id,
            string end_area_id,
            string update_by_id)
        {
            try
            {

                bool b = dal.update_ship_voyage(ship_id, ship_no, voyage_no, vl_id, ETD, ETA, bak, start_area_id, end_area_id, update_by_id);
                JObject jo = new JObject();


                if (b)
                {
                    jo["result"] = 1;
                    jo["ship_no"] = ship_no;
                    jo["msg"] = "更新船期完成";
                }
                else
                {
                    jo["result"] = 1;
                    jo["msg"] = "错误:更新船期失败，存在相同的船名航次！";
                }
                return jo.ToString();
                
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        public string get_ship_voyage_by_like_str_for_combogrid(string like_str, string c_id, string page, string rows, string sort, string ordersort)
        {
            try
            {
                int rowcount = 0;
                DataTable dt = dal.get_ship_voyage_by_like_str_for_combogrid(like_str,c_id,page, rows, sort, ordersort, ref rowcount);
                return commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception)
            {
                
                throw;
            }
        }

        #region 集装箱
        //获取集装箱 
        public string get_ship_cntr_list(string ship_no)
        {

            try 
	        {
                string group_cntr_desc = string.Empty;

                DataTable dt = dal.get_ship_cntr_list(ship_no, ref group_cntr_desc);
                JObject jo = new JObject();

                if (dt == null)
                {
                    jo["total"] = 0;
                    jo["rows"] = new JArray();
                    jo["group_cntr_desc"] = group_cntr_desc; 
                }
                else
                {
                    jo["total"] = dt.Rows.Count;
                    jo["rows"] = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));
                    jo["group_cntr_desc"] = group_cntr_desc; 
                }

                return jo.ToString(); 
	        }
	        catch (Exception)
	        {
		
		        throw;
	        }
        }

        public JObject get_ship_cntr_by_delegate_cu_id(string ship_no,
            string c_id,
            string od_delegate_cu_id,
            string load_port,
            string disc_port )
        {
            try
            {
                
                string c_desc = string.Empty;
                string down_date = string.Empty;
                string ship_desc = string.Empty;
                string ship_voyage = string.Empty;
                string load_port_desc = string.Empty;
                string disc_port_desc = string.Empty;
                string od_delegate_cu_desc = string.Empty;

                DataTable dt = dal.get_ship_cntr_by_delegate_cu_id(ship_no,
                c_id,
                od_delegate_cu_id,
                load_port,
                disc_port,
                ref c_desc,
                ref down_date,
                ref ship_desc,
                ref ship_voyage,
                ref load_port_desc,
                ref disc_port_desc,
                ref od_delegate_cu_desc);

                JObject jo = new JObject();
                jo["c_desc"] = c_desc;
                jo["down_date"] = down_date;
                jo["ship_desc"] = ship_desc;
                jo["ship_voyage"] = ship_voyage;
                jo["load_port_desc"] = load_port_desc;
                jo["disc_port_desc"] = disc_port_desc;
                jo["od_delegate_cu_desc"] = od_delegate_cu_desc;

                jo["rows"] = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));
                return jo;
            }
            catch (Exception)
            {

                throw;
            }
        }

        //移除集装箱
        public string remove_ship_cntr(string ship_no,string json_cntr_of_ship_voyage)
        {
            try
            {
                JObject fee_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json_cntr_of_ship_voyage);
                if (fee_item["cntr_list"] != null)
                {
                    JArray lst = (JArray)fee_item["cntr_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string od_seq = lst[i]["od_seq"].ToString().Trim();
                        string od_route_seq = lst[i]["od_route_seq"].ToString().Trim();
                        string od_service_seq = lst[i]["od_service_seq"].ToString().Trim();
                        string od_service_sub_seq = lst[i]["od_service_sub_seq"].ToString().Trim();
                        string cntr_id = lst[i]["cntr_id"].ToString().Trim();

                        int b =  dal.remove_ship_cntr(ship_no,
                            od_seq,
                            od_service_seq,
                            od_service_sub_seq,
                            od_route_seq,
                            cntr_id);

                        if (b == 1)
                        {
                            lst[i]["remove_result"] = 1;
                            lst[i]["remove_msg"] = "移除成功";
                        }else{
                            lst[i]["remove_result"] = 0;
                            lst[i]["remove_msg"] = (b == -1 ? "错误:订单锁定" : "错误:船舶配载关闭");
                        } 
                    }
                }


                return fee_item.ToString();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public string get_ship_cntr_group(string ship_no)
        {

            try
            {
                DataTable dt = dal.get_ship_cntr_group(ship_no);
                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 计费
         
        public string get_ship_fee_list(string ship_no)
        {
            try
            {
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_ship_fee_list(ship_no, ref group_fee_desc);
                 
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("group_fee_desc", group_fee_desc));

                int total = (dt == null ? 0 : dt.Rows.Count);

                return commone.BLL_commone.data_convert_json(dt, dt.Rows.Count, lst);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public string unbind_ship_fee(string ship_no, string json_fee_of_ship_voyage)
        {
            try
            {
                JObject fee_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json_fee_of_ship_voyage);
                if (fee_item["fee_list"] != null)
                {
                    JArray lst = (JArray)fee_item["fee_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();

                        order.bll_order bo = new order.bll_order();
                        bool b = bo.bat_order_fee_unbind_ship_voyage(ship_no, fee_seq);
                        if (b)
                        {
                            lst[i]["unbind_result"] = 1;
                        }
                        else
                        {
                            lst[i]["unbind_result"] = 0;
                        }  
                    }
                }

                return fee_item.ToString();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public string remove_ship_fee(string ship_no, string json_fee_of_ship_voyage)
        {
            try
            {
                JObject fee_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json_fee_of_ship_voyage);
                if (fee_item["fee_list"] != null)
                {
                    JArray lst = (JArray)fee_item["fee_list"];
                    for (int i = 0; i < lst.Count; i++)
                    {
                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();
                        string od_seq = lst[i]["od_seq"].ToString().Trim();
                        string od_servcie_seq = lst[i]["od_servcie_seq"].ToString().Trim();
                        string od_servcie_sub_seq = lst[i]["od_servcie_sub_seq"].ToString().Trim();
                        string rec_or_pay = lst[i]["rec_or_pay"].ToString().Trim();
                        order.bll_order bo = new order.bll_order();
                        bool b = bo.bat_judge_delete_order_fee(ship_no, fee_seq);
                        if (b)
                        {
                            if(rec_or_pay.Equals("-1")){
                                bool b_delete = bo.delete_order_fee_of_pay(od_seq,
                                    fee_seq,
                                    od_servcie_seq,
                                    od_servcie_sub_seq);
                                if (b_delete)
                                {
                                    lst[i]["remove_result"] = 1;
                                }
                                else
                                {
                                    lst[i]["remove_result"] = 0;
                                }
                            }
                            else
                            {
                                bool b_delete = bo.delete_order_fee_of_rec(od_seq,
                                    fee_seq );
                                if (b_delete)
                                {
                                    lst[i]["remove_result"] = 1;
                                }
                                else
                                {
                                    lst[i]["remove_result"] = 0;
                                }
                            } 
                        }
                        else
                        {
                            lst[i]["unbind_result"] = 0;
                        }
                    }
                }

                return fee_item.ToString();
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        #endregion




    }
}
