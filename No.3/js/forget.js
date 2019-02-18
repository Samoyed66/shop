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
		
		var $login = $('.login');
		var $loginCont = $login.find('.login-cont');
		var $Process = $loginCont.find('.process');
		//当前项
		var NewProcess = $Process.find('div');
		//弹窗
		var $errer = $login.children('p');
		
		var formRes = $('#form-res');
		var formPwd = $('#form-pwd');
		//手机号
		var oNum = formRes.find('.num');
		var NumC = oNum.find('input');
		//校正码
		var oCheck = formRes.find('.check');
		var CheckC = oCheck.find('input');
		var CheckP = oCheck.find('p');
		//验证码
		var oCode = formRes.find('.coded');
		var CodeC = oCode.find('input');
		var CodeP = oCode.find('p');
		//密码
		var oPwd = formPwd.find('.pwd');
		var PwdC = oPwd.find('input');
		var PwdP = oPwd.find('p');
		//确认密码
		var oPwdAgain = formPwd.find('.pwd-again');
		var PwdAgainC = oPwdAgain.find('input');
		var PwdAgainP = oPwdAgain.find('p');
		//确认
		var $BtnWrap = formRes.find('.btn-forgen');
		var $ResBtn = $BtnWrap.find('input');
		var off = true;
		
		var $PwdWrap = formPwd.find('.btn-forgen');
		var $PwdBtn = $PwdWrap.find('input');
		var iNum = 5;
		var timer = null;
		
		//取出数据
		var getListDate = localStorage.getItem('listData');
		//如果数据存在再转化
		if (getListDate) {
			var newArr = JSON.parse(getListDate);
		};
		
		//筛选后的local数据
		var localNewArr = [];
		var NewNum = '';
		
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
		
		//确认
		$ResBtn.on('click',function (){
			if (off){
				off = false;
				if (newArr){
					
					localNewArr = newArr.filter(function (item, index){
						return item.num === NumC.val();
					});
					
					//手机号验证
					var NumOff = newArr.some(function (item){
						return item.num === NumC.val();
					});
				};
				
				//判断
				if (NumOff && CheckCFn() && CodeCFn()){
					
					NewNum = NumC.val();
					formRes.hide();
					formPwd.show();
					
					NewProcess.first().removeClass('pro-active');
					NewProcess.last().addClass('pro-active');
					
					//console.log(localNewArr[0])
				} else {
					$errer.fadeIn(300);
					$errer.text('当前输入不正确');
					setTimeout(function (){
						$errer.fadeOut(300);
						off = true;
					},1500);
				};
				
			};
		});
		
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
		
		//重置密码
		$PwdBtn.on('click', function (){
			if (PwdAgainCFn() && PwdCFn() && localNewArr[0].pwd !== PwdC.val()) {
				if (newArr) {
					//手机号对应的数据存的数据修改密码
					localNewArr[0].pwd = PwdC.val();
					//console.log(localNewArr[0])
					
					//遍历取出的数组做判断并修改
					$.each(newArr, function(i, ele) {
						if (NewNum === ele.num) {
							newArr[i] = localNewArr[0];
						};
					});
					
					//覆盖原先的数据
					var DataStr = JSON.stringify(newArr);
					localStorage.setItem('listData', DataStr);
					
					$('#mark').show();
					timer = setInterval(function(){
						if (iNum > 0){
							iNum--;
							$('#mark').find('.success p:nth-of-type(2) span').text(iNum + 's');
						} else {
							clearInterval(timer);
							$(window).get(0).location.href = 'index.html';
						};
					},1000);
				};
			} else {
				$errer.fadeIn(300);
				$errer.text('新密码不能喝旧密码相同');
				setTimeout(function (){
					$errer.fadeOut(300);
					off = true;
				},1500);
			};
		});
	};
	formFn();
	//正则验证 end
});