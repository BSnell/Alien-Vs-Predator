(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', function ($rootScope, $scope, apiService, $uibModal, $log) {
            $scope.title = 'homeController';
            $scope.userName = $rootScope.userName;
            $scope.warning = {};
            $scope.data = {};
            $scope.editingData = {};
            $scope.sortType = 'id';
            $scope.sortReverse = false;
            $scope.searchStuff = '';
            $scope.completeCount = 0;
            $scope.getWarning = function () {
                apiService.getWarning().then(function (data) {
                    $scope.warning = data[0];
                }).then(function () {
                    $scope.getToDos();
                })
            }

            var dataProcess = function (data) {
                $scope.completeCount = 0;
                for (var i = 0, length = $scope.data.length; i < length; i++) {
                    $scope.editingData[$scope.data[i].id] = false;
                    var date = data[i].dueDate;
                    var days = $scope.warning.days * 24 * 60 * 60 * 1000;
                    var hours = $scope.warning.hours * 60 * 60 * 1000;
                    $scope.timeWarn = days + hours;
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
                    if (data[i].state == true) {
                        $scope.completeCount++;
                    }
                }
            }
            
            $scope.getToDos = function () {
                apiService.getToDo($scope.userName).then(function (data) {
                    $scope.data = data;
                    dataProcess(data);
                });
            }

            $scope.getWarning();

            $scope.newToDo = function () {
                var ToDo = {
                    description: $scope.description,
                    dueDate: new Date($scope.dueDate),
                    tags: $scope.tags,
                    UserName: $scope.userName,
                    state: false
                }
                apiService.newToDo(ToDo).then(function () {
                    apiService.getToDo($scope.userName).then(function (data) {
                        $scope.data = data;
                        dataProcess(data);
                    });
                });
            }

            $scope.completeToDo = function (tableData) {
                tableData.state = true;
                apiService.updateToDo(tableData);
            }

            $scope.removeToDo = function (tableData) {
                apiService.removeToDo(tableData).then(function () {
                    apiService.getToDo($scope.userName).then(function (data) {
                        $scope.data = data;
                        dataProcess(data);
                    });
                });
            }

            $scope.modify = function (tableData) {
                $scope.editingData[tableData.id] = true;
            };


            $scope.update = function (tableData) {
                $scope.editingData[tableData.id] = false;
                apiService.updateToDo(tableData).then(function () {
                    apiService.getToDo($scope.userName).then(function (data) {
                        $scope.data = data;
                        dataProcess(data);
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
                        apiService.getToDo($scope.userName).then(function (data) {
                            $scope.data = data;
                            dataProcess(data);
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
            if ($scope.days != null && $scope.hours != null) {
                $scope.warning.days = $scope.days;
                $scope.warning.hours = $scope.hours;
            }
            $uibModalInstance.close($scope.warning);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();