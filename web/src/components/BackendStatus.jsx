import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, Box, Link } from '@mui/material';
import api from '../services/api';

export default function BackendStatus() {
  const [status, setStatus] = useState({ checking: true, available: false, needsConfig: false });

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    // En modo demo, siempre está disponible (funciona sin backend)
    const USE_DEMO_MODE = true; // Esto debería venir de una constante compartida
    
    if (USE_DEMO_MODE) {
      setStatus({ checking: false, available: true, needsConfig: false });
      return;
    }

    // Si no es modo demo, verificar backend real
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
  };

  if (status.checking) return null;

  if (status.needsConfig) {
    return null; // No mostrar nada en modo demo
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

