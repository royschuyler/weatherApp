angular.module('won.weather', [])

  .controller('WeatherCtrl', function (weather, $scope, $stateParams, $ionicLoading) {

    $scope.city = $stateParams.city;

    $ionicLoading.show({
      template: '<img src="http://i.imgur.com/EeE1Lsp.gif"><h1>Loading...</h1>'
    });

    weather
      .getWeather($stateParams.lat, $stateParams.long)
      .success(function (data) {
        setTimeout(function () {
          $scope.current = data.currently;
          $ionicLoading.hide();
        }, 2000);
      });
  })

  .factory('weather', function ($http) {
    return {
      getWeather: function (lat, long) {
        return $http
          .get('/api/forecast/' + lat + ',' + long)
      }
    };
  });
