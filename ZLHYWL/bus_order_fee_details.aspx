<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="bus_order_fee_details.aspx.cs" Inherits="SDZL.bus_order_fee_details" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" />
    <script src="Js/bus_order_fee.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="tabs_ca" class="easyui-tabs" data-options="fit:true,border:false,">
        <div title="应收费用明细表">
            <div class="easyui-layout" data-options="fit:true" style="padding:0px">
                <div data-options="region:'north',split:false,border:false" style="background-color:#e4efff;border-bottom:solid 1px #95b8e7;">
                    <table class="tab_std" style="width:auto;  ">
                        <tr> 
                            <td class="title">
                                收/付:
                            </td>
                            <td class="value">
                                <select id="search_rec_or_pay" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                    
                                    <option value="1" selected>应收</option>
                                    <option value="-1">应付</option> 
                                </select>
                            </td>
                            
                            <td class="title">
                                业务类型:
                            </td>
                            <td class="value">
                                <select id="search_od_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:126" >
                            
                                </select>
                            </td>             
                            <td class="title">
                                结算单位:
                            </td>
                            <td class="value" colspan="3"> 
                                <input id="search_fee_cu_id" class="cls_customs_combogrid" style="width:282px;" />  
                                
                            </td> 
                            
                            <td class="title">业务时间(起):</td>
                            <td class="value">
                                <input id="search_fee_dat_beg" class="easyui-datebox" data-options="width:106" />
                            </td>
                            <td class="title">(止):</td>
                            <td class="value">
                                <input id="search_fee_dat_end" class="easyui-datebox" data-options="width:106" />
                            </td> 
                            
                            <td>
                                <a href="javascript:clear_query_tab_fee_list_params();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-arrow_refresh'">清空条件</a> 
                            </td>   
                        </tr> 
                        <tr> 
                            <td class="title">
                                费用状态:
                            </td>
                            <td class="value">
                                <select id="search_fee_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                           
                                    <option value="" selected>全部</option>
                                    <option value="1" >未归账</option> 
                                    <option value="2">归账待交</option>  
                                    <option value="3">交账待收</option> 
                                    <option value="4">部分回款</option> 
                                    <option value="9">已回款</option>  
                                </select>
                            </td> 
                                         
                            <td class="title">
                                项目类型:
                            </td>
                            <td class="value"> 
                                <select id="search_od_project_typ" class="easyui-combobox " data-options="panelHeight:'200',panelWidth:'140',valueField:'value', textField:'label',filter: filterCombo,width:126" ></select>
                            </td> 
                            
                            <td class="title">费项:</td>
                            <td class="value">
                                <select id="search_fee_item_typ" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                   
                                </select>
                            </td>
                            <td class="title">发票类型:</td>
                            <td class="value"> 
                                <select id="search_fee_invoice_typ" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                            </td> 
                            <td class="title">发票号:</td> 
                            <td class="value" colspan="3" >
                                <input id="search_od_invoice_no"  class="easyui-textbox" style=" width:290px;"  />
                            </td> 
                             
                            <td>
                                <a href="javascript:insert_main_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">加入账单</a> 
                            </td>    
                        </tr> 
                        <tr>
                            <td class="title">
                                订单状态:
                            </td>
                            <td class="value">
                                <select id="search_od_status_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                    <option value="" selected>全部</option>
                                    <option value="1" >未审核</option>
                                    <option value="2">审核中</option>
                                    <option value="3">审核通过</option>
                                    <option value="0">审核退回</option>
                                </select>
                            </td>  
                            <td class="title">
                                账期:
                            </td>
                            <td class="value">
                                <select id="search_fee_limit_days_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:126" >
                                    <option value="" selected>全部</option>
                                    <option value="0" >未超期</option>
                                    <option value="1">超期</option>
                                    <option value="2">超期<=90天</option>
                                    <option value="3">超期>90天</option>
                                </select>
                            </td> 
                            
                            <td class="title">工具名:</td>
                            <td class="value" >
                                <input id="search_od_route_tools_desc" class="easyui-textbox" style="width:100px" />
                            </td> 
                            <td class="title">工具号:</td>
                            <td class="value" >
                                <input id="search_od_route_tools_no" class="easyui-textbox" style="width:100px" />
                            </td> 
                            <td class="title">币种:</td>
                            <td class="value"> 
                                <select id="search_fee_currency_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                            </td>
                            <td class="value" colspan="2" style="text-align:center; vertical-align:middle;">
                                <label for="search_od_water_flag">涉水</label><input type="checkbox" id="search_od_water_flag" />
                                  
                                <label for="search_od_sub_way_flag">涉铁</label><input type="checkbox" id="search_od_sub_way_flag" />
                              
                                <label for="search_od_sub_way_flag">涉路</label><input type="checkbox" id="search_od_road_way_flag" />
                           
                                <label for="search_od_sub_way_flag">涉空</label><input type="checkbox" id="search_od_air_way_flag" />
                            </td> 
                            <td>
                                <a href="javascript:refresh_tab_fee_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a> 
                            </td>
                        </tr>
                        <tr>
                            <td class="title">委托号:</td>
                            <td class="value" >
                                <input id="search_od_no" class="easyui-textbox" style="width:100px" />
                            </td> 
                            
                            <td class="title">提单号:</td>
                            <td class="value" colspan="5" >
                                <input id="search_od_bill_nos"  class="easyui-textbox" style="  width:466px;" />
                            </td>
                             <td class="title">箱号:</td>
                            
                            <td class="value" colspan="3">
                                <input id="search_od_cntr_nos"  class="easyui-textbox" style=" width:290px;"  />
                            </td>
                        </tr>
                    </table>
                </div>
                <div data-options="region:'center',split:false,border:false">
                    <table id="tab_fee_list"></table>
                </div>
                <div data-options="region:'south',split:false,border:false" style="background-color:#e4efff; height:84px;  overflow:hidden;" >
                    <div style="float:left; font-weight:bold;">
                        <table class="cls_group_select_fee_infos">
                            <col style="width:74px;"/>
                            <col style="width:294px;"/> 
                            <tr>
                                <td valign="top" style="border:solid 2px #a0a0a0; border-right:solid 1px #a0a0a0">
                                    <span>已选:</span>
                                    <span id="cur_fee_selected_rows_count">0</span> 行
                                </td>
                                <td valign="top">
                                    <table id="selected_group_info" style="width:100%;" class="cls_group_select_fee_infos"  >
                                        <col style="width:54px;"/>
                                        <col style="width:80px;"/>
                                        <col style="width:80px;"/>
                                        <col style="width:80px;"/>
                                        <thead>
                                            <tr>
                                                <td>
                                                    币种
                                                </td>
                                                <td>
                                                    小计
                                                </td>
                                                <td>
                                                    已销
                                                </td>
                                                <td>
                                                    未销
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody> 
                                    </table>
                                </td>
                            </tr>
                        </table>
                        
                    </div>
                    <div style="float:right; line-height:28px; height:28px;font-weight:bold;">
                        <span>总计:</span>
                        <span id="cur_fee_all_rec_fee_amount">0</span>(本币)
                        &nbsp;&nbsp;&nbsp;&nbsp;总已销:
                        <span id="cur_fee_all_reced_fee_amount">0</span>(本币)
                        &nbsp;&nbsp;&nbsp;&nbsp;总未销:
                        <span id="cur_fee_all_unreced_fee_amount">0</span>(本币)
                    </div>
                    
                </div>
            </div>
        </div>
          
    </div>
</asp:Content>
