var KEY = { SHIFT: 16, CTRL: 17, ALT: 18, DOWN: 40, RIGHT: 39, UP: 38, LEFT: 37 };
var selectIndexs = { firstSelectRowIndex: 0, lastSelectRowIndex: 0 };
var inputFlags = { isShiftDown: false, isCtrlDown: false, isAltDown: false };
var MAX_HEIGHT = 800;

var style_reced = '';
var style_payed = '';
var style_unreced = '';
var style_unpayed = '';

$(document).ready(function () {
    //禁止退格键 作用于Firefox、Opera
    document.onkeypress = banBackSpace;
    //禁止退格键 作用于IE、Chrome
    document.onkeydown = banBackSpace;
});

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e) {
    //alert(event.keyCode)
    var ev = e || window.event;//获取event对象
    var obj = ev.target || ev.srcElement;//获取事件源
    var t = obj.type || obj.getAttribute('type');//获取事件源类型
    //获取作为判断条件的事件类型
    var vReadOnly = obj.readOnly;
    var vDisabled = obj.disabled;
    //处理undefined值情况
    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
    vDisabled = (vDisabled == undefined) ? true : vDisabled;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readOnly属性为true或disabled属性为true的，则退格键失效
    var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
    //判断
    if (flag2 || flag1)
        event.returnValue = false;//这里如果写 return false 无法实现效果
}
/**
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
 *
 * @param num1加数1 | num2加数2
 */
function numAdd(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
};



//datagrid 列宽度
function fixWidth(percent) {
    return document.body.clientWidth * percent; //这里你可以自己做调整  
}

var NewDate = function (str) { //解决new Date()IE10不支持参数
    //首先将日期分隔 ，获取到日期部分 和 时间部分
    var day = str.split(' ');
    //获取日期部分的年月日
    var days = day[0].split('-');
    //获取时间部分的 时分秒
    var mi = day[day.length - 1].split(':');
    //获取当前date类型日期
    var date = new Date();
    //给date赋值  年月日
    date.setUTCFullYear(days[0], days[1] - 1, days[2]);
    //给date赋值 时分秒  首先转换utc时区 ：+8
    date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
    return date;
};

//给string对象添加原型方法replaceAll()
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

//格式化pams
function parseParams(data) {
    try {
        var tempArr = [];
        for (var i in data) {
            var key = encodeURIComponent(i);
            var value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        var urlParamsStr = tempArr.join('&');
        return urlParamsStr;
    } catch (err) {
        return '';
    }
}


//绑定combobox
function bind_combobox(data, target, d_label, d_value, includeall) {
    var cmb_items = [];
    if (includeall) {
        cmb_items.push({ label: '全部', value: '' });
    }
    target.combobox({ valueField: 'value', textField: 'label' });
    if (data.length > 0) {
        $.each(data, function (i, row) { 
            var tmp = eval('row.' + d_label); 
            cmb_items.push({ label: tmp, value: eval('row.' + d_value) });
        });
    }
    target.combobox('loadData', cmb_items); 
}




//提示弹窗
function alert_msg(title, msg) {

    $.easyui.messager.show({ msg: msg, title: title, position: "center", timeout: 1000, showType: 'fade' });
}


function modal_dialog() {

    $.fn.extend({

        panelLayer: function (options) {

            var win_With = $(window).width();
            var win_Height = $(window).height();
            
            var $layer;
            var layer_index;
            var $o = $(this);
            var pLayer = {
                Flag: 'FLAG_PANEL_LAYER',
                Exist: function () {
                    var $panel = $o.parent();
                    if ($panel.hasClass(pLayer.Flag)) {
                        return true;
                    }
                    return false;
                },
                Init: function (options) {
                    if (pLayer.Exist()) {
                        return;
                    }
                    var $panel = $o.parent();
                    $o.panel({
                        title: options.title,
                        width: options.width-150,
                        height: win_Height - options.top-68,
                        left: win_With,
                        top: options.top,
                        closable: true,
                        cls: options.cls,
                        onBeforeOpen: function () {
                            $o.parent().css({
                                'position': 'absolute',
                                'opacity': 0.6,
                                'z-index': 10050,
                                'display': 'none'
                            });
                        },
                        onClose: function () {
                            pLayer.Hide(options);
                        }
                    });

                    if (options.shade) {
                        layer_index = layer.load(0, {
                            zIndex: 10000,
                            shade: [0.4, "#ccc"],
                            shadeClose: options.shadeClose,
                            time: 0,
                            success: function (layero, index) {
                                $layer = $(layero);
                                $layer.hide();
                            },
                            end: function () {
                                pLayer.Hide(options);
                            }
                        });
                    }
                },
                Show: function (options) {
                    if (pLayer.Exist()) {
                        return;
                    }
                    var $panel = $o.parent();
                    $panel.show().animate({
                        left: win_With - options.width,
                        opacity: 1,
                    }, 800, function () {
                        $panel.addClass(pLayer.Flag).show();
                        try {
                            var showCall = options.show;
                            if (showCall != null && typeof showCall == 'function') {
                                showCall();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    })
                },
                Hide: function (options) {
                    var $panel = $o.parent();
                    $panel.show().animate({
                        left: win_With,
                        opacity: 0.6,
                    }, 500, function () {
                        $panel.removeClass(pLayer.Flag).hide();
                        if ($layer != null) {
                            layer.close(layer_index);
                        }
                        try {
                            var hideCall = options.hide;
                            if (hideCall != null && typeof hideCall == 'function') {
                                hideCall();
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    })
                },
                ReSize: function (options) {
                    if (!pLayer.Exist()) {
                        return;
                    }
                    $o.panel('resize', {
                        width: options.width-150,
                        height: win_Height - options.top-68
                    });
                    $o.panel('move', {
                        left: win_With - options.width,
                        top: options.top
                    });
                }
            };

            var defaults = {
                title: '',
                width: 400,
                top: 8,
                cls: '',
                shade: true,
                shadeClose: true,
                show: null,
                hide: null
            };

            var opt = $.extend({}, defaults, options);

            if (options == "close") {
                pLayer.Hide(opt);
                layer.closeAll("loading");
                return;
            } else {
                pLayer.Init(opt);

                pLayer.Show(opt);

                $(window).on('resize', function () {
                    win_With = $(window).width();
                    win_Height = $(window).height();
                    pLayer.ReSize(opt);
                });
            }
        }
    })
}


//判断session
function session_out(data) { 
    if ( !!data.sessionerror) {
        $(location).attr('href', 'Default.aspx?rnd=' + Math.random());
        return true;
    }

    return false;
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

function dateformat(val, short_flag) {
    if (val != null) {
        if (val.indexOf('Date') > -1) {
            //取得时间戳部分 如：获取 /Date(1545299299910)/ 中的 1545299299910 部分
            var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
            //月份为0-11，所以+1，月份小于10时补个0
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var currentTime = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

            //格式化显示，形如：2018-12-20 17:48:19
            //return date.getFullYear() + "-" + month + "-" + currentDate + " " + currentTime + ":" + minutes;//+ ":" +seconds;
            return date.getFullYear() + "-" + month + "-" + currentDate;
        } else {
            val = val.replace('T', ' ').replace('Z', ' ');
            if (short_flag) {
                return val.substr(0, 10);
            } else {
                return val.substr(0, 16);
            }

        }
    }
    return "";
}

function myformatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
function myparser(s) {
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
}



function DateDiff(sDate1, sDate2) {  //sDate1和sDate2是yyyy-MM-dd格式

    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为yyyy-MM-dd格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数

    return iDays;  //返回相差天数
}

//替换所有的回车换行
function TransferString(content) {
    var string = content;
    try {
        string = string.replace(/\r\n/g, ',')
        string = string.replace(/\n/g, ',');
        var arr = string.split(',');
        var newstr = '';
        $.each(arr, function (index, j) {
            if ($.trim(j) == undefined || $.trim(j).length == 0) {

            } else {
                if (newstr.length == 0) {
                    newstr = $.trim(j);
                } else {
                    newstr = newstr + ',' + $.trim(j);
                }
            }
        });
    } catch (e) {
        alert(e.message);
    }
    return newstr;
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

//判断combobox文本和值发生改变
function filterCombo(q, row) {
    q = q.toUpperCase();
    var opts = $(this).combobox('options');
    //q.toUpperCase()
    if (row[opts.textField].indexOf(q) > -1) {
        return true;
    } else {
        return false;
    }
}
function table_compute(table_name, colName) {
    var rows = $('#' + table_name).datagrid('getRows');
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
        total += parseFloat(rows[i][colName] ? rows[i][colName] : 0);
    }

    return total.toFixed(2);
}
//通用post方法 
function post(url, par, fun, progress) {
    if (progress) {
        $.messager.progress({
            title: '请稍后',
            msg: '正在拼命加载中...'
        });
    } 
    $.post(url, par, function (data) {
        if (progress) {
            $.messager.progress('close');
        }
        if (!session_out(data)) {
            fun(data);
        }
    }, 'json'); 
}

//在页面上实现按住shift多选  
function custom_keypress(event) {//响应键盘按下事件 
    var e = event || window.event;
    var code = e.keyCode | e.which | e.charCode;
    switch (code) {
        case KEY.SHIFT:

            inputFlags.isShiftDown = true;

            $($('body')[0]).unbind('contextmenu').bind('contextmenu', function () { return false; });
            $($('body')[0]).unbind('selectstart').bind('selectstart', function () { return false; });

            //$('#tab_pre_ship_cntr_addtemplate').datagrid('options').singleSelect = false;
            break;
            //case KEY.CTRL:
            //    inputFlags.isCtrlDown = true;
            //    $('#tab_pre_ship_cntr_addtemplate').datagrid('options').singleSelect = false;
            //    break;
        default:
    }
}

function custom_keyrelease(event) { //响应键盘按键放开的事件

    var e = event || window.event;
    var code = e.keyCode | e.which | e.charCode;
    switch (code) {
        case KEY.SHIFT:

            inputFlags.isShiftDown = false;
            selectIndexs.firstSelectRowIndex = 0;
            $($('body')[0]).unbind('contextmenu').bind('contextmenu', function () { return true; });
            $($('body')[0]).unbind('selectstart').bind('selectstart', function () { return true; });

            //$('#tab_pre_ship_cntr_addtemplate').datagrid('options').singleSelect = true;
            break;
        case 8:
            var d = e.srcElement || e.target;
            if (d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA') {
                e.preventDefault();
            } else {

            }
            break;
            //case KEY.CTRL:
            //    inputFlags.isCtrlDown = false;
            //    selectIndexs.firstSelectRowIndex = 0;
            //    $('#tab_pre_ship_cntr_addtemplate').datagrid('options').singleSelect = true;
            //    break;
        default:
    }
}

function custom_keyclickRow(target, rowIndex) {

    if (rowIndex != selectIndexs.firstSelectRowIndex && !inputFlags.isShiftDown) { 
        selectIndexs.firstSelectRowIndex = rowIndex; 
    }
    if (inputFlags.isShiftDown) {
        //target.datagrid('clearSelections');
        selectIndexs.lastSelectRowIndex = rowIndex;
        var tempIndex = 0;
        if (selectIndexs.firstSelectRowIndex >= selectIndexs.lastSelectRowIndex) {
            tempIndex = selectIndexs.firstSelectRowIndex;
            selectIndexs.firstSelectRowIndex = selectIndexs.lastSelectRowIndex;
            selectIndexs.lastSelectRowIndex = tempIndex;
        }
        for (var i = selectIndexs.firstSelectRowIndex ; i <= selectIndexs.lastSelectRowIndex ; i++) {
            target.datagrid('selectRow', i);
        }
    }
}


function table_bottom_group_desc(group_fee_desc, total, target_cls,rec_or_pay) { 
    var group_table_tr = $('.' + target_cls + ' tbody tr').eq(0);
    if (group_fee_desc != undefined && group_fee_desc.length > 0) {
         
        var arr_gfd =  group_fee_desc.split(';'); 
        $.each(arr_gfd, function (i, is) {
            if (is == undefined) is = ''; 
            arr_gfd[i] = (is.length > 0 ? is.substr(0, is.length - 1) : '');
        });
        var all_gd = '';
        if (rec_or_pay == 0) { 
            all_gd = '<td class="cls_total_title">总行数:</td><td class="cls_total_value">' + total + '</td>' +
                '<td class="cls_rec_title">应收:</td><td class="cls_rec_value">' + arr_gfd[0] + '</td>' +
                '<td class="cls_rec_title">实收:</td><td class="cls_rec_value">' + arr_gfd[1] + '</td>' +
                '<td class="cls_rec_title">未收:</td><td class="cls_rec_value">' + arr_gfd[2] + '</td>' +
                '<td class="cls_pay_title">应付:</td><td class="cls_pay_value">' + arr_gfd[3] + '</td>' +
                '<td class="cls_pay_title">实付:</td><td class="cls_pay_value">' + arr_gfd[4] + '</td>' +
                '<td class="cls_pay_title">未付:</td><td class="cls_pay_value">' + arr_gfd[5] + '</td>' +
                '<td class="cls_profit_title">盈利:</td><td class="cls_profit_value">' + arr_gfd[6] + '</td>';
        }
        else {
            var temp = (rec_or_pay == 1 ? 'rec' : 'pay');
            var tmp2 = (rec_or_pay == 1 ? '收' : '付');
            all_gd = '<td class="cls_total_title">总行数:</td><td class="cls_total_value">' + total + '</td>' +
                        '<td class="cls_' + temp + '_title">应' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + arr_gfd[0] + '</td>' +
                       '<td class="cls_' + temp + '_title">实' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + arr_gfd[1] + '</td>' + 
                       '<td class="cls_' + temp + '_title">未' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + arr_gfd[2] + '</td>';

            if (arr_gfd.length > 3) {
                all_gd += '<td class="cls_' + temp + '_title">数量:</td><td class="cls_' + temp + '_value">' + arr_gfd[3] + '</td>';
            }
        }
   
        group_table_tr.html('').html(all_gd);
    }
     
}
//刷新 tab_fee_list 所在页面的 统计信息 
function table_bootom_selected_desc(target_tab, target_cls, rec_or_pay) {
    var rows = target_tab.datagrid('getChecked');

    var count = rows.length;
    var panel_title = $('.' + target_cls + ' tbody tr').eq(0);

    var cur_fee_group2 = {
        total_amount_desc: '',
        woa_total_amount_desc: '',
        unwoa_total_amount_desc: ''
    };
    var cur_fee_group = {
        total_amount_desc: [],
        woa_total_amount_desc: [],
        unwoa_total_amount_desc: []
    };

    var cur_total_fee_number = 0;
    var has_fee_number = false;
    if (rows.length > 0) { 
        $.each(rows, function (i, row) {

            if (row.total_amount_desc != undefined && row.total_amount_desc.length > 0) {
                //1. 按逗号拆 
                var t_arr1 = row.total_amount_desc.split(','); 
                $.each(t_arr1, function (gh, ta) {
                    //2. 按 : 拆 
                    var t_symbol = ta.substr(0, 1);
                    var t_amount = ta.substr(1, ta.length);
                    var has = false;
                    $.each(cur_fee_group.total_amount_desc, function (p, pa) {
                        if (pa.symbol == t_symbol) {
                            pa.amount += parseFloat(t_amount);
                            has = true;
                        }
                    });
                    if (!has) {
                        cur_fee_group.total_amount_desc.push({
                            symbol: t_symbol,
                            amount: parseFloat(t_amount)
                        });
                    }
                });
            }

            if (row.woa_total_amount_desc != undefined && row.woa_total_amount_desc.length > 0) {
                //1. 按逗号拆 
                var t_arr1 = row.woa_total_amount_desc.split(',');

                $.each(t_arr1, function (gh, ta) {
                    //2. 按 : 拆 
                    var t_symbol = ta.substr(0, 1);
                    var t_amount = ta.substr(1, ta.length);
                    var has = false;
                    $.each(cur_fee_group.woa_total_amount_desc, function (p, pa) {
                        if (pa.symbol == t_symbol) {
                            pa.amount += parseFloat(t_amount);
                            has = true;
                        }
                    });
                    if (!has) {
                        cur_fee_group.woa_total_amount_desc.push({
                            symbol: t_symbol,
                            amount: parseFloat(t_amount)
                        });
                    }
                });
            }

            if (row.unwoa_total_amount_desc != undefined && row.unwoa_total_amount_desc.length > 0) {
                //1. 按逗号拆 
                var t_arr1 = row.unwoa_total_amount_desc.split(',');

                $.each(t_arr1, function (gh, ta) {
                    //2. 按 : 拆 
                    var t_symbol = ta.substr(0, 1);
                    var t_amount = ta.substr(1, ta.length);
                    var has = false;
                    $.each(cur_fee_group.unwoa_total_amount_desc, function (p, pa) {
                        if (pa.symbol == t_symbol) {
                            pa.amount += parseFloat(t_amount);
                            has = true;
                        }
                    });
                    if (!has) {
                        cur_fee_group.unwoa_total_amount_desc.push({
                            symbol: t_symbol,
                            amount: parseFloat(t_amount)
                        });
                    }
                });
            }

            //数量
            if (!!row.fee_number) {
                has_fee_number = true;
                cur_total_fee_number += parseFloat(!row.fee_number ? 0 : row.fee_number);
            }
        });

       
        //币种和金额 
        $.each(cur_fee_group.total_amount_desc, function (i, item) {
            if (cur_fee_group2.total_amount_desc.length == 0) {
                cur_fee_group2.total_amount_desc = item.symbol +  item.amount.toFixed(2);
            } else {
                cur_fee_group2.total_amount_desc += ',' + item.symbol +  item.amount.toFixed(2);
            }
        });
        $.each(cur_fee_group.woa_total_amount_desc, function (i, item) {
            if (cur_fee_group2.woa_total_amount_desc.length == 0) {
                cur_fee_group2.woa_total_amount_desc = item.symbol +  item.amount.toFixed(2);
            } else {
                cur_fee_group2.woa_total_amount_desc += ',' + item.symbol +  item.amount.toFixed(2);
            }
        });
        $.each(cur_fee_group.unwoa_total_amount_desc, function (i, item) {
            if (cur_fee_group2.unwoa_total_amount_desc.length == 0) {
                cur_fee_group2.unwoa_total_amount_desc = item.symbol +  item.amount.toFixed(2);
            } else {
                cur_fee_group2.unwoa_total_amount_desc += ',' + item.symbol +  item.amount.toFixed(2);
            }
        }); 

    }  
    var temp = (rec_or_pay == 1 ? 'rec' : 'pay');
    var tmp2 = (rec_or_pay == 1 ? '收' : '付');
    var all_gd = '<td class="cls_total_title">当前选择:</td><td class="cls_total_value">' + count + '</td>' +
                '<td class="cls_' + temp + '_title">应' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + cur_fee_group2.total_amount_desc + '</td>' +
                '<td class="cls_' + temp + '_title">实' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + cur_fee_group2.woa_total_amount_desc + '</td>' +
                '<td class="cls_' + temp + '_title">未' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + cur_fee_group2.unwoa_total_amount_desc + '</td>';
    if (has_fee_number) {
        all_gd += '<td class="cls_' + temp + '_title">数量:</td><td class="cls_' + temp + '_value">' + cur_total_fee_number.toFixed(2) + '</td>';
    }
    panel_title.html('').html(all_gd);
}
function table_bootom_selected_desc_have_symbol(target_tab,target_cls,rec_or_pay) {
    var rows = target_tab.datagrid('getChecked');

    var count = rows.length;

    var data_group = {
        fee_number: '',
        fee_amount: '',
        woa_total_amount: '',
        unwoa_total_amount: ''
    };
    var cur_total_fee_number = 0;

    var has_fee_number = false;

    var panel_title = $('.' + target_cls  + ' tbody tr').eq(0);
    if (rows.length > 0) { 
        //币种和金额  
        var data_cr_symbol_of_fee_amount = [];
        var data_cr_symbol_of_woa_total_amount = [];
        var data_cr_symbol_of_unwoa_total_amount = [];
        $.each(rows, function (i, item) {
            //数量
            if (!!item.fee_number) {
                has_fee_number = true;
                cur_total_fee_number += parseFloat(!item.fee_number ? 0 : item.fee_number);
            }
            var has_cr_fa = false;

            $.each(data_cr_symbol_of_fee_amount, function (fai, faitem) {
                if (faitem.fee_currency_symbol == item.fee_currency_symbol) {
                    faitem.amount += parseFloat(item.fee_amount);
                    has_cr_fa = true;
                }
            });
            if (!has_cr_fa) {
                data_cr_symbol_of_fee_amount.push({
                    fee_currency_symbol: item.fee_currency_symbol,
                    amount: parseFloat(item.fee_amount)
                });
            }
            var has_cr_wta = false;

            $.each(data_cr_symbol_of_woa_total_amount, function (wtai, wtaitem) {
                if (wtaitem.fee_currency_symbol == item.fee_currency_symbol) {
                    wtaitem.amount += parseFloat(item.woa_total_amount);
                    has_cr_wta = true;
                }
            });
            if (!has_cr_wta) {
                data_cr_symbol_of_woa_total_amount.push({
                    fee_currency_symbol: item.fee_currency_symbol,
                    amount: parseFloat(item.woa_total_amount)
                });
            }

            var has_cr_unwta = false;

            $.each(data_cr_symbol_of_unwoa_total_amount, function (wtai, uwtaitem) {
                if (uwtaitem.fee_currency_symbol == item.fee_currency_symbol) {
                    uwtaitem.amount += parseFloat(item.unwoa_total_amount);
                    has_cr_unwta = true;
                }
            });
            if (!has_cr_unwta) {
                data_cr_symbol_of_unwoa_total_amount.push({
                    fee_currency_symbol: item.fee_currency_symbol,
                    amount: parseFloat(item.unwoa_total_amount)
                });
            }


            data_group.fee_number += parseFloat(item.fee_number);
        });
        var str_cr_symbol_of_fee_amount = '';

        $.each(data_cr_symbol_of_fee_amount, function (i, item) {
            if (str_cr_symbol_of_fee_amount.length == 0) {
                str_cr_symbol_of_fee_amount = item.fee_currency_symbol +  item.amount.toFixed(2);
            } else {
                str_cr_symbol_of_fee_amount += ',' + item.fee_currency_symbol +  item.amount.toFixed(2);
            }
        });

        var str_cr_symbol_of_woa_total_amount = '';
        $.each(data_cr_symbol_of_woa_total_amount, function (i, item) {
            if (str_cr_symbol_of_woa_total_amount.length == 0) {
                str_cr_symbol_of_woa_total_amount = item.fee_currency_symbol + item.amount.toFixed(2);
            } else {
                str_cr_symbol_of_woa_total_amount += ',' + item.fee_currency_symbol + item.amount.toFixed(2);
            }
        });
        var str_cr_symbol_of_unwoa_total_amount = '';
        $.each(data_cr_symbol_of_unwoa_total_amount, function (i, item) {
            if (str_cr_symbol_of_unwoa_total_amount.length == 0) {
                str_cr_symbol_of_unwoa_total_amount = item.fee_currency_symbol + item.amount.toFixed(2);
            } else {
                str_cr_symbol_of_unwoa_total_amount += ',' + item.fee_currency_symbol +  item.amount.toFixed(2);
            }
        });

        data_group.fee_amount = str_cr_symbol_of_fee_amount
        data_group.woa_total_amount = str_cr_symbol_of_woa_total_amount;
        data_group.unwoa_total_amount = str_cr_symbol_of_unwoa_total_amount;
         
    }
    var temp = (rec_or_pay == 1 ? 'rec' : 'pay');
    var tmp2 = (rec_or_pay == 1 ? '收' : '付'); 
    var all_gd = '<td class="cls_total_title">当前选择:</td><td class="cls_total_value">' + count + '</td>' +
                '<td class="cls_' + temp + '_title">应' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + data_group.fee_amount + '</td>' +
                '<td class="cls_' + temp + '_title">实' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + data_group.woa_total_amount + '</td>' +
                '<td class="cls_' + temp + '_title">未' + tmp2 + ':</td><td class="cls_' + temp + '_value">' + data_group.unwoa_total_amount + '</td>';
    if (has_fee_number) {
        all_gd += '<td class="cls_' + temp + '_title">数量:</td><td class="cls_' + temp + '_value">' + cur_total_fee_number.toFixed(2) + '</td>';
    }
   
    panel_title.html('').html(all_gd);
}

$.extend($.fn.datagrid.defaults.editors,{

    combogrid: {
        init: function(container,options){
            var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
            input.combogrid(options); 
            return input; 
        },

        destroy: function(target){ 
            $(target).combogrid('destroy'); 
        },

        getValue: function(target){ 
            return $(target).combogrid('getValue'); 
        }, 
        setValue: function(target,value){ 
            $(target).combogrid('setValue', value); 
        }, 
        resize: function(target,width){ 
            $(target).combogrid('resize',width); 
        }, 
    } 
});

 

function numFormat(num) {
    var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return c;
}
 

 
function bind_combobox_tools_desc($target) {
    $target.combogrid({
        multiple: true,
        panelWidth: 360,
        idField: '',
        textField: 'od_route_tools_desc',
        data: [],
        multiple: true,
        //url: '../Ashx/sys_base.ashx',
        //queryParams: {
        //    rnd: Math.random(),
        //    action: 'get_tools_desc_for_combox',
        //    like_str: guid()
        //},
        pagination: true,//是否分页  
        rownumbers: true,//序号  
        collapsible: false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: true,
        pageNumber: 1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20, 40],//可以设置每页记录条数的列表 
        method: 'post',
        columns: [[
                { field: '_ck', checkbox: true },
                { field: 'od_route_tools_desc', title: '工具名', width: 290 },

        ]],
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_tools_desc_for_combox';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);

            },
        },
        onSelect: function (index, item) {              //选中处理   

            $target.combogrid('setText', item.od_route_tools_desc);
        }
    });

    $target.combogrid('grid').datagrid('options').url = '../Ashx/sys_base.ashx';
    $target.combogrid('grid').datagrid('options').queryParams = {
            rnd: Math.random(),
            action: 'get_tools_desc_for_combox',
            like_str: guid()
        };
}
function bind_combogrid_custom($target) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'cu_name',
        data: [],
        multiple: false,
        url: '../Ashx/sys_base.ashx',
        //queryParams: {
        //    rnd: Math.random(),
        //    action: 'get_custom_by_like_str_for_combogrid',
        //    like_str: guid()
        //},
        pagination: true,//是否分页  
        rownumbers: true,//序号  
        collapsible: false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: false,
        pageNumber: 1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20, 40],//可以设置每页记录条数的列表  
        method: 'post',
        columns: [[
                { field: 'cu_name', title: '公司名', width: 330 },
                { field: 'cu_code', title: '代码', width: 110 },
        ]],
        onLoadSuccess: function (data) {
            

        },
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_custom_by_like_str_for_combogrid';
                
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('cu_id', '');
            },
        },
        onSelect: function (index, item) {              //选中处理   
            $target.data('cu_id', item.cu_id);
            $target.combogrid('setText', item.cu_name);
        }
    });

    
    $target.combogrid('grid').datagrid('options').queryParams = {
        rnd: Math.random(),
        action: 'get_custom_by_like_str_for_combogrid',
        like_str: guid()
    };
}
function bind_combogrid_invoice($target) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'oi_no',
        data: [],
        multiple: true,
        //url: '../Ashx/checkaccount.ashx',
        //queryParams: {
        //    rnd: Math.random(),
        //    action: 'get_order_invoice_by_like_str_for_combogrid',
        //    oi_cu_id: '',
        //    like_str: guid()
        //},
        pagination: true,//是否分页  
        rownumbers: true,//序号  
        collapsible: false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: false,
        pageNumber: 1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20, 40],//可以设置每页记录条数的列表  
        method: 'post',
        columns: [[
                { field: 'ck', checkbox: true },
                { field: 'oi_no', title: '发票号', width: 230 },
                { field: 'oi_total_money', title: '总金额', width: 110 },
                { field: 'oi_invoice_typ_desc', title: '税点', width: 210 },
                { field: 'oi_cu_desc', title: '结算单位', width: 210 },
                { field: 'oi_bak', title: '备注', width: 210 },
        ]],
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.oi_cu_id = '';
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_order_invoice_by_like_str_for_combogrid';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('oi_seq', '');
            },
        },
        onSelect: function (index, item) {              //选中处理   
            $target.data('oi_seq', item.oi_seq);
            $target.combogrid('setText', item.oi_no);
        }
    });
    $target.combogrid('grid').datagrid('options').url = '../Ashx/checkaccount.ashx';
    $target.combogrid('grid').datagrid('options').queryParams = {
        rnd: Math.random(),
        action: 'get_order_invoice_by_like_str_for_combogrid',
        oi_cu_id: '',
        like_str: guid()
    };
    
}

function castnull(object) {
    if (object == undefined || object == null ) return '';
    return object.toString();
}

function bind_combogrid_place($target) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'pl_name',
        url: '../Ashx/sys_base.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_place_by_like_str_for_combogrid',
            like_str: guid()
        },
        pagination: true,//是否分页  
        rownumbers: true,//序号  
        collapsible: false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: false,
        pageNumber: 1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20, 40],//可以设置每页记录条数的列表  
        method: 'post',
        columns: [[
                { field: 'pl_typ_desc', title: '类型', width: 50 },
                { field: 'pl_code', title: '代码', width: 100 },
                { field: 'pl_name', title: '显示名', width: 200 },
                { field: 'pl_en_name', title: '备注名', width: 90 },
        ]],
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_place_by_like_str_for_combogrid';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('pl_id', '');
            },
        },
        onSelect: function (index, item) {              //选中处理   
            $target.data('pl_id', item.pl_id);
            $target.combogrid('setText', item.pl_name);
        }
    });
}
function bind_combogrid_product($target) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'pr_name',
        url: '../Ashx/sys_base.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_product_by_like_str_for_combogrid',
            like_str: guid()
        },
        pagination: true,//是否分页  
        rownumbers: true,//序号  
        collapsible: false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: false,
        pageNumber: 1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20, 40],//可以设置每页记录条数的列表  
        method: 'post',
        columns: [[
                { field: 'pr_name', title: '货物描述', width: 440 },
        ]],
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_product_by_like_str_for_combogrid';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('pr_id', '');
            },
        },
        onSelect: function (index, item) {              //选中处理   
            $target.data('pr_id', item.pr_id);
            $target.combogrid('setText', item.pr_name);
        }
    });
}
function bind_combogrid_port($target) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'p_desc',
        url: '../Ashx/sys_base.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_port_list_by_like_str_for_combogrid',
            like_str: guid()
        },
        pagination: true,//是否分页  
        rownumbers: true,//序号  
        collapsible: false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: false,
        pageNumber: 1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20, 40],//可以设置每页记录条数的列表  
        method: 'post',
        columns: [[
                { field: 'p_en_cod', title: '代码', width: 50 },
                { field: 'p_desc', title: '码头', width: 100 },
                { field: 'area_desc', title: '区域', width: 80 }, 
        ]],
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_port_list_by_like_str_for_combogrid';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('p_id', '');
            },
        },
        onSelect: function (index, item) {              //选中处理   
            $target.data('p_id', item.p_id);
            $target.combogrid('setText', item.p_desc);
        }
    });
}
function bind_combogrid_ship($target,fun) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'ship_desc',
        url: '../Ashx/sys_base.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_ship_list_by_like_str_for_combogrid',
            like_str: guid()
        },
        pagination: true,//是否分页  
        rownumbers: true,//序号  
        collapsible: false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: false,
        pageNumber: 1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20, 40],//可以设置每页记录条数的列表  
        method: 'post',
        columns: [[ 
                { field: 'ship_en_cod', title: '代码', width: 100 },
                { field: 'ship_desc', title: '船名', width: 200 },
                { field: 'cu_desc', title: '船东', width: 90 },
        ]],
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') { 
                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_ship_list_by_like_str_for_combogrid';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('ship_id', '');
            },
        },
        onSelect: function (index, item) {
            $target.data('ship_id', item.ship_id);
            $target.combogrid('setText', item.ship_desc);

            if (fun != undefined)  { 
                fun(item.ship_en_cod,item.ship_cu_id ,item.cu_desc);
            } 
        }
    });
}
function bind_combogrid_custom_by_company_id($target,$company_combox) {
    $target.combogrid({
        panelWidth: 500,
        idField: '',
        textField: 'cu_name',
        data: [],
        multiple: false,
        //url: '../Ashx/sys_base.ashx',
        //queryParams: {
        //    rnd: Math.random(),
        //    action: 'get_custom_by_like_str_for_combogrid',
        //    like_str: guid()
        //},
        pagination: true,//是否分页  
        rownumbers: true,//序号  
        collapsible: false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: false,
        pageNumber: 1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20, 40],//可以设置每页记录条数的列表  
        method: 'post',
        columns: [[
                { field: 'cu_name', title: '公司名', width: 330 },
                { field: 'cu_code', title: '代码', width: 110 },
        ]],
        keyHandler: {
            up: function () {               //【向上键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $target.combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $target.combogrid('grid').datagrid('getRows');
                        $target.combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                }
            },
            down: function () {             //【向下键】押下处理  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $target.combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $target.combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $target.combogrid('grid').datagrid('getData').rows.length - 1) {
                            $target.combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $target.combogrid('grid').datagrid('selectRow', 0);
                    }
                }
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $target.combogrid('panel').parent().css('display');
                if (display != 'none') {

                    //选中后让下拉表格消失  
                    $target.combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $target.combogrid("grid").datagrid('options').queryParams;
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.c_id = $company_combox.combobox('getValue');
                if (isNaN(queryParams.c_id) || queryParams.c_id == '') {

                    $.messager.alert('错误', '请先选择所属公司!', 'error', function () {
                        $target.combogrid("setText", '');
                        $target.data('cu_id', '');
                    });
                    return;
                }
                queryParams.action = 'get_custom_by_like_str_for_combogrid_by_company_id';
                $target.combogrid("grid").datagrid('options').queryParams = queryParams;
                $target.combogrid("grid").datagrid("clearSelections");
                $target.combogrid("grid").datagrid("reload");
                //重新加载  
                $target.combogrid("setText", keyword);
                $target.data('cu_id', '');
            },
        },
        onSelect: function (index, item) {              //选中处理   
            $target.data('cu_id', item.cu_id);
            $target.combogrid('setText', item.cu_name);
        }
    });

    $target.combogrid('grid').datagrid('options').url = '../Ashx/sys_base.ashx';
    $target.combogrid('grid').datagrid('options').queryParams = {
        rnd: Math.random(),
        action: 'get_custom_by_like_str_for_combogrid_by_company_id',
        like_str: guid(),
        c_id:$company_combox.combobox('getValue')
    };
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return decodeURI(pair[1]); }
    }
    return (false);
}

(function ($) {
    //1.定义扩展方法 
    $.fn.columns_fliters = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.columns_fliters.methods[options](this, param);
        }
        options = $.extend({}, $.fn.columns_fliters.defaults, options || {});
        var target = $(this);

        var cur_guid = 'cls_' + guid();
        //原表格所有数据 
        var target_tab_data = options.target_tab_data;
        //目标控件 0
        var tag_tab = options.tag_tab;
        //筛选 集合数组 
        var cur_columns_fliter_arr = [];
        //当前列 
        var cur_column_field = '';
        //当前列的筛选条件集合 
        var cur_column_fliter_arr = [];
        var cur_fliter_panel_of_table = undefined;
        var cur_fliter_panel_of_search_box = undefined;
        var cur_fliter_panel_of_clear_btn = undefined;
        var cur_fliter_panel_of_search_btn = undefined;

        var cur_cls_undo_click = '';
        var cur_cls_target_body = options.cur_cls_target_body;
        var cur_width = 440;
        var cur_height = 250;
        var cur_parent = undefined;
        if (!options.cur_parent) {
            cur_parent = $('body');
        } else {
            cur_parent = options.cur_parent;
        }


        //一般情况下，会传递过来 
        /*
            data, //绑定表格数据
            table, //绑定表格  
            cls_target_body,
            parent
        */
        target.create = function () { 
            target.removeClass();
            target.addClass(cur_guid + ' mulit_panel_part');
            target.css({
                'width': cur_width + 'px',
                'height': cur_height + 'px',
                'border': 'solid 4px #e4efff',
                'box-shadow': '6px 6px 4px #c5c5c5',
                'position': 'absolute',
                'left': '0px',
                'top': '0px',
                'display': 'none',
                'background-color': '#FFF',
                'z-index':'auto'
            });

            var tab_column_fliter_tab_part = $('<div class="mulit_panel_part ' + cur_guid + '_tab_part custom_bg" style=" height:' + (cur_height - 28) + 'px;overflow:hidden;"><table class="' + cur_guid + '_table"></table></div>');

            var tab_column_fliter_bottom_part = $('<div class="mulit_panel_part ' + cur_guid + '_bottom_part custom_bg"   style=" height:28px;overflow:hidden;">' +
                '<table class="mulit_panel_part" >' +
                        '<tr>' +
                            '<td>' +
                                '<input  class="easyui-textbox ' + cur_guid + '_search_box   mulit_panel_part" style="width:200px;" oninput="javascript:void(0);" placeholder="筛选" />' +
                            '</td>' +
                            '<td style="text-align:right;padding-right:16px;">' +
                                '<a href="javascript:void(0);" class="' + cur_guid + '_linkbutton_apply mulit_panel_part" >应用</a>' +
                                '<a href="javascript:void(0);" class="' + cur_guid + '_linkbutton_clear mulit_panel_part" data-options="plain:true,iconCls:\'icon-empty\'">清空条件</a>' +
                            '</td>' +
                        '</tr>' +
                    '</table></div>');

            target.append(tab_column_fliter_tab_part);
            target.append(tab_column_fliter_bottom_part);
            //target.options.cur_fliter_panel = $('.' + target.cur_guid).eq(0);
            cur_fliter_panel_of_table = $(target.find('.' + cur_guid + '_table')[0]);
            cur_fliter_panel_of_clear_btn = $(target.find('.' + cur_guid + '_linkbutton_clear')[0]);
            cur_fliter_panel_of_search_btn = $(target.find('.' + cur_guid + '_linkbutton_apply')[0]);
            cur_fliter_panel_of_search_box = $(target.find('.' + cur_guid + '_search_box')[0]);


            cur_fliter_panel_of_clear_btn.linkbutton({
                plain: true, iconCls: 'icon-empty',
            });
            //清空筛选 
            cur_fliter_panel_of_clear_btn.bind('click', function () {

                cur_fliter_panel_of_search_box.val('');

                $.each(cur_column_fliter_arr, function (i, item) {
                    item.selected = 1;
                });
                cur_fliter_panel_of_table.datagrid('loadData', cur_column_fliter_arr);

                //刷新列表值 
                target.refresh_target_tab();
            });
            //筛选 应用
            cur_fliter_panel_of_search_btn.linkbutton({
                plain: true, iconCls: 'icon-search',
            });
            //点击 实施筛选应用 
            cur_fliter_panel_of_search_btn.bind('click', function () {

                target.hide_panel( );
                target.refresh_target_tab();

            });


            cur_fliter_panel_of_search_box.bind('input', function (e) {
                //得到筛选值
                var _txt = cur_fliter_panel_of_search_box.val();
                //从当前绑定数组中找到合适的值，然后绑定 
                var fliter_op = [];
                $.each(cur_column_fliter_arr, function (i, item) {
                    if (item.value.indexOf(_txt) > -1) {
                        item.selected = 1;
                        fliter_op.push(item);
                    } else {
                        item.selected = 0;
                    }
                });
                cur_fliter_panel_of_table.datagrid('loadData', fliter_op);
            });

            target.unbind('mousedown').bind('mousedown', function (e) {
                e.stopPropagation();
            });

            
            /*
                如果这样做，会导致，这个表格进行第二次 loadSuccess
            */
            //tag_tab.datagrid({
            //    onClickCell: function (rowIndex, field, value) {
            //        _this.hide_panel();
            //    },
            //})
            cur_fliter_panel_of_table.datagrid({
                showHeader: true,
                data: [],
                singleSelect: false,
                remoteSort: false, //定义从服务器对数据进行排序。
                pagination: false, //在DataGrid控件底部显示分页工具栏。
                loadMsg: '数据正在加载，请耐心等待...',
                border: false,
                rownumbers: true,
                nowrap: false,
                striped: false,
                collapsible: false,
                fit: true,
                fitColumns: false,
                emptyMsg: '无数值',
                selectOnCheck: true,
                checkOnSelect: true,//显示的列 
                frozenColumns: [[
                    { title: '', field: 'selected', width: 40, checkbox: true }

                ]],
                columns: [[
                    {
                        field: 'text', title: '筛选数值', sortable: true, width: 360
                    }
                ]],
                onLoadSuccess: function (data) {
                    if (data) {
                        $.each(data.rows, function (i, item) {
                            if (item.selected == 1) {
                                cur_fliter_panel_of_table.datagrid('checkRow', i);
                            }
                        });
                    }
                },
            });
        }
        //初始化 目标表格 
        target.init_tag_tab = function () {
            //tag_tab.datagrid({
            //    onClickCell: function (rowIndex, field, value) {
            //        target.hide_panel();
            //    },
            //})
            var col_rowcount = tag_tab.datagrid('options').columns.length;
            var columns = tag_tab.datagrid('options').columns[col_rowcount - 1];
            for (var i = 0; i < columns.length; i++) {
                var filter = $('<span class="datagrid-filter-icon" data-key="' + columns[i].field + '">&nbsp</span>');
                filter.unbind('mousedown').bind('mousedown', function (e) {

                    e.stopPropagation();
                });
                filter.unbind('click').bind('click', function (e) {
                    cur_fliter_panel_of_search_box.val('');
                    //位置调整 
                    var left = $(e.target).parent().parent().offset().left;
                    var top = $(e.target).parent().parent().offset().top + $(e.target).parent().parent().height();

                    //var left = $(e.target).position().left;
                    //var top = $(e.target).position().top + $(e.target).height();


                    var body_width = cur_parent.width();

                    if (left + cur_width > body_width) {
                        left = body_width - cur_width;
                    }
                    var arr = [];
                    for (var oi in cur_columns_fliter_arr) {
                        if (cur_columns_fliter_arr[oi].key == $(e.target).data('key')) {
                            var data_arr = $.extend(true, [], cur_columns_fliter_arr[oi].op);
                            target.show_panel(left, top);
                            cur_fliter_panel_of_table
                                .datagrid({ fit: true })
                                .datagrid('loadData', { total: data_arr.length, rows: data_arr });
                            cur_column_field = $(e.target).data('key');
                            cur_column_fliter_arr = data_arr;
                        }
                    }



                     e.stopPropagation();
                });
                if ($('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + columns[i].field + '"]>div.datagrid-cell span.datagrid-filter-icon').length == 0) {
                    $('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + columns[i].field + '"]>div.datagrid-cell').prepend(filter);
                }
            }
        }
        target.show_panel = function (left, top) {
            var z_index = 'auto';

            var pas = $('.' + cur_cls_target_body).eq(0).parents();

            if (!pas || pas.length == 0) {

            } else {
                $.each(pas, function (i, p) {
                    z_index = $(p).css('z-index');
                    if (z_index != 'auto' && Number(z_index) != 0) {
                        z_index = Number(z_index) + 1;
                        return false;
                    }
                })
            }
             
            //要先显示，然后位置进行偏移，在hide状态下，偏移没有作用。
            target.css({
                'z-index':z_index
            }).show().offset({
                left: left,
                top: top,
            });

            $('body').unbind('mousedown').bind('mousedown', function (e) {
                target.hide_panel();
            });
        }
        target.hide_panel = function hide_panel() {
            target.hide();
        }

        //清空
        target.clear_search_condition = function () { 
            cur_column_field = undefined;
            target.refresh_target_tab();
        }
        target.get_target_data = function () {
            return target_tab_data;
        }

        target.get_columns_fliter_arr_by_field = function (filed) {
            var arr = [];
            for (var oi in cur_columns_fliter_arr) {
                if (cur_columns_fliter_arr[oi].key == filed) {
                    arr = $.extend(true, [], cur_columns_fliter_arr[oi].op); 
                }
            }
            return arr;
        }

        //初始化 筛选数组组合
        target.init_columns_fliter_arr = function () {
            //进行述职匹配 
            if (target_tab_data.length == 0) {
                return;
            }

            if (cur_columns_fliter_arr == undefined) {
                cur_columns_fliter_arr = [];
                for (var key in target_tab_data[0]) {
                    cur_columns_fliter_arr.push({
                        key: key,
                        op: []
                    });
                }
            } else if (cur_columns_fliter_arr.length == 0) {
                for (var key in target_tab_data[0]) {
                    cur_columns_fliter_arr.push({
                        key: key,
                        op: []
                    });
                }
            } else {
                for (var i in cur_columns_fliter_arr) {
                    for (var j in cur_columns_fliter_arr[i].op) {
                        cur_columns_fliter_arr[i].op[j].exists = 0;
                    }
                }
            }


            for (var item in target_tab_data) {
                for (var op in cur_columns_fliter_arr) {
                    //空值不能屏蔽 
                    var v = target_tab_data[item][cur_columns_fliter_arr[op].key]
                    if (v == undefined || v.length == 0) {
                        v = '';
                    }
                    var newOp = {
                        value: v,
                        text: v,
                        selected: 1,
                        exists: 1,
                    };
                    //没有的就新增
                    //如果是删除了，怎么办 ?
                    var has = false;
                    for (var oop in cur_columns_fliter_arr[op].op) {
                        if (cur_columns_fliter_arr[op].op[oop].value == newOp.value) {
                            has = true;
                            cur_columns_fliter_arr[op].op[oop].exists = 1;
                            break;
                        }
                    }
                    if (!has) {
                        cur_columns_fliter_arr[op].op.push(newOp);
                    }
                }
            }

            for (var i in cur_columns_fliter_arr) {
                var n_op = [];
                var t_op = cur_columns_fliter_arr[i].op;
                for (var j in t_op) {
                    if (t_op[j].exists == 1) {
                        n_op.push(t_op[j]);
                    }
                }
                cur_columns_fliter_arr[i].op = n_op;
            }

            for (var i in cur_columns_fliter_arr) {
                cur_columns_fliter_arr[i].op = cur_columns_fliter_arr[i].op.sort(function (a, b) {
                    if (isNaN(a.value)) {
                        var len1 = a.value.length;
                        var len2 = b.value.length;
                        var min = len1 > len2 ? len2 : len1;

                        for (var j = 0; j < min; j++) {
                            var t1 = a.value.charCodeAt(j);
                            var t2 = b.value.charCodeAt(j);
                            if (t1 == t2) continue;
                            else return t1 - t2;
                        }
                        return 0;
                    } else {
                        return Number(a.value) - Number(b.value);
                    }

                });
            }
        }
        //刷新 目标表格数据 
        target.refresh_target_tab = function () {
            $.messager.progress({
                title: '请稍后',
                msg: '努力加载中...'
            });
            var now_op = [];
            //如果当前又选中列 
            //废话，当然后选中列 

            if (cur_column_field != undefined && cur_column_field.length > 0) {

                $.each(cur_columns_fliter_arr, function (i, item) {
                    if (item.key == cur_column_field) {
                        now_op = item.op;
                    }
                });

                //当前 选中的值 
                var select_rows = cur_fliter_panel_of_table.datagrid('getChecked');
                //判断是否存在没有选择的 ,且将 新数组对应的选中值 selected值赋值为 1 
                var exists_unselected = false;
                $.each(now_op, function (i, item) {
                    var has = false;
                    $.each(select_rows, function (s, sitem) {
                        if (item.value == sitem.value) {
                            has = true;
                            return;
                        }
                    });
                    if (has) {
                        item.selected = 1;
                    } else {
                        item.selected = 0;
                        exists_unselected = true;
                    }
                });
                //如果存在 selected = 0 ;需要将 选择符号变颜色 
                if (exists_unselected) {
                    $('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + cur_column_field + '"]>div.datagrid-cell span').eq(1).css({ color: 'red' });
                } else {
                    $('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + cur_column_field + '"]>div.datagrid-cell span').eq(1).css({ color: '#000' });
                }
                var query_row = [];

                $.each(target_tab_data, function (i, row) {
                    var bRight = true;
                    $.each(cur_columns_fliter_arr, function (j, orow) {
                        //取出 每一行的 每一列值 
                        var v1 = row[orow.key];
                        if (v1 == undefined) v1 = '';
                        //判断一下再比较 
                        if (orow.op != undefined && orow.op.length > 0) {
                            var has = false;
                            $.each(orow.op, function (n, nsrow) {
                                if (nsrow.value == v1 && nsrow.selected == 1) {
                                    has = true;
                                    return;
                                }
                            });

                            if (!has) {
                                //上一步没有， 
                                bRight = false;
                            }
                        }

                        if (!bRight) return;
                    });

                    if (bRight) {
                        query_row.push(row);
                    }
                });
                //tag_tab.datagrid({ 
                //    onClickCell: function (rowIndex, field, value) {
                //        target.hide_panel();
                //    },
                //});
                tag_tab.datagrid('loadData', query_row);

            } else {
                $.each(cur_columns_fliter_arr, function (i, item) {
                    $.each(item.op, function (j, jitem) {
                        jitem.selected = 1;
                    });
                    $('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + item.key + '"]>div.datagrid-cell span').eq(1).css({ color: '#000' });
                });
                tag_tab.datagrid('loadData', target_tab_data);

            }

            $.messager.progress('close');
        }

        target.reset_target_data_and_clumns_fliter = function (data) {
            target_tab_data = data;
            target.init_columns_fliter_arr();
            cur_column_field = undefined;
            target.refresh_target_tab();
        }
        target.reset_target_data_only = function (data) {
            target_tab_data = data;
            target.init_columns_fliter_arr();
            target.refresh_target_tab();
        }


        target.init_columns_fliter_arr();
        target.create();
        target.init_tag_tab();
        target.hide_panel();

        return target;
    }

    //传递过来是 字符串，调用相应方法
    $.fn.columns_fliters.methods = {
        clear: function (jq) {
            jq.clear_search_condition();
        },
        get_target_data: function (jq) {
            return jq.get_target_data();
        },
        reset_target_data_and_clumns_fliter: function (jq, data) {

            jq.reset_target_data_and_clumns_fliter(data);
        },
        reset_target_data_only: function (jq, data) {

            jq.reset_target_data_only(data);
        },
        get_columns_fliter_arr_by_field: function (jq, field) { 
            jq.get_columns_fliter_arr_by_field(field);
        },
    };

    //默认参数 
    $.fn.columns_fliters.defaults = {
        //原表格所有数据 
        target_tab_data: null,
        //目标控件 0
        tag_tab: undefined,

        cur_cls_target_body: '',

        cur_parent: undefined,

    };


})(jQuery);