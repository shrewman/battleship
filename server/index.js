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
            P1: { id: socket.id, board },
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
        game.P2 = { id: socket.id, board };
        socket.join(room);
        console.log(`P2 joined room ${room} with set of ships: ${shipCount}`);

        const P1 = game.P1.id;
        const P2 = socket.id;
        const boardP1 = convertToGameBoard(game.P1.board);
        const boardP2 = convertToGameBoard(game.P2.board);
        const turn = Math.random() < 0.5 ? 1 : 2;
        game.turn = turn;

        io.to(P1).emit("start_game", boardP2, 1, turn);
        io.to(P2).emit("start_game", boardP1, 2, turn);
    });

    socket.on("fire", (room, position) => {
        const game = games.find((game) => game.room === room);

        const player = game.turn;
        const targetPlayer = player === 1 ? 2 : 1;
        const targetBoard = player === 1 ? game.P2.board : game.P1.board;

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
        } else if (targetBoard[targetCellIndex].state === "hit") {
            return;
        }
        targetBoard[targetCellIndex].state = newState;

        console.log(`Player ${player} fired: ${newState}`);

        const response = {
            position,
            state: newState,
            belongsTo: targetPlayer,
        };

        io.to(room).emit("fire_result", response, game.turn);
    });

    socket.on("disconnect", () => {
        console.log("User is disconnected");
    });
});
