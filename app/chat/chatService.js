/*
* WS service
*/
(function(){
  'use strict';

  angular.module('Chat')
         .factory('chatService', function ($websocket, $rootScope) {

          // open a WebSocket connection
          var host = "ws://localhost:9999";
          var ws = $websocket(host);
          var messages = []; // Messages
          var nickError = [];
          var currenetUsername = null;

          ws.onMessage(function(message) {
            var msg = {};
            msg.type = "text"; // default message type
            nickError.splice(0, nickError.length);    // empty the error array

            // TODO: the code below is a bit spaghetti, much dependency on the server side
            if(message !== null && message.data) {
              if (_.isError(_.attempt(JSON.parse.bind(null, message.data)))){
                // the server doesn't send a json, the show what ever it is
                msg.origin = "server";
                msg.content = message.data;
              }
              else {
                // the data is a JSON 
                var data =JSON.parse(message.data);
                if(typeof data.error !== "undefined") {
                  // error message
                  msg.from = "server";
                  msg.content = data.error;
                  msg.type = "error";

                  // TODO: !!! Heavy dependency on server msg
                  // case handling for nick name error
                  if(_.startsWith(msg.content, 'Nick')){
                    nickError.push(msg.content);
                  }
                }
                if(typeof data.message !== "undefined") {
                  // normal message
                  msg.content = data.message;
                }
                if (data.from === "_server") {
                  msg.origin = "server";
                  // TODO: !!! Heavy dependency on server msg
                  // case handling  user
                  if(_.startsWith(msg.content, "New user:")){
                    $rootScope.$broadcast('newUserJoined'); // Attention!!!
                  }
                  else if(msg.content.indexOf('is now known as') > 0){
                    $rootScope.$broadcast('userNameChanged'); // Attention!!! (risk of error)
                  }
                }
                else {
                  msg.origin = data.from;
                }
              }
              messages.push(msg);
              console.log(nickError);
            }
          });
          ws.onError(function(event) {
            // console.log('connection Error', event);
          });
          ws.onClose(function(event) {
            // console.log('connection Closed', event);
          });
          ws.onOpen(function() {
            // console.log('connected');
            ws.send('Hello');
          });

          var service = {
            messages: messages,
            nickError: nickError,
            status: function() {
              return ws.readyState;
            },
            createUser: function(username) {
              var path = '/nick ';
              currenetUsername = username;
              ws.send(path + username);
            },
            sendMessage: function(msg){
              ws.send(JSON.stringify(msg));
            }
          };
          return service;
         });
})();