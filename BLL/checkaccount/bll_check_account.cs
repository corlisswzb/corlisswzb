using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using DAL.checkaccount;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
namespace BLL.checkaccount
{
    public class bll_check_account
    {
        dal_check_account dal = null;

        public bll_check_account()
        {
            dal = new dal_check_account();
        }

        #region 业务员用 

        #region 获取 费用信息
        public string get_order_fee(string c_id,
            string u_id,
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
            string page,
            string rows,
            string sort,
            string ordersort )
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_order_fee(c_id,
                    u_id,
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
            string u_id,
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
            string fee_invoice_lock_flag )
        {
            try
            {
                 
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_order_fee_all(c_id,
                    u_id,
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
                    ref   group_fee_desc);


                JArray data = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));
                JObject obj = new JObject();
                obj["rows"] = data;

                obj["group_fee_desc"] = group_fee_desc;
                return obj;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 账单信息
        //分页 业务员用
        public string get_checkaccount(string c_id,
            string u_id,
            string rec_or_pay,
            string ca_cu_id, 
            string ca_status, 
            string ca_year,
            string ca_month,
            string like_str,
            string ca_create_by_id,
            string ca_invoice_no,
            string ca_fee_total,
            string ca_invoice_typ_status,
            string ca_approval_status,
            string ca_woa_status,
            string page,
            string rows,
            string sort,
            string ordersort )
        {
            try
            {
                
                int rowcount = 0;
                string group_fee_desc = string.Empty;
                DataTable dt = dal.get_checkaccount(c_id,
                    u_id,
                    rec_or_pay,
                    ca_cu_id, 
                    ca_status, 
                    ca_year,
                    ca_month,
                    like_str,
                    ca_create_by_id,
                    ca_invoice_no,
                    ca_fee_total,
                    ca_invoice_typ_status,
                    ca_approval_status,
                    ca_woa_status,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref   rowcount,
                    ref group_fee_desc);
                
                string json = commone.BLL_commone.data_convert_json(dt,rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["group_fee_desc"] = group_fee_desc;

                return data.ToString();

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //不分页 业务员用
        public string get_checkaccount_no_page(string c_id,
            string u_id,
            string rec_or_pay,
            string ca_cu_id,
            string ca_year,
            string ca_month)
        {
            try
            {
 
                DataTable dt = dal.get_checkaccount_no_page(c_id,
                    u_id,
                    rec_or_pay,
                    ca_cu_id, 
                    ca_year,
                    ca_month);

                return commone.BLL_commone.data_convert_json(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string get_checkaccount_by_ca_seq(string ca_seq,
            string u_id )
        {
            try
            {
                //需要合并 基本信息，附件和指定联系人 三个信息 

                DataTable dt = dal.get_checkaccount_by_ca_seq(ca_seq,
                    u_id );
                string json_base = commone.BLL_commone.data_convert_jsonarray(dt);

                string json_attachment = get_attachment_list(ca_seq);

                string json_relation_user = get_relation_user_list(ca_seq);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("ca_main_base", json_base));
                lst.Add(new KeyValuePair<string, string>("attachment_list", json_attachment));
                lst.Add(new KeyValuePair<string, string>("relation_user_list", json_relation_user));

                return commone.BLL_commone.custom_convert_json(lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string get_checkaccount_single_full_collections(string ca_seq,
            string u_id)
        {
            try
            {
                //需要合并 基本信息，附件和指定联系人 三个信息 

                DataTable dt = dal.get_checkaccount_by_ca_seq(ca_seq,
                    u_id);
                string json_base = commone.BLL_commone.data_convert_jsonarray(dt);

                string json_attachment = get_attachment_list(ca_seq);

                string json_relation_user = get_relation_user_list(ca_seq);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("ca_main_base", json_base));
                lst.Add(new KeyValuePair<string, string>("attachment_list", json_attachment));
                lst.Add(new KeyValuePair<string, string>("relation_user_list", json_relation_user));


                JArray data_base = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(json_base);

                if (data_base != null && data_base.Count > 0)
                {
                   
                    int rowcount = 0;

                    string group_fee_desc = string.Empty;
                     
                    DataTable dt_fee_details = dal.get_order_fee_by_ca_seq_for_ap( 
                        u_id, 
                        ca_seq,
                        ref   rowcount,
                        ref   group_fee_desc);

                    string json = commone.BLL_commone.data_convert_json(dt_fee_details, rowcount);
                    JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                    data["group_fee_desc"] = group_fee_desc;
                   

                    lst.Add(new KeyValuePair<string, string>("fee_details", "["+data.ToString()+"]"));
                }

                return commone.BLL_commone.custom_convert_json(lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增对账单
        public string insert_main_list(
            string ca_cu_id,
            string ca_company_id,
            string ca_title,
            string ca_group_flag,
            string ca_rec_or_pay,
            string ca_year,
            string ca_month,
            string ca_bak,
            string ca_create_by_id, 
            string ca_limit_dat,
            string ca_assign_flag,
            string u_ids,
            string data_attachment)
        {
            try
            {
                string ca_seq = string.Empty;
                 
                bool b = dal.insert_main_list(ca_cu_id,
                    ca_company_id,
                    ca_title,
                    ca_group_flag,
                    ca_rec_or_pay,
                    ca_year,
                    ca_month,
                    ca_bak,
                    ca_create_by_id,
                    ca_limit_dat,
                    ca_assign_flag,
                    ref ca_seq);

                if (ca_assign_flag.Equals("1") && u_ids.Length > 0)
                {
                    update_relation_user_list(ca_seq, u_ids, ca_create_by_id);
                }
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_attachment);
                if (data_item["attachment_list"] != null)
                {
                    JArray lst_attachments = (JArray)data_item["attachment_list"];
                    string file_seqs = string.Empty;

                    for (int i = 0; i < lst_attachments.Count; i++)
                    {
                        if (file_seqs.Equals(string.Empty))
                        {
                            file_seqs = lst_attachments[i]["file_seq"].ToString();
                        }
                        else
                        {
                            file_seqs += "," + lst_attachments[i]["file_seq"].ToString();
                        }
                    }

                    delete_attachment_list(ca_seq,ca_create_by_id,file_seqs);
                    for (int i = 0; i < lst_attachments.Count; i++)
                    {
                        string file_seq = lst_attachments[i]["file_seq"].ToString();
                        string file_nam =  lst_attachments[i]["file_nam"].ToString();
                        string file_path =  lst_attachments[i]["file_path"].ToString();
                        string file_seq_out = string.Empty;
                        update_attachment_list(ca_seq,file_seq, ca_create_by_id, file_path, file_nam, ref file_seq_out); 
                    }
                }

 
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("ca_seq", ca_seq));
               
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增账单成功" : "错误:存在相同的账单名称。", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool insert_main_list_of_boolresult(
            string ca_cu_id,
            string ca_company_id,
            string ca_title,
            string ca_group_flag,
            string ca_rec_or_pay,
            string ca_year,
            string ca_month,
            string ca_bak,
            string ca_create_by_id,
            string ca_limit_dat,
            string ca_assign_flag,
            string u_ids,
            string data_attachment,
            ref string ca_seq)
        {
            try
            {
             
                bool b = dal.insert_main_list(ca_cu_id,
                    ca_company_id,
                    ca_title,
                    ca_group_flag,
                    ca_rec_or_pay,
                    ca_year,
                    ca_month,
                    ca_bak,
                    ca_create_by_id,
                    ca_limit_dat,
                    ca_assign_flag,
                    ref ca_seq);

                if (ca_assign_flag.Equals("1") && u_ids.Length > 0)
                {
                    update_relation_user_list(ca_seq, u_ids, ca_create_by_id);
                }

                if (!data_attachment.Equals(string.Empty))
                {
                    JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_attachment);
                    if (data_item["attachment_list"] != null)
                    {
                        JArray lst_attachments = (JArray)data_item["attachment_list"];
                        string file_seqs = string.Empty;

                        for (int i = 0; i < lst_attachments.Count; i++)
                        {
                            if (file_seqs.Equals(string.Empty))
                            {
                                file_seqs = lst_attachments[i]["file_seq"].ToString();
                            }
                            else
                            {
                                file_seqs += "," + lst_attachments[i]["file_seq"].ToString();
                            }
                        }

                        delete_attachment_list(ca_seq, ca_create_by_id, file_seqs);
                        for (int i = 0; i < lst_attachments.Count; i++)
                        {
                            string file_seq = lst_attachments[i]["file_seq"].ToString();
                            string file_nam = lst_attachments[i]["file_nam"].ToString();
                            string file_path = lst_attachments[i]["file_path"].ToString();
                            string file_seq_out = string.Empty;
                            update_attachment_list(ca_seq, file_seq, ca_create_by_id, file_path, file_nam, ref file_seq_out);
                        }
                    }
                }
                


                return b;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改对账单
        public string update_main_list(
            string ca_title,
            string ca_group_flag,
            string ca_year,
            string ca_month,
            string ca_bak,
            string ca_create_by_id,
            string ca_seq,
            string ca_limit_dat,
            string ca_assign_flag,
            string u_ids,
            string data_attachment)
        {
            try
            { 
                int b = dal.update_main_list(  
                    ca_title,
                    ca_group_flag, 
                    ca_year,
                    ca_month,
                    ca_bak,
                    ca_create_by_id,
                    ca_seq,
                    ca_limit_dat,
                    ca_assign_flag);
                string msg = "";

                if (b == 1)
                {
                    msg = "修改账单完成";
                }
                if (b == -1)
                {
                    msg = "存在相同的账单名称，无法修改账单";
                }
                if (b == -2)
                {
                    msg = "您不是账单创建者，无法修改账单";
                }
                if (b == -3)
                {
                    msg = "账单已交账，无法修改账单";
                }

                if (b == 1)
                {
                    update_relation_user_list(ca_seq, u_ids, ca_create_by_id);

                    JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_attachment);
                    if (data_item["attachment_list"] != null)
                    {
                        JArray lst_attachments = (JArray)data_item["attachment_list"];
                        string file_seqs = string.Empty;

                        for (int i = 0; i < lst_attachments.Count; i++)
                        {
                            if (file_seqs.Equals(string.Empty))
                            {
                                file_seqs = lst_attachments[i]["file_seq"].ToString();
                            }
                            else
                            {
                                file_seqs += "," + lst_attachments[i]["file_seq"].ToString();
                            }
                        }

                        delete_attachment_list(ca_seq, ca_create_by_id, file_seqs);
                        for (int i = 0; i < lst_attachments.Count; i++)
                        {
                            string file_seq = lst_attachments[i]["file_seq"].ToString();
                            string file_nam = lst_attachments[i]["file_nam"].ToString();
                            string file_path = lst_attachments[i]["file_path"].ToString();
                            string file_seq_out = string.Empty;
                            update_attachment_list(ca_seq,file_seq, ca_create_by_id, file_path, file_nam, ref file_seq_out);
                        }
                    }
                }

                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0,msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string update_main_list_simple(
            string ca_title,  
            string ca_bak,
            string ca_cu_id,
            string u_id,
            string ca_seq )
        {
            try
            {
                int b = dal.update_main_list_simple(
                    ca_title,  
                    ca_bak,
                    ca_cu_id,
                    u_id,
                    ca_seq );

                string msg = "";

                if (b == 1)
                {
                    msg = "修改账单完成";
                }
                if (b == -1)
                {
                    msg = "费用中存在已销账费用，无法修改账单";
                }
                if (b == -2)
                {
                    msg = "您不是账单创建者，无法修改账单";
                }
                if (b == -3)
                {
                    msg = "账单已交账，无法修改账单";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除对账单
        public string delete_main_list(
            string ca_seqs,
            string ca_update_by_id)
        {
            try
            {
                int b = dal.delete_main_list(
                   ca_seqs,
                   ca_update_by_id);
                string msg = "";

                if (b == 1)
                {
                    msg = "删除账单完成";
                }
                if (b == -1)
                {
                    msg = "账单已交账，无法删除账单";
                }
                if (b == -2)
                {
                    msg = "您不是账单创建者，无法删除账单";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 账单附件
        #region 新增
        public string update_attachment_list(
            string ca_seq,
            string file_seq,
            string file_record_id,
            string file_path,
            string file_nam,
            ref string file_seq_out)
        {
            try
            {
                int b = dal.update_attachment_list(
                   ca_seq,
                   file_seq,
                   file_record_id,
                   file_path,
                   file_nam,
                   ref file_seq_out);
                string msg = "";

                if (b == 1)
                {
                    msg = "账单附件新增完成";
                }
                if (b == -1)
                {
                    msg = "账单已交账，无法添加附件";
                }
                if (b == -2)
                {
                    msg = "您不是账单创建者，无法添加附件";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除
        public bool delete_attachment_list(
            string ca_seq,
            string file_update_id,
            string file_seqs)
        {
            try
            {
                int b = dal.delete_attachment_list(
                   ca_seq,
                   file_update_id,
                   file_seqs);
                string msg = "";

                if (b == 1)
                {
                    msg = "账单附件删除完成";
                }
                if (b == -1)
                {
                    msg = "账单已交账，无法删除附件";
                }
                if (b == -2)
                {
                    msg = "您不是账单创建者，无法删除附件";
                }
                return b == 1;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取
        public string get_attachment_list(
            string ca_seq)
        {
            try
            {
                DataTable dt = dal.get_attachment_list(ca_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 联合账单 指定对账人
        #region 新增
        public bool update_relation_user_list(
            string ca_seq,
            string u_ids,
            string update_id)
        {
            try
            {
                int b = dal.update_relation_user_list(
                   ca_seq,
                   u_ids,
                   update_id);

                if (b == 1) return true;
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取
        public string get_relation_user_list(
            string ca_seq)
        {
            try
            {
                DataTable dt = dal.get_relation_user_list(ca_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion


        #region 费用加入对账单
        public string insert_fee_details(
            string ca_seq,
            string fee_seqs,
            string record_by_id)
        {
            try
            {
                int b = dal.insert_fee_details(
                  ca_seq,
                  fee_seqs,
                  record_by_id);
                string msg = "";

                if (b == 1)
                {
                    msg = "费用归账成功";
                }
                if (b == -1)
                {
                    msg = "错误: 账单已关闭归账入口，无法新增费用到账单中";
                }
                if (b == -2)
                {
                    msg = "错误: 账单结算单位和导入的费用结算单位不一致";
                }
                if (b == -3)
                {
                    msg = "错误: 账单归属单位和导入的费用归属单位不一致";
                }
                if (b == -4)
                {
                    msg = "错误: 导入的费用数据中同时含有开票和不开票数据";
                }
                if (b == -5)
                {
                    msg = "错误: 账单现有数据的开票属性和导入的费用的开票属性不一致";
                }
                if (b == -6)
                {
                    msg = "错误: 导入费用中含有已归属其他账单的数据";
                }
                if (b == -7)
                {
                    msg = "错误: 导入应收账单的费用，必须满足其所属委托已审核通过";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool insert_fee_details_of_boolresult(
            string ca_seq,
            string fee_seqs,
            string record_by_id)
        {
            try
            {
                int b = dal.insert_fee_details(
                  ca_seq,
                  fee_seqs,
                  record_by_id);
                 
                if (b == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 费用从对账单移除
        public string delete_fee_details(
            string ca_seq,
            string fee_seqs,
            string update_by_id)
        {
            try
            {
                int b = dal.delete_fee_details(
                   ca_seq,
                   fee_seqs,
                   update_by_id);
                string msg = "";

                if (b == 1)
                {
                    msg = "账单移除费用成功";
                }
                if (b == -1)
                {
                    msg = "错误: 账单已交账，无法移除费用";
                }
                if (b == -2)
                {
                    msg = "错误: 当前操作人不是账单创建人不能移除费用";
                }
                if (b == -3)
                {
                    msg = "错误: 当前操作人不是费用录入人不能移除费用";
                }
                
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取对账单费用
        public string get_order_fee_by_ca_seq(string c_id,
            string u_id,
            string rec_or_pay,
            string ca_seq )
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;
                DataTable dt = dal.get_order_fee_by_ca_seq(c_id,
                    u_id, 
                    rec_or_pay,
                    ca_seq,
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
        public JObject get_order_fee_by_fee_seqs(string fee_seqs)
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;
                DataTable dt = dal.get_order_fee_by_fee_seqs(fee_seqs,
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
        #endregion

   
        #region 账单投递
        public string post(
            string ca_seq,
            string cur_opr_id,
            string ca_bak)
        {
            try
            {
                int b = dal.post(
                   ca_seq,
                   cur_opr_id,
                   ca_bak);
                string msg = "";

                if (b == 1)
                {
                    msg = "投递账单成功!";
                }
                if (b == -1)
                {
                    msg = "错误: 账单已交账，无法反复提交!";
                }
                if (b == -2)
                {
                    msg = "错误: 当前操作人不是账单创建人无法提交!";
                }
                if (b == -3)
                {
                    msg = "错误: 提交账单中包含多个币种，当前账套禁止多币种费用合并提交账单!";
                }
                if (b == -4)
                {
                    msg = "错误: 当前账单受结算单位及应收应付条件限制，无法投递，应执行过账操作!";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool post_of_boolresult(
           string ca_seq,
           string cur_opr_id,
           string ca_bak)
        {
            try
            {
                int b = dal.post(
                   ca_seq,
                   cur_opr_id,
                   ca_bak);
               

                if (b == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 下载 单票对账单
        public string get_order_fee_by_ca_seq_for_download(
            string c_id,
            string ca_seq,
            string u_id,
            ref Dictionary<string, string> dic_par)
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
                string ca_title = string.Empty;
                string total_amount = string.Empty;
                

                DataTable dt = dal.get_order_fee_by_ca_seq_for_download(
                    c_id,
                    ca_seq,
                    u_id,
                    ref company_desc,
                    ref company_address,
                    ref company_phone,
                    ref company_cn_bank_info,
                    ref company_en_bank_info,
                    ref print_nam,
                    ref print_dat,
                    ref cu_desc,
                    ref ca_title,
                    ref total_amount );

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
                dic_par.Add("ca_title", ca_title);
                dic_par.Add("total_amount", total_amount); 



                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 专注模式
        #region 所有未归账的费用汇总
        public string get_group_order_fee_of_nonca_by_cu_id(string c_id,
            string u_id,
            string rec_or_pay )
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_group_order_fee_of_nonca_by_cu_id(c_id,
                    u_id, 
                    rec_or_pay, 
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
        #endregion

        #region 所有未归账的费用明细
        public string  get_details_order_fee_of_nonca_by_cu_id(string c_id,
            string u_id,
            string rec_or_pay,
            string cu_id )
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_details_order_fee_of_nonca_by_cu_id(c_id,
                    u_id,
                    rec_or_pay,
                    cu_id,
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
        #endregion

        #endregion

        #endregion 

        #region 商务使用部分
        #region 获取 账单信息
        //分页  业务员用
         

        public string get_checkaccount_bus(string c_id,
            string rec_or_pay,
            string ca_cu_id,
            string ca_status,
            string ca_year,
            string ca_month,
            string like_str,
            string ca_create_by_id, 
            string ca_invoice_no,
            string ca_fee_total,
            string ca_invoice_typ_status,
            string ca_approval_status,
            string ca_woa_status, 
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_checkaccount_bus(c_id,
                    rec_or_pay,
                    ca_cu_id,
                    ca_status,
                    ca_year,
                    ca_month,
                    like_str,
                    ca_create_by_id,  
                    ca_invoice_no,
                    ca_fee_total,
                    ca_invoice_typ_status,
                    ca_approval_status,
                    ca_woa_status,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref   rowcount,
                    ref group_fee_desc);

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
        public string get_checkaccount_group_by_cu_id(string c_id,
            string rec_or_pay, 
            string ca_status_flag,
            string ca_invoice_flag,
            string ca_woa_flag  )
        {
            try
            {
                int rowcount = 0;
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_checkaccount_group_by_cu_id(c_id,
                    rec_or_pay,
                    ca_status_flag,
                    ca_invoice_flag,
                    ca_woa_flag,
                    ref   rowcount,
                    ref group_fee_desc);

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
        public string get_checkaccount_group_by_typ_index(string c_id,
            string rec_or_pay,
            string typ_index)
        {
            try
            {
                int rowcount = 0;
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_checkaccount_group_by_typ_index(c_id,
                    rec_or_pay,
                    typ_index,
                    ref   rowcount,
                    ref group_fee_desc);

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
        public string get_checkaccount_count_by_typ_index(string c_id,
            string rec_or_pay )
        {
            try
            { 

                DataTable dt = dal.get_checkaccount_count_by_typ_index(c_id,
                    rec_or_pay );

                string json = commone.BLL_commone.data_convert_json(dt);


                return json;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_checkaccount_by_typ_index(string c_id,
            string rec_or_pay,
            string typ_index )
        {
            try
            {
                int rowcount = 0;
                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_checkaccount_by_typ_index(c_id,
                    rec_or_pay,
                    typ_index,
                     
                    ref   rowcount,
                    ref group_fee_desc);

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
        public string get_checkaccount_of_rec_need_invoice(string c_id,
            string ca_cu_id,
            string ca_status,
            string ca_year,
            string ca_month,
            string like_str,
            string ca_create_by_id,
            string ca_invoice_status,
            string page,
            string rows,
            string sort,
            string ordersort )
        {
            try
            {
                int rowcount = 0;

                DataTable dt = dal.get_checkaccount_of_rec_need_invoice(c_id,
                        ca_cu_id,
                        ca_status,
                        ca_year,
                        ca_month,
                        like_str,
                        ca_create_by_id,
                        ca_invoice_status,
                        page,
                        rows,
                        sort,
                        ordersort,
                    ref   rowcount);

                return commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 获取对账单费用
        public string get_order_fee_by_ca_seq(string c_id,
            string rec_or_pay,
            string ca_seq )
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;
                string ca_bak = string.Empty;

                DataTable dt = dal.get_order_fee_by_ca_seq(c_id, 
                    rec_or_pay,
                    ca_seq,
                    ref   rowcount,
                    ref   group_fee_desc,
                    ref ca_bak);

                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["group_fee_desc"] = group_fee_desc;
                data["ca_bak"] = ca_bak; 
                return data.ToString();

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private string get_order_fee_by_amc_id(string c_id,
             string rec_or_pay,
             string amc_id)
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty; 

                DataTable dt = dal.get_order_fee_by_amc_id(c_id,
                    rec_or_pay,
                    amc_id,
                    ref   rowcount,
                    ref   group_fee_desc );

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
        public string get_single_pay_checkaccount(string c_id,
             string rec_or_pay,
             string amc_id)
        {
            try
            {
                DataTable dt_single_pay = dal.get_single_pay_checkaccount(amc_id);

                string context = Newtonsoft.Json.JsonConvert.SerializeObject(dt_single_pay);
                JArray arr = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(context);

                JObject j_pay = (Newtonsoft.Json.Linq.JObject)arr[0];


                int rowcount = 0;

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_order_fee_by_amc_id(c_id,
                    rec_or_pay,
                    amc_id,
                    ref   rowcount,
                    ref   group_fee_desc);

                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["group_fee_desc"] = group_fee_desc;
                data["amc_details"] = j_pay;
                return data.ToString();

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 退回账单
        public string giveback_checkaccount(
            string ca_seqs)
        {
            try
            {
                int b = dal.giveback_checkaccount(
                   ca_seqs);
                string msg = "";

                if (b == 1)
                {
                    msg = "账单退回成功";
                }
                if (b == -1)
                {
                    msg = "错误: 账单未提交/已销账锁定，无法退回";
                }
                if (b == -2)
                {
                    msg = "错误: 账单正在审核中，无法退回";
                }
                if (b == -3)
                {
                    msg = "错误: 账单中含有费用已销账，无法退回";
                }
                if (b == -4)
                {
                    msg = "错误: 账单中含有费用加入了对冲计划，无法退回";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 账单投递
        
        public string post_for_bus(
            string ca_seq,
            string cur_opr_id,
            string ca_bak)
        {
            try
            {
                int b = dal.post_for_bus(
                   ca_seq,
                   cur_opr_id,
                   ca_bak);
                string msg = "";

                if (b == 1)
                {
                    msg = "投递账单成功!";
                }
                if (b == -1)
                {
                    msg = "错误: 账单已交账，无法反复提交!";
                }
                if (b == -2)
                {
                    msg = "错误: 当前操作人不是账单创建人无法提交!";
                }
                if (b == -3)
                {
                    msg = "错误: 账单包含费用含有多个币种，当前账套禁止多币种合并提交账单!";
                }
                if (b == -4)
                {
                    msg = "错误: 当前账单受结算单位及应收应付条件限制，无法投递，应执行过账操作!";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 删除对账单
        public string delete_main_list_for_bus(
            string ca_seqs,
            string ca_update_by_id)
        {
            try
            {
                int b = dal.delete_main_list_for_bus(
                   ca_seqs,
                   ca_update_by_id);
                string msg = "";

                if (b == 1)
                {
                    msg = "删除账单完成";
                }
                if (b == -1)
                {
                    msg = "账单已交账，无法删除账单";
                }
                if (b == -2)
                {
                    msg = "您不是账单创建者，无法删除账单";
                }
                if (b == -4)
                {
                    msg = "已标记发票的费用从账单中移除需先解除发票绑定，待重新交账之后再绑定发票";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 费用从对账单移除
        public string delete_fee_details_for_bus(
            string ca_fee_details)
        {
            try
            {
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(ca_fee_details);
                if (data_item["rows"] != null)
                {
                     
                    JArray lst = (JArray)data_item["rows"]; 

                    //需要提前判断一下是否可以删除 
                    string fee_seqs = string.Empty;

                    for (int i = 0; i < lst.Count; i++)
                    {
                        string fee_seq = (lst[i]["fee_seq"] == null || lst[i]["fee_seq"].ToString().Length == 0) ? string.Empty : lst[i]["fee_seq"].ToString().Trim();

                        if (fee_seqs.Equals(string.Empty))
                        {
                            fee_seqs = fee_seq;
                        }
                        else
                        {
                            fee_seqs += "," + fee_seq;
                        }
                    }

                    int nJudge = dal.judge_delete_fee_details_for_bus(fee_seqs);

                    if (nJudge == 1)
                    {
                        for (int i = 0; i < lst.Count; i++)
                        {
                            string fee_seq = (lst[i]["fee_seq"] == null || lst[i]["fee_seq"].ToString().Length == 0) ? string.Empty : lst[i]["fee_seq"].ToString().Trim();
                            string ca_seq = (lst[i]["ca_seq"] == null || lst[i]["ca_seq"].ToString().Length == 0) ? string.Empty : lst[i]["ca_seq"].ToString().Trim();

                            int b = dal.delete_fee_details_for_bus(ca_seq,
                            fee_seq);
                        }

                        return commone.BLL_commone.result_convert_json(1, "从账单中移除费用完成");
                    }
                    else
                    {
                        return commone.BLL_commone.result_convert_json(0, "移除前需要取消费用的发票标记。");
                    }

                   
                }
                return commone.BLL_commone.result_convert_json(0, "请选择要从账单中移除的费用项");
                

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 标记账单
        #region 开票情况
        public string flag_checkaccount_invoice(
            string ca_seqs,
            string cur_opr_id)
        {
            try
            {
                bool b = dal.flag_checkaccount_invoice(
                  ca_seqs,
                  cur_opr_id );

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "账单标记已开票完成" : "异常: 请联系管理员处理");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string unflag_checkaccount_invoice(
            string ca_seqs)
        {
            try
            {
                bool b = dal.unflag_checkaccount_invoice(
                  ca_seqs );

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "账单标记未开票完成" : "异常: 请联系管理员处理");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 销账情况
        public string flag_checkaccount_finace(
            string ca_seqs,
            string cur_opr_id)
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销

                int b = dal.flag_checkaccount_finace(
                  ca_seqs,
                  cur_opr_id);
                string msg = "";

                if (b == 1)
                {
                    msg = "账单标记核销完成";
                }
                if (b == -1)
                {
                    msg = "错误: 账单中部分费用已标记核销，无法反复标记";
                }
                if (b == -2)
                {
                    msg = "错误: 账单中费用需要审核或正在审核过程中，无法完成标记动作";
                }
                

                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string unflag_checkaccount_finace(
            string ca_seqs)
        {
            try
            {
                bool b = dal.unflag_checkaccount_finace(
                  ca_seqs);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "账单取消核销标记完成" : "异常: 请联系管理员处理");


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion 

        #region 根据费用标记
        #region 开票情况
        public string flag_fee_invoice_by_fee_seqs(
            string fee_seqs,
            string cur_opr_id,
            string invoice_no,
            string oi_limit_dat,
            string oi_bak,
            string oi_c_id,
            string oi_rec_or_pay,
            string oi_sub_no,
            string oi_seq,
            string oi_cu_id,
            string oi_invoice_files_json)
        {
            try
            {
                string oi_seq_out = string.Empty;

                bool b = dal.flag_fee_invoice_by_fee_seqs(
                  fee_seqs,
                  cur_opr_id,
                  invoice_no,
                  oi_limit_dat,
                  oi_bak,
                  oi_c_id ,
                  oi_rec_or_pay,
                  oi_sub_no,
                  oi_seq,
                  oi_cu_id,
                  ref oi_seq_out);

                if (b)
                {
                    JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(oi_invoice_files_json);
                    if (data_item["invoice_file_list"] != null)
                    {
                        JArray lst = (JArray)data_item["invoice_file_list"];
                        for (int i = 0; i < lst.Count; i++)
                        {
                            string oi_filepath = lst[i]["oi_filepath"].ToString().Trim();
                            string oi_filenam = lst[i]["oi_filenam"].ToString().Trim();
                            string oi_file_seq = string.Empty;

                            insert_order_invoice_file(oi_seq_out, oi_filepath,
                                oi_filenam,
                                ref oi_file_seq);
                        }
                    }
                }


                return "{\"oi_seq\":\"" + oi_seq_out + "\",\"result\":" + (b ? "1" : "0") + ",\"msg\":\"" + (b ? "费用发票标记完成" : "错误: 标记费用包含多个结算单位，不符合发票标记规则，无法执行绑定操作！") + "\"}";
         

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string unflag_fee_invoice_by_fee_seqs(
            string fee_seqs)
        {
            try
            {
                bool b = dal.unflag_fee_invoice_by_fee_seqs(
                 fee_seqs );

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "费用发票解除绑定完成" : "异常: 请联系管理员处理");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #region 更改销账备注
        public string update_oi_bak(
            string oi_seq,
            string oi_bak)
        {
            try
            {
                bool b = dal.update_oi_bak(oi_seq, oi_bak);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "更改备注完成" : "异常: 截图联系管理员。");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion
        #region 销账情况
        public string flag_fee_finace_by_fee_seqs(
            string fee_seqs,
            string cur_opr_id)
        {
            try
            {
                 int b = dal.flag_fee_finace_by_fee_seqs(
                 fee_seqs,
                 cur_opr_id);
                 string msg = "";
                 if (b == 1)
                 {
                     msg = "费用核销完成";
                 }
                 if (b == -1)
                 {
                     msg = "错误: 账单已关闭，无法核销费用";
                 }
                 if (b == -2)
                 {
                     msg = "错误: 费用中存在需审核且审核未通过的费用，无法进行核销";
                 }
                 return commone.BLL_commone.result_convert_json(b==1 ? 1 : 0, msg);


            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string unflag_fee_finace_by_fee_seqs(
            string fee_seqs)
        {
            try
            {
                bool b = dal.unflag_fee_finace_by_fee_seqs(
                 fee_seqs );

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "费用核销完成" : "错误: 账单已关闭，无法取消费用核销标记");

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #region 销账记录

        #region 判断是否可以进行销账操作
        public string bat_judge_fee_finace_by_fee_seq(
            string woa_record_id,
            string woa_cu_id,
            string woa_c_id, 
            string woa_rec_or_pay,
            string woa_bank_dat,
            string woa_bak,
            string woa_typ, 
            string json_fee_details)
        {
            try
            {
                bool return_b = true;
                decimal woa_total_amount = 0;
                string fee_seqs = string.Empty;

                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json_fee_details);
                if (data_item["fee_details_list"] != null)
                {
                    JArray lst = (JArray)data_item["fee_details_list"];
                    for (int i = 0; i < lst.Count; i++)
                    { 
                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();
                        //这里有一个问题，不同币种不能 直接相加 ,不然会出问题 

                        string woa_money = lst[i]["ed_unwoa_total_amount"].ToString().Trim();

                        if (woa_money.Length == 0)
                        {
                            woa_money = "0";
                        }
                        if (fee_seqs.Length == 0)
                        {
                            fee_seqs = fee_seq;
                        }
                        else
                        {
                            fee_seqs += "," + fee_seq;
                        }
                        woa_total_amount += decimal.Parse(woa_money);

                        string msg = string.Empty;

                        bool b = judge_fee_finace_by_fee_seq(fee_seq, woa_money, ref msg);

                        lst[i]["woa_result"] = b ? 1 : 0; 
                        lst[i]["woa_result_msg"] = msg;

                        if (!b)
                        {
                            return_b = false;
                        }
                    }  
                }
                string woa_seq = string.Empty;
                if (return_b)
                {
                     
                     insert_write_off_accounts_record(
                       fee_seqs,
                       woa_record_id,
                       woa_cu_id,
                       woa_c_id,
                       woa_total_amount.ToString(),
                       woa_rec_or_pay,
                       woa_bank_dat,
                       woa_bak,
                       woa_typ,
                     ref   woa_seq);
                     if (data_item["fee_details_list"] != null)
                     {
                         JArray lst = (JArray)data_item["fee_details_list"];
                         for (int i = 0; i < lst.Count; i++)
                         {
                             string fee_seq = lst[i]["fee_seq"].ToString().Trim();
                             string woa_money = lst[i]["ed_unwoa_total_amount"].ToString().Trim();

                             flag_fee_finace_by_fee_seq(woa_seq, fee_seq, woa_money);

                             lst[i]["woa_total_amount"] = Convert.ToDouble(lst[i]["woa_total_amount"]) + Convert.ToDouble(woa_money);
                             lst[i]["unwoa_total_amount"] = Convert.ToDouble(lst[i]["unwoa_total_amount"]) - Convert.ToDouble(woa_money); ;

                             lst[i]["woa_result"] = 1;
                             lst[i]["woa_result_msg"] = "标记销账成功";
                         }
                     }
                    //发送微信消息
                     send_write_off_accounts_alert_msg(woa_seq);
                }


                return "{\"woa_seq\":\"" + woa_seq + "\",\"result\":" + (return_b ? "1" : "0") + ",\"data\":" + data_item.ToString() + "}";
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private bool judge_fee_finace_by_fee_seq(
            string fee_seq,
            string woa_money,
            ref string msg)
        {
            try
            {
                //-1 错误: 费用不是交账状态，无法标记核销 
                //-2 错误: 应付费用需审核通过后才能核销  
                //-3 错误: 核销金额不合法(核销后，金额超出)  

                int b = dal.judge_fee_finace_by_fee_seq(
                  fee_seq, woa_money);

                switch (b)
                {
                    case -1: msg = "错误: 费用不是交账状态，无法标记核销"; break;
                    case -2: msg = "错误: 应付费用需审核通过后才能核销"; break;
                    case -3: msg = "错误: 核销金额不合法"; break;
                    case -4: msg = "错误: 加入对冲计划且计划未结束,无法标记核销"; break;
                    case 1: msg = "可以核销"; break;
                }

                if (b == 1) return true;
                return false;


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增一条销账记录
        private bool insert_write_off_accounts_record(
            string fee_seqs,
            string woa_record_id,
            string woa_cu_id,
            string woa_c_id,
            string woa_total_amount,
            string woa_rec_or_pay,
            string woa_bank_dat,
            string woa_bak,
            string woa_typ,
            ref string woa_seq)
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销
                 
                int b = dal.insert_write_off_accounts_record(
                  fee_seqs, woa_record_id,
                  woa_cu_id,
                  woa_c_id,
                  woa_total_amount,
                  woa_rec_or_pay,
                  woa_bank_dat,
                  woa_bak,
                  woa_typ,
                  ref  woa_seq); 

                if (b == 1) return true;
                return false;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增销账明细
        private bool flag_fee_finace_by_fee_seq(
            string woa_seq,
            string fee_seq,
            string woa_money)
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销

                int b = dal.flag_fee_finace_by_fee_seq(
                  woa_seq, fee_seq,
                  woa_money);

                if (b == 1) return true;
                return false;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 查询销账记录
        public string get_write_off_accounts_list(
            string rec_or_pay,
            string c_id,
            string cu_id,
            string year,
            string month,
            string money,
            string woa_record_id,
            string page,
            string rows,
            string sort,
            string ordersort )
        {
            try
            {
                int rowcount = 0;

                DataTable dt = dal.get_write_off_accounts_list(rec_or_pay,
                        c_id,
                        cu_id,
                        year,
                        month,
                        money,
                        woa_record_id,
                        page,
                        rows,
                        sort,
                        ordersort,
                    ref   rowcount);

                return commone.BLL_commone.data_convert_json(dt, rowcount);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 根据销账记录获取费用销账明细
        public string get_order_fee_by_woa_seq(
            string woa_seq )
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;
                string ca_bak = string.Empty;

                DataTable dt = dal.get_order_fee_by_woa_seq(
                    woa_seq,
                    ref   rowcount,
                    ref   group_fee_desc,
                    ref ca_bak);

                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["group_fee_desc"] = group_fee_desc;
                data["ca_bak"] = ca_bak;
                return data.ToString(); 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 根据单个费用 获取费用的销账记录
        public string get_write_off_accounts_details_by_fee_seq(
            string fee_seq)
        {
            try
            {
                 
                DataTable dt = dal.get_write_off_accounts_details_by_fee_seq(fee_seq);

                return commone.BLL_commone.data_convert_json(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion


        #region 获取销账消息
        private void send_write_off_accounts_alert_msg(
            string woa_seq)
        {
            try
            {
                DataTable dt = dal.get_write_off_accounts_alert_msg(woa_seq);

                if (dt != null && dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        string open_id = dr["open_id"].ToString();
                        string msg_content = dr["msg_content"].ToString();

                        VX.MessageHelp mh = new VX.MessageHelp();
                        try
                        {
                            mh.Post(open_id,
                            "销账提醒",
                            msg_content,
                            string.Empty);
                        }
                        catch (Exception er)
                        {
                            continue;
                        }
                        
                 
                    }
                } 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 更改销账备注
        public string update_woa_bak(
            string woa_seq,
            string woa_bak)
        {
            try
            {
                bool b = dal.update_woa_bak(woa_seq, woa_bak);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "更改备注完成" : "异常: 截图联系管理员。");
                
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

        #region 提交账单审核
        public string post_pay_checkaccount(
            string ca_seq,
            string post_by_id,
            string ap_u_id,
            string aps_order_by_id,
            string aps_id,
            string ba_desc, 
            string ba_pay_typ,
            string ba_pay_dat,
            string amc_bak)
        {
            try
            {
                string amc_id = string.Empty;

                int b = dal.post_pay_checkaccount(
                 ca_seq,
                 post_by_id,
                 ap_u_id,
                 aps_order_by_id,
                 aps_id,
                 ba_desc,
                 
                 ba_pay_typ,
                 ba_pay_dat,
                 amc_bak,
                 ref amc_id);
                string msg = string.Empty;
                if (b == 1)
                {
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.create);
                    msg = "提交审核成功";
                }
                else
                {
                    switch (b)
                    {
                        case -1:
                            {
                                msg = "错误: 提交付款审核账单必须都是交账且未审核账单";
                            }
                            break;
                        case -2:
                            {
                                msg = "错误: 提交付款审核账单必须有一条是非免审账单";
                            }
                            break;
                        case -3:
                            {
                                msg = "错误: 提交付款审核账单必须都是同一家结算单位";
                            }
                            break;
                    }
                }
                return commone.BLL_commone.result_convert_json(b == 1? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        
        #endregion

        #region 返回是否有负账业务
        public string pre_post_test_of_loss(
            string ca_seq )
        {
            try
            {
                string loss_of_prompt = string.Empty;
                string currency_flag = string.Empty;
                string bank_info = string.Empty;
                string loss_flag = string.Empty;

                  dal.pre_post_test_of_loss(
                 ca_seq, 
                 ref loss_flag,
                 ref loss_of_prompt,
                 ref currency_flag,
                 ref bank_info);
                string msg = string.Empty;
 

                JObject jo = new JObject();
                jo["loss_flag"] = loss_flag;
                jo["loss_of_prompt"] = loss_of_prompt;
                jo["currency_flag"] = currency_flag;
                jo["bank_info"] = bank_info;

                return jo.ToString();

            }
            catch (Exception e)
            {
                throw e;
            }
        }


        #endregion

        #region 更新账单的费用
        #region 临时结构体
        class tmp_ca_update
        {
            private string _ca_seq;

            public string Ca_seq
            {
                get { return _ca_seq; }
                set { _ca_seq = value; }
            }
            private string _fee_cu_id;

            public string Fee_cu_id
            {
                get { return _fee_cu_id; }
                set { _fee_cu_id = value; }
            }
            private string _fee_seqs;

            public string Fee_seqs
            {
                get { return _fee_seqs; }
                set { _fee_seqs = value; }
            }

            string _ca_title;

            public string Ca_title
            {
                get { return _ca_title; }
                set { _ca_title = value; }
            }

            int _update_status;

            public int Update_status
            {
                get { return _update_status; }
                set { _update_status = value; }
            }



            public tmp_ca_update(string ca_seq,string ca_title,string fee_cu_id,string fee_seq)
            {
                _ca_title = ca_title;
                _ca_seq = ca_seq;
                _fee_cu_id = fee_cu_id;
                _fee_seqs = fee_seq;
                _update_status = 0;
            }


            public void push_fee_seq(string fee_seq){
                if (_fee_seqs.Length > 0)
                {
                    _fee_seqs += "," + fee_seq;
                }
                else
                {
                    _fee_seqs = fee_seq;
                }
            }
        }
        #endregion 
        public string update_fee_details( string fee_data,string update_id)
        {
            try
            {
                bool b = false;
                JArray lst = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(fee_data);
                 
                string fee_seqs = string.Empty;
                if (lst != null && lst.Count > 0)
                {
                    
                    #region 修改其他属性值

                    for (int i = 0; i < lst.Count; i++)
                    {
                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();
                        string fee_invoice_typ = lst[i]["fee_invoice_typ"].ToString().Trim();
                        string fee_item_typ = lst[i]["fee_item_typ"].ToString().Trim();
                        string fee_number = lst[i]["fee_number"].ToString().Trim();
                        string fee_unit = lst[i]["fee_unit"].ToString().Trim();
                        string fee_price = lst[i]["fee_price"].ToString().Trim();
                        string fee_currency_id = lst[i]["fee_currency_id"].ToString().Trim();
                        string fee_currency_rate = lst[i]["fee_currency_rate"].ToString().Trim();

                        string fee_bak = string.Empty;
                          
                        b = dal.update_fee_details(
                            fee_seq,
                            fee_invoice_typ,
                            fee_item_typ,
                            fee_number,
                            fee_unit,
                            fee_price,
                            fee_currency_id,
                            fee_currency_rate, fee_bak,update_id);

                        if (fee_seqs.Length == 0) fee_seqs = fee_seq;
                        else fee_seqs += "," + fee_seq;
                    }
                    #endregion 

                    
                }
                #region 修改结束后，要返回结果

                JObject jo = get_order_fee_by_fee_seqs(fee_seqs);
                jo["result"] = 1;
                jo["msg"] = "修改账单费用完成";

                return jo.ToString();

                #endregion  


            }
            catch (Exception)
            {

                throw;
            }
        }
        public string pre_test_update_fee_details_deep(string fee_data )
        {
            try
            {

                bool result = true;
                string msg = string.Empty;

                JArray lst = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(fee_data);
 
                if (lst != null && lst.Count > 0)
                {

                    #region 修改其他属性值

                    for (int i = 0; i < lst.Count; i++)
                    {
                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();
                      
                        string fee_currency_id = lst[i]["fee_currency_id"].ToString().Trim();
                        string fee_currency_rate = lst[i]["fee_currency_rate"].ToString().Trim(); 

                        int b = dal.pre_test_update_fee_details_deep(
                            fee_seq, 
                            fee_currency_id,
                            fee_currency_rate );

                        lst[i]["result"] = b==1?1:0;


                        if (b != 1)
                        {
                            result = false;
                        }

                        if (b == -1 && msg.IndexOf("更改费用中存在订单已提交审核") == -1)
                        {
                            lst[i]["msg"] = "订单已提交审核";

                            msg += (msg.Length > 0 ? "," : "") + "更改费用中存在订单已提交审核";
                        }
                        if (b == -2 && msg.IndexOf("更改费用中存在已交账情况") == -1)
                        {
                            lst[i]["msg"] = "费用已交账";
                            msg += (msg.Length > 0 ? "," : "") + "更改费用中存在已交账情况";
                        }
                        if (b == -3 && msg.IndexOf("更改费用中存在汇率不匹配情况") == -1)
                        {
                            lst[i]["msg"] = "汇率不匹配";
                            msg += (msg.Length > 0 ? "," : "") + "更改费用中存在汇率不匹配情况";
                        } 
                    }
                    #endregion


                }
                #region 修改结束后，要返回结果

                JObject jo = new JObject();
                jo["result"] = result?1:0;
                jo["msg"] = msg + ( result ? "" : ",无法修改。");
                jo["rows"] = lst;

                return jo.ToString();

                #endregion


            }
            catch (Exception)
            {

                throw;
            }
        }
        //检测是否可以更改 
        //1. 订单状态必须是od_status_id = 1 且不能提交了审核
        //2. 费用状态不能是 3以上(交账，部分核销，全部核销) 

        public string pre_update_fee_details(string fee_data, string update_id)
        {
            try
            {
                bool b = false;
                JArray lst = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(fee_data);

                string fee_seqs = string.Empty;
                if (lst != null && lst.Count > 0)
                { 
                    #region 检测

                    for (int i = 0; i < lst.Count; i++)
                    {
                        string fee_seq = lst[i]["fee_seq"].ToString().Trim();
                        if (fee_seqs.Length == 0)
                        {
                            fee_seqs = fee_seq;
                        }
                        else
                        {
                            fee_seqs += "," + fee_seq;
                        } 
                    }
                    #endregion

                    int bResult = dal.pre_update_fee_details(fee_seqs);
                    
                    string msg = string.Empty;
                    if (bResult == 1)
                    {
                        msg = "可以修改";
                    }
                    if (bResult == -1)
                    {
                        msg = "错误:更改费用中存在订单已提交审核，无法修改。";
                    }
                    if (bResult == -2)
                    {
                        msg = "错误:更改费用中存在已交账情况，无法修改。";
                    }

                    return "{\"result\":" + (bResult == 1?1:0).ToString() + ",\"msg\":\"" + msg + "\"}";
                }

                return "{\"result\":0,\"msg\":\"错误:未提交数据\"}";
                  
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 对冲账单
        #region 新建
        public string insert_hedge_off_accounts_record(
           string hoa_cu_id,
           string hoa_c_id,
           string hoa_record_id,
           string hoa_bak,
           string hoa_title )
        {
            try{ 
                string hoa_seq = string.Empty;
                 
                bool b = dal.insert_hedge_off_accounts_record(hoa_cu_id,
                    hoa_c_id,
                    hoa_record_id,
                    hoa_bak,
                    hoa_title, 
                    ref hoa_seq); 
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("hoa_seq", hoa_seq));

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增对冲销账计划成功" : "错误:存在相同的对冲销账计划名称。", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 插入费用
        public string insert_hedge_off_accounts_details(
            string hoa_seq,
            string fee_seqs)
        {
            try
            {
                int b = dal.insert_hedge_off_accounts_details(
                  hoa_seq,
                  fee_seqs );
                string msg = "";

                if (b == 1)
                {
                    msg = "费用加入对冲计划成功";
                }
                if (b == -1)
                {
                    msg = "错误: 费用必须已归账且账单已交账，并且费用不能是已完整核销，否则不能加入对冲计划";
                }
                if (b == -2)
                {
                    msg = "错误: 费用不能同时加入多个对冲计划中";
                }
                if (b == -3)
                {
                    msg = "错误: 费用结算单位和对冲计划结算单位不一致，无法加入到选择的对冲计划中";
                }
                if (b == -4)
                {
                    msg = "错误: 对冲计划正在审核中或已审核通过，无法增加新的费用";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 移除费用
        public string delete_hedge_off_accounts_details(
            string hoa_seq,
            string fee_seqs)
        {
            try
            {
                int b = dal.delete_hedge_off_accounts_details(
                   hoa_seq,
                   fee_seqs );
                string msg = "";

                if (b ==1 )
                {
                    msg = "从对冲账单中移除费用成功";
                }
                
                if (b == -1) {
                    msg = "错误: 对冲计划已核销完结，无法移除费用明细";
                }
                if (b == -4)
                {
                    msg = "错误: 对冲计划正在审核中或已审核通过，无法移除费用明细";
                } 
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 删除 对冲账单
        public string delete_hedge_off_accounts_record(
            string hoa_seq)
        {
            try
            {
                int b = dal.delete_hedge_off_accounts_record(
                   hoa_seq );
                string msg = "";

                if (b == 1)
                {
                    msg = "删除对冲计划完成";
                } 
                
                if (b == -1){
                    msg = "错误: 对冲计划已核销完结，无法删除";
                }
                if (b == -4)
                {
                    msg = "错误: 对冲计划正在审核中或已审核通过，无法删除";
                } 
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion


        #region 获取对冲计划
        public string get_hedge_off_accounts_record(
            string like_str,
            string hoa_cu_id,
            string hoa_c_id,
            string hoa_bank_dat_begin,
            string hoa_bank_dat_end,
            string hoa_record_dat_begin,
            string hoa_record_dat_end,
            string hoa_record_id,
            string hoa_status,
            string amc_status,
            string page,
            string rows,
            string sort,
            string ordersort )
        {
            try
            {
                int rowcount = 0;
                 
                DataTable dt = dal.get_hedge_off_accounts_record(like_str,
                    hoa_cu_id,
                    hoa_c_id,
                    hoa_bank_dat_begin,
                    hoa_bank_dat_end,
                    hoa_record_dat_begin,
                    hoa_record_dat_end,
                    hoa_record_id,
                    hoa_status,
                    amc_status,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_hedge_off_accounts_record_no_page(
           string hoa_cu_id,
           string hoa_c_id)
        {
            try
            {

                DataTable dt = dal.get_hedge_off_accounts_record_no_page(hoa_cu_id,
                    hoa_c_id );

                return commone.BLL_commone.data_convert_json(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_hedge_off_accounts_record_single(
           string hoa_seq,
            string u_id)
        {
            try
            {
                DataTable dt = dal.get_hedge_off_accounts_record_single(hoa_seq,u_id);

                string json_base = commone.BLL_commone.data_convert_jsonarray(dt);
                string json_rec = get_hedge_off_accounts_record_of_rec(hoa_seq);
                string json_pay = get_hedge_off_accounts_record_of_pay(hoa_seq);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("hoa_base", json_base));
                lst.Add(new KeyValuePair<string,string>("rec_fee",json_rec));
                lst.Add(new KeyValuePair<string,string>("pay_fee",json_pay));
                 

                return commone.BLL_commone.custom_convert_json(lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion


        #region 对冲销账记录明细
        #region 应收明细
        private string get_hedge_off_accounts_record_of_rec(
            string hoa_seq )
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_hedge_off_accounts_record_of_rec(hoa_seq,
                    ref   rowcount,
                    ref   group_fee_desc );

                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["group_fee_desc"] = group_fee_desc;  
                JArray ja = new JArray();
                ja.Add(data);

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 应付明细
        private string get_hedge_off_accounts_record_of_pay(
            string hoa_seq )
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;
                DataTable dt = dal.get_hedge_off_accounts_record_of_pay(hoa_seq,
                    ref   rowcount,
                    ref   group_fee_desc);

                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["group_fee_desc"] = group_fee_desc;  

                JArray ja = new JArray();
                ja.Add(data);

                return ja.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 提交账单审核
        public string post_hedge_off_accounts(
            string hoa_seq,
            string post_by_id,
            string ap_u_id,
            string aps_order_by_id,
            string aps_id)
        {
            try
            {
                string amc_id = string.Empty;

                bool b = dal.post_hedge_off_accounts(
                 hoa_seq,
                 post_by_id,
                 ap_u_id,
                 aps_order_by_id,
                 aps_id,
                 ref amc_id);

                if (b)
                {
                    VX.MessageHelp mh = new VX.MessageHelp();
                    mh.Post(amc_id,
                        VX.MessageHelp.OPR_TYP.create);
                }
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "提交审核成功" : "错误: 对冲计划无需审核，或正在审核或已审核通过，无法再次提交审核 ");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 标记对冲完成
        public string flag_hedge_off_accounts_finace_by_hoa_seq(
            string hoa_seq,
            string woa_bank_dat,
            string woa_bak,
            string woa_record_id,
            string woa_cu_id,
            string woa_c_id)
        {
            try
            {
                int b = dal.flag_hedge_off_accounts_finace_by_hoa_seq(hoa_seq,
                    woa_bank_dat,
                    woa_bak,
                    woa_record_id,
                    woa_cu_id,
                    woa_c_id);
                string msg = string.Empty;
                if (b == 1) {
                    msg = "对冲操作执行完毕，应付和应收均被标记对冲销账成功。";
                }
                if (b == -1)
                {
                    msg = "错误: 此对冲计划未审核或审核未通过，无法执行确认操作。";
                }
                if (b == -2)
                {
                    msg = "错误: 此对冲计划已被标记完成，无法再次标记。";
                }

                if (b == -3)
                {
                    msg = "错误: 此对冲计划中费用所属账单未审核通过，无法执行确认操作。";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
        #endregion 

        #region 专注模式
        #region 所有未归账的费用汇总
        public string get_group_order_fee_of_nonca_for_bus(string c_id, 
            string rec_or_pay)
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_group_order_fee_of_nonca_for_bus(c_id, 
                    rec_or_pay,
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
        #endregion

        #region 所有未归账的费用明细
        public string get_details_order_fee_of_nonca_for_bus(string c_id, 
            string rec_or_pay,
            string cu_id)
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;

                DataTable dt = dal.get_details_order_fee_of_nonca_for_bus(c_id, 
                    rec_or_pay,
                    cu_id,
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
        #endregion

        #endregion

        #region 修改对账单
        public string update_main_list_for_bus(
            string ca_title,
            string ca_group_flag,
            string ca_year,
            string ca_month,
            string ca_bak,
            string ca_create_by_id,
            string ca_seq,
            string ca_limit_dat,
            string ca_assign_flag,
            string u_ids,
            string data_attachment)
        {
            try
            {
                int b = dal.update_main_list_for_bus(
                    ca_title,
                    ca_group_flag,
                    ca_year,
                    ca_month,
                    ca_bak,
                    ca_create_by_id,
                    ca_seq,
                    ca_limit_dat,
                    ca_assign_flag);
                string msg = "";

                if (b == 1)
                {
                    msg = "修改账单完成";
                }
                if (b == -1)
                {
                    msg = "存在相同的账单名称，无法修改账单";
                }
                if (b == -2)
                {
                    msg = "您不是账单创建者，无法修改账单";
                }
                if (b == -3)
                {
                    msg = "账单已交账，无法修改账单";
                }

                if (b == 1)
                {
                    update_relation_user_list(ca_seq, u_ids, ca_create_by_id);

                    JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(data_attachment);
                    if (data_item["attachment_list"] != null)
                    {
                        JArray lst_attachments = (JArray)data_item["attachment_list"];
                        string file_seqs = string.Empty;

                        for (int i = 0; i < lst_attachments.Count; i++)
                        {
                            if (file_seqs.Equals(string.Empty))
                            {
                                file_seqs = lst_attachments[i]["file_seq"].ToString();
                            }
                            else
                            {
                                file_seqs += "," + lst_attachments[i]["file_seq"].ToString();
                            }
                        }

                        delete_attachment_list(ca_seq, ca_create_by_id, file_seqs);
                        for (int i = 0; i < lst_attachments.Count; i++)
                        {
                            string file_seq = lst_attachments[i]["file_seq"].ToString();
                            string file_nam = lst_attachments[i]["file_nam"].ToString();
                            string file_path = lst_attachments[i]["file_path"].ToString();
                            string file_seq_out = string.Empty;
                            update_attachment_list(ca_seq, file_seq, ca_create_by_id, file_path, file_nam, ref file_seq_out);
                        }
                    }
                }

                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string update_main_list_simple_for_bus(
            string ca_title,
            string ca_bak,
            string ca_cu_id,
            string u_id,
            string ca_seq)
        {
            try
            {
                int b = dal.update_main_list_simple_for_bus(
                    ca_title,
                    ca_bak,
                    ca_cu_id,
                    u_id,
                    ca_seq);

                string msg = "";

                if (b == 1)
                {
                    msg = "修改账单完成";
                }
                if (b == -1)
                {
                    msg = "费用中存在已销账费用，无法修改账单";
                }
                if (b == -2)
                {
                    msg = "您不是账单创建者，无法修改账单";
                }
                if (b == -3)
                {
                    msg = "账单已交账，无法修改账单";
                }
                return commone.BLL_commone.result_convert_json(b > 0 ? 1 : 0, msg);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 发票部分 模糊查询
        public string get_order_invoice_by_like_str_for_combogrid(string like_str, string c_id,
            string oi_cu_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.checkaccount.dal_check_account bd = new dal_check_account();

                DataTable dt = bd.get_order_invoice_by_like_str_for_combogrid(like_str,
                    c_id,
                    oi_cu_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);

            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion 

        #region 根据oi_seq得到发票图片信息 
        public string get_order_invoice_file(string oi_seq)
        {
            try
            { 
                DAL.checkaccount.dal_check_account bd = new dal_check_account();

                DataTable dt = bd.get_order_invoice_file(oi_seq);

                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion 

        #region 增加发票图片
        public bool insert_order_invoice_file(
            string oi_seq,
            string oi_filepath,
            string oi_filenam,
            ref string oi_file_seq)
        {
            try
            {
                bool b = dal.insert_order_invoice_file(
                 oi_seq,
                 oi_filepath,
                 oi_filenam,
                 ref oi_file_seq);

                return b;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 获取所有开票记录
        public string get_order_invoice_list(
            string like_str,
            string oi_rec_or_pay,
            string oi_c_id,
            string oi_cu_id,
            string oi_total_money,
            string page,
            string rows,
            string sort,
            string ordersort )
        {
            try
            { int rowcount = 0;
                DataTable dt = dal.get_order_invoice_list(like_str,
                        oi_rec_or_pay,
                        oi_c_id,
                        oi_cu_id, 
                        oi_total_money,
                        page,
                        rows,
                        sort,
                        ordersort,
                    ref   rowcount);

                return commone.BLL_commone.data_convert_json(dt, rowcount);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_order_invoice_list(
           string like_str,
           string oi_rec_or_pay,
           string oi_c_id,
           string oi_cu_id,
           string oi_total_money,
            string oi_beg_dat,
            string oi_end_dat,
           string page,
           string rows,
           string sort,
           string ordersort)
        {
            try
            {
                int rowcount = 0;
                DataTable dt = dal.get_order_invoice_list(like_str,
                        oi_rec_or_pay,
                        oi_c_id,
                        oi_cu_id,
                        oi_total_money,
                        oi_beg_dat,
                        oi_end_dat,
                        page,
                        rows,
                        sort,
                        ordersort,
                    ref   rowcount);

                return commone.BLL_commone.data_convert_json(dt, rowcount);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获得开票记录的费用明细

        public string get_order_fee_and_invoice_files_by_oi_seq(
            string oi_seq)
        {
            try
            {
                string order_fee_of_invoice = get_order_fee_by_oi_seq_only_array(oi_seq);

                string order_invoice_files = get_order_invoice_file_by_oi_seq(oi_seq);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                lst.Add(new KeyValuePair<string, string>("order_fee_of_invoice", order_fee_of_invoice));
                lst.Add(new KeyValuePair<string, string>("order_invoice_files", order_invoice_files));

                return commone.BLL_commone.custom_convert_json(lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private string get_order_fee_by_oi_seq_only_array(
            string oi_seq)
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;
                string ca_bak = string.Empty;

                DataTable dt = dal.get_order_fee_by_oi_seq(
                    oi_seq,
                    ref   rowcount,
                    ref   group_fee_desc,
                    ref ca_bak); 

                return commone.BLL_commone.data_convert_jsonarray(dt);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_order_fee_by_oi_seq(
            string oi_seq)
        {
            try
            {
                int rowcount = 0;

                string group_fee_desc = string.Empty;
                string ca_bak = string.Empty;

                DataTable dt = dal.get_order_fee_by_oi_seq(
                    oi_seq,
                    ref   rowcount,
                    ref   group_fee_desc,
                    ref ca_bak);

                string json = commone.BLL_commone.data_convert_json(dt, rowcount);
                JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                data["group_fee_desc"] = group_fee_desc;
                data["ca_bak"] = ca_bak;
                return data.ToString(); 

                
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<CAL.download_cls.order_fee> get_order_fee_for_print_by_woa_seq(
            string woa_seq,
            ref string company_desc,
            ref string title,
            ref string typ_title_desc,
            ref string rec_or_pay_desc,
            ref string cu_desc,
            ref string record_nam,
            ref string record_dat,
            ref string fee_group_info,
            ref string bak,
            ref string relation_user_info,
            ref string no,
            ref string flow_no,
            ref string print_dat,
            ref List<CAL.ap_flow_details.ap_flow> lst_ap
            )
        {
            try
            {

                DataTable dt = dal.get_order_fee_for_print_by_woa_seq(woa_seq,
                    ref company_desc,
                    ref title,
                    ref typ_title_desc,
                    ref rec_or_pay_desc,
                    ref cu_desc,
                    ref record_nam,
                    ref record_dat,
                    ref fee_group_info,
                    ref bak,
                    ref relation_user_info,
                    ref no,
                    ref flow_no,
                    ref print_dat 
                    );

                /*
                 * 后端，按照 ca_amc_id和 od_amc_id 进行了划分 
                 *  1. 首先考虑 ca_amc_id 如果没有，或者 ca_amc_status <> 2 则考虑 od_amc_id 
                 *  
                 */
                //获取审核流程 
                BLL.approval.approval_mgr am = new approval.approval_mgr();

                List<string> ca_amc_id_lst = new List<string>();
                List<string> od_amc_id_lst = new List<string>();

                if (lst_ap == null) lst_ap = new List<CAL.ap_flow_details.ap_flow>();
                if (dt.Rows.Count > 0)
                {
                    List<CAL.download_cls.order_fee> lst = new List<CAL.download_cls.order_fee>();

                    int index = 1;
                    foreach (DataRow dr in dt.Rows)
                    {
                        string ca_amc_id = Convert.IsDBNull(dr["ca_amc_id"]) ? string.Empty : dr["ca_amc_id"].ToString();
                        int ca_amc_status = Convert.IsDBNull(dr["ca_amc_status"]) ? 0 : Convert.ToInt32(dr["ca_amc_status"]);
                        string od_amc_id = Convert.IsDBNull(dr["od_amc_id"]) ? string.Empty : dr["od_amc_id"].ToString();
                        int od_amc_status = Convert.IsDBNull(dr["od_amc_status"]) ? 0 : Convert.ToInt32(dr["od_amc_status"]);

                       
                        if (!ca_amc_id.Equals(string.Empty) && ca_amc_status == 2)
                        {
                            bool has_ca_amc_id = false;
                            foreach (string cai in ca_amc_id_lst)
                            {
                                if (cai.Equals(ca_amc_id))
                                {
                                    has_ca_amc_id = true;
                                }
                            }
                            if (!has_ca_amc_id) { 

                                ca_amc_id_lst.Add(ca_amc_id);

                                string relation_no = string.Empty; 
                                DataTable dt_ap_flow = am.get_amc_actual_flow_details_for_print(ca_amc_id, ref relation_no);
                                CAL.ap_flow_details.ap_flow  af = new CAL.ap_flow_details.ap_flow(ca_amc_id, relation_no);
                                foreach (DataRow dr2 in dt_ap_flow.Rows)
                                {
                                    af.Lst_ap_flow.Add(new CAL.ap_flow_details.ap_flow_details(
                                    Convert.IsDBNull(dr2["ap_opr_nam"]) ? string.Empty : dr2["ap_opr_nam"].ToString(),
                                    Convert.IsDBNull(dr2["aps_desc"]) ? string.Empty : dr2["aps_desc"].ToString(),
                                    Convert.IsDBNull(dr2["ap_context"]) ? string.Empty : dr2["ap_context"].ToString(),
                                    Convert.IsDBNull(dr2["ap_advice"]) ? string.Empty : dr2["ap_advice"].ToString(),
                                    Convert.IsDBNull(dr2["ap_opr_dat"]) ? string.Empty : Convert.ToDateTime(dr2["ap_opr_dat"]).ToString("yyyy-MM-dd")
                                    ));
                                }

                                lst_ap.Add(af);
                            } 
                        }
                        else if (!od_amc_id.Equals(string.Empty) && od_amc_status == 2)
                        {
                            bool has_od_amc_id = false;
                            foreach (string cai in od_amc_id_lst)
                            {
                                if (cai.Equals(od_amc_id))
                                {
                                    has_od_amc_id = true;
                                }
                            }
                            if (!has_od_amc_id)
                            {
                                od_amc_id_lst.Add(od_amc_id);
                                string relation_no = string.Empty;
                                DataTable dt_ap_flow = am.get_amc_actual_flow_details_for_print(ca_amc_id, ref relation_no);
                                CAL.ap_flow_details.ap_flow af = new CAL.ap_flow_details.ap_flow(ca_amc_id, relation_no);

                                foreach (DataRow dr2 in dt_ap_flow.Rows)
                                {
                                    af.Lst_ap_flow.Add(new CAL.ap_flow_details.ap_flow_details(
                                    Convert.IsDBNull(dr2["ap_opr_nam"]) ? string.Empty : dr2["ap_opr_nam"].ToString(),
                                    Convert.IsDBNull(dr2["aps_desc"]) ? string.Empty : dr2["aps_desc"].ToString(),
                                    Convert.IsDBNull(dr2["ap_context"]) ? string.Empty : dr2["ap_context"].ToString(),
                                    Convert.IsDBNull(dr2["ap_advice"]) ? string.Empty : dr2["ap_advice"].ToString(),
                                    Convert.IsDBNull(dr2["ap_opr_dat"]) ? string.Empty : Convert.ToDateTime(dr2["ap_opr_dat"]).ToString("yyyy-MM-dd")
                                    ));
                                }

                                lst_ap.Add(af);
                            }
                        } 
                    }

                    foreach (DataRow dr in dt.Rows)
                    {
                        CAL.download_cls.order_fee of = new CAL.download_cls.order_fee(
                              index,
                              Convert.IsDBNull(dr["od_no"]) ? string.Empty : dr["od_no"].ToString(),
                              Convert.ToDateTime(dr["od_fee_dat"]),
                              Convert.IsDBNull(dr["od_main_bill_no"]) ? string.Empty : dr["od_main_bill_no"].ToString(),
                              Convert.IsDBNull(dr["od_place_start"]) ? "无" : dr["od_place_start"].ToString(),
                              Convert.IsDBNull(dr["od_place_end"]) ? "无" : dr["od_place_end"].ToString(),
                              Convert.IsDBNull(dr["fee_item_typ_desc"]) ? string.Empty : dr["fee_item_typ_desc"].ToString(),
                              Convert.IsDBNull(dr["fee_price"]) ? 0.00 : Convert.ToDouble(dr["fee_price"]),
                              Convert.IsDBNull(dr["fee_number"]) ? 0.00 : Convert.ToDouble(dr["fee_number"]),
                              Convert.IsDBNull(dr["fee_currency_code_desc"]) ? string.Empty : dr["fee_currency_code_desc"].ToString(),
                              Convert.IsDBNull(dr["fee_currency_cod_desc"]) ? string.Empty : dr["fee_currency_cod_desc"].ToString(),
                              Convert.IsDBNull(dr["fee_unit_desc"]) ? string.Empty : dr["fee_unit_desc"].ToString(),
                              Convert.IsDBNull(dr["fee_amount"]) ? 0.00 : Convert.ToDouble(dr["fee_amount"]),
                              Convert.IsDBNull(dr["fee_invoice_typ_desc"]) ? string.Empty : dr["fee_invoice_typ_desc"].ToString(),
                              Convert.IsDBNull(dr["woa_money"]) ? 0.00 : Convert.ToDouble(dr["woa_money"]),
                              Convert.IsDBNull(dr["ca_amc_id"]) ? string.Empty : dr["ca_amc_id"].ToString(), 
                              Convert.IsDBNull(dr["od_amc_id"]) ? string.Empty : dr["od_amc_id"].ToString() ,
                              Convert.IsDBNull(dr["oi_no"]) ? string.Empty : dr["oi_no"].ToString(),
                              Convert.IsDBNull(dr["fee_bak"]) ? string.Empty : dr["fee_bak"].ToString()
                              ); 

                        lst.Add(of);
                        index++;
                    } 


                    return lst;
                }
                return null;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<CAL.download_cls.order_fee> get_order_fee_for_print_by_oi_seq(
            string oi_seq,
            ref string company_desc,
            ref string title,
            ref string typ_title_desc,
            ref string rec_or_pay_desc,
            ref string cu_desc,
            ref string record_nam,
            ref string record_dat,
            ref string fee_group_info,
            ref string bak,
            ref string relation_user_info,
            ref string no, 
            ref string flow_no,
            ref string print_dat
            )
        {
            try
            {
                 
                DataTable dt = dal.get_order_fee_for_print_by_oi_seq(oi_seq,
                    ref company_desc,
                    ref title,
                    ref typ_title_desc,
                    ref rec_or_pay_desc,
                    ref cu_desc,
                    ref record_nam,
                    ref record_dat,
                    ref fee_group_info,
                    ref bak,
                    ref relation_user_info,
                    ref no, 
                    ref   flow_no,
                    ref   print_dat);

                if (dt.Rows.Count > 0)
                {
                    List<CAL.download_cls.order_fee> lst = new List<CAL.download_cls.order_fee>();

                    int index = 1;
                    foreach (DataRow dr in dt.Rows)
                    {
                        lst.Add(new CAL.download_cls.order_fee(
                            index,
                            Convert.IsDBNull(dr["od_no"])?string.Empty: dr["od_no"].ToString(),
                            Convert.ToDateTime( dr["od_fee_dat"]),
                            Convert.IsDBNull(dr["od_main_bill_no"])?string.Empty: dr["od_main_bill_no"].ToString(),
                            Convert.IsDBNull(dr["od_place_start"])?"无": dr["od_place_start"].ToString(),
                            Convert.IsDBNull(dr["od_place_end"])?"无": dr["od_place_end"].ToString(),
                            Convert.IsDBNull(dr["fee_item_typ_desc"])?string.Empty: dr["fee_item_typ_desc"].ToString(),
                            Convert.IsDBNull(dr["fee_price"])?0.00: Convert.ToDouble( dr["fee_price"] ),
                            Convert.IsDBNull(dr["fee_number"])?0.00: Convert.ToDouble( dr["fee_number"] ),
                            Convert.IsDBNull(dr["fee_currency_code_desc"])?string.Empty: dr["fee_currency_code_desc"].ToString(),
                            Convert.IsDBNull(dr["fee_unit_desc"])?string.Empty: dr["fee_unit_desc"].ToString(),
                            Convert.IsDBNull(dr["fee_amount"])?0.00: Convert.ToDouble( dr["fee_amount"] ),
                            Convert.IsDBNull(dr["fee_invoice_typ_desc"]) ? string.Empty : dr["fee_invoice_typ_desc"].ToString()
                            ));
                        index ++;
                    }

                    return lst;
                }
                return null;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 获取开票记录的文件
        private string get_order_invoice_file_by_oi_seq(
           string oi_seq)
        {
            try
            {
                DataTable dt = dal.get_order_invoice_file_by_oi_seq(oi_seq);

                return commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 通过 审核号 获取 账单相关信息 
        public string get_ap_checkaccount_single_full_collections(string amc_id,
           string u_id)
        {
            try
            {
                //需要合并 基本信息，附件和指定联系人 三个信息 

                DataTable dt = dal.get_pay_checkaccount_single(amc_id,
                    u_id);
                string json_base = commone.BLL_commone.data_convert_jsonarray(dt);

             

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("amc_base", json_base));   

                JArray data_base = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(json_base);

                if (data_base != null && data_base.Count > 0)
                {

                    int rowcount = 0;

                    string group_fee_desc = string.Empty;

                    DataTable dt_fee_details = dal.get_order_fee_by_amc_id_for_ap(
                        u_id,
                        amc_id,
                        ref   rowcount,
                        ref   group_fee_desc);

                    string json = commone.BLL_commone.data_convert_json(dt_fee_details, rowcount);
                    JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                    data["group_fee_desc"] = group_fee_desc;


                    lst.Add(new KeyValuePair<string, string>("fee_details", "[" + data.ToString() + "]"));
                }

                return commone.BLL_commone.custom_convert_json(lst);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 权限-是否可以在商务界面显示 销账按钮 
        public string can_use_flag_finance_in_bus_page(string c_id,
           string u_id)
        {
            try
            {
                bool b = dal.can_use_flag_finance_in_bus_page(c_id, u_id);
 
                return "{\"result\":" + (b?1:0).ToString() + "}";
                

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
        #region 过账且投递
        #region 过账获取信息 通过账单号和过账单位获取相应信息
        public string transfer_accountcheck(string ca_seq,
            string trans_c_id,
            string trans_create_by_id 
            )
        {
            try
            {
                string trans_ca_cu_id = string.Empty;
                string trans_ca_cu_desc = string.Empty;
                string trans_ca_title = string.Empty;
                string trans_ca_bak = string.Empty;
                string trans_create_by_name = string.Empty;
                string trans_create_dat = string.Empty;
                string trans_group_fee_desc = string.Empty;
                string trans_old_cu_desc = string.Empty;


                string os_rec_fee_cu_id = string.Empty;
                string os_rec_fee_cu_desc = string.Empty;
                string os_pay_fee_cu_id = string.Empty;
                string os_pay_fee_cu_desc = string.Empty;
                string os_od_delegate_cu_id = string.Empty;
                string os_od_delegate_cu_desc = string.Empty;
                string os_od_operation_id = string.Empty;
                string os_od_sales_id = string.Empty;
                string os_od_record_by_id = string.Empty;
                string os_od_service_id = string.Empty;
                string os_od_bak = string.Empty;
                string trans_c_desc = string.Empty;
                string trans_ca_year = string.Empty;
                string trans_ca_month = string.Empty;
                
                string trans_ca_cu_checkaccount_flag = string.Empty;
                string os_rec_fee_cu_checkaccount_flag = string.Empty;
                string os_pay_fee_cu_checkaccount_flag = string.Empty;

                DataTable dt_fee = dal.transfer_accountcheck(ca_seq,
	                trans_c_id ,
	                trans_create_by_id , 
	                ref trans_ca_cu_id  ,
                    ref trans_ca_cu_desc,
                    ref trans_ca_title,
                    ref trans_ca_bak,
                    ref trans_create_by_name,
                    ref trans_create_dat,
                    ref trans_group_fee_desc,
                    ref trans_old_cu_desc,
                    ref os_rec_fee_cu_id,
                    ref os_rec_fee_cu_desc,
                    ref os_pay_fee_cu_id,
                    ref os_pay_fee_cu_desc,
                    ref os_od_delegate_cu_id,
                    ref os_od_delegate_cu_desc,
                    ref os_od_operation_id,
                    ref os_od_sales_id,
                    ref os_od_record_by_id,
                    ref os_od_service_id,
                    ref os_od_bak,
                    ref trans_c_desc,
                    ref trans_ca_year,
                    ref trans_ca_month,
                    ref trans_ca_cu_checkaccount_flag,
                    ref os_rec_fee_cu_checkaccount_flag,
                    ref os_pay_fee_cu_checkaccount_flag);

                JObject jo = new JObject();

                jo["trans_ca_cu_id"] = trans_ca_cu_id;
                jo["trans_ca_cu_desc"] = trans_ca_cu_desc;
                jo["trans_ca_title"] = trans_ca_title;
                jo["trans_ca_bak"] = trans_ca_bak;
                jo["trans_create_by_name"] = trans_create_by_name;
                jo["trans_create_dat"] = trans_create_dat;
                jo["trans_group_fee_desc"] = trans_group_fee_desc;
                jo["trans_old_cu_desc"] = trans_old_cu_desc;
                jo["os_rec_fee_cu_id"] = os_rec_fee_cu_id;
                jo["os_rec_fee_cu_desc"] = os_rec_fee_cu_desc;
                jo["os_pay_fee_cu_id"] = os_pay_fee_cu_id;
                jo["os_pay_fee_cu_desc"] = os_pay_fee_cu_desc;
                jo["os_od_delegate_cu_id"] = os_od_delegate_cu_id;
                jo["os_od_delegate_cu_desc"] = os_od_delegate_cu_desc;
                jo["os_od_operation_id"] = os_od_operation_id;
                jo["os_od_sales_id"] = os_od_sales_id;
                jo["os_od_record_by_id"] = os_od_record_by_id;
                jo["os_od_service_id"] = os_od_service_id;
                jo["os_od_bak"] = os_od_bak;
                jo["trans_c_desc"] = trans_c_desc;
                jo["trans_ca_year"] = trans_ca_year;
                jo["trans_ca_month"] = trans_ca_month;
                jo["trans_ca_cu_checkaccount_flag"] = trans_ca_cu_checkaccount_flag;
                jo["os_rec_fee_cu_checkaccount_flag"] = os_rec_fee_cu_checkaccount_flag;
                jo["os_pay_fee_cu_checkaccount_flag"] = os_pay_fee_cu_checkaccount_flag;

                if (dt_fee != null)
                {
                    jo["fee_details"] = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt_fee));
                }
                else
                {
                    jo["fee_details"] = new JArray();
                }



                return jo.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 
        #region 生成新的委托
        public bool insert_transfer_order(string res_ca_seq,
           string od_delegate_cu_id,
            string od_record_by_id,
            string od_operation_id,
            string od_service_id,
            string od_sales_id,
            string od_bak_delegate,
            string od_record_by_company_id,
            string od_service_cu_id,
            ref string od_seq,
            ref string od_no,
            ref string od_service_seq,
            ref string od_service_sub_seq
            )
        {
            try
            {
                bool b = dal.insert_transfer_order(res_ca_seq,
                    od_delegate_cu_id,
                    od_record_by_id,
                    od_operation_id,
                    od_service_id,
                    od_sales_id,
                    od_bak_delegate,
                    od_record_by_company_id,
                    od_service_cu_id,
                    ref od_seq,
                    ref od_no,
                    ref od_service_seq,
                    ref od_service_sub_seq);

                return b;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 更改账单
        public bool update_main_list_for_transfer(string ca_seq,
           string ca_cu_id,
            string ca_title,
            string ca_bak
            )
        {
            try
            {
                bool b = dal.update_main_list_for_transfer(ca_seq, ca_cu_id,
                    ca_title,
                    ca_bak);
                return b;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 绑定 账单
        public bool bind_transfer(string res_ca_seq,
           string trans_rec_ca_seq,
            string trans_pay_ca_seq
            )
        {
            try
            {
                bool b = dal.bind_transfer(res_ca_seq,
                    trans_rec_ca_seq,
                    trans_pay_ca_seq);
                return b;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 绑定 账单费用
        public bool bind_transfer_fee(string res_ca_seq,
            string res_fee_seq,
           string trans_ca_seq,
            string trans_fee_seq
            )
        {
            try
            {
                bool b = dal.bind_transfer_fee(res_ca_seq,
                    res_fee_seq,
                    trans_ca_seq,
                    trans_fee_seq);
                return b;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        #region 生成过账 全部过程 

        public string create_transfer_ca(
            string res_ca_seq,
            string od_delegate_cu_id,
            string od_record_by_id,
            string od_operation_id,
            string od_service_id,
            string od_sales_id,
            string od_bak_delegate,
            string od_record_by_company_id,
            string od_service_cu_id ,
            string pay_fee_cu_id,
            string pay_fee_cu_desc,
            string rec_fee_cu_id,
            string rec_fee_cu_desc,

            string res_ca_year,
            string res_ca_month,
            string res_n_ca_cu_id,
            string res_n_ca_title,
            string res_n_ca_bak , 
            string res_post_by_id,
            /*费用*/
            string data_fee 
            ){
                try
                {
                    #region 1.生成新的委托 

                    string od_seq = string.Empty;
                    string od_no = string.Empty;
                    string od_service_seq = string.Empty;
                    string od_service_sub_seq = string.Empty;

                    bool b = insert_transfer_order(res_ca_seq,
                        od_delegate_cu_id,
                        od_record_by_id,
                        od_operation_id,
                        od_service_id,
                        od_sales_id,
                        od_bak_delegate,
                        od_record_by_company_id,
                        od_service_cu_id,
                        ref od_seq,
                        ref od_no,
                        ref od_service_seq,
                        ref od_service_sub_seq);
                    #endregion
                     
                    #region 2.插入费用

                    string rec_fee_seqs = string.Empty;
                    string pay_fee_seqs = string.Empty;

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
                            string fee_rel_bill_no = lst_fee[i]["fee_rel_bill_no"].ToString().Trim();
                            string fee_rel_opr_cod = lst_fee[i]["fee_rel_opr_cod"].ToString().Trim();

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
                                od_record_by_id,
                                fee_seq,
                                fee_invoice_typ,
                                fee_rel_bill_no,
                                fee_rel_opr_cod,
                                ref fee_seq_out);  

                            lst_fee[i]["fee_seq"] = fee_seq_out;

                            if(rec_or_pay.Equals("1")){
                                if(rec_fee_seqs.Length == 0){
                                    rec_fee_seqs = fee_seq_out;
                                }else{
                                    rec_fee_seqs += "," + fee_seq_out;
                                }
                            }else{
                                if(pay_fee_seqs.Length == 0){
                                    pay_fee_seqs = fee_seq_out;
                                }else{
                                    pay_fee_seqs += "," + fee_seq_out;
                                }
                            }
                        }
                    }
                    #endregion

                    #region 3. 账单生成  
                    
                    #region 应收账单
                    string trans_rec_ca_seq = string.Empty;
                    string trans_rec_ca_title = rec_fee_cu_desc + res_ca_year + "年" + res_ca_month + "月应收账单(过账)";

                    b = insert_main_list_of_boolresult(
                        rec_fee_cu_id,
                        od_record_by_company_id,
                        trans_rec_ca_title,
                        "0",
                        "1",
                        res_ca_year,
                        res_ca_month,
                        od_bak_delegate,
                        od_record_by_id, 
                        string.Empty,
                        "0",
                        string.Empty,
                        string.Empty,
                        ref trans_rec_ca_seq);
                    //插入费用 
                    b = insert_fee_details_of_boolresult(
                        trans_rec_ca_seq,
                        rec_fee_seqs,
                        od_record_by_id);
                    //并提交账单  
                    b = post_of_boolresult(trans_rec_ca_seq, od_record_by_id, od_bak_delegate);
                    #endregion 

                    #region 应付账单
                    string trans_pay_ca_seq = string.Empty;
                    string trans_pay_ca_title = pay_fee_cu_desc + res_ca_year + "年" + res_ca_month + "月应付账单(过账)";

                    b = insert_main_list_of_boolresult(
                        pay_fee_cu_id,
                        od_record_by_company_id,
                        trans_pay_ca_title,
                        "0",
                        "-1",
                        res_ca_year,
                        res_ca_month,
                        od_bak_delegate,
                        od_record_by_id,
                        string.Empty,
                        "0",
                        string.Empty,
                        string.Empty,
                        ref trans_pay_ca_seq);
                    //插入费用 
                    b = insert_fee_details_of_boolresult(
                        trans_pay_ca_seq,
                        pay_fee_seqs,
                        od_record_by_id); 
                    //并提交账单  
                    b = post_of_boolresult(trans_pay_ca_seq, od_record_by_id, od_bak_delegate);


                    #endregion  

                    #region 绑定账单关系 
                    b = bind_transfer(res_ca_seq,
                        trans_rec_ca_seq,
                        trans_pay_ca_seq);
                    #endregion 
                    #endregion

                    #region 4.费用绑定
                    for (int i = 0; i < lst_fee.Count; i++)
                    {
                             
                        string fee_seq = lst_fee[i]["fee_seq"].ToString().Trim();
                        string rec_or_pay = lst_fee[i]["rec_or_pay"].ToString().Trim();
                        string res_fee_seq = lst_fee[i]["res_fee_seq"].ToString().Trim();

                        if (rec_or_pay.Equals("1"))
                        {
                            b = bind_transfer_fee(res_ca_seq,
                             res_fee_seq,
                             trans_rec_ca_seq,
                             fee_seq);
                        }
                        else
                        {
                            b = bind_transfer_fee(res_ca_seq,
                                        res_fee_seq,
                                        trans_pay_ca_seq,
                                        fee_seq);
                        }
                        
                         
                    }
                    #endregion  

                    #region 5.更改当前账单的 结算单位及标题和备注 
                    bool b_update_res_ca = update_main_list_for_transfer(res_ca_seq,
                        res_n_ca_cu_id,
                        res_n_ca_title,
                        res_n_ca_bak); 
                    #endregion 


                    #region 6.当前账单，交账 
                    bool b_res_post = post_of_boolresult(res_ca_seq, res_post_by_id, res_n_ca_bak);
                    #endregion 

                    #region 7.返回组织
                    /*
                        理论上面，是不会出现失败的 
                     */
                    JObject j_result = new JObject();
                    if (b_update_res_ca == false)
                    {
                        j_result["result"] = 0;
                    }
                    else
                    {
                        j_result["result"] = 1;

                        j_result["trans_od_seq"] = od_seq;
                        j_result["trans_od_no"] = od_no;
                        j_result["trans_rec_ca_title"] = trans_rec_ca_title;
                        j_result["trans_pay_ca_title"] = trans_pay_ca_title;
                        j_result["trans_rec_ca_seq"] = trans_rec_ca_seq;
                        j_result["trans_pay_ca_seq"] = trans_pay_ca_seq;

                    }

                    #endregion 

                    return j_result.ToString();
                }
                catch (Exception e)
                {
                    throw e;
                }
        }

        #endregion 

        #region 判定是否可以删除账单
        public string judge_giveback_checkaccount(string ca_seqs 
            )
        {
            try
            {
                string msg = string.Empty;

                int result = dal.judge_giveback_checkaccount(ca_seqs,ref msg);

                JObject jo = new JObject();
                jo["result"] = result;
                jo["msg"] = msg;

                return jo.ToString();

            }
            catch (Exception e)
            {
                throw e;
            }
        }
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
    }
}
