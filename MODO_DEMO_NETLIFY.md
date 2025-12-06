# 🎮 Modo Demo en Netlify - Configuración

## ✅ Configuración Completa para Modo Demo

El modo demo ahora funciona completamente en Netlify usando **Netlify Functions** sin necesidad de un backend externo.

## 📋 Pasos para Activar Modo Demo

### 1. Configurar Variables de Entorno en Netlify

1. Ve a **Netlify** → Tu sitio → **Site settings** → **Environment variables**
2. Agrega estas variables:

   **Variable 1:**
   - **Key:** `VITE_DEMO_MODE`
   - **Value:** `true`
   - **Scope:** `All scopes`

   **Variable 2 (Opcional - solo si quieres desactivar demo más tarde):**
   - **Key:** `VITE_API_URL`
   - **Value:** (déjalo vacío o no lo configures)
   - **Scope:** `All scopes`

### 2. Hacer Deploy

1. Ve a **Deploys**
2. Click en **Trigger deploy** → **Clear cache and deploy site**
3. Espera a que termine el build

## 🎯 ¿Qué Incluye el Modo Demo?

### Funcionalidades Disponibles:

✅ **Login Demo**
- Acepta cualquier email y contraseña
- Crea un usuario admin automáticamente

✅ **Dashboard**
- Muestra estadísticas demo
- Lista de servicios de ejemplo
- Resumen rápido

✅ **Gestión de Servicios**
- 3 servicios de ejemplo
- Diferentes estados (completado, en progreso, pendiente)

✅ **Gestión de Usuarios**
- 3 técnicos de ejemplo
- Con calificaciones y especialidades

✅ **Gestión de Pagos**
- 3 pagos de ejemplo
- Diferentes estados

## 🔧 Cómo Funciona

El modo demo usa **Netlify Functions** ubicadas en:
- `netlify/functions/demo-login.js` - Login
- `netlify/functions/demo-me.js` - Usuario actual
- `netlify/functions/demo-services.js` - Servicios
- `netlify/functions/demo-users.js` - Usuarios/Técnicos
- `netlify/functions/demo-payments.js` - Pagos
- `netlify/functions/demo-health.js` - Health check

Estas funciones se ejecutan en el servidor de Netlify y no requieren base de datos.

## 📝 Notas Importantes

- **Modo Demo es temporal**: Úsalo para pruebas y demostraciones
- **No guarda datos**: Los datos se generan en cada petición
- **Sin persistencia**: Al recargar, los datos vuelven a ser los mismos
- **Para producción real**: Configura `VITE_API_URL` con tu backend real y `VITE_DEMO_MODE=false`

## 🚀 Cambiar a Modo Producción

Cuando tengas tu backend listo:

1. Ve a **Environment variables** en Netlify
2. Cambia `VITE_DEMO_MODE` a `false`
3. Agrega `VITE_API_URL` con la URL de tu backend
4. Haz un nuevo deploy

## ✅ Verificación

Después del deploy, deberías ver:
- ✅ Login funciona con cualquier email/contraseña
- ✅ Dashboard muestra datos demo
- ✅ No hay errores en la consola
- ✅ Todas las páginas funcionan correctamente

