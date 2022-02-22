
var rel_beg_dat = undefined;
var rel_end_dat = undefined;

var od_uncover_list = [];
var od_cover_list = [];
var od_uncover_remove_list = [];

var uncover_columns_fliters = undefined;
var uncover_remove_columns_fliters = undefined;
var cover_columns_fliters = undefined;

$(document).ready(function () {
    $('#dlg_post_hr_commit_profit_amc').dialog({
        title: '提交提成审核',
        iconCls: 'icon-lock',
        autoOpen: false,
        modal: true,
        width: 450,
        minheight: 100,
        buttons: [
            {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_post_hr_commit_profit_amc').dialog('close');
                }
            }
        ]
    }).dialog('close');

    rel_beg_dat = getQueryVariable('woa_beg_dat');
    rel_end_dat = getQueryVariable('woa_end_dat');

    $('#rel_beg_dat').val(rel_beg_dat);
    $('#rel_end_dat').val(rel_end_dat);

    init_cover_tab();
    init_uncover_tab();
    init_uncover_remove_tab();
    refresh_tab();
});

function refresh_tab() {
    post('../Ashx/hr_commit_profit.ashx', {
        rnd: Math.random(),
        action: 'get_woa_group_of_sb',
        woa_beg_dat: rel_beg_dat,
        woa_end_dat: rel_end_dat
    }, function (data) {
        if (data.total > 0) {
            $.each(data.rows, function (i, item) {
                if (item.cover_flag == 1) {
                    od_cover_list.push(item);
                } else {
                    item.del = 0;
                    od_uncover_list.push(item);
                }
            });
            
            uncover_remove_columns_fliters.columns_fliters('reset_target_data_and_clumns_fliter', od_uncover_remove_list);
            uncover_columns_fliters.columns_fliters('reset_target_data_and_clumns_fliter', od_uncover_list); 
            cover_columns_fliters.columns_fliters('reset_target_data_and_clumns_fliter', od_cover_list);

            if (od_cover_list.length == 0) {
                 
                $('#tabs_amc').tabs('close', 2);
            }
        }
    }, true);
}

//初始化 订单列表
function init_uncover_tab() {
    $("#od_uncover_list").datagrid({
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
        toolbar: '#od_uncover_list_bar',
        emptyMsg: '无法找到相关数值',
        showFooter: true,
        frozenColumns: [[
            { title: '', field: 'od_seq', width: 40, checkbox: true },
            {
                field: 'od_status_desc', rowspan: 2, title: '状态', width: 50, sortable: true,
                styler: function (value, row, index) {
                    if (row.od_status_id == 1) {
                        if (row.amc_status == 0) return 'background-color:#dcdcdc;color:#000;';
                        else return 'background-color:#ffccb1;color:#000;';
                    } else if (row.od_status_id == 2) {
                        return 'background-color:#f9752e;color:#FFF;';
                    } else if (row.od_status_id == 3) {
                        return 'background-color:#02e251;color:#000;';
                    }
                }

            }
            , {
                field: 'od_no', rowspan: 2, title: '业务编号', width: 90, sortable: true,

            }
            , {
                field: 'od_fee_dat', title: '业务时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
        ]],
        columns: [[
            { title: '基本信息', align: 'center', colspan: 12 },
            { title: '应收应付汇总', align: 'center', colspan: 4 },
            { title: '应收详细', align: 'center', colspan: 8 },
        ], [
                { field: 'od_typ_desc', title: '业务类型', sortable: true, width: 70 } 
                , { field: 'od_trade_typ_desc', title: '内外', sortable: true, width: 40, }
                , {
                    field: 'od_i_e_id', title: '进出口', sortable: true, width: 40,
                    formatter: function (value, row, index) {
                        if (value == undefined) return '';
                        else {
                            if (value == 'I') return '进口';
                            if (value == 'E') return '出口';
                        }
                    }
                }
                , { field: 'od_beg_place_desc', title: '起运地', sortable: true, width: 80, }
                , { field: 'od_end_place_desc', title: '目的地', sortable: true, width: 80, }
                , { field: 'od_freight_desc', title: '承运条款', sortable: true, width: 60, }
                , { field: 'od_delegate_cu_desc', title: '委托客户', sortable: true, width: 140, }
                , { field: 'od_operation_nam', title: '操作', sortable: true, width: 80, }
                , { field: 'od_sales_nam', title: '销售', sortable: true, width: 80, }
                , { field: 'od_service_nam', title: '客服', sortable: true, width: 80, }

                , { field: 'od_cargo_typ_desc', title: '品名', sortable: true, width: 80, }
                
                , {
                    field: 'od_main_bill_no', title: '提单', sortable: true, width: 160

                }
                , {
                    field: 'rec_total_amount_desc', title: '应收小计', sortable: true, width: 165,
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
                    field: 'percent_profit', title: '毛利率', width: 65, sortable: true,
                }
                , {
                    field: 'fee_amount_of_base', title: '折算本币', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_rmb', title: '人民币', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_usd', title: '美元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_eur', title: '欧元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_jpy', title: '日元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'last_woa_dat', title: '最晚回款日期', width: 85, sortable: true,
                    formatter: function (value, row, index) {
                        return dateformat(value,true);
                    }
                }
                , {
                    field: 'max_return_days', title: '最长回款天数', width: 85, sortable: true,
                }
        ]],
        onLoadSuccess: function (data) {

            if (uncover_columns_fliters == undefined) {
                uncover_columns_fliters = $('#uncover_columns_fliters').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#od_uncover_list'),
                    cur_cls_target_body: 'cls_uncover'
                });
            }

            var total_base = 0;
            var total_rmb = 0;
            var total_usd = 0;
            var total_jpy = 0;
            var total_eur = 0;

            var has_rmb = false;
            var has_usd = false;
            var has_jpy = false;
            var has_eur = false;

            $.each(data.rows, function (i, item) {

                total_base += item.fee_amount_of_base;
                total_eur += item.fee_amount_of_eur;
                total_rmb += item.fee_amount_of_rmb;
                total_jpy += item.fee_amount_of_jpy;
                total_usd += item.fee_amount_of_usd;

                if (item.fee_amount_of_jpy > 0) {
                    has_jpy = true;
                }
                if (item.fee_amount_of_usd > 0) {
                    has_usd = true;
                }
                if (item.fee_amount_of_eur > 0) {
                    has_eur = true;
                }
                if (item.fee_amount_of_rmb > 0) {
                    has_rmb = true;
                }
            });
            if (!has_rmb) {
                $('#od_uncover_list').datagrid('hideColumn', 'fee_amount_of_rmb');
            } else {
                $('#od_uncover_list').datagrid('showColumn', 'fee_amount_of_rmb');
            }
            if (!has_usd) {
                $('#od_uncover_list').datagrid('hideColumn', 'fee_amount_of_usd');
            } else {
                $('#od_uncover_list').datagrid('showColumn', 'fee_amount_of_usd');
            }
            if (!has_jpy) {
                $('#od_uncover_list').datagrid('hideColumn', 'fee_amount_of_jpy');
            } else {
                $('#od_uncover_list').datagrid('showColumn', 'fee_amount_of_jpy');
            }
            if (!has_eur) {
                $('#od_uncover_list').datagrid('hideColumn', 'fee_amount_of_eur');
            } else {
                $('#od_uncover_list').datagrid('showColumn', 'fee_amount_of_eur');
            }

            var panel_title = $('.all_group_uncover tbody tr').eq(0);
            var all_gd = '<td class="cls_total_title">委托总数:</td><td class="cls_total_value">' + data.rows.length + '</td>' +
                '<td class="cls_rec_title">折算本币:</td><td class="cls_rec_value">' + total_base.toFixed(2) + '</td>';
            if (total_rmb != 0) {
                all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_rmb.toFixed(2) + '</td>';
            }
            if (total_usd != 0) {
                all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_usd.toFixed(2) + '</td>';
            }
            if (total_jpy != 0) {
                all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_jpy.toFixed(2) + '</td>';
            }
            if (total_eur != 0) {
                all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_eur.toFixed(2) + '</td>';
            }
                
            panel_title.html('').html(all_gd);

            
            refresh_uncover_of_footer();

        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#od_uncover_list'), rowIndex);

            refresh_uncover_of_footer();
        },
        onCheck: function (index, row) {
            refresh_uncover_of_footer();
        },
        onUncheck: function (index, row) {
            refresh_uncover_of_footer();
        },
        onCheckAll: function (index, row) {
            refresh_uncover_of_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_uncover_of_footer();
        },
        onDblClickRow: function (index, row) {
            //这里 应该 改一下 
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#window_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        },
    });
}
function refresh_uncover_of_footer() {
    var rows = $('#od_uncover_list').datagrid('getChecked');
    var total_base = 0;
    var total_rmb = 0;
    var total_usd = 0;
    var total_jpy = 0;
    var total_eur = 0; 

    if (rows.length > 0) {
        $.each(rows, function (i, item) { 
            total_base += item.fee_amount_of_base;
            total_eur += item.fee_amount_of_eur;
            total_rmb += item.fee_amount_of_rmb;
            total_jpy += item.fee_amount_of_jpy;
            total_usd += item.fee_amount_of_usd;
        });
    }
    
    var panel_title = $('.selected_group_uncover tbody tr').eq(0);
    var all_gd = '<td class="cls_total_title">当前选择&nbsp;委托总数:</td><td class="cls_total_value">' + rows.length + '</td>' +
        '<td class="cls_rec_title">折算本币:</td><td class="cls_rec_value">' + total_base.toFixed(2) + '</td>';
    if (total_rmb != 0) {
        all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_rmb.toFixed(2) + '</td>';
    }
    if (total_usd != 0) {
        all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_usd.toFixed(2) + '</td>';
    }
    if (total_jpy != 0) {
        all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_jpy.toFixed(2) + '</td>';
    }
    if (total_eur != 0) {
        all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_eur.toFixed(2) + '</td>';
    } 
    panel_title.html('').html(all_gd);
}

function clear_uncover_tab_fee_list_op() {
    uncover_columns_fliters.columns_fliters('clear');
}

//移除
function remove_uncover_data() {
    var rows = $('#od_uncover_list').datagrid('getChecked');

    if (rows.length == 0) {
        $.messager.alert('错误提示','请选择委托之后进行移除操作','error');
        return;
    }
    

    $.messager.confirm('移除委托提示', '确定要将选中的' + rows.length + '行委托转入到移除数据中(PS：转入后可从移除列表恢复)?', function (r) {
        if (r) {
            var new_uncover_list = [];

            $.each(rows, function (d, ditem) {
                od_uncover_remove_list.push(ditem);
            });

            $.each(od_uncover_list, function (o, oitem) {
                var has = false;
                $.each(rows, function (d, ditem) {

                    if (oitem.od_seq == ditem.od_seq) {
                        has = true;
                    }
                });

                if (!has) {
                    new_uncover_list.push(oitem);
                }
            });

            od_uncover_list = new_uncover_list;

            uncover_remove_columns_fliters.columns_fliters('reset_target_data_only', od_uncover_remove_list);
            uncover_columns_fliters.columns_fliters('reset_target_data_only', od_uncover_list);
            
            $.messager.alert('操作提示','完成移除委托操作','info');
        }
    });

    
}


function init_uncover_remove_tab() {
    $("#od_uncover_remove_list").datagrid({
        data: [],
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        toolbar: '#od_uncover_remove_list_bar',
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        emptyMsg: '无法找到相关数值',
        showFooter: true,
        frozenColumns: [[
            { title: '', field: 'od_seq', width: 40, checkbox: true },
            {
                field: 'od_status_desc', rowspan: 2, title: '状态', width: 50, sortable: true,
                styler: function (value, row, index) {
                    if (row.od_status_id == 1) {
                        if (row.amc_status == 0) return 'background-color:#dcdcdc;color:#000;';
                        else return 'background-color:#ffccb1;color:#000;';
                    } else if (row.od_status_id == 2) {
                        return 'background-color:#f9752e;color:#FFF;';
                    } else if (row.od_status_id == 3) {
                        return 'background-color:#02e251;color:#000;';
                    }
                }

            }
            , {
                field: 'od_no', rowspan: 2, title: '业务编号', width: 90, sortable: true,

            }
            , {
                field: 'od_fee_dat', title: '业务时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
        ]],
        columns: [[
            { title: '基本信息', align: 'center', colspan: 12 },
            { title: '应收应付汇总', align: 'center', colspan: 4 },
            { title: '应收详细', align: 'center', colspan: 8 },
        ], [
                { field: 'od_typ_desc', title: '业务类型', sortable: true, width: 70 }
                , { field: 'od_trade_typ_desc', title: '内外', sortable: true, width: 40, }
                , {
                    field: 'od_i_e_id', title: '进出口', sortable: true, width: 40,
                    formatter: function (value, row, index) {
                        if (value == undefined) return '';
                        else {
                            if (value == 'I') return '进口';
                            if (value == 'E') return '出口';
                        }
                    }
                }
                , { field: 'od_beg_place_desc', title: '起运地', sortable: true, width: 80, }
                , { field: 'od_end_place_desc', title: '目的地', sortable: true, width: 80, }
                , { field: 'od_freight_desc', title: '承运条款', sortable: true, width: 60, }
                , { field: 'od_delegate_cu_desc', title: '委托客户', sortable: true, width: 140, }
                , { field: 'od_operation_nam', title: '操作', sortable: true, width: 80, }
                , { field: 'od_sales_nam', title: '销售', sortable: true, width: 80, }
                , { field: 'od_service_nam', title: '客服', sortable: true, width: 80, }

                , { field: 'od_cargo_typ_desc', title: '品名', sortable: true, width: 80, }

                , {
                    field: 'od_main_bill_no', title: '提单', sortable: true, width: 160

                }
                , {
                    field: 'rec_total_amount_desc', title: '应收小计', sortable: true, width: 165,
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
                    field: 'percent_profit', title: '毛利率', width: 65, sortable: true,
                }
                , {
                    field: 'fee_amount_of_base', title: '折算本币', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_rmb', title: '人民币', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_usd', title: '美元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_eur', title: '欧元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_jpy', title: '日元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'last_woa_dat', title: '最晚回款日期', width: 85, sortable: true,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'max_return_days', title: '最长回款天数', width: 85, sortable: true,
                }
        ]],
        onLoadSuccess: function (data) {

            if (uncover_remove_columns_fliters == undefined) {
                uncover_remove_columns_fliters = $('#uncover_remove_columns_fliters').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#od_uncover_remove_list'),
                    cur_cls_target_body: 'cls_uncover_remove'
                });
            }

            var total_base = 0;
            var total_rmb = 0;
            var total_usd = 0;
            var total_jpy = 0;
            var total_eur = 0;

            var has_rmb = false;
            var has_usd = false;
            var has_jpy = false;
            var has_eur = false;

            $.each(data.rows, function (i, item) {

                total_base += item.fee_amount_of_base;
                total_eur += item.fee_amount_of_eur;
                total_rmb += item.fee_amount_of_rmb;
                total_jpy += item.fee_amount_of_jpy;
                total_usd += item.fee_amount_of_usd;

                if (item.fee_amount_of_jpy > 0) {
                    has_jpy = true;
                }
                if (item.fee_amount_of_usd > 0) {
                    has_usd = true;
                }
                if (item.fee_amount_of_eur > 0) {
                    has_eur = true;
                }
                if (item.fee_amount_of_rmb > 0) {
                    has_rmb = true;
                }
            });
            if (!has_rmb) {
                $('#od_uncover_remove_list').datagrid('hideColumn', 'fee_amount_of_rmb');
            } else {
                $('#od_uncover_remove_list').datagrid('showColumn', 'fee_amount_of_rmb');
            }
            if (!has_usd) {
                $('#od_uncover_remove_list').datagrid('hideColumn', 'fee_amount_of_usd');
            } else {
                $('#od_uncover_remove_list').datagrid('showColumn', 'fee_amount_of_usd');
            }
            if (!has_jpy) {
                $('#od_uncover_remove_list').datagrid('hideColumn', 'fee_amount_of_jpy');
            } else {
                $('#od_uncover_remove_list').datagrid('showColumn', 'fee_amount_of_jpy');
            }
            if (!has_eur) {
                $('#od_uncover_remove_list').datagrid('hideColumn', 'fee_amount_of_eur');
            } else {
                $('#od_uncover_remove_list').datagrid('showColumn', 'fee_amount_of_eur');
            }

            var panel_title = $('.all_group_uncover_remove tbody tr').eq(0);
            var all_gd = '<td class="cls_total_title">委托总数:</td><td class="cls_total_value">' + data.rows.length + '</td>' +
                '<td class="cls_rec_title">折算本币:</td><td class="cls_rec_value">' + total_base.toFixed(2) + '</td>';
            if (total_rmb != 0) {
                all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_rmb.toFixed(2) + '</td>';
            }
            if (total_usd != 0) {
                all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_usd.toFixed(2) + '</td>';
            }
            if (total_jpy != 0) {
                all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_jpy.toFixed(2) + '</td>';
            }
            if (total_eur != 0) {
                all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_eur.toFixed(2) + '</td>';
            }

            panel_title.html('').html(all_gd);


            refresh_uncover_remove_of_footer();

        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#od_uncover_remove_list'), rowIndex);

            refresh_uncover_remove_of_footer();
        },
        onCheck: function (index, row) {
            refresh_uncover_remove_of_footer();
        },
        onUncheck: function (index, row) {
            refresh_uncover_remove_of_footer();
        },
        onCheckAll: function (index, row) {
            refresh_uncover_remove_of_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_uncover_remove_of_footer();
        },
        onDblClickRow: function (index, row) {
            //这里 应该 改一下 
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#window_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        },
    });
}

function refresh_uncover_remove_of_footer() {
    var rows = $('#od_uncover_remove_list').datagrid('getChecked');
    var total_base = 0;
    var total_rmb = 0;
    var total_usd = 0;
    var total_jpy = 0;
    var total_eur = 0;

    if (rows.length > 0) {
        $.each(rows, function (i, item) {
            total_base += item.fee_amount_of_base;
            total_eur += item.fee_amount_of_eur;
            total_rmb += item.fee_amount_of_rmb;
            total_jpy += item.fee_amount_of_jpy;
            total_usd += item.fee_amount_of_usd;
        });
    }

    var panel_title = $('.selected_group_uncover_remove tbody tr').eq(0);
    var all_gd = '<td class="cls_total_title">当前选择&nbsp;委托总数:</td><td class="cls_total_value">' + rows.length + '</td>' +
        '<td class="cls_rec_title">折算本币:</td><td class="cls_rec_value">' + total_base.toFixed(2) + '</td>';
    if (total_rmb != 0) {
        all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_rmb.toFixed(2) + '</td>';
    }
    if (total_usd != 0) {
        all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_usd.toFixed(2) + '</td>';
    }
    if (total_jpy != 0) {
        all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_jpy.toFixed(2) + '</td>';
    }
    if (total_eur != 0) {
        all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_eur.toFixed(2) + '</td>';
    }
    panel_title.html('').html(all_gd);
}

function clear_uncover_remove_tab_fee_list_op() {
    uncover_columns_fliters.columns_fliters('clear');
}

//移回
function return_uncover_data() {
    var rows = $('#od_uncover_remove_list').datagrid('getChecked');

    if (rows.length == 0) {
        $.messager.alert('错误提示', '请选择委托之后进行恢复操作', 'error');
        return;
    }

    $.messager.confirm('恢复委托提示', '确定要将选中的' + rows.length + '行委托转回到申报数据中?', function (r) {
        if (r) {
            var new_uncover_remove_list = [];

            $.each(rows, function (d, ditem) {
                od_uncover_list.push(ditem);
            });

            $.each(od_uncover_remove_list, function (o, oitem) {
                var has = false;
                $.each(rows, function (d, ditem) {

                    if (oitem.od_seq == ditem.od_seq) {
                        has = true;
                    }
                });

                if (!has) {
                    new_uncover_remove_list.push(oitem);
                }
            });

            od_uncover_remove_list = new_uncover_remove_list;

            uncover_remove_columns_fliters.columns_fliters('reset_target_data_only', od_uncover_remove_list);
            uncover_columns_fliters.columns_fliters('reset_target_data_only', od_uncover_list);
            $.messager.alert('操作提示', '完成委托转回申报操作', 'info');
        }
    });
}


//初始化 订单列表
function init_cover_tab() {
    $("#od_cover_list").datagrid({
        data:[],
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        toolbar: '#od_cover_list_bar', 
        collapsible: false,
        fit: true, 
        emptyMsg: '无法找到相关数值', 
        showFooter: true,
        frozenColumns: [[
            { title: '', field: 'od_seq', width: 40, checkbox: true },
            {
                field: 'od_status_desc', rowspan: 2, title: '状态', width: 50, sortable: true,
                styler: function (value, row, index) {
                    if (row.od_status_id == 1) {
                        if (row.amc_status == 0) return 'background-color:#dcdcdc;color:#000;';
                        else return 'background-color:#ffccb1;color:#000;';
                    } else if (row.od_status_id == 2) {
                        return 'background-color:#f9752e;color:#FFF;';
                    } else if (row.od_status_id == 3) {
                        return 'background-color:#02e251;color:#000;';
                    }
                }

            }
            , {
                field: 'od_no', rowspan: 2, title: '业务编号', width: 90, sortable: true,

            }
            , {
                field: 'od_fee_dat', title: '业务时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
        ]],
        columns: [[
            { title: '基本信息', align: 'center', colspan: 12 },
            { title: '应收应付汇总', align: 'center', colspan: 4 },
            { title: '应收详细', align: 'center', colspan: 7 },
            { title: '异常', align: 'center', colspan: 6 },
        ], [
                { field: 'od_typ_desc', title: '业务类型', sortable: true, width: 70 }
                , { field: 'od_trade_typ_desc', title: '内外', sortable: true, width: 40, }
                , {
                    field: 'od_i_e_id', title: '进出口', sortable: true, width: 40,
                    formatter: function (value, row, index) {
                        if (value == undefined) return '';
                        else {
                            if (value == 'I') return '进口';
                            if (value == 'E') return '出口';
                        }
                    }
                }
                , { field: 'od_beg_place_desc', title: '起运地', sortable: true, width: 80, }
                , { field: 'od_end_place_desc', title: '目的地', sortable: true, width: 80, }
                , { field: 'od_freight_desc', title: '承运条款', sortable: true, width: 60, }
                , { field: 'od_delegate_cu_desc', title: '委托客户', sortable: true, width: 140, }
                , { field: 'od_operation_nam', title: '操作', sortable: true, width: 80, }
                , { field: 'od_sales_nam', title: '销售', sortable: true, width: 80, }
                , { field: 'od_service_nam', title: '客服', sortable: true, width: 80, }

                , { field: 'od_cargo_typ_desc', title: '品名', sortable: true, width: 80, }

                , {
                    field: 'od_main_bill_no', title: '提单', sortable: true, width: 160

                }
                , {
                    field: 'rec_total_amount_desc', title: '应收小计', sortable: true, width: 165,
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
                    field: 'percent_profit', title: '毛利率', width: 65, sortable: true,
                }
                , {
                    field: 'fee_amount_of_base', title: '折算本币', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_rmb', title: '人民币', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_usd', title: '美元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_eur', title: '欧元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'fee_amount_of_jpy', title: '日元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'last_woa_dat', title: '最晚回款日期', width: 85, sortable: true,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'max_return_days', title: '最长回款天数', width: 85, sortable: true,
                }
                , {
                    field: 'rel_hr_commit_title', title: '前次提成申请', width: 285, sortable: true,
                } 
                , {
                    field: 'pre_fee_amount_of_base', title: '折算本币', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'pre_fee_amount_of_rmb', title: '人民币', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'pre_fee_amount_of_usd', title: '美元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'pre_fee_amount_of_eur', title: '欧元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'pre_fee_amount_of_jpy', title: '日元', width: 75, sortable: true,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
        ]],
        onLoadSuccess: function (data) {

            if (cover_columns_fliters == undefined) {
                cover_columns_fliters = $('#cover_columns_fliters').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#od_cover_list'),
                    cur_cls_target_body: 'cls_cover'
                });
            }

            var total_base = 0;
            var total_rmb = 0;
            var total_usd = 0;
            var total_jpy = 0;
            var total_eur = 0;

            var total_pre_base = 0;
            var total_pre_rmb = 0;
            var total_pre_usd = 0;
            var total_pre_jpy = 0;
            var total_pre_eur = 0;

            var total_diff_base = 0;
            var total_diff_rmb = 0;
            var total_diff_usd = 0;
            var total_diff_jpy = 0;
            var total_diff_eur = 0;

            var has_rmb = false;
            var has_usd = false;
            var has_jpy = false;
            var has_eur = false;

            $.each(data.rows, function (i, item) {
                total_pre_base += item.pre_fee_amount_of_base;
                total_pre_eur += item.pre_fee_amount_of_eur;
                total_pre_rmb += item.pre_fee_amount_of_rmb;
                total_pre_jpy += item.pre_fee_amount_of_jpy;
                total_pre_usd += item.pre_fee_amount_of_usd;

                total_base += item.fee_amount_of_base;
                total_eur += item.fee_amount_of_eur;
                total_rmb += item.fee_amount_of_rmb;
                total_jpy += item.fee_amount_of_jpy;
                total_usd += item.fee_amount_of_usd;


                total_diff_base += total_base - total_pre_base;
                total_diff_eur += total_eur - total_pre_eur;
                total_diff_rmb += total_rmb - total_pre_rmb;
                total_diff_jpy += total_jpy - total_pre_jpy;
                total_diff_usd += total_usd - total_pre_usd;

                if (item.fee_amount_of_jpy > 0) {
                    has_jpy = true;
                }
                if (item.fee_amount_of_usd > 0) {
                    has_usd = true;
                }
                if (item.fee_amount_of_eur > 0) {
                    has_eur = true;
                }
                if (item.fee_amount_of_rmb > 0) {
                    has_rmb = true;
                }
            });
            if (!has_rmb) {
                $('#od_cover_list').datagrid('hideColumn', 'fee_amount_of_rmb');
            } else {
                $('#od_cover_list').datagrid('showColumn', 'fee_amount_of_rmb');
            }
            if (!has_usd) {
                $('#od_cover_list').datagrid('hideColumn', 'fee_amount_of_usd');
            } else {
                $('#od_cover_list').datagrid('showColumn', 'fee_amount_of_usd');
            }
            if (!has_jpy) {
                $('#od_cover_list').datagrid('hideColumn', 'fee_amount_of_jpy');
            } else {
                $('#od_cover_list').datagrid('showColumn', 'fee_amount_of_jpy');
            }
            if (!has_eur) {
                $('#od_cover_list').datagrid('hideColumn', 'fee_amount_of_eur');
            } else {
                $('#od_cover_list').datagrid('showColumn', 'fee_amount_of_eur');
            }

            var panel_title = $('.all_group_cover tbody tr').eq(0);
            var all_gd = '<td class="cls_total_title">委托总数:</td><td class="cls_total_value">' + data.rows.length + '</td>' +
                '<td class="cls_rec_title">当前&nbsp;&nbsp;折算本币:</td><td class="cls_rec_value">' + total_base.toFixed(2) + '</td>';
            if (total_rmb != 0) {
                all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_rmb.toFixed(2) + '</td>';
            }
            if (total_usd != 0) {
                all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_usd.toFixed(2) + '</td>';
            }
            if (total_jpy != 0) {
                all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_jpy.toFixed(2) + '</td>';
            }
            if (total_eur != 0) {
                all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_eur.toFixed(2) + '</td>';
            }

            all_gd += '<td class="cls_rec_title">前次&nbsp;&nbsp;折算本币:</td><td class="cls_rec_value">' + total_pre_base.toFixed(2) + '</td>';
            if (total_pre_rmb != 0) {
                all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_pre_rmb.toFixed(2) + '</td>';
            }
            if (total_pre_usd != 0) {
                all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_pre_usd.toFixed(2) + '</td>';
            }
            if (total_pre_jpy != 0) {
                all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_pre_jpy.toFixed(2) + '</td>';
            }
            if (total_pre_eur != 0) {
                all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_pre_eur.toFixed(2) + '</td>';
            }

            all_gd += '<td class="cls_rec_title">差额&nbsp;&nbsp;折算本币:</td><td class="cls_rec_value">' + total_diff_base.toFixed(2) + '</td>';
            if (total_diff_rmb != 0) {
                all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_diff_rmb.toFixed(2) + '</td>';
            }
            if (total_diff_usd != 0) {
                all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_diff_usd.toFixed(2) + '</td>';
            }
            if (total_diff_jpy != 0) {
                all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_diff_jpy.toFixed(2) + '</td>';
            }
            if (total_diff_eur != 0) {
                all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_diff_eur.toFixed(2) + '</td>';
            }

            panel_title.html('').html(all_gd);


            refresh_cover_of_footer();

        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#od_cover_list'), rowIndex);

            refresh_cover_of_footer();
        },
        onCheck: function (index, row) {
            refresh_cover_of_footer();
        },
        onUncheck: function (index, row) {
            refresh_cover_of_footer();
        },
        onCheckAll: function (index, row) {
            refresh_cover_of_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_cover_of_footer();
        },
        onDblClickRow: function (index, row) {
            //这里 应该 改一下 
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#window_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        },
    });
}


function refresh_cover_of_footer() {
    var rows = $('#od_cover_list').datagrid('getChecked');
    var total_base = 0;
    var total_rmb = 0;
    var total_usd = 0;
    var total_jpy = 0;
    var total_eur = 0;
    var total_pre_base = 0;
    var total_pre_rmb = 0;
    var total_pre_usd = 0;
    var total_pre_jpy = 0;
    var total_pre_eur = 0;

    var total_diff_base = 0;
    var total_diff_rmb = 0;
    var total_diff_usd = 0;
    var total_diff_jpy = 0;
    var total_diff_eur = 0;
    if (rows.length > 0) {
        $.each(rows, function (i, item) {
            total_pre_base += item.pre_fee_amount_of_base;
            total_pre_eur += item.pre_fee_amount_of_eur;
            total_pre_rmb += item.pre_fee_amount_of_rmb;
            total_pre_jpy += item.pre_fee_amount_of_jpy;
            total_pre_usd += item.pre_fee_amount_of_usd;

            total_base += item.fee_amount_of_base;
            total_eur += item.fee_amount_of_eur;
            total_rmb += item.fee_amount_of_rmb;
            total_jpy += item.fee_amount_of_jpy;
            total_usd += item.fee_amount_of_usd;


            total_diff_base += total_base - total_pre_base;
            total_diff_eur += total_eur - total_pre_eur;
            total_diff_rmb += total_rmb - total_pre_rmb;
            total_diff_jpy += total_jpy - total_pre_jpy;
            total_diff_usd += total_usd - total_pre_usd;

        });
    }

    var panel_title = $('.selected_group_cover tbody tr').eq(0);
    var all_gd = '<td class="cls_total_title">当前选择&nbsp;委托总数:</td><td class="cls_total_value">' + rows.length + '</td>' +
        '<td class="cls_rec_title">折算本币:</td><td class="cls_rec_value">' + total_base.toFixed(2) + '</td>';
    if (total_rmb != 0) {
        all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_rmb.toFixed(2) + '</td>';
    }
    if (total_usd != 0) {
        all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_usd.toFixed(2) + '</td>';
    }
    if (total_jpy != 0) {
        all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_jpy.toFixed(2) + '</td>';
    }
    if (total_eur != 0) {
        all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_eur.toFixed(2) + '</td>';
    }

    all_gd += '<td class="cls_rec_title">前次&nbsp;&nbsp;折算本币:</td><td class="cls_rec_value">' + total_pre_base.toFixed(2) + '</td>';
    if (total_pre_rmb != 0) {
        all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_pre_rmb.toFixed(2) + '</td>';
    }
    if (total_pre_usd != 0) {
        all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_pre_usd.toFixed(2) + '</td>';
    }
    if (total_pre_jpy != 0) {
        all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_pre_jpy.toFixed(2) + '</td>';
    }
    if (total_pre_eur != 0) {
        all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_pre_eur.toFixed(2) + '</td>';
    }

    all_gd += '<td class="cls_rec_title">差额&nbsp;&nbsp;折算本币:</td><td class="cls_rec_value">' + total_diff_base.toFixed(2) + '</td>';
    if (total_diff_rmb != 0) {
        all_gd += '<td class="cls_rec_title">人名币:</td><td class="cls_rec_value">' + total_diff_rmb.toFixed(2) + '</td>';
    }
    if (total_diff_usd != 0) {
        all_gd += '<td class="cls_rec_title">美元:</td><td class="cls_rec_value">' + total_diff_usd.toFixed(2) + '</td>';
    }
    if (total_diff_jpy != 0) {
        all_gd += '<td class="cls_rec_title">日元:</td><td class="cls_rec_value">' + total_diff_jpy.toFixed(2) + '</td>';
    }
    if (total_diff_eur != 0) {
        all_gd += '<td class="cls_rec_title">欧元:</td><td class="cls_rec_value">' + total_diff_eur.toFixed(2) + '</td>';
    }

    panel_title.html('').html(all_gd);
}

function clear_cover_tab_fee_list_op() {
    cover_columns_fliters.columns_fliters('clear');
}
//提交审核
function create_hr_commit_profit() { 
    
    $('#dlg_ap_context').val($('#amc_bak').val());
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_start_schema_point',
        apt_id: 6,
    }, function (data) {
        var schema_point_list = data;
        $('#dlg_start_schema_point').combobox({
            panelHeight: 'auto', hasDownArrow: true, valueField: 'guid',
            textField: 'aps_show',
            data: schema_point_list
        });
        $('#dlg_post_hr_commit_profit_amc').dialog({
            title: '提交提成审核',
            iconCls: 'icon-lock',
            autoOpen: false,
            modal: true,
            width: 450,
            minheight: 100,
            buttons: [
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#dlg_post_pay_checkaccount_amc').dialog('close');
                    }
                }
                , {
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () { 
                        var guid = $('#dlg_start_schema_point').combobox('getValue');
                        var has = false;
                        var ap_u_id = undefined;
                        var ap_aps_id = undefined;
                        var aps_order_by_id = undefined; 
                        $.each(schema_point_list, function (i, item) {
                            if (guid == item.guid) {
                                has = true;
                                ap_u_id = item.u_id;
                                aps_id = item.aps_id;
                                aps_order_by_id = item.aps_order_by_id;
                            }
                        });
                        if (!has) {
                            $.messager.alert('错误提示', '错误: 请选择审核人再提交。', 'error');
                            return;
                        } 
                            
                        //将正常数据和异常数据打包 
                        var order_list = od_cover_list;

                        $.each(od_uncover_list, function (i, item) {
                            order_list.push(item);
                        });
                             
                        $('#dlg_post_hr_commit_profit_amc').dialog('close');
                        post('../Ashx/hr_commit_profit.ashx', {
                            rnd: Math.random(),
                            action: 'create_hr_commit_profit_approval',
                            rel_beg_dat: rel_beg_dat,
                            rel_end_dat: rel_end_dat,
                            order_list: JSON.stringify({ order_list: order_list }),
                            ap_u_id: ap_u_id,
                            aps_order_by_id: aps_order_by_id,
                            aps_id: aps_id, 
                            amc_bak: $('#dlg_ap_context').val(),
                        }, function (data) {
                            if (data.result == 1) {
                                $.messager.alert('提示', data.msg, 'info', function () {
                                    //关闭本窗口 

                                    parent.close_win_of_hr_create_commit_profit();
                                });
                            } else {
                                $.messager.alert('错误提示', data.msg, 'error');
                            }
                        }, true); 
                    }
                }]
        }).dialog('open');
    }, true);
     

    
}