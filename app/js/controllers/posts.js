var postsControllerModule = angular.module('postsControllerModule', []);

postsControllerModule.controller('postsController', ['$scope', '$http', function($scope, $http) {
  $scope.name = 'posts controller';
}]);

postsControllerModule.controller('newPostController', ['$scope', '$http', function($scope, $http) {
  $scope.newName = 'new posts controller';
}]);

postsControllerModule.controller('postController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  $scope.postName = "hi this is the show view";
  $scope.id = $stateParams.id;
}]);
