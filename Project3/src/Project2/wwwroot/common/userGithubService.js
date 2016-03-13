(function () {
    'use strict';

    angular
        .module('app')
        .factory('userGithubService', function ($q, $http) {

            var service = {
                getUser: getUser,
                getSingleUser: getSingleUser,
                getUserRepos: getUserRepos,
                getUserFollowers: getUserFollowers
            };

            return service;

            function getUser(searchText, pageNumber) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/search/users?q='+searchText+'&page=' + pageNumber + '&per_page=10').then(
                    function handleSuccess(response) {
                        console.log('github response received');
                        deferred.resolve(response.data.items);
                    },
                    function handleError(response) {
                        toastr.warning(response.data.items);
                    });
                return deferred.promise;
            }
            function getSingleUser(searchText) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/users/' + searchText).then(
                    function handleSuccess(response) {
                        console.log('github response received');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }
            function getUserRepos(searchText) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/users/' + searchText + '/repos').then(
                    function handleSuccess(response) {
                        console.log('github response received');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }
            function getUserFollowers(searchText) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/users/' + searchText + '/followers').then(
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