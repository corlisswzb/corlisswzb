var cur_co_seq = undefined;
var cur_co = undefined;
var cur_next_amc_opr_info = undefined;

var cur_od_seq = undefined;
var cur_od_no = undefined;

$(document).ready(function () {

    cur_co_seq = getQueryVariable('co_seq');
    get_order_change_collections();

});

//改单明细
function get_order_change_collections() {
    post('../Ashx/change_order.ashx', {
        rnd: Math.random(),
        action: 'get_changeorder_single_full_collections',
        co_seq: cur_co_seq
    }, function (data) {
        cur_co = data; 
        var od_base = cur_co.co_base[0];
        $('#od_record_by_company_desc').html(od_base.od_record_by_company_desc);
        $('#od_delegate_cu_desc').html(od_base.od_delegate_cu_desc);
        $('#od_fee_dat').html(dateformat(od_base.od_fee_dat, true));
        $('#od_typ_desc').html(od_base.od_typ_desc);
        $('#od_cargo_typ_desc').html(od_base.od_cargo_typ_desc);
        $('#od_no').html(od_base.od_no);
        $('#od_beg_place_desc').html(od_base.od_beg_place_desc);
        $('#od_end_place_desc').html(od_base.od_end_place_desc);
        $('#od_main_bill_no').html(od_base.od_main_bill_no);
        $('#od_freight_desc').html(od_base.od_freight_desc);
        $('#od_cntr_desc').html(od_base.od_cntr_desc);
        cur_od_seq = od_base.od_seq;
        cur_od_no = od_base.od_no;
        $('#before_co').html(
            '应收:' + od_base.co_rec_old + 
            '&nbsp;&nbsp;应付:' + od_base.co_pay_old  
        );

        $('#after_co').html(
            '应收:' + od_base.co_rec_new +
            '&nbsp;&nbsp;应付:' + od_base.co_pay_new
        );
        $('.datagrid-body').css({
            'overflow-y': 'hidden'
        }); 
        init_tab_fee_list(data.co_fee);
        refresh_approval_flow_details(); 
    }, true);
}

//改单费用
function refresh_fee_list_of_cop() {
    var parmas = {
        rnd: Math.random(),
        action: 'get_changorder_plan_fee_record',
        co_seq: cur_co_seq,
        rec_or_pay: 1,
    }
    init_tab_plan_fee_list_of_rp($("#tab_fee_list_of_rec"), parmas);
    parmas.rec_or_pay = -1;
    init_tab_plan_fee_list_of_rp($("#tab_fee_list_of_pay"), parmas);
}
function init_tab_fee_list(data) { 
    $('#tab_fee_list').datagrid({
        data:data,
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        nowrap: true,
        striped: true,
        collapsible: false,
        height: 'auto',
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
         
        columns: [[
             {
                 field: 'co_status', rowspan: 2, title: '状态', width: 60, align: 'center',
                 formatter: function (value, row, index) {
                     if (value == 0) {
                         return "";
                     } else if (value == 1) {
                         return "<div class='status_add'>新增</div>";
                     } else if (value == 2) {
                         return "<div class='status_upd'>修改</div>";
                     } else {
                         return "<div class='status_del'>删除</div>";
                     }
                 }
             }
            , {
                field: 'rec_or_pay', rowspan: 2, title: '收/付', width: 40, align: 'center',
                formatter: function (value, row, index) {
                    if (value == -1) {
                        return '应付';
                    }
                    return '应收';
                },
                styler: function (value, row, index) {
                    if (value == -1) {
                        return 'background-color:Green;color:#FFF;';
                    }
                    return 'background-color:Red;color:#FFF;';
                }
            } ,
            { title: '修改前', colspan: 10 },
            { title: '修改后', colspan: 10 },
        ], [
                {
                field: 'fee_cu_desc', title: '结算单位', width: 200, 
            }
            , {
                field: 'fee_invoice_typ_desc', title: '票率', width: 60, 
            }
            , {
                field: 'fee_item_typ_desc', title: '费项', width: 60, 
            }
            , {
                field: 'fee_number', title: '数量', width: 50,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                } 
            }
            , {
                field: 'fee_unit_desc', title: '单位', width:50 
            }
            , {
                field: 'fee_price', title: '单价', width: 70,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                } 
            }
            , {
                field: 'fee_currency_desc', title: '币种', width: 54 
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(4);
                } 
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 70,
                formatter: function (value, row, index) {
                    return  Number(value).toFixed(2);
                }
            },
            {
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 70, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (row.rec_or_pay == -1) return 'background-color:#00e556;color:#FFF;';
                    if (row.rec_or_pay == 1) return 'background-color:#b91604;color:#FFF;';
                }
            }
            , {
                field: 'new_fee_cu_desc', title: '结算单位', width: 200,
            }
            , {
                field: 'new_fee_invoice_typ_desc', title: '票率', width:60,
            }
            , {
                field: 'new_fee_item_typ_desc', title: '费项', width: 60,
            }
            , {
                field: 'new_fee_number', title: '数量', width: 50,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'new_fee_unit_desc', title: '单位', width: 50
            }
            , {
                field: 'new_fee_price', title: '单价', width: 70,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'new_fee_currency_desc', title: '币种', width: 54
            }
            , {
                field: 'new_fee_currency_rate', title: '汇率', width: 54,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(4);
                }
            }
            , {
                field: 'new_fee_amount', title: '小计金额', width: 70,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            },
            {
                field: 'new_fee_amount_of_base_currency', title: '本币小计', width: 70, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (row.rec_or_pay == -1) return 'background-color:#00e556;color:#FFF;';
                    if (row.rec_or_pay == 1) return 'background-color:#b91604;color:#FFF;';
                }
            }
        ]],
        onDblClickRow: function (index, row) {
             
            parent.call_win_view_of_short_order_info(cur_od_seq, cur_od_no);
        }
    });
}

//同意下一步
function givenext_amc() {
    var co_base = cur_co.co_base[0];

    if (co_base.ca_amc_status != 1 || (
        co_base.ca_amc_status == 1 &&
        co_base.is_my_point != 1
        )) {
        $.messager.alert('错误', '当前不是你的审核，无法提交', 'error');
    } else {
        var amc_id = co_base.ca_amc_id;
        var amc_next_opr_id = '';
        var amc_next_step = '';
        var ap_context = $('#ed_ap_context').val();
        var msg = '';

        if (cur_next_amc_opr_info.length > 0) {
            //必须选择 
            var guid = $('#ed_ap_next_amc_opr_info').combobox('getValue');

            if (guid == undefined || guid.length == 0) {
                $.messager.alert('错误', '请选择下一个处理人', 'error');
                return;
            }
            var has = false;
            $.each(cur_next_amc_opr_info, function (i, item) {
                if (item.aps_guid == guid) {
                    has = true;
                    amc_next_opr_id = item.u_id;
                    amc_next_step = item.aps_order_by_id;
                }
            });
            msg = '确认同意当前订单的业务审核并提交下一步吗？'
        } else {
            msg = '确认同意当前订单的业务审核并标记完结吗？';
        }

        $.messager.confirm('审核同意提示', msg,
        function (r) {
            if (r) { 

                    post('../Ashx/approval_mgr.ashx', {
                        rnd: Math.random(),
                        action: 'givenext_amc',
                        amc_id: amc_id,
                        amc_next_opr_id: amc_next_opr_id,
                        amc_next_step: amc_next_step,
                        ap_context: ap_context,
                    }, function (data) {
                        if (data.result == 1) {
                            get_order_change_collections();
                            $.messager.alert('提示', data.msg, 'info');

                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        }
                    }, true);
                }
            } 
        );
    }

}
//回退到发起人
function giveback_to_create_amc() {
    var ap_context = $.trim($('#ed_ap_context').val());

    if (ap_context.length == 0) {
        $.messager.alert('错误', '退回审核，必须要提交理由', 'error');
        return;
    }
    var co_base = cur_co.co_base[0];
    if (co_base.ca_amc_status != 1 || (
        co_base.ca_amc_status == 1 &&
        co_base.is_my_point != 1
        )) {
        $.messager.alert('错误', '当前不是你的审核，无法提交', 'error');
    } else {
        $.messager.confirm('退回到发起人提示', '确认要将此单退回给发起人吗',
         function (r) {
             if (r) {
                 post('../Ashx/approval_mgr.ashx', {
                     rnd: Math.random(),
                     action: 'giveback_to_create_amc',
                     ap_context: ap_context,
                     amc_id: co_base.ca_amc_id,
                 }, function (data) {
                     if (data.result == 1) {
                         //重新获取
                         get_order_change_collections();
                         $.messager.alert('提示', data.msg, 'info');
                     } else {
                         $.messager.alert('错误', data.msg, 'error');
                     }
                 }, true);
             }
         });
    }
}

//审核流水
function refresh_approval_flow_details() {
    var co_base = cur_co.co_base[0];
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_amc_actual_flow_details',
        amc_id: co_base.ca_amc_id,
        is_my_point: co_base.is_my_point,

    }, function (data) {

        if (co_base.ca_amc_status != 1 || (
            co_base.ca_amc_status == 1 &&
            co_base.is_my_point != 1
            )) {
            $('#my_approval_adivce').panel('close');
        } else {
            cur_next_amc_opr_info = data.next_amc_opr_info;
            if (cur_next_amc_opr_info.length == 1) {
                bind_combobox(data.next_amc_opr_info, $('#ed_ap_next_amc_opr_info'), 'show_desc', 'aps_guid', false);
                $('#ed_ap_next_amc_opr_info').combobox('setValue', cur_next_amc_opr_info[0].aps_guid);
            } else {
                $('.cls_next_opr').html('');
            }
        }
        $('#ap_flow_details tbody').html('');
        if (data.amc_actual_flow_details.length > 0) {
            $.each(data.amc_actual_flow_details, function (i, item) {
                $('#ap_flow_details tbody').append('<tr><td class="ap_flow_details_tim">' + dateformat(item.ap_opr_dat, true) + '</td>'
                    + '<td class="ap_flow_details_desc">' + item.aps_desc + '</td>'
                    + '<td  class="ap_flow_details_nam">' + item.ap_opr_nam + '</td>'
                    + '<td  class="ap_flow_details_advice">' + item.ap_advice + '</td>'
                    + '</tr>'
                    + '<tr>'
                    + '<td class="ap_flow_details_advice_left">意见:</td>'
                    + '<td colspan="3" class="ap_flow_details_context_right">' + item.ap_context + '</td>'
                    + '</tr>');
            });
        }

    }, false);
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


 
