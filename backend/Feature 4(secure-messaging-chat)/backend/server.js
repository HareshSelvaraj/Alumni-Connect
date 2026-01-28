const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { filterMessage } = require("./keywordFilter");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const connectedUsers = {}; // socket.id -> userId

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ roomId, userId }) => {
    connectedUsers[socket.id] = userId;
    socket.join(roomId);
    console.log(`${userId} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, message, sender }) => {
    if (!filterMessage(message)) {
      socket.emit("blockedMessage", "Your message contains inappropriate content.");
      return;
    }
    io.to(roomId).emit("receiveMessage", { message, sender });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete connectedUsers[socket.id];
  });
});

server.listen(3000, () => {
  console.log("✅ Server listening on http://localhost:3000");
});
