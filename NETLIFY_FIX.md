# 🔧 Solución de Problemas de Despliegue en Netlify

## Problema: Error 404 "Page not found"

### Solución 1: Configuración de Build en Netlify Dashboard

Si estás desplegando desde GitHub, asegúrate de configurar en el dashboard de Netlify:

1. Ve a **Site settings** → **Build & deploy**
2. Configura:
   - **Base directory:** `web`
   - **Build command:** `npm run build`
   - **Publish directory:** `web/dist`

### Solución 2: Verificar archivo _redirects

El archivo `_redirects` debe estar en `web/public/_redirects` y se copiará automáticamente a `dist/` durante el build.

Contenido del archivo:
```
/*    /index.html   200
```

### Solución 3: Verificar netlify.toml

El archivo `netlify.toml` debe estar en la raíz del repositorio o en `web/`.

Si está en la raíz, debe tener:
```toml
[build]
  base = "web"
  command = "npm run build"
  publish = "dist"
```

### Solución 4: Verificar que el build funcione localmente

```bash
cd web
npm run build
```

Verifica que se genere la carpeta `dist/` con:
- `index.html`
- `_redirects`
- `assets/` (con JS y CSS)

### Solución 5: Re-deploy en Netlify

1. Ve a **Deploys** en Netlify
2. Click en **Trigger deploy** → **Clear cache and deploy site**

### Solución 6: Verificar logs de build

En los logs de Netlify, verifica:
- ✅ Build exitoso
- ✅ Archivos generados en `dist/`
- ✅ No hay errores de rutas

## Configuración Recomendada

### En Netlify Dashboard:

**Build settings:**
- Base directory: `web`
- Build command: `npm run build`
- Publish directory: `web/dist`

**Environment variables:**
- `VITE_API_URL` = `https://tu-backend-url.herokuapp.com/api`
- `VITE_DEMO_MODE` = `false`

### Estructura de archivos:

```
proyecto/
├── web/
│   ├── public/
│   │   ├── _redirects
│   │   └── manifest.json
│   ├── src/
│   ├── netlify.toml  (opcional, si quieres config local)
│   └── package.json
└── netlify.toml  (recomendado en raíz)
```

## Verificación Post-Deploy

1. Visita tu URL de Netlify
2. Debe mostrar la landing page en `/`
3. Las rutas como `/login`, `/admin` deben funcionar
4. No debe aparecer error 404

## Si el problema persiste

1. Verifica los logs de build en Netlify
2. Revisa la consola del navegador (F12)
3. Verifica que todas las rutas estén definidas en `App.jsx`
4. Asegúrate de que `_redirects` esté en `dist/` después del build

