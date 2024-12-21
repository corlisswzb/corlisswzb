$(document).ready(function () {

    $('#search_fee_dat_beg').datebox('setValue','');
    $('#search_fee_dat_end').datebox('setValue', '');

    init_tab_order_group();
    init_tab_rec_group();
    init_tab_pay_group();

    refresh_data();
});

function refresh_data() {
    var par = {
        rnd: Math.random(),
        action: 'get_group_details_of_operation_for_self',
        fee_beg_dat: $('#search_fee_dat_beg').datebox('getValue'),
        fee_end_dat: $('#search_fee_dat_end').datebox('getValue'),
    };
    post('../Ashx/order.ashx', par,
    function (data) {
        $('#tab_order_group').datagrid('loadData', data);

        post('../Ashx/checkaccount.ashx', par,
        function (data) {

            var rec_list = [];
            var pay_list = [];

            if (data != undefined) {
                $.each(data, function (i, row) {
                    if (row.rec_or_pay == 1) {
                        rec_list.push(row);
                    } else {
                        pay_list.push(row);
                    }
                });
            }
            $('#tab_rec_group').datagrid('loadData', rec_list);
            $('#tab_pay_group').datagrid('loadData', pay_list);

        }, true);

    },true);
}

function init_tab_order_group() {
    $('#tab_order_group').datagrid({
        data: [],
         
        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。
       
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        nowrap: true,
        striped: true,
        collapsible: false, 
        fit: true,
        showFooter:true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[{ field: 'ot_typ_desc', title: '类型', sortable:true,width:60}]],
        columns: [[
                { title: '订单数量分类', colspan: 7, align:'center' },
                { title: '应收情况', colspan: 3, align: 'center' },
                { title: '应付情况', colspan: 3, align: 'center' },
        ], [
                { field: 'od_count', title: '总数', sortable: true, width: 50,  }
                , { field: 'unlock_od_count', title: '未锁', sortable: true, width: 50, }
                , { field: 'locking_od_count', title: '审单中', sortable: true, width: 50, }
                , { field: 'locked_od_count', title: '已锁', sortable: true, width: 50, }
                , { field: 'unreced_od_count', title: '未收清', sortable: true, width: 50, }
                , { field: 'unpayed_od_count', title: '未付清', sortable: true, width: 50, }
                , { field: 'unovered_od_count', title: '全结清', sortable: true, width: 50, } 
                , {
                    field: 'total_rec_fee_amount', title: '总金额', sortable: true, width: 120,
                    formatter: function (value, row, index) {
                        return value==undefined?0: parseFloat( value).toFixed(2);
                    }
                }
                , {
                    field: 'total_reced_fee_amount', title: '已收', sortable: true, width: 120,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                     field: 'total_unreced_fee_amount', title: '未收', sortable: true, width: 120,
                     formatter: function (value, row, index) {
                         return value == undefined ? 0 : parseFloat(value).toFixed(2);
                     }
                 }
                , {
                   field: 'total_pay_fee_amount', title: '总金额', sortable: true, width: 120,
                   formatter: function (value, row, index) {
                       return value == undefined ? 0 : parseFloat(value).toFixed(2);
                   }
                }
                , {
                    field: 'total_payed_fee_amount', title: '已付', sortable: true, width: 120,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_unpayed_fee_amount', title: '未付', sortable: true, width: 120,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }

        ]],
        onLoadSuccess: function (data) { 
            $('#tab_order_group').datagrid('reloadFooter', [
                {
                    ot_typ_desc: '合计:',
                    od_count: table_compute('tab_order_group', 'od_count'),
                    unlock_od_count: table_compute('tab_order_group', 'unlock_od_count'),
                    locking_od_count: table_compute('tab_order_group', 'locking_od_count'),
                    locked_od_count: table_compute('tab_order_group', 'locked_od_count'),
                    unreced_od_count: table_compute('tab_order_group', 'unreced_od_count'),
                    unpayed_od_count: table_compute('tab_order_group', 'unpayed_od_count'),
                    unovered_od_count: table_compute('tab_order_group', 'unovered_od_count'),
                    total_rec_fee_amount: table_compute('tab_order_group', 'total_rec_fee_amount'),
                    total_reced_fee_amount: table_compute('tab_order_group', 'total_reced_fee_amount'),
                    total_unreced_fee_amount: table_compute('tab_order_group', 'total_unreced_fee_amount'),
                    total_pay_fee_amount: table_compute('tab_order_group', 'total_pay_fee_amount'),
                    total_payed_fee_amount: table_compute('tab_order_group', 'total_payed_fee_amount'),
                    total_unpayed_fee_amount: table_compute('tab_order_group', 'total_unpayed_fee_amount'),
                }
            ]);
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_rec_group'), rowIndex);
             
        },
        onCheck: function (index, row) { 
        },
        onUncheck: function (index, row) { 
        },
        onCheckAll: function (index, row) { 
        },
        onUncheckAll: function (index, row) { 
        },
    });
}
 

function init_tab_rec_group() {
    $('#tab_rec_group').datagrid({
        data: [],

        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。

        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[
            { field: 'fee_cu_desc', title: '结算单位',  sortable: true, width: 260 } 
        ]],
        columns: [[
                { title: '总体情况', colspan: 3, align: 'center' },
                { title: '未归账情况', colspan: 5, align: 'center' },
                { title: '归账未交情况', colspan: 5, align: 'center' },
                { title: '交账未销情况', colspan: 5, align: 'center' },
        ], [
               {
                    field: 'total_fee_amount', title: '总金额', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_woa_amount', title: '已收', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_unwoa_amount', title: '未收', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_fee_amount1', title: '总金额', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_woa_amount1', title: '已收', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_unwoa_amount1', title: '未收', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'min_dat1', title: 'min业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'max_dat1', title: 'max业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'total_fee_amount2', title: '总金额', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_woa_amount2', title: '已收', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_unwoa_amount2', title: '未收', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'min_dat2', title: 'min业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'max_dat2', title: 'max业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'total_fee_amount3', title: '总金额', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_woa_amount3', title: '已收', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_unwoa_amount3', title: '未收', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'min_dat3', title: 'min业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'max_dat3', title: 'max业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
        ]],
        onLoadSuccess: function (data) {
            $('#tab_rec_group').datagrid('reloadFooter', [
                {
                    fee_cu_desc: '合计:',
                    total_fee_amount: table_compute('tab_rec_group', 'total_fee_amount'),
                    total_woa_amount: table_compute('tab_rec_group', 'total_woa_amount'),
                    total_unwoa_amount: table_compute('tab_rec_group', 'total_unwoa_amount'),
                    total_fee_amount1: table_compute('tab_rec_group', 'total_fee_amount1'),
                    total_woa_amount1: table_compute('tab_rec_group', 'total_woa_amount1'),
                    total_unwoa_amount1: table_compute('tab_rec_group', 'total_unwoa_amount1'),
                    min_dat1: '',
                    max_dat1: '',
                    total_fee_amount2: table_compute('tab_rec_group', 'total_fee_amount2'),
                    total_woa_amount2: table_compute('tab_rec_group', 'total_woa_amount2'),
                    total_unwoa_amount2: table_compute('tab_rec_group', 'total_unwoa_amount2'),
                    min_dat2: '',
                    max_dat2: '',
                    total_fee_amount3: table_compute('tab_rec_group', 'total_fee_amount3'),
                    total_woa_amount3: table_compute('tab_rec_group', 'total_woa_amount3'),
                    total_unwoa_amount3: table_compute('tab_rec_group', 'total_unwoa_amount3'),
                    min_dat3: '',
                    max_dat3: '',
                }
            ]);
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_rec_group'), rowIndex);

        },
        onCheck: function (index, row) {
        },
        onUncheck: function (index, row) {
        },
        onCheckAll: function (index, row) {
        },
        onUncheckAll: function (index, row) {
        },
    });
}

function init_tab_pay_group() {
    $('#tab_pay_group').datagrid({
        data: [],

        singleSelect: false,
        remoteSort: false, //定义从服务器对数据进行排序。

        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        showFooter: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,
        frozenColumns: [[
            { field: 'fee_cu_desc', title: '结算单位', sortable: true, width: 260 }
        ]],
        columns: [[
                { title: '总体情况', colspan: 3, align: 'center' },
                { title: '未归账情况', colspan: 5, align: 'center' },
                { title: '归账未交情况', colspan: 5, align: 'center' },
                { title: '交账未销情况', colspan: 5, align: 'center' },
        ], [
               {
                   field: 'total_fee_amount', title: '总金额', sortable: true, width: 80,
                   formatter: function (value, row, index) {
                       return value == undefined ? 0 : parseFloat(value).toFixed(2);
                   }
               }
                , {
                    field: 'total_woa_amount', title: '已付', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_unwoa_amount', title: '未付', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_fee_amount1', title: '总金额', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_woa_amount1', title: '已付', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_unwoa_amount1', title: '未付', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'min_dat1', title: 'min业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'max_dat1', title: 'max业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'total_fee_amount2', title: '总金额', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_woa_amount2', title: '已付', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_unwoa_amount2', title: '未付', sortable: true, width:80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'min_dat2', title: 'min业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'max_dat2', title: 'max业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'total_fee_amount3', title: '总金额', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_woa_amount3', title: '已付', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'total_unwoa_amount3', title: '未付', sortable: true, width: 80,
                    formatter: function (value, row, index) {
                        return value == undefined ? 0 : parseFloat(value).toFixed(2);
                    }
                }
                , {
                    field: 'min_dat3', title: 'min业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
                , {
                    field: 'max_dat3', title: 'max业务时间', sortable: true, width: 90,
                    formatter: function (value, row, index) {
                        return dateformat(value, true);
                    }
                }
        ]],
        onLoadSuccess: function (data) {
            $('#tab_pay_group').datagrid('reloadFooter', [
                {
                    fee_cu_desc: '合计:',
                    total_fee_amount: table_compute('tab_pay_group', 'total_fee_amount'),
                    total_woa_amount: table_compute('tab_pay_group', 'total_woa_amount'),
                    total_unwoa_amount: table_compute('tab_pay_group', 'total_unwoa_amount'),
                    total_fee_amount1: table_compute('tab_pay_group', 'total_fee_amount1'),
                    total_woa_amount1: table_compute('tab_pay_group', 'total_woa_amount1'),
                    total_unwoa_amount1: table_compute('tab_pay_group', 'total_unwoa_amount1'),
                    min_dat1: '',
                    max_dat1: '',
                    total_fee_amount2: table_compute('tab_pay_group', 'total_fee_amount2'),
                    total_woa_amount2: table_compute('tab_pay_group', 'total_woa_amount2'),
                    total_unwoa_amount2: table_compute('tab_pay_group', 'total_unwoa_amount2'),
                    min_dat2: '',
                    max_dat2: '',
                    total_fee_amount3: table_compute('tab_pay_group', 'total_fee_amount3'),
                    total_woa_amount3: table_compute('tab_pay_group', 'total_woa_amount3'),
                    total_unwoa_amount3: table_compute('tab_pay_group', 'total_unwoa_amount3'),
                    min_dat3: '',
                    max_dat3: '',
                }
            ]);
        },
        onClickRow: function (rowIndex, field, value) {
            custom_keyclickRow($('#tab_pay_group'), rowIndex);

        },
        onCheck: function (index, row) {
        },
        onUncheck: function (index, row) {
        },
        onCheckAll: function (index, row) {
        },
        onUncheckAll: function (index, row) {
        },
    });
}