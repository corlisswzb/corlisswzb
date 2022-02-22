<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_order_info_frame_approval.aspx.cs" Inherits="SDZL.template_order_info_frame_approval" %>


<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/template_short_order_info_frame.css" rel="stylesheet" /> 
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script> 
 
<script src="Js/template_short_order_info_frame_approval.js"></script>
<body style="width:100%;height:100%;  padding:0px; margin:0px;">
    <form id="form1" runat="server" style="">
         
            <!-- 订单信息 
                订单信息 主体只有 委托基本信息和货物信息、费用信息 
                    集装箱信息 和 供应商 服务 做弹出式显示 
             -->  
        <div class="easyui-panel" data-options="title:'费用结算清单',border:false,">
            <table class="tab_std_short" style="width:1080px;  ">
                <col style="width:8%"/>
                <col style="width:42%"/>
                <col style="width:8%"/>
                <col style="width:42%"/>  
             
                <tr>
                    <td class="title">所属公司:</td>
                    <td class="value"><span id="od_record_by_company_desc"></span></td>
                
                </tr>
                <tr>
                    <td class="title">委托人:</td>
                    <td class="value"><span id="od_delegate_cu_desc"></span></td>
                    <td class="title">业务类型:</td>
                    <td class="value"><span id="od_typ_desc"></span></td>
                </tr>
                <tr>
                    <td class="title">货名:</td>
                    <td class="value"><span id="od_cargo_typ_desc"></span></td>
                    <td class="title">业务编号:</td>
                    <td class="value"><span id="od_no"></span></td>
                </tr>
                <tr>
                    <td class="title">起运地:</td>
                    <td class="value"><span id="od_beg_place_desc"></span></td>
                    <td class="title">业务时间:</td>
                    <td class="value"><span id="od_fee_dat"></span></td>
                </tr>
                <tr>
                    <td class="title">目的地:</td>
                    <td class="value"><span id="od_end_place_desc"></span></td>
                    <td class="title">提单号:</td>
                    <td class="value"><span id="od_main_bill_no"></span></td>
                </tr>
                <tr>
                    <td class="title">运输条款:</td>
                    <td class="value"><span id="od_freight_desc"></span></td>
                    <td class="title">箱量:</td>
                    <td class="value"><span id="od_cntr_desc"></span></td>
                </tr> 
            </table>
        </div>
        <div class="easyui-panel" data-options="title:'应收',border:false,"> 
         
            <table class="table" id="tab_order_fee_rec"></table>
            <table style="table-layout:fixed" class="mytable" >
                <tr>
                    <td>
                        应收小计:
                    </td>
                    <td id="rec_total_amount">

                    </td> 
                    <td>
                        已收:
                    </td>
                    <td id="rec_woa_total_amount">

                    </td>
                
                
                </tr> 
            </table>
        </div>
        <div class="easyui-panel" data-options="title:'应付',border:false,"> 
            <!--应付--> 
            <table class="table" id="tab_order_fee_pay"></table>
        
            <table style="table-layout:fixed" class="mytable" >
                <tr>
                    <td>
                        应付小计:
                    </td> 
                    <td id="pay_total_amount">

                    </td> 
                    <td>
                        已付:
                    </td>
                    <td id="pay_woa_total_amount">

                    </td> 
                </tr> 
            </table>
        </div>
        <div class="easyui-panel" data-options="title:'盈收情况分析',border:false,"> 
            <table id="tab_sum" style="font-weight:bold;font-size:18px; width:1080px;"  >
                <tr>
                    <td style="text-align:left;">
                        合计:
                    </td> 
               
               
                    <td style="text-align:right;">
                        折合利润:
                    </td>
                    <td id="sum_rmb_profit_2" style="text-align:left;">

                    </td>
                    <td style="text-align:right;">
                        毛利率:
                    </td>
                    <td id="gross_profit" style="text-align:left;">

                    </td>
                </tr> 
                <tr class="lose_explain">
                    <td>亏损说明:</td>
                    <td id="lose_explain" colspan="8">

                    </td>
                </tr>
             
            </table>       
        </div>
        <!--审核-->
        <div class="easyui-panel" id="my_approval_adivce" data-options="title:'审核意见',border:false,">
            <table class="tab_std" style="width:640px">
                <col style="width:12%"/>
                <col style="width:44%;" />
                <col style="width:44%;" />
                <tr>
                    <td class="title">意见:</td>
                    <td class="value" colspan="2">
                        <textarea id="ed_ap_context"   class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                resize:none; width:518px; height:40px;"></textarea> 
                    </td>
                </tr>
                <tr>
                    <td class="title cls_next_opr"  >下一处理人:</td>
                    <td class="value cls_next_opr">
                        <select id="ed_ap_next_amc_opr_info" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:166" ></select> 
                    </td>
                    <td class="value">
                        <a href="javascript:givenext_amc();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'">同意</a> 
                        <a href="javascript:giveback_to_create_amc();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">驳回发起人</a>
                    </td>
                </tr>
                                             
            </table>
        </div>
        <div class="easyui-panel" data-options="title:'审核流水',border:false," style="padding:2px; padding-right:20px; margin-bottom:160px;">
            <table class="tab_std" id="ap_flow_details" style="padding:5px; margin-right:25px;width:610px;">
                <col style="width:20%"/>
                <col style="width:14%"/>
                <col style="width:46%"/>
                <col style="width:20%"/>
                <tbody>

                </tbody>
            </table>
        </div>       
    </form>
 
</body>
