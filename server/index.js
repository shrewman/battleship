const http = require('http');
const cors = require('cors');
const express = require('express');
const socketUtils = require('./utils/socketUtils');

const app = express();
const server = http.createServer(app);

const io = socketUtils.sio(server);
socketUtils.connection(io);

const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
}

app.use(cors());

app.use("/api/v1/hello", socketIOMiddleware, (req, res) => {
  req.io.emit("message", `Hello, ${req.originalUrl}`);
  res.send("hello world!");
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.post('/data', (req, res) => {
//   res.send('Received POST request');
// });

// app.get('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   res.send(`User ID: ${userId}`);
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('message', (data) => {
//     console.log('Received message:', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });
