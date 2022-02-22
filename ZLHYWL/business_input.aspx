<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="business_input.aspx.cs" Inherits="SDZL.business_input" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/business_input.css" rel="stylesheet" />
    <script src="Js/business_input_mgr.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="easyui-tabs" id="dv_tabs" data-options="border:false,fit:true">
        <div title="录入业务" data-options="closable:false" style="padding: 10px">

            <table style="margin-bottom:10px">
                <tr>
                    <td>
                        <select id="cbx_busi_type" class="easyui-combobox" label="业务类型" labelposition="top"   data-options="panelHeight:'auto',filter: filterCombo" style="width: 100%;">
                            <option value="1">货代</option>
                            <option value="2">船代</option>
                            <option value="3">贸易</option>
                        </select>
                    </td>
                    <td>
                        <input id="cbx_trade" class="easyui-combobox" label="内外贸" labelposition="top" data-options="filter: filterCombo"  style="width:100%;" />
                       
                    </td>
                    <td id="td_ie" style="display:none">
                        <select id="cbx_ie" class="easyui-combobox" label="进出口" labelposition="top" data-options="panelHeight:'auto',filter: filterCombo" style="width:150px;">
                           <option value="1">进口</option>
                           <option value="2">出口</option>
                        </select>
                    </td>
                 
                </tr>
                <tr>
                    <td><input id="cbx_project" class="easyui-combobox" label="项目名称" labelposition="top" data-options="filter: filterCombo"  style="width:100%;"/></td>
                    <td><input id="cbx_boxtype" class="easyui-combobox" label="货物类型" labelposition="top" data-options="panelHeight:'auto',filter: filterCombo" style="width:100%"/></td>
                </tr>
                <tr>
                      <td colspan="3">
                            状态：
                            <input id="chk_op1" class="easyui-checkbox" name="chk_op" chk_id="1" style="width: 16px; height: 16px;" data-options="labelPosition:'after',labelWidth:40,onChange:click_booking" label="订舱" />
                            <input id="chk_op2" class="easyui-checkbox" name="chk_op" chk_id="2" style="width: 16px; height: 16px;" data-options="labelPosition:'after',labelWidth:40,onChange:click_bill" label="提单" />
                           
                            <input id="chk_op3" class="easyui-checkbox" name="chk_op" chk_id="3" style="width: 16px; height: 16px;" data-options="labelPosition:'after',labelWidth:40,onChange:click_railway" label="铁路" />
                            <input id="chk_op4" class="easyui-checkbox" name="chk_op" chk_id="4" style="width: 16px; height: 16px;" data-options="labelPosition:'after',labelWidth:40,onChange:click_river" label="江运" />
                            <input id="chk_op5" class="easyui-checkbox" name="chk_op" chk_id="5" style="width: 16px; height: 16px;" data-options="labelPosition:'after',labelWidth:40,onChange:click_shipping" label="海运" />
                            <input id="chk_op6" class="easyui-checkbox" name="chk_op" chk_id="6" style="width: 16px; height: 16px;" data-options="labelPosition:'after',labelWidth:40" label="空运" />
                            
                            <input id="ipt_import4" class="easyui-checkbox" style="width: 16px; height: 16px;" data-options="labelPosition:'after',labelWidth:40" label="船程" />
                        </td>
                </tr>
            </table>

            <div style="float: left; width: 51%">
                <div class="column"><span class="current">委托信息</span></div>
                <table class="wt-table">
                    <tbody>
                        <tr>
                            <td class="wt-label">委托单位</td>
                            <td class="wt-content">
                                <input id="cbx_wtdw" class="easyui-combobox" data-options="filter: filterCombo," style="width: 200px; height: 25px" /></td>
                            <td class="wt-label">出货单位</td>
                            <td class="wt-content">
                                <input id="cbx_chdw" class="easyui-combobox" data-options="filter: filterCombo" style="width: 200px; height: 25px" /></td>

                        </tr>
                        <tr>
                            <td class="wt-label">客户来源</td>
                            <td class="wt-content">
                                <select id="cbx_custom_from" class="easyui-combobox" data-options="editable:false,panelHeight:'auto',filter: filterCombo" style="width: 200px; height: 25px">
                                    <option value="公司业务">公司业务</option>
                                    <option value="私人业务">私人业务</option>
                                </select>

                            </td>
                            <td class="wt-label">客户编号</td>
                            <td class="wt-content" colspan="3">
                                <input id="ipt_custom_no" class="easyui-textbox" data-options="filter: filterCombo" style="width: 200px; height: 25px" /></td>
                        </tr>
                        <tr>
                            <td class="wt-label">委托时间</td>
                            <td class="wt-content">
                                <input id="ipt_wtsj" class="easyui-datebox" data-options="formatter:myformatter,parser:myparser" style="width: 200px; height: 25px" /></td>
                            <td class="wt-label">业务时间</td>
                            <td class="wt-content">
                                <input id="ipt_ywsj" class="easyui-datebox" style="width: 200px; height: 25px" /></td>
                        </tr>
                        <tr>
                            <td class="wt-label">委托备注</td>
                            <td class="wt-content" colspan="3">
                                <input id="ipt_wtbz" class="easyui-textbox" style="width: 486px; height: 25px" /></td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div style="float: right; width: 47%">
                <div class="column"><span class="current">货物信息</span></div>
                <table class="wt-table">
                    <tbody>
                        <tr>
                            <td class="wt-label">品名</td>
                            <td class="wt-content">
                                <select id="cbx_pm" class="easyui-combobox" data-options="filter: filterCombo" style="width: 200px; height: 25px"></select></td>
                            <td class="wt-label">包装</td>
                            <td class="wt-content">
                                <input id="cbx_bz" class="easyui-combobox"  data-options="filter: filterCombo" style="width: 200px; height: 25px" /></td>

                        </tr>
                        <tr>
                            <td class="wt-label">件数</td>
                            <td class="wt-content" colspan="3">
                                <input id="ipt_num" class="easyui-textbox" style="width: 200px; height: 25px" /></td>
                        </tr>
                        <tr>
                            <td class="wt-label">重量</td>
                            <td class="wt-content" colspan="3">
                                <input id="ipt_weight" class="easyui-textbox" label="单位/KG" labelposition="after" style="width: 200px; height: 25px" /></td>

                        </tr>
                        <tr>
                            <td class="wt-label">体积</td>
                            <td class="wt-content" colspan="3">
                                <input id="ipt_volume" class="easyui-textbox" label="单位/CBM" labelposition="after" style="width: 200px; height: 25px" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="clear: both"></div>

            <div class="column"><span class="current">业务详情信息</span></div>
            <table class="ts-table">
                <tbody>
                    <tr>
                        <td class="ts-label">起运港</td>
                        <td class="ts-content">
                            <input id="slt_qyg" class="easyui-combobox" data-options="filter: filterCombo" style="width:100%;height:25px"/></td>
                        <td class="ts-label">目的港</td>
                        <td class="ts-content">
                           <select id="slt_mdg" class="easyui-combobox"  data-options="filter: filterCombo" style="width:100%; height: 25px"></select></td>
                        <td class="ts-label">中转港</td>
                        <td class="ts-content">
                            <select id="slt_zzg" class="easyui-combobox" data-options="filter: filterCombo" style="width:100%;height: 25px"></select></td>
                        <td class="ts-label">目的地</td>
                        <td class="ts-content">
                            <input id="ipt_mdd" class="easyui-textbox" type="text" style="width:100%;height: 25px" /></td>
                    </tr>
                    <tr>
                        <td class="ts-label">运单号</td>
                        <td class="ts-content"><input id="ipt_ydh" class="easyui-textbox" style="width: 100%;height: 25px" /></td>
                        <td class="ts-label">运输条款</td>
                        <td class="ts-content">
                            <select id="slt_ystk" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%; height: 25px"></select></td>
                        <td class="ts-label">贸易条款</td>
                        <td class="ts-content">
                            <select id="slt_mytk" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%; height: 25px"></select></td>
                        <td class="ts-label">联运方式</td>
                        <td class="ts-content">
                            <input id="slt_lyfs" class="easyui-combobox"  data-options="filter: filterCombo" style="width: 100%; height: 25px" /> 
                        </td>
                    </tr>
                    <tr>
                        <td class="ts-label">航线</td>
                        <td class="ts-content">
                            <input id="ipt_hx" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%;height: 25px" /></td>
                        <td class="ts-label">装箱方式</td>
                        <td class="ts-content">
                            <input id="ipt_zxfs" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%; height: 25px"/></td>
                        <td class="ts-label">报关方式</td>
                        <td class="ts-content">
                            <input id="ipt_bgfs" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%; height: 25px"/></td>
                        <td class="ts-label">付费方式</td>
                        <td class="ts-content">
                            <input id="ipt_fffs" class="easyui-combobox" data-options="filter: filterCombo"  style="width: 100%; height: 25px" /> 
                        </td>
                    </tr>
                </tbody>
            </table>

            <!--提单-->
            <div id="dv_bill">
                <div class="column"><span class="current">提单信息</span></div>
                <table class="ts-table">
                    <tbody>
                        <tr>
                            <td class="ts-label">主提单号</td>
                            <td class="ts-content">
                               <input id="ipt_ztd" class="easyui-textbox" style="width: 100%;height: 25px" />
                            </td>
                             <td class="ts-label">次提单号</td>
                            <td class="ts-content">
                               <input id="ipt_cdt" class="easyui-textbox" style="width: 100%;height: 25px" />
                            </td>
                             <td class="ts-label">提单类型</td>
                            <td class="ts-content">
                                <input id="slt_tdlx" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%; height: 25px" />
                            </td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
            <!--订舱-->
            <div id="dv_booking" style="margin-bottom:10px">
                <div class="column"><span class="current">订舱信息</span></div>
                <table class="ts-table" style="margin-bottom:0px">
                    <tbody>
                         <tr>
                            <td class="ts-label">订舱代理</td>
                            <td class="ts-content">
                                <input id="slt_dcdl" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%; height: 25px" />
                            </td>
                            <td class="ts-label">船运条款</td>
                            <td class="ts-content">
                                <input id="slt_cytk" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%; height: 25px"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="dc-table" id="tr_print">
                    <tbody>
                        <tr>
                            <td class="dc-label">Shipper</td>
                            <td class="dc-content">
                                <textarea id="txta_fhr" style="width: 100%;height: 150px"></textarea></td>
                            <td class="dc-label">Consignee</td>
                            <td class="dc-content">
                                <textarea id="txta_shr" style="width: 100%;height: 150px"></textarea></td>
                            <td class="dc-label">Notify Party</td>
                            <td class="dc-content">
                                <textarea id="txta_tzr" style="width: 100%;height: 150px"></textarea></td>
                            <td class="dc-label">Descreption Of Goods</td>
                            <td class="dc-content">
                                <textarea id="txta_ms" style="width: 100%;height: 150px"></textarea></td>
                            <td class="dc-label">唛头</td>
                            <td class="dc-content">
                                <textarea id="txta_mt" style="width: 100%;height: 150px"></textarea></td>

                        </tr>
                        

                    </tbody>
                </table>
            </div>
            <!--铁路-->
            <div id="dv_railway" >
                <div class="column"><span class="current">铁路信息</span></div>
                <table class="kv-table">
                    <tbody>
                        <tr>
                            <td class="kv-label">发站</td>
                            <td class="kv-content">
                                <input id="ipt_fz" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%;height: 25px" /></td>
                            <td class="kv-label">到站</td>
                            <td class="kv-content">
                                 <input id="ipt_dz" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%;height: 25px" /></td>
                            <td class="kv-label">车次</td>
                            <td class="kv-content">
                                <input id="ipt_cc" class="easyui-textbox" style="width:100%;height: 25px" /></td>
                            <td class="kv-label">铁路代理</td>
                            <td class="kv-content">
                                <input id="slt_tldl" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%;height: 25px" /></td>
                        </tr>
                        <tr>
                            <td class="kv-label">ETD</td>
                            <td class="kv-content">
                                <input id="tl_ETD" class="easyui-datebox" style="width:100%; height: 25px" /></td>
                            <td class="kv-label">ETA</td>
                            <td class="kv-content">
                                <input id="tl_ETA" class="easyui-datebox" style="width:100%; height: 25px" /></td>
                            <td class="kv-label">ATD</td>
                            <td class="kv-content">
                                <input id="tl_ATD" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                            <td class="kv-label">ATA</td>
                            <td class="kv-content">
                                <input id="tl_ATA" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--江运-->
            <div id="dv_river">
                <div class="column"><span class="current">江运信息</span></div>
                <table class="kv-table">
                    <tbody>
                        <tr>
                            <td class="kv-label">江运船东</td>
                            <td class="kv-content">
                               <input id="ipt_jycd" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%;height: 25px" /></td>
                            <td class="kv-label">船名航次</td>
                            <td class="kv-content">
                                <input id="ipt_jycm" class="easyui-textbox" style="width: 100%;height: 25px" /></td>
                            <td class="kv-label">起运港</td>
                            <td class="kv-content">
                                <select id="ipt_jyzg" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%;height: 25px" ></select></td>
                            <td class="kv-label">卸运港</td>
                            <td class="kv-content">
                                <select id="ipt_jyxg" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%; height: 25px"></select></td>
                        </tr>
                        <tr>
                            <td class="kv-label">ETD</td>
                            <td class="kv-content">
                                <input id="jy_ETD" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                            <td class="kv-label">ETA</td>
                            <td class="kv-content">
                                <input id="jy_ETA" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                            <td class="kv-label">ATD</td>
                            <td class="kv-content">
                                <input id="jy_ATD" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                            <td class="kv-label">ATA</td>
                            <td class="kv-content">
                                <input id="jy_ATA" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--海运-->
            <div id="dv_shipping">
                <div class="column"><span class="current">海运信息</span></div>
                <table class="hy-table">
                    <tbody>
                        <tr>
                            <td class="hy-label">海运船东</td>
                            <td class="hy-content">
                               <input id="ipt_hycd" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%;height: 25px" /></td>
                            <td class="hy-label">船名航次</td>
                            <td class="hy-content">
                                 <input id="ipt_hycm" class="easyui-textbox"  style="width: 100%;height: 25px" /></td>
                            <td class="hy-label">海船卸区</td>
                            <td class="hy-content">
                               <input id="ipt_hyxq" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%;height: 25px" /></td>
                            <td class="hy-label">海运装港</td>
                            <td class="hy-content">
                                <select id="ipt_hyzg" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%;height: 25px" ></select></td>
                            <td class="hy-label">海运卸港</td>
                            <td class="hy-content">
                                <select id="ipt_hyxg" class="easyui-combobox" data-options="filter: filterCombo" style="width: 100%; height: 25px"></select></td>
                        </tr>
                        <tr>
                            <td class="hy-label">ETD</td>
                            <td class="hy-content">
                                <input id="hy_ETD" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                            <td class="hy-label">ETA</td>
                            <td class="hy-content">
                                <input id="hy_ETA" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                            <td class="hy-label">ATD</td>
                            <td class="hy-content">
                                <input id="hy_ATD" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                            <td class="hy-label">ATA</td>
                            <td class="hy-content">
                                <input id="hy_ATA" class="easyui-datebox" style="width: 100%; height: 25px" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
           




        </div>
        <div title="计划装箱" data-options="closable:false,disabled:true" style="padding: 10px">
            <div class="column">
               <span class="current">装箱信息</span>
               <input id="btn_add_bxt" type="button" class="btn_cs"  style="padding:1px 6px;line-height: 20px;height: 20px;"   value="新增箱型箱量" />
               <input id="btn_save_bxt" type="button" class="btn_cs"  style="padding:1px 6px;line-height: 20px;height: 20px;"   value="保存" />
            </div>
            <table id="tab_packing"></table>
            
            <div id="dlg_bxt" style="display:none">
               <form id="fm_bxt" style="padding:20px">
                    <div style="text-align:center;margin-bottom:10px">
                        <input id="ipt_numo" class="easyui-textbox" style="width:80px;"/>
                        <span>✖</span>
                        <select id="cbx_sizeo" class="easyui-combobox" data-options="filter: filterCombo"  style="width:100px;">
                            <option>20</option>
                            <option>40</option>
                            <option>45</option>
                        </select>
                        <select id="cbx_typeo" class="easyui-combobox" data-options="filter: filterCombo" style="width:100px;">
                           
                        </select>
                    </div>
                    <div style="text-align:center">
                        <input id="ipt_numt" class="easyui-textbox" style="width:80px;"/>
                        <span>✖</span>
                        <select id="cbx_sizet" class="easyui-combobox" data-options="filter: filterCombo" style="width:100px;">
                            <option>20</option>
                            <option selected="selected">40</option>
                            <option>45</option>
                        </select>
                        <select id="cbx_typet" class="easyui-combobox" data-options="filter: filterCombo" style="width:100px;">
                          
                        </select>
                    </div>
               </form>
            </div>

        </div>
        <div title="录入费用" data-options="closable:false,disabled:true" style="padding: 10px">
            <div id="fee_layout" class="easyui-layout" style="width: 100%; height: 100%;">
                <div data-options="region:'west',border:true" style=" width: 170px;">
                    <div class="column" style="margin-bottom:1px"><span class="current">费用统计</span> </div>
           
                    <div style="height: 32px;width:100%;padding: 5px;border-bottom: 1px solid #d8c7c7;">
                        应收:【<span id="sp_rec" style="color:#0033ff"></span>】
                    </div>
                    <div style="height: 32px;width:100%;padding: 5px;border-bottom: 1px solid #d8c7c7;">
                       税后应收:【<span id="sp_rec_tax"></span>】
                      
                    </div>
                    <div style="height: 32px;width:100%;padding: 5px;border-bottom: 1px solid #d8c7c7;">
                         应付:【<span id="sp_pay" style="color:#0033ff"></span>】
                      
                    </div>
                    <div style="height: 32px;width:100%;padding: 5px;border-bottom: 1px solid #d8c7c7;">
                      税后应付:【<span id="sp_pay_tax"></span>】
                      
                    </div>
                    <div style="height: 32px;width:100%;padding: 5px;border-bottom: 1px solid #d8c7c7;">
                        合计毛利:【<span id="sp_sum_rp"></span>】
                      
                    </div>

                    <div style="height: 32px;width:100%;padding: 5px;border-bottom: 1px solid #d8c7c7;">
                        税后毛利:【<span id="sp_sum_rp_tax"></span>】
                      
                    </div>
                    <div style="height: 32px;width:100%;padding: 5px;border-bottom: 1px solid #d8c7c7;">
                        毛利率:<span id="sp_rate"></span>%
                      
                    </div>

                </div>

                <div data-options="region:'center',border:true" >
                     <div data-options="north:'center',border:false" style="height:50%">
                         <div class="column" style="margin-bottom:0px">
                             <span class="current">应收费用</span>
                         </div>
                         <table id="tab_receivable"></table>
                     </div>

                    <div data-options="center:'center',border:false" style="height:50%">

                          <div class="column" style="margin-bottom:0px">
                             <span class="current">应付费用</span>
                         </div>
                         <table id="tab_payable"></table>

                        
                     </div>
                
                </div>
            </div>
        </div>
    </div>

    <!--模拟填写弹窗-->
    <div id="dlg_simulate_busi" class="easyui-dialog"  style="width: 600px; height: 300px"
        data-options="title:'模拟填写',toolbar:'#tb',modal:true,closed:true">
        <table id="tab_simulate_busi"></table>
    </div>
    <div id="tb">
        <span style="vertical-align: middle;">仅模拟自己的业务</span>
        <input type="checkbox" id="chk_own" checked="checked" style="width: 16px; height: 16px;vertical-align: middle;" />

        <span style="vertical-align: middle;">查询范围</span>
        <select id="sel_cxfw" data-options="panelHeight:'auto',filter: filterCombo"  style="width:105px"  class="easyui-combobox" >
            <option value="1">最近一个月</option>
            <option value="2">全部数据</option>
        </select>

        <input id="ipt_serch" class="easyui-searchbox" style="width:200px" data-options="prompt:'关键字查询'"/>
        <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_search" value="查询" />
    </div>


    <div id="dlg_simulate_fee" class="easyui-dialog" style="width: 600px; height: 300px"
        data-options="title:'模拟填写',toolbar:'#toolbar',modal:true,closed:true">
        <table id="tab_simulate_fee"></table>
    </div>
    <div id="toolbar">
        <span style="vertical-align: middle;">费用类型</span>
        <input id="ipt_fylx" data-options="panelHeight:'auto'" style="width: 105px" class="easyui-combobox"/>
            
        <input id="ipt_serch_fee" class="easyui-searchbox" style="width: 200px" data-options="prompt:'关键字查询'" />
        <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_fee_search" value="查询" />
    </div>
    <!--end-->

    <div id="dv_tab_toolbar" style="display: none;">
        <div id="dv_busi_btn" style="text-align: right; margin-right: 20px;">
          
            <a id="btn_return" href="javascript:void(0);" onclick="window.location.href='javascript:history.go(-1)'" class="btn_cs" style="display:none;height: 33px; line-height: 33px;text-decoration:none">返回</a>

            <div class="dropdown">
            <input type="button" class="dropbtn" style="height: 33px; line-height: 33px"  value="打印订舱书" />
            <div class="dropdown-content">
                <a href="javascript:void(0)" onclick="click_sea_export()">海运订舱书</a>
                <a href="javascript:void(0)">铁路订舱书</a>
                <a href="javascript:void(0)" onclick="click_sky_export()">空运订舱书</a>
            </div>
            </div>

            <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_simulate_write" value="模拟填写" />
            <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_temporary_submit" value="暂存提交" />
            <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_save_submit" value="保存提交" />
        </div>
    </div>

   
    <div id="dv_tooltip_hid" style="display:none">
     <div id="dv_tooltip" style="float: left;line-height: 33px;margin-left: 10px;display:none">
                【<span id="sp_state" style="color:red"></span>】
                业务编号：<span id="sp_busi_id"></span>
                <span>箱型箱量：【<span id="sp_bxt"></span>】</span>
        </div>
    </div>

    

</asp:Content>
