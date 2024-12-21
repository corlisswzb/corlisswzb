var pageNumber = 1;
var pageSize = 30;
var can_change_tab = false;

var $cur_page = undefined;

var basesetting = undefined;


var hand_cost_par = {};


$(document).ready(function () {

    $('#dlg_of_create_hand_cost').dialog({
        title: '人工成本支出',
        iconCls: 'icon-transmit',
        autoOpen: false,
        modal: true,
        width: 80,
        height: 420, 
    }).dialog('close');

    $($('body')[0]).unbind('keydown').bind('keydown', self_custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);
     

    get_basesetting();

    
});
 
function self_custom_keypress(event) {//响应键盘按下事件 
    var e = event || window.event;
    var code = e.keyCode | e.which | e.charCode;

    if (code == KEY.SHIFT) {
        inputFlags.isShiftDown = true;
        $($('body')[0]).unbind('contextmenu').bind('contextmenu', function () { return false; });
        $($('body')[0]).unbind('selectstart').bind('selectstart', function () { return false; });
    }

    if (e.keyCode == 112 && e.ctrlKey) {
        show_dlg_hand_coast();
    }
     
}
/*
    弹出人工成本对话框
*/
function show_dlg_hand_coast() {
    var rows = $("#tab_order").datagrid('getChecked');

    if (rows.length == 0) {
        $.messager.alert('错误提示','错误:请选择列表数据后在执行此操作！','error');
        return;
    }
    
    var od_total_profit = 0;

    var od_seqs = '';
    $.each(rows, function (i, item) {
        if (od_seqs.length == 0) {
            od_seqs = item.od_seq;
        } else {
            od_seqs += ',' + item.od_seq;
        }

        od_total_profit += item.profit_total_amount_of_base;

    });

    //hand_cost_par = {
    //    od_seqs: od_seqs,
    //    od_total_profit: od_total_profit,
    //    hand_coast_total: 0,
    //    hand_cost_cu_id: undefined,
    //    hand_cost_fee_item_typ: undefined,
    //    hand_cost_fee_unit: undefined,
    //    hand_cost_fee_invoice_typ: undefined,
    //    hand_cost_fee_bak: undefined, 
    //}

    $('#sel_od_count').html(rows.length);
    $('#sel_od_total_profit').html(od_total_profit.toFixed(2));

    $('#dlg_of_create_hand_cost').dialog({
        title: '人工成本支出',
        iconCls: 'icon-transmit',
        autoOpen: false,
        modal: true,
        width: 480,
        height: 420,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_of_create_hand_cost').dialog('close'); 
                }
            },
            {
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {
                    hand_cost_par = {
                        od_count: rows.length,
                        od_seqs: od_seqs,
                        od_total_profit: parseFloat(od_total_profit),
                        hand_cost_total: parseFloat( $('#hand_cost_total').val()),
                        hand_cost_cu_id: $('#hand_cost_cu_id').data('cu_id'),
                        hand_cost_cu_desc: $('#hand_cost_cu_id').combogrid('getText'),
                        hand_cost_fee_item_typ: $('#hand_cost_fee_item_typ').combobox('getValue'),
                        hand_cost_fee_unit: $('#hand_cost_fee_unit').combobox('getValue'),
                        hand_cost_fee_invoice_typ: $('#hand_cost_fee_invoice_typ').combobox('getValue'),

                        hand_cost_fee_item_typ_desc: $('#hand_cost_fee_item_typ').combobox('getText'),
                        hand_cost_fee_unit_desc: $('#hand_cost_fee_unit').combobox('getText'),
                        hand_cost_fee_invoice_typ_desc: $('#hand_cost_fee_invoice_typ').combobox('getText'),

                        hand_cost_fee_bak: $('#hand_cost_fee_bak').val(),
                    }

                    if (hand_cost_par.hand_cost_total == '' ||
                        parseFloat(hand_cost_par.hand_cost_total) >
                        parseFloat(hand_cost_par.od_total_profit)) {
                        $.messager.alert('错误提示','错误:设定的支出成本总额大于委托总盈利(本币)','error');
                        return;
                    }

                    if(hand_cost_par.hand_cost_cu_id == '' || 
                        hand_cost_par.hand_cost_cu_id == undefined) {
                        $.messager.alert('错误提示', '错误:必须设定结算单位', 'error');
                        return;
                    }

                    if (hand_cost_par.hand_cost_fee_item_typ == '' ||
                        hand_cost_par.hand_cost_fee_item_typ == undefined) {
                        $.messager.alert('错误提示', '错误:必须设定费项', 'error');
                        return;
                    }
                    if (hand_cost_par.hand_cost_fee_unit == '' ||
                        hand_cost_par.hand_cost_fee_unit == undefined) {
                        $.messager.alert('错误提示', '错误:必须设定计量单位', 'error');
                        return;
                    }
                    if (hand_cost_par.hand_cost_fee_invoice_typ == '' ||
                        hand_cost_par.hand_cost_fee_invoice_typ == undefined) {
                        $.messager.alert('错误提示', '错误:必须设定发票税点', 'error');
                        return;
                    }

                    //这里 应该 改一下 
                    var content = '<iframe scrolling="auto" frameborder="0"  src="template_bus_create_hand_cost.aspx?rnd=' +
                                        Math.random() +  
                                        '" style="width:100%;height:100%;"></iframe>';
                    $('#win_of_hand_cost').window({
                        title: '批量增加成本费用',
                        content: content,
                        onClose: function () {
                            refresh_order_list();
                        }
                    }).window('open');

                    $('#dlg_of_create_hand_cost').dialog('close'); 
                }
            }
        ]
    }).dialog('open');
}

function call_close_hand_cost_win() {
    $('#win_of_hand_cost').window('close'); 
}

function call_get_hand_cost_par() {
    return hand_cost_par;
}

//获取基础数据
function get_basesetting() { 
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
         
        basesetting = data; 
        basesetting.group_cntr_pin_typ = [{ value: 1, label: '整箱' }, { value: 0, label: '拼箱' }, ];
        sessionStorage.setItem('basesetting', JSON.stringify(basesetting));
        
        //查询
        bind_combobox(basesetting.order_typ_list, $('#search_od_typ'), 'ot_desc', 'ot_id', true);
     
        bind_combobox(basesetting.project_list, $('#search_od_project_typ'), 'pr_name', 'pr_id', true);
        bind_combobox(basesetting.box_typ_list, $('#search_od_box_typ'), 'bx_name', 'bx_id', true); 
        bind_combobox(basesetting.trade_typ_list, $('#search_od_trade_typ_id'), 't_desc', 't_id', true);
        bind_combobox(basesetting.employe_list, $('#search_od_service_id'), 'u_real_name', 'u_id', true);

        
        bind_combogrid_custom($('#search_od_delegate_cu_id'));
        bind_combogrid_custom($('#search_od_cargo_agent_cu_id'));
         
        bind_combogrid_custom($('#search_fee_cu_id'));
        
        bind_combogrid_custom($('#hand_cost_cu_id'));

        bind_combogrid_custom($('#hand_cost_cu_id'));
        bind_combobox(basesetting.fee_item_list, $('#hand_cost_fee_item_typ'), 'fee_show_desc', 'fee_id', false);
        bind_combobox(basesetting.unit_list, $('#hand_cost_fee_unit'), 'u_desc', 'u_id', false);
        bind_combobox(basesetting.invoice_list, $('#hand_cost_fee_invoice_typ'), 'in_name', 'in_id', false);

        init_order_tab(); 
    }, true); 
}


function call_get_basesetting() {
    return basesetting;
}
//查询订单
function refresh_order_list() {
    var par = {
        rnd: Math.random(),
        action: 'get_order_list_include_min_profit',
        like_str: $.trim($('#search_like_str').val()),
        od_typ: $('#search_od_typ').combobox('getValue'),
        od_status_id: $('#search_od_status_id').combobox('getValue'),
        od_project_typ: $('#search_od_project_typ').combobox('getValue'),
        od_cargo_agent_cu_id: $('#search_od_cargo_agent_cu_id').data('cu_id'),
        od_delegate_cu_id: $('#search_od_delegate_cu_id').data('cu_id'),
        od_cargo_agent_cu_desc: $('#search_od_cargo_agent_cu_id').combogrid('getText'),
        od_delegate_cu_desc: $('#search_od_delegate_cu_id').combogrid('getText'),
        od_box_typ_id: $('#search_od_box_typ').combobox('getValue'),
        od_beg_fee_dat: $('#search_od_beg_fee_dat').datebox('getValue'),
        od_end_fee_dat: $('#search_od_end_fee_dat').datebox('getValue'),
        od_service_id: $('#search_od_service_id').combobox('getValue'),
        od_water_way_flag: $('#search_od_water_way_flag').is(':checked') ? 1 : 0,
        od_sub_way_flag: $('#search_od_sub_way_flag').is(':checked') ? 1 : 0,
        od_road_way_flag: $('#search_od_road_way_flag').is(':checked') ? 1 : 0,
        od_air_way_flag: $('#search_od_air_way_flag').is(':checked') ? 1 : 0,
        od_route_tools_desc: $.trim($('#search_od_route_tools_desc').val()),
        od_route_tools_no: $.trim($('#search_od_route_tools_no').val()),
        od_bill_nos: $.trim($('#search_od_bill_nos').val()),
        od_cntr_nos: $.trim($('#search_od_cntr_nos').val()),
        od_min_profit:$('#search_od_min_proift').val() ,
        fee_cu_id: $('#search_fee_cu_id').data('cu_id'),
        od_trade_typ_id: $('#search_od_trade_typ_id').combobox('getValue'),
    };

    if (par.od_cargo_agent_cu_id == undefined || par.od_cargo_agent_cu_id == '') {
        if (par.od_cargo_agent_cu_desc.length > 0) {
            $.messager.alert('错误', '错误: 供货客户不是预设值!', 'error');
            return;
        } 
    }
    if (par.od_delegate_cu_id == undefined && par.od_delegate_cu_id == '') {
        if (par.od_delegate_cu_desc.length > 0) {
            $.messager.alert('错误', '错误: 委托客户不是预设值!', 'error');
            return;
        } 
    }

    $("#tab_order").datagrid('load', par);
}

//初始化 订单列表
function init_order_tab() {
    $("#tab_order").datagrid({
        url: '../Ashx/busi_order.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_order_list_include_min_profit',
            like_str: $.trim($('#search_like_str').val()),
            od_typ: $('#search_od_typ').combobox('getValue'),
            od_status_id: $('#search_od_status_id').combobox('getValue'),
            od_project_typ: $('#search_od_project_typ').combobox('getValue'),
            od_cargo_agent_cu_id: $('#search_od_cargo_agent_cu_id').data('cu_id'),
            od_delegate_cu_id: $('#search_od_delegate_cu_id').data('cu_id'),
            od_box_typ_id: $('#search_od_box_typ').combobox('getValue'),
            od_beg_fee_dat: $('#search_od_beg_fee_dat').datebox('getValue'),
            od_end_fee_dat: $('#search_od_end_fee_dat').datebox('getValue'),
            od_service_id: $('#search_od_service_id').combobox('getValue'),
            od_water_way_flag: $('#search_od_water_way_flag').is(':checked') ? 1 : 0,
            od_sub_way_flag: $('#search_od_sub_way_flag').is(':checked') ? 1 : 0,
            od_road_way_flag: $('#search_od_road_way_flag').is(':checked') ? 1 : 0,
            od_air_way_flag: $('#search_od_air_way_flag').is(':checked') ? 1 : 0,
            od_route_tools_desc: $.trim($('#search_od_route_tools_desc').val()),
            od_route_tools_no: $.trim($('#search_od_route_tools_no').val()),
            od_bill_nos: $.trim($('#search_od_bill_nos').val()),
            od_cntr_nos: $.trim($('#search_od_cntr_nos').val()),
            od_min_profit: $('#search_od_min_proift').val(),
            fee_cu_id: $('#search_fee_cu_id').data('cu_id'),
            od_trade_typ_id: $('#search_od_trade_typ_id').combobox('getValue'), 
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
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false, 
        fit: true, 
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        showFooter: true,
        frozenColumns: [[{ title: '', field: 'od_seq', width: 40, checkbox: true },
             {
                 field: 'od_status_desc', title: '状态', width: 50, sortable: true,
                 styler: function (value, row, index) {
                     if (row.od_status_id == 1) {
                         if (row.amc_status == 0) return 'background-color:#dcdcdc;color:#000;';
                         else return 'background-color:#ffccb1;color:#000;';
                     } else if (row.od_status_id == 2) {
                         return 'background-color:#f9752e;color:#FFF;';
                     } else if (row.od_status_id == 3) {
                         return 'background-color:#02e251;color:#000;';
                     }
                 }

             }
            , {
                field: 'od_no', title: '业务编号', width: 90, sortable: true,

            }
            , {
                field: 'od_fee_dat', title: '业务时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
        ]],

        columns: [[
            
                 { field: 'od_typ_desc', title: '业务类型', sortable: true, width: 70 }
                , { field: 'od_box_typ_desc', title: '集散', sortable: true, width: 40, }
                , { field: 'od_project_typ_desc', title: '项目名称', sortable: true, width: 70, }
                , { field: 'od_trade_typ_desc', title: '内外', sortable: true, width: 40, }
                , {
                    field: 'od_i_e_desc', title: '进出口', sortable: true, width: 40, 
                }
                , { field: 'od_beg_place_desc', title: '起运地', sortable: true, width: 80, }
                , { field: 'od_end_place_desc', title: '目的地', sortable: true, width: 80, }
                , { field: 'od_freight_desc', title: '承运条款', sortable: true, width: 60, }
                , { field: 'od_delegate_cu_desc', title: '委托客户', sortable: true, width: 140, }
                , { field: 'od_cargo_agent_cu_desc', title: '供货客户', sortable: true, width: 140, }

                , { field: 'od_cargo_typ_desc', title: '品名', sortable: true, width: 80, }
                , {
                    field: 'od_cargo_weight', title: '货重', sortable: true, width: 60,
                    formatter: function (value, row, index) {
                        if(value.length > 0 && !isNaN(value)){
                            return value.toFixed(2);
                        } else{
                            return '';
                        }
                    }
                }
                , {
                    field: 'od_cargo_number', title: '件数', sortable: true, width: 60,
                    formatter: function (value, row, index) {
                        
                        if(value == undefined || isNaN(value)){
                            return '';
                        }else{
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
                }
                , {
                    field: 'od_cntr_desc', title: '箱量', sortable: true, width: 60

                }
                , {
                    field: 'od_main_bill_no', title: '提单', sortable: true, width: 160

                }

                , {
                    field: 'rec_total_amount_desc', title: '应收小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#eecfcb;color:#000;';
                    }
                }
                , {
                    field: 'reced_total_amount_desc', title: '实收小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#eecfcb;color:#000;';
                    }
                }
                , {
                    field: 'unreced_total_amount_desc', title: '未收小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#eecfcb;color:#000;';
                    }
                }
                , {
                    field: 'pay_total_amount_desc', title: '应付小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#b3e7c7;color:#000;';
                    }
                }
                , {
                    field: 'payed_total_amount_desc', title: '实付小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#b3e7c7;color:#000;';
                    }
                }
                , {
                    field: 'unpayed_total_amount_desc', title: '未付小计', sortable: true, width: 165,
                    styler: function (value, row, index) {
                        return 'background-color:#b3e7c7;color:#000;';
                    }
                }
                , {
                    field: 'profit_total_amount_desc', title: '盈利', width: 165, sortable: true,
                    styler: function (value, row, index) {
                        if (row.profit_total_amount_of_base > 0) {
                            return 'background-color:#ead1c8;color:#000;';
                        } else if (row.profit_total_amount_of_base < 0) {
                            return 'background-color:#b3e7c7;color:#000;';
                        }
                    }
                }
                
                , { field: 'od_operation_nam', title: '操作', sortable: true, width: 80, }
                , { field: 'od_sales_nam', title: '销售', sortable: true, width: 80, }
                , { field: 'od_service_nam', title: '客服', sortable: true, width: 80, }
                , {
                    field: 'od_record_dat', title: '创建时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , { field: 'od_operation_lock_nam', title: '业务锁定', sortable: true, width: 80, }
                , {
                    field: 'od_operation_lock_dat', title: '锁定时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
        ]],
        onLoadSuccess: function (data) {
            table_bottom_group_desc(data.group_fee_desc, data.total, 'cls_group_order_fee', 0);
              
            refresh_order_list_of_footer();

        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_order'), rowIndex);
             
            refresh_order_list_of_footer();
        },
        onCheck: function (index, row) {
            refresh_order_list_of_footer();
        },
        onUncheck: function (index, row) {
            refresh_order_list_of_footer();
        },
        onCheckAll: function (index, row) {
            refresh_order_list_of_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_order_list_of_footer();
        },
        onDblClickRow: function (index, row) {
            //这里 应该 改一下 
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#window_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        }, 
        onRowContextMenu: function (e, field, row) {
            e.preventDefault();
            $('#dv_view_of_approval_details_from_list').data('od_seq', row.od_seq);
            $('#dv_view_of_approval_details_from_list').data('od_no', row.od_no);
            $('#dv_view_of_approval_details_from_list').data('amc_id', row.amc_id);
            $('#dv_view_of_approval_details_from_list').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}

//刷新底部的统计 
//刷新底部的统计 
function refresh_order_list_of_footer() {

    var rows = $('#tab_order').datagrid('getChecked');

    //需要把描述进行拆解然后加权 
    //$:30.00,￥:1559.00 
    var cur_fee_group = {
        rec_total_amount_desc: [],
        reced_total_amount_desc: [],
        unreced_total_amount_desc: [],
        pay_total_amount_desc: [],
        payed_total_amount_desc: [],
        unpayed_total_amount_desc: [],
        profit_total_amount_desc: []
    };

    $.each(rows, function (i, row) {

        if (row.rec_total_amount_desc != undefined && row.rec_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.rec_total_amount_desc.split(',');


            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 ,取消了: 所以这里，不能这样拆封 

                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.rec_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.rec_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.reced_total_amount_desc != undefined && row.reced_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.reced_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.reced_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.reced_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.unreced_total_amount_desc != undefined && row.unreced_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.unreced_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.unreced_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.unreced_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.pay_total_amount_desc != undefined && row.unreced_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.pay_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.pay_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.pay_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.payed_total_amount_desc != undefined && row.payed_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.payed_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.payed_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.payed_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.unpayed_total_amount_desc != undefined && row.unpayed_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.unpayed_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.unpayed_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.unpayed_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }

        if (row.profit_total_amount_desc != undefined && row.profit_total_amount_desc.length > 0) {
            //1. 按逗号拆 
            var t_arr1 = row.profit_total_amount_desc.split(',');

            $.each(t_arr1, function (gh, ta) {
                //2. 按 : 拆 
                var t_symbol = ta.substr(0, 1);
                var t_amount = ta.substr(1, ta.length);
                var has = false;
                $.each(cur_fee_group.profit_total_amount_desc, function (p, pa) {
                    if (pa.symbol == t_symbol) {
                        pa.amount += parseFloat(t_amount);
                        has = true;
                    }
                });
                if (!has) {
                    cur_fee_group.profit_total_amount_desc.push({
                        symbol: t_symbol,
                        amount: parseFloat(t_amount)
                    });
                }
            });
        }
    });

    var cur_fee_group2 = {
        rec_total_amount_desc: '',
        reced_total_amount_desc: '',
        unreced_total_amount_desc: '',
        pay_total_amount_desc: '',
        payed_total_amount_desc: '',
        unpayed_total_amount_desc: '',
        profit_total_amount_desc: ''
    };

    $.each(cur_fee_group.rec_total_amount_desc, function (i, item) {
        if (cur_fee_group2.rec_total_amount_desc.length == 0) {
            cur_fee_group2.rec_total_amount_desc = item.symbol + item.amount.toFixed(2);
        } else {
            cur_fee_group2.rec_total_amount_desc += ',' + item.symbol + item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.reced_total_amount_desc, function (i, item) {
        if (cur_fee_group2.reced_total_amount_desc.length == 0) {
            cur_fee_group2.reced_total_amount_desc = item.symbol + item.amount.toFixed(2);
        } else {
            cur_fee_group2.reced_total_amount_desc += ',' + item.symbol + item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.unreced_total_amount_desc, function (i, item) {
        if (cur_fee_group2.unreced_total_amount_desc.length == 0) {
            cur_fee_group2.unreced_total_amount_desc = item.symbol + item.amount.toFixed(2);
        } else {
            cur_fee_group2.unreced_total_amount_desc += ',' + item.symbol + item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.pay_total_amount_desc, function (i, item) {
        if (cur_fee_group2.pay_total_amount_desc.length == 0) {
            cur_fee_group2.pay_total_amount_desc = item.symbol + item.amount.toFixed(2);
        } else {
            cur_fee_group2.pay_total_amount_desc += ',' + item.symbol + item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.payed_total_amount_desc, function (i, item) {
        if (cur_fee_group2.payed_total_amount_desc.length == 0) {
            cur_fee_group2.payed_total_amount_desc = item.symbol + item.amount.toFixed(2);
        } else {
            cur_fee_group2.payed_total_amount_desc += ',' + item.symbol + item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.unpayed_total_amount_desc, function (i, item) {
        if (cur_fee_group2.unpayed_total_amount_desc.length == 0) {
            cur_fee_group2.unpayed_total_amount_desc = item.symbol + item.amount.toFixed(2);
        } else {
            cur_fee_group2.unpayed_total_amount_desc += ',' + item.symbol + item.amount.toFixed(2);
        }
    });
    $.each(cur_fee_group.profit_total_amount_desc, function (i, item) {
        if (cur_fee_group2.profit_total_amount_desc.length == 0) {
            cur_fee_group2.profit_total_amount_desc = item.symbol + item.amount.toFixed(2);
        } else {
            cur_fee_group2.profit_total_amount_desc += ',' + item.symbol + item.amount.toFixed(2);
        }
    });


    $("#tab_order").datagrid('reloadFooter', [
        {
            od_status_desc: '',
            od_status_id: '',
            od_no: '',
            od_fee_dat: '',
            od_typ_desc: '',
            od_box_typ_desc: '',
            od_project_typ_desc: '',
            od_trade_typ_desc: '',
            od_i_e_id: '',
            od_beg_place_desc: '',
            od_end_place_desc: '',
            od_freight_desc: '',
            od_delegate_cu_desc: '',
            od_cargo_agent_cu_desc: '',
            od_cargo_typ_desc: '',
            od_cargo_weight: '',
            od_cargo_number: '',
            od_cntr_desc: '',
            od_main_bill_no: '',
            od_operation_nam: '',
            od_sales_nam: '',
            od_service_nam: '',
            od_record_dat: '',
            od_operation_lock_nam: '',
            od_operation_lock_dat: '',
            rec_total_amount_desc: cur_fee_group2.rec_total_amount_desc,
            reced_total_amount_desc: cur_fee_group2.reced_total_amount_desc,
            unreced_total_amount_desc: cur_fee_group2.unreced_total_amount_desc,
            pay_total_amount_desc: cur_fee_group2.pay_total_amount_desc,
            payed_total_amount_desc: cur_fee_group2.payed_total_amount_desc,
            unpayed_total_amount_desc: cur_fee_group2.unpayed_total_amount_desc,
            profit_total_amount_desc: cur_fee_group2.profit_total_amount_desc,

        },
    ]);

}

function view_of_order_info_from_list() {
    var od_seq = $('#dv_view_of_approval_details_from_list').data('od_seq');
    var od_no = $('#dv_view_of_approval_details_from_list').data('od_no');
    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                        Math.random() + '&od_seq=' +
                        od_seq +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#window_of_order_info').window({
        title: '订单: ' +  od_no,
        content: content
    }).window('open');
}
function view_of_approval_details_from_list() {
    var amc_id = $('#dv_view_of_approval_details_from_list').data('amc_id');

    if (amc_id == undefined || amc_id.length == 0) {
        $.messager.alert('错误', '错误: 未提交业务审核', 'error');
        return;
    }

    show_approval_details(amc_id);
}


function show_approval_details(amc_id) {

    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_approval_flow_details.aspx?rnd=' +
                        Math.random() + '&amc_id=' +
                        amc_id +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#win_approval_flow_details').window({
        title: '查看审核流程 ',
        content: content
    }).window('open');


}
 

/*批量锁单*/
function bat_lock_order_list() {
    var rows = $("#tab_order").datagrid('getChecked');

    if (rows.length == 0) {
        $.messager.alert('错误','错误:请选择需要操作的数据','error');
        return;
    }

    var has_pass = false;
    var od_seq = '';
    //只能对1 进行操作
    $.each(rows, function (i, row) {
        if (row.od_status_id != 1) {
            has_pass = true;
            return;
        }
        if (od_seq.length == 0) {
            od_seq = row.od_seq;
        } else {
            od_seq += ',' + row.od_seq;
        }
    });

    if (has_pass) {
        $.messager.alert('错误', '错误:只能对未提交的委托进行强制锁单', 'error');
        return; 
    }

    $.messager.confirm('批量锁单提醒', '你正在执行批量锁单操作，批量锁单只能对未提交的委托强制锁单，请确认是否继续操作？', function (r) {
        if (r) {

            post('../Ashx/busi_order.ashx', {
                rnd: Math.random(),
                action: 'force_close_order',
                od_seq: od_seq 
            }, function (data) {
                if (data.result == 1) {
                    $.messager.alert('操作提示', data.msg, 'info', function () {
                        refresh_order_list();
                    });
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                }
            },true);
        }
    });
}