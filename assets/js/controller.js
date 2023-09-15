app.controller('HomeController', function () { });

app.controller('ProfileController', function ($scope, ProfileService) {
    $scope.profile = ProfileService;
});

app.controller('AdminController', function ($scope, AdminService) {
    // Show component child focus on page parent
    $scope.admin = AdminService;
});

app.controller('EmployerController', function ($scope, EmployerService) {
    $scope.employer = EmployerService;
});

app.controller('SignupController', function ($scope, SignupService) {
    $scope.signupService = SignupService;
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


