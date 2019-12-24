$(".title-err").hide();
$(".image-error").hide();
$(".image-error2").hide();
var validImageTypes = ["image/gif", "image/jpeg", "image/png"];

function isvalid() {
    var title = $(".title input").val();
    if (title == "") {
        $(".title-err").show();
        return false;
    } else {
        $(".title-err").hide();
    }

    var thumbnaildata = $("#thumb").prop("files")[0];
    if (thumbnaildata == null) {
        $(".image-error").show();
        $("#thumbnail").fadeOut();
        return false;
    } else if ($.inArray(thumbnaildata["type"], validImageTypes) < 0) {
        $(".image-error2").show();
        $("#thumbnail").fadeOut();
        return false;
    } else {
        $(".image-error").hide();
        $(".image-error2").hide();
        $("#thumbnail").fadeIn();
    }
    return true;
}




$("#thumb").change(function () {
      
    var thumbnaildata = $("#thumb").prop("files")[0];

    if ($.inArray(thumbnaildata["type"], validImageTypes) < 0) {
        $(".image-error").show();
        $(".image-error2").show();
        $("#thumbnail").fadeOut();
          return;
        } else {
            $(".image-error").hide();
            $(".image-error2").hide();
            $("#thumbnail").fadeIn();
        }

    previewThumbnail(this);
    // var thumbnail = $("#thumb").prop("files")[0];

  });

  function previewThumbnail(thumbnail) {
    if (thumbnail.files && thumbnail.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#thumbnail").attr('src', e.target.result);
      }
      reader.readAsDataURL(thumbnail.files[0]);
    }
  }

