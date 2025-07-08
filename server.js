const http = require('http');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("WebSocket server is running.");
});

// Attach WebSocket server to the HTTP server
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', function connection(ws) {
  if (clients.length >= 2) {
    ws.close();
    return;
  }

  clients.push(ws);
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function () {
    clients = clients.filter(c => c !== ws);
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
