
$(function() {
  
  console.log(test);
  
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    "#e21400",
    "#91580f",
    "#f8a700",
    "#f78b00",
    "#58dc00",
    "#287b00",
    "#a8f07a",
    "#4ae8c4",
    "#3b88eb",
    "#3824aa",
    "#a700ff",
    "#d300e7"
  ];
  

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $(".usernameInput"); // Input for username
  var $messages = $("#messages"); // Messages area
  var $backgroundcolor = $(".background");

  var $inputMessage = $(".inputMessage"); // Input message input box

  var $loginPage = $(".login.page"); // The login page
  var $chatPage = $(".chat.page"); // The chatroom page

  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();
  
  

  var socket = io();

  function addParticipantsMessage(data) {
    var message = "";
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    log(message);
  }

  // Sets the client's username
  function setUsername() {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off("click");
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit("add user", username);
    }
  }

  // Sends a chat message
  function sendMessage(message) {
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val("");
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit("new message", message);
    
    onMyNewMessage(message, sendMessage)

    }
  }
  
  

  // Log a message ******
  function log(message, options) {
    var $el = $("<li>")
      .addClass("log")
      .text(message);
    addMessageElement($el, options);
  };
  
    
  // Adds the visual chat message to the message list
  function addChatMessage(data, options) {
    
    // Don't fade the message in if there is an 'X was typing'
    var typingMessages = getTypingMessages(data);
    options = options || {};
    if (typingMessages.length !== 0) {
      options.fade = false;
      typingMessages.remove();
    }
    var d = new Date().toLocaleTimeString("en-US", { hour12: false });
    
    var usernameToClass = data.username.split(/[\s,]+/).map(function(x) { return x.replace(/\W/g, ''); }).join(" ");


    var usernameDiv = $('<span class="username ' + usernameToClass + '"/>').text(
      `[${d}] <${data.username}>`
    );

    // each message is split up and turned into classes
    var classes = data.message.split(/[\s,]+/).map(function(x) { return x.replace(/\W/g, ''); });
    var classList = classes.join(" ");
    
    var messageBodyDiv = $('<div class="messageBody ' + usernameToClass + ' ' + classList + '">').text(data.message);
    
    var typingClass = data.typing ? "typing" : "";
    var messageDiv = $('<li class="message"/>')
      .data("username", data.username)
      .addClass(typingClass)
      .append(usernameDiv, messageBodyDiv);
    addMessageElement(messageDiv, options);
    
    
    
  }
  
  


  // this is a function! A function is a piece of code that does something.
  // What exactly does that mean? I'll introduce next class!
  function onMyNewMessage(message) {
    // DAN's note: if you want to run a command when someone you write a message, put it here!


    
    // IF the message includes "make it blue"..
    if (message.includes("makeitblue")) {  

      // get an element that has the id 'messages'
      // and then, edit the CSS to make the background color blue
      $("#messages").css('background-color', 'rgb(0,00,100)')

    }


    // IF the message includes "make it blue"..
    if (message.includes("makeitgreen")) {  

      // get an element that has the id 'messages'
      // and then, edit the CSS to make the background color blue
      $("#messages").css('background-color', 'rgb(0,255,0)')

    }


    // IF the message includes “make it bigger”..
    if (message.includes("makeitbigger")) {
      // get an element that has the id ‘messages’
      // and then, edit the CSS to make the text bigger
      $("#messages").css('font-size', '300%')
    }
    
    
    // IF the message includes “make it bigger”..
    if (message.includes("makeitsmaller")) {
      // get an element that has the id ‘messages’
      // and then, edit the CSS to make the text bigger
      $("#messages").css('font-size', '50%')
    }
    
    
    // IF the message includes “make it bigger”..
    if (message.includes("makeitnormal")) {
      // get an element that has the id ‘messages’
      // and then, edit the CSS to make the text bigger
      $("#messages").css('font-size', '100%')
    }
    
    if (message.includes("STOP")) {  
      $("#messages").css('background-color', 'rgb(255,0,0)')
    }


  }






  function onSomeonesNewMessage(message) {
    // DAN's note: if you want to run a command when someone else writes a message, put it here!


    if (message.includes("how are you")) {  
      sendMessage("I'm fine, and you?");
    }

      if (message.includes("what's going on")) {  
      sendMessage("nothing");
    }


    
    if (message.includes("do you agree?")) {  
      sendMessage("Yeah, I agree with you");
    }
    
    // IF the message includes "make it blue"..
    if (message.includes("makeitblue")) {  

      // get an element that has the id 'messages'
      // and then, edit the CSS to make the background color blue
      $("#messages").css('background-color', 'rgb(0,0,255)')

    }

    
    
    // IF the message includes "make it blue"..
    if (message.includes("makeitgreen")) {  

      // get an element that has the id 'messages'
      // and then, edit the CSS to make the background color green
      $("#messages").css('background-color', 'rgb(0,255,0)')

    }

    
    
    if (message.includes("STOP")) {  
      $("#messages").css('background-color', 'rgb(255,0,0)')
    }


    
    if (message.includes("stopin5")) {  

      setTimeout( function() { 
          sendMessage("STOP");
      }, 5000);  //setTimeout executes what's inside of it after some time. Guess what 3000 means?

    }

    
    if (message.includes("GO")) {  
      window.timeoutHandle = window.setTimeout(function() {
          clearTimeout(window.timeoutHandle);
          sendMessage("finally! nobody said Go in the last 5 seconds")
      
      }, 5000);
    }
    

    
    
    if (message.includes("marco")) {  

      setTimeout( function() { 
          sendMessage("polo");
      }, 3000);  //setTimeout executes what's inside of it after some time. Guess what 3000 means?

    }


    if (message.includes("who wants pizza")) {

      if(Math.random() < 0.5) {
           sendMessage("I want pizza");
      }

    }

    
    
    if (message.includes("hey")) {

      var r = Math.random();
      if(r < 0.25) { // 0.0 and 1.0
           sendMessage("alright");
      } else if (r < 0.5) { // 0.0 and 1.0
           sendMessage("okay");
      } else if (r < 0.1) { // 0.0 and 1.0
           sendMessage("great");
      }

    }
    
    
    
  }


  
  
  // Adds the visual chat typing message
  function addChatTyping(data) {
    data.typing = true;
    data.message = "is typing";
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping(data) {
    getTypingMessages(data).fadeOut(function() {
      $(this).remove();
    });
  }

  
  function addMessageElement(el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === "undefined") {
      options.fade = true;
    }
    if (typeof options.prepend === "undefined") {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput(input) {
    return $("<div/>")
      .text(input)
      .html();
  }

  // Updates the typing event
  function updateTyping() {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit("typing");
      }
      lastTypingTime = new Date().getTime();

      setTimeout(() => {
        var typingTimer = new Date().getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit("stop typing");
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }
  
  

  // Gets the 'X is typing' messages of a user
  function getTypingMessages(data) {
    return $(".typing.message").filter(function(i) {
      return $(this).data("username") === data.username;
    });
  }

  
  
  // Gets the color of a username through our hash function
  function getUsernameColor(username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  
  
  
  // Keyboard events

  $window.keydown(event => {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        var message = $inputMessage.val();

        sendMessage(message);
        socket.emit("stop typing");
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on("input", () => {
    updateTyping();
  });

  
  
  
  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(() => {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(() => {
    $inputMessage.focus();
  });

  
  
  
  // Socket events
  // Socket is a networking communication protocol, so this part receives data back and forth from the server.
  

  // Whenever the server emits 'login', log the login message
  socket.on("login", data => {
    connected = true;
    // Display the welcome message
    var message = "Welcome to Metatool Class Chat! You are connected. – ";
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  
  // Whenever the server emits 'new message', update the chat body
  
  socket.on("new message", data => {
    addChatMessage(data);  
    console.log(data);
    onSomeonesNewMessage(data.message)

  });

  
  
  // Whenever the server emits 'user joined', log it in the chat body
  socket.on("user joined", data => {
    log(data.username + " joined");
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on("user left", data => {
    log(data.username + " left");
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on("typing", data => {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on("stop typing", data => {
    removeChatTyping(data);
  });

  socket.on("disconnect", () => {
    log("you have been disconnected");
  });

  socket.on("reconnect", () => {
    log("you have been reconnected");
    if (username) {
      socket.emit("add user", username);
    }
  });

  socket.on("reconnect_error", () => {
    log("attempt to reconnect has failed");
  });
});
