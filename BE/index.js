const express = require("express");
const { createServer } = require("http"); //create a server
const { Server } = require("socket.io"); //create a socket server

const app = express();
// initiate socket server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// io: an instance of the Socket.IO SERVER
// socket: CLIENT (connection between a client and a server)
// .on: ready to receive events
// .emit: ready to send events

let counter = 0;
io.on("connection", (socket) => {
  console.log(socket.id);
  io.emit("send-id", socket.id);
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} has been disconnected.`);
  });
  socket.on("increment-request", () => {
    counter++;
    io.emit("increment-response", counter);
  });
});

// io.on("connection", (socket) => {

//     socket.on("join", (room) => {
//         socket.rooms.forEach(room => socket.leave(room))

//         socket.join(room);

//     });

//     socket.on("client-chat", (data) => {

//         // io.emit("data-chat", data);

//         io.to(data.room).emit("data-chat", data);

//     })

//     socket.on("disconnect", (reason) => {
//         console.log(socket.id, reason)
//     })

// });

httpServer.listen(8080);
