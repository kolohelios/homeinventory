'use strict';

angular.module('homeinventory')
.controller('InventoriesCtrl', function($scope, Room, Inventory, $rootScope){

  $scope.rooms = Room.init();

  $scope.addRoom = function(room){
    Room.add(room);
    $scope.room = '';
  };

  $scope.addItem = function(saveItem){
    Inventory.add(saveItem);
    $scope.item = {};
  };

  $scope.displayTable = function(selectedRoom){
    Inventory.roomData(selectedRoom);
    console.log($rootScope.tableData);
  };

  $scope.itemDelete = function(key, room){
    Inventory.destroyItem(key, room);
  };
});
