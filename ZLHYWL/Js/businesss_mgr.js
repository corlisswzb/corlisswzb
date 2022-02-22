var pagenum = 1;
var pagesize = 30;

var params = {
    rnd: Math.random(),
    action: 'get_business_list',
    like_str:'',
    cpy_id: 0,
    bd_trade:0,
    bd_state: -1,
    custom_id: 0

}

$(document).ready(function () {

    load_tab_toolbar_cbx();

    load_click_event();
  
    load_tab_busi();
    
})


function load_click_event() {

    //查询
    $("#btn_search").click(function () {

        params.like_str = $("#ipt_serch").searchbox('getValue');
        params.bd_state = $("#cbx_state").combobox('getValue');
        params.custom_id = $("#cbx_custom").combobox('getValue');
        params.bd_trade = $("#cbx_trade").combobox('getValue');
        params.cpy_id = $("#ipt_company").combobox('getValue');

        load_tab_busi();
    })


    //导出excel
    $("#btn_export").click(function () {


        $("#tab_busi").datagrid('toExcel', {
            filename: 'datagrid.xls',
            worksheet: 'Worksheet'
        });


    })
}



function load_tab_busi() {


    $("#tab_busi").datagrid({
        url: '/Ashx/business_query.ashx',
        queryParams: params,
        method: 'post',
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: true,
        toolbar: '#dv_toolbar',
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        idField: 'bm_id', //主键
        pageNumber: pagenum,
        pageSize: pagesize,
        pageList: [30, 60, 120],
        checkbox: true,
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'ck', checkbox: true },
            {
                field: 'baa_spstate', title: '审核状态', width: fixWidth(0.052), align: 'center', sortable: true,
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return '待审核';
                    } else if (value == 1) {
                        return '已撤销';
                    } else if (value == 2) {
                        return '已结束';
                    } else {
                        return "";
                    }
                },
                styler: function (value, row, index) {
                    if (value == 0) {
                        return "background-color:#FF3300;cursor: pointer;";
                    } else if (value == 1) {
                        return "background-color:#FFFF33;cursor: pointer;";
                    } else if (value == 2) {
                        return "background-color:#996600;cursor: pointer;";
                    }
                }

            },
            {
                field: 'bd_state', title: '业务状态', width: fixWidth(0.052), align: 'center', sortable: true,
                formatter: function (value, row, index) {
                    if (value==0) {
                        return '已暂存';
                    } else if (value == 1) {
                        return '已上锁';
                    } else if (value == 2) {
                        return '已锁单';
                    }
                    
                },
                styler: function (value, row, index) {
                    if (value == 0) {
                        return "background-color:#90E0EF;cursor: pointer;";
                    } else if (value == 1) {
                        return "background-color:#00B4D8;cursor: pointer;";
                    } else if (value == 2) {
                        return "background-color:#0077B6;cursor: pointer;";
                    }
                }

            },
            { field: 'bm_std_id', title: '业务编号', width: fixWidth(0.08), align: 'center', sortable: true },
            { field: 'bd_custom_no', title: '客户编号', width: fixWidth(0.06), align: 'center', sortable: true },
            {
                field: 'cu_name', title: '委托单位', width: fixWidth(0.14), align: 'center', sortable: true,
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                }
            },
            {
                field: 'bm_trade', title: '内外贸', width: fixWidth(0.05), align: 'center', sortable: true,
                formatter: function (value, row, index) {
                    if (value==1) {
                        return "内贸";
                    } else {
                        return "外贸";
                    }
                }
            },
            {
                field: 'bd_ie', title: '进出口', width: fixWidth(0.05), align: 'center', sortable: true,
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return "进口";
                    } else if (value == 2) {
                        return "出口";
                    }else{
                        return "";
                    }
                }
            },
            { field: 'project_name', title: '项目名称', width: fixWidth(0.06), align: 'center', sortable: true },
            { field: 'pr_name', title: '装箱品名', width: fixWidth(0.10), align: 'center', sortable: true },
            {
                field: 'bd_trust_date', title: '委托时间', width: fixWidth(0.07), align: 'center', sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            },
            {
                field: 'bd_busi_date', title: '业务时间', width: fixWidth(0.07), align: 'center', sortable: true,
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            },
            { field: 'bx_name', title: '箱型', width: fixWidth(0.06), align: 'center', sortable: true },
            { field: 'bc_number', title: '数量', width: fixWidth(0.06), align: 'center', sortable: true },
            { field: 'bc_weight', title: '重量', width: fixWidth(0.06), align: 'center', sortable: true },
            { field: 'start_port', title: '起运港', width: fixWidth(0.06), align: 'center', sortable: true },
            { field: 'end_port', title: '目的港', width: fixWidth(0.06), align: 'center', sortable: true },
            { field: 'bs_destination', title: '目的地', width: fixWidth(0.06), align: 'center', sortable: true },
            { field: 'bs_box_size', title: '箱型箱量', width: fixWidth(0.06), align: 'center', },
            { field: 'bl_main_no', title: '提单号', width: fixWidth(0.08), align: 'center', },
            { field: 'bfs_get_money', title: '应收', width: fixWidth(0.06), align: 'center', },
            { field: 'bfs_pay_money', title: '应付', width: fixWidth(0.06), align: 'center', },
            { field: 'u_real_name', title: '创建人', width: fixWidth(0.06), align: 'center', },
            {
                field: 'bm_create_date', title: '创建时间', width: fixWidth(0.06), align: 'center',
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
            

            
            
        ]],
        onDblClickRow: function (rowIndex, rowData) {


            window.location = "business_input.aspx?busi_id=" + rowData.bm_std_id;
        }

        })


}

function load_tab_toolbar_cbx() {

   //绑定cbx公司
    $.getJSON('/Ashx/sys_base.ashx',
   { action: 'get_company' },
   function (data) {

       $('#ipt_company').combobox({
           valueField: 'cpy_id',
           textField: 'cpy_name',
           data: data.rows,

       });
   })



    //绑定委托单位
    $.getJSON('/Ashx/business_query.ashx',
    { action: 'get_business_custom' },
    function (data) {
        
        $('#cbx_custom').combobox({
            valueField: 'cu_id',
            textField: 'cu_name',
            data: data.rows,
          
        });
     })


   
    //绑定状态
    $('#cbx_state').combobox({
        valueField:'id',
        textField: 'text',
        panelHeight:'auto',
        data: [
            { id: '-1', text: '全部', "selected": true },
            { id: '0', text: '已暂存' },
            { id: '1', text: '已锁单' },
            { id: '2', text: '已完结' }
        ],
    });

    
}


