var app = angular.module("MyApp", ["ngRoute", "ng.ckeditor"]);

// Config Firebase
var firebaseConfig = {
    apiKey: 'AIzaSyD_mccfU36uTeIcExGaWxxPre3MIiWDuic',
    authDomain: 'findjob-c0793.firebaseapp.com',
    projectId: 'findjob-c0793',
};
// Khởi tạo ứng dụng Firebase
firebase.initializeApp(firebaseConfig);

  

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
        .when('/login', {
            templateUrl: 'views/Common/login.html',
            controller: 'SigninController'
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
        .when('/job_details', {
            templateUrl: 'views/seeker/job_details.html',
            controller: 'JobDetailController'
        })
        .when('/history', {
            templateUrl: 'views/seeker/history.html',
            controller: 'HistoryController'
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
            controller: 'LoginAdminController'
        })
        .when('/admin_main', {
            templateUrl: 'views/admin/admin.html',
            controller: 'AdminController'
        })
        .otherwise({
            redirectTo: '/'
        });
})
