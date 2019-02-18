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
				url: 'data/data.json',
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
	//划入特效
	function scaleFn(){
		var $Wrap = $('.tab-content');
		var $tabPane1 = $Wrap.find('.tab-pane:nth-of-type(1)');
		var $tabPane2 = $Wrap.find('.tab-pane:nth-of-type(2)');
		function tabScale(obj){
			var $Row = obj.find('.row');
			var $Col = $Row.children();
			$Col.each(function (i){
				$Col.eq(i).find('.report-cont').on({
					'mouseenter': function (){
						$(this)
							.addClass('scActive')
							.parent().siblings().find('.report-cont')
							.removeClass('scActive');
					},
					'mouseleave': function (){
						$(this).removeClass('scActive');
					}
				});
				
			});
		};
		tabScale($tabPane1);
		tabScale($tabPane2);
	};
	scaleFn();
});
