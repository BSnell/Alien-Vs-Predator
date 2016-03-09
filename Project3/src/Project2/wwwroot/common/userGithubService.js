(function () {
    'use strict';

    angular
        .module('app')
        .factory('userGithubService', userGithubService);


    function userGithubService() {

        var service = {
            warning: warning
        };

        return service;

        function warning(message) {
            toastr.warning(message);
        }

        function getUser(searchText) {
            var deferred = $q.defer();
            $http.get('https://api.github.com/search/users?q= +searchText+&1,10').then(
                function handleSuccess(response) {
                    console.log('github response received');
                    deferred.resolve(response.data.avatar_url);
                },
                function handleError(response) {
                    myToastr.warning(response.data);
                });
            return deferred.promise;
        }
    }
})();