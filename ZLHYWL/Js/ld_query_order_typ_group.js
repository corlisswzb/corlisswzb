var basesetting = undefined;

var cur_query_order_typ_group_params = undefined;
var cur_query_sub_params = undefined;

$(document).ready(function () {
    get_basesetting();
});

function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections_for_approval'
    }, function (data) {
        basesetting = data;

        var now_time = data.sys_time;
        var date = eval('new Date(' + now_time.replace(/\d+(?=-[^-]+$)/, function (a) {
            //console(a);
            return parseInt(a, 10);
        }).match(/\d+/g) + ')');


        //往后加1年，往前 10年 

        var now_year = date.getFullYear();
        var now_moth = date.getMonth();
        var select_years = [];
        for (var nY = now_year - 10 ; nY <= now_year + 1 ; nY++) {
            select_years.push({ value: nY, text: nY + '年' });
        }
        bind_combobox(select_years, $('#search_end_year'), 'text', 'value', false);
        bind_combobox(select_years, $('#search_beg_year'), 'text', 'value', false);

        $('#search_end_year').combobox('setValue', now_year);
        $('#search_beg_year').combobox('setValue', now_year);
        //月份
        var select_month = [];
        for (var nM = 1 ; nM <= 12; nM++) {
            select_month.push({ value: nM, text: nM + '月' });
        }
        bind_combobox(select_month, $('#search_beg_month'), 'text', 'value', false);
        bind_combobox(select_month, $('#search_end_month'), 'text', 'value', false);
        $('#search_end_month').combobox('setValue', now_moth);
        $('#search_beg_month').combobox('setValue', now_moth);
         
        //init_tab_order_typ_group();
        //init_order_tab();
        //init_tab_fee_list();
        //init_tab_order_cntr();

    }, true);

}

//刷新
function refresh_rpt_of_order_typ_group() {
    cur_query_order_typ_group_params = {
        rnd: Math.random(),
        action: 'get_rpt_of_order_typ_group', 
        beg_year: $('#search_beg_year').combobox('getValue'),
        beg_month: $('#search_beg_month').combobox('getValue'),
        end_year: $('#search_end_year').combobox('getValue'),
        end_month: $('#search_end_month').combobox('getValue'), 
       
    };
    cur_query_sub_params = $.extend(true,{},cur_query_order_typ_group_params);
 


    //只有月没有年，是不允许的 
    if (cur_query_order_typ_group_params.beg_month != undefined && Number(cur_query_order_typ_group_params.beg_month) > 0) {
        if (cur_query_order_typ_group_params.beg_year == undefined ||
            Number(cur_query_order_typ_group_params.beg_year) == 0) {
            $.messager.alert('错误','错误:无法理解的起始时间设置!','error');
            return;
        }
    }
    if (cur_query_order_typ_group_params.end_month != undefined && Number(cur_query_order_typ_group_params.end_month) > 0) {
        if (cur_query_order_typ_group_params.end_year == undefined ||
            Number(cur_query_order_typ_group_params.end_year) == 0) {
            $.messager.alert('错误', '错误:无法理解的截止时间设置!', 'error');
            return;
        }
    }
    
    post('../Ashx/lead_query.ashx', cur_query_order_typ_group_params,
    function (data) {
        init_tab_order_typ_group(data);
        //$("#tab_order_typ_group").datagrid('loadData', data);
        //$("#tab_order_typ_group").datagrid('reloadFooter', [
        //{  
        //    od_typ_desc: '', 
        //    order_count: parseInt( data.out_sum_of_order_count), 
        //    sum_of_cntr_u: data.out_sum_of_cntr_u,
        //    sum_of_cntr_t: parseFloat(data.out_sum_of_cntr_t).toFixed(2),
        //    sum_of_20: data.out_sum_of_20,
        //    sum_of_40: data.out_sum_of_40,
        //    sum_of_45: data.out_sum_of_45,
        //    sum_of_rec_amount_of_base: data.out_sum_of_rec_amount_of_base,
        //    sum_of_reced_amount_of_base: data.out_sum_of_reced_amount_of_base,
        //    sum_of_unreced_amount_of_base: data.out_sum_of_unreced_amount_of_base,
        //    sum_of_pay_amount_of_base: data.out_sum_of_pay_amount_of_base,
        //    sum_of_payed_amount_of_base: data.out_sum_of_payed_amount_of_base,
        //    sum_of_unpayed_amount_of_base: data.out_sum_of_unpayed_amount_of_base,
        //    sum_of_profit_amount_of_base: data.out_sum_of_profit_amount_of_base,
        //    sum_of_rec_amount: data.out_sum_of_rec_amount,
        //    sum_of_reced_amount: data.out_sum_of_reced_amount,
        //    sum_of_unreced_amount: data.out_sum_of_unreced_amount,
        //    sum_of_pay_amount: data.out_sum_of_pay_amount,
        //    sum_of_payed_amount: data.out_sum_of_payed_amount,
        //    sum_of_unpayed_amount: data.out_sum_of_unpayed_amount,
        //    sum_of_profit_amount: data.out_sum_of_profit_amount,
        //    sum_of_percent_profit: ''

        //},
        //]);
    }, true);
    
}
//初始表格
function init_tab_order_typ_group(data) {  
    var body = $('#panel_order_typ_group tbody').eq(0);
    var foot  =  $('#panel_order_typ_group tfoot').eq(0);
    body.html('');
    foot.html('');
    $.each(data.rows, function (i, row) {
        body.append('<tr><td class="value">' + (i + 1) + '</td>' +
            '<td class="value">' + row.od_typ_desc + '</td>' +
            '<td class="value">' + row.order_count + '</td>' +
            '<td class="value">' + row.sum_of_cntr_u + '</td>' +
            '<td class="value">' + row.sum_of_cntr_t.toFixed(2) + '</td>' +
            '<td class="value">' + row.sum_of_20 + '</td>' +
            '<td class="value">' + row.sum_of_40 + '</td>' +
            '<td class="value">' + row.sum_of_45 + '</td>' +
            '<td class="value">' + row.sum_of_rec_amount_of_base.toFixed(2) + '</td>' +
            '<td class="value">' + row.sum_of_unreced_amount_of_base.toFixed(2) + '</td>' +
            '<td class="value">' + row.sum_of_pay_amount_of_base.toFixed(2) + '</td>' +
            '<td class="value">' + row.sum_of_unpayed_amount_of_base.toFixed(2) + '</td>' +
            '<td class="value">' + row.sum_of_profit_amount_of_base.toFixed(2) + '</td>' +
            '<td class="value">' + row.sum_of_percent_profit + '</td>' +
            '</tr>'); 
    });
   
    foot.append( ' <tr><td class="value">汇总</td>' +
            '<td class="value"> </td>' +
            '<td class="value">' + parseInt( data.out_sum_of_order_count) + '</td>' +
            '<td class="value">' + parseInt( data.out_sum_of_cntr_u) + '</td>' +
            '<td class="value">' + parseFloat(data.out_sum_of_cntr_t).toFixed(2) + '</td>' +
            '<td class="value">' + parseInt( data.out_sum_of_20) + '</td>' +
            '<td class="value">' + parseInt( data.out_sum_of_40)+ '</td>' +
            '<td class="value">' + parseInt( data.out_sum_of_45) + '</td>' +
            '<td class="value">' + parseFloat(data.out_sum_of_rec_amount_of_base).toFixed(2) + '</td>' +
            '<td class="value">' + parseFloat(data.out_sum_of_unreced_amount_of_base).toFixed(2) + '</td>' +
            '<td class="value">' + parseFloat(data.out_sum_of_pay_amount_of_base).toFixed(2) + '</td>' +
            '<td class="value">' + parseFloat(data.out_sum_of_unpayed_amount_of_base).toFixed(2) + '</td>' +
            '<td class="value">' + parseFloat(data.out_sum_of_profit_amount_of_base).toFixed(2) + '</td>' +
            '<td class="value"></td>' +
            '</tr>'); 
    return;
    $("#tab_order_typ_group").datagrid({
        data:[],
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [  [
            { field: 'od_typ_desc', title: '业务类型', align: 'center',width:110, },
            { field: 'order_count', title: '涉单数', align: 'center', width: 70 }, 
            { field: 'sum_of_cntr_u', title: '自然箱', align: 'center', width: 60 },
            { field: 'sum_of_cntr_t', title: '标准箱', align: 'center', width: 60 },
            { field: 'sum_of_20', title: '20尺箱', align: 'center', width: 60 },
            { field: 'sum_of_40', title: '40尺箱', align: 'center', width: 60 },
            { field: 'sum_of_45', title: '45尺箱', align: 'center', width: 60 }, 
            { field: 'sum_of_rec_amount', title: '应收', align: 'center', width: 160 },
            {
                field: 'sum_of_rec_amount_of_base', title: '应收(本币)', align: 'center', width: 80,
                
            },
            { field: 'sum_of_reced_amount', title: '已收', align: 'center', width: 160 },
            {
                field: 'sum_of_reced_amount_of_base', title: '已收(本币)', align: 'center', width: 80,
                 
            },
            { field: 'sum_of_unreced_amount', title: '未收', align: 'center', width: 160 },
            {
                field: 'sum_of_unreced_amount_of_base', title: '未收(本币)', align: 'center', width: 80,
                
            },
            { field: 'sum_of_pay_amount', title: '应付', align: 'center', width: 160 },
            {
                field: 'sum_of_pay_amount_of_base', title: '应付(本币)', align: 'center', width: 80,
                 
            },
            { field: 'sum_of_payed_amount', title: '已付', align: 'center', width: 160 },
            {
                field: 'sum_of_payed_amount_of_base', title: '已付(本币)', align: 'center', width: 80,
                 
            },
            { field: 'sum_of_unpayed_amount', title: '未付', align: 'center', width: 160 },
            {
                field: 'sum_of_unpayed_amount_of_base', title: '未付(本币)', align: 'center', width: 80,
                 
            },
            { field: 'sum_of_profit_amount', title: '盈利', align: 'center', width: 160 },
            {
                field: 'sum_of_profit_amount_of_base', title: '盈利(本币)', align: 'center', width: 80,
                 
            },
            { field: 'sum_of_percent_profit', title: '毛利率', align: 'center', width: 80 },
        ]],
        onLoadSuccess: function (data) {
            $("#tab_order_typ_group").datagrid('hideColumn', 'sum_of_rec_amount');
            $("#tab_order_typ_group").datagrid('hideColumn', 'sum_of_reced_amount');
            $("#tab_order_typ_group").datagrid('hideColumn', 'sum_of_unreced_amount');
            $("#tab_order_typ_group").datagrid('hideColumn', 'sum_of_pay_amount');
            $("#tab_order_typ_group").datagrid('hideColumn', 'sum_of_unpayed_amount');
            $("#tab_order_typ_group").datagrid('hideColumn', 'sum_of_payed_amount');
            $("#tab_order_typ_group").datagrid('hideColumn', 'sum_of_profit_amount');
        },
        //onRowContextMenu: function (e, field, row) {
        //    e.preventDefault();
        //    $('#mm_of_datagrid').data('od_typ', row.od_typ); 
        //    $('#mm_of_datagrid').menu('show', {
        //        left: e.pageX,
        //        top: e.pageY
        //    });
        //}
    });
}

function download_order_typ_group() {
    var down_query_sub_params = $.extend(true,{}, cur_query_order_typ_group_params);
    down_query_sub_params.action = 'download_rpt_of_order_typ_group';

    window.open('../Ashx/lead_query.ashx?' + parseParams(down_query_sub_params));
 
}


//////////////////////下面都没用 ///////////////////
//查看关联 订单列表
function win_view_of_order_list() {
    cur_query_sub_params.delete_id = $('#mm_of_datagrid').data('delete_id');
    cur_query_sub_params.action = 'get_rpt_of_order_typ_group_of_order_list';
    cur_query_sub_params.delete_name = $('#mm_of_datagrid').data('cu_name');
    post('../Ashx/lead_query.ashx', cur_query_sub_params,
    function (data) {
        $("#tab_order").datagrid('loadData', data);
        $('#win_of_order_list').window({
            title: cur_query_sub_params.delete_name + '关联订单列表',
        }).window('open');
    },true);
}

//初始化 订单列表
function init_order_tab() {
    $("#tab_order").datagrid({
        data:[],
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
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        showFooter: true,
        frozenColumns: [[{ title: '', field: 'od_seq', width: 40, checkbox: true },
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
                field: 'od_no',  title: '业务编号', width: 90, sortable: true,

            }
            , {
                field: 'od_fee_dat', title: '业务时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
        ]],

        columns: [[

                 { field: 'od_typ_desc', title: '业务类型', sortable: true, width: 70 }
                , { field: 'od_box_typ_desc', title: '集散', sortable: true, width: 40, }
                , { field: 'od_project_typ_desc', title: '项目名称', sortable: true, width: 70, }
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
                , { field: 'od_cargo_agent_cu_desc', title: '供货客户', sortable: true, width: 140, }

                , { field: 'od_cargo_typ_desc', title: '品名', sortable: true, width: 80, }
                , {
                    field: 'od_cargo_weight', title: '货重', sortable: true, width: 60,
                    formatter: function (value, row, index) {
                        if (value == undefined) return '';

                        if (value.length > 0 && !isNaN(value)) {
                            return value.toFixed(2);
                        } else {
                            return '';
                        }
                    }
                }
                , {
                    field: 'od_cargo_number', title: '件数', sortable: true, width: 60,
                    formatter: function (value, row, index) {
                        if (value == undefined) return '';
                        if (value == undefined || isNaN(value)) {
                            return '';
                        } else {
                            var show_number = 0;
                            var show_packing = '';

                            if (value == undefined) {
                                show_number = 0;
                            } else {
                                show_number = value;
                            }
                            if (row.od_cargo_packing_desc != undefined) {
                                show_packing = row.od_cargo_packing_desc;
                            }

                            return show_number + ' ' + show_packing;
                        }
                    }
                }
                , {
                    field: 'od_cntr_desc', title: '箱量', sortable: true, width: 60

                }
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
                        if (value == undefined) return '';
                        if (row.profit_total_amount_of_base > 0) {
                            return 'background-color:#ead1c8;color:#000;';
                        } else if (row.profit_total_amount_of_base < 0) {
                            return 'background-color:#b3e7c7;color:#000;';
                        }
                    }
                }

                , { field: 'od_operation_nam', title: '操作', sortable: true, width: 80, }
                , { field: 'od_sales_nam', title: '销售', sortable: true, width: 80, }
                , { field: 'od_service_nam', title: '客服', sortable: true, width: 80, }
                , {
                    field: 'od_record_dat', title: '创建时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , { field: 'od_operation_lock_nam', title: '业务锁定', sortable: true, width: 80, }
                , {
                    field: 'od_operation_lock_dat', title: '锁定时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
        ]],
        onLoadSuccess: function (data) {
            table_bottom_group_desc(data.group_fee_desc, data.total, 'cls_group_order_fee', 0);

            refresh_order_list_of_footer();

        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_order'), rowIndex);

            refresh_order_list_of_footer();
        },
        onCheck: function (index, row) {
            refresh_order_list_of_footer();
        },
        onUncheck: function (index, row) {
            refresh_order_list_of_footer();
        },
        onCheckAll: function (index, row) {
            refresh_order_list_of_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_order_list_of_footer();
        },
        onDblClickRow: function (index, row) {
            //这里 应该 改一下 
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#win_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        } 
    });
}

//刷新底部的统计 
function refresh_order_list_of_footer() {

    var rows = $('#tab_order').datagrid('getChecked');

    //需要把描述进行拆解然后加权 
    //$:30.00,￥:1559.00 
    var cur_fee_group = {
        rec_total_amount_desc: [],
        reced_total_amount_desc: [],
        unreced_total_amount_desc: [],
        pay_total_amount_desc: [],
        payed_total_amount_desc: [],
        unpayed_total_amount_desc: [],
        profit_total_amount_desc: []
    };

    $.each(rows, function (i, row) {

        if (row.rec_total_amount_desc != undefined && row.rec_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.rec_total_amount_desc.split(',');


            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 ,取消了: 所以这里，不能这样拆封 
             
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.rec_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.rec_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.reced_total_amount_desc != undefined && row.reced_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.reced_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.reced_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.reced_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.unreced_total_amount_desc != undefined && row.unreced_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.unreced_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.unreced_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.unreced_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.pay_total_amount_desc != undefined && row.unreced_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.pay_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.pay_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.pay_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.payed_total_amount_desc != undefined && row.payed_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.payed_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.payed_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.payed_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.unpayed_total_amount_desc != undefined && row.unpayed_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.unpayed_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.unpayed_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.unpayed_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.profit_total_amount_desc != undefined && row.profit_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.profit_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.profit_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.profit_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }
    });

    var cur_fee_group2 = {
        rec_total_amount_desc: '',
        reced_total_amount_desc: '',
        unreced_total_amount_desc: '',
        pay_total_amount_desc: '',
        payed_total_amount_desc: '',
        unpayed_total_amount_desc: '',
        profit_total_amount_desc: ''
    };

    $.each(cur_fee_group.rec_total_amount_desc, function (i, item) {
        if (cur_fee_group2.rec_total_amount_desc.length == 0) {
            cur_fee_group2.rec_total_amount_desc = item.symbol +  item.amount.toFixed(2);
        } else {
            cur_fee_group2.rec_total_amount_desc += ',' + item.symbol +   item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.reced_total_amount_desc, function (i, item) {
        if (cur_fee_group2.reced_total_amount_desc.length == 0) {
            cur_fee_group2.reced_total_amount_desc = item.symbol +  item.amount.toFixed(2);
        } else {
            cur_fee_group2.reced_total_amount_desc += ',' + item.symbol +  item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.unreced_total_amount_desc, function (i, item) {
        if (cur_fee_group2.unreced_total_amount_desc.length == 0) {
            cur_fee_group2.unreced_total_amount_desc = item.symbol + item.amount.toFixed(2);
        } else {
            cur_fee_group2.unreced_total_amount_desc += ',' + item.symbol +  item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.pay_total_amount_desc, function (i, item) {
        if (cur_fee_group2.pay_total_amount_desc.length == 0) {
            cur_fee_group2.pay_total_amount_desc = item.symbol +  item.amount.toFixed(2);
        } else {
            cur_fee_group2.pay_total_amount_desc += ',' + item.symbol +  item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.payed_total_amount_desc, function (i, item) {
        if (cur_fee_group2.payed_total_amount_desc.length == 0) {
            cur_fee_group2.payed_total_amount_desc = item.symbol +  item.amount.toFixed(2);
        } else {
            cur_fee_group2.payed_total_amount_desc += ',' + item.symbol + item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.unpayed_total_amount_desc, function (i, item) {
        if (cur_fee_group2.unpayed_total_amount_desc.length == 0) {
            cur_fee_group2.unpayed_total_amount_desc = item.symbol +  item.amount.toFixed(2);
        } else {
            cur_fee_group2.unpayed_total_amount_desc += ',' + item.symbol +  item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.profit_total_amount_desc, function (i, item) {
        if (cur_fee_group2.profit_total_amount_desc.length == 0) {
            cur_fee_group2.profit_total_amount_desc = item.symbol + item.amount.toFixed(2);
        } else {
            cur_fee_group2.profit_total_amount_desc += ',' + item.symbol +  item.amount.toFixed(2);
        }
    });


    $("#tab_order").datagrid('reloadFooter', [
        {
            od_status_desc: '',
            od_status_id: '',
            od_no: '',
            od_fee_dat: '',
            od_typ_desc: '',
            od_box_typ_desc: '',
            od_project_typ_desc: '',
            od_trade_typ_desc: '',
            od_i_e_id: '',
            od_beg_place_desc: '',
            od_end_place_desc: '',
            od_freight_desc: '',
            od_delegate_cu_desc: '',
            od_cargo_agent_cu_desc: '',
            od_cargo_typ_desc: '',
            od_cargo_weight: '',
            od_cargo_number: '',
            od_cntr_desc: '',
            od_main_bill_no: '',
            od_operation_nam: '',
            od_sales_nam: '',
            od_service_nam: '',
            od_record_dat: '',
            od_operation_lock_nam: '',
            od_operation_lock_dat: '',
            rec_total_amount_desc: cur_fee_group2.rec_total_amount_desc,
            reced_total_amount_desc: cur_fee_group2.reced_total_amount_desc,
            unreced_total_amount_desc: cur_fee_group2.unreced_total_amount_desc,
            pay_total_amount_desc: cur_fee_group2.pay_total_amount_desc,
            payed_total_amount_desc: cur_fee_group2.payed_total_amount_desc,
            unpayed_total_amount_desc: cur_fee_group2.unpayed_total_amount_desc,
            profit_total_amount_desc: cur_fee_group2.profit_total_amount_desc,

        },
    ]); 

}

//下载订单
function download_order_group() {
    var down_query_sub_params = $.extend(true, {}, cur_query_sub_params);
    down_query_sub_params.action = 'download_rpt_of_order_typ_group_order_list';

    window.open('../Ashx/lead_query.ashx?' + parseParams(down_query_sub_params));

}



//初始化表格 费用表格 
function init_tab_fee_list() {
     
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
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
            { title: '', field: 'fee_seq',  width: 40, checkbox: true }
            , {
                field: 'fee_status_desc',  title: '状态', sortable: true, width: 60,
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
                  { title: '费用详情', align: 'center', colspan: 25 }
                , { title: '关联委托', align: 'center', colspan: 10 }
                , { title: '维护明细', align: 'center', colspan: 4 }
        ],
            [
             {
                 field: 'fee_cu_desc', title: '结算单位', width: 220, sortable: true
             }
              , { field: 'od_no', title: '委托号', width: 88, sortable: true, }
             , {
                 field: 'fee_dat', title: '业务时间', sortable: true, width: 78
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
                field: 'fee_price', title: '单价', sortable: true, width: 80,
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
                field: 'first_ship_nam', title: '工具名', width: 100, sortable: true,
            }
            , {
                field: 'first_voyage', title: '工具号', width: 100, sortable: true,
            }
            , {
                field: 'od_main_bill_no', title: '提单号', width: 160, sortable: true,
            }
            , {
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true
            }
            , {
                field: 'ca_amc_finish_dat', title: '通审时间', width: 80, sortable: true
            }
             , {
                 field: 'fee_finace_lock_dat', title: '销账时间', width: 80, sortable: true
             }

            , {
                field: 'fee_limit_dat', title: '收付账期', width: 80, sortable: true,
                styler: function (value, row, index) {
                    if (row.fee_limit_status == 1)
                        return 'background-color:#fce08b;color:#000;';
                    if (row.fee_limit_status == 2)
                        return 'background-color:#ec7a3c;color:#FFF;';
                }
            }
            , {
                field: 'fee_bak', title: '费用备注', width: 260, sortable: true,
            }
            , { field: 'ca_title', title: '所属账单', width: 148, sortable: true, }
            , {
                field: 'od_status_desc',  title: '审核状态', width: 80, sortable: true,
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
             , {
                 field: 'rec_total_amount_desc', title: '应收小计', sortable: true, width: 165,
                 styler: function (value, row, index) {
                     return 'background-color:#eecfcb;color:#000;';
                 }
             }
            , {
                field: 'reced_total_amount_desc', title: '实收小计', sortable: true, width: 165,
                styler: function (value, row, index) {
                    if (Number(row.rec_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else if (Number(row.rec_total_amount) == Number(row.reced_total_amount)) return 'background-color:#bc1604;color:#fff;';
                    else return 'background-color:#f2bea5;color:#FFF;';
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

            ]],
        onLoadSuccess: function (data) {
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_order_fee', !cur_query_sub_params ? 1 : cur_query_sub_params.rec_or_pay);

            refresh_fee_list_footer();
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_fee_list'), rowIndex);

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

            //这里 应该 改一下 
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#win_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        } 
    });
}

//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_fee_list_footer() {
    table_bootom_selected_desc_have_symbol($('#tab_fee_list'), 'selected_group_order_fee', !cur_query_sub_params ? 1 : cur_query_sub_params.rec_or_pay);
}


//查看关联费用列表
function win_view_of_order_fee_list(rec_or_pay) {


    cur_query_sub_params.delete_id = $('#mm_of_datagrid').data('delete_id');
    cur_query_sub_params.action = 'get_rpt_of_order_typ_group_of_fee_list';
    cur_query_sub_params.rec_or_pay = rec_or_pay;
    cur_query_sub_params.delete_name = $('#mm_of_datagrid').data('cu_name');
    post('../Ashx/lead_query.ashx', cur_query_sub_params,
    function (data) {
        $("#tab_fee_list").datagrid('loadData', data);
        $('#win_of_order_fee_list').window({
            title:cur_query_sub_params.delete_name + "关联费用列表",
        }).window('open');
    }, true);
   
}
 
//下载
function download_order_fee_group() {
    var down_query_sub_params = $.extend(true, {}, cur_query_sub_params);
    down_query_sub_params.action = 'download_rpt_of_order_typ_group_order_fee';
    window.open('../Ashx/lead_query.ashx?' + parseParams(down_query_sub_params));
}


//集装箱
//初始化 订单集装箱信息
function init_tab_order_cntr() {
    $("#tab_order_cntr").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_order_cntr_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true, 
        columns: [[//显示的列
            {
                field: 'od_no', title: '业务编号', width: 80, 
            }, {
                field: 'od_route_tools_desc', title: '一程船名', width: 90,
            }, {
                field: 'od_route_tools_no', title: '一程航次', width: 60,
            }, {
                field: 'od_route_tools_owner_desc', title: '船东', width: 90,
            } , {
                  field: 'eqp_siz', title: '尺寸', width: 40, 
            }, {
                field: 'eqp_typ', title: '箱型', width: 40, 
            }, {
                field: 'opr_cod', title: '箱主', sortable: true, width: 60,  
            }, {
                field: 'bill_no', title: '提单号', width: 150, 
            }, {
                field: 'cntr_no', title: '箱号', sortable: true, width: 100, 
            } , {
                field: 'seal_no', title: '铅封号', width: 120, 
            } , {
                field: 'pick_empty_no', title: '提空提单', width: 150, 
            } , {
                field: 'cargo_net_wgt', title: '货重', width: 80,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }  
            } , {
                field: 'cntr_gross_wgt', title: '箱货重', width: 80,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                } 
            } , {
                field: 'cargo_pick_number', title: '件数', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                } 
            } , {
                field: 'cargo_bluk', title: '体积', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                } 
            }, {
                field: 'customs_ship_desc', title: '报关船名', width: 90, 
            } , {
                field: 'customs_voyage_no', title: '报关航次', width: 60, 
            }
            , {
                field: 'customs_ship_no', title: '报关海关编码', width: 90, 
            }
            , {
                field: 'customs_load_port', title: '报关装货区', width: 90, 
            }
            , {
                field: 'customs_disc_port', title: '报关卸货区', width: 90, 
            }
            , {
                field: 'cargo_goods_desc', title: '报关品名', width: 140, 
            }
            , {
                field: 'customs_hs_cod', title: '报关品名编号', width: 90, 
            }
            , {
                field: 'cntr_pin_desc', title: '整/拼', width: 40, 
                styler: function (value, row, index) {
                    if (value == undefined) {
                        return '';
                    } else if (Number(value) == 0) {
                        return 'background-color:#e7d430;color:#000;';
                    } else if (Number(value) == 1) {
                        return 'background-color:#4ff0e3;color:#000;';
                    }
                }
            } 
        ]], 
        onLoadSuccess: function (data) {

            //计算规则 
            /*
                箱数 剔除拼
                总 毛重  ： 剔除拼 
            */
            var total_cntr_num = 0;
            var total_cntr_gross_wgt = 0;

            //依据箱号增加
            var temp_cntr_no = undefined;
            $.each(data.rows, function (i, row) {
                if (temp_cntr_no == undefined) {
                    temp_cntr_no = row.cntr_no;
                    total_cntr_num = 1;
                    total_cntr_gross_wgt = row.cntr_gross_wgt;
                } else {
                    if (temp_cntr_no != row.cntr_no) {
                        total_cntr_num += 1;
                        temp_cntr_no = row.cntr_no;
                        total_cntr_gross_wgt += row.cntr_gross_wgt;
                    }
                }
            });


            $('#tab_order_cntr').datagrid('reloadFooter', [
                {
                    cntr_order_by_id: '合计:',
                    cntr_no: total_cntr_num + '箱',
                    cargo_net_wgt: table_compute('tab_order_cntr', 'cargo_net_wgt'),
                    cargo_pick_number: table_compute('tab_order_cntr', 'cargo_pick_number'),
                    cargo_bluk: table_compute('tab_order_cntr', 'cargo_bluk'),
                    cntr_gross_wgt: total_cntr_gross_wgt,
                }
            ]);
        },
    });
}

//查看关联 订单列表
function win_view_of_order_cntr_list() {
    cur_query_sub_params.delete_id = $('#mm_of_datagrid').data('delete_id');
    cur_query_sub_params.action = 'get_rpt_of_order_typ_group_of_cntr_list';
    cur_query_sub_params.delete_name = $('#mm_of_datagrid').data('cu_name');
    post('../Ashx/lead_query.ashx', cur_query_sub_params,
    function (data) {
        $("#tab_order_cntr").datagrid('loadData', data);
        $('#win_of_order_cntr_list').window({
            title: cur_query_sub_params.delete_name + "关联集装箱列表",
        }).window('open');
    }, true);
}

//下载
function download_order_cntr_group() {
    var down_query_sub_params = $.extend(true, {}, cur_query_sub_params);
    down_query_sub_params.action = 'download_rpt_of_order_typ_group_order_cntr';
    window.open('../Ashx/lead_query.ashx?' + parseParams(down_query_sub_params));
}