# 🚀 Backend Simple - Configuración Automática

## ✅ Ya está configurado en `netlify.toml`

No necesitas configurar variables de entorno manualmente. El proyecto está listo para usar el backend simple.

## 📋 Pasos para Activar

### 1. Desplegar Backend Simple

El backend simple está en `backend-simple/` y es muy fácil de desplegar:

#### Opción A: Render.com (Recomendado - Gratis)

1. Ve a https://render.com
2. Crea cuenta con GitHub
3. Click en "New" → "Web Service"
4. Conecta tu repositorio `SERVIHOGAR`
5. Configura:
   - **Name:** `servihome-api`
   - **Root Directory:** `backend-simple`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
6. Click "Create Web Service"
7. Copia la URL (ej: `https://servihome-api.onrender.com`)

#### Opción B: Railway

1. Ve a https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Selecciona `backend-simple` como directorio
4. Railway detectará automáticamente Node.js
5. Copia la URL generada

### 2. Configurar en Netlify (Solo una vez)

1. Ve a Netlify → Tu sitio → **Site settings** → **Environment variables**
2. Agrega:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://tu-backend-url.onrender.com/api` (o la URL que te dio Railway)
   - **Scope:** `All scopes`
3. Guarda
4. Ve a **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

## ✨ Características del Backend Simple

- ✅ **Sin base de datos** - Todo funciona en memoria
- ✅ **Acepta cualquier email/contraseña** - Perfecto para demos
- ✅ **Sin configuración** - Funciona inmediatamente
- ✅ **Fácil de desplegar** - Un solo comando
- ✅ **Gratis** - Render y Railway tienen planes gratuitos

## 🔄 Migración Futura

Cuando quieras agregar autenticación real:
1. El código está en `backend/` (versión completa con MongoDB)
2. Solo necesitas cambiar `VITE_API_URL` en Netlify
3. El frontend funcionará automáticamente

## 📝 Notas

- El backend simple reinicia los datos al reiniciar el servidor
- Perfecto para desarrollo y demostraciones
- Para producción real, usa el backend completo en `backend/`

