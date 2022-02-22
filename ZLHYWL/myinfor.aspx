<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="myinfor.aspx.cs" Inherits="SDZL.myinfor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
    <script src="Js/myinfor.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="easyui-tabs" data-options="border:false,fit:true">
        <div title="个人资料" style="padding: 4px">

            <div class="dv_content">
                <div class="dv_item">
                    <label class="dv_item_lab">账号</label>
                    <div class="dv_item_ipt">
			    	    <input type="text"  style="width:400px;padding-left:10px"  disabled="" value="<%=Session["u_login_name"] %>" class="easyui-textbox" />
			        </div>
                </div>
                <div class="dv_item">
                    <label class="dv_item_lab">用户名</label>
                    <div class="dv_item_ipt">
			    	    <input type="text" id="txt_username" style="width:400px;padding-left:10px"  class="easyui-textbox" />
			        </div>
                </div> 
                
                 <div class="dv_item">
                    <label class="dv_item_lab">手机号</label>
                    <div class="dv_item_ipt">
			    	    <input type="text" id="txt_phone"  style="width:400px;padding-left:10px" data-options="prompt:'请输入手机号'" class="easyui-textbox" />
			        </div>
                </div>
                 <div class="dv_item">
                    <label class="dv_item_lab">邮箱</label>
                    <div class="dv_item_ipt">
			    	    <input type="text" id="txt_email" style="width:400px;padding-left:10px"  data-options="prompt:'请输入邮箱地址',validType:'email'" class="easyui-textbox" />
			        </div>
                </div>
                <div class="dv_item">
                    <label class="dv_item_lab">QQ</label>
                    <div class="dv_item_ipt">
			    	    <input type="text" id="txt_qq" style="width:400px;padding-left:10px" class="easyui-textbox" />
			        </div>
                </div>
                <div class="dv_item">
                    <label class="dv_item_lab">微信</label>
                    <div class="dv_item_ipt">
			    	    <input type="text" id="txt_wx" style="width:400px;padding-left:10px"   class="easyui-textbox" />
			        </div>
                </div>
               
            </div>

            <div style="width:200px;padding:0px 10px" >
                <div class="pull-left" style="float:left;margin-left:40px">
                        <input type="button" class="btn_cs" id="btn_return" value="返回" />
                    </div>

              <div class="pull-right" style="float:right">
                   <input type="button" class="btn_cs" id="btn_save" value="保存设置" />
                    </div>
            </div>

        </div>
    </div>
</asp:Content>
