<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_create_hr_commit_profit_frame.aspx.cs" Inherits="ZLHYWL.template_create_hr_commit_profit_frame" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_order_info_frame.css" rel="stylesheet" />
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>

<script src="Js/template_create_hr_commit_profit_frame.js"></script>
<body style="width:100%;height:100%; overflow:hidden;padding:0px; margin:0px;">

    
    <div id="main_layout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north',border:false" class="custom_bg">
            <table class="tab_std">
                <col style="width:80px;" />
                <col style="width:130px;" />
                
                <col style="width:80px;" />
                <col style="width:310px;" />
                
                <tr>
                    <td class="title">开始时间:</td>
                    <td class="value">
                        <input id="rel_beg_dat" type="text" readonly="readonly" class="easyui-textbox" style="width:120px;" /> 
                    </td>
                    <td class="title">申请备注:</td>
                    <td class="value" rowspan="2">
                        <textarea id="amc_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                    resize:none; width:96%; height:48px;"></textarea> 
                    </td>
                    <td> 
                        <a href="javascript:refresh_tab();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406015709810_easyicon_net_16'">重新获取</a>
                    </td>

                    
                </tr>
                <tr>
                    <td class="title">结束时间:</td>
                    <td class="value"> 
                        <input id="rel_end_dat" type="text" readonly="readonly" class="easyui-textbox" style="width:120px;" />
                    </td>
                    <td></td>
                    <td><a href="javascript:create_hr_commit_profit();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">提交申请</a></td>
                </tr>
            </table>
        </div>

        <div data-options="region:'center',border:false">
            <div id="tabs_amc" class="easyui-tabs" data-options="fit:true,border:false,">
                <div title="申报数据">
                    <div class="easyui-panel" data-options="fit:true, border:false">
                        <div class="easyui-layout" data-options="fit:true">
                            <div data-options="region:'center',split:false,border:false"  class="cls_uncover"  style="  height:26px;  " >
                                <div id="od_uncover_list_bar">  
                                    <a href="javascript:remove_uncover_data();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">移除</a>
                                    <a href="javascript:clear_uncover_tab_fee_list_op();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a>
                                </div>
                                <table id="od_uncover_list"></table>
                                <div id="uncover_columns_fliters"></div>
                            </div>
                            <div data-options="region:'south',split:false,border:false" class="custom_bg" style="  height:26px;  " >
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
                        </div> 
                    </div>
                </div>
                <div title="移除数据">
                    <div class="easyui-panel" data-options="fit:true, border:false">

                        <div class="easyui-layout" data-options="fit:true">
                            <div data-options="region:'center',split:false,border:false"  class="cls_uncover_remove"  style="  height:26px;  " >
                                <div id="od_uncover_remove_list_bar">  
                                    <a href="javascript:return_uncover_data();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-arrow_undo'">恢复</a>
                                    <a href="javascript:clear_uncover_remove_tab_fee_list_op();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a> 
                                </div> 
                                <table id="od_uncover_remove_list"></table> 
                                <div id="uncover_remove_columns_fliters"></div>
                            </div>
                            <div data-options="region:'south',split:false,border:false" class="custom_bg" style="  height:26px;  " >
                                <div style="display:flex;height:100%;">
                                    <div style="flex:1">
                                        <table class="cls_group_order_fee all_group_uncover_remove"> 
                                            <tbody>
                                                <tr></tr>
                                            </tbody>
                
                                        </table>
                                    </div>
                                    <div style="flex:1;text-align:right;">
                                        <table class="cls_group_order_fee selected_group_uncover_remove"> 
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
                <div title="异常数据">
                    <div class="easyui-panel" data-options="fit:true, border:false">
                        <div class="easyui-layout" data-options="fit:true">
                            <div data-options="region:'center',split:false,border:false"  class="cls_cover"  style="  height:26px;  " >
                                <div id="od_cover_list_bar">   
                                    <a href="javascript:clear_cover_tab_fee_list_op();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a> 
                                </div> 
                                <table id="od_cover_list"></table> 
                                <div id="cover_columns_fliters"></div>
                            </div>
                            <div data-options="region:'south',split:false,border:false" class="custom_bg" style="  height:26px;  " >
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
                        </div>
                         
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
    
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="账单明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
    <!--账单审核提交 选择 审核人-->
    <div class="easyui-dialog" id="dlg_post_hr_commit_profit_amc">
        <div class="dv_od_lock_tips">
           操作提示: 如有异常数据，提交申请后，异常数据将会显示给审核人查看。 提成申请提交审核后， 如需要退回修改，只能撤销后再次提交。
        </div>
        <div>
            <table class="tab_std">
                <col style="width:18%"/>
                <col style="width:72%"/>
                <col style="width:10%"/> 
                <tr>
                    <td>审核人:</td>
                    <td colspan="2">
                        <select id="dlg_start_schema_point" class="easyui-combobox" data-options="panelHeight:'auto', valueField:'value', 
                                        textField:'label',filter: filterCombo,width:245" ></select> 
                    </td>
                </tr>
                <tr>
                    <td valign="top">审核备注:</td>
                
                    <td colspan="2">
                         <textarea id="dlg_ap_context" placeholder="请填写有助于审核操作信息"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:245px; height:60px;"></textarea>
                    </td>
                </tr>
            </table>
        </div>
    </div>

</body>
 
