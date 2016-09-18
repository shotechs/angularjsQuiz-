'use strict';

angular.module('QuizApp.home', ['ngRoute'])



.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.directive('myRepeatDirective', function() {
  return function(scope, element, attrs) {
    angular.element('<script>$(":checkbox").checkboxpicker();</script>').appendTo(element);
  }
})



.controller('homeCtrl', [function() {



}]);