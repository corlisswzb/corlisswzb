<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="fee_application.aspx.cs" Inherits="ZLHYWL.fee_application" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .ul_cls{
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        .li_cls{
            padding:2px 5px;
        }

        .li_dv_cls:hover
        { 
           border:1px solid #95B8E7;
           border-collapse:initial;
           cursor:pointer;
        }

    </style>
    <script src="Js/fee_application.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="easyui-tabs" id="dv_tabs" data-options="border:false,fit:true">
        <div title="收款申请" data-options="closable:false" style="padding: 5px">

            <div class="easyui-layout" data-options="fit:true" style="padding: 0px; margin: 0px;">

                <div data-options="region:'west',border:true,title:'',split:true" style="height: 100%; width: 250px;">

                    <div class="easyui-accordion accordion easyui-fluid" data-options="fit:true,border:0" style="width: 177px; height: 405px;">
                        <div class="panel" style="width: 177px;">
                            <div class="panel-header accordion-header" style="height: 16px;">
                                <div class="panel-title">待办列表</div>
                                <div class="panel-tool"></div>
                            </div>
                            <div id="dv_todo_sklist" data-options="title:''" style="height:100%" title="" class="panel-body accordion-body">
                               <%--<table id="tab_todo_sklist"></table>--%>
                            </div>
                        </div>
                        <div class="panel" style="width: 177px;">
                            <div class="panel-header accordion-header" style="height: 16px;">
                                <div class="panel-title">退回记录</div>
                                <div class="panel-tool"></div>
                            </div>
                            <div data-options="title:''" title="" class="panel-body accordion-body"  style="height:100%">
                                <table id="tab_return_sklist"></table>
                            </div>
                        </div>
                        
                    </div>

                </div>

                <div data-options="region:'center',border:true,title:''" style="height: 100%;">
                     <div class="panel-header" style="width: 300px;">
                        <div class="panel-title">
                            <div style="float: left">费用申请</div>
                            <div style="float: right">
                                <input type="button" class="btn_cs" style="height: 26px;line-height: 28px;padding: 0px 5px;" id="btn_apply" value="申请费用" />
                                <input type="button" class="btn_cs" style="height: 26px;line-height: 28px;padding: 0px 5px;" id="btn_confir" value="客户确认单" />
                                <input type="button" class="btn_cs" style="height: 26px;line-height: 28px;padding: 0px 5px; " id="btn_export" value="导出Excel" />

                            </div>
                            <div style="clear: both"></div>
                        </div>
                    </div>

                    <table id="tab_skfee_apply"></table>
                </div>

            </div>

        </div>

         <div title="付款申请" data-options="closable:false" style="padding: 5px">
        </div>
    </div>
</asp:Content>
