var app = angular.module("MyApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./views/home.html",
      controller: "HomeController",
    })
    .when("/seeker", {
      templateUrl: "./views/seeker/seeker.html",
    })
    .when("/job_details", {
      templateUrl: "./views/seeker/job_details.html",
    })
    .otherwise({
      redirectTo: "/",
    });
});
