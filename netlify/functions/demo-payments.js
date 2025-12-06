// Netlify Function para obtener pagos (demo)
exports.handler = async (event, context) => {
  // Permitir GET y OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod === 'GET') {
    // Datos demo de pagos
    const payments = [
      {
        _id: 'demo-payment-1',
        amount: 150.00,
        status: 'completed',
        service: { title: 'Reparación de tubería' },
        user: { name: 'Juan Pérez' },
        technician: { name: 'Pedro Martínez' },
        paidAt: new Date(Date.now() - 86400000).toISOString(),
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        _id: 'demo-payment-2',
        amount: 250.00,
        status: 'pending',
        service: { title: 'Instalación eléctrica' },
        user: { name: 'María García' },
        technician: { name: 'Ana Rodríguez' },
        createdAt: new Date(Date.now() - 43200000).toISOString()
      },
      {
        _id: 'demo-payment-3',
        amount: 120.00,
        status: 'completed',
        service: { title: 'Mantenimiento de aire acondicionado' },
        user: { name: 'Carlos López' },
        technician: { name: 'Luis Fernández' },
        paidAt: new Date(Date.now() - 172800000).toISOString(),
        createdAt: new Date(Date.now() - 172800000).toISOString()
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
      body: JSON.stringify({ payments })
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

