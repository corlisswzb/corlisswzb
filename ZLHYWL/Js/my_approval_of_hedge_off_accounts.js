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
        bind_combobox(basesetting.company_list, $('#search_relation_c_id'), 'c_desc', 'c_id', true);
        
        //查询  
        bind_combobox(basesetting.employe_list, $('#search_hoa_record_id'), 'u_real_name', 'u_id', false);
        
        bind_combobox(basesetting.employe_list, $('#search_amc_cur_opr_id'), 'u_real_name', 'u_id', false);
        bind_combogrid_custom_by_company_id($('#search_hoa_cu_id'), $('#search_relation_c_id'));
        init_tab_amc_list();

    }, true);

}
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


//初始化表格
function init_tab_amc_list() {
    
    $("#tab_amc_list").datagrid({
        url: '../Ashx/approval_mgr.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_full_hedge_off_accounts_list',
            like_str: $.trim($('#search_like_str').val()),
            hoa_cu_id: $('#search_hoa_cu_id').data('cu_id'),
            hoa_bank_dat_begin: $('#search_hoa_bank_dat_begin').datebox('getValue'),
            hoa_bank_dat_end: $('#search_hoa_bank_dat_end').datebox('getValue'),
            relation_c_id: $('#search_relation_c_id').combobox('getValue'),
            hoa_record_id: $('#search_hoa_record_id').combobox('getValue'),
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
                { title: '综合状态属性', colspan: 5, align: 'center' }
                , { title: '对冲计划基本信息', colspan: 2, align: 'center' }
                , { title: '应收对冲金额', colspan: 2, align: 'center' }
                , { title: '应付对冲金额', colspan: 2, align: 'center' }
                , { title: '对冲差额', colspan: 2, align: 'center' }
                , { title: '其他', colspan: 4, align: 'center' }
            ]
            , [
                {
                        field: 'hoa_status', title: '计划状态', width: 50,
                        formatter: function (value, row, index) {
                            if (Number(value) == 1) {
                                return '计划中';
                            } else {
                                return '已完结';
                            }
                        },
                        styler: function (value, row, index) {
                            switch (value) {
                                case 1: return 'background-color:#fff;color:#000;';
                                case 2: return 'background-color:#ef1956;color:#000;';
                            }
                        }
                    }
                , {
                    field: 'amc_status', title: '审核', width: 40,
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
                , { field: 'relation_c_desc', title: '所属公司', width: 140, }
                , {
                    field: 'relation_no',   title: '审核编号', width: 90, 
                }

                , {
                    field: 'amc_finish_dat', title: '通审时间', width: 80, sortable: true,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , { field: 'hoa_cu_desc', title: '结算单位', width: 240, }
                , { field: 'amc_title', title: '审核标题', sortable: true, width: 230 }
                , { field: 'hoa_rec_currency_group_desc', title: '金额', sortable: true, width: 150 }
                , {
                    field: 'hoa_rec_total_money', title: '金额(本币)', width: 90,
                    formatter: function (value, row, index) {
                        if (value == undefined) return 0;
                        return Number(value).toFixed(2);
                    }
                }
                , { field: 'hoa_pay_currency_group_desc', title: '金额', sortable: true, width: 150 }
                 , {
                     field: 'hoa_pay_total_money', title: '金额(本币)', width: 90,
                     formatter: function (value, row, index) {
                         if (value == undefined) return 0;
                         return Number(value).toFixed(2);
                     }
                 }
                , { field: 'hoa_diff_currency_group_desc', title: '金额', sortable: true, width: 150 }
                 , {
                     field: 'hoa_diff_total_money', title: '金额(本币)', width: 90,
                     formatter: function (value, row, index) {
                         if (value == undefined) return 0;
                         return Number(value).toFixed(2);
                     }
                 }
                , { field: 'hoa_bak', title: '备注', sortable: true, width: 400 }

                , { field: 'amc_cur_opr_nam', title: '当前审核人', sortable: true, width: 80, }
                , { field: 'amc_create_by_nam', title: '审核发起人', sortable: true, width: 80, }
                , {
                    field: 'amc_create_dat', title: '审核发起时间', sortable: true, width: 90,
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
                var content = '<iframe scrolling="auto" frameborder="0"  src="template_hedge_off_accounts_info_frame.aspx?rnd=' +
                                Math.random() + '&hoa_seq=' +
                                row.hoa_seq +
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
        action: 'get_full_hedge_off_accounts_list',
        like_str: $.trim($('#search_like_str').val()),
        hoa_cu_id: $('#search_hoa_cu_id').data('cu_id'),
        hoa_bank_dat_begin: $('#search_hoa_bank_dat_begin').datebox('getValue'),
        hoa_bank_dat_end: $('#search_hoa_bank_dat_end').datebox('getValue'),
        relation_c_id: $('#search_relation_c_id').combobox('getValue'),
        hoa_record_id: $('#search_hoa_record_id').combobox('getValue'),
        amc_status: $('#search_amc_status').combobox('getValue'),
        amc_cur_opr_id: $('#search_amc_cur_opr_id').combobox('getValue'),
        only_my_step: $('#search_only_my_step').is(':checked') ? 1 : 0,
    }; 

    $("#tab_amc_list").datagrid('reload', par);
}

function requery_amc_list() {
    var par = {
        rnd: Math.random(),
        action: 'get_full_hedge_off_accounts_list',
        like_str: $.trim($('#search_like_str').val()),
        hoa_cu_id: $('#search_hoa_cu_id').data('cu_id'),
        hoa_bank_dat_begin: $('#search_hoa_bank_dat_begin').datebox('getValue'),
        hoa_bank_dat_end: $('#search_hoa_bank_dat_end').datebox('getValue'),
        relation_c_id: $('#search_relation_c_id').combobox('getValue'),
        hoa_record_id: $('#search_hoa_record_id').combobox('getValue'),
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