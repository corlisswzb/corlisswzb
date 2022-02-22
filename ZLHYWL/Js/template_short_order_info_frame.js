var cur_od_seq = undefined;
var cur_order = undefined;
var cur_next_amc_opr_info = undefined;

var filenam = undefined;

$(document).ready(function () {
    
    cur_od_seq = getQueryVariable('od_seq');
    get_order_details_collections();
});


//获取资料 
function get_order_details_collections() {
    post('../Ashx/order.ashx', {
        rnd: Math.random(),
        action: 'get_order_single_full_collections',
        od_seq: cur_od_seq
    }, function (data) {
        cur_order = data;

        var od_base = data.order_base_info_and_cargo_info[0];
        $('#od_record_by_company_desc').html(od_base.od_record_by_company_desc);
        $('#od_delegate_cu_desc').html(od_base.od_delegate_cu_desc);
        $('#od_fee_dat').html(dateformat(od_base.od_fee_dat, true));
        $('#od_typ_desc').html(od_base.od_typ_desc);
        $('#od_cargo_typ_desc').html(od_base.od_cargo_typ_desc);
        $('#od_no').html(od_base.od_no);
        filenam = od_base.od_no + '费用清单';
        $('#od_beg_place_desc').html(od_base.od_beg_place_desc);
        $('#od_end_place_desc').html(od_base.od_end_place_desc);
        $('#od_main_bill_no').html(od_base.od_main_bill_no);
        $('#od_freight_desc').html(od_base.od_freight_desc);
        $('#od_cntr_desc').html(od_base.od_cntr_desc);
        $('#lose_explain').html(od_base.od_profit_and_loss_bak);
        $('#sum_rmb_profit_2').html(od_base.profit_total_amount_desc + '&nbsp;&nbsp;折算人民币:' + od_base.profit_total_amount_of_base);
        $('#gross_profit').html((100 * (od_base.profit_total_amount_of_base / od_base.rec_total_amount_of_base)).toFixed(2) + '%');

        load_order_rec_fee(data.order_rec_fee_list);

        load_order_pay_fee(data.order_pay_fee_list);
  
        $('.datagrid-body').css({
            'overflow-y':'hidden'
        });
         
      
    },true);
}
//应收
function load_order_rec_fee(order_rec_fee_list) {
    

    var tab = '<table class="abtab_print tab_part_of_feetitle"   style="border-collapse:collapse;">' +
        '<col style="width:30px;"></col>' +
        '<col style="width:180px;"></col>' +
        '<col style="width:60px;"></col>' +
        '<col style="width:40px;"></col>' +
        '<col style="width:70px;"></col>' +
        '<col style="width:60px;"></col>' +
        '<col style="width:60px;"></col>' +
        '<col style="width:50px;"></col>' +
        '<col style="width:70px;"></col>' +
        '<col style="width:70px;"></col>' +
        '<col style="width:70px;"></col>' +
        '<col style="width:180px;"></col>' + 
    '<thead>' +
        '<tr>' +
            '<th>序号</th>' +
            '<th>结算单位</th>' +
            '<th>费项</th>' +
            '<th>币种</th>' +
            '<th>单价</th>' +
            '<th>数量</th>' +
            '<th>单位</th>' +
            '<th>汇率</th>' +
            '<th>金额</th>' +
            '<th>票率</th>' +
            '<th>已收</th>' +
            '<th>发票号</th>' +
        '</tr>' +
    '</thead><tbody>';

    $.each(order_rec_fee_list.rows, function (i, row) {
        tab += '<tr>' +
                   '<td>' + (i+1) + '</td>' +
                   '<td>' + row.fee_cu_desc + '</td>' +
                   '<td>' + row.fee_item_typ_desc + '</td>' +
                   '<td>' + row.fee_currency_desc + '</td>' +
                   '<td>' + row.fee_price.toFixed(2) + '</td>' +
                   '<td>' + row.fee_number.toFixed(2) + '</td>' +
                   '<td>' + row.fee_unit_desc + '</td>' +
                   '<td>' + row.fee_currency_rate.toFixed(4) + '</td>' +
                   '<td>' + row.fee_amount.toFixed(2) + '</td>' +
                   '<td>' + row.fee_invoice_typ_desc + '</td>' +
                   '<td>' + row.woa_total_amount.toFixed(2) + '</td>' +
                   '<td>' + (!row.od_invoice_no ? '无' : row.od_invoice_no )+ '</td>' +
               '</tr>';
    });

    tab += '</tbody></table>';

    $("#tab_order_fee_rec").html(tab);

    table_bottom_group_desc(order_rec_fee_list.group_fee_desc, order_rec_fee_list.total, 'group_fee_rec',1);
 
    return;

    
}
 
//应付
function load_order_pay_fee(order_pay_fee_list) {
    var tab = '<table class="abtab_print tab_part_of_feetitle"   style="border-collapse:collapse;">' +
        '<col style="width:30px;"></col>' +
        '<col style="width:180px;"></col>' +
        '<col style="width:60px;"></col>' +
        '<col style="width:40px;"></col>' +
        '<col style="width:70px;"></col>' +
        '<col style="width:60px;"></col>' +
        '<col style="width:60px;"></col>' +
        '<col style="width:50px;"></col>' +
        '<col style="width:70px;"></col>' +
        '<col style="width:70px;"></col>' +
        '<col style="width:70px;"></col>' +
        '<col style="width:180px;"></col>' +
    '<thead>' +
        '<tr>' +
            '<th>序号</th>' +
            '<th>结算单位</th>' +
            '<th>费项</th>' +
            '<th>币种</th>' +
            '<th>单价</th>' +
            '<th>数量</th>' +
            '<th>单位</th>' +
            '<th>汇率</th>' +
            '<th>金额</th>' +
            '<th>票率</th>' +
            '<th>已付</th>' +
            '<th>发票号</th>' +
        '</tr>' +
    '</thead><tbody>';

    $.each(order_pay_fee_list.rows, function (i, row) {
        tab += '<tr>' +
                   '<td>' + (i + 1) + '</td>' +
                   '<td>' + row.fee_cu_desc + '</td>' +
                   '<td>' + row.fee_item_typ_desc + '</td>' +
                   '<td>' + row.fee_currency_desc + '</td>' +
                   '<td>' + row.fee_price.toFixed(2) + '</td>' +
                   '<td>' + row.fee_number.toFixed(2) + '</td>' +
                   '<td>' + row.fee_unit_desc + '</td>' +
                   '<td>' + row.fee_currency_rate.toFixed(4) + '</td>' +
                   '<td>' + row.fee_amount.toFixed(2) + '</td>' +
                   '<td>' + row.fee_invoice_typ_desc + '</td>' +
                   '<td>' + row.woa_total_amount.toFixed(2) + '</td>' +
                   '<td>' + (!row.od_invoice_no ? '无' : row.od_invoice_no) + '</td>' +
               '</tr>';
    });

    tab += '</tbody></table>';

    $("#tab_order_fee_pay").html(tab);

    table_bottom_group_desc(order_pay_fee_list.group_fee_desc, order_pay_fee_list.total, 'group_fee_pay',-1);
}
 
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function preview(oper) {
    if (oper < 10) {
        bdhtml = window.document.body.innerHTML;//获取当前页的html代码
        sprnstr = "<!--startprint" + oper + "-->";//设置打印开始区域
        eprnstr = "<!--endprint" + oper + "-->";//设置打印结束区域
        prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html
        prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));//从结束代码向前取html

        window.document.body.innerHTML = prnhtml;
        window.print();
        //window.document.body.innerHTML=bdhtml;
    } else {
        window.print();
    }
}
function print_contract() {

    /*preview(0);*/
    $(".print_body").print();

}


function topdf_contract() {
    var scrollHeight = $('#export_content').prop("scrollHeight");
    $('#export_content').scrollTop(scrollHeight);
    var height = $('#export_content').height();

    html2canvas(
    $('#export_content'),
    {
        height: scrollHeight,
        y: (height - scrollHeight + 260),
        dpi: window.devicePixelRatio * 2,
        onrendered: function (canvas) { 
            var imgData = canvas.toDataURL('img/notice/png');
            var doc = new jsPDF('p', 'px', 'a4');
            doc.addImage(imgData, 'PNG', 10, 20, 0, 0);
            doc.save(filenam + '.pdf');
        },
        //背景设为白色（默认为黑色）
        background: "#fff"
    });
}

//下载
function download_order_fee() {
    var down_params = {
        od_seq: cur_od_seq
    };
    down_params.action = 'download_single_full_collections';
    window.open('../Ashx/order.ashx?' + parseParams(down_params));
}