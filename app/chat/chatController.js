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
    
    self.messages = chatService.messages;// Messages received from serverser

    /*
    * Chat mesasge
    */
    $scope.sendMessage = function() {
      chatService.sendMessage(self.message);
      self.message = null;
    };

    /*
    * check if the current is registered and online
    */
    self.canChat = function() {
      var goChat = false;
      // TODO: this should check from the server that if the current user is register and online
      // --- server check is not yet stright forward 
      goChat = self.username === null || !self.usernameRegistered;
      return goChat;
    };


    /*
    * >>>>>>>>>>>>>>>>>>>
    * TODO: move code below to its userpopup directive
    * TODO: name change duplicate error case needs more 
    */
    self.nickNameError = chatService.nickError;          // nick name error TODO: own scope
    self.showUserPopup = true;
    self.usernameRegistered = false;
    // create user
    self.createUser = function() {
      chatService.createUser(self.username);
      self.usernameRegistered = true;
    };
    self.closeUserPopup = function() {
      self.showUserPopup = false;
    };
    self.openUserPopup = function() {
      self.showUserPopup = true;
    };
    self.finishUserName = function() {
      if(self.usernameRegistered) {
        self.closeUserPopup();
      }
    };
    $scope.$on('newUserJoined', function(event) {
      self.finishUserName();
    });
    $scope.$on('userNameChanged', function(event) {
      self.finishUserName();
    });
    /*
    * End of userpop 
    * <<<<<<<<<<<<<<<<<<<
    */

    /*
    * >>>>>>>>>>>>>>>>>>>>
    * TODO: move to history directive
    */
    self.showHistoryPopup = false;
    self.openHistoryPopup = function() {
      self.showHistoryPopup = true;
      $scope.getAllUsers();
      $scope.getAllHistory();
    };
    self.closeHistoryPopup = function() {
      self.showHistoryPopup = false;
    };
    /*
    * Get all users from server
    */
    $scope.getAllUsers = function() {
      historyService.getAllUsers().get( function(resource) {
        self.allUsers = resource.data;
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
    * End of history directive
    * <<<<<<<<<<<<<<<<<<<<
    */
  });
})();