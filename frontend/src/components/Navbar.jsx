import { Link } from 'react-router-dom';

export default function Navbar() {
  const username = localStorage.getItem('username');

  return (
    <nav className="bg-white p-4 shadow mb-6 flex justify-between">
      <div className="flex space-x-4">
        {/* Si el usuario está logueado mostramos Home y Crear Evento */}
        {username ? (
          <>
            <Link to="/" className="text-blue-600 hover:underline">Eventos</Link>
            <Link to="/create" className="text-blue-600 hover:underline">Crear Evento</Link>
          </>
        ) : (
          /* Si NO está logueado mostramos Login y Registrarse */
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Iniciar Sesión</Link>
            <Link to="/register" className="text-blue-600 hover:underline">Crear Cuenta</Link>
          </>
        )}
      </div>

      {/* Botón de Cerrar Sesión solo si está logueado */}
      {username && (
        <div>
          <button
            onClick={() => window.location.href = '/logout'}
            className="bg-red-600 p-2 rounded text-white hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}
