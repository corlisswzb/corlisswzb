<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_service_info.aspx.cs" Inherits="ZLHYWL.template_service_info" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" />

<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/order_service_frame.css" rel="stylesheet" />
<link href="Style/template_order_info_frame.css" rel="stylesheet" />

<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>

<script src="Js/order_service_frame.js"></script>

<body style="width:100%;height:100%; overflow:hidden;padding:0px; margin:0px;">
     
    <div id="tabs_bar">
        <a id="btn_insert_service_sub" href="javascript:insert_service_sub();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新增服务批次</a>
    </div>
    <div id="tabs" class="easyui-tabs" data-options="fit:true,tools:'#tabs_bar',border:false">
       
    </div> 
     
</body>
 
