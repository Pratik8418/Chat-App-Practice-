const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express();
const PORT = process.env.PORT || 8000
const server = http.createServer(app);
const io = new socketio(server)

const publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath));
var count = 0

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('countUpdated',count)

  socket.on('increment', () => {
    count++
    socket.emit('countUpdated',count)
  })

});

server.listen( PORT , () => {
  console.log(`Port listing on ${PORT}`);
})