// Netlify Function para health check (demo)
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    },
    body: JSON.stringify({ 
      status: 'ok', 
      mode: 'demo',
      message: 'Demo mode is active'
    })
  };
};

