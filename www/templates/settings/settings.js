angular.module('won.settings', [])

  .controller('SettingsCtrl', function (settings, $scope, $ionicLoading) {
    $scope.scale = settings.scale;
    $scope.precision = settings.precision;

    $scope.scales = [
     {symbol: 'F', name: 'Fahrenheit'},
     {symbol: 'C', name: 'Celcuis'},
     {symbol: 'K', name: 'Kelvin'},
     {symbol: 'Ra', name: 'Rankine'},
     {symbol: 'D', name: 'Delisle'},
     {symbol: 'N', name: 'Newton'},
     {symbol: 'Ré', name: 'Réaumur'},
     {symbol: 'Rø', name: 'Rømer'},
     {symbol: 'X', name: 'Random'}
    ];

    $scope.$watch('precision', function () {
      settings.precision = $scope.precision;
    });

    $scope.$watch('scale', function () {
      if ($scope.scale === 'X') {
        $ionicLoading.show({
          // template: '<img src="img/whatshappening.gif">',
          // duration: 5000
        });
      }

      settings.scale = $scope.scale;
    });

  })

  .factory('settings', function () {
    return {
      get scale() {
        return localStorage.getItem('scale') || 'K';
      },
      get precision() {
        return localStorage.getItem('precision') || '2';
      },
      set scale(s) {
        localStorage.setItem('scale', s);
      },
      set precision(p) {
        localStorage.setItem('precision', p);
      }
    };
  })

  .factory('location', function () {
    var defaultFavorites = [{
        city: 'Cupertino, CA',
        lat: '37.3190',
        long: '-122.0293'
      },{
        city: 'Mountain View, CA',
        lat: '37.3897',
        long: '-122.0816'
      },{
        city: 'Redmond, WA',
        lat: '47.6786',
        long: '-122.1310'
      },{
        city: 'Nashville, TN',
        lat: '36.1658',
        long: '-86.7777'
      }];

    if (!localStorage.favorites) {
      localStorage.favorites = JSON.stringify(defaultFavorites);
    }

    return {
      get favorites() {
        var json = localStorage.getItem('favorites');
        return JSON.parse(json);
      },
      set favorites(f) {
        var json = JSON.stringify(f);
        localStorage.setItem('favorites', json);
      },
      addFavorite: function (f) {
        this.favorites = this.favorites.concat(f);
      },
      removeFavorite: function (cityName) {
        this.favorites = this.favorites.filter(function (fav) {
          return fav.city !== cityName;
        });
      }
    };
  });
