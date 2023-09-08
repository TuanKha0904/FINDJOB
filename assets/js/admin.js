function togglePasswordVisibility() {
  var passwordField = document.getElementById("password-field");
  var eyeIcon = document.querySelector(".click-eye");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  }
};
// Lắng nghe sự kiện click trên biểu tượng mắt và gọi hàm togglePasswordVisibility()
document.querySelector(".click-eye").addEventListener("click", togglePasswordVisibility);



