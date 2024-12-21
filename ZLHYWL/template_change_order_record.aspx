<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_change_order_record.aspx.cs" Inherits="Jbfd.template_change_order_record" %>

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
    
<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_order_info_frame.css" rel="stylesheet" />
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>

<script src="Js/change_order_record2.js"></script>
<body style="width:100%;height:100%; overflow:hidden;padding:0px; margin:0px;">
    <!--逻辑做 简单点 
        就只做 作废和新增 
        作废打上标记，审核后，插入到历史表 备注 增加作废字样 , update_id和update_dat时间标记上 

        新增： 应收正常增加

               应付需要选择 order_service_sub_seq 

        直接提交申请，系统自动生成标题 

        -->
    <div class="easyui-layout order_fee_details" data-options="fit:true">
        <div data-options="region:'north',split:true,border:false" style="background-color: #daeef5; height: 84px; overflow: hidden;">

            <table class="tab_std" style="width: 900px;">
                <col style="width: 50px;" />
                <col style="width: 90px;" />
                <col style="width: 50px;" />
                <col style="width: 90px;" />
                <col style="width: 70px;" />
                <col style="width: 200px;" />
                <col style="width: 70px;" />
                <col style="width: 50px;" />
                <tr>
                      
                    <td class="title">业务编号:</td>
                    <td class="value">
                        <span style="font-weight: bold" id="sp_od_no">未提交</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td class="title">改单备注:</td>
                    <td class="value" rowspan="2" valign="top">
                        <textarea id="wds_co_bak" class="easyui-textarea" style="overflow-x: hidden; overflow-y: auto; resize: none; width: 200px; height: 70px;"></textarea>
                    </td>
                    <td>&nbsp; &nbsp;
                        <a href="javascript:begin_create_changeorder_plan();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'">提交计划</a>

                    </td>
                </tr>
                <tr>
                    <td class="title">订单状态:</td>
                    <td class="value">
                        <span style="font-weight: bold" id="sp_od_status">审核通过</span>
                    </td>
                    <td class="title">业务类型:</td>
                    <td class="value">
                        <span style="font-weight: bold" id="sp_od_typ">未提交</span>
                    </td>
                </tr>
            </table>
        </div>
        <div data-options="region:'center',split:true,border:false">
            <div class="easyui-layout order_fee_details" fit="true">
                <div data-options="region:'center',split:true,border:false" class="cls_panel_rec">
                    <div class="easyui-panel cls_panel_rec" data-options="title:'应收费用',fit:true,border:false ">
                        <div class="easyui-layout" fit="true">
                            <div data-options="region:'west',title:'',split:true,border:false" style="width:36px;" >
                                <div class="easyui-panel" data-options="title:'',fit:true,border:false" style="background-color:#daeef5">
                                    <table>
                                        <tr>
                                            <td>
                                                <a href="javascript:rec_insert_order_fee_details();" tabindex="1" class="easyui-linkbutton" title="增加应收费用" data-options="plain:true,iconCls:'icon-add'"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <a href="javascript:rec_copy_order_fee_details();" tabindex="1" class="easyui-linkbutton" title="复制添加应收费用" data-options="plain:true,iconCls:'icon-page_white_copy'"></a>
                                            </td>
                                        </tr>
                                        <%--<tr>
                                            <td>
                                                <a href="javascript:rec_insert_order_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-package_down'"></a>
                                            </td>
                                        </tr> --%>
                                        <tr>
                                            <td>
                                                <a href="javascript:rec_delete_order_fee_details();" tabindex="1" class="easyui-linkbutton" title="删除应收费用" data-options="plain:true,iconCls:'icon-remove'"></a>
                                            </td>
                                        </tr>
                                 
                                    </table>
                                </div>
                            </div>
                            <div data-options="region:'center',title: '',split:true,border:false">
                                <div class="easyui-panel" data-options="title:'',fit:true,border:false">
                                    <table id="tab_order_fee_rec"></table>
                                </div>
                            </div>
                            <div data-options="region:'south',split:true,border:false" class="custom_bg" style=" height:26px; " >
                                <div style="display:flex;height:100%;">
                                    <div style="flex:1">
                                        <table class="cls_group_order_fee all_group_order_fee_rec"> 
                                            <tbody>
                                                <tr></tr>
                                            </tbody>
                
                                        </table>
                                    </div>
                                    <div style="flex:1;text-align:right;">
                                        <table class="cls_group_order_fee change_group_order_fee_rec"> 
                                            <tbody>
                                                <tr></tr>
                                            </tbody>
                
                                        </table>
                                    </div>
                                </div>  
                            </div>
                        </div> 
                    </div>
                </div>
                <div data-options="region:'south',title:'', split:true, border:false " class="cls_panel_pay">
                    <div class="easyui-panel " data-options="title:'应付费用',fit:true,border:false ">
                        <div class="easyui-layout" fit="true">
                            <div data-options="region:'west',title:'',split:false,border:false" style="width:36px;" >
                                <div class="easyui-panel" data-options="title:'',fit:true,border:false" style="background-color:#daeef5">
                                    <table>
                                        <%-- <tr>
                                            <td>
                                                <a href="javascript:pay_insert_order_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'"></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <a href="javascript:pay_copy_order_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-page_white_copy'"></a>
                                            </td>
                                        </tr>--%>
                                        <tr>
                                            <td>
                                                <a href="javascript:copy_to_rec_order_fee_details();" title="拷贝费用到应收明细" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-folder_up'"></a>
                                            </td>
                                        </tr>  
                                        <%-- <tr>
                                            <td>
                                                <a href="javascript:pay_delete_order_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'"></a>
                                            </td>
                                        </tr>--%>
                                 
                                    </table>
                                                     
                                </div>
                            </div>
                            <div data-options="region:'center',title: '',split:false,border:false">
                                <div class="easyui-panel" data-options="title:'',fit:true,border:false">
                                    <table id="tab_order_fee_pay"></table>
                                </div>
                            </div>
                            <div data-options="region:'south',split:false,border:false" class="custom_bg" style="  height:26px;  " >
                                <div style="display:flex;height:100%;">
                                    <div style="flex:1">
                                        <table class="cls_group_order_fee all_group_order_fee_pay"> 
                                            <tbody>
                                                <tr></tr>
                                            </tbody>
                
                                        </table>
                                    </div>
                                    <div style="flex:1;text-align:right;">
                                        <table class="cls_group_order_fee change_group_order_fee_pay"> 
                                            <tbody>
                                                <tr></tr>
                                            </tbody>
                
                                        </table>
                                    </div>
                                </div>  
                            </div>
                        </div>  
                    </div>
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
      
   
</body> 
