'use strict';

angular.module('myApp.welcome', ['ngRoute'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

// Home controller
.controller('WelcomeCtrl', ['$scope', 'CommonProp', function($scope, CommonProp) {

$scope.username = CommonProp.getUser();

}]);