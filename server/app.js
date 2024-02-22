const express = require("express");
const app = express();
const port = 3000;
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const router = require("./routers");
const server = createServer(app);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
let usernames = [];
io.on("connection", (socket) => {
  // console.log(socket);
  socket.on("player", (data) => {
    if (usernames.includes(data) === false) {
      usernames.push(data);
    }
    console.log(usernames, "<<<<<<<<<<<<<<");
  });

  socket.on("join", (payload, callback) => {
    let numberOfUsersInRoom = getUsersInRoom(payload.room).length;

    if (usernames.length === 0) {
      usernames.push(payload.playerName);
    }

    if (usernames.includes(payload.playerName) === false) {
      usernames.push(payload.playerName);
    }

    console.log(usernames);
    const { error, newUser } = addUser({
      id: socket.id,
      name: numberOfUsersInRoom === 0 ? "Player 1" : "Player 2",
      room: payload.room,
    });

    if (error) return callback(error);

    socket.join(newUser.room);

    io.to(newUser.room).emit("roomData", {
      room: newUser.room,
      users: getUsersInRoom(newUser.room),
    });

    socket.emit("currentUserData", {
      name: newUser.name,
      player1: usernames[0],
      player2: usernames[1],
    });

    if (usernames.length > 3) {
      usernames = [];
    }
    callback();
  });

  socket.on("initGameState", (gameState) => {
    const user = getUser(socket.id);
    if (user) io.to(user.room).emit("initGameState", gameState);
  });

  socket.on("updateGameState", (gameState) => {
    const user = getUser(socket.id);
    if (user) io.to(user.room).emit("updateGameState", gameState);
  });

  socket.on("sendMessage", (payload, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", {
      user: user.name,
      text: payload.message,
    });
    callback();
  });

  socket.on("disconnected", () => {
    const user = removeUser(socket.id);
    if (user)
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

    if (usernames.includes(user.name) === false) {
      usernames.push(user.name);
    }
  });
});

server.listen(port, () => {
  console.log(`server start on ${port}`);
});

module.exports = app;
