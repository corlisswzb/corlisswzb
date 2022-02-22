using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace BLL.ship
{
    public class fio_contract
    {
        DAL.ship.fio_contract fio = null;
        public fio_contract()
        {
            fio = new DAL.ship.fio_contract();
        }

        #region 新建FIO合同
        public string insert_fio_contract(
            string fioc_desc,
            string fioc_cu_id,
            string fioc_sign_dat,
            string fioc_create_by_id,
            string fioc_begin_dat,
            string fioc_end_dat,
            string c_id,
            string fioc_invoice_typ,
            string fioc_cr_id,
            string fioc_ship_rent_cu_id)
        {
            try
            {
                string fioc_id = string.Empty;
                bool b = fio.insert_fio_contract(
                    fioc_desc,
                    fioc_cu_id,
                    fioc_sign_dat,
                    fioc_create_by_id,
                    fioc_begin_dat,
                    fioc_end_dat,
                    c_id,
                    fioc_invoice_typ,
                    fioc_cr_id,
                    fioc_ship_rent_cu_id,
                    ref  fioc_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                KeyValuePair<string, string> k = new KeyValuePair<string, string>("fioc_id", fioc_id);

                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增FIO合同成功" : "存在相同的FIO合同", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string insert_fio_contract(
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
            string copy_fioc_id)
        {
            try
            {
                string fioc_id = string.Empty;
                bool b = fio.insert_fio_contract(
                    fioc_desc,
                    fioc_cu_id,
                    fioc_sign_dat,
                    fioc_create_by_id,
                    fioc_begin_dat,
                    fioc_end_dat,
                    c_id,
                    fioc_invoice_typ,
                    fioc_cr_id,
                    fioc_ship_rent_cu_id,
                    copy_fioc_id,
                    ref  fioc_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                KeyValuePair<string, string> k = new KeyValuePair<string, string>("fioc_id", fioc_id);

                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增FIO合同成功" : "存在相同的FIO合同", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改FIO合同
        public string update_fio_contract(
            string fioc_id,
            string fioc_desc,
            string fioc_cu_id,
            string fioc_sign_dat,
            string fioc_begin_dat,
            string fioc_end_dat,
            string fioc_valid,
            string fioc_invoice_typ,
            string fioc_cr_id,
            string fioc_ship_rent_cu_id)
        {
            try
            {
                bool b = fio.update_fio_contract(
                    fioc_id,
                    fioc_desc,
                    fioc_cu_id,
                    fioc_sign_dat,
                    fioc_begin_dat,
                    fioc_end_dat,
                    fioc_valid,
                    fioc_invoice_typ,
                    fioc_cr_id,
                    fioc_ship_rent_cu_id);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "修改FIO合同成功" : "已经存在该公司合同");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除FIO合同
        public string delete_fio_contract(string fioc_id)
        {
            try
            {
                bool b = fio.delete_fio_contract(fioc_id);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? " 删除FIO合同成功" : "未知错误");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取合同
        public string get_fio_contract(string c_id)
        {
            try
            {
                DataTable dt = fio.get_fio_contract(c_id);

                return commone.BLL_commone.data_convert_json(dt);

            }
            catch (Exception e)
            {
                throw e;
            }

        }
        #endregion

        #region 新增FIO装卸地
        public string insert_fio_group_area(string load_area_id,
            string disc_area_id, string fioc_id)
        {
            try
            {
                string fio_group_area_id = string.Empty;
                bool b = fio.insert_fio_group_area(
                    load_area_id,
                    disc_area_id,
                    fioc_id,
                    ref fio_group_area_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                KeyValuePair<string, string> k = new KeyValuePair<string, string>("fio_group_area_id", fio_group_area_id);

                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增FIO地点组合成功" : "存在相同的FIO地区组合", lst);
            }
            catch (Exception e)
            {

                throw e;
            }

        }
        #endregion

        #region 新增FIO装卸地 拷贝模式
        public string insert_fio_group_area_by_copy(  string copy_fio_group_area_id, string load_area_id,
            string disc_area_id, string fioc_id)
        {
            try
            {
                string fio_group_area_id = string.Empty;
                bool b = fio.insert_fio_group_area_by_copy( 
                    copy_fio_group_area_id,
                    load_area_id,
                    disc_area_id,
                    fioc_id,
                    ref fio_group_area_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                KeyValuePair<string, string> k = new KeyValuePair<string, string>("fio_group_area_id", fio_group_area_id);

                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增FIO地点组合成功" : "存在相同的FIO地区组合", lst);
            }
            catch (Exception e)
            {

                throw e;
            }

        }
        #endregion

        #region 新增FIO装卸地 拷贝模式
        public string insert_fio_group_area_by_change(string copy_fio_group_area_id, 
           
            string fioc_id)
        {
            try
            {
                string fio_group_area_id = string.Empty;
                bool b = fio.insert_fio_group_area_by_change(
                    copy_fio_group_area_id, 
                    fioc_id,
                    ref fio_group_area_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                KeyValuePair<string, string> k = new KeyValuePair<string, string>("fio_group_area_id", fio_group_area_id);

                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增FIO地点组合成功" : "存在相同的FIO地区组合", lst);
            }
            catch (Exception e)
            {

                throw e;
            }

        }
        #endregion

        #region 删除FIO装卸地点
        public string delete_fio_group_area(string fio_group_area_id, string fioc_id)
        {
            try
            {

                bool b = fio.delete_fio_group_area(fio_group_area_id, fioc_id);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "删除FIO地点组合成功" : "未知错误");
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        #endregion

        #region 修改FIO装卸地
        public string update_fio_group_area(
            string fio_group_area_id,
            string load_area_id,
            string disc_area_id,
            string fioc_id)
        {
            try
            {

                bool b = fio.update_fio_group_area(fio_group_area_id, 
                    load_area_id, 
                    disc_area_id, 
                    fioc_id);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "修改FIO地点组合成功" : "未知错误");
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        #endregion

        #region 获取FIO装卸地
        public string get_fio_group_area(string fioc_id)
        {
            try
            {

                DataTable dt = fio.get_fio_group_area(fioc_id);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        #endregion

        #region 设置FIO地点费率
        public string update_fio_contract_details(
            string seqs,
            string fee_val )
        {
            try
            {
                bool b = fio.update_fio_contract_details(seqs,
                    fee_val );

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增FIO地点组合费率成功" : "未知错误");
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

         

        #region 获取 合同集装箱费用
        public string get_fio_contract_details(
            string fioc_id,
            string fio_group_area_id)
        {
            try
            {
                DataTable dt = fio.get_fio_contract_details(
                    fioc_id,
                    fio_group_area_id);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
    }
}
