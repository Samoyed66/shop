$(function (){
	//导航吸顶
	function NavTop(){
		var $Nav = $('.navbar');
		var padTop = parseInt($Nav.next().css('padding-top'));
		$(document).on('scroll',function (){
			var TopY = $(this).scrollTop();
			if (TopY > $Nav.height()){
				$Nav.next().css('padding-top', padTop + $Nav.height() + 'px');
				if (TopY > $Nav.height()+300){
					$Nav.css({
						'transform': 'translateY(0)',
						'transition': '.2s'
					});
				} else {
					$Nav.css({
						'position': 'fixed', 
						'transform': 'translateY(-' + $Nav.height() + 'px)'
					});
				};
			} else {
				$Nav.next().css('padding-top', padTop + 'px');
				$Nav.css({
					'position': 'static', 
					'transform': 'translateY(0)',
					'transition': 'none'
				});
			};
		});
	};
	NavTop();
	
	//返回顶部
	function backFn(){
		var $Btn = $('#back-top');
		var $back = $Btn.children('div');
		var Ul = $Btn.find('ul');
		var Lis = Ul.find('li');
		var timer = null;
		$(document).on('scroll',function (){
			var TopY = $(this).scrollTop();
			if (TopY >= 300){
				$Btn.fadeIn(200);
			} else {
				$Btn.fadeOut(200);
			};
		});
		
		Lis.first().hover(function (){
			$(this).find('div').fadeIn(200);
		}, function (){
			$(this).find('div').fadeOut(200);
		});
		
		Lis.filter(':nth-of-type(2)').hover(function (){
			$(this).find('div').fadeIn(200);
		}, function (){
			$(this).find('div').fadeOut(200);
		});
		
		$back.click(function (){
			timer = setInterval(function (){
				var moveTop = $(document).scrollTop();
				var MoveY = Math.floor(moveTop/5);
				if (moveTop <= 5){
					clearInterval(timer);
				};
				$(document).scrollTop(moveTop - MoveY);
				$(document).on('mousewheel',function (){
					clearInterval(timer);
				});
				$(document).on('DOMMouseScroll',function (){
					clearInterval(timer);
				});
			},30);
		});
	};
	backFn();
	//返回顶部 end
});
