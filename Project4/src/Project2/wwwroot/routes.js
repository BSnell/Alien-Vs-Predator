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
            .state('user', {
                url: "/user/{user}",
                templateUrl: "user/user.html",
                controller: "userController"
            })
            .state('repo', {
                url: "/repo/{owner}/{repo}",
                templateUrl: "repo/repo.html",
                controller: "repoController"
            })
        });

})();