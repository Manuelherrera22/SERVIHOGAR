const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/servihome', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado a MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@servihome.com' });
    if (adminExists) {
      console.log('⚠️  El usuario admin ya existe');
      console.log('   Email: admin@servihome.com');
      console.log('   Si olvidaste la contraseña, elimina el usuario y vuelve a ejecutar este script');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Administrador',
      email: 'admin@servihome.com',
      password: 'admin123', // Cambiar en producción
      phone: '1234567890',
      role: 'admin',
      isVerified: true,
      isActive: true
    });

    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('');
    console.log('📧 Credenciales de acceso:');
    console.log('   Email: admin@servihome.com');
    console.log('   Contraseña: admin123');
    console.log('');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer inicio de sesión!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creando usuario admin:', error.message);
    process.exit(1);
  }
};

createAdminUser();

