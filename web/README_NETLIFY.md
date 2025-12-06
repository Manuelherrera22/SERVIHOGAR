# 🚀 Despliegue en Netlify - ServiHome

## ⚡ Despliegue Rápido

### Opción 1: Desde GitHub (Recomendado)

1. Ve a https://app.netlify.com
2. Click en "Add new site" → "Import an existing project"
3. Conecta tu repositorio: `Manuelherrera22/SERVIHOGAR`
4. Configura:
   - **Base directory:** `web`
   - **Build command:** `npm run build`
   - **Publish directory:** `web/dist`
5. Agrega variables de entorno:
   - `VITE_API_URL` = `https://tu-backend-url.herokuapp.com/api`
   - `VITE_DEMO_MODE` = `false`
6. Click "Deploy site"

### Opción 2: Desde CLI

```bash
npm install -g netlify-cli
netlify login
cd web
netlify init
netlify deploy --prod
```

## 📋 Configuración Requerida

### Variables de Entorno en Netlify

Ve a: Site settings → Environment variables

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `VITE_API_URL` | `https://tu-backend.herokuapp.com/api` | URL de tu backend API |
| `VITE_DEMO_MODE` | `false` | Desactiva modo demo |

## ✅ Verificación

El build está configurado y probado. La carpeta `dist/` contiene los archivos listos para producción.

## 📚 Más Información

Ver `NETLIFY_DEPLOY.md` en la raíz del proyecto para instrucciones detalladas.

