<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="bus_order_record.aspx.cs" Inherits="Jbfd.bus_order_record" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/order.css" rel="stylesheet" /> 
    <link href="Style/order_transport_route.css" rel="stylesheet" />
    <script src="Js/bus_order_record.js"></script>
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!--订单列表-->
    <div id="page_order_list" class="easyui-layout" fit="true"  style="padding:0px" >   
         
        <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg" style=" border-bottom:solid 1px #95b8e7;" >
            <table class="tab_std" style="width:auto;  ">
                <tr>    
                    <td class="title">
                        状态:
                    </td>
                    <td class="value">
                        <select id="search_od_status_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value',multiple: true, editable:false,  textField:'label',filter: filterCombo,width:106" >
                            <option value="" selected>全部</option>
                            <option value="1" >未审核</option>
                            <option value="2">审核中</option>
                            <option value="3">审核通过</option>
                            <option value="0">审核退回</option>
                        </select>
                    </td>
                    <td class="title">
                        业务类型:
                    </td>
                    <td class="value">
                        <select id="search_od_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value',multiple: true, editable:false, textField:'label',filter: filterCombo,width:106" ></select>
                    </td> 
                    <td class="title">
                        委托客户:
                    </td>
                    <td class="value">
                         <input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" /> 
                    </td>
                    <td class="title">业务起始:</td>
                    <td class="value">
                        <input id="search_od_beg_fee_dat" class="easyui-datebox" data-options="width:106" />
                    </td>
                    <td class="title">内外贸:</td>
                    <td class="value"> 
                        <select id="search_od_trade_typ_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value',multiple: true, editable:false, textField:'label',filter: filterCombo,width:106" ></select>
                    </td>
                    <td class="value" rowspan="3">
                        <textarea id="search_od_bill_nos" placeholder="提单号,一行一条"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                        resize:none; width:126px; height:80px;"></textarea> 
                    </td> 
                    <td class="value" rowspan="3">
                        <textarea id="search_od_cntr_nos" placeholder="箱号，一行一条"   class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                        resize:none; width:106px; height:80px;"></textarea> 
                    </td> 
                   <td class="title">最少盈利:</td>
                    <td class="value"> 
                        <input id="search_od_min_proift" autocomplete="off" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox" style="width:66px" />
                    </td>  
                </tr>
                <tr>
                    <td class="title">
                        项目类型:
                    </td>
                    <td class="value">
                        <select id="search_od_project_typ" class="easyui-combobox" data-options="panelHeight:'auto',multiple: true, editable:false,valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                    </td>
                    <td class="title">
                        集散类型:
                    </td>
                    <td class="value">
                        <select id="search_od_box_typ" class="easyui-combobox" data-options="panelHeight:'auto',multiple: true, editable:false,valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                  
                        </select>
                    </td>
                    <td class="title">
                        供货客户:
                    </td>
                    <td class="value">
                        <input id="search_od_cargo_agent_cu_id" class="cls_customs_combogrid" style="width:172px;" />  
                    </td>
                    <td class="title">业务截止:</td>
                    <td class="value">
                        <input id="search_od_end_fee_dat" class="easyui-datebox" data-options="width:106" />
                    </td>
                     <td class="title">
                        录单人:
                    </td>
                    <td class="value">
                        <select id="search_od_service_id" class="easyui-combobox" data-options="panelHeight:'200',multiple: true, editable:false,valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                   
                        </select>
                    </td> 
                    <td colspan="2" style="text-align:right;">
                        <a href="javascript:bat_lock_order_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-lock'">批量锁单</a>
                       
                    </td>
                 <%--   <td class="value">
                         
                        <label for="search_od_water_flag">涉水</label><input type="checkbox" id="search_od_water_flag" />
                                  
                        <label for="search_od_sub_way_flag">涉铁</label><input type="checkbox" id="search_od_sub_way_flag" />
                     
                    </td>--%>
                </tr>
                <tr>
                    <td class="title">模糊查询:</td>
                    <td class="value" colspan="3">
                        <input id="search_like_str" class="easyui-textbox" style="width:270px" />
                    </td>
                    <td class="title">
                        供服商:
                    </td>
                    <td class="value" > 
                        <input id="search_fee_cu_id" class="cls_customs_combogrid" style="width:172px;" /> 
                    </td> 
                    <td class="title">工具名:</td>
                    <td class="value" >
                        <input id="search_od_route_tools_desc" class="easyui-textbox" style="width:100px" />
                    </td> 
                    <td class="title">工具号:</td>
                    <td class="value" >
                        <input id="search_od_route_tools_no" autocomplete="off" class="easyui-textbox" style="width:106px" />
                    </td> 
                     
                  <%-- <td class="value">
                                
                        <label for="search_od_sub_way_flag">涉路</label><input type="checkbox" id="search_od_road_way_flag" />
                           
                        <label for="search_od_sub_way_flag">涉空</label><input type="checkbox" id="search_od_air_way_flag" />
                    
                    </td>--%>
                    <td colspan="2" style="text-align:right;">
                        <a href="javascript:refresh_order_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                       
                    </td>
                </tr>
            </table>
        </div>
        <div data-options="region:'center',split:false,border:false" style="padding:0px">
            <table id="tab_order"></table>
        </div>
        <div data-options="region:'south',title:'', split:false,border:false" style="background:#e8eaff; overflow:hidden; height:26px" >
            <table class="cls_group_order_fee"> 
                <tbody>
                    <tr>
                        
                    </tr> 
                </tbody>
                
            </table>
        </div>    
    </div>
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="账单明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
    <div id="win_approval_flow_details" class="easyui-window" title="审核流水" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:650px;height:600px;padding:0px;">
          <table class="tab_std"  style="padding:5px; margin-right:25px;width:610px;">
                <col style="width:15%"/>
                <col style="width:35%"/>
                <col style="width:15%"/>
                <col style="width:35%"/>
                <tbody>
                    <tr>
                        <td class="title">编号:</td>
                        <td class="title"><span id="sp_amc_relation_no"></span></td>
                        <td class="title">状态:</td>
                        <td class="title"><span id="sp_amc_status_desc"></span></td>
                    </tr>
                    <tr>
                        <td class="title">标题:</td>
                        <td class="title" colspan="2"><span id="sp_amc_title"></span></td> 
                    </tr>
                    <tr>
                        <td class="title">发起人:</td>
                        <td class="title"><span id="sp_amc_create_nam"></span></td>
                        <td class="title">发起时间:</td>
                        <td class="title"><span id="sp_amc_create_dat"></span></td>
                    </tr>
                    <tr>
                        <td class="title">当前处理人:</td>
                        <td class="title"><span id="sp_amc_cur_opr_nam"></span></td>
                        <td class="title">通审时间:</td>
                        <td class="title"><span id="sp_amc_finish_dat"></span></td>
                    </tr>
                </tbody>
            </table>
            <table class="tab_std" id="ap_flow_details" style="padding:5px; margin-right:25px;width:610px;">
                <col style="width:20%"/>
                <col style="width:14%"/>
                <col style="width:46%"/>
                <col style="width:20%"/>
                <tbody>

                </tbody>
            </table>
         
	</div>
    <!--CY 合同关联费项 编辑菜单-->
    <div id="dv_view_of_approval_details_from_list" class="easyui-menu" style="width: 50px; display: none;">  
      <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="view_of_approval_details_from_list()">查看审核流程</div>   
        <div   data-options="iconCls:'icon-view'" onclick="view_of_order_info_from_list()">查看费用简表</div> 
    </div>   

    <!--成本窗口-->
    <div id="win_of_hand_cost" class="easyui-window"   title="人工成本支出" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
    <!--人工成本确认对话框--> 
    <div id="dlg_of_create_hand_cost" class="easyui-dialog" style="padding:0px;">  
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',border:false" style="height:82px;">
                <div class="easyui-panel" data-options="title:'当前选择详情',fit:true,border:false" >
                    <table class="tab_std">
                        <col style="width:20%" />
                        <col style="width:80%" />
                        <tr>
                            <td class="title">
                                委托总数:
                            </td>
                            <td class="value">
                                <b><span id="sel_od_count"></span></b>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                总盈利(本币):
                            </td>
                            <td class="value">
                                <b><span id="sel_od_total_profit"></span></b>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div data-options="region:'center',border:false">
                <div class="easyui-panel" data-options="title:'人工成本支出明细',fit:true,border:false" style="width:100%;">
                    <table class="tab_std">
                        <col style="width:20%" />
                        <col style="width:80%"></col>
                        <tr>
                            <td class="title">
                                <span class="ipt_must">成</span>本总金额:
                            </td>
                            <td class="value">
                                <input id="hand_cost_total" autocomplete="off" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox" style="width:100px" value="0" /> 
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" style="text-align:center; font-size:9px;color:#d2d2d2;">   
                                成本总金额按RMB计算，不能大于所选择的委托总盈利(本币)
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                <span class="ipt_must">结</span>算单位:
                            </td>
                            <td class="value">
                                <input id="hand_cost_cu_id"   class="easyui-textbox" style="width:350px"  /> 
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                <span class="ipt_must">费</span>项:
                            </td>
                            <td class="value">
                                <input id="hand_cost_fee_item_typ"   class="easyui-textbox" style="width:350px"  /> 
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                <span class="ipt_must">单</span>位:
                            </td>
                            <td class="value">
                                <input id="hand_cost_fee_unit"   class="easyui-textbox" style="width:350px"  /> 
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                <span class="ipt_must">税</span>点:
                            </td>
                            <td class="value">
                                <input id="hand_cost_fee_invoice_typ"   class="easyui-textbox" style="width:350px"  /> 
                            </td>
                        </tr>
                        <tr>
                            <td class="title">
                                费用备注:
                            </td>
                            <td class="value">
                                <textarea id="hand_cost_fee_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:350px; height:46px;"></textarea> 
                         
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        
        
         
    </div>
</asp:Content>
