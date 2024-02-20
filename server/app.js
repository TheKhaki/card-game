const express = require('express')
const app = express()

const port = 3000;

const {createServer} = require('node:http')
const { server } = require('socket.io')

const server = createServer(app)

const io = new Server(server, {
    cors : {
        origin : "http://localhost:5173"
    }
})

io.on('connection', (socket) => {

})

server.listen(port, () => {
    console.log(`server start on ${port}`);
})