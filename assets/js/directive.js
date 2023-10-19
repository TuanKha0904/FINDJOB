app.directive("headingPage", () => {
  return {
    restrict: "E",
    templateUrl: "./views/Common/header.html",
    controller: 'HeaderController'
  };
});

app.directive("footerPage", () => {
  return {
    restrict: "E",
    templateUrl: "./views/Common/footer.html",
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
    templateUrl: "./views/seeker/components/edit_profile_seeker.html",
    controller: 'ProfileController',
  };
});

app.directive("profileSeeker", () => {
  return {
    restrict: "E",
    templateUrl: "./views/seeker/components/profile_seeker.html",
    controller: 'ProfileController'
  };
});

app.directive("profilePassword", () => {
  return {
    restrict: "E",
    templateUrl: "./views/seeker/components/profile_password.html",
    controller: 'ProfileController'
  };
});

app.directive("approvedPost", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/approved_post.html",
    controller: 'PostManagementController'
  };
});

app.directive("allPosts", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/all_posts.html",
    controller: 'PostManagementController'
  };
});

app.directive("waitingPost", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/waiting_post.html",
    controller: 'PostManagementController'
  };
});

app.directive("inforEmployer", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/infor_employer.html",
  };
});

app.directive("inforSeekerApply", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/infor_seeker_apply.html",
  };
});

app.directive("profileInfor", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/profile_infor.html",
    controller: 'DashboardController'
  };
});

app.directive("showPostJob", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/components/post_job.html",
    controller: 'DashboardController'
  };
});

app.directive("showProfileSeeker", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/components/seeker_infor.html",
  };
});

app.directive("showProfileEmployer", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/components/employer_infor.html",
  };
});

app.directive("dashBoard", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/components/dashboard.html",
    controller: 'DashboardController'
  };
});

app.directive("accountManagement", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/components/account_management.html",
    controller: 'AccountManagementController'
  };
});

app.directive("jobManagement", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/components/job_management.html",
    controller: 'JobAdminController'
  };
});

app.directive("postManagement", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/components/post_management.html",
    controller: 'PostAdminController'
  };
});

app.directive("signup", () => {
  return {
    restrict: "E",
    templateUrl: "./views/Common/components/signup.html",
    controller: 'SignupController'
  };
});

app.directive("employerSignup", () => {
  return {
    restrict: "E",
    templateUrl: "./views/Common/components/employer_signup.html",
    controller: 'SignupController'
  };
});

app.directive("seekerSignup", () => {
  return {
    restrict: "E",
    templateUrl: "./views/Common/components/seeker_signup.html",
    controller: 'SignupController'
  };
});

app.directive("applyJob", () => {
  return {
    restrict: "E",
    templateUrl: "./views/seeker/components/apply.html",
  };
});

app.directive("inforJob", () => {
  return {
    restrict: "E",
    templateUrl: "./views/seeker/components/infor_job.html",
    controler: "HistoryController"
  };
});

app.directive("editProfile", () => {
  return {
    restrict: "E",
    templateUrl: "./views/employer/components/edit_profile.html",
    controller: 'ProfileEmployerController',
  };
});

app.directive("typeIndustry", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/components/type_industry.html",
    controller: 'TypeAndIndustryController'
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

app.directive("ckeditor", function() {
  return {
    restrict: "A ",
    link: function(scope, element, attrs, ngModel) {
      // Tạo CKEditor cho element
      var editor = CKEDITOR.replace(element[0]);
      editor.on("instanceReady", function() {
        // Thiết lập kích thước cho CKEditor container
        var editorContainer = editor.container;
        editorContainer.setStyle("width", "70%"); // Thiết lập chiều rộng theo ý muốn
        editorContainer.setStyle("height", "50%"); // Thiết lập chiều cao theo ý muốn
      });
    }
  };
});

app.directive('hideOnAdmin', ['$location', function($location) {
  return {
      restrict: 'A',
      link: function(scope, element) {
          scope.$watch(function() {
              return $location.path();
          }, function(newPath) {
              if (newPath.indexOf('admin') !== -1) {
                  element.css('display', 'none');
              } else {
                  element.css('display', 'block');
              }
          });
      }
  };
}]);

app.directive('togglePasswordVisibility', function() {
  return {
      restrict: 'A',
      link: function(scope, element) {
          element.on('click', function() {
              var passwordField = document.querySelector(".password-field");
              var eyeIcon = document.querySelector(".click-eye");

              if (passwordField.type === "password") {
                  passwordField.type = "text";
                  eyeIcon.classList.remove("fa-eye-slash");
                  eyeIcon.classList.add("fa-eye");
              } else {
                  passwordField.type = "password";
                  eyeIcon.classList.remove("fa-eye");
                  eyeIcon.classList.add("fa-eye-slash");
              }
          });
      }
  };
});

app.directive('clock', ['$timeout', function($timeout) {
  return {
      restrict: 'A',
      link: function(scope, element) {
          function updateTime() {
              var today = new Date();
              var weekday = new Array(7);
              weekday[0] = "Sunday";
              weekday[1] = "Monday";
              weekday[2] = "Tuesday";
              weekday[3] = "Wednesday";
              weekday[4] = "Thursday";
              weekday[5] = "Friday";
              weekday[6] = "Saturday";
              var day = weekday[today.getDay()];
              var dd = today.getDate();
              var mm = today.getMonth() + 1;
              var yyyy = today.getFullYear();
              var h = today.getHours();
              var m = today.getMinutes();
              var s = today.getSeconds();
              m = checkTime(m);
              s = checkTime(s);
              nowTime = h + " : " + m + " : " + s;
              if (dd < 10) {
                  dd = "0" + dd;
              }
              if (mm < 10) {
                  mm = "0" + mm;
              }
              today = day + ", " + dd + "/" + mm + "/" + yyyy;
              tmp = '<span class="date"> ' + today + " - " + nowTime + "</span>";
              element.html(tmp);
              clocktime = $timeout(updateTime, 1000);
          }

          function checkTime(i) {
              if (i < 10) {
                  i = "0" + i;
              }
              return i;
          }

          updateTime();
      }
  };
}]);

