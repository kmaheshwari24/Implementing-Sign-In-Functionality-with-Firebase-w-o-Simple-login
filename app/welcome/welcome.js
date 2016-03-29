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

// Passing title and post to the edit modal for editing a post

$scope.editPost = function(id) {
	var editContent = new Firebase("https://blazing-heat-8641.firebaseio.com/Articles/posts/" + id);
	$scope.postToUpdate = $firebaseObject(editContent);
	$('#editModal').modal(); //trigger the modal pop up
};

// Update function to reset data in firebase

$scope.update = function(){

	//console.log($scope.postToUpdate.$id);
	var fb = new Firebase("https://blazing-heat-8641.firebaseio.com/Articles/posts");
	var UpdatedPost = fb.child($scope.postToUpdate.$id);
	UpdatedPost.update({
		title: $scope.postToUpdate.title,
		post: $scope.postToUpdate.post,
		emailId: $scope.postToUpdate.emailId},
		function(error){
			if (error) {
				console.log("Error: ",error);
			} else {
				$('#editModal').modal('hide');
				//console.log("Update Successful");
			}
		});
};


}]);