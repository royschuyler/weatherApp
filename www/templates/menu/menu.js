angular.module('won.menu', [])
  .controller('MenuCtrl', function (location, $scope) {
    $scope.favorites = location.favorites;
  });
