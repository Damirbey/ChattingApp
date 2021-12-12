const express = require("express");
const app = express();
const socket = require("socket.io");

app.use(express.static("public"));


const server = app.listen("3000",()=>{
    console.log("Server is running on port 3000")
})

var io = socket(server);

io.on("connection",(socket)=>{

    /**Receiving message from the server and broadcasting it to all connected clients*/
    socket.on("chating",(data)=>{
        io.sockets.emit("chating",data)
    })
    /** Broadcasting user typing message to all clients waiting for the message*/
    socket.on("typing",(data)=>{
        socket.broadcast.emit("typing",data);
    })
})