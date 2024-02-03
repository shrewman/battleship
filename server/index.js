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

const games = [];

function generateRandomRoom() {
    return Math.floor(100000 + Math.random() * 900000);
}

const convertToGameBoard = (board) => {
    return board.map((menuCell) => {
        const { position, state } = menuCell;
        const gameCell = {
            position,
            belongsTo: "P2",
            state,
        };
        return gameCell;
    });
};

const containsShips = (board) => {
    return board.some((cell) => cell.state === "ship");
};

io.on("connection", (socket) => {
    console.log(`User '${socket.id}' is connected`);

    socket.on("create_room", (board, shipCount) => {
        let room;
        do {
            room = generateRandomRoom();
        } while (games.some((game) => game.room === room));

        const newGame = {
            room,
            isGameStarted: false,
            P1: { id: socket.id, number: 1, board, score: 0 },
            P2: null,
            shipCount,
            turn: null,
        };
        games.push(newGame);
        socket.join(room);
        console.log(`P1 joined room ${room} with set of ships: ${shipCount}`);
        io.emit("get_room_code", room);
    });

    socket.on("join_room", (room, board, shipCount) => {
        const game = games.find((game) => game.room === room);
        console.log(game);
        if (!game) {
            socket.emit(
                "error",
                new Error("There is no game with this room code.")
            );
            return;
        }
        if (!_.isEqual(game.shipCount, shipCount)) {
            socket.emit(
                "error",
                new Error("Players must have the same set of ships.")
            );
            return;
        }
        game.P2 = { id: socket.id, number: 2, board, score: 0 };
        socket.join(room);
        console.log(`P2 joined room ${room} with set of ships: ${shipCount}`);

        const P1 = game.P1.id;
        const P2 = socket.id;
        const boardP1 = convertToGameBoard(game.P1.board);
        const boardP2 = convertToGameBoard(game.P2.board);
        const turn = Math.random() < 0.5 ? 1 : 2;
        game.turn = turn;

        io.to(P1).emit("start_game", 1, turn);
        io.to(P2).emit("start_game", 2, turn);
    });

    socket.on("fire", (room, position) => {
        const game = games.find((game) => game.room === room);

        const player = game[`P${game.turn}`];
        const targetPlayer = game[`P${game.turn === 1 ? 2 : 1}`];
        const targetBoard = targetPlayer.board;

        const targetCellIndex = targetBoard.findIndex((cell) =>
            _.isEqual(cell.position, position)
        );

        if (targetCellIndex === -1) {
            socket.emit("error", new Error("Invalid position."));
            return;
        }

        const passTurn = () => {
            game.turn = game.turn === 1 ? 2 : 1;
        };

        const state = targetBoard[targetCellIndex].state;
        let newState;
        if (state === "free") {
            newState = "miss";
            passTurn();
        } else if (targetBoard[targetCellIndex].state === "ship") {
            newState = "hit";
            player.score += 20;
        } else if (targetBoard[targetCellIndex].state === "hit") {
            return;
        }
        targetBoard[targetCellIndex].state = newState;

        console.log(`Player ${player.number} fired: ${newState}`);

        const response = {
            position,
            state: newState,
            belongsTo: targetPlayer.number,
        };

        io.to(room).emit("fire_result", response, game.turn);
        io.to(player.id).emit("update_score", player.score);

        if (!containsShips(targetBoard)) {
            const countStates = (board, state) =>
                board.filter((cell) => cell.state === state).length;

            const resultsWon = {
                won: true,
                misses: countStates(targetPlayer.board, "miss") ?? 0,
                hits: countStates(targetPlayer.board, "hit") ?? 0,
                score: player.score ?? 0,
            };

            const resultsLost = {
                won: false,
                misses: countStates(player.board, "miss") ?? 0,
                hit: countStates(player.board, "hit") ?? 0,
                score: player.score ?? 0,
            };

            io.to(player.id).emit("game_result", resultsWon);
            io.to(targetPlayer.id).emit("game_result", resultsLost);
        }
    });

    socket.on("disconnect", () => {
        console.log("User is disconnected");
>>>>>>> battleship-game/main
    });
});
