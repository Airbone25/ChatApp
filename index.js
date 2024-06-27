const express = require('express');
const {createServer} = require('node:http');
const {join} = require('node:path');
const {Server} = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'views/index.html'))
});

const user = {};

io.on('connection',(socket)=>{
    console.log("a user is connected");

    socket.on('user-connected',(name)=>{
        user[socket.id]=name;
        io.emit('user-connected',name);
    })

    socket.on('send',(msg)=>{
        io.emit('send',{message: msg, name: user[socket.id]});
    })

    socket.on('disconnect',(me)=>{
        console.log("user is disconnected");
    })
})

server.listen(5500,()=>{
    console.log("Server is running at http://localhost:5500");
})
