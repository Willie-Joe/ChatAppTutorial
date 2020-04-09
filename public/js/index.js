// create connection
let socket = io();

// callback when connected to server
socket.on("connect", function () {
    console.log("connected to server")

    // // send event "createMsg" with message object
    // socket.emit("createMsg", { from: "bob", message: "hello world" });

});

socket.on("newMessage",function(message){
console.log("new message from server",message);
})

// callback when disconnected from server
socket.on("disconnect", function () { console.log("disconnected from server") });