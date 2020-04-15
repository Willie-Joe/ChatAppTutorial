const path = require("path");
const express = require("express");
const http = require("http")
const sockerIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
// path to access public directory
const publicPath = path.join(__dirname, "/../public");

// use given port otherwise 3000
const port = process.env.PORT || 3000;
let app = express();
//create server instance
let server = http.createServer(app);

// create bi-directional communication channel
let io = sockerIO(server);

// callback when client makes connection
io.on("connection", (socket) => {
    console.log("New user has connected");

    socket.emit("newMessage", generateMessage("Admin", "Welcome to Chat App"));

    //sends to all connections except socket
    socket.broadcast.emit("newMessage",
    generateMessage("Admin","A new user joined")
)



    // when message created
    socket.on("createMessage", (msg, callback) => {
        console.log("Create message", msg);
        //io broadcat to all connected
         io.emit("newMessage", generateMessage(msg.from,msg.text));
        callback("this is the server");

    })

    //handler for location message
    socket.on("createLocationMessage",(coords)=>{
        io.emit("newLocationMessage",generateLocationMessage("Admin",coords.lat, coords.long))
    })

    // callback when client is disconnected 
    socket.on("disconnect", () => { console.log("disconnected from server") });
});



// server index.html from public path
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})