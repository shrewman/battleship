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
    });
});
