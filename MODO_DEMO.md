# 🎮 Modo Demo - ServiHome

## Acceso Rápido sin MongoDB

Si no tienes MongoDB configurado aún, puedes usar el **modo demo** para probar la aplicación.

### Credenciales Demo

**Email:** `demo@servihome.com` (o cualquier email)  
**Contraseña:** `demo123` (o cualquier contraseña)

### Cómo Usar el Modo Demo

1. **Opción 1: Usar endpoint demo directamente**

   Cambia temporalmente en `web/src/services/api.js`:
   ```javascript
   baseURL: 'http://localhost:5000/api/demo'
   ```

   Luego usa cualquier email y contraseña para iniciar sesión.

2. **Opción 2: Configurar MongoDB (Recomendado)**

   Para usar la aplicación completa, configura MongoDB:
   - **MongoDB Atlas** (gratis): https://www.mongodb.com/cloud/atlas
   - O instala MongoDB localmente

   Luego crea un usuario admin:
   ```bash
   cd backend
   npm run create-admin
   ```

### Endpoints Demo Disponibles

- `POST /api/demo/login` - Login demo
- `GET /api/demo/me` - Obtener usuario demo

### ⚠️ Importante

El modo demo es **solo para desarrollo y pruebas**. No uses este modo en producción.

### Configurar MongoDB

1. **MongoDB Atlas (Recomendado - 5 minutos)**
   - Ve a https://www.mongodb.com/cloud/atlas
   - Crea cuenta gratuita
   - Crea cluster M0 (gratis)
   - Obtén URI de conexión
   - Crea archivo `.env` en `backend/`:
     ```
     MONGODB_URI=tu_uri_aqui
     JWT_SECRET=tu_secreto
     PORT=5000
     ```

2. **MongoDB Local**
   - Descarga desde https://www.mongodb.com/try/download/community
   - Instala y inicia el servicio
   - El servidor se conectará automáticamente

### Volver al Modo Normal

Una vez configurado MongoDB, vuelve a usar:
```javascript
baseURL: 'http://localhost:5000/api'
```

