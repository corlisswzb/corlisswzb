 

var od_service_list = undefined;

$(document).ready(function () {
    od_service_list = JSON.parse(sessionStorage.getItem('od_service_list'));
    var cur_od_service_seq = getQueryVariable('od_service_seq');

    
    $.each(od_service_list, function (i, service_item) {
        
        if (cur_od_service_seq == service_item.od_service_seq) {
            $.each(service_item.sub_list, function (j, sub_service_item) {

                var od_service_sub_desc = '服务批次-' + sub_service_item.od_service_sub_order_by;

                var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_info_frame_of_service_info_sub.aspx?rnd=' +
                    Math.random() + '&od_seq=' +
                    sub_service_item.od_seq + '&od_service_seq=' +
                    sub_service_item.od_service_seq + '&od_service_sub_seq=' +
                    sub_service_item.od_service_sub_seq +
                    '" style="width:100%;height:100%;"></iframe>';

                $('#tabs').tabs('add', {
                    title: od_service_sub_desc,
                    content: content,
                    closable: false,
                    selected: true,
                    border: false,
                });
            });
        } 
    }); 
 
     
});

 
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}