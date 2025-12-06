# 🔐 Credenciales de Acceso - ServiHome

## Usuario Administrador por Defecto

Si has ejecutado el script de creación de usuario admin, las credenciales son:

**Email:** `admin@servihome.com`  
**Contraseña:** `admin123`

## ⚠️ Importante

**Cambia la contraseña después del primer inicio de sesión por seguridad.**

## Crear Usuario Administrador

Si no has creado el usuario admin aún, ejecuta:

```bash
cd backend
npm run create-admin
```

O directamente:

```bash
cd backend
node scripts/createAdmin.js
```

## Registrarse como Nuevo Usuario

También puedes registrarte directamente desde la aplicación web:

1. Ve a http://localhost:3000
2. Si no hay opción de registro en la página de login, puedes usar la API directamente:

```bash
# Registrar nuevo usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tu Nombre",
    "email": "tu@email.com",
    "password": "tucontraseña",
    "phone": "1234567890",
    "role": "user"
  }'
```

## Roles Disponibles

- `user` - Usuario normal (puede solicitar servicios)
- `technician` - Técnico (puede cotizar servicios)
- `admin` - Administrador (acceso completo al panel)

## Nota sobre MongoDB

El script de creación de usuario admin requiere que MongoDB esté corriendo. Si ves errores de conexión:

1. **MongoDB Local**: Asegúrate de que el servicio MongoDB esté iniciado
2. **MongoDB Atlas**: Configura la URI en el archivo `.env`

