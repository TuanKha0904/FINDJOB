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
    $scope.changePassword = function (){
        $scope.Profile = false;
        $scope.ChangePassword = true;
        $scope.EditProfile = false;
    };

    $scope.showEditProfile = function(){
        $scope.Profile = false;
        $scope.ChangePassword = false;
        $scope.EditProfile = true;
    };
});

app.controller('AdminController', function($scope){
    $scope.showProfile = false; 
    $scope.showPostJob = false;
    $scope.showSeeker = true;
    $scope.showEmployer = false;
    $scope.InforProfile = function() {
        $scope.showProfile = !$scope.showProfile;
    };
    $scope.InforPostJob = function(){
        $scope.showPostJob =!$scope.showPostJob;
    };
    $scope.showProfileSeeker = function(){
        $scope.showSeeker = true;
        $scope.showEmployer = false;
    }
    $scope.showProfileEmployer = function(){
        $scope.showEmployer = true;
        $scope.showSeeker = false;
    }
});