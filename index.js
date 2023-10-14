const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express(); //created the express app object
const server = http.createServer(app); //
const io = socketio(server);

// io.on -> it expects an event  -> whenever from any side of the machine if anyone emmits a connection event then you are going to start a new connection
io.on('connection' , (socket) => {
    console.log('a user connected',socket.id);
    socket.on('From_Client', () =>{               // on => consume the event
        console.log("sending from the client");
    });
    setInterval(() => {
        socket.emit('From_Server');              // emits -> emits or create event
    },2000);
});
//how to connect to static filoes in express
app.use('/', express.static(__dirname + '/Public')); // what this is going to do is -> this middleware maps taht where are that static assets
server.listen(3000, () => {
    console.log('server started at port 3000');
});

// Question -> here we have created a server using http then how we will able to call the express route 
///Ans -> the ans is in const server = http.createServer(app); -> we have passed the express server to the http method