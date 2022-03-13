<%@ Page Title="" Language="C#" MasterPageFile="~/main_page.Master" AutoEventWireup="true" CodeBehind="schema_mgr.aspx.cs" Inherits="ZLHYWL.schema_mgr" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="Style/mana_limit.css" rel="stylesheet" />
    <script src="Js/mana_schema_cto.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="easyui-panel" title=""  data-options="closable:true,border:false,fit:true"  >
        <div class="easyui-layout" data-options="border:false,fit:true"  >
            <div data-options="region:'west',split:true,title:'权限管理菜单'" style="width:260px;padding:0px;">  
                <ul class="ul_ss_menu">
                    <li class="li_ss_menuitem"  onclick="select_menu(this,1)" ><a href="javascript:void(0);">人员管理</a></li> 
                    <li class="li_ss_menuitem"  onclick="select_menu(this,2)" ><a href="javascript:void(0);">组织结构及人员职位</a></li>  
                    <li class="li_ss_menuitem"  onclick="select_menu(this,3)" ><a href="javascript:void(0);">权限设定及分配</a></li> 
                    <li class="li_ss_menuitem"  onclick="select_menu(this,4)" ><a href="javascript:void(0);">审批框架设置</a></li> 
                </ul>
            </div>
            <div id="dv_right_part" data-options="region:'center',title:''" style="padding-bottom:25px;" >
                <div id="dv_mana_user"  style="padding: 0px;  " class="easyui-panel" data-options="border:false,fit:true">
                    <div id="tab_users_bar" > 
                        <a href="javascript:open_edit_users_dialog(true);" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">新增</a>
                        
                        <a href="javascript:del_user();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">失效</a>
                       
                        <a href="javascript:reset_user_password();" tabindex="1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-arrow_refresh'">重置密码</a>
                       
                        <input id="user_list_searchbox" class="easyui-textbox" placeholder="模糊查询" style=" width:330px;vertical-align:middle;" oninput="oninput_query();" />
                       
                    </div>
                    <table id="tab_users"></table>
                </div>

                <div id="dv_mana_schema" style="padding: 0px;  "  class="easyui-panel" data-options="border:false,fit:true">
                    <div   class="easyui-layout"  data-options="fit:true">
                        <div data-options="region:'west', split:false,border:false,title:''" style=" border-right:solid 1px #95b8e7; width:443px;" >
                            <div class="easyui-layout" fit="true" style="padding:0px">
                                <div data-options="region:'center',split:false,border:false,title:''" style="  padding-bottom:68px;" > 
                                     <ul id="tree_schema_cto" class="easyui-tree" data-options="animate:true,fit:true"></ul>
                                </div>
                                <div data-options="region:'south',split:false,border:false,title:''" style="height:300px; padding:0px ;border-top:solid 4px #daeef5;"> 
                                    <table class="tab_from">
                                        <col style="width: 20%" />
                                        <col style="width: 80%" />   
                                        <tr>
                                            <td class="title cur_c_company cur_c_company_addition"> 
                                                公司名(英文):
                                            </td>
                                            <td class="value cur_c_company cur_c_company_addition">
                                                <textarea id="cur_c_en_desc"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                 resize:none;  width:96%; height:68px;"></textarea>  
                                            </td> 
                                        </tr> 
                                        <tr>
                                            <td class="title cur_c_company"> 
                                                地址(中文):
                                            </td>
                                            <td class="value cur_c_company">
                                                <textarea id="cur_c_address"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                 resize:none;  width:96%; height:68px;"></textarea>  
                                            </td> 
                                        </tr> 
                                        <tr>
                                            <td class="title cur_c_company"> 
                                                地址(英文):
                                            </td>
                                            <td class="value cur_c_company">
                                                <textarea id="cur_c_en_address"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                                                 resize:none;  width:96%; height:68px;"></textarea>   
                                            </td> 
                                        </tr> 
                                        <tr>
                                            <td class="title cur_c_company"> 
                                                联系电话:
                                            </td>
                                            <td class="value cur_c_company">
                                                <input class="easyui-textbox" autocomplete="off" type="text" id="cur_c_relation_phone" style="width:96%"  />
                                            </td> 
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        

                        </div> 
                    
                        <div data-options="region:'center',split:false,border:false,title:''" style="padding:0px">  
                            <div id="tab_user_schema_relation_bar" >
                                <a href="javascript:bind_user_schema_relation();"  tabindex="1" class="easyui-linkbutton btn_bind_user_schema_relation" data-options="plain:true,iconCls:'icon-user_add'">添加员工</a>
                                 
                                <a href="javascript:unbind_user_schema_relation();"  tabindex="1" class="easyui-linkbutton btn_bind_user_schema_relation" data-options="plain:true,iconCls:'icon-user_cross'">删除员工</a>
                            
                            </div>                             
                            
                            <table id="tab_user_schema_relation"></table> 
                            
                        
                        </div>
                    </div>
                </div>

                <div id="dv_mana_limit" class="easyui-panel" data-options="border:false,fit:true" style=" border-right:solid 1px #95b8e7; width:443px; ">
                    <div  class="easyui-layout" data-options="fit:true" >
                        <div data-options="region:'west', split:false,border:false,title:''" style="  padding-bottom:68px;" >
                            <ul id="tree_schema_of_limit_relation" class="easyui-tree" data-options="animate:true,fit:true" style="padding:0px;"></ul>
                        </div> 
                    
                        <div data-options="region:'center',split:false,border:false,title:''" style="padding:0px;padding-bottom:118px;"> 
                            <ul id="tree_limit" class="easyui-tree" data-options="animate:true,fit:true" style="padding:0px;padding-bottom:18px;"></ul>
                        </div>
                    </div>
                </div>

                <div id="dv_mana_approval_schema" style="padding: 0px;  "  class="easyui-panel" data-options="border:false,fit:true">
                    <div   class="easyui-layout" data-options="fit:true">
                        <div data-options="region:'west', split:false,border:false,title:''" style=" border-right:solid 1px #95b8e7; width:430px;" >
                             <div class="easyui-panel" data-options="title:'',fit:true,border:false">
                                 <div class="easyui-layout" fit="true">
                                     <div data-options="region:'north', split:false,border:false,title:''" class="custom_bg"  style="border-bottom:solid 1px #95b8e7;height:90px;  " >
                                         <table class="tab_std " >
                                             <col style="width:16%" />
                                             <col style="width:60%" />
                                             <col style="width:24%" />
                                             <tr> 
                                                <td class="title">
                                                    公司:
                                                </td>
                                                <td class="value">
                                                    <select class="easyui-combobox ap_c_id ap_mulit_search" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:220" >
                                                    
                                                    </select>
                                                </td>
                                             </tr>
                                             <tr> 
                                                <td class="title">
                                                    审批类别:
                                                </td>
                                                <td class="value">
                                                    <select class="easyui-combobox ap_typ ap_mulit_search" data-options="panelHeight:'auto',valueField:'value', textField:'label',filter: filterCombo,width:220" >
                                                    
                                                    </select>
                                                </td>
                                             </tr>
                                          
                                             <tr> 
                                                <td class="title">
                                                    节点描述:
                                                </td>
                                                <td class="value">
                                                    <input class="easyui-textbox aps_desc" style="width:214px" />
                                                </td>
                                                 <td>
                                                     <a href="javascript:insert_schema();" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">添加</a>
                                                 </td>
                                             </tr>
                                         
                                        </table>
                                     </div>
                                     <div data-options="region:'center',split:false,border:false,title:''" style="padding:0px"> 
                                         <div class="easyui-panel" data-options="title:'',fit:true,border:false">
                                            <table id="tab_ap_schema_list"> 
                                            </table>
                                         </div> 
                                     </div>
                                 </div>
                             </div>
                        </div> 
                    
                        <div data-options="region:'center',collapsible:false,split:true,border:false,title:''" style="padding:0px"> 
                             <div class="easyui-panel" data-options="title:'',fit:true,border:false">
                                <div class="easyui-layout" fit="true">
                                    <div data-options="region:'west',collapsible:false, split:true,border:false,title:'关联人员'" style="width:251px;" >
                                        <table id="tab_ap_schema_employe_relation"> 
                                        </table>
                                    </div>
                                    <div data-options="region:'center',collapsible:false,split:true,border:false,title:'所有员工'" style="padding:0px"> 
                                        <div id="tab_ap_schema_employe_bar" > 
                                            <input id="schema_employe_searchbox" class="easyui-textbox" placeholder="模糊查询" style=" width:330px;vertical-align:middle;" oninput="oninput_schema_employe_query();" /> 
                                        </div>
                                        <table id="tab_ap_schema_employe">
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--编辑或新建员工-->
    <div id="dlg_edit_users" class="easyui-dialog">
        <form id="dlg_eitd_user_form">
            <input type="hidden" id="hid_u_id" /> 
            <table class="tab_from">
                <col style="width: 15%" />
                <col style="width: 85%" /> 

                <tr>
                    <td colspan="2" class="row_title">基本信息</td>
                </tr>

                <tr>
                    <td class="title">账号:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox"  autocomplete="off" type="text" id="dlg_u_login_nam" style="width:300px"  />
                    </td> 
                </tr>
                <tr>
                    <td class="title">密码:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" autocomplete="off" type="password" id="dlg_u_password" style="width:300px"  />
                    </td> 
                </tr>
                <tr>
                    <td class="title">姓名:
                    </td>
                    <td class="value">
                        <input class="easyui-textbox"   autocomplete="off" type="text" id="dlg_u_nam" style="width:300px" />
                    </td>
                </tr>
                <tr>
                    <td class="title">角色:
                    </td>
                    <td class="value">
                        <select class="easyui-combobox" id="dlg_u_admin_flag" data-options=" panelHeight:'auto',valueField:'value', textField:'label',width:306" >
                            <option value="0">系统用户</option>
                            <option value="1">管理员</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="title">电话:
                    </td>
                    <td class="value">
                        <input type="text" class="easyui-textbox" autocomplete="off" id="dlg_u_phone"  style="width:300px" />
                    </td>
                </tr>
                <tr>
                    <td class="title">邮箱:
                    </td>
                    <td class="value">
                        <input type="text" class="easyui-textbox" autocomplete="off" id="dlg_u_email" style="width:300px" />
                    </td>
                </tr>
                <tr>
                    <td class="title">QQ:
                    </td>
                    <td class="value">
                        <input type="text" class="easyui-textbox" autocomplete="off" id="dlg_u_qq"  style="width:300px" />
                    </td>
                </tr>
                <tr>
                    <td class="title">微信:
                    </td>
                    <td class="value">
                        <input type="text" class="easyui-textbox" autocomplete="off" id="dlg_u_wx"  style="width:300px" />
                    </td>
                </tr>
                <tr>
                    <td class="title" style="height:32px;">是否有效:
                    </td>
                    <td class="value">
                        <input type="checkbox" class="easyui-checkbox chb" id="dlg_u_valid" checked />
                    </td>
                </tr> 
            </table> 
        </form>

    </div>
    <!-- 组织结构 编辑菜单-->
    <div id="menu_edit_schema" class="easyui-menu" style="width: 30px; display: none;">  
      <!--放置一个隐藏的菜单Div-->  
        <div class="schema_lv schema_lv_1" data-options="iconCls:'icon-house'">
            <span>公司</span>
            <div style="width:80px;">
                <div class="schema_lv_ed schema_lv_1_add" data-options="iconCls:'icon-add'" onclick="edit_ins_schema(1)">添加</div>
                <div class="schema_lv_ed schema_lv_1_edit" data-options="iconCls:'icon-edit'" onclick="edit_edit_schema(1)">编辑</div>
                <div class="schema_lv_ed schema_lv_1_remove" data-options="iconCls:'icon-remove'" onclick="edit_del_schema(1)">删除</div>
               
            </div>
        </div>   
        <div class="schema_lv schema_lv_2" data-options="iconCls:'icon-group'" >
            <span>部门</span>
            <div style="width:80px;">
                <div class="schema_lv_ed schema_lv_2_add" data-options="iconCls:'icon-add'" onclick="edit_ins_schema(2)">添加</div>
                <div class="schema_lv_ed schema_lv_2_edit" data-options="iconCls:'icon-edit'" onclick="edit_edit_schema(2)">编辑</div>
                <div class="schema_lv_ed schema_lv_2_remove" data-options="iconCls:'icon-remove'" onclick="edit_del_schema(2)">删除</div>
                
            </div>
        </div> 
        <div class="schema_lv schema_lv_3" data-options="iconCls:'icon-user_female'" >
            <span>职位</span>
            <div style="width:80px;">
                <div class="schema_lv_ed schema_lv_3_add" data-options="iconCls:'icon-add'" onclick="edit_ins_schema(3)">添加</div> 
                <div class="schema_lv_ed schema_lv_3_edit" data-options="iconCls:'icon-edit'" onclick="edit_edit_schema(3)">编辑</div>
                <div class="schema_lv_ed schema_lv_3_remove" data-options="iconCls:'icon-remove'" onclick="edit_del_schema(3)">删除</div>
            </div>
        </div>  
    </div> 
    <!-- 编辑 组织结构描述-->
    <div id="dlg_edit_schema" class="easyui-dialog">
        <form id="dlg_edit_schema_form">
            <input type="hidden" id="hid_typ" /> 
            <input type="hidden" id="hid_c_id" /> 
            <input type="hidden" id="hid_c_father_id" /> 

            <table class="tab_from">
                <col style="width: 15%" />
                <col style="width: 85%" />  
                <tr>
                    <td class="title dlg_schema_title"> 
                    </td>
                    <td class="value">
                        <input class="easyui-textbox" autocomplete="off" type="text" id="dlg_schame_desc" style="width:96%"  />
                    </td> 
                </tr> 
                <tr>
                    <td class="title dlg_schema_company dlg_schema_company_addition"> 
                        公司名(英文):
                    </td>
                    <td class="value dlg_schema_company dlg_schema_company_addition">
                        <textarea id="dlg_schame_en_desc"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                         resize:none;  width:96%; height:68px;"></textarea>  
                    </td> 
                </tr> 
                <tr>
                    <td class="title dlg_schema_company"> 
                        地址(中文):
                    </td>
                    <td class="value dlg_schema_company">
                        <textarea id="dlg_schame_address"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                         resize:none;  width:96%; height:68px;"></textarea>  
                    </td> 
                </tr> 
                <tr>
                    <td class="title dlg_schema_company"> 
                        地址(英文):
                    </td>
                    <td class="value dlg_schema_company">
                        <textarea id="dlg_schame_en_address"  class="easyui-textarea" style=" overflow-x:hidden; overflow-y:auto; 
                                         resize:none;  width:96%; height:68px;"></textarea>   
                    </td> 
                </tr> 
                <tr>
                    <td class="title dlg_schema_company"> 
                        联系电话:
                    </td>
                    <td class="value dlg_schema_company">
                        <input class="easyui-textbox" autocomplete="off" type="text" id="dlg_schame_relation_phone" style="width:96%"  />
                    </td> 
                </tr>
            </table> 
        </form> 
    </div>
    <!--关联员工到 职位-->
    <div id="dlg_edit_bind_user_schema" class="easyui-dialog">
         
        <div id="dlg_edit_bind_user_schema_bar">
            <table class="tab_from">
                <col style="width: 15%" />
                <col style="width: 85%" /> 
                <tr>
                    <td class="title">搜索:</td>
                    <td class="value">
                        <input autocomplete="off" type="text" class="easyui-textbox" style="width:200px" placeholder ="模糊查询" oninput="query_bind_user_schema_relation_tab(this);" />
                    </td>
                </tr>
            </table>
        </div>

        <table id="dlg_tab_user_list_for_bind_to_schema">
                 
        </table> 
       
    </div>
</asp:Content>
 
