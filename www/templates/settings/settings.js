angular.module('won.settings', [])

  .controller('SettingsCtrl', function (settings, $scope, $ionicLoading) {
    $scope.scale = settings.getScale();
    $scope.precision = settings.getPrecision();

    $scope.$watch('precision', function () {
      settings.setPrecision($scope.precision);
    });

    $scope.$watch('scale', function () {
      if ($scope.scale === 'X') {
        $ionicLoading.show({
          template: '<img src="img/whatshappening.gif">',
          duration: 5000
        });
      }

      settings.setScale($scope.scale);
    });

  })

  .factory('settings', function () {
    return {
      getScale: function () {
        return localStorage.getItem('scale') || 'K';
      },
      getPrecision: function () {
        return localStorage.getItem('precision') || '2';
      },
      setScale: function (s) {
        localStorage.setItem('scale', s);
      },
      setPrecision: function (p) {
        localStorage.setItem('precision', p);
      }
    };
  });
