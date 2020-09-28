class SocketChat {
  constructor(callbacks) {
    this.socket = io();
    this.connected = false;
    this.setup(callbacks);
  }
  
  onLogin(callback) {
      
    // Whenever the server emits 'login', log the login message
    this.socket.on("login", data => {
      this.connected = true;
      console.log("xx")
      callback();
    });

  }
  
  setup(callbacks) {
    

    // Whenever the server emits 'new message', update the chat body

    this.socket.on("new message", data => {
    //  addChatMessage(data);  
      console.log(data);
//      onSomeonesNewMessage(data.message)

    });



    // Whenever the server emits 'user joined', log it in the chat body
    this.socket.on("user joined", data => {
      this.log(data.username + " joined");
      //addParticipantsMessage(data);
    });

    // Whenever the server emits 'user left', log it in the chat body
    this.socket.on("user left", data => {
      this.log(data.username + " left");
      //addParticipantsMessage(data);
      //removeChatTyping(data);
    });

    // Whenever the server emits 'typing', show the typing message
    this.socket.on("typing", data => {
      // addChatTyping(data);
    });

    // Whenever the server emits 'stop typing', kill the typing message
    this.socket.on("stop typing", data => {
      //removeChatTyping(data);
    });

    this.socket.on("disconnect", () => {
      this.log("you have been disconnected");
    });

    this.socket.on("reconnect", () => {
      this.log("you have been reconnected");
    //  if (username) {
      //  this.socket.emit("add user", username);
      //}
    });

    this.socket.on("reconnect_error", () => {
      this.log("attempt to reconnect has failed");
    });
  }
  
  
  log(message, options) {
    var $el = $("<li>")
      .addClass("log")
      .text(message);
   // addMessageElement($el, options);
  };
  


}