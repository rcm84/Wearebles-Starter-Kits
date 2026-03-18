export class WearablesClient {
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async request(path) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: { 'x-api-key': this.apiKey }
    });
    return response.json();
  }

  getUsers() { return this.request('/users'); }
  getWorkouts(userId) { return this.request(`/users/${userId}/workouts`); }
  getSleep(userId) { return this.request(`/users/${userId}/sleep`); }
  getActivity(userId) { return this.request(`/users/${userId}/activity`); }
}
