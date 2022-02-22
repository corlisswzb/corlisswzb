var params = {
    rnd: Math.random(),
    fstate: 0,
    cuid: '',
    busi_sdate: '',
    busi_edate: ''

}

$(document).ready(function () {

    bind_cbx_customer();
    init_tab_yf_custom();
    init_tab_yf_fee();

    $('#ipt_dzzt').combobox({
        panelHeight: 'auto',
        onClick: function (item) {
            params.fstate = item.value;
            init_tab_yf_custom();
            init_tab_yf_fee();
        }
    })


    $("#dbx_sdate").datebox("textbox").blur(function () {
        var sdate_val = $("#dbx_sdate").datebox('getValue')
        if (sdate_val.length > 0) {
            params.busi_sdate = sdate_val;
        } else {
            params.busi_sdate = '';
        }

        init_tab_yf_custom();
        init_tab_yf_fee();
    });

    $("#dbx_edate").datebox("textbox").blur(function () {
        var edate_val = $("#dbx_edate").datebox('getValue')
        if (edate_val.length > 0) {
            params.busi_edate = edate_val;
        } else {
            params.busi_edate = '';
        }

        init_tab_yf_custom();
        init_tab_yf_fee();
    });

    //确认对账
    $("#btn_sure").click(function () {

        if (params.cuid == '') {
            alert("请先选择结算对象！");
            return;
        }

        var rows = $("#tab_yf_fee").datagrid("getSelections");
        //选择的行
        if (rows.length > 0) {
            $.messager.confirm("提示", "确定选择数据无误吗?", function (r) {
                if (r) {
                    var ids = [];
                    var sum_rmb = 0;
                    var sum_usd = 0;
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].bf_id);
                        sum_rmb += rows[i].bf_rrmb;
                    }

                    //将选择到的行存入数组并用,分隔转换成字符串，
                    $.getJSON('/Ashx/reconciliation_mgr.ashx',
                     {
                         rnd: Math.random(),
                         action: 'sure_fee_rp',
                         bf_ids: ids.join(','),
                         fa_type: 2,
                         fa_cuid: params.cuid,
                         fa_sum_rmb: sum_rmb,
                         fa_sum_usd: sum_usd
                     },
                     function (data) {
                         if (data.result == 1) {
                             //刷新
                             init_tab_yf_fee();
                         } else {
                             alert_msg('提示', data.msg);
                         }
                     })

                }
            });
        } else {
            $.messager.alert("提示", "请选择要选中的行", "error");
        }
    })
})


function bind_cbx_customer() {


    $.getJSON('/Ashx/reconciliation_mgr.ashx',
    {
        action: 'get_customer_from_rc',
        rnd: Math.random(),
        rp_id: 2
    },
    function (data) {


        $('#ipt_jsdx').combobox({
            valueField: 'cu_id',
            textField: 'cu_name',
            panelHeight: 'auto',
            onClick: function (item) {

                params.cuid = item.value;
                if (params.cuid == "") {

                    $("#tab_yf_custom").datagrid('clearSelections');
                    init_tab_yf_custom();

                } else {

                    init_tab_yf_custom();

                }

                init_tab_yf_fee();
            }

        });

        bind_combobox(data.rows, $('#ipt_jsdx'), 'cu_name', 'cu_id', true);
    })

}

function init_tab_yf_custom() {

    params.action = "get_yf_customer_table";

    $("#tab_yf_custom").datagrid({
        url: '/Ashx/reconciliation_mgr.ashx',
        method: 'post',
        queryParams: params,
        singleSelect: true,
        remoteSort: false, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: true,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: true,
        idField: 'bf_id', //主键
        checkbox: false,
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'cu_id', hidden: true },
            { field: 'chk', checkbox: true },
            {
                field: 'cu_name', width: 100, title: '应付单位', align: 'center',
            }
        ]],
        onClickRow: function (rowIndex, rowData) {

            params.cuid = rowData.cu_id;
            $("#ipt_jsdx").combobox("setValue", rowData.cu_id);
            init_tab_yf_fee();
        }

    })





}

function init_tab_yf_fee() {

    $("#tab_yf_fee").datagrid({
        url: '/Ashx/reconciliation_mgr.ashx',
        method: 'post',
        idField: "bf_id",
        rownumbers: true,
        checkOnSelect: true,
        singleSelect: false,
        fitColumns: false,
        fit: true,
        border: false,
        rowStyler: function (index, row) {
            if (row.bd_state == 1) {
                return 'background-color:rgb(204, 204, 204);font-weight:bold;';
            }
        },
        columns: [[
             {
                 field: 'ck', title: '', checkbox: true,

             }, {
                 field: 'bf_id', title: '', hidden: true,

             },
             {
                 field: 'bf_fee_state', title: '状态', width: 50, align: 'center',
                 formatter: function (value, row, index) {
                     if (value == 0) {
                         return '未对账';
                     } else if (value == 1) {
                         return '已对账';
                     }  else if (value == 3) {
                         return '已收票';
                     }  else if (value == 5) {
                         return '已付款';
                     } else if (value == 6) {
                         return '已完结';
                     }

                 },
                 styler: function (value, row, index) {
                     if (value == 0) {
                         return "background-color:#F94144;cursor: pointer;";
                     } else if (value == 1) {
                         return "background-color:#F3722C;cursor: pointer;";
                     }  else if (value == 3) {
                         return "background-color:#F9C74F;cursor: pointer;";
                     }  else if (value == 5) {
                         return "background-color:#43AA8B;cursor: pointer;";
                     } else if (value == 6) {
                         return "background-color:#577590;cursor: pointer;";
                     }
                 }




             },
            {
                field: 'busi_no', title: '业务编号', width: 100, align: 'center'

            },
            {
                field: 'bd_busi_date', title: '业务时间', width: 80, align: 'center',
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }

            },
            {
                field: 'client', title: '委托单位', width: 140, align: 'center'

            },
            {
                field: 'rec_unit', title: '应收单位', width: 140, align: 'center'

            },
            {
                field: 'fee_item', title: '费用类型', width: 60, align: 'center'

            },
            {
                field: 'bf_price', title: '单价', width: 50, align: 'center'

            },
            {
                field: 'bf_number', title: '数量', width: 50, align: 'center'

            },
            {
                field: 'bf_unit', title: '计费单位', width: 60, align: 'center'

            },
            {
                field: 'bf_rrmb', title: '应收RMB', width: 70, align: 'center'

            },
            {
                field: 'bf_etax_amount', title: '不含税金额', width: 70, align: 'center'

            },
            {
                field: 'in_type', title: '发票类型', width: 80, align: 'center'

            },


        ]],
        showFooter: true,
        onDblClickRow: function (index, row) {

        }

    })


    params.action = "get_yf_fee_table";

    $.getJSON('/Ashx/reconciliation_mgr.ashx', params, function (data) {


        var data_rows = data.rows;
        var sum_rrmb = 0;
        var sum_etax_amount = 0;

        for (var i = 0; i < data_rows.length; i++) {
            sum_rrmb += numAdd(sum_rrmb, data_rows[i].bf_rrmb) - sum_rrmb;
            sum_etax_amount += numAdd(sum_etax_amount, data_rows[i].bf_etax_amount) - sum_etax_amount;

        }

        var virData = {
            rows: data.rows,
            footer: [
                { busi_no: "合计", bf_rrmb: sum_rrmb, bf_etax_amount: sum_etax_amount }
            ]
        };

        $("#tab_yf_fee").datagrid("loadData", virData);
    })

}


