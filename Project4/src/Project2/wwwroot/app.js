(function () {
    'use strict';

    angular.module('app', [
            // Angular modules 
            'ui.bootstrap',
            // Custom modules 
            'ui.router'
    ])
        .controller('appController', function ($rootScope, $state) {

            $rootScope.$on("$stateChangeError", console.log.bind(console));

            $rootScope.$on("$stateChangeError", function () {
                $state.go('error');
            });
        });
})();