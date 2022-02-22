<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="my_approval_of_hr_commit_profit.aspx.cs" Inherits="SDZL.my_approval_of_hr_commit_profit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="Js/my_approval_of_hr_commit_profit.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="tabs_ap" class="easyui-tabs" data-options="fit:true,border:false,">
        <div title="提成申请表">
            <!--审批列表-->
            <div id="page_amc_list" class="easyui-layout" fit="true"  style="padding:0px" >
                <div data-options="region:'north',title:'', split:false,border:false" class="custom_bg"  style=" border-bottom:solid 1px #95b8e7;" >
                    <table class="tab_std" style="width:auto;  ">
                        <tr> 
                            <td class="title">
                                所属公司:
                            </td>
                            <td class="value"> 
                                <select id="search_relation_c_id" class="easyui-combobox " data-options="panelHeight:'auto',panelWidth:'400',valueField:'value', textField:'label',filter: filterCombo,width:276" ></select>
                            </td>  
                            <td class="title">
                                审核状态:
                            </td>
                            <td class="value">
                                <select id="search_amc_status" class="easyui-combobox" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:106" >
                           
                                    <option value="">全部</option>
                                    <option value="1" selected>审核中</option> 
                                    <option value="2">已完成</option>
                                    <option value="0">退审</option> 
                                </select>
                            </td> 
                            <td class="title">
                                当前处理:
                            </td>
                            <td class="value">
                                <%--<input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" />--%>
                                <select id="search_amc_cur_opr_id" class="easyui-combobox cls_customs_combobox" data-options="width:106" >
                                   
                                </select>
                            </td>
                            <td>
                                <a href="javascript:open_help();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-help'">帮助</a>
                         
                            </td>
                            <td>
                                <a href="javascript:create_hr_commit_profit();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">创建新申请</a>
                         
                            </td>
                        </tr>
                        <tr> 
                            <td class="title">模糊查询:</td>
                            <td class="value">
                                <input id="search_like_str" autocomplete="off" class="easyui-textbox" style="width:270px" />
                            </td> 
                            <td class="title">
                                审核申请:
                            </td>
                            <td class="value">
                                <%--<input id="search_od_delegate_cu_id" class="cls_customs_combogrid" style="width:172px;" />--%>
                                <select id="search_amc_create_id" class="easyui-combobox cls_customs_combobox" data-options="width:106" >
                                   
                                </select>
                            </td> 
                            <td class="title">
                                仅待我处理:
                            </td>
                            <td class="value">
                                <input type="checkbox" id="search_only_my_step" />
                            </td> 
                            <td>
                                <a href="javascript:requery_amc_list();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-query'">查询</a>
                         
                            </td>
                            <td>
                                <a href="javascript:remove_amc();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-empty'">批量撤销</a>
                         
                            </td>
                        </tr>
                        
                    </table>
                </div>
                <div data-options="region:'center',split:false,border:false" style="padding:0px">
                    <table id="tab_amc_list"></table>
                </div>
            </div>
        </div>
    </div>
    <!-- 提成委托 选择对话框 -->
    <div id="dlg_of_create_hr_commit_profit" class="easyui-dialog" style="padding:0px;">  
        <table class="tab_std" > 
            <col style="width:70px;"></col>
            <col style="width:100px;"></col>
            <col style="width:170px;"></col>
            <tr>
                <td class="title">
                    当前单位:
                </td>
                <td class="value" colspan="2">
                    <input readonly="readonly" id="dlg_hr_compay_desc" class="easyui-textbox" style="width:260px;"/>
                </td>     
            </tr> 
            <tr>
                <td class="title">
                    开始时间:
                </td>
                <td class="value">
                    <input id="dlg_rel_beg_dat" class="easyui-datebox" style="width:90px;"/>
                </td>
                <td class="value"> 
                    <input readonly="readonly" value="00:00:00" class="easyui-textbox" style="width:60px;"/>
                </td>     
            </tr> 
            <tr>
                 
                <td colspan="3"  style="text-align:left; font-size:9px;color:#d2d2d2;">   
                    系统默认会设置开始时间为上次申请结束时间之后的第一天。 
                </td>
            </tr>
            <tr>
                <td class="title">
                    结束时间:
                </td>
                <td class="value">
                    <input id="dlg_rel_end_dat" class="easyui-datebox" style="width:90px;"/>
                </td>  
                <td class="value"> 
                    <input readonly="readonly" value="23:59:59" class="easyui-textbox" style="width:60px;"/>
                </td>     
            </tr> 
            
        </table>
    </div>
    <!--帮助-->
    <div id="dlg_of_hr_commit_profit_help" class="easyui-dialog" style="padding:0px; line-height:18px;"> 
        <div class="custom_bg" style="height:32px; padding-left:12px; line-height:32px;font-size:16px;font-weight:bold;">
            提成审核帮助
        </div>
        <div style="padding: 12px 12px 12px 0px; "> 
            <ol style="  margin:0px;">
                <li>提成审核由业务员自己提交,业务员提交数据需满足和公司的签约协定条件。
                </li>
                <li>
                    业务员通过查询某时间段内属于自己的委托业务，然后根据和公司协议规则选择提交委托业务数据。
                </li>
                <li>
                    关于时间界定: 例如选择2021-03-01 00:00:00至2021-05-31 23:59:59，查询结果为：当前申请人的业务委托在上述时间段内
                    发生应收销账且销账后,委托整单应收在2021-05-31 23:59:59之前收讫的数据。
                </li>
                <li>
                    上条叙述的时间节点以销账记录时间为准，而不以银行时间为准。有可能会发生记录时间晚于银行时间的事。例如: 某委托最后一次收款
                    的销账记录时间是9-1 ，银行销账时间8-29日。那么此单算9月份提成数据。
                </li>
                <li>
                    如委托已申请提成后，发生改单造成的销账时间跨季度问题的处理方式: 此情况将作为“异常数据”，强制绑定到下次提交。相关审核人员酌情进行处理。
                </li>
                <li>
                    明细中显示的最晚汇款时间是指: 在查询时间内，造成委托应收收讫的最后一次收款时间。而最长回款天数是指:开票时间和收款时间最大差值 + 1。存在多次收款的情况下，最晚收款时间并不是一定是最长回款天数
                </li>
            </ol>
        </div>
    </div>

    <!--查看 委托 -->
    <div id="win_of_create_hr_commit_profit" class="easyui-window"   title="创建提成申请" data-options="modal:true,zIndex:90, closed:true,iconCls:'icon-save',fit:true,collapsible:false,minimizable:false,maximizable:false,draggable:false,resizable:false," style="padding:0px; overflow:hidden;">
	</div>
</asp:Content>
