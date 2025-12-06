import axios from 'axios';

// Detectar si estamos en producción
const isProduction = import.meta.env.MODE === 'production' || 
                     import.meta.env.PROD || 
                     window.location.hostname !== 'localhost';

// Get API URL from environment variables
// En producción, VITE_API_URL DEBE estar configurada en Netlify
let API_URL = import.meta.env.VITE_API_URL;

if (isProduction && !API_URL) {
  console.error('⚠️ VITE_API_URL no está configurada en Netlify. Por favor configura la variable de entorno.');
  // En producción sin URL configurada, usar modo demo como fallback
  API_URL = '/api/demo';
} else if (!API_URL) {
  // En desarrollo, usar localhost
  API_URL = 'http://localhost:5000/api';
}

// Determinar modo demo
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || 
                  (!isProduction && !import.meta.env.VITE_API_URL);

// Construir baseURL
let baseURL = API_URL;
if (DEMO_MODE && !isProduction) {
  baseURL = 'http://localhost:5000/api/demo';
} else if (DEMO_MODE && isProduction) {
  // En producción con modo demo, usar ruta relativa
  baseURL = '/api/demo';
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Log para debugging
if (!isProduction && DEMO_MODE) {
  console.log('🎮 Modo Demo activado - Puedes usar cualquier email/contraseña');
} else if (isProduction) {
  console.log('🌐 Producción - API URL:', baseURL);
}

export default api;
