var pageNumber = 1;
var pageSize = 30;
var pub_od_no = undefined;
var pub_od_seq = undefined;
var pub_feerow = undefined;
var pub_row = undefined;
var pub_co_status = 0;
//原费用右键保存的rowdata
var pub_tab_old_rp_rowData = undefined;
var cur_edit_fee_rowindex = undefined;
var pub_co_rp = 1;
//修改前的数据
var old_tab_row = undefined;
var pub_co_seq = undefined;
/*汇率*/
var cur_ref_month_exchange_list = undefined;
/*
临时中转变量
主要用途: 用于 datagrid中的combogrid 获取 id值 

*/

//业务费用
var pub_rec_total_amount = 0;
var pub_pay_total_amount = 0;
var pub_profit_total_amount = 0;

var tmp_combogrid_cu_id = undefined;
var tmp_combogrid_cu_desc = undefined;

var basesetting = undefined;
var cop_params = {
    rnd: Math.random(),
    action: 'get_changeorder_plan_list',
    co_status: '',
    amc_status: '',
    like_str: '',
    create_id: '',
    beg_date: '',
    end_date: ''
}

var tab_params = {
    rnd: Math.random(),
    action: 'get_order_list',
    like_str: '',
    od_typ: '',
    od_status_id: 3,
    od_project_typ: '',
    od_cargo_agent_cu_id: '',
    od_delegate_cu_id: '',
    od_box_typ_id: '',
    od_beg_fee_dat: '',
    od_end_fee_dat: '',
    od_service_id: '',
    od_water_way_flag:  0,
    od_sub_way_flag:  0,
    od_road_way_flag:  0,
    od_air_way_flag:  0,
    od_route_tools_desc: '',
    od_route_tools_no: '',
    od_bill_nos: '',
    od_cntr_nos: '',
    fee_cu_id: '',
    od_trade_typ_id: '',
}


$(document).ready(function () {
    get_basesetting();
    
})

//获取基础数据
function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        basesetting = data;
        //查询

        bind_combobox(basesetting.order_typ_list, $('#search_od_typ'), 'ot_desc', 'ot_id', true);
        //bind_combogrid_custom($('#search_fee_cu_id'));
        //bind_combobox(basesetting.fee_item_list, $('#search_fee_item_typ'), 'fee_cn', 'fee_id', true);
        //bind_combobox(basesetting.unit_list, $('#search_fee_unit'), 'u_desc', 'u_id', true);
        //bind_combobox(basesetting.invoice_list, $('#search_invoice_typ'), 'in_name', 'in_id', true);
        //bind_combobox(basesetting.currency_list, $('#search_currency_typ'), 'cr_name', 'cr_id', true);
        //bind_combobox(basesetting.employe_list, $('#search_operation_id'), 'u_real_name', 'u_id', true)
        //bind_combobox(basesetting.employe_list, $('#search_cop_createid'), 'u_real_name', 'u_id', true)
        init_change_order_tab();
        init_changeorder_plan_tab();

        init_tab_fee_list_of_old_rp();
        //init_tab_fee_list_of_new_rp();
        //init_tab_fee_list_of_select_rp();

    }, true);
}

//子页面获取 basesetting
function call_get_father_basesetting() {
    return basesetting;
}

//初始化 改单费用明细列表
function init_change_order_tab() {
    $("#tab_change_order").datagrid({
        url: '../Ashx/order.ashx',
        queryParams: tab_params,
        method: 'post',
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [30, 60, 120],
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
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
         field: 'od_status_desc',  title: '状态', width: 62, sortable: true,
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
         field: 'od_no',  title: '业务编号', width: 90, sortable: true,

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
                    field: 'od_i_e_id', title: '进出口', sortable: true, width: 40,
                    formatter: function (value, row, index) {
                        if (value == undefined) return '';
                        else {
                            if (value == 'I') return '进口';
                            if (value == 'E') return '出口';
                        }
                    }
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
                        if (value.length > 0 && !isNaN(value)) {
                            return value.toFixed(2);
                        } else {
                            return '';
                        }
                    }
                }
                , {
                    field: 'od_cargo_number', title: '件数', sortable: true, width: 60,
                    formatter: function (value, row, index) {
                        if (value == undefined || isNaN(value)) {
                            return '';
                        } else {
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

            //refresh_order_list_of_footer();

        },
        onRowContextMenu: function (e, rowIndex, rowData) {
            e.preventDefault();//阻止浏览器捕获右键事件
            $(this).datagrid("selectRow", rowIndex); //根据索引选中该行

            if (rowData.od_status_id != 3) {
                $.messager.alert('错误', '错误: 订单状态必须为审核通过，不可操作', 'error');
                return;
            }
           
            pub_od_no = rowData.od_no;
            pub_od_seq = rowData.od_seq;
            pub_row = rowData;
            $('#dv_changeorder_menu').data('od_seq', rowData.od_seq);
         
            $('#dv_changeorder_menu').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        },
        onDblClickRow:function (index,row) {
            console.log(row);
        },
        onClickCell: function (rowIndex, field, value) {

        },

    });
}

function join_changeplan() {

    var rows = $('#tab_change_order').datagrid('getChecked');
    
    if (rows.length > 0) {
        pub_row = rows[0];
        pub_od_no = rows[0].od_no;
        pub_od_seq = rows[0].od_seq;
        $('#dv_changeorder_menu').data('od_seq', rows[0].od_seq);
        open_changeorder_plan();

    } else {
        $.messager.alert('错误', '必须选择业务', 'error');
        return;
    }
}

//加入改单计划
function open_changeorder_plan() {

    $("#lay_east").parent().css('display', 'none');

    //获取汇率
    var od_seq = $('#dv_changeorder_menu').data('od_seq');
    get_rate(od_seq);
    
    //绑定费用基本信息
    $("#sp_od_status").text(pub_row.od_status_desc);
    $("#sp_od_no").text(pub_row.od_no);
    $("#sp_od_typ").text(pub_row.od_typ_desc);
    $("#sp_rec").text(pub_row.rec_total_amount_desc);
    $("#sp_pay").text(pub_row.pay_total_amount_desc);
    $("#sp_total").text(pub_row.profit_total_amount_desc);

    pub_rec_total_amount = pub_row.rec_total_amount;
    pub_pay_total_amount = pub_row.pay_total_amount;
    pub_profit_total_amount = pub_row.profit_total_amount;

    $('#dv_costatus_menu').menu('enableItem', '#add');
    $('#dv_costatus_menu').menu('enableItem', '#edit');
    $('#dv_costatus_menu').menu('enableItem', '#del');
    $("#lbtn_insrec").linkbutton("enable");
    $("#lbtn_bthins").linkbutton("enable");
    $("#lbtn_bthupd").linkbutton("enable");
    $("#lbtn_bthdel").linkbutton("enable");
    $("#lbtn_certab").linkbutton("enable");
    $("#lbtn_delrow").linkbutton("enable");

    init_tab_fee_list_of_old_rp(od_seq);
    init_tab_fee_list_of_new_rp();

    $('#window_of_change_order').window({
        title:'创建改单计划',
        onClose: function () {
            init_change_order_tab();
            init_tab_fee_list_of_old_rp();
            init_tab_fee_list_of_new_rp();
        }
    }).window('open');

}

function init_tab_fee_list_of_old_rp(od_seq) {

    $("#tab_fee_list_of_old_rp").datagrid({
        url: '../Ashx/order.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_order_fee',
            od_seq: od_seq    
        },
        singleSelect: false,
        toolbar:'#tab_fee_old_list_bar',
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true }
        ]],
        columns: [[
              {
                  field: 'rec_or_pay', title: '收/付', width: 50,
                  formatter: function (value, row, index) {
                      if (value == -1) {
                          return '应付';
                      } else {
                          return '应收';
                      }
                     
                  },
                  styler: function (value, row, index) {
                      if (value == -1) {
                          return 'background-color:Green;color:#FFF;';
                      } else {
                          return 'background-color:Red;color:#FFF;';
                      }
                  }
              }
            , { field: 'fee_status_desc', title: '费用状态', width: 60, }
            , {
                field: 'fee_change_lock_flag', title: '改单标记', width: 55,
                formatter: function (value, row, index) {
                    if (Number(value) == 1) {
                        return '<i class="icon-ok-tl" style="display:block; height:16px;width:16px; margin:auto;"></i>';
                    } else {
                        return '';
                    }
                }
            }
            , { field: 'fee_cu_desc', title: '结算单位', width: 240, }
            , { field: 'fee_invoice_typ_desc', title: '票率', width: 90, }
            , { field: 'fee_item_typ_desc', title: '费项', width: 120, }
            , {
                field: 'fee_number', title: '数量', width: 90,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , { field: 'fee_unit_desc', title: '单位', width: 90, }
            , {
                field: 'fee_price', title: '单价', width: 90,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , { field: 'fee_currency_desc', title: '币种', width: 60, }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 110,
                formatter: function (value, row, index) {
                    return (Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number)).toFixed(4);
                }
            }, {
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return (Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number) * Number(row.fee_currency_rate == undefined ? 0 : row.fee_currency_rate)).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (row.rec_or_pay == -1) return 'background-color:#b3e7c7;color:#000';
                    if (row.rec_or_pay == 1) return 'background-color:#eecfcb;color:#000';
                }
            }
            , { field: 'fee_bak', title: '备注', width: 260, }
        ]],
        onRowContextMenu: function (e, rowIndex, rowData) {
            e.preventDefault();//阻止浏览器捕获右键事件

            //if (rowData.rec_or_pay == 1) {
            //    $('#dv_costatus_menu').menu('disableItem', '#add');
            //} else {
            //    $('#dv_costatus_menu').menu('enableItem', '#add');
            //}

            pub_tab_old_rp_rowData = [];
            pub_tab_old_rp_rowData.push(rowData);
            $('#dv_costatus_menu').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}

function get_rate(od_seq) {
    post('../Ashx/exchange_rate.ashx', {
        rnd: Math.random(),
        action: 'get_month_exchange_rate_by_od_seq',
        od_seq: od_seq
    }, function (data) {
        cur_ref_month_exchange_list = data.rows;
    }, true);
}

//费用明细查询
function refresh_change_order_list() {
    tab_params.like_str = $.trim($('#search_like_str').val());
    tab_params.od_status_id = $.trim($('#search_od_status').combobox('getValue'));
    tab_params.od_typ = $.trim($('#search_od_typ').combobox('getValue'));
    tab_params.od_beg_fee_dat = $.trim($('#search_od_beg_fee_dat').datebox('getValue'));
    tab_params.od_end_fee_dat = $.trim($('#search_od_end_fee_dat').datebox('getValue'));
    tab_params.od_bill_nos = $.trim($('#search_od_bill_nos').val());
    tab_params.od_cntr_nos = $.trim($('#search_od_cntr_nos').val());
  
    init_change_order_tab();
}
 //右击菜单操作
function menu_editfee(status) {
    //判断

    //改单标记
    if (pub_tab_old_rp_rowData[0].fee_change_lock_flag == 1) {
        $.messager.alert('错误', '该费项改单操作中,不可修改', 'error');
        return;
    }

    var old_rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    //操作修改和删除
    if (status!=1) {

        if (pub_tab_old_rp_rowData[0].fee_status==3) {
            $.messager.alert('错误', '已交账，费用类型为' + pub_tab_old_rp_rowData[0].fee_status_desc + '，不可改单', 'error');
            return;
        }

        if (pub_tab_old_rp_rowData[0].fee_status == 4) {
            $.messager.alert('错误', '已交账，费用类型为' + pub_tab_old_rp_rowData[0].fee_status_desc + '，不可改单', 'error');
            return;
        }

        if (pub_tab_old_rp_rowData[0].fee_status == 9) {
            $.messager.alert('错误', '已交账，费用类型为' + pub_tab_old_rp_rowData[0].fee_status_desc + '，不可改单', 'error');
            return;
        }

        var tf = false;
        //判断改单合法性
        $.each(old_rows, function (i, row) {

            if (row.fee_seq == pub_tab_old_rp_rowData[0].fee_seq && row.co_fee_status != 1) {
                tf = true;
                return false;
            }

        })

        if (tf) {
            $.messager.alert('错误', '该费项已存在删除或修改操作！', 'error');
            return;
        }

    } else {
        if (pub_tab_old_rp_rowData[0].rec_or_pay == 1) {
            $.messager.alert('错误', '请选择菜单栏应收新增', 'error');
            return;
        }
    }


    $.each(pub_tab_old_rp_rowData, function (i,row) {
        old_rows.push({
            co_fee_status: status,
            fee_seq: row.fee_seq,
            rec_or_pay: row.rec_or_pay,
            fee_cu_id: row.fee_cu_id,
            fee_cu_desc: row.fee_cu_desc,
            fee_item_typ: row.fee_item_typ,
            fee_price: row.fee_price,
            fee_number: row.fee_number,
            fee_unit: row.fee_unit,
            fee_currency_rate: row.fee_currency_rate,// 汇率
            fee_currency_id: row.fee_currency_id,
            fee_bak: '',
            fee_invoice_typ: row.fee_invoice_typ,
            fee_invoice_typ_desc:row.fee_invoice_typ_desc,
            fee_item_typ_desc: row.fee_item_typ_desc,
            fee_unit_desc: row.fee_unit_desc,
            fee_currency_desc: row.fee_currency_desc
        });
    })

    var new_row_1 = $.extend(true, [], old_rows);
    var new_row_2 = $.extend(true, [], old_rows);

    //重新绑定数据 
    old_tab_row = [];
    old_tab_row.push(new_row_1);
    $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: new_row_2.length, rows: new_row_2 });
        
}

function init_tab_fee_list_of_new_rp() {
    $("#tab_fee_list_of_new_rp").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        tootal:'#tab_fee_new_list_bar',
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: false,//显示的列
        frozenColumns: [[
            
        ]],
        columns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true }
            , {
                field: 'co_fee_status', title: '改单状态', sortable: true, width: 60,align:'center',
                formatter: function (value, row, index) {
                    switch (value) {
                        case 1: return "<div class='status_add'>新增</div>";
                        case 2: return "<div class='status_upd'>更新</div>";
                        case 3: return "<div class='status_del'>删除</div>";
                    }
                },
            },
             {
                 field: 'rec_or_pay', title: '收/付', width: 50,
                 formatter: function (value, row, index) {
                     if (value == -1) {
                         return '应付';
                     }
                     return '应收';
                 },
                 styler: function (value, row, index) {
                     if (value == -1) {
                         return 'background-color:Green;color:#FFF;';
                     }
                     return 'background-color:Red;color:#FFF;';
                 }
             },
            {
                field: 'fee_cu_desc', title: '结算单位', width: 210,
                editor: {
                    type: 'combogrid',
                    options: {
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
                                var display = $(this).combogrid('panel').parent().css('display');
                                if (display != 'none') {
                                    //取得选中行  
                                    var selected = $(this).combogrid('grid').datagrid('getSelected');
                                    if (selected) {
                                        //取得选中行的rowIndex  
                                        var index = $(this).combogrid('grid').datagrid('getRowIndex', selected);
                                        //向上移动到第一行为止  
                                        if (index > 0) {
                                            $(this).combogrid('grid').datagrid('selectRow', index - 1);
                                        }
                                    } else {
                                        var rows = $(this).combogrid('grid').datagrid('getRows');
                                        $(this).combogrid('grid').datagrid('selectRow', rows.length - 1);
                                    }
                                }
                            },
                            down: function () {             //【向下键】押下处理  
                                var display = $(this).combogrid('panel').parent().css('display');
                                if (display != 'none') {
                                    //取得选中行  
                                    var selected = $(this).combogrid('grid').datagrid('getSelected');
                                    if (selected) {
                                        //取得选中行的rowIndex  
                                        var index = $(this).combogrid('grid').datagrid('getRowIndex', selected);
                                        //向下移动到当页最后一行为止  
                                        if (index < $(this).combogrid('grid').datagrid('getData').rows.length - 1) {
                                            $(this).combogrid('grid').datagrid('selectRow', index + 1);
                                        }
                                    } else {
                                        $(this).combogrid('grid').datagrid('selectRow', 0);
                                    }
                                }
                            },
                            enter: function () {             //【回车键】押下处理  
                                //设置【性别】文本框的内容为选中行的的性别字段内容  
                                var display = $(this).combogrid('panel').parent().css('display');
                                if (display != 'none') {


                                    //选中后让下拉表格消失  
                                    $(this).combogrid('hidePanel');
                                }
                            },
                            query: function (keyword) {     //【动态搜索】处理  
                                //设置查询参数  
                                var queryParams = $(this).combogrid("grid").datagrid('options').queryParams;
                                queryParams.like_str = keyword;
                                queryParams.rnd = Math.random();
                                queryParams.action = 'get_custom_by_like_str_for_combogrid';
                                $(this).combogrid("grid").datagrid('options').queryParams = queryParams;
                                $(this).combogrid("grid").datagrid("clearSelections");
                                $(this).combogrid("grid").datagrid("reload");
                                //重新加载  
                                $(this).combogrid("setText", keyword);
                                tmp_combogrid_cu_id = undefined;
                                tmp_combogrid_cu_desc = keyword;

                            },
                        },
                        onSelect: function (index, item) {              //选中处理   
                            tmp_combogrid_cu_id = item.cu_id;
                            tmp_combogrid_cu_desc = item.cu_name;
                            var ed = $('#tab_fee_list_of_new_rp').datagrid('getEditor', { index: cur_edit_fee_rowindex, field: 'fee_cu_desc' });
                            $(ed.target).combogrid('setText', item.cu_name);
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'fee_invoice_typ', title: '票率', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    return row.fee_invoice_typ_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'in_id',
                        textField: 'in_name',
                        data: basesetting.invoice_list,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'fee_item_typ', title: '费项', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    return row.fee_item_typ_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'fee_id',
                        textField: 'fee_show_desc',
                        data: basesetting.fee_item_list,
                        filter: filterCombo,
                        panelWidth: 300,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 70,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 0 },
                },
            }
            , {
                field: 'fee_unit', title: '单位', sortable: true, width: 70,
                formatter: function (value, row, index) {
                    return row.fee_unit_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'u_id',
                        textField: 'u_desc',
                        data: basesetting.unit_list,
                        filter: filterCombo,
                        panelWidth: 100,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_price', title: '单价', sortable: true, width: 70,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'fee_currency_id', title: '币种', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    return row.fee_currency_desc;
                },
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'cr_id',
                        textField: 'cr_name',
                        data: basesetting.currency_list,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 80,
                formatter: function (value, row, index) {
                    return (Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number)).toFixed(4);
                }
            }
           
        ]],
        onAfterEdit: function (index, row, changes) {
            cur_edit_fee_rowindex = undefined;
            //需要进行数据替换  
            //简单的说就是 要进行替换  
            //客户名称
            var has = false;
            row.fee_cu_desc = tmp_combogrid_cu_desc;
            row.fee_cu_id = tmp_combogrid_cu_id;
            tmp_combogrid_cu_id = undefined;
            tmp_combogrid_cu_desc = undefined;


            has = false;
            //票率
            $.each(basesetting.invoice_list, function (i, item) {
                if (row.fee_invoice_typ == item.in_id) {
                    has = true;
                    row.fee_invoice_typ_desc = item.in_name;
                }
            });
            if (!has) row.fee_invoice_typ_desc = row.fee_invoice_typ;
            has = false;

            //费项目
            $.each(basesetting.fee_item_list, function (i, item) {
                if (item.fee_id == row.fee_item_typ) {
                    has = true;
                    row.fee_item_typ_desc = item.fee_cn;
                }
            });
            if (!has) row.fee_item_typ_desc = row.fee_item_typ;
            has = false;
            //费目
            $.each(basesetting.unit_list, function (i, item) {
                if (item.u_id == row.fee_unit) {
                    has = true;
                    row.fee_unit_desc = item.u_desc;
                }
            });
            if (!has) row.fee_unit_desc = row.fee_unit;
            has = false;
            //币种
            $.each(basesetting.currency_list, function (i, item) {
                if (row.fee_currency_id == item.cr_id) {
                    has = true;
                    row.fee_currency_desc = item.cr_name;
                }
            });
            if (!has) row.fee_currency_desc = row.fee_currency_id;
            has = false;
            //汇率 
            $.each(cur_ref_month_exchange_list, function (i, item) {
                if (item.er_cr_id == row.fee_currency_id) {
                    has = true;
                    row.fee_currency_rate = item.er_cr_rate;
                }
            });
            if (!has) row.fee_currency_rate = 1;

            $("#tab_fee_list_of_new_rp").datagrid('updateRow', {
                index: index,
                row: row
            });

            //每次保存完毕，都要对 汇总表进行更新 

            //重新计算 汇总 

            //refresh_fee_group_tab();



        },
        onBeforeEdit: function (index, row) {
            if (cur_edit_fee_rowindex != index && cur_edit_fee_rowindex != undefined) {
                $('#tab_fee_list_of_new_rp').datagrid('endEdit', cur_edit_fee_rowindex);
                cur_edit_fee_rowindex = index;
            }


        },
        onClickRow: function (index, row) {

            if (cur_edit_fee_rowindex != undefined &&
                cur_edit_fee_rowindex != index) {
                $('.datagrid-row').unbind('click');
                $('#tab_fee_list_of_new_rp').datagrid('endEdit', cur_edit_fee_rowindex);
            }
            if (cur_edit_fee_rowindex == undefined) {
               
                if (pub_co_seq != undefined && pub_co_status > 0) {
                    $('.datagrid-row').unbind('click');
                    $('#tab_fee_list_of_new_rp').datagrid('endEdit', index);
                    return;
                }

                cur_edit_fee_rowindex = index;
                tmp_combogrid_cu_id = row.fee_cu_id;
                tmp_combogrid_cu_desc = row.fee_cu_desc;
                $('#tab_fee_list_of_new_rp').datagrid('beginEdit', cur_edit_fee_rowindex);

                $('.datagrid-row-editing').unbind('click').bind('click', function () {
                    event.stopPropagation();
                });
                $(document).on('click', ':not(.datagrid-row)', function () {
                    if (cur_edit_fee_rowindex != undefined) {
                        $('.datagrid-row').unbind('click');
                        $('#tab_fee_list_of_new_rp').datagrid('endEdit', cur_edit_fee_rowindex);
                    }
                });    
            }
        } ,
    });
}


//删除修改的费用行
function delete_table_row() {
    //关闭编辑 
    if (cur_edit_fee_rowindex != undefined) {
        $("#tab_fee_list_of_new_rp").datagrid("endEdit", cur_edit_fee_rowindex);
        cur_edit_fee_rowindex = undefined;
    }
    var select_rows = $("#tab_fee_list_of_new_rp").datagrid('getChecked');
    if (select_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要操作的行', 'error');
        return;
    }

    var select_index = $('#tab_fee_list_of_new_rp').datagrid('getRowIndex', $('#tab_fee_list_of_new_rp').datagrid('getSelected'));
    $("#tab_fee_list_of_new_rp").datagrid("deleteRow", select_index);

    //删除原费用
    //$.each(old_tab_row[0], function (i,row) {
    //    if (row.fee_price == select_rows[0].fee_price) {

    //    }
    //})

}
 
//判断费用合理性
function judge_fee_reasonable(rows) {
    var tf=false;
    $.each(rows, function (i, row) {

        //判断改单标记
        if (row.fee_change_lock_flag == 1) {
            $.messager.alert('错误', '选中的费用中包含改单的费项，不可操作', 'error');
            tf=true;
            return false;
        }

        //判断费用类型
        if (row.fee_status==3) {
            $.messager.alert('错误', '选中的费用中包含已交帐的费项，状态为' + row.fee_status_desc + '，不可操作', 'error');
            tf=true;
            return false;
        }
        if (row.fee_status == 4) {
            $.messager.alert('错误', '选中的费用中包含已交帐的费项，状态为' + row.fee_status_desc + '，不可操作', 'error');
            tf=true;
            return false;
        }
        if (row.fee_status == 9) {
            $.messager.alert('错误', '选中的费用中包含已交帐的费项，状态为' + row.fee_status_desc + '，不可操作', 'error');
            tf=true;
            return false;
        }

        //判断改单操作

    })

    return tf;
}

//新增应收
function insert_new_rec() {
    if (cur_edit_fee_rowindex != undefined) {
        $("#tab_fee_list_of_new_rp").datagrid("endEdit", cur_edit_fee_rowindex);
        cur_edit_fee_rowindex = undefined;
    }

    //这里币种 不一定是 4 
    var t_currency_id = 4;
    var t_currency_symbol = '';

    $.each(basesetting.currency_list, function (ci, crow) {
        if (crow.cr_name == '人民币') {
            t_currency_id = crow.cr_id;
            t_currency_symbol = crow.cr_symbol;
        }
    });

    var old_rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    old_rows.push({
        co_fee_status: 1,
        fee_seq: '',
        rec_or_pay: 1,
        fee_cu_id: undefined,
        fee_cu_desc: '',
        fee_item_typ: '',
        fee_price: 0,
        fee_number: 0,
        fee_unit: '',
        fee_currency_rate: 1,// 汇率
        fee_currency_id: t_currency_id, //??
        fee_bak: '',
        fee_invoice_typ: '',
        fee_invoice_typ_desc: '',
        fee_item_typ_desc: '',
        fee_unit_desc: '',
        fee_currency_desc: '人民币',

    });

    
    $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: old_rows.length, rows: old_rows });

}
//新增应付
function insert_new_pay() {
    if (cur_edit_fee_rowindex != undefined) {
        $("#tab_fee_list_of_new_rp").datagrid("endEdit", cur_edit_fee_rowindex);
        cur_edit_fee_rowindex = undefined;
    }
    //这里币种 不一定是 4 
    var t_currency_id = 4;
    var t_currency_symbol = '';

    $.each(basesetting.currency_list, function (ci, crow) {
        if (crow.cr_name == '人民币') {
            t_currency_id = crow.cr_id;
            t_currency_symbol = crow.cr_symbol;
        }
    });

    var old_rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    old_rows.push({
        co_fee_status: 1,
        fee_seq: '',
        rec_or_pay: -1,
        fee_cu_id: undefined,
        fee_cu_desc: '',
        fee_item_typ: '',
        fee_price: 0,
        fee_number: 0,
        fee_unit: '',
        fee_currency_rate: 1,// 汇率
        fee_currency_id: t_currency_id, //??
        fee_bak: '',
        fee_invoice_typ: '',
        fee_invoice_typ_desc: '',
        fee_item_typ_desc: '',
        fee_unit_desc: '',
        fee_currency_desc: '人民币',

    }); 
    $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: old_rows.length, rows: old_rows });

}

 

//批量新增费用
function batch_insert_table_new() {
    //判断是否选中行
    var select_rows = $("#tab_fee_list_of_old_rp").datagrid('getChecked');
    if (select_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要操作的行', 'error');
        return;
    }
    var tf = false;
    $.each(select_rows, function (i, row) {
        if (row.rec_or_pay==1) {
            tf = true;
            return false;
        }
    })

    if (tf) {
        $.messager.alert('错误提示', '错误: 选中的行包含应收费项，无法拷贝新增', 'error');
        return;
    } else {

        //获取已修改数据行
        var tab_rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

        $.each(select_rows, function (i, row) {
            tab_rows.push({
                co_fee_status: 1,
                fee_seq: row.fee_seq,
                rec_or_pay: row.rec_or_pay,
                fee_cu_id: row.fee_cu_id,
                fee_cu_desc: row.fee_cu_desc,
                fee_item_typ: row.fee_item_typ,
                fee_price: row.fee_price,
                fee_number: row.fee_number,
                fee_unit: row.fee_unit,
                fee_currency_rate: row.fee_currency_rate,// 汇率
                fee_currency_id: row.fee_currency_id,
                fee_bak: '',
                fee_invoice_typ: row.fee_invoice_typ,
                fee_invoice_typ_desc: row.fee_invoice_typ_desc,
                fee_item_typ_desc: row.fee_item_typ_desc,
                fee_unit_desc: row.fee_unit_desc,
                fee_currency_desc: row.fee_currency_desc
            })
        });

        var new_row_1 = $.extend(true, [], tab_rows);
        var new_row_2 = $.extend(true, [], tab_rows);

        old_tab_row = [];
        old_tab_row.push(new_row_1);
        $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: new_row_2.length, rows: new_row_2 });


    }

}

//批量修改费用
function batch_update_table_new() {
    //判断是否选中行
    var select_rows = $("#tab_fee_list_of_old_rp").datagrid('getChecked');
    if (select_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要修改的行', 'error');
        return;
    }

    //判断合法性
    if (judge_fee_reasonable(select_rows)) {
        return;
    }

    //获取已修改数据行
    var tab_rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    $.each(select_rows, function (i, row) {
        tab_rows.push({
            co_fee_status: 2,
            fee_seq: row.fee_seq,
            rec_or_pay: row.rec_or_pay,
            fee_cu_id: row.fee_cu_id,
            fee_cu_desc: row.fee_cu_desc,
            fee_item_typ: row.fee_item_typ,
            fee_price: row.fee_price,
            fee_number: row.fee_number,
            fee_unit: row.fee_unit,
            fee_currency_rate: row.fee_currency_rate,// 汇率
            fee_currency_id: row.fee_currency_id,
            fee_bak: '',
            fee_invoice_typ: row.fee_invoice_typ,
            fee_invoice_typ_desc: row.fee_invoice_typ_desc,
            fee_item_typ_desc: row.fee_item_typ_desc,
            fee_unit_desc: row.fee_unit_desc,
            fee_currency_desc: row.fee_currency_desc
        })
    });

    var new_row_1 = $.extend(true, [], tab_rows);
    var new_row_2 = $.extend(true, [], tab_rows);

    old_tab_row = [];
    old_tab_row.push(new_row_1);
    $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: new_row_2.length, rows: new_row_2 });

}

//批量删除费用
function batch_delete_table_new() {
    //判断是否选中行
    var select_rows = $("#tab_fee_list_of_old_rp").datagrid('getChecked');
    if (select_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要删除的行', 'error');
        return;
    }

    //判断合法性
    if (judge_fee_reasonable(select_rows)) {
        return;
    } 

    //获取已修改数据行
    var tab_rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    $.each(select_rows, function (i, row) {
        tab_rows.push({
            co_fee_status: 3,
            fee_seq: row.fee_seq,
            rec_or_pay: row.rec_or_pay,
            fee_cu_id: row.fee_cu_id,
            fee_cu_desc: row.fee_cu_desc,
            fee_item_typ: row.fee_item_typ,
            fee_price: row.fee_price,
            fee_number: row.fee_number,
            fee_unit: row.fee_unit,
            fee_currency_rate: row.fee_currency_rate,// 汇率
            fee_currency_id: row.fee_currency_id,
            fee_bak: '',
            fee_invoice_typ: row.fee_invoice_typ,
            fee_invoice_typ_desc: row.fee_invoice_typ_desc,
            fee_item_typ_desc: row.fee_item_typ_desc,
            fee_unit_desc: row.fee_unit_desc,
            fee_currency_desc: row.fee_currency_desc
        })
    });

    var new_row_1 = $.extend(true, [], tab_rows);
    var new_row_2 = $.extend(true, [], tab_rows);

    old_tab_row = [];
    old_tab_row.push(new_row_1);
    $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: new_row_2.length, rows: new_row_2 });

}

//清空数据
function clear_table_new() {
    old_tab_row = [];
    $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: 0, rows: [] });
}

//创建计划
function begin_create_changeorder_plan() {
    //待修改业务前后费用
    var co_bak = $('#wds_co_bak').val();
    var old_fee_data = old_tab_row[0];
    var new_fee_data = $("#tab_fee_list_of_new_rp").datagrid('getData');
    if (new_fee_data.rows.length == 0) {
        $.messager.alert('错误', '错误: 请先选择费用进行更改', 'error');
        return;
    }
    var co_old_rec = 0;
    var co_old_pay = 0;
    $.each(old_fee_data, function (i, row) {
        if (row.rec_or_pay == 1) {
            switch (row.co_fee_status) {
                case 1: co_old_rec += 0; break;
                case 2: co_old_rec += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number); break;
                case 3: co_old_rec += 0; break;
            }
        } else {
            switch (row.co_fee_status) {
                case 1: co_old_pay += 0; break;
                case 2: co_old_pay += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number); break;
                case 3: co_old_pay += 0; break;
            }
        }
    })


    var co_new_rec = 0;
    var co_new_pay = 0;

    $.each(new_fee_data.rows, function (i, row) {
        if (row.rec_or_pay == 1) {
            switch (row.co_fee_status) {
                case 1: co_new_rec += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number); break;
                case 2: co_new_rec += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number); break;
                case 3: co_new_rec += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number) * (-1); break;
            }
        } else {
            switch (row.co_fee_status) {
                case 1: co_new_pay += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number); break;
                case 2: co_new_pay += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number); break;
                case 3: co_new_pay += Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number) * (-1); break;
            }
        }
    })

    var ce_rec = Number(co_new_rec) - Number(co_old_rec);
    var ce_pay = Number(co_new_pay) - Number(co_old_pay);

    var co_rec = Number(ce_rec) + Number(pub_rec_total_amount);
    var co_pay = Number(ce_pay) + Number(pub_pay_total_amount);
    //pub_profit_total_amount =

    post('../Ashx/change_order.ashx', {
        rnd: Math.random(),
        action: 'create_changeorder_plan',
        o_co_seq:pub_co_seq,
        od_no: pub_od_no,
        od_seq:pub_od_seq,
        old_fee_data: JSON.stringify(old_fee_data),
        new_fee_data: JSON.stringify(new_fee_data),
        co_old_rec: pub_rec_total_amount.toFixed(2),
        co_old_pay: pub_pay_total_amount.toFixed(2),
        co_new_rec: co_rec.toFixed(2),
        co_new_pay: co_pay.toFixed(2),
        co_bak: co_bak

    }, function (data) {
        if (data.result > 0) {
            $.messager.alert('成功提示', '提示: 保存改单计划成功', 'error');
            init_changeorder_plan_tab();
        }
    }, true);

}

//初始化 改单计划列表
function init_changeorder_plan_tab() {
    $("#tab_changeorder_plan").datagrid({
        url: '../Ashx/change_order.ashx',
        queryParams: cop_params,
        method: 'post',
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [30, 60, 120],
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        toolbar:'#tab_cop_list_bar',
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[//显示的列
                { title: '', field: 'fee_seq', width: 40, checkbox: true }
                , {
                    field: 'co_status', title: '计划状态', width: 60,
                    formatter: function (value, row, index) {
                        return row.co_status_desc;
                    },
                    styler: function (value, row, index) {
                        if (row.co_status == 1) {
                            return 'background-color:#ffccb1;color:#000;';
                        } else if (row.co_status == 2) {
                            return 'background-color:#f9752e;color:#FFF;';
                        } else {
                            return 'background-color:#02e251;color:#000;';
                        }
                    }
                }
                , {
                    field: 'amc_status', title: '审核状态', width: 60,
                    formatter: function (value, row, index) {
                        return row.amc_status_desc;
                    },

                }
                , { field: 'co_no', title: '编号', width: 80, }
                , { field: 'co_title', title: '计划标题', width: 300, }
                , {
                    field: 'co_rec_old', title: '修改前（应收）', sortable: true, width: 100,
                    formatter: function (value, row, index) {
                        return Number(value).toFixed(2);
                    },
                }
                , {
                    field: 'co_rec_new', title: '修改后（应收）', sortable: true, width: 100,
                    formatter: function (value, row, index) {
                        return Number(value).toFixed(2);
                    },
                }
                , {
                    field: 'co_pay_old', title: '修改前（应付）', sortable: true, width: 100,
                    formatter: function (value, row, index) {
                        return Number(value).toFixed(2);
                    },
                }
                , {
                    field: 'co_pay_new', title: '修改后（应付）', sortable: true, width: 100,
                    formatter: function (value, row, index) {
                        return Number(value).toFixed(2);
                    },
                }
                , { field: 'co_bak', title: '改单备注', width: 250, }
                , { field: 'co_create_name', title: '创建人', width: 50, }
                , {
                    field: 'co_create_date', title: '创建时间', width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }              
        ]],
        onDblClickRow: function (index, row) {

            //禁用按钮
            if (row.amc_status > 0) {
                $('#dv_costatus_menu').menu('disableItem', '#add');
                $('#dv_costatus_menu').menu('disableItem', '#edit');
                $('#dv_costatus_menu').menu('disableItem', '#del');
                $("#lbtn_insrec").linkbutton("disable");
                $("#lbtn_bthins").linkbutton("disable");
                $("#lbtn_bthupd").linkbutton("disable");
                $("#lbtn_bthdel").linkbutton("disable");
                $("#lbtn_certab").linkbutton("disable");
                $("#lbtn_delrow").linkbutton("disable");
            } else {
                $('#dv_costatus_menu').menu('enableItem', '#add');
                $('#dv_costatus_menu').menu('enableItem', '#edit');
                $('#dv_costatus_menu').menu('enableItem', '#del');
                $("#lbtn_insrec").linkbutton("enable");
                $("#lbtn_bthins").linkbutton("enable");
                $("#lbtn_bthupd").linkbutton("enable");
                $("#lbtn_bthdel").linkbutton("enable");
                $("#lbtn_certab").linkbutton("enable");
                $("#lbtn_delrow").linkbutton("enable");
            }

            cur_edit_fee_rowindex = undefined;
            pub_co_status = row.co_status;
            pub_co_seq = row.co_seq;
            bind_return_windows_plan_details(row);

            $('#window_of_change_order').window({
                title: '改单计划详情--' + '【' + row.co_title + '】',
                onClose: function () {

                }
            }).window('open');

            //退回,未提交审核可编辑计划
            //if (row.amc_status==-1 || row.amc_status==0) {
            //    pub_co_seq = row.co_seq;
            //    bind_return_windows_plan_details(row);

            //    $('#window_of_change_order').window({
            //        title: '改单计划详情--' + '【' + row.co_title + '】',
            //        onClose: function () {

            //        }
            //    }).window('open');



            //} else { //改单明细
            //    bind_windows_plan_details(row);

            //    $('#window_of_change_order_details').window({
            //        title: '改单计划详情--' + '【' + row.co_title + '】',
            //        onClose: function () {

            //        }
            //    }).window('open');
            //}


        },
        onClickCell: function (rowIndex, field, value) {

        },

    });
}

//改单计划查询
function refresh_changeorder_plan_list() {
    cop_params.like_str = $('#search_cop_like_str').val();
    cop_params.co_status = $('#search_cop_status').combobox('getValue');
    cop_params.amc_status = $('#search_cop_amc_status').combobox('getValue');
    cop_params.create_id = $('#search_cop_createid').combobox('getValue');
    cop_params.beg_date = $('#search_cop_beg_dat').datebox('getValue');
    cop_params.end_date = $('#search_cop_end_dat').datebox('getValue');
    init_changeorder_plan_tab();
}


//绑定退回计划详情
function bind_return_windows_plan_details(pl_row) {
    

    //初始化
    init_tab_fee_list_of_new_rp();
    init_tab_fee_group();

    //绑定业务所有费用
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'get_order_fee',
        od_seq: pl_row.od_seq
    }, function (data) {

        if (data.total > 0) {

            $("#tab_fee_list_of_old_rp").datagrid('loadData', { total: data.total, rows: data.rows });

            var row = data.rows[0];
            //绑定费用基本信息
            $("#sp_od_status").text(row.od_status_desc);
            $("#sp_od_no").text(row.od_no);
            $("#sp_od_typ").text(row.od_typ_desc);
            $("#sp_rec").text(row.rec_total_amount_desc);
            $("#sp_pay").text(row.pay_total_amount_desc);
            $("#sp_total").text(row.profit_total_amount_desc);

            pub_rec_total_amount = row.rec_total_amount;
            pub_pay_total_amount = row.pay_total_amount;
            pub_profit_total_amount = row.profit_total_amount;

            var fee_group_arr = [];
            fee_group_arr.push({
                cz_status: 1,
                rec_fee: pub_rec_total_amount,
                pay_fee: pub_pay_total_amount,
                pro_fee: pub_profit_total_amount
            })

            var s = pl_row.co_rec_new - pl_row.co_pay_new;
            fee_group_arr.push({
                cz_status: 2,
                rec_fee: pl_row.co_rec_new,
                pay_fee: pl_row.co_pay_new,
                pro_fee: pl_row.co_rec_new - pl_row.co_pay_new
            })

            //费用汇总
            $("#lay_east").parent().css('display', '');
            $("#tab_fee_group_list").datagrid('loadData', { total: fee_group_arr.length, rows: fee_group_arr });

        }

    })

 
    //绑定修改后的费用
    post('../Ashx/change_order.ashx', {
        rnd: Math.random(),
        action: 'get_changorder_plan_all_fee_record',
        co_seq: pl_row.co_seq
    }, function (data) {
        if (data.total > 0 ) {
           
            $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: data.total, rows: data.rows });

            old_tab_row = [];
            old_tab_row.push(data.rows);

        } else {
            $.messager.alert('错误', '获取数据失败！', 'error');
        }
    }, true);

   


}

//绑定计划详情
function bind_windows_plan_details(row) {
    
    $("#sp_pl_create_nam").text(row.co_create_name);
    $("#sp_pl_create_date").text(dateformat(row.co_create_date, true));
    $("#sp_pl_status_desc").text(row.co_status_desc);
    $("#sp_pl_amc_status_desc").text(row.amc_status_desc);
    $("#taa_pl_bak").val(row.co_bak);

    $("#sp_pl_total_old").text((Number(row.co_rec_old) + Number(row.co_pay_old)).toFixed(2));
    $("#sp_pl_total_new").text((Number(row.co_rec_new) + Number(row.co_pay_new)).toFixed(2));

    $("#sp_rec_old").text(row.co_rec_old.toFixed(2));
    $("#sp_rec_new").text(row.co_rec_new.toFixed(2));
    $("#sp_pay_old").text(row.co_pay_old.toFixed(2));
    $("#sp_pay_new").text(row.co_pay_new.toFixed(2));

    var rec_dif = Number(row.co_rec_new) - Number(row.co_rec_old);
    var pay_dif = Number(row.co_pay_new) - Number(row.co_pay_old);
    $("#sp_rec_dif").text(rec_dif > 0 ? '增加' + rec_dif.toFixed(2) : (rec_dif == 0 ? '0.00' : '减少' + (rec_dif*(-1)).toFixed(2)));
    $("#sp_pay_dif").text(pay_dif > 0 ? '增加' + pay_dif.toFixed(2) : (pay_dif == 0 ? '0.00' : '减少' + (pay_dif*(-1)).toFixed(2)));


    var parmas = {
        rnd: Math.random(),
        action: 'get_changorder_plan_fee_record',
        co_seq: row.co_seq,
        rec_or_pay: 1,
    }
    init_tab_plan_fee_list_of_rp($("#tab_fee_list_of_rec"), parmas);
    parmas.rec_or_pay = -1;
    init_tab_plan_fee_list_of_rp($("#tab_fee_list_of_pay"), parmas);
}

//费用
function init_tab_fee_group() {

    $("#tab_fee_group_list").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[//显示的列
                {
                    field: 'cz_status', title: '状态', width: 60,
                    formatter: function (value, row, index) {
                        if (Number(value) == 1) return '改单前：';
                        if (Number(value) == 2) return '改单后：';
                        if (Number(value) == 3) return '本次改单：';
                    },
                    styler: function (value, row, index) {
                        if (Number(value) == 1) return 'background-color:Red;color:#FFF;';
                        if (Number(value) == 2) return 'background-color:Green;color:#FFF;';
                        if (Number(value) == 3) return 'background-color:Blue;color:#FFF;';
                    }
                }
                , {
                    field: 'rec_fee', title: '应收', sortable: true, width: 100,
                    formatter: function (value, row, index) {
                        if (row.cz_status == 0) return value
                        else return Number(value).toFixed(2);
                    }
                }
             , {
                 field: 'pay_fee', title: '应付', sortable: true, width: 100,
                 formatter: function (value, row, index) {
                     if (row.cz_status == 0) return value
                     else return Number(value).toFixed(2);
                 }
             }
            , {
                field: 'pro_fee', title: '盈利', sortable: true, width: 100,
                formatter: function (value, row, index) {
                    if (row.cz_status == 0) return value
                    else return Number(value).toFixed(2);
                }
            }
             
        ]],
        onLoadSuccess: function (data) {
           
            var fir_rec = 0;
            var fir_pay = 0;

            var sec_rec = 0;
            var sec_pay = 0;

            for (var i = 0; i < data.rows.length; i++) {
                 fir_rec = data.rows[0].rec_fee;
                 fir_pay = data.rows[0].pay_fee;

                 sec_rec = data.rows[1].rec_fee;
                 sec_pay = data.rows[1].pay_fee;
                 break;
            }

            var rec_upd = sec_rec - fir_rec;
            var pay_upd = sec_pay - fir_pay;

            $('#tab_fee_group_list').datagrid('reloadFooter', [
                {
                    cz_status: 3,
                    rec_fee: rec_upd.toFixed(2),
                    pay_fee: pay_upd.toFixed(2),
                    pro_fee: ''
                }
            ]);
        },
    });


   
}

//提交审核
function sure_post_apprvoal() {

    var selected_rows = $('#tab_changeorder_plan').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要进行审核的改单计划。', 'error');
        return;
    }

    if (selected_rows.length != 1) {
        $.messager.alert('错误提示', '错误: 单次只能提交一个审核。', 'error');
        return;
    }

    var _row = selected_rows[0];

    if (_row.amc_id != undefined && _row.amc_status > 0) {
        $.messager.alert('错误提示', '错误: 此计划正在审核或审核已通过，无需再次审核。', 'error');
        return;
    }

    if (_row.amc_id != undefined) {
        $('#dlg_repost_cop_amc').dialog({
            title: '重新提交改单计划审核',
            iconCls: 'icon-lock',
            autoOpen: false,
            modal: true,
            width: 300,
            minheight: 50,
            buttons: [
            {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_repost_cop_amc').dialog('close');
                }
            },
            {
                text: '重新提交',
                iconCls: 'icon-ok',
                handler: function () {
                    post('../Ashx/approval_mgr.ashx', {
                        rnd: Math.random(),
                        action: 'repost_amc',
                        ap_context: $('#dlg_ap_context').val(),
                        amc_id: _row.amc_id
                    }, function (data) {
                        if (data.result == 1) {
                            $.messager.alert('提示', data.msg, 'info', function () {
                                $('#dlg_repost_cop_amc').dialog('close');
                            });
                        } else {
                            $.messager.alert('错误', data.msg, 'error');
                        }
                    }, true);
                }
            }]
        }).dialog('open');
    } else {
        post('../Ashx/approval_mgr.ashx', {
            rnd: Math.random(),
            action: 'get_start_schema_point',
            apt_id: 3,
        }, function (data) {
            var schema_point_list = data;//获取改单审核人

            $('#dlg_cop_schema_point').combobox({
                panelHeight: 'auto', hasDownArrow: true, valueField: 'guid',
                textField: 'aps_show',
                data: schema_point_list
            });
            $('#dlg_post_cop_amc').dialog({
                title: '提交改单计划审核',
                iconCls: 'icon-lock',
                autoOpen: false,
                modal: true,
                width: 370,
                minheight: 100,
                buttons: [
                    {
                        text: '取消',
                        iconCls: 'icon-cancel',
                        handler: function () {
                            $('#dlg_post_cop_amc').dialog('close');
                        }
                    }
                    , {
                        text: '确定',
                        iconCls: 'icon-ok',
                        handler: function () {

                            var guid = $('#dlg_cop_schema_point').combobox('getValue');
                            var has = false;
                            var ap_u_id = undefined;
                            var ap_aps_id = undefined;
                            var aps_order_by_id = undefined;

                            $.each(schema_point_list, function (i, item) {
                                if (guid == item.guid) {
                                    has = true;
                                    ap_u_id = item.u_id;
                                    aps_id = item.aps_id;
                                    aps_order_by_id = item.aps_order_by_id;
                                }
                            });

                            if (!has) {
                                $.messager.alert('错误提示', '错误: 请选择审核人再提交。', 'error');
                                return;
                            }
                            $('#dlg_post_cop_amc').dialog('close');

                            post('../Ashx/change_order.ashx', {
                                rnd: Math.random(),
                                action: 'post_changeorder_apprpval',
                                co_seq: _row.co_seq,
                                co_no: _row.co_no,
                                od_no:_row.od_no,
                                ap_u_id: ap_u_id,
                                aps_order_by_id: aps_order_by_id,
                                aps_id: aps_id

                            }, function (data) {
                                if (data.result == 1) {
                                    $.messager.alert('提示', data.msg, 'info');
                                    init_changeorder_plan_tab();
                                } else {
                                    $.messager.alert('错误提示', data.msg, 'error');
                                }
                            }, true);
                        }
                    }]
            }).dialog('open');
        }, true);

    }
}

//删除计划
function delete_cop_plan() {

    var selected_rows = $('#tab_changeorder_plan').datagrid('getChecked');
    if (selected_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要进行删除的改单计划。', 'error');
        return;
    }

    var _row = selected_rows[0];

    if (_row.co_status!=0) {
        $.messager.alert('错误提示', '错误: 请选择计划状态为未提交的改单计划。', 'error');
        return;
    }

    post('../Ashx/change_order.ashx', {
        rnd: Math.random(),
        action: 'delete_changeorder_plan',
        co_seq: _row.co_seq
    }, function (data) {
        if (data.result == 1) {
            $.messager.alert('提示', '提示，已成功删除改单计划', 'info');
            init_changeorder_plan_tab();
        } else {
            $.messager.alert('错误', data.msg, 'error');
        }
    }, true);
}

function init_tab_plan_fee_list_of_rp(target,parmas) {

    target.datagrid({
        url: '../Ashx/change_order.ashx',
        queryParams: parmas,
        method: 'post',
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true }
        ]],
        columns: [[
              {
                  field: 'rec_or_pay', title: '收/付', width: 70,
                  formatter: function (value, row, index) {
                      if (value == -1) {
                          return '应付';
                      }
                      return '应收';
                  },
                  styler: function (value, row, index) {
                      if (value == -1) {
                          return 'background-color:Green;color:#FFF;';
                      }
                      return 'background-color:Red;color:#FFF;';
                  }
              }
               , {
                   field: 'co_fee_status', title: '状态',  width: 80,align:'center',
                   formatter: function (value, row, index) {
                       if (value == 0) {
                           return "<div class='status_upd'>正常</div>";
                       } else if (value == 1) {
                           return "<div class='status_add'>新增</div>";
                       } else if (value == 2) {
                           return "<div class='status_upd'>修改</div>";
                       } else  {
                           return "<div class='status_del'>删除</div>";
                       }
                   }
               }
            , {
                field: 'fee_cu_desc', title: '结算单位', width: 240,
                styler: function (value, row, index) {
                    if (row.cuid_dif == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_invoice_typ_desc', title: '票率', width: 90,
                styler: function (value, row, index) {
                    if (row.invoice_dif == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_item_typ_desc', title: '费项', width: 120,
                styler: function (value, row, index) {
                    if (row.item_dif == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_number', title: '数量',  width: 90,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (row.number_dif == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_unit_desc', title: '单位', width: 90,
                styler: function (value, row, index) {
                    if (row.unit_dif == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_price', title: '单价',  width: 90,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (row.price_dif == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_currency_desc', title: '币种', width: 60,
                styler: function (value, row, index) {
                    if (row.curid_dif == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_currency_rate', title: '汇率', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(4);
                },
                styler: function (value, row, index) {
                    if (row.currate_dif == 1) {
                        return 'background-color:#41b2f3;color:#FFF;';
                    }
                    return '';
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 110,
                formatter: function (value, row, index) {
                    return (Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number)).toFixed(4);
                }
            },
            {
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return (Number(row.fee_price == undefined ? 0 : row.fee_price) * Number(row.fee_number == undefined ? 0 : row.fee_number) * Number(row.fee_currency_rate == undefined ? 0 : row.fee_currency_rate)).toFixed(2);
                },
                styler: function (value, row, index) {
                    if (row.rec_or_pay == -1) return 'background-color:#b3e7c7;color:#000';
                    if (row.rec_or_pay == 1) return 'background-color:#eecfcb;color:#000';
                }
            }
        ]],
    });
}


