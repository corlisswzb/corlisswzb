var sk_fee_params = {
    action: 'get_feelist',
    rnd: Math.random(),
    rp_id: 1,
    cu_id: 0,
}

$(document).ready(function () {

    load_tab_todo_sklist();

    load_tab_return_sklist();

    //提交申请
    $("#btn_apply").click(function () {
        var rows = $("#tab_skfee_apply").datagrid("getSelections");
        //选择的行
        if (rows.length > 0) {
            $.messager.confirm("提示", "确定选择数据无误吗?", function (r) {
                if (r) {
                    var ids = [];
                    for (var i = 0; i < rows.length; i++) {
                        ids.push(rows[i].bf_id);
                    }

                    //将选择到的行存入数组并用,分隔转换成字符串，
                    $.getJSON('/Ashx/fee_apply.ashx',
                     {
                         rnd: Math.random(),
                         action: 'insert_fee_apply',
                         feeids: ids.join(','),
                     },
                     function (data) {
                         if (data.result == 1) {
                             //刷新
                             load_tab_return_sklist();
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

    //导出费用确认单
   


    //导出表格数据
    $("#btn_export").click(function () {
        $("#tab_skfee_apply").datagrid('toExcel', {
            filename: 'datagrid.xls',
            worksheet: 'Worksheet'
        });
    })
})

function load_tab_todo_sklist() {



    $.getJSON('/Ashx/fee_apply.ashx', {
        action: 'get_customee',
        rnd: Math.random(),
        rp_id:1
    },
    function (data) {

        if (data.total>0) {
           
            var rows=data.rows;
            var ul_html = "<ul  class=\"ul_cls\">";

            for (var i = 0; i < rows.length; i++) {

                ul_html+="<li class=\"li_cls\">"
                + "<div class=\"li_dv_cls\" onclick=\"dv_click(" + rows[i]["cu_id"] + ")\">"
                +"<span class=\"tree-indent\"></span>"
                +"<span class=\"tree-icon\"></span>"
                + "<span class=\"tree-title\">" + rows[i]["cu_name"] + "</span>"
                +"</div>"
                +"</li>";

            }

            ul_html+="</ul>"

            $("#dv_todo_sklist").html(ul_html);

        }

    })



    //$("#tab_todo_sklist").datagrid({
    //    url: '/Ashx/fee_apply.ashx',
    //    method: 'post',
    //    queryParams: {
    //        action: 'get_customee',
    //        rnd: Math.random(),
    //        rp_id:1,
    //    },
    //    singleSelect: false,
    //    remoteSort: false, //定义从服务器对数据进行排序。
    //    pagination: false, //在DataGrid控件底部显示分页工具栏。
    //    loadMsg: '数据正在加载，请耐心等待...',
    //    border: true,
    //    rownumbers: true,
    //    autoRowHeight:true,nowrap: true,
    //    striped: true,
    //    collapsible: false,
    //    fit: true,
    //    fitColumns: true,
    //    idField: '', //主键
    //    checkbox: false,
    //    selectOnCheck: false,
    //    checkOnSelect: false,//显示的列
    //    columns: [[
    //        { field: 'cu_id', hidden: true },
    //        {
    //            field: 'cu_name', width: 100, title: '应收单位', align: 'center',
    //        }
    //    ]],
    //    onClickRow: function (rowIndex, rowData) {

    //        sk_fee_params.cu_id = rowData.cu_id;
    //        load_tab_return_sklist();
    //    }

    //})
}

function dv_click(cuid) {

    sk_fee_params.cu_id = cuid;
    load_tab_return_sklist();

}

function load_tab_return_sklist() {

    $("#tab_skfee_apply").datagrid({
        url: '/Ashx/fee_apply.ashx',
        method: 'post',
        idField: "",
        queryParams: sk_fee_params,
        rownumbers: true,
        checkOnSelect: true,
        singleSelect: false,
        fitColumns: false,
        fit: true,
        border: false,
        columns: [[
             {
                 field: 'ck', title: '', checkbox: true,

             }, {
                 field: 'bf_id', title: '', hidden: true,

             },
             {
                 field: 'bf_fee_state', title: '状态', width: 50, align: 'center',
                 formatter: function (value, row, index) {
                         return '未申请';
                 },
                 styler: function (value, row, index) {
                   
                  return "background-color:#F3722C;cursor: pointer;";
                  
                 }
             },
            {
                field: 'busi_no', title: '业务编号', width: 100, align: 'center'

            },
            {
                field: 'client', title: '委托单位', width: 160, align: 'center'

            },
            {
                field: 'bd_busi_date', title: '业务时间', width: 80, align: 'center',
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }

            },
            
            {
                field: 'rec_unit', title: '应收单位', width: 160, align: 'center'

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
        onDblClickRow: function (index, row) {

        }

    })
}