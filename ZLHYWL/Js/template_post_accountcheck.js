

var cur_edit_fee_rowindex_rec = undefined;
var cur_edit_fee_rowindex_pay = undefined;

var tmp_combogrid_cu_id_rec  = undefined;
var tmp_combogrid_cu_desc_rec  = undefined;

var tmp_combogrid_cu_id_pay = undefined;
var tmp_combogrid_cu_desc_pay = undefined;

var basesetting = undefined;

var p_c_id = undefined;
var o_ca_seq = undefined;

var pay_fee_cu_id = undefined;
var rec_fee_cu_id = undefined;

var pay_fee_cu_desc = undefined;
var rec_fee_cu_desc = undefined;

var res_ca_title = undefined;
var trans_c_desc = undefined;

$(document).ready(function () {
    $('#dlg_of_create_transfer_result').dialog({
        title: '过账结果',
        iconCls: 'icon-transmit',
        autoOpen: false,
        modal: true,
        width: 80,
        height: 420,

    }).dialog('close');

    var height = $('div.father_order_fee').height();
    var $fee_page = $('div.order_fee_details');
    var south_panel = $fee_page.layout('panel', 'south');
    var center_panel = $fee_page.layout('panel', 'center');
    center_panel.panel('resize', {
        height: (height) / 2,
        top: 0,
    });
    south_panel.panel('resize', {
        height: (height) / 2,
        top: parseInt((height) / 2 - 0.5),
    });

    o_ca_seq = getQueryVariable('ca_seq');
    p_c_id = getQueryVariable('p_c_id');

    get_basesetting();
});

//获取基础数据
function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections_by_c_id',
        c_id: p_c_id
    }, function (data) {

        basesetting = data;
        

        bind_combogrid_custom($('#n_ca_cu_id'));
        self_bind_combogrid_custom_by_company_id($('#p_od_delegate_cu_id'));
        self_bind_combogrid_custom_by_company_id($('#p_od_rec_fee_cu_id'));
        self_bind_combogrid_custom_by_company_id($('#p_od_pay_fee_cu_id'));

        bind_combobox(basesetting.employe_list, $('#p_od_record_by_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#p_od_operation_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#p_od_sales_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#p_od_services_id'), 'u_real_name', 'u_id', false);

        init_tab_order_fee_pay();
        init_tab_order_fee_rec();

        /*
            后台去做两件事情 
            1. 读取ca_seq基本信息 
            2. 
        */
        post('../Ashx/checkaccount.ashx', {
            rnd: Math.random(),
            action: 'transfer_accountcheck',
            ca_seq: o_ca_seq,
            trans_c_id: p_c_id,
        }, function (data) {


            /*
            
            */

            if (Number(data.trans_ca_cu_checkaccount_flag) == 0) {

                $.messager.alert('错误提示', '您选择的过帐单位“' + data.trans_ca_cu_desc + '”在此账套中被禁止提交该类型(应收/应付)账单,无法完成过账操作。', 'error', function () {
                    parent.close_transfer_ca_and_refresh_list();
                }); 
                return;
            }

            if (Number(data.os_rec_fee_cu_checkaccount_flag) == 0) {

                $.messager.alert('错误提示', '过账后在账套“' + data.trans_c_desc + '”的应收账单中被禁止提交,无法完成过账操作。', 'error', function () {
                    parent.close_transfer_ca_and_refresh_list();
                });
                return;
            }

            if (Number(data.os_pay_fee_cu_checkaccount_flag) == 0) {

                $.messager.alert('错误提示', '过账后在账套“' + data.trans_c_desc + '”的应付账单中被禁止提交,无法完成过账操作。', 'error', function () {
                    parent.close_transfer_ca_and_refresh_list();
                });
                return;
            }

            res_ca_title = data.trans_ca_title;
            trans_c_desc = data.trans_c_desc;

            $('#o_ca_title').val(data.trans_ca_title);
            $('#o_post_by').val(data.trans_create_by_name);
            $('#o_post_dat').val(data.trans_create_dat);
            $('#o_ca_fee_total_desc').val(data.trans_group_fee_desc);
            $('#o_ca_cu_id').val(data.trans_old_cu_desc);
            $('#o_ca_year').val(data.trans_ca_year);
            $('#o_ca_month').val(data.trans_ca_month);

            $('#n_ca_cu_id').data('cu_id', data.trans_ca_cu_id);
            $('#n_ca_cu_id').combogrid('setText', data.trans_ca_cu_desc);
            $('#n_ca_title').val('');
            $('#n_ca_bak').val(data.trans_ca_bak);
    
            $('#p_c_id').val(data.trans_c_desc);

            $('#p_od_delegate_cu_id').data('cu_id', data.os_od_delegate_cu_id);
            $('#p_od_delegate_cu_id').combogrid('setText', data.os_od_delegate_cu_desc);

            $('#p_od_record_by_id').combobox('setValue', data.os_od_record_by_id);
            $('#p_od_operation_id').combobox('setValue', data.os_od_operation_id);
            $('#p_od_sales_id').combobox('setValue', data.os_od_sales_id);
            $('#p_od_services_id').combobox('setValue', data.os_od_service_id);
            $('#p_od_bak_delegate').val(data.os_od_bak);
            rec_fee_cu_id = data.os_rec_fee_cu_id;
            rec_fee_cu_desc = data.os_rec_fee_cu_desc;
            $('#p_od_rec_fee_cu_id').data('cu_id', rec_fee_cu_id);
            $('#p_od_rec_fee_cu_id').combogrid('setText'.rec_fee_cu_desc);

            pay_fee_cu_id = data.os_pay_fee_cu_id;
            pay_fee_cu_desc = data.os_pay_fee_cu_desc;
            $('#p_od_pay_fee_cu_id').data('cu_id', pay_fee_cu_id);
            $('#p_od_pay_fee_cu_id').combogrid('setText'.pay_fee_cu_desc);
             

            var fee_details = data.fee_details;

            var rec_rows = [];

            var pay_rows = [];

            if (fee_details.length > 0) {
                $.each(fee_details, function (i, item) {
                    if (Number(item.rec_or_pay) == 1) {
                        rec_rows.push(item);
                    } else {
                        pay_rows.push(item);
                    }
                });
            }
            $("#tab_order_fee_pay").datagrid('loadData',pay_rows);
            $("#tab_order_fee_rec").datagrid('loadData', rec_rows);

        },true)

    }, true);


}
//初始化表格 应付表格
function init_tab_order_fee_pay() {
    $("#tab_order_fee_pay").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        toolbar:'#tab_order_fee_pay_bar',
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        showFooter: true,
        frozenColumns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true }
            , {
                field: 'fee_status_desc', title: '状态', sortable: true, width: 46,
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
            {
                field: 'fee_cu_desc', title: '结算单位', width: 210, sortable: true, 
            }
            , {
                field: 'fee_invoice_typ', title: '票率', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'in_id',
                        textField: 'in_name',
                        data: basesetting.invoice_list,
                        panelWidth: 300,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    return row.fee_item_typ_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'fee_id',
                        textField: 'fee_show_desc',
                        data: basesetting.fee_item_list,
                        filter: filterCombo,
                        panelWidth: 300,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'fee_unit', title: '单位', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_unit_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'u_id',
                        textField: 'u_desc',
                        data: basesetting.unit_list,
                        filter: filterCombo,
                        panelWidth: 100,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_price', title: '单价', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'fee_currency_id', title: '币种', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_currency_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'cr_id',
                        textField: 'cr_name',
                        panelWidth: 100,
                        data: basesetting.currency_list,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_bak', title: '备注', width: 260, sortable: true,
                editor: {
                    type: 'text',
                },
            }

        ]],
        onAfterEdit: function (index, row, changes) {
            cur_edit_fee_rowindex_pay = undefined;
            //需要进行数据替换  
            //简单的说就是 要进行替换  
            //客户名称
            var has = false;
            row.fee_cu_desc = tmp_combogrid_cu_desc_pay;
            row.fee_cu_id = tmp_combogrid_cu_id_pay;
            tmp_combogrid_cu_id_pay = undefined;
            tmp_combogrid_cu_desc_pay = undefined;


            has = false;
            //票率
            $.each(basesetting.invoice_list, function (i, item) {
                if (row.fee_invoice_typ == item.in_id) {
                    has = true;
                    row.fee_invoice_typ_desc = item.in_name;
                }
            });
            if (!has) row.fee_invoice_typ_desc = row.fee_invoice_typ;
            has = false;

            //费项目
            $.each(basesetting.fee_item_list, function (i, item) {
                if (item.fee_id == row.fee_item_typ) {
                    has = true;
                    row.fee_item_typ_desc = item.fee_cn;
                }
            });
            if (!has) row.fee_item_typ_desc = row.fee_item_typ;
            has = false;
            //费目
            $.each(basesetting.unit_list, function (i, item) {
                if (item.u_id == row.fee_unit) {
                    has = true;
                    row.fee_unit_desc = item.u_desc;
                }
            });
            if (!has) row.fee_unit_desc = row.fee_unit;
            has = false;
            //币种
            $.each(basesetting.currency_list, function (i, item) {
                if (row.fee_currency_id == item.cr_id) {
                    has = true;
                    row.fee_currency_desc = item.cr_name;
                }
            });
            if (!has) row.fee_currency_desc = row.fee_currency_id;
             

            row.fee_amount = (row.fee_price * row.fee_number * row.fee_currency_rate).toFixed(2);

            $("#tab_order_fee_pay").datagrid('updateRow', {
                index: index,
                row: row
            });

            //每次保存完毕，都要对 汇总表进行更新 
             

        },
        onBeforeEdit: function (index, row) {
            if (cur_edit_fee_rowindex_pay != index && cur_edit_fee_rowindex_pay != undefined) {
                $('#tab_order_fee_pay').datagrid('endEdit', cur_edit_fee_rowindex_pay);
                cur_edit_fee_rowindex_pay = index;
            }


        },
        onClickRow: function (index, row) {

            if (cur_edit_fee_rowindex_pay != undefined &&
                cur_edit_fee_rowindex_pay != index) {
                $('.datagrid-row').unbind('click');
                $('#tab_order_fee_pay').datagrid('endEdit', cur_edit_fee_rowindex_pay);
            }
            if (cur_edit_fee_rowindex_pay == undefined) {
                if (row.fee_status == 1) {
                    cur_edit_fee_rowindex_pay = index;
                    tmp_combogrid_cu_id_pay = row.fee_cu_id;
                    tmp_combogrid_cu_desc_pay = row.fee_cu_desc;
                    $('#tab_order_fee_pay').datagrid('beginEdit', cur_edit_fee_rowindex_pay);

                    $('.datagrid-row-editing').unbind('click').bind('click', function () {
                        event.stopPropagation();
                    });
                    $(document).on('click', ':not(.datagrid-row)', function () {
                        if (cur_edit_fee_rowindex_pay != undefined) {
                            $('.datagrid-row').unbind('click');
                            $('#tab_order_fee_pay').datagrid('endEdit', cur_edit_fee_rowindex_pay);
                        }
                    });
                }
            }
            refresh_pay_fee_of_footer();
        },
        onLoadSuccess: function (data) {

            //汇总信息 数量，小计，已收 

            var data_group = {
                fee_number: 0,
                fee_amount: ''  

            };
            //币种和金额 

            var data_cr_symbol_of_fee_amount = []; 

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

            
            data_group.fee_amount = str_cr_symbol_of_fee_amount
         


            $('#tab_order_fee_pay').datagrid('reloadFooter', [{
                fee_number: data_group.fee_number.toFixed(2),
                fee_amount: data_group.fee_amount, 
            }]);
        },
        onCheck: function (index, row) {
            refresh_pay_fee_of_footer();
        },
        onUncheck: function (index, row) {
            refresh_pay_fee_of_footer();
        },
        onCheckAll: function (index, row) {
            refresh_pay_fee_of_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_pay_fee_of_footer();
        },
    });
}
function refresh_pay_fee_of_footer() {

    var rows = $('#tab_order_fee_pay').datagrid('getChecked');
    var panel_title = $('.cls_panel_pay .panel-title').eq(0);
    if (rows.length > 0) {


        var data_group = {
            fee_number: 0,
            fee_amount: '',
            woa_total_amount: ''

        };
        //币种和金额 

        var data_cr_symbol_of_fee_amount = [];
        var data_cr_symbol_of_woa_total_amount = [];

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
        data_group.fee_amount = str_cr_symbol_of_fee_amount
        data_group.woa_total_amount = str_cr_symbol_of_woa_total_amount;





        panel_title.html('<div style="float:left">应付费用</div><div style="float:right">选择:' + rows.length + '行,数量:' + data_group.fee_number + ' 金额:' + data_group.fee_amount + ',已销金额:' + data_group.woa_total_amount + '</div>');

    } else {
        panel_title.html('应付费用');
    }
}

//初始化表格 应收表格 
function init_tab_order_fee_rec() {

    /*
    应收: 
        1. 对账、请款人   
        2. 开票
        3. 销账 
    */
    $("#tab_order_fee_rec").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        toolbar:'#tab_order_fee_rec_bar',
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        showFooter: true,
        frozenColumns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true }
            , {
                field: 'fee_status_desc', title: '状态', sortable: true, width: 46,
                styler: function (value, row, index) {
                    if (row.fee_change_lock_flag == 1) {
                        return 'background-color:#ea60ff;color:#FFF;';
                    } else {
                        switch (row.fee_status) {
                            case 1: return 'background-color:#fff;color:#000;';
                            case 2: return 'background-color:#f3e676;color:#000;';
                            case 3: return 'background-color:#7af7f6;color:#000;';
                            case 4: return 'background-color:#09c41f;color:#fff;';
                            case 9: return 'background-color:#ef1956;color:#fff;';
                        }
                    }
                }
            }
        ]],
        columns: [[
            {
                field: 'fee_cu_desc', title: '结算单位', width: 210, sortable: true, 
            }
            , {
                field: 'fee_invoice_typ', title: '票率', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'in_id',
                        textField: 'in_name',
                        data: basesetting.invoice_list,
                        panelWidth: 300,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    return row.fee_item_typ_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'fee_id',
                        textField: 'fee_show_desc',
                        data: basesetting.fee_item_list,
                        filter: filterCombo,
                        panelWidth: 300,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'fee_unit', title: '单位', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_unit_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'u_id',
                        textField: 'u_desc',
                        data: basesetting.unit_list,
                        filter: filterCombo,
                        panelWidth: 100,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_price', title: '单价', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'fee_currency_id', title: '币种', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_currency_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'cr_id',
                        textField: 'cr_name',
                        panelWidth: 100, 
                        data: basesetting.currency_list,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            } 
            , {
                field: 'fee_bak', title: '备注', width: 260, sortable: true,
                editor: {
                    type: 'text',
                },
            } 
             
        ]],
        onAfterEdit: function (index, row, changes) {
            cur_edit_fee_rowindex_rec = undefined;
            //需要进行数据替换  
            //简单的说就是 要进行替换  
            //客户名称
            var has = false;
            row.fee_cu_desc = tmp_combogrid_cu_desc_rec;
            row.fee_cu_id = tmp_combogrid_cu_id_rec;
            tmp_combogrid_cu_id_rec = undefined;
            tmp_combogrid_cu_desc_rec = undefined;


            has = false;
            //票率
            $.each(basesetting.invoice_list, function (i, item) {
                if (row.fee_invoice_typ == item.in_id) {
                    has = true;
                    row.fee_invoice_typ_desc = item.in_name;
                }
            });
            if (!has) row.fee_invoice_typ_desc = row.fee_invoice_typ;
            has = false;

            //费项目
            $.each(basesetting.fee_item_list, function (i, item) {
                if (item.fee_id == row.fee_item_typ) {
                    has = true;
                    row.fee_item_typ_desc = item.fee_cn;
                }
            });
            if (!has) row.fee_item_typ_desc = row.fee_item_typ;
            has = false;
            //费目
            $.each(basesetting.unit_list, function (i, item) {
                if (item.u_id == row.fee_unit) {
                    has = true;
                    row.fee_unit_desc = item.u_desc;
                }
            });
            if (!has) row.fee_unit_desc = row.fee_unit;
            has = false;
            //币种
            $.each(basesetting.currency_list, function (i, item) {
                if (row.fee_currency_id == item.cr_id) {
                    has = true;
                    row.fee_currency_desc = item.cr_name;
                }
            });
            if (!has) row.fee_currency_desc = row.fee_currency_id;
             

            row.fee_amount = (row.fee_price * row.fee_number * row.fee_currency_rate).toFixed(2);

            $("#tab_order_fee_rec").datagrid('updateRow', {
                index: index,
                row: row
            });

            //每次保存完毕，都要对 汇总表进行更新 

         



        },
        onBeforeEdit: function (index, row) {
            if (cur_edit_fee_rowindex_rec != index && cur_edit_fee_rowindex_rec != undefined) {
                $('#tab_order_fee_rec').datagrid('endEdit', cur_edit_fee_rowindex_rec);
                cur_edit_fee_rowindex_rec = index;
            }


        },
        onClickRow: function (index, row) {

            if (cur_edit_fee_rowindex_rec != undefined &&
                cur_edit_fee_rowindex_rec != index) {
                $('.datagrid-row').unbind('click');
                $('#tab_order_fee_rec').datagrid('endEdit', cur_edit_fee_rowindex_rec);
            }
            if (cur_edit_fee_rowindex_rec == undefined) {
                if (row.fee_status == 1) {
                    cur_edit_fee_rowindex_rec = index;
                    tmp_combogrid_cu_id_rec = row.fee_cu_id;
                    tmp_combogrid_cu_desc_rec = row.fee_cu_desc;
                    $('#tab_order_fee_rec').datagrid('beginEdit', cur_edit_fee_rowindex_rec);

                    $('.datagrid-row-editing').unbind('click').bind('click', function () {
                        event.stopPropagation();
                    });
                    $(document).on('click', ':not(.datagrid-row)', function () {
                        if (cur_edit_fee_rowindex_rec != undefined) {
                            $('.datagrid-row').unbind('click');
                            $('#tab_order_fee_rec').datagrid('endEdit', cur_edit_fee_rowindex_rec);
                        }
                    }); 
                }
            }
            refresh_rec_fee_of_footer();
        },
        onLoadSuccess: function (data) {

            //汇总信息 数量，小计，已收 
 
            var data_group = {
                fee_number: 0,
                fee_amount: '',
                woa_total_amount: ''

            };
            //币种和金额 

            var data_cr_symbol_of_fee_amount = [];
            var data_cr_symbol_of_woa_total_amount = [];

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
            data_group.fee_amount = str_cr_symbol_of_fee_amount
            data_group.woa_total_amount = str_cr_symbol_of_woa_total_amount;



            $('#tab_order_fee_rec').datagrid('reloadFooter', [{
                fee_number: data_group.fee_number.toFixed(2),
                fee_amount: data_group.fee_amount,
                woa_total_amount: data_group.woa_total_amount
            }]);
        },

        onCheck: function (index, row) {
            refresh_rec_fee_of_footer();
        },
        onUncheck: function (index, row) {
            refresh_rec_fee_of_footer();
        },
        onCheckAll: function (index, row) {
            refresh_rec_fee_of_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_rec_fee_of_footer();
        },
    });
}
function refresh_rec_fee_of_footer() {

    var rows = $('#tab_order_fee_rec').datagrid('getChecked');
    var panel_title = $('.cls_panel_rec .panel-title').eq(0);
    if (rows.length > 0) {


        var data_group = {
            fee_number: 0,
            fee_amount: '',
            woa_total_amount: ''

        };
        //币种和金额 

        var data_cr_symbol_of_fee_amount = [];
        var data_cr_symbol_of_woa_total_amount = [];

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
        data_group.fee_amount = str_cr_symbol_of_fee_amount
        data_group.woa_total_amount = str_cr_symbol_of_woa_total_amount;





        panel_title.html('<div style="float:left">应收费用</div><div style="float:right">选择:' + rows.length + '行,数量:' + data_group.fee_number + ' 金额:' + data_group.fee_amount + ',已销金额:' + data_group.woa_total_amount + '</div>');

    } else {
        panel_title.html('应收费用');
    }
}

//关闭窗口
function close_transfer_ca() {
    parent.call_close_transfer_ca();
}

//保存前需要对 费用列表进行检测，必须是符合要求的数据才能录入  
function validate_fee_data(target,msg,rec_or_pay) {
    var rows = target.datagrid('getRows');

    if (rows.length == 0) return true;

    var isRight_custom = false;
    var isRight_invoice = false;
    var isRight_fee_item = false;
    var isRight_unit = false;
    var isRight_currency = false;
    var isRight_price = false;
    var isRight_number = false;
    var isRight_currency_rate = false;
    var errow_index = 0;

    $.each(rows, function (i, row) {
        isRight_custom = false;
        isRight_invoice = false;
        isRight_fee_item = false;
        isRight_unit = false;
        isRight_currency = false;
        isRight_price = false;
        isRight_number = false;
        isRight_currency_rate = false;
        msg = '';

        /*
            增加文本匹配  
        */

        //对状态  
        //客户不能为未定值 
        if (row.fee_cu_id != '' && row.fee_cu_id != undefined) {
            isRight_custom = true;
        }
        if (!isRight_custom) msg += (msg.length > 0 ? '/' : '') + "结算单位不是预设值";
        //票率
        $.each(basesetting.invoice_list, function (i, item) {
            if (row.fee_invoice_typ == item.in_id) {
                isRight_invoice = true;
                return;
            }
        });
        if (!isRight_invoice) {
            $.each(basesetting.invoice_list, function (i, item) {
                if (row.fee_invoice_typ_desc == item.in_name) {
                    row.fee_invoice_typ = item.in_id;
                    isRight_invoice = true;
                    return;
                }
            });
        }

        if (!isRight_invoice) msg += (msg.length > 0 ? '/' : '') + "票率不是预设值";
        //费项目
        $.each(basesetting.fee_item_list, function (i, item) {
            if (item.fee_id == row.fee_item_typ) {
                isRight_fee_item = true;
                return;
            }
        });
        if (!isRight_fee_item) {
            $.each(basesetting.fee_item_list, function (i, item) {
                if (row.fee_item_typ_desc == item.fee_cn) {
                    row.fee_item_typ = item.fee_id;
                    isRight_fee_item = true;
                    return;
                }
            });
        }

        if (!isRight_fee_item) msg += (msg.length > 0 ? '/' : '') + "费项不是预设值";
        //费目
        $.each(basesetting.unit_list, function (i, item) {
            if (item.u_id == row.fee_unit) {
                isRight_unit = true;
                return;
            }
        });
        if (!isRight_unit) {
            $.each(basesetting.unit_list, function (i, item) {
                if (row.fee_unit_desc == item.u_desc) {
                    row.fee_unit = item.u_id;
                    isRight_unit = true;
                    return;
                }
            });
        }

        if (!isRight_unit) msg += (msg.length > 0 ? '/' : '') + "计量单位不是预设值";
        //币种
        $.each(basesetting.currency_list, function (i, item) {
            if (row.fee_currency_id == item.cr_id) {
                isRight_currency = true;
                return;
            }
        });
        if (!isRight_currency) {
            $.each(basesetting.currency_list, function (i, item) {
                if (row.fee_currency_desc == item.cr_name) {
                    row.fee_currency_id = item.cr_id;
                    isRight_currency = true;
                    return;
                }
            });
        }

        if (!isRight_currency) msg += (msg.length > 0 ? '/' : '') + "币种不是预设值";

        //单价和数量 必须是数字模式 

        //数量金额 不能为 0 

        if (isNaN(row.fee_price) == false && row.fee_price != undefined && row.fee_price != 0) {
            isRight_price = true;
        }
        if (!isRight_price) msg += (msg.length > 0 ? '/' : '') + "单价必须是数字,且不能为0";

        if (isNaN(row.fee_number) == false && row.fee_number != undefined && row.fee_number != 0) {
            isRight_number = true;
        }
        if (!isRight_number) msg += (msg.length > 0 ? '/' : '') + "数量必须是数字,且不能为0";

        if (isNaN(row.fee_currency_rate) == false && row.fee_currency_rate != undefined && row.fee_currency_rate != 0) {
            isRight_currency_rate = true;
        }
        if (!isRight_currency_rate) msg += (msg.length > 0 ? '/' : '') + "汇率必须是数字,且不能为0,PS:有可能是没有设置汇率";

        //跳出循环 
        if (isRight_currency && isRight_custom && isRight_fee_item && isRight_invoice && isRight_number && isRight_price && isRight_unit) {
            return true;
        } else {
            errow_index = i + 1;
            return false;
        }
    });

    if (isRight_currency && isRight_custom && isRight_fee_item && isRight_invoice && isRight_number && isRight_price && isRight_unit) {
        return true;
    } else {
        $.messager.alert('错误提示', '错误: 应' + (rec_or_pay==1?'收':'付') + '列表中第' + errow_index + '行:' + msg + '!', 'error');
        return false;
    }
}

function self_bind_combogrid_custom_by_company_id($target) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'cu_name',
        data: [],
        multiple: false,
        //url: '../Ashx/sys_base.ashx',
        //queryParams: {
        //    rnd: Math.random(),
        //    action: 'get_custom_by_like_str_for_combogrid',
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
                { field: 'cu_name', title: '公司名', width: 330 },
                { field: 'cu_code', title: '代码', width: 110 },
        ]],
        onLoadSuccess: function (data) {


        },
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
                queryParams.rnd = Math.random(),
                queryParams.c_id = p_c_id,

                queryParams.action = 'get_custom_by_like_str_for_combogrid_by_company_id';
                $target.combogrid('grid').datagrid('options').url = '../Ashx/sys_base.ashx';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('cu_id', '');
            },
        },
        onSelect: function (index, item) {              //选中处理   
            $target.data('cu_id', item.cu_id);
            $target.combogrid('setText', item.cu_name);
        }
    });

    $target.combogrid('grid').datagrid('options').url = '../Ashx/sys_base.ashx';
    $target.combogrid('grid').datagrid('options').queryParams = {
        rnd: Math.random(),
        action: 'get_custom_by_like_str_for_combogrid_by_company_id',
        like_str: guid(),
        c_id: p_c_id
    };
}
 
//保存创建过账明细 
function create_transfer_ca() {


    //需要判断
    var msg = '';
    if (!validate_fee_data($('#tab_order_fee_rec'),msg,1)) {
        return;
    }
    if (!validate_fee_data($('#tab_order_fee_pay'), msg, -1)) {
        return;
    }

    var fee_rows = [];

    var rec_rows = $('#tab_order_fee_rec').datagrid('getRows');
    var pay_rows = $('#tab_order_fee_pay').datagrid('getRows');
     
    $.each(rec_rows,function(i,item){
        fee_rows.push(item);
    });
    $.each(pay_rows,function(i,item){
        fee_rows.push(item);
    });



    var par = {
        rnd: Math.random(),
        action: 'create_transfer_ca',
        res_ca_seq: o_ca_seq, 
        od_delegate_cu_id: $('#p_od_delegate_cu_id').data('cu_id'),
        od_record_by_id: $('#p_od_record_by_id').combobox('getValue'),
        od_operation_id: $('#p_od_operation_id').combobox('getValue'),
        od_sales_id: $('#p_od_sales_id').combobox('getValue'),
        od_service_id: $('#p_od_services_id').combobox('getValue'),
        od_bak_delegate: $('#p_od_bak_delegate').val(),
        od_record_by_company_id: p_c_id,
        pay_fee_cu_id: pay_fee_cu_id,
        pay_fee_cu_desc: pay_fee_cu_desc,
        rec_fee_cu_id: rec_fee_cu_id,
        rec_fee_cu_desc: rec_fee_cu_desc, 
        res_ca_year:$('#o_ca_year').val(),
        res_ca_month: $('#o_ca_month').val(),

        res_n_ca_cu_id: $('#n_ca_cu_id').data('cu_id'),
        res_n_ca_title: $.trim($('#n_ca_title').val()),
        res_n_ca_bak: $('#n_ca_bak').val(), 
        data_fee: JSON.stringify({ fee_list: fee_rows })
    };

    /*
        以上必须要有值 
    */

    if (par.od_delegate_cu_id == undefined || par.od_delegate_cu_id == '') {
        $.messager.alert('错误提示','必须填写新委托的委托单位','error');
        return;
    }

    if (par.od_record_by_id == undefined || par.od_record_by_id == '') {
        $.messager.alert('错误提示', '必须填写新委托的录入人', 'error');
        return;
    }

    if (par.od_operation_id == undefined || par.od_operation_id == '') {
        $.messager.alert('错误提示', '必须填写新委托的操作员', 'error');
        return;
    }
    if (par.od_sales_id == undefined || par.od_sales_id == '') {
        $.messager.alert('错误提示', '必须填写新委托的销售', 'error');
        return;
    }
    if (par.od_service_id == undefined || par.od_service_id == '') {
        $.messager.alert('错误提示', '必须填写新委托的客服', 'error');
        return;
    }


    if (par.pay_fee_cu_id == undefined || par.pay_fee_cu_id == '') {
        $.messager.alert('错误提示', '必须填写新委托的应付结算单位', 'error');
        return;
    }
    if (par.rec_fee_cu_id == undefined || par.rec_fee_cu_id == '') {
        $.messager.alert('错误提示', '必须填写新委托的应收结算单位', 'error');
        return;
    }

    if (par.res_n_ca_cu_id == undefined || par.res_n_ca_cu_id == '') {
        $.messager.alert('错误提示', '必须填写原账单的结算单位', 'error');
        return;
    }

    if (par.res_n_ca_title == undefined || par.res_n_ca_title == '') {
        $.messager.alert('错误提示', '必须填写原账单的标题', 'error');
        return;
    }

    //提示 
    $.messager.confirm('生成过账信息提示', '确定要生成过账信息么?', function (r) {
        if (r) {
            post('../Ashx/checkaccount.ashx', par,
            function (data) {
                if (data.result == 1) {

                    $('#res_ca_title').html(res_ca_title);
                    $('#trans_c_desc').html(trans_c_desc);

                    $('#trans_od_no').html(data.trans_od_no);
                    $('#trans_rec_ca_title').html(data.trans_rec_ca_title);
                    $('#trans_pay_ca_title').html(data.trans_pay_ca_title);

                    $('#dlg_of_create_transfer_result').dialog({
                        title: '过账结果',
                        iconCls: 'icon-transmit',
                        autoOpen: false,
                        modal: true,
                        width: 520,
                        minHeight: 220,
                        buttons: [
                        {
                            text: '知道了',
                            iconCls: 'icon-ok',
                            handler: function () {
                                $('#dlg_of_create_transfer_result').dialog('close'); 
                                parent.close_transfer_ca_and_refresh_list();
                            }
                        }]
                    }).dialog('open');
                } else {
                    $.messager.alert('错误','异常:过账操作失败，请截图联系管理员处理','error');
                }
            },true);
        }
    });

    

}

//更改结算单位
function bat_setting_rec_fee_cu_id() {
    var rows = $('#tab_order_fee_rec').datagrid('getRows');
    if (rows.length == 0) return;

    rec_fee_cu_id = $('#p_od_rec_fee_cu_id').data('cu_id');

    rec_fee_cu_desc = $('#p_od_rec_fee_cu_id').combogrid('getText');
     
    $.each(rows, function (i, item) {
        item.fee_cu_id = rec_fee_cu_id;
        item.fee_cu_desc = rec_fee_cu_desc;
        $('#tab_order_fee_rec').datagrid('updateRow', { index: i, row: item }); 
    });
}
function bat_setting_pay_fee_cu_id() {
    var rows = $('#tab_order_fee_pay').datagrid('getRows');
    if (rows.length == 0) return;
    pay_fee_cu_id = $('#p_od_pay_fee_cu_id').data('cu_id');

    pay_fee_cu_desc = $('#p_od_pay_fee_cu_id').combogrid('getText');

    $.each(rows, function (i, item) {
        item.fee_cu_id = pay_fee_cu_id;
        item.fee_cu_desc = pay_fee_cu_desc;
        $('#tab_order_fee_pay').datagrid('updateRow', { index: i, row: item });
    });
}