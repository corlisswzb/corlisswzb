var pageNumber = 1;
var pageSize = 50;
var basesetting = undefined;
var cur_ca_list_query_params = undefined;
var cur_rec_or_pay = -1; 
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
    $('#dlg_post_pay_checkaccount_amc').dialog({
        title: '提交账单审核',
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
                    $('#dlg_post_pay_checkaccount_amc').dialog('close');
                }
            }
        ]
    }).dialog('close');

    $('#dlg_repost_pay_checkaccount_amc').dialog({
        title: '重新提交账单审核',
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
                $('#dlg_repost_pay_checkaccount_amc').dialog('close');
            }
        }]
    }).dialog('close');

    $('#dlg_edit_bank').dialog({
        title: '编辑银行信息',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 450,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_edit_bank').dialog('close');
            }
        }]
    }).dialog('close');

    $('#dlg_choise_bank').dialog({
        title: '选择银行账户',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 450,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_choise_bank').dialog('close');
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
    bind_combogrid_custom($('#search_ca_cu_id'));
    bind_combogrid_custom($('#dlg_ed_ca_cu_id'));
    bind_combogrid_custom($('#dlg_ed_ca_cu_id2'));
    bind_combogrid_invoice($('.cls_invoice_no'));
    bind_combobox(basesetting.currency_list, $('#dlg_ba_cr_id'), 'cr_name', 'cr_id', false);

    bind_combobox(basesetting.pay_approval_payment_typ_list, $('#dlg_ba_pay_typ'), 'pt_desc', 'pt_id', false);

    init_page_of_ca_create_or_choise();

    init_tab_ca_list();

    init_tab_choise_bank();

    //}, true);
}
//初始化 账单
function init_tab_ca_list() {
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
                { title: '综合状态属性', colspan: 7, align: 'center' }
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
            , { field: 'amc_relation_no', title: '审批号', sortable: true, width: 80, }
            , {
                field: 'amc_status_desc', title: '审核', width: 50, sortable: true,
                styler: function (value, row, index) {
                    if (Number(row.ca_approval_flag) == 1) {
                        if (Number(row.amc_status) == -99) {
                            return 'background-color:#ff4d4d;color:#fff;';
                        }
                        if (Number(row.amc_status) == 0) {
                            return 'background-color:#c8c8c8;color:#fe9047;';
                        }
                        if (Number(row.amc_status) == 1) {
                            return 'background-color:#ffadad;color:#000;';
                        }
                        if (Number(row.amc_status) == 2) {
                            return 'background-color:#aeffb6;color:#000;';
                        }
                    } else {
                        if (Number(row.amc_status) == 0) {
                            return 'background-color:#c8c8c8;color:#fe9047;';
                        }
                        if (Number(row.amc_status) == 1) {
                            return 'background-color:#ffadad;color:#000;';
                        }
                        if (Number(row.amc_status) == 2) {
                            return 'background-color:#aeffb6;color:#000;';
                        }
                        else {
                            return 'background-color:#aeffb6;color:#000;';
                        }
                    }
                    switch (row.ca_status) {
                        case 1: return 'background-color:#fff;color:#000;';
                        case 2: return 'background-color:#7af7f6;color:#000;';
                        case 3: return 'background-color:#ef1956;color:#fff;';
                    }
                }
            }
            , {
                field: 'amc_finish_dat', title: '通审时间', width: 78, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }

            , {
                field: 'ca_invoice_lock_desc', title: '发票', width: 60, sortable: true,

            }
            , { field: 'ca_relation_oi_no', title: '关联发票号', sortable: true, width: 70, }
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
                field: 'files_count', title: '对账附件', width: 60, align: 'center', formatter: function (value, row, index) {
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
                //
                var ca_seq = $(this).data('ca_seq');
                //
                show_checkaccount_files(ca_seq);
            });
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_ca_fee', cur_rec_or_pay);

            refresh_ca_list_footer(); 
        },
        onDblClickRow: function (index, row) { 
            //刷新 账单关联费用 
            winopen_order_fee_by_ca(row.ca_seq, row.ca_title);
            cur_selected_ca = row; 
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
//查询 账单
function refresh_ca_list() {
    if (cur_ca_list_query_params != undefined) {
        $("#tab_ca_list").datagrid('reload', cur_ca_list_query_params);
    }
}

//woa_or_iv界面通知刷新 
function refresh_from_woa_or_iv_update() {
    refresh_ca_list();
}
function requery_ca_list_by_normal_params() {
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
 
 
//菜单选择 打开不同类别的 账单集合
function show_win_of_group_ca(typ) {
     
    cur_ca_list_query_params = {
        rnd: Math.random(),
        action: 'get_checkaccount_by_typ_index',
        rec_or_pay: cur_rec_or_pay,
        typ_index: typ
    };
    refresh_ca_list();
}

 //关闭
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
 
//提交OA 
function post_ca_to_amc() {

    var selected_rows = $('#tab_ca_list').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要进行审核的账单。', 'error');
        return;
    }
    var b_ca_approval_flag = false;
    var b_amc_status = true;
    var b_cu_flag = true;

    var ca_cu_id = 0;
    var ca_cu_desc = '';
    /*
        必须都是 未交审状态 
        必须都是一家单位 
        必须 有一条是非免审 

        PS： 有可能是重新提交  
             必须是同一条  amc_id   
    */
    var ca_seq = '';
    var amc_id = '';

    var has_amc_id = false;
    var more_amc_id = false;
    //提示 开票 

    var invoice_flag = true;
    var has_gone_amc = false;
    var has_gone_ca = false;
    $.each(selected_rows, function (i, row) {
        if (ca_seq.length == 0) ca_seq = row.ca_seq;
        else ca_seq += ',' + row.ca_seq;

        if (row.ca_status == 3) {
            has_gone_ca = true;
        } 
        if (row.amc_id != undefined) {
            has_amc_id = true;
            if (amc_id.length == 0) amc_id = row.amc_id;
            else {
                if (amc_id != row.amc_id) {
                    more_amc_id = true;
                }

                if (row.amc_status == 2) {
                    has_gone_amc = true;
                }
            } 
        } 
        if (ca_cu_id == 0) {
            ca_cu_id = row.ca_cu_id;
            ca_cu_desc = row.ca_cu_desc;
        } else {
            if (ca_cu_id != row.ca_cu_id) {
                b_cu_flag = false; 
            }
        } 
        if (row.ca_approval_flag == 1) {
            b_ca_approval_flag = true; 
        } 
        if (row.ca_invoice_lock_dat == undefined) {
            invoice_flag = false;
        }


    });
    if (!b_cu_flag) {
        $.messager.alert('错误提示', '错误: 提交付款申请必须是同一家单位。', 'error');
        return;
    }
    if (has_gone_ca) {
        $.messager.alert('错误提示', '错误: 提交付款申请账单含有已付讫数据，无法再次提交审核。', 'error');
        return;
    }
    if (has_gone_amc) {
        $.messager.alert('错误提示', '错误: 提交付款申请账单含有已审核过数据，无法再次提交审核。', 'error');
        return;
    }

    if (has_amc_id && more_amc_id) {
        $.messager.alert('错误提示', '错误: 重新提交审核账单，必须属于同一个审核申请。', 'error');
        return;
    }

    //绣着这里的错误:  检测必须提前 
    var fun = function () {
        post('../Ashx/checkaccount.ashx', {
            rnd: Math.random(),
            action: 'pre_post_test_of_loss',
            ca_seq: ca_seq
        }, function (data) {

            if (data.currency_flag == 0) {
                //提示币种有多个 
                $.messager.alert('错误', '错误: 提交账单中费用设计多个币种，当前账套禁止多币种账套合并提交审核!', 'error');
                return;
            }

            if (data.loss_flag == 1) {
                //提示用户 有负账 
                $.messager.confirm('提示', data.loss_of_prompt + '，是否查看?',
                function (r) {
                    if (r) {
                        winopen_order_fee_by_ca(ca_seq, '');
                    } else {
                        post_ca_to_amc2(has_amc_id, amc_id, ca_seq, ca_cu_id, ca_cu_desc, data.bank_info);
                    }
                });
            } else {
                post_ca_to_amc2(has_amc_id, amc_id, ca_seq, ca_cu_id, ca_cu_desc, data.bank_info);

            }
        }, true);
    }
    if (!invoice_flag) {
        $.messager.confirm('提示', '您所选账单存在未录发票情况，是否要进行发票录入？',
        function (r) {
            if (r) { 
                winopen_order_fee_by_ca(ca_seq, '');
            } else {
                fun();
            }
        });
    } else {
        fun();
    } 
}

function post_ca_to_amc2(has_amc_id, amc_id, ca_seq, ca_cu_id, ca_cu_desc, bank_info) {
    
    $('#dlg_ba_id').data('da_id', bank_info).val(bank_info);
    $('#dlg_ba_pay_typ').combobox('setValue', '');
    $('#dlg_ba_pay_dat').datebox('setValue', ''); 
    if (!has_amc_id) {
        $('#btn_setting_custom_bank').data('cu_desc', ca_cu_desc);
        $('#btn_setting_custom_bank').data('cu_id', ca_cu_id);
        post('../Ashx/sys_base.ashx', {
            rnd: Math.random(),
            action: 'get_bank_by_cu_id',
            ba_cu_id: ca_cu_id,
        }, function (data_of_bank) {  
            $("#tab_bank").datagrid('loadData', data_of_bank); 
            post('../Ashx/approval_mgr.ashx', {
                rnd: Math.random(),
                action: 'get_start_schema_point',
                apt_id: 2,
            }, function (data) {
                var schema_point_list = data; 
                $('#dlg_start_schema_point').combobox({
                    panelHeight: 'auto', hasDownArrow: true, valueField: 'guid',
                    textField: 'aps_show',
                    data: schema_point_list
                });
                $('#dlg_post_pay_checkaccount_amc').dialog({
                    title: '提交账单审核',
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
                                var ba_desc = $.trim($('#dlg_ba_id').val());
                                var ba_pay_dat = $('#dlg_ba_pay_dat').datebox('getValue');
                                var ba_pay_typ = $('#dlg_ba_pay_typ').combobox('getValue');
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

                                //校验 
                                if(ba_pay_dat.length == 0){
                                    $.messager.alert('错误提示', '错误: 付款时间必须填写。', 'error');
                                    return;
                                }
                                var has_pt = false;

                                $.each(basesetting.pay_approval_payment_typ_list, function (i, item) {
                                    if (ba_pay_typ == item.pt_id) {
                                        has_pt = true; 
                                    }
                                });

                                var fun1 = function (){
                                    var fun = function () {
                                        $('#dlg_post_pay_checkaccount_amc').dialog('close');

                                        post('../Ashx/checkaccount.ashx', {
                                            rnd: Math.random(),
                                            action: 'post_pay_checkaccount',
                                            ca_seq: ca_seq,
                                            ap_u_id: ap_u_id,
                                            aps_order_by_id: aps_order_by_id,
                                            aps_id: aps_id,
                                            ba_desc: ba_desc,
                                            ba_pay_typ:ba_pay_typ,
                                            ba_pay_dat: ba_pay_dat,
                                            amc_bak: $('#dlg_ap_context').val(),
                                        }, function (data) {
                                            if (data.result == 1) {
                                                $.messager.alert('提示', data.msg, 'info', function () {
                                                    $('#dlg_repost_pay_checkaccount_amc').dialog('close');
                                                    refresh_ca_list();
                                                });
                                            } else {
                                                $.messager.alert('错误提示', data.msg, 'error');
                                            }
                                        }, true);
                                    }
                                    if (ba_desc.length == 0) {
                                        $.messager.confirm('提示', '注意:您没有选择打款银行，是否继续？', function (r) {
                                            if (r) {
                                                fun();
                                            }  
                                        }); 
                                    } else {
                                        fun();
                                    }
                                }

                                if(!has_pt){
                                    //是否继续  
                                    $.messager.confirm('提示', '注意:付款方式没有设置或不是预设值，是否继续？', function (r) {
                                        if (r) {
                                            fun1();
                                        }  
                                    }); 
                                } else {
                                    fun1();
                                } 
                            }
                        }]
                }).dialog('open');
            }, true);
        }, false);

        //新建 
        
    } else {
        $('#btn_setting_custom_bank2').data('cu_desc', ca_cu_desc);
        $('#btn_setting_custom_bank2').data('cu_id', ca_cu_id);
        post('../Ashx/sys_base.ashx', {
            rnd: Math.random(),
            action: 'get_bank_by_cu_id',
            ba_cu_id: ca_cu_id,
        }, function (data_of_bank) {
             
            //重新提交 
            //必须是同一个 amc_id 
            $('#dlg_repost_pay_checkaccount_amc').dialog({
                title: '重新提交账单审核',
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
                        $('#dlg_repost_pay_checkaccount_amc').dialog('close');
                    }
                },
                {
                    text: '重新提交',
                    iconCls: 'icon-ok',
                    handler: function () {
                        
                        
                         
                        post('../Ashx/approval_mgr.ashx', {
                            rnd: Math.random(),
                            action: 'repost_amc_pay_checkaccount',
                            ap_context: $('#dlg_ap_context2').val(), 
                            amc_id: amc_id
                        }, function (data) {
                            if (data.result == 1) {
                                $.messager.alert('提示', data.msg, 'info', function () {
                                    $('#dlg_repost_pay_checkaccount_amc').dialog('close');
                                    refresh_ca_list();
                                });
                            } else {
                                $.messager.alert('错误', data.msg, 'error');
                            }
                        }, true);
                    } 
                     
                }]
            }).dialog('open');
        }, false);

        
    }
}

//清空条件 
 

//切换到专注模式  
function change_to_ca_focus_model() {
    parent.call_change_to_focus_model_of_ca();
}
 
//打开历史销账记录 
function view_write_off_accounts_list() {

    var content = '<iframe scrolling="auto" frameborder="0"  src="template_woa_record.aspx?rnd=' +
                    Math.random() + '&rec_or_pay=' +
                    cur_rec_or_pay +
                    '" style="width:100%;height:100%;"></iframe>';
    $('#window_of_write_off_accounts').window({
        title: parent.call_get_path() + '销账记录',
        content: content
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
        content: content
    }).window('open');
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
//新增公司银行账户 
function open_choise_custom_bank(return_dialog) {
    var cu_id = undefined;
    var cu_desc = undefined;

    if (return_dialog == 'dlg_repost_pay_checkaccount_amc') {
        cu_id = $('#btn_setting_custom_bank2').data('cu_id');
        cu_desc = $('#btn_setting_custom_bank2').data('cu_desc');
    } else {
        cu_id = $('#btn_setting_custom_bank').data('cu_id');
        cu_desc = $('#btn_setting_custom_bank').data('cu_desc');
    }

    $('#dlg_choise_bank').dialog({
        title: '选择银行账户',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        height: 450,
        buttons: [
        {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#' + return_dialog).dialog('open');
                $('#dlg_choise_bank').dialog('close');
            }
        }, {
            text: '选择',
            iconCls: 'icon-ok',
            handler: function () {

                var rows = $("#tab_bank").datagrid('getChecked');

                var ba_id = '';

                if (rows.length > 0) {
                    $.each(rows, function (i, citem) {
                        if (ba_id.length == 0) {
                            ba_id = citem.bank_info;
                        } else {
                            ba_id += '\r' + citem.bank_info;
                        }
                    });
                }
                $('#dlg_ba_id').data('ba_id', ba_id).val(ba_id);
                $('#' + return_dialog).dialog('open');
                $('#dlg_choise_bank').dialog('close');  
            }
        }]
    }).dialog('open');


    $('#dlg_ba_cu_desc').html(cu_desc); 
 
    $('#dlg_ba_cu_desc').data('cu_id', cu_id);
}

//初始化银行选择 表格 
function init_tab_choise_bank() {
    $("#tab_bank").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        border: false,
        rownumbers: true, 
        nowrap: false,
        striped: true,
        collapsible: false,
        fit: true,
        toolbar:'#tab_bank_bar',
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
      
        columns: [[
            { field: 'ck', width: 40, title: '', checkbox: true },
            { field: 'cr_name', width: 50, title: '币种', align: 'left', },
            { field: 'ba_desc', width: 200, title: '银行名称', align: 'left', },
            { field: 'ba_card_no', width: 120, title: '银行账号', align: 'left', }, 
            {
                field: 'ba_default_flag', width: 40, title: '默认', align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    }
                }
            },
        ]],
    });
}

function add_new_bank () {
    $('#dlg_choise_bank').dialog('close'); 
    var cur_cu_id = $('#dlg_ba_cu_desc').data('cu_id');

    $('#dlg_edit_bank').dialog({
        title: '新增银行信息',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        height: 450,
        buttons: [
        {
            text: '保存',
            iconCls: 'icon-save',
            handler: function () {

                var par = {
                    rnd: Math.random(),
                    action: 'insert_bank',
                    ba_cu_id: cur_cu_id,
                    ba_cr_id: $('#dlg_ba_cr_id').combobox('getValue'),
                    ba_desc: $.trim($('#dlg_ba_desc').val()),
                    ba_address: $.trim($('#dlg_ba_address').val()),
                    ba_card_no: $.trim($('#dlg_ba_card_no').val()),
                    ba_default_flag: $('#dlg_ba_default_flag').is(':checked')?1:0
                };

                //要求，必须要填完整 

                if (par.ba_cr_id == undefined || isNaN(par.ba_cr_id)) {
                    $.messager.alert('错误提示','错误: 必须选择币种','error');
                    return;
                }

                if (par.ba_desc == undefined || par.ba_desc.length == 0) {
                    $.messager.alert('错误提示', '错误: 必须填写银行信息', 'error');
                    return;
                }

                if (par.ba_card_no == undefined ||par.ba_card_no.length == 0) {
                    $.messager.alert('错误提示', '错误: 必须卡号信息', 'error');
                    return;
                }

                post('../Ashx/sys_base.ashx',par,
                function (data) {
                    if (data.result == 1) {
                        reload_tab_bank(cur_cu_id);
                        $('#dlg_edit_bank').dialog('close');
                        $('#dlg_choise_bank').dialog('open');
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                },false);
                    
            }
        },
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_edit_bank').dialog('close');
                $('#dlg_choise_bank').dialog('open');
            }
        }]
    }).dialog('open');
}

//加载银行信息
function reload_tab_bank(cu_id) {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_bank_by_cu_id',
        ba_cu_id: cu_id,
        ba_default_flag: ''
    }, function (data) {
        $("#tab_bank").datagrid('loadData', data);
    }, false);
}
 