const path = require('path');
const express = require('express');


//path to access public directory
const publicPath = path.join(__dirname,"/../public");

//use given port otherwise 3000
const port = process.env.PORT || 3000;
var app = express();

//server index.html from public path
app.use(express.static(publicPath));

app.listen(port,()=>{
    console.log("Server is up on port 3000");
})