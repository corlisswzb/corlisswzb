<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="invoice_collect.aspx.cs" Inherits="ZLHYWL.invoice_collect" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/invoice_collect.js"></script>
    <!--datagrid提示-->
    <script src="Script/jquery-easyui-extensions/datagrid/jeasyui.extensions.datagrid.getColumnInfo.js"></script>
    <script src="Script/jquery-easyui-extensions/datagrid/jeasyui.extensions.datagrid.getDom.js"></script>
    <script src="Script/jquery-easyui-extensions/datagrid/jeasyui.extensions.datagrid.getRowData.js"></script>
    <script src="Script/jquery-easyui-extensions/datagrid/jeasyui.extensions.datagrid.tooltip.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="easyui-tabs" id="dv_tabs" data-options="border:false,fit:true">
        <div title="应收发票管理" data-options="closable:false" style="padding: 5px">
             <div id="dv_layout" class="easyui-layout" data-options="fit:true" style="padding: 0px; margin: 0px;">
                 <div data-options="region:'west',border:true,title:'',collapsible:true,collapsed:true" style="height: 100%; width: 353px;">
                     <div class="panel-header" >
                         <div class="panel-title">待办列表
                             <div style="float:right;margin-right:20px">
                               
                             </div>
                         </div>
                         <div class="panel-tool"></div>
                     </div>
                     <table id="tab_pass_approval"></table>
                 </div>
                 <div data-options="region:'center',border:true,title:'费用发票绑定',split:true" style="height: 100%; ">
                     <div id="dv_fi_toolbar" style="padding: 5px">
                         <div style="margin-bottom: 5px">

                             <input id="ipt_serch" label="模糊：" data-options="prompt:'关键字查询',labelPosition:'before',labelWidth:57" class="easyui-searchbox" />

                             <input id="ipt_sdate" label="审批时间段：" data-options="labelPosition:'before',labelWidth:83" style="width: 190px" class="easyui-datebox" />
                             至
                             <input id="ipt_edate" class="easyui-datebox" style="width: 110px" />

                             状态：<select id="ipt_spstate" class="easyui-combobox" data-options="panelHeight: 'auto',filter: filterCombo" style="width: 100px">
                                  <option value="0" selected="selected">全部</option>
                                 <option value="1">未开票</option>
                                 <option value="2">已开票</option>

                             </select>
                             <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_todo" value="待办" />
                         </div>

                         <div style="text-align: left;">

                             <input id="ipt_sponsor" label="审核人：" data-options="labelPosition:'before',labelWidth:57,panelHeight: 'auto',filter: filterCombo" class="easyui-combobox" />

                             <input id="ipt_custom" label="结算对象：" data-options="labelPosition:'before',labelWidth:83,panelHeight: 'auto',filter: filterCombo" style="width: 270px" class="easyui-combobox" />

                             <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_search" value="查询" />

                             
                             <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_bind_invoice" value="绑定发票" />

                         </div>
                     </div>
                     <table id="tab_fee_detailed"></table>
                 </div>
                 <div data-options="region:'east',border:true,title:'',split:true" style="height: 100%; width: 320px;">
                     <div class="panel-header" >
                         <div class="panel-title">发票列表
                             <div style="float:right;margin-right:20px">
                               
                             </div>
                         </div>
                         
                         <div class="panel-tool"></div>
                     </div>
                     <div id="dv_toolbar">
                        <input id="ipt_in_serch" class="easyui-searchbox" style="width:110px" data-options="prompt:'关键字查询'"  />
                         状态：<select id="ipt_in_state" style="width:80px" class="easyui-combobox" data-options="filter: filterCombo,panelHeight: 'auto'">
                                   <option value="0">全部</option>
                                   <option value="1" selected="selected">待使用</option>
                                   <option value="2">已结束</option>
                               </select>
                         <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_in_search" value="查询" />
                     </div>
                     <table id="tab_invoice"></table>
                 </div>

            </div>
        </div>
    </div>


    
    
</asp:Content>
