<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_woa_or_iv_order_fee.aspx.cs" Inherits="Jbfd.template_woa_or_iv_order_fee" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
  
<link href="Style/checkaccount.css" rel="stylesheet" />
 
<link href="Style/public.css" rel="stylesheet" /> 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>  

<script src="Js/template_woa_or_iv_order_fee.js"></script>

<body style="width:100%;height:100%; overflow:hidden;  padding:0px; margin:0px;">
    
    <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north',split:false,border:false" class="custom_bg" style=" height:70px; " >
            <div style="height:70px;">
                <div style="width:70px;float:left;padding-right:10px; text-align:right;">
                    打款账户:
                </div>
                <div style="width:460px;float:left">
                     <textarea id="win_sh_group_bank"  class="easyui-textarea" style=" border:none; overflow-x:hidden; overflow-y:auto; 
                                                        resize:none; width:98%; height:70px;"></textarea> 
                </div>
                <div style="width:200px;float:left;padding-left:10px;">
                    打款账户: <span id="win_sh_ba_pay_typ_desc"> </span> 
                    <br />
                    打款时间: <span id="win_sh_ba_pay_dat"></span>
                </div>
                <div style="width:70px;float:left;padding-right:10px; text-align:right;">
                    账单备注:
                </div>
                <div style="width:460px;float:left">
                     <textarea id="win_sh_ca_bak"  class="easyui-textarea" style=" border:none; overflow-x:hidden; overflow-y:auto; 
                                                        resize:none; width:98%; height:70px;"></textarea> 
                </div>
            </div>
            
        </div>
        <div class="cls_fee_region" data-options="region:'center',split:false,border:false">
            <div id="tab_fee_list_bar">
                <table> 
                    <tr>
                        <td>
                            <a href="#" class="easyui-menubutton" data-options="menu:'#mm_invoice'">发票</a>
                            <div id="mm_invoice" style="width:100px;">
		                        <div onclick="javascript:flag_fee_invoice_by_fee_seqs();" data-options="iconCls:'icon-lock_go'">标记发票</div>
		                        <div onclick="javascript:unflag_fee_invoice_by_fee_seqs();" data-options="iconCls:'icon-lock_delete'">取消发票标记</div> 
	                        </div>
                        </td>
                        <td>
                            <a href="javascript:flag_fee_finace_by_fee_seqs();" class="easyui-linkbutton remove_part_bus" data-options="iconCls:'icon-lock_go',plain:true,">核销</a> 
                            <a href="javascript:open_change_checkaccount();" class="easyui-linkbutton remove_part_fee" id="btn_update_fee_details_from_ca" data-options="plain:true,iconCls:'icon-edit'">批量更改费用</a>
                            <a href="javascript:remove_fee_details_from_ca();" class="easyui-linkbutton remove_part_fee" id="btn_remove_fee_details_from_ca" data-options="plain:true,iconCls:'icon-remove'">移除</a>
                        </td> 
                        <td> <a href="javascript:clear_fliter();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406015709810_easyicon_net_16'">清空所有筛选</a>  </td>
                        <td> <a href="javascript:call_parent_close_win();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-delete'">关闭</a>  </td> 
                    </tr>
                </table>
            </div>
            <table id="tab_fee_list"></table>
            
        </div>
        <div data-options="region:'south',split:false,border:false" style="height:26px; " >
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
    <div id="columns_fliters"></div>
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
    <!--标记发票-->
    <div id="dlg_flag_invoice_no" class="easyui-dialog" style="padding:0px;"> 
        <input type="hidden" id="dlg_flag_invoice_cu_id" />
        <table class="tab_std" >
            <col style="width:7%;"/>
            <col style="width:18%;"/>
            <col style="width:7%;"/>
            <col style="width:18%;"/>
            <col style="width:50%;"/>
            <tr>
                <td colspan="4" class="custom_bg" style=" padding:12px;line-height:22px;color:#f9534f">
                    <span>
                        此功能仅限对账单中费用进行发票标记。<br/> 
                        费用发票标记不受限制，可以随时修改。<br/>
                    </span>
                </td>
                <td rowspan="5" valign="top" style="border-left:solid 2px #daeef5;padding:0px;">
                     <div class="easyui-panel" data-options="title:'发票图片',border:false,fit:true,">
                         <table id="dlg_tab_flag_invoice_files"> 
                         </table>
                     </div> 
                </td>
            </tr>
            <tr>
                <td class="title">
                    <span id="td_sh_c_id">开票单位:</span>
                </td>
                <td class="value" colspan="2">
                    <input type="text" class="easyui-textbox" readonly="true" id="dlg_sh_c_id" style="width:317px"/>
                </td>
            </tr>
            <tr>
                <td class="title">
                    <span id="td_sh_cu_id">收票单位:</span> 
                </td>
                <td class="value" colspan="2">
                    <input type="text" class="easyui-textbox" readonly="true" id="dlg_sh_cu_id"   style="width:317px"/>
                </td>
            </tr>
            <tr>
                <td class="title">
                    选择行数:
                </td>
                <td class="value">
                    <input type="text" class="easyui-textbox" readonly="true" id="dlg_sh_rows_count"  style="width:100px"/>
                </td>
                <td class="title">
                    选择金额:
                </td>
                <td class="value">
                    <input type="text" class="easyui-textbox" readonly="true" id="dlg_sh_fee_count"  style="width:107px"/>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="height:12px; background-color:#daeef5">

                </td>
            </tr>
            <tr>
                <td class="title">
                    发票号:
                </td>
                <td class="value" colspan="3">
                    <input type="text" autocomplete="off"  id="dlg_ed_invoice_no"  style="width:324px"/>
                </td>
                <td rowspan="5" valign="top"  style="border-left:solid 2px #daeef5;padding:0px;"> 
                    <div class="easyui-panel" data-options="title:'黏贴图片',border:false,fit:true,">
                        <textarea id="dlg_ed_upload_file"  class="easyui-textarea" style=" border:none; overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:98%; height:142px;"></textarea> 
                    </div>
                </td>
                 
            </tr>
            <tr> 
                <td></td>
                <td class="value" colspan="3">
                    <span style="font-size:12px;color:#b0b0b0">字母+数字组成,多号采用'/'链接，单票长度不能小于5</span>
                </td>
                
            </tr>
            <tr>
                <td class="title">
                    发票税点:
                </td>
                <td class="value" colspan="3">
                    <input type="text" class="easyui-textbox" readonly="true" id="dlg_sh_invoice_typ_desc"  style="width:317px"/>
                </td> 
            </tr>
            <tr>
                <td class="title" id="rec_or_pay_oi_limit_dat">
                    应收账期:
                </td>
                <td class="value">
                    <input type="text" class="easyui-datebox" id="dlg_ed_oi_limit_dat"  style="width:100px"/>
                </td>
                <td class="title">
                    已标金额:
                </td>
                <td class="value">
                    <input type="text" class="easyui-textbox"  readonly="true" id="dlg_sh_total_money"   style="width:107px"/>
                </td>
            </tr> 
            <tr>
                <td class="title">备注:</td>
                <td class="value" colspan="3">
                     <textarea id="dlg_ed_oi_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:317px; height:68px;"></textarea> 
                </td>
            </tr>
        </table>
    </div>
    <!--核销-->
    <div id="window_of_finace_fee" class="easyui-window"   title="" data-options="modal:false,zIndex:91, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false,border:false," style="padding:0px; overflow:hidden;">
	    <!--
             
            -->
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',border:false,split:false" class="custom_bg"  >
                <!--结算单位-->
                <!--应收单位-->
                <table class="tab_std" style="width:800px;">
                    <col style="width:70px;" />
                    <col style="width:270px;" />
                    <col style="width:90px;" />
                    <col style="width:120px;" />
                    <col style="width:70px;" />
                    <col style="width:210px;" />
                    <col style="width:100px;" />
                    <tr>
                        <td class="title">收款单位:</td>
                        <td class="value">
                            <span style="font-weight:bold" id="wof_ff_rec_cu_desc"></span>
                        </td> 
                        <td class="title">
                            <span id="td_wof_ff_woa_bank_dat">银行回款日期:</span>

                        </td>
                        <td class="value">
                            <input id="wof_ff_woa_bank_dat" class="easyui-datebox" style="width:100px;" /> 
                        </td>
                        <td class="title"><span id="td_wof_ff_woa_bak">付款备注:</span></td>
                        <td class="value" rowspan="2">
                            <textarea id="wof_ff_woa_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:200px; height:56px;"></textarea> 
                        </td>
                    </tr>
                    <tr>
                        <td class="title">付款单位:</td>
                        <td class="value">
                            <span style="font-weight:bold" id="wof_ff_pay_cu_desc"></span>
                        </td> 
                        <td class="title">销账方式:</td>
                        <td class="value">
                            <select id="wof_ff_woa_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:100" >
                           
                                <option value="1" selected>普通销账</option>
                              <%--  <option value="2">冲抵销账</option> --%>
                                <option value="3">坏账注销</option> 
                            </select>  
                        </td>
                        <td></td>
                        <td>
                            <a href="javascript:confirm_flag_fee_finace_by_fee_seqs();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'">确认销账</a>
                          
                            <a href="javascript:close_flag_fee_finace_by_fee_seqs();" title="关闭核销窗口" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-delete'">关闭</a>
                        </td>
                    </tr>
                </table>
            </div>
            <div data-options="region:'center',split:false,border:false">
                <div id="tab_fee_list_of_wof_bar">
                    <table>
                        <tr>
                            <td>金额:</td>
                            <td>
                                <input id="ed_woa_amount" class="easyui-textbox" autocomplete="off" onkeyup="value=value.replace(/[^-\d.]/g,'')" style="width:100px" />
                            </td>
                            <td>
                                <a href="javascript:auto_math();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'">智能填充</a>
                         
                            </td>
                            <td>
                                智能填充:用于销账金额小于总实际销账金额时，填充金额后，智能从上往下进行数字填充。
                            </td>
                        </tr>
                    </table>
                </div>
                <table id="tab_fee_list_of_wof"></table>
            </div>
            <div data-options="region:'south',split:false,border:false" style="height:26px; " >
                <div style="display:flex;height:100%;">
                    <div style="flex:1">
                        <table class="cls_group_order_fee all_group_order_fee_of_woa"> 
                            <tbody>
                                <tr></tr>
                            </tbody>
                
                        </table>
                    </div> 
                </div>  
            </div>
        </div>
    </div>
    <!--账单费用更改-->
    <div id="window_of_change_fee_details" class="easyui-window" title="" data-options="modal:false,zIndex:91, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false, border:false," 
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
                                    <input type="text" id="mulit_fee_number" class="easyui-numberbox"  data-options="min:0,precision:2" style="width:86px;height:18px;border:1px solid #95B8E7;"></input>
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
                                    <input type="text" id="mulit_fee_price" class="easyui-numberbox"  data-options="precision:2" style="width:80px;height:18px;border:1px solid #95B8E7;"></input>
                                    <a href="javascript:apply_change_fee_details(6);" title="更改勾选数据单价" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>
                                <td>币种:</td>
                                <td>
                                    <select id="mulit_fee_currency_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:86"></select>
                                    <a href="javascript:apply_change_fee_details(7);" title="更改勾选数据币种" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon-script_edit'"></a>
                                </td>
                                <td>汇率:</td>
                                <td>
                                    <input type="text" id="mulit_fee_currency_rate" class="easyui-numberbox"  data-options="min:0,precision:4" style="width:86px;height:18px;border:1px solid #95B8E7;"></input>
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
                <div data-options="region:'south',split:false,border:false" style="height:26px; " >
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
    <!--费用菜单-->
    <div id="mm_of_datagrid" class="easyui-menu" style="width: 240px; display: none;">  
       
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_approval_details_from_list()">查看委托审核流程</div>    
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_bank_info_from_list()">查看委托单位银行信息</div> 
        <div   data-options="iconCls:'icon-view'" onclick="win_view_of_short_order_info()">查看所属业务明细</div> 
    </div> 
   
</body>
 
