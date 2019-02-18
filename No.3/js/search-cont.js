$(function (){
	//获取地址栏
	function keynameFn(){
		var oTxt = $(window).get(0).location.search.substring(1).split('=');
		//中文转义
		var newTxt = decodeURI(oTxt[1]);
		if (newTxt){
			$('#search .form-group').find('input[type="search"]').val(newTxt);
			$('#search-cont .cearch-head').find('span').text('搜索 "' + newTxt + '"');
		} else {
			$('#search-cont .cearch-head').find('span').text('搜索 "无"');
		};
	};
	keynameFn();
})
