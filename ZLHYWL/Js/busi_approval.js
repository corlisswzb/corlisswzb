var pagenum = 1;
var pagesize = 30;

var params = {
    rnd: Math.random(),
    action: 'get_business_sp_list',
    like_str: '',
    cpy_id: 0,
    sponsor: 0,
    trade: 0,
    ap_state: 0,
    sdate:'',
    edate:''
}


$(document).ready(function () {

    load_tab_busi_ap();

    load_combobox_busi();

    //业务审核通过
    $("#btn_pass_busi").click(function () {


        //判断是否有权限审核，不是审核节点人员
        istrue_examine();

        var rows = $("#tab_busi_ap").datagrid("getSelections");

        //判断选中的数据行是否为待办审核的数据
        if (istrue_row(rows)) {
            alert("请选中正确的待办数据行！");
            return;
        }

        if (rows.length > 0) {

            var ids = [];
            var pks = [];
            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].bm_std_id);
                pks.push(rows[i].baa_pk);
            }

            $.getJSON('/Ashx/busi_approval.ashx',
            {
                rnd: Math.random(),
                action: 'approval_business',
                busi_ids: ids.join(','),
                baapks: pks.join(','),
                bar_spstate: 1,
                bar_remarks:''

            },
            function (data) {
                if (data.result == 1) {
                    load_tab_busi_ap();
                }
            })
        } else {
            $.messager.alert("提示", "请选择要选中的行", "error");
        }
    })


    //业务审核驳回
    $("#btn_reject").click(function () {


        //判断是否有权限审核，不是审核节点人员
        istrue_examine();

        var rows = $("#tab_busi_ap").datagrid("getSelections");

        //判断选中的数据行是否为待办审核的数据
        if (istrue_row(rows)) {
            alert("请选中正确的待办数据行！");
            return;
        }

        if (rows.length > 0) {

            var ids = [];
            var pks = [];
            for (var i = 0; i < rows.length; i++) {
                ids.push(rows[i].bm_std_id);
                pks.push(rows[i].baa_pk);
            }

            $.getJSON('/Ashx/busi_approval.ashx',
            {
                rnd: Math.random(),
                action: 'reject_approval_business',
                busi_id: ids.join(','),
                baa_pk: pks.join(','),
                bar_remarks: ''

            },
            function (data) {
                if (data.result == 1) {
                    load_tab_busi_ap();
                }
            })
        } else {
            $.messager.alert("提示", "请选择要选中的行", "error");
        }
    })


    //查询
    $("#btn_search").click(function () {

        params.like_str = $("#ipt_serch").searchbox("getValue");
        params.cpy_id = $("#ipt_company").combobox("getValue");
        params.sponsor = $("#ipt_sponsor").combobox("getValue");
        params.trade = $("#ipt_trade").combobox("getValue");
        params.ap_state = $("#ipt_spstate").combobox("getValue");
        params.sdate = $("#ipt_sdate").datebox("getValue");
        params.edate = $("#ipt_edate").datebox("getValue");

        load_tab_busi_ap();
        
    })

   
})

function load_combobox_busi() {

    $.getJSON('/Ashx/busi_approval.ashx', {
        action: 'get_approval_combobox_data',
        rnd: Math.random()

    }, function (data) {

        bind_combobox(data.cpy_list.rows, $('#ipt_company'), 'cpy_name', 'cpy_id', false);
        bind_combobox(data.sqr_list.rows, $('#ipt_sponsor'), 'u_real_name', 'u_id', false);
    })



}

function istrue_row(rows) {

    for (var i = 0; i < rows.length; i++) {
        if (rows[i]["ismystatus"] == 0) {
            return true;
        }
    }

    return false;
}

function istrue_examine() {

    $.getJSON('/Ashx/busi_approval.ashx',
    {
        rnd: Math.random(),
        action: 'judge_node_auditor'
       
    },
    function (data) {
        if (data.result == 1) {
           
        } else {
            alert("您没有权限操作审核，请联系管理员添加");
            return;
        }
    })
}

function load_tab_busi_ap() {

    $("#tab_busi_ap").datagrid({
        url: '/Ashx/busi_approval.ashx',
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
        toolbar:"#dv_toolbar",
        fitColumns: false,
        idField: 'bm_id', //主键
        pageNumber: pagenum,
        pageSize: pagesize,
        pageList: [30, 60, 120],
        checkbox: true,
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            {
                field: 'ismystatus', width: 40,
                formatter: function (value, row, index) {
                    return value == 1 ? '<label class="lable_cls">待办</label>' : '';
                }
            },
            { field: 'ck', checkbox: true },
            {
                field: 'baa_spstate', title: '状态', width: fixWidth(0.04), align: 'center', sortable: true,
                formatter: function (value, row, index) {
                    if (value == 0 && row.ismystatus==1) {
                        return '待审核';2
                    } else if (value == 0) {
                        return '审核中';1
                    } else if (value == 2) {
                        return '已结束';0
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
           
            { field: 'cu_name', title: '委托单位', width: fixWidth(0.15), align: 'center', sortable: true },
           
            { field: 'project_name', title: '项目名称', width: fixWidth(0.06), align: 'center', sortable: true },


            {
                field: 'bm_trade', title: '内外贸', width: fixWidth(0.06), align: 'center', sortable: true,
                formatter: function (value, row, index) {
                    if (value == 1) {
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
                    } else {
                        return "";
                    }
                }
            },
            { field: 'pr_name', title: '品名', width: fixWidth(0.10), align: 'center', sortable: true },
            { field: 'bs_box_size', title: '箱型箱量', width: fixWidth(0.10), align: 'center', },
            { field: 'bfs_get_money', title: '应收', width: fixWidth(0.06), align: 'center', },
            { field: 'bfs_pay_money', title: '应付', width: fixWidth(0.06), align: 'center', },
            { field: 'sponsor', title: '申请人', width: fixWidth(0.06), align: 'center', },
            {
                field: 'bap_date', title: '申请时间', width: fixWidth(0.06), align: 'center',
                formatter: function (value, row, index) {
                    return dateformat(value, true);
                }
            }
           




        ]],
        view: detailview,
        detailFormatter: function(rowIndex, rowData){
            return '<table><tr>' +
                  
                    '<td style=" border:0;padding-right:20px">' +
                    '<p><span class="cls_span">客户编号:</span> ' + rowData.bd_custom_no + '</p>' +
                    '<p><span class="cls_span">起运港:</span>' + rowData.start_port + '</p>' +
                    '<p><span class="cls_span">委托时间:</span>' + dateformat(rowData.bd_trust_date,true) + '</p>' +
                    '</td>' +
                   '<td style=" border:0;padding-right:20px">' +
                    '<p><span class="cls_span">提单号:</span>' + rowData.bl_main_no + '</p>' +
                    '<p><span class="cls_span">目的港:</span> ' + rowData.end_port + '</p>' +
                   '<p><span class="cls_span">业务时间:</span>' + dateformat(rowData.bd_busi_date,true) + '</p>' +
                    '</td>' +
                   '<td style=" border:0;padding-right:20px">' +
                    '<p>&nbsp;</p>' +
                    '<p><span class="cls_span">中转港:</span> ' + rowData.u_real_name + '</p>' +
                    '<p><span class="cls_span">录单人:</span>' + rowData.u_real_name + '</p>' +
                    '</td>' +
                    '<td style=" border:0;padding-right:20px">' +
                    '<p>&nbsp;</p>' +
                    '<p><span class="cls_span">目的地:</span> ' + rowData.bs_destination + '</p>' +
                    '<p>&nbsp;</p>' +
                    '</td>' +
                    '</tr></table>';

            
        },
        onDblClickCell: function (index, field, value) {

            if (field == "bm_std_id") {
                window.location = "business_input.aspx?busi_id=" + value;
            }
           
        }

    })

}


