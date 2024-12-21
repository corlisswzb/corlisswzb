var pageNumber = 1;
var pageSize = 30;
var can_change_tab = false;

var $cur_page = undefined;

var basesetting = undefined;

$(document).ready(function () {

     

    $($('body')[0]).unbind('keydown').bind('keydown', custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);
    $('#page_order_list').show();
    $('#page_order_edit').hide();

    //对话框 导入集装箱
    $('#dlg_import_order_cntr').dialog({
        title: '编辑订单集装箱信息',
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
                $('#dlg_import_order_cntr').dialog('close'); 
            }
        }]
    }).dialog('close');

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
    }).dialog('close');


    $('#dlg_od_lock').dialog({
        title: '锁定订单',
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
                $('#dlg_od_lock').dialog('close');
            }
        }]
    }).dialog('close');
    $('#dlg_od_relock').dialog({
        title: '重新锁定订单',
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
                $('#dlg_od_relock').dialog('close');
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

    $('#dlg_od_cntr_stuffing_info_by_cntr_id').dialog({
        title: '查看装箱图片',
        iconCls: 'icon-box_picture',
        autoOpen: false,
        modal: true,
        width: 600,
        height: 460,
        buttons: [
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_od_cntr_stuffing_info_by_cntr_id').dialog('close');
                }
            }]
    }).dialog('close');

    $('#dlg_change_order').dialog({
        title: '改单申请提示',
        iconCls: 'icon-help',
        autoOpen: false,
        modal: true,
        width: 440,
        height: 260,
        buttons: [
            {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_change_order').dialog('close');
                }
            }]
    }).dialog('close');

    get_basesetting();

    
});

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
        bind_combobox(basesetting.company_list, $('#search_od_record_by_company_id'), 'c_desc', 'c_id', true);
        bind_combobox(basesetting.project_list, $('#search_od_project_typ'), 'pr_name', 'pr_id', true);
        bind_combobox(basesetting.box_typ_list, $('#search_od_box_typ'), 'bx_name', 'bx_id', true); 
        bind_combobox(basesetting.trade_typ_list, $('#search_od_trade_typ_id'), 't_desc', 't_id', true);
        bind_combobox(basesetting.employe_list, $('#search_od_service_id'), 'u_real_name', 'u_id', true);

        bind_combobox(basesetting.order_typ_list, $('#search_win_od_typ'), 'ot_desc', 'ot_id', true);
        
        bind_combobox(basesetting.project_list, $('#search_win_od_project_typ'), 'pr_name', 'pr_id', true);
        bind_combobox(basesetting.box_typ_list, $('#search_win_od_box_typ'), 'bx_name', 'bx_id', true);
        bind_combobox(basesetting.trade_typ_list, $('#search_win_od_trade_typ_id'), 't_desc', 't_id', true);
        bind_combobox(basesetting.employe_list, $('#search_win_od_service_id'), 'u_real_name', 'u_id', true);

        //编辑
        bind_combobox(basesetting.order_typ_list, $('#ed_od_typ'), 'ot_desc', 'ot_id', false);
      
        bind_combobox(basesetting.project_list, $('#ed_od_project_typ'), 'pr_name', 'pr_id', false);
        bind_combobox(basesetting.box_typ_list, $('#ed_od_box_typ_id'), 'bx_name', 'bx_id', false); 
        bind_combobox(basesetting.trade_typ_list, $('#ed_od_trade_typ_id'), 't_desc', 't_id', false);
        bind_combobox(basesetting.employe_list, $('#ed_od_service_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#ed_od_sales_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.packing_list, $('#ed_od_cargo_packing'), 'pa_name', 'pa_id', false);  
        bind_combobox(basesetting.freight_list, $('#ed_od_freight_id'), 'fr_name', 'fr_id', false);
         
         
        //集装箱号 初始化
        //集装箱界面
        bind_combobox(basesetting.bill_typ_list, $('#ed_od_bill_typ'), 'b_desc', 'b_id', false);
        bind_combobox(basesetting.stuffing_container_typ_list, $('#ed_od_stuffing_container_typ'), 'sc_desc', 'sc_id', false);
        bind_combobox(basesetting.declare_custom_typ_list, $('#ed_od_declare_customs_typ'), 'de_name', 'de_id', false);
        bind_combobox(basesetting.carriage_typ_list, $('#ed_od_carriage_typ'), 'ca_desc', 'ca_id', false);
        bind_combobox(basesetting.sign_bill_typ_list, $('#ed_od_sign_bill_typ'), 's_desc', 's_id', false);
         

        //委托单 初始化 
        bind_combobox(basesetting.freight_list, $('#ed_bk_freight_term_id'), 'fr_name', 'fr_id', false);
        bind_combobox(basesetting.payment_typ_list, $('#ed_bk_pay_method_id'), 'py_cod', 'py_id', false);
        
        bind_combobox(basesetting.ship_company_list, $('#ed_bk_carrier_id'), 'sh_show_desc', 'sh_id', false);
        
        bind_combogrid_custom($('#search_od_delegate_cu_id'));
        bind_combogrid_custom($('#search_od_cargo_agent_cu_id'));
        bind_combogrid_custom($('#search_win_od_delegate_cu_id'));
        bind_combogrid_custom($('#search_win_od_cargo_agent_cu_id'));

        bind_combogrid_custom($('#ed_od_delegate_cu_id'));
        bind_combogrid_custom($('#ed_od_cargo_agent_cu_id'));
    
        bind_combogrid_custom($('#ed_select_od_service_cu_id'));
        bind_combogrid_custom($('#search_fee_cu_id'));
        bind_combogrid_commissioned($('#ed_od_bk_commissioned_id'));
        bind_combogrid_commissioned($('#ed_od_bk_commissioned_id2'));

        bind_combogrid_place($('#ed_od_beg_place_id'));
        bind_combogrid_place($('#ed_od_end_place_id'));
        bind_combogrid_place($('#ed_bk_port_of_loading_id'));
        bind_combogrid_place($('#ed_bk_port_of_transit_id'));
        bind_combogrid_place($('#ed_bk_port_of_discharge_id'));
        
        bind_combogrid_product($('#ed_od_cargo_typ'));
        
        init_tab_order_cntr();
        //init_tab_order_cntr_stuffing_info();
        init_tab_dlg_od_cntr_stuffing_info_by_cntr_id();
        //其他初始化 
        init_tab_order_fee_rec();
        init_tab_order_fee_pay();
        init_order_tab();

        //集中初始化，一些，不需要 装载值的表格 
        init_tab_order_cntr_group();
        
        init_tab_order_contract_files();
        init_tab_od_fee_group();
        init_tab_dlg_exchange_month_rate();

        init_tab_win_order();

    }, true); 
}

function bind_combogrid_commissioned($target) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'cu_name',
        data: [],
        multiple: false,
        url: '../Ashx/sys_base.ashx',
        //queryParams: {
        //    rnd: Math.random(),
        //    action: 'get_custom_by_like_str_for_combogrid',
        //    like_str: guid()
        //},
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
        onLoadSuccess: function (data) {


        },
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_custom_by_like_str_for_combogrid';

                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('cu_id', '');
            },
        },
        onSelect: function (index, item) {              //选中处理   
            //$target.data('cu_id', item.cu_id);
            //$target.combogrid('setText', item.cu_name);

            $('#ed_od_bk_commissioned_id').data('cu_id', item.cu_id);
            $('#ed_od_bk_commissioned_id').combogrid('setText', item.cu_name);
            $('#ed_od_bk_commissioned_id2').combogrid('setText', item.cu_name);
            $('#ed_od_bk_commissioned_id2').data('cu_id', item.cu_id);
        }
    });


    $target.combogrid('grid').datagrid('options').queryParams = {
        rnd: Math.random(),
        action: 'get_custom_by_like_str_for_combogrid',
        like_str: guid()
    };
}


//子页面获取 basesetting
function call_get_father_basesetting() {
    return basesetting;
}
function call_get_father_cur_order_collections() {
    return cur_order_collections;

}

function call_close_change_order_win() {
    $('#win_of_change_order').window('close');
}
//查询订单
function refresh_order_list() {
    var par = {
        rnd: Math.random(),
        action: 'get_order_list',
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
        //od_include_all_service: $('#search_od_include_all_service').combobox('getValue'),
        
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
        url: '../Ashx/order.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_order_list',
            like_str: $.trim($('#search_like_str').textbox('getText')),
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
            od_route_tools_desc: $.trim($('#search_od_route_tools_desc').textbox('getText')),
            od_route_tools_no: $.trim($('#search_od_route_tools_no').textbox('getText')),
            od_bill_nos: $.trim($('#search_od_bill_nos').val()),
            od_cntr_nos: $.trim($('#search_od_cntr_nos').val()),
            od_project_typ: $('#search_od_project_typ').combobox('getValue'),
            fee_cu_id: $('#search_fee_cu_id').data('cu_id'),
            //od_include_all_service: $('#search_od_include_all_service').combobox('getValue'),
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
                field: 'od_no',  title: '业务编号', width: 90, sortable: true,
                styler: function (value, row, index) {
                    if (row.service_flag == 1) {
                        return 'background-color:#b738e6;color:#fff;';
                    } else {  
                        return 'background-color:#fff;color:#000;';
                    }  
                }
            }
            , {
                field: 'od_fee_dat', title: '业务时间', sortable: true, width: 78,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            } 
        ]],
        columns: [[   
                { field: 'od_typ_desc', title: '业务类型', sortable: true, width:70 }
                , { field: 'od_box_typ_desc', title: '集散', sortable: true, width: 40, }
                , { field: 'od_project_typ_desc', title: '项目名称', sortable: true, width:70, }
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
            $('#page_order_list').fadeOut(50, function () {
                $('#page_order_edit').fadeIn(50, function () { 
                    ////跳转到编辑页面
                    edit_order(row.od_seq); 
                });
            }); 
        },
         
        onRowContextMenu: function (e, field,row) {
            e.preventDefault();

           

            $('#dv_view_of_approval_details_from_list').data('od_seq', row.od_seq);
            $('#dv_view_of_approval_details_from_list').data('od_no', row.od_no);
            $('#dv_view_of_approval_details_from_list').data('amc_id',row.amc_id);
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

//新建订单
function new_order() { 
    $('#page_order_list').fadeOut(50, function () {
        $('#page_order_edit').fadeIn(50, function () {
             
            ////跳转到编辑页面
            edit_order(undefined);

            
        });
    });

    
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
        title: '订单: ' + od_no,
        content: content
    }).window('open');
}

function view_of_approval_details_from_list() {
    var amc_id = $('#dv_view_of_approval_details_from_list').data('amc_id');

    if (amc_id == undefined || amc_id.length == 0) {
        $.messager.alert('错误','错误: 未提交业务审核','error');
        return;
    }

    show_approval_details(amc_id);
}
//改单申请
function view_of_approval_change_order(typ) {
    var od_seq = '';
    var cur_order = undefined;
    if (typ == 1) {
        cur_order = cur_order_collections.order_base_info_and_cargo_info[0];
        od_seq = cur_ed_od_seq;
    } else {
        var rows = $("#tab_order").datagrid('getRows');
        od_seq = $('#dv_view_of_approval_details_from_list').data('od_seq');

        $.each(rows, function (i, row) {
            if (row.od_seq == od_seq) {
                cur_order = row;
            }
        });
    }

    /*
        改单，只能是订单审核通过之后的操作 
    */

    if (cur_order.od_status_id != 3) {
        $.messager.alert('错误', '错误: 改单申请只能对已审核锁单的委托执行。如果未提交锁定，请直接修改，如果锁定审核未结束，请等待审核结束。', 'error');
        return;
    }

    $('#dlg_change_order').dialog({
        title: '改单申请提示',
        iconCls: 'icon-help',
        autoOpen: false,
        modal: true,
        width: 440,
        height: 260,
        buttons: [
            {
                text: '取消',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_change_order').dialog('close');
                }
            },
            {
                text: '继续',
                iconCls: 'icon-ok',
                handler: function () {
                    $('#dlg_change_order').dialog('close');
                    //这里 应该 改一下 
                    var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_change_plan.aspx?rnd=' +
                                        Math.random() + '&od_seq=' +
                                        cur_order.od_seq +
                                        '" style="width:100%;height:100%;"></iframe>';
                    $('#win_of_change_order').window({
                        title: '委托单: ' + cur_order.od_no,
                        content: content
                    }).window('open');

                }
            }]
    }).dialog('open');
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

 

