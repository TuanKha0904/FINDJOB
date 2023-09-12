app.service('SignupService', function() {
  var service = this;
  
  service.signup = true;
  service.employerSignup = false;
  service.seekerSignup = false;
  
  service.showEmployerSignup = function() {
    service.signup = false;
    service.employerSignup = true;
    service.seekerSignup = false;
  };
  
  service.showSeekerSignup = function() {
    service.signup = false;
    service.employerSignup = false;
    service.seekerSignup = true;
  };
  
  service.showSignup = function() {
    service.signup = true;
    service.employerSignup = false;
    service.seekerSignup = false;
  };
});
