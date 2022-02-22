using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace SDZL.Ashx
{
    /// <summary>
    /// fio_fee_contract 的摘要说明
    /// </summary>
    public class fio_fee_contract : IHttpHandler, IRequiresSessionState
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
                    
                    #region FIO合同头部信息
                    case "get_fio_contract":
                        {
                            get_fio_contract(req, res);
                        }
                        break;
                    case "insert_fio_contract":
                        {
                            insert_fio_contract(req, res);
                        }
                        break;
                    case "update_fio_contract":
                        {
                            update_fio_contract(req, res);
                        }
                        break;
                    case "delete_fio_contract":
                        {
                            delete_fio_contract(req, res);
                        }
                        break;
                    #endregion

                    #region FIO地点组合
                    case "insert_fio_group_area":
                        {
                            insert_fio_group_area(req, res);
                        }
                        break;
                    case "insert_fio_group_area_by_copy":
                        {
                            insert_fio_group_area_by_copy(req, res);
                        }
                        break;
                    case "insert_fio_group_area_by_change":
                        {
                            insert_fio_group_area_by_change(req, res);
                        }
                        break;
                    case "delete_fio_group_area":
                        {
                            delete_fio_group_area(req, res);
                        }
                        break;
                    case "update_fio_group_area":
                        {
                            update_fio_group_area(req, res);
                        }
                        break;
                    case "get_fio_group_area":
                        {
                            get_fio_group_area(req, res);
                        }
                        break;

                    case "update_fio_contract_details":
                        {
                            update_fio_contract_details(req, res);
                        }
                        break;
                    #endregion
                    #region 获取费率
                    case "get_fio_contract_details":
                        {
                            get_fio_contract_details(req, res);
                        }
                        break;
                    #endregion

                }
            }
            catch (Exception e)
            {

                BLL.commone.mylog.writelog("fio_fee_contract." + ACTION,
                  System.DateTime.Now.ToString(),
                  Session["u_id"].ToString() + ' ' +  e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }

        }
         

        #region FIO合同头部

        #region 删除FIO合同
        private void delete_fio_contract(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string fioc_id = req.Params["fioc_id"] == null ? string.Empty : req.Params["fioc_id"].ToString();
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();
                string json = fc.delete_fio_contract(fioc_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新建FIO合同
        private void insert_fio_contract(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string fioc_desc = req.Params["fioc_desc"] == null ? string.Empty : req.Params["fioc_desc"].ToString();
                string fioc_cu_id = req.Params["fioc_cu_id"] == null ? string.Empty : req.Params["fioc_cu_id"].ToString();
                string fioc_sign_dat = req.Params["fioc_sign_dat"] == null ? string.Empty : req.Params["fioc_sign_dat"].ToString();
                string fioc_begin_dat = req.Params["fioc_begin_dat"] == null ? string.Empty : req.Params["fioc_begin_dat"].ToString();
                string fioc_end_dat = req.Params["fioc_end_dat"] == null ? string.Empty : req.Params["fioc_end_dat"].ToString();
                string copy_fioc_id = req.Params["copy_fioc_id"] == null ? string.Empty : req.Params["copy_fioc_id"].ToString();
                string fioc_invoice_typ = req.Params["fioc_invoice_typ"] == null ? string.Empty : req.Params["fioc_invoice_typ"].ToString();
                string fioc_cr_id = req.Params["fioc_cr_id"] == null ? string.Empty : req.Params["fioc_cr_id"].ToString();
                string fioc_ship_rent_cu_id = req.Params["fioc_ship_rent_cu_id"] == null ? string.Empty : req.Params["fioc_ship_rent_cu_id"].ToString();
                string fioc_create_by_id = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();

                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();

                if (copy_fioc_id.Equals(string.Empty))
                {
                    string json = fc.insert_fio_contract(fioc_desc,
                    fioc_cu_id,
                    fioc_sign_dat,
                    fioc_create_by_id,
                    fioc_begin_dat,
                    fioc_end_dat,
                    c_id,
                    fioc_invoice_typ,
                    fioc_cr_id,
                    fioc_ship_rent_cu_id);
                    res.Write(json);
                }
                else
                {
                    string json = fc.insert_fio_contract(fioc_desc,
                    fioc_cu_id,
                    fioc_sign_dat,
                    fioc_create_by_id,
                    fioc_begin_dat,
                    fioc_end_dat, 
                    c_id,
                    fioc_invoice_typ,
                    fioc_cr_id,
                    fioc_ship_rent_cu_id,
                    copy_fioc_id);
                    res.Write(json);
                }


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改FIO合同
        private void update_fio_contract(HttpRequest req, HttpResponse res)
        {
            try
            {
                 
                string fioc_id = req.Params["fioc_id"] == null ? string.Empty : req.Params["fioc_id"].ToString();
                string fioc_desc = req.Params["fioc_desc"] == null ? string.Empty : req.Params["fioc_desc"].ToString();
                string fioc_cu_id = req.Params["fioc_cu_id"] == null ? string.Empty : req.Params["fioc_cu_id"].ToString();
                string fioc_sign_dat = req.Params["fioc_sign_dat"] == null ? string.Empty : req.Params["fioc_sign_dat"].ToString();
                string fioc_begin_dat = req.Params["fioc_begin_dat"] == null ? string.Empty : req.Params["fioc_begin_dat"].ToString();
                string fioc_end_dat = req.Params["fioc_end_dat"] == null ? string.Empty : req.Params["fioc_end_dat"].ToString();
                string fioc_valid = req.Params["fioc_valid"] == null ? string.Empty : req.Params["fioc_valid"].ToString();
                string fioc_invoice_typ = req.Params["fioc_invoice_typ"] == null ? string.Empty : req.Params["fioc_invoice_typ"].ToString();
                string fioc_cr_id = req.Params["fioc_cr_id"] == null ? string.Empty : req.Params["fioc_cr_id"].ToString();
                string fioc_ship_rent_cu_id = req.Params["fioc_ship_rent_cu_id"] == null ? string.Empty : req.Params["fioc_ship_rent_cu_id"].ToString();
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();
                string json = fc.update_fio_contract(fioc_id,
                    fioc_desc,
                    fioc_cu_id,
                    fioc_sign_dat,
                    fioc_begin_dat,
                    fioc_end_dat,
                    fioc_valid,
                    fioc_invoice_typ,
                    fioc_cr_id,
                    fioc_ship_rent_cu_id);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取FIO合同
        private void get_fio_contract(HttpRequest req, HttpResponse res)
        {
            try
            {
                
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();
                string c_id = Session["cpy_id"].ToString();
                string json = fc.get_fio_contract(c_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #region FIO地点组合

        #region 新建FIO地点组合
        private void insert_fio_group_area(HttpRequest req, HttpResponse res)
        {
            try
            {
                
                string load_area_id = req.Params["load_area_id"] == null ? string.Empty : req.Params["load_area_id"].ToString();
                string disc_area_id = req.Params["disc_area_id"] == null ? string.Empty : req.Params["disc_area_id"].ToString();
                string fioc_id = req.Params["fioc_id"] == null ? string.Empty : req.Params["fioc_id"].ToString();
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();
                 
                string json = fc.insert_fio_group_area(load_area_id,
                        disc_area_id, fioc_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新建FIO地点组合 拷贝模式
        private void insert_fio_group_area_by_copy(HttpRequest req, HttpResponse res)
        {
            try
            {
                
                string copy_fio_group_area_id = req.Params["copy_fio_group_area_id"] == null ? string.Empty : req.Params["copy_fio_group_area_id"].ToString();
                string load_area_id = req.Params["load_area_id"] == null ? string.Empty : req.Params["load_area_id"].ToString();
                string disc_area_id = req.Params["disc_area_id"] == null ? string.Empty : req.Params["disc_area_id"].ToString();
                string fioc_id = req.Params["fioc_id"] == null ? string.Empty : req.Params["fioc_id"].ToString();
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();


                string json = fc.insert_fio_group_area_by_copy( 
                    copy_fio_group_area_id, 
                    load_area_id,
                    disc_area_id, 
                    fioc_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新建FIO地点组合 互换模式
        private void insert_fio_group_area_by_change(HttpRequest req, HttpResponse res)
        {
            try
            {

                string copy_fio_group_area_id = req.Params["copy_fio_group_area_id"] == null ? string.Empty : req.Params["copy_fio_group_area_id"].ToString();
              
                string fioc_id = req.Params["fioc_id"] == null ? string.Empty : req.Params["fioc_id"].ToString();
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();
                 
                string json = fc.insert_fio_group_area_by_change(
                    copy_fio_group_area_id, 
                    fioc_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除FIO地点组合
        private void delete_fio_group_area(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fioc_id = req.Params["fioc_id"] == null ? string.Empty : req.Params["fioc_id"].ToString(); 
                string fio_group_area_id = req.Params["fio_group_area_id"] == null ? string.Empty : req.Params["fio_group_area_id"].ToString();
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();
                string json = fc.delete_fio_group_area(fio_group_area_id,fioc_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改FIO地点组合
        private void update_fio_group_area(HttpRequest req, HttpResponse res)
        {
            try
            {
                string fioc_id = req.Params["fioc_id"] == null ? string.Empty : req.Params["fioc_id"].ToString(); 
                string fio_group_area_id = req.Params["fio_group_area_id"] == null ? string.Empty : req.Params["fio_group_area_id"].ToString();
                string load_area_id = req.Params["load_area_id"] == null ? string.Empty : req.Params["load_area_id"].ToString();
                string disc_area_id = req.Params["disc_area_id"] == null ? string.Empty : req.Params["disc_area_id"].ToString();

                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();
                string json = fc.update_fio_group_area(fio_group_area_id,
                    load_area_id,
                    disc_area_id,
                    fioc_id);
                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取地址信息
        private void get_fio_group_area(HttpRequest req, HttpResponse res)
        {
            try
            {
                 
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();
                string fioc_id = req.Params["fioc_id"] == null ? string.Empty : req.Params["fioc_id"].ToString();
                string json = fc.get_fio_group_area(fioc_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改FIO地点组合费率
        private void update_fio_contract_details(HttpRequest req, HttpResponse res)
        {
            try
            {
             
                var seqs = req.Params["seqs"] == null ? string.Empty : req.Params["seqs"].ToString();
                var fee_val = req.Params["fee_val"] == null ? string.Empty : req.Params["fee_val"].ToString();
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();

                string json = fc.update_fio_contract_details(seqs,
                    fee_val );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion




        #region 获取箱费用
        private void get_fio_contract_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                
                BLL.ship.fio_contract fc = new BLL.ship.fio_contract();
                string fioc_id = req.Params["fioc_id"] == null ? string.Empty : req.Params["fioc_id"].ToString();
                string fio_group_area_id = req.Params["fio_group_area_id"] == null ? string.Empty : req.Params["fio_group_area_id"].ToString();
               
                string json = fc.get_fio_contract_details(
                    fioc_id, fio_group_area_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
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