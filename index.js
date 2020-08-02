const express = require("express");
const path = require("path");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

const {
  addUsers,
  getCurrentUser,
  removeUser,
  usersOnTheRoom,
} = require("./utils/users");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/chat.html");
});

io.on("connection", (socket) => {
  socket.on("user connected", ({ name, room }) => {
    let users = addUsers(socket.id, name, room);
    socket.join(room);
    io.to(room).emit("room users", usersOnTheRoom(room));
  });

  socket.on("send message", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("receive message", msg);
  });

  socket.on("disconnect", () => {
    let user = removeUser(socket.id);
    if (user) io.to(user.room).emit("room users", usersOnTheRoom(user.room));
  });
});

http.listen(port, function () {
  console.log("listening on port:" + port);
});
