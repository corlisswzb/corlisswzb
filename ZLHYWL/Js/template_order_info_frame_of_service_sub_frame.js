var cur_od_seq = undefined;
var cur_od_service_seq = undefined;
var cur_od_service_sub_seq = undefined; 

var cur_ref_month_exchange_list = undefined; 

$(document).ready(function () {
    od_service_list = JSON.parse(sessionStorage.getItem('od_service_list'));
    cur_od_seq = getQueryVariable('od_seq');
    cur_od_service_seq = getQueryVariable('od_service_seq');
    cur_od_service_sub_seq = getQueryVariable('od_service_sub_seq');
    $('#dlg_od_ref_month_exchange_rate').dialog({
        title: '查看费率',
        iconCls: 'icon-query',
        autoOpen: false,
        modal: true,
        width: 600,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_ref_month_exchange_rate').dialog('close');
                }
            }]
    }).dialog('close');
    init_tab_od_service_sub_fee_group();

    init_tab_od_service_sub_fee(); 
    
    load_tab_dlg_exchange_month_rate();


    $.each(od_service_list, function (i, service_item) {

        if (cur_od_service_seq == service_item.od_service_seq) {

            $.each(service_item.sub_list, function (j, sub_service_item) {
                if (cur_od_service_sub_seq == sub_service_item.od_service_sub_seq) {
                    //找到了 sub 
                    $('#od_service_sub_weight').val(sub_service_item.od_service_sub_weight == undefined ? 0 : sub_service_item.od_service_sub_weight.toFixed(2));
                    $('#od_service_sub_number').val(sub_service_item.od_service_sub_number == undefined ? 0 : sub_service_item.od_service_sub_number.toFixed(2));
                    $('#od_service_sub_bluk').val(sub_service_item.od_service_sub_bluk == undefined ? 0 : sub_service_item.od_service_sub_bluk.toFixed(2));
                    $('#od_service_sub_bak').val(sub_service_item.od_service_sub_bak);
                    //开始显示 运程
                    var route_list = sub_service_item.route_list;

                    if (route_list != undefined && route_list.length > 0) {
                        $.each(route_list, function (r, route) { 
                            create_service_route_part(route.od_route_seq,
                            route.od_route_typ,
                            route.od_route_tools_desc,
                            route.od_route_tools_no,
                            route.od_route_tools_owner,
                            route.od_route_tools_owner_desc == undefined ? '' : route.od_route_tools_owner_desc,
                            route.od_route_from_id,
                            route.od_route_from_desc == undefined ? '' : route.od_route_from_desc,
                            route.od_route_to_id,
                            route.od_route_to_desc == undefined ? '' : route.od_route_to_desc,
                            route.od_route_etd,
                            route.od_route_eta,
                            route.od_route_atd,
                            route.od_route_ata,
                            route.od_route_lines_id,
                            route.od_route_lines_desc == undefined ? '' : route.od_route_lines_desc,
                            route.od_route_desc,
                            route.od_route_freight_id,
                            route.od_route_freight_desc == undefined ? '' : route.od_route_freight_desc,
                            route.od_route_bak == undefined ? '' : route.od_route_bak,
                            route.od_route_take_cargo_info == undefined ? '' : route.od_route_take_cargo_info,
                            route.od_route_delivery_cargo_info == undefined ? '' : route.od_route_delivery_cargo_info,
                            route.od_route_union_e_f == undefined ? '' : route.od_route_union_e_f,
                            route.od_route_vsl == undefined ? '' : route.od_route_vsl,
                            route.od_route_vvd == undefined ? '' : route.od_route_vvd);
                        });
                    }

                    //箱 暂时未做  
                    //显示费用 
                    $("#tab_od_service_sub_fee").datagrid('loadData', { total: sub_service_item.fee_list.length, rows: sub_service_item.fee_list });
                     
                }
            }); 
        }
    });

   
    post('../Ashx/exchange_rate.ashx', {
        rnd: Math.random(),
        action: 'get_month_exchange_rate_by_od_seq',
        od_seq: cur_od_seq
    }, function (data) {
        $("#tab_dlg_exchange_month_rate").datagrid('loadData', data);
        cur_ref_month_exchange_list = data.rows;
    }, true); 
    
    
});

 
function create_service_route_part(od_route_seq,
        od_route_typ,
        od_route_tools_desc,
        od_route_tools_no,
        od_route_tools_owner,
        od_route_tools_owner_desc,
        od_route_from_id,
        od_route_from_desc,
        od_route_to_id,
        od_route_to_desc,
        od_route_etd,
        od_route_eta,
        od_route_atd,
        od_route_ata,
        od_route_lines_id,
        od_route_lines_desc,
        od_route_desc,
        od_route_freight_id,
        od_route_freight_desc, 
        od_route_bak,
        od_route_take_cargo_info,
        od_route_delivery_cargo_info,
        od_route_union_e_f,
        od_route_vsl,
        od_route_vvd) {

    od_route_union_e_f = od_route_union_e_f == undefined ? '' : od_route_union_e_f;
    od_route_delivery_cargo_info = od_route_delivery_cargo_info == undefined ? '' : od_route_delivery_cargo_info;
    od_route_take_cargo_info = od_route_take_cargo_info == undefined ? '' : od_route_take_cargo_info;
    od_route_bak = od_route_bak == undefined ? '' : od_route_bak;
    od_route_union_e_f = od_route_union_e_f == undefined ? '' : od_route_union_e_f;


    var tools_desc_title = undefined;
    var tools_no_title = undefined;
    var tools_owner_title = undefined;

    if (od_route_typ == 1) {
        tools_desc_title = '拖车名';
        tools_no_title = '拖车号';
        tools_owner_title = '拖车公司:';
    }
    if (od_route_typ == 2) {
        tools_desc_title = '火车名';
        tools_no_title = '火车号';
        tools_owner_title = '火车公司:';
    }
    if (od_route_typ == 3) {
        tools_desc_title = '船名';
        tools_no_title = '航次';
        tools_owner_title = '船东:';
    }
    if (od_route_typ == 4) {
        tools_desc_title = '航机名';
        tools_no_title = '航机号';
        tools_owner_title = '航空公司:';
    }
    if (od_route_typ == 2) {
         
        var $item = $('<div class="service_route_part" data-od_route_typ="' + od_route_typ + '" data-od_route_desc="' + od_route_desc + '" data-od_route_seq="' + od_route_seq + '">' +
            '<div class="top">' +
                '<div class="title">' +
                    od_route_desc +
                '</div>' +
            '</div>' +
            '<div class="middle">' +
                '<table class="tab_std" style="width:640px;">' +
                    '<col style="width:56px;" />' +
                    '<col style="width:78px;" />' +
                    '<col style="width:56px;" />' +
                    '<col style="width:86px;" />' +
                    '<col style="width:56px;" />' +
                    '<col style="width:146px;" />' +
                    '<col style="width:46px;" />' +
                    '<col style="width:102px;" />' +
                    '<tr>' +
                        '<td class="title">' + tools_owner_title + '</td>' +
                        '<td class="value" colspan="3">' +
                            '<input readonly="true" class="easyui-textbox od_route_tools_owner" value="' + od_route_tools_owner_desc + '" style="width:218px;" />' +
                        '</td>' +
                        '<td class="title" >起运站:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  class="easyui-textbox od_route_from_id" value="' + od_route_from_desc + '" style="width:138px;" />' +

                        '</td>' +
                        '<td class="title">' + tools_desc_title + ':</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_tools_desc" value="' + od_route_tools_desc + '" style="width:100px;" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="title">ETD:</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_etd"  value="' + dateformat(od_route_etd, true) + '" style="width:70px;"/>' +
                        '</td>' +
                        '<td class="title">前船名:</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_vsl" value="' + od_route_vsl + '" style="width:80px;" />' +
                        '</td>' +
                        '<td class="title">目的站:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  class="easyui-textbox od_route_to_id" value="' + od_route_to_desc + '" style="width:138px;" />' +

                        '</td>' +
                        '<td class="title">' + tools_no_title + ':</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_tools_no" value="' + od_route_tools_no + '" style="width:100px;" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="title">ETA:</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_eta" value="' + dateformat(od_route_eta, true) + '"  style="width:70px;"/>' +
                        '</td>' +
                        '<td class="title">前航次:</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_vvd" value="' + od_route_vvd + '" style="width:80px;" />' +
                        '</td>' +
                        '<td class="title">空重联运:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  type="text" class="easyui-textbox od_route_union_e_f"  value="' + (od_route_union_e_f == 1?'是':'否') + '"  style="width:138px;"/>' +
                        '</td>' +
                        '<td class="title">条款:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  type="text" class="easyui-textbox od_route_freight_id"  value="' + od_route_freight_desc + '"  style="width:100px;"/>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="title">收货信息:</td>' +
                        '<td class="value" colspan="7">' +
                           '<textarea readonly="true"  class="easyui-textarea od_route_delivery_cargo_info"   style="overflow-x:hidden; overflow-y:auto;resize:none; width:580px;height:44px;" > '+od_route_delivery_cargo_info+'  </textarea>' +
                        '</td>' +
                   '</tr>' +
                '</table>' +
            '</div>' +
        '</div>');
    }

    if (od_route_typ == 1) { 
        var $item = $('<div class="service_route_part" data-od_route_typ="' + od_route_typ + '" data-od_route_desc="' + od_route_desc + '" data-od_route_seq="' + od_route_seq + '">' +
            '<div class="top">' +
                '<div class="title">' +
                    od_route_desc +
                '</div>' +
            '</div>' +
            '<div class="middle">' +
                '<table class="tab_std" style="width:640px;">' +
                    '<col style="width:56px;" />' +
                    '<col style="width:78px;" />' +
                    '<col style="width:56px;" />' +
                    '<col style="width:86px;" />' +
                    '<col style="width:56px;" />' +
                    '<col style="width:146px;" />' +
                    '<col style="width:46px;" />' +
                    '<col style="width:102px;" />' +
                    '<tr>' +
                        '<td class="title">' + tools_owner_title + '</td>' +
                        '<td class="value" colspan="3">' +
                            '<input readonly="true" class="easyui-textbox od_route_tools_owner" value="' + od_route_tools_owner_desc + '" style="width:218px;" />' +
                        '</td>' +
                        '<td class="title">条款:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  type="text" class="easyui-textbox od_route_freight_id"  value="' + od_route_freight_desc + '"  style="width:80px;"/>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="title">提货信息:</td>' +
                        '<td class="value" colspan="7">' +
                           '<textarea readonly="true"  class="easyui-textarea od_route_take_cargo_info"    style="overflow-x:hidden; overflow-y:auto;resize:none; width:580px;height:44px;" >' + od_route_take_cargo_info + '</textarea>' +
                        '</td>' +
                   '</tr>' +
                   '<tr>' +
                        '<td class="title">收货信息:</td>' +
                        '<td class="value" colspan="7">' +
                           '<textarea readonly="true"  class="easyui-textarea od_route_delivery_cargo_info"  style="overflow-x:hidden; overflow-y:auto;resize:none; width:580px;height:44px;" >' + od_route_delivery_cargo_info + '</textarea>' +
                        '</td>' +
                   '</tr>' +
                    '<tr>' +
                        '<td class="title">备注:</td>' +
                        '<td class="value" colspan="7">' +
                           '<textarea readonly="true"  class="easyui-textarea od_route_bak"   "  style="overflow-x:hidden; overflow-y:auto;resize:none; width:580px;height:44px;" >' + od_route_bak + '</textarea>' +
                        '</td>' +
                   '</tr>' +
                    
                '</table>' +
            '</div>' +
        '</div>');
    }
    //1、4 用下面的内容 

    if (od_route_typ == 3 || od_route_typ == 4) {
        var $item = $('<div class="service_route_part" data-od_route_typ="' + od_route_typ + '" data-od_route_desc="' + od_route_desc + '" data-od_route_seq="' + od_route_seq + '">' +
            '<div class="top">' +
                '<div class="title">' +
                    od_route_desc +
                '</div>' +
            '</div>' +
            '<div class="middle">' +
                '<table class="tab_std" style="width:640px;">' +
                    '<col style="width:56px;" />' +
                    '<col style="width:78px;" />' +
                    '<col style="width:36px;" />' +
                    '<col style="width:78px;" />' +
                    '<col style="width:56px;" />' +
                    '<col style="width:166px;" />' +
                    '<col style="width:46px;" />' +
                    '<col style="width:102px;" />' +
                    '<tr>' +
                        '<td class="title">' + tools_owner_title + '</td>' +
                        '<td class="value" colspan="3">' +
                            '<input readonly="true" class="easyui-textbox od_route_tools_owner" value="' + od_route_tools_owner_desc + '" style="width:188px;" />' +
                        '</td>' +
                        '<td class="title" >起运地:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  class="easyui-textbox od_route_from_id" value="' + od_route_from_desc + '" style="width:158px;" />' +

                        '</td>' +
                        '<td class="title">' + tools_desc_title + ':</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_tools_desc" value="' + od_route_tools_desc + '" style="width:100px;" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="title">ETD:</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_etd"  value="' + dateformat(od_route_etd, true) + '" style="width:70px;"/>' +
                        '</td>' +
                        '<td class="title"  >ATD:</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_atd" value="' + dateformat(od_route_atd, true) + '"  style="width:70px;"/>' +
                        '</td>' +
                        '<td class="title">目的地:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  class="easyui-textbox od_route_to_id" value="' + od_route_to_desc + '" style="width:158px;" />' +

                        '</td>' +
                        '<td class="title">' + tools_no_title + ':</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_tools_no" value="' + od_route_tools_no + '" style="width:100px;" />' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td class="title">ETA:</td>' +
                        '<td class="value">' +
                            '<input readonly="true" type="text" class="easyui-textbox od_route_eta" value="' + dateformat(od_route_eta, true) + '"  style="width:70px;"/>' +
                        '</td>' +
                        '<td class="title"  >ATA:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  type="text" class="easyui-textbox od_route_ata" value="' + dateformat(od_route_ata, true) + '"  style="width:70px;"/>' +
                        '</td>' +
                        '<td class="title">线路:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  type="text" class="easyui-textbox od_route_lines_id"  value="' + od_route_lines_desc + '"  style="width:158px;"/>' +
                        '</td>' +
                        '<td class="title">条款:</td>' +
                        '<td class="value">' +
                            '<input readonly="true"  type="text" class="easyui-textbox od_route_freight_id"  value="' + od_route_freight_desc + '"  style="width:100px;"/>' +
                        '</td>' +
                    '</tr>' +
                '</table>' +
            '</div>' +
        '</div>');
    }

    

    //需要初始化 select 
    //先增加 
    $('#service_route_list').append($item);
   

}
 
 
//初始化费率汇总表
function init_tab_od_service_sub_fee_group() {
    $("#tab_od_service_sub_fee_group").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_od_service_sub_fee_group_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        // frozenColumns: [[{ title: '', field: '_ck', width: 40, checkbox: true }, ]],
        columns: [[//显示的列
            {
                field: 'cr_desc', title: '币种', width: 50,
            }
             , {
                 field: 'fee_amount', title: '小计', sortable: true, width: 70,
                 formatter: function (value, row, index) {
                     if (row.cr_id == undefined) return ''
                     else return Number(value).toFixed(2);
                 }
             } 
             , {
                 field: 'cr_fee_std_group_finaced', title: '已销', width: 70,
                 formatter: function (value, row, index) {
                     return Number(value).toFixed(2);
                 }
             }
            , {
                field: 'cr_fee_std_group_unfinaced', title: '未销', width: 70,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'cr_rate', title: '汇率', sortable: true, width: 54,
                formatter: function (value, row, index) {
                    if (row.cr_id == undefined) return ''
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'cr_fee_std_group', title: '本币小计', width: 70,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
        ]],
        onLoadSuccess: function (data) {
            $('#tab_od_service_sub_fee_group').datagrid('reloadFooter', [
                {
                    cr_desc: '本币:', 
                    cr_fee_std_group: table_compute('tab_od_service_sub_fee_group', 'cr_fee_std_group'),
                    cr_fee_std_group_finaced: table_compute('tab_od_service_sub_fee_group', 'cr_fee_std_group_finaced'),
                    cr_fee_std_group_unfinaced: table_compute('tab_od_service_sub_fee_group', 'cr_fee_std_group_unfinaced'),
                }
            ]);
        },
    });
}

//初始化 费用表
function init_tab_od_service_sub_fee() {
    $("#tab_od_service_sub_fee").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_od_service_sub_fee_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true } 
            , {
                field: 'fee_status_desc', title: '状态', sortable: true, width: 70,
                styler: function (value, row, index) {
                    if (row.fee_change_lock_flag == 1) {
                        return 'background-color:#ea60ff;color:#FFF;';
                    } else {
                        switch (row.fee_status) {
                            case 1: return 'background-color:#fff;color:#000;'; 
                            case 3: return 'background-color:#7af7f6;color:#000;';
                            case 4: return 'background-color:#09c41f;color:#fff;';
                            case 5: return 'background-color:#f3e676;color:#000;';
                            case 9: return 'background-color:#ef1956;color:#fff;';
                        }
                    }
                }
            }
        ]],
        columns: [[//显示的列
            {
                field: 'fee_cu_id', title: '结算单位', width: 220, sortable: true,
                formatter: function (value, row, index) {
                    return row.fee_cu_desc;
                } 
            }
            , {
                field: 'fee_invoice_typ', title: '票率', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                }
            }
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_item_typ_desc;
                } 
            } 
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                } 
            }
            , {
                field: 'fee_unit', title: '单位', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_unit_desc;
                } 
            }
            , {
                field: 'fee_price', title: '金额', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                } 
            }
            , {
                field: 'fee_currency_id', title: '币种', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_currency_desc;
                } 
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'woa_total_amount', title: '已付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_rel_bill_no', title: '关联提空号', width: 170, sortable: true,
            }
            , {
                field: 'fee_rel_opr_cod', title: '关联箱属', width: 70, sortable: true,
            }
            , {
                field: 'fee_bak', title: '备注', width: 260, sortable: true,
            }
            , {
                field: 'od_invoice_no', title: '发票号', width: 260, sortable: true,
            }
            , {
                field: 'fee_record_nam', title: '记录人', width: 60, sortable: true,
            }
            , {
                field: 'fee_record_dat', title: '记录时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_checkaccount_lock_nam', title: '对账人', width: 60, sortable: true,
            }
            , {
                field: 'fee_checkaccount_lock_dat', title: '对账时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            } 
            //, {
            //    field: 'fee_invoice_lock_nam', title: '开票人', width: 60, sortable: true,
            //}
            , {
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , { field: 'ca_title', title: '所属账单', width: 148, sortable: true, }
            , {
                field: 'ca_amc_finish_dat', title: '通审时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            //, {
            //    field: 'fee_finace_lock_nam', title: '销账', width: 60, sortable: true,
            //}
            , {
                field: 'fee_finace_lock_dat', title: '销账时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                 field: 'fee_limit_dat', title: '付款账期', width: 80, sortable: true,
                 formatter: function (value, row, index) {
                     return dateformat(value, true);
                 },
                 styler: function (value, row, index) {
                     if (row.fee_limit_status == 1)
                         return 'background-color:#fce08b;color:#000;';
                     if (row.fee_limit_status == 2)
                         return 'background-color:#ec7a3c;color:#FFF;';
                 }
             }
        ]], 
        onLoadSuccess: function (data) {
            refresh_fee_group_tab();
        },
    });
}

//表格初始化
function load_tab_dlg_exchange_month_rate() {

    $("#tab_dlg_exchange_month_rate").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        //toolbar: '#tab_exchange_month_rate_bar',
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            {
                field: 'er_year', width: 100, title: '年-月', align: 'left',
                formatter: function (value, row, index) {
                    return row.er_year + '年-' + (Number(row.er_month) < 10 ? ('0' + row.er_month) : row.er_month) + '月';
                }
            },
            { field: 'er_cr_name', width: 70, title: '币种', align: 'left' },
          
            { field: 'er_cr_rate', width: 90, title: '汇率', align: 'left', },
            { field: 'er_record_by_nam', width: 100, title: '记录人', align: 'left', },
            {
                field: 'er_record_dat', width: 100, title: '记录时间', align: 'left',
                formatter: function (value, row, index) {
                    if (value == undefined) {
                        return '';
                    } else {
                        return dateformat(value, true);
                    }

                }
            },
        ]],
        
    });
}
 

//重新计算汇总费率
function refresh_fee_group_tab() {
    var rows = $('#tab_od_service_sub_fee').datagrid('getRows');
    //币种 金额累计 换算汇率 

    var arr = [];

    $.each(rows, function (i, row) { 
        if (row.fee_currency_desc.length > 0) {
            if (arr.length == 0) {
                arr.push({
                    cr_id: row.fee_currency_id,
                    cr_desc: row.fee_currency_desc,
                    cr_rate: row.fee_currency_rate,
                    fee_amount: Number(row.fee_amount),
                    cr_fee_std_group: Number(row.fee_amount_of_base_currency),
                    cr_fee_std_group_finaced: Number(row.woa_total_amount_base_currency),
                    cr_fee_std_group_unfinaced: Number(row.unwoa_total_amount_base_currency),
                    woa_total_amount: Number(row.woa_total_amount),
                    unwoa_total_amount: Number(row.unwoa_total_amount)
                });
            } else {
                var has = false;
                $.each(arr, function (j, arow) {
                    if (arow.cr_id == row.fee_currency_id) {
                        has = true;
                        arow.fee_amount += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number);
                        arow.cr_fee_std_group += Number(row.fee_amount_of_base_currency);
                        arow.cr_fee_std_group_unfinaced += Number(row.unwoa_total_amount_base_currency);
                        arow.cr_fee_std_group_finaced += Number(row.woa_total_amount_base_currency);
                        arow.woa_total_amount += Number(row.woa_total_amount);
                        arow.unwoa_total_amount += Number(row.unwoa_total_amount);
                    }
                });
                if (!has) {
                    arr.push({
                        cr_id: row.fee_currency_id,
                        cr_desc: row.fee_currency_desc,
                        cr_rate: row.fee_currency_rate,
                        fee_amount: Number(row.fee_amount),
                        cr_fee_std_group: Number(row.fee_amount_of_base_currency),
                        cr_fee_std_group_finaced: Number(row.woa_total_amount_base_currency),
                        cr_fee_std_group_unfinaced: Number(row.unwoa_total_amount_base_currency),
                        woa_total_amount: Number(row.woa_total_amount),
                        unwoa_total_amount: Number(row.unwoa_total_amount)
                    });
                }
            }
        } 
    });

    $("#tab_od_service_sub_fee_group").datagrid('loadData', {total:arr.length,rows:arr});
}


//查看费率
function view_ref_month_exchange_rate() {

    
    $('#dlg_od_ref_month_exchange_rate').dialog({
        title: '查看费率',
        iconCls: 'icon-2012092109942',
        autoOpen: false,
        modal: true,
        width: 466,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_ref_month_exchange_rate').dialog('close');
                }
            }]
    }).dialog('open');
     
    
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
 