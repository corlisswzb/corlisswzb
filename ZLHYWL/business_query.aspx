<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="business_query.aspx.cs" Inherits="ZLHYWL.business_query" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
    <script src="Js/businesss_mgr.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
    <div class="easyui-tabs" id="dv_tabs" data-options="border:false,fit:true">
        <div title="业务查询" data-options="closable:false" style="padding: 5px">

            <div id="dv_toolbar" style="padding:5px">


                 <div style="margin-bottom: 5px">
                     模糊: <input id="ipt_serch" class="easyui-searchbox" data-options="prompt:'关键字查询'" style="width: 180px" />

                     委托客户: <input id="cbx_custom" style="width: 250px" class="easyui-combobox"  data-options="filter: filterCombo"/>

                     内外贸: <select id="cbx_trade" class="easyui-combobox"  data-options="filter: filterCombo,panelHeight: 'auto'" style="width:80px">
                                <option value="0">全部</option>
                                <option value="1">内贸</option>
                                <option value="2">外贸</option>
                             </select>

                 </div>

                 <div style="text-align: left;">
                     公司: <input class="easyui-combobox" id="ipt_company"  data-options="filter: filterCombo,panelHeight: 'auto'" style="width:180px"/>

                     状态: <input id="cbx_state" class="easyui-combobox"   data-options="filter: filterCombo"  style="width:80px"/>

                     <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_search" value="查询" />
                     <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_return" value="完结业务" />
                     <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_export" value="导出EXCEl" />
                 </div>



            </div>

            <table id="tab_busi"></table>
        </div>

    </div>

   
    
   
  
</asp:Content>
