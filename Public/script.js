var socket = io();

let btn = document.getElementById('btn');
btn.onclick = function exec(){
    socket.emit('From_Client');
}
socket.on("From_Server", () => {
    console.log('collected a new event from server');
    const div = document.createElement('div');
    div.innerText = 'Hello World';
    document.body.appendChild(div);
  });

  