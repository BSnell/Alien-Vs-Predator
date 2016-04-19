(function () {
    'use strict';

    angular
        .module('app')
        .factory('apiService', function ($q, $http) {

            var service = {
                getToDo: getToDo,
                newToDo: newToDo,
                updateToDo: updateToDo,
                removeToDo: removeToDo,
                getWarning: getWarning,
                updateWarning: updateWarning
            };

            return service;

            function getToDo() {
                var deferred = $q.defer();
                $http.get('api/todo').then(
                    function handleSuccess(response) {
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
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
                $http.put('api/todo/' + warning.hours + '/' + warning.minutes, warning).then(
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