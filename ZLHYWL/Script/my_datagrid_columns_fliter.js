
(function ($) {
    //1.定义扩展方法 
    $.fn.columns_fliters = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.columns_fliters.methods[options](this, param);
        }
        options = $.extend({}, $.fn.columns_fliters.defaults, options || {});
        var target = $(this);

        var cur_guid = 'cls_' + guid();
        //原表格所有数据 
        var target_tab_data = options.target_tab_data;
        //目标控件 0
        var tag_tab = options.tag_tab;
        //筛选 集合数组 
        var cur_columns_fliter_arr = [];
        //当前列 
        var cur_column_field = '';
        //当前列的筛选条件集合 
        var cur_column_fliter_arr = [];
        var cur_fliter_panel_of_table = undefined;
        var cur_fliter_panel_of_search_box = undefined;
        var cur_fliter_panel_of_clear_btn = undefined;
        var cur_fliter_panel_of_search_btn = undefined;

        var cur_cls_undo_click = '';
        var cur_cls_target_body = options.cur_cls_target_body;
        var cur_width = 440;
        var cur_height = 250;
        var cur_parent = undefined;
        if (!options.cur_parent) {
            cur_parent = $('body');
        } else {
            cur_parent = options.cur_parent;
        }


        //一般情况下，会传递过来 
        /*
            data, //绑定表格数据
            table, //绑定表格  
            cls_target_body,
            parent
        */
        target.create = function () {
            target.removeClass();
            target.addClass(cur_guid + ' mulit_panel_part');
            target.css({
                'width': cur_width + 'px',
                'height': cur_height + 'px',
                'border': 'solid 4px #daeef5',
                'box-shadow': '6px 6px 4px #c5c5c5',
                'position': 'absolute',
                'left': '0px',
                'top': '0px',
                'display': 'none',
                'background-color': '#FFF'
            });

            var tab_column_fliter_tab_part = $('<div class="mulit_panel_part ' + cur_guid + '_tab_part custom_bg"  style="height:' + (cur_height - 28) + 'px;overflow:hidden;"><table class="' + cur_guid + '_table"></table></div>');

            var tab_column_fliter_bottom_part = $('<div class="mulit_panel_part ' + cur_guid + '_bottom_part custom_bg" style="height:28px;overflow:hidden;">' +
                '<table class="mulit_panel_part" >' +
                        '<tr>' +
                            '<td>' +
                                '<input  class="easyui-textbox ' + cur_guid + '_search_box   mulit_panel_part" style="width:200px;" oninput="javascript:void(0);" placeholder="筛选" />' +
                            '</td>' +
                            '<td style="text-align:right;padding-right:16px;">' +
                                '<a href="javascript:void(0);" class="' + cur_guid + '_linkbutton_apply mulit_panel_part" >应用</a>' +
                                '<a href="javascript:void(0);" class="' + cur_guid + '_linkbutton_clear mulit_panel_part" data-options="plain:true,iconCls:\'icon-empty\'">清空条件</a>' +
                            '</td>' +
                        '</tr>' +
                    '</table></div>');

            target.append(tab_column_fliter_tab_part);
            target.append(tab_column_fliter_bottom_part);
            //target.options.cur_fliter_panel = $('.' + target.cur_guid).eq(0);
            cur_fliter_panel_of_table = $(target.find('.' + cur_guid + '_table')[0]);
            cur_fliter_panel_of_clear_btn = $(target.find('.' + cur_guid + '_linkbutton_clear')[0]);
            cur_fliter_panel_of_search_btn = $(target.find('.' + cur_guid + '_linkbutton_apply')[0]);
            cur_fliter_panel_of_search_box = $(target.find('.' + cur_guid + '_search_box')[0]);


            cur_fliter_panel_of_clear_btn.linkbutton({
                plain: true, iconCls: 'icon-empty',
            });
            //清空筛选 
            cur_fliter_panel_of_clear_btn.bind('click', function () {

                cur_fliter_panel_of_search_box.val('');

                $.each(cur_column_fliter_arr, function (i, item) {
                    item.selected = 1;
                });
                cur_fliter_panel_of_table.datagrid('loadData', cur_column_fliter_arr);

                //刷新列表值 
                target.refresh_target_tab();
            });
            //筛选 应用
            cur_fliter_panel_of_search_btn.linkbutton({
                plain: true, iconCls: 'icon-search',
            });
            //点击 实施筛选应用 
            cur_fliter_panel_of_search_btn.bind('click', function () {
                target.refresh_target_tab();

            });


            cur_fliter_panel_of_search_box.bind('input', function (e) {
                //得到筛选值
                var _txt = cur_fliter_panel_of_search_box.val();
                //从当前绑定数组中找到合适的值，然后绑定 
                var fliter_op = [];
                $.each(cur_column_fliter_arr, function (i, item) {
                    if (item.value.indexOf(_txt) > -1) {
                        item.selected = 1;
                        fliter_op.push(item);
                    } else {
                        item.selected = 0;
                    }
                });
                cur_fliter_panel_of_table.datagrid('loadData', fliter_op);
            });

            target.unbind('mousedown').bind('mousedown', function (e) {
                e.stopPropagation();
            });

            $('body').unbind('mousedown').bind('mousedown', function (e) {
                target.hide_panel();
            });
            /*
                如果这样做，会导致，这个表格进行第二次 loadSuccess
            */
            //tag_tab.datagrid({
            //    onClickCell: function (rowIndex, field, value) {
            //        _this.hide_panel();
            //    },
            //})
            cur_fliter_panel_of_table.datagrid({
                showHeader: true,
                data: [],
                singleSelect: false,
                remoteSort: false, //定义从服务器对数据进行排序。
                pagination: false, //在DataGrid控件底部显示分页工具栏。
                loadMsg: '数据正在加载，请耐心等待...',
                border: false,
                rownumbers: true,
                nowrap: false,
                striped: false,
                collapsible: false,
                fit: true,
                fitColumns: false,
                emptyMsg: '无数值',
                selectOnCheck: true,
                checkOnSelect: true,//显示的列 
                frozenColumns: [[
                    { title: '', field: 'selected', width: 40, checkbox: true }

                ]],
                columns: [[
                    {
                        field: 'text', title: '筛选数值', sortable: true, width: 360
                    }
                ]],
                onLoadSuccess: function (data) {
                    if (data) {
                        $.each(data.rows, function (i, item) {
                            if (item.selected == 1) {
                                cur_fliter_panel_of_table.datagrid('checkRow', i);
                            }
                        });
                    }
                },
            });
        }
        //初始化 目标表格 
        target.init_tag_tab = function () {
            //tag_tab.datagrid({
            //    onClickCell: function (rowIndex, field, value) {
            //        target.hide_panel();
            //    },
            //})
            var col_rowcount = tag_tab.datagrid('options').columns.length;
            var columns = tag_tab.datagrid('options').columns[col_rowcount - 1];
            for (var i = 0; i < columns.length; i++) {
                var filter = $('<span class="datagrid-filter-icon" data-key="' + columns[i].field + '">&nbsp</span>');
                filter.unbind('mousedown').bind('mousedown', function (e) {

                    e.stopPropagation();
                });
                filter.unbind('click').bind('click', function (e) {
                    cur_fliter_panel_of_search_box.val('');
                    //位置调整 
                    var left = $(e.target).parent().parent().offset().left;
                    var top = $(e.target).parent().parent().offset().top + $(e.target).parent().parent().height();

                    var body_width = cur_parent.width();

                    if (left + cur_width > body_width) {
                        left = body_width - cur_width;
                    }
                    var arr = [];
                    for (var oi in cur_columns_fliter_arr) {
                        if (cur_columns_fliter_arr[oi].key == $(e.target).data('key')) {
                            var data_arr = $.extend(true, [], cur_columns_fliter_arr[oi].op);
                            target.show_panel(left, top);
                            cur_fliter_panel_of_table
                                .datagrid({ fit: true })
                                .datagrid('loadData', { total: data_arr.length, rows: data_arr });
                            cur_column_field = $(e.target).data('key');
                            cur_column_fliter_arr = data_arr;
                        }
                    }



                    e.stopPropagation();
                });
                if ($('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + columns[i].field + '"]>div.datagrid-cell span.datagrid-filter-icon').length == 0) {
                    $('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + columns[i].field + '"]>div.datagrid-cell').prepend(filter);
                }
            }
        }
        target.show_panel = function (left, top) {
            target.css({
                left: left,
                top: top,
            }).show();
        }
        target.hide_panel = function hide_panel() {
            target.css({
                display: 'none',
            });
        }

        //清空
        target.clear_search_condition = function () {

            cur_column_field = undefined;
            target.refresh_target_tab();
        }
        target.get_target_data = function () {
            return target_tab_data;
        }

        //初始化 筛选数组组合
        target.init_columns_fliter_arr = function () {
            //进行述职匹配 
            if (target_tab_data.length == 0) {
                return;
            }

            if (cur_columns_fliter_arr == undefined) {
                cur_columns_fliter_arr = [];
                for (var key in target_tab_data[0]) {
                    cur_columns_fliter_arr.push({
                        key: key,
                        op: []
                    });
                }
            } else if (cur_columns_fliter_arr.length == 0) {
                for (var key in target_tab_data[0]) {
                    cur_columns_fliter_arr.push({
                        key: key,
                        op: []
                    });
                }
            } else {
                for (var i in cur_columns_fliter_arr) {
                    for (var j in cur_columns_fliter_arr[i].op) {
                        cur_columns_fliter_arr[i].op[j].exists = 0;
                    }
                }
            }


            for (var item in target_tab_data) {
                for (var op in cur_columns_fliter_arr) {
                    //空值不能屏蔽 
                    var v = target_tab_data[item][cur_columns_fliter_arr[op].key]
                    if (v == undefined || v.length == 0) {
                        v = '';
                    }
                    var newOp = {
                        value: v,
                        text: v,
                        selected: 1,
                        exists: 1,
                    };
                    //没有的就新增
                    //如果是删除了，怎么办 ?
                    var has = false;
                    for (var oop in cur_columns_fliter_arr[op].op) {
                        if (cur_columns_fliter_arr[op].op[oop].value == newOp.value) {
                            has = true;
                            cur_columns_fliter_arr[op].op[oop].exists = 1;
                            break;
                        }
                    }
                    if (!has) {
                        cur_columns_fliter_arr[op].op.push(newOp);
                    }
                }
            }

            for (var i in cur_columns_fliter_arr) {
                var n_op = [];
                var t_op = cur_columns_fliter_arr[i].op;
                for (var j in t_op) {
                    if (t_op[j].exists == 1) {
                        n_op.push(t_op[j]);
                    }
                }
                cur_columns_fliter_arr[i].op = n_op;
            }

            for (var i in cur_columns_fliter_arr) {
                cur_columns_fliter_arr[i].op = cur_columns_fliter_arr[i].op.sort(function (a, b) {
                    if (isNaN(a.value)) {
                        var len1 = a.value.length;
                        var len2 = b.value.length;
                        var min = len1 > len2 ? len2 : len1;

                        for (var j = 0; j < min; j++) {
                            var t1 = a.value.charCodeAt(j);
                            var t2 = b.value.charCodeAt(j);
                            if (t1 == t2) continue;
                            else return t1 - t2;
                        }
                        return 0;
                    } else {
                        return Number(a.value) - Number(b.value);
                    }

                });
            }
        }
        //刷新 目标表格数据 
        target.refresh_target_tab = function () {
            $.messager.progress({
                title: '请稍后',
                msg: '努力加载中...'
            });
            var now_op = [];
            //如果当前又选中列 
            //废话，当然后选中列 

            if (cur_column_field != undefined && cur_column_field.length > 0) {

                $.each(cur_columns_fliter_arr, function (i, item) {
                    if (item.key == cur_column_field) {
                        now_op = item.op;
                    }
                });

                //当前 选中的值 
                var select_rows = cur_fliter_panel_of_table.datagrid('getChecked');
                //判断是否存在没有选择的 ,且将 新数组对应的选中值 selected值赋值为 1 
                var exists_unselected = false;
                $.each(now_op, function (i, item) {
                    var has = false;
                    $.each(select_rows, function (s, sitem) {
                        if (item.value == sitem.value) {
                            has = true;
                            return;
                        }
                    });
                    if (has) {
                        item.selected = 1;
                    } else {
                        item.selected = 0;
                        exists_unselected = true;
                    }
                });
                //如果存在 selected = 0 ;需要将 选择符号变颜色 
                if (exists_unselected) {
                    $('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + cur_column_field + '"]>div.datagrid-cell span').eq(1).css({ color: 'red' });
                } else {
                    $('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + cur_column_field + '"]>div.datagrid-cell span').eq(1).css({ color: '#000' });
                }
                var query_row = [];

                $.each(target_tab_data, function (i, row) {
                    var bRight = true;
                    $.each(cur_columns_fliter_arr, function (j, orow) {
                        //取出 每一行的 每一列值 
                        var v1 = row[orow.key];
                        if (v1 == undefined) v1 = '';
                        //判断一下再比较 
                        if (orow.op != undefined && orow.op.length > 0) {
                            var has = false;
                            $.each(orow.op, function (n, nsrow) {
                                if (nsrow.value == v1 && nsrow.selected == 1) {
                                    has = true;
                                    return;
                                }
                            });

                            if (!has) {
                                //上一步没有， 
                                bRight = false;
                            }
                        }

                        if (!bRight) return;
                    });

                    if (bRight) {
                        query_row.push(row);
                    }
                });
                //tag_tab.datagrid({ 
                //    onClickCell: function (rowIndex, field, value) {
                //        target.hide_panel();
                //    },
                //});
                tag_tab.datagrid('loadData', query_row);

            } else {
                $.each(cur_columns_fliter_arr, function (i, item) {
                    $.each(item.op, function (j, jitem) {
                        jitem.selected = 1;
                    });
                    $('.' + cur_cls_target_body + ' table.datagrid-htable tr.datagrid-header-row td[field="' + item.key + '"]>div.datagrid-cell span').eq(1).css({ color: '#000' });
                });
                tag_tab.datagrid('loadData', target_tab_data);

            }

            $.messager.progress('close');
        }

        target.reset_target_data_and_clumns_fliter = function (data) {
            target_tab_data = data;
            target.init_columns_fliter_arr();
            cur_column_field = undefined;
            target.refresh_target_tab();
        }
        target.reset_target_data_only = function (data) {
            target_tab_data = data;
            target.init_columns_fliter_arr();
            target.refresh_target_tab();
        }


        target.init_columns_fliter_arr();
        target.create();
        target.init_tag_tab();
        target.hide_panel();

        return target;
    }

    //传递过来是 字符串，调用相应方法
    $.fn.columns_fliters.methods = {
        clear: function (jq) {
            jq.clear_search_condition();
        },
        get_target_data: function (jq) {
            return jq.get_target_data();
        },
        reset_target_data_and_clumns_fliter: function (jq, data) {

            jq.reset_target_data_and_clumns_fliter(data);
        },
        reset_target_data_only: function (jq, data) {

            jq.reset_target_data_only(data);
        },
    };

    //默认参数 
    $.fn.columns_fliters.defaults = {
        //原表格所有数据 
        target_tab_data: null,
        //目标控件 0
        tag_tab: undefined,

        cur_cls_target_body: '',

        cur_parent: undefined,

    };


})(jQuery);