using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using BLL.order;
using BLL.commone;
using CAL.order_cntr;

using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using NPOI.SS.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.Util;
using System.Drawing;
using System.Text.RegularExpressions;
using System.Text;


namespace Jbfd.Ashx
{
    /// <summary>
    /// order 的摘要说明
    /// </summary>
    public class order : IHttpHandler, IRequiresSessionState
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

                    #region 获取订单
                    #region 订单列表
                    case "get_order_list":
                        {
                            get_order_list(req, res);
                        }
                        break;
                    #endregion
                    #region 单个订单
                    #region 订单基础信息、货物资料及合同附件
                    case "get_order_single_collections":
                        {
                            get_order_single_collections(req, res);
                        }
                        break;
                    #endregion
                    #region 订单集装箱 及 装箱资料
                    case "get_order_cntr_and_etc_collections":
                        {
                            get_order_cntr_and_etc_collections(req, res);
                        }
                        break;
                    #endregion 
                    #region 单独获取装箱资料图片
                    case "get_order_cntr_file_info_data":
                        {
                            get_order_cntr_file_info_data(req, res);
                        }
                        break;
                    #endregion 
                    #region 订单 订舱单
                    case "get_order_booking_note":
                        {
                            get_order_booking_note(req, res);
                        }
                        break;
                    case "download_booking_note":
                        {
                            download_booking_note(req, res);
                        }
                        break;
                    #endregion
                    #region 获取服务商
                    case "get_service":
                        {
                            get_service(req, res);
                        }
                        break;
                    #endregion
                    #region 获取服务商的 批次
                    case "get_service_sub":
                        {
                            get_service_sub(req, res);
                        }
                        break;
                    #endregion
                    #region 获取服务批次打包 包含 运程明细,箱量 费用
                    case "get_service_sub_collections":
                        {
                            get_service_sub_collections(req, res);
                        }
                        break;
                    #endregion 
                    #region 获取 订单 费用(所有)
                    case "get_order_fee":
                        {
                            get_order_fee(req, res);
                        }
                        break;
                    #endregion 

                    #region 下载 铁路清单
                    case "get_sub_way_details":
                        {
                            get_sub_way_details(req, res);
                        }
                        break;
                    #endregion 
                    #region 下载 派车单
                    case "get_road_way_details":
                        {
                            get_road_way_details(req, res);
                        }
                        break;
                    #endregion

                    #region 下载 单票对账单
                    case "get_rec_check_account_of_single_order":
                        {
                            get_rec_check_account_of_single_order(req, res);
                        }
                        break;
                    #endregion 
                    #region 下载 预配清单
                    case "download_order_cntr_pre_schedule_list":
                        {
                            download_order_cntr_pre_schedule_list(req, res);
                        }
                        break;
                    #endregion
                    #region 下载 外贸出口重箱申报清单清单
                    case "download_order_cntr_schedule_list":
                        {
                            download_order_cntr_schedule_list(req, res);
                        }
                        break;
                    #endregion
                    #region 获取 单个 集装箱装箱图片信息
                    case "get_order_cntr_file_info_by_cntr_id":
                        {
                            get_order_cntr_file_info_by_cntr_id(req, res);
                        }
                        break;
                    #endregion
                    #region 莫名其妙的一些附加信息获取
                    case "get_cargo_addtion_info":
                        {
                            get_cargo_addtion_info(req, res);
                        }
                        break;
                    #endregion
                    #region 整体打包
                    case "get_order_single_full_collections":
                        {
                            get_order_single_full_collections(req, res);
                        }
                        break;

                    case "download_single_full_collections":
                        {
                            download_single_full_collections(req, res);
                        }
                        break;
                    #endregion
                    #endregion

                    #region 统计
                    case "get_group_details_of_operation_for_self":
                        {
                            get_group_details_of_operation_for_self(req, res);
                        }
                        break;
                    case "get_group_details_of_operation_for_busi":
                        {
                            get_group_details_of_operation_for_busi(req, res);
                        }
                        break;
                    #endregion 
                    #endregion

                    #region 订单编辑
                    #region 新增
                    case "insert_order":
                        {
                            insert_order(req, res);
                        }
                        break;
                    #endregion

                    #region 拷贝新增
                    case "insert_order_by_copy":
                        {
                            insert_order_by_copy(req, res);
                        }
                        break;
                    #endregion

                    #region 上传订舱单
                    case "insert_order_by_order_file":
                        {
                            insert_order_by_order_file(req, res);
                        }
                        break;
                    #endregion 

                    #region 编辑
                    case "update_order":
                        {
                            update_order(req, res);
                        }
                        break;
                    #endregion

                    #region 删除 箱量 
                    case "delete_cntr_group":
                        {
                            delete_cntr_group(req, res);
                        }
                        break;
                    #endregion

                   

                    #region 新增 订单集装箱
                    case "insert_order_cntr":
                        {
                            insert_order_cntr(req, res);
                        }
                        break;

                        //导入时 ，验证字符串合法性
                    case "validate_str":
                        {
                            validate_str(req, res);
                        }
                        break;
                    #endregion

                    #region 删除 订单集装箱
                    case "delete_order_cntr":
                        {
                            delete_order_cntr(req, res);
                        }
                        break;
                    #endregion

                  

                    #region 删除 订单
                    case "delete_order":
                        {
                            delete_order(req, res);
                        }
                        break;
                    #endregion

                    #region 锁定 订单
                    case "lock_order":
                        {
                            lock_order(req, res);
                        }
                        break;
                    #endregion

                    #region 新增服务商
                    case "insert_service":
                        {
                            insert_service(req, res);
                        }
                        break;
                    #endregion

                    #region 删除 服务商
                    case "delete_service":
                        {
                            delete_service(req, res);
                        }
                        break;
                    #endregion

                    #region 新增服务商 批次
                    case "insert_service_sub":
                        {
                            insert_service_sub(req, res);
                        }
                        break;
                    #endregion

                    #region 删除服务商 批次
                    case "delete_service_sub":
                        {
                            delete_service_sub(req, res);
                        }
                        break;
                    #endregion

                    #region 更新服务商 批次
                    case "update_service_sub":
                        {
                            update_service_sub(req, res);
                        }
                        break;
                    #endregion

                    #region 判断是否可以删除费用
                    case "judge_delete_order_fee":
                        {
                            judge_delete_order_fee(req, res);
                        }
                        break;
                   
                    #endregion

                    #region 更新应收费用
                    case "update_order_fee_of_rec":
                        {
                            update_order_fee_of_rec(req, res);
                        }
                        break;
                    #endregion

                    #region 编辑订单 附件 运单和装箱信息
                    case "update_order_addition_infos":
                        {
                            update_order_addition_infos(req, res);
                        }
                        break;
                    #endregion

                    #region 装箱信息文件
                    case "insert_order_cntr_file":
                        {
                            insert_order_cntr_file(req, res);
                        }
                        break;
                    case "delete_order_cntr_file":
                        {
                            delete_order_cntr_file(req, res);
                        }
                        break;
                    #endregion

                    #region 合同文件
                    case "insert_order_contract_file":
                        {
                            insert_order_contract_file(req, res);
                        }
                        break;
                    case "delete_order_contract_file":
                        {
                            delete_order_contract_file(req, res);
                        }
                        break;
                    #endregion

                    #region 应付和船期  2021-7-21
                    case "pre_computer_order_fee_of_ship_voyage":
                        {
                            pre_computer_order_fee_of_ship_voyage(req, res);
                            break;
                        }
                    case "order_fee_bind_ship_voyage":
                        {
                            order_fee_bind_ship_voyage(req, res);
                            break;
                        }
                    case "order_fee_unbind_ship_voyage":
                        {
                            order_fee_unbind_ship_voyage(req, res);
                            break;
                        }

                    case "judge_delete_cntr":
                        {
                            judge_delete_cntr(req, res);
                            break;
                        }
                    case "judge_bind_ship_voyage":
                        {
                            judge_bind_ship_voyage(req, res);
                            break;
                        }
                    #endregion 


                    #endregion

                }
            }
            catch(Exception e)
            {
                mylog.writelog("order." + ACTION,
                 System.DateTime.Now.ToString(),
                 Session["u_id"].ToString() + "/" + e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }

        #region 业务订单

        #region 订单查询
        #region 分页查询
        public void get_order_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string od_typ = req.Params["od_typ"] == null ? string.Empty : req.Params["od_typ"].ToString();
                string od_status_id = req.Params["od_status_id"] == null ? string.Empty : req.Params["od_status_id"].ToString();
                string od_project_typ = req.Params["od_project_typ"] == null ? string.Empty : req.Params["od_project_typ"].ToString();
                string od_cargo_agent_cu_id = req.Params["od_cargo_agent_cu_id"] == null ? string.Empty : req.Params["od_cargo_agent_cu_id"].ToString();
                string od_delegate_cu_id = req.Params["od_delegate_cu_id"] == null ? string.Empty : req.Params["od_delegate_cu_id"].ToString();
                string od_box_typ_id = req.Params["od_box_typ_id"] == null ? string.Empty : req.Params["od_box_typ_id"].ToString();
                string od_beg_fee_dat = req.Params["od_beg_fee_dat"] == null ? string.Empty : req.Params["od_beg_fee_dat"].ToString();
                string od_end_fee_dat = req.Params["od_end_fee_dat"] == null ? string.Empty : req.Params["od_end_fee_dat"].ToString();
                string od_service_id = req.Params["od_service_id"] == null ? string.Empty : req.Params["od_service_id"].ToString();
                
                string od_record_by_company_id = Session["cpy_id"].ToString();

                string od_trade_typ_id = req.Params["od_trade_typ_id"] == null ? string.Empty : req.Params["od_trade_typ_id"].ToString();
                string od_bill_nos = req.Params["od_bill_nos"] == null ? string.Empty : req.Params["od_bill_nos"].ToString();
                string od_cntr_nos = req.Params["od_cntr_nos"] == null ? string.Empty : req.Params["od_cntr_nos"].ToString();
                string od_route_tools_desc = req.Params["od_route_tools_desc"] == null ? string.Empty : req.Params["od_route_tools_desc"].ToString();
                string od_route_tools_no = req.Params["od_route_tools_no"] == null ? string.Empty : req.Params["od_route_tools_no"].ToString();
                string fee_cu_id = req.Params["fee_cu_id"] == null ? string.Empty : req.Params["fee_cu_id"].ToString();
                string od_water_way_flag = req.Params["od_water_way_flag"] == null ? string.Empty : req.Params["od_water_way_flag"].ToString();
                string od_sub_way_flag = req.Params["od_sub_way_flag"] == null ? string.Empty : req.Params["od_sub_way_flag"].ToString();
                string od_road_way_flag = req.Params["od_road_way_flag"] == null ? string.Empty : req.Params["od_road_way_flag"].ToString();
                string od_air_way_flag = req.Params["od_air_way_flag"] == null ? string.Empty : req.Params["od_air_way_flag"].ToString();
               // string od_include_all_service = req.Params["od_include_all_service"] == null ? string.Empty : req.Params["od_include_all_service"].ToString();
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                string u_id = Session["u_id"].ToString();
                bll_order bll = new bll_order();

                string json = bll.get_order_list(like_str,
                    od_typ,
                    od_status_id,
                    od_project_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_box_typ_id,
                    od_beg_fee_dat,
                    od_end_fee_dat,
                    od_service_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    u_id,
                    od_bill_nos,
                    od_cntr_nos,
                    od_route_tools_desc,
                    od_route_tools_no,
                    fee_cu_id,
                    od_water_way_flag,
                    od_sub_way_flag,
                    od_road_way_flag,
                    od_air_way_flag,
                   // od_include_all_service,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 单个订单查询

        #region 订单基础信息、货物资料及合同附件
        public void get_order_single_collections(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string u_id = Session["u_id"].ToString();

                bll_order bll = new bll_order();

                string json = bll.get_order_single_collections(od_seq, u_id); 
                res.Write(json); 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 订单集装箱 及 装箱资料  
        public void get_order_cntr_and_etc_collections(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                
                bll_order bll = new bll_order();

                string json = bll.get_order_cntr_and_etc_collections(od_seq);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 装箱资料文件
        public void get_order_cntr_file_info_data(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();

                bll_order bll = new bll_order();

                string json = bll.get_order_cntr_file_info_data(od_seq);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 订舱单信息
        public void get_order_booking_note(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();

                bll_order bll = new bll_order();

                string json = bll.get_order_booking_note(od_seq);
                res.Write(json); 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 服务商 
        public void get_service(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();

                bll_order bll = new bll_order();

                string json = bll.get_service(od_seq);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取服务商的 批次
        public void get_service_sub(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_service_seq = req.Params["od_service_seq"] == null ? string.Empty : req.Params["od_service_seq"].ToString();
                bll_order bll = new bll_order();

                string json = bll.get_service_sub(od_seq, od_service_seq);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取服务批次打包 包含 运程明细,箱量 费用
        public void get_service_sub_collections(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_service_seq = req.Params["od_service_seq"] == null ? string.Empty : req.Params["od_service_seq"].ToString();
                string od_service_sub_seq = req.Params["od_service_sub_seq"] == null ? string.Empty : req.Params["od_service_sub_seq"].ToString();
                bll_order bll = new bll_order();

                string json = bll.get_service_sub_collections(od_seq, od_service_seq, od_service_sub_seq);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 获取 订单 费用(所有) 
        public void get_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();

                bll_order bll = new bll_order();

                string json = bll.get_order_fee(od_seq);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 下载 火车发运单
        private void get_sub_way_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 打开Excel表格模板，并初始化到NPOI对象中
                IWorkbook wk = new HSSFWorkbook();
                string filePath = System.Web.HttpContext.Current.Server.MapPath("/Templates/发货清单模版.xlsx");
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



                //读取Excel表格中的第一张Sheet表
                ISheet sheet = wk.GetSheetAt(0);
                IRow row = null;//数据行
                ICell cell = null;//数据行中的某列 

                string od_route_seq = req.Params["od_route_seq"] == null ? string.Empty : req.Params["od_route_seq"].ToString();
                string od_service_sub_seq = req.Params["od_service_sub_seq"] == null ? string.Empty : req.Params["od_service_sub_seq"].ToString();
                bll_order bll = new bll_order();
                string json = bll.get_sub_way_details(od_service_sub_seq, od_route_seq);
                string to_desc = string.Empty;

                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                if (data_item["rows"] != null)
                {
                    #region 数据处理
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            row = sheet.CreateRow(1 + i);

                            row.CreateCell(0).SetCellValue(ja_data[i]["rownumber"].ToString());
                            row.CreateCell(1).SetCellValue(ja_data[i]["od_route_tools_owner_desc"].ToString());
                            row.CreateCell(2).SetCellValue(ja_data[i]["od_route_delivery_cargo_info"].ToString());
                            row.CreateCell(3).SetCellValue(ja_data[i]["od_route_to_desc"].ToString());
                            row.CreateCell(4).SetCellValue(ja_data[i]["eqp_typ"].ToString());
                            row.CreateCell(5).SetCellValue(ja_data[i]["opr_cod"].ToString());
                            row.CreateCell(6).SetCellValue(ja_data[i]["bill_no"].ToString());
                            row.CreateCell(7).SetCellValue(ja_data[i]["cntr_no"].ToString());
                            row.CreateCell(8).SetCellValue(ja_data[i]["od_route_vsl"].ToString() + '-' + ja_data[i]["od_route_vvd"].ToString());
                            row.CreateCell(9).SetCellValue(ja_data[i]["od_cargo_typ_desc"].ToString());
                            row.CreateCell(10).SetCellValue(ja_data[i]["od_route_union_e_f_desc"].ToString());

                            to_desc = ja_data[i]["od_route_to_desc"].ToString();
                        }
                    } 
                    #endregion

                    #region 表格导出


                    using (MemoryStream ms = new MemoryStream())
                    {
                        wk.Write(ms);
                        ms.Flush();
                        
 
                        string fileName = "铁路发货清单-" + to_desc + ".xlsx";
                        System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + fileName);
                        System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                        wk.Close();
                        ms.Close();
                    }
                    //将流写入

                    //ms.Dispose();

                    #endregion
                }



            }
            catch (Exception e)
            {

                throw e;
            }
        }

        #endregion

        #region 下载 派车单
        private void get_road_way_details(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 打开Excel表格模板，并初始化到NPOI对象中
                IWorkbook wk = new HSSFWorkbook();
                string filePath = System.Web.HttpContext.Current.Server.MapPath("/Templates/派车单模版.xlsx");
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



                //读取Excel表格中的第一张Sheet表
                ISheet sheet = wk.GetSheetAt(0);
                IRow row = null;//数据行
                ICell cell = null;//数据行中的某列 

                string od_route_seq = req.Params["od_route_seq"] == null ? string.Empty : req.Params["od_route_seq"].ToString();
                string od_service_sub_seq = req.Params["od_service_sub_seq"] == null ? string.Empty : req.Params["od_service_sub_seq"].ToString();
                bll_order bll = new bll_order();
                Dictionary<string, string> dic_temp = bll.get_road_way_details(od_service_sub_seq, od_route_seq);

                for (int i = sheet.FirstRowNum; i <= sheet.LastRowNum; i++)
                {
                    row = sheet.GetRow(i);
                    for (int j = row.FirstCellNum; j < row.LastCellNum; j++)
                    {
                        cell = row.GetCell(j);


                        foreach (KeyValuePair<string, string> kvp in dic_temp)
                        {
                            string cell_val = cell.StringCellValue;
                            if (cell_val.Contains("{$" + kvp.Key + "}"))
                            {
                                cell.SetCellValue(cell_val.Replace("{$" + kvp.Key + "}", kvp.Value));
                            }
                        } 
                    }
                }

                     
                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");
                    string fileName = now_date + "派车单.xlsx";
                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + fileName);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                //将流写入

                //ms.Dispose();

                #endregion
                 



            }
            catch (Exception e)
            {

                throw e;
            }
        }

        #endregion

        #region 下载 单票对账单
        private void get_rec_check_account_of_single_order(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string cu_id = req.Params["cu_id"] == null ? string.Empty : req.Params["cu_id"].ToString();
                string u_id = Session["u_id"].ToString();

                bll_order bll = new bll_order();
                Dictionary<string, string> dic_temp = new Dictionary<string, string>();

                string fee_json = bll.get_rec_check_account_of_single_order(
                    cu_id,
                    od_seq,
                    u_id,
                    ref dic_temp
                    );

                

                #region 打开Excel表格模板，并初始化到NPOI对象中
                IWorkbook wk = new HSSFWorkbook();
                string filePath = System.Web.HttpContext.Current.Server.MapPath("/Templates/单票对账单模版.xlsx");
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



                //读取Excel表格中的第一张Sheet表
                ISheet sheet = wk.GetSheetAt(0);
                IRow row = null;//数据行
                ICell cell = null;//数据行中的某列 


                string od_no = string.Empty;
                string print_nam = string.Empty;
                string print_dat = string.Empty;
                string company_cn_bank_info = string.Empty;
                string company_en_bank_info = string.Empty;
                

                for (int i = sheet.FirstRowNum; i <= sheet.LastRowNum; i++)
                {
                    row = sheet.GetRow(i);
                    for (int j = row.FirstCellNum; j < row.LastCellNum; j++)
                    {
                        cell = row.GetCell(j); 
                        foreach (KeyValuePair<string, string> kvp in dic_temp)
                        {
                            string cell_val = cell.StringCellValue;
                            if (cell_val.Contains("{$" + kvp.Key + "}"))
                            {
                                cell.SetCellValue(cell_val.Replace("{$" + kvp.Key + "}", kvp.Value));
                            }

                            if (kvp.Key.Equals("od_no"))
                            {
                                od_no = kvp.Value;
                            }
                            if (kvp.Key.Equals("print_nam"))
                            {
                                print_nam = kvp.Value;
                            }
                            if (kvp.Key.Equals("print_dat"))
                            {
                                print_dat = kvp.Value;
                            }
                            if (kvp.Key.Equals("company_cn_bank_info"))
                            {
                                company_cn_bank_info = kvp.Value;
                            }
                            if (kvp.Key.Equals("company_en_bank_info"))
                            {
                                company_en_bank_info = kvp.Value;
                            }
                        }
                    }
                }

                #region 字体样式
                //（头部标题）合并的单元格样式
                ICellStyle ts_normal = wk.CreateCellStyle();
                //垂直居中
                ts_normal.Alignment = HorizontalAlignment.Center;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                IFont font_normal;
                font_normal = wk.CreateFont()  ;
                //font.IsBold = true;//加粗
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)10;
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
                ts_normal2.DataFormat = 194;
                //单元格样式
                ICellStyle ts_title = wk.CreateCellStyle();
                //垂直居中
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                IFont font_title;
                font_title = wk.CreateFont();
                font_title.IsBold = true;//加粗
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)10;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_title.SetFont(font_title);
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;

                ICellStyle ts_bottom1 = wk.CreateCellStyle();
                //垂直居中
                ts_bottom1.Alignment = HorizontalAlignment.Left;
                ts_bottom1.VerticalAlignment = VerticalAlignment.Center;
                ts_bottom1.WrapText = true;

                ICellStyle ts_bottom2 = wk.CreateCellStyle();
                //垂直居中
                ts_bottom2.Alignment = HorizontalAlignment.Right;
                ts_bottom2.VerticalAlignment = VerticalAlignment.Center;
                ts_bottom2.WrapText = true;
                #endregion

                

                //从第 14行开始写费用 
                int nStart_index = sheet.FirstRowNum + 13 ;

                row = sheet.CreateRow(nStart_index);
                row.CreateCell(0).SetCellValue("费用类型");
                row.CreateCell(1).SetCellValue("结算币种");
                row.CreateCell(2).SetCellValue("单价");
                row.CreateCell(3).SetCellValue("数量");
                row.CreateCell(4).SetCellValue("应收RMB");
                row.CreateCell(5).SetCellValue("应收USD");
                row.CreateCell(6).SetCellValue("发票类型");

                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });

                nStart_index += 1;

                double rmb_amount = 0;
                double usd_amount = 0;

                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(fee_json);
                if (data_item["rows"] != null)
                {

                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {  
                            row = sheet.CreateRow(nStart_index);
                            row.CreateCell(0).SetCellValue(ja_data[i]["fee_item_typ_desc"].ToString());
                            var cr_code = ja_data[i]["fee_currency_desc"].ToString();

                            row.CreateCell(1).SetCellValue(ja_data[i]["fee_currency_desc"].ToString());
                              
                            row.CreateCell(2).SetCellValue(Convert.ToDouble(ja_data[i]["fee_price"].ToString()));
                            row.CreateCell(3).SetCellValue(Convert.ToDouble(ja_data[i]["fee_number"].ToString()));
                            
                            

                            row.CreateCell(4).SetCellValue(cr_code.Equals("RMB")?Convert.ToDouble(ja_data[i]["fee_amount"].ToString()):0);
                            row.CreateCell(5).SetCellValue(cr_code.Equals("RMB") ? 0 : Convert.ToDouble(ja_data[i]["fee_amount"].ToString()));
                            row.CreateCell(6).SetCellValue(ja_data[i]["fee_invoice_typ_desc"].ToString());

                            cells = row.Cells;

                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                if (c.ColumnIndex > 1 || c.ColumnIndex < 6)
                                {
                                    c.CellStyle = ts_normal2;
                                }
                                else
                                {
                                    c.CellStyle = ts_normal;
                                }
                                
                            });

                            if (cr_code.Equals("RMB"))
                            {
                                rmb_amount += Convert.ToDouble(ja_data[i]["fee_amount"].ToString());
                            }
                            else
                            {
                                usd_amount += Convert.ToDouble(ja_data[i]["fee_amount"].ToString());
                            }
                            nStart_index = nStart_index + 1;
                        }
                    }


                }

                //加一个小结 
                row = sheet.CreateRow(nStart_index );
                row.CreateCell(0).SetCellValue("小计");
                row.CreateCell(1).SetCellValue("人民币合计:" + rmb_amount.ToString("0.00") + "    外币合计:" + usd_amount.ToString("0.00"));
                row.CreateCell(2).SetCellValue("");
                row.CreateCell(3).SetCellValue("");
                row.CreateCell(4).SetCellValue("");
                row.CreateCell(5).SetCellValue("");
                row.CreateCell(6).SetCellValue("");

                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 1, 6));
                cells = row.Cells; 
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                nStart_index = nStart_index + 1;
                //加一行备注  
                row = sheet.CreateRow(nStart_index);
                row.Height = 7 * 200;
                StringBuilder noString = new StringBuilder("请贵司签字确认后通过传真或快递回传.感谢您的合作! \n");
                noString.Append("备注:请您核对以上明细.并请提供发票抬头,如3日内没有异议,我司认为贵司已确认以上费用,谢谢合作! \n");
                noString.Append("我司开户行帐号资料如下\n");

                row.CreateCell(0).SetCellValue(noString.ToString());
                row.CreateCell(1).SetCellValue("");
                row.CreateCell(2).SetCellValue("");
                row.CreateCell(3).SetCellValue("");
                row.CreateCell(4).SetCellValue("");
                row.CreateCell(5).SetCellValue("");
                row.CreateCell(6).SetCellValue("");
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 0, 6));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bottom1;
                });
                //加上开户信息
                nStart_index = nStart_index + 1;
                row = sheet.CreateRow(nStart_index);
                row.Height = 5 * 200;
                row.CreateCell(0).SetCellValue("人民币开户银行:\n" + company_cn_bank_info);
                row.CreateCell(1).SetCellValue("");
                row.CreateCell(2).SetCellValue("");
                row.CreateCell(3).SetCellValue("");
                row.CreateCell(4).SetCellValue("外币开户银行:\n" + company_en_bank_info);
                row.CreateCell(5).SetCellValue("");
                row.CreateCell(6).SetCellValue("");
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 0, 3));
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 4, 6));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bottom1;
                });

                //加上开户信息
                nStart_index = nStart_index + 1;
                row = sheet.CreateRow(nStart_index);
                row.Height = 7 * 200;
                row.CreateCell(0).SetCellValue("");
                row.CreateCell(1).SetCellValue("");
                row.CreateCell(2).SetCellValue("");
                StringBuilder noString1 = new StringBuilder("贵司负责人签名:                    日期：          \n");
                noString1.Append("\n");
                noString1.Append("\n");
                noString1.Append("                               签字盖章：             ");
                row.CreateCell(3).SetCellValue(noString1.ToString());
                row.CreateCell(4).SetCellValue("");
                row.CreateCell(5).SetCellValue("");
                row.CreateCell(6).SetCellValue(""); 
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 3, 6));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bottom1;
                });
                //打印信息 
                nStart_index = nStart_index + 1;
                row = sheet.CreateRow(nStart_index);
                row.CreateCell(0).SetCellValue(@"打印: " + print_nam + "     时间: " + print_dat );
                row.CreateCell(1).SetCellValue("");
                row.CreateCell(2).SetCellValue("");
                row.CreateCell(3).SetCellValue("");
                row.CreateCell(4).SetCellValue("");
                row.CreateCell(5).SetCellValue("");
                row.CreateCell(6).SetCellValue("");
                sheet.AddMergedRegion(new CellRangeAddress(nStart_index, nStart_index, 0, 6));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bottom2;
                });
                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();
                    
                    string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");
                    string fileName = now_date + "对账单.xlsx";
                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + fileName);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                //将流写入

                //ms.Dispose();

                #endregion




            }
            catch (Exception e)
            {

                throw e;
            }
        }

        #endregion

        #region 下载订舱单
        private void download_booking_note(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 打开Excel表格模板，并初始化到NPOI对象中
                IWorkbook wk = new HSSFWorkbook();
                string filePath = System.Web.HttpContext.Current.Server.MapPath("/Templates/武汉海运订舱委托书模板.xls");
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



                //读取Excel表格中的第一张Sheet表
                ISheet sheet = wk.GetSheetAt(0);
                IRow row = null;//数据行
                ICell cell = null;//数据行中的某列 
                Dictionary<string, string> dic_temp = new Dictionary<string, string>();


                dic_temp.Add("print_name", Session["u_real_name"].ToString());//打印人
                dic_temp.Add("print_date", DateTime.Now.ToString("yyyy/MM/dd HH:mm:ss"));//打印时间

                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                bll_order bll = new bll_order();
                string json = bll.get_order_booking_note(od_seq);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                if (data_item["rows"] != null)
                {
                    #region 数据处理
                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        dic_temp.Add("bk_delegate_desc", ja_data[0]["bk_delegate_desc"].ToString());//公司名
                        dic_temp.Add("bk_delegate_address", ja_data[0]["bk_delegate_address"].ToString());//公司地址

                        dic_temp.Add("bk_shipper_desc", ja_data[0]["bk_shipper_desc"].ToString());
                        dic_temp.Add("bk_commissioned_desc", ja_data[0]["bk_commissioned_desc"].ToString());
                        dic_temp.Add("bk_commissioned_to", ja_data[0]["bk_commissioned_to"].ToString());
                        dic_temp.Add("bk_commissioned_tel", ja_data[0]["bk_commissioned_tel"].ToString());
                        dic_temp.Add("bk_commissioned_fax", ja_data[0]["bk_commissioned_fax"].ToString());
                        dic_temp.Add("bk_booking_number", ja_data[0]["bk_booking_number"].ToString());//业务编号
                        dic_temp.Add("bk_consignee_desc", ja_data[0]["bk_consignee_desc"].ToString());
                        dic_temp.Add("bk_delegate_tel", ja_data[0]["bk_delegate_tel"].ToString());
                        dic_temp.Add("bk_delegate_fax", ja_data[0]["bk_delegate_fax"].ToString());
                        dic_temp.Add("bk_delegate_ctc", ja_data[0]["bk_delegate_ctc"].ToString());
                        //时间
                        string bk_delegate_date = ja_data[0]["bk_delegate_date"] == null ? string.Empty : ja_data[0]["bk_delegate_date"].ToString();
                        if (bk_delegate_date.Length > 0)
                        {
                            bk_delegate_date = Convert.ToDateTime(bk_delegate_date).ToString("yyyy-MM-dd");
                        }

                        dic_temp.Add("bk_delegate_date", bk_delegate_date);
                        dic_temp.Add("bk_notify_desc", ja_data[0]["bk_notify_desc"].ToString());
                        dic_temp.Add("bk_carrier_desc", ja_data[0]["bk_carrier_desc"].ToString());//船公司
                        string bk_closing_dat = ja_data[0]["bk_closing_dat"] == null ? string.Empty : ja_data[0]["bk_closing_dat"].ToString();
                        if (bk_closing_dat.Length > 0)
                        {
                            bk_closing_dat = Convert.ToDateTime(bk_closing_dat).ToString("yyyy-MM-dd");
                        }
                        dic_temp.Add("bk_closing_dat", bk_closing_dat);
                        string bk_etd = ja_data[0]["bk_etd"] == null ? string.Empty : ja_data[0]["bk_etd"].ToString();
                        if (bk_etd.Length > 0)
                        {
                            bk_etd = Convert.ToDateTime(bk_etd).ToString("yyyy-MM-dd");
                        }
                        dic_temp.Add("bk_etd", bk_etd);
                        dic_temp.Add("bk_port_of_loading_desc", ja_data[0]["bk_port_of_loading_desc"].ToString());
                        dic_temp.Add("bk_port_of_transit_desc", ja_data[0]["bk_port_of_transit_desc"].ToString());
                        dic_temp.Add("bk_port_of_discharge_desc", ja_data[0]["bk_port_of_discharge_desc"].ToString());
                        dic_temp.Add("bk_freight_term_desc", ja_data[0]["bk_freight_term_desc"].ToString());
                        dic_temp.Add("bk_pay_method_desc", ja_data[0]["bk_pay_method_desc"].ToString());
                        dic_temp.Add("bk_container_typ_and_quantity", ja_data[0]["bk_container_typ_and_quantity"].ToString());
                        dic_temp.Add("bk_shipping_marks_and_no_desc", ja_data[0]["bk_shipping_marks_and_no_desc"].ToString());
                        dic_temp.Add("bk_freight_package_desc", ja_data[0]["bk_freight_package_desc"].ToString());
                        dic_temp.Add("bk_description_of_goods_desc", ja_data[0]["bk_description_of_goods_desc"].ToString());

                        dic_temp.Add("bk_gross_weight", ja_data[0]["bk_gross_weight"] == null ? "0" : ja_data[0]["bk_gross_weight"].ToString());
                        dic_temp.Add("bk_measurement", ja_data[0]["bk_measurement"] == null ? "0" : ja_data[0]["bk_measurement"].ToString());
                        dic_temp.Add("bk_remarks", ja_data[0]["bk_remarks"].ToString());
                    }

                    for (int i = sheet.FirstRowNum; i <= sheet.LastRowNum; i++)
                    {
                        row = sheet.GetRow(i);
                        for (int j = row.FirstCellNum; j < row.LastCellNum; j++)
                        {
                            cell = row.GetCell(j);


                            foreach (KeyValuePair<string, string> kvp in dic_temp)
                            {
                                string cell_val = cell.StringCellValue;
                                if (cell_val.Contains("{$" + kvp.Key + "}"))
                                {
                                    cell.SetCellValue(cell_val.Replace("{$" + kvp.Key + "}", kvp.Value));
                                }
                            }


                        }
                    }


                    #endregion

                    #region 表格导出


                    using (MemoryStream ms = new MemoryStream())
                    {
                        wk.Write(ms);
                        ms.Flush();
                        

                        string now_date = DateTime.Now.ToString("yyyyMMddHHmmss");
                        string fileName = now_date + "_海运委托书" + ".xls";
                        System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + fileName);
                        System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                        wk.Close();
                        ms.Close();
                    }
                    //将流写入

                    //ms.Dispose();

                    #endregion
                }



            }
            catch (Exception e)
            {

                throw e;
            }
        }

        #endregion

        #region 下载 外贸预配清单
        private void download_order_cntr_pre_schedule_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理
                string file_nam = "无提单号 预配清单.xls"; ;

                //  箱型列表
                List<string> lst_eqp_typ = new List<string>();

                List<cls_order_cntr> lst_cntr = new List<cls_order_cntr>();
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                bll_order bll = new bll_order();
                string json = bll.get_order_cntr_data(od_seq);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                if (data_item["rows"] != null)
                {

                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for(int i = 0;i < ja_data.Count;i ++)
                        {
                            lst_cntr.Add(new cls_order_cntr(ja_data[i]["cntr_no"].ToString()
                            , ja_data[i]["eqp_siz"].ToString() + ja_data[i]["eqp_typ"].ToString()
                            , ja_data[i]["seal_no"].ToString()
                            , ja_data[i]["bill_no"].ToString().Trim()
                            , ja_data[i]["cargo_net_wgt"].ToString()
                            , ja_data[i]["cargo_pick_number"].ToString()
                            , ja_data[i]["cargo_bluk"].ToString()
                            , ja_data[i]["opr_cod"].ToString()
                            , ja_data[i]["customs_seal_no"].ToString()
                            , ja_data[i]["customs_voyage_no"].ToString()
                            , ja_data[i]["customs_ship_desc"].ToString()
                            , ja_data[i]["customs_hs_cod"].ToString()
                            , ja_data[i]["customs_load_port"].ToString()
                            , ja_data[i]["customs_disc_port"].ToString()
                            , ja_data[i]["cargo_goods_desc"].ToString()
                            , ja_data[i]["customs_ship_no"].ToString()
                            , ja_data[i]["cntr_gross_wgt"].ToString()
                            , -1
                            //序号要先设置为 -1
                            //, ja_data[i]["cntr_order_by_id"].ToString()
                            , ja_data[i]["cargo_agent_desc"].ToString() 
                            , ja_data[i]["cntr_pin_flag"].ToString().Length == 0?0:Convert.ToInt32(ja_data[i]["cntr_pin_flag"].ToString())
                            ));
                        }
                        
                    }

                    #region 找出所有提单号 创建文件名
                    string bill_nos = string.Empty;

                    foreach (cls_order_cntr kvp in lst_cntr)
                    {

                        string bill_no = string.Empty;

                        if (kvp.Bill_no.Length == 0)
                        {
                            bill_no = "NONE";
                        }
                        else
                        {
                            bill_no = kvp.Bill_no;
                        }
                        if (bill_nos.Equals(string.Empty))
                        {
                            bill_nos = bill_no;
                        }
                        else
                        {
                            if (bill_nos.IndexOf(bill_no) == -1)
                            {
                                bill_nos = bill_nos + " " + bill_no;
                            }
                        }

                    }

                    if (bill_nos.Length == 0)
                    {
                        file_nam = "无提单号 预配清单.xls";
                    }
                    else
                    {
                        file_nam = bill_nos + " 预配清单.xls";
                    }

                    #endregion

                    #region 还有一个问题就是 箱型 表格是横着显示的
                    //所以这里要选出 箱型进行拼接 
                    foreach (cls_order_cntr kvp in lst_cntr)
                    {

                        bool has = false;
                        foreach (string eqp_typ in lst_eqp_typ)
                        {
                            if (eqp_typ.Equals(kvp.Eqp_typ))
                            {
                                has = true;
                            }
                        }
                        if (!has)
                        {
                            lst_eqp_typ.Add(kvp.Eqp_typ);
                        }

                    }

                    if (lst_eqp_typ.Count == 0)
                    {
                        lst_eqp_typ.Add("无箱型");
                    }

                    #endregion


                }
                #endregion

                string sheetName = "Sheet1";
                HSSFWorkbook hssfworkbook = new HSSFWorkbook();
                //创建工作表
                HSSFSheet sheet = hssfworkbook.CreateSheet(sheetName) as HSSFSheet;

                #region 宽度
                //设置excel列宽
                sheet.SetColumnWidth(0, (int)((6 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((30 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((20 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((11 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((22 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((15 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((15 + 0.72) * 256));
                
                int nEqp_Typ = lst_eqp_typ.Count;
                for (int n = 0; n < nEqp_Typ; n++)
                {
                    sheet.SetColumnWidth(9 + n, (int)((6 + 0.72) * 256));
                }
                sheet.SetColumnWidth(9 + nEqp_Typ, (int)((20 + 0.72) * 256));
                sheet.SetColumnWidth(10 + nEqp_Typ, (int)((15 + 0.72) * 256));
                sheet.SetColumnWidth(11 + nEqp_Typ, (int)((15 + 0.72) * 256));
                
                #endregion

                #region 字体样式
                //（头部标题）合并的单元格样式
                HSSFCellStyle ts_normal = hssfworkbook.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal.Alignment = HorizontalAlignment.Center;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                HSSFFont font_normal;
                font_normal = hssfworkbook.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)12;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_normal.SetFont(font_normal);
                ts_normal.WrapText = true;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                //单元格样式
                HSSFCellStyle ts_title = hssfworkbook.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                HSSFFont font_title;
                font_title = hssfworkbook.CreateFont() as HSSFFont;
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
                HSSFCellStyle ts_yellow = hssfworkbook.CreateCellStyle() as HSSFCellStyle; 
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

                #region 标题和表头
                IRow row = sheet.CreateRow(0);
                row.CreateCell(0).SetCellValue("出口集装箱（货物）预配清单");
                row.GetCell(0).CellStyle = ts_title;
                // 合并单元格：参数：起始行, 终止行, 起始列, 终止列 
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 0, 11 + nEqp_Typ));
                //注意：边框样式需要重新设置一下 
                row = sheet.CreateRow(1);
                row.CreateCell(0).SetCellValue("以下货物商检、熏蒸、剪封等非海关手续全部办完，可以出具理货单证：");
                row.GetCell(0).CellStyle = ts_title;
                sheet.AddMergedRegion(new CellRangeAddress(1, 1, 0, 11 + nEqp_Typ));

                row = sheet.CreateRow(2);
                row.CreateCell(0).SetCellValue("序号");
                row.CreateCell(1).SetCellValue("商品名称");
                row.CreateCell(2).SetCellValue("贸易方式");
                row.CreateCell(3).SetCellValue("件数PKGS");
                row.CreateCell(4).SetCellValue("毛重KGS");
                row.CreateCell(5).SetCellValue("体积CBM");
                row.CreateCell(6).SetCellValue("提单号");
                row.CreateCell(7).SetCellValue("CTN NO");
                row.CreateCell(8).SetCellValue("封号");

                for (int n = 0; n < nEqp_Typ; n++)
                {
                    row.CreateCell(9 + n).SetCellValue(lst_eqp_typ[n]);
                }
                row.CreateCell(9 + nEqp_Typ).SetCellValue("船名航次");
                row.CreateCell(10 + nEqp_Typ).SetCellValue("卸区");
                row.CreateCell(11 + nEqp_Typ).SetCellValue("装船港区"); 

                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                #endregion

                #region 数据
               
                /*
                *  数据分组原则 : 
                *  customs_ship_no/customs_ship_desc/customs_voyage_no/customs_load_port/customs_disc_port第一层 
                *  bill_no / 货物名 第二层
               
                */
                //第一层 船信息归类
                #region 分层解析  
                
                List<cls_order_cntr_group> lst_cntr_group = new List<cls_order_cntr_group>();

                foreach (cls_order_cntr kvp in lst_cntr)
                {
                    bool has = false;
                    foreach (cls_order_cntr_group cg in lst_cntr_group)
                    {
                        if(kvp.Customs_ship_no == cg.Customs_ship_no && 
                            kvp.Customs_ship_desc == cg.Customs_ship_desc && 
                            kvp.Customs_voyage_no == cg.Customs_voyage_no && 
                            kvp.Customs_disc_port == cg.Customs_disc_port &&
                            kvp.Customs_load_port == cg.Customs_load_port)
                        {
                            has = true; 
                            cg.Count += 1;

                            bool has_sub = false;

                            foreach (cls_order_cntr_group_sub cgs in cg.Lst_group_sub)
                            {
                                if(kvp.Bill_no == cgs.Bill_no &&
                                    kvp.Cargo_goods_desc == cgs.Cargo_goods_desc)
                                {
                                    has_sub = true;
                                    cgs.Count += 1;
                                }
                            }

                            if (!has_sub)
                            {
                                cls_order_cntr_group_sub new_cgs = new cls_order_cntr_group_sub( kvp.Cargo_goods_desc,kvp.Bill_no);
                                 
                                cg.Lst_group_sub.Add(new_cgs);
                            }

                        }
                    }

                    if (!has)
                    {
                        cls_order_cntr_group new_cg = new cls_order_cntr_group(kvp.Customs_voyage_no,
                            kvp.Customs_ship_desc,
                            kvp.Customs_load_port,
                            kvp.Customs_disc_port,
                            kvp.Customs_ship_no); 
                        cls_order_cntr_group_sub new_cgs = new cls_order_cntr_group_sub(kvp.Cargo_goods_desc, kvp.Bill_no);
                         
                        new_cg.Lst_group_sub.Add(new_cgs);

                        lst_cntr_group.Add(new_cg);
                    }
                }
                #endregion

                #region 依据层级 进行数据填写

                List<cls_order_cntr> lst_write = new List<cls_order_cntr>();

                int nStep = 3;
                foreach(cls_order_cntr_group cg in lst_cntr_group)
                { 
                    double total_cargo_pick_number = 0;
                    double total_cntr_gorss_wgt = 0;
                    double total_cargo_bluk = 0;

                    foreach(cls_order_cntr_group_sub cgs in cg.Lst_group_sub)
                    {
                        #region 写数据
                        foreach(cls_order_cntr oc in lst_cntr)
                        {
                            if(oc.Cargo_goods_desc == cgs.Cargo_goods_desc
                                && oc.Bill_no == cgs.Bill_no && 
                                oc.Customs_ship_desc == cg.Customs_ship_desc &&
                                oc.Customs_ship_no == cg.Customs_ship_no && 
                                oc.Customs_voyage_no == cg.Customs_voyage_no && 
                                oc.Customs_load_port == cg.Customs_load_port && 
                                oc.Customs_disc_port == cg.Customs_disc_port)
                            {
                                row = sheet.CreateRow(nStep); 
                                
                                foreach(cls_order_cntr ooc in lst_cntr)
                                {
                                    // 保证 只赋值一个值 
                                    if(ooc.Cntr_no == oc.Cntr_no && ooc.Cntr_order_by_id == -1){
                                        ooc.Cntr_order_by_id = nStep - 2 ;
                                    }
                                }

                                row.CreateCell(0).SetCellValue(oc.Cntr_order_by_id);
                                row.CreateCell(1).SetCellValue(oc.Cargo_goods_desc);
                                row.CreateCell(2).SetCellValue("");
                                row.CreateCell(3).SetCellValue(oc.Cargo_pick_number);
                                total_cargo_pick_number += oc.Cargo_pick_number.Length == 0?0:Convert.ToDouble(oc.Cargo_pick_number);
                                row.CreateCell(4).SetCellValue(oc.Cntr_gross_wgt);
                                total_cntr_gorss_wgt += oc.Cntr_gross_wgt.Length == 0?0:Convert.ToDouble(oc.Cntr_gross_wgt);
                                row.CreateCell(5).SetCellValue(oc.Cargo_bluk);
                                total_cargo_bluk += oc.Cargo_bluk.Length == 0?0:Convert.ToDouble(oc.Cargo_bluk);
                                row.CreateCell(6).SetCellValue(oc.Bill_no);
                                row.CreateCell(7).SetCellValue(oc.Cntr_no);
                                row.CreateCell(8).SetCellValue(oc.Customs_seal_no);
                                row.CreateCell(9 + nEqp_Typ).SetCellValue(oc.Customs_ship_desc + "  " + oc.Customs_voyage_no);
                                row.CreateCell(10 + nEqp_Typ).SetCellValue(oc.Customs_disc_port);
                                row.CreateCell(11 + nEqp_Typ).SetCellValue(oc.Customs_load_port);
                                bool has_write = false;

                                for (int n = 0; n < nEqp_Typ; n++)
                                {
                                    if(lst_eqp_typ[n] == oc.Eqp_typ){
                                        if(oc.Cntr_pin_flag == 1){
                                            //需要判断，如果已经写过这个箱号，这里就不用再写
                                            
                                            foreach(cls_order_cntr or in lst_write){
                                                if(or.Cntr_no == oc.Cntr_no){
                                                    has_write = true;
                                                }
                                            }
                                            if(!has_write){
                                                row.CreateCell(9 + n).SetCellValue(1);
                                            }
                                            else
                                            {
                                                row.CreateCell(9 + n).SetCellValue("");
                                            }
                                        }
                                        else
                                        {
                                            row.CreateCell(9 + n).SetCellValue(1);
                                        }
                                    } 
                                } 
                                //加入已写
                                lst_write.Add(oc);

                                cells = row.Cells;

                                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                                {
                                    if (has_write && c.ColumnIndex >= 3 && c.ColumnIndex < 9 + nEqp_Typ)
                                    {
                                        c.CellStyle = ts_yellow;
                                    }
                                    else
                                    {
                                        c.CellStyle = ts_normal;
                                    } 
                                });

                                //颜色 


                                nStep += 1;
                            }
                        }
                        #endregion

                        
                        //这里就表示 提单和货名已经写完了 
                        // 提单和货名 合并 cgs.Count
                        //比如有四行， 现在 nStep = 8 
                        //  8 - 1 - 4 = 3
                        sheet.AddMergedRegion(new CellRangeAddress(nStep - cgs.Count, nStep - 1, 1, 1));
                        sheet.AddMergedRegion(new CellRangeAddress(nStep - cgs.Count, nStep - 1, 6, 6));

                    }
                    //这里就表示 船名航次已经写完了 
                    sheet.AddMergedRegion(new CellRangeAddress(nStep - cg.Count, nStep - 1, 9 + nEqp_Typ, 9 + nEqp_Typ));
                    sheet.AddMergedRegion(new CellRangeAddress(nStep - cg.Count, nStep - 1, 10 + nEqp_Typ, 10 + nEqp_Typ));
                    sheet.AddMergedRegion(new CellRangeAddress(nStep - cg.Count, nStep - 1, 11 + nEqp_Typ, 11 + nEqp_Typ));
                    //每个航次完毕，增加一个合计 

                    row = row = sheet.CreateRow(nStep);
                    row.CreateCell(0).SetCellValue("");
                    row.CreateCell(1).SetCellValue("");
                    row.CreateCell(2).SetCellValue("合计");
                    row.CreateCell(3).SetCellValue(total_cargo_pick_number);
                    row.CreateCell(4).SetCellValue(total_cntr_gorss_wgt);
                    row.CreateCell(5).SetCellValue(total_cargo_bluk);
                    row.CreateCell(6).SetCellValue("");
                    row.CreateCell(7).SetCellValue("");
                    row.CreateCell(8).SetCellValue(""); 
                    for (int n = 0; n < nEqp_Typ; n++)
                    {
                        row.CreateCell(9 + n).SetCellValue("");
                    }
                    row.CreateCell(9 + nEqp_Typ).SetCellValue("十位代码:" + cg.Customs_ship_no);
                    row.CreateCell(10 + nEqp_Typ).SetCellValue("");
                    row.CreateCell(11 + nEqp_Typ).SetCellValue("");
                    sheet.AddMergedRegion(new CellRangeAddress(nStep, nStep, 9 + nEqp_Typ, 11 + nEqp_Typ));
                    cells = row.Cells;  
                    cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                    {
                        c.CellStyle = ts_title;
                    });
                    nStep += 1;
                }

                #endregion
                #endregion


                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    hssfworkbook.Write(ms);
                    ms.Flush(); 

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    hssfworkbook.Close();
                    ms.Close();
                }
                //将流写入

                //ms.Dispose();

                #endregion


            }
            catch (Exception e)
            {

                throw e;
            }
        }

        #endregion

        #region 下载  外贸出口重箱申报清单清单
        private void download_order_cntr_schedule_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                #region 数据处理
                string file_nam = "无提单号 预配清单.xls"; ;

                //  箱型列表
                List<string> lst_eqp_typ = new List<string>();

                List<cls_order_cntr> lst_cntr = new List<cls_order_cntr>();
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                bll_order bll = new bll_order();
                string json = bll.get_order_cntr_data(od_seq);
                JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
                if (data_item["rows"] != null)
                {

                    JArray ja_data = (JArray)data_item["rows"];
                    if (ja_data.Count > 0)
                    {
                        for (int i = 0; i < ja_data.Count; i++)
                        {
                            lst_cntr.Add(new cls_order_cntr(ja_data[i]["cntr_no"].ToString()
                            , ja_data[i]["eqp_siz"].ToString() + ja_data[i]["eqp_typ"].ToString()
                            , ja_data[i]["seal_no"].ToString()
                            , ja_data[i]["bill_no"].ToString().Trim()
                            , ja_data[i]["cargo_net_wgt"].ToString()
                            , ja_data[i]["cargo_pick_number"].ToString()
                            , ja_data[i]["cargo_bluk"].ToString()
                            , ja_data[i]["opr_cod"].ToString()
                            , ja_data[i]["customs_seal_no"].ToString()
                            , ja_data[i]["customs_voyage_no"].ToString()
                            , ja_data[i]["customs_ship_desc"].ToString()
                            , ja_data[i]["customs_hs_cod"].ToString()
                            , ja_data[i]["customs_load_port"].ToString()
                            , ja_data[i]["customs_disc_port"].ToString()
                            , ja_data[i]["cargo_goods_desc"].ToString()
                            , ja_data[i]["customs_ship_no"].ToString()
                            , ja_data[i]["cntr_gross_wgt"].ToString()
                            , -1
                                //序号要先设置为 -1
                                //, ja_data[i]["cntr_order_by_id"].ToString()
                            , ja_data[i]["cargo_agent_desc"].ToString()
                            , ja_data[i]["cntr_pin_flag"].ToString().Length == 0 ? 0 : Convert.ToInt32(ja_data[i]["cntr_pin_flag"].ToString())
                            ));
                        }

                    }

                    #region 找出所有提单号 创建文件名
                    string bill_nos = string.Empty;

                    foreach (cls_order_cntr kvp in lst_cntr)
                    {

                        string bill_no = string.Empty;

                        if (kvp.Bill_no.Length == 0)
                        {
                            bill_no = "NONE";
                        }
                        else
                        {
                            bill_no = kvp.Bill_no;
                        }
                        if (bill_nos.Equals(string.Empty))
                        {
                            bill_nos = bill_no;
                        }
                        else
                        {
                            if (bill_nos.IndexOf(bill_no) == -1)
                            {
                                bill_nos = bill_nos + " " + bill_no;
                            }
                        }

                    }

                    if (bill_nos.Length == 0)
                    {
                        file_nam = "无提单号 预配清单.xls";
                    }
                    else
                    {
                        file_nam = bill_nos + " 预配清单.xls";
                    }

                    #endregion
                    
                    
                }
                #endregion

                string sheetName = "Sheet1";
                HSSFWorkbook hssfworkbook = new HSSFWorkbook();
                //创建工作表
                HSSFSheet sheet = hssfworkbook.CreateSheet(sheetName) as HSSFSheet;

                #region 宽度
                //设置excel列宽
                sheet.SetColumnWidth(0, (int)((13 + 0.72) * 256));
                sheet.SetColumnWidth(1, (int)((30 + 0.72) * 256));
                sheet.SetColumnWidth(2, (int)((25 + 0.72) * 256));
                sheet.SetColumnWidth(3, (int)((15 + 0.72) * 256));
                sheet.SetColumnWidth(4, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(5, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(6, (int)((10 + 0.72) * 256));
                sheet.SetColumnWidth(7, (int)((21 + 0.72) * 256));
                sheet.SetColumnWidth(8, (int)((15 + 0.72) * 256)); 
                sheet.SetColumnWidth(9 , (int)((6 + 0.72) * 256)); 
                sheet.SetColumnWidth(10, (int)((20 + 0.72) * 256));
                sheet.SetColumnWidth(11, (int)((15 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((15 + 0.72) * 256));

                #endregion

                #region 字体样式
                //（头部标题）合并的单元格样式
                HSSFCellStyle ts_normal = hssfworkbook.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_normal.Alignment = HorizontalAlignment.Center;
                ts_normal.VerticalAlignment = VerticalAlignment.Center;
                HSSFFont font_normal;
                font_normal = hssfworkbook.CreateFont() as HSSFFont;
                //font.IsBold = true;//加粗
                font_normal.FontName = "宋体";
                font_normal.FontHeightInPoints = (short)12;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_normal.SetFont(font_normal);
                ts_normal.WrapText = true;
                ts_normal.BorderBottom = BorderStyle.Thin;
                ts_normal.BorderLeft = BorderStyle.Thin;
                ts_normal.BorderRight = BorderStyle.Thin;
                ts_normal.BorderTop = BorderStyle.Thin;
                //单元格样式
                HSSFCellStyle ts_title = hssfworkbook.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_title.Alignment = HorizontalAlignment.Center;
                ts_title.VerticalAlignment = VerticalAlignment.Center;
                HSSFFont font_title;
                font_title = hssfworkbook.CreateFont() as HSSFFont;
                font_title.IsBold = true;//加粗
                font_title.FontName = "宋体";
                font_title.FontHeightInPoints = (short)12;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_title.SetFont(font_title);
                ts_title.BorderBottom = BorderStyle.Thin;
                ts_title.BorderLeft = BorderStyle.Thin;
                ts_title.BorderRight = BorderStyle.Thin;
                ts_title.BorderTop = BorderStyle.Thin;

                HSSFCellStyle ts_title2 = hssfworkbook.CreateCellStyle() as HSSFCellStyle;
                //垂直居中
                ts_title2.Alignment = HorizontalAlignment.Left;
                ts_title2.VerticalAlignment = VerticalAlignment.Center;
                //font.Color = HSSFColor.BrightGreen.Index;//字体颜色
                ts_title2.SetFont(font_title);
                ts_title2.BorderBottom = BorderStyle.Thin;
                ts_title2.BorderLeft = BorderStyle.Thin;
                ts_title2.BorderRight = BorderStyle.Thin;
                ts_title2.BorderTop = BorderStyle.Thin;

                //标记颜色 
                HSSFCellStyle ts_yellow = hssfworkbook.CreateCellStyle() as HSSFCellStyle;
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

                #region 标题和表头
                IRow row = sheet.CreateRow(0);
                row.CreateCell(0).SetCellValue("出口重箱申报清单");
                row.GetCell(0).CellStyle = ts_title;
                // 合并单元格：参数：起始行, 终止行, 起始列, 终止列 
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 0, 12));
                //注意：边框样式需要重新设置一下 
                row = sheet.CreateRow(1);
                row.CreateCell(0).SetCellValue("委托人公司名：武汉新尚东");
                row.GetCell(0).CellStyle = ts_title2;
                sheet.AddMergedRegion(new CellRangeAddress(1, 1, 0, 12)); 
                row = sheet.CreateRow(2);
                row.CreateCell(0).SetCellValue("商检注册号");
                row.CreateCell(1).SetCellValue("发货人");
                row.CreateCell(2).SetCellValue("商品名称");
                row.CreateCell(3).SetCellValue("HS CODE");
                row.CreateCell(4).SetCellValue("件数PKGS");
                row.CreateCell(5).SetCellValue("毛重KGS");
                row.CreateCell(6).SetCellValue("体积CBM");
                row.CreateCell(7).SetCellValue("提单号");
                row.CreateCell(8).SetCellValue("CTN NO");
                row.CreateCell(9).SetCellValue("箱型"); 
                row.CreateCell(10).SetCellValue("船名航次");
                row.CreateCell(11).SetCellValue("存放地");
                row.CreateCell(12).SetCellValue("目的港");

                List<NPOI.SS.UserModel.ICell> cells = row.Cells;

                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                #endregion

                #region 数据

                /*
                *  数据分组原则 : 
                *  customs_ship_no/customs_ship_desc/customs_voyage_no/customs_load_port/customs_disc_port第一层 
                *  bill_no / 货物名 第二层
               
                */
                //第一层 船信息归类
                #region 分层解析

                List<cls_order_cntr_group> lst_cntr_group = new List<cls_order_cntr_group>();

                foreach (cls_order_cntr kvp in lst_cntr)
                {
                    bool has = false;
                    foreach (cls_order_cntr_group cg in lst_cntr_group)
                    {
                        if (kvp.Customs_ship_no == cg.Customs_ship_no &&
                            kvp.Customs_ship_desc == cg.Customs_ship_desc &&
                            kvp.Customs_voyage_no == cg.Customs_voyage_no &&
                            kvp.Customs_disc_port == cg.Customs_disc_port &&
                            kvp.Customs_load_port == cg.Customs_load_port)
                        {
                            has = true; 
                            cg.Count += 1; 
                            bool has_sub = false;

                            foreach (cls_order_cntr_group_sub2 cgs in cg.Lst_group_sub2)
                            {
                                if (kvp.Cargo_agent_desc == cgs.Cargo_agent_desc)
                                {
                                    has_sub = true;
                                    cgs.Count += 1;

                                    bool has_sub3 = false;
                                    foreach(cls_order_cntr_group_sub3 cgs3 in cgs.Lst_sub3)
                                    {
                                        if (kvp.Cntr_no == cgs3.Cntr_no)
                                        {
                                            has_sub3 = true;
                                            cgs3.Count += 1;
                                        }
                                    }

                                    if (!has_sub3)
                                    {
                                        cls_order_cntr_group_sub3 new_cgs3 = new cls_order_cntr_group_sub3(kvp.Cntr_no);

                                        cgs.Lst_sub3.Add(new_cgs3);
                                    }

                                }
                            }

                            if (!has_sub)
                            {
                                cls_order_cntr_group_sub2 new_cgs = new cls_order_cntr_group_sub2(kvp.Cargo_agent_desc);
                                cls_order_cntr_group_sub3 new_cgs3 = new cls_order_cntr_group_sub3(kvp.Cntr_no);

                                new_cgs.Lst_sub3.Add(new_cgs3);

                                cg.Lst_group_sub2.Add(new_cgs);
                            }

                        }
                    }

                    if (!has)
                    {
                        cls_order_cntr_group new_cg = new cls_order_cntr_group(kvp.Customs_voyage_no,
                            kvp.Customs_ship_desc,
                            kvp.Customs_load_port,
                            kvp.Customs_disc_port,
                            kvp.Customs_ship_no); 
                        cls_order_cntr_group_sub2 new_cgs = new cls_order_cntr_group_sub2(kvp.Cargo_agent_desc);

                        cls_order_cntr_group_sub3 new_cgs3 = new cls_order_cntr_group_sub3(kvp.Cntr_no);
                        new_cgs.Lst_sub3.Add(new_cgs3);

                        new_cg.Lst_group_sub2.Add(new_cgs);

                        lst_cntr_group.Add(new_cg);
                    }
                }
                #endregion

                #region 依据层级 进行数据填写

                List<cls_order_cntr> lst_write = new List<cls_order_cntr>();

                int nStep = 3;
                foreach (cls_order_cntr_group cg in lst_cntr_group)
                {
                    double total_cargo_pick_number = 0;
                    double total_cntr_gorss_wgt = 0;
                    double total_cargo_bluk = 0;

                    foreach (cls_order_cntr_group_sub2 cgs in cg.Lst_group_sub2)
                    {
                        foreach (cls_order_cntr_group_sub3 cgs3 in cgs.Lst_sub3)
                        {  
                            #region 写数据
                            foreach (cls_order_cntr oc in lst_cntr)
                            {
                                if (oc.Cargo_agent_desc == cgs.Cargo_agent_desc
                                    && oc.Cntr_no == cgs3.Cntr_no &&
                                    oc.Customs_ship_desc == cg.Customs_ship_desc &&
                                    oc.Customs_ship_no == cg.Customs_ship_no &&
                                    oc.Customs_voyage_no == cg.Customs_voyage_no &&
                                    oc.Customs_load_port == cg.Customs_load_port &&
                                    oc.Customs_disc_port == cg.Customs_disc_port)
                                {
                                    row = sheet.CreateRow(nStep); 
                                    row.CreateCell(0).SetCellValue("");
                                    row.CreateCell(1).SetCellValue(oc.Cargo_agent_desc);
                                    row.CreateCell(2).SetCellValue(oc.Cargo_goods_desc);
                                    row.CreateCell(3).SetCellValue(oc.Customs_hs_cod);
                                    row.CreateCell(4).SetCellValue(oc.Cargo_pick_number);
                                    total_cargo_pick_number += oc.Cargo_pick_number.Length == 0 ? 0 : Convert.ToDouble(oc.Cargo_pick_number);
                                    row.CreateCell(5).SetCellValue(oc.Cntr_gross_wgt);
                                    total_cntr_gorss_wgt += oc.Cntr_gross_wgt.Length == 0 ? 0 : Convert.ToDouble(oc.Cntr_gross_wgt);
                                    row.CreateCell(6).SetCellValue(oc.Cargo_bluk);
                                    total_cargo_bluk += oc.Cargo_bluk.Length == 0 ? 0 : Convert.ToDouble(oc.Cargo_bluk);
                                    row.CreateCell(7).SetCellValue(oc.Bill_no);
                                    row.CreateCell(8).SetCellValue(oc.Cntr_no);
                                    row.CreateCell(9).SetCellValue(oc.Eqp_typ);
                                    row.CreateCell(10).SetCellValue(oc.Customs_ship_desc + "  " + oc.Customs_voyage_no);
                                    row.CreateCell(11).SetCellValue(oc.Customs_disc_port);
                                    row.CreateCell(12).SetCellValue(oc.Customs_load_port);
                                    bool has_write = false;
                                    
                                    foreach (cls_order_cntr or in lst_write)
                                    {
                                        if (or.Cntr_no == oc.Cntr_no)
                                        {
                                            has_write = true;
                                        }
                                    }

                                    //加入已写
                                    lst_write.Add(oc);
                                     
                                    cells = row.Cells;

                                    cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                                    {
                                        if (has_write && c.ColumnIndex >= 4 && c.ColumnIndex < 8)
                                        {
                                            c.CellStyle = ts_yellow;
                                        }
                                        else
                                        {
                                            c.CellStyle = ts_normal;
                                        }
                                    }); 
                                    //颜色  
                                    nStep += 1;
                                }
                            }
                            #endregion

                            sheet.AddMergedRegion(new CellRangeAddress(nStep - cgs3.Count, nStep - 1, 8, 8)); 
                        }
                        sheet.AddMergedRegion(new CellRangeAddress(nStep - cgs.Count, nStep - 1, 0, 0)); 
                        sheet.AddMergedRegion(new CellRangeAddress(nStep - cgs.Count, nStep - 1, 1, 1)); 

                    }
                    //这里就表示 船名航次已经写完了 
                    
                    sheet.AddMergedRegion(new CellRangeAddress(nStep - cg.Count, nStep - 1, 10, 10));
                    sheet.AddMergedRegion(new CellRangeAddress(nStep - cg.Count, nStep - 1, 11, 11));
                    sheet.AddMergedRegion(new CellRangeAddress(nStep - cg.Count, nStep - 1, 12, 12));
                    //每个航次完毕，增加一个合计 

                    row = row = sheet.CreateRow(nStep);
                    row.CreateCell(0).SetCellValue("");
                    row.CreateCell(1).SetCellValue("");
                    row.CreateCell(2).SetCellValue("");
                    row.CreateCell(3).SetCellValue("合计");
                    row.CreateCell(4).SetCellValue(total_cargo_pick_number);
                    row.CreateCell(5).SetCellValue(total_cntr_gorss_wgt);
                    row.CreateCell(6).SetCellValue(total_cargo_bluk);
                    row.CreateCell(7).SetCellValue("");
                    row.CreateCell(8).SetCellValue("");
                    row.CreateCell(9).SetCellValue(""); 
                    row.CreateCell(10).SetCellValue("十位代码:" + cg.Customs_ship_no);
                    row.CreateCell(11).SetCellValue("");
                    row.CreateCell(12).SetCellValue("");
                    sheet.AddMergedRegion(new CellRangeAddress(nStep, nStep, 10, 12));
                    cells = row.Cells;
                    cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                    {
                        c.CellStyle = ts_title;
                    });
                    nStep += 1;
                }

                #endregion
                #endregion


                //读取Excel表格中的第一张Sheet表

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    hssfworkbook.Write(ms);
                    ms.Flush(); 

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_nam);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    hssfworkbook.Close();
                    ms.Close();
                }
                //将流写入

                //ms.Dispose();

                #endregion


            }
            catch (Exception e)
            {

                throw e;
            }
        }

        #endregion

        #region 获取 单个 集装箱装箱图片信息
        public void get_order_cntr_file_info_by_cntr_id(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string cntr_id = req.Params["cntr_id"] == null ? string.Empty : req.Params["cntr_id"].ToString();
                bll_order bll = new bll_order();

                string json = bll.get_order_cntr_file_info_by_cntr_id(od_seq, cntr_id);
                res.Write(json); 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 莫名其妙的一些附加信息获取
        public void get_cargo_addtion_info(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();

                bll_order bll = new bll_order();

                string json = bll.get_cargo_addtion_info(od_seq);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 整体打包 所有内容 
        public void get_order_single_full_collections(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string u_id = Session["u_id"].ToString();

                bll_order bll = new bll_order();

                string json = bll.get_order_single_full_collections(od_seq, u_id);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void download_single_full_collections(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string u_id = Session["u_id"].ToString();

                bll_order bll = new bll_order();

                JObject jo = bll.download_single_full_collections(od_seq, u_id);

                JObject jbase = (Newtonsoft.Json.Linq.JObject)jo["order_base_info_and_cargo_info"][0];

                JObject jrec = (Newtonsoft.Json.Linq.JObject)jo["order_rec_fee_list"];
                JObject jpay = (Newtonsoft.Json.Linq.JObject)jo["order_pay_fee_list"];

                string file_name = "委托" + jbase["od_no"].ToString() + "简报.xlsx";


                #region  创建表格
                string sheetName = jbase["od_no"].ToString();

                IWorkbook wk = new HSSFWorkbook();
                ISheet sheet = wk.CreateSheet(sheetName) as HSSFSheet;

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
                sheet.SetColumnWidth(11, (int)((8 + 0.72) * 256));
                sheet.SetColumnWidth(12, (int)((8 + 0.72) * 256)); 
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

                HSSFCellStyle ts_title  = wk.CreateCellStyle() as HSSFCellStyle;
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

                #endregion

                #region 第一行写公司名称 

                int ind_row = 0;

                row = sheet.CreateRow(ind_row); 
                //其他行赋值为 ""
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue(jbase["od_record_by_company_desc"].ToString());
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 12));
                //赋值样式 
                List<NPOI.SS.UserModel.ICell> cells = row.Cells;
                
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });
                ind_row++;
                //第二行 
                row = sheet.CreateRow(ind_row);
                //其他行赋值为 ""
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("委托简报");
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 12));
                cells = row.Cells;
                //赋值样式   
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title_top;
                });

                ind_row++;
                //第三行 
                //合并 1,2 做标题 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("委托人:");
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                row.GetCell(2).SetCellValue(jbase["od_delegate_cu_desc"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 5));
                row.GetCell(6).SetCellValue("业务类型:");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 6, 7));
                row.GetCell(8).SetCellValue(jbase["od_typ_desc"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 8, 12));
                //赋值样式   
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                //第s4行 
                //合并 1,2 做标题 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("货名:");
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                row.GetCell(2).SetCellValue(jbase["od_cargo_typ_desc"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 5));
                row.GetCell(6).SetCellValue("业务编号:");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 6, 7));
                row.GetCell(8).SetCellValue(jbase["od_no"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 8, 12));
                //赋值样式  
                cells = row.Cells; 
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                //第5行 
                //合并 1,2 做标题 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("起运地:");
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                row.GetCell(2).SetCellValue(jbase["od_beg_place_desc"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 5));
                row.GetCell(6).SetCellValue("业务时间:");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 6, 7));
                row.GetCell(8).SetCellValue((jbase["od_fee_dat"] == null || jbase["od_fee_dat"].ToString().Length == 0) ? "" : Convert.ToDateTime(jbase["od_fee_dat"].ToString()).ToString("yyyy年MM月dd日"));
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 8, 12));
                //赋值样式  
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;

                //第6行 
                //合并 1,2 做标题 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("目的地:");
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                row.GetCell(2).SetCellValue(jbase["od_end_place_desc"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 5));
                row.GetCell(6).SetCellValue("提单号:");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 6, 7));
                row.GetCell(8).SetCellValue(jbase["od_main_bill_no"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 8, 12));
                //赋值样式  
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                ind_row++;
                //第7行 
                //合并 1,2 做标题 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("运输条款:");
                //合并 
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 1));
                row.GetCell(2).SetCellValue(jbase["od_freight_desc"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 2, 5));
                row.GetCell(6).SetCellValue("箱量:");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 6, 7));
                row.GetCell(8).SetCellValue(jbase["od_cntr_desc"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 8, 12));
                //赋值样式  
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                #endregion 

                #region 应收
                ind_row++;
                
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("应收");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 12));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });

                ind_row++;

                row = sheet.CreateRow(ind_row); 
                row.CreateCell(0).SetCellValue("序号");
                row.CreateCell(1).SetCellValue("结算单位");
                row.CreateCell(2).SetCellValue("");
                row.CreateCell(3).SetCellValue("费项");
                row.CreateCell(4).SetCellValue("币种");
                row.CreateCell(5).SetCellValue("单价");
                row.CreateCell(6).SetCellValue("数量");
                row.CreateCell(7).SetCellValue("单位");
                row.CreateCell(8).SetCellValue("汇率");
                row.CreateCell(9).SetCellValue("金额");
                row.CreateCell(10).SetCellValue("票率");
                row.CreateCell(11).SetCellValue("已收");
                row.CreateCell(12).SetCellValue("发票号");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 1, 2));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                if (jrec != null)
                {
                    JArray ja = (Newtonsoft.Json.Linq.JArray)jrec["rows"];

                    if (ja != null)
                    {
                        ind_row++;
                        for (int i = 0; i < ja.Count; i++)
                        {
                            
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue(ja[i]["fee_cu_desc"].ToString());
                            row.CreateCell(2).SetCellValue("");
                            row.CreateCell(3).SetCellValue(ja[i]["fee_item_typ_desc"].ToString());
                            row.CreateCell(4).SetCellValue(ja[i]["fee_currency_desc"].ToString());

                            row.CreateCell(5).SetCellValue(double.Parse((ja[i]["fee_price"] ?? "").ToString()));
                            row.CreateCell(6).SetCellValue(double.Parse((ja[i]["fee_number"] ?? "").ToString()));
                            row.CreateCell(7).SetCellValue(ja[i]["fee_unit_desc"].ToString());
                            row.CreateCell(8).SetCellValue(double.Parse((ja[i]["fee_currency_rate"] ?? "").ToString()));
                            row.CreateCell(9).SetCellValue(double.Parse((ja[i]["fee_amount"] ?? "").ToString()));
                            row.CreateCell(10).SetCellValue(ja[i]["fee_invoice_typ_desc"].ToString());
                            row.CreateCell(11).SetCellValue(double.Parse((ja[i]["woa_total_amount"] ?? "").ToString()));
                            row.CreateCell(12).SetCellValue(ja[i]["od_invoice_no"].ToString());

                            sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 1, 2));
                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });
                            row.GetCell(5).CellStyle = ts_normal_double;
                            row.GetCell(6).CellStyle = ts_normal_double;
                            row.GetCell(8).CellStyle = ts_normal_double4;
                            row.GetCell(9).CellStyle = ts_normal_double;
                            row.GetCell(11).CellStyle = ts_normal_double;

                            ind_row++;
                        }
                    } 
                    row = sheet.CreateRow(ind_row);
                    for (int i = 0; i < 13; i++)
                    {
                        row.CreateCell(i).SetCellValue("");
                    }

                    string[] tst = jrec["group_fee_desc"].ToString().Split(';');

                    string tss = "应收:" + tst[0] + "实收:" + tst[1] + "未收:" + tst[2];


                    row.GetCell(0).SetCellValue(tss);
                    sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 12));
                    cells = row.Cells;
                    cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                    {
                        c.CellStyle = ts_bold;
                    });
                }


                #endregion 

                #region 应付
                ind_row++; 
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("应付");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 12));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });

                ind_row++;

                row = sheet.CreateRow(ind_row);
                row.CreateCell(0).SetCellValue("序号");
                row.CreateCell(1).SetCellValue("结算单位");
                row.CreateCell(2).SetCellValue("");
                row.CreateCell(3).SetCellValue("费项");
                row.CreateCell(4).SetCellValue("币种");
                row.CreateCell(5).SetCellValue("单价");
                row.CreateCell(6).SetCellValue("数量");
                row.CreateCell(7).SetCellValue("单位");
                row.CreateCell(8).SetCellValue("汇率");
                row.CreateCell(9).SetCellValue("金额");
                row.CreateCell(10).SetCellValue("票率");
                row.CreateCell(11).SetCellValue("已付");
                row.CreateCell(12).SetCellValue("发票号");
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 1, 2));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_title;
                });
                if (jpay != null)
                {
                    JArray ja = (Newtonsoft.Json.Linq.JArray)jpay["rows"];

                    if (ja != null)
                    {
                        ind_row++;
                        for (int i = 0; i < ja.Count; i++)
                        {
                             
                            row = sheet.CreateRow(ind_row);
                            row.CreateCell(0).SetCellValue((i + 1).ToString());
                            row.CreateCell(1).SetCellValue(ja[i]["fee_cu_desc"].ToString());
                            row.CreateCell(2).SetCellValue("");
                            row.CreateCell(3).SetCellValue(ja[i]["fee_item_typ_desc"].ToString());
                            row.CreateCell(4).SetCellValue(ja[i]["fee_currency_desc"].ToString());
                            row.CreateCell(5).SetCellValue(double.Parse((ja[i]["fee_price"] ?? "").ToString()));
                            row.CreateCell(6).SetCellValue(double.Parse((ja[i]["fee_number"] ?? "").ToString()));
                            row.CreateCell(7).SetCellValue(ja[i]["fee_unit_desc"].ToString());
                            row.CreateCell(8).SetCellValue(double.Parse((ja[i]["fee_currency_rate"] ?? "").ToString()));
                            row.CreateCell(9).SetCellValue(double.Parse((ja[i]["fee_amount"] ?? "").ToString()));
                            row.CreateCell(10).SetCellValue(ja[i]["fee_invoice_typ_desc"].ToString());
                            row.CreateCell(11).SetCellValue(double.Parse((ja[i]["woa_total_amount"] ?? "").ToString()));
                            row.CreateCell(12).SetCellValue(ja[i]["od_invoice_no"].ToString());

                            sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 1, 2));
                            cells = row.Cells;
                            cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                            {
                                c.CellStyle = ts_normal;
                            });
                            row.GetCell(5).CellStyle = ts_normal_double;
                            row.GetCell(6).CellStyle = ts_normal_double;
                            row.GetCell(8).CellStyle = ts_normal_double4;
                            row.GetCell(9).CellStyle = ts_normal_double;
                            row.GetCell(11).CellStyle = ts_normal_double;
                            ind_row++;
                        }
                    } 
                    row = sheet.CreateRow(ind_row);
                    for (int i = 0; i < 13; i++)
                    {
                        row.CreateCell(i).SetCellValue("");
                    }
                    string[] tst = jpay["group_fee_desc"].ToString().Split(';');

                    string tss = "应付:" + tst[0] + "实付:" + tst[1] + "未付:" + tst[2];

                    row.GetCell(0).SetCellValue(tss);
                    sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 12));
                    cells = row.Cells;
                    cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                    {
                        c.CellStyle = ts_bold;
                    });

                } 
                #endregion

                #region 盈利
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                 
                row.GetCell(0).SetCellValue("折和利润:" + jbase["profit_total_amount_desc"].ToString() + 
                   "   折算人民币:" + jbase["profit_total_amount_of_base"].ToString() + "     毛利率:" +

                   (100 * (Decimal.Parse( jbase["profit_total_amount_of_base"].ToString()) / Decimal.Parse(jbase["rec_total_amount_of_base"].ToString()))).ToString("0.00") + "%");
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 12));
                ind_row++;
                row = sheet.CreateRow(ind_row);
                for (int i = 0; i < 13; i++)
                {
                    row.CreateCell(i).SetCellValue("");
                }
                row.GetCell(0).SetCellValue("亏损说明:" + jbase["od_profit_and_loss_bak"].ToString());
                sheet.AddMergedRegion(new CellRangeAddress(ind_row, ind_row, 0, 12));
                cells = row.Cells;
                cells.ForEach(delegate(NPOI.SS.UserModel.ICell c)
                {
                    c.CellStyle = ts_bold;
                });
                #endregion

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();

                    System.Web.HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;fileName=" + file_name);
                    System.Web.HttpContext.Current.Response.BinaryWrite(ms.ToArray());

                    wk.Close();
                    ms.Close();
                }
                #endregion
                #endregion


            }
            catch (Exception e)
            {
                throw e;
            }
        } 
        #endregion 

        #endregion 

        #region 订单统计
        #region 业务员自查
        public void get_group_details_of_operation_for_self(HttpRequest req, HttpResponse res)
        {
            try
            {

                string fee_beg_dat = req.Params["fee_beg_dat"] == null ? string.Empty : req.Params["fee_beg_dat"].ToString();
                string fee_end_dat = req.Params["fee_end_dat"] == null ? string.Empty : req.Params["fee_end_dat"].ToString();
             
                string c_id = Session["cpy_id"].ToString();
                string u_id = Session["u_id"].ToString();
                bll_order bll = new bll_order();

                string json = bll.get_group_details_of_operation(c_id,
                    u_id,
                    fee_beg_dat,
                    fee_end_dat);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

        #region 商务层以上查询
        public void get_group_details_of_operation_for_busi(HttpRequest req, HttpResponse res)
        {
            try
            {

                string fee_beg_dat = req.Params["fee_beg_dat"] == null ? string.Empty : req.Params["fee_beg_dat"].ToString();
                string fee_end_dat = req.Params["fee_end_dat"] == null ? string.Empty : req.Params["fee_end_dat"].ToString();

                string c_id = Session["cpy_id"].ToString();
                string u_id = req.Params["u_id"] == null ? string.Empty : req.Params["u_id"].ToString();
                bll_order bll = new bll_order();

                string json = bll.get_group_details_of_operation(c_id,
                    u_id,
                    fee_beg_dat,
                    fee_end_dat);
                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
        #endregion

        #endregion

        #region 订单编辑
        #region 拷贝新增 订单
        public void insert_order_by_copy(HttpRequest req, HttpResponse res)
        {
            try
            {
                string copy_od_seq = req.Params["copy_od_seq"] == null ? string.Empty : req.Params["copy_od_seq"].ToString(); 
                string od_record_by_id = Session["u_id"].ToString();
                 
                bll_order bll = new bll_order();

                string json = bll.insert_order_by_copy(copy_od_seq,
                    od_record_by_id);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增 订单
        public void insert_order(HttpRequest req, HttpResponse res)
        {
            try
            { 
                string od_project_typ = req.Params["od_project_typ"] == null ? string.Empty : req.Params["od_project_typ"].ToString();
                string od_typ = req.Params["od_typ"] == null ? string.Empty : req.Params["od_typ"].ToString();
                string od_cargo_agent_cu_id = req.Params["od_cargo_agent_cu_id"] == null ? string.Empty : req.Params["od_cargo_agent_cu_id"].ToString();
                string od_delegate_cu_id = req.Params["od_delegate_cu_id"] == null ? string.Empty : req.Params["od_delegate_cu_id"].ToString();
                string od_cargo_agent_relation_nam = req.Params["od_cargo_agent_relation_nam"] == null ? string.Empty : req.Params["od_cargo_agent_relation_nam"].ToString();
                string od_cargo_agent_relation_phone = req.Params["od_cargo_agent_relation_phone"] == null ? string.Empty : req.Params["od_cargo_agent_relation_phone"].ToString();
                string od_cargo_agent_relation_fax = req.Params["od_cargo_agent_relation_fax"] == null ? string.Empty : req.Params["od_cargo_agent_relation_fax"].ToString();
                string od_delegate_relation_nam = req.Params["od_delegate_relation_nam"] == null ? string.Empty : req.Params["od_delegate_relation_nam"].ToString();
                string od_delegate_relation_phone = req.Params["od_delegate_relation_phone"] == null ? string.Empty : req.Params["od_delegate_relation_phone"].ToString();
                string od_delegate_relation_fax = req.Params["od_delegate_relation_fax"] == null ? string.Empty : req.Params["od_delegate_relation_fax"].ToString();
                string od_record_by_id = Session["u_id"].ToString();
                string od_fee_dat = req.Params["od_fee_dat"] == null ? string.Empty : req.Params["od_fee_dat"].ToString();
                string od_operation_id = od_record_by_id;
                string od_service_id = req.Params["od_service_id"] == null ? string.Empty : req.Params["od_service_id"].ToString();
                string od_sales_id = req.Params["od_sales_id"] == null ? string.Empty : req.Params["od_sales_id"].ToString();
                string od_bak_delegate = req.Params["od_bak_delegate"] == null ? string.Empty : req.Params["od_bak_delegate"].ToString();
                string od_bak_operation = req.Params["od_bak_operation"] == null ? string.Empty : req.Params["od_bak_operation"].ToString();
                
                string od_freight_id = req.Params["od_freight_id"] == null ? string.Empty : req.Params["od_freight_id"].ToString();
                string od_record_by_company_id = Session["cpy_id"].ToString();
                string od_trade_typ_id = req.Params["od_trade_typ_id"] == null ? string.Empty : req.Params["od_trade_typ_id"].ToString();
                string od_beg_place_id = req.Params["od_beg_place_id"] == null ? string.Empty : req.Params["od_beg_place_id"].ToString();
                string od_end_place_id = req.Params["od_end_place_id"] == null ? string.Empty : req.Params["od_end_place_id"].ToString();
                string od_i_e_id = req.Params["od_i_e_id"] == null ? string.Empty : req.Params["od_i_e_id"].ToString();

                string od_box_typ_id = req.Params["od_box_typ_id"] == null ? string.Empty : req.Params["od_box_typ_id"].ToString();
                string od_cargo_typ = req.Params["od_cargo_typ"] == null ? string.Empty : req.Params["od_cargo_typ"].ToString();
                string od_cargo_bluk = req.Params["od_cargo_bluk"] == null ? string.Empty : req.Params["od_cargo_bluk"].ToString();
                string od_cargo_weight = req.Params["od_cargo_weight"] == null ? string.Empty : req.Params["od_cargo_weight"].ToString();
                string od_cargo_number = req.Params["od_cargo_number"] == null ? string.Empty : req.Params["od_cargo_number"].ToString();
                string od_cargo_packing = req.Params["od_cargo_packing"] == null ? string.Empty : req.Params["od_cargo_packing"].ToString();
                
                
                string od_take_cargo_info = req.Params["od_take_cargo_info"] == null ? string.Empty : req.Params["od_take_cargo_info"].ToString();
                string od_delivery_cargo_info = req.Params["od_delivery_cargo_info"] == null ? string.Empty : req.Params["od_delivery_cargo_info"].ToString();

                string od_po_no = req.Params["od_po_no"] == null ? string.Empty : req.Params["od_po_no"].ToString();
                string od_so_no = req.Params["od_so_no"] == null ? string.Empty : req.Params["od_so_no"].ToString();
                string od_main_bill_no = req.Params["od_main_bill_no"] == null ? string.Empty : req.Params["od_main_bill_no"].ToString();
                string od_sub_bill_no = req.Params["od_sub_bill_no"] == null ? string.Empty : req.Params["od_sub_bill_no"].ToString();
                string bk_commissioned_id = req.Params["bk_commissioned_id"] == null ? string.Empty : req.Params["bk_commissioned_id"].ToString();
                
                
                //集装箱量 
                string json_group_cntr = req.Params["json_group_cntr"] == null ? string.Empty : req.Params["json_group_cntr"].ToString();
                //合同附件
                string json_contract_file = req.Params["json_contract_file"] == null ? string.Empty : req.Params["json_contract_file"].ToString();
                //集装箱明细 
                string json_cntr_list = req.Params["json_cntr_list"] == null ? string.Empty : req.Params["json_cntr_list"].ToString();
                
                //订舱单 
                string bk_shipper_desc = req.Params["bk_shipper_desc"] == null ? string.Empty : req.Params["bk_shipper_desc"].ToString();
                string bk_consignee_desc = req.Params["bk_consignee_desc"] == null ? string.Empty : req.Params["bk_consignee_desc"].ToString();
                string bk_notify_desc = req.Params["bk_notify_desc"] == null ? string.Empty : req.Params["bk_notify_desc"].ToString();
               
                string bk_commissioned_to = req.Params["bk_commissioned_to"] == null ? string.Empty : req.Params["bk_commissioned_to"].ToString();
                string bk_commissioned_tel = req.Params["bk_commissioned_tel"] == null ? string.Empty : req.Params["bk_commissioned_tel"].ToString();
                string bk_commissioned_fax = req.Params["bk_commissioned_fax"] == null ? string.Empty : req.Params["bk_commissioned_fax"].ToString();
                //string bk_booking_number = req.Params["bk_booking_number"] == null ? string.Empty : req.Params["bk_booking_number"].ToString();
                // string bk_job_number = req.Params["bk_job_number"] == null ? string.Empty : req.Params["bk_job_number"].ToString();
                string bk_delegate_tel = req.Params["bk_delegate_tel"] == null ? string.Empty : req.Params["bk_delegate_tel"].ToString();
                string bk_delegate_fax = req.Params["bk_delegate_fax"] == null ? string.Empty : req.Params["bk_delegate_fax"].ToString();
                string bk_delegate_ctc = req.Params["bk_delegate_ctc"] == null ? string.Empty : req.Params["bk_delegate_ctc"].ToString();
                string bk_delegate_date = req.Params["bk_delegate_date"] == null ? string.Empty : req.Params["bk_delegate_date"].ToString();
                string bk_carrier_id = req.Params["bk_carrier_id"] == null ? string.Empty : req.Params["bk_carrier_id"].ToString();
                string bk_closing_date = req.Params["bk_closing_date"] == null ? string.Empty : req.Params["bk_closing_date"].ToString();
                string bk_etd = req.Params["bk_etd"] == null ? string.Empty : req.Params["bk_etd"].ToString();
                string bk_port_of_loading_id = req.Params["bk_port_of_loading_id"] == null ? string.Empty : req.Params["bk_port_of_loading_id"].ToString();
                string bk_port_of_transit_id = req.Params["bk_port_of_transit_id"] == null ? string.Empty : req.Params["bk_port_of_transit_id"].ToString();
                string bk_port_of_discharge_id = req.Params["bk_port_of_discharge_id"] == null ? string.Empty : req.Params["bk_port_of_discharge_id"].ToString();
                string bk_freight_term_id = req.Params["bk_freight_term_id"] == null ? string.Empty : req.Params["bk_freight_term_id"].ToString();
                string bk_pay_method_id = req.Params["bk_pay_method_id"] == null ? string.Empty : req.Params["bk_pay_method_id"].ToString();
                string bk_shipping_marks_and_no_desc = req.Params["bk_shipping_marks_and_no_desc"] == null ? string.Empty : req.Params["bk_shipping_marks_and_no_desc"].ToString();
                string bk_freight_package_desc = req.Params["bk_freight_package_desc"] == null ? string.Empty : req.Params["bk_freight_package_desc"].ToString();
                string bk_description_of_goods_desc = req.Params["bk_description_of_goods_desc"] == null ? string.Empty : req.Params["bk_description_of_goods_desc"].ToString();
                string bk_gross_weight = req.Params["bk_gross_weight"] == null ? string.Empty : req.Params["bk_gross_weight"].ToString();
                string bk_remarks = req.Params["bk_remarks"] == null ? string.Empty : req.Params["bk_remarks"].ToString();
                string bk_measurement = req.Params["bk_measurement"] == null ? string.Empty : req.Params["bk_measurement"].ToString();


                string od_bill_typ = req.Params["od_bill_typ"] == null ? string.Empty : req.Params["od_bill_typ"].ToString();
                string od_sign_bill_typ = req.Params["od_sign_bill_typ"] == null ? string.Empty : req.Params["od_sign_bill_typ"].ToString();
                string od_declare_customs_typ = req.Params["od_declare_customs_typ"] == null ? string.Empty : req.Params["od_declare_customs_typ"].ToString();
                string od_carriage_typ = req.Params["od_carriage_typ"] == null ? string.Empty : req.Params["od_carriage_typ"].ToString();
                string od_stuffing_container_typ = req.Params["od_stuffing_container_typ"] == null ? string.Empty : req.Params["od_stuffing_container_typ"].ToString();
                string od_stuffing_container_place = req.Params["od_stuffing_container_place"] == null ? string.Empty : req.Params["od_stuffing_container_place"].ToString();
                string od_entry_tim_of_stuffing = req.Params["od_entry_tim_of_stuffing"] == null ? string.Empty : req.Params["od_entry_tim_of_stuffing"].ToString();
                string od_out_tim_of_stuffing = req.Params["od_out_tim_of_stuffing"] == null ? string.Empty : req.Params["od_out_tim_of_stuffing"].ToString();
               

                bll_order bll = new bll_order();

                string json = bll.insert_order(od_project_typ,
                    od_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_cargo_agent_relation_nam,
                    od_cargo_agent_relation_phone,
                    od_cargo_agent_relation_fax,
                    od_delegate_relation_nam,
                    od_delegate_relation_phone,
                    od_delegate_relation_fax,
                    od_record_by_id,
                    od_fee_dat,
                    od_operation_id,
                    od_service_id,
                    od_sales_id,
                    od_bak_delegate,
                    od_bak_operation,
                    od_freight_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    od_beg_place_id,
                    od_end_place_id,
                    od_i_e_id, 
                    od_box_typ_id,
                    od_cargo_typ,
                    od_cargo_bluk,
                    od_cargo_weight,
                    od_cargo_number,
                    od_cargo_packing,
                    od_take_cargo_info,
                    od_delivery_cargo_info,
                    od_po_no,
                    od_so_no,
                    od_main_bill_no,
                    od_sub_bill_no,
                    bk_commissioned_id,

                    bk_shipper_desc,
                    bk_consignee_desc,
                    bk_notify_desc, 
                    bk_commissioned_to,
                    bk_commissioned_tel,
                    bk_commissioned_fax,
                    //bk_booking_number, 
                    bk_delegate_tel,
                    bk_delegate_fax,
                    bk_delegate_ctc,
                    bk_delegate_date,
                    bk_carrier_id,
                    bk_closing_date,
                    bk_etd,
                    bk_port_of_loading_id,
                    bk_port_of_transit_id,
                    bk_port_of_discharge_id,
                    bk_freight_term_id,
                    bk_pay_method_id,
                    bk_shipping_marks_and_no_desc,
                    bk_freight_package_desc,
                    bk_description_of_goods_desc,
                    bk_gross_weight,
                    bk_remarks,
                    bk_measurement ,
                    od_bill_typ,
                    od_sign_bill_typ,
                    od_declare_customs_typ,
                    od_carriage_typ,
                    od_stuffing_container_typ,
                    od_stuffing_container_place,
                    od_entry_tim_of_stuffing,
                    od_out_tim_of_stuffing,
                    json_group_cntr,
                    json_contract_file,
                    json_cntr_list); 

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        

        #region 通过订舱单新增订单 
         
        public void insert_order_by_order_file(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();

                string file_record_id = Session["u_id"].ToString();
                string file_nam = string.Empty;
                string file_path = string.Empty;

                string guid = System.Guid.NewGuid().ToString().Replace("-", "");
                string folder = "/upload_files/order_contract/";
                string virtual_path = string.Empty;
                HttpFileCollection files = req.Files;
                if (files == null)
                {
                    res.Write("{\"result\":0,\"msg\":\"没有找到文件\"}");
                     
                    return;
                }
 
                foreach (string key in files.Keys)
                {
                    try
                    {
                        HttpPostedFile fileData = files[key];

                        if (fileData != null)
                        {
                            file_nam = fileData.FileName;
                            file_path = System.Web.HttpContext.Current.Server.MapPath(folder) + guid + Path.GetExtension(fileData.FileName);
                            virtual_path =  folder  + guid + Path.GetExtension(fileData.FileName);
                            fileData.SaveAs(file_path);
                            //fileData.SaveAs(System.AppDomain.CurrentDomain.BaseDirectory + file_path);
                        }
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
                List<KeyValuePair<string, string>> lst = new List<KeyValuePair<string, string>>();
                lst.Add(new KeyValuePair<string, string>("file_nam", file_nam));
                lst.Add(new KeyValuePair<string, string>("file_path", virtual_path));

                //需要解析 
                #region 解析
                #region 打开Excel表格模板，并初始化到NPOI对象中
                IWorkbook wk = new HSSFWorkbook();
                string filePath = AppDomain.CurrentDomain.BaseDirectory + file_path;
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

                #region 读取 
                //读取Excel表格中的第一张Sheet表
                ISheet sheet = wk.GetSheetAt(0);
                IRow row = null;//数据行
                ICell cell = null;//数据行中的某列 
                Dictionary<string, string> dic_temp = new Dictionary<string, string>();

                int firstRowNumber = sheet.FirstRowNum;
                //需要判断 委托人的位置是否正确 
                if (sheet.LastRowNum < 16)
                {
                    res.Write("{\"result\":0,\"msg\":\"文件格式不正确\"}");

                    return;
                }



                row = sheet.GetRow(firstRowNumber + 2);

                if (row.Cells[0].StringCellValue.Trim() != "委托人：")
                {
                    res.Write("{\"result\":0,\"msg\":\"文件格式不正确\"}");

                    return;
                }

                
                //委托人 
                string od_delegate_cu_desc = row.Cells[1].StringCellValue.Trim();
                string od_delegate_cu_id = string.Empty;

                //需要进行查询 
                BLL.sys_base.base_data bd = new BLL.sys_base.base_data(); 
                bd.get_custom_by_cu_name(od_delegate_cu_desc, c_id, ref od_delegate_cu_id);


                dic_temp.Add("od_delegate_cu_desc", od_delegate_cu_desc);
                dic_temp.Add("od_delegate_cu_id", od_delegate_cu_id);
                
                //联系人 和电话 
                string relation_info = row.Cells[6].StringCellValue.Trim();

                string od_delegate_relation_nam = GetStrings(relation_info,0);
                string od_delegate_relation_phone = GetStrings(relation_info, 1);
                dic_temp.Add("od_delegate_relation_nam", od_delegate_relation_nam);
                dic_temp.Add("od_delegate_relation_phone", od_delegate_relation_phone);

                //发货信息 
                row = sheet.GetRow(firstRowNumber + 3);
                string od_take_cargo_info = row.Cells[1].StringCellValue.Trim();
                dic_temp.Add("od_take_cargo_info", od_take_cargo_info);
                //收货信息 
                row = sheet.GetRow(firstRowNumber + 4);
                string od_delivery_cargo_info = row.Cells[1].StringCellValue.Trim();
                dic_temp.Add("od_delivery_cargo_info", od_delivery_cargo_info);

                //运输条款 
                row = sheet.GetRow(firstRowNumber + 5);
                string od_freight_id = string.Empty;
                string od_freight_desc = row.Cells[1].StringCellValue.Trim();

                bd.get_frieght_by_fr_name(od_freight_desc, c_id, ref od_freight_id);
                dic_temp.Add("od_freight_desc", od_freight_desc);
                dic_temp.Add("od_freight_id", od_freight_id);

                //提单号 
                string od_main_bill_no = row.Cells[6].StringCellValue.Trim();
                dic_temp.Add("od_main_bill_no", od_main_bill_no);

                //起运地，目的地 
                row = sheet.GetRow(firstRowNumber + 6);

                string od_beg_place_id = string.Empty;
                string od_beg_place_desc = row.Cells[1].StringCellValue.Trim();

                bd.get_place_by_pl_name(od_beg_place_desc, c_id, ref od_beg_place_id);
                dic_temp.Add("od_beg_place_desc", od_beg_place_desc);
                dic_temp.Add("od_beg_place_id", od_beg_place_id);

                string od_end_place_id = string.Empty;
                string od_end_place_desc = row.Cells[6].StringCellValue.Trim();

                bd.get_place_by_pl_name(od_end_place_desc, c_id, ref od_end_place_id);
                dic_temp.Add("od_end_place_desc", od_end_place_desc);
                dic_temp.Add("od_end_place_id", od_end_place_id);

                //品名 
                row = sheet.GetRow(firstRowNumber + 7); 
                string od_cargo_typ_desc = row.Cells[1].StringCellValue.Trim();
                dic_temp.Add("od_cargo_typ_desc", od_cargo_typ_desc);
                //箱型 箱量 
                string od_cntr_group_desc = row.Cells[6].StringCellValue.Trim();
                
                if (od_cntr_group_desc.Length > 5)
                {
                    /* [,;，；/ \ | 空格] 划分种类 
                     * 
                     */
                    string[] separator = {",",";","，","：","/","\\","|"," "};
                    string[] str_types = od_cntr_group_desc.Split(separator,StringSplitOptions.RemoveEmptyEntries);

                    if (str_types.Length > 0)
                    {
                        JArray ja = new JArray();

                        foreach (string s in str_types)
                        {
                            /*
                             符号 * x X ×
                             */

                            string[] sep = { "*", "x", "X", "×" };

                            string[] tmp_arr = s.Split(sep, StringSplitOptions.RemoveEmptyEntries);

                            if (tmp_arr.Length == 2)
                            {
                                JObject jo = new JObject();
                                jo["od_group_cntr_number"] = tmp_arr[0].ToString().Trim();

                                jo["od_group_cntr_siz"] = GetStrings(tmp_arr[1].ToString().Trim(), 1);
                                jo["od_group_cntr_typ"] = GetStrings(tmp_arr[1].ToString().Trim(), 0);
                                jo["od_group_pin_flag"] = 1;
                                jo["od_group_cntr_opr_cod"] = "SOC";

                                ja.Add(jo);
                            }
                        }

                        dic_temp.Add("order_cntr_group", ja.ToString());
                    }
                    else
                    {
                        dic_temp.Add("order_cntr_group", "[]"); 
                    }

                }

                //备注
                row = sheet.GetRow(firstRowNumber + 15);
                string od_bak_delegate = row.Cells[6].StringCellValue.Trim();
                dic_temp.Add("od_bak_delegate", od_bak_delegate);

                //业务类型 
                string order_typ = string.Empty;
                bd.get_order_typ_by_ot_desc("货代业务", c_id, ref order_typ);
                dic_temp.Add("order_typ", order_typ);

                //业务时间 
                string od_fee_dat = BLL.commone.BLL_commone.get_sysdate().ToString("yyyy-MM-dd");
                dic_temp.Add("od_fee_dat", od_fee_dat);
                #endregion
                #endregion

                dic_temp.Add("result", "1");
                dic_temp.Add("file_nam", file_nam);
                dic_temp.Add("file_path", virtual_path);
                dic_temp.Add("file_seq", Guid.NewGuid().ToString());
                dic_temp.Add("file_record_id", file_record_id);
                dic_temp.Add("msg", " "); 

                res.Write(BLL.commone.BLL_commone.custom_convert_json(dic_temp.ToList())); 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        

        #endregion 

        #region 编辑订单
        public void update_order(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_project_typ = req.Params["od_project_typ"] == null ? string.Empty : req.Params["od_project_typ"].ToString();
                //string od_typ = req.Params["od_typ"] == null ? string.Empty : req.Params["od_typ"].ToString();
                string od_cargo_agent_cu_id = req.Params["od_cargo_agent_cu_id"] == null ? string.Empty : req.Params["od_cargo_agent_cu_id"].ToString();
                string od_delegate_cu_id = req.Params["od_delegate_cu_id"] == null ? string.Empty : req.Params["od_delegate_cu_id"].ToString();
                string od_cargo_agent_relation_nam = req.Params["od_cargo_agent_relation_nam"] == null ? string.Empty : req.Params["od_cargo_agent_relation_nam"].ToString();
                string od_cargo_agent_relation_phone = req.Params["od_cargo_agent_relation_phone"] == null ? string.Empty : req.Params["od_cargo_agent_relation_phone"].ToString();
                string od_cargo_agent_relation_fax = req.Params["od_cargo_agent_relation_fax"] == null ? string.Empty : req.Params["od_cargo_agent_relation_fax"].ToString();
                string od_delegate_relation_nam = req.Params["od_delegate_relation_nam"] == null ? string.Empty : req.Params["od_delegate_relation_nam"].ToString();
                string od_delegate_relation_phone = req.Params["od_delegate_relation_phone"] == null ? string.Empty : req.Params["od_delegate_relation_phone"].ToString();
                string od_delegate_relation_fax = req.Params["od_delegate_relation_fax"] == null ? string.Empty : req.Params["od_delegate_relation_fax"].ToString();
                string od_record_by_id = Session["u_id"].ToString();
                string od_fee_dat = req.Params["od_fee_dat"] == null ? string.Empty : req.Params["od_fee_dat"].ToString();
                string od_operation_id = od_record_by_id;
                string od_service_id =  req.Params["od_service_id"] == null ? string.Empty : req.Params["od_service_id"].ToString();
                string od_sales_id = req.Params["od_sales_id"] == null ? string.Empty : req.Params["od_sales_id"].ToString();
                string od_bak_delegate = req.Params["od_bak_delegate"] == null ? string.Empty : req.Params["od_bak_delegate"].ToString();
                string od_bak_operation = req.Params["od_bak_operation"] == null ? string.Empty : req.Params["od_bak_operation"].ToString();

                string od_freight_id = req.Params["od_freight_id"] == null ? string.Empty : req.Params["od_freight_id"].ToString();
                string od_record_by_company_id = Session["cpy_id"].ToString();
                string od_trade_typ_id = req.Params["od_trade_typ_id"] == null ? string.Empty : req.Params["od_trade_typ_id"].ToString();
                string od_beg_place_id = req.Params["od_beg_place_id"] == null ? string.Empty : req.Params["od_beg_place_id"].ToString();
                string od_end_place_id = req.Params["od_end_place_id"] == null ? string.Empty : req.Params["od_end_place_id"].ToString();
                string od_i_e_id = req.Params["od_i_e_id"] == null ? string.Empty : req.Params["od_i_e_id"].ToString();

                string od_box_typ_id = req.Params["od_box_typ_id"] == null ? string.Empty : req.Params["od_box_typ_id"].ToString();
                string od_cargo_typ = req.Params["od_cargo_typ"] == null ? string.Empty : req.Params["od_cargo_typ"].ToString();
                string od_cargo_bluk = req.Params["od_cargo_bluk"] == null ? string.Empty : req.Params["od_cargo_bluk"].ToString();
                string od_cargo_weight = req.Params["od_cargo_weight"] == null ? string.Empty : req.Params["od_cargo_weight"].ToString();
                string od_cargo_number = req.Params["od_cargo_number"] == null ? string.Empty : req.Params["od_cargo_number"].ToString();
                string od_cargo_packing = req.Params["od_cargo_packing"] == null ? string.Empty : req.Params["od_cargo_packing"].ToString();


                string od_take_cargo_info = req.Params["od_take_cargo_info"] == null ? string.Empty : req.Params["od_take_cargo_info"].ToString();
                string od_delivery_cargo_info = req.Params["od_delivery_cargo_info"] == null ? string.Empty : req.Params["od_delivery_cargo_info"].ToString();

                string od_po_no = req.Params["od_po_no"] == null ? string.Empty : req.Params["od_po_no"].ToString();
                string od_so_no = req.Params["od_so_no"] == null ? string.Empty : req.Params["od_so_no"].ToString();
                string od_main_bill_no = req.Params["od_main_bill_no"] == null ? string.Empty : req.Params["od_main_bill_no"].ToString();
                string od_sub_bill_no = req.Params["od_sub_bill_no"] == null ? string.Empty : req.Params["od_sub_bill_no"].ToString();

                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string bk_commissioned_id = req.Params["bk_commissioned_id"] == null ? string.Empty : req.Params["bk_commissioned_id"].ToString();
                //集装箱量 
                string json_group_cntr = req.Params["json_group_cntr"] == null ? string.Empty : req.Params["json_group_cntr"].ToString();
                //合同附件
                string json_contract_file = req.Params["json_contract_file"] == null ? string.Empty : req.Params["json_contract_file"].ToString();
                //集装箱明细 
                string json_cntr_list = req.Params["json_cntr_list"] == null ? string.Empty : req.Params["json_cntr_list"].ToString();

                //订舱单 
                string bk_shipper_desc = req.Params["bk_shipper_desc"] == null ? string.Empty : req.Params["bk_shipper_desc"].ToString();
                string bk_consignee_desc = req.Params["bk_consignee_desc"] == null ? string.Empty : req.Params["bk_consignee_desc"].ToString();
                string bk_notify_desc = req.Params["bk_notify_desc"] == null ? string.Empty : req.Params["bk_notify_desc"].ToString();

                string bk_commissioned_to = req.Params["bk_commissioned_to"] == null ? string.Empty : req.Params["bk_commissioned_to"].ToString();
                string bk_commissioned_tel = req.Params["bk_commissioned_tel"] == null ? string.Empty : req.Params["bk_commissioned_tel"].ToString();
                string bk_commissioned_fax = req.Params["bk_commissioned_fax"] == null ? string.Empty : req.Params["bk_commissioned_fax"].ToString();
                //string bk_booking_number = req.Params["bk_booking_number"] == null ? string.Empty : req.Params["bk_booking_number"].ToString();
                // string bk_job_number = req.Params["bk_job_number"] == null ? string.Empty : req.Params["bk_job_number"].ToString();
                string bk_delegate_tel = req.Params["bk_delegate_tel"] == null ? string.Empty : req.Params["bk_delegate_tel"].ToString();
                string bk_delegate_fax = req.Params["bk_delegate_fax"] == null ? string.Empty : req.Params["bk_delegate_fax"].ToString();
                string bk_delegate_ctc = req.Params["bk_delegate_ctc"] == null ? string.Empty : req.Params["bk_delegate_ctc"].ToString();
                string bk_delegate_date = req.Params["bk_delegate_date"] == null ? string.Empty : req.Params["bk_delegate_date"].ToString();
                string bk_carrier_id = req.Params["bk_carrier_id"] == null ? string.Empty : req.Params["bk_carrier_id"].ToString();
                string bk_closing_date = req.Params["bk_closing_date"] == null ? string.Empty : req.Params["bk_closing_date"].ToString();
                string bk_etd = req.Params["bk_etd"] == null ? string.Empty : req.Params["bk_etd"].ToString();
                string bk_port_of_loading_id = req.Params["bk_port_of_loading_id"] == null ? string.Empty : req.Params["bk_port_of_loading_id"].ToString();
                string bk_port_of_transit_id = req.Params["bk_port_of_transit_id"] == null ? string.Empty : req.Params["bk_port_of_transit_id"].ToString();
                string bk_port_of_discharge_id = req.Params["bk_port_of_discharge_id"] == null ? string.Empty : req.Params["bk_port_of_discharge_id"].ToString();
                string bk_freight_term_id = req.Params["bk_freight_term_id"] == null ? string.Empty : req.Params["bk_freight_term_id"].ToString();
                string bk_pay_method_id = req.Params["bk_pay_method_id"] == null ? string.Empty : req.Params["bk_pay_method_id"].ToString();
                string bk_shipping_marks_and_no_desc = req.Params["bk_shipping_marks_and_no_desc"] == null ? string.Empty : req.Params["bk_shipping_marks_and_no_desc"].ToString();
                string bk_freight_package_desc = req.Params["bk_freight_package_desc"] == null ? string.Empty : req.Params["bk_freight_package_desc"].ToString();
                string bk_description_of_goods_desc = req.Params["bk_description_of_goods_desc"] == null ? string.Empty : req.Params["bk_description_of_goods_desc"].ToString();
                string bk_gross_weight = req.Params["bk_gross_weight"] == null ? string.Empty : req.Params["bk_gross_weight"].ToString();
                string bk_remarks = req.Params["bk_remarks"] == null ? string.Empty : req.Params["bk_remarks"].ToString();
                string bk_measurement = req.Params["bk_measurement"] == null ? string.Empty : req.Params["bk_measurement"].ToString();

                 
                string od_bill_typ = req.Params["od_bill_typ"] == null ? string.Empty : req.Params["od_bill_typ"].ToString();
                string od_sign_bill_typ = req.Params["od_sign_bill_typ"] == null ? string.Empty : req.Params["od_sign_bill_typ"].ToString();
                string od_declare_customs_typ = req.Params["od_declare_customs_typ"] == null ? string.Empty : req.Params["od_declare_customs_typ"].ToString();
                string od_carriage_typ = req.Params["od_carriage_typ"] == null ? string.Empty : req.Params["od_carriage_typ"].ToString();
                string od_stuffing_container_typ = req.Params["od_stuffing_container_typ"] == null ? string.Empty : req.Params["od_stuffing_container_typ"].ToString();
                string od_stuffing_container_place = req.Params["od_stuffing_container_place"] == null ? string.Empty : req.Params["od_stuffing_container_place"].ToString();
                string od_entry_tim_of_stuffing = req.Params["od_entry_tim_of_stuffing"] == null ? string.Empty : req.Params["od_entry_tim_of_stuffing"].ToString();
                string od_out_tim_of_stuffing = req.Params["od_out_tim_of_stuffing"] == null ? string.Empty : req.Params["od_out_tim_of_stuffing"].ToString();
               

                bll_order bll = new bll_order();

                string json = bll.update_order(od_seq,
                    od_project_typ,
                    // od_typ,
                    od_cargo_agent_cu_id,
                    od_delegate_cu_id,
                    od_cargo_agent_relation_nam,
                    od_cargo_agent_relation_phone,
                    od_cargo_agent_relation_fax,
                    od_delegate_relation_nam,
                    od_delegate_relation_phone,
                    od_delegate_relation_fax,
                    od_record_by_id,
                    od_fee_dat,
                    od_operation_id,
                    od_service_id,
                    od_sales_id,
                    od_bak_delegate,
                    od_bak_operation,
                    od_freight_id,
                    od_record_by_company_id,
                    od_trade_typ_id,
                    od_beg_place_id,
                    od_end_place_id,
                    od_i_e_id,
                    od_box_typ_id,
                    od_cargo_typ,
                    od_cargo_bluk,
                    od_cargo_weight,
                    od_cargo_number,
                    od_cargo_packing,
                    od_take_cargo_info,
                    od_delivery_cargo_info,
                    od_po_no,
                    od_so_no,
                    od_main_bill_no,
                    od_sub_bill_no,
                    bk_commissioned_id,
                    bk_shipper_desc,
                    bk_consignee_desc,
                    bk_notify_desc,
                    bk_commissioned_to,
                    bk_commissioned_tel,
                    bk_commissioned_fax,
                    //bk_booking_number, 
                    bk_delegate_tel,
                    bk_delegate_fax,
                    bk_delegate_ctc,
                    bk_delegate_date,
                    bk_carrier_id,
                    bk_closing_date,
                    bk_etd,
                    bk_port_of_loading_id,
                    bk_port_of_transit_id,
                    bk_port_of_discharge_id,
                    bk_freight_term_id,
                    bk_pay_method_id,
                    bk_shipping_marks_and_no_desc,
                    bk_freight_package_desc,
                    bk_description_of_goods_desc,
                    bk_gross_weight,
                    bk_remarks,
                    bk_measurement,
                    od_bill_typ,
                        od_sign_bill_typ,
                        od_declare_customs_typ,
                        od_carriage_typ,
                        od_stuffing_container_typ,
                        od_stuffing_container_place,
                        od_entry_tim_of_stuffing,
                        od_out_tim_of_stuffing,
                    json_group_cntr,
                    json_contract_file,
                    json_cntr_list);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 集装箱量 
        public void delete_cntr_group(HttpRequest req, HttpResponse res)
        {
            try
            {  
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_group_cntr_seqs = req.Params["od_group_cntr_seqs"] == null ? string.Empty : req.Params["od_group_cntr_seqs"].ToString();
                 
                bll_order bll = new bll_order();

                string json = bll.delete_cntr_group(od_seq,
                    od_group_cntr_seqs);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        } 
        #endregion

         

        #region 新增 订单集装箱
        public void insert_order_cntr(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string json_order_cntr = req.Params["json_order_cntr"] == null ? string.Empty : req.Params["json_order_cntr"].ToString();
                
                bll_order bll = new bll_order();

                string json = bll.insert_order_cntr(od_seq,
                    json_order_cntr);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 订单集装箱
        public void delete_order_cntr(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string cntr_id = req.Params["cntr_id"] == null ? string.Empty : req.Params["cntr_id"].ToString();

                bll_order bll = new bll_order();

                string json = bll.delete_order_cntr(od_seq,
                    cntr_id);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 

    
         
        #region 删除 订单
        public void delete_order(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                
                bll_order bll = new bll_order();

                string json = bll.delete_order(od_seq);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 锁定 订单
        public void lock_order(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_operation_lock_id = Session["u_id"].ToString();

                string ap_u_id = req.Params["ap_u_id"] == null ? string.Empty : req.Params["ap_u_id"].ToString();
                string ap_order_by_id = req.Params["ap_order_by_id"] == null ? string.Empty : req.Params["ap_order_by_id"].ToString();
                string ap_aps_id = req.Params["ap_aps_id"] == null ? string.Empty : req.Params["ap_aps_id"].ToString();

                bll_order bll = new bll_order(); 
                string json = bll.lock_order(od_seq, od_operation_lock_id, ap_u_id, ap_order_by_id, ap_aps_id);



                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增服务商
        public void insert_service(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_service_cu_id = req.Params["od_service_cu_id"] == null ? string.Empty : req.Params["od_service_cu_id"].ToString();

                bll_order bll = new bll_order();

                string json = bll.insert_service(od_seq,
                    od_service_cu_id
                    );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除 服务商
        public void delete_service(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_service_seq = req.Params["od_service_seq"] == null ? string.Empty : req.Params["od_service_seq"].ToString();

                bll_order bll = new bll_order();

                string json = bll.delete_service(od_seq,
                    od_service_seq
                    );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 新增服务商 批次
        public void insert_service_sub(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_service_seq = req.Params["od_service_seq"] == null ? string.Empty : req.Params["od_service_seq"].ToString();

                bll_order bll = new bll_order();

                string json = bll.insert_service_sub(od_seq,
                    od_service_seq
                    );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 删除服务商 批次
        public void delete_service_sub(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_service_seq = req.Params["od_service_seq"] == null ? string.Empty : req.Params["od_service_seq"].ToString();
                string od_service_sub_seq = req.Params["od_service_sub_seq"] == null ? string.Empty : req.Params["od_service_sub_seq"].ToString();
                bll_order bll = new bll_order();

                string json = bll.delete_service_sub(od_seq,
                    od_service_seq,
                    od_service_sub_seq
                    );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 更新服务商 批次
        public void update_service_sub(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_service_seq = req.Params["od_service_seq"] == null ? string.Empty : req.Params["od_service_seq"].ToString();
                string od_service_sub_seq = req.Params["od_service_sub_seq"] == null ? string.Empty : req.Params["od_service_sub_seq"].ToString();
                string od_service_sub_weight = req.Params["od_service_sub_weight"] == null ? "0" : req.Params["od_service_sub_weight"].ToString();
                string od_service_sub_bluk = req.Params["od_service_sub_bluk"] == null ? "0" : req.Params["od_service_sub_bluk"].ToString();
                string od_service_sub_number = req.Params["od_service_sub_number"] == null ? "0" : req.Params["od_service_sub_number"].ToString();
                string od_service_sub_bak = req.Params["od_service_sub_bak"] == null ? string.Empty : req.Params["od_service_sub_bak"].ToString();

                string data_route = req.Params["data_route"] == null ? string.Empty : req.Params["data_route"].ToString();
                string data_group_cntr = req.Params["data_group_cntr"] == null ? string.Empty : req.Params["data_group_cntr"].ToString();
                string data_cntr = req.Params["data_cntr"] == null ? string.Empty : req.Params["data_cntr"].ToString();
                string data_fee = req.Params["data_fee"] == null ? string.Empty : req.Params["data_fee"].ToString();
                string record_by_id = Session["u_id"].ToString();
                 
                bll_order bll = new bll_order();

                string json = bll.update_service_sub(od_seq,
                    od_service_seq,
                    od_service_sub_seq,
                    od_service_sub_weight,
                    od_service_sub_bluk,
                    od_service_sub_number,
                    od_service_sub_bak,
                    data_route,
                    data_group_cntr,
                    data_cntr,
                    data_fee,
                    record_by_id
                    );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 判断是否可以删除 服务批次的费用
        public void judge_delete_order_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string fee_seq = req.Params["fee_seq"] == null ? string.Empty : req.Params["fee_seq"].ToString();
                bll_order bll = new bll_order();
                string json = bll.judge_delete_order_fee(od_seq, fee_seq);

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        #endregion 

        #region 更新 费用
        public void update_order_fee_of_rec(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
               
                string data_fee = req.Params["data_fee"] == null ? string.Empty : req.Params["data_fee"].ToString();
                string record_by_id = Session["u_id"].ToString();
                string od_profit_and_loss_bak = req.Params["od_profit_and_loss_bak"] == null ? string.Empty : req.Params["od_profit_and_loss_bak"].ToString();
                bll_order bll = new bll_order();

                string json = bll.update_order_fee_of_rec(od_seq, 
                    data_fee,
                    od_profit_and_loss_bak,
                    record_by_id
                    );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 编辑订单 附件 运单和装箱信息
        public void update_order_addition_infos(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_bill_typ = req.Params["od_bill_typ"] == null ? string.Empty : req.Params["od_bill_typ"].ToString();
                string od_sign_bill_typ = req.Params["od_sign_bill_typ"] == null ? string.Empty : req.Params["od_sign_bill_typ"].ToString();
                string od_declare_customs_typ = req.Params["od_declare_customs_typ"] == null ? string.Empty : req.Params["od_declare_customs_typ"].ToString();
                string od_carriage_typ = req.Params["od_carriage_typ"] == null ? string.Empty : req.Params["od_carriage_typ"].ToString();
                string od_stuffing_container_typ = req.Params["od_stuffing_container_typ"] == null ? string.Empty : req.Params["od_stuffing_container_typ"].ToString();
                string od_stuffing_container_place = req.Params["od_stuffing_container_place"] == null ? string.Empty : req.Params["od_stuffing_container_place"].ToString();
                string od_entry_tim_of_stuffing = req.Params["od_entry_tim_of_stuffing"] == null ? string.Empty : req.Params["od_entry_tim_of_stuffing"].ToString();
                string od_out_tim_of_stuffing = req.Params["od_out_tim_of_stuffing"] == null ? string.Empty : req.Params["od_out_tim_of_stuffing"].ToString();
               
                bll_order bll = new bll_order();

                string json = bll.update_order_addition_infos(od_seq,
                    od_bill_typ,
                    od_sign_bill_typ,
                    od_declare_customs_typ,
                    od_carriage_typ,
                    od_stuffing_container_typ,
                    od_stuffing_container_place,
                    od_entry_tim_of_stuffing,
                    od_out_tim_of_stuffing
                    );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #region 集装箱 装箱信息
        #region 增加 装箱图片
        public void insert_order_cntr_file(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string cntr_id = req.Params["cntr_id"] == null ? string.Empty : req.Params["cntr_id"].ToString();
                 
                string file_record_id = Session["u_id"].ToString();

                string mode = req.Params["mode"] == null ? string.Empty : req.Params["mode"].ToString();
                string file_nam = string.Empty;
                string file_path = string.Empty;

                string guid = System.Guid.NewGuid().ToString().Replace("-", "");
                string folder = "/upload_files/stuffing_cntr/";
                string virtual_path = string.Empty;

                bool isRight = true;

                if (mode.Equals("pic"))
                {
                    file_nam = req.Params["pic_name"] == null ? string.Empty : req.Params["pic_name"];

                    string base64str = req.Params["pic"];

                    base64str = base64str.Split(',')[1]; 
                    var btsdata = Convert.FromBase64String(base64str); 
                    file_path = System.Web.HttpContext.Current.Server.MapPath(folder) + guid + Path.GetExtension(file_nam);
                    virtual_path =  folder + guid + Path.GetExtension(file_nam);
                    System.IO.MemoryStream stream = new System.IO.MemoryStream(btsdata);
                    Bitmap bmp = new Bitmap(stream);
                    //bmp.Save(System.AppDomain.CurrentDomain.BaseDirectory + file_path, System.Drawing.Imaging.ImageFormat.Jpeg);
                    bmp.Save(file_path, System.Drawing.Imaging.ImageFormat.Jpeg);
                    stream.Close(); 
                }
                else
                {
                    HttpFileCollection files = req.Files;
                    if (files == null)
                    {
                        res.Write("{\"result\":0,\"msg\":\"没有找到文件\"}");
                        isRight = false;
                    }

                    string json = req["params"].ToString();

                    JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);

                    cntr_id = data_item["cntr_id"].ToString();
                    od_seq = data_item["od_seq"].ToString();

                    foreach (string key in files.Keys)
                    {
                        try
                        {
                            HttpPostedFile fileData = files[key];

                            if (fileData != null)
                            {
                                file_nam = fileData.FileName;
                                virtual_path = folder + guid + Path.GetExtension(file_nam);
                                file_path = System.Web.HttpContext.Current.Server.MapPath(folder) + guid + Path.GetExtension(fileData.FileName);
                                //fileData.SaveAs(System.AppDomain.CurrentDomain.BaseDirectory + file_path); 
                                fileData.SaveAs(file_path); 
                            }
                        }
                        catch (Exception e)
                        {
                            throw e;
                        }
                    }
                }

                if (isRight)
                {
                    bll_order bll = new bll_order();
                  
                    string json = bll.insert_order_cntr_file(od_seq,
                        cntr_id,
                        file_nam,
                        virtual_path,
                        file_record_id
                        );
                    res.Write(json);
                } 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 删除 装箱图片
        public void delete_order_cntr_file(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string cntr_id = req.Params["cntr_id"] == null ? string.Empty : req.Params["cntr_id"].ToString();
                string file_seq = req.Params["file_seq"] == null ? string.Empty : req.Params["file_seq"].ToString();
                
                bll_order bll = new bll_order();

                string json = bll.delete_order_cntr_file(od_seq,
                    cntr_id,
                    file_seq 
                    );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion

        #endregion

        #region 合同文件
        #region 增加
        public void insert_order_contract_file(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string amc_id = req.Params["amc_id"] == null ? string.Empty : req.Params["amc_id"].ToString();
                string amc_no = req.Params["amc_no"] == null ? string.Empty : req.Params["amc_no"].ToString();
                string mode = req.Params["mode"] == null ? string.Empty : req.Params["mode"].ToString();

                string file_record_id = Session["u_id"].ToString();
                string file_nam = string.Empty;
                string file_path = string.Empty;

                string guid = System.Guid.NewGuid().ToString().Replace("-", "");
                string folder = "/upload_files/order_contract/" ;
                string virtual_path = string.Empty;

                bool isRight = true;

                if (mode.Equals("pic"))
                {
                    file_nam = req.Params["pic_name"] == null ? string.Empty : req.Params["pic_name"];

                    string base64str = req.Params["pic"];

                    base64str = base64str.Split(',')[1]; 
                    var btsdata = Convert.FromBase64String(base64str); 
                    file_path = System.Web.HttpContext.Current.Server.MapPath(folder) + guid + Path.GetExtension(file_nam);
                    virtual_path = folder + guid + Path.GetExtension(file_nam);
                    System.IO.MemoryStream stream = new System.IO.MemoryStream(btsdata);
                    Bitmap bmp = new Bitmap(stream);
                    //bmp.Save(System.AppDomain.CurrentDomain.BaseDirectory + file_path, System.Drawing.Imaging.ImageFormat.Jpeg);
                    bmp.Save(file_path, System.Drawing.Imaging.ImageFormat.Jpeg);
                    stream.Close(); 
                }
                else
                {
                    HttpFileCollection files = req.Files;
                    if (files == null)
                    {
                        res.Write("{\"result\":0,\"msg\":\"没有找到文件\"}");
                        isRight = false;
                    }

                    string json = req["params"].ToString();

                    JObject data_item = (Newtonsoft.Json.Linq.JObject)JsonConvert.DeserializeObject(json);
 
                 
                    foreach (string key in files.Keys)
                    {
                        try
                        {
                            HttpPostedFile fileData = files[key];

                            if (fileData != null)
                            {
                                file_nam = fileData.FileName;
                                file_path = System.Web.HttpContext.Current.Server.MapPath(folder) + guid + Path.GetExtension(fileData.FileName);
                                virtual_path = folder + guid + Path.GetExtension(file_nam);
                                //fileData.SaveAs(System.AppDomain.CurrentDomain.BaseDirectory + file_path);
                                fileData.SaveAs(file_path); 
                            }
                        }
                        catch (Exception e)
                        {
                            throw e;
                        }
                    }
                }

                if (isRight)
                {
                    if (od_seq.Equals(string.Empty))
                    {
                        JObject jo = new JObject();
                        jo["result"] = 1;
                        jo["file_nam"] = file_nam;
                        jo["file_path"] = virtual_path;
                        jo["file_seq"] = Guid.NewGuid().ToString();
                        jo["file_record_id"] = file_record_id;

                        res.Write(jo.ToString());
                    }
                    else
                    {
                        bll_order bll = new bll_order();

                        string json = bll.insert_order_contract_file(od_seq,
                            file_nam,
                            virtual_path,
                            file_record_id,
                            amc_id,
                            amc_no,
                            Guid.NewGuid().ToString()
                            );

                        res.Write(json);
                    } 
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #region 删除
        public void delete_order_contract_file(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string file_seq = req.Params["file_seq"] == null ? string.Empty : req.Params["file_seq"].ToString();
               
                bll_order bll = new bll_order();

                string json = bll.delete_order_contract_file(od_seq,
                    file_seq 
                    );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion
        #endregion



        #region 应付和船期  2021-7-21

        #region 预计算
        public void pre_computer_order_fee_of_ship_voyage(HttpRequest req,
            HttpResponse res
            )
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string od_service_seq = req.Params["od_service_seq"] == null ? string.Empty : req.Params["od_service_seq"].ToString();
                string od_service_sub_seq = req.Params["od_service_sub_seq"] == null ? string.Empty : req.Params["od_service_sub_seq"].ToString();
 
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                string load_port = req.Params["load_port"] == null ? string.Empty : req.Params["load_port"].ToString();
                string disc_port = req.Params["disc_port"] == null ? string.Empty : req.Params["disc_port"].ToString();
                string freight_id = req.Params["freight_id"] == null ? string.Empty : req.Params["freight_id"].ToString();
                string disc_trans_flag = req.Params["disc_trans_flag"] == null ? string.Empty : req.Params["disc_trans_flag"].ToString();
                string load_trans_flag = req.Params["load_trans_flag"] == null ? string.Empty : req.Params["load_trans_flag"].ToString();
                string e_f_id = req.Params["e_f_id"] == null ? string.Empty : req.Params["e_f_id"].ToString();
                string danger_flag = req.Params["danger_flag"] == null ? string.Empty : req.Params["danger_flag"].ToString();
                string trade_id = req.Params["trade_id"] == null ? string.Empty : req.Params["trade_id"].ToString(); 
              
                bll_order bll = new bll_order();

                string json = bll.pre_computer_order_fee_of_ship_voyage(
                    ship_no,
                    od_seq,
                    od_service_seq,
                    od_service_sub_seq, 
                    
                    load_port,
                    disc_port,
                    freight_id,
                    disc_trans_flag,
                    load_trans_flag,
                    e_f_id,
                    danger_flag,
                    trade_id
                    );

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            } 
        }

        #endregion


        #region   费用绑定与解绑
        public void order_fee_bind_ship_voyage(HttpRequest req,
            HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString(); 
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString(); 

                bll_order bll = new bll_order();

                string json = bll.order_fee_bind_ship_voyage(ship_no, od_seq);

                res.Write(json);
                 
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public void order_fee_unbind_ship_voyage(HttpRequest req,
            HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();

                bll_order bll = new bll_order();

                string json = bll.order_fee_unbind_ship_voyage(ship_no, od_seq);

                res.Write(json);

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #region

        #endregion
        #endregion


        #region 集装箱删除 预判断
        public void judge_delete_cntr(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string cntr_id = req.Params["cntr_id"] == null ? string.Empty : req.Params["cntr_id"].ToString();

                bll_order bll = new bll_order();

                string json = bll.judge_delete_cntr(od_seq,
                    cntr_id
                    );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 


        #region 判定绑定集装箱是否对这个船进行了二次绑定
        public void judge_bind_ship_voyage(HttpRequest req, HttpResponse res)
        {
            try
            {
                string od_seq = req.Params["od_seq"] == null ? string.Empty : req.Params["od_seq"].ToString();
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                string od_service_seq = req.Params["od_service_seq"] == null ? string.Empty : req.Params["od_service_seq"].ToString();
                string od_service_sub_seq = req.Params["od_service_sub_seq"] == null ? string.Empty : req.Params["od_service_sub_seq"].ToString();

                bll_order bll = new bll_order();

                string json = bll.judge_bind_ship_voyage(ship_no,
                    od_seq,
                    od_service_seq,
                    od_service_sub_seq
                    );

                res.Write(json);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        #endregion 
        #endregion
        #endregion

        #endregion

        #region 后台去掉特殊字符
        private void validate_str(HttpRequest req, HttpResponse res)
        {
            try
            {
                if (Session["u_id"] == null)
                {
                    res.Write("{\"sessionerror\":1}");
                }

                string vs = req.Params["vs"] == null ? string.Empty : req.Params["vs"].ToString();

                //vs = vs.Replace("\n", "").Replace(" ", "").Replace("\t", "").Replace("\r", "");
                /*
                   理论上，应该去掉空格 
                 * 然后 "" 中间的 \n \t 
                 */

                string[] arr = vs.Split('\"');

                if (arr.Length > 0)
                {
                    for (int i = 1; i < arr.Length; i += 2)
                    {
                        vs = vs.Replace(arr[i], arr[i].Replace("\n", "").Replace(" ", "").Replace("\t", "").Replace("\r", ""));
                        vs = vs.Replace(arr[i], arr[i].Replace("\n", "").Replace("\t", "").Replace("\r", ""));
                    }
                }

                vs = vs.Replace(" ", "").Replace("\"", "");



                res.Write(vs);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region 数字和汉字分离
        private string GetStrings(string str, int type = 0)
        {
            IList<string> strList = new List<string>();
            MatchCollection ms;
            if (type == 0)
            {
                ms = Regex.Matches(str, @"\D+");
            }
            else
            {
                ms = Regex.Matches(str, @"\d+");
            }

            foreach (Match m in ms)
            {
                strList.Add(m.Value);
            }
            return string.Join("", strList.ToArray());
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