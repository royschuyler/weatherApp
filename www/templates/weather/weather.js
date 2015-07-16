angular.module('won.weather', [])

  .controller('WeatherCtrl', function (weather, settings, $scope, $stateParams, $ionicLoading) {

    $scope.city = $stateParams.city;
    $scope.scale = settings.scale;
    $scope.precision = settings.precision;

    // $ionicLoading.show({
    //   template: '<img src="/img/loading.gif"><h1>Loading...</h1>'
    // });

    weather
      .getWeather($stateParams.lat, $stateParams.long)
      .success(function (data) {
        setTimeout(function () {
          $scope.current = data.currently;
          $ionicLoading.hide();
        }, 2000);
      });
  })

  .factory('weather', function (settings, $http) {
    var API_URL = '/api/forecast/';

    return {
      getWeather: function (lat, long) {
        var url = API_URL + lat + ',' + long + '?units=';

        if (settings.scale === 'C') {
          url += 'si';
        } else {
          url += 'us';
        }

        return $http.get(url);
      }
    };
  });
