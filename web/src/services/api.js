import axios from 'axios';

// Get API URL from environment variables
// In production, this should be set in Netlify dashboard
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || import.meta.env.MODE === 'development';

const baseURL = DEMO_MODE && !import.meta.env.VITE_API_URL
  ? 'http://localhost:5000/api/demo'
  : API_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Log for debugging (only in development)
if (import.meta.env.MODE === 'development' && DEMO_MODE) {
  console.log('🎮 Modo Demo activado - Puedes usar cualquier email/contraseña');
}

export default api;
