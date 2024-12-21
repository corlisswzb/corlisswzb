var pageNumber = 1;
var pageSize = 50;
var basesetting = undefined;

 
var cur_rec_or_pay = -1;
 

$(document).ready(function () {
     
    $($('body')[0]).unbind('keydown').bind('keydown', custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);
   
    $('#dlg_of_transfer_ca').dialog({
        title: '请过账单位',
        iconCls: 'icon-transmit',
        autoOpen: false,
        modal: true,
        width: 80,
        height: 420,
        
    }).dialog('close');
 
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

/*供给给iframe调用 */
//查询 费用所属 业务的审核流程 
function call_win_view_of_approval_details_from_list(amc_id) {
   
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
//查询 结算对象  银行信息 
function call_win_view_of_bank_info_from_list(cu_id) {
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
//查询所属账单 
function call_win_view_of_ca_info(ca_seq,ca_title) {
    refresh_fee_list_of_ca(ca_seq, ca_title);
}
//查询业务简报
function call_win_view_of_short_order_info(od_seq, od_no) {
    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                        Math.random() + '&od_seq=' +
                        od_seq +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#window_of_order_info').window({
        title: '订单: ' + od_no,
        content: content
    }).window('open');
}

//切换到 专注模式 
function call_change_to_focus_model() {
    $.cookie('opr_pay_page_model', 'focus');
    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_fee_pay_fo_operation_focus.aspx?rnd=' +
                        Math.random() +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#pay_order_fee_list').panel({
        content: content
    });
}
//切换到 闭环模式 
function call_change_to_normal_model() {
    $.cookie('opr_pay_page_model', 'normal');
    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_fee_pay_fo_operation.aspx?rnd=' +
                        Math.random() +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#pay_order_fee_list').panel({
        content: content
    });
}

//获取基础数据
function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        basesetting = data; 
        
        //查询 账单界面 
        bind_combobox(basesetting.employe_list, $('#search_ca_create_by_id'), 'u_real_name', 'u_id', false);
        var now_time = data.sys_time;
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
  
      
        bind_combogrid_custom($('#search_ca_cu_id'));
        bind_combogrid_custom($('#dlg_ed_ca_cu_id'));
        bind_combogrid_custom($('#dlg_ed_ca_cu_id2'));
        bind_combogrid_invoice($('#search_ca_invoice_no'));
       
        bind_combobox(basesetting.invoice_list, $('#mulit_fee_invoice_typ'), 'in_name', 'in_id', false);
        bind_combobox(basesetting.fee_item_list, $('#mulit_fee_item_typ'), 'fee_cn', 'fee_id', false);
        bind_combobox(basesetting.unit_list, $('#mulit_fee_unit'), 'u_desc', 'u_id', false);
        bind_combobox(basesetting.currency_list, $('#mulit_fee_currency_id'), 'cr_name', 'cr_id', false);

        init_tab_ca_list();

        init_tab_fee_list_of_ca();

        init_page_of_ca_create_or_choise();
        init_tab_fee_list_of_change();

        $('#tabs_ca').tabs({
            onSelect: function (title, index) {
                if (index == 0) {
                   
                }
                if (index == 1) {
                    refresh_ca_list();
                }
            }
        }); 
        if ($.cookie('opr_pay_page_model') == 'focus') {
            call_change_to_focus_model();
        } else {
            call_change_to_normal_model();
        }
    }, true);

}

//子页面获取 basesetting
function call_get_father_basesetting() {
    return basesetting;
}
 

//打开账单 选择界面
function insert_main_list() {
    var isRight = true;

    //需要先进行本地判断
    /*
    条件: 1.必须要有选择的数据
          2.结算单位必须是一个
          3.费用状态必须是 1 
          4.正在改单的不能 操作
          5.如果是应收，这里还要判断 订单状态是否是 3 已审核通过
          6.无票和有票 不能一起提交 
          PS: getChecked 是勾选行，getSelections是选中行

          选中行不一定是勾选行 
    */
    var selected_rows = $('#tab_fee_list').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误','请选择费用条目后再执行此操作','error');
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
        $.messager.alert('错误', '选择费用必须是同一家结算单位，否则不符合归账条件', 'error');
        return;
    }
    $.each(selected_rows, function (i, item) {
        if (item.fee_status != 1) {
            isRight = false;
            return;
        }
    });
    if (!isRight) {
        $.messager.alert('错误', '提交的费用中，存在已归账费用，不符合归账条件', 'error');
        return;
    }
    $.each(selected_rows, function (i, item) {
        if (item.fee_change_lock_flag == 1) {
            isRight = false;
            return;
        }
    });
    if (!isRight) {
        $.messager.alert('错误', '提交的费用中，存在正在执行改单审核的项目，不符合归账条件', 'error');
        return;
    }
    
    $.each(selected_rows, function (i, item) {
        if (item.rec_or_pay == 1 && item.od_status_id != 3) {
            isRight = false;
            return;
        }
    });
    if (!isRight) {
        $.messager.alert('错误', '应收账单归账,费用必须满足费用所属账单已审核通过，不符合归账条件', 'error');
        return;
    }
    var select_year_month = [];
    var fee_seqs = '';

    $.each(selected_rows, function (i, item) {
        if (item.fee_invoice_typ_flag != temp_invoice_typ_flag) {
            isRight = false;
            return;
        }
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

    if (!isRight) {
        $.messager.alert('错误', '提交的费用中，存在不开票和开票两种情况，不符合归账条件', 'error');
        return;
    } 
    $('#dlg_ca_cu_id').val(temp_fee_cu_id);

    $('#dlg_ca_total_rowcount').html(selected_rows.length);
    $('#dlg_ca_total_money').html(temp_total_money.toFixed(2));
    $('#dlg_ca_cu_desc').html(temp_fee_cu_desc);

    var now_time = basesetting.sys_time;
    var date = eval('new Date(' + now_time.replace(/\d+(?=-[^-]+$)/, function (a) {
        //console(a);
        return parseInt(a, 10);
    }).match(/\d+/g) + ')');
    //往后加1年，往前 10年  
    $('#dlg_search_ca_year').combobox('setValue', max_year_month_count.year);
    $('#dlg_search_ca_month').combobox('setValue', max_year_month_count.month);

    //再打开对话框
    refresh_dlg_tab_choise_ca_main_list(false);

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
            }
            ,{
                text: '确定',
                iconCls: 'icon-ok', 
                handler: function () {

                    var ca_rows = $('#dlg_tab_choise_ca_main_list').datagrid('getChecked');

                    if (ca_rows.length == 0) {
                        $.messager.alert('错误','错误: 请选择账单','error');
                        return;
                    } 
                    post('../Ashx/checkaccount.ashx', {
                        rnd: Math.random(),
                        action: 'insert_fee_details',
                        fee_seqs: fee_seqs,
                        ca_seq: ca_rows[0].ca_seq
                    }, function (data) {

                        if (data.result == 1) {
                            $.messager.alert('提示', data.msg, 'info');
                            $('#dlg_choise_ca_main').dialog('close');
                            $("#tab_fee_list").datagrid('load', cur_fee_list_query_params);
                        } else {
                            $.messager.alert('错误', msg, 'error');
                            return;
                        }
                        
                    },true); 
                }
            } 
            ]
    }).dialog('open');
}

 
 
//初始化 账单
function init_tab_ca_list() {
    cur_ca_list_query_params = {
        rnd: Math.random(),
        action: 'get_checkaccount',
        rec_or_pay: cur_rec_or_pay, 
        ca_cu_id: $('#search_ca_cu_id').data('cu_id'), 
        ca_status: $('#search_ca_status').combobox('getValue'),
        
        ca_year: $('#search_ca_year').combobox('getValue'),
        ca_month: $('#search_ca_month').combobox('getValue'),
        ca_create_by_id: $('#search_ca_create_by_id').combobox('getValue'),
        like_str: $.trim($('#search_like_str').val()),
        ca_invoice_no: $('#search_ca_invoice_no').combogrid('getText'),
        ca_fee_total: $('#search_ca_fee_total').val(),
        ca_invoice_typ_status: $('#search_ca_invoice_typ_status').combobox('getValue'),
        ca_approval_status: $('#search_ca_approval_status').combobox('getValue'),
        ca_woa_status: $('#search_ca_woa_status').combobox('getValue'),
    };
    $('#tab_ca_list').datagrid({
        url: '../Ashx/checkaccount.ashx',
        queryParams: cur_ca_list_query_params,
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
        toolbar: '#tab_ca_list_bar',
        fit: true,
        checkbox: true,
        showFooter: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true, 
        frozenColumns: [[
            { title: '', field: '_ck',  width: 40, checkbox: true }
        ]],
        columns: [[
                { title: '综合状态属性', colspan: 10, align: 'center' }
                , { title: '账单基本信息', colspan: 6, align: 'center' }
                , { title: '其他信息', colspan: 9, align: 'center' }
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
                field: 'ca_group_flag', title: '邀约', width: 40, sortable: true,
                formatter: function (value, row, index) {
                    if (Number(value) == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '';
                    }
                }
            }
            , {
                field: 'ca_invoice_typ', title: '需票', width: 40, sortable: true,
                formatter: function (value, row, index) {
                    if (Number(value) == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '';
                    }
                }
            }
            , {
                field: 'ca_approval_flag', title: '需审', width: 40, sortable: true,
                formatter: function (value, row, index) {
                    if (Number(value) == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '';
                    }
                }
            }
            , {
                field: 'amc_status', title: '审核', width: 40, sortable: true,
                formatter: function (value, row, index) {
                    if (Number(row.ca_approval_flag) == 1) {
                        if (Number(value) == -99) {
                            return '未交审';
                        }
                        if (Number(value) == 0) {
                            return '退回';
                        }
                        if (Number(value) == 1) {
                            return row.amc_cur_opr_nam;
                            //return '审核中';
                        }
                        if (Number(value) == 2) {
                            return '通过';
                        }
                    } else {
                        return '通过';
                    }
                }
            }
            , {
                field: 'amc_finish_dat', title: '通审时间', width: 78, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , { field: 'amc_relation_no', title: '审批号', sortable: true, width: 70, }
            , {
                field: 'ca_invoice_lock_id', title: '发票', width: 40, sortable: true,
                formatter: function (value, row, index) {
                    if (Number(row.ca_invoice_typ) == 1) {
                        
                        if (Number(value) > 0) {
                            return '已收';
                        } else {
                            return '待收';
                        }
                    } else {
                        return '无需';
                    }
                }
            }
            , { field: 'ca_relation_oi_no', title: '关联发票号', sortable: true, width: 70, }
            ,{
                field: 'ca_year', title: '账期', width: 60, sortable: true,
                formatter: function (value, row, index) {
                    return row.ca_year + '-' + row.ca_month;
                }
            } 
            , { field: 'ca_cu_desc', title: '结算单位', sortable: true, width: 240, }
            , { field: 'ca_title', title: '账单名称', sortable: true, width: 230 }
            , {
                field: 'total_amount_of_base', title: '费用明细', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    return row.total_amount_desc;
                }
            } 
            , { field: 'ca_relation_invoice_typ_desc', title: '票率组成', sortable: true, width: 150 }
            , {
                field: 'woa_total_amount_of_base', title: '已销', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    return row.woa_total_amount_desc;
                }
            }
            , {
                field: 'unwoa_total_amount_of_base', title: '未销', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    return row.unwoa_total_amount_desc;
                }
            }
            , {
                field: 'ca_limit_dat', title: '邀约截止', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    if (value == undefined) return '无';
                    else return dateformat(value, true);
                }
            }
            , { field: 'ca_create_by_nam', title: '账单申请', sortable: true, width: 60 }
            , {
                field: 'ca_create_dat', title: '创建时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'ca_assign_flag', title: '指定', width: 40,
                formatter: function (value, row, index) {
                    if (Number(value) == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '';
                    }
                }
            }
            , { field: 'ca_relation_user_desc', title: '指定邀约对象', width: 180, }
            , {
                field: 'files_count', title: '对账附件', width: 60, align:'center', formatter: function (value, row, index) {
                    if (Number(value) == 0) {
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
                var ca_seq = $(this).data('ca_seq'); 
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
            refresh_fee_list_of_ca(row.ca_seq,row.ca_title);
            cur_selected_ca = row; 
        },
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            $('#win_dv_view_of_approval_details_from_ca_list').data('ca_bak', row.ca_bak);
            $('#win_dv_view_of_approval_details_from_ca_list').data('amc_id', row.amc_id);
            $('#win_dv_view_of_approval_details_from_ca_list').data('cu_id', row.fee_cu_id);
            $('#win_dv_view_of_approval_details_from_ca_list').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}
//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_ca_list_footer() {
    table_bootom_selected_desc($('#tab_ca_list'),'selected_group_ca_fee',-1); 
}


//查询 账单
function refresh_ca_list() {
    cur_ca_list_query_params = {
        rnd: Math.random(),
        action: 'get_checkaccount',
        rec_or_pay: cur_rec_or_pay,
        ca_cu_id: $('#search_ca_cu_id').data('cu_id'),

       
        ca_status: $('#search_ca_status').combobox('getValue'), 
        ca_year: $('#search_ca_year').combobox('getValue'),
        ca_month: $('#search_ca_month').combobox('getValue'),
        ca_create_by_id: $('#search_ca_create_by_id').combobox('getValue'),
        like_str: $.trim($('#search_like_str').val()),
        ca_invoice_no: $('#search_ca_invoice_no').combogrid('getText'),
        ca_fee_total: $('#search_ca_fee_total').val(),
        ca_invoice_typ_status: $('#search_ca_invoice_typ_status').combobox('getValue'),
        ca_approval_status: $('#search_ca_approval_status').combobox('getValue'),
        ca_woa_status: $('#search_ca_woa_status').combobox('getValue'),
    };

    $("#tab_ca_list").datagrid('reload', cur_ca_list_query_params);
     
}
function requery_ca_list() {
    cur_ca_list_query_params = {
        rnd: Math.random(),
        action: 'get_checkaccount',
        rec_or_pay: cur_rec_or_pay,
        ca_cu_id: $('#search_ca_cu_id').data('cu_id'),
         
        ca_status: $('#search_ca_status').combobox('getValue'), 
        ca_year: $('#search_ca_year').combobox('getValue'),
        ca_month: $('#search_ca_month').combobox('getValue'),
        ca_create_by_id: $('#search_ca_create_by_id').combobox('getValue'),
        like_str: $.trim($('#search_like_str').val()),
        ca_invoice_no: $('#search_ca_invoice_no').combogrid('getText'),
        ca_fee_total: $('#search_ca_fee_total').val(),
        ca_invoice_typ_status: $('#search_ca_invoice_typ_status').combobox('getValue'),
        ca_approval_status: $('#search_ca_approval_status').combobox('getValue'),
        ca_woa_status: $('#search_ca_woa_status').combobox('getValue'),
    };

    $("#tab_ca_list").datagrid('load', cur_ca_list_query_params);

}




//初始化 账单关联的 费用
function init_tab_fee_list_of_ca() {
    
    $("#tab_fee_list_of_ca").datagrid({
        data:{total:0,rows:[]},
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_fee_list_of_ca_bar',
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列 
        frozenColumns: [[
            { title: '', field: 'fee_seq',  width: 40, checkbox: true }
            , {
                field: 'fee_status_desc',  title: '状态', sortable: true, width: 46,
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
                  { title: '费用详情', align: 'center', colspan: 14 }
                , { title: '关联委托(费用全部成折算本币计算)', align: 'center', colspan: 11 }
                , { title: '维护明细', align: 'center', colspan: 10 }
        ],
            [
             {
                 field: 'fee_cu_id', title: '结算单位', width: 210, sortable: true,
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
                field: 'fee_item_typ', title: '费项', sortable: true, width: 70,
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
                field: 'fee_unit', title: '单位', sortable: true, width:60,
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
                field: 'fee_bak', title: '费用备注', width: 260, sortable: true,
            }
            , {
                field: 'od_invoice_no', title: '发票号', width: 260, sortable: true,
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
            ]],
        onLoadSuccess: function (data) {
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_order_fee_of_ca', cur_rec_or_pay); 
            refresh_fee_list_of_ca_footer();
        }, 
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_fee_list_of_ca'), rowIndex);
             
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
            call_win_view_of_short_order_info(row.od_seq,row.od_no);
           
        }
    });
}

//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_fee_list_of_ca_footer() {
    table_bootom_selected_desc_have_symbol($('#tab_fee_list_of_ca'), 'selected_group_order_fee_of_ca', -1);
    
}


//刷新 关联账单 
function refresh_fee_list_of_ca(ca_seq,ca_title) {
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_order_fee_by_ca_seq',
        rec_or_pay: cur_rec_or_pay,
        ca_seq: ca_seq
    }, function (data) {
        //需要进行 关联
        //绑定筛选项目 : 
        //记录人: mulit_search_record_by_id

        var arr_record_by_id = [];
        var arr_fee_item_typ = [];
        var arr_invoice_typ = [];
        var arr_fee_unit = [];
        var arr_fee_currency = [];

        $.each(data.rows, function (i, rrow) {
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

        bind_combobox(arr_record_by_id, $('#mulit_search_record_by_id'), 'label', 'value', true);
        bind_combobox(arr_fee_item_typ, $('#mulit_search_fee_item_typ'), 'label', 'value', true);
        bind_combobox(arr_invoice_typ, $('#mulit_search_fee_invoice_typ'), 'label', 'value', true);
        bind_combobox(arr_fee_unit, $('#mulit_search_fee_unit'), 'label', 'value', true);
        bind_combobox(arr_fee_currency, $('#mulit_search_fee_currency_id'), 'label', 'value', true);

        if (data.rows.length > 0) {
            $('#cur_fee_all_pay_fee_amount_of_ca').html(Number(data.pay_total_amount).toFixed(2));
            $('#cur_fee_all_payed_fee_amount_of_ca').html(Number(data.payed_total_amount).toFixed(2));
            $('#cur_fee_all_unpayed_fee_amount_of_ca').html(Number(data.unpayed_total_amount).toFixed(2));
        } else {
            $('#cur_fee_all_pay_fee_amount_of_ca').html(0);
            $('#cur_fee_all_payed_fee_amount_of_ca').html(0);
            $('#cur_fee_all_unpayed_fee_amount_of_ca').html(0);
        }

        cur_fee_list_of_ca = data.rows;

        $('.mulit_search_fee_of_ca').combobox({
            onSelect: function () {
                var record_by_id = $('#mulit_search_record_by_id').combobox('getValue');
                var fee_item_typ = $('#mulit_search_fee_item_typ').combobox('getValue');
                var invoice_typ = $('#mulit_search_fee_invoice_typ').combobox('getValue');
                var fee_unit = $('#mulit_search_fee_unit').combobox('getValue');
                var fee_currency = $('#mulit_search_fee_currency_id').combobox('getValue');

                var new_fee_list_of_ca = [];

                $.each(cur_fee_list_of_ca, function (i, item) {
                     
                    if ((record_by_id == undefined || record_by_id.length == 0 || item.ca_record_by_id == record_by_id)
                        && (fee_item_typ == undefined || fee_item_typ.length == 0 || item.fee_item_typ == fee_item_typ)
                        && (invoice_typ == undefined || invoice_typ.length == 0 || item.fee_invoice_typ == invoice_typ)
                        && (fee_unit == undefined || fee_unit.length == 0 || item.fee_uint == fee_unit)
                        && (fee_currency == undefined || fee_currency.length == 0 || item.fee_currency_id == fee_currency)) {
                        new_fee_list_of_ca.push(item);
                    }
                });
                $("#tab_fee_list_of_ca").datagrid('loadData', new_fee_list_of_ca); 
            }
        });

        $("#tab_fee_list_of_ca").datagrid('loadData', data);

        $('#win_woa_or_iv_order_fee').window({
            title: ca_title,
            onClose: function () {
                refresh_ca_list();
            }
        }).window('open');
    },true);
}



//从账单中移除费用
function remove_fee_details_from_ca() {
    
    if (cur_selected_ca.ca_status != 1) {
        $.messager.alert('错误', '错误: 账单已提交审核，无法进行移除操作', 'error');
        return;
    }

    var remove_rows = $('#tab_fee_list_of_ca').datagrid('getChecked');

    if (remove_rows.length == 0) {
        $.messager.alert('错误','错误: 请选择要删除的行','error');
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
                action: 'delete_fee_details',
                fee_seqs: fee_seqs,
                ca_seq: cur_selected_ca.ca_seq
            }, function (data) {
                if (data.result == 1) { 
                    $.messager.alert('提示', data.msg, 'info', function () {
                        refresh_fee_list_of_ca(cur_selected_ca.ca_seq,cur_selected_ca.ca_title);
                    });
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                }
            },true);
        }
    });
    
}

//交账 
function post_ca_main() {
    var rows = $('#tab_ca_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误:请选择账单后再执行此操作', 'error');
        return;
    }
    if (rows.length > 1) {
        $.messager.alert('错误', '错误:单次只能投递一个账单', 'error');
        return;
    }
     
    //进行判断
    /*
        1. 提交了不能更新
        2. 非自己创建的也无法更新 
    */

    var cur_row = rows[0];

    var b_already_post = false;
    var b_create = true;
    var ca_seq = ''; 
     
    if (cur_row.ca_status != 1) {
        b_already_post = true;
        $.messager.alert('错误', '错误:账单"' + cur_row.ca_title + '"已交账，不能反复提交!', 'error');
        return;
    }

    if (cur_row.ca_is_my_flag != 1) {
        b_create = false;
        $.messager.alert('错误', '错误:账单"' + cur_row.ca_title + '"不是您创建的，您无权提交!', 'error');
        return;
    }
      
    ca_seq = cur_row.ca_seq;
       
    if (b_already_post || !b_create) {
        return;
    }
     
     
    $('#dlg_post_ca_seq').val(cur_row.ca_seq);
      
    $('#dlg_post_ca_bak').val(cur_row.ca_bak)
    //需要对话框
    $('#dlg_post_ca').dialog({
        title: '投递账单',
        iconCls: 'icon-table_row',
        autoOpen: false,
        modal: true,
        width: 450,
        minHeight:170,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_post_ca').dialog('close');
                }
            },
            {
                text: '投递',
                iconCls: 'icon-ok',
                handler: function () {
                    post('../Ashx/checkaccount.ashx', {
                        rnd: Math.random(),
                        action: 'post',
                        ca_seq: $('#dlg_post_ca_seq').val(),
                        ca_bak: $.trim($('#dlg_post_ca_bak').val()) 
                    }, function (data) {
                        if (data.result == 1) {
                            $.messager.alert('提示', data.msg, 'info');
                            refresh_ca_list();
                        } else {
                            $.messager.alert('错误',data.msg,'error');
                        }
                    },true);
                    $('#dlg_post_ca').dialog('close');
                }
            }]
    }).dialog('open'); 
    
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
 

//查看账单
function win_view_of_ca_info() {
    var ca_seq = $('#win_dv_view_of_approval_details_from_list').data('ca_seq');
    var ca_title = $('#win_dv_view_of_approval_details_from_list').data('ca_title');
    if (ca_seq == undefined || ca_seq.length == 0) {
        $.messager.alert('错误', '错误：该费用未提交账单', 'error');
        return;
    }
    refresh_fee_list_of_ca(ca_seq, ca_title);
}

//查看业务简报 
function win_view_of_short_order_info() {
    var od_seq = $('#win_dv_view_of_approval_details_from_list').data('od_seq');
    var od_no = $('#win_dv_view_of_approval_details_from_list').data('od_no');
    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                        Math.random() + '&od_seq=' +
                        od_seq +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#window_of_order_info').window({
        title: '订单: ' + od_no,
        content: content
    }).window('open');

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


//批量修改费用 
var cur_change_fee_list = undefined;
//打开更改账单费用界面
function open_change_checkaccount() {

    var selected_rows = $('#tab_fee_list_of_ca').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误', '请选择费用条目后再执行此操作', 'error');
        return;
    }
    //前台检测 
    //1. fee_status 不能大于 2 
    //2. od_status_id 不能大于 1 或 od_amc_id 只能是null 
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

    table_bootom_selected_desc2($("#tab_fee_list_of_change"), cur_rec_or_pay);
    $('#win_woa_or_iv_order_fee').window('close');
    $('#window_of_change_fee_details').window({
        onClose: function () {
            refresh_fee_list_of_ca(cur_selected_ca.ca_seq, cur_selected_ca.ca_title);
           
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
                    amount: 0
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
                str_cr_symbol_of_fee_amount_changed = item.fee_currency_symbol + ':' + ((!item.amount_old ? 0 : item.amount_old) - (!item.amount ? 0 : item.amount)).toFixed(2);
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
function table_bootom_selected_desc2(target_tab, rec_or_pay) {
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
                '<td class="cls_' + temp + '_value">' + data_group.fee_amount + '</td>';


    panel_title.html('').html(all_gd);
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
                            row.fee_price = parseFloat(row.fee_currency_rate * row.fee_price).toFixed(2);
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
                    }, function (data2) {
                        if (data2.result == 1) {
                            win_woa_or_iv_order_fee_operation_flag = 1;
                            $("#tab_fee_list_of_change").datagrid('loadData', data2.rows);
                            $.messager.alert('提示', data2.msg, 'info');
                        } else {
                            $.messager.alert('错误', data2.msg, 'error');
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
//关闭修改窗口
function close_change_checkaccount_fee() {
    $('#window_of_change_fee_details').window('close');
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

//更改账单结算单位和标题
function update_ca_title_and_cu_id() {

    var rows = $('#tab_ca_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误:请选择账单后再执行此操作', 'error');
        return;
    }
    if (rows.length > 1) {
        $.messager.alert('错误', '错误:只能编辑一个账单数据', 'error');
        return;
    }
    //进行判断
    /*
        1. 提交了不能更新
        2. 非自己创建的也无法更新 
    */

    if (rows[0].ca_status > 1) {
        $.messager.alert('错误', '错误:账单"' + rows[0].ca_title + '"已交账或核销，无法修改!', 'error');
        return;
    }
    if (rows[0].ca_is_my_flag != 1) {
        $.messager.alert('错误', '错误:账单"' + rows[0].ca_title + '"不是您创建的，您无权修改!', 'error');
        return;
    }
    
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_checkaccount_by_ca_seq',
        ca_seq: rows[0].ca_seq
    }, function (data) {
        var ca_main_base = data.ca_main_base[0]; 
        $('#dlg_ed_ca_cu_id2').data('cu_id', ca_main_base.ca_cu_id);
        $('#dlg_ed_ca_cu_id2').combogrid('setText', ca_main_base.ca_cu_desc); 
        $('#dlg_ed_ca_title2').val(ca_main_base.ca_title); 
        $('#dlg_ed_ca_bak2').val(ca_main_base.ca_bak); 
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
                }, {
                    text: '保存',
                    iconCls: 'icon-save',
                    handler: function () {
                        var par = {
                            rnd: Math.random(),
                            ca_seq: ca_main_base.ca_seq,
                            action: 'update_main_list_simple',
                            ca_cu_id: $('#dlg_ed_ca_cu_id2').data('cu_id'),
                            ca_title: $.trim($('#dlg_ed_ca_title2').val()), 
                            ca_bak: $('#dlg_ed_ca_bak2').val() 
                        }; 
                        post('../Ashx/checkaccount.ashx', par,
                        function (data) {
                            if (data.result == 1) { 
                                refresh_ca_list();
                                $.messager.confirm('提示', '修改完成，是否继续编辑？',
                                function (r) {
                                    if (!r) {
                                        $('#dlg_new_ca_main2').dialog('close');
                                    }  
                                });
                            } else {
                                $.messager.alert('错误', data.msg, 'error');
                            }
                        }, true);
                    }
                }]
        }).dialog('open');

    }, true);

    
}

//过账单位选择
function transfer_and_post_ca_main() {
    var rows = $('#tab_ca_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误:请选择账单后再执行此操作', 'error');
        return;
    }
    if (rows.length > 1) {
        $.messager.alert('错误', '错误:单次只能过账且投递一个账单', 'error');
        return;
    }

    //进行判断
    /*
        1. 提交了不能更新
        2. 非自己创建的也无法更新 
    */
    var cur_row = rows[0];

    var b_already_post = false;
    var b_create = true;
   
    if (cur_row.ca_status != 1) {
        b_already_post = true;
        $.messager.alert('错误', '错误:账单"' + cur_row.ca_title + '"已交账，不能反复提交!', 'error');
        return;
    }

    if (cur_row.ca_is_my_flag != 1) {
        b_create = false;
        $.messager.alert('错误', '错误:账单"' + cur_row.ca_title + '"不是您创建的，您无权提交!', 'error');
        return;
    }

   

    if (b_already_post || !b_create) {
        return;
    }
     

    post('../Ashx/usermgr.ashx', {
        action: 'getcompanylist',
        rnd: Math.random()
    }, function (data) { 
        bind_combobox(data, $('#dlg_p_c_id'), 'c_desc', 'c_id', false);

        $('#dlg_of_transfer_ca').dialog({
            title: '请过账单位',
            iconCls: 'icon-transmit',
            autoOpen: false,
            modal: true,
            width: 420,
            height: 130,
            buttons: [
                {
                    text: '关闭',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#dlg_of_transfer_ca').dialog('close');
                    }
                }, {
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () {
                        var p_c_id = $('#dlg_p_c_id').combobox('getValue');
                        if (p_c_id == undefined || p_c_id == '') {
                            $.messager.alert('错误','必须选择过账单位!','error');
                            return;
                        }
                        $('#dlg_of_transfer_ca').dialog('close');
                        //这里 应该 改一下 
                        var content = '<iframe scrolling="auto" frameborder="0"  src="template_post_accountcheck.aspx?rnd=' +
                                            Math.random() + '&ca_seq=' +
                                            cur_row.ca_seq + '&p_c_id=' +
                                            p_c_id +
                                            '" style="width:100%;height:100%;"></iframe>';
                        $('#win_of_transfer_ca').window({
                            title: '账单"' + cur_row.ca_title + '"过账并投递',
                            content: content
                        }).window('open');
                    }
                }]
        }).dialog('open');

         
    }, true);
    
}

//关闭过账对话
function call_close_transfer_ca() {
    $('#win_of_transfer_ca').window('close');
}

//关闭过账对话
function close_transfer_ca_and_refresh_list() {
    $('#win_of_transfer_ca').window('close');
    refresh_ca_list();
}