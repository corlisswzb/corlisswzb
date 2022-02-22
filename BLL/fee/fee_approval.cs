using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Linq;

namespace BLL.fee
{
    public class fee_approval
    {
        DAL.fee.fee_approval fa = null;
        public fee_approval()
        {
            fa = new DAL.fee.fee_approval();
        }

        #region 通过费用审核,
        public string pass_fee_approval(string fa_rows,
            string fe_cuid, string fe_feeid, string fe_type, string fe_sum_rmb, string fe_sum_usd, string fe_uid, string fe_state)
        {
            try
            {
                //审核记录
                bool b = fa.insert_fee_approval(fe_cuid,fe_feeid, fe_type, fe_sum_rmb, fe_sum_usd, fe_uid, fe_state);
                if (b)//审核通过,更新申请单的【申请费用id】和【审核费用id】                        
                {//如果申请费用单的所有费用都审核完毕，就结束申请状态
                    DAL.fee.fee_apply fay = new DAL.fee.fee_apply();

                    JArray ja_farows = JArray.Parse(fa_rows);

                    for (int i = 0; i < ja_farows.Count; i++)
                    {
                        string fa_id = ja_farows[i]["fa_id"].ToString();
                        string fa_feeids = ja_farows[i]["fa_feeids_sq"].ToString();

                        string fa_feeids_sh = "";
                        string fa_feeids_sq = get_feeids_sq(fa_feeids, fe_feeid, ref fa_feeids_sh);

                        fay.update_fee_apply_feeids(fa_id, fa_feeids_sq, fa_feeids_sh);
                    }

                    
                }
                
                return BLL.commone.BLL_commone.result_convert_json(b?1:0,"");
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string get_feeids_sq(string feeids_sq, string fe_feeid,ref string feeids_sh)
        {
            try
            {
                string[] arr_sq = feeids_sq.Split(',');
                string[] arr_feeids = fe_feeid.Split(',');

                List<string> lst_sq = new List<string>(arr_sq);
                List<string> lst_feeids = new List<string>(arr_feeids);
                List<string> lst_sh = new List<string>();

                for (int i = 0; i < lst_feeids.Count; i++)
                {
                    for (int j = 0; j < lst_sq.Count; j++)
                    {
                        if (lst_sq != null && lst_sq.Count > 0)
                        {
                            if (lst_sq[j] == lst_feeids[i])
                            {
                                lst_sh.Add(lst_sq[j]);
                                lst_sq.RemoveAt(j);
                            }
                        }

                    }
                }

                feeids_sh = String.Join(",", lst_sh.ToArray());
                return String.Join(",", lst_sq.ToArray());
                

            }
            catch (Exception)
            {
                
                throw;
            }
        }

        private string get_feeids_sh(string fa_feeids_sq, string fe_feeid)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region 驳回费用审核,
        public string reject_fee_approval(string fe_cuid, string fe_feeid, string fe_type, string fe_sum_rmb, string fe_sum_usd, string fe_uid, string fe_state)
        {
            try
            {
                bool b = fa.insert_fee_approval(fe_cuid, fe_feeid, fe_type, fe_sum_rmb, fe_sum_usd, fe_uid, fe_state);
                if (b == true && fe_state == "1")//审核通过,更新申请单的【申请费用id】和【审核费用id】
                //如果申请费用单的所有费用都审核完毕，就结束申请状态
                {

                }
                return BLL.commone.BLL_commone.result_convert_json(b?1:0,"");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 
        public string get_fee_approval_list(
             string like_str,
             string cu_id,
             string fee_uid, 
             string fee_sdate,
             string fee_edate,
             string feeids,
             string fee_type,
             string fee_state,
             string page,
             string rows,
             string sort,
             string order)
        {
            try
            {
                int rowcount = 0;
                DataTable dt = fa.get_fee_approval_list(like_str, cu_id, fee_uid, fee_sdate, fee_edate,feeids,fee_type,fee_state, page, rows, sort, order,ref rowcount);
                string json = BLL.commone.BLL_commone.data_convert_json(dt,rowcount);
                return json;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取费用审批列表
        public string get_fee_apply_feelists(
            string cu_id,
            string fee_uid,
            string fee_sdate,
            string fee_edate,
            string fee_type,
            string fee_state,
            
            string like_str,
            string feeids,
            string page,
            string rows,
            string sort,
            string order)
        {

            try
            {
                int rowcount = 0;
                string json = "{\"total\":0,\"rows\":[]}";
                if (string.IsNullOrEmpty(feeids))
                {
                    DataTable dt = fa.get_fee_apply_feeids(cu_id, fee_uid, fee_sdate, fee_edate, fee_type, fee_state);
                    if (dt!=null&&dt.Rows.Count>0)
                    {
                        feeids = dt.Rows[0]["feeids"].ToString();
                        if (!string.IsNullOrEmpty(feeids))
                        {
                             DataTable f_dt = fa.get_fee_apply_feelist(like_str, feeids, page, rows, sort, order, ref rowcount);
                             json = BLL.commone.BLL_commone.data_convert_json(f_dt, rowcount);
                            
                        }
                    }
                }
                else
                {
                    DataTable f_dt = fa.get_fee_apply_feelist(like_str, feeids, page, rows, sort, order, ref rowcount);
                    json = BLL.commone.BLL_commone.data_convert_json(f_dt, rowcount);
                    
                }

                return json;

                
            }
            catch (Exception)
            {
                
                throw;
            }
        
        
        }
        #endregion

        #region 获取费用申请人
        public string get_fee_apply_userlist(string fa_type)
        {
            try
            {
                DataTable dt = fa.get_fee_apply_userlist(fa_type);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 获取费用申请结算对象
        public string get_fee_apply_customlist(string fa_type)
        {
            try
            {
                DataTable dt = fa.get_fee_apply_customlist(fa_type);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

    }
}
