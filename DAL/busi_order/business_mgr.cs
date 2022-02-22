using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;

namespace DAL.busi
{
    public class business_mgr
    {
        msSqlHelper ms = null;
        public business_mgr()
        {
            ms = new msSqlHelper();
        }

        #region 业务查询
        #region 获取业务列表
        public DataTable get_business_list(
            string like_str,
            string cpy_id,
            string bd_trade,
            string bd_state,
            string bd_custom_id,

            string page,
            string rows,
            string sort,
            string order,
            ref int rowcount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@company_id", cpy_id));
                lst_in.Add(new SqlParameter("@bd_trade", bd_trade));
                lst_in.Add(new SqlParameter("@bd_state", bd_state));
                lst_in.Add(new SqlParameter("@bd_custom_id", bd_custom_id));

                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@order", order));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@rowcount", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取业务查询包含的客户列表下拉
        public DataTable get_business_custom()
        {
            try
            {
                List<SqlParameter> lst_in = null;
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_custom", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion
        


        #region 获取业务列表，模拟填写
        public DataTable get_business_list_for_select(
            string like_str,
            string create_uid,
            string query_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@create_uid", create_uid));
                lst_in.Add(new SqlParameter("@query_id", query_id));

                List<SqlParameter> lst_out = null;
             

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_for_select", lst_in, ref lst_out);
                
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取费用列表，模拟填写
        public DataTable get_fee_list_for_select(
            string like_str,
            string fee_type,
            string bf_fee_rp)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@fee_type", fee_type));
                lst_in.Add(new SqlParameter("@bf_fee_rp", bf_fee_rp));

                List<SqlParameter> lst_out = null;


                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_fee_for_select", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion



        #region 新增业务审批申请
        public bool insert_business_ap(string baa_busid, string baa_sponsor)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@baa_busid", baa_busid));
                lst_in.Add(new SqlParameter("@baa_sponsor", baa_sponsor));
             
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bal_insert_business_apply", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增/更新业务
        public bool insert_update_business(string bd_std_id, string bd_cpy_id, string bd_ie, string bd_pr_id, string bd_pt_id, string bd_client, string bd_unit, string bd_custom_no, string bd_custom_from, string bd_trust_date, string bd_busi_date, string bd_remarks,string state)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@bd_cpy_id", bd_cpy_id));
                lst_in.Add(new SqlParameter("@bd_ie", bd_ie));
                lst_in.Add(new SqlParameter("@bd_pr_id", bd_pr_id));
                lst_in.Add(new SqlParameter("@bd_pt_id", bd_pt_id));
                lst_in.Add(new SqlParameter("@bd_client", bd_client));
                lst_in.Add(new SqlParameter("@bd_unit", bd_unit));
                lst_in.Add(new SqlParameter("@bd_custom_no", bd_custom_no));
                lst_in.Add(new SqlParameter("@bd_custom_from", bd_custom_from));
                lst_in.Add(new SqlParameter("@bd_trust_date", bd_trust_date));
                lst_in.Add(new SqlParameter("@bd_busi_date", bd_busi_date));
                lst_in.Add(new SqlParameter("@bd_remarks", bd_remarks));
                lst_in.Add(new SqlParameter("@bd_state", state));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_update_business", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion


        #region 货物增改
        public bool insert_update_business_cargo(string bd_std_id, string bc_ca_id, string bc_pa_id, string bc_number, string bc_weight, string bc_volume)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bc_bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@bc_ca_id", bc_ca_id));
                lst_in.Add(new SqlParameter("@bc_pa_id", bc_pa_id));
                lst_in.Add(new SqlParameter("@bc_number", bc_number));
                lst_in.Add(new SqlParameter("@bc_weight", bc_weight));
                lst_in.Add(new SqlParameter("@bc_volume", bc_volume));


                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_update_business_cargo", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 提单增改
        public bool insert_update_business_bill(string bd_std_id, string bl_main_no, string bl_no, string bl_type, string bl_sign_mode)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bl_bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@bl_main_no", bl_main_no));
                lst_in.Add(new SqlParameter("@bl_no", bl_no));
                lst_in.Add(new SqlParameter("@bl_type", bl_type));
                lst_in.Add(new SqlParameter("@bl_sign_mode", bl_sign_mode));



                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_update_business_bill", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 业务详情增改
        public bool insert_update_business_details(string bd_std_id, string bs_bill_no, string bs_transport_typ, string bs_trade_typ, string bs_ermodal, string bs_operation, string bs_route, string bs_pack_method, string bs_dlects_method, string bs_pay_method, string bs_box_size, string bs_booking_agent, string bs_ship_type, string bs_shipper, string bs_consignee, string bs_notify, string bs_cargo_desc, string bs_lable, string bs_start_port, string bs_end_port, string bs_transfer_port, string bs_destination, string bs_saler, string bs_operationer, string bs_servicer)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bs_bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@bs_bill_no", bs_bill_no));
                lst_in.Add(new SqlParameter("@bs_transport_typ", bs_transport_typ));
                lst_in.Add(new SqlParameter("@bs_trade_typ", bs_trade_typ));
                lst_in.Add(new SqlParameter("@bs_intermodal", bs_ermodal));
                lst_in.Add(new SqlParameter("@bs_operation", bs_operation));
                lst_in.Add(new SqlParameter("@bs_route", bs_route));
                lst_in.Add(new SqlParameter("@bs_pack_method", bs_pack_method));
                lst_in.Add(new SqlParameter("@bs_dlects_method", bs_dlects_method));
                lst_in.Add(new SqlParameter("@bs_pay_method", bs_pay_method));


                lst_in.Add(new SqlParameter("@bs_box_size", bs_box_size));
                lst_in.Add(new SqlParameter("@bs_booking_agent", bs_booking_agent));
                lst_in.Add(new SqlParameter("@bs_ship_type", bs_ship_type));
                lst_in.Add(new SqlParameter("@bs_shipper", bs_shipper));
                lst_in.Add(new SqlParameter("@bs_consignee", bs_consignee));
                lst_in.Add(new SqlParameter("@bs_notify", bs_notify));
                lst_in.Add(new SqlParameter("@bs_cargo_desc", bs_cargo_desc));
                lst_in.Add(new SqlParameter("@bs_lable", bs_lable));
                lst_in.Add(new SqlParameter("@bs_start_port", bs_start_port));
                lst_in.Add(new SqlParameter("@bs_end_port", bs_end_port));
                lst_in.Add(new SqlParameter("@bs_transfer_port", bs_transfer_port));
                lst_in.Add(new SqlParameter("@bs_destination", bs_destination));
                lst_in.Add(new SqlParameter("@bs_saler", bs_saler));
                lst_in.Add(new SqlParameter("@bs_operationer", bs_operationer));
                lst_in.Add(new SqlParameter("@bs_servicer", bs_servicer));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_update_business_details", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion


        #region 铁路
        public bool insert_update_business_railway(string bd_std_id, string bry_s_stid, string bry_e_stid, string bry_ETD, string bry_ETA, string bry_ATD, string bry_ATA, string bry_train_num, string bry_cu_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bry_bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@bry_s_stid", bry_s_stid));
                lst_in.Add(new SqlParameter("@bry_e_stid", bry_e_stid));
                lst_in.Add(new SqlParameter("@bry_ETD", bry_ETD));
                lst_in.Add(new SqlParameter("@bry_ETA", bry_ETA));
                lst_in.Add(new SqlParameter("@bry_ATD", bry_ATD));
                lst_in.Add(new SqlParameter("@bry_ATA", bry_ATA));
                lst_in.Add(new SqlParameter("@bry_train_num", bry_train_num));
                lst_in.Add(new SqlParameter("@bry_cu_id", bry_cu_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_update_business_railway", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 江海运
        public bool insert_update_business_river_shipping(string bd_std_id,
            string brs_type,
            string brs_shipowner,
            string brs_name_voyage,
            string brs_ETD,
            string brs_ETA,
            string brs_ATD,
            string brs_ATA,
            string brs_load_port,
            string brs_disc_port,
            string brs_disc_area)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@brs_bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@brs_type", brs_type));
                lst_in.Add(new SqlParameter("@brs_shipowner", brs_shipowner));
                lst_in.Add(new SqlParameter("@brs_name_voyage", brs_name_voyage));
                lst_in.Add(new SqlParameter("@brs_ETD", brs_ETD));
                lst_in.Add(new SqlParameter("@brs_ETA", brs_ETA));
                lst_in.Add(new SqlParameter("@brs_ATD", brs_ATD));
                lst_in.Add(new SqlParameter("@brs_ATA", brs_ATA));
                lst_in.Add(new SqlParameter("@brs_load_port", brs_load_port));
                lst_in.Add(new SqlParameter("@brs_disc_port", brs_disc_port));
                lst_in.Add(new SqlParameter("@brs_disc_area", brs_disc_area));
                

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_update_business_river_shipping", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 根据业务id获取业务信息
        public DataTable get_business_form_id(string bd_std_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bd_std_id", bd_std_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_form_id", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 根据业务id获取货物信息
        public DataTable get_business_cargo_form_id(string bd_std_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bd_std_id", bd_std_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_cargo_form_id", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 根据业务id获取提单信息
        public DataTable get_business_bill_form_id(string bd_std_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bd_std_id", bd_std_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_bill_form_id", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 根据业务id获取详情信息
        public DataTable get_business_details_form_id(string bd_std_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bd_std_id", bd_std_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_details_form_id", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }

        }
        #endregion



        #region 根据业务id获取集装箱信息
        public DataTable get_boxinfo(string bd_std_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bc_bd_std_id", bd_std_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_box_form_id", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 根据业务id获取费用应收/应付金额信息
        public DataTable get_business_fee_statistics(string bd_std_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bc_bd_std_id", bd_std_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_fee_statistics_form_id", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 根据业务id获取费用应收/应付信息
        public DataTable get_business_fee(string bd_std_id, string fee_rp)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@bf_fee_rp", fee_rp));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_fee_form_id", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增应收应付费用
        public bool insert_update_business_fee_rp(string bf_id,
            string bd_std_id,
            string bf_fee_rp,
            string bf_cu_id,
            string bf_fee_ty,
            string bf_tax_ty,
            string bf_price,
            string bf_number,
            string bf_unit,
            string bf_cr_id,
            string bf_rate,
            string bf_rrmb,
            string bf_in_id,
            string bf_taxes,
            string bf_etax_amount,
            string bf_input_name)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bf_id", bf_id));
                lst_in.Add(new SqlParameter("@bf_bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@bf_fee_rp", bf_fee_rp));
                lst_in.Add(new SqlParameter("@bf_cu_id", bf_cu_id));
                lst_in.Add(new SqlParameter("@bf_fee_ty", bf_fee_ty));
                lst_in.Add(new SqlParameter("@bf_tax_ty", bf_tax_ty));
                lst_in.Add(new SqlParameter("@bf_price", bf_price));
                lst_in.Add(new SqlParameter("@bf_number", bf_number));
                lst_in.Add(new SqlParameter("@bf_unit", bf_unit));
                lst_in.Add(new SqlParameter("@bf_cr_id", bf_cr_id));
                lst_in.Add(new SqlParameter("@bf_rate", bf_rate));
                lst_in.Add(new SqlParameter("@bf_rrmb", bf_rrmb));
                lst_in.Add(new SqlParameter("@bf_in_id", bf_in_id));
                lst_in.Add(new SqlParameter("@bf_taxes", bf_taxes));
                lst_in.Add(new SqlParameter("@bf_etax_amount", bf_etax_amount));
                lst_in.Add(new SqlParameter("@bf_input_name", bf_input_name));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_update_business_fee", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增费用统计
        public bool insert_business_fee_statistics(string bd_std_id,
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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bfs_bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@bfs_get_money", bfs_get_money));
                lst_in.Add(new SqlParameter("@bfs_pay_money", bfs_pay_money));
                lst_in.Add(new SqlParameter("@bfs_get_after_tax", bfs_get_after_tax));
                lst_in.Add(new SqlParameter("@bfs_pay_after_tax", bfs_pay_after_tax));
                lst_in.Add(new SqlParameter("@bfs_profit", bfs_profit));
                lst_in.Add(new SqlParameter("@bfs_after_profit", bfs_after_profit));
                lst_in.Add(new SqlParameter("@bfs_interest_rate", bfs_interest_rate));
                lst_in.Add(new SqlParameter("@bfs_remarks", bfs_remarks));


                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_business_fee_statistics", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion


        #region 删除费用
        public bool delete_fee_rp(string bf_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bf_id", bf_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_delete_business_fee", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增业务id的装箱信息
        public bool insert_business_container(string bd_std_id, string bc_size, string bc_typ, string bc_no, string bc_ship_fno, string bc_sea_fno, string bc_sum, string bc_weight,string bc_volume)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bc_bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@bc_size", bc_size));
                lst_in.Add(new SqlParameter("@bc_typ", bc_typ));
                lst_in.Add(new SqlParameter("@bc_num", 1));
                lst_in.Add(new SqlParameter("@bc_no", bc_no));
                lst_in.Add(new SqlParameter("@bc_ship_fno", bc_ship_fno));
                lst_in.Add(new SqlParameter("@bc_sea_fno", bc_sea_fno));
                lst_in.Add(new SqlParameter("@bc_sum", bc_sum));
                lst_in.Add(new SqlParameter("@bc_weight", bc_weight));
                lst_in.Add(new SqlParameter("@bc_volume", bc_volume));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_business_container", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 删除业务id的装箱信息
        public bool delete_packing_from_id(string bd_std_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bd_std_id", bd_std_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_delete_packing_from_id", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 更新箱型箱量
        public bool update_box_size_num(string bd_std_id, string box_size_num)
        {
            try
            {

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@bd_std_id", bd_std_id));
                lst_in.Add(new SqlParameter("@box_size_num", box_size_num));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_update_box_size_num", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增业务主表
        public DataTable insert_business_main(string trade, string busi_type, string create_name, ref string busi_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@trade", trade));
                lst_in.Add(new SqlParameter("@busi_type", busi_type));
                lst_in.Add(new SqlParameter("@create_name", create_name));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@busi_id", SqlDbType.NVarChar, 20);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_insert_business_main", lst_in, ref lst_out);
                busi_id = lst_out[0].Value.ToString();
                return dt;

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 修改业务主表
        public bool update_business_main(string busi_id, string trade, string busi_type, string create_name)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@busi_id", busi_id));
                lst_in.Add(new SqlParameter("@trade", trade));
                lst_in.Add(new SqlParameter("@busi_type", busi_type));
                lst_in.Add(new SqlParameter("@create_name", create_name));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_update_business_main", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion



        #region 获取主表信息
        public DataTable get_business_main_form_id(string busi_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@busi_id", busi_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_main_form_id", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取江海运信息
        public DataTable get_business_river_shipping_form_id(string busi_id, string type)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@busi_id", busi_id));
                lst_in.Add(new SqlParameter("@type", type));


                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_river_shipping_form_id", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取铁路信息
        public DataTable get_business_railway_form_id(string busi_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@busi_id", busi_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_business_railway_form_id", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }

        }
        #endregion  

        #region 更新业务状态
        public bool update_business_state(string busi_ids, string bd_state)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@busi_ids", busi_ids));
                lst_in.Add(new SqlParameter("@bd_state", bd_state));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_update_business_state", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 作废业务
        public bool nullify_business(string busi_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@busi_id", busi_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bn_nullify_business", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception e)
            {
                
                throw;
            }
        }
        #endregion

        #region 获取订舱委托书需要的数据，根据业务id
        public DataTable get_date_for_shipping_note(string busi_no)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@busi_no", busi_no));
              
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bn_get_date_for_shipping_note", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        
        #endregion

        #region 返回港口模糊查询的全称
        public bool port_like_filter(string like_q, ref string return_q)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_q", like_q));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                SqlParameter p2 = new SqlParameter("@return_q", SqlDbType.NVarChar,20);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bn_port_like_filter", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return_q = lst_out[1].Value.ToString(); ;
                return result > 0;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion
       
    }
       
    
}
