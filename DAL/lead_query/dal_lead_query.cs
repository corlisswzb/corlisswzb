using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;

namespace DAL.lead_query
{
    public class dal_lead_query
    {
        msSqlHelper ms = null;

        public dal_lead_query()
        {
            ms = new msSqlHelper();
        }

        #region 费用统计
        public DataTable get_order_fee_group( 
            string rec_or_pay,
            string c_id,
            string record_id,
            string sales_id,
            string service_id,
            string operation_id,

            string fee_cu_id,
            string fee_dat_begin_year,
            string fee_dat_begin_month,
            string fee_dat_end_year,
            string fee_dat_end_month )
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
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_order_fee_group", lst_in, ref lst_out);
              
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 

        #region 根据员工统计
        public DataTable get_rpt_of_worker_group(
            string c_id ,
	        string worker_user_typ ,
	        string u_id , 
	        string beg_year,
	        string end_year,
	        string beg_month ,
	        string end_month , 
	        ref string out_sum_of_order_count ,
	        ref string out_sum_of_cargo_weight,
	        ref string out_sum_of_cargo_packing_number ,
	        ref string out_sum_of_cargo_bluk ,
	        ref string out_sum_of_cntr_u ,
	        ref string out_sum_of_cntr_t ,
	        ref string out_sum_of_20 ,
	        ref string out_sum_of_40 ,
	        ref string out_sum_of_45 ,
	        ref string out_sum_of_rec_amount,
	        ref string out_sum_of_rec_amount_of_base,
	        ref string out_sum_of_reced_amount ,
	        ref string out_sum_of_reced_amount_of_base,
	        ref string out_sum_of_unreced_amount,
	        ref string out_sum_of_unreced_amount_of_base,
	        ref string out_sum_of_pay_amount,
	        ref string out_sum_of_pay_amount_of_base,
	        ref string out_sum_of_payed_amount,
	        ref string out_sum_of_payed_amount_of_base,
	        ref string out_sum_of_unpayed_amount,
	        ref string out_sum_of_unpayed_amount_of_base,
	        ref string out_sum_of_profit_amoun,
	        ref string out_sum_of_profit_amount_of_base,
	        ref string out_sum_of_percent_profit)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@worker_user_typ", worker_user_typ));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@out_sum_of_order_count",SqlDbType.Money);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@out_sum_of_cargo_weight",SqlDbType.Money);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                SqlParameter p3 = new SqlParameter("@out_sum_of_cargo_packing_number",SqlDbType.NVarChar,2000);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);
	            SqlParameter p4 = new SqlParameter("@out_sum_of_cargo_bluk",SqlDbType.Money);
                p4.Direction = ParameterDirection.Output;
                lst_out.Add(p4); 
                SqlParameter p5 = new SqlParameter("@out_sum_of_cntr_u",SqlDbType.Int);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5); 
                SqlParameter p6 = new SqlParameter("@out_sum_of_cntr_t",SqlDbType.Money);
                p6.Direction = ParameterDirection.Output;
                lst_out.Add(p6);  
                SqlParameter p7 = new SqlParameter("@out_sum_of_20",SqlDbType.Int);
                p7.Direction = ParameterDirection.Output;
                lst_out.Add(p7);
                SqlParameter p8 = new SqlParameter("@out_sum_of_40",SqlDbType.Int);
                p8.Direction = ParameterDirection.Output;
                lst_out.Add(p8);
                SqlParameter p9 = new SqlParameter("@out_sum_of_45",SqlDbType.Int);
                p9.Direction = ParameterDirection.Output;
                lst_out.Add(p9); 
                SqlParameter p10 = new SqlParameter("@out_sum_of_rec_amount",SqlDbType.NVarChar,2000);
                p10.Direction = ParameterDirection.Output;
                lst_out.Add(p10);
	            SqlParameter p11 = new SqlParameter("@out_sum_of_rec_amount_of_base",SqlDbType.Money);
                p11.Direction = ParameterDirection.Output;
                lst_out.Add(p11); 
	            SqlParameter p12 = new SqlParameter("@out_sum_of_reced_amount",SqlDbType.NVarChar,2000);
                p12.Direction = ParameterDirection.Output;
                lst_out.Add(p12);
	            SqlParameter p13 = new SqlParameter("@out_sum_of_reced_amount_of_base",SqlDbType.Money);
                p13.Direction = ParameterDirection.Output;
                lst_out.Add(p13); 
	            SqlParameter p14 = new SqlParameter("@out_sum_of_unreced_amount",SqlDbType.NVarChar,2000);
                p14.Direction = ParameterDirection.Output;
                lst_out.Add(p14);
	            SqlParameter p15 = new SqlParameter("@out_sum_of_unreced_amount_of_base",SqlDbType.Money);
                p15.Direction = ParameterDirection.Output;
                lst_out.Add(p15); 
	            SqlParameter p16 = new SqlParameter("@out_sum_of_pay_amount",SqlDbType.NVarChar,2000);
                p16.Direction = ParameterDirection.Output;
                lst_out.Add(p16);
	            SqlParameter p17 = new SqlParameter("@out_sum_of_pay_amount_of_base",SqlDbType.Money);
                p17.Direction = ParameterDirection.Output;
                lst_out.Add(p17); 
	            SqlParameter p18 = new SqlParameter("@out_sum_of_payed_amount",SqlDbType.NVarChar,2000);
                p18.Direction = ParameterDirection.Output;
                lst_out.Add(p18);
	            SqlParameter p19 = new SqlParameter("@out_sum_of_payed_amount_of_base",SqlDbType.Money);
                p19.Direction = ParameterDirection.Output;
                lst_out.Add(p19); 
	            SqlParameter p20 = new SqlParameter("@out_sum_of_unpayed_amount",SqlDbType.NVarChar,2000);
                p20.Direction = ParameterDirection.Output;
                lst_out.Add(p20);
	            SqlParameter p21 = new SqlParameter("@out_sum_of_unpayed_amount_of_base",SqlDbType.Money);
                p21.Direction = ParameterDirection.Output;
                lst_out.Add(p21); 
	            SqlParameter p22 = new SqlParameter("@out_sum_of_profit_amount",SqlDbType.NVarChar,2000);
                p22.Direction = ParameterDirection.Output;
                lst_out.Add(p22);
	            SqlParameter p23 = new SqlParameter("@out_sum_of_profit_amount_of_base",SqlDbType.Money);
                p23.Direction = ParameterDirection.Output;
                lst_out.Add(p23); 
	            SqlParameter p24 = new SqlParameter("@out_sum_of_percent_profit",SqlDbType.NVarChar,2000);
                p24.Direction = ParameterDirection.Output;
                lst_out.Add(p24); 

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_worker_group", lst_in, ref lst_out);

                out_sum_of_order_count = lst_out[0].Value.ToString();
	            out_sum_of_cargo_weight= lst_out[1].Value.ToString();
	            out_sum_of_cargo_packing_number = lst_out[2].Value.ToString();
	            out_sum_of_cargo_bluk = lst_out[3].Value.ToString();
	            out_sum_of_cntr_u = lst_out[4].Value.ToString();
	            out_sum_of_cntr_t = lst_out[5].Value.ToString();
	            out_sum_of_20 = lst_out[6].Value.ToString();
	            out_sum_of_40 = lst_out[7].Value.ToString();
	            out_sum_of_45 = lst_out[8].Value.ToString();
	            out_sum_of_rec_amount= lst_out[9].Value.ToString();
	            out_sum_of_rec_amount_of_base= lst_out[10].Value.ToString();
	            out_sum_of_reced_amount = lst_out[11].Value.ToString();
	            out_sum_of_reced_amount_of_base= lst_out[12].Value.ToString();
	            out_sum_of_unreced_amount= lst_out[13].Value.ToString();
	            out_sum_of_unreced_amount_of_base= lst_out[14].Value.ToString();
	            out_sum_of_pay_amount= lst_out[15].Value.ToString();
	            out_sum_of_pay_amount_of_base= lst_out[16].Value.ToString();
	            out_sum_of_payed_amount= lst_out[17].Value.ToString();
	            out_sum_of_payed_amount_of_base= lst_out[18].Value.ToString();
	            out_sum_of_unpayed_amount= lst_out[19].Value.ToString();
	            out_sum_of_unpayed_amount_of_base= lst_out[20].Value.ToString();
	            out_sum_of_profit_amoun= lst_out[21].Value.ToString();
	            out_sum_of_profit_amount_of_base= lst_out[22].Value.ToString();
	            out_sum_of_percent_profit= lst_out[23].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //查询相关委托
        public DataTable  get_rpt_of_worker_group_of_order_list(
            string c_id,
            string worker_user_typ,
            string u_id,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string rowcount,
            ref string group_fee_desc 
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@worker_user_typ", worker_user_typ));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar,2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                
                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_worker_group_of_order_list", lst_in, ref lst_out);

                rowcount = lst_out[0].Value.ToString();
                group_fee_desc = lst_out[1].Value.ToString();
              

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询相关费用 分应收应付 
        public DataTable  get_rpt_of_worker_group_of_fee_list(
            string c_id,
            string worker_user_typ,
            string u_id,
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month, 
            ref string group_fee_desc
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@worker_user_typ", worker_user_typ));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>(); 
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_worker_group_of_fee_list", lst_in, ref lst_out);
 
                group_fee_desc = lst_out[0].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //集装箱信息 
        public DataTable get_rpt_of_worker_group_of_cntr_list(
            string c_id,
            string worker_user_typ,
            string u_id, 
            string beg_year,
            string end_year,
            string beg_month,
            string end_month 
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@worker_user_typ", worker_user_typ));
                lst_in.Add(new SqlParameter("@u_id", u_id)); 
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_worker_group_of_cntr_list", lst_in, ref lst_out);

               
                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
         
        #region 根据委托客户统计
        public DataTable get_rpt_of_delegate_group(
            string c_id,
            string delete_id,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string out_sum_of_order_count,
            ref string out_sum_of_cargo_weight,
            ref string out_sum_of_cargo_packing_number,
            ref string out_sum_of_cargo_bluk,
            ref string out_sum_of_cntr_u,
            ref string out_sum_of_cntr_t,
            ref string out_sum_of_20,
            ref string out_sum_of_40,
            ref string out_sum_of_45,
            ref string out_sum_of_rec_amount,
            ref string out_sum_of_rec_amount_of_base,
            ref string out_sum_of_reced_amount,
            ref string out_sum_of_reced_amount_of_base,
            ref string out_sum_of_unreced_amount,
            ref string out_sum_of_unreced_amount_of_base,
            ref string out_sum_of_pay_amount,
            ref string out_sum_of_pay_amount_of_base,
            ref string out_sum_of_payed_amount,
            ref string out_sum_of_payed_amount_of_base,
            ref string out_sum_of_unpayed_amount,
            ref string out_sum_of_unpayed_amount_of_base,
            ref string out_sum_of_profit_amoun,
            ref string out_sum_of_profit_amount_of_base,
            ref string out_sum_of_percent_profit)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@delete_id", delete_id));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@out_sum_of_order_count", SqlDbType.Money);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@out_sum_of_cargo_weight", SqlDbType.Money);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                SqlParameter p3 = new SqlParameter("@out_sum_of_cargo_packing_number", SqlDbType.NVarChar, 2000);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);
                SqlParameter p4 = new SqlParameter("@out_sum_of_cargo_bluk", SqlDbType.Money);
                p4.Direction = ParameterDirection.Output;
                lst_out.Add(p4);
                SqlParameter p5 = new SqlParameter("@out_sum_of_cntr_u", SqlDbType.Int);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5);
                SqlParameter p6 = new SqlParameter("@out_sum_of_cntr_t", SqlDbType.Money);
                p6.Direction = ParameterDirection.Output;
                lst_out.Add(p6);
                SqlParameter p7 = new SqlParameter("@out_sum_of_20", SqlDbType.Int);
                p7.Direction = ParameterDirection.Output;
                lst_out.Add(p7);
                SqlParameter p8 = new SqlParameter("@out_sum_of_40", SqlDbType.Int);
                p8.Direction = ParameterDirection.Output;
                lst_out.Add(p8);
                SqlParameter p9 = new SqlParameter("@out_sum_of_45", SqlDbType.Int);
                p9.Direction = ParameterDirection.Output;
                lst_out.Add(p9);
                SqlParameter p10 = new SqlParameter("@out_sum_of_rec_amount", SqlDbType.NVarChar, 2000);
                p10.Direction = ParameterDirection.Output;
                lst_out.Add(p10);
                SqlParameter p11 = new SqlParameter("@out_sum_of_rec_amount_of_base", SqlDbType.Money);
                p11.Direction = ParameterDirection.Output;
                lst_out.Add(p11);
                SqlParameter p12 = new SqlParameter("@out_sum_of_reced_amount", SqlDbType.NVarChar, 2000);
                p12.Direction = ParameterDirection.Output;
                lst_out.Add(p12);
                SqlParameter p13 = new SqlParameter("@out_sum_of_reced_amount_of_base", SqlDbType.Money);
                p13.Direction = ParameterDirection.Output;
                lst_out.Add(p13);
                SqlParameter p14 = new SqlParameter("@out_sum_of_unreced_amount", SqlDbType.NVarChar, 2000);
                p14.Direction = ParameterDirection.Output;
                lst_out.Add(p14);
                SqlParameter p15 = new SqlParameter("@out_sum_of_unreced_amount_of_base", SqlDbType.Money);
                p15.Direction = ParameterDirection.Output;
                lst_out.Add(p15);
                SqlParameter p16 = new SqlParameter("@out_sum_of_pay_amount", SqlDbType.NVarChar, 2000);
                p16.Direction = ParameterDirection.Output;
                lst_out.Add(p16);
                SqlParameter p17 = new SqlParameter("@out_sum_of_pay_amount_of_base", SqlDbType.Money);
                p17.Direction = ParameterDirection.Output;
                lst_out.Add(p17);
                SqlParameter p18 = new SqlParameter("@out_sum_of_payed_amount", SqlDbType.NVarChar, 2000);
                p18.Direction = ParameterDirection.Output;
                lst_out.Add(p18);
                SqlParameter p19 = new SqlParameter("@out_sum_of_payed_amount_of_base", SqlDbType.Money);
                p19.Direction = ParameterDirection.Output;
                lst_out.Add(p19);
                SqlParameter p20 = new SqlParameter("@out_sum_of_unpayed_amount", SqlDbType.NVarChar, 2000);
                p20.Direction = ParameterDirection.Output;
                lst_out.Add(p20);
                SqlParameter p21 = new SqlParameter("@out_sum_of_unpayed_amount_of_base", SqlDbType.Money);
                p21.Direction = ParameterDirection.Output;
                lst_out.Add(p21);
                SqlParameter p22 = new SqlParameter("@out_sum_of_profit_amount", SqlDbType.NVarChar, 2000);
                p22.Direction = ParameterDirection.Output;
                lst_out.Add(p22);
                SqlParameter p23 = new SqlParameter("@out_sum_of_profit_amount_of_base", SqlDbType.Money);
                p23.Direction = ParameterDirection.Output;
                lst_out.Add(p23);
                SqlParameter p24 = new SqlParameter("@out_sum_of_percent_profit", SqlDbType.NVarChar, 2000);
                p24.Direction = ParameterDirection.Output;
                lst_out.Add(p24);

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_delegate_group", lst_in, ref lst_out);

                out_sum_of_order_count = lst_out[0].Value.ToString();
                out_sum_of_cargo_weight = lst_out[1].Value.ToString();
                out_sum_of_cargo_packing_number = lst_out[2].Value.ToString();
                out_sum_of_cargo_bluk = lst_out[3].Value.ToString();
                out_sum_of_cntr_u = lst_out[4].Value.ToString();
                out_sum_of_cntr_t = lst_out[5].Value.ToString();
                out_sum_of_20 = lst_out[6].Value.ToString();
                out_sum_of_40 = lst_out[7].Value.ToString();
                out_sum_of_45 = lst_out[8].Value.ToString();
                out_sum_of_rec_amount = lst_out[9].Value.ToString();
                out_sum_of_rec_amount_of_base = lst_out[10].Value.ToString();
                out_sum_of_reced_amount = lst_out[11].Value.ToString();
                out_sum_of_reced_amount_of_base = lst_out[12].Value.ToString();
                out_sum_of_unreced_amount = lst_out[13].Value.ToString();
                out_sum_of_unreced_amount_of_base = lst_out[14].Value.ToString();
                out_sum_of_pay_amount = lst_out[15].Value.ToString();
                out_sum_of_pay_amount_of_base = lst_out[16].Value.ToString();
                out_sum_of_payed_amount = lst_out[17].Value.ToString();
                out_sum_of_payed_amount_of_base = lst_out[18].Value.ToString();
                out_sum_of_unpayed_amount = lst_out[19].Value.ToString();
                out_sum_of_unpayed_amount_of_base = lst_out[20].Value.ToString();
                out_sum_of_profit_amoun = lst_out[21].Value.ToString();
                out_sum_of_profit_amount_of_base = lst_out[22].Value.ToString();
                out_sum_of_percent_profit = lst_out[23].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //查询相关委托
        public DataTable get_rpt_of_delegate_group_of_order_list(
            string c_id,
            string delete_id,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string rowcount,
            ref string group_fee_desc
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@delete_id", delete_id));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_delegate_group_of_order_list", lst_in, ref lst_out);

                rowcount = lst_out[0].Value.ToString();
                group_fee_desc = lst_out[1].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询相关费用 分应收应付 
        public DataTable get_rpt_of_delegate_group_of_fee_list(
            string c_id, 
            string delete_id,
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string group_fee_desc
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@delete_id", delete_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_delegate_group_of_fee_list", lst_in, ref lst_out);

                group_fee_desc = lst_out[0].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //集装箱信息 
        public DataTable get_rpt_of_delegate_group_of_cntr_list(
            string c_id, 
            string delete_id,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@delete_id", delete_id));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_delegate_group_of_cntr_list", lst_in, ref lst_out);


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
         
        #region 根据结算单位统计
        public DataTable get_rpt_of_fee_cu_group(
            string c_id,
            string fee_cu_id,
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            
            ref string out_sum_of_rec_amount,
            ref string out_sum_of_rec_amount_of_base,
            ref string out_sum_of_reced_amount,
            ref string out_sum_of_reced_amount_of_base,
            ref string out_sum_of_unreced_amount,
            ref string out_sum_of_unreced_amount_of_base,
            ref string out_sum_of_pay_amount,
            ref string out_sum_of_pay_amount_of_base,
            ref string out_sum_of_payed_amount,
            ref string out_sum_of_payed_amount_of_base,
            ref string out_sum_of_unpayed_amount,
            ref string out_sum_of_unpayed_amount_of_base )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
               
                SqlParameter p10 = new SqlParameter("@out_sum_of_rec_amount", SqlDbType.NVarChar, 2000);
                p10.Direction = ParameterDirection.Output;
                lst_out.Add(p10);
                SqlParameter p11 = new SqlParameter("@out_sum_of_rec_amount_of_base", SqlDbType.Money);
                p11.Direction = ParameterDirection.Output;
                lst_out.Add(p11);
                SqlParameter p12 = new SqlParameter("@out_sum_of_reced_amount", SqlDbType.NVarChar, 2000);
                p12.Direction = ParameterDirection.Output;
                lst_out.Add(p12);
                SqlParameter p13 = new SqlParameter("@out_sum_of_reced_amount_of_base", SqlDbType.Money);
                p13.Direction = ParameterDirection.Output;
                lst_out.Add(p13);
                SqlParameter p14 = new SqlParameter("@out_sum_of_unreced_amount", SqlDbType.NVarChar, 2000);
                p14.Direction = ParameterDirection.Output;
                lst_out.Add(p14);
                SqlParameter p15 = new SqlParameter("@out_sum_of_unreced_amount_of_base", SqlDbType.Money);
                p15.Direction = ParameterDirection.Output;
                lst_out.Add(p15);
                SqlParameter p16 = new SqlParameter("@out_sum_of_pay_amount", SqlDbType.NVarChar, 2000);
                p16.Direction = ParameterDirection.Output;
                lst_out.Add(p16);
                SqlParameter p17 = new SqlParameter("@out_sum_of_pay_amount_of_base", SqlDbType.Money);
                p17.Direction = ParameterDirection.Output;
                lst_out.Add(p17);
                SqlParameter p18 = new SqlParameter("@out_sum_of_payed_amount", SqlDbType.NVarChar, 2000);
                p18.Direction = ParameterDirection.Output;
                lst_out.Add(p18);
                SqlParameter p19 = new SqlParameter("@out_sum_of_payed_amount_of_base", SqlDbType.Money);
                p19.Direction = ParameterDirection.Output;
                lst_out.Add(p19);
                SqlParameter p20 = new SqlParameter("@out_sum_of_unpayed_amount", SqlDbType.NVarChar, 2000);
                p20.Direction = ParameterDirection.Output;
                lst_out.Add(p20);
                SqlParameter p21 = new SqlParameter("@out_sum_of_unpayed_amount_of_base", SqlDbType.Money);
                p21.Direction = ParameterDirection.Output;
                lst_out.Add(p21);
                
                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_fee_cu_group", lst_in, ref lst_out);

                
                out_sum_of_rec_amount = lst_out[0].Value.ToString();
                out_sum_of_rec_amount_of_base = lst_out[1].Value.ToString();
                out_sum_of_reced_amount = lst_out[2].Value.ToString();
                out_sum_of_reced_amount_of_base = lst_out[3].Value.ToString();
                out_sum_of_unreced_amount = lst_out[4].Value.ToString();
                out_sum_of_unreced_amount_of_base = lst_out[5].Value.ToString();
                out_sum_of_pay_amount = lst_out[6].Value.ToString();
                out_sum_of_pay_amount_of_base = lst_out[7].Value.ToString();
                out_sum_of_payed_amount = lst_out[8].Value.ToString();
                out_sum_of_payed_amount_of_base = lst_out[9].Value.ToString();
                out_sum_of_unpayed_amount = lst_out[10].Value.ToString();
                out_sum_of_unpayed_amount_of_base = lst_out[11].Value.ToString();
                

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //查询相关委托
        public DataTable get_rpt_of_fee_cu_group_of_order_list(
            string c_id,
            string fee_cu_id,
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string rowcount,
            ref string group_fee_desc
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_fee_cu_group_of_order_list", lst_in, ref lst_out);

                rowcount = lst_out[0].Value.ToString();
                group_fee_desc = lst_out[1].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询相关费用 分应收应付 
        public DataTable get_rpt_of_fee_cu_group_of_fee_list(
            string c_id,
            string fee_cu_id,
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string group_fee_desc
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_fee_cu_group_of_fee_list", lst_in, ref lst_out);

                group_fee_desc = lst_out[0].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

         
        #endregion  

        #region 利润分析表
        public DataTable get_rpt_of_order_typ_group(
            string c_id, 
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string out_sum_of_order_count, 
            ref string out_sum_of_cntr_u,
            ref string out_sum_of_cntr_t,
            ref string out_sum_of_20,
            ref string out_sum_of_40,
            ref string out_sum_of_45,
            ref string out_sum_of_rec_amount,
            ref string out_sum_of_rec_amount_of_base,
            ref string out_sum_of_reced_amount,
            ref string out_sum_of_reced_amount_of_base,
            ref string out_sum_of_unreced_amount,
            ref string out_sum_of_unreced_amount_of_base,
            ref string out_sum_of_pay_amount,
            ref string out_sum_of_pay_amount_of_base,
            ref string out_sum_of_payed_amount,
            ref string out_sum_of_payed_amount_of_base,
            ref string out_sum_of_unpayed_amount,
            ref string out_sum_of_unpayed_amount_of_base,
            ref string out_sum_of_profit_amoun,
            ref string out_sum_of_profit_amount_of_base,
            ref string out_sum_of_percent_profit)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id)); 
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@out_sum_of_order_count", SqlDbType.Money);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 
                SqlParameter p5 = new SqlParameter("@out_sum_of_cntr_u", SqlDbType.Int);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5);
                SqlParameter p6 = new SqlParameter("@out_sum_of_cntr_t", SqlDbType.Money);
                p6.Direction = ParameterDirection.Output;
                lst_out.Add(p6);
                SqlParameter p7 = new SqlParameter("@out_sum_of_20", SqlDbType.Int);
                p7.Direction = ParameterDirection.Output;
                lst_out.Add(p7);
                SqlParameter p8 = new SqlParameter("@out_sum_of_40", SqlDbType.Int);
                p8.Direction = ParameterDirection.Output;
                lst_out.Add(p8);
                SqlParameter p9 = new SqlParameter("@out_sum_of_45", SqlDbType.Int);
                p9.Direction = ParameterDirection.Output;
                lst_out.Add(p9);
                SqlParameter p10 = new SqlParameter("@out_sum_of_rec_amount", SqlDbType.NVarChar, 2000);
                p10.Direction = ParameterDirection.Output;
                lst_out.Add(p10);
                SqlParameter p11 = new SqlParameter("@out_sum_of_rec_amount_of_base", SqlDbType.Money);
                p11.Direction = ParameterDirection.Output;
                lst_out.Add(p11);
                SqlParameter p12 = new SqlParameter("@out_sum_of_reced_amount", SqlDbType.NVarChar, 2000);
                p12.Direction = ParameterDirection.Output;
                lst_out.Add(p12);
                SqlParameter p13 = new SqlParameter("@out_sum_of_reced_amount_of_base", SqlDbType.Money);
                p13.Direction = ParameterDirection.Output;
                lst_out.Add(p13);
                SqlParameter p14 = new SqlParameter("@out_sum_of_unreced_amount", SqlDbType.NVarChar, 2000);
                p14.Direction = ParameterDirection.Output;
                lst_out.Add(p14);
                SqlParameter p15 = new SqlParameter("@out_sum_of_unreced_amount_of_base", SqlDbType.Money);
                p15.Direction = ParameterDirection.Output;
                lst_out.Add(p15);
                SqlParameter p16 = new SqlParameter("@out_sum_of_pay_amount", SqlDbType.NVarChar, 2000);
                p16.Direction = ParameterDirection.Output;
                lst_out.Add(p16);
                SqlParameter p17 = new SqlParameter("@out_sum_of_pay_amount_of_base", SqlDbType.Money);
                p17.Direction = ParameterDirection.Output;
                lst_out.Add(p17);
                SqlParameter p18 = new SqlParameter("@out_sum_of_payed_amount", SqlDbType.NVarChar, 2000);
                p18.Direction = ParameterDirection.Output;
                lst_out.Add(p18);
                SqlParameter p19 = new SqlParameter("@out_sum_of_payed_amount_of_base", SqlDbType.Money);
                p19.Direction = ParameterDirection.Output;
                lst_out.Add(p19);
                SqlParameter p20 = new SqlParameter("@out_sum_of_unpayed_amount", SqlDbType.NVarChar, 2000);
                p20.Direction = ParameterDirection.Output;
                lst_out.Add(p20);
                SqlParameter p21 = new SqlParameter("@out_sum_of_unpayed_amount_of_base", SqlDbType.Money);
                p21.Direction = ParameterDirection.Output;
                lst_out.Add(p21);
                SqlParameter p22 = new SqlParameter("@out_sum_of_profit_amount", SqlDbType.NVarChar, 2000);
                p22.Direction = ParameterDirection.Output;
                lst_out.Add(p22);
                SqlParameter p23 = new SqlParameter("@out_sum_of_profit_amount_of_base", SqlDbType.Money);
                p23.Direction = ParameterDirection.Output;
                lst_out.Add(p23);
                SqlParameter p24 = new SqlParameter("@out_sum_of_percent_profit", SqlDbType.NVarChar, 2000);
                p24.Direction = ParameterDirection.Output;
                lst_out.Add(p24);

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_order_typ_group", lst_in, ref lst_out);

                out_sum_of_order_count = lst_out[0].Value.ToString();
         
                out_sum_of_cntr_u = lst_out[1].Value.ToString();
                out_sum_of_cntr_t = lst_out[2].Value.ToString();
                out_sum_of_20 = lst_out[3].Value.ToString();
                out_sum_of_40 = lst_out[4].Value.ToString();
                out_sum_of_45 = lst_out[5].Value.ToString();
                out_sum_of_rec_amount = lst_out[6].Value.ToString();
                out_sum_of_rec_amount_of_base = lst_out[7].Value.ToString();
                out_sum_of_reced_amount = lst_out[8].Value.ToString();
                out_sum_of_reced_amount_of_base = lst_out[9].Value.ToString();
                out_sum_of_unreced_amount = lst_out[10].Value.ToString();
                out_sum_of_unreced_amount_of_base = lst_out[11].Value.ToString();
                out_sum_of_pay_amount = lst_out[12].Value.ToString();
                out_sum_of_pay_amount_of_base = lst_out[13].Value.ToString();
                out_sum_of_payed_amount = lst_out[14].Value.ToString();
                out_sum_of_payed_amount_of_base = lst_out[15].Value.ToString();
                out_sum_of_unpayed_amount = lst_out[16].Value.ToString();
                out_sum_of_unpayed_amount_of_base = lst_out[17].Value.ToString();
                out_sum_of_profit_amoun = lst_out[18].Value.ToString();
                out_sum_of_profit_amount_of_base = lst_out[19].Value.ToString();
                out_sum_of_percent_profit = lst_out[20].Value.ToString();

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        ////查询相关委托
        //public DataTable get_rpt_of_fee_cu_group_of_order_list(
        //    string c_id,
        //    string fee_cu_id,
        //    string rec_or_pay,
        //    string beg_year,
        //    string end_year,
        //    string beg_month,
        //    string end_month,
        //    ref string rowcount,
        //    ref string group_fee_desc
        //    )
        //{
        //    try
        //    {
        //        List<SqlParameter> lst_in = new List<SqlParameter>();
        //        lst_in.Add(new SqlParameter("@c_id", c_id));
        //        lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
        //        lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
        //        lst_in.Add(new SqlParameter("@beg_year", beg_year));
        //        lst_in.Add(new SqlParameter("@end_year", end_year));
        //        lst_in.Add(new SqlParameter("@beg_month", beg_month));
        //        lst_in.Add(new SqlParameter("@end_month", end_month));
        //        List<SqlParameter> lst_out = new List<SqlParameter>();
        //        SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
        //        p1.Direction = ParameterDirection.Output;
        //        lst_out.Add(p1);
        //        SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar, 2000);
        //        p2.Direction = ParameterDirection.Output;
        //        lst_out.Add(p2);

        //        DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_fee_cu_group_of_order_list", lst_in, ref lst_out);

        //        rowcount = lst_out[0].Value.ToString();
        //        group_fee_desc = lst_out[1].Value.ToString();


        //        return dt;

        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        ////查询相关费用 分应收应付 
        //public DataTable get_rpt_of_fee_cu_group_of_fee_list(
        //    string c_id,
        //    string fee_cu_id,
        //    string rec_or_pay,
        //    string beg_year,
        //    string end_year,
        //    string beg_month,
        //    string end_month,
        //    ref string group_fee_desc
        //    )
        //{
        //    try
        //    {
        //        List<SqlParameter> lst_in = new List<SqlParameter>();
        //        lst_in.Add(new SqlParameter("@c_id", c_id));
        //        lst_in.Add(new SqlParameter("@fee_cu_id", fee_cu_id));
        //        lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
        //        lst_in.Add(new SqlParameter("@beg_year", beg_year));
        //        lst_in.Add(new SqlParameter("@end_year", end_year));
        //        lst_in.Add(new SqlParameter("@beg_month", beg_month));
        //        lst_in.Add(new SqlParameter("@end_month", end_month));
        //        List<SqlParameter> lst_out = new List<SqlParameter>();
        //        SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar, 2000);
        //        p2.Direction = ParameterDirection.Output;
        //        lst_out.Add(p2);

        //        DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_fee_cu_group_of_fee_list", lst_in, ref lst_out);

        //        group_fee_desc = lst_out[0].Value.ToString();


        //        return dt;

        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}


        #endregion  

        #region 根据船舶统计
        public DataTable get_rpt_of_ship_group(
            string c_id, 
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string out_sum_of_order_count, 
            ref string out_sum_of_cntr_u,
            ref string out_sum_of_cntr_t,
            ref string out_sum_of_20,
            ref string out_sum_of_40,
            ref string out_sum_of_45 )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
               
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@out_sum_of_order_count", SqlDbType.Money);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 
                SqlParameter p5 = new SqlParameter("@out_sum_of_cntr_u", SqlDbType.Int);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5);
                SqlParameter p6 = new SqlParameter("@out_sum_of_cntr_t", SqlDbType.Money);
                p6.Direction = ParameterDirection.Output;
                lst_out.Add(p6);
                SqlParameter p7 = new SqlParameter("@out_sum_of_20", SqlDbType.Int);
                p7.Direction = ParameterDirection.Output;
                lst_out.Add(p7);
                SqlParameter p8 = new SqlParameter("@out_sum_of_40", SqlDbType.Int);
                p8.Direction = ParameterDirection.Output;
                lst_out.Add(p8);
                SqlParameter p9 = new SqlParameter("@out_sum_of_45", SqlDbType.Int);
                p9.Direction = ParameterDirection.Output;
                lst_out.Add(p9);
                
                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_ship_group", lst_in, ref lst_out);

                out_sum_of_order_count = lst_out[0].Value.ToString();
               
                out_sum_of_cntr_u = lst_out[1].Value.ToString();
                out_sum_of_cntr_t = lst_out[2].Value.ToString();
                out_sum_of_20 = lst_out[3].Value.ToString();
                out_sum_of_40 = lst_out[4].Value.ToString();
                out_sum_of_45 = lst_out[5].Value.ToString();
              

                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //查询相关委托
        public DataTable get_rpt_of_ship_group_of_order_list(
            string od_route_tools_desc,
            string od_route_tools_no,
            string od_route_tools_owner,
            string c_id, 
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string rowcount,
            ref string group_fee_desc
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@od_route_tools_desc", od_route_tools_desc));
                lst_in.Add(new SqlParameter("@od_route_tools_no", od_route_tools_no));
                lst_in.Add(new SqlParameter("@od_route_tools_owner", od_route_tools_owner));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_ship_group_of_order_list", lst_in, ref lst_out);

                rowcount = lst_out[0].Value.ToString();
                group_fee_desc = lst_out[1].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //查询相关费用 分应收应付 
        public DataTable get_rpt_of_ship_group_of_fee_list(
            string od_route_tools_desc,
            string od_route_tools_no,
            string od_route_tools_owner,
            string c_id, 
            string rec_or_pay,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month,
            ref string group_fee_desc
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@od_route_tools_desc", od_route_tools_desc));
                lst_in.Add(new SqlParameter("@od_route_tools_no", od_route_tools_no));
                lst_in.Add(new SqlParameter("@od_route_tools_owner", od_route_tools_owner));
                lst_in.Add(new SqlParameter("@rec_or_pay", rec_or_pay));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.VarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_ship_group_of_fee_list", lst_in, ref lst_out);

                group_fee_desc = lst_out[0].Value.ToString();


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //集装箱信息 
        public DataTable get_rpt_of_ship_group_of_cntr_list(
            string od_route_tools_desc,
            string od_route_tools_no,
            string od_route_tools_owner,
            string c_id,
           
            string beg_year,
            string end_year,
            string beg_month,
            string end_month
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@od_route_tools_desc", od_route_tools_desc));
                lst_in.Add(new SqlParameter("@od_route_tools_no", od_route_tools_no));
                lst_in.Add(new SqlParameter("@od_route_tools_owner", od_route_tools_owner));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_ship_group_of_cntr_list", lst_in, ref lst_out);


                return dt;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 未结算完整的统计
        public DataTable  get_rpt_of_unwoa_group(
            string c_id, 
            string u_id,
            string beg_year,
            string end_year,
            string beg_month,
            string end_month )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id)); 
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@beg_year", beg_year));
                lst_in.Add(new SqlParameter("@end_year", end_year));
                lst_in.Add(new SqlParameter("@beg_month", beg_month));
                lst_in.Add(new SqlParameter("@end_month", end_month));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_lead_p_get_rpt_of_unwoa_group", lst_in, ref lst_out);
 

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
