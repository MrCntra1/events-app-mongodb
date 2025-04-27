import { useEffect } from 'react';

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem('username');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl">Cerrando sesión...</h1>
    </div>
  );
}
