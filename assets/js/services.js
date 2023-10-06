app.service('HistoryService', function() {
  var service = this;
  
  service.job = false;
  service.showInforJob = function () {
      service.job = !service.job;
  }

});

app.service('ApplyService', function() {
  var service = this;
  
  service.apply = false;  
  service.showApply = function() {
    service.apply = !service.apply;
  };
});


app.service('ProfileService', function() {
  var service = this;
  
  service.Profile = true;
  service.ChangePassword = false;
  service.EditProfile = false;
  service.showProfileView = function () {
      service.Profile = true;
      service.ChangePassword = false;
      service.EditProfile = false;
  };
  service.changePassword = function () {
      service.Profile = false;
      service.ChangePassword = true;
      service.EditProfile = false;
  };

  service.showEditProfile = function () {
      service.Profile = false;
      service.ChangePassword = false;
      service.EditProfile = true;
  };
});

app.service('EmployerService', function() {
  var service = this;
  
  service.editProfile = false;  
  service.showEditProfile = function() {
    service.editProfile = !service.editProfile;
  };
  service.AllPosts = true;
  service.ApprovedPost = false;
  service.WaitingPost = false;
  service.editJob = false;
  service.inforEmployer = true;
  service.inforSeekerApply = false;
  service.ShowAllPosts = function () {
      service.AllPosts = true;
      service.ApprovedPost = false;
      service.WaitingPost = false;
  };
  service.ShowApprovedPost = function () {
      service.AllPosts = false;
      service.ApprovedPost = true;
      service.WaitingPost = false;
  };
  service.ShowWaitingPost = function () {
      service.AllPosts = false;
      service.ApprovedPost = false;
      service.WaitingPost = true;
  };
  service.ShowEditJob = function () {
      service.editJob = !service.editJob;
  };
  service.showInforSeekerApply = function () {
      service.inforSeekerApply = true;
      service.inforEmployer = false;
  };
  service.unshowInforSeekerApply = function () {
      service.inforSeekerApply = false;
      service.inforEmployer = true;
  };

});

app.service('HeaderService', function() {
  var service = this;
  service.employer = false;
  service.isUserLoggedIn = false;
  service.showEmployer = function(){
      service.employer = !service.employer;
  }
});

app.service('AdminService', function() {
  var service = this;
  service.showProfile = false;
  service.showPostJob = false;
  service.showSeeker = true;
  service.showEmployer = false;
  service.dashboard = true;
  service.account = false;
  service.job = false;
  service.post = false;
  service.type_industry = false;
  service.InforProfile = function () {
      service.showProfile = !service.showProfile;
  };
  service.InforPostJob = function () {
      service.showPostJob = !service.showPostJob;
  };
  service.showProfileSeeker = function () {
      service.showSeeker = true;
      service.showEmployer = false;
  };
  service.showProfileEmployer = function () {
      service.showEmployer = true;
      service.showSeeker = false;
  };
// show component page
  service.showDashboard = function(){
      service.dashboard = true;
      service.account = false;
      service.job = false;
      service.post = false;
      service.type_industry = false;
  };
  service.showAccount = function(){
      service.dashboard = false;
      service.account = true;
      service.job = false;
      service.post = false;
      service.type_industry = false;
  };
  service.showJob = function(){
      service.dashboard = false;
      service.account = false;
      service.job = true;
      service.post = false;
      service.type_industry = false;
  };
  service.showPost = function(){
      service.dashboard = false;
      service.account = false;
      service.job = false;
      service.post = true;
      service.type_industry = false;
  };
  service.showTypeIndustry = function(){
      service.dashboard = false;
      service.account = false;
      service.job = false;
      service.post = false;
      service.type_industry = true;

  }
});

app.service('UserService', function () {
  var user = {};

 // Trong UserService
this.setUser = function (uid, name, email, photo, phoneNumber) {
  user.Uid = uid;
  user.Name = name;
  user.Email = email;
  
  // Kiểm tra nếu user.Photo là null, gán đường dẫn ảnh mặc định
  if (photo == null) {
    user.Photo = 'https://i.ibb.co/LQNHSjF/24-248253-user-profile-default-image-png-clipart-png-download.png';
  } else {
    user.Photo = photo;
  }
  user.PhoneNumber = phoneNumber;
};
  this.getUser = function () {
      return user;
  };

  this.logout = function () {
      user = {};
  }
});

app.service('authService', function () {
  var token = null;

  //set Token
  this.setToken = function (newToken) {
    token = newToken;
  };

  //get Token
  this.getToken = function () {
    return token;
  };
});





