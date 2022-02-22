 

var cur_ed_od_seq = undefined;
var basesetting = undefined;
var cur_ref_month_exchange_list = undefined;

$(document).ready(function () {
    cur_ed_od_seq = getQueryVariable('od_seq');
    get_basesetting();
    
})
 
//获取基础数据
function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        basesetting = data;
        //查询
        init_tab_order_fee_rec();
        init_tab_order_fee_pay();


    }, true);
}
function load_page_fee_info() {

    if (cur_ed_od_seq == undefined || cur_ed_od_seq.length == 0) {

    } else {
        post('../Ashx/order.ashx', {
            rnd: Math.random(),
            action: 'get_order_fee',
            od_seq: cur_ed_od_seq
        }, function (data) {
            var rec_fee_list = [];
            var pay_fee_list = [];
             
            var mm_arr = [];

            $.each(data.rows, function (i, row) {
                if (row.rec_or_pay == 1) {
                    rec_fee_list.push(row); 
                }
                if (row.rec_or_pay == -1) {
                    pay_fee_list.push(row);
                }
            });
             

            $("#tab_order_fee_rec").datagrid('loadData', { total: rec_fee_list.length, rows: rec_fee_list });
            $("#tab_order_fee_pay").datagrid('loadData', { total: pay_fee_list.length, rows: pay_fee_list });
        }, true);

        post('../Ashx/exchange_rate.ashx', {
            rnd: Math.random(),
            action: 'get_month_exchange_rate_by_od_seq',
            od_seq: cur_ed_od_seq
        }, function (data) {
            cur_ref_month_exchange_list = data.rows;
          
        }, true);
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
                            var ed = $('#tab_order_fee_rec').datagrid('getEditor', { index: cur_edit_fee_rowindex_rec, field: 'fee_cu_desc' });
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
                        panelHeight: 'auto',
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
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        
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

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
