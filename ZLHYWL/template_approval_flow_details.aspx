<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_approval_flow_details.aspx.cs" Inherits="SDZL.template_approval_flow_details" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
  
<link href="Style/short_approval_flow_details.css" rel="stylesheet" />
 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>  
<script src="Js/template_approval_flow_details.js"></script>
<script src="Script/jquery_print.js"></script>  
<script src="Script/jspdf/libs/sprintf.js"></script>
<script src="Script/jspdf/jspdf.js"></script>
<script src="Script/jspdf/libs/base64.js"></script>
<script src="Script/jspdf/html2canvas.js"></script> 
<script src="Script/jspdf/jspdf.debug.js"></script>
<body  style="width:100%;height:100%; overflow-x:hidden;overflow-y:auto;  padding:0px; margin:0px;">
    <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north',border:false,spilt:false">
            <div class="easyui-panel" data-options="fit:true,title:'审核基本信息'" style="height:130px;overflow:hidden;">
                <div class="cls_approval_details_head" style="width:600px;">
                    <div class="row" >
                        <div class="title" style="flex:1">
                            标题:
                        </div>
                        <div class="value" style="flex:9">
                            <span id="sp_amc_title"></span>
                        </div>
                    </div>
                    <div class="row"  >
                        <div class="title" style="flex:1">
                            编号:
                        </div>
                        <div class="value" style="flex:4">
                            <span id="sp_amc_relation_no"></span>
                        </div>
                        <div class="title" style="flex:1">
                            状态:
                        </div>
                        <div class="value" style="flex:4">
                            <span id="sp_amc_status_desc"></span>
                        </div>
                    </div>
                    <div class="row"  >
                        <div class="title" style="flex:1">
                            发起:
                        </div>
                        <div class="value" style="flex:4">
                            <span id="sp_amc_create_nam"></span>
                        </div>
                        <div class="title" style="flex:1">
                            发起时间:
                        </div>
                        <div class="value" style="flex:4">
                            <span id="sp_amc_create_dat"></span>
                        </div>
                    </div>
                    <div class="row"  >
                        <div class="title" style="flex:1">
                            当前处理:
                        </div>
                        <div class="value" style="flex:4">
                            <span id="sp_amc_cur_opr_nam"></span>
                        </div>
                        <div class="title" style="flex:1">
                            通审时间:
                        </div>
                        <div class="value" style="flex:4">
                            <span id="sp_amc_finish_dat"></span>
                        </div>
                    </div>
                </div> 
            </div> 
        </div>
        <div data-options="region:'center',border:false,spilt:false">
            <div class="easyui-panel" data-options="fit:true,title:'审核流程'" style=" overflow:hidden;">
                <div class="cls_flow_details" id="ap_flow_details" style="padding:5px; margin-right:25px;width:610px;">
                    
                </div>
            </div>
        </div>
    </div>
    
    
</body> 
