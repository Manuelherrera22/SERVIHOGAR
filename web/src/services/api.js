import axios from 'axios';

// Detectar si estamos en producción
const isProduction = import.meta.env.MODE === 'production' || 
                     import.meta.env.PROD || 
                     (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1'));

// Get API URL from environment variables
// En producción, VITE_API_URL DEBE estar configurada en Netlify
const API_URL = import.meta.env.VITE_API_URL;

// Determinar modo demo
// Solo activo en desarrollo o si explícitamente se configura
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' && !isProduction;

// Construir baseURL
let baseURL;

if (isProduction) {
  // En producción, requiere VITE_API_URL configurada
  if (!API_URL) {
    console.error('❌ ERROR: VITE_API_URL no está configurada en Netlify.');
    console.error('Por favor configura la variable de entorno VITE_API_URL con la URL de tu backend.');
    console.error('Ejemplo: https://servihome-api.onrender.com/api');
    // Usar un valor que falle claramente para que el usuario sepa que debe configurar
    baseURL = 'https://CONFIGURE_VITE_API_URL_IN_NETLIFY/api';
  } else {
    // En producción con URL configurada, usar esa URL
    baseURL = API_URL;
  }
} else {
  // En desarrollo
  if (DEMO_MODE) {
    baseURL = 'http://localhost:5000/api/demo';
  } else if (API_URL) {
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

// Interceptor para mostrar errores más claros
api.interceptors.request.use(
  (config) => {
    if (config.baseURL.includes('CONFIGURE_VITE_API_URL')) {
      console.error('❌ No se puede hacer la petición: VITE_API_URL no está configurada');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config?.baseURL?.includes('CONFIGURE_VITE_API_URL')) {
      error.message = 'VITE_API_URL no está configurada en Netlify. Por favor configura la variable de entorno.';
    } else if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
      if (isProduction && !API_URL) {
        error.message = 'Backend no disponible. Configura VITE_API_URL en Netlify.';
      }
    }
    return Promise.reject(error);
  }
);

// Log para debugging
if (!isProduction && DEMO_MODE) {
  console.log('🎮 Modo Demo activado - Puedes usar cualquier email/contraseña');
  console.log('📍 API URL:', baseURL);
} else if (isProduction) {
  if (API_URL) {
    console.log('🌐 Producción - API URL:', baseURL);
  } else {
    console.error('❌ PRODUCCIÓN SIN API URL CONFIGURADA');
    console.error('Configura VITE_API_URL en Netlify → Site settings → Environment variables');
  }
} else {
  console.log('🔧 Desarrollo - API URL:', baseURL);
}

export default api;
