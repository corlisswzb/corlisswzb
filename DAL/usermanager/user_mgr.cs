using mySqlHelper.Local;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text; 

namespace DAL.usermanager
{
    public class user_mgr
    {
        msSqlHelper ms = null;

        public user_mgr()
        {
            ms = new msSqlHelper();
        }



        #region 用户自主管理

        #region 修改密码
        public bool update_pwd(string u_id, string old_pwd, string new_pwd)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@old_pwd", old_pwd));
                lst_in.Add(new SqlParameter("@new_pwd", new_pwd));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_pwd", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result>0;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 获取个人资料
        public DataTable get_myinfo(string uid)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_id", uid));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_myinfo", lst_in, ref lst_out);
                
                return dt;
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 修改个人资料
        public bool update_myinfo(string uid,string realname,string phone,string email,string qq,string vx)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_id", uid));
                lst_in.Add(new SqlParameter("@u_real_name", realname)); 
                lst_in.Add(new SqlParameter("@u_phone", phone));
                lst_in.Add(new SqlParameter("@u_email", email));
                lst_in.Add(new SqlParameter("@u_qq", qq));
                lst_in.Add(new SqlParameter("@u_wx", vx));
                

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_myinfo", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result>0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #endregion

        #region 用户管理

        #region 新增用户
        public bool insert_user(string u_login_name, 
            string u_real_name, 
            string u_pwd,  
            string u_phone,  
            string u_email, 
            string u_qq, 
            string u_wx, 
            string u_admin_flag, 
            string u_creat_by_id,
            ref string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_login_name", u_login_name));
                lst_in.Add(new SqlParameter("@u_real_name", u_real_name));
                lst_in.Add(new SqlParameter("@u_pwd", u_pwd)); 
                lst_in.Add(new SqlParameter("@u_phone", u_phone));
                lst_in.Add(new SqlParameter("@u_email", u_email));
                lst_in.Add(new SqlParameter("@u_qq", u_qq));
                lst_in.Add(new SqlParameter("@u_wx", u_wx));
                lst_in.Add(new SqlParameter("@u_creat_by_id", u_creat_by_id));
                lst_in.Add(new SqlParameter("@u_amdin_flag", u_admin_flag)); 
                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);
                SqlParameter p2 = new SqlParameter("@u_id", SqlDbType.Int);
                p2.Direction = ParameterDirection.Output;
                lst_out.Add(p2);
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_insert_user", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                u_id = lst_out[1].Value.ToString();

                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 修改用户
        public bool update_user(string u_id, 
            string u_login_name,
            string u_real_name, 
            string u_pwd,  
            string u_phone,
            string u_email, 
            string u_qq, 
            string u_wx,
            string u_admin_flag,
            string u_valid)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_id", u_id));
                lst_in.Add(new SqlParameter("@u_login_name", u_login_name));
                lst_in.Add(new SqlParameter("@u_real_name", u_real_name));
                lst_in.Add(new SqlParameter("@u_pwd", u_pwd)); 
                lst_in.Add(new SqlParameter("@u_phone", u_phone));
                lst_in.Add(new SqlParameter("@u_email", u_email));
                lst_in.Add(new SqlParameter("@u_qq", u_qq));
                lst_in.Add(new SqlParameter("@u_wx", u_wx));
                lst_in.Add(new SqlParameter("@u_admin_flag", u_admin_flag));
                lst_in.Add(new SqlParameter("@u_valid", u_valid));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_update_user", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result>0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 删除用户
        public bool delete_user(string u_ids)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_ids", u_ids));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_delete_user", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result>0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 重置密码
        public bool reset_user_password(string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_id", u_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_reset_user_password", lst_in, ref lst_out);
                int result = Convert.ToInt32(lst_out[0].Value);
                return result > 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 获取用户列表
        public DataTable get_userlist()
        {
            try
            {
                List<SqlParameter> lst_in = null;

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_user_list", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataTable get_userlist(string c_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();

                lst_in.Add(new SqlParameter("c_id", @c_id));

                List<SqlParameter> lst_out = null;

                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_user_list_by_company", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion


        #region 用户登录  
        #region 登入wx
        public DataTable login_vx(string e_loginnam, string e_pwd, string e_openid, ref int result)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();

                lst_in.Add(new SqlParameter("@u_loginnam", e_loginnam));
                lst_in.Add(new SqlParameter("@u_pwd", e_pwd));
                lst_in.Add(new SqlParameter("@u_openid", e_openid));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);


                DataTable dt = ms.excuteStoredProcedureData("_bs_p_login_sys_vx", lst_in, ref lst_out);
                result = Convert.ToInt32(lst_out[0].Value);

                return dt;
            }
            catch (Exception)
            {
                
                throw;
            }

        }
        #endregion

        #region wx退出
        public bool out_vx(string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_id", u_id));

                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);


                DataTable dt = ms.excuteStoredProcedureData("_bs_p_out_wx", lst_in, ref lst_out);
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

        #region 登录后获取公司列表 tg
        public DataTable get_company_list_after_login(string u_id)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();
                lst_in.Add(new SqlParameter("@u_id", u_id));
                List<SqlParameter> lst_out = null;
                DataTable dt = ms.excuteStoredProcedureData("_bs_p_get_company_list_after_login", lst_in, ref lst_out);

                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 登录系统 tg
        public DataTable login_sys(string u_loginname, string u_pwd, ref int result)
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();

                lst_in.Add(new SqlParameter("@u_login_name", u_loginname));
                lst_in.Add(new SqlParameter("@u_pwd", u_pwd));


                List<SqlParameter> lst_out = new List<SqlParameter>();
                SqlParameter p = new SqlParameter("@result", SqlDbType.Int);
                p.Direction = ParameterDirection.Output;
                lst_out.Add(p);


                DataTable dt = ms.excuteStoredProcedureData("_bs_p_login_sys", lst_in, ref lst_out);
                result = Convert.ToInt32(lst_out[0].Value);

                return dt;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 登出系统 tg
        public void logout_sys(string u_id )
        {
            try
            {
                List<SqlParameter> lst_in = new List<SqlParameter>();

                lst_in.Add(new SqlParameter("@u_id", u_id)); 
                List<SqlParameter> lst_out = null; 
                ms.excuteStoredProcedureData("_bs_p_logout_sys", lst_in, ref lst_out);
                
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #endregion



    }
}
