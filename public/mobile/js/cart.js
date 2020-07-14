
$(function() {

  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/cart/queryCart",
      dataType: "json",
      success: function( info ) {
        if ( info.error === 400 ) {
          location.href = "login.html?retUrl=" + location.href;
          return;
        }
        var htmlStr = template( "cartTpl" , { arr: info } );
        $('.lt_main .mui-table-view').html( htmlStr );
      }
    });
  }


});
