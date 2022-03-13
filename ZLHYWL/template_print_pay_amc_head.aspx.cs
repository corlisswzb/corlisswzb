using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CAL.download_cls;
using System.Drawing.Printing;
using System.Drawing.Imaging;
using System.IO;
using System.Data;
using System.Text;
using System;
using BLL.commone;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace ZLHYWL
{
    public partial class template_print_pay_amc_head : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                string action = string.Empty;
                try
                {
                    /*
                     有好几种情况: 
                     */
                    HttpRequest req = Page.Request;
                    HttpResponse res = Page.Response;

                    action = req.Params["action"] == null ?
                        string.Empty : req.Params["action"];

                    switch (action)
                    {
                        #region 根据发票号打印 发票绑定的费用明细

                        case "print_pay_amc_head":
                            {
                                print_pay_amc_head(req, res);
                            }
                            break;
                        case "print_pay_amc_body":
                            {
                                print_pay_amc_body(req, res);
                            }
                            break;
                        case "print_pay_amc_all":
                            {
                                print_pay_amc_all(req, res);
                            }
                            break;
                        #endregion
                    }
                }
                catch (Exception ex)
                {
                    mylog.writelog("template_print_pay_amc_head." + action,
                     System.DateTime.Now.ToString(),
                     Session["u_id"].ToString() + "/" + ex.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
                }
            }
        }
        private string create_title(JObject amc_details,JArray amc_flow , string print_nam)
        {
            string sb =
                "<table class=\"abtab_print tab_part\" style=\"border-collapse:collapse;\">" +
                    "<col style=\"width:80px\" />" +
                    "<col style=\"width:700px\" />" +
                    "<col style=\"width:80px\" />" +
                    "<col style=\"width:120px\" />" +
                    "<thead>" +
                        "<tr><td colspan=\"4\">" +
                            "<div class=\"top_title\"> " +
                                "<div>" + amc_details["relation_c_long_desc"].ToString() +
                                "</div>" +
                                "<div>付款申请单" +
                                "</div>" +
                            "</div>" +
                        "</td></tr>" +
                    "</thead>" +
                    "<tbody>" +
                        "<tr>" +
                            "<td class=\"title\" >标题</td>" +
                            "<td class=\"value\" >" + amc_details["amc_title"].ToString() +
                            "</td> " +
                            "<td class=\"title\"> 申请号 </td>" +
                            "<td class=\"value\" >" + amc_details["relation_no"].ToString() +
                            "</td> " +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"title\" rowspan=\"2\">对方单位</td>" +
                            "<td class=\"value\" rowspan=\"2\" style=\"font-size:16px;\">" + amc_details["relation_cu_desc"].ToString() +
                            "</td>" +
                            "<td class=\"title\"> 申请人 </td>" +
                            "<td class=\"value\" >" + amc_details["amc_create_by_nam"].ToString() +
                            "</td> " +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"title\">申请时间</td>" +
                            "<td class=\"value\">" + amc_details["amc_create_dat"].ToString() +
                            "</td>" +
                        "</tr> " +
                        "<tr>" +
                            "<td class=\"title\" rowspan=\"2\" valign=\"top\">打款账户:</td>" +
                            "<td class=\"value\" rowspan=\"2\" valign=\"top\" style=\"font-size:14px; height:34px\">" + amc_details["group_bank"].ToString().Replace("\n","<br />") +
                            "</td>" +
                            "<td class=\"title\">付款方式</td>" +
                            "<td class=\"value\" >" + amc_details["ba_pay_typ_desc"].ToString() +
                            "</td>" +
                        "</tr>" +
                        "<tr>" +
                         
                            "<td class=\"title\">付款时间</td>" +
                            "<td class=\"value\" >" + amc_details["ba_pay_dat"].ToString() +
                            "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"title\" style=\"  height:44px\"  valign=\"middle\"  >费用汇总</td>" +
                            "<td class=\"value\" style=\"  height:44px\"  valign=\"top\">" + amc_details["total_amount_desc"] + "</td>" +
                            "</td>" +
                            "<td class=\"title\" style=\" height:44px\"  valign=\"middle\"> 业务关联 </td>" +
                            "<td class=\"value\" style=\" height:44px\"  valign=\"top\">" + amc_details["relation_user"].ToString() +
                            "</td>" +
                        "</tr>" + 
                        "<tr>" +
                            "<td class=\"title\" colspan=\"4\" align=\"center\">审核流程</td>" +
                        "</tr>";
            if (amc_flow != null && amc_flow.Count > 0)
            {
                for (int i = 0; i < amc_flow.Count; i++)
                {
                    sb += "<tr>" +
                            "<td class=\"title\" >" + (i+1).ToString() +"</td>" +
                            "<td class=\"value\" colspan=\"3\" >[" + amc_flow[i]["aps_desc"].ToString() + "]" +
                                amc_flow[i]["ap_opr_nam"].ToString() +
                                "于" + amc_flow[i]["ap_opr_dat"].ToString() +
                                amc_flow[i]["ap_advice"].ToString() +  
                            "</td> ";
                    if (amc_flow[i]["ap_context"].ToString().Length > 0)
                    {
                        sb += "</tr>" +
                             "<tr>"+
                            "<td class='value' colspan=\"3\">意见:" + amc_flow[i]["ap_context"].ToString() + "</td>" +
                             "</tr>";
                    }      else{
                        sb += "</tr>"; 
                    } 
                        
                }
            }
            sb +=    
                "</tbody>" +
                "<tfoot>" +
                    "<tr>" +
                        "<td class=\"title\">制单</td>" +
                        "<td class=\"value\">" + print_nam +
                        "</td>" +
                        "<td class=\"title\">日期</td>" +
                        "<td class=\"value\">" + amc_details["sys_date"].ToString() +
                        "</td>" +
                    "</tr>" +
                "</tfoot>" +
            "</table> " ;

            return sb.ToString();
        }
        private void print_pay_amc_all(HttpRequest req, HttpResponse res)
        {
            try
            {
                
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString(); 
                string amc_ids = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();  
                string rec_or_pay = req.Params["rec_or_pay"] == null ? "-1" : req.Params["rec_or_pay"].ToString();

                string print_nam = Session["u_real_name"].ToString();
                string cpy_id = Session["cpy_id"].ToString();

                if (!amc_ids.Equals(string.Empty))
                { 
                    string print_dat = string.Empty;

                    BLL.checkaccount.bll_check_account bul = new BLL.checkaccount.bll_check_account();
                    string[] arr_amc_id = amc_ids.Split(',');
                    foreach (string s in arr_amc_id)
                    {
                        //变成 jobject 
                        string json = bul.get_single_pay_checkaccount(c_id,
                        rec_or_pay,
                        s);
                        JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                        //amc_details 就是 审核  
                        //rows是费用  
                        JObject amc_details = (Newtonsoft.Json.Linq.JObject)data["amc_details"];

                        JArray order_fee = (Newtonsoft.Json.Linq.JArray)data["rows"];
                        BLL.approval.approval_mgr am = new BLL.approval.approval_mgr();
                        string relation_no = string.Empty;

                        DataTable dt_ap_flow = am.get_amc_actual_flow_details_for_print(s, ref relation_no);
                        string json_amc_flow = JsonConvert.SerializeObject(dt_ap_flow);
                        JArray amc_flow = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(json_amc_flow);

                        string table_title = create_title(amc_details, amc_flow,   print_nam);
                        //可能还需要一个 审核流程 
                        string table_details =  create_details(order_fee, amc_details["relation_no"].ToString());


                        //List<CAL.ap_flow_details.ap_flow> lst_ap = null;
                        ////这时得到费用信息
                        //List<CAL.download_cls.order_fee> lst = bul.get_single_pay_checkaccount(c_id,
                        //rec_or_pay,
                        //s);

                        //string table_title = create_title(bak,
                        //    company_desc,
                        //    title,
                        //    rec_or_pay_desc,
                        //    typ_title_desc,
                        //    cu_desc,
                        //    record_dat,
                        //    record_nam,
                        //    relation_user_info,
                        //    fee_group_info,
                        //    no,
                        //    flow_no,
                        //    print_dat,
                        //    print_nam);

                        //string table_body = create_details(lst, lst_ap);
                        //string table_foot = create_foot(fee_group_info);

                        this.Literal1.Text += table_title;
                        this.Literal1.Text += table_details; 
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private void print_pay_amc_head(HttpRequest req, HttpResponse res)
        {
            try
            {

                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();
                string amc_ids = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? "-1" : req.Params["rec_or_pay"].ToString();

                string print_nam = Session["u_real_name"].ToString();
                string cpy_id = Session["cpy_id"].ToString();

                if (!amc_ids.Equals(string.Empty))
                {
                    string print_dat = string.Empty;

                    BLL.checkaccount.bll_check_account bul = new BLL.checkaccount.bll_check_account();
                    string[] arr_amc_id = amc_ids.Split(',');
                    foreach (string s in arr_amc_id)
                    {
                        //变成 jobject 
                        string json = bul.get_single_pay_checkaccount(c_id,
                        rec_or_pay,
                        s);
                        JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                        //amc_details 就是 审核  
                        //rows是费用  
                        JObject amc_details = (Newtonsoft.Json.Linq.JObject)data["amc_details"];

                        JArray order_fee = (Newtonsoft.Json.Linq.JArray)data["rows"];
                        BLL.approval.approval_mgr am = new BLL.approval.approval_mgr();
                        string relation_no = string.Empty;

                        DataTable dt_ap_flow = am.get_amc_actual_flow_details_for_print(s, ref relation_no);
                        string json_amc_flow = JsonConvert.SerializeObject(dt_ap_flow);
                        JArray amc_flow = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(json_amc_flow);

                        string table_title = create_title(amc_details, amc_flow, print_nam);
                          
                        this.Literal1.Text += table_title; 
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private void print_pay_amc_body(HttpRequest req, HttpResponse res)
        {
            try
            {

                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();
                string amc_ids = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? "-1" : req.Params["rec_or_pay"].ToString();

                string print_nam = Session["u_real_name"].ToString();
                string cpy_id = Session["cpy_id"].ToString();

                if (!amc_ids.Equals(string.Empty))
                {
                    string print_dat = string.Empty;

                    BLL.checkaccount.bll_check_account bul = new BLL.checkaccount.bll_check_account();
                    string[] arr_amc_id = amc_ids.Split(',');
                    foreach (string s in arr_amc_id)
                    {
                        //变成 jobject 
                        string json = bul.get_single_pay_checkaccount(c_id,
                        rec_or_pay,
                        s);
                        JObject data = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                        //amc_details 就是 审核  
                        //rows是费用  
                        JObject amc_details = (Newtonsoft.Json.Linq.JObject)data["amc_details"];

                        JArray order_fee = (Newtonsoft.Json.Linq.JArray)data["rows"];
                       
                        string table_details = create_details_only(order_fee, amc_details["relation_no"].ToString());


                        this.Literal1.Text += table_details;
                    }
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private string create_details(JArray order_fee,string relation_no)
        {
            //先输出 ap  


            string sb = "<table class=\"abtab_print tab_part_of_feetitle\"   style=\"border-collapse:collapse; margin-top:20px;\"> " +
            "<col style=\"width:50px;\"></col>" +
            "<col style=\"width:90px;\"></col>" +
            "<col style=\"width:105px;\"></col>" +
            "<col style=\"width:150px;\"></col>" +
            "<col style=\"width:70px;\"></col>" +
            "<col style=\"width:55px;\"></col>" +
            "<col style=\"width:85px;\"></col>" +
            "<col style=\"width:170px;\"></col>" +
            "<col style=\"width:75px;\"></col>" +
            "<col style=\"width:120px;white-space: nowrap;\"></col>" +
            "<thead>" +
                "<tr>" +
                    "<td style=\"text-align:center; line-height:24px; font-size:18px;  \" colspan=\"10\">" +
                        "审核号" + relation_no +"费用明细" +
                    "</td>" +
                "</tr> " +
                "<tr>" +
                    "<th class=\"title\" style=\"width:50px;\">序号</th>" +
                     "<th class=\"title\" style=\"width:80px;\">业务时间</th>" +
                    "<th class=\"title\" style=\"width:90px;\">业务编号</th>" +
                    "<th class=\"title\" style=\"width:100px;\">主提单号</th>" +
                    "<th class=\"title\" style=\"width:80px;\">费项</th>" +
                    "<th class=\"title\" style=\"width:60px;\">币种</th>" +
                    "<th class=\"title\" style=\"width:80px;\">金额</th>" +
                    "<th class=\"title\" style=\"width:90px;\">发票号</th>" +
                    "<th class=\"title\" style=\"width:90px;\">发票类型</th>" +
                    "<th class=\"title\" style=\"width:90px;white-space: nowrap;\">备注</th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>";
             
            for (int i = 0; i < order_fee.Count; i++)
            { 
                sb += "<tr>";
                sb += "<td class='value'>" + (i + 1)+ "</td>";
                sb += "<td class='value'>" + order_fee[i]["fee_dat"].ToString() + "</td>";
                sb += "<td class='value'>" + order_fee[i]["od_no"].ToString() + "</td>";
                sb += "<td class='value'  style=\" white-space: nowrap;\">" + (order_fee[i]["od_main_bill_no"] == null ? string.Empty : order_fee[i]["od_main_bill_no"].ToString()) + "</td>";
                sb += "<td class='value'>" + order_fee[i]["fee_item_typ_desc"].ToString() + "</td>";
                sb += "<td class='value'>" + order_fee[i]["fee_currency_desc"].ToString() + "</td>";
                sb += "<td class='value'>" + (order_fee[i]["fee_amount"] == null ? string.Empty : order_fee[i]["fee_amount"].ToString()) + "</td>";
                sb += "<td class='value'>" + (order_fee[i]["od_invoice_no"] == null ? string.Empty : order_fee[i]["od_invoice_no"].ToString()) + "</td>";
                sb += "<td class='value'>" + order_fee[i]["fee_invoice_typ_desc"].ToString() + "</td>";
                sb += "<td class='value'  style=\" white-space: nowrap;\">" + (order_fee[i]["fee_bak"] == null ? string.Empty : order_fee[i]["fee_bak"].ToString()) + "</td>";
                sb += "</tr>";

            } 

            return sb + "</tbody>";
        }
        private string create_details_only(JArray order_fee, string relation_no)
        {
            //先输出 ap   
            string sb = "<table class=\"abtab_print tab_part\"   style=\"border-collapse:collapse; margin-top:20px;\"> " +
            "<col style=\"width:50px;\"></col>" +
            "<col style=\"width:90px;\"></col>" +
            "<col style=\"width:105px;\"></col>" +
            "<col style=\"width:150px;\"></col>" +
            "<col style=\"width:70px;\"></col>" +
            "<col style=\"width:55px;\"></col>" +
            "<col style=\"width:85px;\"></col>" +
            "<col style=\"width:170px;\"></col>" +
            "<col style=\"width:75px;\"></col>" +
            "<col style=\"width:120px;white-space: nowrap;\"></col>" +
            "<thead>" +
                "<tr>" +
                    "<td style=\"text-align:center; line-height:24px; font-size:18px;  \" colspan=\"10\">" +
                        "审核号" + relation_no + "费用明细" +
                    "</td>" +
                "</tr> " +
                "<tr>" +
                    "<th class=\"title\" style=\"width:50px;\">序号</th>" +
                     "<th class=\"title\" style=\"width:80px;\">业务时间</th>" +
                    "<th class=\"title\" style=\"width:90px;\">业务编号</th>" +
                    "<th class=\"title\" style=\"width:100px;\">主提单号</th>" +
                    "<th class=\"title\" style=\"width:80px;\">费项</th>" +
                    "<th class=\"title\" style=\"width:60px;\">币种</th>" +
                    "<th class=\"title\" style=\"width:80px;\">金额</th>" +
                    "<th class=\"title\" style=\"width:90px;\">发票号</th>" +
                    "<th class=\"title\" style=\"width:90px;\">发票类型</th>" +
                    "<th class=\"title\" style=\"width:90px;white-space: nowrap;\">备注</th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>";

            for (int i = 0; i < order_fee.Count; i++)
            {
                sb += "<tr>";
                sb += "<td class='value'>" + (i + 1) + "</td>";
                sb += "<td class='value'>" + order_fee[i]["fee_dat"].ToString() + "</td>";
                sb += "<td class='value'>" + order_fee[i]["od_no"].ToString() + "</td>";
                sb += "<td class='value'  style=\" white-space: nowrap;\">" + (order_fee[i]["od_main_bill_no"] == null ? string.Empty : order_fee[i]["od_main_bill_no"].ToString()) + "</td>";
                sb += "<td class='value'>" + order_fee[i]["fee_item_typ_desc"].ToString() + "</td>";
                sb += "<td class='value'>" + order_fee[i]["fee_currency_desc"].ToString() + "</td>";
                sb += "<td class='value'>" + (order_fee[i]["fee_amount"] == null ? string.Empty : order_fee[i]["fee_amount"].ToString()) + "</td>";
                sb += "<td class='value'>" + (order_fee[i]["od_invoice_no"] == null ? string.Empty : order_fee[i]["od_invoice_no"].ToString()) + "</td>";
                sb += "<td class='value'>" + order_fee[i]["fee_invoice_typ_desc"].ToString() + "</td>";
                sb += "<td class='value' style=\" white-space: nowrap;\">" + (order_fee[i]["fee_bak"] == null ? string.Empty : order_fee[i]["fee_bak"].ToString()) + "</td>";
                sb += "</tr>";

            }

            return sb + "</tbody>";
        }
    }
}