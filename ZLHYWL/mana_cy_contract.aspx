<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="mana_cy_contract.aspx.cs" Inherits="ZLHYWL.mana_cy_contract" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" />
    <link href="Style/cy_fee.css" rel="stylesheet" />
    <script src="Js/mana_cy_contract.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="easyui-panel" title="" fit="true" data-options="closable:true,border:false"  >
        <div class="easyui-layout" fit="true" id="">
	        <div data-options="region:'west',split:true,title:'',border:true," style="width:520px;padding:0px;">  
                <div class="easyui-layout" fit="true" id="">
                    <div data-options="region:'west',split:true,border:true" style="padding: 0px;width:260px;"> 
                        <div id="dv_cy_contract" data-options="fit:true,border:false,title:'CY协议列表'" class="easyui-panel">
                            <div class="easyui-layout" fit="true" id="">
                                <div data-options="region:'north',split:false,  " style="padding: 5px; border-top:none; background-color:#e2edff; overflow:hidden;">
                                    <div style="float:left;">
                                        <input  class="easyui-textbox" id="ipt_client_query_cy_contract"  placeholder="模糊筛选" oninput="client_query_cy_contract(this);" />
                                    </div> 
                                    <div style="float:right;">
                                        <a class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" href="javascript:new_cyc()"  >添加协议</a> 
                                    </div>
                                </div>
                                <div data-options="region:'center',split:false,border:false" style="padding-top:0px;">
                                    <ul class="ul_ss_menu">
                           
                                    </ul>
                                </div> 
                            </div>
                        </div>
                    </div> 
                    <div data-options="region:'center',title:'费用项目',  split:true,border:true " style="padding-top:0px; border-bottom:none;"> 
                        <div class="easyui-layout" fit="true" >
                            <div data-options="region:'north',split:false,  " style="padding: 5px;height:24px;border-right:none;border-left:none;border-top:none; background-color:#e2edff; overflow:hidden;height:36px;">   
                                <div style="float:left;">
                                    <select  class="easyui-combobox" id="cb_cy_feeitem_list" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:136" ></select>
                                </div> 
                                <div style="float:right;">
                                    <a class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" href="javascript:new_cy_contract_feeitem()">添加费项</a> 
                                </div> 
                            </div>
                            <div data-options="region:'center',  split:false,border:false" style="padding-top:0px;"> 
                                <div id="cy_contract_feeitem_list"  class="easyui-panel" data-options="border:false,fit:true" title="" style="padding-top:0px;">
                                    
                                </div> 
                            </div>
                        </div>
                                                  
                    </div> 
                </div>
            </div>
            <div data-options="region:'center',title:'CY计费标准条件筛选',border:true,split:true" >
                <div class="easyui-layout" fit="true">
                    <div data-options="region:'center',split:true,border:false" style="padding: 0px" class="cls_cy_region">
                        <div data-options="fit:true,border:false" class="easyui-panel">
                            <div id="dv_tab_cy_contract_details_bar" style="padding: 0px; margin: 0px; background-color: #daeef5;">

                                <div style="overflow: hidden;">
                                    <table class="tab_std" style="width: auto;">
                                        <tr>
                                            <td class="title">单价:</td>
                                            <td class="value">
                                                <input id="edit_fee_val" type="text" class="easyui-textbox validatebox-numeric" style="width:138px" />
                                            </td>
                                            <td class="value">
                                                <a href="javascript:update_cy_contract_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">批量设置</a>
                                            </td>

                                            <td>
                                                <a href="javascript:clear_tab_fee_list_op();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                            </div>
                            <table id="tab_cy_contract_details"></table>
                        </div>
                    </div>
                </div>
            </div>
    	</div> 
    </div>
    <div id="clumn_fliter_of_cy_fee"></div>
    <!--模态窗体，新增/修改CY协议--->
    <div id="dlg_edit_cy_contract" class="easyui-dialog" title="新增CY协议" closed="true"  style="padding:0px;">
        <form id="dlg_eitd_cy_contract_form">
            <input type="hidden" id="dlg_edit_cyc_id" />
              
            <table class="tab_from" border="0" >
                <col style="width: 15%" />
                <col style="width: 35%" /> 
                <col style="width: 15%" />
                <col style="width: 35%" />
                <tr>
                    <td colspan="4" class="row_title">基本信息</td> 
                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">协</span>议名称:
                    </td>
                    <td class="value" colspan="3" >
                        <input autocomplete="off" class="easyui-textbox" id="dlg_cyc_desc"   data-options="required:false" style=" width:93%;padding:0px;" />  
                    </td> 
                </tr> 
                <tr>
                    <td class="title"><span class="ipt_must">协</span>议码头:
                    </td>
                    <td class="value" >
                        <select class="easyui-combobox" id="dlg_cyc_port_id" data-options="required:false,panelHeight:'200', panelWidth:'200', valueField:'value', textField:'label',filter: filterCombo,width:140"  ></select>
                    </td> 
                    <td class="title"><span class="ipt_must">签</span>约时间:
                    </td>
                    <td class="value">
                        <input class="easyui-datebox"  id="dlg_cyc_sign_dat" data-options="required:false" style="width:140px"/>
                    </td>
                </tr>

                <tr>
                    <td class="title">起始时间:
                    </td>
                    <td class="value">
                        <input class="easyui-datebox"  id="dlg_cyc_begin_dat"  style="width:140px"/>
                    </td>
                    <td class="title">结束时间:
                    </td>
                    <td class="value">
                        <input class="easyui-datebox"  id="dlg_cyc_end_dat"  style="width:140px"/>
                    </td>
                </tr>  
                 
            </table> 
        </form>
    </div>

    <!--模态窗体，新增CY装卸地-->
    <div id="dlg_add_cy_contract_feeitem" class="easyui-dialog" title="添加CY费项目" closed="true" data-options="iconCls:'icon-add',modal:true,width:350,minheight:140" style="padding:0px;">
        <form id="dlg_add_cy_contract_feeitem_form">
            <input id="dlg_edit_cfi_id"  type="hidden"/>
            <table class="tab_from">
                <col style="width: 20%" />
                <col style="width: 80%" />  
                <tr>
                    <td class="title"><span class="ipt_must">费</span>项:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" type="text" readonly="true" id="dlg_cfi_desc" style="width:182px; background-color:#fff" ></input> 
                    </td>
                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">收</span>费单位:
                    </td>
                    <td class="value">
                        <input id="dlg_cy_cu_id" class="cls_customs_combogrid" style="width:188px;" /> 
                    </td>
                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">发</span>票税率:
                    </td>
                    <td class="value">
                        <input id="dlg_cyc_invoice_typ" style="width:188px;" /> 
                    </td>
                </tr> 
                <tr>
                    <td class="title"><span class="ipt_must">币</span>种:
                    </td>
                    <td class="value">
                        <input id="dlg_cyc_cr_id" style="width:188px;" /> 
                    </td>
                </tr>           
            </table> 
        </form>
    </div>
     
     
    <!--CY协议编辑菜单-->
    <div id="cy_contract_list_menu" class="easyui-menu" style="width: 30px; display: none;">  
      <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-edit'" onclick="copy_cyc()">拷贝</div>  
        <div   data-options="iconCls:'icon-edit'" onclick="edit_cyc()">编辑</div>  
        <%--<div   data-options="iconCls:'icon-add'" onclick="copy_new_cyc()">拷贝新建</div>--%>
        <div   data-options="iconCls:'icon-remove'" onclick="delete_cyc()">删除</div> 
    </div> 
    <!--CY 合同关联费项 编辑菜单-->
    <div id="cy_contract_feeitem_menu" class="easyui-menu" style="width: 30px; display: none;">  
      <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-edit'" onclick="edit_cy_contract_feeitem()">编辑</div>  
         
        <div   data-options="iconCls:'icon-remove'" onclick="delete_cy_contract_feeitem()">删除</div> 
    </div> 
   
</asp:Content>
