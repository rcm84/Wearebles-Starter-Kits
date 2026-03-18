import React, { useEffect, useState } from 'react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [sleep, setSleep] = useState({ sleep: [], heartRateSummary: [] });
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/users`).then((r) => r.json()).then((data) => {
      setUsers(data);
      if (data[0]) setSelectedUser(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
    fetch(`${baseUrl}/users/${selectedUser}/workouts`).then((r) => r.json()).then(setWorkouts);
    fetch(`${baseUrl}/users/${selectedUser}/sleep`).then((r) => r.json()).then(setSleep);
    fetch(`${baseUrl}/users/${selectedUser}/activity`).then((r) => r.json()).then(setActivity);
  }, [selectedUser]);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Wearables Dashboard</h1>
      <section>
        <h2>Home</h2>
        <p>Visualización rápida de datos demo del starter kit.</p>
      </section>
      <section>
        <h2>Users</h2>
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser || ''}>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.username} ({u.device_provider})</option>
          ))}
        </select>
      </section>
      <section>
        <h2>Workouts</h2>
        <ul>{workouts.map((w) => <li key={w.id}>{w.workout_date}: {w.workout_type} ({w.duration_minutes} min)</li>)}</ul>
      </section>
      <section>
        <h2>Sleep</h2>
        <ul>{sleep.sleep.map((s) => <li key={s.id}>{s.sleep_date}: {s.total_minutes} min</li>)}</ul>
      </section>
      <section>
        <h2>Activity</h2>
        <ul>{activity.map((a) => <li key={a.id}>{a.activity_date}: {a.steps} steps</li>)}</ul>
      </section>
    </main>
  );
}
