var YD={};

// 判断是否在编辑模式下
YD.isEditmode=(location.href.indexOf("static_edit")!==-1);

$(function(){
	// 获取根元素字号
	YD.fontSize=parseFloat(document.documentElement.style.fontSize);

	if(YD.isEditmode){
		// 编辑模式下
		$(".simu-btn").show();

		//设置模块可拖拽
		YD.drag($(".drag-box"));

		// 点击保存编辑时
        $(".simu-btn").click(function(){
            // 初始化
            navBox.removeAttr("style");
            $(".simu-btn").removeAttr("style");
            
            // 保存编辑
            $(".save_edit").trigger("click");
        });
    }else{
    	// 非编辑模式下

    }

    // 设置多个水平滚动区域
    // YD.horizenScroll([193,200,633],"px");							

	// 苹果手机活动申明
	if(hapj.browser.android){		//后台框架：hapj.browser.android在安卓系统下返回true
		$('.mobilePhoneSystem').hide();
	}
});

// 设置多个水平滚动区域
// 父容器class：js-horizen-scroll-box
// 子容器class：js-horizen-scroll-target
YD.horizenScroll=function(widthArr,unit){

	var boxDomArr=$(".js-horizen-scroll-box");
	var targetDomArr=$(".js-horizen-scroll-target");
	if(YD.isEditmode){
		boxDomArr.removeClass("js-hide-scrollbar");
	}else{
		boxDomArr.addClass("js-hide-scrollbar");
	}
	boxDomArr.each(function(i){
		var targetDom=targetDomArr.eq(i);
		var len=targetDom.children().length;
		var width=widthArr[i];
		$(this).css({
			"overflow-x":"auto"
		});
		targetDom.css({
			"width":width*len+unit
		})
	})
	
};

// 页面滚动到指定位置才显示
// target:切换显示的目标
// reference:页面中的参照元素
// offset:页面中的参照元素
YD.scrollShow=function(target,reference,offset){
	target.css({"display":"none"});
	$(window).scroll(function(){
		if($(window).scrollTop()>=(reference.offset().top-YD.fontSize*offset)){
			target.css({"display":"block"});
		}else{
			target.css({"display":"none"});
		}
	})
};

// 扩大点击范围
YD.expandClickArea=function(){
    var target=$(".js-expand-click");
    target.css({"cursor":"pointer"})
	target.click(function(){
		var url=$(this).find("a").attr("href");
		location.href=url;
	});
};

// 元素跟随
YD.scrollFollow=function(){
	var ele=$(".js-follow");
	var offsetTop=ele.parent().offset().top;
	ele.css({"padding":"10px 0","background":"#fff"});
	$(window).scrollTop()>offsetTop?
		ele.css({"position":"fixed","width":"100%","top":"0","left":"0"})
		:ele.css({"position":"static"});

	$(window).scroll(function(){
		$(window).scrollTop()>offsetTop?
			ele.css({"position":"fixed","width":"100%","top":"0","left":"0"})
			:ele.css({"position":"static"});
	})
}

// 锚点定位
YD.anchorTo=function(offset){
	!offset&&offset=0;
	var navs=$(".js-anchor li");
	var target=$(".js-nav-target");
	navs.css({"cursor":"pointer"});
	navs.click(function(){
		var i=navs.index($(this));
		$(this).addClass("selected").siblings().removeClass("selected");
		$(window).scrollTop(target.eq(i).offset().top+offset);
	})
}

// 导航自动高亮
YD.autoHightlightNav=function(){
	var navs=$(".js-auto-highlight li");
	
	function setNavSelected(){
		var scrollTopValue=$(window).scrollTop();

		navs.eq(i).siblings().removeClass("selected");

		for(var i=len-1;i>=0;i--){
			var offsetTopValue=targets.eq(i).offset().top;

			if(scrollTopValue>(offsetTopValue-200)){
				
				navs.eq(i).addClass("selected");
				break;
			}
		}
	}
	// 首次判断
	setNavSelected();
	// 滚动判断
	$(window).scroll(function(){
		setNavSelected();
	})
}

// 轮播图
/*html:
<div class="flexslider">
	<ul class="slides">
		<li><img src="../images/weddingExpoFile-extend-img80.jpg"/></li>
		<li><img src="../images/weddingExpoFile-extend-img80.jpg"/></li>
		<li><img src="../images/weddingExpoFile-extend-img80.jpg"/></li>
		<li><img src="../images/weddingExpoFile-extend-img80.jpg"/></li>
	</ul>
</div>*/
flexslider();
function flexslider(){
	if(YD.isEditmode){
		// 编辑模式下
		$('.flexslider').height($('.flexslider img').height());
	    $('.flexslider').css({
	        'overflow-x': 'hidden',
	        'overflow-y': 'auto'
	    });
	}else{
		// 非编辑模式下
	    $('.flexslider').css({ 'overflow': 'hidden' });
	    $(".flexslider").flexslider({
			animation: "slide",				// 图片变换方式：淡入淡出(fade)或者滑动(slide)
        	direction: "horizontal",       	// 图片滑动方向：左右(horizontal)、上下(vertical)
        	directionNav: true, 			// 是否显示左右控制按钮(wap端要设置为false)
        	slideshow: true,				// 是否自动播放
        	randomize: false, 				// 是否随机幻灯片
        	controlNav: true,				// 是否显示控制菜单(小圆点)
        	animationSpeed: 600,			// 滚动过度效果播放时长
        	slideshowSpeed: 3000, 			// 自动播放速度毫秒
        	mousewheel: true, 				// 鼠标滚轮控制图片滑动
        	pauseOnHover:true			    // 鼠标移入或点击按钮区域后是否继续轮播(建议设置为true)
		});
	}
};

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
};

// 判断是否为移动端
YD.isMoble=function(){
	return Boolean(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i));
};

// 首屏动画（手指向上滑动，首屏向上滑出）
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
};

// 设置可编辑模式下，模块拖拽功能，传入模块父元素
YD.drag=function(dom){
	if(YD.isEditmode){
	      dom.sortable({ revert: true });
	  }
};

/*
 多个倒计时，截止时间可编辑
html结构：
<div class="timer-box">
	<span class="time">2017/9/5 23:59:59</span>
</div>
*/
YD.SetTimer=function(){
	var timerBox=$(".timer-box");
	if(!YD.isEditmode){
		// 非编辑模式下
		timerBox.each(function(){
			var deadline=$(this).find(".time").text();
			YD.timeCounter($(this),deadline);
		})
	}
};

// 单个倒计时,手动给定时间，参数：显示倒计时的容器，截止时间，截止提示文字
YD.timeCounter=function(timerBox,deadline,text){
	var time=YD.getTime(deadline);//获取时分秒
	(text===undefined)&&(text="活动已截止");
	// console.log(time);
	if(time.day!==undefined){
		timerBox.html("<i>"+time.day+"</i>天<i>"+time.hour+"</i>时<i>"+time.minute+"</i>分<i>"+time.second+"</i>秒")
		setTimeout(function(){
			YD.timeCounter(timerBox,deadline,text);
		},1000);
	}else{
		timerBox.html(text);
	}
}
	
// 获取天、时、分、秒
YD.getTime=function(deadline){
	// console.log(deadline);
	deadline=new Date(deadline).getTime();
	var currentTime=new Date().getTime();
	var duration=deadline-currentTime;
	var time={};
	// console.log(deadline,currentTime,duration);
	function pushTimeStr(count,tag){
		var timeStr=parseInt(duration/count);
		timeStr<100&&(timeStr=(timeStr+100+"").substring(1));
		// 迭代duration
		duration=duration%count;
		time[tag]=timeStr;
	}
	if(duration>=0){
		pushTimeStr(86400000,"day");
		pushTimeStr(3600000,"hour");
		pushTimeStr(60000,"minute");
		pushTimeStr(1000,"second");
	}else{
		return time;
	}
	return time;
};

// 添加css前缀，返回css对象
YD.addPrefix=function(prop, value, prefixs) {
  var cssObj = {};
  cssObj[prop] = value;
  for (var i = 0; i < prefixs.length; i++) {
    cssObj[prefixs[i] + prop] = value;
  }
  return cssObj;
};
