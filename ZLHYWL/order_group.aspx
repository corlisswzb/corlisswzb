<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="order_group.aspx.cs" Inherits="SDZL.order_group" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/order_group.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div data-options="fit:true" class="easyui-layout">
        <div data-options="region:'north',title:'', split:false,border:false" style="height:304px;" >
            <div data-options="fit:true" class="easyui-layout">
                <div data-options="region:'north',title:'', split:false,border:false" style="height:58px;" >
                    <div  class="easyui-panel custom_bg" data-options="fit:true,border:false,title:'业务管理-业务统计'" style="border-bottom:solid 1px #95b8e7;" >
                        <table class="tab_std" style="width:auto;  ">
                            <tr>    
                        
                                <td class="title">【业务】开始时间:</td>
                                <td class="value"> 
                                    <input id="search_fee_dat_beg" class="easyui-datebox" style="width:104px" />
                                </td>
                       
                                <td class="title">结束时间:</td>
                                <td class="value"> 
                                    <input id="search_fee_dat_end" class="easyui-datebox" style="width:104px"/>
                                </td> 
                                <td>
                                    <a href="javascript:refresh_data();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                                    <%--<a href="javascript:download_order_fee_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a>--%>
                                </td>
                            </tr>
                        </table>
                    </div> 
                </div>
                <div data-options="region:'center',border:false,split:false">
                     <table id="tab_order_group">

                     </table>
                </div>
            </div>
        </div>
        <div data-options="region:'center',border:false,split:false">
            <!--要分三个部分--->
            <div id="tabs" class="easyui-tabs" data-options="fit:true, border:false">
                <div title="应收未销明细">
                    <table id="tab_rec_group"></table>
                </div>
                <div title="应付未销明细">
                    <table id="tab_pay_group"></table>
                </div>
            </div> 
        </div>
    </div>
</asp:Content>
