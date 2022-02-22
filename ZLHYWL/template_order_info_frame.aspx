<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_order_info_frame.aspx.cs" Inherits="SDZL.template_order_info_frame" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_order_info_frame.css" rel="stylesheet" />
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>

<script src="Js/template_order_info_frame.js"></script>
<body style="width:100%;height:100%; overflow:hidden;padding:0px; margin:0px;">
    <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'center',border:false,split:true">
            <!-- 订单信息 
                订单信息 主体只有 委托基本信息和货物信息、费用信息 
                    集装箱信息 和 供应商 服务 做弹出式显示 
                --> 
            <div class="easyui-panel" data-options="toolbar:'tm_bar', fit:true,title:'订单信息',border:false" style="padding:0px;  border:none; overflow-x:hidden;overflow-y:auto">
                <div style="height:524px;"> 
                    <div class="easyui-layout" data-options="fit:true">
                        <div data-options="region:'center',split:true,border:false">
                            
                            <div class="easyui-layout" data-options="fit:true">
                                <div data-options="region:'center',split:true,border:false">
                                    <!--审核-->
                                    <div class="easyui-panel" id="my_approval_adivce" data-options="title:'审核意见',border:false,">
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
                                    <div class="easyui-panel" data-options="title:'审核流水',border:false," style="padding:2px; padding-right:20px;">
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
                                <div data-options="region:'south',split:true,border:false" style="height:246px;">
                                    <div class="easyui-panel" data-options="title:'集装箱及提单信息信息',border:false,fit:true">
                                        <table class="tab_std" style="width:640px;">
                                            <col style="width:12%"/>
                                            <col style="width:21%"/>
                                            <col style="width:12%"/>
                                            <col style="width:21%"/> 
                                            <col style="width:12%"/>
                                            <col style="width:22%"/>
                                            <tr> 
                                                <td class="title">主提单:</td>
                                                <td class="value" colspan="5">
                                                    <textarea id="ed_od_main_bill_no" readonly="true" class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                            resize:none; width:518px; height:40px;"></textarea>  
                                                </td> 
                                            </tr>  
                                            <tr>
                                                <td class="title">子提单:</td>
                                                <td class="value" colspan="5">
                                                    <textarea id="ed_od_sub_bill_no" readonly="true" class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                            resize:none; width:518px; height:40px;"></textarea>  
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="title">箱量描述:</td>
                                                <td class="value" colspan="4">
                                                    <input id="ed_od_group_cntr_desc" readonly="true" class="easyui-textbox" style=" width:378px; " />
                                                </td> 
                                                <td class="value">
                                                    <a href="javascript:view_all_order_cntr_info();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-application_view_list'"> 箱明细..</a>
                                                </td>
                                            </tr>
                                            <tr> 
                                                <td class="title">提单类型:</td>
                                                <td class="value">
                                                    <input id="ed_od_bill_typ" readonly="true" class="easyui-textbox" style="width:100px;"/>
                                                </td>
                                                <td class="title">签单方式:</td>
                                                <td class="value">
                                                    <input id="ed_od_sign_bill_typ" readonly="true" class="easyui-textbox" style="width:100px;"/> 
                                                </td> 
                                                <td class="title">报关报检:</td>
                                                <td class="value">
                                                    <input id="ed_od_declare_customs_typ" readonly="true" class="easyui-textbox" style="width:100px;"/>  
                                                </td> 
                                            </tr> 
                                            <tr> 
                                                <td class="title">联运方式:</td>
                                                <td class="value">
                                                    <input id="ed_od_carriage_typ" readonly="true" class="easyui-textbox" style="width:100px;"/>
                                                </td>
                                                <td class="title">装箱方式:</td>
                                                <td class="value">
                                                    <input id="ed_od_stuffing_container_typ" readonly="true" class="easyui-textbox" style="width:100px;"/>
                                                </td>
                                                <td class="title">场所:</td>
                                                <td class="value">
                                                    <input id="ed_od_stuffing_container_place" readonly="true" class="easyui-textbox" style="width:100px;"/>
                                                </td>
                                            </tr> 
                                            <tr> 
                                                <td class="title">入场时间:</td>
                                                <td class="value">
                                                    <input id="ed_od_entry_tim_of_stuffing" readonly="true" class="easyui-textbox" style="width:100px;"/>
                                                </td>
                                                <td class="title">出场时间:</td>
                                                <td class="value">
                                                    <input id="ed_od_out_tim_of_stuffing" readonly="true" class="easyui-textbox" style="width:100px;"/>
                                                </td> 
                                            </tr> 
                                        </table>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div data-options="region:'west',split:true,border:false" style="width:624px; overflow:hidden">
                            <table class="tab_std" style="width:640px;">
                                <col style="width:12%"/>
                                <col style="width:21%"/>
                                <col style="width:12%"/>
                                <col style="width:21%"/> 
                                <col style="width:12%"/>
                                <col style="width:22%"/>
                                <tr>
                                    <td class="title">业务编号:</td>
                                    <td class="value">
                                        <input id="ed_od_no" readonly="true" class="easyui-textbox" style="width:100px;" />
                                    </td>
                                    <td class="title"><span class="ipt_must">业</span>务时间:</td>
                                    <td class="value">
                                        <input id="ed_od_fee_dat" readonly="true" class="easyui-textbox" style="width:100px;" />
                                    </td>
                                    <td class="title">状态:</td>
                                    <td class="value">
                                        <input id="ed_od_status_id" readonly="true" class="easyui-textbox" style="width:100px;" />
                                    </td>
                                </tr>          
                                <tr> 
                                    <td class="title"><span class="ipt_must">委</span>托单位:</td>
                                    <td class="value" colspan="3">
                                        <input id="ed_od_delegate_cu_id" readonly="true" class="easyui-textbox" style="width:308px;" /> 
                                    </td>          
                                </tr>
                                <tr>
                                    <td class="title">联系人:</td>
                                    <td class="value">
                                        <input id="ed_od_delegate_relation_nam" readonly="true" class="easyui-textbox" style="width:100px"/>
                                    </td>
                                    <td class="title">电话:</td>
                                    <td class="value">
                                        <input id="ed_od_delegate_relation_phone" readonly="true" class="easyui-textbox" style="width:100px"/>
                                    </td>
                                    <td class="title">传真:</td>
                                    <td class="value">
                                        <input id="ed_od_delegate_relation_fax" readonly="true" class="easyui-textbox" style="width:100px"/>
                                    </td>
                                </tr>
                                <tr> 
                                    <td class="title">发货单位:</td>
                                    <td class="value" colspan="3">
                                        <input id="ed_od_cargo_agent_cu_id" readonly="true" class="easyui-textbox" style="width:308px;" />  
                                    </td>
                                        
                                </tr>
                                <tr>
                                    <td class="title">联系人:</td>
                                    <td class="value">
                                        <input id="ed_od_cargo_agent_relation_nam" readonly="true" class="easyui-textbox" style="width:100px"/>
                                    </td>
                                    <td class="title">电话:</td>
                                    <td class="value">
                                        <input id="ed_od_cargo_agent_relation_phone" readonly="true" class="easyui-textbox" style="width:100px"/>
                                    </td>
                                    <td class="title">传真:</td>
                                    <td class="value">
                                        <input id="ed_od_cargo_agent_relation_fax" readonly="true" class="easyui-textbox" style="width:100px"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="title"><span class="ipt_must">业</span>务类型:</td>
                                    <td class="value">
                                        <input id="ed_od_typ" readonly="true" class="easyui-textbox" style="width:100px"/> 
                                    </td>
                                    <td class="title">项目类型:</td>
                                    <td class="value">
                                        <input id="ed_od_project_typ" readonly="true" class="easyui-textbox" style="width:100px"/>  
                                    </td>
                                    <td class="title">集散类型:</td>
                                    <td class="value">
                                        <input id="ed_od_box_typ_id" readonly="true" class="easyui-textbox" style="width:100px"/> 
                                    </td> 
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="title">内外贸:</td>
                                    <td class="value">
                                        <input id="ed_od_trade_typ_id" readonly="true" class="easyui-textbox" style="width:100px"/>  
                                    </td>
                                    <td class="title">进出口:</td>
                                    <td class="value">
                                        <input id="ed_od_i_e_id" readonly="true" class="easyui-textbox" style="width:100px"/>  
                                    </td>
                                    <td class="title">发货运输条款:</td>
                                    <td class="value">
                                        <input id="ed_od_freight_id" readonly="true" class="easyui-textbox" style="width:100px"/>  
                                    </td>
                                </tr>
                                    <tr>
                                    <td class="title">起运地:</td>
                                    <td class="value" colspan="3">
                                        <input id="ed_od_beg_place_id" readonly="true" class="easyui-textbox" style="width:308px"/>  
                                    </td>
                                         
                                    <td class="my_check_td" colspan="2">
                                        <input type="checkbox" id="od_water_way_flag" onclick="return false;" /> <label for="od_water_way_flag">涉水</label>
                                        <input type="checkbox" id="od_sub_way_flag" onclick="return false;"/> <label for="od_sub_way_flag">涉铁</label>
                                            
                                    </td> 
                                </tr>
                                <tr>
                                    <td class="title">交货地:</td>
                                    <td class="value" colspan="3">
                                        <input id="ed_od_end_place_id" readonly="true" class="easyui-textbox" style="width:308px"/>  
                                    </td> 
                                    <td class="my_check_td" colspan="2">
                                            
                                        <input type="checkbox" id="od_road_way_flag" onclick="return false;" /> <label for="od_road_way_flag">涉陆</label>
                                        <input type="checkbox" id="od_air_way_flag" onclick="return false;" /> <label for="od_air_way_flag">涉空</label>
                                    </td> 
                                </tr>      
                                <tr> 
                                    <td class="title">客服:</td>
                                    <td class="value">
                                        <input id="ed_od_service_id" readonly="true" class="easyui-textbox" style="width:100px;"/>
                                    </td>
                                    <td class="title">操作:</td>
                                    <td class="value">
                                        <input id="ed_od_operation_id" readonly="true" class="easyui-textbox" style="width:100px;"/> 
                                    </td> 
                                    <td class="title">销售:</td>
                                    <td class="value">
                                        <input id="ed_od_sales_id" readonly="true" class="easyui-textbox" style="width:100px;"/>  
                                    </td> 
                                </tr> 
                                <tr> 
                                    <td class="title">委托备注:</td>
                                    <td class="value" colspan="5">
                                        <textarea id="ed_od_bak_delegate" readonly="true" class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:518px; height:30px;"></textarea>  
                                    </td> 
                                </tr> 
                                <tr> 
                                    <td class="title">操作备注:</td>
                                    <td class="value" colspan="5">
                                        <textarea id="ed_od_bak_operation" readonly="true"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:518px; height:30px;"></textarea>  
                                    </td> 
                                </tr> 
                            </table>
                            <div class="panel-header panel-header-border" style="width: 100%;">
                                <div class="panel-title">货物信息</div> 
                            </div>
                            <table class="tab_std" style="width:640px;">
                                <col style="width:10%"/>
                                <col style="width:20%"/>
                                <col style="width:10%"/>
                                <col style="width:20%"/> 
                                <col style="width:10%"/>
                                <col style="width:30%"/>
                                <tr>
                                    <td class="title">品名:</td>
                                    <td class="value" colspan="3">
                                        <input id="ed_od_cargo_typ" readonly="true" class="easyui-textbox" style="width:308px"/>  
                                    </td> 
                                    <td class="title">重量:</td>
                                    <td class="value">
                                        <input id="ed_od_cargo_weight" readonly="true" class="easyui-textbox" style="width:70px"/><span> KG</span> 
                                    </td>
                                </tr>
                                <tr>  
                                    <td class="title">件数:</td>
                                    <td class="value">
                                        <input id="ed_od_cargo_number" readonly="true" class="easyui-textbox" style="width:70px"/> 
                                    </td>    
                                    <td class="title">包装类型:</td>
                                    <td class="value">
                                        <input id="ed_od_cargo_packing" readonly="true" class="easyui-textbox" style="width:100px"/>  
                                    </td>
                                    <td class="title">体积:</td>
                                    <td class="value">
                                        <input id="ed_od_cargo_bluk" readonly="true" class="easyui-textbox" style="width:100px"/><span> CBM</span> 
                                    </td>
                                </tr>  
                                <tr>
                                    <td class="title">收货信息:</td>
                                    <td class="value" colspan="3" >
                                        <textarea id="ed_od_take_cargo_info" readonly="true"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:308px; height:30px;"></textarea>   
                                    </td> 
                                    <td class="title">P/O#:</td>
                                    <td class="value">
                                        <input id="ed_od_po_no" readonly="true" class="easyui-textbox" style="width:120px"/> 
                                    </td>
                                </tr>
                                     
                                <tr>
                                    <td class="title">交货信息:</td>
                                    <td class="value" colspan="3" >
                                        <textarea id="ed_od_delivery_cargo_info" readonly="true"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:308px; height:30px;"></textarea>  
                                    </td> 
                                    <td class="title">S/O#:</td>
                                    <td class="value">
                                        <input id="ed_od_so_no" readonly="true" class="easyui-textbox" style="width:120px"/> 
                                    </td>
                                </tr>
                                      
                            </table>
                            
                        </div>
                    </div> 
                </div>
                 
                <table style="width:100%;" cellspacing="0" cellpadding="0">
                    <col style="width:calc(100%-490px)" />
                    <col style="width:490px" />
                    <tr>
                        <td valign="top" style="border-right:solid 4px #e0e0e0">
                            <div class="panel-header panel-header-border cls_panel_rec" style="width: calc(100% - 10px);" >
                                <div class="panel-title">应收费用信息</div> 
                            </div>
                            <table id="tab_order_fee_rec"> 
                            </table>
                            <div class="panel-header panel-header-border cls_panel_pay" style="width: calc(100% - 10px);">
                                <div class="panel-title">应付费用信息 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#dddddd">双击查看运程明细</span></div> 
                            </div>
                            <div id="tab_order_fee_pay_bar">
                                <a href="javascript:view_all_service_info();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-application_view_list'">查看所有运营商&服务&费用明细</a>
                            </div>
                            <table id="tab_order_fee_pay"> 
                            </table>
                        </td> 
                        <td valign="top">
                             <div class="panel-header panel-header-border" style="width: calc(100% - 10px);">
                            <div class="panel-title">费用汇总&盈收</div> 
                            </div>
                            <table id="tab_od_fee_group"> 
                            </table>
                            <div class="panel-header panel-header-border" style="width: calc(100% - 10px);">
                                <div class="panel-title">费用总体备注说明</div> 
                            </div>
                            <textarea id="ed_od_profit_and_loss_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                    resize:none; width:99%; height:120px;z-index:999"></textarea> 
                        </td>
                    </tr>
                </table>
            
            </div>
                     
        </div>
    </div>

    <div id="service_window" class="easyui-window" title="服务商&批次&费用" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:1088px;height:600px;padding:0px;">
		<div id="tabs_service_list" class="easyui-tabs" data-options="fit:true" style="padding:0px; margin:0px;">
                                     
        </div>
	</div>
    <div id="order_cntr_info_window" class="easyui-window" title="订单集装箱明细" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:748px;height:600px;padding:0px;">
		 <table id="tab_order_cntr"></table>
	</div>
</body>
 
