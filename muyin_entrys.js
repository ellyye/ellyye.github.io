YD={};
	YD.showEntry=function(entrys){if(location.href.indexOf("edit")===-1){entrys.each(function(){var ifshow=($(this).attr("href").indexOf("javascript")!==-1);if(ifshow){$(this).parent().hide()}else{$(this).parent().show()}})}};

	var style='<style>.entry-list-fix{position:fixed;z-index:9;width:100%;bottom:0;left:0}.entry-list-box{margin:auto;width:16rem;text-align:center;font-size:0}.entry-list-box .entry-box{display:inline-block;vertical-align:top;margin:.1rem;width:5.125rem;height:1.825rem;line-height:1.825rem;background-size:cover;background-repeat:no-repeat}.entry-list-box .entry-box a{position:relative;display:block;width:100%;height:100%;padding:5px 0;line-height:1.2;color:#fff;font-size:.625rem;padding-left:.5rem;padding-right:2rem;text-align:left;font-weight:700;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.entry-list-box .entry-box a:after{content:"";position:absolute;top:0;right:1.5rem;width:.525rem;height:100%;background:url(http://img.tthunbohui.cn/zhuanti/17544/arrow.png) no-repeat center;background-size:contain}.entry-list-box .entry-box1{background-image:url(http://img.tthunbohui.cn/zhuanti/17544/btn_bg1.png)}.entry-list-box .entry-box1 a{text-align:right;padding-left:1.4rem;padding-right:1.15rem}.entry-list-box .entry-box1 a:after{right:.5rem}.entry-list-box .entry-box2{background-image:url(http://img.tthunbohui.cn/zhuanti/17544/btn_bg2.png)}.entry-list-box .entry-box3{background-image:url(http://img.tthunbohui.cn/zhuanti/17544/btn_bg3.png)}</style>';
	// var html='<div class="entry-list-fix"><ul class="entry-list-box">		<li class="entry-box entry-box1"><a href="'+entrys[0].url+'">'+entrys[0].txt+'</a></li>		<li class="entry-box entry-box2"><a href="'+entrys[1].url+'">'+entrys[1].txt+'</a></li>		<li class="entry-box entry-box3"><a href="'+entrys[2].url+'">'+entrys[2].txt+'</a></li>	</ul>	</div>';
		
	YD.showEntry($(".entry-box a"));
	// $("#entry").html("").append($(style)).append($(html));
	$("#entry-style").html(style);
