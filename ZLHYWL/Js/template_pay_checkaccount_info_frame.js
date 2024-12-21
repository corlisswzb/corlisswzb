var cur_amc_id = undefined;
var cur_amc = undefined;
var cur_next_amc_opr_info = undefined;
var clumn_fliter_of_bus_ca_list = undefined;
 
$(document).ready(function () {
    init_tab_fee_list_of_ca();
    cur_amc_id = getQueryVariable('amc_id');
    get_ap_checkaccount_collections();
    
});


//获取资料 
function get_ap_checkaccount_collections() {
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_ap_checkaccount_single_full_collections',
        amc_id: cur_amc_id
    }, function (data) {
        cur_amc = data;

        var amc_base = data.amc_base[0];
        $('#sp_amc_title').val(amc_base.amc_title);
        $('#sp_relation_no').val(amc_base.relation_no);
        $('#sp_relation_c_desc').val(amc_base.relation_c_desc);
        $('#sp_amc_status_desc').val(amc_base.amc_status_desc);
        $('#sp_relation_cu_desc').val(amc_base.relation_cu_desc);
        $('#sp_fee_total').val(amc_base.relation_ca_total_amount_desc);
        $('#sp_fee_total_finaced').val(amc_base.relation_ca_woa_total_amount_desc);
        $('#sp_fee_total_unfinaced').val(amc_base.relation_ca_unwoa_total_amount_desc);

        $('#sp_ca_actual_user_desc').val(amc_base.relation_user);

        $('#sp_amc_bak').val(amc_base.amc_bak);
        $('#sp_amc_create_by_nam').val(amc_base.amc_create_by_nam);
        $('#sp_amc_cur_opr_nam').val(amc_base.amc_cur_opr_nam);
        $('#sp_amc_create_dat').val(dateformat(amc_base.amc_create_dat, true));
        $('#sp_amc_finish_dat').val(dateformat(amc_base.amc_finish_dat, true));
 
        cur_fee_list_of_ca = data.fee_details[0];

        clumn_fliter_of_bus_ca_list.columns_fliters('reset_target_data_and_clumns_fliter', data.fee_details[0].rows);
        table_bottom_group_desc(data.fee_details[0].group_fee_desc, data.fee_details[0].total, 'all_group_order_fee_of_ca', -1);

       
         
        refresh_approval_flow_details();


    },true);
}
//初始化 账单关联的 费用
function init_tab_fee_list_of_ca() {

    $("#tab_fee_list_of_ca").datagrid({
        data: [],
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true,
        nowrap: true,
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
        ]],
        columns: [[
                 { title: ' ', align: 'center', colspan: 3 }
                , { title: '费用详情', align: 'center', colspan: 13 }
                , { title: '委托及其他信息', align: 'center', colspan: 4 }
                
        ],
            [
                {
                    field: 'fee_status_desc',   title: '费用状态', sortable: true, width: 58,
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
                field: 'od_no',   title: '业务编号', sortable: true, width: 88,
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
            , {
                field: 'od_status_desc',  title: '订单状态', width: 56, sortable: true,
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
             , {
                 field: 'fee_dat', title: '业务时间', sortable: true, width: 78,
                 formatter: function (value, row, index) {
                     return dateformat(value, true);
                 }
             }
             , {
                 field: 'od_main_bill_no', title: '提单号', width: 210, sortable: true,
             }
              , {
                  field: 'od_beg_place_desc', title: '起运地', width: 90, sortable: true,
              }
              , {
                  field: 'od_end_place_desc', title: '目的地', width: 90, sortable: true,
              }
              , {
                  field: 'fee_item_typ', title: '费项', sortable: true, width: 80,
                  formatter: function (value, row, index) {
                      return row.fee_item_typ_desc;
                  }
              }
              , {
                  field: 'fee_price', title: '单价', sortable: true, width: 80,
                  formatter: function (value, row, index) {
                      return '(' + row.fee_currency_symbol + ')' + Number(value).toFixed(2);
                  },
              }
               , {
                   field: 'fee_currency_rate', title: '汇率', width: 54, sortable: true,
                   formatter: function (value, row, index) {
                       return Number(value).toFixed(4);
                   }
               }
              , {
                  field: 'fee_number', title: '数量', sortable: true, width: 54,
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
                   field: 'fee_amount', title: '小计金额', width: 90, sortable: true,
                   formatter: function (value, row, index) {
                       return '(' + row.fee_currency_symbol + ')' + Number(value).toFixed(2);
                   },
                   styler: function (value, row, index) {
                       return 'background-color:#b3e7c7;color:#000';
                   }
               }
               , {
                   field: 'fee_invoice_typ', title: '发票类型', sortable: true, width: 70,
                    formatter: function (value, row, index) {
                        return row.fee_invoice_typ_desc;
                    }
               }
               , {
                   field: 'fee_record_nam', title: '记录人', width: 54, sortable: true,
               }
               , {
                   field: 'woa_total_amount', title: '已付', width: 70, sortable: true,
                   formatter: function (value, row, index) {
                       return Number(value).toFixed(2);
                   }
               }
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
                    field: 'reced_total_amount', title: '总实收', width: 80, sortable: true,
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
                    field: 'unreced_total_amount', title: '总未收', width: 80, sortable: true,
                    formatter: function (value, row, index) {
                        return Number(row.unreced_total_amount).toFixed(2);
                    },
                    styler: function (value, row, index) {
                        if (Number(row.rec_total_amount) == 0 || Number(row.unreced_total_amount) == 0) return 'background-color:#fff;color:#000;';
                        else return 'background-color:#f9b9f5;color:#000;';
                    }
                } 
                , {
                    field: 'woa_total_amount', title: '总已付', width: 80, sortable: true,
                    formatter: function (value, row, index) {
                        return Number(value).toFixed(2);
                    }
                } 
            
            ]],
        onLoadSuccess: function (data) { 
            refresh_fee_list_of_ca_footer();
            if (!clumn_fliter_of_bus_ca_list) {
                clumn_fliter_of_bus_ca_list = $('#columns_fliters').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_fee_list_of_ca'),
                    cur_cls_target_body: 'cls_ca_region'
                });
            }
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
//刷新 tab_fee_list 所在页面的 统计信息 
// 
//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_fee_list_of_ca_footer() {
    table_bootom_selected_desc_have_symbol($('#tab_fee_list_of_ca'), 'selected_group_order_fee_of_ca', -1); 
}
//清空条件 
function clear_query_tab_fee_list_params() {
    clumn_fliter_of_bus_ca_list.columns_fliters('clear');
}
 

//查看所有费用 
function view_all_service_info(od_service_seq, od_service_sub_seq) {


    var od_service_list = cur_amc.order_service_list;

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
                            Math.random() + '&ca_seq=' +
                            service_item.ca_seq + '&od_service_seq=' +
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
                            Math.random() + '&ca_seq=' +
                            service_item.ca_seq + '&od_service_seq=' +
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
    var amc_base = cur_amc.amc_base[0];

    if (amc_base.amc_status != 1 || (
        amc_base.amc_status == 1 &&
        amc_base.is_my_point != 1
        )) {
        $.messager.alert('错误','当前不是你的审核，无法提交','error');
    } else {
        var amc_id = amc_base.amc_id;
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
                             get_ap_checkaccount_collections();
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
    var amc_base = cur_amc.amc_base[0];
    if (amc_base.amc_status != 1 || (
        amc_base.amc_status == 1 &&
        amc_base.is_my_point != 1
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
                     amc_id: amc_base.amc_id,
                 }, function (data) {
                     if (data.result == 1) {
                         //重新获取
                         get_ap_checkaccount_collections();
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
    var amc_base = cur_amc.amc_base[0];
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_amc_actual_flow_details',
        amc_id: amc_base.amc_id,
        is_my_point: amc_base.is_my_point,

    }, function (data) {

        if (amc_base.amc_status != 1 || (
            amc_base.amc_status == 1 &&
            amc_base.is_my_point != 1
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

