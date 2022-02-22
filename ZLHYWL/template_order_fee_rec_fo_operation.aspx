<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_order_fee_rec_fo_operation.aspx.cs" Inherits="SDZL.template_order_fee_rec_fo_operation" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
  
<link href="Style/checkaccount.css" rel="stylesheet" />
 
<link href="Style/public.css" rel="stylesheet" /> 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>  
<script src="Js/operation_create_ca.js"></script>
<script src="Js/template_order_fee_rec_for_operation_of_normal.js"></script>
 
<body style="width:100%;height:100%; overflow:hidden;  padding:0px; margin:0px;">
    <div class="easyui-layout" data-options="fit:true" style="padding:0px">
        <div data-options="region:'north',split:false,border:false" class="custom_bg" style=" border-bottom:solid 1px #95b8e7;">
            <table class="tab_std" style="width:auto;  ">
                <tr> 
                    <td class="title">
                        费用状态:
                    </td>
                    <td class="value">
                        <select id="search_fee_status" class="easyui-combobox" data-options="multiple: true, editable:false,panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                           
                            <option value="">全部</option>
                            <option value="1" selected>未归账</option> 
                            <option value="2">归账待交</option>  
                            <option value="3">交账待收</option> 
                            <option value="4">部分回款</option> 
                            <option value="9">已回款</option>  
                        </select>
                    </td>
                    <td class="title">
                        业务类型:
                    </td>
                    <td class="value">
                        <select id="search_od_typ" class="easyui-combobox" data-options="multiple: true, editable:false,panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:126" >
                            
                        </select>
                    </td>             
                    <td class="title">
                        结算单位:
                    </td>
                    <td class="value" colspan="3"> 
                        <input id="search_fee_cu_id" class="cls_customs_combogrid" style="width:280px;" />  
                                
                    </td> 
                            
                    <td class="title">业务时间(起):</td>
                    <td class="value">
                        <input id="search_fee_dat_beg" class="easyui-datebox" data-options="width:106" />
                    </td>
                    <td class="title">(止):</td>
                    <td class="value">
                        <input id="search_fee_dat_end" class="easyui-datebox" data-options="width:106" />
                    </td>  
                    <td><a href="javascript:change_to_focus_model();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-award_star_add'">切换到专注模式</a> </td>
                     
                </tr> 
                <tr> 
                    <td class="title">
                        订单状态:
                    </td>
                    <td class="value">
                        <select id="search_od_status_id" class="easyui-combobox" data-options="multiple: true, editable:false,panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                            <option value="" selected>全部</option>
                            <option value="1" >未审核</option>
                            <option value="2">审核中</option>
                            <option value="3">审核通过</option>
                            <option value="0">审核退回</option>
                        </select>
                    </td> 
                                         
                    <td class="title">
                        项目类型:
                    </td>
                    <td class="value"> 
                        <select id="search_od_project_typ" class="easyui-combobox " data-options="multiple: true, editable:false,panelHeight:'200',panelWidth:'140',valueField:'value', textField:'label',filter: filterCombo,width:126" ></select>
                    </td> 
                            
                    <td class="title">费项:</td>
                    <td class="value">
                        <select id="search_fee_item_typ" class="easyui-combobox" data-options="multiple: true, editable:false,panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                   
                        </select>
                    </td>
                    <td class="title">发票类型:</td>
                    <td class="value"> 
                        <select id="search_fee_invoice_typ" class="easyui-combobox" data-options="multiple: true, editable:false,panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                    </td> 
                    <td class="title">发票号:</td> 
                    <td class="value" colspan="3" >
                        <input id="search_od_invoice_no"  class="easyui-textbox" style=" width:274px;"  />
                    </td> 
                    
                    <td>
                        <a href="javascript:download_order_fee();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-download'">下载</a> 
                    </td>    
                </tr> 
                <tr>
                    <td class="title">
                        账期:
                    </td>
                    <td class="value">
                        <select id="search_fee_limit_days_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                            <option value="" selected>全部</option>
                            <option value="0" >未超期</option>
                            <option value="1">超期</option>
                            <option value="2">超期<=90天</option>
                            <option value="3">超期>90天</option>
                        </select>
                    </td> 
                            
                    <td class="title">工具名:</td>
                    <td class="value" >
                        <input id="search_od_route_tools_desc" class="easyui-textbox" style="width:124px" />
                    </td>  
                    <td class="title">币种:</td>
                    <td class="value"> 
                        <select id="search_fee_currency_id" class="easyui-combobox" data-options="multiple: true, editable:false,panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                    </td>
                    <td class="title">
                        发票状态:
                    </td>
                    <td class="value">
                        <select id="search_fee_invoice_lock_flag" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                            <option value="" selected>全部</option>
                            <option value="1">已录</option>
                            <option value="0" >未录</option>
                        </select>
                    </td> 
                    <td class="title" style="text-align:left;">关联提空单号:</td> 
                    <td class="value" colspan="3">
                        <input id="search_fee_rel_bill_no"  class="easyui-textbox" style=" width:270px;" />
                        <div  style="display:none">
                            <label for="search_od_water_flag">涉水</label><input type="checkbox" id="search_od_water_flag" />
                                  
                            <label for="search_od_sub_way_flag">涉铁</label><input type="checkbox" id="search_od_sub_way_flag" />
                              
                            <label for="search_od_sub_way_flag">涉路</label><input type="checkbox" id="search_od_road_way_flag" />
                           
                            <label for="search_od_sub_way_flag">涉空</label><input type="checkbox" id="search_od_air_way_flag" />
                        </div>
                    </td> 
                    <td>
                        <a href="javascript:insert_main_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">加入账单</a> 
                    </td>  
                </tr>
                <tr>
                    <td class="title">委托号:</td>
                    <td class="value" >
                        <input id="search_od_no" class="easyui-textbox" style="width:100px" />
                    </td> 
                    <td class="title">工具号:</td>
                    <td class="value" >
                        <input id="search_od_route_tools_no" class="easyui-textbox" style="width:120px" />
                    </td>         
                    <td class="title">提单号:</td>
                    <td class="value" colspan="3" >
                        <input id="search_od_bill_nos"  class="easyui-textbox" style="  width:272px;" />
                    </td>
                        <td class="title">箱号:</td>
                            
                    <td class="value" colspan="3">
                        <input id="search_od_cntr_nos"  class="easyui-textbox" style=" width:270px;"  />
                    </td>
                    <td>
                        <a href="javascript:refresh_tab_fee_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a> 
                        <a href="javascript:clear_query_tab_fee_list_params();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-arrow_refresh'">清空条件</a> 
                    </td>
                </tr>
            </table>
        </div>
        <div data-options="region:'center',split:false,border:false">
            <table id="tab_fee_list"></table>
        </div>
        <div data-options="region:'south',split:false,border:false" class="custom_bg" style=" height:26px;  overflow:hidden;" >
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
     
     
    <!--右键菜单 费用上查看银行，审核流程以及查看关联账单详情-->
    <div id="win_dv_view_of_approval_details_from_list" class="easyui-menu" style="width: 240px;  ">  
        <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_approval_details_from_list()">查看委托审核流程</div>    
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_bank_info_from_list()">查看委托单位银行信息</div> 
        <div id="dv_view_ca"  data-options="iconCls:'icon-view'" onclick="win_view_of_ca_info()">查看所属账单</div> 
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_short_order_info()">查看所属业务明细</div> 
    </div> 
   
     
    <!--文件上传控件-->
    <input style="display:none" type="file" id="file_upload" />
</body>
