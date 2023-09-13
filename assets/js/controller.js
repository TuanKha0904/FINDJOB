app.controller('HomeController', function () { });

app.controller('ProfileController', function ($scope) {
    $scope.Profile = true;
    $scope.ChangePassword = false;
    $scope.EditProfile = false;
    $scope.showProfileView = function () {
        $scope.Profile = true;
        $scope.ChangePassword = false;
        $scope.EditProfile = false;
    };
    $scope.changePassword = function () {
        $scope.Profile = false;
        $scope.ChangePassword = true;
        $scope.EditProfile = false;
    };

    $scope.showEditProfile = function () {
        $scope.Profile = false;
        $scope.ChangePassword = false;
        $scope.EditProfile = true;
    };
});

app.controller('AdminController', function ($scope) {
// Show component child focus on page parent
    $scope.showProfile = false;
    $scope.showPostJob = false;
    $scope.showSeeker = true;
    $scope.showEmployer = false;
    $scope.dashboard = true;
    $scope.account = false;
    $scope.job = false;
    $scope.post = false;
    $scope.InforProfile = function () {
        $scope.showProfile = !$scope.showProfile;
    };
    $scope.InforPostJob = function () {
        $scope.showPostJob = !$scope.showPostJob;
    };
    $scope.showProfileSeeker = function () {
        $scope.showSeeker = true;
        $scope.showEmployer = false;
    };
    $scope.showProfileEmployer = function () {
        $scope.showEmployer = true;
        $scope.showSeeker = false;
    };

// show component page
    $scope.showDashboard = function(){
        $scope.dashboard = true;
        $scope.account = false;
        $scope.job = false;
        $scope.post = false;
    };
    $scope.showAccount = function(){
        $scope.dashboard = false;
        $scope.account = true;
        $scope.job = false;
        $scope.post = false;
    };
    $scope.showJob = function(){
        $scope.dashboard = false;
        $scope.account = false;
        $scope.job = true;
        $scope.post = false;
    };
    $scope.showPost = function(){
        $scope.dashboard = false;
        $scope.account = false;
        $scope.job = false;
        $scope.post = true;
    };
});

app.controller('EmployerController', function ($scope, ProfileEmployerService) {
    $scope.editProfile = ProfileEmployerService;
    $scope.AllPosts = true;
    $scope.ApprovedPost = false;
    $scope.WaitingPost = false;
    $scope.editJob = false;
    $scope.inforEmployer = true;
    $scope.inforSeekerApply = false;
    $scope.ShowAllPosts = function () {
        $scope.AllPosts = true;
        $scope.ApprovedPost = false;
        $scope.WaitingPost = false;
    };
    $scope.ShowApprovedPost = function () {
        $scope.AllPosts = false;
        $scope.ApprovedPost = true;
        $scope.WaitingPost = false;
    };
    $scope.ShowWaitingPost = function(){
        $scope.AllPosts = false;
        $scope.ApprovedPost = false;
        $scope.WaitingPost = true;
    };
    $scope.ShowEditJob = function(){
        $scope.editJob = !$scope.editJob;
    };
    $scope.showInforSeekerApply = function(){
        $scope.inforSeekerApply = true;
        $scope.inforEmployer = false;
    };
    $scope.unshowInforSeekerApply = function(){
        $scope.inforSeekerApply = false;
        $scope.inforEmployer = true;
    };
});

app.controller('SignupController', function ($scope, SignupService) {
    $scope.signupService = SignupService;
});

app.controller('JobDetailController', function($scope, ApplyService){
   $scope.apply = ApplyService;
});

app.controller('HistoryController', function($scope, ApplyService){
    $scope.apply = ApplyService;
    $scope.job = false;
    $scope.showInforJob = function(){
        $scope.job = !$scope.job;
    }
 });
 
app.controller('HeaderController', function($scope)  {
    $scope.employer = false;
    $scope.showEmployer = function(){
        $scope.employer = !$scope.employer;
    }
});


