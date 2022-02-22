using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;


namespace DAL.ship
{
    public class dal_ship
    {
        msSqlHelper ms = null;
        public dal_ship()
        {
            ms = new msSqlHelper();
        }

        #region 船舶管理
        #region 获取船列表
        public DataTable get_ship_list(string like_str,
            string c_id,
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
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@rowcount", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_get_ship_list", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增/更新船
        public bool insert_update_ship(
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
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@ship_id", ship_id));
                lst_in.Add(new SqlParameter("@ship_desc", ship_desc));
                lst_in.Add(new SqlParameter("@ship_en_cod", ship_en_cod));
                lst_in.Add(new SqlParameter("@ship_en_long_cod", ship_en_long_cod));
                lst_in.Add(new SqlParameter("@ship_rent_cu_id", ship_rent_cu_id));
                lst_in.Add(new SqlParameter("@ship_relation_phone", ship_relation_phone));
                lst_in.Add(new SqlParameter("@ship_max_std_cntr_num", ship_max_std_cntr_num));
                lst_in.Add(new SqlParameter("@ship_custom_no", ship_custom_no));
                lst_in.Add(new SqlParameter("@ship_original_no", ship_original_no));
                lst_in.Add(new SqlParameter("@ship_regist_no", ship_regist_no));
                lst_in.Add(new SqlParameter("@ship_recognition_no", ship_recognition_no));
                lst_in.Add(new SqlParameter("@ship_valid", ship_valid));
                lst_in.Add(new SqlParameter("@uid", uid));
              
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@ref_shipid", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                SqlParameter p2 = new SqlParameter("@result", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_insert_update_ship", lst_in, ref lst_out);
                //string  shipid = lst_out[0].Value.ToString();
                int result = Convert.ToInt32(lst_out[1].Value);
                return (result == 1 ? true : false);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 绑定combobox
        public DataTable get_ship_by_like_str_for_combogrid(
           string like_str,
           string c_id,
           string page,
           string rows,
           string sort,
           string ordersort,
           ref int rowcount
           )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_spm_p_get_ship_list", lst_in, ref lst_out);

                rowcount = Convert.ToInt32(lst_out[0].Value);

                return dt;

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #endregion

        #region 船期管理
        #region 分页查询
        public DataTable get_ship_voyage_list(
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
            string ordersort,
            ref int rowcount,
            ref string group_fee_desc
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@voyage_no", voyage_no));
                lst_in.Add(new SqlParameter("@ship_id", ship_id));
                lst_in.Add(new SqlParameter("@vl_id", vl_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@status_id", status_id));

                lst_in.Add(new SqlParameter("@etd_begin", etd_begin));
                lst_in.Add(new SqlParameter("@etd_end", etd_end));

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

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_get_ship_voyage", lst_in, ref lst_out);

                rowcount = Convert.ToInt32(lst_out[0].Value);
                group_fee_desc = lst_out[1].Value.ToString();

                return dt;

            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region combogrid查询
        public DataTable get_ship_voyage_by_like_str_for_combogrid(
            string like_str,
            string c_id,
            string page,
            string rows,
            string sort,
            string ordersort,
            ref int rowcount
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_spm_p_get_ship_voyage_by_like_str_for_combogrid", lst_in, ref lst_out);

                rowcount = Convert.ToInt32(lst_out[0].Value);

                return dt;

            }
            catch (Exception)
            {
                
                throw;
            }
        }

         
        #endregion

        #region 删除船期
        public int delete_ship_voyage(string ship_no)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_no", ship_no));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_delete_ship_voyage", lst_in, ref lst_out);

                return Convert.ToInt32(lst_out[0].Value.ToString()) ;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 关闭航次
        public int close_ship_voyage(
            string ship_no,
            string complete_by_uid
            )
        {
            try
            {

                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_no", ship_no));
                lst_in.Add(new SqlParameter("@complete_by_uid", complete_by_uid));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_close_ship_voyage", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 新增船期
        public bool insert_ship_voyage(
            string ship_id,
            string voyage_no,
            string vl_id,
            string ETD,
            string ETA,
            string bak,
            string start_area_id,
            string end_area_id,
            string create_by_id,
            string c_id,
            ref string ship_no
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_id", ship_id));
                lst_in.Add(new SqlParameter("@voyage_no", voyage_no));
                lst_in.Add(new SqlParameter("@vl_id", vl_id));
                lst_in.Add(new SqlParameter("@ETD", ETD));
                lst_in.Add(new SqlParameter("@ETA", ETA));
                lst_in.Add(new SqlParameter("@bak", bak));
                lst_in.Add(new SqlParameter("@start_area_id", start_area_id));
                lst_in.Add(new SqlParameter("@end_area_id", end_area_id));
                lst_in.Add(new SqlParameter("@create_by_id", create_by_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@ship_no", SqlDbType.VarChar, 40);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_spm_p_insert_ship_voyage", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                ship_no = lst_out[1].Value.ToString();
                if (result == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 修改船期信息
        public bool update_ship_voyage(
            string ship_id,
            string ship_no,
            string voyage_no,
            string vl_id,
            string ETD,
            string ETA,
            string bak,
            string start_area_id,
            string end_area_id,
            string update_by_id
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_id", ship_id));
                lst_in.Add(new SqlParameter("@ship_no", ship_no));
                lst_in.Add(new SqlParameter("@voyage_no", voyage_no));
                lst_in.Add(new SqlParameter("@vl_id", vl_id));
                lst_in.Add(new SqlParameter("@ETD", ETD));
                lst_in.Add(new SqlParameter("@ETA", ETA));

                lst_in.Add(new SqlParameter("@bak", bak));
                lst_in.Add(new SqlParameter("@start_area_id", start_area_id));
                lst_in.Add(new SqlParameter("@end_area_id", end_area_id));
                lst_in.Add(new SqlParameter("@update_by_id", update_by_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_update_ship_voyage", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result>0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 单个查询
        public DataTable get_ship_voyage_single(
            string ship_no ,
            ref string group_fee_desc
            )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_no", ship_no)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
              
                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_get_ship_voyage_single", lst_in, ref lst_out);
                 
                group_fee_desc = lst_out[0].Value.ToString();

                return dt;

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #endregion

        #region 集装箱获取,根据船期
        public DataTable get_ship_cntr_list(string ship_no,ref string group_cntr_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_no", ship_no));

                List<SqlParameter> lst_out = new List<SqlParameter>();


                SqlParameter p2 = new SqlParameter("@group_cntr_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                
                DataTable dt = ms.excuteStoredProcedureData("_spm_p_get_ship_cntr_list", lst_in, ref lst_out);
                group_cntr_desc = lst_out[0].Value.ToString();
                return dt;
            }
            catch (Exception)
            {
                
                throw;
            }
        }


        public DataTable get_ship_cntr_group(string ship_no)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_no", ship_no));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_get_ship_cntr_group", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataTable get_ship_cntr_by_delegate_cu_id(string ship_no, 
            string c_id,
            string od_delegate_cu_id,
            string load_port,
            string disc_port,
            ref string c_desc,
            ref string down_date,
            ref string ship_desc,
            ref string ship_voyage,
            ref string load_port_desc,
            ref string disc_port_desc,
            ref string od_delegate_cu_desc )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_no", ship_no));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@od_delegate_cu_id", od_delegate_cu_id));
                lst_in.Add(new SqlParameter("@load_port", load_port));
                lst_in.Add(new SqlParameter("@disc_port", disc_port));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@c_desc", SqlDbType.NVarChar, 200);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@down_date", SqlDbType.NVarChar, 20);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                SqlParameter p3 = new SqlParameter("@ship_desc", SqlDbType.NVarChar, 200);
                p3.Direction = ParameterDirection.Output;
                lst_out.Add(p3);
                SqlParameter p4 = new SqlParameter("@ship_voyage", SqlDbType.NVarChar, 200);
                p4.Direction = ParameterDirection.Output;
                lst_out.Add(p4);
                SqlParameter p5 = new SqlParameter("@load_port_desc", SqlDbType.NVarChar, 200);
                p5.Direction = ParameterDirection.Output;
                lst_out.Add(p5);
                SqlParameter p6 = new SqlParameter("@disc_port_desc", SqlDbType.NVarChar, 200);
                p6.Direction = ParameterDirection.Output;
                lst_out.Add(p6);
                SqlParameter p7 = new SqlParameter("@od_delegate_cu_desc", SqlDbType.NVarChar, 200);
                p7.Direction = ParameterDirection.Output;
                lst_out.Add(p7);

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_get_ship_cntr_by_delegate_cu_id", lst_in, ref lst_out);
                c_desc = lst_out[0].Value.ToString();
                down_date = lst_out[1].Value.ToString();
                ship_desc = lst_out[2].Value.ToString();
                ship_voyage = lst_out[3].Value.ToString();
                load_port_desc = lst_out[4].Value.ToString();
                disc_port_desc = lst_out[5].Value.ToString();
                od_delegate_cu_desc = lst_out[6].Value.ToString();

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion


        #region 移除集装箱配载
        public int  remove_ship_cntr(string ship_no,
            string od_seq,
            string od_service_seq,
            string od_service_sub_seq,
            string od_route_seq,
            string cntr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_no", ship_no));
                lst_in.Add(new SqlParameter("@od_seq", od_seq));
                lst_in.Add(new SqlParameter("@od_service_seq", od_service_seq));
                lst_in.Add(new SqlParameter("@od_service_sub_seq", od_service_sub_seq));
                lst_in.Add(new SqlParameter("@od_route_seq", od_route_seq));
                lst_in.Add(new SqlParameter("@cntr_id", cntr_id)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_remove_ship_cntr", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result ;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        #region 计费
        public DataTable get_ship_fee_list(string ship_no, ref string group_fee_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ship_no", ship_no));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                

                SqlParameter p2 = new SqlParameter("@group_fee_desc", SqlDbType.NVarChar, 2000);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_spm_p_get_ship_fee_list", lst_in, ref lst_out);
                group_fee_desc = lst_out[0].Value.ToString();
                return dt;
            }
            catch (Exception)
            {
                
                throw;
            }
        } 
        #endregion

        
     

        


    }
}
