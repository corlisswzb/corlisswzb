

var params = {
    action: 'get_approval_node_list',
    rnd: Math.random(),
    an_company: 0,
    an_type: 0,
}


var us_params={
    action: 'get_userlist',
    rnd: Math.random(),
    like_str:'',
    page:1,
    rows:150,
    sort:'',
    order:''
}

$(document).ready(function () {

    load_combobox();

    load_tab_select_user();

    $('#ipt_company').combobox({
        panelHeight: 'auto',
        onClick: function (item) {
            params.an_company = item.value;

            if (params.an_type != 0) {
                load_tab_ap_frame();
            }
           
        }
    })

    $('#ipt_ap_type').combobox({
        panelHeight: 'auto',
        onClick: function (item) {
            params.an_type = item.value;
           
            if (params.an_company != 0) {
                load_tab_ap_frame();
            }
        }
    })

})

function doSearch(value, name) {

    us_params.like_str = value;
    load_tab_select_user();

}

function load_combobox() {

    //绑定公司
    $.getJSON('/Ashx/company_set.ashx',
    {
       rnd: Math.random(),
       action: 'get_company_list_pub'
    },
    function (data) {
        if (data.result == 1) {

           bind_combobox(data.rows, $('#ipt_company'), 'cpy_name', 'cpy_id', false);
       }
    })

    //绑定审批类型
    $.getJSON('/Ashx/approval_frame.ashx',
    {
        rnd: Math.random(),
        action: 'get_approval_type'
    },
    function (data) {
        if (data.result == 1) {
           
            bind_combobox(data.rows, $('#ipt_ap_type'), 'at_desc', 'at_id', false);
            
        }
    })

}

function load_tab_ap_frame() {


    $("#tab_ap_frame").datagrid({
        url: '/Ashx/approval_frame.ashx',
        queryParams: params,
        method: 'post',
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: true,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        idField: 'an_id', //主键
        checkbox: true,
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'an_order', title: '节点顺序',  align: 'center' },
            { field: 'u_real_name', title: '节点人员', width: 100, align: 'center', },
            {
                field: 'fa_date', title: '操作',width:150,  align: 'center',
                formatter: function (value, row, index) {
                    return "<button class=\"btn_cls\" style=\"width:40px\" onclick=\"doclick_up_node_order(" + row.an_id + "," + index + ")\"><i class=\"fa fa-arrow-circle-up\"></i></button>" +
                    "&nbsp;&nbsp;<button class=\"btn_cls\" style=\"width:40px\" onclick=\"doclick_down_node_order(" + row.an_id + "," + index + ")\"><i class=\"fa fa-arrow-circle-down\"></i></button>" +
                    "&nbsp;&nbsp;<button class=\"btn_cls\" style=\"width:40px\" onclick=\"doclick_delete_ap_node(" + row.an_id + ")\"><i class=\"fa fa-times\"></i></button>";
                }
            }
        ]],
       

    })
}

function load_tab_select_user() {

    $("#tab_select_user").datagrid({
        url: '/Ashx/usermgr.ashx',
        queryParams: us_params,
        method: 'post',
        singleSelect: true,
        remoteSort: true, //定义从服务器对数据进行排序。
        pagination: false, //在DataGrid控件底部显示分页工具栏。
        loadMsg: '数据正在加载，请耐心等待...',
        border: true,
        rownumbers: false,
        autoRowHeight:true,nowrap: true,
        striped: true,
        collapsible: false,
        fit: true,
        fitColumns: false,
        idField: '', //主键
        checkbox: true,
        selectOnCheck: true,
        checkOnSelect: true,//显示的列
        columns: [[
            { field: 'u_real_name', title: '姓名',width:80, align: 'center' },
            { field: 'u_phone', title: '电话', width: 100, align: 'center', },
            {
                field: 'fa_date', title: '操作', width: 80, align: 'center',
                formatter: function (value, row, index) {
                    return "<button style=\"width:70px\" class=\"btn_cls\" onclick=\"doclick_select_user(" + row.u_id + ","+index+")\"><i class=\"fa fa-arrow-circle-right\"></i></button>";
                }
            }
        ]],


    })
}

//选中人设置未审批节点人员
function doclick_select_user(uid, index) {

    //$("#tab_select_user").datagrid("deleteRow", index)
    if (params.an_company == 0) {
        alert("请选择公司!");
        return;
    }

    if (params.an_type == 0) {
        alert("请选择审核类型!");
        return;
    }

    var tab_count = $("#tab_ap_frame").datagrid("getRows").length;

    $.getJSON('/Ashx/approval_frame.ashx',
    {
       rnd: Math.random(),
       action: 'insert_approval_frame',
       an_company: params.an_company,
       an_type: params.an_type,
       an_user: uid,
       an_order: tab_count+1
    },
    function (data) {
       if (data.result == 1) {

           $("#tab_ap_frame").datagrid("reload");
       }
    })


}

//删除节点
function doclick_delete_ap_node(an_id) {

    var rows = $("#tab_ap_frame").datagrid("getSelections");
    if (rows.length > 0) {

        $.getJSON('/Ashx/approval_frame.ashx',
        {
            rnd: Math.random(),
            action: 'delete_approval_node',
            an_id: an_id
        },
        function (data) {
            if (data.result == 1) {

                $("#tab_ap_frame").datagrid("reload");
            }
        })

    } else {
        $.messager.alert("提示", "请选择要选中的行", "error");
    }


}

//向上移动节点
function doclick_up_node_order(an_id,index) {
    //已经是第一行，不用移动
    if (index==0) {
        return;
    }

    var rows = $("#tab_ap_frame").datagrid('getRows');//获得所有行
    var row = rows[index-1];//根据index获得其中一行。


    $.getJSON('/Ashx/approval_frame.ashx',
       {
           rnd: Math.random(),
           action: 'update_approval_node_order',
           an_id: an_id,
           an_order: index,
           last_next_anid: row.an_id
       },
       function (data) {
           if (data.result == 1) {

               $("#tab_ap_frame").datagrid("reload");
           }
       })

}

//向下移动节点
function doclick_down_node_order(an_id, index) {
    //已经是第后一行，不用移动
    var tab_count = $("#tab_ap_frame").datagrid("getRows").length;
    if (index == tab_count-1) {
        return;
    }

    var rows = $("#tab_ap_frame").datagrid('getRows');//获得所有行
    var row = rows[index+1];//根据index获得其中一行。

    $.getJSON('/Ashx/approval_frame.ashx',
       {
           rnd: Math.random(),
           action: 'update_approval_node_order',
           an_id: an_id,
           an_order: index+2,
           last_next_anid: row.an_id
       },
       function (data) {
           if (data.result == 1) {

               $("#tab_ap_frame").datagrid("reload");
           }
       })
}

