$(function (){
	//日期
	function DateFn(){
		var DATAPICKERAPI = {};
		$('.J-datepicker-day').datePicker({
			format:'YYYY-MM-DD'
		});
	};
	DateFn();
	
	//弹窗正则验证
	function TryFn(){
		var $Btn = $('.time .time-wrap .time-cont a');
		var $Wrap = $('#try-cont');
		var $Uls = $Wrap.find('ul');
		var $Close = $Uls.find('li').last();
		var $Name = $Uls.find('li').first();
		var $True = $Uls.find('li').eq(4);
		var $Num = $Uls.find('li').eq(3);
		var $Date = $Uls.find('li').eq(1);
		
		//显示弹窗清除a标签跳转事件
		$Btn.on('click', function (){
			$('#try-cont').fadeIn(300);
			return false;
		});
		
		//关闭弹窗
		$Close.on('click', function () {
			$('#try-cont').fadeOut(300);
			$Name.find('input').val('');
			$Num.find('input').val('');
			$Date.find('input').val('');
			$Name.find('p').css('display', 'none');
			$Num.find('p').css('display', 'none');
		});
		
		//名字验证
		$Name.find('input').on('blur', NameFn);
		
		function NameFn(){
			var Txt = $Name.find('input').val();
			var res = /^[\u4e00-\u9fa5]+$/;
			if (res.test(Txt)){
				$Name.find('p').css('display', 'none');
				return true;
			} else {
				$Name.find('p').css('display', 'block');
				return false;
			};
		};
		
		//身份证验证
		$Num.find('input').on('blur', NumFn);
		
		function NumFn(){
			var NumTxt = $Num.find('input').val();
			var res1= /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
			if (res1.test(NumTxt)){
				$Num.find('p').css('display', 'none');
				return true;
			} else {
				$Num.find('p').css('display', 'block');
				return false;
			};
		};
		
		//确认按钮
		$True.find('button').on('click', function (){
			if (NameFn() && NumFn() && $Date.find('input').val() !== ''){
				$('#try-cont').fadeOut(300,function (){
					$('#mark').fadeIn(200);
					setTimeout(function (){
						$('#mark').fadeOut(200);
					},1000);
				});
			};
		});
		
	};
	TryFn();
});