'use strict';

var weatherApp = angular.module('weatherApp', ['ngRoute']);

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

weatherApp.service('cityService', function () {
  this.city = 'Gdansk';
});

weatherApp.controller('homeController', ['$scope', 'cityService',
function ($scope, cityService) {
  $scope.city = cityService.city;

  $scope.$watch('city', function () {
    cityService = $scope.city;
  })
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService',
function($scope, cityService) {
  $scope.city = cityService.city;
}]);
