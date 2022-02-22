//默认第一页，
var pageNumber = 1;
//每页显示10行
var pageSize = 30;

//定义参数 
var basesetting = undefined;
 

var data_cy_contract_list = undefined; 

var data_cur_cy_feeitem_list = undefined;
  
var cur_select_cyc_id = undefined; 
 
var cur_select_cfi_id = undefined;  

//表头筛选菜单 
var clumn_fliter_of_cy_fee = undefined;

$(document).ready(function () {
    //dialog关闭 
    $('#dlg_edit_cy_contract').dialog({
        title: '',
        iconCls: 'icon-add',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 140,
    }).dialog('close');

    $('#dlg_add_cy_contract_feeitem').dialog({
        title: '',
        iconCls: 'icon-add',
        autoOpen: false,
        modal: true,
        width: 400,
        minheight: 140,
    }).dialog('close');

    getbasesetting();

    get_cy_feeitem();

});


/*获取基础信息*/
function getbasesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        
            basesetting = data; 
            bind_combobox(data.port_list, $('#dlg_cyc_port_id'), 'p_desc', 'p_id', false);
           
            bind_combobox(data.port_list, $('.cbx_to_port'), 'p_desc', 'p_id', true);
            bind_combobox(data.invoice_list, $('#dlg_cyc_invoice_typ'), 'in_name', 'in_id', true);
            bind_combobox(data.currency_list, $('#dlg_cyc_cr_id'), 'cr_name', 'cr_id', true);
            bind_combogrid_custom($('#dlg_cy_cu_id'));
            init_cy_contract_details_tab();
            
            load_cy_contract();
       

    }, true);
}

 
/*获取 协议列表、地点组合列表、穿巴港组合列表*/
function get_cy_feeitem() {
    $.post('../Ashx/cy_fee_contract.ashx', {
        rnd: Math.random(),
        action: 'get_cy_feeitem'
    }, function (data) {
        if (!session_out(data)) {
            //data_cy_contract_list = data.cy_contracts_list;
            //data_cy_feeitem_list = data.cy_feeitem_list;

            //显示协议 
            //show_cy_contract_list();
            //初始化费项列表 
            bind_combobox(data.rows, $('#cb_cy_feeitem_list'), 'cfi_desc', 'cfi_id', false);

            //show_cy_group_area_list();
            //show_cy_group_port_list();
        }

    }, 'json');
}

/*****************************************************************************/
//获取合同列表 
function load_cy_contract() {
    post('../Ashx/cy_fee_contract.ashx', {
        rnd: Math.random(),
        action: 'get_cy_contract'
    }, function (data) {

        $('#cy_contract_feeitem_list').html('');
        $('#tab_cy_contract_details').datagrid('loadData', { total: 0, rows: [] });

        data_cy_contract_list = data.rows;
        //显示合同 
        show_cy_contract_list();

    }, true);
}

/*显示协议*/
function show_cy_contract_list() { 
    var likestr = $('#ipt_client_query_cy_contract').val();
    $(".ul_ss_menu").html('');
    /* 点击合同菜单 */
    var click_li = function (obj) {
        $('.li_ss_menuitem').removeClass('li_ss_menuitem_selected');
        $(obj).addClass('li_ss_menuitem_selected');
        var now_select_cyc_id = $(obj).data('cyc_id');
        if (now_select_cyc_id == cur_select_cyc_id) {
            return;
        }
        cur_select_cyc_id = now_select_cyc_id;
        load_cy_contract_feeitem_list(cur_select_cyc_id);
    }
    $.each(data_cy_contract_list, function (i, row) {
        
        var $li = undefined;
        var validate_desc = '';
        var selectd = '';

        if (row.cyc_validate_flag == 1) {
            validate_desc = '<span class="span_validate_title">【过期】</span>';
        }
        if (cur_select_cyc_id != undefined && row.cyc_id == cur_select_cyc_id) {
            selectd = 'li_ss_menuitem_selected';
            load_cy_contract_feeitem_list(cur_select_cyc_id);
        } else {
            $('#cy_contract_feeitem_list').html('');
            $('#tab_cy_contract_details').datagrid('loadData', { total: 0, rows: [] });
        }

        if (likestr.length == 0) {
            $li = $('<li class="li_ss_menuitem ' + selectd + '"    > <span class="contract_cls"><i class="fa fa-handshake-o"></i> ' + row.cyc_desc + validate_desc + '</span> </li>');
             
        } else {
            if (row.cyc_desc.toUpperCase().indexOf(likestr.toUpperCase()) > -1) {
                $li = $('<li class="li_ss_menuitem ' + selectd + '"   > <span class="contract_cls"><i class="fa fa-handshake-o"></i> ' + row.cyc_desc + validate_desc + '</span> </li>');
                
            } 
        }

        if ($li != undefined) {
            $li.data('cyc_id', row.cyc_id).data('cfi_id', row.cfi_id);
            /*绑定菜单*/
            $li.bind('contextmenu', function (e) { 
                $('#cy_contract_list_menu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                }); 
                $('#cy_contract_list_menu').data('cyc_id', $(this).data('cyc_id')).data('cfi_id', $(this).data('cyf_id'));
                e.preventDefault();
            });
            $li.off('click').on('click', function () {
                click_li(this);
            });

            $(".ul_ss_menu").append($li);
        }

       
    }); 
}
/*模糊查询 协议*/
function client_query_cy_contract(obj) {
    cur_select_cyc_id = undefined;
    cur_select_cfi_id = undefined;

    show_cy_contract_list();
}



/*****************************************************************************/
/*显示 协议关联费项*/
function load_cy_contract_feeitem_list(cyc_id) { 
    post('../Ashx/cy_fee_contract.ashx', {
        rnd: Math.random(),
        action: 'get_cy_contract_feeitem',
        cyc_id: cyc_id
    }, function (data) { 
        $('#tab_cy_contract_details').datagrid('loadData', { total: 0, rows: [] }); 
        data_cur_cy_feeitem_list = data.rows;
        show_cyc_feeitem_list(); 
       
    },true);
}

function show_cyc_feeitem_list() {
    var click_li = function (obj) {

        var now_cyc_id = $('.li_ss_menuitem_selected').eq(0).data('cyc_id');

        if (now_cyc_id == undefined || now_cyc_id.length == 0) {
            $.messager.alert('提示', '请先选择码头！', 'error');
            return;
        }

        $('.li_item').removeClass('li_item_selected');
        $(obj).addClass('li_item_selected');
        var now_select_cfi_id = $(obj).data('cfi_id');
        if (cur_select_cfi_id == now_select_cfi_id) {
            return;
        }
        cur_select_cfi_id = now_select_cfi_id;
        hid_columns($(obj).data('cfi_rel_rule_index'));
        load_cy_contract_details();
    }

    $('#cy_contract_feeitem_list').html('');
    var $ul_rec = $('<ul class="ul_lditem" style="height:100%;"></ul>"');
    $.each(data_cur_cy_feeitem_list, function (i, row) {
        var $li = undefined;
        var selectd = '';
        if (cur_select_cfi_id != undefined && row.cfi_id == cur_select_cfi_id) {
            selectd = 'li_item_selected';
            load_cy_contract_details();
        } else {
            $('#tab_cy_contract_details').datagrid('loadData', { total: 0, rows: [] });
        }
       
        $li = $('<li class="li_item ' + selectd + '"  ><table class="tab_std "><col style="width:10%" /><col style="width:60%"/><col style="width:30%"/><tr><td rowspan="2"><i class="fa fa-tag other_tag"></i></td><td>' + row.cfi_desc + '</td><td class="other_context">' + row.cyc_invoice_typ_desc + '</td></tr><tr><td class="other_context">' + row.cy_cu_short_desc + '</td><td class="other_context">' + row.cyc_cr_desc + '</td></tr></table>' +

            '</li>');

        $li.data('cyc_id', row.cyc_id).data('cfi_id', row.cfi_id).data('cfi_rel_rule_index', row.cfi_rel_rule_index);

        /*绑定菜单*/
        $li.bind('contextmenu', function (e) {

            $('#cy_contract_feeitem_menu').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
            $('#cy_contract_feeitem_menu').data('cfi_id', $(this).data('cfi_id'))
                .data('cyc_id', $(this).data('cyc_id'))
                .data('cfi_rel_rule_index', $(this).data('cfi_rel_rule_index'));
            e.preventDefault();
        });
        $li.off('click').on('click', function () {
            click_li(this);
        });
        $ul_rec.append($li);
         

    });

    $('#cy_contract_feeitem_list').append($ul_rec);
}
/*添加费项*/
function new_cy_contract_feeitem() {

    if (cur_select_cyc_id == undefined || cur_select_cyc_id.length == 0) {
        $.messager.alert('错误提示', '请先选择协议', 'error');
        return;
    }

    var now_insert_cfi_id = $('#cb_cy_feeitem_list').combobox('getValue');

    if (now_insert_cfi_id == undefined || now_insert_cfi_id.length == 0) {
        $.messager.alert('错误提示', '请选择费项', 'error');
        return;
    }


    var already_has = false;

    if (data_cur_cy_feeitem_list != undefined) {
        $.each(data_cur_cy_feeitem_list, function (i, row) {
            if (row.cfi_id == now_insert_cfi_id) {
                already_has = true;
            }
        })
        if (already_has) {
            $.messager.alert('错误提示', '此费项已在协议费项中', 'error');
            return;
        }
    }
    //打开对话框，获取 码头的付费人信息并选择付费人
    var now_insert_cfi_desc = $('#cb_cy_feeitem_list').combobox('getText');

    $('#dlg_cfi_desc').val(now_insert_cfi_desc);


    $('#dlg_add_cy_contract_feeitem').dialog({
        title: '添加费项到协议',
        iconCls: 'icon-save',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var params = {
                        action: 'insert_cy_contract_feeitem',
                        rnd: Math.random(),
                        cyc_id: cur_select_cyc_id,
                        cfi_id: now_insert_cfi_id,
                        cyc_invoice_typ: $('#dlg_cyc_invoice_typ').combobox('getValue'),
                        cyc_cr_id: $('#dlg_cyc_cr_id').combobox('getValue'),
                        cy_cu_id: $('#dlg_cy_cu_id').data('cu_id')
                    };
                    //$('#dlg_cy_cu_id').combobox('getValue')
                    if (!params.cy_cu_id || params.cy_cu_id.length == 0) { 
                        $.messager.alert('错误', '必须填写收费单位', 'error');
                        return;
                    }
                    if (!params.cyc_invoice_typ || params.cyc_invoice_typ.length == 0) {
                        $.messager.alert('错误', '必须填写费项发票税率', 'error');
                        return;
                    }
                    if (!params.cyc_cr_id || params.cyc_cr_id.length == 0) {
                        $.messager.alert('错误', '必须填写费项币种', 'error');
                        return;
                    }
                    post('../Ashx/cy_fee_contract.ashx', params, function (data) { 
                        if (data.result == 1) {
                            $('#dlg_add_cy_contract_feeitem').dialog('close');
                            $.messager.alert('提示', data.msg, 'info', function () {
                                load_cy_contract_feeitem_list(cur_select_cyc_id);
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
                    $('#dlg_add_cy_contract_feeitem').dialog('close');
                }
            }]
    }).dialog('open');

}
/*
 费项 编辑菜单
*/
function edit_cy_contract_feeitem() {
    var edit_cfi_id = $('#cy_contract_feeitem_menu').data('cfi_id');
    $('#dlg_edit_cfi_id').val(edit_cfi_id);

    $.each(data_cur_cy_feeitem_list, function (i, row) {
        if (row.cfi_id == edit_cfi_id) {
            $('#dlg_cfi_desc').val(row.cfi_desc);
            $('#dlg_cy_cu_id').data('cu_id', row.cy_cu_id);
            $('#dlg_cy_cu_id').combogrid('setText', row.cy_cu_desc);
            $('#dlg_cyc_invoice_typ').combobox('setValue', row.cyc_invoice_typ);
            $('#dlg_cyc_cr_id').combobox('setValue', row.cyc_cr_id);

        }
    });
    $('#dlg_add_cy_contract_feeitem').dialog({
        title: '编辑协议费项',
        iconCls: 'icon-edit',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var params = {
                        action: 'update_cy_contract_feeitem',
                        rnd: Math.random(),
                        cyc_id: cur_select_cyc_id,
                        cfi_id: edit_cfi_id,
                        cy_cu_id: $('#dlg_cy_cu_id').data('cu_id'),
                        cyc_invoice_typ: $('#dlg_cyc_invoice_typ').combobox('getValue'),
                        cyc_cr_id: $('#dlg_cyc_cr_id').combobox('getValue'),
                    };

                    if (params.cy_cu_id == undefined || params.cy_cu_id.length == 0) {
                        dlg_save_result_tips('必须选择收费单位', false);
                        return;
                    }

                    if (!params.cyc_invoice_typ || params.cyc_invoice_typ.length == 0) {
                        $.messager.alert('错误', '必须填写费项发票税率', 'error');
                        return;
                    }
                    if (!params.cyc_cr_id || params.cyc_cr_id.length == 0) {
                        $.messager.alert('错误', '必须填写费项币种', 'error');
                        return;
                    }

                 
                    post('../Ashx/cy_fee_contract.ashx', params, function (data) { 
                        if (data.result == 1) {
                            $('#dlg_add_cy_contract_feeitem').dialog('close');
                            $.messager.alert('提示', data.msg, 'info', function () { 
                                load_cy_contract_feeitem_list(cur_select_cyc_id);
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
                    $('#dlg_add_cy_contract_feeitem').dialog('close');
                }
            }]
    }).dialog('open');

}
function delete_cy_contract_feeitem() {
    var delete_cfi_id = $('#cy_contract_feeitem_menu').data('cfi_id');
    var delete_cfi_desc = '';

    $.each(data_cur_cy_feeitem_list, function (i, row) {
        if (row.cfi_id == delete_cfi_id) {
            delete_cfi_desc = row.cfi_desc;
        }
    });

    $.messager.confirm('删除费项操作提示', '确定要删除[' + delete_cfi_desc + ']组合吗？', function (r) {
        if (r) {
            $.messager.progress({
                title: '请稍后',
                msg: '努力加载中...'
            });
            $.post('../Ashx/cy_fee_contract.ashx', {
                rnd: Math.random(),
                action: 'delete_cy_contract_fee_item',
                cyc_id: cur_select_cyc_id,
                cfi_id: delete_cfi_id
            }, function (data) {
                $.messager.progress('close');//处理完成之后关闭
                if (!session_out(data)) {
                    if (cur_select_cfi_id == delete_cfi_id) { 
                        cur_select_cfi_id = undefined;
                    }
                    load_cy_contract_feeitem_list(cur_select_cyc_id);
                }
            }, 'json');
        }
    });

}

 
 


/*
协议编辑菜单
*/
function edit_cyc() {
    var edit_cyc_id =  $('#cy_contract_list_menu').data('cyc_id');
    $('#dlg_edit_cyc_id').val(edit_cyc_id);

    $.each(data_cy_contract_list, function (i, row) {
        if (row.cyc_id == edit_cyc_id) {
            $('#dlg_cyc_desc').val(row.cyc_desc);
            $('#dlg_cyc_port_id').combobox('setValue', row.cyc_port_id);
            $('#dlg_cyc_sign_dat').datebox('setValue', dateformat(row.cyc_sign_dat, true));
            $('#dlg_cyc_begin_dat').datebox('setValue', dateformat(row.cyc_begin_dat, true));
            $('#dlg_cyc_end_dat').datebox('setValue', dateformat(row.cyc_end_dat, true));
        }
    });


    $('#dlg_edit_cy_contract').dialog({
        title: '编辑协议',
        iconCls: 'icon-edit',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {

                    var params = {
                        action: 'update_cy_contract',
                        rnd: Math.random(),
                        cyc_id: edit_cyc_id,
                        cyc_desc: $.trim($('#dlg_cyc_desc').val()),
                        cyc_port_id: $('#dlg_cyc_port_id').combobox('getValue'),
                        cyc_sign_dat: $('#dlg_cyc_sign_dat').datebox('getValue'),
                        cyc_begin_dat: $('#dlg_cyc_begin_dat').datebox('getValue'),
                        cyc_end_dat: $('#dlg_cyc_end_dat').datebox('getValue'),
                        cyc_valid: 1,
                    };

                    if (params.cyc_desc == undefined || params.cyc_desc.length == 0) {
                        $.messager.alert('错误提示', '错误:协议名称必须填写', 'error'); 
                        return;
                    }

                    if (params.cyc_port_id == undefined || params.cyc_port_id.length == 0) {
                        $.messager.alert('错误提示', '错误:协议码头必须选择', 'error'); 
                        return;
                    }

                    if (params.cyc_sign_dat == undefined || params.cyc_sign_dat.length == 0) {
                        $.messager.alert('错误提示', '错误:签约时间必须选择', 'error'); 
                        return;
                    }
                    
                    
                    post('../Ashx/cy_fee_contract.ashx', params, function (data) { 
                        if (data.result == 1) {
                            $('#dlg_edit_cy_contract').dialog('close');
                            $.messager.alert('提示', data.msg, 'info', function () {
                                cur_select_cyc_id = edit_cyc_id;
                                load_cy_contract();
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
                    $('#dlg_edit_cy_contract').dialog('close');
                }
            }]
    }).dialog('open');
}
function new_cyc() {
    $('#dlg_eitd_cy_contract_form').form('clear');
    $('#dlg_edit_cyc_id').val('');
    $('#dlg_copy_new_tips').hide();
    $('#dlg_edit_cy_contract').dialog({
        title: '新建协议',
        iconCls: 'icon-save',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {

                    var params = {
                        action: 'insert_cy_contract',
                        rnd: Math.random(),
                        cyc_desc: $.trim($('#dlg_cyc_desc').val()),
                        cyc_port_id: $('#dlg_cyc_port_id').combobox('getValue'),
                        cyc_sign_dat: $('#dlg_cyc_sign_dat').datebox('getValue'),
                        cyc_begin_dat: $('#dlg_cyc_begin_dat').datebox('getValue'),
                        cyc_end_dat: $('#dlg_cyc_end_dat').datebox('getValue'),
                        cyc_std_flag: $('#dlg_cyc_std_flag').is(':checked') ? 1 : 0,
                        cyc_valid: $('#dlg_cyc_valid').is(':checked') ? 1 : 0,
                    };

                    if (params.cyc_desc == undefined || params.cyc_desc.length == 0) {
                        $.messager.alert('错误提示', '错误:协议名称必须填写', 'error');
                        return;
                    }

                    if (params.cyc_port_id == undefined || params.cyc_port_id.length == 0) {
                        $.messager.alert('错误提示', '错误:协议码头必须选择', 'error');
                        return;
                    }

                    if (params.cyc_sign_dat == undefined || params.cyc_sign_dat.length == 0) {
                        $.messager.alert('错误提示', '错误:签约时间必须选择', 'error');
                        return;
                    }
                    post('../Ashx/cy_fee_contract.ashx', params, function (data) {
                        if (data.result == 1) {
                            $('#dlg_edit_cy_contract').dialog('close');
                            $.messager.alert('提示', data.msg, 'info', function () {
                                cur_select_cyc_id = data.cyc_id;
                                load_cy_contract();
                            });
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        } 
                    },true);
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('.validatebox-tip').remove();
                    $('#dlg_edit_cy_contract').dialog('close');
                }
            }]
    }).dialog('open');

}
//费项绑定收费单位的情况下，无法进行合同拷贝 

function copy_cyc() {
    var res_cyc_id = $('#cy_contract_list_menu').data('cyc_id');
    $('#dlg_edit_cyc_id').val('');

    $.each(data_cy_contract_list, function (i, row) {
        if (row.cyc_id == res_cyc_id) {
            $('#dlg_cyc_desc').val(row.cyc_desc);
            $('#dlg_cyc_sign_dat').datebox('setValue', dateformat(row.cyc_sign_dat, true));
            $('#dlg_cyc_begin_dat').datebox('setValue', dateformat(row.cyc_begin_dat, true));
            $('#dlg_cyc_end_dat').datebox('setValue', dateformat(row.cyc_end_dat, true));
        }
    }); 

    $('#dlg_edit_cy_contract').dialog({
        title: '拷贝编辑协议',
        iconCls: 'icon-edit',
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {

                    var params = {
                        action: 'insert_cy_contract_by_copy',
                        rnd: Math.random(),
                        cyc_port_id: $('#dlg_cyc_port_id').combobox('getValue'),
                        cyc_desc: $.trim($('#dlg_cyc_desc').val()),
                        res_cyc_id: res_cyc_id,
                        cyc_sign_dat: $('#dlg_cyc_sign_dat').datebox('getValue'),
                        cyc_begin_dat: $('#dlg_cyc_begin_dat').datebox('getValue'),
                        cyc_end_dat: $('#dlg_cyc_end_dat').datebox('getValue'),
                        cyc_valid: 1,
                    };

                    if (params.cyc_desc == undefined || params.cyc_desc.length == 0) {
                        $.messager.alert('错误提示', '错误:协议名称必须填写', 'error');
                        return;
                    }

                    if (params.cyc_port_id == undefined || params.cyc_port_id.length == 0) {
                        $.messager.alert('错误提示', '错误:协议码头必须选择', 'error');
                        return;
                    }

                    if (params.cyc_sign_dat == undefined || params.cyc_sign_dat.length == 0) {
                        $.messager.alert('错误提示', '错误:签约时间必须选择', 'error');
                        return;
                    }
                    $('#dlg_edit_cy_contract').dialog('close');
                    post('../Ashx/cy_fee_contract.ashx', params, function (data) {
                        if (data.result == 1) {
                            $('#dlg_edit_cy_contract').dialog('close');
                            $.messager.alert('提示', data.msg, 'info', function () {
                                cur_select_cyc_id = data.cyc_id;
                                load_cy_contract();
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
                    $('#dlg_edit_cy_contract').dialog('close');
                }
            }]
    }).dialog('open');

}
function delete_cyc() {
    var delete_cyc_id = $('#cy_contract_list_menu').data('cyc_id');
    var delete_cyc_desc = '';
    $.each(data_cy_contract_list, function (i, row) {
        if (row.cyc_id == delete_cyc_id) {
            delete_cyc_desc = row.cyc_desc;
        }
    });
    $.messager.confirm('删除协议操作提示', '确定要删除[' + delete_cyc_desc + ']该协议吗？', function (r) {
        if (r) {
             post('../Ashx/cy_fee_contract.ashx', {
                rnd: Math.random(),
                action: 'delete_cy_contract',
                cyc_id: delete_cyc_id
            }, function (data) { 
                if (cur_select_cyc_id == delete_cyc_id) {
                    cur_select_cyc_id = undefined;
                }
                load_cy_contract(); 
            },true);
        }
    });

}



  
//初始化计费标准tab
function init_cy_contract_details_tab() {

    $('#tab_cy_contract_details').datagrid({
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
        toolbar: '#dv_tab_cy_contract_details_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[{ field: 'fee_no', title: '', sortable: true, checkbox: true }
                , {
                    field: 'fee_val', title: '单价', align: 'center', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    },
                    styler: function (value, row, index) {
                        if (value > 0) {
                            return 'background:#34c6dd;';
                        } else {
                            return '';
                        }
                    }
                }
                 
                , { field: 'cfi_unit', title: '单位', align: 'center', sortable: true, width: 80 } 
                , {
                    field: 'ld_or_dc_desc', title: '装||卸', align: 'center', sortable: true, width: 60,
                }
                , { field: 'eqp_siz', title: '箱尺寸', align: 'center', sortable: true, width: 80, }
                , { field: 'eqp_typ', title: '箱类型', align: 'center', sortable: true, width: 80, }
                , {
                    field: 'e_f_desc', title: '空重', align: 'center', sortable: true, width: 60,
                }
                , {
                    field: 'trade_desc', title: '内外贸', align: 'center', sortable: true, width: 100,
                }
                , {
                    field: 'danger_flag_desc', title: '危险品', align: 'center', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        if (row.danger_flag == 1) {
                            return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                        } else {
                            return "";
                        }
                    }
                }
                , {
                    field: 'trans_flag_desc', title: '中转', align: 'center', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        if (row.trans_flag == 1) {
                            return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                        } else {
                            return "";
                        }
                    }
                }]
        ],
        onLoadSuccess: function (data) {
            
            if (!clumn_fliter_of_cy_fee) {
                clumn_fliter_of_cy_fee = $('#clumn_fliter_of_cy_fee').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_cy_contract_details'),
                    cur_cls_target_body: 'cls_cy_region'
                }); 
            }
        },
        onDblClickRow: function (index, row) {
        },
        onClickCell: function (rowIndex, field, value) {
        }
    });
}

function hid_columns(cfi_rel_rule_index) {
    $('#tab_cy_contract_details').datagrid('showColumn', 'eqp_siz');
    $('#tab_cy_contract_details').datagrid('showColumn', 'eqp_typ');
    $('#tab_cy_contract_details').datagrid('showColumn', 'e_f_desc');
    $('#tab_cy_contract_details').datagrid('showColumn', 'trade_desc');
    $('#tab_cy_contract_details').datagrid('showColumn', 'danger_flag_desc');
    $('#tab_cy_contract_details').datagrid('showColumn', 'trans_flag_desc');

    if (cfi_rel_rule_index == 3 || cfi_rel_rule_index == 5) {
        $('#tab_cy_contract_details').datagrid('hideColumn', 'eqp_siz');
        $('#tab_cy_contract_details').datagrid('hideColumn', 'eqp_typ');
        $('#tab_cy_contract_details').datagrid('hideColumn', 'e_f_desc');
        $('#tab_cy_contract_details').datagrid('hideColumn', 'trade_desc');
        $('#tab_cy_contract_details').datagrid('hideColumn', 'danger_flag_desc');
        $('#tab_cy_contract_details').datagrid('hideColumn', 'trans_flag_desc');
    }

    if (cfi_rel_rule_index == 4) {
        $('#tab_cy_contract_details').datagrid('hideColumn', 'eqp_typ');
        $('#tab_cy_contract_details').datagrid('hideColumn', 'danger_flag_desc');
        $('#tab_cy_contract_details').datagrid('hideColumn', 'trans_flag_desc');
    }
}

 

/*装载cy费用明细数据*/
function load_cy_contract_details() {

    $('#tab_cy_contract_details').datagrid('loadData', { total: 0, rows: [] });

    if (cur_select_cyc_id == undefined) {
        return;
    }
    if (cur_select_cfi_id == undefined) {
        return;
    }

    
    post('../Ashx/cy_fee_contract.ashx', {
        rnd: Math.random(),
        action: 'get_cy_contract_details',
        cyc_id: cur_select_cyc_id,
        cfi_id: cur_select_cfi_id
    }, function (data) {  

        clumn_fliter_of_cy_fee.columns_fliters('reset_target_data_and_clumns_fliter',data.rows);
         
    }, true);
}
function reload_cy_contract_details() {

    
    if (cur_select_cyc_id == undefined) {
        return;
    }
    if (cur_select_cfi_id == undefined) {
        return;
    }

    post('../Ashx/cy_fee_contract.ashx', {
        rnd: Math.random(),
        action: 'get_cy_contract_details',
        cyc_id: cur_select_cyc_id,
        cfi_id: cur_select_cfi_id
    }, function (data) {    
        clumn_fliter_of_cy_fee.columns_fliters('reset_target_data_only', data.rows);
    }, true);
}


 
//批量设置费 
function update_cy_contract_details() {

    var fee_val = $('#edit_fee_val').val();

    if (fee_val.length == 0) {
        $.messager.alert('错误提示', '请填写单价', 'error');
        return;
    }

    if (isNaN(fee_val)) {
        $.messager.alert('错误提示', '格式错误，必须是数字格式!', 'error');
        return;
    }
    
    var _cy_contract_details = $('#tab_cy_contract_details').datagrid('getChecked');

    if (_cy_contract_details.length == 0) {
        $.messager.alert('错误提示', '请勾选表格数据', 'error');
        return;
    }

    var seqs = '';

    $.each(_cy_contract_details, function (i, item) {
        if (seqs.length == 0) {
            seqs = item.seq;
        } else {
            seqs += ',' + item.seq;
        }
    });


    var params = {
        rnd: Math.random(),
        action: 'update_cy_contract_details',
        cyc_id: cur_select_cyc_id,
        cfi_id: cur_select_cfi_id,
        fee_val: fee_val,
        seqs: seqs
    };

    if (params.fee_val == undefined || params.fee_val.length == 0) {
        params.fee_val = 0;
    }

    $.messager.confirm('批量单价设置提示', '确定要将' + _cy_contract_details.length
        + '行单价设置为' + params.fee_val + '？',
        function (r) {
            if (r) {
               post('../Ashx/cy_fee_contract.ashx', params, function (data) {
                    
                    if (data.result == 1) {
                        $.messager.progress('close');//处理完成之后关闭

                        $.messager.alert('提示', '批量单价设置完成', 'info');
                        reload_cy_contract_details();
                    }
                     
                }, true);
            }
        });

}
 
//清空条件 
function clear_tab_fee_list_op() {
    clumn_fliter_of_cy_fee.columns_fliters('clear');
}

 
/*****************************************************************************/
