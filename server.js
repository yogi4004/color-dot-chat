const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', socket => {
  console.log('🔌 New client connected');

  socket.on('message', message => {
    console.log('📨 Received:', message);
    wss.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`);
});
