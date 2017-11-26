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

  socket.emit('newEmail', {
    from: 'Adonis',
    text: "Woof woof bow wow",
    createdAt: 12312312388
  });

  socket.emit('newMessage', {
    from: 'Aurora',
    text: 'Sup nigga',
    createdAt: 80894
  });

  socket.on('createMessage', message => {
    console.log('Message created', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
