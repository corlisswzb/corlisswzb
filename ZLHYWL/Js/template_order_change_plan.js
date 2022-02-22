  
var basesetting = undefined;
var cur_edit_fee_rowindex = undefined;
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

var cur_od_seq = undefined;
 
var tmp_combogrid_cu_id = undefined;
var tmp_combogrid_cu_desc = undefined;
/*汇率*/
var cur_ref_month_exchange_list = undefined;
var cur_order = undefined;

$(document).ready(function () {
    //对话框 导入集装箱
    $('#dlg_insert_pay').dialog({
        title: '请选择应付费用服务商和批次',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 250,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_insert_pay').dialog('close');
            }
        }]
    }).dialog('close');

    $('#dlg_post_cop_amc').dialog({
        title: '提交改单计划申请',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 250,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_post_cop_amc').dialog('close');
            }
        }]
    }).dialog('close');

    cur_od_seq = getQueryVariable('od_seq');
    get_basesetting();
});
//获取资料 
function get_order_details_collections() {
    get_rate(cur_od_seq);
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'get_order_single_full_collections',
        od_seq: cur_od_seq
    }, function (data) {
          cur_order = data; 
        var cur_od = cur_order.order_base_info_and_cargo_info[0];
        //$('#od_record_by_company_desc').html(od_base.od_record_by_company_desc);
        //$('#od_delegate_cu_desc').html(od_base.od_delegate_cu_desc);
        //$('#od_fee_dat').html(dateformat(od_base.od_fee_dat, true));
        //$('#od_typ_desc').html(od_base.od_typ_desc);
        //$('#od_cargo_typ_desc').html(od_base.od_cargo_typ_desc);
        //$('#od_no').html(od_base.od_no);
        //filenam = od_base.od_no + '费用清单';
        //$('#od_beg_place_desc').html(od_base.od_beg_place_desc);
        //$('#od_end_place_desc').html(od_base.od_end_place_desc);
        //$('#od_main_bill_no').html(od_base.od_main_bill_no);
        //$('#od_freight_desc').html(od_base.od_freight_desc);
        //$('#od_cntr_desc').html(od_base.od_cntr_desc);
        //$('#lose_explain').html(od_base.od_profit_and_loss_bak);
        //$('#sum_rmb_profit_2').html(od_base.profit_total_amount_desc + '&nbsp;&nbsp;折算人民币:' + od_base.profit_total_amount_of_base);
        //$('#gross_profit').html((100 * (od_base.profit_total_amount_of_base / od_base.rec_total_amount_of_base)).toFixed(2) + '%');
        $("#dlg_choise_service_sub_list").datagrid('loadData', data.order_service_sub_list);
        //load_order_rec_fee(data.order_rec_fee_list); 
        var order_fee_data = [];
         
        if (data.order_rec_fee_list.rows.length > 0) {
            $.each(data.order_rec_fee_list.rows, function (i, item) {
                order_fee_data.push(item);
            });
        }
        if (data.order_pay_fee_list.rows.length > 0) {
            $.each(data.order_pay_fee_list.rows, function (i, item) {
                order_fee_data.push(item);
            });
        }

        $('#rec_group_fee_desc').html('盈利:' +
            cur_od.profit_total_amount_desc + '&nbsp;&nbsp;折算人民币:' + cur_od.profit_total_amount_of_base +
            '&nbsp;&nbsp;&nbsp;&nbsp;毛利率:' + 
            (100 * (cur_od.profit_total_amount_of_base / cur_od.rec_total_amount_of_base)).toFixed(2) + '%'
            );
        init_tab_fee_list_of_old_rp(order_fee_data);
        
        $('.datagrid-body').css({
            'overflow-y': 'hidden'
        });


    }, true);
}
//获取基础数据
function get_basesetting() {
    //post('../Ashx/sys_base.ashx', {
    //    rnd: Math.random(),
    //    action: 'get_basesettingCollections'
    //}, function (data) {
    //    basesetting = data;
        //查询
    basesetting = parent.call_get_father_basesetting();

    bind_combobox(basesetting.order_typ_list, $('#search_od_typ'), 'ot_desc', 'ot_id', true);
    
 
    
    init_tab_fee_list_of_new_rp();
    init_dlg_choise_service_sub_list();

    get_order_details_collections();

}

//子页面获取 basesetting
function call_get_father_basesetting() {
    return basesetting;
}

function init_dlg_choise_service_sub_list() {
    $("#dlg_choise_service_sub_list").datagrid({
        data: [],
        singleSelect: true,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false, 
        rownumbers: true, 
        nowrap: true,
        striped: true,
        collapsible: false,
        fit:true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        frozenColumns: [[

        ]],
        columns: [[
            { title: '', field: 'od_service_sub_seq', width: 40, checkbox: true }
             
            , {
                field: 'od_service_cu_desc', title: '服务商', width: 320,
                
            }
            , {
                field: 'od_service_sub_order_by', title: '批次', width: 110,
                formatter: function (value, row, index) {
                    return '服务批次-' + value;
                }
            }

        ]], 
    });
}
function init_tab_fee_list_of_old_rp(data) {

    $("#tab_fee_list_of_old_rp").datagrid({
        data:data,
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        //toolbar:'#tab_fee_old_list_bar',
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit:true,
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
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 110,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }, {
                field: 'fee_amount_of_base_currency', title: '本币小计', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
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
            $('#dv_costatus_menu').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
    });
}
function init_tab_fee_list_of_new_rp() {
    $("#tab_fee_list_of_new_rp").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false, 
        toolbar: '#tab_fee_list_of_new_rp_bar',
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit:true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: false,//显示的列
        
        columns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true }
            , {
                field: 'co_status', title: '改单状态', sortable: true, width: 60, align: 'center',
                formatter: function (value, row, index) {
                    switch (value) {
                        case 1: return "<div class='status_add'>新增</div>";
                        case 2: return "<div class='status_upd'>修改</div>";
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
                    if (isNaN(row.fee_price)) return '';
                    if (isNaN(row.fee_number)) return ''; 
                    return  (row.fee_price * row.fee_number).toFixed(2); 
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
        },
    });
}
 
//删除修改的费用行
function delete_table_row() {
    if (cur_edit_fee_rowindex != undefined) {
        $("#tab_fee_list_of_new_rp").datagrid("endEdit", cur_edit_fee_rowindex);
        cur_edit_fee_rowindex = undefined;
    }
    var select_rows = $("#tab_fee_list_of_new_rp").datagrid('getChecked');
    if (select_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要操作的行', 'error');
        return;
    }

    $.messager.confirm('删除确认', '您正在删除选中的' + select_rows.length + '条数据，是否继续?', function (r) {
        if (r) {
            //改成多选删除 
            var delete_rows = $('#tab_fee_list_of_new_rp').datagrid('getChecked');

            var all_rows = $('#tab_fee_list_of_new_rp').datagrid('getRows');

            var new_rows = [];

            var has = false;

            $.each(all_rows, function (a, aitem) {
                has = false;
                $.each(delete_rows, function (d, ditem) {
                    if (aitem.fee_seq == ditem.fee_seq) {
                        has = true;
                    }
                });

                if (!has) {
                    new_rows.push(aitem);
                }
            }); 
              
            $("#tab_fee_list_of_new_rp").datagrid("loadData", new_rows);
        }
    }); 
} 
 
//判断费用合理性
function judge_fee_reasonable(rows) {
    //不能做两次 删除或修改 
    var update_rows = $("#tab_fee_list_of_new_rp").datagrid("getRows");

    //??? 
    // $.each中的 return 不是返回 function 而是结束 $.each循环 
    
    var error_cod = 0; 
    $.each(rows, function (i, row) {
        //判断改单标记
        if (row.fee_change_lock_flag == 1) {
            error_cod = 1;
            
            return;
        }

        //判断费用类型
        if (row.fee_status == 3) {
            error_cod = 2;
            
            return;
        }
        if (row.fee_status == 4) {
            error_cod = 3;
            
            return;
        }
        if (row.fee_status == 9) {
            error_cod = 4;
            
            return;
        }

        //不能做二次以上的 修改或删除操作 
        //因为新增都是 new guid所以，不用判断 操作类型是什么只需要判断 fee_seq是否相等 
        if (update_rows.length > 0) {
            var has = false;
            $.each(update_rows, function (u, uitem) {
                if (uitem.fee_seq == row.fee_seq) {
                    has = true;

                    error_cod = 5;
                    return;
                }
            })
        }
    });

    if (error_cod == 0) return true;
    else {

        if (error_cod == 1) {
            $.messager.alert('错误', '选中的费用中包含已在改单计划中且改单未审核通过，不可再次进行改单操作', 'error');
        }
        if (error_cod == 2) {
            $.messager.alert('错误', '选中的费用包含已交帐,不可进行删除、修改操作', 'error');
        }
        if (error_cod == 3) {
            $.messager.alert('错误', '选中的费用包含已部分销账，不可进行删除、修改操作', 'error');
        }
        if (error_cod == 4) {
            $.messager.alert('错误', '选中的费用包含已销账，不可进行删除、修改操作', 'error');
        }
        if (error_cod == 5) {
            $.messager.alert('错误', '选中的费用包含已进行删除/修改操作数据，不可进行第二次删除、修改操作', 'error');
        }
        return false;
    } 
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
    var cur_od = cur_order.order_base_info_and_cargo_info[0];

    var old_rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    old_rows.push({
        od_seq: cur_od_seq,
        fee_seq: guid(),
        co_status: 1, 
        rec_or_pay: 1,
        fee_cu_id: cur_od.od_delegate_cu_id,
        fee_cu_desc: cur_od.od_delegate_cu_desc,
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
        order_service_seq: undefined,
        order_service_sub_seq: undefined
    });

    
    $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: old_rows.length, rows: old_rows });

}
//新增应付
function insert_new_pay() {
    if (cur_edit_fee_rowindex != undefined) {
        $("#tab_fee_list_of_new_rp").datagrid("endEdit", cur_edit_fee_rowindex);
        cur_edit_fee_rowindex = undefined;
    }
    //新增不受限制 

    //弹出对话框
    $('#dlg_insert_pay').dialog({
        title: '请选择应付费用服务商和批次',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        height: 450,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_insert_pay').dialog('close');
            }
        }, {
            text: '确定',
            iconCls: 'icon-ok',
            handler: function () {
                var rows = $('#dlg_choise_service_sub_list').datagrid('getChecked');
                if (rows.length == 0) {
                    $.messager.alert('错误','错误:请选择服务商和批次信息','error');
                    return;
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
                    od_seq: cur_od_seq,
                    co_status: 1,
                    fee_seq: guid(),
                    rec_or_pay: -1,
                    fee_cu_id: rows[0].od_service_cu_id,
                    fee_cu_desc: rows[0].od_service_cu_desc,
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
                    order_service_seq: rows[0].order_service_seq,
                    order_service_sub_seq: rows[0].order_service_sub_seq
                });
                $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: old_rows.length, rows: old_rows });


                $('#dlg_insert_pay').dialog('close');
            }
        }]
    }).dialog('open');

    
}

 
//批量修改费用
function update_fee() {
    if (cur_edit_fee_rowindex != undefined) {
        $("#tab_fee_list_of_new_rp").datagrid("endEdit", cur_edit_fee_rowindex);
        cur_edit_fee_rowindex = undefined;
    }
    //判断是否选中行
    var select_rows = $("#tab_fee_list_of_old_rp").datagrid('getChecked');
    if (select_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要修改的行', 'error');
        return;
    }

    //判断合法性
    if (!judge_fee_reasonable(select_rows)) {
        return;
    }

    //获取已修改数据行
    var tab_rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    $.each(select_rows, function (i, row) {
        tab_rows.push({
            od_seq: cur_od_seq,
            co_status: 2,
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
            fee_bak: row.fee_bak,
            fee_invoice_typ: row.fee_invoice_typ,
            fee_invoice_typ_desc: row.fee_invoice_typ_desc,
            fee_item_typ_desc: row.fee_item_typ_desc,
            fee_unit_desc: row.fee_unit_desc,
            fee_currency_desc: row.fee_currency_desc,
            od_service_seq: row.od_service_seq,
            od_service_sub_seq: row.od_service_sub_seq,
        })
    });

    
    $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: tab_rows.length, rows: tab_rows });

}

//删除费用
function delete_fee() {
    if (cur_edit_fee_rowindex != undefined) {
        $("#tab_fee_list_of_new_rp").datagrid("endEdit", cur_edit_fee_rowindex);
        cur_edit_fee_rowindex = undefined;
    }
    //判断是否选中行
    var select_rows = $("#tab_fee_list_of_old_rp").datagrid('getChecked');
    if (select_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要删除的行', 'error');
        return;
    }

    //判断合法性
    if (!judge_fee_reasonable(select_rows)) {
        return;
    } 

    //获取已修改数据行
    var tab_rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    $.each(select_rows, function (i, row) {
        tab_rows.push({
            od_seq: cur_od_seq,
            co_status: 3,
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
            fee_bak: row.fee_bak,
            fee_invoice_typ: row.fee_invoice_typ,
            fee_invoice_typ_desc: row.fee_invoice_typ_desc,
            fee_item_typ_desc: row.fee_item_typ_desc,
            fee_unit_desc: row.fee_unit_desc,
            fee_currency_desc: row.fee_currency_desc,
            od_service_sub_seq: row.od_service_sub_seq,
            od_service_seq: row.od_service_seq,
        })
    }); 
    $("#tab_fee_list_of_new_rp").datagrid('loadData', { total: tab_rows.length, rows: tab_rows }); 
}

//保存前需要对 费用列表进行检测，必须是符合要求的数据才能录入  
function validate_fee_data(msg) {
    var rows = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    if (rows.length == 0) return true;

    var isRight_custom = false;
    var isRight_invoice = false;
    var isRight_fee_item = false;
    var isRight_unit = false;
    var isRight_currency = false;
    var isRight_price = false;
    var isRight_number = false;
    var isRight_currency_rate = false;
    var errow_index = 0;

    $.each(rows, function (i, row) {
        isRight_custom = false;
        isRight_invoice = false;
        isRight_fee_item = false;
        isRight_unit = false;
        isRight_currency = false;
        isRight_price = false;
        isRight_number = false;
        isRight_currency_rate = false;
        msg = '';

        /*
            增加文本匹配  
        */

        //对状态  
        //客户不能为未定值 
        if (row.fee_cu_id != '' && row.fee_cu_id != undefined) {
            isRight_custom = true;
        }
        if (!isRight_custom) msg += (msg.length > 0 ? '/' : '') + "结算单位不是预设值";
        //票率
        $.each(basesetting.invoice_list, function (i, item) {
            if (row.fee_invoice_typ == item.in_id) {
                isRight_invoice = true;
                return;
            }
        });
        if (!isRight_invoice) {
            $.each(basesetting.invoice_list, function (i, item) {
                if (row.fee_invoice_typ_desc == item.in_name) {
                    row.fee_invoice_typ = item.in_id;
                    isRight_invoice = true;
                    return;
                }
            });
        }

        if (!isRight_invoice) msg += (msg.length > 0 ? '/' : '') + "票率不是预设值";
        //费项目
        $.each(basesetting.fee_item_list, function (i, item) {
            if (item.fee_id == row.fee_item_typ) {
                isRight_fee_item = true;
                return;
            }
        });
        if (!isRight_fee_item) {
            $.each(basesetting.fee_item_list, function (i, item) {
                if (row.fee_item_typ_desc == item.fee_cn) {
                    row.fee_item_typ = item.fee_id;
                    isRight_fee_item = true;
                    return;
                }
            });
        }

        if (!isRight_fee_item) msg += (msg.length > 0 ? '/' : '') + "费项不是预设值";
        //费目
        $.each(basesetting.unit_list, function (i, item) {
            if (item.u_id == row.fee_unit) {
                isRight_unit = true;
                return;
            }
        });
        if (!isRight_unit) {
            $.each(basesetting.unit_list, function (i, item) {
                if (row.fee_unit_desc == item.u_desc) {
                    row.fee_unit = item.u_id;
                    isRight_unit = true;
                    return;
                }
            });
        }

        if (!isRight_unit) msg += (msg.length > 0 ? '/' : '') + "计量单位不是预设值";
        //币种
        $.each(basesetting.currency_list, function (i, item) {
            if (row.fee_currency_id == item.cr_id) {
                isRight_currency = true;
                return;
            }
        });
        if (!isRight_currency) {
            $.each(basesetting.currency_list, function (i, item) {
                if (row.fee_currency_desc == item.cr_name) {
                    row.fee_currency_id = item.cr_id;
                    isRight_currency = true;
                    return;
                }
            });
        }

        if (!isRight_currency) msg += (msg.length > 0 ? '/' : '') + "币种不是预设值";

        //单价和数量 必须是数字模式 

        //数量金额 不能为 0 

        if (isNaN(row.fee_price) == false && row.fee_price != undefined && row.fee_price != 0) {
            isRight_price = true;
        }
        if (!isRight_price) msg += (msg.length > 0 ? '/' : '') + "单价必须是数字,且不能为0";

        if (isNaN(row.fee_number) == false && row.fee_number != undefined && row.fee_number != 0) {
            isRight_number = true;
        }
        if (!isRight_number) msg += (msg.length > 0 ? '/' : '') + "数量必须是数字,且不能为0";

        if (isNaN(row.fee_currency_rate) == false && row.fee_currency_rate != undefined && row.fee_currency_rate != 0) {
            isRight_currency_rate = true;
        }
        if (!isRight_currency_rate) msg += (msg.length > 0 ? '/' : '') + "汇率必须是数字,且不能为0,PS:有可能是没有设置汇率";

        //跳出循环 
        if (isRight_currency && isRight_custom && isRight_fee_item && isRight_invoice && isRight_number && isRight_price && isRight_unit) {
            return true;
        } else {
            errow_index = i + 1;
            return false;
        }
    });

    if (isRight_currency && isRight_custom && isRight_fee_item && isRight_invoice && isRight_number && isRight_price && isRight_unit) {
        return true;
    } else {
        $.messager.alert('错误提示', '错误: 列表中第' + errow_index + '行:' + msg + '!', 'error');
        return false;
    }
}

 

//创建计划 
function begin_create_changeorder_plan() {

    var new_fee_data = $("#tab_fee_list_of_new_rp").datagrid('getRows');

    if (new_fee_data.length == 0) {
        $.messager.alert('错误','错误: 未进行任何修改，无法发起申请！','error');
        return;
    }

    //需要判断
    var msg = '';
    if (!validate_fee_data(msg)) {
        return;
    }


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
                            action: 'create_changeorder_plan',
                            od_seq: cur_od_seq,
                            new_fee_data: JSON.stringify({ rows: new_fee_data }),
                            co_bak: $('#dlg_cop_ap_context').val(),
                            ap_u_id: ap_u_id,
                            aps_order_by_id: aps_order_by_id,
                            aps_id: aps_id

                        }, function (data) {
                            if (data.result > 0) { 
                                $.messager.alert('成功提示', data.msg, 'info', function () {
                                    parent.call_close_change_order_win();
                                });
                            } else {
                                $.messager.alert('成功提示', data.msg, 'error');
                            }
                        }, true); 
                    }
                }]
        }).dialog('open');
    }, true);
     
    

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
                   field: 'co_status', title: '状态',  width: 80,align:'center',
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


