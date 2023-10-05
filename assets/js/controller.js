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

app.controller('SigninController', function ($scope, $http, $window, UserService, HeaderService) {
    $scope.header = HeaderService;
    // Login with Google
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
                        $scope.result = response.data;
                        var user = $scope.result;
                        if(user == null)
                            alert('Login failed');
                        else{
                            UserService.setUser(user.uid, user.name, user.email, user.photo, user.phoneNumber);
                            $scope.header.isUserLoggedIn = true;
                            alert('Login success');
                            // Go back to previous page
                            $window.history.back();
                        }
                    })
                    .catch(function (error) {
                        alert(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // Login with Email and Password
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
                $scope.result = response.data;
                if ($scope.result.idToken == null)
                    alert('Wrong email or password');
                else {
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.result.idToken;
                    $http({
                        method: 'POST',
                        url: url + 'Account',
                    })
                        .then(function (response) {
                            $scope.result = response.data;
                            var user = $scope.result;
                            if(user == null)
                                alert('Login failed');
                            else{
                                UserService.setUser(user.uid, user.name, user.email, user.photo, user.phoneNumber);
                                $scope.header.isUserLoggedIn = true;
                                alert('Login success');
                                // Go back to previous page
                                $window.history.back();
                            }
                        });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
});

app.controller('HeaderController', function ($scope, UserService, $location, HeaderService) {
    $scope.header = HeaderService;
    $scope.user = UserService.getUser();
   if($scope.user){
        $scope.header.isUserLoggedIn = true;
        if (!$scope.user.Photo) {
            $scope.user.Photo = 'https://i.ibb.co/LQNHSjF/24-248253-user-profile-default-image-png-clipart-png-download.png';
        }
   }
    // logout
    $scope.logout = function () {
        UserService.logout();
        header.isUserLoggedIn = false;
        $location.path('/');
    }
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


