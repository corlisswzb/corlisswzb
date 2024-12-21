<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_invoice_record.aspx.cs" Inherits="Jbfd.template_invoice_record" %>
<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
  
<link href="Style/checkaccount.css" rel="stylesheet" />
 
<link href="Style/public.css" rel="stylesheet" /> 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>  
<script src="Js/template_invoice_record.js"></script>
 
<body style="width:100%;height:100%; overflow:hidden;  padding:0px; margin:0px;">
    <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north',split:false,border:false" class="custom_bg" style=" border-bottom:solid 1px #95b8e7;">
            <table class="tab_std" style="width:auto;  ">
                <tr> 
                    <td class="title">
                        结算单位:
                    </td>
                    <td class="value" colspan="3"> 
                        <input id="search_oi_cu_id" class="cls_customs_combogrid" style="width:276px;" />
                    </td>  
                    <td class="title">起始时间:</td>
                    <td class="value">
                        <input id="search_oi_beg_dat" class="easyui-datebox" data-options="width:106" />
                    </td>
                    <td class="title">截至时间:</td>
                    <td class="value">
                        <input id="search_oi_end_dat" class="easyui-datebox" data-options="width:106" />
                    </td>  
                    <td class="title">金额:</td>
                    <td class="value"> 
                        <input id="search_oi_total_money" autocomplete="off" onkeyup="value=value.replace(/[^-\d.]/g,'')" type="text" class="easyui-textbox"  style="width:100px"/>
                                            
                    </td>
                    <td class="title">发票号:</td>
                    <td class="value"> 
                        <input id="search_oi_like_str" placeholder="模糊查询" autocomplete="off"  type="text" class="easyui-textbox"  style="width:160px"/>
                                            
                    </td>
                    <td>
                        <a href="javascript:requery_oi_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a> 
                    </td>
                    <td>
                        <a href="javascript:bat_print_order_fee_of_invoice();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-print'">批量打印</a> 
                    </td>
                </tr> 
            </table>
        </div>
        <div data-options="region:'center',split:true,border:false" > 
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'center',border:false">
                    <table id="win_tab_oi_list"></table>
                </div>
                <div data-options="region:'south',split:false,border:false" style="height:30px;" class="custom_bg" >
                    <div style="display:flex;height:100%;">
                        
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
        <div data-options="region:'south',split:true,border:false" style="height:300px;" >
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'center',split:true,border:false">
                        <div class="easyui-panel" data-options="title:'费用销账明细',fit:true">
                        <table id="win_tab_oi_details_list"></table>
                    </div> 
                </div>
                <div data-options="region:'east',split:true,border:false" style="width:340px;">
                        <div class="easyui-panel" data-options="title:'发票文件',fit:true">
                        <table id="win_tab_oi_file_list"></table>
                    </div> 
                </div>

            </div>
               
        </div>
    </div>

    <div id="mm_of_oi_list" class="easyui-menu" style="width: 240px;  ">  
        <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="update_oi_bak()">更改备注</div>    
        <div   data-options="iconCls:'icon-view'" onclick="re_flag_invoice()">通过发票号进入账单编辑</div> 
    </div>

    <!-- 更改发票备注 -->
    <div id="dlg_update_oi_bak" class="easyui-dialog" style="padding:0px;"> 
        <table class="tab_std"> 
            <col style="width:14%" />
            <col style="width:86%" /> 
            <tr>
                <td class="title">备注:</td>
                <td class="value">
                    <textarea id="dlg_oi_bak" placeholder=""  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:350px; height:60px;"></textarea>  
                     
                </td>
            </tr>
        </table>
    </div>

      

    <!--账单费用查看-->
    <div id="win_woa_or_iv_order_fee" class="easyui-window"   title="" data-options="shadow:false,modal:false, closed:true,iconCls:'icon-save', fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
		 
    </div>

</body>
