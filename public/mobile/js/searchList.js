
$(function () {


  var key = getSearch("key");
  $('.search_input').val(key);
  render();


  // 获取 input框的值, 请求数据,
  function render() {
    $('.lt_product').html('<div class="loading"></div>');


    var params = {};
    params.proName = $('.search_input').val();
    params.page = 1;
    params.pageSize = 100;

    var $current = $('.lt_sort a.current');
    if ($current.length > 0) {
      var sortName = $current.data("type");
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
      params[sortName] = sortValue;
    }


    setTimeout(function () {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: params,
        dataType: "json",
        success: function (info) {
          var htmlStr = template("tpl", info);
          $('.lt_product').html(htmlStr);
        }
      })
    }, 1000);
  }



  $('.search_btn').click(function () {
    var key = $(".search_input").val();
    var jsonStr = localStorage.getItem("search_list");
    var arr = JSON.parse(jsonStr);
    var index = arr.indexOf(key);
    if (index > -1) {
      arr.splice(index, 1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("search_list", JSON.stringify(arr));
    render();
  });



  $('.lt_sort a[data-type]').click(function () {

    if ($(this).hasClass("current")) {
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      $(this).addClass("current").siblings().removeClass("current");
    }
    render();
  })



});