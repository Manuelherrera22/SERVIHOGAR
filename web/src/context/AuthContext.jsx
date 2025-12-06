import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext({});

// Modo demo: funciona completamente sin backend
const USE_DEMO_MODE = true; // Cambiar a false cuando tengas backend

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (USE_DEMO_MODE) {
      // Modo demo: verificar token en localStorage
      const token = localStorage.getItem('token');
      if (token && token.startsWith('demo-token-')) {
        // Usuario demo
        const user = {
          _id: 'demo-user-1',
          name: 'Administrador',
          email: localStorage.getItem('demo-email') || 'admin@servihome.com',
          role: 'admin',
          isActive: true
        };
        setUser(user);
      }
      setLoading(false);
      return;
    }

    // Modo real: llamar al backend
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Aquí iría la llamada real al backend
        // const response = await api.get('/auth/me');
        // setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    if (USE_DEMO_MODE) {
      // Modo demo: acepta cualquier email/contraseña
      const token = `demo-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const user = {
        _id: 'demo-user-1',
        name: email.split('@')[0] || 'Usuario',
        email: email,
        role: 'admin',
        isActive: true
      };

      localStorage.setItem('token', token);
      localStorage.setItem('demo-email', email);
      setUser(user);
      
      return { success: true };
    }

    // Modo real: llamar al backend
    try {
      // const response = await api.post('/auth/login', { email, password });
      // const { token, user } = response.data;
      // localStorage.setItem('token', token);
      // setUser(user);
      // return { success: true };
      return { success: false, message: 'Backend no configurado' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error al iniciar sesión'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('demo-email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
