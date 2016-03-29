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
		
		var publish={};
		$scope.publish=publish;
		publish.loading = true;

		var ref = new Firebase("https://blazing-heat-8641.firebaseio.com/Articles");
		var postRef = ref.child("posts");

		var title = $scope.article.title;
		var post = $scope.article.post;
		var user = CommonProp.getUser();
		//console.log(user);

		postRef.push({
			title: title, 
			post: post,
			emailId: user,
			'.priority': user
		},function(error){
			if (error) {
				 console.log("Data could not be saved.", error);
				 publish.loading = false;
  			} else {
    			console.log("Data saved successfully.", postRef);
    			publish.loading = false;
    			$scope.$apply(function() { 
					$location.path("/welcome"); 
				});
    		}
		});
	};
	
}]);
