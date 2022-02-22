<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="bus_hedge_off_accounts.aspx.cs" Inherits="SDZL.bus_hedge_off_accounts" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/checkaccount.css" rel="stylesheet" />
    <script src="Js/bus_hedge_list_of_order.js"></script>
     
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="tabs_bar" >
        <span style="line-height:28px; padding-left:4px;padding-right:4px;"><b>当前位置:商务对冲计划</b></span>
    </div>
    <div id="tabs_ca" class="easyui-tabs" data-options="fit:true,border:false,tools:'#tabs_bar',">
        <div title="费用明细表">
            <div class="easyui-layout" data-options="fit:true" style="padding:0px">
                <div data-options="region:'north',split:false,border:false" class="custom_bg" style=" border-bottom:solid 1px #95b8e7;">
                    <table class="tab_std" style="width:auto;  ">
                        <tr> 
                            <td class="title">
                                收/付:
                            </td>
                            <td class="value">
                                <select id="search_rec_or_pay" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                    
                                    <option value="1" selected>应收</option>
                                    <option value="-1">应付</option> 
                                </select>
                            </td>
                            
                            <td class="title">
                                业务类型:
                            </td>
                            <td class="value">
                                <select id="search_od_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:126" >
                            
                                </select>
                            </td>             
                            <td class="title">
                                结算单位:
                            </td>
                            <td class="value" colspan="3"> 
                                <input id="search_fee_cu_id" class="cls_customs_combogrid" style="width:282px;" />  
                                
                            </td> 
                            
                            <td class="title">业务时间(起):</td>
                            <td class="value">
                                <input id="search_fee_dat_beg" class="easyui-datebox" data-options="width:106" />
                            </td>
                            <td class="title">(止):</td>
                            <td class="value">
                                <input id="search_fee_dat_end" class="easyui-datebox" data-options="width:106" />
                            </td> 
                            
                            <td>
                                <a href="javascript:clear_query_tab_fee_list_params();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-arrow_refresh'">清空条件</a> 
                            </td>   
                        </tr> 
                        <tr> 
                            <td class="title">
                                费用状态:
                            </td>
                            <td class="value">
                                <select id="search_fee_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                           
                                    <option value="" selected>全部</option>
                                    <option value="1" >未归账</option> 
                                    <option value="2">归账待交</option>  
                                    <option value="3">交账待销</option> 
                                    <option value="4">部分销账</option> 
                                    <option value="9">完整销账</option>  
                                </select>
                            </td> 
                                         
                            <td class="title">
                                项目类型:
                            </td>
                            <td class="value"> 
                                <select id="search_od_project_typ" class="easyui-combobox " data-options="panelHeight:'200',panelWidth:'140',valueField:'value', textField:'label',filter: filterCombo,width:126" ></select>
                            </td> 
                            
                            <td class="title">费项:</td>
                            <td class="value">
                                <select id="search_fee_item_typ" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                   
                                </select>
                            </td>
                            <td class="title">发票类型:</td>
                            <td class="value"> 
                                <select id="search_fee_invoice_typ" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                            </td> 
                            <td class="title">发票号:</td> 
                            <td class="value" colspan="3" >
                                <input id="search_od_invoice_no"  class="easyui-textbox" style=" width:290px;"  />
                            </td> 
                             
                            <td>
                                <a href="javascript:insert_hedge_off_accounts_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">加入对冲计划</a> 
                            </td>    
                        </tr> 
                        <tr>
                            <td class="title">
                                订单状态:
                            </td>
                            <td class="value">
                                <select id="search_od_status_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                    <option value="" selected>全部</option>
                                    <option value="1" >未审核</option>
                                    <option value="2">审核中</option>
                                    <option value="3">审核通过</option>
                                    <option value="0">审核退回</option>
                                </select>
                            </td>  
                            <td class="title">
                                账期:
                            </td>
                            <td class="value">
                                <select id="search_fee_limit_days_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:126" >
                                    <option value="" selected>全部</option>
                                    <option value="0" >未超期</option>
                                    <option value="1">超期</option>
                                    <option value="2">超期<=90天</option>
                                    <option value="3">超期>90天</option>
                                </select>
                            </td> 
                            
                            <td class="title">工具名:</td>
                            <td class="value" >
                                <input id="search_od_route_tools_desc" class="easyui-textbox" style="width:100px" />
                            </td> 
                            <td class="title">工具号:</td>
                            <td class="value" >
                                <input id="search_od_route_tools_no" class="easyui-textbox" style="width:100px" />
                            </td> 
                            <td class="title">币种:</td>
                            <td class="value"> 
                                <select id="search_fee_currency_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                            </td>
                            <td class="value" colspan="2" style="text-align:center; vertical-align:middle;">
                                <label for="search_od_water_flag">涉水</label><input type="checkbox" id="search_od_water_flag" />
                                  
                                <label for="search_od_sub_way_flag">涉铁</label><input type="checkbox" id="search_od_sub_way_flag" />
                              
                                <label for="search_od_sub_way_flag">涉路</label><input type="checkbox" id="search_od_road_way_flag" />
                           
                                <label for="search_od_sub_way_flag">涉空</label><input type="checkbox" id="search_od_air_way_flag" />
                            </td> 
                            <td>
                                <a href="javascript:refresh_tab_fee_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a> 
                            </td>
                        </tr>
                        <tr>
                            <td class="title">委托号:</td>
                            <td class="value" >
                                <input id="search_od_no" class="easyui-textbox" style="width:100px" />
                            </td> 
                            
                            <td class="title">提单号:</td>
                            <td class="value" colspan="5" >
                                <input id="search_od_bill_nos"  class="easyui-textbox" style="  width:466px;" />
                            </td>
                             <td class="title">箱号:</td>
                            
                            <td class="value" colspan="3">
                                <input id="search_od_cntr_nos"  class="easyui-textbox" style=" width:290px;"  />
                            </td>
                        </tr>
                    </table>
                </div>
                <div data-options="region:'center',split:false,border:false">
                    <table id="tab_fee_list"></table>
                </div>
                <div data-options="region:'south',split:false,border:false" class="custom_bg" style=" height:26px;  " >
                    <div style="display:flex;height:100%;">
                        <div style="flex:1">
                            <table class="cls_group_order_fee all_group_order_fee"> 
                                <tbody>
                                    <tr></tr>
                                </tbody>
                
                            </table>
                        </div>
                        <div style="flex:1;text-align:right;">
                            <table class="cls_group_order_fee selected_group_order_fee"> 
                                <tbody>
                                    <tr></tr>
                                </tbody>
                
                            </table>
                        </div>
                    </div>  
                </div> 
            </div>
        </div> 
        <div title="冲抵记录列表">
            <div class="easyui-layout" fit="true"  style="padding:0px" >
                <div data-options="region:'center',border:false,split:true" style="padding:0px;">
                    <div class="easyui-panel" data-options="title:'应收账单',border:false,fit:true">
                        <div class="easyui-layout" data-options="fit:true" style="padding:0px">
                            <div data-options="region:'north',split:false,border:false" class="custom_bg" style=" border-bottom:solid 1px #95b8e7;">
                                <table class="tab_std" style="width:auto;  ">
                                    <tr> 
                                        <td class="title">
                                            结算单位:
                                        </td>
                                        <td class="value" > 
                                            <input id="search_hoa_cu_id" class="cls_customs_combogrid" style="width:276px;" />
                                        </td> 
                                        <td class="title">
                                            计划状态:
                                        </td>
                                        <td class="value">
                                            <select id="search_hoa_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                           
                                                <option value="" selected >全部</option> 
                                                <option value="1" >计划中</option>
                                                <option value="2">已完结</option> 
                                            </select>
                                        </td>  
                                        
                                        <td class="title">发起人:</td>
                                        <td class="value">
                                            <select id="search_hoa_record_id" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                   
                                            </select>
                                        </td> 
                                        <td class="title">
                                            审核状态:
                                        </td>
                                        <td class="value">
                                            <select id="search_amc_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" >
                           
                                                <option value="" >全部</option> 
                                                <option value="1" selected>审核中</option>
                                                <option value="2">已通过</option> 
                                                <option value="0" >退回</option>
                                            </select>
                                        </td>  
                                    </tr>
                                    <tr>
                                        <td class="title">模糊查询:</td>
                                        <td class="value"  >
                                            <input id="search_like_str" class="easyui-textbox" style="width:270px" />
                                        </td> 
                                        <td class="title">银行日期(起):</td>
                                        <td class="value">
                                            <input id="search_hoa_bank_dat_begin" class="easyui-datebox" data-options="width:106" />
                                        </td>
                                        <td class="title">(止):</td>
                                        <td class="value">
                                            <input id="search_hoa_bank_dat_end" class="easyui-datebox" data-options="width:106" />
                                        </td> 
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <a href="javascript:requery_hoa_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                         
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div data-options="region:'center',split:false,border:false">
                                <div id="tab_hoa_list_bar"> 
                                    <a href="javascript:delete_hoa_record();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-table_delete'">撤销计划</a> 
                                     
                                    <a href="javascript:post_hoa_to_amc();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-report_user'">提交审核</a>  
                                    <%--<a href="#" class="easyui-menubutton" data-options="menu:'#mm_checkaccount_invoice'">账单收票标记</a>
                                    <div id="mm_checkaccount_invoice" style="width:100px;">
		                                <div onclick="javascript:flag_checkaccount_invoice();" data-options="iconCls:'icon-lock_go'">标记账单已收票</div>
		                                <div onclick="javascript:unflag_checkaccount_invoice();" data-options="iconCls:'icon-lock_delete'">取消账单收票标记</div> 
	                                </div>--%>
                                     
                                </div>
                                <table id="tab_hoa_list"></table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div> 
    </div>
    <!-- 账单选择 -->
    <div id="dlg_choise_hoa_main" class="easyui-dialog" style="padding:0px;">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',border:false,split:false" class="custom_bg" style=" height:98px">
                <input type="hidden" id="dlg_hoa_cu_id" />
                <table class="tab_std">
                    <col style="width:60px" />
                    <col style="width:220px" />
                    <col style="width:30px" />
                    <col style="width:100px" />
                    <col style="width:30px" />
                    <col style="width:100px" />
                    <tr>
                        <td colspan="6" style="text-align:center;font-weight:bold;font-size:14px;">
                            当前选择: <span id="dlg_hoa_total_rowcount"></span>行数据，金额共计<span id="dlg_hoa_total_money"></span><span>,请选择一个对冲计划并入。</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">
                            结算单位:
                        </td>
                        <td class="value" colspan="2">
                            <span id="dlg_hoa_cu_desc"></span>
                        </td> 
                    </tr>
                </table>        
            </div>
            <div data-options="region:'center',border:false,split:false">
                <div id="dlg_tab_choise_hoa_list_bar">
                    <a href="javascript:insert_hoa_main();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新建对冲计划</a>
                </div>
                <table id="dlg_tab_choise_hoa_main_list"></table>
            </div>
        </div>
    </div>
    <!--账单新建-->
    <div id="dlg_new_hoa_main" class="easyui-dialog" style="padding:0px;">
        <input type="hidden" id="dlg_ed_hoa_seq"> 
        <table class="tab_std">
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:14%" />
            <col style="width:30%" /> 
           
            <tr>
                <td class="title">
                    结算单位:
                </td>
                <td class="value" colspan="3">
                    <input id="dlg_ed_hoa_cu_id" class="cls_customs_combogrid" style="width:356px;" />  
                    
                </td>
            </tr> 
            <tr>
                <td class="title">
                    标题:
                </td>
                <td class="value" colspan="5">
                    <input type="text" autocomplete="off" class="easyui-textbox" id="dlg_ed_hoa_title" style="width:350px" /> 
                </td>
            </tr>
            <tr>
                <td class="title">
                    备注:
                </td>
                <td class="value" colspan="5">
                    <textarea id="dlg_ed_hoa_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:350px; height:60px;"></textarea>  
                     
                </td>
            </tr> 
        </table>        
             
             
        
    </div>
    <!--账单费用查看-->
    <div id="window_of_hoa_fee_details" class="easyui-window"   title="对冲计划费用明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px;">
		<div class="easyui-layout order_fee_details" data-options="fit:true"> 
            <div data-options="region:'north',split:false,border:false" class="custom_bg" style=" height:84px;" >
                 
                <table class="tab_std" style="width:900px;">
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
                            <span style="font-weight:bold" id="sh_hoa_create_nam"></span>
                        </td>
                        <td class="title">创建时间:</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sh_hoa_create_dat"></span>
                        </td>
                        <td class="title">计划状态:</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sh_hoa_status_desc"></span>
                        </td>
                        <td class="title">销账方式:</td>
                        <td class="value">
                            <select id="wof_ff_woa_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:100" >
                                <option value="2" selected>冲抵销账</option>  
                            </select>  
                        </td>
                        <td class="title">销账备注:</td>
                        <td class="value" rowspan="3" valign="top">
                            <textarea id="wof_ff_woa_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:200px; height:70px;"></textarea> 
                        </td>
                    </tr>
                    <tr>
                        <td class="title">应收对冲(本币):</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sh_hoaprofit_total_amount_money"></span>
                        </td>
                        <td class="title">明细:</td>
                        <td class="value" >
                            <span style="font-weight:bold" id="sh_hoa_rec_currency_group_desc"></span>
                        </td>
                        <td class="title">审核状态:</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sh_amc_status_desc"></span>
                        </td>
                        <td class="title">银行收付日期:</td>
                        <td class="value">
                            <input id="wof_ff_woa_bank_dat" class="easyui-datebox" style="width:100px;" /> 
                        </td>
                    </tr>
                     <tr>
                        <td class="title">应付对冲(本币):</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sh_hoa_pay_total_money"></span>
                        </td>
                        <td class="title">明细:</td>
                        <td class="value" >
                            <span style="font-weight:bold" id="sh_hoa_pay_currency_group_desc"></span>
                        </td> 
                        <td class="title">差额(本币):</td>
                        <td class="value">
                            <span style="font-weight:bold" id="sh_hoa_diff_total_money"></span>
                        </td>
                        <td class="title">明细:</td>
                        <td class="value" >
                            <span style="font-weight:bold" id="sh_hoa_diff_currency_group_desc"></span>
                        </td> 
                        <td></td> 
                        <td>
                            &nbsp; &nbsp;
                            <a href="javascript:confirm_flag_hedge_off_accounts_finace_by_hoa_seq();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'">确认销账</a>
                         
                        </td>
                    </tr>
                </table>
            </div>
            <div data-options="region:'center',split:false,border:false">
                <div class="easyui-panel" data-options="title:'应收费用',border:false,fit:true"> 
                        <div class="easyui-layout" data-options="fit:true">
                            <div data-options="region:'center',split:false,border:false">
                                <div id="tab_fee_list_of_hoa_rec_bar">
                                    <table> 
                                        <tr>

                                           <td>
                                                <a href="javascript:remove_fee_details_from_hoa_rec();" class="easyui-linkbutton btn_remove_fee_details_from_hoa"   data-options="plain:true,iconCls:'icon-remove'">移除</a>
                                            </td>
                                            <td>记录人:</td>
                                            <td>
                                                <select id="mulit_search_record_by_id_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                            </td>
                                            <td>费项:</td>
                                            <td>
                                                <select id="mulit_search_fee_item_typ_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                            </td>
                                            <td>发票:</td>
                                            <td>
                                                <select id="mulit_search_fee_invoice_typ_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                            </td>
                                            <td>单位:</td>
                                            <td>
                                                <select id="mulit_search_fee_unit_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                            </td>
                                            <td>币种:</td>
                                            <td>
                                                <select id="mulit_search_fee_currency_id_rec" class="easyui-combobox mulit_search_fee_of_hoa_rec" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <table id="tab_fee_list_of_hoa_rec"></table>
                            </div>
                            <div data-options="region:'south',split:false,border:false" class="custom_bg" style=" height:28px;  " >
                          
                                <div style="display:flex;height:100%;">
                                    <div style="flex:1">
                                        <table class="cls_group_order_fee all_group_order_fee_rec"> 
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
            <div data-options="region:'south',split:false,border:false" class="custom_bg"  >
                <div class="easyui-panel" data-options="title:'应付费用',border:false,fit:true"> 
                    <div class="easyui-layout" data-options="fit:true">
                        <div data-options="region:'center',split:false,border:false">
                            <div id="tab_fee_list_of_hoa_pay_bar">
                                <table> 
                                    <tr>

                                        <td>
                                            <a href="javascript:remove_fee_details_from_hoa_pay();" class="easyui-linkbutton btn_remove_fee_details_from_hoa"   data-options="plain:true,iconCls:'icon-remove'">移除</a>
                                        </td>
                                     
                                        <td>记录人:</td>
                                        <td>
                                            <select id="mulit_search_record_by_id_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                        </td>
                                        <td>费项:</td>
                                        <td>
                                            <select id="mulit_search_fee_item_typ_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                        </td>
                                        <td>发票:</td>
                                        <td>
                                            <select id="mulit_search_fee_invoice_typ_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                        </td>
                                        <td>单位:</td>
                                        <td>
                                            <select id="mulit_search_fee_unit_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                        </td>
                                        <td>币种:</td>
                                        <td>
                                            <select id="mulit_search_fee_currency_id_pay" class="easyui-combobox mulit_search_fee_of_hoa_pay" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86" ></select>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <table id="tab_fee_list_of_hoa_pay"></table>
                        </div>
                        <div data-options="region:'south',split:false,border:false" class="custom_bg" style="  height:28px;  " >
                          
                            <div style="display:flex;height:100%;">
                                <div style="flex:1">
                                    <table class="cls_group_order_fee all_group_order_fee_pay"> 
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
    
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="账单明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
    
    <!--账单审核提交 选择 审核人-->
    <div class="easyui-dialog" id="dlg_post_hoa_amc">
        <div class="dv_od_lock_tips">
            订单锁定后将提交进入业务审核，并且除计费信息外，其他订单信息将不允许编辑，你确定要锁定订单吗？
        </div>
        <div>
            <table>
                <tr>
                    <td>请选择审核人:</td>
                    <td>
                        <select id="dlg_start_schema_point" class="easyui-combobox" data-options="panelHeight:'auto', valueField:'value', 
                                        textField:'label',filter: filterCombo,width:146" ></select> 
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <!--锁定提交 选择 审核人-->
    <div class="easyui-dialog" id="dlg_repost_hoa_amc">
         
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
 <!--查看 审核流程-->
    <div id="win_approval_flow_details" class="easyui-window" title="审核流水" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:650px;height:600px;padding:0px;">
          <table class="tab_std"  style="padding:5px; margin-right:25px;width:610px;">
                <col style="width:15%"/>
                <col style="width:35%"/>
                <col style="width:15%"/>
                <col style="width:35%"/>
                <tbody>
                    <tr>
                        <td class="title">编号:</td>
                        <td class="title"><span id="sp_amc_relation_no"></span></td>
                        <td class="title">状态:</td>
                        <td class="title"><span id="sp_amc_status_desc"></span></td>
                    </tr>
                    <tr>
                        <td class="title">标题:</td>
                        <td class="title" colspan="2"><span id="sp_amc_title"></span></td> 
                    </tr>
                    <tr>
                        <td class="title">发起人:</td>
                        <td class="title"><span id="sp_amc_create_nam"></span></td>
                        <td class="title">发起时间:</td>
                        <td class="title"><span id="sp_amc_create_dat"></span></td>
                    </tr>
                    <tr>
                        <td class="title">当前处理人:</td>
                        <td class="title"><span id="sp_amc_cur_opr_nam"></span></td>
                        <td class="title">通审时间:</td>
                        <td class="title"><span id="sp_amc_finish_dat"></span></td>
                    </tr>
                </tbody>
            </table>
            <table class="tab_std" id="ap_flow_details" style="padding:5px; margin-right:25px;width:610px;">
                <col style="width:20%"/>
                <col style="width:14%"/>
                <col style="width:46%"/>
                <col style="width:20%"/>
                <tbody>

                </tbody>
            </table>
         
	</div>
    <!--查看 银行账户-->
    <div id="win_cu_bank_info" class="easyui-window" title="结算单位银行账户" data-options="modal:true,closed:true,iconCls:'icon-save'" style="width:650px;height:600px;padding:0px;">
         
        <table class="tab_std" id="ap_bank_details" style="padding:5px; margin-right:25px;width:610px;"> 
            <tbody>

            </tbody>
        </table>
         
	</div>

    <!--CY 合同关联费项 编辑菜单-->
    <div id="win_dv_view_of_approval_details_from_ca_list" class="easyui-menu" style="width: 240px; ">  
        <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_approval_details_from_ca_list()">查看账单审核流程</div>   
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_bank_info_from_ca_list()">查看账单结算单位银行信息</div>
               
    </div> 

    <!--CY 合同关联费项 编辑菜单-->
    <div id="win_dv_view_of_approval_details_from_list" class="easyui-menu" style="width: 240px;  ">  
        <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_approval_details_from_list()">查看委托审核流程</div>    
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_bank_info_from_list()">查看委托单位银行信息</div> 
    </div> 
    
</asp:Content>
