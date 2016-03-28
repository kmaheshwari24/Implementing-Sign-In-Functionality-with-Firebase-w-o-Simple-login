'use strict';

angular.module('myApp.register',['ngRoute', 'firebase'])

//Declare route
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/register', {
		templateUrl: 'register/register.html',
		controller: 'RegisterCtrl'
	});
}])

// Register Controller

.controller('RegisterCtrl', ['$scope', '$location', function($scope, $location){
		
	$scope.signUp = function(event){
		event.preventDefault();
		if(!$scope.regForm.$invalid){
			console.log("Valid for submission");
		}

		var username = $scope.user.email;
 		var password = $scope.user.password;	

		var ref = new Firebase("https://blazing-heat-8641.firebaseio.com");
		ref.createUser({
  			email    : username,
            password : password
			}, function(error, userData) {
  				if (error) {
    				console.log("Error creating user:", error);
    				$scope.regError = true;
    				$scope.regErrorMessage = error.message;
  				} else {
    				console.log("Successfully created user account with uid:", userData.uid);
    				$location.path('/home');
  			}
		});

	};


}]);
