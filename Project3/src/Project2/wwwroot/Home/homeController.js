(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', ['$scope', 'userGithubService', homeController]);

    homeController.$inject = ['$scope'];

    function homeController($scope, userGithubService) {
        $scope.title = 'homeController';
        $scope.searchType = 'repo';
        $scope.searchText = '';
        $scope.test = function () {
            if ($scope.searchType == 'repo') {
                toastr.warning($scope.searchText + ' yay!!');
                userGithubService.getUser($scope.searchText);
            }
            else if ($scope.searchType == 'user') {
                toastr.warning(scope.searchText + ' yay!!');
            }
            else {
                toastr.warning('oops');
            }
        }

        activate();

        function activate() { }

        
    }
})();