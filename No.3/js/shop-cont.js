$(function(){
	//爱心点击切换
	function HeartFn(){
		var $Wrap = $('.shop-cont');
		var $row = $Wrap.find('.row');
		var $Col = $row.find('.col-xs-3');
		var $Btn = $Col.find('p').first();
		var $Span = $Btn.find('span').first();
		var $SpanNum = $Btn.find('span').last();
		var off = true;
		$Btn.click(function(){
			if (off){
				$Span.attr('class', 'fa fa-heart');
				$SpanNum.text('喜欢 16')
				$Btn.css('color', 'red');
			} else {
				$Span.attr('class', 'fa fa-heart-o');
				$SpanNum.text('喜欢 15')
				$Btn.css('color', '#b9b9b9');
			};
			off = !off;
		});
	};
	HeartFn();
	
	//分享
	function shareFn(){
		var $Wrap = $('.shop-cont');
		var $row = $Wrap.find('.row');
		var $Col = $row.find('.col-xs-3');
		var $Btn = $Col.find('p').last();
		var timer = null;
		$Btn.hover(function (){
			$('.share').fadeIn(200);
		}, function (){
			timer = setTimeout(function (){
				$('.share').fadeOut(200);
			},10);
		});
		$('.share').hover(function (){
			clearTimeout(timer);
		},function (){
			$('.share').fadeOut(200);
		});
	};
	shareFn();
});