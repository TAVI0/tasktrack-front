import './App.css'
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import RegisterPage from './pages/RegisterPage';
import { healthService } from './services/healthService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem('token')
  );
  const [appReady, setAppReady] = useState(false);
  const [appError, setAppError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const checkHealth = useCallback(() => {
    setAppReady(false);
    setAppError(false);
    healthService.check().then(ok => {
      if (ok) setAppReady(true);
      else setAppError(true);
    });
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, []);

  if (appError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-900 text-gray-100">
        <p className="text-red-500">No se pudo conectar con el servicio.</p>
        <button
          onClick={checkHealth}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!appReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <p className="text-gray-300">Cargando aplicación…</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/" replace />
            : <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated
            ? <TasksPage onLogout={handleLogout} />
            : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated
            ? <Navigate to="/" replace />
            : <RegisterPage onRegisterSuccess={() => setIsAuthenticated(true)} />
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}


export default App
