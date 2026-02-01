'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleLogin = async () => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      // Redirect based on role
      window.location.href = `/${role}`;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Mind&I Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border"
        >
          <option value="student">Student</option>
          <option value="counsellor">Counsellor</option>
          <option value="school_admin">School Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2">
          Login
        </button>
      </div>
    </div>
  );
}
