var cur_od_seq = undefined;
var cur_od_service_seq = undefined;
var cur_od_service_cu_id = undefined;
var cur_od_status_id = undefined;
var cur_od_service_cu_desc = undefined;

var cur_addtions = undefined;

var basesetting = {};
var cur_order_collections = {};

$(document).ready(function () {
    basesetting = parent.call_get_father_basesetting();
    cur_order_collections = parent.call_get_father_cur_order_collections();
    cur_addtions = parent.call_get_addtions();
    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];

    cur_od_seq = cur_order.od_seq;
    cur_od_status_id = cur_order.od_status_id;
    cur_od_service_cu_id = getQueryVariable('od_service_cu_id');
    cur_od_service_seq = getQueryVariable('od_service_seq'); 
    cur_od_service_cu_desc = decodeURI(getQueryVariable('od_service_cu_desc'));
     
    if (cur_od_status_id != undefined && Number(cur_od_status_id) == 1) {
        $('#cur_od_status_id').linkbutton('disable'); 
    } else {
        $('#cur_od_status_id').linkbutton('enable');
    }

    //文档加载之后，需要 重新fit一下，不按会 按照宽度100px显示 
     
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'get_service_sub',
        od_seq: cur_od_seq,
        od_service_seq: cur_od_service_seq,
    }, function (data) {
        if (data.rows.length > 0) {
            $.each(data.rows, function (i, row) {
                
                var od_service_sub_desc = '服务批次-' + row.od_service_sub_order_by;

                var content = '<iframe name="sub_seq"  scrolling="auto" frameborder="0"  src="template_service_info_sub.aspx?rnd=' +
                    Math.random() + '&od_seq=' +
                    cur_od_seq + '&od_service_seq=' +
                    cur_od_service_seq + '&od_service_sub_seq=' +
                    row.od_service_sub_seq + '&od_status_id=' +
                    cur_od_status_id + '&od_service_cu_id=' +
                    cur_od_service_cu_id + '&od_service_cu_desc=' +
                    cur_od_service_cu_desc +  
                    '" style="width:100%;height:100%;"></iframe>';
                
                $('#tabs').tabs('add', {
                    title: od_service_sub_desc,
                    content: content,
                    closable: true,
                    selected: i > 0 ?false:true,
                    border: false,
                    fit:true,
                });

                var i_tabs = $('#tabs').tabs('tabs').length - 1;

                $($('#tabs').find('.tabs-close'))
                .eq(i_tabs)
                .data('od_service_sub_desc', od_service_sub_desc) 
                .data('od_service_sub_seq', row.od_service_sub_seq)
                .unbind('click').bind('click', function () {
                    var od_service_sub_seq = $(this).data('od_service_sub_seq');  
                    var od_service_sub_desc = $(this).data('od_service_sub_desc');

                    if (cur_od_status_id != 1) {
                        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对服务批次进行编辑操作', 'error');
                        return;
                    }

                    if (cur_od_seq == undefined) {
                        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
                        return;
                    }

                    $.messager.confirm('删除提示', '请确认要删除服务批次"' + od_service_sub_desc + '"的相关信息？',
                    function (r) {
                        if (r) {
                            post('../Ashx/order.ashx', {
                                rnd: Math.random(),
                                action: 'delete_service_sub',
                                od_seq: cur_od_seq,
                                od_service_seq: cur_od_service_seq,
                                od_service_sub_seq: od_service_sub_seq
                            }, function (data) {
                                if (data.result == 1) {
                                    $('#tabs').tabs('close', i_tabs);

                                    $.messager.alert('提示', data.msg, 'info');
                                } else {
                                    $.messager.alert('错误提示', data.msg, 'error');
                                    return;
                                }
                            }, true);
                        }
                    });
                });

                // 隐藏滚动条
                $('#tabs').find('div[style^="display: block;"] > div').css({ 'overflow': 'hidden' });
            });
        }

        
    },true);

});

function call_get_father_basesetting() {
    return basesetting;
}
function call_get_addtions() {
    return cur_addtions;
}
function call_get_father_cur_order_collections() {
    return cur_order_collections; 
    
}

function call_issame_cntr_list() {
    return parent.call_issame_cntr_list();
}

//单独存储集装箱明细 
function call_save_order_cntr(continue_fun) { 
    parent.call_save_order_cntr(continue_fun);
}

function call_service_change() {
    parent.call_service_change();
}
//新增服务批次
function insert_service_sub() {
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'insert_service_sub',
        od_seq: cur_od_seq,
        od_service_seq: cur_od_service_seq
    }, function (data) {
        if (data.result == 1) {
            var od_service_sub_desc = '服务批次-' + data.od_service_sub_order_by;
         
            var content = '<iframe name="sub_seq" scrolling="auto" frameborder="0"  src="template_service_info_sub.aspx?rnd=' +
                    Math.random() + '&od_seq=' +
                    cur_od_seq + '&od_service_seq=' +
                    cur_od_service_seq + '&od_service_sub_seq=' +
                    data.od_service_sub_seq + '&od_status_id=' +
                    cur_od_status_id + '&od_service_cu_id=' +
                    cur_od_service_cu_id + '&od_service_cu_desc=' +
                    cur_od_service_cu_desc +   
                    '" style="width:100%;height:100%;"></iframe>';
            
            $('#tabs').tabs('add', {
                title: od_service_sub_desc,
                content: content,
                closable: true,
                selected: true,
                border: false,
            });

            var i_tabs = $('#tabs').tabs('tabs').length - 1;

            $($('#tabs').find('.tabs-close'))
            .eq(i_tabs)
            .data('od_service_sub_desc', od_service_sub_desc)
            .data('od_service_sub_seq', data.od_service_sub_seq)
            .unbind('click').bind('click', function () {
                var od_service_sub_seq = $(this).data('od_service_sub_seq');
                var od_service_sub_desc = $(this).data('od_service_sub_desc');

                if (cur_od_status_id != 1) {
                    $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对服务批次进行编辑操作', 'error');
                    return;
                }

                if (cur_od_seq == undefined) {
                    $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
                    return;
                }

                $.messager.confirm('删除提示', '请确认要删除服务批次"' + od_service_sub_desc + '"的相关信息？',
                function (r) {
                    if (r) {
                        post('../Ashx/order.ashx', {
                            rnd: Math.random(),
                            action: 'delete_service_sub',
                            od_seq: cur_od_seq,
                            od_service_seq: cur_od_service_seq,
                            od_service_sub_seq: od_service_sub_seq
                        }, function (data) {
                            if (data.result == 1) {
                                $('#tabs').tabs('close', i_tabs);

                                $.messager.alert('提示', data.msg, 'info');
                            } else {
                                $.messager.alert('错误提示', data.msg, 'error');
                                return;
                            }
                        }, true);
                    }
                });
            });

            // 隐藏滚动条
            $('#tabs').find('div[style^="display: block;"] > div').css({ 'overflow': 'hidden' });
            call_child_fit();

        } else {
            $.messager.alert('错误提示', data.msg, 'error')
        }
    },true);
}
 

function call_child_fit() { 
    $('#tabs').tabs({ fit: true });

    if ($('iframe[name="sub_seq"]') != undefined && $('iframe[name="sub_seq"]').length > 0) {

        $.each($('iframe[name="sub_seq"]'), function (i, service) {
            if ($.isFunction(service.contentWindow.call_child_fit)) {
                service.contentWindow.call_child_fit();
            } 
        });
    }
     

}