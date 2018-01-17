YD.getTime=function(deadline){
	deadline=new Date(deadline).getTime();
	var currentTime=new Date().getTime();
	var duration=deadline-currentTime;
	var time=[];
	function pushTimeStr(count){
		var timeStr=(parseInt(duration/count)+100+"").substring(1);
		duration=duration%count;
		time.push(timeStr);
	}
	if(duration>=0){
		pushTimeStr(86400000);
		pushTimeStr(3600000);
		pushTimeStr(60000);
		pushTimeStr(1000);
	}
	return time;
}