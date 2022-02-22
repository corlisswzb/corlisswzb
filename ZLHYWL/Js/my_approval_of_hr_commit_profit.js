var pageNumber = 1;
var pageSize = 30;
var basesetting = undefined;

$(document).ready(function () {
    //初始化对话框
    $('#dlg_of_hr_commit_profit_help').dialog({
        title: '提成审核帮助',
        iconCls: 'icon-help',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 450,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_of_hr_commit_profit_help').dialog('close');
            }
        }]
    }).dialog('close');

    $('#dlg_of_create_hr_commit_profit').dialog({
        title: '新建提成审核',
        iconCls: 'icon-add',
        autoOpen: false,
        modal: true,
        width: 360,
        minheight: 450,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_of_create_hr_commit_profit').dialog('close');
            }
        }]
    }).dialog('close');
    get_basesetting();

});

function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections_for_approval'
    }, function (data) {
        basesetting = data;
        bind_combobox(basesetting.company_list, $('#search_relation_c_id'), 'c_desc', 'c_id', true);
        
        //查询  
        bind_combobox(basesetting.employe_list, $('#search_amc_create_id'), 'u_real_name', 'u_id', false);
        
        bind_combobox(basesetting.employe_list, $('#search_amc_cur_opr_id'), 'u_real_name', 'u_id', false);
     
        init_tab_amc_list();

    }, true);

} 
//初始化表格
function init_tab_amc_list() {
    
    $("#tab_amc_list").datagrid({
        url: '../Ashx/hr_commit_profit.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_full_hr_commit_profit_list',
            like_str: $.trim($('#search_like_str').val()),          
            c_id: $('#search_relation_c_id').combobox('getValue'),
            amc_create_id: $('#search_amc_create_id').combobox('getValue'),
            hr_rel_u_id:'', 
            amc_status: $('#search_amc_status').combobox('getValue'),
            amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
            only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0, 
        },
        method: 'post',
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [30, 60, 120],
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_amc_list_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ title: '', field: 'amc_id',  width: 40, checkbox: true }]],
        columns: [[
                {
                    field: 'amc_status', title: '状态', width: 40,
                    formatter: function (value, row, index) {
                        if (Number(value) == -99) {
                            return '未交审';
                        }
                        if (Number(value) == 0) {
                            return '退回';
                        }
                        if (Number(value) == 1) {
                            return '审核中';
                        }
                        if (Number(value) == 2) {
                            return '通过';
                        }
                    },
                    styler: function (value, row, index) {
                        if (Number(value) == -99) {
                            return 'background-color:#ff4d4d;color:#fff;';
                        }
                        if (Number(value) == 0) {
                            return 'background-color:#c8c8c8;color:#fe9047;';
                        }
                        if (Number(value) == 1) {
                            return 'background-color:#ffadad;color:#000;';
                        }
                        if (Number(value) == 2) {
                            return 'background-color:#aeffb6;color:#000;';
                        }
                    }
                } 
                , { field: 'relation_no', title: '编号', width: 80, }
                , { field: 'relation_c_desc', title: '所属公司', width: 140, }

                , { field: 'amc_title', title: '标题', sortable: true, width: 330 }

                , { field: 'od_count_of_uncover', title: '含委托数', sortable: true, width: 80 }
                , {
                    field: 'od_rec_uncover_total_amount_of_base', title: '应收总金额(本币)', width: 110,
                    formatter: function (value, row, index) {
                        if (value == undefined) return 0;
                        return Number(value).toFixed(2);
                    }
                }
                 
                , { field: 'amc_bak', title: '备注', sortable: true, width: 400 }

                , { field: 'amc_cur_opr_nam', title: '当前审核人', sortable: true, width: 80, }
                , { field: 'amc_create_by_nam', title: '审核发起人', sortable: true, width: 80, }
                , {
                    field: 'amc_create_dat', title: '审核发起时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'amc_finish_dat', title: '审核结束时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                
        ]],
        onLoadSuccess: function (data) {
 
        },
        onDblClickRow: function (index, row) { 
             
            if (!$('#tabs_ap').tabs('exists', row.relation_no)) {
                //这里 应该 改一下 
                var content = '<iframe scrolling="auto" frameborder="0"  src="template_hr_commit_profit_frame.aspx?rnd=' +
                                Math.random() + '&amc_id=' +
                                row.amc_id +
                                '" style="width:100%;height:100%;"></iframe>';
                $('#tabs_ap').tabs('add', {
                    title: row.relation_no,
                    content: content,
                    closable: true,
                    selected: true,
                    border: false,
                });
                // 隐藏滚动条
                $('#tabs_ap').find('div[style^="display: block;"] > div').css({ 'overflow': 'hidden' });
            } else {
                $('#tabs_ap').tabs('select', row.relation_no);
            } 
        }
    });
}

//查询订单
function refresh_amc_list() {
    var par = {
        rnd: Math.random(),
        action: 'get_full_hr_commit_profit_list',
        like_str: $.trim($('#search_like_str').val()),
        c_id: $('#search_relation_c_id').combobox('getValue'),
        amc_create_id: $('#search_amc_create_id').combobox('getValue'),
        hr_rel_u_id: '',
        amc_status: $('#search_amc_status').combobox('getValue'),
        amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
        only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0,
    }; 

    $("#tab_amc_list").datagrid('reload', par);
}

function requery_amc_list() {
    var par = {
        rnd: Math.random(),
        action: 'get_full_hr_commit_profit_list',
        like_str: $.trim($('#search_like_str').val()),
        c_id: $('#search_relation_c_id').combobox('getValue'),
        amc_create_id: $('#search_amc_create_id').combobox('getValue'),
        hr_rel_u_id: '',
        amc_status: $('#search_amc_status').combobox('getValue'),
        amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
        only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0,
    };

    $("#tab_amc_list").datagrid('load', par);
}

//批量撤销
function remove_amc() {
    var rows = $("#tab_amc_list").datagrid('getChecked');

    if (rows.length == 0) {

        $.messager.alert('错误', '错误:请选择列表数据', 'error');
        return;
    }

    var has_pass = false;
    var amc_id = '';
    $.each(rows, function (i, row) {
        if (Number(row.amc_status) == 2) {
            has_pass = true;
        }

        if (amc_id.length == 0) {
            amc_id = row.amc_id;
        } else {
            amc_id += ',' + row.amc_id;
        }

    });

    if (has_pass) {
        $.messager.alert('错误', '错误:选择数据中有已通过审核的数据，无法进行撤回操作!', 'error');
        return;
    }

    $.messager.confirm('批量撤销提醒', '你正在执行撤销审核操作，撤销操作只能撤销自己发起的未过审的审核，请确认是否继续操作？', function (r) {
        if (r) {
            post('../Ashx/approval_mgr.ashx', {
                rnd: Math.random(),
                action: 'delete_amc',
                amc_id: amc_id,
                ap_context: ''
            }, function (data) {
                if (data.result == 1) {
                    $.messager.alert('操作提示', data.msg, 'info', function () {
                        refresh_amc_list();
                    });
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                }
            }, true);
        }
    });






}

//打开帮助
function open_help() {
    $('#dlg_of_hr_commit_profit_help').dialog({
        title: '提成审核帮助',
        iconCls: 'icon-help',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 450,
        buttons: [
        {
            text: '知道了',
            iconCls: 'icon-ok',
            handler: function () {
                $('#dlg_of_hr_commit_profit_help').dialog('close');
            }
        }, {
            text: '创建审核',
            iconCls: 'icon-add',
            handler: function () {
                $('#dlg_of_hr_commit_profit_help').dialog('close');
                create_hr_commit_profit();
            }
        }]
    }).dialog('open');
}

//打开创建审核对话狂
function create_hr_commit_profit() {
    //后台去查询一下 
    post('../Ashx/hr_commit_profit.ashx', {
        rnd: Math.random(),
        action: 'get_last_commit_dat',
    }, function (data) {

        $('#dlg_hr_compay_desc').val(data.cpy_desc);
        $('#dlg_rel_beg_dat').datebox('setValue', '');
        $('#dlg_rel_end_dat').datebox('setValue', '');
        if (data.last_exists == 1) {
            $('#dlg_rel_beg_dat').datebox('setValue', data.last_rel_end_dat);
        }
        $('#dlg_of_create_hr_commit_profit').dialog({
            title: '新建提成审核',
            iconCls: 'icon-add',
            autoOpen: false,
            modal: true,
            width: 400,
            minheight: 450,
            buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_of_create_hr_commit_profit').dialog('close');
                }
            }, {
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {

                    //必须有值
                    var par = {
                        woa_beg_dat: $('#dlg_rel_beg_dat').datebox('getValue'),
                        woa_end_dat: $('#dlg_rel_end_dat').datebox('getValue'),
                    }

                    if (par.woa_beg_dat == undefined || par.woa_beg_dat.length == 0) {
                        $.messager.alert('错误提示','错误:必须选择开始时间','error');
                        return;
                    }
                    if (par.woa_end_dat == undefined || par.woa_end_dat.length == 0) {
                        $.messager.alert('错误提示', '错误:必须选择结束时间', 'error');
                        return;
                    }

                    par.woa_beg_dat = par.woa_beg_dat.substring(0, 10) + ' 00:00:00';
                    par.woa_end_dat = par.woa_end_dat.substring(0, 10) + ' 23:59:59';

                    var url = encodeURI('template_create_hr_commit_profit_frame.aspx?rnd=' +
                        Math.random() + '&woa_beg_dat=' +
                        par.woa_beg_dat + '&woa_end_dat=' +
                        par.woa_end_dat);

                    var content = '<iframe scrolling="auto" frameborder="0"  src="' +
                        url +
                        '" style="width:100%;height:100%;"></iframe>';
                    $('#win_of_create_hr_commit_profit').window({
                        title: '创建新提成审核'  ,
                        content: content
                    }).window('open');

                    $('#dlg_of_create_hr_commit_profit').dialog('close');
                }
            }]
        }).dialog('open');
    }, true);


    
}

function close_win_of_hr_create_commit_profit() {
    $('#win_of_create_hr_commit_profit').window('close');
    refresh_amc_list();
}
