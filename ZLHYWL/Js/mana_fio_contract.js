//默认第一页，
var pageNumber = 1;
//每页显示10行
var pageSize = 30;

//定义参数 

var basesetting = undefined;
  

var data_fio_contract_details = undefined;

var menu_select_fioc_id = undefined;
var cur_select_fioc_id = undefined;

var menu_select_group_area_id = undefined;
var cur_select_group_area_id = undefined;

//表头筛选菜单 
var clumn_fliter_of_fio_fee = undefined;


$(document).ready(function () {
   
    //dialog关闭 
    $('#dlg_edit_fio_contract').dialog({
        title: '',
        iconCls: 'icon-add',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 140,
    }).dialog('close');
    $('#dlg_add_fio_group_area').dialog({
        title: '',
        iconCls: 'icon-add',
        autoOpen: false,
        modal: true,
        width: 350,
        minheight: 140,
    }).dialog('close');
   

    //控制单价，只能是数字 
    $('.validatebox-numeric').keyup(function () {
        $(this).val($(this).val().replace(/[^\d.]/g, ''));
    }); 
    //加载基础数据
    getbasesetting();

})

/*初始化*/

/*获取基础信息*/
function getbasesetting() {
   post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        
            basesetting = data;
          

            bind_combogrid_custom($('#dlg_fioc_cu_id'));
            bind_combogrid_custom($('#dlg_fioc_ship_rent_cu_id'));
            ////绑定装卸地
            bind_combobox(data.area_list, $('#dlg_load_area_id'), 'area_desc', 'area_id', false);
            bind_combobox(data.area_list, $('#dlg_disc_area_id'), 'area_desc', 'area_id', false);
            bind_combobox(data.currency_list, $('#dlg_fioc_cr_id'), 'cr_name', 'cr_id', false);
            bind_combobox(data.invoice_list, $('#dlg_fioc_invoice_typ'), 'in_name', 'in_id', false);
            bind_combobox(data.invoice_list, $('#edit_invoice_id'), 'in_name', 'in_id', false);

            init_fio_contract_details_tab();
            //load_fio_contract_details();//cs

            //装载合同 
            load_fio_contract();
        

    }, true);
}


 


/*****************************************************************************/
function load_fio_group_area_list(fioc_id) {
    post('../Ashx/fio_fee_contract.ashx', {
        rnd: Math.random(),
        action: 'get_fio_group_area',
        fioc_id: fioc_id
    }, function (data) {
        
        $('#tab_fio_contract_details').datagrid('loadData', { total: 0, rows: [] });
        //显示合同 
        data_fio_group_area_list = data.rows;
        show_fio_group_area_list();
         
    }, true);
}
/*显示地点组合*/
function show_fio_group_area_list() {

    /* 点击地点组合菜单 */
    var click_li = function (obj) {

        var now_fioc_id = $('.li_ss_menuitem_selected').eq(0).data('fioc_id');

        if (now_fioc_id == undefined || now_fioc_id.length == 0) {
            $.messager.alert('提示', '请先选择合同！', 'error');
            return;
        }

        $('.li_item').removeClass('li_item_selected');
        $(obj).addClass('li_item_selected');
        var now_select_group_area_id = $(obj).data('fio_group_area_id');
        if (cur_select_group_area_id == now_select_group_area_id) {
            return;
        }
        cur_select_group_area_id = now_select_group_area_id;
        load_fio_contract_details();
    }

    var likestr = $('#ipt_client_query_fio_group_area').val(); 
    $('#fio_group_area_list').html('');
    var $ul_rec = $('<ul class="ul_lditem"></ul>"');
    $.each(data_fio_group_area_list, function (i, row) {
        var $li = undefined;

        var selectd = '';
        if (cur_select_group_area_id != undefined && row.fio_group_area_id == cur_select_group_area_id) {
            selectd = 'li_item_selected';
            load_fio_contract_details();
        } else { 
            $('#tab_fio_contract_details').datagrid('loadData', { total: 0, rows: [] });
        }

        if (likestr.length == 0) {
            $li = $('<li class="li_item ' + selectd + '"><span class="fa fa-ship contract_cls">【' + row.load_desc + '】</span>——<span class="fa fa-anchor contract_cls">【' + row.disc_desc + '】</span></li>');
        } else {
            if (row.disc_desc.toUpperCase().indexOf(likestr.toUpperCase()) > -1 || 
                row.load_desc.toUpperCase().indexOf(likestr.toUpperCase()) > -1) {
                $li = $('<li class="li_item ' + selectd + '"><span class="fa fa-ship contract_cls">【' + row.load_desc + '】</span>——<span class="fa fa-anchor contract_cls">【' + row.disc_desc + '】</span></li>');
            }
        }

        if ($li != undefined) {
            $li.data('fioc_id', row.fioc_id).data('fio_group_area_id', row.fio_group_area_id);
            /*绑定菜单*/
            $li.bind('contextmenu', function (e) {
                $('#fio_group_area_list_menu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
                $('#fio_group_area_list_menu').data('fioc_id', $(this).data('fioc_id')).data('fio_group_area_id', $(this).data('fio_group_area_id'));
                e.preventDefault();
            });

            $li.off('click').on('click', function () {
                click_li(this);
            });

            $ul_rec.append($li);
        } 

    });
    $("#fio_group_area_list").append($ul_rec);

}

/*模糊查询 地点组合*/
function client_query_fio_group_area(obj) {
    cur_select_group_area_id = undefined;
    show_fio_group_area_list();
}
/*
 地点组合 编辑菜单
*/
function edit_group_area() {
    if (cur_select_fioc_id == undefined) {
        $.messager.alert('错误', '请先选择合同协议', 'error');
        return;
    }

    var edit_group_area_id = $('#fio_group_area_list_menu').data('fio_group_area_id');
    var edit_fioc_id = cur_select_fioc_id;

    $('#dlg_edit_group_area_id').val(edit_group_area_id);

    $.each(data_fio_group_area_list, function (i, row) {
        if (row.fio_group_area_id == edit_group_area_id) {
            $('#dlg_load_area_id').combobox('setValue', row.load_area_id);
            $('#dlg_disc_area_id').combobox('setValue', row.disc_area_id);
        }
    });
    $('#dlg_add_fio_group_area').dialog({
        title: '编辑地点组合',
        iconCls: 'icon-edit',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var params = {
                        action: 'update_fio_group_area',
                        rnd: Math.random(),
                        fio_group_area_id: edit_group_area_id,
                        load_area_id: $('#dlg_load_area_id').combobox('getValue'),
                        disc_area_id: $('#dlg_disc_area_id').combobox('getValue'),
                        fioc_id: cur_select_fioc_id
                    };

                    if (params.load_area_id == undefined || params.load_area_id.length == 0) {
                        $.messager.alert('错误', '起始地点必须填写', 'error'); 
                        return;
                    }

                    if (params.disc_area_id == undefined || params.disc_area_id.length == 0) {
                        $.messager.alert('错误', '目的地点必须选择', 'error'); 
                        return;
                    }
                    
                    post('../Ashx/fio_fee_contract.ashx', params, function (data) { 
                        if (data.result == 1) {
                            $('#dlg_add_fio_group_area').dialog('close');
                            $.messager.alert('提示', data.msg, 'info', function () {
                                load_fio_group_area_list(cur_select_fioc_id);
                            });
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        }
                         
                    }, true);
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('.validatebox-tip').remove();
                    $('#dlg_add_fio_group_area').dialog('close');
                }
            }]
    }).dialog('open');

}
function new_group_area() {

    if (cur_select_fioc_id == undefined) {
        $.messager.alert('错误','请先选择合同协议','error');
        return;
    }

    $('#dlg_eitd_fio_group_area_form').form('clear');
    $('#dlg_edit_group_area_id').val('');

    $('#dlg_add_fio_group_area').dialog({
        title: '新建地点组合',
        iconCls: 'icon-save',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var params = {
                        action: 'insert_fio_group_area',
                        rnd: Math.random(),
                        load_area_id: $('#dlg_load_area_id').combobox('getValue'),
                        disc_area_id: $('#dlg_disc_area_id').combobox('getValue'),
                        fioc_id: cur_select_fioc_id
                    };

                    if (params.load_area_id == undefined || params.load_area_id.length == 0) {
                        $.messager.alert('错误', '起始地点必须填写', 'error');
                        return;
                    }

                    if (params.disc_area_id == undefined || params.disc_area_id.length == 0) {
                        $.messager.alert('错误', '目的地点必须选择', 'error');
                        return;
                    } 
                    
                    post('../Ashx/fio_fee_contract.ashx', params, function (data) { 
                        if (data.result == 1) {
                            $('#dlg_add_fio_group_area').dialog('close');
                            $.messager.alert('提示', data.msg, 'info', function () {
                                load_fio_group_area_list(cur_select_fioc_id);
                            }); 
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        } 
                    }, true);
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('.validatebox-tip').remove();
                    $('#dlg_add_fio_group_area').dialog('close');
                }
            }]
    }).dialog('open');

}
function delete_group_area() {
    if (cur_select_fioc_id == undefined) {
        $.messager.alert('错误', '请先选择合同协议', 'error');
        return;
    }


    var delete_group_area_id = $('#fio_group_area_list_menu').data('fio_group_area_id');
    var delete_load_desc = '';
    var delete_disc_desc = '';

    $.each(data_fio_group_area_list, function (i, row) {
        if (row.fio_group_area_id == delete_group_area_id) {
            delete_load_desc = row.load_desc;
            delete_disc_desc = row.disc_desc;
        }
    });

    $.messager.confirm('删除地点组合操作提示', '确定要删除[' + delete_load_desc + '----' + delete_disc_desc + ']组合吗？', function (r) {
        if (r) {
            post('../Ashx/fio_fee_contract.ashx', {
                rnd: Math.random(),
                action: 'delete_fio_group_area',
                fio_group_area_id: delete_group_area_id,
                fioc_id: cur_select_fioc_id
            }, function (data) {
                if (data.result == 1) {
                    $('#dlg_add_fio_group_area').dialog('close');
                    $.messager.alert('提示', data.msg, 'info', function () {
                        if (cur_select_group_area_id == delete_group_area_id) {
                            cur_select_group_area_id = undefined;
                        }
                        load_fio_group_area_list(cur_select_fioc_id);
                    });
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                } 
            }, true);
        }
    });

}
function copy_group_area() {
    if (cur_select_fioc_id == undefined) {
        $.messager.alert('错误', '请先选择合同协议', 'error');
        return;
    }
    var copy_group_area_id = $('#fio_group_area_list_menu').data('fio_group_area_id');
    var copy_load_desc = '';
    var copy_disc_desc = '';
    var load_area_id = undefined;
    var disc_area_id = undefined;

    $.each(data_fio_group_area_list, function (i, row) {
        if (row.fio_group_area_id == copy_group_area_id) {
            copy_load_desc = row.load_desc;
            copy_disc_desc = row.disc_desc;
            disc_area_id = row.disc_area_id;
            load_area_id = row.load_area_id;
        }
    });

    $.messager.confirm('起点终点互换位置操作提示', '确定要生成[' + copy_disc_desc + '----' + copy_load_desc + ']组合吗？', function (r) {
        if (r) {
            post('../Ashx/fio_fee_contract.ashx', {
                rnd: Math.random(),
                action: 'insert_fio_group_area_by_change',
                copy_fio_group_area_id:copy_group_area_id,
                fioc_id: cur_select_fioc_id
            }, function (data) {
                if (data.result == 1) { 
                    $.messager.alert('提示', data.msg, 'info', function () {
                        load_fio_group_area_list(cur_select_fioc_id);
                    });
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                } 
            }, true);
        }
    });

}

function copy_new_group_area() {
    if (cur_select_fioc_id == undefined) {
        $.messager.alert('错误', '请先选择合同协议', 'error');
        return;
    }
    var edit_group_area_id = $('#fio_group_area_list_menu').data('fio_group_area_id');
    var copy_load_desc = '';
    var copy_disc_desc = '';
    var load_area_id = undefined;
    var disc_area_id = undefined;
    $.each(data_fio_group_area_list, function (i, row) {
        if (row.fio_group_area_id == edit_group_area_id) {
            copy_load_desc = row.load_desc;
            copy_disc_desc = row.disc_desc;
            disc_area_id = row.disc_area_id;
            load_area_id = row.load_area_id;
        }
    });
    $('#dlg_load_area_id').combobox('setValue', '');
    $('#dlg_disc_area_id').combobox('setValue', '');
    $('#dlg_edit_fio_group_area_title').html('拷贝[' + copy_disc_desc + '----' + copy_load_desc + ']新建');
    $('#dlg_add_fio_group_area').dialog({
        title: '拷贝新建 ',
        iconCls: 'icon-edit',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var params = {
                        action: 'insert_fio_group_area_by_copy',
                        rnd: Math.random(),
                        copy_fio_group_area_id: edit_group_area_id,
                        load_area_id: $('#dlg_load_area_id').combobox('getValue'),
                        disc_area_id: $('#dlg_disc_area_id').combobox('getValue'),
                        fioc_id: cur_select_fioc_id
                    };

                    if (params.load_area_id == undefined || params.load_area_id.length == 0) {
                        $.messager.alert('错误', '起始地点必须填写', 'error');
                        return;
                    }

                    if (params.disc_area_id == undefined || params.disc_area_id.length == 0) {
                        $.messager.alert('错误', '目的地点必须选择', 'error');
                        return;
                    }
                     
                    post('../Ashx/fio_fee_contract.ashx', params, function (data) {
                        if (data.result == 1) {
                            $('#dlg_add_fio_group_area').dialog('close');
                            $.messager.alert('提示', data.msg, 'info', function () {
                                load_fio_group_area_list(cur_select_fioc_id);
                            });
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        }
                    }, true);
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('.validatebox-tip').remove();
                    $('#dlg_add_fio_group_area').dialog('close');
                }
            }]
    }).dialog('open');

}
 

/*****************************************************************************/
 

/*获取 合同列表、地点组合列表*/
function load_fio_contract() {
    post('../Ashx/fio_fee_contract.ashx', {
        rnd: Math.random(),
        action: 'get_fio_contract'
    }, function (data) {
         
            $('#fio_group_area_list').html('');
            $('#tab_fio_contract_details').datagrid('loadData', { total: 0, rows: [] });

            data_fio_contract_list = data.rows;
            //显示合同 
            show_fio_contract_list( );
         
    }, true);
}
/*显示合同*/
function show_fio_contract_list() {
    var likestr = $('#ipt_client_query_fio_contract').val();
    $(".ul_ss_menu").html('');

    /* 点击合同菜单 */
    var click_li = function (obj) {
        $('.li_ss_menuitem').removeClass('li_ss_menuitem_selected');
        $(obj).addClass('li_ss_menuitem_selected');
        var now_select_fioc_id = $(obj).data('fioc_id');
        if (now_select_fioc_id == cur_select_fioc_id) {
            return;
        }
        cur_select_fioc_id = now_select_fioc_id;
        load_fio_group_area_list(cur_select_fioc_id);
    }


    $.each(data_fio_contract_list, function (i, row) {
        var $li = undefined;

        var std_desc = '';
        var validate_desc = '';
        var selectd = '';
        if (row.fioc_std_flag == 1) {
            std_desc = '<span class="span_std_title">【标准】</span>'
        }

        if (row.fioc_validate_flag == 1) {
            validate_desc = '<span class="span_validate_title">【过期】</span>';
        }
        if (cur_select_fioc_id != undefined && row.fioc_id == cur_select_fioc_id) {
            selectd = 'li_ss_menuitem_selected'; 
            load_fio_group_area_list(cur_select_fioc_id);
        } else {
            $('#fio_group_area_list').html('');
            $('#tab_fio_contract_details').datagrid('loadData', { total: 0, rows: [] });
        }

        if (likestr.length == 0) {
            $li = $('<li class="li_ss_menuitem ' + selectd + '"  > <span class="contract_cls"><i class="fa fa-handshake-o"></i> ' + row.fioc_desc + validate_desc + '</span>' + std_desc + '</li>');
            
        } else {
            if (row.fioc_desc.toUpperCase().indexOf(likestr.toUpperCase()) > -1) {
                $li = $('<li class="li_ss_menuitem ' + selectd + '"    > <span class="contract_cls"><i class="fa fa-handshake-o"></i> ' + row.fioc_desc + validate_desc + '</span>' + std_desc + '</li>');
                
            }
        }

        /*绑定菜单*/
        $li.data('fioc_id', row.fioc_id).data('fioc_desc', row.fioc_desc);
        $li.bind('contextmenu', function (e) {
            $('#fio_contract_list_menu').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
            $('#fio_contract_list_menu').data('fioc_id', $(this).data('fioc_id')).data('fioc_desc', $(this).data('fioc_desc'));
            e.preventDefault();
        });
        $li.off('click').on('click', function () {
            click_li(this);
        });

        $(".ul_ss_menu").append($li);


    });
}

/*模糊查询 合同*/
function client_query_fio_contract(obj) {
    cur_select_fioc_id = undefined;
    cur_select_group_area_id = undefined; 

    show_fio_contract_list();
}

/*
合同编辑菜单
*/
function edit_fioc() {
    var edit_fioc_id = $('#fio_contract_list_menu').data('fioc_id');
    $('#dlg_edit_fioc_id').val(edit_fioc_id);
    $('#dlg_copy_new_tips').hide();
    $.each(data_fio_contract_list, function (i, row) {
        if (row.fioc_id == edit_fioc_id) {
            $('#dlg_fioc_desc').val(row.fioc_desc);
            $('#dlg_fioc_cu_id').data('cu_id', row.fioc_cu_id);
            $('#dlg_fioc_cu_id').combogrid('setText', row.fioc_cu_desc);

            $('#dlg_fioc_ship_rent_cu_id').data('cu_id', row.fioc_ship_rent_cu_id);
            $('#dlg_fioc_ship_rent_cu_id').combogrid('setText', row.fioc_ship_rent_cu_desc);

            $('#dlg_fioc_sign_dat').datebox('setValue', dateformat(row.fioc_sign_dat, true));
            $('#dlg_fioc_begin_dat').datebox('setValue', dateformat(row.fioc_begin_dat, true));
            $('#dlg_fioc_end_dat').datebox('setValue', dateformat(row.fioc_end_dat, true));
            $('#dlg_fioc_invoice_typ').combobox('setValue',row.fioc_invoice_typ);
            $('#dlg_fioc_cr_id').combobox('setValue',row.fioc_cr_id);

        }
    });
    $('#dlg_edit_fio_contract').dialog({
        title: '编辑合同',
        iconCls: 'icon-edit',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var params = {
                        action: 'update_fio_contract',
                        rnd: Math.random(),
                        fioc_id: edit_fioc_id,
                        fioc_desc: $.trim($('#dlg_fioc_desc').val()).toUpperCase(),
                        fioc_cu_id: $('#dlg_fioc_cu_id').data('cu_id'),
                        fioc_ship_rent_cu_id: $('#dlg_fioc_ship_rent_cu_id').data('cu_id'),
                        fioc_sign_dat: $('#dlg_fioc_sign_dat').datebox('getValue'),
                        fioc_begin_dat: $('#dlg_fioc_begin_dat').datebox('getValue'),
                        fioc_end_dat: $('#dlg_fioc_end_dat').datebox('getValue'),
                        fioc_invoice_typ: $('#dlg_fioc_invoice_typ').combobox('getValue'),
                        fioc_cr_id: $('#dlg_fioc_cr_id').combobox('getValue'),
                    };

                    if (params.fioc_desc == undefined || params.fioc_desc == '') {
                        $.messager.alert('错误', '错误:合同名称必须填写', 'error');
                        return;
                    }
                    if (params.fioc_ship_rent_cu_id == undefined || params.fioc_ship_rent_cu_id == '') {
                        $.messager.alert('错误', '错误:船东必须选择', 'error');
                        return;
                    }

                    if (params.fioc_cu_id == undefined || params.fioc_cu_id == '') {
                        $.messager.alert('错误', '错误:结算单位必须选择', 'error');
                        return;
                    }

                    if (params.fioc_sign_dat == undefined || params.fioc_sign_dat == '') {
                        $.messager.alert('错误', '错误:签约时间必须选择', 'error');
                        return;
                    }
                    if (params.fioc_invoice_typ == undefined || params.fioc_invoice_typ == '') {
                        $.messager.alert('错误', '错误:发票税点必须选择', 'error');
                        return;
                    }
                    if (params.fioc_cr_id == undefined || params.fioc_cr_id == '') {
                        $.messager.alert('错误', '错误:币种必须选择', 'error');
                        return;
                    }

                    post('../Ashx/fio_fee_contract.ashx', params, function (data) { 
                        if (data.result == 1) {
                            $('#dlg_edit_fio_contract').dialog('close');
                            $.messager.alert('提示', data.msg, 'info', function () {
                                load_fio_contract();
                            });
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        } 
                    }, true);
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('.validatebox-tip').remove();
                    $('#dlg_edit_fio_contract').dialog('close');
                }
            }]
    }).dialog('open');

}
function new_fioc() {
    $('#dlg_eitd_fio_contract_form').form('clear');
    $('#dlg_edit_fioc_id').val('');
    $('#dlg_copy_new_tips').hide();
    $('#dlg_edit_fio_contract').dialog({
        title: '新建合同',
        iconCls: 'icon-save',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var params = {
                        action: 'insert_fio_contract',
                        rnd: Math.random(),
                        fioc_desc: $.trim($('#dlg_fioc_desc').val()).toUpperCase(),
                        fioc_cu_id: $('#dlg_fioc_cu_id').data('cu_id'),
                        fioc_ship_rent_cu_id: $('#dlg_fioc_ship_rent_cu_id').data('cu_id'),
                        fioc_sign_dat: $('#dlg_fioc_sign_dat').datebox('getValue'),
                        fioc_begin_dat: $('#dlg_fioc_begin_dat').datebox('getValue'),
                        fioc_end_dat: $('#dlg_fioc_end_dat').datebox('getValue'),
                        fioc_invoice_typ: $('#dlg_fioc_invoice_typ').combobox('getValue'),
                        fioc_cr_id: $('#dlg_fioc_cr_id').combobox('getValue'),
                    };

                    if (params.fioc_desc == undefined || params.fioc_desc == '') {
                        $.messager.alert('错误', '错误:合同名称必须填写', 'error');
                        return;
                    }

                    if (params.fioc_ship_rent_cu_id == undefined || params.fioc_ship_rent_cu_id == '') {
                        $.messager.alert('错误', '错误:船东必须选择', 'error');
                        return;
                    }

                    if (params.fioc_cu_id == undefined || params.fioc_cu_id == '') {
                        $.messager.alert('错误', '错误:结算单位必须选择', 'error');
                        return;
                    }

                    if (params.fioc_sign_dat == undefined || params.fioc_sign_dat == '') {
                        $.messager.alert('错误', '错误:签约时间必须选择', 'error');
                        return;
                    }
                    if (params.fioc_invoice_typ == undefined || params.fioc_invoice_typ == '') {
                        $.messager.alert('错误', '错误:发票税点必须选择', 'error');
                        return;
                    }
                    if (params.fioc_cr_id == undefined || params.fioc_cr_id == '') {
                        $.messager.alert('错误', '错误:币种必须选择', 'error');
                        return;
                    }

                    post('../Ashx/fio_fee_contract.ashx', params, function (data) { 
                        if (data.result == 1) {  
                            $.messager.alert('提示', data.msg, 'info', function () {
                                $('#dlg_edit_fio_contract').dialog('close');
                                load_fio_contract();
                            }); 
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        } 
                    }, true);
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('.validatebox-tip').remove();
                    $('#dlg_edit_fio_contract').dialog('close');
                }
            }]
    }).dialog('open');

}
function copy_new_fioc() {

    
    var copy_fioc_id = $('#fio_contract_list_menu').data('fioc_id');
    $('#dlg_edit_fioc_id').val('');
    $.each(data_fio_contract_list, function (i, row) {
        if (row.fioc_id == copy_fioc_id) {
            $('#dlg_fioc_desc').val(row.fioc_desc);
            $('#dlg_copy_fioc_desc').html(row.fioc_desc);

            $('#dlg_fioc_cu_id').data('cu_id', row.fioc_cu_id);
            $('#dlg_fioc_cu_id').combogrid('setText', row.fioc_cu_desc);
            $('#dlg_fioc_ship_rent_cu_id').data('cu_id', row.fioc_ship_rent_cu_id);
            $('#dlg_fioc_ship_rent_cu_id').combogrid('setText', row.fioc_ship_rent_cu_desc);

            $('#dlg_fioc_sign_dat').datebox('setValue', dateformat(row.fioc_sign_dat,true));
            $('#dlg_fioc_begin_dat').datebox('setValue', dateformat(row.fioc_begin_dat, true));
            $('#dlg_fioc_end_dat').datebox('setValue', dateformat(row.fioc_end_dat, true));
            $('#dlg_fioc_invoice_typ').combobox('setValue', row.fioc_invoice_typ);
            $('#dlg_fioc_cr_id').combobox('setValue', row.fioc_cr_id, true);
        }
    });
    $('#dlg_copy_new_tips').show();

    $('#dlg_edit_fio_contract').dialog({
        title: '拷贝编辑合同',
        iconCls: 'icon-save',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var params = {
                        action: 'insert_fio_contract',
                        rnd: Math.random(),
                        copy_fioc_id: copy_fioc_id,
                        fioc_desc: $.trim($('#dlg_fioc_desc').val()).toUpperCase(),
                        fioc_cu_id: $('#dlg_fioc_cu_id').data('cu_id'),
                        fioc_ship_rent_cu_id: $('#dlg_fioc_ship_rent_cu_id').data('cu_id'),
                        fioc_sign_dat: $('#dlg_fioc_sign_dat').datebox('getValue'),
                        fioc_begin_dat: $('#dlg_fioc_begin_dat').datebox('getValue'),
                        fioc_end_dat: $('#dlg_fioc_end_dat').datebox('getValue'),
                        fioc_invoice_typ: $('#dlg_fioc_invoice_typ').combobox('getValue'),
                        fioc_cr_id: $('#dlg_fioc_cr_id').combobox('getValue'),
                    };

                    if (params.fioc_desc == undefined || params.fioc_desc == '') {
                        $.messager.alert('错误', '错误:合同名称必须填写', 'error');
                        return;
                    }

                    if (params.fioc_ship_rent_cu_id == undefined || params.fioc_ship_rent_cu_id == '') {
                        $.messager.alert('错误', '错误:船东必须选择', 'error');
                        return;
                    }

                    if (params.fioc_cu_id == undefined || params.fioc_cu_id == '') {
                        $.messager.alert('错误', '错误:结算单位必须选择', 'error');
                        return;
                    }

                    if (params.fioc_sign_dat == undefined || params.fioc_sign_dat == '') {
                        $.messager.alert('错误', '错误:签约时间必须选择', 'error');
                        return;
                    }
                    if (params.fioc_invoice_typ == undefined || params.fioc_invoice_typ == '') {
                        $.messager.alert('错误', '错误:发票税点必须选择', 'error');
                        return;
                    }
                    if (params.fioc_cr_id == undefined || params.fioc_cr_id == '') {
                        $.messager.alert('错误', '错误:币种必须选择', 'error');
                        return;
                    }
                    
                    post('../Ashx/fio_fee_contract.ashx', params, function (data) { 
                        if (data.result == 1) {
                            $.messager.alert('提示', data.msg, 'info', function () {
                                $('#dlg_edit_fio_contract').dialog('close');
                                load_fio_contract();
                            });
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        } 
                    }, true);
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('.validatebox-tip').remove();
                    $('#dlg_edit_fio_contract').dialog('close');
                }
            }]
    }).dialog('open');
}
function delete_fioc() {
    var delete_fioc_id = $('#fio_contract_list_menu').data('fioc_id');

    var delete_fioc_desc = $('#fio_contract_list_menu').data('fioc_desc');
     
    $.messager.confirm('删除合同操作提示', '确定要删除[' + delete_fioc_desc + ']合同协议吗？', function (r) {
        if (r) { 
            post('../Ashx/fio_fee_contract.ashx', {
                rnd: Math.random(),
                action: 'delete_fio_contract',
                fioc_id: delete_fioc_id
            }, function (data) {
                
                if (data.result == 1) {
                    $.messager.alert('提示', data.msg, 'info', function () {
                        if (cur_select_fioc_id == delete_fioc_id) {
                            cur_select_fioc_id = undefined;
                        }
                        load_fio_contract();
                    });
                    
                } else {
                    $.messager.alert('错误',data.msg,'error');
                }
                 
            }, true);
        }
    });

}





//初始化计费标准tab
function init_fio_contract_details_tab() {

    $('#tab_fio_contract_details').datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        //pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#dv_tab_fio_contract_details_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[//显示的列
                { field: 'fee_no', title: '', sortable: true, checkbox: true }
                , {
                    field: 'fee_val', title: '单价', align: 'left', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    },
                    styler: function (value, row, index) {
                        if (value>0) {
                            return 'background:#34c6dd;';
                        } else {
                            return '';
                        }
                    }
                }
                , {
                    field: 'cr_name', title: '币种', align: 'left', sortable: true, width: 50,
                   
                }
                , {
                    field: 'in_name', title: '税点', align: 'left', sortable: true, width: 50,

                }
                , { field: 'eqp_siz', title: '尺寸', align: 'left', sortable: true, width: 60 }
                , { field: 'eqp_typ', title: '箱型', align: 'left', sortable: true, width: 60 }
                , {
                    field: 'e_f_desc', title: '空重', align: 'left', sortable: true, width: 60,
                }
                , {
                    field: 'trade_desc', title: '内外贸', align: 'left', sortable: true, width: 60,
                   
                }
                

        ]],
        onLoadSuccess: function (data) { 
            if (!clumn_fliter_of_fio_fee) {
                clumn_fliter_of_fio_fee = $('#clumn_fliter_of_fio_fee').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_fio_contract_details'),
                    cur_cls_target_body: 'cls_fio_region'
                }); 
            }
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_fio_contract_details'), rowIndex);
        },
        onDblClickRow: function (index, row) {
        },
        onClickCell: function (rowIndex, field, value) {
        }
    });
}

//清空条件 
function clear_tab_fee_list_op() {
    clumn_fliter_of_fio_fee.columns_fliters('clear');
}

/*装载FIO费用明细数据*/
function load_fio_contract_details() {

    $('#tab_fio_contract_details').datagrid('loadData', { total: 0, rows: [] });

    if (cur_select_fioc_id == undefined) {
        return;
    }

    if (cur_select_group_area_id == undefined) {
        return;
    }
   

   post('../Ashx/fio_fee_contract.ashx', {
        rnd: Math.random(),
        action: 'get_fio_contract_details',
        fioc_id: cur_select_fioc_id,
        fio_group_area_id: cur_select_group_area_id
      
    }, function (data) { 
        data_fio_contract_details = data.rows;

        clumn_fliter_of_fio_fee.columns_fliters('reset_target_data_and_clumns_fliter',data.rows);

        
    }, true);
}
function reload_fio_contract_details() {
     
    post('../Ashx/fio_fee_contract.ashx', {
        rnd: Math.random(),
        action: 'get_fio_contract_details',
        fioc_id: cur_select_fioc_id,
        fio_group_area_id: cur_select_group_area_id

    }, function (data) { 
        data_fio_contract_details = data.rows;

        clumn_fliter_of_fio_fee.columns_fliters('reset_target_data_only', data.rows);

         
    }, true);
}


 
//批量设置费率 
function update_fio_contract_details() {
    var _fio_contract_details = $('#tab_fio_contract_details').datagrid('getChecked');

    if (_fio_contract_details.length == 0) {
        $.messager.alert('错误提示', '请勾选表格数据', 'error');
        return;
    }
    var bool_fee_val = true;
  

    var fee_val = $('#edit_fee_val').val();
    if (fee_val == undefined || fee_val.length == 0) {
        bool_fee_val = false;
        //$.messager.alert('错误提示', '请填写单价', 'error');
        //return;
    }

    if (isNaN(fee_val)) {
        $.messager.alert('错误提示', '格式错误，必须是数字格式!', 'error');
        return;
    }

    //if (parseFloat(fee_val) > 1000000) {
    //    $.messager.alert('错误提示', '单价金额过大!', 'error');
    //    return;
    //}
    
    if ( !bool_fee_val  ) {
        $.messager.alert('错误提示', '请设定修改金额', 'error');
        return;
    }
     
      
    $.messager.confirm('批量单价设置提示', '确定要将' + _fio_contract_details.length
        + '行单价设置为' + (bool_fee_val?fee_val:'') +  '？',
        function (r) {
            if (r) {

                var seqs = '';

                $.each(_fio_contract_details, function (i, item) {

                    if (seqs.length == 0) {
                        seqs = item.seq;
                    } else{
                        seqs += ',' + item.seq;
                    }
                });

                var params = {
                    rnd: Math.random(),
                    action: 'update_fio_contract_details',
                    seqs: seqs,
                    fee_val: fee_val,
                };
               post('../Ashx/fio_fee_contract.ashx', params, function (data) { 
                    if (data.result == 1) {
                        $.messager.progress('close');//处理完成之后关闭

                        $.messager.alert('提示', '批量设置协议费用完成', 'info');
                        reload_fio_contract_details();
                    } 
                },true);
            }
        });

}
 

/*****************************************************************************/


