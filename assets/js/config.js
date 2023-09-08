var app = angular.module("MyApp", ["ngRoute"]);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'Views/home.html',
            controller: 'HomeController'
        })
        .when('/joblisting', {
            templateUrl: 'Views/job_listing.html',
            controller: 'HomeController'
        })
        .when('/signup', {
            templateUrl: 'Views/signup.html',
            controller: 'HomeController'
        })
        .when('/signupemployers', {
            templateUrl: 'Views/signup_employers.html',
            controller: 'HomeController'
        })
        .when('/account', {
            templateUrl: 'Views/account.html',
            controller: 'HomeController'
        })
        .when('/login', {
            templateUrl: 'Views/login.html',
            controller: 'HomeController'
        })
        .when('/post', {
            templateUrl: 'Views/post.html',
            controller: 'HomeController'
        })
        .when('/postmanagement', {
            templateUrl: 'Views/post_management.html',
            controller: 'HomeController'
        })
        .when('/profile', {
            templateUrl: 'Views/profile.html',
            controller: 'ProfileController'
        })
        .when('/seeker', {
            templateUrl: 'views/seeker/seeker.html',
        })
        .when('/job_details', {
            templateUrl: 'views/seeker/job_details.html',
        })
        .when('/history', {
            templateUrl: 'views/seeker/history.html',
        })
        .when('/post_management_admin', {
            templateUrl: 'Views/post_management_admin.html',
        })
        .when('/job_detail', {
            templateUrl: 'views/job_detail.html',
        })
        .when('/edit_post_employers', {
            templateUrl: 'views/Edit_Post_Employer.html',
        })
        .when('/management_quantity_employers', {
            templateUrl: 'views/Management_Quantity_Employers.html',
        })
        .when('/profile_detail', {
            templateUrl: 'views/profile_detail.html',
        })
        .otherwise({
            redirectTo: '/'
        });
})
