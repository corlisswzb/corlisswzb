<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="my_approval_of_order.aspx.cs" Inherits="SDZL.my_approval_of_order" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/my_approval_of_order.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="tabs_ap" class="easyui-tabs" data-options="fit:true,border:false,">
        <div title="业务审批列表">
            <!--审批列表-->
            <div id="page_amc_list" class="easyui-layout" fit="true"  style="padding:0px" >
                <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg"  style="border-bottom:solid 1px #95b8e7;" >
                    <table class="tab_std" style="width:auto;  ">
                        <tr> 
                            <td class="title">
                                所属公司:
                            </td>
                            <td colspan="3" class="value"> 
                                <select id="search_od_record_by_company_id" class="easyui-combobox " data-options="panelHeight:'auto',panelWidth:'400',valueField:'value', textField:'label',filter: filterCombo,width:276" ></select>
                            </td> 
                            <td class="title">
                                审核状态:
                            </td>
                            <td class="value">
                                <select id="search_amc_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                           
                                    <option value="">全部</option>
                                    <option value="1" selected>审核中</option> 
                                    <option value="2">已完成</option>
                                    <option value="0">退审</option> 
                                </select>
                            </td>
                            
                            <td class="title">业务起始:</td>
                            <td class="value">
                                <input id="search_od_beg_fee_dat" class="easyui-datebox" data-options="width:106" />
                            </td>
                            <td class="title">
                                发起人:
                            </td>
                            <td class="value">
                                <%--<input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" />--%>
                                <select id="search_amc_create_id" class="easyui-combobox cls_customs_combobox" data-options="width:106" >
                                   
                                </select>
                            </td>
                            <%--<td class="title">
                                录单人:
                            </td>
                            <td class="value">
                                <select id="search_od_service_id" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                   
                                </select>
                            </td> --%>
                           <%-- <td class="title">内外贸:</td>
                            <td class="value"> 
                                <select id="search_od_trade_typ_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                            </td>--%>
                        </tr>
                        <tr>
                            <td class="title">
                                委托客户:
                            </td>
                            <td  colspan="3" class="value">
                                <%--<input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" />--%>
                                <select id="search_od_delegate_cu_id" class="easyui-combobox cls_customs_combobox" data-options="width:276" >
                                   
                                </select>
                            </td>
                            <td class="title">
                                业务类型:
                            </td>
                            <td class="value">
                                <select id="search_od_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                            </td>  
                            
                          <%--  <td class="title">
                                集散类型:
                            </td>
                            <td class="value">
                                <select id="search_od_box_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                  
                                </select>
                            </td>--%>
                            
                            <td class="title">业务截止:</td>
                            <td class="value">
                                <input id="search_od_end_fee_dat" class="easyui-datebox" data-options="width:106" />
                            </td>
                            
                            <td class="title">
                                当前处理人:
                            </td>
                            <td class="value">
                                <%--<input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" />--%>
                                <select id="search_amc_cur_opr_id" class="easyui-combobox cls_customs_combobox" data-options="width:106" >
                                   
                                </select>
                            </td>
                            <td>
                                <a href="javascript:remove_amc();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">批量撤销</a>
                         
                            </td>
                        </tr>
                        <tr>
                            
                           <%-- <td class="title">
                                供货客户:
                            </td>
                            <td class="value">
                                
                                <select id="search_od_cargo_agent_cu_id" class="easyui-combobox cls_customs_combobox" data-options="filter: filterCombo,width:166" >
                                    
                                </select>
                            </td>--%>
                            <td class="title">模糊查询:</td>
                            <td class="value" colspan="3">
                                <input id="search_like_str" class="easyui-textbox" style="width:270px" />
                            </td> 
                            <td class="title">
                                项目类型:
                            </td>
                            <td class="value">
                                <select id="search_od_project_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                            </td>
                            <td></td><td></td>
                            
                            <td class="title">
                                仅待我处理:
                            </td>
                            <td class="value">
                                <input type="checkbox" id="search_only_my_step" />
                            </td> 
                            <td>
                                <a href="javascript:refresh_amc_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                         
                            </td>
                        </tr>
                    </table>
                </div>
                <div data-options="region:'center',split:false,border:false" style="padding:0px">
                    <table id="tab_amc_list"></table>
                </div>
            </div>
        </div>
    </div>
    
</asp:Content>
