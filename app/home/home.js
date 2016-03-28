'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

// Home controller
.controller('HomeCtrl', ['$scope', function($scope) {

$scope.SignIn = function(event) {
 	event.preventDefault();
 	var username = $scope.user.email;
 	var password = $scope.user.password;
 	var ref = new Firebase("https://blazing-heat-8641.firebaseio.com");

 	ref.authWithPassword({
		email: username,
		password: password
	},function(error,authData){
		if (error) {
			console.log("Login Failed!",error);
		} else {
			console.log("Authenticated Successfully with Payload", authData);
		}
	});

}
	// Register the callback to be fired every time auth state changes

}]);