//全局变量
var pub_rp = 0;//费用收付类型

var pub_target;
var pub_editRow=undefined;

var basesetting = undefined;
var data_project = undefined;
var data_custom = undefined;
var data_product = undefined;
var data_packing = undefined;
var data_freight = undefined;
var data_trade = undefined;
var data_boxtype = undefined;
var data_port = undefined;
//发票类型
var data_invoice=undefined;

//币种
var data_currency=undefined;

//费用类型
var data_fee_item = undefined;
//箱型
var data_container = undefined;
//业务id
var busi_id = undefined;

//集装箱数据
var new_data = [];

//【应收费用】全局变量
var sum_rec = 0;
var sum_rec_tax = 0;
//【应付费用】
var sum_pay = 0;
var sum_pay_tax = 0;

//计费单位,默认包含【票，件，车】（箱型）根据录入增加
var jfdw = [
    {value: '票', text: '票'},
    {value: '件', text: '件'},
    {value: '车', text: '车'},
    {value: '20GP', text: '20GP'},
    {value: '40HQ', text: '40HQ'},
]


$(document).ready(function () {

    //加载头部工具
    load_tab_tool();

    //加载下拉combobox
    load_combobox();

    //加载基础数据
    load_basesetting();

    //初始化集装箱表格
    init_table_packing();

    //点击事件
    load_click_event();

})

function load_click_event() {

    //模拟填写，查询
    $("#btn_search").click(function () {
        load_tab_simulate_busi(get_pams());
    })

    $("#btn_fee_search").click(function () {
        load_tab_simulate_fee(get_tab_fee_pams(), pub_target);
    })
    //


    //业务保存提交
    $("#btn_save_submit").click(function () {
        post_date(1); 
        insert_update_fee_statistics(150, 137.61);
    })

    //业务暂存提交
    $("#btn_temporary_submit").click(function () {
        post_date(0);
    })


    //模拟填写
    $("#btn_simulate_write").click(function () {

        load_tab_simulate_busi(get_pams());

        $('#dlg_simulate_busi').dialog('open');

    })


    $('#dv_tabs').tabs({
        border: false,
        onSelect: function (title) {
            if (title == "录入业务") {
                $("#dv_busi_btn").show();
            } else {
                $("#dv_busi_btn").hide();
            }
        }
    })

    //新增装箱
    $("#btn_add_bxt").click(function () {

        $("#fm_bxt").form('clear');

        $('#dlg_bxt').dialog({
            title: '批量新增箱型箱量',
            width: 400,
            height: 200,
            closed: false,
            cache: false,
            modal: true,
            buttons: [{
                text: '保存',
                iconCls: 'icon-ok',
                handler: function () {
                    load_table_packing();
                }
            }, {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_bxt').dialog('close');
                }
            }]
        });
    })
    //保存装箱
    $("#btn_save_bxt").click(function () {

        if (new_data != undefined && busi_id != undefined) {
            $.getJSON('/Ashx/business_input.ashx',
            {
                rnd: Math.random(),
                action: 'insert_packing',
                bd_std_id: busi_id,
                pack_data: JSON.stringify(new_data),
            },
            function (data) {
                if (data.result == 1) {
                    $("#sp_bxt").text(data.box_size_num);
                    init_table_packing();
                } else {
                    alert_msg('提示', data.msg);
                }
            })

        }
    })
}



//导出海运订舱excel
function click_sea_export() {

    var myparams = {
        action: 'export_sea_excel',
        busi_no: busi_id
    }

    window.open('../Ashx/business_input.ashx?' + parseParams(myparams));
}

//导出空运订舱excel
function click_sky_export() {

   
}




//保存提交数据
function post_date(state) {

    var busi_type = $("#cbx_busi_type").combobox("getValue");
    var trade = $("#cbx_trade").combobox("getValue");

    var project = $("#cbx_project").combobox("getValue");
    var boxtype = $("#cbx_boxtype").combobox("getValue");
    var wtdw = $("#cbx_wtdw").combobox("getValue");
    var chdw = $("#cbx_chdw").combobox("getValue");
    var custom_from = $("#cbx_custom_from").combobox("getValue");
    var custom_no = $("#ipt_custom_no").textbox("getValue");
    var wtsj = $("#ipt_wtsj").datebox("getValue");
    var ywsj = $("#ipt_ywsj").datebox("getValue");
    var wtbz = $("#ipt_wtbz").textbox("getValue");


    var json_wt = [];
    json_wt.push(
        {
            bd_pr_id: project,
            bd_pt_id: boxtype,
            bd_client: wtdw,
            bd_unit: chdw,
            bd_custom_from: custom_from,
            bd_custom_no: custom_no,
            bd_trust_date: wtsj,
            bd_busi_date: ywsj,
            bd_remarks: wtbz
        });


    var pm = $("#cbx_pm").combobox("getValue");
    var bz = $("#cbx_bz").combobox("getValue");
    var num = $("#ipt_num").textbox("getValue");
    var weight = $("#ipt_weight").textbox("getValue");
    var volume = $("#ipt_volume").textbox("getValue");

    var json_hw = [];
    json_hw.push(
       {
           bc_ca_id: pm,
           bc_pa_id: bz,
           bc_number: num,
           bc_weight: weight,
           bc_volume: volume
       })


    var ie = 0;//进出口
    var shr = '';
    var fhr = '';
    var tzr = '';
    var hwms = '';
    var mtbh = '';

    if (trade == 2) {
        ie = $("#cbx_ie").combobox("getValue");

        shr = $("#txta_shr").val().replaceAll('char(9)', '').replaceAll('char(32)', '').replaceAll('char(10)', '');
        fhr = $("#txta_fhr").val().replaceAll('char(9)', '').replaceAll('char(32)', '').replaceAll('char(10)', '');
        tzr = $("#txta_tzr").val().replaceAll('char(9)', '').replaceAll('char(32)', '').replaceAll('char(10)', '');
        hwms = $("#txta_ms").val().replaceAll('char(9)', '').replaceAll('char(32)', '').replaceAll('char(10)', '');
        mtbh = $("#txta_mt").val().replaceAll('char(9)', '').replaceAll('char(32)', '').replaceAll('char(10)', '');
    }

    var dcdl = '';
    var cytk = '';
    if ($("#chk_op1").next().find('input').prop('checked')) {
        dcdl = $("#slt_dcdl").combobox("getValue");
        cytk = $("#slt_cytk").combobox("getValue");
    }

    var ydh = $("#ipt_ydh").textbox("getValue");
    var qyg = $("#slt_qyg").combobox("getValue");
    var mdg = $("#slt_mdg").combobox("getValue");
    var zzg = $("#slt_zzg").combobox("getValue");
    var mdds = $("#ipt_mdd").textbox("getValue");
    var ystk = $("#slt_ystk").combobox("getValue");
    var mytk = $("#slt_mytk").combobox("getValue");
    var lyfs = $("#slt_lyfs").combobox("getValue");

    var hx = $("#ipt_hx").combobox("getValue");
    var zxfs = $("#ipt_zxfs").combobox("getValue");
    var bgfs = $("#ipt_bgfs").combobox("getValue");
    var fffs = $("#ipt_fffs").combobox("getValue");


    //记录多选钮选中操作
    var op = [];
    $("input[type='checkbox'][name='chk_op']").each(function (i, el) {
        if ($(el).prop('checked')) {
            op.push($(el).parent().prev().attr('chk_id'));
        }
    })


    var json_xq = [];
    json_xq.push(
     {
         bs_bill_no: ydh,
         bs_transport_typ: ystk,
         bs_trade_typ: mytk,
         bs_ermodal: lyfs,
         bs_operation: op.join(','),
         bs_route: hx,
         bs_pack_method: zxfs,
         bs_dlects_method: bgfs,
         bs_pay_method: fffs,
         bs_box_size: '',
         bs_booking_agent: dcdl,
         bs_ship_type: cytk,
         bs_shipper: fhr,
         bs_consignee: shr,
         bs_notify: tzr,
         bs_cargo_desc: hwms,
         bs_lable: mtbh,
         bs_start_port: qyg,
         bs_end_port: mdg,
         bs_transfer_port: zzg,
         bs_destination: mdds
     })

    //  bry_s_stid: $("#ipt_fz").combobox("getValue"),
    //  bry_e_stid: $("#ipt_dz").combobox("getValue"),

    var json_tl = [];
    if ($("#chk_op3").next().find('input').prop('checked')) {
        json_tl.push(
         {
             bry_s_stid: 0,
             bry_e_stid: 0,
             bry_ETD: $("#tl_ETD").datebox("getValue"),
             bry_ETA: $("#tl_ETA").datebox("getValue"),
             bry_ATD: $("#tl_ATD").datebox("getValue"),
             bry_ATA: $("#tl_ATA").datebox("getValue"),
             bry_train_num: $("#ipt_cc").textbox("getValue"),
             bry_cu_id: $("#slt_tldl").combobox("getValue")
         })
    }

    var json_jy = [];
    if ($("#chk_op4").next().find('input').prop('checked')) {
        json_jy.push(
         {
             brs_type: 1,
             brs_shipowner: $("#ipt_jycd").combobox("getValue"),
             brs_name_voyage: $("#ipt_jycm").textbox("getValue"),
             brs_load_port: $("#ipt_jyzg").combobox("getValue"),
             brs_disc_port: $("#ipt_jyxg").combobox("getValue"),
             brs_ETD: $("#jy_ETD").datebox("getValue"),
             brs_ETA: $("#jy_ETA").datebox("getValue"),
             brs_ATD: $("#jy_ATD").datebox("getValue"),
             brs_ATA: $("#jy_ATA").datebox("getValue")
         })


    }

    var json_hy = [];
    if ($("#chk_op5").next().find('input').prop('checked')) {
        json_hy.push(
         {
             brs_type: 2,
             brs_shipowner: $("#ipt_hycd").combobox("getValue"),
             brs_name_voyage: $("#ipt_hycm").textbox("getValue"),
             brs_load_port: $("#ipt_hyzg").combobox("getValue"),
             brs_disc_port: $("#ipt_hyxg").combobox("getValue"),
             brs_ETD: $("#hy_ETD").datebox("getValue"),
             brs_ETA: $("#hy_ETA").datebox("getValue"),
             brs_ATD: $("#hy_ATD").datebox("getValue"),
             brs_ATA: $("#hy_ATA").datebox("getValue"),
             brs_disc_area: $("#ipt_hyxq").combobox("getValue")
         })
    }

    var json_td = [];
    if ($("#chk_op2").next().find('input').prop('checked')) {
        json_td.push(
            {
                bl_main_no: $("#ipt_ztd").textbox("getValue"),
                bl_no: $("#ipt_cdt").textbox("getValue"),
                bl_type: $("#slt_tdlx").combobox("getValue"),
                bl_sign_mode: ''
            })
    }

    var pams = {
        action: 'insert_update_business',
        busi_id: busi_id,
        state: state,
        busi_ie: ie,
        trade: trade,
        busi_type: busi_type,
        json_wt: JSON.stringify(json_wt),
        json_hw: JSON.stringify(json_hw),
        json_xq: JSON.stringify(json_xq),
        json_td: JSON.stringify(json_td),
        json_tl: JSON.stringify(json_tl),
        json_jy: JSON.stringify(json_jy),
        json_hy: JSON.stringify(json_hy),


    }


    $.post('/Ashx/business_input.ashx', pams,
    function (data) {
        var data = JSON.parse(data);
        if (data.result == 1) {
            alert_msg('提示', data.msg);
            busi_id = data.busi_id;

            $('#dv_tabs').tabs('enableTab', 1);
            $('#dv_tabs').tabs('enableTab', 2);
        }
    })
}


function display_div() {

    $("#dv_booking").hide();
    $("#tr_print").hide();

    $("#dv_railway").hide();
    $("#dv_river").hide();
    $("#dv_shipping").hide();
   
    $("#dv_bill").hide();
}

function load_combobox() {


    //内外贸
    $("#cbx_trade").combobox({
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto',
        data: [
            { id: 1, text: '内贸' },
            { id: 2, text: '外贸' }
        ],
        onChange: function (v, i) {
            if (v==2) {
                $("#td_ie").show();
                $("#tr_print").show();
                
            } else {
                $("#td_ie").hide();
                $("#tr_print").hide();
               
            }
        }
    })

    //联运方式
    $("#slt_lyfs").combobox({
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto',
        data: [
            { id: 1, text: '江海联运' },
            { id: 2, text: '汽海联运' },
            { id: 3, text: '铁海联运' }
        ],
        onChange: function (v, i) {

        }
    })

    //提单类型
    $("#slt_tdlx").combobox({
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto',
        data: [
            { id: 1, text: 'Air Waybill' },
            { id: 2, text: 'Sea Waybill' },
            { id: 3, text: '电放提单' },
            { id: 4, text: '正本提单' }
        ],
        onChange: function (v, i) {

        }
    })

    //装箱方式
    $("#ipt_zxfs").combobox({
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto',
        data: [
            { id: 1, text: '厂装' },
            { id: 2, text: '港装' },
            { id: 3, text: '自理' }
        ],
        onChange: function (v, i) {

        }
    })

    //报关方式
    $("#ipt_bgfs").combobox({
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto',
        data: [
            { id: 1, text: '委托我司' },
            { id: 2, text: '自理' }
           
        ],
        onChange: function (v, i) {

        }
    })

    //付费方式
    $("#ipt_fffs").combobox({
        valueField: 'id',
        textField: 'text',
        panelHeight: 'auto',
        data: [
            { id: 1, text: '预付' },
            { id: 2, text: '到付' },
           
        ],
        onChange: function (v, i) {

        }
    })


}




function load_basesetting() {
    $.post('/Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesetting'
    }, function (data) {
        if (true) {
            basesetting = data;
            data_custom = data.custom_list;
            data_project = data.project_list;
            data_freight = data.freight_list
            data_product = data.product_list;
            data_packing = data.packing_list;
            data_trade = data.trade_list;
            data_fee_item = data.feeitem_list;
            data_currency =data.currency_list;
            data_boxtype = data.boxtype_list;
            data_invoice = data.invoice_list;
            data_port = data.port_list;

            //绑定港口
            bind_combobox(data.port_list.rows, $('#slt_qyg'), 'pl_en_name', 'pl_id', false);
            bind_combobox(data.port_list.rows, $('#slt_mdg'), 'pl_en_name', 'pl_id', false);
            bind_combobox(data.port_list.rows, $('#slt_zzg'), 'pl_en_name', 'pl_id', false);

            bind_combobox(data.port_list.rows, $('#ipt_jyzg'), 'pl_en_name', 'pl_id', false);
            bind_combobox(data.port_list.rows, $('#ipt_jyxg'), 'pl_en_name', 'pl_id', false);
            bind_combobox(data.port_list.rows, $('#ipt_hyzg'), 'pl_en_name', 'pl_id', false);
            bind_combobox(data.port_list.rows, $('#ipt_hyxg'), 'pl_en_name', 'pl_id', false);

            //绑定费用类型
            bind_combobox(data_fee_item.rows, $('#ipt_fylx'), 'fee_cn', 'fee_id', false);

            //绑定货物类型
            bind_combobox(data_boxtype.rows, $('#cbx_boxtype'), 'bx_name', 'bx_id', false);
            //绑定项目名称
            bind_combobox(data_project.rows, $('#cbx_project'), 'pr_name', 'pr_id', false);


            load_tab_fee();

            data_container = data.container_list;
            bind_combobox(data_container.rows, $('#cbx_typeo'), 'ct_name', 'ct_name', false);
            bind_combobox(data_container.rows, $('#cbx_typet'), 'ct_name', 'ct_name', false);
         
            //绑定海船卸区
            bind_combobox(data.unload_area.rows, $('#ipt_hyxq'), 'ua_name', 'ua_id', false);

            bind_combobox(data_product.rows, $('#cbx_pm'), 'pr_name', 'pr_id', false);
            bind_combobox(data_packing.rows, $('#cbx_bz'), 'pa_name', 'pa_id', false);

            bind_combobox(data_trade.rows, $('#slt_mytk'), 'tr_name', 'tr_id', false);

            bind_combobox(data_freight.rows, $('#slt_ystk'), 'fr_name', 'fr_id', false);
            bind_combobox(data_freight.rows, $('#slt_cytk'), 'fr_name', 'fr_id', false);

            
            //绑定客户
            bind_combobox(data_custom.rows, $('#cbx_wtdw'), 'cu_short', 'cu_id', false);
            bind_combobox(data_custom.rows, $('#cbx_chdw'), 'cu_short', 'cu_id', false);
            bind_combobox(data_custom.rows, $('#slt_dcdl'), 'cu_short', 'cu_id', false);
            bind_combobox(data_custom.rows, $('#slt_tldl'), 'cu_short', 'cu_id', false);
            bind_combobox(data_custom.rows, $('#ipt_jycd'), 'cu_short', 'cu_id', false);
            bind_combobox(data_custom.rows, $('#ipt_hycd'), 'cu_short', 'cu_id', false);
            
            
            //隐藏div
            display_div();


            //绑定
            bind_data_form_url();
        }

    }, 'json');
}

function bind_data_form_url() {

    var url = window.location.search; //获取url中"?"符后的字串  

    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split('&');
        var key = new Array(strs.length);
        var value = new Array(strs.length);
        var params = {};
        for (i = 0; i < strs.length; i++) {
            key[i] = strs[i].split("=")[0]
            value[i] = unescape(strs[i].split("=")[1]);
            if (key[i] == 'busi_id') {

                if (value[i] != 'undefined' && value[i]!='') {
                    busi_id = value[i]
                    $("#btn_return").show();
                    bind_busi(busi_id);
                    init_table_packing();
                    load_tab_fee();
                }
               

            }
        }
        

    }

}
function bind_busi(busid) {
                 
    $.messager.progress({
        title: '请稍后',
        msg: '努力加载中...'
    });

    $.post('/Ashx/business_input.ashx', {
        action: 'bind_business',
        busi_id: busid
    },
    function (data) {
        if (!session_out(data)) {
            $.messager.progress('close');
            var data = JSON.parse(data);
            var busi_main = data.json_busi_main;
            var busi = data.json_busi;
            var busi_details = data.json_details;
            var cargo = data.json_cargo;
            var bill = data.json_bill;
            var railway = data.json_railway;
            var river = data.json_river;
            var shipping = data.json_shipping;

           

            //判断是否模拟填写
            if (busi_id != undefined) {

                $('#dv_tabs').tabs('enableTab', 1);
                $('#dv_tabs').tabs('enableTab', 2);

                $("#sp_busi_id").text(busi_main[0]["bm_std_id"]);
                $("#sp_bxt").text(busi_details[0]["bs_box_size"]);

                $("#btn_simulate_write").hide();
                //$("#btn_temporary_submit").hide();

                if (parseInt(busi[0]["bd_state"]) == 1) {
                    $("#sp_state").text("已上锁");

                    $("#btn_save_submit").attr("disabled", true);
                    $("input").attr("disabled", "disabled");

                    $("#btn_add_bxt").attr("disabled", true);
                    $("#btn_save_bxt").attr("disabled", true);

                   
                    //禁用toolbar按钮
                    $("#fee_layout div.datagrid-toolbar a").linkbutton("disable");
                    


                } else if (parseInt(busi[0]["bd_state"]) == 0) {
                    $("#sp_state").text("已暂存");
                } else if (parseInt(busi[0]["bd_state"]) == 2) {
                    $("#sp_state").text("已锁单");

                    $("#btn_save_submit").attr("disabled", true);
                    $("input").attr("disabled", "disabled");
                    $("#btn_add_bxt").attr("disabled", true);
                    $("#btn_save_bxt").attr("disabled", true);
                    //禁用toolbar按钮
                    $("#fee_layout div.datagrid-toolbar a").linkbutton("disable");
                }

                $("#dv_tooltip").show();
            } 







            $("#cbx_busi_type").combobox("setValue", busi_main[0]["bm_type"]);
            $("#cbx_trade").combobox("setValue", busi_main[0]["bm_trade"]);

            if (busi.length > 0) {
                $("#cbx_ie").combobox("setValue", busi[0]["bd_ie"]);
                $("#cbx_project").combobox("setValue", busi[0]["bd_pr_id"]);
                $("#cbx_boxtype").combobox("setValue", busi[0]["bd_pt_id"]);
                $("#cbx_wtdw").combobox("setValue", busi[0]["bd_client"]);
                $("#cbx_chdw").combobox("setValue", busi[0]["bd_unit"]);
                $("#cbx_custom_from").combobox("setValue", busi[0]["bd_custom_from"]);
                $("#ipt_custom_no").textbox("setValue", busi[0]["bd_custom_no"]);
                $("#ipt_wtsj").datebox("setValue", busi[0]["bd_trust_date"]);
                $("#ipt_ywsj").datebox("setValue", busi[0]["bd_busi_date"]);
                $("#ipt_wtbz").textbox("setValue", busi[0]["bd_remarks"]);
            }

            if (cargo.length > 0) {
                $("#cbx_pm").combobox("setValue", cargo[0]["bc_ca_id"]);
                $("#cbx_bz").combobox("setValue", cargo[0]["bc_pa_id"]);
                $("#ipt_num").textbox("setValue", cargo[0]["bc_number"]);
                $("#ipt_weight").textbox("setValue", cargo[0]["bc_weight"]);
                $("#ipt_volume").textbox("setValue", cargo[0]["bc_volume"]);
            }

            if (busi_details.length > 0) {
                $("#ipt_ydh").textbox("setValue", busi_details[0]["bs_bill_no"]);
                if (busi_details[0]["bs_start_port"]>0) {
                    $("#slt_qyg").combobox("setValue", busi_details[0]["bs_start_port"]);
                }
                if (busi_details[0]["bs_end_port"]>0) {
                    $("#slt_mdg").combobox("setValue", busi_details[0]["bs_end_port"]);
                }
                if (busi_details[0]["bs_transfer_port"]) {
                    $("#slt_zzg").combobox("setValue", busi_details[0]["bs_transfer_port"]);
                }
               
                $("#ipt_mdd").textbox("setValue", busi_details[0]["bs_destination"]);
                $("#slt_ystk").combobox("setValue", busi_details[0]["bs_transport_typ"]);
                $("#slt_mytk").combobox("setValue", busi_details[0]["bs_trade_typ"]);
                if (busi_details[0]["bs_intermodal"]>0) {
                    $("#slt_lyfs").combobox("setValue", busi_details[0]["bs_intermodal"]);
                }
                

                var dcdl = parseInt(busi_details[0]["bs_booking_agent"]);
                if (dcdl > 0) {
                    $("#slt_dcdl").combobox("setValue", busi_details[0]["bs_booking_agent"]);
                    $("#dv_booking").show();
                }

                $("#slt_cytk").combobox("setValue", busi_details[0]["bs_ship_type"]);
                $("#txta_shr").val(busi_details[0]["bs_shipper"]);
                $("#txta_fhr").val(busi_details[0]["bs_consignee"]);
                $("#txta_tzr").val(busi_details[0]["bs_notify"]);
                $("#txta_ms").val(busi_details[0]["bs_cargo_desc"]);
                $("#txta_mt").val(busi_details[0]["bs_lable"]);
                if (busi_details[0]["bs_route"]>0) {
                    $("#ipt_hx").combobox("setValue", busi_details[0]["bs_route"]);
                }
               
                if (busi_details[0]["bs_pack_method"] > 0) {
                    $("#ipt_zxfs").combobox("setValue", busi_details[0]["bs_pack_method"]);
                }

                if (busi_details[0]["bs_dlects_method"] > 0) {
                    $("#ipt_bgfs").combobox("setValue", busi_details[0]["bs_dlects_method"]);
                }

                if (busi_details[0]["bs_pay_method"] > 0) {
                    $("#ipt_fffs").combobox("setValue", busi_details[0]["bs_pay_method"]);
                }
               

                //绑定checkbox
                var arr_op = busi_details[0]["bs_operation"].toString().split(',');
                for (var i = 0; i < arr_op.length; i++) {
                    $("#chk_op" + arr_op[i] + "").checkbox({ checked: true });
                }

            }

            if (bill.length > 0) {
                $("#dv_bill").show();
                $("#ipt_ztd").textbox("setValue", bill[0]["bl_main_no"]);
                $("#ipt_cdt").textbox("setValue", bill[0]["bl_no"]);
                if (bill[0]["bl_type"]>0) {
                    $("#slt_tdlx").combobox("setValue", bill[0]["bl_type"]);
                }
                
            }

            if (railway.length > 0) {
                $("#dv_railway").show();

                if (railway[0]["bry_s_stid"] > 0) {
                    $("#ipt_fz").combobox("setValue", railway[0]["bry_s_stid"]);
                }

                if (railway[0]["bry_e_stid"] > 0) {
                    $("#ipt_dz").combobox("setValue", railway[0]["bry_e_stid"]);
                }

                if (railway[0]["bry_cu_id"] > 0) {
                    $("#ipt_dl").combobox("setValue", railway[0]["bry_cu_id"]);
                }
               
                
                $("#tl_ETD").datebox("setValue", railway[0]["bry_ETD"]);
                $("#tl_ETA").datebox("setValue", railway[0]["bry_ETA"]);
                $("#tl_ATD").datebox("setValue", railway[0]["bry_ATD"]);
                $("#tl_ATA").datebox("setValue", railway[0]["bry_ATA"]);
                $("#ipt_cc").textbox("setValue", railway[0]["bry_train_num"]);
               
            }

            if (river.length > 0) {
                $("#dv_river").show();

                if (river[0]["brs_shipowner"] > 0) {
                    $("#ipt_jycd").combobox("setValue", river[0]["brs_shipowner"]);
                }
                
                $("#ipt_jycm").textbox("setValue", river[0]["brs_name_voyage"]);
                $("#ipt_jyzg").combobox("setValue", river[0]["brs_load_port"]);
                $("#ipt_jyxg").combobox("setValue", river[0]["brs_disc_port"]);
                $("#jy_ETD").datebox("setValue", river[0]["brs_ETD"]);
                $("#jy_ETA").datebox("setValue", river[0]["brs_ETA"]);
                $("#jy_ATD").datebox("setValue", river[0]["brs_ATD"]);
                $("#jy_ATA").datebox("setValue", river[0]["brs_ATA"]);
            }

            if (shipping.length > 0) {
                $("#dv_shipping").show();

                if (shipping[0]["brs_shipowner"] > 0) {
                    $("#ipt_hycd").combobox("setValue", shipping[0]["brs_shipowner"]);
                }

                $("#ipt_hycm").textbox("setValue", shipping[0]["brs_name_voyage"]);
                $("#ipt_hyzg").combobox("setValue", shipping[0]["brs_load_port"]);
                $("#ipt_hyxg").combobox("setValue", shipping[0]["brs_disc_port"]);
                $("#hy_ETD").datebox("setValue", shipping[0]["brs_ETD"]);
                $("#hy_ETA").datebox("setValue", shipping[0]["brs_ETA"]);
                $("#hy_ATD").datebox("setValue", shipping[0]["brs_ATD"]);
                $("#hy_ATA").datebox("setValue", shipping[0]["brs_ATA"]);

                if (shipping[0]["brs_disc_area"] > 0) {
                    $("#ipt_hyxq").combobox("setValue", shipping[0]["brs_disc_area"]);
                }

               
            }

        }
    })
}




//点击订舱
function click_booking() {
    $("#dv_booking").toggle();
}



//点击铁路
function click_railway() {
    $("#dv_railway").toggle();
}

//点击江运
function click_river() {
    $("#dv_river").toggle();
}

//点击海运
function click_shipping() {
    $("#dv_shipping").toggle();
}

function click_bill() {
    $("#dv_bill").toggle();
}


function load_tab_tool() {
    var tooltip_html = $("#dv_tooltip_hid").html();
    $("ul.tabs").append(tooltip_html);


    var tab_toolbar_html = $("#dv_tab_toolbar").html();
    $("ul.tabs").append(tab_toolbar_html);
}

//设置复选框为name值，未选中
function set_checkbox_false(name) {
    $("input[checkboxname='" + name + "']").each(function (index, el) {
        $(el).checkbox({ checked: false });
    })
}

//加载某票业务的集装箱信息
function init_table_packing() {
    var editRow = undefined;
    datagrid=$("#tab_packing").datagrid({
        url: '/Ashx/business_input.ashx',
        queryParams: {
            action:'get_boxinfo',
            bd_std_id: busi_id
        },
        method: 'post',
        singleSelect: true,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: true,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#user_list_bar',
        fit: true,
        fitColumns: true,
        pageNumber: 1,
        pageSize: 30,
        pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            {
                field: 'cz', width: 25, title: '操作', align: 'center',
                formatter: function (value, row, index) {
                    return "<a  onclick='remove_box(" + index + ")' >删除</a>";
                }, styler: function (value, row, index) {
                  
                    return "background-color:#4876FF;cursor: pointer;color:#fff";
                    
                }
               
            },
            {
                field: 'bc_size', width: 100, title: '尺寸', align: 'center',
                editor: { type: 'validatebox', options: { required: true } }
            },
            {
                field: 'bc_typ', width: 60, title: '箱型', align: 'center',
                editor: { type: 'validatebox', options: { required: true } }
            },
            {
                field: 'bc_no', width: 100, title: '箱号', align: 'center',
                editor: { type: 'validatebox' }
            },
            {
                field: 'bc_sea_fno', width: 100, title: '海关封号', align: 'center',
                editor: { type: 'validatebox' }
            },
            {
                field: 'bc_ship_fno', width: 100, title: '船东封号', align: 'center',
                editor: { type: 'validatebox' }
            },
            {
                field: 'bc_sum', width: 100, title: '件数', align: 'center',
                editor: { type: 'validatebox' }
            },
            {
                field: 'bc_weight', width: 100, title: '毛重', align: 'center',
                editor: { type: 'validatebox' }
            },
            {
                field: 'bc_volume', width: 100, title: '体积', align: 'center',
                editor: { type: 'validatebox' }
            },
            
           
        ]],
        onDblClickRow: function (rowIndex, rowData) {

            //双击开启编辑行
            if (editRow == undefined) {
                editRow = rowIndex;
                datagrid.datagrid("beginEdit", rowIndex);
               
            } else if (editRow == rowIndex) {
                
                datagrid.datagrid('updateRow', {
                    index: rowIndex,
                    row: {
                        bc_size: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_size' }).target.val(),
                        bc_typ: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_typ' }).target.val(),
                        bc_no: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_no' }).target.val(),
                        bc_sea_fno: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_sea_fno' }).target.val(),
                        bc_ship_fno: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_ship_fno' }).target.val(),
                        bc_sum: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_sum' }).target.val(),
                        bc_weight: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_weight' }).target.val(),
                        bc_volume: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_volume' }).target.val(),
                    }
                });

                
                ////取消当前编辑行把当前编辑行罢undefined回滚改变的数据,取消选择的行
                
                datagrid.datagrid("endEdit", editRow);
                editRow = undefined;
               

            } else if (editRow != rowIndex) {
              

                datagrid.datagrid("endEdit", editRow);


                datagrid.datagrid("beginEdit", rowIndex);
                editRow = rowIndex;

                datagrid.datagrid('updateRow', {
                    index: editRow,
                    row: {
                        bc_size: datagrid.datagrid('getEditor', { 'index': editRow, 'field': 'bc_size' }).target.val(),
                        bc_typ: datagrid.datagrid('getEditor', { 'index': editRow, 'field': 'bc_typ' }).target.val(),
                        bc_no: datagrid.datagrid('getEditor', { 'index': editRow, 'field': 'bc_no' }).target.val(),
                        bc_sea_fno: datagrid.datagrid('getEditor', { 'index': editRow, 'field': 'bc_sea_fno' }).target.val(),
                        bc_ship_fno: datagrid.datagrid('getEditor', { 'index': editRow, 'field': 'bc_ship_fno' }).target.val(),
                        bc_sum: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_sum' }).target.val(),
                        bc_weight: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_weight' }).target.val(),
                        bc_volume: datagrid.datagrid('getEditor', { 'index': rowIndex, 'field': 'bc_volume' }).target.val(),
                    }
                });



                
               
             
            }
        },
        onLoadSuccess: function (data) {
            new_data = data.rows;
        }
    })
}

//移除table某行数据
function remove_box(index) {
    

    $('#tab_packing').datagrid('deleteRow', index);
}



function load_table_packing() {
    var ipt_sum_one = $("#ipt_numo").textbox('getValue');
    var ipt_size_one = $("#cbx_sizeo").combobox('getValue');
    var ipt_type_one = $("#cbx_typeo").combobox('getValue');

   


    var ipt_sum_two = $("#ipt_numt").textbox('getValue');
    var ipt_size_two = $("#cbx_sizet").combobox('getValue');
    var ipt_type_two = $("#cbx_typet").combobox('getValue');

    

    if (ipt_sum_one.length > 0) {

        for (var i = 0; i < parseInt(ipt_sum_one) ; i++) {
            new_data.push({ bc_size: ipt_size_one, bc_typ: ipt_type_one, bc_no: '', bc_sea_fno: '', bc_ship_fno: '',bc_sum:'',bc_weight:'',bc_volume:'' });
        }
    }

    if (ipt_sum_two.length > 0) {

        for (var i = 0; i < parseInt(ipt_sum_two) ; i++) {
            new_data.push({ bc_size: ipt_size_two, bc_typ: ipt_type_two, bc_no: '', bc_sea_fno: '', bc_ship_fno: '', bc_sum: '', bc_weight: '', bc_volume: '' });
        }
    }

    $('#dlg_bxt').dialog('close');
   
    $("#tab_packing").datagrid("loadData", new_data);

    //$("#sp_bxt").text();
}

//加载费用
function load_tab_fee() {
   
    load_table_Rec_Pay($("#tab_receivable"), 1,"应收");
    load_table_Rec_Pay($("#tab_payable"), 2, "应付");
}


//加载费用应收列表
function load_table_Rec_Pay(target, fee_rp, tle) {
    var editRow = undefined;
    pub_rp = fee_rp;
    pub_target = target;

    var datagrid = target.datagrid({
        url: '/Ashx/business_input.ashx',
        queryParams: {
            action: 'get_fee_rp',
            bd_std_id: busi_id,
            fee_rp: fee_rp
        },
        method: 'post',
        singleSelect: true,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: true,
        idField: 'bf_id', //主键
        pageNumber: 1,
        pageSize: 30,
        pageList: [30, 60, 120],
        checkbox: true,

        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'bf_id', hidden: 'true' },
            { field: 'bf_fee_rp', hidden: 'true' },
            {
                field: 'bf_fee_state', width: 40, title: '状态', align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return "已审核";
                    } else if (value == 2) {
                        return "已开票";
                    } else if (value == 3) {
                        return "已收票";
                    } else {
                        return "待审核";
                    }
                },
                styler: function (value, row, index) {
                    if (value == 1) {
                        return "background-color:#4bb6f4;cursor: pointer;";
                    } else if (value == 2) {
                        return "background-color:#ffff33;cursor: pointer;";
                    } else if (value == 3) {
                        return "background-color:#ff3333;";
                    } else {
                        return "background-color:#00FF99;cursor: pointer;";
                    }
                }

            },
            {
                field: 'bf_cu_id', width: 150, title: tle + '单位', align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },
                editor: {
                    type: 'combobox',
                    options: {
                        data: data_custom.rows,
                        valueField: "cu_id",
                        textField: "cu_name",
                        editable: false,
                        required: true
                    }

                }
            },
            {
                field: 'bf_fee_ty', width: 60, title: '费用类型', align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },
                editor: {
                    type: 'combobox',
                    options: {
                        data: data_fee_item.rows,
                        valueField: "fee_id",
                        textField: "fee_cn",
                        editable: false,
                        required: true
                    }

                }
            },
            {
                field: 'bf_tax_ty', width: 50, title: '税况', align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },
                editor: {
                    type: 'combobox',
                    options: {
                        data: [{ text: "含税", value: 1 }, { text: "不含税", value: 2 }],
                        valueField: "value",
                        textField: "text",
                        editable: false,
                        required: true
                    }

                },
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return "含税";
                    } else {
                        return "不含税";
                    }
                }
            },
            {
                field: 'bf_price', width: 30, title: '金额', align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },
                editor: { type: 'validatebox', options: { required: true } }
            },
            {
                field: 'bf_number', width: 30, title: '数量', align: 'center',
                editor: { type: 'validatebox' }
            },
            {
                field: 'bf_unit', width: 60, title: '计费单位', align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },
                editor: {
                    type: 'combobox',
                    options: {
                        data: jfdw,
                        valueField: "value",
                        textField: "text",
                        editable: false,
                        required: true
                    }

                }
            },
            {
                field: 'bf_cr_id', width: 60, title: '结算币种', align: 'center',
                editor: {
                    type: 'combobox',
                    options: {
                        data: data_currency.rows,
                        valueField: "cr_id",
                        textField: "cr_code",
                        editable: false,
                        required: true
                    }

                }
            },
            {
                field: 'bf_rate', width: 30, title: '汇率', align: 'center',
                editor: { type: 'validatebox', options: { required: true } }
            },
            {
                field: 'bf_in_id', width: 80, title: '发票类型', align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },
                editor: {
                    type: 'combobox',
                    options: {
                        data: data_invoice.rows,
                        valueField: "in_id",
                        textField: "in_name",
                        editable: false,
                        required: true,
                        onSelect: function (data) {

                            var in_id = data.in_id;
                            var price = datagrid.datagrid('getEditor', { 'index': 0, 'field': 'bf_price' }).target.val();
                            var num = datagrid.datagrid('getEditor', { 'index': 0, 'field': 'bf_number' }).target.val();

                            //price = parseInt(price) * parseInt(num);
                            datagrid.datagrid('getEditor', { 'index': 0, 'field': 'bf_rrmb' }).target.val(price);
                            if (price.length > 0) {
                                var m = cal_etax(price, in_id);

                                datagrid.datagrid('getEditor', { 'index': 0, 'field': 'bf_taxes' }).target.val(toDecimal2(price - m));
                                datagrid.datagrid('getEditor', { 'index': 0, 'field': 'bf_etax_amount' }).target.val(m);

                            }


                        },
                        onLoadSuccess: function () {
                        }

                    }

                }
            },
            {
                field: 'bf_rrmb', width: 50, title: tle + 'RMB', align: 'center',
                editor: { type: 'validatebox' }

            },
            {
                field: 'bf_taxes', width: 40, title: '税金', align: 'center',
                editor: { type: 'validatebox' }
            },
            {
                field: 'bf_etax_amount', width: 60, title: '不含税金额', align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },
                editor: { type: 'validatebox' }
            },

        ]],
        toolbar: [
           {
               text: '添加', iconCls: 'fa fa-plus-square', handler: function () {//添加列表的操作按钮添加，修改，删除等
                   //添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
                   if (pub_editRow != undefined) {
                       datagrid.datagrid("endEdit", pub_editRow);
                   }
                   //添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
                   if (pub_editRow == undefined) {
                       datagrid.datagrid("insertRow", {
                           index: 0, // index start with 0
                           row: {
                               bf_number: 1,
                               bf_rate: 1
                           }
                       });
                       //给当前编辑的行赋值
                       pub_editRow = 0;
                       //将新插入的那一行开户编辑状态
                       datagrid.datagrid("beginEdit", 0);
                      
                   }

               }
            }, '-',
            {
                text: '删除', iconCls: 'fa fa-minus-square',
                handler: function () {
                    //删除时先获取选择行
                    var rows = datagrid.datagrid("getSelections");
                    //选择要删除的行
                    if (rows.length > 0) {
                        $.messager.confirm("提示", "你确定要删除吗?", function (r) {
                            if (r) {
                                var ids = [];
                                for (var i = 0; i < rows.length; i++) {
                                    ids.push(rows[i].bf_id);
                                }
                                //将选择到的行存入数组并用,分隔转换成字符串，
                                $.getJSON('/Ashx/business_input.ashx',
                                 {
                                     rnd: Math.random(),
                                     action: 'delete_fee_rp',
                                     bf_id: ids.join(','),
                                 },
                                 function (data) {
                                     if (data.result == 1) {
                                         //更新费用统计
                                         insert_update_fee_statistics(-1 * rows[0].bf_rrmb, -1 * rows[0].bf_etax_amount);
                                         //刷新
                                         datagrid.datagrid("reload");
                                     } else {
                                         alert_msg('提示', data.msg);
                                     }
                                 })

                            }
                        });
                    } else {
                        $.messager.alert("提示", "请选择要删除的行", "error");
                    }
                }
            }, '-',
            {
                text: '保存', iconCls: 'fa fa-window-maximize', handler: function () {
                    //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
                    datagrid.datagrid("endEdit", pub_editRow);
                }
            }, '-',
            {
                text: tle + '模拟', iconCls: 'fa fa-maxcdn',
                handler: function () {
                    $('#dlg_simulate_fee').dialog({ title: '模拟填写【' + tle + '费用列表】' }).dialog('open');

                    load_tab_simulate_fee(get_tab_fee_pams(), target);
                }
            }
        ],
        onAfterEdit: function (rowIndex, rowData) {
            //endEdit该方法触发此事件
            //console.log(rowData);
            pub_editRow = undefined;

            var inserted = [];
            inserted.push({
                bf_cu_id: rowData.bf_cu_id,
                bf_fee_ty: rowData.bf_fee_ty,
                bf_tax_ty: rowData.bf_tax_ty,
                bf_price: rowData.bf_price,
                bf_number: rowData.bf_number,
                bf_unit: rowData.bf_unit,
                bf_cr_id: rowData.bf_cr_id,
                bf_rate: rowData.bf_rate,
                bf_rrmb: rowData.bf_price,
                bf_in_id: rowData.bf_in_id,
                bf_taxes: rowData.bf_taxes,
                bf_etax_amount: rowData.bf_etax_amount            
            });

            var updated = datagrid.datagrid('getChanges', 'updated');
            if (inserted.length < 1 && updated.length < 1) {
                pub_editRow = undefined;
                datagrid.datagrid('unselectAll');
                return;
            }

            var params = {
                rnd: Math.random(),
                action: 'insert_update_fee_rp',
                bd_std_id: busi_id,
                bf_fee_rp: fee_rp,
            };


            if (inserted.length > 0) {
                params.bf_id = 0;
                params.bf_data = JSON.stringify(inserted);
            }
            //if (updated.length > 0) {
            //    params.bf_id = rowData.bf_id;
            //    params.bf_data = JSON.stringify(updated);
            //}

            $.getJSON('/Ashx/business_input.ashx',
            params,
            function (data) {
                if (data.result == 1) {
                    //更新费用统计
                    insert_update_fee_statistics(inserted[0].bf_rrmb, inserted[0].bf_etax_amount);
                    //刷新
                    datagrid.datagrid("reload");
                } else {
                    alert_msg('提示', data.msg);
                }
            })

        },
        onLoadSuccess: function (data) {

            var data_tb = data.rows;

            if (fee_rp == 1) {//应收
                sum_rec = 0;
                sum_rec_tax = 0;
                for (var i = 0; i < data_tb.length; i++) {
                    sum_rec += data_tb[i].bf_rrmb;
                    sum_rec_tax += data_tb[i].bf_etax_amount;
                }
                $("#sp_rec").text(sum_rec);
                sum_rec_tax = toDecimal2(sum_rec_tax);
                $("#sp_rec_tax").text(sum_rec_tax);

            } else {

                sum_pay = 0;
                sum_pay_tax = 0;
                for (var i = 0; i < data_tb.length; i++) {
                    sum_pay += data_tb[i].bf_rrmb;
                    sum_pay_tax += data_tb[i].bf_etax_amount;
                }
                $("#sp_pay").text(sum_pay);
                sum_pay_tax = toDecimal2(sum_pay_tax);
                $("#sp_pay_tax").text(sum_pay_tax);

            }
            var sum_rp = sum_rec - sum_pay;
            $("#sp_sum_rp").text(sum_rp);
            var sum_rp_tax = toDecimal2(sum_rec_tax - sum_pay_tax);
            $("#sp_sum_rp_tax").text(sum_rp_tax);

            $("#sp_rate").text();






        },
        onDblClickRow: function (rowIndex, rowData) {
            //双击开启编辑行
            if (pub_editRow == undefined) {
                datagrid.datagrid("beginEdit", rowIndex);
                pub_editRow = rowIndex;
            } else if (pub_editRow == rowIndex) {

                //取消当前编辑行把当前编辑行罢undefined回滚改变的数据,取消选择的行
                pub_editRow = undefined;
                datagrid.datagrid("rejectChanges");
                datagrid.datagrid("unselectAll");


            } else if (pub_editRow != rowIndex) {

                datagrid.datagrid("rejectChanges");
                datagrid.datagrid("unselectAll");
                datagrid.datagrid("beginEdit", rowIndex);
                pub_editRow = rowIndex;
            }
        }

    })
}

function insert_update_fee_statistics(rmb, tax) {

    if (pub_rp==1) {
        sum_rec = parseFloat(sum_rec) + parseFloat(rmb);
        sum_rec_tax = parseFloat(sum_rec_tax) + parseFloat(tax);
    } else {
        sum_pay =parseFloat(sum_pay)+ parseFloat(rmb);
        sum_pay_tax = parseFloat(sum_pay_tax) + parseFloat(tax);
    }
   
    var sum_rp = parseFloat(sum_rec) - parseFloat(sum_pay);
    
    var sum_rp_tax = toDecimal2(sum_rec_tax - sum_pay_tax);


    //更新费用统计
    $.getJSON('/Ashx/business_input.ashx',
    {
         rnd: Math.random(),
         action: 'insert_business_fee_statisticste',
         bd_std_id:busi_id,
         bfs_get_money:sum_rec,
         bfs_pay_money:sum_pay,
         bfs_get_after_tax:sum_rec_tax,
         bfs_pay_after_tax:sum_pay_tax,
         bfs_profit:sum_rp,
         bfs_after_profit:sum_rp_tax,
         bfs_interest_rate:0,
         bfs_remarks:''
    },
    function (data) {
         if (data.result == 1) {
                
             $("#sp_rec").text(sum_rec);
             $("#sp_rec_tax").text(sum_rec_tax);
             $("#sp_pay").text(sum_pay);
             $("#sp_pay_tax").text(sum_pay_tax);
             $("#sp_sum_rp").text(sum_rp);
             $("#sp_sum_rp_tax").text(sum_rp_tax);

         } 
     })

}


//计算不含税的金额
function cal_etax(price,in_id) {
    
    var value = price;

    if (parseInt(in_id) == 4) {
        value = parseInt(price) / (1 + 0.13);
    } else if (parseInt(in_id) == 6 || parseInt(in_id) == 7) {
        value = parseInt(price) / (1 + 0.06);
    } else if (parseInt(in_id) == 8 || parseInt(in_id) == 9) {
        value = parseInt(price) / (1 + 0.09);
    } else if (parseInt(in_id) == 10 || parseInt(in_id) == 11) {
        value = parseInt(price) / (1 + 0.1);
    } else if (parseInt(in_id) == 13) {
        value = parseInt(price) / (1 + 0.03);
    } 

    return toDecimal2(value);
}




//制保留2位小数，如：2，会在2后面补上00.即2.00 
function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}


//模拟填写------------------



function get_pams() {
    var pams = {};

    pams = {
        rnd: Math.random(),
        action: 'get_list_for_select',
        chk_state: $("#chk_own").is(":checked") ? 1 : 0,
        like_str: $("#ipt_serch").searchbox('getValue'),
        query_id: $("#sel_cxfw").combobox('getValue')

    };

    return pams;
}

function get_tab_fee_pams() {
    var pams = {};

    pams = {
        rnd: Math.random(),
        action: 'get_fee_for_select',
        fee_type: $("#ipt_fylx").combobox('getValue'),
        like_str: $("#ipt_serch_fee").searchbox('getValue'),
        bf_fee_rp: pub_rp

    };

    return pams;
}

function load_tab_simulate_busi(pams) {

    $("#tab_simulate_busi").datagrid({
        url: '/Ashx/business_input.ashx',
        queryParams: pams,
        method: 'post',
        rownumbers: true,
        fitColumns: true,
        fit: true,
        border: false,
        singleSelect: true,
        columns: [[
            {
                field: 'bm_std_id', title: '业务编号', width: 80, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },
            {
                field: 'bd_busi_date', title: '业务时间', width: 60,align: 'center',
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            },
            {
                field: 'cu_name', title: '委托单位', width: 80, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },
            {
                field: 'pr_name', title: '品名', width: 50, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },
            {
                field: 'bl_main_no', title: '提单号', width: 50, align: 'center', formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },
            {
                field: 'start_port', title: '起运港', width: 50, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },
            {
                field: 'end_port', title: '目的港', width: 50, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },

        ]],
        onDblClickRow: function (rowIndex, rowData) {

            $('#dlg_simulate_busi').dialog('close');
            bind_busi(rowData.bm_std_id);
        }

    })


}

function load_tab_simulate_fee(pams, target) {

    $("#tab_simulate_fee").datagrid({
        url: '/Ashx/business_input.ashx',
        queryParams: pams,
        method: 'post',
        rownumbers: true,
        fitColumns: true,
        fit: true,
        border: false,
        singleSelect: true,
        columns: [[
            { field: 'bf_id', hidden: true },
            { field: 'bf_fee_rp', hidden: true },
            { field: 'bf_fee_state', hidden: true },
            { field: 'bf_cu_id', hidden: true },
            {
                field: 'bf_bd_std_id', title: '业务编号', width: 40, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },
            {
                field: 'cu_name', title: '单位', width: 80, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },
            { field: 'bf_fee_ty', hidden: true },
           
            {
                field: 'fee_cn', title: '费用类型', width: 30, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },
            { field: 'bf_tax_ty', hidden: true },
          
            { field: 'bf_price', title: '金额', width: 20, align: 'center' },
            { field: 'bf_number', title: '数量', width: 20, align: 'center' },
            
            { field: 'bf_unit', title: '计费单位', width: 30, align: 'center' },
            { field: 'bf_rate', hidden: true },
            { field: 'bf_rrmb', hidden: true },
            { field: 'bf_in_id', hidden: true },
            { field: 'bf_taxes', hidden: true },
            { field: 'bf_etax_amount', hidden: true },
           

        ]],
        onDblClickRow: function (rowIndex, rowData) {

         
            target.datagrid("insertRow", {//这里还有一个index参数，可指定添加到某行。如果不写，默认为在最后一行添加
                index:0,
                row: {
                   
                    bf_fee_rp: rowData.bf_fee_rp,
                    bf_cu_id: rowData.bf_cu_id,
                    bf_fee_ty: rowData.bf_fee_ty,
                    bf_tax_ty: rowData.bf_tax_ty,
                    bf_price: rowData.bf_price,
                    bf_number:rowData.bf_number,
                    bf_unit:rowData.bf_unit,
                    bf_cr_id: rowData.bf_cr_id,
                    bf_rate: rowData.bf_rate,
                    bf_rrmb: rowData.bf_price,
                    bf_in_id: rowData.bf_in_id,
                    bf_taxes: rowData.bf_taxes,
                    bf_etax_amount: rowData.bf_etax_amount
                }
            });

            target.datagrid("beginEdit", 0);
            pub_editRow = 0;
            

        }

    })
}