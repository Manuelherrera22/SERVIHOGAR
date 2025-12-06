const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Datos en memoria (simulado)
let users = [
  {
    _id: 'user-1',
    name: 'Administrador',
    email: 'admin@servihome.com',
    role: 'admin',
    isActive: true
  }
];

let services = [
  {
    _id: 'service-1',
    title: 'Reparación de tubería',
    category: 'plumbing',
    description: 'Fuga de agua en el baño principal',
    status: 'completed',
    user: { name: 'Juan Pérez', email: 'juan@example.com' },
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: 'service-2',
    title: 'Instalación eléctrica',
    category: 'electrical',
    description: 'Instalar nuevos tomacorrientes',
    status: 'in_progress',
    user: { name: 'María García', email: 'maria@example.com' },
    createdAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    _id: 'service-3',
    title: 'Mantenimiento de aire acondicionado',
    category: 'hvac',
    description: 'Limpieza y revisión general',
    status: 'pending',
    user: { name: 'Carlos López', email: 'carlos@example.com' },
    createdAt: new Date(Date.now() - 21600000).toISOString()
  }
];

let technicians = [
  {
    _id: 'tech-1',
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
    _id: 'tech-2',
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
    _id: 'tech-3',
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

let payments = [
  {
    _id: 'payment-1',
    amount: 150.00,
    status: 'completed',
    service: { title: 'Reparación de tubería' },
    user: { name: 'Juan Pérez' },
    technician: { name: 'Pedro Martínez' },
    paidAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: 'payment-2',
    amount: 250.00,
    status: 'pending',
    service: { title: 'Instalación eléctrica' },
    user: { name: 'María García' },
    technician: { name: 'Ana Rodríguez' },
    createdAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    _id: 'payment-3',
    amount: 120.00,
    status: 'completed',
    service: { title: 'Mantenimiento de aire acondicionado' },
    user: { name: 'Carlos López' },
    technician: { name: 'Luis Fernández' },
    paidAt: new Date(Date.now() - 172800000).toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// Helper para generar token simple
function generateToken() {
  return `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'ServiHome API is running',
    mode: 'simple-demo',
    timestamp: new Date().toISOString()
  });
});

// Login - Acepta cualquier email/contraseña
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  // Crear o encontrar usuario
  let user = users.find(u => u.email === email);
  if (!user) {
    user = {
      _id: `user-${Date.now()}`,
      name: email.split('@')[0] || 'Usuario',
      email: email,
      role: 'admin',
      isActive: true
    };
    users.push(user);
  }

  const token = generateToken();

  res.json({
    token,
    user
  });
});

// Obtener usuario actual
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  // En modo demo, aceptamos cualquier token
  const user = {
    _id: 'user-1',
    name: 'Administrador',
    email: 'admin@servihome.com',
    role: 'admin',
    isActive: true
  };

  res.json({ user });
});

// Obtener servicios
app.get('/api/services', (req, res) => {
  res.json({ services });
});

// Obtener técnicos/usuarios
app.get('/api/users/technicians', (req, res) => {
  res.json({ technicians });
});

// Obtener pagos
app.get('/api/payments', (req, res) => {
  res.json({ payments });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'ServiHome API - Modo Demo',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me',
      services: 'GET /api/services',
      technicians: 'GET /api/users/technicians',
      payments: 'GET /api/payments'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 ServiHome API corriendo en puerto ${PORT}`);
  console.log(`📍 Modo: Demo Simple (sin base de datos)`);
  console.log(`✅ Acepta cualquier email/contraseña para login`);
  console.log(`🌐 http://localhost:${PORT}`);
});

