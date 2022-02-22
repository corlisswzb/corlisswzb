<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="maintain_data.aspx.cs" Inherits="SDZL.maintain_data" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/basedata_mgr.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="easyui-tabs" data-options="border:false,fit:true,tabPosition:'top',">
        <div title="项目类型"  style="padding: 0px"> 
            <table id="tab_project"></table> 
        </div>

        <div title="费项列表"  style="padding: 0px"> 
            <table id="tab_fee_item"></table>
        </div> 

        <div title="品名管理" style="padding: 0px">
            <!--表格工具栏-->
            <div id="tab_product_bar">
                <table>
                    <tr>
                        <td>
                            <a href="#" tabindex="1" id="add_btn_product" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新增</a>
                        </td>
                        <td>
                            <a href="#" tabindex="1" id="del_btn_product" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">失效</a>
                        </td>
                        <td>
                            搜索:
                        </td>
                        <td>
                            <input id="search_product_like_str" class="easyui-textbox" prompt="模糊查询" style="width: 200px;" />
                        </td> 
                        <td>
                            <a href="#" tabindex="1" id="query_btn_product" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                        </td>
                        <td>
                            <a href="#" tabindex="1" id="refresh_btn_product" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-2012080412111'">清空刷新</a>
                        </td>
                    </tr>
                </table> 
            </div>
            <table id="tab_product"></table>
        </div>
         
        <div title="贸易条款" style="padding: 0px">
            <table id="tab_trade"></table>
        </div>

        <div title="货运条款" style="padding: 0px">
            <table id="tab_freight"></table>
        </div>

        <div title="发票类型" style="padding: 0px">
            <table id="tab_invoice"></table>
        </div>

        <div title="箱主(船公司)" style="padding: 0px">
            <table id="tab_ship_company"></table>
        </div> 
         
        <div title="提单类型" style="padding: 0px">
            <table id="tab_bill_typ"></table>
        </div>
        <div title="包装类型" style="padding: 0px">
            <table id="tab_packing"></table>
        </div>
        <div title="计量单位" style="padding: 0px">
            <table id="tab_unit"></table>
        </div>
        <div title="联运方式" style="padding: 0px">
            <table id="tab_carriage_typ"></table>
        </div>
        <div title="签单方式" style="padding: 0px">
            <table id="tab_sign_bill_typ"></table>
        </div>
        <div title="航线列表" style="padding: 0px">
            <table id="tab_voyage_line"></table>
        </div>
        <div title="地址信息" style="padding: 0px">
            <div id="tab_place_bar" style="height: 32px; ">
                <table>
                    <tr>
                        <td>
                            <a href="#" tabindex="1" id="add_btn_place" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新增</a>
                        </td>
                        <td>
                            <a href="#" tabindex="1" id="delete_btn_place" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">删除</a>
                        </td>
                        <td>
                            搜索:
                        </td>
                        <td>
                            <input id="search_place_like_str" class="easyui-textbox" placeholder="模糊查询" style=" width:230px;  "  />
                        </td>
                        <td>
                            <select id="serach_place_pl_typ" class="easyui-combobox" data-options=" panelHeight:'auto',valueField:'value', textField:'label',width:100"></select>
                        </td>
                        <td>
                            <a href="#" tabindex="1" id="query_btn_place" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                        </td>
                        <td>
                            <a href="#" tabindex="1" id="refresh_btn_place" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-2012080412111'">清空刷新</a>
                        </td>
                         
                    </tr>
                </table> 
            </div>
            <table id="tab_place"></table>
        </div>
        <div title="区域管理" style="padding: 0px">
            <table id="tab_area_list"></table>
        </div>
        <div title="港口管理" style="padding: 0px">
            <table id="tab_port_list"></table>
        </div>
    </div>
    <!--品名 新增修改对话框-->
    <div id="dlg_edit_product" class="easyui-dialog">
        <form id="dlg_edit_product_form">
            <input type="hidden" id="hid_pr_id" />
              
            <table class="tab_from">
                <col style="width: 10%" />
                <col style="width: 90%" /> 
                <tr>
                    <td class="title"> 
                        品名:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_pr_name" style="width:294px"  />
                    </td>  
                </tr> 
            </table> 
            
        </form>
    </div>
    <!--地址 新增修改对话框-->
    <div id="dlg_edit_place" class="easyui-dialog">
        <form id="dlg_edit_place_form">
            <input type="hidden" id="hid_pl_id" />
              
            <table class="tab_from">
                <col style="width: 25%" />
                <col style="width: 75%" />  
                <tr>
                    <td class="title"> 
                        地址类别:
                    </td>
                    <td class="value">
                        <select id="dlg_pl_typ" class="easyui-combobox" data-options=" panelHeight:'auto',valueField:'value', textField:'label',width:300" >

                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="title"> 
                        快捷代码(字母):
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_pl_code" style="width:294px"  />
                    </td>
                </tr>
                <tr>
                    <td class="title"> 
                        显示名:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_pl_name" style="width:294px"  />
                    </td> 
                </tr>
                <tr>
                    <td class="title"> 
                        备注名:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_pl_en_name" style="width:294px"  />
                    </td> 
                </tr> 
            </table> 
        </form>
    </div>
</asp:Content>
