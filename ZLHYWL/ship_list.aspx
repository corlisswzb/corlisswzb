<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="ship_list.aspx.cs" Inherits="ZLHYWL.ship_list" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/ship_list.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <div id="page_ship_list" class="easyui-panel" title="船列表"  fit="true"  data-options="border:false," > 
        <div id="ship_list_bar"  > 
            <table >
                <tr>
                    <td class="td_title">
                        模糊查询:
                    </td>
                    <td class="td_input" colspan="3">
                        <input id="search_like_ship_voyage" class="easyui-textbox" placeholder ="" style=" width:193px;vertical-align:middle;" />
                    </td>
                    <td>
                        <a href="javascript:refresh_ships();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">查询</a>
                    </td>
                    <td>
                        <a href="javascript:open_edit_ship_dialog(true);" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新建船</a>
                    </td>
                </tr>
            </table> 
        </div>
        <table id="tab_ship_list" ></table>
    </div>  

     <div id="dlg_edit_ship" class="easyui-dialog" data-options="closed:true">
        <form id ="dlg_eitd_ship_form">
            <input type="hidden" id="dlg_ship_id" />
            
		    <table class="tab_from">
                <col style="width:20%"/>
                <col style="width:30%"/>
                <col style="width:15%"/>
                <col style="width:35%"/>
                 
                <tr>
                    <td colspan="4" class="row_title">基本信息</td>
                </tr>
                <tr>
                    <td class="title">
                        <span class="ipt_must">船</span>名:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox"   type="text" id="dlg_ship_desc"  data-options="required:false" />
                    </td>
                   
                </tr> 
                <tr>
                     <td class="title">
                        <span class="ipt_must">简</span>码:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox"  type="text" id="dlg_ship_en_cod"  data-options="required:false" />
                    </td>
                    <td class="title">
                        <span class="ipt_must">拼</span>音码:
                    </td>
                    <td class="value" >
                        <input class="easyui-textbox"   type="text" id="dlg_ship_en_long_cod"  data-options="required:false" />
                    </td> 
                </tr> 
                <tr>
                   <td class="title">
                        <span class="ipt_must">船</span>东单位:
                   </td>
                   <td class="value" colspan="3">
                        <input class="cls_customs_combogrid"  id="dlg_ship_rent_cu_id" style="width:396px;"/>
                   </td>
                  
                </tr>
                <tr>
                    <td class="title">
                        最大装箱量(T):
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" value="0" id="dlg_ship_max_std_cntr_num"  data-options="validType:'number'"/>
                    </td>
                    <td class="title">
                        联系电话:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" id="dlg_ship_relation_phone"   />
                    </td>
                </tr>
              
                <tr>
                    <td colspan="4" class="row_title">登记识别号</td>
                </tr>
                <tr>
                    <td class="title">
                        海关编码:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" value="0" id="dlg_ship_custom_no"  />
                    </td> 
                     <td class="title">
                        船舶识别号:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" value="0" id="dlg_ship_recognition_no"  />
                    </td>
                </tr>
                <tr>
                    <td class="title">
                        初次登记号:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" value="0" id="dlg_ship_original_no"  />
                    </td>
                    <td class="title">
                        船舶登记号:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" value="0" id="dlg_ship_regist_no" />
                    </td>
                </tr>
                <tr> 
                    
                   
                    <td class="title">
                        是否有效:
                    </td>
                    <td class="value">
                        <input type="checkbox" class="chb" id="dlg_ship_valid" checked />
                    </td> 
                </tr>
             
		    </table>
            <div id="dlg_edit_result_tips" style="display:none; margin-top:8px; background-color:#ff6a00;color:#fff; text-align:center; font-size:12px;height:24px;">
                <div id="dlg_edit_result_msg">
                    保存失败
                </div>
            </div>
        </form>
        
	</div>

</asp:Content>
