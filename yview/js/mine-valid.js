/*************
验证
**************/
$(function(){
	var MV = {};
	MV.submit = false;
	MV.passMit = true;	
	MV.passSureMit = true;
	MV.telMit = true;
	MV.emsMit = true;
	MV.vericodeMit = true;
	// 密码验证方法
	/*************
	字母（必须） + 数字和下划线（组合）
	长度在6~18之间
	**************/
	function passWord(ele,val){
		MV.regPass = /^(?![0-9\_]+$)(?![a-zA-Z]+$)\w{6,18}$/;
		MV.errele = ele.siblings('.error-span');// 错误提示span
		MV.article = ele.parents('article');// 父元素article
		MV.passMit = false; // 密码验证
		if(val == ''){// 密码为空
			// console.log('密码不能为空');
			// ele.focus(); // 获取焦点
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('密码不能为空');
			MV.passMit = false;
		}else if(!MV.regPass.test(val)){// 密码不合法
			// console.log('密码不合法');
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('密码不合法');
			MV.passMit = false;
		}else{// 通过
			// console.log('通过');
			MV.article.removeClass('error-article'); // article移除错误类
			MV.passMit = true;
		}
	};
	// 确认密码验证方法
	function repassWord(ele,val1,val2){
		MV.errele = ele.siblings('.error-span');// 错误提示span
		MV.article = ele.parents('article');// 父元素article
		MV.passSureMit = false; // 确认密码验证
		if(val2 == ''){// 密码为空
			// ele.focus(); // 获取焦点
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('密码不能为空');			
			MV.passSureMit = false;
		}else if(val2 != val1){// 两次输入不一致
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('两次输入不一致');			
			MV.passSureMit = false;
		}else{// 通过
			MV.article.removeClass('error-article'); // article移除错误类			
			MV.passSureMit = true;
		}
	}
	// 手机号码验证方法
	/*************
	13|14|15|16|17|18|19开头
	**************/
	function tel(ele,val){
		MV.regTel = /^(13|14|15|16|17|18|19)\d{9}$/;
		MV.errele = ele.siblings('.error-span');// 错误提示span
		MV.article = ele.parents('article');// 父元素article
		MV.telMit = false; // 手机号密码验证
		if(val == ''){// 手机号为空
			// ele.focus(); // 获取焦点
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('手机号不能为空');			
			MV.telMit = false;
		}else if(!MV.regTel.test(val)){// 手机号不合法
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('手机号不合法');			
			MV.telMit = false;
		}else{// 通过
			MV.article.removeClass('error-article'); // article移除错误类			
			MV.telMit = true;
		}
	};	
	// 邮箱验证方法
	function ems(ele,val){
		MV.regEms = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
		MV.errele = ele.siblings('.error-span');// 错误提示span
		MV.article = ele.parents('article');// 父元素article
		MV.emsMit = false; // 邮箱验证
		if(val == ''){// 邮箱为空
			// ele.focus(); // 获取焦点
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('邮箱不能为空');			
			MV.emsMit = false;
		}else if(!MV.regEms.test(val)){// 邮箱不合法
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('邮箱不合法');			
			MV.emsMit = false;
		}else{// 通过
			MV.article.removeClass('error-article'); // article移除错误类			
			MV.emsMit = true;
		}
	};
	// 验证码验证方法
	function vericode(ele,val){
		MV.regTel = /^\w{4}$/;
		MV.errele = ele.siblings('.error-span');// 错误提示span
		MV.article = ele.parents('article');// 父元素article
		MV.vericodeMit = false; // 验证码验证
		if(val == ''){// 验证码为空
			// ele.focus(); // 获取焦点
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('验证码不能为空');			
			MV.vericodeMit = false;
		}else if(!MV.regTel.test(val)){// 验证码不合法
			MV.article.addClass('error-article'); // article添加错误类
			MV.errele.text('验证码不合法');			
			MV.vericodeMit = false;
		}else{// 通过
			MV.article.removeClass('error-article'); // article移除错误类			
			MV.vericodeMit = true;
		}
	};
	/*************
	15s后重新获取
	**************/
	MV.totalTime = 15;
	MV.time = MV.totalTime ;
	function getVericode(ele){
		if(MV.time == 0){// 可以重新获取
			ele.removeAttr('disabled');
			ele.text('获取验证码');
			MV.time = MV.totalTime;// 重新计时
		}else{// 按钮不能点击，并开始倒计时
			ele.attr('disabled','true');
			ele.text(MV.time + ' s后重新获取');
			MV.time--;
			// 每秒进行一次操作
			setTimeout(function(){
				getVericode(ele);
			},1000);
		}
	}

	// 调用密码检测
	$('[data-type="password1"]').blur(function(){
		var $this = $(this);
		var val = $this.val();
		passWord($this,val);
	});
	// 调用确认密码检测
	$('[data-type="password2"]').blur(function(){
		var $this = $(this);
		var val1 = $('[data-type="password1"]').val();
		var val2 = $this.val();
		repassWord($this,val1,val2);
	})
	// 调用手机号检测
	$('[data-type="tel"]').blur(function(){
		var $this = $(this);
		var val = $this.val();
		tel($this,val);
	});
	// 调用邮箱检测
	$('[data-type="ems"]').blur(function(){
		var $this = $(this);
		var val = $this.val();
		ems($this,val);
	});
	// 调用验证码检测
	$('[data-type="vericode"]').blur(function(){
		var $this = $(this);
		var val = $this.val();
		vericode($this,val);
	});
	// 点击获取验证码
	$('.getVericode').click(function(){
		var $this = $(this);
		getVericode($this);
	});
	// 提交方法
	/***********************
		将提交按钮的类名设置为submit，
		点击提交，遍历改form表单下的所有要验证的input（即有data-type的input）
		通过检测则可提交
		未通过，则显示错误信息
	*********************/
	$('.submit').click(function(){
		var $this = $(this),
			  forms = $this.parents('form'),
			  validInt = forms.find('input[data-type]');
			  validInt.blur();
		var passNum = $('[data-type="password1"]').val();// 密码
		var telNum = $('[data-type="tel"]').val();// 手机号
		var veriNum = $('[data-type="vericode"]').val();// 验证码
		// 验证通过，ajax提交
		if(MV.passMit && MV.passSureMit && MV.telMit && MV.emsMit && MV.vericodeMit){
			alert('接下来用ajax提交');
			$.ajax({
				url:'../../index.html',
				dataType:'json',
				data:{pass:passNum,tel:telNum,veri:veriNum},
				success:function(data){
					if(data.val == 'true'){
	          alert('登录成功')
	        }else {
	          alert('登录失败')
	        }
				}
			});// /ajax
		};
	});
})
