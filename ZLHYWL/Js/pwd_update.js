$(document).ready(function () {


    $("#btn_update").click(function () {
    
        var old_pwd=$("#ipt_old").val();
        var new_pwd=$("#ipt_new").val();
        var sure_pwd=$("#ipt_sure").val();

        if (new_pwd!=sure_pwd) {
            $.messager.alert('提示','2次密码不一致','ok');
            return;
        }

        $.getJSON('/Ashx/system_set.ashx?',
       {
           action: 'updatepwd',
           rnd: Math.random(),
           old_pwd: old_pwd,
           new_pwd: new_pwd
           },
       function (data) {
           if (data.result == 1) {

               $.messager.alert('提示', '修改密码成功', 'ok');

           } else {
            
               $.messager.alert('提示', '修改密码失败，请重试！', 'error');
           }
       });

    })




   


})