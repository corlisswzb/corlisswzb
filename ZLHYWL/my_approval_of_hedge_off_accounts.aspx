<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="my_approval_of_hedge_off_accounts.aspx.cs" Inherits="Jbfd.my_approval_of_hedge_off_accounts" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/my_approval_of_hedge_off_accounts.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="tabs_ap" class="easyui-tabs" data-options="fit:true,border:false,">
        <div title="对冲计划申请表">
            <!--审批列表-->
            <div id="page_amc_list" class="easyui-layout" fit="true"  style="padding:0px" >
                <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg"  style=" border-bottom:solid 1px #95b8e7;" >
                    <table class="tab_std" style="width:auto;  ">
                        <tr> 
                            <td class="title">
                                结算对象:
                            </td>
                            <td class="value">
                                <%--<input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" />--%>
                                <select id="search_hoa_cu_id" class="easyui-combobox cls_customs_combobox" data-options="width:276" >
                                   
                                </select>
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
                            <td class="title">银行日期(起):</td>
                            <td class="value">
                                <input id="search_hoa_bank_dat_begin" class="easyui-datebox" data-options="width:106" />
                            </td>
                            
                            
                        </tr>
                        <tr>
                           
                            <td class="title">
                                所属公司:
                            </td>
                            <td class="value"> 
                                <select id="search_relation_c_id" class="easyui-combobox " data-options="panelHeight:'auto',panelWidth:'400',valueField:'value', textField:'label',filter: filterCombo,width:276" ></select>
                            </td> 
                            <td class="title">
                                审核申请:
                            </td>
                            <td class="value">
                                <%--<input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" />--%>
                                <select id="search_hoa_record_id" class="easyui-combobox cls_customs_combobox" data-options="width:106" >
                                   
                                </select>
                            </td>
                            <td class="title">(止):</td>
                            <td class="value">
                                <input id="search_hoa_bank_dat_end" class="easyui-datebox" data-options="width:106" />
                            </td>  
                            <td>
                                <a href="javascript:remove_amc();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">批量撤销</a>
                         
                            </td>
                        </tr>
                        <tr>
                            <td class="title">模糊查询:</td>
                            <td class="value">
                                <input id="search_like_str" autocomplete="off" class="easyui-textbox" style="width:270px" />
                            </td> 
                           
                            
                            <td class="title">
                                当前处理:
                            </td>
                            <td class="value">
                                <%--<input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" />--%>
                                <select id="search_amc_cur_opr_id" class="easyui-combobox cls_customs_combobox" data-options="width:106" >
                                   
                                </select>
                            </td>
                            <td class="title">
                                仅待我处理:
                            </td>
                            <td class="value">
                                <input type="checkbox" id="search_only_my_step" />
                            </td> 
                            <td>
                                <a href="javascript:requery_amc_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                         
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
