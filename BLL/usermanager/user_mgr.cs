using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace BLL.usermanager
{
    
   public class user_mgr
    {
       DAL.usermanager.user_mgr dal_us = null;
       public user_mgr()
       {
           dal_us = new DAL.usermanager.user_mgr();
       }

       #region 用户自主管理
       #region 修改密码
       public string update_pwd(string u_id, string old_pwd, string new_pwd)
       {
           try
           {
               bool b = dal_us.update_pwd(u_id, old_pwd, new_pwd);

               return BLL.commone.BLL_commone.result_convert_json(b?1:0,
                   b?"修改密码完成":"错误:请联系管理员处理");
           }
           catch (Exception)
           {
               
               throw;
           }
       }
       #endregion

       #region 获取个人资料
       public string get_myinfo(string u_id)
       {
           try
           { 
               DataTable dt = dal_us.get_myinfo(u_id);

               return BLL.commone.BLL_commone.data_convert_json(dt);
               
           }
           catch (Exception)
           {
               
               throw;
           }
       }
       #endregion

       #region 修改个人资料
       public string update_myinfo(string uid, string realname,
            string phone, string email, string qq, string vx)
       {
           try
           {

               bool b = dal_us.update_myinfo(uid, realname,   phone, email, qq, vx);
               return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                   b ? "修改个人资料完成" : "错误:请联系管理员处理");
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
       public string insert_user(string u_login_name,
            string u_real_name,
            string u_pwd,
            string u_phone,
            string u_email,
            string u_qq,
            string u_wx,
            string u_admin_flag,
            string u_creat_by_id)
       {
           try
           {
               string u_id = string.Empty;

               bool b = dal_us.insert_user(u_login_name, u_real_name, u_pwd,
                   u_phone, u_email, u_qq, u_wx, u_admin_flag, u_creat_by_id, ref u_id);

               List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
               lst.Add(new KeyValuePair<string, string>("u_id",u_id));

               return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增人员成功" : "错误: 已存在相同账号“" + u_login_name + "”的人员信息。",lst);

           }
           catch (Exception)
           {

               throw;
           }
       }
        #endregion

       #region 修改用户
       public string update_user(string u_id, 
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

               bool b = dal_us.update_user(u_id,u_login_name,
                   u_real_name, 
                   u_pwd, 
                   u_phone, 
                   u_email, 
                   u_qq, 
                   u_wx,
                   u_admin_flag,
                   u_valid);

               return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "修改人员信息完成" : "错误: 已存在相同账号“" + u_login_name + "”信息的人员。");
           }
           catch (Exception)
           {

               throw;
           }
       }
        #endregion

       #region 删除用户
       public string delete_user(string u_ids)
       {
           try
           {
               bool b = dal_us.delete_user(u_ids);

               return BLL.commone.BLL_commone.result_convert_json(b?1:0,b?"删除人员完成":"错误:出现异常，请联系管理员处理");
           }
           catch (Exception)
           {

               throw;
           }
       }
        #endregion

       #region 重置密码
       
       public string reset_user_password(string u_id)
       {
           try
           {
               bool b = dal_us.reset_user_password(u_id);

               return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "重置人员密码完成" : "错误:出现异常，请联系管理员处理");
           }
           catch (Exception e)
           { 
               throw e;
           }
       }
       
       #endregion

       #region 获取用户列表
       public string get_userlist()
       {
           try
           {  
               DataTable dt = dal_us.get_userlist();
               return BLL.commone.BLL_commone.data_convert_json(dt);
               
           }
           catch (Exception e)
           { 
               throw e;
           }
       }

       public string get_userlist_pub()
       {
           try
           {
               DataTable dt = dal_us.get_userlist();
               return BLL.commone.BLL_commone.data_convert_jsonarray(dt);

           }
           catch (Exception e)
           {
               throw e;
           }
       }
       public string get_userlist(string c_id)
       {
           try
           {
               DataTable dt = dal_us.get_userlist(c_id);
               return BLL.commone.BLL_commone.data_convert_json(dt);

           }
           catch (Exception e)
           {
               throw e;
           }
       }

       public string get_userlist_pub(string c_id)
       {
           try
           {
               DataTable dt = dal_us.get_userlist(c_id);
               return BLL.commone.BLL_commone.data_convert_jsonarray(dt);

           }
           catch (Exception e)
           {
               throw e;
           }
       }

       #endregion

       #endregion 

       #region 用户登录

       #region 登陆后得到所属公司

       public string get_company_list_after_login(string u_id)
       {
           try
           {
               DataTable dt_company = dal_us.get_company_list_after_login(u_id); 
               return commone.BLL_commone.data_convert_jsonarray(dt_company);

           }
           catch (Exception e)
           {
               throw e;
           }
       }

       #endregion

       #region 登录系统
       public string login_sys(string u_loginname, string u_pwd)
       {
           try
           {

               int result = 0;


               DataTable dt = dal_us.login_sys(u_loginname, u_pwd, ref result);

               List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

               lst.Add(new KeyValuePair<string, string>("user_info",
                   commone.BLL_commone.data_convert_jsonarray(dt)));

               if (result == 1)
               {
                   DataRow dr = dt.Rows[0];

                   string u_id = dr["u_id"].ToString();

                   string json_company_list = get_company_list_after_login(u_id);

                   lst.Add(new KeyValuePair<string, string>("company_list",json_company_list));
               }

               return commone.BLL_commone.result_convert_json(result == 1 ? 1 : 0,
                   result == 1 ? "登录成功" : "错误: 密码或用户名错误。", lst);



           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion

       #region 登出系统
       public void logout_sys(string u_id)
       {
           try
           { 
                dal_us.logout_sys(u_id); 
           }
           catch (Exception)
           { 
               throw;
           }
       }
       #endregion

       #region 微信登录
       public string login_vx(string e_loginnam, string e_pwd, string e_openid)
       {
           try
           {
               int result = 0;


               DataTable dt = dal_us.login_vx(e_loginnam, e_pwd, e_openid, ref result);
 
               return BLL.commone.BLL_commone.data_convert_json(dt);
                
           }
           catch (Exception)
           {

               throw;
           }
       }
       #endregion

       #region 微信退出
       public string out_vx(string u_id)
       {
           try
           {


               bool r = dal_us.out_vx(u_id);

               if (r)
               {
                   return "{\"result\":1}";
               }
               else
               {
                   return "{\"result\":0}";
               }
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
