'use strict';

angular.module('myApp.addpost',['ngRoute', 'firebase'])

//Declare route
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addpost', {
		templateUrl: 'addpost/addpost.html',
		controller: 'AddPostCtrl'
	});
}])

// Register Controller

.controller('AddPostCtrl', ['$scope', 'CommonProp', '$location', function($scope, CommonProp, $location){

		// add post logic will be here

	$scope.AddPost = function(){
		var ref = new Firebase("https://blazing-heat-8641.firebaseio.com/Articles");
		var postRef = ref.child("posts");

		var title = $scope.article.title;
		var post = $scope.article.post;

		postRef.push({
			title: title, 
			post: post,
			emailId: CommonProp.getUser()
		},function(error){
			if (error) {
				 console.log("Data could not be saved.", error);
  			} else {
    			console.log("Data saved successfully.", postRef);
    			$scope.$apply(function() { 
					$location.path("/welcome"); 
				});
    		}
		});

	};
	
}]);
