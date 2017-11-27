const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '../client');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(clientPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('Message created', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('Msg from server :)');
  });

  socket.on('createLocationMessage', coords => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
