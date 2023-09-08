var app = angular.module("MyApp2", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./views/admin/home_admin.html",
      controller: 'AdminController'
    })
    .when("/account", {
      templateUrl: "./views/admin/account.html",
      controller: 'AdminController'
    })
    .when("/job", {
      templateUrl: "./views/admin/job.html",
      controller: 'AdminController'
    })
    .when("/post", {
      templateUrl: "./views/admin/post.html",
      controller: 'AdminController'
    })
    .when("/create_account", {
      templateUrl: "./views/admin/create_account.html",
      controller: 'AdminController'
    })
    .when("/create_employer", {
      templateUrl: "./views/admin/create_employer.html",
      controller: 'AdminController'
    })
    .when("/create_seeker", {
      templateUrl: "./views/admin/create_seeker.html",
      controller: 'AdminController'
    })
    .when("/create_job", {
      templateUrl: "./views/admin/create_job.html",
      controller: 'AdminController'
    })
    .when("/create_post", {
      templateUrl: "./views/admin/create_post.html",
      controller: 'AdminController'
    })
    .when("/edit_employer", {
      templateUrl: "./views/admin/edit_employer.html",
      controller: 'AdminController'
    })
    .when("/edit_job", {
      templateUrl: "./views/admin/edit_job.html",
      controller: 'AdminController'
    })
    .when("/edit_seeker", {
      templateUrl: "./views/admin/edit_seeker.html",
      controller: 'AdminController'
    })
    .otherwise({
      redirectTo: "/",
    });
});
