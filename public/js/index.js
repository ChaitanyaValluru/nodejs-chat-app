var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('createMessage', {
        from: 'Padma',
        text: 'FOGG is Going on...'
    });
});

socket.on('newMessage', function(newMessage) {
    console.log('newMessage===', newMessage);
});

socket.on('disconnect', function() {
    console.log('Client Disconnected');
});

