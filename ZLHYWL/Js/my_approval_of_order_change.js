var pageNumber = 1;
var pageSize = 30;
var basesetting = undefined;

$(document).ready(function () {

    get_basesetting();

});
function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections_for_approval'
    }, function (data) {
        basesetting = data;

        bind_combobox(basesetting.company_list, $('#search_od_record_by_company_id'), 'c_desc', 'c_id', true);
        bind_combobox(basesetting.employe_list, $('#search_amc_create_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#search_amc_cur_opr_id'), 'u_real_name', 'u_id', false);
      
        init_tab_amc_list();

    }, true);

}


//初始化表格
function init_tab_amc_list() {

    $("#tab_amc_list").datagrid({
        url: '../Ashx/approval_mgr.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_full_order_change_list',
            like_str: $.trim($('#search_like_str').val()),
            amc_status: $('#search_amc_status').combobox('getValue'),
            co_status: $('#search_co_status').combobox('getValue'),
            amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
            only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0,
            amc_create_id: $('#search_amc_create_id').combobox('getValue'),
            company_id: $('#search_od_record_by_company_id').combobox('getValue')
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
        frozenColumns: [[{ title: '', field: 'amc_id', width: 40, checkbox: true }]],
        columns: [[
                {
                    field: 'amc_status_desc', title: '审核状态', width: 70,
                    styler: function (value, row, index) {
                        if (row.amc_status == 1) {
                            if (row.is_my_point == 1) return 'background-color:#f9752e;color:#fff;';
                            else return 'background-color:#f6ac84;color:#fff;';
                        } else if (row.amc_status == 2) {
                            return 'background-color:#02e251;color:#FFF;';
                        } else if (row.amc_status == 0) {
                            return 'background-color:#dcdcdc;color:#000;';
                        }
                    }
                }
                , { field: 'co_status_desc', title: '计划状态', width: 70, }
                , {
                    field: 'relation_no', title: '审核编号', width: 90,
                }
                , {
                    field: 'od_no', title: '涉及委托号', width: 90,
                } 
                , {
                    field: 'co_rec_old', title: '改前应收', width: 165, 
                }
                , {
                    field: 'co_rec_new', title: '改后应收', width: 165, 
                }
                 , {
                     field: 'co_pay_old', title: '改前应付', width: 165, 
                 }
                , {
                    field: 'co_pay_new', title: '改后应付', width: 165, 
                }
                , { field: 'co_bak', title: '备注', width: 320 }
                , { field: 'amc_cur_opr_nam', title: '当前审核人', width: 80, }
                , { field: 'amc_create_by_nam', title: '审核发起人',  width: 80, }
                , {
                    field: 'amc_create_dat', title: '审核发起时间',  width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'amc_finish_dat', title: '审核结束时间', width: 90,
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
                var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_change_info_frame.aspx?rnd=' +
                                Math.random() + '&co_seq=' +
                                row.co_seq +
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
function requery_amc_list() {
    var par = {
        rnd: Math.random(),
        action: 'get_full_order_change_list',
        like_str: $.trim($('#search_like_str').val()),
        amc_status: $('#search_amc_status').combobox('getValue'),
        co_status: $('#search_co_status').combobox('getValue'),
        amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
        only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0,
        amc_create_id: $('#search_amc_create_id').combobox('getValue'),
        company_id: $('#search_od_record_by_company_id').combobox('getValue')
    };

    $("#tab_amc_list").datagrid('load', par);
}

//查询业务简报
function call_win_view_of_short_order_info(od_seq, od_no) {
    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                        Math.random() + '&od_seq=' +
                        od_seq +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#window_of_order_info').window({
        title: '订单: ' + od_no,
        content: content
    }).window('open');
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