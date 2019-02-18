$(function (){
	function loginMarkFn(){
		var $Box = $('#nav-head');
		var $Wrap = $Box.find('.navbar-right');
		//登录弹窗
		var $LoginMark = $('#login-mark');
		var $loginPop = $LoginMark.find('.login-pop');
		//表单
		var $Form = $('#form');
		//手机号
		var $NumWrap = $Form.find('.form-group:nth-of-type(1)');
		var $Num = $NumWrap.find('input');
		var $removeNum = $NumWrap.find('.fa-times')
		//密码
		var $PwdWrap = $Form.find('.form-group:nth-of-type(2)');
		var $Pwd = $PwdWrap.find('input');
		var $lookPwd = $PwdWrap.find('span').last()
		//提示框
		var Info = $Form.find('.info');
		//登录按钮
		var $Btn = $Wrap.find('#login');
		//关闭按钮
		var $Close = $loginPop.children('span');
		//登录
		var $formLogin = $Form.find('.form-login');
		var $formBtn = $formLogin.find('.form-btn');
		var $LoginBtn = $formBtn.find('button');
		
		//取local数据
		var getListDate = localStorage.getItem('listData');
		if (getListDate) {
			var newArr = eval(getListDate);
		};
		
		//显示登录窗
		$Btn.on('click', function (){
			$LoginMark.fadeIn(200);
		});
		
		//关闭登录窗
		$Close.on('click', function (){
			$LoginMark.fadeOut(200);
		});
		
		//清空
		$removeNum.on('click', function (){
			$Num.val('');
		});
		
		//查看密码
		$lookPwd.on({
			mousedown: function (){
				$Pwd.attr('type', 'text');
				$(this).attr('class', 'fa fa-eye');
			},
			mouseup: function (){
				$Pwd.attr('type', 'password');
				$(this).attr('class', 'fa fa-eye-slash');
			}
		});
		
		//登录
		$LoginBtn.on('click', function (){
			//设置数据
			var newData = {};
			if (newArr) {
				//账号密码相等的数据存储
				var localNewArr = newArr.filter(function (item, index){
					return item.num === $Num.val() && item.pwd === $Pwd.val();
				});
				
				//判断账号密码是否相等
				var offList = newArr.some(function (item){
					return $Num.val() === item.num && $Pwd.val() === item.pwd
				});
				
				//验证登录
				if (offList){
					
					//设置local数据
					var localNewstr = JSON.stringify(localNewArr);
					localStorage.setItem('newData', localNewstr);
					
					//清空
					$Pwd.val('');
					$Num.val('');
					Info.hide();
					
					//隐藏登录
					$LoginMark.hide();
				} else {
					Info.show();
					return false;
				};
			};
		});
	};
	loginMarkFn();
	
	//隐藏登录注册显示用户名
	function UseFn(){
		var $Box = $('#nav-head');
		var $Wrap = $Box.find('.navbar-right');
		//登录按钮
		var $LoginBtn = $Wrap.find('#login');
		//注册按钮
		var $ResBtn = $LoginBtn.next();
		//用户名
		var UseBtn = $Wrap.find('.dropdown');
		//退出
		var Out = UseBtn.find('.dropdown-menu li')
		//取local数据
		var getNewDate = localStorage.getItem('newData');
		if (getNewDate) {
			var NewData = JSON.parse(getNewDate);
		};
		
		if (NewData){
			$LoginBtn.hide();
			$ResBtn.hide();
			UseBtn.show();
			UseBtn.children('a').find('span').text(NewData[0].use);
		};
		
		//退出登录
		Out.on('click', function (){
			$LoginBtn.show();
			$ResBtn.show();
			UseBtn.hide();
			UseBtn.children('a').find('span').text('请登录');
			localStorage.removeItem('newData');
			$(window).get(0).location.href = 'index.html';
		});
	};
	UseFn();
});