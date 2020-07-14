
// 配置禁用小圆环
NProgress.configure({ showSpinner: false });


// ajaxStart 所有的 ajax 开始调用
$(document).ajaxStart(function() {
  NProgress.start();
});


// ajaxStop 所有的 ajax 结束调用
$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done();
  }, 500)
});



// 登录拦截
if ( location.href.indexOf("login.html") === -1 ) {
  $.ajax({
    url: "/employee/checkRootLogin",
    type: "get",
    success: function( info ) {
      if ( info.success ) {
      }
      if ( info.error === 400 ) {
        location.href = "login.html";
      }
    }
  })
}



$(function() {
  // 二级分类切换功能
  $('.category').click(function() {
    $(this).next().stop().slideToggle();
  });


  // 顶部菜单栏切换显示功能
  $('.icon_menu').click(function() {
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
  });

  // 点击显示退出模态框
  $('.icon_logout').click(function() {
    $('#logoutModal').modal("show");
  })

  // 退出功能
  $('#logoutBtn').click(function() {
     $.ajax({
       url: "/employee/employeeLogout",
       type: "GET",
       dataType: "json",
       success: function( info ) {
         if ( info.success ) {
           location.href = "login.html"
         }
       }
     })
  })
})
