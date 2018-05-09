var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Client Disconnected');
});

socket.on('newMessage', function(newMessage) {
    console.log('newMessage===', newMessage);
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(locationMessage) {
    console.log('newLocationMessage===', locationMessage);
    var li = jQuery('<li></li>');
    var a = jQuery(`<a target='_blank'>My Current Location</a>`);
    li.text(`${locationMessage.from}: `);
    a.attr('href', locationMessage.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(e){
    if(!navigator.geolocation){
        return alert('Geo location not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('Unable to fetch location');
    });
});
