var cur_hoa_seq = undefined;
var cur_hoa = undefined;
var cur_next_amc_opr_info = undefined;

 
$(document).ready(function () {
    
    cur_hoa_seq = getQueryVariable('hoa_seq');
    init_tab_fee_list_of_hoa_rec();
    init_tab_fee_list_of_hoa_pay();
    get_hedge_off_accounts_collections();
    
    
});
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
       
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
            { title: '', field: 'fee_seq', rowspan: 2, width: 40, checkbox: true }
            , {
                field: 'fee_status_desc', rowspan: 2, title: '状态', sortable: true, width: 70,
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
                field: 'fee_bak', title: '费用备注', width: 260, sortable: true,
            }
            , {
                field: 'od_status_desc', rowspan: 2, title: '审核状态', width: 80, sortable: true,
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
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#window_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
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
         
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
            { title: '', field: 'fee_seq', rowspan: 2, width: 40, checkbox: true }
            , {
                field: 'fee_status_desc', rowspan: 2, title: '状态', sortable: true, width: 70,
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
                field: 'fee_bak', title: '费用备注', width: 260, sortable: true,
            }
            , {
                field: 'od_status_desc', rowspan: 2, title: '审核状态', width: 80, sortable: true,
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
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#window_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        }
    });
}


//获取资料 
function get_hedge_off_accounts_collections() {
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_hedge_off_accounts_record_single',
        hoa_seq: cur_hoa_seq
    }, function (data) {
        //需要进行 关联
        //绑定筛选项目 : 
        //记录人: mulit_search_record_by_id
        cur_selected_hoa = data.hoa_base[0];

        $('#sp_hoa_title').val(cur_selected_hoa.hoa_title);
        $('#sh_hoa_create_nam').val(cur_selected_hoa.hoa_record_nam);
      
        $('#sh_hoa_rec_total_money').val(cur_selected_hoa.hoa_rec_total_money);
        $('#sh_hoa_pay_total_money').val(cur_selected_hoa.hoa_pay_total_money);
        $('#sh_hoa_rec_currency_group_desc').val(cur_selected_hoa.hoa_rec_currency_group_desc);
        $('#sh_hoa_pay_currency_group_desc').val(cur_selected_hoa.hoa_pay_currency_group_desc);
        $('#sp_amc_status_desc').val(cur_selected_hoa.amc_status_desc);
        $('#sp_hoa_status_desc').val(cur_selected_hoa.hoa_status == 1 ? '计划中' : '已完结');
        $('#sh_hoa_diff_total_money').val(cur_selected_hoa.hoa_diff_total_money);
        $('#sh_hoa_diff_currency_group_desc').val(cur_selected_hoa.hoa_diff_currency_group_desc);
        $('#sp_amc_cur_opr_nam').val(cur_selected_hoa.amc_cur_opr_nam);
        $('#sp_amc_create_by_nam').val(cur_selected_hoa.amc_create_by_nam);
        $('#sp_amc_create_dat').val(dateformat( cur_selected_hoa.amc_create_dat,true));
        $('#sp_amc_finish_dat').val(dateformat(cur_selected_hoa.amc_finish_dat, true));

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

        if (pay_details.rows.length > 0) {
            $('#cur_fee_all_pay_fee_amount_of_hoa').html(Number(pay_details.pay_total_amount).toFixed(2));
            $('#cur_fee_all_payed_fee_amount_of_hoa').html(Number(pay_details.payed_total_amount).toFixed(2));
            $('#cur_fee_all_unpayed_fee_amount_of_hoa').html(Number(pay_details.unpayed_total_amount).toFixed(2));
        } else {
            $('#cur_fee_all_pay_fee_amount_of_hoa').html(0);
            $('#cur_fee_all_payed_fee_amount_of_hoa').html(0);
            $('#cur_fee_all_unpayed_fee_amount_of_hoa').html(0);
        }
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

        if (rec_details.rows.length > 0) {
            $('#cur_fee_all_rec_fee_amount_of_hoa').html(Number(rec_details.pay_total_amount).toFixed(2));
            $('#cur_fee_all_reced_fee_amount_of_hoa').html(Number(rec_details.payed_total_amount).toFixed(2));
            $('#cur_fee_all_unreced_fee_amount_of_hoa').html(Number(rec_details.unpayed_total_amount).toFixed(2));
        } else {
            $('#cur_fee_all_rec_fee_amount_of_hoa').html(0);
            $('#cur_fee_all_reced_fee_amount_of_hoa').html(0);
            $('#cur_fee_all_unreced_fee_amount_of_hoa').html(0);
        }
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

        $('.datagrid-body').css({
            'overflow-y': 'hidden'
        });
         
        refresh_approval_flow_details();

        //$('#window_of_hoa_fee_details').window({
        //    title: '对冲计划明细--' + cur_selected_hoa.hoa_title,
        //    onClose: function () {
        //        refresh_hoa_list();
        //    }
        //}).window('open');
    }, true);
    
}


//查看所有费用 
function view_all_service_info(od_service_seq, od_service_sub_seq) {


    var od_service_list = cur_hoa.order_service_list;

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
                            Math.random() + '&hoa_seq=' +
                            service_item.hoa_seq + '&od_service_seq=' +
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
                            Math.random() + '&hoa_seq=' +
                            service_item.hoa_seq + '&od_service_seq=' +
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
 
//查看所有费用 
function view_all_order_cntr_info() { 
    $('#order_cntr_info_window').window('open'); 
}
//同意下一步
function givenext_amc() {
     

    if (cur_selected_hoa.amc_status != 1 || (
        cur_selected_hoa.amc_status == 1 &&
        cur_selected_hoa.is_my_point != 1
        )) {
        $.messager.alert('错误','当前不是你的审核，无法提交','error');
    } else {
        var amc_id = cur_selected_hoa.amc_id;
        var amc_next_opr_id = '';
        var amc_next_step = '';
        var ap_context = $('#ed_ap_context').val();

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
            msg = '确认同意当前账单的审核并提交下一步吗？'
        } else {
            msg = '确认同意当前账单的审核并标记完结吗？';
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
                             get_hedge_off_accounts_collections();
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
     
    if (cur_selected_hoa.amc_status != 1 || (
        cur_selected_hoa.amc_status == 1 &&
        cur_selected_hoa.is_my_point != 1
        )) {
        $.messager.alert('错误', '当前不是你的审核，无法提交', 'error');
    } else {
        $.messager.confirm('退回到发起人提示', '确认要将此单退回给发起人吗?',
         function (r) {
             if (r) {
                 post('../Ashx/approval_mgr.ashx', {
                     rnd: Math.random(),
                     action: 'giveback_to_create_amc',
                     ap_context: ap_context,
                     amc_id: cur_selected_hoa.amc_id,
                 }, function (data) {
                     if (data.result == 1) {
                         //重新获取
                         get_hedge_off_accounts_collections();
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
    
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_amc_actual_flow_details',
        amc_id: cur_selected_hoa.amc_id,
        is_my_point: cur_selected_hoa.is_my_point,

    }, function (data) {

        if (cur_selected_hoa.amc_status != 1 || (
            cur_selected_hoa.amc_status == 1 &&
            cur_selected_hoa.is_my_point != 1
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
                $('#ap_flow_details tbody').append('<tr><td class="ap_flow_details_tim">' + dateformat(item.ap_opr_dat, true) + '</td>'  
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

