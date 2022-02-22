var pagenum = 1;
var pagesize = 30;
var pub_cuid = 0;

var pub_imids = [];
var pub_feeids = [];

var in_parmas = {
    action: 'get_invoice_list',
    rnd: Math.random(),
    like_str: '',
    state: 1
}


var params = {
    action: 'get_fee_examine_feelist',
    rnd: Math.random(),
    like_str: '',
    fe_cuid: 0,
    uid: 0,
    fe_sdate: '',
    fe_edate: '',
    feeids: '',
    fee_type: 2,
    fe_state: 0
}


$(document).ready(function () {

    load_combobox();

    load_tab_invoice();

    load_tab_pass_approval();

    //load_tab_fee_detailed();

    load_click_event();



})

function load_combobox() {

    $.getJSON('/Ashx/invoice_mgr.ashx',
      {
          action: 'get_fee_examine_list',
          rnd: Math.random(),
          fee_type: 2
      },
      function (data) {

          if (data.result = 1) {
              bind_combobox(data.user_list.rows, $('#ipt_sponsor'), 'u_real_name', 'u_id', true);
              bind_combobox(data.custom_list.rows, $('#ipt_custom'), 'cu_name', 'cu_id', true);
          }
      })
}

function load_click_event() {

    $("#btn_in_search").click(function () {
        in_parmas.like_str = $("#ipt_in_serch").searchbox('getValue');
        in_parmas.state = $("#ipt_in_state").combobox('getValue');
        load_tab_invoice();
    })

    //待办
    $("#btn_todo").click(function () {
        //折叠
        //$('#dv_layout').layout('collapse', 'west');
        //展开
        $('#dv_layout').layout('expand', 'west');
    })

    //查询
    $("#btn_search").click(function () {

        params.like_str = $("#ipt_serch").searchbox('getValue');
        params.fe_sdate = $("#ipt_sdate").datebox('getValue');
        params.fe_edate = $("#ipt_edate").datebox('getValue');
        params.fe_state = $("#ipt_spstate").combobox('getValue');
        params.fe_cuid = $("#ipt_custom").combobox('getValue');
        params.uid = $("#ipt_sponsor").combobox('getValue');

        load_tab_fee_detailed();
    })


    //绑定发票
    $("#btn_bind_invoice").click(function () {

        var fee_rows = $("#tab_fee_detailed").datagrid("getSelections");
        var in_rows = $("#tab_invoice").datagrid("getSelections");

        if (fee_rows.length <= 0) {
            $.messager.alert("提示", "请选择费用！");
            return;
        }

        if (in_rows.length <= 0) {
            $.messager.alert("提示", "请选择发票！");
            return;
        }


        var sum_fee = 0;
        var new_fee_rows = [];
        for (var i = 0; i < fee_rows.length; i++) {
            new_fee_rows.push({ bf_id: fee_rows[i].bf_id, bf_rrmb: fee_rows[i].bf_rrmb });

            sum_fee += parseFloat(fee_rows[i].bf_rrmb);
        }

        var sum_in_fee = 0;
        var new_in_rows = [];
        for (var j = 0; j < in_rows.length; j++) {
            new_in_rows.push({ im_id: in_rows[j].im_id, im_charge_balance: in_rows[j].im_charge_balance });

            sum_in_fee += parseFloat(in_rows[j].im_charge_balance);
        }

        if (sum_fee > sum_in_fee) {
            $.messager.alert("提示", "选择的发票总金额不满足需要的费用总额！");
            return;
        }

        $.getJSON("/Ashx/invoice_mgr.ashx",
        {
            action: 'bind_fee_invoice',
            rnd: Math.random(),
            feerows: JSON.stringify(new_fee_rows),
            inrows: JSON.stringify(new_in_rows),
            sum_fee: sum_fee,
            feetype:3
        }
        , function (data) {

            if (data.result > 0) {
                load_tab_invoice();
            }
        })
    })
}

function load_tab_invoice() {

    $("#tab_invoice").datagrid({
        url: '/Ashx/invoice_mgr.ashx',
        method: 'post',
        idField: "im_id",
        queryParams: in_parmas,
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
        idField: 'im_id', //主键
        pageNumber: pagenum,
        pageSize: pagesize,
        pageList: [30, 60, 120],
        checkbox: true,
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
             {
                 field: 'im_id', title: '', hidden: true,

             },
              { field: 'ck', checkbox: true },
             {
                 field: 'im_number', title: '发票号', width: 85, align: 'center',
             },
            {
                field: 'im_denomination', title: '发票面额', width: 80, align: 'center'

            }, {
                field: 'im_charge_balance', title: '发票剩余金额', width: 85, align: 'center'

            }

        ]],
        onClickCell: function (rowIndex, field, value) {

        },
        onSelect: function (rowIndex, rowData) {
            pub_imids.push(rowData.im_id);
        },
        onUnselect: function (rowIndex, rowData) {
            var index = pub_imids.indexOf(rowData.im_id);
            var len = pub_imids.length;
            pub_imids.splice(index, len);
        }




    })
}

function load_tab_pass_approval() {

    $("#tab_pass_approval").datagrid({
        url: '/Ashx/invoice_mgr.ashx',
        method: 'post',
        idField: "",
        queryParams: {
            action: 'get_pass_approval_record',
            rnd: Math.random(),
            fe_type: 2
        },
        rownumbers: true,
        checkOnSelect: true,
        singleSelect: false,
        fitColumns: false,
        fit: true,
        border: false,
        columns: [[
             {
                 field: 'fe_feeids', title: '', hidden: true,

             },
             { field: 'cu_id', title: '', hidden: true, },
             {
                 field: 'cu_name', title: '结算对象', width: 160, align: 'center',
             },
            {
                field: 'fe_sum_rmb', title: '人民币总计', width: 80, align: 'center'

            }, {
                field: 'fe_sum_usd', title: '外币总计', width: 80, align: 'center'

            }
        ]],
        onSelect: function (rowIndex, rowData) {

            if (params.feeids == '') {
                pub_cuid = rowData.fe_cuid;
                params.feeids = rowData.fe_feeids;
                load_tab_fee_detailed();
                //$('#dv_layout').layout('collapse', 'west');
            } else {
                if (pub_cuid != rowData.fe_cuid) {
                    alert('请选择相同结算对象！');
                    $("#tab_pass_approval").datagrid('unselectRow', rowIndex);
                } else {
                    params.feeids += ',' + rowData.fe_feeids;
                    load_tab_fee_detailed();
                    //$('#dv_layout').layout('collapse', 'west');
                }

            }
        },
        onUnselect: function (rowIndex, rowData) {

            if (params.feeids != '') {

                if (pub_cuid == rowData.fe_cuid) {
                    pub_cuid = 0;

                    var a = params.feeids.split(',');
                    var b = rowData.fe_feeids.split(',');

                    var result = $.grep(a, function (n, i) {
                        return $.inArray(n, b) < 0;
                    });

                    params.feeids = result.join(',');

                    if (params.feeids == "") {
                        $("#tab_fee_detailed").datagrid('loadData', [])
                    } else {
                        load_tab_fee_detailed();
                    }


                }

            }

        }
    })

}

function load_tab_fee_detailed() {

    $("#tab_fee_detailed").datagrid({
        url: '/Ashx/invoice_mgr.ashx',
        queryParams: params,
        method: 'post',
        singleSelect: false,
        rowTooltip: function (value, rowData) {


            return '<table style="padding: 5px;"><tbody>' +
                  '<tr style="height: 20px;">' +
                      '<td style="text-align: left; width: 60px;">结算对象:</td>' +
                      '<td style="width: 150px;">' + rowData.rec_unit + '</td>' +
                  '</tr>' +
                  '<tr style="height: 20px;">' +
                      '<td style="text-align: left; width: 60px;">费用总计:</td>' +
                      '<td style="width: 150px;">' + rowData.bf_rrmb + '</td>' +
                  '</tr>' +
                  '<tr style="height: 20px;">' +
                      '<td style="text-align: left; width: 60px;">发票号:</td>' +
                      '<td style="width: 150px;">21421024/21421023</td>' +
                  '</tr>' +
                  '<tr style="height: 20px;">' +
                      '<td style="text-align: left; width: 60px;">发票对冲金额:</td>' +
                      '<td style="width: 150px;">1100/500</td>' +
                  '</tr>' +
                  '</tbody>' +
              '</table>';



        },
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: true,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        toolbar: "#dv_fi_toolbar",
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
               field: 'bf_fee_state', title: '状态', width: 60, align: 'center',
               formatter: function (value, row, index) {
                   if (value == 2) {
                       return "已开票";

                   } else {
                       return "未开票";
                   }
               },
               styler: function (value, row, index) {
                   if (value == 2) {
                       return "background-color:#ff3333;cursor: pointer;";
                   } else {
                       return "background-color:#00FF99;cursor: pointer;";
                   }
               }

           },

           {
               field: 'busi_no', title: '业务编号', width: 100, align: 'center'

           },
            {
                field: 'rec_unit', title: '结算对象', width: 150, align: 'center'

            },
            {
                field: 'fee_item', title: '费用类型', width: 80, align: 'center'

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
                field: 'bf_etax_amount', title: '不含税金额', width: 80, align: 'center'

            },
            {
                field: 'in_type', title: '发票类型', width: 90, align: 'center'

            },
        ]],
        onSelect: function (rowIndex, rowData) {


            if (rowData.bf_fee_state == 2) {
                $.messager.alert("提示", "已开票费项不可选中！");
                $("#tab_fee_detailed").datagrid('unselectRow', rowIndex);
            } else {
                pub_feeids.push(rowData.bf_id);
            }


        },
        onUnselect: function (rowIndex, rowData) {
            var index = pub_feeids.indexOf(rowData.bf_id);
            var len = pub_feeids.length;
            pub_feeids.splice(index, len);
        }

    })
}