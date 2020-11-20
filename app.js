//express setup
import express from 'express';
import * as http from 'http';
import { dirname } from 'path';
import socketio from 'socket.io';
import { fileURLToPath } from 'url';

// node-json-db
// https://www.npmjs.com/package/node-json-db
import JsonDBPKG from 'node-json-db';
const { JsonDB } = JsonDBPKG;
import ConfigPKG from 'node-json-db/dist/lib/JsonDBConfig.js';
const { Config } = ConfigPKG;

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

/*
BB 2020-11-20, lidt kommentarer til Kennet. :)

Problemet med at importere databasen var at deres vejledning på hjemmesiden ikke var helt rigtig (eller måske fungerede i en gammel version af node.js).
Ved at starte node.js serveren her inde i Visual Studio Code, kunne jeg se nogle fejl i "DEBUG CONSOLE" fanen her i Visual Studio Code.
Den guidede mig faktisk til at skrive det på den rigtige måde.

Du sletter bare disse kommentarlinjer her, og flytter koden hen hvor den er relevant. :)

Her under tester jeg at:
Loade/oprette en databasefil i mappen "maps" med navnet "myDataBase".
Putter så noget data i den og henter det ud igen.
Det ser ud til at virke, så det er rigtig fedt! :D
*/
let db = new JsonDB(new Config("maps/myDataBase", true, false, '/'));
db.push("/test1", "super test");
let data = db.getData("/");
console.log(data);

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
    function sendMap(dir) {
        const path = './maps/' + dir + '.json';
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

            // parse JSON object
            let mapData = JSON.parse(data.toString());
            socket.emit('mapData', mapData);
        });
    }
    sendMap('mainlobby');


    socket.on('goToWorld', function (data) {
        const path = './maps/' + data + '.json';

        try {
            if (fs.existsSync(path)) {
                sendMap(data);
                for (let i in ROOM_LIST) {
                    let room = ROOM_LIST[i];
                    for (let o in room) {
                        if (room[o] == socket.id) room.splice(o, 1);
                    }
                }
                let roomExist = false;
                for (let i in ROOM_LIST) {
                    let room = ROOM_LIST[i];
                    if (room[0] == data) {
                        roomExist = true;
                        (room).push(socket.id);
                        console.log(ROOM_LIST);
                    }
                }
                if (roomExist == false) {
                    let newRoom = [];
                    newRoom.push(data);
                    newRoom.push(socket.id);
                    ROOM_LIST.push(newRoom);
                    console.log(ROOM_LIST);
                }
            }
        } catch (err) {
            console.error(err)
        }
    });


    socket.on('addPlatform', function (platform) {
        let receivedPlatform = platform;
        console.log(receivedPlatform);
        let inRoom = '';
        let inRoomSend = '';
        for (let i in ROOM_LIST) {
            let room = ROOM_LIST[i];
            for (let o in room) {
                if (room[o] == socket.id) {
                    inRoom = room[0];
                    inRoomSend = room;
                }
            }
        }
        const path = './maps/' + inRoom + '.json';
        if (inRoom != 'mainlobby') {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    throw err;
                }

                // parse JSON object
                let mapData = JSON.parse(data.toString());

                mapData.push(receivedPlatform);

                // convert JSON object to string
                let verdendata = JSON.stringify(mapData, null, 4);

                // write JSON string to a file
                fs.writeFile(path, verdendata, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("JSON data is saved.");
                });
                for (let i in inRoomSend) {
                    if (i > 0) {
                        let iden = inRoomSend[i];
                        let socket = SOCKET_LIST[iden];
                        socket.emit('mapData', mapData);
                    }
                }
            });
        }

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
            for (let o in room) {
                if (room[o] == socket.id) room.splice(o, 1);
            }
        }
        console.log('socket disconnected');
        console.log(ROOM_LIST);
    });
});

setInterval(function () {
    for (let i in ROOM_LIST) {
        let pack = [];
        let room = ROOM_LIST[i];
        for (let o in room) {
            if (o > 0) {
                let iden = room[o];
                let socket = SOCKET_LIST[(iden)];
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
            if (o > 0) {
                let iden = room[o];
                let socket = SOCKET_LIST[iden];
                socket.emit('newPositions', pack);
            }
        }

    }
}, 1000 / 25);


/*
setInterval(function () {
    let pack = [];
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i];
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
    for (let i in SOCKET_LIST) {
        let socket = SOCKET_LIST[i];
        socket.emit('newPositions', pack);
    }
}, 1000 / 25);
*/