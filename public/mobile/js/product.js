
$(function() {

  var productId = getSearch("productId");
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function( info ) {
      var htmlStr = template( "productTpl", info );
      $('.lt_main .mui-scroll').html( htmlStr );
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000
      });
      mui('.mui-numbox').numbox();
    }
  });
  $('.lt_main').on("click", ".lt_size span", function() {
    $(this).addClass("current").siblings().removeClass("current");
  });
  $('#addCart').click(function() {
    var size = $('.lt_size span.current').text();  
    var num = $('.mui-numbox-input').val(); 

    if ( !size ) {
      mui.toast("请选择尺码");
      return;
    }
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        num: num,
        size: size
      },
      dataType: "json",
      success: function( info ) {
        if ( info.success ) {
          mui.confirm( "添加成功", "温馨提示", ["去购物车", "继续浏览"], function( e ) {
            if ( e.index === 0 ) {
              location.href = "cart.html";
            }
          })
        }
        if ( info.error === 400 ) {
          location.href = "login.html?retUrl=" + location.href;
        }
      }
    })


  })



})
