(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', function ($scope, userGithubService, repoGithubService) {
            $scope.title = 'homeController';
            $scope.searchType = 'repo';
            $scope.searchText = '';
            $scope.data = '';
            $scope.pageNumber = 1;
            $scope.searchPerformed = false;
            $scope.searchedFor = '';
            $scope.initialSearch = function () {
                $scope.pageNumber = 1;
                $scope.searchPerformed = true;
                $scope.search();
            }
            $scope.search = function () {
                if ($scope.searchType == 'repo') {
                    $scope.searchedFor = 'repo';
                    repoGithubService.getRepo($scope.searchText, $scope.pageNumber).then(function (data) {
                        $scope.data = data;
                    });
                }
                else if ($scope.searchType == 'user') {
                    $scope.searchedFor = 'user';
                    userGithubService.getUser($scope.searchText, $scope.pageNumber).then(function (data) {
                        $scope.data = data;
                    });
                }
                else {
                    toastr.warning('oops');
                }
            }
            $scope.nextPage = function () {
                $scope.pageNumber++;
                $scope.search();
            }
            $scope.prevPage = function () {
                if ($scope.pageNumber != 1) {
                    $scope.pageNumber--;
                    $scope.search();
                }
            }
        });   
})();