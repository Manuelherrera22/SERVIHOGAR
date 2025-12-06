# 🚀 Guía de Despliegue en Netlify - ServiHome

Esta guía te ayudará a desplegar la aplicación web de ServiHome en Netlify.

## 📋 Requisitos Previos

1. Cuenta en [Netlify](https://www.netlify.com) (gratis)
2. Repositorio en GitHub (ya configurado: https://github.com/Manuelherrera22/SERVIHOGAR)
3. Backend desplegado (Heroku, Railway, o similar)

## 🔧 Paso 1: Preparar el Backend

Antes de desplegar el frontend, asegúrate de tener el backend desplegado:

### Opción A: Heroku (Recomendado)

1. Crea una cuenta en [Heroku](https://www.heroku.com)
2. Instala Heroku CLI
3. En la carpeta `backend/`:
   ```bash
   heroku create servihome-api
   heroku addons:create mongolab:sandbox
   git push heroku main
   ```

### Opción B: Railway

1. Crea cuenta en [Railway](https://railway.app)
2. Conecta tu repositorio
3. Selecciona la carpeta `backend/`
4. Configura las variables de entorno

## 🌐 Paso 2: Desplegar en Netlify

### Método 1: Desde GitHub (Recomendado)

1. **Inicia sesión en Netlify**
   - Ve a https://app.netlify.com
   - Inicia sesión con GitHub

2. **Importa el proyecto**
   - Click en "Add new site" → "Import an existing project"
   - Selecciona "GitHub"
   - Autoriza Netlify
   - Selecciona el repositorio: `Manuelherrera22/SERVIHOGAR`

3. **Configura el build**
   - **Base directory:** `web`
   - **Build command:** `npm run build`
   - **Publish directory:** `web/dist`

4. **Configura Variables de Entorno**
   - Ve a "Site settings" → "Environment variables"
   - Agrega:
     ```
     VITE_API_URL=https://tu-backend-url.herokuapp.com/api
     VITE_DEMO_MODE=false
     ```

5. **Deploy**
   - Click en "Deploy site"
   - Espera a que termine el build

### Método 2: Desde CLI

```bash
# Instala Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# En la carpeta web/
cd web
netlify init

# Deploy
netlify deploy --prod
```

## ⚙️ Configuración de Variables de Entorno

En el dashboard de Netlify, configura:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `VITE_API_URL` | `https://tu-backend.herokuapp.com/api` | URL de tu backend |
| `VITE_DEMO_MODE` | `false` | Desactiva modo demo en producción |

## 🔗 Paso 3: Configurar Dominio Personalizado (Opcional)

1. Ve a "Domain settings"
2. Click en "Add custom domain"
3. Ingresa tu dominio
4. Sigue las instrucciones de DNS

## 📝 Archivos de Configuración

El proyecto ya incluye:
- ✅ `netlify.toml` - Configuración de build
- ✅ `public/_redirects` - Redirecciones SPA
- ✅ `.env.example` - Ejemplo de variables

## 🧪 Probar el Build Localmente

Antes de desplegar, prueba el build:

```bash
cd web
npm run build
npm run preview
```

Esto creará la carpeta `dist/` y la servirá en `http://localhost:4173`

## 🐛 Solución de Problemas

### Error: "Build failed"
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Netlify

### Error: "Page not found" al navegar
- Verifica que `public/_redirects` esté presente
- Verifica la configuración en `netlify.toml`

### Error: "API not found"
- Verifica que `VITE_API_URL` esté configurado correctamente
- Asegúrate de que el backend esté desplegado y accesible

## 📊 Monitoreo

Una vez desplegado:
- Ve a "Analytics" para ver estadísticas
- Configura "Forms" si necesitas formularios
- Activa "Functions" si necesitas serverless

## 🔄 Actualizaciones Automáticas

Netlify se actualiza automáticamente cuando haces push a GitHub:
- Push a `main` → Deploy automático
- Pull requests → Preview deployments

## 📚 Recursos

- [Documentación de Netlify](https://docs.netlify.com)
- [Guía de Vite + Netlify](https://vitejs.dev/guide/static-deploy.html#netlify)

## ✅ Checklist de Despliegue

- [ ] Backend desplegado y funcionando
- [ ] Variables de entorno configuradas en Netlify
- [ ] Build local funciona correctamente
- [ ] Repositorio conectado a Netlify
- [ ] Build configurado correctamente
- [ ] Sitio desplegado y accesible
- [ ] Pruebas de funcionalidad completadas

