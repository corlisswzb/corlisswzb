<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="bus_pay_page.aspx.cs" Inherits="ZLHYWL.bus_pay_page" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" /> 
    <script src="Js/bus_pay_list_of_order.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="tabs_bar" >
        <span style="line-height:28px; padding-left:4px;padding-right:4px;"><b>当前位置:商务应付账单</b></span>
    </div>
    <div id="tabs_ca" class="easyui-tabs" data-options="fit:true,border:false,tools:'#tabs_bar',">
        <div title="应付明细">
            <div class="easyui-panel" id="panel_fee" data-options="fit:true" style="overflow:hidden;">

            </div>
        </div> 
         
        <div title="应付账单">
            <div class="easyui-panel" id="panel_ca" data-options="fit:true" style="overflow:hidden;">

            </div>
        </div> 
          
        <div title="申请清单">
            <div class="easyui-panel" id="panel_cap" data-options="fit:true" style="overflow:hidden;">

            </div>
        </div> 
         
    </div>
    
    
    
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="账单明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div> 
   
    <!--查看 审核流程-->
    <div id="win_approval_flow_details" class="easyui-window" title="审核流水" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:650px;height:600px;padding:0px; overflow:hidden">
          
	</div>
    <!--查看 银行账户-->
    <div id="win_cu_bank_info" class="easyui-window" title="结算单位银行账户" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:650px;height:600px;padding:0px;overflow:hidden">
         
        <table class="tab_std" id="ap_bank_details" style="padding:5px; margin-right:25px;width:610px;"> 
            <tbody>

            </tbody>
        </table>
         
	</div>

 <!--打印-->
    <div id="win_for_rpt_print" class="easyui-window"   title="打印" data-options="modal:true,  closed:true,iconCls:'icon-save', fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>

    
      
   
</asp:Content>
