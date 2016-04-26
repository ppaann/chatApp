/*
* The chat controller
*/
(function(){
  'use strict';

  angular.module('Chat')
         .controller('chatController', function($scope, chatService, historyService){
    $scope.chatService = chatService;
    $scope.chatHistory = historyService;
    
    var self = this;
    self.username = null;
    self.message = null;
    self.allUsers = [];                 // All users
    self.history = [];                  // Chat history
    
    self.messages = chatService.messages;// Messages received from server
    self.usernameRequest = false;

    // create user
    self.createUser = function() {
      chatService.createUser(self.username);
      self.usernameRequest = true;
    };

    /*
    * Chat mesasge
    */
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
      self.allUsers =historyService.getAllUsers().then(function(json) {
        return json;
      });
    };

    /*
    * Get history data from server
    */
    $scope.getAllHistory = function() {
      self.history =historyService.getHistory();
    };

    $scope.excludeServerMessage = function (item) {
      return item.from !== '_server';
    };

    /*
    * TODO: move code below to its own service and scope
    */
    self.nickNameError = chatService.nickError;          // nick name error TODO: own scope
    self.showUserPopup = true;
    self.closeUserPopup = function() {
      self.showUserPopup = false;
    };
    self.openUserPopup = function() {
      self.showUserPopup = true;
    };
    self.finishUserName = function() {
      if(self.usernameRequest) {
        self.closeUserPopup();
      }
    };
    $scope.$on('newUserJoined', function(event) {
      self.finishUserName();
    });
    $scope.$on('userNameChanged', function(event) {
      self.finishUserName();
    });
  });
})();