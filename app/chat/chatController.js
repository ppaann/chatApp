/*
* The chat controller
*/
(function(){
  'use strict';

  angular.module('Chat')
         .controller('chatController', function($scope, chatService, historyService){
    $scope.chatService = chatService;
    $scope.chatHistory = historyService;
    $scope.messages = chatService.messages;
    
    var self = this;
    self.username = null;
    self.message = null;
    self.allUsers = [];
    self.history = [];

    var historyMockData = {
      "errors":null,
      "data":[
      {"timestamp":1461226135715,"from":"_server","msg":"unidentified user dropped out"},
      {"timestamp":1461226146338,"from":"_server","msg":"unidentified user dropped out"},
      {"timestamp":1461226805308,"from":"_server","msg":"New user: ko joined."},
      {"timestamp":1461226824883,"from":"_server","msg":"New user: jo joined."},
      {"timestamp":1461228121450,"from":"jo","msg":"hello there"},
      {"timestamp":1461228185521,"from":"ko","msg":"It's great to chat!!"},
      {"timestamp":1461230100294,"from":"_server","msg":"unidentified user dropped out"}]
    };
    self.history = historyMockData;

    $scope.joinChat = function() {
      chatService.send( '/nick '+ self.username);
    };

    $scope.sendMessage = function() {
      var msg = {
        'from': self.username,
        'message': self.message
      };
      chatService.send(JSON.stringify(msg));
    };

    /*
    * Get all users from server
    */
    $scope.getAllUsers = function() {
      self.allUsers =historyService.getAllUsers();
    };

    /*
    * Get history data from server
    */
    $scope.getAllHistory = function() {
      // self.history =historyService.getHistory();
    };

    $scope.excludeServerMessage = function (item) {
      return item.from !== '_server';
    }

  });
})();