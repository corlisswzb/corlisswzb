
 
var tmp_combogrid_cu_id2 = undefined;
var tmp_combogrid_cu_desc2 = undefined;
var cur_edit_fee_rowindex_main2 = undefined;
function insert_service_route_part_of_bind_ship_voyage(transport_seq, target) {
    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对箱量进行编辑操作', 'error');
        return;
    }
    
    var od_route_typ = 3;
    var od_route_desc = convertToChinese(transport_seq) + '程船';

    if (cur_order_cntr_list.length == 0) {
       
        $.messager.confirm('绑定提示', '提示:没有配置本服务批次集装箱，无法进行订舱费及装卸费自动计算是否继续？',
         function (r) {
             if (r) { 
                 prebind_ship_voyage(od_route_desc, od_route_typ, 0);
             }
         }); 
    } else { 
        prebind_ship_voyage(od_route_desc, od_route_typ, 1);
    } 
    
    return;
    /*
        绑定船舶，直接存储到后台，无需通过 保存进行操作  ?? 

    */

     
}
//绑定船期
function prebind_ship_voyage(od_route_desc, od_route_typ, pre_computer_flag) {
    $('#dlg_pre_bind_ship_voyage_to_route').dialog({
        title: '船期绑定-' + od_route_desc,
        iconCls: 'icon-help',
        autoOpen: false,
        modal: true,
        width: 600,
        height: 360,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_pre_bind_ship_voyage_to_route').dialog('close');
                }
            }, {
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {

                    $('#dlg_pre_bind_ship_voyage_to_route').dialog('close'); 
                    bind_ship_voyage(od_route_desc, od_route_typ, pre_computer_flag);
                }
            }]
    }).dialog('open');
}
 
//初始化船期表 
function init_tab_dlg_choise_ship_voyage() {
    $("#tab_dlg_choise_ship_voyage").datagrid({
        url: '/Ashx/ship.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_ship_voyage_list',
            voyage_no: $("#search_voyage_no").val(),
            ship_id: $("#search_ship_id").data('ship_id'),
            vl_id: $("#search_voyage_line").combobox('getValue'),
            status_id: $("#search_status").combobox('getValue'),
            etd_begin: '',
            etd_end: ''
        },
        method: 'post',
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_dlg_choise_ship_voyage_bar',
        fit: true,
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ field: 'ship_no', rowspan: 2, title: '', rowspan: 2, checkbox: true }]],
        columns: [[//显示的列
            {
                field: 'status_id', rowspan: 2, title: '状态', width: 70,
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
                field: 'ship_desc', title: '船舶名称', sortable: true, width: 120,
                formatter: function (value, row, index) {
                    return row.ship_desc + '(' + row.ship_en_cod + ')';
                }
            }
            , { field: 'ship_cu_desc', title: '船东', width: 150, }
            , { field: 'voyage_no', title: '航次', width: 60, }
            , { field: 'vl_desc', title: '航线', width: 50, }
            , { field: 'start_area_desc', title: '起运地', width: 80, }
            , { field: 'end_area_desc', title: '目的地', width: 80, }
            , {
                field: 'cntr_num_u', title: '实配(U)', width: 60,
                styler: function (value, row, index) {
                    if (value != undefined && value > 0) {
                        return 'background-color:#f0bcff;color:#000;';
                    }
                }
            }
            , {
                field: 'cntr_num_t', title: '实配(T)', width: 60,
                styler: function (value, row, index) {
                    if (value != undefined && value > 0) {
                        return 'background-color:#f0bcff;color:#000;';
                    }
                }
            }

        ]]
    });
}

 
//绑定船期
function bind_ship_voyage(od_route_desc, od_route_typ, pre_computer_flag) {

    $('#btn_previous_dlg_od_ref_ship_voyage').hide();
    $('#btn_save_od_ref_ship_voyage').hide();
    $('#btn_next_dlg_od_ref_ship_voyage').show(); 

    $('#ed_load_port').combobox('setValue','');
    $('#ed_disc_port').combobox('setValue', '');
    $('#ed_destination_port_port').combobox('setValue', '');
    $('#ed_ship_freight_id').combobox('setValue', '');

    $('#ed_e_f_id').combobox('setValue', 'F');
    $('#ed_disc_port_flag').combobox('setValue', '0');
    $('#ed_load_port_flag').combobox('setValue', '0');
    $('#ed_danger_flag').combobox('setValue', '0');

    $('#ed_trade_id').combobox('setValue', cur_od_trade_typ_id);
 
    var cur_dlg_ref_ship_voyage_index = 1;

    $('#dlg_dv_choise_ship_voyage_1').panel('open');
    $('#dlg_dv_choise_ship_voyage_2').panel('close');
    $('#dlg_dv_choise_ship_voyage_3').panel('close');
    //$('#dlg_dv_choise_ship_voyage_4').panel('close');

    $('#btn_save_od_ref_ship_voyage').off('click').on('click',function(e){
        //保存
        var load_port_id = $('#ed_load_port').combobox('getValue');
        var load_port_desc = $('#ed_load_port').combobox('getText');

        var disc_port_id = $('#ed_disc_port').combobox('getValue'); 
        var disc_port_desc = $('#ed_disc_port').combobox('getText');


        var destination_port_id = $('#ed_destination_port').combobox('getValue');
        var destination_port_desc = $('#ed_destination_port').combobox('getText');

        var disc_trans_flag = $('#ed_disc_trans_flag').combobox('getValue');
        var disc_trans_flag_desc = $('#ed_disc_trans_flag').combobox('getText');

        var load_trans_flag = $('#ed_load_trans_flag').combobox('getValue');
        var load_trans_flag_desc = $('#ed_load_trans_flag').combobox('getValue');

        var ship_voyage_freight_id = $('#ed_ship_freight_id').combobox('getValue');
        var ship_voyage_freight_desc = $('#ed_ship_freight_id').combobox('getText');

        var e_f_id = $('#ed_e_f_id').combobox('getValue');
        var e_f_desc = $('#ed_e_f_id').combobox('getText');

        var trade_id = $('#ed_trade_id').combobox('getValue');
        var trade_desc = $('#ed_trade_id').combobox('getText');

        var danger_flag = $('#ed_danger_flag').combobox('getValue');
        var danger_flag_desc = $('#ed_danger_flag').combobox('getText');
        
        var od_route_tools_desc = $('#sh_ship_id').val();
        var od_route_tools_no = $('#sh_voyage_no').val();
        var od_route_tools_owner = $('#sh_ship_cu_id').data('ship_cu_id');
        var od_route_tools_owner_desc = $('#sh_ship_cu_id').val();
        
        if (destination_port_id != disc_port_id && disc_trans_flag == 0) {
            $.messager.alert('错误', '逻辑错误：目的港和卸载港不一致且标记未非卸载中转，请修改后尝试提交!', 'error');
            return;
        }
       
        $.messager.confirm('绑定提示', '确定要绑定船期及新增相关费用吗？',
        function (r) {
             if (r) {   
                $('#dlg_od_ref_ship_voyage').dialog('close'); 
                create_service_route_part(guid(),
                    od_route_typ,
                    od_route_tools_desc,
                    od_route_tools_no,
                    od_route_tools_owner,
                    od_route_tools_owner_desc,
                    load_port_id,
                    load_trans_flag == 1 ? ('中转' + load_port_desc) : load_port_desc,
                    disc_port_id,
                    disc_trans_flag == 1 ? ('中转' + disc_port_desc) : disc_port_desc,

                    $('#sh_etd').val(),
                    $('#sh_eta').val(),
                    undefined,
                    undefined,
                    $('#sh_vl_id').data('vl_id'),
                    $('#sh_vl_id').val(),
                    od_route_desc,
                    ship_voyage_freight_id,
                    ship_voyage_freight_desc,
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    e_f_id,
                    trade_id,
                    trade_desc,
                    danger_flag,
                    danger_flag_desc,
                    disc_trans_flag,
                    disc_trans_flag_desc,
                    load_trans_flag,
                    load_trans_flag_desc,
                    destination_port_id,
                    destination_port_desc,
                    $('#sh_ship_id').data('ship_no')
                );
                cur_route_of_ship_voyage.push({
                    ship_no: $('#sh_ship_id').data('ship_no'),
                    ship_desc:od_route_tools_desc,
                    voyage_no: od_route_tools_no,
                    load_port_desc: load_port_desc + (load_trans_flag==1?'-中转':''),
                    disc_port_desc: disc_port_desc + (disc_trans_flag == 1 ? '-中转' : ''),
                    freight_desc: ship_voyage_freight_desc,
                    e_f_id: e_f_id,
                    danger_flag_desc: danger_flag_desc,
                    trade_desc: trade_desc,
                    load_trans_flag_desc: load_trans_flag == 0 ?'':'是',
                    disc_trans_flag_desc: disc_trans_flag == 0 ? '' : '是',
                    destination_port_desc: destination_port_desc 
                });
                var fee_datas = $('#tab_dlg_fee_of_ship_voyage').datagrid('getData');

                if (fee_datas.rows.length > 0) {
                    //添加费用 
                    var new_od_fee_details_of_ship_voyage = fee_datas.rows;
                    var all_rows = $("#tab_od_service_sub_fee").datagrid('getRows');

                    if (new_od_fee_details_of_ship_voyage.length > 0) {
                        $.each(new_od_fee_details_of_ship_voyage, function (i, nitem) {
                            var new_row = $.extend(true, {}, nitem);

                            new_row.fee_seq = guid();
                          
                            new_row.fee_record_id = '';
                            new_row.fee_record_dat = '';
                            new_row.fee_business_lock_id = '';
                            new_row.fee_business_lock_dat = '';
                            new_row.fee_invoice_lock_id = '';
                            new_row.fee_invoice_lock_dat = '';
                            new_row.fee_status = 1;
                            new_row.woa_total_amount = '0';
                            new_row.fee_record_invoice_id = '';
                            new_row.fee_record_invoice_dat = '';
                            new_row.fee_update_id = '';
                            new_row.fee_update_dat = '';
                            new_row.fee_record_nam = '';
                            new_row.fee_business_lock_nam = '';
                            new_row.fee_invoice_lock_nam = '';
                            new_row.fee_record_invoice_nam = '';
                            new_row.fee_status_desc = '新增';
                            new_row.ship_no = $('#sh_ship_id').data('ship_no');
                            new_row.ship_desc = od_route_tools_desc;
                            new_row.voyage_no = od_route_tools_no;
                            new_row.fee_rel_bill_no = '';
                            new_row.fee_rel_opr_cod = '';

                            all_rows.push(new_row);
                        });
                    }
                    $("#tab_od_service_sub_fee").datagrid('loadData', all_rows);
                } 
            }   
        });
    });

    $('#btn_next_dlg_od_ref_ship_voyage').off('click').on('click', function (e) {
        
        if (cur_dlg_ref_ship_voyage_index == 2) {
            //保存
            var load_port_id = $('#ed_load_port').combobox('getValue');
            var load_port_desc = $('#ed_load_port').combobox('getText');

            var disc_port_id = $('#ed_disc_port').combobox('getValue');
            var disc_port_desc = $('#ed_disc_port').combobox('getText');


            var destination_port_id = $('#ed_destination_port').combobox('getValue');
            var destination_port_desc = $('#ed_destination_port').combobox('getText');

            var disc_trans_flag = $('#ed_disc_trans_flag').combobox('getValue');
            var disc_trans_flag_desc = $('#ed_disc_trans_flag').combobox('getText');

            var load_trans_flag = $('#ed_load_trans_flag').combobox('getValue');
            var load_trans_flag_desc = $('#ed_load_trans_flag').combobox('getValue');

            var ship_voyage_freight_id = $('#ed_ship_freight_id').combobox('getValue');
            var ship_voyage_freight_desc = $('#ed_ship_freight_id').combobox('getText');

            var e_f_id = $('#ed_e_f_id').combobox('getValue');
            var e_f_desc = $('#ed_e_f_id').combobox('getText');

            var trade_id = $('#ed_trade_id').combobox('getValue');
            var trade_desc = $('#ed_trade_id').combobox('getText');

            var danger_flag = $('#ed_danger_flag').combobox('getValue');
            var danger_flag_desc = $('#ed_danger_flag').combobox('getText');

            if (!load_port_id || load_port_id == '') {
                $.messager.alert('错误', '请设置本服务批次集装箱装载港!', 'error');
                return;
            }
            if (!disc_port_id || disc_port_id == '') {
                $.messager.alert('错误', '请设置本服务批次集装箱卸载港!', 'error');
                return;
            }

            if (!destination_port_id || destination_port_id == '') {
                $.messager.alert('错误', '请设置本服务批次集装箱目的港!', 'error');
                return;
            }

            if (!disc_trans_flag || disc_trans_flag == '') {
                $.messager.alert('错误', '卸中转不是指定值!', 'error');
                return;
            }
            if (!ship_voyage_freight_id || ship_voyage_freight_id == '') {
                $.messager.alert('错误', '请设置本服务批次集装箱运输协议!', 'error');
                return;
            }

            if (!e_f_id || e_f_id == '') {
                $.messager.alert('错误', '请设置本服务批次集装箱空重!', 'error');
                return;
            }

            if (!trade_id || trade_id == '') {
                $.messager.alert('错误', '请设置本服务批次集装箱内外贸!', 'error');
                return;
            }

            if (!danger_flag || danger_flag == '') {
                $.messager.alert('错误', '请设置本服务批次集装箱危险品属性!', 'error');
                return;
            }

            if (destination_port_id != disc_port_id && disc_trans_flag == 0) {
                $.messager.alert('错误', '逻辑错误：目的港和卸载港不一致且标记未非卸载中转，请修改后尝试提交!', 'error');
                return;
            } 
            //后台得到费用 
            post('../Ashx/order.ashx', {
                rnd: Math.random(),
                action: 'pre_computer_order_fee_of_ship_voyage',
                od_seq: cur_od_seq,
                od_service_seq: cur_od_service_seq,
                od_service_sub_seq: cur_od_service_sub_seq,
                
                ship_no: $('#sh_ship_id').data('ship_no'),
                load_port: load_port_id,
                disc_port: disc_port_id,
                freight_id: ship_voyage_freight_id,
                disc_trans_flag: disc_trans_flag,
                load_trans_flag: load_trans_flag,
                e_f_id: e_f_id,
                danger_flag: danger_flag,
                trade_id: trade_id
            }, function (data) {
                //这里返回的是表格 
                if (data.total > 0) {
                    $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('close');
                    cur_dlg_ref_ship_voyage_index += 1;
                    $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('open').panel({ fit: true });

                    $('#tab_dlg_fee_of_ship_voyage').datagrid('loadData', data);
                    $('#btn_save_od_ref_ship_voyage').show();
                    $('#btn_next_dlg_od_ref_ship_voyage').hide();
                    $('#btn_previous_dlg_od_ref_ship_voyage').show();

                } else {
                    $.messager.confirm('提示', '没有找到相关订舱费和装卸费（可能未配置集装箱）是否继续？',
                    function (r) {
                        if (r) {

                            $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('close');
                            cur_dlg_ref_ship_voyage_index += 1;
                            $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('open').panel({ fit: true });

                            $('#tab_dlg_fee_of_ship_voyage').datagrid('loadData', []);
                            $('#btn_save_od_ref_ship_voyage').show();
                            $('#btn_next_dlg_od_ref_ship_voyage').hide();
                            $('#btn_previous_dlg_od_ref_ship_voyage').show();
                        }
                    });

                     
                }
            }, true); 

        }
        
        if (cur_dlg_ref_ship_voyage_index == 1) {
            var selected_rows = $("#tab_dlg_choise_ship_voyage").datagrid('getChecked');

            if (selected_rows.length == 0) {
                $.messager.alert('错误', '请选择船期之后再确认!', 'error');
                return;
            }

            var row = selected_rows[0];

            var has = false;
            if (cur_route_of_ship_voyage.length > 0) {

                $.each(cur_route_of_ship_voyage, function (i, item) {
                    if (item.ship_no == row.ship_no) {
                        has = true;
                    }
                });
            }
            if (has) {
                $.messager.alert('错误', '同一条船不允许在同一个批次的运程明细中出现多次!', 'error');
                return;
            }

            //不能将同一个箱号 两次绑定在同一个船期上 

            post('../Ashx/order.ashx', {
                rnd: Math.random(),
                action: 'judge_bind_ship_voyage',
                ship_no: row.ship_no,
                od_seq: cur_od_seq,
                cur_od_service_seq: cur_od_service_seq,
                cur_od_service_sub_seq: cur_od_service_sub_seq,
            }, function (data) {
                if (data.result == 1) {
                    $('#sh_ship_id').data('ship_no', row.ship_no).val(row.ship_desc);
                    $('#sh_ship_en_cod').val(row.ship_en_cod);
                    $('#sh_ship_cu_id').data('ship_cu_id', row.ship_cu_id).val(row.ship_cu_desc);

                    $('#sh_voyage_no').val(row.voyage_no);
                    $('#sh_vl_id').data('vl_id', row.vl_id).val(row.vl_desc);
                    $('#sh_etd').val(dateformat(row.ETD, true));
                    $('#sh_eta').val(dateformat(row.ETA, true));
                    $('#sh_start_area_id').data('start_area_id', row.start_area_id).val(row.start_area_desc);
                    $('#sh_end_area_id').data('end_area_id', row.end_area_id).val(row.end_area_desc);

                    $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('close');
                    cur_dlg_ref_ship_voyage_index += 1;
                    $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('open').panel({ fit: true });

                    $('#btn_save_od_ref_ship_voyage').hide();
                    $('#btn_next_dlg_od_ref_ship_voyage').show();
                    $('#btn_previous_dlg_od_ref_ship_voyage').show();
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                }
            }, true);

            

        }
         
    });

    $('#btn_previous_dlg_od_ref_ship_voyage').off('click').on('click', function (e) {
        

        if (cur_dlg_ref_ship_voyage_index == 2) {
            $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('close');
            cur_dlg_ref_ship_voyage_index -= 1;
            $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('open').panel({ fit: true });

            $('#btn_save_od_ref_ship_voyage').hide();
            $('#btn_next_dlg_od_ref_ship_voyage').show();
            $('#btn_previous_dlg_od_ref_ship_voyage').hide();
        }
        //保存
        if (cur_dlg_ref_ship_voyage_index == 3) {
            $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('close');
            cur_dlg_ref_ship_voyage_index -= 1;
            $('#dlg_dv_choise_ship_voyage_' + cur_dlg_ref_ship_voyage_index).panel('open').panel({ fit: true });
             
            $('#btn_save_od_ref_ship_voyage').hide();
            $('#btn_next_dlg_od_ref_ship_voyage').show();
            $('#btn_previous_dlg_od_ref_ship_voyage').show();
        } 
    });

    $('#btn_close_dlg_od_ref_ship_voyage').off('click').on('click', function (e) {
        $('#dlg_od_ref_ship_voyage').dialog('close');
    });

    
    $('#dlg_od_ref_ship_voyage').dialog({
        title: '选择船期' + od_route_desc,
        iconCls: 'icon-query',
        autoOpen: false,
        modal: true,
        width: 800,
        height: 350, 
    }).dialog('open');
}


 
  
//初始化表格 应付表格
function init_tab_dlg_fee_of_ship_voyage() {
    $("#tab_dlg_fee_of_ship_voyage").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
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
        showFooter: true,
        frozenColumns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true }
            //, {
            //    field: 'fee_status_desc', title: '状态', sortable: true, width: 46,
            //    styler: function (value, row, index) {
            //        if (row.fee_change_lock_flag == 1) {
            //            return 'background-color:#ea60ff;color:#FFF;';
            //        } else {
            //            switch (row.fee_status) {
            //                case 1: return 'background-color:#fff;color:#000;';
            //                case 3: return 'background-color:#7af7f6;color:#000;';
            //                case 4: return 'background-color:#09c41f;color:#fff;';
            //                case 5: return 'background-color:#f3e676;color:#000;';
            //                case 9: return 'background-color:#ef1956;color:#fff;';
            //            }
            //        }
            //    }
            //}
            
        ]],
        columns: [[
            {
                field: 'fee_cu_desc', title: '结算单位', width: 210, sortable: true,
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
                                tmp_combogrid_cu_id2 = undefined;
                                tmp_combogrid_cu_desc2 = keyword;

                            },
                        },
                        onSelect: function (index, item) {              //选中处理   
                            tmp_combogrid_cu_id2 = item.cu_id;
                            tmp_combogrid_cu_desc2 = item.cu_name;
                            var ed = $('#tab_dlg_fee_of_ship_voyage').datagrid('getEditor', { index: cur_edit_fee_rowindex_main2, field: 'fee_cu_desc' });
                            $(ed.target).combogrid('setText', item.cu_name);
                            event.stopPropagation();
                        }
                    }
                }
            }, {
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
                field: 'fee_invoice_typ', title: '票率', sortable: true, width: 60,
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
                        panelWidth: 180,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            } 
            , {
                field: 'fee_number', title: '数量', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'fee_unit', title: '单位', sortable: true, width: 60,
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
                field: 'fee_price', title: '单价', sortable: true, width: 80,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
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
                field: 'fee_currency_rate', title: '汇率', sortable: true, width: 54,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', sortable: true, width: 165,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            } 
            , {
                field: 'fee_bak', title: '备注', width: 260, sortable: true,
                editor: {
                    type: 'text',
                },
            } 
        ]],
        onAfterEdit: function (index, row, changes) {
            cur_edit_fee_rowindex_main2 = undefined;
            //需要进行数据替换  
            //简单的说就是 要进行替换  
            //客户名称
            var has = false;

            row.fee_cu_desc = tmp_combogrid_cu_desc2;
            row.fee_cu_id = tmp_combogrid_cu_id2;
            tmp_combogrid_cu_id2 = undefined;
            tmp_combogrid_cu_desc2 = undefined;

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

            row.fee_amount = (row.fee_price * row.fee_number * row.fee_currency_rate).toFixed(2);
            $("#tab_dlg_fee_of_ship_voyage").datagrid('updateRow', {
                index: index,
                row: row
            });

            //每次保存完毕，都要对 汇总表进行更新 

            //重新计算 汇总 

            refresh_fee_group_tab();
        },
        onBeforeEdit: function (index, row) {
            if (cur_edit_fee_rowindex_main2 != index && cur_edit_fee_rowindex_main2 != undefined) {
                $('#tab_dlg_fee_of_ship_voyage').datagrid('endEdit', cur_edit_fee_rowindex_main2);
                cur_edit_fee_rowindex_main2 = index;
            }
        },
        onLoadSuccess: function (data) {
             
            //汇总信息 数量，小计，已收 

            var data_group = {
                fee_number: 0,
                fee_amount: '',
                woa_total_amount: ''

            };
            //币种和金额 

            var data_cr_symbol_of_fee_amount = [];
            var data_cr_symbol_of_woa_total_amount = [];

            $.each(data.rows, function (i, item) {
                var has_cr_fa = false;

                $.each(data_cr_symbol_of_fee_amount, function (fai, faitem) {
                    if (faitem.fee_currency_symbol == item.fee_currency_symbol) {
                        faitem.amount += parseFloat(item.fee_amount);
                        has_cr_fa = true;
                    }
                });
                if (!has_cr_fa) {
                    data_cr_symbol_of_fee_amount.push({
                        fee_currency_symbol: item.fee_currency_symbol,
                        amount: parseFloat(item.fee_amount)
                    });
                }
                var has_cr_wta = false;

                $.each(data_cr_symbol_of_woa_total_amount, function (wtai, wtaitem) {
                    if (wtaitem.fee_currency_symbol == item.fee_currency_symbol) {
                        wtaitem.amount += parseFloat(item.woa_total_amount);
                        has_cr_wta = true;
                    }
                });
                if (!has_cr_wta) {
                    data_cr_symbol_of_woa_total_amount.push({
                        fee_currency_symbol: item.fee_currency_symbol,
                        amount: parseFloat(item.woa_total_amount)
                    });
                }

                data_group.fee_number += parseFloat(item.fee_number);
            });
            var str_cr_symbol_of_fee_amount = '';

            $.each(data_cr_symbol_of_fee_amount, function (i, item) {
                if (str_cr_symbol_of_fee_amount.length == 0) {
                    str_cr_symbol_of_fee_amount = item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                } else {
                    str_cr_symbol_of_fee_amount += ',' + item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                }
            });

            var str_cr_symbol_of_woa_total_amount = '';
            $.each(data_cr_symbol_of_woa_total_amount, function (i, item) {
                if (str_cr_symbol_of_woa_total_amount.length == 0) {
                    str_cr_symbol_of_woa_total_amount = item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                } else {
                    str_cr_symbol_of_woa_total_amount += ',' + item.fee_currency_symbol + ':' + item.amount.toFixed(2);
                }
            });
            data_group.fee_amount = str_cr_symbol_of_fee_amount
            data_group.woa_total_amount = str_cr_symbol_of_woa_total_amount;
             
            $('#tab_dlg_fee_of_ship_voyage').datagrid('reloadFooter', [{
                fee_number: data_group.fee_number.toFixed(2),
                fee_amount: data_group.fee_amount,
                woa_total_amount: data_group.woa_total_amount
            }]);
            refresh_fee_of_ship_voyage_of_footer();

        },
        onClickRow: function (index, row) {
            if (cur_edit_fee_rowindex_main2 != undefined &&
                cur_edit_fee_rowindex_main2 != index) {
                $('.datagrid-row').unbind('click');
                $('#tab_dlg_fee_of_ship_voyage').datagrid('endEdit', cur_edit_fee_rowindex_main2);
            }
            if (cur_edit_fee_rowindex_main2 == undefined) {
                if (row.fee_status == 1) {
                    cur_edit_fee_rowindex_main2 = index;

                    tmp_combogrid_cu_id2 = row.fee_cu_id;
                    tmp_combogrid_cu_desc2 = row.fee_cu_desc;

                    $('#tab_dlg_fee_of_ship_voyage').datagrid('beginEdit', cur_edit_fee_rowindex_main2);

                    $('.datagrid-row-editing').unbind('click').bind('click', function () {
                        event.stopPropagation();
                    });
                    $(document).on('click', ':not(.datagrid-row)', function () {
                        if (cur_edit_fee_rowindex_main2 != undefined) {
                            $('.datagrid-row').unbind('click');
                            $('#tab_dlg_fee_of_ship_voyage').datagrid('endEdit', cur_edit_fee_rowindex_main2);
                        }
                    }); 
                    
                }
            }
            refresh_fee_of_ship_voyage_of_footer();
        },
        onCheck: function (index, row) {
            refresh_fee_of_ship_voyage_of_footer();
        },
        onUncheck: function (index, row) {
            refresh_fee_of_ship_voyage_of_footer();
        },
        onCheckAll: function (index, row) {
            refresh_fee_of_ship_voyage_of_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_fee_of_ship_voyage_of_footer();
        },
    });
}

function refresh_fee_of_ship_voyage_of_footer() {

    var rows = $('#tab_dlg_fee_of_ship_voyage').datagrid('getChecked');
    var panel_title = $('.cls_panel_pre_ship_voyage_pay .panel-title').eq(0);
    if (rows.length > 0) {


        var data_group = {
            fee_number: 0,
            fee_amount: '', 

        };
        //币种和金额 

        var data_cr_symbol_of_fee_amount = [];
        
        $.each(rows, function (i, item) {
            var has_cr_fa = false;

            $.each(data_cr_symbol_of_fee_amount, function (fai, faitem) {
                if (faitem.fee_currency_symbol == item.fee_currency_symbol) {
                    faitem.amount += parseFloat(item.fee_amount);
                    has_cr_fa = true;
                }
            });
            if (!has_cr_fa) {
                data_cr_symbol_of_fee_amount.push({
                    fee_currency_symbol: item.fee_currency_symbol,
                    amount: parseFloat(item.fee_amount)
                });
            }
            var has_cr_wta = false;

           
            data_group.fee_number += parseFloat(item.fee_number);
        });
        var str_cr_symbol_of_fee_amount = '';

        $.each(data_cr_symbol_of_fee_amount, function (i, item) {
            if (str_cr_symbol_of_fee_amount.length == 0) {
                str_cr_symbol_of_fee_amount = item.fee_currency_symbol + ':' + item.amount.toFixed(2);
            } else {
                str_cr_symbol_of_fee_amount += ',' + item.fee_currency_symbol + ':' + item.amount.toFixed(2);
            }
        });

       
        data_group.fee_amount = str_cr_symbol_of_fee_amount
       



        panel_title.html('<div style="float:left">应付费用</div><div style="float:right">选择:' + rows.length + '行,数量:' + data_group.fee_number + ' 金额:' + data_group.fee_amount +  '</div>');

    } else {
        panel_title.html('应付费用');
    }
}

//显示船舶集装箱明细 
function show_cntr_of_ship_voyage(od_route_seq, ship_no) {
    //有一个bug ,需要找到 相应的数据才行。。
    var ship_voyage_cntr_list = $.extend(true,[],cur_od_service_sub_collections.service_sub_ref_cntr_list);

    
    if (cur_route_of_ship_voyage.length > 0) {
        var _ship_voyage_info = undefined;

        $.each(cur_route_of_ship_voyage, function (i, item) {
            if (item.ship_no == ship_no) {
                _ship_voyage_info = item;
            }
        });
        if(_ship_voyage_info != undefined){
            $.each(ship_voyage_cntr_list, function (i, item) {
                item.e_f_id = _ship_voyage_info.e_f_id;
                item.trade_desc = _ship_voyage_info.trade_desc;
                item.freight_desc = _ship_voyage_info.freight_desc;
                item.load_port_desc = _ship_voyage_info.load_port_desc;
                item.disc_port_desc = _ship_voyage_info.disc_port_desc;
                item.destination_port_desc = _ship_voyage_info.destination_port_desc;
            });
        }
        
    }

    clumn_fliter_of_ship_voyage_cntr_list.columns_fliters('reset_target_data_and_clumns_fliter', ship_voyage_cntr_list);
    //od_route_seq 无用
    $('#dlg_cntr_ref_ship_voyage').dialog({
        title: '船舶集装箱明细',
        iconCls: 'icon-query',
        autoOpen: false,
        modal: true,
        width: 900,
        height: 460,
         
    }).dialog('open');
}

//初始化 批次集装箱明细
function init_dlg_tab_cntr_ref_ship_voyage() {
    $("#dlg_tab_cntr_ref_ship_voyage").datagrid({
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
        toolbar: '#dlg_tab_cntr_ref_ship_voyage_bar',
        fit: true,
        checkbox: true,
        showFooter: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ title: '', field: 'cntr_id', width: 40, checkbox: true }, ]],
        columns: [[//显示的列
            {
                field: 'cntr_order_by_id', rowspan: 2, title: '编号', width: 40,
            }
            , { field: 'bill_no', title: '提单号', width: 150, }
            , { field: 'cntr_no', title: '箱号', sortable: true, width: 100 }
            , { field: 'opr_cod', title: '箱主', sortable: true, width: 60 }
            , { field: 'eqp_siz', title: '尺寸', width: 40, }
            , { field: 'eqp_typ', title: '箱型', width: 40, }
            , { field: 'e_f_id', title: '空重', width: 40, }
            , { field: 'trade_desc', title: '内外贸', width: 50, }
            , { field: 'freight_desc', title: '条款', width: 50, }
            , { field: 'load_port_desc', title: '装载港', width: 50, }
            , { field: 'disc_port_desc', title: '卸载港', width: 50, }
            , { field: 'destination_port_desc', title: '目的港', width: 50, }
            , { field: 'seal_no', title: '商封号', width: 120, }
           
            , { field: 'pick_empty', title: '空箱提单号', width: 150, }
            , {
                field: 'cargo_net_wgt', title: '货重', width: 80,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'cargo_pick_number', title: '件数', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , {
                field: 'cargo_bluk', title: '体积', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
            , { field: 'cntr_gross_weight', title: '毛重', width: 60, }

        ]],
        onLoadSuccess: function (data) {
            if (!clumn_fliter_of_ship_voyage_cntr_list) {
                clumn_fliter_of_ship_voyage_cntr_list = $('#clumn_fliter_of_ship_voyage_cntr_list').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#dlg_tab_cntr_ref_ship_voyage'),
                    cur_cls_target_body: 'cls_ship_voyage_cntr_region'
                });
            } 
        },
    });
}
function clear_columns_filter_of_ship_voyage_cntr() {
    clumn_fliter_of_ship_voyage_cntr_list.columns_fliters('clear');
}
//费用关联船舶 
function pay_bind_order_fee_to_route() {
    if (cur_route_of_ship_voyage.length == 0) {
        $.messager.alert('错误', '当前服务批次没有绑定船期的运程!', 'error');
        return; 
    }

    var allfee_rows = $("#tab_od_service_sub_fee").datagrid('getRows');

    var fee_rows = $("#tab_od_service_sub_fee").datagrid('getChecked');

    if (fee_rows.length == 0) {
        $.messager.alert('错误', '请勾选费用之后在进行绑定操作!', 'error');
        return;
    } 
    $("#dlg_tab_ship_voyage_for_bind_fee").datagrid('loadData', cur_route_of_ship_voyage);
     
    $('#dlg_fee_bind_ship_voyage').dialog({
        title: '费用绑定船舶',
        iconCls: 'icon-link_add',
        autoOpen: false,
        modal: true,
        width: 650,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_fee_bind_ship_voyage').dialog('close');
                }
            }, {
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {
                    var rows = $("#dlg_tab_ship_voyage_for_bind_fee").datagrid('getChecked');
                    if (rows.length == 0) {
                        $.messager.alert('错误', '请勾选船期后再确认操作!', 'error');
                        return;
                    } 
                    var select_ship_voyage = rows[0];

                    $.each(allfee_rows, function (ind, frow) {
                        $.each(fee_rows, function (i, arow) {
                            if (frow.fee_seq == arow.fee_seq) {
                                frow.ship_no = select_ship_voyage.ship_no;
                                frow.ship_desc = select_ship_voyage.ship_desc;
                                frow.voyage_no = select_ship_voyage.voyage_no; 
                                $("#tab_od_service_sub_fee").datagrid('updateRow', { index: ind, row: frow });
                            } 
                        });
                    });
                     

                    $('#dlg_fee_bind_ship_voyage').dialog('close');
                }
            }]
    }).dialog('open');
}
//费用解除船舶关联 
function pay_unbind_order_fee_to_route() {
    var allfee_rows = $("#tab_od_service_sub_fee").datagrid('getRows');

    var fee_rows = $("#tab_od_service_sub_fee").datagrid('getChecked');

    if (fee_rows.length == 0) {
        $.messager.alert('错误', '请勾选费用之后在进行绑定操作!', 'error');
        return;
    }

    $.messager.confirm('解除绑定提示', '确定要解除相关费用的绑定船期吗？',
    function (r) {
        if (r) { 
            $.each(allfee_rows, function (ind, frow) {
                $.each(fee_rows, function (i, arow) {
                    if (frow.fee_seq == arow.fee_seq) {
                        frow.ship_no = '';
                        frow.ship_desc = '';
                        frow.voyage_no = '';
                        $("#tab_od_service_sub_fee").datagrid('updateRow', { index: i, row: frow });
                    }
                });
            });
        }
    }); 
}

//初始化 费用绑定船舶 
function init_dlg_tab_ship_voyage_for_bind_fee() {
    $("#dlg_tab_ship_voyage_for_bind_fee").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
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
        showFooter: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ title: '', field: 'ship_no', width: 40, checkbox: true }, ]],
        columns: [[//显示的列
             
            { field: 'ship_desc', title: '船名', sortable: true, width: 150, }
            , { field: 'voyage_no', title: '航次', sortable: true, width: 100 }
            , { field: 'e_f_id', title: '空重', sortable: true, width: 60 }
            , { field: 'trade_desc', title: '内外贸', sortable: true, width: 60, }
            , { field: 'load_port_desc', title: '装载港', sortable: true, width: 60, }
            , { field: 'disc_port_desc', title: '卸载港', sortable: true, width: 40, }
            , { field: 'destination_port_desc', title: '目的港', sortable: true, width: 40, }
            , { field: 'danger_flag_desc', title: '危险品', sortable: true, width: 50, }
            , { field: 'freight_desc', title: '条款', width: 50, }
             
        ]],
        onLoadSuccess: function (data) {
            
        },
    });
}
 