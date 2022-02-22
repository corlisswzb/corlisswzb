var cur_rec_or_pay = undefined;
var short_pageNumber = 1;
var short_pageSize = 20;

var cur_selected_oi = undefined;
var cur_tab_oi_list_query_params = undefined;
var from_typ = undefined;
$(document).ready(function () {
    $($('body')[0]).unbind('keydown').bind('keydown', custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);
    from_typ = parent.call_get_from_typ();
    if ($('.remove_part_' + from_typ).length > 0) {
        $('.remove_part_' + from_typ).remove();
    }
    cur_rec_or_pay = getQueryVariable('rec_or_pay');
    $('#dlg_update_oi_bak').dialog({
        title: '更改发票备注',
        iconCls: 'icon-table_row',
        autoOpen: false,
        modal: true,
        width: 450,
        minHeight: 170,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_update_oi_bak').dialog('close');
                }
            }]
    }).dialog('close');

    get_basesetting();
});
//获取基础数据
function get_basesetting() {
    basesetting = parent.call_get_father_basesetting();
    //post('../Ashx/sys_base.ashx', {
    //    rnd: Math.random(),
    //    action: 'get_basesettingCollections'
    //}, function (data) {
    //   basesetting = data;
    bind_combogrid_custom($('#search_oi_cu_id'));
    bind_combogrid_invoice($('#search_oi_like_str'));
    init_tab_oi_details_list();
    init_tab_oi_list();
    init_tab_oi_file_list();
    //});
}
//初始化 开票记录 
function init_tab_oi_list() {



    cur_tab_oi_list_query_params = {
        rnd: Math.random(),
        action: 'get_order_invoice_list',
        oi_rec_or_pay: cur_rec_or_pay,
        oi_cu_id: $('#search_oi_cu_id').data('cu_id'),
        oi_total_money: $('#search_oi_total_money').val(),
        oi_beg_dat: $('#search_oi_beg_dat').datebox('getValue'),
        oi_end_dat: $('#search_oi_end_dat').datebox('getValue'),
    };

    var exp = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;

    if ((cur_tab_oi_list_query_params.oi_beg_dat != undefined && cur_tab_oi_list_query_params.oi_beg_dat.length > 0 && !exp.test(cur_tab_oi_list_query_params.oi_beg_dat))) {
        //$.messager.alert('错误提示', '错误提示: 日期格式不正确，请修正后再执行查询操作', 'error');
        cur_tab_oi_list_query_params.oi_beg_dat = '';
        $('#search_oi_beg_dat').datebox('setValue', '');
    }
    if ((cur_tab_oi_list_query_params.oi_end_dat != undefined && cur_tab_oi_list_query_params.oi_end_dat.length > 0 && !exp.test(cur_tab_oi_list_query_params.oi_end_dat))) {
        //$.messager.alert('错误提示', '错误提示: 日期格式不正确，请修正后再执行查询操作', 'error');
        cur_tab_oi_list_query_params.oi_end_dat = '';
        $('#search_oi_end_dat').datebox('setValue', '');
    }

    $("#win_tab_oi_list").datagrid({
        url: '../Ashx/checkaccount.ashx',
        queryParams: cur_tab_oi_list_query_params,
        method: 'post',
        pageNumber: 1,
        pageSize: 30,
        pageList: [30, 60, 100],
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。 
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列 
        columns: [[
            {
                field: 'chk', title: '', checkbox: true,
            }
            , {
                field: 'oi_flow_no', title: '流水号', sortable: true, width: 140
            }
            , {
                field: 'oi_no', title: '发票号', sortable: true, width: 210
            }
              , {
                  field: 'oi_invoice_typ_desc', title: '税点', sortable: true, width: 150
              }
              , {
                  field: 'oi_rec_or_pay', title: '操作', sortable: true, width: 40,
                  formatter: function (value, row, index) {
                      if (Number(value) == 1) return '开票';
                      else if (Number(value) == -1) return '收票';
                      else return value;
                  }
              }
            , {
                field: 'oi_total_money_desc', title: '涉及金额', sortable: true, width: 80,

            }
            , {
                field: 'oi_c_desc', title: '己方单位', sortable: true, width: 140
            }
            , {
                field: 'oi_cu_desc', title: '对方单位', sortable: true, width: 210
            }
            , {
                field: 'oi_bak', title: '备注', sortable: true, width: 210
            }
            , {
                field: 'oi_record_nam', title: '操作人', sortable: true, width: 70,

            }
            , {
                field: 'oi_record_dat', title: '操作时间', sortable: true, width: 128,
                formatter: function (value, row, index) {
                    return dateformat(value, false);
                }
            }
             , {
                 field: '_opr', title: '', sortable: true, width: 68,
                 formatter: function (value, row, index) {
                     return '<a href="javascript:print_order_fee_of_invoice(\'' + row.oi_seq + '\');" class="print_btn">打印</a>'
                 }
             }
        ]],
        onCheck: function (index, row) {
            refresh_oi_list_footer();
        },
        onUncheck: function (index, row) {
            refresh_oi_list_footer();
        },
        onCheckAll: function (index, row) {
            refresh_oi_list_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_oi_list_footer();
        },

        onLoadSuccess: function (data) {
            $('.print_btn').linkbutton({
                iconCls: 'icon-print',
                plain: true
            });
            refresh_oi_list_footer();
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#win_tab_oi_list'), rowIndex);
            refresh_oi_list_footer();
        },
        onDblClickRow: function (index, row) {
            post('../Ashx/checkaccount.ashx', {
                action: 'get_order_fee_and_invoice_files_by_oi_seq',
                oi_seq: row.oi_seq
            }, function (data) {
                $("#win_tab_oi_file_list").datagrid('loadData', data.order_invoice_files);
                $("#win_tab_oi_details_list").datagrid('loadData', data.order_fee_of_invoice);
            }, true);
        },
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            cur_selected_oi = row;

            $('#mm_of_oi_list').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}
//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_oi_list_footer() {
    var target_tab = $('#win_tab_oi_list');
    var target_cls = 'selected_group_order_fee';

    var rows = target_tab.datagrid('getChecked');

    var count = rows.length;
    var panel_title = $('.' + target_cls + ' tbody tr').eq(0);

    var cur_fee_group2 = {
        total_amount_desc: '',
    };
    var cur_fee_group = {
        total_amount_desc: [],
    };

    var cur_total_fee_number = 0;
    var has_fee_number = false;
    if (rows.length > 0) {
        $.each(rows, function (i, row) {
            if (row.oi_total_money_desc != undefined && row.oi_total_money_desc.length > 0) {
                //1. 按逗号拆 
                var t_arr1 = row.oi_total_money_desc.split(',');

                $.each(t_arr1, function (gh, ta) {
                    //2. 按 : 拆 
                    var t_symbol = ta.substr(0, 1);
                    var t_amount = ta.substr(2, ta.length);
                    var has = false;
                    $.each(cur_fee_group.total_amount_desc, function (p, pa) {
                        if (pa.symbol == t_symbol) {
                            pa.amount += parseFloat(t_amount);
                            has = true;
                        }
                    });
                    if (!has) {
                        cur_fee_group.total_amount_desc.push({
                            symbol: t_symbol,
                            amount: parseFloat(t_amount)
                        });
                    }
                });
            }
        });


        //币种和金额 
        $.each(cur_fee_group.total_amount_desc, function (i, item) {
            if (cur_fee_group2.total_amount_desc.length == 0) {
                cur_fee_group2.total_amount_desc = item.symbol + item.amount.toFixed(2);
            } else {
                cur_fee_group2.total_amount_desc += ',' + item.symbol + item.amount.toFixed(2);
            }
        });

    }
    var temp = (cur_rec_or_pay == 1 ? 'rec' : 'pay');
    var all_gd = '<td class="cls_total_title">当前选择:</td><td class="cls_total_value">' + count + '</td>' +
                '<td class="cls_' + temp + '_title">金额:</td><td class="cls_' + temp + '_value">' + cur_fee_group2.total_amount_desc + '</td>';

    panel_title.html('').html(all_gd);

}

//初始化 开票记录相关费用 
function init_tab_oi_details_list() {
    $("#win_tab_oi_details_list").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        //toolbar: '#tab_fee_list_of_ca_bar',
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
            { title: '', field: 'fee_seq', rowspan: 2, width: 40, checkbox: true }
            , {
                field: 'fee_status_desc', rowspan: 2, title: '当前状态', sortable: true, width: 60,
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
        columns: [[
                  { title: '费用详情', align: 'center', colspan: 17 }
                , { title: '关联委托', align: 'center', colspan: 11 }
                , { title: '维护明细', align: 'center', colspan: 9 }
        ],
            [
             {
                 field: 'fee_cu_id', title: '结算单位', width: 220, sortable: true,
                 formatter: function (value, row, index) {
                     return row.fee_cu_desc;
                 }
             }
             , {
                 field: 'fee_dat', title: '业务时间', sortable: true, width: 78,
                 formatter: function (value, row, index) {
                     return dateformat(value, true);
                 }
             }
            , {
                field: 'fee_invoice_typ', title: '税率', sortable: true, width: 70,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                }
            }
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 80,
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
                field: 'fee_price', title: '单价', sortable: true, width: 70,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
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
                },
                styler: function (value, row, index) {
                    return 'background-color:#ffac83;color:#FFF;';
                }
            }
            , {
                field: 'woa_total_amount', title: '已收', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }

            , {
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    return 'background-color:#ffac83;color:#FFF;';
                }
            }
            , {
                field: 'fee_rel_bill_no', title: '关联提空号', width: 170, sortable: true,
            }
            , {
                field: 'fee_rel_opr_cod', title: '关联箱属', width: 70, sortable: true,
            }
            , {
                field: 'od_invoice_no', title: '发票号', width: 260, sortable: true,
            }
             , {
                 field: 'fee_bak', title: '费用备注', width: 260, sortable: true,
             }

            , { field: 'ca_title', title: '所属账单', width: 180, sortable: true, }
            , {
                field: 'od_status_desc', rowspan: 2, title: '审核状态', width: 70, sortable: true,
                styler: function (value, row, index) {
                    if (row.od_status_id == 1) {
                        if (row.od_amc_status == 0) return 'background-color:#dcdcdc;color:#000;';
                        else return 'background-color:#ffccb1;color:#000;';
                    } else if (row.od_status_id == 2) {
                        return 'background-color:#f9752e;color:#FFF;';
                    } else if (row.od_status_id == 3) {
                        return 'background-color:#02e251;color:#000;';
                    }
                }
            }
            , { field: 'od_no', title: '委托号', width: 84, sortable: true, }
            , { field: 'od_typ_desc', title: '业务类型', width: 70, sortable: true, }
            , { field: 'od_project_typ_desc', title: '项目类型', width: 70, sortable: true, }
            , {
                field: 'rec_total_amount_desc', title: '应收小计', sortable: true, width: 165,
                styler: function (value, row, index) {
                    return 'background-color:#eecfcb;color:#000;';
                }
            }
                , {
                    field: 'reced_total_amount_desc', title: '实收小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#eecfcb;color:#000;';
                    }
                }
                , {
                    field: 'unreced_total_amount_desc', title: '未收小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#eecfcb;color:#000;';
                    }
                }
                , {
                    field: 'pay_total_amount_desc', title: '应付小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#b3e7c7;color:#000;';
                    }
                }
                , {
                    field: 'payed_total_amount_desc', title: '实付小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#b3e7c7;color:#000;';
                    }
                }
                , {
                    field: 'unpayed_total_amount_desc', title: '未付小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#b3e7c7;color:#000;';
                    }
                }
                , {
                    field: 'profit_total_amount_desc', title: '盈利', width: 165, sortable: true,
                    styler: function (value, row, index) {
                        if (row.profit_total_amount_of_base > 0) {
                            return 'background-color:#ead1c8;color:#000;';
                        } else if (row.profit_total_amount_of_base < 0) {
                            return 'background-color:#b3e7c7;color:#000;';
                        }
                    }
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

            , {
                field: 'fee_invoice_lock_nam', title: '开票人', width: 60, sortable: true,
            }
            , {
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_finace_lock_nam', title: '销账', width: 60, sortable: true,
            }
            , {
                field: 'fee_finace_lock_dat', title: '销账时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_limit_dat', title: '收款账期', width: 80, sortable: true,
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
        },
    });
}
//初始化发票图片
function init_tab_oi_file_list() {
    $("#win_tab_oi_file_list").datagrid({
        data: { total: 0, rows: [] },
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
        emptyMsg: '无法找到相关数值',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列 
        columns: [[
              {
                  field: 'oi_filenam', title: '图片名称', sortable: true, width: 308,
              }
        ]],
        onLoadSuccess: function (data) {

        },
        onClickCell: function (rowIndex, field, value) {
            var row = $("#win_tab_oi_file_list").datagrid('getRows')[rowIndex];
            if (field == 'oi_filenam') {
                window.open(row.oi_filepath);
            }
        },
    });
}

function requery_oi_list() {
    cur_tab_oi_list_query_params = {
        rnd: Math.random(),
        action: 'get_order_invoice_list',
        oi_rec_or_pay: cur_rec_or_pay,
        oi_cu_id: $('#search_oi_cu_id').data('cu_id'),
        oi_total_money: $('#search_oi_total_money').val(),
        like_str: $('#search_oi_like_str').combogrid('getText'),
        oi_beg_dat: $('#search_oi_beg_dat').datebox('getValue'),
        oi_end_dat: $('#search_oi_end_dat').datebox('getValue'),
    };

    var exp = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;

    if ((cur_tab_oi_list_query_params.oi_beg_dat != undefined && cur_tab_oi_list_query_params.oi_beg_dat.length > 0 && !exp.test(cur_tab_oi_list_query_params.oi_beg_dat)) ||
        (cur_tab_oi_list_query_params.oi_end_dat != undefined && cur_tab_oi_list_query_params.oi_end_dat.length > 0 && !exp.test(cur_tab_oi_list_query_params.oi_end_dat))) {
        $.messager.alert('错误提示', '错误提示: 日期格式不正确，请修正后再执行查询操作', 'error');
        return;
    }


    $("#win_tab_oi_list").datagrid('load', cur_tab_oi_list_query_params);
    $("#win_tab_oi_file_list").datagrid('loadData', []);
    $("#win_tab_oi_details_list").datagrid('loadData', []);
}

//更改销账备注
function update_oi_bak() {
    var oi_seq = cur_selected_oi.oi_seq;
    var oi_bak = cur_selected_oi.oi_bak;
    $('#dlg_oi_bak').val(oi_bak);
    $('#dlg_update_oi_bak').dialog({
        title: '更改发票备注',
        iconCls: 'icon-table_row',
        autoOpen: false,
        modal: true,
        width: 450,
        minHeight: 170,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_update_oi_bak').dialog('close');
                }
            },
            {
                text: '确定',
                iconCls: 'icon-save',
                handler: function () {
                    var new_oi_bak = $('#dlg_oi_bak').val();

                    post('../Ashx/checkaccount.ashx', {
                        rnd: Math.random(),
                        action: 'update_oi_bak',
                        oi_seq: oi_seq,
                        oi_bak: new_oi_bak
                    }, function (data) {
                        //
                        if (data.result == 1) {
                            var rows = $('#win_tab_oi_list').datagrid('getData').rows;

                            $.each(rows, function (i, row) {
                                if (row.oi_seq == oi_seq) {
                                    row.oi_bak = new_oi_bak;
                                    $('#win_tab_oi_list').datagrid('updateRow', {
                                        index: i,
                                        row: row
                                    });
                                    $('.print_btn').linkbutton({
                                        iconCls: 'icon-print',
                                        plain: true
                                    });
                                    return;
                                }
                            });

                            $.messager.alert('提示', data.msg, 'info');
                        }
                        $('#dlg_update_oi_bak').dialog('close');
                    });

                }
            }]
    }).dialog('open');
}

function re_flag_invoice() {
    //自己不关闭 
    //
    var oi_seq = cur_selected_oi.oi_seq;
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_woa_or_iv_order_fee.aspx?rnd=' +
                        Math.random() + '&seq=' + oi_seq +
                        '&rec_or_pay=' + cur_rec_or_pay +
                        '&from_typ=IV' +
                        '&action=get_order_fee_by_oi_seq' +
                        '" style="width:100%;height:100%; overflow:hidden; "></iframe>';

    $('#win_woa_or_iv_order_fee').window({
        //title: '通过发票号' + cur_selected_oi.oi_no +'进入账单编辑',
        content: content
    }).window('open');


}
//woa_or_iv界面通知刷新 
function refresh_from_woa_or_iv_update() {
    $("#win_tab_oi_list").datagrid('load', cur_tab_oi_list_query_params);
    $("#win_tab_oi_file_list").datagrid('loadData', []);
    $("#win_tab_oi_details_list").datagrid('loadData', []);

}

function close_win_of_woa_or_iv_update() {
    $('#win_woa_or_iv_order_fee').window('close');
}
//打印
function print_order_fee_of_invoice(oi_seq) {
    parent.call_win_view_of_print('print_order_fee_by_oi_seq', oi_seq);

}

//批量打印发票
function bat_print_order_fee_of_invoice() {

    var rows = $('#win_tab_oi_list').datagrid('getChecked');

    var oi_seq = '';
    if (rows.length == 0) {
        $.messager.alert('错误', '请勾选数据后在执行批量打印操作', 'error');
        return;
    }

    $.each(rows, function (i, row) {
        if (oi_seq.length == 0) {
            oi_seq = row.oi_seq;
        } else {
            oi_seq += ',' + row.oi_seq;
        }
    });

    print_order_fee_of_invoice(oi_seq);
}
//子页面获取 basesetting
function call_get_father_basesetting() {
    return basesetting;
}
function call_get_from_typ() {
    return from_typ;
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