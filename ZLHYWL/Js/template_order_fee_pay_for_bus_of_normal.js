var pageNumber = 1;
var pageSize = 50;
var basesetting = undefined;

var cur_fee_list_query_params = undefined;
var cur_ca_list_query_params = undefined;
var cur_rec_or_pay = -1;
var cur_fee_list_of_ca = undefined;
var cur_selected_ca = undefined; 
var cur_mm_select_row = undefined;

$(document).ready(function () {



    $($('body')[0]).unbind('keydown').bind('keydown', custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);


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

    $('#dlg_ca_attachment_list').dialog({
        title: '查看账单附件',
        iconCls: 'icon-table_row',
        autoOpen: false,
        modal: true,
        width: 450,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_ca_attachment_list').dialog('close');
                }
            }]
    }).dialog('close');

    $('#dlg_post_ca').dialog({
        title: '投递账单',
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
                    $('#dlg_post_ca').dialog('close');
                }
            }]
    }).dialog('close');

    //界面控制
    $('#dlg_ed_ca_group_flag').bind('click', function () {
        if ($(this).is(':checked')) {
            $('.dlg_tr_group_flag').show();
        } else {
            $('#dlg_ed_ca_assign_flag').prop('checked', false);
            $('.dlg_tr_group_flag').hide();
            $('#dlg_ed_ca_relation_user_desc').val('');
            $('.dlg_tr_relation_user_desc').hide();
            $('#dlg_ed_ca_limit_dat').datebox('setValue', '');
        }
    });

    $('#dlg_ed_ca_assign_flag').bind('click', function () {
        if ($(this).is(':checked')) {
            $('.dlg_tr_relation_user_desc').show();
        } else {
            $('#dlg_ed_ca_relation_user_desc').val('');
            $('.dlg_tr_relation_user_desc').hide();
        }
    });



    get_basesetting();


});

//获取基础数据
function get_basesetting() {
    basesetting = parent.call_get_father_basesetting();
    //post('../Ashx/sys_base.ashx', {
    //    rnd: Math.random(),
    //    action: 'get_basesettingCollections'
    //}, function (data) {
    //    basesetting = data;


        //查询 费用界面
        bind_combobox(basesetting.order_typ_list, $('#search_od_typ'), 'ot_desc', 'ot_id', true);
        //bind_combobox(basesetting.company_list, $('#search_od_record_by_company_id'), 'c_desc', 'c_id', true);
        bind_combobox(basesetting.project_list, $('#search_od_project_typ'), 'pr_name', 'pr_id', true);
        bind_combobox(basesetting.fee_item_list, $('#search_fee_item_typ'), 'fee_cn', 'fee_id', true);

        bind_combobox(basesetting.currency_list, $('#search_fee_currency_id'), 'cr_name', 'cr_id', true);
        bind_combobox(basesetting.invoice_list, $('#search_fee_invoice_typ'), 'in_name', 'in_id', true);
        bind_combobox(basesetting.employe_list, $('#search_fee_record_id'), 'u_real_name', 'u_id', true);
        //查询 账单界面 
        bind_combobox(basesetting.employe_list, $('#search_ca_create_by_id'), 'u_real_name', 'u_id', false);
        var now_time = basesetting.sys_time;
        var date = eval('new Date(' + now_time.replace(/\d+(?=-[^-]+$)/, function (a) {
            //console(a);
            return parseInt(a, 10);
        }).match(/\d+/g) + ')');


        //往后加1年，往前 10年 

        var now_year = date.getFullYear();
        var select_years = [];
        for (var nY = now_year - 10 ; nY <= now_year + 1 ; nY++) {
            select_years.push({ value: nY, text: nY + '年' });
        }
        bind_combobox(select_years, $('#search_ca_year'), 'text', 'value', false);
        bind_combobox(select_years, $('#dlg_search_ca_year'), 'text', 'value', false);
        bind_combobox(select_years, $('#dlg_ed_ca_year'), 'text', 'value', false);



        //$('#search_ca_year').combobox('setValue',now_year);
        $('#dlg_search_ca_year').combobox('setValue', now_year);
        $('#dlg_search_ca_year').combobox({
            onSelect: function () {
                refresh_dlg_tab_choise_ca_main_list(true)
            }
        });
        $('#dlg_ed_ca_year').combobox('setValue', now_year);
        //月份
        var select_month = [];
        for (var nM = 1 ; nM <= 12; nM++) {
            select_month.push({ value: nM, text: nM + '月' });
        }
        bind_combobox(select_month, $('#search_ca_month'), 'text', 'value', false);
        bind_combobox(select_month, $('#dlg_search_ca_month'), 'text', 'value', false);
        bind_combobox(select_month, $('#dlg_ed_ca_month'), 'text', 'value', false);

        // $('#search_ca_month').combobox('setValue', date.getMonth());
        $('#dlg_search_ca_month').combobox('setValue', date.getMonth());
        $('#dlg_search_ca_month').combobox({
            onSelect: function () {
                refresh_dlg_tab_choise_ca_main_list(true)
            }
        });
        $('#dlg_ed_ca_month').combobox('setValue', date.getMonth()); 

        bind_combogrid_custom($('#search_fee_cu_id')); 
        bind_combogrid_custom($('#dlg_ed_ca_cu_id'));
        bind_combogrid_invoice($('#search_od_invoice_no')); 
        bind_combobox_tools_desc($('#search_od_route_tools_desc')); 
        init_tab_fee_list();
        init_page_of_ca_create_or_choise();

        init_tab_order_fee_group();


    //}, true);

}

//子页面获取 basesetting
function call_get_father_basesetting() {
    return basesetting;
} 
//woa_or_iv_order_fee发生更新 
function refresh_from_woa_or_iv_update() {
    load_order_fee();
}
function close_win_of_woa_or_iv_update() {
    $('#win_woa_or_iv_order_fee').window('close');
}
//初始化表格 费用表格 
function init_tab_fee_list() {
    cur_fee_list_query_params = {
        rnd: Math.random(),
        action: 'get_order_fee',
        rec_or_pay: cur_rec_or_pay,
        od_no: $.trim($('#search_od_no').val()),
        od_typ: $('#search_od_typ').combobox('getValues').toString(),
        od_status_id: $('#search_od_status_id').combobox('getValues').toString(),
        od_project_typ: $('#search_od_project_typ').combobox('getValues').toString(),
        od_water_way_flag: $('#search_od_water_way_flag').is(':checked') ? 1 : 0,
        od_sub_way_flag: $('#search_od_sub_way_flag').is(':checked') ? 1 : 0,
        od_road_way_flag: $('#search_od_road_way_flag').is(':checked') ? 1 : 0,
        od_air_way_flag: $('#search_od_air_way_flag').is(':checked') ? 1 : 0,
        od_route_tools_desc: $.trim($('#search_od_route_tools_desc').combogrid('getText')),
        od_route_tools_no: $.trim($('#search_od_route_tools_no').val()),
        od_bill_nos: $.trim($('#search_od_bill_nos').val()),
        od_cntr_nos: $.trim($('#search_od_cntr_nos').val()),
        fee_invoice_lock_flag: $('#search_fee_invoice_lock_flag').combobox('getValue'),
        fee_status: $('#search_fee_status').combobox('getValues').toString(),
        fee_cu_id: $('#search_fee_cu_id').data('cu_id'),
        fee_item_typ: $('#search_fee_item_typ').combobox('getValues').toString(),
        fee_currency_id: $('#search_fee_currency_id').combobox('getValues').toString(),
        fee_invoice_typ: $('#search_fee_invoice_typ').combobox('getValues').toString(),
        invoice_no: $('#search_od_invoice_no').combogrid('getText'),
        fee_rel_bill_no: $.trim($('#search_fee_rel_bill_no').val()),
        fee_limit_days_status: $('#search_fee_limit_days_status').combobox('getValue'),
        fee_dat_beg: $('#search_fee_dat_beg').datebox('getValue'),
        fee_dat_end: $('#search_fee_dat_end').datebox('getValue'),
        fee_record_id: $('#search_fee_record_id').combobox('getValues').toString(),
        fee_guess_amount: $.trim($('#search_fee_guess_amount').val()),
    };
    $("#tab_fee_list").datagrid({
        data:[],
        //url: '../Ashx/busi_order.ashx',
        //queryParams: cur_fee_list_query_params,
        method: 'post',
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [50, 100, 200, 500],
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true }
            , {
                field: 'fee_status_desc', title: '状态', sortable: true, width: 60,
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
                field: 'woa_total_amount', title: '已付', width: 80, sortable: true,
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
                field: 'fee_limit_dat', title: '付款账期', width: 80, sortable: true, 
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
                field: 'od_status_desc', title: '审核状态', width: 80, sortable: true,
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
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_order_fee', cur_rec_or_pay);
            
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

            parent.call_win_view_of_short_order_info(row.od_seq, row.od_no);
        },
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            cur_mm_select_row = row;
            $('#win_dv_view_of_approval_details_from_list').menu('show', {
                left: e.pageX,
                top: e.pageY 
            });
        }
    });
}

//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_fee_list_footer() {
    table_bootom_selected_desc_have_symbol($('#tab_fee_list'), 'selected_group_order_fee', cur_rec_or_pay);
}

//刷新数据
function refresh_tab_fee_list() {
    cur_fee_list_query_params = {
        rnd: Math.random(),
        action: 'get_order_fee',
        rec_or_pay: cur_rec_or_pay,
        od_no: $.trim($('#search_od_no').val()),
        od_typ: $('#search_od_typ').combobox('getValues').toString(),
        od_status_id: $('#search_od_status_id').combobox('getValues').toString(),
        od_project_typ: $('#search_od_project_typ').combobox('getValues').toString(),
        od_water_way_flag: $('#search_od_water_way_flag').is(':checked') ? 1 : 0,
        od_sub_way_flag: $('#search_od_sub_way_flag').is(':checked') ? 1 : 0,
        od_road_way_flag: $('#search_od_road_way_flag').is(':checked') ? 1 : 0,
        od_air_way_flag: $('#search_od_air_way_flag').is(':checked') ? 1 : 0,
        od_route_tools_desc: $.trim($('#search_od_route_tools_desc').combogrid('getText')),
        od_route_tools_no: $.trim($('#search_od_route_tools_no').val()),
        od_bill_nos: $.trim($('#search_od_bill_nos').val()),
        od_cntr_nos: $.trim($('#search_od_cntr_nos').val()),
        fee_invoice_lock_flag: $('#search_fee_invoice_lock_flag').combobox('getValue'),
        fee_status: $('#search_fee_status').combobox('getValues').toString(),
        fee_cu_id: $('#search_fee_cu_id').data('cu_id'),
        fee_item_typ: $('#search_fee_item_typ').combobox('getValues').toString(),
        fee_currency_id: $('#search_fee_currency_id').combobox('getValues').toString(),
        fee_invoice_typ: $('#search_fee_invoice_typ').combobox('getValues').toString(),
        invoice_no: $('#search_od_invoice_no').combogrid('getText'),
        fee_rel_bill_no: $.trim($('#search_fee_rel_bill_no').val()),
        fee_limit_days_status: $('#search_fee_limit_days_status').combobox('getValue'),
        fee_dat_beg: $('#search_fee_dat_beg').datebox('getValue'),
        fee_dat_end: $('#search_fee_dat_end').datebox('getValue'),
        fee_record_id: $('#search_fee_record_id').combobox('getValues').toString(),
        fee_guess_amount: $.trim($('#search_fee_guess_amount').val()),
    };
    $("#tab_fee_list").datagrid('options').url = '../Ashx/busi_order.ashx';
    $("#tab_fee_list").datagrid('load', cur_fee_list_query_params);
}
//刷新数据
function requery_tab_fee_list() {

    $("#tab_fee_list").datagrid('options').url = '../Ashx/busi_order.ashx';
    $("#tab_fee_list").datagrid('load', cur_fee_list_query_params);
}
//清空数据
function clear_query_tab_fee_list_params() {
    $('#search_od_no').val('');
    $('#search_od_typ').combobox('setValue', '');
    $('#search_od_status_id').combobox('setValue', '');
    $('#search_od_project_typ').combobox('setValue', '');
    $('#search_od_water_way_flag').prop('checked', false);
    $('#search_od_sub_way_flag').prop('checked', false);
    $('#search_od_road_way_flag').prop('checked', false);
    $('#search_od_air_way_flag').prop('checked', false);
    $('#search_fee_invoice_lock_flag').combobox('setValue', '');
    $('#search_od_route_tools_desc').combogrid('setText', '');
    $('#search_od_route_tools_desc').combogrid('setValue', '');
    $('#search_od_route_tools_no').val('');
    $('#search_od_bill_nos').val('');
    $('#search_od_cntr_nos').val('');
    $('#search_fee_status').combobox('setValue', '');
    $('#search_fee_cu_id').combogrid('setText', '');
    $('#search_fee_cu_id').data('cu_id', '');
    $('#search_fee_item_typ').combobox('setValue', '');
    $('#search_fee_currency_id').combobox('setValue', '');
    $('#search_fee_invoice_typ').combobox('setValue', '');
    $('#search_od_invoice_no').combogrid('setText', '');
    $('#search_fee_limit_days_status').combobox('setValue', '');
    $('#search_fee_dat_beg').datebox('setValue', '');
    $('#search_fee_dat_end').datebox('setValue', '');
    $('#search_fee_rel_bill_no').val('');
    $('#search_fee_record_id').combobox('setValue', '');
    $('#search_fee_guess_amount').val('');
    cur_fee_list_query_params = {
        rnd: Math.random(),
        action: 'get_order_fee',
        rec_or_pay: cur_rec_or_pay,
        od_no: $.trim($('#search_od_no').val()),
        od_typ: $('#search_od_typ').combobox('getValues').toString(),
        od_status_id: $('#search_od_status_id').combobox('getValues').toString(),
        od_project_typ: $('#search_od_project_typ').combobox('getValues').toString(),
        od_water_way_flag: $('#search_od_water_way_flag').is(':checked') ? 1 : 0,
        od_sub_way_flag: $('#search_od_sub_way_flag').is(':checked') ? 1 : 0,
        od_road_way_flag: $('#search_od_road_way_flag').is(':checked') ? 1 : 0,
        od_air_way_flag: $('#search_od_air_way_flag').is(':checked') ? 1 : 0,
        od_route_tools_desc: $.trim($('#search_od_route_tools_desc').combogrid('getText')),
        od_route_tools_no: $.trim($('#search_od_route_tools_no').val()),
        od_bill_nos: $.trim($('#search_od_bill_nos').val()),
        od_cntr_nos: $.trim($('#search_od_cntr_nos').val()),
        fee_invoice_lock_flag: $('#search_fee_invoice_lock_flag').combobox('getValue'),
        fee_status: $('#search_fee_status').combobox('getValues').toString(),
        fee_cu_id: $('#search_fee_cu_id').data('cu_id'),
        fee_item_typ: $('#search_fee_item_typ').combobox('getValues').toString(),
        fee_currency_id: $('#search_fee_currency_id').combobox('getValues').toString(),
        fee_invoice_typ: $('#search_fee_invoice_typ').combobox('getValues').toString(),
        invoice_no: $('#search_od_invoice_no').combogrid('getText'),
        fee_rel_bill_no: $.trim($('#search_fee_rel_bill_no').val()),
        fee_limit_days_status: $('#search_fee_limit_days_status').combobox('getValue'),
        fee_dat_beg: $('#search_fee_dat_beg').datebox('getValue'),
        fee_dat_end: $('#search_fee_dat_end').datebox('getValue'),
        fee_record_id: $('#search_fee_record_id').combobox('getValues').toString(),
        fee_guess_amount: $.trim($('#search_fee_guess_amount').val()),
    };
    $("#tab_fee_list").datagrid('options').url = '../Ashx/busi_order.ashx';
    $("#tab_fee_list").datagrid('load', cur_fee_list_query_params);
}
//woa_or_iv_order_fee发生更新 
function load_order_fee() {
    requery_tab_fee_list();
}
//下载
function download_order_fee() {
    var down_params = $.extend(true, {}, cur_fee_list_query_params);
    down_params.action = 'download_order_fee';
    window.open('../Ashx/busi_order.ashx?' + parseParams(down_params));
}
//查看账单
function win_view_of_ca_info() {
    var ca_seq = cur_mm_select_row.ca_seq;
    var ca_title = cur_mm_select_row.ca_title;
    if (ca_seq == undefined || ca_seq.length == 0) {
        $.messager.alert('错误', '错误：该费用未提交账单', 'error');
        return;
    }
    //自己打开 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_woa_or_iv_order_fee.aspx?rnd=' +
                        Math.random() + '&seq=' + ca_seq +
                        '&rec_or_pay=' + cur_rec_or_pay +
                        '&from_typ=CA' +
                        '&action=get_order_fee_by_ca_seq_of_bus' +
                        '" style="width:100%;height:100%; overflow:hidden; "></iframe>';

    $('#win_woa_or_iv_order_fee').window({ 
        content: content
    }).window('open');
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

//查看客户银行账户信息
function win_view_of_bank_info_from_list() {
    parent.call_win_view_of_bank_info_from_list(cur_mm_select_row.fee_cu_id);
}

//查看业务简报 
function win_view_of_short_order_info() {
    parent.call_win_view_of_short_order_info(cur_mm_select_row.od_seq, cur_mm_select_row.od_no);
}
//切换到专注模式  
function change_to_focus_model() {
    parent.call_change_to_focus_model_of_fee();
}
//初始表格
function init_tab_order_fee_group() {
     

    $("#tab_order_fee_group").datagrid({
        url: [],
        // url: '../Ashx/lead_query.ashx',
        //queryParams: cur_query_order_fee_group_params,
        method: 'post',

        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[
                { field: 'fee_cu_desc', title: '结算对象',  align: 'left' },
                { field: 'cr_name', title: '币种',  align: 'center' },
                { title: '已交账情况', colspan: 14, align: 'center' },
        ], [
                { field: 'fee_amount_of_commit', title: '小计',  align: 'center' },
                { title: '已销账', colspan: 5, align: 'center' },
                { title: '未销账', colspan: 8, align: 'center' },
        ], [
                { field: 'woa_amount_of_commit', title: '小计',  align: 'center' },
                { field: 'woa_amount_of_commit_of_noneinvoice', title: '不需票',  align: 'center' },
                { title: '需票', colspan: 3, align: 'center' },
                { field: 'unwoa_amount_of_commit', title: '小计',  align: 'center' },
                { field: 'unwoa_amount_of_commit_of_noneinvoice', title: '不需票',  align: 'center' },
                { title: '需票', colspan: 5, align: 'center' },
                { field: 'unwoa_amount_of_commit_of_approval', title: '通审',  align: 'center' },
        ], [
                { field: 'woa_amount_of_commit_of_invoice', title: '小计', align: 'center' },
                { field: 'woa_amount_of_commit_of_invoice_of_unrecord', title: '未录票', align: 'center' },
                { field: 'woa_amount_of_commit_of_invoice_of_record', title: '已录票', align: 'center' },

                { field: 'unwoa_amount_of_commit_of_invoice', title: '小计', align: 'center' },
                { field: 'unwoa_amount_of_commit_of_invoice_of_unrecord', title: '未录票', align: 'center' },
                { field: 'unwoa_amount_of_commit_of_invoice_of_record', title: '已录票', align: 'center' },
                { field: 'unwoa_amount_of_commit_of_unlimit', title: '未超账期', align: 'center' },
                { field: 'unwoa_amount_of_commit_of_limit', title: '超账期', align: 'center' },
        ]],
        onLoadSuccess: function (data) {

        },
        onDblClickCell: function (index, field, value) {
            var rows = $("#tab_order_fee_group").datagrid('getRows');

            var par = {
                rnd: Math.random(),
                action: 'get_order_fee_group_of_unwoa_and_commit',
                rec_or_pay: cur_rec_or_pay,
                fee_cu_id: rows[index].fee_cu_id,
                record_id: cur_query_order_fee_group_params.record_id,
                sales_id: cur_query_order_fee_group_params.sales_id,
                service_id: cur_query_order_fee_group_params.service_id,
                operation_id: cur_query_order_fee_group_params.operation_id,
                fee_dat_begin_year: cur_query_order_fee_group_params.fee_dat_begin_year,
                fee_dat_begin_month: cur_query_order_fee_group_params.fee_dat_begin_month,
                fee_dat_end_year: cur_query_order_fee_group_params.fee_dat_end_year,
                fee_dat_end_month: cur_query_order_fee_group_params.fee_dat_end_month,
                woa_flag: '',
                invoice_flag: '',
                record_invoice_flag: '',
                limit_fee_dat_flag: '',
                approval_flag: ''
            };
            //所有
            if (field == 'fee_amount_of_commit') {

            }
            //已销账
            if (field == 'woa_amount_of_commit') {
                par.woa_flag = 1;
            }
            //已销账 不开票 
            if (field == 'woa_amount_of_commit_of_noneinvoice') {
                par.woa_flag = 1;
                par.invoice_flag = 0;
            }
            //已销账 需票 小计
            if (field == 'woa_amount_of_commit_of_invoice') {
                par.woa_flag = 1;
                par.invoice_flag = 1;
            }
            // 已销账 需票 未录票
            if (field == 'woa_amount_of_commit_of_invoice_of_unrecord') {
                par.woa_flag = 1;
                par.invoice_flag = 1;
                par.record_invoice_flag = 0;
            }
            // 已销账 需票 已录票
            if (field == 'woa_amount_of_commit_of_invoice_of_record') {
                par.woa_flag = 1;
                par.invoice_flag = 1;
                par.record_invoice_flag = 1;
            }
            // 未销账 小计 
            if (field == 'unwoa_amount_of_commit') {
                par.woa_flag = 0;
            }
            // 未销账 不需票 小计 
            if (field == 'unwoa_amount_of_commit_of_noneinvoice') {
                par.woa_flag = 0;
                par.invoice_flag = 0;
            }

            // 未销账 需票 小计 
            if (field == 'unwoa_amount_of_commit_of_invoice') {
                par.woa_flag = 0;
                par.invoice_flag = 1;
            }

            // 未销账 需票 未录票 小计 
            if (field == 'unwoa_amount_of_commit_of_invoice_of_unrecord') {
                par.woa_flag = 0;
                par.invoice_flag = 1;
                par.record_invoice_flag = 0;
            }

            // 未销账 需票 已录票 小计 
            if (field == 'unwoa_amount_of_commit_of_invoice_of_record') {
                par.woa_flag = 0;
                par.invoice_flag = 1;
                par.record_invoice_flag = 1;
            }

            // 未销账 需票 未超期 小计 
            if (field == 'unwoa_amount_of_commit_of_unlimit') {
                par.woa_flag = 0;
                par.invoice_flag = 1;
                par.limit_fee_dat_flag = 0;
            }

            // 未销账 需票 已超期 小计 
            if (field == 'unwoa_amount_of_commit_of_limit') {
                par.woa_flag = 0;
                par.invoice_flag = 1;
                par.limit_fee_dat_flag = 1;
            }

            //通审未付 
            if (field == 'unwoa_amount_of_commit_of_approval') {
                par.woa_flag = 0;
                par.approval_flag = 1;
            }
            normal_page.window.call_refresh_tab_fee_list(par);

            $('#win_order_fee_group').dialog('close');
        }
    });
}

//打开汇总费用
function open_order_fee_group_window() {
    var cur_query_order_fee_group_params = {
        rnd: Math.random(),
        action: 'get_order_fee_group',
        rec_or_pay: cur_rec_or_pay,
        fee_cu_id: $('#search_win_fee_cu_id').data('cu_id'),
        fee_dat_begin_year: $('#search_win_fee_dat_begin_year').combobox('getValue'),
        fee_dat_begin_month: $('#search_win_fee_dat_begin_month').combobox('getValue'),
        fee_dat_end_year: $('#search_win_fee_dat_end_year').combobox('getValue'),
        fee_dat_end_month: $('#search_win_fee_dat_end_month').combobox('getValue'),
        service_id: $('#search_win_service_id').combobox('getValue'),
        operation_id: $('#search_win_operation_id').combobox('getValue'),
        sales_id: $('#search_win_sales_id').combobox('getValue'),
        record_id: $('#search_win_record_id').combobox('getValue'),
    };
    $("#tab_order_fee_group").datagrid('options').url = '../Ashx/lead_query.ashx';

    $("#tab_order_fee_group").datagrid('load', cur_query_order_fee_group_params);

    $('#win_order_fee_group').dialog('open');
}

 