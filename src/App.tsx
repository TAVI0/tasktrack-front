import './App.css'
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem('token')
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, []);

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
