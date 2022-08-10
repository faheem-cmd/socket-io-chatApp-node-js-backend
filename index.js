const express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
require("dotenv").config();
const path = require("path");

const http = require("http");
const { Server } = require("socket.io");
const { success, error } = require("consola");
const socketio = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://192.168.10.79:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("name", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    socket.to(data.name).emit("receive_message", data);
  });
});

// server.listen(3001, () => {
//   console.log("SERVER IS RUNNING");
// });
server.listen(process.env.PORT, () => {
  success({
    message: `Successfully connected to socket `,
    badge: true,
  });

  success({
    message: `Server is running on \n${process.env.PORT}`,
    badge: true,
  });
});
