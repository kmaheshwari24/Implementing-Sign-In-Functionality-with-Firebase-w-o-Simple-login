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
.controller('HomeCtrl', ['$scope', '$location', 'CommonProp', function($scope, $location, CommonProp) {

$scope.SignIn = function() {
 	
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
			CommonProp.setUser(username)
			$scope.$apply(function() { 
				$location.path("/welcome"); 
			});
		}
	});

};

// Set value of user as email id




}])

// Service to access common data

.service('CommonProp', function(){
	var user = " ";

	return {
		getUser: function(){
			return user;
		},
		setUser: function(value){
			user = value;
		}	

	};

});

