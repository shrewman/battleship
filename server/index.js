const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const _ = require("lodash");

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

const players = {};

function generateRandomRoom() {
    return Math.floor(100000 + Math.random() * 900000);
}

io.on("connection", (socket) => {
    console.log(`User '${socket.id}' is connected`);

    socket.on("join_room", (room, board, shipCount) => {
        console.log("Joined room ", room);
    })

    socket.on("create_room", (board, shipCount) => {
        console.log("Created room ", generateRandomRoom());
    })


    socket.on("join_game", (board, shipCount) => {
        let room;

        if (!players["P1"]) {
            players["P1"] = { socket, board, shipCount };
            room = generateRandomRoom();
            socket.emit("player_assigned", "P1");
        } else if (!players["P2"]) {
            if (_.isEqual(players["P1"].shipCount, shipCount))
                console.log("equal!");
            players["P2"] = { socket, board, shipCount };
            socket.emit("player_assigned", "P2");

            io.to(room).emit("start_game");
        } else {
            socket.emit("game_full");
        }
    });

    socket.on("disconnect", () => {
        console.log("User is disconnected");
    });
});
