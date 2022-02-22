﻿var pageNumber = 1;
var pageSize = 50;
var basesetting = undefined;

var cur_fee_list_query_params = undefined;
 
var cur_rec_or_pay = 1;
//费用的 表头筛选菜单 
var clumn_fliter_of_order_fee = undefined;
//右键菜单选择行 
var cur_mm_select_row = undefined;


var cur_fee_list_of_ca = undefined;
var cur_selected_ca = undefined;
var cur_fee_list = undefined;
var cur_mulit_combox_table_data = undefined;

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
    //post('../Ashx/sys_base.ashx', {
    //    rnd: Math.random(),
    //    action: 'get_basesettingCollections'
    //}, function (data) {
    //    basesetting = data;
    basesetting = parent.call_get_father_basesetting();
       
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

     
        bind_combogrid_custom($('#dlg_ed_ca_cu_id'));
        init_tab_group_fee_list();
        init_tab_fee_list();
        
        init_page_of_ca_create_or_choise();
        


   // }, true);

}
 
//初始化表格 未归账费用汇总
function init_tab_group_fee_list() { 

    $("#tab_group_fee_list").datagrid({
        data: [],
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
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
        showFooter: true,
        frozenColumns: [[
            { title: '', field: '_ck',   width: 40, checkbox: true }
             
        ]],
        columns: [[ 
            {
                field: 'fee_cu_id', title: '结算单位', width: 210, sortable: true, iconCls: 'icon-filter',
                formatter: function (value, row, index) {
                    return row.fee_cu_desc;
                }
            }
            , { field: 'fee_total_amount_desc', title: '未归账总金额', width: 165, sortable: true, }
            , {
                field: 'fee_total_amount_of_base', title: '本币换算', sortable: true, width: 90,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
            }
            , {
                field: 'fee_total_count', title: '涉及明细', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return Number(value);
                }
            } 
        ]],
        onLoadSuccess: function (data) {
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_order_fee_of_group', cur_rec_or_pay);
            
        }, 
        onDblClickRow: function (index, row) {
            cur_fee_list_query_params = {
                rnd: Math.random(),
                action: 'get_details_order_fee_of_nonca_by_cu_id',
                rec_or_pay: cur_rec_or_pay,
                cu_id: row.fee_cu_id,
            };

            load_order_fee_from_click(row.fee_cu_id);
            
        }
    }); 
}

//创建筛选数组  在装载数组的时候 执行

 
 
//初始化表格 费用表格 
function init_tab_fee_list() {
    
    $("#tab_fee_list").datagrid({
        data:[],
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
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
        showFooter: true,
        frozenColumns: [[
            { title: '', field: 'fee_seq',   width: 40, checkbox: true }
           
        ]],
        columns: [[
            {
                  field: 'fee_status_desc',   title: '状态', sortable: true, width: 46,
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
             ,{
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
                    return 'background-color:#eecfcb;color:#000';
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
                field: 'fee_rel_bill_no', title: '关联提空号', width: 170, sortable: true,
            }
            , {
                field: 'fee_rel_opr_cod', title: '关联箱属', width: 70, sortable: true,
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
            
            , {
                field: 'profit_total_amount', title: '业务盈利', width: 80, sortable: true,
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

            ]],
        onLoadSuccess: function (data) { 
            refresh_fee_list_footer();
            if (!clumn_fliter_of_order_fee) { 
                clumn_fliter_of_order_fee = $('#columns_fliters').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_fee_list'),
                    cur_cls_target_body: 'cls_order_fee_region'
                }); 
            }
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
 
//清空条件 
function clear_tab_fee_list_op() {
    clumn_fliter_of_order_fee.columns_fliters('clear');
    
}

//显示 未归账费用汇总
function show_win_of_group_order_fee() {
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_group_order_fee_of_nonca_by_cu_id',
        rec_or_pay: cur_rec_or_pay, 
    }, function (data) {
        $("#tab_group_fee_list").datagrid('loadData', data);
        $('#win_of_group_order_fee').window('open');
    },true); 
}
function close_win_of_group_order_fee() {
    $('#win_of_group_order_fee').window('close');
}
function view_from_win_of_group_order_fee() {
    var rows = $("#tab_group_fee_list").datagrid('getChecked');

    if (rows.length == 0) {
        $.messager.alert('错误', '错误：请勾选要查看的数据', 'error');
        return;
    }
    var cu_id = '';
    for (var i in rows) {
        if (cu_id.length == 0) {
            cu_id = rows[i].fee_cu_id;
        } else {
            cu_id += ',' + rows[i].fee_cu_id;
        }
    }
    cur_fee_list_query_params = {
        rnd: Math.random(),
        action: 'get_details_order_fee_of_nonca_by_cu_id',
        rec_or_pay: cur_rec_or_pay,
        cu_id: cu_id,
    };
    load_order_fee_from_click();
}
//双击 未归账费用汇总 表数据后，显示涉及费用明细 
function load_order_fee_from_click(cu_id) {
    post('../Ashx/checkaccount.ashx',
        cur_fee_list_query_params,
        function (data) {
        $('#win_of_group_order_fee').window('close');
        clumn_fliter_of_order_fee.columns_fliters('reset_target_data_and_clumns_fliter',data.rows);
        table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_order_fee', cur_rec_or_pay);
    }, true);
}

function load_order_fee() {
    post('../Ashx/checkaccount.ashx',
    cur_fee_list_query_params,
    function (data) {
        $('#win_of_group_order_fee').window('close');
        clumn_fliter_of_order_fee.columns_fliters('reset_target_data_only',data.rows);
        table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_order_fee', cur_rec_or_pay);
    }, true);
}
//下载
function download_order_fee() {
    var down_params = $.extend(true, {}, cur_fee_list_query_params);
    down_params.action = 'download_details_order_fee_of_nonca_by_cu_id';
    window.open('../Ashx/checkaccount.ashx?' + parseParams(down_params));
}

//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_fee_list_footer() {
    table_bootom_selected_desc_have_symbol($('#tab_fee_list'), 'selected_group_order_fee', cur_rec_or_pay);
   
}
 
 
 



//查看账单
function win_view_of_ca_info() {
    var ca_seq = $('#win_dv_view_of_approval_details_from_list').data('ca_seq');
    var ca_title = $('#win_dv_view_of_approval_details_from_list').data('ca_title');
    if (ca_seq == undefined || ca_seq.length == 0) {
        $.messager.alert('错误', '错误：该费用未提交账单', 'error');
        return;
    }
    parent.call_win_view_of_ca_info(ca_seq, ca_title);
}

//查看审核流程
function win_view_of_approval_details_from_list() { 
    var amc_id = $('#win_dv_view_of_approval_details_from_list').data('od_amc_id');

    if (amc_id == undefined || amc_id.length == 0) {
        $.messager.alert('错误', '错误: 未提交业务审核', 'error');
        return;
    }
    parent.call_win_view_of_approval_details_from_list(amc_id); 
    
}

//查看客户银行账户信息
function win_view_of_bank_info_from_list() {
    var cu_id = $('#win_dv_view_of_approval_details_from_list').data('cu_id');


    parent.call_win_view_of_bank_info_from_list(cu_id);
}
          
//查看业务简报 
function win_view_of_short_order_info() {
    var od_seq = $('#win_dv_view_of_approval_details_from_list').data('od_seq');
    var od_no = $('#win_dv_view_of_approval_details_from_list').data('od_no');

    parent.call_win_view_of_short_order_info(od_seq, od_no);
}
//切换到专注模式  
function change_to_normal_model() {
    parent.call_change_to_normal_model();
}