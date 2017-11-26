const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '../client');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(clientPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('createMessage', message => {
    console.log('Message created', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
