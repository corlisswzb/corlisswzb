<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_pay_checkaccount_info_frame.aspx.cs" Inherits="SDZL.template_pay_checkaccount_info_frame" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_order_info_frame.css" rel="stylesheet" />
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>
<script src="Js/template_pay_checkaccount_info_frame.js"></script>
<body style="width:100%;height:100%; overflow:hidden; padding:0px; margin:0px;">
     
     <!--账单费用查看-->
    
        <!-- 先左右结构 左边 账单基本信息，右边是审核信息 --->
        <!--账单基本信息-->
     <div id="tabs_amc" class="easyui-tabs" data-options="fit:true,border:false,">
        <div title="申请基本情况">
            <div class="easyui-panel" data-options="fit:true, border:false">
                 
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
                            <textarea id="sp_amc_title"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                resize:none; width:402px; height:52px;"></textarea>  
                        </td>  
                    </tr>
                    <tr>
                        <td class="title">
                            审核编号:
                        </td>
                        <td class="value">
                            <input id="sp_relation_no" readonly="true" class="easyui-textbox" style="width:100px;"/> 
                        </td>
                        <td class="title">
                            审核状态:
                        </td>
                        <td class="value">
                            <input id="sp_amc_status_desc" readonly="true" class="easyui-textbox" style="width:100px;"/>   
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            申请单位:
                        </td>
                        <td class="value" colspan="3">
                            <input id="sp_relation_c_desc" readonly="true" class="easyui-textbox" style="width:402px;"/>  
                        </td>
                    </tr> 
                    <tr>
                        <td class="title">
                            收款单位:
                        </td>
                        <td class="value" colspan="3">
                            <input id="sp_relation_cu_desc" readonly="true" class="easyui-textbox" style="width:402px;"/>  
                        </td> 
                    </tr> 
                    <tr>
                        <td class="title">
                            请款总金额:
                        </td>
                        <td class="value" colspan="3">
                            <input id="sp_fee_total" readonly="true" class="easyui-textbox" style="width:402px;"/> 
                        </td> 
                    </tr> 
                    <tr>
                        <td class="title">
                            已支付金额:
                        </td>
                        <td class="value" colspan="3">
                            <input id="sp_fee_total_finaced" readonly="true" class="easyui-textbox" style="width:402px;"/>  
                        </td> 
                    </tr> 
                    <tr>
                        <td class="title">
                            未支付金额:
                        </td>
                        <td class="value" colspan="3">
                            <input id="sp_fee_total_unfinaced" readonly="true" class="easyui-textbox" style="width:402px;"/>  
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            交账人员:
                        </td>
                        <td class="value">
                            <input id="sp_ca_actual_user_desc" readonly="true" class="easyui-textbox" style="width:402px;"/>   
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
        </div>
        <div title="费用明细"> 
            <div class="easyui-panel" data-options="fit:true, border:false">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'center',split:false,border:false">
                        <div class="easyui-panel cls_ca_region" data-options="fit:true,border:false"  >
                            <div id="tab_fee_list_of_ca_bar">
                                <table> 
                                    <tr>
                                
                                        <td>
                                           <a href="javascript:clear_query_tab_fee_list_params();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-arrow_refresh'">清空条件</a> 
                                        </td>
                                
                                    </tr>
                                </table>
                            </div>
                            <table id="tab_fee_list_of_ca"></table>
                        </div>
                    
                
                     </div>
                    <div data-options="region:'south',split:false,border:false" class="custom_bg" style="height:26px; " >
                       <div style="display:flex;height:100%;">
                           <div style="flex:1">
                                <table class="cls_group_order_fee all_group_order_fee_of_ca"> 
                                    <tbody>
                                        <tr></tr>
                                    </tbody>
                
                                </table>
                            </div>
                            <div style="flex:1;text-align:right;">
                                <table class="cls_group_order_fee selected_group_order_fee_of_ca"> 
                                    <tbody>
                                        <tr></tr>
                                    </tbody>
                
                                </table>
                            </div>
                       </div>  
                    </div> 
                </div>
            </div>
        </div>   
    </div>
    <div id="columns_fliters"></div> 
	 
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="账单明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
</body>
 