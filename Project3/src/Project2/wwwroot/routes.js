(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            //
            // For any unmatched url, redirect to /state1
            $urlRouterProvider.otherwise("/");
            //
            // Now set up the states
            $stateProvider
              .state('home', {
                  url: "/",
                  templateUrl: "Home/home.html",
                  controller: "homeController"
              })
            .state('userSearch', {
                url: "/userSearch",
                templateUrl: "userSearch/userSearch.html",
            })
            .state('repoSearch', {
                url: "/repoSearch",
                templateUrl: "repoSearch/repoSearch.html",
            })
        });

})();