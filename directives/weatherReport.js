//DIRECTIVES
angular.module('weatherApp').directive('weatherReport', function () {
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
