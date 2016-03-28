'use strict';

angular.module('myApp.addpost',['ngRoute'])

//Declare route
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addpost', {
		templateUrl: 'addpost/addpost.html',
		controller: 'AddPostCtrl'
	});
}])

// Register Controller

.controller('AddPostCtrl', ['$scope', function($scope){
	
}]);
