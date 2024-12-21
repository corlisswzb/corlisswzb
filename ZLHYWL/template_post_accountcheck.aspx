<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_post_accountcheck.aspx.cs" Inherits="Jbfd.templage_post_accountcheck" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
  
<link href="Style/checkaccount.css" rel="stylesheet" />
 
<link href="Style/public.css" rel="stylesheet" /> 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>  
 
<script src="Js/template_post_accountcheck.js"></script> 
<body style="width:100%;height:100%; overflow:hidden;  padding:0px; margin:0px;"> 
    <div class="easyui-panel" data-options="fit:true,border:false,title:'账单整体过账'">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',split:false,border:false" style="height:28px;"> 
                <div class="easyui-panel" data-options="fit:true,border:false" style=" background-color:#f4f4f4; overflow:hidden; border-bottom:solid 1px #dddddd;">
                    <a href="javascript:create_transfer_ca();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">生成过账信息并交账</a> 
                                                     
                    <a href="javascript:close_transfer_ca();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-delete'">关闭</a>  
                </div>
            </div>  
            <div data-options="region:'center',split:false,border:false">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'center',split:true,border:true" class="father_order_fee">
                        <div class="easyui-layout order_fee_details" id="fee_list" data-options="fit:true">
                            <div data-options="region:'center',split:false,border:false">
                                <div class="easyui-panel cls_panel_rec" data-options="fit:true,border:false,title:'应收列表'" >
                                    <div id="tab_order_fee_rec_bar">
                                        <span>
                                            应收结算单位
                                        </span>
                                        <input id="p_od_rec_fee_cu_id"  class="easyui-textbox" style="width:356px;"/>   
                                        <a href="javascript:bat_setting_rec_fee_cu_id();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-bullet_tick'">批量设置</a>   
                                    </div>
                                    <table id="tab_order_fee_rec"></table>
                                </div> 
                            </div>
                            <div data-options="region:'south',split:false,border:false">
                                <div class="easyui-panel cls_panel_rec" data-options="fit:true,border:false,title:'应付列表'"  >
                                    <div id="tab_order_fee_pay_bar"> 
                                        <span>
                                            应付结算单位
                                        </span> 
                                        <input id="p_od_pay_fee_cu_id"  class="easyui-textbox" style="width:356px;"/>   
                                        <a href="javascript:bat_setting_pay_fee_cu_id();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-bullet_tick'">批量设置</a>   
                                    </div>
                                    <table id="tab_order_fee_pay"></table>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div data-options="region:'west',split:true,border:true" style="width:480px;">
                        <div class="easyui-panel" data-options="fit:true,border:false,">
                            <div class="easyui-panel" data-options="border:false,title:'当前账单信息'" style="padding:8px;">
                                <table class="tab_std">
                                    <col style="width:70px;"/>
                                    <col style="width:120px;"/>
                                    <col style="width:70px;"/>
                                    <col style="width:120px;"/>
                                    <tr>
                                        <td class="title">过账账单:</td>
                                        <td class="value" colspan="3">
                                            <input id="o_ca_title" readonly="readonly" class="easyui-textbox" style="width:350px;"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">账单年份:</td>
                                        <td class="value">
                                            <input id="o_ca_year" readonly="readonly" class="easyui-textbox" style="width:130px;"/>  
                                        </td> 
                                        <td class="title">账单月份:</td>
                                        <td class="value">
                                            <input id="o_ca_month" readonly="readonly" class="easyui-textbox" style="width:122px;"/>   
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">过账人:</td>
                                        <td class="value">
                                            <input id="o_post_by" readonly="readonly" class="easyui-textbox" style="width:130px;"/>  
                                        </td> 
                                        <td class="title">过账时间:</td>
                                        <td class="value">
                                            <input id="o_post_dat" readonly="readonly" class="easyui-textbox" style="width:122px;"/>   
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">总金额:</td>
                                        <td class="value" colspan="3">
                                            <input id="o_ca_fee_total_desc" readonly="readonly" class="easyui-textbox" style="width:350px;"/>  
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">原结算单位:</td>
                                        <td class="value" colspan="3">
                                            <input id="o_ca_cu_id" readonly="readonly" class="easyui-textbox" style="width:350px;"/>  
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title"><span class="ipt_must">新</span>结算单位:</td>
                                        <td class="value" colspan="3">
                                            <input id="n_ca_cu_id"  class="easyui-textbox" style="width:356px;"/>   
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title"><span class="ipt_must">新</span>标题:</td>
                                        <td class="value" colspan="3">
                                            <input id="n_ca_title"   class="easyui-textbox" style="width:350px;"/>   
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title"><span class="ipt_must">新</span>备注:</td>
                                        <td class="value" colspan="3">
                                            <textarea id="n_ca_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                        resize:none; width:350px; height:46px;"></textarea>  
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="easyui-panel" data-options="border:false,title:'过账委托信息'" style="padding:8px;">
                                <table class="tab_std">
                                    <col style="width:70px;"/>
                                    <col style="width:120px;"/>
                                    <col style="width:70px;"/>
                                    <col style="width:120px;"/>
                                    <tr>
                                        <td colspan="4" style="text-align:center; font-size:9px;color:#d2d2d2;">  
                                    
                                            过帐方会产生一个过账委托。 以下均未新委托属性设置。
                                 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">过账公司:</td>
                                        <td class="value"> 
                                            <input id="p_c_id" readonly="readonly" class="easyui-textbox" style="width:350px;"/>   
                                        </td> 
                                    </tr> 
                                    <tr>
                                        <td class="title"><span class="ipt_must">委</span>托单位:</td>
                                        <td class="value"> 
                                            <input id="p_od_delegate_cu_id"  class="easyui-textbox" style="width:356px;"/>   
                                        </td> 
                                    </tr> 
                                    <tr>
                                
                                    </tr>
                                    <tr>
                                        <td class="title"><span class="ipt_must">录</span>入人:</td>
                                        <td class="value"> 
                                            <select class="easyui-combobox" id="p_od_record_by_id" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                             
                                        </td>  
                                        <td class="title"><span class="ipt_must">操</span>作:</td>
                                        <td class="value"> 
                                            <select class="easyui-combobox" id="p_od_operation_id" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:100" ></select>
                                        </td>  
                                    </tr> 
                                    <tr>
                                
                                        <td class="title"><span class="ipt_must">销</span>售:</td>
                                        <td class="value"> 
                                            <select class="easyui-combobox" id="p_od_sales_id" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                        </td> 
                                        <td class="title"><span class="ipt_must">客</span>服:</td>
                                        <td class="value"> 
                                            <select class="easyui-combobox" id="p_od_services_id" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:100" ></select>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td class="title"><span class="ipt_must">委</span>托备注:</td>
                                        <td colspan="3">
                                            <textarea id="p_od_bak_delegate"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                        resize:none; width:350px; height:46px;"></textarea> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" style="text-align:center; font-size:9px;color:#d2d2d2;">   
                                            备注信息最好带上“过账”字样。
                                        </td>
                                    </tr>
                                </table> 
                            </div> 
                            <div class="easyui-panel" data-options="border:false,title:'过账流程说明'" style="padding:8px;">
                                 <ol>
                                     <li>好难解释，请相关人员用简要语言描述。</li>
                                     
                                 </ol>    
                            </div>
                        </div>

                        
                    </div>
            
            

                </div>
            </div>
        </div>
        
    </div>

    <!--过账结果提示-->
    <div id="dlg_of_create_transfer_result" class="easyui-dialog" style="padding:8px; line-height:18px;">  
         
        <div style="font-size:14px;">
            原来账单<b>《<span id="res_ca_title"></span>》</b>:
        </div> 
        <div>
            1. 完成账单结算单位及标题和备注修改，以及账单所属费用结算单位修改。 
        </div>
        <div>
            2. 账单投递到商务成功。 
        </div>
        <div style="font-size:14px;">
            过账单位<b><span id="trans_c_desc"></span></b>:  
        </div>
        <div>
            1. 生成(代)过账委托<b><span id="trans_od_no"></span></b>。 
        </div>
        <div>
            2. 生成应收账单<b><span id="trans_rec_ca_title"></span></b>,并已投递商务。 
        </div>
        <div>
            3. 生成应付账单<b><span id="trans_pay_ca_title"></span></b>,并已投递商务。 
        </div> 
    </div>
</body>
 
