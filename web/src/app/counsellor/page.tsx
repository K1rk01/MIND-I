'use client';

import { useEffect, useState } from 'react';

interface Alert {
  _id: string;
  checkInId: { emoji: string; text: string; riskLevel: string };
  status: string;
  notes: { text: string; timestamp: string }[];
}

export default function CounsellorDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/counsellors/alerts', {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setAlerts(data);
    };
    fetchAlerts();
  }, []);

  const updateAlert = async (id: string, status: string, notes: string) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/counsellors/alert/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ status, notes }),
    });
    // Refresh alerts
    window.location.reload();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Counsellor Dashboard</h1>
      {alerts.map((alert) => (
        <div key={alert._id} className="border p-4 mb-4">
          <p>Emoji: {alert.checkInId.emoji}</p>
          <p>Text: {alert.checkInId.text}</p>
          <p>Risk: {alert.checkInId.riskLevel}</p>
          <p>Status: {alert.status}</p>
          <button onClick={() => updateAlert(alert._id, 'reviewed', 'Reviewed')}>Mark Reviewed</button>
        </div>
      ))}
    </div>
  );
}