
//换届时间（开展前一天）
// 结婚展（大展）：1
// 家装展）：2
// 其他展（小展）：3
// start:"2018/03/11 12:00:00"
// end:"2017/03/11 20:00:00"
// function transExhib(ExType,start,end,[curAddr],[nxtAddr])
// 默认杭州开展
function transExhib(ExType,start,end,curAddr,nxtAddr){
	
	if(location.href.indexOf("edit")===-1){
		!curAddr&&(curAddr="-杭州国际博览中心 3月10-11日-");
		!nxtAddr&&(nxtAddr="-杭州国际博览中心 7月7-8日-");
		var html='<div class="wedd-pop pop-box">	<div class="expo_tc" style=""><h3>索票已截止。请到现场买票入场（15元/位）。</h3><p>①开展时间：03月10日（9:30-20:00）、03月11日（9:30-19:30）。</p><p>②本展会为会员制，须出示身份证买票入场。</p><p>现场客服：0571-28198800</p><p>2018夏季<span>中国婚博会</span>将于6月23日-24日在杭州国际博览中心隆重召开！</p><div class="tc_close">X</div><div class="go_next">前往索取下届展会门票</div></div></div><div class="home-pop pop-box">	<div class="expo_tc" style=""><h3>索票已截止。请到现场买票入场（15元/位）。</h3><p>①开展时间：03月10日（9:30-20:00）、03月11日（9:30-19:30）。</p><p>②本展会为会员制，须出示身份证买票入场。</p><p>现场客服：0571-28198800</p><p>2018夏季<span>中国婚博会</span>将于6月23日-24日在杭州国际博览中心隆重召开！</p><div class="tc_close">X</div><div class="go_next">前往索取下届展会门票</div></div></div><div class="other-pop pop-box">	<div class="expo_tc" style=""><h3>索票已截止。请到现场买票入场（15元/位）。</h3><p>①开展时间：03月10日（9:30-20:00）、03月11日（9:30-19:30）。</p><p>②本展会为会员制，须出示身份证买票入场。</p><p>现场客服：0571-28198800</p><p>2018夏季<span>中国婚博会</span>将于6月23日-24日在杭州国际博览中心隆重召开！</p><div class="tc_close">X</div><div class="go_next">前往索取下届展会门票</div></div></div>';
		var css='html{height:100%;}body{height:100%}.pop-box{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background:rgba(0,0,0,0.5)}.expo_tc{width:600px;overflow:hidden;border:solid red 1px;text-align:center;position:fixed;padding:10px;font-size:20px;background:#fff;z-index:9999;}.expo_tc h3{margin-bottom:10px}.tc_close{position:absolute;right:10px;top:0;font-size:20px;cursor:pointer}.go_next{width:400px;height:40px;line-height:40px;background:red;color:#fff;text-align:center;margin:10px auto;cursor:pointer}@media screen and (max-width:1024px){.expo_tc{width:15rem;overflow:hidden;border:solid red 1px;text-align:center;position:fixed;padding:.25rem;font-size:.5rem;background:#fff;z-index:9999;margin-left:-.25rem}.expo_tc h3{margin-bottom:.25rem}.tc_close{position:absolute;right:.25rem;top:0;font-size:.5rem}.go_next{width:10rem;height:1rem;line-height:1rem;background:red;color:#fff;text-align:center;margin:.25rem auto}}.expo_tc span{color:red;display:inline-block}';
	    $("body").append(html);
	    $("body").append("<style>"+css+"</style>");
	    var weddPop=$(".wedd-pop");
	    var homePop=$(".home-pop");
	    var otherPop=$(".other-pop");
	    var addrBox=$(".min_time");


		switch(ExType){
			// 大展
			case 1:transEx(start,end,weddPop);
			break;
			// 家装展
			case 2:transEx(start,end,homePop);
			break;
			// 小展
			case 3:transEx(start,end,otherPop);
		}
		    	
        //换届
        function transEx(start,end,pop){
//         	console.log(pop);
        	// 索票截止时间，出现弹框
        	var start=new Date(start).getTime();
        	// 下次索票开始时间，隐藏弹框
        	var end=new Date(end).getTime();
        	var now=new Date().getTime()
        	var Top = ($(window).height()-$('.expo_tc').height())/2;
        	var Left = ($(window).width()-$('.expo_tc').width())/2;
        	pop.children(".expo_tc").css({'top':Top,'left':Left});

		    //换届弹窗点击关闭
			$('.tc_close,.go_next').click(function(){
	      		pop.hide()
	    	})

        	now-start>0?addrBox.text(nxtAddr):addrBox.text(curAddr);
        	now - start > 0 && now - end <0 && pop.show();
        }
    }
}
        
//侧飘+战略合作伙伴
// function cp(){
// 	var cptime = new Date("2017/1/1 12:00:00")
// 	var cpend = new Date("2017/12/1 12:00:00")
// 	if ( new Date() - cptime>0 && new Date - cpend < 0) {	 
// 		$(window).scroll(function() {
// 		        if ($(window).scrollTop() > 400) {
// 		            $("#cp").show(10)
// 		        } else {
// 		            $("#cp").hide(10)
// 		        };
// 		})
// 	}else{
// 		$('#cp').hide()
// 	}
// }
