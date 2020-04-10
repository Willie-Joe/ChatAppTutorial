// create connection
let socket = io();

// callback when connected to server
socket.on("connect", function () {
    console.log("connected to server")

    // // send event "createMessage" with message object
    // socket.emit("createMessage", { from: "bob", message: "hello world" });

});

socket.on("newMessage",function(message){
console.log("new message from server",message);
let li = document.createElement("li");
li.innerText = `${message.from}:  ${message.text}`;
document.querySelector('body').appendChild(li);
})

// callback when disconnected from server
socket.on("disconnect", function () { console.log("disconnected from server") });

// socket.emit("createMessage",{from:"John",message:"hey"},function(callbackMsg){
//     console.log(callbackMsg,"Server got it");
// });

document.querySelector("#submit-btn").addEventListener("click",function(e){
    // prevent page refresh on submit
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: document.querySelector('input[name="message"]').value
    },function(){

    });
});
