<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="approval_frame.aspx.cs" Inherits="SDZL.approval_frame" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/approval_frame.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="easyui-tabs" data-options="border:false,fit:true">
        <div title="审批框架管理" style="padding: 4px">

             <div  class="easyui-layout" data-options="fit:true" style="padding: 0px; margin: 0px;">

                 <div data-options="region:'west',border:true,title:'',split:true" style="height: 100%; width:280px;">

                     <div class="panel-header" style="width: 300px;">
                         <div class="panel-title">
                             审批人员选择
                         </div>
                    </div>
                     
                    <div class="easyui-toolbar">

                        <div style="width:100%;padding:2px 1px 1px 5px">
                            
                           <input class="easyui-searchbox" data-options="prompt:'Please Input Value',searcher:doSearch" style="width:100%"/>

                        </div>
                        
                    </div>
                    <table id="tab_select_user" ></table>
                 </div>

                 <div data-options="region:'center',border:true,title:''" style="height: 100%; ">

                        <div id="dv_toolbar" style="padding: 5px">
                     当前公司：<input id="ipt_company" class="easyui-combobox"  style="width:180px" data-options="filter: filterCombo,panelHeight:'auto'" />
                     审核类型：<input id="ipt_ap_type" class="easyui-combobox"  data-options="filter: filterCombo,panelHeight:'auto'" />
                     </div>

                     <table id="tab_ap_frame"></table>
                 </div>



             </div>

        </div>
    </div>

</asp:Content>
