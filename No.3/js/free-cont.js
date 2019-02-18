$(function (){
	
	//焦点图信息定位
	function TimeCont(){
		var $Wrap = $('.container');
		var MaxY = $(window).outerWidth() - ($Wrap.outerWidth()-140);
		$('.time-cont').css('right', MaxY/2);
	};
	TimeCont();
	$(window).resize(TimeCont);
	//焦点图信息定位 end
	
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
			var NewTime = new Date(2019,0,7,23,00,00);
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
			$TimeSpan.text(strTime);
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
});