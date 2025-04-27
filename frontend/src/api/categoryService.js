const API_URL = 'http://127.0.0.1:8000/categories';

const categoryService = {
  list: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar categorías');
    return response.json();
  }
};

export default categoryService;
