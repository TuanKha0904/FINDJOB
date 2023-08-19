var app = angular.module("MyApp2", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./views/admin/home_admin.html",
    })
    .when("/account", {
      templateUrl: "./views/admin/account.html",
    })
    .when("/employer", {
      templateUrl: "./views/admin/employer.html",
    })
    .when("/seeker", {
      templateUrl: "./views/admin/seeker.html",
    })
    .when("/job", {
      templateUrl: "./views/admin/job.html",
    })
    .when("/post", {
      templateUrl: "./views/admin/post.html",
    })
    .when("/create_account", {
      templateUrl: "./views/admin/create_account.html",
    })
    .when("/create_employer", {
      templateUrl: "./views/admin/create_employer.html",
    })
    .when("/create_seeker", {
      templateUrl: "./views/admin/create_seeker.html",
    })
    .when("/create_job", {
      templateUrl: "./views/admin/create_job.html",
    })
    .when("/create_post", {
      templateUrl: "./views/admin/create_post.html",
    })
    .otherwise({
      redirectTo: "/",
    });
});
