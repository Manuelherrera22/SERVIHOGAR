# 🚀 Inicio Rápido - ServiHome

## Opción 1: Usar el script de inicio (Windows)

Simplemente ejecuta:
```bash
START.bat
```

Esto iniciará automáticamente el backend y la aplicación web.

## Opción 2: Inicio manual

### 1. Iniciar Backend

Abre una terminal y ejecuta:
```bash
cd backend
npm install
npm run dev
```

El backend estará disponible en: **http://localhost:5000**

### 2. Iniciar Web App

Abre otra terminal y ejecuta:
```bash
cd web
npm install
npm run dev
```

La aplicación web estará disponible en: **http://localhost:3000**

## ⚠️ Importante

### Base de Datos

Para que la aplicación funcione completamente, necesitas MongoDB:

**Opción A: MongoDB Local**
1. Instala MongoDB en tu sistema
2. Inicia el servicio MongoDB
3. El servidor se conectará automáticamente a `mongodb://localhost:27017/servihome`

**Opción B: MongoDB Atlas (Recomendado)**
1. Crea una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén la URI de conexión
4. Crea un archivo `.env` en la carpeta `backend/` con:
   ```
   MONGODB_URI=tu_uri_de_mongodb_atlas
   JWT_SECRET=tu_secreto_seguro
   PORT=5000
   ```

### Variables de Entorno

Crea un archivo `.env` en `backend/` con estas variables mínimas:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/servihome
JWT_SECRET=servihome_secret_key_12345
JWT_EXPIRE=7d
FRONTEND_WEB_URL=http://localhost:3000
FRONTEND_MOBILE_URL=http://localhost:19006
```

## 📱 Acceder a la Plataforma

### Web App (Administración)
- URL: http://localhost:3000
- Usuario: Cualquier email (se creará al registrarse)
- Contraseña: La que elijas al registrarte

### API Backend
- URL: http://localhost:5000
- Health Check: http://localhost:5000/api/health
- Documentación: Las rutas están en `/api/auth`, `/api/services`, etc.

## 🧪 Probar la Aplicación

1. **Abre la web app**: http://localhost:3000
2. **Regístrate** como usuario o técnico
3. **Inicia sesión**
4. **Explora las funcionalidades**:
   - Dashboard con estadísticas
   - Gestión de servicios
   - Gestión de usuarios
   - Ver pagos

## 📝 Notas

- Si MongoDB no está disponible, el servidor iniciará pero algunas funciones no funcionarán
- Para producción, configura Stripe con tus claves reales
- La app móvil requiere Expo Go en tu dispositivo

## 🆘 Problemas Comunes

**Error: "Cannot find module"**
- Ejecuta `npm install` en la carpeta correspondiente

**Error: "MongoDB connection failed"**
- Verifica que MongoDB esté corriendo
- O configura MongoDB Atlas

**Puerto ya en uso**
- Cambia el puerto en el archivo `.env`

## 📚 Más Información

Consulta `INSTALLATION.md` para una guía detallada de instalación.

