'use strict';

angular.module('myApp.register',['ngRoute'])

//Declare route
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/register', {
		templateUrl: 'register/register.html',
		controller: 'RegisterCtrl'
	});
}])

// Register Controller

.controller('RegisterCtrl', ['$scope', function($scope){
	
}]);
