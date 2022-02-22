var cur_order_collections = undefined;
var cur_ed_od_seq = undefined; 
var cur_edit_cntr_group_rowindex_main = undefined;

var cur_od_servcie_change_flag = 0;

var cur_site = 1;
 
/********************订单基础资料和货物资料*******************************************/
//清空  
function clear_edit_order_form() {
    $('#tabs_main').tabs('select', 0);

    cur_ed_od_seq = undefined;
    cur_order_collections = undefined;
    cur_edit_cntr_group_rowindex_main = undefined;

    $('#ed_od_no').val('业务编号自动生成'); 
    $('#ed_od_fee_dat').datebox('setValue',  basesetting.sys_time); 
    $('#ed_od_status_id').val('新建业务');
    
    $('#ed_od_delegate_cu_id').combogrid('setText', '');
    $('#ed_od_delegate_cu_id').data('cu_id', '');

    $('#ed_od_delegate_relation_nam').val('');
    $('#ed_od_delegate_relation_phone').val('');
    $('#ed_od_delegate_relation_fax').val(''); 
    $('#ed_od_cargo_agent_cu_id').combogrid('setText', '');
    $('#ed_od_cargo_agent_cu_id').data('cu_id','');

    $('#ed_od_cargo_agent_relation_nam').val('');
    $('#ed_od_cargo_agent_relation_phone').val('');
    $('#ed_od_cargo_agent_relation_fax').val('');

    $('#ed_od_typ').combobox('setValue', ''); 
    $('#ed_od_project_typ').combobox('setValue', '');
    $('#ed_od_box_typ_id').combobox('setValue', '');

    $('#ed_od_trade_typ_id').combobox('setValue', '');
    $('#ed_od_i_e_id').combobox('setValue', '');
    $('#ed_od_freight_id').combobox('setValue', '');
    $('#ed_od_beg_place_id').data('pl_id', '');
    $('#ed_od_end_place_id').data('pl_id', '');
    $('#ed_od_beg_place_id').combogrid('setText', '');
    $('#ed_od_end_place_id').combogrid('setText', '');

    $('#ed_od_service_id').combobox('setValue', ''); 
    $('#ed_od_operation_id').val('');
    $('#ed_od_sales_id').combobox('setValue', '');

    $('#ed_od_record_by_nam').html('');
    $('#ed_od_record_dat').html('');
    $('#ed_od_manager_approval_by_nam').html('');
    $('#ed_od_manager_approval_dat').html('');
    $('#ed_od_busi_approval_by_nam').html('');
    $('#ed_od_busi_approval_dat').html('');
    $('#ed_od_leader_approval_by_nam').html('');
    $('#ed_od_leader_approval_dat').html('');
    $('#ed_od_bak_delegate').val('');
    $('#ed_od_bak_operation').val('');

    $('#od_water_way_flag').prop('checked',false);
    $('#od_sub_way_flag').prop('checked', false);
    $('#od_road_way_flag').prop('checked', false);
    $('#od_air_way_flag').prop('checked', false);
    //货物资料 
    $('#ed_od_cargo_typ').combogrid('setText', '');
    $('#ed_od_cargo_typ').data('pr_id', '');

    $('#ed_od_cargo_weight').val('0');
    $('#ed_od_cargo_number').val('0');
    $('#ed_od_cargo_packing').combobox('setValue', '');
    $('#ed_od_cargo_bluk').val('0');
    $('#ed_od_take_cargo_info').val('');
    $('#ed_od_delivery_cargo_info').val('');
    $('#ed_od_po_no').val('');
    $('#ed_od_so_no').val('');
    $('#ed_od_main_bill_no').val('');
    $('#ed_od_sub_bill_no').val('');

    $('#ed_od_bill_typ').combobox('setValue', '');
    $('#ed_od_sign_bill_typ').combobox('setValue', '');
    $('#ed_od_declare_customs_typ').combobox('setValue', '');
    $('#ed_od_carriage_typ').combobox('setValue', '');

    $('#ed_od_stuffing_container_typ').combobox('setValue', '');
    $('#ed_od_stuffing_container_place').val('');
    $('#ed_od_entry_tim_of_stuffing').datebox('setValue', '');
    $('#ed_od_out_tim_of_stuffing').datebox('setValue', '');
    $('#ed_order_cntr_search_like').val('');

    $("#tab_order_cntr_group").datagrid('loadData',[]);
    $("#tab_order_contract_files").datagrid('loadData',[]);
    //清空 合同附件 
    //暂时不做

    //清空集装箱界面的内容 
    clear_edit_order_cntr();
    clear_edit_order_booking_note();
    
    $('.ul_ss_menu .li_ss_menuitem').click(function () {
        $('.ul_ss_menu .li_ss_menuitem').removeClass('li_ss_menuitem_selected');
        $(this).addClass('li_ss_menuitem_selected');
    });
    
    $('#tabs_main').tabs('select',0);
    
}
//装在数据
function load_order_base_and_cargo_info(od_seq) {
    
    if (od_seq == undefined) {
        $('#btn_copy_from_other_order').linkbutton({ disabled: false });
        //新建
        clear_edit_order_form();
    } else { 
        $('#btn_copy_from_other_order').linkbutton({ disabled: true });
        //编辑
        post('../Ashx/order.ashx', {
            rnd: Math.random(),
            action: 'get_order_single_collections',
            od_seq: od_seq
        }, function (data) {
            cur_order_collections = data;

            var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];

            $('#ed_od_no').val(cur_order.od_no);
            $('#ed_od_fee_dat').datebox('setValue', dateformat(cur_order.od_fee_dat, true));

            $('#ed_od_status_id').val(cur_order.od_status_desc);
            $('#ed_od_delegate_cu_id').data('cu_id', cur_order.od_delegate_cu_id);
            $('#ed_od_delegate_cu_id').combogrid('setText', cur_order.od_delegate_cu_desc);
            $('#ed_od_delegate_relation_nam').val(cur_order.od_delegate_relation_nam);
            $('#ed_od_delegate_relation_phone').val(cur_order.od_delegate_relation_phone);
            $('#ed_od_delegate_relation_fax').val(cur_order.od_delegate_relation_fax);
            $('#ed_od_cargo_agent_cu_id').data('cu_id', cur_order.od_cargo_agent_cu_id);
            $('#ed_od_cargo_agent_cu_id').combogrid('setText', cur_order.od_cargo_agent_cu_desc);
            $('#ed_od_cargo_agent_relation_nam').val(cur_order.od_cargo_agent_relation_nam);
            $('#ed_od_cargo_agent_relation_phone').val(cur_order.od_cargo_agent_relation_phone);
            $('#ed_od_cargo_agent_relation_fax').val(cur_order.od_cargo_agent_relation_fax);

            $('#ed_od_typ').combobox('setValue', cur_order.od_typ);
            $('#ed_od_project_typ').combobox('setValue', cur_order.od_project_typ);
            $('#ed_od_box_typ_id').combobox('setValue', cur_order.od_box_typ_id);
            $('#ed_od_bk_commissioned_id2').combogrid('setText',cur_order.od_bk_commissioned_desc);
            $('#ed_od_bk_commissioned_id2').data('cu_id', cur_order.bk_commissioned_id);

            $('#ed_od_trade_typ_id').combobox('setValue', cur_order.od_trade_typ_id);
            $('#ed_od_i_e_id').combobox('setValue', cur_order.od_i_e_id);
            $('#ed_od_freight_id').combobox('setValue', cur_order.od_freight_id); 
            $('#ed_od_beg_place_id').data('pl_id', cur_order.od_beg_place_id);
            $('#ed_od_end_place_id').data('pl_id', cur_order.od_end_place_id);
            $('#ed_od_beg_place_id').combogrid('setText', cur_order.od_beg_place_desc);
            $('#ed_od_end_place_id').combogrid('setText', cur_order.od_end_place_desc);

            $('#ed_od_service_id').combobox('setValue', cur_order.od_service_id);
            $('#ed_od_operation_id').val(cur_order.od_operation_nam);
            $('#ed_od_sales_id').combobox('setValue', cur_order.od_sales_id);


            $('#ed_od_record_by_nam').html(cur_order.od_record_by_nam);
            $('#ed_od_record_dat').html(dateformat(cur_order.od_record_dat, true));
            $('#ed_od_manager_approval_by_nam').html('');
            $('#ed_od_manager_approval_dat').html('');
            $('#ed_od_busi_approval_by_nam').html('');
            $('#ed_od_busi_approval_dat').html('');
            $('#ed_od_leader_approval_by_nam').html('');
            $('#ed_od_leader_approval_dat').html('');
            $('#ed_od_bak_delegate').val(cur_order.od_bak_delegate);
            $('#ed_od_bak_operation').val(cur_order.od_bak_operation);

            //这里后台需要增加 查询字段  
            $('#od_water_way_flag').prop('checked', cur_order.od_water_way_flag == 1 ? true : false);
            $('#od_sub_way_flag').prop('checked', cur_order.od_sub_way_flag == 1 ? true : false);
            $('#od_road_way_flag').prop('checked', cur_order.od_road_way_flag == 1 ? true : false);
            $('#od_air_way_flag').prop('checked', cur_order.od_air_way_flag == 1 ? true : false);
            //货物资料 
            $('#ed_od_cargo_typ').data('pr_id', cur_order.od_cargo_typ);
            $('#ed_od_cargo_typ').combogrid('setText', cur_order.od_cargo_typ_desc);
            $('#ed_od_cargo_weight').val(cur_order.od_cargo_weight);
            $('#ed_od_cargo_number').val(cur_order.od_cargo_number);
            $('#ed_od_cargo_packing').combobox('setValue', cur_order.od_cargo_packing);
            $('#ed_od_cargo_bluk').val(cur_order.od_cargo_bluk);
            $('#ed_od_take_cargo_info').val(cur_order.od_take_cargo_info);
            $('#ed_od_delivery_cargo_info').val(cur_order.od_delivery_cargo_info);
            $('#ed_od_po_no').val(cur_order.od_po_no);
            $('#ed_od_so_no').val(cur_order.od_so_no);
            $('#ed_od_main_bill_no').val(cur_order.od_main_bill_no);
            $('#ed_od_sub_bill_no').val(cur_order.od_sub_bill_no);

           

            // 箱量  
            var order_cntr_group_info = $.extend(true,[], cur_order_collections.order_cntr_group_info);
            if (order_cntr_group_info.length == 0) {
                $("#tab_order_cntr_group").datagrid('loadData', { total: 0, rows: [] });
            } else {
                $("#tab_order_cntr_group").datagrid('loadData', { total: order_cntr_group_info.length, rows: order_cntr_group_info });
            }
           
            //合同附件 
            var order_contract_file_info = $.extend(true,[], cur_order_collections.order_contract_file_info);
            if (order_contract_file_info.length == 0) {
                $("#tab_order_contract_files").datagrid('loadData', { total: 0, rows: [] });
            } else {
                $("#tab_order_contract_files").datagrid('loadData', { total: order_contract_file_info.length, rows: order_contract_file_info });
            } 
            //需要集成集装箱信息返回 
            //集成 bn内容 返回  
            //加载后面的内容 
            load_order_cntr_info(cur_order_collections);

            load_order_booking_note(cur_order_collections);
        });

        
        load_page_fee_info();
        
        load_page_service_info(false);
    }

    $('#btn_copy_from_other_order').bind('click', function () { 
        if ($(this).linkbutton('options').disabled == false) {

            //事件处理代码
            //打开选择对话框 
            copy_insert_order();

        }  
    });
}

//显示页面  
function show_page_order_base_info() {
    cur_site = 1;


    //初始化表格
    
    $('.dv_edit_order_menu_tab').removeClass('dv_edit_order_menu_tab_focus');
    $('.dv_edit_order_menu_tab').eq(0).addClass('dv_edit_order_menu_tab_focus');

    $('div.page_order_cntr_info').fadeOut();
    $('div.page_order_service_info').fadeOut();
    $('div.page_order_booking_note').fadeOut();
    $('div.page_order_customs').fadeOut();
    $('div.page_order_fee_info').fadeOut();

    if ($cur_page == undefined) {
        $cur_page = $('div.page_order_base_info');
        $cur_page.fadeIn(50, function () {
            $cur_page.layout({ fit: true }); 
        });
    } else {
        var $old_page = $cur_page;
        $cur_page = $('div.page_order_base_info');
        $old_page.fadeOut(50, function () {
            $cur_page.fadeIn(50, function () {
                $cur_page.layout({ fit: true }); 
            });
        });
    }

    
}
//新建订单
function insert_new_order() {
    if (cur_ed_od_seq == undefined) {
        $.messager.confirm('新建订单提示', '你正在执行新建订单操作，请确认当前订单已编辑保存？',
        function (r) {
            if (r) {
                edit_order(undefined);
            }
        });
    } else {
        edit_order(undefined);
    } 
}

//保存订单 
function save_order() { 
    var data_cntr_group = $("#tab_order_cntr_group").datagrid('getRows');
    var data_contract_file = $("#tab_order_contract_files").datagrid('getRows');  
    var data_cntr = $("#tab_order_cntr").datagrid('getData').rows;
    if (data_cntr != undefined && data_cntr.length > 0) {
        var va_cntr = validate_cntr(data_cntr); 
        if (va_cntr.result == false) {
            $('#tabs_main').tabs('select', 1);
            $.messager.alert('保存订单集装箱信息错误', va_cntr.msg, 'error');
            return;
        }
    } 
    var par = {
        rnd: Math.random(),
        od_seq: cur_ed_od_seq,
        action: cur_ed_od_seq == undefined ? 'insert_order' : 'update_order',
        od_project_typ: $('#ed_od_project_typ').combobox('getValue'),
        od_typ: $('#ed_od_typ').combobox('getValue'),
        od_cargo_agent_cu_id: $('#ed_od_cargo_agent_cu_id').data('cu_id'),
        od_delegate_cu_id: $('#ed_od_delegate_cu_id').data('cu_id'),

        od_cargo_agent_cu_desc: $('#ed_od_cargo_agent_cu_id').combogrid('getText'),
        od_delegate_cu_desc: $('#ed_od_delegate_cu_id').combogrid('getText'),

        od_cargo_agent_relation_nam: $('#ed_od_cargo_agent_relation_nam').val(),
        od_cargo_agent_relation_phone: $('#ed_od_cargo_agent_relation_phone').val(),
        od_cargo_agent_relation_fax: $('#ed_od_cargo_agent_relation_fax').val(),
        od_delegate_relation_nam: $('#ed_od_delegate_relation_nam').val(),
        od_delegate_relation_phone: $('#ed_od_delegate_relation_phone').val(),
        od_delegate_relation_fax: $('#ed_od_delegate_relation_fax').val(),
        od_fee_dat: $('#ed_od_fee_dat').datebox('getValue'),
        od_service_id: $('#ed_od_service_id').combobox('getValue'), 
        od_sales_id: $('#ed_od_sales_id').combobox('getValue'),
        od_service_desc: $('#ed_od_service_id').combobox('getText'),
        od_sales_desc: $('#ed_od_sales_id').combobox('getText'),

        od_bak_delegate: $('#ed_od_bak_delegate').val(),
        od_bak_operation: $('#ed_od_bak_operation').val(),
        od_freight_id: $('#ed_od_freight_id').combobox('getValue'),

        od_trade_typ_id: $('#ed_od_trade_typ_id').combobox('getValue'),
        od_beg_place_id: $('#ed_od_beg_place_id').data('pl_id'),
        od_end_place_id: $('#ed_od_end_place_id').data('pl_id'),
        od_beg_place_desc: $('#ed_od_beg_place_id').combogrid('getText'),
        od_end_place_desc: $('#ed_od_end_place_id').combogrid('getText'),

        od_i_e_id: $('#ed_od_i_e_id').combobox('getValue'),

        od_box_typ_id: $('#ed_od_box_typ_id').combobox('getValue'),
        od_cargo_typ: $('#ed_od_cargo_typ').combogrid('getText'),
    
        od_cargo_bluk: $('#ed_od_cargo_bluk').val(),
        od_cargo_weight: $('#ed_od_cargo_weight').val(),
        od_cargo_number: $('#ed_od_cargo_number').val(),
        od_cargo_packing: $('#ed_od_cargo_packing').combobox('getValue'),
        od_take_cargo_info: $('#ed_od_take_cargo_info').val(),
        od_delivery_cargo_info: $('#ed_od_delivery_cargo_info').val(),
        od_po_no: $('#ed_od_po_no').val(),
        od_so_no: $('#ed_od_so_no').val(),
        od_main_bill_no: $('#ed_od_main_bill_no').val(),
        od_sub_bill_no: $('#ed_od_sub_bill_no').val(),

        bk_commissioned_id: $('#ed_od_bk_commissioned_id').data('cu_id'),
        bk_commissioned_desc: $('#ed_od_bk_commissioned_id').combogrid('getText'),

        bk_shipper_desc: $('#ed_bk_shipper_desc').val(),
        bk_consignee_desc: $('#ed_bk_consignee_desc').val(),
        bk_notify_desc: $('#ed_bk_notify_desc').val(), 
        
        bk_commissioned_to: $('#ed_bk_commissioned_to').val(),
        bk_commissioned_tel: $('#ed_bk_commissioned_tel').val(),
        bk_commissioned_fax: $('#ed_bk_commissioned_fax').val(),
        bk_booking_numbe: $('#ed_bk_booking_numbe').val(),
        //bk_job_number : $('#dasdfas').val(),
        bk_delegate_tel: $('#ed_bk_delegate_tel').val(),
        bk_delegate_fax: $('#ed_bk_delegate_fax').val(),
        bk_delegate_ctc: $('#ed_bk_delegate_ctc').val(),
        bk_delegate_date: $('#ed_bk_delegate_date').datebox('getValue'),
        bk_carrier_id: $('#ed_bk_carrier_id').combobox('getValue'),
        bk_closing_date: $('#ed_bk_closing_date').datebox('getValue'),
        bk_etd: $('#ed_bk_etd').datebox('getValue'),

        bk_port_of_loading_id: $('#ed_bk_port_of_loading_id').data('pl_id'),
        bk_port_of_transit_id: $('#ed_bk_port_of_transit_id').data('pl_id'),
        bk_port_of_discharge_id: $('#ed_bk_port_of_discharge_id').data('pl_id'),
        bk_port_of_loading_desc: $('#ed_bk_port_of_loading_id').combogrid('getText'),
        bk_port_of_transit_desc: $('#ed_bk_port_of_transit_id').combogrid('getText'),
        bk_port_of_discharge_desc: $('#ed_bk_port_of_discharge_id').combogrid('getText'),

        bk_freight_term_id: $('#ed_bk_freight_term_id').combobox('getValue'),
        bk_pay_method_id: $('#ed_bk_pay_method_id').combobox('getValue'),
        bk_shipping_marks_and_no_desc: $('#ed_bk_shipping_marks_and_no_desc').val(),
        bk_freight_package_desc: $('#ed_bk_freight_package_desc').val(),
        bk_description_of_goods_desc: $('#ed_bk_description_of_goods_desc').val(),
        bk_gross_weight: $('#ed_bk_gross_weight').val(),
        bk_remarks: $('#ed_bk_remarks').val(),
        bk_measurement: $('#ed_bk_measurement').val(),

        od_bill_typ: $('#ed_od_bill_typ').combobox('getValue'),
        od_sign_bill_typ: $('#ed_od_sign_bill_typ').combobox('getValue'),
        od_declare_customs_typ: $('#ed_od_declare_customs_typ').combobox('getValue'),
        od_carriage_typ: $('#ed_od_carriage_typ').combobox('getValue'),
        od_stuffing_container_typ: $('#ed_od_stuffing_container_typ').combobox('getValue'),
        od_stuffing_container_place: $('#ed_od_stuffing_container_place').val(),
        od_entry_tim_of_stuffing: $('#ed_od_entry_tim_of_stuffing').datebox('getValue'),
        od_out_tim_of_stuffing: $('#ed_od_out_tim_of_stuffing').datebox('getValue'),

        json_cntr_list: JSON.stringify({ order_cntr_list: data_cntr }),
        json_group_cntr: JSON.stringify({ group_cntr: data_cntr_group }),
        json_contract_file: JSON.stringify({ contract_file: data_contract_file })
    };
    //必须选择 od_typ 其他随意 
    /*
     新建时，必须选择 OD_TYP  
     以及 od_fee_dat 
     
     对于 combogrid 有可能 有 text，但是没有 value 
    */

    if (par.od_typ == undefined || par.od_typ == '' || isNaN(par.od_typ)) {
        $.messager.alert('错误', '订单新建，必须选择业务类型', 'error');
        return;
    }
    if (par.od_fee_dat == undefined || par.od_fee_dat == '' || par.od_fee_dat.length == 0) {
        $.messager.alert('错误', '订单新建，必须设置业务时间', 'error');
        return;
    }
     
    if (par.od_cargo_agent_cu_id == undefined || par.od_cargo_agent_cu_id == '') {
        if (par.od_cargo_agent_cu_desc.length > 0) {
            $.messager.alert('错误', '错误: 供货客户不是预设值!', 'error');
            return;
        }  
    }
    if (par.od_delegate_cu_id == undefined || par.od_delegate_cu_id == '') {
        if (par.od_delegate_cu_desc.length > 0) {
            $.messager.alert('错误', '错误: 委托单位不是是预设值!', 'error');
            return;
        } else {
            $.messager.alert('错误', '错误: 委托单位必须选择，且必须是预设值!', 'error');
            return;
        } 
    }
    if (par.od_beg_place_id == undefined || par.od_beg_place_id == '') {
        if (par.od_beg_place_desc.length > 0) {
            $.messager.alert('错误', '错误: 起运地不是预设值!', 'error');
            return;
        }
    }
    if (par.od_end_place_id == undefined || par.od_end_place_id == '') {
        if (par.od_end_place_desc.length > 0) {
            $.messager.alert('错误', '错误: 交货地不是预设值!', 'error');
            return;
        }
    }

    if (par.bk_commissioned_id == undefined || par.bk_commissioned_id == '') {
        if (par.bk_commissioned_desc.length > 0) {
            $.messager.alert('错误', '错误: 受托单位不是预设值!', 'error');
            return;
        }
    }

    if (par.bk_port_of_loading_id == undefined || par.bk_port_of_loading_id == '') {
        if (par.bk_port_of_loading_desc.length > 0) {
            $.messager.alert('错误', '错误: 订舱单起运港不是预设值!', 'error');
            return;
        }
    }
    if (par.bk_port_of_transit_id == undefined || par.bk_port_of_transit_id == '') {
        if (par.bk_port_of_transit_desc.length > 0) {
            $.messager.alert('错误', '错误: 订舱单中转港不是预设值!', 'error');
            return;
        }
    }
    if (par.bk_port_of_discharge_id == undefined || par.bk_port_of_discharge_id == '') {
        if (par.bk_port_of_discharge_desc.length > 0) {
            $.messager.alert('错误', '错误: 订舱单目的港不是预设值!', 'error');
            return;
        }
    }
    
    if (par.od_service_id == undefined || par.od_service_id == '') { 
         
        $.messager.alert('错误', '错误: 客服必选填写!', 'error');
        return; 
        
    } 
    if (par.od_sales_id == undefined || par.od_sales_id == '') { 
        $.messager.alert('错误', '错误: 销售必选填写!', 'error');
        return; 
    }

     

     

    post('../Ashx/order.ashx', par, function (data) {
        if (data.result == 1) {
            edit_order(data.od_seq);
            $.messager.alert('提示', data.msg, 'info');
        } else {
            $.messager.alert('错误', data.msg, 'error');
        }
    }, true);

}



//比较 当前数据和读取数据
function issame_order_base() {
    
    if (!can_edit_order()) { return true;}
    
    var data_cntr_group = $("#tab_order_cntr_group").datagrid('getRows');
    var data_contract_file = $("#tab_order_contract_files").datagrid('getRows');
    var data_cntr = $("#tab_order_cntr").datagrid('getRows');

    var now_order = { 
        od_seq: cur_ed_od_seq, 
        od_project_typ: $('#ed_od_project_typ').combobox('getValue'),
        od_typ: $('#ed_od_typ').combobox('getValue'),
        od_cargo_agent_cu_id: $('#ed_od_cargo_agent_cu_id').data('cu_id'),
        od_delegate_cu_id: $('#ed_od_delegate_cu_id').data('cu_id'), 
        od_cargo_agent_relation_nam: $('#ed_od_cargo_agent_relation_nam').val(),
        od_cargo_agent_relation_phone: $('#ed_od_cargo_agent_relation_phone').val(),
        od_cargo_agent_relation_fax: $('#ed_od_cargo_agent_relation_fax').val(),
        od_delegate_relation_nam: $('#ed_od_delegate_relation_nam').val(),
        od_delegate_relation_phone: $('#ed_od_delegate_relation_phone').val(),
        od_delegate_relation_fax: $('#ed_od_delegate_relation_fax').val(),
        od_fee_dat: $('#ed_od_fee_dat').datebox('getValue'),
        od_service_id: $('#ed_od_service_id').combobox('getValue'),
        od_sales_id: $('#ed_od_sales_id').combobox('getValue'), 
        od_bak_delegate: $('#ed_od_bak_delegate').val(),
        od_bak_operation: $('#ed_od_bak_operation').val(),
        od_freight_id: $('#ed_od_freight_id').combobox('getValue'), 
        od_trade_typ_id: $('#ed_od_trade_typ_id').combobox('getValue'),
        od_beg_place_id: $('#ed_od_beg_place_id').data('pl_id'),
        od_end_place_id: $('#ed_od_end_place_id').data('pl_id'), 
        od_i_e_id: $('#ed_od_i_e_id').combobox('getValue'), 
        od_box_typ_id: $('#ed_od_box_typ_id').combobox('getValue'),
        od_cargo_typ: $('#ed_od_cargo_typ').combogrid('getText'), 
        od_cargo_bluk: $('#ed_od_cargo_bluk').val(),
        od_cargo_weight: $('#ed_od_cargo_weight').val(),
        od_cargo_number: $('#ed_od_cargo_number').val(),
        od_cargo_packing: $('#ed_od_cargo_packing').combobox('getValue'),
        od_take_cargo_info: $('#ed_od_take_cargo_info').val(),
        od_delivery_cargo_info: $('#ed_od_delivery_cargo_info').val(),
        od_po_no: $('#ed_od_po_no').val(),
        od_so_no: $('#ed_od_so_no').val(),
        od_main_bill_no: $('#ed_od_main_bill_no').val(),
        od_sub_bill_no: $('#ed_od_sub_bill_no').val(),
        bk_commissioned_id: $('#ed_od_bk_commissioned_id').data('cu_id'), 
        bk_shipper_desc: $('#ed_bk_shipper_desc').val(),
        bk_consignee_desc: $('#ed_bk_consignee_desc').val(),
        bk_notify_desc: $('#ed_bk_notify_desc').val(), 
        bk_commissioned_to: $('#ed_bk_commissioned_to').val(),
        bk_commissioned_tel: $('#ed_bk_commissioned_tel').val(),
        bk_commissioned_fax: $('#ed_bk_commissioned_fax').val(),
        bk_booking_numbe: $('#ed_bk_booking_numbe').val(),
        //bk_job_number : $('#dasdfas').val(),
        bk_delegate_tel: $('#ed_bk_delegate_tel').val(),
        bk_delegate_fax: $('#ed_bk_delegate_fax').val(),
        bk_delegate_ctc: $('#ed_bk_delegate_ctc').val(),
        bk_delegate_date: $('#ed_bk_delegate_date').datebox('getValue'),
        bk_carrier_id: $('#ed_bk_carrier_id').combobox('getValue'),
        bk_closing_date: $('#ed_bk_closing_date').datebox('getValue'),
        bk_etd: $('#ed_bk_etd').datebox('getValue'),

        bk_port_of_loading_id: $('#ed_bk_port_of_loading_id').data('pl_id'),
        bk_port_of_transit_id: $('#ed_bk_port_of_transit_id').data('pl_id'),
        bk_port_of_discharge_id: $('#ed_bk_port_of_discharge_id').data('pl_id'), 

        bk_freight_term_id: $('#ed_bk_freight_term_id').combobox('getValue'),
        bk_pay_method_id: $('#ed_bk_pay_method_id').combobox('getValue'),
        bk_shipping_marks_and_no_desc: $('#ed_bk_shipping_marks_and_no_desc').val(),
        bk_freight_package_desc: $('#ed_bk_freight_package_desc').val(),
        bk_description_of_goods_desc: $('#ed_bk_description_of_goods_desc').val(),
        bk_gross_weight: $('#ed_bk_gross_weight').val(),
        bk_remarks: $('#ed_bk_remarks').val(),
        bk_measurement: $('#ed_bk_measurement').val(), 
        od_bill_typ: $('#ed_od_bill_typ').combobox('getValue'),
        od_sign_bill_typ: $('#ed_od_sign_bill_typ').combobox('getValue'),
        od_declare_customs_typ: $('#ed_od_declare_customs_typ').combobox('getValue'),
        od_carriage_typ: $('#ed_od_carriage_typ').combobox('getValue'),
        od_stuffing_container_typ: $('#ed_od_stuffing_container_typ').combobox('getValue'),
        od_stuffing_container_place: $('#ed_od_stuffing_container_place').val(),
        od_entry_tim_of_stuffing: $('#ed_od_entry_tim_of_stuffing').datebox('getValue'),
        od_out_tim_of_stuffing: $('#ed_od_out_tim_of_stuffing').datebox('getValue'), 

        cntr_list:   data_cntr  ,
        group_cntr:  data_cntr_group,
        contract_file:   data_contract_file 
    };
     
    var old_order = cur_order_collections.order_base_info_and_cargo_info[0];

    var old_order_booking_note = cur_order_collections.order_booking_note_list[0];

    if(castnull(now_order.od_project_typ) == castnull(old_order.od_project_typ) && 
            castnull(now_order.od_typ) == castnull(old_order.od_typ) && 
            castnull(now_order.od_cargo_agent_cu_id) == castnull(old_order.od_cargo_agent_cu_id) && 
            castnull(now_order.od_delegate_cu_id) == castnull(old_order.od_delegate_cu_id) &&  
            castnull(now_order.od_cargo_agent_relation_nam) == castnull(old_order.od_cargo_agent_relation_nam) && 
            castnull(now_order.od_cargo_agent_relation_phone) == castnull(old_order.od_cargo_agent_relation_phone) && 
            castnull(now_order.od_cargo_agent_relation_fax) == castnull(old_order.od_cargo_agent_relation_fax) && 
            castnull(now_order.od_delegate_relation_nam) == castnull(old_order.od_delegate_relation_nam) && 
            castnull(now_order.od_delegate_relation_phone) == castnull(old_order.od_delegate_relation_phone) && 
            castnull(now_order.od_delegate_relation_fax) == castnull(old_order.od_delegate_relation_fax) && 
            dateformat( castnull(now_order.od_fee_dat),true) == dateformat( castnull(old_order.od_fee_dat),true) && 
            castnull(now_order.od_service_id) == castnull(old_order.od_service_id) && 
            castnull(now_order.od_sales_id) == castnull(old_order.od_sales_id) && 
            castnull(now_order.od_bak_delegate) == castnull(old_order.od_bak_delegate) && 
            castnull(now_order.od_bak_operation) == castnull(old_order.od_bak_operation) && 
            castnull(now_order.od_freight_id) == castnull(old_order.od_freight_id) && 
            castnull(now_order.od_trade_typ_id) == castnull(old_order.od_trade_typ_id) && 
            castnull(now_order.od_beg_place_id) == castnull(old_order.od_beg_place_id) && 
            castnull(now_order.od_end_place_id) == castnull(old_order.od_end_place_id) &&  
            castnull(now_order.od_i_e_id) == castnull(old_order.od_i_e_id) && 
            castnull(now_order.od_box_typ_id) == castnull(old_order.od_box_typ_id) && 
            castnull(now_order.od_cargo_typ) == castnull(old_order.od_cargo_typ_desc) &&
            castnull(now_order.od_cargo_bluk) == castnull(old_order.od_cargo_bluk) && 
            castnull(now_order.od_cargo_weight) == castnull(old_order.od_cargo_weight) && 
            castnull(now_order.od_cargo_number) == castnull(old_order.od_cargo_number) &&
        
            castnull(now_order.od_cargo_packing) == castnull(old_order.od_cargo_packing) && 
            castnull(now_order.od_take_cargo_info) == castnull(old_order.od_take_cargo_info) && 
            castnull(now_order.od_delivery_cargo_info) == castnull(old_order.od_delivery_cargo_info) && 
            castnull(now_order.od_po_no) == castnull(old_order.od_po_no) && 
            castnull(now_order.od_so_no) == castnull(old_order.od_so_no) && 
            castnull(now_order.od_main_bill_no) == castnull(old_order.od_main_bill_no) && 
            castnull(now_order.od_sub_bill_no) == castnull(old_order.od_sub_bill_no) && 
            castnull(now_order.bk_commissioned_id) == castnull(old_order_booking_note.bk_commissioned_id) &&
            castnull(now_order.bk_shipper_desc) == castnull(old_order_booking_note.bk_shipper_desc) &&
            castnull(now_order.bk_consignee_desc) == castnull(old_order_booking_note.bk_consignee_desc) &&
            castnull(now_order.bk_notify_desc) == castnull(old_order_booking_note.bk_notify_desc) &&
            castnull(now_order.bk_commissioned_to) == castnull(old_order_booking_note.bk_commissioned_to) &&
            castnull(now_order.bk_commissioned_tel) == castnull(old_order_booking_note.bk_commissioned_tel) &&
            castnull(now_order.bk_commissioned_fax) == castnull(old_order_booking_note.bk_commissioned_fax) &&
            castnull(now_order.bk_booking_numbe) == castnull(old_order_booking_note.bk_booking_numbe) &&
            castnull(now_order.bk_delegate_tel) == castnull(old_order_booking_note.bk_delegate_tel) &&
            castnull(now_order.bk_delegate_fax) == castnull(old_order_booking_note.bk_delegate_fax) &&
            castnull(now_order.bk_delegate_ctc) == castnull(old_order_booking_note.bk_delegate_ctc) &&
            dateformat(castnull(now_order.bk_delegate_date), true) == dateformat(castnull(old_order_booking_note.bk_delegate_date), true) &&
            castnull(now_order.bk_carrier_id) == castnull(old_order_booking_note.bk_carrier_id) &&
            dateformat(castnull(now_order.bk_closing_date),true) == dateformat(castnull(old_order_booking_note.bk_closing_date),true) &&
            dateformat( castnull(now_order.bk_etd),true) == dateformat(castnull(old_order_booking_note.bk_etd),true) &&

            castnull(now_order.bk_port_of_loading_id) == castnull(old_order_booking_note.bk_port_of_loading_id) &&
            castnull(now_order.bk_port_of_transit_id) == castnull(old_order_booking_note.bk_port_of_transit_id) &&
            castnull(now_order.bk_port_of_discharge_id) == castnull(old_order_booking_note.bk_port_of_discharge_id) &&

            castnull(now_order.bk_freight_term_id) == castnull(old_order_booking_note.bk_freight_term_id) &&
            castnull(now_order.bk_pay_method_id) == castnull(old_order_booking_note.bk_pay_method_id) &&
            castnull(now_order.bk_shipping_marks_and_no_desc) == castnull(old_order_booking_note.bk_shipping_marks_and_no_desc) &&
            castnull(now_order.bk_freight_package_desc) == castnull(old_order_booking_note.bk_freight_package_desc) &&
            castnull(now_order.bk_description_of_goods_desc) == castnull(old_order_booking_note.bk_description_of_goods_desc) &&
            castnull(now_order.bk_gross_weight) == castnull(old_order_booking_note.bk_gross_weight) &&
            castnull(now_order.bk_remarks) == castnull(old_order_booking_note.bk_remarks) &&
            castnull(now_order.bk_measurement) == castnull(old_order_booking_note.bk_measurement) &&

            castnull(now_order.od_bill_typ) == castnull(old_order.od_bill_typ) && 
            castnull(now_order.od_sign_bill_typ) == castnull(old_order.od_sign_bill_typ) && 
            castnull(now_order.od_declare_customs_typ) == castnull(old_order.od_declare_customs_typ) && 
            castnull(now_order.od_carriage_typ) == castnull(old_order.od_carriage_typ) && 
            castnull(now_order.od_stuffing_container_typ) == castnull(old_order.od_stuffing_container_typ) && 
            castnull(now_order.od_stuffing_container_place) == castnull(old_order.od_stuffing_container_place) && 
            dateformat(castnull(now_order.od_entry_tim_of_stuffing),true) == dateformat(castnull(old_order.od_entry_tim_of_stuffing),true) && 
            dateformat(castnull(now_order.od_out_tim_of_stuffing), true) == dateformat(castnull(old_order.od_out_tim_of_stuffing), true)) {

    } else {
        return false;
    }


    
    //接下来比较集装箱 
    //箱量比较 
    var old_cntr_group = cur_order_collections.order_cntr_group_info;
    if (old_cntr_group.length != now_order.group_cntr.length) {
        return false;
    }
    if (old_cntr_group.length > 0) {
            
        var b_same = true;
        $.each(old_cntr_group, function (o, oitem) {
            var b_has = false;
            $.each(now_order.group_cntr, function (n, nitem) {
                if (castnull(oitem.od_group_cntr_seq) == castnull(nitem.od_group_cntr_seq) &&
                    castnull(oitem.od_group_cntr_typ) == castnull(nitem.od_group_cntr_typ) &&
                    castnull(oitem.od_group_cntr_siz) == castnull(nitem.od_group_cntr_siz) &&
                    castnull(oitem.od_group_pin_flag) == castnull(nitem.od_group_pin_flag) &&
                    castnull(oitem.od_group_cntr_opr_cod) == castnull(nitem.od_group_cntr_opr_cod) &&
                    castnull(oitem.od_group_cntr_number) == castnull(nitem.od_group_cntr_number)
                    ) {
                    b_has = true;
                }
            });
            if (!b_has) {
                b_same = false;
                return;
            }
        });

        if (!b_same) {
            return false;
        } 
    } 
    
    //箱明细比较 
    var old_cntr_list = cur_order_collections.order_cntr_list

    if (old_cntr_list.length != now_order.cntr_list.length) {
        return false;
    }

    if (old_cntr_list.length > 0) {
        var b_same = true;
        $.each(old_cntr_list, function (o, oitem) {
            var b_has = false;
            $.each(now_order.cntr_list, function (n, nitem) {
                if (castnull(oitem.cntr_id) == castnull(nitem.cntr_id) &&
                    castnull(oitem.cntr_no) == castnull(nitem.cntr_no) &&
                    castnull(oitem.eqp_typ) == castnull(nitem.eqp_typ) &&
                    castnull(oitem.eqp_siz) == castnull(nitem.eqp_siz) &&
                    castnull(oitem.seal_no) == castnull(nitem.seal_no) &&
                    castnull(oitem.bill_no) == castnull(nitem.bill_no) &&
                    castnull(oitem.cntr_gross_wgt) == castnull(nitem.cntr_gross_wgt) &&
                    castnull(oitem.cargo_pick_number) == castnull(nitem.cargo_pick_number) &&
                    castnull(oitem.cargo_bluk) == castnull(nitem.cargo_bluk) &&
                    castnull(oitem.opr_cod) == castnull(nitem.opr_cod) &&
                    castnull(oitem.pick_empty_no) == castnull(nitem.pick_empty_no) &&
                    castnull(oitem.cargo_net_wgt) == castnull(nitem.cargo_net_wgt) &&
                    castnull(oitem.customs_ship_desc) == castnull(nitem.customs_ship_desc) &&
                    castnull(oitem.customs_voyage_no) == castnull(nitem.customs_voyage_no) &&
                    castnull(oitem.customs_ship_no) == castnull(nitem.customs_ship_no) &&
                    castnull(oitem.customs_load_port) == castnull(nitem.customs_load_port) &&
                    castnull(oitem.customs_disc_port) == castnull(nitem.customs_disc_port) &&
                    castnull(oitem.cargo_goods_desc) == castnull(nitem.cargo_goods_desc) &&
                    castnull(oitem.customs_hs_cod) == castnull(nitem.customs_hs_cod) &&
                    castnull(oitem.cntr_pin_flag) == castnull(nitem.cntr_pin_flag)  
                    ) {
                    b_has = true;
                }
            });
            if (!b_has) {
                b_same = false;
                return;
            }
        });

        if (!b_same) {
            return false;
        }
    }

    //文件比较 
    var old_contract_file = cur_order_collections.order_contract_file_info;
    if (old_contract_file.length != now_order.contract_file.length) {
        return false;
    }
    if (old_contract_file.length > 0) {
        var b_same = true;
        $.each(old_contract_file, function (o, oitem) {
            var b_has = false;
            $.each(now_order.contract_file, function (n, nitem) {
                if (castnull(oitem.file_seq) == castnull(nitem.file_seq) &&
                    castnull(oitem.file_nam) == castnull(nitem.file_nam) &&
                    castnull(oitem.file_path) == castnull(nitem.file_path) &&
                    castnull(oitem.file_record_id) == castnull(nitem.file_record_id) &&
                    castnull(oitem.amc_id) == castnull(nitem.amc_id)   
                    ) {
                    b_has = true;
                }
            });
            if (!b_has) {
                b_same = false;
                return;
            }
        });

        if (!b_same) {
            return false;
        }
    } 

    return true;
}
//比较集装箱是否发生了变更 

//比较 当前数据和读取数据
function call_issame_cntr_list() {

    if (!can_edit_order()) { return true; } 
   
    var data_cntr = $("#tab_order_cntr").datagrid('getRows');
     
    //箱明细比较 
    var old_cntr_list = cur_order_collections.order_cntr_list

    if (old_cntr_list.length != data_cntr.length) {
        return false;
    }

    if (old_cntr_list.length > 0) {
        var b_same = true;
        $.each(old_cntr_list, function (o, oitem) {
            var b_has = false;
            $.each(data_cntr, function (n, nitem) {
                if (castnull(oitem.cntr_id) == castnull(nitem.cntr_id) &&
                    castnull(oitem.cntr_no) == castnull(nitem.cntr_no) &&
                    castnull(oitem.eqp_typ) == castnull(nitem.eqp_typ) &&
                    castnull(oitem.eqp_siz) == castnull(nitem.eqp_siz) &&
                    castnull(oitem.seal_no) == castnull(nitem.seal_no) &&
                    castnull(oitem.bill_no) == castnull(nitem.bill_no) &&
                    castnull(oitem.cntr_gross_wgt) == castnull(nitem.cntr_gross_wgt) &&
                    castnull(oitem.cargo_pick_number) == castnull(nitem.cargo_pick_number) &&
                    castnull(oitem.cargo_bluk) == castnull(nitem.cargo_bluk) &&
                    castnull(oitem.opr_cod) == castnull(nitem.opr_cod) &&
                    castnull(oitem.pick_empty_no) == castnull(nitem.pick_empty_no) &&
                    castnull(oitem.cargo_net_wgt) == castnull(nitem.cargo_net_wgt) &&
                    castnull(oitem.customs_ship_desc) == castnull(nitem.customs_ship_desc) &&
                    castnull(oitem.customs_voyage_no) == castnull(nitem.customs_voyage_no) &&
                    castnull(oitem.customs_ship_no) == castnull(nitem.customs_ship_no) &&
                    castnull(oitem.customs_load_port) == castnull(nitem.customs_load_port) &&
                    castnull(oitem.customs_disc_port) == castnull(nitem.customs_disc_port) &&
                    castnull(oitem.cargo_goods_desc) == castnull(nitem.cargo_goods_desc) &&
                    castnull(oitem.customs_hs_cod) == castnull(nitem.customs_hs_cod) &&
                    castnull(oitem.cntr_pin_flag) == castnull(nitem.cntr_pin_flag)
                    ) {
                    b_has = true;
                }
            });
            if (!b_has) {
                b_same = false;
                return;
            }
        });

        if (!b_same) {
            return false;
        }
    } 
    return true;
}

//单独存储集装箱明细 
function call_save_order_cntr(continue_fun) {
    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 订单未新建保存，无法删除。', 'error');
        return;
    }
    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];
    if (cur_order.od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 订单已锁定，无法删除', 'error');
        return;
    }

    var data_cntr = $("#tab_order_cntr").datagrid('getData').rows;

    if (data_cntr != undefined && data_cntr.length > 0) {
        var va_cntr = validate_cntr(data_cntr); 
        if (va_cntr.result == false) {
            $('#tabs_main').tabs('select', 1);
            $.messager.alert('保存订单集装箱信息错误', va_cntr.msg, 'error');
            return;
        }
    } 

    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'insert_order_cntr',
        od_seq: cur_ed_od_seq,
        json_order_cntr: JSON.stringify({ order_cntr_list: data_cntr }),
    }, function (data) { 
        cur_order_collections.order_cntr_list = data.order_cntr_list;
        load_order_cntr_info(cur_order_collections);

        $.messager.alert('提示', '委托集装箱明细保存成功', 'info', function () {
            continue_fun();
        }); 
    }, true);

}

//锁定提交 
function lock_order() {
    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 订单未新建保存，无法锁定。', 'error');
        return;
    }
    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];
    if (cur_order.od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 订单已锁定，无法再次锁定', 'error');
        return;
    }

    //需要 判断是不是第二次提交 
    //
    if (cur_order.amc_id != undefined && cur_order.amc_id.length > 0) { 
        $('#dlg_od_relock').dialog({
            title: '重新锁定订单',
            iconCls: 'icon-lock',
            autoOpen: false,
            modal: true,
            width: 460,
            minheight: 80,
            buttons: [
            {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_relock').dialog('close');
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
                        amc_id: cur_order.amc_id
                    }, function (data) {
                        if (data.result == 1) { 
                            $.messager.alert('提示', data.msg, 'info', function () {
                                $('#dlg_od_relock').dialog('close');
                                edit_order(cur_ed_od_seq);
                            });
                        } else {
                            $.messager.alert('错误',data.msg,'error');
                        } 
                    },true);
                }
            }]
        }).dialog('open');
         
    } else {
        post('../Ashx/approval_mgr.ashx', {
            rnd: Math.random(),
            action: 'get_start_schema_point',
            apt_id: 1,
            apst_id: 1
        }, function (data) {
            var schema_point_list = data;

            $('#dlg_start_schema_point').combobox({
                panelHeight: 'auto', hasDownArrow: true, valueField: 'guid',
                textField: 'aps_show',
                data: schema_point_list
            });
            $('#dlg_od_lock').dialog({
                title: '锁定订单',
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
                            $('#dlg_od_lock').dialog('close');
                        }
                    }
                    , {
                        text: '确定',
                        iconCls: 'icon-ok',
                        handler: function () {

                            var guid = $('#dlg_start_schema_point').combobox('getValue');
                            var has = false;
                            var ap_u_id = undefined;
                            var ap_aps_id = undefined;
                            var ap_order_by_id = undefined;

                            $.each(schema_point_list, function (i, item) {
                                if (guid == item.guid) {
                                    has = true;
                                    ap_u_id = item.u_id;
                                    ap_aps_id = item.aps_id;
                                    ap_order_by_id = item.aps_order_by_id;
                                }
                            });

                            if (!has) {
                                $.messager.alert('错误提示', '错误: 请选择审核人再提交。', 'error');
                                return;
                            }
                            $('#dlg_od_lock').dialog('close');

                            post('../Ashx/order.ashx', {
                                rnd: Math.random(),
                                action: 'lock_order',
                                od_seq: cur_ed_od_seq,
                                ap_u_id: ap_u_id,
                                ap_order_by_id: ap_order_by_id,
                                ap_aps_id: ap_aps_id

                            }, function (data) {
                                if (data.result == 1) {
                                    $.messager.alert('提示', data.msg, 'info');
                                    edit_order(cur_ed_od_seq);
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
//删除订单 
function delete_order() {
    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 订单未新建保存，无法删除。', 'error');
        return;
    }
    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];
    if (cur_order.od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 订单已锁定，无法删除', 'error');
        return;
    }

    $.messager.confirm('订单删除提示', '请注意: 删除操作将会直接删除(无备份)，请确认是否执行此操作？',
    function (r) {
        if (r) {
            post('../Ashx/order.ashx', {
                rnd: Math.random(),
                action: 'delete_order',
                od_seq: cur_ed_od_seq
            }, function (data) {
                if (data.result == 1) {
                    $.messager.alert('提示', data.msg, 'info');

                    cur_ed_od_seq = undefined;
                    $cur_page = undefined;
                    return_order_list();

                } else {
                    $.messager.alert('错误提示', data.msg, 'error');
                }
            }, true);
        }
    });
}


//移除 箱量 
function remove_cntr_group() {

    if (cur_edit_cntr_group_rowindex_main != undefined) {
        $("#tab_order_cntr_group").datagrid("endEdit", cur_edit_cntr_group_rowindex_main);
        cur_edit_cntr_group_rowindex_main = undefined;
    }

    var rows = $('#tab_order_cntr_group').datagrid('getSelections');
    if (rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请勾选数据后再执行删除操作', 'error');
        return;
    }
    var od_seq = cur_ed_od_seq;

    if (cur_order_collections != undefined) {
        var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];

        if (cur_order.od_status_id != 1) {
            $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对箱量进行编辑操作', 'error');
            return;
        }
    }

    $.messager.confirm('删除提示', '请确认要删除选中的箱量数据？',
    function (r) {
        if (r) {

            var od_group_cntr_seqs = '';

            $.each(rows, function (i, row) {
                if (od_group_cntr_seqs.length == 0) {
                    od_group_cntr_seqs = row.od_group_cntr_seq;
                } else {
                    od_group_cntr_seqs += ',' + row.od_group_cntr_seq;
                }
            });

            if (od_seq == undefined) {
                od_seq = guid();
            }

            post('../Ashx/order.ashx', {
                od_seq: od_seq,
                od_group_cntr_seqs: od_group_cntr_seqs,
                rnd: Math.random(),
                action: 'delete_cntr_group'
            }, function (data) {
                if (data.result == 1) {
                    //现在所有的 
                    var old_rows = $('#tab_order_cntr_group').datagrid('getRows');

                    var new_rows = [];

                    $.each(old_rows, function (o, orow) {
                        var is_delete = false;
                        $.each(rows, function (d, drow) {
                            if (orow.od_group_cntr_seq == drow.od_group_cntr_seq) {
                                is_delete = true;
                            }
                        });

                        if (!is_delete) {
                            new_rows.push(orow);
                        }
                    });
                    $("#tab_order_cntr_group").datagrid('loadData', { total: new_rows.length, rows: new_rows });

                    $.messager.alert('提示', data.msg, 'info');
                } else {
                    $.messager.alert('错误提示', data.msg, 'error');
                }
            }, true);
        }
    });


}

//添加 箱量 
function insert_cntr_group() {
    //关闭其他编辑行
    if (cur_edit_cntr_group_rowindex_main != undefined) {
        $("#tab_order_cntr_group").datagrid("endEdit", cur_edit_cntr_group_rowindex_main);
        cur_edit_cntr_group_rowindex_main = undefined;
    }

    if (cur_order_collections != undefined) {
        var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];

        if (cur_order.od_status_id != 1) {
            $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对箱量进行编辑操作', 'error');
            return;
        }
    }

    //增加新的 行 

    var old_rows = $("#tab_order_cntr_group").datagrid('getRows');

    old_rows.push({
        ck_: false,
        od_seq: cur_ed_od_seq,
        od_group_cntr_seq: guid(),
        od_group_cntr_number: 0,
        od_group_cntr_siz: 20,
        od_group_cntr_typ: 'GP',
        od_group_pin_flag: 1,
        od_group_cntr_opr_cod: 'SOC'
    });

    //重新绑定数据 
    $("#tab_order_cntr_group").datagrid('loadData', { total: old_rows.length, rows: old_rows });

    ////然后选择这个，进入编辑
    //$("#tab_order_cntr_group").datagrid('selectRow', old_rows.length - 1);

    ////进入编辑
    //cur_edit_cntr_group_rowindex_main = old_rows.length - 1;

    //$("#tab_order_cntr_group").datagrid('beginEdit', cur_edit_cntr_group_rowindex_main);
}

//初始化 委托 箱量信息
function init_tab_order_cntr_group() {
    $("#tab_order_cntr_group").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_order_cntr_group_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ title: '', field: 'ck_', width: 40, checkbox: true }, ]],
        columns: [[//显示的列
            {
                field: 'od_group_cntr_number', title: '数量', width: 40,
                editor: {
                    type: 'numberbox', options: { precision: 0 },
                },
            }
            , {
                field: 'od_group_cntr_siz', title: '尺寸', sortable: true, width: 60,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'cs_desc',
                        textField: 'cs_desc',
                        data: basesetting.container_siz_list,
                        filter: filterCombo,
                    }
                }
            }
            , {
                field: 'od_group_cntr_typ', title: '箱型', width: 60,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'ct_name',
                        textField: 'ct_name',
                        data: basesetting.container_typ_list,
                        filter: filterCombo,
                    }
                }
            }
            , {
                field: 'od_group_pin_flag', title: '整/拼', width: 60,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'value',
                        textField: 'label',
                        data: basesetting.group_cntr_pin_typ,
                        filter: filterCombo,
                    }
                },
                formatter: function (val, row, index) {
                    if (val == 1) return '整箱';
                    if (val == 0) return '拼箱';
                    return '';
                }
            }
            , {
                field: 'od_group_cntr_opr_cod', title: '箱主', width: 60,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'sh_cod',
                        textField: 'sh_cod',
                        data: basesetting.ship_company_list,
                      
                        panelHeight: '200',
                        panelWidth: '200'
                    }
                }
            }
        ]],
        onAfterEdit: function (index, row, changes) {
            cur_edit_cntr_group_rowindex_main = undefined;
        },
        onBeforeEdit: function (index, row) {
            if (cur_edit_cntr_group_rowindex_main != index && cur_edit_cntr_group_rowindex_main != undefined) {
                $('#tab_order_cntr_group').datagrid('endEdit', cur_edit_cntr_group_rowindex_main);
                cur_edit_cntr_group_rowindex_main = index;
            }
        },
        onClickRow: function (index, rowData) {
            if (cur_edit_cntr_group_rowindex_main != undefined &&
                cur_edit_cntr_group_rowindex_main != index) {
                $('.datagrid-row').unbind('click');
                $('#tab_order_cntr_group').datagrid('endEdit', cur_edit_cntr_group_rowindex_main);
            }
            if (cur_edit_cntr_group_rowindex_main == undefined) {
                cur_edit_cntr_group_rowindex_main = index;


                $('#tab_order_cntr_group').datagrid('beginEdit', cur_edit_cntr_group_rowindex_main);

                $('.datagrid-row-editing').unbind('click').bind('click', function () {
                    event.stopPropagation();
                });
                $(document).on('click', ':not(.datagrid-row)', function () {
                    if (cur_edit_cntr_group_rowindex_main != undefined) {
                        $('.datagrid-row').unbind('click');
                        $('#tab_order_cntr_group').datagrid('endEdit', cur_edit_cntr_group_rowindex_main);
                    }
                });
            } 
        },
        onLoadSuccess: function (data) { 
        },
    });
}


 
/********************************************************************/
//通过上传 订舱单文件新建订单 
function upload_order_file() {
    var fun = function () {
        $('#file_upload2').unbind('change').bind('change', function () {
            var file = $(this).get(0).files[0];
            //文件大小
            //必须是excel才能解析 
            if (!/.(xls|xlsx)$/.test(file.name)) {
                $.messager.alert('错误', '文件类型必须是xls,xlsx中的一种', 'error');
                return;
                //if (!/.(gif|jpg|jpeg|png|GIF|JPG|bmp|pdf|doc|docx|xls|xlsx)$/.test(file.name)) {
                //    $.messager.alert('错误', '文件类型必须是.gif,jpeg,jpg,png,bmp,pdf,xls,xlsx,doc,docx中的一种', 'error');
                //    return;
            } else {
                if (((file.size).toFixed(2)) >= (10 * 1024 * 1024)) {
                    $.messager.alert('错误', '文件大小不能超过10M', 'error');
                    return;
                }

                var myparams = {
                    rnd: Math.random(),
                };
                var url = '../Ashx/order.ashx?action=insert_order_by_order_file';

                insert_order_by_upload_order_file(this, myparams, url);

            }

        });
        $('#file_upload2').click();
    }

    if (cur_ed_od_seq != undefined) {
        $.messager.confirm('新建订单提示', '你正在执行上传订舱单新建订单操作，请确认当前订单已编辑保存？',
        function (r) {
            if (r) {
                clear_edit_order_form();
                fun();
            }
        });
    } else {
        clear_edit_order_form();
        fun();
    }

    
}
function insert_order_by_upload_order_file(that, typedata, baseurl) {
    

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
                $('#file_upload2').val('');
                var bRight = true;
                $('#ed_od_delegate_cu_id').combogrid('setText', data.od_delegate_cu_desc);

                if ((!isNaN(data.od_delegate_cu_id) && Number(data.od_delegate_cu_id) == -1) || isNaN(data.od_delegate_cu_id)) {
                    $('.tr_unfind_dlg_ed_od_delegate_cu_id').show();
                    $('#sp_unfind_dlg_ed_od_delegate_cu_id').html('错误:未找到预设委托单位：' + data.od_delegate_cu_desc + ',请校正!');
                    bRight = false;
                } else {
                    $('#ed_od_delegate_cu_id').data('cu_id', data.od_delegate_cu_id); 
                }
                $('#ed_od_beg_place_id').combogrid('setText', data.od_beg_place_desc);
                if ((!isNaN(data.od_beg_place_id) && Number(data.od_beg_place_id) == -1) || isNaN(data.od_beg_place_id)) {
                    $('.tr_unfind_dlg_ed_od_beg_place_id').show();
                    $('#sp_unfind_dlg_ed_od_beg_place_id').html('错误:未找到预设地址：' + data.od_beg_place_desc + ',请校正!');
                    bRight = false;
                } else {
                    $('#ed_od_beg_place_id').data('pl_id', data.od_beg_place_id); 
                }
                $('#ed_od_end_place_id').combogrid('setText', data.od_end_place_desc);
                if ((!isNaN(data.od_end_place_id) && Number(data.od_end_place_id) == -1) || isNaN(data.od_end_place_id)) {
                    $('.tr_unfind_dlg_ed_od_end_place_id').show();
                    $('#sp_unfind_dlg_ed_od_end_place_id').html('错误:未找到预设地址：' + data.od_end_place_desc + ',请校正!');
                    bRight = false;
                } else {
                    $('#ed_od_end_place_id').data('pl_id', data.od_end_place_id); 
                } 
               
                $('#ed_od_cargo_typ').data('pr_id', '');
                $('#ed_od_cargo_typ').combogrid('setText', data.od_cargo_typ_desc);

                $('#ed_od_freight_id').combobox('setText', data.od_freight_desc);
                if ((!isNaN(data.od_freight_id) && Number(data.od_freight_id) == -1) || isNaN(data.od_freight_id)) {
                    $('.tr_unfind_dlg_ed_od_freight_id').show();
                    $('#sp_unfind_dlg_ed_od_freight_id').html('错误:未找到预设条款：' + data.od_freight_desc + ',请校正!');
                    bRight = false;
                } else { 
                    $('#ed_od_freight_id').combobox('setValue', data.od_freight_id);
                }

                $('#ed_od_bak_delegate').val(data.od_bak_delegate);
                $('#ed_od_main_bill_no').val(data.od_main_bill_no);
                $('#ed_od_delivery_cargo_info').val(data.od_delivery_cargo_info);
                $('#ed_od_take_cargo_info').val(data.od_take_cargo_info);
                $('#ed_od_delegate_relation_nam').val(data.od_delegate_relation_nam);
                $('#ed_od_delegate_relation_phone').val(data.od_delegate_relation_phone);

                $("#tab_order_cntr_group").datagrid('loadData', { total: data.order_cntr_group.length, rows: data.order_cntr_group });
                $('#ed_od_typ').combobox('setValue', data.order_typ);
                $('#ed_od_fee_dat').datebox('setValue', data.od_fee_dat);

                var contract_files = [{
                    file_nam: data.file_nam,
                    file_path: data.file_path,
                    file_record_id: data.file_record_id,
                    amc_id: '',
                    amc_no: '',
                    file_seq: data.file_seq,
                    }] ;
                $("#tab_order_contract_files").datagrid('loadData', contract_files);

                cur_edit_cntr_group_rowindex_main = undefined;
                if (!bRight) {
                    $('#dlg_insert_order_by_upload_order_file').dialog({
                        title: '订舱单信息确认',
                        iconCls: 'icon-edit',
                        autoOpen: false,
                        modal: true,
                        width: 600,
                        minheight: 250,
                        buttons: [
                        {
                            text: '关闭',
                            iconCls: 'icon-cancel',
                            handler: function () {
                                $('#dlg_insert_order_by_upload_order_file').dialog('close');
                            }
                        }]
                    }).dialog('open');
                } 
            } else {
                $('#file_upload2').val('');
                $.messager.alert('错误', data.msg, 'error');
            } 
        },
        error: function (returndata) {
            $('#file_upload2').val('');
            $.messager.alert('错误', '文件上传失败', 'error');
        }

    });
}
 

//编辑订单
function edit_order(od_seq) {
    cur_ed_od_seq = od_seq;
    show_page_order_base_info();
    load_order_base_and_cargo_info(cur_ed_od_seq);
} 
//菜单 
function return_order_list() { 
    //if (issame_order_base()) {
        cur_ed_od_seq = undefined;
        $cur_page = undefined;
        $('#page_order_edit').fadeOut(50, function () {
            $('#page_order_list').fadeIn(50);
            refresh_order_list();
        });
    //} else {
    //    $.messager.confirm('保存提示', '注意: 委托内容已修改，是否保存？', function (r) {
    //        if (r) {
    //            save_order();
    //        } else {
    //            cur_ed_od_seq = undefined;
    //            $cur_page = undefined;
    //            $('#page_order_edit').fadeOut(50, function () {
    //                $('#page_order_list').fadeIn(50);
    //                refresh_order_list();
    //            });
    //        }
    //    });
    //} 

}


//编辑判断   
function can_edit_order() {
    if (cur_ed_od_seq == undefined) {
        return true;
    }
    if (cur_order_collections != undefined) {
        var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];
        if (cur_order.od_status_id == 1) {
            return true;
        }
    }

    return false;
}

//初始化 委托 合同文件表 
function init_tab_order_contract_files() {
    $("#tab_order_contract_files").datagrid({
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
        toolbar: '#tab_order_contract_files_bar',
        fit: true,
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[//显示的列 
            { title: '', field: 'file_seq', width: 40, checkbox: true }
            , {
                field: 'file_nam', title: '文件名', width: 460, formatter: function (value, row, index) {
                    return '<a class="order_cntr_contract_file" target="_blank" href="' + row.file_path + '">' + value + '</a>';
                }
            } 
        ]],
        onLoadSuccess: function (data) {
             
        }
    })
}

//上传合同文件 
function upload_order_contract_file() {
    
    if (cur_ed_od_seq != undefined) {
        var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];
        if (cur_order.od_status_id != 1) {
            $.messager.alert('错误提示', '错误: 订单已锁定，无法上传合同文件', 'error');
            return;
        }
    }
    


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
                        _render_contract_file(this.result, x);
                    }
                })(file.name);
                reader.readAsDataURL(file);
            } else {
                var myparams = {
                    od_seq: cur_ed_od_seq, 
                    mode: 'file',
                    rnd: Math.random(),
                };
                var url = '../Ashx/order.ashx?action=insert_order_contract_file';

                insert_order_contract_file(this, myparams, url);
            }
        }

    });
    $('#file_upload').click();
} 

//上传
function insert_order_contract_file(that, typedata, baseurl) {
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
                if (cur_ed_od_seq == undefined) {
                    var rows = $("#tab_order_contract_files").datagrid('getRows');

                    rows.push({
                        file_nam: data.file_nam,
                        file_path: data.file_path,
                        file_record_id: data.file_record_id,
                        amc_id: '',
                        amc_no: '',
                        file_seq: data.file_seq,
                    });
                    $("#tab_order_contract_files").datagrid('loadData', rows);

                    $.messager.alert('提示', '合同文件上传成功', 'info');

                } else {
                    $("#tab_order_contract_files").datagrid('loadData', { total: data.order_contract_file_info.length, rows: data.order_contract_file_info });

                    $.messager.alert('提示', data.msg, 'info');
                }
                
            } else {
                $.messager.alert('错误', data.msg, 'error');
            }
            $('#file_upload').val('');
        },
        error: function (returndata) {
            $.messager.alert('错误', '文件上传失败', 'error');
        }

    });
}

function _render_contract_file(src, picname) {
    var image = new Image();
    image.onload = function () {
        //canvas 
        var canvas = document.createElement('canvas');
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
            action: 'insert_order_contract_file',
            od_seq: cur_ed_od_seq, 
            mode: 'pic',
            rnd: Math.random(),
        },
            function (returndata) {
                $.messager.progress('close');
                var data = JSON.parse(returndata);
                if (data.result == 1) {

                    if (cur_ed_od_seq == undefined) {
                        var rows = $("#tab_order_contract_files").datagrid('getRows');

                        rows.push({
                            file_nam: data.file_nam,
                            file_path: data.file_path,
                            file_record_id: data.file_record_id,
                            amc_id: '',
                            amc_no: '',
                            file_seq: data.file_seq,
                        });
                        $("#tab_order_contract_files").datagrid('loadData', rows);

                    } else {
                        $("#tab_order_contract_files").datagrid('loadData', { total: data.order_contract_file_info.length, rows: data.order_contract_file_info });
                    } 

                    $.messager.alert('提示', data.msg, 'info');
                } else {
                    $.messager.alert('错误', data.msg, 'error');
                }

                $('#file_upload').val('');
            });
    }
    image.src = src;
}

//删除合同文件 
function delete_order_contract_file() { 
    if (!can_edit_order()) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法执行此操作', 'error');
        return;
    } 
    var rows = $('#tab_order_contract_files').datagrid('getSelections');

    if (rows.length == 0) {
        $.messager.alert('错误提示', '错误: 选择要删除的文件，然后在执行此操作', 'error');
        return;
    }

    var file_seq = '';

    $.each(rows, function (i, item) {
        if (file_seq.length == 0) {
            file_seq = item.file_seq;
        } else {
            file_seq += ',' + item.file_seq;
        }
    });


    $.messager.confirm('删除提示', '确认要删除此合同文件？',
        function (r) {
            if (r) {
                post('../Ashx/order.ashx', {
                    rnd: Math.random(),
                    action: 'delete_order_contract_file',
                    od_seq: cur_ed_od_seq,
                    file_seq: file_seq,
                }, function (data) {
                    if (data.result == 1) {
                        if (cur_ed_od_seq == undefined) {
                            var old_rows = $("#tab_order_contract_files").datagrid('getRows');

                            var new_rows = [];

                            $.each(old_rows, function (i, oitem) {
                                var bHas = false;
                                $.each(rows, function (i, ditem) {
                                    if (ditem.file_seq == oitem.file_seq) {
                                        bHas = true;
                                    }
                                });

                                if (!bHas) {
                                    new_rows.push(oitem);
                                }
                            }); 
                            $("#tab_order_contract_files").datagrid('loadData', new_rows);
                            $.messager.alert('提示', '合同文件删除成功', 'info');
                        } else {
                            $("#tab_order_contract_files").datagrid('loadData', { total: data.order_contract_file_info.length, rows: data.order_contract_file_info });
                            $.messager.alert('提示', data.msg, 'info');
                        }
                        
                        
                    } else {
                        $.messager.alert('错误', data.msg, 'error');
                    }
                }, true);
            }
        });
     
}

function show_page_customs() {



    $('.dv_edit_order_menu_tab').removeClass('dv_edit_order_menu_tab_focus');
    $('.dv_edit_order_menu_tab').eq(2).addClass('dv_edit_order_menu_tab_focus');
    var $old_page = $cur_page;
    $cur_page = $('div.page_order_customs');
    $old_page.fadeOut(50, function () {
        $cur_page.fadeIn(50, function () {
            $cur_page.layout({ fit: true });
        });
    });

}


// 查看审核流水
function view_of_approval_details() {

    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];


    if (cur_order.amc_id == undefined || cur_order.amc_id.length == 0) {
        $.messager.alert('提示','当前委托未提交锁单审核!','info');
        return;
    }
    show_approval_details(cur_order.amc_id);
    
}
function view_of_co_approval_details() {

    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];


    if (cur_order.co_amc_id == undefined || cur_order.co_amc_id.length == 0) {
        $.messager.alert('提示', '当前委托未提交改单审核!', 'info');
        return;
    }
    show_approval_details(cur_order.co_amc_id);

}

// 打开拷贝订单列表  
function copy_insert_order() {
    $("#tab_win_order").datagrid('load', {
            rnd: Math.random(),
            action: 'get_order_list',
            like_str: $.trim($('#search_win_like_str').val()),
            od_typ: $('#search_win_od_typ').combobox('getValue'),
            od_status_id: $('#search_od_status_id').combobox('getValue'),
            od_project_typ: $('#search_win_od_project_typ').combobox('getValue'),
            od_cargo_agent_cu_id: $('#search_win_od_cargo_agent_cu_id').data('cu_id'),
            od_delegate_cu_id: $('#search_win_od_delegate_cu_id').data('cu_id'),
            od_box_typ_id: $('#search_win_od_box_typ').combobox('getValue'),
            od_beg_fee_dat: $('#search_win_od_beg_fee_dat').datebox('getValue'),
            od_end_fee_dat: $('#search_win_od_end_fee_dat').datebox('getValue'),
            od_service_id: $('#search_win_od_service_id').combobox('getValue'),
            od_water_way_flag: $('#search_win_od_water_flag').is(':checked') ? 1 : 0,
            od_sub_way_flag: $('#search_win_od_sub_way_flag').is(':checked') ? 1 : 0,
            od_road_way_flag: $('#search_win_od_sub_way_flag').is(':checked') ? 1 : 0,
            od_air_way_flag: $('#search_win_od_sub_way_flag').is(':checked') ? 1 : 0,

            od_trade_typ_id: $('#search_win_od_trade_typ_id').combobox('getValue'),
        } );


    $('#win_of_copy_from_order').window('open');
}

function refresh_win_order_list() {
    $("#tab_win_order").datagrid('load', {
        rnd: Math.random(),
        action: 'get_order_list',
        like_str: $.trim($('#search_win_like_str').val()),
        od_typ: $('#search_win_od_typ').combobox('getValue'),
        od_status_id: $('#search_od_status_id').combobox('getValue'),
        od_project_typ: $('#search_win_od_project_typ').combobox('getValue'),
        od_cargo_agent_cu_id: $('#search_win_od_cargo_agent_cu_id').data('cu_id'),
        od_delegate_cu_id: $('#search_win_od_delegate_cu_id').data('cu_id'),
        od_box_typ_id: $('#search_win_od_box_typ').combobox('getValue'),
        od_beg_fee_dat: $('#search_win_od_beg_fee_dat').datebox('getValue'),
        od_end_fee_dat: $('#search_win_od_end_fee_dat').datebox('getValue'),
        od_service_id: $('#search_win_od_service_id').combobox('getValue'),
        od_water_way_flag: $('#search_win_od_water_flag').is(':checked') ? 1 : 0,
        od_sub_way_flag: $('#search_win_od_sub_way_flag').is(':checked') ? 1 : 0,
        od_road_way_flag: $('#search_win_od_sub_way_flag').is(':checked') ? 1 : 0,
        od_air_way_flag: $('#search_win_od_sub_way_flag').is(':checked') ? 1 : 0,

        od_trade_typ_id: $('#search_win_od_trade_typ_id').combobox('getValue'),
    });
}

//初始化 订单列表
function init_tab_win_order() {
    $("#tab_win_order").datagrid({
        url: '../Ashx/order.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_order_list',
            like_str: $.trim($('#search_win_like_str').val()),
            od_typ: $('#search_win_od_typ').combobox('getValue'),
            od_status_id: 10000,
            od_project_typ: $('#search_win_od_project_typ').combobox('getValue'),
            od_cargo_agent_cu_id: $('#search_win_od_cargo_agent_cu_id').data('cu_id'),
            od_delegate_cu_id: $('#search_win_od_delegate_cu_id').data('cu_id'),
            od_box_typ_id: $('#search_win_od_box_typ').combobox('getValue'),
            od_beg_fee_dat: $('#search_win_od_beg_fee_dat').datebox('getValue'),
            od_end_fee_dat: $('#search_win_od_end_fee_dat').datebox('getValue'),
            od_service_id: $('#search_win_od_service_id').combobox('getValue'),
            od_water_way_flag: $('#search_win_od_water_flag').is(':checked') ? 1 : 0,
            od_sub_way_flag: $('#search_win_od_sub_way_flag').is(':checked') ? 1 : 0,
            od_road_way_flag: $('#search_win_od_sub_way_flag').is(':checked') ? 1 : 0,
            od_air_way_flag: $('#search_win_od_sub_way_flag').is(':checked') ? 1 : 0,

            od_trade_typ_id: $('#search_win_od_trade_typ_id').combobox('getValue'),
        },
        method: 'post',
        pageNumber: 1,
        pageSize: 20,
        pageList: [20, 40, 80],
        singleSelect: true,
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
        selectOnCheck: false,
        checkOnSelect: false,
        frozenColumns: [[{ title: '', field: 'od_seq', width: 40, checkbox: true }, ]],
        columns: [[//显示的列

                { title: '业务基本信息', colspan: 12, align: 'center' }
                , { title: '货物信息', colspan: 4, align: ' center' } 
                , { title: '维护信息', colspan: 3, align: 'center' }
        ], [
                {
                    field: 'od_no', rowspan: 2, title: '业务编号', width: 90, sortable: true,

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
                , { field: 'od_beg_place_desc', title: '起运地', sortable: true, width: 80, }
                , { field: 'od_end_place_desc', title: '目的地', sortable: true, width: 80, }
                , { field: 'od_freight_desc', title: '承运条款', sortable: true, width: 80, }
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
                , { field: 'od_operation_nam', title: '操作', sortable: true, width: 80, }
                , { field: 'od_sales_nam', title: '销售', sortable: true, width: 80, }
                , { field: 'od_service_nam', title: '客服', sortable: true, width: 80, }
                 
        ]],
        onDblClickRow: function (index, row) {
            $('#win_of_copy_from_order').window('close');

            $.messager.confirm('拷贝订单提示', '确定要根据' + row.od_no + '委托新建新的订单吗？同意后，将直接生成新的订单（除集装箱明细外，其他均复制）。',
            function (r) {
                if (r) {
                    post('../Ashx/order.ashx', {
                        rnd: Math.random(),
                        action: 'insert_order_by_copy',
                        copy_od_seq: row.od_seq,
                    }, function (data) {
                        if (data.result == 1) {
                            edit_order(data.od_seq);

                            $.messager.alert('提示',data.msg,'info');
                        } else {
                            //
                        }
                        
                    },true);
                } else {
                    $('#win_of_copy_from_order').window('open');
                }
            });
        }, 
    });
}
