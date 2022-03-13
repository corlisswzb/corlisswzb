using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using BLL.lead_query;
using BLL.commone; 
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using NPOI.SS.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.Util;
using System.Drawing;

namespace ZLHYWL.Ashx
{
    /// <summary>
    /// lead_query 的摘要说明
    /// </summary>
    public class lead_query : IHttpHandler, IRequiresSessionState
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


                    #region 费用汇总
                    case "get_order_fee_group":
                        {
                            get_order_fee_group(req, res);
                        }
                        break;
                    case "download_order_fee_group":
                        {
                            download_order_fee_group(req, res);
                        }
                        break;
                    #endregion
                    #region 员工统计
                    case "get_rpt_of_worker_group":
                        {
                            get_rpt_of_worker_group(req, res);
                        }
                        break;
                    case "get_rpt_of_worker_group_of_order_list":
                        {
                            get_rpt_of_worker_group_of_order_list(req, res);
                        }
                        break;
                    case "get_rpt_of_worker_group_of_fee_list":
                        {
                            get_rpt_of_worker_group_of_fee_list(req, res);
                        }
                        break;
                    case "get_rpt_of_worker_group_of_cntr_list":
                        {
                            get_rpt_of_worker_group_of_cntr_list(req, res);
                        }
                        break;
                    case "download_rpt_of_worker_group":
                        {
                            download_rpt_of_worker_group(req, res);
                        }
                        break;
                    case "download_rpt_of_order_list":
                        {
                            download_rpt_of_order_list(req, res);
                        }
                        break;
                    case "download_rpt_of_order_fee":
                        {
                            download_rpt_of_order_fee(req, res);
                        }
                        break;
                    case "download_rpt_of_order_cntr":
                        {
                            download_rpt_of_order_cntr(req, res);
                        }
                        break;
                    #endregion

                    #region 委托客户统计
                    case "get_rpt_of_delegate_group":
                        {
                            get_rpt_of_delegate_group(req, res);
                        }
                        break;
                    case "get_rpt_of_delegate_group_of_order_list":
                        {
                            get_rpt_of_delegate_group_of_order_list(req, res);
                        }
                        break;
                    case "get_rpt_of_delegate_group_of_fee_list":
                        {
                            get_rpt_of_delegate_group_of_fee_list(req, res);
                        }
                        break;
                    case "get_rpt_of_delegate_group_of_cntr_list":
                        {
                            get_rpt_of_delegate_group_of_cntr_list(req, res);
                        }
                        break;
                    case "download_rpt_of_delegate_group":
                        {
                            download_rpt_of_delegate_group(req, res);
                        }
                        break;
                    case "download_rpt_of_delegate_group_order_list":
                        {
                            download_rpt_of_delegate_group_order_list(req, res);
                        }
                        break;
                    case "download_rpt_of_delegate_group_order_fee":
                        {
                            download_rpt_of_delegate_group_order_fee(req, res);
                        }
                        break;
                    case "download_rpt_of_delegate_group_order_cntr":
                        {
                            download_rpt_of_delegate_group_order_cntr(req, res);
                        }
                        break;
                    #endregion

                    #region 委托结算单位统计
                    case "get_rpt_of_fee_cu_group":
                        {
                            get_rpt_of_fee_cu_group(req, res);
                        }
                        break;
                    case "get_rpt_of_fee_cu_group_of_order_list":
                        {
                            get_rpt_of_fee_cu_group_of_order_list(req, res);
                        }
                        break;
                    case "get_rpt_of_fee_cu_group_of_fee_list":
                        {
                            get_rpt_of_fee_cu_group_of_fee_list(req, res);
                        }
                        break;
                    
                    case "download_rpt_of_fee_cu_group":
                        {
                            download_rpt_of_fee_cu_group(req, res);
                        }
                        break;
                    case "download_rpt_of_fee_cu_group_order_list":
                        {
                            download_rpt_of_fee_cu_group_order_list(req, res);
                        }
                        break;
                    case "download_rpt_of_fee_cu_group_order_fee":
                        {
                            download_rpt_of_fee_cu_group_order_fee(req, res);
                        }
                        break;
                    
                    #endregion

                    #region 利润分析表(按委托类型划分)
                    case "get_rpt_of_order_typ_group":
                        {
                            get_rpt_of_order_typ_group(req, res);
                        }
                        break; 
                    case "download_rpt_of_order_typ_group":
                        {
                            download_rpt_of_order_typ_group(req, res);
                        }
                        break;
                    
                    #endregion

                    #region 船舶统计
                    case "get_rpt_of_ship_group":
                        {
                            get_rpt_of_ship_group(req, res);
                        }
                        break;
                    case "get_rpt_of_ship_group_of_order_list":
                        {
                            get_rpt_of_ship_group_of_order_list(req, res);
                        }
                        break;
                    case "get_rpt_of_ship_group_of_fee_list":
                        {
                            get_rpt_of_ship_group_of_fee_list(req, res);
                        }
                        break;
                    case "get_rpt_of_ship_group_of_cntr_list":
                        {
                            get_rpt_of_ship_group_of_cntr_list(req, res);
                        }
                        break;
                    case "download_rpt_of_ship_group":
                        {
                            download_rpt_of_ship_group(req, res);
                        }
                        break;
                    case "download_rpt_of_ship_group_order_list":
                        {
                            download_rpt_of_ship_group_order_list(req, res);
                        }
                        break;
                    case "download_rpt_of_ship_group_order_fee":
                        {
                            download_rpt_of_ship_group_order_fee(req, res);
                        }
                        break;
                    case "download_rpt_of_ship_group_order_cntr":
                        {
                            download_rpt_of_ship_group_order_cntr(req, res);
                        }
                        break;
                    #endregion

                    #region 未结算完整的
                    case "get_rpt_of_unwoa_group":
                        {
                            get_rpt_of_unwoa_group(req, res);
                        }
                        break;
                    case "download_rpt_of_unwoa_group":
                        {
                            download_rpt_of_unwoa_group(req, res);
                        }
                        break;
                    #endregion
                }
            }
            catch (Exception e)
            {
                mylog.writelog("lead_query." + ACTION,
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #region 费用汇总
        #region 查询
        public void get_order_fee_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();

                string record_id = req.Params["record_id"] == null ? string.Empty : req.Params["record_id"].ToString();
                string sales_id = req.Params["sales_id"] == null ? string.Empty : req.Params["sales_id"].ToString();
                string service_id = req.Params["service_id"] == null ? string.Empty : req.Params["service_id"].ToString();
                string operation_id = req.Params["operation_id"] == null ? string.Empty : req.Params["operation_id"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string fee_dat_begin_year = req.Params["fee_dat_begin_year"] == null ? string.Empty : req.Params["fee_dat_begin_year"].ToString();
                string fee_dat_begin_month = req.Params["fee_dat_begin_month"] == null ? string.Empty : req.Params["fee_dat_begin_month"].ToString();
                string fee_dat_end_year = req.Params["fee_dat_end_year"] == null ? string.Empty : req.Params["fee_dat_end_year"].ToString();
                string fee_dat_end_month = req.Params["fee_dat_end_month"] == null ? string.Empty : req.Params["fee_dat_end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();
 
                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_order_fee_group(rec_or_pay,
                     c_id,
                     record_id,
                     sales_id,
                     service_id,
                     operation_id,

                     fee_cu_id,
                     fee_dat_begin_year,
                     fee_dat_begin_month,
                     fee_dat_end_year,
                     fee_dat_end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion
        #region 下载 费用汇总
        private void download_order_fee_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();

                string record_id = req.Params["record_id"] == null ? string.Empty : req.Params["record_id"].ToString();
                string sales_id = req.Params["sales_id"] == null ? string.Empty : req.Params["sales_id"].ToString();
                string service_id = req.Params["service_id"] == null ? string.Empty : req.Params["service_id"].ToString();
                string operation_id = req.Params["operation_id"] == null ? string.Empty : req.Params["operation_id"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string fee_dat_begin_year = req.Params["fee_dat_begin_year"] == null ? string.Empty : req.Params["fee_dat_begin_year"].ToString();
                string fee_dat_begin_month = req.Params["fee_dat_begin_month"] == null ? string.Empty : req.Params["fee_dat_begin_month"].ToString();
                string fee_dat_end_year = req.Params["fee_dat_end_year"] == null ? string.Empty : req.Params["fee_dat_end_year"].ToString();
                string fee_dat_end_month = req.Params["fee_dat_end_month"] == null ? string.Empty : req.Params["fee_dat_end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_order_fee_group(rec_or_pay,
                     c_id,
                     record_id,
                     sales_id,
                     service_id,
                     operation_id,
                     fee_cu_id,
                     fee_dat_begin_year,
                     fee_dat_begin_month,
                     fee_dat_end_year,
                     fee_dat_end_month);

                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + (rec_or_pay.Equals("1") ? "业务收支汇总表" : "业务支出汇总表") + ".xls"; ;

                #endregion

                #region 打开Excel表格模板，并初始化到NPOI对象中
                IWorkbook wk = new HSSFWorkbook();
                string filePath = System.Web.HttpContext.Current.Server.MapPath("/Templates/业务费用汇总模版.xlsx");
                if (!File.Exists(filePath))
                {
                    return;
                }
                string extension = System.IO.Path.GetExtension(filePath);
                FileStream fs = File.OpenRead(filePath);
                if (extension.Equals(".xls"))
                {
                    //把xls文件中的数据写入wk中
                    wk = new HSSFWorkbook(fs);
                }
                else
                {
                    //把xlsx文件中的数据写入wk中
                    wk = new XSSFWorkbook(fs);
                }
                fs.Close();
                #endregion

                #region 替换标题和查询条件

                string title = schema_cto_ja[0]["c_desc"].ToString() + (rec_or_pay.Equals("1") ? "业务收支汇总表" : "业务支出汇总表");


                //读取Excel表格中的第一张Sheet表
                ISheet sheet = wk.GetSheetAt(0);
                IRow row = null;//数据行
                ICell cell = null;//数据行中的某列 



                for (int i = sheet.FirstRowNum; i <= sheet.LastRowNum; i++)
                {
                    row = sheet.GetRow(i);
                    for (int j = row.FirstCellNum; j < row.LastCellNum; j++)
                    {
                        cell = row.GetCell(j);
                        string cell_val = cell.StringCellValue;
                        if (cell_val.Contains("{$title}"))
                        {
                            cell.SetCellValue(cell_val.Replace("{$title}", title));
                        }
                    }
                }
                #endregion



                #region 从第六行开始插入
                IFont font_normal;
                font_normal = wk.CreateFont();
                //font.IsBold = true;//加粗
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)10;

                //（头部标题）合并的单元格样式
                ICellStyle ts_normal = wk.CreateCellStyle();
                //垂直居中
                ts_normal.Alignment = HorizontalAlignment.Center;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;

                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_normal.SetFont(font_normal);
                ts_normal.WrapText = true;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;

                ICellStyle ts_normal2 = wk.CreateCellStyle();
                //垂直居中
                ts_normal2.Alignment = HorizontalAlignment.Center;
                ts_normal2.VerticalAlignment = VerticalAlignment.Center;

                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_normal2.SetFont(font_normal);
                ts_normal2.WrapText = true;
                ts_normal2.BorderBottom = BorderStyle.Thin;
                ts_normal2.BorderLeft = BorderStyle.Thin;
                ts_normal2.BorderRight = BorderStyle.Thin;
                ts_normal2.BorderTop = BorderStyle.Thin;
                IDataFormat dataformat = wk.CreateDataFormat();
                ts_normal2.DataFormat = HSSFDataFormat.GetBuiltinFormat("###0.00");

                string[] data_str = { 
                    "fee_cu_desc",
                    "cr_name",
                    "fee_amount",
                    "woa_total_money",
                    "woa_total_money_of_noneinvoice",
                    "woa_total_money_of_invoice",
                    "unwoa_total_money",
                    "unwoa_total_money_of_noneinvoice",
                    "unwoa_total_money_of_invoice",
                    "fee_amount_of_uncommit",
                    "fee_amount_of_uncommit_of_noneinvoice",
                    "fee_amount_of_uncommit_of_invoice",
                    "fee_amount_of_commit",
                    "woa_amount_of_commit",
                    "woa_amount_of_commit_of_noneinvoice",
                    "woa_amount_of_commit_of_invoice",
                    "woa_amount_of_commit_of_invoice_of_unrecord",
                    "woa_amount_of_commit_of_invoice_of_record",
                    "unwoa_amount_of_commit",
                    "unwoa_amount_of_commit_of_noneinvoice",
                    "unwoa_amount_of_commit_of_invoice",
                    "unwoa_amount_of_commit_of_invoice_of_unrecord",
                    "unwoa_amount_of_commit_of_invoice_of_record",
                    "unwoa_amount_of_commit_of_limit",
                    "unwoa_amount_of_commit_of_unlimit" };
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                if (data_item["rows"] != null)
                {
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(5 + i);
                            for (int step = 0; step < data_str.Length; step++)
                            {
                                var str = ja_data[i][data_str[step]].ToString();
                                if (step > 1)
                                {
                                    if (str.Equals("0"))
                                    {
                                        row.CreateCell(step).SetCellValue("");
                                    }
                                    else
                                    {
                                        row.CreateCell(step).SetCellValue(Convert.ToDouble(str));
                                    }
                                }
                                else
                                {
                                    row.CreateCell(step).SetCellValue(str);
                                }

                            }
                            List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                if (c.ColumnIndex > 1)
                                {
                                    c.CellStyle = ts_normal2;
                                }
                                else
                                {
                                    c.CellStyle = ts_normal;
                                }
                            });

                        }

                    }

                }
                #endregion




                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion
        #endregion

        #region 根据员工统计
        #region 查询
        public void get_rpt_of_worker_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                string worker_user_typ = req.Params["worker_user_typ"] == null ? string.Empty : req.Params["worker_user_typ"].ToString();

                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_worker_group(c_id,
                    worker_user_typ,
                    u_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_worker_group_of_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string worker_user_typ = req.Params["worker_user_typ"] == null ? string.Empty : req.Params["worker_user_typ"].ToString();

                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
               

                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_worker_group_of_order_list(c_id,
                    worker_user_typ,
                    u_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_worker_group_of_fee_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string worker_user_typ = req.Params["worker_user_typ"] == null ? string.Empty : req.Params["worker_user_typ"].ToString();

                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();

                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_worker_group_of_fee_list(c_id,
                    worker_user_typ,
                    u_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_worker_group_of_cntr_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string worker_user_typ = req.Params["worker_user_typ"] == null ? string.Empty : req.Params["worker_user_typ"].ToString();

                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_worker_group_of_cntr_list(c_id,
                    worker_user_typ,
                    u_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 下载 费用汇总
        private void download_rpt_of_worker_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

                string worker_user_typ = req.Params["worker_user_typ"] == null ? string.Empty : req.Params["worker_user_typ"].ToString();

                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_worker_group(c_id,
                    worker_user_typ,
                    u_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                string mode_desc = string.Empty;

                if (worker_user_typ.Equals("1"))
                {
                    mode_desc = "操作";
                }
                if (worker_user_typ.Equals("2"))
                {
                    mode_desc = "销售";
                }
                if (worker_user_typ.Equals("3"))
                {
                    mode_desc = "客服";
                }

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }else{
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按" + mode_desc + "统计时间段" + par_of_dat + "内业务量";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按" + mode_desc + "统计时间段" + par_of_dat + "内业务量.xls";  

                #endregion

                #region 创建表格
                string sheetName = "sheet1";

                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;

                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(13, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(14, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(15, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(16, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(17, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(18, (int)((8 + 0.72) * 256));
                #endregion
                #region 格式
                IRow row = null;
                ICell cell = null;

                #region 字体样式
                HSSFFont font_normal;
                font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗 
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                HSSFFont font_bold;
                font_bold = wk.CreateFont() as HSSFFont;
                font_bold.IsBold = true;//加粗 
                font_bold.FontName = "宋体";
                font_bold.FontHeightInPoints = (short)9;

                HSSFFont font_title_top;
                font_title_top = wk.CreateFont() as HSSFFont;
                font_title_top.IsBold = true;//加粗 
                font_title_top.FontName = "宋体";
                font_title_top.FontHeightInPoints = (short)14;

                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗 
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)9;

                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                ts_normal.Alignment = HorizontalAlignment.Left;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                ts_normal.SetFont(font_normal);

                HSSFCellStyle ts_bold = wk.CreateCellStyle() as HSSFCellStyle;
                ts_bold.Alignment = HorizontalAlignment.Left;
                ts_bold.VerticalAlignment = VerticalAlignment.Center;
                ts_bold.BorderBottom = BorderStyle.Thin;
                ts_bold.BorderLeft = BorderStyle.Thin;
                ts_bold.BorderRight = BorderStyle.Thin;
                ts_bold.BorderTop = BorderStyle.Thin;
                ts_bold.SetFont(font_bold);

                HSSFCellStyle ts_title_top = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title_top.Alignment = HorizontalAlignment.Center;
                ts_title_top.VerticalAlignment = VerticalAlignment.Center;
                ts_title_top.BorderBottom = BorderStyle.Thin;
                ts_title_top.BorderLeft = BorderStyle.Thin;
                ts_title_top.BorderRight = BorderStyle.Thin;
                ts_title_top.BorderTop = BorderStyle.Thin;
                ts_title_top.SetFont(font_title_top);

                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;
                ts_title.SetFont(font_title);

                IDataFormat dateformat = wk.CreateDataFormat();

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");
                HSSFCellStyle ts_normal_int = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_int.Alignment = HorizontalAlignment.Center;
                ts_normal_int.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_int.SetFont(font_normal);
                ts_normal_int.WrapText = false;
                ts_normal_int.BorderBottom = BorderStyle.Thin;
                ts_normal_int.BorderLeft = BorderStyle.Thin;
                ts_normal_int.BorderRight = BorderStyle.Thin;
                ts_normal_int.BorderTop = BorderStyle.Thin;
                ts_normal_int.DataFormat = dateformat.GetFormat("#,##0");
                #endregion

                #region 第一行写公司名称
                int ind_row = 0;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue(title);
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 18));

                //赋值样式 
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });
                ind_row++;

                #endregion
                #region 第二行 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("序号");
                row.GetCell(1).SetCellValue( mode_desc);
                row.GetCell(2).SetCellValue("订单数");
                row.GetCell(3).SetCellValue("总重");
                row.GetCell(4).SetCellValue("总件数");
                row.GetCell(5).SetCellValue("总体积");
                row.GetCell(6).SetCellValue("自然箱");
                row.GetCell(7).SetCellValue("标准箱");
                row.GetCell(8).SetCellValue("20'");
                row.GetCell(9).SetCellValue("40'");
                row.GetCell(10).SetCellValue("45'");
                row.GetCell(11).SetCellValue("应收");
                row.GetCell(12).SetCellValue("已收");
                row.GetCell(13).SetCellValue("未收");
                row.GetCell(14).SetCellValue("应付");
                row.GetCell(15).SetCellValue("已付");
                row.GetCell(16).SetCellValue("未付");
                row.GetCell(17).SetCellValue("盈利");
                row.GetCell(18).SetCellValue("毛利率"); 

                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                ind_row++;

                #endregion

                #region 数据行
                if (data_item["rows"] != null)
                {
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue(ja_data[i]["u_real_name"].ToString());
                            row.CreateCell(2).SetCellValue(int.Parse((ja_data[i]["order_count"]??"").ToString()));
                            row.CreateCell(3).SetCellValue(double.Parse((ja_data[i]["sum_of_cargo_weight"] ?? "").ToString()));
                            row.CreateCell(4).SetCellValue(ja_data[i]["sum_of_cargo_packing_number"].ToString()); 
                            row.CreateCell(5).SetCellValue(double.Parse((ja_data[i]["sum_of_cargo_bluk"] ?? "").ToString()));

                            row.CreateCell(6).SetCellValue(int.Parse((ja_data[i]["sum_of_cntr_u"] ?? "").ToString()));
                            row.CreateCell(7).SetCellValue(double.Parse((ja_data[i]["sum_of_cntr_t"] ?? "").ToString()));

                            row.CreateCell(8).SetCellValue(int.Parse((ja_data[i]["sum_of_20"] ?? "").ToString()));
                            row.CreateCell(9).SetCellValue(int.Parse((ja_data[i]["sum_of_40"] ?? "").ToString()));
                            row.CreateCell(10).SetCellValue(int.Parse((ja_data[i]["sum_of_45"] ?? "").ToString()));

                            row.CreateCell(11).SetCellValue((ja_data[i]["sum_of_rec_amount"].ToString()));
                            row.CreateCell(12).SetCellValue((ja_data[i]["sum_of_reced_amount"] ?? "").ToString());
                            row.CreateCell(13).SetCellValue((ja_data[i]["sum_of_unreced_amount"] ?? "").ToString());
                            row.CreateCell(14).SetCellValue((ja_data[i]["sum_of_pay_amount"] ?? "").ToString());
                            row.CreateCell(15).SetCellValue((ja_data[i]["sum_of_payed_amount"] ?? "").ToString());
                            row.CreateCell(16).SetCellValue((ja_data[i]["sum_of_unpayed_amount"] ?? "").ToString());
                            row.CreateCell(17).SetCellValue((ja_data[i]["sum_of_profit_amount"] ?? "").ToString());
                            row.CreateCell(18).SetCellValue((ja_data[i]["sum_of_percent_profit"] ?? "").ToString());
                         
                          
                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });

                            row.GetCell(2).CellStyle = ts_normal_int;
                            row.GetCell(6).CellStyle = ts_normal_int; 
                            row.GetCell(8).CellStyle = ts_normal_int;
                            row.GetCell(9).CellStyle = ts_normal_int;
                            row.GetCell(10).CellStyle = ts_normal_int;
                            row.GetCell(3).CellStyle = ts_normal_double; 
                            row.GetCell(5).CellStyle = ts_normal_double; 
                            row.GetCell(7).CellStyle = ts_normal_double; 
                         
                             
                            ind_row++;
                        }
                    }
                }
                #endregion

                #region 汇总统计
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("汇总统计:"); 
                row.GetCell(2).SetCellValue("总行数:" + data_item["total"].ToString() + "行"); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++; 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                } 
                row.GetCell(2).SetCellValue("总毛重:" +  data_item["out_sum_of_cargo_weight"].ToString() + "KG"); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0,1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2,18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++; 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                } 
                row.GetCell(2).SetCellValue("总体积:" +  data_item["out_sum_of_cargo_bluk"].ToString() + "CBM"); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0,1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2,18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++; 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                } 
                row.GetCell(2).SetCellValue("总件数:" +  data_item["out_sum_of_cargo_packing_number"].ToString()  ); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0,1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2,18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++; 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                } 
                row.GetCell(2).SetCellValue("自然箱数:" +  data_item["out_sum_of_cntr_u"].ToString() + "U"); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0,1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2,18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++; 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                } 
                row.GetCell(2).SetCellValue("标准箱数:" +  data_item["out_sum_of_cntr_t"].ToString() + "T"); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0,1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2,18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                } 
                row.GetCell(2).SetCellValue("箱明细: 20'有" +  data_item["out_sum_of_20"].ToString() + "个,40'有" +  data_item["out_sum_of_40"].ToString() + "个,45'有" +  data_item["out_sum_of_45"].ToString() + "个"); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0,1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2,18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                } 
                row.GetCell(2).SetCellValue("收款汇总: 应收-" +  data_item["out_sum_of_rec_amount"].ToString() + ",已收-" +  data_item["out_sum_of_reced_amount"].ToString() + ",未收-" +  data_item["out_sum_of_unreced_amount"].ToString() ); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0,1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2,18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                } 
                row.GetCell(2).SetCellValue("付款汇总: 应付-" +  data_item["out_sum_of_pay_amount"].ToString() + ",已付-" +  data_item["out_sum_of_payed_amount"].ToString() + ",未付-" +  data_item["out_sum_of_unpayed_amount"].ToString() ); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0,1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2,18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                } 
                row.GetCell(2).SetCellValue("总毛利: " +  data_item["out_sum_of_percent_profit"].ToString()  ); 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0,1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2,18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                #endregion 
                #endregion
                  


                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 订单信息下载
        private void download_rpt_of_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

                string worker_user_typ = req.Params["worker_user_typ"] == null ? string.Empty : req.Params["worker_user_typ"].ToString();
                string u_name = req.Params["u_name"] == null ? string.Empty : req.Params["u_name"].ToString();
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
            
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_worker_group_of_order_list(c_id,
                    worker_user_typ,
                    u_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                string mode_desc = string.Empty;

                if (worker_user_typ.Equals("1"))
                {
                    mode_desc = "操作";
                }
                if (worker_user_typ.Equals("2"))
                {
                    mode_desc = "销售";
                }
                if (worker_user_typ.Equals("3"))
                {
                    mode_desc = "客服";
                }

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按" + mode_desc + "统计" + u_name + "时间段" + par_of_dat + "内业务关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按" + mode_desc + "统计" + u_name + "时间段" + par_of_dat + "内业务关联列表.xls";

                #endregion
                download_rpt_of_order_list(res, title, file_nam, data_item);
                

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 订单费用下载
        private void download_rpt_of_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

                string worker_user_typ = req.Params["worker_user_typ"] == null ? string.Empty : req.Params["worker_user_typ"].ToString();

                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string u_name = req.Params["u_name"] == null ? string.Empty : req.Params["u_name"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_worker_group_of_fee_list(c_id,
                    worker_user_typ,
                    u_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                string mode_desc = string.Empty;

                if (worker_user_typ.Equals("1"))
                {
                    mode_desc = "操作";
                }
                if (worker_user_typ.Equals("2"))
                {
                    mode_desc = "销售";
                }
                if (worker_user_typ.Equals("3"))
                {
                    mode_desc = "客服";
                }

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按" + mode_desc + "统计" + u_name + "时间段" + par_of_dat + "内" + (rec_or_pay.Equals("1")?"应收":"应付") + "费用关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按" + mode_desc + "统计" + u_name + "时间段" + par_of_dat + "内" + (rec_or_pay.Equals("1") ? "应收" : "应付") + "费用关联列表.xls";

                #endregion
                download_rpt_of_order_fee(res, title, file_nam, data_item,rec_or_pay);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 订单集装箱下载
        private void download_rpt_of_order_cntr(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

                string worker_user_typ = req.Params["worker_user_typ"] == null ? string.Empty : req.Params["worker_user_typ"].ToString();

                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
               
                string u_name = req.Params["u_name"] == null ? string.Empty : req.Params["u_name"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_worker_group_of_cntr_list(c_id,
                    worker_user_typ,
                    u_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                string mode_desc = string.Empty;

                if (worker_user_typ.Equals("1"))
                {
                    mode_desc = "操作";
                }
                if (worker_user_typ.Equals("2"))
                {
                    mode_desc = "销售";
                }
                if (worker_user_typ.Equals("3"))
                {
                    mode_desc = "客服";
                }

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (beg_month.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat = (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat = beg_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat = beg_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按" + mode_desc + "统计" + u_name + "时间段" + par_of_dat + "内集装箱关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按" + mode_desc + "统计" + u_name + "时间段" + par_of_dat + "内集装箱关联列表.xls";

                #endregion
                download_rpt_of_order_cntr(res, title, file_nam, data_item);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 根据委托单位统计
        #region 查询
        public void get_rpt_of_delegate_group(HttpRequest req, HttpResponse res)
        {
            try
            {
               
                string delete_id = req.Params["delete_id"] == null ? string.Empty : req.Params["delete_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_delegate_group(c_id, 
                    delete_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_delegate_group_of_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
               
                string delete_id = req.Params["delete_id"] == null ? string.Empty : req.Params["delete_id"].ToString();


                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_delegate_group_of_order_list(c_id, 
                    delete_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_delegate_group_of_fee_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                
                string delete_id = req.Params["delete_id"] == null ? string.Empty : req.Params["delete_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();

                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_delegate_group_of_fee_list(c_id, 
                    delete_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_delegate_group_of_cntr_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                 
                string delete_id = req.Params["delete_id"] == null ? string.Empty : req.Params["delete_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_delegate_group_of_cntr_list(c_id, 
                    delete_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 下载 费用汇总
        private void download_rpt_of_delegate_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理
 
                string delete_id = req.Params["delete_id"] == null ? string.Empty : req.Params["delete_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_delegate_group(c_id, 
                    delete_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                
                 

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按委托客户统计时间段" + par_of_dat + "内业务量";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按委托客户统计时间段" + par_of_dat + "内业务量.xls";

                #endregion

                #region 创建表格
                string sheetName = "sheet1";

                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;

                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(13, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(14, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(15, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(16, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(17, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(18, (int)((8 + 0.72) * 256));
                #endregion
                #region 格式
                IRow row = null;
                ICell cell = null;

                #region 字体样式
                HSSFFont font_normal;
                font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗 
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                HSSFFont font_bold;
                font_bold = wk.CreateFont() as HSSFFont;
                font_bold.IsBold = true;//加粗 
                font_bold.FontName = "宋体";
                font_bold.FontHeightInPoints = (short)9;

                HSSFFont font_title_top;
                font_title_top = wk.CreateFont() as HSSFFont;
                font_title_top.IsBold = true;//加粗 
                font_title_top.FontName = "宋体";
                font_title_top.FontHeightInPoints = (short)14;

                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗 
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)9;

                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                ts_normal.Alignment = HorizontalAlignment.Left;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                ts_normal.SetFont(font_normal);

                HSSFCellStyle ts_bold = wk.CreateCellStyle() as HSSFCellStyle;
                ts_bold.Alignment = HorizontalAlignment.Left;
                ts_bold.VerticalAlignment = VerticalAlignment.Center;
                ts_bold.BorderBottom = BorderStyle.Thin;
                ts_bold.BorderLeft = BorderStyle.Thin;
                ts_bold.BorderRight = BorderStyle.Thin;
                ts_bold.BorderTop = BorderStyle.Thin;
                ts_bold.SetFont(font_bold);

                HSSFCellStyle ts_title_top = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title_top.Alignment = HorizontalAlignment.Center;
                ts_title_top.VerticalAlignment = VerticalAlignment.Center;
                ts_title_top.BorderBottom = BorderStyle.Thin;
                ts_title_top.BorderLeft = BorderStyle.Thin;
                ts_title_top.BorderRight = BorderStyle.Thin;
                ts_title_top.BorderTop = BorderStyle.Thin;
                ts_title_top.SetFont(font_title_top);

                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;
                ts_title.SetFont(font_title);

                IDataFormat dateformat = wk.CreateDataFormat();

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");
                HSSFCellStyle ts_normal_int = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_int.Alignment = HorizontalAlignment.Center;
                ts_normal_int.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_int.SetFont(font_normal);
                ts_normal_int.WrapText = false;
                ts_normal_int.BorderBottom = BorderStyle.Thin;
                ts_normal_int.BorderLeft = BorderStyle.Thin;
                ts_normal_int.BorderRight = BorderStyle.Thin;
                ts_normal_int.BorderTop = BorderStyle.Thin;
                ts_normal_int.DataFormat = dateformat.GetFormat("#,##0");
                #endregion

                #region 第一行写公司名称
                int ind_row = 0;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue(title);
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 18));

                //赋值样式 
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });
                ind_row++;

                #endregion
                #region 第二行
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("序号");
                row.GetCell(1).SetCellValue("委托单位");
                row.GetCell(2).SetCellValue("订单数");
                row.GetCell(3).SetCellValue("总重");
                row.GetCell(4).SetCellValue("总件数");
                row.GetCell(5).SetCellValue("总体积");
                row.GetCell(6).SetCellValue("自然箱");
                row.GetCell(7).SetCellValue("标准箱");
                row.GetCell(8).SetCellValue("20'");
                row.GetCell(9).SetCellValue("40'");
                row.GetCell(10).SetCellValue("45'");
                row.GetCell(11).SetCellValue("应收");
                row.GetCell(12).SetCellValue("已收");
                row.GetCell(13).SetCellValue("未收");
                row.GetCell(14).SetCellValue("应付");
                row.GetCell(15).SetCellValue("已付");
                row.GetCell(16).SetCellValue("未付");
                row.GetCell(17).SetCellValue("盈利");
                row.GetCell(18).SetCellValue("毛利率");

                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                ind_row++;

                #endregion

                #region 数据行
                if (data_item["rows"] != null)
                {
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue(ja_data[i]["cu_name"].ToString());
                            row.CreateCell(2).SetCellValue(int.Parse((ja_data[i]["order_count"] ?? "").ToString()));
                            row.CreateCell(3).SetCellValue(double.Parse((ja_data[i]["sum_of_cargo_weight"] ?? "").ToString()));
                            row.CreateCell(4).SetCellValue(ja_data[i]["sum_of_cargo_packing_number"].ToString());
                            row.CreateCell(5).SetCellValue(double.Parse((ja_data[i]["sum_of_cargo_bluk"] ?? "").ToString()));

                            row.CreateCell(6).SetCellValue(int.Parse((ja_data[i]["sum_of_cntr_u"] ?? "").ToString()));
                            row.CreateCell(7).SetCellValue(double.Parse((ja_data[i]["sum_of_cntr_t"] ?? "").ToString()));

                            row.CreateCell(8).SetCellValue(int.Parse((ja_data[i]["sum_of_20"] ?? "").ToString()));
                            row.CreateCell(9).SetCellValue(int.Parse((ja_data[i]["sum_of_40"] ?? "").ToString()));
                            row.CreateCell(10).SetCellValue(int.Parse((ja_data[i]["sum_of_45"] ?? "").ToString()));

                            row.CreateCell(11).SetCellValue((ja_data[i]["sum_of_rec_amount"].ToString()));
                            row.CreateCell(12).SetCellValue((ja_data[i]["sum_of_reced_amount"] ?? "").ToString());
                            row.CreateCell(13).SetCellValue((ja_data[i]["sum_of_unreced_amount"] ?? "").ToString());
                            row.CreateCell(14).SetCellValue((ja_data[i]["sum_of_pay_amount"] ?? "").ToString());
                            row.CreateCell(15).SetCellValue((ja_data[i]["sum_of_payed_amount"] ?? "").ToString());
                            row.CreateCell(16).SetCellValue((ja_data[i]["sum_of_unpayed_amount"] ?? "").ToString());
                            row.CreateCell(17).SetCellValue((ja_data[i]["sum_of_profit_amount"] ?? "").ToString());
                            row.CreateCell(18).SetCellValue((ja_data[i]["sum_of_percent_profit"] ?? "").ToString());


                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });

                            row.GetCell(2).CellStyle = ts_normal_int;
                            row.GetCell(6).CellStyle = ts_normal_int;
                            row.GetCell(8).CellStyle = ts_normal_int;
                            row.GetCell(9).CellStyle = ts_normal_int;
                            row.GetCell(10).CellStyle = ts_normal_int;
                            row.GetCell(3).CellStyle = ts_normal_double;
                            row.GetCell(5).CellStyle = ts_normal_double;
                            row.GetCell(7).CellStyle = ts_normal_double;


                            ind_row++;
                        }
                    }
                }
                #endregion

                #region 汇总统计
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("汇总统计:");
                row.GetCell(2).SetCellValue("总行数:" + data_item["total"].ToString() + "行");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("总毛重:" + data_item["out_sum_of_cargo_weight"].ToString() + "KG");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("总体积:" + data_item["out_sum_of_cargo_bluk"].ToString() + "CBM");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("总件数:" + data_item["out_sum_of_cargo_packing_number"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("自然箱数:" + data_item["out_sum_of_cntr_u"].ToString() + "U");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("标准箱数:" + data_item["out_sum_of_cntr_t"].ToString() + "T");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("箱明细: 20'有" + data_item["out_sum_of_20"].ToString() + "个,40'有" + data_item["out_sum_of_40"].ToString() + "个,45'有" + data_item["out_sum_of_45"].ToString() + "个");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("收款汇总: 应收-" + data_item["out_sum_of_rec_amount"].ToString() + ",已收-" + data_item["out_sum_of_reced_amount"].ToString() + ",未收-" + data_item["out_sum_of_unreced_amount"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("付款汇总: 应付-" + data_item["out_sum_of_pay_amount"].ToString() + ",已付-" + data_item["out_sum_of_payed_amount"].ToString() + ",未付-" + data_item["out_sum_of_unpayed_amount"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 19; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("总毛利: " + data_item["out_sum_of_percent_profit"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 18));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                #endregion
                #endregion



                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 订单信息下载
        private void download_rpt_of_delegate_group_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

              string delete_name = req.Params["delete_name"] == null ? string.Empty : req.Params["delete_name"].ToString();
                string delete_id = req.Params["delete_id"] == null ? string.Empty : req.Params["delete_id"].ToString();

                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_delegate_group_of_order_list(c_id, 
                    delete_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                 
                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按委托客户统计" + delete_name + "时间段" + par_of_dat + "内业务关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按委托客户统计" + delete_name + "时间段" + par_of_dat + "内业务关联列表.xls";

                #endregion
                download_rpt_of_order_list(res, title, file_nam, data_item);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 订单费用下载
        private void download_rpt_of_delegate_group_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

               
                string delete_id = req.Params["delete_id"] == null ? string.Empty : req.Params["delete_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string delete_name = req.Params["delete_name"] == null ? string.Empty : req.Params["delete_name"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_delegate_group_of_fee_list(c_id, 
                    delete_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                 

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按委托客户统计" + delete_name + "时间段" + par_of_dat + "内" + (rec_or_pay.Equals("1") ? "应收" : "应付") + "费用关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按委托客户统计" + delete_name + "时间段" + par_of_dat + "内" + (rec_or_pay.Equals("1") ? "应收" : "应付") + "费用关联列表.xls";

                #endregion
                download_rpt_of_order_fee(res, title, file_nam, data_item, rec_or_pay);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 订单集装箱下载
        private void download_rpt_of_delegate_group_order_cntr(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

               
                string delete_id = req.Params["delete_id"] == null ? string.Empty : req.Params["delete_id"].ToString();

                string delete_name = req.Params["delete_name"] == null ? string.Empty : req.Params["delete_name"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_delegate_group_of_cntr_list(c_id, 
                    delete_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                 

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按委托客户统计" + delete_name + "时间段" + par_of_dat + "内集装箱关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按委托客户统计" + delete_name + "时间段" + par_of_dat + "内集装箱关联列表.xls";

                #endregion
                download_rpt_of_order_cntr(res, title, file_nam, data_item);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 根据结算单位统计
        #region 查询
        public void get_rpt_of_fee_cu_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_fee_cu_group(c_id,
                    fee_cu_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_fee_cu_group_of_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {

                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();

                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_fee_cu_group_of_order_list(c_id,
                    fee_cu_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_fee_cu_group_of_fee_list(HttpRequest req, HttpResponse res)
        {
            try
            {

                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();

                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_fee_cu_group_of_fee_list(c_id,
                    fee_cu_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

       
        #endregion
        #region 下载 费用汇总
        private void download_rpt_of_fee_cu_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_fee_cu_group(c_id,
                    fee_cu_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];



                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat = (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat = end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat = end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按结算对象统计时间段" + par_of_dat + "内业务量";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按结算对象统计时间段" + par_of_dat + "内业务量.xls";

                #endregion

                #region 创建表格
                string sheetName = "sheet1";

                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;

                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(13, (int)((18 + 0.72) * 256)); 
                #endregion
                #region 格式
                IRow row = null;
                ICell cell = null;

                #region 字体样式
                HSSFFont font_normal;
                font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗 
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                HSSFFont font_bold;
                font_bold = wk.CreateFont() as HSSFFont;
                font_bold.IsBold = true;//加粗 
                font_bold.FontName = "宋体";
                font_bold.FontHeightInPoints = (short)9;

                HSSFFont font_title_top;
                font_title_top = wk.CreateFont() as HSSFFont;
                font_title_top.IsBold = true;//加粗 
                font_title_top.FontName = "宋体";
                font_title_top.FontHeightInPoints = (short)14;

                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗 
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)9;

                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                ts_normal.Alignment = HorizontalAlignment.Left;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                ts_normal.SetFont(font_normal);

                HSSFCellStyle ts_bold = wk.CreateCellStyle() as HSSFCellStyle;
                ts_bold.Alignment = HorizontalAlignment.Left;
                ts_bold.VerticalAlignment = VerticalAlignment.Center;
                ts_bold.BorderBottom = BorderStyle.Thin;
                ts_bold.BorderLeft = BorderStyle.Thin;
                ts_bold.BorderRight = BorderStyle.Thin;
                ts_bold.BorderTop = BorderStyle.Thin;
                ts_bold.SetFont(font_bold);

                HSSFCellStyle ts_title_top = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title_top.Alignment = HorizontalAlignment.Center;
                ts_title_top.VerticalAlignment = VerticalAlignment.Center;
                ts_title_top.BorderBottom = BorderStyle.Thin;
                ts_title_top.BorderLeft = BorderStyle.Thin;
                ts_title_top.BorderRight = BorderStyle.Thin;
                ts_title_top.BorderTop = BorderStyle.Thin;
                ts_title_top.SetFont(font_title_top);

                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;
                ts_title.SetFont(font_title);

                IDataFormat dateformat = wk.CreateDataFormat();

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");
                HSSFCellStyle ts_normal_int = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_int.Alignment = HorizontalAlignment.Center;
                ts_normal_int.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_int.SetFont(font_normal);
                ts_normal_int.WrapText = false;
                ts_normal_int.BorderBottom = BorderStyle.Thin;
                ts_normal_int.BorderLeft = BorderStyle.Thin;
                ts_normal_int.BorderRight = BorderStyle.Thin;
                ts_normal_int.BorderTop = BorderStyle.Thin;
                ts_normal_int.DataFormat = dateformat.GetFormat("#,##0");
                #endregion

                #region 第一行写公司名称
                int ind_row = 0;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue(title);
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 13));

                //赋值样式 
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });
                ind_row++;

                #endregion
                #region 第二行 
                
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("序号");

                row.GetCell(1).SetCellValue("结算单位");
                row.GetCell(2).SetCellValue("订单数");
                row.GetCell(3).SetCellValue("货重");
                row.GetCell(4).SetCellValue("件数");
                row.GetCell(5).SetCellValue("体积");
                row.GetCell(6).SetCellValue("自然箱");
                row.GetCell(7).SetCellValue("标准箱");
                row.GetCell(8).SetCellValue("20'");
                row.GetCell(9).SetCellValue("40'");
                row.GetCell(10).SetCellValue("45'");

                if (rec_or_pay.Equals("1"))
                {
                    row.GetCell(11).SetCellValue("应收");
                    row.GetCell(12).SetCellValue("已收");
                    row.GetCell(13).SetCellValue("未收");
                }
                else
                {
                    row.GetCell(11).SetCellValue("应付");
                    row.GetCell(12).SetCellValue("已付");
                    row.GetCell(13).SetCellValue("未付");
                }
                //row.GetCell(14).SetCellValue("总重");
                //row.GetCell(15).SetCellValue("总件数");
                //row.GetCell(16).SetCellValue("总体积");
                //row.GetCell(17).SetCellValue("自然箱");
                //row.GetCell(18).SetCellValue("标准箱");
                //row.GetCell(19).SetCellValue("20'");
                //row.GetCell(20).SetCellValue("40'");
                //row.GetCell(21).SetCellValue("45'");
                //row.GetCell(22).SetCellValue("应收");
                //row.GetCell(23).SetCellValue("已收");
                //row.GetCell(24).SetCellValue("未收");
                //row.GetCell(25).SetCellValue("应付");
                //row.GetCell(26).SetCellValue("已付");
                //row.GetCell(27).SetCellValue("未付");
                //row.GetCell(28).SetCellValue("盈利");
                //row.GetCell(29).SetCellValue("毛利率");



                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                ind_row++;

                #endregion

                #region 数据行
                if (data_item["rows"] != null)
                {
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue(ja_data[i]["cu_name"].ToString());
                            row.CreateCell(2).SetCellValue(int.Parse((ja_data[i]["order_count"] ?? "").ToString()));

                            row.CreateCell(3).SetCellValue(double.Parse((ja_data[i]["sum_of_cargo_weight"] ?? "").ToString()));
                            row.CreateCell(4).SetCellValue(ja_data[i]["sum_of_cargo_packing_number"].ToString());
                            row.CreateCell(5).SetCellValue(double.Parse((ja_data[i]["sum_of_cargo_bluk"] ?? "").ToString())); 
                            row.CreateCell(6).SetCellValue(int.Parse((ja_data[i]["sum_of_cntr_u"] ?? "").ToString()));
                            row.CreateCell(7).SetCellValue(double.Parse((ja_data[i]["sum_of_cntr_t"] ?? "").ToString())); 
                            row.CreateCell(8).SetCellValue(int.Parse((ja_data[i]["sum_of_20"] ?? "").ToString()));
                            row.CreateCell(9).SetCellValue(int.Parse((ja_data[i]["sum_of_40"] ?? "").ToString()));
                            row.CreateCell(10).SetCellValue(int.Parse((ja_data[i]["sum_of_45"] ?? "").ToString()));
                            if (rec_or_pay.Equals("1"))
                            {
                                row.CreateCell(11).SetCellValue((ja_data[i]["sum_of_rec_amount"].ToString()));
                                row.CreateCell(12).SetCellValue((ja_data[i]["sum_of_reced_amount"] ?? "").ToString());
                                row.CreateCell(13).SetCellValue((ja_data[i]["sum_of_unreced_amount"] ?? "").ToString());
                            }
                            else
                            {
                                row.CreateCell(11).SetCellValue((ja_data[i]["sum_of_pay_amount"].ToString()));
                                row.CreateCell(12).SetCellValue((ja_data[i]["sum_of_payed_amount"] ?? "").ToString());
                                row.CreateCell(13).SetCellValue((ja_data[i]["sum_of_unpayed_amount"] ?? "").ToString());
                            }
                            //row.CreateCell(14).SetCellValue(double.Parse((ja_data[i]["sum_of_od_cargo_weight"] ?? "").ToString()));
                            //row.CreateCell(15).SetCellValue(ja_data[i]["sum_of_od_cargo_packing_number"].ToString());
                            //row.CreateCell(16).SetCellValue(double.Parse((ja_data[i]["sum_of_od_cargo_bluk"] ?? "").ToString()));
                            //row.CreateCell(17).SetCellValue(int.Parse((ja_data[i]["sum_of_od_cntr_u"] ?? "").ToString()));
                            //row.CreateCell(18).SetCellValue(double.Parse((ja_data[i]["sum_of_od_cntr_t"] ?? "").ToString()));
                            //row.CreateCell(19).SetCellValue(int.Parse((ja_data[i]["sum_of_od_20"] ?? "").ToString()));
                            //row.CreateCell(20).SetCellValue(int.Parse((ja_data[i]["sum_of_od_40"] ?? "").ToString()));
                            //row.CreateCell(21).SetCellValue(int.Parse((ja_data[i]["sum_of_od_45"] ?? "").ToString()));
                            //row.CreateCell(22).SetCellValue((ja_data[i]["sum_of_od_rec_amount"].ToString()));
                            //row.CreateCell(23).SetCellValue((ja_data[i]["sum_of_od_reced_amount"] ?? "").ToString());
                            //row.CreateCell(24).SetCellValue((ja_data[i]["sum_of_od_unreced_amount"] ?? "").ToString());
                            //row.CreateCell(25).SetCellValue((ja_data[i]["sum_of_od_pay_amount"].ToString()));
                            //row.CreateCell(26).SetCellValue((ja_data[i]["sum_of_od_payed_amount"] ?? "").ToString());
                            //row.CreateCell(27).SetCellValue((ja_data[i]["sum_of_od_unpayed_amount"] ?? "").ToString()); 
                            //row.CreateCell(28).SetCellValue((ja_data[i]["sum_of_profit_amount"] ?? "").ToString());
                            //row.CreateCell(29).SetCellValue((ja_data[i]["sum_of_percent_profit"] ?? "").ToString());


                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });

                            row.GetCell(2).CellStyle = ts_normal_int;
                            row.GetCell(6).CellStyle = ts_normal_int;
                            row.GetCell(8).CellStyle = ts_normal_int;
                            row.GetCell(9).CellStyle = ts_normal_int;
                            row.GetCell(10).CellStyle = ts_normal_int;
                            row.GetCell(3).CellStyle = ts_normal_double;
                            row.GetCell(5).CellStyle = ts_normal_double;
                            row.GetCell(7).CellStyle = ts_normal_double;

                           
                            //row.GetCell(17).CellStyle = ts_normal_int;
                            //row.GetCell(19).CellStyle = ts_normal_int;
                            //row.GetCell(20).CellStyle = ts_normal_int;
                            //row.GetCell(21).CellStyle = ts_normal_int;
                            //row.GetCell(14).CellStyle = ts_normal_double;
                            //row.GetCell(16).CellStyle = ts_normal_double;
                            //row.GetCell(18).CellStyle = ts_normal_double;

                            ind_row++;
                        }
                    }
                }
                #endregion

                #region 汇总统计
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("汇总统计:");
                row.GetCell(2).SetCellValue("总行数:" + data_item["total"].ToString() + "行");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                if (rec_or_pay.Equals("1"))
                {
                    ind_row++;

                    row = sheet.CreateRow(ind_row);
                    for (int i = 0; i < 19; i++)
                    {
                        row.CreateCell(i).SetCellValue("");
                    }
                    row.GetCell(2).SetCellValue("收款汇总: 应收-" + data_item["out_sum_of_rec_amount"].ToString() + ",已收-" + data_item["out_sum_of_reced_amount"].ToString() + ",未收-" + data_item["out_sum_of_unreced_amount"].ToString());
                    sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                    sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                    cells = row.Cells;
                    cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                    {
                        c.CellStyle = ts_bold;
                    });
                }
                else
                {
                    ind_row++;
                    row = sheet.CreateRow(ind_row);
                    for (int i = 0; i < 19; i++)
                    {
                        row.CreateCell(i).SetCellValue("");
                    }
                    row.GetCell(2).SetCellValue("付款汇总: 应付-" + data_item["out_sum_of_pay_amount"].ToString() + ",已付-" + data_item["out_sum_of_payed_amount"].ToString() + ",未付-" + data_item["out_sum_of_unpayed_amount"].ToString());
                    sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                    sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                    cells = row.Cells;
                    cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                    {
                        c.CellStyle = ts_bold;
                    });
                }
                 
                #endregion
                #endregion



                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 订单信息下载
        private void download_rpt_of_fee_cu_group_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

                string fee_cu_name = req.Params["fee_cu_name"] == null ? string.Empty : req.Params["fee_cu_name"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_fee_cu_group_of_order_list(c_id,
                    fee_cu_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按结算对象统计" + fee_cu_name + "时间段" + par_of_dat + "内业务关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按结算对象统计" + fee_cu_name + "时间段" + par_of_dat + "内业务关联列表.xls";

                #endregion
                download_rpt_of_order_list(res, title, file_nam, data_item);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 订单费用下载
        private void download_rpt_of_fee_cu_group_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理


                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                string fee_cu_name = req.Params["fee_cu_name"] == null ? string.Empty : req.Params["fee_cu_name"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_fee_cu_group_of_fee_list(c_id,
                    fee_cu_id,
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];


                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按结算对象统计" + fee_cu_name + "时间段" + par_of_dat + "内" + (rec_or_pay.Equals("1") ? "应收" : "应付") + "费用关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按结算对象统计" + fee_cu_name + "时间段" + par_of_dat + "内" + (rec_or_pay.Equals("1") ? "应收" : "应付") + "费用关联列表.xls";

                #endregion
                download_rpt_of_order_fee(res, title, file_nam, data_item, rec_or_pay);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

         
        #endregion

        #region 利润表，根据委托类型
        #region 查询
        public void get_rpt_of_order_typ_group(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_order_typ_group(c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
 
        #endregion
        #region 下载 费用汇总
        private void download_rpt_of_order_typ_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_order_typ_group(c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];



                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按业务类型统计时间段" + par_of_dat + "利润分析";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按业务类型统计时间段" + par_of_dat + "利润分析.xls";

                #endregion

                #region 创建表格
                string sheetName = "sheet1";

                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;

                sheet.SetColumnWidth(0, (int)((4 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((9 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(13, (int)((8 + 0.72) * 256));
              
                #endregion
                #region 格式
                IRow row = null;
                ICell cell = null;

                #region 字体样式
                HSSFFont font_normal;
                font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗 
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                HSSFFont font_bold;
                font_bold = wk.CreateFont() as HSSFFont;
                font_bold.IsBold = true;//加粗 
                font_bold.FontName = "宋体";
                font_bold.FontHeightInPoints = (short)9;

                HSSFFont font_title_top;
                font_title_top = wk.CreateFont() as HSSFFont;
                font_title_top.IsBold = true;//加粗 
                font_title_top.FontName = "宋体";
                font_title_top.FontHeightInPoints = (short)14;

                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗 
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)9;

                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                ts_normal.Alignment = HorizontalAlignment.Left;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                ts_normal.SetFont(font_normal);

                HSSFCellStyle ts_bold = wk.CreateCellStyle() as HSSFCellStyle;
                ts_bold.Alignment = HorizontalAlignment.Left;
                ts_bold.VerticalAlignment = VerticalAlignment.Center;
                ts_bold.BorderBottom = BorderStyle.Thin;
                ts_bold.BorderLeft = BorderStyle.Thin;
                ts_bold.BorderRight = BorderStyle.Thin;
                ts_bold.BorderTop = BorderStyle.Thin;
                ts_bold.SetFont(font_bold);

                HSSFCellStyle ts_title_top = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title_top.Alignment = HorizontalAlignment.Center;
                ts_title_top.VerticalAlignment = VerticalAlignment.Center;
                ts_title_top.BorderBottom = BorderStyle.Thin;
                ts_title_top.BorderLeft = BorderStyle.Thin;
                ts_title_top.BorderRight = BorderStyle.Thin;
                ts_title_top.BorderTop = BorderStyle.Thin;
                ts_title_top.SetFont(font_title_top);

                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;
                ts_title.SetFont(font_title);

                IDataFormat dateformat = wk.CreateDataFormat();

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");
                HSSFCellStyle ts_normal_int = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_int.Alignment = HorizontalAlignment.Center;
                ts_normal_int.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_int.SetFont(font_normal);
                ts_normal_int.WrapText = false;
                ts_normal_int.BorderBottom = BorderStyle.Thin;
                ts_normal_int.BorderLeft = BorderStyle.Thin;
                ts_normal_int.BorderRight = BorderStyle.Thin;
                ts_normal_int.BorderTop = BorderStyle.Thin;
                ts_normal_int.DataFormat = dateformat.GetFormat("#,##0");
                #endregion

                #region 第一行写公司名称
                int ind_row = 0;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue(title);
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 13));

                //赋值样式 
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });
                ind_row++;

                #endregion
                #region 第二行
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("序号");
                row.GetCell(1).SetCellValue("业务类型");
                row.GetCell(2).SetCellValue("订单数"); 
                row.GetCell(3).SetCellValue("自然箱");
                row.GetCell(4).SetCellValue("标准箱");
                row.GetCell(5).SetCellValue("20'");
                row.GetCell(6).SetCellValue("40'");
                row.GetCell(7).SetCellValue("45'");
                row.GetCell(8).SetCellValue("应收"); 
                row.GetCell(9).SetCellValue("未收");
                row.GetCell(10).SetCellValue("应付"); 
                row.GetCell(11).SetCellValue("未付");
                row.GetCell(12).SetCellValue("盈利");
                row.GetCell(13).SetCellValue("毛利率");

                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                ind_row++;

                #endregion

                #region 数据行
                if (data_item["rows"] != null)
                {
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue(ja_data[i]["od_typ_desc"].ToString());
                            row.CreateCell(2).SetCellValue(int.Parse((ja_data[i]["order_count"] ?? "").ToString()));
                        
                            row.CreateCell(3).SetCellValue(int.Parse((ja_data[i]["sum_of_cntr_u"] ?? "").ToString()));
                            row.CreateCell(4).SetCellValue(double.Parse((ja_data[i]["sum_of_cntr_t"] ?? "").ToString()));

                            row.CreateCell(5).SetCellValue(int.Parse((ja_data[i]["sum_of_20"] ?? "").ToString()));
                            row.CreateCell(6).SetCellValue(int.Parse((ja_data[i]["sum_of_40"] ?? "").ToString()));
                            row.CreateCell(7).SetCellValue(int.Parse((ja_data[i]["sum_of_45"] ?? "").ToString()));

                            row.CreateCell(8).SetCellValue((ja_data[i]["sum_of_rec_amount_of_base"].ToString())); 
                            row.CreateCell(9).SetCellValue((ja_data[i]["sum_of_unreced_amount_of_base"] ?? "").ToString());
                            row.CreateCell(10).SetCellValue((ja_data[i]["sum_of_pay_amount_of_base"] ?? "").ToString());
                            row.CreateCell(11).SetCellValue((ja_data[i]["sum_of_unpayed_amount_of_base"] ?? "").ToString());
                            row.CreateCell(12).SetCellValue((ja_data[i]["sum_of_profit_amount_of_base"] ?? "").ToString());
                            row.CreateCell(13).SetCellValue((ja_data[i]["sum_of_percent_profit"] ?? "").ToString());


                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });

                            row.GetCell(2).CellStyle = ts_normal_int;
                            row.GetCell(3).CellStyle = ts_normal_int;
                            row.GetCell(5).CellStyle = ts_normal_int;
                            row.GetCell(6).CellStyle = ts_normal_int;
                            row.GetCell(7).CellStyle = ts_normal_int;
                            row.GetCell(4).CellStyle = ts_normal_double; 


                            ind_row++;
                        }
                    }
                }
                #endregion

                #region 汇总统计
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("汇总统计:");
                row.GetCell(2).SetCellValue("总行数:" + data_item["total"].ToString() + "行");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                  
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("自然箱数:" + data_item["out_sum_of_cntr_u"].ToString() + "U");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("标准箱数:" + data_item["out_sum_of_cntr_t"].ToString() + "T");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("箱明细: 20'有" + data_item["out_sum_of_20"].ToString() + "个,40'有" + data_item["out_sum_of_40"].ToString() + "个,45'有" + data_item["out_sum_of_45"].ToString() + "个");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("收款汇总: 应收-" + data_item["out_sum_of_rec_amount_of_base"].ToString() + ",未收-" + data_item["out_sum_of_unreced_amount_of_base"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("付款汇总: 应付-" + data_item["out_sum_of_pay_amount_of_base"].ToString() + ",未付-" + data_item["out_sum_of_unpayed_amount_of_base"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 14; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("总盈利: " + data_item["out_sum_of_profit_amount_of_base"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 13));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                #endregion
                #endregion



                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

       
        #endregion

        #region 根据船舶统计
        #region 查询
        public void get_rpt_of_ship_group(HttpRequest req, HttpResponse res)
        {
            try
            { 
                 
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_ship_group(c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_ship_group_of_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {

                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string od_route_tools_owner = req.Params["od_route_tools_owner"] == null ? string.Empty : req.Params["od_route_tools_owner"].ToString();

                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_ship_group_of_order_list(
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_route_tools_owner,
                    c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_ship_group_of_fee_list(HttpRequest req, HttpResponse res)
        {
            try
            {

                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string od_route_tools_owner = req.Params["od_route_tools_owner"] == null ? string.Empty : req.Params["od_route_tools_owner"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();

                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_ship_group_of_fee_list(
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_route_tools_owner,
                    c_id, 
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void get_rpt_of_ship_group_of_cntr_list(HttpRequest req, HttpResponse res)
        {
            try
            {

                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string od_route_tools_owner = req.Params["od_route_tools_owner"] == null ? string.Empty : req.Params["od_route_tools_owner"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_ship_group_of_cntr_list(
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_route_tools_owner,
                    c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 下载 费用汇总
        private void download_rpt_of_ship_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理
 
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_ship_group(c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];



                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按船舶统计时间段" + par_of_dat + "内业务量";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按船舶统计时间段" + par_of_dat + "内业务量.xls";

                #endregion

                #region 创建表格
                string sheetName = "sheet1";

                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;

                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(13, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(14, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(15, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(16, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(17, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(18, (int)((8 + 0.72) * 256));
                #endregion
                #region 格式
                IRow row = null;
                ICell cell = null;

                #region 字体样式
                HSSFFont font_normal;
                font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗 
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                HSSFFont font_bold;
                font_bold = wk.CreateFont() as HSSFFont;
                font_bold.IsBold = true;//加粗 
                font_bold.FontName = "宋体";
                font_bold.FontHeightInPoints = (short)9;

                HSSFFont font_title_top;
                font_title_top = wk.CreateFont() as HSSFFont;
                font_title_top.IsBold = true;//加粗 
                font_title_top.FontName = "宋体";
                font_title_top.FontHeightInPoints = (short)14;

                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗 
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)9;

                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                ts_normal.Alignment = HorizontalAlignment.Left;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                ts_normal.SetFont(font_normal);

                HSSFCellStyle ts_bold = wk.CreateCellStyle() as HSSFCellStyle;
                ts_bold.Alignment = HorizontalAlignment.Left;
                ts_bold.VerticalAlignment = VerticalAlignment.Center;
                ts_bold.BorderBottom = BorderStyle.Thin;
                ts_bold.BorderLeft = BorderStyle.Thin;
                ts_bold.BorderRight = BorderStyle.Thin;
                ts_bold.BorderTop = BorderStyle.Thin;
                ts_bold.SetFont(font_bold);

                HSSFCellStyle ts_title_top = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title_top.Alignment = HorizontalAlignment.Center;
                ts_title_top.VerticalAlignment = VerticalAlignment.Center;
                ts_title_top.BorderBottom = BorderStyle.Thin;
                ts_title_top.BorderLeft = BorderStyle.Thin;
                ts_title_top.BorderRight = BorderStyle.Thin;
                ts_title_top.BorderTop = BorderStyle.Thin;
                ts_title_top.SetFont(font_title_top);

                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;
                ts_title.SetFont(font_title);

                IDataFormat dateformat = wk.CreateDataFormat();

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");
                HSSFCellStyle ts_normal_int = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_int.Alignment = HorizontalAlignment.Center;
                ts_normal_int.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_int.SetFont(font_normal);
                ts_normal_int.WrapText = false;
                ts_normal_int.BorderBottom = BorderStyle.Thin;
                ts_normal_int.BorderLeft = BorderStyle.Thin;
                ts_normal_int.BorderRight = BorderStyle.Thin;
                ts_normal_int.BorderTop = BorderStyle.Thin;
                ts_normal_int.DataFormat = dateformat.GetFormat("#,##0");
                #endregion

                #region 第一行写公司名称
                int ind_row = 0;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 10; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue(title);
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 9));

                //赋值样式 
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });
                ind_row++;

                #endregion
                #region 第二行
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 10; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("序号");
                row.GetCell(1).SetCellValue("船名");
                row.GetCell(2).SetCellValue("航次");
                row.GetCell(3).SetCellValue("船东");
                row.GetCell(4).SetCellValue("涉委托数");
                row.GetCell(5).SetCellValue("自然箱");
                row.GetCell(6).SetCellValue("标准箱");
                row.GetCell(7).SetCellValue("20'");
                row.GetCell(8).SetCellValue("40'");
                row.GetCell(9).SetCellValue("45'");
                

                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                ind_row++;

                #endregion

                #region 数据行
                if (data_item["rows"] != null)
                {
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue(ja_data[i]["tools_desc"].ToString());
                            row.CreateCell(2).SetCellValue(ja_data[i]["tools_no"].ToString());
                            row.CreateCell(3).SetCellValue(ja_data[i]["tools_owner"].ToString());
                            row.CreateCell(4).SetCellValue(int.Parse((ja_data[i]["order_count"] ?? "").ToString()));
                            row.CreateCell(5).SetCellValue(int.Parse((ja_data[i]["sum_of_cntr_u"] ?? "").ToString()));

                            row.CreateCell(6).SetCellValue(double.Parse((ja_data[i]["sum_of_cntr_t"] ?? "").ToString()));
                          
                            row.CreateCell(7).SetCellValue(int.Parse((ja_data[i]["sum_of_20"] ?? "").ToString()));
                            row.CreateCell(8).SetCellValue(int.Parse((ja_data[i]["sum_of_40"] ?? "").ToString()));
                            row.CreateCell(9).SetCellValue(int.Parse((ja_data[i]["sum_of_45"] ?? "").ToString()));

                         
                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });

                            row.GetCell(4).CellStyle = ts_normal_int;
                            row.GetCell(5).CellStyle = ts_normal_int;
                            row.GetCell(7).CellStyle = ts_normal_int;
                            row.GetCell(8).CellStyle = ts_normal_int;
                            row.GetCell(9).CellStyle = ts_normal_int;
                            row.GetCell(6).CellStyle = ts_normal_double;
                           

                            ind_row++;
                        }
                    }
                }
                #endregion

                #region 汇总统计
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 10; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("汇总统计:");
                row.GetCell(2).SetCellValue("总行数:" + data_item["total"].ToString() + "行");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 9));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 10; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("自然箱数:" + data_item["out_sum_of_cntr_u"].ToString() + "U");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 9));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 10; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("标准箱数:" + data_item["out_sum_of_cntr_t"].ToString() + "T");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 9));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 10; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(2).SetCellValue("箱明细: 20'有" + data_item["out_sum_of_20"].ToString() + "个,40'有" + data_item["out_sum_of_40"].ToString() + "个,45'有" + data_item["out_sum_of_45"].ToString() + "个");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 9));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                  
                #endregion
                #endregion



                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion

        #region 订单信息下载
        private void download_rpt_of_ship_group_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理

                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string od_route_tools_owner = req.Params["od_route_tools_owner"] == null ? string.Empty : req.Params["od_route_tools_owner"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_ship_group_of_order_list(
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_route_tools_owner,
                    c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按船舶统计" + od_route_tools_desc + "时间段" + par_of_dat + "内业务关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按船舶统计" + od_route_tools_desc + "时间段" + par_of_dat + "内业务关联列表.xls";

                #endregion
                download_rpt_of_order_list(res, title, file_nam, data_item);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 订单费用下载
        private void download_rpt_of_ship_group_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理
                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string od_route_tools_owner = req.Params["od_route_tools_owner"] == null ? string.Empty : req.Params["od_route_tools_owner"].ToString();
                string rec_or_pay = req.Params["rec_or_pay"] == null ? string.Empty : req.Params["rec_or_pay"].ToString();
                
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_ship_group_of_fee_list( 
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_route_tools_owner,
                    c_id, 
                    rec_or_pay,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];


                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }
                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按船舶统计" + od_route_tools_desc + "时间段" + par_of_dat + "内" + (rec_or_pay.Equals("1") ? "应收" : "应付") + "费用关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按船舶统计" + od_route_tools_desc + "时间段" + par_of_dat + "内" + (rec_or_pay.Equals("1") ? "应收" : "应付") + "费用关联列表.xls";

                #endregion
                download_rpt_of_order_fee(res, title, file_nam, data_item, rec_or_pay);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 订单集装箱下载
        private void download_rpt_of_ship_group_order_cntr(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理
                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string od_route_tools_owner = req.Params["od_route_tools_owner"] == null ? string.Empty : req.Params["od_route_tools_owner"].ToString();
                
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_ship_group_of_cntr_list( 
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_route_tools_owner,
                    c_id, 
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];


                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--按船舶统计" + od_route_tools_desc + "时间段" + par_of_dat + "内集装箱关联列表";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--按船舶统计" + od_route_tools_desc + "时间段" + par_of_dat + "内集装箱关联列表.xls";

                #endregion
                download_rpt_of_order_cntr(res, title, file_nam, data_item);


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion

        #region 根据员工统计
        #region 查询
        public void get_rpt_of_unwoa_group(HttpRequest req, HttpResponse res)
        {
            try
            {  
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_unwoa_group(c_id, 
                    u_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
 
        #endregion
        #region 下载 费用汇总
        private void download_rpt_of_unwoa_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理 
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                string beg_year = req.Params["beg_year"] == null ? string.Empty : req.Params["beg_year"].ToString();
                string end_year = req.Params["end_year"] == null ? string.Empty : req.Params["end_year"].ToString();
                string beg_month = req.Params["beg_month"] == null ? string.Empty : req.Params["beg_month"].ToString();
                string end_month = req.Params["end_month"] == null ? string.Empty : req.Params["end_month"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_lead_query bll = new bll_lead_query();

                string json = bll.get_rpt_of_unwoa_group(c_id, 
                    u_id,
                    beg_year,
                    end_year,
                    beg_month,
                    end_month);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                // 所属公司信息 

                BLL.schema_cto.bul_schema_cto bsc = new BLL.schema_cto.bul_schema_cto();

                string schema_cto_json = bsc.get_schema_cto_by_c_id(c_id);
                JObject schema_cto_jo = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(schema_cto_json);
                JArray schema_cto_ja = (JArray)schema_cto_jo["rows"];
                 

                string par_of_dat = string.Empty;

                if (beg_year.Equals(string.Empty))
                {
                    par_of_dat = "无开始时间 至 ";
                }
                else
                {
                    if (beg_month.Equals(string.Empty))
                    {
                        par_of_dat = beg_year + "年01月01日 至 ";
                    }
                    else
                    {
                        if (Convert.ToInt32(beg_month) > 10)
                        {
                            par_of_dat = beg_year + "年" + beg_month + "月01日 至 ";
                        }
                        else
                        {
                            par_of_dat = beg_year + "年0" + beg_month + "月01日 至 ";
                        }
                    }
                }

                if (end_year.Equals(string.Empty))
                {
                    par_of_dat += "无结束时间";
                }
                else
                {
                    if (end_month.Equals(string.Empty))
                    {
                        par_of_dat += end_year + "年01月01日";
                    }
                    else
                    {
                        if (Convert.ToInt32(end_month) + 1 > 12)
                        {
                            par_of_dat += (Convert.ToInt32(end_year) + 1).ToString() + "年01月01日";
                        }
                        else
                        {
                            if (Convert.ToInt32(end_month) + 1 > 10)
                            {
                                par_of_dat += end_year + "年" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                            else
                            {
                                par_of_dat += end_year + "年0" + (Convert.ToInt32(end_month) + 1).ToString() + "月01日";
                            }
                        }
                    }
                }
                string title = schema_cto_ja[0]["c_desc"].ToString() + "--未结算完统计时间段" + par_of_dat + "内业务量";
                string file_nam = schema_cto_ja[0]["c_desc"].ToString() + "--未结算完统计时间段" + par_of_dat + "内业务量.xls";

                #endregion

                #region 创建表格
                string sheetName = "sheet1";

                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;

                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((14 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((8 + 0.72) * 256));
                
                #endregion
                #region 格式
                IRow row = null;
                ICell cell = null;

                #region 字体样式
                HSSFFont font_normal;
                font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗 
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                HSSFFont font_bold;
                font_bold = wk.CreateFont() as HSSFFont;
                font_bold.IsBold = true;//加粗 
                font_bold.FontName = "宋体";
                font_bold.FontHeightInPoints = (short)9;

                HSSFFont font_title_top;
                font_title_top = wk.CreateFont() as HSSFFont;
                font_title_top.IsBold = true;//加粗 
                font_title_top.FontName = "宋体";
                font_title_top.FontHeightInPoints = (short)14;

                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗 
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)9;

                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                ts_normal.Alignment = HorizontalAlignment.Left;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                ts_normal.SetFont(font_normal);

                HSSFCellStyle ts_bold = wk.CreateCellStyle() as HSSFCellStyle;
                ts_bold.Alignment = HorizontalAlignment.Left;
                ts_bold.VerticalAlignment = VerticalAlignment.Center;
                ts_bold.BorderBottom = BorderStyle.Thin;
                ts_bold.BorderLeft = BorderStyle.Thin;
                ts_bold.BorderRight = BorderStyle.Thin;
                ts_bold.BorderTop = BorderStyle.Thin;
                ts_bold.SetFont(font_bold);

                HSSFCellStyle ts_title_top = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title_top.Alignment = HorizontalAlignment.Center;
                ts_title_top.VerticalAlignment = VerticalAlignment.Center;
                ts_title_top.BorderBottom = BorderStyle.Thin;
                ts_title_top.BorderLeft = BorderStyle.Thin;
                ts_title_top.BorderRight = BorderStyle.Thin;
                ts_title_top.BorderTop = BorderStyle.Thin;
                ts_title_top.SetFont(font_title_top);

                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;
                ts_title.SetFont(font_title);

                IDataFormat dateformat = wk.CreateDataFormat();

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");
                HSSFCellStyle ts_normal_int = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_int.Alignment = HorizontalAlignment.Center;
                ts_normal_int.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_int.SetFont(font_normal);
                ts_normal_int.WrapText = false;
                ts_normal_int.BorderBottom = BorderStyle.Thin;
                ts_normal_int.BorderLeft = BorderStyle.Thin;
                ts_normal_int.BorderRight = BorderStyle.Thin;
                ts_normal_int.BorderTop = BorderStyle.Thin;
                ts_normal_int.DataFormat = dateformat.GetFormat("#,##0");
                #endregion

                #region 第一行写公司名称
                int ind_row = 0;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 11; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue(title);
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 10));

                //赋值样式 
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });
                ind_row++;

                #endregion
                #region 第二行
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 11; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("序号");
                row.GetCell(1).SetCellValue("委托编号");
                row.GetCell(2).SetCellValue("委托时间");
                row.GetCell(3).SetCellValue("结算单位"); 
                row.GetCell(4).SetCellValue("应收");
                row.GetCell(5).SetCellValue("已收");
                row.GetCell(6).SetCellValue("未收");
                row.GetCell(7).SetCellValue("应付");
                row.GetCell(8).SetCellValue("已付");
                row.GetCell(9).SetCellValue("未付");
                row.GetCell(10).SetCellValue("记录人"); 

                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                ind_row++;

                #endregion

                #region 数据行
                if (data_item["rows"] != null)
                {
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue(ja_data[i]["od_no"].ToString());
                            row.CreateCell(2).SetCellValue(ja_data[i]["od_fee_dat"].ToString());
                            row.CreateCell(3).SetCellValue((ja_data[i]["fee_cu_desc"] ?? "").ToString());
                            row.CreateCell(4).SetCellValue((ja_data[i]["rec_total_amount"] ?? "").ToString());
                            row.CreateCell(5).SetCellValue((ja_data[i]["reced_total_amount"] ?? "").ToString());

                            row.CreateCell(6).SetCellValue((ja_data[i]["unreced_total_amount"] ?? "").ToString());
                            row.CreateCell(7).SetCellValue((ja_data[i]["pay_total_amount"] ?? "").ToString());

                            row.CreateCell(8).SetCellValue((ja_data[i]["payed_total_amount"] ?? "").ToString());
                            row.CreateCell(9).SetCellValue((ja_data[i]["unpayed_total_amount"] ?? "").ToString());
                            row.CreateCell(10).SetCellValue((ja_data[i]["od_record_by_nam"] ?? "").ToString());
 

                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });

                      

                            ind_row++;
                        }
                    }
                }
                #endregion

                 
                #endregion



                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #endregion 
        #endregion

        #region 订单信息下载
        private void download_rpt_of_order_list(HttpResponse res,string title,string file_nam,
            JObject data_item)
        {
            try
            { 
                #region 创建表格
                string sheetName = "sheet1";

                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;

                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(13, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(14, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(15, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(16, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(17, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(18, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(19, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(20, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(21, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(22, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(23, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(24, (int)((18 + 0.72) * 256));

                sheet.SetColumnWidth(25, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(26, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(27, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(28, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(29, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(30, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(31, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(32, (int)((8 + 0.72) * 256));

                #endregion
                #region 格式
                IRow row = null;
                ICell cell = null;

                #region 字体样式
                HSSFFont font_normal;
                font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗 
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                HSSFFont font_bold;
                font_bold = wk.CreateFont() as HSSFFont;
                font_bold.IsBold = true;//加粗 
                font_bold.FontName = "宋体";
                font_bold.FontHeightInPoints = (short)9;

                HSSFFont font_title_top;
                font_title_top = wk.CreateFont() as HSSFFont;
                font_title_top.IsBold = true;//加粗 
                font_title_top.FontName = "宋体";
                font_title_top.FontHeightInPoints = (short)14;

                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗 
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)9;

                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                ts_normal.Alignment = HorizontalAlignment.Left;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                ts_normal.SetFont(font_normal);

                HSSFCellStyle ts_bold = wk.CreateCellStyle() as HSSFCellStyle;
                ts_bold.Alignment = HorizontalAlignment.Left;
                ts_bold.VerticalAlignment = VerticalAlignment.Center;
                ts_bold.BorderBottom = BorderStyle.Thin;
                ts_bold.BorderLeft = BorderStyle.Thin;
                ts_bold.BorderRight = BorderStyle.Thin;
                ts_bold.BorderTop = BorderStyle.Thin;
                ts_bold.SetFont(font_bold);

                HSSFCellStyle ts_title_top = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title_top.Alignment = HorizontalAlignment.Center;
                ts_title_top.VerticalAlignment = VerticalAlignment.Center;
                ts_title_top.BorderBottom = BorderStyle.Thin;
                ts_title_top.BorderLeft = BorderStyle.Thin;
                ts_title_top.BorderRight = BorderStyle.Thin;
                ts_title_top.BorderTop = BorderStyle.Thin;
                ts_title_top.SetFont(font_title_top);

                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;
                ts_title.SetFont(font_title);

                IDataFormat dateformat = wk.CreateDataFormat();

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");
                HSSFCellStyle ts_normal_int = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_int.Alignment = HorizontalAlignment.Center;
                ts_normal_int.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_int.SetFont(font_normal);
                ts_normal_int.WrapText = false;
                ts_normal_int.BorderBottom = BorderStyle.Thin;
                ts_normal_int.BorderLeft = BorderStyle.Thin;
                ts_normal_int.BorderRight = BorderStyle.Thin;
                ts_normal_int.BorderTop = BorderStyle.Thin;
                ts_normal_int.DataFormat = dateformat.GetFormat("#,##0");
                #endregion

                #region 第一行写公司名称
                int ind_row = 0;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 33; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue(title);
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 32));

                //赋值样式 
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });
                ind_row++;

                #endregion
                #region 第二行
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 33; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("序号");
                row.GetCell(1).SetCellValue("状态"); 
                row.GetCell(2).SetCellValue("业务编号");
                row.GetCell(3).SetCellValue("业务时间");
                row.GetCell(4).SetCellValue("业务类型");
                row.GetCell(5).SetCellValue("集散");
                row.GetCell(6).SetCellValue("项目名称");
                row.GetCell(7).SetCellValue("内外");
                row.GetCell(8).SetCellValue("进出口");
                row.GetCell(9).SetCellValue("起运地");
                row.GetCell(10).SetCellValue("目的地");
                row.GetCell(11).SetCellValue("承运条款");
                row.GetCell(12).SetCellValue("委托客户");
                row.GetCell(13).SetCellValue("供货客户");
                row.GetCell(14).SetCellValue("品名");
                row.GetCell(15).SetCellValue("货重");
                row.GetCell(16).SetCellValue("件数");
                row.GetCell(17).SetCellValue("箱量");
                row.GetCell(18).SetCellValue("提单");

                row.GetCell(19).SetCellValue("应收小计");
                row.GetCell(20).SetCellValue("已收小计");
                row.GetCell(21).SetCellValue("未收小计");
                row.GetCell(22).SetCellValue("应付小计");
                row.GetCell(23).SetCellValue("已付小计");
                row.GetCell(24).SetCellValue("未付小计");

                row.GetCell(25).SetCellValue("盈利");
                row.GetCell(26).SetCellValue("毛利率");

                row.GetCell(27).SetCellValue("操作");
                row.GetCell(28).SetCellValue("销售");
                row.GetCell(29).SetCellValue("客服");
                row.GetCell(30).SetCellValue("录单时间");
                row.GetCell(31).SetCellValue("业务锁定");
                row.GetCell(32).SetCellValue("锁定时间");

                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                ind_row++;

                #endregion

                #region 数据行
                if (data_item["rows"] != null)
                {
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            //percent_profit
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue((ja_data[i]["od_status_desc"] ?? "").ToString());
                            row.CreateCell(2).SetCellValue((ja_data[i]["od_no"] ?? "").ToString());
                            row.CreateCell(3).SetCellValue((ja_data[i]["od_fee_dat"] ?? "").ToString());
                            row.CreateCell(4).SetCellValue((ja_data[i]["od_typ_desc"] ?? "").ToString());
                            row.CreateCell(5).SetCellValue((ja_data[i]["od_box_typ_desc"] ?? "").ToString());

                            row.CreateCell(6).SetCellValue((ja_data[i]["od_project_typ_desc"] ?? "").ToString());
                            row.CreateCell(7).SetCellValue((ja_data[i]["od_trade_typ_desc"] ?? "").ToString());

                            row.CreateCell(8).SetCellValue((ja_data[i]["od_i_e_desc"] ?? "").ToString());
                            row.CreateCell(9).SetCellValue((ja_data[i]["od_beg_place_desc"] ?? "").ToString());
                            row.CreateCell(10).SetCellValue((ja_data[i]["od_end_place_desc"] ?? "").ToString());

                            row.CreateCell(11).SetCellValue((ja_data[i]["od_freight_desc"].ToString()));
                            row.CreateCell(12).SetCellValue((ja_data[i]["od_delegate_cu_desc"] ?? "").ToString());
                            row.CreateCell(13).SetCellValue((ja_data[i]["od_cargo_agent_cu_desc"] ?? "").ToString());
                            row.CreateCell(14).SetCellValue((ja_data[i]["od_cargo_typ_desc"] ?? "").ToString());
                            row.CreateCell(15).SetCellValue(float.Parse( (ja_data[i]["od_cargo_weight"] ?? "").ToString()));
                            row.CreateCell(16).SetCellValue((ja_data[i]["od_cargo_packing_desc"] ?? "").ToString());
                            row.CreateCell(17).SetCellValue((ja_data[i]["od_cntr_desc"] ?? "").ToString());
                            row.CreateCell(18).SetCellValue((ja_data[i]["od_main_bill_no"] ?? "").ToString());
                            row.CreateCell(19).SetCellValue((ja_data[i]["rec_total_amount_desc"] ?? "").ToString());
                            row.CreateCell(20).SetCellValue((ja_data[i]["reced_total_amount_desc"] ?? "").ToString());
                            row.CreateCell(21).SetCellValue((ja_data[i]["unreced_total_amount_desc"] ?? "").ToString());
                            row.CreateCell(22).SetCellValue((ja_data[i]["pay_total_amount_desc"] ?? "").ToString());
                            row.CreateCell(23).SetCellValue((ja_data[i]["payed_total_amount_desc"] ?? "").ToString());
                            row.CreateCell(24).SetCellValue((ja_data[i]["unpayed_total_amount_desc"] ?? "").ToString());
                            row.CreateCell(25).SetCellValue((ja_data[i]["profit_total_amount_desc"] ?? "").ToString());
                            row.CreateCell(26).SetCellValue((ja_data[i]["percent_profit"] ?? "").ToString());

                            row.CreateCell(27).SetCellValue((ja_data[i]["od_operation_nam"] ?? "").ToString());
                            row.CreateCell(28).SetCellValue((ja_data[i]["od_sales_nam"] ?? "").ToString());
                            row.CreateCell(29).SetCellValue((ja_data[i]["od_service_nam"] ?? "").ToString());
                            row.CreateCell(30).SetCellValue((ja_data[i]["od_record_dat"] ?? "").ToString());
                            row.CreateCell(31).SetCellValue((ja_data[i]["od_operation_lock_nam"] ?? "").ToString());
                            row.CreateCell(32).SetCellValue((ja_data[i]["od_operation_lock_dat"] ?? "").ToString()); 
                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });

                            row.GetCell(15).CellStyle = ts_normal_double; 


                            ind_row++;
                        }
                    }
                }
                #endregion

                #region 汇总统计
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 33; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }

                string[] group_desc = data_item["group_fee_desc"].ToString().Split(';');

                string t_group_desc = "总行数:" + data_item["total"].ToString() + "行,应收:" +
                    group_desc[0] + ",已收:" + group_desc[1] + ",未收:" + group_desc[2] +
                    "应付:" + group_desc[3] + ",已付:" + group_desc[4] + ",未付:" +
                    group_desc[5] + ",盈利:" + group_desc[6];



                row.GetCell(0).SetCellValue("汇总统计:");
                row.GetCell(2).SetCellValue(t_group_desc);
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 32));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
               
                ind_row++;
                #endregion
                #endregion



                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 集装箱信息下载
        private void download_rpt_of_order_cntr(HttpResponse res, string title, string file_nam,
            JObject data_item )
        {
            try
            {

                #region 创建表格
                string sheetName = "sheet1";

                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;

                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(13, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(14, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(15, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(16, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(17, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(18, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(19, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(20, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(21, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(22, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(23, (int)((18 + 0.72) * 256)); 

                #endregion
                #region 格式
                IRow row = null;
                ICell cell = null;

                #region 字体样式
                HSSFFont font_normal;
                font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗 
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                HSSFFont font_bold;
                font_bold = wk.CreateFont() as HSSFFont;
                font_bold.IsBold = true;//加粗 
                font_bold.FontName = "宋体";
                font_bold.FontHeightInPoints = (short)9;

                HSSFFont font_title_top;
                font_title_top = wk.CreateFont() as HSSFFont;
                font_title_top.IsBold = true;//加粗 
                font_title_top.FontName = "宋体";
                font_title_top.FontHeightInPoints = (short)14;

                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗 
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)9;

                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                ts_normal.Alignment = HorizontalAlignment.Left;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                ts_normal.SetFont(font_normal);

                HSSFCellStyle ts_bold = wk.CreateCellStyle() as HSSFCellStyle;
                ts_bold.Alignment = HorizontalAlignment.Left;
                ts_bold.VerticalAlignment = VerticalAlignment.Center;
                ts_bold.BorderBottom = BorderStyle.Thin;
                ts_bold.BorderLeft = BorderStyle.Thin;
                ts_bold.BorderRight = BorderStyle.Thin;
                ts_bold.BorderTop = BorderStyle.Thin;
                ts_bold.SetFont(font_bold);

                HSSFCellStyle ts_title_top = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title_top.Alignment = HorizontalAlignment.Center;
                ts_title_top.VerticalAlignment = VerticalAlignment.Center;
                ts_title_top.BorderBottom = BorderStyle.Thin;
                ts_title_top.BorderLeft = BorderStyle.Thin;
                ts_title_top.BorderRight = BorderStyle.Thin;
                ts_title_top.BorderTop = BorderStyle.Thin;
                ts_title_top.SetFont(font_title_top);

                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;
                ts_title.SetFont(font_title);

                IDataFormat dateformat = wk.CreateDataFormat();

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");
                HSSFCellStyle ts_normal_int = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_int.Alignment = HorizontalAlignment.Center;
                ts_normal_int.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_int.SetFont(font_normal);
                ts_normal_int.WrapText = false;
                ts_normal_int.BorderBottom = BorderStyle.Thin;
                ts_normal_int.BorderLeft = BorderStyle.Thin;
                ts_normal_int.BorderRight = BorderStyle.Thin;
                ts_normal_int.BorderTop = BorderStyle.Thin;
                ts_normal_int.DataFormat = dateformat.GetFormat("#,##0");
                #endregion

                #region 第一行写公司名称
                int ind_row = 0;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 24; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue(title);
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 32));

                //赋值样式 
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });
                ind_row++;

                #endregion
                #region 第二行
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 24; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("序号");
                row.GetCell(1).SetCellValue("业务编号");
                row.GetCell(2).SetCellValue("一程船名");
                row.GetCell(3).SetCellValue("一程航次");
                row.GetCell(4).SetCellValue("船东");
                row.GetCell(5).SetCellValue("尺寸");
                row.GetCell(6).SetCellValue("箱型");
                row.GetCell(7).SetCellValue("箱主");
                row.GetCell(8).SetCellValue("提单号");
                row.GetCell(9).SetCellValue("箱号");
                row.GetCell(10).SetCellValue("铅封号");
                row.GetCell(11).SetCellValue("提空提单");
                row.GetCell(12).SetCellValue("货重");
                row.GetCell(13).SetCellValue("箱货重");
                row.GetCell(14).SetCellValue("件数");
                row.GetCell(15).SetCellValue("体积");
                row.GetCell(16).SetCellValue("报关船名");
                row.GetCell(17).SetCellValue("报关航次");
                row.GetCell(18).SetCellValue("报关海关编码");

                row.GetCell(19).SetCellValue("报关装货区");
                row.GetCell(20).SetCellValue("报关卸货区");
                row.GetCell(21).SetCellValue("报关品名");
                row.GetCell(22).SetCellValue("报关品名编号");
                row.GetCell(23).SetCellValue("整/拼"); 

                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                ind_row++;

                #endregion

                #region 数据行
                if (data_item["rows"] != null)
                {
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            //percent_profit
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue((ja_data[i]["od_no"] ?? "").ToString());
                            row.CreateCell(2).SetCellValue((ja_data[i]["od_route_tools_desc"] ?? "").ToString());
                            row.CreateCell(3).SetCellValue((ja_data[i]["od_route_tools_no"] ?? "").ToString());
                            row.CreateCell(4).SetCellValue((ja_data[i]["od_route_tools_owner_desc"] ?? "").ToString());
                            row.CreateCell(5).SetCellValue((ja_data[i]["eqp_siz"] ?? "").ToString());

                            row.CreateCell(6).SetCellValue((ja_data[i]["eqp_typ"] ?? "").ToString());
                            row.CreateCell(7).SetCellValue((ja_data[i]["opr_cod"] ?? "").ToString());

                            row.CreateCell(8).SetCellValue((ja_data[i]["bill_no"] ?? "").ToString());
                            row.CreateCell(9).SetCellValue((ja_data[i]["cntr_no"] ?? "").ToString());
                            row.CreateCell(10).SetCellValue((ja_data[i]["seal_no"] ?? "").ToString());

                            row.CreateCell(11).SetCellValue((ja_data[i]["pick_empty_no"].ToString()));
                            row.CreateCell(12).SetCellValue(float.Parse((ja_data[i]["cargo_net_wgt"] ?? "").ToString()));
                            row.CreateCell(13).SetCellValue(float.Parse((ja_data[i]["cntr_gross_wgt"] ?? "").ToString()));
                            row.CreateCell(14).SetCellValue(float.Parse((ja_data[i]["cargo_pick_number"] ?? "").ToString()));
                            row.CreateCell(15).SetCellValue(float.Parse((ja_data[i]["cargo_bluk"] ?? "").ToString()));
                            row.CreateCell(16).SetCellValue((ja_data[i]["customs_ship_desc"] ?? "").ToString());
                            row.CreateCell(17).SetCellValue((ja_data[i]["customs_voyage_no"] ?? "").ToString());
                            row.CreateCell(18).SetCellValue((ja_data[i]["customs_ship_no"] ?? "").ToString());
                            row.CreateCell(19).SetCellValue((ja_data[i]["customs_load_port"] ?? "").ToString());
                            row.CreateCell(20).SetCellValue((ja_data[i]["customs_disc_port"] ?? "").ToString());
                            row.CreateCell(21).SetCellValue((ja_data[i]["cargo_goods_desc"] ?? "").ToString());
                            row.CreateCell(22).SetCellValue((ja_data[i]["customs_hs_cod"] ?? "").ToString());
                            row.CreateCell(23).SetCellValue((ja_data[i]["cntr_pin_desc"] ?? "").ToString()); 
                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });

                            row.GetCell(15).CellStyle = ts_normal_double;


                            ind_row++;
                        }
                    }
                }
                #endregion

                #region 汇总统计
                
                ind_row++;
                #endregion
                #endregion



                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region  费用下载
        private void download_rpt_of_order_fee(HttpResponse res,string title,string file_nam,
            JObject data_item,string rec_or_pay)
        {
            try
            {
                #region 打开Excel表格模板，并初始化到NPOI对象中
                string sheetName = "Sheet1";
                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;
                #region 列宽

                //设置excel列宽
                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((12 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(9, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(10, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(20, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(13, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(14, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(15, (int)((18 + 0.72) * 256));
                sheet.SetColumnWidth(16, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(17, (int)((12 + 0.72) * 256));
                sheet.SetColumnWidth(18, (int)((12 + 0.72) * 256));
                sheet.SetColumnWidth(19, (int)((24 + 0.72) * 256));
                sheet.SetColumnWidth(20, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(21, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(22, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(23, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(24, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(25, (int)((20 + 0.72) * 256));
                sheet.SetColumnWidth(26, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(27, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(28, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(29, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(30, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(31, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(32, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(33, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(34, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(35, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(36, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(37, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(38, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(39, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(40, (int)((10 + 0.72) * 256));

                #endregion

                #endregion



                #region 数据处理
                //读取Excel表格中的第一张Sheet表

                IRow row = null;//数据行
                ICell cell = null;//数据行中的某列 
                #region 字体样式
                //（头部标题）合并的单元格样式
                HSSFCellStyle ts_normal = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal.Alignment = HorizontalAlignment.Center;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                HSSFFont font_normal = wk.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗

                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)9;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_normal.SetFont(font_normal);
                ts_normal.WrapText = false;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                IDataFormat dateformat = wk.CreateDataFormat();
                //ICellStyle style = wk.CreateCellStyle();
                //style.DataFormat = dateformat.GetFormat("#,##0.00");
                //ICellStyle style2 = wk.CreateCellStyle();
                //style2.DataFormat = dateformat.GetFormat("#,##0.0000");
                //ICellStyle style3 = wk.CreateCellStyle();
                //style2.DataFormat = dateformat.GetFormat("¥#,##0.00");

                HSSFCellStyle ts_normal_double = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double.Alignment = HorizontalAlignment.Center;
                ts_normal_double.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double.SetFont(font_normal);
                ts_normal_double.WrapText = false;
                ts_normal_double.BorderBottom = BorderStyle.Thin;
                ts_normal_double.BorderLeft = BorderStyle.Thin;
                ts_normal_double.BorderRight = BorderStyle.Thin;
                ts_normal_double.BorderTop = BorderStyle.Thin;
                ts_normal_double.DataFormat = dateformat.GetFormat("#,##0.00");

                HSSFCellStyle ts_normal_double4 = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal_double4.Alignment = HorizontalAlignment.Center;
                ts_normal_double4.VerticalAlignment = VerticalAlignment.Center;

                ts_normal_double4.SetFont(font_normal);
                ts_normal_double4.WrapText = false;
                ts_normal_double4.BorderBottom = BorderStyle.Thin;
                ts_normal_double4.BorderLeft = BorderStyle.Thin;
                ts_normal_double4.BorderRight = BorderStyle.Thin;
                ts_normal_double4.BorderTop = BorderStyle.Thin;
                ts_normal_double4.DataFormat = dateformat.GetFormat("#,##0.0000");


                //单元格样式
                HSSFCellStyle ts_title = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                HSSFFont font_title;
                font_title = wk.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)12;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_title.SetFont(font_title);
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;

                //标记颜色 
                HSSFCellStyle ts_yellow = wk.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_yellow.Alignment = HorizontalAlignment.Center;
                ts_yellow.VerticalAlignment = VerticalAlignment.Center;
                ts_yellow.SetFont(font_normal);
                ts_yellow.WrapText = true;
                ts_yellow.BorderBottom = BorderStyle.Thin;
                ts_yellow.BorderLeft = BorderStyle.Thin;
                ts_yellow.BorderRight = BorderStyle.Thin;
                ts_yellow.BorderTop = BorderStyle.Thin;
                ts_yellow.FillForegroundColor = HSSFColor.Yellow.Index;
                ts_yellow.FillPattern = FillPattern.SolidForeground;
                #endregion

                #region 表头


                string[] head1 = { "费用详情", "委托情况", "维护情况" };
                string[] head2 = { "序号", "状态", "结算单位", "委托号", "业务时间", "税率", "费项", "数量", "单位", "单价", "币种", "汇率", "小计金额", "已销", "本币小计", "关联提空号", "关联箱属", "工具名", "工具号", "提单号", "发票号", "开票时间", "通审时间", "销账时间", "账期", "费用备注", "所属账单", "审核状态", "业务类型", "项目类型", "总应收", "实收", "未收", "总应付", "实付", "未付", "盈利", "记录人", "记录时间", "对账人", "对账时间" };
                row = sheet.CreateRow(0);
                for (int i = 0; i < head2.Length; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.Cells[0].SetCellValue(title);
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 0, 26));

                row = sheet.CreateRow(1);
                for (int i = 0; i < head2.Length; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }

                row.Cells[0].SetCellValue(head1[0]);
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 0, 26));
                row.Cells[27].SetCellValue(head1[1]);
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 27, 36));
                row.Cells[37].SetCellValue(head1[2]);
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 37, 40));
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });

                row = sheet.CreateRow(2);
                for (int i = 0; i < head2.Length; i++)
                {
                    row.CreateCell(i).SetCellValue(head2[i]);
                }
                cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                #endregion

                if (data_item["rows"] != null)
                {
                    #region 数据处理
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        int i = 0;
                        for (; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(3 + i);
                            row.CreateCell(0).SetCellValue((ja_data[i]["rownumber"] ?? (i + 1)).ToString());
                            row.CreateCell(1).SetCellValue(ja_data[i]["fee_status_desc"].ToString());
                            row.CreateCell(2).SetCellValue(ja_data[i]["fee_cu_desc"].ToString());
                            row.CreateCell(3).SetCellValue(ja_data[i]["od_no"].ToString());
                            row.CreateCell(4).SetCellValue(ja_data[i]["fee_dat"].ToString());
                            row.CreateCell(5).SetCellValue(ja_data[i]["fee_invoice_typ_desc"].ToString());
                            row.CreateCell(6).SetCellValue(ja_data[i]["fee_item_typ_desc"].ToString());
                            row.CreateCell(7).SetCellValue(double.Parse((ja_data[i]["fee_number"] ?? "").ToString()));

                            row.CreateCell(8).SetCellValue(ja_data[i]["fee_unit_desc"].ToString());
                            row.CreateCell(9).SetCellValue(double.Parse((ja_data[i]["fee_price"] ?? "").ToString()));

                            row.CreateCell(10).SetCellValue(ja_data[i]["fee_currency_desc"].ToString());
                            row.CreateCell(11).SetCellValue(double.Parse((ja_data[i]["fee_currency_rate"] ?? "").ToString()));

                            row.CreateCell(12).SetCellValue(double.Parse((ja_data[i]["fee_amount"] ?? "").ToString()));

                            row.CreateCell(13).SetCellValue(double.Parse((ja_data[i]["woa_total_amount"] ?? "").ToString()));

                            row.CreateCell(14).SetCellValue(double.Parse((ja_data[i]["fee_amount_of_base_currency"] ?? "").ToString()));

                            row.CreateCell(15).SetCellValue(ja_data[i]["fee_rel_bill_no"].ToString());
                            row.CreateCell(16).SetCellValue(ja_data[i]["fee_rel_opr_cod"].ToString());
                            row.CreateCell(17).SetCellValue(ja_data[i]["first_ship_nam"].ToString());
                            row.CreateCell(18).SetCellValue(ja_data[i]["first_voyage"].ToString());
                            row.CreateCell(19).SetCellValue(ja_data[i]["od_main_bill_no"].ToString());
                            row.CreateCell(20).SetCellValue(ja_data[i]["od_invoice_no"].ToString());
                            row.CreateCell(21).SetCellValue(ja_data[i]["fee_invoice_lock_dat"].ToString());
                            row.CreateCell(22).SetCellValue(ja_data[i]["ca_amc_finish_dat"].ToString());
                            row.CreateCell(23).SetCellValue(ja_data[i]["fee_finace_lock_dat"].ToString());
                            row.CreateCell(24).SetCellValue(ja_data[i]["fee_limit_dat"].ToString());
                            row.CreateCell(25).SetCellValue(ja_data[i]["fee_bak"].ToString());
                            row.CreateCell(26).SetCellValue(ja_data[i]["ca_title"].ToString());
                            row.CreateCell(27).SetCellValue(ja_data[i]["od_status_desc"].ToString());
                            row.CreateCell(28).SetCellValue(ja_data[i]["od_typ_desc"].ToString());
                            row.CreateCell(29).SetCellValue(ja_data[i]["od_project_typ_desc"].ToString());
                            row.CreateCell(30).SetCellValue(ja_data[i]["rec_total_amount_desc"].ToString());

                            row.CreateCell(31).SetCellValue(ja_data[i]["reced_total_amount_desc"].ToString());

                            row.CreateCell(32).SetCellValue(ja_data[i]["unreced_total_amount_desc"].ToString());

                            row.CreateCell(33).SetCellValue(ja_data[i]["pay_total_amount_desc"].ToString());

                            row.CreateCell(34).SetCellValue(ja_data[i]["payed_total_amount_desc"].ToString());

                            row.CreateCell(35).SetCellValue(ja_data[i]["unpayed_total_amount_desc"].ToString());

                            row.CreateCell(36).SetCellValue(ja_data[i]["profit_total_amount_desc"].ToString());

                            row.CreateCell(37).SetCellValue(ja_data[i]["fee_record_nam"].ToString());
                            row.CreateCell(38).SetCellValue(ja_data[i]["fee_record_dat"].ToString());
                            row.CreateCell(39).SetCellValue(ja_data[i]["fee_checkaccount_lock_nam"].ToString());
                            row.CreateCell(40).SetCellValue(ja_data[i]["fee_checkaccount_lock_dat"].ToString());



                            cells = row.Cells;

                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });
                            row.GetCell(7).CellStyle = ts_normal_double;
                            row.GetCell(9).CellStyle = ts_normal_double;
                            row.GetCell(11).CellStyle = ts_normal_double4;
                            row.GetCell(12).CellStyle = ts_normal_double;
                            row.GetCell(13).CellStyle = ts_normal_double;
                            row.GetCell(14).CellStyle = ts_normal_double;


                        }

                        row = sheet.CreateRow(2 + i);
                        for (int j = 0; j < head2.Length; j++)
                        {
                            row.CreateCell(j).SetCellValue("");
                        }

                        string[] sarr = (data_item["group_fee_desc"] ?? "").ToString().Split(';');

                        string group_fee_desc = "费用汇总: 总金额:" + sarr[0] + "  已销:" + sarr[1] + "  未销:" + sarr[2];

                        row.Cells[0].SetCellValue(group_fee_desc);
                        sheet.AddMergedRegion(new CellRangeAddress(2 + i, 2 + i, 0, 40));
                    }
                    #endregion
                }

                #endregion

                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion
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