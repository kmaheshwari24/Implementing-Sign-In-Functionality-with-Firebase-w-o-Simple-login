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
.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', function($scope, CommonProp, $firebaseArray, $firebaseObject) {

$scope.username = CommonProp.getUser();

var sync = new Firebase("https://blazing-heat-8641.firebaseio.com/Articles/posts");
$scope.articles = $firebaseArray(sync);

$scope.editPost = function(id) {
	var editContent = new Firebase("https://blazing-heat-8641.firebaseio.com/Articles/posts/" + id);
	$scope.postToUpdate = $firebaseObject(editContent);
	$('#editModal').modal(); //trigger the modal pop up
}


}]);