using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;
namespace DAL.busi_order
{
    public class dal_busi_order
    {
        msSqlHelper ms = null;

        public dal_busi_order()
        {
            ms = new msSqlHelper();
        }

        
        #region 分页查询
        public DataTable get_order_list(string like_str,
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
            string ordersort,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@od_typ", od_typ));
                lst_in.Add(new SqlParameter("@od_status_id", od_status_id));
                lst_in.Add(new SqlParameter("@od_project_typ", od_project_typ));
                lst_in.Add(new SqlParameter("@od_cargo_agent_cu_id", od_cargo_agent_cu_id));
                lst_in.Add(new SqlParameter("@od_delegate_cu_id", od_delegate_cu_id));
                lst_in.Add(new SqlParameter("@od_box_typ_id", od_box_typ_id));
                lst_in.Add(new SqlParameter("@od_beg_fee_dat", od_beg_fee_dat));
                lst_in.Add(new SqlParameter("@od_end_fee_dat", od_end_fee_dat));
                lst_in.Add(new SqlParameter("@od_service_id", od_service_id));

                lst_in.Add(new SqlParameter("@od_record_by_company_id", od_record_by_company_id));
                lst_in.Add(new SqlParameter("@od_trade_typ_id", od_trade_typ_id));
             
                lst_in.Add(new SqlParameter("@od_bill_nos", od_bill_nos));
                lst_in.Add(new SqlParameter("@od_cntr_nos", od_cntr_nos));
                lst_in.Add(new SqlParameter("@od_route_tools_desc", od_route_tools_desc));
                lst_in.Add(new SqlParameter("@od_route_tools_no", od_route_tools_no));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@od_water_way_flag", od_water_way_flag));
                lst_in.Add(new SqlParameter("@od_sub_way_flag", od_sub_way_flag));
                lst_in.Add(new SqlParameter("@od_road_way_flag", od_road_way_flag));
                lst_in.Add(new SqlParameter("@od_air_way_flag", od_air_way_flag)); 

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

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_list", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public DataTable  get_order_list_include_min_profit(string like_str,
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
            string ordersort,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@od_typ", od_typ));
                lst_in.Add(new SqlParameter("@od_status_id", od_status_id));
                lst_in.Add(new SqlParameter("@od_project_typ", od_project_typ));
                lst_in.Add(new SqlParameter("@od_cargo_agent_cu_id", od_cargo_agent_cu_id));
                lst_in.Add(new SqlParameter("@od_delegate_cu_id", od_delegate_cu_id));
                lst_in.Add(new SqlParameter("@od_box_typ_id", od_box_typ_id));
                lst_in.Add(new SqlParameter("@od_beg_fee_dat", od_beg_fee_dat));
                lst_in.Add(new SqlParameter("@od_end_fee_dat", od_end_fee_dat));
                lst_in.Add(new SqlParameter("@od_service_id", od_service_id));

                lst_in.Add(new SqlParameter("@od_record_by_company_id", od_record_by_company_id));
                lst_in.Add(new SqlParameter("@od_trade_typ_id", od_trade_typ_id));

                lst_in.Add(new SqlParameter("@od_bill_nos", od_bill_nos));
                lst_in.Add(new SqlParameter("@od_cntr_nos", od_cntr_nos));
                lst_in.Add(new SqlParameter("@od_route_tools_desc", od_route_tools_desc));
                lst_in.Add(new SqlParameter("@od_route_tools_no", od_route_tools_no));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@od_water_way_flag", od_water_way_flag));
                lst_in.Add(new SqlParameter("@od_sub_way_flag", od_sub_way_flag));
                lst_in.Add(new SqlParameter("@od_road_way_flag", od_road_way_flag));
                lst_in.Add(new SqlParameter("@od_air_way_flag", od_air_way_flag));
                lst_in.Add(new SqlParameter("@od_min_profit", od_min_profit));

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

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_list_include_min_profit", lst_in, ref lst_out);
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

        #region 费用查询
        public DataTable get_order_fee(string c_id, 
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
            string ordersort,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id)); 
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
                lst_in.Add(new SqlParameter("@fee_record_id", fee_record_id));
                lst_in.Add(new SqlParameter("@fee_guess_amount", fee_guess_amount));
                lst_in.Add(new SqlParameter("@fee_invoice_lock_flag", fee_invoice_lock_flag));
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
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_fee", lst_in, ref lst_out);
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
            string fee_guess_amount ,
            ref int rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
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
                lst_in.Add(new SqlParameter("@fee_record_id", fee_record_id));
                lst_in.Add(new SqlParameter("@fee_guess_amount", fee_guess_amount));
                lst_in.Add(new SqlParameter("@fee_invoice_lock_flag", fee_invoice_lock_flag));
       
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_fee_all", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable  get_order_fee_group_of_unwoa_and_commit( 
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
            string ordersort,
            ref int rowcount,
            ref double rec_total_amount,
            ref double pay_total_amount,
            ref double unreced_total_amount,
            ref double unpayed_total_amount,
            ref double reced_total_amount,
            ref double payed_total_amount)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@record_id", record_id));
                lst_in.Add(new SqlParameter("@sales_id", sales_id));
                lst_in.Add(new SqlParameter("@service_id", service_id));
                lst_in.Add(new SqlParameter("@operation_id", operation_id));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@fee_dat_begin_year", fee_dat_begin_year));
                lst_in.Add(new SqlParameter("@fee_dat_begin_month", fee_dat_begin_month));
                lst_in.Add(new SqlParameter("@fee_dat_end_year", fee_dat_end_year));
                lst_in.Add(new SqlParameter("@fee_dat_end_month", fee_dat_end_month));
                lst_in.Add(new SqlParameter("@woa_flag", woa_flag));
                lst_in.Add(new SqlParameter("@invoice_flag", invoice_flag));
                lst_in.Add(new SqlParameter("@record_invoice_flag", record_invoice_flag));
                lst_in.Add(new SqlParameter("@limit_fee_dat_flag", limit_fee_dat_flag));
                lst_in.Add(new SqlParameter("@approval_flag", approval_flag));

                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                SqlParameter p2 = new SqlParameter("@rec_total_amount", SqlDbType.Money);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@pay_total_amount", SqlDbType.Int);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);

                SqlParameter p4 = new SqlParameter("@unreced_total_amount", SqlDbType.Int);
                p4.Direction = ParameterDirection.Output;
                lst_out.Add(p4);

                SqlParameter p5 = new SqlParameter("@unpayed_total_amount", SqlDbType.Int);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5);

                SqlParameter p6 = new SqlParameter("@reced_total_amount", SqlDbType.Int);
                p6.Direction = ParameterDirection.Output;
                lst_out.Add(p6);

                SqlParameter p7 = new SqlParameter("@payed_total_amount", SqlDbType.Int);
                p7.Direction = ParameterDirection.Output;
                lst_out.Add(p7);
                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_fee_group_of_unwoa_and_commit", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                rec_total_amount = Convert.ToDouble(lst_out[1].Value);
                pay_total_amount = Convert.ToDouble(lst_out[2].Value);
                unreced_total_amount = Convert.ToDouble(lst_out[3].Value);
                unpayed_total_amount = Convert.ToDouble(lst_out[4].Value);
                reced_total_amount = Convert.ToDouble(lst_out[5].Value);
                payed_total_amount = Convert.ToDouble(lst_out[6].Value);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion  
        
        #region 强制锁单 
        public bool force_close_order(
            string od_seq,
            string lock_u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@lock_u_id", lock_u_id)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_force_close_order", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 人工成本运算 

        #region 计算
        public DataTable pre_computer_fee_of_handcost(
            string c_id,
            string od_seqs,
            string fee_cu_id,
            string fee_item_typ,
            string fee_unit,
            string fee_bak,
            string fee_record_id,
            string fee_invoice_typ,
            string total_hand_cost,
            ref bool result)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@od_seqs", od_seqs));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@fee_item_typ", fee_item_typ));
                lst_in.Add(new SqlParameter("@fee_unit", fee_unit));
                lst_in.Add(new SqlParameter("@fee_bak", fee_bak));
                lst_in.Add(new SqlParameter("@fee_record_id", fee_record_id));
                lst_in.Add(new SqlParameter("@fee_invoice_typ", fee_invoice_typ));
                lst_in.Add(new SqlParameter("@total_hand_cost", total_hand_cost));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_pre_computer_fee_of_handcost", lst_in, ref lst_out);
                int result1 = Convert.ToInt32(lst_out[0].Value);

                result = result1 > 0;

                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
        #region 删除费用
        public bool delete_fee_details( 
            string fee_seqs,
            string fee_update_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                lst_in.Add(new SqlParameter("@update_by_id", fee_update_id)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_delete_fee_details", lst_in, ref lst_out);
                int result1 = Convert.ToInt32(lst_out[0].Value);
 
                return result1 > 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 得到费用
        public DataTable get_order_fee_by_fee_seqs(
            string fee_seqs,
            ref string rowcount,
            ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                List<SqlParameter> lst_out = new List<SqlParameter>();



                SqlParameter p2 = new SqlParameter("@rowcount", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);

                DataTable dt = ms.excuteStoredProcedureData("_bus_p_get_order_fee_by_fee_seqs", lst_in, ref lst_out);

                rowcount = lst_out[0].Value.ToString();
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
    }
}
