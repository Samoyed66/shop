$(function(){
	//ajax
	function AjaxFn(){
		var $Wrap = $('.tab-content');
		var $tabPane = $Wrap.find('.tab-pane');
		var bt = baidu.template;
		$tabPane.each(function (i){
			var $row = $tabPane.eq(i).find('.row');
			var $more = $row.find('.more');
			var num = -1;
			var off = true;
			$.ajax({
				url: 'data/data3.json',
				type: 'get',
				dataType: 'json',
				success: function (data) {
					if (data.status == 0){
						$more.click(function (){
							var _this = $(this);
							if (num < data.data.length-1 && off){
								off = false;
								$(this).html($('<span class="fa fa-spinner fa-spin fa-3x fa-fw"></span>'));
								setTimeout(function (){
									num++;
									var getData = {};
									getData.menulist = data.data[num].list;
									var html = bt('menuList',getData);
									_this.before(html);
									_this.html($('<a href="javascript:;">∨ 点击加载更多</a>'));
									off = true;
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
		})
	};
	AjaxFn();
	//ajax end
});