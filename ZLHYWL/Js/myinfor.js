$(document).ready(function () {

    bind_myinfor();

    $("#btn_return").click(function () {
        location.href = 'index_page.aspx';
    })


    $("#btn_save").click(function () {
        save_set();
    })

})


function bind_myinfor() {


   $.getJSON('/Ashx/system_set.ashx?',
   { action: 'get_myinfor', rnd: Math.random(), },
   function (data) {
       if (data.result > 0) {
           console.log(data);
           $("#txt_username").textbox('setValue', data.rows[0].u_real_name);
           $("#txt_phone").textbox('setValue', data.rows[0].u_phone);
           $("#txt_email").textbox('setValue', data.rows[0].u_email);
           $("#txt_qq").textbox('setValue', data.rows[0].u_qq);
           $("#txt_wx").textbox('setValue', data.rows[0].u_wx);


       } else {
           alert_msg('提示', '获取数据失败');
       }
   })
}

function save_set() {
    var params = {
        action: 'update_myinfor',
        realname: $("#txt_username").val(),
        sex: 1,
        phone: $("#txt_phone").val(),
        email: $("#txt_email").val(),
        qq: $("#txt_qq").val(),
        wx: $("#txt_wx").val(),
    };



   $.getJSON('/Ashx/system_set.ashx?',
   params,
   function (data) {
       if (data.result == 1) {
           alert_msg('提示', data.msg);
       } else {
           alert_msg('提示', data.msg);
       }
   })
}