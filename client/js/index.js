let socket = io();

function scrollToBottom() {
  let messages = $('#messages');
  let newMessage = messages.children('li:last-child');

  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newmessage.innerHeight();
  let lastMessageHeight = newMessage.prev.innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    message.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = $('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

  // let formattedTime = moment(message.createdAt).format('h:mm a');
  // let li = $('<li></li>');
  // li.text(`${message.from} - ${formattedTime}: ${message.text}`);
  // $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = $('#locationMessage-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();

  // let li = $('<li></li>');
  // let a = $('<a target="_blank">My current location</a>');
  // li.text(`${message.from} - ${formattedTime}: `);
  // a.attr('href', message.url)
  // li.append(a);
  // $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  let messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

let locationBtn = $('#send-location');
locationBtn.on('click', function () {
  if (!navigator.geolocation) return alert('Geoloction not supported by your browser');

  locationBtn.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationBtn.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
    locationBtn.removeAttr('disabled').text('Send Location');
  });
});
