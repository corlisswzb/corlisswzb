<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_hedge_off_accounts_info_frame.aspx.cs" Inherits="Jbfd.template_hedge_off_accounts_info_frame" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_order_info_frame.css" rel="stylesheet" />
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>
<script src="Js/template_hedge_off_accounts_info_frame.js"></script>
<body style="width:100%;height:100%;  overflow-y:auto; padding:0px; margin:0px;">
     <div class="easyui-panel" data-options="title:'计划基本信息',border:false">
        <table class="tab_std" style="width:1000px;">
            <col style="width:9%"/>
            <col style="width:12%"/>
            <col style="width:3%"/>
            <col style="width:24%"/>
            <col style="width:9%"/>
            <col style="width:14%"/>
            <col style="width:9%"/>
            <col style="width:14%"/>
            <tr>
                <td class="title">
                    标题:
                </td>
                <td class="value" colspan="3">
                    <input id="sp_hoa_title" readonly="true" class="easyui-textbox" style="font-weight:bold;width:400px;"/> 
                </td> 
                <td class="title">
                    审核状态:
                </td>
                <td class="value">
                    <input id="sp_amc_status_desc" readonly="true" class="easyui-textbox" style="font-weight:bold;width:100px;"/>   
                </td>
                <td class="title">
                    计划状态:
                </td>
                <td class="value">
                    <input id="sp_hoa_status_desc" readonly="true" class="easyui-textbox" style="font-weight:bold;width:100px;"/> 
                </td>
            </tr>
            <tr>
                <td class="title">应收未销(本币):</td>
                <td class="value">
                    <input style="font-weight:bold;width:80px;" class="easyui-textbox" readonly="true" id="sh_hoa_rec_total_money"  />
                </td>
                <td class="title">明细:</td>
                <td class="value" >
                    <input style="font-weight:bold;width:238px;" class="easyui-textbox" readonly="true" id="sh_hoa_rec_currency_group_desc" />
                </td> 
                <td class="title">
                    审核发起:
                </td>
                <td class="value">
                    <input id="sp_amc_create_by_nam" readonly="true" class="easyui-textbox" style="font-weight:bold;width:100px;"/>   
                </td> 
                <td class="title">
                    当前审核:
                </td>
                <td class="value">
                    <input id="sp_amc_cur_opr_nam" readonly="true" class="easyui-textbox" style="font-weight:bold;width:100px;"/> 
                </td>  
            </tr> 
            <tr>
                <td class="title">应付未销(本币):</td>
                <td class="value">
                    <input style="font-weight:bold;width:80px;" id="sh_hoa_pay_total_money" class="easyui-textbox" readonly="true"/>
                </td>
                <td class="title">明细:</td>
                <td class="value" >
                    <input style="font-weight:bold;width:238px;" id="sh_hoa_pay_currency_group_desc" class="easyui-textbox" readonly="true" />
                </td>  
                                    
                <td class="title">
                    审核发起时间:
                </td>
                <td class="value">
                    <input id="sp_amc_create_dat" readonly="true" class="easyui-textbox" style="font-weight:bold;width:100px;"/> 
                </td> 
                <td class="title">
                    审核结束时间:
                </td>
                <td class="value">
                    <input id="sp_amc_finish_dat" readonly="true" class="easyui-textbox" style="font-weight:bold;width:100px;"/>  
                </td>
            </tr>
            <tr>
                <td class="title">差额(本币):</td>
                <td class="value">
                    <input style="font-weight:bold;width:80px;" id="sh_hoa_diff_total_money" class="easyui-textbox" readonly="true"/>
                </td>
                <td class="title">明细:</td>
                <td class="value" >
                    <input style="font-weight:bold;width:238px;" id="sh_hoa_diff_currency_group_desc" class="easyui-textbox" readonly="true" />
                </td>  
                                    
                 
            </tr>
        </table>
    </div>
    <div class="easyui-panel" data-options="title:'应收费用',border:false,"> 
                                 
        <div id="tab_fee_list_of_hoa_rec_bar">
            <table> 
                <tr> 
                    <td>记录人:</td>
                    <td>
                        <select id="mulit_search_record_by_id_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                    <td>费项:</td>
                    <td>
                        <select id="mulit_search_fee_item_typ_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                    <td>发票:</td>
                    <td>
                        <select id="mulit_search_fee_invoice_typ_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                    <td>单位:</td>
                    <td>
                        <select id="mulit_search_fee_unit_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                    <td>币种:</td>
                    <td>
                        <select id="mulit_search_fee_currency_id_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                </tr>
            </table>
        </div>
        <table id="tab_fee_list_of_hoa_rec"></table>
                      
                                   
        <div style="display:flex;height:26px;">
            <div style="flex:1">
                <table class="cls_group_order_fee all_group_order_fee_rec"> 
                    <tbody>
                        <tr></tr>
                    </tbody>
                
                </table>
            </div> 
        </div>  
    </div>

    <div class="easyui-panel" data-options="title:'应付费用',border:false,"> 
                            
        <div id="tab_fee_list_of_hoa_pay_bar">
            <table> 
                <tr>
                                                 
                    <td>记录人:</td>
                    <td>
                        <select id="mulit_search_record_by_id_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                    <td>费项:</td>
                    <td>
                        <select id="mulit_search_fee_item_typ_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                    <td>发票:</td>
                    <td>
                        <select id="mulit_search_fee_invoice_typ_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                    <td>单位:</td>
                    <td>
                        <select id="mulit_search_fee_unit_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                    <td>币种:</td>
                    <td>
                        <select id="mulit_search_fee_currency_id_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                    </td>
                </tr>
            </table>
        </div>
        <table id="tab_fee_list_of_hoa_pay"></table>
                                 
        <div style="display:flex;height:26px;">
            <div style="flex:1">
                <table class="cls_group_order_fee all_group_order_fee_pay"> 
                    <tbody>
                        <tr></tr>
                    </tbody>
                
                </table>
            </div> 
        </div>  
    </div> 
     <!--账单费用查看-->
     
        <!-- 先左右结构 左边 账单基本信息，右边是审核信息 --->
        <!--账单基本信息-->
        
           
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
    <div class="easyui-panel" data-options="title:'审核流水',border:false," style="padding:2px; padding-right:20px; margin-bottom:160px;">
        <table class="tab_std" id="ap_flow_details" style="padding:5px; margin-right:25px;width:610px;">
            <col style="width:20%"/>
            <col style="width:14%"/>
            <col style="width:46%"/>
            <col style="width:20%"/>
            <tbody>

            </tbody>
        </table>
    </div> 
           
      
          
                
                        
                  
                        
                   
                  
                        
             
     
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="账单明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
</body>
