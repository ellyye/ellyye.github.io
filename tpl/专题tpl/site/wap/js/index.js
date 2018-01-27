var YD={};
var YQHhotel={}; 
$(function(){
	// 获取根元素字号
	YD.fontSize=parseFloat(document.documentElement.style.fontSize);
	
	//设置模块可拖拽
	YD.drag($(".drag-box"))								

	// 苹果手机活动申明
	if(hapj.browser.android){		//后台框架：hapj.browser.android在安卓系统下返回true
		$('.mobilePhoneSystem').hide();
	}
	
});

// 页面滚动到指定位置才显示
YD.scrollShow=function(target,reference,offset){
	target.css({"display":"none"});
	$(window).scroll(function(){
		if($(window).scrollTop()>=(reference.offset().top-YD.fontSize*offset)){
			target.css({"display":"block"});
		}else{
			target.css({"display":"none"});
		}
	})
}

// 绑定单击事件
YD.bind=function(){
	$(".m-coupon-box").click(function(){
		var url=$(this).find("a").attr("href");
		location.href=url;
	})
};

// 轮播图
flexslider();
function flexslider(){
	var url=window.location.href;
	// $('.flexslider').height('8.2rem');
	if( url.indexOf('static_edit') !=-1 ){
		// 编辑模式下
	    $('.flexslider').css({
	        'overflow-x': 'hidden',
	        'overflow-y': 'auto'
	    });
	    // $('.flexslider').find('li').show();
	}else{
		// 非编辑模式下
	    $('.flexslider').css({ 'overflow': 'hidden' });
	    $('.flexslider').flexslider({
			animation: "slide",				// 图片变换方式：淡入淡出(fade)或者滑动(slide)
        	direction: "horizontal",       	// 图片滑动方向：左右(horizontal)、上下(vertical)
        	directionNav: true, 			// 是否显示左右控制按钮(wap端要设置为false)
        	slideshow: true,				// 是否自动播放
        	randomize: false, 				// 是否随机幻灯片
        	controlNav: false,				// 是否显示控制菜单(小圆点)
        	animationSpeed: 600,			// 滚动过度效果播放时长
        	slideshowSpeed: 3000, 			// 自动播放速度毫秒
        	mousewheel: true, 				// 鼠标滚轮控制图片滑动
        	pauseOnHover:true			    // 鼠标移入或点击按钮区域后是否继续轮播(建议设置为true)
		});
	}
}


// 点击锚点跳转并高亮
YD.hightlightNav=function(navs,targets,position,offset){
	var len=targets.length;
	var i;
		
	navs.click(function(){
		// $(window).off("scroll");
		console.log(1);

		i=navs.index($(this));
		var offsetTopValue=targets.eq(i).offset().top;
		var that=$(this);
        if(position==="bottom"){
            // 导航在底部
		    $(window).scrollTop(offsetTopValue);
        }else if(position==="top"){
            // 导航在顶部
			$(window).scrollTop(offsetTopValue-offset*YD.fontSize);
		}
	});

	$(window).scroll(function(){
		var len=targets.length;
		var scrollTopValue=$(window).scrollTop();

		for(i=len-1;i>=0;i--){
			var offsetTopValue=targets.eq(i).offset().top;

			if(scrollTopValue>(offsetTopValue-200)){
				navs.eq(i).siblings().removeClass("selected");
				navs.eq(i).addClass("selected");
				break;
			}
		}
	})
}
//跟随导航
YD.followNav=function(){
	var maxScrollH=$(".nav-placeholder").offset().top;
	$(window).scroll(function(){
		if($(window).scrollTop()>maxScrollH){
			$(".follow-nav").css({"position":"fixed"});
		}else{
			$(".follow-nav").css({"position":"static"});
		}
		
	})
} 

// 水平滚动导航
YD.navScroll=function(navBox,boxW,fontSize){
    var txtNum=0;
	var navNum=navBox.children().length;
	for(var i=0;i<navNum;i++){
	   // 获取字符串并去头尾
	    var txt=navBox.children().eq(i).text().replace(/(^\s*)|(\s*$)/g, "");
	    txtNum+=txt.length;
	}
	console.log(txtNum);
	console.log(1);
	navBox.width(boxW*navNum+txtNum*fontSize+"rem");
}

// 判断是否为移动端
YD.isMoble=function(){
	return Boolean(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i));
}

// 首屏效果（手指向上滑动，首屏向上滑出）
YD.firstScreenMoveup=function(){
	var startY=0;
	var firstScreen=$(".first-screen");

    // 初始化首屏状态
    firstScreen.removeClass("move");
    
    // 非首次访问隐藏首屏
    if($(window).scrollTop()>0){
        firstScreen.addClass("move");
    }
	
    // 定义事件处理函数
	function getStartY(){
	    var e=arguments[0]||window.event;
		e.preventDefault();
		if(e.type==="touchstart"){
			var touch=e.touches[0];
			startY=touch.pageY;
		}else{
			startY=e.pageY;
		}
		console.log(startY);
	}
	function getEndY(){
	    var e=arguments[0]||window.event;
	    var endY=0,dist=0;
		if(e.type==="touchend"){
			endY=e.changedTouches[0].pageY;
			console.log(endY);
		}else{
			endY=e.pageY;
		}

		dist=endY-startY;
		console.log(dist);
		if(dist<-10){
			$(this).addClass("move");
		}
	}
	
    // 绑定事件处理函数
	firstScreen[0].addEventListener("mousedown",getStartY);
	firstScreen[0].addEventListener("touchstart",getStartY);
	firstScreen[0].addEventListener("mouseup",getEndY);
	firstScreen[0].addEventListener("touchend",getEndY)
}

// 设置可编辑模式下，模块拖拽功能，传入模块父元素
YD.drag=function(dom){
	var url=window.location.href;
	if(url.indexOf('static_edit') !=-1 ){
	      dom.sortable({ revert: true });
	  }
}

//倒计时
YD.timeCounter=function(){
	var time=YD.getTime("2017/6/9 23:59:59");//获取时分秒
	$(".time-counter-body").html("<span>"+time[0]+"</span><span>天</span><span>"+time[1]+"</span><span>时</span><span>"+time[2]+"</span><span>分</span><span>"+time[3]+"</span><span>秒</span>")
	setTimeout(YD.timeCounter,1000);//定时器
};

// 获取天、时、分、秒
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

// 给css样式添加私有前缀
YD.prefix=function(property,value){
	return '{"'+property+'":"'+value+'","-ms-'+property+'":"'+value+'","-moz-'+property+'":"'+value+'","-webkit-'+property+'":"'+value+'","-o-'+property+'":"'+value+'"}';
}
