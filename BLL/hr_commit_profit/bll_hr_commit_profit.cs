using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using DAL.hr_commit_profit;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
 


namespace BLL.hr_commit_profit
{
    public class bll_hr_commit_profit
    {
        dal_hr_commit_profit dal = null;

        public bll_hr_commit_profit()
        {
            dal = new dal_hr_commit_profit();
        }

        #region 提成审核创建及申请

        #region 创建并提交 
        public string create_hr_commit_profit_approval(string hr_commit_id,
            string rel_u_id,
            string rel_beg_dat,
            string rel_end_dat ,
            string order_list,
            string c_id, 
            string ap_u_id,
            string aps_order_by_id,
            string aps_id,
            string amc_bak
            )
        {
            try
            {
                JObject jo = new JObject();
                //第一步插入头 
                bool b = false;
                string hr_seq = string.Empty;
                string amc_id = string.Empty;

                b = insert_hr_commit_profit_record(hr_commit_id,
                    rel_u_id,
                    rel_beg_dat,
                    rel_end_dat,
                    ref hr_seq);
                if (b)
                {
                    JArray lst_od = null;

                    JObject od_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(order_list);
                    if (od_item["order_list"] != null)
                    {

                        lst_od = (JArray)od_item["order_list"];
                        for (int i = 0; i < lst_od.Count; i++)
                        {
                            string od_seq = lst_od[i]["od_seq"].ToString().Trim();
                            string fee_amount_of_base = lst_od[i]["fee_amount_of_base"].ToString().Trim();
                            string fee_amount_of_eur = lst_od[i]["fee_amount_of_eur"].ToString().Trim();
                            string fee_amount_of_jpy = lst_od[i]["fee_amount_of_jpy"].ToString().Trim();
                            string fee_amount_of_rmb = lst_od[i]["fee_amount_of_rmb"].ToString().Trim();
                            string fee_amount_of_usd = lst_od[i]["fee_amount_of_usd"].ToString().Trim();
                            string cover_flag = lst_od[i]["cover_flag"].ToString().Trim();
                            string pre_fee_amount_of_base = lst_od[i]["pre_fee_amount_of_base"].ToString().Trim();
                            string pre_fee_amount_of_eur = lst_od[i]["pre_fee_amount_of_eur"].ToString().Trim();
                            string pre_fee_amount_of_jpy = lst_od[i]["pre_fee_amount_of_jpy"].ToString().Trim();
                            string pre_fee_amount_of_rmb = lst_od[i]["pre_fee_amount_of_rmb"].ToString().Trim();
                            string pre_fee_amount_of_usd = lst_od[i]["pre_fee_amount_of_usd"].ToString().Trim();
                            string rel_hr_commit_title = lst_od[i]["rel_hr_commit_title"].ToString().Trim();
                            insert_hr_commit_profit_details(hr_seq,
                                od_seq,
                                fee_amount_of_base,
                                fee_amount_of_eur,
                                fee_amount_of_jpy,
                                fee_amount_of_rmb,
                                fee_amount_of_usd,
                                cover_flag,
                                pre_fee_amount_of_base,
                                pre_fee_amount_of_eur,
                                pre_fee_amount_of_jpy,
                                pre_fee_amount_of_rmb,
                                pre_fee_amount_of_usd,
                                rel_hr_commit_title);


                        }
                    }

                    //投递
                    

                    b = post_commit_profit(c_id,
                        hr_seq,
                        hr_commit_id,
                        ap_u_id,
                        aps_order_by_id,
                        aps_id,
                        amc_bak,
                        ref amc_id);

                    jo["result"] = b ? 1 : 0;
                    jo["hr_seq"] = hr_seq;
                    jo["amc_id"] = amc_id;

                    jo["msg"] = "申请已创建成功并提交审核";
                }
                else
                {
                    jo["result"] = 0;

                    jo["msg"] = "异常: 请截图并练习管理员处理";
                }

                return jo.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 插入提成审核单元 头部内容
        protected bool insert_hr_commit_profit_record(string hr_commit_id,
            string rel_u_id,
            string rel_beg_dat,
            string rel_end_dat ,
            ref string hr_seq
            )
        {
            try
            {   
                bool b = dal.insert_hr_commit_profit_record(hr_commit_id,
                    rel_u_id,
                    rel_beg_dat,
                    rel_end_dat,
                    ref hr_seq);

                return b;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 插入提成审核单元 明细
        protected bool insert_hr_commit_profit_details(string hr_seq,
            string od_seq,
            string fee_amount_of_base,
            string fee_amount_of_eur,
            string fee_amount_of_jpy,
            string fee_amount_of_rmb,
            string fee_amount_of_usd,
            string cover_flag,
            string pre_fee_amount_of_base,
            string pre_fee_amount_of_eur,
            string pre_fee_amount_of_jpy,
            string pre_fee_amount_of_rmb,
            string pre_fee_amount_of_usd,
            string rel_hr_commit_title
            )
        {
            try
            {
                bool b = dal.insert_hr_commit_profit_details(hr_seq,
                   od_seq,
                   fee_amount_of_base,
                   fee_amount_of_eur,
                   fee_amount_of_jpy,
                   fee_amount_of_rmb,
                   fee_amount_of_usd,
                   cover_flag,
                   pre_fee_amount_of_base,
                   pre_fee_amount_of_eur,
                   pre_fee_amount_of_jpy,
                   pre_fee_amount_of_rmb,
                   pre_fee_amount_of_usd,
                   rel_hr_commit_title);
                return b;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region 提交提成审核
        protected bool post_commit_profit(string c_id,
            string hr_seq,
            string post_by_id,
            string ap_u_id,
            string aps_order_by_id,
            string aps_id,
            string amc_bak,
            ref string amc_id
            )
        {
            try
            {
                bool b = dal.post_commit_profit(c_id,
                    hr_seq, post_by_id,
                    ap_u_id,
                    aps_order_by_id,
                    aps_id,
                    amc_bak,
                    ref amc_id);

                    return b;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 获取
        #region 获取上一次 (当前时间以前的)
        public string get_last_commit_dat(string rel_u_id, string cpy_desc)
        {
            try
            {
                JObject jo = new JObject();
                string last_rel_end_dat = string.Empty;

                bool b = dal.get_last_commit_dat(rel_u_id, ref last_rel_end_dat);

                jo["last_exists"] = b ? 1 : 0;
                jo["last_rel_end_dat"] = last_rel_end_dat;
                jo["cpy_desc"] = cpy_desc;
                return jo.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 通过时间,u_id获取应收结算完毕委托单
        public string get_woa_group_of_sb(string c_id,
            string group_u_id,
            string woa_beg_dat,
            string woa_end_dat
            )
        {
            try
            {
                JObject jo = new JObject();

                DataTable dt = dal.get_woa_group_of_sb(c_id, group_u_id, woa_beg_dat, woa_end_dat);
                JArray data = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));

                jo["rows"] = data;
                jo["total"] = dt == null?0: dt.Rows.Count;

                return jo.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取审核列表
        public string get_full_hr_commit_profit_list(string c_id,
            string like_str,
            string u_id,
            string amc_status,
            string amc_cur_opr_id,
            string amc_create_id,
            string hr_rel_u_id,
            string only_my_step,
            string page,
            string rows,
            string sort,
            string ordersort 
            )
        {
            try
            {
                string rowcount = "0";

                JObject jo = new JObject();

                DataTable dt = dal.get_full_hr_commit_profit_list(c_id,
                    like_str,
                    u_id,
                    amc_status,
                    amc_cur_opr_id,
                    amc_create_id,
                    hr_rel_u_id,
                    only_my_step,
                    page,
                    rows,
                    sort,
                    ordersort ,
                    ref rowcount
                    );
                JArray data = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));

                jo["rows"] = data;
                jo["total"] = rowcount;

                return jo.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取单个审核

        
        public string get_hr_commit_profit_record_single(string amc_id,
            string u_id
            )
        {
            try
            {
                JObject jo = new JObject();

                DataTable dt = dal.get_hr_commit_profit_record_single(amc_id,
                    u_id 
                    );
                JArray data = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));

                jo = (Newtonsoft.Json.Linq.JObject)data[0];

                DataTable dt_uncover = dal.get_hr_commit_profit_details_by_amc_id_of_uncover(amc_id);
                JArray data_uncover = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt_uncover));

                DataTable dt_cover = dal.get_hr_commit_profit_details_by_amc_id_of_cover(amc_id);
                JArray data_cover = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt_cover));

                jo["uncover_od_list"] = data_uncover;
                jo["cover_od_list"] = data_cover;

                return jo.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        

        #endregion


    }
}
