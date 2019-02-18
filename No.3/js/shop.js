$(function (){
	//懒加载
	function LazyFn(){
		$('img.lazyload').lazyload({
			effect: 'fadeIn'
		});
		$('img.lazyload').removeClass('lazyload');
	};
	LazyFn();
	//点击加载
	function ajaxFn(){
		var bt = baidu.template;
		var $Wrap = $('.tab-content');
		var $Tab = $Wrap.find('.tab-pane');
		$Tab.each(function (i){
			var $Btn = $Tab.eq(i).find('.more');
			var num = -1;
			var off = true;
			$.ajax({
				url: 'data/data1.json',
				type: 'get',
				dataType: 'json',
				success: function (data) {
					if (data.status == 0){
						$Btn.click(function (){
							var _this = $(this);
							if (num < data.data.length-1 && off){
								off = false;
								$(this).html($('<span class="fa fa-spinner fa-spin fa-3x fa-fw"></span>'));
								setTimeout(function (){
									num++;
									var getData = {};
									getData.menulist = data.data[num].list;
									var html = bt('menuList',getData);
									_this.prev().append(html);
									_this.html($('<a href="javascript:;">∨ 点击加载更多</a>'));
									off = true;
									LazyFn();
									StyleFn();
									if (num === data.data.length-1){
										_this.html($('<a href="javascript:;">没有更多可以加载了</a>'))
										_this.find('a').css('color', '#ccc');
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
			});
		});
	};
	ajaxFn();
	//点击加载 end
	//修改样式
	function StyleFn(){
		var $Wrap = $('.tab-content');
		var $tabPane = $Wrap.find('.tab-pane');
		var Deg = 0;
		//遍历选项卡长度
		$tabPane.each(function (i){
			var $row = $tabPane.eq(i).find('.row');
			var $Col = $row.children();
			//遍历每个div长度
			$Col.each(function (j){
				var $reportCont = $Col.eq(j).find('.report-cont');
				//遍历一份里面重叠长度
				$reportCont.each(function (k){
					//修改样式
					var $AY = $reportCont.eq(k).find('h4 a').outerHeight();
					if ($AY <= 16){
						$reportCont.eq(k).find('h4 a').css('font-size','15px');
					};
					//拖拽隐藏调用
					MoveFn($reportCont.eq(k));
				});
			});
		});
		//拖拽隐藏
		function MoveFn(obj){
			obj.mousedown(function (ev){
				var _this = $(this);
				var num = $(this).index();
				var downX = ev.pageX;
				var downY = ev.pageY;
				Deg = 0;
				$(this).css('transition','none');
				$(document).on('mousemove', function (ev){
					var moveX = ev.pageX - downX;
					var moveY = ev.pageY - downY;
					Deg = (moveX+moveY)/10;
					if (num === 2){
						Deg = 0;
					};
					if (Deg >= 0){
						_this.css('transform-origin','right bottom');
					} else {
						_this.css('transform-origin','left bottom');
					};
					_this.css('transform','rotate(' + Deg + 'deg)');
				});
				$(document).on('mouseup', function (){
					var $A = obj.children('a');
					console.log(Deg)
					if (Deg != 0){
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
					if (Math.abs(Deg) >= 45){
						_this.fadeOut(200);
						_this.next().css({
							'transform':'scale(1)',
							'top': 0,
							'transition': '.2s'
						});
					} else {
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
		};
		//拖拽隐藏 end
	};
	StyleFn();
	//修改样式 end
});
