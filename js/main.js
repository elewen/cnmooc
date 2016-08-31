$(function(){

//关闭头部二维码
	$('#close_1').click(function(){
		$('.qr-app').hide();
	})
	


//头部左侧导航栏的hover弹出窗口
	// console.log($('.nav-car .left-list>ul>li'));
	$('.nav-car .left-list>ul>li').mouseover(function(){
		var ss=$(this).index();
		if(ss%2===0)
		{
			$('.windows:eq(0)').show();
		}else{
			$('.windows:eq(1)').show();
		}
	});
	$('.nav-car .left-list>ul>li').mouseleave(function(){
		var ss=$(this).index();
		function displayNone()
		{
			if(ss%2===0)
			{
				$('.windows:eq(0)').hide();
			}else{
				$('.windows:eq(1)').hide();
			}
		}
		$('.windows').mouseover(function(){
			clearTimeout(n);
		});
		$('.windows').mouseleave(function(){
			n=setTimeout(displayNone,0)
		});
		var n=setTimeout(displayNone,0)
	});

// 登录注册下面的checkbox
	$('.right-bar>.pub>.head>a').click(function(){
		var i=$(this).index();
		$('.right-bar>.pub>.head>a').css('border-color','#fff');
		$(this).css('border-color','#f40');
		$('.right-bar>.pub>.cont>div').css('display','none')
		$('.right-bar>.pub>.cont>div').eq(i).css('display','block')
	})

//淘宝头条轮播
	function go_0()
	{
		var i=0;
		var a;
		var oDom=$('.right-bar>.new>div>div');
		function run()
		{
			i++;
			if(i>3)
			{
				i=0;
			}
			switch(i)
			{
				case 0:a=0;break;
				case 1:a=1;break;
				case 2:a=2;break;
				case 3:a=1;break;
			}
			oDom.animate({top:-a*60+'px'},500);
		}
		//hover停止滚动,移开继续
		var ss=setInterval(run,2000);
		oDom.hover(function(){
			clearInterval(ss);
		},function(){
			ss=setInterval(run,2000);
		});
	}
	go_0();


//点击切换搜索框
	$('.seac-cho').click(function(){
		var bgc=$(this).next('div').find('button').css('background-color');//获取搜索按钮的默认颜色
		var notThis=$('.seac-cho').not(this);
		// console.log(bgc);
		$('.seac-cho').not(this).css('background-color','#fff');
		$(this).css('background-color',bgc);
		$('.seach').hide();
		$(this).next('div').show();
	})

// 轮播图(使用的前提条件是最后一张图片必须与第一张图片相同(重复第一张),所有参数均为必须)
	// 第一个轮播图
	slideShow('.bottom-1a .image-box','.bottom-1a .quick-go>li','.bottom-1a .goleft','.bottom-1a .goright','#f40','#b7b7b7',5,520,5000,500,400);
	// 第二个轮播图
	slideShow('.bottom-1b .image-box','.bottom-1b .quick-go>li','.bottom-1b .goleft','.bottom-1b .goright','#f40','#b7b7b7',6,520,3700,500,300);

	// 					组图	对应 	倒回  前进		对应按钮 	  对应按钮  图片张数	单张图片 	多久切			对应按钮延迟 	图片切换动画
	// 					div		按钮 	一张  一张		高亮颜色 	  重置颜色  不含重复	宽度		换一次			多久后高亮		持续时间
	function slideShow(imageBox,ul_li,goLeft,goRight,li_bgcHighlight,li_bgcReset,number,singleImgWidth,set_interval,li_bgcHighlightLag,animationDuration)
	{
		var a=0;
		var move=$(imageBox);//所有图片横向连接在一起所在的div
		var colo=$(ul_li);//盒子中间点击切换到指定图片的li数组
		colo.eq(0).css('background',li_bgcHighlight);//初始状态下第一张图片对应的第一个按钮高亮颜色

		// 自动切换
		function run()
		{
			a+=1;
			// console.log(a);
			if(a>number)
			{
				clearInterval(Clear);
				move.animate({left:'0px'},0);
				Clear=setInterval(run,set_interval);
				a=1;
			}
			move.animate({left:(-a*singleImgWidth)+'px'},animationDuration);
			colo.css('background',li_bgcReset);
			colo.eq(a).css('background',li_bgcHighlight);
			if(a>(number-1))
			{
				colo.eq(0).css('background',li_bgcHighlight);
			}
			// console.log(a);

		}
		var Clear=setInterval(run,set_interval);

		// checkBox颜色改变函数
		function btnColorChenge(){
			setTimeout(function(){
				colo.css('background',li_bgcReset);
				colo.eq(a).css('background',li_bgcHighlight);
			},li_bgcHighlightLag);
		}

		// 向左倒回一张
		var btnL=$(goLeft);
		var btnR=$(goRight);
		btnL.click(function(){
			clearInterval(Clear);
			if(a<1)
			{
				a=number;
			}
			move.animate({left:(-a+1)*singleImgWidth+'px'},animationDuration);
			a--;
			// console.log(a);//此处
			btnColorChenge();
			
			Clear=setInterval(run,set_interval);
		});
		// 向右前进一张
		btnR.click(function(){
			clearInterval(Clear);
			if(a>(number-1))
			{
				a=0;
			}
			a++;
			if(a>(number-1))
			{
				a=0;
			}
			move.animate({left:-a*singleImgWidth+'px'},animationDuration);
			// console.log(a);//此处
			btnColorChenge();
			Clear=setInterval(run,set_interval);
		});

		// checkBox切换
		colo.click(function(){
			clearInterval(Clear);
			a=$(this).index();
			// console.log(a);
			move.animate({left:-a*singleImgWidth+'px'},animationDuration);
			btnColorChenge();
			a=a;
			Clear=setInterval(run,set_interval);
		});
	}


// 我常逛的滑上动画
	function moveUp_1()
	{
		$('.dtd .rig1>.btm>.rig14').hover(function(){
			$(this).find('div').animate({bottom:'10px'},200);
		},function(){
			$(this).find('div').animate({bottom:'-60px'},200);
		})
	}
	moveUp_1();

	// hover二维码动画
	function qr_1()
	{
		$('.fashion>div>div>.heade>span>i').hover(function(){
			$(this).next('span').fadeIn();
			// var ss=$(this).next('span');
			
			// function aaa()
			// {
			// 	ss.slideDown();
			// 	console.log('in');
			// }
			// setTimeout(aaa,100);
		},function(){
			$(this).next('span').fadeOut();
			// var ss=$(this).next('span');
			
			// function aaa()
			// {
			// 	ss.slideUp();
			// 	console.log('out');
			// }
			// setTimeout(aaa,100);
		})
	}
	qr_1();

// 侧边快速跳转栏相关函数
	$(window).scroll( function(){
		// 获取
		var yGoed=$(window).scrollTop();

		// 侧边快速跳转栏位置判断及定位方式转换
		if(yGoed>=525)
		{
			$('.quickGo').css({'position':'fixed','top':'50px'});
		}else{
			$('.quickGo').css({'position':'absolute','top':'572px'});
		}

		// 按钮跟随页面滚动位置的hover效果
		// 函数
		function hoverMe(theClass,yMin,yMax)
		{
			if(yGoed>=yMin && yGoed<yMax)
			{
				$('#'+theClass).addClass(theClass);
				$('#'+theClass).find('a').attr('id','cfff');
			}else{
				$('#'+theClass).removeClass(theClass);
				$('#'+theClass).find('a').attr('id','');
			}
		}
		//调用
		hoverMe('Often',-999999,1670);
		hoverMe('Fashi',1670,1970);
		hoverMe('Quality',1970,2570);
		hoverMe('Feature',2570,3160);
		hoverMe('Economy',3160,4230);
		hoverMe('guessY',4230,999999);
		
	});

	//点击到达相应位置(ff和IE不兼容)
	$('.skipToThere').click(function(){
		// 滚动动画


		function fn(h_InBody)
		{
			// var top = document.body.scrollTop || document.documentElement.scrollTop;
			$('html,body').animate({scrollTop:h_InBody},300);
		}
		// 调用滚动动画
		var x=$(this).index();
		console.log(x);
		switch(x)
		{
			case 0:fn('810px');break;
			case 1:fn('1670px');break;
			case 2:fn('1970px');break;
			case 3:fn('2570px');break;
			case 4:fn('3160px');break;
			case 5:fn('4230px');break;
			case 6:fn('0px');
		}
	})

	// $('#goTop').click(function(){$('body').animate({scrollTop:'0px'},300)});

	// $('#goTop').click(function(){
	// 	var het=$(window).scrollTop();
	// 	function everyH(){
	// 		het=het-50;
	// 		$(window).scrollTop(het);
	// 		if(het<=0)
	// 		{
	// 			clearInterval(Set);
	// 		}
	// 	}
	// 	var Set=setInterval(everyH,5);
	// });


});





