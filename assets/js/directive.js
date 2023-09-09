app.directive("headingPage", () => {
  return {
    restrict: "E",
    templateUrl: "./views/header.html",
  };
});

app.directive("footerPage", () => {
  return {
    restrict: "E",
    templateUrl: "./views/footer.html",
  };
});

app.directive("headingPageAdmin", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/header_admin.html",
  };
});

app.directive("leftContentPageAdmin", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/left-content.html",
  };
});

app.directive("editProfileSeeker", () => {
  return {
    restrict: "E",
    templateUrl: "./views/seeker/edit_profile_seeker.html",
  };
});

app.directive("profileSeeker", () => {
  return {
    restrict: "E",
    templateUrl: "./views/seeker/profile_seeker.html",
  };
});

app.directive("profilePassword", () => {
  return {
    restrict: "E",
    templateUrl: "./views/seeker/profile_password.html",
  };
});

app.directive("approvedPost", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/approved_post.html",
  };
});

app.directive("allPosts", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/all_posts.html",
  };
});

app.directive("waitingPost", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/waiting_post.html",
  };
});

app.directive("editJob", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/edit_job.html",
  };
});



app.directive("databg", () => {
  /* 9. data-background */
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      // Lấy giá trị thuộc tính 'data-background' của phần tử
      var dataBgValue = element.attr("data-background");
      if (dataBgValue) {
        // Đặt thuộc tính 'background-image' của phần tử
        element.css("background-image", "url(" + dataBgValue + ")");
      }
    }
  };
});

app.directive("range", () => {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      var $range = $(".js-range-slider"),
        $inputFrom = $(".js-input-from"),
        $inputTo = $(".js-input-to"),
        instance,
        min = 0,
        max = 5000,
        from = 10,
        to = 1000;

      $range.ionRangeSlider({
        type: "double",
        min: min,
        max: max,
        from: 0,
        to: 5000,
        prefix: '',
        onStart: updateInputs,
        onChange: updateInputs,
        step: 1,
        prettify_enabled: true,
        prettify_separator: ".",
        values_separator: " - ",
        force_edges: true


      });

      instance = $range.data("ionRangeSlider");

      function updateInputs(data) {
        from = data.from;
        to = data.to;

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
      }

      $inputFrom.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < min) {
          val = min;
        } else if (val > to) {
          val = to;
        }

        instance.update({
          from: val
        });
      });

      $inputTo.on("input", function () {
        var val = $(this).prop("value");

        // validate
        if (val < from) {
          val = from;
        } else if (val > max) {
          val = max;
        }

        instance.update({
          to: val
        });
      });
    }
  }
});

app.directive("nselect", () => {
  /* 6. Nice Selectorp  */
  return {
    restrict: "A ",
    link: function (scope, element, attrs) {
      var nice_Select = $('select');
      if (nice_Select.length) {
        nice_Select.niceSelect();
      };
      element.niceSelect();
    }
  };
});

