$(function (){
	//展开收缩
	function toggleFn(){
		var $Wrap = $('.business-help');
		var $Dls = $Wrap.find('dl');
		var $Dt0 = $Dls.eq(0).find('dt');
		var $Dt1 = $Dls.eq(1).find('dt');
		var off = true;
		var off1 = true;
		function toggleMove(obj, bol){
			obj.on('click', function (){
				if (bol) {
					$(this).parent().stop().animate({'height': '30px'},200);
				} else {
					$(this).parent().stop().animate({'height': 28*$(this).parent().children().length + 'px'},200);
				};
				bol = !bol;
			});
		};
		toggleMove($Dt0, off);
		toggleMove($Dt1, off1);
	};
	toggleFn();
});