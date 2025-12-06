# Guía de Instalación - ServiHome

Esta guía te ayudará a configurar y ejecutar la aplicación ServiHome en tu entorno local.

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- MongoDB (local o MongoDB Atlas)
- Cuenta de Stripe (para pagos)
- Cuenta de Cloudinary (opcional, para almacenamiento de imágenes)

## Instalación del Backend

1. Navega al directorio del backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura las variables de entorno en `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/servihome
JWT_SECRET=tu_secreto_jwt_muy_seguro
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_tu_clave_stripe
STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_stripe
```

5. Inicia el servidor:
```bash
npm run dev
```

El backend estará corriendo en `http://localhost:5000`

## Instalación de la App Móvil

1. Instala Expo CLI globalmente:
```bash
npm install -g expo-cli
```

2. Navega al directorio mobile:
```bash
cd mobile
```

3. Instala las dependencias:
```bash
npm install
```

4. Actualiza la URL de la API en `services/api.js`:
```javascript
baseURL: 'http://TU_IP_LOCAL:5000/api'
```

5. Inicia la aplicación:
```bash
npm start
```

6. Escanea el código QR con la app Expo Go en tu dispositivo móvil.

## Instalación de la App Web

1. Navega al directorio web:
```bash
cd web
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación web estará disponible en `http://localhost:3000`

## Configuración de MongoDB

### Opción 1: MongoDB Local

1. Instala MongoDB en tu sistema
2. Inicia el servicio de MongoDB
3. Usa la URI: `mongodb://localhost:27017/servihome`

### Opción 2: MongoDB Atlas (Recomendado para producción)

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster
3. Obtén la URI de conexión
4. Actualiza `MONGODB_URI` en el archivo `.env`

## Configuración de Stripe

1. Crea una cuenta en [Stripe](https://stripe.com)
2. Obtén tus claves de API (modo test)
3. Actualiza las variables `STRIPE_SECRET_KEY` y `STRIPE_PUBLISHABLE_KEY` en `.env`

## Estructura de Carpetas

```
servihome/
├── backend/          # API REST
│   ├── models/      # Modelos de MongoDB
│   ├── routes/      # Rutas de la API
│   ├── middleware/  # Middleware de autenticación
│   └── utils/       # Utilidades
├── mobile/          # App móvil React Native
│   ├── screens/     # Pantallas de la app
│   ├── context/     # Context API
│   └── services/    # Servicios API
└── web/             # App web React
    ├── src/
    │   ├── pages/   # Páginas
    │   ├── components/ # Componentes
    │   └── context/ # Context API
```

## Scripts Disponibles

### Backend
- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon

### Mobile
- `npm start` - Inicia Expo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS

### Web
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

## Solución de Problemas

### Error de conexión a MongoDB
- Verifica que MongoDB esté corriendo
- Revisa la URI de conexión en `.env`
- Asegúrate de que la IP esté en la whitelist (MongoDB Atlas)

### Error de CORS
- Verifica las URLs permitidas en `backend/server.js`
- Asegúrate de que las URLs del frontend estén configuradas correctamente

### Error de autenticación
- Verifica que el token JWT esté configurado
- Revisa que el token se esté enviando en los headers

## Próximos Pasos

1. Configura las variables de entorno
2. Inicia MongoDB
3. Ejecuta el backend
4. Ejecuta la app móvil o web
5. Crea una cuenta de prueba
6. Prueba las funcionalidades

## Soporte

Para más ayuda, consulta la documentación o crea un issue en el repositorio.


