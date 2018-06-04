$(function(){
	var MA = {};
	MA.tel = $('#acInfortel');
	MA.telNum = $('#acInfortel').val();// 先存储未处理的手机号
  // 手机号解析
  // var acInfortel = $('#acInfortel').val();
  MA.telNum = MA.telNum.replace(/(\d{3})\d{5}(\d{3})/, '$1*****$2')
  $('#acInfortel').val(MA.telNum);
  // 修改手机号
  /********
	1.文字为修改时,点击后：文字变为确定。修改输入框变为可写状态,清空输入框中的手机号。
	2.文字为确定时,点击后：文字变为修改。
		2-1.输入框无内容，点击确定后，手机号保持不变
		2-2.输入框修改成其他手机号，检测格式正确，且未存在数据库中，进行修改操作
	成功后修改输入框变为只读状态。
  *********/
  $('.modify').click(function(){
  	var $this = $(this);
  	var int = $this.siblings('.f-input');
  	if($this.text()=='修改'){// 修改手机号
  		$this.text('确定');
  		MA.tel.removeAttr('readonly').val('').focus();
  	}else{// 确认修改
  		$this.text('修改');
  		if(int.val() == ''){// 输入框无内容
  			int.val(MA.telNum.replace(/(\d{3})\d{5}(\d{3})/, '$1*****$2'));
  		}else{// 输入框修改成其他手机号(未加验证)
  			var newval = int.val();
  			MA.telNum = newval;
  			newval = newval.replace(/(\d{3})\d{5}(\d{3})/, '$1*****$2');
  			int.val(newval);
  		}
  		MA.tel.attr('readonly','true');
  	}
  });
})
