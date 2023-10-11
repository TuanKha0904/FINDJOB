// const url = 'http://www.findjobapi.somee.com/api/';
const url = "https://findjob.zeabur.app/api/";

app.controller("HomeController", function () { });

app.controller(
  "ProfileController",
  function ($scope, $http, $sce, ProfileService, UserService) {
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
                    alert(error.message);
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
          alert(response.data);
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
            alert(response.data);
            getInfor();
          })
          .catch(function (error) {
            console.log(error);
          });
      else alert("Passwords do not match");
    };
  }
);

app.controller(
  "LoginAdminController",
  function ($scope, $http, $location, $rootScope) {
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
          if ($scope.adminLogin.idToken == null)
            alert("Sai tài khoản hoặc mật khẩu");
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
          console.log(error);
        });
    };
  }
);

app.controller("AdminController", function ($scope, AdminService, $rootScope) {
  $scope.admin = AdminService;
  $scope.Infor = $rootScope.adminInfor;
});

app.controller("EmployerController", function ($scope, EmployerService) {
  $scope.employer = EmployerService;
});

app.controller(
  "SigninController",
  function ($scope, $http, $window, UserService, HeaderService, authService) {
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
              if (user == null) alert("Login failed");
              else {
                UserService.setUser(
                  user.uid,
                  user.name,
                  user.email,
                  user.photo,
                  user.phoneNumber
                );
                $scope.header.isUserLoggedIn = true;
                alert("Login success");
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
        method: "POST",
        url: url + "Account/Login",
        params: {
          email: email,
          password: password,
        },
      })
        .then(function (response) {
          $scope.result = response.data;
          if ($scope.result.idToken == null) alert("Wrong email or password");
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
              if (user == null) alert("Login failed");
              else {
                UserService.setUser(
                  user.uid,
                  user.name,
                  user.email,
                  user.photo,
                  user.phoneNumber
                );
                $scope.header.isUserLoggedIn = true;
                alert("Login success");
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
  }
);

app.controller(
  "HeaderController",
  function ($scope, UserService, $location, HeaderService) {
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

app.controller("JobDetailController", function ($scope, ApplyService, $http) {
  $scope.apply = ApplyService;

  $scope.applyjob = function postRecruitmentNoAccount(
    name,
    email,
    phone,
    birthday,
    address,
    major,
    experience,
    education,
    skills
  ) {
    $http({
      method: "POST",
      url: url + "RecruitmentNoAccount/Post",
      data: {
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
        $scope.recruitmentNoAccount = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});

app.controller(
  "HistoryController",
  function ($scope, HistoryService, ApplyService) {
    $scope.history = HistoryService;
    $scope.apply = ApplyService;
  }
);

app.controller(
  "ProfileEmployerController",
  function ($scope, $http, $sce, EmployerService) {
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
          alert(response.data);
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
                    alert(response.data);
                    getInfor();
                  })
                  .catch(function (error) {
                    alert(error.message);
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
                    alert(response.data);
                    getInfor();
                  })
                  .catch(function (error) {
                    alert(error.message);
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

app.controller("PostController", function ($scope, $http) {
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
        alert("Tạo thành công");
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
      url: url + "Account/All?pageSize=20&sortDateCreate=false",
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

app.controller("TypeAndIndustryController", function ($scope, $http) {
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
        getIndustry();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});

app.controller("PostManagementController",function ($scope, $http, EmployerService) {
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
  }
);

app.controller("FindAJobsController", function ($scope, $http) {
  // get location
  getLocation($scope);

  //get type
  getType($http, $scope);

  //get industry
  getIndustry($http, $scope);
});

app.controller('PostAdminController', function($scope, $http){
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
  $scope.updatePostStatus = function(id){
      $http({
          method: 'PUT',
          url: url + 'Job/Status?jobId=' + id
      })
          .then(function () {
              alert('Đã cập nhật trạng thái');
              getPostWait();
          })
          .catch(function (error) {
              console.log(error);
          });
  };
});

app.controller('JobAdminController', function($scope, $http){
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
});

app.controller('AccountManagementController', function($scope, $http){
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
        alert("Xóa tài khoản thành công");
        getAccount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});
