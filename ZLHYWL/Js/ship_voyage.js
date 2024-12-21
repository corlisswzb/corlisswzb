//默认第一页，
var pageNumber = 1;
//每页显示10行
var pageSize = 30;
var $cur_page = undefined;
 
var cur_ed_ship = undefined;

var basesetting = undefined;

var cur_select_ship_cntr_fio_fee_id = undefined;
var cur_select_ship_cntr_bill_no = undefined;

var cur_ed_ship_cntr = undefined;

//表头筛选菜单 
 
var columns_fliters_of_fee = undefined;

var init_tab_truefalse = false;
var init_cy_tab_truefalse = false;

var cur_ship_cntr_fio_details = undefined;
var cur_ship_cntr_cy_details = undefined;

var columns_fliters_of_cntr = undefined;

var columns_fliters_of_ship_cntr_group = undefined;

$(document).ready(function () {

    //装在基础数据
    getbasesetting();

});
/*初始化基础参数*/
function getbasesetting() {
    $.post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        if (!session_out(data)) {
            basesetting = data;
            data_custom = data.custom_list;

            //绑定 
            bind_combobox(data.voyage_line_list, $('#search_voyage_line'), 'vl_desc', 'vl_id', true);

            bind_combogrid_ship($('#search_ship_id'));

            bind_combogrid_ship($('#ed_ship_id'), function (ship_en_code,ship_cu_id,cu_desc) {
                $('#ed_ship_en_cod').val(ship_en_code);
                $('#ed_ship_cu_id').data('ship_cu_id', ship_cu_id);
                $('#ed_ship_cu_id').val(cu_desc);
            });

            bind_combobox(data.voyage_line_list, $('#ed_vl_id'), 'vl_desc', 'vl_id', false);
            // bind_combogrid_custom($('#ed_ship_cu_id'));

            bind_combobox(data.area_list, $('#ed_start_area_id'), 'area_desc', 'area_id', false);
            bind_combobox(data.area_list, $('#ed_end_area_id'), 'area_desc', 'area_id', false);

            //bind_combobox(data.trade_typ_list, $('#cbx_trade_id'), 't_desc', 't_id', true);
            //bind_combobox(data.ef_typ_list, $('#cbx_e_f_id'), 'e_f_desc', 'e_f_id', true);
            //bind_combobox(data.container_siz_list, $('#cbx_eqp_siz'), 'cs_desc', 'cs_desc', true);
            //bind_combobox(data.container_typ_list, $('#cbx_eqp_typ'), 'ct_name', 'ct_name', true);

            bind_combobox(data.port_list, $('#dlg_isccd4_port_id'), 'p_desc', 'p_id', false);
            bind_combogrid_custom($('#dlg_isccd4_pay_fee_cu_id'));
            init_tab_ship_cntr_group();

            //刷新表格
            refresh_ship_voyage();


            init_tab_ship_cntr_tab();

            init_tab_ship_fee();
        }

    }, 'json');
}
 
 
/*船期查询参数*/
function return_parmar_get_ship_voyage() {
    var voyage_no = $("#search_voyage_no").val();
    var ship_id = $("#search_ship_id").data('ship_id');
    var vl_id = $("#search_voyage_line").combobox('getValue');
    var status_id = $("#search_status").combobox('getValue');
    var etd_begin = $('#search_etd_begin').datebox('getValue');
    var etd_end = $('#search_etd_end').datebox('getValue');
 
 
    var par = {
        rnd: Math.random(),
        action: 'get_ship_voyage_list',
        voyage_no: voyage_no,
        ship_id: ship_id,
        vl_id: vl_id,
        status_id: status_id,
        etd_begin: etd_begin,
        etd_end: etd_end
    }
    return par;
}

/*刷新、查询船期*/
function refresh_ship_voyage() {
    $("#tab_ship_voyage").datagrid({
        url: '/Ashx/ship.ashx',
        queryParams: return_parmar_get_ship_voyage(),
        method: 'post',
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        nowrap: true,
        striped: true,
        collapsible: false,
        //toolbar: '#ship_voyage_list_bar',
        fit: true,
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ field: 'ship_no',  title: '',  checkbox: true }]],
        columns: [[//显示的列
                {
                    field: 'status_id',  title: '状态', width: 70,
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 1) {
                            str = '计划中';
                        } else if (value == 2) {
                            str = '航次关闭'
                        }
                        return str;
                    },
                    styler: function (value, row, index) {
                        if (value == 0) {
                            return 'background-color:#4cff00;color:#000;';
                        } else if (value == 1) {
                            return 'background-color:#0026ff;color:#FFF;';
                        } else if (value == 2) {
                            return 'background-color:#ff0000;color:#FFF;';
                        } else if (value == 3) {
                            return 'background-color:#b200ff;color:#FFF;';
                        }
                    }
                }
                , { title: '起航、抵达', colspan: 2, align: 'center' }
                
                , { title: '航线信息', colspan: 6, align: 'center' }
                , { title: '箱量及费用信息', colspan: 8, align: 'center' }
                , { title: '维护信息', colspan: 4, align: 'center' }
        ], [
                 {
                    field: 'ETD', title: '(预)启运', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'ETA', title: '(预)抵运', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'ship_desc', title: '船名', sortable: true, width: 120,
                    formatter: function (value, row, index) {
                        return row.ship_desc + '(' + row.ship_en_cod + ')';
                    }
                } 
                , { field: 'ship_cu_desc', title: '船东', width: 180, }
                , { field: 'voyage_no', title: '航次', width: 60, }
                , { field: 'vl_desc', title: '航线', width: 50, }
                , { field: 'start_area_desc', title: '起运地', width: 80, }
                , { field: 'end_area_desc', title: '目的地', width: 80, }
                , {
                    field: 'cntr_u', title: '实配(U)', width: 60,
                    styler: function (value, row, index) {
                        if (value != undefined && value > 0) {
                            return 'background-color:#f0bcff;color:#000;';
                        }
                    }
                }
                , {
                    field: 'cntr_t', title: '实配(T)', width: 60,
                    styler: function (value, row, index) {
                        if (value != undefined && value > 0) {
                            return 'background-color:#f0bcff;color:#000;';
                        }
                    }
                }
                , {
                    field: 'cntr_num_of_20', title: '20尺', width: 60,
                    styler: function (value, row, index) {
                        if (value != undefined && value > 0) {
                            return 'background-color:#f0bcff;color:#000;';
                        }
                    }
                }
                , {
                    field: 'cntr_num_of_40', title: '40尺', width: 60,
                    styler: function (value, row, index) {
                        if (value != undefined && value > 0) {
                            return 'background-color:#f0bcff;color:#000;';
                        }
                    }
                }
                , {
                    field: 'cntr_num_of_45', title: '45尺', width: 60,
                    styler: function (value, row, index) {
                        if (value != undefined && value > 0) {
                            return 'background-color:#f0bcff;color:#000;';
                        }
                    }
                }
                , {
                    field: 'pay_total_amount', title: '应付', width: 90,
                    
                    styler: function (value, row, index) {
                         
                        return 'background-color:#b3e7c7;color:#000;';
                        
                    }
                }
                , {
                    field: 'payed_total_amount', title: '已付', width: 90,
                     
                    styler: function (value, row, index) {
                        
                        return 'background-color:#b3e7c7;color:#000;';
                         
                    }
                }
                , {
                    field: 'unpayed_total_amount', title: '未付', width: 90,
                     
                    styler: function (value, row, index) {
                       
                        return 'background-color:#b3e7c7;color:#000;';
                         
                    }
                }
                , { field: 'create_desc', title: '创建人', width: 80, }
                , {
                    field: 'create_by_date', title: '创建时间', width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , { field: 'update_desc', title: '更新人', width: 80, }
                , {
                    field: 'update_by_date', title: '更新时间', width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
        ]],
        onDblClickRow: function (index, row) {
            
            $('#page_ship_voyage_list').panel('close');
            $('#sh_cur_ship_voyage_desc').html( '当前作业:' + row.ship_desc + '(' + row.ship_en_cod + ')/' + row.voyage_no );
            $('#page_ship_voyage_list').fadeOut(50, function () {
                $('#page_ship_voyage_edit').fadeIn(50, function () {
                    //跳转到编辑页面
                    edit_ship_voyage_page(row.ship_no);
                });
            });
        },
        onLoadSuccess: function (data) {
            table_bottom_group_desc(data.group_fee_desc, data.total, 'all_group_ship_voyage_fee');
            refresh_ship_fee_list_footer();
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_ship_voyage'), rowIndex);
            refresh_ship_fee_list_footer();
        },
        onCheck: function (index, row) {
            refresh_ship_fee_list_footer();
        },
        onUncheck: function (index, row) {
            refresh_ship_fee_list_footer();
        },
        onCheckAll: function (index, row) {
            refresh_ship_fee_list_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_ship_fee_list_footer();
        },
    });
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


 
//刷新 tab_fee_list 所在页面的 统计信息 
function refresh_ship_fee_list_footer() {
    table_bootom_selected_desc($('#tab_ship_voyage'), 'selected_group_ship_voyage_fee', -1); 
}



//菜单,返回列表 
function return_ship_voyage_list() {
    $('#page_ship_voyage_list').panel('open');
    cur_ed_ship  = undefined;
    $cur_page = undefined;
    $('#page_ship_voyage_edit').fadeOut(50, function () {
        $('#page_ship_voyage_list').fadeIn(50);
        refresh_ship_voyage();
    });
}

//创建船期
function new_ship_voyage() {

    cur_ed_ship = undefined; 
    $('#page_ship_voyage_edit').panel({ title: '航次创建中>>>' }); 
    //清空
    $('#ed_status_id').val('新建航次');
    $('#ed_ship_id').combogrid('setText', '');
    $('#ed_ship_id').data('ship_id', ''); 
    $('#ed_ship_en_cod').val('');
    //$('#ed_ship_cu_id').combogrid('setText', '');
    $('#ed_ship_cu_id').data('ship_cu_id', '');
    $('#ed_voyage_no').val('');
    $('#ed_vl_id').combobox('setValue', '');
    $('#ed_etd').datebox('setValue', '');
    $('#ed_eta').datebox('setValue', '');
    $('#ed_start_area_id').combobox('setValue', '');
    $('#ed_end_area_id').combobox('setValue', '');
    $('#ed_bak').val(''); 
    $('#page_ship_voyage_list').fadeOut(50, function () {
        $('#page_ship_voyage_edit').fadeIn(50, function () {
            show_page_ship_base_info();
        });
    });
    
}

//保存航次
function save_ship_voyage() {

    var ship_id = $('#ed_ship_id').data('ship_id');
    var voyage_no = $('#ed_voyage_no').val();
    var vl_id = $('#ed_vl_id').combobox('getValue');
    var ETD = $('#ed_etd').datebox('getValue');
    var ETA = $('#ed_eta').datebox('getValue');
    var bak = $('#ed_bak').val();
    var start_area_id = $('#ed_start_area_id').combobox('getValue');
    var end_area_id = $('#ed_end_area_id').combobox('getValue');


    if (ship_id=='' || ship_id == undefined) {
        $.messager.alert('错误提示','错误:必须选择一条船！','error');
        return;
    }

    if (voyage_no == '' || voyage_no == undefined) {
        $.messager.alert('错误提示', '错误:必须填写航次！', 'error');
        return;
    }

    if (vl_id == undefined || vl_id == '') {
        $.messager.alert('错误提示', '错误:必须选择航线！', 'error');
        return;
    }

    if (voyage_no == undefined || voyage_no == '') {
        $.messager.alert('错误提示', '错误:必须填写航次！', 'error');
        return;
    }
    if (start_area_id == undefined || start_area_id == '') {
        $.messager.alert('错误提示', '错误:必须选择起运地！', 'error');
        return;
    }
    if (end_area_id == undefined || end_area_id == '') {
        $.messager.alert('错误提示', '错误:必须选择目的地！', 'error');
        return;
    }

    if (ETD == undefined || ETD == '') {
        $.messager.alert('错误提示', '错误:必须选择起运时间！', 'error');
        return;
    }
    if (ETA == undefined || ETA == '') {
        $.messager.alert('错误提示', '错误:必须选择抵达时间！', 'error');
        return;
    }

    var par = {
        ship_id: ship_id,
        voyage_no: voyage_no,
        vl_id: vl_id,
        ETD: ETD,
        ETA: ETA,
        bak: bak,
        start_area_id: start_area_id,
        end_area_id: end_area_id
    }

    if (cur_ed_ship !=undefined) {
        par.action = 'update_ship_voyage';
        par.ship_no = cur_ed_ship.ship_no;
    }else{
        par.action='insert_ship_voyage';
    }


    $.post('../Ashx/ship.ashx', par, function (data) {
        if (data.result == 1) {
            $.messager.alert('提示', '保存航次成功！', 'info', function () {
                edit_ship_voyage_page(data.ship_no);
            });
        } else {
            $.messager.alert('错误', data.msg, 'error');
        }
    },'json')

}

/*删除船期*/
function delete_ship_voyage() {

    $.messager.confirm('删除船期', '删除船期会导致: 绑定该船期的委托运程明细会删除，相关费用解绑(不删除)，相关集装箱明细解绑(不删除)，如关联委托锁定审核或关联费用进行了归(交)账操作则无法进行删除操作。确定要删除当前船期吗?', function (r) {
        if (r) {
            var par = {
                rnd: Math.random(),
                action: 'delete_ship_voyage',
                ship_no: cur_ed_ship.ship_no,
            };

            $.post('../Ashx/ship.ashx', par, function (data) {
                if (!session_out(data)) {
                    if (data.result == 1) {
                        cur_ed_ship = undefined;
                        $("#tab_ship_voyage").datagrid("load", return_parmar_get_ship_voyage());
                    }
                    $.messager.alert('删除船期', data.msg,
                        data.result == 1 ? 'info' : 'error',
                        function () {
                            if (data.result == 1) {

                                $('#page_ship_voyage_list').panel('open');
                                $cur_page = undefined;
                                $('#page_ship_voyage_edit').fadeOut(50, function () {
                                    $('#page_ship_voyage_list').fadeIn(50);
                                   
                                });
                            }
                        }
                    );
                }
            }, 'json');
        }
    });

}

/*关闭航次*/
function close_ship_voyage() {
    $.messager.confirm('关闭航次', '关闭航次后，船舶绑定集装箱将无法进行修改、删除操作，确定要关闭当前航次吗?', function (r) {
        if (r) {
        
            $.post('../Ashx/ship.ashx', {
                rnd: Math.random(),
                action: 'close_ship_voyage',
                ship_no: cur_ed_ship.ship_no,
            }, function (data) {
                if (!session_out(data)) {
                    if (data.result == 1) {
                        $("#tab_ship_voyage").datagrid("load", return_parmar_get_ship_voyage());

                        $.messager.alert('更新船期', data.msg, 'info');
                    } else {
                        $.messager.alert('更新船期', data.msg, 'error');
                    }
                }
            }, 'json');
        
        }
    })
    

}

//编辑船期
function edit_ship_voyage_page(ship_no) {
   
    post('../Ashx/ship.ashx', {
        rnd: Math.random(),
        action: 'get_ship_voyage_single',
        ship_no:  ship_no
    }, function (data) {
        //基本上一定是有值的 
        var ship_base = data.rows[0];
        cur_ed_ship = ship_base;
        $('#page_ship_voyage_edit').panel({ title: '当前船舶' + ship_base.ship_desc + ' 航次:' + ship_base.voyage_no });
        $('#ed_status_id').val(ship_base.status_desc);
        $('#ed_ship_id').combogrid('setText', ship_base.ship_desc);
        $('#ed_ship_id').data('ship_id', ship_base.ship_id);
        $('#ed_ship_en_cod').val(ship_base.ship_en_cod);
        $('#ed_ship_cu_id').val(ship_base.ship_cu_desc);
        $('#ed_ship_cu_id').data('ship_cu_id', ship_base.ship_cu_id);
        $('#ed_voyage_no').val(ship_base.voyage_no);
        $('#ed_vl_id').combobox('setValue', ship_base.vl_id);
        $('#ed_etd').datebox('setValue', dateformat(ship_base.ETD, true));
        $('#ed_eta').datebox('setValue', dateformat(ship_base.ETA, true));
        $('#ed_start_area_id').combobox('setValue', ship_base.start_area_id);
        $('#ed_end_area_id').combobox('setValue', ship_base.end_area_id);
        $('#ed_bak').val(ship_base.bak);

        columns_fliters_of_ship_cntr_group.columns_fliters('reset_target_data_and_clumns_fliter',data.group_cntr_list);
        table_bottom_group_desc(data.group_fee_desc, 0, 'single_group_ship_voyage_fee');

        var group_table_tr = $('.single_group_ship_voyage_fee tbody tr').eq(0);
        if (data.group_fee_desc != undefined && data.group_fee_desc.length > 0) {

            var arr_gfd = data.group_fee_desc.split(';');
            $.each(arr_gfd, function (i, is) {
                if (is == undefined) is = '';
                arr_gfd[i] = (is.length > 0 ? is.substr(0, is.length - 1) : '');
            });
            var all_gd = '';
            
            var temp =  'pay' ;
            var tmp2 =   '付' ;
            all_gd =  
                '<td class="cls_' + temp + '_title">应' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + arr_gfd[0] + '</td>' +
                '<td class="cls_' + temp + '_title">实' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + arr_gfd[1] + '</td>' +
                '<td class="cls_' + temp + '_title">未' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + arr_gfd[2] + '</td>';
             
            group_table_tr.html('').html(all_gd);
        }

        show_page_ship_base_info();

    },true);

    

    
}

//显示页面  
function show_page_ship_base_info() {

    //初始化表格

    $('.dv_edit_order_menu_tab').removeClass('dv_edit_order_menu_tab_focus');
    $('.dv_edit_order_menu_tab').eq(0).addClass('dv_edit_order_menu_tab_focus');
    $('div.page_ship_cntr_info').fadeOut();
    $('div.page_ship_fee_info').fadeOut();


    if ($cur_page == undefined) {
        $cur_page = $('div.page_ship_base_info');
        $cur_page.fadeIn(50, function () {
            $cur_page.layout({ fit: true });
        });
    } else {
        var $old_page = $cur_page;
        $cur_page = $('div.page_ship_base_info');
        $old_page.fadeOut(50, function () {
            $cur_page.fadeIn(50, function () {
                $cur_page.layout({ fit: true });
            });
        });
    }


}

//
function clear_mulit_conditions_ship_cntr_group_search() {
    columns_fliters_of_ship_cntr_group.columns_fliters('clear');
}
//集装箱信息统计表

function init_tab_ship_cntr_group() {
    $('#tab_ship_cntr_group').datagrid({
        data: [],
        //data:{total:arr.length,rows:arr},
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        //pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_ship_cntr_group_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120], 
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ field: 'cntr_id', title: '',  checkbox: true }]],
        columns: [[
                {
                    field: 'freight_desc', title: '协议', sortable: true, width: 60,
                    styler: function (value, row, index) {
                        if (row.freight_desc == undefined || row.freight_desc == '') {
                            return 'background-color:#ffbfb4;color:#000;';
                        }
                    }
                }
                , {
                    field: 'od_delegate_cu_desc', title: '委托单位', sortable: true, width: 150,
                    styler: function (value, row, index) {
                        if (row.od_delegate_cu_desc == undefined || row.od_delegate_cu_desc == '') {
                            return 'background-color:#ffbfb4;color:#000;';
                        } else {
                            return '';
                        }
                    }
                }
                
                , {
                    field: 'load_port_desc', title: '装载港', sortable: true, width: 90,
                    styler: function (value, row, index) {
                        if (row.load_port_desc == undefined || row.load_port_desc == '') {
                            return 'background-color:#ffbfb4;color:#000;';
                        }
                    }
                }
                , {
                    field: 'disc_port_desc', title: '卸载港', sortable: true, width: 90,
                    styler: function (value, row, index) {
                        if (row.disc_port_desc == undefined || row.disc_port_desc == '') {
                            return 'background-color:#ffbfb4;color:#000;';
                        }
                    }
                }
                , {
                    field: 'destination_port_desc', title: '目的港', sortable: true, width: 90,
                    styler: function (value, row, index) {
                        if (row.destination_port == undefined || row.destination_port == '') {
                            return 'background-color:#ffbfb4;color:#000;';
                        }
                    }
                }
                
                , { field: 'bill_no', title: '提单号', sortable: true, width: 130, }
                , {
                    field: 'eqp_siz', title: '尺寸', sortable: true, width: 40,
                    styler: function (value, row, index) {
                        if (row.eqp_typ_validate_result == 0) {
                            return 'background-color:#ff0401;color:#FFF;';
                        }
                    }
                }
                , {
                    field: 'eqp_typ', title: '箱型', sortable: true, width: 40,
                    styler: function (value, row, index) {
                        if (row.eqp_typ_validate_result == 0) {
                            return 'background-color:#ff0401;color:#FFF;';
                        }
                    }
                }
                , {
                    field: 'cntr_number', title: '数量', sortable: true, width: 48,
                }
                , {
                    field: 'e_f_id', title: 'E/F', sortable: true, width: 48,
                } 
                , {
                    field: 'trade_desc', title: '内/外贸', sortable: true, width: 50,
                    styler: function (value, row, index) {
                        if (row.trade_id == undefined || row.trade_id == '') {
                            return 'background-color:#ffbfb4;color:#000;';
                        }
                    }
                }
                , {
                    field: 'danger_flag_desc', title: '危险品', width: 45, align: 'center',
                    formatter: function (value, row, index) {
                        if (row.danger_flag == 1) {
                            return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                        } else {
                            return "";
                        }
                    },
                }
                
        ]],
        onLoadSuccess: function (data) {
            refresh_cntr_group_list_footer();
            if (!columns_fliters_of_ship_cntr_group) {
                columns_fliters_of_ship_cntr_group = $('#columns_fliters_of_ship_cntr_group').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_ship_cntr_group'),
                    cur_cls_target_body: 'cls_ship_cntr_group'
                });
            }
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_ship_cntr_group'), rowIndex);
            refresh_cntr_group_list_footer();
        },
        onCheck: function (index, row) {
            refresh_cntr_group_list_footer();
        },
        onUncheck: function (index, row) {
            refresh_cntr_group_list_footer();
        },
        onCheckAll: function (index, row) {
            refresh_cntr_group_list_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_cntr_group_list_footer();
        },
        });
}
function refresh_cntr_group_list_footer() {
    var rows = $('#tab_ship_cntr_group').datagrid('getChecked');

    var count = rows.length;

    var data_group = [ ];

    if (rows.length > 0) {
        $.each(rows, function (i, item) {

            var has = false;

            $.each(data_group, function (j, gitem) {
                if (gitem.eqp_siz == item.eqp_siz &&
                    gitem.eqp_typ == item.eqp_typ) {
                    gitem.count += item.cntr_number;
                    has = true;
                }
            });
            if (has == false) {
                data_group.push({
                    eqp_siz: item.eqp_siz,
                    eqp_typ: item.eqp_typ,
                    count: item.cntr_number,
                });
            }
        });
    }
    var group_table_tr = $('.selected_group_cntr tbody tr').eq(0);
    if (data_group.length > 0) {

        var arr_gfd = ''
        $.each(data_group, function (i, item) {
            if(arr_gfd.length == 0){
                arr_gfd = item.count + '*' + item.eqp_siz + item.eqp_typ;
            } 
            else {
                arr_gfd += ',' + item.count + '*' + item.eqp_siz + item.eqp_typ;
            }
        });
        var all_gd = '<td class="cls_total_title">当前选择:</td><td class="cls_total_value">' + arr_gfd + '</td>';

        group_table_tr.html('').html(all_gd);
    }
    else {
        group_table_tr.html('');
    }


}