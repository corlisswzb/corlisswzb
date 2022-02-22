var hand_cost_par = {};

var cur_rec_or_pay = -1;
var basesetting = undefined;

var pre_fee_list = undefined;


$(document).ready(function () {

    $('#dlg_choise_ca_main').dialog({
        title: '请选择账期并入',
        iconCls: 'icon-table_key',
        autoOpen: false,
        modal: true,
        width: 600,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_choise_ca_main').dialog('close');
                }
            }]
    }).dialog('close');

    $('#dlg_new_ca_main').dialog({
        title: '新建账单',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 450,
        minheight: 160,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_new_ca_main').dialog('close');
                }
            }]
    }).dialog('close');

    $('#dlg_user_list').dialog({
        title: '选择指定对账人',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 450,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_user_list').dialog('close');
                }
            }]
    }).dialog('close');
    

    init_tab_ship_fee();

    $('#btn_insert_ca').linkbutton('disable');
    $('#btn_delete_fee').linkbutton('disable');
    $('#btn_save_fee').linkbutton('enable');
    $('#btn_save_fee').off('click').on('click', function () {
        save_fee();
    });

    hand_cost_par = parent.call_get_hand_cost_par();
    basesetting = parent.call_get_basesetting();

    bind_combogrid_custom($('#dlg_ed_ca_cu_id'));

    init_page_of_ca_create_or_choise();
    $('#sel_od_count').html(hand_cost_par.od_count);
    $('#sel_od_total_profit').html(hand_cost_par.od_total_profit.toFixed(2));
    $('#now_hand_cost').html(hand_cost_par.hand_cost_total.toFixed(2));
    $('#now_hand_cost_desc').html(
        '结算单位:' + hand_cost_par.hand_cost_cu_desc +
        ' 费项:' + hand_cost_par.hand_cost_fee_item_typ_desc +
        ' 计量单位:' + hand_cost_par.hand_cost_fee_unit_desc +
        ' 发票税点:' + hand_cost_par.hand_cost_fee_invoice_typ_desc 
        );

    pre_computer_fee_of_handcost();
});

function pre_computer_fee_of_handcost() { 

    post('../Ashx/busi_order.ashx', {
        rnd: Math.random(),
        action: 'pre_computer_fee_of_handcost',
        od_seqs: hand_cost_par.od_seqs,
        fee_cu_id: hand_cost_par.hand_cost_cu_id,
        fee_item_typ: hand_cost_par.hand_cost_fee_item_typ,
        fee_unit: hand_cost_par.hand_cost_fee_unit,
        fee_bak: hand_cost_par.hand_cost_fee_bak,
        fee_invoice_typ: hand_cost_par.hand_cost_fee_invoice_typ,
        total_hand_cost: hand_cost_par.hand_cost_total
    }, function (data) {
        if (data.result == 1) {
           

            $('#tab_fee_list').datagrid('loadData',data.fee_list);
        } else {
            $.messager.alert('错误提示', '错误: 所选择委托有已锁定委托，无法进行成本费用增加', 'error', function () {
                close_hand_cost_win();
            });
        }
    },true)
}

function close_hand_cost_win() {
    parent.call_close_hand_cost_win();
}

/*表格初始化*/
function init_tab_ship_fee() { 
    $("#tab_fee_list").datagrid({
        data: [],
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        toolbar: '#tab_fee_list_bar',
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        showFooter: true,
        frozenColumns: [[
           { title: '', field: 'fee_seq', width: 40, checkbox: true }

        ]],
        columns: [[
            {
                field: 'fee_status_desc', title: '状态', sortable: true, width: 46,
                styler: function (value, row, index) { 
                    switch (row.fee_status) {
                        case 1: return 'background-color:#fff;color:#000;';
                        case 3: return 'background-color:#7af7f6;color:#000;';
                        case 4: return 'background-color:#09c41f;color:#fff;';
                        case 5: return 'background-color:#f3e676;color:#000;';
                        case 9: return 'background-color:#ef1956;color:#fff;';
                    } 
                }
            }
             , {
                 field: 'fee_cu_desc', title: '结算单位', width: 210, sortable: true
             }
             , { field: 'od_no', title: '委托号', width: 88, sortable: true, }
             , {
                 field: 'fee_dat', title: '业务时间', sortable: true, width: 78,
                 formatter: function (value, row, index) {
                     return dateformat(value, true);
                 }
             }
            , {
                field: 'fee_invoice_typ_desc', title: '税率', sortable: true, width: 54
            }
            , {
                field: 'fee_item_typ_desc', title: '费项', sortable: true, width: 60
            }
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_unit_desc', title: '单位', sortable: true, width: 60
            }
            , {
                field: 'fee_price', title: '单价', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    if(value != undefined)
                        return Number(value).toFixed(2);
                    else 
                        return '';
                },
            }
            , {
                field: 'fee_currency_desc', title: '币种', sortable: true, width: 50
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54, sortable: true,
                formatter: function (value, row, index) {
                    if (value != undefined)
                        return Number(value).toFixed(4);
                    else
                        return '';
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    return 'background-color:#b3e7c7;color:#000';
                }
            }
            , {
                field: 'od_profit', title: '原委托盈利(本币)', width: 120, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    return 'background-color:#a3e1c7;color:#000';
                }
            }
            , {
                field: 'now_od_profit', title: '现委托盈利(本币)', width: 120, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    return 'background-color:#13eFc7;color:#000';
                }
            }
            , {
                field: 'ca_title', title: '所属账单', width: 260, sortable: true,
            }
            , {
                field: 'fee_bak', title: '费用备注', width: 260, sortable: true,
            } 
            , {
                field: 'result', title: '保存结果', width: 260, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) {
                        return '';
                    }
                    if (value == 1) {
                        return '插入费用完成';
                    }
                    if (value == 0) {
                        return '插入费用失败';
                    }
                },
                styler: function (value, row, index) {
                    if (value == 0) {
                        return 'background-color:red;color:#FFF';
                    } else if (value == 1) {
                        return 'background-color:green;color:#FFF';
                    } 
                }
            }
        ]],
        onLoadSuccess: function (data) {

            refresh_fee_list_footer(); 
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_fee_list'), rowIndex); 
        }, 
    });

    $('#tab_fee_list').datagrid('hideColumn', 'ca_title');
}

function refresh_fee_list_footer() {
    $("#tab_fee_list").datagrid('reloadFooter', [
        {
            fee_status: '0',
            fee_status_desc: '',
            fee_cu_desc: '',
            od_no: '',
            fee_dat: '',
            fee_invoice_typ_desc: '',
            fee_item_typ_desc: '',
            fee_number: table_compute('tab_fee_list', 'fee_number'),
            fee_unit_desc: '',
            fee_price: undefined,
            fee_currency_desc: '',
            fee_currency_rate: undefined,
            fee_amount: table_compute('tab_fee_list', 'fee_amount'),
            od_profit: table_compute('tab_fee_list', 'od_profit'),
            now_od_profit: table_compute('tab_fee_list', 'now_od_profit'),
            fee_bak: '', 
            result: undefined
        },
    ]);
}

//
function load_order_fee() {
    var rows = $('#tab_fee_list').datagrid('getRows');

    if (rows.length == 0) return;

    var fee_seqs = '';

    $.each(rows, function (i, item) {
        if (fee_seqs.length == 0) {
            fee_seqs = item.fee_seq;
        } else {
            fee_seqs += ',' + item.fee_seq;
        }
    });
    post('../Ashx/busi_order.ashx', {
        rnd: Math.random(),
        action: 'get_order_fee_by_fee_seqs',
        fee_seqs: fee_seqs,
    }, function (data) {
        $('#tab_fee_list').datagrid('showColumn', 'ca_title');

        if (data.rows.length > 0) {
            $.each(data.rows, function (i, ritem) {
                $.each(pre_fee_list, function (j, sitem) {
                    if (ritem.fee_seq == sitem.fee_seq) {
                        ritem.od_profit = sitem.od_profit;
                        ritem.now_od_profit = sitem.new_od_profit;
                    }
                });
            });
        }

        $('#tab_fee_list').datagrid('loadData', data.rows);
    },true)
}

//存储费用
function save_fee() {
    $('#tab_fee_list').datagrid('checkAll');
    var rows = $('#tab_fee_list').datagrid('getRows');

    if (rows.length == 0) return;
    $.messager.confirm('操作确认', '确定要增加下列成本费用吗?', function (r) {
        if (r) {
            post('../Ashx/busi_order.ashx', {
                rnd: Math.random(),
                action: 'insert_handcost_fee',
                data_fee: JSON.stringify({ fee_list: rows })
            }, function (data) {
                $.messager.alert('操作提示', '操作完成', 'info', function () {

                    pre_fee_list = data.fee_list;
                    $('#tab_fee_list').datagrid('loadData', data.fee_list);

                    $('#btn_save_fee').linkbutton('disable');
                    $('#btn_delete_fee').linkbutton('enable');
                    $('#btn_insert_ca').linkbutton('enable');
                    $('#btn_delete_fee').off('click').on('click', function () {
                        delete_fee();
                    });
                    $('#btn_insert_ca').off('click').on('click', function () {
                        $('#tab_fee_list').datagrid('checkAll');
                        insert_main_list();
                    });
                });


            }, true);
        }
    });
}

//删除费用 

function delete_fee() {

    $('#tab_fee_list').datagrid('checkAll');

    var rows = $('#tab_fee_list').datagrid('getRows');

    if (rows.length == 0) return;

    var fee_seqs = '';

    $.each(rows, function (i, item) {
        if (fee_seqs.length == 0) {
            fee_seqs = item.fee_seq;
        } else {
            fee_seqs += ',' + item.fee_seq;
        }
    });

    $.messager.confirm('删除费用提示', '确定要删除下表所有费用?', function (r) {
        if (r) {
            post('../Ashx/busi_order.ashx', {
                rnd: Math.random(),
                action: 'delete_fee_details',
                fee_seqs: fee_seqs,
            }, function (data) {
                if (data.result == 1) {
                    $.messager.alert('操作提示', '费用已删除完毕,点击确认后返回上页!', 'info', function () {
                        close_hand_cost_win();
                    });
                } else {
                    $.messager.alert('错误提示','错误:费用中含有已交账数据，无法删除','error');
                }
            },true);
        }
    });
}
