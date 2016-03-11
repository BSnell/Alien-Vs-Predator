(function () {
    'use strict';

    angular
        .module('app')
        .controller('repoSearchController', function ($scope) {
            $scope.title = 'repoSearchController';

            $scope.activate = function activate() {
                toastr.warning('hi');
            };
        });    
})();
