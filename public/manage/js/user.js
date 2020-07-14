
$(function() {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( info ) {
        var htmlStr = template( "tpl", info );
        $('.lt_content tbody').html( htmlStr );
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size ),
          onPageClicked: function( a, b, c, page ) {
            currentPage = page;
            render();
          }
        });

      }
    });
  }


  // 禁用启用
  $('.lt_content tbody').on("click", ".btn", function() {
    
    $('#userModal').modal("show");
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    $('#submitBtn').off("click").on("click", function() {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function( info ) {
          if ( info.success ) {
            $('#userModal').modal("hide");
            render();
          }
        }
      })


    })
  })




})
