<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="payable.aspx.cs" Inherits="ZLHYWL.payable" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/payable.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="easyui-tabs" data-options="border:false,fit:true">
        <div title="应付对账" style="padding: 4px">

             <div  class="easyui-layout" data-options="fit:true" style="padding: 0px; margin: 0px;">

                 <div data-options="region:'north',border:true,title:'',split:false" style="height: 40px; width: 100%;padding:5px 0px 5px 10px">

                     <input id="ipt_jsdx" class="easyui-combobox" label="结算对象:" labelwidth="65" labelposition="befor" data-options="filter: filterCombo"  style="width:289px;height:27px;padding-left:10px"/>

                     <input id="dbx_sdate" class="easyui-datebox" label="业务时间:" labelwidth="65" labelposition="befor"  style="width:169px;height:27px"/>
                            至
                     <input id="dbx_edate" class="easyui-datebox"  style="width:105px;height:27px"/>

                     <select id="ipt_dzzt" class="easyui-combobox" label="对账状态:" labelwidth="65" labelposition="befor" data-options="filter: filterCombo" style="width:150px;height:27px">
                            <option value="-1">全部</option>
                            <option selected="selected" value="0">未对</option>
                            <option value="1">已对</option>
                     </select>

                 </div>

                 <div data-options="region:'west',border:true,title:'',split:false" style="height: 100%; width: 300px;">
                       <div class="panel-header" style="width: 300px;">
                        <div class="panel-title">
                            应付客户列表
                        </div>
                    </div>

                       <table id="tab_yf_custom"></table>
                 </div>

                 <div data-options="region:'center',border:true,title:'',split:false" style="height: 100%; width: 100%;">
                       <div class="panel-header" style="width: 300px;">
                        <div class="panel-title">

                            <div style="float: left">费用对账列表</div>
                            <div style="float: right">
                                <input type="button" class="btn_cs" style="height: 26px;line-height: 28px;padding: 0px 5px;" id="btn_export" value="导出账单" />
                                <input type="button" class="btn_cs" style="height: 26px;line-height: 28px;padding: 0px 5px;" id="btn_sure" value="确认对账" />
                                <input type="button" class="btn_cs" style="height: 26px;line-height: 28px;padding: 0px 5px; " id="btn_revoke" value="撤销对账" />

                            </div>
                            <div style="clear: both"></div>
                        </div>
                    </div>

                       <table id="tab_yf_fee"></table>
                 </div>

             </div>

        </div>
    </div>



</asp:Content>
