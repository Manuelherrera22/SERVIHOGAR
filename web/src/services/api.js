import axios from 'axios';

// Auto-detect demo mode - use demo endpoint by default for easier testing
// Change this to false when MongoDB is configured
const USE_DEMO_MODE = true; // Set to false when MongoDB is ready

const baseURL = USE_DEMO_MODE 
  ? 'http://localhost:5000/api/demo'
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Log for debugging
if (USE_DEMO_MODE) {
  console.log('🎮 Modo Demo activado - Puedes usar cualquier email/contraseña');
}

export default api;
