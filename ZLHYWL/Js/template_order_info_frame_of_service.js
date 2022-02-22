var od_service_list = undefined;

$(document).ready(function () {
    od_service_list = JSON.parse(sessionStorage.getItem('od_service_list'));
    
    $.each(od_service_list, function (i, service_item) { 
        var content = '<iframe scrolling="auto" frameborder="0"  src="template_order_info_frame_of_service_info.aspx?rnd=' +
                     Math.random() + '&od_seq=' +
                     service_item.od_seq + '&od_service_seq=' +
                     service_item.od_service_seq +  
                     '" style="width:100%;height:100%;"></iframe>';
        $('#tabs_service_list').tabs('add', {
            title: service_item.od_service_cu_desc,
            content: content,
            closable: false,
            selected: true, //i >0 ? false:true,
            border: false,
        });
    });

    sessionStorage.removeItem('od_service_list');
});