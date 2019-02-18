$(function (){
	
	//进入时弹窗
	function markPic (){
		var getItem = localStorage.getItem('newData');
		$(window).get(0).onload = function (){
			if (!getItem){
				$('#mark-pic').animate({'width': '100%', 'height': '100%'},500);
				$('#mark-pic')
					.delay(5000)
					.animate({'width': 0, 'height': 0},500, function (){
					loginOff();
				});
			};
		};
		$('#mark-pic').find('span').click(function (){
			$('#mark-pic').stop().animate({'width': 0, 'height': 0},500, function (){
				loginOff();
			});
		});
			
	};
	markPic();
	
	//进入验证是否登录
	function loginOff(){
		var loginCont = localStorage.getItem('newData');
		if (!loginCont) {
			$('#login-mark').delay(2000).fadeIn(300);
		};
	};
	
	//轮播图
	function swiperFn(){
		var swiper = new Swiper('#banner .swiper-container', {
			loop:true,
			slidesPerView: 4,
			spaceBetween: 37,
			slidesPerGroup:4,
			navigation: {
				nextEl: '#banner .swiper-button-next',
				prevEl: '#banner .swiper-button-prev',
			}
		});
		
		//轮播图效果
		var $Banner = $('#banner');
		var $Wrapper = $Banner.find('.swiper-wrapper');
		var $Slide = $Wrapper.children();
		$Slide.each(function (i){
			$Slide.eq(i).hover(function (){
				$(this).find('.banner-cont').stop().animate({'bottom':0},300);
			}, function (){
				$(this).find('.banner-cont').stop().animate({'bottom':'-55px'},300);
			});
		});
	};
	swiperFn();
	//轮播图 end
	//焦点图
	function swiperTime(){
		var swiper = new Swiper('.time .swiper-container', {
			loop:true,
			autoplay: {
				delay: 1500,
				disableOnInteraction: false,
			},
		});
		// 移入暂停自动播放
	    $('.time .swiper-container').on('mouseenter', function () {
	    	swiper.autoplay.stop(); // 暂停播放
	    });
	    // 移出开始自动播放
	    $('.time .swiper-container').on('mouseleave', function () {
	    	swiper.autoplay.start(); // 开始播放
	    });
	};
	swiperTime();
	//焦点图 end
	//焦点图信息定位
	function TimeCont(){
		var $Wrap = $('.container');
		var MaxY = $(window).outerWidth() - ($Wrap.outerWidth()-140);
		$('.time-cont').css('right', MaxY/2);
	};
	TimeCont();
	$(window).resize(TimeCont);
	//焦点图信息定位 end
	//点击加载
	function ajaxFn(){
		var bt = baidu.template;
		var $Wrap = $('.report');
		var $Btn = $Wrap.find('.more');
		var num = -1;
		var off = true;
		$.ajax({
			url: 'data/data.json',
			type: 'get',
			dataType: 'json',
			success: function (data) {
				if (data.status == 0){
					$Btn.click(function (){
						if (num < data.data.length-1 && off){
							off = false;
							$(this).html($('<span class="fa fa-spinner fa-spin fa-3x fa-fw"></span>'));
							setTimeout(function (){
								num++;
								var getData = {};
								getData.menulist = data.data[num].list;
								var html = bt('menuList',getData);
								$Btn.prev().append(html);
								$Btn.html($('<a href="javascript:;">∨ 点击加载更多</a>'));
								off = true;
								LazyFn();
								if (num === data.data.length-1){
									$Btn.html($('<a href="javascript:;">没有更多可以加载了</a>'))
									$Btn.find('a').css('color', '#ccc');
									return false;
								};
							},500);
						};
					});
				};
			},
			error: function (e) {
				console.log('请求失败',e.status)
			}
		})
	};
	ajaxFn();
	//点击加载 end
	//懒加载
	function LazyFn(){
		$('img.lazyload').lazyload({
			effect: 'fadeIn'
		});
		$('img.lazyload').removeClass('lazyload');
	};
	LazyFn();
	//懒加载 end
	//拖拽隐藏
	function MoveFn(){
		var $Wrap = $('.report:nth-of-type(2)');
		var $Con = $Wrap.find('.container');
		var $Row = $Con.find('.row');
		var $col = $Row.children('div');
		$col.each(function (i){
			var $Btn = $col.eq(i).children();
			var Deg = 0;
			$Btn.each(function (j){
				var $A = $Btn.eq(j).children('a');
				$Btn.eq(j).mousedown(function (ev){
					var _this = $(this)
					//按下位置
					var downX = ev.pageX;
					var downY = ev.pageY;
					$(this).css('transition','none');
					$(document).on('mousemove', function (ev){
						//拖动位置
						var moveX = ev.pageX - downX;
						var moveY = ev.pageY - downY;
						//转角度
						Deg = (moveX+moveY)/10;
						//判断拖完后不再拖动
						if (j === $Btn.length-1){
							Deg = 0;
						};
						//移动
						if (Deg > 0){
							_this.css('transform-origin','right bottom');
						} else {
							_this.css('transform-origin','left bottom');
						};
						_this.css('transform','rotate(' + Deg + 'deg)');
					});
					$(document).on('mouseup', function (){
						
						if (Deg != 0){
							//禁止a标签跳转事件
							$A.on('click',function (){
								return false;
							});
						} else {
							//模仿a标签的跳转链接
							$A.get(0).onclick = function (){
								var Hsrc = $(this).attr('href');
								if (Hsrc != '' && Hsrc != 'javascript:;' && Hsrc != '#'){
									window.location.href = Hsrc;
								};
							};
						};
						
						//比值做判断
						if (Math.abs(Deg) >= 45){
							_this.fadeOut(200);
							Deg = 0;
							//下面两个都放大
							_this.next().css({
								'transform':'scale(1)',
								'top': 0,
								'transition': '.2s'
							});
							_this.next().next().css({
								'transform':'scale(0.95)',
								'top': '10px',
								'transition': '.2s'
							});
						} else {
							//返回
							_this.css({
								'transform':'rotate(0)',
								'transform-origin': 'left bottom',
								'transition': '.3s'
							});
						};
						$(this).off('mousemove mouseup');
					});
					return false;
				});
			})
		});
	};
	MoveFn();
	//拖拽隐藏 end
	
	//倒计时
	function Countdown(){
		var timer = null;
		var $Wrap = $('.time');
		var $TimeWrap = $Wrap.find('.time-wrap');
		var $TimeCont = $TimeWrap.find('.time-cont');
		var $TimeP = $TimeCont.find('p:nth-of-type(2)');
		var $TimeSpan = $TimeP.find('span');
		//补0函数
		function NumFn(num) {
			if (num < 10 && num>= 0) {
				return '0' + num
			} else if (num>=10) {
				return num;
			} else if (num < 0) {
				return num;
			};
		};
		function TimeFn(){
			var NowTime = new Date();
			var NewTime = new Date(2019,2,1,12,00,00);
			//相差时间毫秒转秒
			var Time = (NewTime - NowTime) / 1000;
			var oDay = Math.floor(Time/86400); //天
			var oH = Math.floor(Time%86400/3600); //时
			var oM = Math.floor(Time%86400%3600/60); //分
			var oS = Math.floor(Time%60); //秒
			var strTime = NumFn(oDay) + '天' + NumFn(oH) + '小时' + NumFn(oM) + '分钟' + NumFn(oS) + '秒';
			if (NumFn(oDay) < 0) {
				//结束样式
				$TimeP.next().css({
						'cursor':'not-allowed',
						'background': '#ccc'
					}).text('活动已结束');
				
				//取消显示弹窗
				$TimeP.next().off('click');
				
				//清除a标签跳转事件
				$TimeP.next().on('click', function (){
					return false;
				});
				
				//时间归零
				strTime = '00天00小时00分钟00秒';
				//清定时器
				clearInterval(timer);
			};
			$TimeSpan.text(strTime)
		};
		//初始化调用
		TimeFn();
		//定时器
		timer = setInterval(function (){
			TimeFn();
		},1000);
	};
	Countdown();
	//倒计时 end
	//banner样式
	function BannerStyle(){
		var $Wrap = $('#banner');
		var $swiperWrapper = $Wrap.find('.swiper-wrapper');
		var $swiperSlide = $swiperWrapper.find('.swiper-slide');
		$swiperSlide.each(function (i){
			var $A = $swiperSlide.eq(i).children('a');
			$A.find('span:contains("体验师专享")').css({
				'color':'#b0a470',
				'background': '#f4efc9'
			});
		});
	};
	BannerStyle();
	//banner样式 end
	//划入特效
	function enterFn(){
		var $Wrap1 = $('.report:nth-of-type(1)');
		var $Wrap2 = $('.report:nth-of-type(3)');
		function shadowFn(obj){
			var $Row = obj.find('.row');
			var $Col = $Row.children();
			$Col.find('.report-cont').on({'mouseenter': function (){
					$(this)
						.addClass('BActive')
						.parent().siblings().find('.report-cont')
						.removeClass('BActive');
				},
				'mouseleave': function (){
					$(this).removeClass('BActive');
				}
			});
		};
		shadowFn($Wrap1);
		shadowFn($Wrap2);
	};
	enterFn();
});