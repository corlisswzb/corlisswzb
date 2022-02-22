using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using BLL.ship;
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


namespace SDZL.Ashx
{
    /// <summary>
    /// ship 的摘要说明
    /// </summary>
    public class ship : IHttpHandler, IRequiresSessionState
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

                    #region 船舶管理
                    case "get_ship_list":
                        {
                            get_ship_list(req, res);
                        }
                        break;
                    case "insert_update_ship":
                        {
                            insert_update_ship(req, res);
                        }
                        break;
                   
                    #endregion

                    #region 船期管理
                    case "get_ship_voyage_list":
                        {
                            get_ship_voyage_list(req, res);
                        }
                        break;
                    case "get_ship_voyage_single":
                        {
                            get_ship_voyage_single(req, res);
                        }
                        break;
                    case "get_ship_voyage_by_like_str_for_combogrid":
                        {
                            get_ship_voyage_by_like_str_for_combogrid(req, res);
                        }
                        break;
                    case "insert_ship_voyage":
                        {
                            insert_ship_voyage(req, res);
                        }
                        break;
                    case "update_ship_voyage":
                        {
                            update_ship_voyage(req, res);
                        }
                        break;
                    case "delete_ship_voyage":
                        {
                            delete_ship_voyage(req, res);
                        }
                        break;
                    case "close_ship_voyage":
                        {
                            close_ship_voyage(req, res);
                        }
                        break;

                    #endregion

                    #region 获取箱
                    case "get_ship_cntr":
                        {
                            get_ship_cntr(req, res);
                        }
                        break;
                    case "get_ship_cntr_group":
                        {
                            get_ship_cntr_group(req, res);
                        }
                        break;
                    case "down_custom_cntr":
                        {
                            down_custom_cntr(req, res);
                        }
                        break;
                    #endregion


                    #region 移除箱
                    case "remove_ship_cntr":
                        {
                            remove_ship_cntr(req, res);
                        }
                        break;
                    #endregion
                    #region 计费
                    case "get_ship_fee_list":
                        {
                            get_ship_fee_list(req, res);
                        }
                        break;
                    case "unbind_ship_fee":
                        {
                            unbind_ship_fee(req, res);
                        }
                        break;
                    case "remove_ship_fee":
                        {
                            remove_ship_fee(req, res);
                        }
                        break;
                    



                    #endregion
                }
            }
            catch (Exception e)
            {
                mylog.writelog("order." + ACTION,
                        System.DateTime.Now.ToString(),
                        Session["u_id"].ToString() + "/" + e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }



        #region 船舶管理
       

        private void insert_update_ship(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_id = req.Params["ship_id"] == null ? string.Empty : req.Params["ship_id"].ToString();
                string ship_desc = req.Params["ship_name"] == null ? string.Empty : req.Params["ship_name"].ToString();
                string ship_en_cod = req.Params["ship_en_cod"] == null ? string.Empty : req.Params["ship_en_cod"].ToString();
                string ship_en_long_cod = req.Params["ship_en_long_cod"] == null ? string.Empty : req.Params["ship_en_long_cod"].ToString();
                string ship_rent_cu_id = req.Params["ship_rent_cu_id"] == null ? string.Empty : req.Params["ship_rent_cu_id"].ToString();
                string ship_relation_phone = req.Params["ship_relation_phone"] == null ? string.Empty : req.Params["ship_relation_phone"].ToString();
                string ship_max_std_cntr_num = req.Params["ship_max_std_cntr_num"] == null ? string.Empty : req.Params["ship_max_std_cntr_num"].ToString();

                string ship_custom_no = req.Params["ship_custom_no"] == null ? string.Empty : req.Params["ship_custom_no"].ToString();
                string ship_original_no = req.Params["ship_original_no"] == null ? string.Empty : req.Params["ship_original_no"].ToString();
                string ship_regist_no = req.Params["ship_regist_no"] == null ? string.Empty : req.Params["ship_regist_no"].ToString();
                string ship_recognition_no = req.Params["ship_recognition_no"] == null ? string.Empty : req.Params["ship_recognition_no"].ToString();
                string ship_valid = req.Params["ship_valid"] == null ? string.Empty : req.Params["ship_valid"].ToString();
                string uid = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_ship bll = new bll_ship();
                string json = bll.insert_update_ship(c_id, ship_id, ship_desc.ToUpper(), ship_en_cod.ToUpper(), ship_en_long_cod.ToUpper(),
                    ship_rent_cu_id, ship_relation_phone, ship_max_std_cntr_num,
                    ship_custom_no, ship_original_no, ship_regist_no, ship_recognition_no, ship_valid, uid);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void get_ship_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string c_id = Session["cpy_id"].ToString();
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString();
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();

                bll_ship bll = new bll_ship();

                string json = bll.get_ship_list(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }

       
        #endregion

        #region 船期管理

        public void get_ship_voyage_by_like_str_for_combogrid(HttpRequest req, HttpResponse res)
        {
            try
            {
                string like_str = req.Params["like_str"] == null ? string.Empty : req.Params["like_str"].ToString().Replace("'", "''");

                string page = req.Params["page"] == null ? string.Empty : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? string.Empty : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();

                bll_ship bll = new bll_ship();
                string json = bll.get_ship_voyage_by_like_str_for_combogrid(like_str,
                    c_id,
                    page,
                    rows,
                    sort,
                    ordersort);
                res.Write(json);
            }
            catch (Exception e)
            {
                BLL.commone.mylog.writelog("ship.get_ship_voyage_by_like_str_for_combogrid",
                 System.DateTime.Now.ToString(),
                 e.Message, BLL.commone.EMAIL_MODEL.DEFAULT);
            }
        }
         
        #region 删除
        private void delete_ship_voyage(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                bll_ship bll = new bll_ship();
                string json = bll.delete_ship_voyage(ship_no);

                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 关闭航次
        private void close_ship_voyage(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                string c_id = Session["cpy_id"].ToString();
                bll_ship bll = new bll_ship();
                string json = bll.close_ship_voyage(ship_no, c_id);

                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        private void update_ship_voyage(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_id = req.Params["ship_id"] == null ? string.Empty : req.Params["ship_id"].ToString();
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                string voyage_no = req.Params["voyage_no"] == null ? string.Empty : req.Params["voyage_no"].ToString();
                string vl_id = req.Params["vl_id"] == null ? string.Empty : req.Params["vl_id"].ToString();
                string ETD = req.Params["ETD"] == null ? string.Empty : req.Params["ETD"].ToString();
                string ETA = req.Params["ETA"] == null ? string.Empty : req.Params["ETA"].ToString();
                string bak = req.Params["bak"] == null ? string.Empty : req.Params["bak"].ToString();
                string start_area_id = req.Params["start_area_id"] == null ? string.Empty : req.Params["start_area_id"].ToString();
                string end_area_id = req.Params["end_area_id"] == null ? string.Empty : req.Params["end_area_id"].ToString();

                string uid = Session["u_id"].ToString();

                bll_ship bll = new bll_ship();

                string json = bll.update_ship_voyage(ship_id, ship_no, voyage_no.ToUpper(), vl_id, ETD, ETA, bak, start_area_id, end_area_id, uid);

                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void insert_ship_voyage(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_id = req.Params["ship_id"] == null ? string.Empty : req.Params["ship_id"].ToString();
                string voyage_no = req.Params["voyage_no"] == null ? string.Empty : req.Params["voyage_no"].ToString();
                string vl_id = req.Params["vl_id"] == null ? string.Empty : req.Params["vl_id"].ToString();
                string ETD = req.Params["ETD"] == null ? string.Empty : req.Params["ETD"].ToString();
                string ETA = req.Params["ETA"] == null ? string.Empty : req.Params["ETA"].ToString();
                string bak = req.Params["bak"] == null ? string.Empty : req.Params["bak"].ToString();
                string start_area_id = req.Params["start_area_id"] == null ? string.Empty : req.Params["start_area_id"].ToString();
                string end_area_id = req.Params["end_area_id"] == null ? string.Empty : req.Params["end_area_id"].ToString();
                string uid = Session["u_id"].ToString();
                string c_id = Session["cpy_id"].ToString();
                bll_ship bll = new bll_ship();

                string json = bll.insert_ship_voyage(ship_id, voyage_no.ToUpper(), vl_id, ETD, ETA, bak, start_area_id, end_area_id, uid, c_id);

                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void get_ship_voyage_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                string voyage_no = req.Params["voyage_no"] == null ? string.Empty : req.Params["voyage_no"].ToString();
                string ship_id = req.Params["ship_id"] == null ? string.Empty : req.Params["ship_id"].ToString();
                string vl_id = req.Params["vl_id"] == null ? string.Empty : req.Params["vl_id"].ToString();
                string status_id = req.Params["status_id"] == null ? string.Empty : req.Params["status_id"].ToString();
                string etd_begin = req.Params["etd_begin"] == null ? string.Empty : req.Params["etd_begin"].ToString();
                string etd_end = req.Params["etd_end"] == null ? string.Empty : req.Params["etd_end"].ToString();
                string page = req.Params["page"] == null ? "1" : req.Params["page"].ToString();
                string rows = req.Params["rows"] == null ? "30" : req.Params["rows"].ToString();
                string sort = req.Params["sort"] == null ? string.Empty : req.Params["sort"].ToString();
                string ordersort = req.Params["order"] == null ? string.Empty : req.Params["order"].ToString();
                string c_id = Session["cpy_id"].ToString();
                bll_ship bll = new bll_ship();

                string json = bll.get_ship_voyage_list(voyage_no, ship_id, vl_id, c_id, status_id, etd_begin, etd_end, page, rows, sort, ordersort);

                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }

        private void get_ship_voyage_single(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                
                bll_ship bll = new bll_ship();

                string json = bll.get_ship_voyage_single(ship_no);

                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region 集装箱
        private void get_ship_cntr_group(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                bll_ship bll = new bll_ship();
                string json = bll.get_ship_cntr_group(ship_no);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        //获取
        private void get_ship_cntr(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                bll_ship bll = new bll_ship();
                string json = bll.get_ship_cntr_list(ship_no);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        //移除
        private void remove_ship_cntr(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                string json_cntr_of_ship_voyage = req.Params["json_cntr_of_ship_voyage"] == null ? string.Empty : req.Params["json_cntr_of_ship_voyage"].ToString();

                bll_ship bll = new bll_ship();
                string json = bll.remove_ship_cntr(ship_no, json_cntr_of_ship_voyage);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }

        //模板下载 
        private void down_custom_cntr(HttpRequest req, HttpResponse res)
        {
            IWorkbook wk = new HSSFWorkbook();
            try
            {
                #region 打开Excel表格模板，并初始化到NPOI对象中
               
                string filePath = System.Web.HttpContext.Current.Server.MapPath("/Templates/客户水路集运模板.xlsx");
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

              
                 
                string od_delegate_cu_id = req.Params["od_delegate_cu_id"] == null ? string.Empty : req.Params["od_delegate_cu_id"].ToString();
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                string c_id = Session["cpy_id"].ToString();
                string load_port = req.Params["load_port"] == null ? string.Empty : req.Params["load_port"].ToString();
                string disc_port = req.Params["disc_port"] == null ? string.Empty : req.Params["disc_port"].ToString();

               
                bll_ship bll = new bll_ship();
                JObject jo = bll.get_ship_cntr_by_delegate_cu_id(ship_no,
                    c_id,
                    od_delegate_cu_id,
                    load_port,
                    disc_port );

                dic_temp.Add("c_desc", jo["c_desc"].ToString());//公司名
                dic_temp.Add("down_date", jo["down_date"].ToString());//公司地址 
                dic_temp.Add("ship_desc", jo["ship_desc"].ToString());
                dic_temp.Add("ship_voyage", jo["ship_voyage"].ToString());
                dic_temp.Add("load_port_desc", jo["load_port_desc"].ToString());
                dic_temp.Add("disc_port_desc", jo["disc_port_desc"].ToString());
                dic_temp.Add("od_delegate_cu_desc", jo["od_delegate_cu_desc"].ToString());

                for (int i = sheet.FirstRowNum; i <= 9; i++)
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
                int npicRow = 0;
                if (jo["rows"] != null)
                {
                    #region 数据处理
                    JArray ja_data = (JArray)jo["rows"];
                    int nStartRow = 11;
                    var rowSource = sheet.GetRow(nStartRow);
                    var rowStyle = rowSource.RowStyle; 

                    sheet.ShiftRows(nStartRow, sheet.LastRowNum, ja_data.Count, true, false);

                      npicRow = 11 + ja_data.Count + 1 ;

                    for (int i = 0; i < ja_data.Count; i++)
                    {
                        string cntr_no = ja_data[i]["cntr_no"].ToString();
                        string bill_no = ja_data[i]["bill_no"].ToString();
                        string seal_no = ja_data[i]["seal_no"].ToString();
                        string eqp_siz = ja_data[i]["eqp_siz"].ToString();
                        string eqp_typ = ja_data[i]["eqp_typ"].ToString();
                        string cargo_goods_desc = ja_data[i]["cargo_goods_desc"].ToString();
                        string opr_cod = ja_data[i]["opr_cod"].ToString();
                        string cntr_gross_wgt = ja_data[i]["cntr_gross_wgt"].ToString();


                        var rowInsert = sheet.CreateRow(nStartRow + i);
                        rowInsert.CreateCell(1).SetCellValue(i + 1);
                        rowInsert.CreateCell(2).SetCellValue(bill_no);
                        rowInsert.CreateCell(3).SetCellValue(cntr_no);
                        rowInsert.CreateCell(4).SetCellValue(seal_no);
                        rowInsert.CreateCell(5).SetCellValue(cargo_goods_desc);
                        rowInsert.CreateCell(6).SetCellValue(eqp_siz + eqp_typ);
                        rowInsert.CreateCell(7).SetCellValue("");
                        rowInsert.CreateCell(8).SetCellValue("");
                        rowInsert.CreateCell(9).SetCellValue(cntr_gross_wgt);
                        rowInsert.CreateCell(10).SetCellValue(opr_cod);
                        rowInsert.CreateCell(11).SetCellValue("");
                        rowInsert.CreateCell(12).SetCellValue("");

                        if (rowStyle != null)
                        {
                            rowInsert.RowStyle = rowStyle;
                        }
                        rowInsert.Height = rowSource.Height;

                        for (int col = 1; col < rowSource.LastCellNum; col++)
                        {
                            var cellsource = rowSource.GetCell(col);
                            var cellInsert = rowInsert.GetCell(col);

                            var cellStyle = cellsource.CellStyle;
                            if (cellStyle != null)
                            {
                                cellInsert.CellStyle = cellsource.CellStyle;
                            }
                        }

                        //}



                        

                    } 

                    #endregion
                     
                }


                if (c_id.Equals("14"))
                {
                    //将图片文件读入一个字符串
                    byte[] bytes = System.IO.File.ReadAllBytes(System.Web.HttpContext.Current.Server.MapPath("/asdgasdfw32asdgas352qwasdf/") + "293asdtnk23jasdflal35_215knjj$2212j13nsdkfjn34.png");
                    int pictureIdx = wk.AddPicture(bytes, PictureType.PNG);

                    IClientAnchor anchor = null;
                    IPicture pict = null;
                    IDrawing patriarch = sheet.CreateDrawingPatriarch();

                    if (extension.Equals(".xls"))
                    {
                        //210-221    232  259 
                        //10  19   220 ,240
                        // 插图片的位置  HSSFClientAnchor（dx1,dy1,dx2,dy2,col1,row1,col2,row2) 后面再作解释
                        anchor = new HSSFClientAnchor(0, 0, 205, 221, 9, npicRow, 10, npicRow);
                        //把图片插到相应的位置
                        pict = (HSSFPicture)patriarch.CreatePicture(anchor, pictureIdx); 
                    }else
                    {
                        //210-221    232  259 
                        //10  19   220 ,240
                        // 插图片的位置  HSSFClientAnchor（dx1,dy1,dx2,dy2,col1,row1,col2,row2) 后面再作解释
                        anchor = new XSSFClientAnchor(0, 0, 205, 221, 9, npicRow, 10, npicRow);
                        //把图片插到相应的位置
                        pict = (XSSFPicture)patriarch.CreatePicture(anchor, pictureIdx);
                         
                    }

                    pict.Resize();
                }

                #region 表格导出


                using (MemoryStream ms = new MemoryStream())
                {
                    wk.Write(ms);
                    ms.Flush();
                    string fileName = jo["od_delegate_cu_desc"].ToString() + "_货物运单" + ".xlsx";
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
            finally
            {
                wk.Close();
            }
        }

        #endregion

        #region 计费
        private void get_ship_fee_list(HttpRequest req, HttpResponse res)
        {
            try
            {
                bll_ship bll = new bll_ship();
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                string json = bll.get_ship_fee_list(ship_no);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        private void remove_ship_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                string json_fee_of_ship_voyage = req.Params["json_fee_of_ship_voyage"] == null ? string.Empty : req.Params["json_fee_of_ship_voyage"].ToString();

                bll_ship bll = new bll_ship();
                string json = bll.remove_ship_fee(ship_no, json_fee_of_ship_voyage);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
            }
        }
        private void unbind_ship_fee(HttpRequest req, HttpResponse res)
        {
            try
            {
                string ship_no = req.Params["ship_no"] == null ? string.Empty : req.Params["ship_no"].ToString();
                string json_fee_of_ship_voyage = req.Params["json_fee_of_ship_voyage"] == null ? string.Empty : req.Params["json_fee_of_ship_voyage"].ToString();

                bll_ship bll = new bll_ship();
                string json = bll.unbind_ship_fee(ship_no, json_fee_of_ship_voyage);
                res.Write(json);
            }
            catch (Exception)
            {

                throw;
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