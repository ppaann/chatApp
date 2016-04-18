(function(){
  'use strict';

  angular.module('Chat')
         .factory('chatService', function ($websocket) {

          // open a WebSocket connection
          var host = "ws://localhost:9999";
          var ws = $websocket(host);
          var messages = [];

          ws.onMessage(function(message) {
            console.log('onMessage', message);
            var msg = {};
            if(message !== null) {
              if(message.origin === host) {
                msg.origin = "server";
              }
              else {
                msg.origin = "user";
              }
              msg.content = message.data;
              messages.push(msg);
              console.log(messages);
            }
          });
          ws.onError(function(event) {
            console.log('connection Error', event);
          });
          ws.onClose(function(event) {
            console.log('connection Closed', event);
          });
          ws.onOpen(function() {
            console.log('connected');
            ws.send('Hello');
          })

          var service = {
            messages: messages,
            status: function() {
              return ws.readyState;
            },
            send: function(message) {
              ws.send(message);
            }
          }
          return service;
         });
})();