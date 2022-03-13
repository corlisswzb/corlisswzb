using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using BLL.schema_cto;
using BLL.commone;


namespace ZLHYWL.Ashx
{
    /// <summary>
    /// schema_cto 的摘要说明
    /// </summary>
    public class schema_cto : IHttpHandler, IRequiresSessionState
    {
        HttpSessionState Session = null;

        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;
            Session = context.Session;
            if (Session["u_id"] == null)
            {
                res.Write("{\"sessionerror\":1}");
                return;
            }
            string ACTION = req.Params["action"] == null ? string.Empty : req.Params["action"].ToString();
            try
            {
                switch (ACTION)
                {
                    case "get_schema_cto":
                        {
                            get_schema_cto(req, res);
                        }
                        break;
                    case "insert_schema_cto":
                        {
                            insert_schema_cto(req, res);
                        }
                        break;
                    case "update_schema_cto":
                        {
                            update_schema_cto(req, res);
                        }
                        break;
                    case "delete_schema_cto":
                        {
                            delete_schema_cto(req, res);
                        }
                        break;
                    case "bind_user_schema_relation":
                        {
                            bind_user_schema_relation(req, res);
                        }
                        break;
                    case "unbind_user_schema_relation":
                        {
                            unbind_user_schema_relation(req, res);
                        }
                        break;
                    case "get_user_schema_relation":
                        {
                            get_user_schema_relation(req, res);
                        }
                        break;
                    case "get_limit_list":
                        {
                            get_limit_list(req, res);
                        }
                        break;
                    case "get_schema_and_limit":
                        {
                            get_schema_and_limit(req, res);
                        }
                        break;
                    case "bind_limit_schema_relation":
                        {
                            bind_limit_schema_relation(req, res);
                        }
                        break;
                    case "unbind_limit_schema_relation":
                        {
                            unbind_limit_schema_relation(req, res);
                        }
                        break;
                    case "get_limit_list_by_c_id":
                        {
                            get_limit_list_by_c_id(req, res);
                        }
                        break;
                    case "get_limit_list_by_u_id":
                        {
                            get_limit_list_by_u_id(req, res);
                        }
                        break;
                    case "get_can_finace":
                        {
                            get_can_finace(req, res);
                        }
                        break;
                    case "insert_schema_cto_bank_and_invoice_info":
                        {
                            insert_schema_cto_bank_and_invoice_info(req, res);
                        }
                        break;
                    case "get_schema_cto_bank_and_invoice_info":
                        {
                            get_schema_cto_bank_and_invoice_info(req, res);
                        }
                        break;
                }
            }
            catch (Exception e)
            {
                mylog.writelog("schema_cto." + ACTION,
                 System.DateTime.Now.ToString(),
                Session["u_id"].ToString() + "/" + Session["u_id"].ToString() + "/" + e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }


        #region 组织框架

        #region 获取组织框架

        public void get_schema_cto(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string json = bul.get_schema_cto();
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion


        #region 添加组织框架
        public void insert_schema_cto(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_desc = req.Params["c_desc"] == null ? string.Empty : req.Params["c_desc"].ToString();
                string c_en_desc = req.Params["c_en_desc"] == null ? string.Empty : req.Params["c_en_desc"].ToString();
                string c_address = req.Params["c_address"] == null ? string.Empty : req.Params["c_address"].ToString();
                string c_en_address = req.Params["c_en_address"] == null ? string.Empty : req.Params["c_en_address"].ToString();
                string c_relation_phone = req.Params["c_relation_phone"] == null ? string.Empty : req.Params["c_relation_phone"].ToString();

                string c_father_id = req.Params["c_father_id"] == null ? string.Empty : req.Params["c_father_id"].ToString();
                string c_typ = req.Params["c_typ"] == null ? string.Empty : req.Params["c_typ"].ToString();
                string json = bul.insert_schema_cto(c_desc,
                    c_en_desc,
                    c_address,
                    c_en_address,
                    c_relation_phone,
                    c_father_id,
                    c_typ);
                res.Write(json);
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        #endregion

        #region 修改组织框架
        public void update_schema_cto(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_desc = req.Params["c_desc"] == null ? string.Empty : req.Params["c_desc"].ToString();
                string c_en_desc = req.Params["c_en_desc"] == null ? string.Empty : req.Params["c_en_desc"].ToString();
                string c_address = req.Params["c_address"] == null ? string.Empty : req.Params["c_address"].ToString();
                string c_en_address = req.Params["c_en_address"] == null ? string.Empty : req.Params["c_en_address"].ToString();
                string c_relation_phone = req.Params["c_relation_phone"] == null ? string.Empty : req.Params["c_relation_phone"].ToString();

                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string json = bul.update_schema_cto(c_id,
                    c_desc,
                    c_en_desc,
                    c_address,
                    c_en_address,
                    c_relation_phone);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除组织框架
        public void delete_schema_cto(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();

                string json = bul.delete_schema_cto(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 关联人员到组织框架
        public void bind_user_schema_relation(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string json = bul.bind_user_schema_relation(c_id, u_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 取消关联人员到组织框架
        public void unbind_user_schema_relation(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string json = bul.unbind_user_schema_relation(c_id, u_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取关联人员的职位信息
        public void get_user_schema_relation(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();

                string json = bul.get_user_schema_relation(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取所有权限列表
        public void get_limit_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();

                string json = bul.get_limit_list();
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 组合 组织框架和权限列表
        public void get_schema_and_limit(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();

                string json = bul.get_schema_and_limit();
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 关联权限到组织框架
        public void bind_limit_schema_relation(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string l_id = req.Params["l_id"] == null ? string.Empty : req.Params["l_id"].ToString();
                string json = bul.bind_limit_schema_relation(c_id, l_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        #endregion

        #region 取消关联权限到组织框架
        public void unbind_limit_schema_relation(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string l_id = req.Params["l_id"] == null ? string.Empty : req.Params["l_id"].ToString();
                string json = bul.unbind_limit_schema_relation(c_id, l_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 通过职位得到对应的权限
        public void get_limit_list_by_c_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();
                string json = bul.get_limit_list_by_c_id(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 通过员工id获取权限列表

        public void get_limit_list_by_u_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string u_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                string json = bul.get_limit_list_by_u_id(u_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void get_can_finace(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string u_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                string json = bul.get_can_finace(u_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 银行账户
        #region 插入更新银行账户
        public void insert_schema_cto_bank_and_invoice_info(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string c_tax_no = req.Params["c_tax_no"] == null ? string.Empty : req.Params["c_tax_no"].ToString();
                string c_cn_bank_desc = req.Params["c_cn_bank_desc"] == null ? string.Empty : req.Params["c_cn_bank_desc"].ToString();
                string c_cn_bank_no = req.Params["c_cn_bank_no"] == null ? string.Empty : req.Params["c_cn_bank_no"].ToString();
                string c_cn_register_address = req.Params["c_cn_register_address"] == null ? string.Empty : req.Params["c_cn_register_address"].ToString();
                string c_cn_phone = req.Params["c_cn_phone"] == null ? string.Empty : req.Params["c_cn_phone"].ToString();
                string c_en_bank_desc = req.Params["c_en_bank_desc"] == null ? string.Empty : req.Params["c_en_bank_desc"].ToString();
                string c_en_bank_no = req.Params["c_en_bank_no"] == null ? string.Empty : req.Params["c_en_bank_no"].ToString();
                string c_en_register_address = req.Params["c_en_register_address"] == null ? string.Empty : req.Params["c_en_register_address"].ToString();
                string c_invoice_address = req.Params["c_invoice_address"] == null ? string.Empty : req.Params["c_invoice_address"].ToString();
                string c_invoice_name = req.Params["c_invoice_name"] == null ? string.Empty : req.Params["c_invoice_name"].ToString();
                string c_invoice_phone = req.Params["c_invoice_phone"] == null ? string.Empty : req.Params["c_invoice_phone"].ToString();

                bul_schema_cto bul = new bul_schema_cto();
                string json = bul.insert_schema_cto_bank_and_invoice_info(c_id,
                    c_tax_no,
                    c_cn_bank_desc,
                    c_cn_bank_no,
                    c_cn_register_address,
                    c_cn_phone,
                    c_en_bank_desc,
                    c_en_bank_no,
                    c_en_register_address,
                    c_invoice_address,
                    c_invoice_name,
                    c_invoice_phone);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 获取银行账户
        public void get_schema_cto_bank_and_invoice_info(HttpRequest req, HttpResponse res)
        {
            try
            {
                bul_schema_cto bul = new bul_schema_cto();
                string c_id = Session["cpy_id"].ToString();
                string json = bul.get_schema_cto_bank_and_invoice_info(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
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