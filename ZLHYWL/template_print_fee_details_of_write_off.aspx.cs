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

namespace SDZL
{
    public partial class template_print_fee_details_of_write_off : System.Web.UI.Page
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

                        case "print_order_fee_by_woa_seq":
                            {
                                print_order_fee_by_woa_seq(req, res);
                            }
                            break;

                        #endregion
                    }
                }
                catch (Exception ex)
                {
                    mylog.writelog("template_print_fee_details." + action,
                     System.DateTime.Now.ToString(),
                     Session["u_id"].ToString() + "/" + ex.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
                }
            }
        }
        #region 通过销账记录打印发票费用明细
        private void print_order_fee_by_woa_seq(HttpRequest req, HttpResponse res)
        {
            try
            {
                string woa_seq = req.Params["woa_seq"] == null ? string.Empty : req.Params["woa_seq"].ToString();

                string print_nam = Session["u_real_name"].ToString();
                string cpy_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();
                if (!woa_seq.Equals(string.Empty))
                {
                    string company_desc = string.Empty;
                    string title = string.Empty;
                    string typ_title_desc = string.Empty;
                    string rec_or_pay_desc = string.Empty;
                    string cu_desc = string.Empty;
                    string record_nam = string.Empty;
                    string record_dat = string.Empty;
                    string fee_group_info = string.Empty;
                    string bak = string.Empty;
                    string relation_user_info = string.Empty;
                    string no = string.Empty;
                    string flow_no = string.Empty;
                    string print_dat = string.Empty;

                    BLL.checkaccount.bll_check_account bul = new BLL.checkaccount.bll_check_account();

                    string[] arr_woa_seq = woa_seq.Split(',');

                    foreach (string s in arr_woa_seq)
                    {
                        List<CAL.ap_flow_details.ap_flow> lst_ap = null;
                        //这时得到费用信息
                        List<CAL.download_cls.order_fee> lst = bul.get_order_fee_for_print_by_woa_seq(s,
                        ref company_desc,
                        ref title,
                        ref typ_title_desc,
                        ref rec_or_pay_desc,
                        ref cu_desc,
                        ref record_nam,
                        ref record_dat,
                        ref fee_group_info,
                        ref bak,
                        ref relation_user_info,
                        ref no,
                        ref flow_no,
                        ref print_dat,
                        ref lst_ap);

                        string table_title = create_title(bak,
                            company_desc,
                            title,
                            rec_or_pay_desc,
                            typ_title_desc,
                            cu_desc,
                            record_dat,
                            record_nam,
                            relation_user_info,
                            fee_group_info,
                            no,
                            flow_no,
                            print_dat,
                            print_nam);

                        string table_body = create_details(lst, lst_ap);
                        string table_foot = create_foot(fee_group_info);

                        this.Literal1.Text += table_title;
                        this.Literal1.Text += table_body;
                        this.Literal1.Text += table_foot;
                    } 
                } 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        private string create_title(string bak,
               string company_desc,
               string title,
               string rec_or_pay_desc,
               string typ_title_desc,
               string cu_desc,
               string record_dat,
               string record_nam,
               string relation_user_info,
               string fee_group_info,
               string no,
               string flow_no,
               string print_dat,
               string print_nam)
        { 

            
            StringBuilder sb = new StringBuilder(

                "<table class=\"abtab_print tab_part\" style=\"border-collapse:collapse;\">" +
                    "<col style=\"width:80px\" />" +
                    "<col style=\"width:720px\" />" +
                    "<col style=\"width:80px\" />" +
                    "<col style=\"width:100px\" />" +
                    "<thead>" +
                        "<tr><td colspan=\"4\">" +
                            "<div class=\"top_title\"> " +
                                "<div>" + company_desc +
                                "</div>" +
                                "<div>" + title +
                                "</div>" +
                            "</div>" +
                        "</td></tr>" +
                    "</thead>" +
                    "<tbody>" +
                        "<tr>" +
                            "<td class=\"title\"> 流水号 </td>" +
                            "<td class=\"value\" >" + flow_no +
                            "</td> " +
                            "<td class=\"title\"> 类型 </td>" +
                            "<td class=\"value\" >" + rec_or_pay_desc +
                            "</td> " +
                        "</tr>" + 
                        "<tr>" +
                            "<td class=\"title\" rowspan=\"2\">对方单位</td>" +
                            "<td class=\"value\" rowspan=\"2\" style=\"font-size:16px;\">" + cu_desc +
                            "</td>" +
                            "<td class=\"title\"> 记录人 </td>" +
                            "<td class=\"value\" >" + record_nam +
                            "</td> " +
                        "</tr>" +
                        "<tr>" +
                            "<td class=\"title\">记录时间</td>" +
                            "<td class=\"value\">" + record_dat +
                            "</td>" +
                        "</tr> " +
                        "<tr>" +
                            "<td class=\"title\" rowspan=\"2\" valign=\"middle\">备注</td>" +
                            "<td class=\"value\" rowspan=\"2\" valign=\"top\">" + bak +
                            "</td> " +
                            "<td class=\"title\" rowspan=\"2\" valign=\"middle\"> 业务关联 </td>" +
                            "<td class=\"value\" rowspan=\"2\" valign=\"middle\">" + relation_user_info +
                            "</td>" +
                        "</tr>" +  
                    "</tbody>" +
                    "<tfoot>" +
                        "<tr>" +
                            "<td class=\"title\">制单</td>" +
                            "<td class=\"value\">" + print_nam +
                            "</td>" +
                            "<td class=\"title\">日期</td>" +
                            "<td class=\"value\">" + print_dat +
                            "</td>" +
                        "</tr>" +
                    "</tfoot>" +
                "</table> ");

            return sb.ToString();
        }

        private string create_details(List<CAL.download_cls.order_fee> lst, List<CAL.ap_flow_details.ap_flow> lst_ap)
        {
            //先输出 ap  
             

            string sb = "<table class=\"abtab_print tab_part_of_feetitle\"   style=\"border-collapse:collapse; margin-top:20px;\"> " +
            "<col style=\"width:50px;\"></col>" +
            "<col style=\"width:90px;\"></col>" +
            "<col style=\"width:100px;\"></col>" +
            "<col style=\"width:140px;\"></col>" +
            "<col style=\"width:85px;\"></col>" +
            "<col style=\"width:45px;\"></col>" +
            "<col style=\"width:85px;\"></col>" +
            "<col style=\"width:170px;\"></col>" +
            "<col style=\"width:75px;\"></col>" +
            "<col style=\"width:120px;\"></col>" + 
            "<thead>" +
                "<tr>" +
                    "<td style=\"text-align:center; line-height:24px; font-size:18px;  \" colspan=\"10\">" +
                        "费用明细" +
                    "</td>" +
                "</tr> " +
                "<tr>" +
                    "<th class=\"title\" >序号</th>" +
                     "<th class=\"title\">业务时间</th>" +
                    "<th class=\"title\">业务编号</th>" + 
                    "<th class=\"title\">主提单号</th>" + 
                    "<th class=\"title\" >费项</th>" +
                    "<th class=\"title\" >币种</th>" + 
                    "<th class=\"title\">金额</th>" +
                    "<th class=\"title\" >发票号</th>" +
                    "<th class=\"title\" >发票类型</th>" + 
                    "<th class=\"title\" >备注</th>" +
                "</tr>" +
            "</thead>" +
            "<tbody>";
            int nAp_step = 1;
            string cur_amc_id = string.Empty;
            CAL.ap_flow_details.ap_flow cur_af = null;
            int nrows = 0;
            for (int i = 0; i < lst.Count; i++)
            {
                CAL.download_cls.order_fee of = lst[i];
                CAL.ap_flow_details.ap_flow now_af = null;
                string now_amc_id = string.Empty;

                foreach(CAL.ap_flow_details.ap_flow af in  lst_ap)
                {
                    if (af.Amc_id == of.Ca_amc_id || af.Amc_id == of.Od_amc_id)
                    {
                        now_af = af;
                        now_amc_id = af.Amc_id;
                        break;
                    }
                }
                if (cur_amc_id.Equals(string.Empty))
                {
                    cur_amc_id = now_amc_id; 
                    cur_af = now_af;
                }

                
                if (cur_amc_id != now_amc_id && cur_af != null)
                {
                    sb += "<tr>";
                    sb += "<td class='value' colspan=\"10\">以上" + nrows.ToString() + "行销账记录所属审批:" + cur_af.Amc_no + "，审批流水:</td>";

                    sb += "</tr>";
                    //输出审核流程 
                    nAp_step = 1;
                    foreach (CAL.ap_flow_details.ap_flow_details apd in cur_af.Lst_ap_flow)
                    {
                        if (apd.Ap_context.Length > 0)
                        {
                            sb += "<tr>";
                            sb += "<td class='value' rowspan=\"2\">" + nAp_step.ToString() + "</td>";
                            sb += "<td class='value' colspan=\"9\">[" + apd.Aps_desc + "]" + apd.Ap_opr_nam + "于" + apd.Ap_opr_dat + apd.Ap_advice + "</td>";

                            sb += "</tr>";
                            sb += "<tr>";
                            sb += "<td class='value' colspan=\"9\">意见:" + apd.Ap_context + "</td>";
                            sb += "</tr>";
                        }
                        else
                        {
                            sb += "<tr>";
                            sb += "<td class='value' >" + nAp_step.ToString() + "</td>";
                            sb += "<td class='value' colspan=\"9\">[" + apd.Aps_desc + "]" + apd.Ap_opr_nam + "于" + apd.Ap_opr_dat + apd.Ap_advice + "</td>";

                            sb += "</tr>";
                        }
                        nAp_step++;
                    } 
                    nrows = 1;
                }
                else
                {
                    nrows += 1;
                }

                cur_amc_id = now_amc_id;
                cur_af = now_af;
                
                sb += "<tr>";
                sb += "<td class='value'>" + of.Index + "</td>";
                sb += "<td class='value'>" + of.Fee_dat + "</td>";
                sb += "<td class='value'>" + of.Od_no + "</td>";
                sb += "<td class='value'  style=\" white-space: nowrap;\">" + of.Od_bill_no + "</td>"; 
                sb += "<td class='value'>" + of.Fee_item_desc + "</td>";
                sb += "<td class='value'>" + of.Fee_cr_cod + "</td>";
                sb += "<td class='value'>" + of.Woa_money + "</td>"; 
                sb += "<td class='value'>" + of.Oi_no + "</td>";
                sb += "<td class='value'>" + of.Fee_invoice_typ_desc + "</td>";
                sb += "<td class='value'  style=\" white-space: nowrap;\">" + of.Fee_bak + "</td>";
                sb += "</tr>";
                       
            }

            if (cur_af != null)
            {
                sb += "<tr>";
                sb += "<td class='value' colspan=\"10\">以上" + nrows.ToString() + "行" + cur_af.Amc_no + "，审批流水:</td>";

                sb += "</tr>";
                //输出审核流程 
                nAp_step = 1;
                foreach (CAL.ap_flow_details.ap_flow_details apd in cur_af.Lst_ap_flow)
                {
                    if (apd.Ap_context.Length > 0)
                    {
                        sb += "<tr>";
                        sb += "<td class='value' rowspan=\"2\">" + nAp_step.ToString() + "</td>";
                        sb += "<td class='value' colspan=\"9\">[" + apd.Aps_desc + "]" + apd.Ap_opr_nam + "于" + apd.Ap_opr_dat + apd.Ap_advice + "</td>";

                        sb += "</tr>";
                        sb += "<tr>";
                        sb += "<td class='value' colspan=\"9\">意见:" + apd.Ap_context + "</td>";
                        sb += "</tr>";
                    }
                    else
                    {
                        sb += "<tr>";
                        sb += "<td class='value' >" + nAp_step.ToString() + "</td>";
                        sb += "<td class='value' colspan=\"9\">[" + apd.Aps_desc + "]" + apd.Ap_opr_nam + "于" + apd.Ap_opr_dat + apd.Ap_advice + "</td>";

                        sb += "</tr>";
                    }
                    nAp_step++;
                }  
            }
               

            return sb + "</tbody>";
        }

        //尾巴 
        private string create_foot(string fee_group_info)
        {
            StringBuilder sb = new StringBuilder(

                    "<tfoot>" +
                        "<tr>" +
                           
                            "<td class=\"value2\"  colspan=\"10\">费用汇总:" + fee_group_info +
                            "</td> " +
                        "</tr>" +
                    "</tfoot>" +
                "</table> ");

            return sb.ToString();
        }
        #endregion 
    }
}