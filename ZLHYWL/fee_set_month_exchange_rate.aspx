<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="fee_set_month_exchange_rate.aspx.cs" Inherits="SDZL.fee_set_month_exchange_rate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/fee_set_month_exchange_rate.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="easyui-panel" data-options="title:'汇率设置',fit:true,border:false" style="padding:0px;">
        <div id="tab_exchange_month_rate_bar">
            <table>
                <tr>
                    <td>
                        年份:
                    </td>
                    <td>
                        <select id="group_search_year" class="easyui-combobox"  data-options="filter: filterCombo,panelHeight: '200'" style="width:80px"></select>
                    </td>
                </tr>
            </table>
            <table id="currency_typ_group_radio">
                <tbody>
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        </div>
        <table id="tab_exchange_month_rate"></table>
    </div>
    
</asp:Content>
