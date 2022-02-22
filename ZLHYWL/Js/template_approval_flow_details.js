var cur_amc_id = undefined;

$(document).ready(function () {
    cur_amc_id = getQueryVariable('amc_id');
    show_approval_details(cur_amc_id);
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
function show_approval_details(amc_id) {
    post('../Ashx/approval_mgr.ashx', {
        rnd: Math.random(),
        action: 'get_single_amc',
        amc_id: amc_id,
        is_my_point: 0,
    }, function (data) {
        var amc_base = data.amc_base[0];

        $('#sp_amc_relation_no').html(amc_base.relation_no);
        $('#sp_amc_status_desc').html(amc_base.amc_status_desc);
        $('#sp_amc_title').html(amc_base.amc_title);
        $('#sp_amc_create_nam').html(amc_base.amc_create_nam);
        $('#sp_amc_create_dat').html(dateformat(amc_base.amc_create_dat, true));
        $('#sp_amc_cur_opr_nam').html(amc_base.amc_cur_opr_nam);
        $('#sp_amc_finish_dat').html(dateformat(amc_base.amc_finish_dat, true));
        $('#ap_flow_details tbody').html('');
        if (data.amc_actual_flow_details.length > 0) {
            $.each(data.amc_actual_flow_details, function (i, item) {
                $('#ap_flow_details').append('<div class="row"><div class="row_line"><div class="ap_flow_details_tim">' + dateformat(item.ap_opr_dat, true) + '</div>'
                    + '<div class="ap_flow_details_desc">' + item.aps_desc + '</div>'
                    + '<div  class="ap_flow_details_nam">' + item.ap_opr_nam + '</div>'
                    + '<div  class="ap_flow_details_advice">' + item.ap_advice + '</div>'
                    + '</div>'
                    + '<div class="row_line">'
                    + '<div class="ap_flow_details_advice_left">意见:</div>'
                    + '<div class="ap_flow_details_context_right">' + item.ap_context + '</div>'
                    + '</div></div>');
            });
        }

    }, false);
     
}
