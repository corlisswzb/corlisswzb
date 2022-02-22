<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="ld_query_delegate_group.aspx.cs" Inherits="SDZL.ld_query_delegate_group" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" />  
    <script src="Js/ld_query_delegate_group.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="easyui-layout" fit="true"  style="padding:0px" >  
        <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg" style=" border-bottom:solid 1px #95b8e7;" >
            <div  class="easyui-panel custom_bg" data-options="fit:true,border:false,title:''"  style=" border-bottom:solid 1px #95b8e7;" >
                <table class="tab_std" style="width:auto;  ">
                    <tr>    
                        
                        <td class="title">
                            委托单位:
                        </td>
                        <td class="value">
                             <input id="search_delegate_cu_id" data-cu_id="" class="cls_customs_combogrid" style="width:172px;" /> 
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
                            <a href="javascript:refresh_rpt_of_delegate_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                            <a href="javascript:download_delegate_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div data-options="region:'center',split:false,border:false" style="padding:0px"> 
            <div  class="easyui-panel" data-options="fit:true,border:false,title:''">
                <table id="tab_delegate_group"></table>
            </div> 
        </div> 
    </div>
    <!--关联委托查看-->
    <div id="win_of_order_list" class="easyui-window"   title="关联委托列表" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	    <div class="easyui-layout" fit="true"  style="padding:0px" > 
            <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg" style=" border-bottom:solid 1px #95b8e7;" >
                <div  class="easyui-panel custom_bg" data-options="fit:true,border:false,title:''"  style="border-bottom:solid 1px #95b8e7;" > 
                    <a href="javascript:download_order_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a> 
                </div>
            </div>
            <div data-options="region:'center',split:false,border:false" style="padding:0px"> 
                <div  class="easyui-panel" data-options="fit:true,border:false,title:''">
                    <table id="tab_order"></table>
                </div> 
            </div> 
            <div data-options="region:'south',title:'', split:false,border:false" style="background:#e8eaff; overflow:hidden; height:26px" >
                <table class="cls_group_order_fee"> 
                    <tbody>
                        <tr>
                        
                        </tr> 
                    </tbody>
                
                </table>
            </div>  
        </div> 
    </div> 
    <!--关联费用查看-->
    <div id="win_of_order_fee_list" class="easyui-window"   title="关联费用列表" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	    <div class="easyui-layout" fit="true"  style="padding:0px" > 
            <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg" style="border-bottom:solid 1px #95b8e7;" >
                <div  class="easyui-panel custom_bg" data-options="fit:true,border:false,title:''"  style="border-bottom:solid 1px #95b8e7;" > 
                    <a href="javascript:download_order_fee_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a> 
                </div>
            </div>
            <div data-options="region:'center',split:false,border:false" style="padding:0px"> 
                <div  class="easyui-panel" data-options="fit:true,border:false,title:''">
                    <table id="tab_fee_list"></table>
                </div> 
            </div> 
            <div data-options="region:'south',title:'', split:false,border:false" style="background:#e8eaff; overflow:hidden; height:26px" >
                <div style="display:flex;height:100%;">
                    <div style="flex:1">
                        <table class="cls_group_order_fee all_group_order_fee"> 
                            <tbody>
                                <tr></tr>
                            </tbody>
                
                        </table>
                    </div>
                    <div style="flex:1;text-align:right;">
                        <table class="cls_group_order_fee selected_group_order_fee"> 
                            <tbody>
                                <tr></tr>
                            </tbody>
                
                        </table>
                    </div>
                </div> 
            </div>  
        </div>
    </div> 
    <!--关联集装箱-->
    <div id="win_of_order_cntr_list" class="easyui-window"   title="关联费用列表" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	    <div class="easyui-layout" fit="true"  style="padding:0px" > 
            <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg" style=" border-bottom:solid 1px #95b8e7;" >
                <div  class="easyui-panel custom_bg" data-options="fit:true,border:false,title:''" style=" border-bottom:solid 1px #95b8e7;" > 
                    <a href="javascript:download_order_cntr_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a> 
                </div>
            </div>
            <div data-options="region:'center',split:false,border:false" style="padding:0px"> 
                <div  class="easyui-panel" data-options="fit:true,border:false,title:''">
                    <table id="tab_order_cntr"></table>
                </div> 
            </div>  
        </div>
    </div>
    <!--关联委托查看-->
    <div id="win_of_order_info" class="easyui-window"   title="关联委托查看" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div> 
    <!--CY 合同关联费项 编辑菜单-->
    <div id="mm_of_datagrid" class="easyui-menu" style="width: 240px; display: none;">  
       <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_order_list()">查看关联委托列表</div>   
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_order_cntr_list()">查看关联集装箱列表</div>   
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_order_fee_list(1)">查看关联应收费用明细</div>
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_order_fee_list(-1)">查看关联应付费用明细</div>
    </div> 

</asp:Content>
