const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Chat = require('./models/chat');
const connect = require("./config/database");

const app = express(); //created the express app object
const server = http.createServer(app); //
const io = socketio(server);

// io.on -> it expects an event  -> whenever from any side of the machine if anyone emmits a connection event then you are going to start a new connection
io.on('connection' , (socket) => {
    console.log('a user connected',socket.id);
    
    socket.on('join_room', (data)=>{
        socket.join(data.roomid);
    });
    socket.on('msg_send', async(data) =>{               // on => consume the event
        console.log("data",data);
        //io.emit('msg_recieved',data); // this will send the messages to all the connections including itself 
       // socket.emit('msg_recieved',data);  // FOR only the same client that has send is going to recieve it .
       //socket.broadcast.emit('msg_recieved',data);// in this the msg is only send to others not to ownself 
        const chat = await Chat.create({
            roomId : data.roomid,
            user : data.username,
            content : data.msg
        })
        io.to(data.roomid).emit('msg_recieved',data);
    });

    socket.on('typing' , (data) =>{ 
        io.to(data.roomid).emit('somebody_typing');
    });
    
});

app.set('view engine', 'ejs');
//how to connect to static filoes in express
app.use('/', express.static(__dirname + '/Public')); // what this is going to do is -> this middleware maps taht where are that static assets

app.get('/chat/:roomid', async(req,res)=> {
    const chats = await Chat.find({
        roomId : req.params.roomid
    }).select('content user');
    res.render('index',{
        name : 'rittik',
        id : req.params.roomid,
        chats : chats
    });
})
server.listen(3000, async() => {
    console.log('server started at port 3000');
    await connect();

});

// Question -> here we have created a server using http then how we will able to call the express route 
///Ans -> the ans is in const server = http.createServer(app); -> we have passed the express server to the http method