(function () {
    'use strict';

    angular
        .module('app')
        .factory('apiService', function ($q, $http, $window) {

            var service = {
                getToDo: getToDo,
                newToDo: newToDo,
                updateToDo: updateToDo,
                removeToDo: removeToDo,
                getWarning: getWarning,
                updateWarning: updateWarning,
                attemptLogin: attemptLogin
            };

            return service;

            function getToDo(userName) {
                var deferred = $q.defer();
                if (userName == null) {
                    $window.location.href = '/#/';
                }
                $http.get('api/todo/' + userName).then(
                    function handleSuccess(response) {
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        $window.location.href = '/#/';
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }

            function getWarning() {
                var deferred = $q.defer();
                $http.get('api/todo/warning').then(
                    function handleSuccess(response) {
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }

            function newToDo(data) {
                var deferred = $q.defer();
                $http.post('api/todo', data).then(
                    function handleSuccess(response) {
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }

            function attemptLogin(data) {
                var deferred = $q.defer();
                $http.post('api/login', data).then(
                    function handleSuccess(response) {
                        $window.location.href = '/#/home';
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning("Login Failed, try again.");
                    });
                return deferred.promise;
            }

            function updateToDo(todo) {
                var deferred = $q.defer();
                $http.put('api/todo', todo).then(
                    function handleSuccess(response) {
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }
            function updateWarning(warning) {
                var deferred = $q.defer();
                $http.put('api/todo/' + warning.days + '/' + warning.hours, warning).then(
                    function handleSuccess(response) {
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }
            function removeToDo(todo) {
                var deferred = $q.defer();
                $http.delete('api/todo/' + todo.id).then(
                    function handleSuccess(response) {
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        toastr.warning(response.data);
                    });
                return deferred.promise;
            }
        });
})();