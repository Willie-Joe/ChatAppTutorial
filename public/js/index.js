// create connection
let socket = io();

// callback when connected to server
socket.on("connect", () => { console.log("connected to server") });

// callback when disconnected from server
socket.on("disconnect", () => { console.log("disconnected from server") });