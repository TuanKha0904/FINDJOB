var app = angular.module('MyApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './Views/home.html',
            controller: 'HomeController'
        })
        .when('/joblisting', {
            templateUrl: './Views/job_listing.html',
            controller: 'HomeController'
        })
        .when('/signup', {
            templateUrl: './Views/signup.html',
            controller: 'HomeController'
        })
        .when('/signupemployers', {
            templateUrl: './Views/signup_employers.html',
            controller: 'HomeController'
        })
        .when('/account', {
            templateUrl: './Views/account.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: './Views/login.html',
            controller: 'HomeController'
        })
        .when('/post', {
            templateUrl: './Views/post.html',
            controller: 'HomeController'
        })
        .when('/postmanagement', {
            templateUrl: './Views/post_management.html',
            controller: 'HomeController'
        })
        .when('/profile', {
            templateUrl: './Views/profile.html',
            controller: 'HomeController'
        })
        .when('/profilepassword', {
            templateUrl: './Views/profile_password.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
