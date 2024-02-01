const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

<<<<<<< HEAD
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

io.on("connection", (socket) => {
    console.log(`Пользователь ${socket.id} подключен`);

    socket.on("join_room", (code) => {
        socket.join(code);
        console.log(`User ${socket.id} joined room ${code}`);
    });

    socket.on("send_message", (data) => {
        const { message, roomCode } = data;
        socket.to(roomCode).emit("receive_message", data);
        console.log(`${socket.id} sent "${message}" to room ${roomCode}`);
    });

    socket.on("disconnect", () => {
        console.log("Пользователь отключен");
=======
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
    console.log(`User '${socket.id}' is connected`);

    socket.on("send_board", (board) => {
        // ...
        // socket.to(roomCode).emit("start_game", data);
    });


    socket.on("disconnect", () => {
        console.log("User is disconnected");
>>>>>>> battleship-game/main
    });
});
