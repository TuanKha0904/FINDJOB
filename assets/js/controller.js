const url = 'https://findjob.zeabur.app/api/'

app.controller('HomeController', function () { });

app.controller('ProfileController', function ($scope, ProfileService) {
    $scope.profile = ProfileService;
});

app.controller('LoginAdminController', function ($scope, $http, $location, $rootScope) {
    $scope.login = function (email, password) {
        $http({
            method: 'POST',
            url: url + 'Account/Login',
            params: {
                email: email,
                password: password
            }
        })
            .then(function (response) {
                $scope.adminLogin = response.data;
                if ($scope.adminLogin.idToken == null)
                    console.log("Đăng nhập thất bại");
                else {
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.adminLogin.idToken;
                    $http({
                        method: 'POST',
                        url: url + 'Account',
                    })
                        .then(function (response) {
                            $rootScope.adminInfor = response.data;
                            $location.path('/admin_main');
                        });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
});

app.controller('AdminController', function ($scope, AdminService, $rootScope) {
    $scope.admin = AdminService;
    $scope.Infor = $rootScope.adminInfor;
});


app.controller('EmployerController', function ($scope, EmployerService) {
    $scope.employer = EmployerService;
});

app.controller('SigninController', function ($scope, SigninService, $http, $rootScope, HeaderService, $window) {
    $scope.signinService = SigninService;
    $scope.headerService = HeaderService;
    $rootScope.userLogin;

    $scope.loginWithGoogle = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                var user = result.user;
                localStorage.setItem('user', JSON.stringify(user.displayName));
                return user.getIdToken();
            })
            .then(function (accessToken) {
                // Send accessToken as Authorization header to API
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                $http({
                    method: 'POST',
                    url: url + 'Account',
                })
                    .then(function (response) {
                        $rootScope.userLogin = response.data;
                        $scope.headerService.loggedIn = true;
                        // Go back to previous page
                        $window.history.back();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
});

app.controller('JobDetailController', function ($scope, ApplyService) {
    $scope.apply = ApplyService;
});

app.controller('HistoryController', function ($scope, HistoryService, ApplyService) {
    $scope.history = HistoryService;
    $scope.apply = ApplyService;
});

app.controller('HeaderController', function ($scope, HeaderService) {
    $scope.header = HeaderService;
});


