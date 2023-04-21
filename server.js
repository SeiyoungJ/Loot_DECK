const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const rooms = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  let roomId;

  socket.on('create game', () => {
    roomId = generateRoomId();
    rooms.set(roomId, [socket.id]);
    socket.join(roomId);
    socket.emit('game created', roomId);
  });

  socket.on('join game', (roomId) => {
    const room = rooms.get(roomId);

    if (!room) {
      socket.emit('invalid code');
      return;
    }

    roomId = roomId;
    room.push(socket.id);
    socket.join(roomId);
    io.to(roomId).emit('player joined', room);

    if (room.length === 2) {
      io.to(roomId).emit('room ready');
    }
  });

  socket.on('room ready', () => {
    io.to(roomId).emit('room ready');
  });

  socket.on('start game', () => {
    io.to(roomId).emit('start game');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');

    if (roomId) {
      const room = rooms.get(roomId);
      const index = room.indexOf(socket.id);
      room.splice(index, 1);

      if (room.length === 0) {
        rooms.delete(roomId);
      } else {
        io.to(roomId).emit('player left', room);
      }
    }
  });
});

function generateRoomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});