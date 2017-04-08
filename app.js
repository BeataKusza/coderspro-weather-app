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

weatherApp.controller('homeController', ['$scope', function ($scope) {
  console.log('Home controller');
}]);

weatherApp.controller('forecastController', ['$scope', function($scope) {
  console.log('Forecast controller');
}]);
