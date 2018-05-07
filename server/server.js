const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const PORT = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage', {
        from: 'Chaitu',
        text: 'Whats Going on',
        createdAt: 0507
    });

    socket.on('createMessage', (newMessage) => {
        console.log('newMessage===', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('Server Disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
