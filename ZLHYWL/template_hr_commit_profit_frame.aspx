<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_hr_commit_profit_frame.aspx.cs" Inherits="ZLHYWL.template_hr_commit_profit_frame" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_order_info_frame.css" rel="stylesheet" />
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>
<script src="Js/template_hr_commit_profit_frame.js"></script>

<body style="width:100%;height:100%; padding:0px; margin:0px;">
    <div class="easyui-panel" data-options="title:'提成审核基本信息',border:false"> 
                 
        <table class="tab_std" style="width:600px; margin-top:12px;">
            <col style="width:100px"/>
            <col style="width:200px"/>
            <col style="width:100px"/>
            <col style="width:200px"/>
            <tr>
                <td class="title">
                    标题:
                </td>
                <td class="value">
                    <input type="text" id="sp_amc_title" readonly="readonly"  class="easyui-textbox" style="width:402px;" />
                   
                </td>  
            </tr>
            <tr>
                <td class="title">
                    审核编号:
                </td>
                <td class="value">
                    <input id="sp_relation_no" readonly="readonly" class="easyui-textbox" style="width:100px;"/> 
                </td>
                <td class="title">
                    审核状态:
                </td>
                <td class="value">
                    <input id="sp_amc_status_desc" readonly="readonly" class="easyui-textbox" style="width:100px;"/>   
                </td>
            </tr>
            <tr>
                <td class="title">
                    申请单位:
                </td>
                <td class="value" colspan="3">
                    <input id="sp_relation_c_desc" readonly="readonly" class="easyui-textbox" style="width:402px;"/>  
                </td>
            </tr>  
            <tr>
                <td class="title">
                    应收总金额(本币):
                </td>
                <td class="value" colspan="3">
                    <input id="sp_od_rec_uncover_total_amount_of_base" readonly="true" class="easyui-textbox" style="width:402px;"/> 
                </td> 
            </tr>  
            <tr>
                <td class="title">
                    发起人:
                </td>
                <td class="value">
                    <input id="sp_amc_create_by_nam" readonly="true" class="easyui-textbox" style="width:100px;"/>   
                </td> 
                    <td class="title">
                    发起时间:
                </td>
                <td class="value">
                    <input id="sp_amc_create_dat" readonly="true" class="easyui-textbox" style="width:100px;"/> 
                </td> 
            </tr>
            <tr>
                <td class="title">
                    当前审核:
                </td>
                <td class="value">
                    <input id="sp_amc_cur_opr_nam" readonly="true" class="easyui-textbox" style="width:100px;"/> 
                </td> 
                <td class="title">
                    审核结束时间:
                </td>
                <td class="value">
                    <input id="sp_amc_finish_dat" readonly="true" class="easyui-textbox" style="width:100px;"/>  
                </td>
            </tr>
            <tr>
                <td class="title">
                    交审备注:
                </td>
                <td class="value">
                    <textarea id="sp_amc_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                        resize:none; width:402px; height:52px;"></textarea>  
                </td>  
            </tr>
        </table>
        
        <!--提成明细-->             
        <div class="easyui-panel cls_uncover"  data-options="title:'申报数据',border:false," style="height:480px;"> 
            <div id="od_uncover_list_bar">  
                
                <a href="javascript:clear_uncover_tab_fee_list_op();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a>
            </div>
            <table id="od_uncover_list"></table>
            <div id="uncover_columns_fliters"></div> 
        </div> 
        <div  class="custom_bg" style="  height:26px;  " >
            <div style="display:flex;height:100%;">
                <div style="flex:1">
                    <table class="cls_group_order_fee all_group_uncover"> 
                        <tbody>
                            <tr></tr>
                        </tbody>
                
                    </table>
                </div>
                <div style="flex:1;text-align:right;">
                    <table class="cls_group_order_fee selected_group_uncover"> 
                        <tbody>
                            <tr></tr>
                        </tbody>
                
                    </table>
                </div>
            </div>  
        </div>
        <div class="easyui-panel" id="panel_cover" data-options="title:'异常数据',border:false," style="min-height:80px;">
             
            <div id="od_cover_list_bar">   
                <a href="javascript:clear_cover_tab_fee_list_op();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a> 
            </div> 
            <table id="od_cover_list"></table> 
            <div id="cover_columns_fliters"></div> 
        </div>
        <div  class="custom_bg cover_od_div" style="  height:26px;  " >
            <div style="display:flex;height:100%;">
                <div style="flex:1">
                    <table class="cls_group_order_fee all_group_cover"> 
                        <tbody>
                            <tr></tr>
                        </tbody>
                
                    </table>
                </div>
                <div style="flex:1;text-align:right;">
                    <table class="cls_group_order_fee selected_group_cover"> 
                        <tbody>
                            <tr></tr>
                        </tbody>
                
                    </table>
                </div>
            </div>  
        </div>  
                     
        <!--审核-->
        <div class="easyui-panel" id="my_approval_adivce" data-options="title:'审核意见',border:false," style="overflow:hidden;">
            <table class="tab_std" style="width:640px">
                <col style="width:12%"/>
                <col style="width:44%;" />
                <col style="width:44%;" />
                <tr>
                    <td class="title">意见:</td>
                    <td class="value" colspan="2">
                        <textarea id="ed_ap_context"   class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                resize:none; width:518px; height:40px;"></textarea> 
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
            <table class="tab_std" id="ap_flow_details" style="padding:5px; margin-right:25px;width:610px;">
                <col style="width:20%"/>
                <col style="width:14%"/>
                <col style="width:46%"/>
                <col style="width:20%"/>
                <tbody>

                </tbody>
            </table>
        </div> 
                    
            
    </div>
     
      
     
</body> 
