var cur_order_cntr_list = undefined;
var cur_order_cntr_stuffing_list = undefined;

var cur_pick_empty_no = [];
var cur_opr_cod = [];

var cur_edit_cntr_rowindex = undefined;
/********************订单集装箱信息*******************************************/
//清空 订单集装箱信息 
function clear_edit_order_cntr() {
    $("#tab_order_cntr").datagrid('loadData', { total: 0, rows: [] });
    //这个表取消
    //$("#tab_order_cntr_stuffing_info").datagrid('loadData', { total: 0, rows: [] });

    $('#ed_od_bill_typ').combobox('setValue', '');
    $('#ed_od_sign_bill_typ').combobox('setValue', '');
    $('#ed_od_declare_customs_typ').combobox('setValue', '');
    $('#ed_od_carriage_typ').combobox('setValue', '');

    $('#ed_od_stuffing_container_typ').combobox('setValue', '');
    $('#ed_od_stuffing_container_place').val('');
    $('#ed_od_entry_tim_of_stuffing').datebox('setValue', '');
    $('#ed_od_out_tim_of_stuffing').datebox('setValue', '');
    $('#ed_order_cntr_search_like').val('');
    //$('#ed_order_cntr_stuffing_search_like').val('');
}
//显示 订单集装箱 
function load_order_cntr_info(cur_order_collections) {
    


    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];

    $('#ed_od_bill_typ').combobox('setValue', cur_order.od_bill_typ);
    $('#ed_od_sign_bill_typ').combobox('setValue', cur_order.od_sign_bill_typ);
    $('#ed_od_declare_customs_typ').combobox('setValue', cur_order.od_declare_customs_typ);
    $('#ed_od_carriage_typ').combobox('setValue', cur_order.od_carriage_typ);

    $('#ed_od_stuffing_container_typ').combobox('setValue', cur_order.od_stuffing_container_typ);
    $('#ed_od_stuffing_container_place').val(cur_order.od_stuffing_container_place);
    $('#ed_od_entry_tim_of_stuffing').datebox('setValue', dateformat(cur_order.od_entry_tim_of_stuffing, true));
    $('#ed_od_out_tim_of_stuffing').datebox('setValue', dateformat(cur_order.od_out_tim_of_stuffing, true));

    $('#ed_order_cntr_search_like').val('');
    //$('#ed_order_cntr_stuffing_search_like').val('');

    //编辑
     
    cur_order_cntr_list = $.extend(true, [], cur_order_collections.order_cntr_list);
    cur_order_cntr_stuffing_list = cur_order_collections.order_cntr_stuffing_list;

    //重新装载 筛选框 
    var bill_no_list = [];
    var eqp_siz_list = [];
    var eqp_typ_list = [];
    var pick_empty_no = [];

    var opr_cod = [];

    if (cur_order_cntr_list.length > 0) {
        $.each(cur_order_cntr_list, function (i, cntr) {
            var has_opr_cod = false;
            if (cntr.opr_cod != undefined && cntr.opr_cod.length > 0) {
                $.each(opr_cod, function (bl, blno) {
                    if (blno.value == cntr.opr_cod) {
                        has_opr_cod = true;
                    }

                    if (blno.value == '无箱属' && cntr.opr_cod.length == 0) {
                        has_opr_cod = true;
                    }
                });
                if (!has_opr_cod) {

                    opr_cod.push({
                        label: cntr.opr_cod == undefined || cntr.opr_cod.length == 0 ? '无箱属' : cntr.opr_cod,
                        value: cntr.opr_cod == undefined || cntr.opr_cod.length == 0 ? '无箱属' : cntr.opr_cod,
                    });
                }
            }
                   
            if (cntr.bill_no != undefined && cntr.bill_no.length > 0) {
                var has_bill_no = false;
                $.each(bill_no_list, function (bl, blno) {
                    if (blno.value == cntr.bill_no) {
                        has_bill_no = true;
                    }

                    if (blno.value == '无提单号' && cntr.bill_no.length == 0) {
                        has_bill_no = true;
                    }
                });
                if (!has_bill_no) {

                    bill_no_list.push({
                        label: cntr.bill_no == undefined || cntr.bill_no.length == 0 ? '无提单号' : cntr.bill_no,
                        value: cntr.bill_no == undefined || cntr.bill_no.length == 0 ? '无提单号' : cntr.bill_no,
                    });
                }
            }
                    
            if (cntr.eqp_siz != undefined && cntr.eqp_siz.length > 0) {
                var has_eqp_siz = false;
                $.each(eqp_siz_list, function (siz, siz_item) {
                    if (siz_item.value == cntr.eqp_siz) {
                        has_eqp_siz = true;
                    }
                    if (cntr.eqp_siz == undefined && siz_item.value == -99) {
                        has_eqp_siz = true;
                    }
                });
                if (!has_eqp_siz) {
                    eqp_siz_list.push({
                        label: cntr.eqp_siz == undefined || cntr.eqp_siz.length == 0 ? '无尺寸' : cntr.eqp_siz,
                        value: cntr.eqp_siz == undefined || cntr.eqp_siz.length == 0 ? -99 : cntr.eqp_siz,
                    });
                }
            }

            if (cntr.eqp_typ != undefined && cntr.eqp_typ.length > 0) {
                var has_eqp_typ = false;
                $.each(eqp_typ_list, function (typ, typ_item) {
                    if (typ_item.value == cntr.eqp_typ) {
                        has_eqp_typ = true;
                    }
                    if (cntr.eqp_typ.length == 0 && typ_item.value == '无箱型') {
                        has_eqp_typ = true;
                    }
                });
                if (!has_eqp_typ) {
                    eqp_typ_list.push({
                        label: cntr.eqp_typ == undefined || cntr.eqp_typ.length == 0 ? '无箱型' : cntr.eqp_typ,
                        value: cntr.eqp_typ == undefined || cntr.eqp_typ.length == 0 ? '无箱型' : cntr.eqp_typ,
                    });
                }
            } 

            if (cntr.pick_empty_no != undefined && cntr.pick_empty_no.length > 0) {
                var has_pick_empty_no = false;
                $.each(pick_empty_no, function (bl, blno) {
                    if (blno.value == cntr.pick_empty_no) {
                        has_pick_empty_no = true;
                    }

                    if (cntr.pick_empty_no.length == 0) {
                        has_pick_empty_no = true;
                    }
                });
                if (!has_pick_empty_no) {
                    pick_empty_no.push({
                        opr_cod: cntr.opr_cod == undefined || cntr.opr_cod.length == 0 ? '无箱属' : cntr.opr_cod,
                        label: cntr.pick_empty_no == undefined || cntr.pick_empty_no.length == 0 ? '' : cntr.pick_empty_no,
                        value: cntr.pick_empty_no == undefined || cntr.pick_empty_no.length == 0 ? '' : cntr.pick_empty_no,
                    });
                }
            } 
        });
    }
    bind_combobox(bill_no_list, $('#ed_order_cntr_search_bill_no'), 'label', 'value', true);
    bind_combobox(eqp_siz_list, $('#ed_order_cntr_search_eqp_siz'), 'label', 'value', true);
    bind_combobox(eqp_typ_list, $('#ed_order_cntr_search_eqp_typ'), 'label', 'value', true);
             
    $('#ed_order_cntr_search_bill_no').combobox({
        onSelect: function () {
            mulitserach_order_cntr();
        }
    });
    $('#ed_order_cntr_search_eqp_siz').combobox({
        onSelect: function () {
            mulitserach_order_cntr();
        }
    });
    $('#ed_order_cntr_search_eqp_typ').combobox({
        onSelect: function () {
            mulitserach_order_cntr();
        }
    });
    $('#ed_order_cntr_search_like').val('');
    //$('#ed_order_cntr_stuffing_search_like').val('');

    mulitserach_order_cntr();
    //装箱资料
    //  mulit_search_order_cntr_stuffing_infos();


    //建立 备注提示 

    cur_pick_empty_no = pick_empty_no;

    cur_opr_cod = opr_cod;
     
     
}


///子页面获取集装箱数量 
function call_get_fahter_order_cntr_list() {
    var data = $("#tab_order_cntr").datagrid('getRows');

    return data;
}

//组织 上面的筛选条件 
function push_into_table(new_cntr_list) { 
    if (cur_order_cntr_list == undefined || cur_order_cntr_list.length == 0) {
        cur_order_cntr_list = new_cntr_list;
    } else {
        if (new_cntr_list.length > 0) {
            $.each(new_cntr_list, function (i, newItem) {
                cur_order_cntr_list.push(newItem);
            });
        }
    }
    //重新装载 筛选框 
    var bill_no_list = [];
    var eqp_siz_list = [];
    var eqp_typ_list = [];
    var pick_empty_no = [];

    var opr_cod = [];

    if (cur_order_cntr_list.length > 0) {
        $.each(cur_order_cntr_list, function (i, cntr) {
            var has_opr_cod = false;
            if (cntr.opr_cod != undefined && cntr.opr_cod.length > 0) {
                $.each(opr_cod, function (bl, blno) {
                    if (blno.value == cntr.opr_cod) {
                        has_opr_cod = true;
                    }

                    if (blno.value == '无箱属' && cntr.opr_cod.length == 0) {
                        has_opr_cod = true;
                    }
                });
                if (!has_opr_cod) {

                    opr_cod.push({
                        label: cntr.opr_cod == undefined || cntr.opr_cod.length == 0 ? '无箱属' : cntr.opr_cod,
                        value: cntr.opr_cod == undefined || cntr.opr_cod.length == 0 ? '无箱属' : cntr.opr_cod,
                    });
                }
            }

            if (cntr.bill_no != undefined && cntr.bill_no.length > 0) {
                var has_bill_no = false;
                $.each(bill_no_list, function (bl, blno) {
                    if (blno.value == cntr.bill_no) {
                        has_bill_no = true;
                    }

                    if (blno.value == '无提单号' && cntr.bill_no.length == 0) {
                        has_bill_no = true;
                    }
                });
                if (!has_bill_no) {

                    bill_no_list.push({
                        label: cntr.bill_no == undefined || cntr.bill_no.length == 0 ? '无提单号' : cntr.bill_no,
                        value: cntr.bill_no == undefined || cntr.bill_no.length == 0 ? '无提单号' : cntr.bill_no,
                    });
                }
            }

            if (cntr.eqp_siz != undefined && cntr.eqp_siz.length > 0) {
                var has_eqp_siz = false;
                $.each(eqp_siz_list, function (siz, siz_item) {
                    if (siz_item.value == cntr.eqp_siz) {
                        has_eqp_siz = true;
                    }
                    if (cntr.eqp_siz == undefined && siz_item.value == -99) {
                        has_eqp_siz = true;
                    }
                });
                if (!has_eqp_siz) {
                    eqp_siz_list.push({
                        label: cntr.eqp_siz == undefined || cntr.eqp_siz.length == 0 ? '无尺寸' : cntr.eqp_siz,
                        value: cntr.eqp_siz == undefined || cntr.eqp_siz.length == 0 ? -99 : cntr.eqp_siz,
                    });
                }
            }

            if (cntr.eqp_typ != undefined && cntr.eqp_typ.length > 0) {
                var has_eqp_typ = false;
                $.each(eqp_typ_list, function (typ, typ_item) {
                    if (typ_item.value == cntr.eqp_typ) {
                        has_eqp_typ = true;
                    }
                    if (cntr.eqp_typ.length == 0 && typ_item.value == '无箱型') {
                        has_eqp_typ = true;
                    }
                });
                if (!has_eqp_typ) {
                    eqp_typ_list.push({
                        label: cntr.eqp_typ == undefined || cntr.eqp_typ.length == 0 ? '无箱型' : cntr.eqp_typ,
                        value: cntr.eqp_typ == undefined || cntr.eqp_typ.length == 0 ? '无箱型' : cntr.eqp_typ,
                    });
                }
            }

            if (cntr.pick_empty_no != undefined && cntr.pick_empty_no.length > 0) {
                var has_pick_empty_no = false;
                $.each(pick_empty_no, function (bl, blno) {
                    if (blno.value == cntr.pick_empty_no) {
                        has_pick_empty_no = true;
                    }

                    if (cntr.pick_empty_no.length == 0) {
                        has_pick_empty_no = true;
                    }
                });
                if (!has_pick_empty_no) {
                    pick_empty_no.push({
                        opr_cod: cntr.opr_cod == undefined || cntr.opr_cod.length == 0 ? '无箱属' : cntr.opr_cod,
                        label: cntr.pick_empty_no == undefined || cntr.pick_empty_no.length == 0 ? '' : cntr.pick_empty_no,
                        value: cntr.pick_empty_no == undefined || cntr.pick_empty_no.length == 0 ? '' : cntr.pick_empty_no,
                    });
                }
            }
        });
    }
    bind_combobox(bill_no_list, $('#ed_order_cntr_search_bill_no'), 'label', 'value', true);
    bind_combobox(eqp_siz_list, $('#ed_order_cntr_search_eqp_siz'), 'label', 'value', true);
    bind_combobox(eqp_typ_list, $('#ed_order_cntr_search_eqp_typ'), 'label', 'value', true);

    cur_pick_empty_no = pick_empty_no; 
    cur_opr_cod = opr_cod;

    $("#tab_order_cntr").datagrid('loadData', { total: cur_order_cntr_list.length, rows: cur_order_cntr_list }); 
}
 
//初始化 订单集装箱信息
function init_tab_order_cntr() {
    $("#tab_order_cntr").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_order_cntr_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ title: '', field: 'cntr_id', width: 40, checkbox: true }
            , {
                title: '', field: 'ship_lock_status', width: 20,
                formatter: function (value, row, index) {
                    if (Number(value) == 2) {

                        return '<span style="color:red" title="绑定船舶且关闭配载"><i class="fa fa-ship"></i></span>';
                    } else if (Number(value) == 1) { 
                        return '<span style="color:green" title="绑定船舶"><i class="fa fa-ship"></i></span>';
                    } else {
                        return '';
                    }
                },
            }
        ]],
        columns: [[//显示的列
              {
                  field: 'eqp_siz', title: '尺寸', width: 40,
                  editor: {
                      type: 'combobox',
                      options: {
                          valueField: 'cs_desc',
                          textField: 'cs_desc',
                          data: basesetting.container_siz_list,
                          panelWidth: 80,
                          filter: filterCombo,
                          onSelect: function () {
                              event.stopPropagation();
                          }
                      }
                  }
              }
            , {
                field: 'eqp_typ', title: '箱型', width: 40,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'ct_name',
                        textField: 'ct_name',
                        data: basesetting.container_typ_list,
                        panelWidth: 80,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'opr_cod', title: '箱主', sortable: true, width: 60,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'sh_cod',
                        textField: 'sh_cod',
                        data: basesetting.ship_company_list,
                        panelWidth: 100,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'bill_no', title: '提单号', width: 150,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'cntr_no', title: '箱号', sortable: true, width: 100,
                editor: {
                    type: 'text',
                },
            }
             
            , {
                field: 'seal_no', title: '铅封号', width: 120,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'pick_empty_no', title: '提空提单', width: 150,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'cargo_net_wgt', title: '货重', width: 80,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'cntr_gross_wgt', title: '箱货重', width: 80,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'cargo_pick_number', title: '件数', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'cargo_bluk', title: '体积', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            } 
            
            , {
                field: 'customs_ship_desc', title: '报关船名', width: 90,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'customs_voyage_no', title: '报关航次', width: 60,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'customs_ship_no', title: '报关海关编码', width: 90,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'customs_load_port', title: '报关装货区', width: 90,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'customs_disc_port', title: '报关卸货区', width: 90,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'cargo_goods_desc', title: '报关品名', width: 140,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'customs_hs_cod', title: '报关品名编号', width: 90,
                editor: {
                    type: 'text',
                },
            }
            , {
                field: 'cntr_pin_flag_desc', title: '整/拼', width: 40,
                
                styler: function (value, row, index) {
                    if (row.cntr_pin_flag == undefined) {
                        return '';
                    } else if (Number(row.cntr_pin_flag) == 0) {
                        return 'background-color:#e7d430;color:#000;';
                    } else if (Number(row.cntr_pin_flag) == 1) {
                        return 'background-color:#4ff0e3;color:#000;';
                    }
                }
            }
            , { field: 'file_count', title: '文件数', width: 90, sortable: true, }
        ]],
        onAfterEdit: function (index, row, changes) {
            cur_edit_cntr_rowindex  = undefined;
             
            var has = false;
             
            $("#tab_order_cntr").datagrid('updateRow', {
                index: index,
                row: row
            });  
        },
        onBeforeEdit: function (index, row) {
            if (cur_edit_cntr_rowindex != index && cur_edit_cntr_rowindex != undefined) {
                $('#tab_order_cntr').datagrid('endEdit', cur_edit_cntr_rowindex);
                cur_edit_cntr_rowindex = index;
            } 
        },
        onClickRow: function (index, row) {
             
            if (cur_edit_cntr_rowindex != undefined &&
                cur_edit_cntr_rowindex != index) {
                $('.datagrid-row').unbind('click');
                $('#tab_order_cntr').datagrid('endEdit', cur_edit_cntr_rowindex);
            }
            if (cur_edit_cntr_rowindex == undefined) {
                //增加  船舶锁定配载后，不能修改
                if (can_edit_order() && row.ship_lock_status != 2) {
                    cur_edit_cntr_rowindex = index; 
                    $('#tab_order_cntr').datagrid('beginEdit', cur_edit_cntr_rowindex);

                    $('.datagrid-row-editing').unbind('click').bind('click', function () {
                        event.stopPropagation();
                    });
                    $(document).on('click', ':not(.datagrid-row)', function () {
                        if (cur_edit_cntr_rowindex != undefined) {
                            $('.datagrid-row').unbind('click');
                            $('#tab_order_cntr').datagrid('endEdit', cur_edit_cntr_rowindex);
                        }
                    });   
                }
            } 
        },
        onLoadSuccess: function (data) {

            //计算规则 
            /*
                箱数 剔除拼
                总 毛重  ： 剔除拼 
            */
            var total_cntr_num = 0;
            var total_cntr_gross_wgt = 0;

            //依据箱号增加
            var temp_cntr_no = undefined;
            $.each(data.rows, function (i, row) {
                if (temp_cntr_no == undefined) {
                    temp_cntr_no = row.cntr_no;
                    total_cntr_num = 1;
                    total_cntr_gross_wgt = row.cntr_gross_wgt;
                } else {
                    if (temp_cntr_no != row.cntr_no) {
                        total_cntr_num += 1;
                        temp_cntr_no = row.cntr_no; 
                        total_cntr_gross_wgt += row.cntr_gross_wgt;
                    }
                }
            });
            

            $('#tab_order_cntr').datagrid('reloadFooter', [
                { 
                    cntr_order_by_id: '合计:',
                    cntr_no: total_cntr_num + '箱',
                    cargo_net_wgt: table_compute('tab_order_cntr', 'cargo_net_wgt'),
                    cargo_pick_number: table_compute('tab_order_cntr', 'cargo_pick_number'),
                    cargo_bluk: table_compute('tab_order_cntr', 'cargo_bluk'),
                    cntr_gross_wgt: total_cntr_gross_wgt,
                }
            ]);
        },
    });
}
//插入一行 
function insert_order_cntr() {

    if (can_edit_order()) {
        if (cur_order_cntr_list == undefined || cur_order_cntr_list.length == 0) {
            cur_order_cntr_list = [];
        }
        cur_order_cntr_list.push({
            cntr_id: guid(),
            od_seq: cur_ed_od_seq,
            cntr_no: '',
            eqp_typ: '',
            eqp_siz: '',
            seal_no: '',
            customs_seal_no: '',
            bill_no: '',
            cargo_net_wgt: 0,
            cargo_pick_number: 0,
            cargo_bluk: 0,
            opr_cod: '',
            pick_empty_no: '',
            cntr_gross_wgt: 0,
            customs_voyage_no: '',
            customs_ship_desc: '',
            customs_hs_cod: '',
            customs_load_port: '',
            customs_disc_port: '',
            cargo_goods_desc: '',
            customs_ship_no: '',
            file_count: 0

        });
        $("#tab_order_cntr").datagrid('loadData', { total: cur_order_cntr_list.length, rows: cur_order_cntr_list });

         
    } else {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对集装箱进行编辑操作', 'error');
    }
}

//筛选 
function mulitserach_order_cntr() {
    var new_arr = [];
    var like_str = $.trim($('#ed_order_cntr_search_like').val().toUpperCase());
    var bill_no =  $('#ed_order_cntr_search_bill_no').combobox('getValue');
    var eqp_siz = $('#ed_order_cntr_search_eqp_siz').combobox('getValue');
    var eqp_typ = $('#ed_order_cntr_search_eqp_typ').combobox('getValue');
    $.each(cur_order_cntr_list, function (i, item) {
        if ((like_str.length == 0 || (like_str.length > 0 && (item.cntr_no.indexOf(like_str) > -1 || 
            item.bill_no.indexOf(like_str) > -1 || 
            item.seal_no.indexOf(like_str) > -1 ||
            item.customs_seal_no.indexOf(like_str) > -1 || 
            item.opr_cod.index(like_str) > -1
            )) 
            ) && 
           (bill_no.length == 0 || (bill_no.length > 0 && bill_no != '无提单号' && item.bill_no == bill_no) || (bill_no.length > 0 && bill_no == '无提单号' && item.bill_no.length == 0)) &&
           (eqp_siz.length == 0 || (eqp_siz.length > 0 && eqp_siz != -99 && item.eqp_siz != undefined && item.eqp_siz.indexOf(eqp_siz) > -1) || (eqp_siz.length > 0 && eqp_siz == -99 && item.eqp_siz== undefined)) &&
           (eqp_typ.length == 0 || (eqp_typ.length > 0 && eqp_typ != '无箱型' && item.eqp_typ.indexOf(eqp_typ) > -1) || (eqp_typ.length > 0 && eqp_typ == '无箱型' && item.eqp_typ.length == 0))) {
            new_arr.push(item);
        }
    });
    $("#tab_order_cntr").datagrid('loadData', { total: new_arr.length, rows: new_arr });

}

//删除
function delete_order_cntr() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对集装箱进行编辑操作', 'error');
        return;
    }
     
    var rows = $("#tab_order_cntr").datagrid('getSelections');

    if(rows.length == 0){
        $.messager.alert('错误提示', '错误: 请勾选数据后再执行此操作', 'error');
        return;
    }

    var cntr_id = '';
    var b_lock = false;
    $.each(rows, function (i, item) {
        if (Number(item.ship_lock_status) == 2) {
            b_lock = true;
        }

        if (cntr_id.length == 0) {
            cntr_id = item.cntr_id;
        } else {
            cntr_id += ',' + item.cntr_id;
        }
    });
    if (b_lock) {
        $.messager.alert('错误提示', '错误: 勾选集装箱所绑定的船舶已关闭配载，无法进行删除操作！', 'error');
        return;
    }
     
    /*
        前台已判断了，现在进行后台判断 
    */ 
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'judge_delete_cntr',
        od_seq: cur_ed_od_seq,
        cntr_id: cntr_id,
    }, function (data) {
        if (data.result == 1) {
            $.messager.confirm('删除提示', '确认要删除选中的' + rows.length + '行数据(若绑定船舶则相应船舶集装箱明细也会删除)',
            function (r) {
                if (r) {

                    var new_arr = [];

                    $.each(cur_order_cntr_list, function (i, citem) {
                        var b_del = false;
                        $.each(rows, function (i, row) {
                            if (row.cntr_id == citem.cntr_id) {
                                b_del = true;
                            }
                        });

                        if (!b_del) {
                            new_arr.push(citem);
                        }
                    });

                    cur_order_cntr_list = new_arr;

                    $("#tab_order_cntr").datagrid('loadData', { total: cur_order_cntr_list.length, rows: cur_order_cntr_list });

                    //var cntr_id = '';

                    //$.each(rows,function(i,row){
                    //    if(cntr_id.length == 0){
                    //        cntr_id = row.cntr_id;
                    //    }else{
                    //        cntr_id += ',' + row.cntr_id;
                    //    }
                    //});

                    //post('../Ashx/order.ashx', {
                    //    rnd: Math.random(),
                    //    action: 'delete_order_cntr',
                    //    od_seq: cur_ed_od_seq,
                    //    cntr_id: cntr_id,
                    //}, function (data) {
                    //    if (data.result == 1) {  
                    //        load_order_cntr_info(cur_ed_od_seq);
                    //        $.messager.alert('删除提示', data.msg, 'info');
                    //    } else {
                    //        $.messager.alert('错误', '异常: 删除集装箱发生异常，请联系管理员处理。', 'error');
                    //    } 
                    //},true);
                }
            });
        } else {
            $.messager.alert('错误',data.msg,'error');
        }
    },true);

    
}

//下载
function download_order_cntr_pre_schedule_list() {
    var myparams = {
        action: 'download_order_cntr_pre_schedule_list',
        od_seq: cur_ed_od_seq, 
    }

    window.open('../Ashx/order.ashx?' + parseParams(myparams));
}
function download_order_cntr_schedule_list() {
    var myparams = {
        action: 'download_order_cntr_schedule_list',
        od_seq: cur_ed_od_seq,
    }

    window.open('../Ashx/order.ashx?' + parseParams(myparams));
}
//新增
/*
    通过黏贴形式增加 

    格式: 

    箱号 / 箱主 / 尺寸 / 箱型 / 提单号 / 商封 / 官封 / 货重 / 件 / 体  

*/ 
function import_order_cntr() { 
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对集装箱进行编辑操作', 'error');
        return;
    }

    $('#dlg_import_order_cntr_textarea').val('')
    .unbind('input')
    .bind('input', function () {
        //将字符串进行处理 
        read_template_bat_insert_order_cntr($(this).val());
    }).show();

    //弹出对话框
    $('#dlg_import_order_cntr').dialog({
        title: '编辑订单集装箱信息',
        iconCls: 'icon-edit',
        autoOpen: false,
        modal: true,
        width: 600,
        minheight: 400,
        buttons: [ 
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_import_order_cntr').dialog('close');
            }
        }]
    }).dialog('open');
}

//导入读取方法
function read_template_bat_insert_order_cntr(str_template) {

    if ($.trim(str_template).length < 1) { 
        return;
    }
    $.messager.progress({
        title: '请稍后',
        msg: '努力加载中...'
    });
    $.post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'validate_str',
        vs: str_template
    }, function (data) {
        if (!session_out(data)) {
            //只有一个格式，所以，这里手工写一个 

            
            var config = template_config();
            //1. 解析字符串 
            var tmp = escape(str_template);
            //***********************************************************************************
            /*
             后台去掉了 多余的空格
                        去掉了""中间的 制表符 换行符 回车符号
                        后台去掉了 \r \n \t \" 和空格 
            */

            //*********************************************************************************** 

            //*********************************************************************************** 
            //2.通过换行进行拆分
            //%09 是单元格
            //%20 是数字结束的意思 怎么说呢，只要是数字格式 %20
            //%0A 是换行
            var rows = tmp.split('%0A');
            //3. 找标题 
            //显示源代码 
            //$('#txtarea_ship_cntr').val(tmp);

            var arr = []; 
            //默认 检测前面 5行数据是否是头部 
            var start_data_index = undefined;
            var template_id = undefined;
            $.each(rows, function (i, row) {
                var cells = row.split('%09');
                //不判断有多少列 cells.length  
                $.each(config.template_array, function (ind, tpl) {
                    //同步检测
                    //导入模板 列数需要 等于 字符串拆出来的列数 
                    if (tpl.tl_header.length <= cells.length) {
                        //先假设是符合的 
                        var ismatch = true;
                        for (var hi = 0; hi < tpl.tl_header.length; hi++) {
                            //存在空格的问题
                            var t_head = tpl.tl_header[hi].val.replace(new RegExp(' ', 'g'), '');
                            var c_head = unescape(cells[hi].replace('%20', '')).replace(new RegExp(' ', 'g'), '');
                             
                            if (t_head != c_head) {
                                ismatch = false;
                                break;
                            }
                             
                        }
                        //经历过上述循环之后  
                        if (ismatch) {
                            //找到了 第几行是数据 
                            start_data_index = i + 1;
                            //找到了 第几个模板
                            template_id = tpl.tl_id;
                        }
                    }
                }); 
            });

            if (template_id == undefined) {

                var is_notitle_mode = false;
                //无标题模式 
                //格式一 : 箱型 + 空重 +箱主 + 提单号 + 箱号 + 铅封 + 箱货重 + 提空提单
                $.each(rows, function (i, row) {
                    var cells = row.split('%09');
                    if (cells.length == 8) {
                        is_notitle_mode = true;
                        arr.push(format_no_title(cells));
                    }
                });

                if (!is_notitle_mode) {
                    //没有找到 
                    $.messager.progress('close');
                    $.messager.alert('导入集装箱错误提示','错误:未找到匹配的格式，请按照模板格式导入','error');
                    return;
                } 
            }else{
                
                if (template_id == 1) {
                    arr = format_1(rows, start_data_index);
                }
                if (template_id == 2) {
                    arr = format_2(rows, start_data_index);
                }

                if (template_id == 3) {
                    arr = format_3(rows, start_data_index);
                }

                if (template_id == 4) {
                    arr = format_4(rows, start_data_index);
                }
            } 
            push_into_table(arr);
            $('#dlg_import_order_cntr').dialog('close');
            $.messager.progress('close');
             
        }
    });
}
function format_no_title(cells) {
    //箱型 + 空重 +箱主 + 提单号 + 箱号 + 铅封 + 箱货重 + 提空提单
    //允许 合并导入: 箱尺寸，箱类型，提单号，箱主 , 报关船名，报关航次，报关船海关编号，报关装货区，报关卸货区，报关品名，报关品名编号 
    var cntr_no = undefined; 
    var eqp_typ = undefined;
    var eqp_siz = undefined;
    var bill_no = undefined;
    var opr_cod = undefined;
    var customs_voyage_no = '';
    var customs_ship_desc = '';
    var customs_hs_cod = '';
    var customs_load_port = '';
    var customs_disc_port = '';
    var cargo_goods_desc = '';
    var customs_ship_no = ''; 
    var customs_seal_no = '';
    var t_eqp_typ = unescape(cells[0].replace('%20', '')).toUpperCase(); 
    $.each(basesetting.container_siz_list, function (i, row) {
        if (t_eqp_typ.indexOf(row.cs_desc) > -1) {
            t_eqp_siz = row.cs_desc;
        }
    });
    $.each(basesetting.container_typ_list, function (i, row) {
        if (t_eqp_typ.indexOf(row.ct_name) > -1) {
            t_eqp_typ = row.ct_name;
        }
    });
    //空重暂无
    var t_opr_cod = unescape(cells[2].replace('%20', '')).toUpperCase();
    var t_bill_no = unescape(cells[3].replace('%20', '')).toUpperCase();
    var t_cntr_no = unescape(cells[4].replace('%20', '')); 
    var seal_no = unescape(cells[5].replace('%20', '')).toUpperCase();

   // var customs_seal_no = unescape(cells[6].replace('%20', '')).toUpperCase();
    var cntr_gross_wgt = unescape(cells[6].replace('%20', '')); 
    var pick_empty_no = unescape(cells[7].replace('%20', '')).toUpperCase();

    var cargo_net_wgt = 0;
    var cargo_pick_number = 0;
    var cargo_bluk = 0;
    
    if (cntr_no == undefined) cntr_no = t_cntr_no;
    else { if (t_cntr_no.length > 0) cntr_no = t_cntr_no; }

    if (bill_no == undefined) bill_no = t_bill_no;
    else { if (t_bill_no.length > 0) bill_no = t_bill_no; }
    if (eqp_typ == undefined) eqp_typ = t_eqp_typ;
    else { if (t_eqp_typ.length > 0) eqp_typ = t_eqp_typ; }
    if (eqp_siz == undefined) eqp_siz = t_eqp_siz;
    else { if (t_eqp_siz.length > 0) eqp_siz = t_eqp_siz; }
    if (opr_cod == undefined) opr_cod = t_opr_cod;
    else { if (t_opr_cod.length > 0) opr_cod = t_opr_cod; }
     

    //destination_port
    var item = {
        cntr_id: guid(),
        od_seq: cur_ed_od_seq,
        cntr_no: cntr_no,
        eqp_typ: eqp_typ,
        eqp_siz: eqp_siz,
        seal_no: seal_no,
        customs_seal_no: customs_seal_no,
        bill_no: bill_no,
        cargo_net_wgt: cargo_net_wgt,
        cargo_pick_number: cargo_pick_number,
        cargo_bluk: cargo_bluk,
        opr_cod: opr_cod,
        customs_voyage_no: customs_voyage_no,
        customs_ship_desc: customs_ship_desc,
        customs_hs_cod: customs_hs_cod,
        customs_load_port: customs_load_port,
        customs_disc_port: customs_disc_port,
        cargo_goods_desc: cargo_goods_desc,
        customs_ship_no: customs_ship_no,
        pick_empty_no: pick_empty_no,
        cntr_gross_wgt: cntr_gross_wgt,
        file_count: 0
    };

    return item;
}
function format_4(rows, start_data_index) {

    //允许 合并导入: 箱尺寸，箱类型，提单号，箱主 , 报关船名，报关航次，报关船海关编号，报关装货区，报关卸货区，报关品名，报关品名编号 
    var cntr_no = undefined;
    var eqp_typ = undefined;
    var eqp_siz = undefined;
    var bill_no = undefined;
    var opr_cod = undefined;
    var customs_voyage_no = undefined;
    var customs_ship_desc = undefined;
    var customs_hs_cod = undefined;
    var customs_load_port = undefined;
    var customs_disc_port = undefined;
    var cargo_goods_desc = undefined;
    var customs_ship_no = undefined;

    var ef_typ = undefined;
    var trade_typ = undefined;
    var danger_flag = undefined;
    var trans_flag = undefined;


    var arr = [];

    for (var ind = start_data_index; ind < rows.length; ind++) {
        var cells = rows[ind].split('%09');
        if (cells.length < 10) {
            continue;
        }

        var t_cntr_no = unescape(cells[0].replace('%20', ''));
        var seal_no = unescape(cells[9].replace('%20', '')).toUpperCase();
        var customs_seal_no = unescape(cells[10].replace('%20', '')).toUpperCase();
        var cargo_net_wgt = unescape(cells[11].replace('%20', ''));
        var cargo_pick_number = unescape(cells[12].replace('%20', ''));
        var cargo_bluk = unescape(cells[13].replace('%20', ''));
        var t_bill_no = unescape(cells[8].replace('%20', '')).toUpperCase();
        var t_eqp_typ = unescape(cells[3].replace('%20', '')).toUpperCase();
        var t_eqp_siz = unescape(cells[2].replace('%20', '')).toUpperCase();
        var t_opr_cod = unescape(cells[1].replace('%20', '')).toUpperCase();
        var t_customs_voyage_no = unescape(cells[15].replace('%20', '')).toUpperCase();
        var t_customs_ship_desc = unescape(cells[14].replace('%20', '')).toUpperCase();
        var t_customs_hs_cod = unescape(cells[20].replace('%20', '')).toUpperCase();
        var t_customs_load_port = unescape(cells[14].replace('%20', '')).toUpperCase();
        var t_customs_disc_port = unescape(cells[18].replace('%20', '')).toUpperCase();
        var t_cargo_goods_desc = unescape(cells[19].replace('%20', '')).toUpperCase();
        var t_customs_ship_no = unescape(cells[16].replace('%20', '')).toUpperCase();

        var t_ef_typ = unescape(cells[4].replace('%20', '')).toUpperCase();
        var t_trade_typ = unescape(cells[5].replace('%20', '')).toUpperCase();
        var t_danger_flag = unescape(cells[6].replace('%20', '')).toUpperCase();
        var t_trans_flag = unescape(cells[7].replace('%20', '')).toUpperCase();


        if (cargo_net_wgt.length == 0 || cargo_net_wgt == undefined) {
            cargo_net_wgt = 0;
        }
        if (cargo_pick_number.length == 0 || cargo_pick_number == undefined) {
            cargo_pick_number = 0;
        }
        if (cargo_bluk.length == 0 || cargo_bluk == undefined) {
            cargo_bluk = 0;
        }
        if (cntr_no == undefined) cntr_no = t_cntr_no;
        else { if (t_cntr_no.length > 0) cntr_no = t_cntr_no; }

        if (bill_no == undefined) bill_no = t_bill_no;
        else { if (t_bill_no.length > 0) bill_no = t_bill_no; }
        if (eqp_typ == undefined) eqp_typ = t_eqp_typ;
        else { if (t_eqp_typ.length > 0) eqp_typ = t_eqp_typ; }
        if (eqp_siz == undefined) eqp_siz = t_eqp_siz;
        else { if (t_eqp_siz.length > 0) eqp_siz = t_eqp_siz; }
        if (opr_cod == undefined) opr_cod = t_opr_cod;
        else { if (t_opr_cod.length > 0) opr_cod = t_opr_cod; }
        if (customs_voyage_no == undefined) customs_voyage_no = t_customs_voyage_no;
        else { if (t_customs_voyage_no.length > 0) customs_voyage_no = t_customs_voyage_no; }
        if (customs_ship_desc == undefined) customs_ship_desc = t_customs_ship_desc;
        else { if (t_customs_ship_desc.length > 0) customs_ship_desc = t_customs_ship_desc; }
        if (customs_hs_cod == undefined) customs_hs_cod = t_customs_hs_cod;
        else { if (t_customs_hs_cod.length > 0) customs_hs_cod = t_customs_hs_cod; }
        if (customs_load_port == undefined) customs_load_port = t_customs_load_port;
        else { if (t_customs_load_port.length > 0) customs_load_port = t_customs_load_port; }
        if (customs_disc_port == undefined) customs_disc_port = t_customs_disc_port;
        else { if (t_customs_disc_port.length > 0) customs_disc_port = t_customs_disc_port; }
        if (cargo_goods_desc == undefined) cargo_goods_desc = t_cargo_goods_desc;
        else { if (t_cargo_goods_desc.length > 0) cargo_goods_desc = t_cargo_goods_desc; }
        if (customs_ship_no == undefined) customs_ship_no = t_customs_ship_no;
        else { if (t_customs_ship_no.length > 0) customs_ship_no = t_customs_ship_no; }

        if (ef_typ == undefined) ef_typ = t_ef_typ;
        else { if (t_ef_typ.length > 0) ef_typ = t_ef_typ; }
        if (trade_typ == undefined) trade_typ = t_trade_typ;
        else { if (t_trade_typ.length > 0) trade_typ = t_trade_typ; }
        if (danger_flag == undefined) danger_flag = t_danger_flag;
        else { if (t_danger_flag.length > 0) danger_flag = t_danger_flag; }
        if (trans_flag == undefined) trans_flag = t_trans_flag;
        else { if (t_trans_flag.length > 0) trans_flag = t_trans_flag; }

        //格式转化
        if (ef_typ != '' && ef_typ.length > 0) {

            if (ef_typ.includes('空')) {
                ef_typ = 'E';
            } else if (ef_typ.toUpperCase() == 'E') {
                ef_typ = 'E';
            }

            if (ef_typ.includes('重')) {
                ef_typ = 'F';
            } else if (ef_typ.toUpperCase() == 'F') {
                ef_typ = 'F';
            }
        }

        if (trade_typ != '' && trade_typ.length > 0) {

            if (trade_typ.includes('内')) {
                trade_typ = 1;
            } else if (trade_typ.includes('外')) {
                trade_typ = 2;
            }
        }


        if (danger_flag != '' && danger_flag.length > 0) {
            if (danger_flag.includes('是')) {
                danger_flag = 1;
            } else if (danger_flag.includes('否')) {
                danger_flag = 0;
            }
        } else {
            danger_flag = 0;
        }


        if (trans_flag != '' && trans_flag.length > 0) {
            if (trans_flag.includes('是')) {
                trans_flag = 1;
            } else if (trans_flag.includes('否')) {
                trans_flag = 0;
            }
        } else {
            trans_flag = 0;
        }



        //destination_port
        var item = {
            cntr_id: guid(),
            od_seq: cur_ed_od_seq,
            cntr_no: cntr_no,
            eqp_typ: eqp_typ,
            eqp_siz: eqp_siz,
            seal_no: seal_no,
            customs_seal_no: customs_seal_no,
            bill_no: bill_no,
            cargo_net_wgt: cargo_net_wgt,
            cargo_pick_number: cargo_pick_number,
            cargo_bluk: cargo_bluk,
            opr_cod: opr_cod,
            customs_voyage_no: customs_voyage_no,
            customs_ship_desc: customs_ship_desc,
            customs_hs_cod: customs_hs_cod,
            customs_load_port: customs_load_port,
            customs_disc_port: customs_disc_port,
            cargo_goods_desc: cargo_goods_desc,
            customs_ship_no: customs_ship_no,
            pick_empty_no: '',
            cntr_gross_wgt: '',
            file_count: 0,
            ef_typ: ef_typ,
            trade_typ: trade_typ,
            danger_flag: danger_flag,
            trans_flag: trans_flag
        };

        arr.push(item);

        ef_typ = '';
        trade_typ = '';
        danger_flag = '';
        trans_flag = '';
    }
    return arr;
}
function format_3(rows, start_data_index) {
     
    
    //允许 合并导入: 箱尺寸，箱类型，提单号，箱主 , 报关船名，报关航次，报关船海关编号，报关装货区，报关卸货区，报关品名，报关品名编号 
    var cntr_no = undefined; 
    var eqp_typ = undefined;
    var eqp_siz = undefined;
    var bill_no = undefined;
    var opr_cod = undefined;
    var customs_voyage_no = undefined;
    var customs_ship_desc = undefined;
    var customs_hs_cod = undefined;
    var customs_load_port = undefined;
    var customs_disc_port = undefined;
    var cargo_goods_desc = undefined;
    var customs_ship_no = undefined;

    var arr = [];

    for (var ind = start_data_index; ind < rows.length; ind++) {
        var cells = rows[ind].split('%09');
        if (cells.length < 10) {
            continue;
        }
        var t_eqp_typ = unescape(cells[0].replace('%20', '')).toUpperCase();

        $.each(basesetting.container_siz_list, function (i, row) {
            if (t_eqp_typ.indexOf(row.cs_desc) > -1) {
                t_eqp_siz = row.cs_desc;
            }
        });
        $.each(basesetting.container_typ_list, function (i, row) {
            if (t_eqp_typ.indexOf(row.ct_name) > -1) {
                t_eqp_typ = row.ct_name;
            }
        });
        var t_opr_cod = unescape(cells[1].replace('%20', '')).toUpperCase();
        //var t_eqp_siz = unescape(cells[2].replace('%20', '')).toUpperCase(); 
        var t_bill_no = unescape(cells[2].replace('%20', '')).toUpperCase();
        var t_cntr_no = unescape(cells[3].replace('%20', ''));
        var seal_no = unescape(cells[4].replace('%20', '')).toUpperCase();
        var pick_empty_no = unescape(cells[5].replace('%20', '')).toUpperCase();

        var cargo_net_wgt = unescape(cells[6].replace('%20', ''));
        var cntr_gross_wgt = unescape(cells[7].replace('%20', ''));
        var cargo_pick_number = unescape(cells[8].replace('%20', ''));
        var cargo_bluk = unescape(cells[9].replace('%20', ''));
        var t_customs_ship_desc = unescape(cells[10].replace('%20', '')).toUpperCase();
        var t_customs_voyage_no = unescape(cells[11].replace('%20', '')).toUpperCase();
        var t_customs_ship_no = unescape(cells[12].replace('%20', '')).toUpperCase();
        var t_customs_load_port = unescape(cells[13].replace('%20', '')).toUpperCase();
        var t_customs_disc_port = unescape(cells[14].replace('%20', '')).toUpperCase();
        var t_cargo_goods_desc = unescape(cells[15].replace('%20', '')).toUpperCase();
        var t_customs_hs_cod = unescape(cells[16].replace('%20', '')).toUpperCase();



        if (cargo_net_wgt.length == 0 || cargo_net_wgt == undefined) {
            cargo_net_wgt = 0;
        }
        if (cargo_pick_number.length == 0 || cargo_pick_number == undefined) {
            cargo_pick_number = 0;
        }
        if (cargo_bluk.length == 0 || cargo_bluk == undefined) {
            cargo_bluk = 0;
        }
        if (cntr_no == undefined) cntr_no = t_cntr_no;
        else { if (t_cntr_no.length > 0) cntr_no = t_cntr_no; }

        if (bill_no == undefined) bill_no = t_bill_no;
        else { if (t_bill_no.length > 0) bill_no = t_bill_no; }
        if (eqp_typ == undefined) eqp_typ = t_eqp_typ;
        else { if (t_eqp_typ.length > 0) eqp_typ = t_eqp_typ; }
        if (eqp_siz == undefined) eqp_siz = t_eqp_siz;
        else { if (t_eqp_siz.length > 0) eqp_siz = t_eqp_siz; }
        if (opr_cod == undefined) opr_cod = t_opr_cod;
        else { if (t_opr_cod.length > 0) opr_cod = t_opr_cod; }
        if (customs_voyage_no == undefined) customs_voyage_no = t_customs_voyage_no;
        else { if (t_customs_voyage_no.length > 0) customs_voyage_no = t_customs_voyage_no; }
        if (customs_ship_desc == undefined) customs_ship_desc = t_customs_ship_desc;
        else { if (t_customs_ship_desc.length > 0) customs_ship_desc = t_customs_ship_desc; }
        if (customs_hs_cod == undefined) customs_hs_cod = t_customs_hs_cod;
        else { if (t_customs_hs_cod.length > 0) customs_hs_cod = t_customs_hs_cod; }
        if (customs_load_port == undefined) customs_load_port = t_customs_load_port;
        else { if (t_customs_load_port.length > 0) customs_load_port = t_customs_load_port; }
        if (customs_disc_port == undefined) customs_disc_port = t_customs_disc_port;
        else { if (t_customs_disc_port.length > 0) customs_disc_port = t_customs_disc_port; }
        if (cargo_goods_desc == undefined) cargo_goods_desc = t_cargo_goods_desc;
        else { if (t_cargo_goods_desc.length > 0) cargo_goods_desc = t_cargo_goods_desc; }
        if (customs_ship_no == undefined) customs_ship_no = t_customs_ship_no;
        else { if (t_customs_ship_no.length > 0) customs_ship_no = t_customs_ship_no; }


        //destination_port
        var item = {
            cntr_id: guid(),
            od_seq: cur_ed_od_seq,
            cntr_no: cntr_no,
            eqp_typ: eqp_typ,
            eqp_siz: eqp_siz,
            seal_no: seal_no,
            customs_seal_no: '',
            bill_no: bill_no,
            cargo_net_wgt: cargo_net_wgt,
            cargo_pick_number: cargo_pick_number,
            cargo_bluk: cargo_bluk,
            opr_cod: opr_cod,
            pick_empty_no: pick_empty_no,
            cntr_gross_wgt: cntr_gross_wgt,
            customs_voyage_no: customs_voyage_no,
            customs_ship_desc: customs_ship_desc,
            customs_hs_cod: customs_hs_cod,
            customs_load_port: customs_load_port,
            customs_disc_port: customs_disc_port,
            cargo_goods_desc: cargo_goods_desc,
            customs_ship_no: customs_ship_no,
            file_count: 0,
            ef_typ: '',
            trade_typ: '',
            danger_flag: '',
            trans_flag: ''
        };
        arr.push(item);
    }
    return arr;
}
function format_2(rows, start_data_index) {
     
    //允许 合并导入: 箱尺寸，箱类型，提单号，箱主 , 报关船名，报关航次，报关船海关编号，报关装货区，报关卸货区，报关品名，报关品名编号 
    var cntr_no = undefined; 
    var eqp_typ = undefined;
    var eqp_siz = undefined;
    var bill_no = undefined;
    var opr_cod = undefined;
    var customs_voyage_no = undefined;
    var customs_ship_desc = undefined;
    var customs_hs_cod = undefined;
    var customs_load_port = undefined;
    var customs_disc_port = undefined;
    var cargo_goods_desc = undefined;
    var customs_ship_no = undefined;
    var arr = [];

    for (var ind = start_data_index; ind < rows.length; ind++) {
        var cells = rows[ind].split('%09');
        if (cells.length < 10) {
            continue;
        }
        var t_cntr_no = unescape(cells[0].replace('%20', ''));
        var t_opr_cod = unescape(cells[1].replace('%20', '')).toUpperCase();
        var t_eqp_siz = unescape(cells[2].replace('%20', '')).toUpperCase();
        var t_eqp_typ = unescape(cells[3].replace('%20', '')).toUpperCase();
        var t_bill_no = unescape(cells[4].replace('%20', '')).toUpperCase();
        var pick_empty_no = unescape(cells[5].replace('%20', '')).toUpperCase();
        var seal_no = unescape(cells[6].replace('%20', '')).toUpperCase();
        var cargo_net_wgt = unescape(cells[7].replace('%20', ''));
        var cntr_gross_wgt = unescape(cells[8].replace('%20', ''));
        var cargo_pick_number = unescape(cells[9].replace('%20', ''));
        var cargo_bluk = unescape(cells[10].replace('%20', ''));
        var t_customs_ship_desc = unescape(cells[11].replace('%20', '')).toUpperCase();
        var t_customs_voyage_no = unescape(cells[12].replace('%20', '')).toUpperCase();
        var t_customs_ship_no = unescape(cells[13].replace('%20', '')).toUpperCase();
        var t_customs_load_port = unescape(cells[14].replace('%20', '')).toUpperCase();
        var t_customs_disc_port = unescape(cells[15].replace('%20', '')).toUpperCase();
        var t_cargo_goods_desc = unescape(cells[16].replace('%20', '')).toUpperCase();
        var t_customs_hs_cod = unescape(cells[17].replace('%20', '')).toUpperCase();


        if (cargo_net_wgt.length == 0 || cargo_net_wgt == undefined) {
            cargo_net_wgt = 0;
        }
        if (cargo_pick_number.length == 0 || cargo_pick_number == undefined) {
            cargo_pick_number = 0;
        }
        if (cargo_bluk.length == 0 || cargo_bluk == undefined) {
            cargo_bluk = 0;
        }
        if (cntr_no == undefined) cntr_no = t_cntr_no;
        else { if (t_cntr_no.length > 0) cntr_no = t_cntr_no; }

        if (bill_no == undefined) bill_no = t_bill_no;
        else { if (t_bill_no.length > 0) bill_no = t_bill_no; }
        if (eqp_typ == undefined) eqp_typ = t_eqp_typ;
        else { if (t_eqp_typ.length > 0) eqp_typ = t_eqp_typ; }
        if (eqp_siz == undefined) eqp_siz = t_eqp_siz;
        else { if (t_eqp_siz.length > 0) eqp_siz = t_eqp_siz; }
        if (opr_cod == undefined) opr_cod = t_opr_cod;
        else { if (t_opr_cod.length > 0) opr_cod = t_opr_cod; }
        if (customs_voyage_no == undefined) customs_voyage_no = t_customs_voyage_no;
        else { if (t_customs_voyage_no.length > 0) customs_voyage_no = t_customs_voyage_no; }
        if (customs_ship_desc == undefined) customs_ship_desc = t_customs_ship_desc;
        else { if (t_customs_ship_desc.length > 0) customs_ship_desc = t_customs_ship_desc; }
        if (customs_hs_cod == undefined) customs_hs_cod = t_customs_hs_cod;
        else { if (t_customs_hs_cod.length > 0) customs_hs_cod = t_customs_hs_cod; }
        if (customs_load_port == undefined) customs_load_port = t_customs_load_port;
        else { if (t_customs_load_port.length > 0) customs_load_port = t_customs_load_port; }
        if (customs_disc_port == undefined) customs_disc_port = t_customs_disc_port;
        else { if (t_customs_disc_port.length > 0) customs_disc_port = t_customs_disc_port; }
        if (cargo_goods_desc == undefined) cargo_goods_desc = t_cargo_goods_desc;
        else { if (t_cargo_goods_desc.length > 0) cargo_goods_desc = t_cargo_goods_desc; }
        if (customs_ship_no == undefined) customs_ship_no = t_customs_ship_no;
        else { if (t_customs_ship_no.length > 0) customs_ship_no = t_customs_ship_no; }


        //destination_port
        var item = {
            cntr_id: guid(),
            od_seq: cur_ed_od_seq,
            cntr_no: cntr_no,
            eqp_typ: eqp_typ,
            eqp_siz: eqp_siz,
            seal_no: seal_no,
            customs_seal_no: '',
            bill_no: bill_no,
            cargo_net_wgt: cargo_net_wgt,
            cargo_pick_number: cargo_pick_number,
            cargo_bluk: cargo_bluk,
            opr_cod: opr_cod,
            pick_empty_no: pick_empty_no,
            cntr_gross_wgt: cntr_gross_wgt,
            customs_voyage_no: customs_voyage_no,
            customs_ship_desc: customs_ship_desc,
            customs_hs_cod: customs_hs_cod,
            customs_load_port: customs_load_port,
            customs_disc_port: customs_disc_port,
            cargo_goods_desc: cargo_goods_desc,
            customs_ship_no: customs_ship_no,
            file_count: 0,
            ef_typ: '',
            trade_typ: '',
            danger_flag: '',
            trans_flag: ''
        };
        arr.push(item);
    }
    return arr;
} 
function format_1(rows, start_data_index) {
   
    //允许 合并导入: 箱尺寸，箱类型，提单号，箱主 , 报关船名，报关航次，报关船海关编号，报关装货区，报关卸货区，报关品名，报关品名编号 
    var cntr_no = undefined; 
    var eqp_typ = undefined;
    var eqp_siz = undefined;
    var bill_no = undefined;
    var opr_cod = undefined;
    var customs_voyage_no = undefined;
    var customs_ship_desc = undefined;
    var customs_hs_cod = undefined;
    var customs_load_port = undefined;
    var customs_disc_port = undefined;
    var cargo_goods_desc = undefined;
    var customs_ship_no = undefined;

    var arr = [];

    for (var ind = start_data_index; ind < rows.length; ind++) {
        var cells = rows[ind].split('%09');
        if (cells.length < 10) {
            continue;
        }

        var t_cntr_no = unescape(cells[0].replace('%20', ''));
        var seal_no = unescape(cells[5].replace('%20', '')).toUpperCase();
        var customs_seal_no = unescape(cells[6].replace('%20', '')).toUpperCase();
        var cargo_net_wgt = unescape(cells[7].replace('%20', ''));
        var cargo_pick_number = unescape(cells[8].replace('%20', ''));
        var cargo_bluk = unescape(cells[9].replace('%20', ''));
        var t_bill_no = unescape(cells[4].replace('%20', '')).toUpperCase();
        var t_eqp_typ = unescape(cells[3].replace('%20', '')).toUpperCase();
        var t_eqp_siz = unescape(cells[2].replace('%20', '')).toUpperCase();
        var t_opr_cod = unescape(cells[1].replace('%20', '')).toUpperCase();
        var t_customs_voyage_no = unescape(cells[11].replace('%20', '')).toUpperCase();
        var t_customs_ship_desc = unescape(cells[10].replace('%20', '')).toUpperCase();
        var t_customs_hs_cod = unescape(cells[16].replace('%20', '')).toUpperCase();
        var t_customs_load_port = unescape(cells[13].replace('%20', '')).toUpperCase();
        var t_customs_disc_port = unescape(cells[14].replace('%20', '')).toUpperCase();
        var t_cargo_goods_desc = unescape(cells[15].replace('%20', '')).toUpperCase();
        var t_customs_ship_no = unescape(cells[12].replace('%20', '')).toUpperCase();


        if (cargo_net_wgt.length == 0 || cargo_net_wgt == undefined) {
            cargo_net_wgt = 0;
        }
        if (cargo_pick_number.length == 0 || cargo_pick_number == undefined) {
            cargo_pick_number = 0;
        }
        if (cargo_bluk.length == 0 || cargo_bluk == undefined) {
            cargo_bluk = 0;
        }
        if (cntr_no == undefined) cntr_no = t_cntr_no;
        else { if (t_cntr_no.length > 0) cntr_no = t_cntr_no; }

        if (bill_no == undefined) bill_no = t_bill_no;
        else { if (t_bill_no.length > 0) bill_no = t_bill_no; }
        if (eqp_typ == undefined) eqp_typ = t_eqp_typ;
        else { if (t_eqp_typ.length > 0) eqp_typ = t_eqp_typ; }
        if (eqp_siz == undefined) eqp_siz = t_eqp_siz;
        else { if (t_eqp_siz.length > 0) eqp_siz = t_eqp_siz; }
        if (opr_cod == undefined) opr_cod = t_opr_cod;
        else { if (t_opr_cod.length > 0) opr_cod = t_opr_cod; }
        if (customs_voyage_no == undefined) customs_voyage_no = t_customs_voyage_no;
        else { if (t_customs_voyage_no.length > 0) customs_voyage_no = t_customs_voyage_no; }
        if (customs_ship_desc == undefined) customs_ship_desc = t_customs_ship_desc;
        else { if (t_customs_ship_desc.length > 0) customs_ship_desc = t_customs_ship_desc; }
        if (customs_hs_cod == undefined) customs_hs_cod = t_customs_hs_cod;
        else { if (t_customs_hs_cod.length > 0) customs_hs_cod = t_customs_hs_cod; }
        if (customs_load_port == undefined) customs_load_port = t_customs_load_port;
        else { if (t_customs_load_port.length > 0) customs_load_port = t_customs_load_port; }
        if (customs_disc_port == undefined) customs_disc_port = t_customs_disc_port;
        else { if (t_customs_disc_port.length > 0) customs_disc_port = t_customs_disc_port; }
        if (cargo_goods_desc == undefined) cargo_goods_desc = t_cargo_goods_desc;
        else { if (t_cargo_goods_desc.length > 0) cargo_goods_desc = t_cargo_goods_desc; }
        if (customs_ship_no == undefined) customs_ship_no = t_customs_ship_no;
        else { if (t_customs_ship_no.length > 0) customs_ship_no = t_customs_ship_no; }


        //destination_port
        var item = {
            cntr_id: guid(),
            od_seq: cur_ed_od_seq,
            cntr_no: cntr_no,
            eqp_typ: eqp_typ,
            eqp_siz: eqp_siz,
            seal_no: seal_no,
            customs_seal_no: customs_seal_no,
            bill_no: bill_no,
            cargo_net_wgt: cargo_net_wgt,
            cargo_pick_number: cargo_pick_number,
            cargo_bluk: cargo_bluk,
            opr_cod: opr_cod,
            customs_voyage_no: customs_voyage_no,
            customs_ship_desc: customs_ship_desc,
            customs_hs_cod: customs_hs_cod,
            customs_load_port: customs_load_port,
            customs_disc_port: customs_disc_port,
            cargo_goods_desc: cargo_goods_desc,
            customs_ship_no: customs_ship_no,
            pick_empty_no: '',
            cntr_gross_wgt: '',
            file_count: 0,
            ef_typ: '',
            trade_typ: '',
            danger_flag: '',
            trans_flag: ''
        };

        arr.push(item);
    }
    return arr;
}

function template_config(){
    var config = {
        template_array: [{
            tl_id: 1,
            tl_header: [{
                index: 0,
                val:'箱号',
            }, {
                index: 1,
                val: '箱主',
            }, {
                index: 2,
                val: '尺寸',
            }, {
                index: 3,
                val: '箱型',
            }, {
                index: 4,
                val: '提单号',
            }, {
                index: 5,
                val: '商封',
            }, {
                index: 6,
                val: '官封',
            }, {
                index: 7,
                val: '货重(KG)',
            }, {
                index: 8,
                val: '件数',
            }, {
                index: 9,
                val: '体积(CBM)',
            }, {
                index: 10,
                val: '报关船名',
            }, {
                index: 11,
                val: '报关航次',
            }, {
                index: 12,
                val: '报关船海关编码',
            }, {
                index: 13,
                val: '报关装货区',
            }, {
                index: 14,
                val: '报关卸货区',
            }, {
                index: 15,
                val: '报关品名',
            }, {
                index: 16,
                val: '报关品名编号',
            }
            ]
        }, {
            tl_id: 2,
            tl_header: [{
                index: 0,
                val: '箱号',
            }, {
                index: 1,
                val: '箱主',
            }, {
                index: 2,
                val: '尺寸',
            }, {
                index: 3,
                val: '箱型',
            }, {
                index: 4,
                val: '提单号',
            }, {
                index: 5,
                val: '空箱提单号',
            }, {
                index: 6,
                val: '铅封号',
            }, {
                index: 7,
                val: '货重(KG)',
            }, {
                index: 8,
                val: '箱货重(KG)',
            }, {
                index: 9,
                val: '件数',
            }, {
                index: 10,
                val: '体积(CBM)',
            }, {
                index: 11,
                val: '报关船名',
            }, {
                index: 12,
                val: '报关航次',
            }, {
                index: 13,
                val: '报关船海关编码',
            }, {
                index: 14,
                val: '报关装货区',
            }, {
                index: 15,
                val: '报关卸货区',
            }, {
                index: 16,
                val: '报关品名',
            }, {
                index: 17,
                val: '报关品名编号',
            }]
        }
        , {
            tl_id: 3,
            tl_header: [{
                index: 0,
                val: '箱型',
            }, {
                index: 1,
                val: '箱主',
            }, {
                index: 2,
                val: '提单号',
            }, {
                index: 3,
                val: '箱号',
            }, {
                index: 4,
                val: '铅封号',
            }, {
                index: 5,
                val: '空箱提单号',
            }, {
                index: 6,
                val: '货重(KG)',
            }, {
                index: 7,
                val: '箱货重(KG)',
            }, {
                index: 8,
                val: '件数',
            }, {
                index: 9,
                val: '体积(CBM)',
            }, {
                index: 10,
                val: '报关船名',
            }, {
                index: 11,
                val: '报关航次',
            }, {
                index: 12,
                val: '报关船海关编码',
            }, {
                index: 13,
                val: '报关装货区',
            }, {
                index: 14,
                val: '报关卸货区',
            }, {
                index: 15,
                val: '报关品名',
            }, {
                index: 16,
                val: '报关品名编号',
            }
            ]
        },
        {
            tl_id: 4,
            tl_header: [{
                index: 0,
                val: '箱号',
            }, {
                index: 1,
                val: '箱主',
            }, {
                index: 2,
                val: '尺寸',
            }, {
                index: 3,
                val: '箱型',
            }, {
                index: 4,
                val: '空重',
            }, {
                index: 5,
                val: '内外贸',
            }, {
                index: 6,
                val: '危险品',
            }, {
                index: 7,
                val: '中转',
            },
            {
                index: 8,
                val: '提单号',
            }, {
                index: 9,
                val: '商封',
            }, {
                index: 10,
                val: '官封',
            }, {
                index: 11,
                val: '货重(KG)',
            }, {
                index: 12,
                val: '件数',
            }, {
                index: 13,
                val: '体积(CBM)',
            }, {
                index: 14,
                val: '报关船名',
            }, {
                index: 15,
                val: '报关航次',
            }, {
                index: 16,
                val: '报关船海关编码',
            }, {
                index: 17,
                val: '报关装货区',
            }, {
                index: 18,
                val: '报关卸货区',
            }, {
                index: 19,
                val: '报关品名',
            }, {
                index: 20,
                val: '报关品名编号',
            }
            ]
        }]
    };

    return config;
}

function validate_cntr() {
     
    var exp = /^[A-Z]{4}[0-9]{7}$/; 

    //数据校验 
    //箱号校验
    var error_cntr1 = false
    var error_cntr2 = false;
    var error_cntr3 = false;
    var error_cntr_no = '';
   
    var error_cntr_siz = '';
    var error_cntr_typ = '';
    //var error_opr_cod = '';

    $.each(cur_order_cntr_list, function (k, cntr) {
        if (!exp.test(cntr.cntr_no)) {
            error_cntr1 = true;
            if (error_cntr_no.length == 0) {
                error_cntr_no = cntr.cntr_no;
            } else {
                error_cntr_no += ',' + cntr.cntr_no;
            }
        }

        var container_siz_list = basesetting.container_siz_list;
        var is_right_siz = false;
        $.each(container_siz_list, function (cs, csItem) {
            if (csItem.cs_desc == cntr.eqp_siz) {
                is_right_siz = true;
            }
        });

        if (!is_right_siz) {
            error_cntr2 = true;
            if (error_cntr_siz.length == 0) {
                error_cntr_siz = cntr.eqp_siz;
            } else {
                error_cntr_siz += ',' + cntr.eqp_siz;
            }
        }

        var container_typ_list = basesetting.container_typ_list;
        var is_right_typ = false;
        $.each(container_typ_list, function (tp, tpItem) {
            if (tpItem.ct_name == cntr.eqp_typ) {
                is_right_typ = true;
            }
        });

        if (!is_right_typ) {
            error_cntr3 = true;
            if (error_cntr_typ.length == 0) {
                error_cntr_typ = cntr.eqp_typ;
            } else {
                error_cntr_typ += ',' + cntr.eqp_typ;
            }
        }

        //var ship_company_list = basesetting.ship_company_list;
        //var is_right_opr_cod = false;
        //$.each(ship_company_list, function (oc, ocItem) {
        //    if (ocItem.sh_cod == cntr.opr_cod) {
        //        is_right_opr_cod = true;
        //    }
        //});

        //if (!is_right_opr_cod) {
        //    if (error_opr_cod.length == 0) {
        //        error_opr_cod = cntr.opr_cod;
        //    } else {
        //        error_opr_cod += ',' + cntr.opr_cod;
        //    }
        //}
    });

    var json_result = {
        msg: '',
        result:true
    };
   
    //箱号校验
    if (error_cntr1) {
        json_result.msg += '错误: 箱号检验不正确，箱号需要是4位字母+7位数字组成。错误箱号:' + error_cntr_no
        json_result.result = false;
    }

    //箱型校验 
    if (error_cntr2) {
        json_result.msg += '错误: 箱尺寸检验不正确，' + error_cntr_siz + '不存在'
        json_result.result = false; 
    }
    if (error_cntr3) {
        json_result.msg += '错误: 箱型检验不正确，' + error_cntr_siz + '不存在'
        json_result.result = false; 
    }

    return json_result;
}

//保存订单附加信息 
function update_order_addition_infos() {
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对运单和装箱信息进行编辑操作', 'error');
        return;
    }
    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'update_order_addition_infos',
        od_seq: cur_ed_od_seq,
        od_bill_typ: $('#ed_od_bill_typ').combobox('getValue'),
        od_sign_bill_typ: $('#ed_od_sign_bill_typ').combobox('getValue'),
        od_declare_customs_typ: $('#ed_od_declare_customs_typ').combobox('getValue'),
        od_carriage_typ: $('#ed_od_carriage_typ').combobox('getValue'),
        od_stuffing_container_typ: $('#ed_od_stuffing_container_typ').combobox('getValue'),
        od_stuffing_container_place: $('#ed_od_stuffing_container_place').val(),
        od_entry_tim_of_stuffing: $('#ed_od_entry_tim_of_stuffing').datebox('getValue'),
        od_out_tim_of_stuffing: $('#ed_od_out_tim_of_stuffing').datebox('getValue'),
    }, function (data) {
        if (data.result == 1) {
            $.messager.alert('提示', data.msg, 'info');
        } else {
            $.messager.alert('错误', data.msg, 'error');
        }
    }, true);

}

//**********************装箱图片*******************************

//初始化 订单集装箱信息
function init_tab_order_cntr_stuffing_info() {
    $("#tab_order_cntr_stuffing_info").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_order_cntr_stuffing_info_bar',
        fit: true,
        checkbox: true, 
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true, 
        columns: [[//显示的列 
            { title: '', field: 'cntr_id', width: 40, checkbox: true }
            , { field: 'cntr_no', title: '箱号',width:140, sortable: true, }
            , { field: 'file_count', title: '文件数',width:90, sortable: true,} 
        ]],
        onDblClickRow: function (index, row) {
            post('../Ashx/order.ashx', {
                rnd: Math.random(),
                action: 'get_order_cntr_file_info_by_cntr_id',
                od_seq: cur_ed_od_seq,
                cntr_id: row.cntr_id
            }, function (data) {
                $("#tab_dlg_od_cntr_stuffing_info_by_cntr_id").datagrid('loadData', data);
                $('#dlg_od_cntr_stuffing_info_cntr_id').val(row.cntr_id);
                $('#dlg_od_cntr_stuffing_info_by_cntr_id').dialog({
                    title: '集装箱-' + row.cntr_no + '图片资料',
                    iconCls: 'icon-box_picture',
                    autoOpen: false,
                    modal: true,
                    width: 600,
                    height: 460,
                    buttons: [
                        {
                            text: '上传图片..',
                            iconCls: 'icon-picture_add',
                            handler: function () {
                                $('#dlg_od_cntr_stuffing_info_by_cntr_id').dialog('close');
                                $('#file_upload').unbind('change').bind('change', function () {
                                    var file = $(this).get(0).files[0];
                                    //文件大小
                                    if (!/.(gif|jpg|jpeg|png|GIF|JPG|bmp|pdf|doc|docx|xls|xlsx)$/.test(file.name)) {
                                        $.messager.alert('错误', '文件类型必须是.gif,jpeg,jpg,png,bmp,pdf,xls,xlsx,doc,docx中的一种', 'error');
                                        return;
                                    } else {
                                        if (((file.size).toFixed(2)) >= (10 * 1024 * 1024)) {
                                            $.messager.alert('错误', '文件大小不能超过10M', 'error');
                                            return;
                                        }
                                        /*有同志上传图片文件过大，需要进行压缩*/
                                        if (/.(gif|jpg|jpeg|png|GIF|JPG|bmp)$/.test(file.name)) {
                                            var reader = new FileReader();
                                            (function (x) {
                                                reader.onload = function (e) {
                                                    //target_img.prop('src',this.result);
                                                    //压缩方法
                                                    _render(this.result, x);
                                                }
                                            })(file.name); 
                                            reader.readAsDataURL(file);
                                        } else {
                                            var myparams = {
                                                od_seq: cur_ed_od_seq,
                                                cntr_id: $('#dlg_od_cntr_stuffing_info_cntr_id').val(),
                                                mode: 'file', 
                                                rnd: Math.random(),
                                            };
                                            var url = '../Ashx/order.ashx?action=insert_order_cntr_file';

                                            insert_order_cntr_file(this, myparams, url);
                                        }
                                    }

                                });
                                $('#file_upload').click();
                            }
                        }
                        , {
                            text: '关闭',
                            iconCls: 'icon-cancel',
                            handler: function () {
                                $('#dlg_od_cntr_stuffing_info_by_cntr_id').dialog('close');
                            }
                        }]
                }).dialog('open');
            },true); 
        },
    });
}  

//初始化 对话框表格
function init_tab_dlg_od_cntr_stuffing_info_by_cntr_id() {
    $("#tab_dlg_od_cntr_stuffing_info_by_cntr_id").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
       // toolbar: '#tab_order_cntr_stuffing_bar',
        fit: true,
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[//显示的列 
            { title: '', field: 'file_seq', width: 40, checkbox: true }
            , {
                field: 'file_nam', title: '文件名', width: 460, formatter: function (value, row, index) {
                    return '<a class="order_cntr_stuffing_file" target="_blank" href="'+ row.file_path + '">' + value + '</a>';
                }
            }
            , {
                field: '_opr', title: '操作',width:50,
                formatter: function (value, row, index) {
                    return '<a data-od_seq="' + row.od_seq + '" data-cntr_id="' + row.cntr_id + '" data-file_seq="' + row.file_seq + '" class="order_cntr_stuffing_delet_btn"></a>';
                }
            }
        ]],
        onLoadSuccess: function (data) {
            $('.order_cntr_stuffing_delet_btn')
            .linkbutton({
                plain: true,
                iconCls: 'icon-delete',
            })
            .unbind('click')
            .bind('click', function () {
                if (!can_edit_order()) {
                    $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法执行此操作', 'error');
                    return;
                }
                if (cur_ed_od_seq == undefined) {
                    $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
                    return;
                }

                $.messager.confirm('删除提示', '确认要删除此集装箱文件数据数据',
                    function (r) {
                        if (r) {
                            post('../Ashx/order.ashx', {
                                rnd: Math.random(),
                                action: 'delete_order_cntr_file',
                                od_seq: $(this).data('od_seq'),
                                cntr_id: $(this).data('cntr_id'),
                                file_seq: $(this).data('file_seq'),
                            }, function (data) {
                                if (data.result == 1) {
                                    cur_order_cntr_stuffing_list = data.order_cntr_stuffing_list;
                                  //  mulit_search_order_cntr_stuffing_infos();
                                    $("#tab_dlg_od_cntr_stuffing_info_by_cntr_id").datagrid('loadData', { total: data.order_cntr_file_info_by_cntr_id_list.length, rows: data.order_cntr_file_info_by_cntr_id_list });
                                    $('#dlg_od_cntr_stuffing_info_by_cntr_id').dialog('open');
                                    $.messager.alert('提示', data.msg, 'info');
                                } else {
                                    $.messager.alert('错误', data.msg, 'error');
                                }
                            }, true);
                        }
                    });
            });
        }
    })
}
//上传文件 非图片性质
function insert_order_cntr_file(that, typedata, baseurl) {
    var formData = new FormData();
    var file = $(that).get(0).files[0];
    formData.append("params", JSON.stringify(typedata));
    formData.append("file", file); //传给后台的file的key值是可以自己定义的 
    $.messager.progress({
        title: '请稍后',
        msg: '努力加载中...'
    });
    $.ajax({
        url: baseurl,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            $.messager.progress('close');
            var data = JSON.parse(returndata);
            if (data.result == 1) {
                cur_order_cntr_stuffing_list = data.order_cntr_stuffing_list;
                //mulit_search_order_cntr_stuffing_infos();
                $("#tab_dlg_od_cntr_stuffing_info_by_cntr_id").datagrid('loadData', { total: data.order_cntr_file_info_by_cntr_id_list.length, rows: data.order_cntr_file_info_by_cntr_id_list });
                $('#dlg_od_cntr_stuffing_info_by_cntr_id').dialog('open');
                $.messager.alert('提示', data.msg, 'info');
            } else {
                $.messager.alert('错误', data.msg, 'error');
            } 
        },
        error: function (returndata) {
            $.messager.alert('错误', '文件上传失败', 'error'); 
        }

    });
}

//本地压缩图片 并上传图片

function _render(src, picname) {
    var image = new Image();
    image.onload = function () {
        //canvas 
        var canvas = document.createElement('canvas');;
        if (image.height > MAX_HEIGHT && image.height >= image.width) {
            image.width *= MAX_HEIGHT / image.height;
            image.height = MAX_HEIGHT;
        }
        if (image.width > MAX_HEIGHT && image.width >= image.height) {
            image.height *= MAX_HEIGHT / image.width;
            image.width = MAX_HEIGHT;
        }

        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        //$('#single_contract_imgfile').prop('src',canvas.toDataURL('image/png'));
        //data:image/jpeg;base64, 

        var blob = canvas.toDataURL();
        //需要把blob存储起来
        //data:image/jpeg;base64, 
        $.messager.progress({
            title: '请稍后',
            msg: '努力加载中...'
        });
        //上传
        $.post('../Ashx/order.ashx', {
            pic: blob,
            pic_name: picname,
            action: 'insert_order_cntr_file',
            od_seq: cur_ed_od_seq,
            cntr_id: $('#dlg_od_cntr_stuffing_info_cntr_id').val(),
            mode: 'pic',
            rnd: Math.random(),
        },
            function (returndata) {
                $.messager.progress('close');
                var data = JSON.parse(returndata);
                if (data.result == 1) {
                    cur_order_cntr_stuffing_list = data.order_cntr_stuffing_list;
                   // mulit_search_order_cntr_stuffing_infos();
                     
                    $("#tab_dlg_od_cntr_stuffing_info_by_cntr_id").datagrid('loadData', { total: data.order_cntr_file_info_by_cntr_id_list.length, rows: data.order_cntr_file_info_by_cntr_id_list });

                    $('#dlg_od_cntr_stuffing_info_by_cntr_id').dialog('open');
                    $.messager.alert('提示', data.msg, 'info');
                } else {
                    $.messager.alert('错误',data.msg,'error');
                } 
            });
    }
    image.src = src;
}

//*************************************************************