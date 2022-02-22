using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;

namespace DAL.order
{
    public class dal_order
    {
        msSqlHelper ms = null;

        public dal_order()
        {
            ms = new msSqlHelper();
        }

        #region 业务订单

        #region 订单查询
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
            //string include_all_service,
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
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@od_bill_nos", od_bill_nos));
                lst_in.Add(new SqlParameter("@od_cntr_nos", od_cntr_nos));
                lst_in.Add(new SqlParameter("@od_route_tools_desc", od_route_tools_desc));
                lst_in.Add(new SqlParameter("@od_route_tools_no", od_route_tools_no));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@od_water_way_flag", od_water_way_flag));
                lst_in.Add(new SqlParameter("@od_sub_way_flag", od_sub_way_flag));
                lst_in.Add(new SqlParameter("@od_road_way_flag", od_road_way_flag));
                lst_in.Add(new SqlParameter("@od_air_way_flag", od_air_way_flag));
                //lst_in.Add(new SqlParameter("@include_all_service", include_all_service));
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

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_list", lst_in, ref lst_out);
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

        #region 单个订单查询
        #region 订单基本信息和货物资料 
        public DataTable  get_order_single(string od_seq,
            string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_single", lst_in, ref lst_out);
                 
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 订单 箱量
        public DataTable get_cntr_group(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq)); 
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_cntr_group", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        
        //2021-7-9 
        #region 获取 订单集装箱
        public DataTable get_order_cntr(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_cntr", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 订舱单信息
        public DataTable get_order_booking_note(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_booking_note", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 服务商 
        public DataTable get_service(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_service", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
 
        #region 获取 服务的 批次
        public DataTable get_service_sub(string od_seq,string od_service_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_service_sub", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 服务批次 详情
        public DataTable get_service_sub_details(string od_seq, 
            string od_service_seq,
            string od_service_sub_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_service_sub_details", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 服务批次 明细列表
        public DataTable get_service_sub_details(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq)); 
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_service_sub_list", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 服务批次 运程明细
        public DataTable  get_service_sub_route(string od_seq,string od_service_seq,string od_service_sub_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_service_sub_route", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 下载 火车发运单
        //通过 od_route_seq 和od_service_sub_seq获取 
        public DataTable  get_sub_way_details( string od_service_sub_seq,string od_route_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_route_seq", od_route_seq)); 
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_sub_way_details", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 下载 派车单
        public void  get_road_way_details(string od_service_sub_seq,
            string od_route_seq,
            ref string company_desc,
            ref string route_tools_owner_desc,
            ref string route_assign_dat,
            ref string route_bill_no,
            ref string route_delivery_cargo_info,
            ref string route_cntr_and_seal,
            ref string route_cntr_group_desc,
            ref string route_bak)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                lst_in.Add(new SqlParameter("@od_route_seq", od_route_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@company_desc", SqlDbType.NVarChar, 500);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@route_tools_owner_desc", SqlDbType.NVarChar, 500);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@route_assign_dat", SqlDbType.NVarChar, 20);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);


                SqlParameter p4 = new SqlParameter("@route_bill_no", SqlDbType.NVarChar, 200);
                p4.Direction = ParameterDirection.Output;
                lst_out.Add(p4);


                SqlParameter p5 = new SqlParameter("@route_delivery_cargo_info", SqlDbType.NVarChar, 500);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5);


                SqlParameter p6 = new SqlParameter("@route_cntr_and_seal", SqlDbType.NVarChar, 2000);
                p6.Direction = ParameterDirection.Output;
                lst_out.Add(p6);


                SqlParameter p7 = new SqlParameter("@route_cntr_group_desc", SqlDbType.NVarChar, 500);
                p7.Direction = ParameterDirection.Output;
                lst_out.Add(p7);

                SqlParameter p8 = new SqlParameter("@route_bak", SqlDbType.NVarChar, 500);
                p8.Direction = ParameterDirection.Output;
                lst_out.Add(p8);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_road_way_details", lst_in, ref lst_out);
                company_desc = lst_out[0].Value.ToString();
                route_tools_owner_desc = lst_out[1].Value.ToString();
                route_assign_dat = lst_out[2].Value.ToString();
                route_bill_no = lst_out[3].Value.ToString();
                route_delivery_cargo_info = lst_out[4].Value.ToString();
                route_cntr_and_seal = lst_out[5].Value.ToString();
                route_cntr_group_desc = lst_out[6].Value.ToString();
                route_bak = lst_out[7].Value.ToString(); 
                 
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 

        #region 下载 单票对账单 
        public DataTable  get_rec_check_account_of_single_order(
            string cu_id,
            string od_seq,
            string u_id, 
            ref string company_desc,
            ref string company_address,
            ref string company_phone,
            ref string company_cn_bank_info,
            ref string company_en_bank_info,
            ref string print_nam,
            ref string print_dat,
            ref string cu_desc,
            ref string od_no,
            ref string od_bill_no,
            ref string od_ship_info,
            ref string od_cargo_typ_desc,
            ref string od_ship_etd,
            ref string od_load_port_desc,
            ref string od_disc_port_desc,
            ref string od_cntr_group_desc,
            ref string od_cargo_pick_desc,
            ref string od_cargo_weight_desc,
            ref string od_cargo_bluk_desc,
            ref string od_operation_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cu_id", cu_id));
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
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
                    "od_no",
                    "od_bill_no",
                    "od_ship_info",
                    "od_cargo_typ_desc",
                    "od_ship_etd",
                    "od_load_port_desc",
                    "od_disc_port_desc",
                    "od_cntr_group_desc",
                    "od_cargo_pick_desc",
                    "od_cargo_weight_desc",
                    "od_cargo_bluk_desc",
                    "od_operation_desc"};
                foreach (string s in out_par)
                {
                    SqlParameter p = new SqlParameter(s, SqlDbType.NVarChar, 500);
                    p.Direction = ParameterDirection.Output;
                    lst_out.Add(p);
                } 
                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_rec_check_account_of_single_order", lst_in, ref lst_out);

                company_desc = lst_out[0].Value.ToString();
                company_address = lst_out[1].Value.ToString();
                company_phone = lst_out[2].Value.ToString();
                company_cn_bank_info = lst_out[3].Value.ToString();
                company_en_bank_info = lst_out[4].Value.ToString();
                print_nam = lst_out[5].Value.ToString();
                print_dat = lst_out[6].Value.ToString();
                cu_desc = lst_out[7].Value.ToString();
                od_no = lst_out[8].Value.ToString();
                od_bill_no = lst_out[9].Value.ToString();
                od_ship_info = lst_out[10].Value.ToString();
                od_cargo_typ_desc = lst_out[11].Value.ToString();
                od_ship_etd = lst_out[12].Value.ToString();
                od_load_port_desc = lst_out[13].Value.ToString();
                od_disc_port_desc = lst_out[14].Value.ToString();
                od_cntr_group_desc = lst_out[15].Value.ToString();
                od_cargo_pick_desc = lst_out[16].Value.ToString();
                od_cargo_weight_desc = lst_out[17].Value.ToString();
                od_cargo_bluk_desc = lst_out[18].Value.ToString();
                od_operation_desc = lst_out[19].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 

        #region 获取 服务批次 箱量(仅数量)
        public DataTable get_service_sub_ref_group_cntr(string od_seq, string od_service_seq, string od_service_sub_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_service_sub_ref_group_cntr", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        
        //  upd:2021-7-9 
        #region 获取 服务批次 箱量(明细)  
        public DataTable get_service_sub_ref_cntr(string od_seq, 
            string od_service_seq, string od_service_sub_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_service_sub_ref_cntr", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 服务批次 费用
        public DataTable get_order_fee_by_service_sub_seq(string od_seq, string od_service_seq, string od_service_sub_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_fee_by_service_sub_seq", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 订单 费用(所有)
        public DataTable get_order_fee(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                 
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_fee", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DataTable get_order_fee(string od_seq,string rec_or_pay,ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar,2000);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 
                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_fee2", lst_in, ref lst_out);
                group_fee_desc = lst_out[0].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 获取 合同文件
        public DataTable get_order_contract_file_info(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_contract_file_info", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 装箱信息
        public DataTable get_order_cntr_file_info(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_cntr_file_info", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 单个 集装箱装箱图片信息
        public DataTable get_order_cntr_file_info_by_cntr_id(string od_seq, string cntr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@cntr_id", cntr_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_order_cntr_file_info_by_cntr_id", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 莫名其妙的一些附加信息获取 
        public DataTable get_cargo_addtion_info(string od_seq, 
            ref string od_delivery_cargo_info,
            ref string od_take_cargo_info)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@od_delivery_cargo_info", SqlDbType.NVarChar,500);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@od_take_cargo_info", SqlDbType.NVarChar, 500);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_cargo_addtion_info", lst_in, ref lst_out);

                od_delivery_cargo_info = lst_out[0].Value.ToString();
                od_take_cargo_info = lst_out[1].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 

        #region 用于打包的 一些获取
        #region 获取所有 服务商

        public DataTable get_all_service_sub(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_all_service_sub", lst_in, ref lst_out);

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取所有 运程
        public DataTable get_all_service_sub_route(string od_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_all_service_sub_route", lst_in, ref lst_out);

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

                DataTable dt = ms.excuteStoredProcedureData("_od_p_get_group_details_of_operation", lst_in, ref lst_out);

                return dt;

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
        public bool insert_order_by_copy(
           string copy_od_seq, 
           string od_record_by_id,  
           ref string od_seq,
           ref string od_no)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@copy_od_seq", copy_od_seq)); 
                lst_in.Add(new SqlParameter("@od_record_by_id", od_record_by_id)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@od_seq", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@od_no", SqlDbType.NVarChar, 40);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_order_by_copy", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                od_seq = lst_out[1].Value.ToString();
                od_no = lst_out[2].Value.ToString();

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 新增 订单 基本信息和货物资料
        public bool insert_order(
            string od_project_typ,
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
            ref string od_seq,
            ref string od_no)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_project_typ", od_project_typ));
                lst_in.Add(new SqlParameter("@od_typ", od_typ));
                lst_in.Add(new SqlParameter("@od_cargo_agent_cu_id", od_cargo_agent_cu_id));
                lst_in.Add(new SqlParameter("@od_delegate_cu_id", od_delegate_cu_id));
                lst_in.Add(new SqlParameter("@od_cargo_agent_relation_nam", od_cargo_agent_relation_nam));
                lst_in.Add(new SqlParameter("@od_cargo_agent_relation_phone", od_cargo_agent_relation_phone));
                lst_in.Add(new SqlParameter("@od_cargo_agent_relation_fax", od_cargo_agent_relation_fax));
                lst_in.Add(new SqlParameter("@od_delegate_relation_nam", od_delegate_relation_nam));
                lst_in.Add(new SqlParameter("@od_delegate_relation_phone", od_delegate_relation_phone));
                lst_in.Add(new SqlParameter("@od_delegate_relation_fax", od_delegate_relation_fax));
                lst_in.Add(new SqlParameter("@od_record_by_id", od_record_by_id));
                lst_in.Add(new SqlParameter("@od_fee_dat", od_fee_dat));
                lst_in.Add(new SqlParameter("@od_operation_id", od_operation_id));
                lst_in.Add(new SqlParameter("@od_service_id", od_service_id));
                lst_in.Add(new SqlParameter("@od_sales_id", od_sales_id));
                lst_in.Add(new SqlParameter("@od_bak_delegate", od_bak_delegate));
                lst_in.Add(new SqlParameter("@od_bak_operation", od_bak_operation));
                lst_in.Add(new SqlParameter("@od_freight_id", od_freight_id));
                lst_in.Add(new SqlParameter("@od_record_by_company_id", od_record_by_company_id));
                lst_in.Add(new SqlParameter("@od_trade_typ_id", od_trade_typ_id));
                lst_in.Add(new SqlParameter("@od_beg_place_id", od_beg_place_id));
                lst_in.Add(new SqlParameter("@od_end_place_id", od_end_place_id));
                lst_in.Add(new SqlParameter("@od_i_e_id", od_i_e_id)); 

                lst_in.Add(new SqlParameter("@od_box_typ_id", od_box_typ_id));
                lst_in.Add(new SqlParameter("@od_cargo_typ", od_cargo_typ));
                lst_in.Add(new SqlParameter("@od_cargo_bluk", od_cargo_bluk));
                lst_in.Add(new SqlParameter("@od_cargo_weight", od_cargo_weight));
                lst_in.Add(new SqlParameter("@od_cargo_number", od_cargo_number));
                lst_in.Add(new SqlParameter("@od_cargo_packing", od_cargo_packing)); 
                lst_in.Add(new SqlParameter("@od_take_cargo_info", od_take_cargo_info));
                lst_in.Add(new SqlParameter("@od_delivery_cargo_info", od_delivery_cargo_info));

                lst_in.Add(new SqlParameter("@od_po_no", od_po_no));
                lst_in.Add(new SqlParameter("@od_so_no", od_so_no));
                lst_in.Add(new SqlParameter("@od_main_bill_no", od_main_bill_no));
                lst_in.Add(new SqlParameter("@od_sub_bill_no", od_sub_bill_no));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@od_seq", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@od_no", SqlDbType.NVarChar,40);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_order", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                od_seq = lst_out[1].Value.ToString();
                od_no = lst_out[2].Value.ToString();

                if (result > 0)
                {
                    List<SqlParameter> lst_in1 = new List<SqlParameter>();
                    lst_in1.Add(new SqlParameter("@od_seq", od_seq));
                    lst_in1.Add(new SqlParameter("@bk_commissioned_id", bk_commissioned_id));

                    List<SqlParameter> lst_out1 = new List<SqlParameter>();

                    SqlParameter p11 = new SqlParameter("@result", SqlDbType.Int);
                    p11.Direction = ParameterDirection.Output;
                    lst_out1.Add(p11);

                    ms.excuteStoredProcedureData("_od_p_update_order_booking_note_of_bk_commissioned_id", lst_in1, ref lst_out1);


                }

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 编辑订单 基本信息和货物资料
        public bool update_order(
            string od_seq,
            string od_project_typ,
            //string od_typ,
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
            string bk_commissioned_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_project_typ", od_project_typ));
                //lst_in.Add(new SqlParameter("@od_typ", od_typ));
                lst_in.Add(new SqlParameter("@od_cargo_agent_cu_id", od_cargo_agent_cu_id));
                lst_in.Add(new SqlParameter("@od_delegate_cu_id", od_delegate_cu_id));
                lst_in.Add(new SqlParameter("@od_cargo_agent_relation_nam", od_cargo_agent_relation_nam));
                lst_in.Add(new SqlParameter("@od_cargo_agent_relation_phone", od_cargo_agent_relation_phone));
                lst_in.Add(new SqlParameter("@od_cargo_agent_relation_fax", od_cargo_agent_relation_fax));
                lst_in.Add(new SqlParameter("@od_delegate_relation_nam", od_delegate_relation_nam));
                lst_in.Add(new SqlParameter("@od_delegate_relation_phone", od_delegate_relation_phone));
                lst_in.Add(new SqlParameter("@od_delegate_relation_fax", od_delegate_relation_fax));
                lst_in.Add(new SqlParameter("@od_record_by_id", od_record_by_id));
                lst_in.Add(new SqlParameter("@od_fee_dat", od_fee_dat));
                lst_in.Add(new SqlParameter("@od_operation_id", od_operation_id));
                lst_in.Add(new SqlParameter("@od_service_id", od_service_id));
                lst_in.Add(new SqlParameter("@od_sales_id", od_sales_id));
                lst_in.Add(new SqlParameter("@od_bak_delegate", od_bak_delegate));
                lst_in.Add(new SqlParameter("@od_bak_operation", od_bak_operation));
                lst_in.Add(new SqlParameter("@od_freight_id", od_freight_id));
                lst_in.Add(new SqlParameter("@od_record_by_company_id", od_record_by_company_id));
                lst_in.Add(new SqlParameter("@od_trade_typ_id", od_trade_typ_id));
                lst_in.Add(new SqlParameter("@od_beg_place_id", od_beg_place_id));
                lst_in.Add(new SqlParameter("@od_end_place_id", od_end_place_id));
                lst_in.Add(new SqlParameter("@od_i_e_id", od_i_e_id));

                lst_in.Add(new SqlParameter("@od_box_typ_id", od_box_typ_id));
                lst_in.Add(new SqlParameter("@od_cargo_typ", od_cargo_typ));
                lst_in.Add(new SqlParameter("@od_cargo_bluk", od_cargo_bluk));
                lst_in.Add(new SqlParameter("@od_cargo_weight", od_cargo_weight));
                lst_in.Add(new SqlParameter("@od_cargo_number", od_cargo_number));
                lst_in.Add(new SqlParameter("@od_cargo_packing", od_cargo_packing));
                lst_in.Add(new SqlParameter("@od_take_cargo_info", od_take_cargo_info));
                lst_in.Add(new SqlParameter("@od_delivery_cargo_info", od_delivery_cargo_info));

                lst_in.Add(new SqlParameter("@od_po_no", od_po_no));
                lst_in.Add(new SqlParameter("@od_so_no", od_so_no));
                lst_in.Add(new SqlParameter("@od_main_bill_no", od_main_bill_no));
                lst_in.Add(new SqlParameter("@od_sub_bill_no", od_sub_bill_no));
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                

                DataTable dt = ms.excuteStoredProcedureData("_od_p_update_order", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                if (result > 0)
                {
                    List<SqlParameter> lst_in1 = new List<SqlParameter>();
                    lst_in1.Add(new SqlParameter("@od_seq", od_seq));
                    lst_in1.Add(new SqlParameter("@bk_commissioned_id", bk_commissioned_id));

                    List<SqlParameter> lst_out1 = new List<SqlParameter>();

                    SqlParameter p11 = new SqlParameter("@result", SqlDbType.Int);
                    p11.Direction = ParameterDirection.Output;
                    lst_out1.Add(p11);

                    ms.excuteStoredProcedureData("_od_p_update_order_booking_note_of_bk_commissioned_id", lst_in1, ref lst_out1);


                }
                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增/编辑 集装箱量
        public bool insert_cntr_group(
            string od_seq,
            string od_group_cntr_seq,
            string od_group_cntr_typ,
            string od_group_cntr_siz,
            string od_group_pin_flag,
            string od_group_cntr_opr_cod,
            string od_group_cntr_number,
            ref string od_group_cntr_seq_out)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_group_cntr_seq", od_group_cntr_seq));
                lst_in.Add(new SqlParameter("@od_group_cntr_typ", od_group_cntr_typ));
                lst_in.Add(new SqlParameter("@od_group_cntr_siz", od_group_cntr_siz));
                lst_in.Add(new SqlParameter("@od_group_pin_flag", od_group_pin_flag));
                lst_in.Add(new SqlParameter("@od_group_cntr_opr_cod", od_group_cntr_opr_cod));
                lst_in.Add(new SqlParameter("@od_group_cntr_number", od_group_cntr_number)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@od_group_cntr_seq_out", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
 
                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_cntr_group", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                od_group_cntr_seq_out = lst_out[1].Value.ToString();
              
                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 集装箱量
        public bool delete_cntr_group(string od_seq, string od_group_cntr_seqs)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_group_cntr_seqs", od_group_cntr_seqs)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 

                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_cntr_group", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                 
                return result > 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        //upd: 2021-7-9 新增4个字段 
        #region 新增、编辑 订单集装箱 
        public bool insert_order_cntr(
            string od_seq,
            string cntr_id,
            string cntr_no,
            string eqp_typ,
            string eqp_siz,
            string seal_no,
            string bill_no,
            string cargo_net_wgt,
            string cargo_pick_number,
            string cargo_bluk,
            string opr_cod,
            string customs_seal_no,
            string customs_voyage_no,
            string customs_ship_desc,
            string customs_hs_cod,
            string customs_load_port,
            string customs_disc_port,
            string cargo_goods_desc,
            string customs_ship_no,
            string pick_empty_no,
            string cntr_gross_wgt, 
            ref string cntr_id_out)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@cntr_id", cntr_id));
                lst_in.Add(new SqlParameter("@cntr_no", cntr_no));
                lst_in.Add(new SqlParameter("@eqp_typ", eqp_typ));
                lst_in.Add(new SqlParameter("@eqp_siz", eqp_siz));
                lst_in.Add(new SqlParameter("@seal_no", seal_no));
                lst_in.Add(new SqlParameter("@bill_no", bill_no));
                lst_in.Add(new SqlParameter("@cargo_net_wgt", cargo_net_wgt));
                lst_in.Add(new SqlParameter("@cargo_pick_number", cargo_pick_number));
                lst_in.Add(new SqlParameter("@cargo_bluk", cargo_bluk));
                lst_in.Add(new SqlParameter("@opr_cod", opr_cod));
                lst_in.Add(new SqlParameter("@customs_seal_no", customs_seal_no));
                lst_in.Add(new SqlParameter("@customs_voyage_no", customs_voyage_no));
                lst_in.Add(new SqlParameter("@customs_ship_desc", customs_ship_desc));
                lst_in.Add(new SqlParameter("@customs_hs_cod", customs_hs_cod));
                lst_in.Add(new SqlParameter("@customs_load_port", customs_load_port));
                lst_in.Add(new SqlParameter("@customs_disc_port", customs_disc_port));
                lst_in.Add(new SqlParameter("@cargo_goods_desc", cargo_goods_desc));
                lst_in.Add(new SqlParameter("@customs_ship_no", customs_ship_no));
                lst_in.Add(new SqlParameter("@pick_empty_no", pick_empty_no));
                lst_in.Add(new SqlParameter("@cntr_gross_wgt", cntr_gross_wgt));
            

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@cntr_id_out", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_order_cntr", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                cntr_id_out = lst_out[1].Value.ToString();

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
          
        #region 删除 订单集装箱
        public bool delete_order_cntr(string od_seq, string cntr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@cntr_id", cntr_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_order_cntr", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool  delete_order_cntr_not_in_ids(string od_seq, string cntr_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@cntr_ids", cntr_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_order_cntr_not_in_ids", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 编辑订舱单
        public bool update_booking_note(string od_seq,
            string bk_shipper_desc,
	        string bk_consignee_desc ,
	        string bk_notify_desc,
            string bk_commissioned_id,
	        string bk_commissioned_to,
	        string bk_commissioned_tel ,
	        string bk_commissioned_fax ,
	       // string bk_booking_number,
	        //string bk_job_number ,
	        string bk_delegate_tel,
	        string bk_delegate_fax,
	        string bk_delegate_ctc,
	        string bk_delegate_date, 
	        string bk_carrier_id,
	        string bk_closing_date,
	        string bk_etd ,
	        string bk_port_of_loading_id,
	        string bk_port_of_transit_id,
	        string bk_port_of_discharge_id,
            string bk_freight_term_id,
	        string bk_pay_method_id,
	        string bk_shipping_marks_and_no_desc,
            string bk_freight_package_desc, 
	        string bk_description_of_goods_desc,
	        string bk_gross_weight ,
	        string bk_remarks ,
	        string bk_measurement )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@bk_shipper_desc", bk_shipper_desc));
                lst_in.Add(new SqlParameter("@bk_consignee_desc", bk_consignee_desc));
                lst_in.Add(new SqlParameter("@bk_notify_desc", bk_notify_desc));
                lst_in.Add(new SqlParameter("@bk_commissioned_id", bk_commissioned_id));
                lst_in.Add(new SqlParameter("@bk_commissioned_to", bk_commissioned_to));
                lst_in.Add(new SqlParameter("@bk_commissioned_tel", bk_commissioned_tel));
                lst_in.Add(new SqlParameter("@bk_commissioned_fax", bk_commissioned_fax));
               // lst_in.Add(new SqlParameter("@bk_booking_number", bk_booking_number));
                //lst_in.Add(new SqlParameter("@bk_job_number", bk_job_number));
                lst_in.Add(new SqlParameter("@bk_delegate_tel", bk_delegate_tel));
                lst_in.Add(new SqlParameter("@bk_delegate_fax", bk_delegate_fax));
                lst_in.Add(new SqlParameter("@bk_delegate_ctc", bk_delegate_ctc));
                lst_in.Add(new SqlParameter("@bk_delegate_date", bk_delegate_date));
                lst_in.Add(new SqlParameter("@bk_carrier_id", bk_carrier_id));
                lst_in.Add(new SqlParameter("@bk_closing_date", bk_closing_date));
                lst_in.Add(new SqlParameter("@bk_etd", bk_etd));
                lst_in.Add(new SqlParameter("@bk_port_of_loading_id", bk_port_of_loading_id));
                lst_in.Add(new SqlParameter("@bk_port_of_transit_id", bk_port_of_transit_id));
                lst_in.Add(new SqlParameter("@bk_port_of_discharge_id", bk_port_of_discharge_id));
                lst_in.Add(new SqlParameter("@bk_freight_term_id", bk_freight_term_id));
                lst_in.Add(new SqlParameter("@bk_pay_method_id", bk_pay_method_id));
                lst_in.Add(new SqlParameter("@bk_shipping_marks_and_no_desc", bk_shipping_marks_and_no_desc));
                lst_in.Add(new SqlParameter("@bk_freight_package_desc", bk_freight_package_desc));
                lst_in.Add(new SqlParameter("@bk_description_of_goods_desc", bk_description_of_goods_desc));
                lst_in.Add(new SqlParameter("@bk_gross_weight", bk_gross_weight));
                lst_in.Add(new SqlParameter("@bk_remarks", bk_remarks));
                lst_in.Add(new SqlParameter("@bk_measurement", bk_measurement));
                //lst_in.Add(new SqlParameter("@bk_bill_typ_id", bk_bill_typ_id));
                //lst_in.Add(new SqlParameter("@bk_cargo_number", bk_cargo_number));
                //lst_in.Add(new SqlParameter("@bk_delegate_id", bk_delegate_id)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_update_booking_note", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 订单
        public int delete_order(
            string od_seq )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_order", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 锁定 订单
        public int lock_order(
            string od_seq,
            string od_operation_lock_id,
            string ap_u_id,
            string aps_order_by_id,
            string aps_id,
            ref string amc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_operation_lock_id", od_operation_lock_id));
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


                DataTable dt = ms.excuteStoredProcedureData("_od_p_lock_order", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                amc_id = lst_out[1].Value.ToString();

                return result;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        /*
         服务商逻辑
         * 服务商有三层结构
         * 1. 服务商
         * 2. 服务商的服务次数(相同路线和服务内容的为一个批次,不同路线或服务的分不同批次)
         * 3. 每个服务批次的服务内容: 含 路线明细， 毛件体，备注，集装箱明细，计费相关  
         * 
         * 每个服务批次，都进行整体保存(只有一个保存按钮),
         * 每次保存，会将客户端的内容，和服务器内容进行对比，
         * 如果服务器有，客户端没有则删除
         * 如果客户端有，服务端也有则进行更新
         * 如果客户端有，服务端没有则进行新增
         * 
         */

        #region 新增服务商
        /// <summary>
        /// 
        /// </summary>
        /// <param name="od_seq"></param>
        /// <param name="od_service_cu_id"></param>
        /// <param name="od_status_id"></param>
        /// <param name="od_service_seq"></param>
        /// <param name="od_service_order_by"></param>
        /// <returns>1=增加成功，-1=订单已审核,-2=已经存在相同的服务商</returns>
        public int insert_service(
            string od_seq,
            string od_service_cu_id,
            ref string od_status_id,
            ref string od_service_seq,
            ref string od_service_order_by,
            ref string od_service_cu_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_cu_id", od_service_cu_id));
                 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@od_service_seq", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                SqlParameter p3 = new SqlParameter("@od_service_order_by", SqlDbType.Int);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);

                SqlParameter p4 = new SqlParameter("@od_status_id", SqlDbType.Int);
                p4.Direction = ParameterDirection.Output;
                lst_out.Add(p4);

                SqlParameter p5 = new SqlParameter("@od_service_cu_desc", SqlDbType.NVarChar,200);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_service", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                od_service_seq = lst_out[1].Value.ToString();
                od_service_order_by = lst_out[2].Value.ToString();
                od_status_id = lst_out[3].Value.ToString();
                od_service_cu_desc = lst_out[4].Value.ToString();
                return result  ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 删除 服务商
        /// <summary>
        /// 
        /// </summary>
        /// <param name="od_seq"></param>
        /// <param name="od_service_seq"></param>
        /// <returns>1=删除完成,-1=订单已审核,-2=存在费用锁定</returns>
        public int delete_service(
            string od_seq,
            string od_service_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_service", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增服务商 批次
        public bool insert_service_sub(
           string od_seq,
           string od_service_seq,
           ref string od_service_sub_seq,
            ref string od_service_sub_order_by)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@od_service_sub_seq", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                SqlParameter p3 = new SqlParameter("@od_service_sub_order_by", SqlDbType.Int);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);
                 

                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_service_sub", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                od_service_sub_seq = lst_out[1].Value.ToString();
                od_service_sub_order_by = lst_out[2].Value.ToString();
                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 删除服务商 批次
        public int delete_service_sub(
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_service_sub", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        //upd:2021-7-9
        #region 更新服务商 批次
        /*
         * 这里没有对费用进行任何判断
         * 费用可以采用其他逻辑，也可以采用本逻辑 
         * 暂未定 
         */
        public bool update_service_sub(
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string od_service_sub_weight,
            string od_service_sub_bluk,
            string od_service_sub_number,
            string od_service_sub_bak,
            string od_route_seqs,
            string od_service_sub_group_cntr_seqs,
            string cntr_ids,
            string od_fee_seqs)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_weight", od_service_sub_weight));
                lst_in.Add(new SqlParameter("@od_service_sub_bluk", od_service_sub_bluk));
                lst_in.Add(new SqlParameter("@od_service_sub_number", od_service_sub_number));
                lst_in.Add(new SqlParameter("@od_service_sub_bak", od_service_sub_bak));
                lst_in.Add(new SqlParameter("@od_route_seqs", od_route_seqs));
                lst_in.Add(new SqlParameter("@od_service_sub_group_cntr_seqs", od_service_sub_group_cntr_seqs));
                lst_in.Add(new SqlParameter("@cntr_ids", cntr_ids));
                lst_in.Add(new SqlParameter("@od_fee_seqs", od_fee_seqs));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_update_service_sub", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
         
        //2021-7-9
        #region 新增/编辑 服务批次的 运程明细 
        public bool insert_service_sub_route(
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
            string od_route_desc, 
            string od_route_order_by,
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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_route_seq", od_route_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                lst_in.Add(new SqlParameter("@od_route_typ", od_route_typ));
                lst_in.Add(new SqlParameter("@od_route_tools_desc", od_route_tools_desc));
                lst_in.Add(new SqlParameter("@od_route_tools_no", od_route_tools_no));
                lst_in.Add(new SqlParameter("@od_route_tools_owner", od_route_tools_owner));
                lst_in.Add(new SqlParameter("@od_route_from_id", od_route_from_id));
                lst_in.Add(new SqlParameter("@od_route_to_id", od_route_to_id));
                lst_in.Add(new SqlParameter("@od_route_etd", od_route_etd));
                lst_in.Add(new SqlParameter("@od_route_eta", od_route_eta));
                lst_in.Add(new SqlParameter("@od_route_atd", od_route_atd));
                lst_in.Add(new SqlParameter("@od_route_ata", od_route_ata)); 
                lst_in.Add(new SqlParameter("@od_route_lines_id", od_route_lines_id)); 
                lst_in.Add(new SqlParameter("@od_route_desc", od_route_desc));
                lst_in.Add(new SqlParameter("@od_route_order_by", od_route_order_by));
                lst_in.Add(new SqlParameter("@od_route_record_by_id", od_route_record_by_id));
                lst_in.Add(new SqlParameter("@od_route_freight_id", od_route_freight_id));
                lst_in.Add(new SqlParameter("@od_route_bak", od_route_bak));
                lst_in.Add(new SqlParameter("@od_route_take_cargo_info", od_route_take_cargo_info));
                lst_in.Add(new SqlParameter("@od_route_delivery_cargo_info", od_route_delivery_cargo_info));
                lst_in.Add(new SqlParameter("@od_route_union_e_f", od_route_union_e_f));
                lst_in.Add(new SqlParameter("@od_route_vsl", od_route_vsl));
                lst_in.Add(new SqlParameter("@od_route_vvd", od_route_vvd));
                
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@od_route_seq_out", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_service_sub_route", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                od_route_seq_out = lst_out[1].Value.ToString();
            
                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增/编辑 服务批次的 箱量(仅数量) 
        public bool insert_service_sub_ref_group_cntr(
            string od_seq, 
            string od_service_seq,
            string od_service_sub_seq,
            string od_service_sub_group_cntr_seq,
            string od_service_sub_group_cntr_typ,
            string od_service_sub_group_cntr_siz,
            string od_service_sub_group_pin_flag,
            string od_service_sub_group_cntr_opr_cod,
            string od_service_sub_group_cntr_number, 
            ref string od_service_sub_group_cntr_seq_out)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq)); 
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_group_cntr_seq", od_service_sub_group_cntr_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_group_cntr_typ", od_service_sub_group_cntr_typ));
                lst_in.Add(new SqlParameter("@od_service_sub_group_cntr_siz", od_service_sub_group_cntr_siz));
                lst_in.Add(new SqlParameter("@od_service_sub_group_pin_flag", od_service_sub_group_pin_flag));
                lst_in.Add(new SqlParameter("@od_service_sub_group_cntr_opr_cod", od_service_sub_group_cntr_opr_cod));
                lst_in.Add(new SqlParameter("@od_service_sub_group_cntr_number", od_service_sub_group_cntr_number));
           
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@od_service_sub_group_cntr_seq_out", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_service_sub_ref_group_cntr", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                od_service_sub_group_cntr_seq_out = lst_out[1].Value.ToString();

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        //2021-7-9
        #region 新增/编辑 服务批次的 箱量(明细)
        public bool insert_service_sub_ref_cntr(
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string cntr_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                lst_in.Add(new SqlParameter("@cntr_ids", cntr_ids)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_service_sub_ref_cntr", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        #endregion


        #region 新增 服务批次的费用
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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@fee_item_typ", fee_item_typ));
                lst_in.Add(new SqlParameter("@fee_price", fee_price));
                lst_in.Add(new SqlParameter("@fee_number", fee_number));
                lst_in.Add(new SqlParameter("@fee_unit", fee_unit));
                lst_in.Add(new SqlParameter("@fee_currency_rate", fee_currency_rate));
                lst_in.Add(new SqlParameter("@fee_currency_id", fee_currency_id));
                lst_in.Add(new SqlParameter("@fee_bak", fee_bak));
                lst_in.Add(new SqlParameter("@fee_record_id", fee_record_id));
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq));
                lst_in.Add(new SqlParameter("@fee_invoice_typ", fee_invoice_typ));
                lst_in.Add(new SqlParameter("@fee_rel_bill_no", fee_rel_bill_no));
                lst_in.Add(new SqlParameter("@fee_rel_opr_cod", fee_rel_opr_cod));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@fee_seq_out", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
 

                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_order_fee", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                fee_seq_out = lst_out[1].Value.ToString();
               
                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 应收费用
        public bool  delete_order_fee_of_rec(
            string od_seq,
            string fee_seqs)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_order_fee_of_rec", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@fee_seqs", fee_seqs));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_order_fee_of_pay", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
             
                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        //添加一个 判断 费用是否能删除 
        #region 判断是否可以删除 服务批次的费用
        public int judge_delete_order_fee(
            string od_seq,
            string fee_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_judge_delete_order_fee", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value); 

                return result;

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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_profit_and_loss_bak", od_profit_and_loss_bak)); 
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_update_profit_and_loss_bak", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 编辑订单 附件 运单和装箱信息
        public bool update_order_addition_infos(
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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_bill_typ", od_bill_typ));
                lst_in.Add(new SqlParameter("@od_sign_bill_typ", od_sign_bill_typ));
                lst_in.Add(new SqlParameter("@od_declare_customs_typ", od_declare_customs_typ));
                lst_in.Add(new SqlParameter("@od_carriage_typ", od_carriage_typ));
                lst_in.Add(new SqlParameter("@od_stuffing_container_typ", od_stuffing_container_typ));
                lst_in.Add(new SqlParameter("@od_stuffing_container_place", od_stuffing_container_place));
                lst_in.Add(new SqlParameter("@od_entry_tim_of_stuffing", od_entry_tim_of_stuffing));
                lst_in.Add(new SqlParameter("@od_out_tim_of_stuffing", od_out_tim_of_stuffing));
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_update_order_addition_infos", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 集装箱 装箱信息
        #region 增加 装箱图片  
        public bool insert_order_cntr_file(
            string od_seq,
            string cntr_id,
            string file_nam,
            string file_path,
            string file_record_id, 
            ref string file_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@cntr_id", cntr_id));
                lst_in.Add(new SqlParameter("@file_nam", file_nam));
                lst_in.Add(new SqlParameter("@file_path", file_path));
                lst_in.Add(new SqlParameter("@file_record_id", file_record_id));
              
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@file_seq", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_order_cntr_file", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                file_seq = lst_out[1].Value.ToString();

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 删除 装箱图片 
        public bool delete_order_cntr_file(
            string od_seq,
            string cntr_id,
            string file_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@cntr_id", cntr_id));
                lst_in.Add(new SqlParameter("@file_seq", file_seq)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 
                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_order_cntr_file", lst_in, ref lst_out);
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

        #region 合同文件 
        #region 增加 
        public bool insert_order_contract_file(
            string od_seq, 
            string file_nam,
            string file_path,
            string file_record_id,
            string amc_id,
            string amc_no,
            string file_seq,
            ref string file_seq_out)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq)); 
                lst_in.Add(new SqlParameter("@file_nam", file_nam));
                lst_in.Add(new SqlParameter("@file_path", file_path));
                lst_in.Add(new SqlParameter("@file_record_id", file_record_id));
                lst_in.Add(new SqlParameter("@amc_id", amc_id));
                lst_in.Add(new SqlParameter("@amc_no", amc_no));
                lst_in.Add(new SqlParameter("@file_seq", file_seq));

                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@file_seq_out", SqlDbType.NVarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);


                DataTable dt = ms.excuteStoredProcedureData("_od_p_insert_order_contract_file", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                file_seq_out = lst_out[1].Value.ToString();

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 删除  
        public bool delete_order_contract_file(
            string od_seq,
            string file_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@file_seq", file_seq));
                
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 

                DataTable dt = ms.excuteStoredProcedureData("_od_p_delete_order_contract_file", lst_in, ref lst_out);
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



        #region 应付和船期  2021-7-21 
         
        #region 预计算  
        public DataTable pre_computer_order_fee_of_ship_voyage(
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
            string trade_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq)); 
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq)); 
                lst_in.Add(new SqlParameter("@ship_no", ship_no));
                lst_in.Add(new SqlParameter("@load_port", load_port));
                lst_in.Add(new SqlParameter("@disc_port", disc_port));
                lst_in.Add(new SqlParameter("@freight_id", freight_id));
                lst_in.Add(new SqlParameter("@disc_trans_flag", disc_trans_flag));
                lst_in.Add(new SqlParameter("@load_trans_flag", load_trans_flag));
                lst_in.Add(new SqlParameter("@e_f_id", e_f_id));
                lst_in.Add(new SqlParameter("@danger_flag", danger_flag));
                lst_in.Add(new SqlParameter("@trade_id", trade_id));
                
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_od_p_pre_computer_order_fee_of_ship_voyage", lst_in, ref lst_out);
                
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        } 
        #endregion 


        #region 绑定route
        public bool  order_route_bind_ship_voyage(
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
            string destination_port)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                lst_in.Add(new SqlParameter("@od_route_seq", od_route_seq));
                lst_in.Add(new SqlParameter("@ship_no", ship_no));
                lst_in.Add(new SqlParameter("@load_port", load_port));
                lst_in.Add(new SqlParameter("@disc_port", disc_port));
                lst_in.Add(new SqlParameter("@freight_id", freight_id));
                lst_in.Add(new SqlParameter("@disc_trans_flag", disc_trans_flag));
                lst_in.Add(new SqlParameter("@load_trans_flag", load_trans_flag));
                lst_in.Add(new SqlParameter("@e_f_id", e_f_id));
                lst_in.Add(new SqlParameter("@danger_flag", danger_flag));
                lst_in.Add(new SqlParameter("@trade_id", trade_id));
                lst_in.Add(new SqlParameter("@destination_port", destination_port));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_order_route_bind_ship_voyage", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0; 

            }
            catch (Exception e)
            {
                throw e;
            }
        } 
        #endregion 


        #region 费用绑定与解绑 
        //绑定费用 
        public bool  order_fee_bind_ship_voyage(
            string ship_no,
            string fee_seq )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq)); 
                lst_in.Add(new SqlParameter("@ship_no", ship_no)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_order_fee_bind_ship_voyage", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //解除绑定费用 
        public bool order_fee_unbind_ship_voyage(
            string ship_no,
            string fee_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_seq", fee_seq));
                lst_in.Add(new SqlParameter("@ship_no", ship_no));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_order_fee_unbind_ship_voyage", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;

            }
            catch (Exception e)
            {
                throw e;
            }
        } 
        #endregion 


        #region 集装箱删除 预判断
        public int  judge_delete_cntr(
            string od_seq,
            string cntr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@cntr_id", cntr_id)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_judge_delete_cntr", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 判定绑定集装箱是否对这个船进行了二次绑定 
        public bool judge_bind_ship_voyage(
            string ship_no,
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_no", ship_no));
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                List<SqlParameter> lst_out = new List<SqlParameter>();

                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_od_p_judge_bind_ship_voyage", lst_in, ref lst_out);
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
    }
}
