const path = require("path");
const express = require("express");
const http = require("http")
const sockerIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/isRealString");
const { Users } = require("./utils/users");

// path to access public directory
const publicPath = path.join(__dirname, "/../public");

// use given port otherwise 3000
const port = process.env.PORT || 3000;
let app = express();
//create server instance
let server = http.createServer(app);

// create bi-directional communication channel
let io = sockerIO(server);
let users = new Users();

// callback when client makes connection
io.on("connection", (socket) => {
    console.log("New user has connected");
    console.log("socket id", socket.id)

    socket.on("join", (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and Room must be valid");
        }

        socket.join(params.room);

        // remove user from current room and add to new room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUsersList", users.getUserList(params.room));
        console.log("users", users.getUserList(params.room));
        socket.emit("newMessage", generateMessage("Admin", `${params.name}, Welcome to Room: ${params.room}`));

        //sends to all connections except socket
        socket.broadcast.to(params.room).emit("newMessage",
            generateMessage("Admin", `A new user joined: ${params.name}`)
        )
        callback();

    })


    // when message created by a client is received
    socket.on("createMessage", (msg, callback) => {
        console.log("Create message", msg);


        let user = users.getUserById(socket.id);
        console.log("user2", user);
        if (user && isRealString(msg.text)) {
            io.to(user.room).emit("newMessage", generateMessage(user.name, msg.text));
        }
        //io broadcat to all connected

        callback("this is the server");

    })

    //handler for location message
    socket.on("createLocationMessage", (coords) => {
        let user = users.getUserById(socket.id);

        if (user) {
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.lat, coords.long))
        }



    })

    // callback when client is disconnected 
    socket.on("disconnect", () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit("updateUsersList"
                , users.getUserList(user.room));
            io.to(user.room).emit("newMessage"
                , generateMessage("Admin", `${user.name} has left room: ${user.room}`))
        }



        console.log("disconnected from server")
    });
});



// server index.html from public path
app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
})