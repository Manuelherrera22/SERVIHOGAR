# ServiHome - Marketplace de Servicios Técnicos para el Hogar

Aplicación móvil y web que conecta usuarios con técnicos confiables para servicios del hogar (plomería, electricidad, cerrajería, etc.)

## 🚀 Características Principales

- ✅ Solicitud de servicios con carga de fotos del daño
- ✅ Sistema de cotización transparente
- ✅ Coordinación directa con técnicos verificados
- ✅ Pasarela de pagos integrada
- ✅ Calificaciones y reseñas
- ✅ Notificaciones en tiempo real
- ✅ Panel de administración web

## 📁 Estructura del Proyecto

```
servihome/
├── backend/          # API REST con Node.js/Express
├── mobile/           # App móvil React Native (Android/iOS)
├── web/              # Aplicación web React
└── README.md
```

## 🛠️ Tecnologías

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticación
- Multer para subida de archivos
- Stripe para pagos

### Mobile
- React Native
- React Navigation
- AsyncStorage
- React Native Image Picker
- Stripe React Native

### Web
- React + Vite
- React Router
- Axios
- Material-UI

## 📦 Instalación

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configurar variables de entorno
npm run dev
```

### Mobile
```bash
cd mobile
npm install
# Para Android
npm run android
# Para iOS
npm run ios
```

### Web
```bash
cd web
npm install
npm run dev
```

## 🔐 Variables de Entorno

Ver archivos `.env.example` en cada directorio para configurar las variables necesarias.

## 📱 Funcionalidades

### Para Usuarios
- Registro e inicio de sesión
- Solicitar servicio con fotos
- Ver cotizaciones de técnicos
- Aceptar/rechazar cotizaciones
- Pagar directamente desde la app
- Calificar técnicos
- Historial de servicios

### Para Técnicos
- Registro y verificación
- Ver solicitudes de servicios
- Enviar cotizaciones
- Gestionar agenda
- Recibir pagos
- Ver calificaciones

## 🚀 Despliegue

### Backend
- Recomendado: Heroku, Railway, o AWS
- Base de datos: MongoDB Atlas

### Mobile
- Android: Google Play Store
- iOS: App Store

### Web
- Recomendado: Vercel, Netlify, o AWS

## 📄 Licencia

MIT


