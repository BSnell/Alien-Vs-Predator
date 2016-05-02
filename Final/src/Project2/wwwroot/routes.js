(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
              .state('home', {
                url: "/home",
                templateUrl: "Home/home.html",
                controller: "homeController"
              })
            .state('login', {
                url: "/",
                templateUrl: "Login/login.html",
                controller: "loginController"
            })
        });

})();