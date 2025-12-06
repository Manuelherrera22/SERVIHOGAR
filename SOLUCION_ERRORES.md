# 🔧 Solución de Errores - ServiHome

## Error 500 en Login

Si estás viendo errores 500 al intentar iniciar sesión, es probable que **MongoDB no esté conectado**.

### Solución Rápida

**Opción 1: Usar MongoDB Atlas (Recomendado - Gratis)**

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un cluster gratuito (M0)
4. Obtén la URI de conexión (ejemplo: `mongodb+srv://usuario:password@cluster.mongodb.net/servihome`)
5. Crea un archivo `.env` en la carpeta `backend/`:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/servihome
JWT_SECRET=tu_secreto_seguro_12345
PORT=5000
FRONTEND_WEB_URL=http://localhost:3000
```

6. Reinicia el servidor backend

**Opción 2: Instalar MongoDB Local**

1. Descarga MongoDB desde [mongodb.com](https://www.mongodb.com/try/download/community)
2. Instala MongoDB
3. Inicia el servicio MongoDB
4. El servidor se conectará automáticamente a `mongodb://localhost:27017/servihome`

### Verificar Conexión

Puedes verificar el estado de la conexión visitando:
- http://localhost:5000/api/health

Deberías ver:
```json
{
  "status": "OK",
  "message": "ServiHome API is running",
  "database": "connected"
}
```

Si ves `"database": "disconnected"`, MongoDB no está conectado.

## Advertencias de React Router

Las advertencias sobre `v7_startTransition` y `v7_relativeSplatPath` son solo advertencias de futuras versiones. **No afectan la funcionalidad** de la aplicación.

Si quieres eliminarlas, puedes actualizar `web/src/App.jsx`:

```jsx
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
```

## Crear Usuario sin MongoDB

Si necesitas probar la aplicación sin MongoDB, puedes:

1. **Usar MongoDB Atlas** (gratis y rápido de configurar)
2. **Instalar MongoDB localmente**
3. **Modificar temporalmente el código** para usar datos en memoria (no recomendado para producción)

## Pasos para Resolver el Error 500

1. ✅ Verifica que el backend esté corriendo: http://localhost:5000/api/health
2. ✅ Verifica la conexión a MongoDB en el health check
3. ✅ Si MongoDB no está conectado, configura MongoDB Atlas o instala MongoDB local
4. ✅ Crea el archivo `.env` en `backend/` con la URI de MongoDB
5. ✅ Reinicia el servidor backend
6. ✅ Intenta iniciar sesión nuevamente

## Credenciales de Prueba

Una vez que MongoDB esté conectado, crea un usuario admin:

```bash
cd backend
npm run create-admin
```

O regístrate directamente desde la aplicación web.

## ¿Necesitas Ayuda?

- Revisa los logs del servidor backend en la terminal
- Verifica que el puerto 5000 no esté siendo usado por otra aplicación
- Asegúrate de que todas las dependencias estén instaladas (`npm install`)

