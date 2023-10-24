// const url = 'http://www.findjobapi.somee.com/api/';
const url = "https://findjob.zeabur.app/api/";

app.controller("HomeController", function ($scope, $http) {
  // get location
  getLocation($scope);

  //get type
  getType($http, $scope);

  //get industry
  getIndustry($http, $scope);

  //get all job
  GetAllJob($http, $scope, 1, 5);
});

app.controller("ProfileController", function ($scope, $http, $sce, ProfileService, UserService, notificationService) {
  $scope.profile = ProfileService;
  $scope.user = UserService.getUser();

  // initialize seeker profile
  $scope.seeker = {
    name: "",
    email: "",
    phone_Number: "",
    birthday: "",
    address: "",
    experience: "",
    skills: "",
    education: "",
    major: "",
  };

  //Get infor seeker
  function getInfor() {
    $http({
      method: "GET",
      url: url + "Seeker/CV",
    })
      .then(function (response) {
        $scope.seeker = response.data;
        // Cập nhật dữ liệu vào CKEditor
        CKEDITOR.instances.experienceEditor.setData($scope.seeker.experience);
        CKEDITOR.instances.skillsEditor.setData($scope.seeker.skills);
        $scope.seeker.experience = $sce.trustAsHtml(response.data.experience);
        $scope.seeker.skills = $sce.trustAsHtml(response.data.skills);
      })
      .catch(function (error) {
        console.log(error);
      });

    // Upload image
    $scope.uploadImage = function () {
      document.getElementById("filePicker").click();
      document.getElementById("filePicker").onchange = function () {
        var image = document.getElementById("filePicker").files[0];
        if (image) {
          // Tạo một FormData object và thêm dữ liệu ảnh vào đó
          var formdata = new FormData();
          formdata.append("image", image);

          var requestOptions = {
            method: "POST",
            body: formdata,
          };

          fetch(
            "https://api.imgbb.com/1/upload?key=b6781f912986eb6e6973af895b680cd0",
            requestOptions
          )
            .then(function (response) {
              response.json().then(function (result) {
                var urlImage = result.data.url;
                UserService.setUser(
                  $scope.user.id,
                  $scope.user.name,
                  $scope.user.email,
                  urlImage,
                  $scope.user.phoneNumber
                ); // Dữ liệu trả về từ API
                $http({
                  method: "PUT",
                  url: url + "Account/Photo",
                  data: { photoUrl: urlImage },
                }).catch(function (error) {
                  notificationService.displayError(error.message);
                });
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      };
    };
  }
  getInfor();

  //Edit profile seeker
  $scope.EditProfile = function (
    name,
    email,
    phone_Number,
    birthday,
    address,
    education,
    major
  ) {
    var experience = CKEDITOR.instances.experienceEditor.getData();
    var skills = CKEDITOR.instances.skillsEditor.getData();
    $http({
      method: "PUT",
      url: url + "Seeker/UpdateCV",
      data: {
        name: name,
        email: email,
        phone_Number: phone_Number,
        birthday: birthday,
        address: address,
        experience: experience,
        skills: skills,
        education: education,
        major: major,
      },
    })
      .then(function (response) {
        notificationService.displaySuccess(response.data);
        getInfor();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Change password
  $scope.changePassword = function (password, repeatPassword) {
    if (password === repeatPassword)
      $http({
        method: "PUT",
        url: url + "Account/Password",
        data: {
          password: password,
        },
      })
        .then(function (response) {
          notificationService.displaySuccess(response.data);
          getInfor();
        })
        .catch(function (error) {
          console.log(error);
        });
    else notificationService.displayWarning("Passwords do not match");
  };
}
);

app.controller("LoginAdminController", function ($scope, $http, $location, $rootScope, notificationService) {
  $scope.login = function (email, password) {
    $http({
      method: "POST",
      url: url + "Account/Login",
      params: {
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        $scope.adminLogin = response.data;
        if ($scope.adminLogin.isAdmin == false || $scope.adminLogin.idToken == null)
          notificationService.displayWarning("Sai tài khoản hoặc mật khẩu");
        else {
          $http.defaults.headers.common["Authorization"] =
            "Bearer " + $scope.adminLogin.idToken;
          $http({
            method: "POST",
            url: url + "Account",
          }).then(function (response) {
            $rootScope.adminInfor = response.data;
            $location.path("/admin_main");
          });
        }
      })
      .catch(function (error) {
        notificationService.displayError(error.data);
      });
  };
}
);

app.controller("AdminController", function ($scope, AdminService, $rootScope, $http, $location) {
  $scope.admin = AdminService;
  $scope.Infor = $rootScope.adminInfor;
  $scope.logout = function () {
    $rootScope.adminInfor = null;
    delete $http.defaults.headers.common["Authorization"];
    $location.path("/admin");
  }
});

app.controller("EmployerController", function ($scope, $filter, $window, EmployerService, $http, $routeParams, notificationService) {
  $scope.employer = EmployerService;
  $scope.jobId = $routeParams.jobId

  // get job detail
  getJobDetail($http, $scope, $scope.jobId);

  // get location
  getLocation($scope);

  //get type
  getType($http, $scope);
  
  // get industry
  getIndustry($http, $scope);

  // edit job
  $scope.editJob = function (jobTitle, minimum_Salary, maximum_Salary, location, industry_id, type_id, deadline) {
    var description = CKEDITOR.instances.descriptionE.getData();
    var requirement = CKEDITOR.instances.requirementE.getData();
    var formattedDeadline = $filter('date')(deadline, 'yyyy-MM-dd');
    var data = {
      "jobTitle": jobTitle,
      "minimum_Salary": minimum_Salary,
      "maximum_Salary": maximum_Salary,
      "location": location,
      "industry_id": industry_id.industry_id,
      "type_id": type_id.type_id,
      "deadline": formattedDeadline,
      "jobDescription": description,
      "requirement": requirement,
    }
    console.log(data);
    $http({
      method: "PUT",
      url: url + "Job/Update?job_id=" + $scope.jobId,
      data: data
    })
      .then(function (response) {
        notificationService.displaySuccess(response.data);
        $window.history.back();
      })
      .catch(function (error) {
        console.log(error); 
      });
  };

  // get apply list
  function applyList(){
    $http({
      method: "GET",
      url: url + "Job/ApplyList?pageNumber=1&pageSize=10&job_id=" + $scope.jobId,
    })
      .then(function (response) {
        $scope.applyList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  applyList();

  $scope.showApply = function(uid){
    $http({
      method: "GET",
      url: url + "Seeker/CVInfor?userId=" + uid
    })
      .then(function (response) {
        $scope.apply = response.data;
        console.log($scope.apply);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});

app.controller("SigninController", function ($scope, $http, $window, UserService, HeaderService, authService, notificationService) {
  $scope.header = HeaderService;
  // Login with Google
  $scope.loginWithGoogle = function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var user = result.user;
        localStorage.setItem("user", JSON.stringify(user.displayName));
        console.log(user);
        return user.getIdToken();
      })
      .then(function (accessToken) {
        // Send accessToken as Authorization header to API
        $http.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;
        authService.setToken(accessToken);
        $http({
          method: "POST",
          url: url + "Account",
        })
          .then(function (response) {
            $scope.result = response.data;
            var user = $scope.result;
            if (user == null) notificationService.displayError("Login failed");
            else {
              UserService.setUser(
                user.uid,
                user.name,
                user.email,
                user.photo,
                user.phoneNumber
              );
              $scope.header.isUserLoggedIn = true;
              notificationService.displaySuccess("Login success");
              // Go back to previous page
              $window.history.back();
            }
          })
          .catch(function (error) {
            notificationService.displayError(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Login with Email and Password
  $scope.login = function (email, password) {
    $http({
      method: "POST",
      url: url + "Account/Login",
      params: {
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        $scope.result = response.data;
        if ($scope.result.idToken == null) notificationService.displayWarning("Wrong email or password");
        else {
          $http.defaults.headers.common["Authorization"] =
            "Bearer " + $scope.result.idToken;
          authService.setToken($scope.result.idToken);
          $http({
            method: "POST",
            url: url + "Account",
          }).then(function (response) {
            $scope.result = response.data;
            var user = $scope.result;
            if (user == null) notificationService.displayError("Login failed");
            else {
              UserService.setUser(
                user.uid,
                user.name,
                user.email,
                user.photo,
                user.phoneNumber
              );
              $scope.header.isUserLoggedIn = true;
              notificationService.displaySuccess("Login success");
              // Go back to previous page
              $window.history.back();
            }
          });
        }
      })
      .catch(function (error) {
        notificationService.displayError(error.data);
      });
  };
}
);

app.controller("HeaderController", function ($scope, UserService, $location, HeaderService) {
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
    $location.path("/");
  };
}
);

app.controller("JobDetailController", function ($scope, ApplyService, $http, $routeParams, $location, notificationService) {
  $scope.apply = ApplyService;
  $scope.jobId = $routeParams.jobId;

  // get job detail
  getJobDetail($http, $scope, $scope.jobId);

  // apply job no account
  $scope.applyjob = function postRecruitmentNoAccount(
    name,
    email,
    phone,
    birthday,
    address,
    major,
    education,
  ) {
    var skills = CKEDITOR.instances.skillsEditor.getData();
    var experience = CKEDITOR.instances.experienceEditor.getData();
    console.log(name, email, phone, birthday, address, major, experience, education, skills);
    if (!name || !email || !phone || !birthday || !address || !major || !experience || !education || !skills)
      notificationService.displayWarning("Vui lòng điền đầy đủ thông tin");
    else {
      $http({
        method: "POST",
        url: url + "RecruitmentNoAccount/Post",
        data: {
          job_id: $scope.jobId,
          name: name,
          email: email,
          phone: phone,
          birthday: birthday,
          address: address,
          major: major,
          experience: experience,
          education: education,
          skills: skills,
        },
      })
        .then(function (response) {
          notificationService.displaySuccess(response.data);
        })
        .catch(function (error) {
          notificationService.displayError(error.data);
          console.log(error.data);
        });
    }
  };

  $scope.apply = function () {
    $http({
      method: "POST",
      url: url + "Recruitment/Post?job_id=" + $scope.jobId,
    })
      .then(function (response) {
        notificationService.displaySuccess(response.data);
      })
      .catch(function (error) {
        if (error.data == "Hãy cập nhật thông tin trước khi xin việc!") {
          notificationService.displayError(error.data);
          $location.path("profile");
        }
      });
  }
});

app.controller("HistoryController", function ($scope, $http, HistoryService, ApplyService, notificationService) {
  $scope.history = HistoryService;
  $scope.apply = ApplyService;

  //get job history apply
  function historyApply(pageNumber) {
    $http({
      method: 'GET',
      url: url + 'Recruitment/Seeker?pageSize=5&pageNumber=' + pageNumber
    }).then(function (response) {
      $scope.jobs = response.data;
    }).catch(function (error) {
      console.log(error);
    })
  }
  historyApply(1);
  $scope.delete = function (id) {
    $http({
      method: 'DELETE',
      url: url + 'Recruitment/Delete?job_id=' + id
    }).then(function (response) {
      notificationService.displaySuccess(response.data);
      historyApply();
    }).catch(function (error) {
      console.log(error);
    })

  }
  $scope.jobDetail = function (id) {
    $http({
      method: 'GET',
      url: url + 'Job/JobDetail?jobId=' + id
    }).then(function (response) {
      $scope.job = response.data;
    }).catch(function (error) {
      console.log(error);
    })
  }

  //pagination
  //pagination
  $scope.currentPage = 1;
  $scope.totalPage = 100;
  $scope.pageNumber = [];
  $scope.changePage = function (newPage) {
    $scope.currentPage = newPage;
    historyApply($scope.currentPage);
  };
  function updatePageNumber(startPage) {
    var endPage = Math.min(startPage + 2, $scope.totalPage);
    $scope.pageNumber = [];
    for (var i = startPage; i <= endPage; i++) {
      $scope.pageNumber.push(i);
    }
    $scope.showPreviousButton = startPage > 1;
  }

  updatePageNumber(1);
  $scope.nextPage = function () {
    var lastPage = $scope.pageNumber[$scope.pageNumber.length - 1];
    if (lastPage + 3 <= $scope.totalPage) {
      updatePageNumber(lastPage + 1);
    }
  };
  $scope.previousPage = function () {
    var firstPage = $scope.pageNumber[0];
    if (firstPage - 3 > 0) {
      updatePageNumber(firstPage - 3);
    }
  };


}
);

app.controller("ProfileEmployerController", function ($scope, $http, $sce, EmployerService, notificationService) {
  $scope.employerService = EmployerService;
  $scope.employer = {
    contact_phone: "",
    email: "",
    employer_about: "",
    employer_address: "",
    employer_name: "",
    employer_website: "",
    image_cover: "",
    employer_image: "",
  };
  function getInfor() {
    $http({
      method: "GET",
      url: url + "Employer/Get",
    })
      .then(function (response) {
        $scope.employer = response.data;
        CKEDITOR.instances.aboutEmployer.setData(
          $scope.employer.employer_about
        );
        $scope.employer.employer_about = $sce.trustAsHtml(
          response.data.employer_about
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getInfor();
  $scope.updateEmployerProfile = function (
    employer_name,
    email,
    contact_phone,
    employer_website,
    employer_address
  ) {
    var about = CKEDITOR.instances.aboutEmployer.getData();
    $http({
      method: "PUT",
      url: url + "Employer/Infor",
      data: {
        name: employer_name,
        email: email,
        phone: contact_phone,
        website: employer_website,
        address: employer_address,
        about: about,
      },
    })
      .then(function (response) {
        EmployerService.editProfile = false;
        notificationService.displaySuccess(response.data);
        getInfor();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.uploadImage = function () {
    document.getElementById("MainImage").click();
    document.getElementById("MainImage").onchange = function () {
      var image = document.getElementById("MainImage").files[0];
      if (image) {
        // Tạo một FormData object và thêm dữ liệu ảnh vào đó
        var formdata = new FormData();
        formdata.append("image", image);

        var requestOptions = {
          method: "POST",
          body: formdata,
        };

        fetch(
          "https://api.imgbb.com/1/upload?key=b6781f912986eb6e6973af895b680cd0",
          requestOptions
        )
          .then(function (response) {
            response.json().then(function (result) {
              var urlImage = result.data.url;
              $http({
                method: "PUT",
                url: url + "Employer/Image",
                data: { image: urlImage },
              })
                .then(function (response) {
                  $scope.employer.employer_image = urlImage;
                  notificationService.displaySuccess(response.data);
                  getInfor();
                })
                .catch(function (error) {
                  notificationService.displayError(error.message);
                });
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    };
  };

  $scope.uploadImageCover = function () {
    document.getElementById("ImageCover").click();
    document.getElementById("ImageCover").onchange = function () {
      var image = document.getElementById("ImageCover").files[0];
      if (image) {
        // Tạo một FormData object và thêm dữ liệu ảnh vào đó
        var formdata = new FormData();
        formdata.append("image", image);

        var requestOptions = {
          method: "POST",
          body: formdata,
        };

        fetch(
          "https://api.imgbb.com/1/upload?key=b6781f912986eb6e6973af895b680cd0",
          requestOptions
        )
          .then(function (response) {
            response.json().then(function (result) {
              var urlImage = result.data.url;
              $http({
                method: "PUT",
                url: url + "Employer/ImageCover",
                data: { imageCover: urlImage },
              })
                .then(function (response) {
                  $scope.employer.image_cover = urlImage;
                  notificationService.displaySuccess(response.data);
                  getInfor();
                })
                .catch(function (error) {
                  notificationService.displayError(error.message);
                });
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    };
  };
}
);

app.controller("PostController", function ($scope, $http, notificationService) {
  // get location
  getLocation($scope);

  //get type
  getType($http, $scope);

  //get industry
  getIndustry($http, $scope);

  //post job
  $scope.Post = function (
    tittle,
    location,
    minsalary,
    maxsalary,
    type,
    industry,
    deadline
  ) {
    var description = CKEDITOR.instances.descriptionEditor.getData();
    var requirement = CKEDITOR.instances.requirementEditor.getData();
    var data = {
      jobTitle: tittle,
      location: location["name"],
      minimum_Salary: minsalary,
      maximum_Salary: maxsalary,
      jobDescription: description,
      type_id: type["type_id"],
      industry_id: industry["industry_id"],
      deadline: deadline,
      requirement: requirement,
    };
    console.log(data);
    $http({
      method: "POST",
      url: url + "Job/Post",
      data: data,
    })
      .then(function (response) {
        notificationService.displaySuccess("Tạo thành công");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});

app.controller("DashboardController", function ($scope, $http) {

  // get quantity account
  function getQuantityAccount() {
    $http({
      method: "GET",
      url: url + "Account/QuantityAccount",
    })
      .then(function (response) {
        $scope.quantityAccount = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getQuantityAccount();

  // get quantity job
  function getQuantityJob() {
    $http({
      method: "GET",
      url: url + "Job/CountJob",
    })
      .then(function (response) {
        $scope.quantityJob = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getQuantityJob();

  // get account
  function getAccount() {
    $http({
      method: "GET",
      url: url + "Account/All?pageSize=5&sortDateCreate=false",
    })
      .then(function (response) {
        $scope.accounts = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getAccount();

  // shorten uid
  $scope.shortenUid = function (uid) {
    if (uid.length > 5) {
      return uid.substring(0, 5) + "...";
    } else {
      return uid;
    }
  };

  // get job
  function getJob() {
    $http({
      method: "GET",
      url: url + "Job/GetAll",
    })
      .then(function (response) {
        $scope.jobs = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getJob();

  // get Infor account
  $scope.getAccount = function (id) {
    $http({
      method: "GET",
      url: url + "Seeker/Infor?userId=" + id,
    })
      .then(function (response) {
        $scope.account = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // get infor employer
  $scope.getEmployer = function (id) {
    $http({
      method: "GET",
      url: url + "Employer/Profile?userId=" + id,
    })
      .then(function (response) {
        $scope.employer = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // get job detail
  $scope.getJobDetail = function (id) {
    $http({
      method: "GET",
      url: url + "Job/JobDetail?jobId=" + id,
    })
      .then(function (response) {
        $scope.jobDetail = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

app.controller("TypeAndIndustryController", function ($scope, $http, notificationService) {
  // Fill type
  function getType() {
    $http({
      method: "GET",
      url: url + "Type/Get-all",
    })
      .then(function (response) {
        $scope.types = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getType();

  // Fill industry
  function getIndustry() {
    $http({
      method: "GET",
      url: url + "Industry/Get-all",
    })
      .then(function (response) {
        $scope.industries = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getIndustry();

  // create type
  $scope.createType = function (type_name) {
    $http({
      method: "POST",
      url: url + "Type/Create",
      data: {
        type_name: type_name,
      },
    })
      .then(function () {
        notificationService.displaySuccess("Thêm thành công!");
        getType();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // create type
  $scope.createIndustry = function (industry) {
    $http({
      method: "POST",
      url: url + "Industry/Create",
      data: {
        industry: industry,
      },
    })
      .then(function () {
        notificationService.displaySuccess("Thêm thành công!");
        getIndustry();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //delete type
  $scope.deleteType = function (id) {
    $http({
      method: "DELETE",
      url: url + "Type/Delete?id=" + id,
    })
      .then(function (response) {
        notificationService.displaySuccess("Xóa thành công!");
        getType();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //delete industry
  $scope.deleteIndustry = function (id) {
    $http({
      method: "DELETE",
      url: url + "Industry/Delete?id=" + id,
    })
      .then(function (response) {
        notificationService.displaySuccess("Xóa thành công!");
        getIndustry();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});

app.controller("PostManagementController", function ($scope, $http, EmployerService, notificationService) {
  $scope.employer = EmployerService;

  // get all job
  function GetAllJob() {
    $http({
      method: "GET",
      url: url + "Job/AllJob",
    })
      .then(function (response) {
        $scope.allJobs = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  GetAllJob();

  // get job approved
  function ApprovedJob() {
    $http({
      method: "GET",
      url: url + "Job/JobPostList",
    })
      .then(function (response) {
        $scope.approvedJobs = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  ApprovedJob();

  // get waiting job
  function waitingJob() {
    $http({
      method: "GET",
      url: url + "Job/JobWaitList",
    })
      .then(function (response) {
        $scope.waitingJobs = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  waitingJob();
  $scope.delete = function (id) {
    $http({
      method: 'DELETE',
      url: url + 'Job/Delete?jobId=' + id
    }).then(function (response) {
      notificationService.displaySuccess(response.data);
    }).catch(function (error) {
      console.log(error);
    })

  }
});

app.controller("JobTimeoutController", function ($scope, $http, notificationService) {
  //get job timeout
  function getJobTimeout() {
    $http({
      method: 'GET',
      url: url + 'Job/AllJobTimeout'
    })
      .then(function (response) {
        $scope.jobs = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getJobTimeout();
  // get job detail
  $scope.getJobDetail = function (id) {
    $http({
      method: "GET",
      url: url + "Job/JobDetail?jobId=" + id,
    })
      .then(function (response) {
        $scope.jobDetail = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.deleteJob = function (id) {
    $http({
      method: "DELETE",
      url: url + "Job/Delete?jobId=" + id,
    })
      .then(function (response) {
        notificationService.displaySuccess(response.data);
        getJobTimeout();
      })
      .catch(function (error) {
        notificationService.displayError(error);
      });
  }

});

app.controller("FindAJobsController", function ($scope, $http) {
  // get location
  getLocation($scope);

  //get type
  getType($http, $scope);

  //get industry
  getIndustry($http, $scope);

  //get all job
  GetAllJob($http, $scope, 1, 5);

  //search job
  $scope.searchJobs = function (industry, type, location, salary) {
    var industryId = industry != null ? industry.industry_id : 0;
    var typeId = type != null ? type.type_id : 0;
    var locationName = location != null ? location.name : null;
    var salaryValue = salary != null ? salary : 0;
    $http({
      method: 'POST',
      url: url + 'Job/Search/?pageSize=10',
      data: {
        industry_id: industryId,
        type_id: typeId,
        location: locationName,
        salary: salaryValue
      }
    })
      .then(function (response) {
        $scope.jobs = response.data;
        $scope.totalJob = response.data.length;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //pagination
  $scope.currentPage = 1;
  $scope.totalPage = 100;
  $scope.pageNumber = [];
  $scope.changePage = function (newPage) {
    $scope.currentPage = newPage;
    GetAllJob($http, $scope, $scope.currentPage, 5);
  };
  function updatePageNumber(startPage) {
    var endPage = Math.min(startPage + 4, $scope.totalPage);
    $scope.pageNumber = [];
    for (var i = startPage; i <= endPage; i++) {
      $scope.pageNumber.push(i);
    }
    $scope.showPreviousButton = startPage > 1;
  }

  updatePageNumber(1);
  $scope.nextPage = function () {
    var lastPage = $scope.pageNumber[$scope.pageNumber.length - 1];
    if (lastPage + 5 <= $scope.totalPage) {
      updatePageNumber(lastPage + 1);
    }
  };
  $scope.previousPage = function () {
    var firstPage = $scope.pageNumber[0];
    if (firstPage - 5 > 0) {
      updatePageNumber(firstPage - 5);
    }
  };
});

app.controller('PostAdminController', function ($scope, $http, notificationService) {
  //get post wait
  function getPostWait() {
    $http({
      method: 'GET',
      url: url + 'Job/AllJobWait'
    })
      .then(function (response) {
        $scope.jobs = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getPostWait();

  // update post status
  $scope.updatePostStatus = function (id) {
    $http({
      method: 'PUT',
      url: url + 'Job/Status?jobId=' + id
    })
      .then(function () {
        notificationService.displaySuccess('Đã cập nhật trạng thái');
        getPostWait();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.deleteJob = function (id) {
    $http({
      method: "DELETE",
      url: url + "Job/Delete?jobId=" + id,
    })
      .then(function (response) {
        notificationService.displaySuccess(response.data);
        getPostWait();
      })
      .catch(function (error) {
        notificationService.displayError(error);
      });
  }

});

app.controller('JobAdminController', function ($scope, $http, notificationService) {
  //get post wait
  function getPostJob() {
    $http({
      method: 'GET',
      url: url + 'Job/AllJobPost'
    })
      .then(function (response) {
        $scope.jobs = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getPostJob();
  // get job detail
  $scope.getJobDetail = function (id) {
    $http({
      method: "GET",
      url: url + "Job/JobDetail?jobId=" + id,
    })
      .then(function (response) {
        $scope.jobDetail = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.deleteJob = function (id) {
    $http({
      method: "DELETE",
      url: url + "Job/Delete?jobId=" + id,
    })
      .then(function (response) {
        notificationService.displaySuccess(response.data);
        getPostJob();
      })
      .catch(function (error) {
        notificationService.displayError(error);
      });
  }
});

app.controller('AccountManagementController', function ($scope, $http, notificationService) {
  // get account
  function getAccount() {
    $http({
      method: "GET",
      url: url + "Account/All",
    })
      .then(function (response) {
        $scope.accounts = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getAccount();

  // shorten uid
  $scope.shortenUid = function (uid) {
    if (uid.length > 5) {
      return uid.substring(0, 5) + "...";
    } else {
      return uid;
    }
  };

  // get Infor account
  $scope.getAccount = function (id) {
    $http({
      method: "GET",
      url: url + "Seeker/Infor?userId=" + id,
    })
      .then(function (response) {
        $scope.account = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // get infor employer
  $scope.getEmployer = function (id) {
    $http({
      method: "GET",
      url: url + "Employer/Profile?userId=" + id,
    })
      .then(function (response) {
        $scope.employer = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.deleteAccount = function (id) {
    $http({
      method: "DELETE",
      url: url + "Account/Delete?userId=" + id,
    })
      .then(function () {
        notificationService.displaySuccess("Xóa tài khoản thành công");
        getAccount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});
