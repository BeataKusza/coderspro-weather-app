'use strict';
//http://api.openweathermap.org/data/2.5/forecast/daily?q=Gdansk&cnt=2&appid=9a5c0929cb85bfcc967a51c492de4b5b
var weatherApp = angular.module('weatherApp', [
  'ngRoute',
  'ngResource'
]);
//CONFIG
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
}]);
// SERVICE
weatherApp.service('cityService', function () {
  this.city = 'Gdansk';
});
 //CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService',
function ($scope, cityService) {
  $scope.city = cityService.city;

  $scope.$watch('city', function () {
    cityService = $scope.city;
  })
}]);

weatherApp.controller('forecastController', ['$scope','$resource', 'cityService',
  function ($scope, $resource, cityService) {
    var weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily');
    $scope.weatherResult = weatherApi.get({
      q: 'Gdansk',
      cnt: 2,
      appid: '9a5c0929cb85bfcc967a51c492de4b5b'
    }).$promise.then(function (data) {
      console.log(data);
    });

    $scope.city = cityService.city;
}]);
