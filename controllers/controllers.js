//CONTROLLERS
angular.module('weatherApp').controller('homeController', ['$scope', 'cityService',
  function ($scope, cityService) {
    $scope.city = cityService.city;

    $scope.$watch('city', function () {
      cityService.city = $scope.city;
    })
  }]);

angular.module('weatherApp').controller('forecastController', ['$scope', '$resource', '$routeParams','cityService',
  function ($scope, $resource, $routeParams, cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;

    var weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily');
    $scope.weatherResult = weatherApi.get({
      q: $scope.city,
      cnt: $scope.days,
      appid: 'b1caa2dca3aa00378b971211de73bdbf'
    }, function (res) {
      return res;
    });

    $scope.formatedDate = function (date) {
      return new Date(date * 1000);
    };

    $scope.convertToCelsius = function (temperatureINKelvins) {
      var tempCelcius = temperatureINKelvins - 273.15;
      return tempCelcius.toFixed(1);
    };
  }]);
