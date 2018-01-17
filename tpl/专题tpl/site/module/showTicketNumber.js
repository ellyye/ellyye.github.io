YD.showTicketNumber=function(dom){
	$.post('http://'+window.location.host+'/m/expo/_get_ticket_count',  {project_id: [1]}, function(json){
        if(json.err == 'hapn.ok') {
            dom.html(json.data.ticket_count);
       	 }
    }, 'json');
}