var socket = io();

const form = document.getElementById("chat-form");
const inputNickname = document.getElementById("input-nickname");
const messages = document.getElementById("messages");
const params = new URLSearchParams(window.location.search);

$(document).ready(function () {
  console.log(params.get("nickname"));
  socket.emit("user connected", params.get("nickname"));
});

socket.on("chat message", function (msg) {
  $("#messages").append($("<li>").text(msg));
});
