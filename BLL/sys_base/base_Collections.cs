using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.sys_base
{
    public class base_Collections
    {
        public base_Collections()
        {

        }
        #region 获取所有基础设置
      
        public string get_basesettingCollections(string u_id,string c_id)
        {
            string json = string.Empty;

            List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

            sys_base.base_data bs = new base_data();

            //当前系统时间 
            DateTime dt_now = BLL.commone.BLL_commone.get_sysdate();
            string systime = dt_now.ToString("yyyy-MM-dd");
            lst.Add(new KeyValuePair<string, string>("sys_time", systime));

            //所属公司
            usermanager.user_mgr um = new usermanager.user_mgr();
            string company_json = um.get_company_list_after_login(u_id);
            lst.Add(new KeyValuePair<string, string>("company_list", company_json));

            //员工
            string employ_json = um.get_userlist_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("employe_list", employ_json));


            //项目 
            string pt_json = bs.get_project_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("project_list", pt_json));
            //贸易类型
            string trade_typ_json = bs.get_trade_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("trade_typ_list", trade_typ_json));

            //业务类型 
            string order_typ_json = bs.get_order_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("order_typ_list", order_typ_json));

            //集散类型 
            string box_typ_json = bs.get_boxtype_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("box_typ_list", box_typ_json));

            //包装
            string pk_json = bs.get_packing_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("packing_list", pk_json));
             
            //运程类型
            string tt_json = bs.get_transport_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("transport_typ_list", tt_json));

            //签单方式 
            string sign_bill_typ_json = bs.get_sign_bill_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("sign_bill_typ_list", sign_bill_typ_json));

            //提单类型 
            string bill_typ_json = bs.get_bill_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("bill_typ_list", bill_typ_json));

            //装箱方式
            string stuffing_container_typ_json = bs.get_stuffing_container_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("stuffing_container_typ_list", stuffing_container_typ_json));

            //报关方式
            string declare_custom_typ_json = bs.get_declare_custom_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("declare_custom_typ_list", declare_custom_typ_json));

            //联运方式 
            string carriage_typ_json = bs.get_carriage_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("carriage_typ_list", carriage_typ_json));
             
            //箱尺寸
            string cs_json = bs.get_container_siz_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("container_siz_list", cs_json));

            //箱类型
            string ct_json = bs.get_container_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("container_typ_list", ct_json));

            //箱主
            string sh_json = bs.get_ship_company_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("ship_company_list", sh_json));

            //货运条款
            string fr_json = bs.get_freight_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("freight_list", fr_json));

            string svfr_json = bs.get_freight_pub_of_ship_voyage(c_id);
            lst.Add(new KeyValuePair<string, string>("ship_voyage_freight_list", svfr_json));


            //产品
            //string pr_json = bs.get_product_pub(c_id);
            //lst.Add(new KeyValuePair<string, string>("product_list", pr_json));


            //付款类型
            string payment_typ_json = bs.get_payment_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("payment_typ_list", payment_typ_json));
            //费目 
            string fe_json = bs.get_fee_item_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("fee_item_list", fe_json));

            //货币类型 
            string cur_json = bs.get_currency_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("currency_list", cur_json));

            //计量单位 
            string unit_json = bs.get_unit_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("unit_list", unit_json));

            //发票类型
            string in_json = bs.get_invoice_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("invoice_list", in_json));

            //航线 
            string voyage_line_json = bs.get_voyage_line_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("voyage_line_list", voyage_line_json));

            //地点
            //string place_list = bs.get_place_pub(c_id);
            //lst.Add(new KeyValuePair<string, string>("place_list", place_list));

            string place_typ_list = bs.get_place_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("place_typ_list", place_typ_list));

            //
            string trade_list = bs.get_trade_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("trade_list", trade_list));

            string pay_approval_payment_typ_list = bs.get_pay_approval_payment_typ(c_id);
            lst.Add(new KeyValuePair<string, string>("pay_approval_payment_typ_list", pay_approval_payment_typ_list));

            //客户

            //string custom_list = bs.get_custom_pub(c_id);
            //lst.Add(new KeyValuePair<string, string>("custom_list", custom_list));

            string custom_typ_list = bs.get_custom_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("custom_typ_list", custom_typ_list));


            

            //区域
            string area_list = bs.get_area_list(c_id);
            lst.Add(new KeyValuePair<string, string>("area_list", area_list));

            //港口
            string port_list = bs.get_port_list(c_id);
            lst.Add(new KeyValuePair<string, string>("port_list", port_list));


            json = commone.BLL_commone.custom_convert_json(lst);
            return json;
        }

        public string get_basesettingCollections_background(string u_id, string c_id)
        {
            string json = string.Empty;

            List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

            sys_base.base_data bs = new base_data();
            //产品
            string pr_json = bs.get_product_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("product_list", pr_json)); 
            ////地点
            string place_list = bs.get_place_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("place_list", place_list)); 
            //客户 
            string custom_list = bs.get_custom_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("custom_list", custom_list)); 
            json = commone.BLL_commone.custom_convert_json(lst);
            return json;
        }

        public string get_basesettingCollections_for_approval(string u_id, string c_id)
        {
            string json = string.Empty;

            List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();

            sys_base.base_data bs = new base_data();

            //当前系统时间 
            DateTime dt_now = BLL.commone.BLL_commone.get_sysdate();
            string systime = dt_now.ToString("yyyy-MM-dd");
            lst.Add(new KeyValuePair<string, string>("sys_time", systime));

            //所属公司
            usermanager.user_mgr um = new usermanager.user_mgr();
            string company_json = um.get_company_list_after_login(u_id);
            lst.Add(new KeyValuePair<string, string>("company_list", company_json));

            //员工
            string employ_json = um.get_userlist_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("employe_list", employ_json));


            //项目 
            string pt_json = bs.get_project_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("project_list", pt_json));
            //贸易类型
            string trade_typ_json = bs.get_trade_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("trade_typ_list", trade_typ_json));

            //业务类型 
            string order_typ_json = bs.get_order_typ_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("order_typ_list", order_typ_json));

            //集散类型 
            string box_typ_json = bs.get_boxtype_pub(c_id);
            lst.Add(new KeyValuePair<string, string>("box_typ_list", box_typ_json));

            
           
            json = commone.BLL_commone.custom_convert_json(lst);
            return json;
        }
        #endregion
        
    }
}
