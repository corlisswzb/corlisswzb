<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_amc_pay_for_bus_of_focus.aspx.cs" Inherits="Jbfd.template_amc_pay_for_bus_of_focus" %>


<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
  
<link href="Style/checkaccount.css" rel="stylesheet" />
 
<link href="Style/public.css" rel="stylesheet" /> 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>  
 
<script src="Js/template_amc_pay_for_bus_of_focus.js"></script> 
<body style="width:100%;height:100%; overflow:hidden;  padding:0px; margin:0px;"> 
    <div class="easyui-layout" data-options="fit:true" style="padding:0px">
        <div data-options="region:'north',split:false,border:false" class="custom_bg" style="border-bottom:solid 1px #95b8e7;height:32px;"> 
            <table class="tab_std" style="width:auto;  ">
                <tr> 
                    <td >
                        <a href="javascript:show_win_of_group_ca(6);" tabindex="1" class="easyui-linkbutton top_group_menu" data-options="plain:true,iconCls:'icon-query'">审核中</a> 
                    </td> 
                    <td>
                        <a href="javascript:show_win_of_group_ca(7);" tabindex="1" class="easyui-linkbutton top_group_menu"  data-options="plain:true,iconCls:'icon-query'">过审待付</a> 
                    </td>               
                    <td>
                        <a href="javascript:clear_tab_ca_list_op();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406015709810_easyicon_net_16'">清空所有筛选</a> 
                    </td> 
                   
                </tr>
            </table> 
        </div>
        <div class="cls_cap_region" data-options="region:'center',split:false,border:false">
                                
            <div id="tab_cap_list_bar">  
                <a href="javascript:query_ca_of_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查看费用明细</a> 
                <a href="javascript:delete_cap_to_amc();" tabindex="1" class="easyui-linkbutton remove_part" data-options="plain:true,iconCls:'icon-build_cancel'">撤销审核</a> 
                <a href="javascript:alert_cap_to_amc();" tabindex="1" class="easyui-linkbutton remove_part" data-options="plain:true,iconCls:'icon-user_alert'">加急审核</a> 
                <a href="#" class="easyui-menubutton" data-options="menu:'#mm_print_cap',iconCls:'icon-print'">打印</a>
              
                <div id="mm_print_cap" style="width:100px;">
		            <div onclick="javascript:print_cap_head();" data-options="iconCls:'icon-lock_go'">仅审核单</div>
		            <div onclick="javascript:print_cap_body();" data-options="iconCls:'icon-lock_delete'">仅费用明细</div> 
                    <div onclick="javascript:print_cap_all();" data-options="iconCls:'icon-lock_delete'">审核单和费用明细</div> 
	            </div>
                <a href="javascript:view_write_off_accounts_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table'">付款销账记录</a> 
                <a href="javascript:view_flag_invoice_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table'">付款发票记录</a> 
                 
            </div>
            <table id="tab_cap_list"></table>
            
        </div>
        <div data-options="region:'south',split:false,border:false" class="custom_bg" style=" height:26px;  " >
            <div style="display:flex;height:100%;">
                <div style="flex:1">
                    <table class="cls_group_order_fee all_group_cap_fee"> 
                        <tbody>
                            <tr></tr>
                        </tbody> 
                    </table>
                </div>
                <div style="flex:1;text-align:right;">
                    <table class="cls_group_order_fee selected_group_cap_fee"> 
                        <tbody>
                            <tr></tr>
                        </tbody>
                
                    </table>
                </div>
            </div>  
        </div>
    </div> 
    <div id="columns_fliters"></div>
    <!--账单费用查看-->
    <div id="win_woa_or_iv_order_fee" class="easyui-window"   title="" data-options="modal:false,inline:true,shadow:false,  closed:true,closeable:false, iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px;">
		 
	</div>
    <!--核销记录-->
    <div id="window_of_write_off_accounts" class="easyui-window"   title="账单明细" data-options="modal:false,inline:true,shadow:false,  closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	    
    </div>
    <!--发票记录-->
    <div id="window_of_flag_invoice_list" class="easyui-window"   title="" data-options="modal:false, inline:true,shadow:false, closed:true,iconCls:'icon-save', fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	    
    </div>
     <!--CY 合同关联费项 编辑菜单-->
    <div id="win_dv_view_of_approval_details_from_ca_list" class="easyui-menu" style="width: 240px;   display: none;">  
       <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_approval_details_from_ca_list()">查看账单审核流程</div>   
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_bank_info_from_ca_list()">查看账单结算单位银行信息</div>
       
    </div> 

     
     <!--撤销审核计划-->
    <div class="easyui-dialog" id="dlg_delete_pay_checkaccount_amc">
         
        <table class="tab_std">
            <col style="width:20%" />
            <col style="width:80%" />
            <tr>
                <td colspan="2" class="custom_bg" style=" padding:12px;line-height:22px;color:#f9534f">
                    撤销审核计划
                </td>
            </tr>
            <tr>
                <td class="title">撤销理由:</td>
                <td class="value">
                     <textarea id="dlg_ap_context_of_delete"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:99%; height:68px;"></textarea> 
                </td>
            </tr>
        </table>
        
    </div>

    
</body>
 
