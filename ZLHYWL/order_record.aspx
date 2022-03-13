<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="order_record.aspx.cs" Inherits="ZLHYWL.order_record" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/order.css" rel="stylesheet" />
    <link href="Style/order_transport_route.css" rel="stylesheet" />
    <script src="Js/order_record.js"></script>
    <script src="Js/order_edit.js"></script> 
    <script src="Js/order_cntr.js"></script> 

    <script src="Js/order_fee.js"></script>
    <script src="Js/order_service.js"></script>
    <script src="Js/order_booking_note.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!--订单列表-->
    <div id="page_order_list" class="easyui-layout" fit="true"  style="padding:0px" >   
         
        <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg"  style="border-bottom:solid 1px #95b8e7;" >
            <table class="tab_std" style="width:auto;  ">
                <tr>    
                    <td class="title">
                        状态:
                    </td>
                    <td class="value">
                        <select id="search_od_status_id" class="easyui-combobox" data-options="panelHeight:'auto',multiple: true, editable:false,valueField:'value', textField:'label',filter: filterCombo,width:106" >
                            <option value="" selected>全部</option>
                            <option value="1" >未审核</option>
                            <option value="2">审核中</option>
                            <option value="3">审核通过</option>
                            <option value="0">审核退回</option>
                        </select>
                    </td>
                    <td class="title">
                        业务类型:
                    </td>
                    <td class="value">
                        <select id="search_od_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value',multiple: true, editable:false, textField:'label',filter: filterCombo,width:106" ></select>
                    </td> 
                    <td class="title">
                        委托客户:
                    </td>
                    <td class="value">
                         <input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" /> 
                    </td>
                    <td class="title">业务起始:</td>
                    <td class="value">
                        <input id="search_od_beg_fee_dat" class="easyui-datebox" data-options="width:106" />
                    </td>
                    <td class="title">内外贸:</td>
                    <td class="value"> 
                        <select id="search_od_trade_typ_id" class="easyui-combobox" data-options="panelHeight:'auto',multiple: true, editable:false,valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                    </td>
                    <td class="value" rowspan="3">
                        <textarea id="search_od_bill_nos" placeholder="提单号,一行一条"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                        resize:none; width:176px; height:80px;"></textarea> 
                    </td> 
                    <td class="value" rowspan="3">
                        <textarea id="search_od_cntr_nos" placeholder="箱号，一行一条"   class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                        resize:none; width:126px; height:80px;"></textarea> 
                    </td> 
                    <%--<td class="title">
                        客服单:
                    </td>
                    <td class="value">
                        <select id="search_od_include_all_service" class="easyui-combobox" data-options="panelHeight:'auto',multiple: false, editable:false,valueField:'value', textField:'label',filter: filterCombo,width:106" >
                            <option value="-1" selected>包含客服单</option>
                            <option value="0" >不包客服单</option>
                            <option value="1">仅客服单</option>
                         
                        </select>
                    </td>--%>
                </tr>
                <tr>
                    <td class="title">
                        项目类型:
                    </td>
                    <td class="value">
                        <select id="search_od_project_typ" class="easyui-combobox" data-options="panelHeight:'auto',multiple: true, editable:false,valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                    </td>
                    <td class="title">
                        集散类型:
                    </td>
                    <td class="value">
                        <select id="search_od_box_typ" class="easyui-combobox" data-options="panelHeight:'auto',multiple: true, editable:false,valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                  
                        </select>
                    </td>
                    <td class="title">
                        供货客户:
                    </td>
                    <td class="value">
                        <input id="search_od_cargo_agent_cu_id" class="cls_customs_combogrid" style="width:172px;" />  
                    </td>
                    <td class="title">业务截止:</td>
                    <td class="value">
                        <input id="search_od_end_fee_dat" class="easyui-datebox" data-options="width:106" />
                    </td>
                     <td class="title">
                        录单人:
                    </td>
                    <td class="value">
                        <select id="search_od_service_id" class="easyui-combobox" data-options="panelHeight:'200',multiple: true, editable:false,valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                   
                        </select>
                    </td> 
                   
                    <%--<td class="value">
                         
                        <label for="search_od_water_flag">涉水</label><input type="checkbox" id="search_od_water_flag" />
                                  
                        <label for="search_od_sub_way_flag">涉铁</label><input type="checkbox" id="search_od_sub_way_flag" />
                     
                    </td>--%>
                </tr>
                <tr>
                    <td class="title">模糊查询:</td>
                    <td class="value" colspan="3">
                        <input id="search_like_str" class="easyui-textbox" style="width:270px" />
                    </td>
                    <td class="title">
                        供服商:
                    </td>
                    <td class="value" > 
                        <input id="search_fee_cu_id" class="cls_customs_combogrid" style="width:172px;" /> 
                    </td> 
                    <td class="title">工具名:</td>
                    <td class="value" >
                        <input id="search_od_route_tools_desc" class="easyui-textbox" style="width:100px" />
                    </td> 
                    <td class="title">工具号:</td>
                    <td class="value" >
                        <input id="search_od_route_tools_no" autocomplete="off" class="easyui-textbox" style="width:106px" />
                    </td> 
                     
                   <%--<td class="value">
                                
                        <label for="search_od_sub_way_flag">涉路</label><input type="checkbox" id="search_od_road_way_flag" />
                           
                        <label for="search_od_sub_way_flag">涉空</label><input type="checkbox" id="search_od_air_way_flag" />
                    
                    </td>--%>
                    <td>
                        <a href="javascript:refresh_order_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                       
                    </td>
                     <td>
                         
                       <a href="javascript:new_order();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新建业务</a>
                    </td>
                </tr>
            </table> 
        </div>
        <div data-options="region:'center',split:false,border:false" style="padding:0px">
            <table id="tab_order"></table>
        </div>
        <div data-options="region:'south',title:'', split:false,border:false" style="background:#e8eaff; overflow:hidden; height:26px" >
            <table class="cls_group_order_fee"> 
                <tbody>
                    <tr>
                        
                    </tr> 
                </tbody>
                
            </table>
        </div>      
    </div>
    <!--单个编辑-->
    <div id="page_order_edit" class="easyui-layout" fit="true">
        <div data-options="region:'north',title:'', " style="border-top:none;border-bottom:none;padding:0px; height:33px;" >
            <div class="easyui-panel custom_bg" fit="true" style="padding:0px;  border:none;">
                <div class="dv_edit_order_menu_tab_back">
                    <a href="javascript:return_order_list();" tabindex="1"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-bullet_left'" >返回列表</a>  
                </div>
                <div class="dv_edit_order_menu_tab dv_edit_order_menu_tab_focus" onclick="javascript:show_page_order_base_info();">
                    委托&货物信息
                </div>
              <%--  <div class="dv_edit_order_menu_tab dv_edit_order_more" onclick="javascript:show_page_order_cntr_info();">
                    集装箱明细
                </div>--%>
                <div class="dv_edit_order_menu_tab dv_edit_order_more" onclick="javascript:show_page_service_info();">
                    供应商&服务 
                </div>
               <%-- <div class="dv_edit_order_menu_tab dv_edit_order_more" onclick="javascript:show_page_booking_note();">
                    订舱单
                </div>--%>
                <div class="dv_edit_order_menu_tab dv_edit_order_more" onclick="javascript:show_page_customs();" style="display:none;">
                    报关&商检
                </div>
                <div class="dv_edit_order_menu_tab dv_edit_order_more" onclick="javascript:show_page_fee_info();">
                    费用录入
                </div>
            </div>
        </div>
        <div data-options="region:'center',title:'', " style="border-top:none;border-bottom:none;padding:0px;" >
            <!--委托&货物信息-->
            <div  class="easyui-layout page_order_base_info"  fit="true">
                <div data-options="region:'west',split:true,title:'',border:false, " style="width:610px;padding:0px;" >
                    <div class="easyui-layout" fit="true"> 
                        <div data-options="region:'north',split:false,title:'',border:false," style="height:350px;padding:0px;overflow:hidden;">  
                            <div class="easyui-panel" data-options="title:'委托基本信息',border:false,fit:true " style="padding:0px;overflow:hidden;">
                                <div  style=" background-color:#f4f4f4; overflow:hidden; border-bottom:solid 1px #dddddd;"> 
                                    <a href="javascript:save_order();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a> 
                                                     
                                    <a href="javascript:lock_order();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-lock'">锁定提交</a>  
                                    <a href="javascript:view_of_approval_change_order(1);" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-wand'">改单申请</a> 
                                    <a href="javascript:delete_order();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">删除</a> 
                                    <a href="javascript:insert_new_order();"  tabindex="1" class="easyui-linkbutton " data-options="plain:true,iconCls:'icon-add'">新建订单</a> 
                                    <a href="javascript:copy_insert_order();" id="btn_copy_from_other_order" tabindex="1" class="easyui-linkbutton " data-options="plain:true,iconCls:'icon-page_copy'">拷贝录入</a> 
                                    <a href="javascript:upload_order_file();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125647919_easyicon_net_16'">订舱单录入</a> 
                                </div>
                                <table class="tab_std" style="width:640px;">
                                    <col style="width:10%"/>
                                    <col style="width:20%"/>
                                    <col style="width:10%"/>
                                    <col style="width:20%"/> 
                                    <col style="width:15%"/>
                                    <col style="width:25%"/>
                                    <tr>
                                        <td class="title">业务编号:</td>
                                        <td class="value">
                                            <input id="ed_od_no" readonly="true" class="easyui-textbox" style="width:100px;" />
                                        </td>
                                        <td class="title"><span class="ipt_must">业</span>务时间:</td>
                                        <td class="value">
                                            <input id="ed_od_fee_dat" class="easyui-datebox" data-options="width:104"/>
                                        </td>
                                        <td class="title">状态:</td>
                                        <td class="value">
                                            <input id="ed_od_status_id" readonly="true" class="easyui-textbox" style="width:100px;" />
                                        </td>
                                    </tr>
                                   
                                    <tr> 
                                        <td class="title"><span class="ipt_must">委</span>托单位:</td>
                                        <td class="value" colspan="3">
                                            <input id="ed_od_delegate_cu_id" class="cls_customs_combogrid" style="width:296px;" /> 
                                        </td>
                                       
                                    </tr>
                                    <tr>
                                        <td class="title">联系人:</td>
                                        <td class="value">
                                            <input id="ed_od_delegate_relation_nam" class="easyui-textbox" style="width:100px"/>
                                        </td>
                                        <td class="title">电话:</td>
                                        <td class="value">
                                            <input id="ed_od_delegate_relation_phone" class="easyui-textbox" style="width:100px"/>
                                        </td>
                                        <td class="title">传真:</td>
                                        <td class="value">
                                            <input id="ed_od_delegate_relation_fax" class="easyui-textbox" style="width:100px"/>
                                        </td>
                                    </tr>
                                    <tr> 
                                        <td class="title">发货单位:</td>
                                        <td class="value" colspan="3">
                                            <input id="ed_od_cargo_agent_cu_id" class="cls_customs_combogrid" style="width:296px;" /> 
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td class="title">联系人:</td>
                                        <td class="value">
                                            <input id="ed_od_cargo_agent_relation_nam" class="easyui-textbox" style="width:100px"/>
                                        </td>
                                        <td class="title">电话:</td>
                                        <td class="value">
                                            <input id="ed_od_cargo_agent_relation_phone" class="easyui-textbox" style="width:100px"/>
                                        </td>
                                        <td class="title">传真:</td>
                                        <td class="value">
                                            <input id="ed_od_cargo_agent_relation_fax" class="easyui-textbox" style="width:100px"/>
                                        </td>
                                    </tr>
                                    <tr> 
                                        <td class="title"><span class="ipt_must">业</span>务类型:</td>
                                        <td class="value">
                                            <select id="ed_od_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                        </td>
                                        <td class="title">项目类型:</td>
                                        <td class="value">
                                            <select id="ed_od_project_typ" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106"></select>
                                        </td>
                                        <td class="title">集散类型:</td>
                                        <td class="value">
                                            <select id="ed_od_box_typ_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                        </td> 
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td class="title">内外贸:</td>
                                        <td class="value">
                                            <select id="ed_od_trade_typ_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                        </td>
                                        <td class="title">进出口:</td>
                                        <td class="value">
                                            <select id="ed_od_i_e_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106">
                                                <option value="I">进口</option>
                                                <option value="E">出口</option>
                                            </select>
                                        </td>
                                        <td class="title">发货运输条款:</td>
                                        <td class="value">
                                            <select id="ed_od_freight_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106"></select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="title">起运地:</td>
                                        <td class="value" colspan="3">
                                             <input id="ed_od_beg_place_id" class="cls_place_combogrid" style="width:296px;" /> 
                                            
                                        </td>
                                         
                                        <td class="my_check_td" colspan="2">
                                            <input type="checkbox" id="od_water_way_flag" onclick="return false;" /> <label for="od_water_way_flag">涉水</label>
                                            <input type="checkbox" id="od_sub_way_flag" onclick="return false;"/> <label for="od_sub_way_flag">涉铁</label>
                                            
                                        </td> 
                                    </tr>
                                    <tr>
                                        <td class="title">交货地:</td>
                                        <td class="value" colspan="3">
                                             <input id="ed_od_end_place_id" class="cls_place_combogrid" style="width:296px;" />  
                                        </td> 
                                        <td class="my_check_td" colspan="2">
                                            
                                            <input type="checkbox" id="od_road_way_flag" onclick="return false;" /> <label for="od_road_way_flag">涉陆</label>
                                            <input type="checkbox" id="od_air_way_flag" onclick="return false;" /> <label for="od_air_way_flag">涉空</label>
                                        </td> 
                                    </tr> 
                                    <tr> 
                                        <td class="title">订舱单位:</td>
                                        <td class="value" colspan="3">
                                            <input id="ed_od_bk_commissioned_id2"  class="cls_customs_combogrid " style="width:296px;" /> 
                                        </td>
                                        
                                    </tr>     
                                    <tr> 
                                        <td class="title">操作:</td>
                                        <td class="value">
                                            <input id="ed_od_operation_id" readonly="true" class="easyui-textbox" style="width:100px;"/>
                                        </td>
                                        <td class="title"><span class="ipt_must">客</span>服:</td>
                                        <td class="value">
                                            <select id="ed_od_service_id"  class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                        </td> 
                                        <td class="title"><span class="ipt_must">销</span>售:</td>
                                        <td class="value">
                                            <select id="ed_od_sales_id" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                        </td> 
                                    </tr> 
                                </table>  
                            </div>  
                        </div>
                        <div data-options="region:'center',split:false,title:'',border:false, " style="padding:0px;" >
                            <div class="easyui-layout" fit="true"> 
                                <div data-options="region:'west',split:false,title:'',border:false," style="width:306px;padding:0px;overflow:hidden; ">
                                    <div class="easyui-panel" data-options="title:'委托备注',fit:true,border:false" style="padding:0px; overflow:hidden;border-left:solid 1px #daeef5;">
                                        <textarea id="ed_od_bak_delegate"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:99%; height:99%;"></textarea> 
                                    </div>
                                </div>
                                <div data-options="region:'center',split:false,title:'',border:false," style="padding:0px;overflow:hidden;">
                                    <div class="easyui-panel" data-options="title:'操作备注',fit:true,border:false" style="padding:0px; overflow:hidden;">
                                        <textarea id="ed_od_bak_operation"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                resize:none; width:99%; height:99%;"></textarea> 
                                    </div>
                                </div> 
                            </div>
                        </div> 
                        <div data-options="region:'south',split:false,title:'',border:false, " style="height:50px; padding:0px;" >
                            <div class="easyui-panel" data-options="title:'',border:false,fit:true" style=" background-color:#f4f4f4; overflow:hidden;"> 
                                <table class="tab_std" style="min-width:640px;">
                                    <col style="width:14%"/>
                                    <col style="width:36%"/>
                                    <col style="width:50%"/> 
                                    <tr>
                                        <td class="title">
                                            记录:
                                        </td>
                                        <td class="value"><span  id="ed_od_record_by_nam"></span> &nbsp;&nbsp;<span id="ed_od_record_dat"></span></td>
                                         
                                        <td class="value"> 
                                             <a href="javascript:view_of_approval_details();" class="easyui-linkbutton" data-options="plain:true">查看锁单审核流水</a>
                                        </td> 
                                    </tr>  
                                    <%--<tr>
                                        <td></td>
                                        <td></td>
                                        <td class="value"> 
                                             <a href="javascript:view_of_co_approval_details();" class="easyui-linkbutton" data-options="plain:true">查看改单审核流水</a>
                                        </td> 
                                    </tr>  --%>
                                </table>
                            </div>
                        </div>            
                    </div>
                </div>
                <div data-options="region:'center',split:true,title:'',border:false," style="padding:0px; margin:0px;"> 
                    <div class="easyui-tabs" id="tabs_main" data-options="fit:true">
                        <div title="货物及运单等信息">
                            <div class="easyui-layout" fit="true"> 
                                <div data-options="region:'west',split:true,title:'',border:false" style="padding:0px; width:420px;">
                                    <div class="easyui-layout" fit="true"> 
                                        <div data-options="region:'north',split:false,title:'',border:false," style="height:324px;padding:0px;overflow:hidden;"> 
                                            <div class="easyui-panel" data-options="title:'货物信息',fit:true,border:false" style="padding:0px; overflow:hidden;">
                                                <table class="tab_std" style="width:640px;">
                                                    <col style="width:10%"/>
                                                    <col style="width:20%"/>
                                                    <col style="width:10%"/>
                                                    <col style="width:20%"/> 
                                                    <col style="width:10%"/>
                                                    <col style="width:30%"/>
                                                    <tr>
                                                        <td class="title">品名:</td>
                                                        <td class="value" colspan="3">
                                                            <input id="ed_od_cargo_typ" style="width:326px;" />  
                                                        </td>
                                        
                                                    </tr>
                                                    <tr>  
                                                        <td class="title">件数:</td>
                                                        <td class="value">
                                                            <input id="ed_od_cargo_number" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox" style="width:70px;" />
                                                        </td>    
                                                        <td class="title">包装类型:</td>
                                                        <td class="value">
                                                            <select id="ed_od_cargo_packing" class="easyui-combobox" data-options="panelHeight:'200',panelWidth:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                                        </td> 
                                                    </tr> 
                                                    <tr>  
                                                        <td class="title">重量:</td>
                                                        <td class="value">
                                                            <input id="ed_od_cargo_weight" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox" style="width:70px;" /><span> KG</span>
                                                        </td> 
                                                        <td class="title">体积:</td>
                                                        <td class="value">
                                                            <input id="ed_od_cargo_bluk" onkeyup="value=value.replace(/[^\d.]/g,'')" class="easyui-textbox" style="width:70px;" /><span> CBM</span>
                                                        </td>
                                                    </tr>   
                                                    <tr>
                                                        <td class="title">发货信息:</td>
                                                        <td class="value" colspan="3" >
                                                            <textarea id="ed_od_take_cargo_info"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:99%; height:60px;"></textarea>  
                                                        </td> 
                                                    </tr>   
                                                    <tr>
                                                        <td class="title">P/O#:</td>
                                                        <td class="value" colspan="3">
                                                            <input id="ed_od_po_no"  class="easyui-textbox" style="width:99%;" /> 
                                                        </td>
                                                    </tr>
                                     
                                                    <tr>
                                                        <td class="title">收货信息:</td>
                                                        <td class="value" colspan="3" >
                                                            <textarea id="ed_od_delivery_cargo_info"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:99%; height:60px;"></textarea>  
                                                        </td> 
                                                    </tr>   
                                                    <tr>
                                                        <td class="title">S/O#:</td>
                                                        <td class="value" colspan="3">
                                                            <input id="ed_od_so_no"  class="easyui-textbox" style="width:99%;" /> 
                                                        </td>
                                                    </tr>
                                      
                                                </table>
                                            </div>
                                        </div>
                                        <div data-options="region:'center',split:false,title:'',border:false, " style="padding:0px;" >
                                            <div class="easyui-panel" data-options="title:'箱量',fit:true,border:false" style="padding:0px; overflow:hidden;">
                                                <div id="tab_order_cntr_group_bar">
                                                    <table>
                                                        <tr>
                                                            <td colspan="6">
                                                                <a href="javascript:insert_cntr_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">添加</a> 
                                                                <a href="javascript:remove_cntr_group();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">移除</a>  
                                                            </td>
                                                        </tr> 
                                                    </table>
                                                </div>
                                                <table id="tab_order_cntr_group"> 
                                                </table>
                                            </div> 
                                        </div>      
                                    </div>
                                </div>
                                <div data-options="region:'center',split:false,title:'',border:false, " style="padding:0px;" > 
                            
                                    <div class="easyui-layout" fit="true">
                                        <div data-options="region:'north',border:false,split:false,title:''" style="padding:0px; height:324px; ">
                                            <div class="easyui-panel" data-options="title:'提运单信息',fit:true,border:false" style="padding:0px; overflow:hidden;">
                                                <table class="tab_std" style="width:90%;">
                                                    <col style="width:70px"/>
                                                    <col style="width:calc(45%-70px)"/>
                                                    <col style="width:70px"/>
                                                    <col style="width:calc(45%-70px)"/>
                                                    <tr>
                                                        <td class="title">主提单:</td>
                                                        <td class="value" colspan="3">
                                                            <textarea id="ed_od_main_bill_no"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                    resize:none; width:99%; height:60px;"></textarea> 
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="title">子提单:</td>
                                                        <td class="value" colspan="3">
                                                            <textarea id="ed_od_sub_bill_no"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                    resize:none; width:99%; height:60px;"></textarea> 
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <span style="font-size:9px; color:#d2d2d2">格式要求: 一个提单一行</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="title">提单类型:</td>
                                                        <td class="value">
                                                            <select id="ed_od_bill_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                                        </td>
                                                        <td class="title">签单方式:</td>
                                                        <td class="value">
                                                            <select id="ed_od_sign_bill_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select> 
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="title">报关报检:</td>
                                                        <td class="value">
                                                            <select id="ed_od_declare_customs_typ" class="easyui-combobox" data-options="panelHeight:'auto', valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                                        </td>
                                                        <td class="title">联运方式:</td>
                                                        <td class="value">
                                                            <select id="ed_od_carriage_typ" class="easyui-combobox" data-options="panelHeight:'auto', valueField:'value', textField:'label',filter: filterCombo,width:106" ></select> 
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="title">装箱方式:</td>
                                                        <td class="value">
                                                            <select id="ed_od_stuffing_container_typ" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                                                        </td>
                                                        <td class="title">场所:</td>
                                                        <td class="value">
                                                            <input id="ed_od_stuffing_container_place" class="easyui-textbox" style="width:102px" /> 
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="title">入场时间:</td>
                                                        <td class="value">
                                                            <input id="ed_od_entry_tim_of_stuffing" class="easyui-datebox" data-options="width:106" />  
                                                        </td>
                                                        <td class="title">出场时间:</td>
                                                        <td class="value">
                                                            <input id="ed_od_out_tim_of_stuffing" class="easyui-datebox" data-options="width:108" />  
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div data-options="region:'center',border:false,split:false,title:''" style="padding:0px;">
                                            <div class="easyui-panel" data-options="title:'合同附件',fit:true,border:false" style="padding:0px; overflow:hidden;">
                                                <div id="tab_order_contract_files_bar">
                                                    <a href="javascript:upload_order_contract_file();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125647919_easyicon_net_16'">上传</a> 
                                                    <a href="javascript:delete_order_contract_file();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">移除</a> 
                                                </div>
                                                <table id="tab_order_contract_files"></table>
                                            </div>
                                        </div>
                                    </div>
                                        
                                
                            
                                </div>
                            </div>
                        </div>
                        <div title="集装箱明细">
                            <div class="easyui-layout "  fit="true">
                                <%--<div data-options="region:'east',split:true,title:'',border:false," style="width:570px; padding:0px; margin:0px;"> 
                                    <div class="easyui-layout" data-options="fit:true">
                                        <div data-options="region:'north',border:false,split:false,title:''" style="height:56px;">
                                            <div class="easyui-panel" data-options="title:'运单及装箱资料',fit:true,border:false " style=" background-color:#f4f4f4; overflow:hidden; border-bottom:solid 1px #dddddd;">
                         
                                                <a href="javascript:update_order_addition_infos();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                                 
                                            </div>
                                        </div>
                                        <div data-options="region:'center',border:false,split:false,title:''">
                                             <div class="easyui-layout" data-options="fit:true">
                                                
                                                <div data-options="region:'center',border:false,split:false,title:''">
                                                    <div class="easyui-layout" data-options="fit:true">
                                                        
                                                        <div data-options="region:'center',border:false,split:false,title:''">
                                                            <div class="easyui-panel" data-options="title:'集装箱装箱图片明细',fit:true,border:false ">
                                                                <div id="tab_order_cntr_stuffing_info_bar">
                                                                    <table>
                                                                        <tr>
                                                                            <td>筛选:</td>
                                                                            <td>
                                                                                <input id="ed_order_cntr_stuffing_search_like" autocomplete="off" type="text" class="easyui-textbox" style="width:150px;" oninput="mulit_search_order_cntr_stuffing_infos();" />
                                                                            </td> 
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                                <table id="tab_order_cntr_stuffing_info"></table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                     
                                </div>--%>
                                <div data-options="region:'center',split:true,title:'',border:false," style="padding:0px; margin:0px;"> 
                                    <div class="easyui-panel" data-options="title:'',fit:true,border:false ">
                                        <div id="tab_order_cntr_bar">
                                            <table>
                                                <tr>
                                                    <td colspan="6">         
                                                        <a href="javascript:insert_order_cntr();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">手工</a> 
                                                        <a href="javascript:import_order_cntr();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">导入</a> 
                                                        <a href="javascript:delete_order_cntr();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">移除</a> 
                                                        <a href="javascript:void(0);" tabindex="1" class="easyui-menubutton" data-options="menu:'#mm_down_order_cntr_list',iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a>  
                                                        <div id="mm_down_order_cntr_list" style="width:150px;"> 
                                                            <div onclick="download_order_cntr_pre_schedule_list();">外贸-预配清单</div>  
		                                                    <div onclick="download_order_cntr_schedule_list();">外贸-重箱申报清单</div>  
	                                                    </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>模糊:</td>
                                                    <td>
                                                        <input type="text" autocomplete="off" class="easyui-textbox" oninput="mulitserach_order_cntr();" id="ed_order_cntr_search_like" style="width:140px;" />
                                                    </td>
                                                    <td>提单:</td>
                                                    <td>
                                                        <select id="ed_order_cntr_search_bill_no" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:206" ></select>
                                                    </td>
                                                    <td>尺寸:</td>
                                                    <td>
                                                        <select id="ed_order_cntr_search_eqp_siz" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:66" ></select>
                                                    </td>
                                                    <td>箱型:</td>
                                                    <td>
                                                        <select id="ed_order_cntr_search_eqp_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:66" ></select>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                        
                                        <table id="tab_order_cntr"></table>
                                    </div>
                                </div>
                            </div>
                        </div> 
                         
                        <div title="订舱信息">
                            <div class="easyui-layout"  fit="true"> 
                                <div data-options="region:'center',split:true,title:'',border:false," style="padding:0px; margin:0px;"> 
                                    <div  class="easyui-layout"  fit="true">
                                        <div data-options="region:'north',title:'', border:false" style="height:56px">
                                            <div class="easyui-panel" data-options="title:'订舱单',fit:true,border:false " style=" background-color:#f4f4f4; overflow:hidden; border-bottom:solid 1px #dddddd;">
                             
                                               
                                                <a href="javascript:download_order_booking_note();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-20130406125519344_easyicon_net_16'">下载</a> 
                                                
                                            </div>
                                        </div>
                                        <div data-options="region:'center',title:'', border:false" style="padding:0px;" > 
                                            <table class="tab_booking_note"  >
                                                <col style="width:17%"/>
                                                <col style="width:16%"/>
                                                <col style="width:17%"/>
                                                <col style="width:16%"/> 
                                                <col style="width:18%"/>
                                                <col style="width:16%"/> 
                                                <tr> 
                                                    <td class="title">委托单位:</td>
                                                    <td class="value" colspan="5">
                                                        <input id="ed_bk_delegate_desc"  class="easyui-textbox"   value="" />
                                                    </td> 
                                                </tr>
                                                <tr> 
                                                    <td class="title">单位地址:</td>
                                                    <td class="value" colspan="5">
                                                        <input id="ed_bk_delegate_address" class="easyui-textbox"   value=""/>
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="title">Shipper发货人:</td>  
                                                    <td class="title">受托单位:</td>
                                                    <td class="value" colspan="2">
                                                        <%--<input id="ed_od_bk_commissioned_id" class="cls_customs_combogrid" style="width:310px;" />--%>
                                                        <select id="ed_od_bk_commissioned_id"  class="easyui-combobox ed_od_bk_commissioned_id  cls_customs_combobox" data-options="panelHeight:'200',panelWidth:'400',valueField:'value', 
                                                            textField:'label',filter: filterCombo,width:310" ></select>
                                                    </td> 
                                                </tr>
                                                <tr>
                                                    <td colspan="3" rowspan="3" valign="top">
                                                        <textarea id="ed_bk_shipper_desc"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                                resize:none;  height:82px;"></textarea> 
                                                    </td>
                                                    <td class="title">受托TO:</td>
                                                    <td class="value" colspan="2">
                                                        <input id="ed_bk_commissioned_to" class="easyui-textbox"  />
                                                    </td>
                                                </tr>
                                                <tr> 
                                                    <td class="title" >受托TEL:</td>
                                                    <td class="value" colspan="2">
                                                        <input id="ed_bk_commissioned_tel" class="easyui-textbox"  />
                                                    </td> 
                                                </tr>
                                                <tr> 
                                                    <td class="title" >受托FAX:</td>
                                                    <td class="value"colspan="2">
                                                        <input id="ed_bk_commissioned_fax" class="easyui-textbox"   />
                                                    </td> 
                                                </tr>
                                                <tr> 
                                                    <td colspan="3" <%--rowspan="2"--%> class="title">Consignee收货人:</td> 
                                                    <td class="title">Booking Number:</td>
                                                    <td class="value" colspan="2">
                                                        <input id="ed_bk_booking_number"  class="easyui-textbox"  />
                                                    </td>
                                                </tr>
                                                <%--<tr>
                                                    <td class="title">Job Number:</td>
                                                    <td class="value" colspan="2">
                                                        <input id="ed_bk_job_number" class="easyui-textbox"  />
                                                    </td>
                                                </tr>--%>
                                                <tr>
                                                    <td colspan="3" rowspan="4" valign="top">
                                                        <textarea id="ed_bk_consignee_desc"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                                resize:none;   height:108px;"></textarea> 
                                                    </td>
                                                    <td class="title">委托TEL:</td>
                                                    <td class="value" colspan="2">
                                                        <input id="ed_bk_delegate_tel"  class="easyui-textbox"  />
                                                    </td>
                                                </tr> 
                                                <tr> 
                                                    <td class="title">委托FAX:</td>
                                                    <td class="value" colspan="2">
                                                        <input id="ed_bk_delegate_fax"  class="easyui-textbox"  />
                                                    </td>
                                                </tr> 
                                                <tr> 
                                                    <td class="title">委托CTC:</td>
                                                    <td class="value" colspan="2">
                                                        <input id="ed_bk_delegate_ctc"   class="easyui-textbox"  />
                                                    </td>
                                                </tr> 
                                                <tr> 
                                                    <td class="title">委托Date:</td>
                                                    <td class="value" colspan="2"   >
                                                        <input id="ed_bk_delegate_date"   class="easyui-datebox" style="width:310px;"/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="title">Notify Party 通知人:</td>   
                                                    <td colspan="3" rowspan="2"></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3"  valign="top">
                                                        <textarea id="ed_bk_notify_desc"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                                resize:none; width:99%; height:82px;"></textarea> 
                                                    </td> 
                                                </tr>
                                                <tr> 
                                                    <td class="title" >船公司:</td>
                                                    <td class="value">
                                                        <select id="ed_bk_carrier_id" class="easyui-combobox" data-options="panelHeight:'200',panelWidth:'400',valueField:'value', 
                                                            textField:'label',filter: filterCombo,width:146" ></select> 
                                                    </td> 
                                                    <td class="title" >截关日期:</td>
                                                    <td class="value">
                                                        <input id="ed_bk_closing_date"   class="easyui-datebox" style="width:146px;"/>
                                                    </td> 
                                                    <td class="title" >开船日期:</td>
                                                    <td class="value">
                                                        <input id="ed_bk_etd"   class="easyui-datebox" style="width:146px;"/>
                                                    </td> 
                                                </tr> 
                                                <tr> 
                                                    <td class="title" >起运港:</td>
                                                    <td class="value">
                                                        <input id="ed_bk_port_of_loading_id" class="cls_place_combogrid" style="width:146px;" /> 
                                                    </td> 
                                                    <td class="title" >中转港:</td>
                                                    <td class="value">
                                                        <input id="ed_bk_port_of_transit_id" class="cls_place_combogrid" style="width:146px;" /> 
                                                    </td> 
                                                    <td class="title" >目的港:</td>
                                                    <td class="value">
                                                        <input id="ed_bk_port_of_discharge_id" class="cls_place_combogrid" style="width:146px;" /> 
                                         
                                                    </td> 
                                                </tr>
                                                <tr> 
                                                    <td class="title" >运输条款:</td>
                                                    <td class="value">
                                                        <select id="ed_bk_freight_term_id" class="easyui-combobox" data-options="panelHeight:'200',panelWidth:'400',valueField:'value', 
                                                            textField:'label',filter: filterCombo,width:146" ></select> 
                                                    </td> 
                                                    <td class="title" >运费:</td>
                                                    <td class="value">
                                                        <select id="ed_bk_pay_method_id" class="easyui-combobox" data-options="panelHeight:'auto',panelWidth:'400',valueField:'value',
                                                                textField:'label',filter: filterCombo,width:146" ></select>  
                                                    </td> 
                                                    <td class="title" >货柜种类和数量:</td>
                                                    <td class="value">
                                                        <input id="ed_bk_container_typ_and_quantity"  class="easyui-textbox" style="width:140px;"/>
                                                    </td> 
                                                </tr>
                                                <tr> 
                                                    <td class="title" >唛头和编号:</td>
                                                    <td class="title" >件数包装:</td> 
                                                    <td class="title" colspan="2">货物描述:</td>
                                                    <td class="title" >毛重:</td>  
                                                    <td class="title" >体积:</td>  
                                                </tr>
                                                <tr> 
                                                    <td class="value" >
                                                        <textarea id="ed_bk_shipping_marks_and_no_desc"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                                resize:none;   height:108px;"></textarea> 
                                                    </td>
                                                    <td class="value" >
                                                        <textarea id="ed_bk_freight_package_desc"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                                resize:none;   height:108px;"></textarea> 
                                                    </td> 
                                                    <td class="value" colspan="2">
                                                        <textarea id="ed_bk_description_of_goods_desc"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                                resize:none;   height:108px;"></textarea> 
                                                    </td>
                                                    <td class="value" >
                                                        <textarea id="ed_bk_gross_weight"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                                resize:none;  height:108px;"></textarea> 
                                                    </td>  
                                                    <td class="value" >
                                                        <textarea id="ed_bk_measurement"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                                resize:none;   height:108px;"></textarea> 
                                                    </td>  
                                                </tr>
                                                <tr> 
                                                    <td class="title" colspan="6" >其他要求:</td> 
                                                </tr>
                                                <tr> 
                                                    <td class="value" colspan="6" >
                                                        <textarea id="ed_bk_remarks"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                                resize:none; width:99%; height:108px;"></textarea> 
                                                    </td> 
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
                
            </div>
            <!--集装箱明细-->
            
            <!--供应商&服务-->
            <div class="easyui-layout page_order_service_info" data-options="fit:true"> 
                <div data-options="region:'north',title:'', border:false" style="height:30px">
                    <div class="easyui-panel" data-options="title:'',fit:true,border:false " style=" background-color:#f4f4f4; overflow:hidden; border-bottom:solid 1px #dddddd;"> 
                        <table >
                            <tr>
                                <td>
                                    <input id="ed_select_od_service_cu_id" class="cls_customs_combogrid" style="width:302px;" />  
                                </td>
                                <td>
                                    <a href="javascript:insert_service();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">增加</a>   
                                </td>
                                <td>
                                    <a href="javascript:delete_service();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">删除</a>   
                                </td>
                            </tr>
                        </table>  
                    </div>
                </div> 
                <div data-options="region:'center',split:true,title:'',border:false," style="padding:0px; margin:0px;"> 
                    <div class="easyui-panel" data-options="fit:true,border:false">  
                        <div id="tabs_service_list" class="easyui-tabs" data-options="fit:true" style="padding:0px; margin:0px;">
                                     
                        </div> 
                    </div>
                </div>
            </div>
            <!--订舱单-->
            
            <!--报关&商检-->
            <div class="easyui-layout page_order_customs"  fit="true">
                <div data-options="region:'center',split:true,title:'',border:false," style="padding:0px; margin:0px;"> 
                </div>
            </div>
            <!--费用录入-->
            <div class="easyui-layout page_order_fee_info"  fit="true">
                <!-- 上下结构 -->
                <div data-options="region:'north',title:'', split:false, border:false " style="height:28px; padding:0px;" >
                    <div class="easyui-panel" data-options="title:'',fit:true,border:false "  style=" background-color:#f4f4f4; overflow:hidden; border-bottom:solid 1px #dddddd;">
                         
                            <a href="javascript:save_order_fee();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存计费信息</a>

                            <a href="javascript:view_ref_month_exchange_rate();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查看汇率</a>
                            <a href="#" id="down_rec_menubutton" class="easyui-menubutton" data-options=" iconCls:'icon-20130406125519344_easyicon_net_16'">客户对账单下载</a>
                    </div>
                </div> 
                <div data-options="region:'center',title:'',split:false, border:false " style="padding:0px;" >
                    <!--第二层 左右结构 -->
                    <div class="easyui-layout father_order_fee" fit="true">
                        <div data-options="region:'east',split:true,border:false" style="width:400px;">
                            <div class="easyui-layout" fit="true">
                                <div data-options="region:'north',border:false,split:false" style="height:520px;">
                                    <div class="easyui-panel" data-options="fit:true,border:false,title:'费用汇总&盈收'">
                                        
                                        <table id="tab_od_fee_group">

                                        </table>
                                    </div>
                                </div>
                                <div data-options="region:'center',border:false,split:false">
                                    <div class="easyui-panel" data-options="fit:true,border:false,title:'费用总体备注说明'" style="overflow:hidden;">
                                        <textarea id="ed_od_profit_and_loss_bak"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                    resize:none; width:99%; height:99%;"></textarea> 
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div data-options="region:'center',split:true,border:false">
                            <div class="easyui-layout order_fee_details" fit="true">
                                <div data-options="region:'center',split:true,border:false" class="cls_panel_rec">
                                    <div class="easyui-panel cls_panel_rec" data-options="title:'应收费用',fit:true,border:false ">
                                        <div class="easyui-layout" fit="true">
                                            <div data-options="region:'west',title:'',split:false,border:false" style="width:36px;" >
                                                <div class="easyui-panel" data-options="title:'',fit:true,border:false" style="background-color:#daeef5">
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <a href="javascript:rec_insert_order_fee_details();" tabindex="1" class="easyui-linkbutton" title="增加应收费用" data-options="plain:true,iconCls:'icon-add'"></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <a href="javascript:rec_copy_order_fee_details();" tabindex="1" class="easyui-linkbutton" title="复制添加应收费用" data-options="plain:true,iconCls:'icon-page_white_copy'"></a>
                                                            </td>
                                                        </tr>
                                                        <%--<tr>
                                                            <td>
                                                                <a href="javascript:rec_insert_order_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-package_down'"></a>
                                                            </td>
                                                        </tr> --%>
                                                        <tr>
                                                            <td>
                                                                <a href="javascript:rec_delete_order_fee_details();" tabindex="1" class="easyui-linkbutton" title="删除应收费用" data-options="plain:true,iconCls:'icon-remove'"></a>
                                                            </td>
                                                        </tr>
                                 
                                                    </table>
                                                </div>
                                            </div>
                                            <div data-options="region:'center',title: '',split:false,border:false">
                                                <div class="easyui-panel" data-options="title:'',fit:true,border:false">
                                                    <table id="tab_order_fee_rec"></table>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                <div data-options="region:'south',title:'', split:true, border:false " class="cls_panel_pay">
                                    <div class="easyui-panel " data-options="title:'应付费用',fit:true,border:false ">
                                        <div class="easyui-layout" fit="true">
                                            <div data-options="region:'west',title:'',split:false,border:false" style="width:36px;" >
                                                <div class="easyui-panel" data-options="title:'',fit:true,border:false" style="background-color:#daeef5">
                                                    <table>
                                                        <%-- <tr>
                                                            <td>
                                                                <a href="javascript:pay_insert_order_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'"></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <a href="javascript:pay_copy_order_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-page_white_copy'"></a>
                                                            </td>
                                                        </tr>--%>
                                                        <tr>
                                                            <td>
                                                                <a href="javascript:copy_to_rec_order_fee_details();" title="拷贝费用到应收明细" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-folder_up'"></a>
                                                            </td>
                                                        </tr>  
                                                        <%-- <tr>
                                                            <td>
                                                                <a href="javascript:pay_delete_order_fee_details();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'"></a>
                                                            </td>
                                                        </tr>--%>
                                 
                                                    </table>
                                                     
                                                </div>
                                            </div>
                                            <div data-options="region:'center',title: '',split:false,border:false">
                                                <div class="easyui-panel" data-options="title:'',fit:true,border:false">
                                                    <table id="tab_order_fee_pay"></table>
                                                </div>
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>  
            </div> 
        </div>
    </div>
    
    <!--订舱单导入 对话框-->
    <div id="dlg_insert_order_by_upload_order_file" class="easyui-dialog">
        <table class="tab_std">
            
            <tr>
                <td  class="custom_bg" style="  padding:6px;line-height:22px;color:#f9534f">
                    错误提示,请修正错误提示涉及的内容。
                </td>
            </tr>
           
            <tr class="tr_unfind_dlg_ed_od_delegate_cu_id">
                
                <td class="value" >
                    <span class="span_validate_title" id="sp_unfind_dlg_ed_od_delegate_cu_id"></span>
                </td>
            </tr> 
            <tr class="tr_unfind_dlg_ed_od_freight_id">
                
                <td class="value"  >
                    <span class="span_validate_title" id="sp_unfind_dlg_ed_od_freight_id"></span>
                </td>
            </tr>
              
            <tr class="tr_unfind_dlg_ed_od_beg_place_id">
                 
                <td class="value" >
                    <span class="span_validate_title" id="sp_unfind_dlg_ed_od_beg_place_id"></span>
                </td>
            </tr>
            
            <tr class="tr_unfind_dlg_ed_od_end_place_id">
                 
                <td class="value" >
                    <span class="span_validate_title" id="sp_unfind_dlg_ed_od_end_place_id"></span>
                </td>
            </tr> 
        </table> 
    </div>

    <!--导入 集装箱-->
    <div id="dlg_import_order_cntr" class="easyui-dialog">
        <div class="easyui-panel custom_bg" data-options="title:'',border:false," style="line-height:28px; padding-left:20px; font-size:14px; border-bottom:solid 1px #95b8e7;">
            <div>请下载模板，按照模板格式黏贴数据到下面文本款。</div>
            <div>
                <a href="Templates/委托集装箱导入模板3.xls" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-page_excel'">导入格式一</a>
                <a href="Templates/委托集装箱导入模板.xls" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-page_excel'">导入格式二</a>
            </div>
           <%-- <div>
                <a href="Templates/委托集装箱导入模板2.xls" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-page_excel'">导入格式二</a>
            </div>
            <div>
                <a href="Templates/委托集装箱导入模板3.xls" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-page_excel'">导入格式三</a>
            </div>--%>
            <div>
                另外支持，无标题导入: 导入时，不需要标题部分。支持格式有: 
            </div>
            <div>
                格式一: 箱型 + 空重 +箱主 + 提单号 + 箱号 + 铅封 + 箱货重 + 提空提单
            </div>
            <div style="color:red;font-weight:bold;">
                提示:按次序从表格中用 ctrl 合并复制,再次强调不要标题
            </div>
        </div>
        <textarea id="dlg_import_order_cntr_textarea"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                resize:none; width:99%; height:140px;"></textarea>  
         
    </div>

    <!--查看汇率-->
    <div class="easyui-dialog" id="dlg_od_ref_month_exchange_rate">
        <table id="tab_dlg_exchange_month_rate"></table>
    </div>

    <!--查看 装箱图片 -->
    <div class="easyui-dialog" id="dlg_od_cntr_stuffing_info_by_cntr_id">
        <input type="hidden" id="dlg_od_cntr_stuffing_info_cntr_id" />
        <table id="tab_dlg_od_cntr_stuffing_info_by_cntr_id"></table>
    </div>
    <!--锁定提交 选择 审核人-->
    <div class="easyui-dialog" id="dlg_od_lock">
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
    <div class="easyui-dialog" id="dlg_od_relock">
         
        <table class="tab_std">
            <col style="width:10%" />
            <col style="width:90%" />
            <tr>
                <td colspan="2" class="custom_bg"  style="  padding:12px;line-height:22px;color:#f9534f">
                    重新提交审核,默认提交到最后一次退回人。
                </td>
            </tr>
            <tr>
                <td class="title">备注:</td>
                <td class="value">
                     <textarea id="dlg_ap_context"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                resize:none; width:90%; height:68px;"></textarea> 
                </td>
            </tr>
        </table>
        
    </div>

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
    <!--文件上传控件-->
    <input style="display:none" type="file" id="file_upload" />
    <!--通过文件上传新建订单 -->
    <input style="display:none" type="file" id="file_upload2" />
    <!--CY 合同关联费项 编辑菜单-->
    <div id="dv_view_of_approval_details_from_list" class="easyui-menu" style="width: 50px; display: none;">  
      <!--放置一个隐藏的菜单Div-->  
        <div   data-options="iconCls:'icon-view'" onclick="view_of_approval_details_from_list()">查看审核流程</div>   
        <div   data-options="iconCls:'icon-view'" onclick="view_of_order_info_from_list()">查看费用简表</div> 
        <div   data-options="iconCls:'icon-view'" onclick="view_of_approval_change_order(2)">发起改单计划</div>   
    </div>
    <!--订单查看-->
    <div id="window_of_order_info" class="easyui-window"   title="账单明细" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
    <div id="win_of_copy_from_order" class="easyui-window" title="拷贝订单选择 " data-options="modal:true,closed:true,iconCls:'icon-query'" style="width:1080px;height:600px;padding:0px;">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg"  style="border-bottom:solid 1px #95b8e7;" >
                <table class="tab_std" style="width:auto;  ">
                    <tr>    
                     
                        <td class="title">
                            业务类型:
                        </td>
                        <td class="value">
                            <select id="search_win_od_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                        </td> 
                        <td class="title">内外贸:</td>
                        <td class="value"> 
                            <select id="search_win_od_trade_typ_id" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                        </td>
                        <td class="title">
                            委托客户:
                        </td>
                        <td class="value">
                             <input id="search_win_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" /> 
                        </td>
                        <td class="title">业务起始:</td>
                        <td class="value">
                            <input id="search_win_od_beg_fee_dat" class="easyui-datebox" data-options="width:106" />
                        </td>
                        
                    
                    
                    </tr>
                    <tr>
                        <td class="title">
                            项目类型:
                        </td>
                        <td class="value">
                            <select id="search_win_od_project_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" ></select>
                        </td>
                        <td class="title">
                            集散类型:
                        </td>
                        <td class="value">
                            <select id="search_win_od_box_typ" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                  
                            </select>
                        </td>
                        <td class="title">
                            供货客户:
                        </td>
                        <td class="value">
                            <input id="search_win_od_cargo_agent_cu_id" class="cls_customs_combogrid" style="width:172px;" />  
                        </td>
                        <td class="title">业务截止:</td>
                        <td class="value">
                            <input id="search_win_od_end_fee_dat" class="easyui-datebox" data-options="width:106" />
                        </td>
                          
                    </tr>
                    <tr>
                        <td class="title">模糊查询:</td>
                        <td class="value" colspan="3">
                            <input id="search_win_like_str" class="easyui-textbox" style="width:270px" />
                        </td> 
                        <td class="title">
                            客服:
                        </td>
                        <td class="value">
                            <select id="search_win_od_service_id" class="easyui-combobox" data-options="panelHeight:'200',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                                   
                            </select>
                        </td>
                        <td class="value" colspan="2">
                            <label for="search_win_od_water_flag">涉水</label><input type="checkbox" id="search_win_od_water_flag" />
                                  
                            <label for="search_win_od_sub_way_flag">涉铁</label><input type="checkbox" id="search_win_od_sub_way_flag" />    
                            <label for="search_win_od_sub_way_flag">涉路</label><input type="checkbox" id="search_win_od_road_way_flag" />
                           
                            <label for="search_win_od_sub_way_flag">涉空</label><input type="checkbox" id="search_win_od_air_way_flag" />
                    
                        </td>
                        <td>
                            <a href="javascript:refresh_win_order_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                       
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">
                            <span style="color:#f9534f;font-weight:bold;"> 提示:双击列表数据即可根据选择订单进行拷贝新增操作</span>
                           
                        </td>
                    </tr>
                </table> 
            </div>
            <div data-options="region:'center',split:false,border:false" style="padding:0px">
                <table id="tab_win_order"></table>
            </div>
        </div> 
	</div>
    <!--改单申请-->
    <div id="win_of_change_order" class="easyui-window"   title="改单申请" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
     
    
    <!--改单前提示操作-->
    <div class="easyui-dialog" id="dlg_change_order">
         <p>
             <b>请注意阅读</b>
         </p>
        
        <p>
            只有审核通过的委托订单才能发起费用改单申请！
            <br />如正在委托正锁定审核中，请等待审核通过。
            <br/> 如委托未提交锁定审核: 
            <br/> &nbsp;&nbsp;&nbsp;&nbsp;1.未归账费用可以直接进入委托费用中修改，
            <br/> &nbsp;&nbsp;&nbsp;&nbsp;2.已归账费用，需要从账单中撤销此费用。
            <br/> &nbsp;&nbsp;&nbsp;&nbsp;3.已交账的账单费用修改，需让商务退回账单。
            <br/> &nbsp;&nbsp;&nbsp;&nbsp;4.如果账单已进行了销账(含部分销账)、对冲等操作，需商务撤销相关操作，并退回账单才能修改。
            <b>是否继续?</b>
        </p>
         
    </div>

</asp:Content>
