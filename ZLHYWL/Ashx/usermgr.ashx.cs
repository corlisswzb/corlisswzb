using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace SDZL.Ashx
{
    /// <summary>
    /// usermgr 的摘要说明
    /// </summary>
    public class usermgr : IHttpHandler, IRequiresSessionState
    {
       
        HttpSessionState Session = null;
        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;
            Session = context.Session;
            string url = HttpContext.Current.Request.Url.Host;
             
            string ACTION = req.Params["action"] == null ? string.Empty : req.Params["action"].ToString();
            
            switch (ACTION)
            {
                #region 用户管理
                case "insert_user":
                    {
                        insert_user(req, res);
                    }
                    break;
                case "update_user":
                    {
                        update_user(req, res);
                    }
                    break;
                case "delete_user":
                    {
                        delete_user(req, res);
                    }
                    break;
                case "get_userlist":
                    {
                        get_userlist(req, res);
                    }
                    break;

                case "reset_user_password":
                    {
                        reset_user_password(req, res);
                    }
                    break;
                #endregion

                #region 用户登录
                case "loginsys":
                    {
                        loginsys(req, res);
                    }
                    break;
                case "getcompanylist":
                    {
                        getcompanylist(req, res);
                    }
                    break;
                case "logincompany":
                    {
                        logincompany(req, res);
                    }
                    break;
                case "loginsys_vx":
                    {
                        loginsys_vx(req, res);
                    }
                    break;
                case "out_wx":
                    {
                        out_wx(req, res);
                    }
                    break;
                case "out_system":
                    {
                        out_system(req, res);
                    }
                    break;
                #endregion

                #region 用户自主管理
                case "update_pwd":
                    {
                        update_pwd(req, res);
                    }
                    break;
                case "get_myinfo":
                    {
                        get_myinfo(req, res);
                    }
                    break;
                case "update_myinfo":
                    {
                        update_myinfo(req, res);
                    }
                    break; 
                #endregion

                #region 时间管理
                case "getSessionDate":
                    {
                        getSessionDate(req, res);
                    }
                    break;
                #endregion
            }
        }

        #region 时间 返回
        public void getSessionDate(HttpRequest req, HttpResponse res)
        {
            try
            {
                JObject jo = new JObject();

                if (Session["u_id"] == null)
                {
                    jo["sessionout"] = 1;
                }
                else
                {
                    jo["sessionout"] = 0;
                }

                jo["sysdate"] = DateTime.Now.ToString("yyyy-MM-dd HH:mm");

                res.Write( jo.ToString());
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("usermgr.getSessionDate",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }


        #endregion 

        #region 用户管理 

        #region 获取用户列表
        private void get_userlist(HttpRequest req, HttpResponse res)
        {
            try
            {
                 

                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                    return;
                }
                
                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();
                string json = bll_us.get_userlist();
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("usermgr.get_userlist",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 删除用户
        private void delete_user(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                    return;
                }
                string u_ids = req.Params["u_ids"] == null ? string.Empty : req.Params["u_ids"].ToString();
                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();
                string json = bll_us.delete_user(u_ids);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("usermgr.delete_user",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 修改用户
        private void update_user(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                    return;
                }
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string u_login_name = req.Params["u_login_name"] == null ? string.Empty : req.Params["u_login_name"].ToString();
                string u_real_name = req.Params["u_real_name"] == null ? string.Empty : req.Params["u_real_name"].ToString();
                string u_pwd = req.Params["u_pwd"] == null ? string.Empty : req.Params["u_pwd"].ToString();

                string u_phone = req.Params["u_phone"] == null ? string.Empty : req.Params["u_phone"].ToString();
                string u_email = req.Params["u_email"] == null ? string.Empty : req.Params["u_email"].ToString();
                string u_qq = req.Params["u_qq"] == null ? string.Empty : req.Params["u_qq"].ToString();
                string u_wx = req.Params["u_wx"] == null ? string.Empty : req.Params["u_wx"].ToString();
                string u_admin_flag = req.Params["u_admin_flag"] == null ? string.Empty : req.Params["u_admin_flag"].ToString();
                string u_valid = req.Params["u_valid"] == null ? string.Empty : req.Params["u_valid"].ToString();
                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();
                string json = bll_us.update_user(u_id, u_login_name, u_real_name, u_pwd,
                      u_phone, u_email, u_qq, u_wx, u_admin_flag, u_valid);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("usermgr.update_user",
                System.DateTime.Now.ToString(),
                e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion 

        #region 新增用户
        private void insert_user(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                    return;
                }
                 
                string u_login_name = req.Params["u_login_name"] == null ? string.Empty : req.Params["u_login_name"].ToString();
                string u_real_name = req.Params["u_real_name"] == null ? string.Empty : req.Params["u_real_name"].ToString();
                string u_pwd = req.Params["u_pwd"] == null ? string.Empty : req.Params["u_pwd"].ToString();

                //md5加密
                //if (!string.IsNullOrEmpty(u_pwd))
                //{
                //    u_pwd = BLL.commone.BLL_commone.GetMD5_String(u_pwd);
                //} 
                string u_phone = req.Params["u_phone"] == null ? string.Empty : req.Params["u_phone"].ToString();
                string u_email = req.Params["u_email"] == null ? string.Empty : req.Params["u_email"].ToString();
                string u_qq = req.Params["u_qq"] == null ? string.Empty : req.Params["u_qq"].ToString();
                string u_wx = req.Params["u_wx"] == null ? string.Empty : req.Params["u_wx"].ToString();
                string u_admin_flag = req.Params["u_admin_flag"] == null ? string.Empty : req.Params["u_admin_flag"].ToString();
                
                string u_creat_by_id = Session["u_id"].ToString();

                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();
                string json = bll_us.insert_user(u_login_name, u_real_name, u_pwd, 
                    u_phone, u_email, u_qq, u_wx,u_admin_flag, u_creat_by_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("usermgr.insert_user",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion 

        #region 重置密码
        private void reset_user_password(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                    return;
                }

                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                
                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();
                string json = bll_us.reset_user_password(u_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("usermgr.reset_user_password",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #endregion

        #region 用户登录
        #region 记录选择的 公司账套
        private void logincompany(HttpRequest req, HttpResponse res)
        {
            try
            {
                string company_id = req.Params["cpy_id"] == null ? string.Empty : req.Params["cpy_id"].ToString();
                Session.Add("cpy_id", company_id);

                BLL.schema_cto.bul_schema_cto sc = new BLL.schema_cto.bul_schema_cto();

                string company_desc = sc.get_schema_cto_desc_by_c_id(company_id);

                Session.Add("cpy_desc", company_desc);
                
                string u_id = Session["u_id"].ToString();

                //string json = bc.get_basesettingCollections(u_id,company_id);
                JObject data_item = new JObject();// (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                bool isoperation = sc.isoperation_limit_by_u_id(company_id, u_id);
                data_item["result"] = 1;
                data_item["href"] = isoperation?"order_group.aspx":"ld_query_order_group.aspx";
                res.Write(data_item.ToString()); 
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("system_set.logincompany",
                    System.DateTime.Now.ToString(),
                    e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 登入系统
        private void loginsys(HttpRequest req, HttpResponse res)
        {
            try
            {

                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();
                string u_loginname = req.Params["u_loginname"] == null ? string.Empty : req.Params["u_loginname"].ToString();
                string u_pwd = req.Params["u_pwd"] == null ? string.Empty : req.Params["u_pwd"].ToString();

                int pwd_remember = Convert.ToInt32(req.Params["pwd_remember"]);

                string new_pwd = "";

                ////md5加密
                //if (!string.IsNullOrEmpty(u_pwd))
                //{
                //    new_pwd = BLL.commone.BLL_commone.GetMD5_String(u_pwd);
                //}
                string json = bll_us.login_sys(u_loginname, u_pwd);

                Newtonsoft.Json.Linq.JObject con = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                if (Convert.ToInt32(con["result"].ToString()) == 1)
                {
                    JArray lst = (JArray)con["user_info"];
                    Session.Add("u_id", lst[0]["u_id"]);
                    Session.Add("u_login_name", lst[0]["u_login_name"]);
                    Session.Add("u_real_name", lst[0]["u_real_name"]);
                    
                    Session.Add("u_image", lst[0]["u_image"]);
                 
                    if (pwd_remember == 1)
                    {
                        HttpCookie cookie = new HttpCookie("userinfo");
                        cookie.Expires = DateTime.Now.AddDays(7);

                        cookie.Values["u_loginname"] = u_loginname;
                        cookie.Values["u_pwd"] = u_pwd;

                        res.Cookies.Add(cookie);
                    }
                    else
                    {
                        res.Cookies["userinfo"].Expires = DateTime.Now.AddDays(-1);
                    }

                }

                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("system_set.loginsys",
                    System.DateTime.Now.ToString(),
                    e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        private void getcompanylist(HttpRequest req, HttpResponse res)
        {
            try
            {

                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();

                string u_id = Session["u_id"].ToString();
                string json = bll_us.get_company_list_after_login(u_id);
                 

                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("system_set.getcompanylist",
                    System.DateTime.Now.ToString(),
                    e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 退出微信
        private void out_wx(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                    return;
                }

                BLL.usermanager.user_mgr us = new BLL.usermanager.user_mgr();
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string json = us.out_vx(u_id);

                Session.Add("u_id", "");
                Session.Add("u_real_name", "");
                Session.Add("u_role", "");
                Session.Add("cpy_id", "");
                
                /*
                 * 烦死了。 
                 * 好烦死了 
                 * 我好烦啊。
                 * 
                 */



                Session.Clear();
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("system_set.out_wx",
                    System.DateTime.Now.ToString(),
                    e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);

            }
        }
        #endregion 

        #region 微信登入
        private void loginsys_vx(HttpRequest req, HttpResponse res)
        {
            try
            {

                BLL.usermanager.user_mgr us = new BLL.usermanager.user_mgr();
                string e_loginnam = req.Params["e_loginnam"] == null ? string.Empty : req.Params["e_loginnam"].ToString();
                string e_pwd = req.Params["e_pwd"] == null ? string.Empty : req.Params["e_pwd"].ToString();
                //md5加密
                //if (!string.IsNullOrEmpty(e_pwd))
                //{
                //    e_pwd = BLL.commone.BLL_commone.GetMD5_String(e_pwd);
                //}

                string e_openid = Session["open_id"].ToString();

                string json = us.login_vx(e_loginnam, e_pwd, e_openid);

                Newtonsoft.Json.Linq.JObject con = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                if (Convert.ToInt32(con["result"].ToString()) == 1)
                {
                    JArray lst = (JArray)con["rows"];
                    Session.Add("u_id", lst[0]["u_id"]);
                    Session.Add("u_login_name", lst[0]["u_login_name"]);
                    Session.Add("u_real_name", lst[0]["u_real_name"]);
                    Session.Add("u_role", lst[0]["u_role"]);
                }

                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("system_set.loginsys_vx",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);

            }
        }
        #endregion

        #region 退出系统
        private void out_system(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    Session.Clear();
                    return;
                }
                string uid = Session["u_id"].ToString();
                BLL.usermanager.user_mgr us = new BLL.usermanager.user_mgr();
                us.logout_sys(uid);

                Session.Clear();
            }
            catch (Exception e)
            {
                return;
            }
        }
        #endregion
        #endregion

        #region 用户自主管理
        #region 获取个人资料
        private void get_myinfo(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                    return;
                } 
                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();
                string uid = Session["u_id"].ToString();
                string json = bll_us.get_myinfo(uid);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("system_set.get_myinfo",
                    System.DateTime.Now.ToString(),
                    e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #endregion

        #region 修改个人资料
        private void update_myinfo(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                    return;
                }
                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();
                string uid = Session["u_id"].ToString();
                string realname = req.Params["realname"] == null ? string.Empty : req.Params["realname"].ToString();
                
                string phone = req.Params["phone"] == null ? string.Empty : req.Params["phone"].ToString();
                string email = req.Params["email"] == null ? string.Empty : req.Params["email"].ToString();
                string qq = req.Params["qq"] == null ? string.Empty : req.Params["qq"].ToString();
                string vx = req.Params["vx"] == null ? string.Empty : req.Params["vx"].ToString();

                string json = bll_us.update_myinfo(uid, realname, phone, email, qq, vx);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("system_set.update_myinfo",
                    System.DateTime.Now.ToString(),
                    e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #endregion

        #region 修改密码
        private void update_pwd(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                    return;
                }
                BLL.usermanager.user_mgr bll_us = new BLL.usermanager.user_mgr();
                string old_pwd = req.Params["old_pwd"] == null ? string.Empty : req.Params["old_pwd"].ToString();
                string new_pwd = req.Params["new_pwd"] == null ? string.Empty : req.Params["new_pwd"].ToString();
                string u_id = Session["u_id"].ToString();
                //md5加密
                //old_pwd = BLL.commone.BLL_commone.GetMD5_String(old_pwd);
                //new_pwd = BLL.commone.BLL_commone.GetMD5_String(new_pwd);

                string json = bll_us.update_pwd(u_id, old_pwd, new_pwd);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("system_set.update_pwd",
                   System.DateTime.Now.ToString(),
                   e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion
        #endregion

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}