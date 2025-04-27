const API_URL = 'http://127.0.0.1:8000/events';

const eventService = {
  list: async () => {
    const username = localStorage.getItem('username');
    const response = await fetch(`${API_URL}?username=${username}`);
    if (!response.ok) throw new Error('Error al cargar eventos');
    return response.json();
  },

  create: async (eventData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    if (!response.ok) throw new Error('Error al crear evento');
    return response.json();
  }
};

export default eventService;
