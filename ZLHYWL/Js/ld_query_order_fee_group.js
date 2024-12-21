 
var basesetting = undefined;

var cur_query_order_fee_group_params = undefined;
$(document).ready(function () {
    get_basesetting();
});
function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections_for_approval'
    }, function (data) {
        basesetting = data;

        var now_time = data.sys_time;
        var date = eval('new Date(' + now_time.replace(/\d+(?=-[^-]+$)/, function (a) {
            //console(a);
            return parseInt(a, 10);
        }).match(/\d+/g) + ')');


        //往后加1年，往前 10年 

        var now_year = date.getFullYear();
        var select_years = [];
        for (var nY = now_year - 10 ; nY <= now_year + 1 ; nY++) {
            select_years.push({ value: nY, text: nY + '年' });
        }
        bind_combobox(select_years, $('#search_fee_dat_begin_year'), 'text', 'value', false);
        bind_combobox(select_years, $('#search_fee_dat_end_year'), 'text', 'value', false);
        //月份
        var select_month = [];
        for (var nM = 1 ; nM <= 12; nM++) {
            select_month.push({ value: nM, text: nM + '月' });
        }
        bind_combobox(select_month, $('#search_fee_dat_begin_month'), 'text', 'value', false);
        bind_combobox(select_month, $('#search_fee_dat_end_month'), 'text', 'value', false);
 
        
        bind_combobox(basesetting.employe_list, $('#search_service_id'), 'u_real_name', 'u_id', true);

        //查询  
        bind_combobox(basesetting.employe_list, $('#search_operation_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#search_sales_id'), 'u_real_name', 'u_id', false);
        bind_combobox(basesetting.employe_list, $('#search_record_id'), 'u_real_name', 'u_id', false);
        bind_combogrid_custom($('#search_fee_cu_id'));
         init_tab_order_fee_group();

    }, true);

}
 

//刷新
function refresh_order_fee_group() {
    cur_query_order_fee_group_params = {
        rnd: Math.random(),
        action: 'get_order_fee_group',
        rec_or_pay: $('#search_rec_or_pay').combobox('getValue'),
        fee_cu_id: $('#search_fee_cu_id').data('cu_id') == undefined ? '' : $('#search_fee_cu_id').data('cu_id'),
        fee_dat_begin_year: $('#search_fee_dat_begin_year').combobox('getValue'),
        fee_dat_begin_month: $('#search_fee_dat_begin_month').combobox('getValue'),
        fee_dat_end_year: $('#search_fee_dat_end_year').combobox('getValue'),
        fee_dat_end_month: $('#search_fee_dat_end_month').combobox('getValue'),
        service_id: $('#search_service_id').combobox('getValue'),
        operation_id: $('#search_operation_id').combobox('getValue'),
        sales_id: $('#search_sales_id').combobox('getValue'),
        record_id: $('#search_record_id').combobox('getValue'),
    };
    //var content = '<iframe scrolling="auto" frameborder="0"  src="tempate_fee_group.aspx?' + parseParams(cur_query_order_fee_group_params) +
    //                            '" style="width:100%;height:100%;"></iframe>';
    //$('#p_ab').panel({
    //    content: content
    //});

    $("#tab_order_fee_group").datagrid('load', cur_query_order_fee_group_params);
}
//初始表格
function init_tab_order_fee_group() {

    cur_query_order_fee_group_params = {
        rnd: Math.random(),
        action: 'get_order_fee_group',
        rec_or_pay: $('#search_rec_or_pay').combobox('getValue'),
        fee_cu_id: $('#search_fee_cu_id').data('cu_id') == undefined ? '' : $('#search_fee_cu_id').data('cu_id'),
        fee_dat_begin_year: $('#search_fee_dat_begin_year').combobox('getValue'),
        fee_dat_begin_month: $('#search_fee_dat_begin_month').combobox('getValue'),
        fee_dat_end_year: $('#search_fee_dat_end_year').combobox('getValue'),
        fee_dat_end_month: $('#search_fee_dat_end_month').combobox('getValue'),
        service_id: $('#search_service_id').combobox('getValue'),
        operation_id: $('#search_operation_id').combobox('getValue'),
        sales_id: $('#search_sales_id').combobox('getValue'),
        record_id: $('#search_record_id').combobox('getValue'),
    };

    $("#tab_order_fee_group").datagrid({
        url: '../Ashx/lead_query.ashx',
        queryParams: cur_query_order_fee_group_params,
        method: 'post',
        
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false, 
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true, 
        columns: [[
                { field: 'fee_cu_desc', title: '结算对象',  align: 'left' },
                { field: 'cr_name', title: '币种', align: 'center' },
                { title: '整体费用情况', colspan: 7, align: 'center' },
                { title: '未交账情况', colspan: 3, align: 'center' },
                { title: '已交账情况', colspan: 13, align: 'center' },
        ], [
                { field: 'fee_amount', title: '总金额', align: 'center' },
                { title: '已销账', colspan: 3, align: 'center' },
                { title: '未销账', colspan: 3, align: 'center' },
                { field: 'fee_amount_of_uncommit', title: '小计', align: 'center' },
                { field: 'fee_amount_of_uncommit_of_noneinvoice', title: '不需票',  align: 'center' },
                { field: 'fee_amount_of_uncommit_of_invoice', title: '需票',  align: 'center' },
                { field: 'fee_amount_of_commit', title: '小计',  align: 'center' },
                { title: '已销账', colspan: 5, align: 'center' },
                { title: '未销账', colspan: 7, align: 'center' },
        ], [
                { field: 'woa_total_money', title: '小计',  align: 'center' },
                { field: 'woa_total_money_of_noneinvoice', title: '不需票',  align: 'center' },
                { field: 'woa_total_money_of_invoice', title: '需票', align: 'center' },
                { field: 'unwoa_total_money', title: '小计',  align: 'center' },
                { field: 'unwoa_total_money_of_noneinvoice', title: '不需票',  align: 'center' },
                { field: 'unwoa_total_money_of_invoice', title: '需票', align: 'center' },

                { field: 'woa_amount_of_commit', title: '小计',  align: 'center' },
                { field: 'woa_amount_of_commit_of_noneinvoice', title: '不需票',  align: 'center' },
                { title: '需票', colspan: 3, align: 'center' },
                { field: 'unwoa_amount_of_commit', title: '小计',  align: 'center' },
                { field: 'unwoa_amount_of_commit_of_noneinvoice', title: '不需票',  align: 'center' },
                { title: '需票', colspan: 5, align: 'center' },
        ], [
                { field: 'woa_amount_of_commit_of_invoice', title: '小计',   align: 'center' },
                { field: 'woa_amount_of_commit_of_invoice_of_unrecord', title: '未录票',   align: 'center' },
                { field: 'woa_amount_of_commit_of_invoice_of_record', title: '已录票',   align: 'center' },

                { field: 'unwoa_amount_of_commit_of_invoice', title: '小计',   align: 'center' },
                { field: 'unwoa_amount_of_commit_of_invoice_of_unrecord', title: '未录票',  align: 'center' },
                { field: 'unwoa_amount_of_commit_of_invoice_of_record', title: '已录票',   align: 'center' },
                { field: 'unwoa_amount_of_commit_of_unlimit', title: '未超账期', align: 'center' },
                { field: 'unwoa_amount_of_commit_of_limit', title: '超账期', align: 'center' },
        ]],
        onLoadSuccess: function (data) {

        },
        onDblClickRow: function (index, row) {

            
        }
    });
}

function download_order_fee_group() {
    cur_query_order_fee_group_params.action = 'download_order_fee_group';

    window.open('../Ashx/lead_query.ashx?' + parseParams(cur_query_order_fee_group_params));

    cur_query_order_fee_group_params.action = 'get_order_fee_group';
}

 