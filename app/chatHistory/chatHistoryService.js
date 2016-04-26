/*
* The servics to get chat history and user names
*/
(function() {
  'use strict';

  angular.module('Chat')
         .factory('historyService', function($resource){
    var pathToUsers = 'http://localhost:9999/users';
    var pathToHistory = 'http://localhost:9999/history';
    return {
      getAllUsers: function() {
         // method 1 -> 
           // return $resource(pathToUsers, {}, {
           //    // declare the 'get' action 
           //    get: {
           //      method: 'GET'
           //    }
           //  }).get(); // call 'get' action immediately
         // method 2 ->
          return $resource(pathToUsers);
      },
      getHistory: function() {
        return $resource(pathToHistory).get();
      }
    };
  });
})();