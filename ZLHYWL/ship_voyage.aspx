<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="ship_voyage.aspx.cs" Inherits="SDZL.ship_voyage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" />
    <link href="Style/order.css" rel="stylesheet" />
    <style>
        .cls_group_order_fee{ 
    table-layout:fixed; 
    width:auto;
}

.cls_group_order_fee td{
    line-height:24px;
    padding-left:4px;
    padding-right:4px;
    white-space: nowrap;
    
}

.cls_group_order_fee .cls_total_title{
    background:#73436f;
    color:#FFF;
}
.cls_group_order_fee .cls_total_value{
    font-weight:bold; 
    color:#73436f;
}

.cls_group_order_fee .cls_pay_title{
    background:#005624;
    color:#FFF;
}

.cls_group_order_fee .cls_pay_value{
    font-weight:bold;
    color:#005624; 
}

    </style>
    <script src="Js/ship_voyage.js"></script>
    <script src="Js/ship_cntr.js"></script>
    <script src="Js/ship_fee.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!--船期列表-->
    <div id="page_ship_voyage_list" class="easyui-panel" title=""   data-options="fit:true,border:false," >
        <div class="easyui-layout" data-options="fit:true" style="padding: 0px">
            <div data-options="region:'north',split:false,border:false" style="overflow:hidden;"> 
                <div class="easyui-panel custom_bg" data-options="fit:true,border:false, "   style=" border-bottom:solid 1px #95b8e7;" >
                    <table style="float:left;">
                        <tr>  
                            <td class="td_title">状态:
                            </td>
                            <td class="td_input">
                                <select id="search_status" class="easyui-combobox"
                                    data-options="panelHeight:'auto',width:80">
                                    <option checked value="">全部</option>
                                    <option value="1">计划中</option>
                                    <option value="2">已结束</option>
                                </select>
                            </td>
                            <td class="td_title">起航时间:
                            </td>
                            <td class="td_input">
                                <input id="search_etd_begin" class="easyui-datebox" data-options="width:110" />
                            </td>
                            <td class="td_title">-
                            </td>
                            <td class="td_input">
                                <input id="search_etd_end" class="easyui-datebox" data-options="width:110" />
                            </td>
                            <td class="td_title">船名:
                            </td>
                            <td class="td_input">
                                <select id="search_ship_id" class="easyui-combobox"
                                    data-options="valueField:'value', textField:'label', panelHeight:'200',filter: filterCombo,width:100">
                                </select>
                            </td> 
                            <td class="td_title">航次:
                            </td>
                            <td class="td_input" colspan="3">
                                <input id="search_voyage_no" autocomplete="off" class="easyui-textbox" placeholder="航次" style="width: 100px;  " />
                            </td>
                            <td class="td_title">航线:
                            </td>
                            <td class="td_input">
                                <select id="search_voyage_line" class="easyui-combobox"
                                    data-options="valueField:'value', textField:'label', panelHeight:'auto',filter: filterCombo,width:80">
                                </select>
                            </td>
                            

                            <td>
                                <a href="javascript:refresh_ship_voyage();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">查询</a>
                            </td>
                            <td>
                                <a href="javascript:new_ship_voyage();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新建船期</a>
                            </td>  
                        </tr>
                    </table>
                    <div style="float:right;height:100%; line-height:38px; padding-left:4px;padding-right:4px; border:solid 1px  #c3d9e0;">
                        <b>当前位置:船期列表</b>
                    </div>
                </div>
            </div>
            <div data-options="region:'center',split:false,border:false">
                <div class="easyui-panel" data-options="fit:true,border:false">
                    <table id="tab_ship_voyage"></table>
                </div> 
            </div>
            <div data-options="region:'south',split:false,border:false" style="background-color: #e4efff; height: 26px; overflow: hidden;">
                <div style="display: flex; height: 100%;">
                    <div style="flex: 1">
                        <table class="cls_group_order_fee all_group_ship_voyage_fee">
                            <tbody>
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="flex: 1; text-align: right;">
                        <table class="cls_group_order_fee selected_group_ship_voyage_fee">
                            <tbody>
                                <tr></tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>  

    <!--单个编辑-->
    <div class="easyui-panel" id="page_ship_voyage_edit" data-options="fit:true,border:false">
        <div  class="easyui-layout" fit="true">
            <div data-options="region:'north',title:'', " style="border-top:none;border-bottom:none;padding:0px; height:33px;" >
                <div class="easyui-panel custom_bg" fit="true"   style="padding:0px;border:none;">
                    <div class="dv_edit_order_menu_tab_back">
                        <a href="javascript:return_ship_voyage_list();" tabindex="1"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-bullet_left'" >返回列表</a>  
                    </div>
                    <div class="dv_edit_order_menu_tab dv_edit_order_menu_tab_focus" onclick="javascript:show_page_ship_base_info();">
                        航次信息
                    </div>
                    <div class="dv_edit_order_menu_tab dv_edit_order_more" onclick="javascript:show_page_ship_cntr_info();">
                        航次配载
                    </div>
                    <div class="dv_edit_order_menu_tab dv_edit_order_more" onclick="javascript:show_page_ship_fee_info();">
                        航次计费 
                    </div>
                    
                    <div class="dv_edit_order_menu_tab_right_title">
                        <span id="sh_cur_ship_voyage_desc"></span>
                    </div> 
                </div>
            </div>
            <div data-options="region:'center',title:'', " style="border-top:none;border-bottom:none;padding:0px;" >
                <!--航次信息-->
                <div  class="easyui-layout page_ship_base_info"  fit="true">
                    <div data-options="region:'center',split:true,title:'',border:false," style="padding:0px; margin:0px;"> 
                        <div  class="easyui-layout page_ship_base_info"  fit="true">
                            <div data-options="region:'center',split:true,title:'',border:true," style="padding:0px; margin:0px;"> 
                                <div class="easyui-panel cls_ship_cntr_group" data-options="fit:true,border:false">
                                    <div id="tab_ship_cntr_group_bar"> 
                                        <a href="javascript:clear_mulit_conditions_ship_cntr_group_search();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a>
                                    </div>
                                    <table id="tab_ship_cntr_group"> 
                                    </table>
                                </div>
                            </div>
                            <div data-options="region:'south',split:true,title:'',border:false," style="padding:0px; margin:0px;height:32px">
                                 <div class="easyui-panel custom_bg" data-options="fit:true,border:false">
                                     <div style="display:flex;height:100%;">
                                        <div style="flex:1">
                                            <table class="cls_group_order_fee single_group_ship_voyage_fee">
                                                <tbody>
                                                    <tr></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style="flex:1;text-align:right;">
                                            <table class="cls_group_order_fee selected_group_cntr"> 
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
                    <div data-options="region:'west',split:true,title:'',border:false, " style="width:550px;padding:0px;" >
                        <div class="easyui-layout" fit="true"> 
                            <div data-options="region:'north',split:false,title:'',border:false," style="height:250px;padding:0px;overflow:hidden;">  
                                <div class="easyui-panel" data-options="title:'航次基本信息',border:false,fit:true " style="padding:0px;overflow:hidden;">
                                    <div  style=" background-color:#f4f4f4; overflow:hidden; border-bottom:solid 1px #dddddd;"> 
                                        <a href="javascript:save_ship_voyage();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a> 
                                        <a href="javascript:delete_ship_voyage();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">删除</a> 
                                        <a href="javascript:close_ship_voyage();"  tabindex="1" class="easyui-linkbutton " data-options="plain:true,iconCls:'icon-tip'">关闭航次</a> 
                                    </div>
                                    <table class="tab_std" style="width:540px;">
                                        <col style="width:15%"/>
                                        <col style="width:35%"/>
                                        <col style="width:15%"/>
                                        <col style="width:35%"/> 
                                        <tr>
                                     
                                            <td class="title">航次状态:</td>
                                            <td class="value">
                                                <input id="ed_status_id" readonly="true" class="easyui-textbox" style="width:150px;" />
                                            </td>
                                        </tr>
                                   
                                        <tr>
                                            <td class="title"><span class="ipt_must">船</span>名:</td>
                                            <td class="value">
                                                <input id="ed_ship_id"   class="easyui-textbox" style="width:156px" />
                                            </td>
                                            <td class="title"><span class="ipt_must">船</span>代码:</td>
                                            <td class="value">
                                                <input readonly="true" id="ed_ship_en_cod" class="easyui-textbox" style="width:150px"/>
                                            </td>
                                      
                                        </tr>
                                        <tr> 
                                            <td class="title"><span class="ipt_must">船</span>东单位:</td>
                                            <td class="value" colspan="3">
                                                <input readonly="true" id="ed_ship_cu_id" class="easyui-textbox"  style="width:420px;" /> 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="title"><span class="ipt_must">航</span>次:</td>
                                            <td class="value">
                                                <input autocomplete="off" id="ed_voyage_no" class="easyui-textbox" style="width:150px"/>
                                            </td>
                                            <td class="title"><span class="ipt_must">航</span>线:</td>
                                            <td class="value">
                                                <select id="ed_vl_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:156" ></select>
                                            </td>
                                      
                                        </tr>
                                        <tr> 
                                            <td class="title"><span class="ipt_must">起</span>航时间(预):</td>
                                            <td class="value">
                                                <input id="ed_etd" class="easyui-datebox" data-options="width:156" />
                                            </td>
                                            <td class="title"><span class="ipt_must">抵</span>达时间(预):</td>
                                            <td class="value">
                                                <input id="ed_eta" class="easyui-datebox" data-options="width:156" />
                                            </td>
                                      
                                        </tr>
                                        <tr>
                                            <td class="title"><span class="ipt_must">起</span>运地:</td>
                                            <td class="value">
                                                <input id="ed_start_area_id" class="easyui-combobox" data-options="valueField:'value', textField:'label',filter: filterCombo,width:156" /> 
                                            </td>
                                            <td class="title"><span class="ipt_must">目</span>的地:</td>
                                            <td class="value">
                                                <input id="ed_end_area_id" class="easyui-combobox" data-options="valueField:'value', textField:'label',filter: filterCombo,width:156" /> 
                                            </td>
                                     
                                        </tr>

                                    </table>  
                                </div>  
                            </div>
                            <div data-options="region:'center',split:false,title:'',border:false, " style="padding:0px;" >
                                <div class="easyui-layout" fit="true"> 
                                    <div data-options="region:'center',split:false,title:'',border:false," style="padding:0px;overflow:hidden;">
                                        <div class="easyui-panel" data-options="title:'备注信息',fit:true,border:false" style="padding:0px; overflow:hidden;">
                                            <textarea id="ed_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto;border:none; 
                                                    resize:none; width:99%; height:99%;"></textarea> 
                                        </div>
                                    </div> 
                                </div>
                            </div>          
                        </div>
                    </div>
                </div>
                <!--航次配载集装箱-->
                <div class="easyui-layout page_ship_cntr_info"  fit="true"> 
                    <div data-options="region:'center',split:true,title:'',border:false," style="padding:0px; margin:0px;"> 
                        <div id="dv_ship_cntr_tab" data-options="fit:true,border:false,title:'集装箱实配'" class="easyui-panel cls_ship_cntr">
                            <div id="tab_ship_cntr_bar">
                                <a href="javascript:remove_ship_cntr();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">删除</a>
                                <a href="#" id="down_custom_cntr_menubutton" class="easyui-menubutton" data-options=" iconCls:'icon-20130406125519344_easyicon_net_16'">客户水路集装箱货运单</a>
                                <a href="javascript:clear_mulit_conditions_ship_cntr_search();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a>
                            </div>
                            <table id="tab_ship_cntr"></table>
                        </div> 
                    </div>
                    <div data-options="region:'south',split:true,title:'',border:false," style="padding:0px; margin:0px;height:32px">
                        <div class="easyui-panel custom_bg" data-options="fit:true,border:false">
                            <div style="display:flex;height:100%;">
                                <div style="flex:1">
                                    <table class="cls_group_order_fee single_ship_voyage_group_cntr">
                                        <tbody>
                                            <tr></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style="flex:1;text-align:right;">
                                    <table class="cls_group_order_fee selected_cntr"> 
                                        <tbody>
                                            <tr></tr>
                                        </tbody> 
                                    </table>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div> 
                <!--航次计费-->
                <div class="easyui-layout page_ship_fee_info" fit="true"> 
                    <div data-options="region:'center',split:true,title:'',border:false," style="padding:0px; margin:0px;"> 
                        <div id="dv_ship_fee_tab" data-options="fit:true,border:false,title:'集装箱实配'" class="easyui-panel cls_ship_fee">
                            <div id="tab_ship_fee_bar">
                                <a href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'#mm_down_remove_fee',iconCls:'icon-remove'">解绑删除</a>  
                                <div id="mm_down_remove_fee" style="width:150px;"> 
                                    <div onclick="javascript:remove_fee();" data-options="iconCls:'icon-delete'">删除费用</div>  
		                            <div onclick="javascript:unbind_fee();" data-options="iconCls:'icon-link_delete'">解除费用绑定</div>  
	                            </div>
                                
                                <a href="javascript:clear_mulit_conditions_ship_fee_search();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a>
                            </div>
                            <table id="tab_ship_fee"></table>
                        </div> 
                    </div>
                    <div data-options="region:'south',split:false,border:false" class="custom_bg" style="  height:26px; " >
                        <div style="display:flex;height:100%;">
                            <div style="flex:1">
                                <table class="cls_group_order_fee all_group_order_fee"> 
                                    <tbody>
                                        <tr></tr>
                                    </tbody>
                
                                </table>
                            </div>
                            <div style="flex:1;text-align:right;">
                                <table class="cls_group_order_fee selected_group_order_fee"> 
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
    <div id="columns_fliters_of_ship_cntr_group"></div>
    <div id="columns_fliters_of_cntr"></div>
    <div id="columns_fliters_of_fee"></div> 
     

    <!--FIO自动计费结果展示 基本是错误结果-->
    <div id="dlg_ship_cntr_auto_create_fio_details_result_list" class="easyui-dialog" data-options="closed:true">
        <table id="tab_ship_cntr_auto_create_fio_details_result_list">
        </table>
    </div>
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="账单明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
    <!--CY 翻舱对话框 -->
    <div id="dlg_insert_cy_contract_details_2" class="easyui-dialog" data-options="closed:true">
        <form id ="dlg_insert_cy_contract_details_2_form"> 
		    <table class="tab_from">
                <col style="width:15%"/>
                <col style="width:35%"/>
                <col style="width:10%"/>
                <col style="width:15%"/> 
                <col style="width:10%"/>
                <col style="width:15%"/>
                <tr>
                    <td colspan="6" class="row_title">翻仓计费</td>
                </tr>
                <tr>
                    <td class="title">
                        翻舱码头:
                    </td>
                    <td class="value">
                        <select class="easyui-combobox"  id="dlg_isccd4_port_id"   data-options=" panelHeight:'150',   valueField:'value', textField:'label',filter: filterCombo,width:158"></select>
                    </td>  
                </tr>
                <tr>
                    <td class="title">
                        尺寸:
                    </td>
                    <td class="value">
                        <select class="easyui-combobox"  id="dlg_isccd4_eqp_siz"   data-options=" panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:158">
                            <option value="20" >20</option>
                            <option value="40" checked>40</option>
                            <option value="45" checked>45</option>
                        </select>
                    </td>
                    <td class="title">
                        舱内/外:
                    </td>
                    <td class="value">
                        <select class="easyui-combobox"  id="dlg_isccd4_in_or_out"   data-options=" panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:158">
                            <option value="IN" >舱内</option>
                            <option value="OUT" checked>舱外</option>
                        </select>
                    </td> 
                </tr>  
                <tr>
                    <td colspan="6" class="row_title" style="background-color:#1bc100;color:#fff;">付费明细</td>
                </tr> 
                <tr class="isccd4_pay" > 
                    <td class="title ">
                        付费对象:
                    </td>
                    <td class="value">
                        <select class="easyui-combobox"  id="dlg_isccd4_pay_fee_cu_id"   data-options=" panelHeight:'150',valueField:'value', textField:'label',filter: filterCombo,width:158"></select>
                    </td>
                    <td class="title">
                        箱次:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="number"  id="dlg_isccd4_pay_fee_number" style="width:60px;"   />
                    </td>
                    <td class="title">
                        单价:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="number"  id="dlg_isccd4_pay_fee_val" style="width:60px;"   />
                    </td>
                </tr>
		    </table>
            
        </form> 
	</div>
</asp:Content>
