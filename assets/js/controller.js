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