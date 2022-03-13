<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="ld_query_order_typ_group.aspx.cs" Inherits="ZLHYWL.ld_query_order_typ_group" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" />  
    <script src="Js/ld_query_order_typ_group.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="easyui-layout" fit="true"  style="padding:0px" >  
        <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg"  style="border-bottom:solid 1px #95b8e7;" >
            <div  class="easyui-panel custom_bg" data-options="fit:true,border:false,title:''" style="border-bottom:solid 1px #95b8e7;" >
                <table class="tab_std" style="width:auto;  ">
                    <tr>  
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
                            <a href="javascript:refresh_rpt_of_order_typ_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                            <a href="javascript:download_order_typ_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div data-options="region:'center',split:false,border:false" style="padding:0px"> 
            <div   class="easyui-panel" data-options="fit:true,border:false,title:''">
                <table id="panel_order_typ_group" class="abtab_print tab_part_of_feetitle"   style="border-collapse:collapse; margin-top:2px;">  
                    <col style="width:20px;"></col> 
                    <col style="width:40px;"></col> 
                    <col style="width:30px;"></col> 
                    <col style="width:30px;"></col> 
                    <col style="width:30px;"></col> 
                    <col style="width:30px;"></col> 
                    <col style="width:30px;"></col> 
                    <col style="width:30px;"></col> 
                    <col style="width:50px;"></col> 
                    <col style="width:50px;"></col> 
                    <col style="width:50px;"></col> 
                    <col style="width:50px;"></col> 
                    <col style="width:50px;"></col> 
                    <col style="width:50px;"></col> 
                    <col style="width:50px;"></col> 
                    <col style="width:50px;"></col>  
                    <thead>  
                        <tr> 
                            <th class="title" >序号</th> 
                            <th class="title" >业务类型</th> 
                            <th class="title">涉单数</th> 
                            <th class="title">自然箱</th>  
                            <th class="title">标准箱</th>  
                            <th class="title" >20尺</th> 
                            <th class="title" >40尺</th>  
                            <th class="title">45尺</th> 
                            <th class="title" >应收(本币)</th> 
                            <th class="title" >未收(本币)</th> 
                            <th class="title" >应付(本币)</th> 
                            <th class="title" >未付(本币)</th> 
                            <th class="title" >盈利(本币)</th> 
                            <th class="title" >毛利率</th> 
                        </tr> 
                    </thead> 
                    <tbody>
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div> 
        </div> 
    </div>
    
</asp:Content>
