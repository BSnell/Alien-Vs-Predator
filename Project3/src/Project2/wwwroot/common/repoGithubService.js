(function () {
    'use strict';

    angular
        .module('app')
        .factory('repoGithubService', function ($q, $http) {

            var service = {
                warning: warning,
                getRepo: getRepo
            };

            return service;

            function warning(message) {
                toastr.warning(message);
            }

            function getRepo(searchText) {
                var deferred = $q.defer();
                $http.get('https://api.github.com/search/repositories?q='+searchText+'&1,10').then(
                    function handleSuccess(response) {
                        console.log('github response received');
                        deferred.resolve(response.data.avatar_url);
                    },
                    function handleError(response) {
                        myToastr.warning(response.data);
                    });
                return deferred.promise;
            }
        });
})();