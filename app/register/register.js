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
		
		if(!$scope.regForm.$invalid){

		var email = $scope.user.email;
 		var password = $scope.user.password;	

		//	if (email && password) {
				auth.$createUser({email, password})
					.then(function() {
  						console.log("Successfully created user account");
    					$location.path('/home');
    				}, function(error){
    					console.log("Error creating user:", error);
    					$scope.regError = true;
    					$scope.regErrorMessage = error.message;
  					});		
  		//	}
  		}

	};

}]);
