# 🚀 ServiHome API - Backend Simple

Backend minimalista para ServiHome que funciona sin base de datos. Perfecto para desarrollo y demostraciones.

## ✨ Características

- ✅ **Sin base de datos** - Todo en memoria
- ✅ **Acepta cualquier email/contraseña** - Login sin validación
- ✅ **Fácil de desplegar** - Un solo archivo
- ✅ **Sin configuración** - Funciona inmediatamente
- ✅ **CORS habilitado** - Listo para frontend

## 🚀 Inicio Rápido

### Instalación Local

```bash
cd backend-simple
npm install
npm start
```

El servidor estará en `http://localhost:5000`

### Desarrollo

```bash
npm run dev
```

## 📡 Endpoints

### Health Check
```
GET /api/health
```

### Login (acepta cualquier email/contraseña)
```
POST /api/auth/login
Body: { "email": "cualquier@email.com", "password": "cualquier" }
```

### Obtener usuario actual
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Obtener servicios
```
GET /api/services
```

### Obtener técnicos
```
GET /api/users/technicians
```

### Obtener pagos
```
GET /api/payments
```

## 🌐 Despliegue

### Render.com (Recomendado - Gratis)

1. Crea cuenta en [Render](https://render.com)
2. Click en "New" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name:** servihome-api
   - **Root Directory:** `backend-simple`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Click "Create Web Service"

### Railway

1. Crea cuenta en [Railway](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Selecciona el repositorio
4. Selecciona la carpeta `backend-simple`
5. Railway detectará automáticamente Node.js

### Heroku

```bash
cd backend-simple
heroku create servihome-api
git push heroku main
```

## 🔧 Variables de Entorno

Opcional (tiene valores por defecto):

- `PORT` - Puerto del servidor (default: 5000)

## 📝 Notas

- Los datos se reinician al reiniciar el servidor
- Perfecto para desarrollo y demos
- En el futuro se puede migrar a MongoDB fácilmente
- Todos los endpoints aceptan cualquier token en modo demo

## 🔄 Migración Futura

Cuando quieras agregar autenticación real:

1. Agregar MongoDB/Mongoose
2. Implementar hash de contraseñas (bcrypt)
3. Agregar JWT real
4. Validar usuarios en base de datos

El código está preparado para esta migración.

