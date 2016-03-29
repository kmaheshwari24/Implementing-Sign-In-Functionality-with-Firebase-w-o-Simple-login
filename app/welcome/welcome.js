'use strict';

angular.module('myApp.welcome', ['ngRoute', 'firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

// Home controller
.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', function($scope, CommonProp, $firebaseArray) {

$scope.username = CommonProp.getUser();

var sync = new Firebase("https://blazing-heat-8641.firebaseio.com/Articles/posts");
$scope.articles = $firebaseArray(sync);


}]);