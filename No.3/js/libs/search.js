$(function () {
	//搜索
	function searchFn() {
		var $Wrap = $('#nav-head');
		var $navRes = $Wrap.find('.nav-res');
		var $Btn = $navRes.find('.nav-search');
		var timer = null;
		var res = '';
		
		//搜索框划入划出
		$Btn.hover(function () {
			$(this).find('input[type="search"]').css('transform', 'translateX(0)');
		}, function () {
			$(this).find('input[type="search"]').css('transform', 'translateX(300px)');
		});
		
		//搜索框获取光标
		$Btn.find('input[type="search"]').on('focus', function () {
			$(this).css('transform', 'translateX(0)');
			//获取光标后取消划出事件
			$Btn.off('mouseleave');
		});
		
		//搜索框失去光标
		$Btn.find('input[type="search"]').on('blur', function () {
			if ($('#resList').html() === '') {
				$Btn.find('input[type="search"]').css('transform', 'translateX(300px)');
			} else {
				//jsonp有值
				$('#resList').slideUp();
				setTimeout(function () {
					$Btn.find('input[type="search"]').css('transform', 'translateX(300px)').val('');
				},500);
			};
			//搜索框失去光标后重新添加划出事件
			$Btn.on('mouseleave', function () {
				$(this).find('input[type="search"]').css('transform', 'translateX(300px)').val('');
			});
		});
		
		//jsonp
		$Btn.find('input[type="search"]').keyup(function (ev) {
			// 延迟定期器的目前是为了防止频繁的向服务器发送请求
			var $self = $(this);
			clearTimeout(timer);
			timer = setTimeout(function () {
				var searchVal = $self.val();
				loadData('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/', searchVal);
			}, 500);
			
			//回车跳转
			if (ev.keyCode === 13) {
				clearTimeout(timer);
			};
		});
		
		function loadData(geturl, val) {
			$.ajax({
				type:"get",// 请求的方式
				url: geturl, // 请求地址
				dataType: 'jsonp', // 预估返回的数据类型
				data:{ // 提交的数据
					'wd':val,
				},
				jsonp:'cb', // 声明回调函数名
				success: function (data) { // 成功后返回数据
					if (data.s.length > 0) {
						
						// 清空res中的列表
						res = '';
						
						// 创建搜索列表
						$.each(data.s, function(i, val) {
							var $Lis = '<li>'+ val +'</li>';
							res += $Lis;
						});
						$('#resList').html(res).slideDown();
						
						//鼠标滑过样式
						$('#resList').find('li').hover(function (){
							$(this).addClass('list-active').siblings().removeClass('list-active');
							$Btn.find('input[type="search"]').val($(this).text());
						}, function () {
							$(this).removeClass('list-active');
						});
						
						//点击修改val值
						$('#resList').find('li').on('click', function () {
							$Btn.find('input[type="search"]').val($(this).text());
							$Btn.submit();
							$('#resList').slideUp();
						});
					}
				}
			});
		};
	};
	searchFn();
});