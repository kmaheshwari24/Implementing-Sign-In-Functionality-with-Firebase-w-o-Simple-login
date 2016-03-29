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


	var login = {};
	$scope.login = login;
 	login.loading = true;
 	
 	var username = $scope.user.email;
 	var password = $scope.user.password;
 	var ref = new Firebase("https://blazing-heat-8641.firebaseio.com");
 	
 	ref.authWithPassword({
		email: username,
		password: password
	},function(error,authData){
		if (error) {
			console.log("Login Failed!",error);
			login.loading = false;
		} else {
			console.log("Authenticated Successfully with Payload", authData);
			login.loading = false;
			CommonProp.setUser(username)
			$scope.$apply(function() { 
				$location.path("/welcome"); 
			});
		}
	});

};


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

})

// Defining Ladda Login 

.directive('laddaLoading', [
	function(){
		return {
			link: function(scope, element, attrs){
				var Ladda = window.Ladda;
				var ladda = Ladda.create(element[0]);
				// Watching login.loading for change
				scope.$watch(attrs.laddaLoading, function(newVal, oldVal){
					// based on the value start and stop the indicator
					if (newVal) {
						ladda.start();
					} else {
						ladda.stop();
					}
				});
			}
		};

	}
]);







