import axios from 'axios';
import { 
  demoServices, 
  demoTechnicians, 
  demoPayments 
} from '../utils/demoData';

// Modo demo: funciona completamente sin backend
const USE_DEMO_MODE = true; // Cambiar a false cuando tengas backend

// Detectar si estamos en producción
const isProduction = import.meta.env.MODE === 'production' || 
                     import.meta.env.PROD || 
                     (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1'));

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Construir baseURL
let baseURL;

if (USE_DEMO_MODE) {
  // Modo demo: no usar backend real
  baseURL = '/api/demo';
} else if (isProduction) {
  if (!API_URL) {
    console.error('❌ ERROR: VITE_API_URL no está configurada en Netlify.');
    baseURL = 'https://CONFIGURE_VITE_API_URL_IN_NETLIFY/api';
  } else {
    baseURL = API_URL;
  }
} else {
  // Desarrollo
  if (API_URL) {
    baseURL = API_URL;
  } else {
    baseURL = 'http://localhost:5000/api';
  }
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para modo demo - simular respuestas
if (USE_DEMO_MODE) {
  // Interceptar todas las peticiones y devolver datos demo
  api.interceptors.request.use((config) => {
    // Simular delay de red
    return new Promise((resolve) => {
      setTimeout(() => resolve(config), 100);
    });
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { method, url } = error.config || {};

      // Simular respuestas demo
      if (method === 'get') {
        if (url.includes('/services') || url === '/api/demo/services') {
          return Promise.resolve({
            data: { services: demoServices },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: error.config
          });
        }
        if (url.includes('/users/technicians') || url === '/api/demo/users/technicians') {
          return Promise.resolve({
            data: { technicians: demoTechnicians },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: error.config
          });
        }
        if (url.includes('/payments') || url === '/api/demo/payments') {
          return Promise.resolve({
            data: { payments: demoPayments },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: error.config
          });
        }
        if (url.includes('/health') || url === '/api/demo/health') {
          return Promise.resolve({
            data: { status: 'ok', mode: 'demo' },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: error.config
          });
        }
      }

      if (method === 'post') {
        if (url.includes('/login') || url === '/api/demo/login') {
          const { email, password } = JSON.parse(error.config.data || '{}');
          const token = `demo-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const user = {
            _id: 'demo-user-1',
            name: email.split('@')[0] || 'Usuario',
            email: email,
            role: 'admin',
            isActive: true
          };
          return Promise.resolve({
            data: { token, user },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: error.config
          });
        }
      }

      return Promise.reject(error);
    }
  );
}

// Log para debugging
if (USE_DEMO_MODE) {
  console.log('🎮 Modo Demo activado - Funciona completamente sin backend');
  console.log('✅ Acepta cualquier email/contraseña para login');
} else if (isProduction) {
  if (API_URL) {
    console.log('🌐 Producción - API URL:', baseURL);
  } else {
    console.error('❌ PRODUCCIÓN SIN API URL CONFIGURADA');
  }
} else {
  console.log('🔧 Desarrollo - API URL:', baseURL);
}

export default api;
