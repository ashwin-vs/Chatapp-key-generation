import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

const users = new Map(); // Store connected users

wss.on('connection', (ws) => {
  const userId = Math.random().toString(36).substring(7); // Generate a random user ID
  users.set(userId, ws);

  console.log(`User connected: ${userId}`);

  // Send a welcome message to the user
  ws.send(JSON.stringify({ type: 'welcome', userId }));

  // Broadcast to all users when someone joins
  broadcast({ type: 'user-connected', userId });

  // Handle incoming messages
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    broadcast({ type: 'message', userId, message: data.message });
  });

  // Handle user disconnection
  ws.on('close', () => {
    users.delete(userId);
    broadcast({ type: 'user-disconnected', userId });
    console.log(`User disconnected: ${userId}`);
  });
});

// Function to broadcast messages to all connected users
function broadcast(message) {
  users.forEach((user) => {
    user.send(JSON.stringify(message));
  });
}

console.log('WebSocket server is running on ws://localhost:3001');