import React, { useState, useEffect } from 'react';
import eventService from '../api/eventService';
import categoryService from '../api/categoryService';

function formatToISO(dateLocal) {
  return new Date(dateLocal).toISOString();
}

export default function CreateEvent() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    start_time: '',
    end_time: '',
    location: '',
    category: ''  // 👈 añadimos categoría
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    categoryService.list()
      .then(setCategories)
      .catch(err => console.error('Error cargando categorías:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const username = localStorage.getItem('username');
      if (!username) {
        throw new Error('No estás logueado');
      }

      const eventData = {
        ...form,
        start_time: formatToISO(form.start_time),
        end_time: formatToISO(form.end_time),
        username
      };

      await eventService.create(eventData);
      setSuccess('Evento creado correctamente');
      setForm({
        name: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        category: ''
      });
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Crear Evento</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre del Evento"
          value={form.name}
          onChange={handleChange}
          className="block w-full border rounded p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        <input
          type="datetime-local"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          className="block w-full border rounded p-2"
          required
        />
        <input
          type="datetime-local"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          className="block w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={form.location}
          onChange={handleChange}
          className="block w-full border rounded p-2"
        />
        
        {/* 👇 Selector de categoría */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="block w-full border rounded p-2"
          required
        >
          <option value="">Seleccionar Categoría</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Crear Evento
        </button>
      </form>
    </div>
  );
}
