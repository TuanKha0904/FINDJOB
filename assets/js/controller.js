app.controller('HomeController', function ($scope, $http) { });

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
    $scope.showProfile = false;
    $scope.showPostJob = false;
    $scope.showSeeker = true;
    $scope.showEmployer = false;
    $scope.InforProfile = function () {
        $scope.showProfile = !$scope.showProfile;
    };
    $scope.InforPostJob = function () {
        $scope.showPostJob = !$scope.showPostJob;
    };
    $scope.showProfileSeeker = function () {
        $scope.showSeeker = true;
        $scope.showEmployer = false;
    }
    $scope.showProfileEmployer = function () {
        $scope.showEmployer = true;
        $scope.showSeeker = false;
    }
});

app.controller('EmployerController', function ($scope) {
    $scope.AllPosts = true;
    $scope.ApprovedPost = false;
    $scope.WaitingPost = false;
    $scope.editJob = false;
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

});