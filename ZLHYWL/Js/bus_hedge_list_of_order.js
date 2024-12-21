var pageNumber = 1;
var pageSize = 50;
var basesetting = undefined;

var cur_fee_list_query_params = undefined;
var cur_hoa_list_query_params = undefined;
 
var cur_fee_list_of_hoa_pay = undefined;
var cur_fee_list_of_hoa_rec = undefined;
var cur_selected_hoa = undefined;

$(document).ready(function () { 
    $($('body')[0]).unbind('keydown').bind('keydown', custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);

    $('#dlg_choise_hoa_main').dialog({
        title: '请选择对冲计划并入',
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
                    $('#dlg_choise_hoa_main').dialog('close');
                }
            }]
    }).dialog('close');

    $('#dlg_new_hoa_main').dialog({
        title: '新建对冲计划',
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
                    $('#dlg_new_hoa_main').dialog('close');
                }
            }]
    }).dialog('close');
    $('#dlg_post_hoa_amc').dialog({
        title: '提交对冲计划审核',
        iconCls: 'icon-lock',
        autoOpen: false,
        modal: true,
        width: 370,
        minheight: 100,
        buttons: [
            {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_post_hoa_amc').dialog('close');
                }
            }
        ]
    }).dialog('close');

    $('#dlg_repost_hoa_amc').dialog({
        title: '重新提交对冲计划审核',
        iconCls: 'icon-lock',
        autoOpen: false,
        modal: true,
        width: 370,
        minheight: 100,
        buttons: [
        {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_repost_hoa_amc').dialog('close');
            }
        }]
    }).dialog('close');
    get_basesetting(); 
});

//获取基础数据
function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        basesetting = data;
        
        bind_combobox(basesetting.employe_list, $('#search_hoa_record_id'), 'u_real_name', 'u_id', false);
        //查询 费用界面
        bind_combobox(basesetting.order_typ_list, $('#search_od_typ'), 'ot_desc', 'ot_id', true);
        //bind_combobox(basesetting.company_list, $('#search_od_record_by_company_id'), 'c_desc', 'c_id', true);
        bind_combobox(basesetting.project_list, $('#search_od_project_typ'), 'pr_name', 'pr_id', true);
        bind_combobox(basesetting.fee_item_list, $('#search_fee_item_typ'), 'fee_cn', 'fee_id', true);

        bind_combobox(basesetting.currency_list, $('#search_fee_currency_id'), 'cr_name', 'cr_id', true);
        bind_combobox(basesetting.invoice_list, $('#search_fee_invoice_typ'), 'in_name', 'in_id', true);
         
        bind_combogrid_custom($('#search_fee_cu_id'));
        bind_combogrid_custom($('#search_hoa_cu_id'));
        bind_combogrid_custom($('#dlg_ed_hoa_cu_id'));
        
        bind_combogrid_invoice($('#search_od_invoice_no'));

        init_tab_fee_list();
        
        init_tab_hoa_list();

        init_dlg_tab_choise_hoa_main_list();

        init_tab_fee_list_of_hoa_pay();
        init_tab_fee_list_of_hoa_rec();
    }, true);

}


//初始化表格 费用表格 
function init_tab_fee_list() {
    cur_fee_list_query_params = {
        rnd: Math.random(),
        action: 'get_order_fee',
        rec_or_pay: $('#search_rec_or_pay').combobox('getValue'),
        od_no: $.trim($('#search_od_no').val()),
        od_typ: $('#search_od_typ').combobox('getValue'),
        od_status_id: $('#search_od_status_id').combobox('getValue'),
        od_project_typ: $('#search_od_project_typ').combobox('getValue'),
        od_water_way_flag: $('#search_od_water_way_flag').is(':checked') ? 1 : 0,
        od_sub_way_flag: $('#search_od_sub_way_flag').is(':checked') ? 1 : 0,
        od_road_way_flag: $('#search_od_road_way_flag').is(':checked') ? 1 : 0,
        od_air_way_flag: $('#search_od_air_way_flag').is(':checked') ? 1 : 0,
        od_route_tools_desc: $.trim($('#search_od_route_tools_desc').val()),
        od_route_tools_no: $.trim($('#search_od_route_tools_no').val()),
        od_bill_nos: $.trim($('#search_od_bill_nos').val()),
        od_cntr_nos: $.trim($('#search_od_cntr_nos').val()),

        fee_status: $('#search_fee_status').combobox('getValue'),
        fee_cu_id: $('#search_fee_cu_id').data('cu_id'),
        fee_item_typ: $('#search_fee_item_typ').combobox('getValue'),
        fee_currency_id: $('#search_fee_currency_id').combobox('getValue'),
        fee_invoice_typ: $('#search_fee_invoice_typ').combobox('getValue'),
        invoice_no: $.trim($('#search_od_invoice_no').combogrid('getText')),
        fee_limit_days_status: $('#search_fee_limit_days_status').combobox('getValue'),
        fee_dat_beg: $('#search_fee_dat_beg').datebox('getValue'),
        fee_dat_end: $('#search_fee_dat_end').datebox('getValue'),
    };
    $("#tab_fee_list").datagrid({
        url: '../Ashx/busi_order.ashx',
        queryParams: cur_fee_list_query_params,
        method: 'post',
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [50, 100, 200],
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
                  { title: '费用详情', align: 'center', colspan: 19 }
                , { title: '关联委托(费用全部成折算本币计算)', align: 'center', colspan: 11 }
                , { title: '维护明细', align: 'center', colspan: 4 }
            ],
            [
             {
                field: 'rec_or_pay', title: '收/付', width: 40, sortable: true,
                formatter: function (value, row, index) {
                    if (Number(value) == -1) return '应付';
                    if (Number(value) == 1) return '应收';
                },
                styler: function (value, row, index) {
                    if (Number(value) == -1) return 'background-color:#b3e7c7;color:#000';
                    if (Number(value) == 1) return 'background-color:#eecfcb;color:#000';
                }
             } ,
             {
                 field: 'fee_cu_id', title: '结算单位', width: 220, sortable: true,
                 formatter: function (value, row, index) {
                    return row.fee_cu_desc;
                 } 
             }
             , {
                 field: 'fee_dat', title: '业务时间', sortable: true, width: 78,
                 formatter: function (value, row, index) {
                     return dateformat(value,true);
                 }
             }
            , {
                field: 'fee_invoice_typ', title: '税率', sortable: true, width: 54,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                } 
            }
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 60,
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
                field: 'fee_price', title: '单价', sortable: true, width: 80,
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
                    if (row.rec_or_pay == -1) return 'background-color:#b3e7c7;color:#000';
                    if (row.rec_or_pay == 1) return 'background-color:#eecfcb;color:#000';
                }
            }
            , {
                field: 'woa_total_amount', title: '已销账', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return  Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (row.rec_or_pay == -1) return 'background-color:#b3e7c7;color:#000';
                    if (row.rec_or_pay == 1) return 'background-color:#eecfcb;color:#000'; 
                }
            }
            , {
                field: 'od_invoice_no', title: '发票号', width: 260, sortable: true,
            }
            , {
                field: 'fee_invoice_lock_dat', title: '发票时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'ca_amc_finish_dat', title: '通审时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
             , {
                 field: 'fee_finace_lock_dat', title: '销账时间', width: 80, sortable: true,
                 formatter: function (value, row, index) {
                     return dateformat(value, true);
                 }
             }

            , {
                field: 'fee_limit_dat', title: '收付账期', width: 80, sortable: true,
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
            , { field: 'od_no', title: '委托号', width: 88, sortable: true, }
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
           
            //, {
            //    field: 'fee_invoice_lock_nam', title: '开票人', width: 60, sortable: true,
            //}
         
            //, {
            //    field: 'fee_finace_lock_nam', title: '销账', width: 60, sortable: true,
            //}
            
        ]],
        onLoadSuccess: function (data) {
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_order_fee', cur_fee_list_query_params.cur_rec_or_pay);

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
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            $('#win_dv_view_of_approval_details_from_list').data('amc_id', row.amc_id);
            $('#win_dv_view_of_approval_details_from_list').data('cu_id', row.fee_cu_id);
            $('#win_dv_view_of_approval_details_from_list').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}

//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_fee_list_footer() {
    table_bootom_selected_desc_have_symbol($('#tab_fee_list'), 'selected_group_order_fee', cur_fee_list_query_params.cur_rec_or_pay);
         
}

//刷新数据
function refresh_tab_fee_list() {
    cur_fee_list_query_params = {
        rnd: Math.random(),
        action: 'get_order_fee',
        rec_or_pay: $('#search_rec_or_pay').combobox('getValue'),
        od_no: $.trim($('#search_od_no').val()),
        od_typ: $('#search_od_typ').combobox('getValue'),
        od_status_id: $('#search_od_status_id').combobox('getValue'),
        od_project_typ: $('#search_od_project_typ').combobox('getValue'),
        od_water_way_flag: $('#search_od_water_way_flag').is(':checked') ? 1 : 0,
        od_sub_way_flag: $('#search_od_sub_way_flag').is(':checked') ? 1 : 0,
        od_road_way_flag: $('#search_od_road_way_flag').is(':checked') ? 1 : 0,
        od_air_way_flag: $('#search_od_air_way_flag').is(':checked') ? 1 : 0,
        od_route_tools_desc: $.trim($('#search_od_route_tools_desc').val()),
        od_route_tools_no: $.trim($('#search_od_route_tools_no').val()),
        od_bill_nos: $.trim($('#search_od_bill_nos').val()),
        od_cntr_nos: $.trim($('#search_od_cntr_nos').val()),
        invoice_no: $.trim($('#search_od_invoice_no').combogrid('getText')),
        fee_limit_days_status: $('#search_fee_limit_days_status').combobox('getValue'),
        fee_status: $('#search_fee_status').combobox('getValue'),
        fee_cu_id: $('#search_fee_cu_id').data('cu_id'),
        fee_item_typ: $('#search_fee_item_typ').combobox('getValue'),
        fee_currency_id: $('#search_fee_currency_id').combobox('getValue'),
        fee_invoice_typ: $('#search_fee_invoice_typ').combobox('getValue'),

        fee_dat_beg: $('#search_fee_dat_beg').datebox('getValue'),
        fee_dat_end: $('#search_fee_dat_end').datebox('getValue'),
    };

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
    $('#search_od_route_tools_desc').val('');
    $('#search_od_route_tools_no').val('');
    $('#search_od_bill_nos').val('');
    $('#search_od_cntr_nos').val('');
    $('#search_fee_status').combobox('setValue','');
    $('#search_fee_cu_id').combogrid('setText', '');
    $('#search_fee_cu_id').data('cu_id','');
    $('#search_fee_item_typ').combobox('setValue', '');
    $('#search_fee_currency_id').combobox('setValue', '');
    $('#search_fee_invoice_typ').combobox('setValue', '');
    $('#search_od_invoice_no').combogrid('setText','');
    $('#search_fee_limit_days_status').combobox('setValue','');
    $('#search_fee_dat_beg').datebox('setValue', '');
    $('#search_fee_dat_end').datebox('setValue', ''); 

    cur_fee_list_query_params = {
        rnd: Math.random(),
        action: 'get_order_fee',
        rec_or_pay: $('#search_rec_or_pay').combobox('getValue'),
        od_no: $.trim($('#search_od_no').val()),
        od_typ: $('#search_od_typ').combobox('getValue'),
        od_status_id: $('#search_od_status_id').combobox('getValue'),
        od_project_typ: $('#search_od_project_typ').combobox('getValue'),
        od_water_way_flag: $('#search_od_water_way_flag').is(':checked') ? 1 : 0,
        od_sub_way_flag: $('#search_od_sub_way_flag').is(':checked') ? 1 : 0,
        od_road_way_flag: $('#search_od_road_way_flag').is(':checked') ? 1 : 0,
        od_air_way_flag: $('#search_od_air_way_flag').is(':checked') ? 1 : 0,
        od_route_tools_desc: $.trim($('#search_od_route_tools_desc').val()),
        od_route_tools_no: $.trim($('#search_od_route_tools_no').val()),
        od_bill_nos: $.trim($('#search_od_bill_nos').val()),
        od_cntr_nos: $.trim($('#search_od_cntr_nos').val()),
        invoice_no: $.trim($('#search_od_invoice_no').combogrid('getText')),
        fee_limit_days_status: $('#search_fee_limit_days_status').combobox('getValue'),
        fee_status: $('#search_fee_status').combobox('getValue'),
        fee_cu_id: $('#search_fee_cu_id').data('cu_id'),
        fee_item_typ: $('#search_fee_item_typ').combobox('getValue'),
        fee_currency_id: $('#search_fee_currency_id').combobox('getValue'),
        fee_invoice_typ: $('#search_fee_invoice_typ').combobox('getValue'),

        fee_dat_beg: $('#search_fee_dat_beg').datebox('getValue'),
        fee_dat_end: $('#search_fee_dat_end').datebox('getValue'),
    };

    $("#tab_fee_list").datagrid('load', cur_fee_list_query_params);
}

//初始化表格 对冲计划  
function init_tab_hoa_list() {
    cur_hoa_list_query_params = {
        rnd: Math.random(),
        action: 'get_hedge_off_accounts_record',
        hoa_cu_id: $('#search_hoa_cu_id').combogrid('getValue'),
        hoa_status: $('#search_hoa_status').combobox('getValue'),
        amc_status: $('#search_amc_status').combobox('getValue'),
        hoa_record_id: $('#search_hoa_record_id').combobox('getValue'),
        hoa_bank_dat_begin: $('#search_hoa_bank_dat_begin').datebox('getValue'),
        hoa_bank_dat_end: $('#search_hoa_bank_dat_end').datebox('getValue'),
        like_str: $.trim($('#search_like_str').val()),

    };
    $('#tab_hoa_list').datagrid({
        url: '../Ashx/checkaccount.ashx',
        queryParams: cur_hoa_list_query_params,
        method: 'post',
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [50, 100, 200],
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_hoa_list_bar',
        fit: true,
        checkbox: true,
        showFooter: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[
            { title: '', field: '_ck', width: 40, checkbox: true }
        ]],
        columns: [[
                { title: '综合状态属性', colspan: 4, align: 'center' }
                , { title: '对冲计划基本信息', colspan: 2, align: 'center' }
                , { title: '应收对冲金额', colspan: 2, align: 'center' }
                , { title: '应付对冲金额', colspan: 2, align: 'center' }
                , { title: '对冲差额', colspan: 2, align: 'center' }
                , { title: '其他', colspan: 3, align: 'center' }
        ]
            , [//显示的列
            {
                field: 'hoa_status', title: '计划状态', width: 50,
                formatter: function (value, row, index) {
                    if (Number(value) == 1) {
                        return '计划中';
                    } else {
                        return '已完结';
                    }
                },
                styler: function (value, row, index) {
                    switch (value) {
                        case 1: return 'background-color:#fff;color:#000;';
                        case 2: return 'background-color:#ef1956;color:#000;'; 
                    }
                }
            }
            , {
                field: 'amc_status', title: '审核', width: 40,
                formatter: function (value, row, index) { 
                    if (Number(value) == -99) {
                        return '未交审';
                    }
                    if (Number(value) == 0) {
                        return '退回';
                    }
                    if (Number(value) == 1) {
                        return '审核中';
                    }
                    if (Number(value) == 2) {
                        return '通过';
                    } 
                },
                styler: function (value, row, index) { 
                    if (Number(value) == -99) {
                        return 'background-color:#ff4d4d;color:#fff;';
                    }
                    if (Number(value) == 0) {
                        return 'background-color:#c8c8c8;color:#fe9047;';
                    }
                    if (Number(value) == 1) {
                        return 'background-color:#ffadad;color:#000;';
                    }
                    if (Number(value) == 2) {
                        return 'background-color:#aeffb6;color:#000;';
                    } 
                }
            }
            , {
                field: 'relation_no', title: '审核编号', width: 90,
            }
            , {
                field: 'amc_finish_dat', title: '通审时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , { field: 'hoa_cu_desc', title: '结算单位', width: 240, }
            , { field: 'hoa_title', title: '计划名称', sortable: true, width: 230 }
            , { field: 'hoa_rec_currency_group_desc', title: '金额', sortable: true, width: 150 }
            , {
                field: 'hoa_rec_total_money', title: '金额(本币)', width: 90,
                formatter: function (value, row, index) {
                    if (value == undefined) return 0;
                    return Number(value).toFixed(2);
                }
            }
            , { field: 'hoa_pay_currency_group_desc', title: '金额', sortable: true, width: 150 }
             , {
                 field: 'hoa_pay_total_money', title: '金额(本币)', width: 90,
                 formatter: function (value, row, index) {
                     if (value == undefined) return 0;
                     return Number(value).toFixed(2);
                 }
             }
            , { field: 'hoa_diff_currency_group_desc', title: '金额', sortable: true, width: 150 }
             , {
                 field: 'hoa_diff_total_money', title: '金额(本币)', width: 90,
                 formatter: function (value, row, index) {
                     if (value == undefined) return 0;
                     return Number(value).toFixed(2);
                 }
             }

            , { field: 'hoa_record_nam', title: '计划创建', sortable: true, width: 60 }
            , {
                field: 'hoa_record_dat', title: '创建时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            
            , { field: 'hoa_bak', title: '备注', sortable: true, width: 400 }
             

            ]],
        onLoadSuccess: function (data) { 
        },
        onDblClickRow: function (index, row) {
            //刷新 账单关联费用 
            cur_selected_hoa = row;
            refresh_fee_list_of_hoa(row.hoa_seq);
           
            
        },
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            $('#win_dv_view_of_approval_details_from_ca_list').data('amc_id', row.amc_id);
            $('#win_dv_view_of_approval_details_from_ca_list').data('cu_id', row.fee_cu_id);
            $('#win_dv_view_of_approval_details_from_ca_list').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}
//查看审核流程
function win_view_of_approval_details_from_ca_list() {
    var amc_id = $('#win_dv_view_of_approval_details_from_ca_list').data('amc_id');

    if (amc_id == undefined || amc_id.length == 0) {
        $.messager.alert('错误', '错误: 未提交账单审核', 'error');
        return;
    }

    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_approval_flow_details.aspx?rnd=' +
                        Math.random() + '&amc_id=' +
                        amc_id +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#win_approval_flow_details').window({
        title: '查看审核流程 ',
        content: content
    }).window('open');
}

//查看客户银行账户信息
function win_view_of_bank_info_from_ca_list() {
    var cu_id = $('#win_dv_view_of_approval_details_from_ca_list').data('cu_id');


    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_bank_info_by_cu_id',
        cu_id: cu_id,
    }, function (data) {

        $('#ap_bank_details tbody').html('');
        if (data.rows.length > 0) {
            $.each(data.rows, function (i, item) {
                $('#ap_bank_details tbody').append(
                      '<tr>'
                        + '<td><textarea  class="easyui-textarea" style=" overflow-x:hidden; font-size:18px; overflow-y:auto; resize:none; width:90%; height:82px;">' + item.bank_info + '</textarea> </td>'
                    + '</tr>');
            });
        }
        $('#win_cu_bank_info').window('open');

    }, false);
}


//查询 对冲计划
function requery_hoa_list() {
    cur_hoa_list_query_params = {
        rnd: Math.random(),
        action: 'get_hedge_off_accounts_record',
        hoa_cu_id: $('#search_hoa_cu_id').combogrid('getValue'),
        hoa_status: $('#search_hoa_status').combobox('getValue'),
        amc_status: $('#search_amc_status').combobox('getValue'),
        hoa_record_id: $('#search_hoa_record_id').combobox('getValue'),
        hoa_bank_dat_begin: $('#search_hoa_bank_dat_begin').datebox('getValue'),
        hoa_bank_dat_end: $('#search_hoa_bank_dat_end').datebox('getValue'),
        like_str: $.trim($('#search_like_str').val()),

    };

    $("#tab_hoa_list").datagrid('load', cur_hoa_list_query_params);
}
function refresh_hoa_list() {
    cur_hoa_list_query_params = {
        rnd: Math.random(),
        action: 'get_hedge_off_accounts_record',
        hoa_cu_id: $('#search_hoa_cu_id').combogrid('getValue'),
        hoa_status: $('#search_hoa_status').combobox('getValue'),
        amc_status: $('#search_amc_status').combobox('getValue'),
        hoa_record_id: $('#search_hoa_record_id').combobox('getValue'),
        hoa_bank_dat_begin: $('#search_hoa_bank_dat_begin').datebox('getValue'),
        hoa_bank_dat_end: $('#search_hoa_bank_dat_end').datebox('getValue'),
        like_str: $.trim($('#search_like_str').val()),

    };

    $("#tab_hoa_list").datagrid('reload', cur_hoa_list_query_params);

}

//加入账单
function insert_hedge_off_accounts_list() {

    //这里 不需要检测币种 
    //加入对冲条件 
    // 1 .  fee_status in (3,4) 
    // 2 .  fee_cu_id 必须一致 
    // 3 .  不能加入其它对冲计划  hoa_seq

    var isRight = true;

    //需要先进行本地判断
    /*
   
    */
    var selected_rows = $('#tab_fee_list').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误', '请选择费用条目后再执行此操作', 'error');
        return;
    }
    var temp_fee_cu_id = selected_rows[0].fee_cu_id;
    var temp_fee_cu_desc = selected_rows[0].fee_cu_desc;
    var temp_invoice_typ_flag = selected_rows[0].fee_invoice_typ_flag;
    var temp_total_money = 0;

    $.each(selected_rows, function (i, item) {
        if (item.fee_cu_id != temp_fee_cu_id) {
            isRight = false;
            return;
        }
    });
    if (!isRight) {
        $.messager.alert('错误', '选择费用必须是同一家结算单位，否则不符合加入对冲计划条件', 'error');
        return;
    }
    $.each(selected_rows, function (i, item) {
        if (!(item.fee_status == 3 || item.fee_status == 4)) {
            isRight = false;
            return;
        }
    });
    if (!isRight) {
        $.messager.alert('错误', '费用必须是归账且账单已交账，同时费用不能是已完整销账状态，否则不符合加入对冲计划条件', 'error');
        return;
    }
    $.each(selected_rows, function (i, item) {
        if (item.fee_change_lock_flag == 1) {
            isRight = false;
            return;
        }
    });
    if (!isRight) {
        $.messager.alert('错误', '提交的费用中，存在正在执行改单审核的项目，加入对冲计划条件', 'error');
        return;
    }
    //交给后台判断 
    //$.each(selected_rows, function (i, item) {
    //    if (item.hoa_seq != undefined && item.hoa_seq != null) {
    //        isRight = false;
    //        return;
    //    }
    //});
    //if (!isRight) {
    //    $.messager.alert('错误', '提交的费用中存在已加入对冲计划情况，不符合加入对冲计划条件', 'error');
    //    return;
    //}
    var select_year_month = [];
    var fee_seqs = '';

    $.each(selected_rows, function (i, item) {
        
        temp_total_money += item.fee_price * item.fee_number * item.fee_currency_rate;

        if (fee_seqs.length == 0) {
            fee_seqs = item.fee_seq;
        } else {
            fee_seqs += ',' + item.fee_seq;
        }

        var item_fee_dat = eval('new Date(' + item.fee_dat.replace(/\d+(?=-[^-]+$)/, function (a) {
            //console(a);
            return parseInt(a, 10);
        }).match(/\d+/g) + ')');

        var has = false;
        $.each(select_year_month, function (y, yrow) {
            if (yrow.year == item_fee_dat.getFullYear() && yrow.month == item_fee_dat.getMonth()) {
                yrow.count += 1;
                has = true;
            }
        });

        if (!has) {
            select_year_month.push({
                year: item_fee_dat.getFullYear(),
                month: item_fee_dat.getMonth(),
                count: 1
            });
        }

    });
    //找出最多的 年和月 
    var max_year_month_count = select_year_month[0];

    $.each(select_year_month, function (y, yrow) {
        if (yrow.count > max_year_month_count.count) {
            max_year_month_count = yrow;
        }
    });
 
    $('#dlg_hoa_cu_id').val(temp_fee_cu_id);

    $('#dlg_hoa_total_rowcount').html(selected_rows.length);
    $('#dlg_hoa_total_money').html(temp_total_money.toFixed(2));
    $('#dlg_hoa_cu_desc').html(temp_fee_cu_desc);

   
    //再打开对话框
    refresh_dlg_tab_choise_hoa_main_list();
     
    $('#dlg_choise_hoa_main').dialog({
        title: '请选择对冲计划并入',
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
                    $('#dlg_choise_hoa_main').dialog('close');
                }
            }
            , {
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {

                    var hoa_rows = $('#dlg_tab_choise_hoa_main_list').datagrid('getChecked');

                    if (hoa_rows.length == 0) {
                        $.messager.alert('错误', '错误: 请选择对冲计划后在执行此操作', 'error');
                        return;
                    }
                    post('../Ashx/checkaccount.ashx', {
                        rnd: Math.random(),
                        action: 'insert_hedge_off_accounts_details',
                        fee_seqs: fee_seqs,
                        hoa_seq: hoa_rows[0].hoa_seq
                    }, function (data) {

                        if (data.result == 1) {
                            $.messager.alert('提示', data.msg, 'info');
                            $('#dlg_choise_hoa_main').dialog('close');
                            $("#tab_fee_list").datagrid('load', cur_fee_list_query_params);
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                            return;
                        }

                    }, true);
                }
            }
        ]
    }).dialog('open');
}

//初始化 账单选择
function init_dlg_tab_choise_hoa_main_list() {
    $("#dlg_tab_choise_hoa_main_list").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        toolbar: '#dlg_tab_choise_hoa_list_bar',
        checkbox: false,
        showFooter: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[
            { title: '', field: '_ck', width: 40, checkbox: true }
        ]],
        columns: [[//显示的列 
             
            {
                field: 'hoa_status', title: '计划状态', width: 50,
                formatter: function (value, row, index) {
                    if (Number(value) == 1) {
                        return '计划中';
                    } else {
                        return '已完结';
                    }
                },
                styler: function (value, row, index) {
                    switch (value) {
                        case 1: return 'background-color:#fff;color:#000;';
                        case 2: return 'background-color:#ef1956;color:#000;';
                    }
                }
            }
            , {
                field: 'amc_status', title: '审核', width: 40,
                formatter: function (value, row, index) {
                    if (Number(value) == -99) {
                        return '未交审';
                    }
                    if (Number(value) == 0) {
                        return '退回';
                    }
                    if (Number(value) == 1) {
                        return '审核中';
                    }
                    if (Number(value) == 2) {
                        return '通过';
                    }
                },
                styler: function (value, row, index) {
                    if (Number(value) == -99) {
                        return 'background-color:#ff4d4d;color:#fff;';
                    }
                    if (Number(value) == 0) {
                        return 'background-color:#c8c8c8;color:#fe9047;';
                    }
                    if (Number(value) == 1) {
                        return 'background-color:#ffadad;color:#000;';
                    }
                    if (Number(value) == 2) {
                        return 'background-color:#aeffb6;color:#000;';
                    }
                }
            }
            , { field: 'hoa_cu_desc', title: '结算单位', width: 240, }
            , { field: 'hoa_title', title: '计划名称', sortable: true, width: 230 }
            , {
                field: 'hoaprofit_total_amount_money', title: '总应收未销账(本币)', width: 160,
                formatter: function (value, row, index) {
                    if (value == undefined) return 0;
                    return Number(value).toFixed(2);
                }
            }
            , { field: 'hoa_rec_currency_group_desc', title: '总应收未销账费用组成', sortable: true, width: 150 }
             , {
                 field: 'hoa_pay_total_money', title: '总应付未销账(本币)', width: 160,
                 formatter: function (value, row, index) {
                     if (value == undefined) return 0;
                     return Number(value).toFixed(2);
                 }
             }
            , { field: 'hoa_pay_currency_group_desc', title: '总应付未销账费用组成', sortable: true, width: 150 }

            , { field: 'hoa_create_nam', title: '计划创建', sortable: true, width: 60 }
            , {
                field: 'hoa_create_dat', title: '创建时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }

            , { field: 'hoa_bak', title: '备注', sortable: true, width: 400 }

        ]],
        onLoadSuccess: function (data) { 
        },
    });
}

//刷新账单选择 
function refresh_dlg_tab_choise_hoa_main_list() {
    
    
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_hedge_off_accounts_record_no_page', 
        hoa_cu_id: $('#dlg_hoa_cu_id').val(), 
    }, function (data) {
        $('#dlg_tab_choise_hoa_main_list').datagrid('loadData', data);


    }, true);
     

}

//新建销账计划
function insert_hoa_main() {
    var cur_rows = $('#tab_fee_list').datagrid('getChecked');

    //找出最多的 年和月
    var select_year_month = [];
    //找出 费项生成备注
    var select_fee_item = [];
    //找出 币种生成备注 
    var select_currency_typ = [];
    //找出 发票类型生成备注
    var select_invoice_typ = [];
    //计费单位和数量
    var select_unit = []; 
    //找出货运明细 ？暂缓  
    $.each(cur_rows, function (i, item) {
        var item_fee_dat = eval('new Date(' + item.fee_dat.replace(/\d+(?=-[^-]+$)/, function (a) {
            //console(a);
            return parseInt(a, 10);
        }).match(/\d+/g) + ')');
        var has = false;
        $.each(select_year_month, function (y, yrow) {
            if (yrow.year == item_fee_dat.getFullYear() && yrow.month == item_fee_dat.getMonth()) {
                yrow.count += 1;
                has = true;
            }
        });
        if (!has) {
            select_year_month.push({
                year: item_fee_dat.getFullYear(),
                month: item_fee_dat.getMonth(),
                count: 1
            });
        }

        has = false;
        $.each(select_fee_item, function (f, frow) {
            if (frow.fee_item_typ == item.fee_item_typ) {
                has = true;
                frow.fee_item_money += item.fee_amount;
            }
        });
        if (!has) {
            select_fee_item.push({
                fee_item_typ: item.fee_item_typ,
                fee_item_typ_desc: item.fee_item_typ_desc,
                fee_item_money: item.fee_amount
            });
        }
        has = false;
        $.each(select_currency_typ, function (c, crow) {
            if (crow.fee_currency_id == item.fee_currency_id) {
                has = true;
                crow.fee_currency_money += item.fee_amount;
            }
        });
        if (!has) {
            select_currency_typ.push({
                fee_currency_id: item.fee_currency_id,
                fee_currency_desc: item.fee_currency_desc,
                fee_currency_money: item.fee_amount
            });
        }
        has = false;
        $.each(select_invoice_typ, function (i, irow) {
            if (irow.fee_invoice_typ == item.fee_invoice_typ) {
                has = true;
                irow.fee_invoice_typ_money += item.fee_amount;
            }
        });
        if (!has) {
            select_invoice_typ.push({
                fee_invoice_typ: item.fee_invoice_typ,
                fee_invoice_typ_desc: item.fee_invoice_typ_desc,
                fee_invoice_typ_money: item.fee_amount
            });
        }

        has = false;
        $.each(select_unit, function (i, irow) {
            if (irow.fee_unit == item.fee_unit) {
                has = true;
                irow.fee_unit_count += item.fee_number;
            }
        });
        if (!has) {
            select_unit.push({
                fee_unit: item.fee_unit,
                fee_unit_desc: item.fee_unit_desc,
                fee_unit_count: item.fee_number
            });
        }
    });

    //找出最多的 年和月 
    var max_year_month_count = select_year_month[0];
    $.each(select_year_month, function (y, yrow) {
        if (yrow.count > max_year_month_count.count) {
            max_year_month_count = yrow;
        }
    });
    //生成 发票备注 
    var bak_invoice_typ = '税率:';
    $.each(select_invoice_typ, function (i, irow) {
        bak_invoice_typ += ' ' + irow.fee_invoice_typ_desc + '(' + irow.fee_invoice_typ_money.toFixed(2) + ')';
    });
    //生成 费项备注 
    var bak_fee_item = '费项:';
    $.each(select_fee_item, function (i, irow) {
        bak_fee_item += ' ' + irow.fee_item_typ_desc + '(' + irow.fee_item_money.toFixed(2) + ')';
    });
    //生成 币种备注 
    var bak_currency_typ = '币种:';
    $.each(select_currency_typ, function (i, irow) {
        bak_currency_typ += ' ' + irow.fee_currency_desc + '(' + irow.fee_currency_money.toFixed(2) + ')';
    });
    //生成 计量单位 
    var bak_unit = '数量:';
    $.each(select_unit, function (i, irow) {
        bak_unit += ' ' + irow.fee_unit_desc + '(' + irow.fee_unit_count + ')';
    });
    $('#dlg_choise_hoa_main').dialog('close');
    $('#dlg_ed_hoa_seq').val('');
    $('#dlg_ed_hoa_cu_id').combogrid('enable');

    var hoa_cu_id = $('#dlg_hoa_cu_id').val();
    var hoa_cu_desc = $('#dlg_hoa_cu_desc').html();
    
    //当前参数中是否有 结算单位  
    $('#dlg_ed_hoa_cu_id').data('cu_id', hoa_cu_id);
    $('#dlg_ed_hoa_cu_id').combogrid('setText', hoa_cu_desc);
    $('#dlg_ed_hoa_title').val(hoa_cu_desc + max_year_month_count.year + '年' + max_year_month_count.month + '月对冲计划');

    $('#dlg_ed_hoa_bak').val('');
   //  $('#dlg_ed_hoa_bak').val(bak_currency_typ + '\r' + bak_fee_item + '\r' + bak_invoice_typ + '\r' + bak_unit);
     

    $('#dlg_new_hoa_main').dialog({
        title: '新建对冲计划',
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
                    $('#dlg_new_hoa_main').dialog('close');
                }
            }, {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {

                    var par = {
                        rnd: Math.random(),
                        action: 'insert_hedge_off_accounts_record',
                        hoa_seq: $('#dlg_ed_hoa_seq').val(),
                        hoa_cu_id: $('#dlg_ed_hoa_cu_id').data('cu_id'),
                        hoa_title: $.trim($('#dlg_ed_hoa_title').val()), 
                        hoa_bak: $('#dlg_ed_hoa_bak').val(), 
                    }; 
                     
                    //邀约对账单，必须填写标题
                    if (par.hoa_title.length == 0) {
                        $.messager.alert('错误', '计划标题必须填写', 'error');
                        return;
                    }
                     
                    if (par.hoa_seq.length == 0) {
                        par.action = 'insert_hedge_off_accounts_record';
                    }  

                    if (isNaN(par.hoa_cu_id)) {
                        $.messager.alert('错误', '必须选择结算单位', 'error');
                        return;
                    } else {
                        if (par.hoa_cu_id != hoa_cu_id) {
                            $.messager.alert('错误', '新建对冲计划结算单位和选择费用结算单位不一致!', 'error');
                            return;
                        }
                    }
                    post('../Ashx/checkaccount.ashx', par,
                    function (data) {
                        if (data.result == 1) {
                            refresh_hoa_list();
                            $('#dlg_new_hoa_main').dialog('close');
                            var selected_rows = $('#tab_fee_list').datagrid('getChecked');
                            var fee_seqs = '';
                            var temp_total_money = 0;

                            $.each(selected_rows, function (i, item) {
                                temp_total_money += item.fee_price * item.fee_number * item.fee_currency_rate;

                                if (fee_seqs.length == 0) {
                                    fee_seqs = item.fee_seq;
                                } else {
                                    fee_seqs += ',' + item.fee_seq;
                                }

                            });
                            var _now_hoa_seq = data.hoa_seq;
                            $.messager.confirm('提示', '对冲计划新建完成，是否将选中费用(共计:' + temp_total_money.toFixed(2) + ')加入到此对冲计划？',
                            function (r) {
                                if (!r) {
                                    $('#dlg_new_ca_main').dialog('close');
                                } else {

                                    post('../Ashx/checkaccount.ashx', {
                                        rnd: Math.random(),
                                        action: 'insert_hedge_off_accounts_details',
                                        fee_seqs: fee_seqs,
                                        hoa_seq: _now_hoa_seq
                                    }, function (data2) {
                                        if (data2.result == 1) {
                                            $.messager.alert('提示', data2.msg, 'info');
                                            $("#tab_fee_list").datagrid('load', cur_fee_list_query_params);
                                        } else {
                                            $.messager.alert('错误',data2.msg, 'error');
                                            return;
                                        }

                                    }, true);
                                }
                            });

                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        }
                    }, true);
                }
            }]
    }).dialog('open');
}

//初始化 账单关联的 费用
function init_tab_fee_list_of_hoa_pay() {

    $("#tab_fee_list_of_hoa_pay").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_fee_list_of_hoa_pay_bar',
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
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
        ]],
        columns: [[
                  { title: '费用详情', align: 'center', colspan: 17 }
                , { title: '关联委托(费用全部成折算本币计算)', align: 'center', colspan: 11 }
                , { title: '维护明细', align: 'center', colspan: 4 }
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
                field: 'od_invoice_no', title: '发票号', width: 260, sortable: true,
            }
            , {
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'ca_amc_finish_dat', title: '通审时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
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
            , { field: 'od_no', title: '委托号', width: 88, sortable: true, }
            , { field: 'od_typ_desc', title: '业务类型', width: 80, sortable: true, }
            , { field: 'od_project_typ_desc', title: '项目类型', width: 80, sortable: true, }
            , {
                field: 'rec_total_amount', title: '总应收', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.rec_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.rec_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#bc1604;color:#FFF;';
                }
            }
            , {
                field: 'reced_total_amount', title: '实收', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.reced_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.rec_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else if (Number(row.rec_total_amount) == Number(row.reced_total_amount)) return 'background-color:#bc1604;color:#fff;';
                    else return 'background-color:#f2bea5;color:#FFF;';
                }
            }
            , {
                field: 'unreced_total_amount', title: '未收', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.unreced_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.rec_total_amount) == 0 || Number(row.unreced_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#f9b9f5;color:#000;';
                }
            }
            , {
                field: 'pay_total_amount', title: '总应付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.pay_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.pay_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#b3e7c7;color:#000';
                }
            }
            , {
                field: 'payed_total_amount', title: '实付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.payed_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.pay_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else if (Number(row.pay_total_amount) == Number(row.payed_total_amount)) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#02bd1d;color:#FFF;';
                }
            }
            , {
                field: 'unpayed_total_amount', title: '未付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.unpayed_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.pay_total_amount) == 0 || Number(row.unpayed_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#02bd1d;color:#fff;';
                }
            }
            , {
                field: 'profit_total_amount', title: '盈利', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return (Number(row.rec_total_amount) - Number(row.pay_total_amount)).toFixed(2);
                },
                styler: function (value, row, index) {
                    return 'background-color:#bc1604;color:#FFF;';
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

            //, {
            //    field: 'fee_invoice_lock_nam', title: '开票人', width: 60, sortable: true,
            //}
            //, {
            //    field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true,
            //    formatter: function (value, row, index) {
            //        return dateformat(value, true);
            //    }
            //}
            //, {
            //    field: 'fee_finace_lock_nam', title: '销账', width: 60, sortable: true,
            //}
            //, {
            //    field: 'fee_finace_lock_dat', title: '销账时间', width: 80, sortable: true,
            //    formatter: function (value, row, index) {
            //        return dateformat(value, true);
            //    }
            //}
            ]],
        onLoadSuccess: function (data) {
            
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_fee_list_of_hoa_pay'), rowIndex); 
        }, 
        onDblClickRow: function (index, row) { 
            //这里 应该 改一下 
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#window_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        },
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            $('#win_dv_view_of_approval_details_from_list').data('amc_id', row.amc_id);
            $('#win_dv_view_of_approval_details_from_list').data('cu_id', row.fee_cu_id);
            $('#win_dv_view_of_approval_details_from_list').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}
//初始化 账单关联的 费用
function init_tab_fee_list_of_hoa_rec() {

    $("#tab_fee_list_of_hoa_rec").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_fee_list_of_hoa_rec_bar',
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
            { title: '', field: 'fee_seq',  width: 40, checkbox: true }
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
        ]],
        columns: [[
                  { title: '费用详情', align: 'center', colspan: 17 }
                , { title: '关联委托(费用全部成折算本币计算)', align: 'center', colspan: 11 }
                , { title: '维护明细', align: 'center', colspan: 4 }
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
                    return 'background-color:#eecfcb;color:#000';
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
                    return 'background-color:#eecfcb;color:#000';
                }
            }
            , {
                field: 'od_invoice_no', title: '发票号', width: 260, sortable: true,
            }
            , {
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'ca_amc_finish_dat', title: '通审时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
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
            , {
                field: 'od_status_desc',title: '审核状态', width: 80, sortable: true,
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
            , { field: 'od_no', title: '委托号', width: 88, sortable: true, }
            , { field: 'od_typ_desc', title: '业务类型', width: 80, sortable: true, }
            , { field: 'od_project_typ_desc', title: '项目类型', width: 80, sortable: true, }
            , {
                field: 'rec_total_amount', title: '总应收', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.rec_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.rec_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#bc1604;color:#FFF;';
                }
            }
            , {
                field: 'reced_total_amount', title: '实收', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.reced_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.rec_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else if (Number(row.rec_total_amount) == Number(row.reced_total_amount)) return 'background-color:#bc1604;color:#fff;';
                    else return 'background-color:#f2bea5;color:#FFF;';
                }
            }
            , {
                field: 'unreced_total_amount', title: '未收', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.unreced_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.rec_total_amount) == 0 || Number(row.unreced_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#f9b9f5;color:#000;';
                }
            }
            , {
                field: 'pay_total_amount', title: '总应付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.pay_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.pay_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#b3e7c7;color:#000';
                }
            }
            , {
                field: 'payed_total_amount', title: '实付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.payed_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.pay_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else if (Number(row.pay_total_amount) == Number(row.payed_total_amount)) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#02bd1d;color:#FFF;';
                }
            }
            , {
                field: 'unpayed_total_amount', title: '未付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return Number(row.unpayed_total_amount).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (Number(row.pay_total_amount) == 0 || Number(row.unpayed_total_amount) == 0) return 'background-color:#fff;color:#000;';
                    else return 'background-color:#02bd1d;color:#fff;';
                }
            }
            , {
                field: 'profit_total_amount', title: '盈利', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return (Number(row.rec_total_amount) - Number(row.pay_total_amount)).toFixed(2);
                },
                styler: function (value, row, index) {
                    return 'background-color:#bc1604;color:#FFF;';
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

            //, {
            //    field: 'fee_invoice_lock_nam', title: '开票人', width: 60, sortable: true,
            //}
            //, {
            //    field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true,
            //    formatter: function (value, row, index) {
            //        return dateformat(value, true);
            //    }
            //}
            //, {
            //    field: 'fee_finace_lock_nam', title: '销账', width: 60, sortable: true,
            //}
            //, {
            //    field: 'fee_finace_lock_dat', title: '销账时间', width: 80, sortable: true,
            //    formatter: function (value, row, index) {
            //        return dateformat(value, true);
            //    }
            //}
            ]],
        onLoadSuccess: function (data) {
            
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_fee_list_of_hoa_rec'), rowIndex); 
        },
         
        onDblClickRow: function (index, row) {

            //这里 应该 改一下 
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#window_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        },
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            $('#win_dv_view_of_approval_details_from_list').data('amc_id', row.amc_id);
            $('#win_dv_view_of_approval_details_from_list').data('cu_id', row.fee_cu_id);
            $('#win_dv_view_of_approval_details_from_list').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}
//查看审核流程
function win_view_of_approval_details_from_list() {
    var amc_id = $('#win_dv_view_of_approval_details_from_list').data('amc_id');

    if (amc_id == undefined || amc_id.length == 0) {
        $.messager.alert('错误', '错误: 未提交业务审核', 'error');
        return;
    }

    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_approval_flow_details.aspx?rnd=' +
                        Math.random() + '&amc_id=' +
                        amc_id +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#win_approval_flow_details').window({
        title: '查看审核流程 ',
        content: content
    }).window('open');
}

//查看客户银行账户信息
function win_view_of_bank_info_from_list() {
    var cu_id = $('#win_dv_view_of_approval_details_from_list').data('cu_id');


    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_bank_info_by_cu_id',
        cu_id: cu_id,
    }, function (data) {

        $('#ap_bank_details tbody').html('');
        if (data.rows.length > 0) {
            $.each(data.rows, function (i, item) {
                $('#ap_bank_details tbody').append(
                      '<tr>'
                        + '<td><textarea  class="easyui-textarea" style=" overflow-x:hidden; font-size:18px; overflow-y:auto; resize:none; width:90%; height:82px;">' + item.bank_info + '</textarea> </td>'
                    + '</tr>');
            });
        }
        $('#win_cu_bank_info').window('open');

    }, false);
}

//刷新 关联账单 
function refresh_fee_list_of_hoa(hoa_seq) {
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_hedge_off_accounts_record_single',
        hoa_seq: hoa_seq
    }, function (data) {
        //需要进行 关联
        //绑定筛选项目 : 
        //记录人: mulit_search_record_by_id
        cur_selected_hoa = data.hoa_base[0];

        $('#sh_hoa_title').html(cur_selected_hoa.hoa_title);
        $('#sh_hoa_create_nam').html(cur_selected_hoa.hoa_record_nam);
        $('#sh_hoa_create_dat').html(dateformat(cur_selected_hoa.hoa_record_dat,true));
        $('#wof_ff_woa_bak').val(cur_selected_hoa.hoa_bak);
        $('#sh_hoa_rec_total_money').html(cur_selected_hoa.hoa_rec_total_money);
        $('#sh_hoa_pay_total_money').html(cur_selected_hoa.hoa_pay_total_money);
        $('#sh_hoa_rec_currency_group_desc').html(cur_selected_hoa.hoa_rec_currency_group_desc);
        $('#sh_hoa_pay_currency_group_desc').html(cur_selected_hoa.hoa_pay_currency_group_desc);
        $('#sh_hoa_diff_total_money').html(cur_selected_hoa.hoa_diff_total_money);
        $('#sh_hoa_diff_currency_group_desc').html(cur_selected_hoa.hoa_diff_currency_group_desc);
        var amc_status_desc = '';

        switch (Number(cur_selected_hoa.amc_status)) {
            case -99: amc_status_desc = '未申请'; break;
            case 0: amc_status_desc = '退回'; break;
            case 1: amc_status_desc = '审核中'; break;
            case 2: amc_status_desc = '审核通过'; break; 
        }

        $('#sh_amc_status_desc').html(amc_status_desc);
        $('#sh_hoa_status_desc').html(cur_selected_hoa.hoa_status == 1?'计划中':'已完结');
        var now_time = basesetting.sys_time; 
        $('#wof_ff_woa_bank_dat').datebox('setValue', dateformat(now_time, true));

        var base_hoa

        var pay_details = data.pay_fee[0];

        var arr_record_by_id = [];
        var arr_fee_item_typ = [];
        var arr_invoice_typ = [];
        var arr_fee_unit = [];
        var arr_fee_currency = [];

        $.each(pay_details.rows, function (i, rrow) {
            var has = false;
            $.each(arr_record_by_id, function (r, item) {
                if (item.value == rrow.ca_record_by_id) {
                    has = true;
                }
            });
            if (!has) {
                arr_record_by_id.push({
                    label: rrow.ca_record_by_nam,
                    value: rrow.ca_record_by_id
                });
            }

            has = false;
            $.each(arr_fee_item_typ, function (r, item) {
                if (item.value == rrow.fee_item_typ) {
                    has = true;
                }
            });
            if (!has) {
                arr_fee_item_typ.push({
                    label: rrow.fee_item_typ_desc,
                    value: rrow.fee_item_typ
                });
            }

            has = false;
            $.each(arr_invoice_typ, function (r, item) {
                if (item.value == rrow.fee_invoice_typ) {
                    has = true;
                }
            });
            if (!has) {
                arr_invoice_typ.push({
                    label: rrow.fee_invoice_typ_desc,
                    value: rrow.fee_invoice_typ
                });
            }

            has = false;
            $.each(arr_fee_unit, function (r, item) {
                if (item.value == rrow.fee_uint) {
                    has = true;
                }
            });
            if (!has) {
                arr_fee_unit.push({
                    label: rrow.fee_unit_desc,
                    value: rrow.fee_uint
                });
            }

            has = false;
            $.each(arr_fee_currency, function (r, item) {
                if (item.value == rrow.fee_currency_id) {
                    has = true;
                }
            });
            if (!has) {
                arr_fee_currency.push({
                    label: rrow.fee_currency_desc,
                    value: rrow.fee_currency_id
                });
            }
        });

        bind_combobox(arr_record_by_id, $('#mulit_search_record_by_id_pay'), 'label', 'value', true);
        bind_combobox(arr_fee_item_typ, $('#mulit_search_fee_item_typ_pay'), 'label', 'value', true);
        bind_combobox(arr_invoice_typ, $('#mulit_search_fee_invoice_typ_pay'), 'label', 'value', true);
        bind_combobox(arr_fee_unit, $('#mulit_search_fee_unit_pay'), 'label', 'value', true);
        bind_combobox(arr_fee_currency, $('#mulit_search_fee_currency_id_pay'), 'label', 'value', true);

        //if (pay_details.rows.length > 0) {
        //    $('#cur_fee_all_pay_fee_amount_of_hoa').html(Number(pay_details.pay_total_amount).toFixed(2));
        //    $('#cur_fee_all_payed_fee_amount_of_hoa').html(Number(pay_details.payed_total_amount).toFixed(2));
        //    $('#cur_fee_all_unpayed_fee_amount_of_hoa').html(Number(pay_details.unpayed_total_amount).toFixed(2));
        //} else {
        //    $('#cur_fee_all_pay_fee_amount_of_hoa').html(0);
        //    $('#cur_fee_all_payed_fee_amount_of_hoa').html(0);
        //    $('#cur_fee_all_unpayed_fee_amount_of_hoa').html(0);
        //}
        table_bottom_group_desc(pay_details.group_fee_desc, pay_details.total, 'all_group_order_fee_pay', -1);
        cur_fee_list_of_hoa_pay = pay_details.rows;

        $('.mulit_search_fee_of_hoa_pay').combobox({
            onSelect: function () {
                var record_by_id = $('#mulit_search_record_by_id_pay').combobox('getValue');
                var fee_item_typ = $('#mulit_search_fee_item_typ_pay').combobox('getValue');
                var invoice_typ = $('#mulit_search_fee_invoice_typ_pay').combobox('getValue');
                var fee_unit = $('#mulit_search_fee_unit_pay').combobox('getValue');
                var fee_currency = $('#mulit_search_fee_currency_id_pay').combobox('getValue');

                var new_fee_list_of_ca = [];

                $.each(cur_fee_list_of_hoa_pay, function (i, item) {

                    if ((record_by_id == undefined || record_by_id.length == 0 || item.ca_record_by_id == record_by_id)
                        && (fee_item_typ == undefined || fee_item_typ.length == 0 || item.fee_item_typ == fee_item_typ)
                        && (invoice_typ == undefined || invoice_typ.length == 0 || item.fee_invoice_typ == invoice_typ)
                        && (fee_unit == undefined || fee_unit.length == 0 || item.fee_uint == fee_unit)
                        && (fee_currency == undefined || fee_currency.length == 0 || item.fee_currency_id == fee_currency)) {
                        new_fee_list_of_ca.push(item);
                    }
                });
                $("#tab_fee_list_of_hoa_pay").datagrid('loadData', new_fee_list_of_ca);
            }
        });

        $("#tab_fee_list_of_hoa_pay").datagrid('loadData', cur_fee_list_of_hoa_pay);


        var rec_details = data.rec_fee[0];

        arr_record_by_id = [];
        arr_fee_item_typ = [];
        arr_invoice_typ = [];
        arr_fee_unit = [];
        arr_fee_currency = [];

        $.each(rec_details.rows, function (i, rrow) {
            var has = false;
            $.each(arr_record_by_id, function (r, item) {
                if (item.value == rrow.ca_record_by_id) {
                    has = true;
                }
            });
            if (!has) {
                arr_record_by_id.push({
                    label: rrow.ca_record_by_nam,
                    value: rrow.ca_record_by_id
                });
            }

            has = false;
            $.each(arr_fee_item_typ, function (r, item) {
                if (item.value == rrow.fee_item_typ) {
                    has = true;
                }
            });
            if (!has) {
                arr_fee_item_typ.push({
                    label: rrow.fee_item_typ_desc,
                    value: rrow.fee_item_typ
                });
            }

            has = false;
            $.each(arr_invoice_typ, function (r, item) {
                if (item.value == rrow.fee_invoice_typ) {
                    has = true;
                }
            });
            if (!has) {
                arr_invoice_typ.push({
                    label: rrow.fee_invoice_typ_desc,
                    value: rrow.fee_invoice_typ
                });
            }

            has = false;
            $.each(arr_fee_unit, function (r, item) {
                if (item.value == rrow.fee_uint) {
                    has = true;
                }
            });
            if (!has) {
                arr_fee_unit.push({
                    label: rrow.fee_unit_desc,
                    value: rrow.fee_uint
                });
            }

            has = false;
            $.each(arr_fee_currency, function (r, item) {
                if (item.value == rrow.fee_currency_id) {
                    has = true;
                }
            });
            if (!has) {
                arr_fee_currency.push({
                    label: rrow.fee_currency_desc,
                    value: rrow.fee_currency_id
                });
            }
        });

        bind_combobox(arr_record_by_id, $('#mulit_search_record_by_id_rec'), 'label', 'value', true);
        bind_combobox(arr_fee_item_typ, $('#mulit_search_fee_item_typ_rec'), 'label', 'value', true);
        bind_combobox(arr_invoice_typ, $('#mulit_search_fee_invoice_typ_rec'), 'label', 'value', true);
        bind_combobox(arr_fee_unit, $('#mulit_search_fee_unit_rec'), 'label', 'value', true);
        bind_combobox(arr_fee_currency, $('#mulit_search_fee_currency_id_rec'), 'label', 'value', true);

        //if (rec_details.rows.length > 0) {
        //    $('#cur_fee_all_rec_fee_amount_of_hoa').html(Number(rec_details.pay_total_amount).toFixed(2));
        //    $('#cur_fee_all_reced_fee_amount_of_hoa').html(Number(rec_details.payed_total_amount).toFixed(2));
        //    $('#cur_fee_all_unreced_fee_amount_of_hoa').html(Number(rec_details.unpayed_total_amount).toFixed(2));
        //} else {
        //    $('#cur_fee_all_rec_fee_amount_of_hoa').html(0);
        //    $('#cur_fee_all_reced_fee_amount_of_hoa').html(0);
        //    $('#cur_fee_all_unreced_fee_amount_of_hoa').html(0);
        //}
        table_bottom_group_desc(rec_details.group_fee_desc, rec_details.total, 'all_group_order_fee_rec', 1);
        cur_fee_list_of_hoa_rec = rec_details.rows;

        $('.mulit_search_fee_of_hoa_rec').combobox({
            onSelect: function () {
                var record_by_id = $('#mulit_search_record_by_id_rec').combobox('getValue');
                var fee_item_typ = $('#mulit_search_fee_item_typ_rec').combobox('getValue');
                var invoice_typ = $('#mulit_search_fee_invoice_typ_rec').combobox('getValue');
                var fee_unit = $('#mulit_search_fee_unit_rec').combobox('getValue');
                var fee_currency = $('#mulit_search_fee_currency_id_rec').combobox('getValue');

                var new_fee_list_of_ca = [];

                $.each(cur_fee_list_of_hoa_rec, function (i, item) {

                    if ((record_by_id == undefined || record_by_id.length == 0 || item.ca_record_by_id == record_by_id)
                        && (fee_item_typ == undefined || fee_item_typ.length == 0 || item.fee_item_typ == fee_item_typ)
                        && (invoice_typ == undefined || invoice_typ.length == 0 || item.fee_invoice_typ == invoice_typ)
                        && (fee_unit == undefined || fee_unit.length == 0 || item.fee_uint == fee_unit)
                        && (fee_currency == undefined || fee_currency.length == 0 || item.fee_currency_id == fee_currency)) {
                        new_fee_list_of_ca.push(item);
                    }
                });
                $("#tab_fee_list_of_hoa_rec").datagrid('loadData', new_fee_list_of_ca);
            }
        });

        $("#tab_fee_list_of_hoa_rec").datagrid('loadData', cur_fee_list_of_hoa_rec);

       

        $('#window_of_hoa_fee_details').window({
            title:'对冲计划明细--' + cur_selected_hoa.hoa_title,
            onClose: function () {
                refresh_hoa_list();
            }
        }).window('open');

        var height = $('#window_of_hoa_fee_details').height();
        var $fee_page = $('div.order_fee_details');
        var north_panel = $fee_page.layout('panel', 'north');
        var south_panel = $fee_page.layout('panel', 'south');
        var center_panel = $fee_page.layout('panel', 'center');

        height = height - north_panel.height();

        center_panel.panel('resize', {
            height: (height) / 2,
            top: north_panel.height(),
        });
        south_panel.panel('resize', {
            height: (height) / 2,
            top: (north_panel.height() + parseInt((height) / 2) - 0.5),
        });

    }, true);
}

function confirm_flag_hedge_off_accounts_finace_by_hoa_seq() {

    if (cur_selected_hoa.amc_status == undefined || 
        cur_selected_hoa.amc_status == -99) {
        $.messager.alert('错误','错误: 计划未提交审核,无法进行确认操作','error');
        return;
    }

    if (cur_selected_hoa.amc_status != 2) {
        $.messager.alert('错误', '错误: 计划审核未通过,无法进行确认操作', 'error');
        return;
    }

    //不根据fee_seq 销账，根据 hoa_seq销账 
    //需要提示用户 对冲销账规则 
    // 银行时间必须选择  
    var par = {
        rnd: Math.random(),
        action: 'flag_hedge_off_accounts_finace_by_hoa_seq',
        hoa_seq: cur_selected_hoa.hoa_seq,
        woa_bak: $.trim($('#wof_ff_woa_bak').val()),
        woa_cu_id: cur_selected_hoa.hoa_cu_id,
        woa_bank_dat: $('#wof_ff_woa_bank_dat').datebox('getValue'),
        woa_typ: $('#wof_ff_woa_typ').combobox('getValue'), 
    };
    if (par.woa_typ.length == 0) {
        $.messager.alert('错误', '错误:必须填写销账方式', 'error');
        return;
    }
    if (par.woa_bank_dat.length == 0) {
        $.messager.alert('错误', '错误:必须填写银行付款时间', 'error');
        return;
    }

    $.messager.confirm('提示', '<b>对冲计划销账规则:</b><br /> 1. 每笔金额都将完整销账，不支持部分销账。<br /> 2.对冲销账一般是差额(收/付)补全之后再进行。<br /> 3.对冲计划标记完成之后不可以撤销。<br /> 4. 对冲计划必须审核通过之后才能执行销账操作。<br /> 你是否要继续执行销账操作？',
    function (r) {
        if (r) {
            post('../Ashx/checkaccount.ashx', par, function (data) { 
                if (data.result == 1) {
                    refresh_fee_list_of_hoa(cur_selected_hoa.hoa_seq)
                    $.messager.alert('提示', data.msg, 'info');
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                }
            }, true);
        }
    }); 
}



function remove_fee_details_from_hoa_rec() {

    if (cur_selected_hoa.hoa_status != 1) {
        $.messager.alert('错误','计划已完成，无法删除费用明细','error');
        return;
    } else {
        if (cur_selected_hoa.amc_status == 0 || cur_selected_hoa.amc_status == -99) {
        } else {
            $.messager.alert('错误', '计划已正在审核中或审核已完成，无法删除费用明细', 'error');
            return;
        }
    }

    var rows = $('#tab_fee_list_of_hoa_rec').datagrid('getChecked');

    if (rows.length == 0) {
        $.messager.alert('错误', '请选择要删除的行数据', 'error');
        return;
    }

    var fee_seqs = '';

    $.each(rows, function (r, row) {
        if (fee_seqs.length == 0) {
            fee_seqs = row.fee_seq;
        } else {
            fee_seqs += ',' + row.fee_seq;
        }
    });

    $.messager.confirm('提示', '确定要移除选中的' + rows.length + '行费用明细吗？',
    function (r) {
        if (r) {
            post('../Ashx/checkaccount.ashx', {
                rnd: Math.random(),
                action: delete_hedge_off_accounts_details,
                hoa_seq: cur_selected_hoa.hoa_seq,
                fee_seqs: fee_seqs,
            }, function (data) {
                if (data.result == 1) {
                    refresh_fee_list_of_hoa(cur_selected_hoa.hoa_seq)
                    $.messager.alert('提示', msg, 'info');
                } else {
                    $.messager.alert('错误', msg, 'error');
                }
            }, true);
        }
    });

}


function remove_fee_details_from_hoa_pay() {

    if (cur_selected_hoa.hoa_status != 1) {
        $.messager.alert('错误', '计划已完成，无法删除费用明细', 'error');
        return;
    } else {
        if (cur_selected_hoa.amc_status == 0 || cur_selected_hoa.amc_status == -99) {
        } else {
            $.messager.alert('错误', '计划已正在审核中或审核已完成，无法删除费用明细', 'error');
            return;
        }
    }

    var rows = $('#tab_fee_list_of_hoa_pay').datagrid('getChecked');

    if (rows.length == 0) {
        $.messager.alert('错误', '请选择要删除的行数据', 'error');
        return;
    }

    var fee_seqs = '';

    $.each(rows, function (r, row) {
        if (fee_seqs.length == 0) {
            fee_seqs = row.fee_seq;
        } else {
            fee_seqs += ',' + row.fee_seq;
        }
    });

    $.messager.confirm('提示', '确定要移除选中的' + rows.length + '行费用明细吗？',
    function (r) {
        if (r) {
            post('../Ashx/checkaccount.ashx', {
                rnd: Math.random(),
                action: delete_hedge_off_accounts_details,
                hoa_seq: cur_selected_hoa.hoa_seq,
                fee_seqs: fee_seqs,
            }, function (data) {
                if (data.result == 1) {
                    refresh_fee_list_of_hoa(cur_selected_hoa.hoa_seq)
                    $.messager.alert('提示', msg, 'info');
                } else {
                    $.messager.alert('错误', msg, 'error');
                }
            }, true);
        }
    });

}
//提交OA 
function post_hoa_to_amc() {

    //单个数据
    //且 是需要审核
    //且 审核是退回状态或者未进行审核的 

    var selected_rows = $('#tab_hoa_list').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要进行审核的对冲计划。', 'error');
        return;
    }

    if (selected_rows.length != 1) {
        $.messager.alert('错误提示', '错误: 单次只能提交一个审核。', 'error');
        return;
    }

    var _row = selected_rows[0];

    if (_row.amc_id != undefined && _row.amc_status > 0) {
        $.messager.alert('错误提示', '错误: 此对冲计划正在审核或审核已通过，无需再次审核。', 'error');
        return;
    }

    if (_row.amc_id != undefined) {
        $('#dlg_repost_hoa_amc').dialog({
            title: '重新提交对冲计划审核',
            iconCls: 'icon-lock',
            autoOpen: false,
            modal: true,
            width: 300,
            minheight: 50,
            buttons: [
            {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_repost_hoa_amc').dialog('close');
                }
            },
            {
                text: '重新提交',
                iconCls: 'icon-ok',
                handler: function () {
                    post('../Ashx/approval_mgr.ashx', {
                        rnd: Math.random(),
                        action: 'repost_amc',
                        ap_context: $('#dlg_ap_context').val(),
                        amc_id: _row.amc_id
                    }, function (data) {
                        if (data.result == 1) {
                            $.messager.alert('提示', data.msg, 'info', function () {
                                $('#dlg_repost_hoa_amc').dialog('close');
                            });
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        }
                    }, true);
                }
            }]
        }).dialog('open');
    } else {
        post('../Ashx/approval_mgr.ashx', {
            rnd: Math.random(),
            action: 'get_start_schema_point',
            apt_id: 4,
        }, function (data) {
            var schema_point_list = data;

            $('#dlg_start_schema_point').combobox({
                panelHeight: 'auto', hasDownArrow: true, valueField: 'guid',
                textField: 'aps_show',
                data: schema_point_list
            });
            $('#dlg_post_hoa_amc').dialog({
                title: '提交对冲计划审核',
                iconCls: 'icon-lock',
                autoOpen: false,
                modal: true,
                width: 370,
                minheight: 100,
                buttons: [
                    {
                        text: '取消',
                        iconCls: 'icon-cancel',
                        handler: function () {
                            $('#dlg_post_hoa_amc').dialog('close');
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
                            $('#dlg_post_hoa_amc').dialog('close');

                            post('../Ashx/checkaccount.ashx', {
                                rnd: Math.random(),
                                action: 'post_hedge_off_accounts',
                                hoa_seq: _row.hoa_seq,
                                ap_u_id: ap_u_id,
                                aps_order_by_id: aps_order_by_id,
                                aps_id: aps_id

                            }, function (data) {
                                if (data.result == 1) {
                                    $.messager.alert('提示', data.msg, 'info');
                                    refresh_hoa_list();
                                } else {
                                    $.messager.alert('错误提示', data.msg, 'error');
                                }
                            }, true);
                        }
                    }]
            }).dialog('open');
        }, true);
    }




}

//删除
function delete_hoa_record() {
    var rows = $('#tab_hoa_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误: 请选择对冲计划后再执行此操作', 'error');
        return;
    }

    //进行判断
    /*
        1. 提交了不能更新
        2. 非自己创建的也无法更新 
    */
    var status_right = 1;
    var hoa_seq = '';

    $.each(rows, function (i, item) {
        if (item.hoa_status == 2 || (!!item.amc_status && item.amc_status > 0)) {
            status_right = 0;
        }
        if (hoa_seq.length == 0) {
            hoa_seq = item.hoa_seq;
        } else {
            hoa_seq += ',' + item.hoa_seq;
        }
    });
    if (status_right != 1) {
        $.messager.alert('错误', '错误: 所选对冲计划，包含已完成或正在审核中且未退回审核的数据，无法删除计划!', 'error');
        return;
    }

    $.messager.confirm('退回对冲计划提示', '确定要退回所选的' + rows.length + '条对冲计划？',
    function (r) {
        if (r) {
            post('../Ashx/checkaccount.ashx', {
                rnd: Math.random(),
                action: 'delete_hedge_off_accounts_record',
                hoa_seq: hoa_seq,
            }, function (data) {
                if (data.result == 1) {
                    $.messager.alert('提示', data.msg, 'info');
                    refresh_hoa_list();
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                }
            }, true);
        }
    });
}