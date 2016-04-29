(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
              .state('home', {
                url: "/",
                templateUrl: "Home/home.html",
                controller: "homeController"
              })
        });

})();