(function () {
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
                })
            }
            $scope.getWarning();
            $scope.getToDos = function () {
                    apiService.getToDo().then(function (data) {
                        $scope.data = data;
                        for (var i = 0, length = $scope.data.length; i < length; i++) {
                            $scope.editingData[$scope.data[i].id] = false;
                            var date = data[i].dueDate;
                            var hour = warning.hours * 60 * 60 * 1000;
                            var minutes = warning.minutes * 60 * 1000;
                            var time = hours + minutes;
                            if (date != null) {
                                data[i].dueDate = new Date(date);
                            }
                            if (data[i].state == false && (data[i].dueDate - time) < time) {
                                data[i].isYellow = true;
                            }
                            if (data[i].state == false && data[i].dueDate < Date.now()) {
                                data[i].isRed = true;
                            }
                            else {
                                data[i].isRed = false;
                                data[i].isYellow = false;
                            }
                        }



                        $scope.modify = function (tableData) {
                            $scope.editingData[tableData.id] = true;
                        };


                        $scope.update = function (tableData) {
                            $scope.editingData[tableData.id] = false;
                            apiService.updateToDo(tableData);
                        };
                    });
            }
            $scope.getToDos();
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
                            if (date != null) {
                                data[i].dueDate = new Date(date);
                            }
                            if (data[i].state == false && data[i].dueDate < Date.now()) {
                                data[i].isRed = true;
                            }
                            else {
                                data[i].isRed = false;
                            }
                        }


                        $scope.modify = function (tableData) {
                            $scope.editingData[tableData.id] = true;
                        };


                        $scope.update = function (tableData) {
                            $scope.editingData[tableData.id] = false;
                            apiService.updateToDo(tableData);
                        };
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
                            if (date != null) {
                                data[i].dueDate = new Date(date);
                            }
                            if (data[i].state == false && data[i].dueDate < Date.now()) {
                                data[i].isRed = true;
                            }
                            else {
                                data[i].isRed = false;
                            }
                        }


                        $scope.modify = function (tableData) {
                            $scope.editingData[tableData.id] = true;
                        };


                        $scope.update = function (tableData) {
                            $scope.editingData[tableData.id] = false;
                            apiService.updateToDo(tableData);
                        };
                    });
                });
            }
            var datetime = null,
                date = null;

            var update = function () {
                date = moment(new Date())
                datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
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
                    apiService.updateWarning(selectedItem);
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