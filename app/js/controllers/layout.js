var homeControllerModule = angular.module('homeControllerModule', []);

homeControllerModule.controller('homeController', ['$scope', '$http', 'apiService', function($scope, $http, apiService) {


  $scope.submitNewPost = function() {
    $scope.posts.push($scope.newPost);
  }

}]);
