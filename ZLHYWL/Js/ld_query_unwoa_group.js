var basesetting = undefined;

var cur_query_unwoa_group_params = undefined;
var cur_query_sub_params = undefined;

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
        bind_combobox(select_years, $('#search_end_year'), 'text', 'value', false);
        bind_combobox(select_years, $('#search_beg_year'), 'text', 'value', false);
        //月份
        var select_month = [];
        for (var nM = 1 ; nM <= 12; nM++) {
            select_month.push({ value: nM, text: nM + '月' });
        }
        bind_combobox(select_month, $('#search_beg_month'), 'text', 'value', false);
        bind_combobox(select_month, $('#search_end_month'), 'text', 'value', false);
        

        bind_combobox(basesetting.employe_list, $('#search_u_id'), 'u_real_name', 'u_id', false);
        
        init_tab_unwoa_group();
       

    }, true);

}

//刷新
function refresh_rpt_of_unwoa_group() {
    cur_query_unwoa_group_params = {
        rnd: Math.random(),
        action: 'get_rpt_of_unwoa_group', 
        beg_year: $('#search_beg_year').combobox('getValue'),
        beg_month: $('#search_beg_month').combobox('getValue'),
        end_year: $('#search_end_year').combobox('getValue'),
        end_month: $('#search_end_month').combobox('getValue'),
        u_id: $('#search_u_id').combobox('getValue'),
       
    };
    cur_query_sub_params = $.extend(true,{},cur_query_unwoa_group_params);
 


    //只有月没有年，是不允许的 
    if (cur_query_unwoa_group_params.beg_month != undefined && Number(cur_query_unwoa_group_params.beg_month) > 0) {
        if (cur_query_unwoa_group_params.beg_year == undefined ||
            Number(cur_query_unwoa_group_params.beg_year) == 0) {
            $.messager.alert('错误','错误:无法理解的起始时间设置!','error');
            return;
        }
    }
    if (cur_query_unwoa_group_params.end_month != undefined && Number(cur_query_unwoa_group_params.end_month) > 0) {
        if (cur_query_unwoa_group_params.end_year == undefined ||
            Number(cur_query_unwoa_group_params.end_year) == 0) {
            $.messager.alert('错误', '错误:无法理解的截止时间设置!', 'error');
            return;
        }
    }
    
    post('../Ashx/lead_query.ashx', cur_query_unwoa_group_params,
    function (data) {
        $("#tab_unwoa_group").datagrid('loadData', data);  
    }, true);
    
}
//初始表格
function init_tab_unwoa_group() { 
    cur_query_unwoa_group_params = {
        rnd: Math.random(),
        action: 'get_rpt_of_unwoa_group', 
        beg_year: $('#search_beg_year').combobox('getValue'),
        beg_month: $('#search_beg_month').combobox('getValue'),
        end_year: $('#search_end_year').combobox('getValue'),
        end_month: $('#search_end_month').combobox('getValue'),
        u_id: $('#search_u_id').combobox('getValue'),
    };

    $("#tab_unwoa_group").datagrid({
        data:[],
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight: true, nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        checkbox: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        columns: [[
            { field: 'od_no', title: '委托编号', align: 'center', width: 90, },
            { field: 'od_fee_dat', title: '委托时间', align: 'center', width: 90 },
            { field: 'fee_cu_desc', title: '结算单位', align: 'center', width: 180 },
         
            { field: 'rec_total_amount', title: '应收', align: 'center', width: 160 },
            { field: 'reced_total_amount', title: '已收', align: 'center', width: 160 },
            {
                field: 'unreced_total_amount', title: '未收', align: 'center', width: 160,
                styler: function (value, row, index) {
                    if (parseFloat(row.unreced_total_amount_of_base) != 0) {
                        return 'background-color:#b3e7c7;color:#000;';
                    } else {
                        return '';
                    }
                }
            },
            { field: 'pay_total_amount', title: '应付', align: 'center', width: 160 },
            { field: 'payed_total_amount', title: '已付', align: 'center', width: 160 },
            {
                field: 'unpayed_total_amount', title: '未付', align: 'center', width: 160,
                styler: function (value, row, index) {
                    if (parseFloat(row.unpayed_total_amount_of_base) != 0) {
                        return 'background-color:#b3e7c7;color:#000;';
                    } else  { 
                        return '';
                    }
                }
            },
            { field: 'od_record_by_nam', title: '记录人', align: 'center', width: 60 },
         
        ]],
        onDblClickRow: function (index, row) {
            //这里 应该 改一下 
            var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                                Math.random() + '&od_seq=' +
                                row.od_seq +
                                '" style="width:100%;height:100%;"></iframe>';
            $('#win_of_order_info').window({
                title: '订单: ' + row.od_no,
                content: content
            }).window('open');
        }
    });
}

function download_unwoa_group() {
    var down_query_sub_params = $.extend(true,{}, cur_query_unwoa_group_params);
    down_query_sub_params.action = 'download_rpt_of_unwoa_group';

    window.open('../Ashx/lead_query.ashx?' + parseParams(down_query_sub_params));
 
}
 
 