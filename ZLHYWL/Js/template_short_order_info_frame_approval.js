var cur_od_seq = undefined;
var cur_order = undefined;
var cur_next_amc_opr_info = undefined;
$(document).ready(function () {
    
    cur_od_seq = getQueryVariable('od_seq');
    get_order_details_collections();
});


//获取资料 
function get_order_details_collections() {
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'get_order_single_full_collections',
        od_seq: cur_od_seq
    }, function (data) {
        cur_order = data;

        var od_base = data.order_base_info_and_cargo_info[0];
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
        $('#lose_explain').html(od_base.od_profit_and_loss_bak);
        $('#sum_rmb_profit_2').html(od_base.profit_total_amount_desc + '&nbsp;&nbsp;折算人民币:' + od_base.profit_total_amount_of_base);
        $('#gross_profit').html((100 * (od_base.profit_total_amount_of_base / od_base.rec_total_amount_of_base)).toFixed(2) + '%');

        load_order_rec_fee(data.order_rec_fee_list);

        load_order_pay_fee(data.order_pay_fee_list);
        refresh_approval_flow_details();
        $('.datagrid-body').css({
            'overflow-y':'hidden'
        });
         
      
    },true);
}
//应收
function load_order_rec_fee(order_rec_fee_list) {
    $("#tab_order_fee_rec").datagrid({
        data: order_rec_fee_list,
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        height:'auto',
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        showFooter: true,
       
        columns: [[
            {
                field: 'fee_cu_id', title: '结算单位', width: 210,
                formatter: function (value, row, index) {
                    return row.fee_cu_desc;
                },
            }

            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_item_typ_desc;
                },
            }
            , {
                field: 'fee_currency_id', title: '币种', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_currency_desc;
                },
            }
            , {
                field: 'fee_price', title: '单价', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                },
            }
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                },
            }
            , {
                field: 'fee_unit', title: '计费单位', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_unit_desc;
                },
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '金额', width: 80,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_invoice_typ_desc', title: '票率', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                },
            }
            , {
                field: 'woa_total_amount', title: '已收', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'od_invoice_no', title: '发票号', width: 260, sortable: true,
            }
        ]],
        onLoadSuccess: function (data) {

            //汇总信息 数量，小计，已收 

            var data_group = {
                fee_number: 0,
                fee_amount: '',
                woa_total_amount: ''

            };
            //币种和金额 

            var data_cr_symbol_of_fee_amount = [];
            var data_cr_symbol_of_woa_total_amount = [];

            $.each(data.rows, function (i, item) {
                var has_cr_fa = false;

                $.each(data_cr_symbol_of_fee_amount, function (fai, faitem) {
                    if (faitem.fee_currency_symbol == item.fee_currency_symbol) {
                        faitem.amount += parseFloat(item.fee_amount);
                        has_cr_fa = true;
                    }
                });
                if (!has_cr_fa) {
                    data_cr_symbol_of_fee_amount.push({
                        fee_currency_symbol: item.fee_currency_symbol,
                        amount: parseFloat(item.fee_amount)
                    });
                }
                var has_cr_wta = false;

                $.each(data_cr_symbol_of_woa_total_amount, function (wtai, wtaitem) {
                    if (wtaitem.fee_currency_symbol == item.fee_currency_symbol) {
                        wtaitem.amount += parseFloat(item.woa_total_amount);
                        has_cr_wta = true;
                    }
                });
                if (!has_cr_wta) {
                    data_cr_symbol_of_woa_total_amount.push({
                        fee_currency_symbol: item.fee_currency_symbol,
                        amount: parseFloat(item.woa_total_amount)
                    });
                }

                data_group.fee_number += parseFloat(item.fee_number);
            });
            var str_cr_symbol_of_fee_amount = '';

            $.each(data_cr_symbol_of_fee_amount, function (i, item) {
                if (str_cr_symbol_of_fee_amount.length == 0) {
                    str_cr_symbol_of_fee_amount = item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                } else {
                    str_cr_symbol_of_fee_amount += ',' + item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                }
            });

            var str_cr_symbol_of_woa_total_amount = '';
            $.each(data_cr_symbol_of_woa_total_amount, function (i, item) {
                if (str_cr_symbol_of_woa_total_amount.length == 0) {
                    str_cr_symbol_of_woa_total_amount = item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                } else {
                    str_cr_symbol_of_woa_total_amount += ',' + item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                }
            });
            data_group.fee_amount = str_cr_symbol_of_fee_amount
            data_group.woa_total_amount = str_cr_symbol_of_woa_total_amount;



            $('#tab_order_fee_rec').datagrid('reloadFooter', [{
                fee_number: data_group.fee_number.toFixed(2),
                fee_amount: data_group.fee_amount,
                woa_total_amount: data_group.woa_total_amount
            }]);

            $('#rec_total_amount').html(data_group.fee_amount);
            $('#rec_woa_total_amount').html(data_group.woa_total_amount);
        } 
    });
}
 
//应付
function load_order_pay_fee(order_pay_fee_list) {
    $("#tab_order_fee_pay").datagrid({
        data: order_pay_fee_list,
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar:'#tab_order_fee_pay_bar',
        height:'auto',
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        showFooter: true,
        columns: [[
            {
                field: 'fee_cu_id', title: '结算单位', width: 210,
                formatter: function (value, row, index) {
                    return row.fee_cu_desc;
                }, 
            }
            
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_item_typ_desc;
                }, 
            } 
            , {
                field: 'fee_currency_id', title: '币种', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_currency_desc;
                }, 
            }
            , {
                field: 'fee_price', title: '单价', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                },
            }
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                },
            }
            , {
                field: 'fee_unit', title: '计费单位', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_unit_desc;
                },
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '金额', width: 80,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return value.toFixed(2);
                }
            }
            , {
                field: 'fee_invoice_typ_desc', title: '票率', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                },
            }
            , {
                field: 'woa_total_amount', title: '已付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            } 
            , {
                field: 'od_invoice_no', title: '发票号', width: 260, sortable: true,
            }
             
           
           
             
        ]],
        onLoadSuccess: function (data) { 
            
        } 
    });
}
//同意下一步
function givenext_amc() {
    var od_base = cur_order.order_base_info_and_cargo_info[0];

    if (od_base.amc_status != 1 || (
        od_base.amc_status == 1 &&
        od_base.is_my_point != 1
        )) {
        $.messager.alert('错误', '当前不是你的审核，无法提交', 'error');
    } else {

        var amc_id = od_base.amc_id;
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
                             get_order_details_collections();
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
    var od_base = cur_order.order_base_info_and_cargo_info[0];
    if (od_base.amc_status != 1 || (
        od_base.amc_status == 1 &&
        od_base.is_my_point != 1
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
                     amc_id: od_base.amc_id,
                 }, function (data) {
                     if (data.result == 1) {
                         //重新获取
                         get_order_details_collections();
                         $.messager.alert('提示', data.msg, 'info');
                     } else {
                         $.messager.alert('错误', data.msg, 'error');
                     }
                 }, true);
             }
         });
    }
}
//获取审核流程
function refresh_approval_flow_details() {
    var od_base = cur_order.order_base_info_and_cargo_info[0];
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_amc_actual_flow_details',
        amc_id: od_base.amc_id,
        is_my_point: od_base.is_my_point,

    }, function (data) {

        if (od_base.amc_status != 1 || (
            od_base.amc_status == 1 &&
            od_base.is_my_point != 1
            )) {
            $('#my_approval_adivce').panel('close');
        } else {
            cur_next_amc_opr_info = data.next_amc_opr_info;
            bind_combobox(data.next_amc_opr_info, $('#ed_ap_next_amc_opr_info'), 'show_desc', 'aps_guid', false);

            if (cur_next_amc_opr_info.length == 1) {
                
                $('#ed_ap_next_amc_opr_info').combobox('setValue', cur_next_amc_opr_info[0].aps_guid);
            } else {
                $('.cls_next_opr').html('');
            }
        }
        $('#ap_flow_details tbody').html('');
        if (data.amc_actual_flow_details.length > 0) {
            $.each(data.amc_actual_flow_details, function (i, item) {
                $('#ap_flow_details tbody').append('<tr class="ap_flow_details_row"><td class="ap_flow_details_tim">' + dateformat(item.ap_opr_dat, true) + '</td>'
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