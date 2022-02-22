$(document).ready(function () {

    //必须要辅助其他的 

    var show_panel = false;

    $('#test_custom').combogrid({
        panelWidth: 500, 
        idField: '',
        textField: 'cu_name',
        url: '../Ashx/sys_base.ashx',
        queryParams: {
            rnd: Math.random(),
            action: 'get_custom_test',
            like_str: ''
        }, 
        pagination : true,//是否分页  
        rownumbers:true,//序号  
        collapsible:false,//是否可折叠的  
        fit: true,//自动大小  
        editable: true,
        hasDownArrow: false,
        pageNumber:1,
        pageSize: 20,//每页显示的记录条数，默认为10  
        pageList: [20,40],//可以设置每页记录条数的列表  
        method: 'post', 
        columns: [[
				{ field: 'cu_name', title: '公司名', width: 330 },
				{ field: 'cu_code', title: '代码', width: 110 }, 
        ]],
        keyHandler: { 
            up: function () {               //【向上键】押下处理  
                var display = $('#test_custom').combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $('#test_custom').combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $('#test_custom').combogrid('grid').datagrid('getRowIndex', selected);
                        //向上移动到第一行为止  
                        if (index > 0) {
                            $('#test_custom').combogrid('grid').datagrid('selectRow', index - 1);
                        }
                    } else {
                        var rows = $('#test_custom').combogrid('grid').datagrid('getRows');
                        $('#test_custom').combogrid('grid').datagrid('selectRow', rows.length - 1);
                    }
                } 
            },
            down: function () {             //【向下键】押下处理  
                var display = $('#test_custom').combogrid('panel').parent().css('display');
                if (display != 'none') {
                    //取得选中行  
                    var selected = $('#test_custom').combogrid('grid').datagrid('getSelected');
                    if (selected) {
                        //取得选中行的rowIndex  
                        var index = $('#test_custom').combogrid('grid').datagrid('getRowIndex', selected);
                        //向下移动到当页最后一行为止  
                        if (index < $('#test_custom').combogrid('grid').datagrid('getData').rows.length - 1) {
                            $('#test_custom').combogrid('grid').datagrid('selectRow', index + 1);
                        }
                    } else {
                        $('#test_custom').combogrid('grid').datagrid('selectRow', 0);
                    }
                } 
            },
            enter: function () {             //【回车键】押下处理  
                //设置【性别】文本框的内容为选中行的的性别字段内容  
                var display = $('#test_custom').combogrid('panel').parent().css('display');
                if (display != 'none') {
                    
                    //选中后让下拉表格消失  
                    $('#test_custom').combogrid('hidePanel');
                }
            },
            query: function (keyword) {     //【动态搜索】处理  
                //设置查询参数  
                var queryParams = $('#test_custom').combogrid("grid").datagrid('options').queryParams; 
                queryParams.like_str = keyword;
                queryParams.rnd = Math.random(),
                queryParams.action = 'get_custom_test';
                $('#test_custom').combogrid("grid").datagrid('options').queryParams = queryParams; 
                $('#test_custom').combogrid("grid").datagrid("clearSelections");
                $('#test_custom').combogrid("grid").datagrid("reload"); 
                //重新加载  
                $('#test_custom').combogrid("setText", keyword); 
                $('#test_custom').data('cu_id', ''); 
            }, 
        },
        onSelect: function (index, item) {              //选中处理   
            $('#test_custom').data('cu_id', item.cu_id);
            $('#test_custom').combogrid('setText', item.cu_name);
        } 
    });

    $('#test_custom').combogrid("setText", "苏州龙嘉国际货运代理有限公司");

});