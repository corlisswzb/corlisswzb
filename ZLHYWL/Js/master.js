

var int_setInterval = undefined;
$(document).ready(function () {
    $('#dlg_change_password').dialog({
        title: '更改密码',
        iconCls: 'icon-user_edit',
        autoOpen: false,
        modal: true,
        width: 360,
        minheight: 100,
        buttons: [{
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_change_password').dialog('close');
            }
        }]
    }).dialog('close');
    $('#dlg_change_myinfo').dialog({
        title: '更改个人信息',
        iconCls: 'icon-user_edit',
        autoOpen: false,
        modal: true,
        width: 360,
        minheight: 100,
        buttons: [{
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_change_myinfo').dialog('close');
            }
        }]
    }).dialog('close');
    load_menu();
           
    
    
    //myfunction();
    $(document).on('click', ':not(.temp_dialog)', function () {
        $('.temp_dialog').css({
            left: -1000,
            top: -1000
        });
    });

   
    int_setInterval = window.setInterval("chc()", 1000 * 5);
});
function chc() {
    $.getJSON('../Ashx/usermgr.ashx', {
        rnd: Math.random(),
        action: 'getSessionDate'
    }, function (data) {
        if (data.sessionout == 1) {
            window.clearInterval(int_setInterval);
            $.messager.alert('超时错误', '您停留的太久，请重新登录!', 'info', function () {
                $(location).attr('href', 'Default.aspx?rnd=' + Math.random());
            });
        } else {
            $('#sysdate').html(data.sysdate);
        }
    });
}
 

//加载菜单
function load_menu() {

    post('../Ashx/schema_cto.ashx', {
        action: 'get_limit_list_by_u_id',
        rnd: Math.random()
    }, function (data) {
        if (data.rows.length>0) { 
            var menus =  dg_get_menu(data.rows,1); 

            var menus_html = ''; //'<span style=\"margin-right:10px";\">菜单/Menu：</span>';
            var hid_html = '';
            for (var i = 0; i < menus.length; i++) {
                //第一层 l_father_id = 1
                if (menus[i].l_father_id == 1) {
                    //如果是有下拉的l_typ  = 1
                    if (menus[i].l_typ == 1) {
                        menus_html += "<a href=\"javascript:void(0)\" class=\"easyui-menubutton  top_menu\" data-options=\"menu:'#dv_" + menus[i].l_sub_menu + "'\">" + menus[i].l_desc + "</a>";

                        var hid_html_h = "<div id=\"dv_" + menus[i].l_sub_menu + "\">";

                        var two_menus = menus[i].children;
                        if (two_menus.length > 0) {

                            for (var j = 0; j < two_menus.length; j++) {
                                if (two_menus[j].l_typ == 2) {
                                    hid_html_h += " <div   data-options=\"href:'" + two_menus[j].l_href + "'\">" + two_menus[j].l_desc + "</div>";
                                }
                                    
                                if (two_menus[j].l_typ == 3) {
                                    var thrid_menus = two_menus[j].children;

                                    hid_html_h += " <div  ><span>" + two_menus[j].l_desc + "</span><div style=\"width:80px;\">";
                                    for (var o = 0; o < thrid_menus.length; o++) {
                                        hid_html_h += " <div data-options=\"href:'" + thrid_menus[o].l_href + "'\">" + thrid_menus[o].l_desc + "</div>";
                                    } 
                                    hid_html_h += "</div></div>"; 
                                }
                            }
                        }

                        hid_html_h += "</div>";
                        hid_html += hid_html_h;
                    } else {
                        menus_html += "<a href=\"" + menus[i].l_href + "\" class=\"easyui-linkbutton top_menu_link\" data-options=\"plain:true\" >" + menus[i].l_desc + "</a>";
                    }
                } 
            }

            $("#top_menus").html(menus_html);

            $("#dv_hidden").html(hid_html); 

            $('.top_menu').menubutton({

            });

            $('.top_menu_link').linkbutton(); 
        }
    },true);
    post('../Ashx/usermgr.ashx', {
        action: 'getcompanylist',
        rnd: Math.random()
    }, function (data) {
        var hid_html_h = ' <div data-options="iconCls:\'icon-home\'"><span>切换公司</span><div style="width:80px;">';
        $.each(data, function (i, row) {
            
            
            hid_html_h += '<div  onclick="change_company(' + row.c_id + ')">' + row.c_desc + '</div>';
           
        });
        hid_html_h += "</div></div>";

        var mm = ' <div id="mm2" style="width:120px" >' +
            hid_html_h +
            '<div data-options="iconCls:\'icon-user\'" onclick="change_myinfo()">个人资料</div>' +
            '<div data-options="iconCls:\'icon-lock\'" onclick="change_password()">修改密码</div>' +
            '<div data-options="iconCls:\'icon-disconnect\'" onclick="out_sys()">退出</div>' +
        '</div>';
        $('body').append(mm);
        $('#href_id').menubutton({
            menu: '#mm2',
             
        });
    },true);
   
}

function change_company(c_id) {

    $.messager.confirm('确认跳转操作', '确定要切换公司账套吗？',
    function (r) {
        if (r) {
            post('/Ashx/usermgr.ashx', {
                rnd: Math.random(),
                action: 'logincompany',
                cpy_id: c_id
            }, function (data) {
                if (data.result == 1) {
                    $(location).attr('href', data.href);
                    sessionStorage.setItem('basesetting', JSON.stringify(data));
                }
            }, false);
        }
    });
     
}

/*递归生产菜单*/
function dg_get_menu(limit_list, l_id) {
    var menus = [];
    $.each(limit_list, function (i, row) {
        if (row.l_father_id == l_id) {
            //主要菜单标题 
            menus.push({
                l_id: row.l_id,
                l_desc: row.l_desc,
                l_typ: row.l_typ,
                l_father_id: l_id,
                l_sub_menu: 'menu' + row.l_id,
                l_href: row.l_href == undefined ? '#' : row.l_href,
                children: dg_get_menu(limit_list,row.l_id)
            });
        }
    });

    return menus;
}

/*退出系统*/
function out_sys() {
    $.post('../Ashx/usermgr.ashx', {
        rnd: Math.random(),
        action: 'out_system'
    }, function (data) {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
            location.href = "Default.aspx";
        } else {
            window.opener = null;
            window.open('Default.aspx', '_self');
        }
        window.close();
    }, 'json');
}

/*更改密码*/
function change_password() {
    $('#dlg_change_password').dialog({
        title: '更改密码',
        iconCls: 'icon-user_edit',
        autoOpen: false,
        modal: true,
        width: 360,
        minheight: 100,
        buttons: [
        {
            text: '确定',
            iconCls: 'icon-save',
            handler: function () {

                var old_password = $.trim($('#dlg_old_password').val());
                var new_password = $.trim($('#dlg_new_password').val());
                var new_password_again = $.trim($('#dlg_new_password_again').val());

                if (new_password != new_password_again) {
                    $.messager.alert('错误提示', '两次新密码不一致', 'error');
                    return;
                }

                if (new_password.length < 4) {
                    $.messager.alert('错误提示', '新密码不能少于4位', 'error');
                    return;
                }
                var math_2 = /^[a-zA-Z]\w{4,15}$/;

                if (!math_2.test(new_password)
                    ) {
                    $.messager.alert('错误提示', '密码必须字母开头且是由数字、字母、下划线组成且长度在4-15之间！', 'error');
                    return;
                }

                post('../Ashx/usermgr.ashx', {
                    rnd: Math.random(),
                    action: 'update_pwd',
                    old_pwd: old_password,
                    new_pwd: new_password
                }, function (data) {
                    
                        if (data.result == 1) {
                            $.messager.alert('提示', '密码修改完成', 'info');
                            $('#dlg_change_password').dialog('close');
                        } else {
                            $.messager.alert('错误提示', '原密码不正确，无法修改', 'error');
                        }
                    
                }, true);
            }
        }, {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_change_password').dialog('close');
            }
        }]
    }).dialog('open');

}

/*更改账户信息*/
function change_myinfo() {

    //这里要先获取个人信息 

    post('../Ashx/usermgr.ashx', {
        rnd: Math.random(),
        action: 'get_myinfo',
    }, function (data) {

        if (data.rows.length > 0) {
            var myinfo = data.rows[0];

            $('#dlg_mu_login_name').val(myinfo.u_login_name);
            $('#dlg_mu_real_name').val(myinfo.u_real_name);
            $('#dlg_mu_phone').val(myinfo.u_phone);
            $('#dlg_mu_email').val(myinfo.u_email);
            $('#dlg_mu_qq').val(myinfo.u_qq);
            $('#dlg_mu_wx').val(myinfo.u_wx);
          


            $('#dlg_change_myinfo').dialog({
                title: '更改个人信息',
                iconCls: 'icon-user_edit',
                autoOpen: false,
                modal: true,
                width: 360,
                minheight: 100,
                buttons: [
                {
                    text: '确定',
                    iconCls: 'icon-save',
                    handler: function () {
                        var par = {
                            rand: Math.random(),
                            action: 'update_myinfo',
                            realname: $.trim( $('#dlg_mu_real_name').val()),
                            phone: $.trim( $('#dlg_mu_phone').val()),
                            email: $.trim( $('#dlg_mu_email').val()),
                            qq:$.trim( $('#dlg_mu_qq').val()),
                            vx: $.trim($('#dlg_mu_wx').val()),
                        };

                        //电话不能为空 
                        //姓名不能为空
                        
                        if (par.realname == undefined || par.realname.length == 0) {
                            $.messager.alert('错误提示', '错误: 姓名不能为空', 'error');
                            return;
                        }
                        if (par.phone == undefined || par.phone.length == 0) {
                            $.messager.alert('错误提示', '错误: 电话不能为空', 'error');
                            return;
                        }
                        post('../Ashx/usermgr.ashx', par,
                        function (data) { 
                            if (data.result == 1) {
                                $.messager.alert('提示', data.msg, 'info');
                                $('#dlg_change_myinfo').dialog('close');
                            } else {
                                $.messager.alert('错误提示', data.msg, 'error');
                            } 
                        }, true);
                    }
                }, {
                    text: '关闭',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#dlg_change_myinfo').dialog('close');
                    }
                }]
            }).dialog('open');
        }

    },true); 
}