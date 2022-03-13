<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_ca_rec_for_bus_of_focus.aspx.cs" Inherits="ZLHYWL.template_ca_rec_for_bus_of_focus" %>
<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
  
<link href="Style/checkaccount.css" rel="stylesheet" />
 
<link href="Style/public.css" rel="stylesheet" /> 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>  
<script src="Js/bus_create_ca_bus.js"></script>  
<script src="Js/template_ca_rec_for_bus_of_focus.js"></script> 
 
<body style="width:100%;height:100%; overflow:hidden;  padding:0px; margin:0px;">
     
            
    <div class="easyui-layout" data-options="fit:true" style="padding:0px">
        <div data-options="region:'north',split:false,border:false" class="custom_bg" style=" border-bottom:solid 1px #95b8e7;height:32px;"> 
            <table class="tab_std" style="width:auto;  ">
                <tr> 
                    <td class="remove_part_fee">
                        <a href="javascript:show_win_of_group_ca(1);" tabindex="1" class="easyui-linkbutton top_group_menu_1" data-key="未交账" data-options="plain:true,iconCls:'icon-query'">未交账</a> 
                    </td> 
                    <td>
                        <a href="javascript:show_win_of_group_ca(2);" tabindex="1" class="easyui-linkbutton top_group_menu_2" data-key="待开票" data-options="plain:true,iconCls:'icon-query'">待开票</a> 
                    </td>  
                    <td>
                        <a href="javascript:show_win_of_group_ca(3);" tabindex="1" class="easyui-linkbutton top_group_menu_3" data-key="待收款" data-options="plain:true,iconCls:'icon-query'">待收款</a> 
                    </td> 
                                            
                    <td>
                        <a href="javascript:clear_tab_ca_list_op();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406015709810_easyicon_net_16'">清空所有筛选</a> 
                    </td>
                 
                    <td>
                        <a href="javascript:change_to_ca_normal_model();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-award_star_add'">切换到普通模式</a> 
                    </td>
                </tr>
            </table> 
        </div>
        <div class="cls_ca_region" data-options="region:'center',split:false,border:false">
                                
            <div id="tab_ca_list_bar"> 
                    <a href="javascript:delete_ca_main();" tabindex="1" class="easyui-linkbutton remove_part_fee" data-options="plain:true,iconCls:'icon-table_delete'">删除账单</a>
                    <a href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'#mm_update', iconCls:'icon-table_edit'">修改账单</a>
                    <div id="mm_update"  style="width:236px;">
                        <div data-options="iconCls:'icon-edit'" onclick="javascript:update_ca_main();">修正账单基本信息(不含结算单位)</div> 
                        <div data-options="iconCls:'icon-edit'" onclick="javascript:update_ca_title_and_cu_id();">(仅)修改结算单位及标题</div> 
                    </div> 
                    <a href="javascript:post_ca_main();" tabindex="1" class="easyui-linkbutton remove_part_fee" data-options="plain:true,iconCls:'icon-table_go'">交账</a>
                    <a href="javascript:giveback_ca_main();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_delete'">退回账单</a> 
                    <a href="javascript:query_ca_of_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查看费用明细</a> 
                    <a href="javascript:menu_download_rec_fee();" tabindex="1" class="easyui-linkbutton remove_part_fee" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载对账单</a>
                       
                <%-- <a href="javascript:post_ca_to_amc();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-report_user'">提交审核</a> --%>
                    <%--<a href="#" class="easyui-menubutton" data-options="menu:'#mm_checkaccount_invoice'">账单收票标记</a>
                    <div id="mm_checkaccount_invoice" style="width:100px;">
		            <div onclick="javascript:flag_checkaccount_invoice();" data-options="iconCls:'icon-lock_go'">标记账单已收票</div>
		            <div onclick="javascript:unflag_checkaccount_invoice();" data-options="iconCls:'icon-lock_delete'">取消账单收票标记</div> 
	                </div>--%>
                    <a href="javascript:view_write_off_accounts_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table'">收款销账记录</a> 
                    <a href="javascript:view_flag_invoice_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table'">收款发票记录</a> 
            </div>
            <table id="tab_ca_list"></table>
            
        </div>
        <div data-options="region:'south',split:false,border:false" class="custom_bg" style=" height:26px;  " >
            <div style="display:flex;height:100%;">
                <div style="flex:1">
                    <table class="cls_group_order_fee all_group_ca_fee"> 
                        <tbody>
                            <tr></tr>
                        </tbody> 
                    </table>
                </div>
                <div style="flex:1;text-align:right;">
                    <table class="cls_group_order_fee selected_group_ca_fee"> 
                        <tbody>
                            <tr></tr>
                        </tbody>
                
                    </table>
                </div>
            </div>  
        </div>
    </div>
    <div id="columns_fliters"></div>        
        
    <!-- 账单附件查看 -->
    <div id="dlg_ca_attachment_list" class="easyui-dialog" style="padding:0px;"> 
        <table id="dlg_tab_ca_attachment_list"></table> 
    </div>
    <!--账单费用查看-->
    <div id="win_woa_or_iv_order_fee" class="easyui-window"   title="" data-options="modal:false,inline:true,shadow:false,  closed:true,closeable:false, iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px;">
		 
	</div>
    <!--核销记录-->
    <div id="window_of_write_off_accounts" class="easyui-window"   title="账单明细" data-options="modal:false,inline:true,shadow:false,  closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	    
    </div>
    <!--发票记录-->
    <div id="window_of_flag_invoice_list" class="easyui-window"   title="" data-options="modal:false, inline:true,shadow:false, closed:true,iconCls:'icon-save', fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	    
    </div>
     <!--CY 合同关联费项 编辑菜单-->
    <div id="win_dv_view_of_approval_details_from_ca_list" class="easyui-menu" style="width: 240px;">  
       <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_approval_details_from_ca_list()">查看账单审核流程</div>   
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_bank_info_from_ca_list()">查看账单结算单位银行信息</div>
       
    </div> 
    <!--账单修改-->
    <div id="dlg_new_ca_main2" class="easyui-dialog" style="padding:0px;">
        <input type="hidden" id="dlg_ed_ca_seq2"> 
        <table class="tab_std">
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:30%" />
            <tr>
                <td colspan="6" class="custom_bg" style=" padding:12px;line-height:22px;color:#f9534f">
                    <span>
                        账单结算单修改会使得账单相关费用的结算单位一并进行修改。<br/>
                        注: 仅能对未交账账单进行修改，仅支持账单创建者对账单进行修改！<br />
                    </span>
                </td>
            </tr>
            <tr>
                <td class="title">
                    结算单位:
                </td>
                <td class="value" colspan="3">
                    <input id="dlg_ed_ca_cu_id2" class="cls_customs_combogrid" style="width:356px;height:24px;" />  
                </td>
            </tr> 
            <tr>
                <td class="title">
                    标题:
                </td>
                <td class="value" colspan="5">
                    <input type="text" autocomplete="off" class="easyui-textbox" id="dlg_ed_ca_title2" style="width:350px" /> 
                </td>
            </tr>
            <tr>
                <td class="title">
                    备注:
                </td>
                <td class="value" colspan="5">
                    <textarea id="dlg_ed_ca_bak2" placeholder="请填写开票信息或其他有助于商务操作信息" class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:350px; height:60px;"></textarea>  
                     
                </td>
            </tr>  
        </table>   
        
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
                <td colspan="6" class="custom_bg" style=" padding:12px;line-height:22px;color:#f9534f">
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
                    <input id="dlg_ed_ca_cu_id" class="cls_customs_combogrid" style="width:356px;height:24px;" />  
                    
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
    <!-- 投递账单 -->
    <div id="dlg_post_ca" class="easyui-dialog" style="padding:0px;"> 
        <table class="tab_std">
            <input type="hidden" id="dlg_post_ca_seq" />
            <col style="width:14%" />
            <col style="width:86%" /> 
            <tr>
                <td class="title">备注:</td>
                <td class="value">
                    <textarea id="dlg_post_ca_bak" placeholder="请填写开票信息或其他有助于商务操作信息"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:350px; height:60px;"></textarea>  
                     
                </td>
            </tr>
        </table>
    </div>
   
</body>
 
