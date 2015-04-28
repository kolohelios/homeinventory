'use strict';

angular.module('homeinventory')
.factory('Inventory', function($rootScope, $firebaseArray){

  function Inventory(){

  }

  Inventory.roomData = function(room){
    var fbRoom = $rootScope.fbRoot.child('rooms/');
    var afRoom = $firebaseArray(fbRoom);

    afRoom.$loaded().then(findRoom);

    function findRoom(){
      for(var i = 0; i < afRoom.length; i++){
        var key = afRoom.$keyAt(afRoom[i]);
        var rec = afRoom.$getRecord(key);
        if(rec.name === room){
          $rootScope.tableData = rec.items;
          totalUpRoomValue();
        }
      }
    }

    function totalUpRoomValue(){
      var data = $rootScope.tableData;

      var accumValue = 0;
      for(prop in data){
        accumValue += data[prop].cost * data[prop].qty;
      }
      $rootScope.totalValue = accumValue;
    }
  };

  Inventory.add = function(item){
    var saveItem = angular.copy(item);
    saveItem.purchaseDate = item.purchaseDate.getTime();

    var fbRoom = $rootScope.fbRoot.child('rooms/');
    var afRoom = $firebaseArray(fbRoom);

    afRoom.$loaded().then(traverseArray);

    function traverseArray(){
      for(var i = 0; i < afRoom.length; i++){
        var key = afRoom.$keyAt(afRoom[i]);
        var rec = afRoom.$getRecord(key);
        var val = rec.name;
        console.log(key, rec, val);
        if(val === item.room){
          addItemToRoom(key);
        }
      }
    }

    function addItemToRoom(key){
      var fbSelectedRoom = fbRoom.child(key + '/items/');
      console.log(fbSelectedRoom);
      var afSelectedRoom = $firebaseArray(fbSelectedRoom);
      afSelectedRoom.$add(saveItem);
    }
  };

  Inventory.destroyItem = function(removeKey, room){

    console.log(removeKey, room);

    var fbRoom = $rootScope.fbRoot.child('rooms/');
    var afRoom = $firebaseArray(fbRoom);

    afRoom.$loaded().then(traverseArray);

    function traverseArray(){
      for(var i = 0; i < afRoom.length; i++){
        var key = afRoom.$keyAt(afRoom[i]);
        var rec = afRoom.$getRecord(key);
        var val = rec.name;
        if(val === room){
          var fbTheRoom = $rootScope.fbRoot.child('rooms/' + key);
          var afTheRoom = $firebaseArray(fbRoom);
          console.log(afTheRoom);
          afTheRoom.$remove(removeKey);
        }
      }
    }
  };

  return Inventory;

});
