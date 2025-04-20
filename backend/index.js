// Install the required dependencies using:
// npm install express socket.io serialport @serialport/parser-readline cors

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const server = http.createServer(app);

// Allow React (localhost:3000) to connect
app.use(cors());
app.use(express.static('public')); // if you copy your React build into backend/public

// Socket.IO on top of our HTTP server
const io = new Server(server, { cors: { origin: '*' } });

let lightStatus = 'OFF';

// Open your Arduino’s COM port (update COM3 if yours is different)
const port = new SerialPort({ path: 'COM3', baudRate: 9600 });

// Parse data coming over serial as lines
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (line) => {
  const msg = line.trim();
  lightStatus = (msg === 'ON') ? 'ON' : 'OFF';
  console.log(`Arduino → ${msg}, broadcasting → ${lightStatus}`);
  io.emit('lightStatus', lightStatus);
});

// When a new client connects, send the current status immediately
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('lightStatus', lightStatus);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
