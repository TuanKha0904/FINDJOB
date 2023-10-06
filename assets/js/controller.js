const url = 'https://findjob.zeabur.app/api/';

app.controller('HomeController', function () { });

app.controller('ProfileController', function ($scope, $http, ProfileService, UserService) {
    $scope.profile = ProfileService;
    $scope.user = UserService.getUser();

    //Get infor seeker 
    $http({
        method: 'GET',
        url: url + 'Seeker/CV',
    })
        .then(function (response) {
            $scope.seeker = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });


    $scope.uploadImage = function () {
        document.getElementById('filePicker').click();
        document.getElementById('filePicker').onchange = function () {
            var image = document.getElementById('filePicker').files[0];
            if (image) {
                // Tạo một FormData object và thêm dữ liệu ảnh vào đó
                var formdata = new FormData();
                formdata.append("image", image);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                  };
                  
                  fetch("https://api.imgbb.com/1/upload?key=b6781f912986eb6e6973af895b680cd0", requestOptions)
                .then(function (response) {
                    response.json().then(function (result) {
                        var urlImage = result.data.url;
                        UserService.setUser($scope.user.id, $scope.user.name, $scope.user.email, urlImage, $scope.user.phoneNumber) // Dữ liệu trả về từ API
                        $http({
                            method: 'PUT',
                            url: url + 'Account/Photo',
                            data: {"photoUrl": urlImage}
                        })
                        .catch(function (error) {
                            alert(error.message);
                        })
                    });
                }).catch(function (error) {
                    console.log(error);
                });
            }
        };
    };
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

app.controller('SigninController', function ($scope, $http, $window, UserService, HeaderService, authService) {
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
                authService.setToken(accessToken);
                $http({
                    method: 'POST',
                    url: url + 'Account',
                })
                    .then(function (response) {
                        $scope.result = response.data;
                        var user = $scope.result;
                        if (user == null)
                            alert('Login failed');
                        else {
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
                    authService.setToken($scope.result.idToken);
                    $http({
                        method: 'POST',
                        url: url + 'Account',
                    })
                        .then(function (response) {
                            $scope.result = response.data;
                            var user = $scope.result;
                            if (user == null)
                                alert('Login failed');
                            else {
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
    $scope.user = UserService;

    // Lấy thông tin người dùng từ UserService
    $scope.inforUser = $scope.user.getUser();

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if ($scope.inforUser && $scope.inforUser.Photo) {
        $scope.header.isUserLoggedIn = true;
    }

    // logout
    $scope.signout = function () {
        UserService.logout();
        $scope.header.isUserLoggedIn = false;
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



