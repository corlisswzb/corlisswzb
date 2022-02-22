<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="SDZL.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    
    <link href="Script/easy-ui-v132/themes/metro-blue/easyui.css" rel="stylesheet" />
    <link href="Script/easy-ui-v132/themes/icon.css" rel="stylesheet" />
    <link href="Style/Index.css" rel="stylesheet" />
    <script src="Script/easy-ui-v132/jquery-1.8.0.min.js"></script>
    <script src="Script/easy-ui-v132/jquery.easyui.min.js"></script>
    
    <script src="Script/jquery.cookie.js"></script>

    <script src="Js/public.js"></script>
    <script src="Js/login.js"></script>
    <title>武汉苍何物流科技有限公司online系统</title>
</head>
<body>
    <form>
    <div class="dv_loginpart">
        <div class="dv_login_container cls_login">
            <div class="dv_login_title">武汉苍何物流科技有限公司ONLINE系统</div> 
            <div class="dv_row">
                <input class="cls_row_ipt" type="text" id="ipt_lgname" value="" autocomplete="off" placeholder="请输入账号" />  
            </div>
            <div class="dv_row">
                <input class="cls_row_ipt"  type="password" id="ipt_lgnpwd" value="" autocomplete="off" placeholder="密码"  />
            </div>
            <div class="dv_row"> 
                <input class="cls_row_ckb" type="checkbox" id="chk_rempwd"   value="" />
                <label class="cls_row_ckb_label" >记住密码</label>
            </div>
            <div class="dv_row_bottom">
                <span class="dv_span_alert">错误:用户名或密码错误!</span>
            </div>
            <div class="dv_row_bottom" style="margin-bottom:20px;"> 
                <input class="cls_row_btn" type="button" id="ipt_login" style="width: 100%" class="el-button el-button--primary" value="登录" />
            </div>     
        </div>

        <div class="dv_login_container cls_select_company">
            <h3 class="dv_login_title">请选择公司账套</h3>
            <table class="cl_tab_company_list">
                <col style="width:90%"/>
                <col style="width:10%"/>
                <tbody>
                    
                </tbody> 
            </table>
        </div>
    </div>
    </form>
</body>
</html>