import { useState } from 'react';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Por favor ingresa usuario y contraseña');
      return;
    }

    setLoading(true);
    try {
      const { token } = await authService.login({ username, password });
      localStorage.setItem('token', token);
      onLoginSuccess();
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Credenciales incorrectas');
      } else {
        setError('Ha ocurrido un error. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Usuario:</label>
          <input
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Contraseña:</label>
          <input
            type="password"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition mb-3 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>

        <Link
          to="/register"
          className="w-full block bg-green-600 text-white py-2 rounded text-center hover:bg-green-500 transition"
        >
          Registrarse
        </Link>
      </form>
    </div>
  );
}
