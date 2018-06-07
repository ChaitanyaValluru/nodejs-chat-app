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
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(e){
    if(!navigator.geolocation){
        return alert('Geo location not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});
