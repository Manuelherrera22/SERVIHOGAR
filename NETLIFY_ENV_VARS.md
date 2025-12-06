# 🔧 Configuración de Variables de Entorno en Netlify

## ⚠️ IMPORTANTE: Configurar Variables de Entorno

Para que la aplicación funcione correctamente en producción, debes configurar las siguientes variables de entorno en Netlify:

## 📋 Variables Requeridas

### 1. VITE_API_URL (Requerida)

**Descripción:** URL del backend API desplegado

**Valor ejemplo:**
```
https://tu-backend.herokuapp.com/api
```

**O si usas otro servicio:**
```
https://tu-backend.railway.app/api
https://tu-backend.render.com/api
```

### 2. VITE_DEMO_MODE (Opcional)

**Descripción:** Activa/desactiva el modo demo

**Valores:**
- `true` - Activa modo demo (usa endpoints demo)
- `false` - Modo producción normal (recomendado)

**Valor recomendado:** `false`

## 🚀 Cómo Configurar en Netlify

### Paso 1: Acceder a la Configuración

1. Ve a tu proyecto en [Netlify](https://app.netlify.com)
2. Selecciona tu sitio
3. Ve a **Site settings** → **Environment variables**

### Paso 2: Agregar Variables

1. Click en **Add variable**
2. Agrega cada variable:

   **Variable 1:**
   - Key: `VITE_API_URL`
   - Value: `https://tu-backend-url.herokuapp.com/api`
   - Scope: `All scopes` (o `Production`)

   **Variable 2:**
   - Key: `VITE_DEMO_MODE`
   - Value: `false`
   - Scope: `All scopes`

### Paso 3: Re-deploy

Después de agregar las variables:

1. Ve a **Deploys**
2. Click en **Trigger deploy** → **Clear cache and deploy site**
3. Espera a que termine el build

## 🔍 Verificar Configuración

Después del deploy, verifica en la consola del navegador (F12):

- ✅ Debe mostrar: `🌐 Producción - API URL: https://tu-backend-url/api`
- ❌ NO debe mostrar: `localhost:5000`

## 🛠️ Solución de Problemas

### Error: "Failed to load resource: localhost:5000"

**Causa:** `VITE_API_URL` no está configurada

**Solución:**
1. Ve a Netlify → Site settings → Environment variables
2. Agrega `VITE_API_URL` con la URL de tu backend
3. Haz un nuevo deploy

### Error: "503 Service Unavailable"

**Causa:** El backend no está desplegado o la URL es incorrecta

**Solución:**
1. Verifica que tu backend esté desplegado y funcionando
2. Verifica que la URL en `VITE_API_URL` sea correcta
3. Prueba la URL directamente en el navegador: `https://tu-backend-url/api/health`

### La app funciona pero muestra "Modo Demo"

**Causa:** `VITE_DEMO_MODE` está en `true` o `VITE_API_URL` no está configurada

**Solución:**
1. Configura `VITE_DEMO_MODE` = `false`
2. Asegúrate de que `VITE_API_URL` esté configurada correctamente
3. Haz un nuevo deploy

## 📝 Notas Importantes

- Las variables de entorno que empiezan con `VITE_` son expuestas al cliente
- Después de cambiar variables, SIEMPRE haz un nuevo deploy
- El modo demo solo funciona si el backend tiene endpoints `/api/demo/*`
- En producción, siempre usa `VITE_DEMO_MODE=false` para funcionalidad completa

## 🔗 URLs de Ejemplo

Si tu backend está en:
- **Heroku:** `https://servihome-api.herokuapp.com/api`
- **Railway:** `https://servihome-api.railway.app/api`
- **Render:** `https://servihome-api.onrender.com/api`

