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
    $scope.loginWithGoogle = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                var user = result.user;
                localStorage.setItem('user', JSON.stringify(user.displayName));
                console.log(user);
            })
            .catch(function (error) {
               console.log(error);
            });
    };
});

//"eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5MGFkMTE4YTk0MGFkYzlmMmY1Mzc2YjM1MjkyZmVkZThjMmQwZWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS2hhIEzDqiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMTXFUdjZydnB3WlQ0ek4xU185dzJac1RONUdaRFNYUHhLZmtGaXRoYkg9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmluZGpvYi1jMDc5MyIsImF1ZCI6ImZpbmRqb2ItYzA3OTMiLCJhdXRoX3RpbWUiOjE2OTQ4NDM4NDEsInVzZXJfaWQiOiJMNTMzSXNvalZGT3k5RWo3ZmxEZGJjQ0VkdGwxIiwic3ViIjoiTDUzM0lzb2pWRk95OUVqN2ZsRGRiY0NFZHRsMSIsImlhdCI6MTY5NDg0Mzg0MSwiZXhwIjoxNjk0ODQ3NDQxLCJlbWFpbCI6ImtoYTA5MDQwM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMzA2MDIzMjIzMTY3MTgyNTY4MCJdLCJlbWFpbCI6WyJraGEwOTA0MDNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.TIBFTXVqEH7c9JkojwE4SIYd8U9s-5NZtbW2VDm893cGei31SqwDk4SYufC1u7e9jQ02gIP0jty1dSRlpDxpHEojNDYUdQVQ6-kT1QolY2Vovbw4Jwl_QL_-w1a8V0o-yrG9wTWXdBpNKLzA3A_Ca2_Fj_8QlHfh02rf_tT2xGxCBx9JL18P358ifTwxPlOScgW52p5sLvxluFdDl1vmgIcRq-Zym8U9qPrttHEHcvqKYMSKNH1bD0ME6iwJB2GfADLdmRkzv4cgCmHQXtXgAh1ijDfYwe9rScZsq37bpX5CXEZt8EtyE1aY2xrY2U767KAMYv3F_zZmX_5NTsBarQ"

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


