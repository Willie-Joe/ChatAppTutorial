// create connection
let socket = io();

// callback when connected to server
socket.on("connect", function () {
    console.log("connected to server")

    // // send event "createMessage" with message object
    // socket.emit("createMessage", { from: "bob", message: "hello world" });

});

socket.on("newMessage", function (message) {
    console.log("new message from server", message);
    let li = document.createElement("li");
    const formatedTime = moment(message.createdAt).format("LT");

    li.innerText = `${formatedTime}- ${message.from}: ${message.text}`;
    document.querySelector('body').appendChild(li);
})

socket.on("newLocationMessage", function (message) {
    console.log("newLocationMessage from server", message);
    let li = document.createElement("li");
    let a = document.createElement("a");

    const formatedTime = moment(message.createdAt).format("LT");


    // open new tab
    a.setAttribute("target", "_blank");
    a.setAttribute("href", message.url);
    li.innerText = `${formatedTime}- ${message.from}: `;
    a.innerText = "My current location";
    // li.innerHTML = a;
    // li.innerText = `${message.from}:  ${message.text}`;
    li.appendChild(a)

    document.querySelector('body').appendChild(li);
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
        from: "User",
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
