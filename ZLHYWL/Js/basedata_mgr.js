//全局变量

var data_project = undefined;
var pageNumber = 1;
//每页显示10行
var pageSize = 30;


var data_product = undefined;

var data_sc = undefined;
var editRow_sc = undefined;
var res_edit_row_sc = undefined;

var data_iv = undefined;
var editRow_iv = undefined;
var res_edit_row_iv = undefined;

var data_tr = undefined;
var editRow_tr = undefined;
var res_edit_row_tr = undefined;

var data_fr = undefined;
var editRow_fr = undefined;
var res_edit_row_fr = undefined;

var data_pr = undefined;
var editRow_pr = undefined;
var res_edit_row_pr = undefined;

var data_fi = undefined;
var editRow_fi = undefined;
var res_edit_row_fi = undefined;

var data_pj = undefined;
var editRow_pj = undefined;
var res_edit_row_pj = undefined;

var data_pa = undefined;
var editRow_pa = undefined;
var res_edit_row_pa = undefined;

var data_vl = undefined;
var editRow_vl = undefined;
var res_edit_row_vl = undefined;

var data_un = undefined;
var editRow_un = undefined;
var res_edit_row_un = undefined;

var data_ca = undefined;
var editRow_ca = undefined;
var res_edit_row_ca = undefined;

var data_bl = undefined;
var editRow_bl = undefined;
var res_edit_row_bl = undefined;

var data_sb = undefined;
var editRow_sb = undefined;
var res_edit_row_sb = undefined;

var data_area = undefined;
var editRow_area = undefined;
var res_edit_row_area = undefined;

var data_port = undefined;
var editRow_port = undefined;
var res_edit_row_port = undefined;

$(document).ready(function () {

    //初始化对话框
    $('#dlg_edit_place').dialog({
        title: '编辑地址信息',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 450,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_edit_place').dialog('close');
            }
        }]
    }).dialog('close');

    //初始化对话框
    $('#dlg_edit_product').dialog({
        title: '编辑品名信息',
        iconCls: 'icon-save',
        autoOpen: false,
        modal: true,
        width: 500,
        minheight: 450,
        buttons: [
        {
            text: '关闭',
            iconCls: 'icon-cancel',
            handler: function () {
                $('#dlg_edit_product').dialog('close');
            }
        }]
    }).dialog('close');

    load_tab_ship_company([]);
    load_tab_invoice([]);
    load_tab_trade([]);
    load_tab_freight([]);
    //load_tab_product([]);
    load_tab_fee_item([]);
    load_tab_project([]);
    load_tab_packing([]);
    load_tab_voyage_line([]);
    load_tab_sign_bill_typ([]);
    load_tab_bill_typ([]);
    
    
    //get_data_ship_company();
    //get_data_product();


    ////项目
    //load_tab_project();
    ////费目
    //load_tab_fee_item();
   
    ////货币
    //load_tab_currency();

    //load_tab_trade();

    //load_tab_freight();

    //load_tab_invoice();

    get_basesetting();

})

/*做一个集合得到所有信息*/
function get_basesetting() {
    post('../Ashx/sys_base.ashx', {
        rnd: Math.random(),
        action: 'get_basesettingCollections'
    }, function (data) {
        basesetting =  data;
        bind_combobox(basesetting.place_typ_list, $('#serach_place_pl_typ'), 'pt_desc', 'pt_id', true);
        bind_combobox(basesetting.place_typ_list, $('#dlg_pl_typ'), 'pt_desc', 'pt_id', true);

        data_sc = basesetting.ship_company_list;
        data_iv = basesetting.invoice_list;
        data_tr = basesetting.trade_list;
        data_fr = basesetting.freight_list;
        data_pr = basesetting.product_list;
        data_fi = basesetting.fee_item_list;
        data_pj = basesetting.project_list;
        data_pa = basesetting.packing_list;
        data_vl = basesetting.voyage_line_list;
        data_un = basesetting.unit_list;
        data_ca = basesetting.carriage_typ_list;
        data_sb = basesetting.sign_bill_typ_list;
        data_bl = basesetting.bill_typ_list;

        //load_tab_product(data_pr);
        load_tab_freight(data_fr);
        load_tab_ship_company(data_sc);
        load_tab_invoice(data_iv);
        load_tab_trade(data_tr);
        load_tab_fee_item(data_fi);
        load_tab_project(data_pj);
        load_tab_packing(data_pa);
        load_tab_voyage_line(data_vl);
        load_tab_unit(data_un);
        load_tab_carriage_typ(data_ca);
        load_tab_sign_bill_typ(data_sb);
        load_tab_bill_typ(data_bl);

        load_tab_place();
        load_tab_product();

        data_area = basesetting.area_list;
        data_port = basesetting.port_list;
        load_tab_area(basesetting.area_list);
        load_tab_port(basesetting.port_list);

    }, true);
    
}
  
//加载项目信息
function load_tab_project(data) { 
    $("#tab_project").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            { field: 'pr_code', title: '编码', align: 'left', width:140, editor: { type: 'text', } },
            { field: 'pr_name', title: '项目名称', align: 'left', width: 240, editor: { type: 'text', } }, 
        ]],
        toolbar: [{
            id: 'add_btn_pj', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_pj').linkbutton('enable');
                $('#cancel_btn_pj').linkbutton('enable');
                if (!$('#add_btn_pj').linkbutton('options').disabled) { $('#add_btn_pj').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_project',
                    pr_code: '',
                    pr_name: '', 
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_project").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    pr_id: data.pr_id,
                                    pr_name: '',
                                    pr_code: '', 
                                    pr_vallid: 1
                                }
                            });

                            //存在一个 bug，有可能已经存在 
                            var bhas = false;

                            $.each(data_pj, function (i, bitem) {
                                if (bitem.pr_id == data.pr_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_pj.unshift({
                                    pr_id: data.pr_id,
                                    pr_name: '',
                                    pr_code: '',
                                    pr_vallid: 1
                                });
                            }

                            
                            $("#tab_project").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_pj = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_pj', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_pj == undefined) {
                   return;
               }
               if (!$('#save_btn_pj').linkbutton('options').disabled) { $('#save_btn_pj').linkbutton('disable'); }
               if (!$('#cancel_btn_pj').linkbutton('options').disabled) { $('#cancel_btn_pj').linkbutton('disable'); }
               $('#add_btn_pj').linkbutton('enable');

               $('#tab_project').datagrid('endEdit', editRow_pj);
           }
       }, '-',
       {
           id: 'cancel_btn_pj', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_pj == undefined) {
                   return;
               }
               if (!$('#save_btn_pj').linkbutton('options').disabled) { $('#save_btn_pj').linkbutton('disable'); }
               if (!$('#cancel_btn_pj').linkbutton('options').disabled) { $('#cancel_btn_pj').linkbutton('disable'); }
               $('#add_btn_pj').linkbutton('enable');

               $('#tab_project').datagrid('cancelEdit', editRow_pj);
           }
       }, '-',
       {
           id: 'del_btn_pj', text: '删除', iconCls: 'icon-empty',
           handler: function () {

               if (editRow_pj != undefined) {
                   $('#tab_project').datagrid('cancelEdit', editRow_pj);
               }

               var rows = $('#tab_project').datagrid('getChecked');

               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }

               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var pr_ids = '';

                       $.each(rows, function (i, item) {
                           if (pr_ids.length == 0) {
                               pr_ids = item.pr_id;
                           } else {
                               pr_ids += ',' + item.pr_id;
                           }
                       });


                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_project',
                           pr_ids: pr_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_project').datagrid('getRowIndex', row);
                                   $('#tab_project').datagrid('deleteRow', rowindex);
                               });
                               var new_data_pj = [];
                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_pj, function (j, tag_row) {
                                       if (tag_row.pr_id == row.pr_id) {
                                          // data_pj.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_pj.push(tag_row);
                                       }
                                   });
                               });
                               data_pj = new_data_pj;
                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_project" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_pj);
            editRow_pj = undefined;

            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_project',
                pr_id: row.pr_id,
                pr_name: row.pr_name,
                pr_code: row.pr_code
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_pj, function (i, cur_row) {
                            if (cur_row.pr_id == row.pr_id) {
                                data_pj[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_project').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                    } else {
                        //更新数据 
                        $.each(data_pj, function (i, cur_row) {
                            if (cur_row.pr_id == res_edit_row.pr_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_project').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_project').datagrid('beginEdit', index);
                        editRow_pj = index;
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            $('#save_btn_pj').linkbutton('enable');
            $('#cancel_btn_pj').linkbutton('enable');
            if (!$('#add_btn_pj').linkbutton('options').disabled) { $('#add_btn_pj').linkbutton('disable'); }

            res_edit_row_pj = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_pj = undefined;
            $('#add_btn_pj').linkbutton('enable');
            $('#cancel_btn_pj').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_pj == rowIndex) {
                $("#tab_project").datagrid("endEdit", editRow_pj);
                editRow_pj == undefined;
            } else {

                if (editRow_pj != undefined && editRow_pj != rowIndex) {
                    $("#tab_project").datagrid("endEdit", editRow_pj);
                }
                if (editRow_pj == undefined) {
                    $('#save_btn_pj').linkbutton('enable');
                    $('#cancel_btn_pj').linkbutton('enable');
                    if (!$('#add_btn_pj').linkbutton('options').disabled) { $('#add_btn_pj').linkbutton('disable'); }

                    editRow_pj = rowIndex;
                    $("#tab_project").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_project').unbind('keyup').bind('keyup', function (event) {
                if (editRow_pj != undefined) {
                    $('#tab_project').datagrid('cancelEdit', editRow_pj);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_project').datagrid('loadData', { total: data_pj.length, rows: data_pj });
                } else {
                    var new_arr = [];
                    $.each(data_pj, function (i, item) {
                        //统一转成大写比较
                        if ((item.pr_name != undefined && item.pr_name.toUpperCase().indexOf(like_str) > -1) ||
                            (item.pr_code != undefined && item.pr_code.toUpperCase().indexOf(like_str) > -1) ) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_project').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }
            });
        }
    });
}
 
//加载费目信息
function load_tab_fee_item(data) {

    $("#tab_fee_item").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true }, 
            { field: 'fee_code', width: 140, title: '编码', align: 'left', editor: { type: 'text', } },
            { field: 'fee_cn', width: 250, title: '中文名称', align: 'left', editor: { type: 'text', } },
            { field: 'fee_remark', width: 300, title: '备注', align: 'left', editor: { type: 'text', } },
        ]],
        toolbar: [{
            id: 'add_btn_fi', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_fi').linkbutton('enable');
                $('#cancel_btn_fi').linkbutton('enable');
                if (!$('#add_btn_fi').linkbutton('options').disabled) { $('#add_btn_fi').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_fee_item',
                    fee_cn: '',
                    fee_code: '',
                    fee_remark: ''
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_fee_item").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    fee_id: data.fee_id,
                                    fee_cn: '',
                                    fee_code: '',
                                    fee_remark: '',
                                    fee_vallid: 1
                                }
                            });
                            //存在一个 bug，有可能已经存在 
                            var bhas = false;

                            $.each(data_fi, function (i, bitem) {
                                if (bitem.fee_id == data.fee_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_fi.unshift({
                                    fee_id: data.fee_id,
                                    fee_cn: '',
                                    fee_code: '',
                                    fee_remark: '',
                                    fee_vallid: 1
                                });
                            }
                            $("#tab_fee_item").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_fi = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_fi', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_fi == undefined) {
                   return;
               }
               if (!$('#save_btn_fi').linkbutton('options').disabled) { $('#save_btn_fi').linkbutton('disable'); }
               if (!$('#cancel_btn_fi').linkbutton('options').disabled) { $('#cancel_btn_fi').linkbutton('disable'); }
               $('#add_btn_fi').linkbutton('enable');

               $('#tab_fee_item').datagrid('endEdit', editRow_fi);
           }
       }, '-',
       {
           id: 'cancel_btn_fi', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_fi == undefined) {
                   return;
               }
               if (!$('#save_btn_fi').linkbutton('options').disabled) { $('#save_btn_fi').linkbutton('disable'); }
               if (!$('#cancel_btn_fi').linkbutton('options').disabled) { $('#cancel_btn_fi').linkbutton('disable'); }
               $('#add_btn_fi').linkbutton('enable');

               $('#tab_fee_item').datagrid('cancelEdit', editRow_fi);
           }
       }, '-',
       {
           id: 'del_btn_fi', text: '删除', iconCls: 'icon-empty',
           handler: function () {

               if (editRow_fi != undefined) {
                   $('#tab_fee_item').datagrid('cancelEdit', editRow_fi);
               }

               var rows = $('#tab_fee_item').datagrid('getChecked');

               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }

               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var fee_ids = '';

                       $.each(rows, function (i, item) {
                           if (fee_ids.length == 0) {
                               fee_ids = item.fee_id;
                           } else {
                               fee_ids += ',' + item.fee_id;
                           }
                       });


                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_fee_item',
                           fee_ids: fee_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_fee_item').datagrid('getRowIndex', row);
                                   $('#tab_fee_item').datagrid('deleteRow', rowindex);
                               });
                               var new_data_fi = [];

                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_fi, function (j, tag_row) {
                                       if (tag_row.fee_id == row.fee_id) {
                                          // data_fi.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                            
                                       } else {
                                           new_data_fi.push(tag_row);
                                       }
                                   });
                               });
                               data_fi = new_data_fi;

                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_fee_item" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_fi);
            editRow_fi = undefined;

            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_fee_item',
                fee_id: row.fee_id,
                fee_cn: row.fee_cn,
                fee_code: row.fee_code,
                fee_remark: row.fee_remark,
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_fi, function (i, cur_row) {
                            if (cur_row.fee_id == row.fee_id) {
                                data_fi[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_fee_item').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                    } else {
                        //更新数据 
                        $.each(data_fi, function (i, cur_row) {
                            if (cur_row.fee_id == res_edit_row.fee_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_fee_item').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_fee_item').datagrid('beginEdit', index);
                        editRow_fi = index;
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            $('#save_btn_fi').linkbutton('enable');
            $('#cancel_btn_fi').linkbutton('enable');
            if (!$('#add_btn_fi').linkbutton('options').disabled) { $('#add_btn_fi').linkbutton('disable'); }

            res_edit_row_fi = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_fi = undefined;
            $('#add_btn_fi').linkbutton('enable');
            $('#cancel_btn_fi').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_fi == rowIndex) {
                $("#tab_fee_item").datagrid("endEdit", editRow_fi);
                editRow_fi == undefined;
            } else {

                if (editRow_fi != undefined && editRow_fi != rowIndex) {
                    $("#tab_fee_item").datagrid("endEdit", editRow_fi);
                }
                if (editRow_fi == undefined) {
                    $('#save_btn_fi').linkbutton('enable');
                    $('#cancel_btn_fi').linkbutton('enable');
                    if (!$('#add_btn_fi').linkbutton('options').disabled) { $('#add_btn_fi').linkbutton('disable'); }

                    editRow_fi = rowIndex;
                    $("#tab_fee_item").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_fee_item').unbind('keyup').bind('keyup', function (event) {
                if (editRow_fi != undefined) {
                    $('#tab_fee_item').datagrid('cancelEdit', editRow_fi);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_fee_item').datagrid('loadData', { total: data_fi.length, rows: data_fi });
                } else {
                    var new_arr = [];
                    $.each(data_fi, function (i, item) {
                        //统一转成大写比较
                        if ((item.fee_cn != undefined && item.fee_cn.toUpperCase().indexOf(like_str) > -1) || 
                            (item.fee_code != undefined && item.fee_code.toUpperCase().indexOf(like_str) > -1) || 
                            (item.fee_remark != undefined && item.fee_remark.toUpperCase().indexOf(like_str) > -1)) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_fee_item').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }
            });
        }
    });
}

function load_tab_packing(data) {
    $("#tab_packing").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            { field: 'pa_name', title: '包装类型', width: 400, align: 'left', editor: { type: 'text', } },
        ]],
        toolbar: [{
            id: 'add_btn_pa', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_pa').linkbutton('enable');
                $('#cancel_btn_pa').linkbutton('enable');
                if (!$('#add_btn_pa').linkbutton('options').disabled) { $('#add_btn_pa').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_packing',
                    pr_name: '',
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_packing").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    pa_id: data.pa_id,
                                    pr_name: '',
                                    pr_vallid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_pa, function (i, bitem) {
                                if (bitem.pa_id == data.pa_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_pa.unshift({
                                    pa_id: data.pa_id,
                                    pr_name: '',
                                    pr_vallid: 1
                                });
                            }
                            $("#tab_packing").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_pa = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_pa', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_pa == undefined) {
                   return;
               }
               if (!$('#save_btn_pa').linkbutton('options').disabled) { $('#save_btn_pa').linkbutton('disable'); }
               if (!$('#cancel_btn_pa').linkbutton('options').disabled) { $('#cancel_btn_pa').linkbutton('disable'); }
               $('#add_btn_pa').linkbutton('enable');

               $('#tab_packing').datagrid('endEdit', editRow_pa);
           }
       }, '-',
       {
           id: 'cancel_btn_pa', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_pa == undefined) {
                   return;
               }
               if (!$('#save_btn_pa').linkbutton('options').disabled) { $('#save_btn_pa').linkbutton('disable'); }
               if (!$('#cancel_btn_pa').linkbutton('options').disabled) { $('#cancel_btn_pa').linkbutton('disable'); }
               $('#add_btn_pa').linkbutton('enable');

               $('#tab_packing').datagrid('cancelEdit', editRow_pa);
           }
       }, '-',
       {
           id: 'del_btn_pa', text: '删除', iconCls: 'icon-empty',
           handler: function () {

               if (editRow_pa != undefined) {
                   $('#tab_packing').datagrid('cancelEdit', editRow_pa);
               }

               var rows = $('#tab_packing').datagrid('getChecked');

               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }

               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var pa_ids = '';

                       $.each(rows, function (i, item) {
                           if (pa_ids.length == 0) {
                               pa_ids = item.pa_id;
                           } else {
                               pa_ids += ',' + item.pa_id;
                           }
                       });


                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_packing',
                           pa_ids: pa_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_packing').datagrid('getRowIndex', row);
                                   $('#tab_packing').datagrid('deleteRow', rowindex);
                               });
                               var new_data_pa = [];

                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_pa, function (j, tag_row) {
                                       if (tag_row.pa_id == row.pa_id) {
                                           //data_pa.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_pa.push(tag_row);
                                       }
                                   });
                               });
                               data_pa = new_data_pa;
                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_packing" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_pa);
            editRow_pa = undefined;

            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_packing',
                pa_id: row.pa_id,
                pr_name: row.pr_name,
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_pa, function (i, cur_row) {
                            if (cur_row.pa_id == row.pa_id) {
                                data_pa[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_packing').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                    } else {
                        //更新数据 
                        $.each(data_pa, function (i, cur_row) {
                            if (cur_row.pa_id == res_edit_row.pa_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_packing').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_packing').datagrid('beginEdit', index);
                        editRow_pa = index;
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            $('#save_btn_pa').linkbutton('enable');
            $('#cancel_btn_pa').linkbutton('enable');
            if (!$('#add_btn_pa').linkbutton('options').disabled) { $('#add_btn_pa').linkbutton('disable'); }

            res_edit_row_pa = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_pa = undefined;
            $('#add_btn_pa').linkbutton('enable');
            $('#cancel_btn_pa').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_pa == rowIndex) {
                $("#tab_packing").datagrid("endEdit", editRow_pa);
                editRow_pa == undefined;
            } else {

                if (editRow_pa != undefined && editRow_pa != rowIndex) {
                    $("#tab_packing").datagrid("endEdit", editRow_pa);
                }
                if (editRow_pa == undefined) {
                    $('#save_btn_pa').linkbutton('enable');
                    $('#cancel_btn_pa').linkbutton('enable');
                    if (!$('#add_btn_pa').linkbutton('options').disabled) { $('#add_btn_pa').linkbutton('disable'); }

                    editRow_pa = rowIndex;
                    $("#tab_packing").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_packing').unbind('keyup').bind('keyup', function (event) {
                if (editRow_pa != undefined) {
                    $('#tab_packing').datagrid('cancelEdit', editRow_pa);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_packing').datagrid('loadData', { total: data_pa.length, rows: data_pa });
                } else {
                    var new_arr = [];
                    $.each(data_pa, function (i, item) {
                        //统一转成大写比较
                        if (item.pr_name != undefined && item.pr_name.toUpperCase().indexOf(like_str) > -1) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_packing').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }
            });
        }
    });
}

function load_tab_product(data) {
    $("#tab_product").datagrid({
        url: '/Ashx/sys_base.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_product_by_page',
            like_str: $.trim($("#search_product_like_str").val()),
        },
        method: 'post',
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_product_bar',
        fit: true,
        fitColumns: false,
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
           { field: 'ck', title: 'ID', checkbox: true },
           { field: 'pr_name', title: '货物名称', width: 400, align: 'left', editor: { type: 'text', } },
        ]],
        onDblClickRow: function (index, row) {
            $('#hid_pr_id').val(row.pr_id);
            $('#dlg_pr_name').val(row.pr_name);

             
            $('#dlg_edit_product').dialog({
                title: '编辑品名信息',
                iconCls: 'icon-save',
                autoOpen: false,
                modal: true,
                width: 800,
                minheight: 450,
                buttons: [{
                    text: '保存',
                    iconCls: 'icon-save',
                    handler: function () {
                        var par = {
                            action: 'update_product',
                            pr_id: $('#hid_pr_id').val(),
                            pr_name: $.trim($('#dlg_pr_name').val()),
                        };

                        if (par.pr_name == undefined || par.pr_name.length == 0) {
                            $.messager.alert('错误提示', '错误:必须填写品名全称', 'error');
                            return;
                        }


                        post('../Ashx/sys_base.ashx', par, function (data) {
                            if (data.result == 1) {
                                $.messager.confirm('提示', data.msg + '是否继续编辑？',
                                    function (r) {
                                        if (r) {

                                        } else {
                                            $('#dlg_edit_product').dialog('close');

                                            var like_str = undefined;

                                            if (par.pr_name != undefined && par.pr_name.length > 0) {
                                                like_str = par.pr_name;
                                            }

                                            $("#tab_product").datagrid('load', {
                                                rnd: Math.random(),
                                                action: 'get_product_by_page',
                                                like_str: like_str,
                                            });
                                        }
                                    }
                                );

                            } else {
                                $.messager.alert('错误提示', data.msg, 'error');
                            }
                        }, true);
                    }
                },
                {
                    text: '关闭',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#dlg_edit_product').dialog('close');
                    }
                }]
            }).dialog('open');
        }
    });

    //增加
    $('#add_btn_product').unbind('click').bind('click', function () {
        $('#hid_pr_id').val('');

        $('#dlg_edit_product').dialog({
            title: '新增品名信息',
            iconCls: 'icon-save',
            autoOpen: false,
            modal: true,
            width: 800,
            minheight: 450,
            buttons: [{
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var par = {
                        action: 'insert_product',
                        pr_name: $.trim($('#dlg_pr_name').val()),
                    };
                    if (par.pr_name == undefined || par.pr_name.length == 0) {
                        $.messager.alert('错误提示', '错误:必须填写品名全称', 'error');
                        return;
                    }
                    post('../Ashx/sys_base.ashx', par, function (data) {
                        if (data.result == 1) {
                            $.messager.confirm('提示', data.msg + '是否继续添加？',
                                function (r) {
                                    if (r) {

                                    } else {
                                        $('#dlg_edit_product').dialog('close');

                                        var like_str = undefined;

                                        if (par.pl_name != undefined && par.pl_name.length > 0) {
                                            like_str = par.pl_name;
                                        }
                                        $("#tab_product").datagrid('load', {
                                            rnd: Math.random(),
                                            action: 'get_product_by_page',
                                            like_str: like_str,
                                        });
                                    }
                                }
                            );

                        } else {
                            $.messager.alert('错误提示', data.msg, 'error');
                        }
                    }, true);
                }
            },
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_edit_product').dialog('close');
                }
            }]
        }).dialog('open');
    });
    //删除
    $('#del_btn_product').unbind('click').bind('click', function () {
        var del_rows = $("#tab_product").datagrid('getChecked');

        if (del_rows.length == 0) {
            $.messager.alert('错误提示', '请选择要删除的数据', 'error');
            return;
        }
        var pr_ids = '';

        $.each(del_rows, function (i, item) {
            if (pr_ids.length == 0) {
                pr_ids = item.pr_id;
            } else {
                pr_ids += ',' + item.pr_id;
            }
        });

        $.messager.confirm('删除提示', '确定要删除选择的' + del_rows.length + '行数据？',
        function (r) {
            if (r) {
                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'delete_product',
                    pr_ids: pr_ids
                }, function (data) {
                    if (data.result == 1) {
                        $.messager.alert('提示', data.msg, 'info', function () {
                            $("#tab_product").datagrid('load', {
                                rnd: Math.random(),
                                action: 'get_product_by_page',
                                like_str: $.trim($("#search_product_like_str").val()),
                            });
                        });
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }, true);
            }
        });
    });
    //查询
    $('#query_btn_product').unbind('click').bind('click', function () {
        $("#tab_product").datagrid('load', {
            rnd: Math.random(),
            action: 'get_product_by_page',
            like_str: $.trim($("#search_product_like_str").val()),
        });

    });
    //清空查询
    $('#refresh_btn_product').unbind('click').bind('click', function () {
        $('#search_product_like_str').val('');

        $("#tab_product").datagrid('load', {
            rnd: Math.random(),
            action: 'get_product_by_page',
            like_str: $.trim($("#search_product_like_str").val()),
        });
    });
}
  
function load_tab_trade(data) { 
    $("#tab_trade").datagrid({
        data: { total: data.length, rows: data }, 
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            { field: 'tr_name', title: '贸易条款', width: 100, align: 'left', editor: { type: 'text' } },
            { field: 'tr_cn_desc', title: '中文描述', width: 200, align: 'left', editor: { type: 'text' } },
        ]],
        toolbar: [{
            id: 'add_btn_tr', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_tr').linkbutton('enable');
                $('#cancel_btn_tr').linkbutton('enable');
                if (!$('#add_btn_tr').linkbutton('options').disabled) { $('#add_btn_tr').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_trade',
                    tr_name: '',
                    tr_cn_desc: ''
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_trade").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    tr_id: data.tr_id,
                                    tr_name: '',
                                    tr_cn_desc: '',
                                    tr_valid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_tr, function (i, bitem) {
                                if (bitem.tr_id == data.tr_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_tr.unshift({
                                    tr_id: data.tr_id,
                                    tr_name: '',
                                    tr_cn_desc: '',
                                    tr_valid: 1
                                });
                            }
                            $("#tab_trade").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_tr = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_tr', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_tr == undefined) {
                   return;
               }
               if (!$('#save_btn_tr').linkbutton('options').disabled) { $('#save_btn_tr').linkbutton('disable'); }
               if (!$('#cancel_btn_tr').linkbutton('options').disabled) { $('#cancel_btn_tr').linkbutton('disable'); }
               $('#add_btn_tr').linkbutton('enable');

               $('#tab_trade').datagrid('endEdit', editRow_tr);
           }
       }, '-',
       {
           id: 'cancel_btn_tr', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_tr == undefined) {
                   return;
               }
               if (!$('#save_btn_tr').linkbutton('options').disabled) { $('#save_btn_tr').linkbutton('disable'); }
               if (!$('#cancel_btn_tr').linkbutton('options').disabled) { $('#cancel_btn_tr').linkbutton('disable'); }
               $('#add_btn_tr').linkbutton('enable');

               $('#tab_trade').datagrid('cancelEdit', editRow_tr);
           }
       }, '-',
       {
           id: 'del_btn_tr', text: '删除', iconCls: 'icon-empty',
           handler: function () {
               if (editRow_tr != undefined) {
                   $('#tab_trade').datagrid('cancelEdit', editRow_tr);
               }
               var rows = $('#tab_trade').datagrid('getChecked');

               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }

               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var tr_ids = '';

                       $.each(rows, function (i, item) {
                           if (tr_ids.length == 0) {
                               tr_ids = item.tr_id;
                           } else {
                               tr_ids += ',' + item.tr_id;
                           }
                       });


                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_trade',
                           tr_ids: tr_ids
                       }, function (data) {
                           if (data.result == 1) { 
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_trade').datagrid('getRowIndex', row);
                                   $('#tab_trade').datagrid('deleteRow', rowindex);
                               });
                               var new_data_tr = [];

                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_tr, function (j, tag_row) {
                                       if (tag_row.tr_id == row.tr_id) {
                                           //data_tr.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_tr.push(tag_row);
                                       }
                                   });
                               });
                               data_tr = new_data_tr;
                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_trade" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_tr);
            editRow_tr = undefined; 
            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_trade',
                tr_id: row.tr_id,
                tr_name: row.tr_name,
                tr_cn_desc: row.tr_cn_desc,
                tr_valid: 1
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_tr, function (i, cur_row) {
                            if (cur_row.tr_id == row.tr_id) {
                                data_tr[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_trade').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                    } else {
                        //更新数据 
                        $.each(data_tr, function (i, cur_row) {
                            if (cur_row.tr_id == res_edit_row.tr_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_trade').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_trade').datagrid('beginEdit', index);
                        editRow_tr = index;
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            $('#save_btn_tr').linkbutton('enable');
            $('#cancel_btn_tr').linkbutton('enable');
            if (!$('#add_btn_tr').linkbutton('options').disabled) { $('#add_btn_tr').linkbutton('disable'); }

            res_edit_row_tr = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_tr = undefined;
            $('#add_btn_tr').linkbutton('enable');
            $('#cancel_btn_tr').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_tr == rowIndex) {
                $("#tab_trade").datagrid("endEdit", editRow_tr);
                editRow_tr == undefined;
            } else {

                if (editRow_tr != undefined && editRow_tr != rowIndex) {
                    $("#tab_trade").datagrid("endEdit", editRow_tr);
                }
                if (editRow_tr == undefined) {
                    $('#save_btn_tr').linkbutton('enable');
                    $('#cancel_btn_tr').linkbutton('enable');
                    if (!$('#add_btn_tr').linkbutton('options').disabled) { $('#add_btn_tr').linkbutton('disable'); }

                    editRow_tr = rowIndex;
                    $("#tab_trade").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_trade').unbind('keyup').bind('keyup', function (event) {
                if (editRow_tr != undefined) {
                    $('#tab_trade').datagrid('cancelEdit', editRow_tr);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_trade').datagrid('loadData', { total: data_tr.length, rows: data_tr });
                } else {
                    var new_arr = [];
                    $.each(data_tr, function (i, item) {
                        //统一转成大写比较
                        if ( (item.tr_name != undefined && item.tr_name.toUpperCase().indexOf(like_str) > -1) ||
                            (item.tr_cn_desc != undefined && item.tr_cn_desc.toUpperCase().indexOf(like_str) > -1)) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_trade').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }

            });


        }
    });
}

function load_tab_freight(data) {
    $("#tab_freight").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            { field: 'fr_name', title: '货运条款', width:100, align: 'left', editor: { type: 'text',  } },
            { field: 'fr_cn_desc', title: '中文描述', width: 200, align: 'left', editor: { type: 'text', } },
        ]],
        toolbar: [{
            id: 'add_btn_fr', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_fr').linkbutton('enable');
                $('#cancel_btn_fr').linkbutton('enable');
                if (!$('#add_btn_fr').linkbutton('options').disabled) { $('#add_btn_fr').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_freight',
                    fr_name: '',
                    fr_cn_desc: ''
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_freight").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    fr_id: data.fr_id,
                                    fr_name: '',
                                    fr_cn_desc: '',
                                    fr_valid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_fr, function (i, bitem) {
                                if (bitem.fr_id == data.fr_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_fr.unshift({
                                    fr_id: data.fr_id,
                                    fr_name: '',
                                    fr_cn_desc: '',
                                    fr_valid: 1
                                });
                            }
                            $("#tab_freight").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_fr = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_fr', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_fr == undefined) {
                   return;
               }
               if (!$('#save_btn_fr').linkbutton('options').disabled) { $('#save_btn_fr').linkbutton('disable'); }
               if (!$('#cancel_btn_fr').linkbutton('options').disabled) { $('#cancel_btn_fr').linkbutton('disable'); }
               $('#add_btn_fr').linkbutton('enable');

               $('#tab_freight').datagrid('endEdit', editRow_fr);
           }
       }, '-',
       {
           id: 'cancel_btn_fr', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_fr == undefined) {
                   return;
               }
               if (!$('#save_btn_fr').linkbutton('options').disabled) { $('#save_btn_fr').linkbutton('disable'); }
               if (!$('#cancel_btn_fr').linkbutton('options').disabled) { $('#cancel_btn_fr').linkbutton('disable'); }
               $('#add_btn_fr').linkbutton('enable');

               $('#tab_freight').datagrid('cancelEdit', editRow_fr);
           }
       }, '-',
       {
           id: 'del_btn_fr', text: '删除', iconCls: 'icon-empty',
           handler: function () {
               if (editRow_fr != undefined) {
                   $('#tab_freight').datagrid('cancelEdit', editRow_fr);
               }
               var rows = $('#tab_freight').datagrid('getChecked');

               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }

               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var fr_ids = '';

                       $.each(rows, function (i, item) {
                           if (fr_ids.length == 0) {
                               fr_ids = item.fr_id;
                           } else {
                               fr_ids += ',' + item.fr_id;
                           }
                       });


                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_freight',
                           fr_ids: fr_ids
                       }, function (data) {
                           if (data.result == 1) { 
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_freight').datagrid('getRowIndex', row);
                                   $('#tab_freight').datagrid('deleteRow', rowindex);
                               });
                               var new_data_fr = [];
                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_fr, function (j, tag_row) {
                                       if (tag_row.fr_id == row.fr_id) {
                                           //data_fr.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_fr.push(tag_row);
                                       }
                                   });
                               });
                               data_fr = new_data_fr;
                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_freight" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_fr);
            editRow_fr = undefined; 
            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_freight',
                fr_id: row.fr_id,
                fr_name: row.fr_name,
                fr_cn_desc: row.fr_cn_desc,
                fr_valid: 1
            }, function (data) {
                 
                //$.messager.progress('close');//处理完成之后关闭 
                if (data.result == 1) {
                    //更新数据 
                    $.each(data_fr, function (i, cur_row) {
                        if (cur_row.fr_id == row.fr_id) {
                            data_fr[i] = row;
                        }
                    });
                    //然后进行行更新 
                    $('#tab_freight').datagrid('updateRow', {
                        index: index,
                        row: row
                    });
                } else {
                    //更新数据 
                    $.each(data_fr, function (i, cur_row) {
                        if (cur_row.fr_id == res_edit_row.fr_id) {
                            cur_row = res_edit_row;
                        }
                    });
                    //然后进行行更新 
                    $('#tab_freight').datagrid('updateRow', {
                        index: index,
                        row: res_edit_row
                    });

                    $('#tab_freight').datagrid('beginEdit', index);
                    editRow_fr = index;
                    $.messager.alert('错误提示', data.msg, 'error');
                }
                 
            }, false);
        },
        onBeforeEdit: function (index, row) {
            $('#save_btn_fr').linkbutton('enable');
            $('#cancel_btn_fr').linkbutton('enable');
            if (!$('#add_btn_fr').linkbutton('options').disabled) { $('#add_btn_fr').linkbutton('disable'); }

            res_edit_row_fr = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_fr = undefined;
            $('#add_btn_fr').linkbutton('enable');
            $('#cancel_btn_fr').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_fr == rowIndex) {
                $("#tab_freight").datagrid("endEdit", editRow_fr);
                editRow_fr == undefined;
            } else {

                if (editRow_fr != undefined && editRow_fr != rowIndex) {
                    $("#tab_freight").datagrid("endEdit", editRow_fr);
                }
                if (editRow_fr == undefined) {
                    $('#save_btn_fr').linkbutton('enable');
                    $('#cancel_btn_fr').linkbutton('enable');
                    if (!$('#add_btn_fr').linkbutton('options').disabled) { $('#add_btn_fr').linkbutton('disable'); }

                    editRow_fr = rowIndex;
                    $("#tab_freight").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_freight').unbind('keyup').bind('keyup', function (event) {
                if (editRow_fr != undefined) {
                    $('#tab_freight').datagrid('cancelEdit', editRow_fr);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_freight').datagrid('loadData', { total: data_fr.length, rows: data_fr });
                } else {
                    var new_arr = [];
                    $.each(data_fr, function (i, item) {
                        //统一转成大写比较
                        if ((item.fr_name != undefined && item.fr_name.toUpperCase().indexOf(like_str) > -1) ||
                            (item.fr_cn_desc != undefined && item.fr_cn_desc.toUpperCase().indexOf(like_str) > -1)) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_freight').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }

            });


        }
    });
}

function load_tab_invoice(data) { 
    $("#tab_invoice").datagrid({
        data: { total: data.length, rows: data }, 
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        emptyMsg: '无法找到相关数据',
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            {
                field: 'in_name', title: '发票类型', align: 'left', width:130,
                editor: { type: 'text' }
            },
            {
                field: 'in_val', title: '税点值', align: 'left',width:100,
                editor: {
                    type: 'numberbox', options: { precision: 4 },
                },
                formatter: function (value, row, index) {
                    return value * 100 + '%'
                }
            },
        ]],
        toolbar: [
            {
                id: 'add_btn_iv', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等
                    $('#save_btn_iv').linkbutton('enable');
                    $('#cancel_btn_iv').linkbutton('enable');
                    if (!$('#add_btn_iv').linkbutton('options').disabled) { $('#add_btn_iv').linkbutton('disable'); }

                    post('../Ashx/sys_base.ashx', {
                        rnd: Math.random(),
                        action: 'insert_invoice',
                        in_name: '',
                        in_val: 0
                    }, function (data) {
                        if (data.result == 1) {
                            $("#tab_invoice").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    in_id: data.in_id,
                                    in_name: '',
                                    in_val: 0,
                                    in_valid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_iv, function (i, bitem) {
                                if (bitem.in_id == data.in_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_iv.unshift({
                                    in_id: data.in_id,
                                    in_name: '',
                                    in_val: 0,
                                    in_valid: 1
                                });
                            }
                            $("#tab_invoice").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_iv = 0;
                        }
                    }, true); 
                }
            }, '-',
            {
                id: 'save_btn_iv', text: '保存', iconCls: 'icon-save',
                handler: function () {
                    if (editRow_iv == undefined) {
                        return;
                    }
                    if (!$('#save_btn_iv').linkbutton('options').disabled) { $('#save_btn_iv').linkbutton('disable'); }
                    if (!$('#cancel_btn_iv').linkbutton('options').disabled) { $('#cancel_btn_iv').linkbutton('disable'); }
                    $('#add_btn_iv').linkbutton('enable');

                    $('#tab_invoice').datagrid('endEdit', editRow_iv);
                }
            }, '-',
            {
                id: 'cancel_btn_iv', text: '取消编辑', iconCls: 'icon-remove',
                handler: function () {
                    if (editRow_iv == undefined) {
                        return;
                    }
                    if (!$('#save_btn_iv').linkbutton('options').disabled) { $('#save_btn_iv').linkbutton('disable'); }
                    if (!$('#cancel_btn_iv').linkbutton('options').disabled) { $('#cancel_btn_iv').linkbutton('disable'); }
                    $('#add_btn_iv').linkbutton('enable');

                    $('#tab_invoice').datagrid('cancelEdit', editRow_iv);
                }
            }, '-',
            {
                id: 'del_btn_iv', text: '删除', iconCls: 'icon-empty',
                handler: function () {
                    if (editRow_iv != undefined) {
                        $('#tab_invoice').datagrid('cancelEdit', editRow_iv);
                    }
                    var rows = $('#tab_invoice').datagrid('getChecked');

                    if (rows.length == 0) {
                        $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                        return;
                    }

                    $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
                    function (r) {
                        if (r) {
                            var in_ids = '';

                            $.each(rows, function (i, item) {
                                if (in_ids.length == 0) {
                                    in_ids = item.in_id;
                                } else {
                                    in_ids += ',' + item.in_id;
                                }
                            });


                            post('../Ashx/sys_base.ashx', {
                                rnd: Math.random(),
                                action: 'delete_invoice',
                                in_ids: in_ids
                            }, function (data) {
                                if (data.result == 1) { 

                                    $.each(rows, function (i, row) {
                                        var rowindex = $('#tab_invoice').datagrid('getRowIndex', row);
                                        $('#tab_invoice').datagrid('deleteRow', rowindex);
                                    });
                                    var new_data_iv = [];
                                    //需要对cur_data进行删除
                                    $.each(rows, function (i, row) {
                                        //这个删除有问题 需要重新找索引
                                        $.each(data_iv, function (j, tag_row) {
                                            if (tag_row.iv_id == row.iv_id) {
                                                //data_iv.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                            } else {
                                                new_data_iv.push(tag_row);
                                            }
                                        });
                                    });
                                    data_iv = new_data_iv;
                                    $.messager.alert('提示', data.msg, 'info');
                                } else {
                                    $.messager.alert('错误', data.msg, 'error');
                                }
                            }, true);
                        }
                    });
                }
            }, '-',
           {
               iconCls: 'icon-query',
               text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_invoice" type="text"  />',
               handler: function () {
               }
           }
        ],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_iv);
            editRow_iv = undefined; 
            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_invoice',
                in_id: row.in_id,
                in_name: row.in_name,
                in_val: row.in_val
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_iv, function (i, cur_row) {
                            if (cur_row.in_id == row.in_id) {
                                data_iv[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_invoice').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                    } else {
                        //更新数据 
                        $.each(data_iv, function (i, cur_row) {
                            if (cur_row.in_id == res_edit_row.in_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_invoice').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_invoice').datagrid('beginEdit', index);
                        editRow_iv = index;
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);

        },
        onBeforeEdit: function (index, row) {
            if (editRow_iv != index) {
                if (editRow_iv != undefined) {
                    $('#tab_invoice').datagrid('endEdit', editRow_iv);
                    editRow_iv = index;
                }
            }

            $('#save_btn_iv').linkbutton('enable');
            $('#cancel_btn_iv').linkbutton('enable');
            if (!$('#add_btn_iv').linkbutton('options').disabled) { $('#add_btn_iv').linkbutton('disable'); }

            res_edit_row_iv = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_iv = undefined;
            $('#add_btn_iv').linkbutton('enable');
            $('#cancel_btn_iv').linkbutton('disable');
        },
        onClickRow: function (rowIndex, rowData) {
            if (editRow_iv == rowIndex) {
                $("#tab_invoice").datagrid("endEdit", editRow_iv);
                editRow_iv == undefined;
            } else {
                if (editRow_iv != undefined && editRow_iv != rowIndex) {
                    $("#tab_invoice").datagrid("endEdit", editRow_iv);
                }
                //双击开启编辑行
                if (editRow_iv == undefined) {
                    $('#save_btn_iv').linkbutton('enable');
                    $('#cancel_btn_iv').linkbutton('enable');
                    if (!$('#add_btn_iv').linkbutton('options').disabled) { $('#add_btn_iv').linkbutton('disable'); }

                    editRow_iv = rowIndex;
                    $("#tab_invoice").datagrid("beginEdit", rowIndex);

                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_invoice').unbind('keyup').bind('keyup', function (event) {
                if (editRow_iv != undefined) {
                    $('#tab_invoice').datagrid('cancelEdit', editRow_iv);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_invoice').datagrid('loadData', { total: data_iv.length, rows: data_iv });
                } else {
                    var new_arr = [];
                    $.each(data_iv, function (i, item) {
                        //统一转成大写比较
                        if (item.in_name != undefined && item.in_name.toUpperCase().indexOf(like_str) > -1 ) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_invoice').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }

            });

        }
    })
}

function load_tab_ship_company(data) { 
    $("#tab_ship_company").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        remoteSort: false,
        fitColumns: false,
        singleSelect: false,
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        emptyMsg: '无法找到相关数据',
        columns: [[
            {
                field: 'check_id', title: '', width: 40, checkbox: true
            },
            {
                field: 'sh_cod', title: '代码', width: 140, sortable: true,
                editor: { type: 'text' }
            },
            {
                field: 'sh_name', title: '船公司', width: 200, sortable: true,
                editor: { type: 'text' }
            }
        ]],
        toolbar: [{
            id: 'add_btn_sc', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_sc').linkbutton('enable');
                $('#cancel_btn_sc').linkbutton('enable');
                if (!$('#add_btn_sc').linkbutton('options').disabled) { $('#add_btn_sc').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_ship_company',
                    sh_name: '',
                    sh_cod: ''
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_ship_company").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    sh_id: data.sh_id,
                                    sh_name: '',
                                    sh_cod: '',
                                    sh_valid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_sc, function (i, bitem) {
                                if (bitem.sh_id == data.sh_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_sc.unshift({
                                    sh_id: data.sh_id,
                                    sh_name: '',
                                    sh_cod: '',
                                    sh_valid: 1
                                }); 
                            }

                            $("#tab_ship_company").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_sc = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_sc', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_sc == undefined) {
                   return;
               }
               if (!$('#save_btn_sc').linkbutton('options').disabled) { $('#save_btn_sc').linkbutton('disable'); }
               if (!$('#cancel_btn_sc').linkbutton('options').disabled) { $('#cancel_btn_sc').linkbutton('disable'); }
               $('#add_btn_sc').linkbutton('enable');

               $('#tab_ship_company').datagrid('endEdit', editRow_sc);
           }
       }, '-',
       {
           id: 'cancel_btn_sc', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_sc == undefined) {
                   return;
               }
               if (!$('#save_btn_sc').linkbutton('options').disabled) { $('#save_btn_sc').linkbutton('disable'); }
               if (!$('#cancel_btn_sc').linkbutton('options').disabled) { $('#cancel_btn_sc').linkbutton('disable'); }
               $('#add_btn_sc').linkbutton('enable');

               $('#tab_ship_company').datagrid('cancelEdit', editRow_sc);
           }
       }, '-',
       {
           id: 'del_btn_sc', text: '删除', iconCls: 'icon-empty',
           handler: function () { 
               
               if (editRow_sc != undefined) { 
                   $('#tab_ship_company').datagrid('cancelEdit', editRow_sc);
               } 

               var rows = $('#tab_ship_company').datagrid('getChecked'); 
               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               } 
               if (editRow_sc != undefined) {
                   $("#tab_ship_company").datagrid("endEdit", editRow_sc);
                   editRow_sc == undefined;
               } 
               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var sh_ids = '';

                       $.each(rows, function (i, item) {
                           if (sh_ids.length == 0) {
                               sh_ids = item.sh_id;
                           } else {
                               sh_ids += ',' + item.sh_id;
                           }
                       }); 

                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_ship_company',
                           sh_ids: sh_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_ship_company').datagrid('getRowIndex', row);
                                   $('#tab_ship_company').datagrid('deleteRow', rowindex);
                               });
                               var new_data_sc = [];
                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_sc, function (j, tag_row) {
                                       if (tag_row.sh_id == row.sh_id) {
                                           //data_sc.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_sc.push(tag_row);
                                       }
                                   });
                               });
                               data_sc = new_data_sc;

                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_ship_company" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row  = $.extend(true, {}, res_edit_row_sc);
            editRow_sc = undefined;
            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_ship_company',
                sh_id: row.sh_id,
                sh_name: row.sh_name,
                sh_cod: row.sh_cod
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                     
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_sc, function (i, cur_row) {
                            if (cur_row.sh_id == row.sh_id) {
                                data_sc[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_ship_company').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                        
                    } else {
                       
                        //更新数据 
                        $.each(data_sc, function (i, cur_row) {
                            if (cur_row.sh_id == res_edit_row.sh_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_ship_company').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });
                         
                        $('#tab_ship_company').datagrid('beginEdit', index);
                        
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) { 
            if (editRow_sc != index) {
                if (editRow_sc != undefined) {
                    $('#tab_ship_company').datagrid('endEdit', editRow_sc);
                    editRow_sc = index;
                }
            }

            $('#save_btn_sc').linkbutton('enable');
            $('#cancel_btn_sc').linkbutton('enable');
            if (!$('#add_btn_sc').linkbutton('options').disabled) { $('#add_btn_sc').linkbutton('disable'); }

            res_edit_row_sc = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_sc = undefined;
            $('#add_btn_sc').linkbutton('enable');
            $('#cancel_btn_sc').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_sc == rowIndex) {
                $("#tab_ship_company").datagrid("endEdit", editRow_sc);
                editRow_sc == undefined;
            } else {

                if (editRow_sc != undefined && editRow_sc != rowIndex) {
                    $("#tab_ship_company").datagrid("endEdit", editRow_sc);
                }
                if (editRow_sc == undefined) {
                    $('#save_btn_sc').linkbutton('enable');
                    $('#cancel_btn_sc').linkbutton('enable');
                    if (!$('#add_btn_sc').linkbutton('options').disabled) { $('#add_btn_sc').linkbutton('disable'); }

                    editRow_sc = rowIndex;
                    $("#tab_ship_company").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_ship_company').unbind('keyup').bind('keyup', function (event) {
                if (editRow_sc != undefined) {
                    $('#tab_ship_company').datagrid('cancelEdit', editRow_sc);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_ship_company').datagrid('loadData', { total: data_sc.length, rows: data_sc });
                } else {
                    var new_arr = [];
                    $.each(data_sc, function (i, item) {
                        //统一转成大写比较
                        if ((item.sh_name != undefined && item.sh_name.toUpperCase().indexOf(like_str) > -1) ||
                            (item.sh_cod != undefined && item.sh_cod.toUpperCase().indexOf(like_str) > -1)) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_ship_company').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }

            });


        }
    });
}

function load_tab_voyage_line(data) {
    $("#tab_voyage_line").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        remoteSort: false,
        fitColumns: false,
        singleSelect: false,
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        emptyMsg: '无法找到相关数据',
        columns: [[
            {
                field: 'check_id', title: '', width: 40, checkbox: true
            },
            {
                field: 'vl_code', title: '代码', width: 140, sortable: true,
                editor: { type: 'text' }
            },
            {
                field: 'vl_desc', title: '航线描述', width: 200, sortable: true,
                editor: { type: 'text' }
            }
        ]],
        toolbar: [{
            id: 'add_btn_vl', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_vl').linkbutton('enable');
                $('#cancel_btn_vl').linkbutton('enable');
                if (!$('#add_btn_vl').linkbutton('options').disabled) { $('#add_btn_vl').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_voyage_line',
                    vl_desc: '',
                    vl_code: ''
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_voyage_line").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    vl_id: data.vl_id,
                                    vl_desc: '',
                                    vl_code: '',
                                    vl_valid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_vl, function (i, bitem) {
                                if (bitem.vl_id == data.vl_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_vl.unshift({
                                    vl_id: data.vl_id,
                                    vl_desc: '',
                                    vl_code: '',
                                    vl_valid: 1
                                });
                            }

                            $("#tab_voyage_line").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_vl = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_vl', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_vl == undefined) {
                   return;
               }
               if (!$('#save_btn_vl').linkbutton('options').disabled) { $('#save_btn_vl').linkbutton('disable'); }
               if (!$('#cancel_btn_vl').linkbutton('options').disabled) { $('#cancel_btn_vl').linkbutton('disable'); }
               $('#add_btn_vl').linkbutton('enable');

               $('#tab_voyage_line').datagrid('endEdit', editRow_vl);
           }
       }, '-',
       {
           id: 'cancel_btn_vl', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_vl == undefined) {
                   return;
               }
               if (!$('#save_btn_vl').linkbutton('options').disabled) { $('#save_btn_vl').linkbutton('disable'); }
               if (!$('#cancel_btn_vl').linkbutton('options').disabled) { $('#cancel_btn_vl').linkbutton('disable'); }
               $('#add_btn_vl').linkbutton('enable');

               $('#tab_voyage_line').datagrid('cancelEdit', editRow_vl);
           }
       }, '-',
       {
           id: 'del_btn_vl', text: '删除', iconCls: 'icon-empty',
           handler: function () {

               if (editRow_vl != undefined) {
                   $('#tab_voyage_line').datagrid('cancelEdit', editRow_vl);
               }

               var rows = $('#tab_voyage_line').datagrid('getChecked');
               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }
               if (editRow_vl != undefined) {
                   $("#tab_voyage_line").datagrid("endEdit", editRow_vl);
                   editRow_vl == undefined;
               }
               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var vl_ids = '';

                       $.each(rows, function (i, item) {
                           if (vl_ids.length == 0) {
                               vl_ids = item.vl_id;
                           } else {
                               vl_ids += ',' + item.vl_id;
                           }
                       });

                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_voyage_line',
                           vl_ids: vl_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_voyage_line').datagrid('getRowIndex', row);
                                   $('#tab_voyage_line').datagrid('deleteRow', rowindex);
                               });
                               var new_data_vl = [];
                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_vl, function (j, tag_row) {
                                       if (tag_row.vl_id == row.vl_id) {
                                           //data_vl.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_vl.push(tag_row);
                                       }
                                   });
                               });

                               data_vl = new_data_vl;

                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_voyage_line" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_rows_vl);
            editRow_vl = undefined;
            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_voyage_line',
                vl_id: row.vl_id,
                vl_desc: row.vl_desc,
                vl_code: row.vl_code
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 

                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_vl, function (i, cur_row) {
                            if (cur_row.vl_id == row.vl_id) {
                                data_vl[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_voyage_line').datagrid('updateRow', {
                            index: index,
                            row: row
                        });

                    } else {

                        //更新数据 
                        $.each(data_vl, function (i, cur_row) {
                            if (cur_row.vl_id == res_edit_row.vl_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_voyage_line').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_voyage_line').datagrid('beginEdit', index);

                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            if (editRow_vl != index) {
                if (editRow_vl != undefined) {
                    $('#tab_voyage_line').datagrid('endEdit', editRow_vl);
                    editRow_vl = index;
                }
            }

            $('#save_btn_vl').linkbutton('enable');
            $('#cancel_btn_vl').linkbutton('enable');
            if (!$('#add_btn_vl').linkbutton('options').disabled) { $('#add_btn_vl').linkbutton('disable'); }

            res_edit_rows_vl = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_vl = undefined;
            $('#add_btn_vl').linkbutton('enable');
            $('#cancel_btn_vl').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_vl == rowIndex) {
                $("#tab_voyage_line").datagrid("endEdit", editRow_vl);
                editRow_vl == undefined;
            } else {

                if (editRow_vl != undefined && editRow_vl != rowIndex) {
                    $("#tab_voyage_line").datagrid("endEdit", editRow_vl);
                }
                if (editRow_vl == undefined) {
                    $('#save_btn_vl').linkbutton('enable');
                    $('#cancel_btn_vl').linkbutton('enable');
                    if (!$('#add_btn_vl').linkbutton('options').disabled) { $('#add_btn_vl').linkbutton('disable'); }

                    editRow_vl = rowIndex;
                    $("#tab_voyage_line").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_voyage_line').unbind('keyup').bind('keyup', function (event) {
                if (editRow_vl != undefined) {
                    $('#tab_voyage_line').datagrid('cancelEdit', editRow_vl);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_voyage_line').datagrid('loadData', { total: data_vl.length, rows: data_vl });
                } else {
                    var new_arr = [];
                    $.each(data_vl, function (i, item) {
                        //统一转成大写比较
                        if ((item.vl_desc != undefined && item.vl_desc.toUpperCase().indexOf(like_str) > -1) ||
                            (item.vl_code != undefined && item.vl_code.toUpperCase().indexOf(like_str) > -1)) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_voyage_line').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }

            });


        }
    });
}

//计量单位
function load_tab_unit(data) {
    $("#tab_unit").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            { field: 'u_desc', title: '货物名称', width: 400, align: 'left', editor: { type: 'text', } },
        ]],
        toolbar: [{
            id: 'add_btn_un', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_un').linkbutton('enable');
                $('#cancel_btn_un').linkbutton('enable');
                if (!$('#add_btn_un').linkbutton('options').disabled) { $('#add_btn_un').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_unit',
                    u_desc: '',
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_unit").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    u_id: data.u_id,
                                    u_desc: '',
                                    pr_vallid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_un, function (i, bitem) {
                                if (bitem.u_id == data.u_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_un.unshift({
                                    u_id: data.u_id,
                                    u_desc: '',
                                    pr_vallid: 1
                                });
                            }
                            $("#tab_unit").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_un = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_un', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_un == undefined) {
                   return;
               }
               if (!$('#save_btn_un').linkbutton('options').disabled) { $('#save_btn_un').linkbutton('disable'); }
               if (!$('#cancel_btn_un').linkbutton('options').disabled) { $('#cancel_btn_un').linkbutton('disable'); }
               $('#add_btn_un').linkbutton('enable');

               $('#tab_unit').datagrid('endEdit', editRow_un);
           }
       }, '-',
       {
           id: 'cancel_btn_un', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_un == undefined) {
                   return;
               }
               if (!$('#save_btn_un').linkbutton('options').disabled) { $('#save_btn_un').linkbutton('disable'); }
               if (!$('#cancel_btn_un').linkbutton('options').disabled) { $('#cancel_btn_un').linkbutton('disable'); }
               $('#add_btn_un').linkbutton('enable');

               $('#tab_unit').datagrid('cancelEdit', editRow_un);
           }
       }, '-',
       {
           id: 'del_btn_un', text: '删除', iconCls: 'icon-empty',
           handler: function () {

               if (editRow_un != undefined) {
                   $('#tab_unit').datagrid('cancelEdit', editRow_un);
               }

               var rows = $('#tab_unit').datagrid('getChecked');

               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }

               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var u_ids = '';

                       $.each(rows, function (i, item) {
                           if (u_ids.length == 0) {
                               u_ids = item.u_id;
                           } else {
                               u_ids += ',' + item.u_id;
                           }
                       });


                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_unit',
                           u_ids: u_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_unit').datagrid('getRowIndex', row);
                                   $('#tab_unit').datagrid('deleteRow', rowindex);
                               });
                               var new_data_un = [];

                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_un, function (j, tag_row) {
                                       if (tag_row.u_id == row.u_id) {
                                          // data_un.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_un.push(tag_row);
                                       }
                                   });
                               });
                               data_un = new_data_un;

                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_unit" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_un);
            editRow_un = undefined;

            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_unit',
                u_id: row.u_id,
                u_desc: row.u_desc,
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_un, function (i, cur_row) {
                            if (cur_row.u_id == row.u_id) {
                                data_un[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_unit').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                    } else {
                        //更新数据 
                        $.each(data_un, function (i, cur_row) {
                            if (cur_row.u_id == res_edit_row.u_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_unit').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_unit').datagrid('beginEdit', index);
                        editRow_un = index;
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            $('#save_btn_un').linkbutton('enable');
            $('#cancel_btn_un').linkbutton('enable');
            if (!$('#add_btn_un').linkbutton('options').disabled) { $('#add_btn_un').linkbutton('disable'); }

            res_edit_row_un = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_un = undefined;
            $('#add_btn_un').linkbutton('enable');
            $('#cancel_btn_un').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_un == rowIndex) {
                $("#tab_unit").datagrid("endEdit", editRow_un);
                editRow_un == undefined;
            } else {

                if (editRow_un != undefined && editRow_un != rowIndex) {
                    $("#tab_unit").datagrid("endEdit", editRow_un);
                }
                if (editRow_un == undefined) {
                    $('#save_btn_un').linkbutton('enable');
                    $('#cancel_btn_un').linkbutton('enable');
                    if (!$('#add_btn_un').linkbutton('options').disabled) { $('#add_btn_un').linkbutton('disable'); }

                    editRow_un = rowIndex;
                    $("#tab_unit").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_unit').unbind('keyup').bind('keyup', function (event) {
                if (editRow_un != undefined) {
                    $('#tab_unit').datagrid('cancelEdit', editRow_un);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_unit').datagrid('loadData', { total: data_un.length, rows: data_un });
                } else {
                    var new_arr = [];
                    $.each(data_un, function (i, item) {
                        //统一转成大写比较
                        if (item.u_desc != undefined && item.u_desc.toUpperCase().indexOf(like_str) > -1) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_unit').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }
            });
        }
    });
}
//联运方式
function load_tab_carriage_typ(data) {
    $("#tab_carriage_typ").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            { field: 'ca_desc', title: '货物名称', width: 400, align: 'left', editor: { type: 'text', } },
        ]],
        toolbar: [{
            id: 'add_btn_ca', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_ca').linkbutton('enable');
                $('#cancel_btn_ca').linkbutton('enable');
                if (!$('#add_btn_ca').linkbutton('options').disabled) { $('#add_btn_ca').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_carriage_typ',
                    ca_desc: '',
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_carriage_typ").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    ca_id: data.ca_id,
                                    ca_desc: '',
                                    ca_valid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_ca, function (i, bitem) {
                                if (bitem.ca_id == data.ca_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_ca.unshift({
                                    ca_id: data.ca_id,
                                    ca_desc: '',
                                    ca_valid: 1
                                });
                            }
                            $("#tab_carriage_typ").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_ca = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_ca', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_ca == undefined) {
                   return;
               }
               if (!$('#save_btn_ca').linkbutton('options').disabled) { $('#save_btn_ca').linkbutton('disable'); }
               if (!$('#cancel_btn_ca').linkbutton('options').disabled) { $('#cancel_btn_ca').linkbutton('disable'); }
               $('#add_btn_ca').linkbutton('enable');

               $('#tab_carriage_typ').datagrid('endEdit', editRow_ca);
           }
       }, '-',
       {
           id: 'cancel_btn_ca', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_ca == undefined) {
                   return;
               }
               if (!$('#save_btn_ca').linkbutton('options').disabled) { $('#save_btn_ca').linkbutton('disable'); }
               if (!$('#cancel_btn_ca').linkbutton('options').disabled) { $('#cancel_btn_ca').linkbutton('disable'); }
               $('#add_btn_ca').linkbutton('enable');

               $('#tab_carriage_typ').datagrid('cancelEdit', editRow_ca);
           }
       }, '-',
       {
           id: 'del_btn_ca', text: '删除', iconCls: 'icon-empty',
           handler: function () {

               if (editRow_ca != undefined) {
                   $('#tab_carriage_typ').datagrid('cancelEdit', editRow_ca);
               }

               var rows = $('#tab_carriage_typ').datagrid('getChecked');

               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }

               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var ca_ids = '';

                       $.each(rows, function (i, item) {
                           if (ca_ids.length == 0) {
                               ca_ids = item.ca_id;
                           } else {
                               ca_ids += ',' + item.ca_id;
                           }
                       });


                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_carriage_typ',
                           ca_ids: ca_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_carriage_typ').datagrid('getRowIndex', row);
                                   $('#tab_carriage_typ').datagrid('deleteRow', rowindex);
                               });
                               var new_data_ca = [];
                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_ca, function (j, tag_row) {
                                       if (tag_row.ca_id == row.ca_id) {
                                           //data_ca.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_ca.push(tag_row);
                                       }
                                   });
                               });
                               data_ca = new_data_ca;
                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_carriage_typ" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_ca);
            editRow_ca = undefined;

            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_carriage_typ',
                ca_id: row.ca_id,
                ca_desc: row.ca_desc,
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_ca, function (i, cur_row) {
                            if (cur_row.ca_id == row.ca_id) {
                                data_ca[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_carriage_typ').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                    } else {
                        //更新数据 
                        $.each(data_ca, function (i, cur_row) {
                            if (cur_row.ca_id == res_edit_row.ca_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_carriage_typ').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_carriage_typ').datagrid('beginEdit', index);
                        editRow_ca = index;
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            $('#save_btn_ca').linkbutton('enable');
            $('#cancel_btn_ca').linkbutton('enable');
            if (!$('#add_btn_ca').linkbutton('options').disabled) { $('#add_btn_ca').linkbutton('disable'); }

            res_edit_row_ca = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_ca = undefined;
            $('#add_btn_ca').linkbutton('enable');
            $('#cancel_btn_ca').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_ca == rowIndex) {
                $("#tab_carriage_typ").datagrid("endEdit", editRow_ca);
                editRow_ca == undefined;
            } else {

                if (editRow_ca != undefined && editRow_ca != rowIndex) {
                    $("#tab_carriage_typ").datagrid("endEdit", editRow_ca);
                }
                if (editRow_ca == undefined) {
                    $('#save_btn_ca').linkbutton('enable');
                    $('#cancel_btn_ca').linkbutton('enable');
                    if (!$('#add_btn_ca').linkbutton('options').disabled) { $('#add_btn_ca').linkbutton('disable'); }

                    editRow_ca = rowIndex;
                    $("#tab_carriage_typ").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_carriage_typ').unbind('keyup').bind('keyup', function (event) {
                if (editRow_ca != undefined) {
                    $('#tab_carriage_typ').datagrid('cancelEdit', editRow_ca);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_carriage_typ').datagrid('loadData', { total: data_ca.length, rows: data_ca });
                } else {
                    var new_arr = [];
                    $.each(data_ca, function (i, item) {
                        //统一转成大写比较
                        if (item.ca_desc != undefined && item.ca_desc.toUpperCase().indexOf(like_str) > -1) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_carriage_typ').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }
            });
        }
    });
}
//提单类型
function load_tab_bill_typ(data) {
    $("#tab_bill_typ").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            { field: 'b_desc', title: '提单类型', width: 400, align: 'left', editor: { type: 'text', } },
        ]],
        toolbar: [{
            id: 'add_btn_bl', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_bl').linkbutton('enable');
                $('#cancel_btn_bl').linkbutton('enable');
                if (!$('#add_btn_bl').linkbutton('options').disabled) { $('#add_btn_bl').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_bill_typ',
                    b_desc: '',
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_bill_typ").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    b_id: data.b_id,
                                    b_desc: '',
                                    b_valid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_bl, function (i, bitem) {
                                if (bitem.b_id == data.b_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_bl.unshift({
                                    b_id: data.b_id,
                                    b_desc: '',
                                    b_valid: 1
                                });
                            }
                            $("#tab_bill_typ").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editrow_bl = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_bl', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editrow_bl == undefined) {
                   return;
               }
               if (!$('#save_btn_bl').linkbutton('options').disabled) { $('#save_btn_bl').linkbutton('disable'); }
               if (!$('#cancel_btn_bl').linkbutton('options').disabled) { $('#cancel_btn_bl').linkbutton('disable'); }
               $('#add_btn_bl').linkbutton('enable');

               $('#tab_bill_typ').datagrid('endEdit', editrow_bl);
           }
       }, '-',
       {
           id: 'cancel_btn_bl', text: '取消编辑', iconCls: 'icon-close',
           handler: function () {
               if (editrow_bl == undefined) {
                   return;
               }
               if (!$('#save_btn_bl').linkbutton('options').disabled) { $('#save_btn_bl').linkbutton('disable'); }
               if (!$('#cancel_btn_bl').linkbutton('options').disabled) { $('#cancel_btn_bl').linkbutton('disable'); }
               $('#add_btn_bl').linkbutton('enable');

               $('#tab_bill_typ').datagrid('cancelEdit', editrow_bl);
           }
       }, '-',
       {
           id: 'del_btn_bl', text: '删除', iconCls: 'icon-trash',
           handler: function () {

               if (editrow_bl != undefined) {
                   $('#tab_bill_typ').datagrid('cancelEdit', editrow_bl);
               }

               var rows = $('#tab_bill_typ').datagrid('getChecked');

               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }

               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var b_ids = '';

                       $.each(rows, function (i, item) {
                           if (b_ids.length == 0) {
                               b_ids = item.b_id;
                           } else {
                               b_ids += ',' + item.b_id;
                           }
                       });


                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_bill_typ',
                           b_ids: b_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_bill_typ').datagrid('getRowIndex', row);
                                   $('#tab_bill_typ').datagrid('deleteRow', rowindex);
                               });
                               var new_data_bl = [];
                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_bl, function (j, tag_row) {
                                       if (tag_row.b_id == row.b_id) {
                                           //data_bl.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_bl.push(tag_row);
                                       }
                                   });
                               });
                               data_bl = new_data_bl;
                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_bill_typ" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_bl);
            editrow_bl = undefined;

            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_bill_typ',
                b_id: row.b_id,
                b_desc: row.b_desc,
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_bl, function (i, cur_row) {
                            if (cur_row.b_id == row.b_id) {
                                data_bl[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_bill_typ').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                    } else {
                        //更新数据 
                        $.each(data_bl, function (i, cur_row) {
                            if (cur_row.b_id == res_edit_row.b_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_bill_typ').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_bill_typ').datagrid('beginEdit', index);
                        editrow_bl = index;
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            $('#save_btn_bl').linkbutton('enable');
            $('#cancel_btn_bl').linkbutton('enable');
            if (!$('#add_btn_bl').linkbutton('options').disabled) { $('#add_btn_bl').linkbutton('disable'); }

            res_edit_row_bl = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editrow_bl = undefined;
            $('#add_btn_bl').linkbutton('enable');
            $('#cancel_btn_bl').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editrow_bl == rowIndex) {
                $("#tab_bill_typ").datagrid("endEdit", editrow_bl);
                editrow_bl == undefined;
            } else {

                if (editrow_bl != undefined && editrow_bl != rowIndex) {
                    $("#tab_bill_typ").datagrid("endEdit", editrow_bl);
                }
                if (editrow_bl == undefined) {
                    $('#save_btn_bl').linkbutton('enable');
                    $('#cancel_btn_bl').linkbutton('enable');
                    if (!$('#add_btn_bl').linkbutton('options').disabled) { $('#add_btn_bl').linkbutton('disable'); }

                    editrow_bl = rowIndex;
                    $("#tab_bill_typ").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_bill_typ').unbind('keyup').bind('keyup', function (event) {
                if (editrow_bl != undefined) {
                    $('#tab_bill_typ').datagrid('cancelEdit', editrow_bl);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_bill_typ').datagrid('loadData', { total: data_bl.length, rows: data_bl });
                } else {
                    var new_arr = [];
                    $.each(data_bl, function (i, item) {
                        //统一转成大写比较
                        if (item.b_desc != undefined && item.b_desc.toUpperCase().indexOf(like_str) > -1) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_bill_typ').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }
            });
        }
    });
}
//签单方式
function load_tab_sign_bill_typ(data) {
    $("#tab_sign_bill_typ").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: false,
        emptyMsg: '无法找到相关数据',
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            { field: 's_desc', title: '货物名称', width: 400, align: 'left', editor: { type: 'text', } },
        ]],
        toolbar: [{
            id: 'add_btn_sb', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_sb').linkbutton('enable');
                $('#cancel_btn_sb').linkbutton('enable');
                if (!$('#add_btn_sb').linkbutton('options').disabled) { $('#add_btn_sb').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_sign_bill_typ',
                    s_desc: '',
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_sign_bill_typ").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    s_id: data.s_id,
                                    s_desc: '',
                                    s_valid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_sb, function (i, bitem) {
                                if (bitem.s_id == data.s_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_sb.unshift({
                                    s_id: data.s_id,
                                    s_desc: '',
                                    s_valid: 1
                                });
                            }
                            $("#tab_sign_bill_typ").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_sb = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_sb', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_sb == undefined) {
                   return;
               }
               if (!$('#save_btn_sb').linkbutton('options').disabled) { $('#save_btn_sb').linkbutton('disable'); }
               if (!$('#cancel_btn_sb').linkbutton('options').disabled) { $('#cancel_btn_sb').linkbutton('disable'); }
               $('#add_btn_sb').linkbutton('enable');

               $('#tab_sign_bill_typ').datagrid('endEdit', editRow_sb);
           }
       }, '-',
       {
           id: 'cancel_btn_sb', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_sb == undefined) {
                   return;
               }
               if (!$('#save_btn_sb').linkbutton('options').disabled) { $('#save_btn_sb').linkbutton('disable'); }
               if (!$('#cancel_btn_sb').linkbutton('options').disabled) { $('#cancel_btn_sb').linkbutton('disable'); }
               $('#add_btn_sb').linkbutton('enable');

               $('#tab_sign_bill_typ').datagrid('cancelEdit', editRow_sb);
           }
       }, '-',
       {
           id: 'del_btn_sb', text: '删除', iconCls: 'icon-empty',
           handler: function () {

               if (editRow_sb != undefined) {
                   $('#tab_sign_bill_typ').datagrid('cancelEdit', editRow_sb);
               }

               var rows = $('#tab_sign_bill_typ').datagrid('getChecked');

               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }

               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var s_ids = '';

                       $.each(rows, function (i, item) {
                           if (s_ids.length == 0) {
                               s_ids = item.s_id;
                           } else {
                               s_ids += ',' + item.s_id;
                           }
                       });


                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_sign_bill_typ',
                           s_ids: s_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_sign_bill_typ').datagrid('getRowIndex', row);
                                   $('#tab_sign_bill_typ').datagrid('deleteRow', rowindex);
                               });
                               var new_data_sb = [];
                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_sb, function (j, tag_row) {
                                       if (tag_row.s_id == row.s_id) {
                                           //data_sb.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_sb.push(tag_row);
                                       }
                                   });
                               });
                               data_sb = new_data_sb;
                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_sign_bill_typ" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_row_sb);
            editRow_sb = undefined;

            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_sign_bill_typ',
                s_id: row.s_id,
                s_desc: row.s_desc,
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 
                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_sb, function (i, cur_row) {
                            if (cur_row.s_id == row.s_id) {
                                data_sb[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_sign_bill_typ').datagrid('updateRow', {
                            index: index,
                            row: row
                        });
                    } else {
                        //更新数据 
                        $.each(data_sb, function (i, cur_row) {
                            if (cur_row.s_id == res_edit_row.s_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_sign_bill_typ').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_sign_bill_typ').datagrid('beginEdit', index);
                        editRow_sb = index;
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            $('#save_btn_sb').linkbutton('enable');
            $('#cancel_btn_sb').linkbutton('enable');
            if (!$('#add_btn_sb').linkbutton('options').disabled) { $('#add_btn_sb').linkbutton('disable'); }

            res_edit_row_sb = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_sb = undefined;
            $('#add_btn_sb').linkbutton('enable');
            $('#cancel_btn_sb').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_sb == rowIndex) {
                $("#tab_sign_bill_typ").datagrid("endEdit", editRow_sb);
                editRow_sb == undefined;
            } else {

                if (editRow_sb != undefined && editRow_sb != rowIndex) {
                    $("#tab_sign_bill_typ").datagrid("endEdit", editRow_sb);
                }
                if (editRow_sb == undefined) {
                    $('#save_btn_sb').linkbutton('enable');
                    $('#cancel_btn_sb').linkbutton('enable');
                    if (!$('#add_btn_sb').linkbutton('options').disabled) { $('#add_btn_sb').linkbutton('disable'); }

                    editRow_sb = rowIndex;
                    $("#tab_sign_bill_typ").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_sign_bill_typ').unbind('keyup').bind('keyup', function (event) {
                if (editRow_sb != undefined) {
                    $('#tab_sign_bill_typ').datagrid('cancelEdit', editRow_sb);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_sign_bill_typ').datagrid('loadData', { total: data_sb.length, rows: data_sb });
                } else {
                    var new_arr = [];
                    $.each(data_sb, function (i, item) {
                        //统一转成大写比较
                        if (item.s_desc != undefined && item.s_desc.toUpperCase().indexOf(like_str) > -1) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_sign_bill_typ').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }
            });
        }
    });
}

//地址信息
function load_tab_place() {
    $("#tab_place").datagrid({
        url: '../Ashx/sys_base.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_place',
            like_str: $.trim($('#search_place_like_str').val()),
            pt_id: $('#serach_place_pl_typ').combobox('getValue')
        },
        method: 'post',
        singleSelect: false,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: true, //在DataGrid控件底部显示分页工具栏。 
        loadMsg: '数据正在加载，请耐心等待...',
        border: false,
        rownumbers: true,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        toolbar: '#tab_place_bar',
        fit: true,
        pageNumber: pageNumber,
        pageSize: pageSize,
        pageList: [30, 60, 120],
        checkbox: true,
        emptyMsg: '无法找到相关数值',
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'ck', title: 'ID', checkbox: true },
            { field: 'pl_typ_desc', title: '类型', width: 90, align: 'left', },
            { field: 'pl_code', title: '地址代码', width: 90, align: 'left', },
            { field: 'pl_name', title: '显示名', width: 400, align: 'left', },
            { field: 'pl_en_name', title: '备注名', width: 400, align: 'left', },
        ]],
        onDblClickRow: function (index, row) {
            $('#hid_pl_id').val(row.pl_id);
            $('#dlg_pl_typ').combobox('setValue',row.pl_typ);
            $('#dlg_pl_name').val(row.pl_name);
            $('#dlg_pl_en_name').val(row.pl_en_name);
            $('#dlg_pl_code').val(row.pl_code);

            $('#dlg_edit_place').dialog({
                title: '编辑地址信息',
                iconCls: 'icon-save',
                autoOpen: false,
                modal: true,
                width: 500,
                minheight: 450,
                buttons: [{
                    text: '保存',
                    iconCls: 'icon-save',
                    handler: function () {
                        var par = {
                            action: 'update_place',
                            pl_id: $('#hid_pl_id').val(),
                            pl_typ: $('#dlg_pl_typ').combobox('getValue'),
                            pl_name: $.trim($('#dlg_pl_name').val()),
                            pl_en_name: $.trim($('#dlg_pl_en_name').val()),
                            pl_code: $.trim($('#dlg_pl_code').val()),
                        };

                        if (isNaN(par.pl_typ)) {
                            $.messager.alert('错误提示', '错误:请选择正确的地址类型', 'error');
                            return;
                        }

                        if ((par.pl_name == undefined || par.pl_name.length == 0) &&
                            (par.pl_en_name == undefined || par.pl_en_name.length == 0) &&
                            (par.pl_code == undefined || par.pl_code.length == 0)) {
                            $.messager.alert('错误提示', '错误:地址信息不能全部是空值', 'error');
                            return;
                        }

                        post('../Ashx/sys_base.ashx', par, function (data) {
                            if (data.result == 1) {

                                $.messager.confirm('提示', data.msg + '是否继续编辑？',
                                    function (r) {
                                        if (r) {

                                        } else {
                                            $('#dlg_edit_place').dialog('close');

                                            var like_str = undefined;

                                            if (par.pl_name != undefined && par.pl_name.length > 0) {
                                                like_str = par.pl_name;
                                            } else {
                                                if (par.pl_en_name != undefined && par.pl_en_name.length > 0) {
                                                    like_str = par.pl_en_name;
                                                } else {
                                                    like_str = par.pl_code;
                                                }
                                            }
                                            $("#tab_place").datagrid('load', {
                                                rnd: Math.random(),
                                                action: 'get_place',
                                                like_str: like_str,
                                                pt_id: par.pl_typ
                                            });
                                        }
                                    }
                                );

                            } else {
                                $.messager.alert('错误提示', data.msg, 'error');
                            }
                        }, true);
                    }
                },
                {
                    text: '关闭',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $('#dlg_edit_place').dialog('close');
                    }
                }]
            }).dialog('open');
        }
    });

    $('#refresh_btn_place').unbind('click').bind('click', function () {
        $('#search_place_like_str').val('');
        $('#serach_place_pl_typ').combobox('setValue', '');

        $("#tab_place").datagrid('load', {
            rnd: Math.random(),
            action: 'get_place',
            like_str: $.trim($('#search_place_like_str').val()),
            pt_id: $('#serach_place_pl_typ').combobox('getValue')
        });
    });

    $('#query_btn_place').unbind('click').bind('click', function () {
        $("#tab_place").datagrid('load', {
            rnd: Math.random(),
            action: 'get_place',
            like_str: $.trim($('#search_place_like_str').val()),
            pt_id: $('#serach_place_pl_typ').combobox('getValue')
        });
    });

    $('#add_btn_place').unbind('click').bind('click', function () {
        $('#hid_pl_id').val('');

        $('#dlg_edit_place').dialog({
            title: '新增地址信息',
            iconCls: 'icon-save',
            autoOpen: false,
            modal: true,
            width: 500,
            minheight: 450,
            buttons: [{
                text: '保存',
                iconCls: 'icon-save',
                handler: function () {
                    var par = {
                        action: 'insert_place',
                        pl_typ: $('#dlg_pl_typ').combobox('getValue'),
                        pl_name: $.trim($('#dlg_pl_name').val()),
                        pl_en_name: $.trim($('#dlg_pl_en_name').val()),
                        pl_code: $.trim($('#dlg_pl_code').val()),
                    };

                    if (isNaN(par.pl_typ)) {
                        $.messager.alert('错误提示','错误:请选择正确的地址类型','error');
                        return;
                    }

                    if( (par.pl_name == undefined || par.pl_name.length == 0) && 
                        (par.pl_en_name == undefined || par.pl_en_name.length == 0) &&
                        (par.pl_code == undefined || par.pl_code.length == 0)) {
                        $.messager.alert('错误提示', '错误:地址信息不能全部是空值', 'error');
                        return;
                    }

                    post('../Ashx/sys_base.ashx', par, function (data) {
                        if (data.result == 1) {

                            $.messager.confirm('提示', data.msg + '是否继续添加？',
                                function (r) {
                                    if (r) {

                                    } else {
                                        $('#dlg_edit_place').dialog('close');

                                        var like_str = undefined;

                                        if (par.pl_name != undefined && par.pl_name.length > 0) {
                                            like_str = par.pl_name;
                                        } else {
                                            if (par.pl_en_name != undefined && par.pl_en_name.length > 0) {
                                                like_str = par.pl_en_name;
                                            } else {
                                                like_str = par.pl_code;
                                            }
                                        } 
                                        $("#tab_place").datagrid('load', {
                                            rnd: Math.random(),
                                            action: 'get_place',
                                            like_str: like_str,
                                            pt_id: par.pl_typ
                                        });
                                    }
                                }
                            );
                            
                        } else {
                            $.messager.alert('错误提示', data.msg, 'error');
                        }
                    }, true);
                }
            },
            {
                text: '关闭',
                iconCls: 'icon-cancel',
                handler: function () {
                    $('#dlg_edit_place').dialog('close');
                }
            }]
        }).dialog('open');
    });

    $('#delete_btn_place').unbind('click').bind('click', function () { 

        var del_rows = $("#tab_place").datagrid('getChecked');

        if (del_rows.length == 0) {
            $.messager.alert('错误提示','请选择要删除的数据','error');
            return;
        } 
        var pl_ids = '';

        $.each(del_rows,function(i,item){
            if(pl_ids.length == 0){
                pl_ids = item.pl_id;
            }else{
                pl_ids += ',' + item.pl_id;
            }
        });

        $.messager.confirm('删除提示', '确定要删除选择的' + del_rows.length + '行数据？',
        function (r) {
            if (r) {
                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'delete_place',
                    pl_ids: pl_ids
                }, function (data) {
                    if (data.result == 1) {
                        $("#tab_place").datagrid('load', {
                            rnd: Math.random(),
                            action: 'get_place',
                            like_str: $.trim($('#search_place_like_str').val()),
                            pt_id: $('#serach_place_pl_typ').combobox('getValue')
                        });
                        $.messager.alert('提示',data.msg,'info');
                    } else {
                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                },true);
            } 
        } );
                      
    });

    
}

//区域
function load_tab_area(data) {
    $("#tab_area_list").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        remoteSort: false,
        fitColumns: false,
        singleSelect: false,
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        emptyMsg: '无法找到相关数据',
        columns: [[
            {
                field: 'check_id', title: '', width: 40, checkbox: true
            },
            {
                field: 'area_desc', title: '地区名称', width: 100, sortable: true,
                editor: { type: 'text' }
            },
            { field: 'p_descs', title: '包含港口', width: 220, },
        ]],
        toolbar: [{
            id: 'add_btn_area', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等
                $('#save_btn_area').linkbutton('enable');
                $('#cancel_btn_area').linkbutton('enable');
                if (!$('#add_btn_area').linkbutton('options').disabled) { $('#add_btn_area').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_area',
                    area_desc: ''

                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_area_list").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    area_id: data.area_id,
                                    area_desc: '',
                                    area_valid: 1
                                }
                            });
                            var bhas = false;

                            $.each(data_area, function (i, bitem) {
                                if (bitem.area_id == data.area_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_area.unshift({
                                    area_id: data.area_id,
                                    area_desc: '',
                                    area_valid: 1
                                });
                            }

                            $("#tab_area_list").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_area = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_area', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_area == undefined) {
                   return;
               }
               if (!$('#save_btn_area').linkbutton('options').disabled) { $('#save_btn_area').linkbutton('disable'); }
               if (!$('#cancel_btn_area').linkbutton('options').disabled) { $('#cancel_btn_area').linkbutton('disable'); }
               $('#add_btn_area').linkbutton('enable');

               $('#tab_area_list').datagrid('endEdit', editRow_area);
           }
       }, '-',
       {
           id: 'cancel_btn_area', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_area == undefined) {
                   return;
               }
               if (!$('#save_btn_area').linkbutton('options').disabled) { $('#save_btn_area').linkbutton('disable'); }
               if (!$('#cancel_btn_area').linkbutton('options').disabled) { $('#cancel_btn_area').linkbutton('disable'); }
               $('#add_btn_area').linkbutton('enable');

               $('#tab_area_list').datagrid('cancelEdit', editRow_area);
           }
       }, '-',
       {
           id: 'del_btn_area', text: '删除', iconCls: 'icon-empty',
           handler: function () {

               if (editRow_area != undefined) {
                   $('#tab_area_list').datagrid('cancelEdit', editRow_area);
               }

               var rows = $('#tab_area_list').datagrid('getChecked');
               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }
               if (editRow_area != undefined) {
                   $("#tab_area_list").datagrid("endEdit", editRow_area);
                   editRow_area == undefined;
               }
               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var area_ids = '';

                       $.each(rows, function (i, item) {
                           if (area_ids.length == 0) {
                               area_ids = item.area_id;
                           } else {
                               area_ids += ',' + item.area_id;
                           }
                       });

                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_area',
                           area_ids: area_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_area_list').datagrid('getRowIndex', row);
                                   $('#tab_area_list').datagrid('deleteRow', rowindex);
                               });
                               var new_data_area = [];
                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_area, function (j, tag_row) {
                                       if (tag_row.area_id == row.area_id) {
                                           //data_area.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_area.push(tag_row);
                                       }
                                   });
                               });
                               data_area = new_data_area;
                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_area" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_rows_area);
            editRow_area = undefined;
            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_area',
                area_id: row.area_id,
                area_desc: row.area_desc
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 

                    if (data.result == 1) {
                        //更新数据 
                        $.each(data_area, function (i, cur_row) {
                            if (cur_row.area_id == row.area_id) {
                                data_area[i] = row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_area_list').datagrid('updateRow', {
                            index: index,
                            row: row
                        });

                    } else {

                        //更新数据 
                        $.each(data_area, function (i, cur_row) {
                            if (cur_row.area_id == res_edit_row.area_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_area_list').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_area_list').datagrid('beginEdit', index);

                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            if (editRow_area != index) {
                if (editRow_area != undefined) {
                    $('#tab_area_list').datagrid('endEdit', editRow_area);
                    editRow_area = index;
                }
            }

            $('#save_btn_area').linkbutton('enable');
            $('#cancel_btn_area').linkbutton('enable');
            if (!$('#add_btn_area').linkbutton('options').disabled) { $('#add_btn_area').linkbutton('disable'); }

            res_edit_rows_area = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_area = undefined;
            $('#add_btn_area').linkbutton('enable');
            $('#cancel_btn_area').linkbutton('disable');
        },
        onClickRow: function (rowIndex, rowData) {

            if (editRow_area == rowIndex) {
                $("#tab_area_list").datagrid("endEdit", editRow_area);
                editRow_area == undefined;
            } else {

                if (editRow_area != undefined && editRow_area != rowIndex) {
                    $("#tab_area_list").datagrid("endEdit", editRow_area);
                }
                if (editRow_area == undefined) {
                    $('#save_btn_area').linkbutton('enable');
                    $('#cancel_btn_area').linkbutton('enable');
                    if (!$('#add_btn_area').linkbutton('options').disabled) { $('#add_btn_area').linkbutton('disable'); }

                    editRow_area = rowIndex;
                    $("#tab_area_list").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_area').unbind('keyup').bind('keyup', function (event) {
                if (editRow_area != undefined) {
                    $('#tab_area_list').datagrid('cancelEdit', editRow_area);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_area_list').datagrid('loadData', { total: data_area.length, rows: data_area });
                } else {
                    var new_arr = [];
                    $.each(data_area, function (i, item) {
                        //统一转成大写比较
                        if (item.area_desc != undefined && item.area_desc.toUpperCase().indexOf(like_str) > -1) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_area_list').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }

            });


        }
    });
}
//港口
function load_tab_port(data) {
    $("#tab_port_list").datagrid({
        data: { total: data.length, rows: data },
        border: false,
        rownumbers: true,
        fit: true,
        remoteSort: false,
        fitColumns: false,
        singleSelect: false,
        selectOnCheck: false,
        checkOnSelect: false,//显示的列
        emptyMsg: '无法找到相关数据',
        columns: [[
            {
                field: 'check_id', title: '', width: 40, checkbox: true
            },
            {
                field: 'p_desc', title: '港口描述', width: 140, sortable: true,
                editor: { type: 'text' }
            },
            {
                field: 'p_en_cod', title: '英文代码', width: 200, sortable: true,
                editor: { type: 'text' }
            },
            {
                field: 'area_id', title: '区域', width: 80,
                editor: {
                    type: 'combobox',
                    options: {
                        valueField: 'area_id',
                        textField: 'area_desc',
                        data: data_area,
                        panelWidth:160,
                    }
                },
                formatter: function (value, row, index) {
                    return row.area_desc;
                }
            },

        ]],
        toolbar: [{
            id: 'add_btn_port', text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等

                $('#save_btn_port').linkbutton('enable');
                $('#cancel_btn_port').linkbutton('enable');
                if (!$('#add_btn_port').linkbutton('options').disabled) { $('#add_btn_port').linkbutton('disable'); }

                post('../Ashx/sys_base.ashx', {
                    rnd: Math.random(),
                    action: 'insert_port',
                    p_desc: '',
                    p_en_cod: '',
                    area_id: '',
                    cu_cy_id: ''
                }, function (data) {
                    $.messager.progress('close');//处理完成之后关闭 
                    if (!session_out(data)) {
                        if (data.result == 1) {
                            $("#tab_port_list").datagrid("insertRow", {
                                index: 0, // index start with 0
                                row: {
                                    p_id: data.p_id,
                                    p_desc: '',
                                    p_en_cod: '',
                                    area_id: '',
                                    cu_cy_id: ''
                                }
                            });
                            var bhas = false;

                            $.each(data_port, function (i, bitem) {
                                if (bitem.p_id == data.p_id) {
                                    bhas = true;
                                }
                            });

                            if (!bhas) {
                                data_port.unshift({
                                    p_id: data.p_id,
                                    p_desc: '',
                                    p_en_cod: '',
                                    area_id: '',
                                    cu_cy_id: ''
                                });
                            }

                            $("#tab_port_list").datagrid("beginEdit", 0);
                            //给当前编辑的行赋值
                            editRow_port = 0;
                        }
                    }
                }, true);
            }
        }, '-',
       {
           id: 'save_btn_port', text: '保存', iconCls: 'icon-save',
           handler: function () {
               if (editRow_port == undefined) {
                   return;
               }
               if (!$('#save_btn_port').linkbutton('options').disabled) { $('#save_btn_port').linkbutton('disable'); }
               if (!$('#cancel_btn_port').linkbutton('options').disabled) { $('#cancel_btn_port').linkbutton('disable'); }
               $('#add_btn_port').linkbutton('enable');

               $('#tab_port_list').datagrid('endEdit', editRow_port);
           }
       }, '-',
       {
           id: 'cancel_btn_port', text: '取消编辑', iconCls: 'icon-remove',
           handler: function () {
               if (editRow_port == undefined) {
                   return;
               }
               if (!$('#save_btn_port').linkbutton('options').disabled) { $('#save_btn_port').linkbutton('disable'); }
               if (!$('#cancel_btn_port').linkbutton('options').disabled) { $('#cancel_btn_port').linkbutton('disable'); }
               $('#add_btn_port').linkbutton('enable');

               $('#tab_port_list').datagrid('cancelEdit', editRow_port);
           }
       }, '-',
       {
           id: 'del_btn_port', text: '删除', iconCls: 'icon-empty',
           handler: function () {

               if (editRow_port != undefined) {
                   $('#tab_port_list').datagrid('cancelEdit', editRow_port);
               }

               var rows = $('#tab_port_list').datagrid('getChecked');
               if (rows.length == 0) {
                   $.messager.alert('错误', '请选择数据行之后再执行删除操作', 'error');
                   return;
               }
               if (editRow_port != undefined) {
                   $("#tab_port_list").datagrid("endEdit", editRow_port);
                   editRow_port == undefined;
               }
               $.messager.confirm('删除提示', '请确认要删除选中的' + rows.length + '行数据？',
               function (r) {
                   if (r) {
                       var p_ids = '';

                       $.each(rows, function (i, item) {
                           if (p_ids.length == 0) {
                               p_ids = item.p_id;
                           } else {
                               p_ids += ',' + item.p_id;
                           }
                       });

                       post('../Ashx/sys_base.ashx', {
                           rnd: Math.random(),
                           action: 'delete_port',
                           p_ids: p_ids
                       }, function (data) {
                           if (data.result == 1) {
                               $.each(rows, function (i, row) {
                                   var rowindex = $('#tab_port_list').datagrid('getRowIndex', row);
                                   $('#tab_port_list').datagrid('deleteRow', rowindex);
                               });
                               var new_data_port = [];
                               //需要对cur_data进行删除
                               $.each(rows, function (i, row) {
                                   //这个删除有问题 需要重新找索引
                                   $.each(data_port, function (j, tag_row) {
                                       if (tag_row.p_id == row.p_id) {
                                           //data_port.splice(j, 1);//根据下标删除一个元素   1表示删除一个元素
                                       } else {
                                           new_data_port.push(tag_row);
                                       }
                                   });
                               });
                               data_port = new_data_port;
                               $.messager.alert('提示', data.msg, 'info');
                           } else {
                               $.messager.alert('错误', data.msg, 'error');
                           }
                       }, true);
                   }
               });
           }
       }, '-',
       {
           iconCls: 'icon-query',
           text: '筛选: &nbsp;&nbsp;<input class="easyui-textbox search_voyage_line" type="text"  />',
           handler: function () {
           }
       }],
        onAfterEdit: function (index, row, changes) {
            var res_edit_row = $.extend(true, {}, res_edit_rows_port);
            editRow_port = undefined;
            post('../Ashx/sys_base.ashx', {
                rnd: Math.random(),
                action: 'update_port',
                p_id: row.p_id,
                p_desc: row.p_desc,
                p_en_cod: row.p_en_cod,
                area_id: row.area_id,
                cu_cy_id: row.cu_cy_id
            }, function (data) {
                if (!session_out(data)) {
                    //$.messager.progress('close');//处理完成之后关闭 

                    if (data.result == 1) {

                        $.each(data_port, function (i, cur_row) {
                            if (cur_row.p_id == row.p_id) {
                                //更新几个 desc
                                if (row.area_id == undefined || row.area_id.length == 0) {
                                    row.area_desc = '';
                                } else {
                                    $.each(data_area, function (dai, srow) {
                                        if (srow.area_id == row.area_id) {
                                            row.area_desc = srow.area_desc;
                                        }
                                    });
                                }
                                cur_row = row;
                            }
                        });


                        //然后进行行更新 
                        $('#tab_port_list').datagrid('updateRow', {
                            index: index,
                            row: row
                        });


                    } else {

                        //更新数据 
                        $.each(data_port, function (i, cur_row) {
                            if (cur_row.p_id == res_edit_row.p_id) {
                                cur_row = res_edit_row;
                            }
                        });
                        //然后进行行更新 
                        $('#tab_port_list').datagrid('updateRow', {
                            index: index,
                            row: res_edit_row
                        });

                        $('#tab_port_list').datagrid('beginEdit', index);

                        $.messager.alert('错误提示', data.msg, 'error');
                    }
                }
            }, false);
        },
        onBeforeEdit: function (index, row) {
            if (editRow_port != index) {
                if (editRow_port != undefined) {
                    $('#tab_port_list').datagrid('endEdit', editRow_port);
                    editRow_port = index;
                }
            }

            $('#save_btn_port').linkbutton('enable');
            $('#cancel_btn_port').linkbutton('enable');
            if (!$('#add_btn_port').linkbutton('options').disabled) { $('#add_btn_port').linkbutton('disable'); }

            res_edit_rows_port = $.extend(true, {}, row);
        },
        onCancelEdit: function (index, row) {
            editRow_port = undefined;
            $('#add_btn_port').linkbutton('enable');
            $('#cancel_btn_port').linkbutton('disable');
        },

        onClickRow: function (rowIndex, rowData) {

            if (editRow_port == rowIndex) {
                $("#tab_port_list").datagrid("endEdit", editRow_port);
                editRow_port == undefined;
            } else {

                if (editRow_port != undefined && editRow_port != rowIndex) {
                    $("#tab_port_list").datagrid("endEdit", editRow_port);
                }
                if (editRow_port == undefined) {
                    $('#save_btn_port').linkbutton('enable');
                    $('#cancel_btn_port').linkbutton('enable');
                    if (!$('#add_btn_port').linkbutton('options').disabled) { $('#add_btn_port').linkbutton('disable'); }

                    editRow_port = rowIndex;
                    $("#tab_port_list").datagrid("beginEdit", rowIndex);
                }
            }
        },
        onLoadSuccess: function (data) {
            $('.datagrid-toolbar input.easyui-textbox').css({ 'margin-top': '-7px' });
            $('.search_voyage_line').unbind('keyup').bind('keyup', function (event) {
                if (editRow_port != undefined) {
                    $('#tab_port_list').datagrid('cancelEdit', editRow_port);
                }
                var like_str = $.trim($(this).val().toUpperCase());
                if (like_str.length == 0) {
                    $('#tab_port_list').datagrid('loadData', { total: data_port.length, rows: data_port });
                } else {
                    var new_arr = [];
                    $.each(data_port, function (i, item) {
                        //统一转成大写比较
                        if ((item.vl_desc != undefined && item.vl_desc.toUpperCase().indexOf(like_str) > -1) ||
                            (item.vl_code != undefined && item.vl_code.toUpperCase().indexOf(like_str) > -1)) {
                            new_arr.push(item);
                        }
                    });
                    $('#tab_port_list').datagrid('loadData', { total: new_arr.length, rows: new_arr });
                }

            });


        }
    });
}