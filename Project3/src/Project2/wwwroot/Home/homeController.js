(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', function ($scope, userGithubService, repoGithubService) {
            $scope.title = 'homeController';
            $scope.searchType = 'repo';
            $scope.searchText = '';
            $scope.test = function () {
                if ($scope.searchType == 'repo') {
                    toastr.warning($scope.searchText + ' yay!! repo');

                    repoGithubService.getRepo($scope.searchText);
                }
                else if ($scope.searchType == 'user') {
                    toastr.warning(scope.searchText + ' yay!! user');
                    userGithubService.getUser($scope.searchText);
                }
                else {
                    toastr.warning('oops');
                }
            }

            activate();

            function activate() { }
        });    
})();