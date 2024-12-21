using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace Jbfd.Ashx
{
    /// <summary>
    /// cy_fee_contract 的摘要说明
    /// </summary>
    public class cy_fee_contract : IHttpHandler, IRequiresSessionState
    {
        HttpSessionState Session = null;
        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;
            Session = context.Session;
            string ACTION = req.Params["action"] == null ? string.Empty : req.Params["action"].ToString();
            try
            {
                switch (ACTION)
                {

                    #region 打开界面就获取的合同及费项
                    case "get_cy_contract_Collections":
                        {
                            get_cy_contract_Collections(req, res);
                        }
                        break;
                    #endregion

                    #region CY合同头部信息
                    case "get_cy_contract":
                        {
                            get_cy_contract(req, res);
                        }
                        break;
                    case "insert_cy_contract":
                        {
                            insert_cy_contract(req, res);
                        }
                        break;
                    case "update_cy_contract":
                        {
                            update_cy_contract(req, res);
                        }
                        break;
                    case "insert_cy_contract_by_copy":
                        {
                            insert_cy_contract_by_copy(req, res);
                        }
                        break;
                    case "delete_cy_contract":
                        {
                            delete_cy_contract(req, res);
                        }
                        break;
                    #endregion

                    #region 费项
                    case "get_cy_feeitem":
                        {
                            get_cy_feeitem(req, res);
                        }
                        break;
                    case "insert_cy_contract_feeitem":
                        {
                            insert_cy_contract_feeitem(req, res);
                        }
                        break;
                    case "update_cy_contract_feeitem":
                        {
                            update_cy_contract_feeitem(req, res);
                        }
                        break;
                    case "delete_cy_contract_fee_item":
                        {
                            delete_cy_contract_fee_item(req, res);
                        }
                        break;
                    case "get_cy_contract_feeitem":
                        {
                            get_cy_contract_feeitem(req, res);
                        }
                        break;
                    #endregion

                    #region 计费规则
                    case "get_cy_contract_details":
                        {
                            get_cy_contract_details(req, res);
                        }
                        break;
                    case "update_cy_contract_details":
                        {
                            update_cy_contract_details(req, res);
                        }
                        break;
                    #endregion

                }
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("cy_fee_contract." + ACTION,
                  System.DateTime.Now.ToString(),
                  Session["u_id"].ToString() + ' ' + e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #region 打开界面就应该获取的信息
        public void get_cy_contract_Collections(HttpRequest req, HttpResponse res)
        {
            try
            { 
                BLL.ship.cy_contract fc = new BLL.ship.cy_contract();
                string c_id = Session["cpy_id"].ToString();
                string json = fc.get_cy_contract_Collections(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 合同头

        #region 删除CY合同
        private void delete_cy_contract(HttpRequest req, HttpResponse res)
        {
            try
            { 
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string cyc_id = req.Params["cyc_id"] == null ? string.Empty : req.Params["cyc_id"].ToString();
                string json = cy.delete_cy_contract(cyc_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新建CY合同
        private void insert_cy_contract(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string cyc_desc = req.Params["cyc_desc"] == null ? string.Empty : req.Params["cyc_desc"].ToString();
                string cyc_port_id = req.Params["cyc_port_id"] == null ? string.Empty : req.Params["cyc_port_id"].ToString();
                string cyc_sign_dat = req.Params["cyc_sign_dat"] == null ? string.Empty : req.Params["cyc_sign_dat"].ToString();
                string cyc_create_by_id = Session["u_id"].ToString();
                string cyc_begin_dat = req.Params["cyc_begin_dat"] == null ? string.Empty : req.Params["cyc_begin_dat"].ToString();
                string cyc_end_dat = req.Params["cyc_end_dat"] == null ? string.Empty : req.Params["cyc_end_dat"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.insert_cy_contract(cyc_desc,
                    cyc_port_id,
                    cyc_sign_dat,
                    cyc_create_by_id,
                    cyc_begin_dat,
                    cyc_end_dat,
                    c_id);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新建CY合同
        private void insert_cy_contract_by_copy(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string res_cyc_id = req.Params["res_cyc_id"] == null ? string.Empty : req.Params["res_cyc_id"].ToString();
                string cyc_desc = req.Params["cyc_desc"] == null ? string.Empty : req.Params["cyc_desc"].ToString();
                string cyc_port_id = req.Params["cyc_port_id"] == null ? string.Empty : req.Params["cyc_port_id"].ToString();
                string cyc_sign_dat = req.Params["cyc_sign_dat"] == null ? string.Empty : req.Params["cyc_sign_dat"].ToString();
                string cyc_create_by_id = Session["u_id"].ToString();
                string cyc_begin_dat = req.Params["cyc_begin_dat"] == null ? string.Empty : req.Params["cyc_begin_dat"].ToString();
                string cyc_end_dat = req.Params["cyc_end_dat"] == null ? string.Empty : req.Params["cyc_end_dat"].ToString();
                string c_id = Session["cpy_id"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.insert_cy_contract_by_copy(
                    res_cyc_id,
                    cyc_desc,
                    cyc_port_id,
                    cyc_sign_dat,
                    cyc_create_by_id,
                    cyc_begin_dat,
                    cyc_end_dat,
                    c_id);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改CY合同
        private void update_cy_contract(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string cyc_id = req.Params["cyc_id"] == null ? string.Empty : req.Params["cyc_id"].ToString();
                string cyc_desc = req.Params["cyc_desc"] == null ? string.Empty : req.Params["cyc_desc"].ToString();
                string cyc_port_id = req.Params["cyc_port_id"] == null ? string.Empty : req.Params["cyc_port_id"].ToString();
                string cyc_sign_dat = req.Params["cyc_sign_dat"] == null ? string.Empty : req.Params["cyc_sign_dat"].ToString();
                string cyc_create_by_id = Session["u_id"].ToString();
                string cyc_begin_dat = req.Params["cyc_begin_dat"] == null ? string.Empty : req.Params["cyc_begin_dat"].ToString();
                string cyc_end_dat = req.Params["cyc_end_dat"] == null ? string.Empty : req.Params["cyc_end_dat"].ToString();
                string cyc_valid = req.Params["cyc_valid"] == null ? string.Empty : req.Params["cyc_valid"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.update_cy_contract(cyc_id,
                    cyc_desc,
                    cyc_port_id,
                    cyc_sign_dat,
                    cyc_begin_dat,
                    cyc_end_dat,
                    cyc_valid);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取CY合同
        private void get_cy_contract(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string c_id = Session["cpy_id"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.get_cy_contract(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #region 费项
        #region 获取所有CY费项
        public void get_cy_feeitem(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string c_id = Session["cpy_id"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.get_cy_feeitem(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 合同添加费项
        public void insert_cy_contract_feeitem(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string cyc_id = req.Params["cyc_id"] == null ? string.Empty : req.Params["cyc_id"].ToString();
                string cfi_id = req.Params["cfi_id"] == null ? string.Empty : req.Params["cfi_id"].ToString();
                string cy_cu_id = req.Params["cy_cu_id"] == null ? string.Empty : req.Params["cy_cu_id"].ToString();
                string cyc_invoice_typ = req.Params["cyc_invoice_typ"] == null ? string.Empty : req.Params["cyc_invoice_typ"].ToString();
                string cyc_cr_id = req.Params["cyc_cr_id"] == null ? string.Empty : req.Params["cyc_cr_id"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.insert_cy_contract_feeitem(cyc_id,
                    cfi_id,
                    cy_cu_id,
                    cyc_invoice_typ,
                    cyc_cr_id);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 合同修改费项目-修改收费单位
        public void update_cy_contract_feeitem(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string cyc_id = req.Params["cyc_id"] == null ? string.Empty : req.Params["cyc_id"].ToString();
                string cfi_id = req.Params["cfi_id"] == null ? string.Empty : req.Params["cfi_id"].ToString();
                string cy_cu_id = req.Params["cy_cu_id"] == null ? string.Empty : req.Params["cy_cu_id"].ToString();
                string cyc_invoice_typ = req.Params["cyc_invoice_typ"] == null ? string.Empty : req.Params["cyc_invoice_typ"].ToString();
                string cyc_cr_id = req.Params["cyc_cr_id"] == null ? string.Empty : req.Params["cyc_cr_id"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.update_cy_contract_feeitem(cyc_id,
                    cfi_id,
                    cy_cu_id,
                    cyc_invoice_typ,
                    cyc_cr_id);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 合同删除费项
        public void delete_cy_contract_fee_item(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string cyc_id = req.Params["cyc_id"] == null ? string.Empty : req.Params["cyc_id"].ToString();
                string cfi_id = req.Params["cfi_id"] == null ? string.Empty : req.Params["cfi_id"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.delete_cy_contract_fee_item(cyc_id,
                    cfi_id);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取合同下面的费项
        public void get_cy_contract_feeitem(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string cyc_id = req.Params["cyc_id"] == null ? string.Empty : req.Params["cyc_id"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.get_cy_contract_feeitem(cyc_id);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 计费规则
        private void get_cy_contract_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                string cyc_id = req.Params["cyc_id"] == null ? string.Empty : req.Params["cyc_id"].ToString();
                string cfi_id = req.Params["cfi_id"] == null ? string.Empty : req.Params["cfi_id"].ToString();

                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.get_cy_contract_details(cyc_id, cfi_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #region 修改金额

        public void update_cy_contract_details(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string cyc_id = req.Params["cyc_id"] == null ? string.Empty : req.Params["cyc_id"].ToString();
                string cfi_id = req.Params["cfi_id"] == null ? string.Empty : req.Params["cfi_id"].ToString();
                string fee_val = req.Params["fee_val"] == null ? string.Empty : req.Params["fee_val"].ToString();
                string seqs = req.Params["seqs"] == null ? string.Empty : req.Params["seqs"].ToString();
                BLL.ship.cy_contract cy = new BLL.ship.cy_contract();
                string json = cy.update_cy_contract_details(cyc_id, cfi_id, seqs, fee_val);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
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