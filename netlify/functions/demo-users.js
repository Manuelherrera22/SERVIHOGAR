// Netlify Function para obtener usuarios/técnicos (demo)
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
    // Datos demo de técnicos
    const technicians = [
      {
        _id: 'demo-tech-1',
        name: 'Pedro Martínez',
        email: 'pedro@servihome.com',
        phone: '+1234567890',
        role: 'technician',
        isActive: true,
        technicianProfile: {
          rating: 4.8,
          isVerified: true,
          specialties: ['plumbing', 'electrical']
        }
      },
      {
        _id: 'demo-tech-2',
        name: 'Ana Rodríguez',
        email: 'ana@servihome.com',
        phone: '+1234567891',
        role: 'technician',
        isActive: true,
        technicianProfile: {
          rating: 4.9,
          isVerified: true,
          specialties: ['hvac', 'electrical']
        }
      },
      {
        _id: 'demo-tech-3',
        name: 'Luis Fernández',
        email: 'luis@servihome.com',
        phone: '+1234567892',
        role: 'technician',
        isActive: true,
        technicianProfile: {
          rating: 4.7,
          isVerified: true,
          specialties: ['plumbing']
        }
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
      body: JSON.stringify({ technicians })
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

