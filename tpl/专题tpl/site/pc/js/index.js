var YD={};

// 判断是否在编辑模式下
YD.isEditmode=(location.href.indexOf("static_edit")!==-1);

$(function(){
	// pc预约到婚博会【并领券】弹窗
	hapj(function(H) { H.get('bootstrap').initAppointHbh() });
	$('.appointment').each(function() {
	    $(this).attr('storeid', $(this).attr('href'))
	})

	//设置模块可拖拽
	YD.drag($(".drag-box"));							

	//头图与侧边栏重叠时，隐藏侧边栏
	YD.toggleAsideNav(721+193,$(".slice-box .btn-box").offset().top);

	// 锚点跳转，跟随高亮
	YD.hightlightNav($(".aside-nav .nav"),$(".nav-target"),125);

	//单个倒计时,手动给定时间
	// YD.timeCounter($("timer-box"),"2017/6/18 23:59:59");

	//多个倒计时，截止时间可编辑
	// YD.SetTimer($(".time-counter-body"));

});

// 扩大点击范围
YD.expandClickArea=function(target){
	target.click(function(){
		var url=$(this).find("a").attr("href");
		location.href=url;
	})
};

// 多个倒计时，截止时间可编辑，参数：显示倒计时的容器
YD.SetTimer=function(timerBox){
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

// 锚点跳转，跟随高亮
YD.hightlightNav=function(anchors,targets,offset){
	var len=targets.length;
	// 锚点跳转
	anchors.click(function(){

		var i=anchors.index($(this));
		var offsetTopValue=targets.eq(i).offset().top-offset;
		$(window).scrollTop(offsetTopValue);
	})

	// 跟随高亮
	function setNavSelected(){
		var scrollTopValue=$(window).scrollTop();

		anchors.eq(i).siblings().removeClass("selected");

		for(var i=len-1;i>=0;i--){
			var offsetTopValue=targets.eq(i).offset().top;

			if(scrollTopValue>(offsetTopValue-200)){
				
				anchors.eq(i).addClass("selected");
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

// 设置可编辑模式下，模块拖拽功能，传入模块父元素
YD.drag=function(dom){
	var url=window.location.href;
	if(YD.isEditmode){
	      dom.sortable({ revert: true });
	  }
};

// 侧边导航与头图重叠时，隐藏侧边导航，y=头图高度+头部导航高度（193px）
YD.toggleAsideNav=function(min,max){
	var dom=$(".aside-nav");
    var top=min-parseInt(dom.css("top"));

    // 首次判断
    if(max){
    	($(window).scrollTop()>=min)&&($(window).scrollTop()<=max)?dom.show():dom.hide();
    }else{
    	$(window).scrollTop()>=min?dom.show():dom.hide();
    }

    // 滚动判断
    $(window).scroll(function(){
        var scroll=$(window).scrollTop();
        if(max){
        	(scroll>=min)&&(scroll<=max)?dom.fadeIn():dom.fadeOut();
        	
        }else{
        	scroll>=top?dom.fadeIn():dom.fadeOut();
        }
    })
};

// 轮播图
// flexslider();
function flexslider(){
	if(YD.isEditmode){
		// 编辑模式下
	    $('.flexslider').css({
	        'overflow-x': 'hidden',
	        'overflow-y': 'auto'
	    });
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
};
