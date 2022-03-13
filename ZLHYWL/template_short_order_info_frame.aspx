<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_short_order_info_frame.aspx.cs" Inherits="ZLHYWL.template_short_order_info_frame" %>


<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_short_order_info_frame.css" rel="stylesheet" /> 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script> 
<script src="Js/template_short_order_info_frame.js"></script>
<script src="Script/jquery_print.js"></script> 
 
<script src="Script/jspdf/libs/sprintf.js"></script>
<script src="Script/jspdf/jspdf.js"></script>
<script src="Script/jspdf/libs/base64.js"></script>
<script src="Script/jspdf/html2canvas.js"></script> 
<script src="Script/jspdf/jspdf.debug.js"></script>
<body style="width:100%;height:100%;  padding:0px; margin:0px;">
    <div class="custom_bg" style="padding:0px;  border:none;"> 
        <a href="javascript:print_contract();" tabindex="1"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-print'" >打印</a>  
        <a href="javascript:topdf_contract();" tabindex="1"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-pdf'" >存为PDF</a> 
        <a href="javascript:download_order_fee();" tabindex="1"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-page_excel'" >下载成Excel</a>   
    </div>
    <form id="form1" runat="server" style="width:1080px; margin:10px auto 0px auto;">
         
            <!-- 订单信息 
                订单信息 主体只有 委托基本信息和货物信息、费用信息 
                    集装箱信息 和 供应商 服务 做弹出式显示 
             -->  
        <div class="print_body" id="export_content"  >
        <!--startprint1-->
        <table class="tab_std_short" style="width:1080px;  ">
            <col style="width:8%"/>
            <col style="width:42%"/>
            <col style="width:8%"/>
            <col style="width:42%"/>  
            <tr>
                <td colspan="4" style=" text-align:center; height:78px;">
                    <span style="font-size:18px;font-weight:bold;" id="od_record_by_company_desc"></span> 
                    <span style="font-size:16px;font-weight:bold;">费用结算清单</span> 
                </td>
            </tr>
           
            <tr>
                <td class="title">委托人:</td>
                <td class="value"><span id="od_delegate_cu_desc"></span></td>
                <td class="title">业务类型:</td>
                <td class="value"><span id="od_typ_desc"></span></td>
            </tr>
            <tr>
                <td class="title">货名:</td>
                <td class="value"><span id="od_cargo_typ_desc"></span></td>
                <td class="title">业务编号:</td>
                <td class="value"><span id="od_no"></span></td>
            </tr>
            <tr>
                <td class="title">起运地:</td>
                <td class="value"><span id="od_beg_place_desc"></span></td>
                <td class="title">业务时间:</td>
                <td class="value"><span id="od_fee_dat"></span></td>
            </tr>
            <tr>
                <td class="title">目的地:</td>
                <td class="value"><span id="od_end_place_desc"></span></td>
                <td class="title">提单号:</td>
                <td class="value"><span id="od_main_bill_no"></span></td>
            </tr>
            <tr>
                <td class="title">运输条款:</td>
                <td class="value"><span id="od_freight_desc"></span></td>
                <td class="title">箱量:</td>
                <td class="value"><span id="od_cntr_desc"></span></td>
            </tr> 
        </table> 
        <div  style="font-size:14px; padding-left:12px; font-weight:bold; background-color:#ff00dc;color:#fff;line-height:32px; margin:0px;">
           
            <b>应收</b> 
            
        </div>
        <div id="tab_order_fee_rec">

        </div>
       <%-- <table class="table" id="tab_order_fee_rec"></table>--%>
        <table style="table-layout:fixed" class="mytable group_fee_rec" >
            <tbody>
                <tr></tr>
            </tbody>
            <%--<tr>
                <td>
                    应收小计:
                </td>

                <td id="rec_total_amount">

                </td> 
                <td>
                    已收:
                </td>
                <td id="rec_woa_total_amount">

                </td>
                
                
            </tr> --%>
        </table>
        <!--应付-->
        <div  style="font-size:14px;padding-left:12px; font-weight:bold; background-color:#0094ff;color:#fff;line-height:32px; margin:0px;">
            
            <b>应付</b> 
        </div>
        <div id="tab_order_fee_pay">

        </div>
        <%--<table class="table" id="tab_order_fee_pay"></table>--%>
        
        <table style="table-layout:fixed" class="mytable group_fee_pay" >
            <tbody>
                <tr></tr>
            </tbody>
            <%--<tr>
                <td>
                    应付小计:
                </td> 
                <td id="pay_total_amount">

                </td> 
                <td>
                    已付:
                </td>
                <td id="pay_woa_total_amount">

                </td> 
            </tr> --%>
        </table>

        <table id="tab_sum" style="font-weight:bold;font-size:18px; width:100%; border-top:solid 2px #ff00dc"  >
            <tr>
                <td style="text-align:left;">
                    合计:
                </td> 
               
               
                <td style="text-align:right;">
                    折合利润:
                </td>
                <td id="sum_rmb_profit_2" style="text-align:left;">

                </td>
                <td style="text-align:right;">
                    毛利率:
                </td>
                <td id="gross_profit" style="text-align:left;">

                </td>
            </tr> 
            <tr class="lose_explain">
                <td>亏损说明:</td>
                <td id="lose_explain" colspan="8">

                </td>
            </tr>
             
        </table>       
        <!--endprint1-->  
        </div>     
    </form>
 
</body>
