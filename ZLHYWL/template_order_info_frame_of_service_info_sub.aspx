<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_order_info_frame_of_service_info_sub.aspx.cs" Inherits="SDZL.template_order_info_frame_of_service_info_sub" %>


<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" />

<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/order_service_frame.css" rel="stylesheet" />


<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>

<script src="Js/template_order_info_frame_of_service_sub_frame.js"></script>
 
<body style="width:100%;height:100%; overflow:hidden;padding:0px; margin:0px;">
     
     
    <div class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north',border:false,split:true" style="height:280px;">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'west',border:false,split:false" style="width:686px; border-right:solid 1px #95b8e7" >
                    <div class="easyui-layout" data-options="fit:true" > 
                        <div data-options="region:'center',split:false,border:false">
                            <div class="easyui-panel" data-options="fit:true,border:false" id="service_route_list" >
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div data-options="region:'center',split:false,border:false">
                    <div class="easyui-panel" data-options="fit:true,border:false,title:''">
                        <div class="easyui-layout" data-options="fit:true">

                            <div data-options="region:'north',border:false,split:false," >
                                <div class="easyui-layout" data-options="fit:true"> 
                                    <div data-options="region:'north',border:false,split:false" style="height:66px;">
                                        <!--
                                        毛件体 信息 
                                        -->
                                        <div class="easyui-panel" data-options="fit:true,border:false,title:'箱、货明细'" style="overflow:hidden;">
                                            <table class="tab_std" style="width:382px;">
                                                <col style="width:36px"/>
                                                <col style="width:98px"/>
                                                <col style="width:36px"/>
                                                <col style="width:68px"/> 
                                                <col style="width:36px"/>
                                                <col style="width:108px"/>
                                                <tr> 
                                                    <td class="title">重量:</td>
                                                    <td class="value">
                                                        <input id="od_service_sub_weight" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox " style="width:60px;" /><span> KG</span>
                                                    </td> 
                                                    <td class="title">件数:</td>
                                                    <td class="value">
                                                        <input id="od_service_sub_number" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox " style="width:60px;" />
                                                    </td>  
                                                    <td class="title">体积:</td>
                                                    <td class="value">
                                                        <input id="od_service_sub_bluk" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox " style="width:60px;" /><span> CBM</span>
                                                    </td>
                                                </tr> 
                                            </table>
                                        </div>
                                    </div>
                                    <div data-options="region:'center',split:false,border:false">
                                        <div class="easyui-panel" data-options="fit:true,border:false,title:'统计箱量'" style="overflow:hidden;">
                                             
                                            <textarea id="od_route_group_cntr_desc" readonly="true" class="easyui-textarea " style=" overflow-x:hidden; overflow-y:auto; 
                                                        resize:none; width:99%; height:99%;"></textarea>     
                                                    
                                        </div>
                                    </div>
                                </div>
                            </div> 

                           <div data-options="region:'center',split:false,border:false,collapsible:true">
                                <%-- <div class="easyui-panel" data-options="fit:true,border:false,title:'箱信息明细'">
                                     
                                    <table id="tab_od_service_sub_ref_cntr"></table>
                                </div>--%>
                            </div>
                            <div data-options="region:'south',border:false,split:false" style="height:124px;">
                                <div class="easyui-panel" data-options="fit:true,border:false,title:'批次备注'" style="overflow:hidden">
                                    <textarea id="od_service_sub_bak" readonly="true"  class="easyui-textarea " style=" overflow-x:hidden; overflow-y:auto; 
                                                                        resize:none; width:99%; height:99%;"></textarea> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div data-options="region:'center',split:true,border:false">
            <div class="easyui-panel" data-options="fit:true,border:false,title:'费用支出'">
                <div class="easyui-layout" fit="true"> 
                    <div data-options="region:'center',split:false,border:false">
                        <table id="tab_od_service_sub_fee">

                        </table>
                    </div>
                    <div data-options="region:'east',split:false,border:false" style="width:420px;border-left:solid 1px #95b8e7">
                        
                        <div class="easyui-panel" data-options="title:'费用汇总', fit:true,border:false,tools:'group_fee_bar'" >
                            <div id="tab_od_service_sub_fee_group_bar">
                                <a href="javascript:view_ref_month_exchange_rate();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查看汇率</a>
                            </div>
                            <table id="tab_od_service_sub_fee_group">

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
     
    <!--查看汇率-->
    <div class="easyui-dialog" id="dlg_od_ref_month_exchange_rate">
        <table id="tab_dlg_exchange_month_rate"></table>
    </div>
</body>
 
