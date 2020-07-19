

// let app = require('express')();
// let http = require('http').createServer(app);
// let io = require('socket.io')(http);


window.addEventListener("load",setup);



function setup(){
    let message = document.querySelector("#message");
    message.addEventListener('keyup', () =>{
        message.setAttribute('rows', message.value.split('\n').length);
    });
}


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');
// });

// http.listen(3000, () => {
//     console.log('listening on *:3000');
// });