//默认第一页，
var pageNumber = 1;
//每页显示10行
var pageSize = 30;

$(document).ready(function () {
    bind_combogrid_custom($("#dlg_ship_rent_cu_id"))
    refresh_ships();
})

function bind_combogrid_custom($target) {
    $target.combogrid({
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
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_custom_by_like_str_for_combogrid';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('cu_id', '');
            },
        },
        onSelect: function (index, item) {              //选中处理   
            $target.data('cu_id', item.cu_id);
            $target.combogrid('setText', item.cu_name);
        }
    });
}



function return_parmar() {
    var like_search = $("#searchbox").val();
    
    var par = {
        rnd: Math.random(),
        action: 'get_ship_list',
        like_search: like_search 
    }
    return par;
}
function refresh_ships() {
    $("#tab_ship_list").datagrid({
        url: '/Ashx/ship.ashx',
        queryParams: return_parmar(),
        method: 'post',
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#ship_list_bar',
        fit: true,
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: false,
        checkOnSelect: false,
        columns: [[//显示的列
                { field: 'ck', title: 'ID', width: 40, sortable: true, checkbox: true }
                , { field: 'ship_desc', title: '船舶名称', sortable: true, width: 70 }
                , { field: 'ship_en_cod', title: '船舶简码', width: 60 }
                , { field: 'ship_en_long_cod', width: 150, title: '拼音代码' }
                , { field: 'cu_desc', title: '船东单位', width: 190, }
                , { field: 'ship_relation_phone', title: '联系电话',width:100 }
                , { field: 'ship_max_std_cntr_num', title: '最大装载箱量', width: 80 }
                , { field: 'ship_custom_no', title: '海关编码', width: 60 }
                , { field: 'ship_original_no', title: '初次登记号', width: 90 }
                , { field: 'ship_regist_no', title: '船舶登记号', width: 90 }
                , { field: 'ship_recognition_no', title: '船舶识别号', width: 90 }
                , {
                    field: 'ship_valid', title: '有效性',width: 60,
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return '有效';
                        } else {
                            return '无效'
                        }
                    },
                    styler: function (value, row, index) {
                        if (value == 1) {
                            return 'background-color:#fff;color:#000;';
                        } else {
                            return 'background-color:#8d8d8d;color:#fff;';
                        }
                    }
                }
                , { field: 'ship_create_desc', title: '创建人', width: 70 }
                , {
                    field: 'ship_create_date', title: '创建时间',width:70,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , { field: 'ship_update_desc', title: '更新人', width: 70 }
                , {
                    field: 'ship_update_date', title: '更新时间', width: 70,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
        ]],
        onDblClickRow: function (index, row) {
            $('#dlg_ship_desc').val(row.ship_desc);
            $('#dlg_ship_en_cod').val(row.ship_en_cod);
            $('#dlg_ship_en_long_cod').val(row.ship_en_long_cod);
            $('#dlg_ship_rent_cu_id').data('cu_id', row.ship_rent_cu_id)
            $('#dlg_ship_rent_cu_id').combogrid('setText',row.cu_desc);
            $('#dlg_ship_relation_phone').val(row.ship_relation_phone);
            $('#dlg_ship_max_std_cntr_num').val(row.ship_max_std_cntr_num);
        
            $('#dlg_ship_custom_no').val(row.ship_custom_no);
            $('#dlg_ship_original_no').val(row.ship_original_no);
            $('#dlg_ship_regist_no').val(row.ship_regist_no);
            $('#dlg_ship_recognition_no').val(row.ship_recognition_no);
          
            if (row.ship_valid == 1) {
                $('#dlg_ship_valid').prop('checked', true);
            } else {
                $('#dlg_ship_valid').prop('checked', false);
            }
            $('#dlg_ship_id').val(row.ship_id);
            open_edit_ship_dialog(false);
        },
        onClickCell: function (rowIndex, field, value) {

        }
    });


    $(".datagrid-toolbar").append($("#dv_toolbar"));


}

/*船舶表格菜单功能*/
function open_edit_ship_dialog(isnew) {
    var title = '';
    var icon = '';
    var btn_text = '';
    if (isnew) {
        title = '新建船舶';
        icon = 'save';
        /*新建的时候，清空*/
        $('#dlg_eitd_ship_form').form('clear');
        $('#dlg_ship_valid').prop('checked',true);
    } else {
        title = '编辑船舶';
        icon = 'edit'
    }

    $('#dlg_edit_ship').dialog({
        title: title,
        modal: true,
        width: 550,
        minheight: 350,
        buttons: [
            {
                text: '保存',
                iconCls: 'icon-' + icon,
                handler: function () {

                    var params = {
                        action:'insert_update_ship',
                        ship_name: $.trim($('#dlg_ship_desc').val()),
                        ship_en_cod: $.trim($('#dlg_ship_en_cod').val().toUpperCase()),
                        ship_en_long_cod: $.trim($('#dlg_ship_en_long_cod').val().toUpperCase()),
                        ship_rent_cu_id: $('#dlg_ship_rent_cu_id').data('cu_id'),
                        ship_relation_phone: $('#dlg_ship_relation_phone').val(),
                        ship_max_std_cntr_num: $('#dlg_ship_max_std_cntr_num').val(),
                        ship_custom_no: $('#dlg_ship_custom_no').val(),
                        ship_original_no: $('#dlg_ship_original_no').val(),
                        ship_regist_no: $('#dlg_ship_regist_no').val(),
                        ship_recognition_no: $('#dlg_ship_recognition_no').val()                    
                    };


                    if (params.ship_name == undefined || params.ship_name.length == 0) {
                        $.messager.alert('错误提示','错误:船名不能为空值','error');
                        return;
                    }

                    if (params.ship_en_cod == undefined || params.ship_en_cod.length == 0) {
                        $.messager.alert('错误提示', '错误:船代码不能为空值', 'error'); 
                        return;
                    }

                    if (params.ship_en_long_cod == undefined || params.ship_en_long_cod.length == 0) {
                        $.messager.alert('错误提示', '错误:船拼音码不能为空值', 'error'); 
                        return;
                    }
                    if (params.ship_rent_cu_id == undefined || params.ship_rent_cu_id == '') {
                        $.messager.alert('错误提示', '错误:船东不是预设值或是空值', 'error');
                        return;
                    }
                     
                    //判断是新建还是保存
                    if (isnew) {
                        params.ship_id = 0;
                    } else {
                        params.ship_id = $('#dlg_ship_id').val();
                        params.ship_valid = $('#dlg_ship_valid').is(':checked') ? 1 : 0;
                    }

                    $.post('../Ashx/ship.ashx', params, function (data) {
                        if (!session_out(data)) {
                            if (data.result == 1) {
                                $("#tab_ship_list").datagrid("load", return_parmar());
                                if (isnew) {
                                    $.messager.confirm('完成提示', data.msg + '，是否继续新建?',
                                    function (r) {
                                        if (r) {
                                            open_edit_ship_dialog(true);
                                        } else {
                                            $('#dlg_edit_ship').dialog('close');
                                        }
                                    });
                                } else {
                                    $.messager.confirm('完成提示', data.msg + '，是否继续编辑?',
                                    function (r) {
                                        if (r) {
                                            open_edit_ship_dialog(false);
                                        } else {
                                            $('#dlg_edit_ship').dialog('close');
                                        }
                                    });
                                }
                            } else {
                                dlg_save_result_tips(data.msg);
                            }
                        }
                    }, 'json');
                }
            }, {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_edit_ship').dialog('close');
                }
            }]
    }).dialog('open');
}
