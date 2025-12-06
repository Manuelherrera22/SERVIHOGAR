// Netlify Function para obtener servicios (demo)
exports.handler = async (event, context) => {
  // Permitir GET y OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod === 'GET') {
    // Datos demo de servicios
    const services = [
      {
        _id: 'demo-service-1',
        title: 'Reparación de tubería',
        category: 'plumbing',
        description: 'Fuga de agua en el baño principal',
        status: 'completed',
        user: { name: 'Juan Pérez', email: 'juan@example.com' },
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        _id: 'demo-service-2',
        title: 'Instalación eléctrica',
        category: 'electrical',
        description: 'Instalar nuevos tomacorrientes',
        status: 'in_progress',
        user: { name: 'María García', email: 'maria@example.com' },
        createdAt: new Date(Date.now() - 43200000).toISOString()
      },
      {
        _id: 'demo-service-3',
        title: 'Mantenimiento de aire acondicionado',
        category: 'hvac',
        description: 'Limpieza y revisión general',
        status: 'pending',
        user: { name: 'Carlos López', email: 'carlos@example.com' },
        createdAt: new Date(Date.now() - 21600000).toISOString()
      }
    ];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify({ services })
    };
  }

  return {
    statusCode: 405,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ message: 'Method not allowed' })
  };
};

