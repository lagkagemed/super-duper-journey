//express setup
import express from 'express';
import * as http from 'http';
import { dirname } from 'path';
import socketio from 'socket.io';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();
let serv = http.Server(app);

app.get('/',function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log('Server started.');

let SOCKET_LIST = {};

let io = socketio(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    socket.name = "Unnamed";
    SOCKET_LIST[socket.id] = socket;
    socket.emit('idGranted',socket.id)
    console.log('socket connection');

    socket.on('helloWorld',function(){
        console.log('Hello World!');
    });

    socket.on('newPosition',function(data){
        socket.x = data[0].x;
        socket.y = data[0].y;
        socket.z = data[0].z;
        console.log('x: ' + socket.x + ' y: ' + socket.y + ' z: ' + socket.z);
    });

    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        console.log('socket disconnected');
    });
});

setInterval(function(){
    var pack = [];
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        pack.push({
            id:socket.id,
            x:socket.x,
            y:socket.y,
            z:socket.z
        });
    }
    for(var i in SOCKET_LIST){
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }


},1000/25);