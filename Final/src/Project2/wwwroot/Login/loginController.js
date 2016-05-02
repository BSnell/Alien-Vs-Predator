(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', function ($rootScope, $scope, apiService) {
            $scope.title = 'loginController';
            $scope.username = '';
            $scope.password = '';
            $scope.attemptLogin = function () {
                var user = {
                    username: $scope.username,
                    password: $scope.password
               }
                $rootScope.userName = $scope.username;
                apiService.attemptLogin(user);
            }
        })
})();