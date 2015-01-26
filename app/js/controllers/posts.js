var postsControllerModule = angular.module('postsControllerModule', []);

postsControllerModule.controller('postsController', ['$scope', '$http', 'apiService', 'postService', function($scope, $http, apiService, postService) {

  $scope.posts = [];
  apiService.get('/posts').success(function(data) {
    $scope.posts = data;
  });

  $scope.allPosts = postService.allPosts();
  console.log($scope.allPosts);
  
  $scope.tags = [];

  apiService.get('/tags').success(function(data) {
    $scope.tags = data;
  });

  $scope.filterTags = [];

  $scope.getTagName = function(id) {
    for (i=0; i<$scope.tags.length; i++) {
      if(id == $scope.tags[i].id) {
        return $scope.tags[i].name;
      }
    }
  };

  $scope.addTag = function(id) {
    i = $scope.filterTags.indexOf(id);
    if(i == -1) {
      $scope.filterTags.push(id);
    } else {
      $scope.filterTags.splice(i, 1);
    }
  };
}]);

postsControllerModule.controller('newPostController', ['$scope', '$http', 'apiService', 'postService', function($scope, $http, apiService, postService) {

  $scope.tags = [];
  $scope.newPost = {};
  $scope.newPost.tag_ids = [];
  $scope.test = postService.test();

  apiService.get('/tags').success(function(data) {
    $scope.tags = data;
  });

  $scope.submitNewPost = function() {
    $scope.posts = [];
    apiService.postPost($scope.newPost);
  };

  $scope.toggleId = function(id) {
    i = $scope.newPost.tag_ids.indexOf(id);
    if(i == -1) {
      $scope.newPost.tag_ids.push(id);
    } else {
      $scope.newPost.tag_ids.splice(i, 1);
    }
  };
}]);

postsControllerModule.controller('postController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
  $scope.postName = "hi this is the show view";
  $scope.id = $stateParams.id;
}]);

postsControllerModule.filter('selectedTags', function() {
  return function(posts, filterTags) {
    return posts.filter(function(post) {
      if(filterTags.length === 0) {
        return true;
      } else {
        for(var i=0; i<filterTags.length; i++) {
          if(post.tag_ids.indexOf(filterTags[i]) === -1) {
            return false;
          }
        }
      }
      return true;
    });
  };
});
