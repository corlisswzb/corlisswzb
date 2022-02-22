<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="ld_query_unwoa_group.aspx.cs" Inherits="SDZL.ld_query_unwoa_group" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" />
    <script src="Js/ld_query_unwoa_group.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="easyui-layout" fit="true"  style="padding:0px" >  
        <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg"  style="border-bottom:solid 1px #95b8e7;" >
            <div  class="easyui-panel custom_bg" data-options="fit:true,border:false,title:''" style="border-bottom:solid 1px #95b8e7;" >
                <table class="tab_std" style="width:auto;  ">
                    <tr>    
                        
                        <td class="title">
                            员工:
                        </td>
                        <td class="value">
                             <input id="search_u_id" data-cu_id=""  style="width:172px;" /> 
                        </td>
                        <td class="title">起始年份:</td>
                        <td class="value"> 
                            <select id="search_beg_year" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:76" ></select>
                        </td>
                        <td class="title">起始月份:</td>
                        <td class="value"> 
                            <select id="search_beg_month" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:56" ></select>
                        </td> 
                        <td class="title">截止年份:</td>
                        <td class="value"> 
                            <select id="search_end_year" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:76" ></select>
                        </td>
                        <td class="title">截止月份:</td>
                        <td class="value"> 
                            <select id="search_end_month" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:56" ></select>
                        </td> 
                        <td>
                            <a href="javascript:refresh_rpt_of_unwoa_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                            <a href="javascript:download_unwoa_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div data-options="region:'center',split:false,border:false" style="padding:0px"> 
            <div  class="easyui-panel" data-options="fit:true,border:false,title:''">
                <table id="tab_unwoa_group"></table>
            </div> 
        </div> 
    </div>
   
    <!--关联委托查看-->
    <div id="win_of_order_info" class="easyui-window"   title="关联委托查看" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div> 
</asp:Content>
