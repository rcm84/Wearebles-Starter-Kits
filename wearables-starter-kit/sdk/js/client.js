class WearablesClient {
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async _request(path) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`);
    }

    return res.json();
  }

  getUsers() {
    return this._request('/users');
  }

  getWorkouts(userId) {
    return this._request(`/users/${userId}/workouts`);
  }

  getSleep(userId) {
    return this._request(`/users/${userId}/sleep`);
  }

  getActivity(userId) {
    return this._request(`/users/${userId}/activity`);
  }
}

module.exports = { WearablesClient };
