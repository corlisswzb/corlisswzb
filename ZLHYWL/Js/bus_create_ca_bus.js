 
function init_page_of_ca_create_or_choise() {
    
    init_dlg_tab_choise_ca_main_list();

    init_dlg_tab_ca_files();

    init_dlg_tab_user_list(basesetting.employe_list);
}

//归账时 新建账单
function insert_ca_main_2() {
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
        //var item_fee_dat = eval('new Date(' + item.fee_dat.replace(/\d+(?=-[^-]+$)/, function (a) {
        //    //console(a);
        //    return parseInt(a, 10);
        //}).match(/\d+/g) + ')');
        var item_fee_dat = new Date( item.fee_dat );

        var has = false;
        $.each(select_year_month, function (y, yrow) {
            if (yrow.year == item_fee_dat.getFullYear() && yrow.month == item_fee_dat.getMonth() + 1) {
                yrow.count += 1;
                has = true;
            }
        });
        if (!has) {
            select_year_month.push({
                year: item_fee_dat.getFullYear(),
                month: item_fee_dat.getMonth()+1,
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
    $('#dlg_choise_ca_main').dialog('close');
    $('#dlg_ed_ca_seq').val('');
    $('#dlg_ed_ca_cu_id').combogrid('enable');

    var ca_cu_id = $('#dlg_ca_cu_id').val();
    var ca_cu_desc = $('#dlg_ca_cu_desc').html();
    $('#dlg_ed_ca_year').combobox('setValue', max_year_month_count.year);
    $('#dlg_ed_ca_month').combobox('setValue', max_year_month_count.month);

    //当前参数中是否有 结算单位  
    $('#dlg_ed_ca_cu_id').data('cu_id', ca_cu_id);
    $('#dlg_ed_ca_cu_id').combogrid('setText', ca_cu_desc);
    
    $('#dlg_ed_ca_title').val(ca_cu_desc + max_year_month_count.year + '年' + max_year_month_count.month + '月应' + (cur_rec_or_pay==1?'收':'付') + '账单');

    $('#dlg_ed_ca_group_flag').prop('checked', false);
    $('#dlg_ed_ca_bak').val(bak_currency_typ + '\r' + bak_fee_item + '\r' + bak_invoice_typ + '\r' + bak_unit);
    $('#dlg_ed_ca_relation_user_desc').val('');
    $('#dlg_tab_ca_files').datagrid('loadData', []);
    $('#dlg_ed_ca_assign_flag').prop('checked', false);
    $('#dlg_ed_ca_limit_dat').datebox('setValue', '');

    $('.dlg_tr_group_flag').hide();
    $('.dlg_tr_relation_user_desc').hide();

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
            }, {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {

                    var par = {
                        rnd: Math.random(),
                        action: 'insert_main_list',
                        ca_seq: $('#dlg_ed_ca_seq').val(),
                        ca_cu_id: $('#dlg_ed_ca_cu_id').data('cu_id'),
                        ca_title: $.trim($('#dlg_ed_ca_title').val()),
                        ca_group_flag: $('#dlg_ed_ca_group_flag').is(':checked') ? 1 : 0,
                        ca_rec_or_pay: cur_rec_or_pay,
                        ca_year: $('#dlg_ed_ca_year').combobox('getValue'),
                        ca_month: $('#dlg_ed_ca_month').combobox('getValue'),
                        ca_bak: $('#dlg_ed_ca_bak').val(),
                        ca_limit_dat: $('#dlg_ed_ca_limit_dat').datebox('getValue'),
                        ca_assign_flag: $('#dlg_ed_ca_assign_flag').is(':checked') ? 1 : 0,
                        u_ids: $('#dlg_ed_ca_bind_relation_u_ids').val(),
                        data_attachment: JSON.stringify({ attachment_list: $('#dlg_tab_ca_files').datagrid('getRows') })
                    };


                    if (isNaN(par.ca_month)) {
                        $.messager.alert('错误', '必须选择月份', 'error');
                        return;
                    }
                    if (isNaN(par.ca_year)) {
                        $.messager.alert('错误', '必须选择年份', 'error');
                        return;
                    }
                    //非邀约，默认标题是  公司名+年+月
                    if (par.ca_group_flag == 0) {
                        if (par.ca_title.length == 0) {
                            par.ca_title = $('#dlg_ed_ca_cu_id').combogrid('getText') +
                                par.ca_year + '年' + par.ca_month + '月应' + (cur_rec_or_pay == 1 ? '收' : '付') + '对账单';
                        }
                    } else {
                        //邀约对账单，必须填写标题
                        if (par.ca_title.length == 0) {
                            $.messager.alert('错误', '邀约对账单必须填写标题', 'error');
                            return;
                        }
                    }
                    if (par.ca_seq.length == 0) {
                        par.action = 'insert_main_list';
                    } else {
                        par.action = 'update_main_list_for_bus';
                    }

                    if (isNaN(par.ca_cu_id)) {
                        $.messager.alert('错误', '必须选择结算单位', 'error');
                        return;
                    } else {
                        if (par.ca_cu_id != ca_cu_id) {
                            $.messager.alert('错误', '新建账单结算单位和选择费用结算单位不一致，无法进行费用归账!', 'error');
                            return;
                        }
                    }
                    post('../Ashx/checkaccount.ashx', par,
                    function (data) {
                        if (data.result == 1) {

                            $('#dlg_new_ca_main').dialog('close');
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
                            var _now_ca_seq = data.ca_seq;
                            $.messager.confirm('提示', '账单新建完成，是否将选中费用(共计:' + temp_total_money.toFixed(2) + ')归账？',
                            function (r) {
                                if (!r) {
                                    $('#dlg_new_ca_main').dialog('close');
                                } else {

                                    post('../Ashx/checkaccount.ashx', {
                                        rnd: Math.random(),
                                        action: 'insert_fee_details',
                                        fee_seqs: fee_seqs,
                                        ca_seq: _now_ca_seq
                                    }, function (data2) {
                                        if (data2.result == 1) {
                                            $.messager.alert('提示', data2.msg, 'info');
                                            load_order_fee();
                                        } else {
                                            $.messager.alert('错误', data2.msg, 'error');
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

    //$.each(selected_rows, function (i, item) {
    //    if (item.rec_or_pay == 1 && item.od_status_id != 3) {
    //        isRight = false;
    //        return;
    //    }
    //});
    //if (!isRight) {
    //    $.messager.alert('错误', '应收账单归账,费用必须满足费用所属账单已审核通过，不符合归账条件', 'error');
    //    return;
    //}
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
        var item_fee_dat =  new Date( item.fee_dat );
        //var item_fee_dat = eval('new Date(' + item.fee_dat.replace(/\d+(?=-[^-]+$)/, function (a) {
        //    //console(a);
        //    return parseInt(a, 10);
        //}).match(/\d+/g) + ')');

        var has = false;
        $.each(select_year_month, function (y, yrow) {
            if (yrow.year == item_fee_dat.getFullYear() && yrow.month == item_fee_dat.getMonth() + 1) {
                yrow.count += 1;
                has = true;
            }
        });

        if (!has) {
            select_year_month.push({
                year: item_fee_dat.getFullYear(),
                month: item_fee_dat.getMonth() + 1,
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

    //var now_time = basesetting.sys_time;
    //var date = eval('new Date(' + now_time.replace(/\d+(?=-[^-]+$)/, function (a) {
    //    //console(a);
    //    return parseInt(a, 10);
    //}).match(/\d+/g) + ')');
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
            , {
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {

                    var ca_rows = $('#dlg_tab_choise_ca_main_list').datagrid('getChecked');

                    if (ca_rows.length == 0) {
                        $.messager.alert('错误', '错误: 请选择账单', 'error');
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
                            load_order_fee();
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

//编辑
function update_ca_main() {
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

    if (rows[0].ca_status == 3) {
        $.messager.alert('错误', '错误:账单"' + rows[0].ca_title + '"已核销，无法修改!', 'error');
        return;
    }
     
    edit_ca_main(rows[0]);
}
function edit_ca_main(ca_item) {
    init_dlg_tab_choise_ca_main_list();

    init_dlg_tab_ca_files();

    init_dlg_tab_user_list(basesetting.employe_list);
    var ca_seq = ca_item.ca_seq;
    $('#dlg_ed_ca_title').val(ca_item.ca_title);
    $('#dlg_ed_ca_group_flag').prop('checked', ca_item.ca_group_flag > 0);
    $('#dlg_ed_ca_bak').val(ca_item.ca_bak);
    $('#dlg_ed_ca_year').combobox('setValue', ca_item.ca_year);
    $('#dlg_ed_ca_month').combobox('setValue', ca_item.ca_month);
    $('#dlg_ed_ca_seq').val(ca_seq);
    $('#dlg_ed_ca_cu_id').combogrid('disable');
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_checkaccount_by_ca_seq',
        ca_seq: ca_seq
    }, function (data) {
        var ca_main_base = data.ca_main_base[0];
        var attachment_list = data.attachment_list;
        var relation_user_list = data.relation_user_list;

        $('#dlg_ed_ca_cu_id').data('cu_id', ca_main_base.ca_cu_id);
        $('#dlg_ed_ca_cu_id').combogrid('setText', ca_main_base.ca_cu_desc);

        $('#dlg_ed_ca_title').val(ca_main_base.ca_title);
        $('#dlg_ed_ca_group_flag').prop('checked', ca_main_base.ca_group_flag == 1 ? true : false);
        $('#dlg_ed_ca_bak').val(ca_main_base.ca_bak);
        $('#dlg_ed_ca_relation_user_desc').val(ca_main_base.ca_relation_user_desc);
        $('#dlg_tab_ca_files').datagrid('loadData', attachment_list);
        $('#dlg_ed_ca_assign_flag').prop('checked', ca_main_base.ca_assign_flag == 1 ? true : false);
        $('#dlg_ed_ca_limit_dat').datebox('setValue', dateformat(ca_main_base.ca_limit_dat, true));

        if (ca_main_base.ca_group_flag == 0) {
            $('.dlg_tr_group_flag').hide();
            $('.dlg_tr_relation_user_desc').hide();
        } else {
            $('.dlg_tr_group_flag').show();
            $('.dlg_tr_relation_user_desc').show();
        }

        $('#dlg_new_ca_main').dialog({
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
                        $('#dlg_new_ca_main').dialog('close');
                    }
                }, {
                    text: '保存',
                    iconCls: 'icon-save',
                    handler: function () {
                        var par = {
                            rnd: Math.random(),
                            ca_seq: ca_main_base.ca_seq,
                            action: 'update_main_list_for_bus',
                            ca_cu_id: ca_main_base.ca_cu_id,
                            ca_title: $.trim($('#dlg_ed_ca_title').val()),
                            ca_group_flag: $('#dlg_ed_ca_group_flag').is(':checked') ? 1 : 0,
                            ca_rec_or_pay: cur_rec_or_pay,
                            ca_year: $('#dlg_ed_ca_year').combobox('getValue'),
                            ca_month: $('#dlg_ed_ca_month').combobox('getValue'),
                            ca_bak: $('#dlg_ed_ca_bak').val(),
                            ca_limit_dat: $('#dlg_ed_ca_limit_dat').datebox('getValue'),
                            ca_assign_flag: $('#dlg_ed_ca_assign_flag').is(':checked') ? 1 : 0,
                            u_ids: $('#dlg_ed_ca_bind_relation_u_ids').val(),
                            data_attachment: JSON.stringify({ attachment_list: $('#dlg_tab_ca_files').datagrid('getRows') })
                        };

                        var ca_seq = $('#dlg_ed_ca_seq').val();


                        if (isNaN(par.ca_month)) {
                            $.messager.alert('错误', '必须选择月份', 'error');
                            return;
                        }
                        if (isNaN(par.ca_year)) {
                            $.messager.alert('错误', '必须选择年丰', 'error');
                            return;
                        }
                        //非邀约，默认标题是  公司名+年+月
                        if (par.ca_group_flag == 0) {
                            if (par.ca_title.length == 0) {
                                par.ca_title = $('#dlg_ed_ca_cu_id').combogrid('getText') +
                                    par.ca_year + '年' + par.ca_month + '月应' + (cur_rec_or_pay == 1 ? '收' : '付') + '对账单';
                            }
                        } else {
                            //邀约对账单，必须填写标题
                            if (par.ca_title.length == 0) {
                                $.messager.alert('错误', '邀约对账单必须填写标题', 'error');
                                return;
                            }
                        }
                        post('../Ashx/checkaccount.ashx', par,
                        function (data) {
                            if (data.result == 1) {
                                $('#dlg_ed_ca_seq').val(data.ca_seq);
                                refresh_ca_list();
                                $.messager.confirm('提示', '修改完成，是否继续编辑？',
                                function (r) {
                                    if (!r) {
                                        $('#dlg_new_ca_main').dialog('close');
                                    } else {
                                        $('#dlg_ed_ca_cu_id').combogrid('disable');
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
                            action: 'update_main_list_simple_for_bus',
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
//账单附件 
function init_dlg_tab_ca_files() {
    $("#dlg_tab_ca_files").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#dlg_tab_ca_files_bar',
        fit: true,
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[//显示的列 
            { title: '', field: 'file_seq', width: 40, checkbox: true }
            , {
                field: 'file_nam', title: '文件名', width: 400, formatter: function (value, row, index) {
                    return '<a class="ca_file" target="_blank" href="' + row.file_path + '">' + value + '</a>';
                }
            }
        ]],
        onLoadSuccess: function (data) {

        }
    });

    $("#dlg_tab_ca_attachment_list").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        //toolbar: '#dlg_tab_ca_files_bar',
        fit: true,
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[//显示的列 
            {
                field: 'file_nam', title: '文件名', width: 400, formatter: function (value, row, index) {
                    return '<a class="ca_file" target="_blank" href="' + row.file_path + '">' + value + '</a>';
                }
            }
        ]],
        onLoadSuccess: function (data) {

        }
    });
}

//上传 账单附件
function dlg_upload_ca_file() {
    $('#file_upload').unbind('change').bind('change', function () {
        var file = $(this).get(0).files[0];
        //文件大小
        if (!/.(gif|jpg|jpeg|png|GIF|JPG|bmp|pdf|doc|docx|xls|xlsx)$/.test(file.name)) {
            $.messager.alert('错误', '文件类型必须是.gif,jpeg,jpg,png,bmp,pdf,xls,xlsx,doc,docx中的一种', 'error');
            return;
        } else {
            if (((file.size).toFixed(2)) >= (10 * 1024 * 1024)) {
                $.messager.alert('错误', '文件大小不能超过10M', 'error');
                return;
            }
            /*有同志上传图片文件过大，需要进行压缩*/
            if (/.(gif|jpg|jpeg|png|GIF|JPG|bmp)$/.test(file.name)) {
                var reader = new FileReader();
                (function (x) {
                    reader.onload = function (e) {
                        _render_ca_file(this.result, x);
                    }
                })(file.name);
                reader.readAsDataURL(file);
            } else {
                var myparams = {
                    mode: 'file',
                    rnd: Math.random(),
                };
                var url = '../Ashx/checkaccount.ashx?action=insert_ca_file';

                insert_ca_file(this, myparams, url);
            }
        }

    });
    $('#file_upload').click();
}

//上传
function insert_ca_file(that, typedata, baseurl) {
    var formData = new FormData();
    var file = $(that).get(0).files[0];
    formData.append("params", JSON.stringify(typedata));
    formData.append("file", file); //传给后台的file的key值是可以自己定义的 
    $.messager.progress({
        title: '请稍后',
        msg: '努力加载中...'
    });
    $.ajax({
        url: baseurl,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            $.messager.progress('close');
            var data = JSON.parse(returndata);
            if (data.result == 1) {
                $("#dlg_tab_ca_files").datagrid('insertRow', {
                    row: {
                        file_seq: guid(),
                        file_nam: data.file_nam,
                        file_path: data.file_path,
                    }
                });

            } else {
                $.messager.alert('错误', '错误:文件上传失败', 'error');
            }
        },
        error: function (returndata) {
            $.messager.alert('错误', '错误: 文件上传失败', 'error');
        }

    });
}

function _render_ca_file(src, picname) {
    var image = new Image();
    image.onload = function () {
        //canvas 
        var canvas = document.createElement('canvas');;
        if (image.height > MAX_HEIGHT && image.height >= image.width) {
            image.width *= MAX_HEIGHT / image.height;
            image.height = MAX_HEIGHT;
        }
        if (image.width > MAX_HEIGHT && image.width >= image.height) {
            image.height *= MAX_HEIGHT / image.width;
            image.width = MAX_HEIGHT;
        }

        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        //$('#single_contract_imgfile').prop('src',canvas.toDataURL('image/png'));
        //data:image/jpeg;base64, 

        var blob = canvas.toDataURL();
        //需要把blob存储起来
        //data:image/jpeg;base64, 
        $.messager.progress({
            title: '请稍后',
            msg: '努力加载中...'
        });
        //上传
        $.post('../Ashx/order.ashx', {
            pic: blob,
            pic_name: picname,
            action: 'insert_ca_file',
            mode: 'pic',
            rnd: Math.random(),
        },
            function (returndata) {
                $.messager.progress('close');
                var data = JSON.parse(returndata);
                if (data.result == 1) {
                    $("#dlg_tab_ca_files").datagrid('insertRow', {
                        row: {
                            file_seq: guid(),
                            file_nam: data.file_nam,
                            file_path: data.file_path,
                        }
                    });

                } else {
                    $.messager.alert('错误', '错误: 文件添加失败', 'error');
                }
            });
    }
    image.src = src;
}

//删除合同文件 
function dlg_delete_ca_file() {
    var rows = $('#dlg_tab_ca_files').datagrid('getSelections');

    if (rows.length == 0) {
        $.messager.alert('错误提示', '错误: 选择要删除的文件，然后在执行此操作', 'error');
        return;
    }

    $.messager.confirm('删除提示', '确认要删除此文件？',
        function (r) {
            if (r) {
                var old_rows = $('#dlg_tab_ca_files').datagrid('getRows');

                var new_rows = [];

                $.each(old_rows, function (o, orow) {
                    var has = false;
                    $.each(rows, function (d, drow) {
                        if (drow.file_seq == orow.file_seq) {
                            has = true;
                        }
                    });

                    if (!has) {
                        new_rows.push(orow);
                    }
                });
                $('#dlg_tab_ca_files').datagrid('loadData', new_rows);

            }
        });

}

//初始化员工 
function init_dlg_tab_user_list(data) {
    $('#dlg_tab_user_list').datagrid({
        data: data,
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
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { title: '', field: '_ck', width: 40, checkbox: true },
            { field: 'u_real_name', width: 140, title: '姓名' },
            { field: 'u_phone', width: 140, title: '电话' },
        ]]
    });
}

//绑定员工
function dlg_ed_ca_bind_relation_user() {
    $('#dlg_new_ca_main').dialog('close');

    $('#dlg_user_list').dialog({
        title: '选择指定对账人',
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
                    $('#dlg_user_list').dialog('close');
                }
            }, {
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {

                    var selected_rows = $('#dlg_tab_user_list').datagrid('getChecked');

                    if (selected_rows.length == 0) {
                        $('#dlg_ed_ca_relation_user_desc').val('');
                        $('#dlg_ed_ca_bind_relation_u_ids').val('');
                    } else {
                        var ids = '';
                        var desc = '';

                        $.each(selected_rows, function (i, item) {
                            if (ids.length == 0) {
                                ids = item.u_id;
                                desc = item.u_real_name;
                            } else {
                                ids += ',' + item.u_id;
                                desc += ',' + item.u_real_name;
                            }
                        });
                        $('#dlg_ed_ca_relation_user_desc').val(desc);
                        $('#dlg_ed_ca_bind_relation_u_ids').val(ids);
                    }

                    $('#dlg_new_ca_main').dialog('open');

                    $('#dlg_user_list').dialog('close');
                }
            }]
    }).dialog('open');

}

//显示 账单附件
function show_checkaccount_files(ca_seq) {
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_checkaccount_by_ca_seq',
        ca_seq: ca_seq
    }, function (data) {
        var ca_main_base = data.ca_main_base[0];
        var attachment_list = data.attachment_list;
        var relation_user_list = data.relation_user_list;

        $('#dlg_tab_ca_attachment_list').datagrid('loadData', attachment_list);

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
        }).dialog('open');


    }, true);

}

 
//初始化 账单选择
function init_dlg_tab_choise_ca_main_list() {
    $("#dlg_tab_choise_ca_main_list").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        toolbar: '#dlg_tab_choise_ca_main_list_bar',
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
                field: 'ca_group_flag', title: '邀约', width: 40,
                formatter: function (value, row, index) {
                    if (Number(value) == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '';
                    }
                }
            }
            , {
                field: 'ca_year', title: '账单时间', width: 60,
                formatter: function (value, row, index) {
                    return row.ca_year + '-' + row.ca_month;
                }
            }
            , { field: 'ca_title', title: '账单名称', sortable: true, width: 100 }
            , {
                field: 'total_amount_of_base', title: '费用明细', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    return row.total_amount_desc;
                }
            }
            , {
                field: 'ca_limit_dat', title: '邀约截止', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    if (value == undefined) return '无';
                    else return dateformat(value, true);
                }
            }
            , { field: 'ca_create_by_nam', title: '创建人', sortable: true, width: 60 }
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
            , { field: 'ca_relation_user_desc', title: '指定邀约对象', width: 140, }
            , {
                field: 'files_count', title: '对账附件', width: 80, formatter: function (value, row, index) {
                    if (Number(value) == 0) {
                        return '无附件';
                    } else {
                        return '<a href="javascript:void(0);" data-ca_seq="' + row.ca_seq + '" class="btn_show_ca_attachment">附件' + Number(row.files_count) + '</a>';
                    }
                }
            }
            , { field: 'ca_bak', title: '备注', sortable: true, width: 200 }
        ]],
        onLoadSuccess: function (data) {


            $('.btn_show_ca_attachment').bind('click', function () {
                var ca_seq = $(this).data('ca_seq');
                //
                show_checkaccount_files(ca_seq);
            });
        },
    });
}

//刷新账单选择
function refresh_dlg_tab_choise_ca_main_list(withDate) {
    var ca_year = $('#dlg_search_ca_year').combobox('getValue');
    var ca_month = $('#dlg_search_ca_month').combobox('getValue');

    if (!isNaN(ca_year) && !isNaN(ca_month)) {
        post('../Ashx/checkaccount.ashx', {
            rnd: Math.random(),
            action: 'get_checkaccount_no_page',
            rec_or_pay: cur_rec_or_pay,
            ca_cu_id: $('#dlg_ca_cu_id').val(),
            ca_year: !withDate ? '' : $('#dlg_search_ca_year').combobox('getValue'),
            ca_month: !withDate ? '' : $('#dlg_search_ca_month').combobox('getValue'),
        }, function (data) {
            $('#dlg_tab_choise_ca_main_list').datagrid('loadData', data);


        }, true);
    } else {
        $.messager.alert('错误', '请选择正确的年月', 'error');
    }

}

//删除
function delete_ca_main() {
    var rows = $('#tab_ca_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误:请选择账单后再执行此操作', 'error');
        return;
    }

    //进行判断
    /*
        1. 提交了不能更新
        2. 非自己创建的也无法更新 
    */

    /*允许批量删除*/

    var bRight = true;
    var msg = '';
    var ca_seqs = '';

    $.each(rows, function (i, row) {
        if (row.ca_status != 1) {
            bRight = false;
            msg = '错误:账单"' + row.ca_title + '"已交账，请先退回!';
            return;
        }


        if (ca_seqs.length == 0) {
            ca_seqs = row.ca_seq;
        } else {
            ca_seqs += ',' + row.ca_seq;
        }
    });
    if (!bRight) {
        $.messager.alert('错误', msg, 'error');
        return;
    }
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'judge_giveback_checkaccount',
        ca_seqs: ca_seqs
    }, function (data) {

        var title = '';
        if (data.result == 1) {
            title = '确定要删除"' + rows.length + '"条账单？';
        }
        if (data.result == 2) {
            title = '正在删除的账单中含有过账关联，删除此类型账单会同时删除掉关联的账单及(代)过账委托信息， 确定要删除"' + rows.length + '"条账单？';
        }

        if (data.result > 0) {
            $.messager.confirm('删除账单提示', title,
            function (r) {
                if (r) {
                    post('../Ashx/checkaccount.ashx', {
                        rnd: Math.random(),
                        action: 'delete_main_list_for_bus',
                        ca_seqs: ca_seqs
                    }, function (data2) {
                        if (data2.result == 1) {
                            $.messager.alert('提示', data2.msg, 'info');
                            refresh_ca_list();
                        } else {
                            $.messager.alert('错误', data2.msg, 'error');
                            return;
                        }
                    }, true);
                }
            });
        } else {
            $.messager.alert('错误',data.msg,'error');
            return;
        }

        
    },false);
}


//显示 账单附件
function show_checkaccount_files(ca_seq) {
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_checkaccount_by_ca_seq',
        ca_seq: ca_seq
    }, function (data) {
        var ca_main_base = data.ca_main_base[0];
        var attachment_list = data.attachment_list;
        var relation_user_list = data.relation_user_list;

        $('#dlg_tab_ca_attachment_list').datagrid('loadData', attachment_list);

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
        }).dialog('open');


    }, true);

}

//退回账单
function giveback_ca_main() {
    var rows = $('#tab_ca_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误: 请选择账单后再执行此操作', 'error');
        return;
    }
    //进行判断
    /*
        1. 提交了不能更新
        2. 非自己创建的也无法更新 
    */
    var status_right = 1;
    var ca_seqs = '';
    var hoa_lock = 0;
    $.each(rows, function (i, item) {
        if (item.ca_status != 2) {
            status_right = 0;
        }
        if (ca_seqs.length == 0) {
            ca_seqs = item.ca_seq;
        } else {
            ca_seqs += ',' + item.ca_seq;
        }

        if (item.hoa_lock_status == 1) {
            hoa_lock = 1
        }
    });

    if (hoa_lock == 1) {
        $.messager.alert('错误', '错误: 所选账单中含有正在对冲的账单，无法退回!', 'error');
        return;
    }
    if (status_right != 1) {
        $.messager.alert('错误', '错误: 所选账单中含有已回款账单/或未归账，无法退回! (提示: 未归账可以直接删除账单。)', 'error');
        return;
    }
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'judge_giveback_checkaccount',
        ca_seqs: ca_seqs
    }, function (data) {
        var title = '';
        if (data.result == 1) {
            title = '确定要退回"' + rows.length + '"条账单？';
        }
        if (data.result == 2) {
            title = '正在退回的账单中含有过账关联，退回此类型账单会同时删除掉关联的账单及(代)过账委托信息， 确定要退回"' + rows.length + '"条账单？';
        }

        if (data.result > 0) {
            $.messager.confirm('删除账单提示', title,
            function (r) {
                if (r) {
                    post('../Ashx/checkaccount.ashx', {
                        rnd: Math.random(),
                        action: 'giveback_checkaccount',
                        ca_seqs: ca_seqs,
                    }, function (data2) {
                        if (data2.result == 1) {
                            $.messager.alert('提示', data2.msg, 'info');
                            refresh_ca_list();
                        } else {
                            $.messager.alert('错误', data2.msg, 'error');
                        }
                    }, true);
                }
            });
        } else {
            $.messager.alert('错误', data.msg, 'error');
            return;
        }
    },false);

}
//交账 
function post_ca_main() {
    var rows = $('#tab_ca_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误:请选择账单后再执行此操作', 'error');
        return;
    }
    //进行判断
    /*
        1. 提交了不能更新
        2. 非自己创建的也无法更新 
    */

    var b_already_post = false;
    var b_create = true;
    var ca_seq = '';
    $.each(rows, function (i, row) {
        if (row.ca_status != 1) {
            b_already_post = true;
            $.messager.alert('错误', '错误:账单"' + rows[0].ca_title + '"已交账，不能反复提交!', 'error');
            return;
        }

        //if (row.ca_is_my_flag != 1) {
        //    b_create = false;
        //    $.messager.alert('错误', '错误:账单"' + rows[0].ca_title + '"不是您创建的，您无权提交!', 'error');
        //    return;
        //}

        if (ca_seq.length == 0) {
            ca_seq = row.ca_seq;
        } else {
            ca_seq += ',' + row.ca_seq;
        }
    });

    if (b_already_post || !b_create) {
        return;
    }


    $('#dlg_post_ca_seq').val(rows[0].ca_seq);

    $('#dlg_post_ca_bak').val('')
    //需要对话框
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
            },
            {
                text: '投递',
                iconCls: 'icon-ok',
                handler: function () {
                    post('../Ashx/checkaccount.ashx', {
                        rnd: Math.random(),
                        action: 'post_for_bus',
                        ca_seq: ca_seq,
                        ca_bak: $.trim($('#dlg_post_ca_bak').val())
                    }, function (data) {
                        if (data.result == 1) {
                            $.messager.alert('提示', data.msg, 'info');
                            refresh_ca_list();
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        }
                    }, true);
                    $('#dlg_post_ca').dialog('close');
                }
            }]
    }).dialog('open');

}
