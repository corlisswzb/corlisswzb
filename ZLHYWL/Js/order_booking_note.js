var cur_order_booking_note = undefined;

/*********************订舱单***************************************************/

//清空订舱单信息 
function clear_edit_order_booking_note() {
    $('#ed_bk_delegate_desc').val('');
    $('#ed_bk_delegate_address').val('');
    $('#ed_bk_shipper_desc').val('');
    $('#ed_bk_commissioned_to').val('');
    $('#ed_bk_commissioned_tel').val('');
    $('#ed_bk_commissioned_fax').val('');
    $('#ed_bk_booking_number').val('');
    //$('#ed_bk_job_number').val('');
    $('#ed_bk_consignee_desc').val('');
    $('#ed_bk_delegate_tel').val('');
    $('#ed_bk_delegate_fax').val('');
    $('#ed_bk_delegate_ctc').val('');
    $('#ed_bk_notify_desc').val('');
    $('#ed_bk_container_typ_and_quantity').val('');
    $('#ed_bk_shipping_marks_and_no_desc').val('');
    $('#ed_bk_freight_package_desc').val('');
    $('#ed_bk_description_of_goods_desc').val('');
    $('#ed_bk_gross_weight').val('');
    $('#ed_bk_measurement').val('');
    $('#ed_bk_remarks').val('');

    $('#ed_od_bk_commissioned_id').combogrid('setText', '');
    $('#ed_od_bk_commissioned_id').data('cu_id', '');

    $('#ed_od_bk_commissioned_id2').combogrid('setText', '');
    $('#ed_od_bk_commissioned_id2').data('cu_id', '');

    $('#ed_bk_carrier_id').combobox('setValue', '');
    $('#ed_bk_closing_date').datebox('setValue', '');
    $('#ed_bk_etd').datebox('setValue', '');

    $('#ed_bk_port_of_loading_id').combogrid('setText', '');
    $('#ed_bk_port_of_transit_id').combogrid('setText', '');
    $('#ed_bk_port_of_discharge_id').combogrid('setText', '');
    $('#ed_bk_port_of_loading_id').data('pl_id', '');
    $('#ed_bk_port_of_transit_id').data('pl_id', '');
    $('#ed_bk_port_of_discharge_id').data('pl_id', '');

    $('#ed_bk_freight_term_id').combobox('setValue', '');
    $('#ed_bk_pay_method_id').combobox('setValue', '');


}

//装载 订舱单 
function load_order_booking_note(cur_order_collections) { 
    cur_order_booking_note = cur_order_collections.order_booking_note_list[0];

    if (cur_order_booking_note != null) {
        //接下来进行赋值
        $('#ed_bk_delegate_desc').val(cur_order_booking_note.bk_delegate_desc);
        $('#ed_bk_delegate_address').val(cur_order_booking_note.bk_delegate_address);
        $('#ed_bk_shipper_desc').val(cur_order_booking_note.bk_shipper_desc);
        $('#ed_bk_commissioned_to').val(cur_order_booking_note.bk_commissioned_to);
        $('#ed_bk_commissioned_tel').val(cur_order_booking_note.bk_commissioned_tel);
        $('#ed_bk_commissioned_fax').val(cur_order_booking_note.bk_commissioned_fax);
        $('#ed_bk_booking_number').val(cur_order_booking_note.bk_booking_number);
        // $('#ed_bk_job_number').val(cur_order_booking_note.bk_job_number);
        $('#ed_bk_consignee_desc').val(cur_order_booking_note.bk_consignee_desc);
        $('#ed_bk_delegate_tel').val(cur_order_booking_note.bk_delegate_tel);
        $('#ed_bk_delegate_fax').val(cur_order_booking_note.bk_delegate_fax);
        $('#ed_bk_delegate_ctc').val(cur_order_booking_note.bk_delegate_ctc);
        $('#ed_bk_notify_desc').val(cur_order_booking_note.bk_notify_desc);
        $('#ed_bk_container_typ_and_quantity').val(cur_order_booking_note.bk_container_typ_and_quantity);
        $('#ed_bk_shipping_marks_and_no_desc').val(cur_order_booking_note.bk_shipping_marks_and_no_desc);
        $('#ed_bk_freight_package_desc').val(cur_order_booking_note.bk_freight_package_desc);
        $('#ed_bk_description_of_goods_desc').val(cur_order_booking_note.bk_description_of_goods_desc);
        $('#ed_bk_gross_weight').val(cur_order_booking_note.bk_gross_weight);
        $('#ed_bk_measurement').val(cur_order_booking_note.bk_measurement);
        $('#ed_bk_remarks').val(cur_order_booking_note.bk_remarks);
        $('#ed_bk_delegate_date').datebox('setValue', dateformat(cur_order_booking_note.bk_delegate_date, true)),
        $('#ed_od_bk_commissioned_id').data('cu_id', cur_order_booking_note.bk_commissioned_id);
        $('#ed_od_bk_commissioned_id').combogrid('setText', cur_order_booking_note.bk_commissioned_desc);

        $('#ed_bk_carrier_id').combobox('setValue', cur_order_booking_note.bk_carrier_id);
        $('#ed_bk_closing_date').datebox('setValue', dateformat(cur_order_booking_note.bk_closing_date, true));
        $('#ed_bk_etd').datebox('setValue', dateformat(cur_order_booking_note.bk_etd, true));
        $('#ed_bk_port_of_loading_id').data('pl_id', cur_order_booking_note.bk_port_of_loading_id);
        $('#ed_bk_port_of_loading_id').combogrid('setText', cur_order_booking_note.bk_port_of_loading_desc);

        $('#ed_bk_port_of_transit_id').data('pl_id', cur_order_booking_note.bk_port_of_transit_id);
        $('#ed_bk_port_of_transit_id').combogrid('setText', cur_order_booking_note.bk_port_of_transit_desc);
        $('#ed_bk_port_of_discharge_id').data('pl_id', cur_order_booking_note.bk_port_of_discharge_id);
        $('#ed_bk_port_of_discharge_id').combogrid('setText', cur_order_booking_note.bk_port_of_discharge_desc);

        $('#ed_bk_freight_term_id').combobox('setValue', cur_order_booking_note.bk_freight_term_id);
        $('#ed_bk_pay_method_id').combobox('setValue', cur_order_booking_note.bk_pay_method_id);

    }
   
}
 
 
//下载订舱单 
function download_order_booking_note() {
    if (cur_ed_od_seq == undefined) {
        $.messager.alert('错误提示', '错误: 请先新建订单，然后在执行此操作', 'error');
        return;
    }

    var myparams = {
        rnd:Math.random(),
        action: 'download_booking_note',
        od_seq: cur_ed_od_seq 
    }

    window.open('../Ashx/order.ashx?' + parseParams(myparams));
}