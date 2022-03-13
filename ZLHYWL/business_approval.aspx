<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="business_approval.aspx.cs" Inherits="ZLHYWL.business_approval" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .cls_span{
            color:rgb(75, 182, 244);
            font-weight:bold;
        }

        .lable_cls{
            background-color:#d9534f;
            padding: 4px;
            font-size: 12px;
            font-weight: normal;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: .25em;
            color:#fff;
        }
    </style>
    <script src="Js/busi_approval.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="easyui-tabs" id="dv_tabs" data-options="border:false,fit:true">
        <div title="业务审批" data-options="closable:false" style="padding: 5px">

            <div id="dv_toolbar" style="padding: 5px">
                <div style=" margin-bottom: 5px">
                    模糊：<input id="ipt_serch" class="easyui-searchbox" data-options="prompt:'关键字查询'"  />

                    申请人：<input id="ipt_sponsor" class="easyui-combobox"  data-options="filter: filterCombo,panelHeight: 'auto'" />

                    内外贸：<select id="ipt_trade" class="easyui-combobox" data-options="panelHeight: 'auto',filter: filterCombo" style="width:100px">
                                <option value="0">全部</option>
                                <option value="1">内贸</option>
                                <option value="2">外贸</option>
                            </select>

                    状态：<select id="ipt_spstate" class="easyui-combobox" data-options="panelHeight: 'auto',filter: filterCombo" style="width:100px">
                                <option value="-1">全部</option>
                                <option value="0" selected="selected">待审核</option>
                                <option value="1">待审核/审核中</option>
                                <option value="2">已结束</option>
                                <option value="3">已驳回</option>
                          </select>

                </div>

                <div style="text-align: left; ">
                
                    公司：<input id="ipt_company" class="easyui-combobox" data-options="filter: filterCombo,panelHeight: 'auto'"/>
                   
                    时间段：<input id="ipt_sdate" class="easyui-datebox" />
                    至
                    <input id="ipt_edate" class="easyui-datebox" />

                    <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_search" value="查询" />

                    <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_pass_busi" value="审核通过" />

                    <input type="button" class="btn_cs" style="height: 33px; line-height: 33px" id="btn_reject" value="驳回" />
                    
                </div>
            </div>


          
           <table id="tab_busi_ap" ></table>
           

        </div>
    </div>


</asp:Content>
