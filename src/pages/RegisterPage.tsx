import React, { useState } from 'react';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';
import EyeIcon from '../components/EyeIcon';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
}

export default function RegisterPage({ onRegisterSuccess }: RegisterPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('El usuario es obligatorio');
      return;
    }
    if (!password) {
      setError('La contraseña es obligatoria');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const { token } = await authService.register({ username, password });
      localStorage.setItem('token', token);
      onRegisterSuccess();
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('Datos inválidos o usuario ya existe');
      } else {
        setError('Ocurrió un error al registrar');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Usuario:</label>
          <input
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium mb-1">Contraseña:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute inset-y-11 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
            tabIndex={-1}
          >
             <EyeIcon name={showPassword ? 'eye-off' : 'eye'} className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1">Repetir contraseña:</label>
          <input
            type={showConfirm ? 'text' : 'password'}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-100 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(prev => !prev)}
            className="absolute inset-y-11 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
            tabIndex={-1}
          >
             <EyeIcon name={showConfirm ? 'eye-off' : 'eye'} className="h-6 w-6" />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 transition mb-3 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registrando…' : 'Registrarse'}
        </button>

        <Link
          to="/login"
          className="w-full block text-center text-gray-400 hover:text-gray-200 transition"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
      </form>
    </div>
  );
}
