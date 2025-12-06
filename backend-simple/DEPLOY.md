# 🚀 Guía de Despliegue - Backend Simple

## Opción 1: Render.com (Recomendado - Gratis)

### Pasos:

1. **Crear cuenta en Render**
   - Ve a https://render.com
   - Regístrate con GitHub

2. **Crear nuevo servicio**
   - Click en "New" → "Web Service"
   - Conecta tu repositorio de GitHub
   - Selecciona el repositorio `SERVIHOGAR`

3. **Configurar el servicio**
   - **Name:**** `servihome-api` (o el que prefieras)
   - **Root Directory:** `backend-simple`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free` (gratis)

4. **Variables de entorno (opcional)**
   - `PORT` - Dejar vacío (usa 5000 por defecto)

5. **Deploy**
   - Click en "Create Web Service"
   - Espera a que termine el deploy
   - Copia la URL (ej: `https://servihome-api.onrender.com`)

6. **Configurar en Netlify**
   - Ve a Netlify → Site settings → Environment variables
   - Agrega: `VITE_API_URL` = `https://servihome-api.onrender.com/api`
   - Agrega: `VITE_DEMO_MODE` = `false`
   - Haz un nuevo deploy

## Opción 2: Railway

### Pasos:

1. **Crear cuenta en Railway**
   - Ve a https://railway.app
   - Regístrate con GitHub

2. **Nuevo proyecto**
   - Click en "New Project"
   - "Deploy from GitHub repo"
   - Selecciona el repositorio

3. **Configurar**
   - Selecciona la carpeta `backend-simple`
   - Railway detectará automáticamente Node.js
   - Click en "Deploy"

4. **Obtener URL**
   - Una vez desplegado, copia la URL pública
   - Ejemplo: `https://servihome-api.railway.app`

5. **Configurar en Netlify**
   - Ve a Netlify → Site settings → Environment variables
   - Agrega: `VITE_API_URL` = `https://servihome-api.railway.app/api`
   - Agrega: `VITE_DEMO_MODE` = `false`
   - Haz un nuevo deploy

## Opción 3: Heroku

### Pasos:

```bash
cd backend-simple
heroku login
heroku create servihome-api
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

Luego configura en Netlify con la URL de Heroku.

## ✅ Verificación

Después del despliegue, prueba:

```bash
curl https://tu-backend-url/api/health
```

Debería responder:
```json
{
  "status": "ok",
  "message": "ServiHome API is running",
  "mode": "simple-demo"
}
```

## 🔗 Configurar Frontend

Una vez desplegado el backend:

1. Copia la URL del backend (ej: `https://servihome-api.onrender.com`)
2. Ve a Netlify → Environment variables
3. Agrega:
   - `VITE_API_URL` = `https://tu-backend-url/api`
   - `VITE_DEMO_MODE` = `false`
4. Haz un nuevo deploy del frontend

¡Listo! Tu aplicación funcionará completamente.

