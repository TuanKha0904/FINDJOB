var app = angular.module('MyApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './Views/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
