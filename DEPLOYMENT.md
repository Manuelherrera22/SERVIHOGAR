# Guía de Despliegue - ServiHome

Esta guía te ayudará a desplegar ServiHome en producción.

## Despliegue del Backend

### Opción 1: Heroku

1. Instala Heroku CLI
2. Login en Heroku:
```bash
heroku login
```

3. Crea una nueva app:
```bash
heroku create servihome-api
```

4. Agrega MongoDB Atlas como addon:
```bash
heroku addons:create mongolab:sandbox
```

5. Configura las variables de entorno:
```bash
heroku config:set JWT_SECRET=tu_secreto_seguro
heroku config:set STRIPE_SECRET_KEY=sk_live_tu_clave
heroku config:set NODE_ENV=production
```

6. Despliega:
```bash
git push heroku main
```

### Opción 2: Railway

1. Crea una cuenta en [Railway](https://railway.app)
2. Conecta tu repositorio
3. Configura las variables de entorno
4. Railway detectará automáticamente Node.js y desplegará

### Opción 3: AWS/DigitalOcean

1. Crea una instancia EC2 o Droplet
2. Instala Node.js y MongoDB
3. Clona el repositorio
4. Configura PM2 para mantener el proceso corriendo:
```bash
npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup
```

## Despliegue de la App Móvil

### Android (Google Play Store)

1. Genera un keystore:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Configura `app.json` con tu información
3. Build de producción:
```bash
expo build:android
```

4. Descarga el APK y súbelo a Google Play Console

### iOS (App Store)

1. Configura tu cuenta de desarrollador de Apple
2. Build de producción:
```bash
expo build:ios
```

3. Sigue las instrucciones de Expo para subir a App Store Connect

## Despliegue de la App Web

### Opción 1: Vercel

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega:
```bash
cd web
vercel
```

### Opción 2: Netlify

1. Crea una cuenta en Netlify
2. Conecta tu repositorio
3. Configura:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Opción 3: AWS S3 + CloudFront

1. Build de producción:
```bash
npm run build
```

2. Sube los archivos de `dist` a S3
3. Configura CloudFront para distribución

## Variables de Entorno en Producción

Asegúrate de configurar:

- `NODE_ENV=production`
- `MONGODB_URI` (MongoDB Atlas recomendado)
- `JWT_SECRET` (secreto fuerte y único)
- `STRIPE_SECRET_KEY` (clave de producción)
- `STRIPE_PUBLISHABLE_KEY` (clave pública de producción)
- `FRONTEND_WEB_URL` (URL de tu app web)
- `FRONTEND_MOBILE_URL` (URL de tu API para mobile)

## Configuración de Dominio

1. Configura un dominio personalizado
2. Actualiza las URLs en las variables de entorno
3. Configura SSL/HTTPS (obligatorio para producción)

## Monitoreo y Logs

### Recomendaciones:

1. Usa un servicio de logging (Sentry, LogRocket)
2. Configura alertas de errores
3. Monitorea el rendimiento (New Relic, Datadog)
4. Configura backups automáticos de MongoDB

## Seguridad

1. Usa HTTPS en todas las conexiones
2. Configura CORS correctamente
3. Valida todas las entradas
4. Usa rate limiting
5. Implementa autenticación de dos factores (opcional)
6. Mantén las dependencias actualizadas

## Checklist de Producción

- [ ] Variables de entorno configuradas
- [ ] Base de datos en producción (MongoDB Atlas)
- [ ] Stripe configurado con claves de producción
- [ ] HTTPS configurado
- [ ] CORS configurado correctamente
- [ ] Logs configurados
- [ ] Monitoreo configurado
- [ ] Backups configurados
- [ ] Tests ejecutados
- [ ] Documentación actualizada


