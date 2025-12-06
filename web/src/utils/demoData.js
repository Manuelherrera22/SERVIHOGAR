// Datos demo simulados para funcionar sin backend
export const demoUsers = [
  {
    _id: 'user-1',
    name: 'Administrador',
    email: 'admin@servihome.com',
    role: 'admin',
    isActive: true
  }
];

export const demoServices = [
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
  },
  {
    _id: 'service-4',
    title: 'Reparación de grifo',
    category: 'plumbing',
    description: 'Grifo goteando en la cocina',
    status: 'quoted',
    user: { name: 'Ana Martínez', email: 'ana@example.com' },
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: 'service-5',
    title: 'Instalación de ventilador',
    category: 'electrical',
    description: 'Instalar ventilador de techo',
    status: 'completed',
    user: { name: 'Luis Rodríguez', email: 'luis@example.com' },
    createdAt: new Date(Date.now() - 259200000).toISOString()
  }
];

export const demoTechnicians = [
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
  },
  {
    _id: 'tech-4',
    name: 'Carmen Sánchez',
    email: 'carmen@servihome.com',
    phone: '+1234567893',
    role: 'technician',
    isActive: true,
    technicianProfile: {
      rating: 4.6,
      isVerified: true,
      specialties: ['hvac']
    }
  }
];

export const demoPayments = [
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
  },
  {
    _id: 'payment-4',
    amount: 80.00,
    status: 'completed',
    service: { title: 'Reparación de grifo' },
    user: { name: 'Ana Martínez' },
    technician: { name: 'Pedro Martínez' },
    paidAt: new Date(Date.now() - 259200000).toISOString(),
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    _id: 'payment-5',
    amount: 180.00,
    status: 'processing',
    service: { title: 'Instalación de ventilador' },
    user: { name: 'Luis Rodríguez' },
    technician: { name: 'Ana Rodríguez' },
    createdAt: new Date(Date.now() - 345600000).toISOString()
  }
];

// Función para generar token simple
export function generateDemoToken() {
  return `demo-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

