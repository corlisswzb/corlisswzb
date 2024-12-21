<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="mana_fio_contract.aspx.cs" Inherits="Jbfd.mana_fio_contract" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" />
    <link href="Style/fio_fee.css" rel="stylesheet" />
    <script src="Js/mana_fio_contract.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     
    <div class="easyui-layout" data-options="fit:true">
	    <div data-options="region:'west',split:true,title:''" style="width:260px;padding:0px;">   
            <div id="dv_fio_contract" data-options="fit:true,border:false,title:'舱位费合同列表'" class="easyui-panel">
                <div class="easyui-layout" fit="true" id="">
                    <div data-options="region:'north',split:false,  " style="padding: 5px;height:35px;border-right:none;border-left:none;border-top:none; background-color:#e2edff; overflow:hidden;">
                        <div style="float:left;">
                            <input autocomplete="off"  class="easyui-textbox" id="ipt_client_query_fio_contract"  placeholder="模糊筛选" oninput="client_query_fio_contract(this);" />
                        </div> 
                        <div style="float:right;">
                            <a class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" href="javascript:new_fioc()"  >添加协议</a> 
                        </div>
                    </div>
                    <div data-options="region:'center',  split:false,border:false" style="padding-top:0px;">
                        <div class="easyui-panel" data-options="fit:true,border:false">
                            <ul class="ul_ss_menu">
                           
                            </ul>
                        </div> 
                    </div> 
                </div>
            </div> 
        </div>
        <div data-options="region:'center',title:'',border:false" >
            <div class="easyui-layout"  data-options="fit:true">
                <div data-options="region:'west',split:true,title:''" style="width: 260px; padding: 0px;">

                    <div data-options="fit:true,border:false,title:'航线列表'" class="easyui-panel">
                        <div class="easyui-layout" fit="true" id="">
                            <div data-options="region:'north',split:false,  " style="padding: 5px; height: 24px; border-right: none; border-left: none; border-top: none; background-color: #e2edff; overflow: hidden; height: 36px;">
                                <div style="float: left;">
                                    <input autocomplete="off" class="easyui-textbox" id="ipt_client_query_fio_group_area" oninput="client_query_fio_group_area(this);" placeholder="模糊筛选" />
                                </div>
                                <div style="float: right;">
                                    <a class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" href="javascript:new_group_area()">添加航线</a>
                                </div>
                            </div>
                            <div data-options="region:'center',  split:false,border:false" style="padding-top: 0px;">
                                <div id="fio_group_area_list" class="easyui-panel" data-options="fit:true,border:false">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-options="region:'center',split:false,title:''" class="cls_fio_region">
                    <div data-options="fit:true,border:false,title:'舱位费计费标准'" class="easyui-panel cls_fio_region">
                        
                        <div id="dv_tab_fio_contract_details_bar" style="padding: 0px; margin: 0px; background-color: #e4efff;">
                            <div style="overflow: hidden;">
                                <table class="tab_std" style="width: auto;">
                                    <tr>
                                        <td class="title">单价:</td>
                                        <td class="value">
                                            <input autocomplete="off" id="edit_fee_val" type="text" class="easyui-textbox validatebox-numeric" style="width:139px" />
                                        </td> 
                                        <td class="value">
                                            <a href="javascript:update_fio_contract_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">批量设置</a>
                                        </td> 
                                        <td class="value">
                                            <a href="javascript:clear_tab_fee_list_op();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                                
                        </div>
                        <table id="tab_fio_contract_details"></table>
                                    
                            
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <div id="clumn_fliter_of_fio_fee"></div>
    
    
    <!--模态窗体，新增/修改FIO合同--->
    <div id="dlg_edit_fio_contract" class="easyui-dialog" title="新增FIO合同" closed="true"  style="padding:0px;">
        <form id="dlg_eitd_fio_contract_form">
            <input type="hidden" id="dlg_edit_fioc_id" />
            <table class="tab_from">
                <col style="width: 15%" />
                <col style="width: 35%" /> 
                <col style="width: 15%" />
                <col style="width: 35%" />
                <tr>
                    <td colspan="4" class="row_title">基本信息</td>
                </tr>
                <tr id="dlg_copy_new_tips" style="display:none;">
                    <td colspan="4" class="title" style="background-color:#95b8e7;text-align:center;">
                        你正在根据[<span id="dlg_copy_fioc_desc"></span>]拷贝生成新的合同
                    </td>
                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">合</span>同名称:
                    </td>
                    <td class="value" colspan="3">
                        <input autocomplete="off" class="easyui-textbox" id="dlg_fioc_desc"   data-options="required:false" style=" width:95%;padding:0px;" />  
                    </td> 
                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">船</span>东单位:
                    </td>
                    <td class="value" colspan="3">
                        <input id="dlg_fioc_ship_rent_cu_id" class="cls_customs_combogrid" style="width:392px;" /> 
                    </td> 
                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">结</span>算单位:
                    </td>
                    <td class="value" colspan="3">
                        <input id="dlg_fioc_cu_id" class="cls_customs_combogrid" style="width:392px;" /> 
                    </td> 
                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">订</span>舱税点:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox"  id="dlg_fioc_invoice_typ" style="width:140px"/>
                    </td>
                    <td class="title"><span class="ipt_must">币</span>种:
                    </td>
                    <td class="value">
                        <input class="easyui-combobox"  id="dlg_fioc_cr_id"  data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:146">
                    </td>
                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">签</span>约时间:
                    </td>
                    <td class="value">
                        <input class="easyui-datebox"  id="dlg_fioc_sign_dat" data-options="required:false" style="width:140px"/>
                    </td>
                </tr>
                <tr>
                    <td class="title">起始时间:
                    </td>
                    <td class="value">
                        <input class="easyui-datebox"  id="dlg_fioc_begin_dat"  style="width:140px"/>
                    </td>
                    <td class="title">结束时间:
                    </td>
                    <td class="value">
                        <input class="easyui-datebox"  id="dlg_fioc_end_dat"  style="width:140px"/>
                    </td>
                </tr>  
            </table>
           
        </form>
    </div>

    <!--模态窗体，新增FIO装卸地-->
    <div id="dlg_add_fio_group_area" class="easyui-dialog" title="新增FIO装卸地" closed="true" data-options="iconCls:'icon-add',modal:true,width:350,minheight:140" style="padding:0px;">
        <form id="dlg_eitd_fio_group_area_form">
            <input id="dlg_edit_group_area_id"  type="hidden"/>
            <table class="tab_from">
                <col style="width: 30%" />
                <col style="width: 70%" /> 
                <tr>
                    <td colspan="4" id="dlg_edit_fio_group_area_title" class="row_title">基本信息</td>
                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">起</span>始地:
                    </td>
                    <td class="value">
                        <select class="easyui-combobox" id="dlg_load_area_id" data-options="required:false,panelHeight:'200', panelWidth:'200', valueField:'value', textField:'label',filter: filterCombo,width:160" ></select> 
                    </td>

                </tr>
                <tr>
                    <td class="title"><span class="ipt_must">目</span>的地:
                    </td>
                    <td class="value">
                        <select class="easyui-combobox" id="dlg_disc_area_id" data-options="required:false,panelHeight:'200', panelWidth:'200', valueField:'value', textField:'label',filter: filterCombo,width:160"></select>
                    </td>
                </tr>
                           
            </table>
            
        </form>
    </div>
     
    <!--FIO合同编辑菜单-->
    <div id="fio_contract_list_menu" class="easyui-menu" style="width: 30px; display: none;">  
      <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-edit'" onclick="edit_fioc()">编辑</div>  
        <div   data-options="iconCls:'icon-add'" onclick="copy_new_fioc()">拷贝新建</div>
        <div   data-options="iconCls:'icon-remove'" onclick="delete_fioc()">删除</div> 
    </div> 
    <!--FIO地点组合编辑菜单-->
    <div id="fio_group_area_list_menu" class="easyui-menu" style="width: 30px; display: none;">  
      <!--放置一个隐藏的菜单Div-->  
        <div data-options="iconCls:'icon-edit'" onclick="edit_group_area()">编辑</div> 
        <div data-options="iconCls:'icon-help'" onclick="copy_new_group_area()">复制</div> 
        <div data-options="iconCls:'icon-add'" onclick="copy_group_area()">启点终点互换位置</div>
        <div data-options="iconCls:'icon-remove'" onclick="delete_group_area()">删除</div> 
    </div> 
</asp:Content>
