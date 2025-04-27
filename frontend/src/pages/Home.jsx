import React, { useEffect, useState } from 'react';
import eventService from '../api/eventService';
import categoryService from '../api/categoryService'; // 👈 Importado correctamente


export default function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);  // 👈
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      eventService.list(),
      categoryService.list()
    ])
      .then(([eventsData, categoriesData]) => {
        setEvents(eventsData);
        setFilteredEvents(eventsData);
        setCategories(categoriesData);
      })
      .catch(err => {
        console.error('Error al cargar eventos o categorías:', err);
        setError('Error al cargar los datos');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = events.filter(evt => evt.category === selectedCategory);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [selectedCategory, events]);

  if (loading) {
    return <div className="text-center mt-10">Cargando eventos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Lista de Eventos</h1>

      {/* Selector de Categoría */}
      <div className="flex justify-center mb-6">
        <select
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las Categorías</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(evt => (
          <div key={evt.id} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{evt.name}</h2>
            <p className="text-gray-600 mb-2">{evt.description || 'Sin descripción'}</p>
            <p className="text-gray-500 text-sm">
              {new Date(evt.start_time).toLocaleString()} - {new Date(evt.end_time).toLocaleString()}
            </p>
            {evt.location && (
              <p className="text-gray-500 text-sm">Ubicación: {evt.location}</p>
            )}
            {/* 👇 Mostrar categoría */}
            {evt.category && (
              <p className="text-gray-500 text-sm mt-1">Categoría: {evt.category}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
