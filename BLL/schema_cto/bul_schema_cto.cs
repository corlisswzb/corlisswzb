using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.schema_cto;

namespace BLL.schema_cto
{
    public class bul_schema_cto
    {
        public bul_schema_cto()
        {

        }
        #region 组织框架

        #region 获取组织框架

        public string get_schema_cto()
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt = bal.get_schema_cto();
                
                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }

        #endregion

        #region 仅得到公司
        public string get_company_only()
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt = bal.get_company_only(); 
                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        public string get_schema_cto_by_c_id(string c_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt = bal.get_schema_cto_by_c_id(c_id);
                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }

        public string get_schema_cto_desc_by_c_id(string c_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt = bal.get_schema_cto_by_c_id(c_id);
                if (dt.Rows.Count > 0)
                {
                    return dt.Rows[0]["c_desc"].ToString();
                }
                else
                {
                    return string.Empty;
                }
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }

        public bool isoperation_limit_by_u_id(string c_id,
            string u_id)
        {
            try
            {
                try
                {
                    bal_schema_cto bal = new bal_schema_cto();
                    bool b = bal.isoperation_limit_by_u_id(c_id, u_id);
                    return b;
                }
                catch (Exception olee)
                {
                    throw olee;
                }
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion 

        #region 添加组织框架
        public string insert_schema_cto(string c_desc,
            string c_en_desc,
            string c_address,
            string c_en_address,
            string c_relation_phone,
            string c_father_id,
            string c_typ)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                string c_id = string.Empty;
                bool b = bal.insert_schema_cto(
                    c_desc,
                    c_en_desc,
                    c_address,
                    c_en_address,
                    c_relation_phone,
                    c_father_id,
                    c_typ,
                    ref c_id
                    );

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                KeyValuePair<string, string> k = new KeyValuePair<string, string>("c_id", c_id);
                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "新增完成" : "异常，请联系管理员处理", lst);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 修改组织框架
        public string update_schema_cto(
            string c_id,
            string c_desc,
            string c_en_desc,
            string c_address,
            string c_en_address,
            string c_relation_phone)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();

                bool b = bal.update_schema_cto(c_id, c_desc,
                    c_en_desc,
                    c_address,
                    c_en_address,
                    c_relation_phone);

                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

                KeyValuePair<string, string> k = new KeyValuePair<string, string>("c_id", c_id);
                lst.Add(k);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "修改完成" : "异常，请联系管理员处理", lst);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 删除组织框架
        public string delete_schema_cto(string c_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();

                bool b = bal.delete_schema_cto(c_id);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "删除完成" : "异常，请联系管理员处理");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 关联人员到组织框架
        public string bind_user_schema_relation(string c_id, string u_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();

                bool b = bal.bind_user_schema_relation(c_id, u_id);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "关联人员完成" : "异常，请联系管理员处理");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 关联人员到组织框架
        public string unbind_user_schema_relation(string c_id, string u_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();

                bool b = bal.unbind_user_schema_relation(c_id, u_id);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "取消关联人员完成" : "异常，请联系管理员处理");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取关联人员的职位信息
        public string get_user_schema_relation(string c_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt = bal.get_user_schema_relation(c_id);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 得到所有权限列表
        public string get_limit_list()
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt = bal.get_limit_list();

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 组合 组织框架和权限列表
        public string get_schema_and_limit()
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt_limit = bal.get_limit_list();
                DataTable dt_schema = bal.get_schema_cto();

                KeyValuePair<string, string> key1 = new KeyValuePair<string, string>(
                    "schema_list", commone.BLL_commone.data_convert_jsonarray(dt_schema)
                    );
                KeyValuePair<string, string> key2 = new KeyValuePair<string, string>(
                    "limit_list", commone.BLL_commone.data_convert_jsonarray(dt_limit)
                    );
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(key1);
                lst.Add(key2);
                return commone.BLL_commone.custom_convert_json(lst);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 关联权限到职位
        public string bind_limit_schema_relation(string c_id, string l_id)
        {

            try
            {
                bal_schema_cto bal = new bal_schema_cto();

                bool b = bal.bind_limit_schema_relation(c_id, l_id);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "关联权限完成" : "异常，请联系管理员处理");
            }
            catch (Exception e)
            {
                throw e;
            }

        }
        #endregion

        #region 取消关联权限到职位
        public string unbind_limit_schema_relation(string c_id, string l_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();

                bool b = bal.unbind_limit_schema_relation(c_id, l_id);

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "取消关联权限完成" : "异常，请联系管理员处理");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 通过职位得到对应的权限
        public string get_limit_list_by_c_id(string c_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt = bal.get_limit_list_by_c_id(c_id);
                 
                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 通过员工得到对应的权限
        public string get_limit_list_by_u_id(string u_id,string c_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt = bal.get_limit_list_by_u_id(u_id,c_id);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }

        public string get_can_finace(string u_id,string c_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                bool b = bal.get_can_finace(u_id, c_id);

                return "{\"result\":" + (b ? "1" : "0") + "}";
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion

        #region 银行账户
        #region 插入更新银行账户
        public string insert_schema_cto_bank_and_invoice_info(string c_id,
            string c_tax_no,
            string c_cn_bank_desc,
            string c_cn_bank_no,
            string c_cn_register_address,
            string c_cn_phone,
            string c_en_bank_desc,
            string c_en_bank_no,
            string c_en_register_address,
            string c_invoice_address,
            string c_invoice_name,
            string c_invoice_phone)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();

                bool b = bal.insert_schema_cto_bank_and_invoice_info(c_id,
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

                return commone.BLL_commone.result_convert_json(b ? 1 : 0,
                    b ? "更新银行账户完成" : "异常，请联系管理员处理");
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 获取银行账户
        public string get_schema_cto_bank_and_invoice_info(string c_id)
        {
            try
            {
                bal_schema_cto bal = new bal_schema_cto();
                DataTable dt = bal.get_schema_cto_bank_and_invoice_info(c_id);

                return commone.BLL_commone.data_convert_json(dt);
            }
            catch (Exception olee)
            {
                throw olee;
            }
        }
        #endregion 
        #endregion 


        

        #endregion
    }
}
