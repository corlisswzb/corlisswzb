<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="payment_approval.aspx.cs" Inherits="Jbfd.payment_approval" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/payment_approval.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="easyui-tabs" id="dv_tabs" data-options="border:false,fit:true">
        <div title="付款审核" data-options="closable:false" style="padding: 5px">

            <div class="easyui-layout" data-options="fit:true" style="padding: 0px; margin: 0px;">

                 <div data-options="region:'west',border:true,title:'',split:true" style="height: 100%; width: 500px;">

                     <div class="panel-header" style="width: 300px;">
                         <div class="panel-title">待办列表
                             <div style="float:right;margin-right:20px">
                                 RMB合计【<span id="sp_hjrmb">0</span>】，外币合计【<span id="sp_hjusd">0</span>】
                             </div>
                         </div>
                         
                         <div class="panel-tool"></div>
                     </div>

                     <table id="tab_fee_apply"></table>

                </div>

                 <div data-options="region:'center',border:true,title:''" style="height: 100%;">
                     <div id="dv_toolbar" style="padding: 5px">
                         <div style="margin-bottom: 5px">

                             <input id="ipt_serch" label="模糊：" data-options="prompt:'关键字查询',labelPosition:'before',labelWidth:57" class="easyui-searchbox" />

                             <input id="ipt_sdate" label="申请时间段：" data-options="labelPosition:'before',labelWidth:83" style="width: 190px" class="easyui-datebox" />
                             至
                    <input id="ipt_edate" class="easyui-datebox" style="width: 110px" />

                             状态：<select id="ipt_spstate" class="easyui-combobox" data-options="panelHeight: 'auto',filter: filterCombo" style="width: 100px">
                                 <option value="1" selected="selected">待审核</option>
                                 <option value="2">已审核</option>

                             </select>
                         </div>

                         <div style="text-align: left;">

                             <input id="ipt_sponsor" label="申请人：" data-options="labelPosition:'before',labelWidth:57,panelHeight: 'auto',filter: filterCombo" class="easyui-combobox" />

                             <input id="ipt_custom" label="结算对象：" data-options="labelPosition:'before',labelWidth:83,panelHeight: 'auto',filter: filterCombo" style="width: 270px" class="easyui-combobox" />

                             <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_search" value="查询" />

                             <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_batch_pass" value="批量审核" />

                             <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_return_apply" value="退回申请" />

                         </div>
                     </div>


                     <table id="tab_collection_ap"></table>
                 </div>
             </div>
        </div>
    </div>


</asp:Content>
