
function transExhib(isWeddEx,isHomeEx,isOtherEx){
	if(location.href.indexOf("edit")===-1){
			var html='<div class="tcpc"><div class="expo_tc"><h3>索票已截止。请到现场买票入场（15元/位）。</h3><p>①开展时间：03月10日（9:30-20:00）、03月11日（9:30-19:30）。</p><p>②本展会为会员制，须出示身份证买票入场。</p><p>现场客服：0571-28198800</p><p>2018夏季<span>中国婚博会</span>将于6月23日-24日在杭州国际博览中心隆重召开！</p><div class="tc_close">X</div><div class="go_next">前往索取下届展会门票</div></div></div><div class="tcwap"><div class="expo_tc"><h3>索票已截止。请到现场买票入场（15元/位）。</h3><p>①开展时间：03月10日（9:30-20:00）、03月11日（9:30-19:30）。</p><p>②本展会为会员制，须出示身份证买票入场。</p><p>现场客服：0571-28198800</p><p>2018夏季<span>中国婚博会</span>将于6月23日-24日在杭州国际博览中心隆重召开！</p><div class="tc_close">X</div><div class="go_next">前往索取下届展会门票</div></div></div>';
			var css='.expo_tc{width:600px;overflow:hidden;border:solid red 1px;text-align:center;position:fixed;padding:10px;font-size:20px;background:#fff;z-index:9999;display:none}.expo_tc h3{margin-bottom:10px}.tc_close{position:absolute;right:10px;top:0;font-size:20px;cursor:pointer}.go_next{width:400px;height:40px;line-height:40px;background:red;color:#fff;text-align:center;margin:10px auto;cursor:pointer}@media screen and (max-width:1024px){.expo_tc{width:15rem;overflow:hidden;border:solid red 1px;text-align:center;position:fixed;padding:.25rem;font-size:.5rem;background:#fff;z-index:9999;margin-left:-.25rem}.expo_tc h3{margin-bottom:.25rem}.tc_close{position:absolute;right:.25rem;top:0;font-size:.5rem}.go_next{width:10rem;height:1rem;line-height:1rem;background:red;color:#fff;text-align:center;margin:.25rem auto}}.expo_tc span{color:red;display:inline-block}';
		    $("body").append(html);
		    $("body").append("<style>"+css+"</style>");
		    //换届弹窗点击关闭
			$('.tc_close,.go_next').click(function(){
		      		$(this).parent().hide()
		    	})
		    	
			//换届时间（开展前一天）
			function timestart(){
			    	var expotime = new Date("2018/03/11 12:00:00");
			    	
			    	var expotimemin = new Date("2018/03/09 15:00:00");
			        //大展
			        if(isWeddEx){
					    if( new Date() - expotime > 0 ){
					            $('.expo_time').text("杭州国际博览中心 6月23-24日")
					    }
					    else{
					            $('.expo_time').text("·杭州国际博览中心 3月10-11日·")
					    }
				    }
				    //小展
				if(isOtherEx){
				    if( new Date() - expotimemin >0 ){
				            $('.min_time').text("杭州国际博览中心 6月23-24日")
				    }else{
				        console.log(1);
				            $('.min_time').text("·杭州国际博览中心 3月10-11日·")
				    }
				}
			}
			timestart();
			//弹窗出现条件
			function timer(){
			           var str = new Date("2018/03/11 12:00:00")
			           var end = new Date("2017/03/11 20:00:00")
			           
			           var strmin = new Date("2018/03/9 15:00:00")
			           var endmin = new Date("2018/03/11 20:00:00")
			           
			           var Top = ($(window).height()-$('.expo_tc').height())/2;
			           var Left = ($(window).width()-$('.expo_tc').width())/2;
		                //大展
		            if(isWeddEx){
		                if($('.expo_tc').parent().hasClass('tcpc')){
		                    if(new Date() - str > 0 && new Date() - end <0){
		                        $('.tcpc .expo_tc').css({'top':Top,'left':Left}).show()
		                    }else{
		                        $('.expo_tc').hide()
		                    }
		                }
		            }
		                //小展
		                if(isOtherEx){
		                if($('.expo_tc').parent().hasClass('tcwap')){
		                    if(new Date() - strmin > 0 && new Date() - endmin <0){
		                        $('.tcwap .expo_tc').css({'top':Top,'left':Left}).show()
		                    }else{
					console.log(1);
		                        $('.expo_tc').hide()
		                    }
		                }
		                }
			}
			timer();

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
	}
}
