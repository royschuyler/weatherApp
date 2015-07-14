angular.module('won.search', [])
  .controller('SearchCtrl', function ($scope, $http) {

    $scope.queryChanged = _.debounce(function () {
      $http
        .get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: { address: $scope.query }
        })
        .success(function (data) {
          console.log(data.results);
          $scope.location = data.results;
        });
    }, 2000);
  });
