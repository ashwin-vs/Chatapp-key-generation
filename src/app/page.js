'use client'; // Mark this as a Client Component

import { useEffect, useRef, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const wsRef = useRef(null);

  useEffect(() => {
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const reconnectDelay = 5000;
  
    const connectWebSocket = () => {
      const ws = new WebSocket('wss://chatapp-key-generation.onrender.com');
  
      ws.onopen = () => {
        console.log('WebSocket connection established.');
        reconnectAttempts = 0; // Reset reconnection attempts
      };
  
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Handle incoming messages
      };
  
      ws.onclose = () => {
        console.log('WebSocket connection closed.');
        if (reconnectAttempts < maxReconnectAttempts) {
          console.log(`Reconnecting in ${reconnectDelay / 1000} seconds...`);
          setTimeout(connectWebSocket, reconnectDelay);
          reconnectAttempts++;
        } else {
          console.error('Max reconnection attempts reached. Please refresh the page.');
        }
      };
  
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      wsRef.current = ws;
    };
  
    connectWebSocket();
  
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (inputValue.trim()) {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ message: inputValue }));
        setInputValue('');
      } else {
        console.error('WebSocket is not open. Please wait for the connection to be established.');
      }
    } else {
      console.error('Message is empty.');
    }
  };
  return (
    <ProtectedRoute>
      <div className="p-5 font-sans max-w-lg mx-auto bg-white rounded-lg shadow-md h-screen">
        <h1 className="text-2xl font-bold text-center mb-4">Chat Application</h1>
        <div className="text-xl text-black mb-2">Status:  heloo</div>
        <div className="border border-gray-300 rounded-lg p-4 h-190 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-3">
              {msg.system ? (
                <em className="text-blue-600">{msg.message}</em>
              ) : (
                <>
                  <strong className="text-blue-600">User {msg.userId}:</strong> {msg.message}
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}