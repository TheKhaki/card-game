const express = require('express')
const app = express()
const port = 3000;

const cors = require('cors')
const {createServer} = require('node:http')
const { Server } = require('socket.io');
const router = require('./routers');
const server = createServer(app)
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use( router )

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

module.exports = app