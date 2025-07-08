const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 10000 });

console.log("🚀 WebSocket server running on port 10000");

server.on("connection", (socket) => {
  console.log("📲 New client connected");

  socket.on("message", (message) => {
    console.log("📤 Received:", message);

    // Broadcast to all connected clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on("close", () => {
    console.log("🔌 Client disconnected");
  });
});
