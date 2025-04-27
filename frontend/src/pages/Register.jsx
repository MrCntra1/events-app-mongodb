import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
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
      const response = await fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Error de registro');
      }
      setSuccess('Registro exitoso');
      setTimeout(() => {
        navigate('/login');  // ✅ Después de 1.5 segundos, redirige al login
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl mb-6">Registrarse</h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <button type="submit" className="w-full bg-green-600 p-2 rounded hover:bg-green-700">
          Registrarse
        </button>
      </form>

      {/* 👇 Agregado para ir directo al Login si quiere */}
      <div className="mt-4">
        <p>¿Ya tienes cuenta? <Link to="/login" className="text-blue-400 underline">Iniciar Sesión</Link></p>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
