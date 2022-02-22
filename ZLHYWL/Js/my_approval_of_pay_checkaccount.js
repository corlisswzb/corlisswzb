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

        var now_time = data.sys_time;
        var date = eval('new Date(' + now_time.replace(/\d+(?=-[^-]+$)/, function (a) {
            //console(a);
            return parseInt(a, 10);
        }).match(/\d+/g) + ')');


        //往后加1年，往前 10年 

        var now_year = date.getFullYear();
        var select_years = [];
        for (var nY = now_year - 10 ; nY <= now_year + 1 ; nY++) {
            select_years.push({ value: nY, text: nY + '年' });
        }
        bind_combobox(select_years, $('#search_ca_year'), 'text', 'value', false); 
       
        //月份
        var select_month = [];
        for (var nM = 1 ; nM <= 12; nM++) {
            select_month.push({ value: nM, text: nM + '月' });
        }
        bind_combobox(select_month, $('#search_ca_month'), 'text', 'value', false); 

        bind_combobox(basesetting.order_typ_list, $('#search_od_typ'), 'ot_desc', 'ot_id', true);
        bind_combobox(basesetting.company_list, $('#search_ca_relation_c_id'), 'c_desc', 'c_id', true);
        bind_combobox(basesetting.project_list, $('#search_od_project_typ'), 'pr_name', 'pr_id', true);
        bind_combobox(basesetting.box_typ_list, $('#search_od_box_typ'), 'bx_name', 'bx_id', true);
       
        bind_combobox(basesetting.trade_typ_list, $('#search_od_trade_typ_id'), 't_desc', 't_id', true);
        bind_combobox(basesetting.employe_list, $('#search_od_service_id'), 'u_real_name', 'u_id', true);
  
        //查询  
        bind_combobox(basesetting.employe_list, $('#search_ca_create_by_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#search_amc_create_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#search_amc_cur_opr_id'), 'u_real_name', 'u_id', false);
        bind_combogrid_custom_by_company_id($('#search_ca_cu_id'), $('#search_ca_relation_c_id'));
        init_tab_amc_list();

    }, true);

}
 

//初始化表格
function init_tab_amc_list() {
    
    $("#tab_amc_list").datagrid({
        url: '../Ashx/approval_mgr.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_full_checkaccount_list',
            like_str: $.trim($('#search_like_str').val()),
            ca_cu_id: $('#search_ca_cu_id').data('cu_id'), 
            ca_year: $('#search_ca_year').combobox('getValue'),
            ca_month: $('#search_ca_month').combobox('getValue'),
            ca_relation_c_id: $('#search_ca_relation_c_id').combobox('getValue'),
            ca_create_by_id: $('#search_ca_create_by_id').combobox('getValue'), 
            amc_status: $('#search_amc_status').combobox('getValue'), 
            amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
            only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0,
            amc_create_id: $('#search_amc_create_id').combobox('getValue'),
            amc_hurry_flag: $('#search_amc_hurry_flag').is(':checked') ? 1 : 0,
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
                    field: 'amc_hurry_flag', title: '', width: 24, sortable: true, align:'center',
                    formatter: function (value, row, index) {
                        if (value != undefined && Number(value) == 1) {
                            return '<span style="color:red;font-size:24px;">★</span>'
                        }
                    }
                }
                ,{
                    field: 'amc_status', title: '', width: 70, sortable: true,
                    formatter: function (value, row, index) {
                        if (row.amc_status == 1 && row.is_my_point == 1) {
                            return '待办';
                        } else {
                            return row.amc_status_desc;
                        } 
                    },
                    styler: function (value, row, index) {
                        if (row.amc_status == 1) {
                            if (row.is_my_point == 1) return 'background-color:#ff00ba;color:#fff;';
                            else return 'background-color:#fed8c3;color:#5e5e5e;';
                        } else if (row.amc_status == 2) {
                            return 'background-color:#02e251;color:#FFF;';
                        } else if (row.amc_status == 0) {
                            return 'background-color:#dcdcdc;color:#000;';
                        }
                    }
                }
                 
                , {
                    field: 'relation_no', title: '审核编号', width: 80, sortable: true, 
                }
                , {
                    field: 'relation_c_desc', title: '所属公司', width: 70, sortable: true,
                }
                , {
                    field: 'relation_cu_desc', title: '收款单位', width: 170, sortable: true,
                }
                , { field: 'amc_title', title: '申请标题', sortable: true, width: 340 }
                , {
                    field: 'relation_ca_total_amount_desc', title: '请款金额', width: 165, sortable: true, 
                }
                , {
                    field: 'relation_ca_woa_total_amount_desc', title: '已支金额', width: 165, sortable: true, 
                }
                , {
                    field: 'relation_ca_unwoa_total_amount_desc', title: '未支付', width: 165, sortable: true, 
                }
                
                , { field: 'amc_bak', title: '备注', sortable: true, width: 320 }
                , { field: 'relation_user', title: '关联交账人', sortable: true, width: 90, }
               
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
                var content = '<iframe scrolling="auto" frameborder="0"  src="template_pay_checkaccount_info_frame.aspx?rnd=' +
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
        action: 'get_full_checkaccount_list',
        like_str: $.trim($('#search_like_str').val()),
        ca_cu_id: $('#search_ca_cu_id').data('cu_id'),

        ca_year: $('#search_ca_year').combobox('getValue'),
        ca_month: $('#search_ca_month').combobox('getValue'),
        ca_relation_c_id: $('#search_ca_relation_c_id').combobox('getValue'),
        ca_create_by_id: $('#search_ca_create_by_id').combobox('getValue'),
      
        amc_status: $('#search_amc_status').combobox('getValue'),

        amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
        only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0,
        amc_create_id: $('#search_amc_create_id').combobox('getValue'),
        amc_hurry_flag: $('#search_amc_hurry_flag').is(':checked') ? 1 : 0,
    }; 

    $("#tab_amc_list").datagrid('reload', par);
}

function requery_amc_list() {
    var par = {
        rnd: Math.random(),
        action: 'get_full_checkaccount_list',
        like_str: $.trim($('#search_like_str').val()),
        ca_cu_id: $('#search_ca_cu_id').data('cu_id'),

        ca_year: $('#search_ca_year').combobox('getValue'),
        ca_month: $('#search_ca_month').combobox('getValue'),
        ca_relation_c_id: $('#search_ca_relation_c_id').combobox('getValue'),
        ca_create_by_id: $('#search_ca_create_by_id').combobox('getValue'),

        amc_status: $('#search_amc_status').combobox('getValue'),

        amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
        only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0,
        amc_create_id: $('#search_amc_create_id').combobox('getValue'),
        amc_hurry_flag: $('#search_amc_hurry_flag').is(':checked') ? 1 : 0,
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