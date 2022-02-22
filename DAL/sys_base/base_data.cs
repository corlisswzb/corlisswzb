using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using mySqlHelper.Local;
using System.Data;
using System.Data.SqlClient;
namespace DAL.sys_base
{
   
    public class base_data
    {

        msSqlHelper ms = null;
        public base_data()
        {
           ms = new msSqlHelper();
        }

        #region 付款审核付款方式
        #region 获取
        public DataTable get_pay_approval_payment_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_pay_approval_payment_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
 
        #endregion
        #endregion

        #region 业务类型
        #region 获取
        public DataTable get_order_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_order_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool get_order_typ_by_ot_desc(string ot_desc,
           string c_id, ref string ot_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ot_desc", ot_desc));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@ot_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_order_typ_by_ot_desc", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value.ToString());
                ot_id = lst_out[1].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #endregion

        #region 包装类型
        #region 新增
        public bool insert_packing(string pa_name,string c_id, ref string pa_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pa_name", pa_name));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@pa_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_packing", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                pa_id = lst_out[0].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_packing(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                List<SqlParameter> lst_out = null;
                lst_in.Add(new SqlParameter("@c_id", c_id));
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_packing", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_packing(string pa_name, string pa_id,string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pa_name", pa_name));
                lst_in.Add(new SqlParameter("@pa_id", pa_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_packing", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_packing(string pa_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pa_ids", pa_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_packing", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 项目类型
        #region 新增
        public bool insert_project(string pr_name, string pr_code,string c_id, ref string pr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pr_name", pr_name));
                lst_in.Add(new SqlParameter("@pr_code", pr_code));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@pr_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_project", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                pr_id = lst_out[1].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_project(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_project", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_project(string pr_name,string pr_code, string pr_id,string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pr_name", pr_name));
                lst_in.Add(new SqlParameter("@pr_code", pr_code));
                lst_in.Add(new SqlParameter("@pr_id", pr_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_project", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_project(string pr_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pr_ids", pr_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_project", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 费目
        #region 新增
        public bool insert_fee_item(string fee_code,
            string fee_cn,
            string fee_remark,
            string c_id,
            ref string fee_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_code", fee_code));
                lst_in.Add(new SqlParameter("@fee_cn", fee_cn));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@fee_remark", fee_remark));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@fee_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_fee_item", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                fee_id = lst_out[1].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_fee_item(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_fee_item", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_fee_item(string fee_code,
            string fee_cn,
            string fee_remark,
            string fee_id,
            string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_code", fee_code));
                lst_in.Add(new SqlParameter("@fee_cn", fee_cn));
                lst_in.Add(new SqlParameter("@fee_remark", fee_remark));
                lst_in.Add(new SqlParameter("@fee_id", fee_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_fee_item", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_fee_item(string fee_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fee_ids", fee_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_fee_item", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 货名
        #region 新增 
        public bool insert_product(string pr_name,string c_id,ref string pr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pr_name", pr_name));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@pr_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_product", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                pr_id = lst_out[0].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_product(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_product", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataTable get_product_by_page(string like_str, string c_id,
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
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
 

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_product_by_page", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public DataTable get_product_by_like_str(string like_str,string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
               
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_product_by_like_str", lst_in, ref lst_out);
                
                return dt;
            }
            catch (Exception)
            { 
                throw;
            }
        }

        public DataTable get_product_by_like_str_for_combogrid(string like_str, 
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
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_product_by_like_str_for_combogrid", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_product(string pr_name, string pr_id,string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pr_name", pr_name));
                lst_in.Add(new SqlParameter("@pr_id", pr_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                 
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_product", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                 
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_product(string pr_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pr_ids", pr_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                 
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_product", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 货运条款
        #region 新增
        public bool insert_freight(string fr_name, string fr_cn_desc,
            string c_id,ref string fr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fr_name", fr_name));
                lst_in.Add(new SqlParameter("@fr_cn_desc", fr_cn_desc));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@fr_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_freight", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                fr_id = lst_out[1].Value.ToString();

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 货运条款
        public DataTable get_freight(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_freight", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataTable get_freight_of_ship_voyage(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_freight_of_ship_voyage", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool get_frieght_by_fr_name(string fr_name,
           string c_id, ref string fr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fr_name", fr_name));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@fr_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_frieght_by_fr_name", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value.ToString());
                fr_id = lst_out[1].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_freight(string fr_name, string fr_cn_desc, string fr_id,string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fr_name", fr_name));
                lst_in.Add(new SqlParameter("@fr_cn_desc", fr_cn_desc));
                lst_in.Add(new SqlParameter("@fr_id", fr_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_freight", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                 
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_freight( string fr_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fr_ids", fr_ids)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_freight", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 船公司
        #region 新增
        public bool insert_ship_company(
            string sh_name,
            string sh_cod, 
            string c_id,
            ref string sh_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@sh_name", sh_name)); 
                lst_in.Add(new SqlParameter("@sh_cod", sh_cod));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1= new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@sh_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_ship_company", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                sh_id = lst_out[1].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_ship_company(
            string sh_id,
            string sh_name,
            string sh_cod ,
            string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@sh_name", sh_name)); 
                lst_in.Add(new SqlParameter("@sh_cod", sh_cod));
                lst_in.Add(new SqlParameter("@sh_id", sh_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1); 

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_ship_company", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 得到
        public DataTable get_ship_company(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_ship_company", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataTable  get_ship_company_by_like_str_for_combogrid(string like_str,
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
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_ship_company_by_like_str_for_combogrid", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_ship_company(
            string sh_ids )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@sh_ids", sh_ids)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_ship_company", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 发票类型
        #region 新增 
        public bool insert_invoice(string in_name,string in_val,string c_id,
            ref string in_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@in_name", in_name));
                lst_in.Add(new SqlParameter("@in_val", in_val));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@in_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_invoice", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                in_id = lst_out[1].Value.ToString();

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_invoice(string in_id,string in_name, string in_val,
            string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@in_name", in_name));
                lst_in.Add(new SqlParameter("@in_val", in_val));
                lst_in.Add(new SqlParameter("@in_id", in_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_invoice", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_invoice(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_invoice", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        } 
        #endregion
        #region 删除
        public bool delete_invoice(
            string in_ids )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@in_ids", in_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_invoice", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 贸易条款
        #region 新增 
        public bool insert_trade(string tr_name,string tr_cn_desc,string c_id,ref string tr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@tr_name", tr_name));
                lst_in.Add(new SqlParameter("@tr_cn_desc", tr_cn_desc));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@tr_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_trade", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                tr_id = lst_out[1].Value.ToString();

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_trade(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_trade", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_trade(string tr_name, string tr_cn_desc, string tr_id,string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@tr_name", tr_name));
                lst_in.Add(new SqlParameter("@tr_cn_desc", tr_cn_desc));
                lst_in.Add(new SqlParameter("@tr_id", tr_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
            
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_trade", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
               
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_trade(string tr_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@tr_ids", tr_ids)); 

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_trade", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 货币
        public DataTable get_currency(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id",c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_currency_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 计量单位
        #region 新增
        public bool insert_unit(string u_desc,string c_id, ref string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_desc", u_desc));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@u_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_unit", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                u_id = lst_out[0].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_unit(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_unit", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_unit(string u_desc, string u_id,string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_desc", u_desc));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_unit", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_unit(string u_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_ids", u_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_unit", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 联运方式
        #region 新增
        public bool insert_carriage_typ(string ca_desc,string c_id, ref string ca_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_desc", ca_desc));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@ca_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_carriage_typ", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                ca_id = lst_out[0].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_carriage_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_carriage_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_carriage_typ(string ca_desc, string ca_id,string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_desc", ca_desc));
                lst_in.Add(new SqlParameter("@ca_id", ca_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_carriage_typ", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_carriage_typ(string ca_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ca_ids", ca_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_carriage_typ", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 提单类型
        #region 新增
        public bool insert_bill_typ(string b_desc,string c_id, ref string b_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@b_desc", b_desc));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@b_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_bill_typ", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                b_id = lst_out[0].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_bill_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_bill_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_bill_typ(string b_desc, string b_id, string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@b_desc", b_desc));
                lst_in.Add(new SqlParameter("@b_id", b_id));  
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_bill_typ", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_bill_typ(string b_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@b_ids", b_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_bill_typ", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 签单方式
        #region 新增
        public bool insert_sign_bill_typ(string s_desc,string c_id, ref string s_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@s_desc", s_desc));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@s_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_sign_bill_typ", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                s_id = lst_out[0].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public DataTable get_sign_bill_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_sign_bill_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_sign_bill_typ(string s_desc, string s_id,string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@s_desc", s_desc));
                lst_in.Add(new SqlParameter("@s_id", s_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_sign_bill_typ", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_sign_bill_typ(string s_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@s_ids", s_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_sign_bill_typ", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 集散类型 --原货物类型 
        public DataTable get_boxtype(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id",c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_box_type", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 贸易类型
        public DataTable get_trade_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_trade_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 装箱方式
        public DataTable get_stuffing_container_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_stuffing_container_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 报关方式
        public DataTable  get_declare_custom_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_declare_custom_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 付款类型
        public DataTable get_payment_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id",c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_payment_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 集装箱尺寸
        public DataTable get_container_siz(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_container_siz", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 集装箱型
        public DataTable get_container_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_container_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 航线
        #region 新增
        public bool insert_voyage_line(
            string vl_desc,
            string vl_code,
            string c_id,
            ref string vl_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@vl_desc", vl_desc));
                lst_in.Add(new SqlParameter("@vl_code", vl_code));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                SqlParameter p2 = new SqlParameter("@vl_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_voyage_line", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                vl_id = lst_out[1].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public bool update_voyage_line(
            string vl_id,
            string vl_desc,
            string vl_code,
            string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@vl_desc", vl_desc));
                lst_in.Add(new SqlParameter("@vl_code", vl_code));
                lst_in.Add(new SqlParameter("@vl_id", vl_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_voyage_line", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 得到
        public DataTable get_voyage_line(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id",c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_voyage_line", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public bool delete_voyage_line(
            string vl_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@vl_ids", vl_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_voyage_line", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion 

        #region 地点 港口 码头 机场 送货地址 火车站

        #region 获取地点类型
        public DataTable get_place_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_place_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 获取地点 分页
        public DataTable get_place(string like_str,
            string pt_id,
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
                lst_in.Add(new SqlParameter("@like_str",like_str));
                lst_in.Add(new SqlParameter("@pt_id", pt_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
               
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_place", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public DataTable get_place_by_like_str_for_combogrid(string like_str, 
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
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_place_by_like_str_for_combogrid", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool get_place_by_pl_name(string pl_name,
           string c_id, ref string pl_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pl_name", pl_name));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@pl_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_place_by_pl_name", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value.ToString());
                pl_id = lst_out[1].Value.ToString();
                return result > 0;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public DataTable get_place_by_like_str(string like_str, 
            string c_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str)); 
               
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_place_by_like_str", lst_in, ref lst_out);
                
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 获取地点 联想
        public DataTable get_place_by_short(string like_str,
            string pt_id ,
            string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@pt_id", pt_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_place_by_short", lst_in, ref lst_out);
                
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 获取地点 全部
        public DataTable get_place_pub(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_place_pub", lst_in, ref lst_out); 
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 新增
        public bool insert_place(string pl_name,
            string pl_en_name,
            string pl_code,
            string pl_typ,
            string c_id,
            ref string pl_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pl_name", pl_name));
                lst_in.Add(new SqlParameter("@pl_en_name", pl_en_name));
                lst_in.Add(new SqlParameter("@pl_code", pl_code));
                lst_in.Add(new SqlParameter("@pl_typ", pl_typ));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>() ; 
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@pl_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_place", lst_in, ref lst_out);

                int result = Convert.ToInt32(lst_out[0].Value);
                pl_id = lst_out[1].Value.ToString();

                if (result == 1) return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 修改
        public bool update_place(string pl_name,
            string pl_en_name,
            string pl_code,
            string pl_typ,
            string pl_id,
            string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pl_name", pl_name));
                lst_in.Add(new SqlParameter("@pl_en_name", pl_en_name));
                lst_in.Add(new SqlParameter("@pl_code", pl_code));
                lst_in.Add(new SqlParameter("@pl_typ", pl_typ));
                lst_in.Add(new SqlParameter("@pl_id", pl_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_place", lst_in, ref lst_out);

                int result = Convert.ToInt32(lst_out[0].Value);

                if (result == 1) return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 删除
        public bool delete_place(string pl_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@pl_ids", pl_ids)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_place", lst_in, ref lst_out);

                int result = Convert.ToInt32(lst_out[0].Value);

                if (result == 1) return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #endregion
         
        #region 结算对象

        #region 获取客户类型
        public DataTable get_custom_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id",c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_custom_typ", lst_in, ref lst_out);
                return dt;

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取客户
        public DataTable get_custom(string like_str,
            string cu_type,
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
                lst_in.Add(new SqlParameter("@cu_type", cu_type));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@page", page));
                lst_in.Add(new SqlParameter("@rows", rows));
                lst_in.Add(new SqlParameter("@sort", sort));
                lst_in.Add(new SqlParameter("@ordersort", ordersort));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_custom", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_custom_by_like_str(string like_str, 
            string c_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));  
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_custom_by_like_str", lst_in, ref lst_out);
                
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public bool get_custom_by_cu_name(string cu_name,
           string c_id ,ref string cu_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cu_name", cu_name));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@cu_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_custom_by_cu_name", lst_in, ref lst_out);
                int result = Convert.ToInt32( lst_out[0].Value.ToString());
                cu_id = lst_out[1].Value.ToString(); 
                return result > 0;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public DataTable  get_custom_by_like_str_for_combogrid(string like_str, 
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
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_custom_by_like_str_for_combogrid", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 获取客户 pub
        public DataTable get_custom_pub(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_custom_pub", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 获取客户 联想
        public DataTable get_custom_by_short(string like_str,
            string cu_type,
            string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@like_str", like_str));
                lst_in.Add(new SqlParameter("@cu_type", cu_type));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_custom_short", lst_in, ref lst_out);
                
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 新增
        public bool insert_custom(string cu_name,
            string cu_code,
            string cu_short,
            string cu_type,
            string cu_create_by_id,
            string cu_duty_no,
            string cu_fee_limit_days,
            string c_id,
            string cu_pay_checkaccount_flag,
            string cu_rec_checkaccount_flag,
            ref string cu_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cu_name", cu_name));
                lst_in.Add(new SqlParameter("@cu_code", cu_code));
                lst_in.Add(new SqlParameter("@cu_short", cu_short));
                lst_in.Add(new SqlParameter("@cu_type", cu_type));
                lst_in.Add(new SqlParameter("@cu_duty_no", cu_duty_no));
                lst_in.Add(new SqlParameter("@cu_fee_limit_days", cu_fee_limit_days));
                lst_in.Add(new SqlParameter("@cu_create_by_id", cu_create_by_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@cu_pay_checkaccount_flag", cu_pay_checkaccount_flag));
                lst_in.Add(new SqlParameter("@cu_rec_checkaccount_flag", cu_rec_checkaccount_flag));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@cu_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_custom", lst_in, ref lst_out);

                int result = Convert.ToInt32(lst_out[0].Value);
                cu_id = lst_out[1].Value.ToString();

                if (result == 1) return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 修改
        public bool update_custom(string cu_name,
            string cu_code,
            string cu_short,
            string cu_type, 
            string cu_id,
            string cu_duty_no,
            string cu_fee_limit_days,
            string c_id,
            string cu_pay_checkaccount_flag,
            string cu_rec_checkaccount_flag)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cu_name", cu_name));
                lst_in.Add(new SqlParameter("@cu_code", cu_code));
                lst_in.Add(new SqlParameter("@cu_short", cu_short));
                lst_in.Add(new SqlParameter("@cu_type", cu_type));
                lst_in.Add(new SqlParameter("@cu_id", cu_id));
                lst_in.Add(new SqlParameter("@cu_duty_no", cu_duty_no));
                lst_in.Add(new SqlParameter("@cu_fee_limit_days", cu_fee_limit_days));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@cu_pay_checkaccount_flag", cu_pay_checkaccount_flag));
                lst_in.Add(new SqlParameter("@cu_rec_checkaccount_flag", cu_rec_checkaccount_flag));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_custom", lst_in, ref lst_out);

                int result = Convert.ToInt32(lst_out[0].Value);
               
                if (result == 1) return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 删除
        public bool delete_custom(string cu_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cu_ids", cu_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_custom", lst_in, ref lst_out);

                int result = Convert.ToInt32(lst_out[0].Value);

                if (result == 1) return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #endregion

        #region 银行信息
        #region 获取 通过客户ID和 是否默认 可以为空
        public DataTable get_bank_by_cu_id(string ba_cu_id,
            string ba_default_flag)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ba_cu_id", ba_cu_id));
                lst_in.Add(new SqlParameter("@ba_default_flag", ba_default_flag));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_bank_by_cu_id", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable get_bank_info_by_cu_id(string  cu_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cu_id", cu_id)); 

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_bank_info_by_cu_id", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 新增
        public bool insert_bank(string ba_cu_id,
            string ba_desc,
            string ba_card_no,
            string ba_address,
            string ba_cr_id,
            string ba_default_flag,
            ref string ba_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ba_cu_id", ba_cu_id));
                lst_in.Add(new SqlParameter("@ba_desc", ba_desc));
                lst_in.Add(new SqlParameter("@ba_card_no", ba_card_no));
                lst_in.Add(new SqlParameter("@ba_address", ba_address));
                lst_in.Add(new SqlParameter("@ba_cr_id", ba_cr_id));
                lst_in.Add(new SqlParameter("@ba_default_flag", ba_default_flag));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@ba_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_bank", lst_in, ref lst_out);

                int result = Convert.ToInt32(lst_out[0].Value);
                ba_id = lst_out[1].Value.ToString();

                if (result == 1) return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 修改
        public bool update_bank( 
            string ba_desc,
            string ba_card_no,
            string ba_address,
            string ba_cr_id,
            string ba_default_flag,
            string ba_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
       
                lst_in.Add(new SqlParameter("@ba_desc", ba_desc));
                lst_in.Add(new SqlParameter("@ba_card_no", ba_card_no));
                lst_in.Add(new SqlParameter("@ba_address", ba_address));
                lst_in.Add(new SqlParameter("@ba_cr_id", ba_cr_id));
                lst_in.Add(new SqlParameter("@ba_default_flag", ba_default_flag));
                lst_in.Add(new SqlParameter("@ba_id", ba_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_bank", lst_in, ref lst_out);

                int result = Convert.ToInt32(lst_out[0].Value);

                if (result == 1) return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #region 删除
        public bool delete_bank(string ba_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@ba_ids", ba_ids));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_bank", lst_in, ref lst_out);

                int result = Convert.ToInt32(lst_out[0].Value);

                if (result == 1) return true;
                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #endregion

        #region 运程类型
        public DataTable get_transport_typ(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id",c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_transport_typ", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region  工具 模糊查询 
        public DataTable get_tools_desc_for_combox(string like_str,
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
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_tools_desc_for_combogrid", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        } 

        #endregion 

        #region 区域
        public DataTable get_area_list(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_area_list", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool insert_area(string c_id ,string area_desc, string area_create_by_id, ref string area_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@area_desc", area_desc));
                lst_in.Add(new SqlParameter("@area_create_by_id", area_create_by_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@area_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_area", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                area_id = lst_out[1].Value.ToString();

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

        public int update_area(string area_id, string area_desc)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@area_id", area_id));
                lst_in.Add(new SqlParameter("@area_desc", area_desc));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_area", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool delete_area(string area_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@area_ids", area_ids));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_area", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

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

        #region 港口
        public DataTable get_port_list(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_port_list", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataTable  get_port_list_by_like_str_for_combogrid(string like_str,
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
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_port_list_by_like_str_for_combogrid", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        } 


        public bool insert_port(string c_id,
            string p_desc,
            string p_en_cod, 
            string area_id, 
            string cu_cy_id, 
            string cu_cov_id, 
            string cu_tally_id, 
            string cu_qua_id, 
            string p_create_by_id,
            ref string p_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@p_desc", p_desc));
                lst_in.Add(new SqlParameter("@p_en_cod", p_en_cod));
                lst_in.Add(new SqlParameter("@area_id", area_id));
                lst_in.Add(new SqlParameter("@cu_cy_id", cu_cy_id));
                lst_in.Add(new SqlParameter("@cu_cov_id", cu_cov_id));
                lst_in.Add(new SqlParameter("@cu_tally_id", cu_tally_id));
                lst_in.Add(new SqlParameter("@cu_qua_id", cu_qua_id));
                lst_in.Add(new SqlParameter("@p_create_by_id", p_create_by_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@p_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_port", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                p_id = lst_out[1].Value.ToString();

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

        public bool update_port(string p_id, string p_desc, string p_en_cod, string area_id, string cu_cy_id, string cu_cov_id, string cu_tally_id, string cu_qua_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@p_id", p_id));
                lst_in.Add(new SqlParameter("@p_desc", p_desc));
                lst_in.Add(new SqlParameter("@p_en_cod", p_en_cod));
                lst_in.Add(new SqlParameter("@area_id", area_id));
                lst_in.Add(new SqlParameter("@cu_cy_id", cu_cy_id));
                lst_in.Add(new SqlParameter("@cu_cov_id", cu_cov_id));
                lst_in.Add(new SqlParameter("@cu_tally_id", cu_tally_id));
                lst_in.Add(new SqlParameter("@cu_qua_id", cu_qua_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_port", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

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

        public bool delete_port(string p_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@p_ids", p_ids));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_port", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

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

        #region 注册 船舶 模糊查询
        public DataTable get_ship_list_by_like_str_for_combogrid(string like_str,
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
                SqlParameter p1 = new SqlParameter("@rowcount", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_ship_list_by_like_str_for_combogrid", lst_in, ref lst_out);
                rowcount = Convert.ToInt32(lst_out[0].Value);
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
