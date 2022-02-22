



//显示
function show_page_ship_cntr_info() {

    if (cur_ed_ship==undefined) {
        return;
    }

    if (cur_ed_ship.ship_no == undefined) {
        $.messager.alert('错误提示', '错误: 请先保存航次。', 'error');
        return;
    }

    $('.dv_edit_order_menu_tab').removeClass('dv_edit_order_menu_tab_focus');
    $('.dv_edit_order_menu_tab').eq(1).addClass('dv_edit_order_menu_tab_focus');

    var $old_page = $cur_page;
    $cur_page = $('div.page_ship_cntr_info');
    $old_page.fadeOut(50, function () {
        $cur_page.fadeIn(50, function () {
            $cur_page.layout({ fit: true });
            refresh_ship_cntr_tab(cur_ed_ship.ship_no);
        });
    });
}
//刷新
function refresh_ship_cntr_tab(ship_no) {
  
    post('../Ashx/ship.ashx', {
        rnd: Math.random(),
        action: 'get_ship_cntr',
        ship_no: ship_no
    }, function (data) {


        columns_fliters_of_cntr.columns_fliters('reset_target_data_and_clumns_fliter', data.rows);
        create_down_custom_cntr();
        var group_table_tr = $('.single_ship_voyage_group_cntr tbody tr').eq(0);
        
        var all_gd = '<td class="cls_total_title">总计:</td><td class="cls_total_value">' + data.group_cntr_desc + '</td>';

        group_table_tr.html('').html(all_gd);
         
    },true);
     
}

 //初始化
function init_tab_ship_cntr_tab() {

    var refresh_ship_cntr = true;
    $('#tab_ship_cntr').datagrid({
        data:[],
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
        toolbar: '#tab_ship_cntr_bar',
        fit: true,
        //pageNumber: pageNumber,
        //pageSize: pageSize,
        //pageList: [30, 60, 120], 
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ field: 'cntr_id', title: '',   checkbox: true }]],
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
                    field: 'od_no', title: '委托编号', sortable: true, width: 100
                }
                , {
                    field: 'load_port_desc', title: '装载港', sortable: true, width: 90,
                    styler: function (value, row, index) {
                        if (row.load_port_desc == undefined || row.load_port_desc == '') {
                            return 'background-color:#ffbfb4;color:#000;';
                        }
                    }
                }
                , { field: 'load_cy_fee_cu_code', title: '装CY付费', sortable: true, width: 80, }
                , {
                    field: 'disc_port_desc', title: '卸载港', sortable: true, width: 90,
                    styler: function (value, row, index) {
                        if (row.disc_port_desc == undefined || row.disc_port_desc == '') {
                            return 'background-color:#ffbfb4;color:#000;';
                        }
                    }
                }
                , { field: 'disc_cy_fee_cu_code', title: '卸CY付费', sortable: true, width: 80, }
                 
                , {
                    field: 'destination_port_desc', title: '目的港', sortable: true, width: 90,
                    styler: function (value, row, index) {
                        if (row.destination_port == undefined || row.destination_port == '') {
                            return 'background-color:#ffbfb4;color:#000;';
                        }
                    }
                }
                , {
                    field: 'cntr_no', title: '箱号', sortable: true, width: 96,
                    styler: function (value, row, index) {
                        if (value == undefined || value.length != 11) {
                            return 'background-color:#ff0401;color:#FFF;';
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
                    field: 'e_f_id', title: 'E/F', sortable: true, width: 48,
                }
                , {
                    field: 'cntr_pin_flag_desc', title: '拼箱', sortable: true, width: 45, align: 'center',

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
                , { field: 'cargo_net_wgt', title: '货重', sortable: true, width: 60, }
                , { field: 'cntr_gross_wgt', title: '箱毛重', sortable: true, width: 60, }
                , {
                    field: 'opr_cod', title: '箱主', sortable: true, width: 60,
                    styler: function (value, row, index) {
                        if (row.opr_cod_validate_result == 0) {
                            return 'background-color:#ff0401;color:#FFF;';
                        }
                    }
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
                , { field: 'cargo_pick_num', title: '货件数', sortable: true, width: 50, }
                , { field: 'cargo_goods_desc', title: '货名', sortable: true, width: 180, }
                , { field: 'next_ship_info', title: '后程船配载', sortable: true, width: 180, }
                //, { field: 'cargo_pick_num', title: '卸港后置船名(自定)', sortable: true, width: 50, }
                //, { field: 'cargo_goods_desc', title: '卸港后置船名(自定)', sortable: true, width: 180, }
                //, { field: 'cargo_pick_num', title: '货件数', sortable: true, width: 50, }
                //, { field: 'cargo_goods_desc', title: '货名', sortable: true, width: 180, }
        ]],
        onLoadSuccess: function (data) {
            if (!columns_fliters_of_cntr) {
                columns_fliters_of_cntr = $('#columns_fliters_of_cntr').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_ship_cntr'),
                    cur_cls_target_body: 'cls_ship_cntr'
                });
            }
        } ,
        onDblClickRow: function (index, row) {
            call_win_view_of_short_order_info(row.od_seq, row.od_no);
        } , 
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_ship_cntr'), rowIndex);
            refresh_cntr_list_footer();
        },
        onCheck: function (index, row) {
            refresh_cntr_list_footer();
        },
        onUncheck: function (index, row) {
            refresh_cntr_list_footer();
        },
        onCheckAll: function (index, row) {
            refresh_cntr_list_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_cntr_list_footer();
        },
    });
}
//底部统计
function refresh_cntr_list_footer() {
    var rows = $('#tab_ship_cntr').datagrid('getChecked');

    var count = rows.length;

    var data_group = [];

    if (rows.length > 0) {
        $.each(rows, function (i, item) {

            var has = false;

            $.each(data_group, function (j, gitem) {
                if (gitem.eqp_siz == item.eqp_siz &&
                    gitem.eqp_typ == item.eqp_typ) {
                    gitem.count += 1;
                    has = true;
                }
            });
            if (has == false) {
                data_group.push({
                    eqp_siz: item.eqp_siz,
                    eqp_typ: item.eqp_typ,
                    count: 1,
                });
            }
        });
    }
    var group_table_tr = $('.selected_cntr tbody tr').eq(0);
    if (data_group.length > 0) {

        var arr_gfd = ''
        $.each(data_group, function (i, item) {
            if (arr_gfd.length == 0) {
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

/*清空查询条件*/
function clear_mulit_conditions_ship_cntr_search() {
    columns_fliters_of_cntr.columns_fliters('clear');
}

//移除箱
function remove_ship_cntr() {
    var selected_rows = $('#tab_ship_cntr').datagrid('getChecked');

    if (selected_rows.length == 0) {
        $.messager.alert('错误提示','请选择要删除的集装箱信息','error');
        return;
    }

    var block_flag = false;

    var lock_od_nos = '';

    $.each(selected_rows, function (i, item) {
        if (item.od_status_id != 1) {
            if (lock_od_nos.length == 0) {
                lock_od_nos = item.od_no;
            } else {
                lock_od_nos += ',' + item.od_no;
            }
            block_flag = true;
        }
    });

    if (block_flag) {
        $.messager.alert('错误提示', lock_od_nos + '以上委托已锁定，无法删除集装箱信息', 'error');
        return;
    }

    $.messager.confirm('移除船舶集装箱提示', '移除集装箱将导致所属服务批次的集装箱信息被移除，确认是否继续？',
    function (r) {
        if (r) { 
            post('../Ashx/ship.ashx', {
                rnd: Math.random(),
                action: 'remove_ship_cntr',
                ship_no: cur_ed_ship.ship_no,
                json_cntr_of_ship_voyage: JSON.stringify({ cntr_list: selected_rows })
            }, function (data) {
                refresh_ship_cntr_tab(cur_ed_ship.ship_no);
            }, true);
        }
    });

}

//组织 menu_button下载框
function create_down_custom_cntr() {
    var data = columns_fliters_of_cntr.columns_fliters('get_target_data');

    if (data.length == 0) {
        return;
    }

    //id和desc 
    var custom_group = [];

    $.each(data, function (i, item) {
        var has = false;
        $.each(custom_group, function (j, jtem) {
            if (jtem.od_delegate_cu_id == item.od_delegate_cu_id && 
                jtem.load_port == item.load_port && 
                jtem.disc_port == item.disc_port) {
                has = true;
            }
        });

        if (!has) {
            custom_group.push({
                od_delegate_cu_id: item.od_delegate_cu_id,
                od_delegate_cu_desc: item.od_delegate_cu_desc,
                load_port: item.load_port,
                disc_port: item.disc_port,
                load_port_desc: item.load_port_desc,
                disc_port_desc: item.disc_port_desc
            })
        }
    });

    if (custom_group.length > 0) {

        if ($('#mm_down_custom_cntr').length == 1) {
            $('#mm_down_custom_cntr').remove();
        } 

        var mm_down_custom_cntr = '<div id="mm_down_custom_cntr" >';

        $.each(custom_group, function (i, item) {
            mm_down_custom_cntr += '<div  onclick=\"javascript:download_custom_cntr(' + item.od_delegate_cu_id + ',' + item.load_port + ',' + item.disc_port + ');\">' + item.od_delegate_cu_desc + '-[' + item.load_port_desc + '至' + item.disc_port_desc + ']</div>';
        });
        mm_down_custom_cntr += '</div>';
        $('body').append(mm_down_custom_cntr);
        $('#down_custom_cntr_menubutton').menubutton({
            menu: '#mm_down_custom_cntr',
        });



    } else {
        $('#down_custom_cntr_menubutton').linkbutton('disabled');
    }
     
}

//下载
function download_custom_cntr(od_delegate_cu_id,load_port,disc_port) {
    var myparams = {
        action: 'down_custom_cntr',
        ship_no: cur_ed_ship.ship_no,
        od_delegate_cu_id: od_delegate_cu_id,
        load_port: load_port,
        disc_port: disc_port,
    }
    window.open('../Ashx/ship.ashx?' + parseParams(myparams));
}