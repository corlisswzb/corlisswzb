
var cur_edit_fee_rowindex_pay = undefined;
var cur_edit_fee_rowindex_rec = undefined;

var cur_ref_month_exchange_list = undefined;
/*
临时中转变量
主要用途: 用于 datagrid中的combogrid 获取 id值 

*/
var tmp_combogrid_cu_id = undefined;
var tmp_combogrid_cu_desc = undefined;
 
//装在数据
function load_page_fee_info() { 
    $("#tab_od_fee_group").datagrid('loadData', []);

    if (cur_ed_od_seq == undefined ||
        cur_ed_od_seq.length == 0) {

    } else {
        post('../Ashx/order.ashx', {
            rnd: Math.random(),
            action: 'get_order_fee',
            od_seq: cur_ed_od_seq
        }, function (data) {
            var rec_fee_list = [];
            var pay_fee_list = []; 
            var mm_arr = [];
            if ($('#mm_down_rec_fee').length == 1) {
                $('#mm_down_rec_fee').remove();
            }
            $.each(data.rows, function (i, row) {
                if (row.rec_or_pay == 1) {
                    rec_fee_list.push(row);

                    var has = false;
                    $.each(mm_arr, function (i, item) {
                        if (item.cu_id == row.fee_cu_id) {
                            has = true;
                        }
                    });

                    if (!has) {
                        mm_arr.push({
                            cu_id: row.fee_cu_id,
                            cu_desc: row.fee_cu_desc
                        });
                    }

                }
                if (row.rec_or_pay == -1) {
                    pay_fee_list.push(row);
                } 
            });

            if (mm_arr.length > 0) {

                 
                var mm_rec_order_fee_down = '<div id="mm_down_rec_fee" >';

                $.each(mm_arr, function (i, item) {
                    mm_rec_order_fee_down += '<div  onclick=\"javascript:download_rec_order_fee(' + item.cu_id + ');\">' + item.cu_desc + '</div>';
                });
                mm_rec_order_fee_down += '</div>';
                $('body').append(mm_rec_order_fee_down);
                $('#down_rec_menubutton').menubutton({
                    menu: '#mm_down_rec_fee',
                });
            } else {
                $('#down_rec_menubutton').hide();
            }

             

            $("#tab_order_fee_rec").datagrid('loadData', {total: rec_fee_list.length,rows: rec_fee_list});
            $("#tab_order_fee_pay").datagrid('loadData', { total: pay_fee_list.length, rows: pay_fee_list });
        }, true);

        post('../Ashx/exchange_rate.ashx', {
            rnd: Math.random(),
            action: 'get_month_exchange_rate_by_od_seq',
            od_seq: cur_ed_od_seq
        }, function (data) {
            cur_ref_month_exchange_list = data.rows;
            $("#tab_dlg_exchange_month_rate").datagrid('loadData', data);
        }, true);
    } 
}

//重新计算汇总费率
function refresh_fee_group_tab() {
    var rec_rows = $('#tab_order_fee_rec').datagrid('getRows');
    //币种 金额累计 换算汇率 

    var arr = [];
    var rec_total_amount = 0;

    $.each(rec_rows, function (i, row) {
        if (row.fee_currency_desc.length > 0) {
            rec_total_amount += Number(row.fee_amount);
             
            var has = false;
            $.each(arr, function (j, arow) {
                if (arow.cr_id == row.fee_currency_id && arow.rec_or_pay == row.rec_or_pay) {
                    has = true;
                    arow.fee_amount += Number(row.fee_amount); 
                    arow.cr_fee_std_group += Number(row.fee_amount_of_base_currency);  
                    arow.cr_fee_std_group_unfinaced += Number(row.unwoa_total_amount_base_currency); 
                    arow.cr_fee_std_group_finaced += Number(row.woa_total_amount_base_currency);
                    arow.woa_total_amount += Number(row.woa_total_amount);
                    arow.unwoa_total_amount += Number(row.unwoa_total_amount);
                }
            });
            if (!has) {
                arr.push({
                    rec_or_pay: 1,
                    cr_id: row.fee_currency_id,
                    cr_rate: row.fee_currency_rate,
                    cr_desc: row.fee_currency_desc, 
                    fee_amount: Number(row.fee_amount),
                    cr_fee_std_group: Number(row.fee_amount_of_base_currency),
                    cr_fee_std_group_finaced: Number(row.woa_total_amount_base_currency),
                    cr_fee_std_group_unfinaced: Number(row.unwoa_total_amount_base_currency),
                    woa_total_amount: Number(row.woa_total_amount),
                    unwoa_total_amount: Number(row.unwoa_total_amount)
                });
            } 
        }
    });

    var pay_rows = $('#tab_order_fee_pay').datagrid('getRows');
    //币种 金额累计 换算汇率 

     
    var pay_total_amount = 0; 
    $.each(pay_rows, function (i, row) {
        if (row.fee_currency_desc.length > 0) {
            pay_total_amount += Number(row.fee_amount);
             
            var has = false;
            $.each(arr, function (j, arow) {
                if (arow.cr_id == row.fee_currency_id && arow.rec_or_pay == row.rec_or_pay) {
                    has = true;
                    arow.fee_amount += Number(row.fee_amount);
                    arow.cr_fee_std_group += Number(row.fee_amount_of_base_currency);
                    arow.cr_fee_std_group_unfinaced += Number(row.unwoa_total_amount_base_currency);
                    arow.cr_fee_std_group_finaced += Number(row.woa_total_amount_base_currency);
                    arow.woa_total_amount += Number(row.woa_total_amount);
                    arow.unwoa_total_amount += Number(row.unwoa_total_amount);
                }
            });
            if (!has) {
                arr.push({
                    rec_or_pay: -1,
                    cr_id: row.fee_currency_id,
                    cr_rate: row.fee_currency_rate,
                    cr_desc: row.fee_currency_desc,
                    fee_amount: Number(row.fee_amount),
                    cr_fee_std_group: Number(row.fee_amount_of_base_currency),
                    cr_fee_std_group_finaced: Number(row.woa_total_amount_base_currency),
                    cr_fee_std_group_unfinaced: Number(row.unwoa_total_amount_base_currency),
                    woa_total_amount: Number(row.woa_total_amount),
                    unwoa_total_amount: Number(row.unwoa_total_amount)
                });
            }
             
        }
    });
     
    $("#tab_od_fee_group").datagrid('loadData', { total: arr.length, rows: arr });


}

//显示页面
function show_page_fee_info() {
    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先保存订单。', 'error');
        return;
    }
    $('.dv_edit_order_menu_tab').removeClass('dv_edit_order_menu_tab_focus');
    $('.dv_edit_order_menu_tab').eq(3).addClass('dv_edit_order_menu_tab_focus');
    var $old_page = $cur_page;
    $cur_page = $('div.page_order_fee_info');
    $old_page.fadeOut(50, function () {
        $cur_page.fadeIn(50, function () {
            $cur_page.layout({ fit: true });
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
            
            if (cur_od_servcie_change_flag == 1) {
                load_page_fee_info();
                cur_od_servcie_change_flag = 0;
            } 
        });
    });
}
 
//下载对账单
function download_rec_order_fee(cu_id) { 
    var myparams = {
        action: 'get_rec_check_account_of_single_order',
        od_seq: cur_ed_od_seq,
        cu_id: cu_id
    } 
    window.open('../Ashx/order.ashx?' + parseParams(myparams));
}

//添加费用
function pay_insert_order_fee_details() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法进行编辑操作', 'error');
        return;
    }

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_pay != undefined) {
        $("#tab_order_fee_pay").datagrid("endEdit", cur_edit_fee_rowindex_pay);
        cur_edit_fee_rowindex_pay = undefined;
    }

    var old_rows = $("#tab_order_fee_pay").datagrid('getRows');



    old_rows.push({
        ck_: false,
        od_seq: cur_ed_od_seq,
        od_service_seq: '',
        od_service_sub_seq: '',
        fee_seq: guid(),
        rec_or_pay: -1,
        fee_cu_id: undefined,
        fee_cu_desc: '',
        fee_item_typ: '',
        fee_price: 0,
        fee_number: 0,
        fee_unit: '',
        fee_currency_rate: 1,// 汇率
        fee_currency_id: 4,
        fee_bak: '',
        fee_record_id: '',
        fee_record_dat: '',
        fee_business_lock_id: '',
        fee_business_lock_dat: '',
        fee_invoice_lock_id: '',
        fee_invoice_lock_dat: '',
        fee_status: 1,
        fee_amount: '',
        woa_total_amount:'0',
        fee_dat: '',
        fee_limit_days: '',
        fee_invoice_typ: '',
        fee_record_invoice_id: '',
        fee_record_invoice_dat: '',
        fee_update_id: '',
        fee_update_dat: '',
        fee_record_nam: '',
        fee_business_lock_nam: '',
        fee_invoice_lock_nam: '',
        fee_record_invoice_nam: '',
        fee_item_typ_desc: '',
        fee_unit_desc: '',
        fee_currency_desc: '人民币',
        fee_status_desc: '未归账'
    });
    //重新绑定数据 
    $("#tab_order_fee_pay").datagrid('loadData', { total: old_rows.length, rows: old_rows });
}
function rec_insert_order_fee_details() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法进行编辑操作', 'error');
        return;
    }

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_rec != undefined) {
        $("#tab_order_fee_rec").datagrid("endEdit", cur_edit_fee_rowindex_rec);
        cur_edit_fee_rowindex_rec = undefined;
    }

    var old_rows = $("#tab_order_fee_rec").datagrid('getRows');


    //这里币种 不一定是 4 
    var t_currency_id = 4;
    var t_currency_symbol = '';

    $.each(basesetting.currency_list, function (ci, crow) {
        if (crow.cr_name == '人民币') {
            t_currency_id = crow.cr_id;
            t_currency_symbol = crow.cr_symbol;
        }
    });
    
    old_rows.push({
        ck_: false,
        od_seq: cur_ed_od_seq,
        od_service_seq: '',
        od_service_sub_seq: '',
        fee_seq: guid(),
        rec_or_pay: 1,
        fee_cu_id: cur_order_collections.order_base_info_and_cargo_info[0].od_delegate_cu_id,
        fee_cu_desc: cur_order_collections.order_base_info_and_cargo_info[0].od_delegate_cu_desc,
        fee_item_typ: '',
        fee_price: 0,
        fee_number: 0,
        fee_unit: '',
        fee_currency_rate: 1,// 汇率 
        fee_currency_id: t_currency_id,
        fee_currency_symbol: t_currency_symbol,
        fee_bak: '',
        fee_record_id: '',
        fee_record_dat: '',
        fee_business_lock_id: '',
        fee_business_lock_dat: '',
        fee_invoice_lock_id: '',
        fee_invoice_lock_dat: '',
        fee_status: 1,
        fee_amount: '0',
        woa_total_amount: '0',
        fee_dat: '',
        fee_limit_days: '',
        fee_invoice_typ: '',
        fee_record_invoice_id: '',
        fee_record_invoice_dat: '',
        fee_update_id: '',
        fee_update_dat: '',
        fee_record_nam: '',
        fee_business_lock_nam: '',
        fee_invoice_lock_nam: '',
        fee_record_invoice_nam: '',
        fee_item_typ_desc: '',
        fee_unit_desc: '', 
        fee_currency_desc: '人民币',
        fee_status_desc: '新增'
    });
    //重新绑定数据 
    $("#tab_order_fee_rec").datagrid('loadData', { total: old_rows.length, rows: old_rows });
}
//拷贝添加费用
function pay_copy_order_fee_details() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法进行编辑操作', 'error');
        return;
    }

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_pay != undefined) {
        $("#tab_order_fee_pay").datagrid("endEdit", cur_edit_fee_rowindex_pay);
        cur_edit_fee_rowindex_pay = undefined;
    }

    var rows = $("#tab_order_fee_pay").datagrid('getSelections');

    if (rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要拷贝的行', 'error');
        return;
    }

    //深度拷贝
    var all_rows = $("#tab_order_fee_pay").datagrid('getRows');

    $.each(rows, function (i, row) {
        var new_row = $.extend(true, {}, row);

        new_row.fee_seq = guid();

        all_rows.push(new_row);
    });
    $("#tab_order_fee_pay").datagrid('loadData', { total: all_rows.length, rows: all_rows });
}
function rec_copy_order_fee_details() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法进行编辑操作', 'error');
        return;
    }

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_rec != undefined) {
        $("#tab_order_fee_rec").datagrid("endEdit", cur_edit_fee_rowindex_rec);
        cur_edit_fee_rowindex_rec = undefined;
    }

    var rows = $("#tab_order_fee_rec").datagrid('getSelections');

    if (rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要拷贝的行', 'error');
        return;
    }

    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];

    //深度拷贝
    var all_rows = $("#tab_order_fee_rec").datagrid('getRows');

    $.each(rows, function (i, row) {
        var new_row = $.extend(true, {}, row); 
        new_row.fee_seq = guid();
        new_row.fee_cu_id = cur_order.od_delegate_cu_id;
        new_row.fee_cu_desc = cur_order.od_delegate_cu_desc;

        new_row.woa_total_amount = 0;
        new_row.fee_limit_dat = '';
        new_row.fee_record_nam = '';
        new_row.fee_bak = '';
        new_row.od_invoice_no = '';
        new_row.fee_record_dat = '';
        new_row.fee_checkaccount_lock_nam = '';
        new_row.fee_checkaccount_lock_dat = '';
        new_row.fee_invoice_lock_dat = '';
        new_row.ca_title = '';
        new_row.ca_amc_finish_dat = '';
        new_row.fee_finace_lock_dat = '';
        new_row.fee_limit_dat = '';
        new_row.fee_status_desc = '新增';
        new_row.fee_status = 1;

        all_rows.push(new_row);
    });
    $("#tab_order_fee_rec").datagrid('loadData', { total: all_rows.length, rows: all_rows });
}
//删除添加费用
function pay_delete_order_fee_details() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法进行编辑操作', 'error');
        return;
    }

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_pay != undefined) {
        $("#tab_order_fee_pay").datagrid("endEdit", cur_edit_fee_rowindex_pay);
        cur_edit_fee_rowindex_pay = undefined;
    }

    var del_rows = $("#tab_order_fee_pay").datagrid('getSelections');

    if (del_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要删除的行', 'error');
        return;
    }

    var fee_seq = '';
    $.each(del_rows, function (j, drow) {
        if (fee_seq.length == 0) {
            fee_seq = drow.fee_seq;
        } else {
            fee_seq += ',' + drow.fee_seq;
        }
    });
    //这里要判断是否可以删除
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'judge_delete_order_fee',
        od_seq: cur_ed_od_seq,
        fee_seq: fee_seq
    }, function (data) {
        if (data.result == 1) {
            var new_arr = [];
            var all_rows = $("#tab_order_fee_pay").datagrid('getRows');

            $.each(all_rows, function (i, arow) {
                var has = false;
                $.each(del_rows, function (j, drow) {
                    if (drow.fee_seq == arow.fee_seq) {
                        has = true;
                    }
                });

                if (!has) {
                    new_arr.push(arow);
                }
            });
            $("#tab_order_fee_pay").datagrid('loadData', { total: new_arr.length, rows: new_arr });
        } else {
            $.messager.alert('错误提示', data.msg, 'error');
        }
    }, true);

}
function rec_delete_order_fee_details() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法进行编辑操作', 'error');
        return;
    }

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_rec != undefined) {
        $("#tab_order_fee_rec").datagrid("endEdit", cur_edit_fee_rowindex_rec);
        cur_edit_fee_rowindex_rec = undefined;
    }

    var del_rows = $("#tab_order_fee_rec").datagrid('getSelections');

    if (del_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要删除的行', 'error');
        return;
    }

    var fee_seq = '';
    $.each(del_rows, function (j, drow) {
        if (fee_seq.length == 0) {
            fee_seq = drow.fee_seq;
        } else {
            fee_seq += ',' + drow.fee_seq;
        }
    });
    $.messager.confirm('删除提示', '确认要删除选中的' + del_rows.length + '行数据',
    function (r) {
        if (r) {
            //这里要判断是否可以删除
            post('../Ashx/order.ashx', {
                rnd: Math.random(),
                action: 'judge_delete_order_fee',
                od_seq: cur_ed_od_seq,
                fee_seq: fee_seq
            }, function (data) {
                if (data.result == 1) {
                    var new_arr = [];
                    var all_rows = $("#tab_order_fee_rec").datagrid('getRows');

                    $.each(all_rows, function (i, arow) {
                        var has = false;
                        $.each(del_rows, function (j, drow) {
                            if (drow.fee_seq == arow.fee_seq) {
                                has = true;
                            }
                        });

                        if (!has) {
                            new_arr.push(arow);
                        }
                    });
                    $("#tab_order_fee_rec").datagrid('loadData', { total: new_arr.length, rows: new_arr });
                } else {
                    $.messager.alert('错误提示', data.msg, 'error');
                }
            }, true);
        }
    });

}

//从付到收款 拷贝
function copy_to_rec_order_fee_details() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法进行编辑操作', 'error');
        return;
    }

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_pay != undefined) {
        $("#tab_order_fee_pay").datagrid("endEdit", cur_edit_fee_rowindex_pay);
        cur_edit_fee_rowindex_pay = undefined;
    }

    var rows = $("#tab_order_fee_pay").datagrid('getSelections');

    if (rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要拷贝的行', 'error');
        return;
    }
    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];
    //深度拷贝
    var all_rows = $("#tab_order_fee_rec").datagrid('getRows');

    $.each(rows, function (i, row) {
        var new_row = $.extend(true, {}, row); 
        new_row.fee_seq = guid();
        new_row.fee_cu_id = cur_order.od_delegate_cu_id;
        new_row.fee_cu_desc = cur_order.od_delegate_cu_desc;
        new_row.rec_or_pay = 1;
        new_row.fee_status = 1;
        new_row.fee_status_desc = '新增';
     
        new_row.od_service_seq = '';
        new_row.od_service_sub_seq = '';

        new_row.woa_total_amount = 0;
        new_row.fee_limit_dat = '';
        new_row.fee_record_nam='';
        new_row.fee_bak='';
        new_row.od_invoice_no='';
        new_row.fee_record_dat='';
        new_row.fee_checkaccount_lock_nam='';
        new_row.fee_checkaccount_lock_dat= '';
        new_row.fee_invoice_lock_dat= '';
        new_row.ca_title= '';
        new_row.ca_amc_finish_dat='';
        new_row.fee_finace_lock_dat= '';
        new_row.fee_limit_dat='';

        all_rows.push(new_row);
    });
    $("#tab_order_fee_rec").datagrid('loadData', { total: all_rows.length, rows: all_rows });
}

//保存费用信息
function save_order_fee() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法进行编辑操作', 'error');
        return;
    }

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }
    //需要判断
    var msg = '';
    if (!validate_fee_data(msg)) { 
        return;
    } 

    var rec_rows = $('#tab_order_fee_rec').datagrid('getRows');
      
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'update_order_fee_of_rec',
        od_seq: cur_ed_od_seq,
        data_fee: JSON.stringify({ fee_list: rec_rows }),
        od_profit_and_loss_bak: $('#ed_od_profit_and_loss_bak').val()
    }, function (data) {
        if (data.result == 1) {
            load_page_fee_info();
            $.messager.alert('提示',data.msg,'info');
        } else {
            $.messager.alert('错误提示', data.msg, 'error');
        }
    },true);
}

//保存前需要对 费用列表进行检测，必须是符合要求的数据才能录入  
function validate_fee_data(msg) {
    var rows = $("#tab_order_fee_rec").datagrid('getRows');

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
        if (!isRight_custom) msg += (msg.length > 0 ?'/':'') + "结算单位不是预设值";
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
        $.messager.alert('错误提示', '错误: 应收列表中第' + errow_index + '行:' + msg + '!', 'error');
        return false;
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
                editor: {
                    type: 'combogrid',
                    options: {
                        panelWidth: 500,
                        idField: '',
                        textField: 'cu_name',
                        url: '../Ashx/sys_base.ashx',
                        queryParams: {
                            rnd: Math.random(),
                            action: 'get_custom_by_like_str_for_combogrid',
                            like_str: guid()
                        },
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
                        keyHandler: {
                            up: function () {               //【向上键】押下处理  
                                var display = $(this).combogrid('panel').parent().css('display');
                                if (display != 'none') {
                                    //取得选中行  
                                    var selected = $(this).combogrid('grid').datagrid('getSelected');
                                    if (selected) {
                                        //取得选中行的rowIndex  
                                        var index = $(this).combogrid('grid').datagrid('getRowIndex', selected);
                                        //向上移动到第一行为止  
                                        if (index > 0) {
                                            $(this).combogrid('grid').datagrid('selectRow', index - 1);
                                        }
                                    } else {
                                        var rows = $(this).combogrid('grid').datagrid('getRows');
                                        $(this).combogrid('grid').datagrid('selectRow', rows.length - 1);
                                    }
                                }
                            },
                            down: function () {             //【向下键】押下处理  
                                var display = $(this).combogrid('panel').parent().css('display');
                                if (display != 'none') {
                                    //取得选中行  
                                    var selected = $(this).combogrid('grid').datagrid('getSelected');
                                    if (selected) {
                                        //取得选中行的rowIndex  
                                        var index = $(this).combogrid('grid').datagrid('getRowIndex', selected);
                                        //向下移动到当页最后一行为止  
                                        if (index < $(this).combogrid('grid').datagrid('getData').rows.length - 1) {
                                            $(this).combogrid('grid').datagrid('selectRow', index + 1);
                                        }
                                    } else {
                                        $(this).combogrid('grid').datagrid('selectRow', 0);
                                    }
                                }
                            },
                            enter: function () {             //【回车键】押下处理  
                                //设置【性别】文本框的内容为选中行的的性别字段内容  
                                var display = $(this).combogrid('panel').parent().css('display');
                                if (display != 'none') {


                                    //选中后让下拉表格消失  
                                    $(this).combogrid('hidePanel');
                                }
                            },
                            query: function (keyword) {     //【动态搜索】处理  
                                //设置查询参数  
                                var queryParams = $(this).combogrid("grid").datagrid('options').queryParams;
                                queryParams.like_str = keyword;
                                queryParams.rnd = Math.random();
                                queryParams.action = 'get_custom_by_like_str_for_combogrid';
                                $(this).combogrid("grid").datagrid('options').queryParams = queryParams;
                                $(this).combogrid("grid").datagrid("clearSelections");
                                $(this).combogrid("grid").datagrid("reload");
                                //重新加载  
                                $(this).combogrid("setText", keyword);
                                tmp_combogrid_cu_id = undefined;
                                tmp_combogrid_cu_desc = keyword;

                            },
                        },
                        onSelect: function (index, item) {              //选中处理   
                            tmp_combogrid_cu_id = item.cu_id;
                            tmp_combogrid_cu_desc = item.cu_name;
                            var ed = $('#tab_order_fee_rec').datagrid('getEditor',
                                {
                                    index: cur_edit_fee_rowindex_rec,
                                    field: 'fee_cu_desc'
                                });
                            $(ed.target).combogrid('setText', item.cu_name);
                            event.stopPropagation();
                        }
                    }
                }
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
                field: 'woa_total_amount', title: '已收', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_rel_bill_no', title: '关联提空号', width: 170, sortable: true,
                editor: {
                    type: 'combobox',
                    options: {

                        textField: 'label',
                        panelWidth: 170, 
                        data: [],
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_rel_opr_cod', title: '关联箱属', width: 70, sortable: true,
                editor: {
                    type: 'combobox',
                    options: {

                        textField: 'label',
                        panelWidth: 170,
                        data: [],
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_bak', title: '备注', width: 260, sortable: true,
                editor: {
                    type: 'text', 
                },
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
            


            //, {
            //    field: 'fee_invoice_lock_nam', title: '开票人', width: 60, sortable: true,
            //}
            , {
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , { field: 'ca_title', title: '所属账单', width: 148, sortable: true, }
            , {
                field: 'ca_amc_finish_dat', title: '通审时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            //, {
            //    field: 'fee_finace_lock_nam', title: '销账', width: 60, sortable: true,
            //}

            
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
        ]],
        onAfterEdit: function (index, row, changes) {
            cur_edit_fee_rowindex_rec = undefined;
            //需要进行数据替换  
            //简单的说就是 要进行替换  
            //客户名称
            var has = false;
            row.fee_cu_desc = tmp_combogrid_cu_desc;
            row.fee_cu_id = tmp_combogrid_cu_id;
            tmp_combogrid_cu_id = undefined;
            tmp_combogrid_cu_desc = undefined;

            
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
            has = false;
            //汇率 
            $.each(cur_ref_month_exchange_list, function (i, item) {
                if (item.er_cr_id == row.fee_currency_id) {
                    has = true;
                    row.fee_currency_rate = item.er_cr_rate;
                }
            });
            if (!has) row.fee_currency_rate = 1;

            row.fee_amount = (row.fee_price * row.fee_number * row.fee_currency_rate).toFixed(2);

            $("#tab_order_fee_rec").datagrid('updateRow', {
                index: index,
                row: row
            });

            //每次保存完毕，都要对 汇总表进行更新 

            //重新计算 汇总 

            refresh_fee_group_tab();



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
                    tmp_combogrid_cu_id = row.fee_cu_id;
                    tmp_combogrid_cu_desc = row.fee_cu_desc;
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
                    var fee_rel_bill_no = $('#tab_order_fee_rec').datagrid('getEditor', { index: index, field: 'fee_rel_bill_no' }).target;

                    var fee_rel_opr_cod = $('#tab_order_fee_rec').datagrid('getEditor', { index: index, field: 'fee_rel_opr_cod' }).target;
                     
                    fee_rel_opr_cod.css({ 'width': '61px' })
                    fee_rel_opr_cod.combobox({
                        data: cur_opr_cod,
                        valueField: 'value',
                        textField: 'label',
                        panelWidth: 260,
                        panelHeight: 'auto',
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    });
                    
                    fee_rel_bill_no.css({ 'width': '161px' })
                    fee_rel_bill_no.combobox({
                        data: cur_pick_empty_no,
                        valueField: 'value',
                        textField: 'label',
                        panelWidth: 260,
                        panelHeight:'auto',
                        onSelect: function () {

                            var pen = fee_rel_bill_no.combobox('getText');

                            $.each(cur_pick_empty_no, function (i, item) {
                                if (item.label == pen) {
                                    fee_rel_opr_cod.combobox('setValue', item.opr_cod);
                                    fee_rel_opr_cod.combobox('setText', item.opr_cod);
                                }
                            });

                            event.stopPropagation();
                        }
                    });

                    fee_rel_opr_cod.combobox('setValue', row.fee_rel_opr_cod);
                    fee_rel_bill_no.combobox('setValue', row.fee_rel_bill_no);
                    fee_rel_opr_cod.combobox('setText', row.fee_rel_opr_cod);
                    fee_rel_bill_no.combobox('setText', row.fee_rel_bill_no);
                }
            }
            refresh_rec_fee_of_footer();
        },
        onLoadSuccess: function (data) {

            //汇总信息 数量，小计，已收 

            if (data != undefined && (data.length || data.rows.length) > 0) {
                refresh_fee_group_tab();
            }

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

//初始化表格 应付表格
function init_tab_order_fee_pay() {
    $("#tab_order_fee_pay").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
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
                field: 'fee_cu_id', title: '结算单位', width: 210, sortable: true,
                formatter: function (value, row, index) {
                    return row.fee_cu_desc;
                }, 
            }
            , {
                field: 'fee_invoice_typ', title: '票率', sortable: true, width: 60,
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
                } 
            }
            , {
                field: 'fee_currency_rate', title: '汇率', sortable: true, width: 54,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', sortable: true, width: 165,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'woa_total_amount', title: '已付', sortable: true, width: 165,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_rel_bill_no', title: '关联提空号', width: 170, sortable: true,
            }
            , {
                field: 'fee_rel_opr_cod', title: '关联箱属', width: 70, sortable: true,
            }
            , {
                field: 'fee_bak', title: '备注', width: 260, sortable: true,
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
             , {
                 field: 'fee_limit_dat', title: '付款账期', width: 80, sortable: true,
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
        ]],
        onLoadSuccess: function (data) {
            if (data != undefined && (data.length || data.rows.length) > 0) {
                refresh_fee_group_tab();
            }
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



            $('#tab_order_fee_pay').datagrid('reloadFooter', [{
                fee_number: data_group.fee_number.toFixed(2),
                fee_amount: data_group.fee_amount,
                woa_total_amount: data_group.woa_total_amount
            }]);
            refresh_pay_fee_of_footer();

        },
        onClickRow: function (rowIndex, field, value) {
             
            refresh_pay_fee_of_footer();
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

//初始化费率汇总表
function init_tab_od_fee_group() {
    $("#tab_od_fee_group").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        // toolbar: '#tab_od_fee_group_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
         
        // frozenColumns: [[{ title: '', field: '_ck', width: 40, checkbox: true }, ]],
        columns: [

            [//显示的列
            {
                field: 'rec_or_pay', title: '收/付', width: 36,
                formatter: function (value, row, index) {
                    if (Number(value) == 1) return '应收';
                    if (Number(value) == -1) return '应付';
                    if (Number(value) == 2) return '盈利';
                },
                styler: function (value, row, index) { 
                    if (Number(value) == 1) return 'background-color:Red;color:#FFF;';
                    if (Number(value) == -1) return 'background-color:Green;color:#FFF;';

                    if (Number(value) == 2) return 'background-color:#ab19e1;color:#FFF;';
                }
            }
            , {
                field: 'cr_desc', title: '币种', width: 50,
            }
             , {
                 field: 'fee_amount', title: '小计', sortable: true, width: 60,
                 formatter: function (value, row, index) {
                     if (row.cr_id == undefined) return ''
                     else return Number(value).toFixed(2);
                 }
             } 
            , {
                field: 'woa_total_amount', title: '已销', width: 60,
                formatter: function (value, row, index) {
                    if (row.rec_or_pay == 3) return value;
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'unwoa_total_amount', title: '未销', width: 60,
                formatter: function (value, row, index) {
                    if (row.rec_or_pay == 3) return value;
                    return Number(value).toFixed(2);
                }
            }
            , {
                 field: 'cr_rate', title: '汇率', sortable: true, width: 50,
                 formatter: function (value, row, index) {
                     if (row.cr_id == undefined) return ''
                     else return Number(value).toFixed(4);
                 }
             }
            , {
                field: 'cr_fee_std_group', title: '本币小计', width: 60,
                formatter: function (value, row, index) {
                    if (row.rec_or_pay == 3) return '合计';
                    return Number(value).toFixed(2);
                }
            }
        ]],
        onLoadSuccess: function (data) {
            var rec_total = 0;
            var pay_total = 0;
            var finaced_rec_total = 0;
            var finaced_pay_total = 0;
            var unfinaced_rec_total = 0;
            var unfinaced_pay_total = 0;

            $.each(data.rows, function (i, item) {
                if (item.rec_or_pay == 1) {
                    rec_total += item.cr_fee_std_group;
                    finaced_rec_total += item.cr_fee_std_group_finaced;
                    unfinaced_rec_total += item.cr_fee_std_group_unfinaced;
                }
                if (item.rec_or_pay == -1) {
                    pay_total += item.cr_fee_std_group;
                    finaced_pay_total += item.cr_fee_std_group_finaced;
                    unfinaced_pay_total += item.cr_fee_std_group_unfinaced;
                }
            });



            $('#tab_od_fee_group').datagrid('reloadFooter', [
                {
                    rec_or_pay: 3,
                    cr_desc: '汇总',
                    cr_fee_std_group: '合计',
                    woa_total_amount: '总已销',
                    unwoa_total_amount: '总未销'
                },
                {
                    rec_or_pay: 1,
                    cr_desc: '本币:', 
                    cr_fee_std_group: rec_total.toFixed(2),
                    woa_total_amount: finaced_rec_total,
                    unwoa_total_amount: unfinaced_rec_total
                },
                {
                    rec_or_pay: -1,
                    cr_desc: '本币:',
                    cr_fee_std_group: pay_total.toFixed(2),
                    woa_total_amount: finaced_pay_total,
                    unwoa_total_amount: unfinaced_pay_total
                },
                {
                    rec_or_pay: 2,
                    cr_desc: '本币:',
                    cr_fee_std_group: (rec_total - pay_total).toFixed(2),
                    woa_total_amount: finaced_rec_total - finaced_pay_total,
                    unwoa_total_amount: unfinaced_rec_total - unfinaced_pay_total
                },
            ]);
        },
    });
}

//表格初始化
function init_tab_dlg_exchange_month_rate() {

    $("#tab_dlg_exchange_month_rate").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        //toolbar: '#tab_exchange_month_rate_bar',
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            {
                field: 'er_year', width: 100, title: '年-月', align: 'left',
                formatter: function (value, row, index) {
                    return row.er_year + '年-' + (Number(row.er_month) < 10 ? ('0' + row.er_month) : row.er_month) + '月';
                }
            },
            { field: 'er_cr_name', width: 70, title: '币种', align: 'left' },

            { field: 'er_cr_rate', width: 90, title: '汇率', align: 'left', },
            { field: 'er_record_by_nam', width: 100, title: '记录人', align: 'left', },
            {
                field: 'er_record_dat', width: 100, title: '记录时间', align: 'left',
                formatter: function (value, row, index) {
                    if (value == undefined) {
                        return '';
                    } else {
                        return dateformat(value, true);
                    }

                }
            },
        ]],

    });
}
//查看费率
function view_ref_month_exchange_rate() {


    $('#dlg_od_ref_month_exchange_rate').dialog({
        title: '查看费率',
        iconCls: 'icon-2012092109942',
        autoOpen: false,
        modal: true,
        width: 466,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_ref_month_exchange_rate').dialog('close');
                }
            }]
    }).dialog('open');


}
