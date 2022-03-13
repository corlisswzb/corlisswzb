using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace ZLHYWL.Ashx
{
    /// <summary>
    /// sys_base 的摘要说明
    /// </summary>
    public class sys_base : IHttpHandler, IRequiresSessionState
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

            string ACTION = req.Params["action"]== null ? string.Empty: req.Params["action"].ToString();

            switch (ACTION)
            {
                #region 基础数据
                case "get_basesettingCollections":
                    {
                        get_basesettingCollections(req, res);
                    }
                    break;
                case "get_basesettingCollections_by_c_id":
                    {
                        get_basesettingCollections_by_c_id(req, res);
                    }
                    break;
                case "get_basesettingCollections_background":
                    {
                        get_basesettingCollections_background(req, res);
                    }
                    break;
                case "get_basesettingCollections_for_approval":
                    {
                        get_basesettingCollections_for_approval(req, res);
                    }
                    break;
                #endregion 

                #region 业务类型
                case "get_order_typ_pub":
                    {
                        get_order_typ_pub(req,res);
                    }
                    break;
                #endregion 
                #region 包装类型
                case "insert_packing":
                    {
                        insert_packing(req, res);
                    }
                    break;
                case "get_packing":
                    {
                        get_packing(req, res);
                    }
                    break;
                case "update_packing":
                    {
                        update_packing(req, res);
                    }
                    break;
                case "delete_packing":
                    {
                        delete_packing(req, res);
                    }
                    break;
                #endregion
                #region 项目类型
                case "insert_project":
                    {
                        insert_project(req, res);
                    }
                    break;
                case "get_project":
                    {
                        get_project(req, res);
                    }
                    break;
                case "get_project_pub":
                    {
                        get_project_pub(req, res);
                    }
                    break;
                case "update_project":
                    {
                        update_project(req, res);
                    }
                    break;
                case "delete_project":
                    {
                        delete_project(req, res);
                    }
                    break;
                #endregion
                #region 费项
                case "insert_fee_item":
                    {
                        insert_fee_item(req, res);
                    }
                    break;
                case "get_fee_item":
                    {
                        get_fee_item(req, res);
                    }
                    break;
                case "update_fee_item":
                    {
                        update_fee_item(req, res);
                    }
                    break;
                case "delete_fee_item":
                    {
                        delete_fee_item(req, res);
                    }
                    break;
                #endregion
                #region 货币
                case "get_currency":
                    {
                        get_currency(req, res);
                    }
                    break;
                #endregion 
                #region 货名
                case "insert_product":
                    {
                        insert_product(req, res);
                    }
                    break;
                case "get_product":
                    {
                        get_product(req, res);
                    }
                    break;
                case "get_product_by_like_str":
                    {
                        get_product_by_like_str(req, res);
                    }
                    break;
                case "get_product_by_like_str_for_combogrid":
                    {
                        get_product_by_like_str_for_combogrid(req, res);
                    }
                    break;
                case "get_product_by_page":
                    {
                        get_product_by_page(req, res);
                    }
                    break;
                case "update_product":
                    {
                        update_product(req, res);
                    }
                    break;
                case "delete_product":
                    {
                        delete_product(req, res);
                    }
                    break;
                #endregion
                #region 货运条款
                case "insert_freight":
                    {
                        insert_freight(req, res);
                    }
                    break;
                case "get_freight":
                    {
                        get_freight(req, res);
                    }
                    break;
                case "update_freight":
                    {
                        update_freight(req, res);
                    }
                    break;
                case "delete_freight":
                    {
                        delete_freight(req, res);
                    }
                    break;
                #endregion
                #region 联运方式
                case "insert_carriage_typ":
                    {
                        insert_carriage_typ(req, res);
                    }
                    break;
                case "get_carriage_typ":
                    {
                        get_carriage_typ(req, res);
                    }
                    break;
                case "update_carriage_typ":
                    {
                        update_carriage_typ(req, res);
                    }
                    break;
                case "delete_carriage_typ":
                    {
                        delete_carriage_typ(req, res);
                    }
                    break;
                #endregion
                #region 提单类型
                case "insert_bill_typ":
                    {
                        insert_bill_typ(req, res);
                    }
                    break;
                case "get_bill_typ":
                    {
                        get_bill_typ(req, res);
                    }
                    break;
                case "update_bill_typ":
                    {
                        update_bill_typ(req, res);
                    }
                    break;
                case "delete_bill_typ":
                    {
                        delete_bill_typ(req, res);
                    }
                    break;
                #endregion
                #region 签单类型
                case "insert_sign_bill_typ":
                    {
                        insert_sign_bill_typ(req, res);
                    }
                    break;
                case "get_sign_bill_typ":
                    {
                        get_sign_bill_typ(req, res);
                    }
                    break;
                case "update_sign_bill_typ":
                    {
                        update_sign_bill_typ(req, res);
                    }
                    break;
                case "delete_sign_bill_typ":
                    {
                        delete_sign_bill_typ(req, res);
                    }
                    break;
                #endregion
                #region 贸易条款
                case "get_trade":
                    {
                        get_trade(req, res);
                    }
                    break;
                case "insert_trade":
                    {
                        insert_trade(req, res);
                    }
                    break;
                case "update_trade":
                    {
                        update_trade(req, res);
                    }
                    break;
                case "delete_trade":
                    {
                        delete_trade(req, res);
                    }
                    break;
                #endregion
                #region 发票类型
                case "insert_invoice":
                    {
                        insert_invoice(req, res);
                    }
                    break;
                case "get_invoice":
                    {
                        get_invoice(req, res);
                    }
                    break;
                case "update_invoice":
                    {
                        update_invoice(req, res);
                    }
                    break;
                case "delete_invoice":
                    {
                        delete_invoice(req, res);
                    }
                    break;
                #endregion
                #region 船公司
                case "get_ship_company":
                    {
                        get_ship_company(req, res);
                    }
                    break;
                case "get_ship_company_by_like_str_for_combogrid":
                    {
                        get_ship_company_by_like_str_for_combogrid(req, res);
                    }
                    break;
                case "insert_ship_company":
                    {
                        insert_ship_company(req, res);
                    }
                    break;   
                case "update_ship_company":
                    {
                        update_ship_company(req, res);
                    }
                    break;
                case "delete_ship_company":
                    {
                        delete_ship_company(req, res);
                    }
                    break;
                #endregion
                #region 地址信息
                case "get_place_typ":
                    {
                        get_place_typ(req, res);
                    }
                    break;
                case "get_place":
                    {
                        get_place(req, res);
                    }
                    break;
                case "get_place_by_like_str":
                    {
                        get_place_by_like_str(req, res);
                    }
                    break;
                case "get_place_by_short":
                    {
                        get_place_by_short(req, res);
                    }
                    break;
                case "get_place_by_like_str_for_combogrid":
                    {
                        get_place_by_like_str_for_combogrid(req, res);
                    }
                    break;
                case "insert_place":
                    {
                        insert_place(req, res);
                    }
                    break;
                case "update_place":
                    {
                        update_place(req, res);
                    }
                    break;
                case "delete_place":
                    {
                        delete_place(req, res);
                    }
                    break;

                #endregion
                #region 结算对象
                case "get_custom_typ":
                    {
                        get_custom_typ(req, res);
                    }
                    break;
                case "get_custom":
                    {
                        get_custom(req, res);
                    }
                    break;
                case "get_custom_test":
                    {
                        get_custom_test(req, res);
                    }
                    break;
               
                case "get_custom_by_like_str":
                    {
                        get_custom_by_like_str(req, res);
                    }
                    break;
                case "get_custom_by_like_str_for_combogrid":
                    {
                        get_custom_by_like_str_for_combogrid(req, res);
                    }
                    break;
                case "get_custom_by_like_str_for_combogrid_by_company_id":
                    {
                        get_custom_by_like_str_for_combogrid_by_company_id(req, res);
                    }
                    break;
                case "get_custom_by_short":
                    {
                        get_custom_by_short(req, res);
                    }
                    break;
                case "insert_custom":
                    {
                        insert_custom(req, res);
                    }
                    break;
                case "update_custom":
                    {
                        update_custom(req, res);
                    }
                    break;
                case "delete_custom":
                    {
                        delete_custom(req, res);
                    }
                    break;
                #endregion
                #region 银行信息 
                case "get_bank_by_cu_id":
                    {
                        get_bank_by_cu_id(req, res);
                    }
                    break;
                case "get_bank_info_by_cu_id":
                    {
                        get_bank_info_by_cu_id(req, res);
                    }
                    break;
                case "insert_bank":
                    {
                        insert_bank(req, res);
                    }
                    break;
                case "update_bank":
                    {
                        update_bank(req, res);
                    }
                    break;
                case "delete_bank":
                    {
                        delete_bank(req, res);
                    }
                    break;
                #endregion

                #region 计量单位
                case "insert_unit":
                    {
                        insert_unit(req, res);
                    }
                    break;
                case "get_unit":
                    {
                        get_unit(req, res);
                    }
                    break;
                case "update_unit":
                    {
                        update_unit(req, res);
                    }
                    break;
                case "delete_unit":
                    {
                        delete_unit(req, res);
                    }
                    break;
                #endregion
                #region 航线
                case "get_voyage_line":
                    {
                        get_voyage_line(req, res);
                    }
                    break;
                case "insert_voyage_line":
                    {
                        insert_voyage_line(req, res);
                    }
                    break;
                case "update_voyage_line":
                    {
                        update_voyage_line(req, res);
                    }
                    break;
                case "delete_voyage_line":
                    {
                        delete_voyage_line(req, res);
                    }
                    break;
                #endregion

                #region 工具
                case "get_tools_desc_for_combox":
                    {
                        get_tools_desc_for_combox(req, res);
                    }
                    break;
                #endregion 

                #region 区域
                case "insert_area":
                    {
                        insert_area(req, res);
                    }
                    break;
                case "update_area":
                    {
                        update_area(req, res);
                    }
                    break;
                case "delete_area":
                    {
                        delete_area(req, res);
                    }
                    break;
                #endregion
                #region 港口
                case "insert_port":
                    {
                        insert_port(req, res);
                    }
                    break;
                case "update_port":
                    {
                        update_port(req, res);
                    }
                    break;
                case "delete_port":
                    {
                        delete_port(req, res);
                    }
                    break;

                case "get_port_list_by_like_str_for_combogrid":
                    {
                        get_port_list_by_like_str_for_combogrid(req, res);
                    }
                    break;
                #endregion
                       
                #region 注册船舶模糊查询
                case "get_ship_list_by_like_str_for_combogrid":
                    {
                        get_ship_list_by_like_str_for_combogrid(req, res);
                    }
                    break;
                #endregion 
            }
        }


        #region 基础数据
        private void get_basesettingCollections_by_c_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_Collections bc = new BLL.sys_base.base_Collections();
                string u_id = Session["u_id"].ToString();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString().ToUpper();

                string json = bc.get_basesettingCollections(u_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_basesettingCollections_by_c_id",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_basesettingCollections(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_Collections bc = new BLL.sys_base.base_Collections();
                string u_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();

                string json = bc.get_basesettingCollections(u_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_basesettingCollections",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_basesettingCollections_background(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_Collections bc = new BLL.sys_base.base_Collections();
                string u_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();

                string json = bc.get_basesettingCollections_background(u_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_basesettingCollections_background",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_basesettingCollections_for_approval(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_Collections bc = new BLL.sys_base.base_Collections();
                string u_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();

                string json = bc.get_basesettingCollections_for_approval(u_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_basesettingCollections_for_approval",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 业务类型
        private void get_order_typ_pub(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString().ToUpper();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_order_typ_pub(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_order_typ_pub",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion 

        #region 货币
        private void get_currency(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_currency(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_currency",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion 

        #region 项目类型
        private void insert_project(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pr_name = req.Params["pr_name"] == null ? string.Empty : req.Params["pr_name"].ToString().ToUpper();
                string pr_code = req.Params["pr_code"] == null ? string.Empty : req.Params["pr_code"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_project(pr_name, pr_code, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_project",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_project(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_project(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_project",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        private void get_project_pub(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString().ToUpper();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_project_pub(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_project",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_project(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string pr_name = req.Params["pr_name"] == null ? string.Empty : req.Params["pr_name"].ToString().ToUpper();
                string pr_code = req.Params["pr_code"] == null ? string.Empty : req.Params["pr_code"].ToString().ToUpper();
                string pr_id = req.Params["pr_id"] == null ? string.Empty : req.Params["pr_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_project(pr_name, pr_code, pr_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_project",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_project(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string pr_ids = req.Params["pr_ids"] == null ? string.Empty : req.Params["pr_ids"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_project(pr_ids, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_project",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion 

        #region 包装
        private void insert_packing(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pa_name = req.Params["pa_name"] == null ? string.Empty : req.Params["pa_name"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_packing(pa_name,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_packing",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_packing(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_packing(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_packing",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_packing(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pa_name = req.Params["pa_name"] == null ? string.Empty : req.Params["pa_name"].ToString().ToUpper();
                string pa_id = req.Params["pa_id"] == null ? string.Empty : req.Params["pa_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_packing(pa_name, pa_id,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_packing",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_packing(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pa_ids = req.Params["pa_ids"] == null ? string.Empty : req.Params["pa_ids"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_packing(pa_ids,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_packing",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        #endregion

        #region 计量单位
        private void insert_unit(HttpRequest req, HttpResponse res)
        {
            try
            {
                string u_desc = req.Params["u_desc"] == null ? string.Empty : req.Params["u_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_unit(u_desc, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_unit",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_unit(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_unit(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_unit",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_unit(HttpRequest req, HttpResponse res)
        {
            try
            {
                string u_desc = req.Params["u_desc"] == null ? string.Empty : req.Params["u_desc"].ToString().ToUpper();
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_unit(u_desc, u_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_unit",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_unit(HttpRequest req, HttpResponse res)
        {
            try
            {
                string u_ids = req.Params["u_ids"] == null ? string.Empty : req.Params["u_ids"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_unit(u_ids, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_unit",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 费项
        private void insert_fee_item(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string fee_code = req.Params["fee_code"] == null ? string.Empty : req.Params["fee_code"].ToString().ToUpper();
                string fee_cn = req.Params["fee_cn"] == null ? string.Empty : req.Params["fee_cn"].ToString().ToUpper();
                string fee_remark = req.Params["fee_remark"] == null ? string.Empty : req.Params["fee_remark"].ToString().ToUpper();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_fee_item(fee_code, fee_cn, fee_remark, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_fee_item",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_fee_item(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_fee_item(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_fee_item",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_fee_item(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string fee_code = req.Params["fee_code"] == null ? string.Empty : req.Params["fee_code"].ToString().ToUpper();
                string fee_cn = req.Params["fee_cn"] == null ? string.Empty : req.Params["fee_cn"].ToString().ToUpper();
                string fee_remark = req.Params["fee_remark"] == null ? string.Empty : req.Params["fee_remark"].ToString().ToUpper();
                string fee_id = req.Params["fee_id"] == null ? string.Empty : req.Params["fee_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_fee_item(fee_code, fee_cn, fee_remark, fee_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_fee_item",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_fee_item(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string fee_ids = req.Params["fee_ids"] == null ? string.Empty : req.Params["fee_ids"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_fee_item(fee_ids, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_fee_item",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 货名 
        private void insert_product(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pr_name = req.Params["pr_name"] == null ? string.Empty : req.Params["pr_name"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();

                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_product(pr_name, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_product",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        private void get_product(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string c_id = Session["cpy_id"].ToString();
                string json = bc.get_product(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_product",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        
        private void get_product_by_page(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                string c_id = Session["cpy_id"].ToString();
                string json = bc.get_product_by_page(like_str, c_id,
                    page,
                    rows,
                    sort,
                    ordersort);

                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_product_by_like_str",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_product_by_like_str_for_combogrid(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'", "''"); ;
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                string c_id = Session["cpy_id"].ToString();
                string json = bc.get_product_by_like_str_for_combogrid(like_str, c_id,
                    page,
                    rows,
                    sort,
                    ordersort);

                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_product_by_like_str_for_combogrid",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_product_by_like_str(HttpRequest req, HttpResponse res)
        {
            try
            {
               BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string like_str = req.Params["q"] == null ? string.Empty : req.Params["q"].ToString();
             
                string c_id = Session["cpy_id"].ToString();
                string json = bc.get_product_by_like_str(like_str,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_product_by_like_str",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_product(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pr_name = req.Params["pr_name"] == null ? string.Empty : req.Params["pr_name"].ToString().ToUpper();
                string pr_id = req.Params["pr_id"] == null ? string.Empty : req.Params["pr_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_product(pr_name, pr_id,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_product",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_product(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pr_ids = req.Params["pr_ids"] == null ? string.Empty : req.Params["pr_ids"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_product(pr_ids,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_product",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        #endregion 

        #region 贸易条款
        private void insert_trade(HttpRequest req, HttpResponse res)
        {
            try
            {
                string tr_name = req.Params["tr_name"] == null ? string.Empty : req.Params["tr_name"].ToString().ToUpper();
                string tr_cn_desc = req.Params["tr_cn_desc"] == null ? string.Empty : req.Params["tr_cn_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();

                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_trade(tr_name, tr_cn_desc, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_trade",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_trade(HttpRequest req, HttpResponse res)
        {
            try
            {
                string tr_name = req.Params["tr_name"] == null ? string.Empty : req.Params["tr_name"].ToString().ToUpper();
                string tr_cn_desc = req.Params["tr_cn_desc"] == null ? string.Empty : req.Params["tr_cn_desc"].ToString().ToUpper();
                string tr_id = req.Params["tr_id"] == null ? string.Empty : req.Params["tr_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_trade(tr_name, tr_cn_desc, tr_id,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_trade",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_trade(HttpRequest req, HttpResponse res)
        {
            try
            {
                string tr_ids = req.Params["tr_ids"] == null ? string.Empty : req.Params["tr_ids"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_trade(tr_ids,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_trade",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_trade(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string c_id = Session["cpy_id"].ToString();
                string json = bc.get_trade(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_trade",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 货运条款
        private void insert_freight(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fr_name = req.Params["fr_name"] == null ? string.Empty : req.Params["fr_name"].ToString().ToUpper();
                string fr_cn_desc = req.Params["fr_cn_desc"] == null ? string.Empty : req.Params["fr_cn_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_freight(fr_name, fr_cn_desc, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_freight",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_freight(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fr_name = req.Params["fr_name"] == null ? string.Empty : req.Params["fr_name"].ToString().ToUpper();
                string fr_cn_desc = req.Params["fr_cn_desc"] == null ? string.Empty : req.Params["fr_cn_desc"].ToString().ToUpper();
                string fr_id = req.Params["fr_id"] == null ? string.Empty : req.Params["fr_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_freight(fr_name, fr_cn_desc, fr_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_freight",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_freight(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fr_ids = req.Params["fr_ids"] == null ? string.Empty : req.Params["fr_ids"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_freight(fr_ids, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_freight",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_freight(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_freight(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_freight",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 联运方式
        private void insert_carriage_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_desc = req.Params["ca_desc"] == null ? string.Empty : req.Params["ca_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_carriage_typ(ca_desc,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_carriage_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_carriage_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ca_desc = req.Params["ca_desc"] == null ? string.Empty : req.Params["ca_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                string ca_id = req.Params["ca_id"] == null ? string.Empty : req.Params["ca_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_carriage_typ(ca_desc, ca_id,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_carriage_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_carriage_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string ca_ids = req.Params["ca_ids"] == null ? string.Empty : req.Params["ca_ids"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_carriage_typ(ca_ids,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_carriage_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_carriage_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_carriage_typ(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_carriage_typ",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 提单类型
        private void insert_bill_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string b_desc = req.Params["b_desc"] == null ? string.Empty : req.Params["b_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_bill_typ(b_desc, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_bill_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_bill_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string b_desc = req.Params["b_desc"] == null ? string.Empty : req.Params["b_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                string b_id = req.Params["b_id"] == null ? string.Empty : req.Params["b_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_bill_typ(b_desc, b_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_bill_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_bill_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string b_ids = req.Params["b_ids"] == null ? string.Empty : req.Params["b_ids"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_bill_typ(b_ids, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_bill_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_bill_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_bill_typ(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_bill_typ",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 签单类型
        private void insert_sign_bill_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string s_desc = req.Params["s_desc"] == null ? string.Empty : req.Params["s_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_sign_bill_typ(s_desc, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_sign_bill_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_sign_bill_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string s_desc = req.Params["s_desc"] == null ? string.Empty : req.Params["s_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                string s_id = req.Params["s_id"] == null ? string.Empty : req.Params["s_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_sign_bill_typ(s_desc, s_id, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_sign_bill_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_sign_bill_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string s_ids = req.Params["s_ids"] == null ? string.Empty : req.Params["s_ids"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_sign_bill_typ(s_ids, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_sign_bill_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_sign_bill_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_sign_bill_typ(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_sign_bill_typ",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 发票类型
        private void insert_invoice(HttpRequest req, HttpResponse res)
        {
            try
            {
                string in_name = req.Params["in_name"] == null ? string.Empty : req.Params["in_name"].ToString().ToUpper();
                string in_val = req.Params["in_val"] == null ? string.Empty : req.Params["in_val"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_invoice(in_name, in_val,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_invoice",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_invoice(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_invoice(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_invoice",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void update_invoice(HttpRequest req, HttpResponse res)
        {
            try
            {
                string in_name = req.Params["in_name"] == null ? string.Empty : req.Params["in_name"].ToString().ToUpper();
                string in_val = req.Params["in_val"] == null ? string.Empty : req.Params["in_val"].ToString().ToUpper();
                string in_id = req.Params["in_id"] == null ? string.Empty : req.Params["in_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_invoice(in_id, in_name, in_val,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_invoice",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_invoice(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string in_ids = req.Params["in_ids"] == null ? string.Empty : req.Params["in_ids"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_invoice(in_ids,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_invoice",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #endregion

        #region 船公司
        private void insert_ship_company(HttpRequest req, HttpResponse res)
        {
            try
            {
                string sh_name = req.Params["sh_name"] == null ? string.Empty : req.Params["sh_name"].ToString().ToUpper();
                string sh_cod = req.Params["sh_cod"] == null ? string.Empty : req.Params["sh_cod"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_ship_company(sh_name, sh_cod, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_ship_company",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        private void update_ship_company(HttpRequest req, HttpResponse res)
        {
            try
            {
                string sh_name = req.Params["sh_name"] == null ? string.Empty : req.Params["sh_name"].ToString().ToUpper();
                string sh_cod = req.Params["sh_cod"] == null ? string.Empty : req.Params["sh_cod"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                string sh_id = req.Params["sh_id"] == null ? string.Empty : req.Params["sh_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_ship_company(sh_id, sh_name, sh_cod, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_ship_company",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_ship_company(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_ship_company(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_ship_company",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        public void get_ship_company_by_like_str_for_combogrid(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'", "''"); ;
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_ship_company_by_like_str_for_combogrid(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_ship_company_by_like_str_for_combogrid",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void delete_ship_company(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string sh_ids = req.Params["sh_ids"] == null ? string.Empty : req.Params["sh_ids"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_ship_company(sh_ids, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_ship_company",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 地址信息 港口 码头 机场 送货地址 火车站
        #region 获取地点类型
        public void get_place_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data(); 
                string json =  bd.get_place_typ(c_id); 
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_place_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        #endregion
        #region 获取地址信息 分页
        public void get_place(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string pt_id = req.Params["pt_id"] == null ? string.Empty : req.Params["pt_id"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_place(like_str,
                    pt_id,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_place",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        public void get_place_by_like_str_for_combogrid(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'", "''"); ; 
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_place_by_like_str_for_combogrid(like_str, 
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_place_by_like_str_for_combogrid",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        public void get_place_by_like_str(HttpRequest req, HttpResponse res)
        {
            try
            {
               string like_str = req.Params["q"] == null ? string.Empty : req.Params["q"].ToString();
               
              
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_place_by_like_str(like_str, 
                    c_id );
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_place_by_like_str",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        #endregion
        #region 获取地址信息 联想
        public void get_place_by_short(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string pt_id = req.Params["pt_id"] == null ? string.Empty : req.Params["pt_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_place_by_short(like_str,
                    pt_id ,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_place_by_short",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        #endregion
        #region 新增
        public void insert_place(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pl_name = req.Params["pl_name"] == null ? string.Empty : req.Params["pl_name"].ToString().ToUpper();
                string pl_en_name = req.Params["pl_en_name"] == null ? string.Empty : req.Params["pl_en_name"].ToString().ToUpper();
                string pl_code = req.Params["pl_code"] == null ? string.Empty : req.Params["pl_code"].ToString().ToUpper();
                string pl_typ = req.Params["pl_typ"] == null ? string.Empty : req.Params["pl_typ"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.insert_place(pl_name, pl_en_name, pl_code, pl_typ,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_place",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        #endregion
        #region 修改
        public void update_place(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pl_id = req.Params["pl_id"] == null ? string.Empty : req.Params["pl_id"].ToString();
                string pl_name = req.Params["pl_name"] == null ? string.Empty : req.Params["pl_name"].ToString().ToUpper();
                string pl_en_name = req.Params["pl_en_name"] == null ? string.Empty : req.Params["pl_en_name"].ToString().ToUpper();
                string pl_code = req.Params["pl_code"] == null ? string.Empty : req.Params["pl_code"].ToString().ToUpper();
                string pl_typ = req.Params["pl_typ"] == null ? string.Empty : req.Params["pl_typ"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.update_place(pl_name, pl_en_name, pl_code, pl_typ, pl_id,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_place",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        #endregion  
        #region 删除
        public void delete_place(HttpRequest req, HttpResponse res)
        {
            try
            {
                string pl_ids = req.Params["pl_ids"] == null ? string.Empty : req.Params["pl_ids"].ToString(); 
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.delete_place(pl_ids);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_place",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        } 
        #endregion
        #endregion

        #region 结算对象
        #region 获取客户类型
        public void get_custom_typ(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();

                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_custom_typ(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_custom_typ",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion
        #region 获取客户信息 分页
        public void get_custom(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string cu_type = req.Params["cu_type"] == null ? string.Empty : req.Params["cu_type"].ToString();
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();

                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_custom(like_str,
                    cu_type,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_custom",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        public void get_custom_by_like_str_for_combogrid(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'","''"); 
                
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();

                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_custom_by_like_str_for_combogrid(like_str, 
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_custom_by_like_str_for_combogrid",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        public void get_custom_by_like_str_for_combogrid_by_company_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'", "''");

                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = req.Params["c_id"] == null ? string.Empty : req.Params["c_id"].ToString();

                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_custom_by_like_str_for_combogrid(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_custom_by_like_str_for_combogrid_by_company_id",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        public void get_custom_test(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
               
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = "2";

                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_custom_by_like_str_for_combogrid(like_str, 
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_custom_test",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        public void get_custom_by_like_str(HttpRequest req, HttpResponse res)
        {
            try
            {

               string like_str = req.Params["q"] == null ? string.Empty : req.Params["q"].ToString(); 
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_custom_by_like_str(like_str,
                    c_id );
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_custom_by_like_str",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion
        #region 获取地址信息 联想
        public void get_custom_by_short(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string cu_type = req.Params["cu_type"] == null ? string.Empty : req.Params["cu_type"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_custom_by_short(like_str,
                    cu_type,
                    c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_custom_by_short",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion
        #region 新增
        public void insert_custom(HttpRequest req, HttpResponse res)
        {
            try
            {
                string cu_name = req.Params["cu_name"] == null ? string.Empty : req.Params["cu_name"].ToString().ToUpper();
                string cu_code = req.Params["cu_code"] == null ? string.Empty : req.Params["cu_code"].ToString().ToUpper();
                string cu_short = req.Params["cu_short"] == null ? string.Empty : req.Params["cu_short"].ToString().ToUpper();
                string cu_type = req.Params["cu_type"] == null ? string.Empty : req.Params["cu_type"].ToString();
                string cu_duty_no = req.Params["cu_duty_no"] == null ? string.Empty : req.Params["cu_duty_no"].ToString();
                string cu_fee_limit_days = req.Params["cu_fee_limit_days"] == null ? "0" : req.Params["cu_fee_limit_days"].ToString();
                string cu_pay_checkaccount_flag = req.Params["cu_pay_checkaccount_flag"] == null ? "0" : req.Params["cu_pay_checkaccount_flag"].ToString();
                string cu_rec_checkaccount_flag = req.Params["cu_rec_checkaccount_flag"] == null ? "0" : req.Params["cu_rec_checkaccount_flag"].ToString();
                string cu_create_by_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.insert_custom(cu_name, cu_code, cu_short, cu_type,
                    cu_create_by_id, cu_duty_no, cu_fee_limit_days,
                    c_id,
                    cu_pay_checkaccount_flag,
                    cu_rec_checkaccount_flag);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_custom",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion
        #region 修改
        public void update_custom(HttpRequest req, HttpResponse res)
        {
            try
            {
                string cu_id = req.Params["cu_id"] == null ? string.Empty : req.Params["cu_id"].ToString();
                string cu_name = req.Params["cu_name"] == null ? string.Empty : req.Params["cu_name"].ToString().ToUpper();
                string cu_code = req.Params["cu_code"] == null ? string.Empty : req.Params["cu_code"].ToString().ToUpper();
                string cu_short = req.Params["cu_short"] == null ? string.Empty : req.Params["cu_short"].ToString().ToUpper();
                string cu_type = req.Params["cu_type"] == null ? string.Empty : req.Params["cu_type"].ToString();
                string cu_duty_no = req.Params["cu_duty_no"] == null ? string.Empty : req.Params["cu_duty_no"].ToString();
                string cu_fee_limit_days = req.Params["cu_fee_limit_days"] == null ? "0" : req.Params["cu_fee_limit_days"].ToString();
                string cu_pay_checkaccount_flag = req.Params["cu_pay_checkaccount_flag"] == null ? "0" : req.Params["cu_pay_checkaccount_flag"].ToString();
                string cu_rec_checkaccount_flag = req.Params["cu_rec_checkaccount_flag"] == null ? "0" : req.Params["cu_rec_checkaccount_flag"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.update_custom(cu_name, cu_code, cu_short, cu_type,
                    cu_id, cu_duty_no, cu_fee_limit_days, c_id,
                    cu_pay_checkaccount_flag,
                    cu_rec_checkaccount_flag);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_custom",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion
        #region 删除
        public void delete_custom(HttpRequest req, HttpResponse res)
        {
            try
            {
                string cu_ids = req.Params["cu_ids"] == null ? string.Empty : req.Params["cu_ids"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.delete_custom(cu_ids);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_custom",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion
        #endregion

        #region 银行信息
        #region 获取 通过客户ID和 是否默认 可以为空
        public void get_bank_by_cu_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ba_cu_id = req.Params["ba_cu_id"] == null ? string.Empty : req.Params["ba_cu_id"].ToString();
                string ba_default_flag = req.Params["ba_default_flag"] == null ? string.Empty : req.Params["ba_default_flag"].ToString();

                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_bank_by_cu_id(ba_cu_id,
                    ba_default_flag);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_bank_by_cu_id",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        public void get_bank_info_by_cu_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                string cu_id = req.Params["cu_id"] == null ? string.Empty : req.Params["cu_id"].ToString();
               
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_bank_info_by_cu_id(cu_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_bank_info_by_cu_id",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 新增
        public void insert_bank(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ba_cu_id = req.Params["ba_cu_id"] == null ? string.Empty : req.Params["ba_cu_id"].ToString();
                string ba_desc = req.Params["ba_desc"] == null ? string.Empty : req.Params["ba_desc"].ToString().ToUpper();
                string ba_card_no = req.Params["ba_card_no"] == null ? string.Empty : req.Params["ba_card_no"].ToString().ToUpper();
                string ba_address = req.Params["ba_address"] == null ? string.Empty : req.Params["ba_address"].ToString().ToUpper();
                string ba_cr_id = req.Params["ba_cr_id"] == null ? string.Empty : req.Params["ba_cr_id"].ToString();
                string ba_default_flag = req.Params["ba_default_flag"] == null ? string.Empty : req.Params["ba_default_flag"].ToString();

                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.insert_bank(ba_cu_id, ba_desc,
                    ba_card_no, ba_address, ba_cr_id, ba_default_flag);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_bank",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 修改
        public void update_bank(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ba_id = req.Params["ba_id"] == null ? string.Empty : req.Params["ba_id"].ToString();

                string ba_desc = req.Params["ba_desc"] == null ? string.Empty : req.Params["ba_desc"].ToString().ToUpper();
                string ba_card_no = req.Params["ba_card_no"] == null ? string.Empty : req.Params["ba_card_no"].ToString().ToUpper();
                string ba_address = req.Params["ba_address"] == null ? string.Empty : req.Params["ba_address"].ToString().ToUpper();
                string ba_cr_id = req.Params["ba_cr_id"] == null ? string.Empty : req.Params["ba_cr_id"].ToString();
                string ba_default_flag = req.Params["ba_default_flag"] == null ? string.Empty : req.Params["ba_default_flag"].ToString();

                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.update_bank(  ba_desc,
                    ba_card_no, ba_address, ba_cr_id, ba_default_flag, ba_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_bank",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 删除
        public void delete_bank(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ba_ids = req.Params["ba_ids"] == null ? string.Empty : req.Params["ba_ids"].ToString();
             
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.delete_bank(ba_ids);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_bank",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion
        #endregion

        #region 航线
        private void insert_voyage_line(HttpRequest req, HttpResponse res)
        {
            try
            {
                string vl_desc = req.Params["vl_desc"] == null ? string.Empty : req.Params["vl_desc"].ToString().ToUpper();
                string vl_code = req.Params["vl_code"] == null ? string.Empty : req.Params["vl_code"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();

                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.insert_voyage_line(vl_desc, vl_code, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_voyage_line",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        private void update_voyage_line(HttpRequest req, HttpResponse res)
        {
            try
            {
                string vl_id = req.Params["vl_id"] == null ? string.Empty : req.Params["vl_id"].ToString();
                string vl_desc = req.Params["vl_desc"] == null ? string.Empty : req.Params["vl_desc"].ToString().ToUpper();
                string c_id = Session["cpy_id"].ToString();
                string vl_code = req.Params["vl_code"] == null ? string.Empty : req.Params["vl_code"].ToString().ToUpper();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.update_voyage_line(vl_id, vl_desc, vl_code, c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_voyage_line",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        private void get_voyage_line(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.get_voyage_line(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.get_voyage_line",
                  System.DateTime.Now.ToString(),
                  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        private void delete_voyage_line(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string vl_ids = req.Params["vl_ids"] == null ? string.Empty : req.Params["vl_ids"].ToString();
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string json = bc.delete_voyage_line(vl_ids,c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_voyage_line",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 工具 模糊查询 
        public void get_tools_desc_for_combox(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'", "''"); ;
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_tools_desc_for_combox(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_tools_desc_for_combox",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion  

        #region 区域
        private void insert_area(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string area_desc = req.Params["area_desc"] == null ? string.Empty : req.Params["area_desc"].ToString().ToUpper();
                string area_create_by_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();

                string json = bc.insert_area(c_id,area_desc, area_create_by_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_area",
                System.DateTime.Now.ToString(),
                e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        private void update_area(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string area_id = req.Params["area_id"] == null ? string.Empty : req.Params["area_id"].ToString();
                string area_desc = req.Params["area_desc"] == null ? string.Empty : req.Params["area_desc"].ToString().ToUpper();
                string json = bc.update_area(area_id, area_desc);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.update_area",
               System.DateTime.Now.ToString(),
               e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        private void delete_area(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string area_ids = req.Params["area_ids"] == null ? string.Empty : req.Params["area_ids"].ToString();
                string json = bc.delete_area(area_ids);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_area",
               System.DateTime.Now.ToString(),
               e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        private void get_area_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string c_id = Session["cpy_id"].ToString();
                string json = bc.get_area_list(c_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_area_list",
             System.DateTime.Now.ToString(),
             e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 港口
        private void insert_port(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string c_id = Session["cpy_id"].ToString();
                string p_desc = req.Params["p_desc"] == null ? string.Empty : req.Params["p_desc"].ToString().ToUpper();
                string p_en_cod = req.Params["p_en_cod"] == null ? string.Empty : req.Params["p_en_cod"].ToString().ToUpper();
                string area_id = req.Params["area_id"] == null ? string.Empty : req.Params["area_id"].ToString();
                string cu_cy_id = req.Params["cu_cy_id"] == null ? string.Empty : req.Params["cu_cy_id"].ToString();
                string cu_cov_id = req.Params["cu_cov_id"] == null ? string.Empty : req.Params["cu_cov_id"].ToString();
                string cu_tally_id = req.Params["cu_tally_id"] == null ? string.Empty : req.Params["cu_tally_id"].ToString();
                string cu_qua_id = req.Params["cu_qua_id"] == null ? string.Empty : req.Params["cu_qua_id"].ToString();
                string p_create_by_id = Session["u_id"].ToString();
                string json = bc.insert_port(
                    c_id,
                    p_desc,
                    p_en_cod,
                    area_id,
                    cu_cy_id, cu_cov_id, cu_tally_id, cu_qua_id, p_create_by_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.insert_port",
              System.DateTime.Now.ToString(),
              e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        private void update_port(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string p_id = req.Params["p_id"] == null ? string.Empty : req.Params["p_id"].ToString();
                string p_desc = req.Params["p_desc"] == null ? string.Empty : req.Params["p_desc"].ToString().ToUpper();
                string p_en_cod = req.Params["p_en_cod"] == null ? string.Empty : req.Params["p_en_cod"].ToString().ToUpper();
                string area_id = req.Params["area_id"] == null ? string.Empty : req.Params["area_id"].ToString();
                string cu_cy_id = req.Params["cu_cy_id"] == null ? string.Empty : req.Params["cu_cy_id"].ToString();
                string cu_cov_id = req.Params["cu_cov_id"] == null ? string.Empty : req.Params["cu_cov_id"].ToString();
                string cu_tally_id = req.Params["cu_tally_id"] == null ? string.Empty : req.Params["cu_tally_id"].ToString();
                string cu_qua_id = req.Params["cu_qua_id"] == null ? string.Empty : req.Params["cu_qua_id"].ToString();

                string json = bc.update_port(
                    p_id,
                    p_desc,
                    p_en_cod,
                    area_id,
                    cu_cy_id,
                    cu_cov_id,
                    cu_tally_id,
                    cu_qua_id);

                res.Write(json);

            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("sys_base.update_port",
              System.DateTime.Now.ToString(),
              e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        private void delete_port(HttpRequest req, HttpResponse res)
        {
            try
            {
                BLL.sys_base.base_data bc = new BLL.sys_base.base_data();
                string p_ids = req.Params["p_ids"] == null ? string.Empty : req.Params["p_ids"].ToString();
                string json = bc.delete_port(p_ids);

                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.delete_port",
             System.DateTime.Now.ToString(),
             e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        public void get_port_list_by_like_str_for_combogrid(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'", "''"); ;
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_port_list_by_like_str_for_combogrid(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_port_list_by_like_str_for_combogrid",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
        #endregion

        #region 注册船舶模糊查询
        public void get_ship_list_by_like_str_for_combogrid(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'", "''"); ;
                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data();
                string json = bd.get_ship_list_by_like_str_for_combogrid(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("sys_base.get_ship_list_by_like_str_for_combogrid",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
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