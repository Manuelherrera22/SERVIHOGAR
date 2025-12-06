// Netlify Function para login demo
exports.handler = async (event, context) => {
  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    // En modo demo, aceptamos cualquier email/contraseña
    // Simulamos un usuario admin
    const user = {
      _id: 'demo-user-123',
      name: email.split('@')[0] || 'Usuario Demo',
      email: email,
      role: 'admin',
      isActive: true
    };

    // Generar un token simple (en producción real usar JWT)
    const token = `demo-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        token,
        user
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Error processing request' })
    };
  }
};

