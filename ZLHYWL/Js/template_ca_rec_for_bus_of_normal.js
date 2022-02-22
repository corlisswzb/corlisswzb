var pageNumber = 1;
var pageSize = 50;
var basesetting = undefined; 
var cur_ca_list_query_params = undefined;
var cur_rec_or_pay = 1; 
var cur_selected_ca = undefined; 
var from_typ = undefined;
$(document).ready(function () {
    $($('body')[0]).unbind('keydown').bind('keydown', custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);
    from_typ = parent.call_get_from_typ();
    if ($('.remove_part_' + from_typ).length > 0) {
        $('.remove_part_' + from_typ).remove();
    }
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
    $('#dlg_new_ca_main2').dialog({
        title: '编辑账单',
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
                    $('#dlg_new_ca_main2').dialog('close');
                }
            }]
    }).dialog('close');
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
    bind_combobox(select_years, $('#dlg_ed_ca_year'), 'text', 'value', false);
    $('#dlg_ed_ca_year').combobox('setValue', now_year);
    //月份
    var select_month = [];
    for (var nM = 1 ; nM <= 12; nM++) {
        select_month.push({ value: nM, text: nM + '月' });
    }
    bind_combobox(select_month, $('#search_ca_month'), 'text', 'value', false);
    bind_combobox(select_month, $('#dlg_ed_ca_month'), 'text', 'value', false);
    $('#dlg_ed_ca_month').combobox('setValue', date.getMonth());
    bind_combogrid_custom($('#dlg_ed_ca_cu_id2'));
    bind_combogrid_custom($('#dlg_ed_ca_cu_id'));

    bind_combogrid_custom($('#search_ca_cu_id')); 
    bind_combogrid_invoice($('.cls_invoice_no'));
     
    init_page_of_ca_create_or_choise();

    init_tab_ca_list();

    //}, true);
}


//初始化 账单
 
function init_tab_ca_list() {
    cur_ca_list_query_params = {
        rnd: Math.random(),
        action: 'get_checkaccount_of_bus',
        rec_or_pay: 0,
        ca_cu_id: $('#search_ca_cu_id').data('cu_id'),
        ca_status: $('#search_ca_status').combobox('getValue'),
        ca_year: $('#search_ca_year').combobox('getValue'),
        ca_month: $('#search_ca_month').combobox('getValue'),
        like_str: $.trim($('#search_like_str').val()),
        ca_create_by_id: $('#search_ca_create_by_id').combobox('getValue'),
        ca_invoice_no: $('#search_ca_invoice_no').combogrid('getText'),
        ca_fee_total: $('#search_ca_fee_total').val(),
        ca_invoice_typ_status: $('#search_ca_invoice_typ_status').combobox('getValue'),
        ca_approval_status: $('#search_ca_approval_status').combobox('getValue'),
        ca_woa_status: $('#search_ca_woa_status').combobox('getValue'),
    };
    $('#tab_ca_list').datagrid({
        url: '',
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [50, 100, 200, 500],
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_ca_list_bar',
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
                , { title: '账单基本信息', colspan: 6, align: 'center' }
                , { title: '其他信息', colspan: 6, align: 'center' }
        ]
            , [//显示的列
            {
                field: 'ca_status_desc', title: '状态', width: 50, sortable: true,
                styler: function (value, row, index) {
                    switch (row.ca_status) {
                        case 1: return 'background-color:#fff;color:#000;';
                        case 2: return 'background-color:#7af7f6;color:#000;';
                        case 3: return 'background-color:#ef1956;color:#fff;';
                    }
                }
            }

            , {
                field: 'ca_invoice_lock_desc', title: '发票', width: 60, sortable: true,

            }
            , { field: 'ca_relation_oi_no', title: '关联发票号', sortable: true, width: 90, }
            , {
                field: 'ca_commit_over_dat', title: '账期', width: 60, sortable: true 
            }
            , { field: 'ca_cu_desc', title: '结算单位', width: 240, sortable: true, }
            , { field: 'ca_title', title: '账单名称', sortable: true, width: 230 }
            , {
                field: 'total_amount_desc', title: '费用明细', width: 165, sortable: true 
            }
            , { field: 'ca_relation_invoice_typ_desc', title: '票率组成', sortable: true, width: 150 }
            , {
                field: 'woa_total_amount_desc', title: '已销', width: 80, sortable: true 
            }
            , {
                field: 'unwoa_total_amount_desc', title: '未销', width: 80, sortable: true 
            }
            
            , { field: 'ca_relation_user_desc', title: '账单申请', sortable: true, width: 60 }
            , {
                field: 'ca_create_dat', title: '创建时间', sortable: true, width: 78 
            } 
            , {
                field: 'files_count_desc', title: '对账附件', width: 60, align: 'center', formatter: function (value, row, index) {
                    if (Number(row.files_count) == 0) {
                        return '无附件';
                    } else {
                        return '<a href="javascript:void(0);" data-ca_seq="' + row.ca_seq + '" class="btn_show_ca_attachment">附件' + Number(row.files_count) + '</a>';
                    }
                }
            }
            , { field: 'ca_bak', title: '备注', sortable: true, width: 400 }
            , { field: 'ca_invoice_lock_by_nam', title: '收票标记', sortable: true, width: 60 }
            , {
                field: 'ca_invoice_lock_dat', title: '收票时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }

            ]],
        onLoadSuccess: function (data) {  
            $('.btn_show_ca_attachment').bind('click', function () {
                //
                var ca_seq = $(this).data('ca_seq');
                //
                show_checkaccount_files(ca_seq);
            });
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_ca_fee', cur_rec_or_pay);

            refresh_ca_list_footer();


        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_ca_list'), rowIndex);

            refresh_ca_list_footer();
        },
        onCheck: function (index, row) {
            refresh_ca_list_footer();
        },
        onUncheck: function (index, row) {
            refresh_ca_list_footer();
        },
        onCheckAll: function (index, row) {
            refresh_ca_list_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_ca_list_footer();
        },
        onDblClickRow: function (index, row) {

            //刷新 账单关联费用 
            winopen_order_fee_by_ca(row.ca_seq, row.ca_title);
            cur_selected_ca = row;
            
        },
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            cur_selected_ca = row;
            $('#win_dv_view_of_approval_details_from_ca_list').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });



}
 
//woa_or_iv界面通知刷新 
function refresh_from_woa_or_iv_update() {
    refresh_ca_list(); 
}


//这是给各个地方调用，用来刷新当前页账单信息  查询 账单
function refresh_ca_list() { 
    if (cur_ca_list_query_params != undefined) {
        $("#tab_ca_list").datagrid('reload', cur_ca_list_query_params);
    } 
}
//这是点击按钮查询
function refresh_ca_list_by_normal_params() {
    cur_ca_list_query_params = {
        rnd: Math.random(),
        action: 'get_checkaccount_of_bus',
        rec_or_pay: cur_rec_or_pay,
        ca_cu_id: $('#search_ca_cu_id').data('cu_id'),
        ca_status: $('#search_ca_status').combobox('getValue'),
        ca_year: $('#search_ca_year').combobox('getValue'),
        ca_month: $('#search_ca_month').combobox('getValue'),
        like_str: $.trim($('#search_like_str').val()),
        ca_create_by_id: $('#search_ca_create_by_id').combobox('getValue'),
        ca_invoice_no: $('#search_ca_invoice_no').combogrid('getText'),
        ca_fee_total: $('#search_ca_fee_total').val(),
        ca_invoice_typ_status: $('#search_ca_invoice_typ_status').combobox('getValue'),
        ca_approval_status: $('#search_ca_approval_status').combobox('getValue'),
        ca_woa_status: $('#search_ca_woa_status').combobox('getValue'),
    };
    $("#tab_ca_list").datagrid('options').url = '../Ashx/checkaccount.ashx';
    $("#tab_ca_list").datagrid('load', cur_ca_list_query_params);
}

 
//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_ca_list_footer() {
    table_bootom_selected_desc($('#tab_ca_list'), 'selected_group_ca_fee', cur_rec_or_pay);
    
}

function close_win_of_woa_or_iv_update() {
    $('#win_woa_or_iv_order_fee').window('close');
}



//刷新  通过账单seq 打开销账，标记发票窗口 
function winopen_order_fee_by_ca(ca_seq, ca_title) {
    
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



 

//查看账单明细
function query_ca_of_fee_details() {
    var rows = $('#tab_ca_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误: 请选择账单后再执行此操作', 'error');
        return;
    }
    var is_same_cu_id = true;
    var cu_id = rows[0].ca_cu_id;
    var ca_seqs = '';
    var ca_titles = '';
    $.each(rows, function (i, item) {

        if (ca_seqs.length == 0) {
            ca_seqs = item.ca_seq;
            ca_titles = item.ca_title;
        } else {
            ca_seqs += ',' + item.ca_seq;
            ca_titles += ',' + item.ca_title;
        }
        if (cu_id != item.ca_cu_id) {
            is_same_cu_id = false;
            return;
        }
    });
    //if (!is_same_cu_id) {
    //    $.messager.alert('错误', '错误: 合并查看只能查看同一家公司的账单!', 'error');
    //    return;
    //}

    winopen_order_fee_by_ca(ca_seqs, ca_titles);
}

 

//打开历史销账记录 
function view_write_off_accounts_list() {

    var content = '<iframe scrolling="auto" frameborder="0"  src="template_woa_record.aspx?rnd=' +
                    Math.random() + '&rec_or_pay=' +
                    cur_rec_or_pay +
                    '" style="width:100%;height:100%;"></iframe>';
    $('#window_of_write_off_accounts').window({
        title: parent.call_get_path() + '销账记录',
        content: content,
        onClose: function () {
            refresh_ca_list();
        }
    }).window('open');

}
//打开历史开票记录 
function view_flag_invoice_list() {
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_invoice_record.aspx?rnd=' +
                        Math.random() + '&rec_or_pay=' +
                        cur_rec_or_pay +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#window_of_flag_invoice_list').window({
        title: parent.call_get_path() + '发票记录',
        content: content,
        onClose: function () {
            refresh_ca_list();
        }
    }).window('open');
}
 

//下载对账单
function menu_download_rec_fee() {
    var rows = $('#tab_ca_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误:请选择账单后再执行此操作', 'error');
        return;
    }
    var is_same_cu_id = true;
    var cu_id = rows[0].ca_cu_id;
    var ca_seqs = '';
    var ca_titles = '';

    $.each(rows, function (i, item) {

        if (ca_seqs.length == 0) {
            ca_seqs = item.ca_seq;
            ca_titles = item.ca_title;
        } else {
            ca_seqs += ',' + item.ca_seq;
            ca_titles += ',' + item.ca_title;
        }

        if (cu_id != item.ca_cu_id) {
            is_same_cu_id = false;
            return;
        }
    });
    if (!is_same_cu_id) {
        $.messager.alert('错误', '错误: 只能下载同一家公司的账单!', 'error');
        return;
    }
    //if (rows.length > 1) {
    //    $.messager.alert('错误', '错误:只能选择一个账单进行交账操作', 'error');
    //    return;
    //}
    //进行判断
    /*
        1. 提交了不能更新
        2. 非自己创建的也无法更新 
    */

    var myparams = {
        action: 'get_order_fee_by_ca_seq_for_download',
        ca_seq: ca_seqs
    }
    window.open('../Ashx/checkaccount.ashx?' + parseParams(myparams));

}

//切换到专注模式  
function change_to_ca_focus_model() {
    parent.call_change_to_focus_model_of_ca();
}
 
//查看审核流程
function win_view_of_approval_details_from_ca_list() {
    var amc_id = cur_selected_ca.amc_id;

    if (amc_id == undefined || amc_id.length == 0) {
        $.messager.alert('错误', '错误: 未提交账单审核', 'error');
        return;
    }

    parent.call_win_view_of_approval_details_from_list(amc_id);
}

//查看客户银行账户信息
function win_view_of_bank_info_from_ca_list() {
    parent.call_win_view_of_bank_info_from_list(cur_selected_ca.ca_cu_id);
}

//子页面获取 basesetting
function call_get_father_basesetting() {
    return basesetting;
}
function call_get_from_typ() {
    return from_typ;
}

function call_win_view_of_approval_details_from_list(amc_id) {

    parent.call_win_view_of_approval_details_from_list(amc_id);
}
//查询 结算对象  银行信息 
function call_win_view_of_bank_info_from_list(cu_id) {
    parent.call_win_view_of_bank_info_from_list(cu_id);
}

//查询业务简报
function call_win_view_of_short_order_info(od_seq, od_no) {
    parent.call_win_view_of_short_order_info(od_seq, od_no);
}
function call_win_view_of_print(action, seq) {
    parent.call_win_view_of_print(action, seq);
}