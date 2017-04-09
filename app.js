'use strict';
// http://api.openweathermap.org/data/2.5/forecast/daily?q=Gdansk&cnt=2&appid=b1caa2dca3aa00378b971211de73bdbf
var weatherApp = angular.module('weatherApp', [
  'ngRoute',
  'ngResource'
]);

// CONFIG
weatherApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'homeController'
    })
    .when('/forecast', {
      templateUrl: '/views/forecast.html',
      controller: 'forecastController'
    })
    .when('/forecast/:days', {
      templateUrl: '/views/forecast.html',
      controller: 'forecastController'
    })
}]);

// SERVICE
weatherApp.service('cityService', function () {
  this.city = 'Gdansk';
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService',
  function ($scope, cityService) {
    $scope.city = cityService.city;

    $scope.$watch('city', function () {
      cityService.city = $scope.city;
    })
  }]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams','cityService',
  function ($scope, $resource, $routeParams, cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;

    var weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily');
    $scope.weatherResult = weatherApi.get({
      q: 'Gdansk',
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

// DIRECTIVES
weatherApp.directive('weatherReport', function () {
  return {
    restrict: 'E',
    templateUrl: 'directives/weatherReport.html',
    replace: true,
    scope: {
      // '<' - one-way data binding
      // '=' - two-way data binding
      // '&' - function/expression
      // '@' - one-way
      weatherDay: '<',
      formatedDate: '&',
      convertToCelsius: '&',
      dateFormat: '<'
    }
  }
});
