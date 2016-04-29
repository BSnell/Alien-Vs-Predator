﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', function ($scope, apiService, $uibModal, $log) {
            $scope.title = 'homeController';
            $scope.warning = {};
            $scope.data = {};
            $scope.editingData = {};
            $scope.sortType = 'id';
            $scope.sortReverse = false;
            $scope.searchStuff = '';
            $scope.getWarning = function () {
                apiService.getWarning().then(function (data) {
                    $scope.warning = data[0];
                }).then(function () {
                    $scope.getToDos();
                })
            }
            $scope.getWarning();
            $scope.getToDos = function () {
                    apiService.getToDo().then(function (data) {
                        $scope.data = data;
                        for (var i = 0, length = $scope.data.length; i < length; i++) {
                            $scope.editingData[$scope.data[i].id] = false;
                            var date = data[i].dueDate;
                            var hours = $scope.warning.hours * 60 * 60 * 1000;
                            var minutes = $scope.warning.minutes * 60 * 1000;
                            $scope.timeWarn = hours + minutes;
                            $scope.time = new Date(dateMeow + $scope.timeWarn);
                            if (date != null) {
                                data[i].dueDate = new Date(date);
                            }
                            if (data[i].state == false && data[i].dueDate < $scope.time) {
                                data[i].isYellow = true;
                            }
                            if (data[i].state == false && data[i].dueDate < Date.now()) {
                                data[i].isRed = true;
                                data[i].isYellow = false;
                            }
                            else if (data[i].state == false && data[i].dueDate > Date.now() && data[i].dueDate > $scope.time) {
                                data[i].isRed = false;
                                data[i].isYellow = false;
                            }
                        }
                    });
            }
            
            $scope.newToDo = function () {
                var ToDo = {
                    description: $scope.description,
                    dueDate: new Date($scope.dueDate),
                    tags: $scope.tags,
                    state: false
                }
                apiService.newToDo(ToDo).then(function () {
                    apiService.getToDo().then(function (data) {
                        $scope.data = data;
                        for (var i = 0, length = $scope.data.length; i < length; i++) {
                            $scope.editingData[$scope.data[i].id] = false;
                            var date = data[i].dueDate;
                            var hours = $scope.warning.hours * 60 * 60 * 1000;
                            var minutes = $scope.warning.minutes * 60 * 1000;
                            $scope.timeWarn = hours + minutes;
                            $scope.time = new Date(dateMeow + $scope.timeWarn);
                            if (date != null) {
                                data[i].dueDate = new Date(date);
                            }
                            if (data[i].state == false && data[i].dueDate < $scope.time) {
                                data[i].isYellow = true;
                            }
                            if (data[i].state == false && data[i].dueDate < Date.now()) {
                                data[i].isRed = true;
                                data[i].isYellow = false;
                            }
                            else if (data[i].state == false && data[i].dueDate > Date.now() && data[i].dueDate > $scope.time) {
                                data[i].isRed = false;
                                data[i].isYellow = false;
                            }
                        }
                    });
                });
            }
            
            $scope.completeToDo = function (tableData) {
                tableData.state = true;
                apiService.updateToDo(tableData);
            }

            $scope.removeToDo = function (tableData) {
                apiService.removeToDo(tableData).then(function () {
                    apiService.getToDo().then(function (data) {
                        $scope.data = data;
                        for (var i = 0, length = $scope.data.length; i < length; i++) {
                            $scope.editingData[$scope.data[i].id] = false;
                            var date = data[i].dueDate;
                            var hours = $scope.warning.hours * 60 * 60 * 1000;
                            var minutes = $scope.warning.minutes * 60 * 1000;
                            $scope.timeWarn = hours + minutes;
                            $scope.time = new Date(dateMeow + $scope.timeWarn);
                            if (date != null) {
                                data[i].dueDate = new Date(date);
                            }
                            if (data[i].state == false && data[i].dueDate < $scope.time) {
                                data[i].isYellow = true;
                            }
                            if (data[i].state == false && data[i].dueDate < Date.now()) {
                                data[i].isRed = true;
                                data[i].isYellow = false;
                            }
                            else if (data[i].state == false && data[i].dueDate > Date.now() && data[i].dueDate > $scope.time) {
                                data[i].isRed = false;
                                data[i].isYellow = false;
                            }
                        }
                    });
                });
            }

            $scope.modify = function (tableData) {
                $scope.editingData[tableData.id] = true;
            };


            $scope.update = function (tableData) {
                $scope.editingData[tableData.id] = false;
                apiService.updateToDo(tableData).then(function () {
                    apiService.getToDo().then(function (data) {
                        $scope.data = data;
                        for (var i = 0, length = $scope.data.length; i < length; i++) {
                            $scope.editingData[$scope.data[i].id] = false;
                            var date = data[i].dueDate;
                            var hours = $scope.warning.hours * 60 * 60 * 1000;
                            var minutes = $scope.warning.minutes * 60 * 1000;
                            $scope.timeWarn = hours + minutes;
                            $scope.time = new Date(dateMeow + $scope.timeWarn);
                            if (date != null) {
                                data[i].dueDate = new Date(date);
                            }
                            if (data[i].state == false && data[i].dueDate < $scope.time) {
                                data[i].isYellow = true;
                            }
                            if (data[i].state == false && data[i].dueDate < Date.now()) {
                                data[i].isRed = true;
                                data[i].isYellow = false;
                            }
                            else if (data[i].state == false && data[i].dueDate > Date.now() && data[i].dueDate > $scope.time) {
                                data[i].isRed = false;
                                data[i].isYellow = false;
                            }
                        }
                    });
                });
            };

            var datetime = null,
                dateMeow = null;

            var update = function () {
                dateMeow = moment(new Date())
                datetime.html(dateMeow.format('dddd, MMMM Do YYYY, h:mm:ss a'));
            };

            $(document).ready(function () {
                datetime = $('#datetime')
                update();
                setInterval(update, 1000);
            });

            $scope.items = ['item1', 'item2', 'item3'];

            $scope.animationsEnabled = true;

            $scope.open = function (size) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'warningContent.html',
                    controller: 'warningModalController',
                    size: size,
                    resolve: {
                        warning: function () {
                            return $scope.warning;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.warning = selectedItem;
                    apiService.updateWarning(selectedItem).then(function () {
                        apiService.getToDo().then(function (data) {
                            $scope.data = data;
                            for (var i = 0, length = $scope.data.length; i < length; i++) {
                                $scope.editingData[$scope.data[i].id] = false;
                                var date = data[i].dueDate;
                                var hours = $scope.warning.hours * 60 * 60 * 1000;
                                var minutes = $scope.warning.minutes * 60 * 1000;
                                $scope.timeWarn = hours + minutes;
                                $scope.time = new Date(dateMeow + $scope.timeWarn);
                                if (date != null) {
                                    data[i].dueDate = new Date(date);
                                }
                                if (data[i].state == false && data[i].dueDate < $scope.time) {
                                    data[i].isYellow = true;
                                }
                                if (data[i].state == false && data[i].dueDate < Date.now()) {
                                    data[i].isRed = true;
                                    data[i].isYellow = false;
                                }
                                else if (data[i].state == false && data[i].dueDate > Date.now() && data[i].dueDate > $scope.time) {
                                    data[i].isRed = false;
                                    data[i].isYellow = false;
                                }
                            }
                        });
                    });
                });
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };
        })
    .controller('warningModalController', function ($scope, $uibModalInstance, warning) {
        $scope.warning = warning;

        $scope.ok = function () {
            if($scope.hours != null && $scope.minutes != null){
                $scope.warning.hours = $scope.hours;
                $scope.warning.minutes = $scope.minutes;
            }
            $uibModalInstance.close($scope.warning);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();