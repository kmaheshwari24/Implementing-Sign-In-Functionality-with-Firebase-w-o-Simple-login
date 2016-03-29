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
//$scope.articles = $firebaseArray(sync.startAt($scope.username).endAt($scope.username));
$scope.articles = $firebaseArray(sync.startAt($scope.username).endAt($scope.username));


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

// ConfirmDelete function to caputure the Post ID to delete and open the delete modal
	$scope.confirmDelete = function(id){
	var deleteContent = new Firebase("https://blazing-heat-8641.firebaseio.com/Articles/posts/" + id);
	$scope.postToDelete = $firebaseObject(deleteContent);
	$("#deleteModal").modal(); //triggers the modal pop up
};

$scope.deletePost = function() {
	var fdelete = new Firebase("https://blazing-heat-8641.firebaseio.com/Articles/posts/" + $scope.postToDelete.$id);
	
	var onComplete = function(error) {
  		if (error) {
    		console.log('Synchronization failed');
  		} else {
    		$('#deleteModal').modal('hide');
    	//	console.log('Synchronization succeeded');
  		}
	};

	fdelete.remove(onComplete);

};


}]);