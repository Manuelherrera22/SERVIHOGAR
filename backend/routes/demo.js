const express = require('express');
const router = express.Router();

// Demo mode - allows testing without MongoDB
// This is a temporary solution for development

// Demo user for testing
const demoUser = {
  id: 'demo-user-123',
  name: 'Usuario Demo',
  email: 'demo@servihome.com',
  role: 'admin',
  phone: '1234567890'
};

// Demo token (not secure, only for development)
const demoToken = 'demo_token_' + Date.now();

// @route   POST /api/demo/login
// @desc    Demo login (no database required)
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Accept any credentials for demo
  res.json({
    success: true,
    token: demoToken,
    user: demoUser,
    message: 'Modo demo activado - No se requiere base de datos'
  });
});

// @route   GET /api/demo/me
// @desc    Get demo user
// @access  Public
router.get('/me', (req, res) => {
  res.json({
    success: true,
    user: demoUser
  });
});

module.exports = router;

