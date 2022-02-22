<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="custom_mgr.aspx.cs" Inherits="SDZL.custom_mgr" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/custom.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="easyui-layout" fit="true" style="padding:0px;">  
        <div data-options="region:'center',border:false,split:true" style="padding:0px;" > 
            <div class="easyui-panel"   data-options="border:false,fit:true,title:'客户列表'" style="padding:0px;" >
                 
                <!--表格工具栏-->
                <div id="tab_custom_bar">
                    <table>
                        <tr>
                            <td>
                                <a href="#" tabindex="1" id="add_btn_custom" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新增</a>
                            </td>
                            <td>
                                <a href="#" tabindex="1" id="del_btn_custom" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">失效</a>
                            </td>
                            <td>
                                搜索:
                            </td>
                            <td>
                                <input id="search_custom_like_str" class="easyui-textbox" prompt="模糊查询" style="width: 200px;" />
                            </td>
                            <td>
                                <select id="serach_custom_cu_type" class="easyui-combobox" data-options=" panelHeight:'auto',valueField:'value', textField:'label',width:100"></select>
                            </td>
                            <td>
                                <a href="#" tabindex="1" id="query_btn_custom" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                            </td>
                            <td>
                                <a href="#" tabindex="1" id="refresh_btn_custom" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-2012080412111'">清空刷新</a>
                            </td>
                        </tr>
                    </table> 
                </div>

                <table id="tab_custom"></table> 
             

            </div>
        </div> 
    </div>
    <!--内容弹出层，新增编辑用户信息-->
    
    <div id="dlg_edit_custom" class="easyui-dialog">
        <form id="dlg_edit_custom_form">
            <input type="hidden" id="hid_cu_id" />
              
            <table class="tab_from">
                <col style="width: 10%" />
                <col style="width: 40%" />  
                <col style="width: 10%" />
                <col style="width: 40%" /> 
                <tr>
                    <td colspan="4" class="row_title">客户基本信息</td> 
                </tr>
                <tr>
                    <td class="title"> 
                        客户性质:
                    </td>
                    <td class="value">
                        <select id="dlg_cu_type" class="easyui-combobox" data-options=" panelHeight:'auto',valueField:'value', textField:'label',width:300" >

                        </select>
                    </td>
                    <td class="title" style="padding:0px; border-left:solid 2px #e4efff "> 
                        账期时长:
                    </td>
                    <td class="value" >
                        <input class="easyui-textbox" onkeyup="value=value.replace(/[^\d.]/g,'')" type="text" id="dlg_cu_fee_limit_days" style="width:80px"  />
                    </td> 
                </tr>
                <tr>
                    <td class="title"> 
                        客户描述:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_cu_name" style="width:294px"  />
                    </td> 
                    <td class="title" style="padding:0px; border-left:solid 2px #e4efff "> 
                        快捷码:
                    </td>
                    <td class="value" >
                        <input class="easyui-textbox" type="text" id="dlg_cu_code" style="width:294px"  />
                    </td> 
                </tr>
                <tr>
                    <td class="title"> 
                        简称:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_cu_short" style="width:294px"  />
                    </td> 
                    <td align="top" rowspan="2" colspan="2" style="padding:0px; border-left:solid 2px #e4efff ">
                        
                    </td> 
                </tr>
                <tr>
                    <td class="title"> 
                        税号:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_cu_duty_no" style="width:294px"  />
                    </td> 
                </tr> 
                <tr>
                    <td colspan="4" class="row_title">
                        账单投递限制
                    </td>
                </tr>
                <tr>
                    <td class="title"> 
                        应收:
                    </td>
                    <td class="value">
                         <input  type="checkbox" id="dlg_cu_rec_checkaccount_flag" /> 
                    </td> 
                    <td class="title" style="padding:0px; border-left:solid 2px #e4efff "> 
                        应付:
                    </td>
                    <td class="value" >
                        <input  type="checkbox" id="dlg_cu_pay_checkaccount_flag" /> 
                    </td> 
                </tr> 
                <tr>
                    <td colspan="4" class="row_title">
                        银行账户
                    </td>
                </tr>
                <tr>
                    <td colspan="4" rowspan="3" style="height:240px;">
                        <div id="tab_bank_bar">
                            <table>
                                <tr>
                                    <td>
                                        <a href="#" tabindex="1" id="add_btn_bank" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新增</a>
                                    </td>
                                    <td>
                                        <a href="#" tabindex="1" id="del_btn_bank" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">失效</a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <table id="tab_bank"> 
                        </table>
                    </td>
                </tr>
            </table> 
            
        </form>
    </div>

    <!--菜单-->
    <div id="mm_set_default_bank" class="easyui-menu" style="width: 100px;">
         <div onclick="set_default_bank()" data-options="iconCls:'icon-add'">设成默认账号</div> 
    </div>  

    <!--新增 银行信息-->
    <div id="dlg_edit_bank" class="easyui-dialog">
        <form id="dlg_edit_bank_form"> 
            <table class="tab_from">
                <col style="width: 25%" />
                <col style="width: 75%" />  
                <tr>
                    <td class="title"> 
                        币种:
                    </td>
                    <td class="value">
                        <select id="dlg_ba_cr_id" class="easyui-combobox" data-options=" panelHeight:'auto',valueField:'value', textField:'label',width:300" >

                        </select>
                    </td> 
                </tr>
                <tr>
                    <td class="title"> 
                        开户行:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_ba_desc" style="width:294px"  />
                    </td>
                </tr>
                <tr>
                    <td class="title"> 
                        开户行地址:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_ba_address" style="width:294px"  />
                    </td> 
                </tr>
                <tr>
                    <td class="title"> 
                        账号:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_ba_card_no" style="width:294px"  />
                    </td> 
                </tr>
                <tr>
                    <td class="title"> 
                        是否默认:
                    </td>
                    <td class="value">
                        <input  type="checkbox" id="dlg_ba_default_flag" />
                    </td> 
                </tr>   
            </table> 
            
        </form>
    </div>
</asp:Content>
