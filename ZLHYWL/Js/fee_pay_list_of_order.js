﻿
var basesetting = undefined;

var from_typ = 'fee';

$(document).ready(function () { 
    get_basesetting();

});
/*供给给iframe调用 */
//查询 费用所属 业务的审核流程 
function call_win_view_of_approval_details_from_list(amc_id) {

    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_approval_flow_details.aspx?rnd=' +
                        Math.random() + '&amc_id=' +
                        amc_id +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#win_approval_flow_details').window({
        title: '查看审核流程 ',
        content: content
    }).window('open');
}
//查询 结算对象  银行信息 
function call_win_view_of_bank_info_from_list(cu_id) {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_bank_info_by_cu_id',
        cu_id: cu_id,
    }, function (data) {

        $('#ap_bank_details tbody').html('');
        if (data.rows.length > 0) {
            $.each(data.rows, function (i, item) {
                $('#ap_bank_details tbody').append(
                      '<tr>'
                        + '<td><textarea  class="easyui-textarea" style=" overflow-x:hidden; font-size:18px; overflow-y:auto; resize:none; width:90%; height:82px;">' + item.bank_info + '</textarea> </td>'
                    + '</tr>');
            });
        }
        $('#win_cu_bank_info').window('open');

    }, false);
}

//查询业务简报
function call_win_view_of_short_order_info(od_seq, od_no) {
    //这里 应该 改一下 
    var content = '<iframe scrolling="auto" frameborder="0"  src="template_short_order_info_frame.aspx?rnd=' +
                        Math.random() + '&od_seq=' +
                        od_seq +
                        '" style="width:100%;height:100%;"></iframe>';
    $('#window_of_order_info').window({
        title: '订单: ' + od_no,
        content: content
    }).window('open');
}
 
//打印 
function call_win_view_of_print(action, seq) {

    if (action == 'print_order_fee_by_woa_seq') {
        //这里 应该 改一下 
        var content = '<iframe scrolling="auto" frameborder="0"  src="template_print_fee_details_of_write_off.aspx?rnd=' +
                            Math.random() + '&woa_seq=' +
                            seq + '&action=print_order_fee_by_woa_seq' +
                            '" style="width:100%;height:100%;"></iframe>';
        $('#win_for_rpt_print').window({
            title: '打印销账费用明细',
            content: content
        }).window('open');
    }
    if (action == 'print_order_fee_by_oi_seq') {
        var content = '<iframe scrolling="auto" frameborder="0"  src="template_print_fee_details_of_invoice.aspx?rnd=' +
                        Math.random() + '&oi_seq=' +
                        seq + '&action=print_order_fee_by_oi_seq' +
                        '" style="width:100%;height:100%;"></iframe>';
        $('#win_for_rpt_print').window({
            title: '打印发票号费用明细',
            content: content
        }).window('open');
    }
    if (action == 'print_pay_amc_head') {
        var content = '<iframe scrolling="auto" frameborder="0"  src="template_print_pay_amc_head.aspx?rnd=' +
                        Math.random() + '&amc_id=' +
                        seq + '&action=print_pay_amc_head' +
                        '" style="width:100%;height:100%;"></iframe>';
        $('#win_for_rpt_print').window({
            title: '打印审核申请票头',
            content: content
        }).window('open');
    }
    if (action == 'print_pay_amc_body') {
        var content = '<iframe scrolling="auto" frameborder="0"  src="template_print_pay_amc_head.aspx?rnd=' +
                        Math.random() + '&amc_id=' +
                        seq + '&action=print_pay_amc_body' +
                        '" style="width:100%;height:100%;"></iframe>';
        $('#win_for_rpt_print').window({
            title: '打印审核申请明细',
            content: content
        }).window('open');
    }
    if (action == 'print_pay_amc_all') {
        var content = '<iframe scrolling="auto" frameborder="0"  src="template_print_pay_amc_head.aspx?rnd=' +
                        Math.random() + '&amc_id=' +
                        seq + '&action=print_pay_amc_all' +
                        '" style="width:100%;height:100%;"></iframe>';
        $('#win_for_rpt_print').window({
            title: '打印审核申请票头和明细',
            content: content
        }).window('open');
    }

}

//子页面获取 basesetting
function call_get_father_basesetting() {
    return basesetting;
}
function call_get_from_typ() {
    return from_typ;
}
  
//获取基础数据
function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        basesetting = data;
         

        var content = '<iframe scrolling="auto" name="amc_page" frameborder="0"  src="template_amc_pay_for_bus_of_focus.aspx?rnd=' +
                        Math.random() + '&fee_flag=1' +
                        '" style="width:100%;height:100%;"></iframe>';
        $('#panel_cap').panel({
            content: content
        });


      

    }, true);
}

//获取数量 
function get_checkaccount_count_by_typ_index(setting) {
    post('../Ashx/checkaccount.ashx', {
        rnd: Math.random(),
        action: 'get_checkaccount_count_by_typ_index',
        rec_or_pay: -1,
    }, function (data) {
        if (!!data) {
            setting(data.rows);
        }
    },false);
}

//路径
function call_get_path() {
    return '财务管理-应付发票和销账-付款';
}
