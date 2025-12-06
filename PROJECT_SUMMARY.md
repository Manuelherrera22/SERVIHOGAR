# Resumen del Proyecto ServiHome

## Descripción General

ServiHome es una aplicación móvil y web que conecta usuarios con técnicos confiables para servicios del hogar (plomería, electricidad, cerrajería, gas, etc.). La plataforma permite a los usuarios solicitar servicios con fotos, recibir cotizaciones transparentes y pagar directamente desde la aplicación.

## Características Principales

### Para Usuarios
- ✅ Registro e inicio de sesión
- ✅ Solicitud de servicios con carga de fotos del daño
- ✅ Visualización de cotizaciones de múltiples técnicos
- ✅ Aceptar/rechazar cotizaciones
- ✅ Pago seguro integrado con Stripe
- ✅ Calificación y reseñas de técnicos
- ✅ Historial de servicios
- ✅ Notificaciones en tiempo real

### Para Técnicos
- ✅ Registro y verificación de perfil
- ✅ Visualización de servicios disponibles según especialidades
- ✅ Envío de cotizaciones detalladas
- ✅ Gestión de agenda y servicios asignados
- ✅ Recepción de pagos
- ✅ Sistema de calificaciones y reputación

### Para Administradores
- ✅ Panel de administración web
- ✅ Gestión de servicios
- ✅ Gestión de usuarios y técnicos
- ✅ Monitoreo de pagos
- ✅ Estadísticas y reportes

## Arquitectura Técnica

### Backend
- **Framework**: Node.js + Express
- **Base de datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Subida de archivos**: Multer
- **Pagos**: Stripe
- **Tiempo real**: Socket.io

### Mobile App
- **Framework**: React Native con Expo
- **Navegación**: React Navigation
- **Estado**: Context API
- **HTTP**: Axios
- **Imágenes**: Expo Image Picker
- **Pagos**: Stripe React Native

### Web App
- **Framework**: React + Vite
- **UI**: Material-UI
- **Navegación**: React Router
- **HTTP**: Axios

## Estructura del Proyecto

```
servihome/
├── backend/              # API REST
│   ├── models/          # Modelos de MongoDB
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Quote.js
│   │   └── Payment.js
│   ├── routes/          # Rutas de la API
│   │   ├── auth.js
│   │   ├── services.js
│   │   ├── quotes.js
│   │   ├── payments.js
│   │   ├── users.js
│   │   └── technicians.js
│   ├── middleware/      # Middleware
│   │   └── auth.js
│   ├── utils/          # Utilidades
│   │   ├── generateToken.js
│   │   └── uploadImage.js
│   └── server.js       # Servidor principal
│
├── mobile/             # App móvil React Native
│   ├── screens/        # Pantallas
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ServiceRequestScreen.js
│   │   ├── ServiceDetailScreen.js
│   │   ├── MyServicesScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── TechnicianHomeScreen.js
│   │   ├── AvailableServicesScreen.js
│   │   └── CreateQuoteScreen.js
│   ├── context/        # Context API
│   │   └── AuthContext.js
│   ├── services/       # Servicios API
│   │   └── api.js
│   └── App.js          # Componente principal
│
├── web/                # App web React
│   ├── src/
│   │   ├── pages/      # Páginas
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Users.jsx
│   │   │   └── Payments.jsx
│   │   ├── components/ # Componentes
│   │   │   └── Layout.jsx
│   │   ├── context/    # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── services/   # Servicios API
│   │   │   └── api.js
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

## Modelos de Datos

### User
- Información personal (nombre, email, teléfono)
- Rol (usuario, técnico, admin)
- Perfil de técnico (especialidades, calificaciones, certificaciones)
- Dirección y ubicación

### Service
- Información del servicio (título, descripción, categoría)
- Fotos del daño
- Estado (pendiente, cotizado, aceptado, en progreso, completado)
- Usuario solicitante
- Técnico asignado
- Cotización aceptada

### Quote
- Servicio asociado
- Técnico que cotiza
- Monto y descripción
- Costos de mano de obra y materiales
- Estado (pendiente, aceptada, rechazada, expirada)

### Payment
- Servicio y cotización asociados
- Usuario y técnico
- Monto y método de pago
- Estado del pago
- IDs de Stripe

## Flujo de Trabajo

1. **Usuario solicita servicio**
   - Completa formulario con descripción
   - Sube fotos del daño
   - Selecciona categoría y urgencia

2. **Técnicos ven la solicitud**
   - Los técnicos con especialidades coincidentes reciben notificación
   - Pueden ver detalles y fotos

3. **Técnicos envían cotizaciones**
   - Detallan el trabajo a realizar
   - Incluyen costos de mano de obra y materiales
   - Establecen monto total

4. **Usuario revisa cotizaciones**
   - Ve todas las cotizaciones recibidas
   - Compara precios y descripciones
   - Acepta la que prefiera

5. **Pago**
   - Usuario paga directamente desde la app
   - Pago procesado con Stripe
   - Técnico recibe notificación

6. **Servicio completado**
   - Técnico marca servicio como completado
   - Usuario califica y deja reseña
   - Sistema actualiza calificación del técnico

## Seguridad

- Autenticación JWT
- Contraseñas hasheadas con bcrypt
- Validación de datos en backend
- CORS configurado
- Variables de entorno para secretos
- HTTPS en producción

## Próximos Pasos de Desarrollo

1. **Notificaciones Push**
   - Implementar notificaciones push para móvil
   - Notificaciones por email

2. **Geolocalización**
   - Búsqueda de técnicos cercanos
   - Tracking de técnico en ruta

3. **Chat en tiempo real**
   - Comunicación directa usuario-técnico
   - Historial de conversaciones

4. **Sistema de reputación avanzado**
   - Badges para técnicos destacados
   - Verificación de identidad

5. **Múltiples métodos de pago**
   - Integración con PayPal
   - Pagos en efectivo

6. **Suscripciones**
   - Planes para técnicos
   - Servicios premium

## Presupuesto Estimado

- **Desarrollo**: 1-3 meses
- **Infraestructura**: ~$50-100/mes
- **Servicios externos**:
  - MongoDB Atlas: Gratis (tier básico)
  - Stripe: 2.9% + $0.30 por transacción
  - Cloudinary: Gratis (tier básico)

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- React Native
- Expo
- React
- Vite
- Material-UI
- Stripe
- Socket.io
- JWT
- Multer

## Licencia

MIT


