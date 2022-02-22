var cur_service_collections = undefined;

var cur_addtions = {
    cur_ref_month_exchange_list: undefined,
    cur_od_delivery_cargo_info: undefined,
    cur_od_take_cargo_info: undefined,
};

 
//装载供应商
function load_page_service_info(showloading) {
    
     

   // $('#dv_service_list').html('');
    //反向清空tabs
    if ($('#tabs_service_list').tabs('tabs').length > 0) {
        var maxIndex = $('#tabs_service_list').tabs('tabs').length - 1;

        for (var i = maxIndex; i >= 0; i--) {
            $('#tabs_service_list').tabs('close', i);
        }
    }
    if (cur_ed_od_seq == undefined) {
        return;
    }

    post('../Ashx/exchange_rate.ashx', {
        rnd: Math.random(),
        action: 'get_month_exchange_rate_by_od_seq',
        od_seq: cur_ed_od_seq
    }, function (data) {
        $("#tab_dlg_exchange_month_rate").datagrid('loadData', data);
        cur_addtions.cur_ref_month_exchange_list = data.rows;
        post('../Ashx/order.ashx', {
            rnd: Math.random(),
            action: 'get_cargo_addtion_info',
            od_seq: cur_ed_od_seq
        }, function (data) {
            cur_addtions.cur_od_delivery_cargo_info = data.od_delivery_cargo_info;
            cur_addtions.cur_od_take_cargo_info = data.od_take_cargo_info;

            post('../Ashx/order.ashx', {
                rnd: Math.random(),
                action: 'get_service',
                od_seq: cur_ed_od_seq,
            }, function (data) {
                cur_service_collections = data.rows;

                if (data.rows.length > 0) {
                    $.each(data.rows, function (i, row) {
                        var content = '<iframe name="service" scrolling="auto" frameborder="0"  src="template_service_info.aspx?rnd=' +
                            Math.random() + '&od_seq=' +
                            cur_ed_od_seq + '&od_service_cu_id=' +
                            row.od_service_cu_id + '&od_service_seq=' +
                            row.od_service_seq + '&od_status_id=' +
                            row.od_status_id + '&od_service_cu_desc=' +
                            row.od_service_cu_desc +
                            '" style="width:100%;height:100%;"></iframe>';
                        $('#tabs_service_list').tabs('add', {
                            title: row.od_service_cu_desc,
                            content: content,
                            closable: true,
                            selected: true, //i >0 ? false:true,
                            border: false,
                        });

                        //
                        var i_tabs = $('#tabs_service_list').tabs('tabs').length - 1;

                        $($('#tabs_service_list').find('.tabs-close'))
                            .eq(i_tabs)
                            .data('od_service_cu_desc', row.od_service_cu_desc)
                            .data('od_service_seq', row.od_service_seq)
                            .unbind('click').bind('click', function () {
                                var od_service_seq = $(this).data('od_service_seq');
                                var od_service_cu_desc = $(this).data('od_service_cu_desc');
                                if (!can_edit_order()) {
                                    $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对服务商进行编辑操作', 'error');
                                    return;
                                }

                                if (cur_ed_od_seq == undefined) {
                                    $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
                                    return;
                                }

                                $.messager.confirm('删除提示', '请确认要删除服务商"' + od_service_cu_desc + '"的相关信息？',
                                function (r) {
                                    if (r) {
                                        post('../Ashx/order.ashx', {
                                            rnd: Math.random(),
                                            action: 'delete_service',
                                            od_seq: cur_ed_od_seq,
                                            od_service_seq: od_service_seq
                                        }, function (data) {
                                            if (data.result == 1) {
                                                $('#tabs_service_list').tabs('close', i_tabs);
                                                $.messager.alert('提示', data.msg, 'info');

                                                var new_arr = [];

                                                $.each(cur_service_collections, function (i, item) {
                                                    if (item.od_seq == cur_ed_od_seq &&
                                                        item.od_service_seq == od_service_seq) {

                                                    } else {
                                                        new_arr.push(item);
                                                    }
                                                });
                                                cur_service_collections = new_arr;
                                            } else {
                                                $.messager.alert('错误提示', data.msg, 'error');
                                                return;
                                            }
                                        }, true);
                                    }
                                });
                            });

                        //}
                        // 隐藏滚动条
                        $('#tabs_service_list').find('div[style^="display: block;"] > div').css({ 'overflow': 'hidden' });
                    });
                }
            }, showloading);

        }, false);

    }, false);
     
}

//显示界面
function show_page_service_info() {

    cur_site = 2;

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先保存订单。', 'error');
        return;
    }

    var continue_fun = function () {
        $('.dv_edit_order_menu_tab').removeClass('dv_edit_order_menu_tab_focus');
        $('.dv_edit_order_menu_tab').eq(1).addClass('dv_edit_order_menu_tab_focus');

        var $old_page = $cur_page;
        $cur_page = $('div.page_order_service_info');
        $old_page.fadeOut(50, function () {
            $cur_page.fadeIn(50, function () {
                $cur_page.layout({ fit: true });
                if ($('iframe[name="service"]') != undefined && $('iframe[name="service"]').length > 0) {

                    $.each($('iframe[name="service"]'), function (i, service) {
                        if ($.isFunction(service.contentWindow.call_child_fit)) {
                            service.contentWindow.call_child_fit();
                        }
                    });
                }

            });
        });
    }

    if (call_issame_cntr_list()) {
        continue_fun();
    } else {
        $.messager.confirm('保存提示', '注意: 委托集装箱明细发生变化但未保存，此变化会影响供应商服务板块内容。是否保存委托集装箱信息?', function (r) {
            if (r) { 
                call_save_order_cntr(continue_fun); 
            }  
        });
    }
}

function call_get_addtions() {
    return cur_addtions;
}

function call_service_change() {
    cur_od_servcie_change_flag = 1;
}

//添加 供应商 
function insert_service() {

    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对服务商进行编辑操作', 'error');
        return;
    }

    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }

    var new_od_service_cu_id = $('#ed_select_od_service_cu_id').data('cu_id');
    var new_od_service_cu_desc = $('#ed_select_od_service_cu_id').combogrid('getText');;

    if (new_od_service_cu_id == undefined || new_od_service_cu_id.length == 0  ) {
        $.messager.alert('错误提示', '错误: 请先选择正确的服务商，然后在执行新增操作', 'error');
        return;
    }

    var bRight = false;

    if (new_od_service_cu_id == '' || new_od_service_cu_id == undefined) {
        $.messager.alert('错误提示', '错误: 服务商\"' + new_od_service_cu_desc + '\"不是预设值', 'error');
        return;
    }

    
     
    var b_already_has = false; 
    if (cur_service_collections != undefined) {
        $.each(cur_service_collections, function (i, item) {
            if (item.od_service_cu_id == new_od_service_cu_id) {
                b_already_has = true;
            }
        });
    }

    //不允许添加已经存在的 
 
    if (b_already_has)
    {
        $.messager.alert('错误提示', '错误: 服务商已存在,不允许反复添加。', 'error');
        return; 
    } else {
        //后台新增
        post('../Ashx/order.ashx', {
            rnd: Math.random(),
            action: 'insert_service',
            od_seq: cur_ed_od_seq,
            od_service_cu_id: new_od_service_cu_id
        }, function (data) {
            if (data.result == 1) {
              
                var content = '<iframe scrolling="auto" frameborder="0"  src="template_service_info.aspx?rnd=' +
                    Math.random() + '&od_seq=' +
                    cur_ed_od_seq + '&od_service_cu_id=' +
                    new_od_service_cu_id + '&od_service_seq=' +
                    data.od_service_seq + '&od_status_id=' +
                    data.od_status_id + '&od_service_cu_desc=' +
                    data.od_service_cu_desc +
                    '" style="width:100%;height:100%;"></iframe>';
               
                $('#tabs_service_list').tabs('add', {
                    title: data.od_service_cu_desc,
                    content: content,
                    closable: true,
                    selected: true,
                    border: false,
                });

                cur_service_collections.push({
                    od_seq: cur_ed_od_seq,
                    od_service_cu_id: new_od_service_cu_id,
                    od_status_id: data.od_status_id,
                    od_service_seq: data.od_service_seq,
                    od_service_order_by: data.od_service_order_by,
                    od_service_cu_desc: data.od_service_cu_desc
                });

                var i_tabs = $('#tabs_service_list').tabs('tabs').length - 1;

                $($('#tabs_service_list').find('.tabs-close'))
                .eq(i_tabs)
                .data('od_service_cu_desc', data.od_service_cu_desc)
                .data('od_service_seq', data.od_service_seq)
                .unbind('click').bind('click', function () {
                    var od_service_seq = $(this).data('od_service_seq');
                    var od_service_cu_desc = $(this).data('od_service_cu_desc');
                    if (!can_edit_order()) {
                        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对服务商进行编辑操作', 'error');
                        return;
                    }

                    if (cur_ed_od_seq == undefined) {
                        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
                        return;
                    }

                    $.messager.confirm('删除提示', '请确认要删除服务商"' + od_service_cu_desc + '"的相关信息？',
                    function (r) {
                        if (r) {
                            post('../Ashx/order.ashx', {
                                rnd: Math.random(),
                                action: 'delete_service',
                                od_seq: cur_ed_od_seq,
                                od_service_seq: od_service_seq
                            }, function (data) {
                                if (data.result == 1) {
                                    $('#tabs_service_list').tabs('close', i_tabs);

                                    $.messager.alert('提示', data.msg, 'info');
                                } else {
                                    $.messager.alert('错误提示', data.msg, 'error');
                                    return;
                                }
                            }, true);
                        }
                    });
                });

                //}
                // 隐藏滚动条
                $('#tabs_service_list').find('div[style^="display: block;"] > div').css({ 'overflow': 'hidden' });
            } else {
                $.messager.alert('错误', data.msg, 'error');
            }
        }, true);
    } 
}
 
