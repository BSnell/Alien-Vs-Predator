(function () {
    'use strict';

    angular
        .module('app')
        .controller('repoController', function ($scope, $http, $q, $stateParams, repoGithubService) {
            $scope.title = 'repoSearchController';
            $scope.owner = $stateParams.owner;
            $scope.repo = $stateParams.repo;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.maxSize = 5;            

            repoGithubService.getSingleRepo($scope.owner, $scope.repo).then(function (data) {
                $scope.data = data;
            });
            repoGithubService.getCommits($scope.owner, $scope.repo).then(function (data) {
                $scope.commits = data;
            });
            repoGithubService.getIssues($scope.owner, $scope.repo).then(function (data) {
                $scope.issues = data;
                });
            });
})();
