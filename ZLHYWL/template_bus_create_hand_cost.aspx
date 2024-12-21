<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_bus_create_hand_cost.aspx.cs" Inherits="Jbfd.template_bus_create_hand_cost" %>
<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/order_service_frame.css" rel="stylesheet" />


<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>
<script src="Js/template_create_hand_cost.js"></script>
<script src="Js/bus_create_ca_bus.js"></script>
<body style="width:100%;height:100%; overflow:hidden;padding:0px; margin:0px;"> 
     
    <div class="easyui-panel" data-options="fit:true,border:false">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false" style="height:130px;">
                <div class="easyui-panel" data-options="fit:true,border:false,title:'人工成本信息'">
                    <table class="tab_std">
                        <col style="width:80px;" />
                        <col style="width:600px;" />
                        <col style="width:auto" />
                        <tr>
                            <td class="title">选择委托数:</td>
                            <td class="value">
                                <b><span id="sel_od_count"></span></b>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="title">原总盈利:</td>
                            <td class="value">
                                <b><span id="sel_od_total_profit"></span></b>
                            </td><td></td>
                        </tr>
                        <tr>
                            <td class="title">现增加成本:</td>
                            <td class="value">
                                <b><span id="now_hand_cost"></span></b>
                            </td><td></td>
                        </tr>
                        <tr>
                            <td class="title">成本描述:</td>
                            <td class="value">
                                <b><span id="now_hand_cost_desc"></span></b>
                            </td><td></td>
                        </tr>

                    </table>
                </div>
            </div>
            <div data-options="region:'center',split:false,border:false">
                <div class="easyui-panel" data-options="fit:true,border:false,split:false,title:'增加支出费用明细'">
                    <div id="tab_fee_list_bar">
                        <a href="javascript:void(0);" id="btn_save_fee" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">全选并确定新增</a>    
                        <a href="javascript:void(0);" id="btn_insert_ca"  tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">全选并加入账单</a> 
                        <a href="javascript:void(0);" id="btn_delete_fee" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-delete'">全选并删除费用</a>    
                        <a href="javascript:close_hand_cost_win();"   tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'">关闭窗口</a>    
                    </div>
                    <table id="tab_fee_list"> 
                    </table>
                </div>
            </div>
        </div> 
    </div>
    
    <!-- 账单选择 -->
    <div id="dlg_choise_ca_main" class="easyui-dialog" style="padding:0px;">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',border:false,split:false" class="custom_bg" style=" height:98px">
                <input type="hidden" id="dlg_ca_cu_id" />
                <table class="tab_std">
                    <col style="width:60px" />
                    <col style="width:220px" />
                    <col style="width:30px" />
                    <col style="width:100px" />
                    <col style="width:30px" />
                    <col style="width:100px" />
                    <tr>
                        <td colspan="6" style="text-align:center;font-weight:bold;font-size:14px;">
                            当前选择: <span id="dlg_ca_total_rowcount"></span>行数据，金额共计<span id="dlg_ca_total_money"></span><span>,请选择一个账单并入。</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            结算单位:
                        </td>
                        <td class="value">
                            <span id="dlg_ca_cu_desc"></span>
                        </td>
                        <td class="title">
                            年份:
                        </td>
                        <td>
                            <select id="dlg_search_ca_year" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:76" ></select>
                        </td>
                        <td class="title"> 
                            月份:
                        </td>
                        <td>
                            <select id="dlg_search_ca_month" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:76" ></select>
                        </td>
                    </tr>
                </table>        
            </div>
            <div data-options="region:'center',border:false,split:false">
                <div id="dlg_tab_choise_ca_main_list_bar">
                    <a href="javascript:insert_ca_main_2();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新建账单</a>
                </div>
                <table id="dlg_tab_choise_ca_main_list"></table>
            </div>
        </div>
    </div>
    <!--账单新建-->
    <div id="dlg_new_ca_main" class="easyui-dialog" style="padding:0px;">
        <input type="hidden" id="dlg_ed_ca_seq"> 
        <table class="tab_std">
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:30%" />
            <tr>
                <td colspan="6" class="custom_bg" style="  padding:12px;line-height:22px;color:#f9534f">
                    <span>
                        非邀约对账单可以不用填标题，邀约账单必须填写标题。<br/>
                        非邀约对账单未填写标题，标题默认为“公司名+年+月”<br/>
                        如需要多人协作对账，请标记邀约。
                    </span>
                </td>
            </tr>
            <tr>
                <td class="title">
                    结算单位:
                </td>
                <td class="value" colspan="3">
                    <input id="dlg_ed_ca_cu_id" class="cls_customs_combogrid" style="width:356px;" />  
                    
                </td>
            </tr>
            <tr>
                <td class="title">
                    年份:
                </td>
                <td>
                    <select id="dlg_ed_ca_year" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:76" ></select>
                </td>
                <td class="title"> 
                    月份:
                </td>
                <td>
                    <select id="dlg_ed_ca_month" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:76" ></select>
                </td>
            </tr>
            <tr>
                <td class="title">
                    标题:
                </td>
                <td class="value" colspan="5">
                    <input type="text" autocomplete="off" class="easyui-textbox" id="dlg_ed_ca_title" style="width:350px" /> 
                </td>
            </tr>
            <tr>
                <td class="title">
                    备注:
                </td>
                <td class="value" colspan="5">
                    <textarea id="dlg_ed_ca_bak" placeholder="请填写开票信息或其他有助于商务操作信息" class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:350px; height:60px;"></textarea>  
                     
                </td>
            </tr>
            <tr>
                <td class="title">
                    邀约:
                </td>
                <td class="value">
                    <input type="checkbox" id="dlg_ed_ca_group_flag" />
                </td> 
                <td class="title dlg_tr_group_flag">
                    指定:
                </td>
                <td class="value dlg_tr_group_flag">
                    <input type="checkbox" id="dlg_ed_ca_assign_flag" />
                </td>
                <td class="title dlg_tr_group_flag">
                    截止日期:
                </td>
                <td class="value dlg_tr_group_flag">
                    <input type="text" id="dlg_ed_ca_limit_dat" class="easyui-datebox" data-options="width:96" />
                </td>
            </tr>
            <tr class="dlg_tr_relation_user_desc">
                 <td class="title">
                    关联对账:
                </td>
                <td class="value" colspan="4">
                    <input type="text" class="easyui-textbox" readonly="true" id="dlg_ed_ca_relation_user_desc" style="width:300px" /> 
                </td>
                <td class="value" style="text-align:right; padding-right:8px;">
                    <input id="dlg_ed_ca_bind_relation_u_ids" type="hidden" />
                    <a href="javascript:dlg_ed_ca_bind_relation_user();" class="easyui-linkbutton" data-options="plain:true," >绑定...</a>
                </td>
            </tr>
            <tr>
                <td colspan="6" style="height:200px;">
                    <div id="dlg_tab_ca_files_bar">
                        <a href="javascript:dlg_upload_ca_file();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">添加</a> 
                        <a href="javascript:dlg_delete_ca_file();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">移除</a> 
                    </div>
                    <table id="dlg_tab_ca_files"></table>
                </td>
            </tr>
            
        </table>        
             
             
        
    </div>
    <!-- 账单关联人选择 -->
    <div id="dlg_user_list" class="easyui-dialog" style="padding:0px;"> 
        <table id="dlg_tab_user_list"></table> 
    </div>
    <!--文件上传控件-->
    <input style="display:none" type="file" id="file_upload" /> 
</body>
 
