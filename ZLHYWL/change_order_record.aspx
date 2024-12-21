<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="change_order_record.aspx.cs" Inherits="Jbfd.change_order_record" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .status_add{
            border: 1px solid;
            padding: 4px;
            border-radius: 5px;
            background-color: #FFD166;
            color: #fff;
        }

         .status_upd{
            border: 1px solid;
            padding: 4px;
            border-radius: 5px;
            background-color: #EF476F;
            color: #fff;
        }

        .status_del{
            border: 1px solid;
            padding: 4px;
            border-radius: 5px;
            background-color: #06D6A0;
            color: #fff;
        }
    </style>
    <script src="Js/change_order_record.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!--改单列表-->

    <div id="tabs_ca" class="easyui-tabs" data-options="fit:true,border:false,">
        <div title="业务明细表">
            <div id="page_order_list" class="easyui-layout" fit="true" style="padding: 0px">

                <div data-options="region:'north',title:'', split:false,border:false" style="background-color: #daeef5; border-bottom: solid 1px #95b8e7;">
                    <table class="tab_std" style="width: auto;">
                        <tr>
                            <td class="title">模糊查询:</td>
                            <td class="value" colspan="3">
                                <input id="search_like_str" class="easyui-textbox" style="width: 270px" />
                            </td>
                            <td class="title">业务起始:</td>
                            <td class="value">
                                <input id="search_od_beg_fee_dat" class="easyui-datebox" data-options="width:106" />
                            </td>
                            <td class="value" rowspan="2">
                                <textarea id="search_od_bill_nos" placeholder="提单号："  class="easyui-textarea" style="overflow-x: hidden; overflow-y: auto; resize: none; width: 206px; height: 52px;"></textarea>
                            </td>
                            <td class="value" rowspan="2">
                                <textarea id="search_od_cntr_nos" placeholder="箱号：" class="easyui-textarea" style="overflow-x: hidden; overflow-y: auto; resize: none; width: 206px; height: 52px;"></textarea>
                            </td>
                            <td><a href="javascript:refresh_change_order_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a></td>
                        </tr>
                        <tr>

                            <td class="title">订单状态:</td>
                            <td class="value">
                                <select id="search_od_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106">
                                    <option value="">全部</option>
                                    <option value="1" >未审核</option>
                                    <option value="2">审核中</option>
                                    <option value="3" selected>审核通过</option>
                                    <option value="0">审核退回</option>
                                </select>
                            </td>
                            <td class="title">业务类型:</td>
                            <td class="value">
                                <select id="search_od_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106">
                                    
                                </select>
                            </td>
                            <td class="title">业务截止:</td>
                            <td class="value">
                                <input id="search_od_end_fee_dat" class="easyui-datebox" data-options="width:106" />
                            </td>
                            <td><a href="javascript:join_changeplan();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">加入改单流程</a></td>
                        </tr>
                    </table>
                </div>
                <div data-options="region:'center',split:false,border:false" style="padding: 0px">
                    <table id="tab_change_order"></table>
                </div>

            </div>
        </div>

        <div title="我的改单计划">
            <div  class="easyui-layout" fit="true" style="padding: 0px">

                <div data-options="region:'north',title:'', split:false,border:false" style="background-color: #daeef5; border-bottom: solid 1px #95b8e7;">
                    <table class="tab_std" style="width: auto;">
                        <tr>
                            <td class="title">计划状态:
                            </td>
                            <td class="value">
                                <select id="search_cop_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106">
                                     <option value="" selected>全部</option>
                                     <option value="0" >未提交</option>
                                     <option value="1" >已提交</option>
                                     <option value="2">已完成</option>
                                </select>
                            </td>

                            <td class="title">审核状态:
                            </td>
                            <td class="value">
                                <select id="search_cop_amc_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106">
                                     <option value="" selected>全部</option> 
                                     <option value="1" >审核中</option>
                                     <option value="2">已通过</option> 
                                     <option value="-1" >退回</option>
                                </select>
                            </td>
                            <td class="title">发起时间:</td>
                            <td class="value">
                                <input id="search_cop_beg_dat" class="easyui-datebox" data-options="width:106" />
                            </td>
                             <td class="title">创建人:
                            </td>
                            <td class="value">
                                <select id="search_cop_createid" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106">
                                </select>
                            </td>
                            <td><a href="javascript:refresh_changeorder_plan_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a></td>
                        </tr>
                        <tr>
                            <td class="title">模糊查询:</td>
                            <td class="value" colspan="3">
                                <input id="search_cop_like_str" class="easyui-textbox" style="width: 270px" />
                            </td>
                            <td class="title">截止时间:</td>
                            <td class="value">
                                <input id="search_cop_end_dat" class="easyui-datebox" data-options="width:106" />
                            </td>

                        </tr>
                    </table>
                </div>
                <div data-options="region:'center',split:false,border:false" style="padding: 0px">
                    <div id="tab_cop_list_bar">
                        <a href="javascript:delete_cop_plan();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_delete'">删除计划</a>

                        <a href="javascript:sure_post_apprvoal();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-report_user'">提交审核</a>
                    </div>
                    <table id="tab_changeorder_plan"></table>
                </div>

            </div>
        </div>

    </div>

    <!--改单审核提交 选择 审核人-->
    <div class="easyui-dialog" id="dlg_post_cop_amc" data-options="closed:true">
        <div class="dv_od_lock_tips">
            计划锁定后将提交进入改单审核，你确定要提交改单审核吗？
        </div>
        <div>
            <table>
                <tr>
                    <td>请选择审核人:</td>
                    <td>
                        <select id="dlg_cop_schema_point" class="easyui-combobox" data-options="panelHeight:'auto', valueField:'value', 
                                        textField:'label',filter: filterCombo,width:146" ></select> 
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <!--锁定重新提交 选择 审核人-->
    <div class="easyui-dialog" id="dlg_repost_cop_amc" data-options="closed:true">
         
        <table class="tab_std">
            <col style="width:20%" />
            <col style="width:80%" />
            <tr>
                <td colspan="2" class="custom_bg" style=" padding:12px;line-height:22px;color:#f9534f">
                    重新提交审核
                </td>
            </tr>
            <tr>
                <td class="title">备注:</td>
                <td class="value">
                     <textarea id="dlg_ap_context"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:99%; height:68px;"></textarea> 
                </td>
            </tr>
        </table>
        
    </div>
 
    

    <!--改单 编辑菜单-->
    <div id="dv_changeorder_menu" class="easyui-menu" style="width: 50px; display: none;">  
        <div data-options="iconCls:'icon-view'" onclick="open_changeorder_plan()">加入改单计划</div>   
    </div>   

    <!--改单操作-->
    <div id="window_of_change_order" class="easyui-window" title="创建改单申请" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding: 0px;">
        <div class="easyui-layout order_fee_details" data-options="fit:true">
            <div data-options="region:'north',split:true,border:false" style="background-color: #daeef5; height: 84px; overflow: hidden;">

                <table class="tab_std" style="width: 900px;">
                    <col style="width: 60px;" />
                    <col style="width: 90px;" />
                    <col style="width: 60px;" />
                    <col style="width: 90px;" />
                    <col style="width: 60px;" />
                    <col style="width: 70px;" />
                    <col style="width: 100px;" />
                    <col style="width: 200px;" />
                    <tr>
                     
                        <td class="title">业务编号:</td>
                        <td class="value">
                            <span style="font-weight: bold" id="sp_od_no"></span>
                        </td>
                         <td class="title">订单状态:</td>
                        <td class="value">
                            <span style="font-weight: bold" id="sp_od_status"></span>
                        </td>
                        <td class="title">业务类型:</td>
                        <td class="value">
                            <span style="font-weight: bold" id="sp_od_typ"></span>
                        </td>
                        <td class="title">改单备注:</td>
                        <td class="value" rowspan="2" valign="top">
                            <textarea id="wds_co_bak" class="easyui-textarea" style="overflow-x: hidden; overflow-y: auto; resize: none; width: 200px; height: 70px;"></textarea>
                        </td>
                        <td>&nbsp; &nbsp;
                            <a href="javascript:begin_create_changeorder_plan();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'">保存计划</a>

                        </td>
                    </tr>
                    <tr>
                        <td class="title">应收:</td>
                        <td class="value">
                            <span style="font-weight: bold" id="sp_rec"></span>
                        </td>
                         <td class="title">应付:</td>
                        <td class="value">
                            <span style="font-weight: bold" id="sp_pay"></span>
                        </td>
                        <td class="title">盈利:</td>
                        <td class="value">
                            <span style="font-weight: bold" id="sp_total"></span>
                        </td>
                       
                    </tr>
                </table>
            </div>
            <div data-options="region:'center',split:true,border:false">
                <div class="easyui-panel" data-options="title:'原费用明细 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注: 对单一费用修改和删除操作只能执行一次。',border:false,fit:true">
                    <div class="easyui-layout" data-options="fit:true"> 
                        <div data-options="region:'center',split:true,border:false">
                            <div id="tab_fee_old_list_bar">
                                <a id="lbtn_insrec" href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'#mm_add',iconCls:'icon-add'">新增</a>
                                <div id="mm_add" style="width:220px;">
	                                <div onclick="javascript:insert_new_rec();">应收</div>
	                                <div onclick="javascript:insert_new_pay();">应付</div> 
                                </div>
                                <a id="lbtn_bthins" href="javascript:batch_insert_table_new();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">删除</a>
                                <a id="lbtn_bthupd" href="javascript:batch_update_table_new();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">修改</a>
                                <a id="lbtn_bthdel" href="javascript:batch_delete_table_new();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_delete'">批量删除费用</a>
                            </div>
                            <table id="tab_fee_list_of_old_rp"></table>
                        </div>
                    </div>
                </div>
            </div>
            <div data-options="region:'south',split:true,border:false" style="background-color: #daeef5; height: 200px; overflow: hidden;">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'center',split:true,border:false">
                        <div class="easyui-panel" data-options="title:'修改内容',border:false,fit:true">
                            <div class="easyui-layout" fit="true">
                                
                                <div data-options="region:'center',title: '',split:false,border:false">
                                    <div class="easyui-panel" data-options="title:'',fit:true,border:false">
                                        <div id="tab_fee_new_list_bar">
                                            <a id="lbtn_delrow" href="javascript:delete_table_row();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_delete'">删除费用</a>
                                             <a id="lbtn_certab" href="javascript:clear_table_new();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_delete'">清空费用</a>
                                        </div>
                                        <table id="tab_fee_list_of_new_rp"></table>
                                    </div>
                                </div>

                                <div id="lay_east" data-options="region:'east',title: '',split:true,border:false" style="width:400px">
                                     <div class="easyui-panel" data-options="title:'费用汇总',fit:true,border:false">
                                         <table id="tab_fee_group_list"></table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--计划改单详情-->
    <div id="window_of_change_order_details" class="easyui-window" title="改单计划详情" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding: 0px;">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false" style="background-color: #daeef5; height: 84px; overflow: hidden;">
                <table class="tab_std" style="width: 900px;">
                                     <col style="width:90px;" />
                    <col style="width:90px;" />
                    <col style="width:70px;" />
                    <col style="width:200px;" />
                    <col style="width:70px;" />
                    <col style="width:70px;" />
                    <col style="width:90px;" /> 
                    <col style="width:100px;" />
                    <col style="width:70px;" /> 
                    <col style="width:200px;" />
                    <col style="width:150px;" />
                    <tr> 
                        <td class="title">创建人:</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sp_pl_create_nam"></span>
                        </td>
                        <td class="title">创建时间:</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sp_pl_create_date"></span>
                        </td>
                        <td class="title">计划状态:</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sp_pl_status_desc"></span>
                        </td>
                     
                        <td class="title">改单备注:</td>
                        <td class="value" rowspan="3" valign="top">
                            <textarea id="taa_pl_bak" readonly="readonly"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:200px; height:70px;"></textarea> 
                        </td>
                    </tr>
                    <tr>
                        <td class="title">总计(修改前):</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sp_pl_total_old"></span>
                        </td>
                        <td></td>
                        <td></td>
                        <td class="title">审核状态:</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sp_pl_amc_status_desc"></span>
                        </td>
                      
                    </tr>
                     <tr>
                        <td class="title">总计(修改后):</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sp_pl_total_new"></span>
                        </td>
                      
                        <td></td>
                        <td></td>
                        <td></td> 
                        <td></td>
                        <td></td> 
                       
                    </tr>
                </table>
            </div>
            <div data-options="region:'center',split:false,border:false">
                <div class="easyui-panel" data-options="title:'应收修改',border:false,fit:true">
                    <div class="easyui-layout" data-options="fit:true">
                        <div data-options="region:'center',split:false,border:false">
                            <table id="tab_fee_list_of_rec"></table>
                        </div>
                        <div data-options="region:'south',split:false,border:false" style="background-color: #daeef5; overflow: hidden;">
                            <div style="float: right; line-height: 28px; height: 28px; font-weight: bold;">
                                (原)总应收:
                        <span id="sp_rec_old"></span>(本币)
                        &nbsp;&nbsp;&nbsp;&nbsp;(修)总应收:
                        <span id="sp_rec_new"></span>(本币)
                               &nbsp;&nbsp;&nbsp;&nbsp;
                                <span id="sp_rec_dif"></span>(本币)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div data-options="region:'south',split:false,border:false" style="background-color: #daeef5; height: 200px; overflow: hidden;">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'center',split:false,border:false">
                        <div class="easyui-panel" data-options="title:'应付修改',border:false,fit:true">
                            <div class="easyui-layout" fit="true">
                                <div data-options="region:'center',title: '',split:false,border:false">
                                    <div class="easyui-panel" data-options="title:'',fit:true,border:false">
                                        <table id="tab_fee_list_of_pay"></table>
                                    </div>
                                </div>
                                <div data-options="region:'south',split:false,border:false" style="background-color: #daeef5; overflow: hidden;">
                                    <div style="float: right; line-height: 28px; height: 28px; font-weight: bold;">
                                        (原)总应付:
                        <span id="sp_pay_old"></span>(本币)
                        &nbsp;&nbsp;&nbsp;&nbsp;(修)总应付:
                        <span id="sp_pay_new"></span>(本币)
                               &nbsp;&nbsp;&nbsp;&nbsp;
                                <span id="sp_pay_dif"></span>(本币)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--编辑菜单-->
    <div id="dv_costatus_menu" class="easyui-menu" style="width: 50px; display: none;">  
        <div id="add" data-options="iconCls:'icon-view'" onclick="menu_editfee(1)">新增费用</div>
        <div id="edit" data-options="iconCls:'icon-view'" onclick="menu_editfee(2)">修改费用</div>  
        <div id="del" data-options="iconCls:'icon-view'" onclick="menu_editfee(3)">删除费用</div>     
    </div>  
    
</asp:Content>
