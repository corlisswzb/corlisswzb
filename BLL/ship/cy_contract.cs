using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace BLL.ship
{
    public  class cy_contract
    {
        DAL.ship.cy_contract dal = null;
        public cy_contract()
        {
            dal = new DAL.ship.cy_contract();
        }

        #region 打开界面就应该获取的信息
        public string get_cy_contract_Collections(string c_id)
        {
            try
            {
                string json = string.Empty;

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                //获取合同 
                DataTable dt_contracts = dal.get_cy_contract(c_id);
                string cy_contracts_list = commone.BLL_commone.data_convert_jsonarray(dt_contracts);
                lst.Add(new KeyValuePair<string, string>("cy_contracts_list", cy_contracts_list));

                //获取费项
                DataTable dt_feeitem_list = dal.get_cy_feeitem(c_id);
                string cy_feeitem_list = commone.BLL_commone.data_convert_jsonarray(dt_feeitem_list);
                lst.Add(new KeyValuePair<string, string>("cy_feeitem_list", cy_feeitem_list));

                json = commone.BLL_commone.custom_convert_json(lst);
                return json;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 合同头

        #region 新建CY合同
        public string insert_cy_contract(
            string cyc_desc,
            string cyc_port_id,
            string cyc_sign_dat,
            string cyc_create_by_id,
            string cyc_begin_dat,
            string cyc_end_dat,
            string cyc_c_id
            )
        {
            try
            {
                string cyc_id = string.Empty;

                bool b = dal.insert_cy_contract(
                    cyc_desc,
                    cyc_port_id,
                    cyc_sign_dat,
                    cyc_create_by_id,
                    cyc_begin_dat,
                    cyc_end_dat,
                    cyc_c_id,
                    ref  cyc_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                KeyValuePair<string, string> k = new KeyValuePair<string, string>("cyc_id", cyc_id);

                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增CY合同成功" : "存在相同的CY合同", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 拷贝 新建CY合同
        public string insert_cy_contract_by_copy(
            string res_cyc_id,
            string cyc_desc,
            string cyc_port_id,
            string cyc_sign_dat,
            string cyc_create_by_id,
            string cyc_begin_dat,
            string cyc_end_dat,
            string cyc_c_id
            )
        {
            try
            {
                string cyc_id = string.Empty;

                bool b = dal.insert_cy_contract_by_copy(
                    res_cyc_id,
                    cyc_desc,
                    cyc_port_id,
                    cyc_sign_dat,
                    cyc_create_by_id,
                    cyc_begin_dat,
                    cyc_end_dat,
                    cyc_c_id,
                    ref  cyc_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                KeyValuePair<string, string> k = new KeyValuePair<string, string>("cyc_id", cyc_id);

                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增CY合同成功" : "存在相同的CY合同", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改CY合同
        public string update_cy_contract(
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
                bool b = dal.update_cy_contract(
                    cyc_id,
                    cyc_desc,
                    cyc_port_id,
                    cyc_sign_dat,
                    cyc_begin_dat,
                    cyc_end_dat,
                    cyc_valid);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "修改CY合同成功" : "未知错误");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除CY合同
        public string delete_cy_contract(string cyc_id)
        {
            try
            {
                bool b = dal.delete_cy_contract(cyc_id);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? " 删除CY合同成功" : "未知错误");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取所有CY合同
        public string get_cy_contract(string c_id)
        {
            try
            {
                DataTable dt = dal.get_cy_contract(c_id);

                return commone.BLL_commone.data_convert_json(dt);

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
        public string get_cy_feeitem(string c_id)
        {
            try
            {
                DataTable dt = dal.get_cy_feeitem(c_id);

                return commone.BLL_commone.data_convert_json(dt);

            }
            catch (Exception e)
            {
                throw e;
            }

        }
        #endregion

        #region 合同添加费项
        public string insert_cy_contract_feeitem(
            string cyc_id,
            string cfi_id,
            string cy_cu_id,
            string cyc_invoice_typ,
            string cyc_cr_id)
        {
            try
            {
                bool b = dal.insert_cy_contract_feeitem(
                    cyc_id,
                    cfi_id,
                    cy_cu_id,
                    cyc_invoice_typ,
                    cyc_cr_id);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "费项添加成功" : "费项已存在，无法反复添加");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 合同修改费项目-修改收费单位
        public string update_cy_contract_feeitem(
            string cyc_id,
            string cfi_id,
            string cy_cu_id,
            string cyc_invoice_typ,
            string cyc_cr_id
            )
        {
            try
            {
                bool b = dal.update_cy_contract_feeitem(
                    cyc_id,
                    cfi_id,
                    cy_cu_id,
                    cyc_invoice_typ,
                    cyc_cr_id);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "费项修改成功" : "未知原因");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 合同删除费项
        public string delete_cy_contract_fee_item(
            string cyc_id,
            string cfi_id)
        {
            try
            {
                bool b = dal.delete_cy_contract_fee_item(
                    cyc_id,
                    cfi_id);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "费项删除成功" : "未知原因");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取合同下面的费项
        public string get_cy_contract_feeitem(string cyc_id)
        {
            try
            {
                DataTable dt = dal.get_cy_contract_feeitem(cyc_id);

                return commone.BLL_commone.data_convert_json(dt);

            }
            catch (Exception e)
            {
                throw e;
            }

        }
        #endregion

        #endregion 


        #region 获取合同下面的费项 计费规则
        public string get_cy_contract_details(string cyc_id, string cfi_id)
        {
            try
            {
                DataTable dt = dal.get_cy_contract_details(cyc_id, cfi_id);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {
                
                throw;
            }
        }
        #endregion

        #region 
        


        public string update_cy_contract_details(string cyc_id, string cfi_id,
            string seqs,
            string fee_val)
        {
            try
            {
                bool b = dal.update_cy_contract_details(cyc_id,
                   cfi_id,
                   seqs,
                   fee_val);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "费率设置成功" : "未知原因");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
    }
}
