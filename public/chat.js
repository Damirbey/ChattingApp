/**Making a connection with the server */
var socket = io.connect("http://localhost:3000");

/**Retrieving the DOM elements */
var handle = document.getElementById("handle");
var message = document.getElementById("message");
var feedback = document.getElementById("feedback");
var output = document.getElementById("output");
var sendBtn = document.getElementById("send");

/**Emitting events */
sendBtn.addEventListener("click",()=>{
    socket.emit("chating",{
        handle:handle.value,
        message:message.value
    })
    message.value = "";
})

message.addEventListener("keypress",()=>{
    socket.emit("typing",handle.value)
})

/**Listening for events */
socket.on("chating",(data)=>{
    feedback.innerHTML = " ";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

socket.on("typing",(data)=>{
    feedback.innerHTML = "<p><em>"+data+" is typing ...</em></p>";
})