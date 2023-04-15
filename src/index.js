const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express();
const PORT = process.env.PORT || 8000
const server = http.createServer(app);
const io = new socketio(server)

const publicDirectoryPath = path.join(__dirname,'../public');

app.use(express.static(publicDirectoryPath));
var count = 0

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.emit('countUpdated',count)

//   socket.on('increment', () => {
//     count++
//     socket.emit('countUpdated',count)
//   })

// });
var msg = "welcome to My chat App"
io.on('connection', (socket) => {
    socket.emit('welcome', msg);
    socket.broadcast.emit('welcome','A new user has joined')

    socket.on('inputMsg', (input,callback) => {
      const filter = new Filter()

      if(filter.isProfane(input)){
        return callback('Profanity is not allowed')
      }
      io.emit('welcome', input);
      callback()
    })

    socket.on('location', (data) => {
      io.emit('welcome',`https://google.com/maps?q=${data.latitude},${data.longitude}`);
    })

    socket.on('disconnect', () => {
       io.emit('welcome','user has left')
    })
})

server.listen( PORT , () => {
  console.log(`Port listing on ${PORT}`);
})