const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static(publicPath));


app.listen(PORT,()=>{
  console.log(`listening on ${PORT}`)
})