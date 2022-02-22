using mySqlHelper.Local;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace DAL.ship
{
    public class cy_contract
    {
        msSqlHelper ms = null;
        public cy_contract()
        {
            ms = new msSqlHelper();
        }

        #region 新建CY合同
        public bool insert_cy_contract(
            string cyc_desc,
            string cyc_port_id,
            string cyc_sign_dat,
            string cyc_create_by_id,
            string cyc_begin_dat,
            string cyc_end_dat,
            string cyc_c_id,
            ref string cyc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cyc_desc", cyc_desc));
                lst_in.Add(new SqlParameter("@cyc_port_id", cyc_port_id));
                lst_in.Add(new SqlParameter("@cyc_sign_dat", cyc_sign_dat));
                lst_in.Add(new SqlParameter("@cyc_create_by_id", cyc_create_by_id));
                lst_in.Add(new SqlParameter("@cyc_begin_dat", cyc_begin_dat));
                lst_in.Add(new SqlParameter("@cyc_end_dat", cyc_end_dat));
                lst_in.Add(new SqlParameter("@cyc_c_id", cyc_c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@cyc_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_insert_cy_contract", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                cyc_id = lst_out[1].Value.ToString();

                if (result == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 拷贝 新建CY合同
        public bool insert_cy_contract_by_copy(
            string res_cyc_id,
            string cyc_desc,
            string cyc_port_id,
            string cyc_sign_dat,
            string cyc_create_by_id,
            string cyc_begin_dat,
            string cyc_end_dat,
            string cyc_c_id,
            ref string cyc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@res_cyc_id", res_cyc_id));
                lst_in.Add(new SqlParameter("@cyc_desc", cyc_desc));
                lst_in.Add(new SqlParameter("@cyc_port_id", cyc_port_id));
                lst_in.Add(new SqlParameter("@cyc_sign_dat", cyc_sign_dat));
                lst_in.Add(new SqlParameter("@cyc_create_by_id", cyc_create_by_id));
                lst_in.Add(new SqlParameter("@cyc_begin_dat", cyc_begin_dat));
                lst_in.Add(new SqlParameter("@cyc_end_dat", cyc_end_dat));
                lst_in.Add(new SqlParameter("@cyc_c_id", cyc_c_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@cyc_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_insert_cy_contract_by_copy", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                cyc_id = lst_out[1].Value.ToString();

                if (result == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改CY合同
        public bool update_cy_contract(
            string cyc_id,
            string cyc_desc,
            string cyc_port_id,
            string cyc_sign_dat,
            string cyc_begin_dat,
            string cyc_end_dat,
            string cyc_valid)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cyc_id", cyc_id));
                lst_in.Add(new SqlParameter("@cyc_desc", cyc_desc));
                lst_in.Add(new SqlParameter("@cyc_port_id", cyc_port_id));
                lst_in.Add(new SqlParameter("@cyc_sign_dat", cyc_sign_dat));
                lst_in.Add(new SqlParameter("@cyc_begin_dat", cyc_begin_dat));
                lst_in.Add(new SqlParameter("@cyc_end_dat", cyc_end_dat));
                lst_in.Add(new SqlParameter("@cyc_valid", cyc_valid));


                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_fe_p_update_cy_contract", lst_in, ref lst_out);
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
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除CY合同
        public bool delete_cy_contract(string cyc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cyc_id", cyc_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_delete_cy_contract", lst_in, ref lst_out);
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
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取所有CY合同
        public DataTable get_cy_contract(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_get_cy_contract", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取所有CY费项
        public DataTable get_cy_feeitem(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_get_cy_feeitem", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 合同添加费项
        public bool insert_cy_contract_feeitem(
            string cyc_id,
            string cfi_id,
            string cy_cu_id,
            string cyc_invoice_typ,
            string cyc_cr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cyc_id", cyc_id));
                lst_in.Add(new SqlParameter("@cfi_id", cfi_id));
                lst_in.Add(new SqlParameter("@cy_cu_id", cy_cu_id));
                lst_in.Add(new SqlParameter("@cyc_invoice_typ", cyc_invoice_typ));
                lst_in.Add(new SqlParameter("@cyc_cr_id", cyc_cr_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_fe_p_insert_cy_contract_feeitem", lst_in, ref lst_out);
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
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 合同修改费项目-修改收费单位
        public bool update_cy_contract_feeitem(
            string cyc_id,
            string cfi_id,
            string cy_cu_id,
            string cyc_invoice_typ,
            string cyc_cr_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cyc_id", cyc_id));
                lst_in.Add(new SqlParameter("@cfi_id", cfi_id));
                lst_in.Add(new SqlParameter("@cy_cu_id", cy_cu_id));
                lst_in.Add(new SqlParameter("@cyc_invoice_typ", cyc_invoice_typ));
                lst_in.Add(new SqlParameter("@cyc_cr_id", cyc_cr_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_fe_p_update_cy_contract_feeitem", lst_in, ref lst_out);
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
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 合同删除费项
        public bool delete_cy_contract_fee_item(
            string cyc_id,
            string cfi_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cyc_id", cyc_id));
                lst_in.Add(new SqlParameter("@cfi_id", cfi_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_fe_p_delete_cy_contract_fee_item", lst_in, ref lst_out);
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
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取合同下面的费项
        public DataTable get_cy_contract_feeitem(
            string cyc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cyc_id", cyc_id));

                List<SqlParameter> lst_out = null;


                DataTable dt = ms.excuteStoredProcedureData("_fe_p_get_cy_contract_feeitem", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion



        #region 获取合同下面的费项 计费规则
        public DataTable get_cy_contract_details(
            string cyc_id,
            string cfi_id
           )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cyc_id", cyc_id));
                lst_in.Add(new SqlParameter("@cfi_id", cfi_id));
              
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_get_cy_contract_details", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 修改金额
        #region 设置费用
        public bool update_cy_contract_details(
            string cyc_id,
            string cfi_id,
            string seqs, 
            string fee_val)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@cyc_id", cyc_id));
                lst_in.Add(new SqlParameter("@cfi_id", cfi_id));
                lst_in.Add(new SqlParameter("@seqs", seqs)); 
                lst_in.Add(new SqlParameter("@fee_val", fee_val));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_fe_p_update_cy_contract_details", lst_in, ref lst_out);
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
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

    }
}
