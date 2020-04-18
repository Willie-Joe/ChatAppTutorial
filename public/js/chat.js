// create connection
let socket = io();

// callback when connected to server
socket.on("connect", function () {
    console.log("connected to server");

    // get info pass to uri
    let searchQuery = window.location.search.substring(1);
    let params = JSON.parse('{"' + decodeURI(searchQuery)
        .replace(/&/g, '","')
        .replace(/\+/g, ' ')
        .replace(/=/g, '":"') + '"}');


    socket.emit("join", params, function (err) {
        if (err) {
            alert(err);
            window.location.href = "/"
        } else {
            console.log("no err");
        }
    })

});

// listen for connected users
socket.on("updateUsersList", function (users) {
    console.log("users", users);
    let ol = document.createElement("ol");
    users.forEach(function (user) {
        let li = document.createElement("li");
        li.innerHTML = user;
        ol.appendChild(li);
    })

    let userList = document.querySelector("#users");
    userList.innerHTML = "";
    userList.appendChild(ol);
})


socket.on("newMessage", function (message) {
    const template = document.querySelector("#message-template").innerHTML;
    const formatedTime = moment(message.createdAt).format("LT");
    // render th
    const html = Mustache.render(template, { from: message.from, text: message.text, createdAt: formatedTime });

    const div = document.createElement("div");
    div.innerHTML = html;
    document.querySelector("#messages").appendChild(div);
    scrollToBottom();
    // console.log("new message from server", message);
    // let li = document.createElement("li");
    // const formatedTime = moment(message.createdAt).format("LT");

    // li.innerText = `${formatedTime}- ${message.from}: ${message.text}`;
    // document.querySelector('body').appendChild(li);
})

socket.on("newLocationMessage", function (message) {
    const template = document.querySelector("#location-message-template").innerHTML;
    const formatedTime = moment(message.createdAt).format("LT");
    // render th
    const html = Mustache.render(template, { from: message.from, url: message.url, createdAt: formatedTime });

    const div = document.createElement("div");
    div.innerHTML = html;
    document.querySelector("#messages").appendChild(div);
    scrollToBottom();

    // console.log("newLocationMessage from server", message);
    // let li = document.createElement("li");
    // let a = document.createElement("a");

    // const formatedTime = moment(message.createdAt).format("LT");


    // // open new tab
    // a.setAttribute("target", "_blank");
    // a.setAttribute("href", message.url);
    // li.innerText = `${formatedTime}- ${message.from}: `;
    // a.innerText = "My current location";
    // // li.innerHTML = a;
    // // li.innerText = `${message.from}:  ${message.text}`;
    // li.appendChild(a)

    // document.querySelector('body').appendChild(li);
})

// callback when disconnected from server
socket.on("disconnect", function () { console.log("disconnected from server") });

// socket.emit("createMessage",{from:"John",message:"hey"},function(callbackMsg){
//     console.log(callbackMsg,"Server got it");
// });

document.querySelector("#submit-btn").addEventListener("click", function (e) {
    // prevent page refresh on submit
    e.preventDefault();

    socket.emit("createMessage", {
        // from: "User",
        text: document.querySelector('input[name="message"]').value
    }, function () {

    });
});


document.querySelector("#send-location").addEventListener("click", function (e) {
    // check for geolocation support
    if (!navigator.geolocation) {
        return alert("Geolocation is supported by your browser")

    }

    navigator.geolocation.getCurrentPosition(
        // success callback
        function (position) {
            console.log(position);
            socket.emit("createLocationMessage", {
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        },
        // error callback
        function (e) {
            alert(`unable to fetch location: ${e}`)
            console.log(e)
        })
    // prevent page refresh on submit
    e.preventDefault();

});

function scrollToBottom() {
    let messages = document.querySelector("#messages").lastElementChild;
    messages.scrollIntoView()
}