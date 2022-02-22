var pageNumber = 1;
//每页显示10行
var pageSize = 30;

var cur_row = undefined;

$(document).ready(function () {

    //初始化对话框
    $('#dlg_edit_custom').dialog({
        title: '编辑客户信息',
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
                $('#dlg_edit_custom').dialog('close');
            }
        }]
    }).dialog('close');

    $('#dlg_edit_bank').dialog({
        title: '编辑银行信息',
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
                $('#dlg_edit_bank').dialog('close');
            }
        }]
    }).dialog('close');

    get_basesetting();


})

function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        basesetting = data;
 
        bind_combobox(basesetting.custom_typ_list, $('#serach_custom_cu_type'), 'ct_desc', 'ct_id', true);
        bind_combobox(basesetting.custom_typ_list, $('#dlg_cu_type'), 'ct_desc', 'ct_id', false);

        bind_combobox(basesetting.currency_list, $('#dlg_ba_cr_id'), 'cr_name', 'cr_id', false);

        load_tab_bank();

        load_tab_custom();
    }, true);
     
}
 
//表格初始化
function load_tab_custom() {

    $("#tab_custom").datagrid({
        url: '/Ashx/sys_base.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_custom',
            like_str: $.trim($("#search_custom_like_str").val()),
            cu_type: $('#serach_custom_cu_type').combobox('getValue')
        },
        method: 'post',
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_custom_bar',
        fit: true,
        fitColumns: false,
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'ck', rowspan: 2, title: 'ID', width: 40, sortable: true, checkbox: true },
            { title: '基础信息', colspan: 5, },
            { title: '默认银行', colspan: 3, },
            { title: '账单投递限制', colspan: 2, },
            { field: 'cu_create_by_name', rowspan: 2, width: 70, title: '创建人', align: 'left', sortable: true },
            {
                field: 'cu_create_date', rowspan: 2, width: 90, title: '创建时间', align: 'left', sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            },
        ], [
            
            { field: 'cu_name', width: 300, title: '客户名称', align: 'left', sortable: true },
            { field: 'cu_code', width: 140, title: '代码', align: 'left', sortable: true },
            { field: 'cu_short', width: 120, title: '简称', align: 'left', sortable: true },
            { field: 'cu_duty_no', width: 100, title: '税号', align: 'left', sortable: true },
            { field: 'cu_type_desc', width: 80, title: '类型', align: 'left', sortable: true },
            { field: 'cr_name', width: 60, title: '币种', align: 'left', sortable: true },
            { field: 'ba_desc', width: 180, title: '银行', align: 'left', sortable: true },
            { field: 'ba_card_no', width: 160, title: '卡号', align: 'left', sortable: true },
            {
                field: 'cu_rec_checkaccount_flag', width: 40, title: '应收', align: 'left', sortable: true,
                formatter: function (value, row, index) {
                    if (Number(value) == 0) {
                        return '<i class="icon-no" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    }
                }
            },
            {
                field: 'cu_pay_checkaccount_flag', width: 40, title: '应付', align: 'left', sortable: true,
                formatter: function (value, row, index) {
                    if (Number(value) == 0) {
                        return '<i class="icon-no" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    }
                }
            },
          
        ]],
        onDblClickRow: function (index, row) {
            $('#hid_cu_id').val(row.cu_id);
            $('#dlg_cu_type').combobox('setValue', row.cu_type);
            $('#dlg_cu_name').val(row.cu_name);
            $('#dlg_cu_code').val(row.cu_code);
            $('#dlg_cu_short').val(row.cu_short);
            $('#dlg_cu_duty_no').val(row.cu_duty_no);
            $('#dlg_cu_rec_checkaccount_flag').prop('checked', Number(row.cu_rec_checkaccount_flag) == 1);
            $('#dlg_cu_pay_checkaccount_flag').prop('checked', Number(row.cu_pay_checkaccount_flag) == 1);

            reload_tab_bank(row.cu_id);
            $('#dlg_edit_custom').dialog({
                title: '编辑客户信息',
                iconCls: 'icon-save',
                autoOpen: false,
                modal: true,
                width: 800,
                minheight: 450,
                buttons: [{
                    text: '保存',
                    iconCls: 'icon-save',
                    handler: function () {
                        var par = {
                            action: 'update_custom',
                            cu_id: $('#hid_cu_id').val(),
                            cu_type: $('#dlg_cu_type').combobox('getValue'),
                            cu_name: $.trim($('#dlg_cu_name').val()),
                            cu_code: $.trim($('#dlg_cu_code').val()),
                            cu_short: $.trim($('#dlg_cu_short').val()),
                            cu_duty_no: $.trim($('#dlg_cu_duty_no').val()),
                            cu_fee_limit_days: $.trim($('#dlg_cu_fee_limit_days').val()),
                            cu_rec_checkaccount_flag: $('#dlg_cu_rec_checkaccount_flag').is(':checked')?1:0,
                            cu_pay_checkaccount_flag: $('#dlg_cu_pay_checkaccount_flag').is(':checked') ? 1 : 0,
                        };

                        if (isNaN(par.cu_type)) {
                            $.messager.alert('错误提示', '错误:请选择正确的客户类型类型', 'error');
                            return;
                        }

                        if (par.cu_name == undefined || par.cu_name.length == 0) {
                            $.messager.alert('错误提示', '错误:必须填写客户全称', 'error');
                            return;
                        }
                        if (par.cu_code == undefined || par.cu_code.length == 0) {
                            $.messager.alert('错误提示', '错误:必须填写客户代码', 'error');
                            return;
                        }
                        if (par.cu_short == undefined || par.cu_short.length == 0) {
                            $.messager.alert('错误提示', '错误:必须填写客户简称', 'error');
                            return;
                        }


                        post('../Ashx/sys_base.ashx', par, function (data) {
                            if (data.result == 1) {
                                $.messager.confirm('提示', data.msg + '是否继续编辑？',
                                    function (r) {
                                        if (r) {

                                        } else {
                                            $('#dlg_edit_custom').dialog('close');

                                            var like_str = undefined;

                                            if (par.cu_name != undefined && par.cu_name.length > 0) {
                                                like_str = par.cu_name;
                                            } else {
                                                if (par.cu_code != undefined && par.cu_code.length > 0) {
                                                    like_str = par.cu_code;
                                                } else {
                                                    like_str = par.cu_short;
                                                }
                                            }
                                            $('#serach_custom_cu_type').combobox('setValue', par.cu_type);

                                            $("#tab_custom").datagrid('load', {
                                                rnd: Math.random(),
                                                action: 'get_custom',
                                                like_str: like_str,
                                                cu_type: par.cu_type
                                            });
                                        }
                                    }
                                );

                            } else {
                                $.messager.alert('错误提示', data.msg, 'error');
                            }
                        }, true);
                    }
                },
                {
                    text: '关闭',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#dlg_edit_custom').dialog('close');
                    }
                }]
            }).dialog('open');
        } 
    });
    
    //增加
    $('#add_btn_custom').unbind('click').bind('click', function () {
        $('#hid_cu_id').val('');
        $('#dlg_cu_name').val('');
        $('#dlg_cu_code').val('');
        $('#dlg_cu_short').val('');
        $('#dlg_cu_duty_no').val('');
        $('#dlg_cu_rec_checkaccount_flag').prop('checked',true);
        $('#dlg_cu_pay_checkaccount_flag').prop('checked', true);

        $('#dlg_edit_custom').dialog({
            title: '新增客户信息',
            iconCls: 'icon-save',
            autoOpen: false,
            modal: true,
            width: 800,
            minheight: 450,
            buttons: [{
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var par = {
                        action: 'insert_custom',
                        cu_type: $('#dlg_cu_type').combobox('getValue'),
                        cu_name: $.trim($('#dlg_cu_name').val()),
                        cu_code: $.trim($('#dlg_cu_code').val()),
                        cu_short: $.trim($('#dlg_cu_short').val()),
                        cu_duty_no: $.trim($('#dlg_cu_duty_no').val()), 
                        cu_fee_limit_days: $.trim($('#dlg_cu_fee_limit_days').val()),
                        cu_rec_checkaccount_flag: $('#dlg_cu_rec_checkaccount_flag').is(':checked') ? 1 : 0,
                        cu_pay_checkaccount_flag: $('#dlg_cu_pay_checkaccount_flag').is(':checked') ? 1 : 0,
                    };

                    if (isNaN(par.cu_type)) {
                        $.messager.alert('错误提示', '错误:请选择正确的客户类型类型', 'error');
                        return;
                    }

                    if (par.cu_name == undefined || par.cu_name.length == 0)
                    {
                        $.messager.alert('错误提示', '错误:必须填写客户全称', 'error');
                        return;
                    }
                    if (par.cu_code == undefined || par.cu_code.length == 0)
                    {
                        $.messager.alert('错误提示', '错误:必须填写客户代码', 'error');
                        return;
                    }
                    if (par.cu_short == undefined || par.cu_short.length == 0)
                    {
                        $.messager.alert('错误提示', '错误:必须填写客户简称', 'error');
                        return;
                    }
                         

                    post('../Ashx/sys_base.ashx', par, function (data) {
                        if (data.result == 1) { 
                            $.messager.confirm('提示', data.msg + '是否继续编辑？',
                                function (r) {
                                    if (r) {
                                        $('#hid_cu_id').val(data.cu_id);
                                    } else {
                                        $('#dlg_edit_custom').dialog('close');

                                        var like_str = undefined;

                                        if (par.pl_name != undefined && par.pl_name.length > 0) {
                                            like_str = par.pl_name;
                                        } else {
                                            if (par.pl_en_name != undefined && par.pl_en_name.length > 0) {
                                                like_str = par.pl_en_name;
                                            } else {
                                                like_str = par.pl_code;
                                            }
                                        }
                                        $("#tab_custom").datagrid('load', {
                                            rnd: Math.random(),
                                            action: 'get_custom',
                                            like_str: $.trim($("#search_custom_like_str").val()),
                                            cu_type: $('#serach_custom_cu_type').combobox('getValue')
                                        });
                                    }
                                }
                            );

                        } else {
                            $.messager.alert('错误提示', data.msg, 'error');
                        }
                    }, true);
                }
            },
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $("#tab_custom").datagrid('load', {
                        rnd: Math.random(),
                        action: 'get_custom',
                        like_str: $.trim($("#search_custom_like_str").val()),
                        cu_type: $('#serach_custom_cu_type').combobox('getValue')
                    });
                    $('#dlg_edit_custom').dialog('close');
                }
            }]
        }).dialog('open');
    });
    //删除
    $('#del_btn_custom').unbind('click').bind('click', function () {
        var del_rows = $("#tab_custom").datagrid('getChecked');

        if (del_rows.length == 0) {
            $.messager.alert('错误提示', '请选择要删除的数据', 'error');
            return;
        }
        var cu_ids = '';

        $.each(del_rows, function (i, item) {
            if (cu_ids.length == 0) {
                cu_ids = item.cu_id;
            } else {
                cu_ids += ',' + item.cu_id;
            }
        });

        $.messager.confirm('删除提示', '确定要删除选择的' + del_rows.length + '行数据？',
        function (r) {
            if (r) {
                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'delete_custom',
                    cu_ids: cu_ids
                }, function (data) {
                    if (data.result == 1) {

                        $.messager.alert('提示', data.msg, 'info');
                        $("#tab_custom").datagrid('load', {
                            rnd: Math.random(),
                            action: 'get_custom',
                            like_str: $.trim($("#search_custom_like_str").val()),
                            cu_type: $('#serach_custom_cu_type').combobox('getValue')
                        });
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }, true);
            }
        });
    });
    //查询
    $('#query_btn_custom').unbind('click').bind('click', function () {
        $("#tab_custom").datagrid('load', {
            rnd: Math.random(),
            action: 'get_custom',
            like_str: $.trim($("#search_custom_like_str").val()),
            cu_type: $('#serach_custom_cu_type').combobox('getValue')
        });
        $("#tab_bank").datagrid('loadData', { total: 0, rows: [] });
    });
    //清空查询
    $('#refresh_btn_custom').unbind('click').bind('click', function () {
        $('#search_custom_like_str').val('');
        $('#serach_custom_cu_type').combobox('setValue', '');

        $("#tab_custom").datagrid('load', {
            rnd: Math.random(),
            action: 'get_custom',
            like_str: $.trim($("#search_custom_like_str").val()),
            cu_type: $('#serach_custom_cu_type').combobox('getValue')
        });

        $("#tab_bank").datagrid('loadData', {total:0,rows:[]});
    });
}

//加载银行信息
function reload_tab_bank(cu_id) {

    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_bank_by_cu_id',
        ba_cu_id: cu_id,
        ba_default_flag: ''
    }, function (data) {
        $("#tab_bank").datagrid('loadData',data);
    },true);
}

//加载银行信息
function load_tab_bank() { 
    $("#tab_bank").datagrid({
        data:{total:0,rows:[]},
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        border: false,
        rownumbers: true,
        toolbar: '#tab_bank_bar',
        nowrap: false,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        onRowContextMenu:onRowContextMenu_bank,
        columns: [[ 
            { field: 'ck', width: 40, title: '', checkbox: true },
            { field: 'cr_name', width: 50, title: '币种', align: 'left', },
            { field: 'ba_desc', width: 160, title: '开户行', align: 'left', },
            { field: 'ba_card_no', width: 180, title: '账号', align: 'left', },
            { field: 'ba_address', width: 270, title: '开户行地址', align: 'left', },
            {
                field: 'ba_default_flag', width: 40, title: '默认', align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    }
                }
            },
        ]],
    });

    $('#add_btn_bank').unbind('click').bind('click', function () {
        
        var cur_cu_id = $('#hid_cu_id').val();

        if (cur_cu_id == undefined || cur_cu_id == '') {
            $.messager.alert('错误提示','错误:请先保存客户信息后再新增银行信息','error');
            return;
        }
        $('#dlg_edit_custom').dialog('close');
        $('#dlg_edit_bank').dialog({
            title: '新增银行信息',
            iconCls: 'icon-save',
            autoOpen: false,
            modal: true,
            width: 500,
            minheight: 450,
            buttons: [
            {
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {

                    var par = {
                        rnd: Math.random(),
                        action: 'insert_bank',
                        ba_cu_id: cur_cu_id,
                        ba_cr_id: $('#dlg_ba_cr_id').combobox('getValue'),
                        ba_desc: $.trim($('#dlg_ba_desc').val()),
                        ba_address: $.trim($('#dlg_ba_address').val()),
                        ba_card_no: $.trim($('#dlg_ba_card_no').val()),
                        ba_default_flag: $('#dlg_ba_default_flag').is(':checked')?1:0
                    };

                    //要求，必须要填完整 

                    if (par.ba_cr_id == undefined || isNaN(par.ba_cr_id)) {
                        $.messager.alert('错误提示','错误: 必须选择币种','error');
                        return;
                    }

                    if (par.ba_desc == undefined || par.ba_desc.length == 0) {
                        $.messager.alert('错误提示', '错误: 必须填写开户行信息', 'error');
                        return;
                    }

                    if (par.ba_card_no == undefined ||par.ba_card_no.length == 0) {
                        $.messager.alert('错误提示', '错误: 必须账号信息', 'error');
                        return;
                    }

                    post('../Ashx/sys_base.ashx',par,
                    function (data) {
                        if (data.result == 1) {
                            reload_tab_bank(cur_cu_id);
                            $('#dlg_edit_bank').dialog('close');
                            $('#dlg_edit_custom').dialog('open');
                        } else {
                            $.messager.alert('错误提示', data.msg, 'error');
                        }
                    },true);
                    
                }
            },
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_edit_bank').dialog('close');
                    $('#dlg_edit_custom').dialog('open');
                }
            }]
        }).dialog('open');
    });

    $('#del_btn_bank').unbind('click').bind('click', function () {
        var del_rows = $("#tab_bank").datagrid('getChecked');

        if (del_rows.length == 0) {
            $.messager.alert('错误提示','请选择要删除的数据','error');
            return;
        } 
        var ba_ids = '';

        $.each(del_rows,function(i,item){
            if (ba_ids.length == 0) {
                ba_ids = item.ba_id;
            }else{
                ba_ids += ',' + item.ba_id;
            }
        });

        $.messager.confirm('删除提示', '确定要删除选择的' + del_rows.length + '行数据？',
        function (r) {
            if (r) {
                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'delete_bank',
                    ba_ids: ba_ids
                }, function (data) {
                    if (data.result == 1) {
                        reload_tab_bank($('#hid_cu_id').val());
                        $.messager.alert('提示',data.msg,'info');
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                },true);
            } 
        } );
    });
}

//添加右击菜单内容
function onRowContextMenu_bank(e, rowIndex, rowData) {
    e.preventDefault();
    cur_row = rowData;
    $(this).datagrid('selectRow', rowIndex); //选中当前行
    $('#mm_set_default_bank').menu('show', {
        left: e.pageX,
        top: e.pageY
    }); 
}

//设置默认账户
function set_default_bank() {

    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'update_bank',
        ba_id: cur_row.ba_id,
        ba_cu_id: cur_row.ba_cu_id,
        ba_desc: cur_row.ba_desc,
        ba_card_no: cur_row.ba_card_no,
        ba_address: cur_row.ba_address,
        ba_cr_id: cur_row.ba_cr_id,
        ba_default_flag: 1
    }, function (data) {
        if (data.result == 1) {
            reload_tab_bank(cur_row.ba_cu_id);
        } else {
            $.messager.alert('错误提示',data.msg,'error');
        }
    },true);

}


