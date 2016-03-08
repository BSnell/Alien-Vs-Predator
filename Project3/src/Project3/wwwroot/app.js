(function () {
    'use strict';

    angular.module('app', [
            // Angular modules 
            'ui.bootstrap',
            // Custom modules 
            'ui.router',
    ])
        .controller('appController', function ($rootScope, $state, userGithubService) {

            $rootScope.$on("$stateChangeError", console.log.bind(console));

            $rootScope.$on("$stateChangeError", function () {
                $state.go('error');
            });
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams, options) {
                    userGithubService.warning('Starting state ' + toState.name);
            });

            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    userGithubService.warning('At state ' + toState.name + ' from ' + fromState.name);
            });
        });
})();