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

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(process.env.PORT || 2000);
console.log('Server started.');

let SOCKET_LIST = {};

let ROOM_LIST = [];
ROOM_LIST.mainlobby = [];
ROOM_LIST.mainlobby.push('mainlobby');

//database setup
import fs from 'fs';

let io = socketio(serv, {});
io.sockets.on('connection', function (socket) {
    socket.id = Math.random();
    socket.name = "Unnamed";
    socket.color = "RED";
    SOCKET_LIST[socket.id] = socket;
    socket.emit('idGranted', socket.id);
    console.log('socket connection');

    ROOM_LIST.mainlobby.push(socket.id);
    console.log(ROOM_LIST);
    // read JSON object from file
    fs.readFile('./maps/mainlobby.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // parse JSON object
        let mapData = JSON.parse(data.toString());
        socket.emit('mapData', mapData);
        console.log(mapData);
    });

    socket.on('helloWorld', function () {
        console.log('Hello World!');
    });

    socket.on('log', function (log) {
        console.log(log);
    });

    socket.on('newPosition', function (data) {
        socket.x = data[0].x;
        socket.y = data[0].y;
        socket.z = data[0].z;
        socket.lX = data[0].lX;
        socket.lY = data[0].lY;
        socket.color = data[0].color;
        socket.model = data[0].model;
        // console.log('x: ' + socket.x + ' y: ' + socket.y + ' z: ' + socket.z);
    });

    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
        for (let i in ROOM_LIST) {
            let room = ROOM_LIST[i];
            for (let o in room){
                if (room[o] == socket.id) room.splice(o, 1);
            }
        }
        console.log('socket disconnected');
        console.log(ROOM_LIST);
    });
});

setInterval(function () {
    for (let i in ROOM_LIST){
        let pack = [];
        let room = ROOM_LIST[i];
        for (let o in room) {
            if (o > 0) {
                let iden = room[o];
                var socket = SOCKET_LIST[(iden)];
                pack.push({
                    id: socket.id,
                    x: socket.x,
                    y: socket.y,
                    z: socket.z,
                    lX: socket.lX,
                    lY: socket.lY,
                    color: socket.color,
                    model: socket.model
                });
            }
        }
        for (let o in room) {
            if (o > 0){
                let iden = room[o];
                let socket = SOCKET_LIST[iden];
                socket.emit('newPositions', pack);
            }
        }
        
    }
}, 1000 / 25);


/*
setInterval(function () {
    var pack = [];
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        pack.push({
            id: socket.id,
            x: socket.x,
            y: socket.y,
            z: socket.z,
            lX: socket.lX,
            lY: socket.lY,
            color: socket.color,
            model: socket.model
        });
    }
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', pack);
    }
}, 1000 / 25);
*/