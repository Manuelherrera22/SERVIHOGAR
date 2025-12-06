import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, Box, Link } from '@mui/material';
import api from '../services/api';

export default function BackendStatus() {
  const [status, setStatus] = useState({ checking: true, available: false, needsConfig: false });

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    const apiURL = api.defaults.baseURL;
    const isProduction = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
    
    // Verificar si necesita configuración
    if (isProduction && (apiURL.includes('CONFIGURE_VITE_API_URL') || !apiURL || apiURL === '/api/demo')) {
      setStatus({ checking: false, available: false, needsConfig: true });
      return;
    }

    try {
      // Intentar hacer una petición simple al backend
      const response = await api.get('/health').catch(() => null);
      if (response && response.status === 200) {
        setStatus({ checking: false, available: true, needsConfig: false });
      } else {
        setStatus({ checking: false, available: false, needsConfig: false });
      }
    } catch (error) {
      setStatus({ checking: false, available: false, needsConfig: false });
    }
  };

  if (status.checking) return null;

  if (status.needsConfig) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        <AlertTitle>Configuración Requerida</AlertTitle>
        <Box>
          <strong>VITE_API_URL</strong> no está configurada en Netlify.
          <br />
          <br />
          <strong>Pasos para configurar:</strong>
          <ol style={{ marginTop: 8, marginBottom: 8, paddingLeft: 20 }}>
            <li>Ve a Netlify → <strong>Site settings</strong> → <strong>Environment variables</strong></li>
            <li>Agrega: <code>VITE_API_URL</code> = <code>https://tu-backend-url/api</code></li>
            <li>Agrega: <code>VITE_DEMO_MODE</code> = <code>false</code></li>
            <li>Haz un nuevo deploy</li>
          </ol>
          <Link 
            href="https://docs.netlify.com/environment-variables/overview/" 
            target="_blank" 
            rel="noopener"
            sx={{ fontSize: '0.875rem' }}
          >
            Ver documentación de Netlify
          </Link>
        </Box>
      </Alert>
    );
  }

  if (!status.available) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        <AlertTitle>Backend no disponible</AlertTitle>
        No se pudo conectar al backend. Verifica que esté desplegado y accesible.
      </Alert>
    );
  }

  return null;
}

