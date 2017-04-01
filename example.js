angular.module("xyz")
  .controller("userPage", userCtrl)

  userCtrl.$inject = ['$http', '$scope']

  function userCtrl = function($scope) {
    $scope.getUser = function getMusician(userId) {
      return $http({
        method: 'GET',
        url: 'api/me' + (userID ? '/' + userID : '')
      })
    }
  }


  $scope.save = function (user) {
    $http({
      url: 'api/me' + user._id
      method: 'PUT',
      data: user
    })
  }

// emergency: [
//   {
//     name: String,
//     phone: String,
//     relation: String
//   }s
// ]
