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

app.directive("databg", () => {
  /* 9. data-background */
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ")"
    );
  });
});
