import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Navbar from './components/Navbar';

function App() {
  const username = localStorage.getItem('username');
  const isLoggedIn = !!username;

  return (
    <BrowserRouter>
      {/* Mostrar navbar solo si está logueado */}
      {isLoggedIn && <Navbar />}

      <div className="px-4">
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateEvent />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
