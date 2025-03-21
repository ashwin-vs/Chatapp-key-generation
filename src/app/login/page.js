'use client'; // Mark this as a Client Component
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Fetch the secret key from the server
    const response = await fetch('/api/store-secret-key');
    const { secretKey: validSecretKey } = await response.json();

    // Validate the secret key
    if (secretKey !== validSecretKey) {
      setError('Invalid secret key');
      return;
    }

    // Call the `signIn` function from next-auth
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to the dashboard or home page after successful login
      window.location.href = '/';
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-5"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-left font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-left font-semibold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Secret Key Field */}
        <div className="mb-4">
          <label className="block text-left font-semibold text-gray-700 mb-2">Secret Key</label>
          <input
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Enter secret key"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </button>

        {/* Register Link */}
        <div className="mt-4">
          New User? <Link className="ms-4 text-blue-400" href="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}