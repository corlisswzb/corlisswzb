var basesetting = undefined;
var editRow  = undefined;
var res_edit_row = undefined;
$(document).ready(function () {
    $($('body')[0]).unbind('keydown').bind('keydown', custom_keypress);
    $($('body')[0]).unbind('keyup').bind('keyup', custom_keyrelease);
    //获取当前的 单位的银行信息 
    load_info();
    
     
});

function load_info() {
    post('../Ashx/schema_cto.ashx', {
        rnd: Math.random(),
        action: 'get_schema_cto_bank_and_invoice_info',

    }, function (data) {
        var item = data.rows[0];

        $('#ed_c_desc').val(item.c_desc);
        $('#ed_c_desc2').val(item.c_desc);
        $('#ed_c_tax_no').val(item.c_tax_no);
        $('#ed_c_cn_bank_desc').val(item.c_cn_bank_desc);
        $('#ed_c_cn_bank_no').val(item.c_cn_bank_no);
        $('#ed_c_cn_register_address').val(item.c_cn_register_address);
        $('#ed_c_cn_phone').val(item.c_cn_phone);
        $('#ed_c_en_bank_desc').val(item.c_en_bank_desc);
        $('#ed_c_en_bank_no').val(item.c_en_bank_no);
        $('#ed_c_en_register_address').val(item.c_en_register_address);
        $('#ed_c_invoice_address').val(item.c_invoice_address);
        $('#ed_c_invoice_name').val(item.c_invoice_name);
        $('#ed_c_invoice_phone').val(item.c_invoice_phone);

    }, true);
}
 

function save_schema_cto_bank_and_invoice_info() {
    post('../Ashx/schema_cto.ashx', {
        rnd: Math.random(),
        action: 'insert_schema_cto_bank_and_invoice_info',  
        c_tax_no : $('#ed_c_tax_no').val(),
        c_cn_bank_desc:$('#ed_c_cn_bank_desc').val(),
        c_cn_bank_no: $('#ed_c_cn_bank_no').val(),
        c_cn_register_address:$('#ed_c_cn_register_address').val(),
        c_cn_phone:$('#ed_c_cn_phone').val(),
        c_en_bank_desc:$('#ed_c_en_bank_desc').val(),
        c_en_bank_no:$('#ed_c_en_bank_no').val(),
        c_en_register_address:$('#ed_c_en_register_address').val(),
        c_invoice_address:$('#ed_c_invoice_address').val(),
        c_invoice_name:$('#ed_c_invoice_name').val(),
        c_invoice_phone:$('#ed_c_invoice_phone').val(),
    }, function (data) {
        if (data.result == 1) {
            load_info();
            $.messager.alert('提示',data.msg,'info');
        } else {
            $.messager.alert('错误提示', data.msg, 'error');
        }
    },true);
}