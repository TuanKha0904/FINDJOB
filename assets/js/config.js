var app = angular.module("MyApp", ["ngRoute", "ng.ckeditor"]);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'Views/home.html',
            controller: 'HomeController'
        })
        .when('/joblisting', {
            templateUrl: 'views/seeker/job_listing.html',
            controller: 'HomeController'
        })
        .when('/signup', {
            templateUrl: 'views/Common/signup.html',
            controller: 'SignupController'
        })
        .when('/login', {
            templateUrl: 'views/Common/login.html',
            controller: 'HomeController'
        })
        .when('/post', {
            templateUrl: 'views/employer/post.html',
            controller: 'HomeController'
        })
        .when('/postmanagement', {
            templateUrl: 'views/employer/post_management.html',
            controller: 'EmployerController'
        })
        .when('/profile', {
            templateUrl: 'views/seeker/profile.html',
            controller: 'ProfileController'
        })
        .when('/employer', {
            templateUrl: 'views/employer/employers.html',
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
            templateUrl: 'views/employer/job_detail.html',
            controller: 'EmployerController'
        })
        .when('/profile_detail', {
            templateUrl: 'views/profile_detail.html',
        })
        .when('/apply_list', {
            templateUrl: 'views/employer/apply_list.html',
            controller: 'EmployerController'
        })
        .when('/edit_job', {
            templateUrl: 'views/employer/edit_job.html',
            controller: 'EmployerController'
        })
        .when('/profile_employer', {
            templateUrl: 'views/employer/profile.html',
            controller: 'EmployerController'
        })
        .when('/admin', {
            templateUrl: 'views/admin/login_admin.html',
            controller: 'AdminController'
        })
        .when('/admin_main', {
            templateUrl: 'views/admin/admin.html',
            controller: 'AdminController'
        })
        .otherwise({
            redirectTo: '/'
        });
})
