<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_order_change_plan.aspx.cs" Inherits="Jbfd.template_order_change_plan" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_order_info_frame.css" rel="stylesheet" />
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>
<script src="Js/template_order_change_plan.js"></script>

<body style="width:100%;height:100%; overflow:hidden;  padding:0px; margin:0px;">
    
    <div id="main_layout" data-options="fit:true" class="easyui-layout" >
        <div data-options="region:'north',border:false,split:true" class="custom_bg" style="height:26px;padding:0px;  border:none;">
            <div id="tab_fee_old_list_bar">
                <a  href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'#mm_add',iconCls:'icon-add'">新增</a>
                <div id="mm_add" style="width:120px;">
	                <div onclick="javascript:insert_new_rec();">应收</div>
	                <div onclick="javascript:insert_new_pay();">应付</div> 
                </div>
                <a  href="javascript:delete_fee();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">删除</a>
                <a  href="javascript:update_fee();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">修改</a>
                <a  href="javascript:begin_create_changeorder_plan();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-report_user'">提交改单申请</a>  
            </div>
        </div>
        <div data-options="region:'center',border:false,split:true"  >
            
            <div class="easyui-panel" data-options="border:false,fit:true,
                title:'原费用明细&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注: 1.对单一费用修改和删除操作只能执行一次。'"> 
                <div  data-options="fit:true" class="easyui-layout" >
                    <div data-options="region:'center',border:false,split:false">
                        <div data-options="fit:true,title:'',border:false" class="easyi-panel">
                            <table id="tab_fee_list_of_old_rp"></table>
                        </div>
                        
                    </div>
                    <div data-options="region:'south',border:false,split:false"  class="custom_bg" style="height:26px;padding:0px 15px; font-weight:bold; line-height:26px;  border:none;">
                        <span id="rec_group_fee_desc">

                        </span>
                    </div>
                </div>
                
            </div>
        </div>
        <div data-options="region:'south',border:false,split:true" style="height:350px;">
            <div class="easyui-panel" data-options="border:false,title:'修改内容',fit:true">   
                
                
                    <div id="tab_fee_list_of_new_rp_bar">
                        <a id="lbtn_delrow" href="javascript:delete_table_row();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_delete'">删除费用</a>
                  
                    </div>
                    <table id="tab_fee_list_of_new_rp"></table>
                 
            </div>   
        </div>
    </div>   
     <!--新增应付 选择服务批次对话框-->
    <div id="dlg_insert_pay" class="easyui-dialog">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',border:false,split:false," class="custom_bg" style="height:28px;line-height:28px; padding-left:20px; font-size:14px; border-bottom:solid 1px #95b8e7;">
                <div>应付费用新增，需要选择服务商和批次。</div> 
            </div>
            <div data-options="region:'center',border:false,split:false">
                <table id="dlg_choise_service_sub_list"></table>
            </div>
        </div> 
         
    </div>
    <!--改单审核提交 选择 审核人-->
    <div class="easyui-dialog" id="dlg_post_cop_amc" data-options="closed:true">
        <div class="dv_od_lock_tips" >
             你确定要提交改单审核吗？
        </div>
        <div>
            <table  class="tab_std">
                <col style="width:15%" />
                <col style="width:83%" />
                <tr>
                    <td>审核人:</td>
                    <td>
                        <select id="dlg_cop_schema_point" class="easyui-combobox" data-options="panelHeight:'auto', valueField:'value', 
                                        textField:'label',filter: filterCombo,width:146" ></select> 
                    </td>
                </tr>
                <tr>
                    <td class="title">备注:</td>
                    <td class="value">
                         <textarea id="dlg_cop_ap_context"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                    resize:none; width:90%; height:68px;"></textarea> 
                    </td>
                </tr>
            </table>
        </div>
    </div>     
</body>
 
