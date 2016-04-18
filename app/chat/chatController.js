(function(){
  'use strict';

  angular.module('Chat')
         .controller('chatController', function($scope, chatService){
    $scope.chatService = chatService;
    $scope.messages = chatService.messages;
    
    var self = this;
    self.username = null;
    self.message = null;
    self.allUsers = [];

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

    $scope.getAllUsers = function() {
      // self.allUsers = chatService.
    }

  });
})();