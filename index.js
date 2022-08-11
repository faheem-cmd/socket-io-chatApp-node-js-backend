const express = require("express");
var app = express();
var cors = require("cors");
var mongoose = require("./services/mongoose");
app.use(cors());
require("dotenv").config();
const path = require("path");

const router = require("./routes/user.router");

const User = require("./models/user.models");

const http = require("http");
const { Server } = require("socket.io");
const { success, error } = require("consola");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://192.168.10.79:3000",
    origin: "http://localhost:3000",

    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const temp = [{}];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    // console.log(data);
    socket.join(data);
  });

  socket.on("name", (data) => {
    console.log(data, "hh");
    socket.join(data);
  });

  socket.on("ferret", (name, fn) => {
    User.find({}).then((data) => {
      fn(data);
    });
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
    socket.to(data.name).emit("receive_message", data);
  });
});

const dbName = "myChat";
mongoose(`mongodb://0.0.0.0:27017/${dbName}`);
app.get("/", function (req, res) {
  res.send("hello world");
});
app.use("/", router);
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
