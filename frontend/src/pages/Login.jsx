import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Error de login');
      }
      setSuccess(data.message);
      localStorage.setItem('username', form.username);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl mb-6">Iniciar Sesión</h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input
          type="text"
          name="username"
          placeholder="Nombre de Usuario"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>

      {/* 👇 Agregado enlace para crear cuenta */}
      <div className="mt-4">
        <p>¿No tienes cuenta? <Link to="/register" className="text-blue-400 underline">Regístrate aquí</Link></p>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
