$(function(){
  var Login = {};
  Login.int = $('.lg-int');// 输入框
  Login.sub = $('.submit');// 提交按钮
  // enter键
  $('body').on('keydown',function(e){
    if(e.which == '13'){
      Login.sub.trigger('click');
    }
  })
  // 错误提示
  Login.int.on('focus',function(){
    var $this = $(this);
    Login.label =$this.parents('label');
    Login.label.removeClass('error');//获取焦点时移除error
  });
  // ajax提交
  Login.sub.on('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    Login.admin = $('#admin').val();// 获取用户名
    Login.password = $('#password').val();// 获取密码
    $.ajax({
      url:'./index.html',//接口地址
      dataType: "json",
      //传参
      data: { admin: Login.admin, password: Login.password },
      success:function(data){ // 登录成功返回的数据
      console.log(data)
        if(data.val == 'true'){
          alert('登录成功')
        }else {
          alert('登录失败')
        }
      }
    })
  });    
})