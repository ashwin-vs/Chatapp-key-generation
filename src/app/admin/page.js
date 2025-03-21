// app/admin/page.js
"use client"; // Mark this as a Client Component
import { useState } from "react";

export default function AdminPage() {
  const [secretKey, setSecretKey] = useState("");

  const generateSecretKey = () => {
    const randomKey = Math.random().toString(36).substring(2, 10); // Generate a random key
    setSecretKey(randomKey);
    // Store the secret key in memory or a database (e.g., using an API route)
    fetch("/api/store-secret-key", {
      method: "POST",
      body: JSON.stringify({ secretKey: randomKey }),
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-5">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Admin Panel</h2>
      <button
        onClick={generateSecretKey}
        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Generate Secret Key
      </button>
      {secretKey && (
        <div className="mt-4">
          <p className="text-gray-700">Secret Key: <strong>{secretKey}</strong></p>
        </div>
      )}
    </div>
  );
}