var cur_amc_id = undefined;
var cur_amc = undefined;
var cur_next_amc_opr_info = undefined;
var uncover_columns_fliters = undefined; 
var cover_columns_fliters = undefined;
var od_uncover_list = [];
var od_cover_list = [];

$(document).ready(function () {
    init_cover_tab();
    init_uncover_tab();

    cur_amc_id = getQueryVariable('amc_id');
    get_hr_commit_profit_record_single();
    
});


//获取资料 
function get_hr_commit_profit_record_single() {
    post('../Ashx/hr_commit_profit.ashx', {
        rnd: Math.random(),
        action: 'get_hr_commit_profit_record_single',
        amc_id: cur_amc_id
    }, function (data) {
        cur_amc = data;

        var amc_base = data;
        $('#sp_amc_title').val(amc_base.amc_title);
        $('#sp_relation_no').val(amc_base.relation_no);
        $('#sp_relation_c_desc').val(amc_base.relation_c_desc);
        $('#sp_amc_status_desc').val(amc_base.amc_status_desc);
        ;
        $('#sp_od_rec_uncover_total_amount_of_base').val(amc_base.od_rec_uncover_total_amount_of_base);

         
        $('#sp_amc_bak').val(amc_base.amc_bak);
        $('#sp_amc_create_by_nam').val(amc_base.amc_create_by_nam);
        $('#sp_amc_cur_opr_nam').val(amc_base.amc_cur_opr_nam);
        $('#sp_amc_create_dat').val(dateformat(amc_base.amc_create_dat, true));
        $('#sp_amc_finish_dat').val(dateformat(amc_base.amc_finish_dat, true));
 

        od_uncover_list = data.uncover_od_list;
        od_cover_list = data.cover_od_list;

        cover_columns_fliters.columns_fliters('reset_target_data_and_clumns_fliter', od_cover_list);

        uncover_columns_fliters.columns_fliters('reset_target_data_and_clumns_fliter', od_uncover_list);
        
        if (od_cover_list.length == 0) {
            $('.cover_od_div').hide();
            $('#panel_cover').panel('close');
        }


        refresh_approval_flow_details();


    },true);
}
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
                field: 'od_status_desc', title: '状态', width: 50, sortable: true,
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
                field: 'od_no', title: '业务编号', width: 90, sortable: true,

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

//初始化 订单列表
function init_cover_tab() {
    $("#od_cover_list").datagrid({
        data: [],
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
        fit:true,
        emptyMsg: '无法找到相关数值',
        showFooter: true,
        frozenColumns: [[
            { title: '', field: 'od_seq', width: 40, checkbox: true },
            {
                field: 'od_status_desc',  title: '状态', width: 50, sortable: true,
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
                field: 'od_no', title: '业务编号', width: 90, sortable: true,

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
//查看所有费用 
function view_all_service_info(od_service_seq, od_service_sub_seq) {


    var od_service_list = cur_amc.order_service_list;

    if(od_service_list == undefined || 
        od_service_list.length == 0) {
        $.messager.alert('提示','此单没有找到此项记录','info');
        return;
    } 

    if ($('#tabs_service_list').tabs('tabs').length > 0) {
        var maxIndex = $('#tabs_service_list').tabs('tabs').length - 1;

        for (var i = maxIndex; i >= 0; i--) {
            $('#tabs_service_list').tabs('close', i);
        }
    }  
    sessionStorage.removeItem('od_service_list');
    sessionStorage.setItem('od_service_list', JSON.stringify(od_service_list));

    if (od_service_sub_seq == undefined || od_service_sub_seq.length == 0) {
        $.each(od_service_list, function (i, service_item) {
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_info_frame_of_service_info.aspx?rnd=' +
                            Math.random() + '&ca_seq=' +
                            service_item.ca_seq + '&od_service_seq=' +
                            service_item.od_service_seq +
                            '" style="width:100%;height:100%;"></iframe>';
            $('#tabs_service_list').tabs('add', {
                title: service_item.od_service_cu_desc,
                content: content,
                closable: false,
                selected: true,
                border: false,
            });
        });
    } else {
        var new_service_list = [];
        var new_service_sub_list = [];

        $.each(od_service_list, function (i, service_item) {
            if (service_item.od_service_seq == od_service_seq) {
                
                new_service_sub_list = [];

                if (service_item.sub_list.length > 0) {
                    $.each(service_item.sub_list, function (i, sub_service_item) {
                        if (sub_service_item.od_service_seq == od_service_seq &&
                            sub_service_item.od_service_sub_seq == od_service_sub_seq) {
                            new_service_sub_list.push(sub_service_item);
                        }
                    });
                } 
                service_item.sub_list = new_service_sub_list;

                new_service_list.push(service_item);
            } 
        });

        $.each(new_service_list, function (i, service_item) {
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_info_frame_of_service_info.aspx?rnd=' +
                            Math.random() + '&ca_seq=' +
                            service_item.ca_seq + '&od_service_seq=' +
                            service_item.od_service_seq +
                            '" style="width:100%;height:100%;"></iframe>';
            $('#tabs_service_list').tabs('add', {
                title: service_item.od_service_cu_desc,
                content: content,
                closable: false,
                selected: true,
                border: false,
            });
        });
    }
    $('#service_window').window('open');
    
      

}
 
//查看所有费用 
function view_all_order_cntr_info() { 
    $('#order_cntr_info_window').window('open'); 
}
//同意下一步
function givenext_amc() {
    var amc_base = cur_amc.amc_base[0];

    if (amc_base.amc_status != 1 || (
        amc_base.amc_status == 1 &&
        amc_base.is_my_point != 1
        )) {
        $.messager.alert('错误','当前不是你的审核，无法提交','error');
    } else {
        var amc_id = amc_base.amc_id;
        var amc_next_opr_id = '';
        var amc_next_step = '';
        var ap_context = $('#ed_ap_context').val();

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
            msg = '确认同意当前账单的审核并提交下一步吗？'
        } else {
            msg = '确认同意当前账单的审核并标记完结吗？';
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
                             get_ap_checkaccount_collections();
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

    if(ap_context.length == 0){
        $.messager.alert('错误','退回审核，必须要提交理由','error');
        return;
    }
    var amc_base = cur_amc.amc_base[0];
    if (amc_base.amc_status != 1 || (
        amc_base.amc_status == 1 &&
        amc_base.is_my_point != 1
        )) {
        $.messager.alert('错误', '当前不是你的审核，无法提交', 'error');
    } else {
        $.messager.confirm('退回到发起人提示', '确认要将此单退回给发起人吗?',
         function (r) {
             if (r) {
                 post('../Ashx/approval_mgr.ashx', {
                     rnd: Math.random(),
                     action: 'giveback_to_create_amc',
                     ap_context: ap_context,
                     amc_id: amc_base.amc_id,
                 }, function (data) {
                     if (data.result == 1) {
                         //重新获取
                         get_ap_checkaccount_collections();
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
    var amc_base = cur_amc;
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_amc_actual_flow_details',
        amc_id: amc_base.amc_id,
        is_my_point: amc_base.is_my_point,

    }, function (data) {

        if (amc_base.amc_status != 1 || (
            amc_base.amc_status == 1 &&
            amc_base.is_my_point != 1
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
 
