var cur_od_seq = undefined;
var cur_order = undefined;
var cur_next_amc_opr_info = undefined;
$(document).ready(function () {
    
    cur_od_seq = getQueryVariable('od_seq');
    get_order_details_collections();
});


//获取资料 
function get_order_details_collections() {
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'get_order_single_full_collections',
        od_seq: cur_od_seq
    }, function (data) {
        cur_order = data;

        var od_base = data.order_base_info_and_cargo_info[0];
        
        $('#ed_od_no').val(od_base.od_no);
        $('#ed_od_fee_dat').val(dateformat(od_base.od_fee_dat,true));
        $('#ed_od_status_id').val(od_base.od_status_desc);
        $('#ed_od_delegate_cu_id').val(od_base.od_delegate_cu_desc);
        $('#ed_od_delegate_relation_nam').val(od_base.od_delegate_relation_nam);
        $('#ed_od_delegate_relation_nam').val(od_base.od_delegate_relation_nam);
        $('#ed_od_delegate_relation_fax').val(od_base.od_delegate_relation_fax);
        $('#ed_od_cargo_agent_cu_id').val(od_base.od_cargo_agent_cu_desc);
        $('#ed_od_cargo_agent_relation_nam').val(od_base.od_cargo_agent_relation_nam);
        $('#ed_od_cargo_agent_relation_phone').val(od_base.od_cargo_agent_relation_phone);
        $('#ed_od_cargo_agent_relation_fax').val(od_base.od_cargo_agent_relation_fax);
        $('#ed_od_typ').val(od_base.od_typ_desc);
        $('#ed_od_project_typ').val(od_base.od_project_typ_desc);
        $('#ed_od_box_typ_id').val(od_base.od_box_typ_desc);
        $('#ed_od_trade_typ_id').val(od_base.od_trade_typ_desc);

        $('#ed_od_i_e_id').val(od_base.od_i_e_desc);
        $('#ed_od_freight_id').val(od_base.od_freight_desc);
        $('#ed_od_beg_place_id').val(od_base.od_beg_place_desc);
        $('#ed_od_end_place_id').val(od_base.od_end_place_desc);
        $('#ed_od_service_id').val(od_base.od_service_nam);
        $('#ed_od_operation_id').val(od_base.od_operation_nam);
        $('#ed_od_sales_id').val(od_base.od_sales_nam);

        $('#ed_od_bak_delegate').val(od_base.od_bak_delegate);
        $('#ed_od_bak_operation').val(od_base.od_bak_operation);

        $('#od_water_way_flag').prop('checked', od_base.od_water_way_flag == 1 ? true : false);
        $('#od_sub_way_flag').prop('checked', od_base.od_sub_way_flag == 1 ? true : false);
        $('#od_road_way_flag').prop('checked', od_base.od_road_way_flag == 1 ? true : false);
        $('#od_air_way_flag').prop('checked', od_base.od_air_way_flag == 1 ? true : false);

        $('#ed_od_cargo_typ').val(od_base.od_cargo_typ_desc);
        $('#ed_od_cargo_weight').val(od_base.od_cargo_weight);
        $('#ed_od_cargo_number').val(od_base.od_cargo_number);
        $('#ed_od_cargo_packing').val(od_base.od_cargo_packing_desc);
        $('#ed_od_cargo_bluk').val(od_base.od_cargo_bluk);
        $('#ed_od_take_cargo_info').val(od_base.od_take_cargo_info);
        $('#ed_od_delivery_cargo_info').val(od_base.od_delivery_cargo_info);
        $('#ed_od_po_no').val(od_base.od_po_no);
        $('#ed_od_so_no').val(od_base.od_so_no);
        $('#ed_od_main_bill_no').val(od_base.od_main_bill_no);
        $('#ed_od_sub_bill_no').val(od_base.od_sub_bill_no);
        $('#ed_od_group_cntr_desc').val(od_base.od_group_cntr_desc);

        $('#ed_od_bill_typ').val(od_base.od_bill_typ_desc);
        $('#ed_od_sign_bill_typ').val(od_base.od_sign_bill_typ_desc);
        $('#ed_od_declare_customs_typ').val(od_base.od_declare_customs_typ_desc);
        $('#ed_od_carriage_typ').val(od_base.od_carriage_typ_desc);

        $('#ed_od_stuffing_container_typ').val(od_base.od_stuffing_container_typ_desc);
        $('#ed_od_stuffing_container_place').val(od_base.od_stuffing_container_place);
        $('#ed_od_entry_tim_of_stuffing').val(dateformat(od_base.od_entry_tim_of_stuffing, true));
        $('#ed_od_out_tim_of_stuffing').val(dateformat(od_base.od_out_tim_of_stuffing, true));

        load_order_rec_fee(data.order_rec_fee_list);

        load_order_pay_fee(data.order_pay_fee_list);

        init_tab_od_fee_group();
        refresh_fee_group_tab();

        init_tab_order_cntr();
        $("#tab_order_cntr").datagrid('loadData', { total: data.order_cntr_list.length, rows: data.order_cntr_list });

        $('.datagrid-body').css({
            'overflow-y':'hidden'
        });
         
        refresh_approval_flow_details();


    },true);
}
//应收
function load_order_rec_fee(order_rec_fee_list) {
    $("#tab_order_fee_rec").datagrid({
        data: order_rec_fee_list,
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        height:'auto',
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
                field: 'fee_cu_id', title: '结算单位', width: 210,
                formatter: function (value, row, index) { 
                    return row.fee_cu_desc;
                }, 
            }
            , {
                field: 'fee_invoice_typ', title: '票率', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                }, 
            }
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_item_typ_desc;
                }, 
            }
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }, 
            }
            , {
                field: 'fee_unit', title: '单位', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_unit_desc;
                }, 
            }
            , {
                field: 'fee_price', title: '单价', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }, 
            }
            , {
                field: 'fee_currency_id', title: '币种', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_currency_desc;
                }, 
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 80,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number).toFixed(4);
                }
            }
            , {
                field: 'woa_total_amount', title: '已收', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
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
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80, sortable: true,
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
                field: 'fee_bak', title: '备注', width: 260, 
            }
            , {
                field: 'od_invoice_no', title: '发票号', width: 260,
            }
             , {
                 field: 'fee_record_nam', title: '记录人', width: 60,
             }
            , {
                field: 'fee_record_dat', title: '记录时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_checkaccount_lock_nam', title: '对账人', width: 60,
            }
            , {
                field: 'fee_checkaccount_lock_dat', title: '对账时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_request_lock_nam', title: '请票人', width: 60,
            }
            , {
                field: 'fee_request_lock_dat', title: '请票时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_invoice_lock_nam', title: '开票人', width: 60,
            }
            , {
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_finace_lock_nam', title: '销账', width: 60,
            }
            , {
                field: 'fee_finace_lock_dat', title: '销账时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
        ]],
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





        panel_title.html('<div style="float:left">应收费用</div><div style="float:right">选择:' + rows.length + '行,总计金额:' + data_group.fee_amount + ',已销金额:' + data_group.woa_total_amount + '</div>');

    } else {
        panel_title.html('应收费用');
    }
}

//应付
function load_order_pay_fee(order_pay_fee_list) {
    $("#tab_order_fee_pay").datagrid({
        data: order_pay_fee_list,
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar:'#tab_order_fee_pay_bar',
        height:'auto',
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
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
                field: 'fee_cu_id', title: '结算单位', width: 210,
                formatter: function (value, row, index) {
                    return row.fee_cu_desc;
                }, 
            }
            , {
                field: 'fee_invoice_typ', title: '票率', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                }, 
            }
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return row.fee_item_typ_desc;
                }, 
            }
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }, 
            }
            , {
                field: 'fee_unit', title: '单位', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_unit_desc;
                }, 
            }
            , {
                field: 'fee_price', title: '单价', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }, 
            }
            , {
                field: 'fee_currency_id', title: '币种', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_currency_desc;
                }, 
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 54,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 80,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number).toFixed(4);
                }
            }
            , {
                field: 'woa_total_amount', title: '已付', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
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
                field: 'fee_invoice_lock_dat', title: '收票时间', width: 80, sortable: true,
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
            , {
                field: 'fee_bak', title: '备注', width: 260,
                 
            }
            , {
                field: 'od_invoice_no', title: '发票号', width: 260,
            }
             , {
                 field: 'fee_record_nam', title: '记录人', width: 60,
             }
            , {
                field: 'fee_record_dat', title: '记录时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_checkaccount_lock_nam', title: '对账人', width: 60,
            }
            , {
                field: 'fee_checkaccount_lock_dat', title: '对账时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_request_lock_nam', title: '请票人', width: 60,
            }
            , {
                field: 'fee_request_lock_dat', title: '请票时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_invoice_lock_nam', title: '开票人', width: 60,
            }
            , {
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_finace_lock_nam', title: '销账', width: 60,
            }
            , {
                field: 'fee_finace_lock_dat', title: '销账时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
        ]],
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
        onDblClickRow: function (index, row) {
            view_all_service_info(row.od_service_seq, row.od_service_sub_seq);
        }
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





        panel_title.html('<div style="float:left">应付费用</div><div style="float:right">选择:' + rows.length + '行,总计金额:' + data_group.fee_amount + ',已销金额:' + data_group.woa_total_amount + '</div>');

    } else {
        panel_title.html('应付费用');
    }
}


//汇总
function init_tab_od_fee_group() {
    $("#tab_od_fee_group").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        height:'auto',
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        // frozenColumns: [[{ title: '', field: '_ck', width: 40, checkbox: true }, ]],
        columns: [[//显示的列
            {
                field: 'rec_or_pay', title: '收/付', width: 40,
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
                field: 'fee_amount', title: '小计', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    if (row.cr_id == undefined) return ''
                    else return Number(value).toFixed(2);
                }
            }  
            , {
                field: 'woa_total_amount', title: '已销', width: 70,
                formatter: function (value, row, index) {
                    if (row.rec_or_pay == 3) return value;
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'unwoa_total_amount', title: '未销', width: 70,
                formatter: function (value, row, index) {
                    if (row.rec_or_pay == 3) return value;
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'cr_rate', title: '汇率', sortable: true, width: 54,
                formatter: function (value, row, index) {
                    if (row.cr_id == undefined) return ''
                    else return Number(value).toFixed(4);
                }
            }
             , {
                 field: 'cr_fee_std_group', title: '本币小计', width: 70,
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
                    cr_desc: '汇总:',
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

//重新计算汇总费率
function refresh_fee_group_tab() {
    var rec_rows = $('#tab_order_fee_rec').datagrid('getRows');
    //币种 金额累计 换算汇率 

    var arr = [];
    var rec_total_amount = 0;

    $.each(rec_rows, function (i, row) {
        if (row.fee_currency_desc.length > 0) {
            rec_total_amount += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number) * row.fee_currency_rate;

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
                    cr_desc: row.fee_currency_desc,
                    cr_rate: row.fee_currency_rate,
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
            pay_total_amount += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number) * row.fee_currency_rate;

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
                    cr_desc: row.fee_currency_desc,
                    cr_rate: row.fee_currency_rate,
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

//查看所有费用 
function view_all_service_info(od_service_seq, od_service_sub_seq) {


    var od_service_list = cur_order.order_service_list;

    if(od_service_list == undefined || 
        od_service_list.length == 0) {
        $.messager.alert('提示','此单没有找到此项记录','info');
        return;
    } 

    if ($('#tabs_service_list').tabs('tabs').length > 0) {
        var maxIndex = $('#tabs_service_list').tabs('tabs').length - 1;

        for (var i = maxIndex; i >= 0; i--) {
            $('#tabs_service_list').tabs('close', i);
        }
    }  
    sessionStorage.removeItem('od_service_list');
    sessionStorage.setItem('od_service_list', JSON.stringify(od_service_list));

    if (od_service_sub_seq == undefined || od_service_sub_seq.length == 0) {
        $.each(od_service_list, function (i, service_item) {
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_info_frame_of_service_info.aspx?rnd=' +
                            Math.random() + '&od_seq=' +
                            service_item.od_seq + '&od_service_seq=' +
                            service_item.od_service_seq +
                            '" style="width:100%;height:100%;"></iframe>';
            $('#tabs_service_list').tabs('add', {
                title: service_item.od_service_cu_desc,
                content: content,
                closable: false,
                selected: true,
                border: false,
            });
        });
    } else {
        var new_service_list = [];
        var new_service_sub_list = [];

        $.each(od_service_list, function (i, service_item) {
            if (service_item.od_service_seq == od_service_seq) {
                
                new_service_sub_list = [];

                if (service_item.sub_list.length > 0) {
                    $.each(service_item.sub_list, function (i, sub_service_item) {
                        if (sub_service_item.od_service_seq == od_service_seq &&
                            sub_service_item.od_service_sub_seq == od_service_sub_seq) {
                            new_service_sub_list.push(sub_service_item);
                        }
                    });
                } 
                service_item.sub_list = new_service_sub_list;

                new_service_list.push(service_item);
            } 
        });

        $.each(new_service_list, function (i, service_item) {
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_info_frame_of_service_info.aspx?rnd=' +
                            Math.random() + '&od_seq=' +
                            service_item.od_seq + '&od_service_seq=' +
                            service_item.od_service_seq +
                            '" style="width:100%;height:100%;"></iframe>';
            $('#tabs_service_list').tabs('add', {
                title: service_item.od_service_cu_desc,
                content: content,
                closable: false,
                selected: true,
                border: false,
            });
        });
    }
    $('#service_window').window('open');
    
      

}

//查看集装箱
//初始化 订单集装箱信息
function init_tab_order_cntr() {
    $("#tab_order_cntr").datagrid({
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
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ title: '', field: 'cntr_id', rowspan: 2, width: 40, checkbox: true }
            , {
                field: 'cntr_order_by_id', rowspan: 2, title: '编号', width: 40,
            }
        ]],
        columns: [
            [
                 { title: '集装箱基本信息', colspan: 12, align: 'center' },
                 { title: '报关信息', colspan: 13, align: 'center' },
            ]
            , [//显示的列

            { field: 'cntr_no', title: '箱号', sortable: true, width: 100 }
            , { field: 'opr_cod', title: '箱主', sortable: true, width: 60 }
            , { field: 'eqp_siz', title: '尺寸', width: 40, }
            , { field: 'eqp_typ', title: '箱型', width: 40, }
            , { field: 'seal_no', title: '商封号', width: 120, }
            , { field: 'customs_seal_no', title: '关封号', width: 120, }
            , { field: 'bill_no', title: '提单号', width: 150, }
            , { field: 'pick_empty_no', title: '空箱提单号', width: 150, }
            , {
                field: 'cntr_pin_flag', title: '整/拼', width: 40,
                formatter: function (value, row, index) {
                    if (value == undefined) {
                        return '';
                    } else {
                        if (Number(value) == 1) {
                            return '拼'
                        }
                        if (Number(value) == 0) {
                            return '整'
                        }
                    }
                },
                styler: function (value, row, index) {
                    if (value == undefined) {
                        return '';
                    } else if (Number(value) == 0) {
                        return 'background-color:#e7d430;color:#000;';
                    } else if (Number(value) == 1) {
                        return 'background-color:#4ff0e3;color:#000;';
                    }
                }
            }
            , {
                field: 'cargo_net_wgt', title: '货重', width: 80,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'cargo_pick_number', title: '件数', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'cargo_bluk', title: '体积', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'cntr_gross_wgt', title: '箱货重', width: 80,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , { field: 'customs_ship_desc', title: '船名', width: 90, }
            , { field: 'customs_voyage_no', title: '航次', width: 60, }
            , { field: 'customs_ship_no', title: '海关编码', width: 90, }
            , { field: 'customs_load_port', title: '装货区', width: 90, }
            , { field: 'customs_disc_port', title: '卸货区', width: 90, }
            , { field: 'cargo_goods_desc', title: '品名', width: 140, }
            , { field: 'customs_hs_cod', title: '品名编号', width: 90, }
            ]],
        onLoadSuccess: function (data) {

            //计算规则 
            /*
                箱数 剔除拼
                总 毛重  ： 剔除拼 
            */
            var total_cntr_num = 0;
            var total_cntr_gross_wgt = 0;

            //依据箱号增加
            var temp_cntr_no = undefined;
            $.each(data.rows, function (i, row) {
                if (temp_cntr_no == undefined) {
                    temp_cntr_no = row.cntr_no;
                    total_cntr_num = 1;
                    total_cntr_gross_wgt = row.cntr_gross_wgt;
                } else {
                    if (temp_cntr_no != row.cntr_no) {
                        total_cntr_num += 1;
                        temp_cntr_no = row.cntr_no;
                        total_cntr_gross_wgt += row.cntr_gross_wgt;
                    }
                }
            });


            $('#tab_order_cntr').datagrid('reloadFooter', [
                {
                    cntr_order_by_id: '合计:',
                    cntr_no: total_cntr_num + '箱',
                    cargo_net_wgt: table_compute('tab_order_cntr', 'cargo_net_wgt'),
                    cargo_pick_number: table_compute('tab_order_cntr', 'cargo_pick_number'),
                    cargo_bluk: table_compute('tab_order_cntr', 'cargo_bluk'),
                    cntr_gross_wgt: total_cntr_gross_wgt,
                }
            ]);
        },
    });
}
//查看所有费用 
function view_all_order_cntr_info() { 
    $('#order_cntr_info_window').window('open'); 
}
//同意下一步
function givenext_amc() {
    var od_base = cur_order.order_base_info_and_cargo_info[0];

    if (od_base.amc_status != 1 || (
        od_base.amc_status == 1 &&
        od_base.is_my_point != 1
        )) {
        $.messager.alert('错误','当前不是你的审核，无法提交','error');
    } else {

        var amc_id = od_base.amc_id;
        var amc_next_opr_id = '';
        var amc_next_step = '';
        var ap_context = $('#ed_ap_context').val();
        var msg = '';

        if (cur_next_amc_opr_info.length > 0) {
            //必须选择 
            var guid = $('#ed_ap_next_amc_opr_info').combobox('getValue');

            if (guid == undefined || guid.length == 0) {
                $.messager.alert('错误', '请选择下一个处理人', 'error');
                return;
            }
            var has = false;
            $.each(cur_next_amc_opr_info, function (i, item) {
                if (item.aps_guid == guid) {
                    has = true;
                    amc_next_opr_id = item.u_id;
                    amc_next_step = item.aps_order_by_id;
                }
            });
            msg = '确认同意当前订单的业务审核并提交下一步吗？'
        } else {
            msg = '确认同意当前订单的业务审核并标记完结吗？';
        }

        $.messager.confirm('审核同意提示', msg,
             function (r) {
                 if (r) {
                     

                     post('../Ashx/approval_mgr.ashx', {
                         rnd: Math.random(),
                         action: 'givenext_amc',
                         amc_id: amc_id,
                         amc_next_opr_id: amc_next_opr_id,
                         amc_next_step: amc_next_step,
                         ap_context: ap_context,
                     }, function (data) {
                         if (data.result == 1) {
                             get_order_details_collections();
                             $.messager.alert('提示', data.msg, 'info');

                         } else {
                             $.messager.alert('错误', data.msg, 'error');
                         }
                     }, true);
                 }
             }
        );
    } 

}
//回退到发起人
function giveback_to_create_amc() {
    var ap_context = $.trim($('#ed_ap_context').val());

    if(ap_context.length == 0){
        $.messager.alert('错误','退回审核，必须要提交理由','error');
        return;
    }
    var od_base = cur_order.order_base_info_and_cargo_info[0];
    if (od_base.amc_status != 1 || (
        od_base.amc_status == 1 &&
        od_base.is_my_point != 1
        )) {
        $.messager.alert('错误', '当前不是你的审核，无法提交', 'error');
    } else {
        $.messager.confirm('退回到发起人提示', '确认要将此单退回给发起人吗',
         function (r) {
             if (r) {
                 post('../Ashx/approval_mgr.ashx', {
                     rnd: Math.random(),
                     action: 'giveback_to_create_amc',
                     ap_context: ap_context,
                     amc_id: od_base.amc_id,
                 }, function (data) {
                     if (data.result == 1) {
                         //重新获取
                         get_order_details_collections();
                         $.messager.alert('提示', data.msg, 'info');
                     } else {
                         $.messager.alert('错误', data.msg, 'error');
                     }
                 }, true);
             }
         });
    }
}

//获取审核流程
function refresh_approval_flow_details() {
    var od_base = cur_order.order_base_info_and_cargo_info[0];
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_amc_actual_flow_details',
        amc_id: od_base.amc_id,
        is_my_point: od_base.is_my_point,

    }, function (data) {

        if (od_base.amc_status != 1 || (
            od_base.amc_status == 1 &&
            od_base.is_my_point != 1
            )) {
            $('#my_approval_adivce').panel('close');
        } else {
            cur_next_amc_opr_info = data.next_amc_opr_info;
            if (cur_next_amc_opr_info.length == 1) {
                bind_combobox(data.next_amc_opr_info, $('#ed_ap_next_amc_opr_info'), 'show_desc', 'aps_guid', false);
                $('#ed_ap_next_amc_opr_info').combobox('setValue', cur_next_amc_opr_info[0].aps_guid);
            } else {
                $('.cls_next_opr').html('');
            }
        }
        $('#ap_flow_details tbody').html('');
        if (data.amc_actual_flow_details.length > 0) {
            $.each(data.amc_actual_flow_details, function (i, item) {
                $('#ap_flow_details tbody').append('<tr class="ap_flow_details_row"><td class="ap_flow_details_tim">' + dateformat(item.ap_opr_dat, true) + '</td>'  
                    + '<td class="ap_flow_details_desc">' + item.aps_desc + '</td>'  
                    + '<td  class="ap_flow_details_nam">' + item.ap_opr_nam + '</td>'
                    + '<td  class="ap_flow_details_advice">' + item.ap_advice + '</td>'
                    + '</tr>'
                    + '<tr>'
                    + '<td class="ap_flow_details_advice_left">意见:</td>'
                    + '<td colspan="3" class="ap_flow_details_context_right">' + item.ap_context + '</td>'
                    + '</tr>');
            });
        }

    }, false);
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

