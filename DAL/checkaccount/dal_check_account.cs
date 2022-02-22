using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;

namespace DAL.checkaccount
{
    public class dal_check_account
    {
        msSqlHelper ms = null;

        public dal_check_account()
        {
            ms = new msSqlHelper();
        }

        #region 业务员使用部分 

        #region 获取 费用信息
        public DataTable get_order_fee(string c_id,
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
            string ordersort,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@fee_status", fee_status));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@fee_item_typ", fee_item_typ));
                lst_in.Add(new SqlParameter("@fee_currency_id", fee_currency_id));
                lst_in.Add(new SqlParameter("@fee_invoice_typ", fee_invoice_typ));
                lst_in.Add(new SqlParameter("@fee_dat_beg", fee_dat_beg));
                lst_in.Add(new SqlParameter("@fee_dat_end", fee_dat_end));
                lst_in.Add(new SqlParameter("@od_no", od_no));
                lst_in.Add(new SqlParameter("@od_typ", od_typ));
                lst_in.Add(new SqlParameter("@od_project_typ", od_project_typ));
                lst_in.Add(new SqlParameter("@od_water_way_flag", od_water_way_flag));
                lst_in.Add(new SqlParameter("@od_sub_way_flag", od_sub_way_flag));
                lst_in.Add(new SqlParameter("@od_road_way_flag", od_road_way_flag));
                lst_in.Add(new SqlParameter("@od_air_way_flag", od_air_way_flag));
                lst_in.Add(new SqlParameter("@od_status_id", od_status_id));
                lst_in.Add(new SqlParameter("@od_route_tools_desc", od_route_tools_desc));
                lst_in.Add(new SqlParameter("@od_route_tools_no", od_route_tools_no));
                lst_in.Add(new SqlParameter("@od_bill_nos", od_bill_nos));
                lst_in.Add(new SqlParameter("@od_cntr_nos", od_cntr_nos));
                lst_in.Add(new SqlParameter("@invoice_no", invoice_no));
                lst_in.Add(new SqlParameter("@fee_rel_bill_no", fee_rel_bill_no));
                lst_in.Add(new SqlParameter("@fee_limit_days_status", fee_limit_days_status));
                lst_in.Add(new SqlParameter("@fee_invoice_lock_flag", fee_invoice_lock_flag));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar,2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                
                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_order_fee", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable get_order_fee_all(string c_id,
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
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@fee_status", fee_status));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@fee_item_typ", fee_item_typ));
                lst_in.Add(new SqlParameter("@fee_currency_id", fee_currency_id));
                lst_in.Add(new SqlParameter("@fee_invoice_typ", fee_invoice_typ));
                lst_in.Add(new SqlParameter("@fee_dat_beg", fee_dat_beg));
                lst_in.Add(new SqlParameter("@fee_dat_end", fee_dat_end));
                lst_in.Add(new SqlParameter("@od_no", od_no));
                lst_in.Add(new SqlParameter("@od_typ", od_typ));
                lst_in.Add(new SqlParameter("@od_project_typ", od_project_typ));
                lst_in.Add(new SqlParameter("@od_water_way_flag", od_water_way_flag));
                lst_in.Add(new SqlParameter("@od_sub_way_flag", od_sub_way_flag));
                lst_in.Add(new SqlParameter("@od_road_way_flag", od_road_way_flag));
                lst_in.Add(new SqlParameter("@od_air_way_flag", od_air_way_flag));
                lst_in.Add(new SqlParameter("@od_status_id", od_status_id));
                lst_in.Add(new SqlParameter("@od_route_tools_desc", od_route_tools_desc));
                lst_in.Add(new SqlParameter("@od_route_tools_no", od_route_tools_no));
                lst_in.Add(new SqlParameter("@od_bill_nos", od_bill_nos));
                lst_in.Add(new SqlParameter("@od_cntr_nos", od_cntr_nos));
                lst_in.Add(new SqlParameter("@invoice_no", invoice_no));
                lst_in.Add(new SqlParameter("@fee_rel_bill_no", fee_rel_bill_no));
                lst_in.Add(new SqlParameter("@fee_limit_days_status", fee_limit_days_status));
                lst_in.Add(new SqlParameter("@fee_invoice_lock_flag", fee_invoice_lock_flag));
            
                List<SqlParameter> lst_out = new List<SqlParameter>();
               
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);


                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_order_fee_all", lst_in, ref lst_out);
           
                group_fee_desc = lst_out[0].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 账单信息
        //分页  业务员用
        public DataTable get_checkaccount(string c_id,
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
            string ordersort,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id)); 
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id)); 
                lst_in.Add(new SqlParameter("@ca_status", ca_status)); 
                lst_in.Add(new SqlParameter("@ca_year", ca_year));
                lst_in.Add(new SqlParameter("@ca_month", ca_month));
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@ca_create_by_id", ca_create_by_id));

                lst_in.Add(new SqlParameter("@ca_invoice_no", ca_invoice_no));
                lst_in.Add(new SqlParameter("@ca_fee_total", ca_fee_total));
                lst_in.Add(new SqlParameter("@ca_invoice_typ_status", ca_invoice_typ_status));
                lst_in.Add(new SqlParameter("@ca_approval_status", ca_approval_status));
                lst_in.Add(new SqlParameter("@ca_woa_status", ca_woa_status));

                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar,2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2); 

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_checkaccount", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //不分页 业务员用
        public DataTable get_checkaccount_no_page(string c_id,
            string u_id,
            string rec_or_pay,
            string ca_cu_id, 
            string ca_year,
            string ca_month )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id));
              
                lst_in.Add(new SqlParameter("@ca_year", ca_year));
                lst_in.Add(new SqlParameter("@ca_month", ca_month));

                List<SqlParameter> lst_out = null;


                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_checkaccount_no_page", lst_in, ref lst_out);
        
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable get_checkaccount_by_ca_seq(string ca_seq,
            string u_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@u_id", u_id)); 

                List<SqlParameter> lst_out = null; 

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_checkaccount_by_ca_seq", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增对账单
        public bool insert_main_list(
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
            ref string ca_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id));
                lst_in.Add(new SqlParameter("@ca_company_id", ca_company_id));
                lst_in.Add(new SqlParameter("@ca_title", ca_title));
                lst_in.Add(new SqlParameter("@ca_group_flag", ca_group_flag));
                lst_in.Add(new SqlParameter("@ca_rec_or_pay", ca_rec_or_pay));
                lst_in.Add(new SqlParameter("@ca_year", ca_year));
                lst_in.Add(new SqlParameter("@ca_month", ca_month));
                lst_in.Add(new SqlParameter("@ca_bak", ca_bak));
                lst_in.Add(new SqlParameter("@ca_create_by_id", ca_create_by_id));
                lst_in.Add(new SqlParameter("@ca_limit_dat", ca_limit_dat));
                lst_in.Add(new SqlParameter("@ca_assign_flag", ca_assign_flag));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@ca_seq", SqlDbType.NVarChar,40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_insert_main_list", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                ca_seq = lst_out[1].Value.ToString();

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改对账单
        public int update_main_list( 
            string ca_title,
            string ca_group_flag, 
            string ca_year,
            string ca_month,
            string ca_bak,
            string ca_create_by_id,
            string ca_seq, 
            string ca_limit_dat,
            string ca_assign_flag)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq)); 
                lst_in.Add(new SqlParameter("@ca_title", ca_title));
                lst_in.Add(new SqlParameter("@ca_group_flag", ca_group_flag)); 
                lst_in.Add(new SqlParameter("@ca_year", ca_year));
                lst_in.Add(new SqlParameter("@ca_month", ca_month));
                lst_in.Add(new SqlParameter("@ca_bak", ca_bak));
                lst_in.Add(new SqlParameter("@ca_create_by_id", ca_create_by_id));
                lst_in.Add(new SqlParameter("@ca_limit_dat", ca_limit_dat));
                lst_in.Add(new SqlParameter("@ca_assign_flag", ca_assign_flag));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_update_main_list", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
              
                return result  ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public int update_main_list_simple(
            string ca_title,  
            string ca_bak,
            string ca_cu_id,
            string u_id,
            string ca_seq )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@ca_title", ca_title));
                lst_in.Add(new SqlParameter("@u_id", u_id)); 
                lst_in.Add(new SqlParameter("@ca_bak", ca_bak));
                lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_update_main_list_simple", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除对账单
        public int delete_main_list(
            string ca_seqs,
            string ca_update_by_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seqs", ca_seqs));
                lst_in.Add(new SqlParameter("@ca_update_by_id", ca_update_by_id)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_delete_main_list", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 账单附件
        #region 新增
        public int update_attachment_list(
            string ca_seq,
            string file_seq,
            string file_record_id,
            string file_path,
            string file_nam,
            ref string file_seq_out )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@file_record_id", file_record_id));
                lst_in.Add(new SqlParameter("@file_path", file_path));
                lst_in.Add(new SqlParameter("@file_nam", file_nam));
                lst_in.Add(new SqlParameter("@file_seq", file_seq));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@file_seq_out", SqlDbType.NVarChar,40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_update_attachment_list", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                file_seq_out = lst_out[1].Value.ToString();

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除
        public int delete_attachment_list(
            string ca_seq,
            string file_update_id,
            string file_seqs )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@file_update_id", file_update_id));
                lst_in.Add(new SqlParameter("@file_seqs", file_seqs));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_delete_attachment_list", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 
        public DataTable get_attachment_list( 
            string ca_seq )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_attachment_list", lst_in, ref lst_out);
                  
                return dt;

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
        public int update_relation_user_list(
            string ca_seq,
            string u_ids,
            string update_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@u_ids", u_ids));
                lst_in.Add(new SqlParameter("@update_id", update_id)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
 
                DataTable dt = ms.excuteStoredProcedureData("_ca_p_update_relation_user_list", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                
                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 获取
        public DataTable  get_relation_user_list(
            string ca_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_relation_user_list", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #region 费用加入对账单
        public int  insert_fee_details(
            string ca_seq,
            string fee_seqs,
            string record_by_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                lst_in.Add(new SqlParameter("@record_by_id", record_by_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_insert_fee_details", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 费用从对账单移除
        public int delete_fee_details(
            string ca_seq,
            string fee_seqs,
            string update_by_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                lst_in.Add(new SqlParameter("@update_by_id", update_by_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_delete_fee_details", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取对账单费用
        public DataTable get_order_fee_by_ca_seq(string c_id,
            string u_id, 
            string rec_or_pay,
            string ca_seq,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar,2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
 
                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_order_fee_by_ca_seq", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString(); 
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        
        #region 获取对账单费用
        public DataTable get_order_fee_by_fee_seqs( 
            string fee_seqs,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_order_fee_by_fee_seqs", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_order_fee_by_ca_seq_for_ap( 
            string u_id, 
            string ca_seq,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar,2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                 
                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_order_fee_by_ca_seq_for_ap", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString(); 

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 账单投递
        public int post(
            string ca_seq,
            string cur_opr_id,
            string ca_bak)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@cur_opr_id", cur_opr_id));
                lst_in.Add(new SqlParameter("@ca_bak", ca_bak));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_post", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
 
        #endregion

        #region 下载 单票对账单
        public DataTable get_order_fee_by_ca_seq_for_download(
            string c_id,
            string ca_seq,
            string u_id,
            ref string company_desc,
            ref string company_address,
            ref string company_phone,
            ref string company_cn_bank_info,
            ref string company_en_bank_info,
            ref string print_nam,
            ref string print_dat,
            ref string cu_desc,
            ref string ca_title,
            ref string total_amount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@u_id", u_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                string[] out_par = { "company_desc",
                    "company_address",
                    "company_phone",
                    "company_cn_bank_info",
                    "company_en_bank_info",
                    "print_nam",
                    "print_dat",
                    "cu_desc",
                    "ca_title",
                    "total_amount"
                     };
                foreach (string s in out_par)
                {
                    SqlParameter p = new SqlParameter(s, SqlDbType.NVarChar, 500);
                    p.Direction = ParameterDirection.Output;
                    lst_out.Add(p);
                } 

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_order_fee_by_ca_seq_for_download", lst_in, ref lst_out);

                company_desc = lst_out[0].Value.ToString();
                company_address = lst_out[1].Value.ToString();
                company_phone = lst_out[2].Value.ToString();
                company_cn_bank_info = lst_out[3].Value.ToString();
                company_en_bank_info = lst_out[4].Value.ToString();
                print_nam = lst_out[5].Value.ToString();
                print_dat = lst_out[6].Value.ToString();
                cu_desc = lst_out[7].Value.ToString();
                ca_title = lst_out[8].Value.ToString();
                total_amount = lst_out[9].Value.ToString();
               
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 

        #region 专注模式 
        #region 所有未归账的费用汇总
        public DataTable get_group_order_fee_of_nonca_by_cu_id(string c_id,
            string u_id, 
            string rec_or_pay ,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id)); 
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2); 

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_group_order_fee_of_nonca_by_cu_id", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 所有未归账的费用明细
        public DataTable  get_details_order_fee_of_nonca_by_cu_id(string c_id,
            string u_id,
            string rec_or_pay,
            string cu_id,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@cu_id", cu_id));

                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_details_order_fee_of_nonca_by_cu_id", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();


                return dt;

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

        #region 商务使用部分
        #region 获取 账单信息
        //分页  业务员用
      
        public DataTable get_checkaccount_bus(string c_id,
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
            string ordersort,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id));
                lst_in.Add(new SqlParameter("@ca_status", ca_status)); 
                lst_in.Add(new SqlParameter("@ca_invoice_no", ca_invoice_no));
                lst_in.Add(new SqlParameter("@ca_fee_total", ca_fee_total));
                lst_in.Add(new SqlParameter("@ca_year", ca_year));
                lst_in.Add(new SqlParameter("@ca_month", ca_month));
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@ca_create_by_id", ca_create_by_id));
                lst_in.Add(new SqlParameter("@ca_invoice_typ_status", ca_invoice_typ_status));
                lst_in.Add(new SqlParameter("@ca_approval_status", ca_approval_status));
                lst_in.Add(new SqlParameter("@ca_woa_status", ca_woa_status));

                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_checkaccount", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_checkaccount_group_by_typ_index(string c_id,
            string rec_or_pay,
            string typ_index,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@typ_index", typ_index));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_checkaccount_group_by_typ_index", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable  get_checkaccount_count_by_typ_index(string c_id,
           string rec_or_pay )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_checkaccount_count_by_typ_index", lst_in, ref lst_out); 
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_checkaccount_by_typ_index(string c_id,
            string rec_or_pay,
            string typ_index,
            //string ca_cu_id,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                //lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id));
                lst_in.Add(new SqlParameter("@typ_index", typ_index)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_checkaccount_by_typ_index2", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable  get_checkaccount_group_by_cu_id(string c_id,
            string rec_or_pay, 
            string ca_status_flag, 
            string ca_invoice_flag,
            string ca_woa_flag ,  
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@ca_status_flag", ca_status_flag));
                lst_in.Add(new SqlParameter("@ca_invoice_flag", ca_invoice_flag));
                lst_in.Add(new SqlParameter("@ca_woa_flag", ca_woa_flag)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_checkaccount_group_by_cu_id", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_checkaccount_of_rec_need_invoice(string c_id, 
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
            string ordersort,
            ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id)); 
                lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id));
                lst_in.Add(new SqlParameter("@ca_status", ca_status));
                lst_in.Add(new SqlParameter("@ca_invoice_status", ca_invoice_status));
                lst_in.Add(new SqlParameter("@ca_year", ca_year));
                lst_in.Add(new SqlParameter("@ca_month", ca_month));
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@ca_create_by_id", ca_create_by_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_checkaccount_of_rec_need_invoice", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
       
        #endregion

        #region 获取对账单费用
        public DataTable get_order_fee_by_ca_seq(string c_id, 
            string rec_or_pay,
            string ca_seq,
            ref int rowcount,
            ref string group_fee_desc,
            ref string ca_bak )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id)); 
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar,2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@ca_bak", SqlDbType.NVarChar,2000);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);
 
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_fee_by_ca_seq", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc =  lst_out[1].Value.ToString();
                ca_bak = lst_out[2].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_order_fee_by_amc_id(string c_id, 
             string rec_or_pay,
             string amc_id,
             ref int rowcount,
             ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id)); 
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_fee_by_amc_id", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable get_single_pay_checkaccount( 
             string amc_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>(); 
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
             
                List<SqlParameter> lst_out = new List<SqlParameter>();
             

                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_single_pay_checkaccount", lst_in, ref lst_out);
              
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 退回账单
        public int giveback_checkaccount(
            string ca_seqs )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seqs", ca_seqs)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_giveback_checkaccount", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 标记账单 
        #region 开票情况 
        public bool flag_checkaccount_invoice(
            string ca_seqs,
            string cur_opr_id)
        {
            try
            {
                //没有限制，这里应该返回 1 
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seqs", ca_seqs));
                lst_in.Add(new SqlParameter("@cur_opr_id", cur_opr_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_flag_checkaccount_invoice", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool unflag_checkaccount_invoice(
            string ca_seqs )
        {
            try
            {
                //没有限制，这里应该返回 1 
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seqs", ca_seqs)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_unflag_checkaccount_invoice", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 销账情况
        public int  flag_checkaccount_finace(
            string ca_seqs,
            string cur_opr_id)
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销
                 
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seqs", ca_seqs));
                lst_in.Add(new SqlParameter("@cur_opr_id", cur_opr_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_flag_checkaccount_finace", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool unflag_checkaccount_finace(
            string ca_seqs )
        {
            try
            {
                //无限制，直接标记 

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seqs", ca_seqs));
                
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_unflag_checkaccount_finace", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

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
        public bool flag_fee_invoice_by_fee_seqs(
            string fee_seqs,
            string cur_opr_id,
            string invoice_no,
            string oi_limit_dat,
            string oi_bak,
            string oi_c_id ,
            string oi_rec_or_pay,
            string oi_sub_no,
            string oi_seq,
            string oi_cu_id,
            ref string oi_seq_out)
        {
            try
            {
                
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                lst_in.Add(new SqlParameter("@cur_opr_id", cur_opr_id));
                lst_in.Add(new SqlParameter("@invoice_no", invoice_no));
                lst_in.Add(new SqlParameter("@oi_limit_dat", oi_limit_dat));
                lst_in.Add(new SqlParameter("@oi_bak", oi_bak));
                lst_in.Add(new SqlParameter("@oi_c_id", oi_c_id));
                lst_in.Add(new SqlParameter("@oi_rec_or_pay", oi_rec_or_pay));
                lst_in.Add(new SqlParameter("@oi_sub_no", oi_sub_no));
                lst_in.Add(new SqlParameter("@oi_seq", oi_seq));
                lst_in.Add(new SqlParameter("@oi_cu_id", oi_cu_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@oi_seq_out", SqlDbType.NVarChar,40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_flag_fee_invoice_by_fee_seqs", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                oi_seq_out = lst_out[1].Value.ToString();

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool unflag_fee_invoice_by_fee_seqs(
            string fee_seqs)
        {
            try
            {
                //没有限制，这里应该返回 1 
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_unflag_fee_invoice_by_fee_seqs", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #region 更改销账备注
        public bool update_oi_bak(
            string oi_seq,
            string oi_bak)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@oi_seq", oi_seq));
                lst_in.Add(new SqlParameter("@oi_bak", oi_bak));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_update_oi_bak", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #endregion
        #region 销账情况
        public int flag_fee_finace_by_fee_seqs(
            string fee_seqs,
            string cur_opr_id)
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                lst_in.Add(new SqlParameter("@cur_opr_id", cur_opr_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_flag_fee_finace_by_fee_seqs", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool unflag_fee_finace_by_fee_seqs(
            string fee_seqs )
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_unflag_fee_finace_by_fee_seqs", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #region 销账记录 

        #region 判断是否可以进行销账操作 
        public int  judge_fee_finace_by_fee_seq(
            string fee_seq,
            string woa_money)
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq));
                lst_in.Add(new SqlParameter("@woa_money", woa_money));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_judge_fee_finace_by_fee_seq", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 新增一条销账记录 
        public int insert_write_off_accounts_record(
            string fee_seqs,
            string woa_record_id,
            string woa_cu_id ,
            string woa_c_id,
            string woa_total_amount,
            string woa_rec_or_pay,
            string woa_bank_dat,
            string woa_bak,
            string woa_typ,
            ref string woa_seq )
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                lst_in.Add(new SqlParameter("@woa_record_id", woa_record_id));
                lst_in.Add(new SqlParameter("@woa_cu_id", woa_cu_id));
                lst_in.Add(new SqlParameter("@woa_c_id", woa_c_id));
                lst_in.Add(new SqlParameter("@woa_total_amount", woa_total_amount));
                lst_in.Add(new SqlParameter("@woa_rec_or_pay", woa_rec_or_pay));
                lst_in.Add(new SqlParameter("@woa_bank_dat", woa_bank_dat));
                lst_in.Add(new SqlParameter("@woa_bak", woa_bak));
                lst_in.Add(new SqlParameter("@woa_typ", woa_typ)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@woa_seq", SqlDbType.NVarChar,40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_insert_write_off_accounts_record", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                woa_seq = lst_out[1].Value.ToString();
                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 新增销账明细 
        public int flag_fee_finace_by_fee_seq(
            string woa_seq,
            string fee_seq,
            string woa_money )
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@woa_seq", woa_seq));
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq));
                lst_in.Add(new SqlParameter("@woa_money", woa_money)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
 
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_flag_fee_finace_by_fee_seq", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
              
                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 查询销账记录
        public DataTable  get_write_off_accounts_list(
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
            string ordersort,
            ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@cu_id", cu_id));
                lst_in.Add(new SqlParameter("@year", year));
                lst_in.Add(new SqlParameter("@month", month));
                lst_in.Add(new SqlParameter("@money", money));
                lst_in.Add(new SqlParameter("@woa_record_id", woa_record_id)); 
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_write_off_accounts_list", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 根据销账记录获取费用销账明细 
        public DataTable  get_order_fee_by_woa_seq(
            string woa_seq,
            ref int rowcount,
            ref string group_fee_desc,
            ref string ca_bak)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@woa_seq", woa_seq));
                 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@ca_bak", SqlDbType.NVarChar, 2000);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_fee_by_woa_seq", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                ca_bak = lst_out[2].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 根据单个费用 获取费用的销账记录 
        public DataTable get_write_off_accounts_details_by_fee_seq(
            string fee_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq));
                List<SqlParameter> lst_out = null;


                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_write_off_accounts_details_by_fee_seq", lst_in, ref lst_out);
                
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 获取销账消息 
        public DataTable get_write_off_accounts_alert_msg(
            string woa_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@woa_seq", woa_seq));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_write_off_accounts_alert_msg", lst_in, ref lst_out);

                return dt; 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 更改销账备注 
        public bool  update_woa_bak(
            string woa_seq,
            string woa_bak)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@woa_seq", woa_seq));
                lst_in.Add(new SqlParameter("@woa_bak", woa_bak));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_update_woa_bak", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
 
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
        #region 账单投递


        public int post_for_bus(
            string ca_seq,
            string cur_opr_id,
            string ca_bak)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@cur_opr_id", cur_opr_id));
                lst_in.Add(new SqlParameter("@ca_bak", ca_bak));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_post_for_bus", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 删除对账单
        public int delete_main_list_for_bus(
            string ca_seqs,
            string ca_update_by_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seqs", ca_seqs));
                lst_in.Add(new SqlParameter("@ca_update_by_id", ca_update_by_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_delete_main_list_for_bus", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 费用从对账单移除
        public int delete_fee_details_for_bus(
            string ca_seq,
            string fee_seq )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_delete_fee_details_for_bus", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public int  judge_delete_fee_details_for_bus( 
           string fee_seqs)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>(); 
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_judge_delete_fee_details_for_bus", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion
        #region 提交账单审核
        /*
         * 改成了，可以提交多个账单一起审核 
         * 账单状态 ca_status = 2 且不能有正在审核或审核通过
         * 必须是同一家单位
         * 必须存在非免审 
         */ 
        public int  post_pay_checkaccount(
            string ca_seq,
            string post_by_id,
            string ap_u_id,
            string aps_order_by_id,
            string aps_id,
            string ba_desc,
            string ba_pay_typ,
            string ba_pay_dat, 
            string amc_bak,
            ref string amc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@post_by_id", post_by_id));
                lst_in.Add(new SqlParameter("@ap_u_id", ap_u_id));
                lst_in.Add(new SqlParameter("@aps_order_by_id", aps_order_by_id));
                lst_in.Add(new SqlParameter("@aps_id", aps_id));
                lst_in.Add(new SqlParameter("@ba_desc", ba_desc));
                lst_in.Add(new SqlParameter("@ba_pay_dat", ba_pay_dat));
                lst_in.Add(new SqlParameter("@ba_pay_typ", ba_pay_typ));
                lst_in.Add(new SqlParameter("@amc_bak", amc_bak));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@amc_id", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_post_pay_checkaccount", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                amc_id = lst_out[1].Value.ToString();

                return result  ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        
        #endregion

        #region 提示用户有几笔费用是负数 
        public void  pre_post_test_of_loss(
            string ca_seq,
             ref string loss_flag,
            ref string loss_of_prompt,
            ref string currency_flag, 
            ref string bank_info)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@loss_flag", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@loss_of_prompt", SqlDbType.NVarChar,2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                SqlParameter p3 = new SqlParameter("@currency_flag", SqlDbType.Int);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);
                SqlParameter p4 = new SqlParameter("@bank_info", SqlDbType.NVarChar, 2000);
                p4.Direction = ParameterDirection.Output;
                lst_out.Add(p4);
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_pre_post_test_of_loss2", lst_in, ref lst_out);
                  loss_flag =  lst_out[0].Value.ToString();
                loss_of_prompt = lst_out[1].Value.ToString();
                currency_flag = lst_out[2].Value.ToString();
                bank_info = lst_out[3].Value.ToString();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 更新账单费用
         
        public bool update_fee_details(string fee_seq, 
            string fee_invoice_typ, 
            string fee_item_typ, 
            string fee_number, 
            string fee_unit,
            string fee_price, 
            string fee_currency_id, 
            string fee_currency_rate, 
            string fee_bak,
            string update_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq));
                lst_in.Add(new SqlParameter("@fee_update_id", update_id));
                lst_in.Add(new SqlParameter("@fee_invoice_typ", fee_invoice_typ));
                lst_in.Add(new SqlParameter("@fee_item_typ", fee_item_typ));
                lst_in.Add(new SqlParameter("@fee_number", fee_number));
                lst_in.Add(new SqlParameter("@fee_unit", fee_unit));
                lst_in.Add(new SqlParameter("@fee_price", fee_price));
                lst_in.Add(new SqlParameter("@fee_currency_id", fee_currency_id));
                lst_in.Add(new SqlParameter("@fee_currency_rate", fee_currency_rate));
                lst_in.Add(new SqlParameter("@fee_bak", fee_bak));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_update_fee_details", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;

            }
            catch (Exception)
            {

                throw;
            }
        }
        //检测是否可以更改 
        //1. 订单状态必须是od_status_id = 1 且不能提交了审核
        //2. 费用状态不能是 3以上(交账，部分核销，全部核销) 
        public int pre_test_update_fee_details_deep(string fee_seq, 
            string fee_currency_id,
            string fee_currency_rate )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq)); 
                lst_in.Add(new SqlParameter("@fee_currency_id", fee_currency_id));
                lst_in.Add(new SqlParameter("@fee_currency_rate", fee_currency_rate)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_pre_test_update_fee_details_deep", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result ;

            }
            catch (Exception)
            {

                throw;
            }
        }
        public int  pre_update_fee_details(string fee_seqs)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs)); 
             
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_pre_update_fee_details", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result ;

            }
            catch (Exception)
            {

                throw;
            }
        }
        public int  update_fee_details_of_cu_id(string fee_seqs,
            string ca_seq,
            string fee_cu_id,
            string update_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@fee_update_id", update_id));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_update_fee_details_of_cu_id", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 对冲账单 
        #region 新建
        public bool insert_hedge_off_accounts_record(
           string hoa_cu_id,
           string hoa_c_id,
           string hoa_record_id,
           string hoa_bak,
           string hoa_title, 
           ref string hoa_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hoa_cu_id", hoa_cu_id));
                lst_in.Add(new SqlParameter("@hoa_c_id", hoa_c_id));
                lst_in.Add(new SqlParameter("@hoa_record_id", hoa_record_id));
                lst_in.Add(new SqlParameter("@hoa_bak", hoa_bak));
                lst_in.Add(new SqlParameter("@hoa_title", hoa_title)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@hoa_seq", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_insert_hedge_off_accounts_record", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                hoa_seq = lst_out[1].Value.ToString();

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 插入费用 
        public int  insert_hedge_off_accounts_details(
            string hoa_seq,
            string fee_seqs )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hoa_seq", hoa_seq));
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_insert_hedge_off_accounts_details", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 移除费用
        public int delete_hedge_off_accounts_details(
            string hoa_seq,
            string fee_seqs )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hoa_seq", hoa_seq));
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_delete_hedge_off_accounts_details", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
        #region 删除 对冲账单
        public int delete_hedge_off_accounts_record(
            string hoa_seq )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hoa_seq", hoa_seq)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_delete_hedge_off_accounts_record", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion


        #region 获取销账记录
        public DataTable get_hedge_off_accounts_record(string like_str, 
            string hoa_cu_id,
            string hoa_c_id,
            string hoa_bank_dat_begin,
            string hoa_bank_dat_end,
            string hoa_record_dat_begin,
            string hoa_record_dat_end,
            string hoa_record_id ,
            string hoa_status, 
            string amc_status,
            string page,
            string rows,
            string sort,
            string ordersort,
            ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@hoa_cu_id", hoa_cu_id));
                lst_in.Add(new SqlParameter("@hoa_c_id", hoa_c_id));
                lst_in.Add(new SqlParameter("@hoa_bank_dat_begin", hoa_bank_dat_begin));
                lst_in.Add(new SqlParameter("@hoa_bank_dat_end", hoa_bank_dat_end));
                lst_in.Add(new SqlParameter("@hoa_record_dat_begin", hoa_record_dat_begin));
                lst_in.Add(new SqlParameter("@hoa_record_dat_end", hoa_record_dat_end));
                lst_in.Add(new SqlParameter("@hoa_record_id", hoa_record_id));
                lst_in.Add(new SqlParameter("@hoa_status", hoa_status));
                lst_in.Add(new SqlParameter("@amc_status", amc_status)); 
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_hedge_off_accounts_record", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_hedge_off_accounts_record_no_page( 
           string hoa_cu_id,
           string hoa_c_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                 
                lst_in.Add(new SqlParameter("@hoa_cu_id", hoa_cu_id));
                lst_in.Add(new SqlParameter("@hoa_c_id", hoa_c_id));
                
                List<SqlParameter> lst_out = null;


                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_hedge_off_accounts_record_no_page", lst_in, ref lst_out);
                
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable  get_hedge_off_accounts_record_single(
           string hoa_seq,
            string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();

                lst_in.Add(new SqlParameter("@hoa_seq", hoa_seq));
                lst_in.Add(new SqlParameter("@u_id", u_id)); 
                List<SqlParameter> lst_out = null;


                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_hedge_off_accounts_record_single", lst_in, ref lst_out);
               
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        #region 对冲销账记录明细
        #region 应收明细
        public DataTable  get_hedge_off_accounts_record_of_rec( 
            string hoa_seq,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>(); 
                lst_in.Add(new SqlParameter("@hoa_seq", hoa_seq)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_hedge_off_accounts_record_of_rec", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString(); 

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 应付明细
        public DataTable get_hedge_off_accounts_record_of_pay(
            string hoa_seq,
            ref int rowcount, 
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hoa_seq", hoa_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_hedge_off_accounts_record_of_pay", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString(); 
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 提交账单审核
        public bool  post_hedge_off_accounts(
            string hoa_seq,
            string post_by_id,
            string ap_u_id,
            string aps_order_by_id,
            string aps_id,
            ref string amc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hoa_seq", hoa_seq));
                lst_in.Add(new SqlParameter("@post_by_id", post_by_id));
                lst_in.Add(new SqlParameter("@ap_u_id", ap_u_id));
                lst_in.Add(new SqlParameter("@aps_order_by_id", aps_order_by_id));
                lst_in.Add(new SqlParameter("@aps_id", aps_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@amc_id", SqlDbType.NVarChar,40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_post_hedge_off_accounts", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                amc_id = lst_out[1].Value.ToString();

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 标记对冲完成 
        public int flag_hedge_off_accounts_finace_by_hoa_seq(
            string hoa_seq,
            string woa_bank_dat,
            string woa_bak,
            string woa_record_id,
            string woa_cu_id,
            string woa_c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@hoa_seq", hoa_seq));
                lst_in.Add(new SqlParameter("@woa_bank_dat", woa_bank_dat));
                lst_in.Add(new SqlParameter("@woa_bak", woa_bak));
                lst_in.Add(new SqlParameter("@woa_record_id", woa_record_id));
                lst_in.Add(new SqlParameter("@woa_cu_id", woa_cu_id));
                lst_in.Add(new SqlParameter("@woa_c_id", woa_c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_bus_p_flag_hedge_off_accounts_finace_by_hoa_seq", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result  ;

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
        public DataTable get_group_order_fee_of_nonca_for_bus(string c_id, 
            string rec_or_pay,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id)); 
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_group_order_fee_of_nonca_for_bus", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 所有未归账的费用明细
        public DataTable get_details_order_fee_of_nonca_for_bus(string c_id, 
            string rec_or_pay,
            string cu_id,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id)); 
                lst_in.Add(new SqlParameter("@cu_id", cu_id));

                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_details_order_fee_of_nonca_for_bus", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #region 修改对账单
        public int update_main_list_for_bus(
            string ca_title,
            string ca_group_flag,
            string ca_year,
            string ca_month,
            string ca_bak,
            string ca_create_by_id,
            string ca_seq,
            string ca_limit_dat,
            string ca_assign_flag)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@ca_title", ca_title));
                lst_in.Add(new SqlParameter("@ca_group_flag", ca_group_flag));
                lst_in.Add(new SqlParameter("@ca_year", ca_year));
                lst_in.Add(new SqlParameter("@ca_month", ca_month));
                lst_in.Add(new SqlParameter("@ca_bak", ca_bak));
                lst_in.Add(new SqlParameter("@ca_create_by_id", ca_create_by_id));
                lst_in.Add(new SqlParameter("@ca_limit_dat", ca_limit_dat));
                lst_in.Add(new SqlParameter("@ca_assign_flag", ca_assign_flag));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_update_main_list", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public int update_main_list_simple_for_bus(
            string ca_title,
            string ca_bak,
            string ca_cu_id,
            string u_id,
            string ca_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@ca_title", ca_title));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@ca_bak", ca_bak));
                lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_update_main_list_simple", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #region 发票部分 模糊查询
        public DataTable get_order_invoice_by_like_str_for_combogrid(string like_str,
            string c_id,
            string oi_cu_id,
            string page,
            string rows,
            string sort,
            string ordersort,
            ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@oi_cu_id", oi_cu_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_iv_p_get_order_invoice_by_like_str_for_combogrid", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }

        #endregion 

        #region 通过发票号，获取发票文件 
        public DataTable get_order_invoice_file(string oi_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@oi_seq", oi_seq));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_invoice_file", lst_in, ref lst_out);
              
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion 

        #region 插入发票文件  
        public bool insert_order_invoice_file(string oi_seq,
            string oi_filepath,
            string oi_filenam,
            ref string oi_file_seq)
        {
            try
            {
                //-1 错误: 账单中数据，未全部标记核销
                //-2 错误: 账单中数据，需要审核通过后才能核销

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@oi_seq", oi_seq));
                lst_in.Add(new SqlParameter("@oi_filepath", oi_filepath));
                lst_in.Add(new SqlParameter("@oi_filenam", oi_filenam));
                
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@oi_file_seq", SqlDbType.NVarChar,40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_insert_order_invoice_file", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 

        #region 获取所有开票记录
        public DataTable get_order_invoice_list(
            string like_str,
            string oi_rec_or_pay,
            string oi_c_id,
            string oi_cu_id, 
            string oi_total_money,
            string page,
            string rows,
            string sort,
            string ordersort,
            ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@oi_rec_or_pay", oi_rec_or_pay));
                lst_in.Add(new SqlParameter("@oi_c_id", oi_c_id));
                lst_in.Add(new SqlParameter("@oi_cu_id", oi_cu_id));
                lst_in.Add(new SqlParameter("@oi_total_money", oi_total_money)); 
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_iv_p_get_order_invoice_list", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable get_order_invoice_list(
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
           string ordersort,
           ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@oi_rec_or_pay", oi_rec_or_pay));
                lst_in.Add(new SqlParameter("@oi_c_id", oi_c_id));
                lst_in.Add(new SqlParameter("@oi_cu_id", oi_cu_id));
                lst_in.Add(new SqlParameter("@oi_beg_dat", oi_beg_dat));
                lst_in.Add(new SqlParameter("@oi_end_dat", oi_end_dat));

                lst_in.Add(new SqlParameter("@oi_total_money", oi_total_money));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_iv_p_get_order_invoice_list2", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 获得开票记录的费用明细
        public DataTable get_order_fee_by_oi_seq(
            string oi_seq,
            ref int rowcount,
            ref string group_fee_desc,
            ref string ca_bak)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@oi_seq", oi_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@ca_bak", SqlDbType.NVarChar, 2000);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);

                DataTable dt = ms.excuteStoredProcedureData("_iv_p_get_order_fee_by_oi_seq", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                ca_bak = lst_out[2].Value.ToString();

               
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_order_fee_for_print_by_woa_seq(
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
            ref string print_dat)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@woa_seq", woa_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                string[] out_par = { "company_desc",
                    "title",
                    "typ_title_desc",
                    "rec_or_pay_desc", 
                    "cu_desc",
                    "record_nam",
                    "record_dat",
                    "fee_group_info",
                    "bak",
                    "relation_user_info",
                    "no",
                    "flow_no",
                    "print_dat"
                     };
                foreach (string s in out_par)
                {
                    SqlParameter p = new SqlParameter(s, SqlDbType.NVarChar, 500);
                    p.Direction = ParameterDirection.Output;
                    lst_out.Add(p);
                }

                DataTable dt = ms.excuteStoredProcedureData("_iv_p_get_order_fee_for_print_by_woa_seq", lst_in, ref lst_out);

                company_desc = lst_out[0].Value.ToString();
                title = lst_out[1].Value.ToString();
                typ_title_desc = lst_out[2].Value.ToString();
                rec_or_pay_desc = lst_out[3].Value.ToString();
                cu_desc = lst_out[4].Value.ToString();
                record_nam = lst_out[5].Value.ToString();
                record_dat = lst_out[6].Value.ToString();
                fee_group_info = lst_out[7].Value.ToString();
                bak = lst_out[8].Value.ToString();
                relation_user_info = lst_out[9].Value.ToString();
                no = lst_out[10].Value.ToString();
                flow_no = lst_out[11].Value.ToString();
                print_dat = lst_out[12].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_order_fee_for_print_by_oi_seq(
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
            ref string print_dat)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@oi_seq", oi_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                string[] out_par = { "company_desc",
                    "title",
                    "typ_title_desc",
                    "rec_or_pay_desc", 
                    "cu_desc",
                    "record_nam",
                    "record_dat",
                    "fee_group_info",
                    "bak",
                    "relation_user_info",
                    "no",
                    "flow_no",
                    "print_dat"
                     };
                foreach (string s in out_par)
                {
                    SqlParameter p = new SqlParameter(s, SqlDbType.NVarChar, 500);
                    p.Direction = ParameterDirection.Output;
                    lst_out.Add(p);
                }

                DataTable dt = ms.excuteStoredProcedureData("_iv_p_get_order_fee_for_print_by_oi_seq", lst_in, ref lst_out);

                company_desc = lst_out[0].Value.ToString();
                title = lst_out[1].Value.ToString();
                typ_title_desc = lst_out[2].Value.ToString();
                rec_or_pay_desc = lst_out[3].Value.ToString();
                cu_desc = lst_out[4].Value.ToString();
                record_nam = lst_out[5].Value.ToString();
                record_dat = lst_out[6].Value.ToString();
                fee_group_info = lst_out[7].Value.ToString();
                bak = lst_out[8].Value.ToString();
                relation_user_info = lst_out[9].Value.ToString();
                no = lst_out[10].Value.ToString();
                flow_no = lst_out[11].Value.ToString();
                print_dat = lst_out[12].Value.ToString();
              
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 获取开票记录的文件 
        public DataTable get_order_invoice_file_by_oi_seq(
           string oi_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@oi_seq", oi_seq));
                List<SqlParameter> lst_out = null;


                DataTable dt = ms.excuteStoredProcedureData("_iv_p_get_order_invoice_file_by_oi_seq", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        #region 通过审批号 获取账单相关信息 
        public DataTable get_pay_checkaccount_single(string amc_id, string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_ap_p_get_pay_checkaccount_single", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 

        #region 通过审批号 获取 费用明细 
        public DataTable get_order_fee_by_amc_id_for_ap(
        string u_id,
        string amc_id,
        ref int rowcount,
        ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();

                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_order_fee_by_amc_id_for_ap", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 权限-是否可以在商务界面显示 销账按钮 
        public bool can_use_flag_finance_in_bus_page(string c_id,
           string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_can_use_flag_finance_in_bus_page", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        #region 过账且投递

        #region 过账获取信息 通过账单号和过账单位获取相应信息 
        public DataTable transfer_accountcheck(string ca_seq,
	        string trans_c_id ,
	        string trans_create_by_id , 
	        ref string trans_ca_cu_id  ,
            ref string trans_ca_cu_desc,
            ref string trans_ca_title,
            ref string trans_ca_bak,
            ref string trans_create_by_name,
            ref string trans_create_dat,
            ref string trans_group_fee_desc,
            ref string trans_old_cu_desc,
            ref string os_rec_fee_cu_id,
            ref string os_rec_fee_cu_desc,
            ref string os_pay_fee_cu_id,
            ref string os_pay_fee_cu_desc,
            ref string os_od_delegate_cu_id,
            ref string os_od_delegate_cu_desc,
            ref string os_od_operation_id,
            ref string os_od_sales_id,
            ref string os_od_record_by_id,
            ref string os_od_service_id,
            ref string os_od_bak,
            ref string trans_c_desc,
            ref string trans_ca_year,
            ref string trans_ca_month,
            ref string trans_ca_cu_checkaccount_flag,
            ref string os_rec_fee_cu_checkaccount_flag,
            ref string os_pay_fee_cu_checkaccount_flag )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@trans_c_id", trans_c_id));
                lst_in.Add(new SqlParameter("@trans_create_by_id", trans_create_by_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@trans_ca_cu_id", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@trans_ca_cu_desc", SqlDbType.NVarChar,200);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                SqlParameter p3 = new SqlParameter("@trans_ca_title", SqlDbType.NVarChar,200);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);
                SqlParameter p4 = new SqlParameter("@trans_ca_bak", SqlDbType.NVarChar,500);
                p4.Direction = ParameterDirection.Output;
                lst_out.Add(p4);
                SqlParameter p5 = new SqlParameter("@trans_create_by_name", SqlDbType.NVarChar,50);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5);
                SqlParameter p6 = new SqlParameter("@trans_create_dat", SqlDbType.NVarChar,50);
                p6.Direction = ParameterDirection.Output;
                lst_out.Add(p6);
                SqlParameter p7 = new SqlParameter("@trans_group_fee_desc", SqlDbType.NVarChar,2000);
                p7.Direction = ParameterDirection.Output;
                lst_out.Add(p7);
                SqlParameter p8 = new SqlParameter("@trans_old_cu_desc", SqlDbType.NVarChar,200);
                p8.Direction = ParameterDirection.Output;
                lst_out.Add(p8);
                SqlParameter p9 = new SqlParameter("@os_rec_fee_cu_id", SqlDbType.Int);
                p9.Direction = ParameterDirection.Output;
                lst_out.Add(p9);
                SqlParameter p10 = new SqlParameter("@os_rec_fee_cu_desc", SqlDbType.NVarChar,200);
                p10.Direction = ParameterDirection.Output;
                lst_out.Add(p10);
                SqlParameter p11 = new SqlParameter("@os_pay_fee_cu_id", SqlDbType.Int);
                p11.Direction = ParameterDirection.Output;
                lst_out.Add(p11);
                SqlParameter p12 = new SqlParameter("@os_pay_fee_cu_desc", SqlDbType.NVarChar,200);
                p12.Direction = ParameterDirection.Output;
                lst_out.Add(p12);
                SqlParameter p13 = new SqlParameter("@os_od_delegate_cu_id", SqlDbType.Int);
                p13.Direction = ParameterDirection.Output;
                lst_out.Add(p13);
                SqlParameter p14 = new SqlParameter("@os_od_delegate_cu_desc", SqlDbType.NVarChar,200);
                p14.Direction = ParameterDirection.Output;
                lst_out.Add(p14);
                SqlParameter p15 = new SqlParameter("@os_od_operation_id", SqlDbType.Int);
                p15.Direction = ParameterDirection.Output;
                lst_out.Add(p15);
                SqlParameter p16 = new SqlParameter("@os_od_sales_id", SqlDbType.Int);
                p16.Direction = ParameterDirection.Output;
                lst_out.Add(p16);
                SqlParameter p17 = new SqlParameter("@os_od_record_by_id", SqlDbType.Int);
                p17.Direction = ParameterDirection.Output;
                lst_out.Add(p17);
                SqlParameter p18 = new SqlParameter("@os_od_service_id", SqlDbType.Int);
                p18.Direction = ParameterDirection.Output;
                lst_out.Add(p18);
                SqlParameter p19 = new SqlParameter("@os_od_bak", SqlDbType.NVarChar,500);
                p19.Direction = ParameterDirection.Output;
                lst_out.Add(p19);
                SqlParameter p20 = new SqlParameter("@trans_c_desc", SqlDbType.NVarChar, 200);
                p20.Direction = ParameterDirection.Output;
                lst_out.Add(p20);
                SqlParameter p21 = new SqlParameter("@trans_ca_year", SqlDbType.Int);
                p21.Direction = ParameterDirection.Output;
                lst_out.Add(p21);
                SqlParameter p22 = new SqlParameter("@trans_ca_month", SqlDbType.Int);
                p22.Direction = ParameterDirection.Output;
                lst_out.Add(p22);
                SqlParameter p23 = new SqlParameter("@trans_ca_cu_checkaccount_flag", SqlDbType.Int);
                p23.Direction = ParameterDirection.Output;
                lst_out.Add(p23);
                SqlParameter p24 = new SqlParameter("@os_rec_fee_cu_checkaccount_flag", SqlDbType.Int);
                p24.Direction = ParameterDirection.Output;
                lst_out.Add(p24);
                SqlParameter p25 = new SqlParameter("@os_pay_fee_cu_checkaccount_flag", SqlDbType.Int);
                p25.Direction = ParameterDirection.Output;
                lst_out.Add(p25);

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_transfer_accountcheck", lst_in, ref lst_out);

                trans_ca_cu_id = Convert.IsDBNull(lst_out[0].Value) ? string.Empty : lst_out[0].Value.ToString();
                trans_ca_cu_desc = Convert.IsDBNull(lst_out[1].Value) ? string.Empty : lst_out[1].Value.ToString();
                trans_ca_title = Convert.IsDBNull(lst_out[2].Value) ? string.Empty : lst_out[2].Value.ToString();
                trans_ca_bak = Convert.IsDBNull(lst_out[3].Value) ? string.Empty : lst_out[3].Value.ToString();
                trans_create_by_name = Convert.IsDBNull(lst_out[4].Value) ? string.Empty : lst_out[4].Value.ToString();
                trans_create_dat = Convert.IsDBNull(lst_out[5].Value) ? string.Empty : lst_out[5].Value.ToString();
                trans_group_fee_desc = Convert.IsDBNull(lst_out[6].Value) ? string.Empty : lst_out[6].Value.ToString();
                trans_old_cu_desc = Convert.IsDBNull(lst_out[7].Value) ? string.Empty : lst_out[7].Value.ToString();
                os_rec_fee_cu_id = Convert.IsDBNull(lst_out[8].Value) ? string.Empty : lst_out[8].Value.ToString();
                os_rec_fee_cu_desc = Convert.IsDBNull(lst_out[9].Value) ? string.Empty : lst_out[9].Value.ToString();
                os_pay_fee_cu_id = Convert.IsDBNull(lst_out[10].Value) ? string.Empty : lst_out[10].Value.ToString();
                os_pay_fee_cu_desc = Convert.IsDBNull(lst_out[11].Value) ? string.Empty : lst_out[11].Value.ToString();
                os_od_delegate_cu_id = Convert.IsDBNull(lst_out[12].Value) ? string.Empty : lst_out[12].Value.ToString();
                os_od_delegate_cu_desc = Convert.IsDBNull(lst_out[13].Value) ? string.Empty : lst_out[13].Value.ToString();
                os_od_operation_id = Convert.IsDBNull(lst_out[14].Value) ? string.Empty : lst_out[14].Value.ToString();
                os_od_sales_id = Convert.IsDBNull(lst_out[15].Value) ? string.Empty : lst_out[15].Value.ToString();
                os_od_record_by_id = Convert.IsDBNull(lst_out[16].Value) ? string.Empty : lst_out[16].Value.ToString();
                os_od_service_id = Convert.IsDBNull(lst_out[17].Value) ? string.Empty : lst_out[17].Value.ToString();
                os_od_bak = Convert.IsDBNull(lst_out[18].Value) ? string.Empty : lst_out[18].Value.ToString();
                trans_c_desc = Convert.IsDBNull(lst_out[19].Value) ? string.Empty : lst_out[19].Value.ToString();
                trans_ca_year = Convert.IsDBNull(lst_out[20].Value) ? string.Empty : lst_out[20].Value.ToString();
                trans_ca_month = Convert.IsDBNull(lst_out[21].Value) ? string.Empty : lst_out[21].Value.ToString();
                trans_ca_cu_checkaccount_flag = Convert.IsDBNull(lst_out[22].Value) ? string.Empty : lst_out[22].Value.ToString();
                os_rec_fee_cu_checkaccount_flag = Convert.IsDBNull(lst_out[23].Value) ? string.Empty : lst_out[23].Value.ToString();
                os_pay_fee_cu_checkaccount_flag = Convert.IsDBNull(lst_out[24].Value) ? string.Empty : lst_out[24].Value.ToString();
                return dt;
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
            string od_service_cu_id ,
            ref string od_seq,
            ref string od_no,
            ref string od_service_seq,
            ref string od_service_sub_seq 
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@res_ca_seq", res_ca_seq));  
                lst_in.Add(new SqlParameter("@od_delegate_cu_id", od_delegate_cu_id));
                lst_in.Add(new SqlParameter("@od_record_by_id", od_record_by_id));
                lst_in.Add(new SqlParameter("@od_operation_id", od_operation_id));
                lst_in.Add(new SqlParameter("@od_service_id", od_service_id));
                lst_in.Add(new SqlParameter("@od_sales_id", od_sales_id));
                lst_in.Add(new SqlParameter("@od_bak_delegate", od_bak_delegate));
                lst_in.Add(new SqlParameter("@od_record_by_company_id", od_record_by_company_id));
                lst_in.Add(new SqlParameter("@od_service_cu_id", od_service_cu_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@od_seq", SqlDbType.NVarChar,40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                SqlParameter p3 = new SqlParameter("@od_no", SqlDbType.NVarChar,40);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);
                SqlParameter p4 = new SqlParameter("@od_service_seq", SqlDbType.NVarChar,40);
                p4.Direction = ParameterDirection.Output;
                lst_out.Add(p4);
                SqlParameter p5 = new SqlParameter("@od_service_sub_seq", SqlDbType.NVarChar,40);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_transfer_order", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                od_seq = lst_out[1].Value.ToString();
                od_no = lst_out[2].Value.ToString();
                od_service_seq = lst_out[3].Value.ToString();
                od_service_sub_seq = lst_out[4].Value.ToString();


                return result > 0;

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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seq", ca_seq));
                lst_in.Add(new SqlParameter("@ca_cu_id", ca_cu_id));
                lst_in.Add(new SqlParameter("@ca_title", ca_title));
                lst_in.Add(new SqlParameter("@ca_bak", ca_bak)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
               

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_update_main_list_for_transfer", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
 
                return result > 0;

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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@res_ca_seq", res_ca_seq));
                lst_in.Add(new SqlParameter("@trans_rec_ca_seq", trans_rec_ca_seq));
                lst_in.Add(new SqlParameter("@trans_pay_ca_seq", trans_pay_ca_seq));
                 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_ca_p_bind_transfer", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@res_ca_seq", res_ca_seq));
                lst_in.Add(new SqlParameter("@res_fee_seq", res_fee_seq));
                lst_in.Add(new SqlParameter("@trans_ca_seq", trans_ca_seq));
                lst_in.Add(new SqlParameter("@trans_fee_seq", trans_fee_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_ca_p_bind_transfer_fee", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 判定是否可以删除账单 
        public int judge_giveback_checkaccount(string ca_seqs,
           ref string msg 
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_seqs", ca_seqs)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@msg", SqlDbType.NVarChar,2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_judge_giveback_checkaccount", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                msg = lst_out[1].Value.ToString();

                return result ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #endregion

        #region 统计查询
        public DataTable  get_group_details_of_operation(string c_id,
            string u_id,
            string fee_beg_dat,
            string fee_end_dat)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@fee_beg_dat", fee_beg_dat));
                lst_in.Add(new SqlParameter("@fee_end_dat", fee_end_dat));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_ca_p_get_group_details_of_operation", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
    }
}
