using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace BLL.sys_base
{
    public class base_data
    {
        DAL.sys_base.base_data bs = null;
        public base_data()
        {
            bs = new DAL.sys_base.base_data();
        }
        #region 付款审核付款方式
        #region 获取
        public string get_pay_approval_payment_typ(string c_id)
        {
            try
            {
                DataTable dt = bs.get_pay_approval_payment_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        
        #endregion
        #endregion
        
        #region 业务类型
        #region 获取 
        public string get_order_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_order_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool get_order_typ_by_ot_desc(string ot_desc, string c_id, 
            ref string ot_id)
        {
            try
            {
                bool b = bs.get_order_typ_by_ot_desc(ot_desc, c_id, ref ot_id);

                return b;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 包装
        #region 新增
        public string insert_packing(string pa_name,string c_id)
        {
            try
            {
                string pa_id = string.Empty;
                bool b = bs.insert_packing(pa_name,c_id, ref pa_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("pa_id", pa_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增包装类型成功" : "错误:已存在相同的包装类型。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_packing(string c_id)
        {
            try
            {
                DataTable dt = bs.get_packing(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_packing_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_packing(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_packing(string pa_name, string pa_id,string c_id)
        {
            try
            {
                bool b = bs.update_packing(pa_name, pa_id,c_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改包装类型成功" : "错误:已存在相同的包装类型。");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_packing(string pa_ids,string c_id)
        {
            try
            {
                bool b = bs.delete_packing(pa_ids);
                string packing_list = get_packing_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("packing_list", packing_list));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除包装类型完成" : "异常:请联系管理员处理。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 项目类别
        #region 新增
        public string insert_project(string pr_name,string pr_code,string c_id)
        {
            try
            {
                string pr_id = string.Empty;
                bool b = bs.insert_project(pr_name,pr_code, c_id,ref pr_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("pr_id", pr_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增项目类别成功" : "错误:已存在相同的项目类别。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_project(string c_id)
        {
            try
            {
                DataTable dt = bs.get_project(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_project_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_project(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_project(string pr_name,string pr_code, string pr_id,string c_id)
        {
            try
            {
                bool b = bs.update_project(pr_name, pr_code, pr_id, c_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改项目类别成功" : "错误:已存在相同的项目类别。");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_project(string pr_ids,string c_id)
        {
            try
            {
                bool b = bs.delete_project(pr_ids);
                string project_list = get_project_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("project_list", project_list));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除项目类别完成" : "异常:请联系管理员处理。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 货币
        #region 获取
        public string get_currency(string c_id)
        {
            try
            {
                DataTable dt = bs.get_currency(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_currency_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_currency(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 计量单位
        #region 新增
        public string insert_unit(string u_desc,string c_id)
        {
            try
            {
                string u_id = string.Empty;
                bool b = bs.insert_unit(u_desc,c_id, ref u_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("u_id", u_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增计量单位成功" : "错误:已存在相同的计量单位。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_unit(string c_id)
        {
            try
            {
                DataTable dt = bs.get_unit(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_unit_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_unit(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_unit(string u_desc, string u_id,string c_id)
        {
            try
            {
                bool b = bs.update_unit(u_desc, u_id,c_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改计量单位成功" : "错误:已存在相同的计量单位。");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_unit(string u_ids,string c_id)
        {
            try
            {
                bool b = bs.delete_unit(u_ids);
                string unit_list = get_unit_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("unit_list", unit_list));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除计量单位完成" : "异常:请联系管理员处理。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 联运方式
        #region 新增
        public string insert_carriage_typ(string ca_desc,string c_id)
        {
            try
            {
                string ca_id = string.Empty;
                bool b = bs.insert_carriage_typ(ca_desc,c_id, ref ca_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("ca_id", ca_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增联运方式 成功" : "错误:已存在相同的联运方式 。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_carriage_typ(string c_id)
        {
            try
            {
                DataTable dt = bs.get_carriage_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_carriage_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_carriage_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_carriage_typ(string ca_desc, string ca_id,string c_id)
        {
            try
            {
                bool b = bs.update_carriage_typ(ca_desc, ca_id,c_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改联运方式 成功" : "错误:已存在相同的联运方式 。");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_carriage_typ(string ca_ids,string c_id)
        {
            try
            {
                bool b = bs.delete_carriage_typ(ca_ids);
                string carriage_typ_list = get_carriage_typ_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("carriage_typ_list", carriage_typ_list));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除联运方式 完成" : "异常:请联系管理员处理。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 提单类型
        #region 新增
        public string insert_bill_typ(string b_desc,string c_id)
        {
            try
            {
                string b_id = string.Empty;
                bool b = bs.insert_bill_typ(b_desc,c_id, ref b_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("b_id", b_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增提单类型成功" : "错误:已存在相同的提单类型。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_bill_typ(string c_id)
        {
            try
            {
                DataTable dt = bs.get_bill_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_bill_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_bill_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_bill_typ(string b_desc, string b_id, string c_id)
        {
            try
            {
                bool b = bs.update_bill_typ(b_desc, b_id, c_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改提单类型成功" : "错误:已存在相同的提单类型。");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_bill_typ(string b_ids, string c_id)
        {
            try
            {
                bool b = bs.delete_bill_typ(b_ids);
                string bill_typ_list = get_bill_typ_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("bill_typ_list", bill_typ_list));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除提单类型完成" : "异常:请联系管理员处理。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 签单类型
        #region 新增
        public string insert_sign_bill_typ(string s_desc, string c_id)
        {
            try
            {
                string s_id = string.Empty;
                bool b = bs.insert_sign_bill_typ(s_desc,c_id, ref s_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("s_id", s_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增签单方式成功" : "错误:已存在相同的签单方式。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_sign_bill_typ(string c_id)
        {
            try
            {
                DataTable dt = bs.get_sign_bill_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_sign_bill_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_sign_bill_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_sign_bill_typ(string s_desc, string s_id, string c_id)
        {
            try
            {
                bool b = bs.update_sign_bill_typ(s_desc, s_id, c_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改签单方式成功" : "错误:已存在相同的签单方式。");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_sign_bill_typ(string s_ids, string c_id)
        {
            try
            {
                bool b = bs.delete_sign_bill_typ(s_ids);
                string sign_bill_typ_list = get_sign_bill_typ_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("sign_bill_typ_list", sign_bill_typ_list));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除签单方式完成" : "异常:请联系管理员处理。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 品名
        #region 新增
        public string insert_product(string pr_name,string c_id)
        {
            try
            {
                string pr_id = string.Empty;
                bool b = bs.insert_product(pr_name,c_id, ref pr_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("pr_id", pr_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增品名成功" : "错误:已存在相同的品名。",
                    lst); 
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_product(string c_id)
        {
            try
            {
                DataTable dt = bs.get_product(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_product_by_page(string like_str, string c_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_product_by_page(like_str, 
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
                
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_product_by_like_str_for_combogrid(string like_str, string c_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_product_by_like_str_for_combogrid(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);

            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_product_by_like_str(string like_str,string c_id)
        {
            try
            { 
                DataTable dt = bs.get_product_by_like_str(like_str,c_id );
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_product_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_product(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_product(string pr_name,string pr_id,string c_id)
        {
            try
            {
                bool b = bs.update_product(pr_name, pr_id,c_id);
               
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改品名成功" : "错误:已存在相同的品名。" );
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_product(string pr_ids,string c_id)
        {
            try
            { 
                bool b = bs.delete_product( pr_ids);
                string product_list = get_product_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("product_list", product_list));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除品名完成" : "异常:请联系管理员处理。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 费目
        #region 新增
        public string insert_fee_item(string fee_code,
            string fee_cn,
            string fee_remark,
            string c_id)
        {
            try
            {
                string fee_id = string.Empty;
                bool b = bs.insert_fee_item(fee_code, fee_cn,fee_remark,c_id, ref fee_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("fee_id", fee_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增费项成功" : "错误:已存在相同的费项。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_fee_item(string c_id)
        {
            try
            {
                DataTable dt = bs.get_fee_item(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_fee_item_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_fee_item(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_fee_item(string fee_code,
            string fee_cn,
            string fee_remark,
            string fee_id,
            string c_id)
        {
            try
            {
                bool b = bs.update_fee_item(fee_code, fee_cn, fee_remark, fee_id,c_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改费项成功" : "错误:已存在相同的费项。");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_fee_item(string fee_ids,string c_id)
        {
            try
            {
                bool b = bs.delete_fee_item(fee_ids);
                string fee_item_list = get_fee_item_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("fee_item_list", fee_item_list));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除费项完成" : "异常:请联系管理员处理。",
                    lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #endregion

        #region 货运条款
        #region 新增
        public string insert_freight(string fr_name,string fr_cn_desc,string c_id)
        {
            try
            {
                string fr_id = string.Empty;

                bool b = bs.insert_freight(fr_name,fr_cn_desc,c_id,ref fr_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("fr_id", fr_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增货运条款成功" : "错误:已存在相同的货运条款。",
                    lst); 
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_freight(string c_id)
        {
            try
            {
                DataTable dt = bs.get_freight(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool get_frieght_by_fr_name(string fr_name,string c_id,ref string fr_id)
        {
            try
            {
                bool b = bs.get_frieght_by_fr_name(fr_name, c_id, ref fr_id);

                return b;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_freight_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_freight(c_id);
                  
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string get_freight_pub_of_ship_voyage(string c_id)
        {
            try
            {
                DataTable dt = bs.get_freight_of_ship_voyage(c_id);

                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_freight(string fr_name, string fr_cn_desc, string fr_id, string c_id)
        {
            try
            {

                bool b = bs.update_freight(fr_name, fr_cn_desc, fr_id, c_id);
                
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改货运条款成功" : "错误:已存在相同的货运条款。" );
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_freight(string fr_ids, string c_id)
        {
            try
            { 
                bool b = bs.delete_freight(fr_ids);
                string freight_list = get_freight_pub(c_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("freight_list", freight_list));
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除货运条款完成" : "异常:请联系管理员处理。",lst);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #endregion

        #region 贸易条款
        #region 新增
        public string insert_trade(string tr_name,string tr_cn_desc,string c_id)
        {
            try
            {
                string tr_id = string.Empty; 
                bool b = bs.insert_trade(tr_name,tr_cn_desc,c_id,ref tr_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("tr_id", tr_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增贸易条款成功" : "错误:已存在相同的贸易条款。",
                    lst);
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #region 获取
        public string get_trade(string c_id)
        {
            try
            {
                DataTable dt = bs.get_trade(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_trade_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_trade(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_trade(string tr_name, string tr_cn_desc,string tr_id,string c_id)
        {
            try
            { 
                bool b = bs.update_trade(tr_name, tr_cn_desc, tr_id,c_id);
                
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改贸易条款成功" : "错误:已存在相同的贸易条款。");
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_trade(string tr_ids,string c_id)
        {
            try
            {
                bool b = bs.delete_trade(tr_ids);
                string trade_list = get_trade_pub(c_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("trade_list", trade_list));
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除贸易条款成功" : "异常:请联系管理员处理。",lst);
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #endregion

        #region 船公司
        #region 新增
        public string insert_ship_company(string sh_name,string sh_cod,string c_id)
        {
            try
            {
                string sh_id = string.Empty;

                bool b = bs.insert_ship_company(sh_name, sh_cod,c_id, ref sh_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>(); 
                lst.Add(new KeyValuePair<string, string>("sh_id",sh_id));
                
                return BLL.commone.BLL_commone.result_convert_json(b?1:0,
                    b? "新增船公司成功":"错误:已存在相同的船公司。",
                    lst);
                 
            }
            catch (Exception)
            { 
                throw;
            }
        }
        #endregion
        #region 修改
        public string update_ship_company(string sh_id,
            string sh_name,
            string sh_cod,
            string c_id)
        {
            try
            {
                bool b = bs.update_ship_company(sh_id, sh_name, sh_cod, c_id);
                  
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改船公司成功" : "错误:已存在相同的船公司。" );

            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #region 获取
        public string get_ship_company(string c_id)
        {
            try
            {
                DataTable dt = bs.get_ship_company(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            { 
                throw;
            }
        }
        public string get_ship_company_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_ship_company(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public string get_ship_company_by_like_str_for_combogrid(string like_str, string c_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_ship_company_by_like_str_for_combogrid(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);

            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_ship_company(string sh_ids,string c_id)
        {
            try
            {
                bool b = bs.delete_ship_company(sh_ids );
                string shipcompany_list = get_ship_company_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("ship_company_list", shipcompany_list));
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除船公司完成" : "异常: 请联系管理员处理。",lst);

            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #endregion

        #region 发票类型
        #region 新增 
        public string insert_invoice(string in_name,string in_val,string c_id)
        {
            try
            {
                string in_id = string.Empty;

                bool b = bs.insert_invoice(in_name, in_val,c_id, ref in_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("in_id", in_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增发票类型成功" : "错误:已存在相同的发票类型。",
                    lst); 
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 修改
        public string update_invoice(string in_id,string in_name,
            string in_val,
            string c_id)
        {
            try
            {
                bool b = bs.update_invoice(in_id,in_name, in_val,c_id);
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改发票类型成功" : "错误:已存在相同的发票类型,修改失败。");  
                
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 获取
        public string get_invoice(string c_id)
        {
            try
            {
                DataTable dt = bs.get_invoice(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_invoice_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_invoice(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_invoice(string in_ids,string c_id)
        {
            try
            {
                bool b = bs.delete_invoice(in_ids);
                string invoice_list = get_invoice_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("invoice_list", invoice_list));
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除发票类型完成" : "异常: 请联系管理员处理。", lst);

            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion

        #endregion

        #region 集散类型 --原货物类型
        public string get_boxtype(string c_id)
        {
            try
            {
                DataTable dt = bs.get_boxtype(c_id); 
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string get_boxtype_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_boxtype(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 贸易类型
        public string get_trade_typ(string c_id)
        {
            try
            {
                DataTable dt = bs.get_trade_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string get_trade_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_trade_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 装箱方式
        public string get_stuffing_container_typ(string c_id)
        {
            try
            {
                DataTable dt = bs.get_stuffing_container_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string get_stuffing_container_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_stuffing_container_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 报关方式
        public string get_declare_custom_typ(string c_id)
        {
            try
            {
                DataTable dt = bs.get_declare_custom_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string get_declare_custom_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_declare_custom_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 付款类型
        public string get_payment_typ(string c_id)
        {
            try
            {
                DataTable dt = bs.get_payment_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string get_payment_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_payment_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 集装箱尺寸
        public string get_container_siz(string c_id)
        {
            try
            {
                DataTable dt = bs.get_container_siz(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string get_container_siz_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_container_siz(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 集装箱型
        public string get_container_typ(string c_id)
        {
            try
            {
                DataTable dt = bs.get_container_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string get_container_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_container_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 航线
        #region 新增
        public string insert_voyage_line(string vl_desc, string vl_code,string c_id)
        {
            try
            {
                string vl_id = string.Empty;

                bool b = bs.insert_voyage_line(vl_desc, vl_code,c_id, ref vl_id);
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("vl_id", vl_id));

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增航线成功" : "错误:已存在相同的航线。",
                    lst);

            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #region 修改
        public string update_voyage_line(string vl_id,
            string vl_desc,
            string vl_code,
            string c_id)
        {
            try
            {
                bool b = bs.update_voyage_line(vl_id, vl_desc, vl_code,c_id);

                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改航线成功" : "错误:已存在相同的航线。");

            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #region 获取
        public string get_voyage_line(string c_id)
        {
            try
            {
                DataTable dt = bs.get_voyage_line(c_id);
                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public string get_voyage_line_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_voyage_line(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #region 删除
        public string delete_voyage_line(string vl_ids,string c_id)
        {
            try
            {
                bool b = bs.delete_voyage_line(vl_ids);
                string voyage_line_list = get_voyage_line_pub(c_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("voyage_line_list", voyage_line_list));
                return BLL.commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除航线完成" : "异常: 请联系管理员处理。", lst);

            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
        #endregion

        #region  地点 港口 码头 机场 送货地址 火车站
        #region 获取地点类型
        public string get_place_typ(string c_id)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_place_typ(c_id);

                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_place_typ_pub(string c_id)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_place_typ(c_id);

                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取地点 分页

        public bool get_place_by_pl_name(string pl_name, string c_id, ref string pl_id)
        {
            try
            {
                bool b = bs.get_place_by_pl_name(pl_name, c_id, ref pl_id);

                return b;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_place(string like_str,
            string pt_id,
            string c_id,
            string page,
            string rows,
            string sort,
            string ordersort )
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_place(like_str,
                    pt_id,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_place_by_like_str_for_combogrid(string like_str, 
           string c_id,
           string page,
           string rows,
           string sort,
           string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_place_by_like_str_for_combogrid(like_str, 
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_place_by_like_str(string like_str, 
            string c_id )
        {
            try
            {
              
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_place_by_like_str(like_str, 
                    c_id );

                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取地点 联想
        public string get_place_by_short(string like_str,
            string pt_id,
            string c_id)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                DataTable dt = bd.get_place_by_short(like_str, pt_id, c_id);

                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取地点 全部
        public string get_place_pub(string c_id)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                DataTable dt = bd.get_place_pub(c_id);

                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增
        public string insert_place(string pl_name,
            string pl_en_name,
            string pl_code,
            string pl_typ,
            string c_id)
        {
            try
            {
                string pl_id = string.Empty;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                bool result = bd.insert_place(pl_name,pl_en_name,pl_code,pl_typ,c_id,ref pl_id);

                List<KeyValuePair<string,string>> lst = new List<KeyValuePair<string,string>>();
                lst.Add(new KeyValuePair<string,string>("pl_id",pl_id));

                return BLL.commone.BLL_commone.result_convert_json(result ? 1 : 0, result ? "新增地址信息成功" : "错误:存在相同类型相同描述的地址信息。", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改
        public string update_place(string pl_name,
            string pl_en_name,
            string pl_code,
            string pl_typ,
            string pl_id,
            string c_id)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                bool result = bd.update_place(pl_name, pl_en_name, pl_code,
                    pl_typ,
                    pl_id,
                    c_id);

                return BLL.commone.BLL_commone.result_convert_json(result?1:0,
                    result?"修改地址信息完成":"错误:存在相同类型相同描述的地址信息。");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除
        public string delete_place(string pl_ids)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                bool result = bd.delete_place(pl_ids);
                return BLL.commone.BLL_commone.result_convert_json(result ? 1 : 0,
                    result ? "删除地址信息完成" : "异常:请联系管理员处理。");
                
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region  结算对象
        #region 获取客户类型
        public string get_custom_typ(string c_id)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_custom_typ(c_id);

                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_custom_typ_pub(string c_id)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_custom_typ(c_id);

                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取客户 分页
        public bool get_custom_by_cu_name(string cu_name, string c_id, ref string cu_id)
        {
            try
            {
                bool b = bs.get_custom_by_cu_name(cu_name, c_id, ref cu_id);

                return b;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_custom(string like_str,
            string cu_type,
            string c_id,
            string page,
            string rows,
            string sort,
            string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_custom(like_str,
                    cu_type,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_custom_pub(string c_id)
        {
            try
            { 
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_custom_pub(c_id);

                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_custom_by_like_str(string like_str, 
            string c_id  )
        {
            try
            {
                 
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_custom_by_like_str(like_str,  
                    c_id );

                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public string get_custom_by_like_str_for_combogrid(string like_str, 
           string c_id,
           string page,
           string rows,
           string sort,
           string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                DataTable dt = bd.get_custom_by_like_str_for_combogrid(like_str, 
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);

                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取客户 联想
        public string get_custom_by_short(string like_str,
            string cu_type,
            string c_id)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                DataTable dt = bd.get_custom_by_short(like_str, cu_type,c_id);

                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_custom_by_short_pub(string c_id)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                DataTable dt = bd.get_custom_pub(c_id);

                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增
        public string insert_custom(string cu_name,
            string cu_code,
            string cu_short,
            string cu_type,
            string cu_create_by_id,
            string cu_duty_no,
            string cu_fee_limit_days,
            string c_id,
            string cu_pay_checkaccount_flag,
            string cu_rec_checkaccount_flag)
        {
            try
            {
                string cu_id = string.Empty;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                bool result = bd.insert_custom(cu_name, cu_code,
                    cu_short, cu_type,cu_create_by_id,cu_duty_no,cu_fee_limit_days,c_id,
                    cu_pay_checkaccount_flag,
                    cu_rec_checkaccount_flag,
                    ref cu_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("cu_id", cu_id));

                return BLL.commone.BLL_commone.result_convert_json(result ? 1 : 0,
                    result ? "新增客户信息成功" : "错误:存在相同类型相同描述的客户信息。", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改
        public string update_custom(string cu_name,
            string cu_code,
            string cu_short,
            string cu_type,
            string cu_id,
            string cu_duty_no,
            string cu_fee_limit_days,
            string c_id,
            string cu_pay_checkaccount_flag,
            string cu_rec_checkaccount_flag)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                bool result = bd.update_custom(cu_name, cu_code, cu_short,
                    cu_type,
                    cu_id,
                    cu_duty_no,
                    cu_fee_limit_days,
                    c_id,
                    cu_pay_checkaccount_flag,
                    cu_rec_checkaccount_flag);

                return BLL.commone.BLL_commone.result_convert_json(result ? 1 : 0,
                    result ? "修改客户信息完成" : "错误:存在相同类型相同描述的客户信息。");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除
        public string delete_custom(string cu_ids)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                bool result = bd.delete_custom(cu_ids);
                return BLL.commone.BLL_commone.result_convert_json(result ? 1 : 0,
                    result ? "删除客户信息完成" : "异常:请联系管理员处理。");

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 银行信息
        #region 获取 通过客户ID和 是否默认 可以为空
        public string get_bank_by_cu_id(string ba_cu_id,
            string ba_default_flag)
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                DataTable dt = bd.get_bank_by_cu_id(ba_cu_id, ba_default_flag);

                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string get_bank_info_by_cu_id(string cu_id )
        {
            try
            {
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                DataTable dt = bd.get_bank_info_by_cu_id(cu_id);

                return BLL.commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增
        public string insert_bank(string ba_cu_id,
            string ba_desc,
            string ba_card_no,
            string ba_address,
            string ba_cr_id,
            string ba_default_flag )
        {
            try
            {
                string ba_id = string.Empty;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                bool result = bd.insert_bank(ba_cu_id, ba_desc,
                    ba_card_no, ba_address, ba_cr_id, ba_default_flag, ref ba_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("ba_id", ba_id));

                return BLL.commone.BLL_commone.result_convert_json(result ? 1 : 0,
                    result ? "新增银行信息成功" : "错误:存在相同银行、币种、卡号的银行信息。", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改
        public string update_bank( 
            string ba_desc,
            string ba_card_no,
            string ba_address,
            string ba_cr_id,
            string ba_default_flag,
            string ba_id)
        {
            try
            {
               
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                bool result = bd.update_bank(  ba_desc,
                    ba_card_no, ba_address, ba_cr_id, ba_default_flag,ba_id);
 
                return BLL.commone.BLL_commone.result_convert_json(result ? 1 : 0,
                    result ? "修改银行信息完成" : "错误:存在相同银行、币种、卡号的银行信息。");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除
        public string delete_bank(string ba_ids)
        {
            try
            {

                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();

                bool result = bd.delete_bank(ba_ids);

                return BLL.commone.BLL_commone.result_convert_json(result ? 1 : 0,
                    result ? "删除银行信息完成" : "异常:请联系管理员处理。");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 运程类型
        public string get_transport_typ_pub(string c_id)
        {
            try
            {
                DataTable dt = bs.get_transport_typ(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region  工具 模糊查询
        public string get_tools_desc_for_combox(string like_str,
           string c_id,
           string page,
           string rows,
           string sort,
           string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                DataTable dt = bd.get_tools_desc_for_combox(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);
                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 

        #region 区域
        public string get_area_list(string c_id)
        {
            try
            {
                DataTable dt = bs.get_area_list(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string insert_area(string c_id,string area_desc, string area_create_by_id)
        {
            try
            {
                string area_id = string.Empty;

                bool b = bs.insert_area(c_id,
                    area_desc,
                    area_create_by_id,
                    ref area_id
                    );
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                KeyValuePair<string, string> k = new KeyValuePair<string, string>("area_id", area_id);

                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "新增地区成功" : "存在相同的地区代码", lst);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string update_area(string area_id, string area_desc)
        {
            try
            {
                int result = bs.update_area(
                  area_id,
                  area_desc
                  );

                string context = result == 1 ? "修改地区成功" : (result == -1 ? "存在相同的地区代码" : "因为航线或码头占用无法失效");

                return commone.BLL_commone.result_convert_json(result == 1 ? 1 : 0, context);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string delete_area(string area_ids)
        {
            try
            {
                bool b = bs.delete_area(area_ids);
                return commone.BLL_commone.result_convert_json(b ? 1 : 0, b ? "地区设置失效成功" : "因为航线或码头占用无法失效");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 港口
        public string get_port_list(string c_id)
        {
            try
            {
                DataTable dt = bs.get_port_list(c_id);
                return BLL.commone.BLL_commone.data_convert_jsonarray(dt);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public string get_port_list_by_like_str_for_combogrid(string like_str,
           string c_id,
           string page,
           string rows,
           string sort,
           string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                DataTable dt = bd.get_port_list_by_like_str_for_combogrid(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);
                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public string insert_port(string c_id,
            string p_desc, 
            string p_en_cod, 
            string area_id, 
            string cu_cy_id, 
            string cu_cov_id, 
            string cu_tally_id, 
            string cu_qua_id, 
            string p_create_by_id)
        {
            try
            {
                string p_id = string.Empty;
                bool b = bs.insert_port(c_id,p_desc, p_en_cod, area_id, cu_cy_id, cu_cov_id, cu_tally_id, cu_qua_id, p_create_by_id, ref p_id);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                KeyValuePair<string, string> k = new KeyValuePair<string, string>("p_id", p_id);
                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增码头成功" : "存在相同的码头代码", lst);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string update_port(string p_id, string p_desc, string p_en_cod, string area_id, string cu_cy_id, string cu_cov_id, string cu_tally_id, string cu_qua_id)
        {
            try
            {
                bool b = bs.update_port(
                  p_id,
                  p_desc,
                  p_en_cod,
                  area_id,
                  cu_cy_id,
                  cu_cov_id,
                  cu_tally_id,
                  cu_qua_id
                  );
                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "编辑码头成功" : "存在相同的码头代码");
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string delete_port(string p_ids)
        {
            try
            {
                bool b = bs.delete_port(
                  p_ids
                  );
                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除码头成功" : "未知错误");
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 注册船舶  模糊查询
        public string get_ship_list_by_like_str_for_combogrid(string like_str,
                  string c_id,
                  string page,
                  string rows,
                  string sort,
                  string ordersort)
        {
            try
            {
                int rowcount = 0;
                DAL.sys_base.base_data bd = new DAL.sys_base.base_data();
                DataTable dt = bd.get_ship_list_by_like_str_for_combogrid(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort,
                    ref rowcount);
                return BLL.commone.BLL_commone.data_convert_json(dt, rowcount);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

    }
}
