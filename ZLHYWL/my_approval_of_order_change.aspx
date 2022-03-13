<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="my_approval_of_order_change.aspx.cs" Inherits="ZLHYWL.my_approval_of_order_change" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/my_approval_of_order_change.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <div id="tabs_ap" class="easyui-tabs" data-options="fit:true,border:false,">
        <div title="改单审批列表">
            <!--审批列表-->
            <div id="page_amc_list" class="easyui-layout" fit="true"  style="padding:0px" >
                <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg"  style="border-bottom:solid 1px #95b8e7;" >
                    <table class="tab_std" style="width: auto;">
                        <tr>
                            <td class="title">模糊查询:</td>
                            <td class="value">
                                <input id="search_like_str" class="easyui-textbox" style="width: 270px" />
                            </td>
                            <td class="title">审核状态:
                            </td>
                            <td class="value">
                                <select id="search_amc_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106">

                                    <option value="" >全部</option>
                                    <option value="1" selected>审核中</option>
                                    <option value="2">已完成</option>
                                    <option value="0">退审</option>
                                </select>
                            </td>
                            <td class="title">计划状态:
                            </td>
                            <td class="value">
                                <select id="search_co_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106">
                                    <option value="" selected>全部</option>
                                    <option value="0">未提交</option>
                                    <option value="1">已提交</option>
                                    <option value="2">已完成</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">所属公司:
                            </td>
                            <td class="value">
                                <select id="search_od_record_by_company_id" class="easyui-combobox " data-options="panelHeight:'auto',panelWidth:'400',valueField:'value', textField:'label',filter: filterCombo,width:276"></select>
                            </td>
                            <td class="title">审核申请:
                            </td>
                            <td class="value">

                                <select id="search_amc_create_id" class="easyui-combobox cls_customs_combobox" data-options="width:106">
                                </select>
                            </td> 
                            <td class="title">当前处理:
                            </td>
                            <td class="value">
                                <select id="search_amc_cur_opr_id" class="easyui-combobox cls_customs_combobox" data-options="width:106">
                                </select>
                            </td>
                            <td class="title">仅待我处理:
                            </td>
                            <td class="value">
                                <input type="checkbox" id="search_only_my_step" />
                            </td>
                            <td>
                                <a href="javascript:requery_amc_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                            </td>
                            <td>
                                <a href="javascript:remove_amc();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">批量撤销</a>
                         
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
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="账单明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',inline:true,fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
</asp:Content>
