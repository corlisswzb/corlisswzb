<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_order_change_info_frame.aspx.cs" Inherits="ZLHYWL.template_order_change_info_frame" %>
  
<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_order_info_frame.css" rel="stylesheet" />
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>
<script src="Js/template_order_change_info_frame.js"></script>

<body style="width:100%;height:100%; padding:0px; margin:0px;">
    

    <div class="easyui-panel" data-options="title:'改单基本信息',border:false">
        <table class="tab_std_short" style="width:1080px; font-weight:bold; ">
            <col style="width:8%"/>
            <col style="width:42%"/>
            <col style="width:8%"/>
            <col style="width:42%"/>  
             
            <tr>
                <td class="title">所属公司:</td>
                <td class="value"><span id="od_record_by_company_desc"></span></td>
                
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
    </div>
    <div class="easyui-panel" data-options="title:'改单明细'" style="min-height:80px;">
        <table id="tab_fee_list">
        </table>
    </div> 
    <div class="easyui-panel" data-options="title:'改单汇总'" style="min-height:26px;">
         <table class="tab_std_short" style="width:1080px; font-weight:bold; ">
            <col style="width:8%"/>
            <col style="width:92%"/>
            <tr>
                <td class="title">改单前:</td>
                <td class="value"><span id="before_co"></span></td> 
             </tr>
             <tr>
                <td class="title">改单后:</td>
                <td class="value"><span id="after_co"></span></td> 
             </tr>
        </table>
    </div>        
    <div class="easyui-panel" id="my_approval_adivce" data-options="title:'审核意见',border:false," style="overflow:hidden;">
        <table class="tab_std" style="width:640px">
            <col style="width:12%"/>
            <col style="width:44%;" />
            <col style="width:44%;" />
            <tr>
                <td class="title">意见:</td>
                <td class="value" colspan="2">
                    <textarea id="ed_ap_context"   class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                            resize:none; width:440px; height:40px;"></textarea> 
                </td>
            </tr>
            <tr>
                <td class="title cls_next_opr"  >下一处理人:</td>
                <td class="value cls_next_opr">
                    <select id="ed_ap_next_amc_opr_info" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:166" ></select> 
                </td>
                <td class="value">
                    <a href="javascript:givenext_amc();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'">同意</a> 
                    <a href="javascript:giveback_to_create_amc();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">驳回发起人</a>
                </td>
            </tr>
                                             
        </table>
    </div>
    <div class="easyui-panel" data-options="title:'审核流水',border:false," style="padding:2px; padding-right:20px; margin-bottom:140px;">
        <table class="tab_std" id="ap_flow_details" style="padding:5px; margin-right:25px;width:520px;">
            <col style="width:20%"/>
            <col style="width:20%"/>
            <col style="width:20%"/>
            <col style="width:40%"/>
            <tbody>

            </tbody>
        </table>
    </div> 
           
         
	 
    
</body>
