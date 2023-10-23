var socket = io();

let btn = document.getElementById('btn');
let inputmsg = document.getElementById("newmsg");
let msgList = document.getElementById("msglist");

btn.onclick = function exec(){
    socket.emit("msg_send" , {
        msg : inputmsg.value
    });
}

socket.on('msg_recieved' , (data) => {
    let liMsg = document.createElement('li');
    liMsg.innerText = data.msg;
    msgList.appendChild(liMsg);
})
  