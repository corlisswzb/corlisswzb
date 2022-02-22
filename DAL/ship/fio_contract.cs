using mySqlHelper.Local;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace DAL.ship
{
    public class fio_contract
    {
        msSqlHelper ms = null;
        public fio_contract()
        {
            ms = new msSqlHelper();
        }

        #region 新建FIO合同
        public bool insert_fio_contract(
            string fioc_desc,
            string fioc_cu_id,
            string fioc_sign_dat,
            string fioc_create_by_id,
            string fioc_begin_dat,
            string fioc_end_dat,
            string c_id,
            string fioc_invoice_typ,
            string fioc_cr_id ,
            string fioc_ship_rent_cu_id,
            ref string fioc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fioc_desc", fioc_desc));
                lst_in.Add(new SqlParameter("@fioc_cu_id", fioc_cu_id));
                lst_in.Add(new SqlParameter("@fioc_sign_dat", fioc_sign_dat));
                lst_in.Add(new SqlParameter("@fioc_create_by_id", fioc_create_by_id));
                lst_in.Add(new SqlParameter("@fioc_begin_dat", fioc_begin_dat));
                lst_in.Add(new SqlParameter("@fioc_end_dat", fioc_end_dat));
                lst_in.Add(new SqlParameter("@fioc_c_id", c_id));
                lst_in.Add(new SqlParameter("@fioc_ship_rent_cu_id", fioc_ship_rent_cu_id));
                lst_in.Add(new SqlParameter("@fioc_invoice_typ", fioc_invoice_typ));
                lst_in.Add(new SqlParameter("@fioc_cr_id", fioc_cr_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@fioc_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_insert_fio_contract", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                fioc_id = lst_out[1].Value.ToString();

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
        public bool insert_fio_contract(
             string fioc_desc,
             string fioc_cu_id,
             string fioc_sign_dat,
             string fioc_create_by_id,
             string fioc_begin_dat,
             string fioc_end_dat,
             string c_id,
             string fioc_invoice_typ,
             string fioc_cr_id,
             string fioc_ship_rent_cu_id,
             string copy_fioc_id,
             ref string fioc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fioc_desc", fioc_desc));
                lst_in.Add(new SqlParameter("@fioc_cu_id", fioc_cu_id));
                lst_in.Add(new SqlParameter("@fioc_sign_dat", fioc_sign_dat));
                lst_in.Add(new SqlParameter("@fioc_create_by_id", fioc_create_by_id));
                lst_in.Add(new SqlParameter("@fioc_begin_dat", fioc_begin_dat));
                lst_in.Add(new SqlParameter("@fioc_end_dat", fioc_end_dat));
                lst_in.Add(new SqlParameter("@fioc_c_id", c_id));
                lst_in.Add(new SqlParameter("@fioc_cr_id", fioc_cr_id));
                lst_in.Add(new SqlParameter("@fioc_invoice_typ", fioc_invoice_typ));
                lst_in.Add(new SqlParameter("@fioc_ship_rent_cu_id", fioc_ship_rent_cu_id));
                lst_in.Add(new SqlParameter("@copy_fioc_id", copy_fioc_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@fioc_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_insert_fio_contract_by_copy", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                fioc_id = lst_out[1].Value.ToString();

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

        #region 修改FIO合同
        public bool update_fio_contract(
            string fioc_id,
            string fioc_desc,
            string fioc_cu_id,
            string fioc_sign_dat,
            string fioc_begin_dat,
            string fioc_end_dat,
            string fioc_valid ,
            string fioc_invoice_typ,
            string fioc_cr_id,
            string fioc_ship_rent_cu_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fioc_id", fioc_id));
                lst_in.Add(new SqlParameter("@fioc_desc", fioc_desc));
                lst_in.Add(new SqlParameter("@fioc_cu_id", fioc_cu_id));
                lst_in.Add(new SqlParameter("@fioc_sign_dat", fioc_sign_dat));
                lst_in.Add(new SqlParameter("@fioc_valid", fioc_valid));
                lst_in.Add(new SqlParameter("@fioc_begin_dat", fioc_begin_dat));
                lst_in.Add(new SqlParameter("@fioc_end_dat", fioc_end_dat));
                lst_in.Add(new SqlParameter("@fioc_invoice_typ", fioc_invoice_typ));
                lst_in.Add(new SqlParameter("@fioc_cr_id", fioc_cr_id));
                lst_in.Add(new SqlParameter("@fioc_ship_rent_cu_id", fioc_ship_rent_cu_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_fe_p_update_fio_contract", lst_in, ref lst_out);
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

        #region 删除FIO合同
        public bool delete_fio_contract(string fioc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fioc_id", fioc_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_delete_fio_contract", lst_in, ref lst_out);
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

        #region 获取FIO合同
        public DataTable get_fio_contract(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@c_id", c_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_get_fio_contract", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 新增FIO装卸地
        public bool insert_fio_group_area(string load_area_id, string disc_area_id, string fioc_id,
            ref string fio_group_area_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@load_area_id", load_area_id));
                lst_in.Add(new SqlParameter("@disc_area_id", disc_area_id));
                lst_in.Add(new SqlParameter("@fioc_id", fioc_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@fio_group_area_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_fe_p_insert_fio_group_area", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                fio_group_area_id = lst_out[1].Value.ToString();

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

        #region 新增FIO装卸地 拷贝模式
        public bool insert_fio_group_area_by_copy( string copy_fio_group_area_id, string load_area_id, string disc_area_id, string fioc_id, ref string fio_group_area_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
               
                lst_in.Add(new SqlParameter("@copy_fio_group_area_id", copy_fio_group_area_id));
                lst_in.Add(new SqlParameter("@load_area_id", load_area_id));
                lst_in.Add(new SqlParameter("@disc_area_id", disc_area_id));
                lst_in.Add(new SqlParameter("@fioc_id", fioc_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@fio_group_area_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_fe_p_insert_fio_group_area_by_copy", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                fio_group_area_id = lst_out[1].Value.ToString();

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

        #region 新增FIO装卸地 交换模式
        public bool insert_fio_group_area_by_change(string copy_fio_group_area_id,  
            string fioc_id,
            ref string fio_group_area_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();

                lst_in.Add(new SqlParameter("@copy_fio_group_area_id", copy_fio_group_area_id)); 
                lst_in.Add(new SqlParameter("@fioc_id", fioc_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);
                SqlParameter p2 = new SqlParameter("@fio_group_area_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_fe_p_insert_fio_group_area_by_change", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                fio_group_area_id = lst_out[1].Value.ToString();

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

        #region 删除FIO装卸地点
        public bool delete_fio_group_area(string fio_group_area_id, string fioc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fio_group_area_id", fio_group_area_id));
                lst_in.Add(new SqlParameter("@fioc_id", fioc_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_delete_fio_group_area", lst_in, ref lst_out);
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

        #region 修改FIO装卸地
        public bool update_fio_group_area(
            string fio_group_area_id,
            string load_area_id,
            string disc_area_id,
            string fioc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fio_group_area_id", fio_group_area_id));
                lst_in.Add(new SqlParameter("@load_area_id", load_area_id));
                lst_in.Add(new SqlParameter("@disc_area_id", disc_area_id));
                lst_in.Add(new SqlParameter("@fioc_id", fioc_id));
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_fe_p_update_fio_group_area", lst_in, ref lst_out);
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

        #region 获取FIO装卸地
        public DataTable get_fio_group_area(string fioc_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fioc_id", fioc_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_get_fio_group_area", lst_in, ref lst_out);
                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 设置FIO地点费率
        public bool update_fio_contract_details(
            string seqs,
         
            string fee_val )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@seqs", seqs)); 
                lst_in.Add(new SqlParameter("@fee_val", fee_val)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p1 = new SqlParameter("@result", SqlDbType.Int);
                p1.Direction = ParameterDirection.Output;
                lst_out.Add(p1);


                DataTable dt = ms.excuteStoredProcedureData("_fe_p_update_fio_contract_details", lst_in, ref lst_out);
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

        #region 获取 合同费用明细
        public DataTable get_fio_contract_details(
            string fioc_id,
            string fio_group_area_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@fioc_id", fioc_id));
                lst_in.Add(new SqlParameter("@fio_group_area_id", fio_group_area_id));
                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_fe_p_get_fio_contract_details", lst_in, ref lst_out);
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
