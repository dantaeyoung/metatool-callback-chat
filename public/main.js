
$(function() {

  var sc = new SocketChat();
  
  sc.onLogin(function() {
    console.log("wow, you logged in!")
  })
  
});