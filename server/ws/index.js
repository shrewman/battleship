const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// WebSocket connection handling
wss.on("connection", (ws) => {
    console.log("Client connected");

    // Handle messages from clients
    ws.on("message", (message) => {
        const data = JSON.parse(message);
        console.log("Received: ", data);
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({ type: "response", message: "hello" }));
        });

        // Process the message and update the game state
        // For simplicity, let's assume the message is a JSON object
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        // Handle cleanup or update game state as needed
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});
