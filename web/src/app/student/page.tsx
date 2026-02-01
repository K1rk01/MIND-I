'use client';

import { useState } from 'react';

export default function StudentDashboard() {
  const [emoji, setEmoji] = useState('');
  const [text, setText] = useState('');

  const submitCheckIn = async () => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ emoji, text }),
    });
    alert('Check-in submitted');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Student Check-In</h1>
      <input
        type="text"
        placeholder="Emoji"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        className="w-full p-2 mb-4 border"
      />
      <textarea
        placeholder="How are you feeling?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 mb-4 border"
      />
      <button onClick={submitCheckIn} className="bg-blue-500 text-white p-2">
        Submit
      </button>
    </div>
  );
}