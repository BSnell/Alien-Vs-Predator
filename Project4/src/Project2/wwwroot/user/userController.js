(function () {
    'use strict';

    angular
        .module('app')
        .controller('userController', function ($scope, $http, $q, $stateParams, userGithubService) {
            $scope.title = 'userController';
            $scope.user = $stateParams.user;

            userGithubService.getSingleUser($scope.user).then(function (data) {
                $scope.data = data;
            });
            userGithubService.getUserRepos($scope.user).then(function (data) {
                $scope.repos = data;
            });
            userGithubService.getUserFollowers($scope.user).then(function (data) {
                $scope.followers = data;
            });
        });
})();
