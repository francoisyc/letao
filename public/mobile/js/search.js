

$(function() {

  render();

  // 封装一个方法, 用于读取历史记录数组
  function getHistory() {
    var history = localStorage.getItem("search_list") || '[]'; 
    var arr = JSON.parse( history ); 
    return arr;
  }
  function render() {
    var arr = getHistory();
    var htmlStr = template( "historyTpl", { arr: arr } );
    $('.lt_history').html( htmlStr );
  }



  
  $('.lt_history').on("click", ".btn_empty", function() {

    mui.confirm( "你确定要清空历史记录嘛?", "温馨提示", ["取消", "确认"], function( e ) {
      if ( e.index === 1 ) {
        localStorage.removeItem("search_list");
        render();
      }
    })

  });


  
  $('.lt_history').on("click", ".btn_delete", function() {
    var that = this;

    mui.confirm("你确定要删除该条记录嘛", "温馨提示", ["取消", "确认"], function( e ) {

      if ( e.index === 1 ) {
        var index = $(that).data("index");
        var arr = getHistory();
        arr.splice( index, 1 );
        var jsonStr = JSON.stringify( arr );
        localStorage.setItem("search_list", jsonStr );
        render();

      }

    })



  });



  // 功能4: 点击搜索按钮, 添加搜索记录
  // (1) 给 搜索按钮 注册点击事件
  // (2) 获取搜索框的内容
  // (3) 读取本地存储, 拿到数组
  // (4) 将搜索框的内容, unshift 到数组的最前面
  // (5) 将数组转成jsonStr, 存到本地存储中
  // (6) 重新渲染
  $('.search_btn').click(function() {
    var key = $('.search_input').val();  // 获取输入框的值
    if ( key.trim() === "" ) {
      // alert("请输入搜索关键字");
      // 默认值: 2000
      mui.toast("请输入搜索关键字", {
        duration: 2500
      });
      return;
    }


    var arr = getHistory();  // 获取数组

    // 需求:
    // 1. 不要有重复项, 如果有, 移除之前的, 将最新的添加到数组最前面
    var index = arr.indexOf( key );
    if ( index > -1 ) {
      // 说明在数组中 key 已存在
      arr.splice( index, 1 );
    }

    // 2. 数组长度控制在 10 以内
    if ( arr.length >= 10 ) {
      // 移除最后一个
      arr.pop();
    }


    arr.unshift( key ); // 往最前面追加
    // 转成 jsonStr, 存到本地存储中
    localStorage.setItem("search_list", JSON.stringify( arr ) );
    // 重新渲染
    render();
    // 清空搜索框内容
    $('.search_input').val("");


    // 搜索完成, 跳转到搜索列表, 并将搜索关键字传递过去
    location.href = "searchList.html?key=" + key;
  })


});
