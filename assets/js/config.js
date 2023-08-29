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
        .otherwise({
            redirectTo: '/'
        });
});
