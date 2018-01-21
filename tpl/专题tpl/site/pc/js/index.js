var YD={};
$(function(){
	// pc预约到婚博会【并领券】弹窗
	// hapj(function(H) { H.get('bootstrap').initAppointHbh() });
	// $('.appointment').each(function() {
	//     $(this).attr('storeid', $(this).attr('href'))
	// })

	YD.drag($(".drag-box"))								//设置模块可拖拽

	// sidebar($(".aside-nav"));	                    //侧边栏

	//头图与侧边栏重叠时，隐藏侧边栏
// 	YD.toggleAside($(".aside-nav"),1000+193);

	// // 头图元素移动效果
	// $(window).mousemove(function(e){
	// 	var x=e.pageX;
	// 	// alert(1);
	// 	// document.write(x);
	// 	var W=parseInt($("body").css("width"))/2;
	// 	var d1=15;
	// 	var d2=6;
	// 	var x1=(W-x)/W*d1;
	// 	var x2=(W-x)/W*d2;
	// 	var x3=(x-W)/W*d2;
	// 	var x1JSON=JSON.parse(YD.prefix("transform","translate("+x1+"px,0)"));
	// 	var x2JSON=JSON.parse(YD.prefix("transform","translate("+x2+"px,0)"));
	// 	var x3JSON=JSON.parse(YD.prefix("transform","translate("+x3+"px,0)"));
	// 	$(".layer0").css(x1JSON);
	// 	$(".part1").css(x2JSON);
	// 	$(".layer6").css(x2JSON);
	// 	$(".layer2").css(x2JSON);
	// 	$(".part2").css(x3JSON);
	// 	$(".part3").css(x3JSON);
	// })

	// // 导航顶部固定
	// var y=$(".yd-nav-body").offset().top;
	// $(window).scroll(function(){
	// 	if($(window).scrollTop()>y){
	// 		$(".yd-nav-body").addClass("nav-fix");
	// 	}else{
	// 		$(".yd-nav-body").removeClass("nav-fix");
	// 	}
	// })

	//倒计时,手动给定时间
	// YD.timeCounter($("timer-box"),"2017/6/18 23:59:59");

	// 倒计时模块，从页面获取时间
	// YD.SetTimer($(".time-counter-body"));

});

// 倒计时模块
YD.SetTimer=function(timerBox){
	if(location.href.indexOf("edit"===-1)){
		timerBox.each(function(){
			var deadline=$(this).find(".time").text();
			YD.timeCounter($(this),deadline);
		})
	}
}
// 倒计时，参数：显示倒计时的容器，截止时间，截止提示文字
YD.timeCounter=function(timerBox,deadline,text){
	var time=YD.getTime(deadline);//获取时分秒
	(text==undefined)&&(text="活动已截止");
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
		var timeStr=(parseInt(duration/count)+100+"").substring(1);
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
}

// 点击锚点跳转并高亮
YD.hightlightNav=function(navs,targets){
	var len=targets.length;

	navs.click(function(){
		// $(window).off("scroll");

		var i=navs.index($(this));
		var offsetTopValue=targets.eq(i).offset().top;
		var that=$(this);

		$(window).scrollTop(offsetTopValue);
		that.siblings().removeClass("selected");
		that.addClass("selected");
		
	})

	$(window).scroll(function(){
		var len=targets.length;
		var scrollTopValue=$(window).scrollTop();

		navs.eq(i).siblings().removeClass("selected");

		for(var i=len-1;i>=0;i--){
			var offsetTopValue=targets.eq(i).offset().top;

			if(scrollTopValue>(offsetTopValue-200)){
				
				navs.eq(i).addClass("selected");
				break;
			}
		}
	})
}

// 添加css前缀
YD.addPrefix=function(prop, value, prefixs) {
  var cssObj = {};
  cssObj[prop] = value;
  for (var i = 0; i < prefixs.length; i++) {
    cssObj[prefixs[i] + prop] = value;
  }
  return cssObj;
}

// 设置可编辑模式下，模块拖拽功能，传入模块父元素
YD.drag=function(dom){
	var url=window.location.href;
	if(url.indexOf('static_edit') !=-1 ){
	      dom.sortable({ revert: true });
	  }
}

// 侧边导航与头图重叠时，隐藏侧边导航，dom是侧边栏dom对象，y=头图高度+头部导航高度（193px）
YD.toggleAside=function(dom,y){
    dom.removeAttr("style");
    var top=y-parseInt(dom.css("top"));
    $(window).scroll(function(){
        var scroll=$(window).scrollTop();
    	if(scroll>=top){
    		dom.fadeIn();
    	}else{
    		dom.fadeOut();
    	}
    })
}

// 给css样式添加私有前缀
YD.prefix=function(property,value){
	return '{"'+property+'":"'+value+'","-ms-'+property+'":"'+value+'","-moz-'+property+'":"'+value+'","-webkit-'+property+'":"'+value+'","-o-'+property+'":"'+value+'"}';
}


/*--------------------------------------组件封装PC端---------------------------------------------*/

/*封装“无缝滚动”函数组件*/
	//【html结构】：clearfix为清浮动类
	/*<div id="test">
		<ul class="tabsRollPcUl clearfix">
			<li></li>
		</ul>
		<div class="tabsRollPcNav clearfix"></div>
	</div>*/

	//【调用方法】
	// var test=new YQHtabsRollPc();
	// test.tabRoll({
	// 	id:'test',
	// 	time:1000    
	// });

	function YQHtabsRollPc(){
		this.opt={
			id:'',
			time:4000
		};
		this.oWrap=null;
		this.oUl=null;
		this.aLi=null;
		this.nav=null;
		this.aSpan=null;
		this.arrowLf=null;
		this.arrowRt=null;

		this.numWrap=0;
		this.numer=0;
		this.timer=null;
		this.num1=0;
	    this.num2=0;
	    this.imgLeft=0;
	};
	YQHtabsRollPc.prototype.tabRoll=function(opt){
		$.extend(this.opt,opt);
		var This=this;
		this.init();		//初始化
		this.inerVal();		//定时器
		this.btnNavEvent();	//鼠标点击导航图标按钮
		this.btnArrowEvent();	//鼠标点击箭头按钮
		this.mouseStaEnd();	//用户移入关闭定时器,离开开启定时器

		//可视区域改变时重新执行 初始化and鼠标点击按钮
		$(window).resize(function(event) {
			This.init();
			This.btnNavEvent();
		});
	};
	YQHtabsRollPc.prototype.init=function(){
		var str='';
		var This=this;
		this.oWrap=$('#'+this.opt.id);
		this.oUl=this.oWrap.find('.tabsRollPcUl');
		this.aLi=this.oWrap.find('li');
		this.aImg=this.oWrap.find('img');
		this.nav=this.oWrap.find('.tabsRollPcNav');
		this.numWrap=this.oWrap.width();
		this.arrowLf=this.oWrap.find(".arrow-left");
		this.arrowRt=this.oWrap.find(".arrow-right");
		//设置li宽度
		this.aLi.width(this.numWrap);
		this.numer=this.aLi[0].offsetWidth;

		//设置ul宽度
		this.oUl.width((this.aLi.length+1)*this.numer);		

		//设置img margin-left值，让他在li里面始终居中
		this.imgLeft=this.aImg.width() - this.oWrap.width();
		this.aImg.css('margin-left',-This.imgLeft/2);

		//动态创建span按钮
		for(var i=0; i<this.aLi.length; i++){ str+='<span></span>' };
		this.nav.html(str);
		this.aSpan=this.nav.find('span');
		this.aSpan.eq(0).addClass('active');
	};
	YQHtabsRollPc.prototype.clearBefore=function(This){
		This.aLi.each(function(i,element){
			$(this).removeAttr("style");
			This.aLi.width(This.numWrap);
			This.oUl.css('left',-This.num1*This.numer);
		})
	}
	YQHtabsRollPc.prototype.inerVal=function(){
		var This=this;
		YQHtabsRollPc.prototype.clearBefore(This);
		if(this.aLi.length==1){
	       	this.nav.hide();
	        return;
	    };
	    // clearInterval(This.timer);
	    this.timer=setInterval(function(){
	    	
	        if(This.num1==(This.aLi.length-1)){
	            This.aLi.eq(0).css('position','relative');
	            This.aLi.eq(0).css('left',This.aLi.length*This.numer);
	            This.num1=0;
	        }else if(This.num1==0){
	            This.aLi.eq(0).css('position','static');
	            This.oUl.css('left',0);
	            This.num2=0;
	            This.num1++;
	        }else{
	            This.num1++;
	        };
	        This.num2++;
	        This.aSpan.each(function(i,element){
	            $(this).removeClass('active');
	        });
	        This.aSpan.eq(This.num1).addClass('active');
	        This.oUl.animate({left:-This.num2*This.numer},200,function(){
	            
	        });
	    },This.opt.time);
	};
	YQHtabsRollPc.prototype.btnNavEvent=function(){
	    var This=this;
	    if(this.aLi.length==1){
	        return;
	    };
	    this.aSpan.each(function(i,element){
	        $(this).click(function(){
            YQHtabsRollPc.prototype.clearBefore(This);
	            This.aSpan.each(function(){
	                $(this).removeClass('active');
	            });
	            $(this).addClass('active');
	            var numIndex=$(this).index();
	            This.num1=numIndex;
	            This.num2=numIndex;
	            This.oUl.animate({left:-numIndex*This.numer},300);
	        });
	    });
	};
	YQHtabsRollPc.prototype.btnArrowEvent=function(){
	    var This=this;
	    if(this.aLi.length==1){
	        return;
	    };

	        this.arrowLf.click(function(){
              YQHtabsRollPc.prototype.clearBefore(This);

	            This.aSpan.eq(This.num1).removeClass('active');

	            if(This.num1==0){
	            	This.num1=This.aLi.length-1;
	            	This.aLi.eq(0).css({"margin-left":This.numer});
	            	This.aLi.eq(This.aLi.length-1).css({"margin-left":-This.aLi.length*This.numer});
	            	This.oUl.css({"left":-This.numer});
	            	This.num2=1;
	            }else if(This.num1==(This.aLi.length-1)){
	            	This.aLi.eq(0).css({"margin-left":0});
	            	This.aLi.eq(This.aLi.length-1).css({"margin-left":0});
	            	This.oUl.css({"left":-(This.aLi.length-1)*This.numer});
	            	This.num2=This.aLi.length-1;
	            	This.num1--;
	            }else{
	            	This.num1--;
	            	
	            }
	            This.num2--;
	            This.oUl.animate({"left":-This.num2*This.numer},300);
	            This.aSpan.eq(This.num1).addClass('active');
	        });

	        this.arrowRt.click(function(){

              YQHtabsRollPc.prototype.clearBefore(This);

	            This.aSpan.eq(This.num1).removeClass('active');

	            if(This.num1==(This.aLi.length-1)){
	            	This.num1=0;
	            	This.aLi.eq(0).css({"position":"relative","left":This.aLi.length*This.numer});
	            }else if(This.num1==0){
	            	This.aLi.eq(0).css({"position":"static"});
	            	This.oUl.css({"left":0});
	            	This.num2=0;
	            	This.num1++;
	            }else{
	            	This.num1++;
	            	
	            }
	            This.num2++;
	            This.oUl.animate({"left":-This.num2*This.numer},300);
	            This.aSpan.eq(This.num1).addClass('active');
	        });

	};
	YQHtabsRollPc.prototype.mouseStaEnd=function(){
		var This=this;
		this.oWrap.mouseenter(function(event) {
			clearInterval(This.timer);
		});
		this.oWrap.mouseleave(function(event) {
			This.inerVal();
		});
	};
/*end*/

// 侧边栏
function sidebar(element){
	var oN=true;
	var num=600;		// 滚动条滚动到哪里隐藏侧边栏
	var view=1360;  	// 可视区域小于多少隐藏侧边栏

	init();         		// 初始化

	// 滚动条滚动
	$(window).scroll(function(event) {
		if(!oN) return;
		throttle(scrollT);
	});

	// 可视区宽度变化
	$(window).resize(function(event) {
		throttle(resizeW)
	});

	function init(){
		var W=$(window).width(); 
		var T=$(window).scrollTop();
		if(W>=view){
			element.show();
			oN=true;
		}else{
			element.hide();
			oN=false;
		};
		if(T<=num){
			element.hide();
		};
	};

	// 滚动条滚动执行函数
	function scrollT(){
		var T=$(window).scrollTop();
		if(T>=num){
			element.fadeIn(200)
		}else{
			element.fadeOut(200)
		}
	}

	// 可视区域变化执行函数
	function resizeW(){
		var W=$(window).width();
		if(W>=view){
			element.show();
			oN=true;
		}else{
			element.hide();
			oN=false;
		}
	}

	// 封装函数节流方法
	function throttle(fn,context){		
		clearTimeout(fn.timer);
		fn.timer=setTimeout(function(){
			fn.call(context);
		},100);
	}
};
