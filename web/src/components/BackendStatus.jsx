import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';
import api from '../services/api';

export default function BackendStatus() {
  const [status, setStatus] = useState({ checking: true, available: false });

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      // Intentar hacer una petición simple al backend
      const response = await api.get('/health').catch(() => null);
      if (response && response.status === 200) {
        setStatus({ checking: false, available: true });
      } else {
        setStatus({ checking: false, available: false });
      }
    } catch (error) {
      setStatus({ checking: false, available: false });
    }
  };

  if (status.checking) return null;

  if (!status.available) {
    return (
      <Alert severity="warning" sx={{ mb: 2 }}>
        <AlertTitle>Backend no disponible</AlertTitle>
        La aplicación está en modo demo. Para funcionalidad completa, configura{' '}
        <strong>VITE_API_URL</strong> en Netlify con la URL de tu backend.
      </Alert>
    );
  }

  return null;
}

