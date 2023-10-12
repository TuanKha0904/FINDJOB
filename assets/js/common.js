  // get location
async function getLocation($scope) {
    var requestOptions = {
      method: "GET",
    };
    await fetch(
      "https://provinces.open-api.vn/api/?depth=1",
      requestOptions
    ).then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      response
        .json()
        .then(function (result) {
          $scope.locations = result; // Gán dữ liệu JSON vào $scope.locations
        })
        .catch(function (error) {
          console.log("Fetch error:", error);
        }); // Chuyển đổi phản hồi sang JSON
    });
  };

  // get type
  function getType($http, $scope) {
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
  };

  // get industry
  function getIndustry($http, $scope) {
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

  // get all job
  function GetAllJob($http, $scope) {
    $http({
      method: "GET",
      url: url + "Job/FindAJob",
    })
      .then(function (response) {
        $scope.jobs = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

var searchAccount = "";
var searchJob = "";
var searchPost = "";
var searchType = "";
var searchIndustry = "";


