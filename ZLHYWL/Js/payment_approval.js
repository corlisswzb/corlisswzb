var params = {
    action: 'get_fee_apply_feelist',
    rnd: Math.random(),
    like_str: '',
    cu_id: 0,
    uid: 0,
    fee_sdate: '',
    fee_edate: '',
    feeids: '',
    fee_type: 2,
    fee_state: 1
}

var pub_cuid = 0;
var pub_hjrmb = 0;
var pub_hjusd = 0;

var pagenum = 1;
var pagesize = 30;


$(document).ready(function () {

    load_tab_fee_apply();

    load_combobox();

    combobox_select();

    //查询
    $("#btn_search").click(function () {

        $("#tab_fee_apply").datagrid('clearSelections');

        pub_cuid = 0;
        pub_hjrmb = 0;
        pub_hjusd = 0;

        params.feeids = '';
        params.like_str = $("#ipt_serch").searchbox('getValue');
        params.fee_state = $("#ipt_sdate").datebox('getValue');
        params.fee_edate = $("#ipt_edate").datebox('getValue');
        params.fee_state = $("#ipt_spstate").combobox('getValue');
        params.cu_id = $("#ipt_custom").combobox('getValue');
        params.uid = $("#ipt_sponsor").combobox('getValue');

        load_tab_collection_ap();
    })

    //审核
    $("#btn_batch_pass").click(function () {

        var fa_rows = $("#tab_fee_apply").datagrid("getSelections");

        var rows = $("#tab_collection_ap").datagrid("getSelections");
        //选择的行
        if (rows.length > 0) {

            //判断选中的数据行是否为统一结算对象
            if (istrue_rows(rows)) {
                alert("请选中相同结算对象的数据行！");
                return;
            }


            var sh_feeids = [];
            var sum_rmb = 0;
            for (var i = 0; i < rows.length; i++) {
                sh_feeids.push(rows[i].bf_id);
                sum_rmb += parseFloat(rows[i].bf_rrmb);
            }


            //将选择到的行存入数组并用,分隔转换成字符串，
            $.getJSON('/Ashx/fee_approval.ashx',
             {
                 rnd: Math.random(),
                 action: 'pass_fee_approval',
                 fa_rows: JSON.stringify(fa_rows),
                 fe_cuid: pub_cuid,
                 feeids: sh_feeids.join(','),
                 fe_type: 2,
                 fe_sum_rmb: sum_rmb,
                 fe_sum_usd: 0,
                 fe_state: 1
             },
             function (data) {
                 if (data.result == 1) {
                     //刷新
                     load_tab_fee_apply();
                     $("#tab_collection_ap").datagrid("loadData", []);
                 } else {
                     alert_msg('提示', data.msg);
                 }
             })


        } else {
            $.messager.alert("提示", "请选择要选中的行", "error");
        }
    })


})

function istrue_rows(rows) {

    for (var i = 0; i < rows.length; i++) {
        for (var j = 1; j < rows.length; j++) {
            if (rows[i]["rec_unit"] != rows[j]["rec_unit"]) {
                return true;
            }
        }
    }

    return false;

}

function combobox_select() {

    $('#ipt_sponsor').combobox({
        onClick: function (item) {
            params.uid = item.value;
        }

    });

    $('#ipt_custom').combobox({
        onClick: function (item) {
            params.cu_id = item.value;
        }

    });

    $('#ipt_spstate').combobox({
        onClick: function (item) {
            params.fee_state = item.value;
        }

    });

}

function load_combobox() {

    $.getJSON('/Ashx/fee_approval.ashx',
    {
        action: 'get_fee_apply_userlist',
        rnd: Math.random(),
        fa_type: 2
    },
    function (data) {

        if (data.result = 1) {
            bind_combobox(data.rows, $('#ipt_sponsor'), 'u_real_name', 'u_id', true);
        }
    })

    $.getJSON('/Ashx/fee_approval.ashx',
    {
        action: 'get_fee_apply_customlist',
        rnd: Math.random(),
        fa_type: 2
    },
    function (data) {
        if (data.result = 1) {
            bind_combobox(data.rows, $('#ipt_custom'), 'cu_name', 'cu_id', true);
        }
    })
}

function load_tab_fee_apply() {
    var IsCheckFlag = true; //标示是否是勾选复选框选中行的，true - 是 , false - 否
    $("#tab_fee_apply").datagrid({
        url: '/Ashx/fee_apply.ashx',
        method: 'post',
        idField: "",
        queryParams: {
            action: 'get_fee_apply_list',
            rnd: Math.random(),
            fa_type: 2
        },
        rownumbers: true,
        checkOnSelect: true,
        singleSelect: false,
        fitColumns: false,
        fit: true,
        border: false,
        columns: [[
             { field: 'fa_id', hidden: true },
             {
                 field: 'fa_feeids_sq', title: '', hidden: true,

             },
             { field: 'cu_id', title: '', hidden: true, },
             {
                 field: 'cu_name', title: '结算对象', width: 160, align: 'center',
             },
            {
                field: 'fa_sum_rmb', title: '人民币总计', width: 80, align: 'center'

            }, {
                field: 'fa_sum_usd', title: '外币总计', width: 60, align: 'center'

            },
            {
                field: 'u_real_name', title: '申请人', width: 80, align: 'center'

            },
            {
                field: 'fa_date', title: '申请时间', width: 80, align: 'center',
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }

            },

        ]],
        onSelect: function (rowIndex, rowData) {


            if (params.feeids == '') {
                pub_cuid = rowData.fa_cuid;

                pub_hjrmb = rowData.fa_sum_rmb;
                pub_hjusd = rowData.fa_sum_usd;
                $("#sp_hjrmb").text(pub_hjrmb);
                $("#sp_hjusd").text(pub_hjusd);

                params.feeids = rowData.fa_feeids_sq;
                load_tab_collection_ap();
            } else {
                if (pub_cuid != rowData.fa_cuid) {
                    alert('请选择相同结算对象！');

                    $("#tab_fee_apply").datagrid('unselectRow', rowIndex);


                } else {
                    params.feeids += ',' + rowData.fa_feeids_sq;
                    pub_hjrmb += rowData.fa_sum_rmb;
                    pub_hjusd += rowData.fa_sum_usd;

                    $("#sp_hjrmb").text(pub_hjrmb);
                    $("#sp_hjusd").text(pub_hjusd);

                    load_tab_collection_ap();
                }
            }


        },
        onUnselect: function (rowIndex, rowData) {

            if (params.feeids != '') {
                if (pub_cuid == rowData.fa_cuid) {

                    pub_hjrmb -= rowData.fa_sum_rmb;
                    pub_hjusd -= rowData.fa_sum_usd;

                    $("#sp_hjrmb").text(pub_hjrmb);
                    $("#sp_hjusd").text(pub_hjusd);

                    var a = params.feeids.split(',');
                    var b = rowData.fa_feeids_sq.split(',');

                    var result = $.grep(a, function (n, i) {
                        return $.inArray(n, b) < 0;
                    });

                    var n_str = result.join(',');
                    params.feeids = n_str;
                    if (n_str == "") {
                        $("#tab_collection_ap").datagrid('loadData', [])
                    } else {
                        load_tab_collection_ap();
                    }

                }
            }

        }


    })
}

function load_tab_collection_ap() {


    $("#tab_collection_ap").datagrid({
        url: '/Ashx/fee_approval.ashx',
        queryParams: params,
        method: 'post',
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: true,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        toolbar: "#dv_toolbar",
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
               field: 'busi_no', title: '业务编号', width: 100, align: 'center',
               formatter: function (value) {
                   return "<span title='" + value + "'>" + value + "</span>";
               },

           },
            {
                field: 'bd_busi_date', title: '业务时间', width: 80, align: 'center',
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }

            },
            {
                field: 'client', title: '委托单位', width: 140, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },

            },
            {
                field: 'rec_unit', title: '应收单位', width: 140, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },

            },
            {
                field: 'fee_item', title: '费用类型', width: 60, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },

            },
            {
                field: 'bf_price', title: '单价', width: 50, align: 'center'

            },
            {
                field: 'bf_number', title: '数量', width: 50, align: 'center'

            },
            {
                field: 'bf_unit', title: '计费单位', width: 60, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },

            },
            {
                field: 'bf_rrmb', title: '应收RMB', width: 70, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },

            },
            {
                field: 'bf_etax_amount', title: '不含税金额', width: 70, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },

            },
            {
                field: 'in_type', title: '发票类型', width: 80, align: 'center',
                formatter: function (value) {
                    return "<span title='" + value + "'>" + value + "</span>";
                },

            },
        ]],

    })

}