<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="fee_set_bank_and_invoice_info.aspx.cs" Inherits="ZLHYWL.fee_set_bank_and_invoice_info" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/fee_set_bank_and_invoice_info.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',border:false,split:false,title:'开票信息'," style="width:810px;">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'north',border:false,split:false">
                    <div  style=" background-color:#f4f4f4; overflow:hidden; border-bottom:solid 1px #dddddd;"> 
                        <a href="javascript:save_schema_cto_bank_and_invoice_info();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a> 
                           
                    </div>
                </div>
                <div data-options="region:'center',border:false,split:false">
                    <div class="easyui-panel" data-options="fit:true,border:false" style="padding:0px;">
                        <div class="easyui-layout" data-options="fit:true">
                            <div data-options="region:'north',border:false,split:false,title:'本币账户'" style="height:240px">
                                <table class="tab_std" style="width:800px">
                                    <col style="width:100px;" />
                                    <col style="width:700px;" />
                                    <tr>
                                        <td class="title">
                                            公司名称:
                                        </td>
                                        <td class="value">
                                            <input class="easyui-textbox" id="ed_c_desc" readonly="true" style="width:90%" />
                                        </td>
                                    </tr>
                                    <tr>
                                         <td class="title">
                                             税号:
                                         </td>
                                         <td class="value">
                                             <input class="easyui-textbox" id="ed_c_tax_no" style="width:90%" />
                                         </td>
                                     </tr>
                                    <tr>
                                         <td class="title">
                                             开户行:
                                         </td>
                                         <td class="value">
                                             <input class="easyui-textbox" id="ed_c_cn_bank_desc"  style="width:90%" />
                                         </td>
                                     </tr>
                                    <tr>
                                         <td class="title">
                                             银行账户:
                                         </td>
                                         <td class="value">
                                             <input class="easyui-textbox" id="ed_c_cn_bank_no"  style="width:90%" />
                                         </td>
                                     </tr>
                                    <tr>
                                         <td class="title">
                                             注册地址:
                                         </td>
                                         <td class="value" >
                                             <textarea class="easyui-textarea" id="ed_c_cn_register_address"   style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:90%; height:46px;"></textarea>
                                         </td>
                                     </tr>
                                    <tr>
                                         <td class="title">
                                             电话:
                                         </td>
                                         <td class="value">
                                             <input class="easyui-textbox" id="ed_c_cn_phone"  style="width:90%" />
                                         </td>
                                     </tr>
                                 </table>
                            </div>
                            <div data-options="region:'center',border:false,split:false,title:'外币账户'">
                                <table class="tab_std" style="width:800px">
                                    <col style="width:100px;" />
                                    <col style="width:700px;" /> 
                    
                                    <tr>
                                         <td class="title">
                                             开户行:
                                         </td>
                                         <td class="value">
                                             <input class="easyui-textbox" id="ed_c_en_bank_desc"  style="width:90%" />
                                         </td>
                                     </tr>
                                    <tr>
                                         <td class="title">
                                             银行账户:
                                         </td>
                                         <td class="value">
                                             <input class="easyui-textbox" id="ed_c_en_bank_no"  style="width:90%" />
                                         </td>
                                     </tr>
                                    <tr>
                                         <td class="title">
                                             注册地址:
                                         </td>
                                         <td class="value" >
                                             <textarea class="easyui-textarea" id="ed_c_en_register_address"   style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:90%; height:46px;"></textarea>
                                         </td>
                                     </tr> 
                                 </table>
                            </div>
                            <div data-options="region:'south',border:false,split:false,title:'收发票信息'" style="height:300px;">
                                <table class="tab_std" style="width:800px">
                                    <col style="width:100px;" />
                                    <col style="width:700px;" /> 
                                    <tr>
                                         <td class="title">
                                             收票地址:
                                         </td>
                                         <td class="value">
                                             <input class="easyui-textbox" id="ed_c_invoice_address" style="width:90%" />
                                         </td>
                                     </tr>
                                    <tr>
                                         <td class="title">
                                             收票人:
                                         </td>
                                         <td class="value">
                                             <input class="easyui-textbox" id="ed_c_invoice_name"  style="width:90%" />
                                         </td>
                                     </tr>
                                    <tr>
                                         <td class="title">
                                             联系电话:
                                         </td>
                                         <td class="value">
                                             <input class="easyui-textbox" id="ed_c_invoice_phone"  style="width:90%" />
                                         </td>
                                     </tr> 
                                 </table>
                            </div> 
                        </div> 
                    </div>
                </div>
            </div> 
        </div>
        <div data-options="region:'center'">

        </div>
    </div>
    
</asp:Content>
