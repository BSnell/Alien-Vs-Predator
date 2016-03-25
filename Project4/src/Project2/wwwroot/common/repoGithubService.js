(function () {
    'use strict';

    angular
        .module('app')
        .factory('repoGithubService', function ($q, $http) {

            var service = {
                getRepo: getRepo,
                getSingleRepo: getSingleRepo,
                getCommits: getCommits,
                getIssues: getIssues
            };

            return service;

            function getRepo(searchText, pageNumber) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/search/repositories?q=' + searchText +'&page=' + pageNumber + '&per_page=10').then(
                    function handleSuccess(response) {
                        console.log('github response received');
                        deferred.resolve(response.data.items);
                    },
                    function handleError(response) {
                        toastr.warning(response.data.items);
                    });
                return deferred.promise;
            }

            function getSingleRepo(owner, repo) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/repos/' + owner + '/' + repo).then(
                    function handleSuccess(response) {
                        console.log('github response received');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }
            function getCommits(owner, repo) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/repos/' + owner + '/' + repo + '/' + 'commits').then(
                    function handleSuccess(response) {
                        console.log('github response received');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }
            function getIssues(owner, repo) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/repos/' + owner + '/' + repo + '/' + 'issues').then(
                    function handleSuccess(response) {
                        console.log('github response received');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }
        });
})();