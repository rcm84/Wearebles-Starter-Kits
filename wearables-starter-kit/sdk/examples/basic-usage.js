const { WearablesClient } = require('../js');

(async () => {
  const client = new WearablesClient({
    baseUrl: 'http://localhost:8000',
    apiKey: 'demo'
  });

  const users = await client.getUsers();
  console.log('Users:', users);

  if (users[0]) {
    console.log('Workouts:', await client.getWorkouts(users[0].id));
    console.log('Sleep:', await client.getSleep(users[0].id));
    console.log('Activity:', await client.getActivity(users[0].id));
  }
})();
