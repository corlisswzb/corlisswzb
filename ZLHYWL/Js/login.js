$(document).ready(function () {

    $('.cls_login').show();
    $('.cls_select_company').hide();

    $('.dv_span_alert').html('');
    //cookie登录
    if ($.cookie('userinfo') != null) {
        var myparams = {
            action: 'loginsys',
            rnd: Math.random(),
            pwd_remember: 1
        };

        //$.post('/Ashx/usermgr.ashx?' + $.cookie('userinfo'), myparams,
        //    function (data) {
        //        if (data.result == 1) {
        //            //登录成功 
        //            select_company_after_login(data.company_list);
        //        } else {
        //           // 登录失败
        //            $('#dv_span_alert').html('错误:账户或密码错误');
        //        }
        //    }, 'json');

        $('#ipt_lgname').val(getCookieVariable($.cookie('userinfo'),'u_loginname'));
        $('#ipt_lgnpwd').val(getCookieVariable($.cookie('userinfo'),'u_pwd'));
    }
    $.cookie('opr_rec_page_model', 'focus', { expires: 7, path: '/' });
    $.cookie('opr_pay_page_model', 'focus', { expires: 7, path: '/' });

    $.cookie('bus_rec_page_ca_model', 'focus', { expires: 7, path: '/' });
    $.cookie('bus_rec_page_fee_model', 'focus', { expires: 7, path: '/' }); 

    $.cookie('bus_pay_page_ca_model', 'focus', { expires: 7, path: '/' });
    $.cookie('bus_pay_page_fee_model', 'focus', { expires: 7, path: '/' });


    //点击登入
    $("#ipt_login").click(function () {
        loginsys();
    })

    //按键enter登录
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            loginsys();
        }
    }); 
    
});

function getCookieVariable(query,variable) {
     
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
/**登录**/
function loginsys() {
    $('.dv_span_alert').html('');
    var myparams = {
        action: 'loginsys',
        u_loginname: $.trim($("#ipt_lgname").val()),
        u_pwd: $.trim($("#ipt_lgnpwd").val()),
        //company_id: $("#sel_cpy option:selected").val(),
        pwd_remember: $("#chk_rempwd").is(':checked') ? 1 : 0,
        rnd: Math.random()
    };
     
    var isRight = true;
    if(myparams.u_loginname == undefined || 
        myparams.u_loginname.length == 0) {
        
        $('.dv_span_alert').html('错误:账户或密码错误');
        isRight = false; 
    }

    if (myparams.u_pwd == undefined ||
        myparams.u_pwd.length == 0) {
         
        $('.dv_span_alert').html('错误:账户或密码错误');
        isRight = false; 
    }

    if (!isRight) {
        return;
    }
    
    $.post('/Ashx/usermgr.ashx', myparams, function (data) {
        if (data.result == 1) {
            //登录成功
            select_company_after_login(data.company_list);
             
        } else  { 
            //账号不存在
            $('.dv_span_alert').html('错误:账户或密码错误');
        }  
    },'json');
}

/*选择登入的公司账套*/
function select_company_after_login(data_company_list) {

    if (data_company_list.length == 0) { 
        $('#dv_span_alert').html('错误:没有找到账套信息,无法登录');
        return;
    }

    $('.cls_login').hide();
    $('.cls_select_company').show();
    var $tab_company_list = $('.cl_tab_company_list tbody');
    $tab_company_list.html('');

    $.each(data_company_list, function (c, citem) {
        $tab_company_list.append('<tr>' +
            '<td>' +
                citem.c_desc +
            '</td>' +
            '<td>' +
                '<input type="button" data-cpy_desc="' + citem.c_desc + '" data-cpy_id="' + citem.c_id + '"  style="width: 100%" class="cls_row_small_btn"  value="进入"  />' +
            '</td>' +
        '</tr>');
    });

    $('.cls_row_small_btn').unbind('click').bind('click',function () {
        var cpy_id = $(this).data('cpy_id');
        var cpy_desc = $(this).data('cpy_desc');
        entry_system(cpy_id);

        sessionStorage.setItem('cpy_id', cpy_id);
        sessionStorage.setItem('cpy_desc', cpy_desc);

    });
}

/*进入系统*/
function entry_system(cpy_id) {

    post('/Ashx/usermgr.ashx', {
        rnd: Math.random(),
        action: 'logincompany',
        cpy_id: cpy_id
    }, function (data) { 
        if (data.result == 1) {
            $(location).attr('href', data.href); 
            sessionStorage.setItem('basesetting', JSON.stringify(data));
        } 
    },false);
}