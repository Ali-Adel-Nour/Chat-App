const path = require('path');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const server = app.listen(PORT,()=>{
  console.log(`listening on ${PORT}`)
})

const io = require('socket.io')(server)

const publicPath = path.join(__dirname, '/../public');

let socketsConnected = new Set()



app.use(express.static(publicPath));


io.on('connection', onConnected)

function onConnected(socket){
  console.log(socket.id)
  socketsConnected.add(socket.id)

  io.emit('clients-total',socketsConnected.size)

  socket.on('disconnect',()=>{
    console.log('Socket disconnected',socket.id)
    socketsConnected.delete(socket.id)


    io.emit('clients-total',socketsConnected.size)
  })

  socket.on('message',(data)=>{
    console.log(data)
    socket.broadcast.emit('chat-message',data)
  })

  socket.on('feedback',(data)=>{
    socket.broadcast.emit('feedback',data)
  })
}

