'use strict';

angular.module('myApp', [
  'ngRoute', 'myApp.home', 'myApp.register'
]).
config(['$routeProvider', function($routeProvider) {
  // routes will be here

  // set default view of our app to home

  $routeProvider.otherwise({
  	redirctTo: '/home'
  });

}]);

