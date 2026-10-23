import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, setCsrfToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Verificar si existe una sesión activa al cargar la aplicación
  const checkSession = useCallback(async () => {
    try {
      const data = await api.get('/api/auth/me');
      if (data && data.authenticated && data.user) {
        setUser(data.user);
        if (data.csrf_token) {
          setCsrfToken(data.csrf_token);
        }
      } else {
        setUser(null);
      }
    } catch {
      // Sin sesión activa o cookie inválida
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Iniciar sesión
  const login = async (email, password) => {
    setAuthError(null);
    const data = await api.post('/api/auth/login', { email, password });
    if (data.csrf_token) {
      setCsrfToken(data.csrf_token);
    }
    setUser(data.user);
    return data.user;
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await api.post('/api/auth/logout', {});
    } catch (err) {
      console.warn('Error en logout:', err);
    } finally {
      setUser(null);
      setCsrfToken('');
    }
  };

  // Refrescar datos del usuario actual
  const refreshUser = async () => {
    await checkSession();
  };

  const value = {
    user,
    loading,
    authError,
    setAuthError,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMINISTRADOR',
    isAlmacen: user?.role === 'ALMACEN',
    isCliente: user?.role === 'CLIENTE'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
