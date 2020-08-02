var socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendButton = document.getElementById("sendButton");
const params = new URLSearchParams(window.location.search);
const usersList = document.getElementById("users-list");

$(document).ready(function () {
  socket.emit("user connected", {
    name: params.get("name"),
    room: params.get("room"),
  });
});

const sendMessage = () => {
  socket.emit("send message", input.value);
};
socket.on("new user", (users) => {
  refreshUsersList(users);
});

socket.on("receive message", (msg) => {
  $("#messages").append($("<li>").text(msg));
});

socket.on("message", (msg) => {});

socket.on("room users", (users) => {
  refreshUsersList(users);
});

function refreshUsersList(users) {
  usersList.innerHTML = `
   ${users.map((user) => `<li>${user.name}</li>`).join("")}
  `;
}
