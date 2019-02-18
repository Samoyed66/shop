$(function (){
	
	//验证码
	function cadeFn(){
		var $form = $('#form-res');
		var $Code = $form.find('.coded');
		var $Btn = $Code.find('span');
		var timer = null;
		var num = 60;
		var off = true;
		$Btn.on('click',function (){
			var _this = $(this);
			if (off){
				off = false;
				timer = setInterval(function (){
					if (num <= 0){
						num = 60;
						off = true;
						_this.text('重新发送');
						clearInterval(timer);
					} else {
						_this.text(num + 's');
						num--;
					};
				},1000);
			};
		});
		
	};
	cadeFn();
	//验证码 end
	//正则验证
	function formFn(){
		var $Wrap = $('.login');
		var $loginCont = $Wrap.find('.login-cont');
		var $form = $('#form-res');
		//手机号
		var oNum = $loginCont.find('.num');
		var NumC = oNum.find('input');
		var NumP = oNum.find('p');
		//校正码
		var oCheck = $loginCont.find('.check');
		var CheckC = oCheck.find('input');
		var CheckP = oCheck.find('p');
		//验证码
		var oCode = $loginCont.find('.coded');
		var CodeC = oCode.find('input');
		var CodeP = oCode.find('p');
		//用户名
		var oUser = $loginCont.find('.user');
		var UserC = oUser.find('input');
		var UserP = oUser.find('p');
		//密码
		var oPwd = $loginCont.find('.pwd');
		var PwdC = oPwd.find('input');
		var PwdP = oPwd.find('p');
		//确认密码
		var oPwdAgain = $loginCont.find('.pwd-again');
		var PwdAgainC = oPwdAgain.find('input');
		var PwdAgainP = oPwdAgain.find('p');
		//提交
		var $BtnWrap = $loginCont.find('.btn');
		var $Btn = $BtnWrap.find('input');
		var iNum = 5;
		var timer = null;
		
		//设置local
		var listData = {};
		
		//取出数据
		var getListDate = localStorage.getItem('listData');
		//如果数据存在再转化
		if (getListDate) {
			var newArr = eval(getListDate);
		};
		
		//拖动验证
		var SlideVerifyPlug = window.slideVerifyPlug;
		var slideVerify2 = new SlideVerifyPlug('#verify-wrap2',{
			wrapWidth:'410',
	        initText:'请按住滑块',
	        sucessText:'验证通过'
		});
		
		//图片验证码
		var code = "";
		$.fn.code_Obj = function(o) {
			var _this = $(this);
			var options = {
				code_l: o.codeLength,//验证码长度
				codeChars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
					'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				codeColors: ['#f44336', '#009688', '#cddc39', '#03a9f4', '#9c27b0', '#5e4444', '#9ebf9f', '#ffc8c4', '#2b4754', '#b4ced9', '#835f53', '#aa677e'],
				code_Init: function() {
					code = "";
					var codeColor = "";
					var checkCode = _this.find("#data_code");
					for(var i = 0; i < this.code_l; i++) {
						var charNum = Math.floor(Math.random() * 52);
						code += this.codeChars[charNum];
					}
					for(var i = 0; i < this.codeColors.length; i++) {
						var charNum = Math.floor(Math.random() * 12);
						codeColor = this.codeColors[charNum];
					}
					if(checkCode) {
						checkCode.css('color', codeColor);
						checkCode.className = "code";
						checkCode.text(code);
						checkCode.attr('data-value', code);
					}
				}
			};

			options.code_Init();//初始化验证码
			_this.find("#data_code").bind('click', function() {
				options.code_Init();
			});
		};
		$('#check-code').code_Obj({
			codeLength: 4
		});
		
		//手机号
		NumC.on('focus',function (){
			NumP.css('display', 'block');
		});
		NumC.on('blur',NumCFn);
		function NumCFn(){
			var oNumTxt = NumC.val();
			var reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
			//手机号不能重复
			if (getListDate){
				//如果数据存在再做判断
				for (var i = 0; i<newArr.length; i++) {
					if (oNumTxt === newArr[i].num){
						NumP.text('手机号已经注册过！');
						NumP.css('color','#fe5341');
						return false;
					};
				};
			};
			if (oNumTxt === ''){
				NumP.text('手机号不能为空！');
				NumP.css('color','#fe5341');
				return false;
			} else if (reg1.test(oNumTxt)){
				NumP.text('输入正确！');
				NumP.css('color','#17d837');
				return true;
			} else {
				NumP.text('当前号码格式不正确！');
				NumP.css('color','#fe5341');
				return false;
			};
		};
		
		//校正码
		CheckC.on('focus',function (){
			CheckP.css('display', 'block');
		});
		CheckC.on('blur', CheckCFn);
		function CheckCFn(){
			var oCheckTxt = CheckC.val();
			var reg2 = new RegExp(code, 'i');
			if (oCheckTxt === ''){
				CheckP.text('校正码不能为空！');
				CheckP.css('color','#fe5341');
				return false;
			} else if (reg2.test(oCheckTxt)){
				CheckP.text('输入正确！');
				CheckP.css('color','#17d837');
				return true;
			} else {
				CheckP.text('校正码不正确！');
				CheckP.css('color','#fe5341');
				return false;
			};
		};
		
		//验证码
		CodeC.on('focus',function (){
			CodeP.css('display', 'block');
		});
		CodeC.on('blur', CodeCFn);
		function CodeCFn(){
			var oCodeTxt = CodeC.val();
			var reg3 = /^[0-9]{4}$/;
			if (oCodeTxt === ''){
				CodeP.text('验证码不能为空！');
				CodeP.css('color','#fe5341');
				return false;
			} else if (reg3.test(oCodeTxt)){
				CodeP.text('输入正确！');
				CodeP.css('color','#17d837');
				return true;
			} else {
				CodeP.text('验证码不正确！');
				CodeP.css('color','#fe5341');
				return false;
			};
		};
		
		//用户名
		UserC.on('focus',function (){
			UserP.css('display', 'block');
		});
		UserC.on('blur', UserCFn);
		function UserCFn(){
			var oUserTxt = UserC.val();
			var reg4 = /^\w{6,12}$/;
			//用户名不能重复
			if (getListDate){
				//如果数据存在再做判断
				for (var i = 0; i<newArr.length; i++) {
					if (oUserTxt === newArr[i].use){
						UserP.text('用户名已经注册过！');
						UserP.css('color','#fe5341');
						return false;
					};
				};
			};
			if (oUserTxt === ''){
				UserP.text('用户名不能为空！');
				UserP.css('color','#fe5341');
				return false;
			} else if (reg4.test(oUserTxt)){
				UserP.text('输入正确！');
				UserP.css('color','#17d837');
				return true;
			} else {
				UserP.text('用户名必须由数字、字母或下划线组成的6-12位字符！');
				UserP.css('color','#fe5341');
				return false;
			};
		};
		
		//密码
		PwdC.on('focus',function (){
			PwdP.css('display', 'block');
		});
		PwdC.on('blur', PwdCFn);
		function PwdCFn(){
			var oPwdTxt = PwdC.val();
			var reg5= /[^0-9]/;
			var reg6= /[^a-z]/i;
			var reg7 = /^\w{6,12}$/;
			if (oPwdTxt === ''){
				PwdP.text('密码不能为空！');
				PwdP.css('color','#fe5341');
				return false;
			} else if (!reg7.test(oPwdTxt)){
				PwdP.text('密码为6-12位字符！');
				PwdP.css('color','#fe5341');
				return false;
			} else if (!reg6.test(oPwdTxt)){
				PwdP.text('密码不能全为字母！');
				PwdP.css('color','#fe5341');
				return false;
			} else if (!reg5.test(oPwdTxt)){
				PwdP.text('密码不能全为数字！');
				PwdP.css('color','#fe5341');
				return false;
			}  else {
				PwdP.text('输入正确！');
				PwdP.css('color','#17d837');
				return true;
			};
		};
		
		//确认密码
		PwdAgainC.on('focus',function (){
			PwdAgainP.css('display', 'block');
		});
		PwdAgainC.on('blur', PwdAgainCFn);
		function PwdAgainCFn (){
			var oPwdAgainTxt = PwdAgainC.val();
			if (oPwdAgainTxt === ''){
				PwdAgainP.text('密码不能为空！');
				PwdAgainP.css('color','#fe5341');
				return false;
			} else if (oPwdAgainTxt != PwdC.val()){
				PwdAgainP.text('两次密码不相同！');
				PwdAgainP.css('color','#fe5341');
				return false;
			} else {
				PwdAgainP.text('输入正确！');
				PwdAgainP.css('color','#17d837');
				return true;
			};
		};
		
		//提交
		$Btn.on('click',function (){
			if (NumCFn() && CheckCFn() && CodeCFn() && UserCFn() && PwdCFn() && PwdAgainCFn() && slideVerify2.slideFinishState){
				//先出弹窗后跳转
				$('#mark').show();
				//数据存localstorage中
				listData.num = NumC.val();
				listData.pwd = PwdC.val();
				listData.use = UserC.val();
				var DataStr = JSON.stringify(listData);
				if (getListDate){
					localStorage.setItem('listData', '[' + getListDate.substring(1,getListDate.length-1) + ',' + DataStr + ']');
				} else {
					localStorage.setItem('listData', '[' + DataStr + ']');
				};
				timer = setInterval(function (){
					iNum--;
					$('#mark .success').find('span').text(iNum + 's');
					if (iNum<=0){
						clearInterval(timer);
						$('#mark').hide();
						$(window).get(0).location.href = 'index.html';
					};
				},1000);
			} else {
				alert('当前信息填写不正确！');
				return false;
			};
		});
	};
	formFn();
	//正则验证 end
});