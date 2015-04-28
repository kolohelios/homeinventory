'use strict';

angular.module('homeinventory')
.factory('Room', function($rootScope, $firebaseArray){

  var fbRoom;
  var afRoom;

  function Room(){
  }

  Room.init = function(){
    fbRoom = $rootScope.fbRoot.child('rooms/');
    afRoom = $firebaseArray(fbRoom);
    return afRoom;
  };

  Room.add = function(roomName){
    afRoom.$add({name: roomName});
  };

  return Room;
});
