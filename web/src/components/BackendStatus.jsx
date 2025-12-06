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
    const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
    
    // Verificar si necesita configuración
    if (isProduction && !isDemoMode && (apiURL.includes('CONFIGURE_VITE_API_URL') || !apiURL)) {
      setStatus({ checking: false, available: false, needsConfig: true });
      return;
    }

    // Si está en modo demo, verificar que las funciones estén disponibles
    if (isDemoMode && isProduction) {
      try {
        const response = await api.get('/health').catch(() => null);
        if (response && response.status === 200) {
          setStatus({ checking: false, available: true, needsConfig: false });
        } else {
          setStatus({ checking: false, available: false, needsConfig: false });
        }
      } catch (error) {
        setStatus({ checking: false, available: false, needsConfig: false });
      }
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
      <Alert severity="info" sx={{ mb: 2 }}>
        <AlertTitle>Backend Simple Disponible</AlertTitle>
        <Box>
          <strong>Opción 1: Desplegar Backend Simple (Recomendado)</strong>
          <br />
          El proyecto incluye un backend simple en <code>backend-simple/</code> que:
          <ul style={{ marginTop: 8, marginBottom: 8, paddingLeft: 20 }}>
            <li>✅ No requiere base de datos</li>
            <li>✅ Acepta cualquier email/contraseña</li>
            <li>✅ Fácil de desplegar en Render.com (gratis)</li>
          </ul>
          <strong>Pasos:</strong>
          <ol style={{ marginTop: 8, marginBottom: 8, paddingLeft: 20 }}>
            <li>Despliega <code>backend-simple/</code> en Render.com (ver <code>backend-simple/DEPLOY.md</code>)</li>
            <li>En Netlify → <strong>Site settings</strong> → <strong>Environment variables</strong></li>
            <li>Agrega: <code>VITE_API_URL</code> = <code>https://tu-backend-url/api</code></li>
            <li>Haz un nuevo deploy</li>
          </ol>
          <Link 
            href="https://github.com/Manuelherrera22/SERVIHOGAR/blob/main/backend-simple/DEPLOY.md" 
            target="_blank" 
            rel="noopener"
            sx={{ fontSize: '0.875rem', mr: 2 }}
          >
            Ver guía de despliegue
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

