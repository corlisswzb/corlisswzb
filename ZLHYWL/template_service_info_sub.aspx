<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="template_service_info_sub.aspx.cs" Inherits="Jbfd.template_service_info_sub" %>

<link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" /> 
<link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" /> 
<link href="Style/public.css" rel="stylesheet" /> 
<link href="Style/order_service_frame.css" rel="stylesheet" />

<link href="Style/fonts/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
<script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
<script src="Script/easy-ui-v132/locale/easyui-lang-zh_CN.js"></script>
<script src="Js/public.js"></script>

<script src="Js/order_service_sub_frame.js"></script>
 <script src="Js/template_route_bind_ship_voyage.js"></script>

<body style="width:100%;height:100%; overflow:hidden;padding:0px; margin:0px;"> 

    <div class="easyui-panel cls_main_layout" id="normal_panel" data-options="fit:true,border:false">
        <div class="easyui-layout "  data-options="fit:true">
            <div data-options="region:'north',border:false,split:true" style="height:300px;">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'west',border:false,split:false" style="width:840px; border-right:solid 1px #95b8e7" >
                        <div class="easyui-layout" data-options="fit:true" >
                            <div data-options="region:'north',border:false,split:false" style="height:27px; overflow:hidden;padding-left:2px;">
                                <div class="easyui-panel custom_bg" data-options="fit:true,border:false,title:''" style=" border-right:solid 1px #95b8e7">
                                    <span style="font-weight:bold; ">运程明细 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                
                                    <a href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'.mm_service_water_way_type',plain:true,iconCls:'icon-ship'">水运船舶</a>
                                    <a href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'.mm_service_sub_way_type',plain:true,iconCls:'icon-sub_way'">铁路运输</a>
                                    <a href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'.mm_service_road_way_type',plain:true,iconCls:'icon-truck'">公路运输</a>
                                    <a href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'.mm_service_air_way_type',plain:true,iconCls:'icon-air'">航空运输</a>
                                    <a href="javascript:save_od_service_sub_infos(0);" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存服务批次信息</a>
                                </div>
                            </div>
                            <div data-options="region:'center',split:false,border:false">
                                <div class="easyui-panel" data-options="fit:true,border:false" id="service_route_list" >
                               
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-options="region:'center',split:false,border:false">
                        <div class="easyui-accordion" data-options="fit:true">
                            <div title="箱信息明细" style="padding:0px;overflow:hidden;" class="cls_service_sub_cntr_region">
                                <div id="tab_od_service_sub_ref_cntr_bar">
                                    <table>
                                        <tr>
                                            <td colspan="6">         
                                                <a href="javascript:import_od_service_sub_ref_cntr();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">添加</a> 
                                                <a href="javascript:delete_od_service_sub_ref_cntr();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">移除</a> 
                                                <a href="javascript:clear_columns_filter_of_service_sub_ref_cntr();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清楚筛选条件</a> 
                                            </td>
                                        </tr> 
                                    </table>
                                </div> 
                                <table id="tab_od_service_sub_ref_cntr"></table>
                                
                            </div>
                            <div title="箱、货明细" style="padding:0px;overflow:hidden;">
                                <!--
                                毛件体 信息 
                                -->
                            
                                <table class="tab_std" style="width:640px;">
                                    <col style="width:10%"/>
                                    <col style="width:20%"/>
                                    <col style="width:10%"/>
                                    <col style="width:20%"/> 
                                    <col style="width:10%"/>
                                    <col style="width:30%"/>
                                    <tr> 
                                        <td class="title">重量:</td>
                                        <td class="value">
                                            <input id="od_service_sub_weight" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox " style="width:70px;" /><span> KG</span>
                                        </td> 
                                        <td class="title">件数:</td>
                                        <td class="value">
                                            <input id="od_service_sub_number" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox " style="width:70px;" />
                                        </td>  
                                        <td class="title">体积:</td>
                                        <td class="value">
                                            <input id="od_service_sub_bluk" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox " style="width:70px;" /><span> CBM</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">批次备注:</td>
                                        <td class="value" colspan="5">
                                            <textarea id="od_service_sub_bak" class="easyui-textarea " style=" overflow-x:hidden; overflow-y:auto; 
                                                        resize:none; width:99%; height:40px;"></textarea>  
                                        </td> 
                                    </tr>  
                                </table>
                           
                            </div>
                            <div title="统计箱量" style="padding:0px;overflow:hidden;">
                                <table style="width:640px;">
                                    <col style="width:10%"/>
                                    <col style="width:90%"/>
                                                
                                    <tr> 
                                        <td  class="custom_bg" style="  text-align:center;">
                                            <a href="javascript:edit_od_route_ref_group_cntr();" class="easyui-linkbutton" data-options="plain:true">选择..</a>
                                        </td>
                                        <td class="value">
                                            <input id="od_route_group_cntr_desc"  class="easyui-textbox " readonly="true" style="width:95%;" /> 
                                        </td>  
                                    </tr> 
                                </table>
                            </div> 
                        </div>    
                    </div>
                </div>
            </div>

            <div data-options="region:'center',split:true,border:false" >
                <div class="easyui-panel" data-options="fit:true,border:false,title:''">
                    <div class="easyui-layout" fit="true">
                        <div data-options="region:'west',split:false,border:false" style="width:36px;border-right:solid 1px #95b8e7">
                            <div class="easyui-panel" data-options="title:'',fit:true,border:false" style="background-color:#daeef5">
                                <table>
                                    <tr>
                                        <td>
                                            <a href="javascript:pay_insert_order_fee_details();" title="增加应付费用"  tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="javascript:pay_copy_order_fee_details();" title="复制添加应付费用" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-page_white_copy'"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="javascript:pay_delete_order_fee_details();" title="删除应付费用" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'"></a>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td>
                                            <a href="javascript:pay_split_order_fee_details();" title="拆分" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-arrow_branch'"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="javascript:pay_bind_order_fee_to_route();" title="绑定运程" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-link_add'"></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="javascript:pay_unbind_order_fee_to_route();" title="解除绑定运程" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-link_delete'"></a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div data-options="region:'center',split:true,border:false" class="cls_panel_pay">
                            <div class="easyui-panel" data-options="fit:true,border:false,title:'应付费用'">
                                <table id="tab_od_service_sub_fee"> 
                                </table>
                            </div>
                        </div>
                        <div data-options="region:'east',split:true,border:false" style="width:400px;border-left:solid 1px #95b8e7">
                        
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
    </div>
   
    <div id="clumn_fliter_of_service_sub_cntr_list"></div>     
    <div class="mm_service_water_way_type"  style="width:120px;"> 
        <div>
            <span>自定义船</span>
            <div style="width:120px;">
                <div onclick="insert_service_route_part(3,1,this);" >一程船</div> 
		        <div onclick="insert_service_route_part(3,2,this);" >二程船</div>  
                <div onclick="insert_service_route_part(3,3,this);" >三程船</div>  
                <div onclick="insert_service_route_part(3,4,this);" >四程船</div>  
                <div onclick="insert_service_route_part(3,5,this);" >五程船</div>
            </div> 
        </div>
		<div>
            <span>绑定集运船期</span>
            <div style="width:120px;">
                <div onclick="insert_service_route_part_of_bind_ship_voyage(1,this);" >一程船</div> 
		        <div onclick="insert_service_route_part_of_bind_ship_voyage(2,this);" >二程船</div>  
                <div onclick="insert_service_route_part_of_bind_ship_voyage(3,this);" >三程船</div>  
                <div onclick="insert_service_route_part_of_bind_ship_voyage(4,this);" >四程船</div>  
                <div onclick="insert_service_route_part_of_bind_ship_voyage(5,this);" >五程船</div>
            </div>
		</div>  
        
	</div>  
    <div class="mm_service_sub_way_type" style="width:120px;"> 
		<div onclick="insert_service_route_part(2,1,this);" >一程铁路</div> 
		<div onclick="insert_service_route_part(2,2,this);" >二程铁路</div>  
        <div onclick="insert_service_route_part(2,3,this);" >三程铁路</div>   
	</div>  
    <div class="mm_service_air_way_type" style="width:120px;"> 
		<div onclick="insert_service_route_part(4,1,this);" >一程空运</div> 
		<div onclick="insert_service_route_part(4,2,this);" >二程空运</div>  
	</div>  
    <div class="mm_service_road_way_type" style="width:120px;"> 
		<div onclick="insert_service_route_part(1,1,this);">公路-发货</div> 
		<div onclick="insert_service_route_part(1,2,this);" >公路-中转</div> 
        <div onclick="insert_service_route_part(1,3,this);" >公路-交货</div> 
	</div> 
    <!--绑定集装箱数量(非明细)-->
    <div class="easyui-dialog" id="dlg_od_route_ref_group_cntr">
        <div id="tab_dlg_od_route_ref_group_cntr_bar"> 
            <a href="javascript:insert_cntr_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">添加</a> 
            <a href="javascript:remove_cntr_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">移除</a>  
        </div>
        <table id="tab_dlg_od_route_ref_group_cntr"> 
        </table>
    </div>
    <!--绑定集装箱明细-->
    <div class="easyui-dialog cls_order_cntr_region" id="dlg_od_route_ref_cntr">
        <div id="tab_dlg_od_route_ref_cntr_bar"> 
            <a href="javascript:clear_columns_filter_of_order_cntr();"  tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a> 
        </div>
                        
        <table id="tab_dlg_od_route_ref_cntr"></table>
        
    </div> 
    <div id="clumn_fliter_of_order_cntr_list"></div>
    <!--查看汇率-->
    <div class="easyui-dialog" id="dlg_od_ref_month_exchange_rate">
        <table id="tab_dlg_exchange_month_rate"></table>
    </div>

    <!--绑定船舶提示-->
    <div class="easyui-dialog" id="dlg_pre_bind_ship_voyage_to_route">
        <div class="easyui-panel" data-options="fit:true,border:false" style="padding:12px">
            <p>
                <b>绑定船舶前请认真阅读如下内容:</b>
            </p> 
            <p>
                同一个服务批次内不允许对同一船期只能进行一次绑定！
                <br />同一个服务批次内可以绑定多个不同船期。
                <br/> 绑定后集装箱明细信息和费用信息无任务影响，正常按照常规操作操作 。
                <br/> 请确保本服务批次的集装箱的空重、装卸码头、内外贸、危险品等属性是相同的。
                <br/> 如果存在不同属性，建议分多批次录入。
                <br/> 通过绑定船舶计费的费用会关联船舶，但删除船舶并不会删除费用，只会发生费用解绑船舶。
                <br/> 删除绑定船舶也不会删除服务批次的集装箱。
                <br/> 费用可以通过手动绑定船舶也可以解除绑定。
                <b>是否继续?</b>
            </p> 
        </div>
        
    </div>
    <!--船期绑定 绑定集装箱-->
    <div  class="easyui-dialog cls_ship_voyage_cntr_region" id="dlg_cntr_ref_ship_voyage">
        <div class="easyui-panel" data-options="fit:true,border:false">
            <div id="dlg_tab_cntr_ref_ship_voyage_bar"> 
                <a href="javascript:clear_columns_filter_of_ship_voyage_cntr();"  tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">清空筛选条件</a> 
            </div>
            <table id="dlg_tab_cntr_ref_ship_voyage"></table>
        </div>
    </div>
    <div id="clumn_fliter_of_ship_voyage_cntr_list"></div>  
    <!--船期绑定 计划中的船舶-->
    <!--简表-->
    <div  class="easyui-dialog" id="dlg_od_ref_ship_voyage">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'center'">
                <div id="dlg_dv_choise_ship_voyage_1" class="easyui-panel" data-options="fit:true,border:false">
                    <div id="tab_dlg_choise_ship_voyage_bar">
                        <table>
                            <tr> 
                                <td class="td_title">状态:
                                </td>
                                <td class="td_input">
                                    <select id="search_status" class="easyui-combobox"
                                        data-options="panelHeight:'auto',width:80"> 
                                        <option checked value="1">计划中</option> 
                                    </select>
                                </td> 
                                <td class="td_title">船名:
                                </td>
                                <td class="td_input">
                                    <select id="search_ship_id" class="easyui-combobox"
                                        data-options="valueField:'value', textField:'label', panelHeight:'200',filter: filterCombo,width:100">
                                    </select>
                                </td> 
                                <td class="td_title">航次:
                                </td>
                                <td class="td_input" colspan="3">
                                    <input id="search_voyage_no" autocomplete="off" class="easyui-textbox" placeholder="航次" style="width: 100px;  " />
                                </td>
                                <td class="td_title">航线:
                                </td>
                                <td class="td_input">
                                    <select id="search_voyage_line" class="easyui-combobox"
                                        data-options="valueField:'value', textField:'label', panelHeight:'auto',filter: filterCombo,width:80">
                                    </select>
                                </td> 
                                <td>
                                    <a href="javascript:refresh_ship_voyage();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">查询</a>
                                </td> 
                            </tr>
                        </table>
                    </div>
                    <table id="tab_dlg_choise_ship_voyage"></table>
                </div> 
                <div id="dlg_dv_choise_ship_voyage_2" class="easyui-panel" data-options="fit:true,border:false">
                    <table class="tab_std">
                        <col style="width:55px"/>
                        <col style="width:80px"/>
                        <col style="width:55px"/>
                        <col style="width:80px"/>
                        <col style="width:55px"/>
                        <col style="width:75px"/>
                        <col style="width:85px"/>
                        <col style="width:75px"/>
                        <col style="width:55px"/>
                        <col style="width:75px"/> 
                        <tr>
                            <td colspan="10" style="background-color:#95b8e7;color:#fff;font-weight:bold;font-size:14px; line-height:22px; text-align:center;">
                                航次基本信息
                            </td>
                        </tr>
                        <tr>        
                            
                            <td class="title">船名:</td>
                            <td class="value">
                                <input id="sh_ship_id"   class="easyui-textbox" style="width:80px" />
                            </td>
                            <td class="title">航代码:</td>
                            <td class="value">
                                <input readonly="true" id="sh_ship_en_cod" class="easyui-textbox" style="width:80px"/>
                            </td>
                            <td class="title">航次:</td>
                            <td class="value">
                                <input readonly="true" id="sh_voyage_no" class="easyui-textbox" style="width:75px"/>
                            </td>
                            <td class="title">起航时间(预):</td>
                            <td class="value">
                                <input readonly="true" id="sh_etd" class="easyui-textbox" style="width:75px"/> 
                            </td>  
                            <td class="title">起运地:</td>
                            <td class="value">
                                <input readonly="true" id="sh_start_area_id" class="easyui-textbox" style="width:75px"/> 
                            </td>        
                        </tr>
                        <tr> 
                            <td class="title">船东单位:</td>
                            <td class="value" colspan="3">
                                <input readonly="true" id="sh_ship_cu_id" class="easyui-textbox"  style="width:238px;" /> 
                            </td>
                         
                            
                            <td class="title">航线:</td>
                            <td class="value">
                                <input readonly="true" id="sh_vl_id" class="easyui-textbox" style="width:75px"/> 
                            </td> 
                            <td class="title">抵达时间(预):</td>
                            <td class="value">
                                <input readonly="true" id="sh_eta" class="easyui-textbox" style="width:75px"/> 
                            </td> 
                            
                            <td class="title">目的地:</td>
                            <td class="value">
                                <input readonly="true" id="sh_end_area_id" class="easyui-textbox" style="width:75px"/> 
                            </td>    
                        </tr> 
                        <tr>
                            <td colspan="10" style="background-color:#4800ff;color:#fff;font-weight:bold;font-size:14px; line-height:22px; text-align:center;">
                                当前服务批次-配载设置
                            </td>
                        </tr> 
                        
                        <tr>  
                            <td class="title"><i class="i_must">*</i>装载港:</td>
                            <td class="value">
                                <input  id="ed_load_port" class="easyui-combobox" data-options="editable:false, valueField:'value', textField:'label', panelHeight:'140',filter: filterCombo,width:96">
                            </td> 
                            <td class="title"><i class="i_must">*</i>装中转:</td>
                            <td class="value">
                                <select  id="ed_load_trans_flag" class="easyui-combobox" data-options="editable:false,panelHeight:'auto',width:96 "  >
                                    <option value="0" checked>否</option>
                                    <option value="1">是</option>
                                </select>
                            </td> 
                            <td class="title"><i class="i_must">*</i>协议:</td>
                            <td class="value">
                                <select  id="ed_ship_freight_id" class="easyui-combobox" data-options="editable:false, valueField:'value', textField:'label', panelHeight:'auto',filter: filterCombo,width:96">
                                   
                                </select>
                            </td> 
                            <td class="title"><i class="i_must">*</i>空重:</td>
                            <td class="value">
                                <select id="ed_e_f_id" class="easyui-combobox"
                                    data-options="editable:false,panelHeight:'auto',width:50"> 
                                    <option checked value="F">重</option>
                                    <option value="E">空</option> 
                                </select>
                            </td> 
                            <td class="title"><i class="i_must">*</i>危险品:</td>
                            <td>
                                <select id="ed_danger_flag" class="easyui-combobox"
                                    data-options="editable:false,panelHeight:'auto',width:50"> 
                                    <option checked value="0">否</option>
                                    <option value="1">是</option> 
                                </select>
                            </td>  
                        </tr> 
                        <tr>  
                            <td class="title"><i class="i_must">*</i>卸载港:</td>
                            <td class="value">
                                <input  id="ed_disc_port" class="easyui-combobox" data-options="editable:false, valueField:'value', textField:'label', panelHeight:'140',filter: filterCombo,width:96">
                            </td>  
                            <td class="title"><i class="i_must">*</i>目的港:</td>
                            <td class="value">
                                <input  id="ed_destination_port" class="easyui-combobox" data-options="editable:false, valueField:'value', textField:'label', panelHeight:'140',filter: filterCombo,width:96">
                            </td>   
                            <td class="title"><i class="i_must">*</i>卸中转:</td>
                            <td class="value">
                                <select  id="ed_disc_trans_flag" class="easyui-combobox" data-options="editable:false,panelHeight:'auto',width:96 "  >
                                    <option value="0" checked>否</option>
                                    <option value="1">是</option>
                                </select>
                            </td> 
                            <td class="title"><i class="i_must">*</i>内外贸:</td>
                            <td class="value">
                                <select id="ed_trade_id" class="easyui-combobox"
                                    data-options="editable:false,valueField:'value', textField:'label', panelHeight:'auto',filter: filterCombo,width:50">
                                </select>
                            </td>     
                        </tr>

                        <tr>
                            <td colspan="10" style="background-color:#e0ecff;color:#ff0000;font-weight:bold;font-size:14px;  text-align:left;padding:12px;">
                                 
                                <span style="color:red;"><i class="fa fa-warning"></i> 注意:</span>
                                <ol>
                                    <li>如本服务批次未配置集装箱将无法进行订舱费及装卸费自动计算。</li>
                                    <li>请确保当前服务批次集装箱的空重、内外贸、装载港、卸载港、目的港、危险品、装中转、卸中转、条款等属性一致。</li>
                                    <li>如不满足上述列举内容，请拆分成多个服务批次或拆分成多个委托操作。</li>
                                </ol> 
                            </td>
                        </tr>
                    </table>
                </div> 
                <div  id="dlg_dv_choise_ship_voyage_3" class="easyui-panel cls_panel_pre_ship_voyage_pay" data-options="fit:true,border:false">
                    <div class="easyui-panel " data-options="title:'预计船舶费用',fit:true,border:false "> 
                        <table id="tab_dlg_fee_of_ship_voyage"></table>
                    </div>
                </div> 
                
            </div>
            <div data-options="region:'south',split:false,border:false" style="height:28px; text-align:right;padding-right:12px; background-color:#e0ecff ">
                <a href="javascript:void(0);" id="btn_close_dlg_od_ref_ship_voyage"   tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-delete'">关闭</a> 
                <a href="javascript:void(0);" id="btn_previous_dlg_od_ref_ship_voyage"   tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-previous_green'">上一步</a> 
                <a href="javascript:void(0);" id="btn_next_dlg_od_ref_ship_voyage"   tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-next_green'">下一步</a> 
                <a href="javascript:void(0);" id="btn_save_od_ref_ship_voyage"  tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">确定</a> 
            </div>
        </div> 
    </div>
     
    <!--费用绑定船舶-->
    <div  class="easyui-dialog" id="dlg_fee_bind_ship_voyage">
        <div class="easyui-panel" data-options="fit:true,border:false"> 
            <table id="dlg_tab_ship_voyage_for_bind_fee"></table>
        </div>
    </div> 

    <!--费用拆分-->
    <div  class="easyui-dialog" id="dlg_split_order_fee_details">
        <div class="easyui-panel" data-options="fit:true,border:false"> 
            <table class="tab_std">
                <col style="width:20%"/>
                <col style="width:20%"/>
                <col style="width:20%"/>
                <col style="width:20%"/>
                <col style="width:20%"/>
                <tr>
                    <td colspan="5" style="background-color:#e0ecff;color:#ff0000;font-weight:bold;font-size:14px; line-height:22px; text-align:left;padding:12px;">
                        注意:单次只能拆分成两份,填写时只需要填写第一栏即可,数量不能设置为负数。
                    </td>
                </tr>
                <tr>
                    <td class="title">
                        原数量; <span id="sh_old_fee_number"></span>
                    </td>
                    <td class="title">
                       拆分1:
                    </td>
                    <td class="value">
                        <input  id="ed_split_1" class="easyui-textbox"  onkeyup="value=value.replace(/[^\d.]/g,'')" style="width:60px;">
                    </td>  
                    <td class="title">
                       拆分2:
                    </td>
                    <td class="value">
                        <input  id="ed_split_2" class="easyui-textbox"  onkeyup="value=value.replace(/[^\d.]/g,'')"  style="width:60px;">
                    </td>  
                </tr>
            </table>
        </div>
    </div> 

</body>
 
