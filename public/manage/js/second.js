
$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        var htmlStr = template("secondTpl", info);
        $('.lt_content tbody').html(htmlStr);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  };

  // 点击添加分类按钮, 显示添加模态框
  $('#addBtn').click(function () {
    $('#addModal').modal("show");
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        var htmlStr = template("dropdownTpl", info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });
  $('.dropdown-menu').on("click", "a", function () {
    var txt = $(this).text();
    var id = $(this).data("id");
    $('#dropdownText').text(txt);
    $('[name="categoryId"]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });
  $('#fileupload').fileupload({
    dataType: "json",
    done: function (e, data) {
      var picAddr = data.result.picAddr;
      $('#imgBox img').attr("src", picAddr);
      $('[name="brandLogo"]').val(picAddr);
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
    }
  });
 //表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });
//提交
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/category/addSecondCategory",
      type: "post",
      data: $('#form').serialize(),
      success: function (info) {
        $('#addModal').modal("hide");
        $('#form').data("bootstrapValidator").resetForm(true);
        currentPage = 1;
        render();
        $('#dropdownText').text("请选择1级分类")
        $('#imgBox img').attr("src", "images/none.png")
      }
    })
  })



});
