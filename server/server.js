const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const PORT = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');
    socket.emit('newMessage', generateMessage('Admin', 'Hello user.. Welcome to the chat'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));
    socket.on('createMessage', (newMessage, callback) => {
        console.log('newMessage===', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    socket.on('disconnect', () => {
        console.log('Server Disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
