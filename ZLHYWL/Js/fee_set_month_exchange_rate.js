var basesetting = undefined;
var editRow  = undefined;
var res_edit_row = undefined;
$(document).ready(function () {
    $($('body')[0]).unbind('keydown').bind('keydown', custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);
    //基础数据
    get_basesetting();
});

function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        basesetting = data;
     
        var data_currency_list = basesetting.currency_list;
        var now_time = basesetting.sys_time;
        var date = eval('new Date(' + now_time.replace(/\d+(?=-[^-]+$)/, function (a) {
            //console(a);
            return parseInt(a, 10);
        }).match(/\d+/g) + ')'); 
        //需要将 月份 - 1 ????
        date.setMonth(date.getMonth() - 1); 
        //往后加1年，往前 10年  
        var now_year = date.getFullYear();
        var select_years = [];
        for (var nY = now_year - 3 ; nY <= now_year + 1 ; nY++) {
            select_years.push({ value: nY, text: nY + '年' });
        }
        bind_combobox(select_years, $('#group_search_year'), 'text', 'value', false); 
        $('#group_search_year').combobox({
            onSelect: function (val) {
                refresh_tab_exchange_month_rate();
            }
        });
        $('#group_search_year').combobox('setValue', now_year);
        
        $('#data_currency_list tbody tr').html('');
        //还可以得到币种  currency_list
        $.each(data_currency_list, function (i, item) { 
            var td = '<td style="width:60px;"><input type="radio" value="' + item.cr_id + '" id="currency_' + item.cr_id + '" name="group_search_cr_id"/> <label for="currency_' + item.cr_id + '">' + item.cr_name + '</label></td>';

            $('#currency_typ_group_radio tbody tr').append(td);
        });
        $('input:radio[name="group_search_cr_id"]').eq(0).attr("checked", true);
        $('input:radio[name="group_search_cr_id"]').unbind('click').bind('click', function () {
            refresh_tab_exchange_month_rate();
        }); 

        load_tab_exchange_month_rate();

        refresh_tab_exchange_month_rate();
    }, true);
    
}

//表格初始化
function load_tab_exchange_month_rate() {

    $("#tab_exchange_month_rate").datagrid({
        data: {total:0,rows:[]},
        singleSelect: true,  
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_exchange_month_rate_bar',
        fit: true,
        fitColumns: false, 
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            {
                field: 'er_year', width: 100, title: '年-月', align: 'left',  
                formatter: function (value, row, index) {
                    return row.er_year + '年-' + (Number(row.er_month) < 10?('0' + row.er_month): row.er_month ) + '月';
                }
            }, 
            { field: 'er_cr_name', width: 70, title: '币种', align: 'left' },
            { field: 'er_cr_code', width: 70, title: '币种代码', align: 'left'  }, 
            { field: 'er_cr_rate', width: 90, title: '汇率', align: 'left', editor: { type: 'numberbox',options:{min:0,precision:4}} },
            { field: 'er_record_by_nam', width: 100, title: '记录人', align: 'left', },
            {
                field: 'er_record_dat', width: 100, title: '记录时间', align: 'left',
                formatter: function (value, row, index) {
                    if (value == undefined) {
                        return '';
                    } else {
                        return dateformat(value,true);
                    }
                      
                }
            },
        ]],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row);
            editRow = undefined;
            post('../Ashx/exchange_rate.ashx', {
                rnd: Math.random(),
                action: 'set_month_exchange_rate',
                er_year: row.er_year,
                er_month: row.er_month,
                er_cr_id: row.er_cr_id,
                er_cr_rate: row.er_cr_rate
            }, function (data) { 
                if (data.result == 1) {
                        
                    row.er_id = data.er_id;
                    row.er_record_by_nam = data.er_record_by_nam;
                    row.er_record_dat = data.er_record_dat;

                    //然后进行行更新 
                    $('#tab_exchange_month_rate').datagrid('updateRow', {
                        index: index,
                        row: row
                    });
                } else { 
                    //然后进行行更新 
                    $('#tab_exchange_month_rate').datagrid('updateRow', {
                        index: index,
                        row: res_edit_row
                    }); 
                    $('#tab_exchange_month_rate').datagrid('beginEdit', index);
                    editRow = index;
                    $.messager.alert('错误提示', data.msg, 'error');
                }
                 
            }, false);
        },
        onBeforeEdit: function (index, row) { 
            res_edit_row = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow = undefined; 
        },
        onClickRow: function (rowIndex, rowData) {

            if (editRow == rowIndex) {
                $("#tab_exchange_month_rate").datagrid("endEdit", editRow);
                editRow == undefined;
            } else {

                if (editRow != undefined && editRow != rowIndex) {
                    $("#tab_exchange_month_rate").datagrid("endEdit", editRow);
                }
                if (editRow == undefined) { 
                    editRow = rowIndex;
                    $("#tab_exchange_month_rate").datagrid("beginEdit", rowIndex);
                }
            }
        },
    }); 
}

//选择币种或年，刷新表格 
function refresh_tab_exchange_month_rate() {

    if (editRow != undefined) {
        $("#tab_exchange_month_rate").datagrid("cancelEdit", editRow);
        editRow = undefined;
        res_edit_row = undefined;
    }

    var er_cr_id = $('input:radio[name="group_search_cr_id"]:checked').val(); 
    var er_year = $('#group_search_year').combobox('getValue');

    post('../Ashx/exchange_rate.ashx', {
        rnd: Math.random(),
        action: 'get_month_exchange_rate',
        er_year: er_year,
        er_cr_id: er_cr_id,
    }, function (data) {
        $("#tab_exchange_month_rate").datagrid('loadData', data);
    },true);
}
