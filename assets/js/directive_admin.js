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

app.directive("databg", () => {
  /* 9. data-background */
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });
});

app.directive("profileInfor", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/profile_infor.html",
  };
});

app.directive("showPostJob", () => {
  return {
    restrict: "E",
    templateUrl: "./views/admin/post_job.html",
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



