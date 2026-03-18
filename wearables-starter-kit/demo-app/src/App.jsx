import React, { useEffect, useMemo, useState } from 'react';
import { WearablesClient } from './client';

export default function App() {
  const client = useMemo(
    () => new WearablesClient({ baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000', apiKey: 'demo' }),
    []
  );
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [sleep, setSleep] = useState({ sleep: [], heartRateSummary: [] });
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    client.getUsers().then((data) => {
      setUsers(data);
      if (data[0]) setSelectedId(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    client.getWorkouts(selectedId).then(setWorkouts);
    client.getSleep(selectedId).then(setSleep);
    client.getActivity(selectedId).then(setActivity);
  }, [selectedId]);

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Demo App (SDK Usage)</h1>
      <h2>Lista de usuarios</h2>
      <select onChange={(e) => setSelectedId(e.target.value)} value={selectedId || ''}>
        {users.map((u) => <option key={u.id} value={u.id}>{u.username}</option>)}
      </select>
      <h2>Perfil de usuario</h2>
      <pre>{JSON.stringify(users.find((u) => String(u.id) === String(selectedId)) || {}, null, 2)}</pre>
      <h2>Workouts</h2>
      <pre>{JSON.stringify(workouts, null, 2)}</pre>
      <h2>Sleep summary</h2>
      <pre>{JSON.stringify(sleep, null, 2)}</pre>
      <h2>Activity summary</h2>
      <pre>{JSON.stringify(activity, null, 2)}</pre>
    </main>
  );
}
