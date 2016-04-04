(function () {
    'use strict';

    angular
        .module('app')
        .controller('homeController', function ($scope, apiService) {
            $scope.title = 'homeController';
            $scope.data = {};
            $scope.editingData = {};
            $scope.sortType = 'id';
            $scope.sortReverse = false;
            $scope.searchStuff = '';
            $scope.getToDos = function () {
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
        });   
})();