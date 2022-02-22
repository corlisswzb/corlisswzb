var pageNumber = 1;
var pageSize = 50;
var basesetting = undefined;
var cur_cap_list_query_params = undefined;
var cur_rec_or_pay = -1; 
var cur_selected_cap = undefined;
//费用的 表头筛选菜单 
var clumn_fliter_of_bus_cap_list = undefined;
var from_typ = undefined;
$(document).ready(function () {
    $($('body')[0]).unbind('keydown').bind('keydown', custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);
    from_typ = parent.call_get_from_typ();
    if ($('.remove_part_' + from_typ).length > 0) {
        $('.remove_part_' + from_typ).remove();
    }

    $('#dlg_delete_pay_checkaccount_amc').dialog({
        title: '取消审核计划',
        iconCls: 'icon-build_cancel',
        autoOpen: false,
        modal: true,
        width: 390,
        minheight: 100,
        buttons: [
        {
            text: '取消',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_delete_pay_checkaccount_amc').dialog('close');
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

    
    init_tab_cap_list();
    setting_checkaccount_count();
    //}, true);
}

//设置 分类数量 
function setting_checkaccount_count() {

    var setting = function (rows) {

        for (var i in rows) {
            var text = '';
            if (i == 4) {
                text = '审核中(<span style="color:red">' + rows[i].rowscount + '<span>)';
                $('.top_group_menu').eq(0).linkbutton({
                    text: text
                });
            }
            if (i == 5) {
                text = '过审待付(<span style="color:red">' + rows[i].rowscount + '<span>)';
                $('.top_group_menu').eq(1).linkbutton({
                    text: text
                });
            }  
        }
    }
    parent.get_checkaccount_count_by_typ_index(setting);
}

//初始化 账单
function init_tab_cap_list() { 
    $('#tab_cap_list').datagrid({
        url: '',
        data: [],
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_cap_list_bar',
        fit: true,
        checkbox: true,
        showFooter: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[
            { title: '', field: '_ck', width: 40, checkbox: true }
        ]],
        columns: [[//显示的列
              {
                  field: 'amc_status_desc', title: '状态', width: 50, sortable: true,
                  styler: function (value, row, index) {
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
              }
            , {
                field: 'amc_hurry_flag_desc', title: '', width: 24, sortable: true,
                formatter: function (value, row, index) {
                    if (row.amc_hurry_flag != undefined && Number(row.amc_hurry_flag) == 1) {
                        return '<span style="color:red;font-size:24px;">★</span>';
                    } else {
                        return '';
                    }
                }
            }
            , {
                field: 'relation_no', title: '审批号', sortable: true, width: 100 
            }
            , {
                field: 'amc_finish_dat', title: '通审时间', width: 78, sortable: true,
            }
           , { field: 'relation_cu_desc', title: '结算单位', width: 240, sortable: true, }
           , { field: 'amc_title', title: '审核标题', width: 240, sortable: true, }
           , { field: 'relation_oi_no', title: '关联发票号', sortable: true, width: 70, }

            , {
                field: 'total_amount_desc', title: '应付明细', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    return row.total_amount_desc;
                }
            }
            , {
                field: 'woa_total_amount_desc', title: '已付明细', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    return row.woa_total_amount_desc;
                }
            }
            , {
                field: 'unwoa_total_amount_desc', title: '未付明细', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    return row.unwoa_total_amount_desc;
                }
            }
            , { field: 'pay_approval_relation_invoice_typ_desc', title: '票率组成', sortable: true, width: 150 }

            , { field: 'pay_approval_relation_user_desc', title: '费用关联人', sortable: true, width: 160 }
            , {
                field: 'amc_create_dat', title: '申请时间', sortable: true, width: 78,
            }
             , {
                 field: 'amc_create_by_nam', title: '申请人', sortable: true, width: 78,
             }


        ]],
        onLoadSuccess: function (data) {  
            refresh_cap_list_footer();

            if (!clumn_fliter_of_bus_cap_list) {
                clumn_fliter_of_bus_cap_list = $('#columns_fliters').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_cap_list'),
                    cur_cls_target_body: 'cls_cap_region'
                }); 
            }  

        },
        onDblClickRow: function (index, row) { 
            //刷新 账单关联费用 
            winopen_order_fee_by_ca(row.amc_id, row.relation_no);
            cur_selected_cap = row; 
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_cap_list'), rowIndex);

            refresh_cap_list_footer();
        },
        onCheck: function (index, row) {
            refresh_cap_list_footer();
        },
        onUncheck: function (index, row) {
            refresh_cap_list_footer();
        },
        onCheckAll: function (index, row) {
            refresh_cap_list_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_cap_list_footer();
        },

        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            cur_selected_cap = row;
            $('#win_dv_view_of_approval_details_from_ca_list').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}
//查询 账单
function refresh_cap_list() {
    if (cur_cap_list_query_params != undefined) {
        post('../Ashx/checkaccount.ashx', cur_cap_list_query_params,
        function (data) {
            if (data.total == 0) {
                $.messager.alert('提醒', '没有找到相关记录', 'info');
            }
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_cap_fee', cur_rec_or_pay);
            clumn_fliter_of_bus_cap_list.columns_fliters('reset_target_data_only',data.rows);

        }, true);
    }
    setting_checkaccount_count();
}

function refresh_cap_list_from_click() {
    if (cur_cap_list_query_params != undefined) {
        post('../Ashx/checkaccount.ashx', cur_cap_list_query_params,
        function (data) { 
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_cap_fee', cur_rec_or_pay);
            clumn_fliter_of_bus_cap_list.columns_fliters('reset_target_data_and_clumns_fliter',data.rows);

        }, true);
    }
    setting_checkaccount_count();
}
//woa_or_iv界面通知刷新 
function refresh_from_woa_or_iv_update() {
    refresh_cap_list();
}
 

//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_cap_list_footer() {
    table_bootom_selected_desc($('#tab_cap_list'), 'selected_group_cap_fee', cur_rec_or_pay);
     
}
 
 
//菜单选择 打开不同类别的 账单集合
function show_win_of_group_ca(typ) {
     
    cur_cap_list_query_params = {
        rnd: Math.random(),
        action: 'get_checkaccount_by_typ_index',
        rec_or_pay: cur_rec_or_pay,
        typ_index: typ
    };
    refresh_cap_list_from_click();
}

 //关闭
function close_win_of_woa_or_iv_update() {
    $('#win_woa_or_iv_order_fee').window('close');
}
//刷新  通过账单seq 打开销账，标记发票窗口 
function winopen_order_fee_by_ca(amc_id, amc_no) {

    var content = '<iframe scrolling="auto" frameborder="0"  src="template_woa_or_iv_order_fee.aspx?rnd=' +
                        Math.random() + '&seq=' + amc_id +
                        '&rec_or_pay=' + cur_rec_or_pay +
                        '&from_typ=AMC' +
                        '&action=get_single_pay_checkaccount' +
                        '" style="width:100%;height:100%; overflow:hidden; "></iframe>';

    $('#win_woa_or_iv_order_fee').window({
        content: content
    }).window('open');
}
//撤销
function delete_cap_to_amc() {
    var selected_rows = $('#tab_cap_list').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要进行撤销审核的账单。', 'error');
        return;
    }

    var amc_id = '';
    var b_ca_approval_flag = true;
    var b_amc_status = true;

    var b_can_approval = true;

    $.each(selected_rows, function (i, row) {
        if (amc_id.length == 0) amc_id = row.amc_id;
        else amc_id += ',' + row.amc_id;
        
        if (row.amc_id != undefined && row.amc_status == 2) {
            b_amc_status = false;
            $.messager.alert('错误提示', '错误: 所选账单中含有已审核通过无法撤销。', 'error');
            return;
        }

        if (row.amc_id == undefined) {
            b_can_approval = false;
            $.messager.alert('错误提示', '错误: 所选账单中含有未提交审核的账单，无法执行撤销审核操作。', 'error');
            return;
        }
    });

    if ( b_amc_status && b_can_approval) {
        post('../Ashx/approval_mgr.ashx', {
            rnd: Math.random(),
            action: 'get_include_ca_count_for_post_or_del',
            amc_id: amc_id
        }, function (data) {
            var effect_ca_count = data.effect_ca_count; 
            $.messager.confirm('提示', '你正在撤销审核申请，是否继续',
             function (r) {
                 if (r) {
                     $('#dlg_delete_pay_checkaccount_amc').dialog({
                         title: '取消审核',
                         iconCls: 'icon-build_cancel',
                         autoOpen: false,
                         modal: true,
                         width: 300,
                         minheight: 50,
                         buttons: [
                         {
                             text: '关闭',
                             iconCls: 'icon-cancel',
                             handler: function () {
                                 $('#dlg_delete_pay_checkaccount_amc').dialog('close');
                             }
                         },
                         {
                             text: '确定撤销',
                             iconCls: 'icon-ok',
                             handler: function () {
                                 post('../Ashx/approval_mgr.ashx', {
                                     rnd: Math.random(),
                                     action: 'delete_amc',
                                     ap_context: $('#dlg_ap_context').val(),
                                     amc_id: amc_id
                                 }, function (data) {
                                     if (data.result == 1) { 
                                         $.messager.alert('提示', data.msg, 'info', function () {
                                             $('#dlg_delete_pay_checkaccount_amc').dialog('close');
                                             refresh_cap_list();
                                         });
                                     } else {
                                         $.messager.alert('错误', data.msg, 'error');
                                     }
                                 }, true);
                             }
                         }]
                     }).dialog('open');
                 }
             });
        }, true);
    }

}
//加急
function alert_cap_to_amc() {
    var selected_rows = $('#tab_cap_list').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要进行加急审核的账单。', 'error');
        return;
    }

    if (selected_rows.length > 10) {
        $.messager.alert('错误提示', '错误: 超出最多一次10票加急限制。', 'error');
        return;
    }

   
    var b_amc_id = true;
    var amc_ids = '';

    $.each(selected_rows, function (i, item) {
         
        if (item.amc_id != undefined && item.amc_status != 1) {
            b_amc_id = false; 
        }

        if (amc_ids.length == 0) {
            amc_ids = item.amc_id;
        } else {
            amc_ids += ',' + item.amc_id;
        }
    });

    if (!b_amc_id) {
        $.messager.alert('错误提示', '错误: 提交加急账单审核中，含有状态不是审核中，无法执行此操作。', 'error');
        return;
    }
     
    if (amc_ids != undefined) { 
        $.messager.confirm('加急提示', '确定要加急处理此账单的审核？加急操作当前审核人会收到一条加急信息，当前人直接点击此信息即可进行审核',
        function (r) {
            if (r) {
                post('../Ashx/approval_mgr.ashx', {
                    rnd: Math.random(),
                    action: 'set_amc_hurry',
                    amc_id: amc_ids
                }, function (data) {
                    if (data.result == 1) { 
                        $.messager.alert('提示', data.msg, 'info', function () {
                            refresh_cap_list();
                        });
                    } else {
                        $.messager.alert('错误', data.msg, 'error');
                    }
                }, true);
            }
        });
    }
}

//查看账单明细
function query_ca_of_fee_details() {
    var rows = $('#tab_cap_list').datagrid('getChecked');
    if (rows.length == 0) {
        $.messager.alert('错误', '错误: 请选择账单后再执行此操作', 'error');
        return;
    }
    var is_same_cu_id = true;
    var cu_id = rows[0].ca_cu_id;
    var amc_ids = '';
     
    $.each(rows, function (i, item) {

        if (amc_ids.length == 0) {
            amc_ids = item.amc_id;
           
        } else {
            amc_ids += ',' + item.amc_id;
          
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

    winopen_order_fee_by_ca(amc_ids, '');
}
 
//清空条件 
function clear_tab_ca_list_op() {
    clumn_fliter_of_bus_cap_list.columns_fliters('clear');
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
    var amc_id = cur_selected_cap.amc_id;

    if (amc_id == undefined || amc_id.length == 0) {
        $.messager.alert('错误', '错误: 未提交账单审核', 'error');
        return;
    }

    parent.call_win_view_of_approval_details_from_list(amc_id);
}

//查看客户银行账户信息
function win_view_of_bank_info_from_ca_list() {
    parent.call_win_view_of_bank_info_from_list(cur_selected_cap.relation_cu_id);
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
    parent.call_win_view_of_short_order_info(od_seq,od_no);
}

//打印
function print_cap_head() {

    var rows = $('#tab_cap_list').datagrid('getChecked');

    var amc_id = '';

    if (rows.length == 0) {
        $.messager.alert('错误','错误: 请选择需要打印的审核数据','error');
        return;
    }

    $.each(rows, function (i, row) {
        if (amc_id.length == 0) {
            amc_id = row.amc_id;
        } else {
            amc_id += ',' + row.amc_id;
        }
    });
    parent.call_win_view_of_print('print_pay_amc_head', amc_id);
    
}
function print_cap_body() {

    var rows = $('#tab_cap_list').datagrid('getChecked');

    var amc_id = '';

    if (rows.length == 0) {
        $.messager.alert('错误', '错误: 请选择需要打印的审核数据', 'error');
        return;
    }

    $.each(rows, function (i, row) {
        if (amc_id.length == 0) {
            amc_id = row.amc_id;
        } else {
            amc_id += ',' + row.amc_id;
        }
    });
    parent.call_win_view_of_print('print_pay_amc_body', amc_id);

}
function print_cap_all() {

    var rows = $('#tab_cap_list').datagrid('getChecked');

    var amc_id = '';

    if (rows.length == 0) {
        $.messager.alert('错误', '错误: 请选择需要打印的审核数据', 'error');
        return;
    }

    $.each(rows, function (i, row) {
        if (amc_id.length == 0) {
            amc_id = row.amc_id;
        } else {
            amc_id += ',' + row.amc_id;
        }
    });
    parent.call_win_view_of_print('print_pay_amc_all', amc_id);

}
function call_win_view_of_print(action, seq) {
    parent.call_win_view_of_print(action, seq);
}