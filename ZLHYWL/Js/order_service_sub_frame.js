var cur_od_seq = undefined;
var cur_od_service_seq = undefined;
var cur_od_service_sub_seq = undefined;
var cur_od_status_id = undefined;
var cur_od_trade_typ_id = undefined;

var cur_edit_cntr_group_rowindex_main = undefined;

var cur_od_service_sub_collections = undefined;

var cur_edit_fee_rowindex_main = undefined;

var cur_order_cntr_list = undefined;

var basesetting = {};
var cur_order_collections = undefined;

var cur_od_service_cu_id = undefined;
var cur_od_service_cu_desc = undefined;

var cur_ref_month_exchange_list = undefined;
var cur_od_delivery_cargo_info = undefined;
var cur_od_take_cargo_info = undefined;
var pageNumber = 1;
var pageSize = 30;

var clumn_fliter_of_order_cntr_list = undefined;
var clumn_fliter_of_service_sub_cntr_list = undefined; 
var clumn_fliter_of_ship_voyage_cntr_list = undefined;

var cur_route_of_ship_voyage = [];

var cur_service_sub_collections = undefined;

/*
临时中转变量
主要用途: 用于 datagrid中的combogrid 获取 id值 

*/
var tmp_combogrid_cu_id = undefined; 
var tmp_combogrid_cu_desc = undefined;

$(document).ready(function () {

    $('#dlg_split_order_fee_details').dialog({
        title: '费用拆分',
        iconCls: 'icon-arrow_branch',
        autoOpen: false,
        modal: true,
        width: 400,
        height: 160,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_split_order_fee_details').dialog('close');
                }
            }]
    }).dialog('close');

    $('#dlg_fee_bind_ship_voyage').dialog({
        title: '费用绑定船舶',
        iconCls: 'icon-link_add',
        autoOpen: false,
        modal: true,
        width: 600,
        minheight: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_fee_bind_ship_voyage').dialog('close');
                }
            }]
    }).dialog('close');

    $('#dlg_cntr_ref_ship_voyage').dialog({
        title: '船舶集装箱明细',
        iconCls: 'icon-query',
        autoOpen: false,
        modal: true,
        width: 600,
        minheight: 460, 
    }).dialog('close');

    $('#dlg_od_route_ref_cntr').dialog({
        title: '绑定批次集装箱明细',
        iconCls: 'icon-edit',
        autoOpen: false,
        modal: true,
        width: 600,
        minheight: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_route_ref_cntr').dialog('close');
                }
            }]
    }).dialog('close');

    $('#dlg_od_route_ref_group_cntr').dialog({
        title: '绑定批次集装箱用量',
        iconCls: 'icon-edit',
        autoOpen: false,
        modal: true,
        width: 600,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_route_ref_group_cntr').dialog('close');
                }
            }]
    }).dialog('close');
    
    $('#dlg_od_ref_month_exchange_rate').dialog({
        title: '查看费率',
        iconCls: 'icon-query',
        autoOpen: false,
        modal: true,
        width: 600,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_ref_month_exchange_rate').dialog('close');
                }
            }]
    }).dialog('close');
    $('#dlg_pre_bind_ship_voyage_to_route').dialog({
        title: '船期绑定提示',
        iconCls: 'icon-help',
        autoOpen: false,
        modal: true,
        width: 600,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_pre_bind_ship_voyage_to_route').dialog('close');
                }
            }]
    }).dialog('close');
    
    $('#dlg_od_ref_ship_voyage').dialog({
        title: '船期绑定',
        iconCls: 'icon-query',
        autoOpen: false,
        modal: true,
        width: 800,
        height: 350,
        //buttons: [
        //    {
        //        text: '关闭',
        //        iconCls: 'icon-cancel',
        //        handler: function () {
        //            $('#dlg_od_ref_ship_voyage').dialog('close');
        //        }
        //    }]
    }).dialog('close');

    get_basesetting(); 
    
    $('.easyui-layout').eq(0).layout({
        fit:true
    });
});


function get_basesetting() { 
    basesetting = parent.call_get_father_basesetting();
    cur_order_collections = parent.call_get_father_cur_order_collections();
    cur_order_cntr_list = cur_order_collections.order_cntr_list;
    var cur_order = cur_order_collections.order_base_info_and_cargo_info[0];
    var _addtions = parent.call_get_addtions();
    cur_od_seq = cur_order.od_seq;
    cur_od_status_id = cur_order.od_status_id;
    cur_od_trade_typ_id = cur_order.od_trade_typ_id;

    cur_od_service_sub_seq = getQueryVariable('od_service_sub_seq');
    cur_od_service_seq = getQueryVariable('od_service_seq');
    
    cur_od_service_cu_id = getQueryVariable('od_service_cu_id');
    cur_od_service_cu_desc = decodeURI(getQueryVariable('od_service_cu_desc'));
    
    bind_combogrid_ship($('#search_ship_id'), new function () { });
    bind_combobox(basesetting.port_list, $('#ed_load_port'), 'p_desc', 'p_id', false);
    bind_combobox(basesetting.port_list, $('#ed_disc_port'), 'p_desc', 'p_id', false);
    bind_combobox(basesetting.port_list, $('#ed_destination_port'), 'p_desc', 'p_id', false);

    bind_combobox(basesetting.trade_typ_list, $('#ed_trade_id'), 't_desc', 't_id', false);
    bind_combobox(basesetting.ship_voyage_freight_list, $('#ed_ship_freight_id'), 'fr_name', 'fr_id', false);
   
    init_tab_od_service_sub_ref_cntr();
    init_tab_dlg_od_route_ref_cntr();
    init_tab_dlg_od_route_ref_group_cntr();
    init_tab_od_service_sub_fee_group();
    init_tab_od_service_sub_fee();
    load_tab_dlg_exchange_month_rate(); 
    
    
    init_tab_dlg_choise_ship_voyage(); 
    init_tab_dlg_fee_of_ship_voyage();
    init_dlg_tab_cntr_ref_ship_voyage();
    init_dlg_tab_ship_voyage_for_bind_fee();
    //重新装载 筛选框 
    reload_od_service_sub_infos();

    var pick_empty_no = [];
    var opr_cod = [];
    if (cur_order_cntr_list.length > 0) {
        $.each(cur_order_cntr_list, function (i, cntr) { 
 
            if (cntr.opr_cod != undefined && cntr.opr_cod.length > 0) {
                var has_opr_cod = false;
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
    //建立 备注提示 

    cur_pick_empty_no = pick_empty_no; 
    cur_opr_cod = opr_cod; 
    cur_ref_month_exchange_list = _addtions.cur_ref_month_exchange_list;
    $("#tab_dlg_exchange_month_rate").datagrid('loadData', cur_ref_month_exchange_list);
    cur_od_delivery_cargo_info = _addtions.od_delivery_cargo_info;
    cur_od_take_cargo_info = _addtions.od_take_cargo_info;
     
    $('.cls_main_layout').panel({
        fit:true
    }); 
}


/*提供给父进行 fit操作 */
function call_child_fit() {
    $('.cls_main_layout').panel({
        fit: true
    });
}
function get_father_basesetting() {
    return {
        basesetting: basesetting,
        cur_od_seq: cur_od_seq,
        cur_od_service_sub_seq: cur_od_service_sub_seq,
        cur_od_service_seq: cur_od_service_seq,
        cur_od_status_id: cur_od_status_id,
        cur_od_service_cu_id: cur_od_service_cu_id,
        cur_od_service_cu_desc: cur_od_service_cu_desc,
    };
}

function call_child_issame() {
    if (cur_od_status_id != 1) { return true; }
    var par = { 
        od_seq: cur_od_seq,
        od_service_seq: cur_od_service_seq,
        od_service_sub_seq: cur_od_service_sub_seq,
        od_service_sub_weight: $('#od_service_sub_weight').val(),
        od_service_sub_number: $('#od_service_sub_number').val(),
        od_service_sub_bluk: $('#od_service_sub_bluk').val(),
        od_service_sub_bak: $('#od_service_sub_bak').val(),

        data_route: undefined,
        data_group_cntr: $('#tab_dlg_od_route_ref_group_cntr').datagrid('getRows'),
        data_cntr: clumn_fliter_of_service_sub_cntr_list.columns_fliters('get_target_data'),
        data_fee: $('#tab_od_service_sub_fee').datagrid('getRows'),

    };
    var new_route_arr = [];
    //组成 data_route 
    $.each($('#service_route_list').find('.service_route_part'),
        function (i, obj) {
            $tar = $(obj);

            var ship_no = $tar.data('ship_no');
            var b_lock_flag = (!!ship_no && ship_no.length > 1);

            var route_item = {

                od_route_tools_owner: $($tar.find('.od_route_tools_owner')).length > 0 ? $($tar.find('.od_route_tools_owner')).data('cu_id') : '',
                od_route_tools_owner_desc: $($tar.find('.od_route_tools_owner')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_tools_owner')).val() : $($tar.find('.od_route_tools_owner')).combogrid('getText')) : '',
                od_route_from_id: $($tar.find('.od_route_from_id')).length > 0 ? (b_lock_flag ? '' : $($tar.find('.od_route_from_id')).data('pl_id')) : '',

                od_route_to_id: $($tar.find('.od_route_to_id')).length > 0 ? (b_lock_flag ? '' : $($tar.find('.od_route_to_id')).data('pl_id')) : '',
                od_route_from_desc: $($tar.find('.od_route_from_id')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_from_id')).val() : $($tar.find('.od_route_from_id')).combogrid('getText')) : '',
                od_route_to_desc: $($tar.find('.od_route_to_id')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_to_id')).val() : $($tar.find('.od_route_to_id')).combogrid('getText')) : '',
                od_route_lines_id: $($tar.find('.od_route_lines_id')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_lines_id')).data('od_route_lines_id') : $($tar.find('.od_route_lines_id')).combobox('getValue')) : '',

                od_route_seq: $tar.data('od_route_seq'),
                //时间赋值 
                od_route_etd: $($tar.find('.od_route_etd')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_etd')).val() : $($tar.find('.od_route_etd')).datebox('getValue')) : '',
                od_route_atd: $($tar.find('.od_route_atd')).length > 0 ? $($tar.find('.od_route_atd')).datebox('getValue') : '',
                od_route_eta: $($tar.find('.od_route_eta')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_eta')).val() : $($tar.find('.od_route_eta')).datebox('getValue')) : '',
                od_route_ata: $($tar.find('.od_route_ata')).length > 0 ? $($tar.find('.od_route_ata')).datebox('getValue') : '',
                //其他赋值 
                od_route_tools_desc: $($tar.find('.od_route_tools_desc')).length > 0 ? $($tar.find('.od_route_tools_desc')).val() : '',
                od_route_tools_no: $($tar.find('.od_route_tools_no')).length > 0 ? $($tar.find('.od_route_tools_no')).val() : '',
                od_route_typ: $tar.data('od_route_typ'),
                od_route_desc: $tar.data('od_route_desc'),

                od_route_freight_id: $($tar.find('.od_route_freight_id')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_freight_id')).data('od_route_freight_id') : $($tar.find('.od_route_freight_id')).combobox('getValue')) : '',
                od_route_bak: $($tar.find('.od_route_bak')).length > 0 ? $($tar.find('.od_route_bak')).val() : '',
                od_route_take_cargo_info: $($tar.find('.od_route_take_cargo_info')).length > 0 ? $($tar.find('.od_route_take_cargo_info')).val() : '',
                od_route_delivery_cargo_info: $($tar.find('.od_route_delivery_cargo_info')).length > 0 ? $($tar.find('.od_route_delivery_cargo_info')).val() : '',
                od_route_union_e_f: $($tar.find('.od_route_union_e_f')).length > 0 ? $($tar.find('.od_route_union_e_f')).combobox('getValue') : '',
                od_route_vsl: $($tar.find('.od_route_vsl')).length > 0 ? $($tar.find('.od_route_vsl')).val() : '',
                od_route_vvd: $($tar.find('.od_route_vvd')).length > 0 ? $($tar.find('.od_route_vvd')).val() : '',
                e_f_id: $tar.data('e_f_id'),
                trade_id: $tar.data('trade_id'),
                danger_flag: $tar.data('danger_flag'),
                disc_trans_flag: $tar.data('disc_trans_flag'),
                load_trans_flag: $tar.data('load_trans_flag'),

                load_port: $($tar.find('.od_route_from_id')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_from_id')).data('pl_id') : '') : '',
                disc_port: $($tar.find('.od_route_to_id')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_to_id')).data('pl_id') : '') : '',
                ship_no: $tar.data('ship_no'),


            }
            new_route_arr.push(route_item);
        }
    );
    par.data_route = new_route_arr;



}

//读取 批次服务信息 
function reload_od_service_sub_infos() {
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'get_service_sub_collections',
        od_seq: cur_od_seq,
        od_service_seq: cur_od_service_seq,
        od_service_sub_seq: cur_od_service_sub_seq,
    }, function (data) {

        cur_service_sub_collections = data;

        cur_od_service_sub_collections = $.extend(true, {}, data);


        $('#tab_dlg_od_route_ref_group_cntr').datagrid('loadData', { total: cur_od_service_sub_collections.service_sub_ref_group_cntr_list.length, rows: cur_od_service_sub_collections.service_sub_ref_group_cntr_list });
        if (cur_od_service_sub_collections.service_sub_ref_group_cntr_list.length > 0) {
            var desc = '';
            $.each(cur_od_service_sub_collections.service_sub_ref_group_cntr_list, function (i, row) {
                if (desc.length == 0) {
                    desc = row.od_service_sub_group_cntr_number + '*' + row.od_service_sub_group_cntr_siz + row.od_service_sub_group_cntr_typ;
                } else {
                    desc += ' , ' + row.od_service_sub_group_cntr_number + '*' + row.od_service_sub_group_cntr_siz + row.od_service_sub_group_cntr_typ;
                }
            });
            $('#od_route_group_cntr_desc').val(desc);
        } else {
            $('#od_route_group_cntr_desc').val('');
        }

        clumn_fliter_of_service_sub_cntr_list.columns_fliters('reset_target_data_and_clumns_fliter', cur_od_service_sub_collections.service_sub_ref_cntr_list);
        //$('#tab_od_service_sub_ref_cntr').datagrid('loadData', { total: cur_od_service_sub_collections.service_sub_ref_cntr_list.length, rows: cur_od_service_sub_collections.service_sub_ref_cntr_list });
        $("#tab_od_service_sub_fee").datagrid('loadData', { total: cur_od_service_sub_collections.service_sub_fee_list.length, rows: cur_od_service_sub_collections.service_sub_fee_list });
        //需要清空
        $('#service_route_list').html('');
        cur_route_of_ship_voyage = [];
        if (cur_od_service_sub_collections.service_sub_route_list.length > 0) {
            $.each(cur_od_service_sub_collections.service_sub_route_list, function (i, route) {
                create_service_route_part(route.od_route_seq,
                route.od_route_typ,
                route.od_route_tools_desc,
                route.od_route_tools_no,
                route.od_route_tools_owner,
                route.od_route_tools_owner_desc,
                route.od_route_from_id,
                route.od_route_from_desc,
                route.od_route_to_id,
                route.od_route_to_desc,
                route.od_route_etd,
                route.od_route_eta,
                route.od_route_atd,
                route.od_route_ata,
                route.od_route_lines_id,
                route.od_route_lines_desc,
                route.od_route_desc,
                route.od_route_freight_id,
                route.od_route_freight_desc,
                route.od_route_bak, 
                route.od_route_take_cargo_info,
                route.od_route_delivery_cargo_info,
                route.od_route_union_e_f,
                route.od_route_vsl,
                route.od_route_vvd,
                route.e_f_id,
                route.trade_id,
                route.trade_desc,
                route.danger_flag,
                route.danger_flag_desc,
                route.disc_trans_flag,
                route.disc_trans_flag_desc,
                route.load_trans_flag,
                route.load_trans_flag_desc,
                route.destination_port,
                route.destination_port_desc,
                route.ship_no
                );
                if (route.ship_no != undefined && route.ship_no.length > 0) {
                    cur_route_of_ship_voyage.push({
                        ship_no: route.ship_no,
                        ship_desc: route.od_route_tools_desc,
                        voyage_no: route.od_route_tools_no,
                        load_port_desc: route.od_route_from_desc,
                        disc_port_desc: route.od_route_to_desc,
                        freight_desc: route.od_route_freight_desc,
                        e_f_id: route.e_f_id,
                        danger_flag_desc: route.danger_flag_desc,
                        trade_desc: route.trade_desc,
                        load_trans_flag_desc: route.load_trans_flag_desc,
                        disc_trans_flag_desc: route.disc_trans_flag_desc,
                        destination_port_desc:route.destination_port_desc
                    });
                }
            }); 
        }
        var service_sub_details = cur_od_service_sub_collections.service_sub_details[0];
        $('#od_service_sub_weight').val(service_sub_details.od_service_sub_weight == undefined ? 0 : service_sub_details.od_service_sub_weight.toFixed(2));
        $('#od_service_sub_number').val(service_sub_details.od_service_sub_number == undefined ? 0 : service_sub_details.od_service_sub_number.toFixed(2));
        $('#od_service_sub_bluk').val(service_sub_details.od_service_sub_bluk == undefined ? 0 : service_sub_details.od_service_sub_bluk.toFixed(2));
        $('#od_service_sub_bak').val(service_sub_details.od_service_sub_bak);
        
    }, true);
}

//保存
function save_od_service_sub_infos() {

    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对箱量进行编辑操作', 'error');
        return;
    }
    //需要判断并关闭 费用编辑
    if (cur_edit_fee_rowindex_main != undefined) {
        $("#tab_od_service_sub_fee").datagrid("endEdit", cur_edit_fee_rowindex_main);
        cur_edit_fee_rowindex_main = undefined;
    }
    //需要判断
    var msg = '';
    if (!validate_fee_data(msg)) {
       
        return;
    }

    var par = {
        rnd: Math.random(),
        action: 'update_service_sub',
        od_seq: cur_od_seq,
        od_service_seq: cur_od_service_seq,
        od_service_sub_seq: cur_od_service_sub_seq,
        od_service_sub_weight: $('#od_service_sub_weight').val(),
        od_service_sub_number: $('#od_service_sub_number').val(),
        od_service_sub_bluk: $('#od_service_sub_bluk').val(),
        od_service_sub_bak: $('#od_service_sub_bak').val(),

        data_route: undefined,
        data_group_cntr: JSON.stringify({group_cntr_list:$('#tab_dlg_od_route_ref_group_cntr').datagrid('getRows')}),
        data_cntr: JSON.stringify({ cntr_list: clumn_fliter_of_service_sub_cntr_list.columns_fliters('get_target_data')}),
        data_fee: JSON.stringify({ fee_list: $('#tab_od_service_sub_fee').datagrid('getRows') }),
    };

    var new_route_arr = [];
    //组成 data_route 
    $.each($('#service_route_list').find('.service_route_part'),
        function (i, obj) {
            $tar = $(obj);

            var ship_no = $tar.data('ship_no');
            var b_lock_flag = (!!ship_no && ship_no.length > 1);

            var route_item = {

                od_route_tools_owner: $($tar.find('.od_route_tools_owner')).length > 0 ? $($tar.find('.od_route_tools_owner')).data('cu_id') : '',
                od_route_tools_owner_desc: $($tar.find('.od_route_tools_owner')).length > 0 ? (b_lock_flag?$($tar.find('.od_route_tools_owner')).val():$($tar.find('.od_route_tools_owner')).combogrid('getText')) : '' ,
                od_route_from_id: $($tar.find('.od_route_from_id')).length > 0 ? (b_lock_flag?'':$($tar.find('.od_route_from_id')).data('pl_id')): '',

                od_route_to_id: $($tar.find('.od_route_to_id')).length > 0 ? (b_lock_flag?'':$($tar.find('.od_route_to_id')).data('pl_id')) : '',
                od_route_from_desc: $($tar.find('.od_route_from_id')).length > 0 ? (b_lock_flag?$($tar.find('.od_route_from_id')).val():$($tar.find('.od_route_from_id')).combogrid('getText')) : '',
                od_route_to_desc: $($tar.find('.od_route_to_id')).length > 0 ? (b_lock_flag?$($tar.find('.od_route_to_id')).val():$($tar.find('.od_route_to_id')).combogrid('getText')) : '',
                od_route_lines_id: $($tar.find('.od_route_lines_id')).length > 0 ? (b_lock_flag?$($tar.find('.od_route_lines_id')).data('od_route_lines_id'):$($tar.find('.od_route_lines_id')).combobox('getValue')) : '',

                od_route_seq:  $tar.data('od_route_seq') ,
                //时间赋值 
                od_route_etd: $($tar.find('.od_route_etd')).length > 0 ? (b_lock_flag?$($tar.find('.od_route_etd')).val():$($tar.find('.od_route_etd')).datebox('getValue')): '',
                od_route_atd: $($tar.find('.od_route_atd')).length > 0 ? $($tar.find('.od_route_atd')).datebox('getValue') : '',
                od_route_eta: $($tar.find('.od_route_eta')).length > 0 ? (b_lock_flag?$($tar.find('.od_route_eta')).val():$($tar.find('.od_route_eta')).datebox('getValue')) : '',
                od_route_ata: $($tar.find('.od_route_ata')).length > 0 ? $($tar.find('.od_route_ata')).datebox('getValue') : '',
                //其他赋值 
                od_route_tools_desc: $($tar.find('.od_route_tools_desc')).length > 0 ? $($tar.find('.od_route_tools_desc')).val() : '',
                od_route_tools_no: $($tar.find('.od_route_tools_no')).length > 0 ? $($tar.find('.od_route_tools_no')).val() : '',
                od_route_typ:  $tar.data('od_route_typ'),
                od_route_desc: $tar.data('od_route_desc'),

                od_route_freight_id: $($tar.find('.od_route_freight_id')).length > 0 ? (b_lock_flag?$($tar.find('.od_route_freight_id')).data('od_route_freight_id'):$($tar.find('.od_route_freight_id')).combobox('getValue')) : '',  
                od_route_bak: $($tar.find('.od_route_bak')).length > 0 ? $($tar.find('.od_route_bak')).val() : '',  
                od_route_take_cargo_info: $($tar.find('.od_route_take_cargo_info')).length > 0 ? $($tar.find('.od_route_take_cargo_info')).val() : '',  
                od_route_delivery_cargo_info: $($tar.find('.od_route_delivery_cargo_info')).length > 0 ? $($tar.find('.od_route_delivery_cargo_info')).val() : '',    
                od_route_union_e_f: $($tar.find('.od_route_union_e_f')).length > 0 ? $($tar.find('.od_route_union_e_f')).combobox('getValue') : '',  
                od_route_vsl: $($tar.find('.od_route_vsl')).length > 0 ? $($tar.find('.od_route_vsl')).val() : '',   
                od_route_vvd: $($tar.find('.od_route_vvd')).length > 0 ? $($tar.find('.od_route_vvd')).val() : '',   
                e_f_id: $tar.data('e_f_id'),
                trade_id: $tar.data('trade_id'),
                danger_flag: $tar.data('danger_flag'),
                disc_trans_flag: $tar.data('disc_trans_flag'),
                load_trans_flag: $tar.data('load_trans_flag'),
                destination_port: $tar.data('destination_port'), 
                load_port: $($tar.find('.od_route_from_id')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_from_id')).data('pl_id') : '') : '',
                disc_port: $($tar.find('.od_route_to_id')).length > 0 ? (b_lock_flag ? $($tar.find('.od_route_to_id')).data('pl_id') : '') : '',
                ship_no: $tar.data('ship_no'),

                 
            }
            new_route_arr.push(route_item);
        }
    );

    //预设值检查 
    var bRight = true;
    if (new_route_arr.length > 0) {
        for (var i = 0; i < new_route_arr.length; i++) {

            /*
                如果不是绑定 采用下面的判断 
            */

            if (new_route_arr[i].ship_no == undefined || 
                new_route_arr[i].ship_no.length == 0) {
                if (new_route_arr[i].od_route_tools_owner == '' || new_route_arr[i].od_route_tools_owner == undefined) {
                    if (new_route_arr[i].od_route_tools_owner_desc.length > 0) {
                        $.messager.alert('错误', '错误: ' + new_route_arr[i].od_route_tools_owner_desc + '不是运输工具所属单位预设值 !', 'error');
                        bRight = false;
                        return;
                    }
                }
                if (new_route_arr[i].od_route_from_id == '' || new_route_arr[i].od_route_from_id == undefined) {
                    if (new_route_arr[i].od_route_from_desc.length > 0) {
                        $.messager.alert('错误', '错误: ' + new_route_arr[i].od_route_from_desc + '不是起运地预设值!', 'error');
                        bRight = false;
                        return;
                    }
                }
                if (new_route_arr[i].od_route_to_id == '' || new_route_arr[i].od_route_to_id == undefined) {
                    if (new_route_arr[i].od_route_to_desc.length > 0) {
                        $.messager.alert('错误', '错误: ' + new_route_arr[i].od_route_to_desc + '不是目的地预设值!', 'error');
                        bRight = false;
                        return;
                    }
                }
            }  

        }
    }

    if (!bRight) return;

    par.data_route = JSON.stringify({route_list: new_route_arr});

    post('../Ashx/order.ashx',par,
    function (data) {
        if (data.result == 1) {
            $.messager.alert('提示', data.msg, 'info');

            //需要重新获取  
            reload_od_service_sub_infos();

            parent.call_service_change();


        } else {
            $.messager.alert('错误提示', data.msg, 'error');
            return;
        }
    },true);

}

//保存前需要对 费用列表进行检测，必须是符合要求的数据才能录入 
function validate_fee_data(msg) {
    var rows = $("#tab_od_service_sub_fee").datagrid('getRows');

    if (rows.length == 0) return true;

    var isRight_custom = false;
    var isRight_invoice = false;
    var isRight_fee_item = false;
    var isRight_unit = false;
    var isRight_currency = false;
    var isRight_price = false;
    var isRight_number = false;
    $.each(rows, function (i, row) {
        isRight_custom = false;
        isRight_invoice = false;
        isRight_fee_item = false;
        isRight_unit = false;
        isRight_currency = false;
        isRight_price = false;
        isRight_number = false;
        msg = '';

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
        //数量金额 不能为 0 

        if (isNaN(row.fee_price) == false && row.fee_price != undefined ) {
            isRight_price = true;
        }
        if (!isRight_price) msg += (msg.length > 0 ? '/' : '') + "单价必须是数字";
        if (isNaN(row.fee_number) == false && row.fee_number != undefined && row.fee_number != 0) {
            isRight_number = true;
        }
        if (!isRight_number) msg += (msg.length > 0 ? '/' : '') + "数量必须是数字,且不能为0";

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
        $.messager.alert('错误提示', '错误: 应付列表中第' + errow_index + '行:' + msg + '!', 'error');
        return false;
    }
}

//添加 集装箱用量
function edit_od_route_ref_group_cntr() {
    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对箱量进行编辑操作', 'error');
        return;
    }
    
    $('#tab_dlg_od_route_ref_group_cntr').datagrid('loadData', { total: cur_od_service_sub_collections.service_sub_ref_group_cntr_list.length, rows: cur_od_service_sub_collections.service_sub_ref_group_cntr_list });

    $('#dlg_od_route_ref_group_cntr').dialog({
        title: '绑定批次集装箱用量',
        iconCls: 'icon-edit',
        autoOpen: false,
        modal: true,
        width: 600,
        minheight: 460,
        buttons: [
            {
                text: '确定',
                iconCls: 'icon-ok',
                handler: function () {
                    if (cur_edit_cntr_group_rowindex_main != undefined) {
                        $('.datagrid-row').unbind('click');
                        $('#tab_dlg_od_route_ref_group_cntr').datagrid('endEdit', cur_edit_cntr_group_rowindex_main);
                    }

                    //将列表数据转换成文字数据 
                    var rows = $("#tab_dlg_od_route_ref_group_cntr").datagrid('getRows');
                    cur_od_service_sub_collections.service_sub_ref_group_cntr_list = rows;

                    if (rows.length > 0) {
                        var desc = '';

                        $.each(rows, function (i, row) {
                            if (desc.length == 0) {
                                desc = row.od_service_sub_group_cntr_number + '*' + row.od_service_sub_group_cntr_siz + row.od_service_sub_group_cntr_typ;
                            } else {
                                desc += ' , ' + row.od_service_sub_group_cntr_number + '*' + row.od_service_sub_group_cntr_siz + row.od_service_sub_group_cntr_typ;
                            }
                        }); 

                        $('#od_route_group_cntr_desc').val(desc); 
                    } else {
                        $('#od_route_group_cntr_desc').val('');
                    }
                    $('#dlg_od_route_ref_group_cntr').dialog('close');
                }
            }
            , {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_route_ref_group_cntr').dialog('close');
                }
            }]
    }).dialog('open');
}

//绑定 集装箱明细
function import_od_service_sub_ref_cntr() {
    /* 测试方法 */
     
    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对箱量进行编辑操作', 'error');
        return;
    } 
    var continue_fun = function () {
        //更新
        cur_order_collections = parent.call_get_father_cur_order_collections();
        cur_order_cntr_list = cur_order_collections.order_cntr_list;

        clumn_fliter_of_order_cntr_list.columns_fliters('reset_target_data_and_clumns_fliter', cur_order_cntr_list);

        //$('#tab_dlg_od_route_ref_cntr').datagrid('loadData', { total: cur_order_cntr_list.length, rows: cur_order_cntr_list });
        //装箱资料 
        $('#dlg_od_route_ref_cntr').dialog({
            title: '绑定批次集装箱明细',
            iconCls: 'icon-edit',
            autoOpen: false,
            modal: true,
            width: 800,
            height: 480,
            buttons: [
                {
                    text: '关闭',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#dlg_od_route_ref_cntr').dialog('close');
                    }
                }
                , {
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () {
                        //将选中数据 转移到 主表
                        var now_rows = $('#tab_dlg_od_route_ref_cntr').datagrid('getChecked');

                        var old_rows = clumn_fliter_of_service_sub_cntr_list.columns_fliters('get_target_data');

                        //存在性判断
                        $.each(now_rows, function (i, nrow) {
                            var has = false;
                            $.each(old_rows, function (j, orow) {
                                if (nrow.cntr_id == orow.cntr_id) {
                                    has = true;
                                }
                            });

                            if (!has) {
                                nrow.od_service_seq = cur_od_service_seq;
                                nrow.od_service_sub_seq = cur_od_service_sub_seq;

                                old_rows.push(nrow);
                            }
                        });
                        clumn_fliter_of_service_sub_cntr_list.columns_fliters('reset_target_data_only', old_rows);

                        $('#dlg_od_route_ref_cntr').dialog('close');
                    }
                }]
        }).dialog('open');
    }
     
    continue_fun(); 
}

//解除绑定
function delete_od_service_sub_ref_cntr() {
    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对箱明细信息进行编辑操作', 'error');
        return;
    }
    var temp_rows = [];
    var old_rows = clumn_fliter_of_service_sub_cntr_list.columns_fliters('get_target_data');
    var sel_rows = $('#tab_od_service_sub_ref_cntr').datagrid('getChecked');

    if (sel_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请勾选要移除的集装箱明细后再操作', 'error');
        return;
    }

    var cntr_id = '';
    var b_lock = false;
    $.each(sel_rows, function (i, item) {
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

    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'judge_delete_cntr',
        od_seq: cur_od_seq,
        cntr_id: cntr_id,
    }, function (data) {
        if (data.result == 1) {
            $.each(old_rows, function (o, orow) {
                var sel_flag = false;
                $.each(sel_rows, function (s, srow) {
                    if (orow.cntr_id == srow.cntr_id) {
                        sel_flag = true;
                    }
                });

                if (!sel_flag) {
                    temp_rows.push(orow);
                }
            });

            $.messager.confirm('删除提示', '请确认要删除选中的集装箱明细(若绑定船舶则相应船舶集装箱明细也会删除)？',
            function (r) {
                if (r) {
                    clumn_fliter_of_service_sub_cntr_list.columns_fliters('reset_target_data_only', temp_rows);
                }
            });
        } else {
            $.messager.alert('错误', data.msg, 'error');
        }
    }, true); 

}
 
//删除描述 
function remove_service_route_part(od_route_seq) {

    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对箱量进行编辑操作', 'error');
        return;
    }
    $.messager.confirm('删除提示', '请确认要删除选中的运程数据？',
    function (r) {
        if (r) {
            var length = $('#service_route_list').find('.service_route_part').length;
            //先找到当前的序号 
            var delete_od_route_order_by = -1;

            for (var i = 0; i < length; i++) {
                var $tar = $($('#service_route_list').find('.service_route_part')[i]);
                if ($tar.data('od_route_seq') == od_route_seq) {
                    delete_od_route_order_by = $tar.data('od_route_order_by');
                }

                if (delete_od_route_order_by > -1) {
                    //把后面的 序号 更改掉 
                    $tar.data('od_route_order_by', Number($tar.data('od_route_order_by')) - 1);
                }
            }
            //删除
            for (var i = 0; i < length; i++) {
                var $tar = $($('#service_route_list').find('.service_route_part')[i]);
                if ($tar.data('od_route_seq') == od_route_seq) {
                    /*需要增加一个这个，不然会造成 船舶删除了但是费用还是关联在 */
                    var ship_no = !$tar.data('ship_no') ? '' : $tar.data('ship_no');
                    if (ship_no.length > 0) {
                        var all_rows = $("#tab_od_service_sub_fee").datagrid('getRows');

                        $.each(all_rows, function (i, arow) {
                            var has = false;
                            if (arow.ship_no == ship_no) {
                                arow.ship_no = undefined;
                                arow.ship_desc = undefined;
                                arow.voyage_no = undefined;

                                $("#tab_od_service_sub_fee").datagrid('updateRow', { index: i, row: arow });
                            } 
                        });
                        
                        if (cur_route_of_ship_voyage.length > 0) {
                            var new_row = [];

                            $.each(cur_route_of_ship_voyage, function (i, item) {
                                if (item.ship_no != ship_no) {
                                    new_row.push(item); 
                                }
                            });
                            cur_route_of_ship_voyage = new_row; 
                        } 
                    } 

                    $tar.remove();


                    break;
                }
            }
        }
    });
     
}
//向上移动 
function move_up_service_route_part(od_route_seq) {

    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对运程进行编辑操作', 'error');
        return;
    }

    $.each($('#service_route_list').find('.service_route_part'), function (i, obj) {
        
        if ($(obj).data('od_route_seq') == od_route_seq) {
            if ($(obj).prev().size() > 0) {
                $(obj).prev().before(obj);
            }
        }
    });
    
}

//向下移动 
function move_down_service_route_part(od_route_seq) {

    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对运程进行编辑操作', 'error');
        return;
    }

    $.each($('#service_route_list').find('.service_route_part'), function (i, obj) {

        if ($(obj).data('od_route_seq') == od_route_seq) {
            if ($(obj).next().size() > 0) {
                $(obj).next().after(obj);
            }
        }
    });

}

//添加 运程描述  
function insert_service_route_part(transport_typ, transport_seq, target) {
    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对箱量进行编辑操作', 'error');
        return;
    }
    var od_route_desc = undefined;
    var od_route_typ = transport_typ;
    
    if (transport_typ == 1) {
        if (transport_seq == 1) {
            od_route_desc = '公路-收货';
        }
        if (transport_seq == 2) {
            od_route_desc = '公路-中转';
        }
        if (transport_seq == 3) {
            od_route_desc = '公路-交货';
        }
    }

    if (transport_typ == 2) {
        od_route_desc = convertToChinese(transport_seq) + '程铁路'; 
    }
    if (transport_typ == 3) {
        od_route_desc = convertToChinese(transport_seq) + '程船'; 
    }
    if (transport_typ == 4) {
        od_route_desc = convertToChinese(transport_seq) + '程空运';
    }
    
    /*
        创建  铁路 时，找一程船 和 提货信息 

        创建 公路时:  提货信息，收货信息  
    */
    var od_route_vsl = undefined;
    var od_route_vvd = undefined;

    if (transport_typ == 2) {
        $.each($('#service_route_list').find('.service_route_part'), function (i, obj) {
            //找
            var $tar = $(obj);
            if ($tar.data('od_route_desc') == '一程船') {
                od_route_vsl = $($tar.find('.od_route_vsl')).val();
                od_route_vvd = $($tar.find('.od_route_vvd')).val();
            }

        });
    }
    

    
    create_service_route_part(guid(),
        od_route_typ,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined, 
        undefined,
        od_route_desc,
        undefined,
        undefined,
        undefined,
        cur_od_take_cargo_info,
        cur_od_delivery_cargo_info,
        undefined,
        od_route_vsl,
        od_route_vvd,
        '', '', '', '', '', '', '', '', '', '', '', '');
}
//下载清单
function download_sub_way_details(od_service_sub_seq, od_route_seq) {
    

    var myparams = {
        rnd: Math.random(),
        action: 'get_sub_way_details',
        od_service_sub_seq: od_service_sub_seq,
        od_route_seq: od_route_seq
    }

    window.open('../Ashx/order.ashx?' + parseParams(myparams));
}
function download_road_way_details(od_service_sub_seq, od_route_seq) {


    var myparams = {
        rnd: Math.random(),
        action: 'get_road_way_details',
        od_service_sub_seq: od_service_sub_seq,
        od_route_seq: od_route_seq
    }

    window.open('../Ashx/order.ashx?' + parseParams(myparams));
}

function create_service_route_part(od_route_seq,
    od_route_typ,
    od_route_tools_desc,
    od_route_tools_no,
    od_route_tools_owner,
    od_route_tools_owner_desc,
    od_route_from_id,
    od_route_from_desc,
    od_route_to_id,
    od_route_to_desc,
    od_route_etd,
    od_route_eta,
    od_route_atd,
    od_route_ata,
    od_route_lines_id,
    od_route_lines_desc,
    od_route_desc,
    od_route_freight_id,
    od_route_freight_desc,
    od_route_bak,
    od_route_take_cargo_info,
    od_route_delivery_cargo_info,
    od_route_union_e_f,
    od_route_vsl,
    od_route_vvd,
    e_f_id,
    trade_id,
    trade_desc,
    danger_flag,
    danger_flag_desc,
    disc_trans_flag,
    disc_trans_flag_desc,
    load_trans_flag, 
    load_trans_flag_desc,
    destination_port,
    destination_port_desc,
    ship_no) {
    //添加 ship_no , 如果 ship_no有值，则显示已绑定，不允许进行其他编辑 

    ship_no = (!ship_no ? '' : ship_no);
    od_route_union_e_f = od_route_union_e_f == undefined ? '' : od_route_union_e_f;
    od_route_delivery_cargo_info = od_route_delivery_cargo_info == undefined ? '' : od_route_delivery_cargo_info;
    od_route_take_cargo_info = od_route_take_cargo_info == undefined ? '' : od_route_take_cargo_info;
    od_route_bak = od_route_bak == undefined ? '' : od_route_bak;
    od_route_union_e_f = od_route_union_e_f == undefined ? '' : od_route_union_e_f;
    od_route_vsl = od_route_vsl == undefined ? '' : od_route_vsl;
    od_route_vvd = od_route_vvd == undefined ? '' : od_route_vvd;

    var tools_desc_title = undefined;
    var tools_no_title = undefined;
    var tools_owner_title = undefined;

    if (od_route_typ == 1) {
        tools_desc_title = '拖车名';
        tools_no_title = '拖车号';
        tools_owner_title = '拖车公司:';
    }
    if (od_route_typ == 2) {
        tools_desc_title = '火车名';
        tools_no_title = '火车号';
        tools_owner_title = '火车公司:';
    }
    if (od_route_typ == 3) {
        tools_desc_title = '船名';
        tools_no_title = '航次';
        tools_owner_title = '船东:';
    }
    if (od_route_typ == 4) {
        tools_desc_title = '航机名';
        tools_no_title = '航机号';
        tools_owner_title = '航空公司:';
    }
    if(od_route_typ == 2){
        var $item = $('<div class="service_route_part" data-od_route_typ="' + od_route_typ + '" data-od_route_desc="' + od_route_desc + '" data-od_route_seq="' + od_route_seq + '" data-ship_no="' + ship_no + '">' +
           '<div class="top">' +
               '<div class="title">' +
                   od_route_desc +
               '</div>' +
               '<div class="tools">' +
                   '<a href="javascript:download_sub_way_details(\'' + cur_od_service_sub_seq + '\',\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" >铁路发货单</a>' +
                   '<a href="javascript:move_up_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                   '<a href="javascript:move_down_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                   '<a href="javascript:remove_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
               '</div>' +
           '</div>' +
           '<div class="middle">' +
               '<table class="tab_std" style="width:760px;">' +
                   '<col style="width:56px;" />' +
                   '<col style="width:98px;" />' +
                   '<col style="width:56px;" />' +
                   '<col style="width:98px;" />' +
                   '<col style="width:56px;" />' +
                   '<col style="width:98px;" />' +
                   '<col style="width:36px;" />' +
                   '<col style="width:108px;" />' +
                   '<col style="width:46px;" />' +
                   '<col style="width:108px;" /> ' +
                   '<tr>' +
                       '<td class="title">' + tools_owner_title + '</td>' +
                       '<td class="value" colspan="3">' +
                           '<input  class="easyui-textbox od_route_tools_owner" style="width:248px; height:22px;" />' +
                       '</td>' +                          
                       '<td class="title" >起运站:</td>' +
                       '<td class="value" colspan="3">' +
                           '<input  class="easyui-textbox od_route_from_id" style="width:238px;height:22px;" />' +
                       '</td>' +
                       '<td class="title">' + tools_desc_title + ':</td>' +
                       '<td class="value">' +
                           '<input type="text" class="easyui-textbox od_route_tools_desc" style="width:100px;" />' +
                       '</td>' +     
                   '</tr>' +
                   '<tr>' +
                       '<td class="title">ETD:</td>' +
                       '<td class="value">' +
                           '<input type="text" class="od_route_etd" style="width:90px;" />' +
                       '</td>' +
                       '<td class="title">前置船名:</td>' +
                       '<td class="value">' +
                             '<input type="text" class="easyui-textbox od_route_vsl" style="width:84px;" />' +
                       ' </td>' +
                       //'<td class="title"  >ATD:</td>' +
                       //'<td class="value">' +
                       //    '<input type="text" class="od_route_atd"   />' +
                       //'</td>' +
                       '<td class="title">目的站:</td>' +
                       '<td class="value" colspan="3">' +
                           '<input  class="od_route_to_id" style="width:238px;height:22px;" />' +
                       '</td>' +
                       '<td class="title">' + tools_no_title + ':</td>' +
                       '<td class="value">' +
                           '<input type="text" class="easyui-textbox od_route_tools_no" style="width:100px;" />' +
                       '</td>' +      
                   '</tr>' +
                   '<tr>' +  
                       '<td class="title">ETA:</td>' +
                       '<td class="value">' +
                           '<input type="text" class="od_route_eta"   style="width:90px;"/>' +
                       '</td>' +
                       '<td class="title">前置航次:</td>' +
                       '<td class="value">' +
                             '<input type="text" class="easyui-textbox od_route_vvd" style="width:84px;" />' +
                       ' </td>' +
                       //'<td class="title"  >ATA:</td>' +
                       //'<td class="value">' +
                       //    '<input type="text" class="od_route_ata"   />' +
                       //'</td>' +
                       '<td class="title">空重联运:</td>' +
                       '<td class="value" colspan="3">' +
                           '<select class="od_route_union_e_f" data-options="panelHeight:\'auto\', valueField:\'value\', textField:\'label\',filter: filterCombo,width:106" >' +
                                '<option value="" checked ></option>' +
                                '<option value="1" >是</option>' +
                                '<option value="0" >否</option>' +
                           '</select>' +
                       '</td>' +
                       //'<td class="title">线路:</td>' +
                       //'<td class="value" colspan="3">' +
                       //    '<select class="od_route_lines_id" data-options="panelHeight:\'200\',panelWidth:\'200\',valueField:\'value\', textField:\'label\',filter: filterCombo,width:248" >' +
                       //    '</select>' +
                       //'</td>' +
                       '<td class="title">条款:</td>' +
                       '<td class="value">' +
                           '<select class="od_route_freight_id" data-options="panelHeight:\'200\',panelWidth:\'130\',valueField:\'value\', textField:\'label\',filter: filterCombo,width:106" >' +
                           '</select>' +
                       '</td>' +
                   '</tr>' +
                   '<tr>' +
                        '<td class="title">收货信息:</td>' +
                       '<td class="value" colspan="7">' +
                           '<textarea  class="easyui-textarea od_route_delivery_cargo_info" style="overflow-x:hidden; overflow-y:auto;resize:none; width:710px;height:44px;" ></textarea>' +
                       '</td>' +
                   '</tr>' +
               '</table>' +
           '</div>' +
       '</div>');

        //需要初始化 select 
        //先增加 
        $('#service_route_list').append($item);
        //$.parser.parse($item);
        //然后初始化 下拉选择框 
        $.each($('#service_route_list').find('.service_route_part'),function(i,obj){
            var $tar = $(obj);

            if ($tar.data('od_route_seq') == od_route_seq) {
            
                bind_combogrid_custom($($tar.find('.od_route_tools_owner')));
                bind_combogrid_place($($tar.find('.od_route_from_id')));
                bind_combogrid_place($($tar.find('.od_route_to_id')));

                var union_e_f = [{
                    val: '',
                    lab: ''
                }, {
                    val: '1',
                    lab: '是'
                }, {
                    val: '0',
                    lab: '否'
                }];
                bind_combobox(union_e_f, $($tar.find('.od_route_union_e_f')), 'lab', 'val', false);
                //bind_combobox(basesetting.voyage_line_list, $($tar.find('.od_route_lines_id')), 'vl_show_desc', 'vl_id', false);
                bind_combobox(basesetting.freight_list, $($tar.find('.od_route_freight_id')), 'fr_name', 'fr_id', false);
                //设置选中值 
                $($tar.find('.od_route_tools_owner')).data('cu_id', od_route_tools_owner);
                $($tar.find('.od_route_tools_owner')).combogrid('setText', od_route_tools_owner_desc);

                $($tar.find('.od_route_from_id')).data('pl_id', od_route_from_id);
                $($tar.find('.od_route_to_id')).data('pl_id', od_route_to_id);
                $($tar.find('.od_route_from_id')).combogrid('setText', od_route_from_desc);
                $($tar.find('.od_route_to_id')).combogrid('setText', od_route_to_desc);

                $($tar.find('.od_route_union_e_f')).combobox('setValue', od_route_union_e_f);
                //$($tar.find('.od_route_lines_id')).combobox('setValue', od_route_lines_id);
                $($tar.find('.od_route_freight_id')).combobox('setValue', od_route_freight_id);
                //时间赋值 
                $($tar.find('.od_route_etd')).datebox({width:90}).datebox('setValue', dateformat(od_route_etd,true));
                //$($tar.find('.od_route_atd')).datebox({ width: 102 }).datebox('setValue', dateformat(od_route_atd, true));
                $($tar.find('.od_route_eta')).datebox({ width: 90 }).datebox('setValue', dateformat(od_route_eta, true));
                //$($tar.find('.od_route_ata')).datebox({ width: 102 }).datebox('setValue', dateformat(od_route_ata, true));
                //其他赋值 
                $($tar.find('.od_route_tools_desc')).val(od_route_tools_desc);
                $($tar.find('.od_route_tools_no')).val(od_route_tools_no);
                $($tar.find('.od_route_vsl')).val(od_route_vsl);
                $($tar.find('.od_route_vvd')).val(od_route_vvd);

                $($tar.find('.od_route_delivery_cargo_info')).val(od_route_delivery_cargo_info);

                $($tar.find('.btn_linkbutton')).eq(0).linkbutton({
                    title: '下载铁路发货清单',
                    plain: true,
                    iconCls: 'icon-20130406125519344_easyicon_net_16'
                });

                $($tar.find('.btn_linkbutton')).eq(1).linkbutton({
                    
                    plain:true,
                    iconCls: 'icon-bullet_arrow_up'
                });
                $($tar.find('.btn_linkbutton')).eq(2).linkbutton({
                    plain:true,
                    iconCls: 'icon-bullet_arrow_down'
                });
                $($tar.find('.btn_linkbutton')).eq(3).linkbutton({
                    plain:true,
                    iconCls: 'icon-delete'
                });
             
            } 
        }); 
    }

    if(od_route_typ == 1){
        var $item = $('<div class="service_route_part" data-od_route_typ="' + od_route_typ + '" data-od_route_desc="' + od_route_desc + '" data-od_route_seq="' + od_route_seq + '" data-ship_no="' + ship_no + '">' +
           '<div class="top">' +
               '<div class="title">' +
                   od_route_desc +
               '</div>' +
               '<div class="tools">' +
                   '<a href="javascript:download_road_way_details(\'' + cur_od_service_sub_seq + '\',\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" >公路派车单</a>' +
                   '<a href="javascript:move_up_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                   '<a href="javascript:move_down_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                   '<a href="javascript:remove_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
               '</div>' +
           '</div>' +
           '<div class="middle">' +
               '<table class="tab_std" style="width:760px;">' +
                   '<col style="width:56px;" />' +
                   '<col style="width:98px;" />' +
                   '<col style="width:56px;" />' +
                   '<col style="width:98px;" />' +
                   '<col style="width:56px;" />' +
                   '<col style="width:98px;" />' +
                   '<col style="width:36px;" />' +
                   '<col style="width:108px;" />' +
                   '<col style="width:46px;" />' +
                   '<col style="width:108px;" /> ' +
                   '<tr>' +
                       '<td class="title">' + tools_owner_title + '</td>' +
                       '<td class="value" colspan="3">' +
                           '<input  class="easyui-textbox od_route_tools_owner" style="width:248px; height:22px;" />' +
                       '</td>' +     
                       '<td class="title">条款:</td>' +
                       '<td class="value">' +
                           '<select class="od_route_freight_id" data-options="panelHeight:\'200\',panelWidth:\'130\',valueField:\'value\', textField:\'label\',filter: filterCombo,width:106" >' +
                           '</select>' +
                       '</td>' +
                       
                          
                   '</tr>' +
                   '<tr>' +
                       '<td class="title" >提货信息:</td>' +
                       '<td class="value" colspan="7">' +
                           '<textarea  class="easyui-textarea od_route_take_cargo_info" style="overflow-x:hidden; overflow-y:auto;resize:none; width:710px;height:44px;" ></textarea>' +
                       '</td>' + 
                   '</tr>' +
                   '<tr>' +  
                        '<td class="title">收货信息:</td>' +
                       '<td class="value" colspan="7">' +
                           '<textarea  class="easyui-textarea od_route_delivery_cargo_info" style="overflow-x:hidden; overflow-y:auto;resize:none; width:710px;height:44px;" ></textarea>' +
                       '</td>' + 
                   '</tr>' + 
                    '<tr>' +  
                        '<td class="title">备注:</td>' +
                       '<td class="value" colspan="7">' +
                           '<textarea  class="easyui-textarea od_route_bak" style="overflow-x:hidden; overflow-y:auto;resize:none; width:710px;height:44px;" ></textarea>' +
                       '</td>' + 
                   '</tr>' + 
               '</table>' +
           '</div>' +
       '</div>');

        //需要初始化 select 
        //先增加 
        $('#service_route_list').append($item);
        //$.parser.parse($item);
        //然后初始化 下拉选择框 
        $.each($('#service_route_list').find('.service_route_part'),function(i,obj){
            var $tar = $(obj);

            if ($tar.data('od_route_seq') == od_route_seq) {
            
                bind_combogrid_custom($($tar.find('.od_route_tools_owner')));
                //bind_combogrid_place($($tar.find('.od_route_from_id')));
                //bind_combogrid_place($($tar.find('.od_route_to_id')));

                //bind_combobox(basesetting.voyage_line_list, $($tar.find('.od_route_lines_id')), 'vl_show_desc', 'vl_id', false);
                bind_combobox(basesetting.freight_list, $($tar.find('.od_route_freight_id')), 'fr_name', 'fr_id', false);
                //设置选中值 
                $($tar.find('.od_route_tools_owner')).data('cu_id', od_route_tools_owner);
                $($tar.find('.od_route_tools_owner')).combogrid('setText', od_route_tools_owner_desc);

                //$($tar.find('.od_route_from_id')).data('pl_id', od_route_from_id);
                //$($tar.find('.od_route_to_id')).data('pl_id', od_route_to_id);
                //$($tar.find('.od_route_from_id')).combogrid('setText', od_route_from_desc);
                //$($tar.find('.od_route_to_id')).combogrid('setText', od_route_to_desc);

                //$($tar.find('.od_route_lines_id')).combobox('setValue', od_route_lines_id);
                $($tar.find('.od_route_freight_id')).combobox('setValue', od_route_freight_id);
                //时间赋值 
                //$($tar.find('.od_route_etd')).datebox({width:102}).datebox('setValue', dateformat(od_route_etd,true));
                //$($tar.find('.od_route_atd')).datebox({ width: 102 }).datebox('setValue', dateformat(od_route_atd, true));
                //$($tar.find('.od_route_eta')).datebox({ width: 102 }).datebox('setValue', dateformat(od_route_eta, true));
                //$($tar.find('.od_route_ata')).datebox({ width: 102 }).datebox('setValue', dateformat(od_route_ata, true));
                //其他赋值 
                //$($tar.find('.od_route_tools_desc')).val(od_route_tools_desc);
                //$($tar.find('.od_route_tools_no')).val(od_route_tools_no);
                $($tar.find('.od_route_bak')).val(od_route_bak);
                $($tar.find('.od_route_delivery_cargo_info')).val(od_route_delivery_cargo_info);
                $($tar.find('.od_route_take_cargo_info')).val(od_route_take_cargo_info);
                $($tar.find('.od_route_tools_no')).val(od_route_tools_no);

                $($tar.find('.btn_linkbutton')).eq(0).linkbutton({
                    title: '下载派车单',
                    plain: true,
                    iconCls: 'icon-20130406125519344_easyicon_net_16'
                });

                $($tar.find('.btn_linkbutton')).eq(1).linkbutton({
                    plain:true,
                    iconCls: 'icon-bullet_arrow_up'
                });
                $($tar.find('.btn_linkbutton')).eq(2).linkbutton({
                    plain:true,
                    iconCls: 'icon-bullet_arrow_down'
                });
                $($tar.find('.btn_linkbutton')).eq(3).linkbutton({
                    plain:true,
                    iconCls: 'icon-delete'
                });
             
            } 
        }); 
    }
    //船舶 ,船舶需要用到 ship_no 
    if (od_route_typ == 3) {

        var $item = undefined;

        //判断是否是船期绑定 
        //锁定标记
         
        if (ship_no.length > 0) {
            $item = $('<div class="service_route_part" data-od_route_typ="' + od_route_typ + '" data-od_route_desc="' + od_route_desc + '" data-od_route_seq="' + od_route_seq +
                '" data-ship_no="' + ship_no +
                '" data-e_f_id="' + e_f_id +
                '" data-trade_id="' + trade_id +
                '" data-danger_flag="' + danger_flag +
                '" data-disc_trans_flag="' + disc_trans_flag +
                '" data-load_trans_flag="' + load_trans_flag +
                '" data-destination_port="' + destination_port +
                '">' +
               '<div class="top">' +
                   '<div class="title">' +
                       od_route_desc + '<span style="color:#ed9833">【绑定】</span>' +
                   '</div>' +
                   '<div class="tools">' +
                       '<a href="javascript:show_cntr_of_ship_voyage(\'' + od_route_seq + '\',\'' + ship_no + '\');" tabindex="1" class="btn_linkbutton"  >集装箱明细</a>' +
                       '<a href="javascript:move_up_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                       '<a href="javascript:move_down_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                       '<a href="javascript:remove_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                   '</div>' +
               '</div>' +
               '<div class="middle">' +
                   '<table class="tab_std" style="width:760px;">' +
                       '<col style="width:56px;" />' +
                       '<col style="width:98px;" />' +
                       '<col style="width:56px;" />' +
                       '<col style="width:98px;" />' +
                       '<col style="width:56px;" />' +
                       '<col style="width:98px;" />' +
                       '<col style="width:56px;" />' +
                       '<col style="width:108px;" />' +
                       '<col style="width:46px;" />' +
                       '<col style="width:108px;" /> ' +
                       '<tr>' +
                           '<td class="title">' + tools_owner_title + '</td>' +
                           '<td class="value" colspan="3">' +
                               '<input  readonly="readonly" class="easyui-textbox od_route_tools_owner" style="width:248px; height:22px;" />' +
                           '</td>' +
                           '<td class="title" >装载港:</td>' +
                           '<td class="value" >' +
                               '<input readonly="readonly"   class="easyui-textbox od_route_from_id" style="width:100px;height:22px;" />' +
                           '</td>' +
                           '<td class="title" >危险品:</td>' +
                           '<td class="value" >' +
                               '<input readonly="readonly"   class="easyui-textbox danger_flag_desc" style="width:100px;height:22px;" />' +
                           '</td>' +
                           '<td class="title">船名:</td>' +
                           '<td class="value">' + 
                               '<input readonly="readonly"  type="text" class="easyui-textbox od_route_tools_desc" style="width:100px;" />' +
                           '</td>' +
                       '</tr>' +
                       '<tr>' +
                           '<td class="title">ETD:</td>' +
                           '<td class="value">' +
                               '<input  readonly="readonly"  type="text" class="easyui-textbox od_route_etd"   style="width:90px;"/>' +
                           '</td>' +
                           '<td class="title" >空重:</td>' +
                           '<td class="value" >' +
                               '<input readonly="readonly"   class="easyui-textbox e_f_id" style="width:90px;height:22px;" />' +
                           '</td>' +
                           '<td class="title">卸载港:</td>' +
                           '<td class="value" >' +
                               '<input readonly="readonly"  class="od_route_to_id easyui-textbox" style="width:100px;height:22px;" />' +
                           '</td>' +
                           '<td class="title">线路:</td>' +
                           '<td class="value">' +
                               '<input type="text" readonly="readonly" class="od_route_lines_id easyui-textbox"   style="width:100px;" />' +
                           '</td>' +
                           '<td class="title">航次:</td>' +
                           '<td class="value">' +
                               '<input readonly="readonly" type="text" class="easyui-textbox od_route_tools_no" style="width:100px;" />' +
                           '</td>' +
                       '</tr>' +
                       '<tr>' +
                           '<td class="title">ETA:</td>' +
                           '<td class="value">' +
                               '<input readonly="readonly"  type="text" class="od_route_eta easyui-textbox"   style="width:90px;"/>' +
                           '</td>' +
                           '<td class="title" >贸易:</td>' +
                           '<td class="value" >' +
                               '<input readonly="readonly"   class="easyui-textbox trade_desc" style="width:90px;height:22px;" />' +
                           '</td>' +
                           '<td class="title">目的港:</td>' +
                           '<td class="value" >' +
                               '<input readonly="readonly"  class="destination_port easyui-textbox" style="width:100px;height:22px;" />' +
                           '</td>' +
                           
                           
                           '<td class="title">条款:</td>' +
                           '<td class="value">' +
                               '<input type="text" readonly="readonly" class="od_route_freight_id easyui-textbox"   style="width:100px;" />' +
                           '</td>' +
                       '</tr>' +
                   '</table>' +
               '</div>' +
           '</div>');
            //需要初始化 select 
            //先增加 
            $('#service_route_list').append($item);
            //$.parser.parse($item);
            //然后初始化 下拉选择框 
            $.each($('#service_route_list').find('.service_route_part'), function (i, obj) {
                var $tar = $(obj); 
                if ($tar.data('od_route_seq') == od_route_seq) {
                    //判断是否是船期绑定 
                    
                    /*
                        也就是 船名航次，以及船东航线 4项进行了锁定 
                    */

                    $($tar.find('.od_route_from_id')).data('pl_id', od_route_from_id);
                    $($tar.find('.od_route_from_id')).val(od_route_from_desc);

                    $($tar.find('.od_route_to_id')).data('pl_id', od_route_to_id); 
                    $($tar.find('.od_route_to_id')).val(od_route_to_desc);

             
                    $($tar.find('.destination_port')).val(destination_port_desc); 
                    $($tar.find('.destination_port')).data('pl_id', destination_port);

                    $($tar.find('.e_f_id')).val(e_f_id);
                    $($tar.find('.trade_desc')).val(trade_desc);
                    $($tar.find('.danger_flag_desc')).val(danger_flag_desc);

                    //船东和航线不可以进行选择
                    $($tar.find('.od_route_tools_owner')).data('cu_id', od_route_tools_owner);
                    $($tar.find('.od_route_tools_owner')).val(od_route_tools_owner_desc);

                    $($tar.find('.od_route_lines_id')).val(od_route_lines_desc);
                    $($tar.find('.od_route_lines_id')).data('od_route_lines_id', od_route_lines_id);

                    $($tar.find('.od_route_etd')).val(dateformat(od_route_etd, true));
                    $($tar.find('.od_route_eta')).val(dateformat(od_route_eta, true));

                    $($tar.find('.od_route_freight_id')).data('od_route_freight_id', od_route_freight_id).val(od_route_freight_desc);
                     
  
                    //船名航次 可填写属性由lock_falg决定  
                    $($tar.find('.od_route_tools_desc')).val(od_route_tools_desc);
                    $($tar.find('.od_route_tools_no')).val(od_route_tools_no);

                    $($tar.find('.btn_linkbutton')).eq(0).linkbutton({
                        title: '查看集装箱明细',
                        plain: true,
                        iconCls: 'icon-query'
                    });
                    $($tar.find('.btn_linkbutton')).eq(1).linkbutton({
                        plain: true,
                        iconCls: 'icon-bullet_arrow_up'
                    });
                    $($tar.find('.btn_linkbutton')).eq(2).linkbutton({
                        plain: true,
                        iconCls: 'icon-bullet_arrow_down'
                    });
                    $($tar.find('.btn_linkbutton')).eq(3).linkbutton({
                        plain: true,
                        iconCls: 'icon-delete'
                    }); 
                }
            });
        } else {
            $item = $('<div class="service_route_part" data-od_route_typ="' + od_route_typ +
                '" data-od_route_desc="' + od_route_desc +
                '" data-od_route_seq="' + od_route_seq + 
                '">' +
               '<div class="top">' +
                   '<div class="title">' +
                       od_route_desc +
                   '</div>' +
                   '<div class="tools">' + 
                       '<a href="javascript:move_up_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                       '<a href="javascript:move_down_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                       '<a href="javascript:remove_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                   '</div>' +
               '</div>' +
               '<div class="middle">' +
                   '<table class="tab_std" style="width:760px;">' +
                       '<col style="width:56px;" />' +
                       '<col style="width:98px;" />' +
                       '<col style="width:56px;" />' +
                       '<col style="width:98px;" />' +
                       '<col style="width:56px;" />' +
                       '<col style="width:98px;" />' +
                       '<col style="width:36px;" />' +
                       '<col style="width:108px;" />' +
                       '<col style="width:46px;" />' +
                       '<col style="width:108px;" /> ' +
                       '<tr>' +
                           '<td class="title">' + tools_owner_title + '</td>' +
                           '<td class="value" colspan="3">' +
                               '<input  class="easyui-textbox od_route_tools_owner" style="width:248px; height:22px;" />' +
                           '</td>' +
                           '<td class="title" >起运地:</td>' +
                           '<td class="value" colspan="3">' +
                               '<input class="easyui-textbox od_route_from_id" style="width:238px;height:22px;" />' +
                           '</td>' +
                           '<td class="title">' + tools_desc_title + ':</td>' +
                           '<td class="value">' +

                               '<input  type="text" class="easyui-textbox od_route_tools_desc" style="width:100px;" />' +
                           '</td>' +
                       '</tr>' +
                       '<tr>' +
                           '<td class="title">ETD:</td>' +
                           '<td class="value">' +
                               '<input   type="text" class="easyui-textbox od_route_etd"    />' +
                           '</td>' +
                           '<td class="title"  >ATD:</td>' +
                           '<td class="value">' +
                               '<input   type="text" class="od_route_atd easyui-textbox"   />' +
                           '</td>' +
                           '<td class="title">目的地:</td>' +
                           '<td class="value" colspan="3">' +
                               '<input  class="od_route_to_id easyui-textbox" style="width:238px;height:22px;" />' +
                           '</td>' +
                           '<td class="title">' + tools_no_title + ':</td>' +
                           '<td class="value">' +
                               '<input  type="text" class="easyui-textbox od_route_tools_no" style="width:100px;" />' +
                           '</td>' +
                       '</tr>' +
                       '<tr>' +
                           '<td class="title">ETA:</td>' +
                           '<td class="value">' +
                               '<input  type="text" class="od_route_eta easyui-textbox"   />' +
                           '</td>' +
                           '<td class="title"  >ATA:</td>' +
                           '<td class="value">' +
                               '<input type="text" class="od_route_ata easyui-textbox"    />' +
                           '</td>' +
                           '<td class="title">线路:</td>' +
                           '<td class="value" colspan="3">' +
                               '<select  class="od_route_lines_id" data-options="panelHeight:\'200\',panelWidth:\'200\',valueField:\'value\', textField:\'label\',filter: filterCombo,width:238" >' +
                               '</select>' +
                           '</td>' +
                           '<td class="title">条款:</td>' +
                           '<td class="value">' +
                               '<select  class="od_route_freight_id" data-options="panelHeight:\'200\',panelWidth:\'130\',valueField:\'value\', textField:\'label\',filter: filterCombo,width:106" >' +
                               '</select>' +
                           '</td>' +
                       '</tr>' +
                   '</table>' +
               '</div>' +
           '</div>');
            //需要初始化 select 
            //先增加 
            $('#service_route_list').append($item);
            //$.parser.parse($item);
            //然后初始化 下拉选择框 
            $.each($('#service_route_list').find('.service_route_part'), function (i, obj) {
                var $tar = $(obj); 
                if ($tar.data('od_route_seq') == od_route_seq) {
                     
                    //非锁定情况下的绑定  
                    //港口绑定  这里用的是地点 
                    bind_combogrid_place($($tar.find('.od_route_from_id')));
                    bind_combogrid_place($($tar.find('.od_route_to_id')));
                    $($tar.find('.od_route_from_id')).data('pl_id', od_route_from_id);
                    $($tar.find('.od_route_to_id')).data('pl_id', od_route_to_id);
                    $($tar.find('.od_route_from_id')).combogrid('setText', od_route_from_desc);
                    $($tar.find('.od_route_to_id')).combogrid('setText', od_route_to_desc);

                    //船东
                    bind_combogrid_custom($($tar.find('.od_route_tools_owner')));
                    $($tar.find('.od_route_tools_owner')).data('cu_id', od_route_tools_owner);
                    $($tar.find('.od_route_tools_owner')).combogrid('setText', od_route_tools_owner_desc);

                    //航线绑定 
                    bind_combobox(basesetting.voyage_line_list, $($tar.find('.od_route_lines_id')), 'vl_show_desc', 'vl_id', false);
                    $($tar.find('.od_route_lines_id')).combobox('setValue', od_route_lines_id);

                    //时间绑定  可以进行选择 
                    $($tar.find('.od_route_etd')).datebox({ width: 90 }).datebox('setValue', dateformat(od_route_etd, true));
                    $($tar.find('.od_route_eta')).datebox({ width: 90 }).datebox('setValue', dateformat(od_route_eta, true));

                    bind_combobox(basesetting.freight_list, $($tar.find('.od_route_freight_id')), 'fr_name', 'fr_id', false);
                    $($tar.find('.od_route_freight_id')).combobox('setValue', od_route_freight_id);

                      
                    $($tar.find('.od_route_atd')).datebox({ width: 90 }).datebox('setValue', dateformat(od_route_atd, true));
                    $($tar.find('.od_route_ata')).datebox({ width: 90 }).datebox('setValue', dateformat(od_route_ata, true));
                    //运输协议，可以进行选择 

                    //船名航次 可填写属性由lock_falg决定  
                    $($tar.find('.od_route_tools_desc')).val(od_route_tools_desc);
                    $($tar.find('.od_route_tools_no')).val(od_route_tools_no);

                    //$($tar.find('.btn_linkbutton')).eq(0).linkbutton({
                    //    title: '查看集装箱明细',
                    //    plain: true,
                    //    iconCls: 'icon-query'
                    //});
                    $($tar.find('.btn_linkbutton')).eq(0).linkbutton({
                        plain: true,
                        iconCls: 'icon-bullet_arrow_up'
                    });
                    $($tar.find('.btn_linkbutton')).eq(1).linkbutton({
                        plain: true,
                        iconCls: 'icon-bullet_arrow_down'
                    });
                    $($tar.find('.btn_linkbutton')).eq(2).linkbutton({
                        plain: true,
                        iconCls: 'icon-delete'
                    }); 
                }
            });
        }

        

        
    }

    if (  od_route_typ == 4) {
        var $item = $('<div class="service_route_part" data-od_route_typ="' + od_route_typ + '" data-od_route_desc="' + od_route_desc + '" data-od_route_seq="' + od_route_seq + '" data-ship_no="' + ship_no + '">' +
           '<div class="top">' +
               '<div class="title">' +
                   od_route_desc +
               '</div>' +
               '<div class="tools">' +
                   '<a href="javascript:move_up_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                   '<a href="javascript:move_down_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
                   '<a href="javascript:remove_service_route_part(\'' + od_route_seq + '\');" tabindex="1" class="btn_linkbutton" ></a>' +
               '</div>' +
           '</div>' +
           '<div class="middle">' +
               '<table class="tab_std" style="width:760px;">' +
                   '<col style="width:56px;" />' +
                   '<col style="width:98px;" />' +
                   '<col style="width:56px;" />' +
                   '<col style="width:98px;" />' +
                   '<col style="width:56px;" />' +
                   '<col style="width:98px;" />' +
                   '<col style="width:36px;" />' +
                   '<col style="width:108px;" />' +
                   '<col style="width:46px;" />' +
                   '<col style="width:108px;" /> ' +
                   '<tr>' +
                       '<td class="title">' + tools_owner_title + '</td>' +
                       '<td class="value" colspan="3">' +
                           '<input  class="easyui-textbox od_route_tools_owner" style="width:248px; height:22px;" />' +
                       '</td>' +
                       '<td class="title" >起运地:</td>' +
                       '<td class="value" colspan="3">' +
                           '<input  class="easyui-textbox od_route_from_id" style="width:238px;height:22px;" />' +
                       '</td>' +
                       '<td class="title">' + tools_desc_title + ':</td>' +
                       '<td class="value">' +
                           '<input type="text" class="easyui-textbox od_route_tools_desc" style="width:100px;" />' +
                       '</td>' +
                   '</tr>' +
                   '<tr>' +
                       '<td class="title">ETD:</td>' +
                       '<td class="value">' +
                           '<input type="text" class="od_route_etd"   style="width:90px;"/>' +
                       '</td>' +
                       '<td class="title"  >ATD:</td>' +
                       '<td class="value">' +
                           '<input type="text" class="od_route_atd"    style="width:90px;"/>' +
                       '</td>' +
                       '<td class="title">目的地:</td>' +
                       '<td class="value" colspan="3">' +
                           '<input  class="od_route_to_id" style="width:238px;height:22px;" />' +
                       '</td>' +
                       '<td class="title">' + tools_no_title + ':</td>' +
                       '<td class="value">' +
                           '<input type="text" class="easyui-textbox od_route_tools_no" style="width:100px;" />' +
                       '</td>' +
                   '</tr>' +
                   '<tr>' +
                       '<td class="title">ETA:</td>' +
                       '<td class="value">' +
                           '<input type="text" class="od_route_eta"   style="width:90px;"/>' +
                       '</td>' +
                       '<td class="title"  >ATA:</td>' +
                       '<td class="value">' +
                           '<input type="text" class="od_route_ata"   style="width:90px;" />' +
                       '</td>' +
                       '<td class="title">线路:</td>' +
                       '<td class="value" colspan="3">' +
                           '<select class="od_route_lines_id" data-options="panelHeight:\'200\',panelWidth:\'200\',valueField:\'value\', textField:\'label\',filter: filterCombo,width:238" >' +
                           '</select>' +
                       '</td>' +
                       '<td class="title">条款:</td>' +
                       '<td class="value">' +
                           '<select class="od_route_freight_id" data-options="panelHeight:\'200\',panelWidth:\'130\',valueField:\'value\', textField:\'label\',filter: filterCombo,width:106" >' +
                           '</select>' +
                       '</td>' +
                   '</tr>' +
               '</table>' +
           '</div>' +
       '</div>');

        //需要初始化 select 
        //先增加 
        $('#service_route_list').append($item);
        //$.parser.parse($item);
        //然后初始化 下拉选择框 
        $.each($('#service_route_list').find('.service_route_part'), function (i, obj) {
            var $tar = $(obj);

            if ($tar.data('od_route_seq') == od_route_seq) {

                bind_combogrid_custom($($tar.find('.od_route_tools_owner')));
                bind_combogrid_place($($tar.find('.od_route_from_id')));
                bind_combogrid_place($($tar.find('.od_route_to_id')));

                bind_combobox(basesetting.voyage_line_list, $($tar.find('.od_route_lines_id')), 'vl_show_desc', 'vl_id', false);
                bind_combobox(basesetting.freight_list, $($tar.find('.od_route_freight_id')), 'fr_name', 'fr_id', false);
                //设置选中值 
                $($tar.find('.od_route_tools_owner')).data('cu_id', od_route_tools_owner);
                $($tar.find('.od_route_tools_owner')).combogrid('setText', od_route_tools_owner_desc);

                $($tar.find('.od_route_from_id')).data('pl_id', od_route_from_id);
                $($tar.find('.od_route_to_id')).data('pl_id', od_route_to_id);
                $($tar.find('.od_route_from_id')).combogrid('setText', od_route_from_desc);
                $($tar.find('.od_route_to_id')).combogrid('setText', od_route_to_desc);

                $($tar.find('.od_route_lines_id')).combobox('setValue', od_route_lines_id);
                $($tar.find('.od_route_lines_id')).data('od_route_lines_id', od_route_lines_id);

                $($tar.find('.od_route_freight_id')).combobox('setValue', od_route_freight_id);


                //时间赋值 
                $($tar.find('.od_route_etd')).datebox({ width: 90 }).datebox('setValue', dateformat(od_route_etd, true));
                $($tar.find('.od_route_atd')).datebox({ width: 90 }).datebox('setValue', dateformat(od_route_atd, true));
                $($tar.find('.od_route_eta')).datebox({ width: 90 }).datebox('setValue', dateformat(od_route_eta, true));
                $($tar.find('.od_route_ata')).datebox({ width: 90 }).datebox('setValue', dateformat(od_route_ata, true));
                //其他赋值 
                $($tar.find('.od_route_tools_desc')).val(od_route_tools_desc);
                $($tar.find('.od_route_tools_no')).val(od_route_tools_no);

                $($tar.find('.btn_linkbutton')).eq(0).linkbutton({
                    plain: true,
                    iconCls: 'icon-bullet_arrow_up'
                });
                $($tar.find('.btn_linkbutton')).eq(1).linkbutton({
                    plain: true,
                    iconCls: 'icon-bullet_arrow_down'
                });
                $($tar.find('.btn_linkbutton')).eq(2).linkbutton({
                    plain: true,
                    iconCls: 'icon-delete'
                });

            }
        });
    }

}




 
//初始化 批次集装箱明细
function init_tab_od_service_sub_ref_cntr() {
    $("#tab_od_service_sub_ref_cntr").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_od_service_sub_ref_cntr_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ title: '', field: 'cntr_id', width: 40, checkbox: true }, ]],
        columns: [[//显示的列
            {
                field: 'cntr_order_by_id', rowspan: 2, title: '编号', width: 40,
            }
            , { field: 'cntr_no', title: '箱号', sortable: true, width: 100 }
            , { field: 'opr_cod', title: '箱主', sortable: true, width: 60 }
            , { field: 'eqp_typ', title: '尺寸', width: 40, }
            , { field: 'eqp_siz', title: '箱型', width: 40, }
            , { field: 'seal_no', title: '商封号', width: 120, } 
            , { field: 'bill_no', title: '提单号', width: 150, }
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
            , { field: 'pick_empty_no', title: '空箱提单号', width: 150, }
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
            , { field: 'cntr_gross_weight', title: '毛重', width: 40, }
        ]],
        onLoadSuccess: function (data) {
            if (!clumn_fliter_of_service_sub_cntr_list) {
                clumn_fliter_of_service_sub_cntr_list = $('#clumn_fliter_of_service_sub_cntr_list').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_od_service_sub_ref_cntr'),
                    cur_cls_target_body: 'cls_service_sub_cntr_region'
                });
            }

            $('#tab_od_service_sub_ref_cntr').datagrid('reloadFooter', [
                {
                    cntr_order_by_id: '合计:',
                    cntr_no: data.rows.length + '箱',
                    cargo_net_wgt: table_compute('tab_od_service_sub_ref_cntr', 'cargo_net_wgt'),
                    cargo_pick_number: table_compute('tab_od_service_sub_ref_cntr', 'cargo_pick_number'),
                    cargo_bluk: table_compute('tab_od_service_sub_ref_cntr', 'cargo_bluk'),
                }
            ]);


        },
    });
}
function clear_columns_filter_of_service_sub_ref_cntr() {
    clumn_fliter_of_service_sub_cntr_list.columns_fliters('clear');
}

//初始化 批次集装箱明细
function init_tab_dlg_od_route_ref_cntr() {
    $("#tab_dlg_od_route_ref_cntr").datagrid({
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
        toolbar: '#tab_dlg_od_route_ref_cntr_bar',
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
            , { field: 'cntr_no', title: '箱号', sortable: true, width: 100 }
            , { field: 'opr_cod', title: '箱主', sortable: true, width: 60 }
            , { field: 'eqp_siz', title: '尺寸', width: 40, }
            , { field: 'eqp_typ', title: '箱型', width: 40, }
            , { field: 'seal_no', title: '商封号', width: 120, } 
            , { field: 'bill_no', title: '提单号', width: 150, }
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
            if (!clumn_fliter_of_order_cntr_list) {
                clumn_fliter_of_order_cntr_list = $('#clumn_fliter_of_order_cntr_list').columns_fliters({
                    target_tab_data: data.rows,
                    tag_tab: $('#tab_dlg_od_route_ref_cntr'),
                    cur_cls_target_body: 'cls_order_cntr_region'
                });
            }
            
            //$('#tab_dlg_od_route_ref_cntr').datagrid('reloadFooter', [
            //    {
            //        cntr_order_by_id: '合计:',
            //        cntr_no: data.rows.length + '箱',
            //        cargo_net_wgt: table_compute('tab_dlg_od_route_ref_cntr', 'cargo_net_wgt'),
            //        cargo_pick_number: table_compute('tab_dlg_od_route_ref_cntr', 'cargo_pick_number'),
            //        cargo_bluk: table_compute('tab_dlg_od_route_ref_cntr', 'cargo_bluk'),
            //    }
            //]);
        },
    });
}
function clear_columns_filter_of_order_cntr() {
    clumn_fliter_of_order_cntr_list.columns_fliters('clear');
}

//初始化 委托 箱量信息
function init_tab_dlg_od_route_ref_group_cntr() {
    $("#tab_dlg_od_route_ref_group_cntr").datagrid({
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
        toolbar: '#tab_dlg_od_route_ref_group_cntr_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ title: '', field: 'ck_', width: 40, checkbox: true }, ]],
        columns: [[//显示的列
            {
                field: 'od_service_sub_group_cntr_number', title: '数量', width: 40,
                editor: {
                    type: 'numberbox', options: { precision: 2 },
                },
            }
            , {
                field: 'od_service_sub_group_cntr_siz', title: '尺寸', sortable: true, width: 60,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'cs_desc',
                        textField: 'cs_desc',
                        data: basesetting.container_siz_list,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'od_service_sub_group_cntr_typ', title: '箱型', width: 60,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'ct_name',
                        textField: 'ct_name',
                        data: basesetting.container_typ_list,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
            , {
                field: 'od_service_sub_group_pin_flag', title: '整/拼', width: 60,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'value',
                        textField: 'label',
                        data: basesetting.group_cntr_pin_typ,
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
                formatter: function (val, row, index) {
                    if (val == 1) return '整箱';
                    if (val == 0) return '拼箱';
                    return '';
                }
            }
            , {
                field: 'od_service_sub_group_cntr_opr_cod', title: '箱主', width: 60,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'sh_cod',
                        textField: 'sh_cod',
                        data: basesetting.ship_company_list,
                        filter: filterCombo,
                        panelHeight: '200',
                        panelWidth: '200',
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                }
            }
        ]],
        onAfterEdit: function (index, row, changes) {
            cur_edit_cntr_group_rowindex_main = undefined;
        },
        onBeforeEdit: function (index, row) {
            if (cur_edit_cntr_group_rowindex_main != index && cur_edit_cntr_group_rowindex_main != undefined) {
                $('#tab_dlg_od_route_ref_group_cntr').datagrid('endEdit', cur_edit_cntr_group_rowindex_main);
                cur_edit_cntr_group_rowindex_main = index;
            }
        },
        onClickRow: function (index, rowData) {
            if (cur_edit_cntr_group_rowindex_main != undefined &&
                cur_edit_cntr_group_rowindex_main != index) {
                $('.datagrid-row').unbind('click');
                $('#tab_dlg_od_route_ref_group_cntr').datagrid('endEdit', cur_edit_cntr_group_rowindex_main);
            }
            if (cur_edit_cntr_group_rowindex_main == undefined) {
                cur_edit_cntr_group_rowindex_main = index;


                $('#tab_dlg_od_route_ref_group_cntr').datagrid('beginEdit', cur_edit_cntr_group_rowindex_main);
                $('.datagrid-row-editing').unbind('click').bind('click', function () {
                    event.stopPropagation();
                });

                $(document).on('click', ':not(.datagrid-row)', function () {
                    if (cur_edit_cntr_group_rowindex_main != undefined) {
                        $('.datagrid-row').unbind('click');
                        $('#tab_dlg_od_route_ref_group_cntr').datagrid('endEdit', cur_edit_cntr_group_rowindex_main);
                    }
                });
            }

           

            
        },
        onLoadSuccess: function (data) {

        },
    });
}

//初始化费率汇总表
function init_tab_od_service_sub_fee_group() {
    $("#tab_od_service_sub_fee_group").datagrid({
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
        toolbar: '#tab_od_service_sub_fee_group_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        // frozenColumns: [[{ title: '', field: '_ck', width: 40, checkbox: true }, ]],
        columns: [[//显示的列
            {
                field: 'cr_desc', title: '币种', width: 50,
            }
            , {
                field: 'fee_amount', title: '小计', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    if (row.cr_id == undefined) return ''
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'cr_rate', title: '汇率', sortable: true, width: 50,
                formatter: function (value, row, index) {
                    if(row.cr_id == undefined) return ''
                    else return Number(value).toFixed(4);
                }
            } 
            , {
                field: 'cr_fee_std_group', title: '本币小计', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
             , {
                 field: 'woa_total_amount', title: '已销', width: 60,
                 formatter: function (value, row, index) {
                     return Number(value).toFixed(2);
                 }
             }
            , {
                field: 'unwoa_total_amount', title: '未销', width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                }
            }
        ]],
        onLoadSuccess: function (data) {
            $('#tab_od_service_sub_fee_group').datagrid('reloadFooter', [
                {
                    cr_desc: '本币:',
                     
                    cr_fee_std_group: table_compute('tab_od_service_sub_fee_group', 'cr_fee_std_group'),
                    woa_total_amount: table_compute('tab_od_service_sub_fee_group', 'woa_total_amount'),
                    unwoa_total_amount: table_compute('tab_od_service_sub_fee_group', 'unwoa_total_amount'),
                }
            ]);
        },
    });
}

//初始化 费用表
function init_tab_od_service_sub_fee() {
    $("#tab_od_service_sub_fee").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_od_service_sub_fee_bar',
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        showFooter: true,
        frozenColumns: [[
            { title: '', field: 'fee_seq', width: 40, checkbox: true }
            , {
                title: '', field: 'ship_no', width: 20, 
                formatter: function (value, row, index) {
                    if (value != undefined && value.length > 0) { 
                        
                        return '<span style="color:blue" title="' + (row.ship_desc + '/' + row.voyage_no) + '"><i class="fa fa-ship"></i></span>';
                    } else {
                        return '';
                    } 
                },
            }
            , {
                field: 'fee_status_desc', title: '状态', sortable: true, width: 46,
                styler: function (value, row, index) {
                    if (row.fee_change_lock_flag == 1) {
                        return 'background-color:#ea60ff;color:#FFF;';
                    } else {
                        switch (row.fee_status) {
                            case 1: return 'background-color:#fff;color:#000;';
                            case 2: return 'background-color:#f3e676;color:#000;';
                            case 3: return 'background-color:#7af7f6;color:#000;';
                            case 4: return 'background-color:#09c41f;color:#fff;';
                            case 9: return 'background-color:#ef1956;color:#fff;';
                        }
                    }
                }
            }
        ]],
        columns: [[//显示的列
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
                            var ed = $('#tab_od_service_sub_fee').datagrid('getEditor', { index: cur_edit_fee_rowindex_main, field: 'fee_cu_desc' });
                            $(ed.target).combogrid('setText',item.cu_name);
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
                field: 'fee_number', title: '数量', sortable: true, width: 60,
                formatter: function (value, row, index) {
                    return Number(value).toFixed(2);
                },
                editor: {
                    type: 'numberbox', options: { precision: 2},
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
                field: 'fee_currency_rate', title: '汇率', width: 54,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(4);
                }
            }
            , {
                field: 'fee_amount', title: '小计金额', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'woa_total_amount', title: '已付', width: 165, sortable: true,
                formatter: function (value, row, index) {
                    if (value == undefined) return '';
                    else if (isNaN(value)) return value;
                    else return Number(value).toFixed(2);
                }
            }
            , {
                field: 'fee_rel_bill_no', title: '关联提空号', width: 170, sortable: true,
                editor: {
                    type: 'combobox',
                    options: {

                        textField: 'label',
                        panelWidth: 170,
                        data: [],
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_rel_opr_cod', title: '关联箱属', width: 70, sortable: true,
                editor: {
                    type: 'combobox',
                    options: {

                        textField: 'label',
                        panelWidth: 170,
                        data: [],
                        filter: filterCombo,
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    }
                },
            }
            , {
                field: 'fee_bak', title: '备注', width: 260,
                editor: {
                    type: 'text',  
                },
            }
            , {
                field: 'od_invoice_no', title: '发票号', width: 260,
            }
            , {
                field: 'fee_record_nam', title: '记录人', width: 60,
            }
            , {
                field: 'fee_record_dat', title: '记录时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                field: 'fee_checkaccount_lock_nam', title: '对账人', width: 60,
            }
            , {
                field: 'fee_checkaccount_lock_dat', title: '对账时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            } 
            //, {
            //    field: 'fee_invoice_lock_nam', title: '开票人', width: 60,
            //}
            , {
                field: 'fee_invoice_lock_dat', title: '开票时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , { field: 'ca_title', title: '所属账单', width: 148, sortable: true, }
            , {
                field: 'ca_amc_finish_dat', title: '通审时间', width: 80, sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            //, {
            //    field: 'fee_finace_lock_nam', title: '销账', width: 60,
            //}
            , {
                field: 'fee_finace_lock_dat', title: '销账时间', width: 80,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            , {
                 field: 'fee_limit_dat', title: '付款账期', width: 80, sortable: true,
                 formatter: function (value, row, index) {
                     return dateformat(value, true);
                 },
                 styler: function (value, row, index) {
                     if (row.fee_limit_status == 1)
                         return 'background-color:#fce08b;color:#000;';
                     if (row.fee_limit_status == 2)
                         return 'background-color:#ec7a3c;color:#FFF;';
                 }
             }
        ]],
        onAfterEdit: function (index, row, changes) {
            cur_edit_fee_rowindex_main = undefined; 
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

            row.fee_amount = (row.fee_price * row.fee_number * row.fee_currency_rate).toFixed(2);
            $("#tab_od_service_sub_fee").datagrid('updateRow', {
                index: index,
                row: row
            });

            //每次保存完毕，都要对 汇总表进行更新 

            //重新计算 汇总 

            refresh_fee_group_tab(); 
        },
        onBeforeEdit: function (index, row) {
            if (cur_edit_fee_rowindex_main != index && cur_edit_fee_rowindex_main != undefined) {
                $('#tab_od_service_sub_fee').datagrid('endEdit', cur_edit_fee_rowindex_main);
                cur_edit_fee_rowindex_main = index; 
            }
        },
        onClickRow: function (index, row) {

            if (cur_edit_fee_rowindex_main != undefined &&
                cur_edit_fee_rowindex_main != index) {
                $('.datagrid-row').unbind('click');
                $('#tab_od_service_sub_fee').datagrid('endEdit', cur_edit_fee_rowindex_main);
            }
            if (cur_edit_fee_rowindex_main == undefined) {
                if (row.fee_status == 1) {
                    cur_edit_fee_rowindex_main = index;

                    tmp_combogrid_cu_id = row.fee_cu_id;
                    tmp_combogrid_cu_desc = row.fee_cu_desc;

                    $('#tab_od_service_sub_fee').datagrid('beginEdit', cur_edit_fee_rowindex_main);
                    
                    $('.datagrid-row-editing').unbind('click').bind('click', function () {
                        event.stopPropagation();
                    });
                    $(document).on('click', ':not(.datagrid-row)', function () {
                        if (cur_edit_fee_rowindex_main != undefined) {
                            $('.datagrid-row').unbind('click');
                            $('#tab_od_service_sub_fee').datagrid('endEdit', cur_edit_fee_rowindex_main);
                        }
                    });
                    var fee_rel_bill_no = $('#tab_od_service_sub_fee').datagrid('getEditor', { index: index, field: 'fee_rel_bill_no' }).target;
                    var fee_rel_opr_cod = $('#tab_od_service_sub_fee').datagrid('getEditor', { index: index, field: 'fee_rel_opr_cod' }).target;
                    fee_rel_opr_cod.css({ 'width': '64px' })
                    fee_rel_opr_cod.combobox({
                        data: cur_opr_cod,
                        valueField: 'value',
                        textField: 'label',
                        panelWidth: 260,
                        panelHeight: 'auto',
                        onSelect: function () {
                            event.stopPropagation();
                        }
                    });
                   
                    fee_rel_bill_no.css({ 'width': '164px' })
                    fee_rel_bill_no.combobox({
                        data: cur_pick_empty_no,
                        valueField:'value',
                        textField: 'label',
                        panelWidth: 260,
                        panelHeight: 'auto',
                        onSelect: function () {
                            var pen = fee_rel_bill_no.combobox('getText');

                            $.each(cur_pick_empty_no, function (i, item) {
                                if (item.label == pen) {
                                    fee_rel_opr_cod.combobox('setValue', item.opr_cod);
                                    fee_rel_opr_cod.combobox('setText', item.opr_cod);
                                }
                            });
                            event.stopPropagation();
                        }
                    });

                    fee_rel_opr_cod.combobox('setValue', row.fee_rel_opr_cod);
                    fee_rel_bill_no.combobox('setValue', row.fee_rel_bill_no);
                    fee_rel_opr_cod.combobox('setText', row.fee_rel_opr_cod);
                    fee_rel_bill_no.combobox('setText', row.fee_rel_bill_no);
                } 
            }
            refresh_pay_fee_of_footer();
        },
        onLoadSuccess: function (data) {
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



            $('#tab_od_service_sub_fee').datagrid('reloadFooter', [{
                fee_number: data_group.fee_number.toFixed(2),
                fee_amount: data_group.fee_amount,
                woa_total_amount: data_group.woa_total_amount
            }]);
            refresh_fee_group_tab();
            refresh_pay_fee_of_footer();
        },
        onCheck: function (index, row) {
            refresh_pay_fee_of_footer();
        },
        onUncheck: function (index, row) {
            refresh_pay_fee_of_footer();
        },
        onCheckAll: function (index, row) {
            refresh_pay_fee_of_footer();
        },
        onUncheckAll: function (index, row) {
            refresh_pay_fee_of_footer();
        },
    });
}
function refresh_pay_fee_of_footer() {

    var rows = $('#tab_od_service_sub_fee').datagrid('getChecked');
    var panel_title = $('.cls_panel_pay .panel-title').eq(0);
    if (rows.length > 0) {


        var data_group = {
            fee_number: 0,
            fee_amount: '',
            woa_total_amount: ''

        };
        //币种和金额 

        var data_cr_symbol_of_fee_amount = [];
        var data_cr_symbol_of_woa_total_amount = [];

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





        panel_title.html('<div style="float:left">应付费用</div><div style="float:right">选择:' + rows.length + '行,数量:' + data_group.fee_number + ' 金额:'  + data_group.fee_amount + ',已销金额:' + data_group.woa_total_amount + '</div>');

    } else {
        panel_title.html('应付费用');
    }
}

//表格初始化
function load_tab_dlg_exchange_month_rate() {

    $("#tab_dlg_exchange_month_rate").datagrid({
        data: { total: 0, rows: [] },
        singleSelect: true,
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        //toolbar: '#tab_exchange_month_rate_bar',
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            {
                field: 'er_year', width: 100, title: '年-月', align: 'left',
                formatter: function (value, row, index) {
                    return row.er_year + '年-' + (Number(row.er_month) < 10 ? ('0' + row.er_month) : row.er_month) + '月';
                }
            },
            { field: 'er_cr_name', width: 70, title: '币种', align: 'left' },
          
            { field: 'er_cr_rate', width: 90, title: '汇率', align: 'left', },
            { field: 'er_record_by_nam', width: 100, title: '记录人', align: 'left', },
            {
                field: 'er_record_dat', width: 100, title: '记录时间', align: 'left',
                formatter: function (value, row, index) {
                    if (value == undefined) {
                        return '';
                    } else {
                        return dateformat(value, true);
                    }

                }
            },
        ]],
        
    });
}
//移除 箱量 
function remove_cntr_group() {

    if (cur_edit_cntr_group_rowindex_main != undefined) {
        $("#tab_dlg_od_route_ref_group_cntr").datagrid("endEdit", cur_edit_cntr_group_rowindex_main);
        cur_edit_cntr_group_rowindex_main = undefined;
    }

    var rows = $('#tab_dlg_od_route_ref_group_cntr').datagrid('getSelections');
    if (rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请勾选数据后再执行删除操作', 'error');
        return;
    } 
    $.messager.confirm('删除提示', '请确认要删除选中的箱量数据？',
    function (r) {
        if (r) { 
            var old_rows = $('#tab_dlg_od_route_ref_group_cntr').datagrid('getRows'); 
            var new_rows = []; 
            $.each(old_rows, function (o, orow) {
                var is_delete = false;
                $.each(rows, function (d, drow) {
                    if (orow.od_service_sub_group_cntr_seq == drow.od_service_sub_group_cntr_seq) {
                        is_delete = true;
                    }
                });

                if (!is_delete) {
                    new_rows.push(orow);
                }
            });
            $("#tab_dlg_od_route_ref_group_cntr").datagrid('loadData', { total: new_rows.length, rows: new_rows }); 
        }
    });


}

//添加 箱量 
function insert_cntr_group() {
    //关闭其他编辑行
    if (cur_edit_cntr_group_rowindex_main != undefined) {
        $("#tab_dlg_od_route_ref_group_cntr").datagrid("endEdit", cur_edit_cntr_group_rowindex_main);
        cur_edit_cntr_group_rowindex_main = undefined;
    }
 
    //增加新的 行  
    var old_rows = $("#tab_dlg_od_route_ref_group_cntr").datagrid('getRows');

    old_rows.push({
        ck_: false,
        od_seq: cur_od_seq,
        od_service_seq: cur_od_service_seq,
        od_service_sub_seq: cur_od_service_sub_seq,
        od_service_sub_group_cntr_seq: guid(),
        od_service_sub_group_cntr_number: 0,
        od_service_sub_group_cntr_siz: 20,
        od_service_sub_group_cntr_typ: 'GP',
        od_service_sub_group_pin_flag: 1,
        od_service_sub_group_cntr_opr_cod: 'SOC'
    }); 
    //重新绑定数据 
    $("#tab_dlg_od_route_ref_group_cntr").datagrid('loadData', { total: old_rows.length, rows: old_rows }); 
     
}

//添加费用
function pay_insert_order_fee_details() {
    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对费用进行编辑操作', 'error');
        return;
    } 
    //关闭编辑 
    if (cur_edit_fee_rowindex_main != undefined) {
        $("#tab_od_service_sub_fee").datagrid("endEdit", cur_edit_fee_rowindex_main);
        cur_edit_fee_rowindex_main = undefined;
    }

    var old_rows = $("#tab_od_service_sub_fee").datagrid('getRows');
    
    //这里币种 不一定是 4 
    var t_currency_id = 4;

    $.each(basesetting.currency_list, function (ci, crow) {
        if (crow.cr_name == '人民币') {
            t_currency_id = crow.cr_id;
        }
    });
    old_rows.push({
        ck_: false,
        od_seq: cur_od_seq,
        od_service_seq: cur_od_service_seq,
        od_service_sub_seq: cur_od_service_sub_seq,
        fee_seq: guid(),
        rec_or_pay: -1,
        fee_cu_id: cur_od_service_cu_id, 
        fee_cu_desc: cur_od_service_cu_desc, 
        fee_item_typ: '',
        fee_price: 0,
        fee_number: 0,
        fee_unit: '',
        fee_currency_rate: 1,// 汇率
        fee_currency_id: t_currency_id,
        fee_bak: '',
        fee_record_id: '',
        fee_record_dat: '',
        fee_business_lock_id: '',
        fee_business_lock_dat: '',
        fee_invoice_lock_id: '',
        fee_invoice_lock_dat: '',
        fee_status: 1,
        fee_amount: '',
        woa_total_amount: '0',
        fee_dat: '',
        fee_limit_days: '', 
        fee_invoice_typ: '', 
        fee_record_invoice_id: '',
        fee_record_invoice_dat: '',
        fee_update_id: '',
        fee_update_dat: '',
        fee_record_nam: '',
        fee_business_lock_nam: '',
        fee_invoice_lock_nam: '',
        fee_record_invoice_nam: '',
        fee_item_typ_desc: '',
        fee_unit_desc: '',
        fee_currency_desc: '人民币',
        fee_status_desc: '新增'
    });
    //重新绑定数据 
    $("#tab_od_service_sub_fee").datagrid('loadData', { total: old_rows.length, rows: old_rows });
}

//拷贝添加费用
function pay_copy_order_fee_details() {
    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对费用进行编辑操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_main != undefined) {
        $("#tab_od_service_sub_fee").datagrid("endEdit", cur_edit_fee_rowindex_main);
        cur_edit_fee_rowindex_main = undefined;
    }

    var rows = $("#tab_od_service_sub_fee").datagrid('getChecked');

    if (rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要拷贝的行', 'error');
        return;
    }

    //深度拷贝
    var all_rows = $("#tab_od_service_sub_fee").datagrid('getRows');

    $.each(rows, function (i, row) {
        var new_row = $.extend(true, {}, row);

        new_row.fee_seq = guid(); 
        new_row.fee_bak = '';
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
        new_row.fee_status_desc = '新增'

        all_rows.push(new_row);
    });
    $("#tab_od_service_sub_fee").datagrid('loadData', { total: all_rows.length, rows: all_rows });
}

//删除添加费用
function pay_delete_order_fee_details() {
    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对费用进行编辑操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_main != undefined) {
        $("#tab_od_service_sub_fee").datagrid("endEdit", cur_edit_fee_rowindex_main);
        cur_edit_fee_rowindex_main = undefined;
    }

    var del_rows = $("#tab_od_service_sub_fee").datagrid('getChecked');

    if (del_rows.length == 0) {
        $.messager.alert('错误提示', '错误: 请选择需要删除的行', 'error');
        return;
    }
     
    var fee_seq = '';
    $.each(del_rows, function (j, drow) {
        if (fee_seq.length == 0) {
            fee_seq = drow.fee_seq;
        } else {
            fee_seq += ',' + drow.fee_seq;
        }
    });
    //这里要判断是否可以删除
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'judge_delete_order_fee',
        od_seq: cur_od_seq,
        fee_seq: fee_seq
    }, function (data) {
        if (data.result == 1) {
            var new_arr = [];
            var all_rows = $("#tab_od_service_sub_fee").datagrid('getRows');

            $.each(all_rows, function (i, arow) {
                var has = false;
                $.each(del_rows, function (j, drow) {
                    if (drow.fee_seq == arow.fee_seq) {
                        has = true;
                    }
                });

                if (!has) {
                    new_arr.push(arow);
                }
            });
            $("#tab_od_service_sub_fee").datagrid('loadData', { total: new_arr.length, rows: new_arr });
        } else {
            $.messager.alert('错误提示', data.msg, 'error');
        }
    }, true);
     
}

//拆分添加费用
function pay_split_order_fee_details() {
    if (cur_od_status_id != 1) {
        $.messager.alert('错误提示', '错误: 业务订单已锁定提交审核，无法对费用进行编辑操作', 'error');
        return;
    }
    //关闭编辑 
    if (cur_edit_fee_rowindex_main != undefined) {
        $("#tab_od_service_sub_fee").datagrid("endEdit", cur_edit_fee_rowindex_main);
        cur_edit_fee_rowindex_main = undefined;
    }

    var del_rows = $("#tab_od_service_sub_fee").datagrid('getChecked');

    if (del_rows.length != 1) {
        $.messager.alert('错误提示', '错误: 只能选择一行数据进行数量拆分', 'error');
        return;
    }
    var split_fee = del_rows[0];

    //这里要判断是否可以删除
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'judge_delete_order_fee',
        od_seq: cur_od_seq,
        fee_seq: split_fee.fee_seq
    }, function (data) {
        if (data.result == 1) {

            $('#sh_old_fee_number').html( split_fee.fee_number.toFixed(2));


            $('#ed_split_1').val(0);

            $('#ed_split_2').val(split_fee.fee_number);

            $('#ed_split_1').off('input').on('input', function () {
                var val_1 = $(this).val();

                if (val_1 == undefined || val_1 == '') {
                    val_1 = 0;
                }
                var val_2 = parseFloat(split_fee.fee_number) - val_1;

                $('#ed_split_2').val(val_2);

            });

            $('#ed_split_2').off('input').on('input', function () {
                var val_2 = $(this).val();

                if (val_2 == undefined || val_2 == '') {
                    val_2 = 0;
                }
                var val_1 = parseFloat(split_fee.fee_number) - val_2;

                $('#ed_split_1').val(val_1); 
            });


            $('#dlg_split_order_fee_details').dialog({
                title: '费用拆分',
                iconCls: 'icon-arrow_branch',
                autoOpen: false,
                modal: true,
                width: 400,
                height: 200,
                buttons: [
                    {
                        text: '关闭',
                        iconCls: 'icon-cancel',
                        handler: function () {
                            $('#dlg_split_order_fee_details').dialog('close');
                        }
                    },
                {
                    text: '确定',
                    iconCls: 'icon-ok',
                    handler: function () {
                        var val_2 = $('#ed_split_2').val();
                        var val_1 = $('#ed_split_1').val();
                        if (val_1 == undefined || val_1 == '') {
                            val_1 = 0;
                        }
                        if (val_2 == undefined || val_2 == '') {
                            val_2 = 0;
                        } 
                        if (val_1 == 0 || val_2 == 0) {
                            $.messager.alert('错误提示', '错误: 不能拆分成数量为0的', 'error');
                            return;
                        }
                        
                        //深度拷贝
                        var all_rows = $("#tab_od_service_sub_fee").datagrid('getRows');

                        $.each(all_rows, function (i, row) {

                            if (row.fee_seq == split_fee.fee_seq) {

                                row.fee_number = val_1 ;

                                var new_row = $.extend(true, {}, split_fee);

                                new_row.fee_seq = guid();
                                new_row.fee_number = val_2;
                                new_row.fee_status_desc = '新增(拆分)'

                                all_rows.push(new_row);
                            }  
                        });
                        $("#tab_od_service_sub_fee").datagrid('loadData', { total: all_rows.length, rows: all_rows });


                        $('#dlg_split_order_fee_details').dialog('close');
                    }
                }]
            }).dialog('open'); 
            
        } else {
            $.messager.alert('错误提示', data.msg, 'error');
        }
    }, true);

}

//重新计算汇总费率
function refresh_fee_group_tab() {
    var rows = $('#tab_od_service_sub_fee').datagrid('getRows');
    //币种 金额累计 换算汇率 

    var arr = [];

    $.each(rows, function (i, row) { 
        if (row.fee_currency_desc.length > 0) {
            if (arr.length == 0) {
                arr.push({
                    cr_id: row.fee_currency_id,
                    cr_desc: row.fee_currency_desc,
                    cr_rate: row.fee_currency_rate,
                    fee_amount: Number(row.fee_amount),
                    cr_fee_std_group: Number(row.fee_amount_of_base_currency),
                    cr_fee_std_group_finaced: Number(row.woa_total_amount_base_currency),
                    cr_fee_std_group_unfinaced: Number(row.unwoa_total_amount_base_currency),
                    woa_total_amount: Number(row.woa_total_amount),
                    unwoa_total_amount: Number(row.unwoa_total_amount)
                });
            } else {
                var has = false;
                $.each(arr, function (j, arow) {
                    if (arow.cr_id == row.fee_currency_id) {
                        has = true;
                        arow.fee_amount += Number(row.fee_amount);
                        arow.cr_fee_std_group += Number(row.fee_amount_of_base_currency);
                        arow.cr_fee_std_group_unfinaced += Number(row.unwoa_total_amount_base_currency);
                        arow.cr_fee_std_group_finaced += Number(row.woa_total_amount_base_currency);
                        arow.woa_total_amount += Number(row.woa_total_amount);
                        arow.unwoa_total_amount += Number(row.unwoa_total_amount);
                    }
                });
                if (!has) {
                    arr.push({
                        cr_id: row.fee_currency_id,
                        cr_desc: row.fee_currency_desc,
                        cr_rate: row.fee_currency_rate,
                        fee_amount: Number(row.fee_amount),
                        cr_fee_std_group: Number(row.fee_amount_of_base_currency),
                        cr_fee_std_group_finaced: Number(row.woa_total_amount_base_currency),
                        cr_fee_std_group_unfinaced: Number(row.unwoa_total_amount_base_currency),
                        woa_total_amount: Number(row.woa_total_amount),
                        unwoa_total_amount: Number(row.unwoa_total_amount)
                    });
                }
            }
        } 
    });

    $("#tab_od_service_sub_fee_group").datagrid('loadData', {total:arr.length,rows:arr});
}


//查看费率
function view_ref_month_exchange_rate() {

    
    $('#dlg_od_ref_month_exchange_rate').dialog({
        title: '查看费率',
        iconCls: 'icon-2012092109942',
        autoOpen: false,
        modal: true,
        width: 466,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_ref_month_exchange_rate').dialog('close');
                }
            }]
    }).dialog('open');
     
    
}


 
//判断船程运输和航空运输的获取值方式
function return_od_route_tools_desc(od_route_typ, $od_route_tools_desc) {
    if (od_route_typ == 3) {
        return $od_route_tools_desc.length > 0 ? $od_route_tools_desc.combogrid('getText') : '';
    } else {
        return $od_route_tools_desc.length > 0 ? $od_route_tools_desc.val() : '';
    }
}

//获取港口的获取值方式
function return_od_route_port_id(od_route_typ, $od_route_port) {
    if (od_route_typ == 3) {
        return $od_route_port.length > 0 ? $od_route_port.combobox('getValue') : '';
    } else {
        return $od_route_port.length > 0 ? $od_route_port.data('pl_id') : '';
    }
}
function return_od_route_port_desc(od_route_typ, $od_route_port) {
    if (od_route_typ == 3) {
        return $od_route_port.length > 0 ? $od_route_port.combobox('getText') : '';
    } else {
        return $od_route_port.length > 0 ? $od_route_port.combogrid('getText') : '';
    }
}



/*

    绑定船舶
*/