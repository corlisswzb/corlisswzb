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

        //bind_combobox(basesetting.order_typ_list, $('#search_od_typ'), 'ot_desc', 'ot_id', true);
        //bind_combobox(basesetting.project_list, $('#search_od_project_typ'), 'pr_name', 'pr_id', true);

        $('#search_od_record_by_company_id').combobox({
            onSelect: function () {
                var c_id = $('#search_od_record_by_company_id').combobox('getValue');

                if (c_id == undefined || c_id == '') {
                    $('#search_od_typ').combobox('loadData', {});
                    $('#search_od_project_typ').combobox('loadData', {});
                } else {
                    $('#search_od_typ').combobox({
                        url: '../Ashx/sys_base.ashx?action=get_order_typ_pub&c_id=' + c_id,
                        valueField: 'ot_id',
                        textField: 'ot_desc'
                    });
                    $('#search_od_project_typ').combobox({
                        url: '../Ashx/sys_base.ashx?action=get_project_pub&c_id=' + c_id,
                        valueField: 'pr_id',
                        textField: 'pr_name',
                        panelHeight:'150'
                    });
                } 
            }
        });
       
        //bind_combobox(basesetting.box_typ_list, $('#search_od_box_typ'), 'bx_name', 'bx_id', true);
         
        //bind_combobox(basesetting.trade_typ_list, $('#search_od_trade_typ_id'), 't_desc', 't_id', true);
        //bind_combobox(basesetting.employe_list, $('#search_od_service_id'), 'u_real_name', 'u_id', true);

        //查询  
        bind_combobox(basesetting.employe_list, $('#search_amc_create_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#search_amc_cur_opr_id'), 'u_real_name', 'u_id', false);
        bind_combogrid_custom_by_company_id($('#search_od_delegate_cu_id'), $('#search_od_record_by_company_id'));
        // bind_combogrid_custom($('#search_od_cargo_agent_cu_id'));




        init_tab_amc_list();



    }, true);

}
 

//初始化表格
function init_tab_amc_list() {
    $("#tab_amc_list").datagrid({
        url: '../Ashx/approval_mgr.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_full_order_list',
            like_str: $.trim($('#search_like_str').val()),
            od_typ: $('#search_od_typ').combobox('getValue'), 

            od_project_typ: $('#search_od_project_typ').combobox('getValue'),
            od_cargo_agent_cu_id: '',
            od_delegate_cu_id: $('#search_od_delegate_cu_id').data('cu_id'),
            od_box_typ_id: '',
            od_beg_fee_dat: $('#search_od_beg_fee_dat').datebox('getValue'),
            od_end_fee_dat: $('#search_od_end_fee_dat').datebox('getValue'),
            od_service_id: '',
            od_record_by_company_id: $('#search_od_record_by_company_id').combobox('getValue'),
            od_trade_typ_id: '', 

            amc_status: $('#search_amc_status').combobox('getValue'), 
         
            amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
            only_my_step: $('#search_only_my_step').is(':checked')?1:0,
            amc_create_id: $('#search_amc_create_id').combobox('getValue'),
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
        columns: [[//显示的列

                { title: '业务基本信息', colspan: 10, align: 'center' }
                , { title: '货物信息', colspan: 4, align: ' center' }
                , { title: '计费信息(折算本位币)', colspan: 3, align: 'center' }
                , { title: '维护信息', colspan: 7, align: 'center' }
        ], [
                {
                    field: 'amc_status_desc',  title: '审核状态', width: 80,
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
                , {
                    field: 'od_no', title: '业务编号', width: 90,
                    styler: function (value, row, index) {
                        if (row.od_status_id == 1) {
                            return 'background-color:#4cff00;color:#000;';
                        } else if (row.od_status_id == 2) {
                            return 'background-color:#0026ff;color:#FFF;';
                        } else if (row.od_status_id == 3) {
                            return 'background-color:#ff0000;color:#FFF;';
                        }
                    }
                }
                , {
                    field: 'od_fee_dat', title: '业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , { field: 'od_typ_desc', title: '业务类型', sortable: true, width: 80 }
                , { field: 'od_box_typ_desc', title: '集散类型', sortable: true, width: 60, }
                , { field: 'od_project_typ_desc', title: '项目名称', sortable: true, width: 120, }
                , { field: 'od_trade_typ_desc', title: '内外贸', sortable: true, width: 70, }
                , {
                    field: 'od_i_e_id', title: '进出口', sortable: true, width: 60,
                    formatter: function (value, row, index) {
                        if (value == undefined) return '';
                        else {
                            if (value == 'I') return '进口';
                            if (value == 'E') return '出口';
                        }
                    }
                }
                , { field: 'od_delegate_cu_desc', title: '委托客户', sortable: true, width: 140, }
                , { field: 'od_cargo_agent_cu_desc', title: '供货客户', sortable: true, width: 140, }

                , { field: 'od_cargo_typ_desc', title: '品名', sortable: true, width: 80, }
                , {
                    field: 'od_cargo_weight', title: '货重', sortable: true, width: 60,
                    formatter: function (value, row, index) {
                        return value.toFixed(2);
                    }
                }
                , {
                    field: 'od_cargo_number', title: '件数', sortable: true, width: 60,
                    formatter: function (value, row, index) {
                        var show_number = 0;
                        var show_packing = '';
                        if (value == undefined) {
                            show_number = 0;
                        } else {
                            show_number = value;
                        }
                        if (row.od_cargo_packing_desc != undefined) {
                            show_packing = row.od_cargo_packing_desc;
                        }

                        return show_number + ' ' + show_packing;
                    }
                }
                , {
                    field: 'od_cntr_desc', title: '箱量', sortable: true, width: 60,
                     
                }
                , {
                    field: 'pay_total_amount_of_base', title: '应付小计', sortable: true, width: 70,
                    formatter: function (value, row, index) {
                        if (value == undefined || value == '') return 0;
                        return value.toFixed(2);
                    },
                    styler: function (value, row, index) {
                        return 'background-color:#b3e7c7;color:#000;';
                    }
                }
                , {
                    field: 'rec_total_amount_of_base', title: '应收小计', sortable: true, width: 70,
                    formatter: function (value, row, index) {
                        if (value == undefined || value == '') return 0;
                        return value.toFixed(2);
                    },
                    styler: function (value, row, index) {
                        return 'background-color:#eecfcb;color:#000;';
                    }
                }
                , {
                    field: 'profit_total_amount_of_base', title: '盈利', width: 70, sortable: true,
                    formatter: function (value, row, index) {
                        if (value == undefined || value == '') return 0;
                        return value.toFixed(2);
                    },
                    styler: function (value, row, index) {
                        if (row.rec_total_amount - row.pay_total_amount > 0) {
                            return 'background-color:#ead1c8;color:#000;';
                        } else {
                            return 'background-color:#b3e7c7;color:#000;';
                        }
                    }
                }
                , { field: 'amc_cur_opr_nam', title: '当前审核人', sortable: true, width: 80, }
                , { field: 'od_operation_nam', title: '操作', sortable: true, width: 80, }
                , { field: 'od_sales_nam', title: '销售', sortable: true, width: 80, }
                , { field: 'od_service_nam', title: '客服', sortable: true, width: 80, }
                , {
                    field: 'od_record_dat', title: '创建时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , { field: 'od_operation_lock_nam', title: '审核发起人', sortable: true, width: 80, }
                , {
                    field: 'od_operation_lock_dat', title: '审核发起时间', sortable: true, width: 90,
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
             
            if (!$('#tabs_ap').tabs('exists', row.od_no)) {
                //这里 应该 改一下 
                var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_info_frame_approval.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
                $('#tabs_ap').tabs('add', {
                    title: row.od_no,
                    content: content,
                    closable: true,
                    selected: true,
                    border: false,
                });
                // 隐藏滚动条
                $('#tabs_ap').find('div[style^="display: block;"] > div').css({ 'overflow': 'hidden' });
            } else {
                $('#tabs_ap').tabs('select', row.od_no);
            } 
        }
    });
}

//查询订单
function refresh_amc_list() {
    var par = {
        rnd: Math.random(),
        action: 'get_full_order_list',
        like_str: $.trim($('#search_like_str').val()),
        od_typ: $('#search_od_typ').combobox('getValue'),

        od_project_typ: $('#search_od_project_typ').combobox('getValue'),
        od_cargo_agent_cu_id: '',
        od_delegate_cu_id: $('#search_od_delegate_cu_id').data('cu_id'),
        od_box_typ_id: '',
        od_beg_fee_dat: $('#search_od_beg_fee_dat').datebox('getValue'),
        od_end_fee_dat: $('#search_od_end_fee_dat').datebox('getValue'),
        od_service_id: '',
        od_record_by_company_id: $('#search_od_record_by_company_id').combobox('getValue'),
        od_trade_typ_id: '',

        amc_status: $('#search_amc_status').combobox('getValue'),

        amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
        only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0,
        amc_create_id: $('#search_amc_create_id').combobox('getValue'),
    }; 

    $("#tab_amc_list").datagrid('load', par);
}

//批量撤销
function remove_amc() {
    var rows = $("#tab_amc_list").datagrid('getChecked');

    if (rows.length == 0) {

        $.messager.alert('错误','错误:请选择列表数据','error');
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
