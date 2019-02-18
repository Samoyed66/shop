$(function (){
	//懒加载
	function LazyFn(){
		$('img.lazyload').lazyload({
			effect: 'fadeIn'
		});
		$('img.lazyload').removeClass('lazyload');
	};
	LazyFn();
	//设置样式
	function styleFn(){
		var $find = $('#find');
		var $Wrap = $find.next();
		var $tabPane = $Wrap.children('.tab-pane');
		$tabPane.each(function (i){
			var $tabContent = $tabPane.eq(i).find('.tab-content');
			var $CtabPane = $tabContent.find('.tab-pane');
			$CtabPane.each(function (j){
				var $Row = $CtabPane.eq(j).find('.row');
				var $Col = $Row.children();
				var $onlyRow = $CtabPane.eq(0).find('.row');
				var $onlyCol = $onlyRow.children();
				//全部模块里面的样式
				$onlyCol.each(function (k){
					$onlyCol.eq(k).find('p:contains("报告数量: 8")').css('color','#c4c9cf')
						.prev().prev().css('color','#c4c9cf')
						.find('span').css('border-color','#c4c9cf');
					$onlyCol.eq(k).find('p:contains("查看试用名单")').css('color','#73ca62')
						.prev().prev().css('color','#73ca62')
						.find('span').css('border-color','#73ca62');
				});
				//图片上标的样式
				$Col.each(function (p){
					var $reportCont = $Col.eq(p).find('.report-cont');
					var $A = $reportCont.children('a');
					$A.find('span:contains("体验师专享")').css({
						'color':'#b0a470',
						'background': '#f4efc9'
					});
				})
			});
		});
	};
	styleFn();
	//设置样式 end
	//ajax
	function AjaxFn(){
		var bt = baidu.template;
		var $all = $('#all');
		var $Btn = $all.find('.more');
		var $footer = $('#footer');
		var num = -1;
		var off = true;
		$.ajax({
			url: 'data/data2.json',
			type: 'get',
			dataType: 'json',
			success: function (data) {
				if (data.status == 0){
					$(document).on('scroll',function(){
						//最大高度
						var MaxY = $(this).outerHeight() - $footer.outerHeight();
						//当前滚动条高度
						var MoveY = $(window).outerHeight() + $(this).scrollTop();
						if (MoveY >= MaxY && off){
							off = false;
							if (num < data.data.length-1){
								$Btn.html($('<span class="fa fa-spinner fa-spin fa-3x fa-fw"></span>'));
								setTimeout(function (){
									num++;
									var getData = {};
									getData.menulist = data.data[num].list;
									var html = bt('menuList',getData);
									$Btn.prev().append(html);
									$Btn.html($('<a href="javascript:;">∨ 向下拉加载更多</a>'));
									LazyFn();
									off = true;
									if (num === data.data.length-1){
										$Btn.html($('<a href="javascript:;">没有更多可以加载了</a>'))
										$Btn.find('a').css('color', '#ccc');
										return false;
									};
								},500);
							};
						};
					});
				};
			},
			error: function (e) {
				console.log('请求失败',e.status)
			}
		});
	};
	AjaxFn();
	//ajax end
});
