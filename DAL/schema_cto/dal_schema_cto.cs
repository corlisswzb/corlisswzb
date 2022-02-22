using mySqlHelper.Local;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace DAL.schema_cto
{
    public class bal_schema_cto
    {
        #region 组织框架

        #region 获取组织框架

        public DataTable get_schema_cto()
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = null;
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_schema_cto", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }

        #endregion
        #region 仅得到 公司信息

        public DataTable get_company_only()
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = null;
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_company_only", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        public DataTable  get_schema_cto_by_c_id(string c_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_schema_cto_by_c_id", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        public bool isoperation_limit_by_u_id(string c_id,
            string u_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result",SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_isoperation_limit_by_u_id", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 添加组织框架
        public bool insert_schema_cto(string c_desc,
            string c_en_desc,
            string c_address,
            string c_en_address,
            string c_relation_phone,
            string c_father_id,
            string c_typ,
            ref string c_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_desc", c_desc));
                lst_in.Add(new SqlParameter("@c_en_desc", c_en_desc));
                lst_in.Add(new SqlParameter("@c_address", c_address));
                lst_in.Add(new SqlParameter("@c_en_address", c_en_address));
                lst_in.Add(new SqlParameter("@c_relation_phone", c_relation_phone));
                lst_in.Add(new SqlParameter("@c_father_id", c_father_id));
                lst_in.Add(new SqlParameter("@c_typ", c_typ));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@c_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_schema_cto", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                c_id = lst_out[1].Value.ToString();

                if (result == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 修改组织框架
        public bool update_schema_cto(
            string c_id,
            string c_desc,
            string c_en_desc,
            string c_address,
            string c_en_address,
            string c_relation_phone)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_desc", c_desc));
                lst_in.Add(new SqlParameter("@c_en_desc", c_en_desc));
                lst_in.Add(new SqlParameter("@c_address", c_address));
                lst_in.Add(new SqlParameter("@c_en_address", c_en_address));
                lst_in.Add(new SqlParameter("@c_relation_phone", c_relation_phone));
                lst_in.Add(new SqlParameter("@c_id", c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_schema_cto", lst_in, ref lst_out);
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
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 删除组织框架
        public bool delete_schema_cto(string c_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_schema_cto", lst_in, ref lst_out);
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
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 关联人员到组织框架
        public bool bind_user_schema_relation(string c_id, string u_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_bind_user_schema_relation", lst_in, ref lst_out);
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
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 取消关联人员到组织框架
        public bool unbind_user_schema_relation(string c_id, string u_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_unbind_user_schema_relation", lst_in, ref lst_out);
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
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 获取关联人员的职位信息
        public DataTable get_user_schema_relation(string c_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_user_schema_relation", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion



        #region 得到所有权限列表

        public DataTable get_limit_list()
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = null;

                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_limit_list", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 关联权限到职位
        public bool bind_limit_schema_relation(string c_id, string l_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@l_id", l_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_bind_limit_schema_relation", lst_in, ref lst_out);
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
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 取消关联权限到职位
        public bool unbind_limit_schema_relation(string c_id, string l_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@l_id", l_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_unbind_limit_schema_relation", lst_in, ref lst_out);
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
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 通过职位得到对应的权限
        public DataTable get_limit_list_by_c_id(string c_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_limit_list_by_c_id", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 通过员工得到对应的权限
        public DataTable get_limit_list_by_u_id(string u_id,string c_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_limit_list_by_u_id", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        public bool get_can_finace(string u_id,string c_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = new List<SqlParameter>() ;
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_can_finace", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion


        #region 银行账户
        #region 插入更新银行账户
        public bool  insert_schema_cto_bank_and_invoice_info(string c_id,
            string  c_tax_no ,
	        string c_cn_bank_desc ,
	        string c_cn_bank_no ,
	        string c_cn_register_address ,
	        string c_cn_phone ,
	        string c_en_bank_desc ,
	        string c_en_bank_no ,
	        string c_en_register_address ,
	        string c_invoice_address ,
	        string c_invoice_name ,
	        string c_invoice_phone)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                lst_in.Add(new SqlParameter("@c_tax_no", c_tax_no));
                lst_in.Add(new SqlParameter("@c_cn_bank_desc", c_cn_bank_desc));
                lst_in.Add(new SqlParameter("@c_cn_bank_no", c_cn_bank_no));
                lst_in.Add(new SqlParameter("@c_cn_register_address", c_cn_register_address));
                lst_in.Add(new SqlParameter("@c_cn_phone", c_cn_phone));
                lst_in.Add(new SqlParameter("@c_en_bank_desc", c_en_bank_desc));
                lst_in.Add(new SqlParameter("@c_en_bank_no", c_en_bank_no));
                lst_in.Add(new SqlParameter("@c_en_register_address", c_en_register_address));
                lst_in.Add(new SqlParameter("@c_invoice_address", c_invoice_address));
                lst_in.Add(new SqlParameter("@c_invoice_name", c_invoice_name));
                lst_in.Add(new SqlParameter("@c_invoice_phone", c_invoice_phone));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_schema_cto_bank_and_invoice_info", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);

                return result > 0;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion
        #region 获取银行账户
        public DataTable get_schema_cto_bank_and_invoice_info(string c_id)
        {
            try
            {
                msSqlHelper ms = new msSqlHelper();
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_schema_cto_bank_and_invoice_info", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion 
        #endregion
        #endregion
    }
}
