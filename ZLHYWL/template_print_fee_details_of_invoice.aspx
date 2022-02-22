<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_print_fee_details_of_invoice.aspx.cs" Inherits="SDZL.template_print_fee_details_of_invoice" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
  
<link href="Style/print.css" rel="stylesheet" />
 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>
 

<script src="Js/print_of_order_group.js"></script>

 
<script src="Script/jspdf/libs/sprintf.js"></script>
<script src="Script/jspdf/jspdf.js"></script>
<script src="Script/jspdf/libs/base64.js"></script>
<script src="Script/jspdf/html2canvas.js"></script> 
<script src="Script/jspdf/jspdf.debug.js"></script>

<script src="Script/jquery_print.js"></script> 

<body style="width:100%;height:100%;  padding:0px; margin:0px;">
    <form runat="server">
        <asp:HiddenField ID="a_id" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="amc_id" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="print_nam" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="print_time" ClientIDMode="Static" runat="server" />
        <asp:HiddenField ID="scr_code" ClientIDMode="Static" runat="server" />
    </form>
    <div class="custom_bg" style="padding:0px; border:none;"> 
        <a href="javascript:print_contract();" tabindex="1"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-print'" >打印</a>  
        <a href="javascript:topdf_contract();" tabindex="1"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-pdf'" >存为PDF</a> 
         
    </div>

    <div class="print_body" id="export_content"  >
        <!--startprint1-->
        
        <asp:Literal ID="Literal1" runat="server"></asp:Literal>
           
        <!--endprint1--> 
    </div>
    <div id="dv_clear"   style="position:absolute;top:-1000px;left:-1000px;">
        <a href="javascript:onclick_cleartxt();" class="btn btn-sm btn-link"> 清除文本</a>
    </div>

     
</body> 
