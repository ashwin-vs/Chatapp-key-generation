// lib/websocket.js
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer({ port: 3001 });

const users = new Map(); // Store connected users

wss.on('connection', (ws,req) => {

  const origin = req.headers.origin;
  if (origin !== 'https://chatapp-key-generation.onrender.com/') {
    ws.close(); // Close the connection if the origin is not allowed
    return;
  }
  const userId = uuidv4(); // Generate a unique ID for the user
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

export default wss;