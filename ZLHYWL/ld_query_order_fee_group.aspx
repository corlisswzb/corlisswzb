<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="ld_query_order_fee_group.aspx.cs" Inherits="Jbfd.ld_query_order_fee_group" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/ld_query_order_fee_group.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!--汇总表-->
    <div class="easyui-layout" fit="true"  style="padding:0px" >  
        <div data-options="region:'north',title:'', split:false,border:false" style="height:34px;" >
            <div  class="easyui-panel custom_bg" data-options="fit:true,border:false,title:''" style="border-bottom:solid 1px #95b8e7;" >
                <table class="tab_std" style="width:auto;  ">
                    <tr>    
                        <td class="title">
                            收/支:
                        </td>
                        <td class="value">
                            <select id="search_rec_or_pay" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:66" >
                             
                                <option value="1" selected >收入</option>
                                <option value="-1">支出</option> 
                            </select>
                        </td> 
                        <td class="title">
                            结算对象:
                        </td>
                        <td class="value">
                             <input id="search_fee_cu_id" data-cu_id="" class="cls_customs_combogrid" style="width:172px;" /> 
                        </td>
                        <td class="title">起始年份:</td>
                        <td class="value"> 
                            <select id="search_fee_dat_begin_year" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:76" ></select>
                        </td>
                        <td class="title">起始月份:</td>
                        <td class="value"> 
                            <select id="search_fee_dat_begin_month" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:56" ></select>
                        </td> 
                        <td class="title">截止年份:</td>
                        <td class="value"> 
                            <select id="search_fee_dat_end_year" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:76" ></select>
                        </td>
                        <td class="title">截止月份:</td>
                        <td class="value"> 
                            <select id="search_fee_dat_end_month" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:56" ></select>
                        </td> 
                        <td class="title">客服:</td>
                        <td class="value"> 
                            <select id="search_service_id" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:56" ></select>
                        </td> 
                        <td class="title">操作:</td>
                        <td class="value"> 
                            <select id="search_operation_id" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:56" ></select>
                        </td>
                        <td class="title">销售:</td>
                        <td class="value"> 
                            <select id="search_sales_id" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:56" ></select>
                        </td>
                        <td class="title">录费:</td>
                        <td class="value"> 
                            <select id="search_record_id" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:56" ></select>
                        </td>
                        <td>
                            <a href="javascript:refresh_order_fee_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                            <a href="javascript:download_order_fee_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a>
                        </td>
                    </tr>
                </table>
            </div> 
        </div>
        <div data-options="region:'center',split:false,border:false" style="padding:0px">
            <div  class="easyui-panel" data-options="fit:true,border:false,title:''">
                <table id="tab_order_fee_group"></table>
            </div> 
        </div>
            
    </div>
</asp:Content>
