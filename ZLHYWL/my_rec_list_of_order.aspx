<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="my_rec_list_of_order.aspx.cs" Inherits="ZLHYWL.my_rec_list_of_order" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" />
    <script src="Js/operation_create_ca.js"></script>
    <script src="Js/my_rec_list_of_order.js"></script>
    <!--  
        两个页面，
        一个生成账单
        一个账单管理 
        -->
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="tabs_bar" >
        <span style="line-height:28px; padding-left:4px;padding-right:4px;"><b>当前位置:业务应收账单</b></span>
    </div>
    <div id="tabs_ca" class="easyui-tabs" data-options="fit:true,border:false,tools:'#tabs_bar',">
        <div title="应收费用列表">
            <div class="easyui-panel" id="pay_order_fee_list" data-options="fit:true" style="overflow:hidden;">

            </div>
             
        </div>
        <div title="应收账单列表">
            
            <div class="easyui-panel" data-options="title:'应收账单',border:false,fit:true">
                <div class="easyui-layout" data-options="fit:true" style="padding:0px">
                    <div data-options="region:'north',split:false,border:false" class="custom_bg" style="border-bottom:solid 1px #95b8e7;">
                        <table class="tab_std " style="width:auto;  ">
                            <tr> 
                                <td class="title">
                                    结算单位:
                                </td>
                                <td class="value" colspan="3"> 
                                    <input id="search_ca_cu_id" class="cls_customs_combogrid" style="width:276px;" />
                                </td>
                                <td class="title">发票号:</td>
                                <td class="value" colspan="3">
                                    <input id="search_ca_invoice_no" class="easyui-textbox cls_invoice_no" style="width:256px" />
                                </td>  
                                <td class="title">发起人:</td>
                                <td class="value">
                                    <select id="search_ca_create_by_id" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                   
                                    </select>
                                </td> 
                                <td class="title">年份:</td>
                                <td class="value"> 
                                    <select id="search_ca_year" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                </td>
                                <td class="title">月份:</td>
                                <td class="value"> 
                                    <select id="search_ca_month" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                </td>   
                                <td>
                                    <%--<a href="javascript:change_to_ca_focus_model();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-award_star_add'">切换到专注模式</a>--%> 
                                </td>
                                            
                            </tr>
                            <tr>
                                <td class="title">模糊查询:</td>
                                <td class="value" colspan="3">
                                    <input id="search_like_str" class="easyui-textbox" style="width:270px" />
                                </td> 
                                <td class="title">
                                    账单状态:
                                </td>
                                <td class="value">
                                    <select id="search_ca_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" >
                           
                                        <option value="" >全部</option> 
                                        <option value="1"selected>未交账</option>
                                        <option value="2" >已交未销</option>
                                        <option value="3">已销账</option> 
                                    </select>
                                </td> 
                                <td class="title">
                                    审核状态:
                                </td>
                                <td class="value">
                                    <select id="search_ca_approval_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                           
                                        <option value="0" selected>全部</option>
                                        <option value="1">免审核</option> 
                                        <option value="2">未交审</option>
                                        <option value="3">审核中</option>
                                        <option value="4">过审</option>
                                        <option value="5">退回</option> 
                                    </select> 
                                </td> 
                                <td class="title">
                                    开票状态:
                                </td>
                                <td class="value">
                                    <select id="search_ca_invoice_typ_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                           
                                        <option value="0" selected>全部</option>
                                        <option value="1">无需开票</option> 
                                        <option value="2">待开票</option> 
                                        <option value="3">已开票</option> 
                                    </select>  
                                </td>  
                                <td class="title">
                                    核销状态:
                                </td>
                                <td class="value">
                                    <select id="search_ca_woa_status" class="easyui-combobox" data-options="panelHeight:'auto',panelWidth:'140',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                           
                                        <option value="0" selected>全部</option>
                                        <option value="1">未销账(含部分销账)</option> 
                                        <option value="2">已销账</option>  
                                    </select>  
                                </td> 
                                        
                                <td class="title">金额:</td>
                                <td class="value"> 
                                    <input id="search_ca_fee_total" autocomplete="off" onkeyup="value=value.replace(/[^-\d.]/g,'')" type="text" class="easyui-textbox"  style="width:80px"/>
                                            
                                </td>
                                        
                                <td>
                                    <a href="javascript:requery_ca_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                         
                                </td> 
                            </tr>
                                    
                                    
                        </table>
                    </div>
                    <div data-options="region:'center',split:false,border:false">
                        <div id="tab_ca_list_bar">
                            
                            <a href="javascript:menu_download_rec_fee();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载对账单</a>
                            <a href="javascript:insert_ca_main('');" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_add'">新建</a>
                            <a href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'#mm_update', iconCls:'icon-table_edit'">修改</a>
                            <div id="mm_update" style="width:100px;">
                                <div data-options="iconCls:'icon-edit'" onclick="javascript:update_ca_main();">修正账单基本信息(不含结算单位)</div> 
                                <div data-options="iconCls:'icon-edit'" onclick="javascript:update_ca_title_and_cu_id();">(仅)修改结算单位及标题</div> 
                            </div>
                            <a href="javascript:delete_ca_main();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_delete'">删除</a>
                            <a href="#" class="easyui-menubutton" data-options="menu:'#mm_post_ca_main',iconCls:'icon-table_go'">交账</a>
                            <div id="mm_post_ca_main" style="width:100px;">
		                        <div onclick="javascript:post_ca_main();" data-options="iconCls:'icon-table_go'">普通交账</div>
		                        <div onclick="javascript:transfer_and_post_ca_main();" data-options="iconCls:'icon-table_go'">过账并交账</div> 
	                        </div>
                            <%--<a href="javascript:post_ca_main();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_go'">交账</a>--%>
                        </div>
                        <table id="tab_ca_list"></table>
                    </div>
                    <div data-options="region:'south',split:false,border:false" class="custom_bg" style="  height:26px;  overflow:hidden;" >
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
                    <input id="dlg_ed_ca_cu_id2" class="cls_customs_combogrid" style="width:356px;" />  
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
    <!-- 账单附件查看 -->
    <div id="dlg_ca_attachment_list" class="easyui-dialog" style="padding:0px;"> 
        <table id="dlg_tab_ca_attachment_list"></table> 
    </div>
    <!-- 投递账单 -->
    <div id="dlg_post_ca" class="easyui-dialog" style="padding:0px;"> 
        <table class="tab_std">
            <input type="hidden" id="dlg_post_ca_seq" />
            <col style="width:14%" />
            <col style="width:86%" /> 
            <tr>
                <td colspan="2">
                    <span class="span_title_alert">请填写开票信息或其他有助于商务操作信息</span>
                </td>
            </tr>
            <tr>
                <td class="title">备注:</td>
                <td class="value">
                    <textarea id="dlg_post_ca_bak" placeholder="请填写开票信息或其他有助于商务操作信息"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:350px; height:60px;"></textarea>  
                     
                </td>
            </tr>
        </table>
    </div>
    <!--文件上传控件-->
    <input style="display:none" type="file" id="file_upload" />
    <!--账单费用查看-->
    <div id="win_woa_or_iv_order_fee" class="easyui-window" title=""  data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px;">
		 <div class="easyui-panel" id="ca_main_of_fee_details_panel" data-options="title:'',border:false,fit:true"> 
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'center',split:false,border:false" class="cls_fee_region">
                    <div id="tab_fee_list_of_ca_bar">
                        <table>
                            <tr>
                                <td>
                                    <a href="javascript:remove_fee_details_from_ca();" class="easyui-linkbutton" id="btn_remove_fee_details_from_ca" data-options="plain:true,iconCls:'icon-remove'">移除</a>
                                </td>
                                <td>
                                    <a href="javascript:open_change_checkaccount();" class="easyui-linkbutton" id="btn_update_fee_details_from_ca" data-options="plain:true,iconCls:'icon-edit'">批量更改费用</a>
                                </td>
                            </tr>
                            <tr>
                                <td>记录人:</td>
                                <td>
                                    <select id="mulit_search_record_by_id" class="easyui-combobox mulit_search_fee_of_ca" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                </td>
                                <td>费项:</td>
                                <td>
                                    <select id="mulit_search_fee_item_typ" class="easyui-combobox mulit_search_fee_of_ca" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                </td>
                                <td>发票:</td>
                                <td>
                                    <select id="mulit_search_fee_invoice_typ" class="easyui-combobox mulit_search_fee_of_ca" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                </td>
                                <td>单位:</td>
                                <td>
                                    <select id="mulit_search_fee_unit" class="easyui-combobox mulit_search_fee_of_ca" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                </td>
                                <td>币种:</td>
                                <td>
                                    <select id="mulit_search_fee_currency_id" class="easyui-combobox mulit_search_fee_of_ca" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <table id="tab_fee_list_of_ca"></table>
                </div>
                <div data-options="region:'south',split:false,border:false" class="custom_bg" style=" height:26px;  overflow:hidden;" >
                   <div style="display:flex;height:100%;">
                       <div style="flex:1">
                            <table class="cls_group_order_fee all_group_order_fee_of_ca"> 
                                <tbody>
                                    <tr></tr>
                                </tbody>
                
                            </table>
                        </div>
                        <div style="flex:1;text-align:right;">
                            <table class="cls_group_order_fee selected_group_order_fee_of_ca"> 
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
    <!--一键转换提示-->
    <div id="dlg_one_key_change_fee_currency" class="easyui-dialog" style="padding:0px;"> 
         
        <table class="tab_std" > 
            <tr>
                <td class="custom_bg" style=" padding:12px;line-height:22px;color:#f9534f">
                    <span>
                        一键转换功能: 将勾选费用按照汇率和单价转换成本币(RMB)。<br/> 
                        PS: 请事先设置正确的汇率。<br/>
                        确认是否转换？
                    </span>
                </td> 
            </tr> 
        </table>
    </div>
    <!--账单费用更改-->
    <div id="window_of_change_fee_details" class="easyui-window" title="费用修改" data-options="modal:false,zIndex:91, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false, border:false," 
        style="padding:0px; overflow:hidden; padding:0px;border:none;">
        
        <div class="easyui-panel"   data-options="title:'',border:false,fit:true">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'center',split:false,border:false">
                    <div id="tab_fee_list_of_toolbar">
                        <table>
                            <tr>
                               <%-- <td>结算单位:</td>
                                <td>
                                    <input id="mulit_fee_cu_id" class="cls_customs_combogrid" style="width:276px;" />
                                
                                    <a href="javascript:apply_change_fee_details(1);" title="更改勾选数据税率" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>--%>
                                <td>税率:</td>
                                <td>
                                    <select id="mulit_fee_invoice_typ" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:86"></select>
                                
                                     <a href="javascript:apply_change_fee_details(2);" title="更改勾选数据税率" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>
                                <td>费项:</td>
                                <td>
                                    <select id="mulit_fee_item_typ" class="easyui-combobox" data-options="panelHeight:'200',panelWidth:200, valueField:'value', textField:'label',filter: filterCombo,width:86"></select>
                                    <a href="javascript:apply_change_fee_details(3);" title="更改勾选数据费项" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>
                                <td>数量:</td>
                                <td>
                                    <input type="text" id="mulit_fee_number" autocomplete="off" class="easyui-numberbox"  data-options="min:0,precision:2" style="width:86px;height:18px;border:1px solid #95B8E7;"></input>
                                    <a href="javascript:apply_change_fee_details(4);" title="更改勾选数据数量" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>
                                <td>单位:</td>
                                <td>
                                    <select id="mulit_fee_unit" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:86"></select>
                                    <a href="javascript:apply_change_fee_details(5);" title="更改勾选数据单位" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>
                            </tr>
                            <tr>
                                 
                                <td>单价:</td>
                                <td>
                                    <input type="text" id="mulit_fee_price" autocomplete="off" class="easyui-numberbox"  data-options="precision:2" style="width:80px;height:18px;border:1px solid #95B8E7;"></input>
                                    <a href="javascript:apply_change_fee_details(6);" title="更改勾选数据单价" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>
                                <td>币种:</td>
                                <td>
                                    <select id="mulit_fee_currency_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86"></select>
                                    <a href="javascript:apply_change_fee_details(7);" title="更改勾选数据币种" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>
                                <td>汇率:</td>
                                <td>
                                    <input type="text" id="mulit_fee_currency_rate" autocomplete="off" class="easyui-numberbox"  data-options="min:0,precision:4" style="width:86px;height:18px;border:1px solid #95B8E7;"></input>
                                    <a href="javascript:apply_change_fee_details(8);" title="更改勾选数据汇率" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>
                                <td colspan="2">
                                      <a href="javascript:apply_change_fee_details(9);"  class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'">一键转本币(RMB)</a>
                                </td>
                                
                                <td>
                                    <a href="javascript:change_checkaccount_fee();" title="保存更改结果" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-save'">修改</a>
                                </td>
                                <td>
                                    <a href="javascript:close_change_checkaccount_fee();" title="关闭修改窗口" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-delete'">关闭</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <table id="tab_fee_list_of_change"></table>
                </div>
                <div data-options="region:'south',split:false,border:false" class="custom_bg" style="  height:26px;  " >
                    <div style="display:flex;height:100%;">
                        <div style="flex:1">
                            <table class="cls_group_order_fee all_group_order_fee_of_change"> 
                                <tbody>
                                    <tr></tr>
                                </tbody> 
                            </table>
                        </div> 
                        <div style="flex:1">
                            <table class="cls_group_order_fee all_group_order_fee_of_changed"> 
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
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
    <!--CY 合同关联费项 编辑菜单-->
    <div id="dv_download_rec_fee_from_list" class="easyui-menu" style="width: 50px; display: none;">  
      <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" class="copy">复制账单备注</div>
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_bank_info_from_ca_list()">查看账单结算单位银行信息</div>
        <div   data-options="iconCls:'icon-20130406125519344_easyicon_net_16'" onclick="download_rec_fee()">下载对账单</div>   
    </div> 
     
    <!--查看 审核流程-->
    <div id="win_approval_flow_details" class="easyui-window" title="审核流水" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:650px;height:600px;padding:0px;">
           
         
	</div>
    <!--查看 银行账户-->
    <div id="win_cu_bank_info" class="easyui-window" title="结算单位银行账户" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:650px;height:600px;padding:0px;">
         
        <table class="tab_std" id="ap_bank_details" style="padding:5px; margin-right:25px;width:610px;"> 
            <tbody>

            </tbody>
        </table>
         
	</div>
    <!--右键菜单 费用上查看银行，审核流程以及查看关联账单详情-->
    <div id="win_dv_view_of_approval_details_from_list" class="easyui-menu" style="width: 240px ">  
        <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_approval_details_from_list()">查看委托审核流程</div>    
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_bank_info_from_list()">查看委托单位银行信息</div>  
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_short_order_info()">查看所属业务明细</div> 
    </div> 

    <!--过账且交账-->
    <div id="win_of_transfer_ca" class="easyui-window"   title="过账且交账" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
    <!--过账选择过账公司-->
    <div id="dlg_of_transfer_ca" class="easyui-dialog" style="padding:0px;">  
        <table class="tab_std" > 
            <col style="width:70px;"></col>
            <col style="width:270px;"></col>
            <tr>
                <td class="title">
                    过账单位:
                </td>
                <td class="value">
                    <select id="dlg_p_c_id" class="easyui-combobox" data-options="editable:false, panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:260" >
                                   
                    </select>
                </td>     
            </tr> 
            <tr>
                    <td></td>
                <td  style="text-align:left; font-size:9px;color:#d2d2d2;">   
                    只能选择当前用户可登录的公司账套进行过账。 
                </td>
            </tr>
        </table>
    </div>
    
</asp:Content>
