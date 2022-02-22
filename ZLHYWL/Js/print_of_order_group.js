$(document).ready(function () {



    //找出其中所有的 abtab_print 
    var max_part = $('#export_content .tab_part').length;
    var cur_tables = $('#export_content .tab_part');
    for (var ind = 0; ind < max_part; ind += 1) {
        
        if (ind != 0) {
            $(cur_tables[ind]).before('<div style="page-break-after:always;"></div>');
        } 
        //else {
        //    $(cur_tables[ind]).css({
        //        "margin-top": "50px"
        //    });
        //}   
    }

    //for (var ind = 1; ind < max_part; ind+=2) {

    //    var prv = $(cur_tables[ind]).prev();
        
    //    var prvprv = $(cur_tables[ind-1]);
    //    if (prv.index() == prvprv.index()) {
    //        var mar = 700 - prv.height();
    //        $(cur_tables[ind]).css({
    //            "margin-top": mar + "px"
    //        });
    //    } else {
    //        var mar = 700 - (prvprv.height() + 20 + prv.height());
    //        $(cur_tables[ind]).css({
    //            "margin-top": mar + "px"
    //        });
    //    }
       
    //}

});

 

var filenam = undefined;
 
function dateformat(val) {
    if (val != null) {
        //取得时间戳部分 如：获取 /Date(1545299299910)/ 中的 1545299299910 部分
        var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
        //月份为0-11，所以+1，月份小于10时补个0
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var currentTime = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        //格式化显示，形如：2018-12-20 17:48:19
        //return date.getFullYear() + "-" + month + "-" + currentDate + " " + currentTime + ":" + minutes + ":" +seconds;
        return date.getFullYear() + "-" + month + "-" + currentDate;
    }
    return "";
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

/*数字转汉字*/
function convertToChinese(num) {
    var N = [
     "零", "一", "二", "三", "四", "五", "六", "七", "八", "九"
    ];
    var str = num.toString();
    var len = num.toString().length;
    var C_Num = [];
    for (let i = 0; i < len; i++) {
        C_Num.push(N[str.charAt(i)]);
    }
    return C_Num.join('');
}

