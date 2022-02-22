var cur_select_cyc_id = '';
var cur_select_cfi_id = '';
var cur_select_cyc_port_id = '';

function show_page_ship_fee_info() {

    if (cur_ed_ship == undefined) {
        return;
    }

    if (cur_ed_ship.ship_no == undefined) {
        $.messager.alert('错误提示', '错误: 请先保存航次。', 'error');
        return;
    }

    $('.dv_edit_order_menu_tab').removeClass('dv_edit_order_menu_tab_focus');
    $('.dv_edit_order_menu_tab').eq(2).addClass('dv_edit_order_menu_tab_focus');

    var $old_page = $cur_page;
    $cur_page = $('div.page_ship_fee_info');
    $old_page.fadeOut(50, function () {
        $cur_page.fadeIn(50, function () {
            $cur_page.layout({ fit: true });
            refresh_ship_fee_list(cur_ed_ship.ship_no);
        });
    });
}

/*初始化*/
function refresh_ship_fee_list(ship_no) {

    post('../Ashx/ship.ashx', {
        rnd: Math.random(),
        action: 'get_ship_fee_list',
        ship_no: ship_no
    }, function (data) {
        table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_order_fee', -1);
        columns_fliters_of_fee.columns_fliters('reset_target_data_and_clumns_fliter', data.rows);
    }, true);
    

}

/*表格初始化*/ 
function init_tab_ship_fee() {

    $("#tab_ship_fee").datagrid({
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
        toolbar: '#tab_ship_fee_bar',
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
                    return Number(value).toFixed(2);
                },
            }
            , {
                field: 'fee_currency_desc', title: '币种', sortable: true, width: 50
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
                    return 'background-color:#b3e7c7;color:#000';
                }
            }

            , {
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    return 'background-color:#b3e7c7;color:#000';
                }
            }
            , {
                field: 'fee_rel_bill_no', title: '关联提空号', width: 170, sortable: true,
            }
            , {
                field: 'fee_rel_opr_cod', title: '关联箱属', width: 70, sortable: true,
            }
            //, {
            //    field: 'first_ship_nam', title: '工具名', width: 100, sortable: true,
            //}
            //, {
            //    field: 'first_voyage', title: '工具号', width: 100, sortable: true,
            //}
            , {
                field: 'od_main_bill_no', title: '提单号', width: 160, sortable: true,
            }


            , {
                field: 'fee_bak', title: '费用备注', width: 260, sortable: true,
            }

            , {
                field: 'od_status_desc', rowspan: 2, title: '业务审核', width: 80, sortable: true,
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

            , { field: 'od_typ_desc', title: '业务类型', width: 80, sortable: true, }
            , { field: 'od_project_typ_desc', title: '项目类型', width: 80, sortable: true, }

            //, {
            //    field: 'profit_total_amount_desc', title: '盈利', width: 165, sortable: true,
            //    styler: function (value, row, index) {
            //        if (row.profit_total_amount_of_base > 0) {
            //            return 'background-color:#ead1c8;color:#000;';
            //        } else if (row.profit_total_amount_of_base < 0) {
            //            return 'background-color:#b3e7c7;color:#000;';
            //        }
            //    }
            //}
            , {
                field: 'fee_record_nam', title: '记录人', width: 60, sortable: true,
            }
            , {
                field: 'fee_record_dat', title: '记录时间', width: 80, sortable: true,

            }

        ]],
        onLoadSuccess: function (data) {

            refresh_fee_list_footer();
            if (!columns_fliters_of_fee) {

                columns_fliters_of_fee = $('#columns_fliters_of_fee').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_ship_fee'),
                    cur_cls_target_body: 'cls_ship_fee'
                });
            }
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_ship_fee'), rowIndex);
            refresh_fee_list_footer();
        },
        onCheck: function (index, row) {
            refresh_fee_list_footer();
        },
        onUncheck: function (index, row) {
            refresh_fee_list_footer();
        },
        onCheckAll: function (index, row) {
            refresh_fee_list_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_fee_list_footer();
        },
        onDblClickRow: function (index, row) {
            call_win_view_of_short_order_info(row.od_seq, row.od_no);
        }  
    });
}



function refresh_fee_list_footer() {
    table_bootom_selected_desc_have_symbol($('#tab_ship_fee'), 'selected_group_order_fee', -1);
     
     
}



//删除费用
function remove_fee() {
    var selected_rows = $('#tab_ship_cntr').datagrid('getChecked');

    if (selected_rows.length == 0) {
        $.messager.alert('错误提示', '请选择要删除的费用信息', 'error');
        return;
    }
    var block_flag = false;

    var lock_od_nos = '';

    $.each(selected_rows, function (i, item) {
        if (item.od_status_id != 1) {
            if (lock_od_nos.length == 0) {
                lock_od_nos = item.od_no;
            } else {
                lock_od_nos += ',' + item.od_no;
            }
            block_flag = true;
        }
    });

    if (block_flag) {
        $.messager.alert('错误提示', lock_od_nos + '以上委托已锁定，无法删除费用信息', 'error');
        return;
    }

    $.messager.confirm('删除船舶费用绑定提示', '特别提醒:删除费用将删除原来委托单内的相关费用信息，确认是否继续？',
    function (r) {
        if (r) {
            post('../Ashx/ship.ashx', {
                rnd: Math.random(),
                action: 'remove_ship_fee',
                ship_no: cur_ed_ship.ship_no,
                json_fee_of_ship_voyage: JSON.stringify({ fee_list: selected_rows })
            }, function (data) {
                refresh_ship_fee_list(cur_ed_ship.ship_no);
            }, true);
        }
    });
}

//解除费用绑定
function unbind_fee() {
    var selected_rows = $('#tab_ship_cntr').datagrid('getChecked');

    if (selected_rows.length == 0) {
        $.messager.alert('错误提示', '请选择要删除的费用信息', 'error');
        return;
    }

    var block_flag = false;

    var lock_od_nos = '';

    $.each(selected_rows, function (i, item) {
        if (item.od_status_id != 1) {
            if (lock_od_nos.length == 0) {
                lock_od_nos = item.od_no;
            } else {
                lock_od_nos += ',' + item.od_no;
            }
            block_flag = true;
        }
    });

    if (block_flag) {
        $.messager.alert('错误提示', lock_od_nos + '以上委托已锁定，无法删除费用信息', 'error');
        return;
    }

    $.messager.confirm('解除船舶费用绑定提示', '特别提醒:解除费用绑定只会解除费用和船舶之间的关系，费用还继续存在原委托单，确认是否继续？',
    function (r) {
        if (r) {
            post('../Ashx/ship.ashx', {
                rnd: Math.random(),
                action: 'unbind_ship_fee',
                ship_no: cur_ed_ship.ship_no,
                json_fee_of_ship_voyage: JSON.stringify({ fee_list: selected_rows })
            }, function (data) {
                refresh_ship_fee_list(cur_ed_ship.ship_no);
            }, true);
        }
    });

}