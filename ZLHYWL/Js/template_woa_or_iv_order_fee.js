var cur_from_typ = undefined;
var cur_rec_or_pay = undefined;
var cur_action = undefined;
var cur_seq = undefined;

//右键菜单选择行 
var cur_mm_select_row = undefined;
//筛选 
var clumn_fliter_of_order_fee = undefined;
//全局操作变量
var win_woa_or_iv_order_fee_operation_flag = undefined;
var from_typ = undefined;

$(document).ready(function () {


    
    /*
    
        需要通过后台判断 
    
    */

    from_typ = parent.call_get_from_typ();

    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'can_use_flag_finance_in_bus_page',
    }, function (data) {
        if (data.result == 0) {
            if ($('.remove_part_' + from_typ).length > 0) {
                $('.remove_part_' + from_typ).remove();
            } else {
                
            }
        }
    },false); 

    $('#dlg_flag_invoice_no').dialog({
        title: '发票标记',
        iconCls: 'icon-table_row',
        autoOpen: false,
        modal: true,
        width: 850,
        minHeight: 80,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_flag_invoice_no').dialog('close');
                }
            }]
    }).dialog('close');

    $('#dlg_one_key_change_fee_currency').dialog({
        title: '一键本币转换',
        iconCls: 'icon-table_row',
        autoOpen: false,
        modal: true,
        width: 850,
        minHeight: 80,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_one_key_change_fee_currency').dialog('close');
                }
            }]
    }).dialog('close');

    cur_seq = getQueryVariable('seq');
    cur_rec_or_pay = getQueryVariable('rec_or_pay');
    cur_action = getQueryVariable('action');
    cur_from_typ = getQueryVariable('from_typ');

    //应收和应付还是有不同的地方 
    if (cur_rec_or_pay == 1) {
        $('#rec_or_pay_oi_limit_dat').html('应收账期');
    } else {
        $('#rec_or_pay_oi_limit_dat').html('应付账期');
    }
    

    get_basesetting();

    
    
}); 

function get_basesetting() {
    basesetting = parent.call_get_father_basesetting();
    //post('../Ashx/sys_base.ashx', {
    //    rnd: Math.random(),
    //    action: 'get_basesettingCollections'
    //}, function (data) {
    //    basesetting = data;
        bind_combogrid_invoice_dlg($('#dlg_ed_invoice_no'));
      //  bind_combogrid_custom($('#mulit_fee_cu_id'));
        bind_combobox(basesetting.invoice_list, $('#mulit_fee_invoice_typ'), 'in_name', 'in_id', false);
        bind_combobox(basesetting.fee_item_list, $('#mulit_fee_item_typ'), 'fee_cn', 'fee_id', false);
        bind_combobox(basesetting.unit_list, $('#mulit_fee_unit'), 'u_desc', 'u_id', false);
        bind_combobox(basesetting.currency_list, $('#mulit_fee_currency_id'), 'cr_name', 'cr_id', false);
        init_tab_fee_list();
        init_tab_fee_list_of_wof();

        init_dlg_tab_flag_invoice_files();
        init_tab_fee_list_of_change();
        win_woa_or_iv_order_fee_operation_flag = undefined;
        load_order_fee();

    //}, true); 
}

function init_tab_fee_list() {

    $("#tab_fee_list").datagrid({
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
        toolbar: '#tab_fee_list_bar',
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
            { title: '', field: 'fee_seq', rowspan: 2, width: 40, checkbox: true }
            , {
                field: 'fee_status_desc', rowspan: 2, title: '状态', sortable: true, width: 60,
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
                 field: 'fee_cu_desc', title: '结算单位', width: 220, sortable: true,  
             }
             , {
                 field: 'fee_dat', title: '业务时间', sortable: true, width: 78, 
             }
            , {
                field: 'fee_invoice_typ_desc', title: '税率', sortable: true, width: 70 
            }
            , {
                field: 'fee_item_typ_desc', title: '费项', sortable: true, width: 80 
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
                field: 'fee_price', title: '单价', sortable: true, width: 70,
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
                field: 'woa_total_amount', title: '已销', width: 80, sortable: true,
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
                    return 'background-color:#b3e7c7;color:#000';
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
            field: 'fee_record_dat', title: '记录时间', width: 80, sortable: true 
        }
        , {
            field: 'fee_checkaccount_lock_nam', title: '对账人', width: 60, sortable: true,
        }
        , {
            field: 'fee_checkaccount_lock_dat', title: '对账时间', width: 80, sortable: true 
        }

        , {
            field: 'fee_invoice_lock_nam', title: '开票人', width: 60, sortable: true,
        }
        , {
            field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true 
        }
        , {
            field: 'fee_finace_lock_nam', title: '销账', width: 60, sortable: true,
        }
        , {
            field: 'fee_finace_lock_dat', title: '销账时间', width: 80, sortable: true 
        }
        , {
            field: 'fee_limit_dat', title: '收款账期', width: 80, sortable: true ,
            styler: function (value, row, index) {
                if (row.fee_limit_status == 1)
                    return 'background-color:#fce08b;color:#000;';
                if (row.fee_limit_status == 2)
                    return 'background-color:#ec7a3c;color:#FFF;';
            }
        }
        ]],
        onLoadSuccess: function (data) {
            
            refresh_fee_list_of_ca_footer();

            if (!clumn_fliter_of_order_fee) {
                clumn_fliter_of_order_fee = $('#columns_fliters').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_fee_list'),
                    cur_cls_target_body: 'cls_fee_region'
                });
           
            }  
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_fee_list'), rowIndex);

            refresh_fee_list_of_ca_footer();
        },
        onCheck: function (index, row) {
            refresh_fee_list_of_ca_footer();
        },
        onUncheck: function (index, row) {
            refresh_fee_list_of_ca_footer();
        },
        onCheckAll: function (index, row) {
            refresh_fee_list_of_ca_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_fee_list_of_ca_footer();
        },
        onDblClickRow: function (index, row) {
            cur_mm_select_row= row;
            //这里 应该 改一下 
            //$('#mm_of_datagrid').data('od_no', row.od_no);
            //$('#mm_of_datagrid').data('od_seq', row.od_seq);
            //$('#mm_of_datagrid').data('amc_id', row.od_amc_id);
            //$('#mm_of_datagrid').data('cu_id', row.fee_cu_id);
            //这里 应该 改一下 
            win_view_of_short_order_info();
        },
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            // $('#dv_view_ca').hide();
            cur_mm_select_row = row;
            //$('#mm_of_datagrid').data('od_no', row.od_no);
            //$('#mm_of_datagrid').data('od_seq', row.od_seq);
            //$('#mm_of_datagrid').data('amc_id', row.od_amc_id);
            //$('#mm_of_datagrid').data('cu_id', row.fee_cu_id);
            $('#mm_of_datagrid').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}
//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_fee_list_of_ca_footer() {
    table_bootom_selected_desc_have_symbol($('#tab_fee_list'), 'selected_group_order_fee_of_ca', cur_rec_or_pay);
    if (clumn_fliter_of_order_fee != undefined) {
        clumn_fliter_of_order_fee.hide_panel();
    }
}

//初始化发票图片
function init_dlg_tab_flag_invoice_files() {
    $("#dlg_tab_flag_invoice_files").datagrid({
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
             , {
                 field: '_opr', title: '操作', sortable: true, width: 65,
                 formatter: function (value, row, index) {
                     return '<a class="cls_btn_delete_invoice_fle"   >删除</a>'
                 }
             }
        ]],
        onLoadSuccess: function (data) {
            $('.cls_btn_delete_invoice_fle').linkbutton(
                {
                    title: '删除',
                    iconCls: 'icon-delete',
                    plain: true
                }
            );
        },
        onClickCell: function (rowIndex, field, value) {
            var row = $("#dlg_tab_flag_invoice_files").datagrid('getRows')[rowIndex];
            if (field == 'oi_filenam') {
                window.open(row.oi_filepath);
            }

            if (field == '_opr') {
                $.messager.confirm('删除发票提示', '确定要退回所选的' + row.oi_filenam + '发票？',
                   function (r) {
                       if (r) {
                           var old_rows = $('#dlg_tab_flag_invoice_files').datagrid('getRows');

                           var new_row = [];
                           $.each(old_rows, function (i, drow) {
                               if (drow.oi_file_seq != row.oi_file_seq) {
                                   new_row.push(drow);
                               }
                           });


                           $('#dlg_tab_flag_invoice_files').datagrid('loadData', new_row);
                       }
                   });
            }
        },
    });
}
//汇率
function init_tab_fee_list_of_change() {

    $("#tab_fee_list_of_change").datagrid({
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
        toolbar: '#tab_fee_list_of_toolbar',
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列

        columns: [[
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
             , {
                 field: 'fee_cu_id', title: '结算单位', width: 220, sortable: true,
                 formatter: function (value, row, index) {
                     return row.fee_cu_desc;
                 },
                 styler: function (value, row, index) {
                     if (row.fee_cu_id_diff == 1) {
                         return 'background-color:#41b2f3;color:#FFF;';
                     }
                     return '';
                 }
             }
            , {
                field: 'fee_invoice_typ', title: '税率', sortable: true, width: 70,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                },
                styler: function (value, row, index) {
                    if (row.fee_invoice_typ_diff == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    return row.fee_item_typ_desc;
                },
                styler: function (value, row, index) {
                    if (row.fee_item_typ_diff == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (row.fee_number_diff == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_unit', title: '单位', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_unit_desc;
                },
                styler: function (value, row, index) {
                    if (row.fee_unit_diff == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_price', title: '单价', sortable: true, width: 70,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (row.fee_price_diff == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_currency_id', title: '币种', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_currency_desc;
                },
                styler: function (value, row, index) {
                    if (row.fee_currency_id_diff == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(4);
                },
                styler: function (value, row, index) {
                    if (row.fee_currency_rate_diff == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
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
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    return 'background-color:#b3e7c7;color:#000';
                }
            }
            , {
                field: 'fee_bak', title: '费用备注', width: 380, sortable: true,
            }
        ]],
        onLoadSuccess: function (data) {

        }
    });
}
//销账
function init_tab_fee_list_of_wof() {

    $("#tab_fee_list_of_wof").datagrid({
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
        toolbar: '#tab_fee_list_of_wof_bar',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列 
        columns: [[
              {
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
                    if (isNaN(value)) return ''
                    else return Number(value).toFixed(2);
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
                    if (isNaN(value)) return ''
                    else return Number(value).toFixed(2);
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
                    if (isNaN(value)) return ''
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (isNaN(value)) return ''
                    else return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    return 'background-color:#b3e7c7;color:#000';
                }
            }
            , {
                field: 'woa_total_amount', title: cur_rec_or_pay==1?'已收':'已付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (isNaN(value)) return ''
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'unwoa_total_amount', title: cur_rec_or_pay==1?'未收':'未付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (isNaN(value)) return ''
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'ed_unwoa_total_amount', title: cur_rec_or_pay==1?'本次收款':'本次付款' , width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (isNaN(value)) return ''
                    else return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },

            }
            , {
                field: 'woa_result_msg', title: '标记账单结果', sortable: true, width: 238,
                styler: function (value, row, index) {
                    if (row.woa_result == 1) {
                        return 'background-color:#60ce07;color:#000;';
                    } else if (row.woa_result == 0) {
                        return 'background-color:#ff529f;color:#fff;';
                    }
                }
            }
        ]],
        onLoadSuccess: function (data) {
            //直接打开编辑
            if (data.rows.length > 0) {
                $.each(data.rows, function (i, row) {
                    $('#tab_fee_list_of_wof').datagrid('beginEdit', i);
                    var obj = $('#tab_fee_list_of_wof').datagrid('getEditor', { index: i, field: 'ed_unwoa_total_amount' }).target;

                    obj.unbind('input').bind('input', function () {
                        var rows = $('#tab_fee_list_of_wof').datagrid('getRows');
                        var total = 0.0;
                        $.each(rows, function (i, row) {
                            var obj1 = $('#tab_fee_list_of_wof').datagrid('getEditor', { index: i, field: 'ed_unwoa_total_amount' }).target;

                            if (!isNaN(obj1.val())) {
                                total += parseFloat(obj1.val());
                            }
                        });

                        $('.cls_now_woa').eq(0).html(total.toFixed(2));
                    });
                });
            }
           
            var panel_title = $('.all_group_order_fee_of_woa tbody tr').eq(0);
            if (data.rows.length > 0) {

                var data_group = {
                    fee_number: 0,
                    fee_amount: '',
                    woa_total_amount: '',
                    unwoa_total_amount: ''
                };
                //币种和金额 

                var data_cr_symbol_of_fee_amount = [];
                var data_cr_symbol_of_woa_total_amount = [];
                var data_cr_symbol_of_unwoa_total_amount = [];
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

                    var has_cr_unwta = false;

                    $.each(data_cr_symbol_of_unwoa_total_amount, function (wtai, uwtaitem) {
                        if (uwtaitem.fee_currency_symbol == item.fee_currency_symbol) {
                            uwtaitem.amount += parseFloat(item.unwoa_total_amount);
                            has_cr_unwta = true;
                        }
                    });
                    if (!has_cr_unwta) {
                        data_cr_symbol_of_unwoa_total_amount.push({
                            fee_currency_symbol: item.fee_currency_symbol,
                            amount: parseFloat(item.unwoa_total_amount)
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
                var str_cr_symbol_of_unwoa_total_amount = '';
                $.each(data_cr_symbol_of_unwoa_total_amount, function (i, item) {
                    if (str_cr_symbol_of_unwoa_total_amount.length == 0) {
                        str_cr_symbol_of_unwoa_total_amount = item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                    } else {
                        str_cr_symbol_of_unwoa_total_amount += ',' + item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                    }
                });

                data_group.fee_amount = str_cr_symbol_of_fee_amount
                data_group.woa_total_amount = str_cr_symbol_of_woa_total_amount;
                data_group.unwoa_total_amount = str_cr_symbol_of_unwoa_total_amount;



                var all_gd = '<td class="cls_total_title">总计:</td><td class="cls_total_value">' + data.rows.length + '</td>' +
                        '<td class="cls_rec_title">应收:</td><td class="cls_rec_value">' + data_group.fee_amount + '</td>' +
                        '<td class="cls_rec_title">实收:</td><td class="cls_rec_value">' + data_group.woa_total_amount + '</td>' +
                        '<td class="cls_rec_title">未收:</td><td class="cls_rec_value">' + data_group.unwoa_total_amount + '</td>' +
                        '<td class="cls_rec_title">本次核销:</td><td class="cls_rec_value cls_now_woa">' + data_group.unwoa_total_amount + '</td>';
                //var arr_gd = t_gfd.split(';'); 

                panel_title.html('').html(all_gd);

            } else {
                panel_title.html('<td class="cls_total_title">总计:</td><td class="cls_total_value">0</td>' +
                        '<td class="cls_rec_title">应收:</td><td class="cls_rec_value">0</td>' +
                        '<td class="cls_rec_title">实收:</td><td class="cls_rec_value">0</td>' +
                        '<td class="cls_rec_title">未收:</td><td class="cls_rec_value">0</td>' +
                        '<td class="cls_rec_title">本次核销:</td><td class="cls_rec_value cls_now_woa">0</td>');
            }

        },
        onAfterEdit: function (index, row, changes) {
            $("#tab_fee_list_of_wof").datagrid('updateRow', {
                index: index,
                row: row
            });
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_fee_list_of_wof'), rowIndex);
        },
    });
}

//装载数据
function load_order_fee() {
    if (win_woa_or_iv_order_fee_operation_flag == 1 ||
        win_woa_or_iv_order_fee_operation_flag == undefined ) {
        post('../Ashx/checkaccount.ashx', {
            rnd: Math.random(),
            action: cur_action,
            rec_or_pay: cur_rec_or_pay,
            ca_seq: cur_seq,
            oi_seq: cur_seq,
            woa_seq: cur_seq,
            amc_id: cur_seq,
        }, function (data) {

            if (cur_action == 'get_single_pay_checkaccount') {
                $('#win_sh_ca_bak').val(data.amc_details.group_ca_bak);
                $('#win_sh_group_bank').val(data.amc_details.group_bank);
                $('#win_sh_ba_pay_typ_desc').html(data.amc_details.ba_pay_typ_desc);
                $('#win_sh_ba_pay_dat').html(data.amc_details.ba_pay_dat);
            } else {
                $('#win_sh_ca_bak').val(data.ca_bak);
            } 
            clumn_fliter_of_order_fee.columns_fliters('reset_target_data_and_clumns_fliter',data.rows);
            
            if (win_woa_or_iv_order_fee_operation_flag == 1) {
                call_parent_refresh();
                win_woa_or_iv_order_fee_operation_flag = 0;
            } 
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_order_fee_of_ca', cur_rec_or_pay);

        }, true);
    } 

}
//清空条件 
function clear_fliter() {
    clumn_fliter_of_order_fee.columns_fliters('clear');
}

//上传 
function _render_invoice_file(base64_str) {
    var image = new Image();
    image.onload = function () {
        //需要把blob存储起来
        //data:image/jpeg;base64, 
        //canvas 
        var canvas = document.createElement('canvas');

        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        //$('#single_contract_imgfile').prop('src',canvas.toDataURL('image/png'));
        //data:image/jpeg;base64,  
        var blob = canvas.toDataURL();

        $.messager.progress({
            title: '请稍后',
            msg: '努力加载中...'
        });
        //上传
        $.post('../Ashx/checkaccount.ashx', {
            pic: blob,
            pic_name: '发票',
            action: 'insert_order_invoice_file',
            mode: 'pic',
            rnd: Math.random(),
        },
            function (returndata) {
                $.messager.progress('close');
                var data = JSON.parse(returndata);
                if (data.result == 1) {
                    //$("#tab_order_contract_files").datagrid('loadData', { total: data.order_contract_file_info.length, rows: data.order_contract_file_info });
                    var old_rows = $('#dlg_tab_flag_invoice_files').datagrid('getRows');

                    old_rows.push({
                        oi_file_seq: data.oi_file_seq,
                        oi_filenam: data.oi_filenam,
                        oi_filepath: data.oi_filepath
                    });

                    $('#dlg_tab_flag_invoice_files').datagrid('loadData', old_rows);
                } else {
                    $.messager.alert('错误', '错误:上传错误，请联系管理员处理', 'error');
                }
            });
    }
    image.src = base64_str;
}

//监控上传 
function document_paste(event) {
    console.log(event);
    var isChrome = false;
    if (event.clipboardData || event.originalEvent) {
        //某些chrome版本使用的是event.originalEvent
        var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
        if (clipboardData.items) {
            // for chrome
            var items = clipboardData.items,
                len = items.length,
                blob = null;
            isChrome = true;
            for (var i = 0; i < len; i++) {
                console.log(items[i]);
                if (items[i].type.indexOf("image") !== -1) {
                    //getAsFile() 此方法只是living standard firefox ie11 并不支持
                    blob = items[i].getAsFile();
                }
            }
            if (blob !== null) {
                //var blobUrl = URL.createObjectURL(blob);
                //blob对象显示
                //document.getElementById("imgNode").src = blobUrl;
                //_render_invoice_file(blob);

                //base64码显示
                var reader = new FileReader();
                reader.onload = function (event) {
                    //event.target.result 即为图片的Base64编码字符串
                    var base64_str = event.target.result;

                    _render_invoice_file(base64_str);
                }
                reader.readAsDataURL(blob);
                //var fd = new FormData(document.forms[0]);
                //fd.append("the_file", blob, 'image.png');
                ////创建XMLHttpRequest对象
                //var xhr = new XMLHttpRequest();
                //xhr.open('POST', '/image');
                //xhr.onload = function () {
                //    if (xhr.readyState === 4) {
                //        if (xhr.status === 200) {
                //            var data = JSON.parse(xhr.responseText);
                //            console.log(data);
                //        } else {
                //            console.log(xhr.statusText);
                //        }
                //    };
                //};
                //xhr.onerror = function (e) {
                //    console.log(xhr.statusText);
                //}
                //xhr.send(fd);
            }
        }
    }
}

//从账单中移除费用
function remove_fee_details_from_ca() {

    

    var remove_rows = $('#tab_fee_list').datagrid('getChecked');

    if (remove_rows.length == 0) {
        $.messager.alert('错误', '错误: 请选择要删除的行', 'error');
        return;
    }


    var ca_lock = false;
    var fee_lock = false;
    var pay_lock = false;
    $.each(remove_rows, function (i, row) {
        //账单已 锁定，或者状态是2, 且是付款并提交了OA审核 
        if(row.ca_status == 3){
            ca_lock = true;
        }

        if ( row.ca_status == 2
            && row.rec_or_pay == -1
            && row.ca_amc_id != undefined
            && row.ca_amc_id.length > 0) {
            pay_lock = true;
        }

        // 费用已销账或部分销账 
        if (row.fee_status == 4 || row.fee_status == 9) {
            fee_lock = true;
        }
    });

    if (ca_lock) {
        $.messager.alert('错误', '错误: 选择费用中含有费用所属账单已销账，无法进行移除操作', 'error');
        return;
    }
    if (pay_lock) {
        $.messager.alert('错误', '错误: 选择费用中含有费用所属账单正在付款审核中，无法进行移除操作', 'error');
        return;
    }

    if (fee_lock) {
        $.messager.alert('错误', '错误: 选择费用中含有费用已销账，无法进行移除操作', 'error');
        return;
    }

    $.messager.confirm('删除提示', '确定要从账单中移除选中的' + remove_rows.length + '行数据？',
    function (r) {
        if (r) {
            var fee_seqs = '';

            $.each(remove_rows, function (i, item) {
                if (fee_seqs.length == 0) {
                    fee_seqs = item.fee_seq;
                } else {
                    fee_seqs += ',' + item.fee_seq;
                }
            }); 
            post('../Ashx/checkaccount.ashx', {
                rnd: Math.random(),
                action: 'delete_fee_details_for_bus',
                ca_fee_details: JSON.stringify({rows:remove_rows}) 
            }, function (data) {
                if (data.result == 1) {
                    win_woa_or_iv_order_fee_operation_flag = 1;
                    $.messager.alert('提示', data.msg, 'info', function () {
                        load_order_fee();
                    });
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                }
            }, true);
        }
    });

}

//标记发票 
function flag_fee_invoice_by_fee_seqs() {
    var rows_selected = $('#tab_fee_list').datagrid('getChecked');
    if (rows_selected.length == 0) {
        $.messager.alert('错误', '错误: 请选择费用后进行发票标记', 'error');
        return;
    }
    /*是不是有多个结算单位，不允许这样操作 */
    var has_mulit_cu_id = false;

    /*
        如果含有另外一张发票，需要提示用户是否覆盖 
    */
    var already_has_oi_seq = false;


    var first_cu_id = rows_selected[0].fee_cu_id;

    $.each(rows_selected, function (i, item) {

        if (first_cu_id != item.fee_cu_id) {
            has_mulit_cu_id = true;
        }

        if (item.oi_seq != undefined && item.oi_seq.length > 0) {
            already_has_oi_seq = true;
        }
    });

    if (has_mulit_cu_id) {
        $.messager.alert('错误', '错误: 标记费用包含多个结算单位，不符合发票标记规则，无法执行绑定操作！', 'error');
        return;
    }
    var fun = function () {
        var selected_rows = $('#tab_fee_list').datagrid('getChecked');
        var total_money = 0;
        var fee_seqs = '';
        $.each(selected_rows, function (i, item) {
            if (fee_seqs.length == 0) {
                fee_seqs = item.fee_seq;
            } else {
                fee_seqs += ',' + item.fee_seq;
            }
            total_money += Number(item.fee_price == undefined ? 0 : item.fee_price) * Number(item.fee_number == undefined ? 0 : item.fee_number) * Number(item.fee_currency_rate == undefined ? 0 : item.fee_currency_rate);
        });
        //dlg_sh_c_id

        $('#dlg_sh_c_id').val(sessionStorage.getItem('cpy_desc')); 
        $('#dlg_sh_cu_id').val(selected_rows[0].fee_cu_desc);

        $('#dlg_flag_invoice_cu_id').val(selected_rows[0].fee_cu_id);

        $('#dlg_sh_rows_count').val(selected_rows.length);
        $('#dlg_sh_fee_count').val(total_money.toFixed(2));

        $('#dlg_ed_invoice_no').combogrid('setText', '');
        $('#dlg_sh_invoice_typ_desc').val('');
        $('#dlg_ed_oi_limit_dat').datebox('setValue', '');
        $('#dlg_sh_total_money').val('0');
        $('#dlg_ed_oi_bak').val('');

        $('#dlg_tab_flag_invoice_files').datagrid('loadData', []);
        $('#dlg_ed_upload_file').focus(function () {
            document.addEventListener('paste', document_paste)
        });
        $('#dlg_ed_upload_file').blur(function () {
            document.removeEventListener('paste', document_paste);
        });

        $('#dlg_flag_invoice_no').dialog({
            title: '发票标记',
            iconCls: 'icon-table_row',
            autoOpen: false,
            modal: true,
            width: 850,
            minHeight: 80,
            buttons: [
                {
                    text: '关闭',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#dlg_flag_invoice_no').dialog('close');
                    }
                }, {
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () { 
                        var invoice_no = $.trim($('#dlg_ed_invoice_no').combogrid('getText')); 
                        if (invoice_no.length == 0) {
                            $.messager.alert('错误', '错误: 发票号不能为空', 'error');
                            return;
                        }
                        var oi_sub_no = invoice_no.replace('/', ',');

                        var par = {
                            rnd: Math.random(),
                            action: 'flag_fee_invoice_by_fee_seqs',
                            invoice_no: invoice_no,
                            fee_seqs: fee_seqs,
                            oi_rec_or_pay: cur_rec_or_pay,
                            oi_sub_no: oi_sub_no,
                            oi_seq: $('#dlg_ed_invoice_no').data('oi_seq'),
                            oi_cu_id: $('#dlg_flag_invoice_cu_id').val(),
                            oi_bak: $('#dlg_ed_oi_bak').val(),
                            oi_limit_dat: $('#dlg_ed_oi_limit_dat').datebox('getValue'),
                            oi_invoice_files_json: JSON.stringify({ invoice_file_list: $('#dlg_tab_flag_invoice_files').datagrid('getRows') }),
                        };

                        if (par.oi_limit_dat.length == 0) {
                            $.messager.alert('错误', '错误: 必须填写账期', 'error');
                            return;
                        }

                        post('../Ashx/checkaccount.ashx', par, function (data) {
                            if (data.result == 1) {
                                $('#dlg_flag_invoice_no').dialog('close'); 
                                win_woa_or_iv_order_fee_operation_flag = 1;
                                $.messager.confirm('打印提示', '你已完成发票绑定操作是否进行打印？',
                                function (r) {
                                    if (r) {
                                        print_order_fee_of_invoice(data.oi_seq);
                                    }
                                    load_order_fee();
                                });

                            } else {
                                $.messager.alert('错误', data.msg, 'error');
                            }
                        }, false);
                    }
                }]
        }).dialog('open');
    }

    if (already_has_oi_seq) {
        $.messager.confirm('费用发票标记提示', '请注意: 标记费用含有已经标记过发票的费用，本次操作将会覆盖掉上次发票标记，是否继续？',
        function (r) {
            if (r) {
                fun();
            }
        });
    } else {
        fun();
    }
}
//打印发票
function print_order_fee_of_invoice(oi_seq) {
    //这里 应该 改一下 
    parent.call_win_view_of_print('print_order_fee_by_oi_seq',oi_seq); 
    
}

//取消发票标记
function unflag_fee_invoice_by_fee_seqs() {
    var selected_rows = $('#tab_fee_list').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误', '错误: 请选择费用后进行取消发票标记', 'error');
        return;
    }
    var total_money = 0;

    var fee_seqs = '';
    $.each(selected_rows, function (i, item) {
        if (fee_seqs.length == 0) {
            fee_seqs = item.fee_seq;
        } else {
            fee_seqs += ',' + item.fee_seq;
        }
        total_money += Number(item.fee_price == undefined ? 0 : item.fee_price) * Number(item.fee_number == undefined ? 0 : item.fee_number) * Number(item.fee_currency_rate == undefined ? 0 : item.fee_currency_rate);
    });
    $.messager.confirm('取消费用发票标记', '确定要将所选的' + selected_rows.length + '条，共计金额' + total_money.toFixed(2) + '的费用取消发票标记吗？',
    function (r) {
        if (r) {
            post('../Ashx/checkaccount.ashx', {
                rnd: Math.random(),
                action: 'unflag_fee_invoice_by_fee_seqs',
                fee_seqs: fee_seqs
            }, function (data) {
                if (data.result == 1) { 
                    win_woa_or_iv_order_fee_operation_flag = 1;
                    $.messager.alert('提示', data.msg, 'info', function () {
                        load_order_fee();
                    });
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                }
            }, true);
        }
    });



}

//标记核销
function flag_fee_finace_by_fee_seqs() {
    var selected_rows = $('#tab_fee_list').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误', '错误: 请选择费用后进行核销标记', 'error');
        return;
    }
    /*是不是有多个结算单位，不允许这样操作 */
    var has_mulit_cu_id = false;
    //选择的费用中，不能有一种情况，就是标记了对冲
    //且对冲计划，还未完成 
    var hoa_right = true;
    var first_cu_id = selected_rows[0].fee_cu_id;
    $.each(selected_rows, function (i, item) {
        if (!!item.hoa_seq && item.hoa_status == 1) {
            hoa_right = false;
        }
        if (first_cu_id != item.fee_cu_id) {
            has_mulit_cu_id = true;
        }
    });

    if (!hoa_right) {
        $.messager.alert('错误', '错误: 加入了对冲计划且计划未结束的费用无法进行其他销账', 'error');
        return;
    }
    if (has_mulit_cu_id) {
        $.messager.alert('错误', '错误: 标记费用包含多个结算单位，不符合销账规则，无法执行操作！', 'error');
        return;
    }

    var wof_ff_pay_cu_desc = '';
    wof_ff_pay_cu_desc = selected_rows[0].fee_cu_desc;
     
    if (cur_rec_or_pay == 1) {
        $('#td_sh_c_id').html('收票单位:');
        $('#td_sh_cu_id').html('开票单位:');
        $('#td_wof_ff_woa_bank_dat').html('银行回款日期:');
        $('#td_wof_ff_woa_bank_dat').html('回款备注:');
        $('#wof_ff_rec_cu_desc').html(sessionStorage.getItem('cpy_desc'));

        $('#wof_ff_pay_cu_desc').html(wof_ff_pay_cu_desc);
    } else {
        $('#td_sh_c_id').html('开票单位:');
        $('#td_sh_cu_id').html('收票单位:');
        $('#td_wof_ff_woa_bank_dat').html('银行付款日期:');
        $('#td_wof_ff_woa_bank_dat').html('银行付款日期:');
        $('#wof_ff_rec_cu_desc').html(wof_ff_pay_cu_desc); 
        $('#wof_ff_pay_cu_desc').html(sessionStorage.getItem('cpy_desc'));
    }
   

    $('#wof_ff_woa_bak').val('');
    var now_time = basesetting.sys_time;

    $('#wof_ff_woa_bank_dat').datebox('setValue', dateformat(now_time, true));
    var now_rows = $.extend(true, [], selected_rows);

    $.each(now_rows, function (i, row) {
        row.ed_unwoa_total_amount = row.unwoa_total_amount;
    });

    $('#tab_fee_list_of_wof').datagrid('loadData', now_rows);

    $('#window_of_finace_fee').window({  
        onClose: function () { 
            load_order_fee(); 
        }
    }).window('open'); 
}
//确认核销
function confirm_flag_fee_finace_by_fee_seqs() {
    var cur_rows = $('#tab_fee_list_of_wof').datagrid('getRows');

    $.each(cur_rows, function (i, row) {
        $('#tab_fee_list_of_wof').datagrid('endEdit', i);
    });

    cur_rows = $('#tab_fee_list_of_wof').datagrid('getRows');

    var error = false;
    var error_desc = '';

    /*
        应收/应付 必须是交账的数据 fee_status >= 3
        
        应付: 必须是提交审核，且审核通过的数据 

    */ 
    var rFee_status = true;
    
    var rPay_status = true;

    //判断 销账费用，必须在 未销和已销之间 
    $.each(cur_rows, function (i, row) {

        if (row.fee_status < 3) {
            rFee_status = false;
            return;
        }

        //if(row.rec_or_pay == -1 && (
        //    row.ca_amc_id == undefined || (
        //        row.ca_amc_id != undefined && 
        //        row.ca_amc_status != 2
        //        )
        //    )
        //) {
        //    rPay_status = false;
        //    return;
        //}

        //已收
        var woa_fee_amount = Number(row.woa_total_amount);
        //未收 
        var unwoa_fee_amount = Number(row.unwoa_total_amount);
        //当前收 
        var ed_unwoa_total_amount = Number(row.ed_unwoa_total_amount);
        //应该收 
        var fee_amount = Number(row.fee_amount);

        //当前收 + 已收 
        // 如果总费用是 -1000 ,已收 -400 ,当前收 500 

        if (fee_amount < 0 && (ed_unwoa_total_amount + woa_fee_amount < fee_amount ||
            ed_unwoa_total_amount + woa_fee_amount > 0
            )) {
            error = true;
            if (error_desc.length == 0) {
                error_desc = (i + 1);
            } else {
                error_desc += ',' + (i + 1);
            }
        }

        if (fee_amount > 0 && (ed_unwoa_total_amount + woa_fee_amount < 0 ||
            ed_unwoa_total_amount + woa_fee_amount > fee_amount
            )) {
            error = true;
            if (error_desc.length == 0) {
                error_desc = (i + 1);
            } else {
                error_desc += ',' + (i + 1);
            }
        }
    });

    $.each(cur_rows, function (i, row) {
        $('#tab_fee_list_of_wof').datagrid('beginEdit', i);
    });

    if (!rFee_status) {
        $.messager.alert('错误', '费用中含有未交账费用，无法进行核销操作', 'error');
        return;
    }
    if (!rPay_status) {
        $.messager.alert('错误', '付款费用需通过审核之后才能进行核销操作', 'error');
        return;
    }

    var rec_or_pay_desc = (cur_rec_or_pay == 1) ? '收' : '付';
  
    if (error) {
        $.messager.alert('错误', '序号(' + error_desc + ')销账费用+已销费用超出总应' + rec_or_pay_desc + '费，无法执行销账操作', 'error');
        return;
    } 

    var par = {
        rnd: Math.random(),
        action: 'bat_judge_fee_finace_by_fee_seq',
        woa_rec_or_pay: cur_rec_or_pay,
        woa_bak: $.trim($('#wof_ff_woa_bak').val()),
        woa_cu_id: cur_rows[0].fee_cu_id,
        woa_bank_dat: $('#wof_ff_woa_bank_dat').datebox('getValue'),
        woa_typ: $('#wof_ff_woa_typ').combobox('getValue'),
        json_fee_details: JSON.stringify({ fee_details_list: cur_rows }),
    };
    if (par.woa_typ.length == 0) {
        $.messager.alert('错误', '错误:必须填写销账方式', 'error');
        return;
    }
    if (par.woa_bank_dat.length == 0) {
        $.messager.alert('错误', '错误:必须填写银行' + rec_or_pay_desc + '款时间', 'error');
        return;
    }
    post('../Ashx/checkaccount.ashx', par, function (data) {

        $('#tab_fee_list_of_wof').datagrid('loadData', data.data.fee_details_list);

        //直接打开编辑
        $.each(data.data.fee_details_list, function (i, row) {
            $('#tab_fee_list_of_wof').datagrid('beginEdit', i);
        });

        if (data.result == 1) {
            win_woa_or_iv_order_fee_operation_flag = 1; 
            $.messager.confirm('打印提示', '你已完成应' + rec_or_pay_desc + '核销操作是否进行打印？',
            function (r) {
                if (r) {
                    $('#window_of_finace_fee').window('close');
                    print_order_fee_of_woa(data.woa_seq);
                }
            });

        } else {
            $.messager.alert('错误', '错误:标记过程中发生错误', 'error');
        }
    }, true);
}
//关闭核销窗口
function close_flag_fee_finace_by_fee_seqs() {
    $('#window_of_finace_fee').window('close');
}

//打印 
function print_order_fee_of_woa(woa_seq) {
    parent.call_win_view_of_print('print_order_fee_by_woa_seq',woa_seq);
   
}
 
var cur_change_fee_list = undefined;
//打开更改账单费用界面
function open_change_checkaccount() {

    var selected_rows = $('#tab_fee_list').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误', '请选择费用条目后再执行此操作', 'error');
        return;
    }
    //只有费用状态为3才可修改
    //each中的 return只能跳出 each 循环
    //需要靠 参数辅助
    var bRgiht = true;
    $.each(selected_rows, function (i, item) {
        if (item.fee_status > 2) {
            bRgiht = false;
            return;
        }
        if (item.od_status_id != 1 || item.od_amc_id != undefined) {
            bRgiht = false;
            return;
        }
    });
    if (!bRgiht) {
        $.messager.alert('错误', '请选择费用未交账且所属委托未锁定审核的费用执行此操作', 'error');
        return false;
    }
    //加载费率
    get_rate(selected_rows[0].od_seq);


    init_tab_fee_list_of_change();
    cur_change_fee_list = $.extend(true, [], selected_rows);;

    var new_row_1 = $.extend(true, [], selected_rows);
     
    $("#tab_fee_list_of_change").datagrid('loadData', { total: new_row_1.length, rows: new_row_1 });

    table_bootom_selected_desc2($("#tab_fee_list_of_change"),  cur_rec_or_pay);

    $('#window_of_change_fee_details').window({ 
        onClose: function () { 
            load_order_fee(); 
        },
        toolbar: [{
            text: '关闭',
            iconCls: 'icon-close',
            handler: function () {
                $('#window_of_change_fee_details').window('close');
            }
        }]
    }).window('open'); 
}
function table_bootom_selected_desc3(target_tab, rec_or_pay) {
    var rows = target_tab.datagrid('getRows');

    var count = rows.length;

    var data_group = { 
        fee_amount: '',
        fee_amount_changed: '',
    };
    
     
    var data_cr_symbol_of_fee_amount = [];
    var panel_title = $('.all_group_order_fee_of_changed tbody tr').eq(0);
    if (cur_change_fee_list.length > 0) {
        //币种和金额  
        

        $.each(cur_change_fee_list, function (i, item) {

            var has_cr_fa = false;

            $.each(data_cr_symbol_of_fee_amount, function (fai, faitem) {
                if (faitem.fee_currency_symbol == item.fee_currency_symbol) {
                    faitem.amount_old += parseFloat(item.fee_amount);
                    faitem.amount = 0;
                    has_cr_fa = true;
                }
            });
            if (!has_cr_fa) {
                data_cr_symbol_of_fee_amount.push({
                    fee_currency_symbol: item.fee_currency_symbol,
                    amount_old: parseFloat(item.fee_amount),
                    amount :0 
                });
            } 
        }); 
    }
     
    if (rows.length > 0) {
        //币种和金额   
        $.each(rows, function (i, item) { 
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
        });
        var str_cr_symbol_of_fee_amount = '';
        var str_cr_symbol_of_fee_amount_changed = '';

        $.each(data_cr_symbol_of_fee_amount, function (i, item) {
            if (str_cr_symbol_of_fee_amount.length == 0) {
                str_cr_symbol_of_fee_amount = item.fee_currency_symbol + ':' + item.amount.toFixed(2);
            } else {
                str_cr_symbol_of_fee_amount += ',' + item.fee_currency_symbol + ':' + item.amount.toFixed(2);
            }

            if (str_cr_symbol_of_fee_amount_changed.length == 0) {
                str_cr_symbol_of_fee_amount_changed = item.fee_currency_symbol + ':' + ( (!item.amount_old?0:item.amount_old) - (!item.amount?0:item.amount)).toFixed(2);
            } else {
                str_cr_symbol_of_fee_amount_changed += ',' + item.fee_currency_symbol + ':' + ((!item.amount_old ? 0 : item.amount_old) - (!item.amount ? 0 : item.amount)).toFixed(2);
            }
        });
        data_group.fee_amount = str_cr_symbol_of_fee_amount
        data_group.fee_amount_changed = str_cr_symbol_of_fee_amount_changed
    }
    var temp = (rec_or_pay == 1 ? 'rec' : 'pay');
    var tmp2 = (rec_or_pay == 1 ? '收' : '付');
    var all_gd = '<td class="cls_total_title">修改后:</td>' +
                '<td class="cls_' + temp + '_value">' + data_group.fee_amount + '</td>' +
                '<td class="cls_total_title">差额:</td>' +
                '<td class="cls_' + temp + '_value">' + data_group.fee_amount_changed + '</td>';


    panel_title.html('').html(all_gd);
}
function table_bootom_selected_desc2(target_tab,   rec_or_pay) {
    var rows = target_tab.datagrid('getRows');

    var count = rows.length;

    var data_group = { 
        fee_amount: '', 
    };

    var panel_title = $('.all_group_order_fee_of_change tbody tr').eq(0);

    
    if (rows.length > 0) {
        //币种和金额  
        var data_cr_symbol_of_fee_amount = [];
      
        $.each(rows, function (i, item) {

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
           
 
             
        });
        var str_cr_symbol_of_fee_amount = '';

        $.each(data_cr_symbol_of_fee_amount, function (i, item) {
            if (str_cr_symbol_of_fee_amount.length == 0) {
                str_cr_symbol_of_fee_amount = item.fee_currency_symbol + ':' + item.amount.toFixed(2);
            } else {
                str_cr_symbol_of_fee_amount += ',' + item.fee_currency_symbol + ':' + item.amount.toFixed(2);
            }
        });

       

        data_group.fee_amount = str_cr_symbol_of_fee_amount
       
    }
    var temp = (rec_or_pay == 1 ? 'rec' : 'pay');
    var tmp2 = (rec_or_pay == 1 ? '收' : '付');
    var all_gd = '<td class="cls_total_title">修改前:</td>' +
                '<td class="cls_' + temp + '_value">' + data_group.fee_amount + '</td>' ;
              

    panel_title.html('').html(all_gd);
}
//关闭修改窗口
function close_change_checkaccount_fee() {
    $('#window_of_change_fee_details').window('close');
}

//实施修改 
function apply_change_fee_details(index) {

   
    var sel_rows = $('#tab_fee_list_of_change').datagrid('getChecked');
    if (sel_rows.length == 0) {
        $.messager.alert('错误提示', '错误:请勾选列表数据之后再部署修改', 'error');
        return;
    }
    ////结算单位
    //if (index == 1) {
    //    var fee_cu_id = $("#mulit_fee_cu_id").data('cu_id');
    //    var fee_cu_desc = $("#mulit_fee_cu_id").combogrid('getText');

    //    //检验数据,需要保证数据是正确的 

    //    if (isNaN(fee_cu_id)) {
    //        $.messager.alert('错误提示', '错误:' + fee_cu_desc + '不是预设的结算单位值', 'error');
    //        return;
    //    } else {
    //        //部署 
    //        $.each(sel_rows, function (i, row) {
    //            row.fee_cu_id = fee_cu_id;
    //            row.fee_cu_desc = fee_cu_desc;
    //            //标记更改 ,想和原来的值进行比较 

    //            var old_row = undefined;

    //            $.each(cur_change_fee_list, function (j, orow) {
    //                if (row.fee_seq == orow.fee_seq) {
    //                    old_row = orow;
    //                    return;
    //                }
    //            })

    //            if (row.fee_cu_id != old_row.fee_cu_id) {
    //                row.fee_cu_id_diff = 1;
    //            } else {
    //                row.fee_cu_id_diff = 0;
    //            }

    //            var index = $('#tab_fee_list_of_change').datagrid('getRowIndex', row);
    //            $('#tab_fee_list_of_change').datagrid('updateRow', {
    //                index: index,
    //                row: row
    //            });

    //        });
    //    }
    //}
    //税率
    if (index == 2) {
        var fee_invoice_typ = $("#mulit_fee_invoice_typ").combobox('getValue');
        var fee_invoice_typ_desc = $("#mulit_fee_invoice_typ").combobox('getText');
        //检验数据,需要保证数据是正确的 
        var exists_invoice_typ = false;
        $.each(basesetting.invoice_list, function (i, item) {
            if (item.in_id == fee_invoice_typ) {
                exists_invoice_typ = true;
            }
        });
        if (!exists_invoice_typ) {
            $.messager.alert('错误提示', '错误:' + fee_invoice_typ_desc + '不是预设的税率值', 'error');
            return;
        } else {
            //部署 
            $.each(sel_rows, function (i, row) {
                row.fee_invoice_typ = fee_invoice_typ;
                row.fee_invoice_typ_desc = fee_invoice_typ_desc;

                //标记更改 ,想和原来的值进行比较 

                var old_row = undefined;

                $.each(cur_change_fee_list, function (j, orow) {
                    if (row.fee_seq == orow.fee_seq) {
                        old_row = orow;
                        return;
                    }
                })

                if (row.fee_invoice_typ != old_row.fee_invoice_typ) {
                    row.fee_invoice_typ_diff = 1;
                } else {
                    row.fee_invoice_typ_diff = 0;
                }

                var index = $('#tab_fee_list_of_change').datagrid('getRowIndex', row);
                $('#tab_fee_list_of_change').datagrid('updateRow', {
                    index: index,
                    row: row
                });

            });
        }
    }
    //费项
    if (index == 3) {
        var fee_item_typ = $("#mulit_fee_item_typ").combobox('getValue');
        var fee_item_typ_desc = $("#mulit_fee_item_typ").combobox('getText');
        //检验数据,需要保证数据是正确的 
        var exists_fee_item_typ = false;
        $.each(basesetting.fee_item_list, function (i, item) {
            if (item.fee_id == fee_item_typ) {
                exists_fee_item_typ = true;
            }
        });
        if (!exists_fee_item_typ) {
            $.messager.alert('错误提示', '错误:' + fee_item_typ_desc + '不是预设的费项值', 'error');
            return;
        } else {
            //部署 
            $.each(sel_rows, function (i, row) {
                row.fee_item_typ = fee_item_typ;
                row.fee_item_typ_desc = fee_item_typ_desc;

                //标记更改 ,想和原来的值进行比较 

                var old_row = undefined;

                $.each(cur_change_fee_list, function (j, orow) {
                    if (row.fee_seq == orow.fee_seq) {
                        old_row = orow;
                        return;
                    }
                })

                if (row.fee_item_typ != old_row.fee_item_typ) {
                    row.fee_item_typ_diff = 1;
                } else {
                    row.fee_item_typ_diff = 0;
                }

                var index = $('#tab_fee_list_of_change').datagrid('getRowIndex', row);
                $('#tab_fee_list_of_change').datagrid('updateRow', {
                    index: index,
                    row: row
                });

            });
        }
    }
    //数量
    if (index == 4) {
        var fee_number = $("#mulit_fee_number").numberbox('getValue');

        if (isNaN(fee_number)) {
            $.messager.alert('错误提示', '错误:' + fee_number + '不是正确的数量格式', 'error');
            return;
        } else {
            if (Number(fee_number) == 0) {
                $.messager.alert('错误提示', '错误: 数量、单价、汇率不能是0', 'error');
                return;
            }
            //部署 
            $.each(sel_rows, function (i, row) {
                row.fee_number = fee_number;
                row.fee_amount = (row.fee_number * row.fee_price).toFixed(2);
                row.fee_amount_of_base_currency = (row.fee_number * row.fee_price * row.fee_currency_rate).toFixed(2);

                var old_row = undefined;

                $.each(cur_change_fee_list, function (j, orow) {
                    if (row.fee_seq == orow.fee_seq) {
                        old_row = orow;
                        return;
                    }
                });

                if (row.fee_number != old_row.fee_number) {
                    row.fee_number_diff = 1;
                } else {
                    row.fee_number_diff = 0;
                }

                var index = $('#tab_fee_list_of_change').datagrid('getRowIndex', row);
                $('#tab_fee_list_of_change').datagrid('updateRow', {
                    index: index,
                    row: row
                });

            });
        }
    }
    //单位
    if (index == 5) {
        var fee_unit = $("#mulit_fee_unit").combobox('getValue');
        var fee_unit_desc = $("#mulit_fee_unit").combobox('getText');
        //检验数据,需要保证数据是正确的 
        var exists_fee_unit = false;
        $.each(basesetting.unit_list, function (i, item) {
            if (item.u_id == fee_unit) {
                exists_fee_unit = true;
            }
        });
        if (!exists_fee_unit) {
            $.messager.alert('错误提示', '错误:' + fee_unit_desc + '不是预设的计量单位值', 'error');
            return;
        } else {
            //部署 
            $.each(sel_rows, function (i, row) {
                row.fee_unit = fee_unit;
                row.fee_unit_desc = fee_unit_desc;

                //标记更改 ,想和原来的值进行比较 

                var old_row = undefined;

                $.each(cur_change_fee_list, function (j, orow) {
                    if (row.fee_seq == orow.fee_seq) {
                        old_row = orow;
                        return;
                    }
                })

                if (row.fee_unit != old_row.fee_unit) {
                    row.fee_unit_diff = 1;
                } else {
                    row.fee_unit_diff = 0;
                }

                var index = $('#tab_fee_list_of_change').datagrid('getRowIndex', row);
                $('#tab_fee_list_of_change').datagrid('updateRow', {
                    index: index,
                    row: row
                });

            });
        }
    }
    //单价
    if (index == 6) {
        var fee_price = $("#mulit_fee_price").numberbox('getValue');

        if (isNaN(fee_price)) {
            $.messager.alert('错误提示', '错误:' + fee_price + '不是正确的单价格式', 'error');
            return;
        } else {
            if (Number(fee_price) == 0) {
                $.messager.alert('错误提示', '错误: 数量、单价、汇率不能是0', 'error');
                return;
            }
            //部署 
            $.each(sel_rows, function (i, row) {
                row.fee_price = fee_price;
                row.fee_amount = (row.fee_number * row.fee_price).toFixed(2);
                row.fee_amount_of_base_currency = (row.fee_number * row.fee_price * row.fee_currency_rate).toFixed(2);

                var old_row = undefined;

                $.each(cur_change_fee_list, function (j, orow) {
                    if (row.fee_seq == orow.fee_seq) {
                        old_row = orow;
                        return;
                    }
                });

                if (row.fee_price != old_row.fee_price) {
                    row.fee_price_diff = 1;
                } else {
                    row.fee_price_diff = 0;
                }

                var index = $('#tab_fee_list_of_change').datagrid('getRowIndex', row);
                $('#tab_fee_list_of_change').datagrid('updateRow', {
                    index: index,
                    row: row
                });

            });
        }
    }
    //币种
    if (index == 7) {
        var fee_currency_id = $("#mulit_fee_currency_id").combobox('getValue');
        var fee_currency_desc = $("#mulit_fee_currency_id").combobox('getText');
        //检验数据,需要保证数据是正确的 
        var exists_fee_currency_id = false;
        var fee_currency_symbol = undefined;
        $.each(basesetting.currency_list, function (i, item) {
            if (item.cr_id == fee_currency_id) {
                exists_fee_currency_id = true;
                fee_currency_symbol = item.cr_symbol;
            }
        });
        if (!exists_fee_currency_id) {
            $.messager.alert('错误提示', '错误:' + fee_currency_desc + '不是预设的计量单位值', 'error');
            return;
        } else {
            //部署 
            $.each(sel_rows, function (i, row) {
                row.fee_currency_id = fee_currency_id;
                row.fee_currency_desc = fee_currency_desc;
                row.fee_currency_symbol = fee_currency_symbol;
                //标记更改 ,想和原来的值进行比较 

                var old_row = undefined;

                $.each(cur_change_fee_list, function (j, orow) {
                    if (row.fee_seq == orow.fee_seq) {
                        old_row = orow;
                        return;
                    }
                })

                if (row.fee_currency_id != old_row.fee_currency_id) {
                    row.fee_currency_id_diff = 1;
                } else {
                    row.fee_currency_id_diff = 0;
                }

                var index = $('#tab_fee_list_of_change').datagrid('getRowIndex', row);
                $('#tab_fee_list_of_change').datagrid('updateRow', {
                    index: index,
                    row: row
                });

            });
        }
    }
    //汇率
    if (index == 8) {
        var fee_currency_rate = $("#mulit_fee_currency_rate").numberbox('getValue');

        if (isNaN(fee_currency_rate)) {
            $.messager.alert('错误提示', '错误:' + fee_currency_rate + '不是正确的汇率格式', 'error');
            return;
        } else {
            if (Number(fee_price) == 0) {
                $.messager.alert('错误提示', '错误: 数量、单价、汇率不能是0', 'error');
                return;
            }
            //部署 
            $.each(sel_rows, function (i, row) {
                row.fee_currency_rate = fee_currency_rate;

                var old_row = undefined;

                $.each(cur_change_fee_list, function (j, orow) {
                    if (row.fee_seq == orow.fee_seq) {
                        old_row = orow;
                        return;
                    }
                });

                if (row.fee_currency_rate != old_row.fee_currency_rate) {
                    row.fee_currency_rate_diff = 1;
                } else {
                    row.fee_currency_rate_diff = 0;
                }

                var index = $('#tab_fee_list_of_change').datagrid('getRowIndex', row);
                $('#tab_fee_list_of_change').datagrid('updateRow', {
                    index: index,
                    row: row
                });

            });
        }
    }
    if (index == 9) {
        $('#dlg_one_key_change_fee_currency').dialog({
            title: '一键本币转换',
            iconCls: 'icon-table_row',
            autoOpen: false,
            modal: true,
            width: 450,
            minHeight: 80,
            buttons: [
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#dlg_one_key_change_fee_currency').dialog('close');
                    }
                }, {
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () {
                        
                        //部署 
                        //找出本币ID 
                        var fee_currency_id = undefined;
                        var fee_currency_desc = undefined;
                        var fee_currency_symbol = undefined;
                        $.each(basesetting.currency_list, function (i, item) {
                            if (item.cr_name == '人民币') { 
                                fee_currency_symbol = item.cr_symbol;
                                fee_currency_id = item.cr_id;
                                fee_currency_desc = item.cr_name;
                            }
                        });

                        $.each(sel_rows, function (i, row) { 
                            row.fee_price = parseFloat( row.fee_currency_rate * row.fee_price).toFixed(2);
                            row.fee_amount = parseFloat(row.fee_currency_rate * row.fee_price * row.fee_number).toFixed(2);
                            row.fee_amount_of_base_currency = parseFloat(row.fee_currency_rate * row.fee_price * row.fee_number).toFixed(2);
                            row.fee_currency_rate = 1;
                            row.fee_currency_desc = fee_currency_desc;
                            row.fee_currency_id = fee_currency_id;
                            row.fee_currency_symbol = fee_currency_symbol; 
                            var old_row = undefined; 
                            $.each(cur_change_fee_list, function (j, orow) {
                                if (row.fee_seq == orow.fee_seq) {
                                    old_row = orow;
                                    return;
                                }
                            }); 
                            if (row.fee_currency_rate != old_row.fee_currency_rate) {
                                row.fee_currency_rate_diff = 1;
                            } else {
                                row.fee_currency_rate_diff = 0;
                            }
                            if (row.fee_currency_id != old_row.fee_currency_id) {
                                row.fee_currency_id_diff = 1;
                            } else {
                                row.fee_currency_id_diff = 0;
                            }
                            if (row.fee_price != old_row.fee_price) {
                                row.fee_price_diff = 1;
                            } else {
                                row.fee_price_diff = 0;
                            }
                            var index = $('#tab_fee_list_of_change').datagrid('getRowIndex', row);
                            $('#tab_fee_list_of_change').datagrid('updateRow', {
                                index: index,
                                row: row
                            });
                            table_bootom_selected_desc3($('#tab_fee_list_of_change'), cur_rec_or_pay);
                            $('#dlg_one_key_change_fee_currency').dialog('close');
                        });

                    }
                }]
        }).dialog('open');
    }
    table_bootom_selected_desc3($('#tab_fee_list_of_change'), cur_rec_or_pay);

}

//获取汇率
function get_rate(od_seq) {
    post('../Ashx/exchange_rate.ashx', {
        rnd: Math.random(),
        action: 'get_month_exchange_rate_by_od_seq',
        od_seq: od_seq
    }, function (data) {
        cur_ref_month_exchange_list = data.rows;
    }, true);
}

//更改账单费用
function change_checkaccount_fee() {

    //如果修改结算单位，保证 只有1个结算单位 
    //原来的账单数据 

    //当前的修改的数据 
    var fee_data = $("#tab_fee_list_of_change").datagrid('getData').rows;

    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'pre_update_fee_details',
        fee_date: JSON.stringify(fee_data)
    }, function (data) {
        if (data.result == 1) {
            $.messager.confirm('操作提示', '请是否执行此次批量修改?',
            function (r) {
                if (r) {

                    post('../Ashx/checkaccount.ashx', {
                        rnd: Math.random(),
                        action: 'update_fee_details', 
                        fee_date: JSON.stringify(fee_data)
                    }, function (data1) {
                        if (data1.result == 1) {
                            win_woa_or_iv_order_fee_operation_flag = 1;
                            $("#tab_fee_list_of_change").datagrid('loadData', data1.rows);
                            $.messager.alert('提示', data1.msg, 'info');
                        } else {
                            $.messager.alert('错误', data1.msg, 'error');
                            return;
                        }
                    }, true);
                }
            });
        } else {
            $.messager.alert('错误', data.msg, 'error');
            return;
        }
    }, true);
     
}


//智能计算金额
function auto_math() {
    var rows = $('#tab_fee_list_of_wof').datagrid('getRows');
    var total_woa_amount = $('#ed_woa_amount').val();


    $.each(rows, function (i, row) {
        if (Math.abs(total_woa_amount) > Math.abs(row.unwoa_total_amount)) {
            total_woa_amount = total_woa_amount - row.unwoa_total_amount;
            row.ed_unwoa_total_amount = row.unwoa_total_amount;
        } else {
            if (total_woa_amount != 0) {
                row.ed_unwoa_total_amount = total_woa_amount;
                total_woa_amount = 0;
            } else {
                row.ed_unwoa_total_amount = 0;
            }
        }
    });

    if (total_woa_amount != 0) {
        $.messager.alert('错误', '请注意: 费用超出总销账金额!', 'alert');
    }

    $('#tab_fee_list_of_wof').datagrid('loadData', rows);

    var rows = $('#tab_fee_list_of_wof').datagrid('getRows');
    var total = 0.0;
    $.each(rows, function (i, row) {
        var obj1 = $('#tab_fee_list_of_wof').datagrid('getEditor', { index: i, field: 'ed_unwoa_total_amount' }).target;

        if (!isNaN(obj1.val())) {
            total += parseFloat(obj1.val());
        }
    });

    $('.cls_now_woa').eq(0).html(total.toFixed(2));
}



//发票绑定 
function bind_combogrid_invoice_dlg($target) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'oi_no',
        data: [],
        //url: '../Ashx/checkaccount.ashx',
        //queryParams: {
        //    rnd: Math.random(),
        //    action: 'get_order_invoice_by_like_str_for_combogrid',
        //    oi_cu_id: $('#dlg_flag_invoice_cu_id').val(),
        //    like_str: guid()
        //},
        pagination: true,//是否分页  
        rownumbers: true,//序号  
        collapsible: false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: false,
        pageNumber: 1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20, 40],//可以设置每页记录条数的列表  
        method: 'post',
        columns: [[
                { field: 'oi_no', title: '发票号', width: 230 },
                { field: 'oi_total_money', title: '总金额', width: 110 },
                { field: 'oi_invoice_typ_desc', title: '税点', width: 210 },
                { field: 'oi_cu_desc', title: '结算单位', width: 210 },
                { field: 'oi_bak', title: '备注', width: 210 },
        ]],
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.oi_cu_id = $('#dlg_flag_invoice_cu_id').val();
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_order_invoice_by_like_str_for_combogrid';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('oi_seq', '');
                $('#dlg_tab_flag_invoice_files').datagrid('loadData', []);
            },
        },
        onSelect: function (index, item) {              //选中处理   
            $target.data('oi_seq', item.oi_seq);
            $target.combogrid('setText', item.oi_no);

            $('#dlg_sh_invoice_typ_desc').val(item.oi_invoice_typ_desc);
            $('#dlg_ed_oi_limit_dat').datebox('setValue', item.oi_limit_dat == undefined ? '' : dateformat(item.oi_limit_dat, true));
            $('#dlg_ed_oi_bak').val(item.oi_bak);
            $('#dlg_sh_total_money').val(item.oi_total_money == undefined ? 0 : item.oi_total_money.toFixed(2));

            //后台获取发票图片  
            post('../Ashx/checkaccount.ashx', {
                rnd: Math.random(),
                action: 'get_order_invoice_file',
                oi_seq: item.oi_seq
            }, function (data) {
                $('#dlg_tab_flag_invoice_files').datagrid('loadData', data);
            }, false);
        }
    });
    $target.combogrid('grid').datagrid('options').url = '../Ashx/checkaccount.ashx';
    $target.combogrid('grid').datagrid('options').queryParams = {
        rnd: Math.random(),
        action: 'get_order_invoice_by_like_str_for_combogrid',
        oi_cu_id: $('#dlg_flag_invoice_cu_id').val(),
        like_str: guid()
    };
} 
//查看业务简报 
function win_view_of_short_order_info() {  
    parent.call_win_view_of_short_order_info(cur_mm_select_row.od_seq, cur_mm_select_row.od_no);
}
//查看客户银行账户信息
function win_view_of_bank_info_from_list() {
   
    parent.call_win_view_of_bank_info_from_list(cur_mm_select_row.fee_cu_id);
}
//查看审核流程
function win_view_of_approval_details_from_list() {
   
    var amc_id = cur_mm_select_row.od_amc_id;
    if (amc_id == undefined || amc_id.length == 0) {
        $.messager.alert('错误', '错误: 未提交业务审核', 'error');
        return;
    }
    parent.call_win_view_of_approval_details_from_list(amc_id); 
}
//通知上级刷新 
function call_parent_refresh() {
    parent.refresh_from_woa_or_iv_update();
}
//通知上级关闭
function call_parent_close_win() {
    parent.close_win_of_woa_or_iv_update();
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