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

.controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth){
	

	var firebaseObj = new Firebase("https://blazing-heat-8641.firebaseio.com");
	var auth = $firebaseAuth(firebaseObj);

	$scope.signUp = function(){

	var login={};
	$scope.login=login;
	login.loading = true;
		
		if(!$scope.regForm.$invalid){

		var email = $scope.user.email;
 		var password = $scope.user.password;	

			if (email && password) {
				auth.$createUser({email, password})
					.then(function() {
  						console.log("Successfully created user account");
  						login.loading  = false;
    					$location.path('/home');
    				}, function(error){
    					console.log("Error creating user:", error);
    					$scope.regError = true;
    					$scope.regErrorMessage = error.message;
    					login.loading  = false;
  					});		
  			}
  		}

	};

}]);


