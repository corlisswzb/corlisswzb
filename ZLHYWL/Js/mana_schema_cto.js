
var cur_user_list = undefined;

var cur_select_c_id = undefined;
var cur_select_c_typ = undefined;


var cur_select_limit_id = undefined;

var cur_select_limit_c_id = undefined;

var cur_schema_cto_list = undefined;

var cur_schema_of_limit_list = undefined;

var cur_limit_list = undefined;

var cur_dlg_user_list = undefined;


var cur_c_id_limit_list = undefined;


$(document).ready(function () {
    //初始化对话框
    $('#dlg_edit_users').dialog({
        title: '新增用户',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 400,
        minheight: 100,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_edit_users').dialog('close');
                $('.validatebox-tip').remove();
            }
        }]
    }).dialog('close');

    //初始化对话框
    $('#dlg_edit_schema').dialog({
        title: '编辑组织结构',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 600,
        minheight: 50,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_edit_schema').dialog('close');
            }
        }]
    }).dialog('close');

    //初始化对话框
    $('#dlg_edit_bind_user_schema').dialog({
        title: '选择员工',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 450,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_edit_bind_user_schema').dialog('close');
            }
        }]
    }).dialog('close');

    //点击查询
    $(".searchbox-button").click(function () {
        $("#tab_users").datagrid('load', returnpar());
    })
  
    init_user_list();

    init_user_schema_relation_tab();

    init_ap_schema_list();
    init_ap_schema_employe_relation();
    init_ap_schema_employe();

    init_dlg_user_list_for_bind_to_schema_tab();
    $('#dv_mana_schema').panel('close');
    $('#dv_mana_limit').panel('close');
    $('#dv_mana_approval_schema').panel('close');
    $('#dv_mana_user').panel('close');
    default_menu();

});

/*
    选择菜单
*/

function default_menu() {
    var obj = $('.li_ss_menuitem').get(0);

    $(obj).addClass('li_ss_menuitem_selected');
    $('#dv_right_part').panel({ title: $(obj).text() });

    $('#dv_mana_user').panel('open').panel({fit:true});
    query_user_list();
}

function select_menu(obj, index) {
    $('.li_ss_menuitem').removeClass('li_ss_menuitem_selected');
    $(obj).addClass('li_ss_menuitem_selected');
    $('#dv_right_part').panel({ title: $(obj).text() });
    if (index == 1) {
        $('#dv_mana_schema').panel('close');
        $('#dv_mana_limit').panel('close');
        $('#dv_mana_approval_schema').panel('close');
        $('#dv_mana_user').panel('open').panel({ fit: true });
        query_user_list();
    }

    if (index == 2) {

        $('#dv_mana_limit').panel('close');
        $('#dv_mana_user').panel('close');
        $('#dv_mana_approval_schema').panel('close');
        $('#dv_mana_schema').panel('open').panel({ fit: true });
        query_schema_cto();
    }

    if (index == 3) {

        $('#dv_mana_schema').panel('close');
        $('#dv_mana_user').panel('close');
        $('#dv_mana_approval_schema').panel('close');
        $('#dv_mana_limit').panel('open').panel({ fit: true });
        query_schema_of_limit_relation();
    }

    if (index == 4) {

        $('#dv_mana_limit').panel('close');
        $('#dv_mana_schema').panel('close');
        $('#dv_mana_user').panel('close');
        $('#dv_mana_approval_schema').panel('open').panel({ fit: true });
        init_company_combobox();
    }
}
//////////////////////////////////////////////////////////////////组织结构和权限关系////////////////////////////////
function query_schema_of_limit_relation() {
    post('../Ashx/schema_cto.ashx', {
        rnd: Math.random(),
        action: 'get_schema_and_limit'
    }, function (data) { 
        init_schema_of_limit_tree(data.schema_list);
        //init_limit_tree(data.limit_list);
        cur_limit_list = data.limit_list; 
    },true);
}

function init_schema_of_limit_tree(schema_cto_list) {
    if (schema_cto_list.length == 0) {
        cur_schema_of_limit_list = undefined;
    } else {
        cur_schema_of_limit_list = schema_cto_list;

        var tree_json = {
            id: schema_cto_list[0].c_id,
            text: schema_cto_list[0].c_desc,
            c_father_id: schema_cto_list[0].c_father_id,
            c_typ: schema_cto_list[0].c_typ,
            iconCls: 'icon-2012081511767',
            children: []
        };
        tree_json.children = dg_tree_struck(schema_cto_list, tree_json.id);

        $('#tree_schema_of_limit_relation').tree({
            data: [tree_json],
            onClick: function (node) {
                cur_select_limit_c_id = node.id;
                //get_user_schema_relation(); 

                var c_typ = undefined;
                $.each(cur_schema_of_limit_list, function (i, row) {
                    if (row.c_id == cur_select_limit_c_id) {
                        c_typ = row.c_typ;
                    }
                });

                if (c_typ != 3) {
                    $('#tree_limit').tree({ data: [] });
                } else {
                    init_limit_tree(cur_limit_list);
                }
            }
        });
    }
}

function init_limit_tree(limit_list) {

    //比较现实的问题是，要通过cur_select_limit_c_id 获取 相关权限 

    post('../Ashx/schema_cto.ashx', {
        rnd: Math.random(),
        action: 'get_limit_list_by_c_id',
        c_id: cur_select_limit_c_id
    }, function (data) { 
        cur_c_id_limit_list = data.rows;

        var tree_json = {
            id: limit_list[0].l_id,
            text: limit_list[0].l_desc,
            c_father_id: limit_list[0].l_father_id,
            c_typ: limit_list[0].l_typ,
            iconCls:'icon-world_link',
            checked: false,
            children: []
        };
        tree_json.children = dg_tree_of_limit_struck(limit_list, tree_json.id);

        $('#tree_limit').tree({
            data: [tree_json],
            checkbox: true,
            cascadeCheck: false,
            onClick: function (node) {
                cur_select_limit_id = node.id;
                //get_user_schema_relation(); 
            },
            onCheck: function (node, checked) {
                cur_select_limit_id = node.id;
                if (checked) {
                    post('../Ashx/schema_cto.ashx', {
                        action: 'bind_limit_schema_relation',
                        rnd: Math.random(),
                        c_id: cur_select_limit_c_id,
                        l_id: cur_select_limit_id
                    }, function (data) {
                           
                        if (data.result != 1) {
                            $.messager.alert('错误提示', data.msg, 'error');
                        }
                            
                    }, true);
                    var parentNode = $("#tree_limit").tree('getParent', node.target);
                    if (parentNode != null) {
                        $("#tree_limit").tree('check', parentNode.target);
                    }
                } else {
                    post('../Ashx/schema_cto.ashx', {
                        action: 'unbind_limit_schema_relation',
                        rnd: Math.random(),
                        c_id: cur_select_limit_c_id,
                        l_id: cur_select_limit_id
                    }, function (data) { 
                        if (data.result != 1) {
                            $.messager.alert('错误提示', data.msg, 'error');
                        } 
                    }, true);
                    var childNode = $("#tree_limit").tree('getChildren', node.target);
                    if (childNode.length > 0) {
                        for (var i = 0; i < childNode.length; i++) {
                            $("#tree_limit").tree('uncheck', childNode[i].target);
                        }
                    }


                }
            }
        }); 
    }, true);

}

function dg_tree_of_limit_struck(limit_list, l_id) {

    var cld = [];

    $.each(limit_list, function (i, item) {
        if (item.l_father_id == l_id) {

            var checked = false;
            $.each(cur_c_id_limit_list, function (j, select) {
                if (item.l_id == select.l_id) {
                    checked = true;
                }
            });

            var tm = {
                id: item.l_id,
                text: item.l_desc,
                c_father_id: item.l_father_id,
                c_typ: item.l_typ,
                iconCls: item.l_typ == 1 ? 'icon-house_link' : (item.l_typ == 2 ? 'icon-link' : 'icon-user_female'),
                checked: checked,
                children: []
            };
            tm.children = dg_tree_of_limit_struck(limit_list, tm.id);

            cld.push(tm);
        }
    });
    return cld;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////审批结构////////////////////////////////
var cur_apst_list = undefined;
var cur_apt_id = undefined; 
var cu_ap_c_id = undefined;

function init_company_combobox() {
    init_ap_schema_list();
    init_ap_schema_employe_relation();
    init_ap_schema_employe();
    oninput_schema_employe_query();

    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_company_only'
    }, function (data) {
        bind_combobox(data.rows, $('.ap_c_id'), 'c_desc', 'c_id', false);
        $('.ap_c_id').combobox({
            onSelect: function (n, o) {
                mulit_ap_typ_search(n.value);
            }
        });
        $('#tab_ap_schema_list').datagrid('loadData', { total: 0, rows: [] }); 
        $('#tab_ap_schema_employe_relation').datagrid('loadData', { total: 0, rows: [] });
    },true);
}
function mulit_ap_typ_search(c_id) {
    cur_apst_list = undefined;
    
    $('.ap_typ').combobox('setValue', '');

    if (!isNaN(c_id)) {
        post('../Ashx/approval_mgr.ashx', {
            rnd: Math.random(),
            action: 'get_approval_typ',
            c_id: c_id
        }, function (data) {
            bind_combobox(data.rows, $('.ap_typ'), 'apt_desc', 'apt_id', false);
            $('.ap_typ').combobox({
                onSelect: function (n, o) {
                    get_ap_schema_list();
                }
            });
            
            $('#tab_ap_schema_list').datagrid('loadData', { total: 0, rows: [] });
            
            $('#tab_ap_schema_employe_relation').datagrid('loadData', { total: 0, rows: [] });
        }, true);
    } 
}
function init_ap_schema_employe_relation() {
    $('#tab_ap_schema_employe_relation').datagrid({
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        // toolbar: '#tab_ap_schema_employe_relation_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'u_nam', width: 140, title: '姓名' },
            {
                field: 'opr_right', width: 40, title: '', align: 'center',
                formatter: function (value, row, index) {
                    return '<a href="javascript:delete_schema_employe_relation(' + row.aps_id + ',' + row.u_id + ');" class="cls_btn_ap_schema_right"></a>';
                }
            },
        ]],
        onClickCell: function (rowIndex, field, value) {

        },
        onLoadSuccess: function (data) {
            $('.cls_btn_ap_schema_right').linkbutton({
                plain: true,
                iconCls: 'icon-arrow_right',
            });

        }
    });
}
function init_ap_schema_employe() {
    $('#tab_ap_schema_employe').datagrid({
        singleSelect: true,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_ap_schema_employe_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            {
                field: 'opr_left', width: 40, title: ' ', align: 'center',
                formatter: function (value, row, index) {
                    return '<a href="javascript:insert_schema_employe_relation(' + row.u_id + ');" class="cls_btn_ap_schema_left"></a>';
                }
            },
            { field: 'u_real_name', width: 140, title: '姓名' },
            { field: 'u_phone', width: 200, title: '电话' },

        ]],
        onClickCell: function (rowIndex, field, value) {

        },
        onLoadSuccess: function (data) {
            $('.cls_btn_ap_schema_left').linkbutton({
                plain: true,
                iconCls: 'icon-arrow_left',
            });
        }
    });
}
function init_ap_schema_list() {
    $('#tab_ap_schema_list').datagrid({
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        // toolbar: '#user_list_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'ck', width: 40, title: '', checkbox: true },
            //{
            //    field: 'aps_order_by_id', width: 40, title: '序号', align: 'center',
            //    formatter: function (value, row, index) {
            //        return '<b>' + value + '<b>';
            //    },
            //    styler: function (value, row, index) {
            //        return 'background-color:#01e21b;color:#fff;font-weight:bold';
            //    } 
            //},
            { field: 'aps_desc', width: 190, title: '节点描述' },
            {
                field: 'opr_delete', width: 40, title: '删', align: 'center',
                formatter: function (value, row, index) {
                    return '<a href="javascript:delete_schema(' + row.aps_id + ');" class="cls_btn_ap_schema_delete"></a>';
                }
            },
            {
                field: 'opr_up', width: 40, title: '上', align: 'center',
                formatter: function (value, row, index) {
                    return '<a href="javascript:move_schema(' + row.aps_id + ',-1);" class="cls_btn_ap_schema_up"></a>';
                }
            },
            {
                field: 'opr_down', width: 40, title: '下', align: 'center',
                formatter: function (value, row, index) {
                    return '<a href="javascript:move_schema(' + row.aps_id + ',1);" class="cls_btn_ap_schema_down"></a>';
                }
            }
        ]],
        onSelect: function (rowIndex, rowData) {
            get_schema_employe_relation(rowData.aps_id);
        },
        onClickRow: function (rowIndex, rowData) {
            get_schema_employe_relation(rowData.aps_id);
        },
        onLoadSuccess: function (data) {
            $('.cls_btn_ap_schema_delete').linkbutton({
                plain: true,
                iconCls: 'icon-remove',
            });

            $('.cls_btn_ap_schema_up').linkbutton({
                plain: true,
                iconCls: 'icon-up',
            });
            $('.cls_btn_ap_schema_down').linkbutton({
                plain: true,
                iconCls: 'icon-down',
            });
        }
    });
}
 
 
function get_ap_schema_list() {
    //清空列表
    $('#tab_ap_schema_list').datagrid('loadData', { total: 0, rows: [] });
    cur_apt_id = $('.ap_typ').combobox('getValue');
    
    cu_ap_c_id = $('.ap_c_id').combobox('getValue');

    if (!isNaN(cur_apt_id) ) {
        post('../Ashx/approval_mgr.ashx', {
            rnd: Math.random(),
            action: 'get_schema_list',
            apt_id: cur_apt_id, 
            c_id: cu_ap_c_id
        }, function (data) { 
            $('#tab_ap_schema_list').datagrid('loadData', data);
            $('#tab_ap_schema_employe_relation').datagrid('loadData', { total: 0, rows: [] });

        }, true);
    }
}

function insert_schema() {
    var aps_desc = $.trim($('.aps_desc').val());

    cur_apt_id = $('.ap_typ').combobox('getValue');
  
    if (aps_desc.length == 0) {
        $.messager.alert('错误提示', '请填写节点描述', 'error');
        return;
    }

    if (!isNaN(cur_apt_id)  ) {
        post('../Ashx/approval_mgr.ashx', {
            rnd: Math.random(),
            action: 'insert_schema',
            apt_id: cur_apt_id, 
            c_id: cu_ap_c_id,
            aps_desc: aps_desc
        }, function (data) { 
            if (data.result == 1) {
                $('#tab_ap_schema_list').datagrid('loadData', data.ap_schema_list);
            } else {
                $.messager.alert('错误提示', data.msg, 'error');
            } 
        }, true);
    } else {
        $.messager.alert('错误提示', '请选择审核类别及子类', 'error');
        return;
    }

}

function delete_schema(aps_id) {
    $.messager.confirm('删除审批框架节点提示', '确定要删除此节点吗？(注:删除、新增节点只会影响后续提交业务，对之前审核流程无影响)',
        function (r) {
            if (r) {
               post('../Ashx/approval_mgr.ashx', {
                    rnd: Math.random(),
                    action: 'delete_schema',
                    apt_id: cur_apt_id, 
                    c_id: cu_ap_c_id,
                    aps_id: aps_id
                }, function (data) { 
                    if (data.result == 1) {
                        $('#tab_ap_schema_list').datagrid('loadData', data.ap_schema_list);
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    } 
                }, true);
            }
        }
    );
}

function move_schema(aps_id, step) {
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'order_schema',
        apt_id: cur_apt_id, 
        aps_id: aps_id,
        c_id:cu_ap_c_id,
        step: step
    }, function (data) { 
        if (data.result == 1) {
            $('#tab_ap_schema_list').datagrid('loadData', data.ap_schema_list);
        } else {
            $.messager.alert('错误提示', data.msg, 'error');
        } 
    }, true);
}

function get_schema_employe_relation(aps_id) {
   post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_schema_employe_relation',
        aps_id: aps_id
    }, function (data) { 
        $('#tab_ap_schema_employe_relation').datagrid('loadData', data); 
    }, true);
}

function delete_schema_employe_relation(aps_id, u_id) {
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'delete_schema_employe_relation',
        aps_id: aps_id,
        u_id: u_id
    }, function (data) { 
        if (data.result == 1) {
            get_schema_employe_relation(aps_id);
        } else {
            $.messager.alert('错误提示', data.msg, 'error');
        } 
    }, true);
}

function insert_schema_employe_relation(u_id) {
    var rows = $('#tab_ap_schema_list').datagrid('getChecked');

    if (rows.length == 0) {
        $.messager.alert('错误提示', '请选择节点后再添加', 'error');
        return;
    }

    var aps_id = rows[0].aps_id;

    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'insert_schema_employe_relation',
        aps_id: aps_id,
        u_id: u_id
    }, function (data) { 
        if (data.result == 1) {
            get_schema_employe_relation(aps_id);
        } else {
            $.messager.alert('错误提示', data.msg, 'error');
        } 
    }, true);
}

//快捷筛选
function oninput_schema_employe_query() {
    var conditions = $.trim($('#schema_employe_searchbox').val().toUpperCase());

    var valid_arr = [];
    $.each(cur_user_list, function (i, row) {
        if (row.u_valid == 1) {
            valid_arr.push(row);
        }
    });


    var new_arr = [];
    if (conditions.length > 0) {
        $.each(valid_arr, function (i, row) {

            if (row.u_login_name.toUpperCase().indexOf(conditions) > -1 ||
                row.u_real_name.toUpperCase().indexOf(conditions) > -1 ||
                row.u_phone.toUpperCase().indexOf(conditions) > -1 ||
                row.u_email.toUpperCase().indexOf(conditions) > -1) {
                new_arr.push(row);
            }
        })
    } else {
        new_arr = valid_arr;
    }
    $("#tab_ap_schema_employe").datagrid('loadData', { total: new_arr.length, rows: new_arr });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////组织结构和用户关系////////////////////////////////
/*组织结构图*/
function query_schema_cto() {
    post('../Ashx/schema_cto.ashx', {
        rnd: Math.random(),
        action: 'get_schema_cto'
    }, function (data) { 
      
        init_schema_tree(data.rows); 
    }, true);
}

//递归生成 树结构图 
function dg_tree_struck(schema_cto_list, c_id) {

    var cld = [];

    $.each(schema_cto_list, function (i, item) {
        if (item.c_father_id == c_id) {
            var tm = {
                id: item.c_id,
                text: item.c_desc,
                c_father_id: item.c_father_id,
                c_typ: item.c_typ,
                iconCls: item.c_typ == 1 ? 'icon-house' : (item.c_typ == 2 ? 'icon-group' : 'icon-user_female'),
                children: []
            };

            tm.children = dg_tree_struck(schema_cto_list, tm.id);

            cld.push(tm);
        }
    });
    return cld;
}

function init_schema_tree(schema_cto_list) {

    //理论上 ID = c_father_id + _ + c_id 

    if (schema_cto_list.length == 0) {
        cur_schema_cto_list = undefined;
    } else {
        cur_schema_cto_list = schema_cto_list;

        var tree_json = {
            id: schema_cto_list[0].c_id,
            text: schema_cto_list[0].c_desc,
            c_father_id: schema_cto_list[0].c_father_id,
            c_typ: schema_cto_list[0].c_typ,
            iconCls: 'icon-2012081511767',
            children: []
        };

        tree_json.children = dg_tree_struck(schema_cto_list, tree_json.id);
        $('#tab_user_schema_relation').datagrid('loadData', { total: 0, rows: [] });
        $('#tree_schema_cto').tree({
            data: [tree_json],
            onClick: function (node) {
                cur_select_c_id = node.id;
                
                //我需要三个值
                //1 当前点击的类型 
                //2 当前点击的 c_id 
                //3 计算所包含的 c_id集合  
                get_user_schema_relation();

            },
            onContextMenu: function (e, node) {

                e.preventDefault();
                cur_select_c_id = node.id;
                var c_typ = '';
                $.each(cur_schema_cto_list, function (i, item) {
                    if (item.c_id == node.id) {
                        c_typ = item.c_typ;
                    }
                });

                $('.schema_lv').hide();
                $('.schema_lv_ed').hide();

                if (c_typ == 0) {
                    //这里只能添加公司
                    $('.schema_lv_' + (c_typ + 1)).show();
                    $('.schema_lv_' + (c_typ + 1) + '_add').show();
                } else if (c_typ == 1) {
                    //可以编辑公司，删除公司，添加部门，添加职位 
                    $('.schema_lv_' + c_typ).show();
                    $('.schema_lv_' + c_typ + '_remove').show();
                    $('.schema_lv_' + c_typ + '_edit').show();

                    $('.schema_lv_' + (c_typ + 1)).show();
                    $('.schema_lv_' + (c_typ + 1) + '_add').show();

                    $('.schema_lv_' + (c_typ + 2)).show();
                    $('.schema_lv_' + (c_typ + 2) + '_add').show();
                } else if (c_typ == 2) {
                    //可以 添加部门  编辑部门，添加职位 
                    $('.schema_lv_' + c_typ).show();
                    $('.schema_lv_' + c_typ + '_add').show();
                    $('.schema_lv_' + c_typ + '_remove').show();
                    $('.schema_lv_' + c_typ + '_edit').show();

                    $('.schema_lv_' + (c_typ + 1)).show();
                    $('.schema_lv_' + (c_typ + 1) + '_add').show();
                } else if (c_typ == 3) {
                    $('.schema_lv_' + c_typ).show();
                    $('.schema_lv_' + c_typ + '_remove').show();
                    $('.schema_lv_' + c_typ + '_edit').show();
                }
                $('#menu_edit_schema').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        });

    }
}

//得到 节点下面的人员列表
function get_user_schema_relation() {
    var c_id = cur_select_c_id;
    var c_father_id = '';
    var c_typ = '';
    var cur_item = undefined;

    $.each(cur_schema_cto_list, function (i, item) {
        if (item.c_id == cur_select_c_id) {
            cur_item = item;
            c_typ = item.c_typ;
            c_father_id = item.c_father_id;
        }
    });
    if (c_typ == 1) {
        
        $('.cur_c_company').show();
        $('.cur_c_company_addition').show();

        $('#cur_c_en_desc').val(cur_item.c_en_desc);
        $('#cur_c_address').val(cur_item.c_address);
        $('#cur_c_en_address').val(cur_item.c_en_address);
        $('#cur_c_relation_phone').val(cur_item.c_relation_phone);
    }

    if (c_typ == 2) {
        
        $('.cur_c_company').show();
        $('.cur_c_company_addition').hide();

        $('#cur_c_en_desc').val('');
        $('#cur_c_address').val(cur_item.c_address);
        $('#cur_c_en_address').val(cur_item.c_en_address);
        $('#cur_c_relation_phone').val(cur_item.c_relation_phone);
    } 
    if (c_typ == 3) { 
        $('.cur_c_company').hide();
        $('#cur_c_en_desc').val('');
        $('#cur_c_address').val('');
        $('#cur_c_en_address').val('');
        $('#cur_c_relation_phone').val('');
    }

     
    var c_ids = dg_get_all_id(c_id);

    c_ids = (c_id + (c_ids.length == 0 ? '' : ',' + c_ids));

    post('../Ashx/schema_cto.ashx', {
        rnd: Math.random(),
        action: 'get_user_schema_relation',
        c_id: c_ids,
    }, function (data) { 
        $('#tab_user_schema_relation').datagrid('loadData', data); 
    }, true);
}
//添加 
function edit_ins_schema(c_typ) {

    $('#dlg_schame_en_desc').val('');
    $('#dlg_schame_address').val('');
    $('#dlg_schame_en_address').val('');
    $('#dlg_schame_relation_phone').val('');

    if (c_typ == 1) {
        $('.dlg_schema_title').html('公司:');
        $('.dlg_schema_company').show();
        $('.dlg_schema_company_addition').show();
    }

    if (c_typ == 2) {
        $('.dlg_schema_title').html('部门:');
        $('.dlg_schema_company').show();
        $('.dlg_schema_company_addition').hide();
    }

    if (c_typ == 3) {
        $('.dlg_schema_title').html('职位:');
        $('.dlg_schema_company').hide();
    }

    $('#dlg_schame_desc').val('');
     

    $('#dlg_edit_schema').dialog({
        buttons: [
        {
            text: '保存',
            iconCls: 'icon-save',
            handler: function () {
                var params = {
                    rnd: Math.random(), 
                    c_desc: $.trim($('#dlg_schame_desc').val()),
                    c_en_desc: $.trim($('#dlg_schame_en_desc').val()),
                    c_address: $.trim($('#dlg_schame_address').val()),
                    c_en_address: $.trim($('#dlg_schame_en_address').val()),
                    c_relation_phone: $.trim($('#dlg_schame_relation_phone').val()),
                    c_father_id: cur_select_c_id,
                    c_typ: c_typ,
                    action: 'insert_schema_cto'
                };
                if (params.c_desc == undefined || params.c_desc.length < 1) {
                    $.messager.alert('错误提示', '必须填写描述信息', 'error');
                    return;
                }
                post('../Ashx/schema_cto.ashx', params, function (data) {
                   
                    if (data.result == 1) {
                        $('#dlg_edit_schema').dialog('close');
                        query_schema_cto();
                        $.messager.alert('操作提示', data.msg, 'info');
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                     
                }, true);
            }
        }, {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_edit_schema').dialog('close');
                $('.validatebox-tip').remove();
            }
        }]
    }).dialog('open');

}

//编辑 
function edit_edit_schema(c_typ) { 
    var cur_edit = undefined;
    $.each(cur_schema_cto_list, function (i, item) {
        if (item.c_id == cur_select_c_id) {
            cur_edit = item;
        }
    });  
    $('#dlg_schame_desc').val(cur_edit.c_desc);

    if (c_typ == 1) {
        $('.dlg_schema_title').html('公司:');
        $('.dlg_schema_company').show();
        $('.dlg_schema_company_addition').show();

        $('#dlg_schame_en_desc').val(cur_edit.c_en_desc);
        $('#dlg_schame_address').val(cur_edit.c_address);
        $('#dlg_schame_en_address').val(cur_edit.c_en_address);
        $('#dlg_schame_relation_phone').val(cur_edit.c_relation_phone);
    }

    if (c_typ == 2) {
        $('.dlg_schema_title').html('部门:');
        $('.dlg_schema_company').hide();
        $('.dlg_schema_company_addition').hide();

        $('#dlg_schame_en_desc').val('');
        $('#dlg_schame_address').val('');
        $('#dlg_schame_en_address').val('');
        $('#dlg_schame_relation_phone').val('');
    }

    if (c_typ == 3) {
        $('.dlg_schema_title').html('职位:');
        $('.dlg_schema_company').hide();
        $('#dlg_schame_en_desc').val('');
        $('#dlg_schame_address').val('');
        $('#dlg_schame_en_address').val('');
        $('#dlg_schame_relation_phone').val('');
    }


    $('#dlg_edit_schema').dialog({
        buttons: [
        {
            text: '保存',
            iconCls: 'icon-save',
            handler: function () {
                var params = {
                    rnd: Math.random(),
                    c_desc: $.trim($('#dlg_schame_desc').val()),
                    c_en_desc: $.trim($('#dlg_schame_en_desc').val()),
                    c_address: $.trim($('#dlg_schame_address').val()),
                    c_en_address: $.trim($('#dlg_schame_en_address').val()),
                    c_relation_phone: $.trim($('#dlg_schame_relation_phone').val()),
                    c_id: cur_select_c_id,
                    action: 'update_schema_cto'
                };

                if (params.c_desc == undefined || params.c_desc.length < 1) {
                    $.messager.alert('错误提示', '必须填写描述信息', 'error');
                    return;
                }
               post('../Ashx/schema_cto.ashx', params, function (data) { 
                    if (data.result == 1) {
                        $('#dlg_edit_schema').dialog('close');
                        query_schema_cto();
                        $.messager.alert('操作提示', data.msg, 'info');
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    } 
                }, true);
            }
        }, {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_edit_schema').dialog('close');
                $('.validatebox-tip').remove();
            }
        }]
    }).dialog('open');

}
//删除
function edit_del_schema(c_typ) {
    $.messager.confirm('删除组织框架提示', '删除操作将删除当前节点及下属全部节点，且取消所有人员关联，是否继续？',
        function (r) {
            if (r) {
                 

                var c_id = dg_get_all_id(cur_select_c_id);

                c_id = (cur_select_c_id + (c_id.length == 0 ? '' : ',' + c_id));

                post('../Ashx/schema_cto.ashx', {
                    rnd: Math.random(),
                    action: 'delete_schema_cto',
                    c_id: c_id
                }, function (data) {
                     
                    if (data.result == 1) {
                        $('#dlg_edit_schema').dialog('close');
                        query_schema_cto();
                        $.messager.alert('操作提示', data.msg, 'info');
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                    
                }, true);
            }
        }
    );
}

//递归树下属节点 
function dg_get_all_id(c_id) {
    var t_str = '';
    $.each(cur_schema_cto_list, function (i, item) {
        if (item.c_father_id == c_id) {
            if (t_str.length == 0) {
                t_str = '' + item.c_id;
            } else {
                t_str += ',' + item.c_id;
            }
            var tt = dg_get_all_id(item.c_id);
            if (tt.length > 0) {
                t_str += ',' + tt;
            }
        }
    });

    return t_str;
}


//打开员工选择框，选择员工到 职位
function bind_user_schema_relation() {
    var c_typ = undefined;
    $.each(cur_schema_cto_list, function (i, row) {
        if (row.c_id == cur_select_c_id) {
            c_typ = row.c_typ;
        }
    });

    if (c_typ != 3) {
        $.messager.alert('错误提示','错误: 请在职位下新增或移除员工','error');
        return;
    }
     
    post('../Ashx/usermgr.ashx', {
        rnd: Math.random(),
        action: 'get_userlist'
    }, function (data) { 
        var new_arr = [];

        $.each(data.rows, function (i, row) {
            if (row.u_valid == 1 && row.u_admin_flag != 1) {
                new_arr.push(row);
            }
        }); 
        cur_dlg_user_list = new_arr;

        $("#dlg_tab_user_list_for_bind_to_schema").datagrid('loadData', { total: new_arr.length, rows: new_arr });

        $('#dlg_edit_bind_user_schema').dialog({
            title: '选择员工',
            iconCls: 'icon-save',
            autoOpen: false,
            modal: true,
            width: 500,
            height: 450,
            buttons: [{
                text: '确定',
                iconCls: 'icon-add',
                handler: function () {
                    var rows = $("#dlg_tab_user_list_for_bind_to_schema").datagrid('getChecked');

                    if (rows.length == 0) {
                        $.messager.alert('错误提示', '请勾选一个员工后再执行确定操作', 'error');
                        return;
                    }

                    if (rows.length > 1) {
                        $.messager.alert('错误提示', '只能勾选一个员工', 'error');
                        return;
                    }

                    var params = {
                        rnd: Math.random(),
                        u_id: rows[0].u_id,
                        c_id: cur_select_c_id,
                        action: 'bind_user_schema_relation'
                    };
                    post('../Ashx/schema_cto.ashx', params, function (data) {
                         
                        if (data.result == 1) {

                            get_user_schema_relation();
                            $.messager.confirm('提示', '绑定员工到职位完成，是否继续操作？', function (r) {
                                if (r) {
                                } else {
                                    $('#dlg_edit_bind_user_schema').dialog('close');
                                }
                            });
                        } else {
                            $.messager.alert('错误提示', data.msg, 'error');
                        }
                         
                    }, true);
                }
            }, {

                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_edit_bind_user_schema').dialog('close');
                }
            }]
        }).dialog('open');
      
    }, true);

}

//取消员工绑定到职位
function unbind_user_schema_relation() {
    var c_typ = undefined;
    $.each(cur_schema_cto_list, function (i, row) {
        if (row.c_id == cur_select_c_id) {
            c_typ = row.c_typ;
        }
    });

    if (c_typ != 3) {
        $.messager.alert('错误提示', '错误: 请在职位下新增或移除员工', 'error');
        return;
    }

    var rows = $('#tab_user_schema_relation').datagrid('getChecked');

    if (rows.length > 0) {

        var u_id = '';

        $.each(rows, function (i, row) {
            if (u_id.length == 0) {
                u_id = row.u_id;
            } else {
                u_id += ',' + row.u_id;
            }
        });

        $.messager.confirm('提示', '您确定要取消所选择用户的职务吗？', function (r) {
            if (r) {
               post('../Ashx/schema_cto.ashx', {
                    rnd: Math.random(),
                    action: 'unbind_user_schema_relation',
                    c_id: cur_select_c_id,
                    u_id: u_id,
                }, function (data) { 
                    if (data.result == 1) {
                        get_user_schema_relation();
                        $.messager.alert('提示', data.msg, 'info');
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    } 
                }, true);
            }
        });

    } else {
        $.messager.alert('错误提示', '请选择人员', 'error');
    }
}
//查询员工和职位的关系
function query_bind_user_schema_relation_tab(obj) {
    var like_str = $.trim($(obj).val().toUpperCase());

    if (like_str.length == 0) {
        $("#dlg_tab_user_list_for_bind_to_schema").datagrid('loadData', { total: cur_dlg_user_list.length, rows: cur_dlg_user_list });
    } else {
        var new_arr = [];
        $.each(cur_dlg_user_list, function (i, row) {
            if (row.u_valid == 1 && ((row.u_real_name.toUpperCase().indexOf(like_str) > -1)
                || (row.u_phone.toUpperCase().indexOf(like_str) > -1))
                ) {
                new_arr.push(row);
            }
        });
        $("#dlg_tab_user_list_for_bind_to_schema").datagrid('loadData', { total: new_arr.length, rows: new_arr });
    }
}
//初始化 部门职位员工表  
function init_user_schema_relation_tab() {
    $('#tab_user_schema_relation').datagrid({
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_user_schema_relation_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', width: 40, sortable: true, checkbox: true },
            { field: 'u_real_name', width: 80, title: '姓名' },
            { field: 'c_desc', width: 540, title: '职位' }
        ]]
    });
}

function init_dlg_user_list_for_bind_to_schema_tab() {
    $("#dlg_tab_user_list_for_bind_to_schema").datagrid({
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#dlg_edit_bind_user_schema_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120],

        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', width: 40, sortable: true, checkbox: true },
            { field: 'u_real_name', width: 80, title: '姓名' },
            { field: 'u_phone', width: 140, title: '电话' } 
        ]]
    });
}


/////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////用户////////////////////////////////
 

/*初始化用户表格*/
function init_user_list() {

    $("#tab_users").datagrid({
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_users_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', width: 100, sortable: true, checkbox: true },
            { field: 'u_login_name', width: 130, title: '账号', align: 'center', sortable: true },
            { field: 'u_real_name', width: 80, title: '姓名', align: 'center', sortable: true },
            { field: 'u_phone', width: 130, title: '电话', align: 'center', sortable: true },
            { field: 'u_email', width: 190, title: '邮件', align: 'center', sortable: true },
            { field: 'u_qq', width: 120, title: 'QQ', align: 'center', sortable: true },
            { field: 'u_wx', width: 140, title: '微信', align: 'center', sortable: true },
            {
                field: 'u_admin_flag', width: 80, title: '管理员标记', align: 'center', sortable: true,
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '';
                    }
                },
            },
            { field: 'u_creat_name', width: 80, title: '创建人', align: 'center', sortable: true },
            {
                field: 'u_creat_date', width: 120, title: '创建时间', align: 'center',
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            },
            {
                field: 'u_valid', title: '有效性', align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '无效';
                    }
                },
                styler: function (value, row, index) {
                    if (value == 1) {
                        return 'color:#000;';
                    } else {
                        return 'background-color:#8d8d8d;color:#fff;';
                    }
                }
            }
        ]],
        onDblClickRow: function (index, row) {

            $('#dlg_u_login_nam').val(row.u_login_name);
            $('#dlg_u_password').val(row.u_pwd);
            $('#dlg_u_nam').val(row.u_real_name);
            $('#dlg_u_phone').val(row.u_phone);
            $('#dlg_u_email').val(row.u_email);
            $('#dlg_u_qq').val(row.u_qq);
            $('#dlg_u_wx').val(row.u_wx);
            $('#dlg_u_admin_flag').combobox('setValue', row.u_admin_flag == undefined ? 0: row.u_admin_flag);

            if (row.u_valid == 1) {
                $('#dlg_u_valid').prop('checked', true);
            } else {
                $('#dlg_u_valid').prop('checked', false);
            }

            $('#hid_u_id').val(row.u_id);
            open_edit_users_dialog(false);

        },
        onClickCell: function (rowIndex, field, value) {

        },
        onLoadSuccess: function (data) {

        }
    });
}

//筛选 
function query_user_list() {
    post('../Ashx/usermgr.ashx', {
        rnd: Math.random(),
        action: 'get_userlist'
    }, function (data) { 
        cur_user_list = data.rows;

        oninput_query();

        $('#tab_ap_schema_employe').datagrid('loadData', data);
         
    },true);
}

//快捷筛选
function oninput_query() {
    var conditions = $.trim($('#user_list_searchbox').val().toUpperCase());

    var new_arr = [];
    if (conditions.length > 0) {
        $.each(cur_user_list, function (i, row) {
            if ( row.u_login_name.toUpperCase().indexOf(conditions) > -1 ||
                row.u_real_name.toUpperCase().indexOf(conditions) > -1 ||
                row.u_phone.toUpperCase().indexOf(conditions) > -1 ||
                row.u_email.toUpperCase().indexOf(conditions) > -1) {
                new_arr.push(row);
            }
        })
    } else {
        new_arr = cur_user_list;
    }
    $("#tab_users").datagrid('loadData', { total: new_arr.length, rows: new_arr });
}
//打开编辑(新增)对话框
function open_edit_users_dialog(isnew) {
    var title = '';
    var icon = '';
    var btn_text = '';
    if (isnew) {
        title = '新建用户';
        icon = 'save';
        /*新建的时候，清空*/
        $('#dlg_eitd_user_form').form('clear'); 
        $("#dlg_u_login_nam").attr("readonly", false);
        $("#dlg_u_password").attr("readonly", false);

        $('#dlg_u_valid').attr('checked',true).attr('readonly',true);
    } else {
        title = '编辑用户';
        icon = 'edit';
        $("#dlg_u_login_nam").attr("readonly", true);
        $("#dlg_u_password").attr("readonly", true);
        $('#dlg_u_valid').attr('readonly', false);
    }

    $('#dlg_edit_users').dialog({
        title: title,
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-' + icon,
                handler: function () {

                    var params = {
                        u_real_name: $.trim($('#dlg_u_nam').val()),
                        u_phone: $.trim($('#dlg_u_phone').val()),
                        u_email: $.trim($('#dlg_u_email').val()),
                        u_qq: $.trim($('#dlg_u_qq').val()),
                        u_wx: $.trim($('#dlg_u_wx').val()),
                        u_sex: 0,
                        u_admin_flag: $.trim($('#dlg_u_admin_flag').combobox('getValue')),

                    };


                    //判断是新建还是保存
                    if (isnew) {
                        params.action = 'insert_user';
                        params.u_login_name = $.trim($('#dlg_u_login_nam').val()).toUpperCase();
                        params.u_pwd = $('#dlg_u_password').val().toUpperCase();
                        var math_1 = /^[a-zA-Z0-9_]{4,15}$/;
                        var math_2 = /^[a-zA-Z0-9_]\w{4,15}$/;
                        if (params.u_login_name == undefined || params.u_login_name.length < 4 ||
                        !math_1.test(params.u_login_name)
                        ) {
                            $.messager.alert('错误提示', '账号必须字母开头且是由数字、字母、下划线组成且长度在4-15之间！', 'error');
                            return;
                        }


                        if (params.u_pwd == undefined || params.u_pwd.length < 4 ||
                            !math_2.test(params.u_pwd)
                            ) {
                            $.messager.alert('错误提示', '密码必须由数字、字母、下划线组成且长度在4-15之间！', 'error');
                            return;
                        }

                    } else {
                        params.action = 'update_user';
                        params.u_id = $('#hid_u_id').val();
                        params.u_valid = $('#dlg_u_valid').is(':checked') ? 1 : 0;
                    }

                    if (params.u_admin_flag == undefined || params.u_admin_flag.length == 0) {
                        $.messager.alert('错误提示', '必须设置角色类型', 'error');
                        return;
                    }
                    post('../Ashx/usermgr.ashx', params, function (data) { 
                        if (data.result == 1) {
                            query_user_list();
                            $.messager.confirm('提示', isnew ? '员工新增成功，是否继续新增？':'员工修改完成，是否继续修改？', function (r) {
                                if (r) {
                                    $('#dlg_eitd_user_form').form('clear');

                                    $("#dlg_u_login_nam").attr("readonly", false);
                                    $("#dlg_u_password").attr("readonly", false);
                                    $('#dlg_u_valid').attr('readonly', false);
                                } else {
                                    $('#dlg_edit_users').dialog('close');
                                }
                            });
                        } else {
                            $.messager.alert('错误提示', data.msg, 'error');
                        } 
                    }, true);
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_edit_users').dialog('close');
                    $('.validatebox-tip').remove();
                }
            }]
    }).dialog('open');
}

//重置密码
function reset_user_password() {

    var rows = $('#tab_users').datagrid('getChecked');

    if (rows.length != 0) {
        $.messager.confirm('提示', '您确定要重置该用户的密码吗？(PS，重置密码为用户电话号码)', function (r) {
            if (r) {
                post('../Ashx/usermgr.ashx',
                 {
                     rnd: Math.random(),
                     action: 'reset_user_password',
                     u_id: rows[0].u_id
                 },
                 function (data) {
                     if (data.result > 0) {
                         $.messager.alert( 
                              '操作提示',
                              data.msg,
                              'info'
                          );

                     } else {
                         $.messager.alert('错误提示', data.msg, 'error');
                     }
                 }, true);
            }
        });

    } else {
        $.messager.alert("提示", "未选中数据行！");
    }

}

//删除用户
function del_user() {

    var rows = $('#tab_users').datagrid('getChecked');

    if (rows.length != 0) {
        $.messager.confirm('提示', '您确定要删除该用户吗？', function (r) {
            if (r) {
                var u_ids = [];
                $.each(rows, function (i, row) {
                    u_ids.push(row.u_id)
                });

                post('../Ashx/usermgr.ashx',
                    {
                        rnd: Math.random(),
                        action: 'delete_user',
                        u_ids: u_ids.join(',')
                    },
                    function (data) { 
                        if (data.result > 0) {
                            $.messager.alert('操作提示', data.msg, 'info');
                            query_user_list();
                        } else {
                            $.messager.alert('错误提示', data.msg, 'error');
                        }
                    }, true);
            }
        });

    } else {
        $.messager.alert("提示", "未选中删除的数据行！");
    }

}



/////////////////////////////////////////////////////////////////////////////////////////////////////
